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

import topicsTaxonomy from '@/config/topics-taxonomy.json';
import { MANIPULATIVES } from '@/lib/manipulatives';

interface TaxonomySchema {
  axes: {
    'exercise-type': Record<string, { slug: Record<string, string>; name: Record<string, string> }>;
    'theme': Record<string, { slug: Record<string, string>; name: Record<string, string> }>;
    'educational-level': Record<string, { slug: Record<string, string>; name: Record<string, string> }>;
  };
}

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

export function resolveAxisSlug(
  axisKey: string,
  locale: string,
  axis: 'exercise-type' | 'theme' = 'exercise-type'
): string {
  const taxonomy = topicsTaxonomy as unknown as TaxonomySchema;
  const entry = taxonomy.axes[axis]?.[axisKey];
  return entry?.slug?.[locale] ?? entry?.slug?.en ?? axisKey;
}

export function resolveAxisName(
  axisKey: string,
  locale: string,
  axis: 'exercise-type' | 'theme' = 'exercise-type'
): string {
  const taxonomy = topicsTaxonomy as unknown as TaxonomySchema;
  const entry = taxonomy.axes[axis]?.[axisKey];
  return entry?.name?.[locale] ?? entry?.name?.en ?? axisKey;
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

export type CategoryKey = 'worksheets' | 'apps' | 'interactive' | 'activities' | 'manipulatives' | 'topics';

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
}

export interface BuildCategoriesInput {
  locale: string;
  availableExerciseTypes?: string[];
  availableActivities?: Array<{ id: string; slug: string; title: string; code: string }>;
  availableThemes?: string[];
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
    href: `/${locale}/topic/${resolveAxisSlug(key, locale)}/`,
    label: resolveAxisName(key, locale),
  }));
  const interactiveItems: DropdownItem[] = interactiveKeys.map(key => ({
    href: `/${locale}/topic/${resolveAxisSlug(key, locale)}/`,
    label: resolveAxisName(key, locale),
  }));
  const appsItems: DropdownItem[] = APPS_ANCHOR_KEYS.map(key => ({
    href: `/${locale}/worksheet-makers/#${key}`,
    label: resolveAxisName(key, locale),
  }));

  const activitiesItems: DropdownItem[] = availableActivities.slice(0, 6).map(a => ({
    href: `/${locale}/activities/${a.slug}/`,
    label: a.title,
  }));

  const manipulativesItems: DropdownItem[] = MANIPULATIVES.map(m => ({
    href: `/${locale}/tools/`,
    label: m.title[locale] ?? m.title.en,
  }));

  const themeAvailSet = new Set(availableThemes);
  const topicsKeys = (themeAvailSet.size === 0
    ? TOPICS_THEME_ANCHOR_CANDIDATES.slice(0, 6)
    : TOPICS_THEME_ANCHOR_CANDIDATES.filter(k => themeAvailSet.has(k)).slice(0, 6)
  );
  const topicsItems: DropdownItem[] = topicsKeys.map(key => ({
    href: `/${locale}/topic/${resolveAxisSlug(key, locale, 'theme')}/`,
    label: resolveAxisName(key, locale, 'theme'),
  }));

  return [
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
}
