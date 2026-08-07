'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Sections are AREAS OF ONE SHEET, not boxes.
 *
 * They live inside the WorkspaceShell panel and are delimited by a full-bleed
 * hairline plus vertical space — never by their own card frame. Giving each
 * section a card inside a panel is how the page became a stack of nested beige
 * rectangles. `first-of-type` drops the rule on whichever section renders first
 * (sections that return null emit no DOM node, so this tracks what is actually
 * on screen, and the loading <p> sibling is not a <section>).
 */
const SECTION_FRAME =
  'border-t border-[#14322D]/10 px-5 pb-7 pt-8 first-of-type:border-t-0 first-of-type:pt-6 md:px-6';

/**
 * The quota readout in a section header, as an actual meter.
 *
 * It was previously the bare string "7 of 300 used" in muted grey, which is a
 * number the eye has to parse before it means anything. A bar reads at a
 * glance, and the fill color now carries the warning instead of being decorative:
 * teal while there is room, coral from 80%, brick when full — the same three
 * roles the rest of the page uses.
 *
 * `label` stays rendered (not sr-only) because the exact numbers matter here;
 * the bar is the fast read and the figures are the precise one.
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
      <span className="font-lcsBody text-[0.8125rem] tabular-nums text-[#5E706A]">{label}</span>
      <span
        aria-hidden="true"
        className="h-1.5 w-16 overflow-hidden rounded-full bg-[#14322D]/10"
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
  /** e.g. the quota meter — rendered right-aligned in the header. */
  meter?: ReactNode;
  variant: 'preview' | 'full';
  /** preview only: total row count behind the "See all" affordance. */
  totalCount?: number;
  onSeeAll?: () => void;
  toolbar?: ReactNode;
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
  message,
}: {
  id: string;
  title: string;
  message: string;
}) {
  return (
    <section aria-labelledby={id} className={SECTION_FRAME}>
      <h2
        id={id}
        className="mb-4 font-lcsDisplay text-[1.0625rem] font-bold tracking-[-0.01em] text-[#14322D]"
      >
        {title}
      </h2>
      <p className="font-lcsBody text-sm text-[#5E706A]">{message}</p>
    </section>
  );
}

/**
 * Shared frame for every material-type section.
 *
 * `variant` is what lets the overview tab and the per-type tabs share one set
 * of row components instead of maintaining a parallel "preview" copy:
 *   preview — first N rows, no toolbar, no pagination, a "See all (N)" footer
 *   full    — toolbar + pagination, no footer
 */
export default function WorkspaceSection({
  id,
  title,
  meter,
  variant,
  totalCount,
  onSeeAll,
  toolbar,
  children,
}: WorkspaceSectionProps) {
  const t = useTranslations('workspace.list');
  const showSeeAll = variant === 'preview' && onSeeAll && typeof totalCount === 'number';

  return (
    <section aria-labelledby={id} className={SECTION_FRAME}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2
          id={id}
          className="font-lcsDisplay text-[1.0625rem] font-bold tracking-[-0.01em] text-[#14322D]"
        >
          {title}
        </h2>
        {/* The meter slot is a plain node now, not wrapped in a grey <span> —
            callers pass a real quota meter or a CTA button, and wrapping those
            in muted type fought them. */}
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
               become 44px of visible space. The looseness this section had came
               from invisible boxes ADDING layout, not from the targets. */
            className="-mx-2 -my-2 inline-flex min-h-[44px] items-center gap-1 rounded-full px-2 font-lcsBody text-[0.8125rem] font-bold text-lcs-teal underline-offset-4 transition-colors hover:text-lcs-teal-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8]"
          >
            {t('seeAll', { count: totalCount })} <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}
