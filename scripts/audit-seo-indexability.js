#!/usr/bin/env node
/**
 * SEO Indexability Audit — Comprehensive check for all 194 pages × 7 locales
 *
 * Runs 10 checks to verify every page is indexable and professionally configured:
 *   1. Content file SEO field completeness
 *   2. Meta length compliance (title ≤60, description 120–160)
 *   3. Slug-to-content file mapping (every slug has a content file)
 *   4. Slug uniqueness within each page type
 *   5. Hreflang alternate URL consistency
 *   6. Internal link validity
 *   7. Showcase config coverage
 *   8. Keyword cannibalization (duplicate primaryKeyword)
 *   9. Sitemap URL count verification
 *  10. Swedish content gap report
 *
 * Usage:
 *   node scripts/audit-seo-indexability.js
 *   node scripts/audit-seo-indexability.js --json report.json
 */

const fs = require('fs');
const path = require('path');

// ── Paths ───────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const CONFIG = path.join(ROOT, 'frontend', 'config');

const LOCALES_7 = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'];
const LOCALES_ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// ── Results ─────────────────────────────────────────────────────────
const results = {
  pass: [],
  warn: [],
  fail: [],
};

function pass(check, msg) { results.pass.push({ check, msg }); }
function warn(check, msg) { results.warn.push({ check, msg }); }
function fail(check, msg) { results.fail.push({ check, msg }); }

// ── Parse TypeScript slug configs ───────────────────────────────────
// Instead of importing TS, we parse the exported arrays from the raw files.
// Each file exports an array of objects with an id field and a slugs record.

function parseSlugConfig(filePath, idField) {
  const src = fs.readFileSync(filePath, 'utf8');
  const entries = [];

  // Match each object entry: { idField: 'value', slugs: { ... } }
  // Use a state-machine approach for reliability
  const idPattern = new RegExp(`${idField}:\\s*'([^']+)'`, 'g');
  let match;
  const ids = [];
  while ((match = idPattern.exec(src)) !== null) {
    ids.push({ id: match[1], pos: match.index });
  }

  for (let i = 0; i < ids.length; i++) {
    const { id, pos } = ids[i];
    const endPos = i < ids.length - 1 ? ids[i + 1].pos : src.length;
    const chunk = src.slice(pos, endPos);

    // Extract slugs block
    const slugsMatch = chunk.match(/slugs:\s*\{([^}]+)\}/s);
    if (!slugsMatch) continue;

    const slugs = {};
    const slugPattern = /(\w+):\s*'([^']*)'/g;
    let sm;
    while ((sm = slugPattern.exec(slugsMatch[1])) !== null) {
      slugs[sm[1]] = sm[2];
    }

    entries.push({ id, slugs });
  }

  return entries;
}

// ── Parse content files (read TS default export as object) ──────────
function parseContentFile(filePath) {
  try {
    const src = fs.readFileSync(filePath, 'utf8');

    // Extract SEO block
    const seo = {};

    // titleTag
    const titleMatch = src.match(/titleTag:\s*[`'"]([\s\S]*?)[`'"]\s*[,\n]/);
    if (titleMatch) seo.titleTag = titleMatch[1].replace(/\\n/g, '').trim();

    // metaDescription
    const descMatch = src.match(/metaDescription:\s*[`'"]([\s\S]*?)[`'"]\s*[,\n]/);
    if (descMatch) seo.metaDescription = descMatch[1].replace(/\\n/g, '').trim();

    // primaryKeyword
    const pkMatch = src.match(/primaryKeyword:\s*[`'"]([\s\S]*?)[`'"]\s*[,\n]/);
    if (pkMatch) seo.primaryKeyword = pkMatch[1].trim();

    // secondaryKeywords (array)
    const skMatch = src.match(/secondaryKeywords:\s*\[([\s\S]*?)\]/);
    if (skMatch) {
      const items = [];
      const itemPattern = /['"`]([^'"`]+)['"`]/g;
      let m;
      while ((m = itemPattern.exec(skMatch[1])) !== null) items.push(m[1]);
      seo.secondaryKeywords = items;
    }

    // lsiKeywords (array)
    const lsiMatch = src.match(/lsiKeywords:\s*\[([\s\S]*?)\]/);
    if (lsiMatch) {
      const items = [];
      const itemPattern = /['"`]([^'"`]+)['"`]/g;
      let m;
      while ((m = itemPattern.exec(lsiMatch[1])) !== null) items.push(m[1]);
      seo.lsiKeywords = items;
    }

    // internalLinks
    const links = [];
    const linksMatch = src.match(/internalLinks:\s*\[([\s\S]*?)\]\s*[,\n]/);
    if (linksMatch) {
      const linkPattern = /pageType:\s*['"]([^'"]+)['"][\s\S]*?slug:\s*['"]([^'"]+)['"]/g;
      let lm;
      while ((lm = linkPattern.exec(linksMatch[1])) !== null) {
        links.push({ pageType: lm[1], slug: lm[2] });
      }
    }

    return { seo, internalLinks: links, exists: true };
  } catch {
    return { seo: {}, internalLinks: [], exists: false };
  }
}

// ── App ID mapping: slug-appId → wpAppId (content file name) ────────
// product-page-slugs uses different IDs than content files for some apps
const slugAppToWpApp = {
  'word-search': 'wordsearch',
  'image-addition': 'addition',
  'matching-app': 'matching',
  'picture-bingo': 'bingo',
  'big-small-app': 'big-small',
  'chart-count-color': 'chart-count',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'writing-app': 'writing',
};

function getAppContentId(slugAppId) {
  return slugAppToWpApp[slugAppId] || slugAppId;
}

// ── Load all slug configs ───────────────────────────────────────────
console.log('Loading slug configurations...\n');

const appSlugs = parseSlugConfig(path.join(CONFIG, 'product-page-slugs.ts'), 'appId');
const toolSlugs = parseSlugConfig(path.join(CONFIG, 'tool-page-slugs.ts'), 'toolId');
const guideSlugs = parseSlugConfig(path.join(CONFIG, 'guide-page-slugs.ts'), 'guideId');
const bundleSlugs = parseSlugConfig(path.join(CONFIG, 'bundle-page-slugs.ts'), 'bundleId');
const ideaSlugs = parseSlugConfig(path.join(CONFIG, 'idea-page-slugs.ts'), 'ideaId');
const startSlugs = parseSlugConfig(path.join(CONFIG, 'start-page-slugs.ts'), 'startId');

// Resolve the content file ID from the slug config ID
function resolveContentId(typeName, slugId) {
  if (typeName === 'app') return getAppContentId(slugId);
  return slugId;
}

const PAGE_TYPES = [
  { name: 'app',    slugs: appSlugs,    contentDir: 'app-content',    idField: 'appId',    locales: LOCALES_7 },
  { name: 'tool',   slugs: toolSlugs,   contentDir: 'tool-content',   idField: 'toolId',   locales: LOCALES_7 },
  { name: 'guide',  slugs: guideSlugs,  contentDir: 'guide-content',  idField: 'guideId',  locales: LOCALES_7 },
  { name: 'bundle', slugs: bundleSlugs, contentDir: 'bundle-content', idField: 'bundleId', locales: LOCALES_7 },
  { name: 'idea',   slugs: ideaSlugs,   contentDir: 'idea-content',   idField: 'ideaId',   locales: LOCALES_7 },
  { name: 'start',  slugs: startSlugs,  contentDir: 'start-content',  idField: 'startId',  locales: LOCALES_7 },
];

console.log(`Loaded: ${appSlugs.length} apps, ${toolSlugs.length} tools, ${guideSlugs.length} guides, ${bundleSlugs.length} bundles, ${ideaSlugs.length} ideas, ${startSlugs.length} starts\n`);

// ═══════════════════════════════════════════════════════════════════
// CHECK 1: Content File SEO Field Completeness
// ═══════════════════════════════════════════════════════════════════
console.log('━━━ Check 1: SEO Field Completeness ━━━');
let check1Pass = 0, check1Fail = 0;

for (const type of PAGE_TYPES) {
  for (const locale of type.locales) {
    for (const entry of type.slugs) {
      const contentId = type.name === 'app' ? getAppContentId(entry.id) : entry.id;

      const filePath = path.join(CONFIG, type.contentDir, locale, `${contentId}.ts`);
      if (!fs.existsSync(filePath)) continue; // Check 3 handles missing files

      const content = parseContentFile(filePath);
      const prefix = `[${type.name}/${locale}/${contentId}]`;
      let hasIssue = false;

      if (!content.seo.titleTag) {
        fail('1-seo-fields', `${prefix} missing titleTag`);
        hasIssue = true;
      }
      if (!content.seo.metaDescription) {
        fail('1-seo-fields', `${prefix} missing metaDescription`);
        hasIssue = true;
      }
      if (!content.seo.primaryKeyword && type.name !== 'idea') {
        fail('1-seo-fields', `${prefix} missing primaryKeyword`);
        hasIssue = true;
      } else if (!content.seo.primaryKeyword && type.name === 'idea') {
        warn('1-seo-fields', `${prefix} missing primaryKeyword (optional for ideas but recommended)`);
        hasIssue = true;
      }
      if (!content.seo.secondaryKeywords || content.seo.secondaryKeywords.length === 0) {
        if (type.name !== 'idea') {
          warn('1-seo-fields', `${prefix} missing or empty secondaryKeywords`);
          hasIssue = true;
        }
      }

      if (!hasIssue) check1Pass++;
      else check1Fail++;
    }
  }
}

console.log(`  ${check1Pass} files OK, ${check1Fail} with issues`);
if (check1Fail === 0) pass('1-seo-fields', `All ${check1Pass} content files have required SEO fields`);

// ═══════════════════════════════════════════════════════════════════
// CHECK 2: Meta Length Compliance
// ═══════════════════════════════════════════════════════════════════
console.log('\n━━━ Check 2: Meta Length Compliance ━━━');
let check2Pass = 0;
const titleTooLong = [], titleTooShort = [], descTooLong = [], descTooShort = [];

for (const type of PAGE_TYPES) {
  for (const locale of type.locales) {
    for (const entry of type.slugs) {
      const filePath = path.join(CONFIG, type.contentDir, locale, `${resolveContentId(type.name, entry.id)}.ts`);
      if (!fs.existsSync(filePath)) continue;

      const content = parseContentFile(filePath);
      const prefix = `[${type.name}/${locale}/${entry.id}]`;

      if (content.seo.titleTag) {
        const len = content.seo.titleTag.length;
        if (len > 60) {
          titleTooLong.push({ prefix, len, text: content.seo.titleTag });
        } else if (len < 10) {
          titleTooShort.push({ prefix, len, text: content.seo.titleTag });
        } else {
          check2Pass++;
        }
      }

      if (content.seo.metaDescription) {
        const len = content.seo.metaDescription.length;
        if (len > 160) {
          descTooLong.push({ prefix, len, text: content.seo.metaDescription.slice(0, 80) + '...' });
        } else if (len < 120) {
          descTooShort.push({ prefix, len, text: content.seo.metaDescription });
        }
      }
    }
  }
}

if (titleTooLong.length > 0) {
  warn('2-meta-length', `${titleTooLong.length} titleTags exceed 60 chars:`);
  for (const t of titleTooLong.slice(0, 20)) {
    warn('2-meta-length', `  ${t.prefix} (${t.len} chars): "${t.text}"`);
  }
  if (titleTooLong.length > 20) warn('2-meta-length', `  ... and ${titleTooLong.length - 20} more`);
}
if (titleTooShort.length > 0) {
  warn('2-meta-length', `${titleTooShort.length} titleTags under 10 chars`);
}
if (descTooLong.length > 0) {
  warn('2-meta-length', `${descTooLong.length} metaDescriptions exceed 160 chars:`);
  for (const d of descTooLong.slice(0, 20)) {
    warn('2-meta-length', `  ${d.prefix} (${d.len} chars): "${d.text}"`);
  }
  if (descTooLong.length > 20) warn('2-meta-length', `  ... and ${descTooLong.length - 20} more`);
}
if (descTooShort.length > 0) {
  warn('2-meta-length', `${descTooShort.length} metaDescriptions under 120 chars:`);
  for (const d of descTooShort.slice(0, 20)) {
    warn('2-meta-length', `  ${d.prefix} (${d.len} chars): "${d.text}"`);
  }
  if (descTooShort.length > 20) warn('2-meta-length', `  ... and ${descTooShort.length - 20} more`);
}

const totalMetaIssues = titleTooLong.length + titleTooShort.length + descTooLong.length + descTooShort.length;
console.log(`  ${check2Pass} titles OK, ${totalMetaIssues} meta length issues`);
if (totalMetaIssues === 0) pass('2-meta-length', 'All meta lengths within limits');

// ═══════════════════════════════════════════════════════════════════
// CHECK 3: Slug-to-Content File Mapping
// ═══════════════════════════════════════════════════════════════════
console.log('\n━━━ Check 3: Slug-to-Content File Mapping ━━━');
let check3Missing = 0, check3Found = 0;

for (const type of PAGE_TYPES) {
  for (const locale of type.locales) {
    for (const entry of type.slugs) {
      if (!entry.slugs[locale]) continue; // No slug for this locale = not expected

      const filePath = path.join(CONFIG, type.contentDir, locale, `${resolveContentId(type.name, entry.id)}.ts`);
      if (fs.existsSync(filePath)) {
        check3Found++;
      } else {
        fail('3-slug-content-map', `[${type.name}/${locale}/${entry.id}] has slug "${entry.slugs[locale]}" but no content file`);
        check3Missing++;
      }
    }
  }
}

console.log(`  ${check3Found} mapped OK, ${check3Missing} missing content files`);
if (check3Missing === 0) pass('3-slug-content-map', `All ${check3Found} slug/locale pairs have content files`);

// ═══════════════════════════════════════════════════════════════════
// CHECK 4: Slug Uniqueness Within Each Type
// ═══════════════════════════════════════════════════════════════════
console.log('\n━━━ Check 4: Slug Uniqueness ━━━');
let check4Dupes = 0;

for (const type of PAGE_TYPES) {
  // Check within each locale
  for (const locale of LOCALES_ALL) {
    const slugMap = new Map(); // slug → id
    for (const entry of type.slugs) {
      const slug = entry.slugs[locale];
      if (!slug) continue;
      if (slugMap.has(slug)) {
        fail('4-slug-unique', `[${type.name}/${locale}] duplicate slug "${slug}" used by both "${slugMap.get(slug)}" and "${entry.id}"`);
        check4Dupes++;
      } else {
        slugMap.set(slug, entry.id);
      }
    }
  }
}

console.log(`  ${check4Dupes} duplicate slugs found`);
if (check4Dupes === 0) pass('4-slug-unique', 'All slugs unique within their page type and locale');

// ═══════════════════════════════════════════════════════════════════
// CHECK 5: Hreflang Alternate URL Consistency
// ═══════════════════════════════════════════════════════════════════
console.log('\n━━━ Check 5: Hreflang Consistency ━━━');
let check5Issues = 0;

for (const type of PAGE_TYPES) {
  for (const entry of type.slugs) {
    const definedLocales = Object.keys(entry.slugs).filter(l => entry.slugs[l]);

    // Must have English (x-default)
    if (!entry.slugs.en) {
      fail('5-hreflang', `[${type.name}/${entry.id}] missing English slug (needed for x-default)`);
      check5Issues++;
    }

    // All locales in the type's target set should have slugs
    for (const locale of type.locales) {
      if (!entry.slugs[locale]) {
        warn('5-hreflang', `[${type.name}/${entry.id}] missing slug for locale "${locale}"`);
        check5Issues++;
      }
    }
  }
}

console.log(`  ${check5Issues} hreflang issues found`);
if (check5Issues === 0) pass('5-hreflang', 'All hreflang alternates consistent');

// ═══════════════════════════════════════════════════════════════════
// CHECK 6: Internal Link Validity
// ═══════════════════════════════════════════════════════════════════
console.log('\n━━━ Check 6: Internal Link Validity ━━━');
let check6Valid = 0, check6Invalid = 0;

// Build lookup sets: id → Set of valid IDs for each page type
const validIds = {
  app: new Set(appSlugs.map(e => e.id)),
  tool: new Set(toolSlugs.map(e => e.id)),
  guide: new Set(guideSlugs.map(e => e.id)),
  bundle: new Set(bundleSlugs.map(e => e.id)),
  idea: new Set(ideaSlugs.map(e => e.id)),
  start: new Set(startSlugs.map(e => e.id)),
};

// Also build slug → id lookups for all types (internal links use slugs, not IDs)
const slugToId = {};
for (const typeName of Object.keys(validIds)) {
  slugToId[typeName] = new Map();
  const slugList = { app: appSlugs, tool: toolSlugs, guide: guideSlugs, bundle: bundleSlugs, idea: ideaSlugs, start: startSlugs }[typeName];
  for (const entry of slugList) {
    // Add the ID itself
    slugToId[typeName].set(entry.id, entry.id);
    // Add all locale slugs
    for (const [, slug] of Object.entries(entry.slugs)) {
      if (slug) slugToId[typeName].set(slug, entry.id);
    }
  }
}

for (const type of PAGE_TYPES) {
  for (const locale of type.locales) {
    for (const entry of type.slugs) {
      const filePath = path.join(CONFIG, type.contentDir, locale, `${resolveContentId(type.name, entry.id)}.ts`);
      if (!fs.existsSync(filePath)) continue;

      const content = parseContentFile(filePath);
      for (const link of content.internalLinks) {
        const targetType = link.pageType;
        const targetSlug = link.slug;

        if (!validIds[targetType]) {
          fail('6-internal-links', `[${type.name}/${locale}/${entry.id}] invalid pageType "${targetType}"`);
          check6Invalid++;
          continue;
        }

        // Check if slug is a valid ID or slug in the target type
        if (slugToId[targetType] && slugToId[targetType].has(targetSlug)) {
          check6Valid++;
        } else {
          fail('6-internal-links', `[${type.name}/${locale}/${entry.id}] broken link → ${targetType}:"${targetSlug}"`);
          check6Invalid++;
        }
      }
    }
  }
}

console.log(`  ${check6Valid} valid links, ${check6Invalid} broken links`);
if (check6Invalid === 0) pass('6-internal-links', `All ${check6Valid} internal links valid`);

// ═══════════════════════════════════════════════════════════════════
// CHECK 7: Showcase Config Coverage
// ═══════════════════════════════════════════════════════════════════
console.log('\n━━━ Check 7: Showcase Config Coverage ━━━');

// Parse tool showcase config keys
const toolShowcaseSrc = fs.readFileSync(path.join(CONFIG, 'tool-showcase-configs.ts'), 'utf8');
const toolShowcaseKeys = new Set();
const tkPattern = /^\s+'([a-z][a-z0-9-]+)':\s*\{/gm;
let tkm;
while ((tkm = tkPattern.exec(toolShowcaseSrc)) !== null) {
  toolShowcaseKeys.add(tkm[1]);
}

let check7Missing = 0;
for (const entry of toolSlugs) {
  if (!toolShowcaseKeys.has(entry.id)) {
    // Also check with app ID mapping (some tools use different IDs)
    const appIdMap = {
      'image-subtraction': 'subtraction',
      'cryptogram': 'image-cryptogram',
      'writing': 'writing-app',
      'big-small': 'big-small-app',
      'chart-count': 'chart-count-color',
      'matching': 'matching-app',
      'bingo': 'picture-bingo',
      'crossword': 'image-crossword',
    };
    const altId = appIdMap[entry.id];
    if (!altId || !toolShowcaseKeys.has(altId)) {
      warn('7-showcase', `[tool/${entry.id}] missing from toolShowcaseConfigs`);
      check7Missing++;
    }
  }
}

// Parse guide showcase config entries
const guideShowcaseSrc = fs.readFileSync(path.join(CONFIG, 'guide-showcase-configs.ts'), 'utf8');
const guideShowcaseIds = new Set();
const gkPattern = /type:\s*'(guide|bundle|idea|start)',\s*id:\s*'([^']+)'/g;
let gkm;
while ((gkm = gkPattern.exec(guideShowcaseSrc)) !== null) {
  guideShowcaseIds.add(`${gkm[1]}:${gkm[2]}`);
}

for (const entry of guideSlugs) {
  if (!guideShowcaseIds.has(`guide:${entry.id}`)) {
    warn('7-showcase', `[guide/${entry.id}] missing from guideShowcaseConfigs`);
    check7Missing++;
  }
}
for (const entry of bundleSlugs) {
  if (!guideShowcaseIds.has(`bundle:${entry.id}`)) {
    warn('7-showcase', `[bundle/${entry.id}] missing from guideShowcaseConfigs`);
    check7Missing++;
  }
}
for (const entry of ideaSlugs) {
  if (!guideShowcaseIds.has(`idea:${entry.id}`)) {
    warn('7-showcase', `[idea/${entry.id}] missing from guideShowcaseConfigs`);
    check7Missing++;
  }
}
for (const entry of startSlugs) {
  if (!guideShowcaseIds.has(`start:${entry.id}`)) {
    warn('7-showcase', `[start/${entry.id}] missing from guideShowcaseConfigs`);
    check7Missing++;
  }
}

console.log(`  ${check7Missing} missing showcase configs`);
if (check7Missing === 0) pass('7-showcase', 'All pages have showcase configs');

// ═══════════════════════════════════════════════════════════════════
// CHECK 8: Keyword Cannibalization
// ═══════════════════════════════════════════════════════════════════
console.log('\n━━━ Check 8: Keyword Cannibalization ━━━');
let check8Dupes = 0;

for (const locale of LOCALES_7) {
  const keywordMap = new Map(); // keyword → [{type, id}]

  for (const type of PAGE_TYPES) {
    for (const entry of type.slugs) {
      const filePath = path.join(CONFIG, type.contentDir, locale, `${resolveContentId(type.name, entry.id)}.ts`);
      if (!fs.existsSync(filePath)) continue;

      const content = parseContentFile(filePath);
      if (content.seo.primaryKeyword) {
        const kw = content.seo.primaryKeyword.toLowerCase().trim();
        if (!keywordMap.has(kw)) keywordMap.set(kw, []);
        keywordMap.get(kw).push({ type: type.name, id: entry.id });
      }
    }
  }

  // Report duplicates (exclude intentional app/tool overlap — different search intent)
  for (const [kw, pages] of keywordMap) {
    if (pages.length > 1) {
      // Filter out app/tool pairs sharing keywords (by design — /apps/ targets sellers, /tools/ targets makers)
      const types = new Set(pages.map(p => p.type));
      if (pages.length === 2 && types.has('app') && types.has('tool')) continue;

      const pageList = pages.map(p => `${p.type}/${p.id}`).join(', ');
      warn('8-cannibalization', `[${locale}] keyword "${kw}" shared by: ${pageList}`);
      check8Dupes++;
    }
  }
}

console.log(`  ${check8Dupes} cannibalized keywords found`);
if (check8Dupes === 0) pass('8-cannibalization', 'No keyword cannibalization detected');

// ═══════════════════════════════════════════════════════════════════
// CHECK 9: Sitemap URL Count Verification
// ═══════════════════════════════════════════════════════════════════
console.log('\n━━━ Check 9: Sitemap URL Count Verification ━━━');

// Count expected URLs from slug configs
function countUrls(slugEntries) {
  let count = 0;
  for (const entry of slugEntries) {
    count += Object.values(entry.slugs).filter(s => s).length;
  }
  return count;
}

const expectedCounts = {
  'ID 1 (apps)': { expected: countUrls(appSlugs), documented: 363 },
  'ID 3 (tools)': { expected: countUrls(toolSlugs), documented: 264 },
  'ID 4 (bundles)': { expected: countUrls(bundleSlugs), documented: 48 },
  'ID 5 (start)': { expected: countUrls(startSlugs), documented: 96 },
  'ID 6 (guides)': { expected: countUrls(guideSlugs), documented: 520 },
  'ID 7 (ideas)': { expected: countUrls(ideaSlugs), documented: 360 },
};

let check9Issues = 0;
for (const [label, { expected, documented }] of Object.entries(expectedCounts)) {
  if (expected !== documented) {
    warn('9-sitemap-count', `${label}: config has ${expected} URLs, sitemap documents ${documented}`);
    check9Issues++;
  } else {
    console.log(`  ${label}: ${expected} URLs ✓`);
  }
}

if (check9Issues === 0) pass('9-sitemap-count', 'All sitemap URL counts match slug configs');

// ═══════════════════════════════════════════════════════════════════
// CHECK 10: Swedish Content Gap
// ═══════════════════════════════════════════════════════════════════
console.log('\n━━━ Check 10: Swedish Content Gap ━━━');

for (const type of PAGE_TYPES) {
  const svDir = path.join(CONFIG, type.contentDir, 'sv');
  if (fs.existsSync(svDir)) {
    const files = fs.readdirSync(svDir).filter(f => f.endsWith('.ts'));
    const slugsWithSv = type.slugs.filter(e => e.slugs.sv).length;
    if (files.length < slugsWithSv) {
      warn('10-sv-gap', `[${type.name}] sv has ${files.length}/${slugsWithSv} content files (${slugsWithSv - files.length} missing)`);
    } else if (slugsWithSv > 0) {
      console.log(`  ${type.name}: sv ${files.length}/${slugsWithSv} content files ✓`);
    }
  } else {
    const slugsWithSv = type.slugs.filter(e => e.slugs.sv).length;
    if (slugsWithSv > 0) {
      warn('10-sv-gap', `[${type.name}] sv directory missing but ${slugsWithSv} slugs defined`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log('AUDIT SUMMARY');
console.log('═'.repeat(60));

const totalPages = PAGE_TYPES.reduce((sum, t) => sum + t.slugs.length, 0);
const totalUrls = PAGE_TYPES.reduce((sum, t) => sum + countUrls(t.slugs), 0);
console.log(`\nTotal unique pages: ${totalPages}`);
console.log(`Total URLs across all locales: ${totalUrls}`);

console.log(`\n  PASS: ${results.pass.length} checks passed`);
for (const p of results.pass) console.log(`    ✓ ${p.msg}`);

console.log(`\n  WARN: ${results.warn.length} warnings`);
const warnGroups = {};
for (const w of results.warn) {
  const group = w.check;
  if (!warnGroups[group]) warnGroups[group] = [];
  warnGroups[group].push(w.msg);
}
for (const [group, msgs] of Object.entries(warnGroups)) {
  console.log(`    [${group}] ${msgs.length} warnings`);
  for (const m of msgs.slice(0, 5)) console.log(`      ⚠ ${m}`);
  if (msgs.length > 5) console.log(`      ... and ${msgs.length - 5} more`);
}

console.log(`\n  FAIL: ${results.fail.length} failures`);
const failGroups = {};
for (const f of results.fail) {
  const group = f.check;
  if (!failGroups[group]) failGroups[group] = [];
  failGroups[group].push(f.msg);
}
for (const [group, msgs] of Object.entries(failGroups)) {
  console.log(`    [${group}] ${msgs.length} failures`);
  for (const m of msgs.slice(0, 10)) console.log(`      ✗ ${m}`);
  if (msgs.length > 10) console.log(`      ... and ${msgs.length - 10} more`);
}

// ── JSON output ─────────────────────────────────────────────────────
const jsonArg = process.argv.indexOf('--json');
if (jsonArg !== -1 && process.argv[jsonArg + 1]) {
  const reportPath = process.argv[jsonArg + 1];
  fs.writeFileSync(reportPath, JSON.stringify({
    summary: { totalPages, totalUrls, pass: results.pass.length, warn: results.warn.length, fail: results.fail.length },
    pass: results.pass,
    warn: results.warn,
    fail: results.fail,
    counts: expectedCounts,
  }, null, 2));
  console.log(`\nJSON report saved to ${reportPath}`);
}

console.log('\n' + '═'.repeat(60));
if (results.fail.length > 0) {
  console.log(`RESULT: ${results.fail.length} FAILURES need fixing`);
  process.exit(1);
} else if (results.warn.length > 0) {
  console.log(`RESULT: ALL CRITICAL CHECKS PASSED (${results.warn.length} warnings)`);
  process.exit(0);
} else {
  console.log('RESULT: ALL CHECKS PASSED — PERFECT SCORE');
  process.exit(0);
}
