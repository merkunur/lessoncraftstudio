/**
 * Lemon Squeezy checkout-URL builder (commission #2, 2026-07-03).
 *
 * We use the HOSTED checkout links (no LS API integration — merchant-of-record
 * handles VAT/receipts/renewals). This helper decorates the base buy link with:
 *   - checkout[email]           — prefill for signed-in users
 *   - checkout[custom][locale]  — rides the webhook payload (meta.custom_data.locale)
 *                                 so the welcome/password email is sent in the
 *                                 buyer's language
 *   - checkout[redirect_url]    — per-locale thank-you page
 */
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';

const SITE = 'https://www.lessoncraftstudio.com';

export function buildCheckoutUrl(opts: {
  locale: string;
  email?: string | null;
  interval?: 'yearly' | 'monthly';
}): string | null {
  const interval = opts.interval ?? 'yearly';
  const base =
    interval === 'monthly'
      ? SUBSCRIPTION_PRODUCT.monthlyBuyNowUrl
      : SUBSCRIPTION_PRODUCT.buyNowUrl;
  if (!base) return null; // monthly variant not provisioned yet (B3 operator step)

  const url = new URL(base);
  // The base link may already carry a redirect_url param — override per-locale.
  url.searchParams.set('checkout[redirect_url]', `${SITE}/${opts.locale}/subscribe/thanks`);
  url.searchParams.set('checkout[custom][locale]', opts.locale);
  if (opts.email) url.searchParams.set('checkout[email]', opts.email);
  return url.toString();
}
