'use client';

import { Inter, Poppins } from 'next/font/google';
import { notFound, usePathname } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState } from 'react';
import { locales } from '@/i18n/request';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '../providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const pathname = usePathname();
  const [messages, setMessages] = useState<any>(null);

  // Check if we're on an apps route
  const isAppsRoute = pathname?.includes('/apps/');

  useEffect(() => {
    async function loadMessages() {
      try {
        const msgs = await import(`@/messages/${locale}.json`);
        setMessages(msgs.default);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    }
    loadMessages();
  }, [locale]);

  if (!locales.includes(locale as any)) {
    notFound();
  }

  if (!messages) {
    return null; // or a loading spinner
  }

  // Apps routes: Scrollable page, no Footer
  if (isAppsRoute) {
    return (
      <html lang={locale} className={`${inter.variable} ${poppins.variable}`}>
        <body className="min-h-screen bg-gray-50 font-sans">
          <Providers>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Navigation />
              <main>
                {children}
              </main>
            </NextIntlClientProvider>
          </Providers>
        </body>
      </html>
    );
  }

  // Other routes: Normal document flow with Footer
  return (
    <html lang={locale} className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans">
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
