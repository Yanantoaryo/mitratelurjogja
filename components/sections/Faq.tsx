import { ChevronDown } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { WA_URL } from "@/lib/site";
import type { Faq as FaqType } from "@/sanity/lib/types";

export default function Faq({ items }: { items: FaqType[] }) {
  if (items.length === 0) return null;

  return (
    <section id="faq" className="section">
      <Container>
        <Reveal>
        <p className="section-label">FAQ</p>
        <h2 className="section-title">Pertanyaan yang Sering Ditanyakan</h2>
        <p className="mt-3 max-w-xl text-ink-mid">
          Belum menemukan jawaban yang Anda cari?{" "}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline decoration-brand-yellow decoration-2 underline-offset-4 hover:decoration-4"
          >
            Hubungi kami langsung via WhatsApp.
          </a>
        </p>
        </Reveal>

        <Reveal delay={100} className="card mt-10 max-w-3xl divide-y divide-ink/10">
          {items.map((item) => (
            <details key={item._id} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink marker:content-none">
                {item.question}
                <ChevronDown
                  size={18}
                  aria-hidden
                  className="shrink-0 text-ink-muted transition group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm text-ink-mid">{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
