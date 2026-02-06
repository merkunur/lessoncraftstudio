const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  // SEO FIX: Normalize all URLs to no trailing slash
  // Prevents duplicate URLs like /en/apps/addition-worksheets and /en/apps/addition-worksheets/
  trailingSlash: false,

  images: {
    domains: ['localhost', 'lessoncraftstudio.com', 'www.lessoncraftstudio.com'],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },

  // Increase file upload size limit
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // Security Headers for Production
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ];
  },

  // ALL redirects are now handled in middleware.ts for O(1) Map lookups:
  // - Blog cross-locale redirects (slug accessed under wrong language)
  // - Legacy blog slug redirects (old slug → new slug)
  // - Legacy appId redirects (e.g., /de/apps/image-addition → /de/apps/addition-arbeitsblaetter)
  // - English slug → localized slug redirects (e.g., /de/apps/addition-worksheets → /de/apps/addition-arbeitsblaetter)
  // This eliminates ~2,600 redirect patterns that were evaluated O(n) per request.
  async redirects() {
    return [];
  },
};

module.exports = withNextIntl(nextConfig);