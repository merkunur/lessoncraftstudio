/* Hero V4 — professional rebuild (2026-07-11).
   Clean light ground, credible layout, and the RIGHT column is a collage of
   REAL worksheet thumbnails from the live catalog (no emoji, no fake mockups,
   no cartoon). Maker-first message kept, presented professionally. Copy reads
   homepageV4.hero. */

import Link from 'next/link';

interface HeroV4Props {
  locale: string;
}

import { getTranslations } from 'next-intl/server';

// Real published-deck thumbnails (evergreen, verified live). Same-origin in
// production; absolute URL so the local preview loads them too.
const CDN = 'https://www.lessoncraftstudio.com/en/decks';
const thumb = (slug: string) => `${CDN}/${slug}/thumbnail.png`;

export default async function HeroV4({ locale }: HeroV4Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV4.hero' });

  return (
    <section className="relative overflow-hidden bg-[#FDFBF6]">
      <div className="container mx-auto px-4 max-w-6xl pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_1fr] gap-10 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div className="max-w-xl">
            <p className="hv5-eyebrow">{t('eyebrow')}</p>

            <h1 className="mt-4 font-lcsDisplay font-bold text-[#14322D] leading-[1.05] tracking-tight text-[2.5rem] sm:text-[3.125rem] lg:text-[3.5rem]">
              {t('h2Line1')}{' '}
              <span className="whitespace-nowrap">{t('h2Line2Before')}<span className="text-lcs-coral hv3-underline-coral">{t('h2Line2Squiggle')}</span>{t('h2Line2After')}</span>
            </h1>

            <p className="mt-5 font-lcsBody text-lg md:text-xl text-[#3d574f] leading-relaxed max-w-[52ch]">
              {t('body')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <Link href={`/${locale}/worksheets/`} className="hv5-cta hv5-cta-primary text-base md:text-lg px-7 py-3.5">
                {t('ctaPrimary')}
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10h10M11 5l5 5-5 5" /></svg>
              </Link>
              <Link href={`/${locale}/worksheet-makers/`} className="hv5-cta hv5-cta-ghost text-base md:text-lg px-7 py-3.5">
                {t('ctaSecondary')}
              </Link>
            </div>

            {/* Trust row — real numbers, quiet and credible */}
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 font-lcsBody text-sm text-[#3d574f]">
              <li className="flex items-center gap-2"><span className="font-lcsDisplay font-bold text-[#146B5E] text-base">45,309</span> {t('chip2Label')}</li>
              <li className="flex items-center gap-2"><span className="font-lcsDisplay font-bold text-[#146B5E] text-base">29</span> {t('chip1Label')}</li>
              <li className="flex items-center gap-2"><span className="font-lcsDisplay font-bold text-[#146B5E] text-base">11</span> {t('chip3Label')}</li>
            </ul>
            <p className="mt-2.5 font-lcsBody text-xs text-[#3d574f]/70">{t('h1')} · {t('frameworksNote')}</p>
          </div>

          {/* RIGHT — real worksheet collage */}
          <div className="relative">
            {/* Desktop collage — tight diagonal cluster of real worksheets */}
            <div className="hidden md:block relative h-[500px]">
              <div className="hv5-card absolute right-0 top-[14%] w-[248px]" style={{ transform: 'rotate(5deg)', zIndex: 1 }}>
                <img src={thumb('addition-find-addend-animals')} alt="Addition worksheet — animals theme" loading="lazy" width="248" height="320" />
              </div>
              <div className="hv5-card absolute left-[30%] top-0 w-[270px]" style={{ transform: 'rotate(3deg)', zIndex: 2 }}>
                <img src={thumb('sudoku-ocean-life')} alt="Picture Sudoku worksheet — ocean life theme" loading="lazy" width="270" height="347" />
              </div>
              <div className="hv5-card absolute left-0 bottom-0 w-[300px]" style={{ transform: 'rotate(-3deg)', zIndex: 3 }}>
                <img src={thumb('find-and-count-letter-spotting-fruits-4')} alt="Letter spotting worksheet — fruits theme" loading="eager" width="300" height="386" />
                <div className="absolute left-3 bottom-3 flex gap-2">
                  <span className="hv5-chip hv5-chip-coral">{t('tagInteractive')}</span>
                  <span className="hv5-chip">{t('tagPrintable')}</span>
                </div>
              </div>
            </div>

            {/* Mobile: 2 real thumbnails */}
            <div className="md:hidden grid grid-cols-2 gap-4">
              <div className="hv5-card">
                <img src={thumb('find-and-count-letter-spotting-fruits-4')} alt="Letter spotting worksheet — fruits theme" loading="eager" width="300" height="386" />
              </div>
              <div className="hv5-card">
                <img src={thumb('sudoku-ocean-life')} alt="Picture Sudoku worksheet — ocean life theme" loading="lazy" width="280" height="360" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
