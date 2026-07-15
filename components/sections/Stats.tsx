import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import type { SiteSettings } from "@/sanity/lib/types";

/** Dipakai bila owner belum mengisi `stats` di siteSettings. Angka dari halaman lama. */
const FALLBACK_STATS = [
  { value: "200+", label: "Mitra Aktif" },
  { value: "100%", label: "Gratis Ongkir DIY" },
  { value: "Harian", label: "Update Harga" },
  { value: "0", label: "Minimal Pembelian" },
];

const SEGMENT_CHIPS = [
  "SPPG",
  "Katering",
  "Restoran",
  "Grosir",
  "UMKM",
  "Retail",
  "Toko Madura",
];

export default function Stats({ settings }: { settings: SiteSettings | null }) {
  const stats = settings?.stats?.filter((s) => s.value && s.label) ?? [];
  const items = stats.length > 0 ? stats : FALLBACK_STATS;

  return (
    <section id="mitra" className="section bg-surface-dark">
      <Container>
        <Reveal>
          <p className="mb-3 block text-xs font-bold uppercase tracking-[0.14em] text-brand-yellow">
            Dipercaya Ratusan Mitra
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-[2.5rem]">
            200+ Bisnis &amp; Konsumen Sudah Mempercayai Kami
          </h2>
          <p className="mt-4 max-w-xl text-white/70">
            Dari UMKM lokal hingga perusahaan katering besar, Mitra Telur
            Jogja menjadi pilihan utama supplier telur di Yogyakarta.
          </p>
        </Reveal>

        <dl className="mt-12 grid gap-8 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-black tracking-tight text-brand-yellow md:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-white/70">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal as="ul" delay={200} className="mt-12 flex flex-wrap gap-2">
          {SEGMENT_CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-pill border border-white/20 px-4 py-1.5 text-xs font-semibold text-white/80"
            >
              {chip}
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
