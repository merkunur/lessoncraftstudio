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
}

export default function FavoritesSection({ locale, slice, variant, onSeeAll }: Props) {
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
        message={slice.status === 'loading' ? tRoot('loading') : tRoot('errorGeneric')}
      />
    );
  }
  if (variant === 'preview' && rows.length === 0) return null;

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
              className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-lcs-coral px-5 py-2.5 font-lcsDisplay font-semibold text-lcs-cream transition-colors hover:bg-lcs-coral-deep"
            >
              {tList('clearSearch')}
            </button>
          }
        />
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {shown.map((f) => (
            <li
              key={f.deckId}
              /* flat: the row mixes a link and a remove button, so a whole-row
                 hover-lift would misreport what is clickable. */
              className="actcat-card-flat flex items-center gap-3 rounded-2xl px-4 py-2.5"
            >
              {/* nginx-served deck page → plain <a> per the §15.7 routing contract */}
              <a
                href={f.url}
                /* min-h-[44px] + flex so the hit area fills the row height —
                   as a bare inline link it was only 20px tall. */
                className="flex min-h-[44px] min-w-0 flex-1 items-center truncate font-lcsBody text-sm font-semibold text-lcs-teal hover:text-lcs-coral-deep hover:underline"
              >
                {deckTitleFor(f.title, locale)}
              </a>
              <button
                type="button"
                onClick={() => remove(f.deckId)}
                disabled={pending === f.deckId}
                aria-label={t('remove')}
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center text-lg leading-none text-lcs-coral transition-colors hover:text-lcs-coral-deep disabled:opacity-50"
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
