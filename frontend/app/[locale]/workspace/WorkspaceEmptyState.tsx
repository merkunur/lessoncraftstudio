'use client';

import type { ReactNode } from 'react';

/**
 * Empty / no-results panel.
 *
 * A local twin of CatalogEmptyState (components/catalog/CatalogFilters.tsx)
 * rather than a reuse: that component's CTA is a hard <a href> for "clear all
 * filters", and these states need either an onClick (clear a client-side
 * search) or no CTA at all. Adding an optional callback to a component two
 * public SSR hubs depend on would widen the blast radius for no gain, so the
 * ~12 lines of markup are copied and the visual stays identical.
 */
export interface WorkspaceEmptyStateProps {
  title: string;
  body: string;
  action?: ReactNode;
  /** `flat` sits inside a section that already has a card frame. */
  variant?: 'card' | 'flat';
}

export default function WorkspaceEmptyState({
  title,
  body,
  action,
  variant = 'card',
}: WorkspaceEmptyStateProps) {
  return (
    // A WELL, not a raised card: it sits inside the sheet, so it recedes.
    // py-12 came down to py-10 — an empty region does not need to be the tallest
    // thing on the page.
    <div
      className={
        variant === 'card'
          ? 'rounded-2xl border border-[#14322D]/10 bg-[#F5F1E6] px-6 py-10 text-center'
          : 'px-4 py-8 text-center'
      }
    >
      <h3 className="mb-2 font-lcsDisplay text-[0.9375rem] font-bold tracking-[-0.005em] text-[#14322D]">
        {title}
      </h3>
      <p className="mx-auto mb-6 max-w-sm font-lcsBody text-[0.8125rem] leading-relaxed text-[#3D4F49]">
        {body}
      </p>
      {action}
    </div>
  );
}
