/**
 * level-set-pathways.ts — the PATHWAY over the ladders (Level Sets v2 phase 3, 2026-10-15).
 *
 * For every (locale, subject, grade) an ORDERED list of its ladders grouped by strand, so a grade
 * hub reads as a teaching sequence and every set page knows its previous and next set. The order
 * is authored ONCE at the type level (content/level-set-pathways/sequence.json — one order serves
 * all 11 locales, ladder face codes are catalogue-wide); strand names come from the national
 * framework table (lib/seo/strand-names.ts, §20.10); the grade of a ladder is its landing level,
 * else its catalogue-id prefix (k → kindergarten, g1 → grade 1 …), mapped to the locale's slug.
 *
 * Pure functions over the Ladder model (lib/level-sets.ts). Gate: scripts/verify-level-set-pathways.js.
 */
import sequence from '@/content/level-set-pathways/sequence.json';
import { getAxisSlug } from '@/lib/taxonomy';
import { localizeStrand } from '@/lib/seo/strand-names';
import type { Ladder } from '@/lib/level-sets';

export interface PathwayStrandDef { strand: string; types: string[] }
export type PathwaySequence = Record<string, PathwayStrandDef[]>;

export const PATHWAY_SEQUENCE: PathwaySequence = Object.fromEntries(
  Object.entries(sequence as Record<string, unknown>).filter(([k]) => !k.startsWith('$')),
) as PathwaySequence;

/** Grade keys in teaching order (the taxonomy's educational-level axis keys). */
export const GRADE_ORDER = ['preschool', 'kindergarten', 'grade-1', 'grade-2', 'grade-3'] as const;
export type GradeKey = (typeof GRADE_ORDER)[number];

const PREFIX_GRADE: Record<string, GradeKey> = { k: 'kindergarten', g1: 'grade-1', g2: 'grade-2', g3: 'grade-3' };

/** The locale's slug of a grade key, or the key itself when the taxonomy has none. */
export function gradeSlug(locale: string, key: GradeKey): string {
  return getAxisSlug('educational-level', key, locale) || key;
}

/** The grade KEY of a ladder: its landing level (a locale slug) resolved back to a key, else its code prefix. */
export function pathwayGradeKey(ladder: Ladder, locale: string): GradeKey {
  if (ladder.level) {
    for (const k of GRADE_ORDER) if (gradeSlug(locale, k) === ladder.level) return k;
  }
  const m = /^(k|g\d)/.exec(ladder.code);
  return (m && PREFIX_GRADE[m[1]]) || 'kindergarten';
}

/** Position of a type in the sequence: [subject, strandIndex, typeIndex], or null when unplaced. */
export function typePosition(type: string): { subject: string; strand: string; si: number; ti: number } | null {
  for (const [subject, strands] of Object.entries(PATHWAY_SEQUENCE)) {
    for (let si = 0; si < strands.length; si++) {
      const ti = strands[si].types.indexOf(type);
      if (ti !== -1) return { subject, strand: strands[si].strand, si, ti };
    }
  }
  return null;
}

/** Pathway order of two ladders of ONE subject × grade: strand → type → face code. */
function comparePathway(a: Ladder, b: Ladder): number {
  const pa = typePosition(a.type), pb = typePosition(b.type);
  if (!pa || !pb) return (pa ? -1 : pb ? 1 : 0) || a.code.localeCompare(b.code);
  return pa.si - pb.si || pa.ti - pb.ti || a.code.localeCompare(b.code);
}

export interface PathwayStrand {
  strand: string;
  strandLabel: string;
  ladders: Ladder[];
}

/** The ordered pathway of a subject at a grade: strands in sequence order, each with its ladders. */
export function pathwayFor(locale: string, ladders: Ladder[], subject: string, grade: GradeKey): PathwayStrand[] {
  const strands = PATHWAY_SEQUENCE[subject] || [];
  const mine = ladders.filter((l) => typePosition(l.type)?.subject === subject && pathwayGradeKey(l, locale) === grade).sort(comparePathway);
  return strands
    .map((s) => ({ strand: s.strand, strandLabel: localizeStrand(s.strand, locale), ladders: mine.filter((l) => typePosition(l.type)?.strand === s.strand) }))
    .filter((s) => s.ladders.length > 0);
}

export interface PathwayNeighbours {
  subject: string;
  strand: string;
  strandLabel: string;
  grade: GradeKey;
  previous: Ladder | null;
  next: Ladder | null;
}

/**
 * The ladder before and after `code` in its subject × grade pathway. At the grade's end `next` is the
 * first ladder of the SAME strand in the next grade that has one (a pathway never dead-ends until the
 * catalogue does); at the grade's start `previous` is the last of the same strand in the previous grade.
 */
export function pathwayNeighbours(locale: string, ladders: Ladder[], code: string): PathwayNeighbours | null {
  const self = ladders.find((l) => l.code === code);
  if (!self) return null;
  const pos = typePosition(self.type);
  if (!pos) return null;
  const grade = pathwayGradeKey(self, locale);
  const flat = (g: GradeKey) => pathwayFor(locale, ladders, pos.subject, g).flatMap((s) => s.ladders);
  const here = flat(grade);
  const i = here.findIndex((l) => l.code === code);
  let previous: Ladder | null = i > 0 ? here[i - 1] : null;
  let next: Ladder | null = i >= 0 && i < here.length - 1 ? here[i + 1] : null;
  const gi = GRADE_ORDER.indexOf(grade);
  if (!next) {
    for (let g = gi + 1; g < GRADE_ORDER.length && !next; g++) {
      next = flat(GRADE_ORDER[g]).find((l) => typePosition(l.type)?.strand === pos.strand) || null;
    }
  }
  if (!previous) {
    for (let g = gi - 1; g >= 0 && !previous; g--) {
      const prev = flat(GRADE_ORDER[g]).filter((l) => typePosition(l.type)?.strand === pos.strand);
      previous = prev.length ? prev[prev.length - 1] : null;
    }
  }
  return { subject: pos.subject, strand: pos.strand, strandLabel: localizeStrand(pos.strand, locale), grade, previous, next };
}

/** Anchor id of a strand group on the sets index. */
export function strandAnchor(subject: string, grade: GradeKey, strand: string): string {
  return `${subject}-${grade}-${strand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}
