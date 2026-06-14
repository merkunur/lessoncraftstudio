/**
 * Per-maker landing-page content resolver for /<locale>/tools/<slug>/.
 *
 * SEO RESCUE — Part 1. The worksheet-generator "maker" landing pages
 * (cryptogram-maker, word-search-maker, sudoku-maker, …) were the site's
 * single biggest organic-traffic source before the pivot 410'd them
 * (GSC ground-truth 2026-06-14). We rebuild them at their ORIGINAL ranked
 * URLs under `/tools/<native-slug>` — reusing the proven tool-landing pattern
 * (frontend/lib/seo/tool-content.ts) — so previously-410 URLs return 200 and
 * Google recrawls/recovers them.
 *
 * Differences from tool-content.ts (the manipulatives):
 *  - The interactive widget is a full worksheet generator (a heavy Fabric.js
 *    app at /worksheet-generators/<htmlFile>), NOT a small embeddable mini-tool.
 *    So the landing carries a LAUNCH BUTTON (operator-ruled), not an iframe.
 *  - JSON-LD is WebApplication (a tool), not LearningResource/Manipulative.
 *  - Copy is teacher-framed — NO Etsy/KDP/"sell your printables" language
 *    (that seller positioning stays dead, CLAUDE.md §7/§17.1).
 *
 * Content files: @/messages/maker-content/<locale>.json. Each carries the
 * maker entries (keyed by MAKER_KEYS) + a shared `labels` block. The per-maker
 * `slug` is the native-language URL segment (§17.4), recovered verbatim from
 * the pre-pivot tool-page-slugs.ts so the exact ranked URLs are restored.
 */
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { buildHreflangAlternates } from './hreflang';

/**
 * Canonical maker keys — match the products.ts ALL_APPS ids of the worksheet
 * generators we expose as public SEO landings. Pilot (Phase 1a) = the 6
 * demand-proven generators. Phase 1b extends this set.
 */
export const MAKER_KEYS = [
  'cryptogram',
  'wordsearch',
  'sudoku',
  'crossword',
  'find-objects',
  'word-guess',
] as const;
export type MakerKey = (typeof MAKER_KEYS)[number];

/**
 * Generator HTML file per maker key (served by nginx at
 * /worksheet-generators/<htmlFile>, §A.1). Mirrors products.ts ALL_APPS.htmlFile.
 * The landing's launch button opens this with ?lang=<locale>.
 */
export const MAKER_GENERATOR_HTML: Record<MakerKey, string> = {
  cryptogram: 'cryptogram.html',
  wordsearch: 'wordsearch.html',
  sudoku: 'sudoku.html',
  crossword: 'crossword.html',
  'find-objects': 'find-objects.html',
  'word-guess': 'word-guess.html',
};

/** Public URL of the generator a maker launches. */
export function makerGeneratorUrl(makerKey: MakerKey, locale: string): string {
  return `/worksheet-generators/${MAKER_GENERATOR_HTML[makerKey]}?lang=${encodeURIComponent(locale)}`;
}

export interface MakerEntry {
  slug: string;
  name: string;
  tagline: string;
  about: string[];
  howToUse: string[];
  classroomIdeas: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface MakerContentLabels {
  about: string;
  howToUse: string;
  classroomIdeas: string;
  /** Launch-button text; "{name}" is interpolated by the page. */
  launchCta: string;
  otherLanguages: string;
  relatedMakers: string;
  makersBreadcrumb: string;
}

type MakerContentFile = Record<MakerKey, MakerEntry> & { labels: MakerContentLabels };

/**
 * Static loader map. Add a locale here in the same commit that adds its
 * @/messages/maker-content/<locale>.json file. Phase 1a ships en + the 5
 * proven-CTR locales; Phase 1b adds the rest. Unmapped locales resolve null.
 */
const LOADERS: Record<string, () => Promise<{ default: MakerContentFile }>> = {
  en: () => import('@/messages/maker-content/en.json') as unknown as Promise<{ default: MakerContentFile }>,
  de: () => import('@/messages/maker-content/de.json') as unknown as Promise<{ default: MakerContentFile }>,
  es: () => import('@/messages/maker-content/es.json') as unknown as Promise<{ default: MakerContentFile }>,
  it: () => import('@/messages/maker-content/it.json') as unknown as Promise<{ default: MakerContentFile }>,
  nl: () => import('@/messages/maker-content/nl.json') as unknown as Promise<{ default: MakerContentFile }>,
  sv: () => import('@/messages/maker-content/sv.json') as unknown as Promise<{ default: MakerContentFile }>,
};

const _cache: Record<string, MakerContentFile | null> = {};

async function loadLocale(locale: string): Promise<MakerContentFile | null> {
  if (locale in _cache) return _cache[locale];
  const loader = LOADERS[locale];
  if (!loader) {
    _cache[locale] = null;
    return null;
  }
  try {
    const mod = await loader();
    _cache[locale] = mod.default;
    return mod.default;
  } catch (err) {
    console.warn('[maker-content] failed to load', locale, (err as Error).message);
    _cache[locale] = null;
    return null;
  }
}

export interface MakerContent extends MakerEntry {
  makerKey: MakerKey;
  labels: MakerContentLabels;
}

/** Resolve a maker by its canonical key for a locale. */
export async function getMakerContent(locale: string, makerKey: MakerKey): Promise<MakerContent | null> {
  const file = await loadLocale(locale);
  if (!file) return null;
  const entry = file[makerKey];
  if (!entry) return null;
  return { ...entry, makerKey, labels: file.labels };
}

/** Resolve a native-language URL slug → maker key for a locale (null if none). */
export async function resolveMakerSlug(slug: string, locale: string): Promise<MakerKey | null> {
  const file = await loadLocale(locale);
  if (!file) return null;
  for (const key of MAKER_KEYS) {
    if (file[key] && file[key].slug === slug) return key;
  }
  return null;
}

/** Every (locale × maker) landing-page entry — for generateStaticParams + sitemap. */
export async function listMakerSitemapEntries(): Promise<Array<{ locale: string; slug: string; makerKey: MakerKey }>> {
  const out: Array<{ locale: string; slug: string; makerKey: MakerKey }> = [];
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const file = await loadLocale(locale);
    if (!file) continue;
    for (const key of MAKER_KEYS) {
      const entry = file[key];
      if (entry && entry.slug) out.push({ locale, slug: entry.slug, makerKey: key });
    }
  }
  return out;
}

/**
 * hreflang alternates for a maker across every locale where it has a slug.
 * hreflang map is the single SoT at @/lib/seo/hreflang (pt → pt-BR per §6).
 */
export async function hreflangAlternatesForMaker(makerKey: MakerKey, baseUrl: string): Promise<Record<string, string>> {
  const slugByLocale: Record<string, string | null> = {};
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const file = await loadLocale(locale);
    const entry = file && file[makerKey];
    slugByLocale[locale] = entry && entry.slug ? entry.slug : null;
  }
  return buildHreflangAlternates(
    TOPIC_ENABLED_LOCALES,
    (loc) => (slugByLocale[loc] ? `${baseUrl}/${loc}/tools/${slugByLocale[loc]}` : null),
    baseUrl,
  );
}

/** Locales where this maker has a slug — honest OG-locale set (mirrors hreflang). */
export async function existingMakerLocales(makerKey: MakerKey): Promise<string[]> {
  const out: string[] = [];
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const file = await loadLocale(locale);
    const entry = file && file[makerKey];
    if (entry && entry.slug) out.push(locale);
  }
  return out;
}
