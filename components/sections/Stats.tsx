import Container from "@/components/Container";
import type { SiteSettings } from "@/sanity/lib/types";

/** Dipakai bila owner belum mengisi `stats` di siteSettings. Angka dari halaman lama. */
const FALLBACK_STATS = [
  { value: "200+", label: "Mitra Aktif" },
  { value: "100%", label: "Gratis Ongkir DIY" },
  { value: "Daily", label: "Update Harga" },
  { value: "0", label: "Minimal Pembelian" },
];

const SEGMENT_CHIPS = [
  "🏫 SPPG",
  "🥘 Katering",
  "🍽️ Restoran",
  "🏪 Grosir",
  "🏢 UMKM",
  "🛒 Retail",
  "🏬 Toko Madura",
];

export default function Stats({ settings }: { settings: SiteSettings | null }) {
  const stats =
    settings?.stats?.filter((s) => s.value && s.label) ?? [];
  const items = stats.length > 0 ? stats : FALLBACK_STATS;

  return (
    <section id="mitra" className="py-16 md:py-20">
      <Container>
        <p className="section-label">Dipercaya Ratusan Mitra</p>
        <h2 className="section-title max-w-2xl">
          200+ Bisnis &amp; Konsumen Sudah Mempercayai Kami
        </h2>
        <p className="mt-3 max-w-xl text-ink-mid">
          Dari UMKM lokal hingga perusahaan katering besar, Mitra Telur Jogja
          menjadi pilihan utama supplier telur di Yogyakarta.
        </p>

        <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat) => (
            <div
              key={stat.label}
              className="rounded-brand bg-white p-6 text-center shadow-brand"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-extrabold text-brand-orange">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-ink-mid">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {SEGMENT_CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-brand border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink-mid"
            >
              {chip}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
