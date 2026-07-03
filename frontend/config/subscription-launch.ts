/**
 * Subscription-launch flip (Master Roadmap rev.2 Phase 1, 2026-07-03).
 *
 * The paid rail (pricing page, checkout, subscriber-upsell CTAs) is fully BUILT
 * but stays non-public until the first premium classes ship (#3 Storybook
 * Library / #6 Generator Creation Suite). Flipping this single constant to
 * `true` makes the rail public:
 *   - /[locale]/pricing switches robots noindex -> index + enters sitemap shard 3
 *   - nav/footer pricing links render
 *   - workspace/collections subscriber-upsell states show their "See plans" CTA
 *
 * Do NOT flip without the operator's go (the pricing page sells the storybook
 * library — advertising it before it exists burns trust).
 */
export const PRICING_PUBLIC = false;
