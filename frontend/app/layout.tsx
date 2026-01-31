import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import { Providers } from './providers';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isValidLocale } from '@/config/locales';
import { PinterestTag } from '@/components/tracking';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get locale from cookie set by middleware for correct html lang attribute (SEO)
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const lang = localeCookie && isValidLocale(localeCookie) ? localeCookie : DEFAULT_LOCALE;

  return (
    <html lang={lang}>
      <head>
        {/* Pinterest domain verification */}
        <meta name="p:domain_verify" content="34709a2d6e6ac6f75758fd66a8c50cbf" />

        {/* Resource hints for improved performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.lessoncraftstudio.com" />
        {/* YouTube preconnects for faster video loading */}
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="preload" as="image" href="/opengraph-image.png" />
        {/* RSS feed for blog discovery */}
        <link rel="alternate" type="application/rss+xml" title="LessonCraftStudio Blog RSS" href="/feed.xml" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} min-h-screen bg-gray-50 font-sans`}>
        <Providers>
          {children}
        </Providers>
        {/* Conversion tracking */}
        <PinterestTag />
      </body>
    </html>
  );
}