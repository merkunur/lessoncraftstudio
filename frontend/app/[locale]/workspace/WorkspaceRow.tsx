'use client';

import type { ReactNode } from 'react';

/**
 * A row on the workspace sheet.
 *
 * Rows are RULED LINES, not cards. The old markup gave every row its own
 * `.actcat-card-flat` frame — a paper-white card on a near-identical cream
 * ground, twelve of them stacked with gaps — which is most of what read as
 * "beige mush". Here the sheet is the card and the rows are ruled onto it.
 *
 * Shared by HostedWorksheetsSection and SharedActivitiesSection, which carried
 * byte-identical row markup and diverged only in their meta line and label
 * namespace. The `basis-full sm:basis-0` mobile fix is preserved from that
 * markup: with the action controls holding their width, `flex-1 min-w-0` alone
 * let the title shrink to "Additi…", so on phones the title takes the whole
 * first line and the actions wrap underneath.
 */

/**
 * The negative margin is the load-bearing detail. It cancels the section's
 * horizontal padding so the dividers and the hover wash run full-bleed to the
 * panel edge — that, more than anything else, is what makes the list read as a
 * class register rather than a stack of bars.
 */
export const ROW_LIST =
  '-mx-5 divide-y divide-[#14322D]/[0.08] border-y border-[#14322D]/[0.08] md:-mx-6';

/** Metadata chip. A TYPE is a chip; counts and dates are plain text. Chipping
 *  every metadata value is the other way to make mush. */
export function MetaChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-[#14322D]/[0.06] px-1.5 py-0.5 font-lcsBody text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-[#5E706A]">
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
      /* `group` drives the desktop reveal of the overflow trigger.
         Hover is a 3.5% ink wash — no lift, no shadow, no border change. The
         row is not clickable (only its controls are), so the wash exists to
         track the eye across a wide row and to surface the "⋯", not to claim
         the row is a target. */
      className="group flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-3 transition-colors hover:bg-[#14322D]/[0.035] md:min-h-[56px] md:flex-nowrap md:px-6"
    >
      <div className="min-w-0 basis-full sm:basis-0 sm:flex-1">
        <p className="truncate font-lcsDisplay text-[0.9375rem] font-bold tracking-[-0.005em] text-[#14322D]">
          {title}
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-lcsBody text-[0.8125rem] text-[#5E706A]">
          {meta}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">{actions}</div>
    </li>
  );
}
