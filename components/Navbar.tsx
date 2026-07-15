"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import { WA_URL } from "@/lib/site";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const NAV_LINKS: NavItem[] = [
  { href: "/", label: "Beranda" },
  {
    href: "/produk",
    label: "Produk",
    children: [
      { href: "/produk", label: "Semua Produk" },
      { href: "/produk/telur-ayam-komersial", label: "Telur Ayam Komersial" },
      { href: "/produk/telur-omega", label: "Telur Omega" },
    ],
  },
  { href: "/#layanan", label: "Layanan" },
  { href: "/blog", label: "Artikel" },
  {
    href: "/tentang",
    label: "Tentang",
    children: [
      { href: "/tentang", label: "Tentang Kami" },
      { href: "/galeri", label: "Galeri" },
    ],
  },
  { href: "/kontak", label: "Kontak" },
];

/** Item navigasi desktop dengan submenu; buka saat hover atau fokus keyboard. */
function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex items-center gap-1 rounded-brand py-2 text-sm font-semibold text-ink-mid transition hover:text-ink"
      >
        {item.label}
        <ChevronDown
          size={15}
          aria-hidden
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute left-0 top-full z-50 min-w-44 overflow-hidden rounded-brand-lg border border-ink/10 bg-white py-2 shadow-card-hover"
        >
          {item.children!.map((c) => (
            <li key={c.href} role="none">
              <Link
                role="menuitem"
                href={c.href}
                className="block px-4 py-2 text-sm font-medium text-ink-mid transition hover:bg-cream-2 hover:text-ink"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Navigasi mengambang (floating pill): bar putih membulat penuh yang
 * terlepas dari tepi atas, melayang di atas konten — logo kiri, tautan
 * tengah, CTA kuning kanan. Ruang di bawahnya disediakan oleh padding-top
 * pada <main> di layout (site).
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 rounded-pill border border-ink/10 bg-white/95 pl-4 pr-2 shadow-card-hover backdrop-blur md:pl-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-mtj.png"
            alt=""
            width={102}
            height={72}
            priority
            sizes="41px"
            className="h-8 w-auto"
          />
          <span className="font-display text-base font-extrabold tracking-tight text-ink">
            Mitra Telur Jogja
          </span>
        </Link>

        <nav aria-label="Menu utama" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((l) =>
              l.children ? (
                <DesktopDropdown key={l.href} item={l} />
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-semibold text-ink-mid transition hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary hidden h-10 rounded-pill px-5 py-0 md:inline-flex"
        >
          <MessageCircle size={15} /> Pesan Sekarang
        </a>

        <button
          type="button"
          className="focus-ring mr-1 rounded-pill p-2 md:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu utama"
          className="mx-auto mt-2 flex w-full max-w-5xl flex-col gap-1 rounded-brand-lg border border-ink/10 bg-white px-5 py-4 shadow-card-hover md:hidden"
        >
          {NAV_LINKS.map((l) => (
            <div key={l.href}>
              <Link
                href={l.href}
                className="block py-2 text-sm font-semibold text-ink-mid"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
              {l.children && (
                <div className="ml-4 flex flex-col border-l border-ink/10 pl-3">
                  {l.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="py-1.5 text-sm text-ink-mid"
                      onClick={() => setOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-3 justify-center rounded-pill"
            onClick={() => setOpen(false)}
          >
            <MessageCircle size={16} /> Pesan Sekarang
          </a>
        </nav>
      )}
    </header>
  );
}
