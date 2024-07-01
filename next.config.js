/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coach-app.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/groupImages/**',
      },
    ],
  },
};

module.exports = nextConfig;
