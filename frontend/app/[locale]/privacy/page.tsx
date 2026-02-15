import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getRecentBlogPosts } from '@/lib/blog-data';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const t = await getTranslations({ locale, namespace: 'privacy' });

  // Generate hreflang alternates with proper regional codes (pt-BR, es-MX)
  const locales = SUPPORTED_LOCALES;
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of locales) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}/privacy`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/privacy`;

  // SEO: Use dedicated meta keys when available, fallback to content strings for non-EN locales
  const pageTitle = t.has('metaTitle') ? t('metaTitle') : `${t('title')} | LessonCraftStudio`;
  const pageDescription = t.has('metaDescription') ? t('metaDescription') : t('introduction.content');

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy`,
      languages: hreflangAlternates
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: `${baseUrl}/${locale}/privacy`,
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

export default async function PrivacyPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'privacy' });

  // Fetch 3 recent blog posts for internal linking (SEO)
  let recentPosts: Awaited<ReturnType<typeof getRecentBlogPosts>> = [];
  try {
    recentPosts = await getRecentBlogPosts(locale, 3);
  } catch (err) {
    console.error(`Failed to fetch blog posts for ${locale} on privacy page:`, err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {t('title')}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('lastUpdated')}: {new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('introduction.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('introduction.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('dataController.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('dataController.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('dataCollection.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('dataCollection.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>{t('dataCollection.personal')}</li>
                <li>{t('dataCollection.usage')}</li>
                <li>{t('dataCollection.technical')}</li>
                <li>{t('dataCollection.cookies')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('legalBasis.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('legalBasis.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>{t('legalBasis.consent')}</li>
                <li>{t('legalBasis.contract')}</li>
                <li>{t('legalBasis.legal')}</li>
                <li>{t('legalBasis.legitimate')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('dataUsage.title')}
              </h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>{t('dataUsage.service')}</li>
                <li>{t('dataUsage.account')}</li>
                <li>{t('dataUsage.communication')}</li>
                <li>{t('dataUsage.improvement')}</li>
                <li>{t('dataUsage.legal')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('dataSharing.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('dataSharing.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>{t('dataSharing.providers')}</li>
                <li>{t('dataSharing.payment')}</li>
                <li>{t('dataSharing.legal')}</li>
                <li>{t('dataSharing.consent')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('dataRetention.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('dataRetention.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('userRights.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('userRights.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>{t('userRights.access')}</li>
                <li>{t('userRights.rectification')}</li>
                <li>{t('userRights.erasure')}</li>
                <li>{t('userRights.restriction')}</li>
                <li>{t('userRights.portability')}</li>
                <li>{t('userRights.objection')}</li>
                <li>{t('userRights.withdraw')}</li>
                <li>{t('userRights.complaint')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('dataSecurity.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('dataSecurity.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('cookies.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('cookies.intro')}
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>{t('cookies.essential')}</li>
                <li>{t('cookies.functional')}</li>
                <li>{t('cookies.analytics')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('children.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('children.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('international.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('international.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('changes.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('changes.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t('contact.title')}
              </h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <p>{t('contact.intro')}</p>
                <p className="font-semibold">LessonCraft Studio</p>
                <p>{t('contact.email')}: privacy@lessoncraftstudio.com</p>
                <p>{t('contact.address')}: Stockholm, Sweden</p>
                <p>{t('contact.dpo')}: dataprotection@lessoncraftstudio.com</p>
              </div>
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