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
          {/* A well that becomes paper when focused — the focus state is a
              surface change, so it needs no ring on top of the border shift. */}
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchLabel')}
            className="min-h-[44px] w-full rounded-xl border border-[#E3DCC9] bg-[#F5F1E6] px-3.5 py-2 font-lcsBody text-sm text-[#14322D] outline-none transition-colors placeholder:text-[#9AA8A3] focus:border-lcs-coral focus:bg-[#FFFDF8] md:max-w-xs"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-lcsBody text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[#5E706A]">
          {t('showing', { from, to, total })}
        </p>

        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 whitespace-nowrap font-lcsBody text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[#5E706A]">
            {tSort('heading')}
          </span>
          {/* A TRUE segmented control: a light raised thumb on a dark track.
              The old active state was a solid teal fill, which is far too much
              weight for a view toggle and spent the "you are here" color on
              something that is not navigation. */}
          {/* Scrolls rather than wraps. At 360px the four options do not fit,
              and letting them wrap broke "A to Z" across three lines inside its
              own pill — the same reason the tab strip scrolls. */}
          <div className="flex min-w-0 max-w-full overflow-x-auto rounded-full bg-[#F0EADB] p-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onSortChange(opt)}
                aria-current={sort === opt ? 'true' : undefined}
                /* h-11 below md: a 36px control is a mouse target, not a
                   finger one. Desktop keeps the 36px list density. */
                className={`inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full px-3 font-lcsBody text-[0.8125rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] md:h-9 ${
                  sort === opt
                    ? 'bg-[#FFFDF8] text-[#14322D] shadow-[0_1px_2px_rgba(20,50,45,0.10)]'
                    : 'text-[#5E706A] hover:text-[#14322D]'
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
