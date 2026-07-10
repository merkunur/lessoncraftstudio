'use client';

/**
 * Favorites — the FREE-account layer widget (fills the Tool 2B slot).
 * Self-fetching (GET /api/favorites); available to every signed-in teacher.
 */
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface FavoriteRow {
  deckId: string;
  slug: string;
  language: string;
  title: string;
  url: string;
}

export default function FavoritesWidget() {
  const t = useTranslations('workspace');
  const [rows, setRows] = useState<FavoriteRow[] | null>(null);

  const load = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/favorites', {
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      if (res.ok) setRows((await res.json()).favorites);
    } catch {
      /* widget stays empty */
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (deckId: string) => {
    const token = localStorage.getItem('accessToken');
    await fetch('/api/favorites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token ?? ''}` },
      body: JSON.stringify({ deckId }),
    });
    load();
  };

  if (rows === null || rows.length === 0) return null;

  return (
    <section aria-labelledby="favorites-heading">
      <h2 id="favorites-heading" className="font-display text-2xl font-semibold text-ink-900 mb-4">
        {t('favorites.title')}
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {rows.map((f) => (
          <li
            key={f.deckId}
            className="rounded-lg border border-teal-700/15 bg-cream-50 px-4 py-2 flex items-center gap-3"
          >
            {/* nginx-served deck page → plain <a> per the routing contract (§15.7) */}
            <a href={f.url} className="min-w-0 flex-1 truncate text-teal-800 hover:underline">
              {f.title}
            </a>
            <button
              type="button"
              onClick={() => remove(f.deckId)}
              aria-label={t('favorites.remove')}
              className="shrink-0 text-terracotta-500 hover:text-terracotta-700 text-lg leading-none"
            >
              ♥
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
