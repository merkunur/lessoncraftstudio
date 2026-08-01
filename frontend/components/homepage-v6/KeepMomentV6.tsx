/* KeepMomentV6 (v9 "Morning Lessons, Running") — plan a lesson, keep a
   year. The right half pairs the saved-unit shelf (real worksheets) with
   the CHORAL CHART writing itself cell by cell — the year of counting,
   running. The plan cards (TeacherMomentV6) follow as the same band. */

import { getTranslations } from 'next-intl/server';
import type { ShowcaseDeck } from '@/lib/showcase-decks';
import ToolVignette from './ToolVignette';

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
  const tChoral = (await getTranslations({ locale, namespace: 'homepageV6.practice' }))('penChoral');

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
          <div className="hidden sm:flex items-end justify-center lg:justify-end gap-6" aria-hidden="true">
            {/* the year of counting, writing itself */}
            <div className="shrink-0">
              <div className="hv9-keep-choral">
                <ToolVignette variant="choral" />
              </div>
              <span className="hv6-slip mt-3 inline-block">
                <span className="hv6-pen">{tChoral}</span>
              </span>
            </div>
            {keepDecks.length > 0 && (
              <div className="flex items-end">
                {keepDecks.slice(0, 2).map((deck, i) => (
                  <span
                    key={`${deck.slug}-${i}`}
                    className={`hv7-sheet hv7-lift ${['hv7-tilt-a', 'hv7-tilt-c'][i]}`}
                    style={{
                      width: 'clamp(140px, 12vw, 180px)',
                      marginLeft: i === 0 ? 0 : '-38px',
                      zIndex: i === 0 ? 2 : 1,
                      marginBottom: i === 0 ? 14 : 0,
                    }}
                  >
                    <img src={deck.thumbnailUrl} alt={titleFor(deck)} width={480} height={620} loading="lazy" />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
