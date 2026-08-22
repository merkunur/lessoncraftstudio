'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The "⋯" overflow menu on a workspace row.
 *
 * Why it exists: the row used to carry three pill buttons of equal visual
 * weight — Share (solid teal), Rename (ghost teal), Delete (outlined in the
 * pre-Direction-A terracotta). Three equal weights means nothing is primary,
 * and the destructive action was the loudest thing on every row. Share is now
 * the only filled control in the row and everything else lives here.
 *
 * This owns ONLY the trigger. Items call back into the section, which opens the
 * existing PromptDialog / ConfirmDialog — no action logic moved.
 *
 * Keyboard + pointer contract:
 *   - Escape closes and returns focus to the trigger
 *   - an outside pointerdown closes
 *   - ArrowDown / ArrowUp roam the items, Home / End jump
 *   - activating an item closes, then runs the callback
 *
 * `role="menu"` here IS honored (unlike WorkspaceTabs, which deliberately stays
 * on aria-current because it does not implement the tab keyboard contract).
 */

export interface RowAction {
  key: string;
  label: string;
  onSelect: () => void;
  /** Destructive items render in brick #B3392B and sit below a divider. */
  destructive?: boolean;
}

export default function RowActionsMenu({
  actions,
  label,
}: {
  actions: RowAction[];
  /** Accessible name for the trigger, e.g. "More actions". */
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close on Escape or an outside pointerdown. pointerdown rather than click so
  // the menu is gone before the underlying control receives the press.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  // Move focus into the menu when it opens.
  useEffect(() => {
    if (open) itemRefs.current[0]?.focus();
  }, [open]);

  function onItemKeyDown(e: React.KeyboardEvent, index: number) {
    const last = actions.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    itemRefs.current[next]?.focus();
  }

  function select(action: RowAction) {
    setOpen(false);
    action.onSelect();
  }

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        /* ALWAYS VISIBLE, at every width.
           This started as the usual desktop hover-reveal (md:opacity-0 →
           group-hover:opacity-100). Reading the 1024px render killed it: with
           the trigger hidden at rest, Rename and Delete are completely
           undiscoverable — a teacher sees a row with one button and no way to
           rename anything. Hover-reveal is a power-user idiom and this audience
           is explicitly non-technical. It costs almost nothing visually (a
           quiet grey glyph that does not compete with the filled Share) and it
           is the difference between two working actions and two hidden ones. */
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-[#F5F1E6] hover:text-[#14322D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] md:h-9 md:w-9 ${
          open ? 'bg-[#F5F1E6] text-[#14322D]' : 'text-[#5E706A]'
        }`}
      >
        <svg width="16" height="4" viewBox="0 0 16 4" aria-hidden="true" fill="currentColor">
          <circle cx="2" cy="2" r="1.75" />
          <circle cx="8" cy="2" r="1.75" />
          <circle cx="14" cy="2" r="1.75" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={label}
          className="absolute right-0 top-full z-20 mt-1 w-44 origin-top-right rounded-2xl border border-[#CFC5AE] bg-[#FFFDF8] p-1 shadow-[0_4px_8px_-4px_rgba(84,66,39,0.15),0_16px_32px_-12px_rgba(84,66,39,0.28)]"
        >
          {actions.map((action, i) => (
            <div key={action.key}>
              {action.destructive && i > 0 && <div className="my-1 h-px bg-[#EFE9DA]" />}
              <button
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                role="menuitem"
                onClick={() => select(action)}
                onKeyDown={(e) => onItemKeyDown(e, i)}
                className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left font-lcsBody text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral ${
                  action.destructive
                    ? 'text-[#B3392B] hover:bg-[#B3392B]/[0.07]'
                    : 'text-[#3D4F49] hover:bg-[#F5F1E6] hover:text-[#14322D]'
                }`}
              >
                {action.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
