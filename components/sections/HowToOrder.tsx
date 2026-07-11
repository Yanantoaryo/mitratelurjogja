import { MessageCircle } from "lucide-react";
import Container from "@/components/Container";
import { WA_URL } from "@/lib/site";

const STEPS = [
  {
    title: "Hubungi via WhatsApp",
    description:
      "Chat ke nomor WhatsApp kami. Tanyakan stok, jenis produk, dan harga terkini.",
  },
  {
    title: "Pilih Produk & Jumlah",
    description:
      "Pilih telur ayam komersial atau telur omega, tentukan jumlah sesuai kebutuhan Anda.",
  },
  {
    title: "Konfirmasi Pesanan & Alamat",
    description:
      "Konfirmasi detail pesanan dan berikan alamat pengiriman lengkap Anda kepada kami.",
  },
  {
    title: "Telur Diantarkan ke Lokasi Anda",
    description:
      "Kami antar langsung ke lokasi Anda. Gratis ongkir, telur sampai dalam kondisi segar dan terjamin.",
  },
];

export default function HowToOrder() {
  return (
    <section id="cara-order" className="section bg-cream-2">
      <Container>
        <p className="section-label">Cara Pemesanan</p>
        <h2 className="section-title">Pesan Mudah, Cepat, Langsung Dikirim</h2>
        <p className="mt-3 max-w-xl text-ink-mid">
          Hanya 4 langkah mudah untuk mendapatkan telur segar di lokasi Anda.
        </p>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="card p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange font-display text-lg font-extrabold text-ink">
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-mid">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle size={16} /> Mulai Pesan Sekarang
          </a>
        </div>
      </Container>
    </section>
  );
}
