# Rencana Implementasi — Mitra Telur Jogja (Statis → Dinamis)

> Turunan teknis dari `PRD.md`. Dokumen ini adalah rencana eksekusi konkret, disesuaikan dengan kondisi nyata repo.

## Ringkasan Kondisi Repo Saat Ini

- `index.html` — single-file, 1428 baris, CSS + JS inline. Punya design system matang.
- Deployment: **GitHub Pages** (`CNAME` → `mitratelurjogja.com`).
- Aset: 4 gambar di `img/` (`egg-komersial.jpg`, `egg-omega-1.jpeg`, `img-3.jpeg`, `Artboard 3.png`).
- `sitemap.xml` statis (1 URL).
- Dependensi CDN: Google Fonts (Fraunces + Plus Jakarta Sans), Font Awesome 6.5.
- Data bisnis: WA `+6285702275769` & `+6285848148108`; lokasi Potorono, Bantul, Yogyakarta.

## Design Tokens (diekstrak dari `index.html`)

| Token | Nilai |
|---|---|
| `--red` | `#E8192C` |
| `--orange` | `#F47920` |
| `--yellow` | `#FFC107` |
| `--cream` | `#FFFDF5` |
| `--cream2` | `#FFF4DF` |
| `--dark` | `#1A1A1A` |
| `--mid` | `#555555` |
| `--muted` | `#888888` |
| `--radius` | `12px` |
| `--shadow` | `0 4px 20px rgba(244,121,32,0.12)` |
| `--shadow-hover` | `0 8px 32px rgba(244,121,32,0.22)` |
| Font display | Fraunces (serif) |
| Font body | Plus Jakarta Sans |

## Tech Stack Final (mengikuti PRD §7)

| Komponen | Pilihan |
|---|---|
| Framework | Next.js 14+ App Router + TypeScript |
| CMS | Sanity.io (Studio embed `/studio`) |
| Hosting | Vercel (`dev`→preview, `main`→production) |
| Styling | Tailwind CSS (token dari tabel di atas) |
| AI | Anthropic API (`claude-opus-4-8` / `claude-sonnet-5`) |
| Gambar | next/image + Sanity image CDN |
| Sitemap | next-sitemap |

## Keputusan Kunci (default yang dipakai)

1. **Rebuild di repo yang sama**; `index.html`, `img/`, `sitemap.xml` dipindah ke `/legacy` sebagai referensi konten (hapus setelah launch).
2. **Auto-artikel Claude = mode draft dulu** → aktifkan auto-publish setelah kualitas terbukti (2–3 minggu).
3. **Auto-share medsos ditunda ke pasca-launch** (butuh Meta app review; TikTok tanpa API auto-post resmi).

---

## Fase 1 — Foundation (Minggu 1)

- [ ] Pindah `index.html`, `img/`, `sitemap.xml` → `/legacy`.
- [ ] Scaffold Next.js (App Router, TS, Tailwind, ESLint).
- [ ] Ekstrak design tokens → `tailwind.config.ts`; `next/font` untuk Fraunces & Plus Jakarta Sans (hapus CDN); Font Awesome → `lucide-react`.
- [ ] Setup Sanity: project + Studio `/studio`. Schema: `siteSettings`, `product`, `advantage`, `testimonial`, `faq`, `article`, `articleCategory`, `topicBrief`, `galleryImage`.
- [ ] Ekstrak konten existing (produk, keunggulan, testimoni, FAQ, hero) → seed Sanity.
- [ ] Komponen layout: `Navbar` (sticky + mobile menu), `Footer` (link sosmed), `Container`.
- [ ] Hubungkan repo ke Vercel; verifikasi build preview hijau. **DNS belum dipindah.**

**Deliverable:** Homepage ter-deploy di URL Vercel preview; Studio bisa diakses.

## Fase 2 — Halaman Inti & Konten Dinamis (Minggu 2)

- [ ] Port 9 section homepage ke komponen React, data dari Sanity (GROQ + ISR).
- [ ] Halaman Produk: `/produk` + `/produk/[slug]` (harga dinamis).
- [ ] Metadata API per halaman (title/description/OG/canonical, template PRD §9.3).
- [ ] Schema JSON-LD: `Organization` + `LocalBusiness` dari `siteSettings`.
- [ ] Verifikasi owner bisa edit produk/harga via Studio.

## Fase 3 — Fitur Baru (Minggu 3)

- [ ] Jam Operasional: section + `openingHoursSpecification`.
- [ ] Blog: `/blog` (listing + filter kategori + search) + `/blog/[slug]` (Portable Text) + `Article`/`BlogPosting` schema + tombol share.
- [ ] Galeri: `/galeri` grid + lightbox + `ImageObject` schema.
- [ ] Halaman About (`/tentang`) & Contact (`/kontak` — form + WA redirect + map embed).
- [ ] Auto-artikel Claude (generate saja, tanpa cron): API route baca `topicBrief` → Anthropic API → tulis `article` sebagai **draft** di Sanity. Test manual.

## Fase 4 — SEO/GEO, Automasi & Launch (Minggu 4)

- [ ] Lengkapi schema: `FAQPage`, `Product`, `BreadcrumbList`, `sameAs`. Validasi Rich Results Test + Schema.org validator.
- [ ] `next-sitemap` (dinamis) + `robots.txt` (izinkan GPTBot, PerplexityBot, Google-Extended).
- [ ] Optimasi gambar: WebP, lazy loading, srcset; Lighthouse 90+.
- [ ] Cron Vercel (`vercel.json`) → endpoint auto-artikel Senin & Kamis 09:00 WIB (UTC `0 2 * * 1,4`), diamankan `CRON_SECRET`.
- [ ] Analytics: Vercel Analytics + GA4 + Search Console.
- [ ] Uji mobile & aksesibilitas (WCAG AA, ARIA, keyboard nav).
- [ ] Cutover: merge `dev`→`main`, ubah DNS ke Vercel, hapus `CNAME`, submit sitemap.
- [ ] Pasca-launch: auto-share medsos (setelah Meta app review).

---

## Risiko Spesifik Repo

| Risiko | Mitigasi |
|---|---|
| Downtime pindah DNS GitHub Pages → Vercel | Verifikasi penuh di preview; ubah DNS terakhir; turunkan TTL dulu |
| Auto-share TikTok/IG tak feasible cepat | Keluarkan dari kritis-path Week 4; manual share dulu |
| Kualitas artikel AI → risiko brand | Mode draft + review sebelum auto-publish |
| Kehilangan polish desain saat porting | Port 1:1 dari `index.html`; bandingkan visual |
| Biaya Anthropic API | ~8 artikel/bulan, biaya kecil; set batas + logging |

## Prasyarat Lingkungan

- **Node.js 18+ / 20+** (belum terinstal — WAJIB dipasang sebelum `npm install`).
- Akun: Sanity.io, Vercel, Anthropic API key, Google Analytics/Search Console.
