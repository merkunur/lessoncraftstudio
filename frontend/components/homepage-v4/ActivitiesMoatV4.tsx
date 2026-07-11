/* Curriculum-aligned activities — professional rebuild (2026-07-11). Shows a
   grid of REAL activity preview images (from the live mini-tools previews) with
   their CCSS codes. Clean light ground. Copy reads homepageV4.activities. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface Props {
  locale: string;
}

const PREV = 'https://www.lessoncraftstudio.com/mini-tools/previews';

// Real activity previews (verified live) with their standard codes.
const ACTIVITIES = [
  { img: 'ten-frame.count-to-10.make-n.animals', label: 'Make a Number', code: 'K.CC.B.4' },
  { img: 'choice-board.which-more.k-c-c-6', label: 'Which Has More?', code: 'K.CC.C.6' },
  { img: 'choice-board.shape-id.k-g-a-2', label: 'Name the Shape', code: 'K.G.A.2' },
  { img: 'ten-frame.how-many.0-10.animals', label: 'How Many?', code: 'K.CC.B.5' },
  { img: 'choice-board.even-odd.2-oa-c-3', label: 'Even or Odd', code: '2.OA.C.3' },
  { img: 'choice-board.flat-solid.k-g-a-3', label: 'Flat or Solid', code: 'K.G.A.3' },
];

export default async function ActivitiesMoatV4({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV4.activities' });

  return (
    <section className="bg-[#FDFBF6] py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-10">
          <p className="hv5-eyebrow">{t('eyebrow')}</p>
          <h2 className="mt-3 font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">
            {t('heading')}
          </h2>
          <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {ACTIVITIES.map((a) => (
            <Link key={a.img} href={`/${locale}/activities`} className="group block hv5-card hover:-translate-y-0.5 transition-transform">
              <div className="bg-[#FBF3E4]">
                <img src={`${PREV}/${a.img}.webp`} alt={`${a.label} — interactive K-3 activity`} loading="lazy" width={480} height={300} className="block w-full h-auto" />
              </div>
              <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 border-t border-[#14322D]/8">
                <span className="font-lcsDisplay font-bold text-[#14322D] text-sm">{a.label}</span>
                <span className="font-mono text-[11px] font-semibold text-[#0E544A] bg-[#DDEAE5] rounded px-2 py-0.5 shrink-0">{a.code}</span>
              </div>
            </Link>
          ))}
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
      </div>
    </section>
  );
}
