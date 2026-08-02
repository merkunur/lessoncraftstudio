// Shared data + builder for the platform header's category nav.
//
// Consumed by:
//   - frontend/components/layout/CategoryNav.tsx (desktop nav row)
//   - frontend/components/layout/MobileCategoryAccordion.tsx (mobile drawer)
//
// Lifted out of CategoryNav per the mobile-nav fix: extracting the data
// keeps a single source of truth so the mobile accordion renders the exact
// same 6 categories + items + browse-all links as the desktop dropdowns,
// in the same order, with the same per-locale labels and the same
// availability filtering against topics-taxonomy.json. CategoryNav's render
// output is unchanged by this extraction.

// ⚠ THIS MODULE IS IMPORTED BY CLIENT COMPONENTS. It must not import
// `@/lib/manipulatives` (554KB) or `@/config/topics-taxonomy.json` (189KB) —
// it did until 2026-08-02, and both were therefore compiled into
// `app/[locale]/layout-*.js`, which loads on EVERY route in EVERY language.
// That chunk measured 727KB, ~684KB of it these two files, carrying eleven
// languages of every tool description to read `id` + `title[locale]`.
// `description` alone was 478KB and is never read on the client.
//
// Everything large now arrives as a PROP resolved in a Server Component —
// the same discipline already applied to `toolSlugs` and `makerSlugs` below.
// Taxonomy resolution lives in `@/lib/category-nav-taxonomy` (server-only).

/** One resolved axis entry for the nav: what to show, and where it points. */
export interface AxisLabel { name: string; slug: string }
/** Keyed `<axis>:<key>` — see axisLabelKey(). */
export type AxisLabelMap = Record<string, AxisLabel>;
/** The same key can exist on two axes, so the axis is part of the lookup key. */
export function axisLabelKey(axis: 'exercise-type' | 'theme', key: string): string {
  return `${axis}:${key}`;
}
/** One tool as the nav needs it. ORDER of the array is load-bearing (crawl mesh). */
export interface ToolLabel { id: string; title: string }

// Operator-curated exercise-type anchor candidates for Worksheets +
// Interactive dropdowns. Filtered at render time against the locale's
// non-empty axis-keys per §16.6.1 substrate-honesty.
//
// `picture-path` + `sudoku` removed from canonical anchors: en uses
// per-locale aliases `picture-trail` + `picture-sudoku` (per §15.10
// cross-locale-OK + topics-taxonomy.json slug.en), and the canonical
// axis-key topic-pages return 404 because en's decks were archived at
// commit 0ad626cb.
export const WORKSHEETS_ANCHOR_CANDIDATES = [
  'addition',
  'subtraction',
  'cryptogram',
  'crossword',
  'wordsearch',
  'matching',
  'word-guess',
  'word-scramble',
  'find-and-count',
] as const;

export const INTERACTIVE_ANCHOR_CANDIDATES = [
  'matching',
  'shadow-match',
  'pattern-train',
  'bingo',
  'find-objects',
  'odd-one-out',
  'grid-match',
  'missing-pieces',
  'picture-sort',
] as const;

// Apps anchors — link to /worksheet-makers/#<app-anchor>. Doesn't depend on
// deck-availability per locale (landing-page list is static; not gated on
// published-deck-count). 6 operator-curated subset.
// Operator-curated anchor tools for the Tools ("manipulatives") dropdown —
// the ones shown in the visible popover, in this order. The remaining tools
// stay in `items` for the sr-only crawl mesh and are reachable via
// "Browse all tools". Same fixed-anchor pattern as APPS_ANCHOR_KEYS.
export const MANIPULATIVES_ANCHOR_KEYS = [
  'ten-frame',
  'number-line',
  'rekenrek',
  'learning-clock',
  'ruler',
  'letter-tiles',
  'sound-boxes',
  'class-timer',
] as const;

/** How many tools the visible Tools popover shows (see CategoryDropdown.visibleCount). */
export const MANIPULATIVES_VISIBLE_COUNT = MANIPULATIVES_ANCHOR_KEYS.length;

export const APPS_ANCHOR_KEYS = [
  'addition',
  'word-guess',
  'crossword',
  'sudoku',
  'matching',
  'big-small',
] as const;

// Theme anchor candidates for the Topics dropdown sub-items.
export const TOPICS_THEME_ANCHOR_CANDIDATES = [
  'animals',
  'food',
  'vehicles',
  'fruits',
  'birds',
  'around_the_house',
  'school',
  'weather',
  'colors',
] as const;

/* Lookups against the server-resolved map. An absent entry degrades to the
   bare axis key — exactly what the old taxonomy resolvers did when a key or
   locale was missing — so an unavailable map never empties a dropdown. */
function axisSlugFrom(labels: AxisLabelMap, key: string, axis: 'exercise-type' | 'theme'): string {
  return labels[axisLabelKey(axis, key)]?.slug ?? key;
}
function axisNameFrom(labels: AxisLabelMap, key: string, axis: 'exercise-type' | 'theme'): string {
  return labels[axisLabelKey(axis, key)]?.name ?? key;
}

// Localized labels for the Activities / Manipulatives / Topics nav entries
// + their browse-all CTAs. Promote to next-intl keys when a third consumer
// appears (currently CategoryNav desktop + MobileCategoryAccordion = 2).
export const LABELS: Record<string, {
  activities: string;
  manipulatives: string;
  topics: string;
  browseAllActivities: string;
  browseAllManipulatives: string;
  browseAllTopics: string;
}> = {
  en: { activities: 'Activities', manipulatives: 'Tools', topics: 'Topics', browseAllActivities: 'Browse all activities', browseAllManipulatives: 'Browse all tools', browseAllTopics: 'Browse all topics' },
  de: { activities: 'Aufgaben', manipulatives: 'Werkzeuge', topics: 'Themen', browseAllActivities: 'Alle Aufgaben', browseAllManipulatives: 'Alle Werkzeuge', browseAllTopics: 'Alle Themen' },
  es: { activities: 'Actividades', manipulatives: 'Herramientas', topics: 'Temas', browseAllActivities: 'Ver todas las actividades', browseAllManipulatives: 'Ver todas las herramientas', browseAllTopics: 'Ver todos los temas' },
  fr: { activities: 'Activités', manipulatives: 'Outils', topics: 'Sujets', browseAllActivities: 'Voir toutes les activités', browseAllManipulatives: 'Voir tous les outils', browseAllTopics: 'Voir tous les sujets' },
  it: { activities: 'Attività', manipulatives: 'Strumenti', topics: 'Argomenti', browseAllActivities: 'Vedi tutte le attività', browseAllManipulatives: 'Vedi tutti gli strumenti', browseAllTopics: 'Vedi tutti gli argomenti' },
  pt: { activities: 'Atividades', manipulatives: 'Ferramentas', topics: 'Tópicos', browseAllActivities: 'Ver todas as atividades', browseAllManipulatives: 'Ver todas as ferramentas', browseAllTopics: 'Ver todos os tópicos' },
  nl: { activities: 'Activiteiten', manipulatives: 'Hulpmiddelen', topics: "Onderwerpen", browseAllActivities: 'Alle activiteiten', browseAllManipulatives: 'Alle hulpmiddelen', browseAllTopics: 'Alle onderwerpen' },
  sv: { activities: 'Aktiviteter', manipulatives: 'Verktyg', topics: 'Ämnen', browseAllActivities: 'Alla aktiviteter', browseAllManipulatives: 'Alla verktyg', browseAllTopics: 'Alla ämnen' },
  da: { activities: 'Aktiviteter', manipulatives: 'Værktøjer', topics: 'Emner', browseAllActivities: 'Alle aktiviteter', browseAllManipulatives: 'Alle værktøjer', browseAllTopics: 'Alle emner' },
  no: { activities: 'Aktiviteter', manipulatives: 'Verktøy', topics: 'Emner', browseAllActivities: 'Alle aktiviteter', browseAllManipulatives: 'Alle verktøy', browseAllTopics: 'Alle emner' },
  fi: { activities: 'Tehtävät', manipulatives: 'Työkalut', topics: 'Aiheet', browseAllActivities: 'Kaikki tehtävät', browseAllManipulatives: 'Kaikki työkalut', browseAllTopics: 'Kaikki aiheet' },
};

export type CategoryKey = 'worksheets' | 'apps' | 'interactive' | 'activities' | 'manipulatives' | 'topics' | 'languages';

export interface DropdownItem {
  href: string;
  label: string;
}

export interface CategoryDropdown {
  key: CategoryKey;
  label: string;
  items: DropdownItem[];
  browseAllHref: string;
  browseAllLabel: string;
  /**
   * How many of `items` the VISIBLE popover renders. Undefined = all of them,
   * which is what every category except `manipulatives` wants (they are all
   * already 6-10 items).
   *
   * `items` itself always stays complete: CategoryNav also emits an
   * always-in-DOM sr-only <ul> of every item, and that list is the header's
   * SSR-crawlable internal-link mesh (§A.13.50). Truncating `items` to
   * shorten the menu would silently delete those links from the crawl graph —
   * so the truncation happens at RENDER, in the popover only.
   */
  visibleCount?: number;
}

export interface BuildCategoriesInput {
  locale: string;
  availableExerciseTypes?: string[];
  availableActivities?: Array<{ id: string; slug: string; title: string; code: string }>;
  availableThemes?: string[];
  // Cross-language ("Languages") category targets for this page locale (≥1 deck each).
  availableTargets?: Array<{ iso: string; slug: string; name: string; count: number }>;
  // toolKey → native-language slug for this locale, from
  // `getToolSlugMap()` in @/lib/seo/tool-content (server-side; sourced in
  // app/[locale]/layout.tsx and threaded through, like availableActivities).
  // Resolved server-side because this module is imported by CLIENT components
  // and the tool-content JSON is ~1.4 MB across 11 locales.
  toolSlugs?: Record<string, string>;
  /** makerKey -> native slug for this locale. Server-supplied, same reason as toolSlugs. */
  makerSlugs?: Record<string, string>;
  /**
   * The tool catalogue as the nav needs it: id + title in THIS locale only.
   * Server-supplied from `@/lib/manipulatives` for the same reason as
   * toolSlugs — importing it here shipped 554KB (eleven languages of every
   * description) into the client bundle of every page.
   *
   * ⚠ An ARRAY, not a map: `manipulativesItems` derives the sr-only crawl-mesh
   * link ORDER from catalogue position, so order is part of the contract.
   */
  toolLabels?: ToolLabel[];
  /**
   * Axis name+slug for the ~21 keys this nav renders, resolved for THIS locale
   * by `buildAxisLabels()` in @/lib/category-nav-taxonomy (server-only).
   * Replaces a 189KB JSON import. Keyed via axisLabelKey().
   */
  axisLabels?: AxisLabelMap;
  // Translator for the 'nav.categories' namespace. Accepts a key, returns
  // the localized string. CategoryNav and MobileCategoryAccordion both pass
  // `useTranslations('nav.categories')` directly.
  t: (key: string) => string;
}

// Build the canonical 6-category dropdown list, in display order, with
// the same per-locale availability filtering and label resolution
// CategoryNav has used since the dropdown nav shipped. Both desktop and
// mobile renderers consume this; do not duplicate the logic anywhere else.
export function buildCategories({
  locale,
  availableExerciseTypes = [],
  availableActivities = [],
  availableThemes = [],
  availableTargets = [],
  toolSlugs = {},
  makerSlugs = {},
  toolLabels = [],
  axisLabels = {},
  t,
}: BuildCategoriesInput): CategoryDropdown[] {
  const labels = LABELS[locale] || LABELS.en;

  // Per-locale availability filter for exercise-type-bearing dropdowns.
  const availSet = new Set(availableExerciseTypes);
  const filterByAvail = (candidates: readonly string[]): string[] => {
    if (availSet.size === 0) return candidates.slice(0, 6); // fallback
    return candidates.filter(k => availSet.has(k)).slice(0, 6);
  };

  const worksheetsKeys = filterByAvail(WORKSHEETS_ANCHOR_CANDIDATES);
  const interactiveKeys = filterByAvail(INTERACTIVE_ANCHOR_CANDIDATES);

  // "Browse all" for both Worksheets + Interactive dropdowns lands on the
  // localized /[locale]/worksheets/ catalog hub. Previously linked to the
  // first available topic page; the hub became authoritative once
  // /[locale]/worksheets/ chrome was localized in all 11 languages.
  const browseAllWorksheetsHref = `/${locale}/worksheets/`;

  const worksheetsItems: DropdownItem[] = worksheetsKeys.map(key => ({
    href: `/${locale}/topic/${axisSlugFrom(axisLabels, key, 'exercise-type')}/`,
    label: axisNameFrom(axisLabels, key, 'exercise-type'),
  }));
  const interactiveItems: DropdownItem[] = interactiveKeys.map(key => ({
    href: `/${locale}/topic/${axisSlugFrom(axisLabels, key, 'exercise-type')}/`,
    label: axisNameFrom(axisLabels, key, 'exercise-type'),
  }));
  // Worksheet-creator items point at the per-maker landing, not a hub fragment.
  // These were `/worksheet-makers/#<key>` anchors; a fragment is not a separate URL,
  // so every one of these sitewide nav links resolved to the same hub page while the
  // 33 maker landings — the highest commercial-intent pages on the site — received no
  // nav link at all. Same shape (and same reasoning) as `manipulativesItems` below.
  //
  // `makerSlugs` is server-supplied (see BuildCategoriesInput): this module is consumed
  // by client components and must not import the ~1.4 MB maker-content JSON. An empty
  // map (server data unavailable) falls back to the original fragment link, so the
  // dropdown degrades to its previous behaviour rather than emptying or 404ing.
  const hasMakerSlugs = Object.keys(makerSlugs).length > 0;
  const appsItems: DropdownItem[] = APPS_ANCHOR_KEYS.map(key => {
    const label = axisNameFrom(axisLabels, key, 'exercise-type');
    const slug = hasMakerSlugs ? makerSlugs[key] : undefined;
    return {
      href: slug ? `/${locale}/tools/${slug}` : `/${locale}/worksheet-makers/#${key}`,
      label,
    };
  });

  // Surface a broader sitewide set of activity links (was 6) — the full
  // crawlable index lives on /[locale]/activities, but a wider dropdown gives
  // more activities a persistent, every-page internal link.
  const activitiesItems: DropdownItem[] = availableActivities.slice(0, 10).map(a => ({
    href: `/${locale}/activities/${a.slug}/`,
    label: a.title,
  }));

  // Each tool links to its OWN landing page (/[locale]/tools/<native-slug>/),
  // not to the index. Until 2026-07-30 every entry here emitted the constant
  // `/[locale]/tools/`, so the nav shipped 38 correct labels behind 38
  // identical hrefs on every page of the site — the per-tool pages existed and
  // were in the sitemap, but the site's biggest internal-link surface pointed
  // none of its equity at them.
  //
  // `toolSlugs` is server-supplied (see BuildCategoriesInput): this module is
  // consumed by client components and must not import the tool-content JSON.
  // A tool absent from the map is OMITTED rather than English-fallback'd —
  // `heart-words` genuinely has no `fi` slug and its fi URL would 410. Mirrors
  // the skip in app/[locale]/tools/page.tsx.
  //
  // Empty map (server data unavailable, or a caller that doesn't render this
  // category) falls back to the index link so the dropdown never empties.
  const hasToolSlugs = Object.keys(toolSlugs).length > 0;
  const toolItem = (m: ToolLabel): DropdownItem[] => {
    const label = m.title;
    if (!hasToolSlugs) return [{ href: `/${locale}/tools/`, label }];
    const slug = toolSlugs[m.id];
    if (!slug) return [];
    return [{ href: `/${locale}/tools/${slug}`, label }];
  };
  // Anchors first, then the rest. `items` stays complete (the sr-only crawl
  // mesh needs all 40); MANIPULATIVES_VISIBLE_COUNT caps what the popover
  // shows so Tools matches the 6-10-item shape of every other category
  // instead of unrolling the whole catalogue into a w-64 column.
  // `toolLabels` preserves catalogue order (see BuildCategoriesInput), so the
  // anchors-then-rest split below produces the identical link order it always
  // has. An empty array (server data unavailable) yields no tool items, the
  // same degrade path as an absent tool from `toolSlugs`.
  const anchorSet = new Set<string>(MANIPULATIVES_ANCHOR_KEYS);
  const manipulativesItems: DropdownItem[] = [
    ...MANIPULATIVES_ANCHOR_KEYS
      .map(key => toolLabels.find(m => m.id === key))
      .filter((m): m is ToolLabel => Boolean(m))
      .flatMap(toolItem),
    ...toolLabels.filter(m => !anchorSet.has(m.id)).flatMap(toolItem),
  ];

  const themeAvailSet = new Set(availableThemes);
  const topicsKeys = (themeAvailSet.size === 0
    ? TOPICS_THEME_ANCHOR_CANDIDATES.slice(0, 6)
    : TOPICS_THEME_ANCHOR_CANDIDATES.filter(k => themeAvailSet.has(k)).slice(0, 6)
  );
  const topicsItems: DropdownItem[] = topicsKeys.map(key => ({
    href: `/${locale}/topic/${axisSlugFrom(axisLabels, key, 'theme')}/`,
    label: axisNameFrom(axisLabels, key, 'theme'),
  }));

  // Cross-language "Languages" category — only when this locale has cross-language decks.
  const languagesItems: DropdownItem[] = availableTargets.slice(0, 6).map(tg => ({
    href: `/${locale}/learn/${tg.slug}/`,
    label: tg.name,
  }));

  const cats: CategoryDropdown[] = [
    {
      key: 'worksheets',
      label: t('worksheets'),
      items: worksheetsItems,
      browseAllHref: browseAllWorksheetsHref,
      browseAllLabel: t('browseAll.worksheets'),
    },
    {
      key: 'activities',
      label: labels.activities,
      items: activitiesItems,
      browseAllHref: `/${locale}/activities/`,
      browseAllLabel: labels.browseAllActivities,
    },
    {
      key: 'manipulatives',
      label: labels.manipulatives,
      items: manipulativesItems,
      browseAllHref: `/${locale}/tools/`,
      browseAllLabel: labels.browseAllManipulatives,
      visibleCount: MANIPULATIVES_VISIBLE_COUNT,
    },
    {
      key: 'topics',
      label: labels.topics,
      items: topicsItems,
      browseAllHref: `/${locale}/topic/`,
      browseAllLabel: labels.browseAllTopics,
    },
    {
      key: 'apps',
      label: t('apps'),
      items: appsItems,
      browseAllHref: `/${locale}/worksheet-makers/`,
      browseAllLabel: t('browseAll.apps'),
    },
    {
      key: 'interactive',
      label: t('interactive'),
      items: interactiveItems,
      browseAllHref: browseAllWorksheetsHref,
      browseAllLabel: t('browseAll.interactive'),
    },
  ];

  // Insert "Languages" after Topics (index 3) when there are cross-language decks.
  if (languagesItems.length > 0) {
    cats.splice(4, 0, {
      key: 'languages',
      label: t('languages'),
      items: languagesItems,
      browseAllHref: `/${locale}/learn/`,
      browseAllLabel: t('browseAll.languages'),
    });
  }

  return cats;
}
