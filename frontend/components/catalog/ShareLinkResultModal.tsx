'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// Modal opened after a bulk share-link-batch completes. Renders the list of
// generated PlayLink URLs with per-link copy + "Copy all" affordance per
// Q-t Option I. Receives results from the bulk-mode toolbar via parent state.

export interface ShareLinkResult {
  deckId: string;
  deckTitle: string;
  url: string;
  existing: boolean;
}

interface ShareLinkResultModalProps {
  results: ShareLinkResult[];
  skippedCount: number;
  onClose: () => void;
}

export default function ShareLinkResultModal({
  results,
  skippedCount,
  onClose,
}: ShareLinkResultModalProps) {
  const t = useTranslations('share');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copyAllState, setCopyAllState] = useState<'idle' | 'done'>('idle');

  async function copyOne(url: string, key: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Best-effort; surface no error UI for transient clipboard failures.
    }
  }

  async function copyAll() {
    const text = results.map(r => r.url).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopyAllState('done');
      setTimeout(() => setCopyAllState('idle'), 2000);
    } catch {
      // Best-effort.
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 p-4"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-cream-50 rounded-lg p-6 w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col"
      >
        <h2 className="font-display text-xl font-semibold text-ink-900 mb-2">
          {t('bulkResultsTitle', { count: results.length })}
        </h2>
        {skippedCount > 0 && (
          <p className="text-sm text-terracotta-500 mb-3">
            {t('bulkResultsSkipped', { count: skippedCount })}
          </p>
        )}

        <div className="flex-1 overflow-y-auto -mx-2 px-2">
          <ul className="space-y-2 mb-4">
            {results.map(r => {
              const key = `${r.deckId}:${r.url}`;
              return (
                <li
                  key={key}
                  className="border border-cream-300 rounded-md bg-white p-3"
                >
                  <p className="font-display text-sm font-semibold text-ink-900 mb-1 line-clamp-1">
                    {r.deckTitle}
                  </p>
                  <div className="flex items-stretch gap-2">
                    <input
                      type="text"
                      value={r.url}
                      readOnly
                      onFocus={e => e.currentTarget.select()}
                      className="flex-1 min-w-0 px-2 py-1 rounded border border-cream-300 bg-cream-50 text-ink-900 text-xs focus:outline-none focus:border-ink-700"
                    />
                    <button
                      type="button"
                      onClick={() => copyOne(r.url, key)}
                      className="px-2 py-1 rounded bg-leaf-600 text-cream-50 text-xs font-medium hover:bg-leaf-700 transition flex-shrink-0"
                    >
                      {copiedKey === key ? t('copied') : t('copy')}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-between items-center gap-3 pt-3 border-t border-cream-300">
          <button
            type="button"
            onClick={copyAll}
            disabled={results.length === 0}
            className="px-4 py-2 rounded-md bg-leaf-600 text-cream-50 text-sm font-medium hover:bg-leaf-700 transition disabled:opacity-60"
          >
            {copyAllState === 'done' ? t('copiedAll') : t('copyAll')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-ink-600 hover:text-ink-900"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
