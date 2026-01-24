const createNextIntlPlugin = require('next-intl/plugin');
const { generateProductPageRedirects } = require('./config/redirects.js');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  // SEO FIX: Normalize all URLs to no trailing slash
  // Prevents duplicate URLs like /en/apps/addition-worksheets and /en/apps/addition-worksheets/
  trailingSlash: false,

  images: {
    domains: ['localhost', 'lessoncraftstudio.com'],
    unoptimized: true, // Disable image optimization due to standalone mode issues
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
  // Note: /blog redirects are handled ONLY in middleware.ts for proper language detection
  //
  // DYNAMIC REDIRECTS: Product page redirects are now generated dynamically
  // from the product-page-slugs configuration instead of being hardcoded.
  // This reduces maintenance burden and ensures consistency.
  async redirects() {
    // Generate product page redirects dynamically
    const productRedirects = generateProductPageRedirects();

    return [
      // Include all dynamically generated product page redirects
      ...productRedirects,

    ];
  },
};

module.exports = withNextIntl(nextConfig);