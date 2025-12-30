const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  images: {
    domains: ['localhost', 'lessoncraftstudio.com'],
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

  // Redirects handled by next-intl middleware for intelligent locale detection
  // The middleware detects user's preferred language from:
  // 1. Browser Accept-Language header
  // 2. preferredLanguage cookie
  // 3. Falls back to default locale (en)
  // Note: /blog redirects are also in middleware.ts (which handles cookie-based language preference)
  async redirects() {
    return [
      // SEO FIX: Redirect old non-localized blog URLs to locale-prefixed versions
      // This catches any requests that bypass middleware (direct hits, search engine cached URLs)
      {
        source: '/blog',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/en/blog/:slug',
        permanent: true,
      },
      // SEO: Redirect English product page slugs to language-specific slugs
      // Swedish: word-search-worksheets → ordletar-arbetsblad
      {
        source: '/sv/apps/word-search-worksheets',
        destination: '/sv/apps/ordletar-arbetsblad',
        permanent: true,
      },
      // Swedish: addition-worksheets → addition-arbetsblad
      {
        source: '/sv/apps/addition-worksheets',
        destination: '/sv/apps/addition-arbetsblad',
        permanent: true,
      },
      // Swedish: alphabet-train-worksheets → alfabettag-arbetsblad
      {
        source: '/sv/apps/alphabet-train-worksheets',
        destination: '/sv/apps/alfabettag-arbetsblad',
        permanent: true,
      },
      // Swedish: coloring-worksheets → malarbilder-arbetsblad
      {
        source: '/sv/apps/coloring-worksheets',
        destination: '/sv/apps/malarbilder-arbetsblad',
        permanent: true,
      },
      // Swedish: math-worksheets → matematik-arbetsblad
      {
        source: '/sv/apps/math-worksheets',
        destination: '/sv/apps/matematik-arbetsblad',
        permanent: true,
      },
      // Add more language-specific redirects as pages are created:
      // German: word-search-worksheets → wortsuche-arbeitsblaetter
      // {
      //   source: '/de/apps/word-search-worksheets',
      //   destination: '/de/apps/wortsuche-arbeitsblaetter',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = withNextIntl(nextConfig);