import Container from "@/components/Container";

const SEGMENTS = [
  {
    emoji: "🏢",
    kicker: "B2B — Business to Business",
    title: "Untuk Bisnis & Usaha",
    description:
      "Kami menjadi mitra terpercaya untuk bisnis kuliner dan distribusi yang membutuhkan pasokan telur rutin, berkualitas, dan dalam jumlah besar. Tersedia penawaran harga khusus dan kerja sama jangka panjang.",
    tags: ["🍽️ Restoran", "🏨 Hotel", "☕ Cafe", "🥘 Catering", "🏪 Grosir"],
  },
  {
    emoji: "🏠",
    kicker: "B2C — Business to Consumer",
    title: "Untuk Konsumen Langsung",
    description:
      "Tidak hanya untuk bisnis — kami juga melayani pembelian langsung oleh konsumen rumah tangga. Pesan sesuai kebutuhan Anda, tanpa minimal pembelian, langsung diantar ke rumah.",
    tags: ["👨‍👩‍👧 Rumah Tangga", "🛒 Pembelian Langsung", "📦 Tanpa Minimal Order"],
  },
];

export default function Audience() {
  return (
    <section id="pelanggan" className="section">
      <Container>
        <p className="section-label">Siapa yang Kami Layani</p>
        <h2 className="section-title">Untuk Bisnis &amp; Konsumen Langsung</h2>
        <p className="mt-3 max-w-xl text-ink-mid">
          Mitra Telur Jogja melayani semua segmen — dari bisnis skala besar
          hingga konsumen perorangan.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SEGMENTS.map((segment) => (
            <article
              key={segment.kicker}
              className="card p-7"
            >
              <span aria-hidden className="text-3xl">
                {segment.emoji}
              </span>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-brand-rust">
                {segment.kicker}
              </p>
              <h3 className="mt-1 font-display text-xl font-extrabold text-ink">
                {segment.title}
              </h3>
              <p className="mt-3 text-sm text-ink-mid">{segment.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {segment.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-brand bg-cream-2 px-3 py-1.5 text-xs font-medium text-ink-mid"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
