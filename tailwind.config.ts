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
        // Design tokens diekstrak dari legacy/index.html (:root)
        brand: {
          red: "#E8192C",
          /** Bidang, border, dan latar. Jangan dipakai sebagai warna teks. */
          orange: "#F47920",
          yellow: "#FFC107",
          /**
           * Varian gelap untuk teks, tautan, dan cincin fokus. #F47920 hanya
           * mencapai 2.76:1 di atas putih; WCAG AA menuntut 4.5:1 untuk teks
           * dan 3:1 untuk indikator fokus. Nilai ini lolos 4.5:1 di atas
           * putih, cream, cream-2, dan tint bg-brand-orange/10.
           */
          rust: "#AF5617",
          /** Bintang rating. #FFC107 hanya 1.63:1, di bawah ambang 3:1 grafis. */
          gold: "#B8860B",
        },
        cream: {
          DEFAULT: "#FFFDF5",
          2: "#FFF4DF",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          mid: "#555555",
          /**
           * Digelapkan dari #888888 (3.48:1). Nilai ini lolos 4.5:1 di atas
           * putih, cream, maupun cream-2 — yang terakhir adalah latar tersulit.
           */
          muted: "#707070",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        brand: "12px",
        /** Permukaan besar (kartu). Lebih membulat = lebih ramah, arah theFront. */
        "brand-lg": "16px",
      },
      boxShadow: {
        brand: "0 4px 20px rgba(244,121,32,0.12)",
        "brand-hover": "0 8px 32px rgba(244,121,32,0.22)",
        /**
         * Bayangan kartu berlapis dan bernuansa hangat (chromatic), bukan hitam
         * pekat — pilihan brand yang selaras dengan theFront. Halus saat diam,
         * agar tampilan tetap bersih dan mengandalkan ruang kosong.
         */
        card: "0 1px 2px rgba(26,26,26,0.04), 0 12px 28px -10px rgba(244,121,32,0.12)",
        "card-hover":
          "0 2px 4px rgba(26,26,26,0.05), 0 20px 40px -12px rgba(244,121,32,0.20)",
      },
      maxWidth: {
        container: "1160px",
      },
    },
  },
  plugins: [],
};

export default config;
