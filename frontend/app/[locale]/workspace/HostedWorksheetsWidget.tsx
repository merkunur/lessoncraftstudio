'use client';

/**
 * Hosted interactive worksheets — the Teacher plan's flagship surface.
 * Self-fetching (GET /api/worksheets/hosted); renders the teacher's saved
 * generator worksheets with copy-link / QR / rename / delete + quota meter.
 */
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface HostedRow {
  id: string;
  linkId: string;
  appId: string;
  title: string;
  locale: string;
  viewCount: number;
  updatedAt: string;
  url: string;
  qrUrl: string;
}

interface HostedPayload {
  worksheets: HostedRow[];
  quota: { count: number; maxCount: number; totalBytes: number; maxTotalBytes: number };
}

export default function HostedWorksheetsWidget() {
  const t = useTranslations('workspace');
  const [payload, setPayload] = useState<HostedPayload | null>(null);
  const [gated, setGated] = useState(false);
  const [shareRow, setShareRow] = useState<HostedRow | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  const load = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/worksheets/hosted', {
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


  const rename = async (row: HostedRow) => {
    const title = window.prompt(t('hosted.renamePrompt'), row.title);
    if (title === null || !title.trim()) return;
    const token = localStorage.getItem('accessToken');
    await fetch(`/api/worksheets/hosted/${row.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token ?? ''}` },
      body: JSON.stringify({ title: title.trim() }),
    });
    load();
  };

  const remove = async (row: HostedRow) => {
    if (!window.confirm(t('hosted.deleteConfirm'))) return;
    const token = localStorage.getItem('accessToken');
    await fetch(`/api/worksheets/hosted/${row.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token ?? ''}` },
    });
    load();
  };

  if (gated || payload === null) return null;

  return (
    <section aria-labelledby="hosted-worksheets-heading">
      <div className="flex items-baseline justify-between mb-4">
        <h2 id="hosted-worksheets-heading" className="font-display text-2xl font-semibold text-ink-900">
          {t('hosted.title')}
        </h2>
        <span className="text-sm text-ink-500">
          {payload.quota.count}/{payload.quota.maxCount}
        </span>
      </div>

      {payload.worksheets.length === 0 ? (
        <p className="text-ink-500">{t('hosted.empty')}</p>
      ) : (
        <ul className="space-y-3">
          {payload.worksheets.map((row) => (
            <li
              key={row.id}
              className="rounded-lg border border-teal-700/15 bg-cream-50 px-4 py-3 flex flex-wrap items-center gap-3"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink-900 truncate">{row.title}</p>
                <p className="text-xs text-ink-500">
                  {row.appId} · {t('hosted.views', { count: row.viewCount })}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => { setShareRow(row); setShareCopied(false); }}
                  className="rounded-full bg-teal-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-teal-800 transition"
                >
                  {t('hosted.share')}
                </button>
                <button
                  type="button"
                  onClick={() => rename(row)}
                  className="rounded-full border border-ink-300 px-3 py-1 text-sm text-ink-600 hover:border-ink-500 transition"
                >
                  {t('hosted.rename')}
                </button>
                <button
                  type="button"
                  onClick={() => remove(row)}
                  className="rounded-full border border-terracotta-400 px-3 py-1 text-sm text-terracotta-500 hover:bg-terracotta-500 hover:text-white transition"
                >
                  {t('hosted.delete')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {shareRow && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4"
          onClick={() => setShareRow(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="share-title" className="font-display text-xl font-semibold text-ink-900 mb-1">
              {shareRow.title}
            </h3>
            <p className="text-sm text-ink-500 mb-5">{t('hosted.shareIntro')}</p>

            <img
              src={shareRow.qrUrl}
              alt={t('hosted.qrAlt')}
              width={220}
              height={220}
              className="mx-auto rounded-xl border border-cream-300 bg-white p-2"
            />

            <div className="mt-5 flex items-center gap-2 rounded-lg border border-cream-300 bg-cream-50 p-2">
              <input
                readOnly
                value={shareRow.url}
                onFocus={(e) => e.currentTarget.select()}
                className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink-700 outline-none"
                aria-label={t('hosted.linkLabel')}
              />
              <button
                type="button"
                onClick={() => {
                  try { navigator.clipboard.writeText(shareRow.url); setShareCopied(true); setTimeout(() => setShareCopied(false), 1800); } catch { /* no-op */ }
                }}
                className="shrink-0 rounded-md bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-teal-800 transition"
              >
                {shareCopied ? t('hosted.copied') : t('hosted.copy')}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <a
                href={shareRow.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-teal-700 px-4 py-1.5 text-sm font-semibold text-teal-800 hover:bg-teal-700 hover:text-white transition"
              >
                {t('hosted.openWorksheet')}
              </a>
              <a
                href={shareRow.qrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-teal-700 px-4 py-1.5 text-sm font-semibold text-teal-800 hover:bg-teal-700 hover:text-white transition"
              >
                {t('hosted.downloadQr')}
              </a>
            </div>

            <p className="mt-5 text-xs text-ink-500">{t('hosted.shareNote')}</p>
            <button
              type="button"
              onClick={() => setShareRow(null)}
              className="mt-4 text-sm text-ink-500 hover:text-ink-800 underline"
            >
              {t('hosted.close')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
