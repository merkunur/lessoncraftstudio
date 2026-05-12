import { getTranslations } from 'next-intl/server';

const CDN_BASE = 'https://www.lessoncraftstudio.com/materials/vocabulary-tracing-strips';

interface Props {
  locale: string;
  packageSlug: string;
  stripCount?: number;
}

export default async function TeachingPackageVocabularyTracingStripsSection({
  locale,
  packageSlug,
  stripCount,
}: Props) {
  const t = await getTranslations({
    locale,
    namespace: 'teachingPackagePage.vocabularyTracingStrips',
  });
  const printUrl = `${CDN_BASE}/${locale}/${packageSlug}/print-vocabulary-tracing-strips.pdf`;

  return (
    <section id="vocabulary-tracing-strips" className="mb-10 scroll-mt-6">
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">
        {t('heading')}
      </h2>
      <p className="text-sm text-ink-500 mb-6">{t('subheading')}</p>
      <div className="rounded-lg border border-cream-300 bg-cream-50 p-6">
        <p className="text-sm text-ink-700 mb-4">{t('description')}</p>
        {stripCount && (
          <p className="text-xs text-ink-500 mb-4 font-mono">{stripCount} strips</p>
        )}
        <a
          href={printUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center px-4 py-2 rounded-md bg-sage-400 text-cream-50 font-semibold hover:bg-sage-500 transition"
        >
          {t('downloadButton')}
        </a>
      </div>
    </section>
  );
}
