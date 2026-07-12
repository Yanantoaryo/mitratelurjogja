import { Noto_Serif, Montserrat } from "next/font/google";

/**
 * Desain AgriHub (Design/DESIGN-bestwpware-com.md): Noto Serif untuk judul
 * (besar & tebal, tipografi sebagai elemen utama), Montserrat untuk teks.
 */
export const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
