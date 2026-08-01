/* OpeningV6 (v6.1) — the Classroom Mobile masthead.

   The picture, not the pitch: a Calder-style mobile of the product's own
   working apparatus hangs in the dark masthead (ClassroomMobile.tsx), and
   the page's number-line spine drops from its worksheet. Text is on a
   strict diet — ONE H1 line, one sub, two CTAs, one micro-line. The H1 is
   server-rendered text and remains the LCP element.

   Desktop ≥1024: text block left (z2), sculpture absolute from the page
   centerline filling the right. Below 1024 the sculpture renders AFTER the
   text (relative, centered, CSS-pruned to four objects) — it compresses,
   it never vanishes. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import ClassroomMobile from './ClassroomMobile';

interface Props {
  locale: string;
  /** The traveler worksheet thumbnail — the hanging sheet IS the same deck
   *  the visitor meets again at Make / Print / Share. */
  travelerThumb: string;
}

export default async function OpeningV6({ locale, travelerThumb }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV6.hero' });

  return (
    <header
      className="hv6-masthead hv6-grain hv6-hero relative"
      style={{ overflowX: 'clip' }}
      data-testid="hero-section"
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-[2]">
        <div className="lg:min-h-[620px] flex items-center pt-12 pb-6 lg:py-0">
          {/* 400px cap at lg keeps the text clear of the hanging worksheet
              (which rides the page centerline); wider again from xl. */}
          <div className="max-w-[480px] lg:max-w-[400px] xl:max-w-[480px]">
            <h1 className="font-lcsDisplay font-bold leading-[1.08] tracking-tight text-[2.375rem] sm:text-[2.75rem] md:text-[3.25rem] text-lcs-cream">
              {t('h1')}
            </h1>
            <p className="mt-5 font-lcsBody text-base md:text-lg leading-relaxed text-[#DCEAE4]">
              {t('sub')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-center">
              <Link href={`/${locale}/tools`} className="hv6-cta hv6-cta-primary hv6-cta-lg whitespace-nowrap">
                {t('ctaTools')}
              </Link>
              <Link href={`/${locale}/worksheets/`} className="hv6-cta hv6-cta-cream hv6-cta-lg whitespace-nowrap">
                {t('ctaWorksheets')}
              </Link>
            </div>
            <p className="mt-6 font-lcsBody text-sm text-[#C3DBD3]">{t('microLine')}</p>
          </div>
        </div>
      </div>

      {/* The sculpture. Absolute (page centerline → right half) on desktop;
          in flow below the text on smaller screens. Rendered after the text
          so the mobile-viewport order is text → sculpture. */}
      <ClassroomMobile travelerThumb={travelerThumb} />
    </header>
  );
}
