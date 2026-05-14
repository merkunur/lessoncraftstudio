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

interface Taxonomy {
  apps: Record<string, AppEntry>;
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
