/* Try-it band (v4) — 9-cell playable breadth band directly under the hero.
   Revives frontend/lib/breadth-grid-selection.ts (§18.4.2: 6 visiting +
   2 cross-locale + 1 featured, mechanic-diversity across all 9, UTC
   day-of-week rotation, ISR-cache-stable).

   Cells:
     - 1 featured inline-play tile (FeaturedDeckTileV3 modal) which ALSO
       carries a crawlable deck-page link via the additive deckHref prop;
     - 8 lazy deck thumbnails, each a plain `<a>` to its deck page —
       /decks/ URLs are nginx-served with trailing slash (§15.7 routing
       contract: <Link> strips the slash and 404s them, so plain anchors);
     - 1 "See all worksheets" tail link (Next route → <Link>).

   Server component; DB failure → renders nothing (honesty, same posture
   as PillarInteractive's catch). */

import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { selectBreadthGridDecks, type BreadthGridDeck } from '@/lib/breadth-grid-selection';
import { wwwImg } from '@/lib/img-host';
import FeaturedDeckTileV3 from '../homepage-v3/FeaturedDeckTileV3';

interface TryItBandV4Props {
  locale: string;
}

function titleFor(deck: BreadthGridDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

function deckPageHref(deck: BreadthGridDeck): string {
  return `/${deck.language}/decks/${deck.slug}/`;
}

export default async function TryItBandV4({ locale }: TryItBandV4Props) {
  let selection;
  try {
    selection = await selectBreadthGridDecks(locale);
  } catch (err) {
    console.warn('[TryItBandV4] breadth-grid selection failed:', (err as Error).message);
    return null;
  }

  const thumbs = [...selection.visiting, ...selection.crossLocale].slice(0, 8);
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
                deckUrl={deckPageHref(featured)}
                deckHref={deckPageHref(featured)}
                deckHrefLabel={t4('openDeck')}
              />
            </div>
          )}

          {/* 8 lazy deck thumbnails — plain <a> to nginx deck pages. */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {thumbs.map((deck) => (
              <a
                key={`${deck.language}-${deck.slug}`}
                href={deckPageHref(deck)}
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
