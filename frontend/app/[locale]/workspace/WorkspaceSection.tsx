'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Shared frame for every material-type section.
 *
 * `variant` is what lets the overview tab and the per-type tabs share one set
 * of row components instead of maintaining a parallel "preview" copy:
 *   preview — first N rows, no toolbar, no pagination, a "See all (N)" footer
 *   full    — toolbar + pagination, no footer
 */
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
    <section aria-labelledby={id} className="mb-10 md:mb-12">
      <h2 id={id} className="mb-4 font-lcsDisplay text-xl font-extrabold text-lcs-teal md:text-2xl">
        {title}
      </h2>
      <p className="font-lcsBody text-sm text-lcs-teal/60">{message}</p>
    </section>
  );
}

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
    <section aria-labelledby={id} className="mb-10 md:mb-12">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id={id} className="font-lcsDisplay text-xl font-extrabold text-lcs-teal md:text-2xl">
          {title}
        </h2>
        {meter && (
          <span className="font-lcsBody text-sm text-lcs-teal/60">{meter}</span>
        )}
      </div>

      {variant === 'full' && toolbar}

      {children}

      {showSeeAll && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onSeeAll}
            className="inline-flex min-h-[44px] items-center font-lcsBody text-sm font-semibold text-lcs-teal transition-colors hover:text-lcs-coral-deep"
          >
            {t('seeAll', { count: totalCount })} →
          </button>
        </div>
      )}
    </section>
  );
}
