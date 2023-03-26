/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:['1000logos.net','imagegeneratoraiapec506b.blob.core.windows.net']
  }
}

module.exports = nextConfig
