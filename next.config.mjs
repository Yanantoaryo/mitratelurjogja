/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // File statis lama disimpan di /legacy dan tidak ikut di-build.
};

export default nextConfig;
