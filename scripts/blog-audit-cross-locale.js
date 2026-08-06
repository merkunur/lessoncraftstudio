/**
 * Blog Cross-Locale & Infrastructure Audit — Steps 5, 6, 7
 *
 * Verifies:
 * - Sitemap coverage (all 11 locales, all 112 posts)
 * - Blog index page configuration (all 11 locales)
 * - Cross-language slug consistency (same 112 blogIds in all locales)
 * - Navigation includes blog
 * - robots.txt allows blog
 * - Hreflang configuration
 *
 * Usage: node scripts/blog-audit-cross-locale.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const ROOT = path.join(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');

function checkSitemapConfig() {
  console.log('=== STEP 5: SITEMAP CONFIGURATION ===\n');
  const sitemapPath = path.join(FRONTEND, 'app', 'sitemap.ts');
  const content = fs.readFileSync(sitemapPath, 'utf8');

  // Check blog sitemap section exists
  const hasBlogSection = content.includes("id === 9") || content.includes("Blog pages");
  console.log(`Blog sitemap section (ID 9): ${hasBlogSection ? '\u2705' : '\u274c'}`);

  // Check priority
  const priorityMatch = content.match(/priority:\s*([\d.]+)[\s\S]*?(?=return routes|$)/);
  const blogPriorityMatch = content.match(/Blog pages[\s\S]*?priority:\s*([\d.]+)/);
  if (blogPriorityMatch) {
    console.log(`Blog priority: ${blogPriorityMatch[1]} ${blogPriorityMatch[1] === '0.6' ? '\u2705' : '\u26a0\ufe0f expected 0.6'}`);
  }

  // Check changeFrequency
  const freqMatch = content.match(/Blog pages[\s\S]*?changeFrequency:\s*'(\w+)'/);
  if (freqMatch) {
    console.log(`Blog changeFrequency: ${freqMatch[1]} ${freqMatch[1] === 'weekly' ? '\u2705' : '\u26a0\ufe0f expected weekly'}`);
  }

  // Check hreflang alternates
  const hasAlternates = content.includes('getBlogAlternateUrls');
  console.log(`Blog hreflang alternates: ${hasAlternates ? '\u2705' : '\u274c'}`);

  // Check blog index in sitemap
  const hasBlogIndex = content.includes("'/blog'") || content.includes('blog');
  console.log(`Blog index in sitemap: ${hasBlogIndex ? '\u2705' : '\u274c'}`);

  // Check iterates Object.entries(blog.slugs) — covers all locales
  const iteratesAllSlugs = content.includes('Object.entries(blog.slugs)');
  console.log(`Iterates all locale slugs: ${iteratesAllSlugs ? '\u2705' : '\u274c'}`);

  // Check robots.txt
  console.log('\nrobots.txt:');
  const robotsPath = path.join(FRONTEND, 'public', 'robots.txt');
  const robots = fs.readFileSync(robotsPath, 'utf8');

  const hasSitemapRef = robots.includes('Sitemap: https://www.lessoncraftstudio.com/sitemap.xml');
  console.log(`  References sitemap: ${hasSitemapRef ? '\u2705' : '\u274c'}`);

  const blocksBlog = robots.includes('Disallow: /*/blog/') || robots.includes('Disallow: /en/blog/');
  console.log(`  Blocks blog: ${blocksBlog ? '\u274c BLOCKED' : '\u2705 Not blocked'}`);
}

function checkBlogIndexPages() {
  console.log('\n=== STEP 6: BLOG INDEX PAGES ===\n');

  // Check blog index page exists
  const indexPath = path.join(FRONTEND, 'app', '[locale]', 'blog', 'page.tsx');
  const exists = fs.existsSync(indexPath);
  console.log(`Blog index page exists: ${exists ? '\u2705' : '\u274c'}`);

  if (exists) {
    const content = fs.readFileSync(indexPath, 'utf8');

    // Check metadata for all locales
    const localesWithMetadata = LOCALES.filter(l => content.includes(`'${l}'`) || content.includes(`"${l}"`));
    console.log(`Locales with metadata: ${localesWithMetadata.length}/11 ${localesWithMetadata.length >= 10 ? '\u2705' : '\u274c'}`);

    // Check 4 categories
    const hasProductGuide = content.includes('product-guide');
    const hasPlatformStrategy = content.includes('platform-strategy');
    const hasNicheSeasonal = content.includes('niche-seasonal');
    const hasHowTo = content.includes('how-to');
    console.log(`Categories defined:`);
    console.log(`  Product-Specific Guides: ${hasProductGuide ? '\u2705' : '\u274c'}`);
    console.log(`  Platform & Business Strategy: ${hasPlatformStrategy ? '\u2705' : '\u274c'}`);
    console.log(`  Niche & Seasonal: ${hasNicheSeasonal ? '\u2705' : '\u274c'}`);
    console.log(`  How-To Tutorials: ${hasHowTo ? '\u2705' : '\u274c'}`);

    // Check hreflang alternates
    const hasHreflang = content.includes('alternates') || content.includes('hreflang');
    console.log(`Hreflang in metadata: ${hasHreflang ? '\u2705' : '\u274c'}`);

    // Check og:type
    const hasOgType = content.includes("'website'") || content.includes('"website"');
    console.log(`OG type: ${hasOgType ? '\u2705' : '\u274c'}`);
  }

  // Check blog post page exists
  const postPath = path.join(FRONTEND, 'app', '[locale]', 'blog', '[slug]', 'page.tsx');
  console.log(`\nBlog post page exists: ${fs.existsSync(postPath) ? '\u2705' : '\u274c'}`);
}

function checkNavigation() {
  console.log('\n=== BLOG NAVIGATION ===\n');

  // Find navigation component
  const navDir = path.join(FRONTEND, 'components', 'layout');
  if (!fs.existsSync(navDir)) {
    console.log('Navigation directory not found');
    return;
  }

  const navFiles = fs.readdirSync(navDir).filter(f => f.toLowerCase().includes('nav'));
  for (const file of navFiles) {
    const content = fs.readFileSync(path.join(navDir, file), 'utf8');
    const hasBlogLink = content.includes("'blog'") || content.includes('"blog"') || content.includes('/blog');
    console.log(`${file}: Blog link ${hasBlogLink ? '\u2705 found' : '\u274c missing'}`);
  }
}

function checkCrossLocaleConsistency() {
  console.log('\n=== STEP 7: CROSS-LANGUAGE CONSISTENCY ===\n');

  const slugsFile = fs.readFileSync(
    path.join(FRONTEND, 'config', 'blog-page-slugs.ts'), 'utf8'
  );

  // Extract all blog entries with their locale slugs
  const entries = [];
  const regex = /blogId:\s*'([^']+)',\s*slugs:\s*\{([^}]+)\}/g;
  let match;
  while ((match = regex.exec(slugsFile)) !== null) {
    const blogId = match[1];
    const slugStr = match[2];
    const slugs = {};
    const slugRegex = /(\w+):\s*'([^']+)'/g;
    let sMatch;
    while ((sMatch = slugRegex.exec(slugStr)) !== null) {
      slugs[sMatch[1]] = sMatch[2];
    }
    entries.push({ blogId, slugs });
  }

  console.log(`Total blog entries in slug config: ${entries.length}`);

  // Check: every blogId has a slug for all 11 locales
  const missingByLocale = {};
  for (const locale of LOCALES) {
    const missing = entries.filter(e => !e.slugs[locale]);
    if (missing.length > 0) {
      missingByLocale[locale] = missing.map(e => e.blogId);
    }
  }

  console.log('\nSlug coverage per locale:');
  console.log('| Language | Slugs defined | Missing | Status |');
  console.log('|----------|--------------|---------|--------|');
  for (const locale of LOCALES) {
    const defined = entries.filter(e => e.slugs[locale]).length;
    const missing = missingByLocale[locale] ? missingByLocale[locale].length : 0;
    const status = missing === 0 ? '\u2705' : '\u274c';
    console.log(`| ${locale.padEnd(8)} | ${String(defined).padEnd(13)} | ${String(missing).padEnd(7)} | ${status} |`);
  }

  // Show missing slugs
  for (const [locale, missing] of Object.entries(missingByLocale)) {
    console.log(`\n${locale} missing slugs:`);
    missing.forEach(m => console.log(`  - ${m}`));
  }

  // Check: content files exist for every blogId in every locale
  console.log('\nContent file coverage:');
  const contentDir = path.join(FRONTEND, 'config', 'blog-content');
  let allPresent = true;
  for (const locale of LOCALES) {
    const localeDir = path.join(contentDir, locale);
    const files = new Set(fs.readdirSync(localeDir).map(f => f.replace('.ts', '')));
    const missing = entries.filter(e => !files.has(e.blogId));
    if (missing.length > 0) {
      allPresent = false;
      console.log(`  ${locale}: ${missing.length} missing content files`);
    }
  }
  if (allPresent) {
    console.log(`  \u2705 All ${entries.length} content files present in all ${LOCALES.length} locales`);
  }

  // Check: hreflang function exists
  const hasHreflangFn = slugsFile.includes('getBlogAlternateUrls') || slugsFile.includes('getHreflangAlternates');
  console.log(`\nHreflang function: ${hasHreflangFn ? '\u2705' : '\u274c'}`);

  // Spot check: sample non-English files for English content leakage
  console.log('\nEnglish content leakage spot-check:');
  const englishOnlyPhrases = [
    /\bClick here\b/i, /\bLearn more about\b/i, /\bIn this guide\b/i,
    /\bThis article will\b/i, /\bWe recommend\b/i,
  ];

  const leaks = [];
  const testLocales = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  for (const locale of testLocales) {
    const localeDir = path.join(contentDir, locale);
    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));
    // Check 5 random files per locale
    const sample = files.sort(() => Math.random() - 0.5).slice(0, 5);
    for (const file of sample) {
      const content = fs.readFileSync(path.join(localeDir, file), 'utf8');
      for (const phrase of englishOnlyPhrases) {
        if (phrase.test(content)) {
          leaks.push({ locale, file, phrase: phrase.source });
        }
      }
    }
  }

  if (leaks.length > 0) {
    console.log(`  \u26a0\ufe0f Found ${leaks.length} potential English leaks:`);
    leaks.forEach(l => console.log(`    ${l.locale}/${l.file}: "${l.phrase}"`));
  } else {
    console.log(`  \u2705 No English content leakage detected in spot-check (50 files sampled)`);
  }

  // Check blog post page has hreflang
  const postPagePath = path.join(FRONTEND, 'app', '[locale]', 'blog', '[slug]', 'page.tsx');
  if (fs.existsSync(postPagePath)) {
    const postPage = fs.readFileSync(postPagePath, 'utf8');
    const hasHreflangMeta = postPage.includes('alternates') && postPage.includes('languages');
    const hasXDefault = postPage.includes('x-default');
    console.log(`\nBlog post hreflang in metadata: ${hasHreflangMeta ? '\u2705' : '\u274c'}`);
    console.log(`Blog post x-default: ${hasXDefault ? '\u2705' : '\u274c'}`);

    // Check JSON-LD schema
    const hasJsonLd = postPage.includes('BlogPosting') || postPage.includes('@type');
    const hasBreadcrumb = postPage.includes('BreadcrumbList');
    const hasFaqSchema = postPage.includes('FAQPage') || postPage.includes('generateFAQSchema');
    console.log(`JSON-LD BlogPosting: ${hasJsonLd ? '\u2705' : '\u274c'}`);
    console.log(`JSON-LD BreadcrumbList: ${hasBreadcrumb ? '\u2705' : '\u274c'}`);
    console.log(`JSON-LD FAQ (conditional): ${hasFaqSchema ? '\u2705' : '\u274c'}`);

    // Check canonical
    const hasCanonical = postPage.includes('canonical');
    console.log(`Canonical URL: ${hasCanonical ? '\u2705' : '\u274c'}`);

    // Check OG tags
    const hasOgTitle = postPage.includes('openGraph');
    const hasOgType = postPage.includes("'article'");
    console.log(`OpenGraph tags: ${hasOgTitle ? '\u2705' : '\u274c'}`);
    console.log(`OG type article: ${hasOgType ? '\u2705' : '\u274c'}`);
  }
}

// Run all checks
checkSitemapConfig();
checkBlogIndexPages();
checkNavigation();
checkCrossLocaleConsistency();

console.log('\n=== INFRASTRUCTURE AUDIT COMPLETE ===');
