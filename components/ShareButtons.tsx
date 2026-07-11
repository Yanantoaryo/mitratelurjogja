"use client";

import { useEffect, useState } from "react";
import { Check, Facebook, Link2, MessageCircle, Share2 } from "lucide-react";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  // Dicek setelah mount, bukan saat render: `navigator` tidak ada di server,
  // dan menampilkan tombol ini langsung akan memicu hydration mismatch.
  const [canNativeShare, setCanNativeShare] = useState(false);
  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard butuh izin dan konteks aman; kalau ditolak, biarkan
      // pengguna menyalin dari address bar ketimbang menampilkan error.
    }
  }

  async function nativeShare() {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, url });
    } catch {
      // Pengguna membatalkan dialog share. Bukan kondisi error.
    }
  }

  const linkClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-mid transition hover:border-brand-orange hover:text-brand-rust focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-rust";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-bold text-ink">Bagikan</span>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke WhatsApp"
        className={linkClass}
      >
        <MessageCircle size={18} aria-hidden />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke Facebook"
        className={linkClass}
      >
        <Facebook size={18} aria-hidden />
      </a>

      <button type="button" onClick={copy} className={linkClass}>
        {copied ? (
          <Check size={18} aria-hidden className="text-green-600" />
        ) : (
          <Link2 size={18} aria-hidden />
        )}
        <span className="sr-only">
          {copied ? "Tautan tersalin" : "Salin tautan"}
        </span>
      </button>

      {/* Tombol share bawaan OS: hanya berguna bila browser mendukungnya. */}
      {canNativeShare && (
        <button
          type="button"
          onClick={nativeShare}
          aria-label="Bagikan lewat aplikasi lain"
          className={linkClass}
        >
          <Share2 size={18} aria-hidden />
        </button>
      )}

      <span aria-live="polite" className="sr-only">
        {copied ? "Tautan tersalin ke clipboard" : ""}
      </span>
    </div>
  );
}
