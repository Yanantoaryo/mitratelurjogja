"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetOrName: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * App Router menavigasi di sisi client, jadi skrip gtag hanya berjalan sekali.
 * Tanpa ini, hanya halaman pertama yang tercatat sepanjang sesi.
 *
 * Komponen ini wajib berada di dalam <Suspense>: useSearchParams() memaksa
 * seluruh pohon di atasnya dirender on demand, dan tanpa boundary itu setiap
 * halaman statis kita kehilangan prerender-nya.
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // page_view pertama sudah dikirim skrip init, yang urutannya terhadap gtag
  // dijamin. Mengirimnya lagi di sini akan menghitung ganda halaman pertama.
  const skipFirst = useRef(true);

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }
    if (!window.gtag) return;

    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
