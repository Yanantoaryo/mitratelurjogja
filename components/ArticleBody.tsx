import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-2xl font-extrabold text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl font-bold text-ink">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-brand-orange pl-5 italic text-ink-mid">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-5 leading-relaxed text-ink-mid">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-ink-mid">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-ink-mid">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-ink">{children}</strong>
    ),
    link: ({ value, children }) => {
      const href = String(value?.href ?? "");
      const isExternal = /^https?:\/\//.test(href);
      if (!isExternal) {
        return (
          <Link href={href} className="text-brand-orange hover:underline">
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-brand-orange hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="mt-8">
          <Image
            src={urlFor(value).width(1200).fit("max").url()}
            alt={value.alt ?? ""}
            width={1200}
            height={800}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full rounded-brand"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-xs text-ink-muted">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
