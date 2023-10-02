/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vm687554.vps.masterhost.tech, localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vm687554.vps.masterhost.tech'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  },
  sassOptions: {
    prependData: `@use 'styles/mixins.scss' as *;`
  },
  env: {
    APP_BASE_URL: process.env.APP_BASE_URL,
    APP_PROTOCOL: process.env.APP_PROTOCOL
  }
};

module.exports = nextConfig;
