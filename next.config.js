/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    productionBrowserSourceMaps: true,
    i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
    },
    images: {
      domains: ['wordpress.babylonchain.io','babylon.draftserver.com', 'babyloncha1stg.wpengine.com', 'babylonchain.wpengine.com']
    }
  }
  
  module.exports = nextConfig
  