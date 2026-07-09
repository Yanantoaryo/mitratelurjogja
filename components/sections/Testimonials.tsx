import Image from "next/image";
import { Star } from "lucide-react";
import Container from "@/components/Container";
import { urlFor } from "@/sanity/lib/image";
import type { Testimonial } from "@/sanity/lib/types";

function Rating({ value }: { value: number }) {
  return (
    <p
      className="flex gap-0.5 text-brand-gold"
      aria-label={`Rating ${value} dari 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden
          className={i < value ? "fill-current" : "text-ink/15"}
        />
      ))}
    </p>
  );
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <section id="testimoni" className="bg-cream-2 py-16 md:py-20">
      <Container>
        <p className="section-label">Testimoni Pelanggan</p>
        <h2 className="section-title">Kata Mereka tentang Mitra Telur Jogja</h2>
        <p className="mt-3 max-w-xl text-ink-mid">
          Kepuasan mitra adalah prioritas utama kami. Berikut pengalaman nyata
          dari pelanggan setia kami.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item._id}
              className="flex flex-col rounded-brand border border-ink/10 bg-white p-6"
            >
              {typeof item.rating === "number" && <Rating value={item.rating} />}
              <blockquote className="mt-4 flex-1 text-sm text-ink-mid">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {item.photo ? (
                  <Image
                    src={urlFor(item.photo).width(96).height(96).fit("crop").url()}
                    alt={item.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/10 font-display font-extrabold text-brand-rust"
                  >
                    {item.name.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="block text-sm font-bold text-ink">
                    {item.name}
                  </span>
                  {item.role && (
                    <span className="block text-xs text-ink-muted">
                      {item.role}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
