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
    <section className="relative overflow-hidden py-20 md:py-28">
      <Container>
        <p className="section-label">Potorono, Bantul, Yogyakarta</p>
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
          {BADGES.map(({ Icon: BadgeIcon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 rounded-brand bg-white px-4 py-2 text-sm font-medium text-ink-mid shadow-brand"
            >
              <BadgeIcon size={16} className="text-brand-orange" /> {label}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
