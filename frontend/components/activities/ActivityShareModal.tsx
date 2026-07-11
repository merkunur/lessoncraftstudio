'use client';

/**
 * Shared "share this activity with your class" modal — a QR + copy-link card.
 * Used by both ActivityShareButton (on the activity page) and
 * SharedActivitiesWidget (in the workspace) so the surface is identical
 * everywhere. Copy reads the `activityShare` namespace.
 */
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export interface ActivityShare {
  title: string;
  url: string;
  qrUrl: string;
}

export default function ActivityShareModal({
  share,
  onClose,
}: {
  share: ActivityShare;
  onClose: () => void;
}) {
  const t = useTranslations('activityShare');
  const [copied, setCopied] = useState(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-share-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="activity-share-title" className="font-display text-xl font-semibold text-ink-900 mb-1">
          {share.title}
        </h3>
        <p className="text-sm text-ink-500 mb-5">{t('modalIntro')}</p>

        <img
          src={share.qrUrl}
          alt={t('qrAlt')}
          width={220}
          height={220}
          className="mx-auto rounded-xl border border-cream-300 bg-white p-2"
        />

        <div className="mt-5 flex items-center gap-2 rounded-lg border border-cream-300 bg-cream-50 p-2">
          <input
            readOnly
            value={share.url}
            onFocus={(e) => e.currentTarget.select()}
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink-700 outline-none"
            aria-label={t('linkLabel')}
          />
          <button
            type="button"
            onClick={() => {
              try { navigator.clipboard.writeText(share.url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* no-op */ }
            }}
            className="shrink-0 rounded-md bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-teal-800 transition"
          >
            {copied ? t('copied') : t('copy')}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <a
            href={share.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-teal-700 px-4 py-1.5 text-sm font-semibold text-teal-800 hover:bg-teal-700 hover:text-white transition"
          >
            {t('openActivity')}
          </a>
          <a
            href={share.qrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-teal-700 px-4 py-1.5 text-sm font-semibold text-teal-800 hover:bg-teal-700 hover:text-white transition"
          >
            {t('downloadQr')}
          </a>
        </div>

        <p className="mt-5 text-xs text-ink-500">{t('shareNote')}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-sm text-ink-500 hover:text-ink-800 underline"
        >
          {t('close')}
        </button>
      </div>
    </div>
  );
}
