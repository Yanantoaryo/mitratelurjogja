import Link from "next/link";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/sanity/lib/types";

export default function Products({ items }: { items: Product[] }) {
  return (
    <section id="produk" className="section bg-cream-2">
      <Container>
        <Reveal>
          <p className="section-label">Produk Kami</p>
          <h2 className="section-title">Pilihan Telur Berkualitas Tinggi</h2>
          <p className="mt-3 max-w-xl text-ink-mid">
            Harga lebih murah mulai 1 peti (15 kg). Penawaran spesial untuk
            B2B.
          </p>
        </Reveal>

        {items.length === 0 ? (
          <p className="mt-10 rounded-brand border border-dashed border-ink/20 px-6 py-10 text-center text-sm text-ink-muted">
            Produk belum tersedia. Tambahkan lewat Studio.
          </p>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {items.map((product, i) => (
                <Reveal key={product._id} delay={(i % 2) * 100} className="flex">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8">
              <Link href="/produk" className="btn btn-secondary">
                Lihat Semua Produk
              </Link>
            </Reveal>
          </>
        )}
      </Container>
    </section>
  );
}
