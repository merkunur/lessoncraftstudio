'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';

// Subscriber-only "Add to collection" affordance for catalog deck cards.
// Per Q-a Option I: render NOTHING for non-subscribers (no upsell on cards).
// Mounts on each deck card on topic pages, BreadthGrid (future), search results
// (future). Topic-page deck-card consumer is the first to attach.
//
// Click → opens a small picker modal listing user's collections + a
// "+ New collection" inline action. Selection → POST /api/collections/:id/decks.

interface AddToCollectionButtonProps {
  deckId: string;
}

interface CollectionSummary {
  id: string;
  name: string;
  deckCount: number;
}

export default function AddToCollectionButton({ deckId }: AddToCollectionButtonProps) {
  const t = useTranslations('collections.addAffordance');
  const tCreate = useTranslations('collections.create');
  const { user, loading: authLoading } = useAuth();

  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState<CollectionSummary[] | null>(null);
  const [picking, setPicking] = useState(false);
  const [pickError, setPickError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const [createMode, setCreateMode] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // React Hook Rules: ALL hooks must be called unconditionally + in same order
  // on every render. The subscriber-only render gate below uses early-returns,
  // so useCallback + useEffect MUST be declared BEFORE those returns.
  // Pre-fix (commit c9ebb2fa diagnostic): hooks were AFTER the early return →
  // hook count differed across renders (12 on non-subscriber path; 14 on
  // subscriber path) → React #310 hydration mismatch fired on every page
  // load that mounts this component (deck cards on topic pages).

  const fetchCollections = useCallback(async () => {
    setPickError(null);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/collections', {
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setCollections(data.collections);
    } catch {
      setPickError(t('errorGeneric'));
    }
  }, [t]);

  // Refetch list every time picker opens (cheap; fresh data).
  useEffect(() => {
    if (open && !createMode) {
      fetchCollections();
    }
  }, [open, createMode, fetchCollections]);

  // Subscriber-only render gate per Q-a Option I.
  // MUST come AFTER all hooks per React Hook Rules.
  if (authLoading) return null;
  if (!user) return null;

  async function handlePick(collectionId: string, collectionName: string) {
    setPicking(true);
    setPickError(null);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/collections/${collectionId}/decks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token ?? ''}`,
        },
        body: JSON.stringify({ deckId }),
      });
      if (res.status === 409) {
        setPickError(t('alreadyIn'));
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setConfirmation(t('added', { collectionName }));
      setOpen(false);
      // Auto-clear confirmation after 2.5s.
      setTimeout(() => setConfirmation(null), 2500);
    } catch {
      setPickError(t('errorGeneric'));
    } finally {
      setPicking(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const name = createName.trim();
    if (!name) {
      setCreateError(tCreate('errorRequired'));
      return;
    }
    setCreateSubmitting(true);
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
      // Auto-add the deck to the freshly-created collection.
      await handlePick(data.collection.id, data.collection.name);
      setCreateMode(false);
      setCreateName('');
    } catch {
      setCreateError(tCreate('errorGeneric'));
    } finally {
      setCreateSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setCreateMode(false);
          setPickError(null);
        }}
        className="text-sm text-ink-600 hover:text-leaf-700 font-medium"
      >
        {t('label')}
      </button>

      {confirmation && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 rounded-md bg-ink-900 text-cream-50 text-sm shadow-lg"
        >
          {confirmation}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 p-4"
          onClick={() => !picking && !createSubmitting && setOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-cream-50 rounded-lg p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
              {createMode ? tCreate('title') : t('pickerTitle')}
            </h2>

            {!createMode && (
              <>
                {collections === null && !pickError && (
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
                          disabled={picking}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-cream-200 transition disabled:opacity-60"
                        >
                          <div className="text-ink-900 font-medium">{c.name}</div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {pickError && <p className="text-terracotta-500 text-sm mb-3">{pickError}</p>}

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-cream-300">
                  <button
                    type="button"
                    onClick={() => setCreateMode(true)}
                    disabled={picking}
                    className="text-sm font-medium text-leaf-700 hover:underline"
                  >
                    {t('pickerCreate')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={picking}
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
                    disabled={createSubmitting}
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
                    disabled={createSubmitting}
                    className="px-4 py-2 text-ink-600 hover:text-ink-900"
                  >
                    {tCreate('cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={createSubmitting}
                    className="px-4 py-2 rounded-md bg-terracotta-400 text-cream-50 font-medium hover:bg-terracotta-500 disabled:opacity-60 transition"
                  >
                    {createSubmitting ? tCreate('submitting') : tCreate('submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
