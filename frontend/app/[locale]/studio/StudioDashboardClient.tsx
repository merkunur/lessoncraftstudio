'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import { studioStrings } from './studio-strings';

// Story Studio — My Stories dashboard (workspace/collections client pattern:
// auth gate → subscription gate → content). Templates are curated operator
// stories cloned server-side at zero tenant-storage cost.

interface StoryRow {
  id: string;
  title: string;
  pages: number;
  gradeBand: string | null;
  locale: string;
  shared: boolean;
  firstScene: string | null;
  updatedAt: string;
}

// Curated starter templates (operator stories under mini-tools/stories/).
// Phase B/D grows this into cover-card curation per grade band.
const TEMPLATES: Array<{ id: string; grade: string; title: { en: string; de: string } }> = [
  { id: 'pips-picnic', grade: '1', title: { en: "Pip's Picnic (Grade 1 · counting & words)", de: 'Pips Picknick (Klasse 1 · Zählen & Wörter)' } },
];

const GRADE_ORDER = ['PK', 'K', '1', '2', '3'];

export default function StudioDashboardClient({ locale }: { locale: string }) {
  const s = studioStrings(locale);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [stories, setStories] = useState<StoryRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [gradeBand, setGradeBand] = useState('K');
  const [template, setTemplate] = useState<string | null>(null);

  const authHeaders = useCallback((): Record<string, string> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    return { Authorization: `Bearer ${token ?? ''}` };
  }, []);

  const fetchStories = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/studio/stories', { headers: authHeaders() });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setStories(data.stories || []);
    } catch {
      setError(s.errorGeneric);
    }
  }, [authHeaders, s.errorGeneric]);

  useEffect(() => {
    if (!user || !isLcsSubscriptionActive(user)) return;
    fetchStories();
  }, [user, fetchStories]);

  async function createStory() {
    if (!title.trim() || creating) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch('/api/studio/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ title: title.trim(), gradeBand, locale, template }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || String(res.status));
      router.push(`/${locale}/studio/${data.id}`);
    } catch (e: any) {
      setError(e.message || s.errorGeneric);
      setCreating(false);
    }
  }

  async function deleteStory(id: string) {
    if (!window.confirm(s.deleteConfirm)) return;
    try {
      const res = await fetch(`/api/studio/stories/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStories(prev => (prev ? prev.filter(st => st.id !== id) : prev));
    } catch {
      setError(s.errorGeneric);
    }
  }

  if (authLoading) {
    return (
      <main className="container mx-auto px-4 max-w-5xl py-12">
        <p className="text-ink-500">{s.loading}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">{s.signInTitle}</h1>
        <p className="text-ink-700 mb-8">{s.signInBody}</p>
        <Link
          href={`/${locale}/auth/signin`}
          className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          {s.signInCta}
        </Link>
      </main>
    );
  }

  if (!isLcsSubscriptionActive(user)) {
    return (
      <main className="container mx-auto px-4 max-w-3xl py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">{s.subscriberTitle}</h1>
        <p className="text-ink-700 mb-8">{s.subscriberBody}</p>
        {PRICING_PUBLIC && (
          <Link
            href={`/${locale}/pricing`}
            className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
          >
            {s.subscriberCta}
          </Link>
        )}
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 max-w-5xl py-12">
      <header className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-2">
          {s.dashTitle}
        </h1>
        <p className="text-ink-700 max-w-2xl">{s.dashIntro}</p>
      </header>

      {error && <p className="text-terracotta-500 mb-4">{error}</p>}

      <section className="mb-12">
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          + {s.newStory}
        </button>
      </section>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-cream-50 p-6 shadow-xl">
            <h2 className="font-display text-2xl font-semibold text-ink-900 mb-5">{s.newStory}</h2>

            <label className="block text-sm font-semibold text-ink-900 mb-1">{s.titleLabel}</label>
            <input
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={s.titlePlaceholder}
              maxLength={120}
              className="w-full rounded-md border border-cream-300 bg-white px-3 py-2 mb-4 text-ink-900"
            />

            <label className="block text-sm font-semibold text-ink-900 mb-1">{s.gradeLabel}</label>
            <p className="text-xs text-ink-500 mb-2">{s.gradeHint}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {GRADE_ORDER.map(g => (
                <button
                  key={g}
                  onClick={() => setGradeBand(g)}
                  className={
                    'px-3 py-1.5 rounded-full border text-sm font-semibold transition ' +
                    (gradeBand === g
                      ? 'bg-terracotta-400 border-terracotta-400 text-cream-50'
                      : 'bg-white border-cream-300 text-ink-700 hover:border-terracotta-400')
                  }
                >
                  {s.grades[g]}
                </button>
              ))}
            </div>

            <label className="block text-sm font-semibold text-ink-900 mb-2">{s.fromTemplate}</label>
            <div className="grid gap-2 mb-6">
              <button
                onClick={() => setTemplate(null)}
                className={
                  'text-left rounded-md border px-4 py-3 transition ' +
                  (template === null
                    ? 'border-terracotta-400 bg-white'
                    : 'border-cream-300 bg-white hover:border-terracotta-400')
                }
              >
                <span className="font-semibold text-ink-900">{s.startBlank}</span>
                <span className="block text-sm text-ink-500">{s.startBlankBlurb}</span>
              </button>
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={
                    'text-left rounded-md border px-4 py-3 transition ' +
                    (template === t.id
                      ? 'border-terracotta-400 bg-white'
                      : 'border-cream-300 bg-white hover:border-terracotta-400')
                  }
                >
                  <span className="font-semibold text-ink-900">
                    {locale === 'de' ? t.title.de : t.title.en}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCreate(false)}
                className="px-5 py-2.5 rounded-md border border-cream-300 text-ink-700 font-semibold hover:bg-cream-100 transition"
              >
                {s.cancel}
              </button>
              <button
                onClick={createStory}
                disabled={!title.trim() || creating}
                className="px-5 py-2.5 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition disabled:opacity-50"
              >
                {creating ? s.creating : s.create}
              </button>
            </div>
          </div>
        </div>
      )}

      <section>
        <h2 className="font-display text-2xl font-semibold text-ink-900 mb-5">{s.myStories}</h2>

        {stories === null && <p className="text-ink-500">{s.loading}</p>}

        {stories !== null && stories.length === 0 && (
          <div className="rounded-lg border border-cream-300 bg-cream-50 px-8 py-12 text-center">
            <p className="font-display text-xl font-semibold text-ink-900 mb-2">{s.emptyTitle}</p>
            <p className="text-ink-700">{s.emptyBody}</p>
          </div>
        )}

        {stories !== null && stories.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map(st => (
              <div
                key={st.id}
                className="rounded-lg border border-cream-300 bg-white overflow-hidden flex flex-col"
              >
                <Link
                  href={`/${locale}/studio/${st.id}`}
                  className="block aspect-[16/10] bg-cream-100 overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {st.firstScene ? (
                    <img src={st.firstScene} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">📖</div>
                  )}
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-ink-900 leading-snug">{st.title}</h3>
                    <span
                      className={
                        'shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ' +
                        (st.shared ? 'bg-teal-100 text-teal-800' : 'bg-cream-100 text-ink-500')
                      }
                    >
                      {st.shared ? s.shared : s.draft}
                    </span>
                  </div>
                  <p className="text-sm text-ink-500 mb-4">
                    {st.gradeBand ? s.grades[st.gradeBand] + ' · ' : ''}
                    {st.pages} {s.pagesLabel} · {s.edited}{' '}
                    {new Date(st.updatedAt).toLocaleDateString(locale)}
                  </p>
                  <div className="mt-auto flex gap-2">
                    <Link
                      href={`/${locale}/studio/${st.id}`}
                      className="px-4 py-1.5 rounded-md bg-terracotta-400 text-cream-50 text-sm font-semibold hover:bg-terracotta-500 transition"
                    >
                      {s.open}
                    </Link>
                    <button
                      onClick={() => deleteStory(st.id)}
                      className="px-3 py-1.5 rounded-md border border-cream-300 text-ink-500 text-sm font-semibold hover:text-terracotta-500 hover:border-terracotta-400 transition"
                    >
                      {s.delete_}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
