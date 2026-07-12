"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";
import Container from "./Container";
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
  { href: "/blog", label: "Blog" },
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
        className="focus-ring flex items-center gap-1 rounded-brand py-2 text-sm font-medium text-ink-mid transition hover:text-brand-orange"
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
          className="absolute left-0 top-full z-50 min-w-44 overflow-hidden rounded-brand border border-ink/5 bg-white py-2 shadow-card"
        >
          {item.children!.map((c) => (
            <li key={c.href} role="none">
              <Link
                role="menuitem"
                href={c.href}
                className="block px-4 py-2 text-sm font-medium text-ink-mid transition hover:bg-cream-2 hover:text-brand-orange"
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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-mtj.png"
            alt=""
            width={102}
            height={72}
            priority
            sizes="51px"
            className="h-9 w-auto"
          />
          <span className="font-display text-lg font-bold text-ink">
            Mitra Telur Jogja
          </span>
        </Link>

        <nav aria-label="Menu utama" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((l) =>
              l.children ? (
                <DesktopDropdown key={l.href} item={l} />
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-ink-mid transition hover:text-brand-orange"
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
          className="btn btn-primary hidden md:inline-flex"
        >
          <MessageCircle size={16} /> Pesan Sekarang
        </a>

        <button
          type="button"
          className="focus-ring rounded-brand p-1 md:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </Container>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu utama"
          className="flex flex-col gap-1 border-t border-ink/5 bg-white px-6 py-4 md:hidden"
        >
          {NAV_LINKS.map((l) => (
            <div key={l.href}>
              <Link
                href={l.href}
                className="block py-2 text-sm font-medium text-ink-mid"
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
            className="btn btn-primary mt-3 justify-center"
            onClick={() => setOpen(false)}
          >
            <MessageCircle size={16} /> Pesan Sekarang
          </a>
        </nav>
      )}
    </header>
  );
}
