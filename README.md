# Mitra Telur Jogja — Website Dinamis

Next.js 15 (App Router) + Sanity CMS + Tailwind CSS. Transformasi dari landing page statis (lihat `/legacy`) sesuai `PRD.md` dan `IMPLEMENTATION_PLAN.md`.

## Prasyarat

- **Node.js 18.17+ atau 20+** (WAJIB — belum terinstal saat scaffold dibuat).
  Download: https://nodejs.org (pilih LTS).
- Akun Sanity.io, Vercel, dan Anthropic API key.

## Setup Pertama Kali

```bash
# 1. Install dependency
npm install

# 2. Salin env dan isi nilainya
cp .env.example .env.local

# 3. Buat project Sanity (sekali saja) — akan mengisi projectId
npx sanity@latest init --env
#   Pilih "Create new project", dataset: production.
#   Salin projectId ke NEXT_PUBLIC_SANITY_PROJECT_ID di .env.local

# 4. Jalankan dev server
npm run dev
```

- Situs: http://localhost:3000
- Sanity Studio (admin CMS): http://localhost:3000/studio

## Struktur

```
app/(site)/        # Halaman publik (punya Navbar + Footer)
app/studio/        # Sanity Studio embed (/studio)
components/         # Navbar, Footer, Container
lib/fonts.ts       # next/font (Fraunces + Plus Jakarta Sans)
sanity/            # env, client, image builder, schemaTypes
legacy/            # Situs statis lama (referensi konten, hapus setelah launch)
```

## Deploy (Vercel)

1. Import repo ke Vercel.
2. Set semua env var dari `.env.example` di dashboard Vercel.
3. Branch `dev` → Preview, `main` → Production.
4. **DNS**: pindahkan `mitratelurjogja.com` dari GitHub Pages ke Vercel **hanya saat launch** (lihat `IMPLEMENTATION_PLAN.md` §Cutover).

## Status

- [x] Fase 1 — Foundation (scaffold, tokens, schema, layout) — *butuh `npm install` untuk dijalankan*
- [ ] Fase 2 — Halaman inti & konten dinamis
- [ ] Fase 3 — Fitur baru (blog, galeri, jam operasional, auto-artikel)
- [ ] Fase 4 — SEO/GEO, automasi, launch
