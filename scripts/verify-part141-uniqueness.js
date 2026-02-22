#!/usr/bin/env node
/**
 * verify-part141-uniqueness.js - Content Uniqueness Verification (All 250 EN Pages)
 *
 * Checks all 50 themes x 5 grades for duplicate content across:
 *  1. intro (exact duplicates)
 *  2. intro (near-duplicate: first 100 chars match)
 *  3. developmentalNotes (exact duplicates)
 *  4. uniqueSummary (exact duplicates)
 *  5. snippetAnswer (exact duplicates)
 *  6. teachingTips (identical strings across different themes) - WARN
 *  7. FAQ answers (identical strings across different themes) - WARN
 *  8. seoTitle (exact duplicates)
 *  9. seoDescription (exact duplicates)
 * 10. Cross-field: intro reused verbatim as developmentalNotes or vice versa
 *
 * Run: node scripts/verify-part141-uniqueness.js
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const THEMES = [
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
const GRADES = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

// ---------------------------------------------------------------------------
// Parsing helpers
// ---------------------------------------------------------------------------

/** Skip past a single-quoted string starting at position i (just after the opening quote). */
function skipString(text, i) {
  while (i < text.length) {
    if (text[i] === '\\') { i += 2; continue; }
    if (text[i] === "'") return i + 1;
    i++;
  }
  return i;
}

/** Extract the content of a brace-delimited block for a given grade ID. */
function extractGradeBlock(fileContent, gradeId) {
  const pat = new RegExp("'" + gradeId + "':\\s*\\{");
  const m = pat.exec(fileContent);
  if (!m) return null;

  let depth = 1;
  let i = m.index + m[0].length;
  while (i < fileContent.length && depth > 0) {
    const ch = fileContent[i];
    if (ch === "'") { i = skipString(fileContent, i + 1); continue; }
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
    i++;
  }
  return fileContent.substring(m.index, i);
}

/** Extract a single-quoted string value for a top-level field in a block. */
function extractField(block, fieldName) {
  const re = new RegExp(fieldName + ":\\s*'((?:[^'\\\\]|\\\\.)*)'");
  const m = re.exec(block);
  if (!m) return null;
  return m[1].replace(/\\'/g, "'").replace(/\\n/g, '\n');
}

/** Find the content of a [...] array for a given field, respecting nested brackets and strings. */
function findArrayContent(text, fieldName) {
  const idx = text.indexOf(fieldName + ':');
  if (idx === -1) return '';
  let i = text.indexOf('[', idx);
  if (i === -1) return '';
  const start = i;
  let depth = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === "'") { i = skipString(text, i + 1); continue; }
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) return text.substring(start, i + 1); }
    i++;
  }
  return '';
}

/** Extract all single-quoted strings from an array block (for teachingTips: string[]). */
function extractStringsFromArray(arrayBlock) {
  const items = [];
  const re = /'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(arrayBlock)) !== null) {
    items.push(m[1].replace(/\\'/g, "'"));
  }
  return items;
}

/** Extract all FAQ answer strings from the faq array in a grade block. */
function extractFaqAnswers(block) {
  const faqArr = findArrayContent(block, 'faq');
  if (!faqArr) return [];
  const answers = [];
  const re = /answer:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(faqArr)) !== null) {
    answers.push(m[1].replace(/\\'/g, "'"));
  }
  return answers;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const errors = [];
const warnings = [];
let pagesScanned = 0;

// Maps: value -> [page labels]
const introMap = {};
const introPrefixMap = {};
const devNotesMap = {};
const uniqueSummaryMap = {};
const snippetAnswerMap = {};
const seoTitleMap = {};
const seoDescMap = {};
const teachingTipMap = {};
const faqAnswerMap = {};

// Cross-field data
const crossFieldData = [];

for (const theme of THEMES) {
  const filePath = path.join(BASE, theme, 'en.ts');
  if (!fs.existsSync(filePath)) {
    errors.push(`MISSING FILE: ${theme}/en.ts`);
    continue;
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');

  for (const grade of GRADES) {
    const label = `${theme}/${grade}`;
    const block = extractGradeBlock(fileContent, grade);

    if (!block) {
      errors.push(`${label}: MISSING grade block`);
      continue;
    }

    pagesScanned++;

    // Extract fields
    const intro = extractField(block, 'intro');
    const devNotes = extractField(block, 'developmentalNotes');
    const uniqueSummary = extractField(block, 'uniqueSummary');
    const snippetAnswer = extractField(block, 'snippetAnswer');
    const seoTitle = extractField(block, 'seoTitle');
    const seoDesc = extractField(block, 'seoDescription');

    const tipsArr = findArrayContent(block, 'teachingTips');
    const tips = extractStringsFromArray(tipsArr);
    const faqAnswers = extractFaqAnswers(block);

    // Populate maps
    if (intro) {
      (introMap[intro] = introMap[intro] || []).push(label);
      const prefix = intro.substring(0, 100).replace(/\s+/g, ' ').trim();
      (introPrefixMap[prefix] = introPrefixMap[prefix] || []).push(label);
    }
    if (devNotes) (devNotesMap[devNotes] = devNotesMap[devNotes] || []).push(label);
    if (uniqueSummary) (uniqueSummaryMap[uniqueSummary] = uniqueSummaryMap[uniqueSummary] || []).push(label);
    if (snippetAnswer) (snippetAnswerMap[snippetAnswer] = snippetAnswerMap[snippetAnswer] || []).push(label);
    if (seoTitle) (seoTitleMap[seoTitle] = seoTitleMap[seoTitle] || []).push(label);
    if (seoDesc) (seoDescMap[seoDesc] = seoDescMap[seoDesc] || []).push(label);

    for (const tip of tips) {
      const key = tip.trim();
      if (key) (teachingTipMap[key] = teachingTipMap[key] || []).push(label);
    }
    for (const ans of faqAnswers) {
      const key = ans.trim();
      if (key) (faqAnswerMap[key] = faqAnswerMap[key] || []).push(label);
    }

    crossFieldData.push({ label, intro, devNotes });
  }
}

// ---------------------------------------------------------------------------
// Run 10 checks
// ---------------------------------------------------------------------------

const checksTotal = 10;
let checksPassed = 0;

function runDuplicateCheck(num, title, map, severity) {
  console.log(`\n=== Check ${num}: ${title} ===`);
  let found = false;
  const dupes = [];

  for (const [val, labels] of Object.entries(map)) {
    if (labels.length > 1) {
      dupes.push({ val, labels });
    }
  }

  if (dupes.length > 0) {
    for (const d of dupes) {
      const msg = `${severity === 'WARN' ? 'WARN' : 'ERROR'}: "${d.val.substring(0, 70)}..." shared by ${d.labels.join(', ')}`;
      if (severity === 'WARN') { warnings.push(msg); console.log(`  WARN: ${d.labels.join(', ')}`); }
      else { errors.push(msg); console.log(`  ERROR: ${d.labels.join(', ')}`); }
      found = true;
    }
  }

  if (!found) {
    const total = Object.values(map).flat().length;
    console.log(`  PASS (${total} values, all unique)`);
  }

  // WARN-level checks always count as passed for the summary
  if (!found || severity === 'WARN') checksPassed++;
}

// Check 1: Exact duplicate intros
runDuplicateCheck(1, 'Exact duplicate intros', introMap, 'ERROR');

// Check 2: Near-duplicate intros (first 100 chars)
console.log('\n=== Check 2: Near-duplicate intros (first 100 chars) ===');
{
  let found = false;
  for (const [prefix, labels] of Object.entries(introPrefixMap)) {
    if (labels.length > 1) {
      const msg = `NEAR-DUP intro prefix: "${prefix.substring(0, 60)}..." shared by ${labels.join(', ')}`;
      errors.push(msg);
      console.log(`  ERROR: ${labels.join(', ')}: "${prefix.substring(0, 60)}..."`);
      found = true;
    }
  }
  if (!found) {
    console.log(`  PASS (${Object.keys(introPrefixMap).length} unique prefixes)`);
    checksPassed++;
  }
}

// Check 3: Exact duplicate developmentalNotes
runDuplicateCheck(3, 'Exact duplicate developmentalNotes', devNotesMap, 'ERROR');

// Check 4: Exact duplicate uniqueSummary
runDuplicateCheck(4, 'Exact duplicate uniqueSummary', uniqueSummaryMap, 'ERROR');

// Check 5: Exact duplicate snippetAnswer
runDuplicateCheck(5, 'Exact duplicate snippetAnswer', snippetAnswerMap, 'ERROR');

// Check 6: Teaching tips reused across different themes (WARN)
console.log('\n=== Check 6: Teaching tips reused across different themes ===');
{
  let found = false;
  for (const [val, labels] of Object.entries(teachingTipMap)) {
    if (labels.length > 1) {
      const themes = new Set(labels.map(l => l.split('/')[0]));
      if (themes.size > 1) {
        const msg = `WARN: tip reused across ${themes.size} themes: "${val.substring(0, 70)}..."`;
        warnings.push(msg);
        console.log(`  WARN: "${val.substring(0, 70)}..." used in ${labels.join(', ')}`);
        found = true;
      }
    }
  }
  if (!found) {
    const total = Object.values(teachingTipMap).flat().length;
    console.log(`  PASS (${total} tips, no cross-theme reuse)`);
  }
  checksPassed++; // WARN level always passes
}

// Check 7: FAQ answers reused across different themes (WARN)
console.log('\n=== Check 7: FAQ answers reused across different themes ===');
{
  let found = false;
  for (const [val, labels] of Object.entries(faqAnswerMap)) {
    if (labels.length > 1) {
      const themes = new Set(labels.map(l => l.split('/')[0]));
      if (themes.size > 1) {
        const msg = `WARN: FAQ answer reused across ${themes.size} themes: "${val.substring(0, 70)}..."`;
        warnings.push(msg);
        console.log(`  WARN: "${val.substring(0, 70)}..." used in ${labels.join(', ')}`);
        found = true;
      }
    }
  }
  if (!found) {
    const total = Object.values(faqAnswerMap).flat().length;
    console.log(`  PASS (${total} FAQ answers, no cross-theme reuse)`);
  }
  checksPassed++; // WARN level always passes
}

// Check 8: Duplicate seoTitle
runDuplicateCheck(8, 'Duplicate seoTitle', seoTitleMap, 'ERROR');

// Check 9: Duplicate seoDescription
runDuplicateCheck(9, 'Duplicate seoDescription', seoDescMap, 'ERROR');

// Check 10: Cross-field intro/developmentalNotes overlap
console.log('\n=== Check 10: Cross-field intro/developmentalNotes overlap ===');
{
  let found = false;
  for (const page of crossFieldData) {
    if (!page.intro || !page.devNotes) continue;

    if (page.intro === page.devNotes) {
      const msg = `${page.label}: intro and developmentalNotes are identical`;
      errors.push(msg);
      console.log(`  ERROR: ${msg}`);
      found = true;
    } else if (page.devNotes.length >= 50 && page.intro.includes(page.devNotes)) {
      const msg = `${page.label}: developmentalNotes is a verbatim substring of intro`;
      errors.push(msg);
      console.log(`  ERROR: ${msg}`);
      found = true;
    } else if (page.intro.length >= 50 && page.devNotes.includes(page.intro)) {
      const msg = `${page.label}: intro is a verbatim substring of developmentalNotes`;
      errors.push(msg);
      console.log(`  ERROR: ${msg}`);
      found = true;
    }
  }
  if (!found) {
    console.log(`  PASS (${crossFieldData.length} pages, no cross-field overlap)`);
    checksPassed++;
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log('\n' + '='.repeat(60));
console.log('CONTENT UNIQUENESS VERIFICATION - Part 141');
console.log('='.repeat(60));
console.log(`Pages scanned: ${pagesScanned}/250`);
console.log(`Checks: ${checksTotal}`);
console.log(`Checks passed: ${checksPassed}/${checksTotal}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.log('\n--- ERRORS ---');
  errors.forEach(e => console.log(`  ${e}`));
}

if (warnings.length > 0) {
  console.log('\n--- WARNINGS (informational, not blocking) ---');
  warnings.slice(0, 30).forEach(w => console.log(`  ${w}`));
  if (warnings.length > 30) console.log(`  ... and ${warnings.length - 30} more`);
}

if (errors.length === 0) {
  console.log('\nRESULT: ALL CHECKS PASSED - content is unique across all 250 pages');
} else {
  console.log(`\nRESULT: ${errors.length} ERROR(S) FOUND - review duplicates above`);
}

process.exit(errors.length > 0 ? 1 : 0);
