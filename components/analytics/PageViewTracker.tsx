"use client";

import { useEffect } from "react";
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
export default function PageViewTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;

    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams, gaId]);

  return null;
}
