/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost"],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "**.example.com",
            },
        ],
    },
    sassOptions: {
        prependData: `@use 'styles/mixins.scss' as *;`
    },
    env: {
        APP_BASE_URL: process.env.APP_BASE_URL
    },
}

module.exports = nextConfig
