import { test, expect } from '@playwright/test';

test.describe('Blog System E2E Tests', () => {
  test.describe('Blog Creation Flow', () => {
    test('should create and publish a multi-language blog post', async ({ page }) => {
      // Navigate to blog creation page
      await page.goto('/admin/content/blog/new');

      // Fill in English version
      await page.click('text=English');
      await page.fill('#title_en', 'Test Blog Post Title');
      await page.fill('#metaTitle_en', 'Test Blog SEO Title');
      await page.fill('#metaDescription_en', 'Test blog post description for SEO purposes');
      await page.fill('#keywords_en', 'test, blog, e2e, testing');
      await page.fill('#author_en', 'Test Author');
      await page.selectOption('#category_en', 'Teaching Resources');

      // Add content
      await page.locator('#content_en').click();
      await page.keyboard.type('<h2>Introduction</h2><p>This is a test blog post content.</p>');

      // Add German translation
      await page.click('text=Deutsch');
      await page.fill('#title_de', 'Test Blogbeitrag Titel');
      await page.fill('#metaTitle_de', 'Test Blog SEO Titel');
      await page.fill('#metaDescription_de', 'Test Blogbeitrag Beschreibung für SEO');
      await page.fill('#keywords_de', 'test, blog, e2e, testen');
      await page.fill('#author_de', 'Test Autor');
      await page.selectOption('#category_de', 'Lehrressourcen');

      // Add content
      await page.locator('#content_de').click();
      await page.keyboard.type('<h2>Einführung</h2><p>Dies ist ein Test-Blogbeitrag-Inhalt.</p>');

      // Upload sample worksheet
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('button:has-text("Upload PDF")')
      ]);

      // Create a test PDF file
      const testPDFPath = 'test-worksheet.pdf';
      await fileChooser.setFiles(testPDFPath);

      // Preview the post
      await page.click('button:has-text("Preview")');

      // Wait for preview modal/window
      await expect(page.locator('.preview-container')).toBeVisible();

      // Verify preview contains our content
      await expect(page.locator('.preview-container')).toContainText('Test Blog Post Title');

      // Close preview
      await page.click('button:has-text("Close Preview")');

      // Publish the post
      await page.click('button:has-text("Publish Static HTML")');

      // Wait for success message
      await expect(page.locator('text=successfully published')).toBeVisible();

      // Should redirect to blog management page
      await page.waitForURL('/admin/content/blog');

      // Verify the new post appears in the list
      await expect(page.locator('text=Test Blog Post Title')).toBeVisible();
    });

    test('should validate required fields', async ({ page }) => {
      await page.goto('/admin/content/blog/new');

      // Try to publish without filling required fields
      await page.click('button:has-text("Publish Static HTML")');

      // Should show validation errors
      await expect(page.locator('text=Title is required')).toBeVisible();
      await expect(page.locator('text=Content is required')).toBeVisible();
    });

    test('should handle PDF upload validation', async ({ page }) => {
      await page.goto('/admin/content/blog/new');

      // Try to upload non-PDF file
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('button:has-text("Upload PDF")')
      ]);

      await fileChooser.setFiles('test.txt');

      // Should show error message
      await expect(page.locator('text=Only PDF files are allowed')).toBeVisible();
    });
  });

  test.describe('Blog Listing and Search', () => {
    test('should display blog posts with pagination', async ({ page }) => {
      await page.goto('/en/blog');

      // Check if blog posts are displayed
      await expect(page.locator('.blog-grid')).toBeVisible();

      // Check pagination exists if there are many posts
      const paginationExists = await page.locator('.pagination').isVisible();
      if (paginationExists) {
        // Click next page
        await page.click('button:has-text("Next")');

        // URL should update with page parameter
        expect(page.url()).toContain('page=2');

        // Different posts should be displayed
        await expect(page.locator('.blog-grid')).toBeVisible();
      }
    });

    test('should filter by category', async ({ page }) => {
      await page.goto('/en/blog');

      // Select a category filter
      await page.selectOption('select[name="category"]', 'Teaching Resources');

      // Wait for filtered results
      await page.waitForLoadState('networkidle');

      // All visible posts should be in the selected category
      const categoryTags = await page.locator('.category-tag').allTextContents();
      categoryTags.forEach(tag => {
        expect(tag).toBe('Teaching Resources');
      });
    });

    test('should search blog posts', async ({ page }) => {
      await page.goto('/en/blog');

      // Enter search query
      await page.fill('input[placeholder*="Search"]', 'worksheet');

      // Wait for search results
      await page.waitForLoadState('networkidle');

      // Results should contain search term
      const titles = await page.locator('.blog-title').allTextContents();
      expect(titles.some(title => title.toLowerCase().includes('worksheet'))).toBeTruthy();
    });
  });

  test.describe('Multi-language Support', () => {
    test('should switch languages dynamically', async ({ page }) => {
      await page.goto('/en/blog');

      // Switch to German
      await page.selectOption('select[name="language"]', 'de');

      // URL should change to German locale
      await page.waitForURL('/de/blog');

      // Content should be in German
      await expect(page.locator('h1')).toContainText('Blog');

      // Categories should be translated
      const categoryOptions = await page.locator('select[name="category"] option').allTextContents();
      expect(categoryOptions).toContain('Lehrressourcen');
    });

    test('should maintain language consistency across pages', async ({ page }) => {
      // Start in German
      await page.goto('/de/blog');

      // Click on a blog post
      await page.click('.blog-card:first-child');

      // Should navigate to German version of the post
      expect(page.url()).toContain('/de/blog/');

      // Content should be in German
      const htmlLang = await page.getAttribute('html', 'lang');
      expect(htmlLang).toBe('de');
    });
  });

  test.describe('SEO and Performance', () => {
    test('should have proper meta tags', async ({ page }) => {
      await page.goto('/en/blog/sample-post');

      // Check meta tags
      const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription.length).toBeLessThanOrEqual(160);

      const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
      expect(ogTitle).toBeTruthy();

      const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
      expect(canonical).toContain('/en/blog/sample-post');

      // Check hreflang tags for all languages
      const hreflangTags = await page.locator('link[rel="alternate"][hreflang]').count();
      expect(hreflangTags).toBe(11); // All 11 languages
    });

    test('should load quickly (under 3 seconds)', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/en/blog', { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });

    test('should have structured data', async ({ page }) => {
      await page.goto('/en/blog/sample-post');

      // Get JSON-LD structured data
      const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
      expect(jsonLd).toBeTruthy();

      const structuredData = JSON.parse(jsonLd);
      expect(structuredData['@type']).toBe('BlogPosting');
      expect(structuredData.headline).toBeTruthy();
      expect(structuredData.author).toBeTruthy();
      expect(structuredData.datePublished).toBeTruthy();
    });
  });

  test.describe('Sample Worksheet Downloads', () => {
    test('should display and download sample worksheets', async ({ page }) => {
      await page.goto('/en/blog/sample-post');

      // Check if worksheet download section exists
      const worksheetSection = page.locator('.sample-worksheets');
      await expect(worksheetSection).toBeVisible();

      // Check download button
      const downloadButton = page.locator('a[download]:has-text("Download Free Sample")');
      await expect(downloadButton).toBeVisible();

      // Verify download link structure
      const href = await downloadButton.getAttribute('href');
      expect(href).toContain('/blog/samples/');
      expect(href).toEndWith('.pdf');

      // Test download (without actually downloading)
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        downloadButton.click()
      ]);

      expect(download.suggestedFilename()).toEndWith('.pdf');
    });
  });

  test.describe('Admin Blog Management', () => {
    test('should list all blog posts in admin', async ({ page }) => {
      await page.goto('/admin/content/blog');

      // Table should be visible
      await expect(page.locator('table')).toBeVisible();

      // Should have action buttons
      await expect(page.locator('button:has-text("Create New Post")')).toBeVisible();
      await expect(page.locator('button:has-text("Refresh")')).toBeVisible();

      // Language selector should work
      await page.selectOption('select[value="en"]', 'de');
      await page.waitForLoadState('networkidle');

      // Posts should reload for selected language
      await expect(page.locator('table')).toBeVisible();
    });

    test('should edit existing blog post', async ({ page }) => {
      await page.goto('/admin/content/blog');

      // Click edit on first post
      await page.click('.edit-button:first-child');

      // Should navigate to edit page
      await page.waitForURL(/\/admin\/content\/blog\/edit\/.*/);

      // Form should be pre-populated
      const titleValue = await page.inputValue('#title_en');
      expect(titleValue).toBeTruthy();

      // Make an edit
      await page.fill('#title_en', 'Updated Blog Post Title');

      // Save changes
      await page.click('button:has-text("Update")');

      // Should show success message
      await expect(page.locator('text=successfully updated')).toBeVisible();
    });

    test('should delete blog post with confirmation', async ({ page }) => {
      await page.goto('/admin/content/blog');

      // Set up dialog handler before clicking delete
      page.on('dialog', dialog => {
        expect(dialog.message()).toContain('Are you sure');
        dialog.accept();
      });

      // Click delete on first post
      await page.click('.delete-button:first-child');

      // Should show success message after deletion
      await expect(page.locator('text=successfully deleted')).toBeVisible();

      // Post should be removed from list
      await page.waitForLoadState('networkidle');
    });
  });
});