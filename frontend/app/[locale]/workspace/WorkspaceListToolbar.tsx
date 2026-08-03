'use client';

import { useTranslations } from 'next-intl';
import type { SortKey } from './constants';

/**
 * Search + sort + result count for a full-list tab.
 *
 * Sort labels reuse `topicPage.sort` (complete in all 11 locales); only "Most
 * viewed" needed a new key. The pill markup mirrors CatalogSortControl, copied
 * rather than imported because that file is documented as "No client JS" and is
 * consumed by two SSR hubs — adding 'use client' to it would be a wide change
 * for 15 lines of markup.
 */
export interface WorkspaceListToolbarProps {
  query: string;
  onQueryChange: (q: string) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  sortOptions: SortKey[];
  from: number;
  to: number;
  total: number;
  /** Hides the search field for lists that are always short (collections). */
  searchable?: boolean;
}

export default function WorkspaceListToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  sortOptions,
  from,
  to,
  total,
  searchable = true,
}: WorkspaceListToolbarProps) {
  const t = useTranslations('workspace.list');
  const tSort = useTranslations('topicPage.sort');

  const sortLabel = (key: SortKey) =>
    key === 'views' ? t('sortViews') : tSort(key);

  return (
    <div className="mb-5 space-y-3">
      {searchable && (
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchLabel')}
            className="min-h-[44px] w-full rounded-2xl border border-lcs-teal/20 bg-white px-4 py-2 font-lcsBody text-sm text-lcs-teal outline-none transition-colors placeholder:text-lcs-teal/40 focus:border-lcs-coral md:max-w-sm"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-lcsBody text-sm font-semibold text-lcs-teal/70">
          {t('showing', { from, to, total })}
        </p>

        <div className="flex items-center gap-2">
          <span className="font-lcsBody text-xs font-bold uppercase tracking-[0.12em] text-lcs-teal/55">
            {tSort('heading')}
          </span>
          <div className="inline-flex rounded-full bg-lcs-teal/8 p-0.5">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onSortChange(opt)}
                aria-current={sort === opt ? 'true' : undefined}
                className={`inline-flex min-h-[44px] items-center rounded-full px-3.5 py-1 font-lcsBody text-sm font-semibold transition-colors ${
                  sort === opt ? 'bg-lcs-teal text-lcs-cream' : 'text-lcs-teal/80 hover:text-lcs-teal'
                }`}
              >
                {sortLabel(opt)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
