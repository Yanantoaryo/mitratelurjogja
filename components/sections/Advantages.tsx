import Container from "@/components/Container";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import type { Advantage } from "@/sanity/lib/types";

export default function Advantages({ items }: { items: Advantage[] }) {
  if (items.length === 0) return null;

  return (
    <section id="keunggulan" className="section bg-cream-2">
      <Container>
        <Reveal>
          <p className="section-label">Keunggulan Kami</p>
          <h2 className="section-title">Mengapa Memilih Mitra Telur Jogja?</h2>
          <p className="mt-3 max-w-xl text-ink-mid">
            Kami berkomitmen memberikan yang terbaik — dari kualitas telur
            hingga pelayanan pengiriman.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              as="article"
              key={item._id}
              delay={(i % 3) * 90}
              className="card card-hover p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-brand bg-brand-yellow/15 text-ink">
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-4 font-bold text-ink">{item.title}</h3>
              {item.description && (
                <p className="mt-2 text-sm text-ink-mid">{item.description}</p>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
