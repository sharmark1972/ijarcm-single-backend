/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['localhost', 'ijarcm.com', 'www.ijarcm.com', 'wjiis.com', 'www.wjiis.com'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },

  experimental: {
    optimizePackageImports: ['@headlessui/react'],
  },

  compress: true,

  webpack: (config, { isServer }) => {
    config.resolve.alias['@/components/ui'] = require('path').resolve('./src/components/shared/ui');
    config.resolve.alias['@/components'] = require('path').resolve('./src/components/shared');

    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    if (!isServer) {
      config.resolve.alias.pdfjs$ = 'pdfjs-dist/legacy/build/pdf.js';
      config.resolve.alias.pdfjsWorker$ = 'pdfjs-dist/legacy/build/pdf.worker.js';
    }

    return config;
  },

  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
