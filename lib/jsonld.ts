import { ADDRESS, BUSINESS_NAME, PHONES, SITE_URL } from "@/lib/site";
import type { Product, SiteSettings } from "@/sanity/lib/types";

function socialUrls(settings: SiteSettings | null): string[] {
  const s = settings?.socials;
  return [s?.instagram, s?.facebook, s?.tiktok].filter(
    (u): u is string => typeof u === "string" && u.length > 0
  );
}

export function organizationSchema(settings: SiteSettings | null) {
  const sameAs = socialUrls(settings);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: settings?.businessName ?? BUSINESS_NAME,
    url: SITE_URL,
    description: settings?.description ?? undefined,
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function localBusinessSchema(settings: SiteSettings | null) {
  const phones = settings?.phones?.length ? settings.phones : [...PHONES];
  const geo = settings?.geo;

  const openingHours = settings?.openingHours
    ?.filter((h) => h.days?.length && h.opens && h.closes)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: settings?.businessName ?? BUSINESS_NAME,
    url: SITE_URL,
    description: settings?.description ?? undefined,
    telephone: phones.map((p) => `+${p.replace(/^\+/, "")}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address ?? ADDRESS,
      addressLocality: "Bantul",
      addressRegion: "Daerah Istimewa Yogyakarta",
      addressCountry: "ID",
    },
    ...(typeof geo?.lat === "number" &&
      typeof geo?.lng === "number" && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: geo.lat,
          longitude: geo.lng,
        },
      }),
    ...(openingHours?.length && { openingHoursSpecification: openingHours }),
    areaServed: "Daerah Istimewa Yogyakarta",
  };
}

export function productSchema(product: Product) {
  const { name, slug, description, price, availability } = product;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description ?? undefined,
    url: `${SITE_URL}/produk/${slug}`,
    brand: { "@type": "Brand", name: BUSINESS_NAME },
    // Tanpa harga, `offers` dihilangkan sepenuhnya: Offer tanpa `price`
    // ditolak Rich Results Test, dan mengarang 0 akan menyesatkan.
    ...(typeof price === "number" && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "IDR",
        availability: `https://schema.org/${availability ?? "InStock"}`,
        url: `${SITE_URL}/produk/${slug}`,
      },
    }),
  };
}
