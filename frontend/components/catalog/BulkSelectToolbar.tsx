'use client';

import { useTranslations } from 'next-intl';

// Sticky/floating toolbar surfacing when ≥1 deck is selected in bulk-mode.
// Surfaces selection count + bulk-action buttons + Cancel. Exact action set
// varies by host surface — caller passes `actions` per its context:
// - Topic page: addToCollection + shareLinks.
// - Collection detail: removeFromCollection + shareLinks.

export type BulkAction =
  | 'addToCollection'
  | 'removeFromCollection'
  | 'shareLinks';

interface BulkSelectToolbarProps {
  count: number;
  actions: BulkAction[];
  busy?: boolean;
  onAction: (action: BulkAction) => void;
  onCancel: () => void;
}

export default function BulkSelectToolbar({
  count,
  actions,
  busy = false,
  onAction,
  onCancel,
}: BulkSelectToolbarProps) {
  const t = useTranslations('bulk');

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-label={t('toolbarAria')}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-lg bg-ink-900 text-cream-50 shadow-xl flex items-center gap-3 flex-wrap max-w-[calc(100vw-2rem)]"
    >
      <span className="text-sm font-medium pl-1">
        {t('selectionCount', { count })}
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        {actions.map(action => (
          <button
            key={action}
            type="button"
            onClick={() => onAction(action)}
            disabled={busy}
            className="px-3 py-1.5 rounded-md bg-leaf-600 hover:bg-leaf-700 text-cream-50 text-sm font-medium transition disabled:opacity-60"
          >
            {t(`action.${action}`)}
          </button>
        ))}
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="px-3 py-1.5 rounded-md text-cream-50 text-sm hover:bg-ink-700 transition disabled:opacity-60"
        >
          {t('action.cancel')}
        </button>
      </div>
    </div>
  );
}
