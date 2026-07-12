/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    // Default Next hanya WebP. Diukur pada foto galeri di lebar tampil 828px:
    // AVIF 67.491 B vs WebP 77.246 B, jadi 12,6% lebih kecil. Pada logo (grafis
    // flat) AVIF justru 288 B lebih besar, tetapi itu satu aset yang di-cache,
    // sementara foto berjumlah banyak dan berat. Browser tanpa dukungan AVIF
    // jatuh ke WebP lewat negosiasi Accept; respons membawa `Vary: Accept`.
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Default 60 detik. Homepage menarik lima query Sanity saat prerender, dan
   * build pernah gagal di sini ketika API Sanity melambat (query count(*)
   * sepele memakan 6 detik). Kegagalan itu menghentikan seluruh build, bukan
   * hanya satu halaman.
   */
  staticPageGenerationTimeout: 180,

  /**
   * www.mitratelurjogja.com -> mitratelurjogja.com (308 permanen).
   * Canonical semua halaman menunjuk apex; redirect ini mencegah www
   * melayani konten duplikat. Kondisi host=www tidak cocok saat diakses
   * lewat apex, jadi tidak ada loop.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mitratelurjogja.com" }],
        destination: "https://mitratelurjogja.com/:path*",
        permanent: true,
      },
    ];
  },

  // File statis lama disimpan di /legacy dan tidak ikut di-build.
};

export default nextConfig;
