import { getTranslations } from 'next-intl/server';

export default async function LicensePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'license' });

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
        </div>
      </div>
    </div>
  );
}