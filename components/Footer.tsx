import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";
import Container from "./Container";

/**
 * lucide-react tidak menyediakan ikon TikTok. Sebelumnya link ini menampilkan
 * teks "TT" sementara accessible name-nya "TikTok"; keduanya yang berbeda
 * membingungkan pengguna perintah suara, yang mengucapkan apa yang terlihat.
 * Path resmi dari paket simple-icons.
 */
function TiktokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const SOCIALS = [
  { href: "https://instagram.com/mitratelurjogja", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com/mitratelurjogja", label: "Facebook", Icon: Facebook },
  { href: "https://tiktok.com/@mitratelurjogja", label: "TikTok", Icon: TiktokIcon },
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
                <Icon size={18} aria-hidden />
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
