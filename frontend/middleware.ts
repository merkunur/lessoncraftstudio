import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  const validLocales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
  const detectedLocale = validLocales.includes(urlLocale) ? urlLocale : 'en';

  // Handle blog post redirects for wrong language prefixes (SEO fix for old Google-indexed URLs)
  // Pattern: /xx/blog/slug where xx is a valid locale
  if (pathname.match(/^\/[a-z]{2}\/blog\/[^/]+$/) && validLocales.includes(urlLocale)) {
    const slug = pathSegments[2];

    // Call API to check which language this slug actually belongs to
    const checkUrl = new URL('/api/blog/check-slug-language', request.url);
    checkUrl.searchParams.set('slug', slug);
    checkUrl.searchParams.set('locale', urlLocale);

    // Use fetch to check - wrapped in try/catch to not block on errors
    return fetch(checkUrl.toString())
      .then(async (checkResponse) => {
        if (checkResponse.ok) {
          const { correctLocale } = await checkResponse.json();
          if (correctLocale && correctLocale !== urlLocale) {
            // Slug belongs to a different language - redirect with 301
            const redirectUrl = new URL(`/${correctLocale}/blog/${slug}`, request.url);
            return NextResponse.redirect(redirectUrl, 301);
          }
        }
        // No redirect needed - continue with normal middleware
        return continueWithIntlMiddleware(request, requestHeaders, detectedLocale, pathname);
      })
      .catch(() => {
        // On error, continue normally
        return continueWithIntlMiddleware(request, requestHeaders, detectedLocale, pathname);
      });
  }

  // Redirect common pages without locale to default locale
  const pagesNeedingLocale = ['/contact', '/pricing', '/privacy', '/terms', '/about'];
  if (pagesNeedingLocale.includes(pathname)) {
    const preferredLang = request.cookies.get('preferredLanguage')?.value || defaultLocale;
    const newUrl = new URL(`/${preferredLang}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
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
      // Try to get preferred language from cookie
      const preferredLang = request.cookies.get('preferredLanguage')?.value || defaultLocale;

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
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|ico|webp|gif)$|worksheet-generators|worksheet-images|worksheet-samples|homepage-content-manager.*\\.html|images|test-.*\\.html|js|uploads|upload|static-page-manager\\.html|page-manager\\.html|easy-page-manager\\.html|simple-upload\\.html|simple-upload|admin|settings|notifications|collaboration|testing|search|blog/pdfs|blog/thumbnails|blog/images).*)',
  ]
};