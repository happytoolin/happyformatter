import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://happyformatter.com",
  integrations: [sitemap(), tailwind(), react(), playformCompress()],
  output: "static",
});
