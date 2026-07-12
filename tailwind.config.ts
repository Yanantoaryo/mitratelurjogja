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
          Palet AgriHub (Design/DESIGN-bestwpware-com.md) dengan hijau diganti
          oranye simpel, sesuai permintaan. Nama token dipertahankan agar
          komponen tidak perlu diubah. Semua kombinasi terverifikasi WCAG AA:
          #B95510 lolos 4.81:1 di atas putih (teks, link, tombol teks-putih).
        */
        brand: {
          red: "#E8192C",
          /** Aksen utama: teks, link, tombol, ikon, border aktif. */
          orange: "#B95510",
          /** Oranye terang untuk bidang dekoratif besar (bukan teks kecil). */
          "orange-bright": "#F97316",
          yellow: "#B95510",
          /** Sama dengan aksen; nama lama dipertahankan untuk kompatibilitas. */
          rust: "#B95510",
          gold: "#B95510",
        },
        cream: {
          /** Kanvas utama AgriHub: putih. */
          DEFAULT: "#FFFFFF",
          /** Section berselang: krem oranye sangat muda. */
          2: "#FFF7ED",
        },
        ink: {
          /** Teks utama, hangat (bukan hitam pekat), 17.49:1 di atas putih. */
          DEFAULT: "#1C1917",
          /** Sekunder, 4.80:1 di atas putih. */
          mid: "#78716C",
          muted: "#78716C",
        },
        /** Permukaan gelap hangat: footer dan section CTA. */
        surface: {
          dark: "#1C1917",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        /* AgriHub: sudut besar & pill. */
        brand: "16px",
        "brand-lg": "24px",
        pill: "100px",
      },
      boxShadow: {
        /* Bayangan bernuansa oranye hangat (chromatic), khas AgriHub. */
        brand: "0 10px 30px rgba(185,85,16,0.10)",
        "brand-hover": "0 16px 40px rgba(185,85,16,0.18)",
        card: "0 2px 4px rgba(28,25,23,0.04), 0 18px 40px -12px rgba(185,85,16,0.12)",
        "card-hover":
          "0 4px 8px rgba(28,25,23,0.06), 0 28px 56px -14px rgba(185,85,16,0.22)",
      },
      maxWidth: {
        container: "1160px",
      },
    },
  },
  plugins: [],
};

export default config;
