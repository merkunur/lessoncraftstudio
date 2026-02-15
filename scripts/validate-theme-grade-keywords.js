#!/usr/bin/env node
/**
 * Validates the theme+grade keyword map (en-theme-grade-pages.md).
 * Checks:
 * 1. All 50 primary keywords are unique (0 duplicates)
 * 2. No overlap with 33 product page primary keywords
 * 3. No overlap with 50 theme hub primary keywords
 * 4. All titles: 50-60 characters
 * 5. All descriptions: 150-160 characters
 * 6. All primary keywords contain a grade modifier
 * 7. Within each theme, all 5 grades target different focus skills
 * 8. No "generator"/"maker" in any primary keyword
 * 9. No bare "for kids" as the only qualifier
 */

const fs = require('fs');
const path = require('path');

// --- Config ---
const DOCS_DIR = path.join(__dirname, '..', 'docs', 'seo-keywords');
const THEME_GRADE_FILE = path.join(DOCS_DIR, 'en-theme-grade-pages.md');
const PRODUCT_FILE = path.join(DOCS_DIR, 'en-product-pages.md');
const THEME_HUB_FILE = path.join(DOCS_DIR, 'en-theme-hubs.md');

const GRADE_MODIFIERS = [
  'preschool', 'pre-k', 'pre k', 'kindergarten',
  'first grade', '1st grade', 'grade 1',
  'second grade', '2nd grade', 'grade 2',
  'third grade', '3rd grade', 'grade 3',
  'ages 3-4', 'ages 4-5', 'ages 5-6', 'ages 6-7', 'ages 7-8', 'ages 8-9'
];

const BANNED_WORDS = ['generator', 'maker', 'creator', 'builder'];

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  WARN: ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  OK: ${msg}`);
}

// --- Extract primary keywords from product pages ---
function extractProductKeywords(content) {
  const keywords = [];
  const regex = /\*\*Primary Keyword\*\*\s*\|\s*(.+?)\s*\|/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    keywords.push(match[1].trim().toLowerCase());
  }
  return keywords;
}

// --- Extract primary keywords from theme hubs ---
function extractThemeHubKeywords(content) {
  const keywords = [];
  const regex = /\*\*Primary Keyword\*\*\s*\|\s*(.+?)\s*\|/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    keywords.push(match[1].trim().toLowerCase());
  }
  return keywords;
}

// --- Extract a table cell value, handling \| (escaped pipes) inside cells ---
function extractTableField(block, fieldName) {
  const lines = block.split('\n');
  for (const line of lines) {
    if (line.includes(`**${fieldName}**`)) {
      // Replace \| with placeholder before splitting by |
      const PH = '%%ESCAPEDPIPE%%';
      const safe = line.replace(/\\\|/g, PH);
      const cells = safe.split('|').map(c => c.trim());
      // cells: ["", "**Field**", "value", ""]
      if (cells.length >= 3) {
        return cells[2].replace(/%%ESCAPEDPIPE%%/g, '|').trim();
      }
    }
  }
  return null;
}

// --- Parse theme+grade entries ---
function parseThemeGradeEntries(content) {
  const entries = [];
  // Split by ### N. pattern
  const entryBlocks = content.split(/###\s+\d+\.\s+/);

  for (const block of entryBlocks) {
    if (!block.trim() || !block.includes('Primary Keyword')) continue;

    const entry = {};

    // Extract header: "Theme — Grade (`slug`)"
    const headerMatch = block.match(/^(.+?)\s*\u2014\s*(.+?)\s*\(`(.+?)`\)/);
    if (!headerMatch) {
      // Try with --
      const headerMatch2 = block.match(/^(.+?)\s*—\s*(.+?)\s*\(`(.+?)`\)/);
      if (headerMatch2) {
        entry.theme = headerMatch2[1].trim();
        entry.grade = headerMatch2[2].trim();
        entry.slug = headerMatch2[3].trim();
      }
    } else {
      entry.theme = headerMatch[1].trim();
      entry.grade = headerMatch[2].trim();
      entry.slug = headerMatch[3].trim();
    }

    // Extract fields using safe table parser
    entry.primaryKeyword = extractTableField(block, 'Primary Keyword');
    entry.seoTitle = extractTableField(block, 'SEO Title');

    const tcStr = extractTableField(block, 'Title Chars');
    if (tcStr) entry.titleCharsStated = parseInt(tcStr);

    entry.metaDescription = extractTableField(block, 'Meta Description');

    const dcStr = extractTableField(block, 'Desc Chars');
    if (dcStr) entry.descCharsStated = parseInt(dcStr);

    entry.focusSkill = extractTableField(block, 'Focus Skill');

    // Extract secondary keywords
    const secondarySection = block.match(/\*\*Secondary Keywords:\*\*\n([\s\S]*?)(?=\n---|\n##|$)/);
    if (secondarySection) {
      entry.secondaryKeywords = secondarySection[1]
        .split('\n')
        .map(l => l.replace(/^\d+\.\s*/, '').trim())
        .filter(l => l.length > 0);
    }

    if (entry.primaryKeyword) {
      entries.push(entry);
    }
  }

  return entries;
}

// --- Actual character count ---
function charCount(str) {
  if (!str) return 0;
  // Use Array.from to correctly count Unicode characters (like em dash)
  return Array.from(str).length;
}

// --- Main validation ---
function validate() {
  console.log('=== Theme+Grade Keyword Map Validation ===\n');

  // Load files
  if (!fs.existsSync(THEME_GRADE_FILE)) {
    console.error(`FATAL: ${THEME_GRADE_FILE} not found`);
    process.exit(1);
  }

  const themeGradeContent = fs.readFileSync(THEME_GRADE_FILE, 'utf-8');
  const entries = parseThemeGradeEntries(themeGradeContent);

  console.log(`Found ${entries.length} theme+grade entries\n`);
  if (entries.length !== 250) {
    error(`Expected 250 entries, found ${entries.length}`);
  } else {
    ok(`250 entries found`);
  }

  // --- 1. Primary keyword uniqueness ---
  console.log('\n--- Check 1: Primary Keyword Uniqueness ---');
  const pkSet = new Set();
  const pkDuplicates = [];
  for (const e of entries) {
    const pk = e.primaryKeyword.toLowerCase();
    if (pkSet.has(pk)) {
      pkDuplicates.push(pk);
    }
    pkSet.add(pk);
  }
  if (pkDuplicates.length > 0) {
    error(`Duplicate primary keywords: ${pkDuplicates.join(', ')}`);
  } else {
    ok(`All ${entries.length} primary keywords are unique`);
  }

  // --- 2. No overlap with product page keywords ---
  console.log('\n--- Check 2: No Overlap With Product Pages ---');
  let productKeywords = [];
  if (fs.existsSync(PRODUCT_FILE)) {
    const productContent = fs.readFileSync(PRODUCT_FILE, 'utf-8');
    productKeywords = extractProductKeywords(productContent);
    console.log(`  Loaded ${productKeywords.length} product page keywords`);

    const overlaps = [];
    for (const e of entries) {
      const pk = e.primaryKeyword.toLowerCase();
      if (productKeywords.includes(pk)) {
        overlaps.push(pk);
      }
    }
    if (overlaps.length > 0) {
      error(`Overlap with product keywords: ${overlaps.join(', ')}`);
    } else {
      ok(`Zero overlap with ${productKeywords.length} product page keywords`);
    }
  } else {
    warn(`Product pages file not found: ${PRODUCT_FILE}`);
  }

  // --- 3. No overlap with theme hub keywords ---
  console.log('\n--- Check 3: No Overlap With Theme Hub Pages ---');
  let hubKeywords = [];
  if (fs.existsSync(THEME_HUB_FILE)) {
    const hubContent = fs.readFileSync(THEME_HUB_FILE, 'utf-8');
    hubKeywords = extractThemeHubKeywords(hubContent);
    console.log(`  Loaded ${hubKeywords.length} theme hub keywords`);

    const overlaps = [];
    for (const e of entries) {
      const pk = e.primaryKeyword.toLowerCase();
      if (hubKeywords.includes(pk)) {
        overlaps.push(pk);
      }
    }
    if (overlaps.length > 0) {
      error(`Overlap with theme hub keywords: ${overlaps.join(', ')}`);
    } else {
      ok(`Zero overlap with ${hubKeywords.length} theme hub keywords`);
    }
  } else {
    warn(`Theme hub file not found: ${THEME_HUB_FILE}`);
  }

  // --- Total unique count ---
  console.log('\n--- Total Unique Keywords ---');
  const allKeywords = new Set([
    ...productKeywords,
    ...hubKeywords,
    ...entries.map(e => e.primaryKeyword.toLowerCase())
  ]);
  console.log(`  Product: ${productKeywords.length}, Hubs: ${hubKeywords.length}, Theme+Grade: ${entries.length}`);
  console.log(`  Total unique: ${allKeywords.size} (expected ${productKeywords.length + hubKeywords.length + entries.length})`);
  if (allKeywords.size === productKeywords.length + hubKeywords.length + entries.length) {
    ok(`All ${allKeywords.size} keywords across all maps are unique`);
  } else {
    error(`Expected ${productKeywords.length + hubKeywords.length + entries.length} unique, got ${allKeywords.size} — overlap exists`);
  }

  // --- 4. Title character counts ---
  console.log('\n--- Check 4: Title Character Counts (50-60) ---');
  let titleIssues = 0;
  for (const e of entries) {
    if (!e.seoTitle) {
      error(`Entry "${e.slug}" missing SEO title`);
      titleIssues++;
      continue;
    }
    const actual = charCount(e.seoTitle);
    if (actual < 50 || actual > 60) {
      error(`#${entries.indexOf(e)+1} "${e.slug}" title: ${actual} chars (need 50-60) — "${e.seoTitle}"`);
      titleIssues++;
    }
    if (e.titleCharsStated && e.titleCharsStated !== actual) {
      warn(`#${entries.indexOf(e)+1} "${e.slug}" title stated ${e.titleCharsStated} but actual is ${actual}`);
    }
  }
  if (titleIssues === 0) {
    const titleCounts = entries.map(e => charCount(e.seoTitle));
    ok(`All titles in range. Min: ${Math.min(...titleCounts)}, Max: ${Math.max(...titleCounts)}`);
  }

  // --- 5. Description character counts ---
  console.log('\n--- Check 5: Description Character Counts (150-160) ---');
  let descIssues = 0;
  for (const e of entries) {
    if (!e.metaDescription) {
      error(`Entry "${e.slug}" missing meta description`);
      descIssues++;
      continue;
    }
    const actual = charCount(e.metaDescription);
    if (actual < 150 || actual > 160) {
      error(`#${entries.indexOf(e)+1} "${e.slug}" desc: ${actual} chars (need 150-160) — "${e.metaDescription}"`);
      descIssues++;
    }
    if (e.descCharsStated && e.descCharsStated !== actual) {
      warn(`#${entries.indexOf(e)+1} "${e.slug}" desc stated ${e.descCharsStated} but actual is ${actual}`);
    }
  }
  if (descIssues === 0) {
    const descCounts = entries.map(e => charCount(e.metaDescription));
    ok(`All descriptions in range. Min: ${Math.min(...descCounts)}, Max: ${Math.max(...descCounts)}`);
  }

  // --- 6. Grade modifier in primary keyword ---
  console.log('\n--- Check 6: Grade Modifier in Primary Keywords ---');
  let gradeIssues = 0;
  for (const e of entries) {
    const pk = e.primaryKeyword.toLowerCase();
    const hasGrade = GRADE_MODIFIERS.some(g => pk.includes(g));
    if (!hasGrade) {
      error(`#${entries.indexOf(e)+1} "${e.slug}" keyword lacks grade modifier: "${pk}"`);
      gradeIssues++;
    }
  }
  if (gradeIssues === 0) {
    ok(`All ${entries.length} primary keywords contain a grade modifier`);
  }

  // --- 7. No "generator"/"maker" ---
  console.log('\n--- Check 7: No Banned Words (generator/maker/creator/builder) ---');
  let bannedIssues = 0;
  for (const e of entries) {
    const pk = e.primaryKeyword.toLowerCase();
    for (const word of BANNED_WORDS) {
      if (pk.includes(word)) {
        error(`#${entries.indexOf(e)+1} "${e.slug}" keyword contains "${word}": "${pk}"`);
        bannedIssues++;
      }
    }
  }
  if (bannedIssues === 0) {
    ok(`No banned words found in any primary keyword`);
  }

  // --- 8. No bare "for kids" ---
  console.log('\n--- Check 8: No Bare "for kids" Pattern ---');
  let forKidsIssues = 0;
  for (const e of entries) {
    const pk = e.primaryKeyword.toLowerCase();
    if (pk.endsWith('for kids') && !GRADE_MODIFIERS.some(g => pk.includes(g))) {
      error(`#${entries.indexOf(e)+1} "${e.slug}" keyword ends with "for kids" without grade: "${pk}"`);
      forKidsIssues++;
    }
  }
  if (forKidsIssues === 0) {
    ok(`No bare "for kids" pattern found — all use grade modifiers`);
  }

  // --- 9. Within-theme skill differentiation ---
  console.log('\n--- Check 9: Within-Theme Skill Differentiation ---');
  const themeGroups = {};
  for (const e of entries) {
    const theme = e.theme || 'unknown';
    if (!themeGroups[theme]) themeGroups[theme] = [];
    themeGroups[theme].push(e);
  }

  let skillIssues = 0;
  for (const [theme, group] of Object.entries(themeGroups)) {
    const skills = group.map(e => (e.focusSkill || '').toLowerCase());
    const uniqueSkills = new Set(skills);
    if (uniqueSkills.size < group.length) {
      error(`Theme "${theme}" has duplicate focus skills: ${skills.join(', ')}`);
      skillIssues++;
    }
  }
  if (skillIssues === 0) {
    ok(`All ${Object.keys(themeGroups).length} themes have unique focus skills across grades`);
  }

  // --- 10. Secondary keywords count ---
  console.log('\n--- Check 10: Secondary Keywords (5-8 per entry) ---');
  let secIssues = 0;
  for (const e of entries) {
    const count = (e.secondaryKeywords || []).length;
    if (count < 5) {
      warn(`#${entries.indexOf(e)+1} "${e.slug}" has only ${count} secondary keywords (need 5-8)`);
      secIssues++;
    } else if (count > 8) {
      warn(`#${entries.indexOf(e)+1} "${e.slug}" has ${count} secondary keywords (max 8)`);
      secIssues++;
    }
  }
  if (secIssues === 0) {
    ok(`All entries have 5-8 secondary keywords`);
  }

  // --- Summary ---
  console.log('\n=== VALIDATION SUMMARY ===');
  console.log(`  Entries: ${entries.length}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Warnings: ${warnings}`);
  if (errors === 0) {
    console.log('\n  RESULT: ALL CHECKS PASSED');
  } else {
    console.log(`\n  RESULT: ${errors} ERROR(S) FOUND — fix before proceeding`);
  }

  process.exit(errors > 0 ? 1 : 0);
}

validate();
