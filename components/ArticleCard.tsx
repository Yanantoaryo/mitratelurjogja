import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { ArticleSummary } from "@/sanity/lib/types";
import { formatDate } from "@/lib/format";

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  const { title, slug, excerpt, coverImage, coverAlt, publishedAt, category } =
    article;

  return (
    <article className="card card-hover flex w-full flex-col overflow-hidden">
      <Link href={`/blog/${slug}`} className="relative block aspect-[16/9] bg-cream-2">
        {coverImage ? (
          <Image
            src={urlFor(coverImage).width(800).height(450).fit("crop").url()}
            alt={coverAlt ?? title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-sm text-ink-muted">
            Tanpa gambar sampul
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          {category && (
            <span className="rounded-brand bg-brand-orange/10 px-2 py-1 font-bold text-brand-rust">
              {category.title}
            </span>
          )}
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </p>

        <h2 className="mt-3 font-display text-lg font-extrabold leading-snug text-ink">
          <Link href={`/blog/${slug}`} className="hover:text-brand-rust">
            {title}
          </Link>
        </h2>

        {excerpt && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink-mid">
            {excerpt}
          </p>
        )}

        <Link
          href={`/blog/${slug}`}
          className="mt-4 text-sm font-bold text-brand-rust hover:underline"
        >
          Baca selengkapnya
        </Link>
      </div>
    </article>
  );
}
