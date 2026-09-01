/**
 * worksheets-catalog.ts — server-side helpers for the faceted worksheets hub
 * (/[locale]/worksheets/). Pure functions over the per-locale landing arrays
 * from `getMonolingualLandings()`; no DB, no client state. The hub reads
 * searchParams, filters/sorts/paginates here, and builds facet groups with
 * counts (mirror of lib/activities-catalog.ts for the activities index).
 *
 * Design decisions:
 *  - Landings carry no date → no "Newest" sort. The DEFAULT sort is 'variety':
 *    a deterministic round-robin interleave across exercise types, so page 1
 *    shows ~24 DISTINCT worksheet mechanics instead of one type walled across
 *    many themes (the old slug-alphabetical order). When a single type is
 *    already selected, variety interleaves across THEMES of that type instead.
 *    Deterministic = pure function of the landing file — identical output on
 *    every request/revalidation (per CLAUDE.md §18.4.2, per-request randomness
 *    would fragment the ISR cache).
 *  - Subject tint (teal math / coral literacy) is derived from the taxonomy's
 *    apps.*.default_subject buckets: 'letters' types → literacy, everything
 *    else (math/logic/science/spatial-reasoning) → math-teal.
 */
import type { Landing } from './seo/landing-content';
import { getAxisName, exerciseTypeKeysForSubject } from './taxonomy';
import type { Subject } from './activities-catalog';

export const WORKSHEETS_PAGE_SIZE = 24;
export const WORKSHEETS_TOP_THEMES = 12;

export type WsSortKey = 'variety' | 'az' | 'za';

export interface WsFilters {
  type: string | null;
  level: string | null;
  theme: string | null;
  sort: WsSortKey;
  page: number;
  showAllThemes: boolean;
}

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

export function parseWorksheetFilters(sp: SP): WsFilters {
  const sortRaw = first(sp.sort);
  const sort: WsSortKey = sortRaw === 'az' || sortRaw === 'za' ? sortRaw : 'variety';
  const pageRaw = parseInt(first(sp.page) || '1', 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  return {
    type: first(sp.type) || null,
    level: first(sp.level) || null,
    theme: first(sp.theme) || null,
    sort,
    page,
    showAllThemes: first(sp.themes) === 'all',
  };
}

/** Landings matching the given subset of filters (any null filter is ignored). */
export function applyLandingFilters<T extends Landing>(
  rows: T[],
  f: Partial<Pick<WsFilters, 'type' | 'level' | 'theme'>>,
): T[] {
  return rows.filter((l) => {
    if (f.type && l.coordinate.type !== f.type) return false;
    if (f.level && l.coordinate.level !== f.level) return false;
    if (f.theme && l.coordinate.theme !== f.theme) return false;
    return true;
  });
}

export interface FacetOption {
  value: string;
  count: number;
}
export interface LandingFacets {
  type: FacetOption[];
  level: FacetOption[];
  theme: FacetOption[];
}

/* Standard faceted counts: each facet's option counts are computed over rows
   filtered by the OTHER active facets (not its own), so counts reflect "how
   many you'd get if you picked this, given your other selections". */
export function buildLandingFacets(allRows: Landing[], f: WsFilters): LandingFacets {
  const countBy = (rows: Landing[], keyOf: (l: Landing) => string): FacetOption[] => {
    const m = new Map<string, number>();
    for (const l of rows) {
      const k = keyOf(l);
      if (!k) continue; // themeless coordinates (es math-worksheet class) are unfilterable by theme
      m.set(k, (m.get(k) || 0) + 1);
    }
    return [...m.entries()].map(([value, count]) => ({ value, count }));
  };

  const typeRows = applyLandingFilters(allRows, { level: f.level, theme: f.theme });
  const levelRows = applyLandingFilters(allRows, { type: f.type, theme: f.theme });
  const themeRows = applyLandingFilters(allRows, { type: f.type, level: f.level });

  return {
    type: countBy(typeRows, (l) => l.coordinate.type),
    level: countBy(levelRows, (l) => l.coordinate.level),
    theme: countBy(themeRows, (l) => l.coordinate.theme),
  };
}

/**
 * Deterministic round-robin interleave. Buckets rows by key (input order
 * preserved within each bucket), orders buckets by descending size (key A–Z
 * tiebreak), then emits one row per bucket per round until all are exhausted.
 * Pure + stable: same input array → same output, every request.
 */
export function interleaveByAxis<T extends Landing>(rows: T[], keyOf: (l: T) => string): T[] {
  const buckets = new Map<string, T[]>();
  for (const l of rows) {
    const k = keyOf(l) || '~';
    const b = buckets.get(k);
    if (b) b.push(l);
    else buckets.set(k, [l]);
  }
  const order = [...buckets.keys()].sort(
    (a, b) => buckets.get(b)!.length - buckets.get(a)!.length || (a < b ? -1 : 1),
  );
  const out: T[] = [];
  for (let round = 0; out.length < rows.length; round++) {
    for (const k of order) {
      const b = buckets.get(k)!;
      if (round < b.length) out.push(b[round]);
    }
  }
  return out;
}

export function sortLandings<T extends Landing>(
  rows: T[],
  locale: string,
  sort: WsSortKey,
  activeType: string | null,
): T[] {
  // Slug sort first = the deterministic seed order for every mode.
  const base = rows.slice().sort((a, b) => (a.slug < b.slug ? -1 : 1));
  if (sort === 'az' || sort === 'za') {
    base.sort((a, b) => a.h1.localeCompare(b.h1, locale));
    if (sort === 'za') base.reverse();
    return base;
  }
  // 'variety' (default): round-robin across exercise types; with a type
  // already selected, interleave across its themes so the page still varies.
  return interleaveByAxis(
    base,
    activeType ? (l) => l.coordinate.theme || '' : (l) => l.coordinate.type,
  );
}

/* Literacy exercise-type keys per the taxonomy's default_subject buckets.
   Lazy so the taxonomy JSON is only walked once per server lifetime. */
let _literacyTypes: Set<string> | null = null;
export function worksheetSubject(typeKey: string): Subject {
  if (!_literacyTypes) _literacyTypes = new Set(exerciseTypeKeysForSubject('letters'));
  return _literacyTypes.has(typeKey) ? 'literacy' : 'math';
}

/* Display labels for landing level keys (per-locale band spines). Moved here
   from the worksheets hub route (and mirrored by the [slug] route's LEVELS
   chips — fold that side in at the next LEVELS touch). Locale-prefixed
   entries (`da:1-klasse`) win over bare keys — da shares the `1-klasse`/
   `2-klasse` KEYS with de but Danish writes lowercase "1. klasse". */
const LEVEL_CHIP: Record<string, string> = {
  preschool: 'Preschool', kindergarten: 'Kindergarten', 'grade-1': 'Grade 1', 'grade-2': 'Grade 2', 'grade-3': 'Grade 3',
  vorschule: 'Vorschule', '1-klasse': '1. Klasse', '2-klasse': '2. Klasse', '3-klasse': '3. Klasse',
  preescolar: 'Preescolar', 'primer-grado': 'Primer grado', 'segundo-grado': 'Segundo grado', 'tercer-grado': 'Tercer grado',
  forskola: 'Förskola', 'ak-1': 'Åk 1', 'ak-2': 'Åk 2', 'ak-3': 'Åk 3',
  kleuters: 'Kleuters', 'groep-3': 'Groep 3', 'groep-4': 'Groep 4', 'groep-5': 'Groep 5',
  boernehaveklasse: '0. klasse', 'da:1-klasse': '1. klasse', 'da:2-klasse': '2. klasse', 'da:3-klasse': '3. klasse',
  '1-trinn': '1. trinn', '2-trinn': '2. trinn', '3-trinn': '3. trinn', '4-trinn': '4. trinn',
  maternelle: 'Maternelle', cp: 'CP', ce1: 'CE1', ce2: 'CE2',
  infanzia: 'Infanzia', 'classe-prima': 'Classe prima', 'classe-seconda': 'Classe seconda', 'classe-terza': 'Classe terza',
  'educacao-infantil': 'Educação infantil', '1o-ano': '1º ano', '2o-ano': '2º ano', '3o-ano': '3º ano',
  esikoulu: 'Esikoulu', '1-luokka': '1. luokka', '2-luokka': '2. luokka', '3-luokka': '3. luokka',
};
export function levelChip(key: string, locale?: string): string {
  return (locale && LEVEL_CHIP[`${locale}:${key}`]) || LEVEL_CHIP[key] || key;
}

/* Canonical band ordering for the Level facet (Preschool → K → 1 → 2 → 3;
   alphabetical label sort would put Kindergarten after Grade 2). Unknown
   keys sink to the end (then label A–Z). */
const LEVEL_ORDER: Record<string, number> = {
  preschool: 0, vorschule: 0, preescolar: 0, forskola: 0, kleuters: 0, boernehaveklasse: 0,
  maternelle: 0, infanzia: 0, 'educacao-infantil': 0, esikoulu: 0,
  kindergarten: 1,
  'grade-1': 2, '1-klasse': 2, 'primer-grado': 2, 'ak-1': 2, 'groep-3': 2, '1-trinn': 2,
  cp: 2, 'classe-prima': 2, '1o-ano': 2, '1-luokka': 2,
  'grade-2': 3, '2-klasse': 3, 'segundo-grado': 3, 'ak-2': 3, 'groep-4': 3, '2-trinn': 3,
  ce1: 3, 'classe-seconda': 3, '2o-ano': 3, '2-luokka': 3,
  'grade-3': 4, '3-klasse': 4, 'tercer-grado': 4, 'ak-3': 4, 'groep-5': 4, '3-trinn': 4,
  ce2: 4, 'classe-terza': 4, '3o-ano': 4, '3-luokka': 4,
  '4-trinn': 5,
};
export function levelOrder(key: string): number {
  return LEVEL_ORDER[key] ?? 9;
}

export function themeLabel(themeKey: string, locale: string): string {
  if (!themeKey) return '';
  if (themeKey.includes('-vs-')) {
    return themeKey.split('-vs-').map((k) => getAxisName('theme', k, locale) || k).join(' · ');
  }
  return getAxisName('theme', themeKey, locale) || themeKey;
}
