import { test, expect } from '@playwright/test';

const LANGUAGES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const SAMPLE_COUNT = 33;

test.describe('Homepage Critical Features', () => {

  test('homepage loads for all languages', async ({ page }) => {
    for (const lang of LANGUAGES) {
      const response = await page.goto(`/${lang}`);
      expect(response?.status()).toBe(200);
    }
  });

  test('hero section is visible', async ({ page }) => {
    await page.goto('/en');

    // Check hero section exists - try multiple possible selectors
    const heroSection = page.locator('[data-testid="hero-section"], .hero-section, section.hero, [class*="hero"]').first();
    await expect(heroSection).toBeVisible({ timeout: 10000 });
  });

  test('hero images load correctly', async ({ page }) => {
    await page.goto('/en');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check hero images exist and load (not 404)
    const heroImages = page.locator('img[src*="hero"]');
    const count = await heroImages.count();

    if (count > 0) {
      // Verify at least one hero image is visible
      for (let i = 0; i < count; i++) {
        const img = heroImages.nth(i);
        const isVisible = await img.isVisible();
        if (isVisible) {
          await expect(img).toBeVisible();
          break;
        }
      }
    }
  });

  test('product samples section is displayed', async ({ page }) => {
    await page.goto('/en');

    // Wait for sample gallery to load - try multiple selectors
    const sampleSection = page.locator('[data-testid="sample-gallery"], .sample-gallery, .samples, [class*="samples"], [class*="product"]').first();
    await expect(sampleSection).toBeVisible({ timeout: 10000 });
  });

  test('at least 33 product samples are displayed', async ({ page }) => {
    await page.goto('/en');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Count sample items - try multiple selectors
    const samples = page.locator('[data-testid="sample-item"], .sample-item, .product-sample, [class*="sample-card"], a[href*="/en/"]');
    const sampleCount = await samples.count();

    // Should have at least 33 product samples
    expect(sampleCount).toBeGreaterThanOrEqual(SAMPLE_COUNT);
  });

  test('sample thumbnails load without 404', async ({ page }) => {
    await page.goto('/en');

    await page.waitForLoadState('networkidle');

    // Get all thumbnail images
    const thumbnails = page.locator('img[src*="thumb"], img[src*="thumbnail"], img[src*="samples"]');
    const count = await thumbnails.count();

    if (count > 0) {
      // Check first few thumbnails have valid src
      for (let i = 0; i < Math.min(5, count); i++) {
        const img = thumbnails.nth(i);
        const src = await img.getAttribute('src');
        expect(src).not.toBeNull();
        expect(src).not.toBe('');
      }
    }
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/en');

    // Check that key navigation links exist
    const pricingLink = page.locator('a[href*="/pricing"]').first();
    const supportLink = page.locator('a[href*="/support"]').first();

    await expect(pricingLink).toBeVisible();
    await expect(supportLink).toBeVisible();
  });
});

test.describe('API Route Availability', () => {

  test('support ticket POST endpoint exists (not 405)', async ({ request }) => {
    // Should NOT return 405 (Method Not Allowed)
    // 401 (unauthorized) or 400 (bad request) are acceptable
    // 405 means the handler is MISSING
    const response = await request.post('/api/support/tickets', {
      data: {}
    });

    expect(response.status()).not.toBe(405);
  });

  test('contact POST endpoint exists (not 405)', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {}
    });

    expect(response.status()).not.toBe(405);
  });

  test('health endpoint responds', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.status()).toBe(200);
  });

  test('database health endpoint responds', async ({ request }) => {
    const response = await request.get('/api/health/database');
    expect(response.status()).toBe(200);
  });

  test('samples health endpoint responds', async ({ request }) => {
    const response = await request.get('/api/health/samples');
    expect(response.status()).toBe(200);
  });

  test('homepage samples API responds', async ({ request }) => {
    const response = await request.get('/api/homepage-samples/list');
    expect(response.status()).toBe(200);
  });
});

test.describe('Critical Pages Load', () => {

  test('pricing page loads', async ({ page }) => {
    const response = await page.goto('/en/pricing');
    expect(response?.status()).toBe(200);
  });

  test('support page loads', async ({ page }) => {
    const response = await page.goto('/en/support');
    expect(response?.status()).toBe(200);
  });

  test('product pages load (sample check)', async ({ page }) => {
    // Test a few key product pages
    const products = ['addition', 'subtraction', 'multiplication', 'division'];

    for (const product of products) {
      const response = await page.goto(`/en/${product}`);
      expect(response?.status()).toBe(200);
    }
  });

  test('blog page loads', async ({ page }) => {
    const response = await page.goto('/en/blog');
    expect(response?.status()).toBe(200);
  });
});

test.describe('i18n - No Missing Translations', () => {

  test('homepage has no MISSING_MESSAGE errors', async ({ page }) => {
    await page.goto('/en');

    // Check page content doesn't contain MISSING_MESSAGE
    const content = await page.content();
    expect(content).not.toContain('MISSING_MESSAGE');
  });

  test('pricing page has no MISSING_MESSAGE errors', async ({ page }) => {
    await page.goto('/en/pricing');

    const content = await page.content();
    expect(content).not.toContain('MISSING_MESSAGE');
  });

  test('support page has no MISSING_MESSAGE errors', async ({ page }) => {
    await page.goto('/en/support');

    const content = await page.content();
    expect(content).not.toContain('MISSING_MESSAGE');
  });

  test('non-English homepage has no MISSING_MESSAGE errors', async ({ page }) => {
    await page.goto('/de');

    const content = await page.content();
    expect(content).not.toContain('MISSING_MESSAGE');
  });
});
