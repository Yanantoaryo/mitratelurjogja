import { Suspense } from "react";
import Script from "next/script";
import PageViewTracker from "./PageViewTracker";

/**
 * Tidak dirender di luar production, supaya sesi pengembangan tidak mencemari
 * laporan GA4. Di Vercel, batasi NEXT_PUBLIC_GA_ID hanya ke environment
 * Production agar deploy preview juga tidak ikut mengirim event.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/*
        Skrip init berjalan lebih dulu dan hanya mendefinisikan gtag serta
        mengantre perintah ke dataLayer. Ia tidak menunggu gtag.js: perintah
        yang antre diproses begitu pemuat selesai diunduh.

        page_view pertama dikirim di sini, bukan dari PageViewTracker. Efek
        React bisa berjalan sebelum skrip ini dieksekusi, dan karena
        send_page_view dimatikan, kunjungan halaman pertama akan hilang tanpa
        jejak. Di sini urutannya dijamin.
      */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
          gtag('event', 'page_view', {
            page_path: location.pathname + location.search,
            page_location: location.href,
            page_title: document.title
          });
        `}
      </Script>

      {/*
        161 KiB dan jalur koneksi ke analytics.google.com. lazyOnload menunda
        unduhannya sampai halaman selesai memuat, sehingga tidak menahan LCP
        maupun menambah blocking time. Perintah yang sudah antre di dataLayer
        tetap terkirim setelahnya.
      */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />

      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
