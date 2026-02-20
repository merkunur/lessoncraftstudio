/**
 * Part 28: EN Product Page Enrichment Validation
 *
 * Audits all 33 English product-page content files across 7 dimensions:
 *   1. Enrichment field completeness (snippet, comparison, research, testimonials, tips)
 *   2. Teacher name & school uniqueness across all files
 *   3. Tips icon consistency (5 grade IDs with correct emoji)
 *   4. Keyword cannibalization detection
 *   5. SEO metadata completeness & length limits
 *   6. Structured data integrity (hero, samples, features, howTo, useCases, faq, pricing, relatedApps)
 *   7. Cross-reference summary table
 *
 * Usage: node scripts/validate-product-enrichment.js
 */

const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────────────────────
const CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');
const EXPECTED_FILE_COUNT = 33;

const EXPECTED_TIP_IDS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
// Icons can appear as literal emoji OR Unicode escapes in source text
// We normalise both forms in the check
const EXPECTED_TIP_ICONS_NORMALISED = [
  '\u{1F331}',  // preschool   - seedling
  '\u{1F392}',  // kindergarten - backpack
  '\u{1F4DA}',  // first-grade  - books
  '\u270F\uFE0F', // second-grade - pencil
  '\u{1F3AF}',  // third-grade  - target
];

// ── Helpers ─────────────────────────────────────────────────────────────────

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function pass(msg) { return `${GREEN}PASS${RESET} ${msg}`; }
function warn(msg) { return `${YELLOW}WARN${RESET} ${msg}`; }
function fail(msg) { return `${RED}FAIL${RESET} ${msg}`; }

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
  let depth = 0;
  let started = false;
  for (let i = startIdx; i < text.length; i++) {
    if (text[i] === open) { depth++; started = true; }
    if (text[i] === close) { depth--; }
    if (started && depth === 0) return text.slice(startIdx, i + 1);
  }
  return '';
}

/** Extract a single-quoted or backtick-quoted string starting after a key. */
function extractStringValue(text, key) {
  const patterns = [
    new RegExp(key + "\\s*:\\s*'([^']*(?:\\\\'[^']*)*)'"),
    new RegExp(key + '\\s*:\\s*`([^`]*)`'),
    new RegExp(key + '\\s*:\\s*"([^"]*(?:\\\\"[^"]*)*)"'),
  ];
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) return m[1];
  }
  return null;
}

/** Word count for a plain-text string. */
function wordCount(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/** Normalise an icon string — resolve JS unicode escapes found in source. */
function normaliseIcon(raw) {
  if (!raw) return '';
  // If the source text contains literal \u{...} or \uXXXX, resolve them
  try {
    // Replace \u{XXXX} with the actual char
    let resolved = raw.replace(/\\u\{([0-9A-Fa-f]+)\}/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    );
    // Replace \uXXXX (4-digit) with actual char
    resolved = resolved.replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
    return resolved;
  } catch {
    return raw;
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.ts')).sort();
console.log(`\n${BOLD}Part 28 — EN Product Page Enrichment Validation${RESET}`);
console.log(`Found ${files.length} files in ${CONTENT_DIR}\n`);

if (files.length !== EXPECTED_FILE_COUNT) {
  console.log(fail(`Expected ${EXPECTED_FILE_COUNT} files, found ${files.length}`));
}

let totalFails = 0;
let totalWarns = 0;

// Aggregation for cross-file checks
const allTeacherNames = [];   // { name, file }
const allSchoolNames = [];    // { school, file }
const allKeywords = {};       // keyword -> [file, ...]
const summaryRows = [];       // for Check 7 table

// ── Per-file checks ─────────────────────────────────────────────────────────

for (const fileName of files) {
  const filePath = path.join(CONTENT_DIR, fileName);
  const src = fs.readFileSync(filePath, 'utf8');
  const shortName = fileName.replace('.ts', '');
  const fileIssues = [];
  let fileFails = 0;

  // ─── Check 1: Enrichment field completeness ─────────────────────────────

  // 1a. aiOverviewSnippet
  const snippetMatch = src.match(/aiOverviewSnippet\s*:\s*[`'"]([\s\S]*?)[`'"]\s*,/);
  const snippetText = snippetMatch ? snippetMatch[1] : '';
  const snippetWords = wordCount(snippetText);
  if (!snippetText) {
    fileIssues.push(fail('aiOverviewSnippet: MISSING'));
    fileFails++;
  } else if (snippetWords < 30) {
    fileIssues.push(warn(`aiOverviewSnippet: only ${snippetWords} words (expected 40-80)`));
  } else if (snippetWords > 100) {
    fileIssues.push(warn(`aiOverviewSnippet: ${snippetWords} words (expected 40-80, slightly over is OK)`));
  }

  // 1b. comparisonTable — count rows by counting `feature:` inside the array
  const ctIdx = src.indexOf('comparisonTable:');
  let compRows = 0;
  if (ctIdx === -1) {
    fileIssues.push(fail('comparisonTable: MISSING'));
    fileFails++;
  } else {
    const bracketStart = src.indexOf('[', ctIdx);
    const ctSection = extractBracketed(src, bracketStart, '[', ']');
    compRows = countOccurrences(ctSection, 'feature:');
    if (compRows !== 6) {
      fileIssues.push(fail(`comparisonTable: ${compRows} rows (expected 6)`));
      fileFails++;
    }
  }

  // 1c. researchBacking
  const rbIdx = src.indexOf('researchBacking:');
  let researchItems = 0;
  if (rbIdx === -1) {
    fileIssues.push(fail('researchBacking: MISSING'));
    fileFails++;
  } else {
    const bracketStart = src.indexOf('[', rbIdx);
    const rbSection = extractBracketed(src, bracketStart, '[', ']');
    researchItems = countOccurrences(rbSection, 'claim:');
    if (researchItems !== 2) {
      fileIssues.push(fail(`researchBacking: ${researchItems} items (expected 2)`));
      fileFails++;
    }
  }

  // 1d. teacherTestimonials
  const ttIdx = src.indexOf('teacherTestimonials:');
  let testimonialCount = 0;
  const fileTeacherNames = [];
  const fileSchoolNames = [];
  if (ttIdx === -1) {
    fileIssues.push(fail('teacherTestimonials: MISSING'));
    fileFails++;
  } else {
    const bracketStart = src.indexOf('[', ttIdx);
    const ttSection = extractBracketed(src, bracketStart, '[', ']');
    testimonialCount = countOccurrences(ttSection, 'quote:');
    if (testimonialCount !== 2) {
      fileIssues.push(fail(`teacherTestimonials: ${testimonialCount} items (expected 2)`));
      fileFails++;
    }
    // Extract names
    const nameMatches = [...ttSection.matchAll(/name:\s*'([^']*)'/g)];
    for (const m of nameMatches) {
      fileTeacherNames.push(m[1]);
      allTeacherNames.push({ name: m[1], file: shortName });
    }
    // Extract schools
    const schoolMatches = [...ttSection.matchAll(/school:\s*'([^']*)'/g)];
    for (const m of schoolMatches) {
      fileSchoolNames.push(m[1]);
      allSchoolNames.push({ school: m[1], file: shortName });
    }
  }

  // 1e. tips
  const tipsIdx = src.indexOf('\n  tips:');
  let tipsItemCount = 0;
  const fileTipIds = [];
  const fileTipIcons = [];
  if (tipsIdx === -1) {
    fileIssues.push(fail('tips: MISSING'));
    fileFails++;
  } else {
    // Check sectionTitle and sectionDescription
    const tipsSection = src.slice(tipsIdx, src.indexOf('\n};', tipsIdx) + 3);
    if (!tipsSection.includes('sectionTitle:')) {
      fileIssues.push(fail('tips.sectionTitle: MISSING'));
      fileFails++;
    }
    if (!tipsSection.includes('sectionDescription:')) {
      fileIssues.push(fail('tips.sectionDescription: MISSING'));
      fileFails++;
    }
    // Count items
    const itemsIdx = tipsSection.indexOf('items:');
    if (itemsIdx !== -1) {
      const itemsBracket = tipsSection.indexOf('[', itemsIdx);
      const itemsBlock = extractBracketed(tipsSection, itemsBracket, '[', ']');
      // Extract ids
      const idMatches = [...itemsBlock.matchAll(/id:\s*'([^']*)'/g)];
      fileTipIds.push(...idMatches.map(m => m[1]));
      tipsItemCount = idMatches.length;
      // Extract icons (can be literal emoji or Unicode escapes in source)
      const iconMatches = [...itemsBlock.matchAll(/icon:\s*'([^']*)'/g)];
      fileTipIcons.push(...iconMatches.map(m => m[1]));
    }
    if (tipsItemCount !== 5) {
      fileIssues.push(fail(`tips.items: ${tipsItemCount} items (expected 5)`));
      fileFails++;
    }
  }

  // ─── Check 3: Tips icon consistency (per-file part) ─────────────────────
  // Tip IDs and icons may vary by app (some apps target different age ranges).
  // Non-standard IDs are WARNs, not FAILs.
  if (fileTipIds.length === 5) {
    for (let i = 0; i < 5; i++) {
      if (fileTipIds[i] !== EXPECTED_TIP_IDS[i]) {
        fileIssues.push(warn(`tips[${i}].id: '${fileTipIds[i]}' (standard is '${EXPECTED_TIP_IDS[i]}')`));
      }
    }
  }
  if (fileTipIcons.length === 5) {
    for (let i = 0; i < 5; i++) {
      const normIcon = normaliseIcon(fileTipIcons[i]);
      if (normIcon !== EXPECTED_TIP_ICONS_NORMALISED[i]) {
        fileIssues.push(warn(`tips[${i}].icon: got '${fileTipIcons[i]}' — standard is '${EXPECTED_TIP_ICONS_NORMALISED[i]}'`));
      }
    }
  }

  // ─── Check 5: SEO metadata completeness ─────────────────────────────────
  const seoFields = ['slug', 'appId', 'title', 'description', 'keywords', 'canonicalUrl'];
  for (const field of seoFields) {
    if (!src.includes(`${field}:`)) {
      fileIssues.push(fail(`seo.${field}: MISSING`));
      fileFails++;
    }
  }

  // Title length
  const titleMatch = src.match(/title:\s*'([^']*)'/);
  if (titleMatch) {
    const titleLen = titleMatch[1].length;
    if (titleLen > 60) {
      fileIssues.push(warn(`seo.title: ${titleLen} chars (recommended <= 60)`));
    }
  }

  // Description length
  const descMatch = src.match(/^\s*description:\s*'([^']*)'/m);
  if (descMatch) {
    const descLen = descMatch[1].length;
    if (descLen > 160) {
      fileIssues.push(warn(`seo.description: ${descLen} chars (recommended <= 160)`));
    }
  }

  // canonicalUrl pattern
  const canonMatch = src.match(/canonicalUrl:\s*'([^']*)'/);
  if (canonMatch) {
    const slugMatch = src.match(/slug:\s*'([^']*)'/);
    const expectedCanon = `https://www.lessoncraftstudio.com/en/apps/${slugMatch ? slugMatch[1] : '???'}`;
    if (canonMatch[1] !== expectedCanon) {
      fileIssues.push(fail(`canonicalUrl mismatch: '${canonMatch[1]}' vs expected '${expectedCanon}'`));
      fileFails++;
    }
  }

  // ─── Check 4: Keywords for cannibalization (collect) ────────────────────
  const kwMatch = src.match(/keywords:\s*'([^']*)'/);
  if (kwMatch) {
    const kws = kwMatch[1].split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
    for (const kw of kws) {
      if (!allKeywords[kw]) allKeywords[kw] = [];
      allKeywords[kw].push(shortName);
    }
  }

  // ─── Check 6: Structured data integrity ─────────────────────────────────
  const requiredSections = ['hero:', 'samples:', 'features:', 'howTo:', 'useCases:', 'faq:', 'pricing:', 'relatedApps:'];
  for (const section of requiredSections) {
    if (!src.includes(section)) {
      fileIssues.push(fail(`section ${section} MISSING`));
      fileFails++;
    }
  }

  // FAQ items should have id, question, answer
  const faqIdx = src.indexOf('faq:');
  if (faqIdx !== -1) {
    const faqBracketIdx = src.indexOf('[', src.indexOf('items:', faqIdx));
    if (faqBracketIdx !== -1) {
      const faqSection = extractBracketed(src, faqBracketIdx, '[', ']');
      const faqIds = (faqSection.match(/id:\s*'/g) || []).length;
      const faqQs = (faqSection.match(/question:\s*'/g) || []).length;
      const faqAs = (faqSection.match(/answer:\s*'/g) || []).length;
      if (faqIds !== faqQs || faqQs !== faqAs) {
        fileIssues.push(warn(`faq: id/question/answer count mismatch (${faqIds}/${faqQs}/${faqAs})`));
      }
    }
  }

  // HowTo steps should have id, number, title, description, icon
  const howToIdx = src.indexOf('howTo:');
  if (howToIdx !== -1) {
    // howTo uses `steps:` (not `items:`)
    const howToStepsIdx = src.indexOf('steps:', howToIdx);
    if (howToStepsIdx !== -1) {
      const howToBracketIdx = src.indexOf('[', howToStepsIdx);
      if (howToBracketIdx !== -1) {
        const howToSection = extractBracketed(src, howToBracketIdx, '[', ']');
        const stepCount = (howToSection.match(/number:\s*\d/g) || []).length;
        if (stepCount < 3) {
          fileIssues.push(warn(`howTo: only ${stepCount} steps found`));
        }
      }
    }
  }

  // ─── Collect summary row ────────────────────────────────────────────────
  const kwCount = kwMatch ? kwMatch[1].split(',').filter(k => k.trim()).length : 0;
  summaryRows.push({
    file: shortName,
    snippetWords,
    compRows,
    researchItems,
    testimonialCount,
    tipsItemCount,
    kwCount,
    fails: fileFails,
  });

  // ─── Print per-file results ─────────────────────────────────────────────
  if (fileIssues.length === 0) {
    console.log(pass(shortName));
  } else {
    console.log(`\n${BOLD}${shortName}${RESET}`);
    for (const issue of fileIssues) {
      console.log(`  ${issue}`);
    }
    totalFails += fileFails;
    totalWarns += fileIssues.length - fileFails;
  }
}

// ── Check 2: Teacher name & school uniqueness ─────────────────────────────
console.log(`\n${BOLD}Check 2: Teacher Name & School Uniqueness${RESET}`);

const nameCount = {};
for (const { name, file } of allTeacherNames) {
  if (!nameCount[name]) nameCount[name] = [];
  nameCount[name].push(file);
}
const dupNames = Object.entries(nameCount).filter(([, files]) => files.length > 1);
if (dupNames.length === 0) {
  console.log(pass(`All ${allTeacherNames.length} teacher names are unique`));
} else {
  for (const [name, files] of dupNames) {
    console.log(fail(`Duplicate teacher name '${name}' in: ${files.join(', ')}`));
    totalFails++;
  }
}

const schoolCount = {};
for (const { school, file } of allSchoolNames) {
  if (!schoolCount[school]) schoolCount[school] = [];
  schoolCount[school].push(file);
}
const dupSchools = Object.entries(schoolCount).filter(([, files]) => files.length > 1);
if (dupSchools.length === 0) {
  console.log(pass(`All ${allSchoolNames.length} school names are unique`));
} else {
  for (const [school, files] of dupSchools) {
    console.log(fail(`Duplicate school name '${school}' in: ${files.join(', ')}`));
    totalFails++;
  }
}

// ── Check 4: Keyword cannibalization ──────────────────────────────────────
console.log(`\n${BOLD}Check 4: Keyword Cannibalization${RESET}`);

const overlapKws = Object.entries(allKeywords)
  .filter(([, files]) => files.length >= 3)
  .sort((a, b) => b[1].length - a[1].length);

if (overlapKws.length === 0) {
  console.log(pass('No keyword appears in 3+ files'));
} else {
  console.log(warn(`${overlapKws.length} keywords appear in 3+ files (review for cannibalization):`));
  for (const [kw, files] of overlapKws.slice(0, 20)) {
    const uniqueFiles = [...new Set(files)];
    console.log(`  ${YELLOW}"${kw}"${RESET} -> ${uniqueFiles.length} files: ${uniqueFiles.slice(0, 5).join(', ')}${uniqueFiles.length > 5 ? '...' : ''}`);
    // Only count as warning, not fail — generic overlap is expected
  }
  if (overlapKws.length > 20) {
    console.log(`  ... and ${overlapKws.length - 20} more`);
  }
}

// ── Check 7: Cross-reference summary ──────────────────────────────────────
console.log(`\n${BOLD}Check 7: Cross-Reference Summary${RESET}`);
console.log('');

// Table header
const hdr = [
  'File'.padEnd(35),
  'Snip'.padStart(5),
  'Comp'.padStart(5),
  'Res'.padStart(4),
  'Test'.padStart(5),
  'Tips'.padStart(5),
  'KWs'.padStart(4),
  'Status'.padStart(8),
].join(' | ');
console.log(hdr);
console.log('-'.repeat(hdr.length));

for (const row of summaryRows) {
  const status = row.fails > 0 ? `${RED}FAIL${RESET}` : `${GREEN}OK${RESET}`;
  const line = [
    row.file.padEnd(35),
    String(row.snippetWords).padStart(5),
    String(row.compRows).padStart(5),
    String(row.researchItems).padStart(4),
    String(row.testimonialCount).padStart(5),
    String(row.tipsItemCount).padStart(5),
    String(row.kwCount).padStart(4),
    status.padStart(8 + (status.length - 4)), // account for ANSI codes
  ].join(' | ');
  console.log(line);
}

// ── Final summary ─────────────────────────────────────────────────────────
console.log(`\n${'='.repeat(60)}`);
console.log(`${BOLD}TOTAL: ${files.length} files | ${totalFails} FAILs | ${totalWarns} WARNs${RESET}`);
if (totalFails === 0) {
  console.log(`${GREEN}${BOLD}ALL CHECKS PASSED${RESET}`);
} else {
  console.log(`${RED}${BOLD}${totalFails} FAILURES — review above${RESET}`);
}
console.log('');

process.exit(totalFails > 0 ? 1 : 0);
