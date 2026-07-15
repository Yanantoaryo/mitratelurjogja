import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const SEGMENTS = [
  {
    image: "/img/tray-eggs.jpg",
    imageAlt: "Peti telur dalam jumlah besar untuk pasokan bisnis",
    kicker: "B2B — Business to Business",
    title: "Untuk Bisnis & Usaha",
    description:
      "Kami menjadi mitra terpercaya untuk bisnis kuliner dan distribusi yang membutuhkan pasokan telur rutin, berkualitas, dan dalam jumlah besar. Tersedia penawaran harga khusus dan kerja sama jangka panjang.",
    tags: ["Restoran", "Hotel", "Cafe", "Catering", "Grosir"],
  },
  {
    image: "/img/bowl-eggs.jpg",
    imageAlt: "Semangkuk telur segar untuk kebutuhan rumah tangga",
    kicker: "B2C — Business to Consumer",
    title: "Untuk Konsumen Langsung",
    description:
      "Tidak hanya untuk bisnis — kami juga melayani pembelian langsung oleh konsumen rumah tangga. Pesan sesuai kebutuhan Anda, tanpa minimal pembelian, langsung diantar ke rumah.",
    tags: ["Rumah Tangga", "Pembelian Langsung", "Tanpa Minimal Order"],
  },
];

export default function Audience() {
  return (
    <section id="pelanggan" className="section bg-white">
      <Container>
        <Reveal>
          <p className="section-label">Siapa yang Kami Layani</p>
          <h2 className="section-title max-w-2xl">
            Untuk Bisnis &amp; Konsumen Langsung
          </h2>
          <p className="mt-4 max-w-xl text-ink-mid">
            Mitra Telur Jogja melayani semua segmen — dari bisnis skala besar
            hingga konsumen perorangan.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SEGMENTS.map((segment, i) => (
            <Reveal
              as="article"
              key={segment.kicker}
              delay={i * 120}
              className="card card-hover overflow-hidden"
            >
              <div className="relative aspect-[16/8]">
                <Image
                  src={segment.image}
                  alt={segment.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                  {segment.kicker}
                </p>
                <h3 className="mt-2 font-display text-xl font-extrabold text-ink">
                  {segment.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-mid">
                  {segment.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {segment.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-pill border border-ink/10 bg-cream-2 px-3 py-1.5 text-xs font-semibold text-ink-mid"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
