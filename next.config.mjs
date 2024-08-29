/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GA_KEY: process.env.GOOGLE_ANALYTICS_KEY,
    TM_KEY: process.env.GOOGLE_TAG_MANAGER_KEY,
  },
  images: {
    domains: ['nostr.build'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
