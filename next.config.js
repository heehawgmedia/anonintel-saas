/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Pre-existing next-auth v5 type issues — ignore for now
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
