import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SUPPORTED_LOCALES, isValidLocale } from '@/config/locales';

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

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always use a locale prefix in the URL
  localePrefix: 'always'
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

  // Set pathname header for root layout to detect locale for SEO (html lang attribute)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // Extract locale from URL for SEO (html lang attribute)
  const pathSegments = pathname.split('/').filter(Boolean);
  const urlLocale = pathSegments[0];
  const detectedLocale = isValidLocale(urlLocale) ? urlLocale : 'en';

  // Note: Blog redirect for wrong language prefixes is handled at page level
  // The hreflang tags in sitemap and pages tell Google which version to serve
  // Page-level redirect handles any remaining edge cases

  // Handle root URL (/) - redirect to English with 301 for SEO
  // CRITICAL SEO FIX: Always redirect to /en (not Accept-Language based)
  // Non-deterministic redirects cause Google to see different targets on different crawls,
  // resulting in "Duplicate, Google chose different canonical" errors
  if (pathname === '/') {
    const newUrl = new URL('/en', request.url);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Handle /blog and /blog/* routes - redirect to English locale with 301
  // CRITICAL SEO FIX: Always redirect to /en/blog (not Accept-Language based)
  // Non-deterministic redirects cause Google to see different targets on different crawls,
  // resulting in "Duplicate, Google chose different canonical" errors
  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    const newUrl = new URL(`/en${pathname}`, request.url);
    // Preserve query parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Redirect common pages without locale to English
  // CRITICAL SEO FIX: Always redirect to /en (not Accept-Language based)
  // Non-deterministic redirects cause "Duplicate, Google chose different canonical" errors
  const pagesNeedingLocale = ['/contact', '/pricing', '/privacy', '/terms', '/about'];
  if (pagesNeedingLocale.includes(pathname)) {
    const newUrl = new URL(`/en${pathname}`, request.url);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Protect content manager - require authentication
  if (pathname.includes('/worksheet-generators/content-manager') ||
      pathname.includes('/worksheet-generators/blog-content-manager')) {
    // Check for admin session token
    const adminToken = request.cookies.get('admin_token')?.value;
    const authHeader = request.headers.get('authorization');

    // Allow dev bypass
    if (authHeader === 'Bearer dev-bypass' || process.env.NODE_ENV === 'development') {
      return NextResponse.next({
        request: { headers: requestHeaders }
      });
    }

    // If no admin token, redirect to login
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  // Skip middleware for other static HTML files and public assets
  if (pathname.endsWith('.html') || pathname.includes('/worksheet-generators/')) {
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  // Skip middleware for admin and other app routes (but NOT dashboard - it needs i18n)
  if (pathname.startsWith('/admin') ||
      pathname.startsWith('/settings') ||
      pathname.startsWith('/notifications') ||
      pathname.startsWith('/collaboration') ||
      pathname.startsWith('/testing') ||
      pathname.startsWith('/search')) {
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  // Handle static pages with language persistence
  if (pathname.startsWith('/static')) {
    const pathSegments = pathname.split('/');
    const locale = pathSegments[2]; // /static/[locale]/...

    // Check if locale is valid
    if (locale && locales.includes(locale as any)) {
      // Set language cookie for persistence
      const response = NextResponse.next({
        request: { headers: requestHeaders }
      });
      response.cookies.set('preferredLanguage', locale, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      return response;
    } else {
      // Try to get preferred language from cookies or Accept-Language header
      const preferredLang = getPreferredLanguage(request);

      // Redirect to preferred language
      const newUrl = new URL(request.url);
      newUrl.pathname = pathname.replace(/\/static\/[^\/]*/, `/static/${preferredLang}`);
      return NextResponse.redirect(newUrl);
    }
  }

  // Use intl middleware for other paths
  return continueWithIntlMiddleware(request, requestHeaders, detectedLocale, pathname);
}

export const config = {
  // Match all paths except api routes, _next, static files, worksheet resources, blog assets, image files, and app routes (dashboard is INCLUDED for i18n)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|sitemap-images.xml|sitemap-news.xml|sitemap_index.xml|feed.xml|.*\\.(?:png|jpg|jpeg|svg|ico|webp|gif|pdf)$|samples|worksheet-generators|worksheet-images|worksheet-samples|homepage-content-manager.*\\.html|images|test-.*\\.html|js|uploads|upload|static-page-manager\\.html|page-manager\\.html|easy-page-manager\\.html|simple-upload\\.html|simple-upload|admin|settings|notifications|collaboration|testing|search|blog/pdfs|blog/thumbnails|blog/images).*)',
  ]
};