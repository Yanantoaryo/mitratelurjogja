import { MapPin, MessageCircle } from "lucide-react";
import Container from "@/components/Container";
import { ADDRESS, PHONES } from "@/lib/site";

const WA_BUTTONS = [
  { label: "WA 1 — +62 857-0227-5769", phone: PHONES[0] },
  { label: "WA 2 — +62 858-4814-8108", phone: PHONES[1] },
];

export default function FinalCta() {
  return (
    <section id="pesan" className="section bg-white">
      <Container>
        <div className="rounded-card bg-brand-yellow px-6 py-14 text-center md:px-12 md:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-black leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.5rem]">
            Siap Pesan Telur Segar Hari Ini?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/80">
            Hubungi kami sekarang dan dapatkan telur berkualitas dengan harga
            terbaik. Gratis ongkir · Garansi kerusakan · Stok selalu tersedia.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {WA_BUTTONS.map(({ label, phone }) => (
              <a
                key={phone}
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
              >
                <MessageCircle size={16} /> {label}
              </a>
            ))}
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink/70">
            <MapPin size={16} aria-hidden /> {ADDRESS}
          </p>
        </div>
      </Container>
    </section>
  );
}
