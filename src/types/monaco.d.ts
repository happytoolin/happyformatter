// Global type definitions for Monaco playground
import { Workspace } from "modern-monaco";

export interface MonacoPlaygroundAPI {
  getCurrentContent(element: HTMLElement): Promise<string>;
  updateContent(element: HTMLElement, content: string): Promise<void>;
  switchLanguage(language: string): Promise<void>;
}

export interface MonacoPlayground {
  workspace: Workspace | null;
  isInitialized: boolean;
  isTransitioning: boolean;
  initPromise: Promise<void> | null;
  ensureInitialized(): Promise<void>;
  switchToLanguage(language: string): Promise<void>;
}

// Extend Workspace type to include _monaco property
declare module "modern-monaco" {
  interface Workspace {
    _monaco: {
      promise: Promise<any>;
    };
  }
}

declare global {
  interface Window {
    __MONACO_PLAYGROUND__?: MonacoPlayground;
    MonacoPlayground?: MonacoPlaygroundAPI;
    MonacoErrorBoundary?: {
      show(error: Error): void;
    };
  }
}
