/* Free vs. Teacher section (v4) — renders ONLY when PRICING_PUBLIC.
   Pre-flip (PRICING_PUBLIC = false) this returns null, so the promoted v4
   homepage stays §7-compliant ("no marketing surface mentions any future
   subscription tier") until the launch commit flips the constant.

   Layout: dominant free ledger left (~60%) + one Teacher card right (~40%).
   The free ledger MIRRORS pricingPage.free.* and the Teacher bullets MIRROR
   pricingPage.tier.item{1,2,4,5} (save+host from all 29 makers / share by
   link+QR / collections+workspace / topic packs) — read from the pricing
   namespace directly (single copy SoT; no duplicated strings). Section
   chrome strings live in homepageV4.freeTeacher. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import { HandCheck } from '../homepage-v3/DoodleAccents';

interface FreeAndTeacherV4Props {
  locale: string;
}

export default async function FreeAndTeacherV4({ locale }: FreeAndTeacherV4Props) {
  if (!PRICING_PUBLIC) return null;

  const [t4, tFree, tTier] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV4.freeTeacher' }),
    getTranslations({ locale, namespace: 'pricingPage.free' }),
    getTranslations({ locale, namespace: 'pricingPage.tier' }),
  ]);

  const freeItems = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'] as const;
  // The 4 operator-locked Teacher bullets (pricingPage.tier item3 — bulk
  // share links for catalog decks — is the pricing page's own extra detail).
  const teacherItems = ['item1', 'item2', 'item4', 'item5'] as const;

  return (
    <section id="free-and-teacher" className="hv3-section-cream py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-10 md:mb-14">
          <span className="hv3-eyebrow text-[#146B5E]">{t4('eyebrow')}</span>
          <h2 className="mt-3 font-lcsDisplay font-bold text-lcs-teal leading-[1.05] tracking-tight text-[2rem] sm:text-[2.5rem] md:text-[3rem]">
            {t4('heading')}
          </h2>
          <p className="mt-4 font-lcsBody text-lg md:text-xl text-lcs-teal/80 leading-relaxed">
            {t4('body')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 md:gap-8 items-stretch">
          {/* LEFT ~60% — the free ledger. Dominant on purpose: free is the
              product; the plan is the add-on. No lock icons anywhere. */}
          <div className="hv3-card p-7 md:p-9">
            <h3 className="font-lcsDisplay font-bold text-lcs-teal text-xl md:text-2xl">
              {tFree('title')}
            </h3>
            <p className="mt-2 font-lcsBody text-base text-lcs-teal/75 leading-relaxed">
              {tFree('blurb')}
            </p>
            <ul className="mt-6 space-y-4 font-lcsBody text-base md:text-lg text-lcs-teal/90">
              {freeItems.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 mt-0.5" aria-hidden="true">
                    <HandCheck className="text-lcs-teal" size={24} />
                  </span>
                  <span>{tFree(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT ~40% — the single Teacher card. */}
          <div className="hv4-teacher-card p-7 md:p-9 flex flex-col">
            <h3 className="font-lcsDisplay font-bold text-lcs-cream text-xl md:text-2xl">
              {tTier('name')}
            </h3>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-lcsDisplay font-bold text-lcs-cream text-4xl md:text-5xl">{t4('priceAnnual')}</span>
              <span className="font-lcsBody font-semibold text-lcs-cream/80 text-base">{t4('priceAnnualSuffix')}</span>
            </p>
            <p className="mt-1 font-lcsBody text-sm text-lcs-cream/70">{t4('priceMonthly')}</p>
            <p className="mt-5 font-lcsBody font-semibold text-lcs-cream/90 text-sm uppercase tracking-wider">
              {tTier('includedTitle')}
            </p>
            <ul className="mt-3 space-y-3.5 font-lcsBody text-base text-lcs-cream/90">
              {teacherItems.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 mt-0.5" aria-hidden="true">
                    <HandCheck className="text-lcs-cream" size={20} />
                  </span>
                  <span>{tTier(key)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Link
                href={`/${locale}/pricing`}
                className="hv3-cta-coral inline-flex w-full items-center justify-center font-lcsDisplay font-semibold text-base md:text-lg px-6 py-3.5"
              >
                {t4('cta')}
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
              <p className="mt-3 font-lcsBody text-xs text-lcs-cream/65 leading-relaxed">
                {tTier('microcopy')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
