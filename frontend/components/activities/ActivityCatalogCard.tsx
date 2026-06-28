/**
 * ActivityCatalogCard — the signature element of the redesigned activities
 * index. A Direction A paper card (dual-shadow cream, .actcat-card) whose
 * "thumbnail" is a crafted per-engine glyph (ActivityGlyph) on a soft
 * subject-tinted panel — activities have no screenshot, so the glyph IS the
 * visual. Below: short title (Baloo 2), grade + CC-code chips, the localized
 * strand sublabel, and a coral Try-it affordance. The whole card is one link.
 *
 * Presentational + server-rendered: all localized strings are passed in
 * (grade from seo.educational_level.*, strand from localizeStrand) so this
 * file needs no i18n context. Keyboard-focusable; hover lift is CSS-only and
 * respects prefers-reduced-motion (see activities-catalog.css).
 */
import Link from 'next/link';
import ActivityGlyph from './ActivityGlyph';
import { SUBJECT_STYLE, type Subject } from '@/lib/activities-catalog';

export interface ActivityCatalogCardProps {
  href: string;
  tool: string;
  subject: Subject;
  title: string; // short, card-sized
  gradeLabel: string; // localized educational level
  code: string; // CCSS code (machine anchor, stays English)
  strandLabel: string; // localized strand
  category?: string; // strandKey() — topical glyph fallback when no preview/engine glyph
  tryItLabel: string;
  previewUrl?: string; // real rendered preview of the activity's play area
}

export default function ActivityCatalogCard({
  href,
  tool,
  subject,
  title,
  gradeLabel,
  code,
  strandLabel,
  category,
  tryItLabel,
  previewUrl,
}: ActivityCatalogCardProps) {
  const s = SUBJECT_STYLE[subject];
  return (
    <Link href={href} className="actcat-card group flex flex-col rounded-3xl p-3.5 md:p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-lcs-cream">
      {/* "Thumbnail": a REAL rendered preview of this activity's play area
          (so the content is visually clear + distinct per activity), with a
          saturated top edge band for the Math/Literacy signal. Falls back to
          the per-engine glyph (on a backing coin) when no preview exists. */}
      <div className={`relative overflow-hidden rounded-2xl ${s.panel} aspect-[4/3] mb-3.5`}>
        <span className={`absolute left-0 right-0 top-0 z-10 h-1.5 ${s.edge}`} aria-hidden="true" />
        {previewUrl ? (
          // Plain eager <img>: the webp is pre-sized (480×360) and tiny; eager
          // load avoids the lazy below-the-fold pop-in (the "blank panel" bug)
          // and the Next image-optimizer dependency — the static webp always
          // renders. eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt={title}
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className={`absolute w-[4.25rem] h-[4.25rem] md:w-20 md:h-20 rounded-full ${s.coin}`} aria-hidden="true" />
            <ActivityGlyph
              tool={tool}
              category={category}
              subject={subject}
              className={`relative w-11 h-11 md:w-12 md:h-12 ${s.glyph} transition-transform duration-300 group-hover:scale-110`}
            />
          </span>
        )}
      </div>

      {/* Title (Baloo 2, clamped to 2 lines for a consistent baseline) */}
      <h3 className="font-lcsDisplay font-bold text-base md:text-[1.05rem] text-lcs-teal leading-snug mb-2 line-clamp-2 min-h-[2.6rem]">
        {title}
      </h3>

      {/* Chips: solid grade pill (primary) + demoted ghost CC-code (metadata) */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-lcs-teal/10 text-lcs-teal text-[0.7rem] font-lcsBody font-bold">
          {gradeLabel}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-lcs-teal/20 text-lcs-teal/55 text-[0.68rem] font-mono">
          {code}
        </span>
      </div>

      {/* Strand sublabel */}
      <p className="font-lcsBody text-xs text-lcs-teal/65 leading-snug mb-3">
        {strandLabel}
      </p>

      {/* Try-it — coral kinetic accent, pinned to the card bottom */}
      <span className="mt-auto font-lcsDisplay font-bold text-sm text-lcs-coral-deep inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        {tryItLabel}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
