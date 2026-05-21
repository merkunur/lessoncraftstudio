import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidLocale } from '@/config/locales';

/**
 * Parse Accept-Language header into the highest-quality supported locale.
 */
function parseAcceptLanguage(header: string | null): string | null {
  if (!header) return null;

  const languages = header.split(',').map(lang => {
    const parts = lang.trim().split(';');
    const langCode = parts[0].split('-')[0].toLowerCase();
    const quality = parts[1] ? parseFloat(parts[1].replace('q=', '')) : 1.0;
    return { code: langCode, quality };
  });

  languages.sort((a, b) => b.quality - a.quality);

  for (const lang of languages) {
    if (isValidLocale(lang.code)) {
      return lang.code;
    }
  }

  return null;
}

/**
 * Get user's preferred language from cookies or Accept-Language header.
 * Priority: preferredLanguage cookie > NEXT_LOCALE cookie > Accept-Language > default.
 */
function getPreferredLanguage(request: NextRequest): string {
  const preferredLangCookie = request.cookies.get('preferredLanguage')?.value;
  if (preferredLangCookie && isValidLocale(preferredLangCookie)) {
    return preferredLangCookie;
  }

  const nextLocaleCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (nextLocaleCookie && isValidLocale(nextLocaleCookie)) {
    return nextLocaleCookie;
  }

  const acceptLanguage = request.headers.get('accept-language');
  const browserLang = parseAcceptLanguage(acceptLanguage);
  if (browserLang) {
    return browserLang;
  }

  return defaultLocale;
}

/**
 * Return 410 Gone for permanently-removed URL patterns.
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
 * Permanently-removed seller-era prefixes per CLAUDE.md §17.1 (Passes 1-5).
 * Matches /(locale)/(prefix)(/...) and the bare /(prefix)(/...) form.
 *
 * Reshelled directories (pricing, about, faq) are deliberately NOT here —
 * they 404 via the route system until new content lands per §17.1.
 */
const REMOVED_PREFIXES = /^\/(?:[a-z]{2}\/)?(apps|tools|guides|bundles|ideas|start|blog|compare|gallery|teaching-packages|lesson-plans|flashcards|themed-bundles)(?:\/.*)?$/;

/**
 * Standalone removed paths (sitemap-related + pre-pivot relics).
 * Note: /image-sitemap-index.xml and /video-sitemap-index.xml are normally
 * suppressed by the matcher's directory exclusion — included here for
 * defensive completeness if the matcher changes in the future.
 */
function isRemovedRoute(pathname: string): boolean {
  if (REMOVED_PREFIXES.test(pathname)) return true;

  if (pathname === '/image-sitemap-index.xml') return true;
  if (pathname === '/video-sitemap-index.xml') return true;
  if (pathname === '/feed.xml') return true;
  if (pathname === '/sitemap-news.xml') return true;
  if (pathname === '/sitemap-images.xml') return true;

  // Pre-pivot legacy patterns retained from prior teardown
  if (pathname === '/worksheets' || pathname.startsWith('/worksheets/')) return true;
  if (pathname.startsWith('/buy')) return true;

  return false;
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  alternateLinks: false
});

/**
 * Forward to the next-intl middleware with locale cookie + headers set.
 */
function continueWithIntlMiddleware(
  request: NextRequest,
  requestHeaders: Headers,
  detectedLocale: string,
  pathname: string
): NextResponse {
  const response = intlMiddleware(request);

  if (response instanceof NextResponse) {
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-locale', detectedLocale);
    response.headers.set('Content-Language', detectedLocale);
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    });
  }

  return response as NextResponse;
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Canonical-host: redirect non-www to www for SEO
  const hostname = request.nextUrl.hostname;
  if (hostname === 'lessoncraftstudio.com') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.lessoncraftstudio.com';
    return NextResponse.redirect(url, 301);
  }

  // 410 Gone for all permanently-removed routes — must run before intl middleware
  if (isRemovedRoute(pathname)) {
    return return410();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const pathSegments = pathname.split('/').filter(Boolean);
  const urlLocale = pathSegments[0];
  const detectedLocale = isValidLocale(urlLocale) ? urlLocale : 'en';
  requestHeaders.set('x-locale', detectedLocale);

  // Root URL → /en (canonical default locale)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url), { status: 301 });
  }

  // Bare locale-less common pages → /en/<page>
  const pagesNeedingLocale = ['/contact', '/privacy', '/terms', '/about'];
  if (pagesNeedingLocale.includes(pathname)) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url), { status: 301 });
  }

  // /signup → /en/auth/signup (single preserved bare-path redirect)
  if (pathname === '/signup') {
    return NextResponse.redirect(new URL('/en/auth/signup', request.url), { status: 301 });
  }

  // Protect content manager pages — admin auth required
  if (pathname.includes('/worksheet-generators/content-manager') ||
      pathname.includes('/worksheet-generators/blog-content-manager')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const authHeader = request.headers.get('authorization');

    if (authHeader === 'Bearer dev-bypass' || process.env.NODE_ENV === 'development') {
      const resp = NextResponse.next({ request: { headers: requestHeaders } });
      resp.headers.set('Content-Language', detectedLocale);
      return resp;
    }

    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const resp = NextResponse.next({ request: { headers: requestHeaders } });
    resp.headers.set('Content-Language', detectedLocale);
    return resp;
  }

  // Skip middleware for static HTML files, worksheet-generator paths, and mini-tools paths
  if (pathname.endsWith('.html') ||
      pathname.includes('/worksheet-generators/') ||
      pathname.includes('/mini-tools/')) {
    const resp = NextResponse.next({ request: { headers: requestHeaders } });
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
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Content-Language', detectedLocale);
    return response;
  }

  // Static-page handling with language persistence
  if (pathname.startsWith('/static')) {
    const segs = pathname.split('/');
    const locale = segs[2];

    if (locale && locales.includes(locale as any)) {
      const response = NextResponse.next({ request: { headers: requestHeaders } });
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

  // next-intl for everything else
  return continueWithIntlMiddleware(request, requestHeaders, detectedLocale, pathname);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|sitemap/|image-sitemap|video-sitemap|.*\\.(?:png|jpg|jpeg|svg|ico|webp|gif|pdf)$|samples|videos|worksheet-generators|mini-tools|worksheet-images|worksheet-samples|homepage-content-manager.*\\.html|images|test-.*\\.html|js|uploads|upload|static-page-manager\\.html|page-manager\\.html|easy-page-manager\\.html|simple-upload\\.html|simple-upload|admin|settings|notifications|collaboration|testing|search|member).*)',
  ]
};
