/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        prependData: `@use 'styles/mixins.scss' as *;`
    },
    env: {
        APP_BASE_URL: process.env.APP_BASE_URL
    },
}

module.exports = nextConfig
