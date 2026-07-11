import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { sitemapEntriesQuery } from "@/sanity/lib/queries";

/**
 * Sitemap dibangun saat request, bukan saat build. Auto-artikel menulis
 * artikel dua kali seminggu dan artikel terjadwal terbit sendiri saat
 * publishedAt terlampaui; sitemap yang dibekukan di build hanya akan
 * memuat isi dataset pada saat deploy terakhir.
 */
export const revalidate = 3600;

interface SitemapEntries {
  articles: { slug: string; _updatedAt: string }[];
  products: { slug: string; _updatedAt: string }[];
}

const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/produk", changeFrequency: "daily", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/galeri", changeFrequency: "monthly", priority: 0.5 },
  { path: "/tentang", changeFrequency: "monthly", priority: 0.5 },
  { path: "/kontak", changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, products } = await sanityFetch<SitemapEntries>(
    sitemapEntriesQuery,
    {},
    revalidate
  );

  const now = new Date();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/produk/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: new Date(a._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
