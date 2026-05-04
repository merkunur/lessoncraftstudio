import { getTranslations } from 'next-intl/server';
import { Axis, getAxisName, getAxisSlug } from '@/lib/taxonomy';
import { listRelatedNonEmptyIntersections } from '@/lib/topic-decks';

// Arc 6a — Cross-axis pivot rail. Surfaces 2-axis intersection pages
// related to the current page's axes.
//
// Single-anchor (single-axis topic page): pivots include the current axis
// crossed with every other axis. e.g. on theme=animals: (animals × any-level)
// + (animals × any-exercise-type) intersections that have ≥1 deck.
//
// Two-anchor (intersection page): pivots include OTHER intersections sharing
// exactly one axis with current. Excludes the current intersection itself.
//
// Capped at 6 per operator Q1 lock. Deck-count desc + alphabetic-by-localized-
// composite-name tiebreak. URL emission respects Arc 6c canonical axis-
// ordering convention (theme → educational-level → exercise-type) — composer
// never emits non-canonical paths even if pivot's logical axes are in
// different order.

const PIVOT_DENSITY_CAP = 6;

const AXIS_ORDER_RANK: Record<Axis, number> = {
  theme: 1,
  'educational-level': 2,
  'exercise-type': 3,
};

interface CrossAxisPivotsProps {
  locale: string;
  currentAxes: Array<{ axis: Axis; axisKey: string }>;
}

/**
 * Returns the canonical-order primary slug + secondary slug for an
 * intersection. Per Arc 6c URL-routing convention.
 */
function canonicalSlugs(
  intersection: { axis1: Axis; key1: string; axis2: Axis; key2: string },
  locale: string
): { primarySlug: string; secondarySlug: string; primaryName: string; secondaryName: string } | null {
  const rank1 = AXIS_ORDER_RANK[intersection.axis1];
  const rank2 = AXIS_ORDER_RANK[intersection.axis2];
  let primary: { axis: Axis; key: string };
  let secondary: { axis: Axis; key: string };
  if (rank1 <= rank2) {
    primary = { axis: intersection.axis1, key: intersection.key1 };
    secondary = { axis: intersection.axis2, key: intersection.key2 };
  } else {
    primary = { axis: intersection.axis2, key: intersection.key2 };
    secondary = { axis: intersection.axis1, key: intersection.key1 };
  }
  const primarySlug = getAxisSlug(primary.axis, primary.key, locale);
  const secondarySlug = getAxisSlug(secondary.axis, secondary.key, locale);
  const primaryName = getAxisName(primary.axis, primary.key, locale);
  const secondaryName = getAxisName(secondary.axis, secondary.key, locale);
  if (!primarySlug || !secondarySlug || !primaryName || !secondaryName) return null;
  return { primarySlug, secondarySlug, primaryName, secondaryName };
}

export default async function CrossAxisPivots({
  locale,
  currentAxes,
}: CrossAxisPivotsProps) {
  const t = await getTranslations({ locale, namespace: 'topicPage.crossAxis' });
  const heading = t('heading');

  const intersections = await listRelatedNonEmptyIntersections(
    currentAxes,
    locale,
    PIVOT_DENSITY_CAP
  );

  if (intersections.length === 0) return null;

  // Resolve display + slug per pivot; drop any without locale-resolved
  // names/slugs (substrate-honesty).
  const resolved = intersections
    .map(inter => {
      const canonical = canonicalSlugs(inter, locale);
      if (!canonical) return null;
      return {
        primarySlug: canonical.primarySlug,
        secondarySlug: canonical.secondarySlug,
        primaryName: canonical.primaryName,
        secondaryName: canonical.secondaryName,
        count: inter.count,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  // Per Arc 6a Phase 2 spec: deck-count desc + alphabetic-by-localized-
  // composite-name tiebreak (helper already sorts by deck-count desc; apply
  // alphabetic tiebreak when counts equal).
  resolved.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    const aName = `${a.primaryName} · ${a.secondaryName}`;
    const bName = `${b.primaryName} · ${b.secondaryName}`;
    return aName.localeCompare(bName, locale);
  });

  // Self-skip when no pivots render
  if (resolved.length === 0) return null;

  return (
    <section className="mt-12 mb-12" aria-labelledby="cross-axis-pivots-heading">
      <h2
        id="cross-axis-pivots-heading"
        className="font-display text-xl font-semibold text-ink-900 mb-4"
      >
        {heading}
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {resolved.map(p => (
          <li key={`${p.primarySlug}-${p.secondarySlug}`}>
            <a
              href={`/${locale}/topic/${p.primarySlug}/${p.secondarySlug}/`}
              className="block px-4 py-3 rounded-md bg-cream-50 border border-cream-300 hover:border-ink-700 hover:shadow-sm transition-all"
            >
              <span className="block text-sm font-medium text-ink-900">
                {p.primaryName} · {p.secondaryName}
              </span>
              <span className="block text-xs text-ink-500 mt-1">
                {p.count}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
