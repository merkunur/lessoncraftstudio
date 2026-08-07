'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import ActivityShareModal from '@/components/activities/ActivityShareModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import PromptDialog from '@/components/ui/PromptDialog';
import ClientPagination from '@/components/ui/ClientPagination';
import WorkspaceSection, { WorkspaceSectionMessage, QuotaMeter } from '../WorkspaceSection';
import WorkspaceListToolbar from '../WorkspaceListToolbar';
import WorkspaceEmptyState from '../WorkspaceEmptyState';
import WorkspaceRow, { ROW_LIST, MetaChip, MetaDot } from '../WorkspaceRow';
import RowActionsMenu from '../RowActionsMenu';
import { usePagedList } from '../usePagedList';
import { filterAndSort } from '../listUtils';
import { PAGE_SIZE, OVERVIEW_PREVIEW, type SortKey } from '../constants';
import type { HostedRow, Slice } from '../useWorkspaceData';

const SORTS: SortKey[] = ['newest', 'alphaAsc', 'alphaDesc', 'views'];

interface Props {
  locale: string;
  slice: Slice<{
    worksheets: HostedRow[];
    quota: { count: number; maxCount: number; totalBytes: number; maxTotalBytes: number };
  }>;
  variant: 'preview' | 'full';
  onSeeAll?: () => void;
}

export default function HostedWorksheetsSection({ locale, slice, variant, onSeeAll }: Props) {
  const t = useTranslations('workspace');
  const tHosted = useTranslations('workspace.hosted');
  const tDialog = useTranslations('workspace.dialog');
  const tList = useTranslations('workspace.list');

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const [shareRow, setShareRow] = useState<HostedRow | null>(null);
  const [renameRow, setRenameRow] = useState<HostedRow | null>(null);
  const [deleteRow, setDeleteRow] = useState<HostedRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);

  const rows = slice.data?.worksheets ?? [];
  const quota = slice.data?.quota;

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

  const paged = usePagedList(visible, PAGE_SIZE.worksheets, `${query}|${sort}`);
  const shown = variant === 'preview' ? visible.slice(0, OVERVIEW_PREVIEW.worksheets) : paged.pageItems;

  // A 403 here is expected (Teacher-plan surface), not an error worth showing.
  if (slice.status === 'gated') return null;
  if (slice.status !== 'ready') {
    if (variant === 'preview') return null;
    return (
      <WorkspaceSectionMessage
        id="ws-hosted"
        title={tHosted('title')}
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
      const res = await send(`/api/worksheets/hosted/${renameRow.id}`, {
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
      await send(`/api/worksheets/hosted/${deleteRow.id}`, { method: 'DELETE' });
      setDeleteRow(null);
      slice.reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <WorkspaceSection
        id="ws-hosted"
        title={tHosted('title')}
        meter={
          quota ? (
            <QuotaMeter
              label={t('quotaLabel', { count: quota.count, max: quota.maxCount })}
              count={quota.count}
              max={quota.maxCount}
            />
          ) : undefined
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
          <WorkspaceEmptyState title={tHosted('title')} body={tHosted('empty')} />
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
          <ul className={ROW_LIST}>
            {shown.map((row) => (
              <WorkspaceRow
                key={row.id}
                title={row.title}
                meta={
                  <>
                    <MetaChip>{row.appId}</MetaChip>
                    <span className="tabular-nums">
                      {tHosted('views', { count: row.viewCount })}
                    </span>
                    <MetaDot />
                    {/* updatedAt was already on the wire and thrown away. It is
                        the single most useful column a teacher has here. */}
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
                    {/* Share is the only FILLED control in the row — the whole
                        point of the hierarchy. h-11 keeps the 44px touch target
                        on phones; md:h-9 gives desktop the density a list wants. */}
                    <button
                      type="button"
                      onClick={() => setShareRow(row)}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-lcs-teal px-4 font-lcsBody text-[0.8125rem] font-bold tracking-[0.01em] text-[#FFFDF8] transition-colors hover:bg-lcs-teal-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] md:h-9"
                    >
                      {tHosted('share')}
                    </button>
                    <RowActionsMenu
                      label={tList('rowActions')}
                      actions={[
                        {
                          key: 'rename',
                          label: tHosted('rename'),
                          onSelect: () => {
                            setRenameRow(row);
                            setDialogError(null);
                          },
                        },
                        {
                          key: 'delete',
                          label: tHosted('delete'),
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
            labelledBy="ws-hosted"
          />
        )}
      </WorkspaceSection>

      {/* Same modal component as the activity surface — this section used to
          carry a 74-line near-duplicate that rendered inline (so it painted
          under the Footer) and had no Escape / scroll-lock. */}
      {shareRow && (
        <ActivityShareModal
          share={{ title: shareRow.title, url: shareRow.url, qrUrl: shareRow.qrUrl }}
          onClose={() => setShareRow(null)}
          labels={{
            intro: tHosted('shareIntro'),
            qrAlt: tHosted('qrAlt'),
            linkLabel: tHosted('linkLabel'),
            copy: tHosted('copy'),
            copied: tHosted('copied'),
            open: tHosted('openWorksheet'),
            downloadQr: tHosted('downloadQr'),
            note: tHosted('shareNote'),
            close: tHosted('close'),
          }}
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
          body={tHosted('deleteConfirm')}
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
