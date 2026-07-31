/* Hero V4 — the "gallery masthead" (2026-07-11 elevation + perfection pass).
   Deep warm-teal gradient + coral glow + grain; FOUR real worksheets — four
   distinct mechanics AND themes — mounted like framed art (white mat + glow)
   and fanned so they glow on the matte. No mascot/emoji/doodle. Copy reads
   homepageV4.hero. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getTypedThumbs } from '@/lib/showcase-decks';
import { MAKER_COUNT } from '@/lib/seo/maker-content';

interface HeroV4Props {
  locale: string;
}

const CDN = 'https://www.lessoncraftstudio.com/en/decks';
const thumb = (slug: string) => `${CDN}/${slug}/thumbnail.png`;

// The four fanned worksheets, by exercise type. On non-EN locales we pull a real
// worksheet of each type IN THE VISITOR'S LANGUAGE (so a German visitor sees
// German worksheets, not English ones); EN keeps its hand-picked decorative decks.
const HERO_TYPES = ['subtraction', 'matching', 'sudoku', 'find-and-count'];
const HERO_FALLBACK_SLUGS = [
  'subtraction-find-subtrahend-dinosaurs',
  'matching-letter-farm-animals',
  'sudoku-ocean-life',
  'find-and-count-letter-spotting-fruits-4',
];

export default async function HeroV4({ locale }: HeroV4Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV4.hero' });
  const localeThumbs = locale === 'en' ? [] : await getTypedThumbs(locale, HERO_TYPES);
  const heroThumb = (i: number) => localeThumbs[i] ?? thumb(HERO_FALLBACK_SLUGS[i]);

  return (
    <section className="hv5-masthead hv5-grain relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl pt-14 pb-28 md:pt-20 md:pb-36 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_1fr] gap-10 lg:gap-16 items-center">
          {/* LEFT — copy on the dark matte */}
          <div className="max-w-xl">
            <p className="hv5-eyebrow" style={{ color: '#C3DBD3' }}>{t('eyebrow')}</p>

            <h1 className="mt-3.5 font-lcsDisplay font-bold text-[#FBF3E4] leading-[1.03] tracking-[-0.02em] text-[2.5rem] sm:text-[3.125rem] lg:text-[3.625rem]">
              {t('h2Line1')}{' '}
              <span className="md:whitespace-nowrap">{t('h2Line2Before')}<span className="text-lcs-coral">{t('h2Line2Squiggle')}</span>{t('h2Line2After')}</span>
            </h1>

            <p className="mt-5 font-lcsBody font-medium text-lg text-[#FBF3E4]/80 leading-relaxed max-w-[48ch]">
              {t('body', { count: MAKER_COUNT })}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link href={`/${locale}/worksheets/`} className="hv5-cta hv5-cta-primary hv5-cta-lg w-full sm:w-auto">
                {t('ctaPrimary')}
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10h10M11 5l5 5-5 5" /></svg>
              </Link>
              <Link href={`/${locale}/worksheet-makers/`} className="hv5-cta hv5-cta-cream hv5-cta-lg w-full sm:w-auto">
                {t('ctaSecondary')}
              </Link>
            </div>

            {/* Divider, then trust row — cream, glowing on the dark ground */}
            <div className="mt-8 h-px bg-[#FBF3E4]/12" />
            <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-lcsBody text-sm text-[#FBF3E4]/70">
              <li className="flex items-center gap-2"><span className="font-lcsDisplay font-bold text-[#FBF3E4] text-base">{t('numWorksheets')}</span> {t('chip2Label')}</li>
              <li className="flex items-center gap-2"><span className="font-lcsDisplay font-bold text-[#FBF3E4] text-base">{t('numMakers', { count: MAKER_COUNT })}</span> {t('chip1Label')}</li>
              <li className="flex items-center gap-2"><span className="font-lcsDisplay font-bold text-[#FBF3E4] text-base">{t('numLanguages')}</span> {t('chip3Label')}</li>
            </ul>
            <p className="mt-2.5 font-lcsBody text-xs text-[#FBF3E4]/70">{t('h1')} · {t('frameworksNote')}</p>
          </div>

          {/* RIGHT — four real worksheets, framed + fanned, glowing */}
          <div className="relative">
            <div className="hidden md:block relative h-[540px]">
              <div className="hv5-card-glow absolute right-[4%] top-0 w-[208px]" style={{ transform: 'rotate(7deg)', zIndex: 1 }}>
                <img src={heroThumb(0)} alt={t('altSubtraction')} loading="lazy" width="208" height="267" />
              </div>
              <div className="hv5-card-glow absolute right-0 top-[168px] w-[236px]" style={{ transform: 'rotate(6deg)', zIndex: 2 }}>
                <img src={heroThumb(1)} alt={t('altMatching')} loading="lazy" width="236" height="304" />
              </div>
              <div className="hv5-card-glow absolute left-[32%] top-[18px] w-[258px]" style={{ transform: 'rotate(3deg)', zIndex: 3 }}>
                <img src={heroThumb(2)} alt={t('altSudoku')} loading="lazy" width="258" height="331" />
              </div>
              <div className="hv5-card-glow hv5-card-glow--hero absolute left-0 bottom-0 w-[304px]" style={{ transform: 'rotate(-4deg)', zIndex: 5 }}>
                <img src={heroThumb(3)} alt={t('altLetterSpotting')} loading="eager" width="304" height="391" />
                <div className="absolute left-3 bottom-3 flex gap-2">
                  <span className="hv5-chip hv5-chip-coral">{t('tagInteractive')}</span>
                  <span className="hv5-chip">{t('tagPrintable')}</span>
                </div>
              </div>
            </div>

            {/* Mobile: a mini-fan (front + one behind), not a flat grid */}
            <div className="md:hidden relative mx-auto" style={{ height: 300, maxWidth: 340 }}>
              <div className="hv5-card-glow absolute top-[12px] right-[6%] w-[150px]" style={{ transform: 'rotate(6deg)', zIndex: 1 }}>
                <img src={heroThumb(2)} alt={t('altSudoku')} loading="lazy" width="150" height="193" />
              </div>
              <div className="hv5-card-glow hv5-card-glow--hero absolute top-[40px] left-[4%] w-[190px]" style={{ transform: 'rotate(-4deg)', zIndex: 2 }}>
                <img src={heroThumb(3)} alt={t('altLetterSpotting')} loading="eager" width="190" height="244" />
                <div className="absolute left-2 bottom-2 flex gap-1.5">
                  <span className="hv5-chip hv5-chip-coral text-[0.7rem]">{t('tagInteractive')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
