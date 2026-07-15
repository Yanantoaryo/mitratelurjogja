import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { Product } from "@/sanity/lib/types";
import { formatPrice } from "@/lib/format";
import { waLink } from "@/lib/site";

export default function ProductCard({ product }: { product: Product }) {
  const { name, slug, description, image, price, unit, availability } = product;
  const soldOut = availability === "OutOfStock";

  return (
    <article className="card card-hover flex w-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-cream-2">
        {image ? (
          <Image
            src={urlFor(image).width(800).height(600).fit("crop").url()}
            alt={name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-muted">
            Gambar menyusul
          </div>
        )}
        {soldOut && (
          <span className="absolute left-4 top-4 rounded-brand bg-ink px-3 py-1 text-xs font-bold text-white">
            Stok Habis
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-extrabold text-ink">
          <Link href={`/produk/${slug}`} className="hover:text-brand-rust">
            {name}
          </Link>
        </h3>

        {description && (
          <p className="mt-2 line-clamp-3 text-sm text-ink-mid">{description}</p>
        )}

        <div className="mt-4 flex-1">
          {typeof price === "number" ? (
            <p className="font-display text-2xl font-extrabold text-brand-rust">
              {formatPrice(price)}
              {unit && (
                <span className="ml-1 text-sm font-medium text-ink-muted">
                  / {unit}
                </span>
              )}
            </p>
          ) : (
            // Owner belum mengisi harga: pertahankan perilaku halaman lama,
            // yaitu arahkan ke WhatsApp alih-alih menampilkan angka.
            <p className="text-sm text-ink-muted">
              Harga diupdate setiap hari — hubungi kami
            </p>
          )}
        </div>

        <a
          href={waLink(`Halo, saya ingin tanya harga ${name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-5 justify-center"
        >
          <MessageCircle size={16} />
          {typeof price === "number" ? "Pesan Sekarang" : "Tanya Harga"}
        </a>
      </div>
    </article>
  );
}
