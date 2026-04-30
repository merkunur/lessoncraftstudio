import { getTranslations } from 'next-intl/server';

// Section 3 German comparison panel per HOMEPAGE-COPY.md + HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.3.
// Side-by-side worksheet excerpts: auto-translated (left, wrong) vs LessonCraftStudio (right, correct).
// Annotations point from each correction on the right side at the corrected token.
// Mobile (<768px): vertical stack with wrong-version above corrected-version.
// Accessibility: aria-label on the outer figure; corrections rendered as real text (not path-traced).

export default async function GermanComparison({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.languageProof.german' });

  return (
    <figure
      role="figure"
      aria-label={t('ariaLabel')}
      className="mt-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* LEFT — auto-translated worksheet excerpt (wrong) */}
        <div className="rounded-md bg-cream-50 border border-cream-300 p-8">
          <div className="text-xs uppercase tracking-wide text-ink-500 font-medium mb-6">
            Auto-translated
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-xs text-ink-500 mb-1">Singular</div>
              <div className="font-display text-2xl text-terracotta-500">
                <span className="line-through decoration-terracotta-400 decoration-2">der</span>{' '}
                <span className="line-through decoration-terracotta-400 decoration-2">schule</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-ink-500 mb-1">Plural</div>
              <div className="font-display text-2xl text-terracotta-500">
                <span className="line-through decoration-terracotta-400 decoration-2">schules</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — LessonCraftStudio version (correct) with inline annotations */}
        <div className="rounded-md bg-cream-50 border-2 border-ink-900 p-8 relative">
          <div className="text-xs uppercase tracking-wide text-ink-900 font-semibold mb-6">
            LessonCraftStudio
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-xs text-ink-500 mb-1">Singular</div>
              <div className="font-display text-2xl text-ink-900">
                <span className="px-1 -mx-1 bg-sage-50 ring-2 ring-sage-300 rounded">die</span>{' '}
                <span className="px-1 -mx-1 bg-sage-50 ring-2 ring-sage-300 rounded">Schule</span>
              </div>
              <p className="mt-3 text-sm text-ink-600 leading-relaxed border-l-2 border-sage-300 pl-3">
                {t('annotation2')}
              </p>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed border-l-2 border-sage-300 pl-3">
                {t('annotation1')}
              </p>
            </div>
            <div>
              <div className="text-xs text-ink-500 mb-1">Plural</div>
              <div className="font-display text-2xl text-ink-900">
                <span className="text-ink-500">die</span>{' '}
                <span className="px-1 -mx-1 bg-sage-50 ring-2 ring-sage-300 rounded">Schulen</span>
              </div>
              <p className="mt-3 text-sm text-ink-600 leading-relaxed border-l-2 border-sage-300 pl-3">
                {t('annotation3')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
