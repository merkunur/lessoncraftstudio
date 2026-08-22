'use client';

import type { ReactNode } from 'react';

/**
 * A row on a workspace card.
 *
 * Rows are RULED LINES, not cards. The pre-2026-08 markup gave every row its
 * own `.actcat-card-flat` frame — a paper-white card on a near-identical cream
 * ground, twelve of them stacked with gaps — which is most of what read as
 * "beige mush". Here the section card is the card and the rows are ruled onto
 * it.
 *
 * Shared by HostedWorksheetsSection and SharedActivitiesSection, which carried
 * byte-identical row markup and diverged only in their meta line and label
 * namespace. The `basis-full sm:basis-0` mobile fix is preserved from that
 * markup: with the action controls holding their width, `flex-1 min-w-0` alone
 * let the title shrink to "Additi…", so on phones the title takes the whole
 * first line and the actions wrap underneath.
 */

/**
 * The negative margin is the load-bearing detail. It cancels the card's
 * horizontal padding (CARD_FRAME px-5 md:px-6 — keep in lockstep) so the
 * dividers and the hover wash run full-bleed to the card edge, which is what
 * makes the list read as a class register rather than a stack of bars.
 * Dividers are SOLID #EFE9DA — ink-alpha hairlines shift hue over washes.
 */
export const ROW_LIST =
  '-mx-5 divide-y divide-[#EFE9DA] border-y border-[#EFE9DA] md:-mx-6';

/**
 * The row's Share action — a GHOST button, filled only on hover/focus.
 *
 * The old solid-teal Share pill repeated down the right edge of every list and
 * was the loudest thing on the page with zero information value (operator:
 * "very tiring for the eye"). Quiet outline at rest, full teal on
 * hover/focus/press — nothing hidden, the hierarchy just stops shouting. The
 * page's ONE filled control is the coral "+ New collection" CTA.
 * Border #B8D1CA = teal at 30% over paper, as a solid.
 */
export const ROW_SHARE_BUTTON =
  'inline-flex h-11 items-center justify-center gap-1.5 rounded-full border-[1.5px] border-[#B8D1CA] px-4 font-lcsBody text-[0.8125rem] font-bold tracking-[0.01em] text-lcs-teal transition-colors hover:border-lcs-teal hover:bg-lcs-teal hover:text-[#FFFDF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] md:h-9';

/** 13px share glyph inside the ghost Share button. */
export function ShareGlyph() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 15V4M7.5 8.5 12 4l4.5 4.5" />
      <path d="M5 13v6a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-6" />
    </svg>
  );
}

/** Metadata chip. A TYPE is a chip; counts and dates are plain text. Chipping
 *  every metadata value is the other way to make mush. A chip is a WELL
 *  (fill + solid border), per the wells-always-carry-a-border rule. */
export function MetaChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-[#E3DCC9] bg-[#F5F1E6] px-1.5 py-0.5 font-lcsBody text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-[#3D4F49]">
      {children}
    </span>
  );
}

/** Separator between metadata values — a real element marked aria-hidden, so
 *  screen readers do not announce "middle dot" between every field. */
export function MetaDot() {
  return <span aria-hidden="true">·</span>;
}

export default function WorkspaceRow({
  title,
  meta,
  actions,
}: {
  title: string;
  meta: ReactNode;
  actions: ReactNode;
}) {
  return (
    <li
      /* Hover is a SOLID warm wash — no lift, no shadow, no border change. The
         row is not clickable (only its controls are), so the wash exists to
         track the eye across the row, not to claim the row is a target.
         `group` remains for hover text-color shifts only; the "⋯" trigger is
         ALWAYS visible (never a group-hover reveal — locked). */
      className="group flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3 transition-colors hover:bg-[#FAF6EC] md:min-h-[56px] md:flex-nowrap md:px-6"
    >
      <div className="min-w-0 basis-full sm:basis-0 sm:flex-1">
        <p className="truncate font-lcsDisplay text-[1rem] font-semibold tracking-[-0.005em] text-[#14322D]">
          {title}
        </p>
        {/* Meta runs #3D4F49, not #5E706A — 13px muted-grey meta was one of the
            named eye-strain sources; #3D4F49 on paper is 8.6:1. */}
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-lcsBody text-[0.8125rem] text-[#3D4F49]">
          {meta}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">{actions}</div>
    </li>
  );
}
