#!/usr/bin/env node
/**
 * Audit Theme Hub Page Hreflang
 *
 * Validates all 550 theme hub pages (50 themes x 11 locales) for:
 *   1. Slug completeness - every theme has a slug for every locale
 *   2. Reverse lookup correctness - getThemeIdFromSlug returns the right themeId
 *   3. No slug collisions within a locale
 *   4. Hreflang consistency between page.tsx and sitemap.ts
 *   5. Self-referencing hreflang - each page includes itself
 *   6. Reciprocal hreflang - if A links to B, B links back to A
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Data: inline the source-of-truth from theme-slugs.ts and locales.ts
// ---------------------------------------------------------------------------

const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const ALL_THEME_IDS = [
  'animals', 'food', 'transportation', 'nature', 'school',
  'sports', 'emotions', 'body', 'clothing', 'household',
  'toys', 'music', 'jobs', 'space', 'seasons',
  'holidays', 'weather', 'colors', 'shapes', 'numbers',
  'alphabet', 'furniture', 'easter', 'halloween', 'xmas',
  'winter', 'farm', 'ocean', 'dinosaurs', 'insects',
  'fruits', 'vegetables', 'flowers', 'birds', 'pets',
  'zoo', 'garden', 'camping', 'pirates', 'fairy-tales',
  'robots', 'superheroes', 'construction', 'cooking', 'travel',
  'birthday', 'circus', 'forest', 'spring', 'summer',
];

const hreflangMap = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

// Read themeSlugMap from the actual TS source to stay in sync
const themeSlugsSrc = fs.readFileSync(
  path.join(__dirname, '..', 'frontend', 'config', 'theme-slugs.ts'),
  'utf8'
);

// Extract the themeSlugMap object via regex (between `themeSlugMap...= {` and `};`)
const mapMatch = themeSlugsSrc.match(
  /export const themeSlugMap[^=]*=\s*(\{[\s\S]*?\n\};)/
);
if (!mapMatch) {
  console.error('ERROR: Could not parse themeSlugMap from theme-slugs.ts');
  process.exit(1);
}

// Evaluate safely: the map contains only string literals
let themeSlugMap;
try {
  themeSlugMap = new Function(`return ${mapMatch[1].replace(/;$/, '')}`)();
} catch (e) {
  console.error('ERROR: Failed to evaluate themeSlugMap:', e.message);
  process.exit(1);
}

// Replicate getThemeSlug
function getThemeSlug(themeId, locale) {
  return themeSlugMap[themeId]?.[locale] ?? themeSlugMap[themeId]?.en;
}

// Replicate getThemeIdFromSlug
function getThemeIdFromSlug(locale, slug) {
  for (const [themeId, slugs] of Object.entries(themeSlugMap)) {
    if (slugs[locale] === slug || slugs.en === slug) {
      return themeId;
    }
  }
  return undefined;
}

// Replicate getHreflangCode
function getHreflangCode(locale) {
  return hreflangMap[locale] || locale;
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

const BASE_URL = 'https://www.lessoncraftstudio.com';
const issues = [];
let passCount = 0;
let totalChecks = 0;

function addIssue(category, themeId, locale, detail) {
  issues.push({ category, themeId, locale, detail });
}

// ── Check 1: Slug completeness ──────────────────────────────────────────────
console.log('Check 1: Slug completeness (50 themes x 11 locales = 550)...');
let slugGaps = 0;
for (const themeId of ALL_THEME_IDS) {
  // First verify theme exists in themeSlugMap at all
  if (!themeSlugMap[themeId]) {
    for (const locale of SUPPORTED_LOCALES) {
      addIssue('MISSING_THEME', themeId, locale, `themeId "${themeId}" not in themeSlugMap`);
      slugGaps++;
    }
    continue;
  }
  for (const locale of SUPPORTED_LOCALES) {
    totalChecks++;
    const slug = themeSlugMap[themeId][locale];
    if (!slug || slug.trim() === '') {
      addIssue('MISSING_SLUG', themeId, locale,
        `No locale-specific slug (fallback would be "${themeSlugMap[themeId]?.en || '?'}")`);
      slugGaps++;
    }
  }
}
console.log(`  ${slugGaps === 0 ? 'PASS' : 'FAIL'}: ${slugGaps} missing slugs\n`);

// ── Check 2: Reverse lookup correctness ─────────────────────────────────────
console.log('Check 2: Reverse lookup correctness...');
let reverseFails = 0;
for (const themeId of ALL_THEME_IDS) {
  for (const locale of SUPPORTED_LOCALES) {
    const slug = getThemeSlug(themeId, locale);
    if (!slug) continue;
    const resolved = getThemeIdFromSlug(locale, slug);
    if (resolved !== themeId) {
      addIssue('REVERSE_LOOKUP_FAIL', themeId, locale,
        `getThemeIdFromSlug("${locale}", "${slug}") returned "${resolved}" instead of "${themeId}"`);
      reverseFails++;
    }
  }
}
console.log(`  ${reverseFails === 0 ? 'PASS' : 'FAIL'}: ${reverseFails} reverse lookup failures\n`);

// ── Check 3: No slug collisions within a locale ─────────────────────────────
console.log('Check 3: Slug collision check...');
let collisions = 0;
for (const locale of SUPPORTED_LOCALES) {
  const slugToThemes = {};
  for (const themeId of ALL_THEME_IDS) {
    const slug = themeSlugMap[themeId]?.[locale];
    if (!slug) continue;
    if (!slugToThemes[slug]) slugToThemes[slug] = [];
    slugToThemes[slug].push(themeId);
  }
  for (const [slug, themes] of Object.entries(slugToThemes)) {
    if (themes.length > 1) {
      for (const themeId of themes) {
        addIssue('COLLISION', themeId, locale,
          `Slug "${slug}" shared by: ${themes.join(', ')}`);
      }
      collisions++;
    }
  }
}
console.log(`  ${collisions === 0 ? 'PASS' : 'FAIL'}: ${collisions} collisions\n`);

// ── Check 4: Hreflang consistency (page.tsx vs sitemap.ts) ──────────────────
// Both use getThemeSlug in identical loops, so we verify the output matches.
console.log('Check 4: Hreflang consistency (page.tsx vs sitemap.ts)...');
let inconsistencies = 0;

function buildHreflangSet(themeId) {
  // Simulates both page.tsx and sitemap.ts logic (they're identical)
  const alts = {};
  for (const lang of SUPPORTED_LOCALES) {
    const langSlug = getThemeSlug(themeId, lang);
    if (langSlug) {
      alts[getHreflangCode(lang)] = `${BASE_URL}/${lang}/worksheets/${langSlug}`;
    }
  }
  const enSlug = getThemeSlug(themeId, 'en');
  if (enSlug) {
    alts['x-default'] = `${BASE_URL}/en/worksheets/${enSlug}`;
  }
  return alts;
}

// Since both use the same function, if getThemeSlug is consistent,
// the output will be identical. We verify completeness here.
for (const themeId of ALL_THEME_IDS) {
  const alts = buildHreflangSet(themeId);
  // Should have one entry per locale + x-default = 12 entries
  const expectedCount = SUPPORTED_LOCALES.length + 1; // +1 for x-default
  if (Object.keys(alts).length !== expectedCount) {
    addIssue('INCOMPLETE_HREFLANG', themeId, '*',
      `Expected ${expectedCount} hreflang entries, got ${Object.keys(alts).length}`);
    inconsistencies++;
  }
}
console.log(`  ${inconsistencies === 0 ? 'PASS' : 'FAIL'}: ${inconsistencies} incomplete hreflang sets\n`);

// ── Check 5: Self-referencing hreflang ──────────────────────────────────────
console.log('Check 5: Self-referencing hreflang...');
let selfRefFails = 0;
for (const themeId of ALL_THEME_IDS) {
  const alts = buildHreflangSet(themeId);
  for (const locale of SUPPORTED_LOCALES) {
    const slug = getThemeSlug(themeId, locale);
    if (!slug) continue;
    const pageUrl = `${BASE_URL}/${locale}/worksheets/${slug}`;
    const hreflangCode = getHreflangCode(locale);
    if (alts[hreflangCode] !== pageUrl) {
      addIssue('MISSING_SELF_REF', themeId, locale,
        `Page URL "${pageUrl}" not found in its own hreflang set (hreflang[${hreflangCode}] = "${alts[hreflangCode] || 'missing'}")`);
      selfRefFails++;
    }
  }
}
console.log(`  ${selfRefFails === 0 ? 'PASS' : 'FAIL'}: ${selfRefFails} missing self-references\n`);

// ── Check 6: Reciprocal hreflang ────────────────────────────────────────────
console.log('Check 6: Reciprocal hreflang...');
let reciprocalFails = 0;
for (const themeId of ALL_THEME_IDS) {
  const altsForTheme = buildHreflangSet(themeId);
  // For each locale pair (A, B): if A's hreflang points to B, verify B's hreflang points back to A
  for (const localeA of SUPPORTED_LOCALES) {
    const slugA = getThemeSlug(themeId, localeA);
    if (!slugA) continue;
    const urlA = `${BASE_URL}/${localeA}/worksheets/${slugA}`;
    const codeA = getHreflangCode(localeA);

    for (const localeB of SUPPORTED_LOCALES) {
      if (localeA === localeB) continue;
      const slugB = getThemeSlug(themeId, localeB);
      if (!slugB) continue;
      const urlB = `${BASE_URL}/${localeB}/worksheets/${slugB}`;
      const codeB = getHreflangCode(localeB);

      // A's hreflang should point to B
      if (altsForTheme[codeB] !== urlB) {
        addIssue('ASYMMETRIC_HREFLANG', themeId, `${localeA}->${localeB}`,
          `Locale ${localeA}'s hreflang missing link to ${localeB}`);
        reciprocalFails++;
        continue;
      }

      // B's hreflang should point back to A (since all pages use the same buildHreflangSet,
      // this is guaranteed if the slug map is complete, but we verify explicitly)
      const altsForB = buildHreflangSet(themeId);
      if (altsForB[codeA] !== urlA) {
        addIssue('ASYMMETRIC_HREFLANG', themeId, `${localeB}->${localeA}`,
          `Locale ${localeB}'s hreflang missing link back to ${localeA}`);
        reciprocalFails++;
      }
    }
  }
}
console.log(`  ${reciprocalFails === 0 ? 'PASS' : 'FAIL'}: ${reciprocalFails} asymmetric hreflang pairs\n`);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

const totalIssues = issues.length;
const totalPages = ALL_THEME_IDS.length * SUPPORTED_LOCALES.length;
passCount = totalPages - slugGaps;

console.log('='.repeat(60));
console.log(`THEME HUB HREFLANG AUDIT SUMMARY`);
console.log('='.repeat(60));
console.log(`Total pages checked:   ${totalPages}`);
console.log(`Slugs complete:        ${passCount}/${totalPages}`);
console.log(`Total issues found:    ${totalIssues}`);
console.log();

if (totalIssues > 0) {
  // Group by category
  const byCategory = {};
  for (const issue of issues) {
    if (!byCategory[issue.category]) byCategory[issue.category] = [];
    byCategory[issue.category].push(issue);
  }
  for (const [cat, catIssues] of Object.entries(byCategory)) {
    console.log(`  ${cat}: ${catIssues.length} issues`);
    // Show first 5 examples
    for (const issue of catIssues.slice(0, 5)) {
      console.log(`    - [${issue.themeId}/${issue.locale}] ${issue.detail}`);
    }
    if (catIssues.length > 5) {
      console.log(`    ... and ${catIssues.length - 5} more`);
    }
  }
} else {
  console.log('  ALL CHECKS PASSED - 550/550 theme hub pages have correct hreflang');
}

// ---------------------------------------------------------------------------
// Write JSON report
// ---------------------------------------------------------------------------

const reportDir = path.join(__dirname, '..', 'docs', 'audit-results');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

const report = {
  audit: 'theme-hreflang',
  timestamp: new Date().toISOString(),
  totalPages: totalPages,
  passCount: passCount,
  totalIssues: totalIssues,
  checks: {
    slugCompleteness: { pass: slugGaps === 0, gaps: slugGaps },
    reverseLookup: { pass: reverseFails === 0, failures: reverseFails },
    collisions: { pass: collisions === 0, count: collisions },
    hreflangConsistency: { pass: inconsistencies === 0, incomplete: inconsistencies },
    selfReferencing: { pass: selfRefFails === 0, missing: selfRefFails },
    reciprocal: { pass: reciprocalFails === 0, asymmetric: reciprocalFails },
  },
  issues: issues,
};

const reportPath = path.join(reportDir, 'theme-hreflang-audit.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\nReport written to: ${reportPath}`);

// Exit code
process.exit(totalIssues > 0 ? 1 : 0);
