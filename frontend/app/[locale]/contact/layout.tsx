import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const t = await getTranslations({ locale, namespace: 'contact' });

  // Generate hreflang alternates with proper regional codes (pt-BR, es-MX)
  const locales = SUPPORTED_LOCALES;
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of locales) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}/contact`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/contact`;

  // SEO: Add brand name to title for better SERP recognition
  const pageTitle = `${t('title')} | LessonCraftStudio`;

  return {
    title: pageTitle,
    description: t('subtitle'),
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: hreflangAlternates
    },
    openGraph: {
      title: pageTitle,
      description: t('subtitle'),
      type: 'website',
      url: `${baseUrl}/${locale}/contact`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: locales.filter(l => l !== locale).map(l => ogLocaleMap[l] || l)
    }
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
