/* TeacherMomentV6 (v8 "Open House") — the plan cards in daylight. Both
   cards are white; the Teacher card carries a slim deep-teal header strip
   (dark ≈4% of the viewport). A stack of real worksheets keeps product
   mass in the pricing viewport. Honest claims; prices from config;
   PRICING_PUBLIC gate unchanged. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import type { ShowcaseDeck } from '@/lib/showcase-decks';

interface Props {
  locale: string;
  /** 3 decks for the product-mass stack beside the cards. */
  stackDecks?: ShowcaseDeck[];
}

function titleFor(deck: ShowcaseDeck): string {
  const titleMap = (deck.title ?? {}) as Record<string, string>;
  return titleMap[deck.language] || deck.slug;
}

export default async function TeacherMomentV6({ locale, stackDecks = [] }: Props) {
  if (!PRICING_PUBLIC) return null;

  const t = await getTranslations({ locale, namespace: 'homepageV6.teacher' });

  const freeBullets = [t('free1'), t('free2'), t('free3'), t('free4')];
  const teacherBullets = [t('teacher1'), t('teacher2'), t('teacher3'), t('teacher4')];

  const Check = () => (
    <svg
      className="w-4 h-4 mt-1 shrink-0 text-lcs-teal"
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
    <section id="plans" className="pt-8 md:pt-10 pb-10 md:pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.25rem] md:text-[2.5rem]">
            {t('heading')}
          </h2>
          <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">{t('body')}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr_minmax(280px,380px)] gap-6 md:gap-8 items-start">
          {/* Free. */}
          <div className="rounded-3xl bg-white border border-[#14322D]/8 shadow-[var(--e2)] p-7 flex flex-col hv7-lift">
            <div className="flex items-center justify-between gap-3">
              <p className="font-lcsDisplay font-bold text-2xl text-[#14322D]">{t('freeTitle')}</p>
              <span className="hv6-chip">{t('freeTag')}</span>
            </div>
            <ul className="mt-5 space-y-3 flex-1">
              {freeBullets.map((b) => (
                <li key={b} className="flex gap-3 font-lcsBody text-[15px] text-[#3d574f]">
                  <Check />
                  {b}
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/auth/signup`} className="hv6-cta hv6-cta-ghost mt-6 px-6 py-3.5 text-base w-full">
              {t('freeCta')}
            </Link>
          </div>

          {/* Teacher — white with a slim teal header strip. */}
          <div className="rounded-3xl bg-white border border-[#14322D]/8 shadow-[var(--e3)] flex flex-col overflow-hidden hv7-lift">
            <div className="bg-[#0E544A] text-lcs-cream px-7 py-4 flex items-center justify-between gap-3">
              <p className="font-lcsDisplay font-bold text-2xl">{t('teacherTitle')}</p>
              <div className="text-right">
                <p className="font-lcsDisplay font-bold text-lg leading-tight">
                  {t('teacherPrice', { price: SUBSCRIPTION_PRODUCT.priceUsd })}
                </p>
                <p className="font-lcsBody text-xs text-[#C3DBD3]">
                  {t('teacherMonthly', { monthly: SUBSCRIPTION_PRODUCT.monthlyPriceUsd })}
                </p>
              </div>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <ul className="space-y-3 flex-1">
                {teacherBullets.map((b) => (
                  <li key={b} className="flex gap-3 font-lcsBody text-[15px] text-[#3d574f]">
                    <Check />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/pricing`} className="hv6-cta hv6-cta-primary mt-6 px-6 py-3.5 text-base w-full">
                {t('teacherCta')}
              </Link>
            </div>
          </div>

          {/* Product mass in the pricing viewport: three real worksheets. */}
          <div className="hv7-keepstack" aria-hidden="true">
            {stackDecks.slice(0, 3).map((deck, i) => (
              <span key={`${deck.slug}-${i}`} className={`hv7-sheet ${['hv7-tilt-a', 'hv7-tilt-b', 'hv7-tilt-c'][i]}`}>
                <img src={deck.thumbnailUrl} alt={titleFor(deck)} width={480} height={620} loading="lazy" />
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center lg:text-left font-lcsBody text-sm text-[#5a6b64]">{t('reassure')}</p>
      </div>
    </section>
  );
}
