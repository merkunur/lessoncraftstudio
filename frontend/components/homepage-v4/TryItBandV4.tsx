/* Try-it band (v4) — 9-cell playable breadth band directly under the hero.
   Revives frontend/lib/breadth-grid-selection.ts (§18.4.2: 6 visiting +
   2 cross-locale + 1 featured, mechanic-diversity across all 9, UTC
   day-of-week rotation, ISR-cache-stable).

   Cells:
     - 1 featured inline-play tile (FeaturedDeckTileV3 modal): plays the deck
       asset inline (deckUrl) but points its crawlable link (deckHref) at the
       deck's /worksheets/ landing;
     - 8 lazy deck thumbnails, each a plain `<a>` to the deck's landing;
     - 1 "See all worksheets" tail link (Next route → <Link>).

   Link target is the /worksheets/ landing wherever one exists (§22.1
   conditional repoint, via landingSlugForDeck), falling back to the nginx
   /decks/ asset otherwise. Plain anchors throughout because that fallback
   carries a trailing slash <Link> would strip (§15.7). Only the inline-play
   iframe still targets /decks/ directly — it needs the live deck document.

   Server component; DB failure → renders nothing (honesty, same posture
   as PillarInteractive's catch). */

import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { selectShowcaseDecks, type ShowcaseDeck } from '@/lib/showcase-decks';
import { landingSlugForDeck } from '@/lib/seo/landing-content';
import { wwwImg } from '@/lib/img-host';
import FeaturedDeckTileV3 from '../homepage-v3/FeaturedDeckTileV3';

interface TryItBandV4Props {
  locale: string;
}

function titleFor(deck: ShowcaseDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

/** The interactive deck asset itself (nginx-served, trailing slash). Used for
 *  the featured tile's inline-play iframe — NOT for crawlable links. */
function deckPlayUrl(deck: ShowcaseDeck): string {
  return `/${deck.language}/decks/${deck.slug}/`;
}

/** Where a visitor (and Googlebot) should LAND for this deck.
 *
 *  The conditional repoint every other browse surface already uses (§22.1):
 *  prefer the /worksheets/ landing, fall back to the deck asset when the deck
 *  has no landing. Until 2026-07-30 this band hardcoded /decks/ for all 9
 *  cells — the live homepage was the last major surface that never consulted
 *  landingSlugForDeck, so its links pointed at pages that have carried
 *  `X-Robots-Tag: noindex` since 2026-07-22 (one of them under a label
 *  literally reading "Open worksheet page").
 *
 *  Fails closed: no landing → the previous /decks/ URL, exactly as before. */
function deckLandingHref(deck: ShowcaseDeck): string {
  const landing = landingSlugForDeck(deck.language, deck.slug);
  return landing
    ? `/${deck.language}/worksheets/${landing}`
    : deckPlayUrl(deck);
}

export default async function TryItBandV4({ locale }: TryItBandV4Props) {
  let selection;
  try {
    selection = await selectShowcaseDecks(locale);
  } catch (err) {
    console.warn('[TryItBandV4] showcase selection failed:', (err as Error).message);
    return null;
  }

  const thumbs = selection.thumbs.slice(0, 8);
  const featured = selection.featured;
  if (thumbs.length === 0 && !featured) return null;

  const t4 = await getTranslations({ locale, namespace: 'homepageV4.tryIt' });

  return (
    <section id="try-it" className="bg-[#FDFBF6] hv5-paper-rise relative pt-16 pb-20 md:pt-20 md:pb-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="hv5-eyebrow">{t4('eyebrow')}</p>
          <h2 className="mt-3 font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">
            {t4('heading')}
          </h2>
          <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed max-w-2xl">
            {t4('body')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_1fr] gap-8 lg:gap-10 items-start">
          {/* Featured inline-play tile + its crawlable deck-page link. */}
          {featured && (
            <div className="hv4-tryit-featured">
              <FeaturedDeckTileV3
                slug={featured.slug}
                locale={featured.language}
                title={titleFor(featured)}
                languageLabel={featured.language.toUpperCase()}
                thumbnailUrl={featured.thumbnailUrl}
                deckUrl={deckPlayUrl(featured)}
                deckHref={deckLandingHref(featured)}
                deckHrefLabel={t4('openDeck')}
              />
            </div>
          )}

          {/* 8 lazy deck thumbnails. Plain <a>, not <Link>: a deck without a
              landing still resolves to its nginx /decks/ URL, whose trailing
              slash <Link> would strip and 404 (§15.7 routing contract). */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {thumbs.map((deck) => (
              <a
                key={`${deck.language}-${deck.slug}`}
                href={deckLandingHref(deck)}
                className="hv3-card group relative block overflow-hidden hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="relative aspect-[480/620] overflow-hidden rounded-t-3xl bg-lcs-cream">
                  <Image
                    src={wwwImg(deck.thumbnailUrl)}
                    alt={titleFor(deck)}
                    fill
                    loading="lazy"
                    sizes="(max-width:639px) 45vw, (max-width:1023px) 22vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 right-2 hv3-locale-chip">{deck.language.toUpperCase()}</span>
                </div>
                <div className="px-3 py-2.5">
                  <span className="block font-lcsBody text-xs font-semibold text-lcs-teal truncate">
                    {titleFor(deck)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center lg:text-left">
          <Link
            href={`/${locale}/worksheets/`}
            className="hv5-cta hv5-cta-ghost text-base px-6 py-3"
          >
            {t4('seeAll')}
            <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 10h10M11 5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
