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

/**
 * Sanity sudah menyembunyikan draft dari permintaan anonim, dan client kita
 * memang tanpa token. Filter ini jaring pengaman: begitu ada token
 * ditambahkan (mis. untuk preview), draft auto-artikel akan langsung
 * terbaca publik tanpa ini.
 */
const PUBLISHED = `!(_id in path("drafts.**")) && defined(publishedAt) && publishedAt <= now()`;

const ARTICLE_FIELDS = `
  _id, title, "slug": slug.current, excerpt, author, publishedAt,
  coverImage, "coverAlt": coverImage.alt,
  "category": category->{ title, "slug": slug.current }
`;

export const articleCategoriesQuery = groq`
  *[_type == "articleCategory"] | order(title asc) {
    _id, title, "slug": slug.current, description
  }
`;

/**
 * $category dan $q boleh null. Pencarian mencakup isi Portable Text lewat
 * pt::text() agar tidak hanya cocok pada judul.
 */
export const articlesQuery = groq`
  *[
    _type == "article" && ${PUBLISHED} &&
    ($category == null || category->slug.current == $category) &&
    ($q == null || title match $q || excerpt match $q || pt::text(body) match $q)
  ] | order(publishedAt desc) {
    ${ARTICLE_FIELDS}
  }
`;

export const articleSlugsQuery = groq`
  *[_type == "article" && ${PUBLISHED}][].slug.current
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && ${PUBLISHED} && slug.current == $slug][0] {
    ${ARTICLE_FIELDS},
    body, tags, source
  }
`;

export const relatedArticlesQuery = groq`
  *[
    _type == "article" && ${PUBLISHED} && slug.current != $slug &&
    category->slug.current == $category
  ] | order(publishedAt desc)[0...3] {
    ${ARTICLE_FIELDS}
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
