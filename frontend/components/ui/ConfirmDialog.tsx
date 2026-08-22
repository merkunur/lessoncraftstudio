'use client';

import { useId } from 'react';
import Modal from './Modal';

/**
 * Styled replacement for `window.confirm()`.
 *
 * `tone="danger"` paints the confirm button brick #B3392B — the platform's
 * destruction-only color (four-role contract: ink reads, teal interacts, coral
 * is the one CTA, brick destroys) — so a delete never looks like a primary
 * call to action. Terracotta is banned on this surface; teal is never a text
 * fill (text runs on the ink ramp).
 */
export interface ConfirmDialogProps {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  tone?: 'danger' | 'default';
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  title,
  body,
  confirmLabel,
  cancelLabel,
  tone = 'danger',
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();

  // White text passes on brick (5.9:1); on coral the passing pair is INK
  // (4.97:1 — white on coral is 2.73:1, a WCAG failure).
  const confirmClass =
    tone === 'danger'
      ? 'bg-[#B3392B] text-[#FFFDF8] hover:bg-[#9C3226]'
      : 'bg-lcs-coral text-[#14322D] hover:shadow-[0_3px_10px_-2px_rgba(84,66,39,0.4)]';

  return (
    <Modal onClose={onCancel} labelledBy={titleId} size="sm" closeOnBackdrop={!busy}>
      <h2 id={titleId} className="font-lcsDisplay text-lg font-bold tracking-[-0.01em] text-[#14322D]">
        {title}
      </h2>
      <p className="mt-2 font-lcsBody text-sm leading-relaxed text-[#3D4F49]">{body}</p>

      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="min-h-[44px] rounded-full px-4 py-2 font-lcsBody text-sm font-semibold text-[#5E706A] transition-colors hover:text-[#14322D] disabled:text-[#9AA8A3]"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={busy}
          className={`min-h-[44px] rounded-full px-5 py-2 font-lcsDisplay text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] disabled:opacity-60 ${confirmClass}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
