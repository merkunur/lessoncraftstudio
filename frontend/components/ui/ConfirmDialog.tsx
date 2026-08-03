'use client';

import { useId } from 'react';
import Modal from './Modal';

/**
 * Styled replacement for `window.confirm()`.
 *
 * `tone="danger"` paints the confirm button terracotta (the existing
 * destructive-action token) rather than the Direction A coral CTA, so a
 * delete never looks like a primary call to action.
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

  const confirmClass =
    tone === 'danger'
      ? 'bg-terracotta-500 hover:bg-terracotta-400'
      : 'bg-lcs-coral hover:bg-lcs-coral-deep';

  return (
    <Modal onClose={onCancel} labelledBy={titleId} size="sm" closeOnBackdrop={!busy}>
      <h2 id={titleId} className="font-lcsDisplay text-lg font-bold text-lcs-teal">
        {title}
      </h2>
      <p className="mt-2 font-lcsBody text-sm leading-relaxed text-lcs-teal/75">{body}</p>

      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="min-h-[44px] rounded-2xl px-4 py-2 font-lcsBody text-sm font-semibold text-lcs-teal/80 transition-colors hover:text-lcs-teal disabled:opacity-60"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={busy}
          className={`min-h-[44px] rounded-2xl px-5 py-2 font-lcsDisplay text-sm font-semibold text-white transition-colors disabled:opacity-60 ${confirmClass}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
