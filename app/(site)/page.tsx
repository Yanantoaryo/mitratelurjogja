import JsonLd from "@/components/JsonLd";
import Advantages from "@/components/sections/Advantages";
import Audience from "@/components/sections/Audience";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import HowToOrder from "@/components/sections/HowToOrder";
import OpeningHours from "@/components/sections/OpeningHours";
import Problem from "@/components/sections/Problem";
import Products from "@/components/sections/Products";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import {
  faqPageSchema,
  localBusinessSchema,
  organizationSchema,
} from "@/lib/jsonld";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  advantagesQuery,
  faqsQuery,
  productsQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";
import type {
  Advantage,
  Faq as FaqType,
  Product,
  SiteSettings,
  Testimonial,
} from "@/sanity/lib/types";

export default async function HomePage() {
  const [products, advantages, testimonials, faqs, settings] =
    await Promise.all([
      sanityFetch<Product[]>(productsQuery),
      sanityFetch<Advantage[]>(advantagesQuery),
      sanityFetch<Testimonial[]>(testimonialsQuery),
      sanityFetch<FaqType[]>(faqsQuery),
      sanityFetch<SiteSettings | null>(siteSettingsQuery),
    ]);

  return (
    <>
      <JsonLd data={organizationSchema(settings)} />
      <JsonLd data={localBusinessSchema(settings)} />
      {faqs.length > 0 && <JsonLd data={faqPageSchema(faqs)} />}

      <Hero />
      <Problem />
      <Advantages items={advantages} />
      <Products items={products} />
      <Audience />
      <HowToOrder />
      <OpeningHours settings={settings} />
      <Stats settings={settings} />
      <Testimonials items={testimonials} />
      <Faq items={faqs} />
      <FinalCta />
    </>
  );
}
