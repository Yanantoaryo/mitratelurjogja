import Image from "next/image";
import { X, Check } from "lucide-react";
import Container from "@/components/Container";

const PAINS = [
  {
    title: "Stok Tidak Pasti",
    description:
      "Supplier sering kehabisan stok mendadak, mengganggu operasional dapur dan bisnis Anda.",
  },
  {
    title: "Telur Pecah Saat Dikirim",
    description:
      "Telur tiba dalam kondisi retak atau pecah tanpa ada jaminan penggantian dari supplier.",
  },
  {
    title: "Harga Tidak Transparan",
    description:
      "Harga tidak jelas, sering berubah tanpa pemberitahuan, dan sulit dibandingkan antar supplier.",
  },
  {
    title: "Ongkir Mahal",
    description:
      "Biaya pengiriman tinggi yang memotong keuntungan bisnis Anda, apalagi untuk pemesanan rutin.",
  },
];

const SOLUTIONS = [
  "Stok selalu tersedia, siap kirim setiap hari",
  "Telur pecah saat diterima kami ganti",
  "Harga transparan, update setiap hari",
  "Gratis ongkir ke seluruh DIY",
];

export default function Problem() {
  return (
    <section className="section bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="section-label">Masalah yang Sering Terjadi</p>
            <h2 className="section-title">
              Kesulitan Mencari Supplier Telur yang Bisa Diandalkan?
            </h2>
            <p className="mt-4 text-ink-mid">
              Banyak bisnis makanan dan konsumen mengalami masalah yang sama
              saat membeli telur.
            </p>
          </div>

          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {PAINS.map((pain) => (
              <li key={pain.title} className="flex gap-4 py-5">
                <X
                  size={18}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-ink-muted"
                />
                <div>
                  <p className="font-bold text-ink">{pain.title}</p>
                  <p className="mt-1 text-sm text-ink-mid">
                    {pain.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 overflow-hidden rounded-card bg-surface-dark">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-yellow">
                Solusi Kami
              </p>
              <h3 className="mt-3 font-display text-2xl font-black leading-tight text-white md:text-3xl">
                Kami hadir sebagai solusi.
              </h3>
              <ul className="mt-6 space-y-3">
                {SOLUTIONS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={18}
                      aria-hidden
                      className="mt-0.5 shrink-0 text-brand-yellow"
                    />
                    <span className="text-sm leading-relaxed text-white/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-64 md:min-h-full">
              <Image
                src="/img/delivery-van.jpg"
                alt="Armada Mitra Telur Jogja penuh peti telur siap diantar"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
