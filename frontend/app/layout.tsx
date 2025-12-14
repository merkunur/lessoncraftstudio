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