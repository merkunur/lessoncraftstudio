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
      // Swedish: more-less-worksheets → jamforelse-arbetsblad
      {
        source: '/sv/apps/more-less-worksheets',
        destination: '/sv/apps/jamforelse-arbetsblad',
        permanent: true,
      },
      // Swedish: odd-one-out-worksheets → hitta-udda-bilden-arbetsblad
      {
        source: '/sv/apps/odd-one-out-worksheets',
        destination: '/sv/apps/hitta-udda-bilden-arbetsblad',
        permanent: true,
      },
      // Swedish: pattern-train-worksheets → monster-tag-arbetsblad
      {
        source: '/sv/apps/pattern-train-worksheets',
        destination: '/sv/apps/monster-tag-arbetsblad',
        permanent: true,
      },
      // Swedish: pattern-worksheets → monster-arbetsblad
      {
        source: '/sv/apps/pattern-worksheets',
        destination: '/sv/apps/monster-arbetsblad',
        permanent: true,
      },
      // Swedish: picture-path-worksheets → bildlabyrint-arbetsblad
      {
        source: '/sv/apps/picture-path-worksheets',
        destination: '/sv/apps/bildlabyrint-arbetsblad',
        permanent: true,
      },
      // Swedish: picture-sort-worksheets → bildsortering-arbetsblad
      {
        source: '/sv/apps/picture-sort-worksheets',
        destination: '/sv/apps/bildsortering-arbetsblad',
        permanent: true,
      },
      // Swedish: prepositions-worksheets → prepositioner-arbetsblad
      {
        source: '/sv/apps/prepositions-worksheets',
        destination: '/sv/apps/prepositioner-arbetsblad',
        permanent: true,
      },
      // Swedish: shadow-match-worksheets → skuggmatchning-arbetsblad
      {
        source: '/sv/apps/shadow-match-worksheets',
        destination: '/sv/apps/skuggmatchning-arbetsblad',
        permanent: true,
      },
      // Swedish: subtraction-worksheets → subtraktion-arbetsblad
      {
        source: '/sv/apps/subtraction-worksheets',
        destination: '/sv/apps/subtraktion-arbetsblad',
        permanent: true,
      },
      // Swedish: treasure-hunt-worksheets → skattjakt-arbetsblad
      {
        source: '/sv/apps/treasure-hunt-worksheets',
        destination: '/sv/apps/skattjakt-arbetsblad',
        permanent: true,
      },
      // Swedish: word-guess-worksheets → gissa-ordet-arbetsblad
      {
        source: '/sv/apps/word-guess-worksheets',
        destination: '/sv/apps/gissa-ordet-arbetsblad',
        permanent: true,
      },
      // Swedish: writing-worksheets → skrivovningar-arbetsblad
      {
        source: '/sv/apps/writing-worksheets',
        destination: '/sv/apps/skrivovningar-arbetsblad',
        permanent: true,
      },
      // German: coloring-worksheets → malvorlagen-arbeitsblaetter
      {
        source: '/de/apps/coloring-worksheets',
        destination: '/de/apps/malvorlagen-arbeitsblaetter',
        permanent: true,
      },
      // German: math-worksheets → mathe-arbeitsblaetter
      {
        source: '/de/apps/math-worksheets',
        destination: '/de/apps/mathe-arbeitsblaetter',
        permanent: true,
      },
      // German: word-scramble-worksheets → buchstabensalat-arbeitsblaetter
      {
        source: '/de/apps/word-scramble-worksheets',
        destination: '/de/apps/buchstabensalat-arbeitsblaetter',
        permanent: true,
      },
      // German: find-and-count-worksheets → suchen-und-zaehlen-arbeitsblaetter
      {
        source: '/de/apps/find-and-count-worksheets',
        destination: '/de/apps/suchen-und-zaehlen-arbeitsblaetter',
        permanent: true,
      },
      // German: picture-bingo-worksheets → bilder-bingo-arbeitsblaetter
      {
        source: '/de/apps/picture-bingo-worksheets',
        destination: '/de/apps/bilder-bingo-arbeitsblaetter',
        permanent: true,
      },
      // German: sudoku-worksheets → kinder-sudoku-arbeitsblaetter
      {
        source: '/de/apps/sudoku-worksheets',
        destination: '/de/apps/kinder-sudoku-arbeitsblaetter',
        permanent: true,
      },
      // German: big-small-worksheets → gross-klein-arbeitsblaetter
      {
        source: '/de/apps/big-small-worksheets',
        destination: '/de/apps/gross-klein-arbeitsblaetter',
        permanent: true,
      },
      // German: chart-count-worksheets → bilddiagramm-arbeitsblaetter
      {
        source: '/de/apps/chart-count-worksheets',
        destination: '/de/apps/bilddiagramm-arbeitsblaetter',
        permanent: true,
      },
      // German: code-addition-worksheets → bilder-additions-arbeitsblaetter
      {
        source: '/de/apps/code-addition-worksheets',
        destination: '/de/apps/bilder-additions-arbeitsblaetter',
        permanent: true,
      },
      // German: draw-and-color-worksheets → rasterzeichnen-arbeitsblaetter
      {
        source: '/de/apps/draw-and-color-worksheets',
        destination: '/de/apps/rasterzeichnen-arbeitsblaetter',
        permanent: true,
      },
      // German: grid-match-worksheets → raster-puzzle-arbeitsblaetter
      {
        source: '/de/apps/grid-match-worksheets',
        destination: '/de/apps/raster-puzzle-arbeitsblaetter',
        permanent: true,
      },
      // German: crossword-worksheets → bilderkreuzwortraetsel-arbeitsblaetter
      {
        source: '/de/apps/crossword-worksheets',
        destination: '/de/apps/bilderkreuzwortraetsel-arbeitsblaetter',
        permanent: true,
      },
      // German: math-puzzle-worksheets → mathe-raetsel-arbeitsblaetter
      {
        source: '/de/apps/math-puzzle-worksheets',
        destination: '/de/apps/mathe-raetsel-arbeitsblaetter',
        permanent: true,
      },
      // German: missing-pieces-worksheets → fehlende-puzzleteile-arbeitsblaetter
      {
        source: '/de/apps/missing-pieces-worksheets',
        destination: '/de/apps/fehlende-puzzleteile-arbeitsblaetter',
        permanent: true,
      },
      // German: more-less-worksheets → mehr-weniger-arbeitsblaetter
      {
        source: '/de/apps/more-less-worksheets',
        destination: '/de/apps/mehr-weniger-arbeitsblaetter',
        permanent: true,
      },
      // German: odd-one-out-worksheets → was-passt-nicht-arbeitsblaetter
      {
        source: '/de/apps/odd-one-out-worksheets',
        destination: '/de/apps/was-passt-nicht-arbeitsblaetter',
        permanent: true,
      },
      // German: pattern-train-worksheets → muster-zug-arbeitsblaetter
      {
        source: '/de/apps/pattern-train-worksheets',
        destination: '/de/apps/muster-zug-arbeitsblaetter',
        permanent: true,
      },
      // German: pattern-worksheets → muster-arbeitsblatt-arbeitsblaetter
      {
        source: '/de/apps/pattern-worksheets',
        destination: '/de/apps/muster-arbeitsblatt-arbeitsblaetter',
        permanent: true,
      },
      // German: picture-path-worksheets → bilderpfad-arbeitsblaetter
      {
        source: '/de/apps/picture-path-worksheets',
        destination: '/de/apps/bilderpfad-arbeitsblaetter',
        permanent: true,
      },
      // German: picture-sort-worksheets → bilder-sortieren-arbeitsblaetter
      {
        source: '/de/apps/picture-sort-worksheets',
        destination: '/de/apps/bilder-sortieren-arbeitsblaetter',
        permanent: true,
      },
      // German: prepositions-worksheets → praepositionen-arbeitsblaetter
      {
        source: '/de/apps/prepositions-worksheets',
        destination: '/de/apps/praepositionen-arbeitsblaetter',
        permanent: true,
      },
      // German: shadow-match-worksheets → schattenbilder-zuordnen-arbeitsblaetter
      {
        source: '/de/apps/shadow-match-worksheets',
        destination: '/de/apps/schattenbilder-zuordnen-arbeitsblaetter',
        permanent: true,
      },
      // German: subtraction-worksheets → subtraktion-arbeitsblaetter
      {
        source: '/de/apps/subtraction-worksheets',
        destination: '/de/apps/subtraktion-arbeitsblaetter',
        permanent: true,
      },
      // German: treasure-hunt-worksheets → schatzsuche-arbeitsblaetter
      {
        source: '/de/apps/treasure-hunt-worksheets',
        destination: '/de/apps/schatzsuche-arbeitsblaetter',
        permanent: true,
      },
      // German: word-guess-worksheets → woerter-raten-arbeitsblaetter
      {
        source: '/de/apps/word-guess-worksheets',
        destination: '/de/apps/woerter-raten-arbeitsblaetter',
        permanent: true,
      },
      // German: writing-worksheets → schreibuebungen-arbeitsblaetter
      {
        source: '/de/apps/writing-worksheets',
        destination: '/de/apps/schreibuebungen-arbeitsblaetter',
        permanent: true,
      },
      // French: word-search-worksheets → mots-caches-fiches
      {
        source: '/fr/apps/word-search-worksheets',
        destination: '/fr/apps/mots-caches-fiches',
        permanent: true,
      },
      // French: addition-worksheets → addition-fiches
      {
        source: '/fr/apps/addition-worksheets',
        destination: '/fr/apps/addition-fiches',
        permanent: true,
      },
      // French: alphabet-train-worksheets → train-alphabet-fiches
      {
        source: '/fr/apps/alphabet-train-worksheets',
        destination: '/fr/apps/train-alphabet-fiches',
        permanent: true,
      },
      // French: coloring-worksheets → coloriage-fiches
      {
        source: '/fr/apps/coloring-worksheets',
        destination: '/fr/apps/coloriage-fiches',
        permanent: true,
      },
      // French: math-puzzle-worksheets → puzzle-maths-fiches
      {
        source: '/fr/apps/math-puzzle-worksheets',
        destination: '/fr/apps/puzzle-maths-fiches',
        permanent: true,
      },
      // French: math-worksheets → exercices-maths-fiches
      {
        source: '/fr/apps/math-worksheets',
        destination: '/fr/apps/exercices-maths-fiches',
        permanent: true,
      },
      // French: find-and-count-worksheets → cherche-et-compte-fiches
      {
        source: '/fr/apps/find-and-count-worksheets',
        destination: '/fr/apps/cherche-et-compte-fiches',
        permanent: true,
      },
      // French: word-scramble-worksheets → mots-melanges-fiches
      {
        source: '/fr/apps/word-scramble-worksheets',
        destination: '/fr/apps/mots-melanges-fiches',
        permanent: true,
      },
      // French: matching-worksheets → association-fiches
      {
        source: '/fr/apps/matching-worksheets',
        destination: '/fr/apps/association-fiches',
        permanent: true,
      },
      // French: drawing-lines-worksheets → graphisme-fiches
      {
        source: '/fr/apps/drawing-lines-worksheets',
        destination: '/fr/apps/graphisme-fiches',
        permanent: true,
      },
      // French: picture-bingo-worksheets → bingo-images-fiches
      {
        source: '/fr/apps/picture-bingo-worksheets',
        destination: '/fr/apps/bingo-images-fiches',
        permanent: true,
      },
      // French: big-small-worksheets → grand-petit-fiches
      {
        source: '/fr/apps/big-small-worksheets',
        destination: '/fr/apps/grand-petit-fiches',
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