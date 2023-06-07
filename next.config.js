/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        // eslint-disable-next-line quotes
        prependData: `@use 'styles/mixins' as *;`
      },
    env: {
        APP_BASE_URL: process.env.APP_BASE_URL
    },
}

module.exports = nextConfig
