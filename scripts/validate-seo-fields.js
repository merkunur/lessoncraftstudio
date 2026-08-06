#!/usr/bin/env node
/**
 * SEO Field Validator
 *
 * Validates the Part 1 SEO fields added to EnrichedThemeContent and
 * GradeLearningContent. Checks field presence (WARN if missing) and
 * quality (word counts, valid IDs, format) when populated.
 *
 * Usage:
 *   node scripts/validate-seo-fields.js                        # All files
 *   node scripts/validate-seo-fields.js --theme animals        # Single theme
 *   node scripts/validate-seo-fields.js --locale en            # One locale
 *   node scripts/validate-seo-fields.js --strict               # Exit 1 on warnings
 *   node scripts/validate-seo-fields.js --json report.json     # Save JSON report
 *   node scripts/validate-seo-fields.js --populated-only       # Skip missing-field warns
 *
 * Part 2 of Landing Page SEO Perfection
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

const ALL_GRADE_IDS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];

// ── Helpers ──────────────────────────────────────────────────────────

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  const clean = text.trim();
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

// ── Parse SEO fields from a TypeScript content file ─────────────────

function parseSeoFields(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const src = fs.readFileSync(filePath, 'utf8');

  const result = { raw: src, exists: true };

  // Extract single-quoted string field (handles multi-line, escaped quotes)
  function extractString(fieldName, source) {
    // Try single-quoted value
    const reSingle = new RegExp(`(?:^|\\n)\\s*${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's');
    const m = source.match(reSingle);
    if (m) return m[1];
    // Try backtick-quoted value
    const reBacktick = new RegExp(`(?:^|\\n)\\s*${fieldName}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``, 's');
    const mb = source.match(reBacktick);
    if (mb) return mb[1];
    return null;
  }

  // Extract array of single-quoted strings (e.g., snippetHowTo: ['step1', 'step2'])
  function extractStringArray(fieldName, source) {
    const re = new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\]`, 's');
    const m = source.match(re);
    if (!m) return null;
    const items = [];
    const itemRe = /'((?:[^'\\]|\\.)*)'/g;
    let im;
    while ((im = itemRe.exec(m[1])) !== null) {
      items.push(im[1]);
    }
    return items.length > 0 ? items : null;
  }

  // -- Theme-level SEO fields --
  result.uniqueAngle = extractString('uniqueAngle', src);
  result.researchCitation = extractString('researchCitation', src);
  result.culturalNotes = extractString('culturalNotes', src);
  result.snippetDefinition = extractString('snippetDefinition', src);
  result.snippetHowTo = extractStringArray('snippetHowTo', src);
  result.limitations = extractString('limitations', src);

  // -- productLinks: array of objects with appId, anchorText, context --
  const plSection = src.match(/productLinks:\s*\[([\s\S]*?)\],?\n/);
  result.productLinks = null;
  if (plSection) {
    const links = [];
    const appIdRe = /appId:\s*'([\w-]+)'/g;
    const anchorRe = /anchorText:\s*'((?:[^'\\]|\\.)*)'/g;
    let am;
    while ((am = appIdRe.exec(plSection[1])) !== null) {
      links.push({ appId: am[1] });
    }
    let ai = 0;
    while ((am = anchorRe.exec(plSection[1])) !== null) {
      if (links[ai]) links[ai].anchorText = am[1];
      ai++;
    }
    if (links.length > 0) result.productLinks = links;
  }

  // -- themeComparisons: array of objects with vsThemeId, summary --
  const tcSection = src.match(/themeComparisons:\s*\[([\s\S]*?)\],?\n/);
  result.themeComparisons = null;
  if (tcSection) {
    const comps = [];
    const vsRe = /vsThemeId:\s*'([\w-]+)'/g;
    let cm;
    while ((cm = vsRe.exec(tcSection[1])) !== null) {
      comps.push({ vsThemeId: cm[1] });
    }
    if (comps.length > 0) result.themeComparisons = comps;
  }

  // -- Grade-level SEO fields --
  result.gradeFields = {};
  for (const gradeId of ALL_GRADE_IDS) {
    // Find grade block: 'preschool': { ... }
    const gradeRe = new RegExp(`'${gradeId}':\\s*\\{([\\s\\S]*?)\\n    \\}`, 's');
    const gm = src.match(gradeRe);
    if (!gm) continue;
    const gradeBlock = gm[1];

    result.gradeFields[gradeId] = {
      heading: extractString('heading', gradeBlock),
      uniqueSummary: extractString('uniqueSummary', gradeBlock),
      snippetAnswer: extractString('snippetAnswer', gradeBlock),
      developmentalMilestone: extractString('developmentalMilestone', gradeBlock),
      worksheetSuggestions: null,
    };

    // worksheetSuggestions: array of { title, description, appId }
    const wsSection = gradeBlock.match(/worksheetSuggestions:\s*\[([\s\S]*?)\]/);
    if (wsSection) {
      const suggestions = [];
      const wsAppRe = /appId:\s*'([\w-]+)'/g;
      let wm;
      while ((wm = wsAppRe.exec(wsSection[1])) !== null) {
        suggestions.push({ appId: wm[1] });
      }
      if (suggestions.length > 0) {
        result.gradeFields[gradeId].worksheetSuggestions = suggestions;
      }
    }
  }

  return result;
}

// ── Per-file validation ─────────────────────────────────────────────

function validateThemeSeoFields(parsed, themeId, locale, populatedOnly) {
  const checks = [];

  function check(name, field, presenceMsg, qualityFn) {
    if (field == null) {
      if (!populatedOnly) {
        checks.push({ name, status: 'warn', detail: presenceMsg });
      }
      return;
    }
    qualityFn(field);
  }

  // uniqueAngle
  check('uniqueAngle', parsed.uniqueAngle, 'missing (will be added in Parts 31+)', (val) => {
    const words = countWords(val);
    if (words < 150) {
      checks.push({ name: 'uniqueAngle', status: 'fail', detail: `${words} words (min 150, target 200-300)` });
    } else if (words < 200) {
      checks.push({ name: 'uniqueAngle', status: 'warn', detail: `${words} words (target 200-300)` });
    } else {
      checks.push({ name: 'uniqueAngle', status: 'pass', detail: `${words} words` });
    }
  });

  // researchCitation
  check('researchCitation', parsed.researchCitation, 'missing', (val) => {
    if (val.length < 20) {
      checks.push({ name: 'researchCitation', status: 'fail', detail: `${val.length} chars (min 20 — too short to be real)` });
    } else {
      checks.push({ name: 'researchCitation', status: 'pass', detail: `${val.length} chars` });
    }
  });

  // culturalNotes (skip for EN)
  if (locale === 'en') {
    if (!populatedOnly) {
      checks.push({ name: 'culturalNotes', status: 'pass', detail: 'skipped for EN' });
    }
  } else {
    check('culturalNotes', parsed.culturalNotes, 'missing (expected for non-EN)', (val) => {
      if (val.length < 30) {
        checks.push({ name: 'culturalNotes', status: 'fail', detail: `${val.length} chars (min 30)` });
      } else {
        checks.push({ name: 'culturalNotes', status: 'pass', detail: `${val.length} chars` });
      }
    });
  }

  // snippetDefinition
  check('snippetDefinition', parsed.snippetDefinition, 'missing', (val) => {
    const words = countWords(val);
    if (words < 20) {
      checks.push({ name: 'snippetDefinition', status: 'fail', detail: `${words} words (min 20)` });
    } else if (words > 80) {
      checks.push({ name: 'snippetDefinition', status: 'fail', detail: `${words} words (max 80 — keep to 2-3 sentences)` });
    } else {
      checks.push({ name: 'snippetDefinition', status: 'pass', detail: `${words} words` });
    }
  });

  // snippetHowTo
  check('snippetHowTo', parsed.snippetHowTo, 'missing', (val) => {
    if (val.length < 3) {
      checks.push({ name: 'snippetHowTo', status: 'fail', detail: `${val.length} steps (min 3)` });
    } else if (val.length > 10) {
      checks.push({ name: 'snippetHowTo', status: 'fail', detail: `${val.length} steps (max 10)` });
    } else {
      const shortSteps = val.filter(s => s.length < 10);
      if (shortSteps.length > 0) {
        checks.push({ name: 'snippetHowTo', status: 'warn', detail: `${val.length} steps, ${shortSteps.length} under 10 chars` });
      } else {
        checks.push({ name: 'snippetHowTo', status: 'pass', detail: `${val.length} steps` });
      }
    }
  });

  // productLinks
  check('productLinks', parsed.productLinks, 'missing', (val) => {
    const invalidApps = val.filter(l => !ALL_APP_IDS.includes(l.appId));
    if (invalidApps.length > 0) {
      checks.push({ name: 'productLinks', status: 'fail', detail: `invalid appId: ${invalidApps.map(l => l.appId).join(', ')}` });
    } else if (val.length < 2) {
      checks.push({ name: 'productLinks', status: 'warn', detail: `${val.length} link(s) (recommend 2+)` });
    } else {
      checks.push({ name: 'productLinks', status: 'pass', detail: `${val.length} links` });
    }
  });

  // themeComparisons
  check('themeComparisons', parsed.themeComparisons, 'missing', (val) => {
    const invalidThemes = val.filter(c => !ALL_THEME_IDS.includes(c.vsThemeId));
    const selfRef = val.filter(c => c.vsThemeId === themeId);
    if (invalidThemes.length > 0) {
      checks.push({ name: 'themeComparisons', status: 'fail', detail: `invalid vsThemeId: ${invalidThemes.map(c => c.vsThemeId).join(', ')}` });
    } else if (selfRef.length > 0) {
      checks.push({ name: 'themeComparisons', status: 'fail', detail: 'compares theme to itself' });
    } else if (val.length < 1) {
      checks.push({ name: 'themeComparisons', status: 'warn', detail: 'empty array (need at least 1)' });
    } else {
      checks.push({ name: 'themeComparisons', status: 'pass', detail: `${val.length} comparison(s)` });
    }
  });

  // limitations
  check('limitations', parsed.limitations, 'missing', (val) => {
    if (val.length < 30) {
      checks.push({ name: 'limitations', status: 'fail', detail: `${val.length} chars (min 30 — must be substantive)` });
    } else {
      checks.push({ name: 'limitations', status: 'pass', detail: `${val.length} chars` });
    }
  });

  return checks;
}

function validateGradeSeoFields(gradeFields, themeId, locale, populatedOnly) {
  const checks = [];

  for (const gradeId of ALL_GRADE_IDS) {
    const gf = gradeFields[gradeId];
    if (!gf) continue; // grade block doesn't exist in this file

    const prefix = `grade:${gradeId}`;

    function check(name, field, presenceMsg, qualityFn) {
      const fullName = `${prefix}/${name}`;
      if (field == null) {
        if (!populatedOnly) {
          checks.push({ name: fullName, status: 'warn', detail: presenceMsg });
        }
        return;
      }
      qualityFn(field);
    }

    // heading
    check('heading', gf.heading, 'missing', (val) => {
      if (val.length < 10) {
        checks.push({ name: `${prefix}/heading`, status: 'fail', detail: `${val.length} chars (min 10)` });
      } else if (val.length > 100) {
        checks.push({ name: `${prefix}/heading`, status: 'fail', detail: `${val.length} chars (max 100)` });
      } else {
        checks.push({ name: `${prefix}/heading`, status: 'pass', detail: `${val.length} chars` });
      }
    });

    // uniqueSummary
    check('uniqueSummary', gf.uniqueSummary, 'missing', (val) => {
      const words = countWords(val);
      if (words < 30) {
        checks.push({ name: `${prefix}/uniqueSummary`, status: 'fail', detail: `${words} words (min 30)` });
      } else if (words > 80) {
        checks.push({ name: `${prefix}/uniqueSummary`, status: 'fail', detail: `${words} words (max 80)` });
      } else {
        checks.push({ name: `${prefix}/uniqueSummary`, status: 'pass', detail: `${words} words` });
      }
    });

    // snippetAnswer
    check('snippetAnswer', gf.snippetAnswer, 'missing', (val) => {
      const words = countWords(val);
      if (words < 15) {
        checks.push({ name: `${prefix}/snippetAnswer`, status: 'fail', detail: `${words} words (min 15)` });
      } else if (words > 60) {
        checks.push({ name: `${prefix}/snippetAnswer`, status: 'fail', detail: `${words} words (max 60)` });
      } else {
        checks.push({ name: `${prefix}/snippetAnswer`, status: 'pass', detail: `${words} words` });
      }
    });

    // worksheetSuggestions
    check('worksheetSuggestions', gf.worksheetSuggestions, 'missing', (val) => {
      const invalidApps = val.filter(s => !ALL_APP_IDS.includes(s.appId));
      if (invalidApps.length > 0) {
        checks.push({ name: `${prefix}/worksheetSuggestions`, status: 'fail', detail: `invalid appId: ${invalidApps.map(s => s.appId).join(', ')}` });
      } else if (val.length < 2) {
        checks.push({ name: `${prefix}/worksheetSuggestions`, status: 'warn', detail: `${val.length} suggestion(s) (recommend 2+)` });
      } else {
        checks.push({ name: `${prefix}/worksheetSuggestions`, status: 'pass', detail: `${val.length} suggestions` });
      }
    });

    // developmentalMilestone
    check('developmentalMilestone', gf.developmentalMilestone, 'missing', (val) => {
      if (val.length < 20) {
        checks.push({ name: `${prefix}/developmentalMilestone`, status: 'fail', detail: `${val.length} chars (min 20)` });
      } else {
        checks.push({ name: `${prefix}/developmentalMilestone`, status: 'pass', detail: `${val.length} chars` });
      }
    });
  }

  return checks;
}

// ── Cross-file validation ───────────────────────────────────────────

function validateUniqueAngleSimilarity(allParsed) {
  const issues = [];
  // Group by locale
  const byLocale = {};
  for (const [key, parsed] of Object.entries(allParsed)) {
    if (!parsed || !parsed.uniqueAngle) continue;
    const locale = key.split('/')[1];
    if (!byLocale[locale]) byLocale[locale] = {};
    byLocale[locale][key] = wordTrigrams(parsed.uniqueAngle);
  }

  for (const [locale, entries] of Object.entries(byLocale)) {
    const keys = Object.keys(entries);
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const sim = jaccardSimilarity(entries[keys[i]], entries[keys[j]]);
        if (sim > 0.15) {
          issues.push({
            type: 'uniqueAngle-similarity',
            severity: 'fail',
            detail: `${keys[i]} and ${keys[j]} uniqueAngles share ${(sim * 100).toFixed(1)}% trigrams (max 15%)`,
          });
        }
      }
    }
  }
  return issues;
}

function validateSnippetDuplication(allParsed) {
  const issues = [];
  // Group by locale, check for substring overlaps >50 chars
  const byLocale = {};
  for (const [key, parsed] of Object.entries(allParsed)) {
    if (!parsed || !parsed.snippetDefinition) continue;
    const locale = key.split('/')[1];
    if (!byLocale[locale]) byLocale[locale] = {};
    byLocale[locale][key] = parsed.snippetDefinition.toLowerCase();
  }

  for (const [locale, entries] of Object.entries(byLocale)) {
    const keys = Object.keys(entries);
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const a = entries[keys[i]];
        const b = entries[keys[j]];
        // Check if any 50-char substring of a appears in b
        if (a.length >= 50 && b.length >= 50) {
          for (let k = 0; k <= a.length - 50; k += 10) {
            const sub = a.substring(k, k + 50);
            if (b.includes(sub)) {
              issues.push({
                type: 'snippetDefinition-duplicate',
                severity: 'fail',
                detail: `${keys[i]} and ${keys[j]} share >50 char substring in snippetDefinition`,
              });
              break; // one match per pair is enough
            }
          }
        }
      }
    }
  }
  return issues;
}

function validateAnchorDiversity(allParsed) {
  const issues = [];
  // Group by locale, count anchorText usage
  const byLocale = {};
  for (const [key, parsed] of Object.entries(allParsed)) {
    if (!parsed || !parsed.productLinks) continue;
    const locale = key.split('/')[1];
    if (!byLocale[locale]) byLocale[locale] = {};
    for (const link of parsed.productLinks) {
      if (!link.anchorText) continue;
      const anchor = link.anchorText.toLowerCase();
      if (!byLocale[locale][anchor]) byLocale[locale][anchor] = [];
      byLocale[locale][anchor].push(key);
    }
  }

  for (const [locale, anchors] of Object.entries(byLocale)) {
    for (const [anchor, themes] of Object.entries(anchors)) {
      if (themes.length > 5) {
        issues.push({
          type: 'anchor-diversity',
          severity: 'warn',
          detail: `[${locale}] anchorText "${anchor}" used in ${themes.length} themes (max 5): ${themes.slice(0, 6).join(', ')}...`,
        });
      }
    }
  }
  return issues;
}

// ── Display ──────────────────────────────────────────────────────────

const COLORS = {
  pass: '\x1b[32m',
  warn: '\x1b[33m',
  fail: '\x1b[31m',
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

    const allChecks = [...data.themeChecks, ...data.gradeChecks];
    if (allChecks.length === 0) continue;

    const counts = { pass: 0, warn: 0, fail: 0 };
    for (const check of allChecks) {
      counts[check.status]++;
    }
    totalPass += counts.pass;
    totalWarn += counts.warn;
    totalFail += counts.fail;

    // Only show details if there are issues
    if (counts.fail > 0 || counts.warn > 0) {
      console.log(`\n${COLORS.bold}${key}${COLORS.reset}`);
      for (const check of allChecks) {
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
  let populatedOnly = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--theme' && args[i + 1]) {
      themes = [args[++i]];
    } else if (args[i] === '--locale' && args[i + 1]) {
      locales = [args[++i]];
    } else if (args[i] === '--strict') {
      strict = true;
    } else if (args[i] === '--json' && args[i + 1]) {
      jsonPath = args[++i];
    } else if (args[i] === '--populated-only') {
      populatedOnly = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('SEO Field Validator (Part 2)');
      console.log('');
      console.log('Usage:');
      console.log('  --theme <id>       Validate specific theme');
      console.log('  --locale <id>      Validate specific locale');
      console.log('  --strict           Exit code 1 on any warning');
      console.log('  --json <path>      Save JSON report');
      console.log('  --populated-only   Only check quality of populated fields');
      process.exit(0);
    }
  }

  console.log(`${COLORS.bold}SEO Field Validator${COLORS.reset}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Checking ${themes.length} themes x ${locales.length} locales`);
  if (populatedOnly) console.log(`Mode: populated-only (skipping missing-field warnings)`);

  const results = {};
  const allParsed = {};

  for (const themeId of themes) {
    for (const locale of locales) {
      const key = `${themeId}/${locale}`;
      const filePath = path.join(CONTENT_DIR, themeId, `${locale}.ts`);
      const parsed = parseSeoFields(filePath);

      if (parsed) {
        const themeChecks = validateThemeSeoFields(parsed, themeId, locale, populatedOnly);
        const gradeChecks = validateGradeSeoFields(parsed.gradeFields, themeId, locale, populatedOnly);
        results[key] = { parsed, themeChecks, gradeChecks };
        allParsed[key] = parsed;
      } else {
        results[key] = { parsed: null, themeChecks: [], gradeChecks: [] };
      }
    }
  }

  // Cross-file validation
  const crossIssues = [
    ...validateUniqueAngleSimilarity(allParsed),
    ...validateSnippetDuplication(allParsed),
    ...validateAnchorDiversity(allParsed),
  ];

  // Print results
  const summary = printResults(results, crossIssues);

  // Save JSON report if requested
  if (jsonPath) {
    const report = {
      timestamp: new Date().toISOString(),
      themes: themes.length,
      locales: locales.length,
      populatedOnly,
      summary,
      results: {},
      crossIssues,
    };
    for (const [key, data] of Object.entries(results)) {
      report.results[key] = {
        exists: data.parsed !== null,
        themeChecks: data.themeChecks,
        gradeChecks: data.gradeChecks,
      };
    }
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`\nJSON report saved to: ${jsonPath}`);
  }

  // Exit code
  if (summary.totalFail > 0 || crossIssues.some(i => i.severity === 'fail')) {
    process.exit(1);
  }
  if (strict && (summary.totalWarn > 0 || summary.crossIssues > 0)) {
    process.exit(1);
  }
}

main();
