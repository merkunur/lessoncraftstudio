#!/usr/bin/env node

/**
 * English SEO Final Validation (Part 98)
 *
 * Validates all file-based English page metadata against SEO targets:
 *   A. 33 product pages
 *   B. 50 theme hub pages
 *   C. 250 theme+grade pages (SEO overrides)
 *   D. ~15 secondary pages (homepage, apps, worksheets, pricing, about, faq, etc.)
 *
 * Checks:
 *   - Title length 50-60 chars
 *   - Description length 150-160 chars
 *   - Keywords non-empty
 *   - No duplicate titles across all pages
 *   - No primary keyword duplication (product + theme pages)
 *   - Brand suffix present (LessonCraftStudio, LCS)
 *
 * Usage: node scripts/validate-english-seo-final.js
 * Output: docs/audit-results/english-seo-final.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');

// ---- Helpers ---------------------------------------------------------------

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`  WARN: Cannot read ${filePath}: ${e.message}`);
    return null;
  }
}

/** Resolve \uXXXX escape sequences to actual Unicode chars */
function resolveEscapes(str) {
  if (!str) return str;
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}

function extractField(text, fieldName) {
  const re = new RegExp(`${fieldName}:\\s*['"\`]([^'"\`]*?)['"\`]`);
  const m = text.match(re);
  return m ? resolveEscapes(m[1]) : null;
}

function extractBlock(text, blockName) {
  const patterns = [
    new RegExp(`['"]${blockName}['"]\\s*:\\s*\\{`),
    new RegExp(`${blockName}\\s*:\\s*\\{`),
  ];
  let braceStart = -1;
  for (const pat of patterns) {
    const m = pat.exec(text);
    if (m) {
      braceStart = text.indexOf('{', m.index);
      break;
    }
  }
  if (braceStart === -1) return null;

  let depth = 0;
  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') depth--;
    if (depth === 0) return text.slice(braceStart, i + 1);
  }
  return null;
}

// ---- Validation rules ------------------------------------------------------

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

function validatePage(page) {
  const issues = [];

  // Title
  if (!page.title) {
    issues.push({ check: 'title_missing', msg: 'Title is missing' });
  } else {
    const len = page.title.length;
    if (len < TITLE_MIN) issues.push({ check: 'title_short', msg: `Title too short: ${len} chars (min ${TITLE_MIN})`, value: len });
    if (len > TITLE_MAX) issues.push({ check: 'title_long', msg: `Title too long: ${len} chars (max ${TITLE_MAX})`, value: len });

    // Brand suffix
    if (!/LessonCraftStudio|LCS/i.test(page.title)) {
      issues.push({ check: 'no_brand', msg: 'Title missing brand suffix (LessonCraftStudio or LCS)' });
    }
  }

  // Description
  if (!page.description) {
    issues.push({ check: 'desc_missing', msg: 'Description is missing' });
  } else {
    const len = page.description.length;
    if (len < DESC_MIN) issues.push({ check: 'desc_short', msg: `Description too short: ${len} chars (min ${DESC_MIN})`, value: len });
    if (len > DESC_MAX) issues.push({ check: 'desc_long', msg: `Description too long: ${len} chars (max ${DESC_MAX})`, value: len });
  }

  // Keywords
  if (!page.keywords) {
    // Theme-grade pages without explicit seoKeywords are acceptable (they inherit)
    if (page.type !== 'theme-grade') {
      issues.push({ check: 'keywords_missing', msg: 'Keywords are missing' });
    }
  }

  return issues;
}

// ---- Extractors ------------------------------------------------------------

function extractProductPages() {
  console.log('\n--- Product Pages ---');
  const dir = path.join(FRONTEND, 'content', 'product-pages', 'en');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  const pages = [];

  for (const file of files) {
    const text = readFile(path.join(dir, file));
    if (!text) continue;

    const seoBlock = extractBlock(text, 'seo');
    if (!seoBlock) {
      console.error(`  WARN: No seo block in ${file}`);
      continue;
    }

    const title = extractField(seoBlock, 'title');
    const description = extractField(seoBlock, 'description');
    const keywords = extractField(seoBlock, 'keywords');
    const slug = extractField(seoBlock, 'slug') || file.replace('.ts', '');

    pages.push({
      type: 'product',
      file: `content/product-pages/en/${file}`,
      slug,
      url: `/en/apps/${slug}`,
      title,
      description,
      keywords,
    });
  }

  console.log(`  Found ${pages.length} product pages`);
  return pages;
}

function extractThemeHubs() {
  console.log('\n--- Theme Hub Pages ---');
  const themesDir = path.join(FRONTEND, 'content', 'themes');
  const themes = fs.readdirSync(themesDir).filter(d => {
    const p = path.join(themesDir, d);
    return fs.statSync(p).isDirectory();
  });
  const pages = [];

  for (const theme of themes) {
    const enFile = path.join(themesDir, theme, 'en.ts');
    const text = readFile(enFile);
    if (!text) continue;

    const title = extractField(text, 'title');
    const description = extractField(text, 'description');
    const keywords = extractField(text, 'keywords');

    pages.push({
      type: 'theme-hub',
      file: `content/themes/${theme}/en.ts`,
      slug: theme,
      url: `/en/worksheets/${theme}`,
      title,
      description,
      keywords,
    });
  }

  console.log(`  Found ${pages.length} theme hub pages`);
  return pages;
}

function extractThemeGrades() {
  console.log('\n--- Theme+Grade Pages ---');
  const themesDir = path.join(FRONTEND, 'content', 'themes');
  const themes = fs.readdirSync(themesDir).filter(d => {
    const p = path.join(themesDir, d);
    return fs.statSync(p).isDirectory();
  });
  const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
  const gradeDisplayNames = {
    'preschool': 'Preschool',
    'kindergarten': 'Kindergarten',
    'first-grade': 'First Grade',
    'second-grade': 'Second Grade',
    'third-grade': 'Third Grade',
  };
  const pages = [];

  for (const theme of themes) {
    const enFile = path.join(themesDir, theme, 'en.ts');
    const text = readFile(enFile);
    if (!text) continue;

    const themeName = extractField(text, 'name');
    const gradeContentBlock = extractBlock(text, 'gradeContent');
    if (!gradeContentBlock) {
      console.error(`  WARN: No gradeContent in ${theme}/en.ts`);
      continue;
    }

    for (const gradeId of gradeIds) {
      const gradeBlock = extractBlock(gradeContentBlock, gradeId);
      if (!gradeBlock) {
        console.error(`  WARN: No ${gradeId} block in ${theme}/en.ts`);
        continue;
      }

      const seoTitle = extractField(gradeBlock, 'seoTitle');
      const seoDescription = extractField(gradeBlock, 'seoDescription');
      const seoKeywords = extractField(gradeBlock, 'seoKeywords');

      // If no explicit SEO title, simulate the auto-generated one from page.tsx
      const effectiveTitle = seoTitle
        || `Free ${themeName || theme} Worksheets for ${gradeDisplayNames[gradeId]} | LessonCraftStudio`;

      // If no explicit SEO description, try extracting intro for fallback simulation
      let effectiveDesc = seoDescription;
      if (!effectiveDesc) {
        const introMatch = gradeBlock.match(/intro:\s*'((?:[^'\\]|\\.)*)'/s);
        if (introMatch) {
          const intro = resolveEscapes(introMatch[1]);
          const periodIdx = intro.indexOf('.', 140);
          effectiveDesc = periodIdx > 0 && periodIdx < 200
            ? intro.slice(0, periodIdx + 1)
            : intro.slice(0, 160).trim() + '...';
        }
      }

      pages.push({
        type: 'theme-grade',
        file: `content/themes/${theme}/en.ts`,
        slug: `${theme}/${gradeId}`,
        url: `/en/worksheets/${theme}/${gradeId}`,
        title: effectiveTitle,
        description: effectiveDesc || null,
        keywords: seoKeywords || null,
        hasSeoOverride: !!seoTitle,
      });
    }
  }

  console.log(`  Found ${pages.length} theme+grade pages`);
  return pages;
}

function extractSecondaryPages() {
  console.log('\n--- Secondary Pages ---');
  const pages = [];

  // 1. Homepage
  const homepageText = readFile(path.join(FRONTEND, 'app', '[locale]', 'page.tsx'));
  if (homepageText) {
    const metaBlock = extractBlock(homepageText, 'homepageMetadata');
    if (metaBlock) {
      const enBlock = extractBlock(metaBlock, 'en');
      if (enBlock) {
        pages.push({
          type: 'secondary', subtype: 'homepage',
          file: 'app/[locale]/page.tsx', slug: 'homepage', url: '/en',
          title: extractField(enBlock, 'title'),
          description: extractField(enBlock, 'description'),
          keywords: extractField(enBlock, 'keywords'),
        });
      }
    }
  }

  // 2. Apps listing
  const appsText = readFile(path.join(FRONTEND, 'app', '[locale]', 'apps', 'page.tsx'));
  if (appsText) {
    const metaBlock = extractBlock(appsText, 'appsMetadata');
    if (metaBlock) {
      const enBlock = extractBlock(metaBlock, 'en');
      if (enBlock) {
        pages.push({
          type: 'secondary', subtype: 'apps-listing',
          file: 'app/[locale]/apps/page.tsx', slug: 'apps', url: '/en/apps',
          title: extractField(enBlock, 'title'),
          description: extractField(enBlock, 'description'),
          keywords: extractField(enBlock, 'keywords'),
        });
      }
    }
  }

  // 3. Worksheets hub
  const worksheetsText = readFile(path.join(FRONTEND, 'app', '[locale]', 'worksheets', 'page.tsx'));
  if (worksheetsText) {
    const pageTitleStart = worksheetsText.indexOf('const pageTitle');
    const pageDescStart = worksheetsText.indexOf('const pageDescription');
    let wsTitle = null;
    let wsDesc = null;
    let wsKeywords = null;

    if (pageTitleStart !== -1) {
      const section = worksheetsText.slice(pageTitleStart, pageDescStart !== -1 ? pageDescStart : pageTitleStart + 2000);
      const m = section.match(/en:\s*'([^']*?)'/);
      wsTitle = m ? m[1] : null;
    }
    if (pageDescStart !== -1) {
      const nextBlock = worksheetsText.indexOf('\nexport', pageDescStart);
      const section = worksheetsText.slice(pageDescStart, nextBlock !== -1 ? nextBlock : pageDescStart + 2000);
      const m = section.match(/en:\s*'([^']*?)'/);
      wsDesc = m ? m[1] : null;
    }
    // keywords are inline in generateMetadata
    const kwMatch = worksheetsText.match(/keywords:\s*'([^']+)'/);
    wsKeywords = kwMatch ? resolveEscapes(kwMatch[1]) : null;

    pages.push({
      type: 'secondary', subtype: 'worksheets-hub',
      file: 'app/[locale]/worksheets/page.tsx', slug: 'worksheets', url: '/en/worksheets',
      title: wsTitle, description: wsDesc, keywords: wsKeywords,
    });
  }

  // 4. Pricing
  const pricingText = readFile(path.join(FRONTEND, 'app', '[locale]', 'pricing', 'page.tsx'));
  if (pricingText) {
    const metaBlock = extractBlock(pricingText, 'pricingMetadata');
    if (metaBlock) {
      const enBlock = extractBlock(metaBlock, 'en');
      if (enBlock) {
        pages.push({
          type: 'secondary', subtype: 'pricing',
          file: 'app/[locale]/pricing/page.tsx', slug: 'pricing', url: '/en/pricing',
          title: extractField(enBlock, 'title'),
          description: extractField(enBlock, 'description'),
          keywords: extractField(enBlock, 'keywords'),
        });
      }
    }
  }

  // 5. Messages-based pages (about, faq, privacy, terms, license)
  const messagesText = readFile(path.join(FRONTEND, 'messages', 'en.json'));
  if (messagesText) {
    const messages = JSON.parse(messagesText);
    const msgPages = [
      { ns: 'about', slug: 'about', url: '/en/about' },
      { ns: 'faq', slug: 'faq', url: '/en/faq' },
      { ns: 'privacy', slug: 'privacy', url: '/en/privacy' },
      { ns: 'terms', slug: 'terms', url: '/en/terms' },
      { ns: 'license', slug: 'license', url: '/en/license' },
    ];
    for (const mp of msgPages) {
      const ns = messages[mp.ns];
      if (!ns) { console.error(`  WARN: No ${mp.ns} namespace in en.json`); continue; }
      pages.push({
        type: 'secondary', subtype: mp.ns,
        file: 'messages/en.json', slug: mp.slug, url: mp.url,
        title: ns.metaTitle || null,
        description: ns.metaDescription || null,
        keywords: ns.metaKeywords || null,
      });
    }
  }

  // 6. Category hub pages
  const categoryText = readFile(path.join(FRONTEND, 'config', 'category-content.ts'));
  if (categoryText) {
    const categorySlugs = ['math', 'language-arts', 'word-games', 'art-creativity', 'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor'];
    for (const slug of categorySlugs) {
      const catBlock = extractBlock(categoryText, slug);
      if (!catBlock) continue;
      const enBlock = extractBlock(catBlock, 'en');
      if (!enBlock) continue;
      pages.push({
        type: 'secondary', subtype: 'category',
        file: 'config/category-content.ts', slug: `category/${slug}`, url: `/en/apps/category/${slug}`,
        title: extractField(enBlock, 'title'),
        description: extractField(enBlock, 'description'),
        keywords: extractField(enBlock, 'keywords'),
      });
    }
  }

  // 7. Grade hub pages
  const gradeText = readFile(path.join(FRONTEND, 'config', 'grade-content.ts'));
  if (gradeText) {
    const gradeSlugs = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
    for (const slug of gradeSlugs) {
      const gradeBlock = extractBlock(gradeText, slug);
      if (!gradeBlock) continue;
      const enBlock = extractBlock(gradeBlock, 'en');
      if (!enBlock) continue;
      pages.push({
        type: 'secondary', subtype: 'grade',
        file: 'config/grade-content.ts', slug: `grade/${slug}`, url: `/en/apps/grades/${slug}`,
        title: extractField(enBlock, 'title'),
        description: extractField(enBlock, 'description'),
        keywords: extractField(enBlock, 'keywords'),
      });
    }
  }

  // 8. Blog listing page
  const blogListText = readFile(path.join(FRONTEND, 'app', '[locale]', 'blog', '(listing)', 'page.tsx'));
  if (blogListText) {
    const enTitleMatch = blogListText.match(/en:\s*\{\s*title:\s*'([^']*?)'/);
    const enDescMatch = blogListText.match(/en:\s*\{[^}]*?description:\s*'([^']*?)'/s);
    pages.push({
      type: 'secondary', subtype: 'blog-listing',
      file: 'app/[locale]/blog/(listing)/page.tsx', slug: 'blog', url: '/en/blog',
      title: enTitleMatch ? enTitleMatch[1] : null,
      description: enDescMatch ? enDescMatch[1] : null,
      keywords: null,
    });
  }

  console.log(`  Found ${pages.length} secondary pages`);
  return pages;
}

// ---- Cross-page checks -----------------------------------------------------

function crossPageChecks(allPages) {
  const results = {
    duplicateTitles: [],
    duplicatePrimaryKeywords: [],
  };

  // 1. Duplicate titles
  const titleMap = {};
  for (const p of allPages) {
    if (!p.title) continue;
    const norm = p.title.toLowerCase().trim();
    if (!titleMap[norm]) titleMap[norm] = [];
    titleMap[norm].push(p);
  }
  for (const [title, group] of Object.entries(titleMap)) {
    if (group.length > 1) {
      results.duplicateTitles.push({
        title: group[0].title,
        count: group.length,
        pages: group.map(p => ({ type: p.type, slug: p.slug, url: p.url })),
      });
    }
  }

  // 2. Primary keyword duplication (product + theme hub pages only)
  const kwPages = allPages.filter(p => p.type === 'product' || p.type === 'theme-hub');
  const kwMap = {};
  for (const p of kwPages) {
    if (!p.keywords) continue;
    const primary = p.keywords.split(',')[0].trim().toLowerCase();
    if (!primary) continue;
    if (!kwMap[primary]) kwMap[primary] = [];
    kwMap[primary].push(p);
  }
  for (const [kw, group] of Object.entries(kwMap)) {
    if (group.length > 1) {
      results.duplicatePrimaryKeywords.push({
        keyword: kw,
        count: group.length,
        pages: group.map(p => ({ type: p.type, slug: p.slug, url: p.url })),
      });
    }
  }

  return results;
}

// ---- Main ------------------------------------------------------------------

function main() {
  console.log('='.repeat(60));
  console.log('  ENGLISH SEO FINAL VALIDATION (Part 98)');
  console.log('='.repeat(60));
  console.log(`  Date: ${new Date().toISOString()}`);

  // Extract all page types
  const productPages = extractProductPages();
  const themeHubs = extractThemeHubs();
  const themeGrades = extractThemeGrades();
  const secondaryPages = extractSecondaryPages();

  const allPages = [...productPages, ...themeHubs, ...themeGrades, ...secondaryPages];

  // Validate each page
  let totalPass = 0;
  let totalFail = 0;
  const failedPages = [];

  for (const page of allPages) {
    const issues = validatePage(page);
    page.issues = issues;
    page.status = issues.length === 0 ? 'PASS' : 'FAIL';
    if (issues.length === 0) totalPass++;
    else {
      totalFail++;
      failedPages.push(page);
    }
  }

  // Cross-page checks
  const crossResults = crossPageChecks(allPages);

  // ---- Print summary ----

  console.log('\n' + '='.repeat(60));
  console.log('  RESULTS');
  console.log('='.repeat(60));

  const typeCounts = {};
  const typePass = {};
  const typeFail = {};
  for (const p of allPages) {
    const t = p.type;
    typeCounts[t] = (typeCounts[t] || 0) + 1;
    if (p.status === 'PASS') typePass[t] = (typePass[t] || 0) + 1;
    else typeFail[t] = (typeFail[t] || 0) + 1;
  }

  console.log(`\n  Total pages: ${allPages.length}`);
  console.log(`  PASS: ${totalPass}   FAIL: ${totalFail}`);

  for (const t of ['product', 'theme-hub', 'theme-grade', 'secondary']) {
    console.log(`  ${t}: ${typeCounts[t] || 0} total, ${typePass[t] || 0} pass, ${typeFail[t] || 0} fail`);
  }

  // Issue breakdown
  const issueCounts = {};
  for (const p of allPages) {
    for (const iss of (p.issues || [])) {
      issueCounts[iss.check] = (issueCounts[iss.check] || 0) + 1;
    }
  }

  if (Object.keys(issueCounts).length > 0) {
    console.log('\n  Issue breakdown:');
    for (const [check, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1])) {
      console.log(`    ${check}: ${count}`);
    }
  }

  // Cross-page
  if (crossResults.duplicateTitles.length > 0) {
    console.log(`\n  Duplicate titles: ${crossResults.duplicateTitles.length} groups`);
    for (const dt of crossResults.duplicateTitles) {
      console.log(`    "${dt.title}" (${dt.count} pages)`);
      for (const p of dt.pages) console.log(`      - [${p.type}] ${p.url}`);
    }
  } else {
    console.log('\n  Duplicate titles: NONE (all unique)');
  }

  if (crossResults.duplicatePrimaryKeywords.length > 0) {
    console.log(`\n  Duplicate primary keywords: ${crossResults.duplicatePrimaryKeywords.length} groups`);
    for (const dk of crossResults.duplicatePrimaryKeywords.slice(0, 10)) {
      console.log(`    "${dk.keyword}" (${dk.count} pages)`);
      for (const p of dk.pages) console.log(`      - [${p.type}] ${p.url}`);
    }
  } else {
    console.log('  Duplicate primary keywords: NONE');
  }

  // Print all failures
  if (failedPages.length > 0) {
    console.log('\n' + '-'.repeat(60));
    console.log('  FAILED PAGES');
    console.log('-'.repeat(60));
    for (const p of failedPages) {
      console.log(`\n  [${p.type}] ${p.url} (${p.file})`);
      if (p.title) console.log(`    Title (${p.title.length}): ${p.title}`);
      if (p.description) console.log(`    Desc  (${p.description.length}): ${p.description.substring(0, 80)}...`);
      for (const iss of p.issues) {
        console.log(`    FAIL: ${iss.msg}`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));

  // ---- Write JSON report ----

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalPages: allPages.length,
      pass: totalPass,
      fail: totalFail,
      byType: typeCounts,
      passByType: typePass,
      failByType: typeFail,
      issueCounts,
    },
    crossPageChecks: crossResults,
    pages: allPages.map(p => ({
      type: p.type,
      subtype: p.subtype || undefined,
      slug: p.slug,
      url: p.url,
      file: p.file,
      status: p.status,
      title: p.title,
      titleLength: p.title ? p.title.length : 0,
      description: p.description,
      descriptionLength: p.description ? p.description.length : 0,
      keywords: p.keywords ? 'present' : 'missing',
      hasSeoOverride: p.hasSeoOverride,
      issues: p.issues,
    })),
  };

  const outputDir = path.join(ROOT, 'docs', 'audit-results');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, 'english-seo-final.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`  Report saved to: ${outputPath}`);
  console.log('='.repeat(60) + '\n');
}

main();
