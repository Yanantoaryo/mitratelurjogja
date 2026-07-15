import type { Metadata } from "next";
import "./globals.css";
import { inter, interDisplay } from "@/lib/fonts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mitratelurjogja.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Mitra Telur Jogja — Supplier Telur Segar Terpercaya di Yogyakarta",
    template: "%s | Mitra Telur Jogja",
  },
  description:
    "Supplier telur ayam komersial & telur omega berkualitas tinggi untuk seluruh wilayah DIY. Gratis ongkir, fresh dari farm.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Mitra Telur Jogja",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${interDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
