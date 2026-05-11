import { getTranslations } from 'next-intl/server';
import type { TeachingPackage, PackageMaterial } from '@/lib/teaching-packages/teaching-package-loader';

interface Props {
  pkg: TeachingPackage;
  locale: string;
}

function summarizeParameters(params: Record<string, unknown> | undefined): string {
  if (!params) return '';
  const highlights: string[] = [];
  if (typeof params.cardCount === 'number') highlights.push(`${params.cardCount} cards`);
  if (typeof params.itemCount === 'number') highlights.push(`${params.itemCount} items`);
  if (typeof params.stripCount === 'number') highlights.push(`${params.stripCount} strips`);
  if (typeof params.pairCount === 'number') highlights.push(`${params.pairCount} pairs`);
  if (typeof params.themeName === 'string') highlights.push(`theme: ${params.themeName}`);
  if (typeof params.numeralRange === 'string') highlights.push(`range: ${params.numeralRange}`);
  if (typeof params.framePreset === 'string') highlights.push(`frame: ${params.framePreset}`);
  if (params.imageSource === 'vocabKeyList') highlights.push('vocab-key-list');
  return highlights.join(' · ');
}

export default async function TeachingPackageMaterialsList({ pkg, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'teachingPackagePage.materials' });
  const materials = [...pkg.materials].sort((a, b) => a.ordering - b.ordering);

  if (materials.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">
        {t('heading')}
      </h2>
      <p className="text-sm text-ink-500 mb-4">
        {t('subheading', { count: materials.length })}
      </p>
      <ol className="space-y-3">
        {materials.map((m: PackageMaterial) => (
          <li
            key={m.ordering}
            className="p-4 rounded-md border border-cream-300 bg-white"
          >
            <header className="flex items-center justify-between mb-2 gap-3 flex-wrap">
              <h3 className="font-display font-semibold text-ink-900 flex items-center gap-2">
                <span className="text-sage-600 font-mono">{m.ordering}.</span>
                <span>{m.materialSlug}</span>
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sage-100 text-sage-700 text-xs font-medium">
                {m.pedagogicalRole}
              </span>
            </header>
            {m.customizationParameters && (
              <p className="text-xs text-ink-600 mt-1">
                {summarizeParameters(m.customizationParameters)}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
