"use client";

import { createElement, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Penundaan mulai animasi (ms) — untuk efek stagger antar item. */
  delay?: number;
  /** Elemen pembungkus; default div. Pakai "li"/"article" agar semantik list/kartu terjaga. */
  as?: string;
  className?: string;
  id?: string;
};

/**
 * Pembungkus scroll-reveal: konten muncul fade + naik halus saat masuk
 * viewport, sekali saja. Pengguna dengan prefers-reduced-motion langsung
 * melihat konten tanpa animasi (ditangani juga di CSS sebagai jaring
 * pengaman bila JS belum sempat jalan).
 */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      id,
      className: `reveal ${visible ? "is-visible" : ""} ${className}`.trim(),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children
  );
}
