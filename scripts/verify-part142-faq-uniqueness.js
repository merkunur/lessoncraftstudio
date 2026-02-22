#!/usr/bin/env node
/**
 * verify-part142-faq-uniqueness.js - FAQ Uniqueness Verification (All 250 EN Pages)
 *
 * Comprehensive FAQ audit across all 50 themes x 5 grades + 50 theme-level FAQs:
 *  1. Duplicate theme-level FAQ questions across themes       (ERROR)
 *  2. Duplicate theme-level FAQ answers across themes         (ERROR)
 *  3. Duplicate grade-level FAQ questions across all 250 pages (ERROR)
 *  4. Duplicate grade-level FAQ answers across all 250 pages   (ERROR)
 *  5. FAQ question reuse between theme-level and grade-level   (WARN)
 *  6. FAQ answer reuse between theme-level and grade-level     (WARN)
 *  7. FAQ answer minimum length (< 80 chars = thin content)    (WARN)
 *  8. FAQ question minimum length (< 20 chars = low quality)   (WARN)
 *
 * Run: node scripts/verify-part142-faq-uniqueness.js
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

const MIN_ANSWER_LEN = 80;
const MIN_QUESTION_LEN = 20;

// ---------------------------------------------------------------------------
// Parsing helpers (from Part 141)
// ---------------------------------------------------------------------------

function skipString(text, i) {
  while (i < text.length) {
    if (text[i] === '\\') { i += 2; continue; }
    if (text[i] === "'") return i + 1;
    i++;
  }
  return i;
}

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

/** Find the content of a [...] array for a given field, respecting nesting and strings. */
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

/** Extract FAQ {question, answer} pairs from a faq array block. */
function extractFaqPairs(block) {
  const faqArr = findArrayContent(block, 'faq');
  if (!faqArr) return [];
  const pairs = [];
  const re = /\{\s*question:\s*'((?:[^'\\]|\\.)*)'\s*,\s*answer:\s*'((?:[^'\\]|\\.)*)'\s*\}/g;
  let m;
  while ((m = re.exec(faqArr)) !== null) {
    pairs.push({
      question: m[1].replace(/\\'/g, "'").replace(/\\n/g, '\n'),
      answer: m[2].replace(/\\'/g, "'").replace(/\\n/g, '\n'),
    });
  }
  return pairs;
}

/**
 * Extract the theme-level FAQ array (outside gradeContent).
 * Strategy: find the gradeContent block, then find `faq:` AFTER it closes.
 */
function extractThemeLevelFaq(fileContent) {
  // Find gradeContent block
  const gcIdx = fileContent.indexOf('gradeContent:');
  if (gcIdx === -1) return [];

  // Find opening brace of gradeContent
  let i = fileContent.indexOf('{', gcIdx);
  if (i === -1) return [];
  let depth = 1;
  i++;
  while (i < fileContent.length && depth > 0) {
    const ch = fileContent[i];
    if (ch === "'") { i = skipString(fileContent, i + 1); continue; }
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
    i++;
  }
  // i now points just after gradeContent closing brace
  const afterGradeContent = fileContent.substring(i);

  // Find faq: in remainder
  const faqIdx = afterGradeContent.indexOf('faq:');
  if (faqIdx === -1) return [];

  // Extract the faq array from the remainder
  return extractFaqPairs(afterGradeContent);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const errors = [];
const warnings = [];
let themeFaqCount = 0;
let gradeFaqCount = 0;

// Maps for duplicate detection
// Theme-level
const themeQMap = {};   // question -> [theme labels]
const themeAMap = {};   // answer -> [theme labels]

// Grade-level
const gradeQMap = {};   // question -> [theme/grade labels]
const gradeAMap = {};   // answer -> [theme/grade labels]

// Cross-level (per theme): store questions and answers at each level
const themeQuestions = {};  // theme -> Set of questions
const themeAnswers = {};    // theme -> Set of answers
const gradeQuestionsPerTheme = {};  // theme -> Set of questions
const gradeAnswersPerTheme = {};    // theme -> Set of answers

for (const theme of THEMES) {
  const filePath = path.join(BASE, theme, 'en.ts');
  if (!fs.existsSync(filePath)) {
    errors.push(`MISSING FILE: ${theme}/en.ts`);
    continue;
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // --- Theme-level FAQ ---
  const themeFaqs = extractThemeLevelFaq(fileContent);
  themeFaqCount += themeFaqs.length;
  themeQuestions[theme] = new Set();
  themeAnswers[theme] = new Set();

  for (const faq of themeFaqs) {
    const label = `${theme} [theme-FAQ]`;

    // Populate theme-level maps
    (themeQMap[faq.question] = themeQMap[faq.question] || []).push(label);
    (themeAMap[faq.answer] = themeAMap[faq.answer] || []).push(label);

    // Store for cross-level check
    themeQuestions[theme].add(faq.question);
    themeAnswers[theme].add(faq.answer);

    // Check 8: question length
    if (faq.question.length < MIN_QUESTION_LEN) {
      warnings.push(`[Check 8] ${label}: FAQ question too short (${faq.question.length} chars): "${faq.question.substring(0, 60)}..."`);
    }
    // Check 7: answer length
    if (faq.answer.length < MIN_ANSWER_LEN) {
      warnings.push(`[Check 7] ${label}: FAQ answer too short (${faq.answer.length} chars): "${faq.answer.substring(0, 60)}..."`);
    }
  }

  // --- Grade-level FAQs ---
  gradeQuestionsPerTheme[theme] = new Set();
  gradeAnswersPerTheme[theme] = new Set();

  for (const grade of GRADES) {
    const block = extractGradeBlock(fileContent, grade);
    if (!block) {
      errors.push(`${theme}/${grade}: MISSING grade block`);
      continue;
    }

    const gradeFaqs = extractFaqPairs(block);
    gradeFaqCount += gradeFaqs.length;

    for (const faq of gradeFaqs) {
      const label = `${theme}/${grade}`;

      // Populate grade-level maps
      (gradeQMap[faq.question] = gradeQMap[faq.question] || []).push(label);
      (gradeAMap[faq.answer] = gradeAMap[faq.answer] || []).push(label);

      // Store for cross-level check
      gradeQuestionsPerTheme[theme].add(faq.question);
      gradeAnswersPerTheme[theme].add(faq.answer);

      // Check 8: question length
      if (faq.question.length < MIN_QUESTION_LEN) {
        warnings.push(`[Check 8] ${label}: FAQ question too short (${faq.question.length} chars): "${faq.question.substring(0, 60)}..."`);
      }
      // Check 7: answer length
      if (faq.answer.length < MIN_ANSWER_LEN) {
        warnings.push(`[Check 7] ${label}: FAQ answer too short (${faq.answer.length} chars): "${faq.answer.substring(0, 60)}..."`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Check 1: Duplicate theme-level FAQ questions across themes
// ---------------------------------------------------------------------------
for (const [q, labels] of Object.entries(themeQMap)) {
  if (labels.length > 1) {
    errors.push(`[Check 1] Theme-level FAQ question duplicated across ${labels.length} themes: "${q.substring(0, 80)}..." -> ${labels.join(', ')}`);
  }
}

// ---------------------------------------------------------------------------
// Check 2: Duplicate theme-level FAQ answers across themes
// ---------------------------------------------------------------------------
for (const [a, labels] of Object.entries(themeAMap)) {
  if (labels.length > 1) {
    errors.push(`[Check 2] Theme-level FAQ answer duplicated across ${labels.length} themes: "${a.substring(0, 80)}..." -> ${labels.join(', ')}`);
  }
}

// ---------------------------------------------------------------------------
// Check 3: Duplicate grade-level FAQ questions across all 250 pages
// ---------------------------------------------------------------------------
for (const [q, labels] of Object.entries(gradeQMap)) {
  if (labels.length > 1) {
    errors.push(`[Check 3] Grade-level FAQ question duplicated across ${labels.length} pages: "${q.substring(0, 80)}..." -> ${labels.join(', ')}`);
  }
}

// ---------------------------------------------------------------------------
// Check 4: Duplicate grade-level FAQ answers across all 250 pages
// ---------------------------------------------------------------------------
for (const [a, labels] of Object.entries(gradeAMap)) {
  if (labels.length > 1) {
    errors.push(`[Check 4] Grade-level FAQ answer duplicated across ${labels.length} pages: "${a.substring(0, 80)}..." -> ${labels.join(', ')}`);
  }
}

// ---------------------------------------------------------------------------
// Check 5: FAQ question reuse between theme-level and grade-level (same theme)
// ---------------------------------------------------------------------------
for (const theme of THEMES) {
  if (!themeQuestions[theme] || !gradeQuestionsPerTheme[theme]) continue;
  for (const q of themeQuestions[theme]) {
    if (gradeQuestionsPerTheme[theme].has(q)) {
      warnings.push(`[Check 5] ${theme}: FAQ question shared between theme-level and grade-level: "${q.substring(0, 80)}..."`);
    }
  }
}

// ---------------------------------------------------------------------------
// Check 6: FAQ answer reuse between theme-level and grade-level (same theme)
// ---------------------------------------------------------------------------
for (const theme of THEMES) {
  if (!themeAnswers[theme] || !gradeAnswersPerTheme[theme]) continue;
  for (const a of themeAnswers[theme]) {
    if (gradeAnswersPerTheme[theme].has(a)) {
      warnings.push(`[Check 6] ${theme}: FAQ answer shared between theme-level and grade-level: "${a.substring(0, 80)}..."`);
    }
  }
}

// Checks 7 & 8 already collected during extraction loop above.

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const totalFaqs = themeFaqCount + gradeFaqCount;
console.log('='.repeat(70));
console.log('Part 142: FAQ Uniqueness Verification (All 250 EN Pages)');
console.log('='.repeat(70));
console.log(`\nTheme-level FAQs scanned: ${themeFaqCount} (expect 500 = 50 themes x 10)`);
console.log(`Grade-level FAQs scanned: ${gradeFaqCount} (expect 750 = 50 themes x 5 grades x 3)`);
console.log(`Total FAQ entries: ${totalFaqs} (expect 1250)`);
console.log(`\nChecks performed: 8`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.log('\n--- ERRORS ---');
  for (const e of errors) console.log(`  ERROR: ${e}`);
}
if (warnings.length > 0) {
  console.log('\n--- WARNINGS ---');
  for (const w of warnings) console.log(`  WARN: ${w}`);
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\nAll 8 checks passed with 0 errors and 0 warnings.');
}

console.log('\n' + '='.repeat(70));
console.log(errors.length === 0 ? 'RESULT: PASS' : 'RESULT: FAIL');
console.log('='.repeat(70));

process.exit(errors.length > 0 ? 1 : 0);
