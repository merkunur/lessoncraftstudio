import { test, expect } from '@playwright/test';

// Pillar 4 Arc 2 Phase 3c — subscription-gating e2e tests.
//
// Verifies the access-control substrate (Phase 3a access-control.ts +
// access-check API) + UI access-gated layer (Phase 3b per-package route +
// FlashcardDeck + FlashcardPaywall) holds end-to-end.
//
// Coverage:
//   - Free-tier package accessible anonymous → FlashcardDeck renders
//   - Paid-tier package not accessible anonymous → FlashcardPaywall renders
//   - access-check API: free-tier → { allowed: true, reason: 'free-tier' }
//   - access-check API: paid-tier anonymous → { allowed: false, reason: 'gated' }
//   - access-check API: missing query param → 400
//
// Smoke-class locale coverage: en + de + nl (Tier 1+2 browse-route scope).
// Full locale matrix at future-arc coverage commission.

const FREE_TIER_PACKAGE = 'count-objects-1-to-10'; // C5 locked allowlist
const PAID_TIER_PACKAGE = 'identify-and-name-foods'; // not in C5 allowlist
const SMOKE_LOCALES = ['en', 'de', 'nl'];

test.describe('Flashcard subscription gating', () => {
  test('free-tier package accessible anonymous (en)', async ({ page }) => {
    const response = await page.goto(`/en/flashcards/${FREE_TIER_PACKAGE}`);
    expect(response?.status()).toBe(200);
    // FlashcardDeck renders an iframe with deck.html
    const iframe = page.locator('iframe[title]').first();
    await expect(iframe).toBeVisible({ timeout: 10000 });
  });

  test('paid-tier package gated anonymous (en)', async ({ page }) => {
    const response = await page.goto(`/en/flashcards/${PAID_TIER_PACKAGE}`);
    expect(response?.status()).toBe(200);
    // FlashcardPaywall surfaces subscribe CTA (no iframe; paywall shown instead)
    const iframe = page.locator('iframe[title]');
    await expect(iframe).toHaveCount(0);
  });

  test('access-check API: free-tier package returns allowed=true reason=free-tier', async ({ request }) => {
    const res = await request.get(`/api/flashcards/access-check?package=${FREE_TIER_PACKAGE}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.allowed).toBe(true);
    expect(body.reason).toBe('free-tier');
  });

  test('access-check API: paid-tier package anonymous returns allowed=false reason=gated', async ({ request }) => {
    const res = await request.get(`/api/flashcards/access-check?package=${PAID_TIER_PACKAGE}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.allowed).toBe(false);
    expect(body.reason).toBe('gated');
  });

  test('access-check API: missing package query returns 400', async ({ request }) => {
    const res = await request.get('/api/flashcards/access-check');
    expect(res.status()).toBe(400);
  });

  test('free-tier package accessible across Tier 1+2 locales (smoke)', async ({ page }) => {
    for (const locale of SMOKE_LOCALES) {
      const response = await page.goto(`/${locale}/flashcards/${FREE_TIER_PACKAGE}`);
      expect(response?.status(), `locale=${locale}`).toBe(200);
    }
  });
});
