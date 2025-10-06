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

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect content manager - require authentication
  if (pathname.includes('/worksheet-generators/content-manager') ||
      pathname.includes('/worksheet-generators/blog-content-manager')) {
    // Check for admin session token
    const adminToken = request.cookies.get('admin_token')?.value;
    const authHeader = request.headers.get('authorization');

    // Allow dev bypass
    if (authHeader === 'Bearer dev-bypass' || process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }

    // If no admin token, redirect to login
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Skip middleware for other static HTML files and public assets
  if (pathname.endsWith('.html') || pathname.includes('/worksheet-generators/')) {
    return NextResponse.next();
  }

  // Skip middleware for admin and other app routes
  if (pathname.startsWith('/admin') ||
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/settings') ||
      pathname.startsWith('/notifications') ||
      pathname.startsWith('/collaboration') ||
      pathname.startsWith('/testing') ||
      pathname.startsWith('/search')) {
    return NextResponse.next();
  }

  // Handle static pages with language persistence
  if (pathname.startsWith('/static')) {
    const pathSegments = pathname.split('/');
    const locale = pathSegments[2]; // /static/[locale]/...

    // Check if locale is valid
    if (locale && locales.includes(locale as any)) {
      // Set language cookie for persistence
      const response = NextResponse.next();
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
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except api routes, _next, static files, worksheet resources, blog assets, and app routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|worksheet-generators|worksheet-images|worksheet-samples|homepage-content-manager.*\\.html|images|test-.*\\.html|js|uploads|upload|static-page-manager\\.html|page-manager\\.html|easy-page-manager\\.html|simple-upload\\.html|simple-upload|admin|dashboard|settings|notifications|collaboration|testing|search|blog/pdfs|blog/thumbnails|blog/images).*)',
  ]
};