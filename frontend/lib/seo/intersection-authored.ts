import { getTranslations } from 'next-intl/server';

/**
 * SEO RESCUE Part 2 W1 — single source of truth for "is this 2-axis topic
 * intersection genuinely unique (authored), or thin generic-template?".
 *
 * An intersection page is GENUINELY UNIQUE iff it has authored `topicProse` OR
 * `topicMeta` for the locale, keyed by the §16.7.2 sorted-axis-key convention
 * (`[k1,k2].sort().join('__')`). ~96% of the 17,670 live intersections have
 * NEITHER — they fall to the generic ICU template (`composeIntersectionDescription`)
 * and read as near-duplicates to Google (they dominate the GSC "not indexed"
 * long tail). This predicate gates: (a) the [secondary] route's noindex branch,
 * (b) sitemap shard-2 emission — so the two cannot drift. Authoring a single
 * `topicProse.<sorted>` / `topicMeta.<sorted>` key re-promotes a pair (indexed +
 * back in the sitemap) with NO code change; removing it reverts.
 *
 * Mirrors the miss-detection in the route's getIntersectionProse/getIntersectionMeta
 * (rejects both next-intl miss forms: bare-key and namespaced-path).
 */
export async function intersectionIsAuthored(
  locale: string,
  axisKey1: string,
  axisKey2: string,
): Promise<boolean> {
  const sorted = [axisKey1, axisKey2].sort().join('__');
  for (const ns of ['topicProse', 'topicMeta'] as const) {
    try {
      const t = await getTranslations({ locale, namespace: ns });
      const v = t(sorted);
      if (v && v !== sorted && v !== `${ns}.${sorted}`) return true;
    } catch {
      // namespace absent for this locale → not authored via this namespace
    }
  }
  return false;
}
