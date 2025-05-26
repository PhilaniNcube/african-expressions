/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    minimumCacheTTL: 2678400, 
    domains: ['hpoimipfauvvgcjqrnso.supabase.co'],
  },
};

module.exports = nextConfig;
