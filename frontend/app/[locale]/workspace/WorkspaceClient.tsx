'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import CollectionsWidget, { CollectionSummary } from './CollectionsWidget';
import RecentActivityWidget, { Activity } from './RecentActivityWidget';

interface WorkspacePayload {
  collections: CollectionSummary[];
  totalCollections: number;
  recentActivity: Activity[];
}

export default function WorkspaceClient({ locale }: { locale: string }) {
  const t = useTranslations('workspace');
  const { user, loading: authLoading } = useAuth();

  const [payload, setPayload] = useState<WorkspacePayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspace = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/workspace', {
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      if (!res.ok) throw new Error(String(res.status));
      const data: WorkspacePayload = await res.json();
      setPayload(data);
    } catch {
      setError(t('errorGeneric'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (!user || !isLcsSubscriptionActive(user)) return;
    fetchWorkspace();
  }, [user, fetchWorkspace]);

  if (authLoading) {
    return (
      <main className="container mx-auto px-4 max-w-5xl py-12">
        <p className="text-ink-500">{t('loading')}</p>
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

  return (
    <main className="container mx-auto px-4 max-w-5xl py-12">
      {/* Header — always renders per Q-n III hybrid empty-state framing. */}
      <header className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-2">
          {t('header.title')}
        </h1>
        <p className="text-ink-700">{t('header.welcomeLine')}</p>
      </header>

      {error && <p className="text-terracotta-500 mb-4">{error}</p>}

      {loading && payload === null && <p className="text-ink-500">{t('loading')}</p>}

      {payload !== null && (
        <div className="space-y-12">
          <CollectionsWidget
            locale={locale}
            collections={payload.collections}
            totalCount={payload.totalCollections}
            onChanged={fetchWorkspace}
          />

          <RecentActivityWidget
            locale={locale}
            activities={payload.recentActivity}
          />

          {/* Tool 2B FavoritesWidget slot — reserved for follow-on pass per Q-j Option II.
              Placeholder is a comment; no rendered DOM at Tool 2A. */}
        </div>
      )}
    </main>
  );
}
