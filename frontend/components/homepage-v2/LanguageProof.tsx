import { getTranslations } from 'next-intl/server';
import GermanComparison from './GermanComparison';
import FrenchComparison from './FrenchComparison';

// Section 3 — Language proof per HOMEPAGE-COPY.md + HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.3.
// Section title + intro + sub-intro + German panel + French panel + closing line.
// Server component; sub-panels are also server-rendered (no client interactivity in this section).

export default async function LanguageProof({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.languageProof' });
  const tGerman = await getTranslations({ locale, namespace: 'homepage.languageProof.german' });
  const tFrench = await getTranslations({ locale, namespace: 'homepage.languageProof.french' });

  return (
    <section id="language-proof" className="bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-2">
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-gray-900 tracking-tight">
            {t('sectionTitle')}
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            {t('intro')}
          </p>
          <p className="mt-4 text-base text-gray-500 italic">
            {t('subIntro')}
          </p>
        </div>

        <div className="mt-12">
          <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
            {tGerman('heading')}
          </h3>
          <GermanComparison locale={locale} />
        </div>

        <div className="mt-16">
          <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
            {tFrench('heading')}
          </h3>
          <FrenchComparison locale={locale} />
        </div>

        <p className="mt-16 max-w-3xl text-lg text-gray-700 leading-relaxed font-medium">
          {t('closingLine')}
        </p>
      </div>
    </section>
  );
}
