'use client';

/**
 * Shared "share this activity with your class" modal — a QR + copy-link card.
 * Used by ActivityShareButton (on the activity page) and by both workspace
 * sections (shared activities + hosted worksheets) so the surface is identical
 * everywhere. Copy reads the `activityShare` namespace unless the caller passes
 * `labels` (see ActivityShareLabels).
 */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

export interface ActivityShare {
  title: string;
  url: string;
  qrUrl: string;
}

/**
 * Optional caller-supplied copy. The workspace's hosted-worksheet surface is
 * this same modal with a different namespace (`workspace.hosted.*`) and one
 * different verb ("Open worksheet" vs "Open activity"), so rather than keeping
 * a second 74-line copy of this component there, that caller passes its own
 * strings. Omitted → the `activityShare` namespace is read exactly as before,
 * so the public activity page is unaffected.
 */
export interface ActivityShareLabels {
  intro: string;
  qrAlt: string;
  linkLabel: string;
  copy: string;
  copied: string;
  open: string;
  downloadQr: string;
  note: string;
  close: string;
}

export default function ActivityShareModal({
  share,
  onClose,
  workspaceHref,
  labels,
}: {
  share: ActivityShare;
  onClose: () => void;
  /** When set (activity-page caller), the modal shows a "Saved to your
   *  workspace" pointer link. Omitted by the workspace widget (redundant there). */
  workspaceHref?: string;
  labels?: ActivityShareLabels;
}) {
  const t = useTranslations('activityShare');
  const [copied, setCopied] = useState(false);

  const intro = labels?.intro ?? t('modalIntro');
  const qrAlt = labels?.qrAlt ?? t('qrAlt');
  const linkLabel = labels?.linkLabel ?? t('linkLabel');
  const copyLabel = labels?.copy ?? t('copy');
  const copiedLabel = labels?.copied ?? t('copied');
  const openLabel = labels?.open ?? t('openActivity');
  const downloadQrLabel = labels?.downloadQr ?? t('downloadQr');
  const noteLabel = labels?.note ?? t('shareNote');
  const closeLabel = labels?.close ?? t('close');

  // Lock background scroll + close on Escape while the modal is open
  // (mirrors FeaturedDeckTileV3).
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Render OUTSIDE the activity page's stacking context (an iframe-bearing,
  // overflow-hidden section paints over an inline fixed overlay) — portal to
  // <body> so the fixed z-[100] overlay + card sit above everything.
  if (typeof document === 'undefined') return null;

  return createPortal(
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
        <p className="text-sm text-ink-500 mb-5">{intro}</p>

        <img
          src={share.qrUrl}
          alt={qrAlt}
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
            aria-label={linkLabel}
          />
          <button
            type="button"
            onClick={() => {
              try { navigator.clipboard.writeText(share.url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* no-op */ }
            }}
            className="shrink-0 rounded-md bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-teal-800 transition"
          >
            {copied ? copiedLabel : copyLabel}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <a
            href={share.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-teal-700 px-4 py-1.5 text-sm font-semibold text-teal-800 hover:bg-teal-700 hover:text-white transition"
          >
            {openLabel}
          </a>
          <a
            href={share.qrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-teal-700 px-4 py-1.5 text-sm font-semibold text-teal-800 hover:bg-teal-700 hover:text-white transition"
          >
            {downloadQrLabel}
          </a>
        </div>

        <p className="mt-5 text-xs text-ink-500">{noteLabel}</p>
        {workspaceHref && (
          <p className="mt-3 text-xs text-ink-500">
            <a href={workspaceHref} className="text-teal-700 font-semibold hover:underline">
              {t('savedToWorkspace')}
            </a>
          </p>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-sm text-ink-500 hover:text-ink-800 underline"
        >
          {closeLabel}
        </button>
      </div>
    </div>,
    document.body
  );
}
