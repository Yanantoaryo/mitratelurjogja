import { groq } from "next-sanity";

// `order` opsional di semua schema, dan di GROQ null menyortir sebelum angka.
// coalesce() mendorong dokumen tanpa urutan ke belakang, bukan ke depan.
const BY_ORDER = `coalesce(order, 9999) asc, _createdAt asc`;

export const productsQuery = groq`
  *[_type == "product"] | order(${BY_ORDER}) {
    _id, name, "slug": slug.current, description, image, price, unit, availability
  }
`;

export const productSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)][].slug.current
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, description, image, price, unit, availability
  }
`;

export const advantagesQuery = groq`
  *[_type == "advantage"] | order(${BY_ORDER}) {
    _id, title, description, icon
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(${BY_ORDER}) {
    _id, name, role, quote, photo, rating
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(${BY_ORDER}) {
    _id, question, answer
  }
`;

export const galleryImagesQuery = groq`
  *[_type == "galleryImage" && defined(image.asset)] | order(${BY_ORDER}) {
    _id, title, category, takenAt,
    "alt": image.alt,
    "url": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    businessName, tagline, description, address, geo, phones,
    openingHours, socials, stats
  }
`;
