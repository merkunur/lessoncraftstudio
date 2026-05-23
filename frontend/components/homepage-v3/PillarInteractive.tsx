/* Pillar 2 — Interactive worksheets. Tier 1, second-largest.
   Layout: copy left + featured inline-play tile right; small thumbnail
   row beneath for variety.

   Per operator: this surface is RESTRICTED to 4 exercise types
   (addition, word-scramble, missing-pieces, find-and-count) and to
   the current homepage locale only — NO cross-locale fallback. The
   purpose-built selectPillarInteractiveDecks() runs a single Prisma
   query against `{ language: locale, status: 'published', exerciseType
   IN (...) }`, then variety-picks one featured + 2 thumbs across
   distinct types. */

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getAxisSlug } from '@/lib/taxonomy';
import FeaturedDeckTileV3 from './FeaturedDeckTileV3';
import BreadthThumbV3 from './BreadthThumbV3';
import { HandCheck, Sparkle } from './DoodleAccents';

interface PillarInteractiveProps {
  locale: string;
}

// Operator-locked allowlist for this surface.
const FEATURED_EXERCISE_TYPES = ['addition', 'word-scramble', 'missing-pieces', 'find-and-count'] as const;

interface DeckRow {
  id: string;
  slug: string;
  language: string;
  title: unknown; // Prisma Json
  exerciseType: string;
  thumbnailUrl: string;
  subjectTags: string[];
  publishedAt: Date | null;
}

function titleFor(deck: DeckRow): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

async function selectPillarInteractiveDecks(locale: string): Promise<{ featured: DeckRow | null; thumbs: DeckRow[] }> {
  try {
    // 4 parallel per-type queries guarantee one deck per allowed type
    // (when published in the locale). A single "take 12" query was
    // biased by recency — a recent missing-pieces batch dominated the
    // top-12 window for en/es/it/pt, leaving the other allowed types
    // empty and forcing the featured fallback + 0 thumbs.
    const perTypePromises = FEATURED_EXERCISE_TYPES.map((type) =>
      prisma.deck.findMany({
        where: { language: locale, status: 'published', exerciseType: type },
        select: {
          id: true,
          slug: true,
          language: true,
          title: true,
          exerciseType: true,
          thumbnailUrl: true,
          subjectTags: true,
          publishedAt: true,
        },
        orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
        take: 1,
      })
    );
    const perTypeResults = await Promise.all(perTypePromises);

    const byType = new Map<string, DeckRow>();
    FEATURED_EXERCISE_TYPES.forEach((type, i) => {
      const deck = perTypeResults[i][0];
      if (deck) byType.set(type, deck as DeckRow);
    });

    // Featured: prefer addition (most teacher-recognizable), else first
    // type with any deck in the FEATURED_EXERCISE_TYPES order.
    const featured =
      byType.get('addition') ??
      FEATURED_EXERCISE_TYPES.map((t) => byType.get(t)).find(Boolean) ??
      null;

    // Thumbs: up to 2 from OTHER types, in FEATURED_EXERCISE_TYPES order.
    const thumbs: DeckRow[] = [];
    if (featured) {
      for (const type of FEATURED_EXERCISE_TYPES) {
        if (type === featured.exerciseType) continue;
        const d = byType.get(type);
        if (d) thumbs.push(d);
        if (thumbs.length >= 2) break;
      }
    }

    return { featured, thumbs };
  } catch (err) {
    console.warn('[PillarInteractive] DB query failed:', (err as Error).message);
    return { featured: null, thumbs: [] };
  }
}

export default async function PillarInteractive({ locale }: PillarInteractiveProps) {
  const { featured, thumbs } = await selectPillarInteractiveDecks(locale);

  return (
    <section id="interactive-worksheets" className="hv3-section-coral relative overflow-hidden py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Header row */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="hv3-pillar-num-cream">02</span>
            <span className="hv3-eyebrow text-lcs-cream/85">Interactive worksheets</span>
          </div>
          <h2 className="font-lcsDisplay font-bold text-lcs-cream leading-[1.05] tracking-tight text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.75rem]">
            Every kind of K-3 worksheet,<br />
            <span className="text-lcs-cream/85 italic">in every K-3 language.</span>
          </h2>
        </div>

        {/* Two-column body. Right column wider so the featured deck tile
            + the variety thumbs row render at larger absolute sizes — the
            real product art carries more weight. */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          {/* LEFT — supporting lines */}
          <div>
            <p className="font-lcsBody text-lg md:text-xl text-lcs-cream/90 leading-relaxed">
              Crosswords, sudoku, sorts, find-and-count, addition, matching — and
              a wide library of other exercise types. Same content in any of
              eleven languages, grammatically correct down to gendered plurals.
            </p>

            <ul className="mt-8 space-y-5 font-lcsBody text-base md:text-lg text-lcs-cream/85">
              <li className="flex items-start gap-3.5">
                <span className="flex-shrink-0 w-6 h-6 mt-0.5" aria-hidden="true">
                  <HandCheck className="text-lcs-cream" size={26} />
                </span>
                <span>
                  <strong className="font-semibold text-lcs-cream">Plays in any browser.</strong> No login. Shareable as a link, embeddable as an iframe.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex-shrink-0 w-6 h-6 mt-0.5" aria-hidden="true">
                  <HandCheck className="text-lcs-cream" size={26} />
                </span>
                <span>
                  <strong className="font-semibold text-lcs-cream">Themes past the cliché.</strong> Dinosaurs, ocean life, holidays, season-appropriate sets — the catalog goes deep on what kids actually like.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex-shrink-0 w-6 h-6 mt-0.5" aria-hidden="true">
                  <HandCheck className="text-lcs-cream" size={26} />
                </span>
                <span>
                  <strong className="font-semibold text-lcs-cream">Multilingual by default.</strong> Same worksheet, <span className="inline-flex items-center gap-1">eleven languages<Sparkle className="text-lcs-cream inline-block" size={14} rotate={20} /></span>, grammar that holds up.
                </span>
              </li>
            </ul>

            <div className="mt-10">
              <Link
                href={`/${locale}/worksheets/`}
                className="hv3-cta-cream-outline inline-flex items-center justify-center font-lcsDisplay font-semibold text-base md:text-lg px-6 py-3"
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
            {/* Cream wash blob — soft halo behind the featured tile so
                the cream card has air around it on the coral ground. */}
            <div
              aria-hidden="true"
              className="absolute -top-[15%] -right-[10%] w-[340px] h-[340px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(251,243,228,0.18) 0%, transparent 70%)' }}
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

            {/* Variety thumb row — up to 2 thumbs from OTHER allowed
                exercise types in the same locale. */}
            {thumbs.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 md:gap-5">
                {thumbs.map((deck) => {
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
