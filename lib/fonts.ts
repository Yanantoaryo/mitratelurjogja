import { IBM_Plex_Sans } from "next/font/google";

/**
 * Desain theFront (design.md): IBM Plex Sans untuk judul dan teks.
 */
export const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});
