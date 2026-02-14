import { test, expect } from '@playwright/test';

/**
 * End-to-End tests for worksheet pages (theme hubs + grade pages).
 *
 * Validates rendering, schemas, hreflangs, accessibility, responsive,
 * and absence of error strings across a representative sample.
 *
 * Part 49 of Landing Page SEO Perfection
 */

const THEME_SAMPLES = [
  { locale: 'en', theme: 'animals' },
  { locale: 'de', theme: 'tiere' },
  { locale: 'fr', theme: 'dinosaures' },
];

const GRADE_SAMPLES = [
  { locale: 'en', theme: 'animals', grade: 'kindergarten' },
  { locale: 'de', theme: 'tiere', grade: 'kindergarten' },
  { locale: 'fr', theme: 'dinosaures', grade: 'cp' },
  { locale: 'en', theme: 'space', grade: 'first-grade' },
  { locale: 'es', theme: 'oceano', grade: 'preescolar' },
  { locale: 'fi', theme: 'robotit', grade: 'esikoulu' },
];

// ── Theme Page Rendering ─────────────────────────────────────────────

test.describe('Theme Page Rendering', () => {

  for (const { locale, theme } of THEME_SAMPLES) {
    test(`${locale}/${theme} loads with HTTP 200 and H1`, async ({ page }) => {
      const response = await page.goto(`/${locale}/worksheets/${theme}`);
      expect(response?.status()).toBe(200);

      // H1 should exist
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible({ timeout: 10000 });
      const h1Text = await h1.textContent();
      expect(h1Text?.trim().length).toBeGreaterThan(0);
    });
  }

  test('theme page has app grid links', async ({ page }) => {
    await page.goto('/en/worksheets/animals');
    await page.waitForLoadState('networkidle');

    // App grid should have multiple links to worksheet generators
    const appLinks = page.locator('a[href*="/en/"]');
    const count = await appLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});

// ── Grade Page Rendering ─────────────────────────────────────────────

test.describe('Grade Page Rendering', () => {

  for (const { locale, theme, grade } of GRADE_SAMPLES) {
    test(`${locale}/${theme}/${grade} loads with HTTP 200`, async ({ page }) => {
      const response = await page.goto(`/${locale}/worksheets/${theme}/${grade}`);
      expect(response?.status()).toBe(200);

      // H1 should exist
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible({ timeout: 10000 });
    });
  }

  test('grade page has 4-segment breadcrumb', async ({ page }) => {
    await page.goto('/en/worksheets/animals/kindergarten');
    await page.waitForLoadState('networkidle');

    // Breadcrumb nav should exist
    const breadcrumb = page.locator('nav[aria-label*="readcrumb"], nav[aria-label*="Breadcrumb"], [class*="breadcrumb"]').first();
    await expect(breadcrumb).toBeVisible({ timeout: 10000 });

    // Should have at least 3 breadcrumb links (Home, Worksheets, Theme) + current page
    const breadcrumbLinks = breadcrumb.locator('a, span');
    const count = await breadcrumbLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

// ── JSON-LD Presence ─────────────────────────────────────────────────

test.describe('JSON-LD Presence', () => {

  test('theme page has 3+ JSON-LD blocks', async ({ page }) => {
    await page.goto('/en/worksheets/animals');
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('grade page has 3+ JSON-LD blocks', async ({ page }) => {
    await page.goto('/en/worksheets/animals/kindergarten');
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('JSON-LD contains CollectionPage type', async ({ page }) => {
    await page.goto('/en/worksheets/animals');
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();

    let hasCollectionPage = false;
    for (let i = 0; i < count; i++) {
      const text = await scripts.nth(i).textContent();
      if (text && text.includes('CollectionPage')) {
        hasCollectionPage = true;
        break;
      }
    }
    expect(hasCollectionPage).toBe(true);
  });

  test('JSON-LD contains BreadcrumbList type', async ({ page }) => {
    await page.goto('/en/worksheets/animals');
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();

    let hasBreadcrumb = false;
    for (let i = 0; i < count; i++) {
      const text = await scripts.nth(i).textContent();
      if (text && text.includes('BreadcrumbList')) {
        hasBreadcrumb = true;
        break;
      }
    }
    expect(hasBreadcrumb).toBe(true);
  });
});

// ── Hreflang Presence ────────────────────────────────────────────────

test.describe('Hreflang Presence', () => {

  test('theme page has 11+ hreflang links', async ({ page }) => {
    await page.goto('/en/worksheets/animals');
    const hreflangs = page.locator('link[rel="alternate"][hreflang]');
    const count = await hreflangs.count();
    expect(count).toBeGreaterThanOrEqual(11);
  });

  test('grade page has 11+ hreflang links', async ({ page }) => {
    await page.goto('/en/worksheets/animals/kindergarten');
    const hreflangs = page.locator('link[rel="alternate"][hreflang]');
    const count = await hreflangs.count();
    expect(count).toBeGreaterThanOrEqual(11);
  });

  test('hreflang includes x-default', async ({ page }) => {
    await page.goto('/en/worksheets/animals');
    const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(xDefault).toHaveCount(1);
  });
});

// ── Accessibility ────────────────────────────────────────────────────

test.describe('Accessibility', () => {

  test('breadcrumb nav has aria-label', async ({ page }) => {
    await page.goto('/en/worksheets/animals');
    await page.waitForLoadState('networkidle');

    const nav = page.locator('nav[aria-label*="readcrumb"], nav[aria-label*="Breadcrumb"]').first();
    await expect(nav).toBeVisible({ timeout: 10000 });
  });

  test('images have alt attributes', async ({ page }) => {
    await page.goto('/en/worksheets/animals');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count = await images.count();

    let missingAlt = 0;
    for (let i = 0; i < Math.min(count, 20); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      if (alt === null) missingAlt++;
    }
    // Allow at most 2 decorative images without alt
    expect(missingAlt).toBeLessThanOrEqual(2);
  });

  test('FAQ section has details/summary elements', async ({ page }) => {
    await page.goto('/en/worksheets/animals');
    await page.waitForLoadState('networkidle');

    // FAQs are rendered as details/summary or similar expandable elements
    const details = page.locator('details');
    const count = await details.count();
    // Should have FAQ items (at least 3)
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

// ── Responsive ───────────────────────────────────────────────────────

test.describe('Responsive', () => {

  test('theme page renders on mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 }, // iPhone 12
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    });
    const page = await context.newPage();
    await page.goto('/en/worksheets/animals');

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible({ timeout: 10000 });

    await context.close();
  });

  test('grade page renders on mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    });
    const page = await context.newPage();
    await page.goto('/en/worksheets/animals/kindergarten');

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible({ timeout: 10000 });

    await context.close();
  });
});

// ── No Error Strings ─────────────────────────────────────────────────

test.describe('No Error Strings', () => {

  const pagesToCheck = [
    { url: '/en/worksheets/animals', label: 'en/animals theme' },
    { url: '/de/worksheets/tiere/kindergarten', label: 'de/tiere/kindergarten grade' },
    { url: '/fr/worksheets/dinosaures', label: 'fr/dinosaures theme' },
  ];

  for (const { url, label } of pagesToCheck) {
    test(`${label} has no MISSING_MESSAGE`, async ({ page }) => {
      await page.goto(url);
      const content = await page.content();
      expect(content).not.toContain('MISSING_MESSAGE');
    });

    test(`${label} has no "Not Found" in body`, async ({ page }) => {
      await page.goto(url);
      // Check visible text, not source
      const bodyText = await page.locator('body').textContent();
      // Allow "Not Found" in footer links etc., but not as page title
      const h1Text = await page.locator('h1').textContent();
      expect(h1Text).not.toContain('Not Found');
      expect(h1Text).not.toContain('404');
    });
  }
});
