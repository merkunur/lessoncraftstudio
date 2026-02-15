#!/usr/bin/env node
/**
 * Part 99: English Internal Linking & Sitemap Cross-Check
 *
 * Three validations:
 *   A. Keyword-Anchor Alignment: Every product page has inbound keyword mappings
 *   B. Sitemap Completeness: All English page types have source data for sitemap generation
 *   C. Hreflang Data Consistency: Alternate URL configs cover all 11 locales
 *
 * Usage:
 *   node scripts/validate-english-crosscheck.js
 *   node scripts/validate-english-crosscheck.js --json docs/audit-results/english-crosscheck-final.json
 */

const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Read a TS/JS file, strip imports/exports, and eval-extract a named object */
function extractTsObject(filePath, varPattern) {
  const src = fs.readFileSync(filePath, 'utf8');
  const match = src.match(varPattern);
  if (!match) return null;
  return match[1];
}

/** Extract a simple Record<string, string[]> map from TS source */
function parseKeywordProductMap(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');

  // Find the KEYWORD_PRODUCT_MAP block
  const startIdx = src.indexOf('const KEYWORD_PRODUCT_MAP');
  if (startIdx === -1) return {};

  // Find the closing }; of this const
  let braceDepth = 0;
  let started = false;
  let endIdx = startIdx;
  for (let i = startIdx; i < src.length; i++) {
    if (src[i] === '{') { braceDepth++; started = true; }
    if (src[i] === '}') { braceDepth--; }
    if (started && braceDepth === 0) { endIdx = i + 1; break; }
  }

  const block = src.substring(startIdx, endIdx);
  const map = {};

  // Parse each keyword: [...appIds] entry
  const entryRegex = /'([^']+)'\s*:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = entryRegex.exec(block)) !== null) {
    const keyword = m[1];
    const appIds = m[2].match(/'([^']+)'/g)?.map(s => s.replace(/'/g, '')) || [];
    map[keyword] = appIds;
  }
  return map;
}

/** Extract all appIds from product-page-slugs.ts */
function parseProductPageAppIds(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const appIds = [];
  const regex = /appId:\s*'([^']+)'/g;
  let m;
  while ((m = regex.exec(src)) !== null) {
    appIds.push(m[1]);
  }
  return appIds;
}

/** Extract slug entries from product-page-slugs.ts */
function parseProductPageSlugs(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const entries = [];

  // Match each config block: { appId: '...', slugs: { en: '...', de: '...', ... } }
  const blockRegex = /\{\s*appId:\s*'([^']+)',\s*slugs:\s*\{([^}]+)\}/g;
  let m;
  while ((m = blockRegex.exec(src)) !== null) {
    const appId = m[1];
    const slugBlock = m[2];
    const slugs = {};
    const slugRegex = /(\w+):\s*'([^']+)'/g;
    let s;
    while ((s = slugRegex.exec(slugBlock)) !== null) {
      slugs[s[1]] = s[2];
    }
    entries.push({ appId, slugs });
  }
  return entries;
}

/** Parse a slug map from TS source (Record<string, Record<string, string>>) */
function parseSlugMap(filePath, varName) {
  const src = fs.readFileSync(filePath, 'utf8');

  const startMarker = varName;
  let startIdx = src.indexOf(startMarker);
  if (startIdx === -1) return {};

  // Find the opening { of the outer object (skip the first { which is the type annotation)
  let objStart = src.indexOf('{', startIdx);
  // Skip past Record<...> = { — find the = sign first
  const eqIdx = src.indexOf('=', startIdx);
  if (eqIdx !== -1 && eqIdx < objStart + 50) {
    objStart = src.indexOf('{', eqIdx);
  }
  if (objStart === -1) return {};

  // Find the matching closing }
  let braceDepth = 0;
  let endIdx = objStart;
  for (let i = objStart; i < src.length; i++) {
    if (src[i] === '{') braceDepth++;
    if (src[i] === '}') braceDepth--;
    if (braceDepth === 0) { endIdx = i + 1; break; }
  }

  const block = src.substring(objStart, endIdx);
  const map = {};

  // Parse top-level keys — handle both quoted ('fairy-tales') and unquoted (animals) keys
  // Strategy: find each inner { ... } block and the key before it
  const entryRegex = /(?:'([^']+)'|(\w[\w-]*))\s*:\s*\{([^}]+)\}/g;
  let m;
  while ((m = entryRegex.exec(block)) !== null) {
    const id = m[1] || m[2]; // m[1] = quoted key, m[2] = unquoted key
    const inner = m[3];
    const slugs = {};
    const slugRegex = /(\w[\w-]*):\s*'([^']+)'/g;
    let s;
    while ((s = slugRegex.exec(inner)) !== null) {
      slugs[s[1]] = s[2];
    }
    if (Object.keys(slugs).length > 0) {
      map[id] = slugs;
    }
  }
  return map;
}

/** Parse array of string constants from TS source */
function parseStringArray(filePath, varName) {
  const src = fs.readFileSync(filePath, 'utf8');
  const startMarker = varName;
  const startIdx = src.indexOf(startMarker);
  if (startIdx === -1) return [];

  const arrStart = src.indexOf('[', startIdx);
  const arrEnd = src.indexOf(']', arrStart);
  if (arrStart === -1 || arrEnd === -1) return [];

  const block = src.substring(arrStart, arrEnd + 1);
  const items = [];
  const regex = /'([^']+)'/g;
  let m;
  while ((m = regex.exec(block)) !== null) {
    items.push(m[1]);
  }
  return items;
}

/** Extract seo.appId from a product page content file */
function extractProductSeoData(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');

  const appIdMatch = src.match(/appId:\s*'([^']+)'/);
  const slugMatch = src.match(/slug:\s*'([^']+)'/);
  const keywordsMatch = src.match(/keywords:\s*'([^']+)'/);

  return {
    appId: appIdMatch ? appIdMatch[1] : null,
    slug: slugMatch ? slugMatch[1] : null,
    keywords: keywordsMatch ? keywordsMatch[1].split(',').map(k => k.trim().toLowerCase()) : [],
  };
}

// ── CHECK A: Keyword-Anchor Alignment ───────────────────────────────────────

function checkKeywordAlignment() {
  console.log('\n=== CHECK A: Keyword-Anchor Alignment ===\n');

  const internalLinkingPath = path.join(FRONTEND, 'lib', 'internal-linking.ts');
  const productSlugsPath = path.join(FRONTEND, 'config', 'product-page-slugs.ts');
  const productPagesDir = path.join(FRONTEND, 'content', 'product-pages', 'en');

  // 1. Parse KEYWORD_PRODUCT_MAP
  const kpm = parseKeywordProductMap(internalLinkingPath);
  const kpmKeywords = Object.keys(kpm);
  console.log(`  KEYWORD_PRODUCT_MAP: ${kpmKeywords.length} keywords`);

  // 2. Collect all appIds referenced in KPM
  const kpmAppIds = new Set();
  for (const appIds of Object.values(kpm)) {
    appIds.forEach(id => kpmAppIds.add(id));
  }
  console.log(`  Unique appIds in KPM: ${kpmAppIds.size}`);

  // 3. Get all 33 canonical appIds from product-page-slugs
  const canonicalAppIds = parseProductPageAppIds(productSlugsPath);
  console.log(`  Product pages (from slugs config): ${canonicalAppIds.length}`);

  // 4. Read product page content files for SEO data
  const productFiles = fs.readdirSync(productPagesDir)
    .filter(f => f.endsWith('.ts'))
    .sort();
  console.log(`  Product page content files: ${productFiles.length}`);

  const productSeoData = {};
  for (const file of productFiles) {
    const data = extractProductSeoData(path.join(productPagesDir, file));
    if (data.appId) {
      productSeoData[file] = data;
    }
  }

  // 5. Check: which canonical appIds have inbound keyword mappings?
  const results = {
    totalProducts: canonicalAppIds.length,
    totalKeywords: kpmKeywords.length,
    totalKpmAppIds: kpmAppIds.size,
    productsWithMapping: [],
    productsWithoutMapping: [],
    ghostAppIds: [],         // appIds in KPM but NOT in product-page-slugs
    keywordsPerProduct: {},  // appId -> keywords that map to it
  };

  // Build reverse map: appId -> keywords
  const reverseMap = {};
  for (const [keyword, appIds] of Object.entries(kpm)) {
    for (const appId of appIds) {
      if (!reverseMap[appId]) reverseMap[appId] = [];
      reverseMap[appId].push(keyword);
    }
  }

  for (const appId of canonicalAppIds) {
    const keywords = reverseMap[appId] || [];
    results.keywordsPerProduct[appId] = keywords;
    if (keywords.length > 0) {
      results.productsWithMapping.push(appId);
    } else {
      results.productsWithoutMapping.push(appId);
    }
  }

  // Check for ghost appIds (in KPM but no product page)
  const canonicalSet = new Set(canonicalAppIds);
  for (const appId of kpmAppIds) {
    if (!canonicalSet.has(appId)) {
      results.ghostAppIds.push(appId);
    }
  }

  // Report
  console.log(`\n  Products WITH inbound keyword mapping: ${results.productsWithMapping.length}/${results.totalProducts}`);
  if (results.productsWithoutMapping.length > 0) {
    console.log(`  \x1b[33mWARN\x1b[0m Products WITHOUT mapping (orphaned from blog auto-linking):`);
    for (const appId of results.productsWithoutMapping) {
      console.log(`    - ${appId}`);
    }
  } else {
    console.log(`  \x1b[32mPASS\x1b[0m All products have at least one inbound keyword`);
  }

  if (results.ghostAppIds.length > 0) {
    console.log(`\n  \x1b[33mINFO\x1b[0m AppIds in KPM with no product page (${results.ghostAppIds.length}):`);
    for (const appId of results.ghostAppIds) {
      const keywords = reverseMap[appId] || [];
      console.log(`    - ${appId} (keywords: ${keywords.join(', ')})`);
    }
  }

  // Show keyword count per product
  console.log(`\n  Keyword coverage per product:`);
  const sorted = [...canonicalAppIds].sort((a, b) =>
    (results.keywordsPerProduct[a]?.length || 0) - (results.keywordsPerProduct[b]?.length || 0)
  );
  for (const appId of sorted) {
    const kws = results.keywordsPerProduct[appId] || [];
    const icon = kws.length === 0 ? '\x1b[31mX\x1b[0m' : kws.length <= 2 ? '\x1b[33m!\x1b[0m' : '\x1b[32m+\x1b[0m';
    console.log(`    ${icon} ${appId}: ${kws.length} keywords [${kws.join(', ')}]`);
  }

  return results;
}

// ── CHECK B: Sitemap Source Data Completeness ───────────────────────────────

function checkSitemapCompleteness() {
  console.log('\n=== CHECK B: Sitemap Source Data Completeness ===\n');

  const results = {
    productPages: { expected: 33, found: 0, missing: [] },
    themeHubs: { expected: 50, found: 0, missing: [] },
    themeGradeCombos: { expected: 250, found: 0, missing: [] },
    categoryHubs: { expected: 8, found: 0, missing: [] },
    gradeHubs: { expected: 5, found: 0, missing: [] },
    staticPages: { expected: 10, found: 0, missing: [] },
    blogCategories: { expected: 7, found: 0, missing: [] },
  };

  // B1: Product pages - check slugs config has all 33 with English slugs
  const productSlugsPath = path.join(FRONTEND, 'config', 'product-page-slugs.ts');
  const productEntries = parseProductPageSlugs(productSlugsPath);
  results.productPages.found = productEntries.length;

  const missingEnSlugs = productEntries.filter(e => !e.slugs.en);
  if (missingEnSlugs.length > 0) {
    results.productPages.missing = missingEnSlugs.map(e => e.appId);
  }

  // Check all 11 locales have slugs
  const productLocaleGaps = [];
  for (const entry of productEntries) {
    const missing = ALL_LOCALES.filter(l => !entry.slugs[l]);
    if (missing.length > 0) {
      productLocaleGaps.push({ appId: entry.appId, missingLocales: missing });
    }
  }

  console.log(`  Product pages: ${results.productPages.found}/${results.productPages.expected} (${productLocaleGaps.length} with locale gaps)`);
  if (results.productPages.found === results.productPages.expected && productLocaleGaps.length === 0) {
    console.log(`  \x1b[32mPASS\x1b[0m All product pages have slugs for all 11 locales`);
  }

  // B2: Theme hubs - check theme-slugs.ts
  const themeSlugsPath = path.join(FRONTEND, 'config', 'theme-slugs.ts');
  const themeSlugMap = parseSlugMap(themeSlugsPath, 'themeSlugMap');
  const themeIds = Object.keys(themeSlugMap);
  results.themeHubs.found = themeIds.length;

  const themeLocaleGaps = [];
  for (const [themeId, slugs] of Object.entries(themeSlugMap)) {
    const missing = ALL_LOCALES.filter(l => !slugs[l]);
    if (missing.length > 0) {
      themeLocaleGaps.push({ themeId, missingLocales: missing });
    }
  }

  console.log(`  Theme hubs: ${results.themeHubs.found}/${results.themeHubs.expected} (${themeLocaleGaps.length} with locale gaps)`);
  if (results.themeHubs.found === results.themeHubs.expected && themeLocaleGaps.length === 0) {
    console.log(`  \x1b[32mPASS\x1b[0m All theme hubs have slugs for all 11 locales`);
  }

  // B3: Theme+grade combos = 50 themes x 5 grades
  const gradeSlugsPath = path.join(FRONTEND, 'config', 'grade-slugs.ts');
  const gradeSlugMap = parseSlugMap(gradeSlugsPath, 'gradeSlugMap');
  const gradeIds = Object.keys(gradeSlugMap);

  const comboCount = themeIds.length * gradeIds.length;
  results.themeGradeCombos.found = comboCount;

  const gradeLocaleGaps = [];
  for (const [gradeId, slugs] of Object.entries(gradeSlugMap)) {
    const missing = ALL_LOCALES.filter(l => !slugs[l]);
    if (missing.length > 0) {
      gradeLocaleGaps.push({ gradeId, missingLocales: missing });
    }
  }

  console.log(`  Theme+grade combos: ${results.themeGradeCombos.found}/${results.themeGradeCombos.expected}`);
  console.log(`  Grades: ${gradeIds.length}/5 (${gradeLocaleGaps.length} with locale gaps)`);
  if (comboCount === 250 && gradeLocaleGaps.length === 0) {
    console.log(`  \x1b[32mPASS\x1b[0m All 250 theme+grade combos have slug data`);
  }

  // B4: Category hubs (8 product categories)
  const catSlugsPath = path.join(FRONTEND, 'config', 'product-category-slugs.ts');
  const catSlugMap = parseSlugMap(catSlugsPath, 'productCategorySlugMap');
  const catIds = Object.keys(catSlugMap);
  results.categoryHubs.found = catIds.length;

  console.log(`  Product category hubs: ${results.categoryHubs.found}/${results.categoryHubs.expected}`);
  if (results.categoryHubs.found === results.categoryHubs.expected) {
    console.log(`  \x1b[32mPASS\x1b[0m All 8 category hubs present`);
  }

  // B5: Grade hubs
  results.gradeHubs.found = gradeIds.length;
  console.log(`  Grade hubs: ${results.gradeHubs.found}/${results.gradeHubs.expected}`);
  if (results.gradeHubs.found === results.gradeHubs.expected) {
    console.log(`  \x1b[32mPASS\x1b[0m All 5 grade hubs present`);
  }

  // B6: Static pages
  const expectedStaticPages = [
    'homepage', 'apps', 'worksheets', 'pricing', 'blog',
    'about', 'faq', 'privacy', 'terms', 'license',
  ];
  // Verify the corresponding page.tsx files exist
  const staticPagePaths = {
    'homepage': path.join(FRONTEND, 'app', '[locale]', 'page.tsx'),
    'apps': path.join(FRONTEND, 'app', '[locale]', 'apps', 'page.tsx'),
    'worksheets': path.join(FRONTEND, 'app', '[locale]', 'worksheets', 'page.tsx'),
    'pricing': path.join(FRONTEND, 'app', '[locale]', 'pricing', 'page.tsx'),
    'blog': path.join(FRONTEND, 'app', '[locale]', 'blog', '(listing)', 'page.tsx'),
    'about': path.join(FRONTEND, 'app', '[locale]', 'about', 'page.tsx'),
    'faq': path.join(FRONTEND, 'app', '[locale]', 'faq', 'page.tsx'),
    'privacy': path.join(FRONTEND, 'app', '[locale]', 'privacy', 'page.tsx'),
    'terms': path.join(FRONTEND, 'app', '[locale]', 'terms', 'page.tsx'),
    'license': path.join(FRONTEND, 'app', '[locale]', 'license', 'page.tsx'),
  };

  const foundStatic = [];
  const missingStatic = [];
  for (const [name, pagePath] of Object.entries(staticPagePaths)) {
    if (fs.existsSync(pagePath)) {
      foundStatic.push(name);
    } else {
      missingStatic.push(name);
    }
  }
  results.staticPages.found = foundStatic.length;
  results.staticPages.missing = missingStatic;

  console.log(`  Static pages: ${results.staticPages.found}/${results.staticPages.expected}`);
  if (missingStatic.length > 0) {
    console.log(`  \x1b[33mWARN\x1b[0m Missing static page files:`);
    for (const p of missingStatic) console.log(`    - ${p}`);
  } else {
    console.log(`  \x1b[32mPASS\x1b[0m All static page files exist`);
  }

  // B7: Blog categories (7 categories)
  const blogCatSlugsPath = path.join(FRONTEND, 'config', 'blog-category-slugs.ts');
  const blogCatSlugMap = parseSlugMap(blogCatSlugsPath, 'blogCategorySlugMap');
  const blogCatIds = Object.keys(blogCatSlugMap);
  results.blogCategories.found = blogCatIds.length;

  console.log(`  Blog categories: ${results.blogCategories.found}/${results.blogCategories.expected}`);
  if (results.blogCategories.found === results.blogCategories.expected) {
    console.log(`  \x1b[32mPASS\x1b[0m All 7 blog category slugs present`);
  }

  // Summary
  const totalExpected = 33 + 50 + 250 + 8 + 5 + 10 + 7; // 363
  const totalFound = results.productPages.found +
    results.themeHubs.found +
    results.themeGradeCombos.found +
    results.categoryHubs.found +
    results.gradeHubs.found +
    results.staticPages.found +
    results.blogCategories.found;

  console.log(`\n  Total source data: ${totalFound}/${totalExpected} page types covered`);

  results.productLocaleGaps = productLocaleGaps;
  results.themeLocaleGaps = themeLocaleGaps;
  results.gradeLocaleGaps = gradeLocaleGaps;

  return results;
}

// ── CHECK C: Hreflang Data Consistency ──────────────────────────────────────

function checkHreflangConsistency() {
  console.log('\n=== CHECK C: Hreflang Data Consistency (Source Configs) ===\n');

  const results = {
    productPages: { total: 0, complete: 0, incomplete: [] },
    themeHubs: { total: 0, complete: 0, incomplete: [] },
    gradeHubs: { total: 0, complete: 0, incomplete: [] },
    categoryHubs: { total: 0, complete: 0, incomplete: [] },
  };

  // C1: Product page alternate URLs
  const productSlugsPath = path.join(FRONTEND, 'config', 'product-page-slugs.ts');
  const productEntries = parseProductPageSlugs(productSlugsPath);
  results.productPages.total = productEntries.length;

  for (const entry of productEntries) {
    const missingLocales = ALL_LOCALES.filter(l => !entry.slugs[l]);
    if (missingLocales.length === 0) {
      results.productPages.complete++;
    } else {
      results.productPages.incomplete.push({
        appId: entry.appId,
        missingLocales,
      });
    }
  }

  console.log(`  Product pages: ${results.productPages.complete}/${results.productPages.total} have all 11 locale alternates`);
  if (results.productPages.incomplete.length === 0) {
    console.log(`  \x1b[32mPASS\x1b[0m Full hreflang coverage for product pages`);
  } else {
    for (const item of results.productPages.incomplete) {
      console.log(`  \x1b[33mWARN\x1b[0m ${item.appId} missing: ${item.missingLocales.join(', ')}`);
    }
  }

  // C2: Theme hub alternate URLs
  const themeSlugsPath = path.join(FRONTEND, 'config', 'theme-slugs.ts');
  const themeSlugMap = parseSlugMap(themeSlugsPath, 'themeSlugMap');
  const themeIds = Object.keys(themeSlugMap);
  results.themeHubs.total = themeIds.length;

  for (const [themeId, slugs] of Object.entries(themeSlugMap)) {
    const missingLocales = ALL_LOCALES.filter(l => !slugs[l]);
    if (missingLocales.length === 0) {
      results.themeHubs.complete++;
    } else {
      results.themeHubs.incomplete.push({ themeId, missingLocales });
    }
  }

  console.log(`  Theme hubs: ${results.themeHubs.complete}/${results.themeHubs.total} have all 11 locale alternates`);
  if (results.themeHubs.incomplete.length === 0) {
    console.log(`  \x1b[32mPASS\x1b[0m Full hreflang coverage for theme hubs`);
  } else {
    for (const item of results.themeHubs.incomplete) {
      console.log(`  \x1b[33mWARN\x1b[0m ${item.themeId} missing: ${item.missingLocales.join(', ')}`);
    }
  }

  // C3: Grade hub alternate URLs
  const gradeSlugsPath = path.join(FRONTEND, 'config', 'grade-slugs.ts');
  const gradeSlugMap = parseSlugMap(gradeSlugsPath, 'gradeSlugMap');
  const gradeIds = Object.keys(gradeSlugMap);
  results.gradeHubs.total = gradeIds.length;

  for (const [gradeId, slugs] of Object.entries(gradeSlugMap)) {
    const missingLocales = ALL_LOCALES.filter(l => !slugs[l]);
    if (missingLocales.length === 0) {
      results.gradeHubs.complete++;
    } else {
      results.gradeHubs.incomplete.push({ gradeId, missingLocales });
    }
  }

  console.log(`  Grade hubs: ${results.gradeHubs.complete}/${results.gradeHubs.total} have all 11 locale alternates`);
  if (results.gradeHubs.incomplete.length === 0) {
    console.log(`  \x1b[32mPASS\x1b[0m Full hreflang coverage for grade hubs`);
  } else {
    for (const item of results.gradeHubs.incomplete) {
      console.log(`  \x1b[33mWARN\x1b[0m ${item.gradeId} missing: ${item.missingLocales.join(', ')}`);
    }
  }

  // C4: Category hub alternate URLs
  const catSlugsPath = path.join(FRONTEND, 'config', 'product-category-slugs.ts');
  const catSlugMap = parseSlugMap(catSlugsPath, 'productCategorySlugMap');
  const catIds = Object.keys(catSlugMap);
  results.categoryHubs.total = catIds.length;

  for (const [catId, slugs] of Object.entries(catSlugMap)) {
    const missingLocales = ALL_LOCALES.filter(l => !slugs[l]);
    if (missingLocales.length === 0) {
      results.categoryHubs.complete++;
    } else {
      results.categoryHubs.incomplete.push({ catId, missingLocales });
    }
  }

  console.log(`  Category hubs: ${results.categoryHubs.complete}/${results.categoryHubs.total} have all 11 locale alternates`);
  if (results.categoryHubs.incomplete.length === 0) {
    console.log(`  \x1b[32mPASS\x1b[0m Full hreflang coverage for category hubs`);
  } else {
    for (const item of results.categoryHubs.incomplete) {
      console.log(`  \x1b[33mWARN\x1b[0m ${item.catId} missing: ${item.missingLocales.join(', ')}`);
    }
  }

  return results;
}

// ── MAIN ────────────────────────────────────────────────────────────────────

function main() {
  console.log('========================================');
  console.log('  Part 99: English Cross-Check Validation');
  console.log('========================================');

  const checkA = checkKeywordAlignment();
  const checkB = checkSitemapCompleteness();
  const checkC = checkHreflangConsistency();

  // ── Summary ───────────────────────────────────────────────────────────────

  console.log('\n========================================');
  console.log('  SUMMARY');
  console.log('========================================\n');

  const issues = [];

  // Check A issues
  if (checkA.productsWithoutMapping.length > 0) {
    issues.push(`${checkA.productsWithoutMapping.length} product(s) have no inbound keyword mapping`);
  }

  // Check B issues
  if (checkB.productPages.found !== checkB.productPages.expected) {
    issues.push(`Product pages: ${checkB.productPages.found}/${checkB.productPages.expected}`);
  }
  if (checkB.themeHubs.found !== checkB.themeHubs.expected) {
    issues.push(`Theme hubs: ${checkB.themeHubs.found}/${checkB.themeHubs.expected}`);
  }
  if (checkB.themeGradeCombos.found !== checkB.themeGradeCombos.expected) {
    issues.push(`Theme+grade combos: ${checkB.themeGradeCombos.found}/${checkB.themeGradeCombos.expected}`);
  }
  if (checkB.staticPages.missing.length > 0) {
    issues.push(`Missing static pages: ${checkB.staticPages.missing.join(', ')}`);
  }

  // Check C issues
  if (checkC.productPages.incomplete.length > 0) {
    issues.push(`${checkC.productPages.incomplete.length} product page(s) with incomplete hreflang`);
  }
  if (checkC.themeHubs.incomplete.length > 0) {
    issues.push(`${checkC.themeHubs.incomplete.length} theme hub(s) with incomplete hreflang`);
  }

  if (issues.length === 0) {
    console.log('  \x1b[32mALL CHECKS PASSED\x1b[0m');
    console.log('  - All 33 products have inbound keyword mappings');
    console.log('  - All sitemap source data is complete');
    console.log('  - All hreflang alternate configs cover 11 locales');
  } else {
    console.log(`  \x1b[33m${issues.length} ISSUE(S) FOUND:\x1b[0m`);
    for (const issue of issues) {
      console.log(`  - ${issue}`);
    }
  }

  // ── JSON Output ───────────────────────────────────────────────────────────

  const report = {
    timestamp: new Date().toISOString(),
    script: 'validate-english-crosscheck.js',
    part: 99,
    phase: '6 - English Verification',
    checks: {
      A_keywordAlignment: {
        status: checkA.productsWithoutMapping.length === 0 ? 'PASS' : 'WARN',
        totalProducts: checkA.totalProducts,
        totalKeywords: checkA.totalKeywords,
        productsWithMapping: checkA.productsWithMapping.length,
        productsWithoutMapping: checkA.productsWithoutMapping,
        ghostAppIds: checkA.ghostAppIds,
        keywordsPerProduct: checkA.keywordsPerProduct,
      },
      B_sitemapCompleteness: {
        status: (
          checkB.productPages.found === checkB.productPages.expected &&
          checkB.themeHubs.found === checkB.themeHubs.expected &&
          checkB.themeGradeCombos.found === checkB.themeGradeCombos.expected &&
          checkB.categoryHubs.found === checkB.categoryHubs.expected &&
          checkB.gradeHubs.found === checkB.gradeHubs.expected &&
          checkB.staticPages.missing.length === 0 &&
          checkB.blogCategories.found === checkB.blogCategories.expected
        ) ? 'PASS' : 'WARN',
        productPages: checkB.productPages,
        themeHubs: checkB.themeHubs,
        themeGradeCombos: checkB.themeGradeCombos,
        categoryHubs: checkB.categoryHubs,
        gradeHubs: checkB.gradeHubs,
        staticPages: checkB.staticPages,
        blogCategories: checkB.blogCategories,
        productLocaleGaps: checkB.productLocaleGaps || [],
        themeLocaleGaps: checkB.themeLocaleGaps || [],
        gradeLocaleGaps: checkB.gradeLocaleGaps || [],
      },
      C_hreflangConsistency: {
        status: (
          checkC.productPages.incomplete.length === 0 &&
          checkC.themeHubs.incomplete.length === 0 &&
          checkC.gradeHubs.incomplete.length === 0 &&
          checkC.categoryHubs.incomplete.length === 0
        ) ? 'PASS' : 'WARN',
        productPages: checkC.productPages,
        themeHubs: checkC.themeHubs,
        gradeHubs: checkC.gradeHubs,
        categoryHubs: checkC.categoryHubs,
      },
    },
    issueCount: issues.length,
    issues,
  };

  // Try to read live hreflang results if available
  const liveHreflangPath = path.join(ROOT, 'docs', 'audit-results', 'hreflang-symmetry.json');
  if (fs.existsSync(liveHreflangPath)) {
    try {
      const liveData = JSON.parse(fs.readFileSync(liveHreflangPath, 'utf8'));
      report.liveHreflangValidation = {
        source: 'hreflang-symmetry.json',
        timestamp: liveData.timestamp || 'unknown',
        sitemapUrls: liveData.sitemapUrlCount || liveData.sitemap?.totalUrls || 'N/A',
        symmetry: liveData.results?.SYMMETRY || liveData.checks?.symmetry?.status || 'N/A',
        selfReference: liveData.results?.SELF_REFERENCE || liveData.checks?.selfReference?.status || 'N/A',
        xDefault: liveData.results?.X_DEFAULT || liveData.checks?.xDefault?.status || 'N/A',
      };
    } catch (e) {
      report.liveHreflangValidation = { status: 'FILE_PARSE_ERROR', error: e.message };
    }
  } else {
    report.liveHreflangValidation = { status: 'NOT_AVAILABLE', note: 'Run validate-hreflang-symmetry.js on server for live check' };
  }

  // Output JSON
  const jsonArg = process.argv.indexOf('--json');
  const jsonPath = jsonArg !== -1 && process.argv[jsonArg + 1]
    ? path.resolve(process.argv[jsonArg + 1])
    : path.join(ROOT, 'docs', 'audit-results', 'english-crosscheck-final.json');

  const jsonDir = path.dirname(jsonPath);
  if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir, { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`\n  JSON report: ${path.relative(ROOT, jsonPath)}`);

  process.exit(issues.length > 0 ? 1 : 0);
}

main();
