'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { buildFilterUrl, withoutParam, clearFilters } from './filterUrl';

// Arc 6b — Active-filter chip row above DeckGrid.
//
// Displays one chip per active searchParams filter (level / theme / type).
// Chip label is locale-natural axis-name (resolved server-side and passed
// in as labels prop); chip remove-button strips the param + router.push
// for full SSR re-render. "Clear all filters" button strips all filter
// params at once.

interface ChipDescriptor {
  paramKey: 'level' | 'theme' | 'type' | 'mode';
  axisKey: string;       // universal English-canonical key (URL value)
  label: string;         // locale-natural display name
}

interface ActiveFilterChipsProps {
  basePath: string;
  chips: ChipDescriptor[];
}

export default function ActiveFilterChips({
  basePath,
  chips,
}: ActiveFilterChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations('topicPage.activeFilters');

  if (chips.length === 0) return null;

  function onRemoveChip(paramKey: 'level' | 'theme' | 'type' | 'mode') {
    const next = withoutParam(searchParams, paramKey);
    next.delete('page'); // reset pagination on filter change
    const url = buildFilterUrl(basePath || pathname, next);
    router.push(url, { scroll: false });
  }

  function onClearAll() {
    const next = clearFilters(searchParams);
    const url = buildFilterUrl(basePath || pathname, next);
    router.push(url, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {chips.map(chip => (
        <button
          key={chip.paramKey}
          type="button"
          onClick={() => onRemoveChip(chip.paramKey)}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-terracotta-100 hover:bg-terracotta-200 text-sm text-ink-900 transition-colors"
          aria-label={t('removeChipAria', { filter: chip.label })}
        >
          <span>{chip.label}</span>
          <span aria-hidden="true">✕</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="px-3 py-1 text-sm text-ink-600 hover:text-ink-900 hover:underline transition-colors"
      >
        {t('clearAll')}
      </button>
    </div>
  );
}
