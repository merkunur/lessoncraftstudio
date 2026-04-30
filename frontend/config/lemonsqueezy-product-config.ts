/**
 * Lemon Squeezy product config — LessonCraftStudio Subscription
 *
 * Created on Lemon Squeezy 2026-04-30 as a hard pre-handoff prerequisite per
 * HOMEPAGE-IMPLEMENTATION-PROMPT.md §3 and §5.5.
 *
 * Operator integration: this snippet replaces the previous per-app product
 * configuration in frontend/config/lemonsqueezy-products.ts (33 individual app
 * products at $49 + 6 category bundles at $149 — all being deleted per
 * CLAUDE.md §1 / §11 / §17 seller-era teardown scope). Whether to delete the
 * old config wholesale or migrate it incrementally is a separate scope decision;
 * this file just registers the new subscription product so the implementer has
 * the slug and IDs available for §5.5 auth-state branching.
 *
 * The product is configured as:
 *   - Subscription, $69 USD per year, auto-renewing
 *   - Tax category: On Demand Online Courses
 *   - Storefront display: OFF (conversion happens at lessoncraftstudio.com)
 *   - License keys: not generated (account-bound, not key-bound)
 */

export const SUBSCRIPTION_PRODUCT = {
  // Lemon Squeezy product identifiers — used by:
  //   1. Checkout URL construction
  //   2. Webhook payload matching (frontend/app/api/webhooks/lemonsqueezy/route.ts)
  //   3. Active-subscription detection in §5.5 auth-state branch 3
  productId: 1016671,
  variantId: 1595188,

  // Display name + price for any home-page or checkout-context surface.
  // Keep in sync with HOMEPAGE-COPY.md Section 5 price line ("$69 per year. Cancel renewal anytime.").
  name: "LessonCraftStudio Subscription",
  priceUsd: 69,
  billingPeriod: "year" as const,

  // Stable internal slug — use this for feature-flag checks, analytics events,
  // and the "is the user subscribed" predicate. Do not derive from productId
  // (numeric IDs are operationally fragile across Lemon Squeezy environments).
  slug: "lcs-subscription",
} as const;

/**
 * Helper for §5.5 auth-state branch 3:
 * "Logged-in user with an active $69 subscription → an 'already subscribed' page."
 *
 * Match webhook payloads / stored subscription records against productId.
 * Do not match by name (mutable) or by price (mutable).
 */
export function isLcsSubscriptionProduct(record: { productId: number | string }): boolean {
  return Number(record.productId) === SUBSCRIPTION_PRODUCT.productId;
}
