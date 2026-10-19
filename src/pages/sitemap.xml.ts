import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const pages = Object.keys(import.meta.glob("./*.astro")).filter((path) => path !== "./404.astro");
  const urls = pages.sort().map((path) => {
    const slug = path.slice(2, -6);
    return new URL(`${base}/${slug === "index" ? "" : slug}`, site).href;
  });
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
