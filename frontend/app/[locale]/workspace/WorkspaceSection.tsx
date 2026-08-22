'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Sections are CARDS on the desk — one card per section ("desk & cards",
 * 2026-08-22, supersedes the areas-of-one-sheet system).
 *
 * The single-sheet system fixed the nested-beige-rectangles problem but left
 * the eye with no landmarks: five sections delimited only by hairlines inside
 * one ~1700px panel. Discrete cards give each section its own edge and its own
 * shadow, and the desk showing between them turns sparseness into composed
 * negative space.
 *
 * The frame is SOLID-bordered (#CFC5AE), not ink-at-10%-alpha — alpha
 * hairlines over the stone ground go greenish. `overflow-hidden` is
 * load-bearing per card: it lets the full-bleed row dividers and hover washes
 * run into the rounded corners.
 *
 * px-5 md:px-6 here MUST stay in lockstep with ROW_LIST's -mx-5 md:-mx-6
 * (WorkspaceRow.tsx) — the negative margins cancel this padding exactly.
 */
export const CARD_FRAME =
  'overflow-hidden rounded-2xl border border-[#CFC5AE] bg-[#FFFDF8] px-5 pb-6 pt-5 shadow-[0_1px_2px_rgba(84,66,39,0.05),0_10px_28px_-14px_rgba(84,66,39,0.22)] md:px-6';

/**
 * Per-section icon disc — a 32px well holding a 16px ink-stroke glyph.
 *
 * The discs are shape landmarks: with five same-size headings the eye had to
 * re-read 17px text to know where it was; a silhouette per section lets it
 * navigate without reading. Ink strokes, not teal or coral — teal is
 * interaction-only and coral is the identity mark + single CTA.
 */
export type SectionIcon =
  | 'worksheets'
  | 'activities'
  | 'collections'
  | 'favorites'
  | 'recent'
  | 'usage';

const ICONS: Record<SectionIcon, ReactNode> = {
  worksheets: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 8.5h6M9 12h6M9 15.5h3.5" />
    </>
  ),
  activities: <path d="M20 4 4 10.5l6 2.5 2.5 6L20 4ZM10 13l10-9" />,
  collections: (
    <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h4l2 2.5h7A1.5 1.5 0 0 1 20 10v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V7.5Z" />
  ),
  favorites: (
    <path d="M12 19.5 5.4 13a4.1 4.1 0 0 1 5.8-5.8l.8.8.8-.8A4.1 4.1 0 0 1 18.6 13L12 19.5Z" />
  ),
  recent: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.2l2.8 1.8" />
    </>
  ),
  usage: (
    <>
      <path d="M5 18a8 8 0 1 1 14 0" />
      <path d="M12 13.5 15 10" />
    </>
  ),
};

export function SectionIconDisc({ icon }: { icon: SectionIcon }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E3DCC9] bg-[#F5F1E6] text-[#3D4F49]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[icon]}
      </svg>
    </span>
  );
}

/**
 * The quota readout, as an actual meter.
 *
 * A bar reads at a glance and the fill color carries the warning: teal while
 * there is room, coral from 80%, brick when full — the same roles the rest of
 * the page uses. `label` stays rendered (not sr-only) because the exact
 * numbers matter; the bar is the fast read and the figures the precise one.
 */
export function QuotaMeter({
  label,
  count,
  max,
}: {
  label: string;
  count: number;
  max: number;
}) {
  const ratio = max > 0 ? Math.min(1, count / max) : 0;
  const fill = ratio >= 1 ? 'bg-[#B3392B]' : ratio >= 0.8 ? 'bg-lcs-coral' : 'bg-lcs-teal';

  return (
    <div className="flex items-center gap-2.5">
      <span className="font-lcsBody text-[0.8125rem] tabular-nums text-[#3D4F49]">{label}</span>
      <span
        aria-hidden="true"
        className="h-1.5 w-16 overflow-hidden rounded-full bg-[#E3DCC9]"
      >
        <span
          className={`block h-full rounded-full ${fill}`}
          style={{ width: `${Math.max(ratio * 100, ratio > 0 ? 4 : 0)}%` }}
        />
      </span>
    </div>
  );
}

export interface WorkspaceSectionProps {
  id: string;
  title: string;
  icon?: SectionIcon;
  /** e.g. the quota meter — rendered right-aligned in the header. */
  meter?: ReactNode;
  variant: 'preview' | 'full';
  /** preview only: total row count behind the "See all" affordance. */
  totalCount?: number;
  onSeeAll?: () => void;
  toolbar?: ReactNode;
  /** Extra classes on the card — grid/order placement from the shell. */
  className?: string;
  children: ReactNode;
}

/**
 * Loading / error placeholder for a full-tab section.
 *
 * Without this a failed or still-loading slice returned null, so clicking the
 * tab showed a completely blank page with no heading and no explanation.
 */
export function WorkspaceSectionMessage({
  id,
  title,
  icon,
  message,
}: {
  id: string;
  title: string;
  icon?: SectionIcon;
  message: string;
}) {
  return (
    <section aria-labelledby={id} data-workspace-card="" className={CARD_FRAME}>
      <div className="mb-4 flex min-w-0 items-center gap-2.5">
        {icon && <SectionIconDisc icon={icon} />}
        <h2
          id={id}
          className="font-lcsDisplay text-[1.25rem] font-bold tracking-[-0.015em] text-[#14322D]"
        >
          {title}
        </h2>
      </div>
      <p className="font-lcsBody text-sm text-[#5E706A]">{message}</p>
    </section>
  );
}

/**
 * Shared card for every material-type section.
 *
 * `variant` is what lets the overview tab and the per-type tabs share one set
 * of row components instead of maintaining a parallel "preview" copy:
 *   preview — first N rows, no toolbar, no pagination, a "See all (N)" footer
 *   full    — toolbar + pagination, no footer
 *
 * `data-workspace-card` is the QA hook: scripts/visual-qa-workspace.js asserts
 * every card's surface hex over this attribute (the old panel was discovered
 * via the tab nav's parent, which no longer exists — the tabs sit on the desk).
 */
export default function WorkspaceSection({
  id,
  title,
  icon,
  meter,
  variant,
  totalCount,
  onSeeAll,
  toolbar,
  className,
  children,
}: WorkspaceSectionProps) {
  const t = useTranslations('workspace.list');
  // totalCount > 0: never offer "See all (0)" of an empty list.
  const showSeeAll =
    variant === 'preview' && onSeeAll && typeof totalCount === 'number' && totalCount > 0;

  return (
    <section
      aria-labelledby={id}
      data-workspace-card=""
      className={className ? `${CARD_FRAME} ${className}` : CARD_FRAME}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex min-w-0 items-center gap-2.5">
          {icon && <SectionIconDisc icon={icon} />}
          {/* 20px Baloo — up from 17px. The single biggest hierarchy fix: the
              heading now outranks row titles (16px) by a clear step instead of
              two points. */}
          <h2
            id={id}
            className="font-lcsDisplay text-[1.25rem] font-bold tracking-[-0.015em] text-[#14322D]"
          >
            {title}
          </h2>
        </div>
        {/* The meter slot is a plain node — callers pass a real quota meter or
            a CTA button, and wrapping those in muted type fought them. */}
        {meter}
      </div>

      {variant === 'full' && toolbar}

      {children}

      {showSeeAll && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onSeeAll}
            /* Keeps the 44px target (it switches tabs — a real control on a
               phone) but pulls it back with -mx-2/-my-2 so the target does NOT
               become 44px of visible space. */
            className="-mx-2 -my-2 inline-flex min-h-[44px] items-center gap-1 rounded-full px-2 font-lcsBody text-[0.8125rem] font-bold text-lcs-teal underline-offset-4 transition-colors hover:text-lcs-teal-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8]"
          >
            {t('seeAll', { count: totalCount })} <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}
