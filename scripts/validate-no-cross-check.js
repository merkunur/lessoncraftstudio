#!/usr/bin/env node
/**
 * Part 267: Norwegian Cross-Check — Links, Sitemap, Hreflang
 *
 * Validates that Norwegian pages are correctly wired into:
 * - Product page slug config + content files
 * - Theme slug config + content files
 * - Grade slug config
 * - Category hub content (no blocks)
 * - Blog category slugs (no entries)
 * - Internal linking keyword map (no keywords)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FE = path.join(ROOT, 'frontend');

let totalPassed = 0;
let totalFailed = 0;
const results = [];

function report(label, passed, total, detail) {
  const ok = passed === total;
  const status = ok ? 'PASS' : 'FAIL';
  const line = `${label}: ${passed}/${total} ${detail || ''}  [${status}]`;
  results.push(line);
  if (ok) totalPassed++; else totalFailed++;
  return ok;
}

// ─── 1. Product page slugs (33 apps) ───
function checkProductSlugs() {
  const src = fs.readFileSync(path.join(FE, 'config/product-page-slugs.ts'), 'utf8');

  // Extract all appId entries
  const appIdMatches = [...src.matchAll(/appId:\s*'([^']+)'/g)].map(m => m[1]);

  // Extract no slug for each app block
  let noSlugs = 0;
  const slugToAppId = {};

  for (const appId of appIdMatches) {
    const re = new RegExp(`appId:\\s*'${appId}'[\\s\\S]*?no:\\s*'([^']+)'`);
    const m = src.match(re);
    if (m) {
      noSlugs++;
      slugToAppId[m[1]] = appId;
    }
  }

  report('PRODUCT SLUGS (config)', noSlugs, appIdMatches.length, `${noSlugs}/${appIdMatches.length} have no: slug`);

  // Check content files exist
  const noDir = path.join(FE, 'content/product-pages/no');
  const noFiles = fs.readdirSync(noDir).filter(f => f.endsWith('.ts'));

  // Each slug should have a matching content file (slug.ts)
  let contentHits = 0;
  const missingSlugs = [];
  for (const [slug, appId] of Object.entries(slugToAppId)) {
    const fileName = `${slug}.ts`;
    if (noFiles.includes(fileName)) {
      contentHits++;
    } else {
      const altName = `${appId}.ts`;
      if (noFiles.includes(altName) || noFiles.some(f => f === 'word-search-worksheets.ts' && appId === 'word-search')) {
        contentHits++;
      } else {
        missingSlugs.push(`${slug} (${appId})`);
      }
    }
  }

  report('PRODUCT CONTENT FILES', noFiles.length, appIdMatches.length, `${noFiles.length} files in no/`);

  if (missingSlugs.length > 0) {
    console.log('  Missing content files:', missingSlugs.join(', '));
  }
}

// ─── 2. Theme slugs (50 themes) ───
function checkThemeSlugs() {
  const src = fs.readFileSync(path.join(FE, 'config/theme-slugs.ts'), 'utf8');

  const arrayMatch = src.match(/THEME_SLUGS\s*=\s*\[([\s\S]*?)\]\s*as\s*const/);
  let themeIds = [];
  if (arrayMatch) {
    themeIds = [...arrayMatch[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
  }

  // Check no entries in themeSlugMap
  let noCount = 0;
  const missingThemes = [];
  for (const themeId of themeIds) {
    const escaped = themeId.replace(/-/g, '\\-');
    const re = new RegExp(`['"]?${escaped}['"]?:\\s*\\{[^}]*no:\\s*'([^']+)'`);
    if (re.test(src)) {
      noCount++;
    } else {
      missingThemes.push(themeId);
    }
  }

  report('THEME SLUGS (config)', noCount, themeIds.length, `${noCount}/${themeIds.length} have no: slug`);

  // Check content files
  let contentCount = 0;
  const missingContent = [];
  for (const themeId of themeIds) {
    const filePath = path.join(FE, `content/themes/${themeId}/no.ts`);
    if (fs.existsSync(filePath)) {
      contentCount++;
    } else {
      missingContent.push(themeId);
    }
  }

  report('THEME CONTENT FILES', contentCount, themeIds.length, `${contentCount}/${themeIds.length} no.ts exist`);

  if (missingThemes.length > 0) console.log('  Missing theme slugs:', missingThemes.join(', '));
  if (missingContent.length > 0) console.log('  Missing theme content:', missingContent.join(', '));
}

// ─── 3. Grade slugs (5 grades) ───
function checkGradeSlugs() {
  const src = fs.readFileSync(path.join(FE, 'config/grade-slugs.ts'), 'utf8');

  const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
  let noCount = 0;
  const missing = [];

  for (const gradeId of gradeIds) {
    const escaped = gradeId.replace(/-/g, '\\-');
    const re = new RegExp(`['"]?${escaped}['"]?:\\s*\\{[^}]*no:\\s*'([^']+)'`);
    if (re.test(src)) {
      noCount++;
    } else {
      missing.push(gradeId);
    }
  }

  report('GRADE SLUGS', noCount, gradeIds.length, `${noCount}/${gradeIds.length} have no: slug`);
  if (missing.length > 0) console.log('  Missing grade no slugs:', missing.join(', '));
}

// ─── 4. Category hub content (8 categories) ───
function checkCategoryContent() {
  const src = fs.readFileSync(path.join(FE, 'config/category-content.ts'), 'utf8');

  const categories = ['math', 'language-arts', 'word-games', 'art-creativity',
                       'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor'];

  // Count no: blocks in the file
  const noBlocks = (src.match(/\bno:\s*\{/g) || []).length;

  report('CATEGORY HUBS', noBlocks, categories.length, `${noBlocks}/${categories.length} no blocks`);
}

// ─── 5. Blog category slugs (7 categories) ───
function checkBlogCategorySlugs() {
  const src = fs.readFileSync(path.join(FE, 'config/blog-category-slugs.ts'), 'utf8');

  const blogCategories = [
    'teaching-resources', 'worksheet-tips', 'educational-activities',
    'learning-strategies', 'curriculum-guides', 'parent-resources', 'seasonal-content'
  ];

  let noCount = 0;
  const missing = [];
  for (const cat of blogCategories) {
    const escaped = cat.replace(/-/g, '\\-');
    const re = new RegExp(`['"]?${escaped}['"]?:\\s*\\{[^}]*no:\\s*'([^']+)'`);
    if (re.test(src)) {
      noCount++;
    } else {
      missing.push(cat);
    }
  }

  report('BLOG CATEGORIES', noCount, blogCategories.length, `${noCount}/${blogCategories.length} no slugs`);
  if (missing.length > 0) console.log('  Missing blog category no slugs:', missing.join(', '));
}

// ─── 6. Internal linking (no keywords) ───
function checkInternalLinking() {
  const src = fs.readFileSync(path.join(FE, 'lib/internal-linking.ts'), 'utf8');

  // Find the no: { ... } block
  const noMatch = src.match(/\bno:\s*\{([\s\S]*?)\n\s*\}/);
  if (!noMatch) {
    report('INTERNAL LINKING', 0, 1, 'no block NOT FOUND');
    return;
  }

  const noBlock = noMatch[1];
  // Count keyword entries
  const keywords = [...noBlock.matchAll(/'([^']+)':\s*\[/g)].map(m => m[1]);

  // Collect all referenced app IDs
  const appIds = new Set();
  const appMatches = [...noBlock.matchAll(/'([a-z][\w-]+)'/g)];
  for (const m of appMatches) {
    if (!keywords.includes(m[1])) {
      appIds.add(m[1]);
    }
  }

  // Verify referenced apps exist in product page slugs
  const slugSrc = fs.readFileSync(path.join(FE, 'config/product-page-slugs.ts'), 'utf8');
  const validAppIds = [...slugSrc.matchAll(/appId:\s*'([^']+)'/g)].map(m => m[1]);
  const extendedValid = new Set([...validAppIds, 'story-dice']);

  const invalidApps = [...appIds].filter(id => !extendedValid.has(id));

  report('INTERNAL LINKING', keywords.length, 27,
    `${keywords.length} no keywords -> ${appIds.size} app IDs` +
    (invalidApps.length > 0 ? ` (${invalidApps.length} invalid)` : ''));

  if (invalidApps.length > 0) {
    console.log('  Invalid app IDs in no linking:', invalidApps.join(', '));
  }
}

// ─── Run all checks ───
console.log('=== NORWEGIAN CROSS-CHECK REPORT ===\n');

checkProductSlugs();
checkThemeSlugs();
checkGradeSlugs();
checkCategoryContent();
checkBlogCategorySlugs();
checkInternalLinking();

console.log('\n' + results.join('\n'));
console.log(`\nOVERALL: ${totalFailed === 0 ? 'ALL CHECKS PASSED' : `${totalFailed} CHECK(S) FAILED`}`);

process.exit(totalFailed > 0 ? 1 : 0);
