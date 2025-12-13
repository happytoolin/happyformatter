import { type FileSystem } from "modern-monaco";

/**
 * File system types - these match the FileSystem interface requirements
 */
export type FileSystemEntryType = 1 | 2; // 1 = File, 2 = Directory

export interface FileStat {
  type: FileSystemEntryType;
  ctime: number;
  mtime: number;
  version: number;
  size: number;
}

export type FileSystemWatchHandle = (
  kind: "create" | "modify" | "remove",
  pathname: string,
  type?: number,
  context?: FileSystemWatchContext
) => void;

export interface FileSystemWatchContext {
  [key: string]: unknown;
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * Internal storage entry for the In-Memory FS
 */
interface InMemoryEntry {
  url: string;
  stat: FileStat;
  content?: Uint8Array; // Only present if type === 1 (File)
}

interface FileSystemWatcher {
  pathname: string;
  recursive: boolean;
  handle: FileSystemWatchHandle;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Helper to normalize paths to file:// URLs
 */
function filenameToURL(filename: string): URL {
  if (filename.startsWith("file://")) {
    return new URL(filename);
  }
  if (!filename.startsWith("/")) {
    filename = "/" + filename;
  }
  return new URL("file://" + filename);
}

export class InMemoryFileSystem implements FileSystem {
  // The core storage: Map<FullUrlString, Entry>
  private _storage = new Map<string, InMemoryEntry>();
  private _watchers = new Set<FileSystemWatcher>();

  constructor() {
    // Initialize root directory
    const rootUrl = "file:///";
    this._storage.set(rootUrl, {
      url: rootUrl,
      stat: {
        type: 2, // Directory
        ctime: Date.now(),
        mtime: Date.now(),
        version: 1,
        size: 0,
      },
    });
  }

  async stat(name: string): Promise<FileStat> {
    const url = filenameToURL(name).href;
    const entry = this._storage.get(url);

    if (!entry) {
      throw new NotFoundError(url);
    }
    return entry.stat;
  }

  async createDirectory(name: string): Promise<void> {
    const { pathname, href: url } = filenameToURL(name);

    if (this._storage.has(url)) {
      return;
    }

    const now = Date.now();
    const newDirs: string[] = [];

    // Ensure parent directories exist
    let parentPath = pathname;
    while (parentPath !== "/" && parentPath !== "") {
      parentPath = parentPath.substring(0, parentPath.lastIndexOf("/"));
      if (parentPath === "") parentPath = "/"; // Handle root parent

      const parentUrl = filenameToURL(parentPath).href;
      
      if (!this._storage.has(parentUrl)) {
        this._storage.set(parentUrl, {
          url: parentUrl,
          stat: { type: 2, version: 1, ctime: now, mtime: now, size: 0 },
        });
        newDirs.push(parentPath);
      }
      
      if(parentPath === "/") break; 
    }

    // Create the actual directory
    this._storage.set(url, {
      url: url,
      stat: { type: 2, version: 1, ctime: now, mtime: now, size: 0 },
    });
    newDirs.push(pathname);

    // Notify watchers
    for (const dir of newDirs) {
      this._notify("create", dir, 2);
    }
  }

  async readDirectory(name: string): Promise<[string, number][]> {
    const { pathname } = filenameToURL(name);
    const stat = await this.stat(name);

    if (stat.type !== 2) {
      throw new Error(`read ${pathname}: not a directory`);
    }

    // Prepare prefix for searching children
    const dirUrl = "file://" + pathname + (pathname.endsWith("/") ? "" : "/");
    const entries: [string, number][] = [];

    for (const [key, entry] of Array.from(this._storage.entries())) {
      if (key.startsWith(dirUrl) && key !== dirUrl) {
        // Remove the prefix
        const relativePath = key.slice(dirUrl.length);
        // If there are no more slashes, it is a direct child
        if (relativePath.indexOf("/") === -1 && relativePath !== "") {
          entries.push([relativePath, entry.stat.type]);
        }
      }
    }

    return entries;
  }

  async readFile(name: string): Promise<Uint8Array> {
    const url = filenameToURL(name).href;
    const entry = this._storage.get(url);

    if (!entry) {
      throw new NotFoundError(url);
    }
    if (entry.stat.type !== 1) {
      throw new Error(`read ${name}: is a directory`);
    }
    
    return entry.content || new Uint8Array();
  }

  async readTextFile(filename: string): Promise<string> {
    const content = await this.readFile(filename);
    return decoder.decode(content);
  }

  async writeFile(name: string, content: string | Uint8Array, context?: FileSystemWatchContext): Promise<void> {
    const { pathname, href: url } = filenameToURL(name);
    
    // Check parent directory
    const parentPath = pathname.substring(0, pathname.lastIndexOf("/")) || "/";
    const parentUrl = filenameToURL(parentPath).href;
    const parentEntry = this._storage.get(parentUrl);

    if (!parentEntry) {
        // In strict FS, we might throw, but many editors auto-create parents or expect them to exist.
        // Following the example logic: check if parent exists and is a dir
        throw new Error(`write ${pathname}: no such file or directory`);
    }
    if (parentEntry.stat.type !== 2) {
      throw new Error(`write ${pathname}: not a directory`);
    }

    let oldEntry = this._storage.get(url);
    if (oldEntry && oldEntry.stat.type === 2) {
      throw new Error(`write ${pathname}: is a directory`);
    }

    const data = typeof content === "string" ? encoder.encode(content) : content;
    const now = Date.now();

    const newStat: FileStat = {
      type: 1,
      version: (oldEntry?.stat.version ?? 0) + 1,
      ctime: oldEntry?.stat.ctime ?? now,
      mtime: now,
      size: data.byteLength,
    };

    this._storage.set(url, {
      url,
      stat: newStat,
      content: data,
    });

    this._notify(oldEntry ? "modify" : "create", pathname, 1, context);
  }

  async delete(name: string, options?: { recursive: boolean }): Promise<void> {
    const { pathname, href: url } = filenameToURL(name);
    const entry = this._storage.get(url);

    if (!entry) {
      throw new NotFoundError(url);
    }

    if (entry.stat.type === 1) {
      // File
      this._storage.delete(url);
      this._notify("remove", pathname, 1);
    } else if (entry.stat.type === 2) {
      // Directory
      const children: string[] = [];
      const dirPrefix = url + (url.endsWith("/") ? "" : "/");

      // Find children
      for (const key of Array.from(this._storage.keys())) {
        if (key.startsWith(dirPrefix)) {
          children.push(key);
        }
      }

      if (children.length > 0 && !options?.recursive) {
        throw new Error(`delete ${url}: directory not empty`);
      }

      // Delete children
      for (const childUrl of children) {
        const childEntry = this._storage.get(childUrl);
        if (childEntry) {
            this._storage.delete(childUrl);
            const childPath = new URL(childUrl).pathname;
            this._notify("remove", childPath, childEntry.stat.type);
        }
      }

      // Delete self
      this._storage.delete(url);
      this._notify("remove", pathname, 2);
    }
  }

  async rename(oldName: string, newName: string, options?: { overwrite: boolean }): Promise<void> {
    const { href: oldUrl, pathname: oldPath } = filenameToURL(oldName);
    const { href: newUrl, pathname: newPath } = filenameToURL(newName);

    const oldEntry = this._storage.get(oldUrl);
    if (!oldEntry) throw new NotFoundError(oldUrl);

    const newEntryExists = this._storage.has(newUrl);

    if (newEntryExists) {
        if (!options?.overwrite) {
            throw new Error(`rename ${oldUrl} to ${newUrl}: file exists`);
        }
        // Delete destination first
        await this.delete(newName, { recursive: true });
    }

    // Check new parent directory
    const newPathDirname = newPath.substring(0, newPath.lastIndexOf("/")) || "/";
    const newParentUrl = filenameToURL(newPathDirname).href;
    const newParent = this._storage.get(newParentUrl);

    if (!newParent) throw new NotFoundError(newPathDirname);
    if (newParent.stat.type !== 2) throw new Error(`rename: destination parent is not a directory`);

    // Perform Move
    const moved: [string, string, number][] = []; // [oldPath, newPath, type]

    if (oldEntry.stat.type === 1) {
        // Move single file
        this._storage.delete(oldUrl);
        this._storage.set(newUrl, { ...oldEntry, url: newUrl });
        moved.push([oldPath, newPath, 1]);
    } else {
        // Move directory (and all children)
        const dirPrefix = oldUrl + (oldUrl.endsWith("/") ? "" : "/");
        
        // Find all children keys
        const keysToMove: string[] = [];
        for (const key of Array.from(this._storage.keys())) {
            if (key === oldUrl || key.startsWith(dirPrefix)) {
                keysToMove.push(key);
            }
        }

        for (const key of keysToMove) {
            const item = this._storage.get(key)!;
            // Calculate new URL
            // If key is "file:///a/b" and we rename "file:///a" to "file:///x"
            // tail is "/b" -> new is "file:///x/b"
            const tail = key.slice(oldUrl.length); 
            const itemNewUrl = newUrl + tail;

            this._storage.delete(key);
            this._storage.set(itemNewUrl, { ...item, url: itemNewUrl });

            moved.push([new URL(key).pathname, new URL(itemNewUrl).pathname, item.stat.type]);
        }
    }

    // Notifications
    for (const [oPath, nPath, type] of moved) {
        this._notify("remove", oPath, type);
        this._notify("create", nPath, type);
    }
  }

  async copy(source: string, target: string, options?: { overwrite: boolean }): Promise<void> {
     // Usually optional in basics, but good to implement if possible. 
     // For minimal implementation, we can leave this throwing or implement simple file copy.
     throw new Error("Method not implemented.");
  }

  watch(filename: string, handle: FileSystemWatchHandle): () => void;
  watch(filename: string, options: { recursive: boolean }, handle: FileSystemWatchHandle): () => void;
  watch(
    filename: string,
    handleOrOptions: FileSystemWatchHandle | { recursive: boolean },
    handle?: FileSystemWatchHandle
  ): () => void {
    const options = typeof handleOrOptions === "function" ? undefined : handleOrOptions;
    const actualHandle = typeof handleOrOptions === "function" ? handleOrOptions : handle!;

    if (typeof actualHandle !== "function") {
      throw new TypeError("handle must be a function");
    }

    const watcher: FileSystemWatcher = {
      pathname: filenameToURL(filename).pathname,
      recursive: options?.recursive ?? false,
      handle: actualHandle,
    };

    this._watchers.add(watcher);
    return () => {
      this._watchers.delete(watcher);
    };
  }

  private _notify(kind: "create" | "modify" | "remove", pathname: string, type?: number, context?: FileSystemWatchContext) {
    for (const watcher of Array.from(this._watchers)) {
      if (
        watcher.pathname === pathname ||
        (watcher.recursive && (watcher.pathname === "/" || pathname.startsWith(watcher.pathname + "/")))
      ) {
        watcher.handle(kind, pathname, type, context);
      }
    }
  }
}

