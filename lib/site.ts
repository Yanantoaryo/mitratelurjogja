export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mitratelurjogja.com";

export const BUSINESS_NAME = "Mitra Telur Jogja";

export const PHONES = ["6285702275769", "6285848148108"] as const;

/** Nomor utama untuk semua CTA. */
export const WA_URL = `https://wa.me/${PHONES[0]}`;

export function waLink(message?: string) {
  if (!message) return WA_URL;
  return `${WA_URL}?text=${encodeURIComponent(message)}`;
}

export const ADDRESS = "Potorono, Banguntapan, Bantul, Yogyakarta";
