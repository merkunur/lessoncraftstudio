'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { buildFilterUrl, withParam, withoutParam } from './filterUrl';

// Arc 6b — Filter sidebar.
//
// Renders 3 facet groups (theme + exercise-type + educational-level)
// minus path-bound axes. Theme facet uses top-N + show-more expand
// pattern per Q theme-facet adjudication. Each option is a checkbox;
// onChange updates URL searchParams via router.push.
//
// State source-of-truth is URL; component is presentation-only with
// expand/collapse local state for theme show-more.

interface FacetOption {
  axisKey: string;       // universal English-canonical key (URL value)
  label: string;         // locale-natural display name
  count: number;         // deck-count post-active-filters
}

interface FacetGroup {
  paramKey: 'level' | 'theme' | 'type';
  heading: string;
  options: FacetOption[];
  isThemeWithExpand?: boolean;
  themeTier1Count?: number; // for theme: how many to show before expand
}

interface FilterSidebarProps {
  basePath: string;
  facetGroups: FacetGroup[];
}

const THEME_TIER1_DEFAULT = 12;

function FacetGroupSection({
  group,
  basePath,
}: {
  group: FacetGroup;
  basePath: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations('topicPage.facets');
  const [expanded, setExpanded] = useState(false);

  const currentValue = searchParams.get(group.paramKey);
  const tier1Count = group.themeTier1Count ?? THEME_TIER1_DEFAULT;
  const visibleOptions = group.isThemeWithExpand && !expanded
    ? group.options.slice(0, tier1Count)
    : group.options;
  const hasMore = group.isThemeWithExpand && group.options.length > tier1Count;

  function onToggle(axisKey: string, checked: boolean) {
    const next = checked
      ? withParam(searchParams, group.paramKey, axisKey)
      : withoutParam(searchParams, group.paramKey);
    next.delete('page');
    const url = buildFilterUrl(basePath || pathname, next);
    router.push(url, { scroll: false });
  }

  if (group.options.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xs font-medium uppercase tracking-wider text-ink-500 mb-3">
        {group.heading}
      </h3>
      <ul className="space-y-1">
        {visibleOptions.map(opt => (
          <li key={opt.axisKey}>
            <label className="flex items-center gap-2 px-2 py-1 rounded text-sm text-ink-800 hover:bg-cream-100 cursor-pointer">
              <input
                type="checkbox"
                checked={currentValue === opt.axisKey}
                onChange={e => onToggle(opt.axisKey, e.target.checked)}
                className="rounded text-terracotta-500 focus:ring-2 focus:ring-terracotta-400"
              />
              <span className="flex-1 truncate">{opt.label}</span>
              <span className="text-xs text-ink-500">{opt.count}</span>
            </label>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 px-2 py-1 text-sm text-terracotta-600 hover:text-terracotta-700 hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? t('theme.showLess') : t('theme.showMore')}
        </button>
      )}
    </div>
  );
}

export default function FilterSidebar({
  basePath,
  facetGroups,
}: FilterSidebarProps) {
  const t = useTranslations('topicPage.facets');

  return (
    <aside aria-label={t('heading')} className="hidden lg:block">
      <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">
        {t('heading')}
      </h2>
      {facetGroups.map(group => (
        <FacetGroupSection
          key={group.paramKey}
          group={group}
          basePath={basePath}
        />
      ))}
    </aside>
  );
}

// Re-export for the mobile-drawer wrapper
export type { FacetGroup, FacetOption };
export { FacetGroupSection };
