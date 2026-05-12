import { getTranslations } from 'next-intl/server';
import type { TeachingPackage, ComposedExercise } from '@/lib/teaching-packages/teaching-package-loader';
import { fetchDecksForAxis, type TopicDeckSummary } from '@/lib/topic-decks';

interface Props {
  pkg: TeachingPackage;
  locale: string;
}

function localizedTitle(title: unknown, locale: string): string {
  if (!title || typeof title !== 'object') return '';
  const obj = title as Record<string, string>;
  return obj[locale] || obj.en || Object.values(obj)[0] || '';
}

function formatParameters(params: Record<string, unknown> | undefined): string {
  if (!params) return '';
  return Object.entries(params)
    .filter(([key]) => key !== 'languageSelect' && key !== 'exerciseMode')
    .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
    .join(' · ');
}

/**
 * Pick a representative deck for an exercise. Tries:
 *   1. Match exact (exerciseMode, theme) if both present in package
 *   2. Match exerciseMode only (if present)
 *   3. Match theme only (subjectTags includes themeSelect) — F5 Path B fallback
 *      that disambiguates slots whose YAML exerciseMode has no matching deck in
 *      the production catalog (e.g., count-objects-1-to-10's "unified"-mode
 *      slots whose catalog match falls through to first letter-spotting deck).
 *   4. First available
 * Returns null if no published deck found in locale catalog.
 */
function pickSampleDeck(
  decks: TopicDeckSummary[],
  exerciseMode: string | undefined,
  themeSelect: string | undefined
): TopicDeckSummary | null {
  if (decks.length === 0) return null;
  if (exerciseMode && themeSelect) {
    const exact = decks.find(
      (d) => d.exerciseMode === exerciseMode && d.subjectTags.includes(themeSelect)
    );
    if (exact) return exact;
  }
  if (exerciseMode) {
    const exact = decks.find((d) => d.exerciseMode === exerciseMode);
    if (exact) return exact;
  }
  if (themeSelect) {
    const themeMatch = decks.find((d) => d.subjectTags.includes(themeSelect));
    if (themeMatch) return themeMatch;
  }
  return decks[0];
}

export default async function TeachingPackageExerciseList({ pkg, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'teachingPackagePage.exercises' });
  const exercises = [...pkg.composedExercises].sort((a, b) => a.ordering - b.ordering);

  if (exercises.length === 0) return null;

  // Fetch sample decks per unique appName (deduped to single DB query per app)
  const uniqueApps = Array.from(new Set(exercises.map((e) => e.appName)));
  const deckMap = new Map<string, TopicDeckSummary[]>();
  await Promise.all(
    uniqueApps.map(async (app) => {
      try {
        const decks = await fetchDecksForAxis('exercise-type', app, locale);
        deckMap.set(app, decks);
      } catch {
        deckMap.set(app, []);
      }
    })
  );

  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">
        {t('heading')}
      </h2>
      <p className="text-sm text-ink-500 mb-4">
        {t('subheading', { count: exercises.length })}
      </p>
      <ol className="space-y-3">
        {exercises.map((ex: ComposedExercise) => {
          const decks = deckMap.get(ex.appName) || [];
          const themeSelect = ex.customizationParameters?.themeSelect as string | undefined;
          const sample = pickSampleDeck(decks, ex.exerciseMode, themeSelect);
          const deckUrl = sample ? `/${locale}/decks/${sample.slug}/` : null;
          const topicUrl = `/${locale}/topic/${ex.appName}`;
          const sampleTitle = sample ? localizedTitle(sample.title, locale) : null;

          return (
            <li
              key={ex.ordering}
              className="rounded-md border border-cream-300 bg-white overflow-hidden hover:border-sage-400 transition"
            >
              <a
                href={deckUrl ?? topicUrl}
                className="flex flex-col sm:flex-row gap-4 p-4 group"
              >
                {sample?.thumbnailUrl ? (
                  <img
                    src={sample.thumbnailUrl}
                    alt=""
                    className="w-full sm:w-32 h-32 object-cover rounded border border-cream-200 bg-cream-50 flex-shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full sm:w-32 h-32 rounded border border-cream-200 bg-cream-100 flex items-center justify-center text-ink-400 text-xs text-center px-2 flex-shrink-0">
                    {t('noSamplePreview')}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <header className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                    <h3 className="font-display font-semibold text-ink-900 flex items-center gap-2 flex-wrap">
                      <span className="text-sage-600 font-mono">{ex.ordering}.</span>
                      <span className="group-hover:text-sage-700 transition">{ex.appName}</span>
                      {ex.exerciseMode && (
                        <span className="text-xs text-ink-500 font-normal font-mono">
                          [{ex.exerciseMode}]
                        </span>
                      )}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-terracotta-100 text-terracotta-700 text-xs font-medium">
                      {ex.pedagogicalRole}
                    </span>
                  </header>
                  {sampleTitle && (
                    <p className="text-sm text-ink-700 mb-2 line-clamp-2">
                      {t('sampleLabel')}: {sampleTitle}
                    </p>
                  )}
                  {ex.customizationParameters && (
                    <p className="text-xs text-ink-500 font-mono break-all">
                      {formatParameters(ex.customizationParameters)}
                    </p>
                  )}
                  <p className="text-xs text-sage-600 mt-2 font-medium">
                    {deckUrl ? t('openDeck') : t('viewTopic')} →
                  </p>
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
