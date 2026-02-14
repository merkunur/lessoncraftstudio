#!/usr/bin/env node
/**
 * Doorway Page Elimination Audit
 *
 * Validates all 9 doorway-page-elimination checks to ensure no two theme
 * or grade pages are substantively identical (Google doorway page penalty).
 *
 * Usage:
 *   node scripts/audit-doorway-page-elimination.js
 *   node scripts/audit-doorway-page-elimination.js --json doorway-audit-report.json
 *   node scripts/audit-doorway-page-elimination.js --verbose
 *
 * Part 46 of Landing Page SEO Perfection
 */

const fs = require('fs');
const path = require('path');

// ── Configuration ────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'frontend', 'content', 'themes');
const THEME_PAGE_TSX = path.join(ROOT, 'frontend', 'app', '[locale]', 'worksheets', '[theme]', 'page.tsx');
const GRADE_PAGE_TSX = path.join(ROOT, 'frontend', 'app', '[locale]', 'worksheets', '[theme]', '[grade]', 'page.tsx');

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

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

const ALL_APP_IDS = [
  'image-addition', 'math-worksheet', 'chart-count-color', 'code-addition',
  'math-puzzle', 'more-less', 'subtraction', 'alphabet-train',
  'word-scramble', 'prepositions', 'writing-app', 'word-search',
  'image-crossword', 'word-guess', 'coloring', 'draw-and-color',
  'sudoku', 'image-cryptogram', 'odd-one-out', 'picture-path',
  'find-and-count', 'find-objects', 'missing-pieces', 'matching-app',
  'grid-match', 'shadow-match', 'picture-sort', 'drawing-lines',
  'pattern-train', 'pattern-worksheet', 'picture-bingo', 'big-small-app',
  'treasure-hunt',
];

const GRADE_IDS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

// ── Helpers (from validate-theme-content.js) ─────────────────────────

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  const clean = text.replace(/\/\*\s*TODO[^*]*\*\//g, '').trim();
  if (!clean) return 0;
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function wordTrigrams(text) {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const trigrams = new Set();
  for (let i = 0; i < words.length - 2; i++) {
    trigrams.add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  return trigrams;
}

function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function setJaccard(arrA, arrB) {
  const a = new Set(arrA);
  const b = new Set(arrB);
  return jaccardSimilarity(a, b);
}

function setsIdentical(arrA, arrB) {
  if (arrA.length !== arrB.length) return false;
  const a = new Set(arrA);
  return arrB.every(item => a.has(item));
}

// ── Parse a TypeScript content file ──────────────────────────────────

function parseContentFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const src = fs.readFileSync(filePath, 'utf8');

  const result = {
    raw: src,
    exists: true,
  };

  // Extract string fields
  const stringFields = ['name', 'title', 'description', 'keywords', 'heading',
    'intro', 'educationalOverview', 'parentGuide'];
  for (const field of stringFields) {
    const re = new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's');
    const m = src.match(re);
    result[field] = m ? m[1] : '';
  }

  // Extract curatedAppIds array
  const appIdsMatch = src.match(/curatedAppIds:\s*\[([\s\S]*?)\]/);
  if (appIdsMatch) {
    const appRe = /'([\w-]+)'/g;
    result.curatedAppIds = [];
    let m;
    while ((m = appRe.exec(appIdsMatch[1])) !== null) {
      result.curatedAppIds.push(m[1]);
    }
  } else {
    result.curatedAppIds = [];
  }

  // Extract FAQ entries
  const faqSection = src.match(/\/\/ -- FAQ[\s\S]*?\n\s*faq:\s*\[([\s\S]*?)\],\n/);
  result.faqEntries = [];
  if (faqSection) {
    const faqRe = /question:\s*'((?:[^'\\]|\\.)*)'/g;
    let m;
    while ((m = faqRe.exec(faqSection[1])) !== null) {
      result.faqEntries.push(m[1]);
    }
  }

  // Extract relatedThemes
  const relatedMatch = src.match(/relatedThemes:\s*\[([\s\S]*?)\]/);
  result.relatedThemes = [];
  if (relatedMatch) {
    const re = /'([\w-]+)'/g;
    let m;
    while ((m = re.exec(relatedMatch[1])) !== null) {
      result.relatedThemes.push(m[1]);
    }
  }

  // Check for gradeContent and extract grade intros
  result.hasGradeContent = src.includes('gradeContent:') && !src.match(/gradeContent:\s*\{\s*\}/);
  result.gradeIntros = {};
  result.gradeFaqs = {};

  if (result.hasGradeContent) {
    for (const gradeId of GRADE_IDS) {
      // Match grade block: 'preschool': { ... intro: '...', ... }
      // Use a lookahead for the next grade or the closing of gradeContent
      const gradeBlockRe = new RegExp(
        `'${gradeId}':\\s*\\{([\\s\\S]*?)\\n\\s{4}\\}`,
        'm'
      );
      const gradeBlock = src.match(gradeBlockRe);
      if (gradeBlock) {
        // Extract intro from the grade block
        const introRe = /intro:\s*'((?:[^'\\]|\\.)*)'/s;
        const introMatch = gradeBlock[1].match(introRe);
        if (introMatch) {
          result.gradeIntros[gradeId] = introMatch[1];
        }
        // Extract FAQ questions from grade block
        const gradeFaqRe = /question:\s*'((?:[^'\\]|\\.)*)'/g;
        result.gradeFaqs[gradeId] = [];
        let faqM;
        while ((faqM = gradeFaqRe.exec(gradeBlock[1])) !== null) {
          result.gradeFaqs[gradeId].push(faqM[1]);
        }
      }
    }
  }

  return result;
}

// ── Display helpers ──────────────────────────────────────────────────

const COLORS = {
  pass: '\x1b[32m',
  warn: '\x1b[33m',
  fail: '\x1b[31m',
  critical: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

function statusIcon(status) {
  switch (status) {
    case 'PASS': return `${COLORS.pass}\u2713${COLORS.reset}`;
    case 'WARN': return `${COLORS.warn}\u26A0${COLORS.reset}`;
    case 'FAIL': return `${COLORS.fail}\u2717${COLORS.reset}`;
    case 'CRITICAL': return `${COLORS.critical}\u2717\u2717${COLORS.reset}`;
    default: return '?';
  }
}

// ── CHECK 1: App Uniqueness Audit ────────────────────────────────────

function checkAppUniqueness(parsedFiles) {
  const violations = [];
  const themes = Object.entries(parsedFiles).filter(([, p]) => p && p.curatedAppIds.length > 0);

  for (let i = 0; i < themes.length; i++) {
    for (let j = i + 1; j < themes.length; j++) {
      const [idA, pA] = themes[i];
      const [idB, pB] = themes[j];

      if (setsIdentical(pA.curatedAppIds, pB.curatedAppIds)) {
        violations.push({
          severity: 'CRITICAL',
          pair: [idA, idB],
          detail: `${idA} <-> ${idB}: identical app sets (${pA.curatedAppIds.length} apps)`,
          similarity: 1.0,
        });
      } else {
        const sim = setJaccard(pA.curatedAppIds, pB.curatedAppIds);
        if (sim > 0.80) {
          violations.push({
            severity: 'WARN',
            pair: [idA, idB],
            detail: `${idA} <-> ${idB}: app set similarity ${(sim * 100).toFixed(1)}% (threshold: 80%)`,
            similarity: sim,
          });
        }
      }
    }
  }

  const criticalCount = violations.filter(v => v.severity === 'CRITICAL').length;
  let status = 'PASS';
  if (criticalCount > 0) status = 'CRITICAL';
  else if (violations.length > 0) status = 'WARN';

  return {
    status,
    details: `${themes.length} themes checked, ${violations.length} pair issues (${criticalCount} critical)`,
    violations,
  };
}

// ── CHECK 2: Content Uniqueness Audit ────────────────────────────────

function checkContentUniqueness(parsedFiles) {
  const violations = [];
  const introTrigrams = {};

  for (const [id, parsed] of Object.entries(parsedFiles)) {
    if (!parsed || !parsed.intro) continue;
    introTrigrams[id] = wordTrigrams(parsed.intro);
  }

  const keys = Object.keys(introTrigrams);
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const sim = jaccardSimilarity(introTrigrams[keys[i]], introTrigrams[keys[j]]);
      if (sim > 0.20) {
        violations.push({
          severity: sim > 0.50 ? 'FAIL' : 'WARN',
          pair: [keys[i], keys[j]],
          detail: `Intro trigram similarity ${(sim * 100).toFixed(1)}% (threshold: 20%)`,
          similarity: sim,
        });
      }
    }
  }

  const failCount = violations.filter(v => v.severity === 'FAIL').length;
  let status = 'PASS';
  if (failCount > 0) status = 'FAIL';
  else if (violations.length > 0) status = 'WARN';

  return {
    status,
    details: `${keys.length} intros compared, ${violations.length} similarity issues`,
    violations,
  };
}

// ── CHECK 3: FAQ Uniqueness Audit ────────────────────────────────────

function checkFaqUniqueness(parsedFiles) {
  const violations = [];
  const questionThemes = {};

  for (const [themeId, parsed] of Object.entries(parsedFiles)) {
    if (!parsed) continue;
    for (const q of parsed.faqEntries) {
      const normalized = q.toLowerCase().trim();
      if (!questionThemes[normalized]) questionThemes[normalized] = [];
      questionThemes[normalized].push(themeId);
    }
  }

  for (const [question, themes] of Object.entries(questionThemes)) {
    if (themes.length > 3) {
      violations.push({
        severity: themes.length > 5 ? 'FAIL' : 'WARN',
        question: question.substring(0, 80),
        themes,
        count: themes.length,
        detail: `FAQ appears in ${themes.length} themes: ${themes.join(', ')}`,
      });
    }
  }

  const failCount = violations.filter(v => v.severity === 'FAIL').length;
  let status = 'PASS';
  if (failCount > 0) status = 'FAIL';
  else if (violations.length > 0) status = 'WARN';

  return {
    status,
    details: `${Object.keys(questionThemes).length} unique FAQ questions, ${violations.length} duplicates`,
    violations,
  };
}

// ── CHECK 4: Grade Differentiation Audit ─────────────────────────────

function checkGradeDifferentiation(parsedFiles) {
  const violations = [];
  let themesWithGrades = 0;
  let themesWithoutGrades = 0;

  for (const [themeId, parsed] of Object.entries(parsedFiles)) {
    if (!parsed) continue;

    if (!parsed.hasGradeContent || Object.keys(parsed.gradeIntros).length === 0) {
      themesWithoutGrades++;
      violations.push({
        severity: 'WARN',
        theme: themeId,
        detail: `No gradeContent block found`,
      });
      continue;
    }

    themesWithGrades++;
    const parentIntroTrigrams = wordTrigrams(parsed.intro);

    // Compare each grade intro to parent intro
    for (const [gradeId, gradeIntro] of Object.entries(parsed.gradeIntros)) {
      const gradeTrigrams = wordTrigrams(gradeIntro);
      const simToParent = jaccardSimilarity(gradeTrigrams, parentIntroTrigrams);

      if (simToParent > 0.30) {
        violations.push({
          severity: 'FAIL',
          theme: themeId,
          grade: gradeId,
          detail: `Grade intro too similar to parent: ${(simToParent * 100).toFixed(1)}% (threshold: 30%)`,
          similarity: simToParent,
        });
      }
    }

    // Compare sibling grade intros within the same theme
    const gradeIds = Object.keys(parsed.gradeIntros);
    for (let i = 0; i < gradeIds.length; i++) {
      for (let j = i + 1; j < gradeIds.length; j++) {
        const triA = wordTrigrams(parsed.gradeIntros[gradeIds[i]]);
        const triB = wordTrigrams(parsed.gradeIntros[gradeIds[j]]);
        const sim = jaccardSimilarity(triA, triB);

        if (sim > 0.30) {
          violations.push({
            severity: 'FAIL',
            theme: themeId,
            grades: [gradeIds[i], gradeIds[j]],
            detail: `Sibling grade intros too similar: ${(sim * 100).toFixed(1)}% (threshold: 30%)`,
            similarity: sim,
          });
        }
      }
    }
  }

  const failCount = violations.filter(v => v.severity === 'FAIL').length;
  let status = 'PASS';
  if (failCount > 0) status = 'FAIL';
  else if (violations.length > 0) status = 'WARN';

  return {
    status,
    details: `${themesWithGrades} themes with grade content, ${themesWithoutGrades} without, ${failCount} similarity failures`,
    violations,
  };
}

// ── CHECK 5: Word Count Audit ────────────────────────────────────────

function checkWordCounts(parsedFiles) {
  const violations = [];

  for (const [themeId, parsed] of Object.entries(parsedFiles)) {
    if (!parsed) continue;

    // Theme intro word count
    const introWords = countWords(parsed.intro);
    if (introWords < 200) {
      violations.push({
        severity: 'FAIL',
        theme: themeId,
        field: 'intro',
        wordCount: introWords,
        detail: `${themeId}: theme intro ${introWords} words (minimum 300, FAIL below 200)`,
      });
    } else if (introWords < 300) {
      violations.push({
        severity: 'WARN',
        theme: themeId,
        field: 'intro',
        wordCount: introWords,
        detail: `${themeId}: theme intro ${introWords} words (minimum 300)`,
      });
    }

    // Grade-specific intro word counts
    if (parsed.hasGradeContent) {
      for (const [gradeId, gradeIntro] of Object.entries(parsed.gradeIntros)) {
        const gradeWords = countWords(gradeIntro);
        if (gradeWords < 100) {
          violations.push({
            severity: 'FAIL',
            theme: themeId,
            grade: gradeId,
            field: 'gradeIntro',
            wordCount: gradeWords,
            detail: `${themeId}/${gradeId}: grade intro ${gradeWords} words (minimum 200, FAIL below 100)`,
          });
        } else if (gradeWords < 200) {
          violations.push({
            severity: 'WARN',
            theme: themeId,
            grade: gradeId,
            field: 'gradeIntro',
            wordCount: gradeWords,
            detail: `${themeId}/${gradeId}: grade intro ${gradeWords} words (minimum 200)`,
          });
        }
      }
    }
  }

  const failCount = violations.filter(v => v.severity === 'FAIL').length;
  let status = 'PASS';
  if (failCount > 0) status = 'FAIL';
  else if (violations.length > 0) status = 'WARN';

  return {
    status,
    details: `${Object.keys(parsedFiles).length} themes checked, ${violations.length} word count issues`,
    violations,
  };
}

// ── CHECK 6: Template Detection ──────────────────────────────────────

function checkTemplateDetection(parsedFiles) {
  const violations = [];

  // Template patterns to detect
  const templatePatterns = [
    { pattern: /^This theme /i, name: 'starts with "This theme"' },
    { pattern: /^These worksheets /i, name: 'starts with "These worksheets"' },
    { pattern: /^Our \w+ worksheets /i, name: 'generic "Our X worksheets"' },
  ];

  // Collect sentence structures to detect structural duplication
  const sentenceStructures = {};

  for (const [themeId, parsed] of Object.entries(parsedFiles)) {
    if (!parsed) continue;

    const textFields = [
      { name: 'intro', text: parsed.intro },
      { name: 'educationalOverview', text: parsed.educationalOverview },
      { name: 'parentGuide', text: parsed.parentGuide },
    ];

    for (const { name: fieldName, text } of textFields) {
      if (!text) continue;

      // Check template pattern matches
      for (const { pattern, name: patName } of templatePatterns) {
        if (pattern.test(text)) {
          violations.push({
            severity: 'WARN',
            theme: themeId,
            field: fieldName,
            detail: `Template phrase detected: ${patName}`,
          });
        }
      }
    }

    // Extract first sentence structure (replace theme name with [THEME])
    if (parsed.intro && parsed.name) {
      const themeName = parsed.name.toLowerCase();
      const firstSentence = parsed.intro.split('.')[0] || '';
      const normalized = firstSentence.toLowerCase().replace(
        new RegExp(themeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        '[THEME]'
      );
      if (!sentenceStructures[normalized]) sentenceStructures[normalized] = [];
      sentenceStructures[normalized].push(themeId);
    }
  }

  // Flag identical first-sentence structures
  for (const [structure, themes] of Object.entries(sentenceStructures)) {
    if (themes.length > 2) {
      violations.push({
        severity: 'FAIL',
        themes,
        detail: `${themes.length} themes share identical first-sentence structure: "${structure.substring(0, 80)}..."`,
      });
    }
  }

  const failCount = violations.filter(v => v.severity === 'FAIL').length;
  let status = 'PASS';
  if (failCount > 0) status = 'FAIL';
  else if (violations.length > 0) status = 'WARN';

  return {
    status,
    details: `${Object.keys(parsedFiles).length} themes scanned for template phrases, ${violations.length} issues`,
    violations,
  };
}

// ── CHECK 7: Cross-Locale Dedup ──────────────────────────────────────

function checkCrossLocaleDedup(enParsedFiles) {
  const violations = [];
  let comparisons = 0;

  for (const themeId of ALL_THEME_IDS) {
    const enParsed = enParsedFiles[themeId];
    if (!enParsed || !enParsed.intro) continue;

    const enName = (enParsed.name || '').toLowerCase();
    const enIntroNorm = enParsed.intro.toLowerCase().replace(
      new RegExp(enName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
      '[THEME]'
    );
    const enTrigrams = wordTrigrams(enIntroNorm);

    for (const locale of ALL_LOCALES) {
      if (locale === 'en') continue;

      const filePath = path.join(CONTENT_DIR, themeId, `${locale}.ts`);
      const localeParsed = parseContentFile(filePath);
      if (!localeParsed || !localeParsed.intro) continue;

      comparisons++;

      const localeName = (localeParsed.name || '').toLowerCase();
      const localeIntroNorm = localeParsed.intro.toLowerCase().replace(
        new RegExp(localeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        '[THEME]'
      );
      const localeTrigrams = wordTrigrams(localeIntroNorm);

      const sim = jaccardSimilarity(enTrigrams, localeTrigrams);
      if (sim > 0.60) {
        violations.push({
          severity: 'FAIL',
          theme: themeId,
          locale,
          detail: `${locale} intro structurally similar to English: ${(sim * 100).toFixed(1)}% (threshold: 60%)`,
          similarity: sim,
        });
      }
    }
  }

  const failCount = violations.filter(v => v.severity === 'FAIL').length;
  let status = 'PASS';
  if (failCount > 0) status = 'FAIL';
  else if (violations.length > 0) status = 'WARN';

  return {
    status,
    details: `${comparisons} cross-locale comparisons, ${violations.length} structural duplicates`,
    violations,
  };
}

// ── CHECK 8: Dead Link Audit ─────────────────────────────────────────

function checkDeadLinks(parsedFiles) {
  const violations = [];

  for (const [themeId, parsed] of Object.entries(parsedFiles)) {
    if (!parsed) continue;

    // Check relatedThemes point to existing content files
    for (const rtId of parsed.relatedThemes) {
      if (!ALL_THEME_IDS.includes(rtId)) {
        violations.push({
          severity: 'FAIL',
          theme: themeId,
          target: rtId,
          detail: `relatedTheme "${rtId}" is not a valid theme ID`,
        });
        continue;
      }

      const rtFile = path.join(CONTENT_DIR, rtId, 'en.ts');
      if (!fs.existsSync(rtFile)) {
        violations.push({
          severity: 'FAIL',
          theme: themeId,
          target: rtId,
          detail: `relatedTheme "${rtId}" has no content file at ${rtId}/en.ts`,
        });
      }
    }

    // Check self-references
    if (parsed.relatedThemes.includes(themeId)) {
      violations.push({
        severity: 'WARN',
        theme: themeId,
        detail: `relatedThemes contains self-reference`,
      });
    }

    // Check curatedAppIds are valid
    for (const appId of parsed.curatedAppIds) {
      if (!ALL_APP_IDS.includes(appId)) {
        violations.push({
          severity: 'FAIL',
          theme: themeId,
          target: appId,
          detail: `curatedAppId "${appId}" is not a valid app ID`,
        });
      }
    }
  }

  const failCount = violations.filter(v => v.severity === 'FAIL').length;
  let status = 'PASS';
  if (failCount > 0) status = 'FAIL';
  else if (violations.length > 0) status = 'WARN';

  return {
    status,
    details: `${Object.keys(parsedFiles).length} themes checked for dead links, ${violations.length} issues`,
    violations,
  };
}

// ── CHECK 9: Heading Hierarchy ───────────────────────────────────────

function checkHeadingHierarchy() {
  const violations = [];
  const filesToCheck = [
    { path: THEME_PAGE_TSX, label: 'theme/page.tsx' },
    { path: GRADE_PAGE_TSX, label: 'theme/grade/page.tsx' },
  ];

  for (const { path: filePath, label } of filesToCheck) {
    if (!fs.existsSync(filePath)) {
      violations.push({
        severity: 'WARN',
        file: label,
        detail: `File not found: ${filePath}`,
      });
      continue;
    }

    const src = fs.readFileSync(filePath, 'utf8');

    // Find all heading tags (h1, h2, h3, h4) in order of appearance
    const headingRe = /<h([1-4])\b/g;
    const headings = [];
    let m;
    while ((m = headingRe.exec(src)) !== null) {
      headings.push({
        level: parseInt(m[1]),
        position: m.index,
        context: src.substring(m.index, m.index + 80).replace(/\n/g, ' '),
      });
    }

    if (headings.length === 0) {
      violations.push({
        severity: 'WARN',
        file: label,
        detail: `No heading tags found`,
      });
      continue;
    }

    // Check H1 appears first
    if (headings[0].level !== 1) {
      violations.push({
        severity: 'FAIL',
        file: label,
        detail: `First heading is h${headings[0].level}, expected h1`,
      });
    }

    // Count H1s - should be exactly 1
    const h1Count = headings.filter(h => h.level === 1).length;
    if (h1Count !== 1) {
      violations.push({
        severity: h1Count === 0 ? 'FAIL' : 'WARN',
        file: label,
        detail: `Found ${h1Count} h1 tags (expected exactly 1)`,
      });
    }

    // Check hierarchy: no h3 before first h2, no h4 before first h3
    let seenH2 = false;
    let seenH3 = false;
    for (const h of headings) {
      if (h.level === 2) seenH2 = true;
      if (h.level === 3) {
        if (!seenH2) {
          violations.push({
            severity: 'FAIL',
            file: label,
            detail: `h3 appears before any h2: "${h.context.trim()}"`,
          });
        }
        seenH3 = true;
      }
      if (h.level === 4 && !seenH3) {
        violations.push({
          severity: 'FAIL',
          file: label,
          detail: `h4 appears before any h3: "${h.context.trim()}"`,
        });
      }
    }
  }

  const failCount = violations.filter(v => v.severity === 'FAIL').length;
  let status = 'PASS';
  if (failCount > 0) status = 'FAIL';
  else if (violations.length > 0) status = 'WARN';

  return {
    status,
    details: `${filesToCheck.length} page files analyzed, ${violations.length} hierarchy issues`,
    violations,
  };
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  let jsonPath = null;
  let verbose = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--json' && args[i + 1]) {
      jsonPath = args[++i];
    } else if (args[i] === '--verbose' || args[i] === '-v') {
      verbose = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('Doorway Page Elimination Audit');
      console.log('Usage:');
      console.log('  --json <path>    Save JSON report to file');
      console.log('  --verbose, -v    Show all violation details');
      console.log('  --help, -h       Show this help');
      process.exit(0);
    }
  }

  console.log(`${COLORS.bold}Doorway Page Elimination Audit${COLORS.reset}`);
  console.log('='.repeat(60));

  // Parse all English content files
  const enParsed = {};
  let filesFound = 0;
  for (const themeId of ALL_THEME_IDS) {
    const filePath = path.join(CONTENT_DIR, themeId, 'en.ts');
    const parsed = parseContentFile(filePath);
    if (parsed) {
      enParsed[themeId] = parsed;
      filesFound++;
    }
  }
  console.log(`Loaded ${filesFound} / ${ALL_THEME_IDS.length} English content files\n`);

  // Run all 9 checks
  const checks = {};

  console.log(`${COLORS.bold}Running 9 doorway page checks...${COLORS.reset}\n`);

  // Check 1
  checks.appUniqueness = checkAppUniqueness(enParsed);
  console.log(`  ${statusIcon(checks.appUniqueness.status)} Check 1: App Uniqueness — ${checks.appUniqueness.details}`);

  // Check 2
  checks.contentUniqueness = checkContentUniqueness(enParsed);
  console.log(`  ${statusIcon(checks.contentUniqueness.status)} Check 2: Content Uniqueness — ${checks.contentUniqueness.details}`);

  // Check 3
  checks.faqUniqueness = checkFaqUniqueness(enParsed);
  console.log(`  ${statusIcon(checks.faqUniqueness.status)} Check 3: FAQ Uniqueness — ${checks.faqUniqueness.details}`);

  // Check 4
  checks.gradeDifferentiation = checkGradeDifferentiation(enParsed);
  console.log(`  ${statusIcon(checks.gradeDifferentiation.status)} Check 4: Grade Differentiation — ${checks.gradeDifferentiation.details}`);

  // Check 5
  checks.wordCount = checkWordCounts(enParsed);
  console.log(`  ${statusIcon(checks.wordCount.status)} Check 5: Word Count — ${checks.wordCount.details}`);

  // Check 6
  checks.templateDetection = checkTemplateDetection(enParsed);
  console.log(`  ${statusIcon(checks.templateDetection.status)} Check 6: Template Detection — ${checks.templateDetection.details}`);

  // Check 7
  checks.crossLocaleDedup = checkCrossLocaleDedup(enParsed);
  console.log(`  ${statusIcon(checks.crossLocaleDedup.status)} Check 7: Cross-Locale Dedup — ${checks.crossLocaleDedup.details}`);

  // Check 8
  checks.deadLinks = checkDeadLinks(enParsed);
  console.log(`  ${statusIcon(checks.deadLinks.status)} Check 8: Dead Links — ${checks.deadLinks.details}`);

  // Check 9
  checks.headingHierarchy = checkHeadingHierarchy();
  console.log(`  ${statusIcon(checks.headingHierarchy.status)} Check 9: Heading Hierarchy — ${checks.headingHierarchy.details}`);

  // Summary
  let passed = 0, warned = 0, failed = 0, critical = 0;
  for (const check of Object.values(checks)) {
    switch (check.status) {
      case 'PASS': passed++; break;
      case 'WARN': warned++; break;
      case 'FAIL': failed++; break;
      case 'CRITICAL': critical++; break;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`${COLORS.bold}Summary${COLORS.reset}`);
  console.log(`  Total checks: 9`);
  console.log(`  ${COLORS.pass}\u2713 Passed: ${passed}${COLORS.reset}`);
  if (warned > 0) console.log(`  ${COLORS.warn}\u26A0 Warned: ${warned}${COLORS.reset}`);
  if (failed > 0) console.log(`  ${COLORS.fail}\u2717 Failed: ${failed}${COLORS.reset}`);
  if (critical > 0) console.log(`  ${COLORS.critical}\u2717\u2717 Critical: ${critical}${COLORS.reset}`);

  // Verbose: show all violations
  if (verbose) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${COLORS.bold}Violation Details${COLORS.reset}\n`);

    for (const [checkName, check] of Object.entries(checks)) {
      if (check.violations.length === 0) continue;
      console.log(`${COLORS.bold}${checkName}${COLORS.reset} (${check.violations.length} violations):`);
      for (const v of check.violations) {
        console.log(`  ${statusIcon(v.severity)} ${v.detail}`);
      }
      console.log('');
    }
  } else if (failed + critical + warned > 0) {
    console.log(`\n  Run with --verbose to see all violation details`);
  }

  // Build report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalChecks: 9,
      passed,
      warned,
      failed,
      criticalViolations: critical,
    },
    checks,
  };

  // Save JSON report
  if (jsonPath) {
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`\nJSON report saved to: ${jsonPath}`);
  }

  // Exit code
  if (critical > 0 || failed > 0) {
    process.exit(1);
  }
}

main();
