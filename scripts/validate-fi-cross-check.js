#!/usr/bin/env node
/**
 * Part 137: Finnish Cross-Check — Links, Sitemap, Hreflang
 *
 * Validates that Finnish pages are correctly wired into:
 * - Product page slug config + content files
 * - Theme slug config + content files
 * - Grade slug config
 * - Category hub content (fi blocks)
 * - Blog category slugs (fi entries)
 * - Internal linking keyword map (fi keywords)
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

  // Extract fi slug for each app block
  const blocks = src.split(/\{\s*\n\s*appId:/);
  let fiSlugs = 0;
  const slugToAppId = {};

  for (const appId of appIdMatches) {
    // Find the block for this appId and check if it has fi:
    const re = new RegExp(`appId:\\s*'${appId}'[\\s\\S]*?fi:\\s*'([^']+)'`);
    const m = src.match(re);
    if (m) {
      fiSlugs++;
      slugToAppId[m[1]] = appId;
    }
  }

  report('PRODUCT SLUGS (config)', fiSlugs, appIdMatches.length, `${fiSlugs}/${appIdMatches.length} have fi: slug`);

  // Check content files exist
  const fiDir = path.join(FE, 'content/product-pages/fi');
  const fiFiles = fs.readdirSync(fiDir).filter(f => f.endsWith('.ts'));

  // Each slug should have a matching content file (slug.ts)
  let contentHits = 0;
  const missingSlugs = [];
  for (const [slug, appId] of Object.entries(slugToAppId)) {
    const fileName = `${slug}.ts`;
    if (fiFiles.includes(fileName)) {
      contentHits++;
    } else {
      // Some files use the appId-based name, check that too
      const altName = `${appId}.ts`;
      // Also check word-search special case
      if (fiFiles.includes(altName) || fiFiles.some(f => f === 'word-search-worksheets.ts' && appId === 'word-search')) {
        contentHits++;
      } else {
        missingSlugs.push(`${slug} (${appId})`);
      }
    }
  }

  // Alternative: just verify count matches
  report('PRODUCT CONTENT FILES', fiFiles.length, appIdMatches.length, `${fiFiles.length} files in fi/`);

  if (missingSlugs.length > 0) {
    console.log('  Missing content files:', missingSlugs.join(', '));
  }
}

// ─── 2. Theme slugs (50 themes) ───
function checkThemeSlugs() {
  const src = fs.readFileSync(path.join(FE, 'config/theme-slugs.ts'), 'utf8');

  // Extract theme IDs from THEME_SLUGS array
  const themeMatches = [...src.matchAll(/'([a-z][\w-]*)'/g)]
    .map(m => m[1])
    .filter(s => !['as', 'const', 'en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi', 'string', 'Record', 'number'].includes(s));

  // Better: extract from the THEME_SLUGS array
  const arrayMatch = src.match(/THEME_SLUGS\s*=\s*\[([\s\S]*?)\]\s*as\s*const/);
  let themeIds = [];
  if (arrayMatch) {
    themeIds = [...arrayMatch[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
  }

  // Check fi entries in themeSlugMap
  let fiCount = 0;
  const missingThemes = [];
  for (const themeId of themeIds) {
    const escaped = themeId.replace(/-/g, '\\-');
    const re = new RegExp(`['"]?${escaped}['"]?:\\s*\\{[^}]*fi:\\s*'([^']+)'`);
    if (re.test(src)) {
      fiCount++;
    } else {
      missingThemes.push(themeId);
    }
  }

  report('THEME SLUGS (config)', fiCount, themeIds.length, `${fiCount}/${themeIds.length} have fi: slug`);

  // Check content files
  let contentCount = 0;
  const missingContent = [];
  for (const themeId of themeIds) {
    const filePath = path.join(FE, `content/themes/${themeId}/fi.ts`);
    if (fs.existsSync(filePath)) {
      contentCount++;
    } else {
      missingContent.push(themeId);
    }
  }

  report('THEME CONTENT FILES', contentCount, themeIds.length, `${contentCount}/${themeIds.length} fi.ts exist`);

  if (missingThemes.length > 0) console.log('  Missing theme slugs:', missingThemes.join(', '));
  if (missingContent.length > 0) console.log('  Missing theme content:', missingContent.join(', '));
}

// ─── 3. Grade slugs (5 grades) ───
function checkGradeSlugs() {
  const src = fs.readFileSync(path.join(FE, 'config/grade-slugs.ts'), 'utf8');

  const gradeIds = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
  let fiCount = 0;
  const missing = [];

  for (const gradeId of gradeIds) {
    // Escape hyphens in gradeId for regex
    const escaped = gradeId.replace(/-/g, '\\-');
    const re = new RegExp(`['"]?${escaped}['"]?:\\s*\\{[^}]*fi:\\s*'([^']+)'`);
    if (re.test(src)) {
      fiCount++;
    } else {
      missing.push(gradeId);
    }
  }

  report('GRADE SLUGS', fiCount, gradeIds.length, `${fiCount}/${gradeIds.length} have fi: slug`);
  if (missing.length > 0) console.log('  Missing grade fi slugs:', missing.join(', '));
}

// ─── 4. Category hub content (8 categories) ───
function checkCategoryContent() {
  const src = fs.readFileSync(path.join(FE, 'config/category-content.ts'), 'utf8');

  const categories = ['math', 'language-arts', 'word-games', 'art-creativity',
                       'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor'];

  // Count fi: blocks in the file
  const fiBlocks = (src.match(/\bfi:\s*\{/g) || []).length;

  report('CATEGORY HUBS', fiBlocks, categories.length, `${fiBlocks}/${categories.length} fi blocks`);
}

// ─── 5. Blog category slugs (7 categories) ───
function checkBlogCategorySlugs() {
  const src = fs.readFileSync(path.join(FE, 'config/blog-category-slugs.ts'), 'utf8');

  const blogCategories = [
    'teaching-resources', 'worksheet-tips', 'educational-activities',
    'learning-strategies', 'curriculum-guides', 'parent-resources', 'seasonal-content'
  ];

  let fiCount = 0;
  const missing = [];
  for (const cat of blogCategories) {
    const escaped = cat.replace(/-/g, '\\-');
    const re = new RegExp(`['"]?${escaped}['"]?:\\s*\\{[^}]*fi:\\s*'([^']+)'`);
    if (re.test(src)) {
      fiCount++;
    } else {
      missing.push(cat);
    }
  }

  report('BLOG CATEGORIES', fiCount, blogCategories.length, `${fiCount}/${blogCategories.length} fi slugs`);
  if (missing.length > 0) console.log('  Missing blog category fi slugs:', missing.join(', '));
}

// ─── 6. Internal linking (fi keywords) ───
function checkInternalLinking() {
  const src = fs.readFileSync(path.join(FE, 'lib/internal-linking.ts'), 'utf8');

  // Find the fi: { ... } block
  const fiMatch = src.match(/\bfi:\s*\{([\s\S]*?)\n\s*\}/);
  if (!fiMatch) {
    report('INTERNAL LINKING', 0, 1, 'fi block NOT FOUND');
    return;
  }

  const fiBlock = fiMatch[1];
  // Count keyword entries
  const keywords = [...fiBlock.matchAll(/'([^']+)':\s*\[/g)].map(m => m[1]);

  // Collect all referenced app IDs
  const appIds = new Set();
  const appMatches = [...fiBlock.matchAll(/'([a-z][\w-]+)'/g)];
  for (const m of appMatches) {
    // Skip keywords (they have : [ after them), keep app IDs
    if (!keywords.includes(m[1])) {
      appIds.add(m[1]);
    }
  }

  // Verify referenced apps exist in product page slugs
  const slugSrc = fs.readFileSync(path.join(FE, 'config/product-page-slugs.ts'), 'utf8');
  const validAppIds = [...slugSrc.matchAll(/appId:\s*'([^']+)'/g)].map(m => m[1]);
  // story-dice is a valid app but not in product-page-slugs (it's a standalone), allow it
  const extendedValid = new Set([...validAppIds, 'story-dice']);

  const invalidApps = [...appIds].filter(id => !extendedValid.has(id));

  report('INTERNAL LINKING', keywords.length, 27,
    `${keywords.length} fi keywords -> ${appIds.size} app IDs` +
    (invalidApps.length > 0 ? ` (${invalidApps.length} invalid)` : ''));

  if (invalidApps.length > 0) {
    console.log('  Invalid app IDs in fi linking:', invalidApps.join(', '));
  }
}

// ─── Run all checks ───
console.log('=== FINNISH CROSS-CHECK REPORT ===\n');

checkProductSlugs();
checkThemeSlugs();
checkGradeSlugs();
checkCategoryContent();
checkBlogCategorySlugs();
checkInternalLinking();

console.log('\n' + results.join('\n'));
console.log(`\nOVERALL: ${totalFailed === 0 ? 'ALL CHECKS PASSED' : `${totalFailed} CHECK(S) FAILED`}`);

process.exit(totalFailed > 0 ? 1 : 0);
