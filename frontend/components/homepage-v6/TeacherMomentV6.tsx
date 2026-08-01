/* TeacherMomentV6 — free is really free. Pricing arrives only after the
   whole story, in a plain unpressured voice; the free promise stays the
   primary action even here. Gated on PRICING_PUBLIC (the documented
   one-commit rollback lever); prices interpolate from the product config
   (never hardcoded in messages — the $69 dual-source lesson). */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';

interface Props {
  locale: string;
}

export default async function TeacherMomentV6({ locale }: Props) {
  if (!PRICING_PUBLIC) return null;

  const t = await getTranslations({ locale, namespace: 'homepageV6.teacher' });

  const freeBullets = [t('free1'), t('free2'), t('free3'), t('free4')];
  const teacherBullets = [t('teacher1'), t('teacher2'), t('teacher3'), t('teacher4')];

  const Check = ({ dark = false }: { dark?: boolean }) => (
    <svg
      className={`w-4 h-4 mt-1 shrink-0 ${dark ? 'text-[#F5B08E]' : 'text-lcs-teal'}`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );

  return (
    <section id="plans" className="pt-24 md:pt-32 pb-24 md:pb-32">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header paper hangs LEFT of the wire. */}
        <div
          className="hv6-paper hv6-hang2 is-vee max-w-3xl lg:max-w-[46%] mb-14 md:mb-20"
          style={{ '--drop': '56px' } as React.CSSProperties}
        >
          <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.375rem] md:text-[2.75rem]">
            {t('heading')}
          </h2>
          <p className="mt-5 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
        </div>

        {/* Two PRICE TAGS hanging from a wide branch across the wire — the
            hero's gift tag, grown up twice. Counter-phased sway. */}
        <div className="hv6-branch" aria-hidden="true" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start pt-12 md:pt-16">
          {/* Free — start here. */}
          <div
            className="hv6-tag-price hv6-hang is-sway is-sm rounded-3xl bg-white border border-[#14322D]/8 shadow-[0_30px_60px_-22px_rgba(0,0,0,0.55)] p-7 md:p-8 flex flex-col"
            style={{ '--drop': '52px', '--rest': '-2deg', '--rest-sm': '-1.5deg', '--period': '23s', '--amp': '1.2deg', '--phase': '-6s' } as React.CSSProperties}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-lcsDisplay font-bold text-2xl text-[#14322D]">{t('freeTitle')}</p>
              <span className="hv6-chip">{t('freeTag')}</span>
            </div>
            <ul className="mt-6 space-y-3 flex-1">
              {freeBullets.map((b) => (
                <li key={b} className="flex gap-3 font-lcsBody text-[15px] text-[#3d574f]">
                  <Check />
                  {b}
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/auth/signup`} className="hv6-cta hv6-cta-ghost mt-7 px-6 py-3.5 text-base w-full">
              {t('freeCta')}
            </Link>
          </div>

          {/* Teacher. */}
          <div
            className="hv6-tag-price is-teacher hv6-hang is-sway is-sm rounded-3xl bg-[#14322D] text-lcs-cream shadow-[0_34px_64px_-22px_rgba(0,0,0,0.6)] p-7 md:p-8 flex flex-col"
            style={{ '--drop': '76px', '--rest': '1.5deg', '--rest-sm': '1deg', '--period': '19s', '--amp': '1.5deg', '--phase': '-13s' } as React.CSSProperties}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-lcsDisplay font-bold text-2xl">{t('teacherTitle')}</p>
              <div className="text-right">
                <p className="font-lcsDisplay font-bold text-xl">
                  {t('teacherPrice', { price: SUBSCRIPTION_PRODUCT.priceUsd })}
                </p>
                <p className="font-lcsBody text-xs text-[#C3DBD3]">
                  {t('teacherMonthly', { monthly: SUBSCRIPTION_PRODUCT.monthlyPriceUsd })}
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 flex-1">
              {teacherBullets.map((b) => (
                <li key={b} className="flex gap-3 font-lcsBody text-[15px] text-[#DCEAE4]">
                  <Check dark />
                  {b}
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/pricing`} className="hv6-cta hv6-cta-primary mt-7 px-6 py-3.5 text-base w-full">
              {t('teacherCta')}
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center font-lcsBody text-sm text-[#C3DBD3]">{t('reassure')}</p>
      </div>
    </section>
  );
}
