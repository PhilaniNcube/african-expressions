/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: ['hpoimipfauvvgcjqrnso.supabase.co'],
  },
};

module.exports = nextConfig;
