/* Curriculum-aligned activities — professional rebuild (2026-07-11). Shows a
   grid of REAL activity preview images (from the live mini-tools previews) with
   their CCSS codes. Clean light ground. Copy reads homepageV4.activities. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface Props {
  locale: string;
}

const PREV = 'https://www.lessoncraftstudio.com/mini-tools/previews';

// Real activity previews (verified live) with their standard codes. Card titles
// are localized via homepageV4.activities.label1..6 (the labelKey index).
const ACTIVITIES = [
  { img: 'ten-frame.count-to-10.make-n.animals', labelKey: 'label1', code: 'K.CC.B.4' },
  { img: 'choice-board.which-more.k-c-c-6', labelKey: 'label2', code: 'K.CC.C.6' },
  { img: 'choice-board.shape-id.k-g-a-2', labelKey: 'label3', code: 'K.G.A.2' },
  { img: 'ten-frame.how-many.0-10.animals', labelKey: 'label4', code: 'K.CC.B.5' },
  { img: 'choice-board.even-odd.2-oa-c-3', labelKey: 'label5', code: '2.OA.C.3' },
  { img: 'choice-board.flat-solid.k-g-a-3', labelKey: 'label6', code: 'K.G.A.3' },
];

export default async function ActivitiesMoatV4({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV4.activities' });

  return (
    <section className="bg-[#F0F4F0] hv5-paper-rise-sm py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-10">
          <p className="hv5-eyebrow">{t('eyebrow')}</p>
          <h2 className="mt-3 font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">
            {t('heading')}
          </h2>
          <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {ACTIVITIES.map((a) => {
            const label = t(a.labelKey);
            return (
              <Link key={a.img} href={`/${locale}/activities`} className="group block hv5-card">
                <div className="bg-[#FBF3E4]">
                  <img src={`${PREV}/${a.img}.webp`} alt={t('altTemplate', { label })} loading="lazy" width={480} height={300} className="block w-full h-auto" />
                </div>
                <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 border-t border-[#14322D]/8">
                  <span className="font-lcsDisplay font-bold text-[#14322D] text-sm">{label}</span>
                  <span className="hv5-chip-mono shrink-0">{a.code}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="font-lcsBody text-sm text-[#3d574f]">{t('manipLabel')}</span>
          {[t('manip1'), t('manip2'), t('manip3')].map((m) => (
            <Link key={m} href={`/${locale}/tools`} className="inline-flex items-center rounded-full bg-[#EAF2EF] px-3.5 py-1.5 font-lcsDisplay font-semibold text-sm text-[#146B5E] hover:bg-[#DDEAE5] transition-colors">
              {m}
            </Link>
          ))}
        </div>

        <div className="mt-9">
          <Link href={`/${locale}/activities`} className="hv5-cta hv5-cta-primary text-base px-7 py-3.5">
            {t('cta')}
            <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10h10M11 5l5 5-5 5" /></svg>
          </Link>
        </div>

        {/* Subscriber share-with-your-class callout. */}
        <div className="mt-10 rounded-2xl border border-[#146B5E]/15 bg-white p-6 md:p-7 shadow-[var(--e1)] flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF2EF] text-[#146B5E]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-lcsDisplay font-bold text-[#14322D] text-lg">{t('shareTitle')}</p>
              <span className="hv5-chip-mono shrink-0">{t('shareTag')}</span>
            </div>
            <p className="mt-1 font-lcsBody text-[15px] text-[#3d574f] leading-relaxed">{t('shareBody')}</p>
          </div>
          <Link href={`/${locale}/pricing`} className="shrink-0 font-lcsBody text-sm font-semibold text-[#146B5E] underline underline-offset-4 hover:text-lcs-coral whitespace-nowrap">
            {t('shareLink')}
          </Link>
        </div>
      </div>
    </section>
  );
}
