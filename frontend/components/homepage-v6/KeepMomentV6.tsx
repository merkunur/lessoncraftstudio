/* KeepMomentV6 (v8 "Open House") — the intro of the Keep+Plans band:
   plan a lesson, keep a year, with the quiet honest chips. The right half
   carries a saved-unit shelf (three collected worksheets under the plan
   tag) so the viewport keeps product mass. The plan cards
   (TeacherMomentV6) follow immediately as the same visual band. */

import { getTranslations } from 'next-intl/server';
import type { ShowcaseDeck } from '@/lib/showcase-decks';

interface Props {
  locale: string;
  /** 3 decks for the saved-unit shelf on the right half. */
  keepDecks?: ShowcaseDeck[];
}

function titleFor(deck: ShowcaseDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

export default async function KeepMomentV6({ locale, keepDecks = [] }: Props) {
  const [t, tRoot] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.keep' }),
    getTranslations({ locale, namespace: 'homepageV6' }),
  ]);

  const chips = [t('chipCurricula'), t('chipLanguages'), t('chipNoData'), t('chipNoAds')];

  return (
    <section id="keep" className="pt-12 md:pt-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.25rem] md:text-[2.5rem]">
              {t('heading')}
            </h2>
            {/* Honest attribution: saving + collections are Teacher-plan. */}
            <span className="hv6-chip-mono mt-3 inline-flex">{tRoot('planTag')}</span>
            <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <span key={c} className="hv6-chip-quiet">{c}</span>
              ))}
            </div>
          </div>

          {/* The saved-unit shelf: three collected worksheets, overlapped
              like a folder just opened. Fixed clamp widths; never tilted
              on phones (tilt classes gate at 640px). */}
          {keepDecks.length > 0 && (
            <div className="hidden sm:flex items-end justify-center lg:justify-end" aria-hidden="true">
              {keepDecks.slice(0, 3).map((deck, i) => (
                <span
                  key={`${deck.slug}-${i}`}
                  className={`hv7-sheet hv7-lift ${['hv7-tilt-a', 'hv7-tilt-c', 'hv7-tilt-b'][i]}`}
                  style={{
                    width: 'clamp(150px, 14vw, 200px)',
                    marginLeft: i === 0 ? 0 : '-38px',
                    zIndex: i === 1 ? 2 : 1,
                    marginBottom: i === 1 ? 18 : 0,
                  }}
                >
                  <img src={deck.thumbnailUrl} alt={titleFor(deck)} width={480} height={620} loading="lazy" />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
