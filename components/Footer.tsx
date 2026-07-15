import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";
import Container from "./Container";

/**
 * lucide-react tidak menyediakan ikon TikTok. Sebelumnya link ini menampilkan
 * teks "TT" sementara accessible name-nya "TikTok"; keduanya yang berbeda
 * membingungkan pengguna perintah suara, yang mengucapkan apa yang terlihat.
 * Path resmi dari paket simple-icons.
 */
function TiktokIcon({ size = 20 }: { size?: number }) {
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
  { href: "https://facebook.com/mitratelurjogja", label: "Facebook", Icon: Facebook },
  { href: "https://instagram.com/mitratelurjogja", label: "Instagram", Icon: Instagram },
  { href: "https://tiktok.com/@mitratelurjogja", label: "TikTok", Icon: TiktokIcon },
];

/* Kelompok tautan ala footer BroilerX: heading uppercase, daftar link putih. */
const LINK_GROUPS = [
  {
    heading: "Produk",
    links: [
      { href: "/produk", label: "Semua Produk" },
      { href: "/produk/telur-ayam-komersial", label: "Telur Ayam Komersial" },
      { href: "/produk/telur-omega", label: "Telur Omega" },
    ],
  },
  {
    heading: "Perusahaan",
    links: [
      { href: "/tentang", label: "Tentang Kami" },
      { href: "/galeri", label: "Galeri" },
      { href: "/kontak", label: "Kontak" },
    ],
  },
  {
    heading: "Informasi",
    links: [
      { href: "/blog", label: "Artikel" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#cara-order", label: "Cara Pemesanan" },
    ],
  },
];

const PHONES_DISPLAY = ["+62 857-0227-5769", "+62 858-4814-8108"];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo-mtj.png"
                alt=""
                width={102}
                height={72}
                sizes="45px"
                className="h-9 w-auto"
              />
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                Mitra Telur Jogja
              </span>
            </Link>

            <p className="mt-6 text-sm font-bold text-white">Kantor Kami</p>
            <address className="mt-3 space-y-2.5 text-sm not-italic leading-relaxed text-white/60">
              <p className="flex gap-2">
                <MapPin size={16} aria-hidden className="mt-0.5 shrink-0" />
                Ngelo, Potorono, Kec. Banguntapan, Kabupaten Bantul, Daerah
                Istimewa Yogyakarta 55196
              </p>
              {PHONES_DISPLAY.map((phone) => (
                <p key={phone} className="flex gap-2">
                  <Phone size={16} aria-hidden className="mt-0.5 shrink-0" />
                  {phone}
                </p>
              ))}
            </address>

            <div className="mt-7 flex gap-5">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/80 transition hover:text-brand-yellow"
                >
                  <Icon size={20} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-white/50">
                {group.heading}
              </p>
              <ul className="mt-5 space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-white/85 transition hover:text-brand-yellow"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-white/10 pt-5 text-center text-sm text-white/50">
          <p>
            © Copyright {new Date().getFullYear()}, All Rights Reserved by
            Mitra Telur Jogja
          </p>
          <div className="flex gap-6">
            <Link
              href="/tentang"
              className="underline underline-offset-4 transition hover:text-white"
            >
              Tentang
            </Link>
            <Link
              href="/kontak"
              className="underline underline-offset-4 transition hover:text-white"
            >
              Kontak
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
