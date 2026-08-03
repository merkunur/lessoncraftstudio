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
        <h2 id={titleId} className="font-lcsDisplay text-lg font-bold text-lcs-teal">
          {title}
        </h2>

        <label className="mt-4 block">
          <span className="mb-1.5 block font-lcsBody text-sm font-semibold text-lcs-teal/75">
            {label}
          </span>
          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); if (localError) setLocalError(null); }}
            onFocus={(e) => e.currentTarget.select()}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={busy}
            autoFocus
            className="min-h-[44px] w-full rounded-xl border border-lcs-teal/20 bg-white px-3 py-2 font-lcsBody text-sm text-lcs-teal outline-none transition-colors focus:border-lcs-coral disabled:opacity-60"
          />
        </label>

        {shownError && (
          <p role="alert" className="mt-2 font-lcsBody text-sm text-terracotta-500">
            {shownError}
          </p>
        )}

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
            type="submit"
            disabled={busy}
            className="min-h-[44px] rounded-2xl bg-lcs-coral px-5 py-2 font-lcsDisplay text-sm font-semibold text-lcs-cream transition-colors hover:bg-lcs-coral-deep disabled:opacity-60"
          >
            {busy && busyLabel ? busyLabel : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
