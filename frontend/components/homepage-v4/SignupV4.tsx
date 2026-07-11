/* Closing CTA — professional rebuild (2026-07-11). A clean deep-teal band that
   sells the Teacher plan (no cartoon, no doodles). Copy reads homepageV4.close. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface Props {
  locale: string;
}

export default async function SignupV4({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV4.close' });
  const chips = ['trust1', 'trust2', 'trust3', 'trust4', 'trust5', 'trust6'] as const;

  return (
    <section className="hv5-ground-ink py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="font-lcsDisplay font-bold text-[#FBF3E4] leading-[1.04] tracking-[-0.02em] text-[2rem] sm:text-[2.75rem] md:text-[3.25rem]">
          {t('h2Line1')} {t('h2Line2')}
        </h2>
        <p className="mt-5 font-lcsBody text-lg md:text-xl text-[#FBF3E4]/85 leading-relaxed max-w-2xl mx-auto">
          {t('body')}
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}/pricing`} className="hv5-cta hv5-cta-primary hv5-cta-lg">
            {t('ctaPrimary')}
            <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10h10M11 5l5 5-5 5" /></svg>
          </Link>
          <Link href={`/${locale}/worksheets/`} className="hv5-cta hv5-cta-cream hv5-cta-lg">
            {t('ctaSecondary')}
          </Link>
        </div>

        <ul aria-label={t('trustAria')} className="mt-10 flex flex-wrap justify-center gap-2.5">
          {chips.map((k) => (
            <li key={k} className="hv5-chip-mono on-dark">{t(k)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
