import taxonomyData from '@/config/topics-taxonomy.json';

export type Axis = 'exercise-type' | 'theme' | 'educational-level';

interface AxisEntry {
  slug: Record<string, string>;
  name: Record<string, string>;
}

interface AppEntry {
  default_subject: string;
  default_age_range: string;
  exercise_type_axis_key: string;
}

// exercise-mode is a slug-component axis per §17.8.5, NOT a formal topic-page
// axis. Its entries may have null slug.<locale> values (name-only lookups
// supported for SEO + filter UI); use ExerciseModeEntry rather than AxisEntry.
interface ExerciseModeEntry {
  slug: Record<string, string | null>;
  name: Record<string, string | null>;
}

// Subject = a discovery BUCKET over exercise-types (math/letters/science/logic/
// spatial-reasoning). NOT a per-deck column and NOT a formal Axis — it powers the
// subject×grade hub pages (e.g. /de/topic/mathe/1-klasse) that match how teachers
// actually search (Fach×Klasse). slug+name per locale; the bucket→exercise-type
// mapping is derived from apps.*.default_subject (see exerciseTypeKeysForSubject).
interface SubjectEntry {
  slug: Record<string, string>;
  name: Record<string, string>;
}

interface Taxonomy {
  apps: Record<string, AppEntry>;
  subjects?: Record<string, SubjectEntry>;
  axes: {
    'exercise-type': Record<string, AxisEntry>;
    theme: Record<string, AxisEntry>;
    'educational-level': Record<string, AxisEntry>;
    'exercise-mode'?: Record<string, ExerciseModeEntry>;
  };
}

const taxonomy = taxonomyData as unknown as Taxonomy;

const AGE_RANGE_TO_LEVEL: Record<string, string> = {
  '3-5': 'preschool',
  '5-7': 'kindergarten',
  '6-8': 'grade-1',
  '7-9': 'grade-2',
  '8-10': 'grade-3',
};

const ALL_AXES: Axis[] = ['exercise-type', 'theme', 'educational-level'];

export function listAxisKeys(axis: Axis): string[] {
  return Object.keys(taxonomy.axes[axis]);
}

export function getAxisEntry(axis: Axis, axisKey: string): AxisEntry | null {
  return taxonomy.axes[axis][axisKey] ?? null;
}

export function getAxisSlug(axis: Axis, axisKey: string, locale: string): string | null {
  return getAxisEntry(axis, axisKey)?.slug?.[locale] ?? null;
}

export function getAxisName(axis: Axis, axisKey: string, locale: string): string | null {
  return getAxisEntry(axis, axisKey)?.name?.[locale] ?? null;
}

/**
 * Exercise-mode helpers — kept separate from the 3 formal axes.
 * Per CLAUDE.md §17.8.5 mode is a slug-component axis (not a topic-page
 * axis); these helpers expose its registry + name-lookup for the
 * topic-page filter UI per the §16.8 mode-facet extension.
 *
 * listExerciseModeKeys(): all registered mode axis-keys (used to validate
 * deck-emitted exercise_mode values before tallying into facet counts).
 *
 * getExerciseModeName(): locale-specific display name (falls back to en
 * then to the bare axis-key per the same fallback chain used in
 * scripts/publish-cli/taxonomy.js for SEO retrofit).
 */
export function listExerciseModeKeys(): string[] {
  return Object.keys(taxonomy.axes['exercise-mode'] ?? {});
}

export function getExerciseModeName(modeKey: string, locale: string): string | null {
  const entry = taxonomy.axes['exercise-mode']?.[modeKey];
  if (!entry || !entry.name) return null;
  return entry.name[locale] ?? entry.name.en ?? null;
}

export function ageRangeToLevelKey(ageRange: string): string | null {
  return AGE_RANGE_TO_LEVEL[ageRange] ?? null;
}

export function levelKeyToAgeRanges(levelKey: string): string[] {
  return Object.entries(AGE_RANGE_TO_LEVEL)
    .filter(([, key]) => key === levelKey)
    .map(([age]) => age);
}

/**
 * Reverse-lookup: given a locale and a topic slug, find which axis + axis-key it represents.
 * Returns null if the slug doesn't match any axis-key for that locale.
 */
export function resolveTopicSlug(
  slug: string,
  locale: string
): { axis: Axis; axisKey: string } | null {
  for (const axis of ALL_AXES) {
    const entries = taxonomy.axes[axis];
    for (const [axisKey, entry] of Object.entries(entries)) {
      if (entry.slug?.[locale] === slug) {
        return { axis, axisKey };
      }
    }
  }
  return null;
}

/**
 * Axis-key alias: when a URL uses the raw axis KEY instead of the locale's
 * slug (e.g. /en/topic/sudoku where the en slug is `picture-sudoku`, or any
 * non-EN locale hit with the English key), return the canonical localized slug
 * to redirect to. Returns null when the slug isn't an axis key or already IS
 * the localized slug (then resolveTopicSlug matched and no alias is needed).
 * Fixes the whole §22.2 `/en/topic/sudoku` 404 class across all 11 locales.
 */
export function resolveAxisKeyAlias(slug: string, locale: string): string | null {
  for (const axis of ALL_AXES) {
    const entry = taxonomy.axes[axis]?.[slug];
    const localized = entry?.slug?.[locale];
    if (localized && localized !== slug) {
      return localized;
    }
  }
  return null;
}

// ── Subject helpers (subject×grade hub pages) ───────────────────────────────

// Manual assignment for exercise-type axis-keys with NO apps.* entry. Only
// `picture-trail` today: the en-alias of picture-path (spatial-reasoning), a
// 60th exercise-type key not covered by the apps.*.default_subject derivation.
const SUBJECT_EXTRA_EXERCISE_TYPES: Record<string, string[]> = {
  'spatial-reasoning': ['picture-trail'],
};

export function listSubjectKeys(): string[] {
  return Object.keys(taxonomy.subjects ?? {});
}

/** URL/display slug for a subject, falling back to en (used to BUILD urls for the current locale). */
export function getSubjectSlug(subjectKey: string, locale: string): string | null {
  const e = taxonomy.subjects?.[subjectKey];
  return e?.slug?.[locale] ?? e?.slug?.en ?? null;
}

/** STRICT slug — only the locale's own entry, no en fallback (for honest hreflang + route resolution). */
export function getSubjectSlugStrict(subjectKey: string, locale: string): string | null {
  return taxonomy.subjects?.[subjectKey]?.slug?.[locale] ?? null;
}

export function getSubjectName(subjectKey: string, locale: string): string | null {
  const e = taxonomy.subjects?.[subjectKey];
  return e?.name?.[locale] ?? e?.name?.en ?? null;
}

/** Reverse-lookup: does this slug (in this locale) name a subject? Strict — no en fallback. */
export function resolveSubjectSlug(slug: string, locale: string): { subjectKey: string } | null {
  const subjects = taxonomy.subjects ?? {};
  for (const [subjectKey, entry] of Object.entries(subjects)) {
    if (entry.slug?.[locale] === slug) return { subjectKey };
  }
  return null;
}

/** The set of exercise-type axis-keys that make up a subject bucket. */
export function exerciseTypeKeysForSubject(subjectKey: string): string[] {
  const fromApps = Object.values(taxonomy.apps)
    .filter((a) => a.default_subject === subjectKey)
    .map((a) => a.exercise_type_axis_key);
  const extra = SUBJECT_EXTRA_EXERCISE_TYPES[subjectKey] ?? [];
  return Array.from(new Set([...fromApps, ...extra]));
}
