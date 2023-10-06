/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['socialnetwork.gearboost.eu, localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'socialnetwork.gearboost.eu'
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
    APP_PROTOCOL: process.env.APP_PROTOCOL,
    WEBSOCKET_PROTOCOL: process.env.WEBSOCKET_PROTOCOL
  }
};

module.exports = nextConfig;
