import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import simpleStackQuery from "simple-stack-query";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

import partytown from "@astrojs/partytown";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://happyformatter.com",

  integrations: [
    sitemap({
      xslURL: "/sitemap.xsl",
    }),
    react(),
    playformCompress(),
    simpleStackQuery(),
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
      },
    }),
  ],

  prefetch: true,

  vite: {
    plugins: [wasm(), topLevelAwait(), tailwind()],
    optimizeDeps: {
      exclude: [
        "dprint-node",
        "@wasm-fmt/clang-format",
        "@wasm-fmt/dart_fmt",
        "@wasm-fmt/gofmt",
        "@wasm-fmt/lua_fmt",
        "@wasm-fmt/ruff_fmt",
        "@wasm-fmt/sql_fmt",
        "@wasm-fmt/yamlfmt",
        "@wasm-fmt/biome_fmt",
        "@wasm-fmt/mago_fmt",
        "@minify-html/wasm",
        "@swc/wasm-web",
        "lightningcss-wasm",
        "@wasm-fmt/web_fmt",
        "@wasm-fmt/zig_fmt",
      ],
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            codemirror: [
              "@codemirror/view",
              "@codemirror/state",
              "@codemirror/language",
              "@codemirror/autocomplete",
              "@codemirror/commands",
              "@codemirror/search",
              "@codemirror/lint",
            ],
            "codemirror-themes": [
              "@codemirror/theme-one-dark",
              "@uiw/codemirror-themes",
              "@uiw/codemirror-theme-dracula",
              "@uiw/codemirror-theme-github",
              "@uiw/codemirror-theme-material",
              "@uiw/codemirror-theme-nord",
              "@uiw/codemirror-theme-okaidia",
              "codemirror-theme-vitesse",
            ],
            "codemirror-langs": [
              "@codemirror/lang-cpp",
              "@codemirror/lang-css",
              "@codemirror/lang-html",
              "@codemirror/lang-java",
              "@codemirror/lang-javascript",
              "@codemirror/lang-json",
              "@codemirror/lang-markdown",
              "@codemirror/lang-php",
              "@codemirror/lang-python",
              "@codemirror/lang-rust",
              "@codemirror/lang-sql",
              "@codemirror/lang-xml",
              "@codemirror/lang-yaml",
            ],
            "formatters": [
              "@wasm-fmt/clang-format",
              "@wasm-fmt/dart_fmt",
              "@wasm-fmt/gofmt",
              "@wasm-fmt/lua_fmt",
              "@wasm-fmt/ruff_fmt",
              "@wasm-fmt/sql_fmt",
              "@wasm-fmt/web_fmt",
              "@wasm-fmt/yamlfmt",
              "@wasm-fmt/zig_fmt",
              "@wasm-fmt/biome_fmt",
              "@wasm-fmt/mago_fmt",
              "prettier",
              "@prettier/plugin-php",
              "xml-formatter",
            ],
            shiki: [
              "@shikijs/langs",
              "@shikijs/themes",
              "shiki",
            ],
          },
        },
      },
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
  }),
});
