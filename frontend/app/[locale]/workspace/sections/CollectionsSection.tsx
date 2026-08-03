'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Modal from '@/components/ui/Modal';
import ClientPagination from '@/components/ui/ClientPagination';
import WorkspaceSection, { WorkspaceSectionMessage } from '../WorkspaceSection';
import WorkspaceListToolbar from '../WorkspaceListToolbar';
import WorkspaceEmptyState from '../WorkspaceEmptyState';
import { usePagedList } from '../usePagedList';
import { filterAndSort } from '../listUtils';
import { PAGE_SIZE, OVERVIEW_PREVIEW, type SortKey } from '../constants';
import type { CollectionSummary, Slice } from '../useWorkspaceData';

const SORTS: SortKey[] = ['newest', 'alphaAsc', 'alphaDesc'];

interface Props {
  locale: string;
  slice: Slice<{ collections: CollectionSummary[] }>;
  variant: 'preview' | 'full';
  onSeeAll?: () => void;
}

export default function CollectionsSection({ locale, slice, variant, onSeeAll }: Props) {
  const tRoot = useTranslations('workspace');
  const t = useTranslations('workspace.collections');
  const tCreate = useTranslations('collections.create');
  const tList = useTranslations('workspace.list');
  const router = useRouter();
  const createTitleId = useId();

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rows = slice.data?.collections ?? [];

  const visible = useMemo(
    () =>
      filterAndSort(
        rows,
        query,
        sort,
        { title: (r) => r.name, date: (r) => r.updatedAt },
        locale
      ),
    [rows, query, sort, locale]
  );

  const paged = usePagedList(visible, PAGE_SIZE.collections, `${query}|${sort}`);
  const shown = variant === 'preview' ? visible.slice(0, OVERVIEW_PREVIEW.collections) : paged.pageItems;

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError(tCreate('errorRequired'));
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token ?? ''}` },
        body: JSON.stringify({ name: trimmed, description: description.trim() || undefined }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setName('');
      setDescription('');
      setCreateOpen(false);
      router.push(`/${locale}/collections/${data.collection.id}`);
    } catch {
      setError(tCreate('errorGeneric'));
    } finally {
      setBusy(false);
    }
  }

  if (slice.status === 'gated') return null;
  if (slice.status !== 'ready') {
    if (variant === 'preview') return null;
    return (
      <WorkspaceSectionMessage
        id="ws-collections"
        title={t('heading')}
        message={slice.status === 'loading' ? tRoot('loading') : tRoot('errorGeneric')}
      />
    );
  }
  if (variant === 'preview' && rows.length === 0) return null;

  const createLabel = tCreate('title').startsWith('+') ? tCreate('title') : `+ ${tCreate('title')}`;

  return (
    <>
      <WorkspaceSection
        id="ws-collections"
        title={t('heading')}
        meter={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex min-h-[44px] items-center font-lcsBody text-sm font-semibold text-lcs-teal transition-colors hover:text-lcs-coral-deep"
          >
            {createLabel}
          </button>
        }
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
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c) => (
              <li key={c.id} className="actcat-card rounded-2xl">
                <Link href={`/${locale}/collections/${c.id}`} className="block p-4">
                  <h3 className="mb-1 line-clamp-1 font-lcsDisplay text-base font-bold text-lcs-teal">
                    {c.name}
                  </h3>
                  {c.description && (
                    <p className="mb-2 line-clamp-2 font-lcsBody text-sm text-lcs-teal/70">
                      {c.description}
                    </p>
                  )}
                  <p className="font-lcsBody text-sm text-lcs-teal/60">
                    {t('cardDeckCount', { count: c.deckCount })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {variant === 'full' && (
          <ClientPagination
            page={paged.page}
            pageCount={paged.pageCount}
            onPageChange={paged.setPage}
            labelledBy="ws-collections"
          />
        )}
      </WorkspaceSection>

      {createOpen && (
        <Modal
          onClose={() => !busy && setCreateOpen(false)}
          labelledBy={createTitleId}
          closeOnBackdrop={!busy}
        >
          <form onSubmit={handleCreate}>
            <h2 id={createTitleId} className="font-lcsDisplay text-lg font-bold text-lcs-teal">
              {tCreate('title')}
            </h2>

            <label className="mt-4 block">
              <span className="mb-1.5 block font-lcsBody text-sm font-semibold text-lcs-teal/75">
                {tCreate('nameLabel')}
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={tCreate('namePlaceholder')}
                disabled={busy}
                autoFocus
                maxLength={100}
                className="min-h-[44px] w-full rounded-xl border border-lcs-teal/20 bg-white px-3 py-2 font-lcsBody text-sm text-lcs-teal outline-none transition-colors focus:border-lcs-coral disabled:opacity-60"
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block font-lcsBody text-sm font-semibold text-lcs-teal/75">
                {tCreate('descriptionLabel')}
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={busy}
                maxLength={500}
                rows={3}
                className="w-full resize-none rounded-xl border border-lcs-teal/20 bg-white px-3 py-2 font-lcsBody text-sm text-lcs-teal outline-none transition-colors focus:border-lcs-coral disabled:opacity-60"
              />
            </label>

            {error && (
              <p role="alert" className="mt-2 font-lcsBody text-sm text-terracotta-500">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                disabled={busy}
                className="min-h-[44px] rounded-2xl px-4 py-2 font-lcsBody text-sm font-semibold text-lcs-teal/80 transition-colors hover:text-lcs-teal disabled:opacity-60"
              >
                {tCreate('cancel')}
              </button>
              <button
                type="submit"
                disabled={busy}
                className="min-h-[44px] rounded-2xl bg-lcs-coral px-5 py-2 font-lcsDisplay text-sm font-semibold text-lcs-cream transition-colors hover:bg-lcs-coral-deep disabled:opacity-60"
              >
                {busy ? tCreate('submitting') : tCreate('submit')}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
