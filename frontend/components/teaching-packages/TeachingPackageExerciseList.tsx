import { getTranslations } from 'next-intl/server';
import type { TeachingPackage, ComposedExercise } from '@/lib/teaching-packages/teaching-package-loader';

interface Props {
  pkg: TeachingPackage;
  locale: string;
}

function formatParameters(params: Record<string, unknown> | undefined): string {
  if (!params) return '';
  return Object.entries(params)
    .filter(([key]) => key !== 'languageSelect' && key !== 'exerciseMode')
    .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
    .join(' · ');
}

export default async function TeachingPackageExerciseList({ pkg, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'teachingPackagePage.exercises' });
  const exercises = [...pkg.composedExercises].sort((a, b) => a.ordering - b.ordering);

  if (exercises.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">
        {t('heading')}
      </h2>
      <p className="text-sm text-ink-500 mb-4">
        {t('subheading', { count: exercises.length })}
      </p>
      <ol className="space-y-3">
        {exercises.map((ex: ComposedExercise) => (
          <li
            key={ex.ordering}
            className="p-4 rounded-md border border-cream-300 bg-white"
          >
            <header className="flex items-center justify-between mb-2 gap-3 flex-wrap">
              <h3 className="font-display font-semibold text-ink-900 flex items-center gap-2">
                <span className="text-sage-600 font-mono">{ex.ordering}.</span>
                <span>{ex.appName}</span>
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
            {ex.customizationParameters && (
              <p className="text-xs text-ink-600 font-mono mt-1 break-all">
                {formatParameters(ex.customizationParameters)}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
