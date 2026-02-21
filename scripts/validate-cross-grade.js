#!/usr/bin/env node
/**
 * Cross-Grade Validation Script (Reusable for Parts 106-130)
 *
 * Usage: node scripts/validate-cross-grade.js <theme1> [theme2] [theme3] ...
 *
 * Performs 6 automated checks across all 5 grade levels for each theme:
 *   1. Keyword overlap detection (flags keywords in 3+ grades)
 *   2. Intro uniqueness (first 50 words must differ)
 *   3. uniqueGradeAngle uniqueness (all 5 must be distinct)
 *   4. Assessment rubric escalation (proficient word count should increase)
 *   5. Field completeness (all 14 required fields present)
 *   6. FAQ uniqueness (no duplicate questions across grades)
 */

const fs = require('fs');
const path = require('path');

const GRADES = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
const GRADE_ORDER = { 'preschool': 0, 'kindergarten': 1, 'first-grade': 2, 'second-grade': 3, 'third-grade': 4 };

const REQUIRED_FIELDS = [
  'seoTitle', 'seoDescription', 'seoKeywords', 'intro', 'objectives',
  'developmentalNotes', 'teachingTips', 'faq', 'uniqueGradeAngle',
  'developmentalMilestones', 'differentiationNotes', 'parentTakeaway',
  'classroomIntegration', 'assessmentRubric'
];

// Colors for terminal output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

function loadThemeContent(theme) {
  const filePath = path.join(__dirname, '..', 'frontend', 'content', 'themes', theme, 'en.ts');
  if (!fs.existsSync(filePath)) {
    console.error(`${RED}ERROR: File not found: ${filePath}${RESET}`);
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf-8');

  // Extract gradeContent block
  const gradeContentMatch = source.match(/gradeContent:\s*\{([\s\S]*?)\n\s*\},?\s*\n\s*\/\//);
  if (!gradeContentMatch) {
    console.error(`${RED}ERROR: Could not find gradeContent block in ${theme}/en.ts${RESET}`);
    return null;
  }

  return source;
}

function extractGradeField(source, grade, field) {
  // Build regex to find the field value within the grade block
  const gradePattern = `'${grade}':\\s*\\{`;
  const gradeStart = source.search(new RegExp(gradePattern));
  if (gradeStart === -1) return null;

  // Find the end of this grade block (next grade or end of gradeContent)
  const gradeIdx = GRADE_ORDER[grade];
  let gradeEnd;
  if (gradeIdx < GRADES.length - 1) {
    const nextGrade = GRADES[gradeIdx + 1];
    const nextPattern = `'${nextGrade}':\\s*\\{`;
    gradeEnd = source.search(new RegExp(nextPattern));
    if (gradeEnd === -1) gradeEnd = source.length;
  } else {
    // Last grade - find closing of gradeContent
    gradeEnd = source.length;
  }

  const gradeBlock = source.substring(gradeStart, gradeEnd);

  // Extract specific field
  if (field === 'seoKeywords' || field === 'seoTitle' || field === 'seoDescription' ||
      field === 'intro' || field === 'uniqueGradeAngle' || field === 'developmentalNotes' ||
      field === 'differentiationNotes' || field === 'parentTakeaway' || field === 'classroomIntegration') {
    const match = gradeBlock.match(new RegExp(`${field}:\\s*'([^']*(?:\\\\'[^']*)*)'`));
    if (!match) {
      // Try double quotes
      const match2 = gradeBlock.match(new RegExp(`${field}:\\s*"([^"]*(?:\\\\"[^"]*)*)"`));
      return match2 ? match2[1] : null;
    }
    return match[1];
  }

  if (field === 'objectives' || field === 'teachingTips' || field === 'faq' ||
      field === 'developmentalMilestones' || field === 'assessmentRubric') {
    // Check if the field exists in the grade block
    return gradeBlock.includes(`${field}:`) ? 'PRESENT' : null;
  }

  return gradeBlock.includes(`${field}:`) ? 'PRESENT' : null;
}

function extractSeoKeywords(source, grade) {
  const raw = extractGradeField(source, grade, 'seoKeywords');
  if (!raw) return [];
  // Split by comma and clean up
  return raw.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 0);
}

function extractIntro(source, grade) {
  return extractGradeField(source, grade, 'intro') || '';
}

function extractUniqueGradeAngle(source, grade) {
  return extractGradeField(source, grade, 'uniqueGradeAngle') || '';
}

function extractFaqQuestions(source, grade) {
  const gradePattern = `'${grade}':\\s*\\{`;
  const gradeStart = source.search(new RegExp(gradePattern));
  if (gradeStart === -1) return [];

  const gradeIdx = GRADE_ORDER[grade];
  let gradeEnd;
  if (gradeIdx < GRADES.length - 1) {
    const nextGrade = GRADES[gradeIdx + 1];
    const nextPattern = `'${nextGrade}':\\s*\\{`;
    gradeEnd = source.search(new RegExp(nextPattern));
    if (gradeEnd === -1) gradeEnd = source.length;
  } else {
    gradeEnd = source.length;
  }

  const gradeBlock = source.substring(gradeStart, gradeEnd);
  const questions = [];
  const qPattern = /question:\s*'([^']*(?:\\'[^']*)*)'/g;
  let m;
  while ((m = qPattern.exec(gradeBlock)) !== null) {
    questions.push(m[1].toLowerCase().trim());
  }
  // Also try double-quoted
  const qPattern2 = /question:\s*"([^"]*(?:\\"[^"]*)*)"/g;
  while ((m = qPattern2.exec(gradeBlock)) !== null) {
    questions.push(m[1].toLowerCase().trim());
  }
  return questions;
}

function extractAssessmentRubricProficient(source, grade) {
  const gradePattern = `'${grade}':\\s*\\{`;
  const gradeStart = source.search(new RegExp(gradePattern));
  if (gradeStart === -1) return [];

  const gradeIdx = GRADE_ORDER[grade];
  let gradeEnd;
  if (gradeIdx < GRADES.length - 1) {
    const nextGrade = GRADES[gradeIdx + 1];
    const nextPattern = `'${nextGrade}':\\s*\\{`;
    gradeEnd = source.search(new RegExp(nextPattern));
    if (gradeEnd === -1) gradeEnd = source.length;
  } else {
    gradeEnd = source.length;
  }

  const gradeBlock = source.substring(gradeStart, gradeEnd);
  const proficients = [];
  const pPattern = /proficient:\s*'([^']*(?:\\'[^']*)*)'/g;
  let m;
  while ((m = pPattern.exec(gradeBlock)) !== null) {
    proficients.push(m[1]);
  }
  // Also try double-quoted
  const pPattern2 = /proficient:\s*"([^"]*(?:\\"[^"]*)*)"/g;
  while ((m = pPattern2.exec(gradeBlock)) !== null) {
    proficients.push(m[1]);
  }
  return proficients;
}

function getFirst50Words(text) {
  return text.split(/\s+/).slice(0, 50).join(' ');
}

function tokenizeKeywords(keywords) {
  // Break each keyword phrase into individual meaningful words
  const stopWords = new Set(['for', 'and', 'the', 'a', 'an', 'to', 'in', 'of', 'on', 'with', 'by', 'at', 'is', 'are', 'or']);
  const words = new Set();
  for (const kw of keywords) {
    for (const w of kw.split(/\s+/)) {
      const cleaned = w.replace(/[^a-z0-9-]/g, '');
      if (cleaned.length > 2 && !stopWords.has(cleaned)) {
        words.add(cleaned);
      }
    }
  }
  return words;
}

// ======================================================================
// CHECK 1: Keyword overlap detection
// ======================================================================
function checkKeywordOverlap(source, theme) {
  const results = { pass: true, warnings: [], failures: [] };

  // Collect keywords per grade
  const gradeKeywords = {};
  for (const grade of GRADES) {
    gradeKeywords[grade] = extractSeoKeywords(source, grade);
  }

  // Tokenize each grade's keywords into individual words
  const gradeTokens = {};
  for (const grade of GRADES) {
    gradeTokens[grade] = tokenizeKeywords(gradeKeywords[grade]);
  }

  // Find words appearing in 3+ grades
  const wordGradeCount = {};
  for (const grade of GRADES) {
    for (const word of gradeTokens[grade]) {
      if (!wordGradeCount[word]) wordGradeCount[word] = [];
      wordGradeCount[word].push(grade);
    }
  }

  // Theme-generic words expected to appear in many grades
  const themeGenericWords = new Set([
    theme, `${theme}s`, 'worksheets', 'worksheet', 'printable', 'free', 'grade',
    'pages', 'activities', 'activity', 'ages', 'kids', 'children',
    'animal', 'animals', 'pet', 'pets', 'preschool', 'kindergarten'
  ]);

  for (const [word, grades] of Object.entries(wordGradeCount)) {
    if (grades.length >= 3 && !themeGenericWords.has(word)) {
      const msg = `Word "${word}" appears in ${grades.length} grades: ${grades.join(', ')}`;
      if (grades.length >= 4) {
        results.failures.push(msg);
        results.pass = false;
      } else {
        results.warnings.push(msg);
      }
    }
  }

  // Also check for identical full keyword phrases across grades
  const allPhrases = {};
  for (const grade of GRADES) {
    for (const kw of gradeKeywords[grade]) {
      if (!allPhrases[kw]) allPhrases[kw] = [];
      allPhrases[kw].push(grade);
    }
  }
  for (const [phrase, grades] of Object.entries(allPhrases)) {
    if (grades.length >= 2) {
      results.failures.push(`Identical keyword phrase "${phrase}" in grades: ${grades.join(', ')}`);
      results.pass = false;
    }
  }

  return results;
}

// ======================================================================
// CHECK 2: Intro uniqueness (first 50 words must differ)
// ======================================================================
function checkIntroUniqueness(source, theme) {
  const results = { pass: true, warnings: [], failures: [] };

  const intros = {};
  for (const grade of GRADES) {
    const intro = extractIntro(source, grade);
    intros[grade] = getFirst50Words(intro);
  }

  // Compare all pairs
  for (let i = 0; i < GRADES.length; i++) {
    for (let j = i + 1; j < GRADES.length; j++) {
      if (intros[GRADES[i]] === intros[GRADES[j]]) {
        results.failures.push(`Identical first 50 words in ${GRADES[i]} and ${GRADES[j]}`);
        results.pass = false;
      } else {
        // Check similarity - count shared words
        const wordsA = new Set(intros[GRADES[i]].toLowerCase().split(/\s+/));
        const wordsB = new Set(intros[GRADES[j]].toLowerCase().split(/\s+/));
        let shared = 0;
        for (const w of wordsA) {
          if (wordsB.has(w)) shared++;
        }
        const similarity = shared / Math.max(wordsA.size, wordsB.size);
        if (similarity > 0.7) {
          results.warnings.push(`High intro similarity (${(similarity * 100).toFixed(0)}%) between ${GRADES[i]} and ${GRADES[j]}`);
        }
      }
    }
  }

  return results;
}

// ======================================================================
// CHECK 3: uniqueGradeAngle uniqueness
// ======================================================================
function checkUniqueGradeAngle(source, theme) {
  const results = { pass: true, warnings: [], failures: [] };

  const angles = {};
  for (const grade of GRADES) {
    angles[grade] = extractUniqueGradeAngle(source, grade);
    if (!angles[grade]) {
      results.failures.push(`Missing uniqueGradeAngle for ${grade}`);
      results.pass = false;
    }
  }

  // Check all pairs are distinct
  for (let i = 0; i < GRADES.length; i++) {
    for (let j = i + 1; j < GRADES.length; j++) {
      if (angles[GRADES[i]] && angles[GRADES[j]] && angles[GRADES[i]] === angles[GRADES[j]]) {
        results.failures.push(`Identical uniqueGradeAngle in ${GRADES[i]} and ${GRADES[j]}`);
        results.pass = false;
      }
    }
  }

  // Check that each angle mentions the grade name or age range
  for (const grade of GRADES) {
    if (angles[grade]) {
      const gradeWords = grade.replace('-', ' ').toLowerCase();
      if (!angles[grade].toLowerCase().includes(gradeWords) &&
          !angles[grade].toLowerCase().includes(grade)) {
        results.warnings.push(`uniqueGradeAngle for ${grade} doesn't mention the grade name`);
      }
    }
  }

  return results;
}

// ======================================================================
// CHECK 4: Assessment rubric escalation
// ======================================================================
function checkRubricEscalation(source, theme) {
  const results = { pass: true, warnings: [], failures: [] };

  const gradeProficients = {};
  for (const grade of GRADES) {
    gradeProficients[grade] = extractAssessmentRubricProficient(source, grade);
  }

  // Check that proficient word count generally increases across grades
  const gradeAvgWordCount = {};
  for (const grade of GRADES) {
    const profs = gradeProficients[grade];
    if (profs.length === 0) {
      results.failures.push(`No assessment rubric proficient entries for ${grade}`);
      results.pass = false;
      continue;
    }
    const totalWords = profs.reduce((sum, p) => sum + p.split(/\s+/).length, 0);
    gradeAvgWordCount[grade] = Math.round(totalWords / profs.length);
  }

  // Check escalation: each grade should generally have >= previous grade's word count
  let decreaseCount = 0;
  for (let i = 1; i < GRADES.length; i++) {
    const prev = GRADES[i - 1];
    const curr = GRADES[i];
    if (gradeAvgWordCount[prev] !== undefined && gradeAvgWordCount[curr] !== undefined) {
      if (gradeAvgWordCount[curr] < gradeAvgWordCount[prev] * 0.7) {
        results.warnings.push(`Rubric proficient avg words DECREASED: ${prev} (${gradeAvgWordCount[prev]} words) -> ${curr} (${gradeAvgWordCount[curr]} words)`);
        decreaseCount++;
      }
    }
  }

  if (decreaseCount >= 2) {
    results.failures.push(`Multiple rubric escalation decreases detected (${decreaseCount})`);
    results.pass = false;
  }

  // Report word counts for review
  for (const grade of GRADES) {
    if (gradeAvgWordCount[grade] !== undefined) {
      results.warnings.push(`  ${grade}: avg proficient = ${gradeAvgWordCount[grade]} words (${gradeProficients[grade].length} skills)`);
    }
  }

  return results;
}

// ======================================================================
// CHECK 5: Field completeness
// ======================================================================
function checkFieldCompleteness(source, theme) {
  const results = { pass: true, warnings: [], failures: [] };

  for (const grade of GRADES) {
    const missing = [];
    for (const field of REQUIRED_FIELDS) {
      const value = extractGradeField(source, grade, field);
      if (!value) {
        missing.push(field);
      }
    }
    if (missing.length > 0) {
      results.failures.push(`${grade} missing fields: ${missing.join(', ')}`);
      results.pass = false;
    }
  }

  return results;
}

// ======================================================================
// CHECK 6: FAQ uniqueness across grades
// ======================================================================
function checkFaqUniqueness(source, theme) {
  const results = { pass: true, warnings: [], failures: [] };

  const allQuestions = {};
  for (const grade of GRADES) {
    const questions = extractFaqQuestions(source, grade);
    for (const q of questions) {
      if (!allQuestions[q]) allQuestions[q] = [];
      allQuestions[q].push(grade);
    }
  }

  for (const [question, grades] of Object.entries(allQuestions)) {
    if (grades.length >= 2) {
      const shortQ = question.substring(0, 80) + (question.length > 80 ? '...' : '');
      results.failures.push(`Duplicate FAQ: "${shortQ}" in ${grades.join(', ')}`);
      results.pass = false;
    }
  }

  return results;
}

// ======================================================================
// MAIN
// ======================================================================
function validateTheme(theme) {
  console.log(`\n${BOLD}${CYAN}========================================${RESET}`);
  console.log(`${BOLD}${CYAN}  Validating: ${theme.toUpperCase()}${RESET}`);
  console.log(`${BOLD}${CYAN}========================================${RESET}\n`);

  const source = loadThemeContent(theme);
  if (!source) return false;

  const checks = [
    { name: '1. Keyword Overlap Detection', fn: () => checkKeywordOverlap(source, theme) },
    { name: '2. Intro Uniqueness', fn: () => checkIntroUniqueness(source, theme) },
    { name: '3. UniqueGradeAngle Uniqueness', fn: () => checkUniqueGradeAngle(source, theme) },
    { name: '4. Assessment Rubric Escalation', fn: () => checkRubricEscalation(source, theme) },
    { name: '5. Field Completeness', fn: () => checkFieldCompleteness(source, theme) },
    { name: '6. FAQ Uniqueness', fn: () => checkFaqUniqueness(source, theme) },
  ];

  let allPass = true;

  for (const check of checks) {
    const result = check.fn();
    const status = result.pass ? `${GREEN}PASS${RESET}` : `${RED}FAIL${RESET}`;
    const warnCount = result.warnings.length;
    const failCount = result.failures.length;

    console.log(`${BOLD}${check.name}${RESET}: ${status}` +
      (warnCount > 0 ? ` ${YELLOW}(${warnCount} warnings)${RESET}` : '') +
      (failCount > 0 ? ` ${RED}(${failCount} failures)${RESET}` : ''));

    for (const f of result.failures) {
      console.log(`  ${RED}FAIL: ${f}${RESET}`);
    }
    for (const w of result.warnings) {
      console.log(`  ${YELLOW}WARN: ${w}${RESET}`);
    }

    if (!result.pass) allPass = false;
  }

  console.log(`\n${BOLD}Overall: ${allPass ? `${GREEN}ALL CHECKS PASSED` : `${RED}SOME CHECKS FAILED`}${RESET}\n`);
  return allPass;
}

// Parse CLI arguments
const themes = process.argv.slice(2);
if (themes.length === 0) {
  console.log('Usage: node scripts/validate-cross-grade.js <theme1> [theme2] ...');
  console.log('Example: node scripts/validate-cross-grade.js animals pets');
  process.exit(1);
}

let allThemesPass = true;
for (const theme of themes) {
  if (!validateTheme(theme)) {
    allThemesPass = false;
  }
}

console.log(`\n${BOLD}${CYAN}========================================${RESET}`);
console.log(`${BOLD}Final Result: ${allThemesPass ? `${GREEN}ALL THEMES PASSED` : `${RED}SOME THEMES FAILED`}${RESET}`);
console.log(`${BOLD}${CYAN}========================================${RESET}\n`);

process.exit(allThemesPass ? 0 : 1);
