import type { Metadata } from "next";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productsQuery } from "@/sanity/lib/queries";
import type { Product } from "@/sanity/lib/types";

const TITLE = "Produk Telur";
const DESCRIPTION =
  "Telur ayam komersial dan telur omega berkualitas tinggi. Harga diupdate harian, gratis ongkir se-DIY, garansi telur pecah.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/produk` },
  openGraph: {
    title: `${TITLE} | Mitra Telur Jogja`,
    description: DESCRIPTION,
    url: `${SITE_URL}/produk`,
  },
};

export default async function ProductsPage() {
  const products = await sanityFetch<Product[]>(productsQuery);

  return (
    <section className="section">
      <Container>
        <Reveal>
          <p className="section-label">Produk Kami</p>
          <h1 className="section-title">Pilihan Telur Berkualitas Tinggi</h1>
          <p className="mt-4 max-w-xl text-ink-mid">
            Harga lebih murah mulai 1 peti (15 kg). Penawaran spesial untuk
            B2B.
          </p>
        </Reveal>

        {products.length === 0 ? (
          <p className="mt-10 rounded-brand border border-dashed border-ink/20 px-6 py-10 text-center text-sm text-ink-muted">
            Produk belum tersedia. Tambahkan lewat Studio.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product._id} delay={(i % 3) * 90} className="flex">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
