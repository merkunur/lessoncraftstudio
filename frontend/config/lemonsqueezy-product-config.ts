/**
 * Lemon Squeezy product config — LessonCraftStudio Teacher subscription.
 *
 * Two separate products (created 2026-07-03, commission #2 B3): a Yearly and a
 * Monthly product rather than one product with two variants (LS's multi-variant
 * checkout UX was awkward; two products give each interval its own clean
 * checkout link and price). Tax category: Software as a Service (SaaS).
 * Storefront display OFF (conversion happens at lessoncraftstudio.com); no
 * license keys (account-bound).
 *
 * Both product IDs must be recognized by the webhook (a purchase of either is a
 * valid LCS subscription) — see isLcsSubscriptionProduct + the webhook handler.
 */

export const SUBSCRIPTION_PRODUCT = {
  // Canonical (yearly) identifiers — the primary tier + the display defaults.
  productId: 1194166,
  variantId: 1866999,

  name: "LessonCraftStudio Teacher",
  priceUsd: 69,
  billingPeriod: "year" as const,

  // Stable internal slug — feature flags, analytics events, the subscribed
  // predicate. Do NOT derive from productId (numeric IDs are fragile across LS
  // environments).
  slug: "lcs-subscription",

  // Monthly product ($8.99/mo). Its own LS product, not a variant.
  monthlyPriceUsd: 8.99,
  monthlyProductId: 1194171,
  monthlyVariantId: 1867004,

  // Hosted checkout links (UUID form — resolves regardless of variant status,
  // and is what LS returns as `buy_now_url`). lib/checkout.ts decorates these
  // per-request with email prefill + custom[locale] + per-locale redirect_url;
  // the bare links here are the base.
  buyNowUrl: "https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/2863e2e7-62eb-43aa-a647-43a29895f030",
  monthlyBuyNowUrl: "https://lessoncraftstudio-com.lemonsqueezy.com/checkout/buy/edf54b11-7801-4197-915e-e631219505c0",
} as const;

/** Every product id that counts as an LCS subscription (yearly + monthly). */
export const LCS_SUBSCRIPTION_PRODUCT_IDS: number[] = [
  SUBSCRIPTION_PRODUCT.productId,
  SUBSCRIPTION_PRODUCT.monthlyProductId,
];

/**
 * Extra product IDs recognized as LCS subscriptions, from the server-only env
 * `LCS_TEST_SUBSCRIPTION_PRODUCT_IDS` (comma-separated). Lemon Squeezy test mode
 * is a separate store, so a TEST purchase carries a DIFFERENT product id than the
 * live products above; adding the test ids here lets a test purchase activate a
 * subscription end-to-end without baking test ids into committed code. Removable
 * by clearing the env var (no redeploy of code needed). Read at call time so it
 * works in the Next server runtime; undefined client-side → [] (harmless).
 */
function envExtraSubscriptionProductIds(): number[] {
  const raw = process.env.LCS_TEST_SUBSCRIPTION_PRODUCT_IDS;
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0);
}

/**
 * True if a webhook payload / stored record belongs to EITHER LCS subscription
 * product (live), OR an env-allowlisted test product. Match by product id (name
 * + price are mutable).
 */
export function isLcsSubscriptionProduct(record: { productId: number | string }): boolean {
  const id = Number(record.productId);
  return LCS_SUBSCRIPTION_PRODUCT_IDS.includes(id) || envExtraSubscriptionProductIds().includes(id);
}
