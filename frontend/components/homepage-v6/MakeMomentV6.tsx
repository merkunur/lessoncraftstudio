/* MakeMomentV6 — tick 3: make it exactly right for your class.

   The real maker UI (per-locale screenshot) beside the one-build → two-
   outputs fork drawn on the line. The traveler artifact is born here: the
   worksheet the visitor will meet again in the Print and Share moments,
   each time with the teacher's-pen note. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MAKER_COUNT } from '@/lib/seo/maker-content';

interface Props {
  locale: string;
  /** The traveler worksheet thumbnail (same asset reappears at Print + Share). */
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
  const [t, tTicks] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.make' }),
    getTranslations({ locale, namespace: 'homepageV6.ticks' }),
  ]);

  // Per-locale product screenshots; EN keeps the unprefixed /homepage/*.webp.
  const imgBase = locale === 'en' ? '/homepage' : `/homepage/${locale}`;

  return (
    <section id="make" className="pt-10 md:pt-12 pb-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="hv6-tick mb-8 md:mb-10">
          <span className="hv6-tick-coin">3</span>
          <span className="hv6-tick-verb">{tTicks('make')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
          {/* The real maker, in browser chrome. */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-[#14322D]/8 shadow-[var(--e3)] bg-white">
              <Chrome url="lessoncraftstudio.com/worksheet-makers" />
              <div className="bg-[#F4F2EC] max-h-[420px] overflow-hidden">
                <img
                  src={`${imgBase}/maker.webp`}
                  alt={t('makerAlt')}
                  width={1400}
                  height={1349}
                  loading="lazy"
                  className="block w-full h-auto"
                />
              </div>
            </div>

            {/* The traveler is born. */}
            <div className="mt-8 flex items-end gap-5">
              <div className="hv6-card hv6-traveler w-[150px] shrink-0">
                <img src={travelerThumb} alt={t('penTraveler')} width={480} height={620} loading="lazy" />
              </div>
              <p className="hv6-pen pb-2">{t('penTraveler')}</p>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pt-4 lg:pl-8">
            <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.375rem] md:text-[2.75rem]">
              {t('heading')}
            </h2>
            <p className="mt-5 font-lcsBody text-lg text-[#3d574f] leading-relaxed">
              {t('body', { count: MAKER_COUNT })}
            </p>

            {/* One build → two outputs: the fork sits on the line. */}
            <p className="mt-8 hv6-eyebrow">{t('forkLabel')}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <span className="hv6-fork-btn hv6-fork-play">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {t('forkPlay')}
              </span>
              <span className="hv6-fork-btn hv6-fork-print">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z" />
                </svg>
                {t('forkPrint')}
              </span>
            </div>

            <p className="mt-6 font-lcsBody text-sm text-[#3d574f]">{t('caption', { count: MAKER_COUNT })}</p>
            <div className="mt-7">
              <Link href={`/${locale}/worksheet-makers/`} className="hv6-cta hv6-cta-primary text-base px-7 py-3.5">
                {t('cta')}
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
