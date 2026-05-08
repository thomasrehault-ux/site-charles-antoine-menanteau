import { defineConfig } from "astro/config";

export default defineConfig(({ command }) => ({
  site: "https://thomasrehault-ux.github.io",
  base: command === "build" ? "/site-charles-antoine-menanteau" : "/"
}));
