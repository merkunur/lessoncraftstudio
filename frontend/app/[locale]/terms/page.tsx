import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getRecentBlogPosts } from '@/lib/blog-data';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const t = await getTranslations({ locale, namespace: 'terms' });

  // Generate hreflang alternates with proper regional codes (pt-BR, es-MX)
  const locales = SUPPORTED_LOCALES;
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of locales) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}/terms`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/terms`;

  // SEO: Add brand name to title for better SERP recognition
  const pageTitle = `${t('title')} | LessonCraftStudio`;

  return {
    title: pageTitle,
    description: t('acceptance.content'),
    alternates: {
      canonical: `${baseUrl}/${locale}/terms`,
      languages: hreflangAlternates
    },
    openGraph: {
      title: pageTitle,
      description: t('acceptance.content'),
      type: 'website',
      url: `${baseUrl}/${locale}/terms`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: locales.filter(l => l !== locale).map(l => ogLocaleMap[l] || l)
    }
  };
}

// Localized labels for the Related Articles section on legal pages
const relatedArticlesLabels: Record<string, string> = {
  en: 'From Our Blog',
  de: 'Aus unserem Blog',
  fr: 'De notre blog',
  es: 'De nuestro blog',
  pt: 'Do nosso blog',
  it: 'Dal nostro blog',
  nl: 'Van onze blog',
  sv: 'Fr\u00e5n v\u00e5r blogg',
  da: 'Fra vores blog',
  no: 'Fra v\u00e5r blogg',
  fi: 'Blogistamme'
};

const readMoreLabels: Record<string, string> = {
  en: 'Read More \u2192',
  de: 'Weiterlesen \u2192',
  fr: 'Lire Plus \u2192',
  es: 'Leer M\u00e1s \u2192',
  pt: 'Ler Mais \u2192',
  it: 'Leggi di Pi\u00f9 \u2192',
  nl: 'Lees Meer \u2192',
  sv: 'L\u00e4s Mer \u2192',
  da: 'L\u00e6s Mere \u2192',
  no: 'Les Mer \u2192',
  fi: 'Lue Lis\u00e4\u00e4 \u2192'
};

export default async function TermsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'terms' });

  // Fetch 3 recent blog posts for internal linking (SEO)
  let recentPosts: Awaited<ReturnType<typeof getRecentBlogPosts>> = [];
  try {
    recentPosts = await getRecentBlogPosts(locale, 3);
  } catch (err) {
    // Non-critical - page still renders without blog links
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            <span className="font-semibold">{t('lastUpdated')}:</span> {t('effectiveDate')}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('acceptance.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('acceptance.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('serviceDescription.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('serviceDescription.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('userAccounts.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('userAccounts.requirements')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t('userAccounts.age')}</li>
                <li>{t('userAccounts.accurate')}</li>
                <li>{t('userAccounts.security')}</li>
                <li>{t('userAccounts.responsible')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('paymentTerms.title')}
              </h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t('paymentTerms.pricing')}</li>
                <li>{t('paymentTerms.billing')}</li>
                <li>{t('paymentTerms.refunds')}</li>
                <li>{t('paymentTerms.changes')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('acceptableUse.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('acceptableUse.prohibited')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t('acceptableUse.illegal')}</li>
                <li>{t('acceptableUse.harmful')}</li>
                <li>{t('acceptableUse.infringement')}</li>
                <li>{t('acceptableUse.system')}</li>
                <li>{t('acceptableUse.resale')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('intellectualProperty.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('intellectualProperty.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('termination.title')}
              </h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t('termination.user')}</li>
                <li>{t('termination.company')}</li>
                <li>{t('termination.effect')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('disclaimers.title')}
              </h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t('disclaimers.asis')}</li>
                <li>{t('disclaimers.availability')}</li>
                <li>{t('disclaimers.suitability')}</li>
                <li>{t('disclaimers.content')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('limitationLiability.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('limitationLiability.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('indemnification.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('indemnification.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('governingLaw.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('governingLaw.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('changes.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('changes.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('contact.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('contact.content')}
              </p>
            </section>
          </div>

          {/* Related Blog Articles - SEO internal linking */}
          {recentPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {relatedArticlesLabels[locale] || 'From Our Blog'}
              </h2>
              <div className="grid gap-4">
                {recentPosts.map(post => (
                  <Link
                    key={post.slug}
                    href={`/${locale}/blog/${post.slug}`}
                    className="block p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {readMoreLabels[locale] || 'Read More \u2192'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}