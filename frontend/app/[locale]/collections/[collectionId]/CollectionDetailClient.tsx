'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';

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
        document.title = `${data.collection.name} | LessonCraftStudio`;
      }
    } catch {
      setError(t('detail.errorGeneric'));
    } finally {
      setLoading(false);
    }
  }, [collectionId, t]);

  useEffect(() => {
    if (!user || !isLcsSubscriptionActive(user)) return;
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
          href={`/${locale}/auth/signin`}
          className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          {t('gate.signInCta')}
        </Link>
      </main>
    );
  }

  if (!isLcsSubscriptionActive(user)) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">
          {t('gate.subscribePromptTitle')}
        </h1>
        <p className="text-ink-700 mb-8">{t('gate.subscribePromptBody')}</p>
        <Link
          href={`/${locale}#subscription`}
          className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          {t('gate.subscribeCta')}
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

  if (!collection) {
    return (
      <main className="container mx-auto px-4 max-w-5xl py-12">
        <p className="text-ink-500">{t('list.loading')}</p>
      </main>
    );
  }

  return (
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
          <div className="flex gap-2">
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
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.decks.map(deck => {
            const title = deckTitleFor(deck, locale);
            const href = deckLinkFor(deck);
            return (
              <li
                key={deck.deckId}
                className="border border-cream-300 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
              >
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
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="font-display text-base font-semibold text-ink-900 line-clamp-2 flex-1">
                      <a href={href} className="hover:text-leaf-700">
                        {title}
                      </a>
                    </h2>
                    <span className="text-xs font-medium text-ink-500 uppercase flex-shrink-0">
                      {deck.language}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
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
                    <button
                      type="button"
                      onClick={() => handleRemoveDeck(deck.deckId)}
                      className="ml-auto text-xs text-terracotta-500 hover:text-terracotta-600"
                    >
                      {t('detail.removeDeck')}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
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
  );
}
