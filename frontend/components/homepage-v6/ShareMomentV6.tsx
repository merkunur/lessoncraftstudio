/* ShareMomentV6 — tick 5: from your screen to 25 kids in one second.
   One link, one QR, any device, no student accounts. The traveler
   worksheet makes its final appearance — now in the class's hands. */

import { getTranslations } from 'next-intl/server';

interface Props {
  locale: string;
  travelerThumb: string;
}

export default async function ShareMomentV6({ locale, travelerThumb }: Props) {
  const [t, tTicks] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.share' }),
    getTranslations({ locale, namespace: 'homepageV6.ticks' }),
  ]);

  const chips = [t('chip1'), t('chip2'), t('chip3'), t('chip4')];

  return (
    <section id="share" className="pt-10 md:pt-12 pb-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="hv6-tick mb-8 md:mb-10">
          <span className="hv6-tick-coin">5</span>
          <span className="hv6-tick-verb">{tTicks('share')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div className="lg:pr-10">
            <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.375rem] md:text-[2.75rem]">
              {t('heading')}
            </h2>
            <p className="mt-5 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <span key={c} className="hv6-chip">{c}</span>
              ))}
            </div>
          </div>

          {/* The share card: the traveler + a real QR. */}
          <div className="flex flex-col items-center gap-4">
            <div className="hv6-stage w-full max-w-[420px]">
              <div className="flex items-center gap-5">
                <div className="hv6-card hv6-traveler w-[46%] shrink-0">
                  <img src={travelerThumb} alt={t('penTraveler')} width={480} height={620} loading="lazy" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-3">
                  <img
                    src="/homepage/qr.png"
                    alt={t('qrAlt')}
                    width={132}
                    height={132}
                    loading="lazy"
                    className="rounded-xl border border-[#14322D]/10"
                  />
                  <svg className="text-lcs-coral" width="46" height="22" viewBox="0 0 46 22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M44 11H4M10 3l-8 8 8 8" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="hv6-pen">{t('penTraveler')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
