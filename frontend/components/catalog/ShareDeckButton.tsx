'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';

// Subscriber-only "Share link" affordance for catalog deck cards. Mirrors
// AddToCollectionButton's gate pattern: render NOTHING for non-subscribers.
// Click → POST /api/play-links → modal with the URL + copy-to-clipboard.
// Idempotency at the API layer: re-sharing the same deck returns the existing
// PlayLink, so the URL stays stable across calls.

interface ShareDeckButtonProps {
  deckId: string;
}

export default function ShareDeckButton({ deckId }: ShareDeckButtonProps) {
  const t = useTranslations('share');
  const { user, loading: authLoading } = useAuth();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (authLoading) return null;
  if (!user || !isLcsSubscriptionActive(user)) return null;

  async function handleClick() {
    setOpen(true);
    setSubmitting(true);
    setError(null);
    setUrl(null);
    setCopied(false);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('/api/play-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token ?? ''}`,
        },
        body: JSON.stringify({ deckId }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setUrl(data.playLink.url);
    } catch {
      setError(t('errorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(t('errorClipboard'));
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="text-sm text-ink-600 hover:text-leaf-700 font-medium"
      >
        {t('label')}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 p-4"
          onClick={() => !submitting && setOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-cream-50 rounded-lg p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">
              {t('singleDeckTitle')}
            </h2>

            {submitting && <p className="text-ink-500 mb-4">{t('generating')}</p>}

            {error && <p className="text-terracotta-500 text-sm mb-3">{error}</p>}

            {url && !submitting && (
              <>
                <p className="text-sm text-ink-700 mb-3">{t('singleDeckBody')}</p>
                <div className="flex items-stretch gap-2 mb-4">
                  <input
                    type="text"
                    value={url}
                    readOnly
                    onFocus={e => e.currentTarget.select()}
                    className="flex-1 min-w-0 px-3 py-2 rounded-md border border-cream-300 bg-white text-ink-900 text-sm focus:outline-none focus:border-ink-700"
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-2 rounded-md bg-leaf-600 text-cream-50 text-sm font-medium hover:bg-leaf-700 transition flex-shrink-0"
                  >
                    {copied ? t('copied') : t('copy')}
                  </button>
                </div>
              </>
            )}

            <div className="flex justify-end pt-2 border-t border-cream-300">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-ink-600 hover:text-ink-900"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
