import { MapPin, MessageCircle } from "lucide-react";
import Container from "@/components/Container";
import { ADDRESS, PHONES } from "@/lib/site";

const WA_BUTTONS = [
  { label: "WA 1 — +62 857-0227-5769", phone: PHONES[0] },
  { label: "WA 2 — +62 858-4814-8108", phone: PHONES[1] },
];

export default function FinalCta() {
  return (
    <section id="pesan" className="bg-cream-2 py-16 md:py-20">
      <Container className="text-center">
        <h2 className="section-title">Siap Pesan Telur Segar Hari Ini?</h2>
        <p className="mt-3 text-ink-mid">
          Hubungi kami sekarang dan dapatkan telur berkualitas dengan harga
          terbaik.
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Gratis ongkir · Garansi kerusakan · Stok selalu tersedia
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {WA_BUTTONS.map(({ label, phone }) => (
            <a
              key={phone}
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={16} /> {label}
            </a>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-mid">
          <MapPin size={16} aria-hidden /> {ADDRESS}
        </p>
      </Container>
    </section>
  );
}
