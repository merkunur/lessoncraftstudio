/* BothWaysV6 — tick 4, the short proof band: every worksheet is also paper.
   Not some of them. All of them. The traveler worksheet appears twice —
   playing in the browser, and as its printed twin — with the pen note that
   carries the whole page's argument: "still the same sheet". */

import { getTranslations } from 'next-intl/server';

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

export default async function BothWaysV6({ locale, travelerThumb }: Props) {
  const [t, tTicks] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.paper' }),
    getTranslations({ locale, namespace: 'homepageV6.ticks' }),
  ]);

  const imgBase = locale === 'en' ? '/homepage' : `/homepage/${locale}`;

  return (
    <section id="both-ways" className="pt-24 md:pt-32 pb-6">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="hv6-mark mb-12 md:mb-16">
          <span className="hv6-bead" aria-hidden="true">4</span>
          <span className="hv6-hang hv6-sign-hang">
            <span className="hv6-sign">{tTicks('paper')}</span>
          </span>
        </div>

        {/* Header paper hangs LEFT of the wire. */}
        <div
          className="hv6-paper hv6-hang2 is-vee max-w-3xl lg:max-w-[46%] mb-14 md:mb-20"
          style={{ '--drop': '56px' } as React.CSSProperties}
        >
          <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.375rem] md:text-[2.75rem]">
            {t('heading')}
          </h2>
          <p className="mt-5 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
        </div>

        {/* The twins hang from a crossbar branch spanning the wire. */}
        <div className="hv6-branch" aria-hidden="true" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-start pt-12 md:pt-16">
          <div className="hv6-hang" style={{ '--drop': '44px', '--rest': '-1deg' } as React.CSSProperties}>
            <div className="hv6-card">
              <Chrome url="lessoncraftstudio.com/play/…" />
              <div className="max-h-[340px] overflow-hidden bg-white">
                <img
                  src={`${imgBase}/interactive-play.webp`}
                  alt={t('playAlt')}
                  width={760}
                  height={1120}
                  loading="lazy"
                  className="block w-full"
                />
              </div>
            </div>
            <span className="hv6-chip on-dark mt-4 inline-flex">{t('tagPlay')}</span>
          </div>
          <div className="hv6-hang" style={{ '--drop': '68px', '--rest': '1.2deg' } as React.CSSProperties}>
            <div className="hv6-card">
              <Chrome url="worksheet.pdf" />
              <div className="max-h-[340px] overflow-hidden bg-[#FBF3E4]">
                <img
                  src={travelerThumb}
                  alt={t('printAlt')}
                  width={760}
                  height={980}
                  loading="lazy"
                  className="block w-full"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <span className="hv6-chip on-dark">{t('tagPrint')}</span>
              <span className="hv6-pen on-dark">{t('penTraveler')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
