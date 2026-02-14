import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { headers } from 'next/headers';
import { getLocale } from 'next-intl/server';
import './globals.css';
import { Providers } from './providers';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isValidLocale } from '@/config/locales';
import { getHreflangCode } from '@/lib/schema-generator';
import { PinterestTag } from '@/components/tracking';
import { NavigationProgress } from '@/components/NavigationProgress';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com'),
  title: 'LessonCraftStudio - Professional Worksheet Generator',
  description: '33 powerful worksheet generators with 100+ themed images for Teachers Pay Teachers sellers and educational publishers',
  keywords: 'worksheet generator, teachers pay teachers, educational resources, printable worksheets, POD license',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '64x64', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'LessonCraftStudio - Professional Worksheet Generator',
    description: '33 powerful worksheet generators with 100+ themed images for Teachers Pay Teachers sellers and educational publishers',
    siteName: 'LessonCraftStudio',
    images: [
      {
        url: '/opengraph-image.png',
        width: 512,
        height: 512,
        alt: 'LessonCraftStudio Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'LessonCraftStudio - Professional Worksheet Generator',
    description: '33 powerful worksheet generators with 100+ themed images for Teachers Pay Teachers sellers and educational publishers',
    images: ['/opengraph-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get locale for <html lang> — critical for SEO (Googlebot uses this)
  // Priority: x-locale header (pre-validated) > x-pathname parse > next-intl > default
  let lang: string = DEFAULT_LOCALE;
  try {
    const headersList = headers();
    // 1. Direct locale header set by middleware (most reliable — no parsing needed)
    const xLocale = headersList.get('x-locale');
    if (xLocale && isValidLocale(xLocale)) {
      lang = xLocale;
    } else {
      // 2. Parse from pathname header (fallback)
      const pathname = headersList.get('x-pathname') || '';
      const pathLocale = pathname.split('/').filter(Boolean)[0];
      if (pathLocale && isValidLocale(pathLocale)) {
        lang = pathLocale;
      } else {
        // 3. next-intl context (last resort before default)
        lang = await getLocale();
        if (!isValidLocale(lang)) lang = DEFAULT_LOCALE;
      }
    }
  } catch {
    lang = DEFAULT_LOCALE;
  }

  return (
    <html lang={getHreflangCode(lang)}>
      <head>
        {/* Pinterest domain verification */}
        <meta name="p:domain_verify" content="34709a2d6e6ac6f75758fd66a8c50cbf" />

        {/* YouTube preconnects moved to VideoLightbox component — only needed when video is present */}
        {/* M5: Removed vestigial Google Fonts preconnects (next/font self-hosts) and self dns-prefetch */}
        {/* RSS feed for blog discovery */}
        <link rel="alternate" type="application/rss+xml" title="LessonCraftStudio Blog RSS" href="/feed.xml" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} min-h-screen bg-gray-50 font-sans`}>
        <NavigationProgress />
        <Providers>
          {children}
        </Providers>
        {/* Conversion tracking */}
        <PinterestTag />
      </body>
    </html>
  );
}