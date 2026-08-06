#!/usr/bin/env node

/**
 * SEO Perfection Validator (Part 15)
 *
 * Master SEO quality gate for ALL page types across ALL 11 locales.
 * Validates SEO fundamentals (title, description, keywords, headings,
 * word counts, FAQs, snippets, internal links, keyword placement,
 * unique content signals) and cross-page uniqueness.
 *
 * Covers:
 *   A. 50 theme hub pages x 11 locales (550)
 *   B. 250 theme+grade pages x 11 locales (2750)
 *   C. 33 product pages x 11 locales (363)
 *
 * Usage:
 *   node scripts/validate-seo-perfection.js                        # All pages
 *   node scripts/validate-seo-perfection.js --theme animals        # Single theme
 *   node scripts/validate-seo-perfection.js --locale en            # One locale
 *   node scripts/validate-seo-perfection.js --type theme-hub       # One page type
 *   node scripts/validate-seo-perfection.js --strict               # Exit 1 on warnings
 *   node scripts/validate-seo-perfection.js --json report.json     # Save JSON report
 *   node scripts/validate-seo-perfection.js --baseline             # Baseline banner, summary only
 *
 * Part 15 of Landing Page SEO Perfection
 */

const fs = require('fs');
const path = require('path');

// ── Configuration ────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const THEMES_DIR = path.join(ROOT, 'frontend', 'content', 'themes');
const PRODUCT_DIR = path.join(ROOT, 'frontend', 'content', 'product-pages');

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

// ── Helpers (adapted from existing validators) ───────────────────────

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    return null;
  }
}

function resolveEscapes(str) {
  if (!str) return str;
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
}

function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  const clean = text.trim();
  if (!clean) return 0;
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function extractString(fieldName, source) {
  const reSingle = new RegExp(`(?:^|\\n)\\s*${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's');
  const m = source.match(reSingle);
  if (m) return resolveEscapes(m[1]);
  const reBacktick = new RegExp(`(?:^|\\n)\\s*${fieldName}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``, 's');
  const mb = source.match(reBacktick);
  if (mb) return resolveEscapes(mb[1]);
  return null;
}

function extractStringArray(fieldName, source) {
  const re = new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\]`, 's');
  const m = source.match(re);
  if (!m) return null;
  const items = [];
  const itemRe = /'((?:[^'\\]|\\.)*)'/g;
  let im;
  while ((im = itemRe.exec(m[1])) !== null) {
    items.push(resolveEscapes(im[1]));
  }
  return items.length > 0 ? items : null;
}

function extractBlock(text, blockName) {
  const patterns = [
    new RegExp(`['"]${blockName}['"]\\s*:\\s*\\{`),
    new RegExp(`${blockName}\\s*:\\s*\\{`),
  ];
  let braceStart = -1;
  for (const pat of patterns) {
    const m = pat.exec(text);
    if (m) {
      braceStart = text.indexOf('{', m.index);
      break;
    }
  }
  if (braceStart === -1) return null;

  let depth = 0;
  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') depth--;
    if (depth === 0) return text.slice(braceStart, i + 1);
  }
  return null;
}

function extractField(text, fieldName) {
  const re = new RegExp(`${fieldName}:\\s*['"\`]([^'"\`]*?)['"\`]`);
  const m = text.match(re);
  return m ? resolveEscapes(m[1]) : null;
}

function countArrayItems(source, blockName) {
  const re = new RegExp(`${blockName}:\\s*\\[([\\s\\S]*?)\\]`, 's');
  const m = source.match(re);
  if (!m) return 0;
  const block = m[1];
  // Count objects by matching opening braces at array-item level
  const matches = block.match(/\{/g);
  return matches ? matches.length : 0;
}

function countFaqItems(source) {
  // Direct array: faq: [...] (theme hub files)
  const direct = countArrayItems(source, 'faq');
  if (direct > 0) return direct;
  // Fallback: product files use faq: { items: [...] }
  const faqBlock = extractBlock(source, 'faq');
  if (!faqBlock) return 0;
  const itemsCount = countArrayItems(faqBlock, 'items');
  return itemsCount;
}

/** Check if keyword appears in text using accented-char-safe boundary */
function keywordInText(keyword, text) {
  if (!keyword || !text) return false;
  const kw = keyword.toLowerCase().trim();
  const t = text.toLowerCase();
  // Use loose boundary that works with accented characters
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?:^|[\\s,;.!?()])${escaped}(?:$|[\\s,;.!?()])`, 'i');
  return re.test(t);
}

// ── Parse Theme Hub Page ─────────────────────────────────────────────

function parseThemeHub(themeId, locale) {
  const filePath = path.join(THEMES_DIR, themeId, `${locale}.ts`);
  const src = readFile(filePath);
  if (!src) return null;

  const title = extractString('title', src);
  const description = extractString('description', src);
  const keywords = extractString('keywords', src);
  const heading = extractString('heading', src);
  const intro = extractString('intro', src);
  const educationalOverview = extractString('educationalOverview', src);
  const parentGuide = extractString('parentGuide', src);
  const snippetDefinition = extractString('snippetDefinition', src);
  const uniqueAngle = extractString('uniqueAngle', src);

  // Count productLinks
  const plSection = src.match(/productLinks:\s*\[([\s\S]*?)\],?\n/);
  const productLinksCount = plSection ? (plSection[1].match(/appId:/g) || []).length : 0;

  // Count relatedThemes
  const rtMatch = src.match(/relatedThemes:\s*\[([\s\S]*?)\]/);
  const relatedThemesCount = rtMatch ? (rtMatch[1].match(/'/g) || []).length / 2 : 0;

  const faqCount = countFaqItems(src);

  // Calculate total word count from intro + educationalOverview + parentGuide
  const totalWords = countWords(intro) + countWords(educationalOverview) + countWords(parentGuide);

  return {
    pageType: 'theme-hub',
    pageId: `${themeId}/${locale}`,
    locale,
    themeId,
    filePath,
    title,
    description,
    keywords,
    heading,
    intro,
    totalWords,
    faqCount,
    snippetDefinition,
    uniqueAngle,
    productLinksCount,
    relatedThemesCount,
    internalLinksCount: productLinksCount + Math.floor(relatedThemesCount),
  };
}

// ── Parse Theme+Grade Page ───────────────────────────────────────────

function parseThemeGrade(themeId, gradeId, locale) {
  const filePath = path.join(THEMES_DIR, themeId, `${locale}.ts`);
  const src = readFile(filePath);
  if (!src) return null;

  // Find grade block within gradeContent
  const gradeContentBlock = extractBlock(src, 'gradeContent');
  if (!gradeContentBlock) return null;

  const gradeBlock = extractBlock(gradeContentBlock, gradeId);
  if (!gradeBlock) return null;

  const seoTitle = extractField(gradeBlock, 'seoTitle');
  const seoDescription = extractField(gradeBlock, 'seoDescription');
  const seoKeywords = extractField(gradeBlock, 'seoKeywords');

  // Grade-level heading (Part 1 SEO field)
  const heading = extractField(gradeBlock, 'heading');

  const intro = extractString('intro', gradeBlock);
  const introWords = countWords(intro);

  const faqCount = countFaqItems(gradeBlock);

  const snippetAnswer = extractString('snippetAnswer', gradeBlock);
  const uniqueSummary = extractString('uniqueSummary', gradeBlock);

  // worksheetSuggestions count
  const wsMatch = gradeBlock.match(/worksheetSuggestions:\s*\[([\s\S]*?)\]/);
  const worksheetSuggestionsCount = wsMatch ? (wsMatch[1].match(/appId:/g) || []).length : 0;

  // Parent theme heading as fallback
  const parentHeading = extractString('heading', src);

  return {
    pageType: 'theme-grade',
    pageId: `${themeId}/${gradeId}/${locale}`,
    locale,
    themeId,
    gradeId,
    filePath,
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    heading: heading || parentHeading,
    intro,
    totalWords: introWords,
    faqCount,
    snippetAnswer,
    uniqueSummary,
    worksheetSuggestionsCount,
    internalLinksCount: worksheetSuggestionsCount,
  };
}

// ── Parse Product Page ───────────────────────────────────────────────

function parseProductPage(locale, fileName) {
  const filePath = path.join(PRODUCT_DIR, locale, fileName);
  const src = readFile(filePath);
  if (!src) return null;

  const seoBlock = extractBlock(src, 'seo');
  if (!seoBlock) return null;

  const title = extractField(seoBlock, 'title');
  const description = extractField(seoBlock, 'description');
  const keywords = extractField(seoBlock, 'keywords');
  const slug = extractField(seoBlock, 'slug') || fileName.replace('.ts', '');

  const heroBlock = extractBlock(src, 'hero');
  const heroTitle = heroBlock ? extractField(heroBlock, 'title') : null;

  // Hero description can be in backticks (multi-line)
  let heroDescWords = 0;
  if (heroBlock) {
    const descMatch = heroBlock.match(/description:\s*`([\s\S]*?)`/);
    if (descMatch) {
      heroDescWords = countWords(resolveEscapes(descMatch[1]));
    } else {
      const descSingle = heroBlock.match(/description:\s*'((?:[^'\\]|\\.)*)'/s);
      if (descSingle) {
        heroDescWords = countWords(resolveEscapes(descSingle[1]));
      }
    }
  }

  const faqCount = countFaqItems(src);

  return {
    pageType: 'product',
    pageId: `product/${slug}/${locale}`,
    locale,
    slug,
    filePath,
    title,
    description,
    keywords,
    heading: heroTitle,
    intro: null,
    totalWords: heroDescWords,
    faqCount,
    snippetDefinition: null,
    internalLinksCount: 0, // product pages don't have theme-style internal links
  };
}

// ── 10 Validation Checks ─────────────────────────────────────────────

function validatePage(page) {
  const checks = [];

  // 1. Title length 50-60 chars
  if (!page.title) {
    checks.push({ name: 'title-length', status: 'fail', detail: 'title missing' });
  } else {
    const len = page.title.length;
    if (len < 50) {
      checks.push({ name: 'title-length', status: 'fail', detail: `${len} chars (min 50)` });
    } else if (len > 60) {
      checks.push({ name: 'title-length', status: 'warn', detail: `${len} chars (max 60)` });
    } else {
      checks.push({ name: 'title-length', status: 'pass', detail: `${len} chars` });
    }
  }

  // 2. Description length 150-160 chars
  if (!page.description) {
    checks.push({ name: 'desc-length', status: 'fail', detail: 'description missing' });
  } else {
    const len = page.description.length;
    if (len < 150) {
      checks.push({ name: 'desc-length', status: 'fail', detail: `${len} chars (min 150)` });
    } else if (len > 160) {
      checks.push({ name: 'desc-length', status: 'warn', detail: `${len} chars (max 160)` });
    } else {
      checks.push({ name: 'desc-length', status: 'pass', detail: `${len} chars` });
    }
  }

  // 3. Keywords non-empty
  if (!page.keywords || page.keywords.trim().length === 0) {
    checks.push({ name: 'keywords', status: 'fail', detail: 'keywords missing or empty' });
  } else {
    checks.push({ name: 'keywords', status: 'pass', detail: `${page.keywords.split(',').length} keywords` });
  }

  // 4. H1/heading present (10+ chars)
  if (!page.heading) {
    checks.push({ name: 'heading', status: 'fail', detail: 'heading/H1 missing' });
  } else if (page.heading.length < 10) {
    checks.push({ name: 'heading', status: 'fail', detail: `${page.heading.length} chars (min 10)` });
  } else {
    checks.push({ name: 'heading', status: 'pass', detail: `${page.heading.length} chars` });
  }

  // 5. Word count minimum (varies by page type)
  const minWords = page.pageType === 'theme-hub' ? 800
    : page.pageType === 'theme-grade' ? 200
    : 400; // product
  if (page.totalWords < minWords) {
    checks.push({ name: 'word-count', status: 'fail', detail: `${page.totalWords} words (min ${minWords})` });
  } else {
    checks.push({ name: 'word-count', status: 'pass', detail: `${page.totalWords} words` });
  }

  // 6. FAQ count minimum
  const minFaq = page.pageType === 'theme-grade' ? 3 : 5;
  if (page.faqCount < minFaq) {
    checks.push({ name: 'faq-count', status: 'fail', detail: `${page.faqCount} FAQs (min ${minFaq})` });
  } else {
    checks.push({ name: 'faq-count', status: 'pass', detail: `${page.faqCount} FAQs` });
  }

  // 7. AI snippet presence
  if (page.pageType === 'theme-hub') {
    if (!page.snippetDefinition) {
      checks.push({ name: 'snippet', status: 'warn', detail: 'snippetDefinition missing' });
    } else {
      checks.push({ name: 'snippet', status: 'pass', detail: 'snippetDefinition present' });
    }
  } else if (page.pageType === 'theme-grade') {
    if (!page.snippetAnswer) {
      checks.push({ name: 'snippet', status: 'warn', detail: 'snippetAnswer missing' });
    } else {
      checks.push({ name: 'snippet', status: 'pass', detail: 'snippetAnswer present' });
    }
  } else {
    // Product pages: warn-only
    checks.push({ name: 'snippet', status: 'pass', detail: 'n/a for product pages' });
  }

  // 8. Internal links >= 3
  if (page.pageType === 'theme-hub') {
    if (page.internalLinksCount < 3) {
      checks.push({ name: 'internal-links', status: 'warn', detail: `${page.internalLinksCount} links (target 3+)` });
    } else {
      checks.push({ name: 'internal-links', status: 'pass', detail: `${page.internalLinksCount} links` });
    }
  } else if (page.pageType === 'theme-grade') {
    if (page.internalLinksCount < 2) {
      checks.push({ name: 'internal-links', status: 'warn', detail: `${page.worksheetSuggestionsCount} worksheet suggestions (target 2+)` });
    } else {
      checks.push({ name: 'internal-links', status: 'pass', detail: `${page.worksheetSuggestionsCount} worksheet suggestions` });
    }
  } else {
    // Product pages: warn-only, no structured internal links
    checks.push({ name: 'internal-links', status: 'pass', detail: 'n/a for product pages' });
  }

  // 9. Keywords in title (primary keyword appears in title)
  if (page.keywords && page.title) {
    const primary = page.keywords.split(',')[0].trim();
    if (keywordInText(primary, page.title)) {
      checks.push({ name: 'kw-in-title', status: 'pass', detail: `"${primary}" found in title` });
    } else {
      checks.push({ name: 'kw-in-title', status: 'warn', detail: `"${primary}" not found in title` });
    }
  } else {
    checks.push({ name: 'kw-in-title', status: 'fail', detail: 'cannot check (missing title or keywords)' });
  }

  // 10. Unique content signal
  if (page.pageType === 'theme-hub') {
    if (!page.uniqueAngle) {
      checks.push({ name: 'unique-signal', status: 'warn', detail: 'uniqueAngle missing' });
    } else {
      checks.push({ name: 'unique-signal', status: 'pass', detail: 'uniqueAngle present' });
    }
  } else if (page.pageType === 'theme-grade') {
    if (!page.uniqueSummary) {
      checks.push({ name: 'unique-signal', status: 'warn', detail: 'uniqueSummary missing' });
    } else {
      checks.push({ name: 'unique-signal', status: 'pass', detail: 'uniqueSummary present' });
    }
  } else {
    // Product: hero description >= 100 words
    if (page.totalWords >= 100) {
      checks.push({ name: 'unique-signal', status: 'pass', detail: `${page.totalWords} hero words` });
    } else {
      checks.push({ name: 'unique-signal', status: 'warn', detail: `${page.totalWords} hero words (target 100+)` });
    }
  }

  return checks;
}

// ── Cross-Page Validation ────────────────────────────────────────────

function crossPageValidation(allPages) {
  const issues = [];

  // Group by locale
  const byLocale = {};
  for (const page of allPages) {
    if (!byLocale[page.locale]) byLocale[page.locale] = [];
    byLocale[page.locale].push(page);
  }

  for (const [locale, pages] of Object.entries(byLocale)) {
    // A. Title uniqueness
    const titleMap = {};
    for (const p of pages) {
      if (!p.title) continue;
      const norm = p.title.toLowerCase().trim();
      if (!titleMap[norm]) titleMap[norm] = [];
      titleMap[norm].push(p);
    }
    for (const [title, group] of Object.entries(titleMap)) {
      if (group.length > 1) {
        issues.push({
          type: 'duplicate-title',
          severity: 'fail',
          locale,
          detail: `"${group[0].title}" shared by ${group.length} pages: ${group.map(p => p.pageId).join(', ')}`,
        });
      }
    }

    // B. Primary keyword uniqueness
    const kwMap = {};
    for (const p of pages) {
      if (!p.keywords) continue;
      const primary = p.keywords.split(',')[0].trim().toLowerCase();
      if (!primary) continue;
      if (!kwMap[primary]) kwMap[primary] = [];
      kwMap[primary].push(p);
    }
    for (const [kw, group] of Object.entries(kwMap)) {
      if (group.length > 1) {
        issues.push({
          type: 'duplicate-primary-kw',
          severity: 'warn',
          locale,
          detail: `"${kw}" shared by ${group.length} pages: ${group.map(p => p.pageId).join(', ')}`,
        });
      }
    }

    // C. Description similarity (>50-char shared substrings)
    const descs = pages.filter(p => p.description && p.description.length >= 50);
    for (let i = 0; i < descs.length; i++) {
      for (let j = i + 1; j < descs.length; j++) {
        const a = descs[i].description.toLowerCase();
        const b = descs[j].description.toLowerCase();
        for (let k = 0; k <= a.length - 50; k += 15) {
          const sub = a.substring(k, k + 50);
          if (b.includes(sub)) {
            issues.push({
              type: 'desc-similarity',
              severity: 'warn',
              locale,
              detail: `${descs[i].pageId} and ${descs[j].pageId} share >50 char description substring`,
            });
            break;
          }
        }
      }
    }
  }

  return issues;
}

// ── Display ──────────────────────────────────────────────────────────

const C = {
  pass: '\x1b[32m',
  warn: '\x1b[33m',
  fail: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
};

function icon(status) {
  switch (status) {
    case 'pass': return `${C.pass}\u2713${C.reset}`;
    case 'warn': return `${C.warn}\u26A0${C.reset}`;
    case 'fail': return `${C.fail}\u2717${C.reset}`;
    default: return '?';
  }
}

function printBaseline(allPages, allChecks, crossIssues) {
  console.log(`\n${C.bold}${C.cyan}${'='.repeat(60)}${C.reset}`);
  console.log(`${C.bold}${C.cyan}  BASELINE REPORT \u2014 failures expected at this stage${C.reset}`);
  console.log(`${C.bold}${C.cyan}${'='.repeat(60)}${C.reset}\n`);

  // Summary by page type
  const types = ['theme-hub', 'theme-grade', 'product'];
  for (const type of types) {
    const pages = allPages.filter(p => p.pageType === type);
    console.log(`  ${C.bold}${type}${C.reset}: ${pages.length} pages`);
  }
  console.log(`  ${C.bold}Total${C.reset}: ${allPages.length} pages\n`);

  // Summary by check type
  const checkSummary = {};
  for (const { checks } of allChecks) {
    for (const chk of checks) {
      if (!checkSummary[chk.name]) checkSummary[chk.name] = { pass: 0, warn: 0, fail: 0 };
      checkSummary[chk.name][chk.status]++;
    }
  }

  console.log(`  ${C.bold}Check Results by Type${C.reset}`);
  console.log(`  ${'Check'.padEnd(20)} ${'Pass'.padStart(6)} ${'Warn'.padStart(6)} ${'Fail'.padStart(6)}`);
  console.log(`  ${'-'.repeat(40)}`);
  for (const [name, counts] of Object.entries(checkSummary)) {
    const pStr = counts.pass > 0 ? `${C.pass}${counts.pass}${C.reset}` : `${counts.pass}`;
    const wStr = counts.warn > 0 ? `${C.warn}${counts.warn}${C.reset}` : `${counts.warn}`;
    const fStr = counts.fail > 0 ? `${C.fail}${counts.fail}${C.reset}` : `${counts.fail}`;
    console.log(`  ${name.padEnd(20)} ${String(counts.pass).padStart(6)} ${String(counts.warn).padStart(6)} ${String(counts.fail).padStart(6)}`);
  }

  // Totals
  let totalPass = 0, totalWarn = 0, totalFail = 0;
  for (const counts of Object.values(checkSummary)) {
    totalPass += counts.pass;
    totalWarn += counts.warn;
    totalFail += counts.fail;
  }

  console.log(`  ${'-'.repeat(40)}`);
  console.log(`  ${'TOTAL'.padEnd(20)} ${C.pass}${String(totalPass).padStart(6)}${C.reset} ${C.warn}${String(totalWarn).padStart(6)}${C.reset} ${C.fail}${String(totalFail).padStart(6)}${C.reset}`);

  console.log(`\n  Cross-page issues: ${crossIssues.length}`);
  if (crossIssues.length > 0) {
    const byType = {};
    for (const iss of crossIssues) {
      if (!byType[iss.type]) byType[iss.type] = 0;
      byType[iss.type]++;
    }
    for (const [type, count] of Object.entries(byType)) {
      console.log(`    ${type}: ${count}`);
    }
  }

  console.log(`\n${C.dim}  This baseline will improve as Parts 16-500 add SEO content.${C.reset}\n`);
}

function printDetailed(allPages, allChecks, crossIssues) {
  let totalPass = 0, totalWarn = 0, totalFail = 0;
  let pagesWithIssues = 0;

  for (const { page, checks } of allChecks) {
    const fails = checks.filter(c => c.status === 'fail');
    const warns = checks.filter(c => c.status === 'warn');
    const passes = checks.filter(c => c.status === 'pass');
    totalPass += passes.length;
    totalWarn += warns.length;
    totalFail += fails.length;

    if (fails.length > 0 || warns.length > 0) {
      pagesWithIssues++;
      console.log(`\n${C.bold}${page.pageId}${C.reset} [${page.pageType}]`);
      for (const chk of checks) {
        if (chk.status !== 'pass') {
          console.log(`  ${icon(chk.status)} ${chk.name}: ${chk.detail}`);
        }
      }
    }
  }

  if (crossIssues.length > 0) {
    console.log(`\n${C.bold}Cross-Page Issues${C.reset}`);
    for (const iss of crossIssues.slice(0, 50)) {
      console.log(`  ${icon(iss.severity)} [${iss.locale}] ${iss.type}: ${iss.detail}`);
    }
    if (crossIssues.length > 50) {
      console.log(`  ${C.dim}... and ${crossIssues.length - 50} more${C.reset}`);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`${C.bold}Summary${C.reset}`);
  console.log(`  Pages checked: ${allPages.length}`);
  console.log(`  Pages with issues: ${pagesWithIssues}`);
  console.log(`  ${C.pass}\u2713 Pass: ${totalPass}${C.reset}`);
  console.log(`  ${C.warn}\u26A0 Warn: ${totalWarn}${C.reset}`);
  console.log(`  ${C.fail}\u2717 Fail: ${totalFail}${C.reset}`);
  console.log(`  Cross-page issues: ${crossIssues.length}`);

  return { totalPass, totalWarn, totalFail, crossIssues: crossIssues.length };
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  let themes = ALL_THEME_IDS;
  let locales = ALL_LOCALES;
  let pageTypes = ['theme-hub', 'theme-grade', 'product'];
  let strict = false;
  let jsonPath = null;
  let baseline = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--theme' && args[i + 1]) {
      themes = [args[++i]];
    } else if (args[i] === '--locale' && args[i + 1]) {
      locales = [args[++i]];
    } else if (args[i] === '--type' && args[i + 1]) {
      pageTypes = [args[++i]];
    } else if (args[i] === '--strict') {
      strict = true;
    } else if (args[i] === '--json' && args[i + 1]) {
      jsonPath = args[++i];
    } else if (args[i] === '--baseline') {
      baseline = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('SEO Perfection Validator (Part 15)');
      console.log('');
      console.log('Usage:');
      console.log('  --theme <id>       Validate specific theme');
      console.log('  --locale <id>      Validate specific locale');
      console.log('  --type <type>      Filter: theme-hub | theme-grade | product');
      console.log('  --strict           Exit code 1 on any warning');
      console.log('  --json <path>      Save JSON report');
      console.log('  --baseline         Baseline mode: summary only, exit 0');
      process.exit(0);
    }
  }

  console.log(`${C.bold}SEO Perfection Validator${C.reset}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Checking ${themes.length} themes x ${locales.length} locales, types: ${pageTypes.join(', ')}`);

  // ── Collect all pages ──
  const allPages = [];

  if (pageTypes.includes('theme-hub')) {
    for (const themeId of themes) {
      for (const locale of locales) {
        const page = parseThemeHub(themeId, locale);
        if (page) allPages.push(page);
      }
    }
  }

  if (pageTypes.includes('theme-grade')) {
    for (const themeId of themes) {
      for (const locale of locales) {
        for (const gradeId of ALL_GRADE_IDS) {
          const page = parseThemeGrade(themeId, gradeId, locale);
          if (page) allPages.push(page);
        }
      }
    }
  }

  if (pageTypes.includes('product')) {
    for (const locale of locales) {
      const dir = path.join(PRODUCT_DIR, locale);
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
      for (const file of files) {
        const page = parseProductPage(locale, file);
        if (page) allPages.push(page);
      }
    }
  }

  console.log(`Found ${allPages.length} pages\n`);

  // ── Validate each page ──
  const allChecks = [];
  for (const page of allPages) {
    const checks = validatePage(page);
    allChecks.push({ page, checks });
  }

  // ── Cross-page validation ──
  const crossIssues = crossPageValidation(allPages);

  // ── Output ──
  let summary;
  if (baseline) {
    printBaseline(allPages, allChecks, crossIssues);
  } else {
    summary = printDetailed(allPages, allChecks, crossIssues);
  }

  // ── JSON report ──
  if (jsonPath) {
    // Ensure directory exists
    const dir = path.dirname(jsonPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const checkSummary = {};
    for (const { checks } of allChecks) {
      for (const chk of checks) {
        if (!checkSummary[chk.name]) checkSummary[chk.name] = { pass: 0, warn: 0, fail: 0 };
        checkSummary[chk.name][chk.status]++;
      }
    }

    let totalPass = 0, totalWarn = 0, totalFail = 0;
    for (const counts of Object.values(checkSummary)) {
      totalPass += counts.pass;
      totalWarn += counts.warn;
      totalFail += counts.fail;
    }

    const report = {
      timestamp: new Date().toISOString(),
      baseline,
      config: {
        themes: themes.length,
        locales: locales.length,
        pageTypes,
      },
      summary: {
        totalPages: allPages.length,
        totalPass,
        totalWarn,
        totalFail,
        crossIssues: crossIssues.length,
      },
      checkBreakdown: checkSummary,
      byPageType: {},
      crossIssues: crossIssues.slice(0, 100),
    };

    for (const type of pageTypes) {
      const pages = allChecks.filter(c => c.page.pageType === type);
      const typeFails = pages.reduce((sum, c) => sum + c.checks.filter(ch => ch.status === 'fail').length, 0);
      const typeWarns = pages.reduce((sum, c) => sum + c.checks.filter(ch => ch.status === 'warn').length, 0);
      const typePasses = pages.reduce((sum, c) => sum + c.checks.filter(ch => ch.status === 'pass').length, 0);
      report.byPageType[type] = {
        pages: pages.length,
        pass: typePasses,
        warn: typeWarns,
        fail: typeFails,
      };
    }

    // Per-page details (only pages with issues, to keep file manageable)
    report.pageIssues = allChecks
      .filter(c => c.checks.some(ch => ch.status !== 'pass'))
      .map(c => ({
        pageId: c.page.pageId,
        pageType: c.page.pageType,
        locale: c.page.locale,
        checks: c.checks.filter(ch => ch.status !== 'pass'),
      }));

    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`JSON report saved to: ${jsonPath}`);
  }

  // ── Exit code ──
  if (baseline) {
    process.exit(0);
  }

  let totalFail = 0, totalWarn = 0;
  for (const { checks } of allChecks) {
    for (const chk of checks) {
      if (chk.status === 'fail') totalFail++;
      if (chk.status === 'warn') totalWarn++;
    }
  }

  if (totalFail > 0 || crossIssues.some(i => i.severity === 'fail')) {
    process.exit(1);
  }
  if (strict && (totalWarn > 0 || crossIssues.length > 0)) {
    process.exit(1);
  }
}

main();
