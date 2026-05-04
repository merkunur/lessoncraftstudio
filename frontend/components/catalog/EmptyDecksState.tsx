import { getTranslations } from 'next-intl/server';
import { buildFilterUrl, clearFilters } from './filterUrl';

// Arc 6b — Empty-state UI when current filter combo yields 0 decks.
// Substrate-honest per §16.6: surfaces the cause + a remediation CTA
// (clear all filters) rather than a "no results" dead-end.

interface EmptyDecksStateProps {
  locale: string;
  basePath: string;
  searchParamsString: string;
}

export default async function EmptyDecksState({
  locale,
  basePath,
  searchParamsString,
}: EmptyDecksStateProps) {
  const t = await getTranslations({ locale, namespace: 'topicPage.emptyState' });

  const baseParams = new URLSearchParams(searchParamsString);
  const clearAllUrl = buildFilterUrl(basePath, clearFilters(baseParams));

  return (
    <div className="text-center py-16 px-4 rounded-lg bg-cream-50 border border-cream-300">
      <h3 className="font-display text-lg font-semibold text-ink-900 mb-2">
        {t('heading')}
      </h3>
      <p className="text-sm text-ink-600 mb-6 max-w-md mx-auto">
        {t('body')}
      </p>
      <a
        href={clearAllUrl}
        className="inline-flex items-center px-4 py-2 rounded-md bg-ink-900 hover:bg-ink-800 text-cream-50 text-sm font-medium transition-colors"
      >
        {t('cta')}
      </a>
    </div>
  );
}
