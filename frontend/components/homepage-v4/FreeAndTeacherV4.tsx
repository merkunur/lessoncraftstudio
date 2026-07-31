/* Free -> Teacher — professional rebuild (2026-07-11). Clean light ground, a
   refined two-column comparison (generous free vs the Teacher plan). Honest
   framing; price anchored to the makers' worth. Copy in homepageV4.freeTeacher.
   Renders only when PRICING_PUBLIC (pre-flip safety). */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import { MAKER_COUNT } from '@/lib/seo/maker-content';

interface Props {
  locale: string;
}

function Check({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l3.5 3.5L16 5.5" /></svg>
  );
}

export default async function FreeAndTeacherV4({ locale }: Props) {
  if (!PRICING_PUBLIC) return null;
  const t = await getTranslations({ locale, namespace: 'homepageV4.freeTeacher' });

  const freeItems = ['free1', 'free2', 'free3', 'free4'] as const;
  const teacherItems = ['teacher1', 'teacher2', 'teacher3', 'teacher4', 'teacher5', 'teacher6', 'teacher7'] as const;

  return (
    <section id="free-and-teacher" className="bg-[#FDFBF6] py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-10 md:mb-12">
          <p className="hv5-eyebrow">{t('eyebrow')}</p>
          <h2 className="mt-3 font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">
            {t('heading')}
          </h2>
          <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 items-stretch">
          {/* FREE */}
          <div className="rounded-2xl border border-[#14322D]/8 bg-white p-7 md:p-8 flex flex-col shadow-[var(--e1)]">
            <h3 className="font-lcsDisplay font-bold text-[#14322D] text-lg md:text-xl">{t('freeTitle')}</h3>
            <ul className="mt-6 space-y-3.5 font-lcsBody text-base text-[#3d574f]">
              {freeItems.map((k) => (
                <li key={k} className="flex items-start gap-3"><Check className="text-[#146B5E] mt-0.5 shrink-0" /><span>{t(k, { count: MAKER_COUNT })}</span></li>
              ))}
            </ul>
            <p className="mt-6 font-lcsBody text-sm text-[#3d574f] leading-relaxed border-l-2 border-[#146B5E]/30 pl-4">{t('framing')}</p>
            <div className="mt-auto pt-7">
              <Link href={`/${locale}/auth/signup`} className="hv5-cta hv5-cta-ghost w-full text-base px-6 py-3.5">{t('ctaSecondary')}</Link>
            </div>
          </div>

          {/* TEACHER */}
          <div className="relative rounded-2xl bg-[#14322D] text-white p-7 md:p-8 flex flex-col shadow-[var(--e3)]">
            <span className="absolute -top-3.5 left-7 rounded-full bg-lcs-coral text-white font-lcsDisplay font-bold text-[13px] px-3.5 py-1.5 shadow-[0_6px_14px_-4px_rgba(217,99,58,0.55)]">{t('badge')}</span>
            <div className="flex items-baseline justify-between">
              <h3 className="font-lcsDisplay font-bold text-white text-lg md:text-xl">{t('teacherTitle')}</h3>
              <p className="flex items-baseline gap-1.5">
                <span className="font-lcsDisplay font-extrabold text-white text-3xl md:text-4xl">{t('price')}</span>
                <span className="font-lcsBody text-white/70 text-sm">/ {t('priceSuffix')}</span>
              </p>
            </div>
            <p className="mt-1 text-right font-lcsBody text-sm text-white/60">{t('priceMonthly')}</p>

            <p className="mt-5 font-lcsBody font-semibold text-white/80 text-xs uppercase tracking-wider">{t('includedTitle')}</p>
            <ul className="mt-3 space-y-3 font-lcsBody text-[15px] text-white/90">
              {teacherItems.map((k) => (
                <li key={k} className="flex items-start gap-3"><Check className="text-lcs-coral mt-0.5 shrink-0" /><span>{t(k)}</span></li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <p className="font-lcsBody text-[15px] text-lcs-coral-soft mb-4">{t('anchorLine')}</p>
              <Link href={`/${locale}/pricing`} className="hv5-cta hv5-cta-primary hv5-cta-lg w-full">
                {t('ctaPrimary')}
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10h10M11 5l5 5-5 5" /></svg>
              </Link>
              <p className="mt-3 font-lcsBody text-xs text-white/60">{t('reassure1')} · {t('reassure2')} · {t('reassure3')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
