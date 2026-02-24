/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hpoimipfauvvgcjqrnso.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
