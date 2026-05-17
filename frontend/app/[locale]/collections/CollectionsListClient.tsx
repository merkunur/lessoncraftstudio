'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';

interface CollectionSummary {
  id: string;
  name: string;
  description: string | null;
  deckCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function CollectionsListClient({ locale }: { locale: string }) {
  const t = useTranslations('collections');
  const { user, loading: authLoading } = useAuth();

  const [collections, setCollections] = useState<CollectionSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const fetchCollections = useCallback(async () => {
    setLoading(true);
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
      setError(t('list.errorGeneric'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (!user) return;
    fetchCollections();
  }, [user, fetchCollections]);

  // Auth-loading shimmer
  if (authLoading) {
    return (
      <main className="container mx-auto px-4 max-w-5xl py-12">
        <p className="text-ink-500">{t('list.loading')}</p>
      </main>
    );
  }

  // Not signed in
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

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const name = createName.trim();
    if (!name) {
      setCreateError(t('create.errorRequired'));
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
        body: JSON.stringify({
          name,
          description: createDescription.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setCreateName('');
      setCreateDescription('');
      setCreateOpen(false);
      await fetchCollections();
    } catch {
      setCreateError(t('create.errorGeneric'));
    } finally {
      setCreateSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto px-4 max-w-5xl py-12">
      <header className="flex items-center justify-between mb-10 gap-4 flex-wrap">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900">
          {t('list.title')}
        </h1>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="px-4 py-2 rounded-md bg-terracotta-400 text-cream-50 font-medium hover:bg-terracotta-500 transition"
        >
          {t('list.newCollection')}
        </button>
      </header>

      {error && <p className="text-terracotta-500 mb-4">{error}</p>}

      {loading && collections === null && <p className="text-ink-500">{t('list.loading')}</p>}

      {collections !== null && collections.length === 0 && (
        <div className="border border-cream-300 rounded-lg p-8 bg-cream-50">
          <h2 className="font-display text-xl font-semibold text-ink-900 mb-2">
            {t('list.emptyStateTitle')}
          </h2>
          <p className="text-ink-700">{t('list.emptyStateBody')}</p>
        </div>
      )}

      {collections !== null && collections.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map(c => (
            <li
              key={c.id}
              className="border border-cream-300 rounded-lg bg-white hover:shadow-md transition"
            >
              <Link
                href={`/${locale}/collections/${c.id}`}
                className="block p-4"
              >
                <h2 className="font-display text-lg font-semibold text-ink-900 mb-1 line-clamp-1">
                  {c.name}
                </h2>
                {c.description && (
                  <p className="text-sm text-ink-600 mb-3 line-clamp-2">{c.description}</p>
                )}
                <p className="text-sm text-ink-500">
                  {t('list.deckCount', { count: c.deckCount })}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {createOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 p-4"
          onClick={() => !createSubmitting && setCreateOpen(false)}
        >
          <form
            onSubmit={handleCreate}
            onClick={e => e.stopPropagation()}
            className="bg-cream-50 rounded-lg p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
              {t('create.title')}
            </h2>
            <label className="block mb-4">
              <span className="text-sm text-ink-700 mb-1 block">{t('create.nameLabel')}</span>
              <input
                type="text"
                value={createName}
                onChange={e => setCreateName(e.target.value)}
                placeholder={t('create.namePlaceholder')}
                disabled={createSubmitting}
                autoFocus
                maxLength={100}
                className="w-full px-3 py-2 rounded-md border border-cream-300 bg-white text-ink-900 focus:outline-none focus:border-ink-700"
              />
            </label>
            <label className="block mb-4">
              <span className="text-sm text-ink-700 mb-1 block">{t('create.descriptionLabel')}</span>
              <textarea
                value={createDescription}
                onChange={e => setCreateDescription(e.target.value)}
                disabled={createSubmitting}
                maxLength={500}
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-cream-300 bg-white text-ink-900 focus:outline-none focus:border-ink-700 resize-none"
              />
            </label>
            {createError && <p className="text-terracotta-500 text-sm mb-3">{createError}</p>}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                disabled={createSubmitting}
                className="px-4 py-2 text-ink-600 hover:text-ink-900"
              >
                {t('create.cancel')}
              </button>
              <button
                type="submit"
                disabled={createSubmitting}
                className="px-4 py-2 rounded-md bg-terracotta-400 text-cream-50 font-medium hover:bg-terracotta-500 disabled:opacity-60 transition"
              >
                {createSubmitting ? t('create.submitting') : t('create.submit')}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
