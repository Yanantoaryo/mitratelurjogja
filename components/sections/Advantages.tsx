import Container from "@/components/Container";
import Icon from "@/components/Icon";
import type { Advantage } from "@/sanity/lib/types";

export default function Advantages({ items }: { items: Advantage[] }) {
  if (items.length === 0) return null;

  return (
    <section id="keunggulan" className="py-16 md:py-20">
      <Container>
        <p className="section-label">Keunggulan Kami</p>
        <h2 className="section-title">Mengapa Memilih Mitra Telur Jogja?</h2>
        <p className="mt-3 max-w-xl text-ink-mid">
          Kami berkomitmen memberikan yang terbaik — dari kualitas telur hingga
          pelayanan pengiriman.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item._id}
              className="rounded-brand border border-ink/10 bg-white p-6 transition hover:shadow-brand"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-brand bg-brand-orange/10 text-brand-rust">
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-4 font-bold text-ink">{item.title}</h3>
              {item.description && (
                <p className="mt-2 text-sm text-ink-mid">{item.description}</p>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
