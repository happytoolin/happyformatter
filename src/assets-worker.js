export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    // Astro writes redirect rules (dist/client/_redirects) keyed with the
    // trailing slash. A request without the slash never matches those rules
    // and falls through to this 404. Retry once with the slash so legacy
    // URLs like /css/minify resolve to the configured 301 instead of 404.
    const url = new URL(request.url);
    const { pathname } = url;
    const isDocumentPath = request.method === "GET"
      && !pathname.endsWith("/")
      && !pathname.split("/").pop().includes(".");

    if (!isDocumentPath) {
      return response;
    }

    url.pathname = `${pathname}/`;
    const retry = await env.ASSETS.fetch(new Request(url.href, request));

    // Only use the retry when it actually resolves the URL. Returning the
    // original 404 otherwise keeps behavior unchanged for real dead paths.
    return retry.status === 404 ? response : retry;
  },
};
