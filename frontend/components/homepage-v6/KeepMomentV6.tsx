/* KeepMomentV6 — plan a lesson, keep a year. The quiet-facts moment: the
   ONLY place multilingual/curriculum breadth appears, as muted honest chips
   in a caption row — never a headline, never a bar chart. */

import { getTranslations } from 'next-intl/server';

interface Props {
  locale: string;
}

export default async function KeepMomentV6({ locale }: Props) {
  const [t, tRoot] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.keep' }),
    getTranslations({ locale, namespace: 'homepageV6' }),
  ]);

  const chips = [t('chipCurricula'), t('chipLanguages'), t('chipNoData'), t('chipNoAds')];

  return (
    <section id="keep" className="pt-12 md:pt-16 pb-16 md:pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Right half on desktop — the line stays clear to its left. */}
        <div className="max-w-3xl lg:max-w-[47%] lg:ml-auto lg:pl-2">
          <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.375rem] md:text-[2.75rem]">
            {t('heading')}
          </h2>
          {/* Honest attribution: saving + collections are Teacher-plan
              features (requireActiveSubscriber on collections/workspace). */}
          <span className="hv6-chip-mono mt-3 inline-flex">{tRoot('planTag')}</span>
          <p className="mt-5 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {chips.map((c) => (
              <span key={c} className="hv6-chip-quiet">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
