/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
    },
    images: {
      domains: ['babylon.draftserver.com']
    }
  }
  
  module.exports = nextConfig
  