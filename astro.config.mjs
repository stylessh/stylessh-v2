import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind(), compress({
    img: false
  })],
  experimental: {
    integrations: true
  },
});