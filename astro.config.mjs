import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://charlesantoinemenanteau.fr",
  base: process.env.SITE_BASE_PATH || "/"
});
