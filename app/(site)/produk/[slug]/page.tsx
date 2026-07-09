import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import { formatPrice } from "@/lib/format";
import { breadcrumbSchema, productSchema } from "@/lib/jsonld";
import { SITE_URL, waLink } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productBySlugQuery, productSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Product } from "@/sanity/lib/types";

// Next 15: `params` adalah Promise.
type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(productSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await sanityFetch<Product | null>(productBySlugQuery, {
    slug,
  });

  if (!product) return { title: "Produk tidak ditemukan" };

  const url = `${SITE_URL}/produk/${product.slug}`;
  const description =
    product.description ?? `${product.name} dari Mitra Telur Jogja.`;

  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | Mitra Telur Jogja`,
      description,
      url,
      ...(product.image && {
        images: [urlFor(product.image).width(1200).height(630).fit("crop").url()],
      }),
    },
  };
}

const AVAILABILITY_LABEL: Record<string, string> = {
  InStock: "Stok tersedia",
  OutOfStock: "Stok habis",
  PreOrder: "Pre-order",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = await sanityFetch<Product | null>(productBySlugQuery, {
    slug,
  });

  if (!product) notFound();

  const { name, description, image, price, unit, availability } = product;
  const hasPrice = typeof price === "number";

  return (
    <section className="py-16 md:py-20">
      <JsonLd data={productSchema(product)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Beranda", path: "/" },
          { name: "Produk", path: "/produk" },
          { name },
        ])}
      />
      <Container>
        <Link
          href="/produk"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-mid transition hover:text-brand-rust"
        >
          <ArrowLeft size={16} aria-hidden /> Semua produk
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-brand bg-cream-2">
            {image ? (
              <Image
                src={urlFor(image).width(1000).height(750).fit("crop").url()}
                alt={name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-ink-muted">
                Gambar menyusul
              </div>
            )}
          </div>

          <div>
            <h1 className="font-display text-3xl font-extrabold text-ink md:text-4xl">
              {name}
            </h1>

            {availability && (
              <p className="mt-3 inline-block rounded-brand bg-cream-2 px-3 py-1 text-xs font-bold text-ink-mid">
                {AVAILABILITY_LABEL[availability] ?? availability}
              </p>
            )}

            {description && (
              <p className="mt-5 text-ink-mid">{description}</p>
            )}

            <div className="mt-8">
              {hasPrice ? (
                <p className="font-display text-4xl font-extrabold text-brand-rust">
                  {formatPrice(price)}
                  {unit && (
                    <span className="ml-2 text-base font-medium text-ink-muted">
                      / {unit}
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-ink-muted">
                  Harga diupdate setiap hari — hubungi kami untuk penawaran
                  terkini.
                </p>
              )}
            </div>

            <a
              href={waLink(`Halo, saya ingin tanya harga ${name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8"
            >
              <MessageCircle size={16} />
              {hasPrice ? "Pesan Sekarang" : "Tanya Harga"}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
