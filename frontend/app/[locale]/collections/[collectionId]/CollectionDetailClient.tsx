'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import BulkSelectModeToggle from '@/components/catalog/BulkSelectModeToggle';
import DeckCardCheckbox from '@/components/catalog/DeckCardCheckbox';
import BulkSelectToolbar, { BulkAction } from '@/components/catalog/BulkSelectToolbar';
import ShareDeckButton from '@/components/catalog/ShareDeckButton';
import ShareLinkResultModal, { ShareLinkResult } from '@/components/catalog/ShareLinkResultModal';

interface CollectionDeckEntry {
  deckId: string;
  slug: string;
  language: string;
  title: Record<string, string>;
  exerciseType: string;
  ageRange: string;
  thumbnailUrl: string;
  pdfUrl: string;
  position: number;
  addedAt: string;
}

interface CollectionDetail {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  decks: CollectionDeckEntry[];
}

function deckTitleFor(deck: CollectionDeckEntry, locale: string): string {
  const t = deck.title;
  return t?.[locale] ?? t?.en ?? deck.slug;
}

function deckLinkFor(deck: CollectionDeckEntry): string {
  // §15.7 routing-contract: deck URLs are nginx-served, plain <a>, with-slash.
  return `/${deck.language}/decks/${deck.slug}/`;
}

export default function CollectionDetailClient({
  locale,
  collectionId,
}: {
  locale: string;
  collectionId: string;
}) {
  const t = useTranslations('collections');
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [collection, setCollection] = useState<CollectionDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [renameOpen, setRenameOpen] = useState(false);
  const [renameName, setRenameName] = useState('');
  const [renameSubmitting, setRenameSubmitting] = useState(false);
  const [renameError, setRenameError] = useState<string | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);

  // Tool 5A — bulk-mode state (Q-q Option I: mode toggle). In-page only per Q-r.
  const tBulk = useTranslations('bulk');
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedDeckIds, setSelectedDeckIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);
  const [shareResults, setShareResults] = useState<{
    results: ShareLinkResult[];
    skippedCount: number;
  } | null>(null);
  const [bulkConfirmation, setBulkConfirmation] = useState<string | null>(null);

  function flashBulkConfirmation(msg: string) {
    setBulkConfirmation(msg);
    setTimeout(() => setBulkConfirmation(null), 2500);
  }

  function toggleBulkMode() {
    if (bulkMode) {
      setSelectedDeckIds(new Set());
    }
    setBulkMode(b => !b);
  }

  function toggleDeckSelection(deckId: string) {
    setSelectedDeckIds(prev => {
      const next = new Set(prev);
      if (next.has(deckId)) next.delete(deckId);
      else next.add(deckId);
      return next;
    });
  }

  function clearBulkSelection() {
    setSelectedDeckIds(new Set());
    setBulkMode(false);
  }

  const fetchCollection = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/collections/${collectionId}`, {
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setCollection(data.collection);
      // Update document title to include collection name.
      if (typeof document !== 'undefined' && data.collection?.name) {
        document.title = `${data.collection.name}`;
      }
    } catch {
      setError(t('detail.errorGeneric'));
    } finally {
      setLoading(false);
    }
  }, [collectionId, t]);

  useEffect(() => {
    if (!user) return;
    fetchCollection();
  }, [user, fetchCollection]);

  if (authLoading) {
    return (
      <main className="container mx-auto px-4 max-w-5xl py-12">
        <p className="text-ink-500">{t('list.loading')}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">
          {t('gate.signInPromptTitle')}
        </h1>
        <p className="text-ink-700 mb-8">{t('gate.signInPromptBody')}</p>
        <Link
          href={`/${locale}/auth/signup`}
          className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          {t('gate.signInCta')}
        </Link>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <Link href={`/${locale}/collections`} className="text-ink-600 hover:text-ink-900">
          {t('detail.back')}
        </Link>
      </main>
    );
  }

  async function handleRename(e: React.FormEvent) {
    e.preventDefault();
    const name = renameName.trim();
    if (!name) {
      setRenameError(t('create.errorRequired'));
      return;
    }
    setRenameSubmitting(true);
    setRenameError(null);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/collections/${collectionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token ?? ''}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setRenameOpen(false);
      await fetchCollection();
    } catch {
      setRenameError(t('detail.errorGeneric'));
    } finally {
      setRenameSubmitting(false);
    }
  }

  async function handleDelete() {
    setDeleteSubmitting(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/collections/${collectionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push(`/${locale}/collections`);
    } catch {
      setError(t('detail.errorGeneric'));
      setDeleteSubmitting(false);
      setDeleteConfirmOpen(false);
    }
  }

  async function handleRemoveDeck(deckId: string) {
    if (!confirm(t('detail.removeDeckConfirm'))) return;
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`/api/collections/${collectionId}/decks/${deckId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      if (!res.ok) throw new Error(String(res.status));
      await fetchCollection();
    } catch {
      setError(t('detail.errorGeneric'));
    }
  }

  async function handleBulkAction(action: BulkAction) {
    const ids = Array.from(selectedDeckIds);
    if (ids.length === 0) return;
    setBulkBusy(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (action === 'removeFromCollection') {
        const res = await fetch(
          `/api/collections/${collectionId}/decks/bulk`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token ?? ''}`,
            },
            body: JSON.stringify({ deckIds: ids }),
          }
        );
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        await fetchCollection();
        flashBulkConfirmation(
          tBulk('removedConfirmation', { count: data.removed })
        );
        clearBulkSelection();
        return;
      }
      if (action === 'shareLinks') {
        const res = await fetch('/api/play-links/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token ?? ''}`,
          },
          body: JSON.stringify({ deckIds: ids }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        const titleByDeckId = new Map(
          (collection?.decks ?? []).map(d => [d.deckId, deckTitleFor(d, locale)])
        );
        const results: ShareLinkResult[] = data.playLinks.map(
          (p: {
            deckId: string;
            linkId: string;
            url: string;
            existing: boolean;
          }) => ({
            deckId: p.deckId,
            deckTitle: titleByDeckId.get(p.deckId) ?? p.deckId,
            url: p.url,
            existing: p.existing,
          })
        );
        setShareResults({
          results,
          skippedCount: Array.isArray(data.skipped) ? data.skipped.length : 0,
        });
        return;
      }
    } catch {
      flashBulkConfirmation(tBulk('errorGeneric'));
    } finally {
      setBulkBusy(false);
    }
  }

  if (!collection) {
    return (
      <main className="container mx-auto px-4 max-w-5xl py-12">
        <p className="text-ink-500">{t('list.loading')}</p>
      </main>
    );
  }

  return (
    <>
    <main className="container mx-auto px-4 max-w-5xl py-12">
      <Link
        href={`/${locale}/collections`}
        className="inline-block text-ink-600 hover:text-ink-900 mb-6"
      >
        {t('detail.back')}
      </Link>

      <header className="mb-10">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900">
            {collection.name}
          </h1>
          <div className="flex gap-2 flex-wrap">
            {collection.decks.length > 0 && (
              <BulkSelectModeToggle active={bulkMode} onToggle={toggleBulkMode} />
            )}
            <button
              type="button"
              onClick={() => {
                setRenameName(collection.name);
                setRenameOpen(true);
              }}
              className="px-3 py-1.5 text-sm text-ink-600 hover:text-ink-900 rounded-md hover:bg-cream-200 transition"
            >
              {t('detail.renameCta')}
            </button>
            <button
              type="button"
              onClick={() => setDeleteConfirmOpen(true)}
              className="px-3 py-1.5 text-sm text-terracotta-500 hover:bg-terracotta-50 rounded-md transition"
            >
              {t('detail.deleteCta')}
            </button>
          </div>
        </div>
        {collection.description && (
          <p className="text-ink-700">{collection.description}</p>
        )}
      </header>

      {error && <p className="text-terracotta-500 mb-4">{error}</p>}

      {collection.decks.length === 0 ? (
        <div className="border border-cream-300 rounded-lg p-8 bg-cream-50">
          <h2 className="font-display text-xl font-semibold text-ink-900 mb-2">
            {t('detail.emptyTitle')}
          </h2>
          <p className="text-ink-700">{t('detail.emptyBody')}</p>
        </div>
      ) : (
        <>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.decks.map(deck => {
            const title = deckTitleFor(deck, locale);
            const href = deckLinkFor(deck);
            const selected = selectedDeckIds.has(deck.deckId);
            return (
              <li
                key={deck.deckId}
                className={`relative border rounded-lg overflow-hidden bg-white shadow-sm transition ${
                  bulkMode && selected
                    ? 'border-leaf-600 ring-2 ring-leaf-600'
                    : 'border-cream-300 hover:shadow-md'
                }`}
              >
                {bulkMode && (
                  <DeckCardCheckbox
                    selected={selected}
                    onToggle={() => toggleDeckSelection(deck.deckId)}
                    ariaLabel={tBulk('checkboxAria', { title })}
                  />
                )}

                {bulkMode ? (
                  <button
                    type="button"
                    onClick={() => toggleDeckSelection(deck.deckId)}
                    className="block w-full text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={deck.thumbnailUrl}
                      alt={title}
                      width={480}
                      height={620}
                      loading="lazy"
                      className="w-full h-auto bg-cream-50"
                    />
                  </button>
                ) : (
                  <a href={href} className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={deck.thumbnailUrl}
                      alt={title}
                      width={480}
                      height={620}
                      loading="lazy"
                      className="w-full h-auto bg-cream-50"
                    />
                  </a>
                )}

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="font-display text-base font-semibold text-ink-900 line-clamp-2 flex-1">
                      {bulkMode ? (
                        <button
                          type="button"
                          onClick={() => toggleDeckSelection(deck.deckId)}
                          className="text-left hover:text-leaf-700"
                        >
                          {title}
                        </button>
                      ) : (
                        <a href={href} className="hover:text-leaf-700">
                          {title}
                        </a>
                      )}
                    </h2>
                    <span className="text-xs font-medium text-ink-500 uppercase flex-shrink-0">
                      {deck.language}
                    </span>
                  </div>
                  {!bulkMode && (
                    <div className="flex items-center gap-3 text-sm flex-wrap">
                      <a
                        href={href}
                        className="text-leaf-700 font-semibold hover:underline"
                      >
                        {t('detail.playOnline')}
                      </a>
                      <span className="text-ink-300" aria-hidden="true">·</span>
                      <a
                        href={deck.pdfUrl}
                        className="text-ink-600 hover:text-ink-900"
                        target="_blank"
                        rel="noopener"
                      >
                        {t('detail.pdf')}
                      </a>
                      <ShareDeckButton deckId={deck.deckId} />
                      <button
                        type="button"
                        onClick={() => handleRemoveDeck(deck.deckId)}
                        className="ml-auto text-xs text-terracotta-500 hover:text-terracotta-600"
                      >
                        {t('detail.removeDeck')}
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <BulkSelectToolbar
          count={selectedDeckIds.size}
          actions={['removeFromCollection', 'shareLinks']}
          busy={bulkBusy}
          onAction={handleBulkAction}
          onCancel={clearBulkSelection}
        />

        {shareResults && (
          <ShareLinkResultModal
            results={shareResults.results}
            skippedCount={shareResults.skippedCount}
            onClose={() => {
              setShareResults(null);
              clearBulkSelection();
            }}
          />
        )}

        {bulkConfirmation && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-md bg-ink-900 text-cream-50 text-sm shadow-lg"
          >
            {bulkConfirmation}
          </div>
        )}
        </>
      )}

      {renameOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 p-4"
          onClick={() => !renameSubmitting && setRenameOpen(false)}
        >
          <form
            onSubmit={handleRename}
            onClick={e => e.stopPropagation()}
            className="bg-cream-50 rounded-lg p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
              {t('detail.renameTitle')}
            </h2>
            <input
              type="text"
              value={renameName}
              onChange={e => setRenameName(e.target.value)}
              disabled={renameSubmitting}
              autoFocus
              maxLength={100}
              className="w-full px-3 py-2 rounded-md border border-cream-300 bg-white text-ink-900 focus:outline-none focus:border-ink-700 mb-3"
            />
            {renameError && <p className="text-terracotta-500 text-sm mb-3">{renameError}</p>}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setRenameOpen(false)}
                disabled={renameSubmitting}
                className="px-4 py-2 text-ink-600 hover:text-ink-900"
              >
                {t('detail.renameCancel')}
              </button>
              <button
                type="submit"
                disabled={renameSubmitting}
                className="px-4 py-2 rounded-md bg-terracotta-400 text-cream-50 font-medium hover:bg-terracotta-500 disabled:opacity-60 transition"
              >
                {renameSubmitting ? t('detail.renameSubmitting') : t('detail.renameSubmit')}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteConfirmOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 p-4"
          onClick={() => !deleteSubmitting && setDeleteConfirmOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-cream-50 rounded-lg p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-2">
              {t('detail.deleteConfirmTitle')}
            </h2>
            <p className="text-ink-700 mb-6">{t('detail.deleteConfirmBody')}</p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                disabled={deleteSubmitting}
                className="px-4 py-2 text-ink-600 hover:text-ink-900"
              >
                {t('detail.deleteCancel')}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteSubmitting}
                className="px-4 py-2 rounded-md bg-terracotta-500 text-cream-50 font-medium hover:bg-terracotta-600 disabled:opacity-60 transition"
              >
                {deleteSubmitting ? t('detail.deleteSubmitting') : t('detail.deleteConfirmCta')}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}
