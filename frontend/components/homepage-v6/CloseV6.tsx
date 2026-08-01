/* CloseV6 — the dark convergence panel. The oversized Baloo moment (the
   largest type on the page, reserved for here), the free-first promise,
   and the number line's arrowhead pointing down into the Class Index. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface Props {
  locale: string;
}

export default async function CloseV6({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV6.close' });

  return (
    <section id="close" className="relative">
      <div className="container mx-auto px-4 max-w-5xl pb-16 md:pb-20 text-center">
        {/* The wire ends the way a maker ends a piece: a stub of wire and a
            hand-tied loop. */}
        <div className="flex flex-col items-center" aria-hidden="true">
          <span className="hv6-wire-stub" />
          <svg width="54" height="64" viewBox="0 0 54 64" fill="none" stroke="#F5DFC2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M27 2v8m0 0c-9 0-16 6-16 14s7 14 16 14 16-6 16-14S36 10 27 10zm-8 34l-7 14m15-13l6 14" />
          </svg>
        </div>

        <h2 className="mt-8 font-lcsDisplay font-extrabold leading-[1.02] tracking-tight text-[2.5rem] sm:text-[3.25rem] md:text-[4.5rem] text-lcs-cream">
          <span className="block">{t('line1')}</span>
          <span className="block text-lcs-coral">{t('line2')}</span>
        </h2>
        <p className="mt-6 font-lcsBody text-lg leading-relaxed text-[#DCEAE4] max-w-2xl mx-auto">
          {t('body')}
        </p>

        {/* The last hanging object: the signup CTA on its own cream tag. */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-start">
          <div
            className="hv6-tag-cta hv6-hang is-sway is-sm"
            style={{ '--drop': '40px', '--rest': '-1.5deg', '--rest-sm': '-1.5deg', '--period': '13s', '--amp': '1.4deg', '--phase': '-4s' } as React.CSSProperties}
          >
            <Link href={`/${locale}/auth/signup`} className="hv6-cta hv6-cta-primary hv6-cta-lg">
              {t('ctaPrimary')}
            </Link>
          </div>
          <Link href={`/${locale}/worksheets/`} className="hv6-cta hv6-cta-cream hv6-cta-lg sm:mt-10">
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
