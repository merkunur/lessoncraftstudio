/* OpeningV6 — the Lesson Line masthead. The claim + a WORKING CSS rekenrek
   on a stage card. Zero images above the fold: the LCP candidate is the H1
   itself. The number line begins beneath this panel (the .hv6-thread).

   H1 = three sentences, one per line, leading verb in coral — the same three
   verbs that reappear as tick coins down the page (Teach / Practice / Print).
   The verb split is display-only (first word); the full sentence lives intact
   in the i18n string, so screen readers and crawlers read natural prose. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import ToolVignette from './ToolVignette';

interface Props {
  locale: string;
}

function VerbLine({ text }: { text: string }) {
  const space = text.indexOf(' ');
  if (space < 1) return <span className="block">{text}</span>;
  return (
    <span className="block">
      <span className="text-lcs-coral">{text.slice(0, space)}</span>
      {text.slice(space)}
    </span>
  );
}

export default async function OpeningV6({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV6.hero' });

  return (
    <header className="hv6-masthead hv6-grain hv6-hero" data-testid="hero-section">
      <div className="container mx-auto px-4 max-w-6xl pt-14 pb-24 md:pt-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-16 items-center">
          {/* The claim */}
          <div>
            <h1 className="font-lcsDisplay font-bold leading-[1.06] tracking-tight text-[2.25rem] sm:text-[2.875rem] md:text-[3.5rem] text-lcs-cream">
              <VerbLine text={t('h1a')} />
              <VerbLine text={t('h1b')} />
              <VerbLine text={t('h1c')} />
            </h1>
            <p className="mt-6 font-lcsBody text-base md:text-lg leading-relaxed text-[#DCEAE4] max-w-xl">
              {t('sub')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`/${locale}/tools`} className="hv6-cta hv6-cta-primary hv6-cta-lg">
                {t('ctaTools')}
              </Link>
              <Link href={`/${locale}/worksheets/`} className="hv6-cta hv6-cta-cream hv6-cta-lg">
                {t('ctaWorksheets')}
              </Link>
            </div>
            <p className="mt-6 font-lcsBody text-sm text-[#C3DBD3]">{t('microLine')}</p>
          </div>

          {/* The working rekenrek — pure CSS, no image, no iframe. */}
          <div className="hidden sm:flex flex-col items-center gap-3">
            <div className="hv6-stage w-full max-w-[430px]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-lcsDisplay font-bold text-lg text-lcs-teal">{t('stageLabel')}</span>
              </div>
              <ToolVignette variant="rekenrek" bare />
            </div>
            <p className="hv6-pen text-[#F5B08E]">{t('penRekenrek')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
