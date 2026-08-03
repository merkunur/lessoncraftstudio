'use client';

import { useTranslations } from 'next-intl';
import type { WorkspaceTab } from './constants';

/**
 * Segmented control across the material types.
 *
 * Deliberately plain <button> + aria-current, NOT role="tablist"/role="tab":
 * real ARIA tabs require roving tabindex and arrow-key handling, and a partial
 * implementation announces a keyboard contract that isn't honored. aria-current
 * is also what every other segmented control on the site uses
 * (CatalogSortControl), so this stays consistent.
 */
export interface WorkspaceTabsProps {
  /** Only the tabs whose surface is actually available to this user. */
  tabs: readonly WorkspaceTab[];
  active: WorkspaceTab;
  counts: Partial<Record<WorkspaceTab, number | null>>;
  onChange: (tab: WorkspaceTab) => void;
}

export default function WorkspaceTabs({ tabs, active, counts, onChange }: WorkspaceTabsProps) {
  const t = useTranslations('workspace.tabs');

  return (
    <nav aria-label={t('ariaLabel')} className="mb-7 flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab === active;
        const count = counts[tab];
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            aria-current={isActive ? 'true' : undefined}
            className={`inline-flex min-h-[44px] items-center rounded-full border px-3.5 py-1.5 font-lcsBody text-sm font-semibold transition-colors ${
              isActive
                ? 'border-lcs-teal bg-lcs-teal text-lcs-cream'
                : 'border-lcs-teal/15 bg-white/70 text-lcs-teal hover:border-lcs-teal hover:bg-lcs-teal hover:text-white'
            }`}
          >
            {t(tab)}
            {typeof count === 'number' && (
              <span className={`ml-1.5 text-[0.7rem] ${isActive ? 'opacity-75' : 'opacity-60'}`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
