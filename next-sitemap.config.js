/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mitratelurjogja.com",
  generateRobotsTxt: true,
  exclude: ["/studio", "/studio/*"],
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
