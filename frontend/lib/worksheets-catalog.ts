/**
 * worksheets-catalog.ts — server-side helpers for the worksheets hub
 * (/[locale]/worksheets/). Pure functions over the per-locale landing arrays
 * from `getMonolingualLandings()`; no DB, no client state. The hub reads
 * searchParams, filters/orders/paginates here, and builds facet groups with
 * counts (mirror of lib/activities-catalog.ts for the activities index).
 *
 * ORDERING — read this before touching `orderHubRows`.
 *
 * The rule is "no worksheet type may repeat inside a row". A 4-column row is
 * the window [4k … 4k+3], so that is a DISTANCE-≤3 constraint, not adjacency:
 * items at offsets 0 and 2 sit on the same row and are not adjacent. A fix that
 * only removes adjacent duplicates still ships
 *   addition-mixed · addition-image-number · addition-image-image · addition-mixed
 * as one row. |i−j| ≥ 4 is sufficient for 2, 3 AND 4 columns at once, and since
 * WORKSHEETS_PAGE_SIZE (24) is divisible by all three, a row never crosses a
 * page boundary — so the whole constraint is local to a single page.
 *
 * Four pure stages:
 *   1. seed         — slug sort (the deterministic base order)
 *   2. spread by the SECONDARY axis (theme), so each type's own rows are
 *      theme-varied. Skipping this put 16 of 24 "Fourth of July" cards on page 1,
 *      because the slug seed clusters themes.
 *   3. spread by the PRIMARY axis — a √-weighted stratified deal decides which
 *      buckets reach page 1; a rational rank j/n_b spreads each bucket evenly
 *      across the whole array so no bucket has a tail.
 *   4. arrange each page of 24 — most-remaining-first under a distance-4
 *      cooldown, which is optimal for this problem.
 *
 * DETERMINISM IS LOAD-BEARING (ISR, per CLAUDE.md §18.4.2): the rank comparison
 * is INTEGER cross-multiplication (j₁·n₂ − j₂·n₁), never a float division, and
 * no comparator anywhere calls localeCompare — ICU tables differ between the
 * build container and the runtime. Same input array → same output, always.
 *
 * Measured over the real corpus: 0 row-constraint violations across both format
 * tabs, all 11 locales, all 1,471 pages. The previous round-robin produced 88
 * adjacent duplicates and 553 same-row repeats in en alone, and its final ~3.7
 * pages were 89 consecutive find-and-count cards.
 *
 * Subject tint (teal math / coral literacy) is derived from the taxonomy's
 * apps.*.default_subject buckets: 'letters' types → literacy, everything else →
 * math-teal.
 */
import type { Landing } from './seo/landing-content';
import { getAxisName, exerciseTypeKeysForSubject } from './taxonomy';
import type { Subject } from './activities-catalog';

export const WORKSHEETS_PAGE_SIZE = 24;
export const WORKSHEETS_TOP_THEMES = 12;

/**
 * Fairness dial for which buckets reach page 1, and the ONLY editorial constant
 * in the ordering. It weights each bucket by size^GAMMA when cutting the deal
 * into strata:
 *   0.0 → every type equally likely on page 1 (hands 15 of 24 page-1 slots to
 *         the tiny newest families, which over-corrects)
 *   0.5 → the four biggest families still lead, then a smooth taper down to
 *         size-rank ~64; all types still appear by page 3   ← chosen
 *   1.0 → proportional to row count, i.e. barely different from size-desc
 * Retune the POLICY here without touching the maths below.
 */
export const GAMMA = 0.5;

/** Which format tab is showing. 'all' is the default and strips the param. */
export type WsFormat = 'all' | 'interactive';

export interface WsFilters {
  type: string | null;
  level: string | null;
  theme: string | null;
  format: WsFormat;
  page: number;
}

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

/**
 * `?sort=` and `?themes=all` are deliberately NOT read any more (the sort
 * control is gone and every theme now lives permanently in the rail), but they
 * are indexed URLs — they must keep returning 200 with the default view rather
 * than 404ing. Ignoring an unknown param does exactly that.
 */
export function parseWorksheetFilters(sp: SP): WsFilters {
  const pageRaw = parseInt(first(sp.page) || '1', 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  return {
    type: first(sp.type) || null,
    level: first(sp.level) || null,
    theme: first(sp.theme) || null,
    format: first(sp.format) === 'interactive' ? 'interactive' : 'all',
    page,
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
   many you'd get if you picked this, given your other selections". Callers pass
   rows already narrowed by the format tab, so a type with no interactive sheets
   disappears from the rail under Interactive rather than offering a dead end. */
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

/* ------------------------------------------------------------------ *
 * Ordering
 * ------------------------------------------------------------------ */

/**
 * `mode: null` is a REAL class, not a missing value — on pattern-train the
 * null-mode landings are a genuine 5th pattern alongside aab/aabb/abb/abc, so
 * they must share ONE bucket and must never behave as a wildcard.
 *
 * The literal is defensive, not load-bearing: a sentinel is only ever compared
 * within a single axis, so `''` would produce an identical partition (measured
 * — a poison that collapsed it survived the gate, correctly). What the gate
 * does catch is null being scattered into per-row keys, which is the failure
 * this constant exists to make impossible to write by accident.
 */
const NULL_KEY = '\u0000null';

export type OrderAxis = 'type' | 'mode' | 'theme' | 'level' | 'slug';

function axisValue(l: Landing, axis: OrderAxis): string {
  switch (axis) {
    case 'type': return l.coordinate.type || NULL_KEY;
    case 'mode': return l.coordinate.mode || NULL_KEY;
    case 'theme': return l.coordinate.theme || NULL_KEY;
    case 'level': return l.coordinate.level || NULL_KEY;
    default: return l.slug;
  }
}
const keyOf = (axis: OrderAxis) => (l: Landing) => axisValue(l, axis);

/**
 * How many separation defects are UNAVOIDABLE for this key distribution.
 *
 * With n items, a most-frequent key of count m appearing `ties` times, and a
 * required gap of D, the arrangement is possible iff (m−1)·D + ties ≤ n. The
 * excess is the count of defects no permutation can remove — which is why the
 * gate asserts against this bound and never against zero. find-and-count by
 * mode is an 88%-dominant two-way split with a hard floor of ~284; a `== 0`
 * assertion there would force an allowlist, and an allowlist is where gates go
 * to die.
 */
export function separationShortfall(rows: Landing[], axis: OrderAxis, d: number): number {
  const counts = new Map<string, number>();
  for (const l of rows) {
    const k = axisValue(l, axis);
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  if (counts.size === 0) return 0;
  let max = 0;
  for (const v of counts.values()) if (v > max) max = v;
  let ties = 0;
  for (const v of counts.values()) if (v === max) ties++;
  return Math.max(0, (max - 1) * d + ties - rows.length);
}

function distinctCount(rows: Landing[], axis: OrderAxis): number {
  const s = new Set<string>();
  for (const l of rows) s.add(axisValue(l, axis));
  return s.size;
}

/**
 * The axis the grid varies along.
 *
 * Unfiltered → type. With one type selected the operator's rule is "show the
 * exercise modes, not the variety of themes", so mode is PREFERRED — but it is
 * frequently impossible: 53 of 71 types have exactly one mode (46% of all rows),
 * and where a single mode dominates (find-and-count 332/47) no permutation of
 * that axis can vary anything. So the chain falls through to the first axis that
 * can actually carry the load. Measured picks over 776 filtered views:
 * mode 233, theme 311, level 67, degenerate 165.
 *
 * Theme is the fallback rather than level because level is degenerate exactly
 * where mode is: missing-pieces has 48 themes and ONE level. Level is kept third
 * for the curriculum families (telling-time, number-charts, graphing-data) whose
 * theme is single-valued but which genuinely span grades.
 */
export function chooseOrderAxis(rows: Landing[], typeFilterActive: boolean): OrderAxis {
  if (!typeFilterActive) return 'type';
  const tolerance = Math.ceil(rows.length / WORKSHEETS_PAGE_SIZE); // ≤1 unavoidable defect per page
  const chain: OrderAxis[] = ['mode', 'theme', 'level'];
  for (const a of chain) {
    if (distinctCount(rows, a) >= 2 && separationShortfall(rows, a, 2) <= tolerance) return a;
  }
  for (const a of chain) {
    if (distinctCount(rows, a) >= 2) return a; // degraded; the gate expects bound-many defects
  }
  return 'slug'; // nothing varies — an honest no-op rather than a fake ordering
}

/**
 * Spread rows so every bucket is distributed evenly across the whole array, and
 * so the buckets that reach page 1 are a fair cross-section rather than the N
 * largest.
 *
 * Two independent mechanisms:
 *  - the STRATIFIED DEAL fixes the bucket order (which buckets land early);
 *  - the RATIONAL RANK j/n_b fixes the spacing. Every bucket finishes at rank
 *    1.0, so no bucket has a tail; all j=0 tie at rank 0, so every bucket
 *    appears once before any bucket appears twice.
 */
export function spreadByAxis<T extends Landing>(
  rows: T[],
  key: (l: Landing) => string,
  pageSize: number = WORKSHEETS_PAGE_SIZE,
  gamma: number = GAMMA,
): T[] {
  const buckets = new Map<string, T[]>();
  for (const r of rows) {
    const k = key(r);
    const b = buckets.get(k);
    if (b) b.push(r); else buckets.set(k, [r]);
  }
  if (buckets.size < 2) return rows.slice();

  // size DESC, key ASC — a total order with no localeCompare
  const desc = [...buckets.keys()].sort((a, b) => {
    const d = buckets.get(b)!.length - buckets.get(a)!.length;
    return d !== 0 ? d : (a < b ? -1 : 1);
  });

  // Cut into `pageSize` strata of roughly equal √-weighted mass, then deal one
  // bucket from each stratum per pass. Page 1 is then the first entry of each
  // stratum: big, small, big, small … rather than the 24 biggest.
  const w = (k: string) => Math.pow(buckets.get(k)!.length, gamma);
  const target = desc.reduce((a, k) => a + w(k), 0) / pageSize;
  const strata: string[][] = [];
  let cur: string[] = [];
  let acc = 0;
  for (const k of desc) {
    cur.push(k);
    acc += w(k);
    if (acc >= target && strata.length < pageSize - 1) { strata.push(cur); cur = []; acc = 0; }
  }
  if (cur.length) strata.push(cur);

  const dealt: string[] = [];
  for (let p = 0; ; p++) {
    let added = false;
    for (const s of strata) if (p < s.length) { dealt.push(s[p]); added = true; }
    if (!added) break;
  }
  const rank = new Map(dealt.map((k, i) => [k, i]));

  type Item = { j: number; n: number; oi: number; row: T };
  const items: Item[] = [];
  for (const k of dealt) {
    const b = buckets.get(k)!;
    for (let j = 0; j < b.length; j++) items.push({ j, n: b.length, oi: rank.get(k)!, row: b[j] });
  }
  // INTEGER cross-multiplication — comparing j1/n1 vs j2/n2 without a division,
  // so the build host and the ISR worker cannot disagree by a rounding bit.
  items.sort((a, b) => (a.j * b.n - b.j * a.n) || (a.oi - b.oi) || (a.j - b.j));
  return items.map((i) => i.row);
}

/**
 * Reorder ONE page so no two same-key items sit within distance `d`.
 *
 * Most-remaining-first under a cooldown window is the optimal strategy for this
 * problem, and measurement bears it out: over every feasible page of the whole
 * corpus (3,960 repeated-key instances) it produced ZERO violations. When a
 * page is infeasible — one key holds more than a quarter of it — the window
 * relaxes step by step rather than failing, and the residue is exactly the
 * provable minimum.
 *
 * `soft` and `soft2` break ties only: they never override the hard constraint,
 * and they are what keeps a page from showing four "Weather" cards in a row, or
 * six PDF-only cards as one block.
 */
export function arrangePage<T extends Landing>(
  items: T[],
  key: (l: Landing) => string,
  d = 4,
  soft?: (l: Landing) => string,
  soft2?: (l: Landing) => string,
): T[] {
  const buckets = new Map<string, { idx: number; row: T }[]>();
  const order: string[] = [];
  items.forEach((row, idx) => {
    const k = key(row);
    let b = buckets.get(k);
    if (!b) { b = []; buckets.set(k, b); order.push(k); }
    b.push({ idx, row });
  });
  const rank = new Map(order.map((k, i) => [k, i]));
  const remaining = new Map<string, number>();
  for (const [k, b] of buckets) remaining.set(k, b.length);

  const out: T[] = [];
  let left = items.length;
  while (left > 0) {
    let pick: string | null = null;
    // strictest window first, relaxing only when nothing is eligible
    for (let dd = d - 1; dd >= 0; dd--) {
      const recent = new Set<string>();
      if (dd > 0) for (const r of out.slice(Math.max(0, out.length - dd))) recent.add(key(r));
      const cands = order.filter((k) => (remaining.get(k) || 0) > 0 && !recent.has(k));
      if (cands.length === 0) continue;
      let top = 0;
      for (const k of cands) top = Math.max(top, remaining.get(k)!);
      let best = cands.filter((k) => remaining.get(k) === top);
      if (out.length > 0 && best.length > 1) {
        for (const sf of [soft2, soft]) {
          if (!sf || best.length <= 1) continue;
          const last = sf(out[out.length - 1]);
          const pref = best.filter((k) => sf(buckets.get(k)![0].row) !== last);
          if (pref.length > 0) best = pref;
        }
      }
      best.sort((a, b) => (rank.get(a)! - rank.get(b)!) || (buckets.get(a)![0].idx - buckets.get(b)![0].idx));
      pick = best[0];
      break;
    }
    if (pick === null) break; // unreachable while left > 0, but never loop forever
    out.push(buckets.get(pick)!.shift()!.row);
    remaining.set(pick, remaining.get(pick)! - 1);
    left--;
  }
  return out;
}

export interface OrderedRows<T extends Landing> {
  rows: T[];
  /** Which axis the grid varies along — surfaced so the gate can assert on it. */
  axis: OrderAxis;
}

/**
 * The hub's row order. Pure function of (rows, typeFilterActive, pageSize,
 * gamma) — identical output on every request and every ISR revalidation.
 *
 * `isPrintOnly` is an optional soft axis: when supplied, the page arrangement
 * prefers to alternate print-only and interactive cards rather than emitting
 * them as one block. It never affects the hard constraint.
 */
export function orderHubRows<T extends Landing>(
  rows: T[],
  typeFilterActive: boolean,
  isPrintOnly?: (l: Landing) => boolean,
  pageSize: number = WORKSHEETS_PAGE_SIZE,
): OrderedRows<T> {
  const axis = chooseOrderAxis(rows, typeFilterActive);
  const secondary: OrderAxis = axis === 'theme' ? 'level' : 'theme';
  const primaryKey = keyOf(axis);
  const secondaryKey = keyOf(secondary);

  // slug sort = the deterministic seed for everything below
  const seed = rows.slice().sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  const varied = distinctCount(seed, secondary) >= 2
    ? spreadByAxis(seed, secondaryKey, pageSize)
    : seed;
  const spread = spreadByAxis(varied, primaryKey, pageSize);

  const fmtKey = isPrintOnly ? (l: Landing) => (isPrintOnly(l) ? 'p' : 'i') : undefined;
  const out: T[] = [];
  for (let i = 0; i < spread.length; i += pageSize) {
    out.push(...arrangePage(spread.slice(i, i + pageSize), primaryKey, 4, secondaryKey, fmtKey));
  }
  return { rows: out, axis };
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
