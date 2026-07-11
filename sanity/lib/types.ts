import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Availability = "InStock" | "OutOfStock" | "PreOrder";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: SanityImageSource;
  /** Kosong bila owner belum publikasi harga — halaman menampilkan CTA "Tanya Harga". */
  price?: number;
  unit?: string;
  availability?: Availability;
}

export interface Advantage {
  _id: string;
  title: string;
  description?: string;
  /** Nama ikon lucide dalam kebab-case, mis. "truck". */
  icon?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  quote: string;
  photo?: SanityImageSource;
  rating?: number;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export interface ArticleCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface ArticleSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  coverAlt?: string;
  author?: string;
  publishedAt: string;
  category?: { title: string; slug: string };
}

export interface Article extends ArticleSummary {
  /** Blok Portable Text; bentuknya ditentukan schema `body`. */
  body?: PortableTextBlock[];
  tags?: string[];
  source?: "manual" | "claude-ai";
}

/**
 * Bentuk minimum yang dituntut @portabletext/react (`TypedObject`): `_type`
 * wajib, sisanya bebas karena `body` boleh berisi block maupun image.
 */
export interface PortableTextBlock {
  _type: string;
  _key?: string;
  [key: string]: unknown;
}

export interface GalleryImage {
  _id: string;
  title: string;
  alt?: string;
  category?: string;
  takenAt?: string;
  url: string;
  lqip?: string;
  width: number;
  height: number;
}

export interface OpeningHours {
  days?: string[];
  opens?: string;
  closes?: string;
}

export interface SiteSettings {
  businessName?: string;
  tagline?: string;
  description?: string;
  address?: string;
  geo?: { lat?: number; lng?: number };
  phones?: string[];
  openingHours?: OpeningHours[];
  socials?: { instagram?: string; facebook?: string; tiktok?: string };
  stats?: { value?: string; label?: string }[];
}
