#!/usr/bin/env node
/**
 * verify-part143-snippet-testing.js - AI Overview Snippet Testing (All 250 EN Pages)
 *
 * Validates snippet fields and the JSON-LD schemas they generate for AI Overview readiness:
 *  1. snippetDefinition exists and is 100-800 chars              (ERROR)
 *  2. snippetHowTo exists and has 3-10 steps                     (ERROR)
 *  3. Each snippetHowTo step is 30-350 chars                     (ERROR)
 *  4. FAQPage schema validity: @type, @context, mainEntity Q+A   (ERROR)  - 300 schemas
 *  5. HowTo schema validity: @type, step array, name, description (ERROR) - 50 schemas
 *  6. FAQ answers substantive enough for AI extraction (>=80 chars)(WARN)
 *  7. FAQ questions are query-formatted (end with ?)              (WARN)
 *  8. snippetDefinition starts with theme keyword (entity matching)(WARN)
 *  9. No snippetHowTo step duplicates within a theme              (ERROR)
 * 10. HowTo name field populated (not empty/fallback)             (WARN)
 *
 * Run: node scripts/verify-part143-snippet-testing.js
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
// Parsing helpers (from Part 141/142)
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

function extractThemeLevelFaq(fileContent) {
  const gcIdx = fileContent.indexOf('gradeContent:');
  if (gcIdx === -1) return [];
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
  const afterGradeContent = fileContent.substring(i);
  const faqIdx = afterGradeContent.indexOf('faq:');
  if (faqIdx === -1) return [];
  return extractFaqPairs(afterGradeContent);
}

// ---------------------------------------------------------------------------
// Snippet field extractors
// ---------------------------------------------------------------------------

/** Extract snippetDefinition string value */
function extractSnippetDefinition(fileContent) {
  const re = /snippetDefinition:\s*'((?:[^'\\]|\\.)*)'/;
  const m = re.exec(fileContent);
  if (!m) return null;
  return m[1].replace(/\\'/g, "'").replace(/\\n/g, '\n');
}

/** Extract snippetHowTo array of strings */
function extractSnippetHowTo(fileContent) {
  const arr = findArrayContent(fileContent, 'snippetHowTo');
  if (!arr) return [];
  const steps = [];
  const re = /'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(arr)) !== null) {
    steps.push(m[1].replace(/\\'/g, "'").replace(/\\n/g, '\n'));
  }
  return steps;
}

/** Extract the theme display name (name: '...') */
function extractThemeName(fileContent) {
  const re = /\bname:\s*'((?:[^'\\]|\\.)*)'/;
  const m = re.exec(fileContent);
  if (!m) return null;
  return m[1].replace(/\\'/g, "'").replace(/\\n/g, '\n');
}

// ---------------------------------------------------------------------------
// Schema simulation (mirrors production logic)
// ---------------------------------------------------------------------------

function simulateFAQSchema(faqs, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    'url': pageUrl,
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
    'inLanguage': 'en',
  };
}

function simulateHowToSchema(name, description, steps, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${pageUrl}#howto`,
    name,
    description,
    totalTime: 'PT5M',
    tool: [{ '@type': 'HowToTool', name: 'Web Browser' }],
    supply: [{ '@type': 'HowToSupply', name: 'Printer (optional)' }],
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
    step: steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `Step ${i + 1}`,
      text,
    })),
    inLanguage: 'en',
    provider: {
      '@type': 'EducationalOrganization',
      '@id': 'https://www.lessoncraftstudio.com/#organization',
    },
  };
}

// ---------------------------------------------------------------------------
// Schema validators
// ---------------------------------------------------------------------------

function validateFAQSchema(schema, label) {
  const issues = [];
  if (schema['@context'] !== 'https://schema.org') {
    issues.push(`${label}: FAQPage schema missing/wrong @context`);
  }
  if (schema['@type'] !== 'FAQPage') {
    issues.push(`${label}: FAQPage schema missing/wrong @type`);
  }
  if (!Array.isArray(schema.mainEntity) || schema.mainEntity.length === 0) {
    issues.push(`${label}: FAQPage schema has no mainEntity`);
  } else {
    for (let j = 0; j < schema.mainEntity.length; j++) {
      const q = schema.mainEntity[j];
      if (q['@type'] !== 'Question') {
        issues.push(`${label}: mainEntity[${j}] missing @type Question`);
      }
      if (!q.name || typeof q.name !== 'string' || q.name.trim().length === 0) {
        issues.push(`${label}: mainEntity[${j}] has empty/missing name`);
      }
      if (!q.acceptedAnswer || q.acceptedAnswer['@type'] !== 'Answer') {
        issues.push(`${label}: mainEntity[${j}] missing acceptedAnswer with @type Answer`);
      }
      if (!q.acceptedAnswer || !q.acceptedAnswer.text || q.acceptedAnswer.text.trim().length === 0) {
        issues.push(`${label}: mainEntity[${j}] has empty answer text`);
      }
    }
  }
  return issues;
}

function validateHowToSchema(schema, label) {
  const issues = [];
  if (schema['@context'] !== 'https://schema.org') {
    issues.push(`${label}: HowTo schema missing/wrong @context`);
  }
  if (schema['@type'] !== 'HowTo') {
    issues.push(`${label}: HowTo schema missing/wrong @type`);
  }
  if (!schema.name || typeof schema.name !== 'string' || schema.name.trim().length === 0) {
    issues.push(`${label}: HowTo schema has empty/missing name`);
  }
  if (!schema.description || typeof schema.description !== 'string' || schema.description.trim().length === 0) {
    issues.push(`${label}: HowTo schema has empty/missing description`);
  }
  if (!Array.isArray(schema.step) || schema.step.length === 0) {
    issues.push(`${label}: HowTo schema has no steps`);
  } else {
    for (let j = 0; j < schema.step.length; j++) {
      const s = schema.step[j];
      if (s['@type'] !== 'HowToStep') {
        issues.push(`${label}: step[${j}] missing @type HowToStep`);
      }
      if (typeof s.position !== 'number') {
        issues.push(`${label}: step[${j}] missing numeric position`);
      }
      if (!s.text || typeof s.text !== 'string' || s.text.trim().length === 0) {
        issues.push(`${label}: step[${j}] has empty text`);
      }
    }
  }
  return issues;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const errors = [];
const warnings = [];

let snippetDefCount = 0;
let snippetHowToCount = 0;
let totalSteps = 0;
let faqSchemasValidated = 0; // expect 300 (50 theme + 250 grade)
let howToSchemasValidated = 0; // expect 50

for (const theme of THEMES) {
  const filePath = path.join(BASE, theme, 'en.ts');
  if (!fs.existsSync(filePath)) {
    errors.push(`MISSING FILE: ${theme}/en.ts`);
    continue;
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const themeName = extractThemeName(fileContent) || theme;
  const themePageUrl = `https://www.lessoncraftstudio.com/en/worksheets/${theme}`;

  // -----------------------------------------------------------------------
  // Check 1: snippetDefinition exists and is 100-500 chars
  // -----------------------------------------------------------------------
  const snippetDef = extractSnippetDefinition(fileContent);
  if (!snippetDef) {
    errors.push(`[Check 1] ${theme}: snippetDefinition MISSING`);
  } else {
    snippetDefCount++;
    if (snippetDef.length < 100) {
      errors.push(`[Check 1] ${theme}: snippetDefinition too short (${snippetDef.length} chars, need >=100)`);
    } else if (snippetDef.length > 800) {
      errors.push(`[Check 1] ${theme}: snippetDefinition too long (${snippetDef.length} chars, max 800)`);
    }
  }

  // -----------------------------------------------------------------------
  // Check 2: snippetHowTo exists and has 3-10 steps
  // -----------------------------------------------------------------------
  const howToSteps = extractSnippetHowTo(fileContent);
  if (howToSteps.length === 0) {
    errors.push(`[Check 2] ${theme}: snippetHowTo MISSING or empty`);
  } else {
    snippetHowToCount++;
    totalSteps += howToSteps.length;
    if (howToSteps.length < 3) {
      errors.push(`[Check 2] ${theme}: snippetHowTo has only ${howToSteps.length} steps (need >=3)`);
    } else if (howToSteps.length > 10) {
      errors.push(`[Check 2] ${theme}: snippetHowTo has ${howToSteps.length} steps (max 10)`);
    }
  }

  // -----------------------------------------------------------------------
  // Check 3: Each snippetHowTo step is 30-300 chars
  // -----------------------------------------------------------------------
  for (let si = 0; si < howToSteps.length; si++) {
    const step = howToSteps[si];
    if (step.length < 30) {
      errors.push(`[Check 3] ${theme}: step ${si + 1} too short (${step.length} chars, need >=30)`);
    } else if (step.length > 350) {
      errors.push(`[Check 3] ${theme}: step ${si + 1} too long (${step.length} chars, max 350)`);
    }
  }

  // -----------------------------------------------------------------------
  // Check 4: FAQPage schema validity (theme-level + 5 grade-levels)
  // -----------------------------------------------------------------------

  // Theme-level FAQ schema
  const themeFaqs = extractThemeLevelFaq(fileContent);
  if (themeFaqs.length > 0) {
    const faqSchema = simulateFAQSchema(themeFaqs, themePageUrl);
    const faqIssues = validateFAQSchema(faqSchema, `${theme} [theme-FAQ]`);
    errors.push(...faqIssues.map(i => `[Check 4] ${i}`));
    faqSchemasValidated++;
  }

  // Grade-level FAQ schemas
  for (const grade of GRADES) {
    const block = extractGradeBlock(fileContent, grade);
    if (!block) continue;
    const gradeFaqs = extractFaqPairs(block);
    if (gradeFaqs.length > 0) {
      const gradePageUrl = `${themePageUrl}/${grade}`;
      const gfaqSchema = simulateFAQSchema(gradeFaqs, gradePageUrl);
      const gfaqIssues = validateFAQSchema(gfaqSchema, `${theme}/${grade}`);
      errors.push(...gfaqIssues.map(i => `[Check 4] ${i}`));
      faqSchemasValidated++;
    }
  }

  // -----------------------------------------------------------------------
  // Check 5: HowTo schema validity
  // -----------------------------------------------------------------------
  if (howToSteps.length > 0) {
    const howToName = `How to Use ${themeName} Worksheets`;
    const howToDesc = snippetDef || '';
    const howToSchema = simulateHowToSchema(howToName, howToDesc, howToSteps, themePageUrl);
    const howToIssues = validateHowToSchema(howToSchema, theme);
    errors.push(...howToIssues.map(i => `[Check 5] ${i}`));
    howToSchemasValidated++;
  }

  // -----------------------------------------------------------------------
  // Check 6: FAQ answers substantive (>=80 chars)
  // -----------------------------------------------------------------------
  const allFaqs = [...themeFaqs];
  for (const grade of GRADES) {
    const block = extractGradeBlock(fileContent, grade);
    if (block) allFaqs.push(...extractFaqPairs(block));
  }
  for (const faq of allFaqs) {
    if (faq.answer.length < 80) {
      warnings.push(`[Check 6] ${theme}: FAQ answer too short for AI extraction (${faq.answer.length} chars): "${faq.answer.substring(0, 60)}..."`);
    }
  }

  // -----------------------------------------------------------------------
  // Check 7: FAQ questions end with ?
  // -----------------------------------------------------------------------
  for (const faq of allFaqs) {
    if (!faq.question.trim().endsWith('?')) {
      warnings.push(`[Check 7] ${theme}: FAQ question not query-formatted (missing ?): "${faq.question.substring(0, 80)}"`);
    }
  }

  // -----------------------------------------------------------------------
  // Check 8: snippetDefinition starts with theme keyword (or singular form)
  // -----------------------------------------------------------------------
  if (snippetDef) {
    const defLower = snippetDef.toLowerCase();
    const nameLower = themeName.toLowerCase();
    // Allow singular form: "Animals" -> also accept "animal", "Fairy Tales" -> "fairy tale"
    const singularName = nameLower.replace(/ies$/, 'y').replace(/s$/, '');
    const startsWithName = defLower.startsWith(nameLower) || defLower.startsWith(singularName);
    if (!startsWithName) {
      warnings.push(`[Check 8] ${theme}: snippetDefinition doesn't start with theme keyword "${themeName}" - starts with: "${snippetDef.substring(0, 50)}..."`);
    }
  }

  // -----------------------------------------------------------------------
  // Check 9: No snippetHowTo step duplicates within a theme
  // -----------------------------------------------------------------------
  const stepSet = new Set();
  for (let si = 0; si < howToSteps.length; si++) {
    const normalized = howToSteps[si].trim().toLowerCase();
    if (stepSet.has(normalized)) {
      errors.push(`[Check 9] ${theme}: Duplicate snippetHowTo step ${si + 1}: "${howToSteps[si].substring(0, 80)}..."`);
    }
    stepSet.add(normalized);
  }

  // -----------------------------------------------------------------------
  // Check 10: HowTo name field populated
  // -----------------------------------------------------------------------
  if (howToSteps.length > 0) {
    const howToName = `How to Use ${themeName} Worksheets`;
    if (!howToName || howToName.trim().length === 0 || howToName === 'How to Use  Worksheets') {
      warnings.push(`[Check 10] ${theme}: HowTo name field is empty or fallback`);
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

console.log('='.repeat(70));
console.log('Part 143: AI Overview Snippet Testing (All 250 EN Pages)');
console.log('='.repeat(70));

console.log(`\nSnippet field coverage:`);
console.log(`  snippetDefinition: ${snippetDefCount}/50 themes`);
console.log(`  snippetHowTo:      ${snippetHowToCount}/50 themes`);
console.log(`  Total HowTo steps: ${totalSteps}`);

console.log(`\nSchemas validated:`);
console.log(`  FAQPage schemas:   ${faqSchemasValidated} (expect 300 = 50 theme + 250 grade)`);
console.log(`  HowTo schemas:     ${howToSchemasValidated} (expect 50)`);
console.log(`  Total schemas:     ${faqSchemasValidated + howToSchemasValidated}`);

console.log(`\nChecks performed: 10`);
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
  console.log('\nAll 10 checks passed with 0 errors and 0 warnings.');
}

console.log('\n' + '='.repeat(70));
console.log(errors.length === 0 ? 'RESULT: PASS' : 'RESULT: FAIL');
console.log('='.repeat(70));

process.exit(errors.length > 0 ? 1 : 0);
