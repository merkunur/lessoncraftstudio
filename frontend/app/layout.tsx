import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
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

// Supported locales for language detection
const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get locale from cookie set by middleware for correct html lang attribute (SEO)
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
  const lang = localeCookie && supportedLocales.includes(localeCookie) ? localeCookie : 'en';

  return (
    <html lang={lang}>
      <body className={`${inter.variable} ${poppins.variable} min-h-screen bg-gray-50 font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}