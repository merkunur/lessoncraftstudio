#!/usr/bin/env node
/**
 * Enriched Theme Content Validator
 *
 * Validates enriched content files against quality requirements:
 * word counts, FAQ uniqueness, app validity, category coverage, etc.
 *
 * Usage:
 *   node scripts/validate-theme-content.js                    # All files
 *   node scripts/validate-theme-content.js --theme animals    # Single theme
 *   node scripts/validate-theme-content.js --locale en        # One locale
 *   node scripts/validate-theme-content.js --strict           # Exit 1 on warnings
 *   node scripts/validate-theme-content.js --json report.json # Save JSON report
 *
 * Part 4 of Landing Page SEO Perfection
 */

const fs = require('fs');
const path = require('path');

// ── Configuration ────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'frontend', 'content', 'themes');

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

const CATEGORIES = ['math', 'literacy', 'visual', 'puzzles'];

// ── Helpers ──────────────────────────────────────────────────────────

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  // Remove TODO markers
  const clean = text.replace(/\/\*\s*TODO[^*]*\*\//g, '').trim();
  if (!clean) return 0;
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function hasTodo(text) {
  if (!text || typeof text !== 'string') return false;
  return text.includes('/* TODO');
}

function wordTrigrams(text) {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const trigrams = new Set();
  for (let i = 0; i < words.length - 2; i++) {
    trigrams.add(`${words[i]} ${words[i+1]} ${words[i+2]}`);
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

// ── Parse a TypeScript content file ──────────────────────────────────

function parseContentFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const src = fs.readFileSync(filePath, 'utf8');

  // We can't eval TypeScript, so we parse key fields with regex
  const result = {
    raw: src,
    exists: true,
    hasTodoMarkers: src.includes('/* TODO'),
  };

  // Extract string fields
  const stringFields = ['name', 'title', 'description', 'keywords', 'heading',
                        'intro', 'educationalOverview', 'parentGuide'];
  for (const field of stringFields) {
    // Match field: 'value' or field: `value` — handle multi-line and escaped quotes
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

  // Extract appCategories
  const catSection = src.match(/appCategories:\s*\[([\s\S]*?)\],\n/);
  result.appCategories = [];
  if (catSection) {
    const catRe = /category:\s*'(\w+)'/g;
    let m;
    while ((m = catRe.exec(catSection[1])) !== null) {
      result.appCategories.push(m[1]);
    }
  }

  // Extract teaching tips (count objects in the array)
  const tipsSection = src.match(/teachingTips:\s*\[([\s\S]*?)\],\n/);
  result.teachingTipCount = 0;
  result.teachingTipsValid = true;
  if (tipsSection) {
    const tipBlocks = tipsSection[1].match(/\{[\s\S]*?title:[\s\S]*?description:[\s\S]*?audience:[\s\S]*?\}/g);
    result.teachingTipCount = tipBlocks ? tipBlocks.length : 0;
    // Check each tip has required fields
    if (tipBlocks) {
      for (const block of tipBlocks) {
        if (!block.includes('title:') || !block.includes('description:') || !block.includes('audience:')) {
          result.teachingTipsValid = false;
        }
      }
    }
  }

  // Extract activities count — match from 'activities:' to 'curriculumAlignment:'
  const actSection = src.match(/activities:\s*\[([\s\S]*?)\],\n\s*curriculumAlignment:/);
  result.activityCount = 0;
  result.activitiesValid = true;
  if (actSection) {
    const actBlocks = actSection[1].match(/\{\s*\n\s*title:/g);
    result.activityCount = actBlocks ? actBlocks.length : 0;
    // Also check for inline activities like { title: ..., description: ... }
    if (result.activityCount === 0) {
      const inlineBlocks = actSection[1].match(/\{[^}]*title:[^}]*description:[^}]*\}/g);
      result.activityCount = inlineBlocks ? inlineBlocks.length : 0;
    }
    // Validate each has required fields
    const fullBlocks = actSection[1].match(/\{[\s\S]*?skillAreas:[\s\S]*?\}/g);
    if (fullBlocks) {
      result.activityCount = fullBlocks.length;
      for (const block of fullBlocks) {
        const hasAll = block.includes('title:') && block.includes('description:') &&
                       block.includes('materials:') && block.includes('duration:') &&
                       block.includes('skillAreas:');
        if (!hasAll) result.activitiesValid = false;
      }
    }
  }

  // Extract FAQ entries — match top-level faq (preceded by // -- FAQ comment)
  // Use the section between '// -- FAQ' and '// -- Cross-linking' comments
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

  // Extract curriculumAlignment count — match until gradeContent section
  const alignSection = src.match(/curriculumAlignment:\s*\[([\s\S]*?)\],\n\n\s*\/\/ -- Grade/);
  result.curriculumAlignmentCount = 0;
  if (alignSection) {
    const stdBlocks = alignSection[1].match(/standard:\s*'/g);
    result.curriculumAlignmentCount = stdBlocks ? stdBlocks.length : 0;
  }

  // Check for gradeContent
  result.hasGradeContent = src.includes('gradeContent:') && !src.match(/gradeContent:\s*\{\s*\}/);

  return result;
}

// ── Validation checks ────────────────────────────────────────────────

function validateFile(themeId, locale, parsed) {
  const checks = [];

  // Check 1: Word counts
  const introWords = countWords(parsed.intro);
  checks.push({
    name: 'intro-word-count',
    status: hasTodo(parsed.intro) ? 'warn' : introWords >= 300 ? 'pass' : introWords >= 200 ? 'warn' : 'fail',
    detail: `${introWords} words (min 300)`,
  });

  const overviewWords = countWords(parsed.educationalOverview);
  checks.push({
    name: 'overview-word-count',
    status: hasTodo(parsed.educationalOverview) ? 'warn' : overviewWords >= 200 ? 'pass' : overviewWords >= 100 ? 'warn' : 'fail',
    detail: `${overviewWords} words (min 200)`,
  });

  const parentWords = countWords(parsed.parentGuide);
  checks.push({
    name: 'parent-guide-words',
    status: hasTodo(parsed.parentGuide) ? 'warn' : parentWords >= 150 ? 'pass' : parentWords >= 80 ? 'warn' : 'fail',
    detail: `${parentWords} words (min 150)`,
  });

  // Check 2: Teaching tips
  checks.push({
    name: 'teaching-tips',
    status: parsed.teachingTipCount >= 3 && parsed.teachingTipCount <= 5 ? 'pass' :
            parsed.teachingTipCount > 0 ? 'warn' : 'fail',
    detail: `${parsed.teachingTipCount} tips (need 3-5)`,
  });

  // Check 3: Activities
  checks.push({
    name: 'activities',
    status: parsed.activityCount >= 3 && parsed.activityCount <= 4 ? 'pass' :
            parsed.activityCount > 0 ? 'warn' : 'fail',
    detail: `${parsed.activityCount} activities (need 3-4)`,
  });

  // Check 4: FAQ count
  const faqCount = parsed.faqEntries.length;
  checks.push({
    name: 'faq-count',
    status: faqCount >= 8 && faqCount <= 10 ? 'pass' : faqCount >= 5 ? 'warn' : 'fail',
    detail: `${faqCount} FAQs (need 8-10)`,
  });

  // Check 5: Valid app IDs
  const invalidApps = parsed.curatedAppIds.filter(id => !ALL_APP_IDS.includes(id));
  checks.push({
    name: 'valid-app-ids',
    status: invalidApps.length === 0 ? 'pass' : 'fail',
    detail: invalidApps.length === 0 ? 'all valid' : `invalid: ${invalidApps.join(', ')}`,
  });

  // Check 6: App count
  const appCount = parsed.curatedAppIds.length;
  checks.push({
    name: 'app-count',
    status: appCount >= 8 && appCount <= 15 ? 'pass' : appCount > 0 ? 'warn' : 'fail',
    detail: `${appCount} apps (need 8-15)`,
  });

  // Check 7: Category coverage
  const missingCats = CATEGORIES.filter(c => !parsed.appCategories.includes(c));
  checks.push({
    name: 'category-coverage',
    status: missingCats.length === 0 ? 'pass' : missingCats.length <= 1 ? 'warn' : 'fail',
    detail: missingCats.length === 0 ? 'all 4 categories' : `missing: ${missingCats.join(', ')}`,
  });

  // Check 8: Related themes
  const rtCount = parsed.relatedThemes.length;
  const invalidRelated = parsed.relatedThemes.filter(t => !ALL_THEME_IDS.includes(t));
  const selfRef = parsed.relatedThemes.includes(themeId);
  checks.push({
    name: 'related-themes',
    status: rtCount >= 5 && rtCount <= 7 && invalidRelated.length === 0 && !selfRef ? 'pass' :
            rtCount > 0 ? 'warn' : 'fail',
    detail: `${rtCount} themes` +
            (invalidRelated.length > 0 ? ` (invalid: ${invalidRelated.join(', ')})` : '') +
            (selfRef ? ' (self-reference!)' : ''),
  });

  // Check 9: TODO detection
  checks.push({
    name: 'todo-markers',
    status: parsed.hasTodoMarkers ? 'warn' : 'pass',
    detail: parsed.hasTodoMarkers ? 'has TODO markers' : 'no TODOs',
  });

  // Check 10: Curriculum alignment
  checks.push({
    name: 'curriculum-alignment',
    status: parsed.curriculumAlignmentCount >= 2 ? 'pass' :
            parsed.curriculumAlignmentCount > 0 ? 'warn' : 'fail',
    detail: `${parsed.curriculumAlignmentCount} standards (min 2)`,
  });

  // Check 11: Grade content (optional but flagged)
  checks.push({
    name: 'grade-content',
    status: parsed.hasGradeContent ? 'pass' : 'warn',
    detail: parsed.hasGradeContent ? 'present' : 'missing',
  });

  return checks;
}

// ── Cross-file validation ────────────────────────────────────────────

function crossValidate(allParsed) {
  const issues = [];

  // FAQ uniqueness: no question in >3 themes
  const questionThemes = {};
  for (const [key, parsed] of Object.entries(allParsed)) {
    if (!parsed) continue;
    for (const q of parsed.faqEntries) {
      if (hasTodo(q)) continue;
      const normalized = q.toLowerCase().trim();
      if (!questionThemes[normalized]) questionThemes[normalized] = [];
      questionThemes[normalized].push(key);
    }
  }
  for (const [question, themes] of Object.entries(questionThemes)) {
    if (themes.length > 3) {
      issues.push({
        type: 'faq-duplicate',
        severity: 'warn',
        detail: `FAQ "${question.substring(0, 60)}..." appears in ${themes.length} themes: ${themes.join(', ')}`,
      });
    }
  }

  // Intro uniqueness: Jaccard similarity on word trigrams
  const introTrigrams = {};
  for (const [key, parsed] of Object.entries(allParsed)) {
    if (!parsed || hasTodo(parsed.intro)) continue;
    introTrigrams[key] = wordTrigrams(parsed.intro);
  }
  const keys = Object.keys(introTrigrams);
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const sim = jaccardSimilarity(introTrigrams[keys[i]], introTrigrams[keys[j]]);
      if (sim > 0.20) {
        issues.push({
          type: 'intro-similarity',
          severity: 'warn',
          detail: `${keys[i]} and ${keys[j]} intros share ${(sim * 100).toFixed(1)}% trigrams (max 20%)`,
        });
      }
    }
  }

  return issues;
}

// ── Display ──────────────────────────────────────────────────────────

const COLORS = {
  pass: '\x1b[32m',   // green
  warn: '\x1b[33m',   // yellow
  fail: '\x1b[31m',   // red
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

function statusIcon(status) {
  switch (status) {
    case 'pass': return `${COLORS.pass}\u2713${COLORS.reset}`;
    case 'warn': return `${COLORS.warn}\u26A0${COLORS.reset}`;
    case 'fail': return `${COLORS.fail}\u2717${COLORS.reset}`;
    default: return '?';
  }
}

function printResults(results, crossIssues) {
  let totalPass = 0, totalWarn = 0, totalFail = 0, totalMissing = 0;

  for (const [key, data] of Object.entries(results)) {
    if (!data.parsed) {
      totalMissing++;
      continue;
    }

    const counts = { pass: 0, warn: 0, fail: 0 };
    for (const check of data.checks) {
      counts[check.status]++;
    }
    totalPass += counts.pass;
    totalWarn += counts.warn;
    totalFail += counts.fail;

    // Only show details if there are issues
    if (counts.fail > 0 || counts.warn > 0) {
      console.log(`\n${COLORS.bold}${key}${COLORS.reset}`);
      for (const check of data.checks) {
        if (check.status !== 'pass') {
          console.log(`  ${statusIcon(check.status)} ${check.name}: ${check.detail}`);
        }
      }
    }
  }

  // Cross-file issues
  if (crossIssues.length > 0) {
    console.log(`\n${COLORS.bold}Cross-file Issues${COLORS.reset}`);
    for (const issue of crossIssues) {
      console.log(`  ${statusIcon(issue.severity)} ${issue.detail}`);
    }
  }

  // Summary
  const totalFiles = Object.keys(results).length;
  const existingFiles = totalFiles - totalMissing;
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${COLORS.bold}Summary${COLORS.reset}`);
  console.log(`  Files checked: ${existingFiles} / ${totalFiles}`);
  console.log(`  ${COLORS.pass}\u2713 Pass: ${totalPass}${COLORS.reset}`);
  console.log(`  ${COLORS.warn}\u26A0 Warn: ${totalWarn}${COLORS.reset}`);
  console.log(`  ${COLORS.fail}\u2717 Fail: ${totalFail}${COLORS.reset}`);
  if (totalMissing > 0) {
    console.log(`  ${COLORS.dim}Missing: ${totalMissing} files${COLORS.reset}`);
  }
  console.log(`  Cross-file issues: ${crossIssues.length}`);

  return { totalPass, totalWarn, totalFail, totalMissing, crossIssues: crossIssues.length };
}

// ── CLI ──────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  let themes = ALL_THEME_IDS;
  let locales = ALL_LOCALES;
  let strict = false;
  let jsonPath = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--theme' && args[i + 1]) {
      themes = [args[++i]];
    } else if (args[i] === '--locale' && args[i + 1]) {
      locales = [args[++i]];
    } else if (args[i] === '--strict') {
      strict = true;
    } else if (args[i] === '--json' && args[i + 1]) {
      jsonPath = args[++i];
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('Usage:');
      console.log('  --theme <id>     Validate specific theme');
      console.log('  --locale <id>    Validate specific locale');
      console.log('  --strict         Exit code 1 on any warning');
      console.log('  --json <path>    Save JSON report');
      process.exit(0);
    }
  }

  console.log(`${COLORS.bold}Enriched Theme Content Validator${COLORS.reset}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Checking ${themes.length} themes x ${locales.length} locales`);

  const results = {};
  const allParsed = {};

  for (const themeId of themes) {
    for (const locale of locales) {
      const key = `${themeId}/${locale}`;
      const filePath = path.join(CONTENT_DIR, themeId, `${locale}.ts`);
      const parsed = parseContentFile(filePath);

      if (parsed) {
        const checks = validateFile(themeId, locale, parsed);
        results[key] = { parsed, checks };
        allParsed[key] = parsed;
      } else {
        results[key] = { parsed: null, checks: [] };
      }
    }
  }

  // Cross-file validation
  const crossIssues = crossValidate(allParsed);

  // Print results
  const summary = printResults(results, crossIssues);

  // Save JSON report if requested
  if (jsonPath) {
    const report = {
      timestamp: new Date().toISOString(),
      themes: themes.length,
      locales: locales.length,
      summary,
      results: {},
      crossIssues,
    };
    for (const [key, data] of Object.entries(results)) {
      report.results[key] = {
        exists: data.parsed !== null,
        checks: data.checks,
      };
    }
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`\nJSON report saved to: ${jsonPath}`);
  }

  // Exit code
  if (summary.totalFail > 0) {
    process.exit(1);
  }
  if (strict && (summary.totalWarn > 0 || summary.crossIssues > 0)) {
    process.exit(1);
  }
}

main();
