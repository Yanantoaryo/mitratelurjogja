"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/sanity/lib/types";

const FOCUSABLE = "button, a[href], [tabindex]:not([tabindex='-1'])";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (delta: number) =>
      setOpenIndex((i) =>
        i === null ? i : (i + delta + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") {
        go(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        go(-1);
        return;
      }
      if (e.key !== "Tab") return;

      // aria-modal hanya memberi tahu screen reader; ia tidak menahan Tab.
      // Tanpa jebakan ini, fokus keyboard menyelinap ke halaman di balik
      // overlay, tempat pengguna tidak bisa melihat apa yang sedang terfokus.
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes?.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    // Cegah halaman di belakang ikut ter-scroll saat lightbox terbuka.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // Kembalikan fokus ke thumbnail yang membuka lightbox.
      triggerRef.current?.focus();
    };
    // Sengaja bergantung pada `isOpen`, bukan `openIndex`: memakai openIndex
    // membuat efek ini dijalankan ulang setiap kali panah ditekan, sehingga
    // fokus dilempar kembali ke tombol tutup di tiap perpindahan foto.
  }, [isOpen, close, go]);

  const current = openIndex === null ? null : images[openIndex];

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={img._id}>
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpenIndex(i);
              }}
              className="group relative block w-full overflow-hidden rounded-brand border border-ink/10 bg-cream-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-rust"
              aria-label={`Perbesar foto: ${img.title}`}
            >
              <span className="relative block aspect-[4/3]">
                <Image
                  src={img.url}
                  alt={img.alt ?? img.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  placeholder={img.lqip ? "blur" : "empty"}
                  blurDataURL={img.lqip}
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </span>
              <span className="block px-4 py-3 text-left text-sm font-medium text-ink">
                {img.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Tutup"
            className="absolute right-4 top-4 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Foto sebelumnya"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Foto berikutnya"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <figure
            className="max-h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.url}
              alt={current.alt ?? current.title}
              width={current.width}
              height={current.height}
              sizes="(min-width: 1024px) 60vw, 100vw"
              placeholder={current.lqip ? "blur" : "empty"}
              blurDataURL={current.lqip}
              className="mx-auto max-h-[75vh] w-auto rounded-brand object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/80">
              {current.title}
              <span className="ml-2 text-white/50">
                {openIndex! + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
