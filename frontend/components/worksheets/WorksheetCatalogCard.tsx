/**
 * WorksheetCatalogCard — the grid card of the redesigned worksheets hub.
 * A Direction A paper card (dual-shadow cream, .actcat-card — the same visual
 * vocabulary as ActivityCatalogCard on /[locale]/activities/) whose thumbnail
 * is the deck's real rendered worksheet (slug-derived, drift-proof per the
 * SEO-recovery 2026-06-25 rule). Below: clamped title (Baloo 2), a teal level
 * pill, the localized exercise-type sublabel, and a coral view affordance.
 * The whole card is one link.
 *
 * Rate-limit frugality (broken-thumbnails fix 2026-07-06): images are lazy
 * beyond the first visible rows (`eager` prop) and the Link never prefetches —
 * 24 cards × (_next/image + _rsc prefetch) previously blew the nginx per-IP
 * burst and 429'd a random subset of thumbnails.
 *
 * Presentational + server-rendered: all localized strings are passed in, so
 * this file needs no i18n context. Keyboard-focusable; hover lift is CSS-only
 * and respects prefers-reduced-motion (see styles/catalog-cards.css).
 */
import Link from 'next/link';
import Image from 'next/image';
import { SUBJECT_STYLE, type Subject } from '@/lib/activities-catalog';

export interface WorksheetCatalogCardProps {
  href: string;
  thumbnailSrc: string; // wwwImg(deckAssets(locale, canonicalDeckSlug).thumbnail)
  title: string; // l.h1 — doubles as the image alt
  levelLabel: string; // localized level band chip
  typeLabel: string; // localized exercise-type name
  subject: Subject; // teal (math family) / coral (literacy) tint
  ctaLabel: string;
  eager?: boolean; // first-row cards load eagerly; the rest lazy
}

export default function WorksheetCatalogCard({
  href,
  thumbnailSrc,
  title,
  levelLabel,
  typeLabel,
  subject,
  ctaLabel,
  eager = false,
}: WorksheetCatalogCardProps) {
  const s = SUBJECT_STYLE[subject];
  return (
    <Link
      href={href}
      prefetch={false}
      className="actcat-card group flex flex-col rounded-3xl p-3.5 md:p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-lcs-cream"
    >
      {/* Thumbnail: the deck's real 480×620 worksheet render (portrait 4/5),
          top-cropped so the title band of the sheet shows. Optimizer-served
          (~15-25KB WebP/AVIF vs the ~150KB PNG); lazy below the fold. */}
      <div className={`relative overflow-hidden rounded-2xl ${s.panel} aspect-[4/5] mb-3.5`}>
        <span className={`absolute left-0 right-0 top-0 z-10 h-1.5 ${s.edge}`} aria-hidden="true" />
        <Image
          src={thumbnailSrc}
          alt={title}
          fill
          sizes="(max-width:639px) 45vw, (max-width:1023px) 45vw, (max-width:1279px) 30vw, 250px"
          loading={eager ? 'eager' : 'lazy'}
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Title (Baloo 2, clamped to 2 lines for a consistent baseline) */}
      <h3 className="font-lcsDisplay font-bold text-base md:text-[1.05rem] text-lcs-teal leading-snug mb-2 line-clamp-2 min-h-[2.6rem]">
        {title}
      </h3>

      {/* Level pill (solid teal, primary metadata) */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-lcs-teal/10 text-lcs-teal text-[0.7rem] font-lcsBody font-bold">
          {levelLabel}
        </span>
      </div>

      {/* Exercise-type sublabel */}
      <p className="font-lcsBody text-xs text-lcs-teal/65 leading-snug mb-3">
        {typeLabel}
      </p>

      {/* View — coral kinetic accent, pinned to the card bottom */}
      <span className="mt-auto font-lcsDisplay font-bold text-sm text-lcs-coral-deep inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
