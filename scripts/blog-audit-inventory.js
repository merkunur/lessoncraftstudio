/**
 * Blog Inventory Audit — Step 0
 *
 * Counts posts per language, detects zombie (old teacher-focused) content,
 * catalogs old URLs, and generates summary report.
 *
 * Usage: node scripts/blog-audit-inventory.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// All 112 required blogIds (extracted from blog-page-slugs.ts)
const REQUIRED_BLOG_IDS = [
  'sell-addition-worksheets-etsy-guide', 'sell-subtraction-worksheets-online',
  'code-addition-puzzles-sell-etsy', 'math-worksheet-bundles-that-sell',
  'math-puzzle-books-amazon-kdp', 'chart-count-worksheets-business',
  'word-search-printables-profit', 'crossword-books-kdp-niche',
  'cryptogram-worksheets-sell', 'word-scramble-printables-business',
  'word-guess-game-worksheets-sell', 'handwriting-worksheets-etsy-niche',
  'matching-worksheets-toddler-market', 'tracing-worksheets-fine-motor-sell',
  'hidden-object-worksheets-business', 'grid-matching-puzzles-sell',
  'find-and-count-printables-profit', 'missing-pieces-puzzles-kdp',
  'shadow-matching-worksheets-sell', 'picture-maze-worksheets-business',
  'sorting-worksheets-preschool-sell', 'preposition-worksheets-esl-market',
  'coloring-pages-business-2026', 'draw-and-color-worksheets-sell',
  'alphabet-worksheets-best-sellers', 'bingo-cards-printable-business',
  'pattern-worksheets-sell-online', 'pattern-train-worksheets-niche',
  'treasure-hunt-printables-sell', 'picture-sudoku-books-kdp',
  'size-comparison-worksheets-sell', 'more-less-worksheets-sell',
  'odd-one-out-worksheets-sell', 'etsy-printable-shop-first-month',
  'etsy-seo-printable-sellers-2026', 'etsy-listing-optimization-worksheets',
  'kdp-activity-book-formatting-guide', 'kdp-vs-etsy-which-earns-more',
  'printable-business-income-realistic', 'how-many-listings-etsy-success',
  'etsy-printable-pricing-strategy', 'pinterest-traffic-printable-shop',
  'seasonal-printable-calendar-sellers', 'printable-bundle-strategy-etsy',
  'passive-income-printables-truth', 'printable-business-no-design-skills',
  'worksheet-quality-vs-quantity-etsy', 'best-printable-niches-low-competition',
  'etsy-reviews-printable-products', 'multilingual-printables-advantage',
  'commercial-license-printables-explained', 'printable-shop-branding-tips',
  'email-list-printable-business', 'etsy-ads-printables-worth-it',
  'tpt-vs-etsy-worksheets-comparison', 'printable-business-mistakes-avoid',
  'scale-printable-business-automation', 'printable-mockup-photos-sell-more',
  'gumroad-vs-etsy-digital-products', 'print-on-demand-vs-digital-download',
  'customer-service-digital-products', 'social-media-printable-sellers',
  'copyright-printable-sellers-basics', 'best-printables-sell-christmas',
  'halloween-printables-sell-october', 'back-to-school-printable-rush',
  'valentines-day-printables-sell', 'easter-printables-business-spring',
  'summer-activity-printables-sell', 'preschool-printables-best-sellers',
  'kindergarten-worksheets-market', 'homeschool-printables-growing-market',
  'esl-worksheets-global-market', 'special-education-printables-sell',
  'printable-games-birthday-parties', 'educational-printables-new-parents',
  'toddler-activity-printables-sell', 'math-fact-fluency-printables-sell',
  'sight-words-worksheets-business', 'fine-motor-activities-printables',
  'brain-break-printables-teachers', 'travel-activity-printables-sell',
  'animal-themed-printables-sell', 'space-themed-worksheets-business',
  'printables-sell-mothers-day-fathers-day', 'thanksgiving-printables-sell-november',
  'new-year-printables-january', 'spring-printables-sell-march-april',
  'winter-printables-sell-december-january', 'dinosaur-printables-sell-evergreen',
  'farm-animal-printables-sell', 'ocean-themed-printables-sell',
  'food-themed-worksheets-sell', 'create-worksheet-bundle-35-minutes',
  'format-worksheets-etsy-listing', 'create-activity-book-kdp-start-finish',
  'worksheet-design-tips-sell-more', 'answer-key-importance-printable-sales',
  'use-themed-images-sell-worksheets', 'batch-create-worksheets-efficiently',
  'worksheet-difficulty-levels-product-tiers', 'printable-file-formats-pdf-jpeg-guide',
  'create-cohesive-printable-brand', 'repurpose-worksheets-multiple-products',
  'worksheet-generator-vs-canva-comparison', 'free-printable-samples-lead-magnet',
  'best-paper-sizes-printable-products', 'create-printable-curriculum-packs',
  '11-languages-sell-globally', 'etsy-keyword-research-printables',
  'printable-product-photography-mockups', 'update-old-printable-listings-boost-sales',
];

// Zombie detection patterns — indicators of old teacher-focused content
const ZOMBIE_PATTERNS = {
  academicCitations: [
    /\bPaivio\b/i, /\bWiggins\b/i, /\bMcTighe\b/i, /\bWitzel\b/i,
    /\bEhri\b/i, /\bCooper\s+et\s+al\b/i, /\bVygotsky\b/i, /\bBloom'?s\s+taxonomy\b/i,
    /\bPiaget\b/i, /\bMontessori\b/i, /\bBruner\b/i,
  ],
  oldPricing: [
    /\$144\s*\/?\s*year/i, /\$240\s*\/?\s*year/i,
    /Full\s+Access\s+subscription/i, /Core\s+Bundle/i,
  ],
  educationalPsychology: [
    /dual\s+coding\s+theory/i, /CRA\s+progression/i,
    /working\s+memory\s+chunks?/i, /cognitive\s+load\s+theory/i,
    /formative\s+assessment/i, /summative\s+assessment/i,
    /zone\s+of\s+proximal\s+development/i, /backward\s+design/i,
    /CCSS\b/, /Common\s+Core/i,
  ],
  teacherOnlyLanguage: [
    /your\s+students/i, /classroom\s+instruction/i,
    /lesson\s+plan(?:s|ning)?\b/i, /grade\s+book/i,
    /parent[- ]teacher\s+conference/i, /IEP\s+goals?\b/i,
    /\bdifferentiated\s+instruction\b/i,
  ],
};

// Seller keywords — at least one should appear in every post
const SELLER_KEYWORDS = [
  /\betsy\b/i, /\bkdp\b/i, /\bsell(?:ing|s|er)?\b/i,
  /printable\s+business/i, /commercial\s+license/i,
  /\bprofit\b/i, /\brevenue\b/i, /\bincome\b/i,
  /\bshop\b/i, /\bstore\b/i, /\bmarket(?:place)?\b/i,
  /\bentrepreneur/i, /\bside\s+hustle/i, /\bgumroad\b/i,
];

const BLOG_CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'config', 'blog-content');

function getAllTextFromContent(content) {
  const texts = [];
  function extract(obj) {
    if (typeof obj === 'string') {
      texts.push(obj);
    } else if (Array.isArray(obj)) {
      obj.forEach(extract);
    } else if (obj && typeof obj === 'object') {
      Object.values(obj).forEach(extract);
    }
  }
  extract(content);
  return texts.join(' ');
}

function detectZombieIndicators(text) {
  const issues = [];

  for (const [category, patterns] of Object.entries(ZOMBIE_PATTERNS)) {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        issues.push({ category, match: match[0] });
      }
    }
  }

  // Check for missing seller keywords
  const hasSellerKeyword = SELLER_KEYWORDS.some(p => p.test(text));
  if (!hasSellerKeyword) {
    issues.push({ category: 'missingSellerKeywords', match: 'No seller/business keywords found' });
  }

  return issues;
}

async function auditLocale(locale) {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);
  const result = {
    locale,
    totalFiles: 0,
    expected: 112,
    missing: [],
    extra: [],
    zombies: [],
    loadErrors: [],
  };

  // Check directory exists
  if (!fs.existsSync(localeDir)) {
    result.missing = [...REQUIRED_BLOG_IDS];
    return result;
  }

  // Count .ts files (excluding index.ts and types.ts)
  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts'));
  result.totalFiles = files.length;

  // Check which required blogIds have files
  const fileBasenames = new Set(files.map(f => f.replace('.ts', '')));

  for (const blogId of REQUIRED_BLOG_IDS) {
    if (!fileBasenames.has(blogId)) {
      result.missing.push(blogId);
    }
  }

  // Check for extra files not in required list
  const requiredSet = new Set(REQUIRED_BLOG_IDS);
  for (const basename of fileBasenames) {
    if (!requiredSet.has(basename)) {
      result.extra.push(basename);
    }
  }

  // Load and scan each file for zombie content
  for (const file of files) {
    const blogId = file.replace('.ts', '');
    const filePath = path.join(localeDir, file);
    try {
      // Read file as text and scan for zombie patterns
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const issues = detectZombieIndicators(fileContent);
      if (issues.length > 0) {
        result.zombies.push({ blogId, file, issues });
      }
    } catch (err) {
      result.loadErrors.push({ blogId, file, error: err.message });
    }
  }

  return result;
}

function catalogOldUrls() {
  const legacyPath = path.join(__dirname, 'blog-legacy-slugs.json');
  if (!fs.existsSync(legacyPath)) {
    return { exists: false, total: 0, byLocale: {} };
  }

  const data = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));
  const byLocale = {};
  for (const entry of data) {
    if (!byLocale[entry.locale]) byLocale[entry.locale] = [];
    byLocale[entry.locale].push(entry.oldSlug);
  }

  return {
    exists: true,
    total: data.length,
    byLocale,
    note: 'All old slugs currently return 410 Gone (no 301 redirects implemented)',
  };
}

async function main() {
  console.log('=== BLOG INVENTORY AUDIT (Step 0) ===\n');

  // 0A: Count posts per language
  console.log('--- 0A: Post Count Per Language ---\n');
  const results = [];
  for (const locale of LOCALES) {
    const result = await auditLocale(locale);
    results.push(result);
  }

  // Summary table
  console.log('| Language | Posts Found | Expected | Missing | Extra | Zombies | Load Errors |');
  console.log('|----------|-----------|----------|---------|-------|---------|-------------|');
  for (const r of results) {
    const status = r.missing.length === 0 && r.zombies.length === 0 ? '\u2705' : '\u274c';
    console.log(`| ${r.locale.padEnd(8)} | ${String(r.totalFiles).padEnd(11)} | ${String(r.expected).padEnd(8)} | ${String(r.missing.length).padEnd(7)} | ${String(r.extra.length).padEnd(5)} | ${String(r.zombies.length).padEnd(7)} | ${String(r.loadErrors.length).padEnd(11)} | ${status}`);
  }

  // 0A Detail: Missing files
  const totalMissing = results.reduce((sum, r) => sum + r.missing.length, 0);
  if (totalMissing > 0) {
    console.log(`\n--- Missing Files Detail (${totalMissing} total) ---`);
    for (const r of results) {
      if (r.missing.length > 0) {
        console.log(`\n  ${r.locale}: ${r.missing.length} missing`);
        r.missing.forEach(m => console.log(`    - ${m}`));
      }
    }
  } else {
    console.log(`\n\u2705 All 112 content files present in all 11 languages (1,232 total)`);
  }

  // 0B: Zombie detection results
  console.log('\n--- 0B: Zombie Detection ---\n');
  const totalZombies = results.reduce((sum, r) => sum + r.zombies.length, 0);
  if (totalZombies > 0) {
    console.log(`\u274c Found ${totalZombies} files with old teacher-focused content indicators:\n`);
    for (const r of results) {
      if (r.zombies.length > 0) {
        console.log(`  ${r.locale}: ${r.zombies.length} files flagged`);
        for (const z of r.zombies) {
          const categories = [...new Set(z.issues.map(i => i.category))];
          const matchSamples = z.issues.slice(0, 3).map(i => `"${i.match}"`).join(', ');
          console.log(`    - ${z.blogId}: [${categories.join(', ')}] ${matchSamples}`);
        }
      }
    }
  } else {
    console.log('\u2705 No zombie (old teacher-focused) content detected in any file');
  }

  // 0C: Old URL catalog
  console.log('\n--- 0C: Old URL Catalog ---\n');
  const oldUrls = catalogOldUrls();
  if (oldUrls.exists) {
    console.log(`Found ${oldUrls.total} old blog URLs in blog-legacy-slugs.json`);
    console.log(`Status: ${oldUrls.note}\n`);
    console.log('| Language | Old URLs | Status |');
    console.log('|----------|----------|--------|');
    for (const locale of LOCALES) {
      const count = oldUrls.byLocale[locale] ? oldUrls.byLocale[locale].length : 0;
      console.log(`| ${locale.padEnd(8)} | ${String(count).padEnd(8)} | 410 Gone (needs 301 redirect) |`);
    }
  } else {
    console.log('blog-legacy-slugs.json not found');
  }

  // 0D: Summary
  console.log('\n--- 0D: Overall Summary ---\n');
  const totalPosts = results.reduce((sum, r) => sum + r.totalFiles, 0);
  console.log(`Total blog posts: ${totalPosts} / 1,232 expected`);
  console.log(`Missing files: ${totalMissing}`);
  console.log(`Zombie flags: ${totalZombies}`);
  console.log(`Old URLs needing redirects: ${oldUrls.total}`);
  console.log(`\nStatus: ${totalMissing === 0 ? '\u2705 All posts present' : '\u274c Missing posts found'}`);
  console.log(`Zombies: ${totalZombies === 0 ? '\u2705 Clean' : '\u274c Needs review'}`);
  console.log(`Redirects: ${oldUrls.total > 0 ? '\u274c ' + oldUrls.total + ' old URLs need 301 redirects' : '\u2705 None needed'}`);

  // Save detailed results to JSON
  const outputPath = path.join(__dirname, 'blog-audit-inventory-results.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      totalPosts,
      expected: 1232,
      totalMissing,
      totalZombies,
      oldUrlsCount: oldUrls.total,
    },
    perLocale: results.map(r => ({
      locale: r.locale,
      totalFiles: r.totalFiles,
      missing: r.missing,
      extra: r.extra,
      zombies: r.zombies.map(z => ({ blogId: z.blogId, issues: z.issues })),
      loadErrors: r.loadErrors,
    })),
    oldUrls: oldUrls.byLocale,
  }, null, 2));
  console.log(`\nDetailed results saved to: ${outputPath}`);
}

main().catch(console.error);
