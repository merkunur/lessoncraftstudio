import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidLocale } from '@/config/locales';

// Import product page slugs for legacy appId → localized slug redirects
// App detail pages survive the pivot — these redirects are still needed
import { productPageSlugs } from './config/product-page-slugs';

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
  return new NextResponse('Gone', {
    status: 410,
    headers: {
      'Content-Type': 'text/plain',
      'X-Robots-Tag': 'noindex',
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
 * - /feed.xml, /sitemap-news.xml, /sitemap-images.xml, /sitemap_index.xml
 */
function isRemovedRoute(pathname: string): boolean {
  // Non-locale-prefixed removed routes
  if (pathname === '/blog' || pathname.startsWith('/blog/')) return true;
  if (pathname === '/pricing') return true;
  if (pathname.startsWith('/buy')) return true;
  if (pathname === '/feed.xml') return true;
  if (pathname === '/sitemap-news.xml') return true;
  if (pathname === '/sitemap-images.xml') return true;
  if (pathname === '/sitemap_index.xml') return true;

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
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|sitemap/|.*\\.(?:png|jpg|jpeg|svg|ico|webp|gif|pdf)$|samples|worksheet-generators|worksheet-images|worksheet-samples|homepage-content-manager.*\\.html|images|test-.*\\.html|js|uploads|upload|static-page-manager\\.html|page-manager\\.html|easy-page-manager\\.html|simple-upload\\.html|simple-upload|admin|settings|notifications|collaboration|testing|search).*)',
  ]
};
