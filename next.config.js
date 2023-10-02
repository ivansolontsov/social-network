/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['socialnetwork.gearboost.eu, localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'socialnetwork.gearboost.eu'
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
