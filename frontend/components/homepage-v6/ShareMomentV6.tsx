/* ShareMomentV6 (v8 "Open House") — one link, one QR, 25 kids. The arrow
   terminates at visible objects on BOTH ends (the sheet and the QR):
   no orphan geometry. Personal links are honestly tagged Teacher-plan. */

import { getTranslations } from 'next-intl/server';

interface Props {
  locale: string;
  travelerThumb: string;
}

export default async function ShareMomentV6({ locale, travelerThumb }: Props) {
  const [t, tRoot] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.share' }),
    getTranslations({ locale, namespace: 'homepageV6' }),
  ]);

  const chips = [t('chip1'), t('chip2'), t('chip3'), t('chip4')];

  return (
    <section id="share" className="pt-12 md:pt-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.25rem] md:text-[2.5rem]">
              {t('heading')}
            </h2>
            {/* Honest attribution: personal share links/QR are Teacher-plan. */}
            <span className="hv6-chip-mono mt-3 inline-flex">{tRoot('planTag')}</span>
            <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <span key={c} className="hv6-chip">{c}</span>
              ))}
            </div>
          </div>

          {/* sheet → arrow → QR: the whole mechanic in one look. Fixed
              widths (flex-none) so neither artifact can inflate or crush
              the other. */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            <span
              className="hv7-sheet hv7-tilt-c hv7-lift flex-none"
              style={{ width: 'clamp(190px, 20vw, 280px)' }}
            >
              <img src={travelerThumb} alt={t('penTraveler')} width={480} height={620} loading="lazy" />
            </span>
            <svg
              className="text-lcs-coral shrink-0 hidden sm:block"
              width="56"
              height="26"
              viewBox="0 0 56 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 13h50M42 4l12 9-12 9" />
            </svg>
            <div className="hv6-card hv7-tilt-b hv7-lift p-3 flex-none w-[190px]">
              <img
                src="/homepage/qr.png"
                alt={t('qrAlt')}
                width={164}
                height={164}
                loading="lazy"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
        <p className="hv6-pen mt-4 lg:text-right">{t('penTraveler')}</p>
      </div>
    </section>
  );
}
