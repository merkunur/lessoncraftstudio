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

/**
 * Palette note (2026-08-07): this modal was the last surface still wearing the
 * pre-Direction-A editorial skin — Fraunges `font-display`, `text-ink-900`,
 * `border-cream-300`, and Tailwind's STOCK `teal-700` #0F766E, which is not the
 * brand teal #146B5E. Both callers (the activity page and the workspace) are
 * Direction A surfaces, so clicking Share opened a modal in a visibly different
 * design language from the page behind it. This is a palette/typography change
 * only — no behavior, no props, no copy.
 */
const MODAL_FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8]';

const SECONDARY = `${MODAL_FOCUS} rounded-full border border-lcs-teal px-4 py-1.5 font-lcsBody text-sm font-bold text-lcs-teal transition-colors hover:bg-lcs-teal hover:text-[#FFFDF8]`;

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
        className="w-full max-w-md rounded-2xl bg-[#FFFDF8] p-6 text-center shadow-xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="activity-share-title"
          className="mb-1 font-lcsDisplay text-xl font-bold tracking-[-0.01em] text-[#14322D]"
        >
          {share.title}
        </h3>
        <p className="mb-5 font-lcsBody text-sm text-[#5E706A]">{intro}</p>

        <img
          src={share.qrUrl}
          alt={qrAlt}
          width={220}
          height={220}
          className="mx-auto rounded-xl border border-[#14322D]/10 bg-[#FFFDF8] p-2"
        />

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#14322D]/10 bg-[#F5F1E6] p-2">
          <input
            readOnly
            value={share.url}
            onFocus={(e) => e.currentTarget.select()}
            className="min-w-0 flex-1 bg-transparent px-2 font-lcsBody text-sm text-[#3D4F49] outline-none"
            aria-label={linkLabel}
          />
          <button
            type="button"
            onClick={() => {
              try { navigator.clipboard.writeText(share.url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* no-op */ }
            }}
            className={`${MODAL_FOCUS} shrink-0 rounded-full bg-lcs-teal px-3 py-1.5 font-lcsBody text-sm font-bold text-[#FFFDF8] transition-colors hover:bg-lcs-teal-deep`}
          >
            {copied ? copiedLabel : copyLabel}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <a
            href={share.url}
            target="_blank"
            rel="noopener noreferrer"
            className={SECONDARY}
          >
            {openLabel}
          </a>
          <a
            href={share.qrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={SECONDARY}
          >
            {downloadQrLabel}
          </a>
        </div>

        <p className="mt-5 font-lcsBody text-xs text-[#5E706A]">{noteLabel}</p>
        {workspaceHref && (
          <p className="mt-3 font-lcsBody text-xs text-[#5E706A]">
            <a href={workspaceHref} className="font-bold text-lcs-teal hover:underline">
              {t('savedToWorkspace')}
            </a>
          </p>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 font-lcsBody text-sm text-[#5E706A] underline underline-offset-4 transition-colors hover:text-[#14322D]"
        >
          {closeLabel}
        </button>
      </div>
    </div>,
    document.body
  );
}
