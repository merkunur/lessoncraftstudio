'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import ActivityShareModal from '@/components/activities/ActivityShareModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import PromptDialog from '@/components/ui/PromptDialog';
import ClientPagination from '@/components/ui/ClientPagination';
import WorkspaceSection, { WorkspaceSectionMessage } from '../WorkspaceSection';
import WorkspaceListToolbar from '../WorkspaceListToolbar';
import WorkspaceEmptyState from '../WorkspaceEmptyState';
import { usePagedList } from '../usePagedList';
import { filterAndSort } from '../listUtils';
import { PAGE_SIZE, OVERVIEW_PREVIEW, type SortKey } from '../constants';
import type { ShareRow, Slice } from '../useWorkspaceData';

const SORTS: SortKey[] = ['newest', 'alphaAsc', 'alphaDesc', 'views'];

interface Props {
  locale: string;
  slice: Slice<{ shares: ShareRow[]; limit: { count: number; maxCount: number } }>;
  variant: 'preview' | 'full';
  onSeeAll?: () => void;
}

export default function SharedActivitiesSection({ locale, slice, variant, onSeeAll }: Props) {
  const t = useTranslations('workspace');
  const tShared = useTranslations('workspace.sharedActivities');
  const tDialog = useTranslations('workspace.dialog');
  const tList = useTranslations('workspace.list');

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const [shareRow, setShareRow] = useState<ShareRow | null>(null);
  const [renameRow, setRenameRow] = useState<ShareRow | null>(null);
  const [deleteRow, setDeleteRow] = useState<ShareRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);

  const rows = slice.data?.shares ?? [];
  const limit = slice.data?.limit;

  const visible = useMemo(
    () =>
      filterAndSort(
        rows,
        query,
        sort,
        { title: (r) => r.title, date: (r) => r.updatedAt, views: (r) => r.viewCount },
        locale
      ),
    [rows, query, sort, locale]
  );

  const paged = usePagedList(visible, PAGE_SIZE.activities, `${query}|${sort}`);
  const shown = variant === 'preview' ? visible.slice(0, OVERVIEW_PREVIEW.activities) : paged.pageItems;

  if (slice.status === 'gated') return null;
  if (slice.status !== 'ready') {
    if (variant === 'preview') return null;
    return (
      <WorkspaceSectionMessage
        id="ws-shared"
        title={tShared('title')}
        message={slice.status === 'loading' ? t('loading') : t('errorGeneric')}
      />
    );
  }
  if (variant === 'preview' && rows.length === 0) return null;

  async function send(url: string, init: RequestInit) {
    const token = localStorage.getItem('accessToken');
    return fetch(url, {
      ...init,
      headers: { ...(init.headers ?? {}), Authorization: `Bearer ${token ?? ''}` },
    });
  }

  async function submitRename(title: string) {
    if (!renameRow) return;
    setBusy(true);
    setDialogError(null);
    try {
      const res = await send(`/api/activities/share/${renameRow.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setRenameRow(null);
      slice.reload();
    } catch {
      setDialogError(tDialog('errorGeneric'));
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!deleteRow) return;
    setBusy(true);
    try {
      await send(`/api/activities/share/${deleteRow.id}`, { method: 'DELETE' });
      setDeleteRow(null);
      slice.reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <WorkspaceSection
        id="ws-shared"
        title={tShared('title')}
        meter={limit ? t('quotaLabel', { count: limit.count, max: limit.maxCount }) : undefined}
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
          <WorkspaceEmptyState title={tShared('title')} body={tShared('empty')} />
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
          <ul className="space-y-3">
            {shown.map((row) => (
              <li
                key={row.id}
                /* flat, not .actcat-card — see HostedWorksheetsSection. */
                className="actcat-card-flat flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3"
              >
                {/* basis-full on phones — see HostedWorksheetsSection. */}
                <div className="min-w-0 basis-full sm:basis-0 sm:flex-1">
                  <p className="truncate font-lcsDisplay font-bold text-lcs-teal">{row.title}</p>
                  <p className="font-lcsBody text-xs text-lcs-teal/60">
                    {row.locale.toUpperCase()} · {tShared('views', { count: row.viewCount })}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShareRow(row)}
                    className="inline-flex min-h-[44px] items-center rounded-full bg-lcs-teal px-4 py-1.5 font-lcsBody text-sm font-semibold text-lcs-cream transition-colors hover:bg-lcs-teal-deep"
                  >
                    {tShared('share')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRenameRow(row); setDialogError(null); }}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-lcs-teal/25 px-3 py-1 font-lcsBody text-sm font-semibold text-lcs-teal/80 transition-colors hover:border-lcs-teal hover:text-lcs-teal"
                  >
                    {tShared('rename')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteRow(row)}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-terracotta-400 px-3 py-1 font-lcsBody text-sm font-semibold text-terracotta-500 transition-colors hover:bg-terracotta-500 hover:text-white"
                  >
                    {tShared('delete')}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {variant === 'full' && (
          <ClientPagination
            page={paged.page}
            pageCount={paged.pageCount}
            onPageChange={paged.setPage}
            labelledBy="ws-shared"
          />
        )}
      </WorkspaceSection>

      {shareRow && (
        <ActivityShareModal
          share={{ title: shareRow.title, url: shareRow.url, qrUrl: shareRow.qrUrl }}
          onClose={() => setShareRow(null)}
        />
      )}

      {renameRow && (
        <PromptDialog
          title={tDialog('renameTitle')}
          label={tDialog('nameLabel')}
          initialValue={renameRow.title}
          maxLength={200}
          submitLabel={tDialog('save')}
          cancelLabel={tDialog('cancel')}
          busyLabel={tDialog('saving')}
          requiredMessage={tDialog('errorRequired')}
          busy={busy}
          error={dialogError}
          onSubmit={submitRename}
          onCancel={() => setRenameRow(null)}
        />
      )}

      {deleteRow && (
        <ConfirmDialog
          title={tDialog('deleteTitle')}
          body={tShared('deleteConfirm')}
          confirmLabel={tDialog('deleteConfirm')}
          cancelLabel={tDialog('cancel')}
          busy={busy}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteRow(null)}
        />
      )}
    </>
  );
}
