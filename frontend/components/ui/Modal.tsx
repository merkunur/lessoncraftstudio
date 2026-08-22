'use client';

import { useEffect, useRef, ReactNode } from 'react';
import ModalPortal from './ModalPortal';

/**
 * Shared modal frame — the one place that owns overlay behavior.
 *
 * Every modal on the site needs the same four things, and before this
 * component they were implemented (or forgotten) per call site:
 *
 *   1. Portal to <body>. `app/globals.css` has `body > * { position: relative;
 *      z-index: 1 }`, which confines any modal mounted inside <main> to <main>'s
 *      z=1 layer — the Footer comes later in DOM order and paints OVER it. See
 *      the long explanation in ModalPortal.tsx. The workspace's hosted-worksheet
 *      share modal shipped without this and painted under the Footer.
 *   2. Escape to close.
 *   3. Background scroll lock while open.
 *   4. Backdrop click to close, with clicks inside the card not bubbling out.
 *
 * Plus focus handling that no existing modal had: focus moves into the card on
 * open and returns to the trigger on close. A full focus TRAP (cycling Tab
 * within the dialog) is deliberately not implemented here — that needs care to
 * get right and is tracked separately; this is strictly better than nothing.
 *
 * The frame is visually neutral. Children own their own look.
 */
export interface ModalProps {
  onClose: () => void;
  /** id of the heading element rendered inside `children`. */
  labelledBy: string;
  size?: 'sm' | 'md';
  /** Set false while a mutation is in flight so a stray click can't cancel it. */
  closeOnBackdrop?: boolean;
  children: ReactNode;
}

const SIZE = {
  sm: 'max-w-sm',
  md: 'max-w-md',
} as const;

export default function Modal({
  onClose,
  labelledBy,
  size = 'md',
  closeOnBackdrop = true,
  children,
}: ModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const restoreFocusTo = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    // Prefer the first focusable control; fall back to the card itself.
    const card = cardRef.current;
    const focusable = card?.querySelector<HTMLElement>(
      'input:not([type="hidden"]), textarea, select, button, [href], [tabindex]:not([tabindex="-1"])'
    );
    (focusable ?? card)?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      restoreFocusTo?.focus?.();
    };
  }, [onClose]);

  return (
    <ModalPortal>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        /* Warm ink scrim, not the cold ink-900: the overlay layer was the last
           surface still on the pre-Direction-A vocabulary, and a blue-black
           wash over a warm page reads as a different product. */
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#14322D]/55 backdrop-blur-[2px] p-4 overflow-y-auto"
        onClick={closeOnBackdrop ? onClose : undefined}
      >
        <div
          ref={cardRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          /* Same card vocabulary as the workspace cards: paper #FFFDF8 with a
             solid warm border and an umber shadow — not bg-white/shadow-xl. */
          className={`w-full ${SIZE[size]} max-h-[90vh] overflow-y-auto rounded-2xl border border-[#CFC5AE] bg-[#FFFDF8] p-6 shadow-[0_8px_16px_-8px_rgba(84,66,39,0.25),0_24px_56px_-16px_rgba(84,66,39,0.4)] outline-none md:p-7`}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
