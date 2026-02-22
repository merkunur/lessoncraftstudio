import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
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

  // SEO: Use dedicated meta keys when available, fallback to content strings for non-EN locales
  const pageTitle = t.has('metaTitle') ? t('metaTitle') : `${t('title')} | LessonCraftStudio`;
  const pageDescription = t.has('metaDescription') ? t('metaDescription') : t('subtitle');

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: hreflangAlternates
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: `${baseUrl}/${locale}/contact`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: locales.filter(l => l !== locale).map(l => ogLocaleMap[l] || l)
    }
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
