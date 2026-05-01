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

interface Taxonomy {
  apps: Record<string, AppEntry>;
  axes: {
    'exercise-type': Record<string, AxisEntry>;
    theme: Record<string, AxisEntry>;
    'educational-level': Record<string, AxisEntry>;
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
