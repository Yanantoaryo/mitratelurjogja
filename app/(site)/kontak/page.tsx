import type { Metadata } from "next";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { formatDays } from "@/lib/hours";
import { localBusinessSchema } from "@/lib/jsonld";
import { ADDRESS, BUSINESS_NAME, SITE_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

const TITLE = "Kontak";
const DESCRIPTION =
  "Hubungi Mitra Telur Jogja via WhatsApp untuk tanya harga, pesan telur, atau kerja sama B2B. Melayani seluruh Daerah Istimewa Yogyakarta.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/kontak` },
  openGraph: {
    title: `${TITLE} | Mitra Telur Jogja`,
    description: DESCRIPTION,
    url: `${SITE_URL}/kontak`,
  },
};

/** Format nomor 6285... menjadi +62 857-0227-5769 untuk dibaca manusia. */
function prettyPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (!d.startsWith("62")) return `+${d}`;
  const rest = d.slice(2);
  const a = rest.slice(0, 3);
  const b = rest.slice(3, 7);
  const c = rest.slice(7);
  return `+62 ${[a, b, c].filter(Boolean).join("-")}`;
}

export default async function KontakPage() {
  const settings = await sanityFetch<SiteSettings | null>(siteSettingsQuery);

  const phones = settings?.phones?.length
    ? settings.phones
    : ["6285702275769", "6285848148108"];
  const address = settings?.address ?? ADDRESS;
  const geo = settings?.geo;
  const hours = settings?.openingHours?.filter(
    (h) => h.days?.length && h.opens && h.closes
  );

  // Tautan resmi ke listing Google Bisnis Mitra Telur Jogja (pakai CID tempat).
  const mapsPlaceUrl = "https://www.google.com/maps?cid=962332873621504444";

  // Embed tanpa API key. Utamakan koordinat dari CMS bila ada, kalau tidak
  // cari berdasarkan nama bisnis supaya pin jatuh di listing Mitra Telur Jogja.
  const mapQuery =
    typeof geo?.lat === "number" && typeof geo?.lng === "number"
      ? `${geo.lat},${geo.lng}`
      : `${BUSINESS_NAME}, ${address}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&hl=id&z=16&output=embed`;

  return (
    <section className="section">
      <JsonLd data={localBusinessSchema(settings)} />
      <Container>
        <p className="section-label">Kontak</p>
        <h1 className="section-title">Hubungi Kami</h1>
        <p className="mt-4 max-w-xl text-ink-mid">{DESCRIPTION}</p>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="rounded-card border border-ink/10 bg-white p-6 shadow-card md:p-8">
            <h2 className="font-display text-xl font-extrabold text-ink">
              Kirim pesan
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-extrabold text-ink">
              Informasi
            </h2>

            <dl className="mt-6 space-y-6">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-brand bg-brand-yellow/15 text-ink">
                  <MapPin size={18} aria-hidden />
                </span>
                <div>
                  <dt className="text-sm font-bold text-ink">Alamat</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-mid">
                    {address}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-brand bg-brand-yellow/15 text-ink">
                  <Phone size={18} aria-hidden />
                </span>
                <div>
                  <dt className="text-sm font-bold text-ink">WhatsApp</dt>
                  <dd className="mt-1 space-y-1 text-sm">
                    {phones.map((p) => (
                      <a
                        key={p}
                        href={`https://wa.me/${p.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-semibold text-ink-mid transition hover:text-ink"
                      >
                        {prettyPhone(p)}
                      </a>
                    ))}
                  </dd>
                </div>
              </div>

              {hours?.length ? (
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-brand bg-brand-yellow/15 text-ink">
                    <Clock size={18} aria-hidden />
                  </span>
                  <div>
                    <dt className="text-sm font-bold text-ink">
                      Jam Operasional
                    </dt>
                    <dd className="mt-1 space-y-1 text-sm text-ink-mid">
                      {hours.map((h, i) => (
                        <p key={i}>
                          {formatDays(h.days!)}: {h.opens} – {h.closes} WIB
                        </p>
                      ))}
                    </dd>
                  </div>
                </div>
              ) : null}

              {settings?.socials?.instagram && (
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-brand bg-brand-yellow/15 text-ink">
                    <Instagram size={18} aria-hidden />
                  </span>
                  <div>
                    <dt className="text-sm font-bold text-ink">Media Sosial</dt>
                    <dd className="mt-1 text-sm">
                      <a
                        href={settings.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-ink-mid transition hover:text-ink"
                      >
                        Instagram
                      </a>
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            <div className="mt-8 overflow-hidden rounded-card border border-ink/10 shadow-card">
              <iframe
                src={mapSrc}
                title={`Peta lokasi ${address}`}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block border-0"
              />
            </div>
            <a
              href={mapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-brand-yellow decoration-2 underline-offset-4 transition hover:decoration-4"
            >
              <MapPin size={16} aria-hidden />
              Lihat di Google Maps
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
