import { Truck, ShieldCheck, Building2, CalendarClock } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

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
    <section id="layanan" className="section bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <p className="section-label">Layanan Kami</p>
            <h2 className="section-title">Lebih dari Sekadar Menjual Telur</h2>
            <p className="mt-4 text-ink-mid">
              Kami menyediakan layanan yang membuat pengadaan telur Anda
              mudah, aman, dan bisa diandalkan setiap hari.
            </p>
          </Reveal>

          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {SERVICES.map(({ Icon, title, description }, i) => (
              <Reveal
                as="article"
                key={title}
                delay={(i % 2) * 100}
                className="border-t-2 border-ink/10 pt-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-brand bg-brand-yellow/15 text-ink">
                  <Icon size={21} aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-mid">
                  {description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
