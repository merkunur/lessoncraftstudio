#!/usr/bin/env node
/**
 * Blog Configuration Audit Script
 * Validates all 112 blog posts × 11 locales = 1,232 posts
 *
 * Checks: inventory, SEO lengths, academic content, internal links,
 * related posts, hreflang completeness, content structure
 *
 * Usage: node scripts/blog-config-audit.js
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BLOG_CONTENT_DIR = path.join(__dirname, '..', 'frontend', 'config', 'blog-content');
const BLOG_SLUGS_FILE = path.join(__dirname, '..', 'frontend', 'config', 'blog-page-slugs.ts');

// The 112 required blog IDs
const REQUIRED_BLOG_IDS = [
  // Category 1: Product-Specific Seller Guides (33)
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
  'odd-one-out-worksheets-sell',
  // Category 2: Platform & Business Strategy (30)
  'etsy-printable-shop-first-month', 'etsy-seo-printable-sellers-2026',
  'etsy-listing-optimization-worksheets', 'kdp-activity-book-formatting-guide',
  'kdp-vs-etsy-which-earns-more', 'printable-business-income-realistic',
  'how-many-listings-etsy-success', 'etsy-printable-pricing-strategy',
  'pinterest-traffic-printable-shop', 'seasonal-printable-calendar-sellers',
  'printable-bundle-strategy-etsy', 'passive-income-printables-truth',
  'printable-business-no-design-skills', 'worksheet-quality-vs-quantity-etsy',
  'best-printable-niches-low-competition', 'etsy-reviews-printable-products',
  'multilingual-printables-advantage', 'commercial-license-printables-explained',
  'printable-shop-branding-tips', 'email-list-printable-business',
  'etsy-ads-printables-worth-it', 'tpt-vs-etsy-worksheets-comparison',
  'printable-business-mistakes-avoid', 'scale-printable-business-automation',
  'printable-mockup-photos-sell-more', 'gumroad-vs-etsy-digital-products',
  'print-on-demand-vs-digital-download', 'customer-service-digital-products',
  'social-media-printable-sellers', 'copyright-printable-sellers-basics',
  // Category 3: Niche & Seasonal (30)
  'best-printables-sell-christmas', 'halloween-printables-sell-october',
  'back-to-school-printable-rush', 'valentines-day-printables-sell',
  'easter-printables-business-spring', 'summer-activity-printables-sell',
  'preschool-printables-best-sellers', 'kindergarten-worksheets-market',
  'homeschool-printables-growing-market', 'esl-worksheets-global-market',
  'special-education-printables-sell', 'printable-games-birthday-parties',
  'educational-printables-new-parents', 'toddler-activity-printables-sell',
  'math-fact-fluency-printables-sell', 'sight-words-worksheets-business',
  'fine-motor-activities-printables', 'brain-break-printables-teachers',
  'travel-activity-printables-sell', 'animal-themed-printables-sell',
  'space-themed-worksheets-business', 'printables-sell-mothers-day-fathers-day',
  'thanksgiving-printables-sell-november', 'new-year-printables-january',
  'spring-printables-sell-march-april', 'winter-printables-sell-december-january',
  'dinosaur-printables-sell-evergreen', 'farm-animal-printables-sell',
  'ocean-themed-printables-sell', 'food-themed-worksheets-sell',
  // Category 4: How-To Tutorials (19)
  'create-worksheet-bundle-35-minutes', 'format-worksheets-etsy-listing',
  'create-activity-book-kdp-start-finish', 'worksheet-design-tips-sell-more',
  'answer-key-importance-printable-sales', 'use-themed-images-sell-worksheets',
  'batch-create-worksheets-efficiently', 'worksheet-difficulty-levels-product-tiers',
  'printable-file-formats-pdf-jpeg-guide', 'create-cohesive-printable-brand',
  'repurpose-worksheets-multiple-products', 'worksheet-generator-vs-canva-comparison',
  'free-printable-samples-lead-magnet', 'best-paper-sizes-printable-products',
  'create-printable-curriculum-packs', '11-languages-sell-globally',
  'etsy-keyword-research-printables', 'printable-product-photography-mockups',
  'update-old-printable-listings-boost-sales',
];

// Academic content markers (old teacher-focused content)
const ACADEMIC_MARKERS = [
  'Full Access subscription',
  'Core Bundle',
  '$144/year',
  '$240/year',
  'Paivio',
  'Wiggins & McTighe',
  'Witzel',
  'Cooper et al',
  'dual coding theory',
  'CRA progression',
  'formative assessment',
  'working memory chunks',
  'cognitive load theory',
  'Backward Design',
  'scaffolding theory',
  'zone of proximal development',
  'Bloom\'s taxonomy',
];

// Teacher-focused phrases (flag for review, not auto-fail)
const TEACHER_PHRASES = [
  'your students',
  'classroom instruction',
  'lesson plan',
  'Common Core',
  'CCSS',
  'curriculum alignment',
];

const results = {
  timestamp: new Date().toISOString(),
  summary: {
    totalExpected: REQUIRED_BLOG_IDS.length * LOCALES.length,
    totalFound: 0,
    totalMissing: 0,
    seoIssues: 0,
    academicContent: 0,
    brokenInternalLinks: 0,
    brokenRelatedPosts: 0,
    hreflangIssues: 0,
    structureIssues: 0,
  },
  perLocale: {},
  issues: [],
};

// --- CHECK 1: File Inventory ---
console.log('=== CHECK 1: File Inventory ===');
for (const locale of LOCALES) {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);
  const localeResults = {
    found: 0,
    missing: [],
    extra: [],
  };

  if (!fs.existsSync(localeDir)) {
    localeResults.missing = [...REQUIRED_BLOG_IDS];
    results.issues.push({ check: 'inventory', locale, severity: 'CRITICAL', message: `Directory missing: ${localeDir}` });
  } else {
    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    const fileIds = files.map(f => f.replace('.ts', ''));

    for (const blogId of REQUIRED_BLOG_IDS) {
      if (fileIds.includes(blogId)) {
        localeResults.found++;
      } else {
        localeResults.missing.push(blogId);
        results.issues.push({ check: 'inventory', locale, severity: 'HIGH', message: `Missing blog post: ${blogId}` });
      }
    }

    // Check for extra files not in the required list
    for (const fileId of fileIds) {
      if (!REQUIRED_BLOG_IDS.includes(fileId)) {
        localeResults.extra.push(fileId);
      }
    }
  }

  results.perLocale[locale] = { inventory: localeResults };
  results.summary.totalFound += localeResults.found;
  results.summary.totalMissing += localeResults.missing.length;
  console.log(`  ${locale}: ${localeResults.found}/${REQUIRED_BLOG_IDS.length} posts (${localeResults.missing.length} missing)`);
}

// --- CHECK 2: SEO Length Checks ---
console.log('\n=== CHECK 2: SEO Length Checks ===');
let titleOver60 = 0;
let metaOver155 = 0;
let missingTitle = 0;
let missingMeta = 0;

for (const locale of LOCALES) {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;

  for (const blogId of REQUIRED_BLOG_IDS) {
    const filePath = path.join(localeDir, `${blogId}.ts`);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');

    // Extract titleTag (handles both titleTag: '...' and "titleTag": "...")
    const titleMatch = content.match(/["']?titleTag["']?\s*:\s*['"`](.+?)['"`]/);
    if (titleMatch) {
      const title = titleMatch[1];
      if (title.length > 60) {
        titleOver60++;
        results.issues.push({
          check: 'seo-title-length',
          locale,
          blogId,
          severity: 'MEDIUM',
          message: `Title tag ${title.length} chars (max 60): "${title}"`,
        });
      }
    } else {
      missingTitle++;
      results.issues.push({ check: 'seo-title-missing', locale, blogId, severity: 'HIGH', message: 'Missing titleTag' });
    }

    // Extract metaDescription (handles both formats)
    const metaMatch = content.match(/["']?metaDescription["']?\s*:\s*['"`](.+?)['"`]/);
    if (metaMatch) {
      const meta = metaMatch[1];
      if (meta.length > 155) {
        metaOver155++;
        results.issues.push({
          check: 'seo-meta-length',
          locale,
          blogId,
          severity: 'MEDIUM',
          message: `Meta description ${meta.length} chars (max 155): "${meta.substring(0, 80)}..."`,
        });
      }
    } else {
      missingMeta++;
      results.issues.push({ check: 'seo-meta-missing', locale, blogId, severity: 'HIGH', message: 'Missing metaDescription' });
    }
  }
}

results.summary.seoIssues = titleOver60 + metaOver155 + missingTitle + missingMeta;
console.log(`  Title tags > 60 chars: ${titleOver60}`);
console.log(`  Meta descriptions > 155 chars: ${metaOver155}`);
console.log(`  Missing title tags: ${missingTitle}`);
console.log(`  Missing meta descriptions: ${missingMeta}`);

// --- CHECK 3: Academic Content Scan ---
console.log('\n=== CHECK 3: Academic Content Scan ===');
let academicHits = 0;
let teacherPhraseHits = 0;

for (const locale of LOCALES) {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;

  for (const blogId of REQUIRED_BLOG_IDS) {
    const filePath = path.join(localeDir, `${blogId}.ts`);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');

    for (const marker of ACADEMIC_MARKERS) {
      if (content.includes(marker)) {
        academicHits++;
        results.issues.push({
          check: 'academic-content',
          locale,
          blogId,
          severity: 'HIGH',
          message: `Academic marker found: "${marker}"`,
        });
      }
    }

    // Only flag English for teacher phrases (they'd be in different languages)
    if (locale === 'en') {
      for (const phrase of TEACHER_PHRASES) {
        if (content.toLowerCase().includes(phrase.toLowerCase())) {
          teacherPhraseHits++;
          results.issues.push({
            check: 'teacher-phrase',
            locale,
            blogId,
            severity: 'LOW',
            message: `Teacher phrase found (review needed): "${phrase}"`,
          });
        }
      }
    }
  }
}

results.summary.academicContent = academicHits;
console.log(`  Academic markers found: ${academicHits}`);
console.log(`  Teacher phrases (review needed): ${teacherPhraseHits}`);

// --- CHECK 4: Internal Link Validation ---
console.log('\n=== CHECK 4: Internal Link Validation ===');

// Read all slug config files to build lookup sets
function extractSlugsFromFile(filePath, pattern) {
  if (!fs.existsSync(filePath)) return new Set();
  const content = fs.readFileSync(filePath, 'utf8');
  const slugs = new Set();
  const regex = new RegExp(pattern, 'g');
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.add(match[1]);
  }
  return slugs;
}

const configDir = path.join(__dirname, '..', 'frontend', 'config');

// Build slug sets from config files by reading the actual slug values
function extractAllSlugsFromConfig(filePath) {
  if (!fs.existsSync(filePath)) return new Set();
  const content = fs.readFileSync(filePath, 'utf8');
  const slugs = new Set();
  // Match slug values in the slugs objects: en: 'xxx', de: 'yyy', etc.
  const regex = /(?:en|de|fr|es|pt|it|nl|sv|da|no|fi):\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.add(match[1]);
  }
  return slugs;
}

const appSlugs = extractAllSlugsFromConfig(path.join(configDir, 'product-page-slugs.ts'));
const toolSlugs = extractAllSlugsFromConfig(path.join(configDir, 'tool-page-slugs.ts'));
const guideSlugs = extractAllSlugsFromConfig(path.join(configDir, 'guide-page-slugs.ts'));
const bundleSlugs = extractAllSlugsFromConfig(path.join(configDir, 'bundle-page-slugs.ts'));
const startSlugs = extractAllSlugsFromConfig(path.join(configDir, 'start-page-slugs.ts'));
const ideaSlugs = extractAllSlugsFromConfig(path.join(configDir, 'idea-page-slugs.ts'));
const blogSlugs = extractAllSlugsFromConfig(path.join(configDir, 'blog-page-slugs.ts'));

function isKnownSlug(pageType, slug) {
  switch (pageType) {
    case 'app': return appSlugs.has(slug);
    case 'tool': return toolSlugs.has(slug);
    case 'guide': return guideSlugs.has(slug);
    case 'bundle': return bundleSlugs.has(slug);
    case 'start': return startSlugs.has(slug);
    case 'idea': return ideaSlugs.has(slug);
    case 'blog': return blogSlugs.has(slug);
    default: return false;
  }
}

let brokenInternalLinks = 0;
let totalInternalLinks = 0;

for (const locale of LOCALES) {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;

  for (const blogId of REQUIRED_BLOG_IDS) {
    const filePath = path.join(localeDir, `${blogId}.ts`);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');

    // Extract internalLinks array entries
    const linkPattern = /pageType:\s*'([^']+)',\s*slug:\s*'([^']+)'/g;
    let match;
    while ((match = linkPattern.exec(content)) !== null) {
      totalInternalLinks++;
      const [, pageType, slug] = match;
      if (!isKnownSlug(pageType, slug)) {
        brokenInternalLinks++;
        results.issues.push({
          check: 'internal-link',
          locale,
          blogId,
          severity: 'HIGH',
          message: `Broken internal link: ${pageType}/${slug}`,
        });
      }
    }
  }
}

results.summary.brokenInternalLinks = brokenInternalLinks;
console.log(`  Total internal links checked: ${totalInternalLinks}`);
console.log(`  Broken internal links: ${brokenInternalLinks}`);

// --- CHECK 5: Related Post Validation ---
console.log('\n=== CHECK 5: Related Post Validation ===');
let brokenRelatedPosts = 0;
let totalRelatedPosts = 0;

for (const locale of LOCALES) {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;

  for (const blogId of REQUIRED_BLOG_IDS) {
    const filePath = path.join(localeDir, `${blogId}.ts`);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');

    // Extract relatedPosts slugs
    const relatedPattern = /relatedPosts:\s*\[([^\]]*)\]/s;
    const relatedMatch = content.match(relatedPattern);
    if (relatedMatch) {
      const slugPattern = /slug:\s*'([^']+)'/g;
      let slugMatch;
      while ((slugMatch = slugPattern.exec(relatedMatch[1])) !== null) {
        totalRelatedPosts++;
        if (!blogSlugs.has(slugMatch[1])) {
          brokenRelatedPosts++;
          results.issues.push({
            check: 'related-post',
            locale,
            blogId,
            severity: 'MEDIUM',
            message: `Broken related post slug: ${slugMatch[1]}`,
          });
        }
      }
    }
  }
}

results.summary.brokenRelatedPosts = brokenRelatedPosts;
console.log(`  Total related posts checked: ${totalRelatedPosts}`);
console.log(`  Broken related posts: ${brokenRelatedPosts}`);

// --- CHECK 6: Hreflang Completeness ---
console.log('\n=== CHECK 6: Hreflang Completeness ===');
let hreflangIssues = 0;

// Read blog-page-slugs.ts and verify each entry has all 11 locale slugs
const slugsContent = fs.readFileSync(BLOG_SLUGS_FILE, 'utf8');

for (const blogId of REQUIRED_BLOG_IDS) {
  // Check if blogId exists in the config
  if (!slugsContent.includes(`blogId: '${blogId}'`)) {
    hreflangIssues++;
    results.issues.push({
      check: 'hreflang',
      severity: 'CRITICAL',
      message: `Blog ID missing from blog-page-slugs.ts: ${blogId}`,
    });
    continue;
  }

  // Check each locale has a slug
  // Find the slugs block for this blogId
  const entryPattern = new RegExp(
    `blogId:\\s*'${blogId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[^}]*slugs:\\s*\\{([^}]+)\\}`,
    's'
  );
  const entryMatch = slugsContent.match(entryPattern);
  if (entryMatch) {
    const slugsBlock = entryMatch[1];
    for (const locale of LOCALES) {
      const localePattern = new RegExp(`${locale}:\\s*'[^']+'`);
      if (!localePattern.test(slugsBlock)) {
        hreflangIssues++;
        results.issues.push({
          check: 'hreflang',
          blogId,
          locale,
          severity: 'HIGH',
          message: `Missing ${locale} slug in blog-page-slugs.ts for: ${blogId}`,
        });
      }
    }
  }
}

results.summary.hreflangIssues = hreflangIssues;
console.log(`  Hreflang issues: ${hreflangIssues}`);

// --- CHECK 7: Content Structure ---
console.log('\n=== CHECK 7: Content Structure ===');
let structureIssues = 0;

for (const locale of LOCALES) {
  const localeDir = path.join(BLOG_CONTENT_DIR, locale);
  if (!fs.existsSync(localeDir)) continue;

  for (const blogId of REQUIRED_BLOG_IDS) {
    const filePath = path.join(localeDir, `${blogId}.ts`);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');

    // Count sections (H2s) — handles both heading: '...' and "heading": "..."
    const sectionMatches = content.match(/["']?heading["']?\s*:\s*['"`]/g);
    const sectionCount = sectionMatches ? sectionMatches.length : 0;
    if (sectionCount < 3) {
      structureIssues++;
      results.issues.push({
        check: 'structure-sections',
        locale,
        blogId,
        severity: 'LOW',
        message: `Only ${sectionCount} sections (expected 3-6)`,
      });
    }

    // Check FAQ presence
    if (!content.includes('faq:') || content.includes('faq: []')) {
      structureIssues++;
      results.issues.push({
        check: 'structure-faq',
        locale,
        blogId,
        severity: 'LOW',
        message: 'Missing FAQ section',
      });
    }

    // Check CTA presence
    if (!content.includes('cta:')) {
      structureIssues++;
      results.issues.push({
        check: 'structure-cta',
        locale,
        blogId,
        severity: 'LOW',
        message: 'Missing CTA section',
      });
    }

    // Check internal links presence
    if (!content.includes('internalLinks:') || content.includes('internalLinks: []')) {
      structureIssues++;
      results.issues.push({
        check: 'structure-links',
        locale,
        blogId,
        severity: 'MEDIUM',
        message: 'Missing internal links',
      });
    }
  }
}

results.summary.structureIssues = structureIssues;
console.log(`  Structure issues: ${structureIssues}`);

// --- CHECK 8: Sitemap & robots.txt ---
console.log('\n=== CHECK 8: Infrastructure ===');

const robotsPath = path.join(__dirname, '..', 'frontend', 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (robots.includes('Sitemap: https://www.lessoncraftstudio.com/sitemap.xml')) {
    console.log('  robots.txt: Sitemap reference FOUND');
  } else {
    console.log('  robots.txt: Sitemap reference MISSING');
    results.issues.push({ check: 'infrastructure', severity: 'HIGH', message: 'robots.txt missing sitemap reference' });
  }

  if (robots.includes('Disallow: /en/blog') || robots.includes('Disallow: /*/blog')) {
    console.log('  robots.txt: Blog BLOCKED');
    results.issues.push({ check: 'infrastructure', severity: 'CRITICAL', message: 'robots.txt blocks blog routes' });
  } else {
    console.log('  robots.txt: Blog NOT blocked');
  }
} else {
  console.log('  robots.txt: NOT FOUND');
  results.issues.push({ check: 'infrastructure', severity: 'HIGH', message: 'robots.txt not found' });
}

// Check sitemap.ts includes blog
const sitemapPath = path.join(__dirname, '..', 'frontend', 'app', 'sitemap.ts');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (sitemap.includes('blogPageSlugs') && sitemap.includes("id === 9")) {
    console.log('  sitemap.ts: Blog pages included (ID 9)');
  } else {
    console.log('  sitemap.ts: Blog pages MISSING');
    results.issues.push({ check: 'infrastructure', severity: 'CRITICAL', message: 'Blog pages not in sitemap' });
  }

  if (sitemap.includes("priority: 0.6")) {
    console.log('  sitemap.ts: Blog priority 0.6');
  }
}

// Check blog legacy redirect map
const redirectPath = path.join(configDir, 'blog-legacy-redirect-map.ts');
if (fs.existsSync(redirectPath)) {
  const redirectContent = fs.readFileSync(redirectPath, 'utf8');
  const redirectCount = (redirectContent.match(/\['/g) || []).length;
  console.log(`  Legacy redirects: ${redirectCount} entries`);
} else {
  console.log('  Legacy redirect map: NOT FOUND');
  results.issues.push({ check: 'infrastructure', severity: 'HIGH', message: 'Blog legacy redirect map not found' });
}

// --- FINAL REPORT ---
console.log('\n========================================');
console.log('  BLOG CONFIGURATION AUDIT RESULTS');
console.log('========================================\n');

console.log('POSTS:');
console.log('| Language | Found | Expected | Missing | Status |');
console.log('|----------|-------|----------|---------|--------|');
for (const locale of LOCALES) {
  const inv = results.perLocale[locale]?.inventory || { found: 0, missing: [] };
  const status = inv.missing.length === 0 ? 'PASS' : 'FAIL';
  console.log(`| ${locale.toUpperCase().padEnd(8)} | ${String(inv.found).padEnd(5)} | ${String(REQUIRED_BLOG_IDS.length).padEnd(8)} | ${String(inv.missing.length).padEnd(7)} | ${status.padEnd(6)} |`);
}

console.log(`\nTotal: ${results.summary.totalFound}/${results.summary.totalExpected} posts`);

console.log('\nSEO ELEMENTS:');
console.log(`| Check                    | Issues |`);
console.log(`|--------------------------|--------|`);
console.log(`| Title tags > 60 chars    | ${titleOver60.toString().padEnd(6)} |`);
console.log(`| Meta descriptions > 155  | ${metaOver155.toString().padEnd(6)} |`);
console.log(`| Missing title tags       | ${missingTitle.toString().padEnd(6)} |`);
console.log(`| Missing meta desc        | ${missingMeta.toString().padEnd(6)} |`);
console.log(`| Academic content          | ${academicHits.toString().padEnd(6)} |`);
console.log(`| Broken internal links    | ${brokenInternalLinks.toString().padEnd(6)} |`);
console.log(`| Broken related posts     | ${brokenRelatedPosts.toString().padEnd(6)} |`);
console.log(`| Hreflang issues          | ${hreflangIssues.toString().padEnd(6)} |`);
console.log(`| Structure issues         | ${structureIssues.toString().padEnd(6)} |`);

const totalIssues = results.issues.filter(i => i.severity === 'CRITICAL' || i.severity === 'HIGH').length;
console.log(`\nCRITICAL/HIGH issues: ${totalIssues}`);
console.log(`Total issues (all severities): ${results.issues.length}`);

// Write detailed report to JSON
const reportPath = path.join(__dirname, 'blog-config-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\nDetailed report saved to: ${reportPath}`);

// Exit with error code if critical issues found
if (results.issues.some(i => i.severity === 'CRITICAL')) {
  console.log('\n*** CRITICAL ISSUES FOUND — review report ***');
  process.exit(1);
}
