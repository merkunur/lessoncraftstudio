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

/** Bars in a collection card's deck rail. Past this the last bar reads full. */
const DECK_RAIL_BARS = 5;

/** Form field inside the create modal — a well that becomes paper on focus,
 *  matching the list toolbar's search input. */
const FIELD =
  'min-h-[44px] w-full rounded-xl border border-[#14322D]/10 bg-[#F5F1E6] px-3 py-2 font-lcsBody text-sm text-[#14322D] outline-none transition-colors placeholder:text-[#9AA8A3] focus:border-lcs-coral focus:bg-[#FFFDF8] disabled:opacity-60';

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
          /* The page's single coral CTA. Coral is the identity mark and the ONE
             call to action per view; everything else that is merely interactive
             is teal. */
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-11 items-center rounded-full bg-lcs-coral px-3.5 font-lcsBody text-[0.8125rem] font-bold text-[#FFFDF8] transition-colors hover:bg-lcs-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] md:h-9"
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
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-lcs-coral px-5 py-2.5 font-lcsDisplay font-semibold text-[#FFFDF8] transition-colors hover:bg-lcs-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E6]"
              >
                {tList('clearSearch')}
              </button>
            }
          />
        ) : (
          /* Collections stay a grid — they are destinations, not list items —
             but they become WELLS rather than raised paper, and hover lifts the
             card toward the sheet color instead of translating it. Same "it
             responded" signal, zero layout noise, consistent with the
             darker-is-nested rule. */
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c) => {
              const filled = Math.min(c.deckCount, DECK_RAIL_BARS);
              return (
                <li key={c.id}>
                  <Link
                    href={`/${locale}/collections/${c.id}`}
                    className="group flex h-full min-h-[132px] flex-col rounded-2xl border border-[#14322D]/10 bg-[#F5F1E6] p-4 transition-colors hover:border-lcs-teal/40 hover:bg-[#FFFDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8]"
                  >
                    {/* The deck rail. Not decoration — it encodes how full the
                        collection is, which is what stops the card being 80%
                        dead space. The API carries no thumbnails, so this is the
                        honest stand-in for the spines. */}
                    <span className="mb-3 flex gap-1" aria-hidden="true">
                      {Array.from({ length: DECK_RAIL_BARS }, (_, i) => (
                        <span
                          key={i}
                          className={`h-1 w-6 rounded-full ${
                            i < filled
                              ? c.deckCount > DECK_RAIL_BARS && i === DECK_RAIL_BARS - 1
                                ? 'bg-lcs-teal'
                                : 'bg-lcs-teal/45'
                              : 'bg-[#14322D]/10'
                          }`}
                        />
                      ))}
                    </span>

                    <h3 className="line-clamp-1 font-lcsDisplay text-[0.9375rem] font-bold tracking-[-0.005em] text-[#14322D]">
                      {c.name}
                    </h3>
                    {c.description && (
                      <p className="mt-1 line-clamp-2 font-lcsBody text-[0.8125rem] leading-relaxed text-[#3D4F49]">
                        {c.description}
                      </p>
                    )}

                    <div className="mt-auto flex items-baseline justify-between gap-2 pt-3 font-lcsBody text-[0.8125rem] text-[#5E706A]">
                      {/* An empty collection gets an invitation, not the dead
                          label "No decks". */}
                      {c.deckCount === 0 ? (
                        <span className="font-bold text-lcs-teal">
                          {t('cardEmptyCta')} <span aria-hidden="true">→</span>
                        </span>
                      ) : (
                        <span className="tabular-nums">
                          {t('cardDeckCount', { count: c.deckCount })}
                        </span>
                      )}
                      <span className="shrink-0 tabular-nums">
                        {new Date(c.updatedAt).toLocaleDateString(locale, {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
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
            <h2
              id={createTitleId}
              className="font-lcsDisplay text-lg font-bold tracking-[-0.01em] text-[#14322D]"
            >
              {tCreate('title')}
            </h2>

            <label className="mt-4 block">
              <span className="mb-1.5 block font-lcsBody text-[0.8125rem] font-semibold text-[#3D4F49]">
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
                className={FIELD}
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block font-lcsBody text-[0.8125rem] font-semibold text-[#3D4F49]">
                {tCreate('descriptionLabel')}
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={busy}
                maxLength={500}
                rows={3}
                className={`${FIELD} resize-none`}
              />
            </label>

            {/* Brick, not terracotta — one red on the surface, and it means
                "something went wrong / this destroys data", nothing else. */}
            {error && (
              <p role="alert" className="mt-2 font-lcsBody text-[0.8125rem] text-[#B3392B]">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                disabled={busy}
                className="min-h-[44px] rounded-full px-4 py-2 font-lcsBody text-sm font-semibold text-[#5E706A] transition-colors hover:text-[#14322D] disabled:text-[#9AA8A3]"
              >
                {tCreate('cancel')}
              </button>
              <button
                type="submit"
                disabled={busy}
                className="min-h-[44px] rounded-full bg-lcs-coral px-5 py-2 font-lcsDisplay text-sm font-semibold text-[#FFFDF8] transition-colors hover:bg-lcs-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] disabled:opacity-60"
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
