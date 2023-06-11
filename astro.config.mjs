import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import compress from "astro-compress";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), compress({
    img: false
  }), tailwind()]
});