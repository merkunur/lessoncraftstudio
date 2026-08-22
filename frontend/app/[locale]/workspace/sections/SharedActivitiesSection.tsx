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
import WorkspaceRow, { ROW_LIST, ROW_SHARE_BUTTON, ShareGlyph, MetaChip, MetaDot } from '../WorkspaceRow';
import RowActionsMenu from '../RowActionsMenu';
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
  /** Overview first-run: render the card with its empty state even in preview. */
  showEmptyPreview?: boolean;
}

export default function SharedActivitiesSection({
  locale,
  slice,
  variant,
  onSeeAll,
  showEmptyPreview,
}: Props) {
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
        icon="activities"
        message={slice.status === 'loading' ? t('loading') : t('errorGeneric')}
      />
    );
  }
  if (variant === 'preview' && rows.length === 0 && !showEmptyPreview) return null;

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
      {/* The share-limit meter moved to the rail's plan-&-usage card. */}
      <WorkspaceSection
        id="ws-shared"
        title={tShared('title')}
        icon="activities"
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
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-lcs-coral px-5 py-2.5 font-lcsDisplay font-semibold text-[#14322D] transition-all hover:shadow-[0_3px_10px_-2px_rgba(84,66,39,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E6]"
              >
                {tList('clearSearch')}
              </button>
            }
          />
        ) : (
          <ul className={ROW_LIST}>
            {shown.map((row) => (
              <WorkspaceRow
                key={row.id}
                title={row.title}
                meta={
                  <>
                    <MetaChip>{row.locale.toUpperCase()}</MetaChip>
                    <span className="tabular-nums">
                      {tShared('views', { count: row.viewCount })}
                    </span>
                    <MetaDot />
                    <span className="tabular-nums">
                      {new Date(row.updatedAt).toLocaleDateString(locale, {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </>
                }
                actions={
                  <>
                    <button
                      type="button"
                      onClick={() => setShareRow(row)}
                      className={ROW_SHARE_BUTTON}
                    >
                      <ShareGlyph />
                      {tShared('share')}
                    </button>
                    <RowActionsMenu
                      label={tList('rowActions')}
                      actions={[
                        {
                          key: 'rename',
                          label: tShared('rename'),
                          onSelect: () => {
                            setRenameRow(row);
                            setDialogError(null);
                          },
                        },
                        {
                          key: 'delete',
                          label: tShared('delete'),
                          destructive: true,
                          onSelect: () => setDeleteRow(row),
                        },
                      ]}
                    />
                  </>
                }
              />
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
