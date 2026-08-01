/**
 * Per-tool landing-page content resolver for /<locale>/tools/<slug>/.
 *
 * The 3 free-play manipulatives (ten-frame, number-line, ruler) run as
 * standalone JS-only mini-tool shells at /mini-tools/<tool>.html (no SEO of
 * their own). This module supplies the crawlable, locale-native body for a
 * dedicated SSR landing page per tool — mirroring the activity-content
 * pattern (frontend/lib/seo/activity-content.ts): per-locale JSON files,
 * static LOADERS map, returns null for any unmapped locale.
 *
 * Content files: @/messages/tool-content/<locale>.json. Each carries the 3
 * tool entries (keyed by TOOL_KEYS) + a shared `labels` block. The per-tool
 * `slug` is the native-language URL segment (§17.4), e.g. de ten-frame →
 * "zehnerfeld", fi number-line → "lukusuora".
 */
import { TOPIC_ENABLED_LOCALES } from '@/config/topic-locales';
import { buildHreflangAlternates } from './hreflang';

/** Canonical tool keys — match the mini-tool file basenames + MANIPULATIVES ids. */
export const TOOL_KEYS = ['ten-frame', 'number-line', 'ruler', 'sound-boxes', 'blending-board', 'letter-tiles', 'calendar-wall', 'number-talk-easel', 'rekenrek', 'class-timer', 'name-sticks', 'center-board', 'learning-clock', 'place-value-lab', 'picture-word-wall', 'hush-owl', 'wodb', 'story-line', 'fraction-kitchen', 'measurement-bench', 'money-mat', 'choral-counting', 'our-day', 'heart-words', 'syllable-splitter', 'estimation-jar', 'feelings-check-in', 'letter-studio', 'open-number-line', 'part-whole-frame', 'dictation-desk', 'home-language-bridge', 'sorting-hoops', 'number-balance', 'pattern-bench', 'reading-easel', 'class-graph', 'folding-sheet', 'number-sieve', 'arrow-strip', 'draw-bag', 'lids', 'unit-handle', 'unroll-tape', 'comparison-planks', 'cold-line', 'build-plan'] as const;
export type ToolKey = (typeof TOOL_KEYS)[number];

/** Mini-tool HTML path (nginx-direct, §3.3) per tool key. */
export const TOOL_MINI_URL: Record<ToolKey, string> = {
  'ten-frame': '/mini-tools/ten-frame.html',
  'number-line': '/mini-tools/number-line.html',
  ruler: '/mini-tools/ruler.html',
  'sound-boxes': '/mini-tools/sound-boxes.html',
  'blending-board': '/mini-tools/blending-board.html',
  'letter-tiles': '/mini-tools/letter-tiles.html',
  'calendar-wall': '/mini-tools/calendar-wall.html',
  'number-talk-easel': '/mini-tools/number-talk-easel.html',
  rekenrek: '/mini-tools/rekenrek.html',
  'class-timer': '/mini-tools/class-timer.html',
  'name-sticks': '/mini-tools/name-sticks.html',
  'center-board': '/mini-tools/center-board.html',
  'learning-clock': '/mini-tools/learning-clock.html',
  'place-value-lab': '/mini-tools/place-value-lab.html',
  'picture-word-wall': '/mini-tools/picture-word-wall.html',
  'hush-owl': '/mini-tools/hush-owl.html',
  wodb: '/mini-tools/wodb.html',
  'story-line': '/mini-tools/story-line.html',
  'fraction-kitchen': '/mini-tools/fraction-kitchen.html',
  'measurement-bench': '/mini-tools/measurement-bench.html',
  'money-mat': '/mini-tools/money-mat.html',
  'choral-counting': '/mini-tools/choral-counting.html',
  'our-day': '/mini-tools/our-day.html',
  'heart-words': '/mini-tools/heart-words.html',
  'syllable-splitter': '/mini-tools/syllable-splitter.html',
  'estimation-jar': '/mini-tools/estimation-jar.html',
  'feelings-check-in': '/mini-tools/feelings-check-in.html',
  'letter-studio': '/mini-tools/letter-studio.html',
  'open-number-line': '/mini-tools/open-number-line.html',
  'part-whole-frame': '/mini-tools/part-whole-frame.html',
  'dictation-desk': '/mini-tools/dictation-desk.html',
  'home-language-bridge': '/mini-tools/home-language-bridge.html',
  'sorting-hoops': '/mini-tools/sorting-hoops.html',
  'number-balance': '/mini-tools/number-balance.html',
  'pattern-bench': '/mini-tools/pattern-bench.html',
  'reading-easel': '/mini-tools/reading-easel.html',
  'class-graph': '/mini-tools/class-graph.html',
  'folding-sheet': '/mini-tools/folding-sheet.html',
  'number-sieve': '/mini-tools/number-sieve.html',
  'arrow-strip': '/mini-tools/arrow-strip.html',
  'draw-bag': '/mini-tools/draw-bag.html',
  'lids': '/mini-tools/lids.html',
  'unit-handle': '/mini-tools/unit-handle.html',
  'unroll-tape': '/mini-tools/unroll-tape.html',
  'comparison-planks': '/mini-tools/comparison-planks.html',
  'cold-line': '/mini-tools/cold-line.html',
  'build-plan': '/mini-tools/build-plan.html',
};

/**
 * Activity-manifest `tool` field prefix per tool key — used to surface
 * "activities that use this tool". ten-frame-activity exists today; the
 * others have no activity engine yet (their strip self-skips).
 * 'sound-boxes' prefix also matches the existing 'sound-boxes-activity'
 * (RF.K.2.d) — deliberate cross-link between the tool + its activity.
 */
export const TOOL_ACTIVITY_PREFIX: Record<ToolKey, string> = {
  'ten-frame': 'ten-frame',
  'number-line': 'number-line',
  ruler: 'ruler',
  'sound-boxes': 'sound-boxes',
  'blending-board': 'blending-board',
  'letter-tiles': 'letter-tiles',
  'calendar-wall': 'calendar-wall',
  'number-talk-easel': 'number-talk-easel',
  rekenrek: 'rekenrek',
  'class-timer': 'class-timer',
  'name-sticks': 'name-sticks',
  'center-board': 'center-board',
  'learning-clock': 'learning-clock',
  'place-value-lab': 'place-value-lab',
  'picture-word-wall': 'picture-word-wall',
  'hush-owl': 'hush-owl',
  wodb: 'wodb',
  'story-line': 'story-line',
  'fraction-kitchen': 'fraction-kitchen',
  'measurement-bench': 'measurement-bench',
  'money-mat': 'money-mat',
  'choral-counting': 'choral-counting',
  'our-day': 'our-day',
  'heart-words': 'heart-words',
  'syllable-splitter': 'syllable-splitter',
  /* the K-level Wondering Jar activity is the same cognition at a smaller
     quantity band (<=20 vs 30-200) — surface it as a companion, not a rival */
  'estimation-jar': 'wondering-jar',
  'feelings-check-in': 'feelings-check-in',
  'letter-studio': 'letter-studio',
  'open-number-line': 'open-number-line',
  'part-whole-frame': 'part-whole-frame',
  'dictation-desk': 'dictation-desk',
  'home-language-bridge': 'home-language-bridge',
  'sorting-hoops': 'sorting-hoops',
  'number-balance': 'number-balance',
  'pattern-bench': 'pattern-bench',
  'reading-easel': 'reading-easel',
  'class-graph': 'class-graph',
  'folding-sheet': 'folding-sheet',
  'number-sieve': 'number-sieve',
  'arrow-strip': 'arrow-strip',
  'draw-bag': 'draw-bag',
  'lids': 'lids',
  'unit-handle': 'unit-handle',
  'unroll-tape': 'unroll-tape',
  'comparison-planks': 'comparison-planks',
  'cold-line': 'cold-line',
  'build-plan': 'build-plan',
};

/**
 * Printable worksheet exercise-types that genuinely practise what each tool
 * teaches. Powers the "More worksheets" link block on /[locale]/tools/<slug>,
 * which before 2026-07-30 linked to no worksheet at all (a crawl dead-end).
 *
 * Why hand-authored rather than derived: the obvious derivation is
 * tool → activities (TOOL_ACTIVITY_PREFIX) → CCSS code → landings, and that IS
 * used as well — but only 2 of the 38 manipulatives have activities, so it
 * covers almost nothing on its own. There is no other machine-readable link
 * between a free-play tool and an exercise type; the pairing is a pedagogical
 * judgement, so it is written down explicitly.
 *
 * OMISSION IS DELIBERATE AND MEANINGFUL. A tool absent here renders no
 * worksheets section — correct for the classroom-management and social tools
 * (class-timer, name-sticks, hush-owl, center-board, our-day,
 * feelings-check-in, home-language-bridge) and for tools whose skill no
 * printable type practises (story-line, reading-easel, calendar-wall,
 * money-mat). Do not pad this map to raise coverage: a forced pairing sends a
 * teacher to an unrelated worksheet, which is worse than no link.
 *
 * Types must be `coordinate.type` values that really exist in the landing
 * corpus; an unknown type silently yields nothing.
 */
export const TOOL_WORKSHEET_TYPES: Partial<Record<ToolKey, string[]>> = {
  // Number sense / arithmetic
  'ten-frame': ['addition', 'subtraction', 'more-less', 'chart-count'],
  'number-line': ['addition', 'subtraction', 'more-less'],
  'open-number-line': ['addition', 'subtraction'],
  rekenrek: ['addition', 'subtraction', 'more-less'],
  'part-whole-frame': ['addition', 'subtraction', 'math-puzzle'],
  'number-balance': ['addition', 'subtraction', 'math-puzzle'],
  'number-talk-easel': ['addition', 'subtraction', 'math-puzzle'],
  'place-value-lab': ['number-charts', 'addition', 'math-worksheet'],
  'choral-counting': ['number-charts', 'chart-count'],
  'estimation-jar': ['find-and-count', 'chart-count', 'more-less'],
  // Measurement / data / geometry
  ruler: ['measurement', 'big-small'],
  'measurement-bench': ['measurement', 'big-small'],
  'learning-clock': ['telling-time'],
  'fraction-kitchen': ['fractions'],
  'class-graph': ['graphing-data', 'chart-count'],
  'folding-sheet': ['geometry'],
  // Logic / classification
  'sorting-hoops': ['picture-sort', 'odd-one-out', 'grid-match'],
  wodb: ['odd-one-out', 'picture-sort'],
  'pattern-bench': ['pattern-train', 'pattern-worksheet'],
  // Literacy
  'letter-tiles': ['word-scramble', 'word-guess', 'crossword', 'alphabet-train'],
  'letter-studio': ['alphabet-train', 'word-guess'],
  'blending-board': ['word-guess', 'word-scramble', 'alphabet-train'],
  'sound-boxes': ['word-guess', 'word-scramble'],
  'syllable-splitter': ['word-scramble', 'word-guess'],
  'dictation-desk': ['word-scramble', 'crossword', 'wordsearch'],
  'heart-words': ['wordsearch', 'word-guess', 'crossword'],
  'picture-word-wall': ['matching', 'wordsearch', 'find-objects'],
};

export interface ToolEntry {
  slug: string;
  name: string;
  tagline: string;
  about: string[];
  howToUse: string[];
  classroomIdeas: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface ToolContentLabels {
  about: string;
  howToUse: string;
  classroomIdeas: string;
  relatedActivities: string;
  otherLanguages: string;
  openFullScreen: string;
  toolsBreadcrumb: string;
}

interface ToolContentFile {
  'ten-frame': ToolEntry;
  'number-line': ToolEntry;
  ruler: ToolEntry;
  /** optional so locales can ship the entry as their content lands */
  'sound-boxes'?: ToolEntry;
  'blending-board'?: ToolEntry;
  'letter-tiles'?: ToolEntry;
  'calendar-wall'?: ToolEntry;
  'number-talk-easel'?: ToolEntry;
  rekenrek?: ToolEntry;
  'class-timer'?: ToolEntry;
  'name-sticks'?: ToolEntry;
  'center-board'?: ToolEntry;
  'learning-clock'?: ToolEntry;
  'place-value-lab'?: ToolEntry;
  'picture-word-wall'?: ToolEntry;
  'hush-owl'?: ToolEntry;
  wodb?: ToolEntry;
  'story-line'?: ToolEntry;
  'fraction-kitchen'?: ToolEntry;
  'measurement-bench'?: ToolEntry;
  'money-mat'?: ToolEntry;
  'choral-counting'?: ToolEntry;
  'our-day'?: ToolEntry;
  /* Heart Words ships in TEN locales — fi has no entry by design
     (transparent orthography, no sight-word tradition). */
  'heart-words'?: ToolEntry;
  'syllable-splitter'?: ToolEntry;
  'estimation-jar'?: ToolEntry;
  'feelings-check-in'?: ToolEntry;
  'letter-studio'?: ToolEntry;
  'open-number-line'?: ToolEntry;
  'part-whole-frame'?: ToolEntry;
  'dictation-desk'?: ToolEntry;
  'home-language-bridge'?: ToolEntry;
  'sorting-hoops'?: ToolEntry;
  'number-balance'?: ToolEntry;
  'pattern-bench'?: ToolEntry;
  'reading-easel'?: ToolEntry;
  'class-graph'?: ToolEntry;
  'folding-sheet'?: ToolEntry;
  'number-sieve'?: ToolEntry;
  'arrow-strip'?: ToolEntry;
  'draw-bag'?: ToolEntry;
  'lids'?: ToolEntry;
  'unit-handle'?: ToolEntry;
  'unroll-tape'?: ToolEntry;
  'comparison-planks'?: ToolEntry;
  'cold-line'?: ToolEntry;
  'build-plan'?: ToolEntry;
  labels: ToolContentLabels;
}

/**
 * Static loader map. Add a locale here in the same commit that adds its
 * @/messages/tool-content/<locale>.json file. A static import of a missing
 * file is a build error, so only mapped locales appear; others resolve null.
 */
const LOADERS: Record<string, () => Promise<{ default: ToolContentFile }>> = {
  en: () => import('@/messages/tool-content/en.json') as unknown as Promise<{ default: ToolContentFile }>,
  de: () => import('@/messages/tool-content/de.json') as unknown as Promise<{ default: ToolContentFile }>,
  es: () => import('@/messages/tool-content/es.json') as unknown as Promise<{ default: ToolContentFile }>,
  fr: () => import('@/messages/tool-content/fr.json') as unknown as Promise<{ default: ToolContentFile }>,
  it: () => import('@/messages/tool-content/it.json') as unknown as Promise<{ default: ToolContentFile }>,
  pt: () => import('@/messages/tool-content/pt.json') as unknown as Promise<{ default: ToolContentFile }>,
  nl: () => import('@/messages/tool-content/nl.json') as unknown as Promise<{ default: ToolContentFile }>,
  sv: () => import('@/messages/tool-content/sv.json') as unknown as Promise<{ default: ToolContentFile }>,
  da: () => import('@/messages/tool-content/da.json') as unknown as Promise<{ default: ToolContentFile }>,
  no: () => import('@/messages/tool-content/no.json') as unknown as Promise<{ default: ToolContentFile }>,
  fi: () => import('@/messages/tool-content/fi.json') as unknown as Promise<{ default: ToolContentFile }>,
};

const _cache: Record<string, ToolContentFile | null> = {};

async function loadLocale(locale: string): Promise<ToolContentFile | null> {
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
    console.warn('[tool-content] failed to load', locale, (err as Error).message);
    _cache[locale] = null;
    return null;
  }
}

export interface ToolContent extends ToolEntry {
  toolKey: ToolKey;
  labels: ToolContentLabels;
}

/** Resolve a tool by its canonical key for a locale. */
export async function getToolContent(locale: string, toolKey: ToolKey): Promise<ToolContent | null> {
  const file = await loadLocale(locale);
  if (!file) return null;
  const entry = file[toolKey];
  if (!entry) return null;
  return { ...entry, toolKey, labels: file.labels };
}

/** Resolve a native-language URL slug → tool key for a locale (null if none). */
export async function resolveToolSlug(slug: string, locale: string): Promise<ToolKey | null> {
  const file = await loadLocale(locale);
  if (!file) return null;
  for (const key of TOOL_KEYS) {
    if (file[key] && file[key].slug === slug) return key;
  }
  return null;
}

/** Every (locale × tool) landing-page entry — for generateStaticParams + sitemap. */
export async function listToolSitemapEntries(): Promise<Array<{ locale: string; slug: string; toolKey: ToolKey }>> {
  const out: Array<{ locale: string; slug: string; toolKey: ToolKey }> = [];
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const file = await loadLocale(locale);
    if (!file) continue;
    for (const key of TOOL_KEYS) {
      const entry = file[key];
      if (entry && entry.slug) out.push({ locale, slug: entry.slug, toolKey: key });
    }
  }
  return out;
}

/**
 * toolKey → native-language slug for one locale (omits any tool the locale
 * doesn't declare, e.g. `heart-words` has no `fi` entry by design — see the
 * TOOL_KEYS comment above). One `loadLocale` call, so callers get the whole
 * map without 38 awaits.
 *
 * Exists so SERVER components can hand the nav its per-tool hrefs. The nav
 * data builder (`@/lib/category-nav-data`) is consumed by CLIENT components,
 * so it must never import the tool-content JSON itself (~1.4 MB across 11
 * locales). Instead `app/[locale]/layout.tsx` calls this and threads the
 * result down as a prop, the same way `availableActivities` is threaded.
 */
export async function getToolSlugMap(locale: string): Promise<Record<string, string>> {
  const file = await loadLocale(locale);
  if (!file) return {};
  const out: Record<string, string> = {};
  for (const key of TOOL_KEYS) {
    const entry = file[key];
    if (entry && entry.slug) out[key] = entry.slug;
  }
  return out;
}

/**
 * hreflang alternates for a tool across every locale where it has a slug.
 * hreflang map is the single SoT at @/lib/seo/hreflang (pt → pt-BR per §6).
 * Async because slug presence per locale comes from the loaded content files.
 */
export async function hreflangAlternatesForTool(toolKey: ToolKey, baseUrl: string): Promise<Record<string, string>> {
  const slugByLocale: Record<string, string | null> = {};
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const file = await loadLocale(locale);
    const entry = file && file[toolKey];
    slugByLocale[locale] = entry && entry.slug ? entry.slug : null;
  }
  return buildHreflangAlternates(
    TOPIC_ENABLED_LOCALES,
    (loc) => (slugByLocale[loc] ? `${baseUrl}/${loc}/tools/${slugByLocale[loc]}` : null),
    baseUrl,
  );
}

/**
 * Locales where this tool has a slug declared — the honest-filter set that
 * mirrors `hreflangAlternatesForTool`. Consumed by the tool page to build
 * `og:locale:alternate` so the OG locale set matches the hreflang set.
 */
export async function existingToolLocales(toolKey: ToolKey): Promise<string[]> {
  const out: string[] = [];
  for (const locale of TOPIC_ENABLED_LOCALES) {
    const file = await loadLocale(locale);
    const entry = file && file[toolKey];
    if (entry && entry.slug) out.push(locale);
  }
  return out;
}
