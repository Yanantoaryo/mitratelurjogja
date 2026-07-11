import type { Metadata } from "next";
import Container from "@/components/Container";
import GalleryGrid from "@/components/GalleryGrid";
import JsonLd from "@/components/JsonLd";
import { imageGallerySchema } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { galleryImagesQuery } from "@/sanity/lib/queries";
import type { GalleryImage } from "@/sanity/lib/types";

const TITLE = "Galeri Aktivitas";
const DESCRIPTION =
  "Dokumentasi kegiatan Mitra Telur Jogja: penyimpanan telur di gudang, pengemasan, dan pengiriman ke pelanggan se-DIY.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/galeri` },
  openGraph: {
    title: `${TITLE} | Mitra Telur Jogja`,
    description: DESCRIPTION,
    url: `${SITE_URL}/galeri`,
  },
};

export default async function GaleriPage() {
  const images = await sanityFetch<GalleryImage[]>(galleryImagesQuery);

  return (
    <section className="section">
      {images.length > 0 && <JsonLd data={imageGallerySchema(images)} />}
      <Container>
        <p className="section-label">Galeri</p>
        <h1 className="section-title">{TITLE}</h1>
        <p className="mt-3 max-w-xl text-ink-mid">{DESCRIPTION}</p>

        <div className="mt-10">
          {images.length === 0 ? (
            <p className="rounded-brand border border-dashed border-ink/20 px-6 py-10 text-center text-sm text-ink-muted">
              Belum ada foto. Tambahkan lewat Studio.
            </p>
          ) : (
            <GalleryGrid images={images} />
          )}
        </div>
      </Container>
    </section>
  );
}
