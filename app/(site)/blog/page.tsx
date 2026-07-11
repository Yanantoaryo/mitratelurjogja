import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import Container from "@/components/Container";
import { SITE_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { articleCategoriesQuery, articlesQuery } from "@/sanity/lib/queries";
import type { ArticleCategory, ArticleSummary } from "@/sanity/lib/types";

const TITLE = "Blog";
const DESCRIPTION =
  "Tips penyimpanan telur, informasi nutrisi, dan panduan pengadaan untuk bisnis kuliner dari Mitra Telur Jogja.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Kanonik selalu /blog tanpa query: hasil filter dan pencarian adalah
  // irisan dari halaman yang sama, bukan halaman baru untuk diindeks.
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `${TITLE} | Mitra Telur Jogja`,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
  },
};

type SearchParams = Promise<{ kategori?: string; q?: string }>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { kategori, q } = await searchParams;

  const category = kategori?.trim() || null;
  const term = q?.trim() || null;

  const [articles, categories] = await Promise.all([
    sanityFetch<ArticleSummary[]>(articlesQuery, {
      category,
      // GROQ `match` bekerja per token; sufiks bintang membuatnya cocok
      // sebagai awalan kata, sehingga "supp" menemukan "supplier".
      q: term ? `${term}*` : null,
    }),
    sanityFetch<ArticleCategory[]>(articleCategoriesQuery),
  ]);

  const hasFilter = Boolean(category || term);

  const chipClass = (active: boolean) =>
    `rounded-brand px-4 py-2 text-sm font-medium transition ${
      active
        ? "bg-brand-orange text-ink"
        : "border border-ink/15 bg-white text-ink-mid hover:border-brand-orange hover:text-brand-rust"
    }`;

  return (
    <section className="section">
      <Container>
        <p className="section-label">Blog</p>
        <h1 className="section-title">Wawasan Seputar Telur</h1>
        <p className="mt-3 max-w-xl text-ink-mid">{DESCRIPTION}</p>

        {/* Form GET biasa: filter dan pencarian tetap jalan tanpa JavaScript. */}
        <form method="get" action="/blog" className="mt-10 flex max-w-md gap-2">
          {category && <input type="hidden" name="kategori" value={category} />}
          <label htmlFor="q" className="sr-only">
            Cari artikel
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={term ?? ""}
            placeholder="Cari artikel…"
            className="w-full rounded-brand border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-brand-orange"
          />
          <button type="submit" className="btn btn-primary px-5">
            <Search size={16} aria-hidden />
            <span className="sr-only">Cari</span>
          </button>
        </form>

        <nav aria-label="Filter kategori" className="mt-6 flex flex-wrap gap-2">
          <Link
            href={term ? `/blog?q=${encodeURIComponent(term)}` : "/blog"}
            className={chipClass(!category)}
          >
            Semua
          </Link>
          {categories.map((c) => {
            const params = new URLSearchParams({ kategori: c.slug });
            if (term) params.set("q", term);
            return (
              <Link
                key={c._id}
                href={`/blog?${params.toString()}`}
                className={chipClass(category === c.slug)}
              >
                {c.title}
              </Link>
            );
          })}
        </nav>

        {hasFilter && (
          <p className="mt-6 text-sm text-ink-mid">
            {articles.length} artikel ditemukan
            {term && (
              <>
                {" "}
                untuk <strong className="text-ink">“{term}”</strong>
              </>
            )}
            .{" "}
            <Link href="/blog" className="text-brand-rust hover:underline">
              Reset filter
            </Link>
          </p>
        )}

        {articles.length === 0 ? (
          <p className="mt-10 rounded-brand border border-dashed border-ink/20 px-6 py-10 text-center text-sm text-ink-muted">
            {hasFilter
              ? "Tidak ada artikel yang cocok. Coba kata kunci lain."
              : "Belum ada artikel. Tambahkan lewat Studio."}
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
