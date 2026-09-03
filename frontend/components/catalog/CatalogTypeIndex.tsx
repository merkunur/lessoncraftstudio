/**
 * CatalogTypeIndex — the A–Z index of worksheet types at the foot of the hub.
 *
 * WHAT IT REPLACES, AND WHY IT IS NOT A DUPLICATE.
 * The hub used to end in three stacked chip walls ("Browse by exercise type",
 * "by theme", "by level"). Two of those were pure duplication — every theme and
 * every level link now lives permanently in the filter rail, so deleting them
 * loses nothing. This one is not: its links go to `/<locale>/topic/<slug>/`,
 * a DIFFERENT page class from the rail's `?type=` filter, with its own prose,
 * FAQ, cross-axis pivots and OG image. Those links exist nowhere else on the
 * page, so they keep a real, visible, headed section.
 *
 * WHY A–Z RATHER THAN GROUPED BY SUBJECT.
 * Grouping 71 types into subject columns produces cells of 31 / 22 / 9 / 9: the
 * Math column runs 700px down while two others stop after nine, leaving most of
 * the section as empty ground. That ragged, two-thirds-empty block is exactly
 * what the operator rejected. A flat alphabetical list flows into four even
 * columns of eighteen and reads as what it is — an index. Subject grouping still
 * exists in the rail, where it is a browse control rather than a wall.
 *
 * No counts: they would make this read as a second, competing filter UI, and
 * they are already on every rail row.
 *
 * Plain <a>, no prefetch, no images — the crawl equity of the old wall at a
 * fraction of the request budget. Server-rendered and i18n-context-free.
 */

export interface TypeIndexItem {
  key: string;
  label: string;
  href: string;
}

export function CatalogTypeIndex({
  heading,
  items,
}: {
  heading: string;
  items: TypeIndexItem[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-14 md:mt-16 pt-7 border-t border-lcs-teal/15" aria-labelledby="worksheet-type-index">
      {/* No count line: two panels called it plumbing rather than a benefit
          ("each with its own page" describes our routing), and it carried a
          plural bug at count = 1. The heading plus the visible list already
          says how much there is. */}
      <h2 id="worksheet-type-index" className="font-lcsDisplay font-bold text-xl md:text-2xl text-lcs-teal mb-5">
        {heading}
      </h2>
      {/* CSS columns balance the height automatically, which is the whole point:
          a grid of per-subject cells cannot, and that is what looked broken. */}
      <ul className="list-none m-0 p-0 columns-2 sm:columns-3 lg:columns-4 gap-x-8">
        {items.map((t) => (
          <li key={t.key} className="break-inside-avoid">
            <a
              href={t.href}
              className="block py-1 font-lcsBody text-[0.82rem] font-semibold text-lcs-teal/85 hover:text-lcs-coral-deep transition-colors"
            >
              {t.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CatalogTypeIndex;
