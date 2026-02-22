#!/usr/bin/env node

/**
 * Keyword Ownership Validator (Part 15, extended in Part 159)
 *
 * Full-site keyword cannibalization detection across ALL page types:
 *   - Theme hub pages (50)
 *   - Theme+grade pages (250)
 *   - Product pages (33)
 *   - Grade hub pages (5)
 *   - Category hub pages (8)
 *
 * Checks:
 *   A. Primary keyword uniqueness (no two pages target the same keyword)
 *   B. Keyword placement (primary keyword in title, heading, description, intro)
 *   C. Near-duplicate detection (pages with >80% keyword token overlap)
 *
 * Usage:
 *   node scripts/validate-keyword-ownership.js                    # All locales
 *   node scripts/validate-keyword-ownership.js --locale en        # One locale
 *   node scripts/validate-keyword-ownership.js --strict           # Exit 1 on warnings
 *   node scripts/validate-keyword-ownership.js --json report.json # Save JSON report
 */

const fs = require('fs');
const path = require('path');

// ── Configuration ────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const THEMES_DIR = path.join(ROOT, 'frontend', 'content', 'themes');
const PRODUCT_DIR = path.join(ROOT, 'frontend', 'content', 'product-pages');

const GRADE_CONTENT_FILE = path.join(ROOT, 'frontend', 'config', 'grade-content.ts');
const CATEGORY_CONTENT_FILE = path.join(ROOT, 'frontend', 'config', 'category-content.ts');

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const ALL_GRADE_SLUGS = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
const ALL_CATEGORY_SLUGS = ['math', 'language-arts', 'word-games', 'art-creativity', 'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor'];

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

// Common stopwords for near-duplicate normalization (EN + common multi-lang)
const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'it', 'its', 'this', 'that', 'as', 'if', 'not', 'no', 'do', 'does',
  'did', 'will', 'would', 'can', 'could', 'has', 'have', 'had',
  'free', 'printable', 'worksheet', 'worksheets', 'kids', 'children',
  'und', 'der', 'die', 'das', 'de', 'la', 'le', 'les', 'el', 'los', 'las',
  'il', 'lo', 'gli', 'le', 'um', 'uma', 'os', 'as', 'het', 'een', 'en',
  'og', 'och', 'ja', 'ett', 'ei', 'et',
]);

// ── Helpers ──────────────────────────────────────────────────────────

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

function extractString(fieldName, source) {
  const reSingle = new RegExp(`(?:^|\\n)\\s*${fieldName}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 's');
  const m = source.match(reSingle);
  if (m) return resolveEscapes(m[1]);
  const reBacktick = new RegExp(`(?:^|\\n)\\s*${fieldName}:\\s*\`((?:[^\`\\\\]|\\\\.)*)\``, 's');
  const mb = source.match(reBacktick);
  if (mb) return resolveEscapes(mb[1]);
  return null;
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

/** Check if keyword appears in text using accented-char-safe boundary */
function keywordInText(keyword, text) {
  if (!keyword || !text) return false;
  const kw = keyword.toLowerCase().trim();
  const t = text.toLowerCase();
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?:^|[\\s,;.!?()])${escaped}(?:$|[\\s,;.!?()])`, 'i');
  return re.test(t);
}

function first100Words(text) {
  if (!text) return '';
  return text.split(/\s+/).slice(0, 100).join(' ');
}

function tokenize(text) {
  if (!text) return [];
  return text.toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u024F\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}

// ── Data Collection ──────────────────────────────────────────────────

function collectPages(locales) {
  const pages = [];

  for (const locale of locales) {
    // Theme hub pages
    for (const themeId of ALL_THEME_IDS) {
      const filePath = path.join(THEMES_DIR, themeId, `${locale}.ts`);
      const src = readFile(filePath);
      if (!src) continue;

      const title = extractString('title', src);
      const description = extractString('description', src);
      const keywords = extractString('keywords', src);
      const heading = extractString('heading', src);
      const intro = extractString('intro', src);

      if (keywords) {
        pages.push({
          pageType: 'theme-hub',
          pageId: `${themeId}/${locale}`,
          locale,
          primaryKeyword: keywords.split(',')[0].trim().toLowerCase(),
          allKeywords: keywords,
          title: title || '',
          heading: heading || '',
          description: description || '',
          introFirst100: first100Words(intro),
        });
      }

      // Theme+grade pages
      const gradeContentBlock = extractBlock(src, 'gradeContent');
      if (!gradeContentBlock) continue;

      for (const gradeId of ALL_GRADE_SLUGS) {
        const gradeBlock = extractBlock(gradeContentBlock, gradeId);
        if (!gradeBlock) continue;

        const seoTitle = extractField(gradeBlock, 'seoTitle');
        const seoDescription = extractField(gradeBlock, 'seoDescription');
        const seoKeywords = extractField(gradeBlock, 'seoKeywords');
        const gradeHeading = extractField(gradeBlock, 'heading') || heading;
        const gradeIntro = extractString('intro', gradeBlock);

        if (seoKeywords) {
          pages.push({
            pageType: 'theme-grade',
            pageId: `${themeId}/${gradeId}/${locale}`,
            locale,
            primaryKeyword: seoKeywords.split(',')[0].trim().toLowerCase(),
            allKeywords: seoKeywords,
            title: seoTitle || '',
            heading: gradeHeading || '',
            description: seoDescription || '',
            introFirst100: first100Words(gradeIntro),
          });
        }
      }
    }

    // Product pages
    const dir = path.join(PRODUCT_DIR, locale);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

    for (const file of files) {
      const src = readFile(path.join(dir, file));
      if (!src) continue;

      const seoBlock = extractBlock(src, 'seo');
      if (!seoBlock) continue;

      const title = extractField(seoBlock, 'title');
      const description = extractField(seoBlock, 'description');
      const keywords = extractField(seoBlock, 'keywords');
      const slug = extractField(seoBlock, 'slug') || file.replace('.ts', '');

      const heroBlock = extractBlock(src, 'hero');
      const heroTitle = heroBlock ? extractField(heroBlock, 'title') : null;
      let heroDesc = '';
      if (heroBlock) {
        const descMatch = heroBlock.match(/description:\s*`([\s\S]*?)`/);
        if (descMatch) heroDesc = resolveEscapes(descMatch[1]) || '';
        else {
          const descSingle = heroBlock.match(/description:\s*'((?:[^'\\]|\\.)*)'/s);
          if (descSingle) heroDesc = resolveEscapes(descSingle[1]) || '';
        }
      }

      if (keywords) {
        pages.push({
          pageType: 'product',
          pageId: `product/${slug}/${locale}`,
          locale,
          primaryKeyword: keywords.split(',')[0].trim().toLowerCase(),
          allKeywords: keywords,
          title: title || '',
          heading: heroTitle || '',
          description: description || '',
          introFirst100: first100Words(heroDesc),
        });
      }
    }
  }

  // Grade hub pages (from grade-content.ts)
  const gradeSrc = readFile(GRADE_CONTENT_FILE);
  if (gradeSrc) {
    for (const gradeSlug of ALL_GRADE_SLUGS) {
      const gradeBlock = extractBlock(gradeSrc, `'${gradeSlug}'`) || extractBlock(gradeSrc, gradeSlug);
      if (!gradeBlock) continue;

      for (const locale of locales) {
        const localeBlock = extractBlock(gradeBlock, locale);
        if (!localeBlock) continue;

        const title = extractField(localeBlock, 'title');
        const description = extractField(localeBlock, 'description');
        const keywords = extractField(localeBlock, 'keywords');
        const heading = extractField(localeBlock, 'heading');
        const intro = extractString('intro', localeBlock);

        if (keywords) {
          pages.push({
            pageType: 'grade-hub',
            pageId: `grade/${gradeSlug}/${locale}`,
            locale,
            primaryKeyword: keywords.split(',')[0].trim().toLowerCase(),
            allKeywords: keywords,
            title: title || '',
            heading: heading || '',
            description: description || '',
            introFirst100: first100Words(intro),
          });
        }
      }
    }
  }

  // Category hub pages (from category-content.ts)
  const catSrc = readFile(CATEGORY_CONTENT_FILE);
  if (catSrc) {
    for (const catSlug of ALL_CATEGORY_SLUGS) {
      const catBlock = extractBlock(catSrc, `'${catSlug}'`) || extractBlock(catSrc, catSlug);
      if (!catBlock) continue;

      for (const locale of locales) {
        const localeBlock = extractBlock(catBlock, locale);
        if (!localeBlock) continue;

        const title = extractField(localeBlock, 'title');
        const description = extractField(localeBlock, 'description');
        const keywords = extractField(localeBlock, 'keywords');
        const heading = extractField(localeBlock, 'heading');
        const intro = extractString('intro', localeBlock);

        if (keywords) {
          pages.push({
            pageType: 'category-hub',
            pageId: `category/${catSlug}/${locale}`,
            locale,
            primaryKeyword: keywords.split(',')[0].trim().toLowerCase(),
            allKeywords: keywords,
            title: title || '',
            heading: heading || '',
            description: description || '',
            introFirst100: first100Words(intro),
          });
        }
      }
    }
  }

  return pages;
}

// ── Checks ───────────────────────────────────────────────────────────

function checkPrimaryKeywordUniqueness(pages) {
  const issues = [];
  const byLocale = {};

  for (const p of pages) {
    if (!byLocale[p.locale]) byLocale[p.locale] = {};
    const kw = p.primaryKeyword;
    if (!kw) continue;
    if (!byLocale[p.locale][kw]) byLocale[p.locale][kw] = [];
    byLocale[p.locale][kw].push(p);
  }

  for (const [locale, kwMap] of Object.entries(byLocale)) {
    for (const [kw, group] of Object.entries(kwMap)) {
      if (group.length > 1) {
        issues.push({
          check: 'primary-kw-uniqueness',
          severity: 'fail',
          locale,
          keyword: kw,
          pages: group.map(p => ({ pageType: p.pageType, pageId: p.pageId })),
          detail: `"${kw}" targeted by ${group.length} pages: ${group.map(p => p.pageId).join(', ')}`,
        });
      }
    }
  }

  return issues;
}

function checkKeywordPlacement(pages) {
  const issues = [];

  for (const p of pages) {
    if (!p.primaryKeyword) continue;

    const kw = p.primaryKeyword;
    const locations = {
      title: keywordInText(kw, p.title),
      heading: keywordInText(kw, p.heading),
      description: keywordInText(kw, p.description),
      intro: keywordInText(kw, p.introFirst100),
    };

    const found = Object.values(locations).filter(Boolean).length;
    const missing = Object.entries(locations).filter(([, v]) => !v).map(([k]) => k);

    if (found < 3) {
      issues.push({
        check: 'kw-placement',
        severity: found < 2 ? 'fail' : 'warn',
        locale: p.locale,
        pageId: p.pageId,
        keyword: kw,
        found,
        missing,
        detail: `"${kw}" found in ${found}/4 locations, missing: ${missing.join(', ')}`,
      });
    }
  }

  return issues;
}

function checkNearDuplicates(pages) {
  const issues = [];
  const byLocale = {};

  for (const p of pages) {
    if (!byLocale[p.locale]) byLocale[p.locale] = [];
    byLocale[p.locale].push(p);
  }

  for (const [locale, localePages] of Object.entries(byLocale)) {
    // Tokenize all keywords per page
    const tokenized = localePages.map(p => ({
      page: p,
      tokens: new Set(tokenize(p.allKeywords)),
    }));

    for (let i = 0; i < tokenized.length; i++) {
      for (let j = i + 1; j < tokenized.length; j++) {
        const a = tokenized[i];
        const b = tokenized[j];
        if (a.tokens.size === 0 || b.tokens.size === 0) continue;

        // Jaccard similarity
        let intersection = 0;
        for (const t of a.tokens) {
          if (b.tokens.has(t)) intersection++;
        }
        const union = a.tokens.size + b.tokens.size - intersection;
        const similarity = union === 0 ? 0 : intersection / union;

        if (similarity > 0.8) {
          issues.push({
            check: 'near-duplicate',
            severity: 'warn',
            locale,
            pageA: a.page.pageId,
            pageB: b.page.pageId,
            similarity: Math.round(similarity * 100),
            detail: `${a.page.pageId} and ${b.page.pageId} share ${Math.round(similarity * 100)}% keyword tokens`,
          });
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

function icon(severity) {
  switch (severity) {
    case 'pass': return `${C.pass}\u2713${C.reset}`;
    case 'warn': return `${C.warn}\u26A0${C.reset}`;
    case 'fail': return `${C.fail}\u2717${C.reset}`;
    default: return '?';
  }
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  let locales = ALL_LOCALES;
  let strict = false;
  let jsonPath = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--locale' && args[i + 1]) {
      locales = [args[++i]];
    } else if (args[i] === '--strict') {
      strict = true;
    } else if (args[i] === '--json' && args[i + 1]) {
      jsonPath = args[++i];
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log('Keyword Ownership Validator (Part 15)');
      console.log('');
      console.log('Usage:');
      console.log('  --locale <id>      Validate specific locale');
      console.log('  --strict           Exit code 1 on any warning');
      console.log('  --json <path>      Save JSON report');
      process.exit(0);
    }
  }

  console.log(`${C.bold}Keyword Ownership Validator${C.reset}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Checking ${locales.length} locale(s)\n`);

  // Collect all pages
  const pages = collectPages(locales);
  console.log(`Collected ${pages.length} pages with keywords\n`);

  // Run checks
  const uniquenessIssues = checkPrimaryKeywordUniqueness(pages);
  const placementIssues = checkKeywordPlacement(pages);
  const duplicateIssues = checkNearDuplicates(pages);

  const allIssues = [...uniquenessIssues, ...placementIssues, ...duplicateIssues];

  // Display results
  console.log(`${C.bold}A. Primary Keyword Uniqueness${C.reset}`);
  if (uniquenessIssues.length === 0) {
    console.log(`  ${icon('pass')} No conflicts found`);
  } else {
    console.log(`  ${icon('fail')} ${uniquenessIssues.length} conflict(s):`);
    for (const iss of uniquenessIssues.slice(0, 20)) {
      console.log(`    ${icon(iss.severity)} [${iss.locale}] ${iss.detail}`);
    }
    if (uniquenessIssues.length > 20) {
      console.log(`    ${C.dim}... and ${uniquenessIssues.length - 20} more${C.reset}`);
    }
  }

  console.log(`\n${C.bold}B. Keyword Placement (primary kw in 3+ of 4 locations)${C.reset}`);
  const placementFails = placementIssues.filter(i => i.severity === 'fail');
  const placementWarns = placementIssues.filter(i => i.severity === 'warn');
  const placementPasses = pages.length - placementIssues.length;
  console.log(`  ${icon('pass')} ${placementPasses} pages pass`);
  if (placementWarns.length > 0) {
    console.log(`  ${icon('warn')} ${placementWarns.length} pages with warnings (2/4 locations)`);
  }
  if (placementFails.length > 0) {
    console.log(`  ${icon('fail')} ${placementFails.length} pages failing (<2/4 locations)`);
    for (const iss of placementFails.slice(0, 10)) {
      console.log(`    [${iss.locale}] ${iss.pageId}: ${iss.detail}`);
    }
    if (placementFails.length > 10) {
      console.log(`    ${C.dim}... and ${placementFails.length - 10} more${C.reset}`);
    }
  }

  console.log(`\n${C.bold}C. Near-Duplicate Detection (>80% keyword token overlap)${C.reset}`);
  if (duplicateIssues.length === 0) {
    console.log(`  ${icon('pass')} No near-duplicates found`);
  } else {
    console.log(`  ${icon('warn')} ${duplicateIssues.length} near-duplicate pair(s):`);
    for (const iss of duplicateIssues.slice(0, 15)) {
      console.log(`    ${icon(iss.severity)} [${iss.locale}] ${iss.detail}`);
    }
    if (duplicateIssues.length > 15) {
      console.log(`    ${C.dim}... and ${duplicateIssues.length - 15} more${C.reset}`);
    }
  }

  // Summary
  const totalFails = allIssues.filter(i => i.severity === 'fail').length;
  const totalWarns = allIssues.filter(i => i.severity === 'warn').length;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`${C.bold}Summary${C.reset}`);
  console.log(`  Pages analyzed: ${pages.length}`);
  console.log(`  ${C.fail}\u2717 Fails: ${totalFails}${C.reset}`);
  console.log(`  ${C.warn}\u26A0 Warnings: ${totalWarns}${C.reset}`);
  console.log(`  ${C.pass}\u2713 Clean: ${pages.length - placementIssues.length} pages with good keyword placement${C.reset}`);

  // JSON report
  if (jsonPath) {
    const dir = path.dirname(jsonPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const report = {
      timestamp: new Date().toISOString(),
      config: { locales },
      summary: {
        totalPages: pages.length,
        fails: totalFails,
        warnings: totalWarns,
        uniquenessConflicts: uniquenessIssues.length,
        placementIssues: placementIssues.length,
        nearDuplicates: duplicateIssues.length,
      },
      uniquenessIssues,
      placementIssues: placementIssues.slice(0, 200),
      duplicateIssues: duplicateIssues.slice(0, 100),
    };

    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`\nJSON report saved to: ${jsonPath}`);
  }

  // Exit code
  if (totalFails > 0) {
    process.exit(1);
  }
  if (strict && totalWarns > 0) {
    process.exit(1);
  }
}

main();
