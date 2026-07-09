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

export default function Problem() {
  return (
    <section className="bg-cream-2 py-16 md:py-20">
      <Container>
        <h2 className="section-title max-w-2xl">
          Kesulitan Mencari Supplier Telur yang Bisa Diandalkan?
        </h2>
        <p className="mt-3 max-w-xl text-ink-mid">
          Banyak bisnis makanan dan konsumen mengalami masalah yang sama saat
          membeli telur.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {PAINS.map((pain) => (
            <li
              key={pain.title}
              className="rounded-brand border border-ink/10 bg-white px-5 py-5"
            >
              <p className="flex items-center gap-2 font-bold text-ink">
                <span aria-hidden className="text-brand-red">
                  ✕
                </span>
                {pain.title}
              </p>
              <p className="mt-2 text-sm text-ink-mid">{pain.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-brand bg-white px-6 py-6 shadow-brand">
          <p className="font-display text-xl font-extrabold text-brand-rust">
            Kami hadir sebagai solusi.
          </p>
          <p className="mt-2 text-ink-mid">
            Mitra Telur Jogja memastikan stok selalu ada, telur dijamin segar,
            dan pengiriman gratis ke seluruh DIY.
          </p>
        </div>
      </Container>
    </section>
  );
}
