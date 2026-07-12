import { Truck, ShieldCheck, Building2, CalendarClock } from "lucide-react";
import Container from "@/components/Container";

const SERVICES = [
  {
    Icon: Truck,
    title: "Gratis Ongkir Se-DIY",
    description:
      "Pengiriman gratis ke seluruh Daerah Istimewa Yogyakarta dan sekitarnya, langsung ke lokasi Anda tanpa biaya tersembunyi.",
  },
  {
    Icon: ShieldCheck,
    title: "Garansi Telur Pecah",
    description:
      "Telur yang pecah atau retak saat diterima kami ganti. Anda tidak perlu menanggung kerugian karena kerusakan pengiriman.",
  },
  {
    Icon: Building2,
    title: "Layanan B2B & Grosir",
    description:
      "Penawaran khusus untuk restoran, hotel, cafe, katering, dan toko grosir dengan pasokan rutin dan harga kerja sama.",
  },
  {
    Icon: CalendarClock,
    title: "Harga Update Harian",
    description:
      "Harga diperbarui setiap hari mengikuti pasar, jadi Anda selalu mendapat penawaran paling adil dan kompetitif.",
  },
];

export default function Services() {
  return (
    <section id="layanan" className="section bg-cream-2">
      <Container>
        <div className="max-w-2xl">
          <span className="section-label">Layanan Kami</span>
          <h2 className="section-title">
            Lebih dari Sekadar Menjual Telur
          </h2>
          <p className="mt-4 text-lg text-ink-mid">
            Kami menyediakan layanan yang membuat pengadaan telur Anda mudah,
            aman, dan bisa diandalkan setiap hari.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ Icon, title, description }) => (
            <article key={title} className="card card-hover p-7">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-pill bg-brand-orange/10 text-brand-orange">
                <Icon size={26} aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-mid">
                {description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
