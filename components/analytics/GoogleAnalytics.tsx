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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: false });
        `}
      </Script>

      {/*
        send_page_view: false di atas mematikan page_view otomatis, karena
        PageViewTracker sudah mengirimkannya pada mount dan pada setiap
        perpindahan rute. Membiarkan keduanya menyala menghasilkan page_view
        ganda untuk halaman pertama yang dibuka.
      */}
      <Suspense fallback={null}>
        <PageViewTracker gaId={gaId} />
      </Suspense>
    </>
  );
}
