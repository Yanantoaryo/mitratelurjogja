import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Crawler AI diizinkan secara eksplisit (GEO), sesuai PRD. */
const AI_CRAWLERS = ["GPTBot", "PerplexityBot", "Google-Extended", "ClaudeBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /studio adalah CMS; /api menulis ke dataset dan tidak punya konten.
        disallow: ["/studio", "/studio/", "/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
