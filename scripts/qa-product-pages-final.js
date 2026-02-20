#!/usr/bin/env node
/**
 * Part 30 — Final QA for all 33 EN Product Pages
 *
 * Checks:
 *   A. Unique Voice / Anti-Template Detection (trigram similarity, title overlap, FAQ opener diversity)
 *   B. Unique Primary Keywords (no two pages share primary keyword)
 *   C. FAQ Educational Quality (answer length, pedagogy ratio, brand-spam)
 *   D. Research Citation Quality (specific sources, min 2 per page)
 *   E. Structural Completeness (all sections + enrichment fields + SEO metadata)
 *
 * Usage: node scripts/qa-product-pages-final.js
 * Output: console report + docs/audit-results/product-qa-final.json
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');
const OUTPUT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'product-qa-final.json');

// ── ANSI helpers ────────────────────────────────────────────────────────────
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

let totalPass = 0, totalWarn = 0, totalFail = 0;
const issues = [];

function pass(msg) { totalPass++; console.log(`  ${GREEN}PASS${RESET} ${msg}`); }
function warn(msg, file) { totalWarn++; console.log(`  ${YELLOW}WARN${RESET} ${msg}`); issues.push({ level: 'warn', msg, file }); }
function fail(msg, file) { totalFail++; console.log(`  ${RED}FAIL${RESET} ${msg}`); issues.push({ level: 'fail', msg, file }); }
function header(msg) { console.log(`\n${BOLD}${CYAN}${msg}${RESET}`); }

// ── Load all 33 content files via regex extraction ──────────────────────────

function loadContentFiles() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.ts'));
  const pages = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const slug = file.replace('.ts', '');

    // Extract seo block
    const seoMatch = raw.match(/seo:\s*\{([\s\S]*?)\},\s*\n\s*\/\//);
    const seoBlock = seoMatch ? seoMatch[1] : '';

    const extractSeoField = (field) => {
      const m = seoBlock.match(new RegExp(field + ":\\s*['\"]([^'\"]*)['\"]"));
      return m ? m[1] : '';
    };

    // Extract hero title and description
    const heroTitleMatch = raw.match(/hero:\s*\{[\s\S]*?title:\s*['\"]([^'\"]*)['\"]/) ||
                           raw.match(/hero:\s*\{[\s\S]*?title:\s*`([^`]*)`/);
    const heroTitle = heroTitleMatch ? heroTitleMatch[1] : '';

    const heroDescMatch = raw.match(/hero:\s*\{[\s\S]*?description:\s*`([\s\S]*?)`/);
    const heroDesc = heroDescMatch ? heroDescMatch[1].trim() : '';

    // Extract FAQ items
    const faqItems = [];
    const faqSection = raw.match(/faq:\s*\{[\s\S]*?items:\s*\[([\s\S]*?)\]\s*,?\s*\}/);
    if (faqSection) {
      const questionRegex = /question:\s*[`'"]([^`'"]*)[`'"]/g;
      const answerRegex = /answer:\s*[`'"]([^`'"]*)[`'"]/g;
      let qm, am;
      const questions = [], answers = [];
      while ((qm = questionRegex.exec(faqSection[1])) !== null) questions.push(qm[1]);
      while ((am = answerRegex.exec(faqSection[1])) !== null) answers.push(am[1]);
      for (let i = 0; i < Math.min(questions.length, answers.length); i++) {
        faqItems.push({ question: questions[i], answer: answers[i] });
      }
    }

    // Extract researchBacking
    const researchItems = [];
    const researchMatch = raw.match(/researchBacking:\s*\[([\s\S]*?)\]\s*,/);
    if (researchMatch) {
      const claimRegex = /claim:\s*[`'"]([^`'"]*)[`'"]/g;
      const sourceRegex = /source:\s*[`'"]([^`'"]*)[`'"]/g;
      let cm, sm;
      const claims = [], sources = [];
      while ((cm = claimRegex.exec(researchMatch[1])) !== null) claims.push(cm[1]);
      while ((sm = sourceRegex.exec(researchMatch[1])) !== null) sources.push(sm[1]);
      for (let i = 0; i < Math.min(claims.length, sources.length); i++) {
        researchItems.push({ claim: claims[i], source: sources[i] });
      }
    }

    // Extract aiOverviewSnippet
    const snippetMatch = raw.match(/aiOverviewSnippet:\s*[`'"]([^`'"]*)[`'"]/);
    const aiSnippet = snippetMatch ? snippetMatch[1] : '';

    // Extract comparisonTable presence
    const hasComparison = raw.includes('comparisonTable:');
    const hasTestimonials = raw.includes('teacherTestimonials:');
    const hasResearchBacking = raw.includes('researchBacking:');
    const hasTips = raw.includes('tips:');

    // Check structural sections
    const sections = ['hero', 'samples', 'features', 'howTo', 'useCases', 'faq', 'pricing', 'relatedApps'];
    const presentSections = sections.filter(s => raw.includes(s + ':'));

    // Keywords
    const keywords = extractSeoField('keywords');

    pages.push({
      file, slug,
      seo: {
        slug: extractSeoField('slug'),
        appId: extractSeoField('appId'),
        title: extractSeoField('title'),
        description: extractSeoField('description'),
        keywords,
        canonicalUrl: extractSeoField('canonicalUrl'),
      },
      heroTitle, heroDesc,
      faqItems,
      researchItems,
      aiSnippet,
      hasComparison, hasTestimonials, hasResearchBacking, hasTips,
      presentSections,
      raw,
    });
  }

  return pages;
}

// ── Trigram similarity ──────────────────────────────────────────────────────

function trigrams(text) {
  const t = text.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  const set = new Set();
  for (let i = 0; i <= t.length - 3; i++) {
    set.add(t.substring(i, i + 3));
  }
  return set;
}

function jaccardSimilarity(setA, setB) {
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function wordOverlap(textA, textB) {
  const wordsA = new Set(textA.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 3));
  const wordsB = new Set(textB.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(w => w.length > 3));
  let intersection = 0;
  for (const w of wordsA) if (wordsB.has(w)) intersection++;
  const smaller = Math.min(wordsA.size, wordsB.size);
  return smaller === 0 ? 0 : intersection / smaller;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

console.log(`${BOLD}╔════════════════════════════════════════════════════════════════╗${RESET}`);
console.log(`${BOLD}║  Part 30 — Final QA: 33 EN Product Pages                     ║${RESET}`);
console.log(`${BOLD}╚════════════════════════════════════════════════════════════════╝${RESET}`);

const pages = loadContentFiles();
console.log(`\nLoaded ${pages.length} content files`);

if (pages.length !== 33) {
  fail(`Expected 33 files, found ${pages.length}`);
} else {
  pass(`All 33 EN product page files found`);
}

// ═══════════════════════════════════════════════════════════════════════════
// A. UNIQUE VOICE / ANTI-TEMPLATE DETECTION
// ═══════════════════════════════════════════════════════════════════════════
header('A. Unique Voice / Anti-Template Detection');

// A1: Hero description trigram similarity
const descTrigrams = pages.map(p => ({ slug: p.slug, tri: trigrams(p.heroDesc.substring(0, 300)) }));
let highSimilarityPairs = 0;
for (let i = 0; i < descTrigrams.length; i++) {
  for (let j = i + 1; j < descTrigrams.length; j++) {
    const sim = jaccardSimilarity(descTrigrams[i].tri, descTrigrams[j].tri);
    if (sim > 0.30) {
      warn(`Hero desc similarity ${(sim * 100).toFixed(1)}%: ${descTrigrams[i].slug} vs ${descTrigrams[j].slug}`, descTrigrams[i].slug);
      highSimilarityPairs++;
    }
  }
}
if (highSimilarityPairs === 0) {
  pass('All hero descriptions have unique voice (< 30% trigram similarity)');
} else {
  console.log(`  Found ${highSimilarityPairs} pair(s) with > 30% similarity`);
}

// A2: Hero title word overlap
let titleOverlapCount = 0;
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const overlap = wordOverlap(pages[i].heroTitle, pages[j].heroTitle);
    if (overlap > 0.50) {
      warn(`Hero title overlap ${(overlap * 100).toFixed(0)}%: "${pages[i].heroTitle}" vs "${pages[j].heroTitle}"`, pages[i].slug);
      titleOverlapCount++;
    }
  }
}
if (titleOverlapCount === 0) {
  pass('All hero titles sufficiently unique (< 50% word overlap)');
} else {
  console.log(`  Found ${titleOverlapCount} pair(s) with > 50% word overlap`);
}

// A3: FAQ answer opener diversity
const faqOpeners = {};
for (const page of pages) {
  for (const faq of page.faqItems) {
    const opener = faq.answer.split(/[.!?]/)[0].trim().substring(0, 40);
    if (!faqOpeners[opener]) faqOpeners[opener] = [];
    faqOpeners[opener].push(page.slug);
  }
}
const repeatedOpeners = Object.entries(faqOpeners).filter(([, slugs]) => slugs.length > 5);
if (repeatedOpeners.length === 0) {
  pass('FAQ answers have diverse opening phrases');
} else {
  for (const [opener, slugs] of repeatedOpeners) {
    warn(`FAQ opener "${opener}..." repeated in ${slugs.length} pages`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// B. UNIQUE PRIMARY KEYWORDS
// ═══════════════════════════════════════════════════════════════════════════
header('B. Unique Primary Keywords');

const primaryKeywords = {};
let missingKeywords = 0;

for (const page of pages) {
  if (!page.seo.keywords) {
    fail(`Missing seo.keywords: ${page.slug}`, page.slug);
    missingKeywords++;
    continue;
  }
  const primary = page.seo.keywords.split(',')[0].trim().toLowerCase();
  if (!primaryKeywords[primary]) primaryKeywords[primary] = [];
  primaryKeywords[primary].push(page.slug);
}

const duplicatePrimaries = Object.entries(primaryKeywords).filter(([, slugs]) => slugs.length > 1);
if (duplicatePrimaries.length === 0 && missingKeywords === 0) {
  pass('All 33 pages have unique primary keywords');
} else {
  for (const [kw, slugs] of duplicatePrimaries) {
    fail(`Duplicate primary keyword "${kw}": ${slugs.join(', ')}`, slugs[0]);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// C. FAQ EDUCATIONAL QUALITY
// ═══════════════════════════════════════════════════════════════════════════
header('C. FAQ Educational Quality');

const educationTerms = ['student', 'learn', 'teach', 'skill', 'develop', 'practice', 'cognitive', 'curriculum', 'classroom', 'grade', 'pedagog', 'educat', 'instruc', 'assessment', 'literacy', 'numeracy', 'motor', 'child', 'kindergarten', 'preschool'];

let shortAnswerPages = 0;
let lowPedagogyPages = 0;
let brandSpamPages = 0;

for (const page of pages) {
  if (page.faqItems.length === 0) {
    fail(`No FAQ items found: ${page.slug}`, page.slug);
    continue;
  }

  // C1: Average answer length
  const avgLen = page.faqItems.reduce((sum, f) => sum + f.answer.length, 0) / page.faqItems.length;
  if (avgLen < 80) {
    warn(`Short FAQ answers (avg ${Math.round(avgLen)} chars): ${page.slug}`, page.slug);
    shortAnswerPages++;
  }

  // C2: Pedagogy ratio
  let pedagogicalCount = 0;
  for (const faq of page.faqItems) {
    const lower = faq.answer.toLowerCase();
    if (educationTerms.some(term => lower.includes(term))) {
      pedagogicalCount++;
    }
  }
  const ratio = pedagogicalCount / page.faqItems.length;
  if (ratio < 0.50) {
    warn(`Low pedagogy ratio (${(ratio * 100).toFixed(0)}%): ${page.slug}`, page.slug);
    lowPedagogyPages++;
  }

  // C3: Brand spam check (more than 3 mentions of "our app" or "LessonCraftStudio" without educational context)
  let brandMentions = 0;
  for (const faq of page.faqItems) {
    const lower = faq.answer.toLowerCase();
    const brandHits = (lower.match(/our app|lessoncraftstudio|our generator|our tool/g) || []).length;
    brandMentions += brandHits;
  }
  if (brandMentions > page.faqItems.length * 0.5) {
    warn(`High brand density (${brandMentions} mentions in ${page.faqItems.length} FAQs): ${page.slug}`, page.slug);
    brandSpamPages++;
  }
}

if (shortAnswerPages === 0) pass('All pages have substantial FAQ answers (avg >= 80 chars)');
if (lowPedagogyPages === 0) pass('All pages have >= 50% pedagogical FAQ content');
if (brandSpamPages === 0) pass('No pages have excessive brand mentions in FAQs');

// ═══════════════════════════════════════════════════════════════════════════
// D. RESEARCH CITATION QUALITY
// ═══════════════════════════════════════════════════════════════════════════
header('D. Research Citation Quality');

let lowCitationPages = 0;
let vagueSourcePages = 0;

for (const page of pages) {
  // D1: Minimum 2 research citations per page
  if (page.researchItems.length < 2) {
    warn(`Only ${page.researchItems.length} research citation(s): ${page.slug}`, page.slug);
    lowCitationPages++;
  }

  // D2: Check for vague sources
  for (const r of page.researchItems) {
    const lowerSource = r.source.toLowerCase();
    if (lowerSource.includes('experts say') || lowerSource.includes('studies show') || lowerSource === 'research') {
      fail(`Vague research source "${r.source}" in: ${page.slug}`, page.slug);
      vagueSourcePages++;
    }
  }
}

if (lowCitationPages === 0) pass('All pages have >= 2 research citations');
if (vagueSourcePages === 0) pass('All research citations have specific sources');

// ═══════════════════════════════════════════════════════════════════════════
// E. STRUCTURAL COMPLETENESS
// ═══════════════════════════════════════════════════════════════════════════
header('E. Structural Completeness');

const requiredSections = ['hero', 'samples', 'features', 'howTo', 'useCases', 'faq', 'pricing', 'relatedApps'];
const enrichmentFields = ['aiOverviewSnippet', 'comparisonTable', 'teacherTestimonials', 'researchBacking'];
let structuralIssues = 0;

for (const page of pages) {
  // E1: Required sections
  const missingSections = requiredSections.filter(s => !page.presentSections.includes(s));
  if (missingSections.length > 0) {
    fail(`Missing sections [${missingSections.join(', ')}]: ${page.slug}`, page.slug);
    structuralIssues++;
  }

  // E2: Enrichment fields
  if (!page.hasComparison) { fail(`Missing comparisonTable: ${page.slug}`, page.slug); structuralIssues++; }
  if (!page.hasTestimonials) { fail(`Missing teacherTestimonials: ${page.slug}`, page.slug); structuralIssues++; }
  if (!page.hasResearchBacking) { fail(`Missing researchBacking: ${page.slug}`, page.slug); structuralIssues++; }
  if (!page.aiSnippet) { fail(`Missing aiOverviewSnippet: ${page.slug}`, page.slug); structuralIssues++; }

  // E3: SEO metadata
  if (!page.seo.slug) { fail(`Missing seo.slug: ${page.slug}`, page.slug); structuralIssues++; }
  if (!page.seo.appId) { fail(`Missing seo.appId: ${page.slug}`, page.slug); structuralIssues++; }
  if (!page.seo.title) { fail(`Missing seo.title: ${page.slug}`, page.slug); structuralIssues++; }
  if (!page.seo.description) { fail(`Missing seo.description: ${page.slug}`, page.slug); structuralIssues++; }
  if (!page.seo.canonicalUrl) { fail(`Missing seo.canonicalUrl: ${page.slug}`, page.slug); structuralIssues++; }

  // E4: SEO title length (50-65 chars including site name)
  if (page.seo.title) {
    const tLen = page.seo.title.length;
    if (tLen < 40) warn(`Short SEO title (${tLen} chars): ${page.slug}`, page.slug);
    if (tLen > 70) warn(`Long SEO title (${tLen} chars): ${page.slug}`, page.slug);
  }

  // E5: Meta description length (120-160 chars)
  if (page.seo.description) {
    const dLen = page.seo.description.length;
    if (dLen < 100) warn(`Short meta description (${dLen} chars): ${page.slug}`, page.slug);
    if (dLen > 170) warn(`Long meta description (${dLen} chars): ${page.slug}`, page.slug);
  }
}

if (structuralIssues === 0) {
  pass('All 33 pages have complete structure (8 sections + 4 enrichment fields + SEO metadata)');
}

// ═══════════════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════════════
console.log(`\n${BOLD}═══════════════════════════════════════════════════════════════${RESET}`);
console.log(`${BOLD}FINAL RESULTS${RESET}`);
console.log(`${BOLD}═══════════════════════════════════════════════════════════════${RESET}`);
console.log(`  ${GREEN}PASS: ${totalPass}${RESET}`);
console.log(`  ${YELLOW}WARN: ${totalWarn}${RESET}`);
console.log(`  ${RED}FAIL: ${totalFail}${RESET}`);
console.log();

if (totalFail === 0) {
  console.log(`${GREEN}${BOLD}✓ ALL 33 PRODUCT PAGES PASS FINAL QA${RESET}`);
} else {
  console.log(`${RED}${BOLD}✗ ${totalFail} FAILURE(S) NEED ATTENTION${RESET}`);
}

// Write JSON output
const output = {
  timestamp: new Date().toISOString(),
  totalFiles: pages.length,
  results: { pass: totalPass, warn: totalWarn, fail: totalFail },
  issues,
  pages: pages.map(p => ({
    slug: p.slug,
    faqCount: p.faqItems.length,
    researchCount: p.researchItems.length,
    seoTitle: p.seo.title,
    primaryKeyword: p.seo.keywords ? p.seo.keywords.split(',')[0].trim() : '',
    hasAllSections: p.presentSections.length >= 8,
    hasAllEnrichment: p.hasComparison && p.hasTestimonials && p.hasResearchBacking && !!p.aiSnippet,
  })),
};

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`\nJSON report written to: ${OUTPUT_PATH}`);

process.exit(totalFail > 0 ? 1 : 0);
