import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ArticleBody from "@/components/ArticleBody";
import ArticleCard from "@/components/ArticleCard";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import ShareButtons from "@/components/ShareButtons";
import { formatDate } from "@/lib/format";
import { blogPostingSchema } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import {
  articleBySlugQuery,
  articleSlugsQuery,
  relatedArticlesQuery,
} from "@/sanity/lib/queries";
import type { Article, ArticleSummary } from "@/sanity/lib/types";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(articleSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

function coverUrl(article: Article, w: number, h: number) {
  return article.coverImage
    ? urlFor(article.coverImage).width(w).height(h).fit("crop").url()
    : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await sanityFetch<Article | null>(articleBySlugQuery, {
    slug,
  });
  if (!article) return { title: "Artikel tidak ditemukan" };

  const url = `${SITE_URL}/blog/${article.slug}`;
  const og = coverUrl(article, 1200, 630);

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url,
      publishedTime: article.publishedAt,
      ...(og && { images: [og] }),
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await sanityFetch<Article | null>(articleBySlugQuery, {
    slug,
  });
  if (!article) notFound();

  const related = article.category
    ? await sanityFetch<ArticleSummary[]>(relatedArticlesQuery, {
        slug: article.slug,
        category: article.category.slug,
      })
    : [];

  const url = `${SITE_URL}/blog/${article.slug}`;
  const hero = coverUrl(article, 1400, 700);

  return (
    <article className="py-16 md:py-20">
      <JsonLd
        data={blogPostingSchema(article, { coverUrl: coverUrl(article, 1200, 630) })}
      />

      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-mid transition hover:text-brand-orange"
        >
          <ArrowLeft size={16} aria-hidden /> Semua artikel
        </Link>

        <header className="mt-8">
          <p className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
            {article.category && (
              <Link
                href={`/blog?kategori=${article.category.slug}`}
                className="rounded-brand bg-brand-orange/10 px-2 py-1 font-bold text-brand-orange hover:underline"
              >
                {article.category.title}
              </Link>
            )}
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            {article.author && <span>· {article.author}</span>}
          </p>

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="mt-4 text-lg text-ink-mid">{article.excerpt}</p>
          )}
        </header>

        {hero && (
          <Image
            src={hero}
            alt={article.coverAlt ?? article.title}
            width={1400}
            height={700}
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="mt-8 h-auto w-full rounded-brand"
          />
        )}

        {article.body?.length ? (
          <div className="mt-4">
            <ArticleBody value={article.body} />
          </div>
        ) : null}

        {article.tags?.length ? (
          <ul className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-brand bg-cream-2 px-3 py-1.5 text-xs font-medium text-ink-mid"
              >
                #{tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 border-t border-ink/10 pt-8">
          <ShareButtons url={url} title={article.title} />
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16">
          <h2 className="section-title text-2xl">Artikel Terkait</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
