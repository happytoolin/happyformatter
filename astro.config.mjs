import { createReadStream, readFileSync } from "node:fs";
import { join, posix } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import tailwind from "@tailwindcss/vite";
import { defineConfig, sessionDrivers } from "astro/config";
import wasm from "vite-plugin-wasm";

import partytown from "@astrojs/partytown";

import cloudflare from "@astrojs/cloudflare";

const modernMonacoRuntimeFiles = [
  "editor-core.mjs",
  "editor-worker-main.mjs",
  "editor-worker.mjs",
];
const modernMonacoRuntimeVirtualModuleId = "happyformatter:modern-monaco-runtime";
const resolvedModernMonacoRuntimeVirtualModuleId = `\0${modernMonacoRuntimeVirtualModuleId}`;

const modernMonacoPackageJson = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("./node_modules/modern-monaco/package.json", import.meta.url)),
    "utf8",
  ),
);

const modernMonacoRuntimeBasePath = `/vendor/modern-monaco/${modernMonacoPackageJson.version}`;
const modernMonacoRuntimeDir = fileURLToPath(
  new URL("./node_modules/modern-monaco/dist/", import.meta.url),
);
const enablePartytown = process.env.NODE_ENV === "production";

const shouldIncludeInSitemap = page => {
  const url = new URL(page);
  const segments = url.pathname.split("/").filter(Boolean);

  if (url.pathname === "/modern-monaco-test/") {
    return false;
  }

  if (segments.length === 2 && segments[0] !== "minify" && segments[0] !== "tools") {
    return false;
  }

  if (segments.length === 1 && segments[0].endsWith("-minify")) {
    return false;
  }

  return true;
};

const legacyLanguageVariants = {
  c: ["free", "online", "clang"],
  cpp: ["free", "online", "clang"],
  csharp: ["free", "online", "dotnet"],
  css: ["free", "online", "beautifier", "minify"],
  dart: ["free", "online", "flutter"],
  go: ["free", "online", "secure", "gofmt"],
  html: ["free", "online", "beautifier"],
  java: ["free", "online", "google"],
  javascript: ["free", "online", "secure", "beautifier", "biome"],
  json: ["free", "online", "pretty", "minify"],
  lua: ["free", "online", "beautifier"],
  markdown: ["free", "online", "beautifier"],
  php: ["free", "online", "beautifier", "mago"],
  proto: ["free", "online", "beautifier"],
  python: ["free", "online", "secure", "pep8", "ruff"],
  rust: ["free", "online", "rustfmt"],
  scss: ["free", "online", "compiler"],
  sql: ["free", "online", "beautifier", "formatter"],
  typescript: ["free", "online", "secure", "beautifier", "biome"],
  xml: ["free", "online", "beautifier"],
  yaml: ["free", "online", "pretty"],
  zig: ["free", "online", "zig-fmt"],
};

const languagesWithMinifiers = [
  "css",
  "javascript",
  "json",
  "scss",
  "typescript",
  "xml",
];

const redirectTo = destination => ({
  destination,
  status: 301,
});

const createLegacyRedirects = () => {
  const redirects = {};

  for (const [language, variants] of Object.entries(legacyLanguageVariants)) {
    for (const variant of variants) {
      if (variant === "minify" && languagesWithMinifiers.includes(language)) {
        redirects[`/${language}-${variant}`] = redirectTo(`/minify/${language}`);
        redirects[`/${language}/${variant}`] = redirectTo(`/minify/${language}`);
        continue;
      }

      redirects[`/${language}/${variant}`] = redirectTo(`/${language}-${variant}`);
    }
  }

  for (const language of languagesWithMinifiers) {
    redirects[`/${language}-minify`] = redirectTo(`/minify/${language}`);
    redirects[`/${language}/minify`] = redirectTo(`/minify/${language}`);

    for (const variant of legacyLanguageVariants[language] || []) {
      redirects[`/minify/${language}-${variant}`] = redirectTo(`/minify/${language}`);
    }
  }

  return redirects;
};

const shikiLanguageDependencies = [
  "@shikijs/langs/c",
  "@shikijs/langs/cpp",
  "@shikijs/langs/objective-c",
  "@shikijs/langs/objective-cpp",
  "@shikijs/langs/csharp",
  "@shikijs/langs/css",
  "@shikijs/langs/scss",
  "@shikijs/langs/dart",
  "@shikijs/langs/go",
  "@shikijs/langs/html",
  "@shikijs/langs/java",
  "@shikijs/langs/javascript",
  "@shikijs/langs/json",
  "@shikijs/langs/lua",
  "@shikijs/langs/markdown",
  "@shikijs/langs/php",
  "@shikijs/langs/proto",
  "@shikijs/langs/python",
  "@shikijs/langs/rust",
  "@shikijs/langs/sql",
  "@shikijs/langs/typescript",
  "@shikijs/langs/toml",
  "@shikijs/langs/xml",
  "@shikijs/langs/yaml",
  "@shikijs/langs/zig",
];

const shikiThemeDependencies = [
  "@shikijs/themes/github-dark",
  "@shikijs/themes/github-light",
  "@shikijs/themes/solarized-light",
  "@shikijs/themes/vitesse-light",
  "@shikijs/themes/catppuccin-latte",
  "@shikijs/themes/one-dark-pro",
  "@shikijs/themes/nord",
  "@shikijs/themes/material-theme-palenight",
  "@shikijs/themes/dracula",
  "@shikijs/themes/solarized-dark",
  "@shikijs/themes/monokai",
  "@shikijs/themes/dark-plus",
  "@shikijs/themes/vitesse-dark",
  "@shikijs/themes/catppuccin-mocha",
];

function modernMonacoRuntimePlugin() {
  return {
    name: "happyformatter-modern-monaco-runtime",
    resolveId(id) {
      if (id === modernMonacoRuntimeVirtualModuleId) {
        return resolvedModernMonacoRuntimeVirtualModuleId;
      }

      return null;
    },
    load(id) {
      if (id !== resolvedModernMonacoRuntimeVirtualModuleId) {
        return null;
      }

      return `export const modernMonacoEditorCoreUrl = ${
        JSON.stringify(`${modernMonacoRuntimeBasePath}/editor-core.mjs`)
      };`;
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const requestPath = request.url?.split("?")[0] ?? "";

        if (!requestPath.startsWith(`${modernMonacoRuntimeBasePath}/`)) {
          next();
          return;
        }

        const fileName = posix.basename(requestPath);
        if (!modernMonacoRuntimeFiles.includes(fileName)) {
          next();
          return;
        }

        response.statusCode = 200;
        response.setHeader("Content-Type", "text/javascript; charset=utf-8");
        response.setHeader("Cache-Control", "no-cache");

        const fileStream = createReadStream(join(modernMonacoRuntimeDir, fileName));
        fileStream.on("error", () => {
          response.statusCode = 404;
          response.end();
        });
        fileStream.pipe(response);
      });
    },
    generateBundle() {
      for (const fileName of modernMonacoRuntimeFiles) {
        this.emitFile({
          type: "asset",
          fileName: `vendor/modern-monaco/${modernMonacoPackageJson.version}/${fileName}`,
          source: readFileSync(join(modernMonacoRuntimeDir, fileName)),
        });
      }
    },
  };
}

function noStoreDevModulesPlugin() {
  return {
    name: "happyformatter-no-store-dev-modules",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const requestPath = request.url?.split("?")[0] ?? "";
        const isModuleRequest = requestPath.startsWith("/@id/")
          || requestPath.startsWith("/@react-refresh")
          || requestPath.startsWith("/node_modules/")
          || requestPath.startsWith("/src/");

        if (isModuleRequest) {
          delete request.headers["if-none-match"];
          delete request.headers["if-modified-since"];
          response.setHeader("Cache-Control", "no-store");
        }

        next();
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://happyformatter.com",
  redirects: createLegacyRedirects(),
  session: {
    driver: sessionDrivers.null(),
  },

  integrations: [
    sitemap({
      filter: shouldIncludeInSitemap,
      xslURL: "/sitemap.xsl",
    }),
    react(),
    playformCompress(),
    ...(enablePartytown
      ? [
        partytown({
          config: {
            forward: ["dataLayer.push", "gtag"],
          },
        }),
      ]
      : []),
  ],

  prefetch: true,

  vite: {
    plugins: [noStoreDevModulesPlugin(), modernMonacoRuntimePlugin(), wasm(), tailwind()],
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
      include: [
        "@radix-ui/react-accordion",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-select",
        "@radix-ui/react-slot",
        "class-variance-authority",
        "clsx",
        "lucide-react",
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-dev-runtime",
        "react/jsx-runtime",
        "tailwind-merge",
        "zustand",
      ],
      exclude: [
        "@astrojs/react/client.js",
        "@wasm-fmt/clang-format/web",
        "@wasm-fmt/dart_fmt/web",
        "@wasm-fmt/gofmt/web",
        "@wasm-fmt/lua_fmt/web",
        "@wasm-fmt/ruff_fmt/web",
        "@wasm-fmt/sql_fmt/web",
        "@wasm-fmt/yamlfmt/web",
        "@wasm-fmt/biome_fmt/web",
        "@wasm-fmt/mago_fmt/web",
        "@swc/wasm-web",
        "lightningcss-wasm",
        "@wasm-fmt/web_fmt/web",
        "@wasm-fmt/zig_fmt/web",
        "modern-monaco/core",
        "modern-monaco/editor-core",
        ...shikiLanguageDependencies,
        ...shikiThemeDependencies,
      ],
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
    ssr: {
      external: ["fs", "path"],
    },
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "cloudflare",
    prerenderEnvironment: "node",
  }),
});
