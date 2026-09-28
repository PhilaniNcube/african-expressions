/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  cacheLife: {
    // Public content that changes rarely. Admin writes invalidate the relevant
    // tags immediately, so these values are only the background refresh window.
    content: {
      stale: 60 * 60 * 24, // 1 day
      revalidate: 60 * 60 * 24 * 7, // 1 week
      expire: 60 * 60 * 24 * 30, // 30 days
    },
  },
  serverExternalPackages: ['better-auth', '@libsql/client'],
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb',
    },
  },
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
