'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Bulk variant of the collection picker. Mirrors AddToCollectionButton's modal
// shape but POSTs to /api/collections/[id]/decks/bulk with deckIds[] instead of
// the single-add route. Standalone (not parameterized inside the per-card
// component) because the bulk-mode toolbar owns the deckIds state, not any one
// card.

interface CollectionSummary {
  id: string;
  name: string;
}

interface BulkAddResult {
  added: number;
  skipped: number;
  total: number;
  collectionName: string;
}

interface BulkAddToCollectionPickerProps {
  open: boolean;
  deckIds: string[];
  onClose: () => void;
  onSuccess: (result: BulkAddResult) => void;
}

export default function BulkAddToCollectionPicker({
  open,
  deckIds,
  onClose,
  onSuccess,
}: BulkAddToCollectionPickerProps) {
  const t = useTranslations('bulk.addToCollectionPicker');
  const tCreate = useTranslations('collections.create');

  const [collections, setCollections] = useState<CollectionSummary[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createMode, setCreateMode] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);

  const fetchCollections = useCallback(async () => {
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/collections', {
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setCollections(data.collections);
    } catch {
      setError(t('errorGeneric'));
    }
  }, [t]);

  useEffect(() => {
    if (open && !createMode) fetchCollections();
  }, [open, createMode, fetchCollections]);

  async function handlePick(collectionId: string, collectionName: string) {
    setSubmitting(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/collections/${collectionId}/decks/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token ?? ''}`,
        },
        body: JSON.stringify({ deckIds }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      onSuccess({
        added: data.added,
        skipped: data.skipped,
        total: data.total,
        collectionName,
      });
    } catch {
      setError(t('errorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const name = createName.trim();
    if (!name) {
      setCreateError(tCreate('errorRequired'));
      return;
    }
    setSubmitting(true);
    setCreateError(null);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token ?? ''}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      await handlePick(data.collection.id, data.collection.name);
      setCreateMode(false);
      setCreateName('');
    } catch {
      setCreateError(tCreate('errorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 p-4"
      onClick={() => !submitting && onClose()}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-cream-50 rounded-lg p-6 w-full max-w-md shadow-xl"
      >
        <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
          {createMode
            ? tCreate('title')
            : t('pickerTitle', { count: deckIds.length })}
        </h2>

        {!createMode && (
          <>
            {collections === null && !error && (
              <p className="text-ink-500 mb-4">{t('pickerLoading')}</p>
            )}

            {collections !== null && collections.length === 0 && (
              <p className="text-ink-700 mb-4">{t('pickerEmpty')}</p>
            )}

            {collections !== null && collections.length > 0 && (
              <ul className="space-y-1 mb-4 max-h-[40vh] overflow-y-auto">
                {collections.map(c => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => handlePick(c.id, c.name)}
                      disabled={submitting}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-cream-200 transition disabled:opacity-60"
                    >
                      <div className="text-ink-900 font-medium">{c.name}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {error && <p className="text-terracotta-500 text-sm mb-3">{error}</p>}

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-cream-300">
              <button
                type="button"
                onClick={() => setCreateMode(true)}
                disabled={submitting}
                className="text-sm font-medium text-leaf-700 hover:underline"
              >
                {t('pickerCreate')}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="px-3 py-1.5 text-sm text-ink-600 hover:text-ink-900"
              >
                {t('pickerCancel')}
              </button>
            </div>
          </>
        )}

        {createMode && (
          <form onSubmit={handleCreate}>
            <label className="block mb-4">
              <span className="text-sm text-ink-700 mb-1 block">{tCreate('nameLabel')}</span>
              <input
                type="text"
                value={createName}
                onChange={e => setCreateName(e.target.value)}
                placeholder={tCreate('namePlaceholder')}
                disabled={submitting}
                autoFocus
                maxLength={100}
                className="w-full px-3 py-2 rounded-md border border-cream-300 bg-white text-ink-900 focus:outline-none focus:border-ink-700"
              />
            </label>
            {createError && <p className="text-terracotta-500 text-sm mb-3">{createError}</p>}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCreateMode(false)}
                disabled={submitting}
                className="px-4 py-2 text-ink-600 hover:text-ink-900"
              >
                {tCreate('cancel')}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-md bg-terracotta-400 text-cream-50 font-medium hover:bg-terracotta-500 disabled:opacity-60 transition"
              >
                {submitting ? tCreate('submitting') : tCreate('submit')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
