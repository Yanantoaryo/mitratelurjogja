import { ChevronDown } from "lucide-react";
import Container from "@/components/Container";
import { WA_URL } from "@/lib/site";
import type { Faq as FaqType } from "@/sanity/lib/types";

export default function Faq({ items }: { items: FaqType[] }) {
  if (items.length === 0) return null;

  return (
    <section id="faq" className="py-16 md:py-20">
      <Container>
        <p className="section-label">FAQ</p>
        <h2 className="section-title">Pertanyaan yang Sering Ditanyakan</h2>
        <p className="mt-3 max-w-xl text-ink-mid">
          Belum menemukan jawaban yang Anda cari?{" "}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-orange hover:underline"
          >
            Hubungi kami langsung via WhatsApp.
          </a>
        </p>

        <div className="mt-10 max-w-3xl divide-y divide-ink/10 rounded-brand border border-ink/10 bg-white">
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
        </div>
      </Container>
    </section>
  );
}
