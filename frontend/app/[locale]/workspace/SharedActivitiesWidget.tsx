'use client';

/**
 * Shared activities — the Teacher plan surface for the 200+ interactive
 * activities. Self-fetching (GET /api/activities/share); lists the teacher's
 * shared-activity links with share (QR + copy) / rename / delete + a count
 * meter. Renders null when gated or empty (mirrors HostedWorksheetsWidget).
 */
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import ActivityShareModal, { type ActivityShare } from '@/components/activities/ActivityShareModal';

interface ShareRow {
  id: string;
  linkId: string;
  activityId: string;
  title: string;
  locale: string;
  viewCount: number;
  updatedAt: string;
  url: string;
  qrUrl: string;
  activitySlug: string | null;
}

interface Payload {
  shares: ShareRow[];
  limit: { count: number; maxCount: number };
}

export default function SharedActivitiesWidget({ locale }: { locale: string }) {
  const t = useTranslations('workspace');
  const [payload, setPayload] = useState<Payload | null>(null);
  const [gated, setGated] = useState(false);
  const [shareRow, setShareRow] = useState<ShareRow | null>(null);

  const load = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/activities/share', {
        headers: { Authorization: `Bearer ${token ?? ''}` },
      });
      if (res.status === 401 || res.status === 403) {
        setGated(true);
        return;
      }
      if (res.ok) setPayload(await res.json());
    } catch {
      /* widget stays empty on failure */
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const rename = async (row: ShareRow) => {
    const title = window.prompt(t('sharedActivities.renamePrompt'), row.title);
    if (title === null || !title.trim()) return;
    const token = localStorage.getItem('accessToken');
    await fetch(`/api/activities/share/${row.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token ?? ''}` },
      body: JSON.stringify({ title: title.trim() }),
    });
    load();
  };

  const remove = async (row: ShareRow) => {
    if (!window.confirm(t('sharedActivities.deleteConfirm'))) return;
    const token = localStorage.getItem('accessToken');
    await fetch(`/api/activities/share/${row.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token ?? ''}` },
    });
    load();
  };

  if (gated || payload === null) return null;

  return (
    <section aria-labelledby="shared-activities-heading">
      <div className="flex items-baseline justify-between mb-4">
        <h2 id="shared-activities-heading" className="font-display text-2xl font-semibold text-ink-900">
          {t('sharedActivities.title')}
        </h2>
        <span className="text-sm text-ink-500">
          {payload.limit.count}/{payload.limit.maxCount}
        </span>
      </div>

      {payload.shares.length === 0 ? (
        <p className="text-ink-500">{t('sharedActivities.empty')}</p>
      ) : (
        <ul className="space-y-3">
          {payload.shares.map((row) => (
            <li
              key={row.id}
              className="rounded-lg border border-teal-700/15 bg-cream-50 px-4 py-3 flex flex-wrap items-center gap-3"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900 truncate">{row.title}</p>
                <p className="text-xs text-ink-500">
                  {row.locale.toUpperCase()} · {t('sharedActivities.views', { count: row.viewCount })}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShareRow(row)}
                  className="rounded-full bg-teal-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-teal-800 transition"
                >
                  {t('sharedActivities.share')}
                </button>
                <button
                  type="button"
                  onClick={() => rename(row)}
                  className="rounded-full border border-ink-300 px-3 py-1 text-sm text-ink-600 hover:border-ink-500 transition"
                >
                  {t('sharedActivities.rename')}
                </button>
                <button
                  type="button"
                  onClick={() => remove(row)}
                  className="rounded-full border border-terracotta-400 px-3 py-1 text-sm text-terracotta-500 hover:bg-terracotta-500 hover:text-white transition"
                >
                  {t('sharedActivities.delete')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {shareRow && (
        <ActivityShareModal
          share={{ title: shareRow.title, url: shareRow.url, qrUrl: shareRow.qrUrl }}
          onClose={() => setShareRow(null)}
        />
      )}
    </section>
  );
}
