/* OpeningV6 (v8 "Open House") — THE MORNING DESK: the densest composed
   moment on the page. Light paper ground; H1/sub/CTAs and the scannable
   counts line on the left; a fan of five REAL locale worksheets overlapping
   toward the one bounded dark object — the chalk panel holding the compact
   Calder mobile. Nine legible product artifacts above the fold; the H1
   stays the LCP (5 eager sheets ≈ 300KB, fetchPriority low). */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { TOOL_KEYS } from '@/lib/seo/tool-content';
import type { ShowcaseDeck } from '@/lib/showcase-decks';
import ClassroomMobile from './ClassroomMobile';

interface Props {
  locale: string;
  travelerThumb: string;
  /** Up to 5 fold-fan decks (real locale worksheets). */
  fanDecks: ShowcaseDeck[];
}

function titleFor(deck: ShowcaseDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

const FAN_TILTS = ['-3deg', '2deg', '-1.5deg', '2.5deg', '-2deg'];

export default async function OpeningV6({ locale, travelerThumb, fanDecks }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV6.hero' });

  return (
    <header className="hv6-hero relative" data-testid="hero-section">
      <div className="container mx-auto px-4 max-w-6xl pt-10 pb-4 lg:pt-14 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(380px,460px)_1fr] gap-10 lg:gap-8 items-start">
          {/* The claim + the scannable counts (law 8). */}
          <div className="pt-2 lg:pt-8">
            <h1 className="font-lcsDisplay font-bold leading-[1.06] tracking-tight text-[2.25rem] sm:text-[2.75rem] md:text-[3.1rem] text-[#14322D]">
              {t('h1')}
            </h1>
            <p className="mt-4 font-lcsBody text-base md:text-lg leading-relaxed text-[#3d574f]">
              {t('sub')}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-center">
              <Link href={`/${locale}/tools`} className="hv6-cta hv6-cta-primary hv6-cta-lg sm:whitespace-nowrap">
                {t('ctaTools')}
              </Link>
              <Link href={`/${locale}/worksheets/`} className="hv6-cta hv6-cta-ghost hv6-cta-lg sm:whitespace-nowrap">
                {t('ctaWorksheets')}
              </Link>
            </div>
            <p className="hv7-countline mt-6">
              {t('countsLine', { tools: TOOL_KEYS.length })}
            </p>
            <p className="mt-3 font-lcsBody text-sm text-[#47564f]">{t('microLine')}</p>
          </div>

          {/* The desk: real worksheets fanned across the wall; the chalk
              panel overlaps the fan's end (a collage, not a row). */}
          <div className="relative hidden sm:block min-w-0" style={{ minHeight: 430, overflowX: 'clip' }}>
            <div
              className="hv7-fan pt-4 pr-[240px]"
              role="img"
              aria-label={t('fanLabel')}
            >
              {fanDecks.slice(0, 5).map((deck, i) => (
                <span
                  key={`${deck.language}-${deck.slug}`}
                  className="hv7-sheet"
                  style={{
                    width: 'clamp(190px, 16vw, 245px)',
                    transform: `rotate(${FAN_TILTS[i % FAN_TILTS.length]})`,
                    zIndex: i % 2 === 0 ? 2 : 1,
                    marginTop: i % 2 === 0 ? 0 : 34,
                  }}
                >
                  <img
                    src={deck.thumbnailUrl}
                    alt={titleFor(deck)}
                    width={480}
                    height={620}
                    loading="eager"
                    fetchPriority="low"
                  />
                </span>
              ))}
            </div>

            {/* The one dark object on the lit wall, overlapping the fan. */}
            <div className="hv7-chalkpanel absolute top-0 right-0 z-[3]">
              <ClassroomMobile travelerThumb={travelerThumb} />
            </div>
          </div>
        </div>

        {/* Phone fold: a straight 2×2 grid of sheets, then the chalk panel. */}
        <div className="sm:hidden mt-8">
          <div className="grid grid-cols-2 gap-3">
            {fanDecks.slice(0, 4).map((deck) => (
              <span key={`m-${deck.language}-${deck.slug}`} className="hv7-sheet">
                <img
                  src={deck.thumbnailUrl}
                  alt={titleFor(deck)}
                  width={480}
                  height={620}
                  loading="eager"
                  fetchPriority="low"
                />
              </span>
            ))}
          </div>
          <div className="hv7-chalkpanel mx-auto mt-6">
            <ClassroomMobile travelerThumb={travelerThumb} />
          </div>
        </div>
      </div>
    </header>
  );
}
