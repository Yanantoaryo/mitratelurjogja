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
          orange: "#F47920",
          yellow: "#FFC107",
        },
        cream: {
          DEFAULT: "#FFFDF5",
          2: "#FFF4DF",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          mid: "#555555",
          muted: "#888888",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        brand: "12px",
      },
      boxShadow: {
        brand: "0 4px 20px rgba(244,121,32,0.12)",
        "brand-hover": "0 8px 32px rgba(244,121,32,0.22)",
      },
      maxWidth: {
        container: "1160px",
      },
    },
  },
  plugins: [],
};

export default config;
