import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Applebot",
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "PerplexityBot",
        ],
        allow: "/",
        disallow: ["/admin/", "/login/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/login/"],
      },
    ],
    sitemap: "https://www.sunlynksolar.com/sitemap.xml",
  }
}
