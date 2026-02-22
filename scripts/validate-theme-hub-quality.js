#!/usr/bin/env node
/**
 * Part 162: Theme Hub Page Quality Audit
 *
 * Complements the structural validator (validate-theme-content.js, Part 4)
 * with deeper quality checks across 6 dimensions:
 *   1. SEO Metadata Quality (title, description, keywords, heading)
 *   2. Grade Content Depth (5 grades x per-grade intro, FAQ, enrichment)
 *   3. SEO Enrichment Fields (uniqueAngle, snippetDefinition, snippetHowTo, etc.)
 *   4. Expert Content Completeness (classroomScenarios, expertTips, etc.)
 *   5. Internal Linking Depth (productLinks, themeComparisons)
 *   6. Cross-Page Uniqueness (duplicate headings, descriptions, uniqueAngle similarity)
 *
 * Usage:
 *   node scripts/validate-theme-hub-quality.js
 *   node scripts/validate-theme-hub-quality.js --json docs/theme-hub-quality-audit.json
 *   node scripts/validate-theme-hub-quality.js --theme animals
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

// ── ANSI Colors ─────────────────────────────────────────────────────────────
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

function pass(msg) { return `  ${GREEN}PASS${RESET} ${msg}`; }
function warn(msg) { return `  ${YELLOW}WARN${RESET} ${msg}`; }
function fail(msg) { return `  ${RED}FAIL${RESET} ${msg}`; }

// ── Helpers ─────────────────────────────────────────────────────────────────

function wordCount(str) {
  if (!str || typeof str !== 'string') return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function extractStringValue(text, key) {
  // Trim leading spaces from key for the regex
  const k = key.trim();
  // Try bare key with single-quote: key: '...'
  const sqRe = new RegExp(k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'", 's');
  const sqMatch = text.match(sqRe);
  if (sqMatch) return sqMatch[1];
  // Try bare key with backtick: key: `...`
  const btRe = new RegExp(k + '\\s*:\\s*`([^`]*)`', 's');
  const btMatch = text.match(btRe);
  if (btMatch) return btMatch[1];
  // Try double-quoted key with double-quoted value: "key": "..."
  const dqRe = new RegExp('"' + k + '"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"', 's');
  const dqMatch = text.match(dqRe);
  if (dqMatch) return dqMatch[1];
  return null;
}

function extractBracketed(text, startIdx, open = '[', close = ']') {
  if (startIdx < 0 || startIdx >= text.length) return '';
  let depth = 0;
  let started = false;
  for (let i = startIdx; i < text.length; i++) {
    if (text[i] === open) { depth++; started = true; }
    if (text[i] === close) { depth--; }
    if (started && depth === 0) return text.slice(startIdx, i + 1);
  }
  return '';
}

function countOccurrences(haystack, needle) {
  let count = 0;
  let pos = 0;
  while ((pos = haystack.indexOf(needle, pos)) !== -1) {
    count++;
    pos += needle.length;
  }
  return count;
}

/**
 * Count field occurrences that may use bare TS keys (field:) or
 * double-quoted JSON keys ("field":). Handles both quoting styles.
 */
function countFieldOccurrences(haystack, fieldName) {
  const re = new RegExp(`"?${fieldName}"?\\s*:`, 'g');
  let count = 0;
  while (re.exec(haystack)) count++;
  return count;
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

/** Extract a grade content block from gradeContent section */
function extractGradeBlock(src, gradeId) {
  // Find the grade block: 'preschool': { ... }
  const gradeRe = new RegExp("'" + gradeId + "'\\s*:\\s*\\{");
  const match = gradeRe.exec(src);
  if (!match) return null;
  const startIdx = match.index + match[0].length - 1; // position of opening {
  return extractBracketed(src, startIdx, '{', '}');
}

// ── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
let themes = ALL_THEME_IDS;
let jsonPath = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--theme' && args[i + 1]) {
    themes = [args[++i]];
  } else if (args[i] === '--json' && args[i + 1]) {
    jsonPath = args[++i];
  }
}

console.log(`\n${BOLD}Part 162 \u2014 Theme Hub Page Quality Audit${RESET}`);
console.log(`Checking ${themes.length} EN theme hub content files\n`);

let totalFails = 0;
let totalWarns = 0;
let totalPasses = 0;

// Cross-page aggregation
const allHeadings = {};       // heading -> [theme, ...]
const allDescriptions = {};   // description -> [theme, ...]
const allUniqueAngles = {};   // theme -> trigram set
const allPageResults = [];

for (const themeId of themes) {
  const filePath = path.join(CONTENT_DIR, themeId, 'en.ts');
  if (!fs.existsSync(filePath)) {
    console.log(`${RED}\u2717${RESET} ${BOLD}${themeId}${RESET} \u2014 FILE MISSING`);
    totalFails++;
    continue;
  }

  const src = fs.readFileSync(filePath, 'utf8');
  let fileFails = 0;
  let fileWarns = 0;
  let filePasses = 0;

  const pageResult = {
    theme: themeId,
    dimensions: {},
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION 1: SEO Metadata Quality
  // ═══════════════════════════════════════════════════════════════════════════
  const dim1Issues = [];

  // 1a. Title: 40-65 chars, contains theme name, contains brand
  const title = extractStringValue(src, '  title');
  if (!title) {
    dim1Issues.push({ level: 'FAIL', msg: 'title: MISSING' });
    fileFails++;
  } else {
    const titleLen = title.length;
    if (titleLen < 40) {
      dim1Issues.push({ level: 'FAIL', msg: `title: ${titleLen} chars (min 40)` });
      fileFails++;
    } else if (titleLen > 65) {
      dim1Issues.push({ level: 'WARN', msg: `title: ${titleLen} chars (target <= 65)` });
      fileWarns++;
    } else {
      filePasses++;
    }
    if (title && !title.includes('LessonCraftStudio') && !title.includes('LCS')) {
      dim1Issues.push({ level: 'WARN', msg: 'title: missing brand (LessonCraftStudio/LCS)' });
      fileWarns++;
    }
  }

  // 1b. Description: 120-170 chars, contains at least one keyword term
  const description = extractStringValue(src, '  description');
  if (!description) {
    dim1Issues.push({ level: 'FAIL', msg: 'description: MISSING' });
    fileFails++;
  } else {
    const descLen = description.length;
    if (descLen < 120) {
      dim1Issues.push({ level: 'WARN', msg: `description: ${descLen} chars (target >= 120)` });
      fileWarns++;
    } else if (descLen > 170) {
      dim1Issues.push({ level: 'WARN', msg: `description: ${descLen} chars (target <= 170)` });
      fileWarns++;
    } else {
      filePasses++;
    }
    // Collect for cross-page
    const descNorm = description.toLowerCase().trim();
    if (!allDescriptions[descNorm]) allDescriptions[descNorm] = [];
    allDescriptions[descNorm].push(themeId);
  }

  // 1c. Keywords: at least 8 comma-separated, no within-page duplicates
  const keywordsRaw = extractStringValue(src, '  keywords');
  const kwList = keywordsRaw ? keywordsRaw.split(',').map(k => k.trim().toLowerCase()).filter(Boolean) : [];
  const kwUnique = [...new Set(kwList)];
  if (kwList.length === 0) {
    dim1Issues.push({ level: 'FAIL', msg: 'keywords: MISSING' });
    fileFails++;
  } else {
    if (kwUnique.length < 8) {
      dim1Issues.push({ level: 'FAIL', msg: `keywords: ${kwUnique.length} unique (min 8)` });
      fileFails++;
    } else {
      filePasses++;
    }
    const dupes = kwList.length - kwUnique.length;
    if (dupes > 0) {
      dim1Issues.push({ level: 'WARN', msg: `keywords: ${dupes} within-page duplicate(s)` });
      fileWarns++;
    }
  }

  // 1d. Heading: present, not identical to title
  const heading = extractStringValue(src, '  heading');
  if (!heading) {
    dim1Issues.push({ level: 'FAIL', msg: 'heading: MISSING' });
    fileFails++;
  } else {
    filePasses++;
    if (title && heading.toLowerCase().trim() === title.toLowerCase().trim()) {
      dim1Issues.push({ level: 'WARN', msg: 'heading: identical to title' });
      fileWarns++;
    }
    // Collect for cross-page
    const headNorm = heading.toLowerCase().trim();
    if (!allHeadings[headNorm]) allHeadings[headNorm] = [];
    allHeadings[headNorm].push(themeId);
  }

  pageResult.dimensions.seoMetadata = {
    titleLen: title ? title.length : 0,
    descLen: description ? description.length : 0,
    keywordCount: kwUnique.length,
    hasHeading: !!heading,
    issues: dim1Issues.map(i => `${i.level}: ${i.msg}`),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION 2: Grade Content Depth (5 grades)
  // ═══════════════════════════════════════════════════════════════════════════
  const dim2Issues = [];
  const gradeResults = {};

  for (const gradeId of ALL_GRADE_IDS) {
    const gradeBlock = extractGradeBlock(src, gradeId);
    if (!gradeBlock) {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}: MISSING grade block` });
      fileFails++;
      gradeResults[gradeId] = { present: false };
      continue;
    }

    const gr = { present: true };

    // 2a. Per-grade intro: >= 200 words (PASS), 150-199 (WARN), <150 (FAIL)
    const gradeIntro = extractStringValue(gradeBlock, 'intro');
    const introWords = wordCount(gradeIntro);
    gr.introWords = introWords;
    if (introWords >= 200) {
      filePasses++;
    } else if (introWords >= 150) {
      dim2Issues.push({ level: 'WARN', msg: `${gradeId}.intro: ${introWords} words (target >= 200)` });
      fileWarns++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.intro: ${introWords} words (min 150)` });
      fileFails++;
    }

    // 2b. seoTitle present
    const seoTitle = extractStringValue(gradeBlock, 'seoTitle');
    gr.hasSeoTitle = !!seoTitle;
    if (seoTitle) {
      filePasses++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.seoTitle: MISSING` });
      fileFails++;
    }

    // 2c. seoDescription present
    const seoDesc = extractStringValue(gradeBlock, 'seoDescription');
    gr.hasSeoDescription = !!seoDesc;
    if (seoDesc) {
      filePasses++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.seoDescription: MISSING` });
      fileFails++;
    }

    // 2d. seoKeywords present
    const seoKw = extractStringValue(gradeBlock, 'seoKeywords');
    gr.hasSeoKeywords = !!seoKw;
    if (seoKw) {
      filePasses++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.seoKeywords: MISSING` });
      fileFails++;
    }

    // 2e. Per-grade FAQ: >= 3 entries
    const faqCount = countFieldOccurrences(gradeBlock, 'question');
    gr.faqCount = faqCount;
    if (faqCount >= 3) {
      filePasses++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.faq: ${faqCount} entries (min 3)` });
      fileFails++;
    }

    // 2f. objectives: >= 3
    const objCount = countFieldOccurrences(gradeBlock, 'skill');
    gr.objectiveCount = objCount;
    if (objCount >= 3) {
      filePasses++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.objectives: ${objCount} (min 3)` });
      fileFails++;
    }

    // 2g. teachingTips: >= 2
    // Grade-level teachingTips are string[] not object[], count quoted strings in the array
    const tipsSectionMatch = gradeBlock.match(/teachingTips:\s*\[([\s\S]*?)\],/);
    let tipsCount = 0;
    if (tipsSectionMatch) {
      const tipsContent = tipsSectionMatch[1];
      const tipMatches = tipsContent.match(/'(?:[^'\\]|\\.)*'/g);
      tipsCount = tipMatches ? tipMatches.length : 0;
    }
    gr.tipsCount = tipsCount;
    if (tipsCount >= 2) {
      filePasses++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.teachingTips: ${tipsCount} (min 2)` });
      fileFails++;
    }

    // 2h. Enrichment fields
    const uniqueGradeAngle = extractStringValue(gradeBlock, 'uniqueGradeAngle');
    gr.hasUniqueGradeAngle = !!uniqueGradeAngle;
    if (!uniqueGradeAngle) {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.uniqueGradeAngle: MISSING` });
      fileFails++;
    } else {
      filePasses++;
    }

    const devMilestoneCount = countFieldOccurrences(gradeBlock, 'milestone');
    gr.devMilestoneCount = devMilestoneCount;
    if (devMilestoneCount >= 3) {
      filePasses++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.developmentalMilestones: ${devMilestoneCount} (min 3)` });
      fileFails++;
    }

    // assessmentRubric items have 'skill:', 'emerging:', 'proficient:', 'advanced:'
    const rubricCount = countFieldOccurrences(gradeBlock, 'emerging');
    gr.assessmentRubricCount = rubricCount;
    if (rubricCount >= 3) {
      filePasses++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.assessmentRubric: ${rubricCount} (min 3)` });
      fileFails++;
    }

    const diffNotes = extractStringValue(gradeBlock, 'differentiationNotes');
    gr.hasDiffNotes = !!diffNotes;
    if (!diffNotes) {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.differentiationNotes: MISSING` });
      fileFails++;
    } else {
      filePasses++;
    }

    const parentTakeaway = extractStringValue(gradeBlock, 'parentTakeaway');
    gr.hasParentTakeaway = !!parentTakeaway;
    if (!parentTakeaway) {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.parentTakeaway: MISSING` });
      fileFails++;
    } else {
      filePasses++;
    }

    const classroomInt = extractStringValue(gradeBlock, 'classroomIntegration');
    gr.hasClassroomIntegration = !!classroomInt;
    if (!classroomInt) {
      dim2Issues.push({ level: 'FAIL', msg: `${gradeId}.classroomIntegration: MISSING` });
      fileFails++;
    } else {
      filePasses++;
    }

    gradeResults[gradeId] = gr;
  }

  pageResult.dimensions.gradeContent = {
    grades: gradeResults,
    issues: dim2Issues.map(i => `${i.level}: ${i.msg}`),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION 3: SEO Enrichment Fields
  // ═══════════════════════════════════════════════════════════════════════════
  const dim3Issues = [];

  // 3a. uniqueAngle: present, >= 200 words (PASS), 100-199 (WARN), missing/<100 (FAIL)
  const uniqueAngle = extractStringValue(src, 'uniqueAngle');
  const uaWords = wordCount(uniqueAngle);
  if (!uniqueAngle) {
    dim3Issues.push({ level: 'FAIL', msg: 'uniqueAngle: MISSING' });
    fileFails++;
  } else if (uaWords >= 200) {
    filePasses++;
    // Collect for cross-page similarity
    allUniqueAngles[themeId] = wordTrigrams(uniqueAngle);
  } else if (uaWords >= 100) {
    dim3Issues.push({ level: 'WARN', msg: `uniqueAngle: ${uaWords} words (target >= 200)` });
    fileWarns++;
    allUniqueAngles[themeId] = wordTrigrams(uniqueAngle);
  } else {
    dim3Issues.push({ level: 'FAIL', msg: `uniqueAngle: ${uaWords} words (min 100)` });
    fileFails++;
  }

  // 3b. researchCitation: present
  const resCitation = extractStringValue(src, 'researchCitation');
  if (resCitation) {
    filePasses++;
  } else {
    dim3Issues.push({ level: 'FAIL', msg: 'researchCitation: MISSING' });
    fileFails++;
  }

  // 3c. snippetDefinition: present, >= 30 words
  const snippetDef = extractStringValue(src, 'snippetDefinition');
  const sdWords = wordCount(snippetDef);
  if (!snippetDef) {
    dim3Issues.push({ level: 'FAIL', msg: 'snippetDefinition: MISSING' });
    fileFails++;
  } else if (sdWords >= 30) {
    filePasses++;
  } else {
    dim3Issues.push({ level: 'WARN', msg: `snippetDefinition: ${sdWords} words (target >= 30)` });
    fileWarns++;
  }

  // 3d. snippetHowTo: >= 5 steps (PASS), 3-4 (WARN), <3 (FAIL)
  const howToIdx = src.indexOf('snippetHowTo:');
  let howToSteps = 0;
  if (howToIdx !== -1) {
    const howToBracket = src.indexOf('[', howToIdx);
    if (howToBracket !== -1) {
      const howToSection = extractBracketed(src, howToBracket, '[', ']');
      // Count quoted strings in the array
      const stepMatches = howToSection.match(/'(?:[^'\\]|\\.)*'/g);
      howToSteps = stepMatches ? stepMatches.length : 0;
    }
  }
  if (howToSteps >= 5) {
    filePasses++;
  } else if (howToSteps >= 3) {
    dim3Issues.push({ level: 'WARN', msg: `snippetHowTo: ${howToSteps} steps (target >= 5)` });
    fileWarns++;
  } else {
    dim3Issues.push({ level: 'FAIL', msg: `snippetHowTo: ${howToSteps} steps (min 3)` });
    fileFails++;
  }

  // 3e. limitations: present (PASS), missing (WARN)
  const limitations = extractStringValue(src, 'limitations');
  if (limitations) {
    filePasses++;
  } else {
    dim3Issues.push({ level: 'WARN', msg: 'limitations: MISSING' });
    fileWarns++;
  }

  pageResult.dimensions.seoEnrichment = {
    uniqueAngleWords: uaWords,
    hasResearchCitation: !!resCitation,
    snippetDefWords: sdWords,
    howToSteps,
    hasLimitations: !!limitations,
    issues: dim3Issues.map(i => `${i.level}: ${i.msg}`),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION 4: Expert Content Completeness
  // ═══════════════════════════════════════════════════════════════════════════
  const dim4Issues = [];

  // 4a. classroomScenarios: >= 2 (PASS), 1 (WARN), 0 (FAIL)
  const csCount = countFieldOccurrences(src, 'situation');
  if (csCount >= 2) {
    filePasses++;
  } else if (csCount === 1) {
    dim4Issues.push({ level: 'WARN', msg: `classroomScenarios: ${csCount} (target >= 2)` });
    fileWarns++;
  } else {
    dim4Issues.push({ level: 'FAIL', msg: 'classroomScenarios: MISSING' });
    fileFails++;
  }

  // 4b. expertTips: >= 3 (PASS), 1-2 (WARN), 0 (FAIL)
  // expertTips have tip:, source:, gradeRange:
  const etIdx = src.indexOf('expertTips:');
  let etCount = 0;
  if (etIdx !== -1) {
    const etBracket = src.indexOf('[', etIdx);
    if (etBracket !== -1) {
      const etSection = extractBracketed(src, etBracket, '[', ']');
      etCount = countFieldOccurrences(etSection, 'tip');
    }
  }
  if (etCount >= 3) {
    filePasses++;
  } else if (etCount >= 1) {
    dim4Issues.push({ level: 'WARN', msg: `expertTips: ${etCount} (target >= 3)` });
    fileWarns++;
  } else {
    dim4Issues.push({ level: 'FAIL', msg: 'expertTips: MISSING' });
    fileFails++;
  }

  // 4c. crossCurricularLinks: >= 2 (PASS), 1 (WARN), 0 (FAIL)
  const cclIdx = src.indexOf('crossCurricularLinks:');
  let cclCount = 0;
  if (cclIdx !== -1) {
    const cclBracket = src.indexOf('[', cclIdx);
    if (cclBracket !== -1) {
      const cclSection = extractBracketed(src, cclBracket, '[', ']');
      cclCount = countFieldOccurrences(cclSection, 'subject');
    }
  }
  if (cclCount >= 2) {
    filePasses++;
  } else if (cclCount === 1) {
    dim4Issues.push({ level: 'WARN', msg: `crossCurricularLinks: ${cclCount} (target >= 2)` });
    fileWarns++;
  } else {
    dim4Issues.push({ level: 'FAIL', msg: 'crossCurricularLinks: MISSING' });
    fileFails++;
  }

  // 4d. differentiationStrategies: >= 3 (PASS), 1-2 (WARN), 0 (FAIL)
  const dsIdx = src.indexOf('differentiationStrategies:');
  let dsCount = 0;
  if (dsIdx !== -1) {
    const dsBracket = src.indexOf('[', dsIdx);
    if (dsBracket !== -1) {
      const dsSection = extractBracketed(src, dsBracket, '[', ']');
      dsCount = countFieldOccurrences(dsSection, 'learnerType');
    }
  }
  if (dsCount >= 3) {
    filePasses++;
  } else if (dsCount >= 1) {
    dim4Issues.push({ level: 'WARN', msg: `differentiationStrategies: ${dsCount} (target >= 3)` });
    fileWarns++;
  } else {
    dim4Issues.push({ level: 'FAIL', msg: 'differentiationStrategies: MISSING' });
    fileFails++;
  }

  // 4e. assessmentIdeas: >= 2 (PASS), 1 (WARN), 0 (FAIL)
  const aiIdx = src.indexOf('assessmentIdeas:');
  let aiCount = 0;
  if (aiIdx !== -1) {
    const aiBracket = src.indexOf('[', aiIdx);
    if (aiBracket !== -1) {
      const aiSection = extractBracketed(src, aiBracket, '[', ']');
      aiCount = countFieldOccurrences(aiSection, 'method');
    }
  }
  if (aiCount >= 2) {
    filePasses++;
  } else if (aiCount === 1) {
    dim4Issues.push({ level: 'WARN', msg: `assessmentIdeas: ${aiCount} (target >= 2)` });
    fileWarns++;
  } else {
    dim4Issues.push({ level: 'FAIL', msg: 'assessmentIdeas: MISSING' });
    fileFails++;
  }

  // 4f. quickStats: >= 4 (PASS), 1-3 (WARN), 0 (FAIL)
  const qsIdx = src.indexOf('quickStats:');
  let qsCount = 0;
  if (qsIdx !== -1) {
    const qsBracket = src.indexOf('[', qsIdx);
    if (qsBracket !== -1) {
      const qsSection = extractBracketed(src, qsBracket, '[', ']');
      qsCount = countFieldOccurrences(qsSection, 'label');
    }
  }
  if (qsCount >= 4) {
    filePasses++;
  } else if (qsCount >= 1) {
    dim4Issues.push({ level: 'WARN', msg: `quickStats: ${qsCount} (target >= 4)` });
    fileWarns++;
  } else {
    dim4Issues.push({ level: 'FAIL', msg: 'quickStats: MISSING' });
    fileFails++;
  }

  pageResult.dimensions.expertContent = {
    classroomScenarios: csCount,
    expertTips: etCount,
    crossCurricularLinks: cclCount,
    differentiationStrategies: dsCount,
    assessmentIdeas: aiCount,
    quickStats: qsCount,
    issues: dim4Issues.map(i => `${i.level}: ${i.msg}`),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION 5: Internal Linking Depth
  // ═══════════════════════════════════════════════════════════════════════════
  const dim5Issues = [];

  // 5a. productLinks: >= 3 (PASS), 1-2 (WARN), 0 (FAIL)
  const plIdx = src.indexOf('productLinks:');
  let plCount = 0;
  if (plIdx !== -1) {
    const plBracket = src.indexOf('[', plIdx);
    if (plBracket !== -1) {
      const plSection = extractBracketed(src, plBracket, '[', ']');
      plCount = countFieldOccurrences(plSection, 'appId');
    }
  }
  if (plCount >= 3) {
    filePasses++;
  } else if (plCount >= 1) {
    dim5Issues.push({ level: 'WARN', msg: `productLinks: ${plCount} (target >= 3)` });
    fileWarns++;
  } else {
    dim5Issues.push({ level: 'FAIL', msg: 'productLinks: MISSING' });
    fileFails++;
  }

  // 5b. themeComparisons: >= 3 (PASS), 1-2 (WARN), 0 (FAIL)
  const tcIdx = src.indexOf('themeComparisons:');
  let tcCount = 0;
  if (tcIdx !== -1) {
    const tcBracket = src.indexOf('[', tcIdx);
    if (tcBracket !== -1) {
      const tcSection = extractBracketed(src, tcBracket, '[', ']');
      tcCount = countFieldOccurrences(tcSection, 'vsThemeId');
    }
  }
  if (tcCount >= 3) {
    filePasses++;
  } else if (tcCount >= 1) {
    dim5Issues.push({ level: 'WARN', msg: `themeComparisons: ${tcCount} (target >= 3)` });
    fileWarns++;
  } else {
    dim5Issues.push({ level: 'FAIL', msg: 'themeComparisons: MISSING' });
    fileFails++;
  }

  pageResult.dimensions.internalLinking = {
    productLinks: plCount,
    themeComparisons: tcCount,
    issues: dim5Issues.map(i => `${i.level}: ${i.msg}`),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // Print per-theme results
  // ═══════════════════════════════════════════════════════════════════════════
  const allIssues = [...dim1Issues, ...dim2Issues, ...dim3Issues, ...dim4Issues, ...dim5Issues];

  pageResult.summary = {
    fails: fileFails,
    warns: fileWarns,
    passes: filePasses,
  };

  allPageResults.push(pageResult);

  if (allIssues.length === 0) {
    console.log(`${GREEN}\u2713${RESET} ${BOLD}${themeId}${RESET} ${DIM}(${filePasses} checks passed)${RESET}`);
  } else {
    const failCount = allIssues.filter(i => i.level === 'FAIL').length;
    const warnCount = allIssues.filter(i => i.level === 'WARN').length;
    const statusIcon = failCount > 0 ? `${RED}\u2717${RESET}` : `${YELLOW}\u26A0${RESET}`;
    console.log(`${statusIcon} ${BOLD}${themeId}${RESET} ${DIM}(${failCount}F/${warnCount}W/${filePasses}P)${RESET}`);
    for (const issue of allIssues) {
      if (issue.level === 'FAIL') console.log(fail(issue.msg));
      else if (issue.level === 'WARN') console.log(warn(issue.msg));
    }
  }

  totalFails += fileFails;
  totalWarns += fileWarns;
  totalPasses += filePasses;
}

// ═══════════════════════════════════════════════════════════════════════════
// DIMENSION 6: Cross-Page Uniqueness
// ═══════════════════════════════════════════════════════════════════════════
console.log(`\n${BOLD}Dimension 6: Cross-Page Uniqueness${RESET}`);

let dim6Fails = 0;
let dim6Warns = 0;

// 6a. Duplicate headings (exact match)
const dupHeadings = Object.entries(allHeadings).filter(([, ts]) => ts.length > 1);
if (dupHeadings.length === 0) {
  console.log(pass('No duplicate headings across theme pages'));
} else {
  for (const [heading, ts] of dupHeadings) {
    console.log(fail(`Duplicate heading "${heading.substring(0, 50)}..." in: ${ts.join(', ')}`));
    dim6Fails++;
  }
}

// 6b. Duplicate descriptions (exact match)
const dupDescs = Object.entries(allDescriptions).filter(([, ts]) => ts.length > 1);
if (dupDescs.length === 0) {
  console.log(pass('No duplicate descriptions across theme pages'));
} else {
  for (const [desc, ts] of dupDescs) {
    console.log(fail(`Duplicate description "${desc.substring(0, 50)}..." in: ${ts.join(', ')}`));
    dim6Fails++;
  }
}

// 6c. uniqueAngle similarity (Jaccard trigram > 25% = WARN)
const angleKeys = Object.keys(allUniqueAngles);
const anglePairs = [];
for (let i = 0; i < angleKeys.length; i++) {
  for (let j = i + 1; j < angleKeys.length; j++) {
    const sim = jaccardSimilarity(allUniqueAngles[angleKeys[i]], allUniqueAngles[angleKeys[j]]);
    if (sim > 0.25) {
      anglePairs.push({ a: angleKeys[i], b: angleKeys[j], sim: Math.round(sim * 100) });
    }
  }
}
if (anglePairs.length === 0) {
  console.log(pass('All uniqueAngle texts are sufficiently distinct (Jaccard <= 25%)'));
} else {
  for (const pair of anglePairs.slice(0, 15)) {
    console.log(warn(`uniqueAngle similarity: ${pair.a} ~ ${pair.b} = ${pair.sim}%`));
    dim6Warns++;
  }
  if (anglePairs.length > 15) console.log(`    ... and ${anglePairs.length - 15} more`);
}

totalFails += dim6Fails;
totalWarns += dim6Warns;

// ═══════════════════════════════════════════════════════════════════════════
// Summary Scorecard Table
// ═══════════════════════════════════════════════════════════════════════════
console.log(`\n${BOLD}Summary Scorecard${RESET}\n`);

const hdr = [
  'Theme'.padEnd(18),
  'Title'.padStart(5),
  'Desc'.padStart(5),
  'KW'.padStart(3),
  'UA'.padStart(4),
  'HowTo'.padStart(5),
  'PL'.padStart(3),
  'TC'.padStart(3),
  'CS'.padStart(3),
  'ET'.padStart(3),
  'QS'.padStart(3),
  'Stat'.padStart(6),
].join(' | ');
console.log(hdr);
console.log('-'.repeat(hdr.length));

for (const pr of allPageResults) {
  const d = pr.dimensions;
  const stat = pr.summary.fails > 0
    ? `${RED}${pr.summary.fails}F${RESET}`
    : pr.summary.warns > 0
      ? `${YELLOW}${pr.summary.warns}W${RESET}`
      : `${GREEN}OK${RESET}`;
  const line = [
    pr.theme.padEnd(18),
    String(d.seoMetadata.titleLen).padStart(5),
    String(d.seoMetadata.descLen).padStart(5),
    String(d.seoMetadata.keywordCount).padStart(3),
    String(d.seoEnrichment.uniqueAngleWords).padStart(4),
    String(d.seoEnrichment.howToSteps).padStart(5),
    String(d.internalLinking.productLinks).padStart(3),
    String(d.internalLinking.themeComparisons).padStart(3),
    String(d.expertContent.classroomScenarios).padStart(3),
    String(d.expertContent.expertTips).padStart(3),
    String(d.expertContent.quickStats).padStart(3),
    stat.padStart(6 + (stat.length - (pr.summary.fails > 0 ? String(pr.summary.fails).length + 1 : pr.summary.warns > 0 ? String(pr.summary.warns).length + 1 : 2))),
  ].join(' | ');
  console.log(line);
}

// ═══════════════════════════════════════════════════════════════════════════
// Final Summary
// ═══════════════════════════════════════════════════════════════════════════
console.log(`\n${'='.repeat(70)}`);
console.log(`${BOLD}TOTAL: ${themes.length} themes | ${totalPasses} PASSes | ${totalWarns} WARNs | ${totalFails} FAILs${RESET}`);
if (totalFails === 0) {
  console.log(`${GREEN}${BOLD}ALL QUALITY CHECKS PASSED${RESET}`);
} else {
  console.log(`${RED}${BOLD}${totalFails} FAILURE(S) \u2014 review above${RESET}`);
}
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// JSON Output
// ═══════════════════════════════════════════════════════════════════════════
if (jsonPath) {
  const report = {
    generatedAt: new Date().toISOString(),
    part: 162,
    totalThemes: themes.length,
    totalPasses,
    totalWarns,
    totalFails,
    crossPageUniqueness: {
      duplicateHeadings: dupHeadings.map(([h, ts]) => ({ heading: h.substring(0, 80), themes: ts })),
      duplicateDescriptions: dupDescs.map(([d, ts]) => ({ description: d.substring(0, 80), themes: ts })),
      uniqueAngleSimilarPairs: anglePairs,
    },
    themes: allPageResults,
  };
  const outPath = path.resolve(jsonPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log(`${CYAN}JSON report saved to ${outPath}${RESET}\n`);
}

process.exit(totalFails > 0 ? 1 : 0);
