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
  // Note: /blog redirects are handled ONLY in middleware.ts for proper language detection
  async redirects() {
    return [
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
      // French: chart-count-worksheets → graphique-images-fiches
      {
        source: '/fr/apps/chart-count-worksheets',
        destination: '/fr/apps/graphique-images-fiches',
        permanent: true,
      },
      // French: code-addition-worksheets → addition-codee-fiches
      {
        source: '/fr/apps/code-addition-worksheets',
        destination: '/fr/apps/addition-codee-fiches',
        permanent: true,
      },
      // French: draw-and-color-worksheets → dessin-quadrillage-fiches
      {
        source: '/fr/apps/draw-and-color-worksheets',
        destination: '/fr/apps/dessin-quadrillage-fiches',
        permanent: true,
      },
      // French: find-objects-worksheets → cherche-objets-fiches
      {
        source: '/fr/apps/find-objects-worksheets',
        destination: '/fr/apps/cherche-objets-fiches',
        permanent: true,
      },
      // French: grid-match-worksheets → puzzle-grille-fiches
      {
        source: '/fr/apps/grid-match-worksheets',
        destination: '/fr/apps/puzzle-grille-fiches',
        permanent: true,
      },
      // French: crossword-worksheets → mots-croises-images-fiches
      {
        source: '/fr/apps/crossword-worksheets',
        destination: '/fr/apps/mots-croises-images-fiches',
        permanent: true,
      },
      // French: cryptogram-worksheets → cryptogramme-images-fiches
      {
        source: '/fr/apps/cryptogram-worksheets',
        destination: '/fr/apps/cryptogramme-images-fiches',
        permanent: true,
      },
      // French: missing-pieces-worksheets → pieces-manquantes-fiches
      {
        source: '/fr/apps/missing-pieces-worksheets',
        destination: '/fr/apps/pieces-manquantes-fiches',
        permanent: true,
      },
      // French: odd-one-out-worksheets → intrus-fiches
      {
        source: '/fr/apps/odd-one-out-worksheets',
        destination: '/fr/apps/intrus-fiches',
        permanent: true,
      },
      // French: pattern-train-worksheets → train-suites-logiques-fiches
      {
        source: '/fr/apps/pattern-train-worksheets',
        destination: '/fr/apps/train-suites-logiques-fiches',
        permanent: true,
      },
      // French: picture-path-worksheets → parcours-images-fiches
      {
        source: '/fr/apps/picture-path-worksheets',
        destination: '/fr/apps/parcours-images-fiches',
        permanent: true,
      },
      // French: prepositions-worksheets → prepositions-exercices-fiches
      {
        source: '/fr/apps/prepositions-worksheets',
        destination: '/fr/apps/prepositions-exercices-fiches',
        permanent: true,
      },
      // French: shadow-match-worksheets → discrimination-visuelle-fiches
      {
        source: '/fr/apps/shadow-match-worksheets',
        destination: '/fr/apps/discrimination-visuelle-fiches',
        permanent: true,
      },
      // French: subtraction-worksheets → soustraction-fiches
      {
        source: '/fr/apps/subtraction-worksheets',
        destination: '/fr/apps/soustraction-fiches',
        permanent: true,
      },
      // French: treasure-hunt-worksheets → chasse-au-tresor-fiches
      {
        source: '/fr/apps/treasure-hunt-worksheets',
        destination: '/fr/apps/chasse-au-tresor-fiches',
        permanent: true,
      },
      // French: word-guess-worksheets → deviner-mots-fiches
      {
        source: '/fr/apps/word-guess-worksheets',
        destination: '/fr/apps/deviner-mots-fiches',
        permanent: true,
      },
      // French: writing-worksheets → ecriture-fiches
      {
        source: '/fr/apps/writing-worksheets',
        destination: '/fr/apps/ecriture-fiches',
        permanent: true,
      },
      // Spanish: addition-worksheets → suma-fichas
      {
        source: '/es/apps/addition-worksheets',
        destination: '/es/apps/suma-fichas',
        permanent: true,
      },
      // Spanish: coloring-worksheets → dibujos-colorear-fichas
      {
        source: '/es/apps/coloring-worksheets',
        destination: '/es/apps/dibujos-colorear-fichas',
        permanent: true,
      },
      // Spanish: math-worksheets → acertijos-matematicos-fichas
      {
        source: '/es/apps/math-worksheets',
        destination: '/es/apps/acertijos-matematicos-fichas',
        permanent: true,
      },
      // Spanish: word-scramble-worksheets → letras-revueltas-fichas
      {
        source: '/es/apps/word-scramble-worksheets',
        destination: '/es/apps/letras-revueltas-fichas',
        permanent: true,
      },
      // Spanish: find-and-count-worksheets → buscar-contar-fichas
      {
        source: '/es/apps/find-and-count-worksheets',
        destination: '/es/apps/buscar-contar-fichas',
        permanent: true,
      },
      // Spanish: matching-worksheets → relacionar-fichas
      {
        source: '/es/apps/matching-worksheets',
        destination: '/es/apps/relacionar-fichas',
        permanent: true,
      },
      // Spanish: drawing-lines-worksheets → grafomotricidad-fichas
      {
        source: '/es/apps/drawing-lines-worksheets',
        destination: '/es/apps/grafomotricidad-fichas',
        permanent: true,
      },
      // Spanish: picture-bingo-worksheets → bingo-fichas
      {
        source: '/es/apps/picture-bingo-worksheets',
        destination: '/es/apps/bingo-fichas',
        permanent: true,
      },
      // Spanish: sudoku-worksheets → sudoku-fichas-ninos
      {
        source: '/es/apps/sudoku-worksheets',
        destination: '/es/apps/sudoku-fichas-ninos',
        permanent: true,
      },
      // Spanish: big-small-worksheets → grande-pequeno-fichas
      {
        source: '/es/apps/big-small-worksheets',
        destination: '/es/apps/grande-pequeno-fichas',
        permanent: true,
      },
      // Spanish: chart-count-worksheets → graficos-conteo-fichas
      {
        source: '/es/apps/chart-count-worksheets',
        destination: '/es/apps/graficos-conteo-fichas',
        permanent: true,
      },
      // Spanish: code-addition-worksheets → suma-codigo-fichas
      {
        source: '/es/apps/code-addition-worksheets',
        destination: '/es/apps/suma-codigo-fichas',
        permanent: true,
      },
      // Spanish: draw-and-color-worksheets → dibujo-cuadricula-fichas
      {
        source: '/es/apps/draw-and-color-worksheets',
        destination: '/es/apps/dibujo-cuadricula-fichas',
        permanent: true,
      },
      // Spanish: find-objects-worksheets → buscar-objetos-fichas
      {
        source: '/es/apps/find-objects-worksheets',
        destination: '/es/apps/buscar-objetos-fichas',
        permanent: true,
      },
      // Spanish: grid-match-worksheets → rompecabezas-cuadricula-fichas
      {
        source: '/es/apps/grid-match-worksheets',
        destination: '/es/apps/rompecabezas-cuadricula-fichas',
        permanent: true,
      },
      // Spanish: crossword-worksheets → crucigramas-imagenes-fichas
      {
        source: '/es/apps/crossword-worksheets',
        destination: '/es/apps/crucigramas-imagenes-fichas',
        permanent: true,
      },
      // Spanish: cryptogram-worksheets → criptogramas-imagenes-fichas
      {
        source: '/es/apps/cryptogram-worksheets',
        destination: '/es/apps/criptogramas-imagenes-fichas',
        permanent: true,
      },
      // Spanish: math-puzzle-worksheets → rompecabezas-matematicos-fichas
      {
        source: '/es/apps/math-puzzle-worksheets',
        destination: '/es/apps/rompecabezas-matematicos-fichas',
        permanent: true,
      },
      // Spanish: missing-pieces-worksheets → piezas-faltantes-fichas
      {
        source: '/es/apps/missing-pieces-worksheets',
        destination: '/es/apps/piezas-faltantes-fichas',
        permanent: true,
      },
      // Spanish: more-less-worksheets → mayor-menor-fichas
      {
        source: '/es/apps/more-less-worksheets',
        destination: '/es/apps/mayor-menor-fichas',
        permanent: true,
      },
      // Spanish: odd-one-out-worksheets → encuentra-el-diferente-fichas
      {
        source: '/es/apps/odd-one-out-worksheets',
        destination: '/es/apps/encuentra-el-diferente-fichas',
        permanent: true,
      },
      // Spanish: pattern-train-worksheets → tren-patrones-fichas
      {
        source: '/es/apps/pattern-train-worksheets',
        destination: '/es/apps/tren-patrones-fichas',
        permanent: true,
      },
      // Spanish: pattern-worksheets → fichas-patrones
      {
        source: '/es/apps/pattern-worksheets',
        destination: '/es/apps/fichas-patrones',
        permanent: true,
      },
      // Spanish: picture-sort-worksheets → clasificar-imagenes-fichas
      {
        source: '/es/apps/picture-sort-worksheets',
        destination: '/es/apps/clasificar-imagenes-fichas',
        permanent: true,
      },
      // Spanish: prepositions-worksheets → preposiciones-fichas
      {
        source: '/es/apps/prepositions-worksheets',
        destination: '/es/apps/preposiciones-fichas',
        permanent: true,
      },
      // Spanish: shadow-match-worksheets → asociacion-sombras-fichas
      {
        source: '/es/apps/shadow-match-worksheets',
        destination: '/es/apps/asociacion-sombras-fichas',
        permanent: true,
      },
      // Spanish: subtraction-worksheets → resta-fichas
      {
        source: '/es/apps/subtraction-worksheets',
        destination: '/es/apps/resta-fichas',
        permanent: true,
      },
      // Spanish: treasure-hunt-worksheets → busqueda-tesoro-fichas
      {
        source: '/es/apps/treasure-hunt-worksheets',
        destination: '/es/apps/busqueda-tesoro-fichas',
        permanent: true,
      },
      // Spanish: word-guess-worksheets → adivinar-palabras-fichas
      {
        source: '/es/apps/word-guess-worksheets',
        destination: '/es/apps/adivinar-palabras-fichas',
        permanent: true,
      },
      // Spanish: writing-worksheets → lectoescritura-fichas
      {
        source: '/es/apps/writing-worksheets',
        destination: '/es/apps/lectoescritura-fichas',
        permanent: true,
      },
      // Italian: word-search-worksheets → cerca-parole-schede
      {
        source: '/it/apps/word-search-worksheets',
        destination: '/it/apps/cerca-parole-schede',
        permanent: true,
      },
      // Italian: addition-worksheets → addizione-schede
      {
        source: '/it/apps/addition-worksheets',
        destination: '/it/apps/addizione-schede',
        permanent: true,
      },
      // Italian: alphabet-train-worksheets → treno-alfabeto-schede
      {
        source: '/it/apps/alphabet-train-worksheets',
        destination: '/it/apps/treno-alfabeto-schede',
        permanent: true,
      },
      // Italian: math-worksheets → matematica-schede
      {
        source: '/it/apps/math-worksheets',
        destination: '/it/apps/matematica-schede',
        permanent: true,
      },
      // Italian: word-scramble-worksheets → anagrammi-schede
      {
        source: '/it/apps/word-scramble-worksheets',
        destination: '/it/apps/anagrammi-schede',
        permanent: true,
      },
      // Italian: find-and-count-worksheets → trova-e-conta-schede
      {
        source: '/it/apps/find-and-count-worksheets',
        destination: '/it/apps/trova-e-conta-schede',
        permanent: true,
      },
      // Italian: matching-worksheets → abbinamenti-schede
      {
        source: '/it/apps/matching-worksheets',
        destination: '/it/apps/abbinamenti-schede',
        permanent: true,
      },
      // Italian: drawing-lines-worksheets → pregrafismo-schede
      {
        source: '/it/apps/drawing-lines-worksheets',
        destination: '/it/apps/pregrafismo-schede',
        permanent: true,
      },
      // Italian: picture-bingo-worksheets → bingo-immagini-schede
      {
        source: '/it/apps/picture-bingo-worksheets',
        destination: '/it/apps/bingo-immagini-schede',
        permanent: true,
      },
      // Italian: big-small-worksheets → grande-piccolo-schede
      {
        source: '/it/apps/big-small-worksheets',
        destination: '/it/apps/grande-piccolo-schede',
        permanent: true,
      },
      // Italian: chart-count-worksheets → grafici-immagini-schede
      {
        source: '/it/apps/chart-count-worksheets',
        destination: '/it/apps/grafici-immagini-schede',
        permanent: true,
      },
      // Italian: code-addition-worksheets → addizioni-immagini-schede
      {
        source: '/it/apps/code-addition-worksheets',
        destination: '/it/apps/addizioni-immagini-schede',
        permanent: true,
      },
      // Italian: draw-and-color-worksheets → disegno-griglia-schede
      {
        source: '/it/apps/draw-and-color-worksheets',
        destination: '/it/apps/disegno-griglia-schede',
        permanent: true,
      },
      // Italian: find-objects-worksheets → trova-oggetti-schede
      {
        source: '/it/apps/find-objects-worksheets',
        destination: '/it/apps/trova-oggetti-schede',
        permanent: true,
      },
      // Italian: grid-match-worksheets → griglia-abbinamento-schede
      {
        source: '/it/apps/grid-match-worksheets',
        destination: '/it/apps/griglia-abbinamento-schede',
        permanent: true,
      },
      // Italian: cryptogram-worksheets → crittogramma-schede
      {
        source: '/it/apps/cryptogram-worksheets',
        destination: '/it/apps/crittogramma-schede',
        permanent: true,
      },
      // Italian: math-puzzle-worksheets → puzzle-matematici-schede
      {
        source: '/it/apps/math-puzzle-worksheets',
        destination: '/it/apps/puzzle-matematici-schede',
        permanent: true,
      },
      // Italian: missing-pieces-worksheets → pezzi-mancanti-schede
      {
        source: '/it/apps/missing-pieces-worksheets',
        destination: '/it/apps/pezzi-mancanti-schede',
        permanent: true,
      },
      // Italian: odd-one-out-worksheets → trova-intruso-schede
      {
        source: '/it/apps/odd-one-out-worksheets',
        destination: '/it/apps/trova-intruso-schede',
        permanent: true,
      },
      // Italian: pattern-train-worksheets → treno-sequenze-schede
      {
        source: '/it/apps/pattern-train-worksheets',
        destination: '/it/apps/treno-sequenze-schede',
        permanent: true,
      },
      // Italian: pattern-worksheets → schede-pattern
      {
        source: '/it/apps/pattern-worksheets',
        destination: '/it/apps/schede-pattern',
        permanent: true,
      },
      // Italian: picture-path-worksheets → percorso-illustrato-schede
      {
        source: '/it/apps/picture-path-worksheets',
        destination: '/it/apps/percorso-illustrato-schede',
        permanent: true,
      },
      // Italian: picture-sort-worksheets → classificazione-immagini-schede
      {
        source: '/it/apps/picture-sort-worksheets',
        destination: '/it/apps/classificazione-immagini-schede',
        permanent: true,
      },
      // Italian: prepositions-worksheets → preposizioni-schede
      {
        source: '/it/apps/prepositions-worksheets',
        destination: '/it/apps/preposizioni-schede',
        permanent: true,
      },
      // Italian: shadow-match-worksheets → abbinamento-ombre-schede
      {
        source: '/it/apps/shadow-match-worksheets',
        destination: '/it/apps/abbinamento-ombre-schede',
        permanent: true,
      },
      // Italian: subtraction-worksheets → sottrazione-schede
      {
        source: '/it/apps/subtraction-worksheets',
        destination: '/it/apps/sottrazione-schede',
        permanent: true,
      },
      // Italian: treasure-hunt-worksheets → caccia-tesoro-schede
      {
        source: '/it/apps/treasure-hunt-worksheets',
        destination: '/it/apps/caccia-tesoro-schede',
        permanent: true,
      },
      // Italian: word-guess-worksheets → indovina-parole-schede
      {
        source: '/it/apps/word-guess-worksheets',
        destination: '/it/apps/indovina-parole-schede',
        permanent: true,
      },
      // Italian: writing-worksheets → scrittura-schede
      {
        source: '/it/apps/writing-worksheets',
        destination: '/it/apps/scrittura-schede',
        permanent: true,
      },
      // Portuguese (Brazilian): word-search-worksheets → caca-palavras-fichas
      {
        source: '/pt/apps/word-search-worksheets',
        destination: '/pt/apps/caca-palavras-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): addition-worksheets → adicao-fichas
      {
        source: '/pt/apps/addition-worksheets',
        destination: '/pt/apps/adicao-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): alphabet-train-worksheets → trem-alfabeto-fichas
      {
        source: '/pt/apps/alphabet-train-worksheets',
        destination: '/pt/apps/trem-alfabeto-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): coloring-worksheets → desenhos-colorir-fichas
      {
        source: '/pt/apps/coloring-worksheets',
        destination: '/pt/apps/desenhos-colorir-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): math-worksheets → atividades-matematica-fichas
      {
        source: '/pt/apps/math-worksheets',
        destination: '/pt/apps/atividades-matematica-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): word-scramble-worksheets → palavras-embaralhadas-fichas
      {
        source: '/pt/apps/word-scramble-worksheets',
        destination: '/pt/apps/palavras-embaralhadas-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): find-and-count-worksheets → encontre-conte-fichas
      {
        source: '/pt/apps/find-and-count-worksheets',
        destination: '/pt/apps/encontre-conte-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): drawing-lines-worksheets → tracar-linhas-fichas
      {
        source: '/pt/apps/drawing-lines-worksheets',
        destination: '/pt/apps/tracar-linhas-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): picture-bingo-worksheets → bingo-ilustrado-fichas
      {
        source: '/pt/apps/picture-bingo-worksheets',
        destination: '/pt/apps/bingo-ilustrado-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): sudoku-worksheets → sudoku-criancas-fichas
      {
        source: '/pt/apps/sudoku-worksheets',
        destination: '/pt/apps/sudoku-criancas-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): chart-count-worksheets → grafico-pictorico-fichas
      {
        source: '/pt/apps/chart-count-worksheets',
        destination: '/pt/apps/grafico-pictorico-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): code-addition-worksheets → adicao-codigo-fichas
      {
        source: '/pt/apps/code-addition-worksheets',
        destination: '/pt/apps/adicao-codigo-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): draw-and-color-worksheets → desenho-grade-fichas
      {
        source: '/pt/apps/draw-and-color-worksheets',
        destination: '/pt/apps/desenho-grade-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): find-objects-worksheets → encontrar-objetos-fichas
      {
        source: '/pt/apps/find-objects-worksheets',
        destination: '/pt/apps/encontrar-objetos-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): grid-match-worksheets → quebra-cabeca-grade-fichas
      {
        source: '/pt/apps/grid-match-worksheets',
        destination: '/pt/apps/quebra-cabeca-grade-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): crossword-worksheets → palavras-cruzadas-imagens-fichas
      {
        source: '/pt/apps/crossword-worksheets',
        destination: '/pt/apps/palavras-cruzadas-imagens-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): cryptogram-worksheets → criptograma-imagens-fichas
      {
        source: '/pt/apps/cryptogram-worksheets',
        destination: '/pt/apps/criptograma-imagens-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): math-puzzle-worksheets → quebra-cabeca-matematica-fichas
      {
        source: '/pt/apps/math-puzzle-worksheets',
        destination: '/pt/apps/quebra-cabeca-matematica-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): missing-pieces-worksheets → pecas-faltantes-fichas
      {
        source: '/pt/apps/missing-pieces-worksheets',
        destination: '/pt/apps/pecas-faltantes-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): more-less-worksheets → maior-menor-fichas
      {
        source: '/pt/apps/more-less-worksheets',
        destination: '/pt/apps/maior-menor-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): odd-one-out-worksheets → encontre-diferente-fichas
      {
        source: '/pt/apps/odd-one-out-worksheets',
        destination: '/pt/apps/encontre-diferente-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): pattern-train-worksheets → trem-padroes-fichas
      {
        source: '/pt/apps/pattern-train-worksheets',
        destination: '/pt/apps/trem-padroes-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): pattern-worksheets → fichas-padroes-sequencias
      {
        source: '/pt/apps/pattern-worksheets',
        destination: '/pt/apps/fichas-padroes-sequencias',
        permanent: true,
      },
      // Portuguese (Brazilian): picture-path-worksheets → labirinto-caminhos-fichas
      {
        source: '/pt/apps/picture-path-worksheets',
        destination: '/pt/apps/labirinto-caminhos-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): picture-sort-worksheets → classificacao-imagens-fichas
      {
        source: '/pt/apps/picture-sort-worksheets',
        destination: '/pt/apps/classificacao-imagens-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): prepositions-worksheets → preposicoes-fichas
      {
        source: '/pt/apps/prepositions-worksheets',
        destination: '/pt/apps/preposicoes-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): shadow-match-worksheets → combinar-sombras-fichas
      {
        source: '/pt/apps/shadow-match-worksheets',
        destination: '/pt/apps/combinar-sombras-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): subtraction-worksheets → subtracao-fichas
      {
        source: '/pt/apps/subtraction-worksheets',
        destination: '/pt/apps/subtracao-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): treasure-hunt-worksheets → caca-ao-tesouro-fichas
      {
        source: '/pt/apps/treasure-hunt-worksheets',
        destination: '/pt/apps/caca-ao-tesouro-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): word-guess-worksheets → adivinhar-palavras-fichas
      {
        source: '/pt/apps/word-guess-worksheets',
        destination: '/pt/apps/adivinhar-palavras-fichas',
        permanent: true,
      },
      // Portuguese (Brazilian): writing-worksheets → caligrafia-fichas
      {
        source: '/pt/apps/writing-worksheets',
        destination: '/pt/apps/caligrafia-fichas',
        permanent: true,
      },
      // Dutch: word-search-worksheets → woordzoeker-werkbladen
      {
        source: '/nl/apps/word-search-worksheets',
        destination: '/nl/apps/woordzoeker-werkbladen',
        permanent: true,
      },
      // Dutch: addition-worksheets → optellen-werkbladen
      {
        source: '/nl/apps/addition-worksheets',
        destination: '/nl/apps/optellen-werkbladen',
        permanent: true,
      },
      // Dutch: alphabet-train-worksheets → alfabet-trein-werkbladen
      {
        source: '/nl/apps/alphabet-train-worksheets',
        destination: '/nl/apps/alfabet-trein-werkbladen',
        permanent: true,
      },
      // Dutch: coloring-worksheets → kleurplaten-werkbladen
      {
        source: '/nl/apps/coloring-worksheets',
        destination: '/nl/apps/kleurplaten-werkbladen',
        permanent: true,
      },
      // Dutch: math-worksheets → rekenen-werkbladen
      {
        source: '/nl/apps/math-worksheets',
        destination: '/nl/apps/rekenen-werkbladen',
        permanent: true,
      },
      // Dutch: word-scramble-worksheets → woordkruisel-werkbladen
      {
        source: '/nl/apps/word-scramble-worksheets',
        destination: '/nl/apps/woordkruisel-werkbladen',
        permanent: true,
      },
      // Dutch: find-and-count-worksheets → zoek-en-tel-werkbladen
      {
        source: '/nl/apps/find-and-count-worksheets',
        destination: '/nl/apps/zoek-en-tel-werkbladen',
        permanent: true,
      },
      // Dutch: matching-worksheets → verbindings-werkbladen
      {
        source: '/nl/apps/matching-worksheets',
        destination: '/nl/apps/verbindings-werkbladen',
        permanent: true,
      },
      // Dutch: drawing-lines-worksheets → lijnen-trekken-werkbladen
      {
        source: '/nl/apps/drawing-lines-worksheets',
        destination: '/nl/apps/lijnen-trekken-werkbladen',
        permanent: true,
      },
      // Dutch: picture-bingo-worksheets → plaatjes-bingo-werkbladen
      {
        source: '/nl/apps/picture-bingo-worksheets',
        destination: '/nl/apps/plaatjes-bingo-werkbladen',
        permanent: true,
      },
      // Dutch: sudoku-worksheets → sudoku-werkbladen
      {
        source: '/nl/apps/sudoku-worksheets',
        destination: '/nl/apps/sudoku-werkbladen',
        permanent: true,
      },
      // Dutch: big-small-worksheets → groot-klein-werkbladen
      {
        source: '/nl/apps/big-small-worksheets',
        destination: '/nl/apps/groot-klein-werkbladen',
        permanent: true,
      },
      // Dutch: chart-count-worksheets → telgrafieken-werkbladen
      {
        source: '/nl/apps/chart-count-worksheets',
        destination: '/nl/apps/telgrafieken-werkbladen',
        permanent: true,
      },
      // Dutch: code-addition-worksheets → visuele-optelsommen-werkbladen
      {
        source: '/nl/apps/code-addition-worksheets',
        destination: '/nl/apps/visuele-optelsommen-werkbladen',
        permanent: true,
      },
      // Dutch: draw-and-color-worksheets → rastertekenen-werkbladen
      {
        source: '/nl/apps/draw-and-color-worksheets',
        destination: '/nl/apps/rastertekenen-werkbladen',
        permanent: true,
      },
      // Dutch: find-objects-worksheets → zoek-voorwerpen-werkbladen
      {
        source: '/nl/apps/find-objects-worksheets',
        destination: '/nl/apps/zoek-voorwerpen-werkbladen',
        permanent: true,
      },
      // Dutch: grid-match-worksheets → raster-puzzel-werkbladen
      {
        source: '/nl/apps/grid-match-worksheets',
        destination: '/nl/apps/raster-puzzel-werkbladen',
        permanent: true,
      },
      // Dutch: crossword-worksheets → kruiswoordpuzzel-werkbladen
      {
        source: '/nl/apps/crossword-worksheets',
        destination: '/nl/apps/kruiswoordpuzzel-werkbladen',
        permanent: true,
      },
      // Dutch: cryptogram-worksheets → cryptogram-werkbladen
      {
        source: '/nl/apps/cryptogram-worksheets',
        destination: '/nl/apps/cryptogram-werkbladen',
        permanent: true,
      },
      // Dutch: math-puzzle-worksheets → rekenpuzzels-werkbladen
      {
        source: '/nl/apps/math-puzzle-worksheets',
        destination: '/nl/apps/rekenpuzzels-werkbladen',
        permanent: true,
      },
      // Dutch: missing-pieces-worksheets → ontbrekende-puzzelstukjes-werkbladen
      {
        source: '/nl/apps/missing-pieces-worksheets',
        destination: '/nl/apps/ontbrekende-puzzelstukjes-werkbladen',
        permanent: true,
      },
      // Dutch: more-less-worksheets → meer-minder-werkbladen
      {
        source: '/nl/apps/more-less-worksheets',
        destination: '/nl/apps/meer-minder-werkbladen',
        permanent: true,
      },
      // Dutch: odd-one-out-worksheets → welke-hoort-niet-bij-werkbladen
      {
        source: '/nl/apps/odd-one-out-worksheets',
        destination: '/nl/apps/welke-hoort-niet-bij-werkbladen',
        permanent: true,
      },
      // Dutch: pattern-train-worksheets → patroontrein-werkbladen
      {
        source: '/nl/apps/pattern-train-worksheets',
        destination: '/nl/apps/patroontrein-werkbladen',
        permanent: true,
      },
      // Dutch: pattern-worksheets → patronen-werkbladen
      {
        source: '/nl/apps/pattern-worksheets',
        destination: '/nl/apps/patronen-werkbladen',
        permanent: true,
      },
      // Dutch: picture-path-worksheets → doolhof-werkbladen
      {
        source: '/nl/apps/picture-path-worksheets',
        destination: '/nl/apps/doolhof-werkbladen',
        permanent: true,
      },
      // Dutch: picture-sort-worksheets → sorteer-werkbladen
      {
        source: '/nl/apps/picture-sort-worksheets',
        destination: '/nl/apps/sorteer-werkbladen',
        permanent: true,
      },
      // Dutch: prepositions-worksheets → voorzetsels-werkbladen
      {
        source: '/nl/apps/prepositions-worksheets',
        destination: '/nl/apps/voorzetsels-werkbladen',
        permanent: true,
      },
      // Dutch: shadow-match-worksheets → schaduw-matching-werkbladen
      {
        source: '/nl/apps/shadow-match-worksheets',
        destination: '/nl/apps/schaduw-matching-werkbladen',
        permanent: true,
      },
      // Dutch: subtraction-worksheets → aftrekken-werkbladen
      {
        source: '/nl/apps/subtraction-worksheets',
        destination: '/nl/apps/aftrekken-werkbladen',
        permanent: true,
      },
      // Dutch: treasure-hunt-worksheets → schattenjacht-werkbladen
      {
        source: '/nl/apps/treasure-hunt-worksheets',
        destination: '/nl/apps/schattenjacht-werkbladen',
        permanent: true,
      },
      // Dutch: word-guess-worksheets → woordraadsel-werkbladen
      {
        source: '/nl/apps/word-guess-worksheets',
        destination: '/nl/apps/woordraadsel-werkbladen',
        permanent: true,
      },
      // Dutch: writing-worksheets → schrijfoefeningen-werkbladen
      {
        source: '/nl/apps/writing-worksheets',
        destination: '/nl/apps/schrijfoefeningen-werkbladen',
        permanent: true,
      },
      // Danish: word-search-worksheets → ordsoegning-arbejdsark
      {
        source: '/da/apps/word-search-worksheets',
        destination: '/da/apps/ordsoegning-arbejdsark',
        permanent: true,
      },
      // Danish: addition-worksheets → addition-arbejdsark
      {
        source: '/da/apps/addition-worksheets',
        destination: '/da/apps/addition-arbejdsark',
        permanent: true,
      },
      // Danish: alphabet-train-worksheets → alfabet-tog-arbejdsark
      {
        source: '/da/apps/alphabet-train-worksheets',
        destination: '/da/apps/alfabet-tog-arbejdsark',
        permanent: true,
      },
      // Danish: coloring-worksheets → malebog-arbejdsark
      {
        source: '/da/apps/coloring-worksheets',
        destination: '/da/apps/malebog-arbejdsark',
        permanent: true,
      },
      // Danish: math-worksheets → matematikopgaver-arbejdsark
      {
        source: '/da/apps/math-worksheets',
        destination: '/da/apps/matematikopgaver-arbejdsark',
        permanent: true,
      },
      // Danish: word-scramble-worksheets → bogstavblanding-arbejdsark
      {
        source: '/da/apps/word-scramble-worksheets',
        destination: '/da/apps/bogstavblanding-arbejdsark',
        permanent: true,
      },
      // Danish: find-and-count-worksheets → find-og-tael-arbejdsark
      {
        source: '/da/apps/find-and-count-worksheets',
        destination: '/da/apps/find-og-tael-arbejdsark',
        permanent: true,
      },
      // Danish: matching-worksheets → matchning-arbejdsark
      {
        source: '/da/apps/matching-worksheets',
        destination: '/da/apps/matchning-arbejdsark',
        permanent: true,
      },
      // Danish: drawing-lines-worksheets → linjetraening-arbejdsark
      {
        source: '/da/apps/drawing-lines-worksheets',
        destination: '/da/apps/linjetraening-arbejdsark',
        permanent: true,
      },
      // Danish: picture-bingo-worksheets → bingo-arbejdsark
      {
        source: '/da/apps/picture-bingo-worksheets',
        destination: '/da/apps/bingo-arbejdsark',
        permanent: true,
      },
      // Danish: sudoku-worksheets → sudoku-arbejdsark
      {
        source: '/da/apps/sudoku-worksheets',
        destination: '/da/apps/sudoku-arbejdsark',
        permanent: true,
      },
      // Danish: big-small-worksheets → stor-lille-arbejdsark
      {
        source: '/da/apps/big-small-worksheets',
        destination: '/da/apps/stor-lille-arbejdsark',
        permanent: true,
      },
      // Danish: chart-count-worksheets → billediagram-arbejdsark
      {
        source: '/da/apps/chart-count-worksheets',
        destination: '/da/apps/billediagram-arbejdsark',
        permanent: true,
      },
      // Danish: code-addition-worksheets → kode-plusstykker-arbejdsark
      {
        source: '/da/apps/code-addition-worksheets',
        destination: '/da/apps/kode-plusstykker-arbejdsark',
        permanent: true,
      },
      // Danish: draw-and-color-worksheets → tegn-og-farvelaeg-arbejdsark
      {
        source: '/da/apps/draw-and-color-worksheets',
        destination: '/da/apps/tegn-og-farvelaeg-arbejdsark',
        permanent: true,
      },
      // Danish: find-objects-worksheets → find-objekterne-arbejdsark
      {
        source: '/da/apps/find-objects-worksheets',
        destination: '/da/apps/find-objekterne-arbejdsark',
        permanent: true,
      },
      // Danish: grid-match-worksheets → raster-puslespil-arbejdsark
      {
        source: '/da/apps/grid-match-worksheets',
        destination: '/da/apps/raster-puslespil-arbejdsark',
        permanent: true,
      },
      // Danish: crossword-worksheets → krydsord-arbejdsark
      {
        source: '/da/apps/crossword-worksheets',
        destination: '/da/apps/krydsord-arbejdsark',
        permanent: true,
      },
      // Danish: cryptogram-worksheets → kryptogram-arbejdsark
      {
        source: '/da/apps/cryptogram-worksheets',
        destination: '/da/apps/kryptogram-arbejdsark',
        permanent: true,
      },
      // Danish: math-puzzle-worksheets → matteleger-arbejdsark
      {
        source: '/da/apps/math-puzzle-worksheets',
        destination: '/da/apps/matteleger-arbejdsark',
        permanent: true,
      },
      // Danish: missing-pieces-worksheets → manglende-brikker-arbejdsark
      {
        source: '/da/apps/missing-pieces-worksheets',
        destination: '/da/apps/manglende-brikker-arbejdsark',
        permanent: true,
      },
      // Danish: more-less-worksheets → sammenligningsopgaver-arbejdsark
      {
        source: '/da/apps/more-less-worksheets',
        destination: '/da/apps/sammenligningsopgaver-arbejdsark',
        permanent: true,
      },
      // Danish: odd-one-out-worksheets → find-den-ulige-arbejdsark
      {
        source: '/da/apps/odd-one-out-worksheets',
        destination: '/da/apps/find-den-ulige-arbejdsark',
        permanent: true,
      },
      // Danish: pattern-train-worksheets → moenstertog-arbejdsark
      {
        source: '/da/apps/pattern-train-worksheets',
        destination: '/da/apps/moenstertog-arbejdsark',
        permanent: true,
      },
      // Danish: pattern-worksheets → moenstre-arbejdsark
      {
        source: '/da/apps/pattern-worksheets',
        destination: '/da/apps/moenstre-arbejdsark',
        permanent: true,
      },
      // Danish: picture-path-worksheets → billedsti-arbejdsark
      {
        source: '/da/apps/picture-path-worksheets',
        destination: '/da/apps/billedsti-arbejdsark',
        permanent: true,
      },
      // Danish: picture-sort-worksheets → billedsortering-arbejdsark
      {
        source: '/da/apps/picture-sort-worksheets',
        destination: '/da/apps/billedsortering-arbejdsark',
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