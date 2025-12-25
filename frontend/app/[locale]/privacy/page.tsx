import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: t('title'),
    description: t('introduction.content'),
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy`,
      languages: {
        'en': `${baseUrl}/en/privacy`,
        'de': `${baseUrl}/de/privacy`,
        'fr': `${baseUrl}/fr/privacy`,
        'es': `${baseUrl}/es/privacy`,
        'pt': `${baseUrl}/pt/privacy`,
        'it': `${baseUrl}/it/privacy`,
        'nl': `${baseUrl}/nl/privacy`,
        'sv': `${baseUrl}/sv/privacy`,
        'da': `${baseUrl}/da/privacy`,
        'no': `${baseUrl}/no/privacy`,
        'fi': `${baseUrl}/fi/privacy`,
        'x-default': `${baseUrl}/en/privacy`
      }
    },
    openGraph: {
      title: t('title'),
      description: t('introduction.content'),
      type: 'website',
      url: `${baseUrl}/${locale}/privacy`,
      siteName: 'LessonCraftStudio',
      locale: locale,
      alternateLocale: ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].filter(l => l !== locale)
    }
  };
}

export default async function PrivacyPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'privacy' });

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
        </div>
      </div>
    </div>
  );
}