/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        optimizeCss: true, // enabling this will enable SSR for Tailwind
    }
}

module.exports = nextConfig
