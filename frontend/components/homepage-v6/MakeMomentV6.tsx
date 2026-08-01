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
    <section id="make" className="pt-24 md:pt-32 pb-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="hv6-mark mb-12 md:mb-16">
          <span className="hv6-bead" aria-hidden="true">3</span>
          <span className="hv6-hang hv6-sign-hang">
            <span className="hv6-sign">{tTicks('make')}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
          {/* The real maker — a hung SCREEN (two threads, dead level). */}
          <div className="order-2 lg:order-1 hv6-hang2" style={{ '--drop': '60px' } as React.CSSProperties}>
            <div className="rounded-2xl overflow-hidden border border-[#14322D]/8 shadow-[0_30px_60px_-22px_rgba(0,0,0,0.55)] bg-white">
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
          </div>

          <div className="order-1 lg:order-2 hv6-paper hv6-hang2 is-vee" style={{ '--drop': '56px' } as React.CSSProperties}>
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

      {/* The traveler is born — clothespinned straight onto the wire. */}
      <div className="hv6-strung">
        <div
          className="hv6-hang is-sway is-sm relative"
          style={{ '--drop': '34px', '--rest': '-1.5deg', '--period': '21s', '--amp': '1deg', '--phase': '-9s' } as React.CSSProperties}
        >
          <span className="hv6-peg" aria-hidden="true" />
          <div className="hv6-card w-[150px]">
            <img src={travelerThumb} alt={t('penTraveler')} width={480} height={620} loading="lazy" />
          </div>
        </div>
        <span className="hv6-slip"><span className="hv6-pen">{t('penTraveler')}</span></span>
      </div>
    </section>
  );
}
