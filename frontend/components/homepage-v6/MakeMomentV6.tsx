/* MakeMomentV6 (v9 "Morning Lessons, Running") — the maker gets its 4×
   pixels, the Print story rides the outputs column, and the MAKING motion
   is shown by a working machine: c·a·t letter tiles drop into their slots
   while a chalk rule sweeps beneath. A ten-frame fills on the seam out. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MAKER_COUNT } from '@/lib/seo/maker-content';
import ToolVignette from './ToolVignette';
import SeamInstrument from './SeamInstrument';

interface Props {
  locale: string;
  travelerThumb: string;
}

function Chrome({ url }: { url: string }) {
  return (
    <div className="hv6-chrome" aria-hidden="true">
      <i style={{ background: '#F2784B' }} />
      <i style={{ background: '#DCE3D3' }} />
      <i style={{ background: '#146B5E' }} />
      <span className="url">{url}</span>
    </div>
  );
}

export default async function MakeMomentV6({ locale, travelerThumb }: Props) {
  const [t, tPaper] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.make' }),
    getTranslations({ locale, namespace: 'homepageV6.paper' }),
  ]);

  const imgBase = locale === 'en' ? '/homepage' : `/homepage/${locale}`;

  return (
    <section id="make" className="pt-12 md:pt-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.25rem] md:text-[2.5rem]">
            {t('heading')}
          </h2>
          <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">
            {t('body', { count: MAKER_COUNT })}
          </p>
          <p className="mt-2 font-lcsBody text-sm text-[#5a6b64]">{t('caption', { count: MAKER_COUNT })}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-10 items-start">
          {/* The real maker — the band's dominant mass (4× its old pixels). */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-[#14322D]/8 shadow-[var(--e3)] bg-white hv7-lift">
              <Chrome url="lessoncraftstudio.com/worksheet-makers" />
              <div className="bg-[#F4F2EC] hv7-makerframe">
                <img
                  src={`${imgBase}/maker.webp`}
                  alt={t('makerAlt')}
                  width={1400}
                  height={1349}
                  loading="eager"
                  fetchPriority="low"
                  className="block w-full h-auto"
                />
              </div>
            </div>
            <div className="mt-6">
              <Link href={`/${locale}/worksheet-makers/`} className="hv6-cta hv6-cta-primary text-base px-7 py-3.5">
                {t('cta')}
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* One build → two REAL outputs (the Print story lives here). */}
          <div>
            <h3 className="font-lcsDisplay font-bold text-[#14322D] text-xl md:text-2xl leading-snug">
              {tPaper('heading')}
            </h3>
            <p className="mt-2 font-lcsBody text-[15px] text-[#3d574f] leading-relaxed">{tPaper('body')}</p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <div className="hv6-card hv7-tilt-c hv7-lift">
                  <Chrome url="…/play/" />
                  <div className="max-h-[240px] overflow-hidden bg-white">
                    <img
                      src={`${imgBase}/interactive-play.webp`}
                      alt={tPaper('playAlt')}
                      width={760}
                      height={1120}
                      loading="eager"
                      fetchPriority="low"
                      className="block w-full"
                    />
                  </div>
                </div>
                <span className="hv6-chip mt-3 inline-flex">{tPaper('tagPlay')}</span>
              </div>
              <div>
                <div className="hv6-card hv7-tilt-b hv7-lift">
                  <Chrome url="….pdf" />
                  <div className="max-h-[240px] overflow-hidden bg-[#FBF3E4]">
                    <img
                      src={travelerThumb}
                      alt={tPaper('printAlt')}
                      width={760}
                      height={980}
                      loading="eager"
                      fetchPriority="low"
                      className="block w-full"
                    />
                  </div>
                </div>
                <span className="hv6-chip mt-3 inline-flex">{tPaper('tagPrint')}</span>
              </div>
            </div>
            <p className="hv6-pen mt-3">{tPaper('penTraveler')}</p>

            {/* the making, shown not told: tiles drop, the rule sweeps */}
            <div className="hv9-make-tiles mt-6" aria-hidden="true">
              <ToolVignette variant="letter-tiles" />
            </div>
            <p className="hv6-pen mt-2">{t('penTiles')}</p>
          </div>
        </div>

        {/* a ten-frame fills on the seam into the share band */}
        <SeamInstrument variant="ten-frame" />
      </div>
    </section>
  );
}
