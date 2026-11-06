/**
 * The new worksheet makers' landing pages: /<locale>/worksheet-makers/<native-slug> (one per maker × language; 647,
 * Cursive has no sv / fi page: operator 2026-11-06).
 *
 * Data, all committed so a page never depends on what the server can read at render time:
 *   lib/makers/landing-catalog.json              makers, their templates, grades, showcase picks (build-catalog.js)
 *   content/maker-landings/copy.<loc>.json       the page's own native copy per maker (slug, keyword, lead, …)
 *   content/maker-landings/templates.<loc>.json  every template's native title + instruction (from the maker build)
 *   content/maker-landings/ui.<loc>.json         the shared page strings
 *
 * The maker link opens the maker IN THE PAGE'S LANGUAGE (operator 2026-11-06): /makers/app/?maker=<id>&lang=<loc>, and a
 * template's card adds &t=<template>. scripts/makers/gates/landings.js asserts both on every rendered page.
 */
import catalogJson from './landing-catalog.json';
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { buildHreflangAlternates } from '@/lib/seo/hreflang';

export interface CatalogTemplate { id: string; grade: string; screen: boolean; key: boolean; themed: boolean; levels: number; locales?: string[] }
export interface CatalogMaker {
  group: string;
  locales?: string[];
  oldApps: string[];
  families: string[];
  templates: CatalogTemplate[];
  showcase: Record<string, string[]>;
}
const CATALOG = (catalogJson as unknown as { makers: Record<string, CatalogMaker> }).makers;
export const MAKER_IDS = Object.keys(CATALOG);

export interface MakerCopy {
  /** the keyword phrase: the H1, the slug's source and the start of the title */
  kw: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  /** what the children practise, short lines */
  teaches: string[];
  /** a classroom moment, one or two sentences */
  moment: string;
}
export type CopyFile = Record<string, MakerCopy>;
export type TemplateFile = Record<string, Record<string, [string, string]>>;
export type UiFile = Record<string, string>;

const cache = new Map<string, unknown>();
async function load<T>(key: string, importer: () => Promise<{ default: unknown }>): Promise<T | null> {
  if (cache.has(key)) return cache.get(key) as T;
  try {
    const mod = await importer();
    cache.set(key, mod.default);
    return mod.default as T;
  } catch {
    cache.set(key, null);
    return null;
  }
}
export const getCopyFile = (l: string) => load<CopyFile>(`copy.${l}`, () => import(`@/content/maker-landings/copy.${l}.json`));
export const getTemplateFile = (l: string) => load<TemplateFile>(`tpl.${l}`, () => import(`@/content/maker-landings/templates.${l}.json`));
export const getUi = (l: string) => load<UiFile>(`ui.${l}`, () => import(`@/content/maker-landings/ui.${l}.json`));

export function catalogMaker(id: string): CatalogMaker | null { return CATALOG[id] ?? null; }

/** does this maker ship in this language? (Cursive: no sv / fi) */
export function makerInLocale(id: string, locale: string): boolean {
  const m = CATALOG[id];
  return !!m && (!m.locales || m.locales.includes(locale));
}

export function templatesIn(id: string, locale: string): CatalogTemplate[] {
  const m = CATALOG[id];
  return m ? m.templates.filter((t) => !t.locales || t.locales.includes(locale)) : [];
}

export async function resolveLandingSlug(slug: string, locale: string): Promise<string | null> {
  const f = await getCopyFile(locale);
  if (!f) return null;
  for (const id of MAKER_IDS) if (f[id]?.slug === slug && makerInLocale(id, locale)) return id;
  return null;
}

export async function landingPath(id: string, locale: string): Promise<string | null> {
  const f = await getCopyFile(locale);
  const c = f?.[id];
  return c && makerInLocale(id, locale) ? `/${locale}/worksheet-makers/${c.slug}` : null;
}

export async function listLandingEntries(): Promise<Array<{ id: string; locale: string; slug: string }>> {
  const out: Array<{ id: string; locale: string; slug: string }> = [];
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const f = await getCopyFile(locale);
    if (!f) continue;
    for (const id of MAKER_IDS) if (f[id] && makerInLocale(id, locale)) out.push({ id, locale, slug: f[id].slug });
  }
  return out;
}

export async function landingLocales(id: string): Promise<string[]> {
  const out: string[] = [];
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const f = await getCopyFile(locale);
    if (f?.[id] && makerInLocale(id, locale)) out.push(locale);
  }
  return out;
}

export async function hreflangForLanding(id: string, baseUrl: string): Promise<Record<string, string>> {
  const slugs = new Map<string, string>();
  for (const locale of await landingLocales(id)) {
    const f = await getCopyFile(locale);
    slugs.set(locale, f![id].slug);
  }
  return buildHreflangAlternates(TOPIC_ENABLED_LOCALES, (l) => (slugs.has(l) ? `${baseUrl}/${l}/worksheet-makers/${slugs.get(l)}` : null));
}

/** the makers' native names (frontend/messages/makers/<loc>.json, already reviewed for the maker screen) */
export async function makerNames(locale: string): Promise<Record<string, string>> {
  const f = await load<{ makers: Record<string, string> }>(`names.${locale}`, () => import(`@/messages/makers/${locale}.json`));
  return f?.makers ?? {};
}

/** the maker itself, in this language; a template's card adds its id */
export function makerAppUrl(id: string, locale: string, template?: string): string {
  const q = new URLSearchParams({ maker: id, lang: locale });
  if (template) q.set('t', template);
  return `/makers/app/?${q.toString()}`;
}

/** stable, indexable preview paths (scripts/makers/landing/build-previews.js + build-compositions.js) */
export const previewUrl = (id: string, locale: string, template: string) => `/maker-previews/${id}/${locale}/${template}.webp`;
export const ogUrl = (id: string, locale: string) => `/maker-previews/${id}/${locale}/og.jpg`;
export const appShotUrl = (id: string, locale: string) => `/maker-previews/${id}/${locale}/app.webp`;

/** the grade bands shown on a page, in order; a template's band is its `grade` */
export const GRADE_ORDER = ['K', 'G1', 'G2', 'G23', 'G3'] as const;

/** the hub's subject shelves and related-maker neighbours: a teacher's subjects, not the build's `group` (math alone holds 28) */
export const HUB_GROUPS: Array<{ key: string; makers: string[] }> = [
  { key: 'numbers', makers: ['counting', 'ten-frames', 'number-sequences', 'number-lines', 'number-bonds', 'compare-numbers', 'odd-even', 'place-value', 'number-of-the-day', 'ordinal-numbers', 'number-tracing'] },
  { key: 'operations', makers: ['addition-subtraction', 'doubles-halves', 'multiplication-division', 'word-problems', 'fractions'] },
  { key: 'measure', makers: ['money', 'telling-time', 'calendar', 'measurement', 'graphs-data'] },
  { key: 'shapes', makers: ['shapes-geometry', 'symmetry-grids', 'maps-grids', 'patterns', 'tangram'] },
  { key: 'reading', makers: ['alphabet', 'phonics', 'rhyming', 'syllables', 'sight-words', 'reading', 'sentences'] },
  { key: 'words', makers: ['spelling', 'nouns-articles', 'grammar', 'word-meaning', 'picture-cards', 'stories-writing'] },
  { key: 'writing', makers: ['pre-writing', 'letter-tracing', 'word-writing', 'cursive', 'picture-tracing'] },
  { key: 'thinking', makers: ['logic-puzzles', 'same-different', 'sorting', 'position-words', 'mazes', 'find-the-differences', 'dot-to-dot', 'word-search', 'crossword', 'secret-code', 'bingo'] },
  { key: 'me', makers: ['coloring-pages', 'color-by-number', 'how-to-draw', 'me-family-feelings'] },
];
export function hubGroupOf(id: string): string {
  return HUB_GROUPS.find((g) => g.makers.includes(id))?.key ?? 'thinking';
}
export const getHubStrings = (l: string) => load<UiFile>(`hub.${l}`, () => import(`@/content/maker-landings/hub.${l}.json`));

/* What teachers look for most, from the demand harvest (docs/SEO/maker-landing-demand) and the classic pages' history. */
const NAV_FIRST = ['addition-subtraction', 'multiplication-division', 'counting', 'phonics', 'telling-time', 'word-search', 'sight-words', 'fractions', 'mazes', 'crossword'];

/** every maker's landing in this locale, popular ones first: the nav dropdown and its crawl mesh */
export async function navMakers(locale: string): Promise<Array<{ href: string; label: string }>> {
  const [f, names] = await Promise.all([getCopyFile(locale), makerNames(locale)]);
  if (!f) return [];
  const order = [...NAV_FIRST, ...MAKER_IDS.filter((id) => !NAV_FIRST.includes(id))];
  return order
    .filter((id) => f[id] && makerInLocale(id, locale))
    .map((id) => ({ href: `/${locale}/worksheet-makers/${f[id].slug}`, label: names[id] }));
}

/* The makers room: one worksheet in four languages, the visitor's own first, and real sheets from across the collection. */
const STUDIO_LANGUAGES: Record<string, string> = { en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', pt: 'Português', it: 'Italiano', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk', no: 'Norsk', fi: 'Suomi' };
const STUDIO_WALL_MAKERS = ['mazes', 'telling-time', 'word-search', 'money', 'addition-subtraction', 'fractions', 'phonics', 'shapes-geometry', 'bingo', 'dot-to-dot', 'crossword', 'graphs-data', 'how-to-draw', 'multiplication-division', 'color-by-number', 'find-the-differences'];
export function studioSheets(locale: string) {
  const order = [locale, ...['en', 'de', 'fi', 'es', 'fr'].filter((l) => l !== locale)].slice(0, 4);
  return order.map((l) => ({ src: previewUrl('counting', l, 'K-002'), language: STUDIO_LANGUAGES[l] }));
}
export function studioWall(locale: string) {
  return STUDIO_WALL_MAKERS.flatMap((id) => {
    const pick = CATALOG[id]?.showcase[locale]?.[0];
    return pick ? [previewUrl(id, locale, pick)] : [];
  });
}
