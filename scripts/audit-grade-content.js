/**
 * Part 23: Comprehensive Grade Content Audit
 * Checks all 50 themes x 5 grades for structural completeness,
 * FAQ uniqueness, curriculum area balance, and intro word counts.
 *
 * Usage: node scripts/audit-grade-content.js
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const THEMES_DIR = path.join(__dirname, '..', 'frontend', 'content', 'themes');
const ALL_GRADES = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
const VALID_AREAS = new Set(['math', 'literacy', 'cognitive', 'motor', 'social', 'creative']);

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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const issues = [];
function addIssue(severity, theme, grade, message) {
  issues.push({ severity, theme: theme || '', grade: grade || '', message });
}

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Parse a theme en.ts file into a plain JS object.
 * Strips TS-specific syntax, then evaluates with Function().
 */
function parseThemeFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');

  let js = raw
    // Remove import lines (including multiline imports)
    .replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    // Remove standalone import type lines
    .replace(/^import\s+type\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    // Remove the type annotation on const
    .replace(/:\s*EnrichedThemeContent\s*=/, ' =')
    // Remove registerThemeContent call
    .replace(/registerThemeContent\([^)]+\);?/g, '')
    // Remove any 'as const' assertions
    .replace(/\bas\s+const\b/g, '')
    .trim();

  // Wrap in a function that returns content
  const fn = new Function(`${js}\nreturn content;`);
  return fn();
}

// ---------------------------------------------------------------------------
// Main audit
// ---------------------------------------------------------------------------

const stats = {
  themesAudited: 0,
  gradesFound: 0,
  totalObjectives: 0,
  totalTips: 0,
  totalFaqs: 0,
};

// Cross-theme tracking
const crossThemeFaqs = {};  // grade -> [{theme, question}]
ALL_GRADES.forEach(g => { crossThemeFaqs[g] = []; });

for (const themeId of ALL_THEME_IDS) {
  const filePath = path.join(THEMES_DIR, themeId, 'en.ts');

  // ---- File existence ----
  if (!fs.existsSync(filePath)) {
    addIssue('ERROR', themeId, null, 'en.ts file not found');
    continue;
  }

  // ---- Parse ----
  let content;
  try {
    content = parseThemeFile(filePath);
  } catch (e) {
    addIssue('ERROR', themeId, null, `Failed to parse: ${e.message}`);
    continue;
  }

  stats.themesAudited++;

  const gc = content.gradeContent;
  if (!gc || typeof gc !== 'object') {
    addIssue('ERROR', themeId, null, 'No gradeContent object found');
    continue;
  }

  // Collect theme-level FAQ questions for overlap check
  const themeFaqQs = (content.faq || []).map(f => f.question.toLowerCase().trim());

  // Collect all grade FAQ questions within this theme for intra-theme uniqueness
  const withinThemeFaqs = []; // [{grade, question}]

  // ---- Check each required grade ----
  for (const grade of ALL_GRADES) {
    if (!gc[grade]) {
      addIssue('ERROR', themeId, grade, 'Grade entry missing');
      continue;
    }

    stats.gradesFound++;
    const g = gc[grade];

    // -- Required fields --
    const requiredFields = ['intro', 'objectives', 'developmentalNotes', 'teachingTips', 'faq'];
    for (const field of requiredFields) {
      if (g[field] === undefined || g[field] === null) {
        addIssue('ERROR', themeId, grade, `Missing required field: ${field}`);
      }
    }

    // -- Intro word count (200+ required) --
    if (g.intro) {
      const wc = countWords(g.intro);
      if (wc < 200) {
        addIssue('WARN', themeId, grade, `Intro is ${wc} words (need 200+)`);
      }
    }

    // -- Objectives: exactly 3 with valid areas --
    if (Array.isArray(g.objectives)) {
      stats.totalObjectives += g.objectives.length;
      if (g.objectives.length !== 3) {
        addIssue('ERROR', themeId, grade, `Has ${g.objectives.length} objectives (need exactly 3)`);
      }

      const areas = [];
      for (const obj of g.objectives) {
        if (!obj.skill || typeof obj.skill !== 'string') {
          addIssue('ERROR', themeId, grade, 'Objective missing "skill" string');
        }
        if (!obj.area || !VALID_AREAS.has(obj.area)) {
          addIssue('ERROR', themeId, grade, `Invalid objective area: "${obj.area}"`);
        }
        areas.push(obj.area);
      }

      // Area balance: not all 3 the same
      if (areas.length === 3 && areas[0] === areas[1] && areas[1] === areas[2]) {
        addIssue('WARN', themeId, grade, `All 3 objectives use same area: ${areas[0]}`);
      }
    }

    // -- Teaching tips: exactly 2 --
    if (Array.isArray(g.teachingTips)) {
      stats.totalTips += g.teachingTips.length;
      if (g.teachingTips.length !== 2) {
        addIssue('ERROR', themeId, grade, `Has ${g.teachingTips.length} teaching tips (need exactly 2)`);
      }
      for (let i = 0; i < g.teachingTips.length; i++) {
        if (typeof g.teachingTips[i] !== 'string' || g.teachingTips[i].length < 20) {
          addIssue('WARN', themeId, grade, `Teaching tip #${i + 1} is too short or not a string`);
        }
      }
    }

    // -- FAQ: exactly 3 --
    if (Array.isArray(g.faq)) {
      stats.totalFaqs += g.faq.length;
      if (g.faq.length !== 3) {
        addIssue('ERROR', themeId, grade, `Has ${g.faq.length} FAQs (need exactly 3)`);
      }

      for (const faqItem of g.faq) {
        if (!faqItem.question || typeof faqItem.question !== 'string') {
          addIssue('ERROR', themeId, grade, 'FAQ item missing "question" string');
        }
        if (!faqItem.answer || typeof faqItem.answer !== 'string') {
          addIssue('ERROR', themeId, grade, 'FAQ item missing "answer" string');
        }

        const q = (faqItem.question || '').toLowerCase().trim();

        // Check overlap with theme-level FAQ
        if (themeFaqQs.includes(q)) {
          addIssue('WARN', themeId, grade, `FAQ duplicates theme-level FAQ: "${(faqItem.question || '').substring(0, 70)}..."`);
        }

        // Track for within-theme uniqueness
        const dup = withinThemeFaqs.find(f => f.question === q);
        if (dup) {
          addIssue('WARN', themeId, grade, `FAQ duplicated from ${dup.grade}: "${(faqItem.question || '').substring(0, 70)}..."`);
        }
        withinThemeFaqs.push({ grade, question: q });

        // Track for cross-theme uniqueness
        crossThemeFaqs[grade].push({ theme: themeId, question: q });
      }
    }

    // -- developmentalNotes: must be a non-empty string --
    if (g.developmentalNotes && typeof g.developmentalNotes === 'string') {
      if (g.developmentalNotes.length < 50) {
        addIssue('WARN', themeId, grade, `developmentalNotes very short (${g.developmentalNotes.length} chars)`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Cross-theme FAQ uniqueness check
// ---------------------------------------------------------------------------

for (const grade of ALL_GRADES) {
  const faqs = crossThemeFaqs[grade];
  const seen = {}; // question -> theme
  for (const { theme, question } of faqs) {
    if (seen[question]) {
      addIssue('WARN', null, grade, `Cross-theme duplicate FAQ: "${question.substring(0, 70)}..." (${seen[question]} vs ${theme})`);
    }
    seen[question] = theme;
  }
}

// ---------------------------------------------------------------------------
// Progressive complexity spot-check (automated heuristic)
// ---------------------------------------------------------------------------

// Check that third-grade intros mention multiplication/division concepts
// and preschool intros mention age-appropriate concepts
for (const themeId of ALL_THEME_IDS) {
  const filePath = path.join(THEMES_DIR, themeId, 'en.ts');
  if (!fs.existsSync(filePath)) continue;
  let content;
  try { content = parseThemeFile(filePath); } catch { continue; }
  const gc = content.gradeContent;
  if (!gc) continue;

  if (gc['preschool'] && gc['preschool'].intro) {
    const intro = gc['preschool'].intro.toLowerCase();
    // Preschool should reference young ages or basic skills
    const hasPreschoolMarkers = /three|four|3|4|preschool|fine motor|tracing|coloring/i.test(intro);
    if (!hasPreschoolMarkers) {
      addIssue('WARN', themeId, 'preschool', 'Intro lacks age-appropriate markers (ages 3-4, tracing, coloring, etc.)');
    }
  }

  if (gc['third-grade'] && gc['third-grade'].intro) {
    const intro = gc['third-grade'].intro.toLowerCase();
    // Third grade should reference advanced skills
    const hasThirdGradeMarkers = /multipl|divid|eight|nine|8|9|third.grade|multi-paragraph|research/i.test(intro);
    if (!hasThirdGradeMarkers) {
      addIssue('WARN', themeId, 'third-grade', 'Intro lacks grade-appropriate markers (multiply, divide, ages 8-9, research, etc.)');
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const HR = '='.repeat(72);

console.log(HR);
console.log('  GRADE CONTENT AUDIT REPORT  -  Part 23');
console.log(HR);

console.log(`
  Themes audited:     ${stats.themesAudited} / 50
  Grades found:       ${stats.gradesFound} / 250
  Total objectives:   ${stats.totalObjectives} / 750
  Total teaching tips: ${stats.totalTips} / 500
  Total FAQs:         ${stats.totalFaqs} / 750
`);

const errors = issues.filter(i => i.severity === 'ERROR');
const warnings = issues.filter(i => i.severity === 'WARN');

console.log(`  Issues: ${issues.length} total (${errors.length} errors, ${warnings.length} warnings)`);

if (errors.length > 0) {
  console.log(`\n${HR}`);
  console.log(`  ERRORS (${errors.length})  -  Must fix`);
  console.log(HR);
  for (const e of errors) {
    const loc = [e.theme, e.grade].filter(Boolean).join('/');
    console.log(`  [${loc}] ${e.message}`);
  }
}

if (warnings.length > 0) {
  console.log(`\n${HR}`);
  console.log(`  WARNINGS (${warnings.length})  -  Review recommended`);
  console.log(HR);
  for (const w of warnings) {
    const loc = [w.theme, w.grade].filter(Boolean).join('/');
    console.log(`  [${loc}] ${w.message}`);
  }
}

if (issues.length === 0) {
  console.log(`\n  ALL CHECKS PASSED - Zero issues found!`);
}

console.log(`\n${HR}`);
console.log('  AUDIT COMPLETE');
console.log(HR);

// Exit with error code if structural errors exist
if (errors.length > 0) {
  process.exit(1);
}
