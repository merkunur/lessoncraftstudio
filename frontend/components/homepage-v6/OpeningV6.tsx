/* OpeningV6 (v9 "Morning Lessons, Running") — the hero IS the machine:
   the full Calder classroom mobile hangs in daylight over a low fan of
   real locale worksheets. The mobile's balance-beam top arm, worksheet +
   QR tag, mini rekenrek, clock and word rack all sway on prime periods —
   the page's one large motion. H1 stays the LCP (3 eager sheets only). */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { TOOL_KEYS } from '@/lib/seo/tool-content';
import type { ShowcaseDeck } from '@/lib/showcase-decks';
import ClassroomMobile from './ClassroomMobile';

interface Props {
  locale: string;
  travelerThumb: string;
  /** Fold-fan decks (real locale worksheets; first 3 used). */
  fanDecks: ShowcaseDeck[];
}

function titleFor(deck: ShowcaseDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

const FAN_TILTS = ['-2.5deg', '1.5deg', '-1deg'];

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

          {/* The morning air: the full mobile swings over a low fan of real
              worksheets. Fixed min-height = CLS guard. */}
          <div className="hv9-fold-stage hidden lg:block min-w-0">
            <div className="hv9-fold-fan" role="img" aria-label={t('fanLabel')}>
              {fanDecks.slice(0, 3).map((deck, i) => (
                <span
                  key={`${deck.language}-${deck.slug}`}
                  className="hv7-sheet"
                  style={{
                    width: 'clamp(150px, 12vw, 190px)',
                    transform: `rotate(${FAN_TILTS[i % FAN_TILTS.length]})`,
                    zIndex: i % 2 === 0 ? 2 : 1,
                    marginTop: i % 2 === 0 ? 0 : 18,
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
            <div className="hv9-fold-mobile relative z-[2] mx-auto">
              <ClassroomMobile travelerThumb={travelerThumb} />
            </div>
          </div>
        </div>

        {/* Phone fold: a straight 2×2 grid of sheets, then the compact
            mobile (the CSS ≤1023 block compresses the same sculpture). */}
        <div className="lg:hidden mt-8">
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
          <div className="mt-8">
            <ClassroomMobile travelerThumb={travelerThumb} />
          </div>
        </div>
      </div>
    </header>
  );
}
