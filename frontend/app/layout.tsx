import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { headers } from 'next/headers';
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
};

// Supported locales for language detection
const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Extract locale from URL path to set correct html lang attribute
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || '';

  // Extract locale from pathname (e.g., /de/blog/... -> de)
  const pathSegments = pathname.split('/').filter(Boolean);
  const urlLocale = pathSegments[0];
  const lang = supportedLocales.includes(urlLocale) ? urlLocale : 'en';

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