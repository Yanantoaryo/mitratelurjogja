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
          Palet theFront (design.md). Nama token dipertahankan (brand-orange dst.)
          agar komponen tidak perlu diubah, tapi nilainya diremap ke biru theFront.
          Semua kombinasi terverifikasi lolos WCAG AA. #0073e6 di atas putih =
          4.57:1 (teks & tombol teks-putih). Teks/link memakai #006dd9 (5.01 di
          atas putih, 4.53 di atas permukaan biru-muda).
        */
        brand: {
          red: "#E8192C",
          /** Aksen theFront: bidang, border, tombol. */
          orange: "#0073e6",
          yellow: "#0073e6",
          /** Teks/link/cincin fokus — biru sedikit lebih gelap agar lolos di
              atas putih maupun permukaan biru-muda. */
          rust: "#006dd9",
          /** Bintang rating. */
          gold: "#0073e6",
        },
        cream: {
          /** Kanvas utama theFront: putih. */
          DEFAULT: "#FFFFFF",
          /** Section berselang: biru sangat muda untuk ritme. */
          2: "#EEF4FB",
        },
        ink: {
          /** Teks utama theFront. */
          DEFAULT: "#1A1E23",
          /** Sekunder, 5.74:1 di atas putih. */
          mid: "#666666",
          /** 4.5:1+ di atas putih dan permukaan biru-muda. */
          muted: "#5F6B76",
        },
      },
      fontFamily: {
        display: ["var(--font-ibm-plex)", "system-ui", "sans-serif"],
        sans: ["var(--font-ibm-plex)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        brand: "12px",
        /** Permukaan besar (kartu). Lebih membulat = lebih ramah, arah theFront. */
        "brand-lg": "16px",
      },
      boxShadow: {
        /* Bayangan bernuansa biru aksen theFront. */
        brand: "0 4px 20px rgba(0,115,230,0.12)",
        "brand-hover": "0 8px 32px rgba(0,115,230,0.22)",
        card: "0 1px 2px rgba(26,30,35,0.04), 0 12px 28px -10px rgba(0,115,230,0.12)",
        "card-hover":
          "0 2px 4px rgba(26,30,35,0.05), 0 20px 40px -12px rgba(0,115,230,0.20)",
      },
      maxWidth: {
        container: "1160px",
      },
    },
  },
  plugins: [],
};

export default config;
