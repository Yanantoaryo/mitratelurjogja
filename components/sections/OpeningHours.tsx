import { Clock, MapPin } from "lucide-react";
import Container from "@/components/Container";
import { DAY_LABELS, formatDays, isOpenNow } from "@/lib/hours";
import { ADDRESS } from "@/lib/site";
import type { SiteSettings } from "@/sanity/lib/types";

export default function OpeningHours({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const hours = settings?.openingHours?.filter(
    (h) => h.days?.length && h.opens && h.closes
  );
  if (!hours?.length) return null;

  // Dihitung saat render di server. Halaman ber-ISR 60 detik, jadi status ini
  // bisa tertinggal paling lama satu menit dari waktu WIB sebenarnya.
  const open = isOpenNow(hours);

  const listedDays = new Set(hours.flatMap((h) => h.days ?? []));
  const closedDays = Object.keys(DAY_LABELS).filter((d) => !listedDays.has(d));

  return (
    <section id="jam-operasional" className="py-16 md:py-20">
      <Container>
        <p className="section-label">Jam Operasional</p>
        <h2 className="section-title">Kapan Kami Melayani</h2>

        <div className="mt-8 max-w-2xl overflow-hidden rounded-brand border border-ink/10 bg-white">
          <div className="flex flex-wrap items-center gap-3 border-b border-ink/10 px-6 py-4">
            <Clock size={18} aria-hidden className="text-brand-orange" />
            <span
              className={`inline-flex items-center gap-2 rounded-brand px-3 py-1 text-xs font-bold ${
                open
                  ? "bg-green-100 text-green-800"
                  : "bg-ink/5 text-ink-mid"
              }`}
            >
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full ${
                  open ? "bg-green-600" : "bg-ink-muted"
                }`}
              />
              {open ? "Buka sekarang" : "Sedang tutup"}
            </span>
            <span className="text-sm text-ink-muted">Waktu Indonesia Barat</span>
          </div>

          <dl className="divide-y divide-ink/10">
            {hours.map((h, i) => (
              <div
                key={`${h.opens}-${h.closes}-${i}`}
                className="flex items-center justify-between px-6 py-4"
              >
                <dt className="font-medium text-ink">{formatDays(h.days!)}</dt>
                <dd className="text-ink-mid">
                  {h.opens} – {h.closes} WIB
                </dd>
              </div>
            ))}
            {closedDays.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4">
                <dt className="font-medium text-ink">
                  {formatDays(closedDays)}
                </dt>
                <dd className="text-ink-muted">Tutup</dd>
              </div>
            )}
          </dl>
        </div>

        <p className="mt-5 flex items-center gap-2 text-sm text-ink-mid">
          <MapPin size={16} aria-hidden /> {settings?.address ?? ADDRESS}
        </p>
      </Container>
    </section>
  );
}
