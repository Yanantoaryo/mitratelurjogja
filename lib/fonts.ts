import { Inter } from "next/font/google";

/**
 * Desain BroilerX (DESIGN-broilerx-com.md): satu keluarga Inter untuk seluruh
 * halaman — heading weight 900 (voice tipografis brand), body 400–500.
 * Kedua variabel lama diarahkan ke Inter agar komponen tidak perlu diubah.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const interDisplay = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});
