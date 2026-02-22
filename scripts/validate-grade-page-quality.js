#!/usr/bin/env node
/**
 * Part 163: Grade Page Quality Audit
 *
 * Complements existing validators with deeper quality checks across 5 dimensions
 * for all 250 English theme+grade pages (50 themes x 5 grades):
 *
 *   1. Grade-Level SEO Metadata Quality (seoTitle length, seoDescription, seoKeywords)
 *   2. Content Depth Beyond Presence (word counts stricter than Part 162)
 *   3. Cross-Theme Same-Grade Uniqueness (Jaccard trigrams, duplicate FAQs/descriptions)
 *   4. Grade-Appropriate Content Signals (age markers, differentiation coverage)
 *   5. Optional Enrichment Readiness (worksheetSuggestions, uniqueSummary, snippetAnswer)
 *
 * Usage:
 *   node scripts/validate-grade-page-quality.js
 *   node scripts/validate-grade-page-quality.js --all
 *   node scripts/validate-grade-page-quality.js --theme animals
 *   node scripts/validate-grade-page-quality.js --grade preschool
 *   node scripts/validate-grade-page-quality.js --json docs/grade-page-quality-audit.json
 */

const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'frontend', 'content', 'themes');

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

const GRADE_DISPLAY = {
  'preschool': 'Preschool',
  'kindergarten': 'Kindergarten',
  'first-grade': '1st Grade',
  'second-grade': '2nd Grade',
  'third-grade': '3rd Grade',
};

const GRADE_AGES = {
  'preschool': { ages: [3, 4], keywords: ['three', 'four', '3', '4', 'preschool', 'pre-k'] },
  'kindergarten': { ages: [5, 6], keywords: ['five', 'six', '5', '6', 'kindergarten'] },
  'first-grade': { ages: [6, 7], keywords: ['six', 'seven', '6', '7', 'first grade', 'first-grade', '1st grade'] },
  'second-grade': { ages: [7, 8], keywords: ['seven', 'eight', '7', '8', 'second grade', 'second-grade', '2nd grade'] },
  'third-grade': { ages: [8, 9], keywords: ['eight', 'nine', '8', '9', 'third grade', 'third-grade', '3rd grade'] },
};

// ── ANSI Colors ─────────────────────────────────────────────────────────────
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

// ── Helpers ─────────────────────────────────────────────────────────────────

function wordCount(str) {
  if (!str || typeof str !== 'string') return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Parse a theme en.ts file into a plain JS object using eval (proven approach).
 */
function parseThemeFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  let js = raw
    .replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^import\s+type\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/:\s*EnrichedThemeContent\s*=/, ' =')
    .replace(/registerThemeContent\([^)]+\);?/g, '')
    .replace(/\bas\s+const\b/g, '')
    .trim();
  const fn = new Function(`${js}\nreturn content;`);
  return fn();
}

function wordTrigrams(text) {
  if (!text) return new Set();
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

function normalizeQuestion(q) {
  return (q || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

// ── CLI Args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
let filterThemes = null;
let filterGrades = null;
let jsonPath = null;
let showAll = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--theme' && args[i + 1]) {
    filterThemes = [args[++i]];
  } else if (args[i] === '--grade' && args[i + 1]) {
    filterGrades = [args[++i]];
  } else if (args[i] === '--json' && args[i + 1]) {
    jsonPath = args[++i];
  } else if (args[i] === '--all') {
    showAll = true;
  }
}

const themes = filterThemes || ALL_THEME_IDS;
const grades = filterGrades || ALL_GRADE_IDS;

console.log(`\n${BOLD}Part 163 \u2014 Grade Page Quality Audit${RESET}`);
console.log(`Checking ${themes.length} themes \u00d7 ${grades.length} grades = ${themes.length * grades.length} grade pages\n`);

// ── Tracking ────────────────────────────────────────────────────────────────

let totalFails = 0;
let totalWarns = 0;
let totalPasses = 0;

// Cross-theme same-grade aggregation
const perGradeData = {};
for (const g of ALL_GRADE_IDS) {
  perGradeData[g] = {
    intros: [],          // { theme, trigrams }
    seoDescs: [],        // { theme, desc }
    faqQuestions: [],     // { theme, question }
  };
}

const allPageResults = [];

// ── Parse all theme files ───────────────────────────────────────────────────

const parsedContents = {};
for (const themeId of themes) {
  const filePath = path.join(CONTENT_DIR, themeId, 'en.ts');
  if (!fs.existsSync(filePath)) continue;
  try {
    parsedContents[themeId] = parseThemeFile(filePath);
  } catch (e) {
    console.log(`${RED}\u2717${RESET} ${BOLD}${themeId}${RESET} \u2014 PARSE ERROR: ${e.message}`);
    totalFails++;
  }
}

// ── Main Audit Loop ─────────────────────────────────────────────────────────

for (const themeId of themes) {
  const content = parsedContents[themeId];
  if (!content) continue;

  const gc = content.gradeContent;
  if (!gc || typeof gc !== 'object') {
    console.log(`${RED}\u2717${RESET} ${BOLD}${themeId}${RESET} \u2014 No gradeContent object`);
    totalFails++;
    continue;
  }

  for (const gradeId of grades) {
    const g = gc[gradeId];
    if (!g) {
      allPageResults.push({
        theme: themeId, grade: gradeId, missing: true,
        dims: {}, summary: { fails: 1, warns: 0, passes: 0 },
      });
      totalFails++;
      continue;
    }

    let pageFails = 0;
    let pageWarns = 0;
    let pagePasses = 0;
    const dims = {};

    // ═════════════════════════════════════════════════════════════════════════
    // DIMENSION 1: Grade-Level SEO Metadata Quality
    // ═════════════════════════════════════════════════════════════════════════
    const d1 = [];

    // 1a. seoTitle: 40-65 chars, contains grade display name
    const seoTitle = g.seoTitle || '';
    const seoTitleLen = seoTitle.length;
    if (!seoTitle) {
      d1.push({ level: 'FAIL', msg: 'seoTitle: MISSING' });
      pageFails++;
    } else {
      if (seoTitleLen < 40) {
        d1.push({ level: 'FAIL', msg: `seoTitle: ${seoTitleLen} chars (min 40)` });
        pageFails++;
      } else if (seoTitleLen > 65) {
        d1.push({ level: 'WARN', msg: `seoTitle: ${seoTitleLen} chars (target \u226465)` });
        pageWarns++;
      } else {
        pagePasses++;
      }
      // Check grade display name present
      const displayName = GRADE_DISPLAY[gradeId] || gradeId;
      const gradeTerms = [displayName.toLowerCase(), gradeId.replace(/-/g, ' ')];
      const titleLower = seoTitle.toLowerCase();
      const hasGradeName = gradeTerms.some(t => titleLower.includes(t));
      if (!hasGradeName) {
        d1.push({ level: 'WARN', msg: `seoTitle: missing grade name (${displayName})` });
        pageWarns++;
      } else {
        pagePasses++;
      }
    }

    // 1b. seoDescription: 120-170 chars
    const seoDesc = g.seoDescription || '';
    const seoDescLen = seoDesc.length;
    if (!seoDesc) {
      d1.push({ level: 'FAIL', msg: 'seoDescription: MISSING' });
      pageFails++;
    } else {
      if (seoDescLen < 120) {
        d1.push({ level: 'WARN', msg: `seoDescription: ${seoDescLen} chars (target \u2265120)` });
        pageWarns++;
      } else if (seoDescLen > 170) {
        d1.push({ level: 'WARN', msg: `seoDescription: ${seoDescLen} chars (target \u2264170)` });
        pageWarns++;
      } else {
        pagePasses++;
      }
    }

    // 1c. seoKeywords: >=5 unique terms, no exact duplicates of parent theme keywords
    const seoKw = g.seoKeywords || '';
    const kwList = seoKw ? seoKw.split(',').map(k => k.trim().toLowerCase()).filter(Boolean) : [];
    const kwUnique = [...new Set(kwList)];
    if (kwList.length === 0) {
      d1.push({ level: 'FAIL', msg: 'seoKeywords: MISSING' });
      pageFails++;
    } else {
      if (kwUnique.length < 5) {
        d1.push({ level: 'FAIL', msg: `seoKeywords: ${kwUnique.length} unique (min 5)` });
        pageFails++;
      } else {
        pagePasses++;
      }
      // Check for duplicates with parent theme keywords
      const parentKw = (content.keywords || '').split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
      const overlap = kwUnique.filter(k => parentKw.includes(k));
      if (overlap.length > 0) {
        d1.push({ level: 'WARN', msg: `seoKeywords: ${overlap.length} duplicate(s) with parent theme keywords` });
        pageWarns++;
      }
    }

    dims.seo = {
      titleLen: seoTitleLen,
      descLen: seoDescLen,
      kwCount: kwUnique.length,
      issues: d1.map(i => `${i.level}: ${i.msg}`),
    };

    // ═════════════════════════════════════════════════════════════════════════
    // DIMENSION 2: Content Depth Beyond Presence
    // ═════════════════════════════════════════════════════════════════════════
    const d2 = [];

    // 2a. intro: >=250 (PASS), 200-249 (WARN), <200 (FAIL)
    const introWc = wordCount(g.intro);
    if (introWc >= 250) {
      pagePasses++;
    } else if (introWc >= 200) {
      d2.push({ level: 'WARN', msg: `intro: ${introWc} words (target \u2265250)` });
      pageWarns++;
    } else {
      d2.push({ level: 'FAIL', msg: `intro: ${introWc} words (min 200)` });
      pageFails++;
    }

    // 2b. Each FAQ answer: >=40 words (PASS), 25-39 (WARN), <25 (FAIL)
    const faqs = Array.isArray(g.faq) ? g.faq : [];
    let faqShortCount = 0;
    let faqWarnCount = 0;
    for (const f of faqs) {
      const awc = wordCount(f.answer);
      if (awc >= 40) {
        pagePasses++;
      } else if (awc >= 25) {
        faqWarnCount++;
        pageWarns++;
      } else {
        faqShortCount++;
        pageFails++;
      }
    }
    if (faqShortCount > 0) {
      d2.push({ level: 'FAIL', msg: `faq: ${faqShortCount} answer(s) <25 words` });
    }
    if (faqWarnCount > 0) {
      d2.push({ level: 'WARN', msg: `faq: ${faqWarnCount} answer(s) 25-39 words (target \u226540)` });
    }

    // 2c. developmentalNotes: >=60 words
    const devNotesWc = wordCount(g.developmentalNotes);
    if (devNotesWc >= 60) {
      pagePasses++;
    } else {
      d2.push({ level: 'WARN', msg: `developmentalNotes: ${devNotesWc} words (target \u226560)` });
      pageWarns++;
    }

    // 2d. differentiationNotes: >=80 words, must mention both struggling AND advanced
    const diffNotesWc = wordCount(g.differentiationNotes);
    if (diffNotesWc >= 80) {
      pagePasses++;
    } else if (g.differentiationNotes) {
      d2.push({ level: 'WARN', msg: `differentiationNotes: ${diffNotesWc} words (target \u226580)` });
      pageWarns++;
    } else {
      d2.push({ level: 'FAIL', msg: 'differentiationNotes: MISSING' });
      pageFails++;
    }
    if (g.differentiationNotes) {
      const dnLower = g.differentiationNotes.toLowerCase();
      const hasStruggling = /struggl|behind|support|below|difficul|challeng|need.+help/i.test(dnLower);
      const hasAdvanced = /advanced|gifted|ahead|extend|enrich|above|exceed/i.test(dnLower);
      if (!hasStruggling) {
        d2.push({ level: 'WARN', msg: 'differentiationNotes: no mention of struggling/below-level learners' });
        pageWarns++;
      }
      if (!hasAdvanced) {
        d2.push({ level: 'WARN', msg: 'differentiationNotes: no mention of advanced/gifted learners' });
        pageWarns++;
      }
    }

    // 2e. parentTakeaway: >=60 words
    const ptWc = wordCount(g.parentTakeaway);
    if (ptWc >= 60) {
      pagePasses++;
    } else if (g.parentTakeaway) {
      d2.push({ level: 'WARN', msg: `parentTakeaway: ${ptWc} words (target \u226560)` });
      pageWarns++;
    } else {
      d2.push({ level: 'FAIL', msg: 'parentTakeaway: MISSING' });
      pageFails++;
    }

    // 2f. classroomIntegration: >=60 words
    const ciWc = wordCount(g.classroomIntegration);
    if (ciWc >= 60) {
      pagePasses++;
    } else if (g.classroomIntegration) {
      d2.push({ level: 'WARN', msg: `classroomIntegration: ${ciWc} words (target \u226560)` });
      pageWarns++;
    } else {
      d2.push({ level: 'FAIL', msg: 'classroomIntegration: MISSING' });
      pageFails++;
    }

    // 2g. uniqueGradeAngle: >=80 words
    const ugaWc = wordCount(g.uniqueGradeAngle);
    if (ugaWc >= 80) {
      pagePasses++;
    } else if (g.uniqueGradeAngle) {
      d2.push({ level: 'WARN', msg: `uniqueGradeAngle: ${ugaWc} words (target \u226580)` });
      pageWarns++;
    } else {
      d2.push({ level: 'FAIL', msg: 'uniqueGradeAngle: MISSING' });
      pageFails++;
    }

    dims.depth = {
      introWc,
      faqAnswerShort: faqShortCount,
      faqAnswerWarn: faqWarnCount,
      devNotesWc,
      diffNotesWc,
      ptWc,
      ciWc,
      ugaWc,
      issues: d2.map(i => `${i.level}: ${i.msg}`),
    };

    // ═════════════════════════════════════════════════════════════════════════
    // DIMENSION 3: Data collection for Cross-Theme Same-Grade Uniqueness
    // (Analysis done after all pages are processed)
    // ═════════════════════════════════════════════════════════════════════════
    if (g.intro) {
      perGradeData[gradeId].intros.push({
        theme: themeId,
        trigrams: wordTrigrams(g.intro),
      });
    }
    if (seoDesc) {
      perGradeData[gradeId].seoDescs.push({
        theme: themeId,
        desc: seoDesc.toLowerCase().trim(),
      });
    }
    for (const f of faqs) {
      if (f.question) {
        perGradeData[gradeId].faqQuestions.push({
          theme: themeId,
          question: normalizeQuestion(f.question),
          original: f.question,
        });
      }
    }

    // ═════════════════════════════════════════════════════════════════════════
    // DIMENSION 4: Grade-Appropriate Content Signals
    // ═════════════════════════════════════════════════════════════════════════
    const d4 = [];

    // 4a. Intro mentions grade-appropriate age/keyword signals
    if (g.intro) {
      const introLower = g.intro.toLowerCase();
      const gradeInfo = GRADE_AGES[gradeId];
      if (gradeInfo) {
        const hasAgeSignal = gradeInfo.keywords.some(k => introLower.includes(k));
        if (hasAgeSignal) {
          pagePasses++;
        } else {
          d4.push({ level: 'WARN', msg: `intro: no grade-appropriate age/keyword signals (expected: ${gradeInfo.keywords.slice(0, 4).join(', ')})` });
          pageWarns++;
        }
      }
    }

    // 4b. teachingTips: >=2 non-empty strings
    const tips = Array.isArray(g.teachingTips) ? g.teachingTips : [];
    const validTips = tips.filter(t => typeof t === 'string' && t.length >= 20);
    if (validTips.length >= 2) {
      pagePasses++;
    } else {
      d4.push({ level: 'FAIL', msg: `teachingTips: ${validTips.length} valid tips (min 2)` });
      pageFails++;
    }

    // 4c. Preschool-specific: intro mentions play-based or fine motor
    if (gradeId === 'preschool' && g.intro) {
      const introLower = g.intro.toLowerCase();
      const hasPlayMotor = /fine motor|play.based|hands.on|sensory|manipulat|tactile|tracing|coloring/i.test(introLower);
      if (hasPlayMotor) {
        pagePasses++;
      } else {
        d4.push({ level: 'WARN', msg: 'intro: preschool content should mention fine motor/play-based concepts' });
        pageWarns++;
      }
    }

    // 4d. Third-grade: intro mentions advanced academic concepts
    if (gradeId === 'third-grade' && g.intro) {
      const introLower = g.intro.toLowerCase();
      const hasAdvanced = /multipl|divid|research|multi.paragraph|multi.step|complex|critical.think|analy/i.test(introLower);
      if (hasAdvanced) {
        pagePasses++;
      } else {
        d4.push({ level: 'WARN', msg: 'intro: third-grade content should mention multiplication/division/research concepts' });
        pageWarns++;
      }
    }

    dims.signals = {
      validTips: validTips.length,
      issues: d4.map(i => `${i.level}: ${i.msg}`),
    };

    // ═════════════════════════════════════════════════════════════════════════
    // DIMENSION 5: Optional Enrichment Readiness
    // ═════════════════════════════════════════════════════════════════════════
    const d5 = [];

    const hasWorksheetSuggestions = Array.isArray(g.worksheetSuggestions) && g.worksheetSuggestions.length > 0;
    const hasUniqueSummary = !!g.uniqueSummary;
    const hasSnippetAnswer = !!g.snippetAnswer;

    if (!hasWorksheetSuggestions) {
      d5.push({ level: 'WARN', msg: 'worksheetSuggestions: absent (optional enrichment)' });
      pageWarns++;
    } else {
      pagePasses++;
    }
    if (!hasUniqueSummary) {
      d5.push({ level: 'WARN', msg: 'uniqueSummary: absent (optional enrichment)' });
      pageWarns++;
    } else {
      pagePasses++;
    }
    if (!hasSnippetAnswer) {
      d5.push({ level: 'WARN', msg: 'snippetAnswer: absent (optional enrichment)' });
      pageWarns++;
    } else {
      pagePasses++;
    }

    dims.enrichment = {
      hasWorksheetSuggestions,
      hasUniqueSummary,
      hasSnippetAnswer,
      issues: d5.map(i => `${i.level}: ${i.msg}`),
    };

    // ═════════════════════════════════════════════════════════════════════════
    // Accumulate results
    // ═════════════════════════════════════════════════════════════════════════

    allPageResults.push({
      theme: themeId,
      grade: gradeId,
      dims,
      summary: { fails: pageFails, warns: pageWarns, passes: pagePasses },
    });

    totalFails += pageFails;
    totalWarns += pageWarns;
    totalPasses += pagePasses;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// DIMENSION 3: Cross-Theme Same-Grade Uniqueness (post-processing)
// ═════════════════════════════════════════════════════════════════════════════

console.log(`${BOLD}Dimension 3: Cross-Theme Same-Grade Uniqueness${RESET}\n`);

let dim3Fails = 0;
let dim3Warns = 0;
const dim3Details = {};

for (const gradeId of grades) {
  const gd = perGradeData[gradeId];
  if (!gd) continue;

  const gradeName = GRADE_DISPLAY[gradeId] || gradeId;
  const gradeIssues = [];

  // 3a. Intro similarity: Jaccard trigram >20% = WARN, >30% = FAIL
  const intros = gd.intros;
  const introPairs = [];
  for (let i = 0; i < intros.length; i++) {
    for (let j = i + 1; j < intros.length; j++) {
      const sim = jaccardSimilarity(intros[i].trigrams, intros[j].trigrams);
      if (sim > 0.20) {
        introPairs.push({
          a: intros[i].theme,
          b: intros[j].theme,
          sim: Math.round(sim * 100),
        });
      }
    }
  }
  for (const pair of introPairs) {
    if (pair.sim > 30) {
      gradeIssues.push({ level: 'FAIL', msg: `intro similarity: ${pair.a} ~ ${pair.b} = ${pair.sim}%` });
      dim3Fails++;
    } else {
      gradeIssues.push({ level: 'WARN', msg: `intro similarity: ${pair.a} ~ ${pair.b} = ${pair.sim}%` });
      dim3Warns++;
    }
  }

  // 3b. Duplicate FAQ questions across themes within same grade
  const faqMap = {};
  for (const { theme, question, original } of gd.faqQuestions) {
    if (!faqMap[question]) faqMap[question] = [];
    faqMap[question].push(theme);
  }
  for (const [q, ts] of Object.entries(faqMap)) {
    if (ts.length > 1) {
      gradeIssues.push({ level: 'FAIL', msg: `duplicate FAQ across themes: "${q.substring(0, 60)}..." in: ${ts.join(', ')}` });
      dim3Fails++;
    }
  }

  // 3c. Duplicate seoDescriptions across themes within same grade
  const descMap = {};
  for (const { theme, desc } of gd.seoDescs) {
    if (!descMap[desc]) descMap[desc] = [];
    descMap[desc].push(theme);
  }
  for (const [d, ts] of Object.entries(descMap)) {
    if (ts.length > 1) {
      gradeIssues.push({ level: 'FAIL', msg: `duplicate seoDescription: "${d.substring(0, 60)}..." in: ${ts.join(', ')}` });
      dim3Fails++;
    }
  }

  // Also check FAQ question similarity (Jaccard on words >80%)
  const faqEntries = gd.faqQuestions;
  for (let i = 0; i < faqEntries.length; i++) {
    for (let j = i + 1; j < faqEntries.length; j++) {
      if (faqEntries[i].theme === faqEntries[j].theme) continue; // skip within-theme
      if (faqEntries[i].question === faqEntries[j].question) continue; // already caught exact
      const wordsA = new Set(faqEntries[i].question.split(/\s+/).filter(w => w.length > 2));
      const wordsB = new Set(faqEntries[j].question.split(/\s+/).filter(w => w.length > 2));
      const sim = jaccardSimilarity(wordsA, wordsB);
      if (sim > 0.80) {
        gradeIssues.push({
          level: 'WARN',
          msg: `similar FAQ questions (${Math.round(sim * 100)}%): ${faqEntries[i].theme} ~ ${faqEntries[j].theme}`,
        });
        dim3Warns++;
      }
    }
  }

  dim3Details[gradeId] = {
    introPairs: introPairs.length,
    duplicateFaqs: Object.values(faqMap).filter(ts => ts.length > 1).length,
    duplicateDescs: Object.values(descMap).filter(ts => ts.length > 1).length,
    issues: gradeIssues.map(i => `${i.level}: ${i.msg}`),
  };

  if (gradeIssues.length === 0) {
    console.log(`  ${GREEN}\u2713${RESET} ${gradeName}: all cross-theme checks passed`);
  } else {
    const gFails = gradeIssues.filter(i => i.level === 'FAIL').length;
    const gWarns = gradeIssues.filter(i => i.level === 'WARN').length;
    console.log(`  ${gFails > 0 ? RED + '\u2717' : YELLOW + '\u26A0'}${RESET} ${gradeName}: ${gFails}F/${gWarns}W`);
    for (const issue of gradeIssues.slice(0, 10)) {
      const color = issue.level === 'FAIL' ? RED : YELLOW;
      console.log(`    ${color}${issue.level}${RESET} ${issue.msg}`);
    }
    if (gradeIssues.length > 10) {
      console.log(`    ${DIM}... and ${gradeIssues.length - 10} more${RESET}`);
    }
  }
}

totalFails += dim3Fails;
totalWarns += dim3Warns;

// ═════════════════════════════════════════════════════════════════════════════
// Per-Page Results (only pages with issues unless --all)
// ═════════════════════════════════════════════════════════════════════════════

console.log(`\n${BOLD}Per-Page Results${RESET}\n`);

let shownCount = 0;
for (const pr of allPageResults) {
  if (pr.missing) {
    console.log(`${RED}\u2717${RESET} ${BOLD}${pr.theme}/${pr.grade}${RESET} \u2014 GRADE BLOCK MISSING`);
    shownCount++;
    continue;
  }

  const allIssues = [
    ...(pr.dims.seo?.issues || []),
    ...(pr.dims.depth?.issues || []),
    ...(pr.dims.signals?.issues || []),
    ...(pr.dims.enrichment?.issues || []),
  ];

  // Filter: skip Dimension 5 WARNs for "has issues" determination
  const nonEnrichmentIssues = [
    ...(pr.dims.seo?.issues || []),
    ...(pr.dims.depth?.issues || []),
    ...(pr.dims.signals?.issues || []),
  ];

  const hasRealIssues = nonEnrichmentIssues.length > 0;

  if (!showAll && !hasRealIssues) continue;

  shownCount++;
  const { fails, warns, passes } = pr.summary;
  const statusIcon = fails > 0 ? `${RED}\u2717${RESET}` : warns > 0 ? `${YELLOW}\u26A0${RESET}` : `${GREEN}\u2713${RESET}`;
  console.log(`${statusIcon} ${BOLD}${pr.theme}/${pr.grade}${RESET} ${DIM}(${fails}F/${warns}W/${passes}P)${RESET}`);

  if (hasRealIssues || showAll) {
    for (const issueStr of nonEnrichmentIssues) {
      if (issueStr.startsWith('FAIL:')) {
        console.log(`    ${RED}FAIL${RESET} ${issueStr.slice(6)}`);
      } else if (issueStr.startsWith('WARN:')) {
        console.log(`    ${YELLOW}WARN${RESET} ${issueStr.slice(6)}`);
      }
    }
  }
}

if (shownCount === 0) {
  console.log(`  ${GREEN}All ${allPageResults.length} grade pages passed Dimensions 1-4 checks!${RESET}`);
}

// ═════════════════════════════════════════════════════════════════════════════
// Summary Scorecard Table
// ═════════════════════════════════════════════════════════════════════════════

console.log(`\n${BOLD}Summary Scorecard${RESET}\n`);

const hdr = [
  'Theme'.padEnd(16),
  'Grade'.padEnd(6),
  'Intro'.padStart(5),
  'FAQ'.padStart(4),
  'DiffN'.padStart(5),
  'ParTk'.padStart(5),
  'ClInt'.padStart(5),
  'UGA'.padStart(4),
  'SEO'.padStart(4),
  'Stat'.padStart(6),
].join(' | ');
console.log(hdr);
console.log('-'.repeat(hdr.length));

// Short grade labels
const GRADE_SHORT = {
  'preschool': 'Pre',
  'kindergarten': 'Kind',
  'first-grade': '1st',
  'second-grade': '2nd',
  'third-grade': '3rd',
};

for (const pr of allPageResults) {
  if (pr.missing) {
    console.log(`${pr.theme.padEnd(16)} | ${(GRADE_SHORT[pr.grade] || pr.grade).padEnd(6)} | ${RED}MISSING${RESET}`);
    continue;
  }

  const d = pr.dims;
  const stat = pr.summary.fails > 0
    ? `${RED}${pr.summary.fails}F${RESET}`
    : pr.summary.warns > 0
      ? `${YELLOW}${pr.summary.warns}W${RESET}`
      : `${GREEN}OK${RESET}`;

  // Color-code individual values
  function colorVal(val, goodMin, warnMin) {
    if (val >= goodMin) return `${GREEN}${String(val).padStart(5)}${RESET}`;
    if (val >= warnMin) return `${YELLOW}${String(val).padStart(5)}${RESET}`;
    return `${RED}${String(val).padStart(5)}${RESET}`;
  }

  const introVal = colorVal(d.depth?.introWc || 0, 250, 200);
  const faqVal = (d.depth?.faqAnswerShort || 0) === 0
    ? `${GREEN}${String('OK').padStart(4)}${RESET}`
    : `${RED}${String(d.depth.faqAnswerShort + 'F').padStart(4)}${RESET}`;
  const diffVal = colorVal(d.depth?.diffNotesWc || 0, 80, 40);
  const ptVal = colorVal(d.depth?.ptWc || 0, 60, 30);
  const ciVal = colorVal(d.depth?.ciWc || 0, 60, 30);
  const ugaVal = colorVal(d.depth?.ugaWc || 0, 80, 40);

  const seoIssues = (d.seo?.issues || []).filter(i => i.startsWith('FAIL')).length;
  const seoVal = seoIssues === 0
    ? `${GREEN}${String('OK').padStart(4)}${RESET}`
    : `${RED}${String(seoIssues + 'F').padStart(4)}${RESET}`;

  const line = [
    pr.theme.padEnd(16),
    (GRADE_SHORT[pr.grade] || pr.grade).padEnd(6),
    introVal,
    faqVal,
    diffVal,
    ptVal,
    ciVal,
    ugaVal,
    seoVal,
    stat,
  ].join(' | ');
  console.log(line);
}

// ═════════════════════════════════════════════════════════════════════════════
// Final Summary
// ═════════════════════════════════════════════════════════════════════════════

console.log(`\n${'='.repeat(70)}`);
console.log(`${BOLD}TOTAL: ${allPageResults.length} grade pages | ${totalPasses} PASSes | ${totalWarns} WARNs | ${totalFails} FAILs${RESET}`);

// Exclude Dimension 5 WARNs from "actionable" count
const dim5WarnCount = allPageResults.reduce((acc, pr) => {
  return acc + (pr.dims?.enrichment?.issues || []).filter(i => i.startsWith('WARN')).length;
}, 0);
const actionableWarns = totalWarns - dim5WarnCount;

console.log(`${DIM}  (${dim5WarnCount} WARNs are Dim5 optional enrichment \u2014 ${actionableWarns} actionable WARNs)${RESET}`);

if (totalFails === 0 && actionableWarns === 0) {
  console.log(`${GREEN}${BOLD}ALL QUALITY CHECKS PASSED (Dims 1-4)${RESET}`);
} else if (totalFails === 0) {
  console.log(`${YELLOW}${BOLD}NO FAILURES \u2014 ${actionableWarns} actionable warning(s) to review${RESET}`);
} else {
  console.log(`${RED}${BOLD}${totalFails} FAILURE(S) \u2014 review above${RESET}`);
}
console.log('');

// ═════════════════════════════════════════════════════════════════════════════
// JSON Output
// ═════════════════════════════════════════════════════════════════════════════

if (jsonPath) {
  const report = {
    generatedAt: new Date().toISOString(),
    part: 163,
    totalPages: allPageResults.length,
    totalPasses,
    totalWarns,
    totalFails,
    actionableWarns,
    dim5OptionalWarns: dim5WarnCount,
    crossThemeUniqueness: dim3Details,
    pages: allPageResults,
  };
  const outPath = path.resolve(jsonPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`${CYAN}JSON report saved to ${outPath}${RESET}\n`);
}

process.exit(totalFails > 0 ? 1 : 0);
