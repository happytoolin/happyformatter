import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
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
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
      },
    }),
  ],

  prefetch: true,

  vite: {
    plugins: [wasm(), tailwind()],
    optimizeDeps: {
      exclude: [
        "dprint-node",
        "@wasm-fmt/clang-format/web",
        "@wasm-fmt/dart_fmt/web",
        "@wasm-fmt/gofmt/web",
        "@wasm-fmt/lua_fmt/web",
        "@wasm-fmt/ruff_fmt/web",
        "@wasm-fmt/sql_fmt/web",
        "@wasm-fmt/yamlfmt/web",
        "@wasm-fmt/biome_fmt/web",
        "@wasm-fmt/mago_fmt/web",
        "@minify-html/wasm",
        "@swc/wasm-web",
        "lightningcss-wasm",
        "@wasm-fmt/web_fmt/web",
        "@wasm-fmt/zig_fmt/web",
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
