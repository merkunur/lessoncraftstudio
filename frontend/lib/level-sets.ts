/**
 * level-sets.ts — the LADDER model (Level Sets v2, 2026-10-15).
 *
 * WHY. The Level Set programme (2026-09-27 →) gave every worksheet-gen type
 * face real level 1 / 2 / 3 pages with several copies per level, but the site
 * showed each page as one flat card ("Type · Easy · Set 2") and deliberately
 * kept the pages of one face apart on the hub grid. A teacher could not see
 * "this skill, three levels, five pages each" anywhere. Operator red line
 * (2026-10-15): the content exists but is not packed the way teachers need;
 * restructure the catalogue so the value is obvious — WITHOUT touching the
 * paywall and WITHOUT harming SEO.
 *
 * THE UNIT. A ladder = one worksheet type FACE (a catalogue id such as
 * `g1245`, the variation code every worksheet-gen slug ends with) and its
 * pages grouped by rung: `easy` (exercise_mode 'easy'), `core` (mode null —
 * the published, indexed page plus its copies) and `hard` ('hard'). The three
 * levels of "Set N" are NOT one theme at three levels (build-waves picks a
 * theme per face × level × copy), so the ladder — not the copy — is the unit.
 *
 * PURE. This module never touches the database: pages come in as rows,
 * landings as a lookup. `level-sets-db.ts` is the loader. The deck-page strip
 * (scripts/lib/deck-ladder.js) mirrors `rungOf` / `splitTitle` / the
 * eligibility rule — keep the two in step.
 *
 * SEO. Set pages are noindex (never in a sitemap); ladders are an ADDITIVE
 * browse structure. No indexed page's identity (URL/title/meta/h1) depends on
 * anything here.
 */
import type { Landing } from '@/lib/seo/landing-content';
import { INTERACTIVE_LEVEL_SET_TYPES, LEVEL_SET_PRINT_ONLY_VARIATIONS } from '@/config/interactive-level-set-types';
import { isPrintOnlyType } from '@/config/interactive-exercise-types';
import { localePath } from '@/lib/seo/url';

export type Rung = 'easy' | 'core' | 'hard';
/** Display order: easy → core → hard. */
export const RUNGS: readonly Rung[] = ['easy', 'core', 'hard'];

/** Route segment under /worksheets — a set page is `/<loc>/worksheets/sets/<code>`. */
export const SETS_SEGMENT = 'sets';

/** The variation code a worksheet-gen slug ends with (`…-k344`, `…-k344-3` → "k344"); null when absent. */
export function variationCodeOf(slug: string): string | null {
  const m = /-((?:k|g\d)\d{3})(?:-\d+)?$/.exec(slug);
  return m ? m[1] : null;
}

/** The copy number a slug carries: `…-k323` is copy 1, `…-k323-4` copy 4. */
export function copyOf(slug: string): number {
  const m = /-(?:k|g\d)\d{3}-(\d+)$/.exec(slug);
  return m ? Number(m[1]) : 1;
}

/** exercise_mode → rung; null for a mode that is not a worksheet-gen level (app modes). */
export function rungOf(exerciseMode: string | null | undefined): Rung | null {
  if (exerciseMode == null || exerciseMode === '') return 'core';
  if (exerciseMode === 'easy') return 'easy';
  if (exerciseMode === 'hard') return 'hard';
  return null;
}

/**
 * Worksheet-gen titles are `Type title — Theme` for themed pages and the bare
 * type title for themeless ones. The split is on the spaced em dash the
 * emitter writes (the theme part may itself carry "BW" / "B&W").
 */
export function splitTitle(title: string): { base: string; theme: string | null } {
  const i = title.indexOf(' — ');
  if (i === -1) return { base: title, theme: null };
  return { base: title.slice(0, i), theme: title.slice(i + 3) || null };
}

export interface LadderPage {
  slug: string;
  /** The stored deck title in the page locale. */
  title: string;
  /** Theme part of the title, or null for a themeless page. */
  theme: string | null;
  rung: Rung;
  copy: number;
  indexable: boolean;
  interactive: boolean;
  hasAnswerKey: boolean;
}

export interface Ladder {
  /** Variation code — the ladder's identity and its URL segment. */
  code: string;
  /** exercise-type axis key. */
  type: string;
  /** The face title: the landing h1 when the face has one, else the core page's base title. */
  title: string;
  /** Landing slug of the face's published page, when it has one. */
  landingSlug: string | null;
  /** Grade key of the landing coordinate (levelChip input), when known. */
  level: string | null;
  pages: Record<Rung, LadderPage[]>;
  pageCount: number;
  /** Number of rungs that have at least one page (1–3). */
  rungCount: number;
  interactiveCount: number;
  answerKeyCount: number;
}

export interface LadderDeckRow {
  slug: string;
  title: unknown;
  exerciseType: string;
  exerciseMode: string | null;
  answerKeyUrl: string | null;
  indexable: boolean;
}

export function deckTitleIn(raw: unknown, locale: string): string | null {
  if (!raw || typeof raw !== 'object') return typeof raw === 'string' ? raw : null;
  const r = raw as Record<string, string>;
  return r[locale] || r.en || Object.values(r)[0] || null;
}

/** A page is interactive when it ships a screen version. Mirrors lib/worksheets-sheets.ts rowIsPrintOnly. */
export function pageIsInteractive(type: string, code: string, indexable: boolean): boolean {
  if (indexable) return !isPrintOnlyType(type);
  return INTERACTIVE_LEVEL_SET_TYPES.has(type)
    && !(LEVEL_SET_PRINT_ONLY_VARIATIONS[type] || []).includes(code);
}

/**
 * The RETIRED set-page path (2026-10-18). `/worksheets/sets/<code>` now 308s to
 * setHref; the route stays because ~108k deck pages and the landings link it
 * (scripts/lib/deck-ladder.js) and rewriting them would churn indexed pages.
 */
export function setPath(locale: string, code: string): string {
  return localePath(locale, 'worksheets', SETS_SEGMENT, code);
}

/**
 * Where a Level Set lives now: a SUB-CATEGORY of its worksheet type on the hub
 * (operator 2026-10-18 — "a separate level sets page is unnecessary").
 * Filtered hub states canonicalise to the bare hub, so this adds no indexable URL.
 */
export function setHref(locale: string, type: string, code: string): string {
  // Params in the alphabetical order buildFilterUrl emits, so one state has one URL.
  return `${localePath(locale, 'worksheets')}?set=${encodeURIComponent(code)}&type=${encodeURIComponent(type)}`;
}

/** "All Level Sets" — the hub itself, narrowed to a type when one is given. */
export function setsIndexPath(locale: string, type?: string): string {
  const hub = localePath(locale, 'worksheets');
  return type ? `${hub}?type=${encodeURIComponent(type)}` : hub;
}

/** Landing of a face: the landing whose own deck carries this variation code. */
export function landingByCode(landings: Landing[]): Map<string, Landing> {
  const m = new Map<string, Landing>();
  for (const l of landings) {
    const c = variationCodeOf(l.canonicalDeckSlug);
    if (c && !m.has(c)) m.set(c, l);
  }
  return m;
}

/**
 * Group deck rows into ladders. A ladder needs at least TWO pages — a face
 * with only its published page is a worksheet, not a set. Rows without a
 * variation code (the 29 apps) or with a non-level mode are ignored.
 */
export function buildLadders(locale: string, rows: LadderDeckRow[], landings: Map<string, Landing>): Ladder[] {
  const byCode = new Map<string, { type: string; pages: LadderPage[] }>();
  for (const d of rows) {
    const code = variationCodeOf(d.slug);
    if (!code) continue;
    const rung = rungOf(d.exerciseMode);
    if (!rung) continue;
    const title = deckTitleIn(d.title, locale);
    if (!title) continue;
    const { theme } = splitTitle(title);
    const page: LadderPage = {
      slug: d.slug,
      title,
      theme,
      rung,
      copy: copyOf(d.slug),
      indexable: d.indexable,
      interactive: pageIsInteractive(d.exerciseType, code, d.indexable),
      hasAnswerKey: d.answerKeyUrl != null,
    };
    let e = byCode.get(code);
    if (!e) { e = { type: d.exerciseType, pages: [] }; byCode.set(code, e); }
    e.pages.push(page);
  }

  const out: Ladder[] = [];
  for (const [code, e] of byCode) {
    if (e.pages.length < 2) continue;
    const pages: Record<Rung, LadderPage[]> = { easy: [], core: [], hard: [] };
    for (const p of e.pages) pages[p.rung].push(p);
    // Core: the published (indexable) page first, then copies in order; other rungs by copy.
    for (const r of RUNGS) {
      pages[r].sort((a, b) => (Number(b.indexable) - Number(a.indexable)) || (a.copy - b.copy) || a.slug.localeCompare(b.slug));
    }
    const landing = landings.get(code) || null;
    const corePage = pages.core[0] || pages.easy[0] || pages.hard[0];
    const title = (landing && landing.h1) || splitTitle(corePage.title).base;
    out.push({
      code,
      type: e.type,
      title,
      landingSlug: landing ? landing.slug : null,
      level: landing ? landing.coordinate.level : null,
      pages,
      pageCount: e.pages.length,
      rungCount: RUNGS.filter((r) => pages[r].length > 0).length,
      interactiveCount: e.pages.filter((p) => p.interactive).length,
      answerKeyCount: e.pages.filter((p) => p.hasAnswerKey).length,
    });
  }
  out.sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title, locale) || a.code.localeCompare(b.code));
  return out;
}

/** Ladders of one exercise type, in display order. */
export function laddersOfType(ladders: Ladder[], type: string): Ladder[] {
  return ladders.filter((l) => l.type === type);
}

/** Rung of a page slug inside a ladder, or null. */
export function findPage(ladder: Ladder, slug: string): LadderPage | null {
  for (const r of RUNGS) {
    const p = ladder.pages[r].find((x) => x.slug === slug);
    if (p) return p;
  }
  return null;
}

/** 1-based level number of a rung among the rungs this ladder actually has. */
export function levelNumber(ladder: Ladder, rung: Rung): { n: number; total: number } {
  const present = RUNGS.filter((r) => ladder.pages[r].length > 0);
  return { n: present.indexOf(rung) + 1, total: present.length };
}

/**
 * Where the per-set TEACHER SHEETS live on the server (Level Sets v2 phase 2, 2026-10-15):
 * `<LEVEL_SETS_DIR>/<locale>/<code>-teacher-sheet.pdf`, served by nginx at
 * `/<locale>/level-sets/<code>-teacher-sheet.pdf` and reached ONLY through the metered proxy
 * (`/api/quota/dl?kind=record`). A light PDF outside the deck tree — no deck row, no deck page.
 */
export const LEVEL_SETS_DIR = '/var/www/lcs-media/level-sets';
export function teacherSheetFile(locale: string, code: string): string {
  return `${LEVEL_SETS_DIR}/${locale}/${code}-teacher-sheet.pdf`;
}
/** The metered href of a set's teacher sheet. */
export function teacherSheetHref(locale: string, code: string): string {
  return `/api/quota/dl?loc=${encodeURIComponent(locale)}&slug=${encodeURIComponent(code)}&kind=record`;
}
