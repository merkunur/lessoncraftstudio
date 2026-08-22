/* One machine on the Press Hall floor.
 *
 * The card is a machine's spec plate on the site's established "sheet of
 * handmade paper" (.actcat-card): bay-ink rail with brass rivets on top, a
 * brass running number (No. 1–33), the SPECIMEN — a real published worksheet
 * held by a drawn clip — the maker's localized name + tagline, its exercise
 * modes as die-plate chips, and the launch CTA. Everything localized arrives
 * pre-resolved as props (house convention: no i18n calls in presentational
 * components). Zero keyframe animation — hover transitions only, so the
 * floor stays calm and the page's motion census stays flat.
 *
 * Routing contract preserved from the v1 hub: card IS the anchor, carries
 * id={slug} (nav fragment fallback), links to the /tools/<slug> landing via
 * <Link> when one exists, else opens the generator HTML in a new tab via a
 * plain <a> (§15.7 — nginx URL, never <Link>).
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

export interface MachineCardProps {
  slug: string;
  name: string;
  tagline?: string;
  /** Pre-formatted brass token text, e.g. "No. 7". */
  numberLabel: string;
  /** Bay ink hex for the rail/clip/chips. */
  bayInk: string;
  /** Deterministic specimen tilt, e.g. "-1.5deg". */
  tilt: string;
  /** Internal landing href (used with <Link>) — or null to use generatorHref. */
  landingHref: string | null;
  /** nginx generator URL fallback (plain <a>, new tab). */
  generatorHref: string;
  cta: string;
  /** Real worksheet thumbnail (www host) — null renders the drawn PDF sheet. */
  thumbnailUrl: string | null;
  /** BW line-art for the drawn PDF-only specimen (only read when no thumbnail). */
  specimenArt?: string;
  /** Color theme-art for the corner block — rendered on EVERY card. */
  cornerArt?: string;
  /** Resolved localized mode names (already capped by the caller). */
  modeNames: string[];
  /** "+N more" chip label when modes overflow — null when none hidden. */
  modesMoreLabel: string | null;
  categoryIcon: ReactNode;
  /** Eager-load budget: true only for the first visible row. */
  eager?: boolean;
}

export default function MachineCard(props: MachineCardProps) {
  const {
    slug, name, tagline, numberLabel, bayInk, tilt, landingHref, generatorHref,
    cta, thumbnailUrl, specimenArt, cornerArt, modeNames, modesMoreLabel,
    categoryIcon, eager,
  } = props;

  const cardClass =
    'wmk-card-link group actcat-card wmk-card relative block rounded-xl overflow-hidden';

  const style = {
    ['--bay-ink' as string]: bayInk,
    ['--tilt' as string]: tilt,
  };

  const specimen = (
    <div className="relative pt-3 px-3 sm:pt-4 sm:px-4">
      <div
        className="wmk-specimen relative rounded-md overflow-hidden aspect-[4/3] sm:aspect-[4/5]"
      >
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={name}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-x-0 top-0 w-full h-full object-cover object-top"
          />
        ) : (
          /* PDF-only machine (or DB down): a drawn ruled sheet carrying real
             line art — an honest print-only specimen, never a broken image. */
          <div className="wmk-specimen-pdf absolute inset-0 flex items-center justify-center">
            {specimenArt ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={encodeURI(specimenArt)}
                alt={name}
                loading="lazy"
                decoding="async"
                className="w-3/5 h-3/5 object-contain opacity-90"
              />
            ) : null}
          </div>
        )}
      </div>
      <div className="wmk-clip" aria-hidden="true" />
    </div>
  );

  const body = (
    <div className="flex flex-col flex-1 min-w-0 p-3 sm:p-4">
      {/* pr-10 at base only: the corner theme block overlays the body row in
          the horizontal phone layout; from sm it sits over the specimen. */}
      <div className="flex items-center gap-2 mb-1.5 pr-10 sm:pr-0">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-md shrink-0"
          style={{ background: `color-mix(in srgb, ${bayInk} 14%, #FFFDF8)`, color: bayInk }}
          aria-hidden="true"
        >
          {categoryIcon}
        </span>
        <h3 className="font-lcsDisplay font-bold text-base md:text-lg leading-snug text-[var(--wmk-ink)] group-hover:text-[var(--wmk-teal)] transition-colors min-w-0">
          {name}
        </h3>
      </div>
      {tagline ? (
        <p className="font-lcsBody text-sm text-[#3d574f] leading-snug mb-2.5 line-clamp-2">{tagline}</p>
      ) : null}
      {modeNames.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {modeNames.map((m) => (
            <span key={m} className="wmk-mode px-2 py-0.5 text-[11px] font-lcsBody font-semibold leading-tight">
              {m}
            </span>
          ))}
          {modesMoreLabel ? (
            <span className="wmk-mode px-2 py-0.5 text-[11px] font-lcsBody font-semibold leading-tight opacity-75">
              {modesMoreLabel}
            </span>
          ) : null}
        </div>
      ) : null}
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-lcsBody font-bold" style={{ color: bayInk }}>
        {cta}
        <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  );

  const inner = (
    <>
      <span className="wmk-card-riv is-l" aria-hidden="true" />
      <span className="wmk-card-riv is-r" aria-hidden="true" />
      {/* brass number + theme block row, floating over the specimen */}
      <span className="wmk-no absolute top-3 left-3 sm:top-4 sm:left-4 z-[2] rounded-md px-1.5 py-0.5 text-[11px] font-lcsDisplay font-bold tracking-wide">
        {numberLabel}
      </span>
      {cornerArt ? (
        <span className="wmk-block absolute top-3 right-3 sm:top-4 sm:right-4 z-[2] w-9 h-9 p-1 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* w/h-full, not max-*: a lazy img with no intrinsic size renders a
              0×0 box that never intersects, so it never loads at all */}
          <img src={encodeURI(cornerArt)} alt="" loading="lazy" decoding="async" className="w-full h-full object-contain" />
        </span>
      ) : null}
      {/* h-full so the body can flex-fill the grid-stretched card and
          mt-auto pins every CTA to the same bottom line across a row */}
      <div className="flex flex-row sm:flex-col h-full">
        <div className="w-[38%] sm:w-auto shrink-0">{specimen}</div>
        {body}
      </div>
    </>
  );

  return landingHref ? (
    <Link id={slug} href={landingHref} prefetch={false} className={cardClass} style={style}>
      {inner}
    </Link>
  ) : (
    <a id={slug} href={generatorHref} target="_blank" rel="noopener" className={cardClass} style={style}>
      {inner}
    </a>
  );
}
