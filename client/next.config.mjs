/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
