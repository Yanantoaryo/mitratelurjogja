const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
  return IDR.format(value);
}

/** Tanggal selalu dirender dalam WIB agar server (UTC) dan pembaca sepakat. */
const DATE_ID = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "long",
  timeZone: "Asia/Jakarta",
});

export function formatDate(iso: string) {
  return DATE_ID.format(new Date(iso));
}
