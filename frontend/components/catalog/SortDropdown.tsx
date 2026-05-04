'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { buildFilterUrl, withParam } from './filterUrl';

// Arc 6b — Sort dropdown.
//
// Reads/writes ?sort=newest|alpha-asc|alpha-desc per Q sort adjudication.
// Default = newest = bare path (no ?sort param). Changing sort updates URL
// via router.push; full SSR re-renders DeckGrid + ResultCount.

const SORT_KEYS = ['newest', 'alpha-asc', 'alpha-desc'] as const;
type SortKey = (typeof SORT_KEYS)[number];

interface SortDropdownProps {
  basePath: string;
}

export default function SortDropdown({ basePath }: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations('topicPage.sort');

  const currentSort: SortKey =
    (SORT_KEYS as readonly string[]).includes(searchParams.get('sort') ?? '')
      ? (searchParams.get('sort') as SortKey)
      : 'newest';

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = withParam(searchParams, 'sort', e.target.value);
    // Reset page when sort changes
    next.delete('page');
    const url = buildFilterUrl(basePath || pathname, next);
    router.push(url, { scroll: false });
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-ink-600">
        {t('heading')}
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={onChange}
        className="px-3 py-2 rounded-md bg-cream-50 border border-cream-300 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-terracotta-400"
      >
        <option value="newest">{t('newest')}</option>
        <option value="alpha-asc">{t('alphaAsc')}</option>
        <option value="alpha-desc">{t('alphaDesc')}</option>
      </select>
    </div>
  );
}
