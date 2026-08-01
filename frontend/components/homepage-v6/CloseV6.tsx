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
    <section id="close" className="hv6-rise-dark hv6-grain relative">
      <div className="container mx-auto px-4 max-w-5xl pt-20 pb-16 md:pt-28 md:pb-20 text-center">
        <h2 className="font-lcsDisplay font-extrabold leading-[1.02] tracking-tight text-[2.5rem] sm:text-[3.25rem] md:text-[4.5rem] text-lcs-cream">
          <span className="block">{t('line1')}</span>
          <span className="block text-lcs-coral">{t('line2')}</span>
        </h2>
        <p className="mt-6 font-lcsBody text-lg leading-relaxed text-[#DCEAE4] max-w-2xl mx-auto">
          {t('body')}
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={`/${locale}/auth/signup`} className="hv6-cta hv6-cta-primary hv6-cta-lg">
            {t('ctaPrimary')}
          </Link>
          <Link href={`/${locale}/worksheets/`} className="hv6-cta hv6-cta-cream hv6-cta-lg">
            {t('ctaSecondary')}
          </Link>
        </div>

        {/* The line's arrowhead — every classroom number line ends pointing
            onward, here into the Class Index below. */}
        <div className="hv6-arrowhead mt-14" aria-hidden="true">
          <svg width="30" height="44" viewBox="0 0 30 44" fill="none" stroke="#FBF3E4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
            <path d="M15 0v32M4 24l11 12 11-12" />
          </svg>
        </div>
      </div>
    </section>
  );
}
