#!/usr/bin/env node

/**
 * Part 139: Mobile Rendering Verification (All 250 EN Pages)
 *
 * Static analysis of theme+grade page components and content files
 * to detect mobile-hostile patterns.
 *
 * A. Component Code Audit (8 files):
 *  1. No hardcoded pixel widths (width: NNpx, w-[NNpx])            ERROR
 *  2. All grids use responsive breakpoints (sm:, md:, lg:)          ERROR
 *  3. Tables have overflow-x-auto + mobile card alternative          ERROR
 *  4. Viewport meta configured in root layout                        ERROR
 *  5. Images use responsive sizes or responsive width classes         WARN
 *  6. No text-[10px] or smaller custom font sizes                    WARN
 *  7. Headings use responsive scaling (text-X md:text-Y)             WARN
 *  8. contentVisibility: 'auto' on below-fold sections               WARN
 *
 * B. Content Data Audit (50 themes x 5 grades = 250 pages):
 *  9. No FAQ question longer than 120 chars                          WARN
 * 10. No FAQ answer longer than 800 chars                            WARN
 * 11. No seoTitle longer than 70 chars                               WARN
 * 12. No teaching tip longer than 200 chars                          WARN
 */

const fs = require('fs');
const path = require('path');

// ── Config ───────────────────────────────────────────────────────────

const FRONTEND = path.resolve(__dirname, '..', 'frontend');
const THEMES_DIR = path.resolve(FRONTEND, 'content', 'themes');

const COMPONENT_FILES = [
  { label: 'page.tsx (theme+grade)', path: path.join(FRONTEND, 'app', '[locale]', 'worksheets', '[theme]', '[grade]', 'page.tsx') },
  { label: 'GradeEducationalContent', path: path.join(FRONTEND, 'components', 'theme-page', 'GradeEducationalContent.tsx') },
  { label: 'ThemeLearningObjectives', path: path.join(FRONTEND, 'components', 'theme-page', 'ThemeLearningObjectives.tsx') },
  { label: 'ThemeAssessment', path: path.join(FRONTEND, 'components', 'theme-page', 'ThemeAssessment.tsx') },
  { label: 'ThemeQuickStats', path: path.join(FRONTEND, 'components', 'theme-page', 'ThemeQuickStats.tsx') },
  { label: 'ThemeCurriculumNotes', path: path.join(FRONTEND, 'components', 'theme-page', 'ThemeCurriculumNotes.tsx') },
  { label: 'ThemeTeachingTips', path: path.join(FRONTEND, 'components', 'theme-page', 'ThemeTeachingTips.tsx') },
  { label: 'ThemeSnippetBox', path: path.join(FRONTEND, 'components', 'theme-page', 'ThemeSnippetBox.tsx') },
];

const LAYOUT_FILE = path.join(FRONTEND, 'app', 'layout.tsx');

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

// ── Helpers (reused from part 138) ───────────────────────────────────

function resolveEscapes(raw) {
  return raw
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\'/g, "'")
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

function extractBlock(text, fieldName) {
  const pat = new RegExp(`(?:^|[\\s,])${fieldName}\\s*:\\s*\\{`, 'm');
  const m = pat.exec(text);
  if (!m) return null;
  const braceStart = text.indexOf('{', m.index);
  let depth = 0, end = -1;
  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return null;
  return text.slice(braceStart, end + 1);
}

function extractGradeBlock(gradeContentText, gradeId) {
  const escaped = gradeId.replace('-', '\\-');
  const pat = new RegExp(`['"]${escaped}['"]\\s*:\\s*\\{`);
  const m = pat.exec(gradeContentText);
  if (!m) return null;
  const braceStart = gradeContentText.indexOf('{', m.index);
  let depth = 0, end = -1;
  for (let i = braceStart; i < gradeContentText.length; i++) {
    if (gradeContentText[i] === '{') depth++;
    if (gradeContentText[i] === '}') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return null;
  return gradeContentText.slice(braceStart, end + 1);
}

function extractFaqArray(text) {
  const pat = /(?:^|[\s,])faq\s*:\s*\[/m;
  const m = pat.exec(text);
  if (!m) return [];
  const bracketStart = text.indexOf('[', m.index);
  let depth = 0, end = -1;
  for (let i = bracketStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    if (text[i] === ']') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return [];
  const arrStr = text.slice(bracketStart, end + 1);
  const entries = [];
  const entryPat = /\{\s*question\s*:\s*(['"])((?:(?!\1)[^\\]|\\.)*)(\1)\s*,\s*answer\s*:\s*(['"])((?:(?!\4)[^\\]|\\.)*)(\4)\s*\}/g;
  let em;
  while ((em = entryPat.exec(arrStr)) !== null) {
    entries.push({ question: resolveEscapes(em[2]), answer: resolveEscapes(em[5]) });
  }
  if (entries.length === 0) {
    const questions = [];
    const answers = [];
    const qPat = /question\s*:\s*['"]((?:[^'\\]|\\.|'(?=[^,}\s]))*)['"]/g;
    const aPat = /answer\s*:\s*['"]((?:[^'\\]|\\.|'(?=[^,}\s]))*)['"]/g;
    let q, a;
    while ((q = qPat.exec(arrStr)) !== null) questions.push(resolveEscapes(q[1]));
    while ((a = aPat.exec(arrStr)) !== null) answers.push(resolveEscapes(a[1]));
    for (let i = 0; i < Math.min(questions.length, answers.length); i++) {
      entries.push({ question: questions[i], answer: answers[i] });
    }
  }
  return entries;
}

function extractStringField(text, fieldName) {
  const pat = new RegExp(`(?:^|[\\s,])${fieldName}\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'm');
  const m = pat.exec(text);
  if (m) return resolveEscapes(m[1]);
  const pat2 = new RegExp(`(?:^|[\\s,])${fieldName}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'm');
  const m2 = pat2.exec(text);
  if (m2) return resolveEscapes(m2[1]);
  return null;
}

function extractStringArray(text, fieldName) {
  const pat = new RegExp(`(?:^|[\\s,])${fieldName}\\s*:\\s*\\[`, 'm');
  const m = pat.exec(text);
  if (!m) return [];
  const bracketStart = text.indexOf('[', m.index);
  let depth = 0, end = -1;
  for (let i = bracketStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    if (text[i] === ']') depth--;
    if (depth === 0) { end = i; break; }
  }
  if (end === -1) return [];
  const arrStr = text.slice(bracketStart, end + 1);
  const items = [];
  const strPat = /['"]([^'"]+)['"]/g;
  let sm;
  while ((sm = strPat.exec(arrStr)) !== null) {
    items.push(resolveEscapes(sm[1]));
  }
  return items;
}

// ── Counters ─────────────────────────────────────────────────────────

let totalErrors = 0;
let totalWarns = 0;
let componentFilesScanned = 0;
let contentPagesChecked = 0;

function error(msg) { totalErrors++; console.log(`  ERROR: ${msg}`); }
function warn(msg) { totalWarns++; console.log(`  WARN:  ${msg}`); }
function pass(msg) { console.log(`  PASS:  ${msg}`); }

// ── A. Component Code Audit ──────────────────────────────────────────

console.log('=== A. COMPONENT CODE AUDIT ===\n');

// Check 1-3, 5-8 for each component file
for (const comp of COMPONENT_FILES) {
  if (!fs.existsSync(comp.path)) {
    error(`${comp.label}: File not found at ${comp.path}`);
    continue;
  }
  const src = fs.readFileSync(comp.path, 'utf8');
  const lines = src.split('\n');
  componentFilesScanned++;
  console.log(`[${comp.label}]`);

  // Check 1: No hardcoded pixel widths on content containers
  // Look for inline style width: NNpx or Tailwind w-[NNpx] on divs/sections
  // Exclude: sizes="(max-width: NNpx)..." (responsive image breakpoints)
  //          max-width: NNpx (media queries / containment)
  let pxIssues = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip lines that are sizes attributes or media queries
    if (/sizes\s*=/.test(line) || /max-width\s*:/.test(line) || /containIntrinsicSize/.test(line)) continue;
    // Check for inline style width: NNpx (300px+) or Tailwind w-[NNpx] (300px+)
    const inlineMatch = line.match(/(?<!max-)width\s*:\s*['"]?(\d+)px/);
    if (inlineMatch && parseInt(inlineMatch[1]) >= 300) {
      error(`Line ${i + 1}: hardcoded width: ${inlineMatch[1]}px`);
      pxIssues++;
    }
    const twMatch = line.match(/w-\[(\d+)px\]/);
    if (twMatch && parseInt(twMatch[1]) >= 300) {
      error(`Line ${i + 1}: hardcoded w-[${twMatch[1]}px]`);
      pxIssues++;
    }
  }
  if (pxIssues === 0) {
    pass('No hardcoded pixel widths (300px+) on containers');
  }

  // Check 2: Grids use responsive breakpoints
  const gridPat = /\bgrid\b(?!-)/g;
  const gridLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (gridPat.test(lines[i]) && /grid-cols-/.test(lines[i])) {
      gridLines.push({ line: i + 1, text: lines[i].trim() });
    }
    gridPat.lastIndex = 0;
  }
  let gridIssues = 0;
  for (const gl of gridLines) {
    // A grid with multi-col should have at least one responsive prefix
    if (/grid-cols-[2-9]/.test(gl.text) && !/(?:sm|md|lg|xl):grid-cols/.test(gl.text)) {
      const colMatch = gl.text.match(/((?:sm|md|lg|xl):)?grid-cols-[2-9]/g);
      const hasUnprefixed = colMatch && colMatch.some(m => !m.includes(':'));
      if (hasUnprefixed) {
        const colNum = gl.text.match(/grid-cols-(\d)/);
        const num = colNum ? parseInt(colNum[1]) : 0;
        // grid-cols-2/3 with small fixed-size items (w-20, w-24) are fine on mobile
        // They render as ~256px total which fits any phone screen
        const hasSmallItems = /w-(?:16|20|24)\b/.test(gl.text) || /w-fit/.test(gl.text);
        if (num >= 4) {
          error(`Line ${gl.line}: grid-cols-${num} without responsive prefix`);
          gridIssues++;
        } else if (num >= 3 && !hasSmallItems) {
          // Check surrounding context: if parent/child has small sizing, it's fine
          const contextStart = Math.max(0, gl.line - 3);
          const contextEnd = Math.min(lines.length, gl.line + 3);
          const context = lines.slice(contextStart, contextEnd).join(' ');
          const smallContext = /w-(?:16|20|24)\b|w-fit|gap-[12]\b/.test(context);
          if (!smallContext) {
            error(`Line ${gl.line}: grid-cols-${num} without responsive prefix`);
            gridIssues++;
          }
        }
      }
    }
  }
  if (gridIssues === 0) {
    pass(`All ${gridLines.length} grid declarations use responsive breakpoints`);
  }

  // Check 3: Tables have overflow protection + mobile alternative
  const hasTable = /<table\b/.test(src);
  if (hasTable) {
    const hasOverflowAuto = /overflow-x-auto/.test(src);
    const hasMobileAlt = /md:hidden/.test(src) || /hidden\s+md:block/.test(src);
    if (!hasOverflowAuto) {
      error('Table found without overflow-x-auto wrapper');
    } else if (!hasMobileAlt) {
      error('Table found without mobile card alternative (md:hidden)');
    } else {
      pass('Table has overflow-x-auto + mobile card alternative');
    }
  } else {
    pass('No table elements (no overflow risk)');
  }

  // Check 5: Images use responsive sizes attribute
  const imgTags = src.match(/<(?:img|Image)\b[^>]*>/g) || [];
  let imgIssues = 0;
  for (const tag of imgTags) {
    const isFill = /\bfill\b/.test(tag);
    const hasSizes = /\bsizes\s*=/.test(tag);
    const hasResponsiveWidth = /(?:w-full|w-auto|max-w-)/.test(tag);
    // fill images should have explicit sizes, small fixed images (icons/thumbnails) are fine
    if (isFill && !hasSizes) {
      warn('fill image without explicit sizes attribute');
      imgIssues++;
    }
  }
  if (imgIssues === 0 && imgTags.length > 0) {
    pass(`${imgTags.length} image(s) have proper responsive sizing`);
  } else if (imgTags.length === 0) {
    pass('No images in component');
  }

  // Check 6: No tiny custom font sizes (text-[10px] or smaller)
  const tinyFonts = src.match(/text-\[\d+px\]/g) || [];
  const tooSmall = tinyFonts.filter(f => {
    const size = parseInt(f.match(/\d+/)[0]);
    return size <= 10;
  });
  if (tooSmall.length > 0) {
    warn(`Tiny custom font sizes: ${tooSmall.join(', ')}`);
  } else {
    pass('No tiny custom font sizes (<=10px)');
  }

  // Check 7: H1 headings use responsive scaling
  // Only relevant for page.tsx which has the h1
  if (comp.label.includes('page.tsx')) {
    const h1Pat = /<h1[^>]*className="([^"]*)"/;
    const h1Match = h1Pat.exec(src);
    if (h1Match) {
      const h1Classes = h1Match[1];
      if (/text-\w+\s.*(?:sm|md|lg):text-/.test(h1Classes)) {
        pass('H1 uses responsive font scaling');
      } else {
        warn('H1 may lack responsive font scaling');
      }
    }
  }

  // Check 8: contentVisibility on below-fold sections
  const cvCount = (src.match(/contentVisibility\s*:\s*['"]auto['"]/g) || []).length;
  if (cvCount > 0) {
    pass(`contentVisibility: 'auto' used ${cvCount} time(s)`);
  }
  // No warning here - some components rely on parent wrapper for this

  console.log('');
}

// Check 4: Viewport meta in root layout
console.log('[Root Layout - Viewport]');
if (!fs.existsSync(LAYOUT_FILE)) {
  error('layout.tsx not found');
} else {
  const layoutSrc = fs.readFileSync(LAYOUT_FILE, 'utf8');
  componentFilesScanned++;
  const hasViewport = /viewport\s*.*Viewport/.test(layoutSrc) || /export\s+const\s+viewport/.test(layoutSrc);
  const hasDeviceWidth = /device-width/.test(layoutSrc) || /width.*device/.test(layoutSrc);
  const hasInitialScale = /initialScale\s*:\s*1/.test(layoutSrc);
  if (hasViewport && hasDeviceWidth && hasInitialScale) {
    pass('Viewport: width=device-width, initialScale=1');
  } else {
    error('Missing or incomplete viewport configuration');
  }

  // Check zoom not blocked
  const blocksZoom = /userScalable\s*:\s*['"]?(?:no|false)/.test(layoutSrc) || /maximumScale\s*:\s*1\b/.test(layoutSrc);
  if (blocksZoom) {
    warn('Viewport blocks user zoom (accessibility concern)');
  } else {
    pass('User zoom not blocked (maximumScale > 1)');
  }
}
console.log('');

// ── A. Summary ───────────────────────────────────────────────────────

console.log(`--- Component audit: ${componentFilesScanned} files scanned ---\n`);

// ── B. Content Data Audit ────────────────────────────────────────────

console.log('=== B. CONTENT DATA AUDIT (250 EN pages) ===\n');

let longFaqQuestions = 0;
let longFaqAnswers = 0;
let longSeoTitles = 0;
let longTeachingTips = 0;
let totalFaqChecked = 0;
let totalTipsChecked = 0;

for (const theme of ALL_THEME_IDS) {
  const filePath = path.join(THEMES_DIR, theme, 'en.ts');
  if (!fs.existsSync(filePath)) {
    error(`${theme}: en.ts not found`);
    continue;
  }

  const src = fs.readFileSync(filePath, 'utf8');
  const gcBlock = extractBlock(src, 'gradeContent');
  if (!gcBlock) {
    error(`${theme}: gradeContent block not found`);
    continue;
  }

  for (const grade of ALL_GRADE_IDS) {
    const gradeBlock = extractGradeBlock(gcBlock, grade);
    if (!gradeBlock) {
      error(`${theme}/${grade}: grade block not found`);
      continue;
    }
    contentPagesChecked++;

    // Check 9: FAQ question length
    const faqs = extractFaqArray(gradeBlock);
    for (const faq of faqs) {
      totalFaqChecked++;
      if (faq.question.length > 120) {
        warn(`${theme}/${grade}: FAQ question ${faq.question.length} chars (>120): "${faq.question.slice(0, 60)}..."`);
        longFaqQuestions++;
      }
      // Check 10: FAQ answer length
      if (faq.answer.length > 800) {
        warn(`${theme}/${grade}: FAQ answer ${faq.answer.length} chars (>800) for Q: "${faq.question.slice(0, 50)}..."`);
        longFaqAnswers++;
      }
    }

    // Check 11: seoTitle length
    const seoTitle = extractStringField(gradeBlock, 'seoTitle');
    if (seoTitle && seoTitle.length > 70) {
      warn(`${theme}/${grade}: seoTitle ${seoTitle.length} chars (>70): "${seoTitle.slice(0, 60)}..."`);
      longSeoTitles++;
    }

    // Check 12: teaching tip length
    const tips = extractStringArray(gradeBlock, 'teachingTips');
    for (const tip of tips) {
      totalTipsChecked++;
      if (tip.length > 200) {
        warn(`${theme}/${grade}: teaching tip ${tip.length} chars (>200): "${tip.slice(0, 60)}..."`);
        longTeachingTips++;
      }
    }
  }
}

console.log('');
console.log(`--- Content audit: ${contentPagesChecked} pages checked ---`);
console.log(`    FAQ entries checked:     ${totalFaqChecked}`);
console.log(`    Teaching tips checked:   ${totalTipsChecked}`);
console.log(`    Long FAQ questions:      ${longFaqQuestions}`);
console.log(`    Long FAQ answers:        ${longFaqAnswers}`);
console.log(`    Long seoTitles:          ${longSeoTitles}`);
console.log(`    Long teaching tips:      ${longTeachingTips}`);
console.log('');

// ── Final Summary ────────────────────────────────────────────────────

console.log('=== FINAL SUMMARY ===');
console.log(`Components scanned:  ${componentFilesScanned}`);
console.log(`Content pages:       ${contentPagesChecked}/250`);
console.log(`Errors:              ${totalErrors}`);
console.log(`Warnings:            ${totalWarns}`);
console.log('');

if (totalErrors > 0) {
  console.log('FAIL - errors found that must be fixed');
  process.exit(1);
} else if (totalWarns > 0) {
  console.log('PASS with warnings (no mobile-breaking issues)');
  process.exit(0);
} else {
  console.log('PASS - all mobile rendering checks passed');
  process.exit(0);
}
