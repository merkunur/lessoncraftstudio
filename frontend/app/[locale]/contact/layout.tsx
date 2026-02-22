import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getHreflangCode, ogLocaleMap, generateStaticPageSchemas } from '@/lib/schema-generator';
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

export default async function ContactLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'contact' });

  const pageTitle = t.has('metaTitle') ? t('metaTitle') : `${t('title')} | LessonCraftStudio`;
  const pageDescription = t.has('metaDescription') ? t('metaDescription') : t('subtitle');
  const schemas = generateStaticPageSchemas({
    pagePath: '/contact',
    pageName: pageTitle,
    pageDescription,
    locale,
    pageType: 'ContactPage',
    dateModified: '2026-02-22'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      {children}
    </>
  );
}
