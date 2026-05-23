/* Pillar 2 — Interactive worksheets. Tier 1, second-largest.
   Carries the breadth/variety framing qualitatively (no specific counts).
   Layout: copy left + featured inline-play tile right; small thumbnail row
   beneath for variety signal. Reuses the existing FeaturedDeckTile iframe
   logic and the BreadthGrid selection lib. */

import Link from 'next/link';
import {
  selectBreadthGridDecks,
  BreadthGridDeck,
} from '@/lib/breadth-grid-selection';
import { getAxisSlug } from '@/lib/taxonomy';
import FeaturedDeckTileV3 from './FeaturedDeckTileV3';
import BreadthThumbV3 from './BreadthThumbV3';
import { HandCheck, Sparkle } from './DoodleAccents';

interface PillarInteractiveProps {
  locale: string;
}

function titleFor(deck: BreadthGridDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

export default async function PillarInteractive({ locale }: PillarInteractiveProps) {
  // Tolerate build-time DB unreachability — same pattern as existing BreadthGrid.
  let visiting: BreadthGridDeck[] = [];
  let crossLocale: BreadthGridDeck[] = [];
  let featured: BreadthGridDeck | null = null;
  try {
    const selection = await selectBreadthGridDecks(locale);
    visiting = selection.visiting;
    crossLocale = selection.crossLocale;
    featured = selection.featured;
  } catch (err) {
    console.warn('[PillarInteractive] selectBreadthGridDecks failed:', (err as Error).message);
  }

  const thumbs = [...visiting, ...crossLocale].slice(0, 6);

  return (
    <section id="interactive-worksheets" className="relative overflow-hidden bg-lcs-cream py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Header row */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="hv3-pillar-num">02</span>
            <span className="hv3-eyebrow">Interactive worksheets</span>
          </div>
          <h2 className="font-lcsDisplay font-bold text-lcs-teal leading-[1.05] tracking-tight text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
            Every kind of K-3 worksheet,<br />
            <span className="hv3-underline-coral">in every K-3 language.</span>
          </h2>
        </div>

        {/* Two-column body. Right column is wider this pass (0.85fr/1.15fr)
            so the featured deck tile + the variety thumbs row render at
            larger absolute sizes — the real product art carries more weight. */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          {/* LEFT — supporting lines */}
          <div>
            <p className="font-lcsBody text-lg md:text-xl text-lcs-teal/85 leading-relaxed">
              Crosswords, sudoku, sorts, find-and-count, addition, matching — and
              a wide library of other exercise types. Same content in any of
              eleven languages, grammatically correct down to gendered plurals.
            </p>

            <ul className="mt-8 space-y-5 font-lcsBody text-base md:text-lg text-lcs-teal/80">
              <li className="flex items-start gap-3.5">
                {/* Hand-drawn check replaces the prior clean checkmark
                    inside the round soft-coral pill — same affordance,
                    illustrated feel. */}
                <span className="flex-shrink-0 w-6 h-6 mt-0.5" aria-hidden="true">
                  <HandCheck className="text-lcs-coral" size={26} />
                </span>
                <span>
                  <strong className="font-semibold text-lcs-teal">Plays in any browser.</strong> No login. Shareable as a link, embeddable as an iframe.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex-shrink-0 w-6 h-6 mt-0.5" aria-hidden="true">
                  <HandCheck className="text-lcs-coral" size={26} />
                </span>
                <span>
                  <strong className="font-semibold text-lcs-teal">Themes past the cliché.</strong> Dinosaurs, ocean life, holidays, season-appropriate sets — the catalog goes deep on what kids actually like.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex-shrink-0 w-6 h-6 mt-0.5" aria-hidden="true">
                  <HandCheck className="text-lcs-coral" size={26} />
                </span>
                <span>
                  <strong className="font-semibold text-lcs-teal">Multilingual by default.</strong> Same worksheet, <span className="inline-flex items-center gap-1">eleven languages<Sparkle className="text-lcs-coral inline-block" size={14} rotate={20} /></span>, grammar that holds up.
                </span>
              </li>
            </ul>

            <div className="mt-10">
              <Link
                href={`/${locale}/topic/addition/`}
                className="hv3-cta-teal-outline inline-flex items-center justify-center font-lcsDisplay font-semibold text-base md:text-lg px-6 py-3"
              >
                Browse the catalog
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT — featured inline-play tile + thumb row */}
          <div className="relative">
            {/* Subtle teal blob */}
            <div
              aria-hidden="true"
              className="hv3-blob-teal absolute -top-[15%] -right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
            />

            {featured ? (
              <FeaturedDeckTileV3
                slug={featured.slug}
                locale={featured.language}
                title={titleFor(featured)}
                languageLabel={featured.language.toUpperCase()}
                thumbnailUrl={featured.thumbnailUrl}
                deckUrl={`/${featured.language}/decks/${featured.slug}/`}
              />
            ) : (
              <div className="hv3-card-deep p-12 flex items-center justify-center min-h-[400px]">
                <p className="font-lcsBody text-lcs-teal/60 text-center">
                  Live sample play loads from the catalog.
                </p>
              </div>
            )}

            {/* Variety thumb row — 2 larger thumbs (was 3 small ones) so
                each thumbnail has more pixels to render the worksheet
                content sharply. Each thumb is ~50% of the right column
                width, giving the underlying 480x620 deck art enough
                space to read without being scaled down to mush. */}
            {thumbs.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 md:gap-5">
                {thumbs.slice(0, 2).map((deck) => {
                  const typeSlug = getAxisSlug('exercise-type', deck.exerciseType, locale) ?? deck.exerciseType;
                  return (
                    <BreadthThumbV3
                      key={`${deck.language}-${deck.slug}`}
                      title={titleFor(deck)}
                      languageLabel={deck.language.toUpperCase()}
                      thumbnailUrl={deck.thumbnailUrl}
                      topicUrl={`/${locale}/topic/${typeSlug}/`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
