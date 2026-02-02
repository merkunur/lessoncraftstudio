const createNextIntlPlugin = require('next-intl/plugin');
const { generateProductPageRedirects, generateLegacyAppIdRedirects } = require('./config/redirects.js');
const { generateBlogRedirects } = require('./config/blog-redirects.js');

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
  //
  // LEGACY REDIRECTS (SEO Recovery - Jan 2026):
  // Redirects from legacy appId URLs (e.g., /en/apps/image-addition) to
  // SEO-optimized slugs (e.g., /en/apps/addition-worksheets) to recover
  // from impressions drop caused by noindex signals on legacy URLs.
  //
  // BLOG REDIRECTS (SEO Recovery - Feb 2026):
  // Redirects from old blog slugs (based on HTML filenames) to new SEO slugs
  // (longer, more descriptive). This prevents 404 errors for Google-indexed URLs.
  async redirects() {
    // Generate product page redirects dynamically
    const productRedirects = generateProductPageRedirects();
    // Generate legacy appId redirects for SEO recovery
    const legacyRedirects = generateLegacyAppIdRedirects();
    // Generate blog redirects:
    // 1. Legacy: old slugs -> new SEO slugs (same locale)
    // 2. Cross-locale: wrong locale -> correct locale (same slug)
    const blogRedirects = generateBlogRedirects();

    return [
      // Include all dynamically generated product page redirects
      ...productRedirects,
      // Include legacy appId -> SEO slug redirects (SEO recovery)
      ...legacyRedirects,
      // Include blog redirects (legacy + cross-locale)
      ...blogRedirects,
    ];
  },
};

module.exports = withNextIntl(nextConfig);