'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export interface CollectionSummary {
  id: string;
  name: string;
  description: string | null;
  deckCount: number;
  createdAt: string;
  updatedAt: string;
}

interface CollectionsWidgetProps {
  locale: string;
  collections: CollectionSummary[];
  totalCount: number;
  onChanged: () => void;
}

export default function CollectionsWidget({
  locale,
  collections,
  totalCount,
  onChanged,
}: CollectionsWidgetProps) {
  const t = useTranslations('workspace.collections');
  const tCreate = useTranslations('collections.create');
  const router = useRouter();

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

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
        body: JSON.stringify({
          name,
          description: createDescription.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setCreateName('');
      setCreateDescription('');
      setCreateOpen(false);
      // Navigate directly to the new collection's detail page (Tool 1A pattern).
      router.push(`/${locale}/collections/${data.collection.id}`);
    } catch {
      setCreateError(tCreate('errorGeneric'));
    } finally {
      setCreateSubmitting(false);
    }
  }

  return (
    <section>
      <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink-900">
          {t('heading')}
        </h2>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="text-sm font-medium text-leaf-700 hover:underline"
        >
          {tCreate('title').startsWith('+') ? tCreate('title') : `+ ${tCreate('title')}`}
        </button>
      </div>

      {collections.length === 0 ? (
        <div className="border border-cream-300 rounded-lg p-6 bg-cream-50">
          <h3 className="font-display text-lg font-semibold text-ink-900 mb-2">
            {t('empty.title')}
          </h3>
          <p className="text-ink-700">{t('empty.body')}</p>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map(c => (
              <li
                key={c.id}
                className="border border-cream-300 rounded-lg bg-white hover:shadow-md transition"
              >
                <Link href={`/${locale}/collections/${c.id}`} className="block p-4">
                  <h3 className="font-display text-base font-semibold text-ink-900 mb-1 line-clamp-1">
                    {c.name}
                  </h3>
                  {c.description && (
                    <p className="text-sm text-ink-600 mb-2 line-clamp-2">{c.description}</p>
                  )}
                  <p className="text-sm text-ink-500">
                    {t('cardDeckCount', { count: c.deckCount })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {totalCount > collections.length && (
            <div className="mt-4">
              <Link
                href={`/${locale}/collections`}
                className="text-sm font-medium text-leaf-700 hover:underline"
              >
                {t('viewAll', { count: totalCount })}
              </Link>
            </div>
          )}
        </>
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
              {tCreate('title')}
            </h2>
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
            <label className="block mb-4">
              <span className="text-sm text-ink-700 mb-1 block">
                {tCreate('descriptionLabel')}
              </span>
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
        </div>
      )}
    </section>
  );
}
