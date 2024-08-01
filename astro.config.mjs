// import sitemap from "@astrojs/sitemap";
// import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://happyformatter.com",
  // integrations: [sitemap(), tailwind()],
  output: "static",
  adapter: cloudflare(),
});
