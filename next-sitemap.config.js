/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mitratelurjogja.com",
  generateRobotsTxt: true,
  // `/icon.png` muncul di build manifest karena app/icon.png didaftarkan Next
  // sebagai rute; itu favicon, bukan halaman untuk diindeks.
  exclude: ["/studio", "/studio/*", "/icon.png"],
  // `/blog` dirender on-demand karena membaca searchParams, sehingga tidak
  // muncul di build manifest yang dipindai next-sitemap. Tambahkan manual,
  // kalau tidak halaman indeks blog tidak pernah masuk sitemap.
  additionalPaths: async (config) => [
    await config.transform(config, "/blog"),
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // Izinkan AI crawler (GEO) secara eksplisit
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "*", disallow: "/studio" },
    ],
  },
};
