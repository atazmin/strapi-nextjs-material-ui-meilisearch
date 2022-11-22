/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, //React StrictMode renders components twice on dev server
  swcMinify: true,
  optimizeFonts: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    minimumCacheTTL: 1500000,
  },
  experimental: {
    fontLoaders: [{ loader: "@next/font/google" }],
  },
};

module.exports = nextConfig;
