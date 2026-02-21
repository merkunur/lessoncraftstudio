#!/usr/bin/env node

/**
 * Part 138: Schema Markup Validation (All 250 EN Pages)
 *
 * Validates that every EN theme+grade page has correct, complete data
 * to produce valid JSON-LD schema markup (CollectionPage, FAQPage,
 * LearningResource, BreadcrumbList, WebPage).
 *
 * Checks:
 *  1. gradeContent.faq exists & has 3+ entries                  (ERROR)
 *  2. Every FAQ entry has non-empty question AND answer          (ERROR)
 *  3. gradeContent.objectives exists & has 1+ entries            (ERROR)
 *  4. Every objective has valid area (one of 6 CurriculumArea)   (ERROR)
 *  5. Every objective has non-empty skill string                 (ERROR)
 *  6. gradeContent.intro exists & is 200+ chars                  (ERROR)
 *  7. gradeContent.developmentalNotes exists & non-empty          (ERROR)
 *  8. gradeContent.teachingTips exists & has 2+ entries           (ERROR)
 *  9. gradeContent.seoTitle exists & is 30-70 chars               (WARN)
 * 10. gradeContent.seoDescription exists & is 100-170 chars       (WARN)
 * 11. gradeContent.seoKeywords exists & non-empty                 (WARN)
 * 12. Theme-level faq has 5+ entries                              (WARN)
 * 13. Theme-level curriculumAlignment has 1+ entry                (WARN)
 * 14. No FAQ question duplicates within theme (hub + all grades)  (WARN)
 */

const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.resolve(__dirname, '..', 'frontend', 'content', 'themes');

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

const ALL_GRADE_IDS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
const VALID_AREAS = new Set(['math', 'literacy', 'motor', 'cognitive', 'creative', 'social']);

// ── Helpers ──────────────────────────────────────────────────────────

function resolveEscapes(raw) {
  return raw
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\'/g, "'")
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

/** Extract a brace-balanced block starting from fieldName: { */
function extractBlock(text, fieldName) {
  const pat = new RegExp(`(?:^|[\\s,])${fieldName}\\s*:\\s*\\{`, 'm');
  const m = pat.exec(text);
  if (!m) return null;

  const braceStart = text.indexOf('{', m.index);
  let depth = 0;
  let end = -1;
  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return null;
  return text.slice(braceStart, end + 1);
}

/** Extract a grade block like 'preschool': { ... } from gradeContent */
function extractGradeBlock(gradeContentText, gradeId) {
  // Match 'grade-id': { or "grade-id": {
  const escaped = gradeId.replace('-', '\\-');
  const pat = new RegExp(`['"]${escaped}['"]\\s*:\\s*\\{`);
  const m = pat.exec(gradeContentText);
  if (!m) return null;

  const braceStart = gradeContentText.indexOf('{', m.index);
  let depth = 0;
  let end = -1;
  for (let i = braceStart; i < gradeContentText.length; i++) {
    if (gradeContentText[i] === '{') depth++;
    if (gradeContentText[i] === '}') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return null;
  return gradeContentText.slice(braceStart, end + 1);
}

/** Extract FAQ array: [ { question: '...', answer: '...' }, ... ] */
function extractFaqArray(text) {
  // Find faq: [ ... ]
  const pat = /(?:^|[\s,])faq\s*:\s*\[/m;
  const m = pat.exec(text);
  if (!m) return null;

  const bracketStart = text.indexOf('[', m.index);
  let depth = 0;
  let end = -1;
  for (let i = bracketStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    if (text[i] === ']') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return null;

  const arrStr = text.slice(bracketStart, end + 1);

  // Extract each { question: '...', answer: '...' }
  const entries = [];
  const entryPat = /\{\s*question\s*:\s*(['"])((?:(?!\1)[^\\]|\\.)*)(\1)\s*,\s*answer\s*:\s*(['"])((?:(?!\4)[^\\]|\\.)*)(\4)\s*\}/g;
  let em;
  while ((em = entryPat.exec(arrStr)) !== null) {
    entries.push({
      question: resolveEscapes(em[2]),
      answer: resolveEscapes(em[5]),
    });
  }

  // If regex didn't match (e.g., multi-line answers), try a simpler approach
  if (entries.length === 0) {
    // Count opening braces that likely represent entries
    const simpleCount = (arrStr.match(/question\s*:/g) || []).length;
    if (simpleCount > 0) {
      // Extract question/answer pairs individually
      const qPat = /question\s*:\s*['"]([^]*?)(?:(?<=[^\\])['"])\s*,\s*answer\s*:\s*['"]([^]*?)(?:(?<=[^\\])['"])\s*[,}]/g;
      let qm;
      while ((qm = qPat.exec(arrStr)) !== null) {
        entries.push({
          question: resolveEscapes(qm[1]),
          answer: resolveEscapes(qm[2]),
        });
      }
    }

    // Last resort: just count question fields
    if (entries.length === 0 && simpleCount > 0) {
      // Extract questions and answers separately
      const questions = [];
      const answers = [];
      const qOnlyPat = /question\s*:\s*['"]((?:[^'\\]|\\.|'(?=[^,}\s]))*)['"]/g;
      const aOnlyPat = /answer\s*:\s*['"]((?:[^'\\]|\\.|'(?=[^,}\s]))*)['"]/g;
      let q, a;
      while ((q = qOnlyPat.exec(arrStr)) !== null) questions.push(resolveEscapes(q[1]));
      while ((a = aOnlyPat.exec(arrStr)) !== null) answers.push(resolveEscapes(a[1]));
      for (let i = 0; i < Math.min(questions.length, answers.length); i++) {
        entries.push({ question: questions[i], answer: answers[i] });
      }
    }
  }

  return entries;
}

/** Extract objectives: [ { skill: '...', area: '...' }, ... ] */
function extractObjectives(text) {
  const pat = /(?:^|[\s,])objectives\s*:\s*\[/m;
  const m = pat.exec(text);
  if (!m) return null;

  const bracketStart = text.indexOf('[', m.index);
  let depth = 0;
  let end = -1;
  for (let i = bracketStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    if (text[i] === ']') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return null;

  const arrStr = text.slice(bracketStart, end + 1);
  const entries = [];
  const entryPat = /\{\s*skill\s*:\s*['"]([^'"]+)['"]\s*,\s*area\s*:\s*['"]([^'"]+)['"]\s*\}/g;
  let em;
  while ((em = entryPat.exec(arrStr)) !== null) {
    entries.push({ skill: resolveEscapes(em[1]), area: em[2] });
  }
  return entries;
}

/** Extract a string field value like intro: '...' */
function extractStringField(text, fieldName) {
  // Try single-quoted string first (most common)
  const pat = new RegExp(`(?:^|[\\s,])${fieldName}\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'm');
  const m = pat.exec(text);
  if (m) return resolveEscapes(m[1]);

  // Try double-quoted string
  const pat2 = new RegExp(`(?:^|[\\s,])${fieldName}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'm');
  const m2 = pat2.exec(text);
  if (m2) return resolveEscapes(m2[1]);

  // Try backtick string
  const pat3 = new RegExp(`(?:^|[\\s,])${fieldName}\\s*:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``, 'm');
  const m3 = pat3.exec(text);
  if (m3) return resolveEscapes(m3[1]);

  return null;
}

/** Extract a string array like teachingTips: ['...', '...'] */
function extractStringArray(text, fieldName) {
  const pat = new RegExp(`(?:^|[\\s,])${fieldName}\\s*:\\s*\\[`, 'm');
  const m = pat.exec(text);
  if (!m) return null;

  const bracketStart = text.indexOf('[', m.index);
  let depth = 0;
  let end = -1;
  for (let i = bracketStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    if (text[i] === ']') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return null;

  const arrStr = text.slice(bracketStart, end + 1);
  const items = [];
  const strPat = /['"]([^'"]+)['"]/g;
  let sm;
  while ((sm = strPat.exec(arrStr)) !== null) {
    items.push(resolveEscapes(sm[1]));
  }
  return items;
}

/** Extract curriculumAlignment array count */
function extractCurriculumAlignmentCount(text) {
  const pat = /(?:^|[\s,])curriculumAlignment\s*:\s*\[/m;
  const m = pat.exec(text);
  if (!m) return 0;

  const bracketStart = text.indexOf('[', m.index);
  let depth = 0;
  let end = -1;
  for (let i = bracketStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    if (text[i] === ']') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return 0;

  const arrStr = text.slice(bracketStart, end + 1);
  return (arrStr.match(/standard\s*:/g) || []).length;
}

// ── Main ─────────────────────────────────────────────────────────────

let totalErrors = 0;
let totalWarns = 0;
let totalThemes = 0;
let totalGrades = 0;
let totalFaqEntries = 0;
let totalObjectives = 0;

const errors = [];
const warns = [];

function error(theme, grade, msg) {
  totalErrors++;
  errors.push(`ERROR [${theme}${grade ? '/' + grade : ''}] ${msg}`);
}

function warn(theme, grade, msg) {
  totalWarns++;
  warns.push(`WARN  [${theme}${grade ? '/' + grade : ''}] ${msg}`);
}

for (const theme of ALL_THEME_IDS) {
  const filePath = path.join(THEMES_DIR, theme, 'en.ts');
  if (!fs.existsSync(filePath)) {
    error(theme, null, 'en.ts file not found');
    continue;
  }

  totalThemes++;
  const raw = fs.readFileSync(filePath, 'utf-8');

  // ── Theme-level checks ──

  // Check 12: Theme-level faq has 5+ entries
  const themeFaq = extractFaqArray(raw);
  const themeFaqQuestions = [];
  if (themeFaq) {
    themeFaqQuestions.push(...themeFaq.map(e => e.question.toLowerCase().trim()));
    if (themeFaq.length < 5) {
      warn(theme, null, `Theme-level faq has only ${themeFaq.length} entries (want 5+)`);
    }
  } else {
    warn(theme, null, 'Theme-level faq not found');
  }

  // Check 13: Theme-level curriculumAlignment has 1+ entry
  const caCount = extractCurriculumAlignmentCount(raw);
  if (caCount < 1) {
    warn(theme, null, 'Theme-level curriculumAlignment is empty or missing');
  }

  // ── Grade-level checks ──

  const gradeContentBlock = extractBlock(raw, 'gradeContent');
  if (!gradeContentBlock) {
    error(theme, null, 'gradeContent block not found');
    continue;
  }

  // Collect all FAQ questions across grades for duplicate detection (Check 14)
  const allFaqQuestions = [...themeFaqQuestions];

  for (const grade of ALL_GRADE_IDS) {
    const gradeBlock = extractGradeBlock(gradeContentBlock, grade);
    if (!gradeBlock) {
      error(theme, grade, 'Grade block not found in gradeContent');
      continue;
    }

    totalGrades++;

    // Check 1: faq exists & has 3+ entries
    const faq = extractFaqArray(gradeBlock);
    if (!faq || faq.length === 0) {
      error(theme, grade, 'faq is missing or empty (need 3+)');
    } else if (faq.length < 3) {
      error(theme, grade, `faq has only ${faq.length} entries (need 3+)`);
    } else {
      totalFaqEntries += faq.length;

      // Check 2: Every FAQ has non-empty question AND answer
      for (let i = 0; i < faq.length; i++) {
        if (!faq[i].question || faq[i].question.trim().length === 0) {
          error(theme, grade, `faq[${i}] has empty question`);
        }
        if (!faq[i].answer || faq[i].answer.trim().length === 0) {
          error(theme, grade, `faq[${i}] has empty answer`);
        }
      }

      // Collect for duplicate check
      allFaqQuestions.push(...faq.map(e => e.question.toLowerCase().trim()));
    }

    // Check 3: objectives exists & has 1+ entries
    const objectives = extractObjectives(gradeBlock);
    if (!objectives || objectives.length === 0) {
      error(theme, grade, 'objectives is missing or empty (need 1+)');
    } else {
      totalObjectives += objectives.length;

      for (let i = 0; i < objectives.length; i++) {
        // Check 4: valid area
        if (!VALID_AREAS.has(objectives[i].area)) {
          error(theme, grade, `objectives[${i}] has invalid area '${objectives[i].area}' (valid: ${[...VALID_AREAS].join(', ')})`);
        }
        // Check 5: non-empty skill
        if (!objectives[i].skill || objectives[i].skill.trim().length === 0) {
          error(theme, grade, `objectives[${i}] has empty skill`);
        }
      }
    }

    // Check 6: intro exists & is 200+ chars
    const intro = extractStringField(gradeBlock, 'intro');
    if (!intro) {
      error(theme, grade, 'intro is missing');
    } else if (intro.length < 200) {
      error(theme, grade, `intro is only ${intro.length} chars (need 200+)`);
    }

    // Check 7: developmentalNotes exists & non-empty
    const devNotes = extractStringField(gradeBlock, 'developmentalNotes');
    if (!devNotes || devNotes.trim().length === 0) {
      error(theme, grade, 'developmentalNotes is missing or empty');
    }

    // Check 8: teachingTips exists & has 2+ entries
    const tips = extractStringArray(gradeBlock, 'teachingTips');
    if (!tips || tips.length === 0) {
      error(theme, grade, 'teachingTips is missing or empty (need 2+)');
    } else if (tips.length < 2) {
      error(theme, grade, `teachingTips has only ${tips.length} entries (need 2+)`);
    }

    // Check 9: seoTitle 30-70 chars
    const seoTitle = extractStringField(gradeBlock, 'seoTitle');
    if (!seoTitle) {
      warn(theme, grade, 'seoTitle is missing');
    } else if (seoTitle.length < 30) {
      warn(theme, grade, `seoTitle is only ${seoTitle.length} chars (want 30+)`);
    } else if (seoTitle.length > 70) {
      warn(theme, grade, `seoTitle is ${seoTitle.length} chars (want <=70)`);
    }

    // Check 10: seoDescription 100-170 chars
    const seoDesc = extractStringField(gradeBlock, 'seoDescription');
    if (!seoDesc) {
      warn(theme, grade, 'seoDescription is missing');
    } else if (seoDesc.length < 100) {
      warn(theme, grade, `seoDescription is only ${seoDesc.length} chars (want 100+)`);
    } else if (seoDesc.length > 170) {
      warn(theme, grade, `seoDescription is ${seoDesc.length} chars (want <=170)`);
    }

    // Check 11: seoKeywords exists & non-empty
    const seoKw = extractStringField(gradeBlock, 'seoKeywords');
    if (!seoKw || seoKw.trim().length === 0) {
      warn(theme, grade, 'seoKeywords is missing or empty');
    }
  }

  // Check 14: No FAQ question duplicates within theme
  const seen = new Map();
  for (const q of allFaqQuestions) {
    const normalized = q.replace(/[?.,!]/g, '').replace(/\s+/g, ' ').trim();
    if (seen.has(normalized)) {
      warn(theme, null, `Duplicate FAQ question: "${q.slice(0, 60)}..." (appears in hub + grades)`);
    } else {
      seen.set(normalized, true);
    }
  }
}

// ── Output ───────────────────────────────────────────────────────────

console.log('\n' + '='.repeat(70));
console.log('Part 138: Schema Markup Validation (All 250 EN Pages)');
console.log('='.repeat(70));
console.log(`\nThemes scanned:      ${totalThemes}`);
console.log(`Grade blocks found:  ${totalGrades}`);
console.log(`Total FAQ entries:   ${totalFaqEntries}`);
console.log(`Total objectives:    ${totalObjectives}`);
console.log(`\nErrors: ${totalErrors}`);
console.log(`Warnings: ${totalWarns}`);

if (errors.length > 0) {
  console.log('\n--- ERRORS ---');
  for (const e of errors) console.log(e);
}

if (warns.length > 0) {
  console.log('\n--- WARNINGS ---');
  for (const w of warns) console.log(w);
}

if (totalErrors === 0 && totalWarns === 0) {
  console.log('\nAll 250 pages pass schema markup validation with zero issues.');
}

console.log('\n' + '='.repeat(70));
process.exit(totalErrors > 0 ? 1 : 0);
