/**
 * Part 161: EN Product Page Quality Audit
 *
 * Comprehensive quality check across 5 dimensions:
 *   1. SEO Metadata Quality (title, description, keywords, canonical)
 *   2. Content Depth (hero, features, FAQs, tips, useCases, howTo)
 *   3. SEO Enrichment (aiOverviewSnippet, comparisonTable, testimonials, research)
 *   4. Content Uniqueness (cross-page duplicate detection)
 *   5. Internal Linking (relatedApps slug validity, no self-refs)
 *
 * Usage: node scripts/validate-product-quality.js
 *        node scripts/validate-product-quality.js --json  (save JSON report)
 */

const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────────────────────
const CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');
const JSON_OUTPUT = path.join(__dirname, '..', 'docs', 'product-quality-audit.json');
const EXPECTED_FILE_COUNT = 33;
const saveJson = process.argv.includes('--json');

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

/** Count non-overlapping occurrences of `needle` in `haystack`. */
function countOccurrences(haystack, needle) {
  let count = 0;
  let pos = 0;
  while ((pos = haystack.indexOf(needle, pos)) !== -1) {
    count++;
    pos += needle.length;
  }
  return count;
}

/** Extract content between matching brackets starting at `startIdx`. */
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

/** Word count for a plain-text string. */
function wordCount(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/** Jaccard similarity between two sets of words. */
function jaccardSimilarity(a, b) {
  const setA = new Set(a.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const setB = new Set(b.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  if (setA.size === 0 && setB.size === 0) return 0;
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

/** Extract all string values for a given key from a section of text. */
function extractAllStringValues(text, key) {
  const results = [];
  // Match single-quoted, double-quoted, or backtick-quoted
  const patterns = [
    new RegExp(key + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'", 'g'),
    new RegExp(key + '\\s*:\\s*`([^`]*)`', 'g'),
    new RegExp(key + '\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"', 'g'),
  ];
  for (const pat of patterns) {
    let m;
    while ((m = pat.exec(text)) !== null) {
      results.push(m[1]);
    }
  }
  return results;
}

/** Extract single string value for a key. */
function extractStringValue(text, key) {
  const vals = extractAllStringValues(text, key);
  return vals.length > 0 ? vals[0] : null;
}

// ── Main ────────────────────────────────────────────────────────────────────

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.ts')).sort();
const validSlugs = new Set(files.map(f => f.replace('.ts', '')));

console.log(`\n${BOLD}Part 161 \u2014 EN Product Page Quality Audit${RESET}`);
console.log(`Found ${files.length} files in ${CONTENT_DIR}\n`);

if (files.length !== EXPECTED_FILE_COUNT) {
  console.log(fail(`Expected ${EXPECTED_FILE_COUNT} files, found ${files.length}`));
}

let totalFails = 0;
let totalWarns = 0;
let totalPasses = 0;

// Cross-file aggregation
const allKeywords = {};          // keyword -> [file, ...]
const allFaqQuestions = [];      // { question, file }
const allFeatureTitles = [];     // { title, file }
const allHeroFirstLines = [];    // { text, file }
const allPageResults = [];       // JSON report data

// ── Per-file analysis ───────────────────────────────────────────────────────

for (const fileName of files) {
  const filePath = path.join(CONTENT_DIR, fileName);
  const src = fs.readFileSync(filePath, 'utf8');
  const slug = fileName.replace('.ts', '');
  const issues = [];
  let fileFails = 0;
  let fileWarns = 0;
  let filePasses = 0;

  const pageResult = {
    file: slug,
    dimensions: {},
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION 1: SEO Metadata Quality
  // ═══════════════════════════════════════════════════════════════════════════
  const dim1Issues = [];

  // 1a. Title: 30-60 chars, contains app name, contains "LessonCraftStudio"
  const title = extractStringValue(src, 'title');
  if (!title) {
    dim1Issues.push({ level: 'FAIL', msg: 'seo.title: MISSING' });
    fileFails++;
  } else {
    const titleLen = title.length;
    if (titleLen < 30) {
      dim1Issues.push({ level: 'FAIL', msg: `seo.title: ${titleLen} chars (min 30)` });
      fileFails++;
    } else if (titleLen > 60) {
      dim1Issues.push({ level: 'WARN', msg: `seo.title: ${titleLen} chars (recommended <= 60)` });
      fileWarns++;
    } else {
      filePasses++;
    }
    if (title && !title.includes('LessonCraftStudio')) {
      dim1Issues.push({ level: 'WARN', msg: `seo.title: missing "LessonCraftStudio" brand` });
      fileWarns++;
    }
  }

  // 1b. Description: 120-170 chars, contains at least one keyword
  const description = extractStringValue(src, '  description');
  if (!description) {
    dim1Issues.push({ level: 'FAIL', msg: 'seo.description: MISSING' });
    fileFails++;
  } else {
    const descLen = description.length;
    if (descLen < 120) {
      dim1Issues.push({ level: 'WARN', msg: `seo.description: ${descLen} chars (recommended >= 120)` });
      fileWarns++;
    } else if (descLen > 170) {
      dim1Issues.push({ level: 'WARN', msg: `seo.description: ${descLen} chars (recommended <= 170)` });
      fileWarns++;
    } else {
      filePasses++;
    }
  }

  // 1c. Keywords: at least 8 unique, no within-page duplicates
  const keywordsRaw = extractStringValue(src, 'keywords');
  const kwList = keywordsRaw ? keywordsRaw.split(',').map(k => k.trim().toLowerCase()).filter(Boolean) : [];
  const kwUnique = [...new Set(kwList)];
  if (kwList.length === 0) {
    dim1Issues.push({ level: 'FAIL', msg: 'seo.keywords: MISSING' });
    fileFails++;
  } else {
    if (kwUnique.length < 8) {
      dim1Issues.push({ level: 'FAIL', msg: `seo.keywords: ${kwUnique.length} unique (min 8)` });
      fileFails++;
    } else {
      filePasses++;
    }
    const dupes = kwList.length - kwUnique.length;
    if (dupes > 0) {
      dim1Issues.push({ level: 'WARN', msg: `seo.keywords: ${dupes} within-page duplicate(s)` });
      fileWarns++;
    }
    // Collect for cross-page cannibalization
    for (const kw of kwUnique) {
      if (!allKeywords[kw]) allKeywords[kw] = [];
      allKeywords[kw].push(slug);
    }
  }

  // 1d. Canonical URL
  const canonical = extractStringValue(src, 'canonicalUrl');
  const expectedCanon = `https://www.lessoncraftstudio.com/en/apps/${slug}`;
  if (!canonical) {
    dim1Issues.push({ level: 'FAIL', msg: 'seo.canonicalUrl: MISSING' });
    fileFails++;
  } else if (canonical !== expectedCanon) {
    dim1Issues.push({ level: 'FAIL', msg: `seo.canonicalUrl: "${canonical}" !== "${expectedCanon}"` });
    fileFails++;
  } else {
    filePasses++;
  }

  pageResult.dimensions.seoMetadata = {
    titleLen: title ? title.length : 0,
    descLen: description ? description.length : 0,
    keywordCount: kwUnique.length,
    canonicalOk: canonical === expectedCanon,
    issues: dim1Issues.map(i => `${i.level}: ${i.msg}`),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION 2: Content Depth
  // ═══════════════════════════════════════════════════════════════════════════
  const dim2Issues = [];

  // 2a. Hero description: >= 200 words (PASS), 150-199 (WARN), <150 (FAIL)
  const heroIdx = src.indexOf('hero:');
  let heroDescWords = 0;
  if (heroIdx !== -1) {
    // Extract hero description specifically (backtick or single-quote after standalone 'description:')
    const heroSlice = src.slice(heroIdx, heroIdx + 5000);
    let heroDesc = null;
    const btMatch = heroSlice.match(/(?:^|[\s,{])description:\s*`([^`]*)`/);
    if (btMatch) heroDesc = btMatch[1];
    if (!heroDesc) {
      const sqMatch = heroSlice.match(/(?:^|[\s,{])description:\s*'((?:[^'\\]|\\.)*)'/);
      if (sqMatch) heroDesc = sqMatch[1];
    }
    heroDescWords = wordCount(heroDesc);
    if (heroDescWords >= 200) {
      filePasses++;
    } else if (heroDescWords >= 150) {
      dim2Issues.push({ level: 'WARN', msg: `hero.description: ${heroDescWords} words (target >= 200)` });
      fileWarns++;
    } else {
      dim2Issues.push({ level: 'FAIL', msg: `hero.description: ${heroDescWords} words (min 150)` });
      fileFails++;
    }
    // Collect first 100 chars for uniqueness check
    if (heroDesc) {
      allHeroFirstLines.push({ text: heroDesc.substring(0, 100), file: slug });
    }
  } else {
    dim2Issues.push({ level: 'FAIL', msg: 'hero section: MISSING' });
    fileFails++;
  }

  // 2b. Features: >= 10 items, each description >= 30 words
  const featIdx = src.indexOf('features:');
  let featureCount = 0;
  let shortFeatures = 0;
  if (featIdx !== -1) {
    const featItemsIdx = src.indexOf('items:', featIdx);
    if (featItemsIdx !== -1) {
      const featBracket = src.indexOf('[', featItemsIdx);
      const featSection = extractBracketed(src, featBracket, '[', ']');
      featureCount = countOccurrences(featSection, "id: '");
      // Check each feature description word count
      const featDescs = extractAllStringValues(featSection, 'description');
      for (const desc of featDescs) {
        if (wordCount(desc) < 30) shortFeatures++;
      }
      // Collect feature titles for uniqueness
      const featTitles = extractAllStringValues(featSection, 'title');
      for (const t of featTitles) {
        allFeatureTitles.push({ title: t, file: slug });
      }
    }
  }
  if (featureCount < 10) {
    dim2Issues.push({ level: 'FAIL', msg: `features: ${featureCount} items (min 10)` });
    fileFails++;
  } else {
    filePasses++;
  }
  if (shortFeatures > 0) {
    dim2Issues.push({ level: 'WARN', msg: `features: ${shortFeatures} item(s) with description < 30 words` });
    fileWarns++;
  }

  // 2c. FAQs: >= 10 items, each answer >= 50 words
  const faqIdx = src.indexOf('faq:');
  let faqCount = 0;
  let shortFaqs = 0;
  if (faqIdx !== -1) {
    const faqItemsIdx = src.indexOf('items:', faqIdx);
    if (faqItemsIdx !== -1) {
      const faqBracket = src.indexOf('[', faqItemsIdx);
      const faqSection = extractBracketed(src, faqBracket, '[', ']');
      faqCount = countOccurrences(faqSection, "id: '");
      // Check answer word counts
      const faqAnswers = extractAllStringValues(faqSection, 'answer');
      for (const ans of faqAnswers) {
        if (wordCount(ans) < 50) shortFaqs++;
      }
      // Collect FAQ questions for uniqueness
      const faqQuestions = extractAllStringValues(faqSection, 'question');
      for (const q of faqQuestions) {
        allFaqQuestions.push({ question: q, file: slug });
      }
    }
  }
  if (faqCount < 10) {
    dim2Issues.push({ level: 'FAIL', msg: `faq: ${faqCount} items (min 10)` });
    fileFails++;
  } else {
    filePasses++;
  }
  if (shortFaqs > 0) {
    dim2Issues.push({ level: 'WARN', msg: `faq: ${shortFaqs} answer(s) with < 50 words` });
    fileWarns++;
  }

  // 2d. Tips: >= 3
  const tipsIdx = src.indexOf('\n  tips:');
  let tipsCount = 0;
  if (tipsIdx !== -1) {
    const tipsItemsIdx = src.indexOf('items:', tipsIdx);
    if (tipsItemsIdx !== -1) {
      const tipsBracket = src.indexOf('[', tipsItemsIdx);
      const tipsSection = extractBracketed(src, tipsBracket, '[', ']');
      tipsCount = countOccurrences(tipsSection, "id: '");
    }
  }
  if (tipsCount < 3) {
    dim2Issues.push({ level: 'FAIL', msg: `tips: ${tipsCount} items (min 3)` });
    fileFails++;
  } else {
    filePasses++;
  }

  // 2e. Use cases: >= 4
  const ucIdx = src.indexOf('useCases:');
  let ucCount = 0;
  if (ucIdx !== -1) {
    const ucItemsIdx = src.indexOf('items:', ucIdx);
    if (ucItemsIdx !== -1) {
      const ucBracket = src.indexOf('[', ucItemsIdx);
      const ucSection = extractBracketed(src, ucBracket, '[', ']');
      ucCount = countOccurrences(ucSection, "id: '");
    }
  }
  if (ucCount < 4) {
    dim2Issues.push({ level: 'FAIL', msg: `useCases: ${ucCount} items (min 4)` });
    fileFails++;
  } else {
    filePasses++;
  }

  // 2f. HowTo steps: >= 3
  const howToIdx = src.indexOf('howTo:');
  let howToSteps = 0;
  if (howToIdx !== -1) {
    const howToStepsIdx = src.indexOf('steps:', howToIdx);
    if (howToStepsIdx !== -1) {
      const howToBracket = src.indexOf('[', howToStepsIdx);
      const howToSection = extractBracketed(src, howToBracket, '[', ']');
      howToSteps = (howToSection.match(/number:\s*\d/g) || []).length;
    }
  }
  if (howToSteps < 3) {
    dim2Issues.push({ level: 'FAIL', msg: `howTo: ${howToSteps} steps (min 3)` });
    fileFails++;
  } else {
    filePasses++;
  }

  pageResult.dimensions.contentDepth = {
    heroWords: heroDescWords,
    featureCount,
    shortFeatures,
    faqCount,
    shortFaqs,
    tipsCount,
    useCaseCount: ucCount,
    howToSteps,
    issues: dim2Issues.map(i => `${i.level}: ${i.msg}`),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION 3: SEO Enrichment
  // ═══════════════════════════════════════════════════════════════════════════
  const dim3Issues = [];

  // 3a. aiOverviewSnippet: present, 40+ words
  const snippetMatch = src.match(/aiOverviewSnippet\s*:\s*[`'"]([\s\S]*?)[`'"]\s*,/);
  const snippetText = snippetMatch ? snippetMatch[1] : '';
  const snippetWords = wordCount(snippetText);
  if (!snippetText) {
    dim3Issues.push({ level: 'FAIL', msg: 'aiOverviewSnippet: MISSING' });
    fileFails++;
  } else if (snippetWords < 40) {
    dim3Issues.push({ level: 'WARN', msg: `aiOverviewSnippet: ${snippetWords} words (target >= 40)` });
    fileWarns++;
  } else {
    filePasses++;
  }

  // 3b. comparisonTable: >= 4 rows
  const ctIdx = src.indexOf('comparisonTable:');
  let compRows = 0;
  if (ctIdx === -1) {
    dim3Issues.push({ level: 'FAIL', msg: 'comparisonTable: MISSING' });
    fileFails++;
  } else {
    const ctBracket = src.indexOf('[', ctIdx);
    const ctSection = extractBracketed(src, ctBracket, '[', ']');
    compRows = countOccurrences(ctSection, 'feature:');
    if (compRows < 4) {
      dim3Issues.push({ level: 'FAIL', msg: `comparisonTable: ${compRows} rows (min 4)` });
      fileFails++;
    } else {
      filePasses++;
    }
  }

  // 3c. teacherTestimonials: >= 2
  const ttIdx = src.indexOf('teacherTestimonials:');
  let testimonialCount = 0;
  if (ttIdx === -1) {
    dim3Issues.push({ level: 'FAIL', msg: 'teacherTestimonials: MISSING' });
    fileFails++;
  } else {
    const ttBracket = src.indexOf('[', ttIdx);
    const ttSection = extractBracketed(src, ttBracket, '[', ']');
    testimonialCount = countOccurrences(ttSection, 'quote:');
    if (testimonialCount < 2) {
      dim3Issues.push({ level: 'FAIL', msg: `teacherTestimonials: ${testimonialCount} (min 2)` });
      fileFails++;
    } else {
      filePasses++;
    }
  }

  // 3d. researchBacking: >= 2, each with source:
  const rbIdx = src.indexOf('researchBacking:');
  let researchItems = 0;
  let researchWithSource = 0;
  if (rbIdx === -1) {
    dim3Issues.push({ level: 'FAIL', msg: 'researchBacking: MISSING' });
    fileFails++;
  } else {
    const rbBracket = src.indexOf('[', rbIdx);
    const rbSection = extractBracketed(src, rbBracket, '[', ']');
    researchItems = countOccurrences(rbSection, 'claim:');
    researchWithSource = countOccurrences(rbSection, 'source:');
    if (researchItems < 2) {
      dim3Issues.push({ level: 'FAIL', msg: `researchBacking: ${researchItems} items (min 2)` });
      fileFails++;
    } else {
      filePasses++;
    }
    if (researchWithSource < researchItems) {
      dim3Issues.push({ level: 'WARN', msg: `researchBacking: ${researchItems - researchWithSource} item(s) missing source:` });
      fileWarns++;
    }
  }

  pageResult.dimensions.seoEnrichment = {
    snippetWords,
    compRows,
    testimonialCount,
    researchItems,
    researchWithSource,
    issues: dim3Issues.map(i => `${i.level}: ${i.msg}`),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DIMENSION 5: Internal Linking
  // ═══════════════════════════════════════════════════════════════════════════
  const dim5Issues = [];

  const raIdx = src.indexOf('relatedApps:');
  let relatedCount = 0;
  const relatedSlugs = [];
  if (raIdx === -1) {
    dim5Issues.push({ level: 'FAIL', msg: 'relatedApps: MISSING' });
    fileFails++;
  } else {
    const raItemsIdx = src.indexOf('items:', raIdx);
    if (raItemsIdx !== -1) {
      const raBracket = src.indexOf('[', raItemsIdx);
      const raSection = extractBracketed(src, raBracket, '[', ']');
      const slugMatches = extractAllStringValues(raSection, 'slug');
      relatedCount = slugMatches.length;
      relatedSlugs.push(...slugMatches);
    }
  }

  if (relatedCount < 4) {
    dim5Issues.push({ level: 'FAIL', msg: `relatedApps: ${relatedCount} items (min 4)` });
    fileFails++;
  } else {
    filePasses++;
  }

  // Check for self-reference
  if (relatedSlugs.includes(slug)) {
    dim5Issues.push({ level: 'FAIL', msg: `relatedApps: self-reference to "${slug}"` });
    fileFails++;
  }

  // Check for broken slugs
  const brokenSlugs = relatedSlugs.filter(s => !validSlugs.has(s));
  for (const bs of brokenSlugs) {
    dim5Issues.push({ level: 'FAIL', msg: `relatedApps: broken slug "${bs}" (no matching file)` });
    fileFails++;
  }

  // Check for duplicate slugs within relatedApps
  const slugSet = new Set();
  for (const s of relatedSlugs) {
    if (slugSet.has(s)) {
      dim5Issues.push({ level: 'WARN', msg: `relatedApps: duplicate slug "${s}"` });
      fileWarns++;
    }
    slugSet.add(s);
  }

  if (brokenSlugs.length === 0 && !relatedSlugs.includes(slug) && relatedCount >= 4) {
    filePasses++;
  }

  pageResult.dimensions.internalLinking = {
    relatedCount,
    brokenSlugs,
    hasSelfRef: relatedSlugs.includes(slug),
    issues: dim5Issues.map(i => `${i.level}: ${i.msg}`),
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // Print per-file results
  // ═══════════════════════════════════════════════════════════════════════════
  const allIssues = [...dim1Issues, ...dim2Issues, ...dim3Issues, ...dim5Issues];

  pageResult.summary = {
    fails: fileFails,
    warns: fileWarns,
    passes: filePasses,
  };

  allPageResults.push(pageResult);

  if (allIssues.length === 0) {
    console.log(`${GREEN}\u2713${RESET} ${BOLD}${slug}${RESET} ${DIM}(${filePasses} checks passed)${RESET}`);
  } else {
    const failCount = allIssues.filter(i => i.level === 'FAIL').length;
    const warnCount = allIssues.filter(i => i.level === 'WARN').length;
    const statusIcon = failCount > 0 ? `${RED}\u2717${RESET}` : `${YELLOW}\u26A0${RESET}`;
    console.log(`${statusIcon} ${BOLD}${slug}${RESET} ${DIM}(${failCount}F/${warnCount}W/${filePasses}P)${RESET}`);
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
// DIMENSION 4: Content Uniqueness (cross-page)
// ═══════════════════════════════════════════════════════════════════════════
console.log(`\n${BOLD}Dimension 4: Content Uniqueness (Cross-Page)${RESET}`);

let dim4Fails = 0;
let dim4Warns = 0;

// 4a. Duplicate FAQ questions (Jaccard similarity >= 80%)
const faqDupes = [];
for (let i = 0; i < allFaqQuestions.length; i++) {
  for (let j = i + 1; j < allFaqQuestions.length; j++) {
    if (allFaqQuestions[i].file === allFaqQuestions[j].file) continue;
    const sim = jaccardSimilarity(allFaqQuestions[i].question, allFaqQuestions[j].question);
    if (sim >= 0.8) {
      faqDupes.push({
        q1: allFaqQuestions[i].question.substring(0, 60),
        f1: allFaqQuestions[i].file,
        q2: allFaqQuestions[j].question.substring(0, 60),
        f2: allFaqQuestions[j].file,
        similarity: Math.round(sim * 100),
      });
    }
  }
}
if (faqDupes.length === 0) {
  console.log(pass('No duplicate FAQ questions across pages (Jaccard >= 80%)'));
} else {
  console.log(warn(`${faqDupes.length} similar FAQ question pair(s) across pages:`));
  for (const d of faqDupes.slice(0, 10)) {
    console.log(`    ${YELLOW}${d.similarity}%${RESET} "${d.q1}..." (${d.f1}) ~ "${d.q2}..." (${d.f2})`);
    dim4Warns++;
  }
  if (faqDupes.length > 10) console.log(`    ... and ${faqDupes.length - 10} more`);
}

// 4b. Duplicate feature titles (exact match across files)
const featureTitleMap = {};
for (const { title, file } of allFeatureTitles) {
  const norm = title.toLowerCase().trim();
  if (!featureTitleMap[norm]) featureTitleMap[norm] = [];
  featureTitleMap[norm].push(file);
}
const dupFeatures = Object.entries(featureTitleMap).filter(([, files]) => {
  const unique = [...new Set(files)];
  return unique.length > 1;
});
if (dupFeatures.length === 0) {
  console.log(pass('No duplicate feature titles across pages'));
} else {
  for (const [title, files] of dupFeatures.slice(0, 10)) {
    const unique = [...new Set(files)];
    console.log(fail(`Duplicate feature title "${title.substring(0, 50)}..." in: ${unique.join(', ')}`));
    dim4Fails++;
  }
}

// 4c. Duplicate hero descriptions (first 100 chars exact match)
const heroFirstMap = {};
for (const { text, file } of allHeroFirstLines) {
  const norm = text.toLowerCase().trim();
  if (!heroFirstMap[norm]) heroFirstMap[norm] = [];
  heroFirstMap[norm].push(file);
}
const dupHeros = Object.entries(heroFirstMap).filter(([, files]) => {
  const unique = [...new Set(files)];
  return unique.length > 1;
});
if (dupHeros.length === 0) {
  console.log(pass('No duplicate hero descriptions across pages'));
} else {
  for (const [text, files] of dupHeros.slice(0, 10)) {
    const unique = [...new Set(files)];
    console.log(fail(`Duplicate hero opening "${text.substring(0, 50)}..." in: ${unique.join(', ')}`));
    dim4Fails++;
  }
}

totalFails += dim4Fails;
totalWarns += dim4Warns;

// ═══════════════════════════════════════════════════════════════════════════
// Keyword Cannibalization Summary
// ═══════════════════════════════════════════════════════════════════════════
console.log(`\n${BOLD}Keyword Cannibalization${RESET}`);

const overlapKws = Object.entries(allKeywords)
  .filter(([, files]) => {
    const unique = [...new Set(files)];
    return unique.length >= 3;
  })
  .sort((a, b) => {
    const aUnique = [...new Set(b[1])].length;
    const bUnique = [...new Set(a[1])].length;
    return aUnique - bUnique;
  });

const severeKws = overlapKws.filter(([, files]) => [...new Set(files)].length >= 5);
const moderateKws = overlapKws.filter(([, files]) => {
  const u = [...new Set(files)].length;
  return u >= 3 && u < 5;
});

if (severeKws.length > 0) {
  console.log(fail(`${severeKws.length} keywords in 5+ pages (cannibalization risk):`));
  for (const [kw, files] of severeKws.slice(0, 15)) {
    const unique = [...new Set(files)];
    console.log(`    ${RED}"${kw}"${RESET} \u2192 ${unique.length} pages`);
    totalFails++;
  }
}

if (moderateKws.length > 0) {
  console.log(warn(`${moderateKws.length} keywords in 3-4 pages (monitor):`));
  for (const [kw, files] of moderateKws.slice(0, 10)) {
    const unique = [...new Set(files)];
    console.log(`    ${YELLOW}"${kw}"${RESET} \u2192 ${unique.length} pages`);
  }
  if (moderateKws.length > 10) console.log(`    ... and ${moderateKws.length - 10} more`);
}

if (overlapKws.length === 0) {
  console.log(pass('No keyword appears in 3+ pages'));
}

// ═══════════════════════════════════════════════════════════════════════════
// Summary Table
// ═══════════════════════════════════════════════════════════════════════════
console.log(`\n${BOLD}Summary Scorecard${RESET}\n`);

const hdr = [
  'File'.padEnd(32),
  'Hero'.padStart(5),
  'Feat'.padStart(5),
  'FAQ'.padStart(4),
  'Tips'.padStart(5),
  'UC'.padStart(3),
  'Snip'.padStart(5),
  'Comp'.padStart(5),
  'Refs'.padStart(5),
  'Stat'.padStart(6),
].join(' | ');
console.log(hdr);
console.log('-'.repeat(hdr.length));

for (const pr of allPageResults) {
  const d = pr.dimensions;
  const stat = pr.summary.fails > 0
    ? `${RED}${pr.summary.fails}F${RESET}`
    : `${GREEN}OK${RESET}`;
  const line = [
    pr.file.padEnd(32),
    String(d.contentDepth.heroWords).padStart(5),
    String(d.contentDepth.featureCount).padStart(5),
    String(d.contentDepth.faqCount).padStart(4),
    String(d.contentDepth.tipsCount).padStart(5),
    String(d.contentDepth.useCaseCount).padStart(3),
    String(d.seoEnrichment.snippetWords).padStart(5),
    String(d.seoEnrichment.compRows).padStart(5),
    String(d.internalLinking.relatedCount).padStart(5),
    stat.padStart(6 + (stat.length - (pr.summary.fails > 0 ? String(pr.summary.fails).length + 1 : 2))),
  ].join(' | ');
  console.log(line);
}

// ═══════════════════════════════════════════════════════════════════════════
// Final Summary
// ═══════════════════════════════════════════════════════════════════════════
console.log(`\n${'='.repeat(70)}`);
console.log(`${BOLD}TOTAL: ${files.length} pages | ${totalPasses} PASSes | ${totalWarns} WARNs | ${totalFails} FAILs${RESET}`);
if (totalFails === 0) {
  console.log(`${GREEN}${BOLD}ALL QUALITY CHECKS PASSED${RESET}`);
} else {
  console.log(`${RED}${BOLD}${totalFails} FAILURE(S) \u2014 review above${RESET}`);
}
console.log('');

// ═══════════════════════════════════════════════════════════════════════════
// JSON Output
// ═══════════════════════════════════════════════════════════════════════════
if (saveJson) {
  const report = {
    generatedAt: new Date().toISOString(),
    totalPages: files.length,
    totalPasses,
    totalWarns,
    totalFails,
    keywordCannibalization: {
      severe: severeKws.map(([kw, files]) => ({ keyword: kw, pageCount: [...new Set(files)].length })),
      moderate: moderateKws.map(([kw, files]) => ({ keyword: kw, pageCount: [...new Set(files)].length })),
    },
    faqSimilarities: faqDupes.slice(0, 20),
    duplicateFeatureTitles: dupFeatures.map(([t, f]) => ({ title: t.substring(0, 80), files: [...new Set(f)] })),
    duplicateHeroOpenings: dupHeros.map(([t, f]) => ({ text: t.substring(0, 80), files: [...new Set(f)] })),
    pages: allPageResults,
  };
  fs.writeFileSync(JSON_OUTPUT, JSON.stringify(report, null, 2));
  console.log(`${CYAN}JSON report saved to ${JSON_OUTPUT}${RESET}\n`);
}

process.exit(totalFails > 0 ? 1 : 0);
