"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import Container from "./Container";
import { WA_URL } from "@/lib/site";

const NAV_LINKS = [
  { href: "/#keunggulan", label: "Keunggulan" },
  { href: "/produk", label: "Produk" },
  { href: "/blog", label: "Blog" },
  { href: "/galeri", label: "Galeri" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {/*
            Dirender setinggi 36px (h-9), lebar ~51px. Intrinsic 842x596 membuat
            browser memilih varian srcset yang jauh lebih besar dari kebutuhan.
            Ukuran di bawah adalah 2x ukuran tampil, cukup untuk layar retina.
          */}
          <Image
            src="/logo-mtj.png"
            alt=""
            width={102}
            height={72}
            priority
            sizes="51px"
            className="h-9 w-auto"
          />
          <span className="font-display text-lg font-extrabold text-ink">
            Mitra Telur Jogja
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-mid transition hover:text-brand-rust"
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
          className="flex flex-col gap-1 border-t border-ink/5 bg-cream px-6 py-4 md:hidden"
        >
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
