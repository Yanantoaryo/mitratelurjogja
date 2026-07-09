"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import Container from "./Container";

const NAV_LINKS = [
  { href: "/#keunggulan", label: "Keunggulan" },
  { href: "/#produk", label: "Produk" },
  { href: "/blog", label: "Blog" },
  { href: "/galeri", label: "Galeri" },
  { href: "/#faq", label: "FAQ" },
];

const WA_URL = "https://wa.me/6285702275769";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-extrabold text-ink">
          Mitra Telur Jogja
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-mid transition hover:text-brand-orange"
            >
              {l.label}
            </Link>
          ))}
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
          className="md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/5 bg-cream px-6 py-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-2 text-sm font-medium text-ink-mid"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-2 justify-center"
            onClick={() => setOpen(false)}
          >
            <MessageCircle size={16} /> Pesan Sekarang
          </a>
        </nav>
      )}
    </header>
  );
}
