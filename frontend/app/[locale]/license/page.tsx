import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getRecentBlogPosts } from '@/lib/blog-data';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const t = await getTranslations({ locale, namespace: 'license' });

  // Generate hreflang alternates with proper regional codes (pt-BR, es-MX)
  const locales = SUPPORTED_LOCALES;
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of locales) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}/license`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/license`;

  // SEO: Use dedicated meta keys when available, fallback to content strings for non-EN locales
  const pageTitle = t.has('metaTitle') ? t('metaTitle') : t('title');
  const pageDescription = t.has('metaDescription') ? t('metaDescription') : t('grantOfLicense.intro');

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/license`,
      languages: hreflangAlternates
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: `${baseUrl}/${locale}/license`,
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
  sv: 'Från vår blogg',
  da: 'Fra vores blog',
  no: 'Fra vår blogg',
  fi: 'Blogistamme'
};

const readMoreLabels: Record<string, string> = {
  en: 'Read More →',
  de: 'Weiterlesen →',
  fr: 'Lire Plus →',
  es: 'Leer Más →',
  pt: 'Ler Mais →',
  it: 'Leggi di Più →',
  nl: 'Lees Meer →',
  sv: 'Läs Mer →',
  da: 'Læs Mere →',
  no: 'Les Mer →',
  fi: 'Lue Lisää →'
};

export default async function LicensePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'license' });

  // Fetch 3 recent blog posts for internal linking (SEO)
  let recentPosts: Awaited<ReturnType<typeof getRecentBlogPosts>> = [];
  try {
    recentPosts = await getRecentBlogPosts(locale, 3);
  } catch (err) {
    console.error(`Failed to fetch blog posts for ${locale} on license page:`, err);
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
                {t('grantOfLicense.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('grantOfLicense.intro')}
              </p>
              <div className="space-y-3 pl-4">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">• {t('grantOfLicense.freeTier')}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">• {t('grantOfLicense.coreBundle')}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">• {t('grantOfLicense.fullAccess')}</span>
                </p>
              </div>
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
                {t('restrictions.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {t('restrictions.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                <li>{t('restrictions.reverseEngineer')}</li>
                <li>{t('restrictions.competing')}</li>
                <li>{t('restrictions.sublicense')}</li>
                <li>{t('restrictions.removeNotices')}</li>
                <li>{t('restrictions.illegal')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('commercialDistribution.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                <span className="font-semibold">{t('commercialDistribution.pod')}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">{t('commercialDistribution.digital')}</span>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('termination.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('termination.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('warrantyDisclaimer.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('warrantyDisclaimer.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {t('limitationOfLiability.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('limitationOfLiability.content')}
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
                {t('modifications.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('modifications.content')}
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
                      {readMoreLabels[locale] || 'Read More →'}
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