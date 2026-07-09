import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Container from "@/components/Container";
import Icon from "@/components/Icon";
import { SITE_URL, WA_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { advantagesQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { Advantage, SiteSettings } from "@/sanity/lib/types";

const TITLE = "Tentang Kami";
const DESCRIPTION =
  "Mitra Telur Jogja adalah supplier telur ayam komersial dan telur omega untuk bisnis kuliner dan konsumen rumah tangga di Daerah Istimewa Yogyakarta.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/tentang` },
  openGraph: {
    title: `${TITLE} | Mitra Telur Jogja`,
    description: DESCRIPTION,
    url: `${SITE_URL}/tentang`,
  },
};

export default async function TentangPage() {
  const [settings, advantages] = await Promise.all([
    sanityFetch<SiteSettings | null>(siteSettingsQuery),
    sanityFetch<Advantage[]>(advantagesQuery),
  ]);

  const stats = settings?.stats?.filter((s) => s.value && s.label) ?? [];

  return (
    <>
      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <p className="section-label">Tentang Kami</p>
          <h1 className="section-title">
            Supplier telur yang bisa diandalkan setiap hari
          </h1>

          {/* Dirender setinggi 112px (h-28), lebar ~158px; ini 2x-nya. */}
          <Image
            src="/logo-mtj.png"
            alt="Logo Mitra Telur Jogja"
            width={316}
            height={224}
            sizes="158px"
            className="mt-8 h-28 w-auto"
          />

          <p className="mt-8 text-lg text-ink-mid">
            {settings?.description ?? DESCRIPTION}
          </p>

          <p className="mt-5 leading-relaxed text-ink-mid">
            Kami berbasis di {settings?.address ?? "Potorono, Banguntapan, Bantul"} dan
            melayani seluruh wilayah Daerah Istimewa Yogyakarta. Telur kami datang
            langsung dari peternakan, sehingga kesegaran dan kualitasnya konsisten
            di setiap pengiriman.
          </p>

          <p className="mt-5 leading-relaxed text-ink-mid">
            Pelanggan kami mencakup restoran, hotel, cafe, katering, toko grosir,
            dan UMKM, sekaligus konsumen rumah tangga yang memesan tanpa minimal
            pembelian. Harga diperbarui setiap hari mengikuti harga pasar, dan
            telur yang pecah atau retak saat diterima kami ganti.
          </p>

          {stats.length > 0 && (
            <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-brand bg-white p-6 text-center shadow-brand"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-extrabold text-brand-rust">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm text-ink-mid">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Container>
      </section>

      {advantages.length > 0 && (
        <section className="bg-cream-2 py-16 md:py-20">
          <Container>
            <h2 className="section-title">Yang Kami Janjikan</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.map((item) => (
                <article
                  key={item._id}
                  className="rounded-brand border border-ink/10 bg-white p-6"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-brand bg-brand-orange/10 text-brand-rust">
                    <Icon name={item.icon} />
                  </span>
                  <h3 className="mt-4 font-bold text-ink">{item.title}</h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-ink-mid">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 md:py-20">
        <Container className="text-center">
          <h2 className="section-title">Mau mulai memesan?</h2>
          <p className="mt-3 text-ink-mid">
            Hubungi kami via WhatsApp, atau lihat pilihan produk terlebih dahulu.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={16} /> Pesan via WhatsApp
            </a>
            <Link href="/produk" className="btn btn-secondary">
              Lihat Produk
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
