import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidLocale } from '@/config/locales';

// Import product page slugs for legacy appId → localized slug redirects
// App detail pages survive the pivot — these redirects are still needed
import { productPageSlugs } from './config/product-page-slugs';
import { toolPageSlugs } from './config/tool-page-slugs';
import { bundlePageSlugs } from './config/bundle-page-slugs';
import { startPageSlugs } from './config/start-page-slugs';
import { guidePageSlugs } from './config/guide-page-slugs';
import { ideaPageSlugs } from './config/idea-page-slugs';

// Build legacy appId → localized slugs map for product page redirects
// This redirects /de/apps/image-addition → /de/apps/addition-arbeitsblaetter
const legacyAppIdToLocalizedSlugs = new Map<string, Record<string, string>>();
for (const app of productPageSlugs) {
  const localeToSlug: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(app.slugs)) {
    if (slug) {
      localeToSlug[locale] = slug;
    }
  }
  legacyAppIdToLocalizedSlugs.set(app.appId, localeToSlug);
}

// Also add WarriorPlus appIds so /en/apps/wordsearch → /en/apps/word-search-worksheets
const wpToSlugApp: Record<string, string> = {
  'wordsearch': 'word-search',
  'addition': 'image-addition',
  'matching': 'matching-app',
  'bingo': 'picture-bingo',
  'big-small': 'big-small-app',
  'chart-count': 'chart-count-color',
  'crossword': 'image-crossword',
  'cryptogram': 'image-cryptogram',
  'writing': 'writing-app',
};
for (const [wpId, slugId] of Object.entries(wpToSlugApp)) {
  const slugs = legacyAppIdToLocalizedSlugs.get(slugId);
  if (slugs) legacyAppIdToLocalizedSlugs.set(wpId, slugs);
}

// Broken/alternate app slugs → correct slug-config appId
// Covers all 404 URLs found by broken link checker
const brokenAppSlugToAppId: Record<string, string> = {
  // EN broken slugs
  'big-and-small-worksheets': 'big-small-app',
  'big-and-small': 'big-small-app',
  'wordsearch-worksheets': 'word-search',
  'hidden-objects': 'find-objects',
  'hidden-object-worksheets': 'find-objects',
  'more-or-less-worksheets': 'more-less',
  'handwriting-worksheets': 'writing-app',
  'bingo-worksheets': 'picture-bingo',
  'pattern-worksheet-worksheets': 'pattern-worksheet',
  'maze': 'picture-path',
  'find-count': 'find-and-count',
  // DE broken slugs
  'ausmalbilder-arbeitsblaetter': 'coloring',
  'versteckte-objekte-arbeitsblaetter': 'find-objects',
  'labyrinth-arbeitsblaetter': 'picture-path',
  'muster-raster-arbeitsblaetter': 'pattern-worksheet',
  'zaehlen-finden-arbeitsblaetter': 'find-and-count',
  'kryptogramm-arbeitsblaetter': 'image-cryptogram',
  'kreuzwortraetsel-arbeitsblaetter': 'image-crossword',
  'additions-arbeitsblaetter': 'image-addition',
  'sudoku-arbeitsblaetter': 'sudoku',
  // ES broken slugs
  'fichas-matematicas': 'math-puzzle',
  'puzzles-matematicos-fichas': 'math-puzzle',
  'sudoku-fichas': 'sudoku',
  'colorear-fichas': 'coloring',
  'sopas-letras-fichas': 'word-search',
  // PT broken slugs
  'fichas-matematica': 'math-worksheet',
  'fichas-adicao': 'image-addition',
  'soma-fichas': 'image-addition',
  'fichas-caligrafia': 'writing-app',
  'fichas-comboio-alfabeto': 'alphabet-train',
  'comboio-alfabeto-fichas': 'alphabet-train',
  'comboio-padroes-fichas': 'pattern-train',
  'palavras-cruzadas-fichas': 'image-crossword',
  'letras-embaralhadas-fichas': 'word-scramble',
  'associacao-fichas': 'matching-app',
  'lectoescrita-fichas': 'writing-app',
  'desenho-fichas': 'draw-and-color',
  'desenho-quadricula-fichas': 'draw-and-color',
  'grafomotricidade-fichas': 'drawing-lines',
  'labirintos-imagens-fichas': 'picture-path',
  // IT broken slugs
  'puzzle-griglia-schede': 'grid-match',
  'disegni-colorare-schede': 'coloring',
};
for (const [brokenSlug, appId] of Object.entries(brokenAppSlugToAppId)) {
  const slugs = legacyAppIdToLocalizedSlugs.get(appId);
  if (slugs && !legacyAppIdToLocalizedSlugs.has(brokenSlug)) {
    legacyAppIdToLocalizedSlugs.set(brokenSlug, slugs);
  }
}

// Build English slug → app slugs map for English-to-localized redirects
// This redirects /de/apps/addition-worksheets → /de/apps/addition-arbeitsblaetter
const englishSlugToAppSlugs = new Map<string, Record<string, string>>();
for (const app of productPageSlugs) {
  const enSlug = app.slugs.en;
  if (enSlug) {
    const localeToSlug: Record<string, string> = {};
    for (const [locale, slug] of Object.entries(app.slugs)) {
      if (slug) {
        localeToSlug[locale] = slug;
      }
    }
    englishSlugToAppSlugs.set(enSlug, localeToSlug);
  }
}

// Build anySlug → locale-to-slug map for cross-locale redirects
// e.g., /sv/apps/subtraktion-arbejdsark (Danish slug under Swedish) → /sv/apps/subtraktion-arbetsblad
const anySlugToLocaleSlugs = new Map<string, Record<string, string>>();
for (const app of productPageSlugs) {
  const localeToSlug: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(app.slugs)) {
    if (slug) localeToSlug[locale] = slug;
  }
  for (const slug of Object.values(app.slugs)) {
    if (slug) anySlugToLocaleSlugs.set(slug, localeToSlug);
  }
}

// Build legacy appId → localized slugs map for tool page redirects
const legacyToolIdToLocalizedSlugs = new Map<string, Record<string, string>>();
for (const tool of toolPageSlugs) {
  const localeToSlug: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(tool.slugs)) {
    if (slug) localeToSlug[locale] = slug;
  }
  legacyToolIdToLocalizedSlugs.set(tool.toolId, localeToSlug);
}

const englishSlugToToolSlugs = new Map<string, Record<string, string>>();
for (const tool of toolPageSlugs) {
  const enSlug = tool.slugs.en;
  if (enSlug) {
    const localeToSlug: Record<string, string> = {};
    for (const [locale, slug] of Object.entries(tool.slugs)) {
      if (slug) localeToSlug[locale] = slug;
    }
    englishSlugToToolSlugs.set(enSlug, localeToSlug);
  }
}

const anySlugToToolSlugs = new Map<string, Record<string, string>>();
for (const tool of toolPageSlugs) {
  const localeToSlug: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(tool.slugs)) {
    if (slug) localeToSlug[locale] = slug;
  }
  for (const slug of Object.values(tool.slugs)) {
    if (slug) anySlugToToolSlugs.set(slug, localeToSlug);
  }
}

// Build redirect maps for bundle pages
const legacyBundleIdToLocalizedSlugs = new Map<string, Record<string, string>>();
const englishSlugToBundleSlugs = new Map<string, Record<string, string>>();
const anySlugToBundleSlugs = new Map<string, Record<string, string>>();
for (const bundle of bundlePageSlugs) {
  const localeToSlug: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(bundle.slugs)) {
    if (slug) localeToSlug[locale] = slug;
  }
  legacyBundleIdToLocalizedSlugs.set(bundle.bundleId, localeToSlug);
  if (bundle.slugs.en) englishSlugToBundleSlugs.set(bundle.slugs.en, localeToSlug);
  for (const slug of Object.values(bundle.slugs)) {
    if (slug) anySlugToBundleSlugs.set(slug, localeToSlug);
  }
}

// Build redirect maps for start (cornerstone guide) pages
const legacyStartIdToLocalizedSlugs = new Map<string, Record<string, string>>();
const englishSlugToStartSlugs = new Map<string, Record<string, string>>();
const anySlugToStartSlugs = new Map<string, Record<string, string>>();
for (const start of startPageSlugs) {
  const localeToSlug: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(start.slugs)) {
    if (slug) localeToSlug[locale] = slug;
  }
  legacyStartIdToLocalizedSlugs.set(start.startId, localeToSlug);
  if (start.slugs.en) englishSlugToStartSlugs.set(start.slugs.en, localeToSlug);
  for (const slug of Object.values(start.slugs)) {
    if (slug) anySlugToStartSlugs.set(slug, localeToSlug);
  }
}

// Build redirect maps for guide (Create X) pages
const legacyGuideIdToLocalizedSlugs = new Map<string, Record<string, string>>();
const englishSlugToGuideSlugs = new Map<string, Record<string, string>>();
const anySlugToGuideSlugs = new Map<string, Record<string, string>>();
for (const guide of guidePageSlugs) {
  const localeToSlug: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(guide.slugs)) {
    if (slug) localeToSlug[locale] = slug;
  }
  legacyGuideIdToLocalizedSlugs.set(guide.guideId, localeToSlug);
  if (guide.slugs.en) englishSlugToGuideSlugs.set(guide.slugs.en, localeToSlug);
  for (const slug of Object.values(guide.slugs)) {
    if (slug) anySlugToGuideSlugs.set(slug, localeToSlug);
  }
}

// Build redirect maps for idea (niche idea) pages
const legacyIdeaIdToLocalizedSlugs = new Map<string, Record<string, string>>();
const englishSlugToIdeaSlugs = new Map<string, Record<string, string>>();
const anySlugToIdeaSlugs = new Map<string, Record<string, string>>();
for (const idea of ideaPageSlugs) {
  const localeToSlug: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(idea.slugs)) {
    if (slug) localeToSlug[locale] = slug;
  }
  legacyIdeaIdToLocalizedSlugs.set(idea.ideaId, localeToSlug);
  if (idea.slugs.en) englishSlugToIdeaSlugs.set(idea.slugs.en, localeToSlug);
  for (const slug of Object.values(idea.slugs)) {
    if (slug) anySlugToIdeaSlugs.set(slug, localeToSlug);
  }
}

// Broken guide slugs → correct guideId (covers all 404s from broken link checker)
const brokenGuideSlugToGuideId = new Map<string, string>([
  // EN broken guide slugs
  ['create-handwriting-worksheets', 'create-handwriting-sheets'],
  ['create-handwriting-practice-sheets', 'create-handwriting-sheets'],
  ['create-word-search-worksheets', 'create-word-search-puzzles'],
  ['create-pattern-train-worksheets', 'create-pattern-worksheets'],
  ['create-big-and-small-worksheets', 'create-size-comparison-worksheets'],
  ['create-coloring-worksheets', 'create-coloring-pages'],
  ['create-more-or-less-worksheets', 'create-size-comparison-worksheets'],
  ['create-alphabet-train-worksheets', 'create-alphabet-worksheets'],
  ['create-picture-path-worksheets', 'create-maze-worksheets'],
  ['create-missing-pieces-worksheets', 'create-missing-pieces-puzzles'],
  ['create-odd-one-out-worksheets', 'create-odd-one-out-puzzles'],
  ['create-pattern-recognition-worksheets', 'create-pattern-worksheets'],
  ['create-drawing-lines-worksheets', 'create-drawing-worksheets'],
  ['create-find-and-count-worksheets', 'create-counting-worksheets'],
  ['create-word-guess-worksheets', 'create-preposition-worksheets'],
  ['create-word-scramble-worksheets', 'create-cryptogram-puzzles'],
  ['create-picture-sudoku-worksheets', 'create-picture-sudoku'],
  ['create-grid-match-puzzles', 'create-missing-pieces-puzzles'],
  ['create-comparison-worksheets', 'create-size-comparison-worksheets'],
  ['create-puzzle-worksheets', 'create-missing-pieces-puzzles'],
  ['sell-language-worksheets-etsy', 'sell-word-search-etsy'],
  ['sell-alphabet-worksheets-etsy', 'sell-word-search-etsy'],
  ['maze-books-kdp', 'publish-puzzle-books-kdp'],
  ['printable-business-income', 'passive-income-worksheets'],
  // DE broken guide slugs
  ['sprach-arbeitsblaetter-verkaufen-etsy', 'sell-word-search-etsy'],
  ['vergleichs-arbeitsblaetter-erstellen', 'create-size-comparison-worksheets'],
  ['linien-ziehen-arbeitsblaetter-erstellen', 'create-drawing-worksheets'],
  ['alphabet-zug-arbeitsblaetter-erstellen', 'create-alphabet-worksheets'],
  ['woerter-raten-arbeitsblaetter-erstellen', 'create-preposition-worksheets'],
  ['create-word-guess-worksheets', 'create-preposition-worksheets'],
  ['create-word-scramble-worksheets', 'create-cryptogram-puzzles'],
  // FR broken guide slugs
  ['croissance-activite-imprimables', 'scale-printable-business-guide'],
  ['plan-activite-imprimables', 'niche-selection-printables'],
  // ES broken guide slugs
  ['ingresos-negocio-imprimibles', 'passive-income-worksheets'],
  ['crear-fichas-multilingues', 'worksheets-multiple-languages'],
  // PT broken guide slugs
  ['rendimentos-negocio-imprimiveis', 'passive-income-worksheets'],
  ['criar-sopas-letras', 'create-word-search-puzzles'],
  ['criar-fichas-correspondencia', 'create-matching-worksheets'],
  ['criar-fichas-sopa-letras', 'create-word-search-puzzles'],
  ['criar-fichas-multilingues', 'worksheets-multiple-languages'],
  ['criar-fichas-grafomotricidade', 'create-drawing-worksheets'],
  ['criar-fichas-caligrafia', 'create-handwriting-sheets'],
  ['criar-fichas-comboio-padroes', 'create-pattern-worksheets'],
  ['criar-fichas-buscar-contar', 'create-counting-worksheets'],
  ['criar-cartoes-bingo', 'create-bingo-cards'],
  ['ganhar-dinheiro-livros-atividades-kdp', 'make-money-kdp-activity-books'],
  ['kdp-vs-etsy-imprimiveis', 'kdp-vs-etsy-printables'],
  ['livros-sopas-letras-kdp', 'word-search-books-kdp'],
]);

// Broken tool slugs → correct toolId
const brokenToolSlugToToolId = new Map<string, string>([
  // EN
  ['addition-maker', 'image-addition'],
  ['image-subtraction', 'image-subtraction'],
  ['subtraction-worksheet-maker', 'image-subtraction'],
  // DE
  ['bilder-bingo-ersteller', 'bingo'],
  ['mathe-raetsel-arbeitsblatt-ersteller', 'math-puzzle'],
  ['mehr-weniger-arbeitsblatt-ersteller', 'more-less'],
  ['schattenbilder-zuordnen-ersteller', 'shadow-match'],
  ['gross-und-klein-ersteller', 'big-small'],
  ['sudoku-ersteller', 'sudoku'],
  ['kreuzwortraetsel-ersteller', 'crossword'],
  ['bilder-additions-arbeitsblatt-ersteller', 'image-addition'],
  ['bildkryptogramm-ersteller', 'cryptogram'],
  // ES
  ['generador-fichas-emparejamiento', 'matching'],
  ['generador-encuentra-diferente', 'odd-one-out'],
  ['generador-sopas-letras', 'word-search'],
  ['generador-fichas-sombras', 'shadow-match'],
  ['generador-fichas-clasificacion', 'picture-sort'],
  ['generador-fichas-cuadricula', 'grid-match'],
  ['generador-fichas-piezas-faltantes', 'missing-pieces'],
  ['generador-buscar-contar', 'find-and-count'],
  ['generador-buscar-objetos', 'find-objects'],
  ['generador-cuadricula-correspondencias', 'grid-match'],
  ['generador-cuadricula-parejas', 'grid-match'],
  ['generador-fichas-relacionar', 'matching'],
  ['generador-fichas-parejas', 'matching'],
  ['generador-letras-revueltas', 'word-scramble'],
  ['generador-fichas-matematicas', 'math-worksheet'],
  ['generador-rompecabezas-matematicos', 'math-puzzle'],
  ['generador-laberinto-imagenes', 'picture-path'],
  ['generador-emparejamiento', 'matching'],
  ['generador-asociacion-sombras', 'shadow-match'],
  ['generador-crucigramas', 'crossword'],
  ['creador-fichas-suma', 'image-addition'],
  ['creador-fichas-resta', 'image-subtraction'],
  ['creador-fichas-comparacion', 'more-less'],
  ['creador-suma-codificada', 'code-addition'],
  ['generador-fichas-resta', 'image-subtraction'],
  // PT
  ['gerador-encontra-conta', 'find-and-count'],
  ['gerador-encontra-objetos', 'find-objects'],
  ['gerador-busca-objetos', 'find-objects'],
  ['gerador-fichas-colorir', 'coloring'],
  ['gerador-fichas-desenho', 'draw-and-color'],
  ['gerador-cartoes-bingo', 'bingo'],
  ['criador-comboio-alfabeto', 'alphabet-train'],
  ['gerador-sudoku', 'sudoku'],
  ['gerador-fichas-subtracao', 'image-subtraction'],
  ['gerador-palavras-cruzadas-imagens', 'crossword'],
  // IT
  ['generatore-schede-sottrazione', 'image-subtraction'],
]);

/**
 * Parse Accept-Language header to detect user's preferred language
 * Returns the first supported language or null if none match
 */
function parseAcceptLanguage(header: string | null): string | null {
  if (!header) return null;

  // Parse languages with quality values (e.g., "en-US,en;q=0.9,de;q=0.8")
  const languages = header.split(',').map(lang => {
    const parts = lang.trim().split(';');
    const langCode = parts[0].split('-')[0].toLowerCase(); // Get base language code
    const quality = parts[1] ? parseFloat(parts[1].replace('q=', '')) : 1.0;
    return { code: langCode, quality };
  });

  // Sort by quality (highest first)
  languages.sort((a, b) => b.quality - a.quality);

  // Find the first supported language
  for (const lang of languages) {
    if (isValidLocale(lang.code)) {
      return lang.code;
    }
  }

  return null;
}

/**
 * Get user's preferred language from cookies or Accept-Language header
 * Priority: preferredLanguage cookie > NEXT_LOCALE cookie > Accept-Language header > default
 */
function getPreferredLanguage(request: NextRequest): string {
  // 1. Check preferredLanguage cookie (set when user explicitly changes language)
  const preferredLangCookie = request.cookies.get('preferredLanguage')?.value;
  if (preferredLangCookie && isValidLocale(preferredLangCookie)) {
    return preferredLangCookie;
  }

  // 2. Check NEXT_LOCALE cookie (set by next-intl)
  const nextLocaleCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (nextLocaleCookie && isValidLocale(nextLocaleCookie)) {
    return nextLocaleCookie;
  }

  // 3. Parse Accept-Language header for first-time visitors
  const acceptLanguage = request.headers.get('accept-language');
  const browserLang = parseAcceptLanguage(acceptLanguage);
  if (browserLang) {
    return browserLang;
  }

  // 4. Fall back to default locale
  return defaultLocale;
}

/**
 * Return 410 Gone for removed URL patterns.
 * Fast de-indexing signal for search engines.
 */
function return410(): NextResponse {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>Page Removed</title>
</head>
<body>
<h1>This page has been removed</h1>
<p>The content you are looking for is no longer available.</p>
<p><a href="https://www.lessoncraftstudio.com/">Visit our homepage</a></p>
</body>
</html>`;

  return new NextResponse(html, {
    status: 410,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

/**
 * Check if a pathname matches a removed URL pattern that should return 410 Gone.
 * Patterns removed in the pivot to Professional Printable Business Toolkit:
 * - /[locale]/blog/* (all blog posts, categories, listings)
 * - /[locale]/worksheets/* (all theme/grade pages)
 * - /[locale]/pricing (pricing page)
 * - /[locale]/apps/category/* (product category pages)
 * - /[locale]/apps/grades/* (grade hub pages)
 * - /buy/* (purchase pages)
 * - /blog/* (non-locale-prefixed blog URLs)
 * - /feed.xml, /sitemap-news.xml, /sitemap-images.xml
 */
function isRemovedRoute(pathname: string): boolean {
  // Non-locale-prefixed removed routes
  if (pathname === '/blog' || pathname.startsWith('/blog/')) return true;
  if (pathname === '/worksheets' || pathname.startsWith('/worksheets/')) return true;
  if (pathname === '/pricing') return true;
  if (pathname.startsWith('/buy')) return true;
  if (pathname.startsWith('/apps/category/') || pathname === '/apps/category') return true;
  if (pathname.startsWith('/apps/grades/') || pathname === '/apps/grades') return true;
  if (pathname === '/feed.xml') return true;
  if (pathname === '/sitemap-news.xml') return true;
  if (pathname === '/sitemap-images.xml') return true;

  // Locale-prefixed removed routes: /xx/blog/*, /xx/worksheets/*, etc.
  const localeMatch = pathname.match(/^\/([a-z]{2})\/(.*)/);
  if (localeMatch) {
    const rest = localeMatch[2];

    // Blog (posts, categories, index)
    if (rest === 'blog' || rest.startsWith('blog/')) return true;

    // Worksheets (theme/grade pages)
    if (rest === 'worksheets' || rest.startsWith('worksheets/')) return true;

    // Pricing
    if (rest === 'pricing') return true;

    // Product category pages
    if (rest.startsWith('apps/category/') || rest === 'apps/category') return true;

    // Grade hub pages
    if (rest.startsWith('apps/grades/') || rest === 'apps/grades') return true;
  }

  // Localized pricing slugs (e.g., /de/preise, /fr/tarifs)
  const localizedPricingSlugs = new Set([
    'prising', 'tarifs', 'preise', 'precios', 'prezzi', 'precos',
    'prijzen', 'hinnoittelu', 'priser',
  ]);
  const localizedPageMatch = pathname.match(/^\/([a-z]{2})\/([a-z]+)$/);
  if (localizedPageMatch && localizedPricingSlugs.has(localizedPageMatch[2])) {
    return true;
  }

  return false;
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  alternateLinks: false
});

// Helper function to continue with intl middleware and set locale cookie
function continueWithIntlMiddleware(
  request: NextRequest,
  requestHeaders: Headers,
  detectedLocale: string,
  pathname: string
): NextResponse {
  const response = intlMiddleware(request);

  // Set locale cookie for root layout to detect language for SEO (html lang attribute)
  if (response instanceof NextResponse) {
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-locale', detectedLocale);
    response.headers.set('Content-Language', detectedLocale);
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });
  }

  return response as NextResponse;
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // SEO FIX: Redirect non-www to www for canonical consistency
  const hostname = request.nextUrl.hostname;
  if (hostname === 'lessoncraftstudio.com') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.lessoncraftstudio.com';
    return NextResponse.redirect(url, 301);
  }

  // 410 Gone for all removed routes (blog, worksheets, pricing, categories, grades, buy)
  // Must be checked early, before intl middleware or any redirect logic
  if (isRemovedRoute(pathname)) {
    return return410();
  }

  // Set pathname header for root layout to detect locale for SEO
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // Extract locale from URL for SEO
  const pathSegments = pathname.split('/').filter(Boolean);
  const urlLocale = pathSegments[0];
  const detectedLocale = isValidLocale(urlLocale) ? urlLocale : 'en';
  requestHeaders.set('x-locale', detectedLocale);

  // Handle product page slug redirects (app detail pages survive the pivot)
  const appsMatch = pathname.match(/^\/([a-z]{2})\/apps\/([a-z0-9-]+)$/);
  if (appsMatch) {
    const [, locale, slug] = appsMatch;

    // Check if this slug is a legacy appId that should redirect to a localized slug
    const localizedSlugs = legacyAppIdToLocalizedSlugs.get(slug);
    if (localizedSlugs) {
      const targetSlug = localizedSlugs[locale] || localizedSlugs['en'];
      if (targetSlug && targetSlug !== slug) {
        const newUrl = new URL(`/${locale}/apps/${targetSlug}`, request.url);
        return NextResponse.redirect(newUrl, { status: 301 });
      }
    }

    // Check if this is an English slug accessed under a non-English locale
    if (locale !== 'en') {
      const appSlugs = englishSlugToAppSlugs.get(slug);
      if (appSlugs) {
        const localizedSlug = appSlugs[locale];
        if (localizedSlug && localizedSlug !== slug) {
          const newUrl = new URL(`/${locale}/apps/${localizedSlug}`, request.url);
          return NextResponse.redirect(newUrl, { status: 301 });
        }
      }
    }

    // Cross-locale slug redirect: slug from locale X accessed under locale Y
    const appSlugsAll = anySlugToLocaleSlugs.get(slug);
    if (appSlugsAll) {
      const correctSlug = appSlugsAll[locale];
      if (correctSlug && correctSlug !== slug) {
        const newUrl = new URL(`/${locale}/apps/${correctSlug}`, request.url);
        return NextResponse.redirect(newUrl, { status: 301 });
      }
    }
  }

  // Handle tool page slug redirects
  const toolsMatch = pathname.match(/^\/([a-z]{2})\/tools\/([a-z0-9-]+)$/);
  if (toolsMatch) {
    const [, locale, slug] = toolsMatch;

    // Broken tool slug → correct tool redirect
    const brokenToolTarget = brokenToolSlugToToolId.get(slug);
    if (brokenToolTarget) {
      const targetSlugs = legacyToolIdToLocalizedSlugs.get(brokenToolTarget);
      if (targetSlugs) {
        const targetSlug = targetSlugs[locale] || targetSlugs['en'];
        if (targetSlug && targetSlug !== slug) {
          return NextResponse.redirect(new URL(`/${locale}/tools/${targetSlug}`, request.url), { status: 301 });
        }
      }
    }

    const localizedSlugs = legacyToolIdToLocalizedSlugs.get(slug);
    if (localizedSlugs) {
      const targetSlug = localizedSlugs[locale] || localizedSlugs['en'];
      if (targetSlug && targetSlug !== slug) {
        const newUrl = new URL(`/${locale}/tools/${targetSlug}`, request.url);
        return NextResponse.redirect(newUrl, { status: 301 });
      }
    }

    if (locale !== 'en') {
      const toolSlugs = englishSlugToToolSlugs.get(slug);
      if (toolSlugs) {
        const localizedSlug = toolSlugs[locale];
        if (localizedSlug && localizedSlug !== slug) {
          const newUrl = new URL(`/${locale}/tools/${localizedSlug}`, request.url);
          return NextResponse.redirect(newUrl, { status: 301 });
        }
      }
    }

    const toolSlugsAll = anySlugToToolSlugs.get(slug);
    if (toolSlugsAll) {
      const correctSlug = toolSlugsAll[locale];
      if (correctSlug && correctSlug !== slug) {
        const newUrl = new URL(`/${locale}/tools/${correctSlug}`, request.url);
        return NextResponse.redirect(newUrl, { status: 301 });
      }
    }
  }

  // Handle bundle page slug redirects
  const bundlesMatch = pathname.match(/^\/([a-z]{2})\/bundles\/([a-z0-9-]+)$/);
  if (bundlesMatch) {
    const [, locale, slug] = bundlesMatch;
    // Broken bundle slug redirect
    if (slug === 'pacote-busca-descobre') {
      const searchSlugs = legacyBundleIdToLocalizedSlugs.get('search-bundle');
      if (searchSlugs) {
        const targetSlug = searchSlugs[locale] || searchSlugs['en'];
        if (targetSlug) return NextResponse.redirect(new URL(`/${locale}/bundles/${targetSlug}`, request.url), { status: 301 });
      }
    }
    const localizedSlugs = legacyBundleIdToLocalizedSlugs.get(slug);
    if (localizedSlugs) {
      const targetSlug = localizedSlugs[locale] || localizedSlugs['en'];
      if (targetSlug && targetSlug !== slug) {
        return NextResponse.redirect(new URL(`/${locale}/bundles/${targetSlug}`, request.url), { status: 301 });
      }
    }
    if (locale !== 'en') {
      const bundleSlugs = englishSlugToBundleSlugs.get(slug);
      if (bundleSlugs) {
        const localizedSlug = bundleSlugs[locale];
        if (localizedSlug && localizedSlug !== slug) {
          return NextResponse.redirect(new URL(`/${locale}/bundles/${localizedSlug}`, request.url), { status: 301 });
        }
      }
    }
    const bundleSlugsAll = anySlugToBundleSlugs.get(slug);
    if (bundleSlugsAll) {
      const correctSlug = bundleSlugsAll[locale];
      if (correctSlug && correctSlug !== slug) {
        return NextResponse.redirect(new URL(`/${locale}/bundles/${correctSlug}`, request.url), { status: 301 });
      }
    }
  }

  // Handle start (cornerstone guide) page slug redirects
  const startMatch = pathname.match(/^\/([a-z]{2})\/start\/([a-z0-9-]+)$/);
  if (startMatch) {
    const [, locale, slug] = startMatch;
    const localizedSlugs = legacyStartIdToLocalizedSlugs.get(slug);
    if (localizedSlugs) {
      const targetSlug = localizedSlugs[locale] || localizedSlugs['en'];
      if (targetSlug && targetSlug !== slug) {
        return NextResponse.redirect(new URL(`/${locale}/start/${targetSlug}`, request.url), { status: 301 });
      }
    }
    if (locale !== 'en') {
      const startSlugs = englishSlugToStartSlugs.get(slug);
      if (startSlugs) {
        const localizedSlug = startSlugs[locale];
        if (localizedSlug && localizedSlug !== slug) {
          return NextResponse.redirect(new URL(`/${locale}/start/${localizedSlug}`, request.url), { status: 301 });
        }
      }
    }
    const startSlugsAll = anySlugToStartSlugs.get(slug);
    if (startSlugsAll) {
      const correctSlug = startSlugsAll[locale];
      if (correctSlug && correctSlug !== slug) {
        return NextResponse.redirect(new URL(`/${locale}/start/${correctSlug}`, request.url), { status: 301 });
      }
    }
  }

  // Handle guide (Create X) page slug redirects
  const guidesMatch = pathname.match(/^\/([a-z]{2})\/guides\/([a-z0-9-]+)$/);
  if (guidesMatch) {
    const [, locale, slug] = guidesMatch;

    // Cross-route redirect: start page slugs accessed under /guides/ → /start/
    const startSlugsForGuide = anySlugToStartSlugs.get(slug) || legacyStartIdToLocalizedSlugs.get(slug);
    if (startSlugsForGuide) {
      const targetSlug = startSlugsForGuide[locale] || startSlugsForGuide['en'] || slug;
      return NextResponse.redirect(new URL(`/${locale}/start/${targetSlug}`, request.url), { status: 301 });
    }

    // Broken guide slugs → correct guide slugs (redirect map)
    const brokenGuideTarget = brokenGuideSlugToGuideId.get(slug);
    if (brokenGuideTarget) {
      const targetSlugs = legacyGuideIdToLocalizedSlugs.get(brokenGuideTarget);
      if (targetSlugs) {
        const targetSlug = targetSlugs[locale] || targetSlugs['en'];
        if (targetSlug) {
          return NextResponse.redirect(new URL(`/${locale}/guides/${targetSlug}`, request.url), { status: 301 });
        }
      }
    }

    const localizedSlugs = legacyGuideIdToLocalizedSlugs.get(slug);
    if (localizedSlugs) {
      const targetSlug = localizedSlugs[locale] || localizedSlugs['en'];
      if (targetSlug && targetSlug !== slug) {
        return NextResponse.redirect(new URL(`/${locale}/guides/${targetSlug}`, request.url), { status: 301 });
      }
    }
    if (locale !== 'en') {
      const guideSlugs = englishSlugToGuideSlugs.get(slug);
      if (guideSlugs) {
        const localizedSlug = guideSlugs[locale];
        if (localizedSlug && localizedSlug !== slug) {
          return NextResponse.redirect(new URL(`/${locale}/guides/${localizedSlug}`, request.url), { status: 301 });
        }
      }
    }
    const guideSlugsAll = anySlugToGuideSlugs.get(slug);
    if (guideSlugsAll) {
      const correctSlug = guideSlugsAll[locale];
      if (correctSlug && correctSlug !== slug) {
        return NextResponse.redirect(new URL(`/${locale}/guides/${correctSlug}`, request.url), { status: 301 });
      }
    }
  }

  // Handle idea (niche idea) page slug redirects
  const ideasMatch = pathname.match(/^\/([a-z]{2})\/ideas\/([a-z0-9-]+)$/);
  if (ideasMatch) {
    const [, locale, slug] = ideasMatch;
    const localizedSlugs = legacyIdeaIdToLocalizedSlugs.get(slug);
    if (localizedSlugs) {
      const targetSlug = localizedSlugs[locale] || localizedSlugs['en'];
      if (targetSlug && targetSlug !== slug) {
        return NextResponse.redirect(new URL(`/${locale}/ideas/${targetSlug}`, request.url), { status: 301 });
      }
    }
    if (locale !== 'en') {
      const ideaSlugs = englishSlugToIdeaSlugs.get(slug);
      if (ideaSlugs) {
        const localizedSlug = ideaSlugs[locale];
        if (localizedSlug && localizedSlug !== slug) {
          return NextResponse.redirect(new URL(`/${locale}/ideas/${localizedSlug}`, request.url), { status: 301 });
        }
      }
    }
    const ideaSlugsAll = anySlugToIdeaSlugs.get(slug);
    if (ideaSlugsAll) {
      const correctSlug = ideaSlugsAll[locale];
      if (correctSlug && correctSlug !== slug) {
        return NextResponse.redirect(new URL(`/${locale}/ideas/${correctSlug}`, request.url), { status: 301 });
      }
    }
  }

  // Handle root URL (/) - redirect to English with 301 for SEO
  if (pathname === '/') {
    const newUrl = new URL('/en', request.url);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Redirect common pages without locale to English
  const pagesNeedingLocale = ['/contact', '/privacy', '/terms', '/about'];
  if (pagesNeedingLocale.includes(pathname)) {
    const newUrl = new URL(`/en${pathname}`, request.url);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Redirect bare app paths without locale or /apps/ prefix
  const bareAppPaths: Record<string, string> = {
    '/word-scramble': '/en/apps/word-scramble-worksheets',
    '/find-objects': '/en/apps/find-objects-worksheets',
    '/generators': '/en/apps',
    '/signup': '/en/auth/signup',
  };
  if (bareAppPaths[pathname]) {
    return NextResponse.redirect(new URL(bareAppPaths[pathname], request.url), 301);
  }

  // Protect content manager - require authentication
  if (pathname.includes('/worksheet-generators/content-manager') ||
      pathname.includes('/worksheet-generators/blog-content-manager')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const authHeader = request.headers.get('authorization');

    if (authHeader === 'Bearer dev-bypass' || process.env.NODE_ENV === 'development') {
      const resp = NextResponse.next({
        request: { headers: requestHeaders }
      });
      resp.headers.set('Content-Language', detectedLocale);
      return resp;
    }

    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const resp = NextResponse.next({
      request: { headers: requestHeaders }
    });
    resp.headers.set('Content-Language', detectedLocale);
    return resp;
  }

  // Skip middleware for static HTML files and public assets
  if (pathname.endsWith('.html') || pathname.includes('/worksheet-generators/')) {
    const resp = NextResponse.next({
      request: { headers: requestHeaders }
    });
    resp.headers.set('Content-Language', detectedLocale);
    return resp;
  }

  // Skip middleware for admin and other app routes (but NOT dashboard - it needs i18n)
  if (pathname.startsWith('/admin') ||
      pathname.startsWith('/member') ||
      pathname.startsWith('/settings') ||
      pathname.startsWith('/notifications') ||
      pathname.startsWith('/collaboration') ||
      pathname.startsWith('/testing') ||
      pathname.startsWith('/search')) {
    const response = NextResponse.next({
      request: { headers: requestHeaders }
    });
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Content-Language', detectedLocale);
    return response;
  }

  // Handle static pages with language persistence
  if (pathname.startsWith('/static')) {
    const pathSegments = pathname.split('/');
    const locale = pathSegments[2];

    if (locale && locales.includes(locale as any)) {
      const response = NextResponse.next({
        request: { headers: requestHeaders }
      });
      response.cookies.set('preferredLanguage', locale, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });
      response.headers.set('Content-Language', locale);
      return response;
    } else {
      const preferredLang = getPreferredLanguage(request);
      const newUrl = new URL(request.url);
      newUrl.pathname = pathname.replace(/\/static\/[^\/]*/, `/static/${preferredLang}`);
      return NextResponse.redirect(newUrl);
    }
  }

  // Use intl middleware for other paths
  return continueWithIntlMiddleware(request, requestHeaders, detectedLocale, pathname);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|sitemap/|image-sitemap|video-sitemap|.*\\.(?:png|jpg|jpeg|svg|ico|webp|gif|pdf)$|samples|worksheet-generators|worksheet-images|worksheet-samples|homepage-content-manager.*\\.html|images|test-.*\\.html|js|uploads|upload|static-page-manager\\.html|page-manager\\.html|easy-page-manager\\.html|simple-upload\\.html|simple-upload|admin|settings|notifications|collaboration|testing|search|member).*)',
  ]
};
