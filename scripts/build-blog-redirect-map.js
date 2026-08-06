/**
 * Build Blog Redirect Map — Step 3
 *
 * Maps old academic blog postIndex (1-112) → current seller-focused blogId,
 * then generates the full redirect config for all 11 locales.
 *
 * Usage: node scripts/build-blog-redirect-map.js
 *
 * Output: frontend/config/blog-legacy-redirect-map.ts
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// STEP 1: Manual topic-based mapping — old postIndex → new blogId
//
// Each old academic post is mapped to the closest new seller post.
// Where no close match exists, maps to blog index (null).
// ============================================================

const POST_INDEX_TO_BLOG_ID = {
  // 1: "33-editable-worksheet-generators-elementary-teachers" → general worksheet generators overview
  1: 'batch-create-worksheets-efficiently',
  // 2: "how-to-create-custom-worksheets-3-minutes" → how-to creation
  2: 'create-worksheet-bundle-35-minutes',
  // 3: "affordable-expensive-worksheet-platforms-comparison" → platform comparison
  3: 'worksheet-generator-vs-canva-comparison',
  // 4: "differentiated-instruction-editable-generators" → worksheet design
  4: 'worksheet-difficulty-levels-product-tiers',
  // 5: "picture-sudoku-complete-guide" → sudoku
  5: 'picture-sudoku-books-kdp',
  // 6: "i-spy-worksheets-zero-overlap-algorithm" → hidden object/find
  6: 'hidden-object-worksheets-business',
  // 7: "word-search-generator-90-seconds" → word search
  7: 'word-search-printables-profit',
  // 8: "picture-based-worksheets-retention-research" → worksheet design tips
  8: 'worksheet-design-tips-sell-more',
  // 9: "image-cryptogram-visual-substitution-cipher" → cryptogram
  9: 'cryptogram-worksheets-sell',
  // 10: "grid-drawing-smart-cell-detection" → grid matching
  10: 'grid-matching-puzzles-sell',
  // 11: "symbolic-algebra-worksheets-unique-validation" → math worksheets
  11: 'math-worksheet-bundles-that-sell',
  // 12: "dual-mode-preposition-worksheets" → preposition/ESL
  12: 'preposition-worksheets-esl-market',
  // 13: "cipher-based-addition-cryptography-elementary-math" → code addition
  13: 'code-addition-puzzles-sell-etsy',
  // 14: "pattern-train-multi-sensory-learning" → pattern train
  14: 'pattern-train-worksheets-niche',
  // 15: "word-scramble-fractional-clue-algorithm" → word scramble
  15: 'word-scramble-printables-business',
  // 16: "image-crossword-generator-post-generation-editing" → crossword
  16: 'crossword-books-kdp-niche',
  // 17: "word-scramble-science-spelling" → word scramble/word guess
  17: 'word-guess-game-worksheets-sell',
  // 18: "dual-coding-theory-practice" → worksheet design
  18: 'use-themed-images-sell-worksheets',
  // 19: "zone-proximal-development-scaffolding" → worksheet difficulty
  19: 'worksheet-difficulty-levels-product-tiers',
  // 20: "concrete-representational-abstract-math" → math puzzle
  20: 'math-puzzle-books-amazon-kdp',
  // 21: "pattern-recognition-mathematical-thinking" → pattern worksheets
  21: 'pattern-worksheets-sell-online',
  // 22: "visual-discrimination-activities-frostig" → find and count / hidden object
  22: 'find-and-count-printables-profit',
  // 23: "fine-motor-development-pre-writing-strokes" → tracing/fine motor
  23: 'tracing-worksheets-fine-motor-sell',
  // 24: "orthographic-learning-sight-word-automaticity" → sight words
  24: 'sight-words-worksheets-business',
  // 25: "cognitive-load-theory-worksheet-design" → worksheet design
  25: 'worksheet-design-tips-sell-more',
  // 26: "millers-rule-image-crossword-design" → crossword
  26: 'crossword-books-kdp-niche',
  // 27: "zero-overlap-algorithm-i-spy" → hidden object
  27: 'hidden-object-worksheets-business',
  // 28: "smart-cell-detection-grid-drawing" → grid matching
  28: 'grid-matching-puzzles-sell',
  // 29: "unique-solvability-validation-math-puzzle" → math puzzle
  29: 'math-puzzle-books-amazon-kdp',
  // 30: "variance-detection-algorithm-puzzle-pieces" → missing pieces
  30: 'missing-pieces-puzzles-kdp',
  // 31: "anti-adjacent-scattering-randomness" → word search
  31: 'word-search-printables-profit',
  // 32: "fisher-yates-shuffle-algorithm" → batch create
  32: 'batch-create-worksheets-efficiently',
  // 33: "top-10-worksheet-generators-prek" → preschool market
  33: 'preschool-printables-best-sellers',
  // 34: "prek-fine-motor-activities" → fine motor
  34: 'fine-motor-activities-printables',
  // 35: "top-10-worksheet-generators-kindergarten" → kindergarten market
  35: 'kindergarten-worksheets-market',
  // 36: "kindergarten-math-fundamentals" → math fact fluency
  36: 'math-fact-fluency-printables-sell',
  // 37: "top-10-worksheet-generators-1st-grade" → addition worksheets
  37: 'sell-addition-worksheets-etsy-guide',
  // 38: "1st-grade-literacy-tools" → alphabet/handwriting
  38: 'alphabet-worksheets-best-sellers',
  // 39: "top-10-worksheet-generators-2nd-grade" → subtraction
  39: 'sell-subtraction-worksheets-online',
  // 40: "2nd-grade-critical-thinking" → odd one out/puzzles
  40: 'odd-one-out-worksheets-sell',
  // 41: "top-10-worksheet-generators-3rd-grade" → math worksheets
  41: 'math-worksheet-bundles-that-sell',
  // 42: "third-grade-advanced-math-symbolic-algebra" → code addition
  42: 'code-addition-puzzles-sell-etsy',
  // 43: "top-10-worksheet-generators-4th-5th-grade" → worksheet bundles
  43: 'printable-bundle-strategy-etsy',
  // 44: "upper-elementary-challenges" → worksheet difficulty
  44: 'worksheet-difficulty-levels-product-tiers',
  // 45: "picture-based-generators-esl-beginners" → ESL market
  45: 'esl-worksheets-global-market',
  // 46: "multi-language-scandinavian-markets" → multilingual
  46: 'multilingual-printables-advantage',
  // 47: "visual-learning-special-education" → special education
  47: 'special-education-printables-sell',
  // 48: "adhd-friendly-worksheet-activities" → special education
  48: 'special-education-printables-sell',
  // 49: "occupational-therapy-fine-motor" → fine motor
  49: 'fine-motor-activities-printables',
  // 50: "dyslexia-friendly-worksheet-strategies" → sight words
  50: 'sight-words-worksheets-business',
  // 51: "math-anxiety-reduction-worksheets" → math fact fluency
  51: 'math-fact-fluency-printables-sell',
  // 52: "gifted-education-challenge-extension" → worksheet difficulty
  52: 'worksheet-difficulty-levels-product-tiers',
  // 53: "working-memory-accommodation-worksheets" → special education
  53: 'special-education-printables-sell',
  // 54: "autism-friendly-visual-learning" → special education
  54: 'special-education-printables-sell',
  // 55: "kinesthetic-learning-movement-worksheets" → brain break
  55: 'brain-break-printables-teachers',
  // 56: "visual-spatial-skills-development" → pattern worksheets
  56: 'pattern-worksheets-sell-online',
  // 57: "parent-homeschool-worksheet-generators" → homeschool
  57: 'homeschool-printables-growing-market',
  // 58: "commercial-license-selling-worksheets" → commercial license
  58: 'commercial-license-printables-explained',
  // 59: "science-vocabulary-crosscurricular" → word search
  59: 'word-search-printables-profit',
  // 60: "social-studies-vocabulary-integration" → crossword
  60: 'crossword-books-kdp-niche',
  // 61: "assessment-progress-tracking-data" → answer key importance
  61: 'answer-key-importance-printable-sales',
  // 62: "back-to-school-seasonal-worksheet-planning" → back to school
  62: 'back-to-school-printable-rush',
  // 63: "classroom-management-worksheet-integration" → brain break
  63: 'brain-break-printables-teachers',
  // 64: "time-saving-workflow-batch-preparation" → batch create
  64: 'batch-create-worksheets-efficiently',
  // 65: "print-digital-worksheet-delivery" → file formats
  65: 'printable-file-formats-pdf-jpeg-guide',
  // 66: "co-teaching-resource-room-collaboration" → special education
  66: 'special-education-printables-sell',
  // 67: "summer-learning-preventing-summer-slide" → summer
  67: 'summer-activity-printables-sell',
  // 68: "reading-comprehension-vocabulary-building" → sight words
  68: 'sight-words-worksheets-business',
  // 69: "formative-assessment-progress-monitoring" → answer key
  69: 'answer-key-importance-printable-sales',
  // 70: "parent-engagement-home-school-connection" → educational printables new parents
  70: 'educational-printables-new-parents',
  // 71: "early-childhood-prek-kindergarten-activities" → toddler
  71: 'toddler-activity-printables-sell',
  // 72: "upper-elementary-grades-4-5-challenge" → printable bundle
  72: 'printable-bundle-strategy-etsy',
  // 73: "test-preparation-standardized-assessment" → worksheet quality
  73: 'worksheet-quality-vs-quantity-etsy',
  // 74: "learning-centers-station-rotation" → repurpose worksheets
  74: 'repurpose-worksheets-multiple-products',
  // 75: "backward-design-curriculum-mapping" → curriculum packs
  75: 'create-printable-curriculum-packs',
  // 76: "middle-school-transition-preparation" → worksheet difficulty
  76: 'worksheet-difficulty-levels-product-tiers',
  // 77: "data-analysis-instructional-decisions" → chart count
  77: 'chart-count-worksheets-business',
  // 78: "growth-mindset-development-classroom" → printable business mindset
  78: 'printable-business-mistakes-avoid',
  // 79: "writing-across-curriculum-integration" → handwriting
  79: 'handwriting-worksheets-etsy-niche',
  // 80: "student-goal-setting-self-monitoring" → scale business
  80: 'scale-printable-business-automation',
  // 81: "stem-steam-integration-hands-on" → math puzzle
  81: 'math-puzzle-books-amazon-kdp',
  // 82: "blended-learning-technology-integration" → printable no design skills
  82: 'printable-business-no-design-skills',
  // 83: "social-emotional-learning-sel" → matching worksheets
  83: 'matching-worksheets-toddler-market',
  // 84: "peer-tutoring-student-teaching" → worksheet bundles
  84: 'math-worksheet-bundles-that-sell',
  // 85: "professional-development-teacher-training" → etsy shop first month
  85: 'etsy-printable-shop-first-month',
  // 86: "substitute-teacher-emergency-plans" → free samples lead magnet
  86: 'free-printable-samples-lead-magnet',
  // 87: "classroom-celebrations-motivational" → printable games birthday
  87: 'printable-games-birthday-parties',
  // 88: "budget-friendly-classroom-resources" → etsy pricing strategy
  88: 'etsy-printable-pricing-strategy',
  // 89: "year-end-review-reflection-strategies" → update old listings
  89: 'update-old-printable-listings-boost-sales',
  // 90: "first-week-school-getting-started" → back to school
  90: 'back-to-school-printable-rush',
  // 91: "cross-curricular-connections-integration" → repurpose worksheets
  91: 'repurpose-worksheets-multiple-products',
  // 92: "advanced-differentiation-multi-level" → worksheet difficulty
  92: 'worksheet-difficulty-levels-product-tiers',
  // 93: "intervention-response-rti" → special education
  93: 'special-education-printables-sell',
  // 94: "creative-assessment-alternatives" → worksheet design tips
  94: 'worksheet-design-tips-sell-more',
  // 95: "classroom-technology-tools-digital" → worksheet generator vs canva
  95: 'worksheet-generator-vs-canva-comparison',
  // 96: "english-language-learners-ell-esl" → ESL
  96: 'esl-worksheets-global-market',
  // 97: "independent-work-time-management" → batch create
  97: 'batch-create-worksheets-efficiently',
  // 98: "mental-health-social-emotional-classroom" → brain break
  98: 'brain-break-printables-teachers',
  // 99: "homework-vs-classwork-balanced-approach" → format worksheets
  99: 'format-worksheets-etsy-listing',
  // 100: "celebrating-100-days-milestone-activities" → new year printables
  100: 'new-year-printables-january',
  // 101: "generator-comparison-lessoncraftstudio-vs-competitors" → comparison
  101: 'worksheet-generator-vs-canva-comparison',
  // 102: "transition-times-procedures-smooth-classroom" → brain break
  102: 'brain-break-printables-teachers',
  // 103: "music-arts-integration-creative-worksheets" → coloring
  103: 'coloring-pages-business-2026',
  // 104: "critical-thinking-problem-solving" → puzzle bundle
  104: 'math-puzzle-books-amazon-kdp',
  // 105: "getting-started-guide-new-teachers" → etsy shop first month
  105: 'etsy-printable-shop-first-month',
  // 106: "seasonal-activities-year-round-engagement" → seasonal calendar
  106: 'seasonal-printable-calendar-sellers',
  // 107: "maximizing-learning-time-efficiency" → batch create
  107: 'batch-create-worksheets-efficiently',
  // 108: "complete-how-to-guide-worksheet-generators" → create worksheet bundle
  108: 'create-worksheet-bundle-35-minutes',
  // 109: "copyright-compliance-educational-materials" → copyright
  109: 'copyright-printable-sellers-basics',
  // 110: "success-stories-teacher-testimonials" → printable business income
  110: 'printable-business-income-realistic',
  // 111: "future-of-education-technology-trends" → printable no design skills
  111: 'printable-business-no-design-skills',
  // 112: "your-complete-yearly-planning-guide" → seasonal calendar
  112: 'seasonal-printable-calendar-sellers',
};

// ============================================================
// STEP 2: Load blog-page-slugs to get localized slugs
// ============================================================

function extractBlogSlugs() {
  const slugsFile = fs.readFileSync(
    path.join(__dirname, '..', 'frontend', 'config', 'blog-page-slugs.ts'),
    'utf8'
  );

  // Parse the blogPageSlugs array from the TypeScript file
  const entries = [];
  const regex = /\{\s*blogId:\s*'([^']+)',\s*slugs:\s*\{([^}]+)\}/g;
  let match;
  while ((match = regex.exec(slugsFile)) !== null) {
    const blogId = match[1];
    const slugsStr = match[2];
    const slugs = {};
    const slugRegex = /(\w+):\s*'([^']+)'/g;
    let slugMatch;
    while ((slugMatch = slugRegex.exec(slugsStr)) !== null) {
      slugs[slugMatch[1]] = slugMatch[2];
    }
    entries.push({ blogId, slugs });
  }

  return entries;
}

// ============================================================
// STEP 3: Generate the full redirect map
// ============================================================

function main() {
  const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

  // Load legacy slugs
  const legacyPath = path.join(__dirname, 'blog-legacy-slugs.json');
  const legacyData = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));

  // Load current blog slugs
  const blogSlugs = extractBlogSlugs();
  const blogIdToSlugs = {};
  for (const entry of blogSlugs) {
    blogIdToSlugs[entry.blogId] = entry.slugs;
  }

  // Verify all target blogIds exist
  const missingTargets = [];
  for (const [idx, blogId] of Object.entries(POST_INDEX_TO_BLOG_ID)) {
    if (!blogIdToSlugs[blogId]) {
      missingTargets.push({ postIndex: idx, blogId });
    }
  }
  if (missingTargets.length > 0) {
    console.error('ERROR: Target blogIds not found in blog-page-slugs.ts:');
    missingTargets.forEach(m => console.error(`  postIndex ${m.postIndex}: ${m.blogId}`));
    process.exit(1);
  }

  // Build redirect entries: oldSlug → newSlug (locale-specific)
  const redirectEntries = [];
  let unmappedCount = 0;

  for (const entry of legacyData) {
    const { oldSlug, locale, postIndex } = entry;
    const targetBlogId = POST_INDEX_TO_BLOG_ID[postIndex];

    if (!targetBlogId) {
      // Unmapped — redirect to blog index
      redirectEntries.push({
        key: `${locale}/blog/${oldSlug}`,
        value: `/${locale}/blog`,
      });
      unmappedCount++;
      continue;
    }

    // Get the localized slug for the target blogId
    const targetSlugs = blogIdToSlugs[targetBlogId];
    const localizedSlug = targetSlugs[locale] || targetSlugs.en; // fallback to EN

    redirectEntries.push({
      key: `${locale}/blog/${oldSlug}`,
      value: `/${locale}/blog/${localizedSlug}`,
    });
  }

  console.log(`Total redirect entries: ${redirectEntries.length}`);
  console.log(`Mapped to specific posts: ${redirectEntries.length - unmappedCount}`);
  console.log(`Mapped to blog index: ${unmappedCount}`);

  // Per-locale stats
  const byLocale = {};
  for (const entry of redirectEntries) {
    const locale = entry.key.split('/')[0];
    byLocale[locale] = (byLocale[locale] || 0) + 1;
  }
  console.log('\nPer-locale redirect counts:');
  for (const locale of LOCALES) {
    console.log(`  ${locale}: ${byLocale[locale] || 0}`);
  }

  // Generate TypeScript file
  const tsContent = `/**
 * Blog Legacy Redirect Map (Auto-generated)
 *
 * Maps old academic blog slugs to new seller-focused blog slugs.
 * Generated: ${new Date().toISOString()}
 * Total redirects: ${redirectEntries.length}
 *
 * Usage in middleware.ts:
 *   import { getBlogLegacyRedirect } from '@/config/blog-legacy-redirect-map';
 *   const redirect = getBlogLegacyRedirect(pathname);
 *   if (redirect) return NextResponse.redirect(new URL(redirect, request.url), 301);
 */

const blogLegacyRedirectMap = new Map<string, string>([
${redirectEntries.map(e => `  ['${e.key}', '${e.value}'],`).join('\n')}
]);

/**
 * Check if a pathname matches a legacy blog slug and return the redirect target.
 * @param pathname - The request pathname (e.g., '/en/blog/old-academic-slug')
 * @returns The redirect path (e.g., '/en/blog/new-seller-slug') or null
 */
export function getBlogLegacyRedirect(pathname: string): string | null {
  // Extract locale/blog/slug from pathname
  const match = pathname.match(/^\\/([a-z]{2})\\/blog\\/(.+?)\\/?$/);
  if (!match) return null;

  const [, locale, slug] = match;
  const key = \`\${locale}/blog/\${slug}\`;
  return blogLegacyRedirectMap.get(key) ?? null;
}
`;

  const outputPath = path.join(__dirname, '..', 'frontend', 'config', 'blog-legacy-redirect-map.ts');
  fs.writeFileSync(outputPath, tsContent, 'utf8');
  console.log(`\nGenerated: ${outputPath}`);

  // Also verify a few sample redirects
  console.log('\nSample redirects:');
  const samples = redirectEntries.filter(e => e.key.startsWith('en/')).slice(0, 10);
  for (const s of samples) {
    console.log(`  /${s.key} → ${s.value}`);
  }
}

main();
