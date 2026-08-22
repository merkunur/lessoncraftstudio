'use client';

import { useId, useState } from 'react';
import Modal from './Modal';

/**
 * Styled replacement for `window.prompt()`.
 *
 * Kept separate from ConfirmDialog rather than bolted on as an optional input,
 * because this one needs real form semantics: Enter submits, and the value is
 * trimmed and rejected when empty — replicating the
 * `if (title === null || !title.trim()) return` guard the two workspace widgets
 * used to apply to window.prompt's return value.
 *
 * The input is auto-selected on focus so typing replaces the old name, which is
 * what window.prompt did and what people expect from a rename.
 */
export interface PromptDialogProps {
  title: string;
  label: string;
  initialValue: string;
  placeholder?: string;
  maxLength?: number;
  submitLabel: string;
  cancelLabel: string;
  busyLabel?: string;
  requiredMessage: string;
  busy?: boolean;
  error?: string | null;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

export default function PromptDialog({
  title,
  label,
  initialValue,
  placeholder,
  maxLength = 200,
  submitLabel,
  cancelLabel,
  busyLabel,
  requiredMessage,
  busy = false,
  error = null,
  onSubmit,
  onCancel,
}: PromptDialogProps) {
  const titleId = useId();
  const [value, setValue] = useState(initialValue);
  const [localError, setLocalError] = useState<string | null>(null);

  const shownError = error ?? localError;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = value.trim();
    if (!next) {
      setLocalError(requiredMessage);
      return;
    }
    setLocalError(null);
    onSubmit(next);
  }

  return (
    <Modal onClose={onCancel} labelledBy={titleId} size="sm" closeOnBackdrop={!busy}>
      <form onSubmit={handleSubmit}>
        <h2 id={titleId} className="font-lcsDisplay text-lg font-bold tracking-[-0.01em] text-[#14322D]">
          {title}
        </h2>

        <label className="mt-4 block">
          <span className="mb-1.5 block font-lcsBody text-sm font-semibold text-[#3D4F49]">
            {label}
          </span>
          {/* A well that becomes paper on focus — same input idiom as the
              workspace search field and the create-collection form. */}
          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); if (localError) setLocalError(null); }}
            onFocus={(e) => e.currentTarget.select()}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={busy}
            autoFocus
            className="min-h-[44px] w-full rounded-xl border border-[#E3DCC9] bg-[#F5F1E6] px-3 py-2 font-lcsBody text-sm text-[#14322D] outline-none transition-colors placeholder:text-[#9AA8A3] focus:border-lcs-coral focus:bg-[#FFFDF8] disabled:opacity-60"
          />
        </label>

        {/* Brick, not terracotta — one red on this surface, and it means
            "something went wrong / this destroys data", nothing else. */}
        {shownError && (
          <p role="alert" className="mt-2 font-lcsBody text-sm text-[#B3392B]">
            {shownError}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="min-h-[44px] rounded-full px-4 py-2 font-lcsBody text-sm font-semibold text-[#5E706A] transition-colors hover:text-[#14322D] disabled:text-[#9AA8A3]"
          >
            {cancelLabel}
          </button>
          {/* Ink on coral (4.97:1) — the cream-on-coral pair fails AA. */}
          <button
            type="submit"
            disabled={busy}
            className="min-h-[44px] rounded-full bg-lcs-coral px-5 py-2 font-lcsDisplay text-sm font-semibold text-[#14322D] transition-all hover:shadow-[0_3px_10px_-2px_rgba(84,66,39,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] disabled:opacity-60"
          >
            {busy && busyLabel ? busyLabel : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
