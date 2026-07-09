import Link from "next/link";
import { MessageCircle, ArrowDown, Truck, Users, ShieldCheck, CheckCircle } from "lucide-react";
import Container from "@/components/Container";

const WA_URL = "https://wa.me/6285702275769";

const BADGES = [
  { Icon: Users, label: "200+ Mitra Aktif" },
  { Icon: Truck, label: "Gratis Ongkir" },
  { Icon: ShieldCheck, label: "Garansi Kerusakan" },
  { Icon: CheckCircle, label: "Stok Selalu Ada" },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Container>
          <p className="section-label">
            Potorono, Bantul, Yogyakarta
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] text-ink md:text-6xl">
            Supplier Telur{" "}
            <em className="not-italic text-brand-orange">Segar &amp; Terpercaya</em>{" "}
            di Yogyakarta
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-mid">
            Mitra Telur Jogja menyediakan telur ayam komersial dan telur omega
            berkualitas tinggi untuk seluruh wilayah DIY. Gratis ongkir, fresh
            dari farm, langsung diantar ke lokasi Anda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={16} /> Pesan via WhatsApp
            </a>
            <Link href="/#produk" className="btn btn-secondary">
              Lihat Produk <ArrowDown size={16} />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            {BADGES.map(({ Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-brand bg-white px-4 py-2 text-sm font-medium text-ink-mid shadow-brand"
              >
                <Icon size={16} className="text-brand-orange" /> {label}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Placeholder — section dinamis (produk, keunggulan, testimoni, FAQ)
          akan diisi dari Sanity di Fase 2. */}
      <section id="produk" className="py-16">
        <Container>
          <p className="section-label">Fase 2</p>
          <h2 className="section-title">Konten dinamis segera hadir</h2>
          <p className="mt-3 max-w-xl text-ink-mid">
            Section Produk, Keunggulan, Testimoni, dan FAQ akan ditarik dari
            Sanity CMS pada Fase 2. Scaffold Fase 1 sudah siap.
          </p>
        </Container>
      </section>
    </>
  );
}
