/**
 * Which maker a topic page leads to. An exercise-type topic has one maker; a theme or a grade has no single one, so those
 * pages show a shelf of three (operator goal 2026-11-06: every topic page links to its makers). The same committed data as
 * scripts/lib/maker-links.js, which does this for the static worksheet landings and the decks.
 */
import typeMapJson from './type-to-maker.json';
import ribbonJson from '@/content/maker-landings/ribbon.json';
import { catalogMaker, getCopyFile, makerInLocale, templatesIn, MAKER_IDS } from './landings';

interface TypeMap { byTemplate: Record<string, string>; byFamily: Record<string, string>; byApp: Record<string, string> }
const TYPES = typeMapJson as TypeMap;
export type RibbonStrings = Record<string, string>;
export const ribbonStrings = (locale: string): RibbonStrings => {
  const all = ribbonJson as Record<string, RibbonStrings>;
  return all[locale] ?? all.en;
};

const TYPE_ALIAS: Record<string, string> = { 'picture-trail': 'picture-path' };

/** the maker of a taxonomy exercise-type key, or null (the science families have none) */
export function makerForExerciseType(key: string): string | null {
  const k = TYPE_ALIAS[key] ?? key;
  return TYPES.byFamily[k] ?? TYPES.byApp[k] ?? null;
}

/* Makers that take a picture theme and show it off: the shelf of a theme page. */
const THEME_SHELF = ['counting', 'picture-cards', 'word-search', 'bingo', 'coloring-pages', 'sorting', 'patterns', 'same-different', 'crossword', 'how-to-draw', 'mazes', 'find-the-differences'];
const hash = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };

const LEVEL_GRADES: Record<string, string[]> = {
  preschool: ['K'], kindergarten: ['K'], 'grade-1': ['G1'], 'grade-2': ['G2', 'G23'], 'grade-3': ['G3', 'G23'],
};

/** three makers for a theme or grade topic, the same ones on every render of that topic */
export function shelfMakers(axis: string, key: string, locale: string): string[] {
  if (axis === 'educational-level') {
    const grades = LEVEL_GRADES[key] ?? ['K'];
    const ranked = MAKER_IDS
      .filter((id) => makerInLocale(id, locale))
      .map((id) => ({ id, n: templatesIn(id, locale).filter((t) => grades.includes(t.grade)).length }))
      .filter((m) => m.n > 0)
      .sort((a, b) => b.n - a.n || a.id.localeCompare(b.id));
    return ranked.slice(0, 3).map((m) => m.id);
  }
  const start = hash(key) % THEME_SHELF.length;
  const out: string[] = [];
  for (let i = 0; i < THEME_SHELF.length && out.length < 3; i++) {
    const id = THEME_SHELF[(start + i * 5) % THEME_SHELF.length];
    if (!out.includes(id) && makerInLocale(id, locale)) out.push(id);
  }
  return out;
}

export interface RibbonMaker { id: string; kw: string; href: string; image: string }
export async function ribbonMaker(id: string, locale: string): Promise<RibbonMaker | null> {
  const f = await getCopyFile(locale);
  if (!f?.[id] || !makerInLocale(id, locale) || !catalogMaker(id)) return null;
  return { id, kw: f[id].kw, href: `/${locale}/worksheet-makers/${f[id].slug}`, image: `/maker-previews/${id}/${locale}/ribbon.webp` };
}
