/**
 * ToolCatalogCard — the card for the /[locale]/tools hub.
 *
 * Deliberately the same object as ActivityCatalogCard: the .actcat-card paper
 * surface, a 4:3 category-tinted panel with a saturated top edge band, a
 * 2-line-clamped Baloo 2 title, a chip row, and a coral Try-it pinned to the
 * bottom. The tools hub and the activities hub are siblings and should read as
 * one system; before this the tools hub was text-only cards on the legacy
 * palette while activities had moved to Direction A.
 *
 * Two honest differences from the activity card:
 *  - there is no chip row. Activities carry a grade pill + CCSS code; tools
 *    are free-play apparatus with no grade and no standard by design (§23.2),
 *    and inventing either to fill the slot would be a lie on the page.
 *  - the sub-label is the tool's own tagline rather than a strand name.
 *
 * The thumbnail is a real screenshot of the tool's apparatus, rendered by
 * scripts/generate-tool-previews.js. Falls back to ActivityGlyph on a tinted
 * coin when a preview is missing, so a newly-shipped tool never renders a
 * broken image.
 *
 * Presentational + server-rendered: every string is passed in already
 * localized, so this file needs no i18n context.
 */
import Link from 'next/link';
import ActivityGlyph from '@/components/activities/ActivityGlyph';
import { TOOL_CATEGORY_STYLE, type ToolCategory } from '@/lib/tool-categories';

export interface ToolCatalogCardProps {
  href: string;
  /** tool key — doubles as the ActivityGlyph engine key when one matches */
  toolKey: string;
  category: ToolCategory;
  title: string;
  tagline: string;
  tryItLabel: string;
  /** real rendered preview of the tool's apparatus */
  previewUrl?: string;
}

export default function ToolCatalogCard({
  href,
  toolKey,
  category,
  title,
  tagline,
  tryItLabel,
  previewUrl,
}: ToolCatalogCardProps) {
  const s = TOOL_CATEGORY_STYLE[category];
  return (
    // prefetch={false}: 40 cards × viewport _rsc prefetch rides the nginx
    // per-IP burst (zone=lcsperip burst=40) and starves the page's own
    // requests — same reason the activities grid disables it.
    <Link
      href={href}
      prefetch={false}
      className="actcat-card group flex flex-col rounded-3xl p-3.5 md:p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-lcs-cream"
    >
      <div className={`relative overflow-hidden rounded-2xl ${s.panel} aspect-[4/3] mb-3.5`}>
        <span className={`absolute left-0 right-0 top-0 z-10 h-1.5 ${s.edge}`} aria-hidden="true" />
        {previewUrl ? (
          // Plain eager <img>: the webp is pre-sized (480×360) and tiny; eager
          // load avoids the lazy below-the-fold pop-in and the Next
          // image-optimizer dependency.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className={`absolute w-[4.25rem] h-[4.25rem] md:w-20 md:h-20 rounded-full ${s.coin}`} aria-hidden="true" />
            <ActivityGlyph
              tool={toolKey}
              subject={category === 'literacy' ? 'literacy' : 'math'}
              className={`relative w-11 h-11 md:w-12 md:h-12 ${s.glyph} transition-transform duration-300 group-hover:scale-110`}
            />
          </span>
        )}
      </div>

      {/* No min-height reservation (the activity card keeps one to align its
          chip row). Try-it is pinned by mt-auto, so a 1-line title here would
          only open a dead gap above the tagline. */}
      <h3 className="font-lcsDisplay font-bold text-base md:text-[1.05rem] text-lcs-teal leading-snug mb-1.5 line-clamp-2">
        {title}
      </h3>

      {/* No category chip: the cards are rendered inside a section already
          headed with that exact label, so a chip per card would repeat the
          heading verbatim up to 13 times. The tagline does the work instead. */}
      <p className="font-lcsBody text-xs text-lcs-teal/65 leading-snug mb-3 line-clamp-3">
        {tagline}
      </p>

      <span className="mt-auto font-lcsDisplay font-bold text-sm text-lcs-coral-deep inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        {tryItLabel}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
