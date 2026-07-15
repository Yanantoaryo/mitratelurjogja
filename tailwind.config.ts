import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /*
          Palet BroilerX (DESIGN-broilerx-com.md). Kanvas putih, satu aksen
          kuning #F5BE01 untuk CTA/highlight (selalu dengan teks gelap di
          atasnya — kuning di atas putih tidak pernah dipakai untuk teks
          kecil), teks slate gelap, permukaan gelap #12141D untuk footer dan
          section aksen. Nama token lama dipertahankan agar halaman lain
          tetap bekerja.
        */
        brand: {
          /** Aksen utama: latar CTA, highlight, bintang rating. */
          yellow: "#F5BE01",
          /** Aksen sekunder: hover CTA kuning. */
          "yellow-2": "#F7CB33",
          red: "#DC2626",
          /* Alias kompatibilitas (halaman lain masih memakai nama lama). */
          orange: "#F5BE01",
          "orange-bright": "#F7CB33",
          /** Aksen teks/ikon: gelap, bukan kuning — kuning gagal kontras. */
          rust: "#101828",
          gold: "#F5BE01",
        },
        cream: {
          /** Kanvas utama: putih. */
          DEFAULT: "#FFFFFF",
          /** Section berselang: slate sangat muda (dari --secondary situs). */
          2: "#F8FAFC",
        },
        ink: {
          /** Judul & teks utama (#101828 dari palet), 17.4:1 di atas putih. */
          DEFAULT: "#101828",
          /** Teks sekunder (#475467), 7.3:1 di atas putih. */
          mid: "#475467",
          /** Caption / placeholder (#667085), 4.7:1 di atas putih. */
          muted: "#667085",
        },
        /** Permukaan gelap: footer & section aksen (palet #12141D). */
        surface: {
          dark: "#12141D",
          darker: "#0F172A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        /* BroilerX: tombol 6–8px, kartu 24px. */
        brand: "8px",
        "brand-lg": "16px",
        card: "24px",
        pill: "9999px",
      },
      boxShadow: {
        /* Bayangan netral halus, bukan berwarna. */
        brand: "0 1px 2px rgba(16,24,40,0.05)",
        "brand-hover": "0 4px 12px rgba(16,24,40,0.10)",
        card: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
        "card-hover":
          "0 4px 6px -2px rgba(16,24,40,0.05), 0 12px 24px -4px rgba(16,24,40,0.10)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
