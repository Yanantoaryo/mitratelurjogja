# Product Requirements Document — Mitra Telur Jogja Website Dinamis

## 1. Executive Summary

**Project Name:** Mitra Telur Jogja — Landing Page Statis ke Website Dinamis  
**Domain:** mitratelurjogja.com  
**Current State:** Landing page statis (single HTML + inline CSS/JS) di branch `dev` GitHub  
**Target State:** Website dinamis dengan fitur CMS untuk konten, artikel, galeri, dan integrasi media sosial  
**Primary Goals:** Meningkatkan brand awareness, engagement, dan penjualan (conversion) melalui optimasi SEO dan GEO  
**Target Branch:** `dev` (GitHub)  
**Timeline:** 4–6 Minggu  

---

## 2. Current State Analysis

| Aspek | Status Saat Ini |
|---|---|
| Struktur | Single-file `index.html` (1429 baris) |
| Konten | Hardcoded di HTML, sulit diupdate tanpa edit file |
| SEO | Meta tag dasar saja, tidak ada structured data |
| GEO (AI SEO) | Tidak ada schema markup, tidak ada FAQPage/Article structured data |
| Konten Dinamis | Tidak ada — semuanya statis |
| CMS/Admin Panel | Tidak ada |
| Media Sosial | Tidak ada tautan/link aktif ke profil brand |
| Artikel/Blog | Tidak ada |
| Galeri Foto | Tidak ada |
| Jam Operasional | Tidak ada |
| Performa | Responsif, tapi tidak ada lazy loading / image optimization |
| Analytics | Tidak ada |

---

## 3. Business Goals

### 3.1 Brand Awareness
- Website terindeks di Google dengan kata kunci lokal (SEO)
- Konten terdeteksi dan direferensikan oleh AI engines (ChatGPT, Perplexity, Gemini, Google AI Overview)
- Foto kegiatan dan artikel meningkatkan kredibilitas brand

### 3.2 Engagement
- Pengunjung bisa melihat update terbaru tanpa manual edit HTML
- Interaksi melalui form kontak, artikel, galeri, dan media sosial
- Berita/kegiatan bisa di-share di TikTok, Instagram, Facebook

### 3.3 Sales / Conversion
- Produk mudah ditemukan dan diupdate harian (harga, stok)
- CTA WhatsApp terintegrasi di setiap section
- Testimoni dan social proof yang up-to-date

---

## 4. Functional Requirements

### 4.1 Core Platform
- **Headless CMS atau CMS传统:** WordPress (rekomendasi untuk kemudahan) atau Next.js + Sanity/Contentful
- **Hosting:** Vercel / Netlify / shared hosting sesuai budget
- **Git Deployment:** Auto-deploy dari branch `dev` ke staging, `main` ke production

### 4.2 Halaman & Section (mengandung konten yang sudah ada)
| Section | Keterangan |
|---|---|
| Navbar | Sticky, mobile-responsive, link ke section baru (Blog, Galeri, Jam Operasional) |
| Hero | Tetap, tapi bisa update headline/subtitle via CMS |
| Pain Points | Tetap |
| Keunggulan | Tetap, bisa tambah/edit via CMS |
| Produk | Dinamis — admin bisa tambah/edit/hapus produk + harga harian |
| Target Pelanggan | Tetap |
| Cara Order | Tetap |
| **Jam Operasional** | **BARU** — menampilkan jam buka/tutup, kontak darurat |
| Social Proof / Mitra | Tetap, bisa update statistik via CMS |
| Testimoni | Tetap, bisa tambah/edit via CMS |
| **Artikel/Blog** | **BARU** — listing artikel + detail artikel dengan schema markup |
| **Galeri Foto** | **BARU** — grid foto kegiatan mitra, dengan lightbox |
| FAQ | Tetap, bisa tambah/edit via CMS |
| Footer | Update dengan link media sosial aktif |

### 4.3 Fitur Baru

#### A. Artikel/Blog (Blog Section)
- Admin bisa buat/edit/hapus artikel
- Artikel punya: judul, slug, excerpt, body (rich text), cover image, tanggal publish, kategori, tags
- Fitur: search, kategori filter, related posts
- Schema markup: `Article`, `BlogPosting`, `Organization`

#### B. Jam Operasional (Operating Hours)
- Tampilan jam buka/tutup per hari
- Info kontak darurat / lokasi
- Schema markup: `LocalBusiness` openingHoursSpecification

#### C. Media Sosial
- Tautan aktif ke:
  - TikTok: `@mitratelurjogja` (atau sesuai handle asli)
  - Instagram: `@mitratelurjogja`
  - Facebook: Mitra Telur Jogja page
- Widget feed (opsional): embed Instagram feed / TikTok feed di galeri atau footer
- Tombol share artikel ke media sosial

#### D. Galeri Foto
- Upload foto kegiatan mitra (via admin panel)
- Grid layout dengan lightbox
- Kategori foto (opsional): kegiatan, produk, event, kunjungan farm
- Schema markup: `ImageObject`

#### E. Admin Panel / CMS
- Dashboard sederhana untuk update konten tanpa edit code
- Manajemen: Artikel, Produk, Galeri, Testimoni, FAQ, Harga Harian
- Role: Admin (owner), Editor (jika ada staf)
- Media library untuk upload gambar

#### F. Auto-Artikel dengan Claude AI (Automated Content Generation)
- Artikel di-generate otomatis menggunakan **Claude AI** (Anthropic API)
- Jadwal publish: **Setiap Senin dan Kamis, jam 09.00 WIB**
- Topik artikel: Relevan dengan bisnis telur, tips memasak, informasi nutrisi, update harga, kegiatan mitra, insight industri
- Prosis otomatis:
  1. **Scheduler trigger** (Vercel Cron / GitHub Actions / cron job server) setiap Senin & Kamis 09.00 WIB
  2. Claude AI generate artikel berdasarkan **topic brief** yang pre-defined di CMS
  3. Artikel masuk ke CMS (Sanity) sebagai **draft** atau **auto-publish** sesuai setting
  4. Artikel ter-publish dengan **schema `Article`** lengkap (author, datePublished, dateModified, publisher)
  5. **Auto-share** ke media sosial (Instagram, Facebook, TikTok) via API/plugin
- Workflow opsional: Draft → Admin review (1–2 jam) → Publish (before 09.00 atau sesaat setelah)
- Manfaat **GEO**: Konten fresh secara berkala meningkatkan relevansi brand di AI engines (ChatGPT, Perplexity, Gemini, Google AI Overview)
- Manfaat **SEO**: Sinyal fresh content yang konsisten untuk Google ranking
- Konfigurasi topic brief via CMS agar tim non-teknis bisa mengatur topik artikel mingguan

---

## 5. Non-Functional Requirements

### 5.1 SEO (Search Engine Optimization)
- Semantic HTML5 (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Meta tag lengkap per halaman (title, description, og:image, twitter:card)
- Sitemap.xml otomatis
- robots.txt
- Clean URL structure (`/blog/nama-artikel`, `/produk/telur-ayam-komersial`)
- Internal linking strategy
- Alt text untuk semua gambar
- Lazy loading untuk gambar di bawah fold
- Core Web Vitals optimization (LCP, FID, CLS)

### 5.2 GEO (Generative Engine Optimization) — **PRIORITAS TINGGI**
Ini adalah faktor utama untuk masuk ke AI crawler (ChatGPT, Perplexity, Gemini, Google AI Overview):

| GEO Requirement | Implementasi |
|---|---|
| **Structured Data (Schema.org)** | `LocalBusiness`, `Organization`, `Article`, `FAQPage`, `ImageObject`, `Product`, `BreadcrumbList` |
| **Entity Optimization** | Nama brand, alamat, nomor telepon, sosial media konsisten di seluruh web |
| **E-E-A-T Signals** | Halaman "Tentang Kami", testimoni dengan nama/role/foto, artikel oleh "admin" |
| **FAQPage Schema** | Semua FAQ FAQ dengan `Question` + `Answer` schema |
| **Article Schema** | Setiap artikel blog dengan author, datePublished, dateModified |
| **Product Schema** | Setiap produk dengan name, description, price, availability |
| **LocalBusiness Schema** | Alamat, geo coordinates, openingHours, telephone |
| **BreadcrumbList Schema** | Navigasi hierarki untuk AI understanding |
| **Natural Language Content** | Konten ditulis untuk manusia, tapi structured untuk AI consumption |
| **Clear Taxonomy** | Kategori artikel, tags, produk yang konsisten |
| **Canonical URLs** | Menghindari duplicate content |
| **Robots Meta** | Izinkan indexing, allow AI crawling |
| **About/Contact Page** | Halaman khusus dengan info lengkap perusahaan |
| **Consistent NAP** | Name, Address, Phone konsisten di semua halaman + structured data |

### 5.3 Performa & Keamanan
- Image optimization (WebP, lazy loading, responsive srcset)
- Minified CSS/JS (production build)
- HTTPS enforced
- Security headers
- Backup otomatis (jika pakai CMS)
- Form anti-spam (reCAPTCHA atau honeypot)

### 5.4 Mobile & Accessibility
- Fully responsive (sudah ada, perlu dipertahankan)
- WCAG 2.1 AA compliant
- Keyboard navigation friendly
- Screen reader friendly (ARIA labels)

---

## 6. Technical Architecture Recommendation

### Opsi A: Next.js + Headless CMS (Rekomendasi untuk performa & GEO)
```
Frontend: Next.js (App Router) — static generation + server components
CMS: Sanity.io / Contentful / Strapi (self-hosted)
Hosting: Vercel (auto-deploy dari GitHub)
Database: CMS bawaan
Images: Next.js Image Optimization
```

**Keunggulan:**
- Super fast (SSG/ISR)
- Built-in SEO (metadata API)
- Schema markup mudah via JSON-LD
- Auto-deploy dari GitHub
- Cocok untuk GEO karena konten terstruktur

### Opsi B: WordPress + Theme Custom
```
CMS: WordPress
Theme: Custom theme (bisa pakai starter theme seperti _s atau GeneratePress)
Hosting: Shared hosting / VPS
Plugin: Yoast SEO / Rank Math, WP Rocket, Smush
```

**Keunggulan:**
- Admin panel sangat familiar
- Banyak plugin untuk SEO, galeri, social feed
- Konten bisa diupdate mudah
- Cocok jika tim non-teknis akan manage konten

### Opsi C: Astro + CMS (Lightweight, modern)
```
Frontend: Astro (island architecture, super fast)
CMS: Sanity / Contentful / Markdown files di repo
Hosting: Netlify / Vercel
```

**Keunggulan:**
- Zero JS by default, sangat cepat
- Content collections untuk typed content
- Perfect untuk static-first dengan dynamic content

---

## 7. Recommended Tech Stack (Final)

| Komponen | Rekomendasi | Alternatif |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Astro, WordPress |
| CMS | **Sanity.io** (free tier cukup) | Contentful, Strapi |
| Hosting | **Vercel** (pro) / Netlify | Shared hosting |
| Deployment | **GitHub → Vercel** (auto-deploy) | GitHub Actions |
| Styling | **Tailwind CSS** | CSS Modules, styled-components |
| Schema/SEO | **next-schema** / manual JSON-LD | Yoast (WP) |
| Images | **next/image** + Cloudinary | Cloudinary, imgix |
| Forms | **React Hook Form** + WhatsApp redirect | Formspree |
| Analytics | **Vercel Analytics** + Google Analytics 4 | Plausible |
| Sitemap | **next-sitemap** | Plugin (WP) |

---

## 8. Content Migration Plan

### Dari Static → Dynamic
1. **Produk** — Migrate ke CMS sebagai `Product` document
   - Telur Ayam Komersial
   - Telur Omega
   - Harga dijadikan field dinamis (update harian)
2. **Keunggulan** — Migrate ke CMS sebagai `Feature` / `Advantage`
3. **Testimoni** — Migrate ke CMS sebagai `Testimonial` (ada nama, role, foto, rating)
4. **FAQ** — Migrate ke CMS sebagai `FAQ` (pertanyaan + jawaban)
5. **Artikel Baru** — Buat schema `Article` dengan field lengkap + integrasi Claude AI untuk auto-generate artikel 2x/minggu
6. **Galeri** — Buat schema `ImageObject` / media asset di CMS
7. **Jam Operasional** — Field baru di schema `LocalBusiness`
8. **Media Sosial** — Tambah link di footer + navbar + schema `SameAs`

---

## 9. SEO & GEO Implementation Details

### 9.1 Structured Data (JSON-LD) per Halaman

**Homepage (`/`):**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mitra Telur Jogja",
  "description": "Supplier telur ayam komersial & telur omega terpercaya di Yogyakarta",
  "address": { ... },
  "telephone": ["+6285702275769", "+6285848148108"],
  "openingHoursSpecification": [ ... ],
  "sameAs": [
    "https://tiktok.com/@mitratelurjogja",
    "https://instagram.com/mitratelurjogja",
    "https://facebook.com/mitratelurjogja"
  ]
}
```

**Halaman Artikel (`/blog/[slug]`):**
```json
{
  "@type": "Article",
  "headline": "...",
  "image": "...",
  "author": { "@type": "Person", "name": "Mitra Telur Jogja" },
  "datePublished": "...",
  "dateModified": "...",
  "publisher": { "@type": "Organization", "name": "Mitra Telur Jogja" }
}
```

**Halaman Produk (`/produk/[slug]`):**
```json
{
  "@type": "Product",
  "name": "Telur Ayam Komersial",
  "description": "...",
  "offers": { "@type": "Offer", "price": "...", "priceCurrency": "IDR" }
}
```

**Halaman FAQ (`/faq` atau section di homepage):**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apakah ada minimal pembelian?",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

### 9.2 Content Strategy untuk GEO
- **Konsistensi NAP:** Nama, Alamat, Phone konsisten di semua halaman + structured data
- **Entity Building:** Setiap artikel, produk, dan foto harus terasosiasi dengan entity "Mitra Telur Jogja"
- **Fresh Content:** Artikel/blog diupdate mingguan/bulanan — sinyal bagus untuk AI & Google
- **Internal Linking:** Artikel → Produk, Galeri → Artikel, Homepage → semua
- **Clear URL Structure:** `/blog/cara-menyimpan-telur-agar-segar`, `/galeri/kegiatan`, `/produk/telur-omega`
- **About Page:** Halaman khusus tentang perusahaan, sejarah, visi misi
- **Contact Page:** Halaman khusus dengan form + info lengkap + map embed

### 9.3 Meta Tag Template
```html
<title>{pageTitle} | Mitra Telur Jogja</title>
<meta name="description" content="{description}" />
<meta property="og:title" content="{pageTitle} | Mitra Telur Jogja" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{coverImage}" />
<meta property="og:url" content="https://mitratelurjogja.com{url}" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="https://mitratelurjogja.com{url}" />
```

---

## 10. Feature Roadmap (4 Minggu)

### Week 1: Foundation
- [ ] Setup repo Next.js + TypeScript + Tailwind
- [ ] Setup Sanity CMS (schema: produk, artikel, galeri, testimoni, FAQ)
- [ ] Migrasi konten existing (hero, keunggulan, testimoni, FAQ)
- [ ] Setup GitHub → Vercel deployment (branch `dev` → staging)
- [ ] Basic layout component (Navbar, Footer, Container)

### Week 2: Core Pages & Dynamic Content
- [ ] Homepage dengan section yang sudah ada (dynamic via CMS)
- [ ] Halaman Produk (listing + detail)
- [ ] Admin panel Sanity Studio (untuk edit konten)
- [ ] Structured data dasar (`LocalBusiness`, `Organization`)
- [ ] Meta tag dinamis per halaman

### Week 3: New Features
- [ ] **Jam Operasional** section + schema `openingHoursSpecification`
- [ ] **Artikel/Blog** — listing page + detail page + `Article` schema + **integrasi Claude AI untuk auto-generate artikel**
- [ ] **Galeri Foto** — upload via CMS + lightbox + `ImageObject` schema
- [ ] **Media Sosial** — link aktif + embed widget (opsional) + auto-share artikel
- [ ] **Halaman About & Contact** baru

### Week 4: SEO, GEO & Launch
- [ ] Implementasi semua Schema.org markup
- [ ] Sitemap.xml + robots.txt
- [ ] Image optimization (WebP, lazy loading, srcset)
- [ ] Google Analytics 4 + Search Console setup
- [ ] **Setup scheduler/cron job** untuk auto-publish artikel Claude AI (Senin & Kamis 09.00 WIB)
- [ ] **Setup auto-share artikel ke media sosial** (Instagram, Facebook, TikTok)
- [ ] Performance audit (Lighthouse target: 90+)
- [ ] Mobile & accessibility testing
- [ ] Deploy ke production (branch `main`)
- [ ] Submit sitemap ke Google Search Console
- [ ] Testing AI crawler (debug di Google Rich Results Test, Schema.org validator)

---

## 11. Success Metrics

### SEO Metrics
- Organic traffic naik 50% dalam 3 bulan
- 50+ keyword ranking di Google (lokal Yogyakarta)
- Sitemap ter-index 100%

### GEO / AI Metrics
- Website muncul di AI Overview Google
- Structured data valid di Rich Results Test
- Brand mention di AI engines (perlu monitoring manual/brand monitoring tool)
- Artikel ter-referensikan oleh AI (monitor via brand monitoring)

### Engagement Metrics
- Time on page > 2 menit
- Bounce rate < 50%
- Artikel view & share

### Sales Metrics
- WhatsApp click-through rate naik
- Inquiry via website meningkat
- Conversion rate (visit → WA message) > 5%

---

## 12. Risk & Mitigation

| Risk | Mitigation |
|---|---|
| Tim tidak familiar dengan Next.js | Dokumentasi + training, atau pakai Opsi B (WordPress) |
| Budget hosting | Vercel free tier untuk staging, upgrade saat traffic naik |
| Konten tidak diupdate | Training admin + dokumentasi CMS |
| Schema markup error | Testing tools: Google Rich Results Test, Schema.org validator |
| Downtime saat migration | Staging environment terlebih dahulu, blue-green deployment |

---

## 13. Approval & Next Steps

1. **Approval PRD ini** oleh stakeholder
2. **Pilih tech stack** (Next.js + Sanity / WordPress / Astro)
3. **Setup repository** dan branch `dev` untuk development
4. **Kickoff Week 1** — Foundation setup
5. **Weekly sync** untuk review progress

---

*Dokumen ini dibuat untuk: mitratelurjogja.com — Transformasi Website Statis ke Dinamis dengan fokus SEO & GEO*
