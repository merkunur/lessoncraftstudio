'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import ClientPagination from '@/components/ui/ClientPagination';
import WorkspaceSection, { WorkspaceSectionMessage } from '../WorkspaceSection';
import WorkspaceListToolbar from '../WorkspaceListToolbar';
import WorkspaceEmptyState from '../WorkspaceEmptyState';
import { usePagedList } from '../usePagedList';
import { filterAndSort } from '../listUtils';
import { PAGE_SIZE, OVERVIEW_PREVIEW, type SortKey } from '../constants';
import { deckTitleFor, type FavoriteRow, type Slice } from '../useWorkspaceData';

const SORTS: SortKey[] = ['newest', 'alphaAsc', 'alphaDesc'];

interface Props {
  locale: string;
  slice: Slice<{ favorites: FavoriteRow[] }>;
  variant: 'preview' | 'full';
  onSeeAll?: () => void;
  /** Overview first-run: render the card with its empty state even in preview. */
  showEmptyPreview?: boolean;
}

export default function FavoritesSection({
  locale,
  slice,
  variant,
  onSeeAll,
  showEmptyPreview,
}: Props) {
  const tRoot = useTranslations('workspace');
  const t = useTranslations('workspace.favorites');
  const tList = useTranslations('workspace.list');

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const [pending, setPending] = useState<string | null>(null);

  const rows = slice.data?.favorites ?? [];

  // Deck.title is a Json locale map in the schema (some rows hold a bare
  // string), so it must be resolved before display OR comparison — rendering it
  // raw is a React "objects are not valid as a child" crash.
  const visible = useMemo(
    () =>
      filterAndSort(
        rows,
        query,
        sort,
        { title: (r) => deckTitleFor(r.title, locale), date: (r) => r.favoritedAt },
        locale
      ),
    [rows, query, sort, locale]
  );

  const paged = usePagedList(visible, PAGE_SIZE.favorites, `${query}|${sort}`);
  const shown = variant === 'preview' ? visible.slice(0, OVERVIEW_PREVIEW.favorites) : paged.pageItems;

  if (slice.status === 'gated') return null;
  if (slice.status !== 'ready') {
    if (variant === 'preview') return null;
    return (
      <WorkspaceSectionMessage
        id="ws-favorites"
        title={t('title')}
        icon="favorites"
        message={slice.status === 'loading' ? tRoot('loading') : tRoot('errorGeneric')}
      />
    );
  }
  if (variant === 'preview' && rows.length === 0 && !showEmptyPreview) return null;

  async function remove(deckId: string) {
    setPending(deckId);
    try {
      const token = localStorage.getItem('accessToken');
      await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token ?? ''}` },
        body: JSON.stringify({ deckId }),
      });
      slice.reload();
    } finally {
      setPending(null);
    }
  }

  return (
    <WorkspaceSection
      id="ws-favorites"
      title={t('title')}
      icon="favorites"
      variant={variant}
      totalCount={rows.length}
      onSeeAll={onSeeAll}
      toolbar={
        rows.length > 0 ? (
          <WorkspaceListToolbar
            query={query}
            onQueryChange={setQuery}
            sort={sort}
            onSortChange={setSort}
            sortOptions={SORTS}
            from={paged.from}
            to={paged.to}
            total={paged.total}
          />
        ) : undefined
      }
    >
      {rows.length === 0 ? (
        <WorkspaceEmptyState title={t('empty.title')} body={t('empty.body')} />
      ) : shown.length === 0 ? (
        <WorkspaceEmptyState
          title={tList('noMatchTitle')}
          body={tList('noMatchBody')}
          action={
            <button
              type="button"
              onClick={() => setQuery('')}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-lcs-coral px-5 py-2.5 font-lcsDisplay font-semibold text-[#14322D] transition-all hover:shadow-[0_3px_10px_-2px_rgba(84,66,39,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E6]"
            >
              {tList('clearSearch')}
            </button>
          }
        />
      ) : (
        /* Two columns of ruled lines, not cards — same idiom as the worksheet
           rows so the whole panel keeps one rhythm. The full-bleed negative
           margin can't apply here (a 2-col grid would tear at the gutter), so
           these are bordered inside the section padding. */
        /* Every cell carries its own bottom rule and the list carries the top
           one. `divide-y` is WRONG on a 2-col grid — it borders every child but
           the first in DOM order, so the top-right cell would be underlined on
           the first visual row. */
        <ul className="grid border-t border-[#EFE9DA] sm:grid-cols-2 sm:gap-x-6">
          {shown.map((f) => (
            <li
              key={f.deckId}
              className="flex items-center gap-2 border-b border-[#EFE9DA] py-1"
            >
              {/* nginx-served deck page → plain <a> per the §15.7 routing contract */}
              <a
                href={f.url}
                /* min-h-[44px] + flex so the hit area fills the row height —
                   as a bare inline link it was only 20px tall. */
                className="flex min-h-[44px] min-w-0 flex-1 items-center truncate font-lcsBody text-sm font-semibold text-[#14322D] underline-offset-4 transition-colors hover:text-lcs-teal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8]"
              >
                {deckTitleFor(f.title, locale)}
              </a>
              <button
                type="button"
                onClick={() => remove(f.deckId)}
                disabled={pending === f.deckId}
                aria-label={t('remove')}
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full text-lg leading-none text-lcs-coral transition-colors hover:bg-[#14322D]/[0.06] hover:text-lcs-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] disabled:text-[#9AA8A3]"
              >
                ♥
              </button>
            </li>
          ))}
        </ul>
      )}

      {variant === 'full' && (
        <ClientPagination
          page={paged.page}
          pageCount={paged.pageCount}
          onPageChange={paged.setPage}
          labelledBy="ws-favorites"
        />
      )}
    </WorkspaceSection>
  );
}
