// Arc 6b — URL manipulation helpers for filter / sort / pagination state.
//
// Per Q query-string adjudication: universal English-canonical axis-keys
// as values; alphabetic param ordering for cache-key stability; default-
// value stripping (sort=newest, page=1, empty values → bare path).

const DEFAULT_VALUES: Record<string, string> = {
  sort: 'newest',
  page: '1',
};

/**
 * Build a canonical URL for the topic-page surface with the given filter
 * state. Strips default values; sorts params alphabetically; emits bare
 * path when no params remain.
 */
export function buildFilterUrl(
  basePath: string,
  params: URLSearchParams
): string {
  const out = new URLSearchParams();
  const keys = [...new Set([...params.keys()])].sort();
  for (const k of keys) {
    const v = params.get(k);
    if (!v) continue;
    if (DEFAULT_VALUES[k] === v) continue;
    out.set(k, v);
  }
  const qs = out.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

/**
 * Returns a new URLSearchParams with a key set to the given value, or
 * removed if value is null/undefined/empty/default.
 */
export function withParam(
  current: URLSearchParams,
  key: string,
  value: string | null | undefined
): URLSearchParams {
  const next = new URLSearchParams(current);
  if (!value || DEFAULT_VALUES[key] === value) {
    next.delete(key);
  } else {
    next.set(key, value);
  }
  return next;
}

/**
 * Returns a new URLSearchParams with the given key removed.
 */
export function withoutParam(
  current: URLSearchParams,
  key: string
): URLSearchParams {
  const next = new URLSearchParams(current);
  next.delete(key);
  return next;
}

/**
 * Returns a new URLSearchParams with all filter params cleared (preserves
 * non-filter params like ?utm_source=...). Filter params are: level,
 * theme, type, sort, page.
 */
export function clearFilters(current: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(current);
  ['level', 'theme', 'type', 'mode', 'sort', 'page'].forEach(k => next.delete(k));
  return next;
}
