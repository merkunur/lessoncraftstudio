import type { SortKey } from './constants';

export interface ListAccessors<T> {
  title: (row: T) => string;
  /** ISO timestamp used by the `newest` sort. */
  date: (row: T) => string;
  /** Optional; required only when `views` is offered as a sort option. */
  views?: (row: T) => number;
}

/**
 * Filter by title substring, then sort. Applied before pagination so
 * "Showing 1–12 of 37" reports the FILTERED total, not the raw row count.
 *
 * Matching is locale-aware (`toLocaleLowerCase`) because a naive lowercase is
 * wrong in several of the 11 locales — Turkish dotted/dotless I is the classic
 * case, and Finnish/Swedish folding differs from invariant folding too.
 */
export function filterAndSort<T>(
  rows: T[],
  query: string,
  sort: SortKey,
  get: ListAccessors<T>,
  locale: string
): T[] {
  const q = query.trim().toLocaleLowerCase(locale);

  const filtered = q
    ? rows.filter((r) => get.title(r).toLocaleLowerCase(locale).includes(q))
    : rows.slice();

  switch (sort) {
    case 'alphaAsc':
      return filtered.sort((a, b) => get.title(a).localeCompare(get.title(b), locale));
    case 'alphaDesc':
      return filtered.sort((a, b) => get.title(b).localeCompare(get.title(a), locale));
    case 'views':
      return get.views
        ? filtered.sort((a, b) => get.views!(b) - get.views!(a))
        : filtered;
    case 'newest':
    default:
      return filtered.sort(
        (a, b) => new Date(get.date(b)).getTime() - new Date(get.date(a)).getTime()
      );
  }
}
