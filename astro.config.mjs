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

// https://astro.build/config
export default defineConfig({
  site: "https://happyformatter.com",
  session: {
    driver: sessionDrivers.null(),
  },

  integrations: [
    sitemap({
      filter: page => page !== "https://happyformatter.com/modern-monaco-test/",
      xslURL: "/sitemap.xsl",
    }),
    react(),
    playformCompress(),
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
      },
    }),
  ],

  prefetch: true,

  vite: {
    plugins: [modernMonacoRuntimePlugin(), wasm(), tailwind()],
    optimizeDeps: {
      exclude: [
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
