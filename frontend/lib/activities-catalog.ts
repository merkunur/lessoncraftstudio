/**
 * activities-catalog.ts — server-side helpers for the faceted activities
 * index (/[locale]/activities/). Pure functions over the manifest rows from
 * `listAllActivities()`; no DB, no client state. The index reads searchParams,
 * filters/sorts/paginates here, and builds localized facet groups with counts.
 *
 * Design decisions (CLAUDE.md §20, §17.4.3):
 *  - Subject (math|literacy) is DERIVED from the CCSS strand (no subject field
 *    in the manifest). Math = the five math domains; Literacy = the ELA strands.
 *  - "Skill area" facet = the CCSS strand, localized via localizeStrand at the
 *    render layer (this file keeps the URL-safe English key only).
 *  - shortTitle trims the long SEO page_title to a card-sized name at the first
 *    universal separator, so cards read "Make 10", not the full title.
 */
import type { ActivityRow } from './activities';

export type Subject = 'math' | 'literacy';

/* The five CCSS math domains. Anything else (Reading: Foundational Skills,
   Phonological Awareness, Language) is literacy. Both Base-Ten spellings. */
const MATH_STRANDS = new Set<string>([
  'Counting & Cardinality',
  'Operations & Algebraic Thinking',
  'Number & Operations in Base Ten',
  'Number and Operations in Base Ten',
  'Measurement & Data',
  'Geometry',
]);

export function deriveSubject(strand: string): Subject {
  return MATH_STRANDS.has(strand) ? 'math' : 'literacy';
}

/* URL-safe key per strand (the "skill area" facet value). Both Base-Ten
   spellings collapse to one key, matching localizeStrand's §17.4.3 merges. */
export const STRAND_KEY: Record<string, string> = {
  'Counting & Cardinality': 'counting',
  'Operations & Algebraic Thinking': 'operations',
  'Number & Operations in Base Ten': 'base-ten',
  'Number and Operations in Base Ten': 'base-ten',
  'Measurement & Data': 'measurement',
  Geometry: 'geometry',
  'Reading: Foundational Skills': 'reading',
  'Phonological Awareness': 'phonological',
  Language: 'language',
};

export function strandKey(strand: string): string {
  return STRAND_KEY[strand] ?? 'other';
}

/* Subject visual identity — kept to two color families (Math = teal, Literacy
   = coral) for brand discipline (frontend-design: spend boldness in one place;
   the per-engine glyph is the signature, not a rainbow of strand colors). The
   strand is named in text on the card, which is where that finer structure
   lives. Classes are Direction A Tailwind tokens. */
export const SUBJECT_STYLE: Record<
  Subject,
  { panel: string; glyph: string; edge: string; coin: string }
> = {
  // Tints deepened from the -soft tokens so Math (teal family) vs Literacy
  // (coral family) read as two families at a glance; the signal is reinforced
  // by the subject-colored glyph stroke, the backing coin, and the edge band.
  math: { panel: 'bg-[#DCEAE6]', glyph: 'text-lcs-teal', edge: 'bg-lcs-teal', coin: 'bg-lcs-teal/12' },
  literacy: { panel: 'bg-[#FBE0D2]', glyph: 'text-lcs-coral-deep', edge: 'bg-lcs-coral', coin: 'bg-lcs-coral/12' },
};

/* Trim the long SEO page_title to a card-sized display name. Cuts at the first
   universal separator (em/en dash, pipe, or " (" qualifier) — all locale-safe.
   "Make 10 — Number Bonds to Ten (Kindergarten)" → "Make 10". */
export function shortTitle(pageTitle: string): string {
  if (!pageTitle) return '';
  const m = pageTitle.match(/\s[—–|]\s|\s\(/);
  if (m && m.index && m.index > 0) return pageTitle.slice(0, m.index).trim();
  return pageTitle.trim();
}

export type SortKey = 'newest' | 'az' | 'za';
export const ACTIVITY_PAGE_SIZE = 48; // today's ~37 fit on page 1; paginates only past 48

export interface ActivityFilters {
  subject: Subject | null;
  grade: string | null; // 'K' | '1' | '2' | '3'
  skill: string | null; // strand URL key
  sort: SortKey;
  page: number;
}

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

export function parseActivityFilters(sp: SP): ActivityFilters {
  const subjectRaw = first(sp.subject);
  const subject: Subject | null =
    subjectRaw === 'math' || subjectRaw === 'literacy' ? subjectRaw : null;
  const gradeRaw = first(sp.grade);
  const grade = gradeRaw && ['K', '1', '2', '3'].includes(gradeRaw) ? gradeRaw : null;
  const skill = first(sp.skill) || null;
  const sortRaw = first(sp.sort);
  const sort: SortKey = sortRaw === 'az' || sortRaw === 'za' ? sortRaw : 'newest';
  const pageRaw = parseInt(first(sp.page) || '1', 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  return { subject, grade, skill, sort, page };
}

/** Rows matching the given subset of filters (any null filter is ignored). */
export function applyFilters(
  rows: ActivityRow[],
  f: Partial<Pick<ActivityFilters, 'subject' | 'grade' | 'skill'>>,
): ActivityRow[] {
  return rows.filter((r) => {
    if (f.subject && deriveSubject(r.alignment.strand) !== f.subject) return false;
    if (f.grade && r.alignment.grade !== f.grade) return false;
    if (f.skill && strandKey(r.alignment.strand) !== f.skill) return false;
    return true;
  });
}

export function sortRows(rows: ActivityRow[], locale: string, sort: SortKey): ActivityRow[] {
  if (sort === 'newest') return rows; // manifest order = newest-last authoring order
  const arr = [...rows];
  arr.sort((a, b) =>
    shortTitle(a.page_title[locale] || a.page_title.en || '').localeCompare(
      shortTitle(b.page_title[locale] || b.page_title.en || ''),
      locale,
    ),
  );
  if (sort === 'za') arr.reverse();
  return arr;
}

export interface FacetOption {
  value: string;
  count: number;
}
export interface ActivityFacets {
  subject: FacetOption[]; // value = 'math' | 'literacy'
  grade: FacetOption[]; // value = 'K' | '1' | '2'
  skill: FacetOption[]; // value = strand key (render localizes via the row map)
}

/* Standard faceted counts: each facet's option counts are computed over rows
   filtered by the OTHER active facets (not its own), so counts reflect "how
   many you'd get if you picked this, given your other selections". */
export function buildFacets(
  allRows: ActivityRow[],
  filters: ActivityFilters,
): ActivityFacets {
  const countBy = (rows: ActivityRow[], keyOf: (r: ActivityRow) => string): FacetOption[] => {
    const m = new Map<string, number>();
    for (const r of rows) {
      const k = keyOf(r);
      m.set(k, (m.get(k) || 0) + 1);
    }
    return [...m.entries()].map(([value, count]) => ({ value, count }));
  };

  const subjectRows = applyFilters(allRows, { grade: filters.grade, skill: filters.skill });
  const gradeRows = applyFilters(allRows, { subject: filters.subject, skill: filters.skill });
  const skillRows = applyFilters(allRows, { subject: filters.subject, grade: filters.grade });

  return {
    subject: countBy(subjectRows, (r) => deriveSubject(r.alignment.strand)),
    grade: countBy(gradeRows, (r) => r.alignment.grade),
    skill: countBy(skillRows, (r) => strandKey(r.alignment.strand)),
  };
}
