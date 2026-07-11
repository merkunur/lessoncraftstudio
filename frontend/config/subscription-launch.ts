/**
 * Subscription-launch flip (2026-07-11 launch program; supersedes the
 * rev.2-era docstring — the storybook premium classes are DEAD, the offer is
 * the hosted-worksheets/workspace/packs Teacher plan).
 *
 * Flipping this single constant to `true` makes the paid rail public:
 *   - /[locale]/pricing switches robots noindex -> index,follow
 *   - /pricing enters sitemap shard 3 (frontend/app/sitemap.ts)
 *   - desktop-nav + footer pricing links render (Navigation.tsx / Footer.tsx)
 *   - workspace/collections/homepage subscriber-upsell CTAs show "See plans"
 * All four are REAL wiring as of 2026-07-11 (they were aspirational before).
 *
 * THE FLIP CHECKLIST (one commit + one served-js update, operator-approved):
 *   1. PRICING_PUBLIC = true   (this file)
 *   2. worksheet-host.js: LAUNCHED = true + bump its ?v= in access-guard.js's
 *      loader line, then redeploy the served copy (the generators' locked-save
 *      upsell only appears at launch)
 *   3. Verify: pricing indexable + in sitemap + linked; generator save flow
 *      states (anon/free/subscriber); organic-clicks metric watch armed
 *      (abort: >30% below trailing 7-day mean for 3 consecutive days within
 *      14 days of any crawl-visible change -> revert that change).
 *
 * Do NOT flip before the pricing copy truth pass is live in all 11 locales
 * (the pre-2026-07-11 copy sold the deleted storybook library).
 */
export const PRICING_PUBLIC = false;
