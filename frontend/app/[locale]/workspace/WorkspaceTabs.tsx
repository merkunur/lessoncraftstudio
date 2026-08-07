'use client';

import { useTranslations } from 'next-intl';
import type { WorkspaceTab } from './constants';

/**
 * Underlined tabs across the material types, sitting on the top edge of the
 * workspace panel.
 *
 * Underlined, NOT pills: five 44px bordered pills with a solid-teal active fill
 * formed the heaviest and loosest block on the page — the second-heaviest thing
 * after the h1, for what is only a view switch. Underlined tabs are the
 * productivity convention, cost no chrome, and read as folder tabs cut into the
 * sheet, which is the whole surface metaphor.
 *
 * The indicator is TEAL, not coral. Teal means "you are here"; coral is the
 * identity mark (the rule under the h1) and the single CTA. Two coral bars 40px
 * apart would read as repeated decoration rather than as either.
 *
 * `overflow-x-auto` + `shrink-0`: five tab labels in Finnish or German do not
 * fit at 360px, and wrapping them onto a second line breaks the folder edge.
 * Scrolling keeps the edge intact.
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
    <nav
      aria-label={t('ariaLabel')}
      className="flex gap-1 overflow-x-auto border-b border-[#14322D]/10 px-5 [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        const count = counts[tab];
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            aria-current={isActive ? 'true' : undefined}
            /* py-3.5 + a 14px line gives a 44px+ hit height with no min-h box —
               44px of invisible chrome around every label is part of what made
               the old strip feel loose.
               The 3px indicator sits at -bottom-px so it paints OVER the nav's
               border-b, reading as the tab breaking the rule line. */
            className={`relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap px-2 py-3.5 font-lcsBody text-sm font-semibold transition-colors after:absolute after:inset-x-2 after:-bottom-px after:h-[3px] after:rounded-full after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8] ${
              isActive
                ? 'text-[#14322D] after:bg-lcs-teal'
                : 'text-[#5E706A] after:bg-transparent hover:text-[#14322D]'
            }`}
          >
            {t(tab)}
            {/* Nothing renders while the count is null (still loading). The old
                markup only checked `typeof count === 'number'` for the value but
                flickered a grey number in at opacity-60 the moment it arrived;
                rendering nothing until then is quieter. */}
            {typeof count === 'number' && (
              <span
                className={`rounded-full px-1.5 py-px font-lcsBody text-[0.6875rem] font-bold tabular-nums ${
                  isActive ? 'bg-lcs-teal/[0.12] text-lcs-teal' : 'bg-[#14322D]/[0.07] text-[#5E706A]'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
