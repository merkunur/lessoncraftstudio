/**
 * Audit product page hreflang and canonical URLs.
 * Checks: bidirectional hreflang, canonical format, x-default, slug collisions, completeness.
 */
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BASE_URL = 'https://www.lessoncraftstudio.com';
const CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages');

const issues = [];
let checks = 0;
let passed = 0;

function check(condition, severity, msg) {
  checks++;
  if (condition) {
    passed++;
  } else {
    issues.push({ severity, msg });
  }
}

// ═══════════════════════════════════════════════════════════════
// 1. Parse slug config to get the ground truth mapping
// ═══════════════════════════════════════════════════════════════

const slugConfigFile = path.join(__dirname, '..', 'frontend', 'config', 'product-page-slugs.ts');
const slugSource = fs.readFileSync(slugConfigFile, 'utf8');

// Parse appId → { locale: slug } from the config
const appConfigs = [];
const appBlockRegex = /\{\s*appId:\s*'([^']+)',\s*slugs:\s*\{([\s\S]*?)\}[\s,]*\}/g;
let match;
while ((match = appBlockRegex.exec(slugSource)) !== null) {
  const appId = match[1];
  const slugBlock = match[2];
  const slugs = {};
  const slugEntryRegex = /(\w+):\s*'([^']+)'/g;
  let slugMatch;
  while ((slugMatch = slugEntryRegex.exec(slugBlock)) !== null) {
    slugs[slugMatch[1]] = slugMatch[2];
  }
  appConfigs.push({ appId, slugs });
}

console.log('\n=== HREFLANG & CANONICAL AUDIT ===\n');
console.log(`Found ${appConfigs.length} apps in slug config`);

// ═══════════════════════════════════════════════════════════════
// 2. Check slug config completeness (all apps × all locales)
// ═══════════════════════════════════════════════════════════════

console.log('\n--- Slug Config Completeness ---');
const missingSlugLocales = [];
for (const app of appConfigs) {
  for (const locale of LOCALES) {
    check(app.slugs[locale], 'HIGH', `Slug config: ${app.appId} missing slug for locale "${locale}"`);
    if (!app.slugs[locale]) {
      missingSlugLocales.push(`${app.appId}/${locale}`);
    }
  }
}
console.log(`  Apps with complete slugs: ${appConfigs.filter(a => LOCALES.every(l => a.slugs[l])).length}/${appConfigs.length}`);
if (missingSlugLocales.length) {
  console.log(`  Missing: ${missingSlugLocales.join(', ')}`);
}

// ═══════════════════════════════════════════════════════════════
// 3. Check for slug collisions (same slug used for different apps in same locale)
// ═══════════════════════════════════════════════════════════════

console.log('\n--- Slug Collision Check ---');
for (const locale of LOCALES) {
  const slugMap = new Map(); // slug → appId
  for (const app of appConfigs) {
    const slug = app.slugs[locale];
    if (!slug) continue;
    if (slugMap.has(slug)) {
      check(false, 'CRITICAL', `Slug collision in ${locale}: "${slug}" used by both "${slugMap.get(slug)}" and "${app.appId}"`);
    } else {
      slugMap.set(slug, app.appId);
      checks++;
      passed++;
    }
  }
}

// Check cross-locale collisions (same slug used in different locales — potentially confusing)
const globalSlugMap = new Map(); // slug → [locale/appId]
for (const app of appConfigs) {
  for (const [locale, slug] of Object.entries(app.slugs)) {
    const key = slug;
    if (!globalSlugMap.has(key)) globalSlugMap.set(key, []);
    globalSlugMap.get(key).push(`${locale}/${app.appId}`);
  }
}
const crossLocaleCollisions = [];
for (const [slug, refs] of globalSlugMap) {
  if (refs.length > 1) {
    // Only flag if different apps use the same slug
    const appIds = new Set(refs.map(r => r.split('/')[1]));
    if (appIds.size > 1) {
      crossLocaleCollisions.push({ slug, refs });
      check(false, 'HIGH', `Cross-locale slug collision: "${slug}" used by: ${refs.join(', ')}`);
    }
  }
}
console.log(`  Cross-locale collisions: ${crossLocaleCollisions.length}`);

// ═══════════════════════════════════════════════════════════════
// 4. Check content files — canonicalUrl presence and format
// ═══════════════════════════════════════════════════════════════

console.log('\n--- Content File Canonical URLs ---');
const contentStats = { total: 0, hasCanonical: 0, missingCanonical: 0, badFormat: 0 };
const allCanonicals = new Map(); // canonical → [locale/file]

for (const locale of LOCALES) {
  const localeDir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) {
    check(false, 'CRITICAL', `Content directory missing: ${locale}`);
    continue;
  }

  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    contentStats.total++;
    const filePath = path.join(localeDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract canonicalUrl
    const canonicalMatch = content.match(/canonicalUrl:\s*['"`]([^'"`]+)['"`]/);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;

    if (!canonical) {
      contentStats.missingCanonical++;
      check(false, 'HIGH', `Missing canonicalUrl: ${locale}/${file}`);
    } else {
      contentStats.hasCanonical++;

      // Format checks
      const expectedPrefix = `${BASE_URL}/${locale}/apps/`;
      check(canonical.startsWith(expectedPrefix), 'HIGH',
        `Canonical URL wrong locale prefix: ${locale}/${file} — got "${canonical}", expected prefix "${expectedPrefix}"`);

      check(!canonical.endsWith('/'), 'MEDIUM',
        `Canonical URL has trailing slash: ${locale}/${file} — "${canonical}"`);

      check(canonical.startsWith('https://'), 'HIGH',
        `Canonical URL not HTTPS: ${locale}/${file} — "${canonical}"`);

      check(canonical.includes('www.'), 'MEDIUM',
        `Canonical URL missing www: ${locale}/${file} — "${canonical}"`);

      // Extract slug from canonical and verify it matches slug config
      const slugFromCanonical = canonical.replace(expectedPrefix, '');
      const appConfig = appConfigs.find(a => a.slugs[locale] === slugFromCanonical);
      check(appConfig, 'MEDIUM',
        `Canonical slug not in slug config: ${locale}/${file} — slug "${slugFromCanonical}"`);

      // Duplicate canonical check
      if (allCanonicals.has(canonical)) {
        allCanonicals.get(canonical).push(`${locale}/${file}`);
      } else {
        allCanonicals.set(canonical, [`${locale}/${file}`]);
      }
    }

    // Also check appId is present
    const appIdMatch = content.match(/appId:\s*['"`]([^'"`]+)['"`]/);
    check(appIdMatch, 'MEDIUM', `Missing appId in SEO block: ${locale}/${file}`);
  }
}

// Check for duplicate canonicals
for (const [canonical, refs] of allCanonicals) {
  if (refs.length > 1) {
    check(false, 'CRITICAL', `Duplicate canonical URL "${canonical}" in: ${refs.join(', ')}`);
  }
}

console.log(`  Total content files: ${contentStats.total}`);
console.log(`  With canonicalUrl: ${contentStats.hasCanonical}`);
console.log(`  Missing canonicalUrl: ${contentStats.missingCanonical}`);

// ═══════════════════════════════════════════════════════════════
// 5. Check hreflang bidirectionality
// ═══════════════════════════════════════════════════════════════

console.log('\n--- Hreflang Bidirectionality ---');

// The hreflang function (getAlternateLanguageUrls) iterates all locales and
// finds content by appId. So we need to check that for each appId, all locales
// that have content will be included in the hreflang set, and the hreflang
// from page A→B must also include B→A.

// Build appId → locale content map
const appIdContentMap = new Map(); // appId → Set<locale>
for (const locale of LOCALES) {
  const localeDir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;

  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(localeDir, file), 'utf8');
    const appIdMatch = content.match(/appId:\s*['"`]([^'"`]+)['"`]/);
    if (appIdMatch) {
      const appId = appIdMatch[1];
      if (!appIdContentMap.has(appId)) appIdContentMap.set(appId, new Set());
      appIdContentMap.get(appId).add(locale);
    }
  }
}

// For each app, verify all 11 locales have content (bidirectionality)
let bidirectionalOk = 0;
let bidirectionalMissing = 0;
for (const [appId, locales] of appIdContentMap) {
  for (const locale of LOCALES) {
    if (!locales.has(locale)) {
      bidirectionalMissing++;
      check(false, 'HIGH', `Hreflang gap: appId "${appId}" has no content file for locale "${locale}" — broken bidirectionality`);
    } else {
      bidirectionalOk++;
    }
  }
}

console.log(`  App→locale pairs OK: ${bidirectionalOk}`);
console.log(`  Missing (broken bidirectionality): ${bidirectionalMissing}`);

// ═══════════════════════════════════════════════════════════════
// 6. Check x-default always points to English
// ═══════════════════════════════════════════════════════════════

console.log('\n--- x-default Check ---');

// The getAlternateLanguageUrls function adds x-default pointing to alternates['en']
// Verify this logic is correct by checking the function source
const contentConfigFile = path.join(__dirname, '..', 'frontend', 'config', 'product-page-content.ts');
const contentConfigSource = fs.readFileSync(contentConfigFile, 'utf8');

const xDefaultCheck = contentConfigSource.includes("alternates['x-default'] = alternates['en']");
check(xDefaultCheck, 'HIGH', 'x-default: getAlternateLanguageUrls does not set x-default to English version');

// Also check the slug config's getAlternateUrls
const slugXDefault = slugSource.includes("alternates['x-default'] = alternates['en']");
check(slugXDefault, 'HIGH', 'x-default: getAlternateUrls (slug config) does not set x-default to English version');

// Verify all apps have English content (x-default requires English to exist)
for (const [appId, locales] of appIdContentMap) {
  check(locales.has('en'), 'CRITICAL', `No English content for appId "${appId}" — x-default will be missing`);
}

console.log(`  x-default set to English: ${xDefaultCheck ? 'YES' : 'NO'}`);

// ═══════════════════════════════════════════════════════════════
// 7. Verify content file count matches slug config expectations
// ═══════════════════════════════════════════════════════════════

console.log('\n--- Content vs Slug Config Alignment ---');
const expectedTotal = appConfigs.length * LOCALES.length;
console.log(`  Expected: ${appConfigs.length} apps × ${LOCALES.length} locales = ${expectedTotal} pages`);
console.log(`  Actual content files: ${contentStats.total}`);
check(contentStats.total >= expectedTotal, 'HIGH',
  `Content file count (${contentStats.total}) is less than expected (${expectedTotal}). Some pages may be missing.`);

// Check each app in slug config has a matching content file (by slug field inside file, not filename)
// Build a map of locale → slug → filename from actual content files
const slugToFileMap = new Map(); // "locale/slug" → filename
for (const locale of LOCALES) {
  const localeDir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;
  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(localeDir, file), 'utf8');
    const slugMatch = content.match(/slug:\s*['"`]([^'"`]+)['"`]/);
    if (slugMatch) {
      slugToFileMap.set(`${locale}/${slugMatch[1]}`, file);
    }
  }
}

for (const app of appConfigs) {
  for (const locale of LOCALES) {
    if (app.slugs[locale]) {
      const key = `${locale}/${app.slugs[locale]}`;
      const hasContent = slugToFileMap.has(key);
      check(hasContent, 'HIGH', `No content file with slug "${app.slugs[locale]}" for ${locale} (appId: ${app.appId})`);
    }
  }
}

// Also check: do content file slugs match their canonical URLs?
console.log('\n--- Slug↔Canonical Consistency ---');
let slugCanonicalOk = 0;
let slugCanonicalMismatch = 0;
for (const locale of LOCALES) {
  const localeDir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;
  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(localeDir, file), 'utf8');
    const slugMatch = content.match(/slug:\s*['"`]([^'"`]+)['"`]/);
    const canonicalMatch = content.match(/canonicalUrl:\s*['"`]([^'"`]+)['"`]/);
    if (slugMatch && canonicalMatch) {
      const expectedCanonical = `${BASE_URL}/${locale}/apps/${slugMatch[1]}`;
      if (canonicalMatch[1] === expectedCanonical) {
        slugCanonicalOk++;
      } else {
        slugCanonicalMismatch++;
        check(false, 'HIGH', `Slug↔Canonical mismatch: ${locale}/${file} — slug="${slugMatch[1]}" but canonical="${canonicalMatch[1]}"`);
      }
    }
  }
}
console.log(`  Slug↔Canonical consistent: ${slugCanonicalOk}`);
console.log(`  Mismatches: ${slugCanonicalMismatch}`);

// ═══════════════════════════════════════════════════════════════
// Report
// ═══════════════════════════════════════════════════════════════

const critical = issues.filter(i => i.severity === 'CRITICAL');
const high = issues.filter(i => i.severity === 'HIGH');
const medium = issues.filter(i => i.severity === 'MEDIUM');
const low = issues.filter(i => i.severity === 'LOW');

console.log(`\n=== RESULTS ===`);
console.log(`Checks: ${checks} total, ${passed} passed, ${issues.length} issues`);
console.log(`Score: ${Math.round(passed / checks * 100)}/100`);

if (critical.length) {
  console.log(`\n--- CRITICAL (${critical.length}) ---`);
  critical.forEach(i => console.log(`  ${i.msg}`));
}
if (high.length) {
  console.log(`\n--- HIGH (${high.length}) ---`);
  high.forEach(i => console.log(`  ${i.msg}`));
}
if (medium.length) {
  console.log(`\n--- MEDIUM (${medium.length}) ---`);
  medium.forEach(i => console.log(`  ${i.msg}`));
}
if (low.length) {
  console.log(`\n--- LOW (${low.length}) ---`);
  low.forEach(i => console.log(`  ${i.msg}`));
}

if (!issues.length) {
  console.log('\nAll product page hreflang and canonical URLs are correct!');
}
