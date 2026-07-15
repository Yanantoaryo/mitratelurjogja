import Image from "next/image";
import {
  MessageCircle,
  Truck,
  Users,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { WA_URL } from "@/lib/site";

const PROOFS = [
  { Icon: Users, label: "200+ Mitra Aktif" },
  { Icon: Truck, label: "Gratis Ongkir Se-DIY" },
  { Icon: ShieldCheck, label: "Garansi Telur Pecah" },
  { Icon: PackageCheck, label: "Stok Selalu Ada" },
];

/**
 * Hero mengikuti pola BroilerX: judul 48px/900 di tengah, subjudul 18px/700,
 * satu CTA kuning. Montase farm (hero-farm.png) dipasang sebagai background
 * penuh section (object-cover, ditambat ke bawah agar keranjang telur selalu
 * terlihat); teks duduk di area langit putih bagian atas gambar.
 */
export default function Hero() {
  return (
    // Margin negatif menarik section ke balik navbar mengambang (meniadakan
    // padding-top <main> di layout), sehingga background tampil penuh dari
    // tepi atas viewport; ruang untuk pill nav diganti padding-top konten.
    <section className="relative -mt-20 overflow-hidden bg-white md:-mt-24">
      <Image
        src="/img/hero-farm.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom"
      />

      <div className="relative pb-8 pt-28 md:pb-12 md:pt-40">
        <Container className="text-center">
          <Reveal>
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-ink md:text-[3rem]">
              Telur Segar dari Farm, Diantar ke Lokasi Anda
            </h1>
          </Reveal>
          <Reveal
            as="p"
            delay={100}
            className="mx-auto mt-5 max-w-2xl text-lg font-bold text-ink-mid"
          >
            Telur Ayam Komersial &amp; Telur Omega — Gratis Ongkir Seluruh DI
            Yogyakarta
          </Reveal>
          <Reveal
            as="p"
            delay={160}
            className="mx-auto mt-2 max-w-2xl text-sm font-semibold text-ink-muted"
          >
            Sleman, Bantul, Kota Yogyakarta, Kulon Progo, Gunungkidul
          </Reveal>
          <Reveal delay={220} className="mt-8 flex justify-center">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-10"
            >
              <MessageCircle size={16} /> Pesan via WhatsApp
            </a>
          </Reveal>
        </Container>

        {/* Jendela agar montase farm & keranjang telur terlihat di bawah teks. */}
        <div aria-hidden className="h-64 md:h-[26rem]" />

        <Container>
          <Reveal
            as="ul"
            className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-card border border-ink/10 bg-white px-6 py-6 shadow-card md:grid-cols-4 md:px-8"
          >
            {PROOFS.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-brand bg-brand-yellow/15 text-ink">
                  <Icon size={19} aria-hidden />
                </span>
                <span className="text-sm font-semibold text-ink">{label}</span>
              </li>
            ))}
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
