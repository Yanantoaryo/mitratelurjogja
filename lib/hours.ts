import type { OpeningHours } from "@/sanity/lib/types";

export const DAY_LABELS: Record<string, string> = {
  Monday: "Senin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Kamis",
  Friday: "Jumat",
  Saturday: "Sabtu",
  Sunday: "Minggu",
};

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** Ringkas rentang hari berurutan: Senin..Sabtu -> "Senin – Sabtu". */
export function formatDays(days: string[]): string {
  const sorted = [...days].sort(
    (a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b)
  );
  const isContiguous = sorted.every(
    (d, i) =>
      i === 0 || DAY_ORDER.indexOf(d) === DAY_ORDER.indexOf(sorted[i - 1]) + 1
  );

  if (sorted.length > 2 && isContiguous) {
    return `${DAY_LABELS[sorted[0]]} – ${DAY_LABELS[sorted[sorted.length - 1]]}`;
  }
  return sorted.map((d) => DAY_LABELS[d] ?? d).join(", ");
}

/**
 * Waktu "sekarang" di Jakarta (WIB), bukan di zona waktu server. Vercel
 * berjalan UTC, jadi `new Date().getDay()` akan salah hari antara 00:00–07:00 WIB.
 */
function nowInJakarta(): { day: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    day: get("weekday"),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function toMinutes(hhmm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

export function isOpenNow(hours: OpeningHours[]): boolean {
  const { day, minutes } = nowInJakarta();

  return hours.some((h) => {
    if (!h.days?.includes(day) || !h.opens || !h.closes) return false;
    const opens = toMinutes(h.opens);
    const closes = toMinutes(h.closes);
    if (opens === null || closes === null) return false;
    return minutes >= opens && minutes < closes;
  });
}
