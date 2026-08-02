// SERVER-ONLY taxonomy resolution for the category nav.
//
// ⚠ THIS MODULE IMPORTS A 189KB JSON. NEVER IMPORT IT FROM A CLIENT COMPONENT.
//
// It exists because `category-nav-data.ts` used to hold these two resolvers and
// therefore imported `topics-taxonomy.json` at module scope — and that module is
// consumed by three CLIENT components (CategoryNav, MobileCategoryAccordion,
// FooterCategoryDropdowns). The taxonomy was consequently compiled into
// `app/[locale]/layout-*.js`, which loads on EVERY route in EVERY language.
// Measured 2026-08-02: that chunk was 727KB, of which this file was ~119KB
// minified — carrying 100 themes, 60 exercise-types, 51 exercise-modes and four
// `$comment_*` prose blocks, to resolve about twenty keys in one locale.
//
// The resolvers themselves have genuine SERVER consumers (BrowseByTopicSSR,
// learn/_shared), which is why they were moved here rather than deleted. The
// client now receives a pre-resolved `axisLabels` map as a prop — same
// discipline already applied to `toolSlugs` and `makerSlugs`.

import topicsTaxonomy from '@/config/topics-taxonomy.json';
import {
  WORKSHEETS_ANCHOR_CANDIDATES,
  INTERACTIVE_ANCHOR_CANDIDATES,
  APPS_ANCHOR_KEYS,
  TOPICS_THEME_ANCHOR_CANDIDATES,
  type AxisLabelMap,
  axisLabelKey,
} from '@/lib/category-nav-data';

interface TaxonomySchema {
  axes: {
    'exercise-type': Record<string, { slug: Record<string, string>; name: Record<string, string> }>;
    'theme': Record<string, { slug: Record<string, string>; name: Record<string, string> }>;
    'educational-level': Record<string, { slug: Record<string, string>; name: Record<string, string> }>;
  };
}

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

/**
 * Resolve exactly the axis keys the category nav renders, for ONE locale.
 * ~21 keys, ~2KB — versus the 189KB the client used to import to read them.
 *
 * Keyed `<axis>:<key>` because the same key can exist on more than one axis
 * (`matching` is an exercise-type; a theme could share a name), and collapsing
 * them into one namespace would silently resolve a theme against an
 * exercise-type entry.
 *
 * Call this in a Server Component and pass the result to `buildCategories`.
 */
export function buildAxisLabels(locale: string): AxisLabelMap {
  const out: AxisLabelMap = {};
  const add = (key: string, axis: 'exercise-type' | 'theme') => {
    out[axisLabelKey(axis, key)] = {
      name: resolveAxisName(key, locale, axis),
      slug: resolveAxisSlug(key, locale, axis),
    };
  };
  for (const k of WORKSHEETS_ANCHOR_CANDIDATES) add(k, 'exercise-type');
  for (const k of INTERACTIVE_ANCHOR_CANDIDATES) add(k, 'exercise-type');
  for (const k of APPS_ANCHOR_KEYS) add(k, 'exercise-type');
  for (const k of TOPICS_THEME_ANCHOR_CANDIDATES) add(k, 'theme');
  return out;
}
