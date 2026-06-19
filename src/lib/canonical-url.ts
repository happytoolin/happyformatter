const defaultSite = "https://happyformatter.com";

export function withTrailingSlash(path: string) {
  if (!path || path === "/" || path.includes("?") || path.includes("#")) {
    return path;
  }

  if (/^[a-z][a-z\d+.-]*:/i.test(path)) {
    const url = new URL(path);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return path;
    }

    if (url.pathname !== "/" && !url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}/`;
    }
    return url.href;
  }

  return path.endsWith("/") ? path : `${path}/`;
}

export function toCanonicalURL(
  pathOrURL: string | URL | undefined,
  site: string | URL | undefined,
) {
  const baseURL = new URL(site?.toString() || defaultSite);
  const canonicalURL = new URL(pathOrURL?.toString() || "/", baseURL);

  if (
    canonicalURL.origin === baseURL.origin
    && canonicalURL.pathname !== "/"
    && !canonicalURL.pathname.endsWith("/")
  ) {
    canonicalURL.pathname = `${canonicalURL.pathname}/`;
  }

  canonicalURL.hash = "";
  return canonicalURL;
}
