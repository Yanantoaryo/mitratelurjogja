import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";
import Container from "./Container";

const SOCIALS = [
  { href: "https://instagram.com/mitratelurjogja", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com/mitratelurjogja", label: "Facebook", Icon: Facebook },
  { href: "https://tiktok.com/@mitratelurjogja", label: "TikTok", Icon: null },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-cream-2">
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold text-ink">
            Mitra Telur Jogja
          </p>
          <p className="mt-2 max-w-xs text-sm text-ink-mid">
            Supplier telur ayam komersial &amp; telur omega terpercaya di
            Yogyakarta.
          </p>
        </div>

        <div className="space-y-2 text-sm text-ink-mid">
          <p className="flex items-center gap-2">
            <MapPin size={16} /> Potorono, Bantul, Yogyakarta
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} /> +62 857-0227-5769
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} /> +62 858-4814-8108
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-ink">Ikuti Kami</p>
          <div className="flex gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-mid transition hover:border-brand-orange hover:text-brand-rust"
              >
                {Icon ? <Icon size={18} /> : <span className="text-xs font-bold">TT</span>}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-ink/10 py-4 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} Mitra Telur Jogja ·{" "}
        <Link href="/tentang" className="hover:text-brand-rust">
          Tentang
        </Link>{" "}
        ·{" "}
        <Link href="/kontak" className="hover:text-brand-rust">
          Kontak
        </Link>
      </div>
    </footer>
  );
}
