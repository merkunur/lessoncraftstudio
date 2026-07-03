'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { buildCheckoutUrl } from '@/lib/checkout';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { pinterestEvents } from '@/components/tracking/PinterestTag';

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

/**
 * The pricing page's buy buttons (commission #2). Hosted-LS checkout links:
 * signed-in users get email prefill; buyer locale rides checkout custom data
 * (webhook localizes the welcome email); no account is required to purchase —
 * the webhook auto-creates one from the buyer email.
 */
export default function CheckoutButtons() {
  const t = useTranslations('pricingPage');
  const locale = useLocale();
  const { user } = useAuth();

  const annualUrl = buildCheckoutUrl({ locale, email: user?.email, interval: 'yearly' });
  const monthlyUrl = buildCheckoutUrl({ locale, email: user?.email, interval: 'monthly' });

  function onCheckoutClick(interval: 'yearly' | 'monthly') {
    try {
      pinterestEvents.checkoutStarted(
        SUBSCRIPTION_PRODUCT.slug,
        interval === 'yearly' ? SUBSCRIPTION_PRODUCT.priceUsd : SUBSCRIPTION_PRODUCT.monthlyPriceUsd
      );
    } catch {
      /* tracking must never block checkout */
    }
    window.umami?.track('checkout-started', { interval, locale });
  }

  return (
    <div className="flex flex-col gap-3">
      {annualUrl && (
        <a
          href={annualUrl}
          onClick={() => onCheckoutClick('yearly')}
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          {t('tier.ctaAnnual')}
        </a>
      )}
      {monthlyUrl && (
        <a
          href={monthlyUrl}
          onClick={() => onCheckoutClick('monthly')}
          className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-terracotta-400 text-terracotta-500 font-semibold hover:bg-cream-100 transition"
        >
          {t('tier.ctaMonthly')}
        </a>
      )}
      <p className="text-sm text-ink-500 leading-relaxed">{t('tier.microcopy')}</p>
    </div>
  );
}
