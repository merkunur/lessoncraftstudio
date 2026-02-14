#!/usr/bin/env node
/**
 * Audit: Theme + Grade combo page hreflang (2,750 pages)
 *
 * Checks:
 * 1. Slug completeness — every theme×grade×locale has both slugs
 * 2. Reverse lookup correctness — getThemeIdFromSlug / getGradeIdFromSlug round-trip
 * 3. No grade slug collisions within a locale
 * 4. Hreflang completeness — exactly 12 entries (11 locales + x-default)
 * 5. Self-referencing hreflang — page's own URL is in its hreflang set
 * 6. Reciprocal hreflang — every A→B has matching B→A
 *
 * Usage: node scripts/audit-theme-grade-hreflang.js
 */

const path = require('path');
const fs = require('fs');

// ── Load data from TS source files ──────────────────────────────────

const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const hreflangMap = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

function getHreflangCode(locale) {
  return hreflangMap[locale] || locale;
}

// Parse theme slugs from theme-slugs.ts
const themeSlugsFile = fs.readFileSync(
  path.join(__dirname, '..', 'frontend', 'config', 'theme-slugs.ts'), 'utf8'
);

// Extract THEME_SLUGS array
const themeSlugsMatch = themeSlugsFile.match(/export const THEME_SLUGS\s*=\s*\[([\s\S]*?)\]\s*as\s*const/);
const THEME_IDS = themeSlugsMatch[1]
  .match(/'([^']+)'/g)
  .map(s => s.replace(/'/g, ''));

// Extract themeSlugMap
const themeSlugMap = {};
const themeMapMatch = themeSlugsFile.match(/export const themeSlugMap[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
const themeMapBody = themeMapMatch[1];

// Parse each theme entry
for (const themeId of THEME_IDS) {
  // Match the block for this themeId: either 'theme-id': { ... } or themeId: { ... }
  const escapedId = themeId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?:'${escapedId}'|${escapedId}):\\s*\\{([^}]+)\\}`, 's');
  const m = themeMapBody.match(pattern);
  if (!m) {
    console.error(`WARN: Could not parse themeSlugMap for ${themeId}`);
    continue;
  }
  const entries = {};
  const pairs = m[1].matchAll(/(\w+):\s*'([^']+)'/g);
  for (const [, locale, slug] of pairs) {
    entries[locale] = slug;
  }
  themeSlugMap[themeId] = entries;
}

// Parse grade slugs from grade-slugs.ts
const gradeSlugsFile = fs.readFileSync(
  path.join(__dirname, '..', 'frontend', 'config', 'grade-slugs.ts'), 'utf8'
);

const GRADE_IDS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

const gradeSlugMap = {};
const gradeMapMatch = gradeSlugsFile.match(/export const gradeSlugMap[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
const gradeMapBody = gradeMapMatch[1];

for (const gradeId of GRADE_IDS) {
  const escapedId = gradeId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?:'${escapedId}'|${escapedId}):\\s*\\{([^}]+)\\}`, 's');
  const m = gradeMapBody.match(pattern);
  if (!m) {
    console.error(`WARN: Could not parse gradeSlugMap for ${gradeId}`);
    continue;
  }
  const entries = {};
  const pairs = m[1].matchAll(/(\w+):\s*'([^']+)'/g);
  for (const [, locale, slug] of pairs) {
    entries[locale] = slug;
  }
  gradeSlugMap[gradeId] = entries;
}

// ── Helper functions (replicate TS logic) ───────────────────────────

function getThemeSlug(themeId, locale) {
  return themeSlugMap[themeId]?.[locale] ?? themeSlugMap[themeId]?.en;
}

function getGradeSlug(gradeId, locale) {
  return gradeSlugMap[gradeId]?.[locale] ?? gradeSlugMap[gradeId]?.en;
}

function getThemeIdFromSlug(locale, slug) {
  for (const [themeId, slugs] of Object.entries(themeSlugMap)) {
    if (slugs[locale] === slug || slugs.en === slug) return themeId;
  }
  return undefined;
}

function getGradeIdFromSlug(locale, slug) {
  for (const [gradeId, slugs] of Object.entries(gradeSlugMap)) {
    if (slugs[locale] === slug || slugs.en === slug) return gradeId;
  }
  return undefined;
}

// ── Build hreflang set (mirrors page.tsx + sitemap.ts logic) ────────

const BASE_URL = 'https://www.lessoncraftstudio.com';

function buildHreflangSet(themeId, gradeId) {
  const alternates = {};
  for (const locale of SUPPORTED_LOCALES) {
    const tSlug = getThemeSlug(themeId, locale);
    const gSlug = getGradeSlug(gradeId, locale);
    if (tSlug && gSlug) {
      alternates[getHreflangCode(locale)] = `${BASE_URL}/${locale}/worksheets/${tSlug}/${gSlug}`;
    }
  }
  const enTSlug = getThemeSlug(themeId, 'en');
  const enGSlug = getGradeSlug(gradeId, 'en');
  if (enTSlug && enGSlug) {
    alternates['x-default'] = `${BASE_URL}/en/worksheets/${enTSlug}/${enGSlug}`;
  }
  return alternates;
}

// ── Run checks ──────────────────────────────────────────────────────

const issues = [];
let totalCombos = 0;
let passingCombos = 0;

console.log('=== Theme + Grade Combo Hreflang Audit ===\n');

// ── Check 1: Slug completeness ──────────────────────────────────────
console.log('Check 1: Slug completeness...');
let check1Issues = 0;

for (const themeId of THEME_IDS) {
  for (const gradeId of GRADE_IDS) {
    for (const locale of SUPPORTED_LOCALES) {
      const tSlug = themeSlugMap[themeId]?.[locale];
      const gSlug = gradeSlugMap[gradeId]?.[locale];
      if (!tSlug) {
        issues.push({ check: 1, type: 'missing-theme-slug', themeId, gradeId, locale });
        check1Issues++;
      }
      if (!gSlug) {
        issues.push({ check: 1, type: 'missing-grade-slug', themeId, gradeId, locale });
        check1Issues++;
      }
    }
  }
}
console.log(`  ${check1Issues === 0 ? 'PASS' : 'FAIL'}: ${check1Issues} gaps found (50 themes x 5 grades x 11 locales = 2750 combos)\n`);

// ── Check 2: Reverse lookup correctness ─────────────────────────────
console.log('Check 2: Reverse lookup correctness...');
let check2Issues = 0;

for (const themeId of THEME_IDS) {
  for (const locale of SUPPORTED_LOCALES) {
    const tSlug = getThemeSlug(themeId, locale);
    if (tSlug) {
      const resolved = getThemeIdFromSlug(locale, tSlug);
      if (resolved !== themeId) {
        issues.push({
          check: 2, type: 'theme-reverse-mismatch',
          themeId, locale, slug: tSlug, resolvedTo: resolved || 'undefined',
        });
        check2Issues++;
      }
    }
  }
}

for (const gradeId of GRADE_IDS) {
  for (const locale of SUPPORTED_LOCALES) {
    const gSlug = getGradeSlug(gradeId, locale);
    if (gSlug) {
      const resolved = getGradeIdFromSlug(locale, gSlug);
      if (resolved !== gradeId) {
        issues.push({
          check: 2, type: 'grade-reverse-mismatch',
          gradeId, locale, slug: gSlug, resolvedTo: resolved || 'undefined',
        });
        check2Issues++;
      }
    }
  }
}
console.log(`  ${check2Issues === 0 ? 'PASS' : 'FAIL'}: ${check2Issues} reverse lookup mismatches\n`);

// ── Check 3: No grade slug collisions within a locale ───────────────
console.log('Check 3: Grade slug collision check...');
let check3Issues = 0;

for (const locale of SUPPORTED_LOCALES) {
  const slugToGrade = {};
  for (const gradeId of GRADE_IDS) {
    const slug = gradeSlugMap[gradeId]?.[locale];
    if (!slug) continue;
    if (slugToGrade[slug]) {
      issues.push({
        check: 3, type: 'grade-slug-collision',
        locale, slug, grades: [slugToGrade[slug], gradeId],
      });
      check3Issues++;
    } else {
      slugToGrade[slug] = gradeId;
    }
  }
}
console.log(`  ${check3Issues === 0 ? 'PASS' : 'FAIL'}: ${check3Issues} collisions\n`);

// ── Check 4: Hreflang completeness (12 entries per combo) ──────────
console.log('Check 4: Hreflang completeness (expect 12 entries each)...');
let check4Issues = 0;

for (const themeId of THEME_IDS) {
  for (const gradeId of GRADE_IDS) {
    totalCombos++;
    const hreflang = buildHreflangSet(themeId, gradeId);
    const count = Object.keys(hreflang).length;
    if (count !== 12) {
      issues.push({
        check: 4, type: 'incomplete-hreflang',
        themeId, gradeId, expected: 12, actual: count,
        missing: [...SUPPORTED_LOCALES.map(l => getHreflangCode(l)), 'x-default']
          .filter(code => !hreflang[code]),
      });
      check4Issues++;
    }
  }
}
console.log(`  ${check4Issues === 0 ? 'PASS' : 'FAIL'}: ${check4Issues}/${totalCombos} combos with incomplete hreflang\n`);

// ── Check 5: Self-referencing hreflang ──────────────────────────────
console.log('Check 5: Self-referencing hreflang...');
let check5Issues = 0;

for (const themeId of THEME_IDS) {
  for (const gradeId of GRADE_IDS) {
    const hreflang = buildHreflangSet(themeId, gradeId);
    for (const locale of SUPPORTED_LOCALES) {
      const tSlug = getThemeSlug(themeId, locale);
      const gSlug = getGradeSlug(gradeId, locale);
      if (!tSlug || !gSlug) continue;

      const selfUrl = `${BASE_URL}/${locale}/worksheets/${tSlug}/${gSlug}`;
      const hreflangCode = getHreflangCode(locale);
      if (hreflang[hreflangCode] !== selfUrl) {
        issues.push({
          check: 5, type: 'missing-self-reference',
          themeId, gradeId, locale, expectedUrl: selfUrl,
          foundUrl: hreflang[hreflangCode] || 'missing',
        });
        check5Issues++;
      }
    }
  }
}
console.log(`  ${check5Issues === 0 ? 'PASS' : 'FAIL'}: ${check5Issues} missing self-references\n`);

// ── Check 6: Reciprocal hreflang ────────────────────────────────────
console.log('Check 6: Reciprocal hreflang (A→B implies B→A)...');
let check6Issues = 0;

for (const themeId of THEME_IDS) {
  for (const gradeId of GRADE_IDS) {
    // For each locale pair, check reciprocity
    for (const localeA of SUPPORTED_LOCALES) {
      const hreflangA = buildHreflangSet(themeId, gradeId);
      const codeB_list = SUPPORTED_LOCALES.filter(l => l !== localeA);

      for (const localeB of codeB_list) {
        const codeA = getHreflangCode(localeA);
        const codeB = getHreflangCode(localeB);
        const urlB = hreflangA[codeB];
        if (!urlB) continue;

        // B's hreflang should contain A's URL
        const hreflangB = buildHreflangSet(themeId, gradeId);
        const urlA = hreflangB[codeA];
        const expectedUrlA = `${BASE_URL}/${localeA}/worksheets/${getThemeSlug(themeId, localeA)}/${getGradeSlug(gradeId, localeA)}`;

        if (urlA !== expectedUrlA) {
          issues.push({
            check: 6, type: 'non-reciprocal',
            themeId, gradeId, localeA, localeB,
            expected: expectedUrlA, found: urlA || 'missing',
          });
          check6Issues++;
        }
      }
    }
  }
}
console.log(`  ${check6Issues === 0 ? 'PASS' : 'FAIL'}: ${check6Issues} non-reciprocal pairs\n`);

// ── Summary ─────────────────────────────────────────────────────────

const totalIssues = issues.length;
passingCombos = totalCombos - new Set(
  issues.filter(i => [4, 5, 6].includes(i.check)).map(i => `${i.themeId}:${i.gradeId}`)
).size;

// Count unique theme+grade combos with ANY issue
const combosWithIssues = new Set(
  issues.map(i => `${i.themeId || 'n/a'}:${i.gradeId || 'n/a'}`)
).size;

console.log('═══════════════════════════════════════════');
console.log(`TOTAL COMBOS: ${totalCombos} (${THEME_IDS.length} themes x ${GRADE_IDS.length} grades)`);
console.log(`PASS: ${totalCombos - combosWithIssues}/${totalCombos}`);
console.log(`ISSUES: ${totalIssues} total across ${combosWithIssues} combos`);
console.log('═══════════════════════════════════════════');

if (totalIssues > 0) {
  console.log('\nIssue breakdown:');
  const byCheck = {};
  for (const issue of issues) {
    const key = `Check ${issue.check}`;
    byCheck[key] = (byCheck[key] || 0) + 1;
  }
  for (const [check, count] of Object.entries(byCheck)) {
    console.log(`  ${check}: ${count} issues`);
  }
  // Show first 10 issues as examples
  console.log('\nFirst 10 issues:');
  for (const issue of issues.slice(0, 10)) {
    console.log(`  ${JSON.stringify(issue)}`);
  }
}

// ── Write JSON report ───────────────────────────────────────────────

const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalThemes: THEME_IDS.length,
    totalGrades: GRADE_IDS.length,
    totalLocales: SUPPORTED_LOCALES.length,
    totalCombos,
    passingCombos: totalCombos - combosWithIssues,
    failingCombos: combosWithIssues,
    totalIssues,
  },
  checks: {
    slugCompleteness: { issues: issues.filter(i => i.check === 1).length },
    reverseLookup: { issues: issues.filter(i => i.check === 2).length },
    gradeSlugCollisions: { issues: issues.filter(i => i.check === 3).length },
    hreflangCompleteness: { issues: issues.filter(i => i.check === 4).length },
    selfReferencing: { issues: issues.filter(i => i.check === 5).length },
    reciprocal: { issues: issues.filter(i => i.check === 6).length },
  },
  issues,
};

const outDir = path.join(__dirname, '..', 'docs', 'audit-results');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, 'theme-grade-hreflang-audit.json');
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`\nReport written to: ${outPath}`);

process.exit(totalIssues > 0 ? 1 : 0);
