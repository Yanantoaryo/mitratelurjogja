"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { PHONES } from "@/lib/site";

const SUBJECTS = [
  "Tanya harga",
  "Pesan telur",
  "Kerja sama B2B",
  "Lainnya",
] as const;

export default function ContactForm() {
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = String(form.get("name") ?? "").trim();
    const subject = String(form.get("subject") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const lines = [
      `Halo Mitra Telur Jogja, saya ${name}.`,
      `Perihal: ${subject}`,
      "",
      message,
    ];

    setSending(true);
    // Tidak ada backend: pesan disusun lalu diserahkan ke WhatsApp. Dibuka di
    // tab yang sama supaya tidak terblokir popup blocker di peramban mobile.
    window.location.href = `https://wa.me/${PHONES[0]}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  }

  const fieldClass =
    "mt-1.5 w-full rounded-brand border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-muted focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-bold text-ink">
          Nama
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Nama Anda"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-bold text-ink">
          Perihal
        </label>
        <select id="subject" name="subject" defaultValue={SUBJECTS[0]} className={fieldClass}>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-bold text-ink">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tulis kebutuhan Anda, misalnya jenis telur dan jumlahnya."
          className={fieldClass}
        />
      </div>

      <p className="text-xs text-ink-muted">
        Menekan tombol di bawah akan membuka WhatsApp dengan pesan yang sudah
        terisi. Anda masih bisa mengubahnya sebelum mengirim.
      </p>

      <button type="submit" disabled={sending} className="btn btn-primary w-full justify-center disabled:opacity-70">
        <MessageCircle size={16} aria-hidden />
        {sending ? "Membuka WhatsApp…" : "Kirim via WhatsApp"}
      </button>
    </form>
  );
}
