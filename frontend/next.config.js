const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  // Run ESLint only on source directories — NOT on public/ which contains
  // symlinks to /var/www/lcs-media (worksheet-generators, admin) with large HTML files
  eslint: {
    dirs: ['app', 'components', 'lib', 'config', 'i18n', 'hooks', 'types', 'utils'],
  },

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

  // Most redirects are handled in middleware.ts for O(1) Map lookups. BUT
  // middleware is excluded from /worksheet-generators/* (static-file path),
  // so redirects here cover that subtree exclusively.
  //
  // Why these redirects exist: the 22 worksheet-generator HTML files live
  // on a protected isolated storage with literal spaces in their names
  // (e.g. `word guess.html`). Internal links now emit hyphenated URLs
  // (cleaner for SEO and external backlinks); 301s below rewrite the
  // clean URL to the actual filesystem path so the static file still
  // serves. The spaced URLs continue to work too (no file rename).
  async redirects() {
    const generatorRenames = [
      ['alphabet-train', 'alphabet train'],
      ['big-small', 'big small'],
      ['chart-count', 'chart count'],
      ['code-addition', 'code addition'],
      ['draw-and-color', 'draw and color'],
      ['drawing-lines', 'drawing lines'],
      ['find-and-count', 'find and count'],
      ['find-objects', 'find objects'],
      ['grid-match', 'grid match'],
      ['math-puzzle', 'math puzzle'],
      ['math-worksheet', 'math worksheet'],
      ['memory-game', 'memory game'],
      ['missing-pieces', 'missing pieces'],
      ['more-less', 'more less'],
      ['odd-one-out', 'odd one out'],
      ['pattern-complete', 'pattern complete'],
      ['pattern-train', 'pattern train'],
      ['pattern-worksheet', 'pattern worksheet'],
      ['picture-path', 'picture path'],
      ['picture-sort', 'picture sort'],
      ['same-different', 'same different'],
      ['shadow-match', 'shadow match'],
      ['treasure-hunt', 'treasure hunt'],
      ['word-guess', 'word guess'],
      ['word-scramble', 'word scramble'],
    ];
    return generatorRenames.map(([hyphen, spaced]) => ({
      source: `/worksheet-generators/${hyphen}.html`,
      destination: `/worksheet-generators/${spaced}.html`,
      permanent: true,
    }));
  },
};

module.exports = withNextIntl(nextConfig);