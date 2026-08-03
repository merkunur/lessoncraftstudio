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
    <div
      className={
        variant === 'card'
          ? 'actcat-card-flat rounded-3xl px-4 py-12 text-center'
          : 'px-4 py-10 text-center'
      }
    >
      <h3 className="mb-2 font-lcsDisplay text-lg font-bold text-lcs-teal">{title}</h3>
      <p className="mx-auto mb-6 max-w-md font-lcsBody text-sm text-lcs-teal/70">{body}</p>
      {action}
    </div>
  );
}
