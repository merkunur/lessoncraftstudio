'use client';

import { useTranslations } from 'next-intl';
import type { WorkspaceTab } from './constants';

/**
 * Underlined tabs across the material types, sitting directly ON THE DESK
 * between the header and the card grid ("desk & cards", 2026-08-22). They
 * govern the main column; the status rail persists across tabs, which makes
 * the rail itself a landmark.
 *
 * Underlined, NOT pills: five 44px bordered pills with a solid-teal active fill
 * formed the heaviest and loosest block on the page — the second-heaviest thing
 * after the h1, for what is only a view switch. Underlined tabs are the
 * productivity convention and cost no chrome.
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
      /* The rule under the strip is a solid tone of the desk (#CBC0A9), not an
         ink alpha — alpha hairlines go greenish over the stone ground. No
         horizontal padding: the strip aligns with the cards' outer edge. */
      className="flex gap-1 overflow-x-auto border-b border-[#CBC0A9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            /* Inactive text is #3D4F49, not #5E706A — the muted grey is only
               3.6:1 on the stone desk (banned there; it survives only on
               card/well surfaces). Ring offset is the desk. */
            className={`relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap px-2 py-3.5 font-lcsBody text-sm font-semibold transition-colors after:absolute after:inset-x-2 after:-bottom-px after:h-[3px] after:rounded-full after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#DDD4C2] ${
              isActive
                ? 'text-[#14322D] after:bg-lcs-teal'
                : 'text-[#3D4F49] after:bg-transparent hover:text-[#14322D]'
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
                  isActive ? 'bg-lcs-teal/[0.15] text-lcs-teal' : 'bg-[#FFFDF8] text-[#3D4F49]'
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
