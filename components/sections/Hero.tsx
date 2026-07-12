import Link from "next/link";
import {
  MessageCircle,
  ArrowDown,
  Truck,
  Users,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import Container from "@/components/Container";
import { WA_URL } from "@/lib/site";

const BADGES = [
  { Icon: Users, label: "200+ Mitra Aktif" },
  { Icon: Truck, label: "Gratis Ongkir" },
  { Icon: ShieldCheck, label: "Garansi Kerusakan" },
  { Icon: CheckCircle, label: "Stok Selalu Ada" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-2 py-20 md:py-28">
      <Container>
        <span className="section-label">Potorono, Bantul, Yogyakarta</span>
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-[-0.02em] text-ink md:text-7xl">
          Supplier Telur{" "}
          <em className="not-italic text-brand-orange">Segar &amp; Terpercaya</em>{" "}
          di Yogyakarta
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-mid">
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
          {BADGES.map(({ Icon: BadgeIcon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 rounded-brand bg-white px-4 py-2 text-sm font-medium text-ink-mid shadow-brand"
            >
              <BadgeIcon size={16} className="text-brand-rust" /> {label}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
