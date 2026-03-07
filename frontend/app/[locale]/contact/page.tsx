import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap, generateStaticPageSchemas } from '@/lib/schema-generator';
import ContactForm from './ContactForm';

const baseUrl = 'https://www.lessoncraftstudio.com';

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'contact' });

  const pageTitle = t.has('metaTitle') ? t('metaTitle') : `${t('title')} | LessonCraftStudio`;
  const pageDescription = t.has('metaDescription') ? t('metaDescription') : t('subtitle');

  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/contact`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/contact`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: `${baseUrl}/${locale}/contact`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

export default async function ContactPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'contact' });

  const pageTitle = t.has('metaTitle') ? t('metaTitle') : `${t('title')} | LessonCraftStudio`;
  const pageDescription = t.has('metaDescription') ? t('metaDescription') : t('subtitle');
  const schemas = generateStaticPageSchemas({
    pagePath: '/contact',
    pageName: pageTitle,
    pageDescription,
    locale,
    pageType: 'ContactPage',
    dateModified: '2027-03-07'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('subtitle')}
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}
