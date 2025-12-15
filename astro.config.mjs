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
    sitemap(),
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
        "@minify-html/wasm",
        "@swc/wasm-web",
        "lightningcss-wasm",
        "@wasm-fmt/web_fmt",
        "@wasm-fmt/zig_fmt",
      ],
    },
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "cloudflare",
  }),
});
