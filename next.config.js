/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  images: {
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hpoimipfauvvgcjqrnso.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'pub-0d9e371caeac4ab2aeeba6e2f2b62d10.r2.dev',
      },
    ],
  },
};

module.exports = nextConfig;
