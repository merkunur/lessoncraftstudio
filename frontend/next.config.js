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
      // Swedish: word-scramble-worksheets → ordpussel-arbetsblad
      {
        source: '/sv/apps/word-scramble-worksheets',
        destination: '/sv/apps/ordpussel-arbetsblad',
        permanent: true,
      },
      // Swedish: find-and-count-worksheets → hitta-och-rakna-arbetsblad
      {
        source: '/sv/apps/find-and-count-worksheets',
        destination: '/sv/apps/hitta-och-rakna-arbetsblad',
        permanent: true,
      },
      // Swedish: matching-worksheets → matchnings-arbetsblad
      {
        source: '/sv/apps/matching-worksheets',
        destination: '/sv/apps/matchnings-arbetsblad',
        permanent: true,
      },
      // Swedish: drawing-lines-worksheets → rita-linjer-arbetsblad
      {
        source: '/sv/apps/drawing-lines-worksheets',
        destination: '/sv/apps/rita-linjer-arbetsblad',
        permanent: true,
      },
      // Swedish: picture-bingo-worksheets → bildlotto-arbetsblad
      {
        source: '/sv/apps/picture-bingo-worksheets',
        destination: '/sv/apps/bildlotto-arbetsblad',
        permanent: true,
      },
      // Swedish: sudoku-worksheets → bildsudoku-arbetsblad
      {
        source: '/sv/apps/sudoku-worksheets',
        destination: '/sv/apps/bildsudoku-arbetsblad',
        permanent: true,
      },
      // Swedish: big-small-worksheets → stort-litet-arbetsblad
      {
        source: '/sv/apps/big-small-worksheets',
        destination: '/sv/apps/stort-litet-arbetsblad',
        permanent: true,
      },
      // Swedish: chart-count-worksheets → diagram-rakning-arbetsblad
      {
        source: '/sv/apps/chart-count-worksheets',
        destination: '/sv/apps/diagram-rakning-arbetsblad',
        permanent: true,
      },
      // Swedish: code-addition-worksheets → kodaddition-arbetsblad
      {
        source: '/sv/apps/code-addition-worksheets',
        destination: '/sv/apps/kodaddition-arbetsblad',
        permanent: true,
      },
      // Swedish: draw-and-color-worksheets → rutritning-arbetsblad
      {
        source: '/sv/apps/draw-and-color-worksheets',
        destination: '/sv/apps/rutritning-arbetsblad',
        permanent: true,
      },
      // Swedish: find-objects-worksheets → hitta-foremal-arbetsblad
      {
        source: '/sv/apps/find-objects-worksheets',
        destination: '/sv/apps/hitta-foremal-arbetsblad',
        permanent: true,
      },
      // Swedish: grid-match-worksheets → rutnatsmatching-arbetsblad
      {
        source: '/sv/apps/grid-match-worksheets',
        destination: '/sv/apps/rutnatsmatching-arbetsblad',
        permanent: true,
      },
      // Swedish: crossword-worksheets → bildkorsord-arbetsblad
      {
        source: '/sv/apps/crossword-worksheets',
        destination: '/sv/apps/bildkorsord-arbetsblad',
        permanent: true,
      },
      // Swedish: cryptogram-worksheets → bildkryptogram-arbetsblad
      {
        source: '/sv/apps/cryptogram-worksheets',
        destination: '/sv/apps/bildkryptogram-arbetsblad',
        permanent: true,
      },
      // Swedish: math-puzzle-worksheets → mattepussel-arbetsblad
      {
        source: '/sv/apps/math-puzzle-worksheets',
        destination: '/sv/apps/mattepussel-arbetsblad',
        permanent: true,
      },
      // Swedish: missing-pieces-worksheets → saknade-bitar-arbetsblad
      {
        source: '/sv/apps/missing-pieces-worksheets',
        destination: '/sv/apps/saknade-bitar-arbetsblad',
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