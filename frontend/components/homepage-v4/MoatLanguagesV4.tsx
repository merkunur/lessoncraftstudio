/* The multilingual + national-framework moat — professional rebuild
   (2026-07-11). Clean data panel: real per-locale published-deck counts as a
   credible chart, plus the national frameworks and the grammar proof. No fake
   illustration. Copy reads homepageV4.moat. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface Props {
  locale: string;
}

// Verified live per-locale published-deck counts (DB, 2026-07-11).
const LANGS: Array<{ name: string; count: number }> = [
  { name: 'English', count: 5970 },
  { name: 'Português', count: 4211 },
  { name: 'Español', count: 4176 },
  { name: 'Dansk', count: 3930 },
  { name: 'Italiano', count: 3915 },
  { name: 'Norsk', count: 3908 },
  { name: 'Svenska', count: 3867 },
  { name: 'Français', count: 3846 },
  { name: 'Deutsch', count: 3840 },
  { name: 'Nederlands', count: 3832 },
  { name: 'Suomi', count: 3814 },
];

export default async function MoatLanguagesV4({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'homepageV4.moat' });
  const max = Math.max(...LANGS.map((l) => l.count));

  return (
    <section className="bg-[#FDFBF6] py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <p className="hv5-eyebrow">{t('eyebrow')}</p>
            <h2 className="mt-3 font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">
              {t('heading')}
            </h2>
            <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>

            <p className="mt-7 hv5-eyebrow">{t('frameworksLabel')}</p>
            <p className="mt-2 font-lcsBody text-sm md:text-[15px] text-[#3d574f] leading-relaxed">{t('frameworks')}</p>
            <p className="mt-5 font-lcsBody text-sm md:text-[15px] text-[#3d574f] leading-relaxed border-l-2 border-lcs-coral pl-4">{t('grammarNote')}</p>

            <div className="mt-8">
              <Link href={`/${locale}/worksheets/`} className="hv5-cta hv5-cta-ghost text-base px-6 py-3">
                {t('cta')}
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10h10M11 5l5 5-5 5" /></svg>
              </Link>
            </div>
          </div>

          {/* Credible per-language data panel */}
          <div className="rounded-2xl border border-[#14322D]/8 bg-white p-6 md:p-8 shadow-[0_18px_40px_-24px_rgba(20,50,45,0.3)]">
            <div className="flex items-baseline justify-between mb-5">
              <span className="font-lcsDisplay font-bold text-[#14322D] text-base">{t('panelTitle')}</span>
              <span className="font-lcsBody text-sm"><span className="font-lcsDisplay font-extrabold text-[#146B5E] text-lg">45,309</span> {t('panelTotal')}</span>
            </div>
            <ul className="space-y-2.5">
              {LANGS.map((l) => (
                <li key={l.name} className="grid grid-cols-[68px_1fr_auto] sm:grid-cols-[92px_1fr_auto] items-center gap-2 sm:gap-3">
                  <span className="font-lcsBody text-xs sm:text-sm font-semibold text-[#14322D] truncate">{l.name}</span>
                  <span className="relative h-2.5 rounded-full bg-[#146B5E]/10 overflow-hidden">
                    <span className="absolute inset-y-0 left-0 rounded-full bg-[#146B5E]" style={{ width: `${Math.round((l.count / max) * 100)}%` }} />
                  </span>
                  <span className="font-lcsBody text-xs text-[#3d574f] tabular-nums">{l.count.toLocaleString('en-US')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
