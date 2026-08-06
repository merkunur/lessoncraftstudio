/**
 * One-time script: Add full-length old blog slug redirects to blog-legacy-redirect-map.ts
 *
 * These old academic blog URLs have full-length slugs that Google indexed.
 * The existing redirect map has shortened versions, but the full URLs still return 410.
 * This script adds entries for the full-length slugs across all 11 locales.
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// The 53 old full-length English slugs and their target blogIds
const REDIRECTS = [
  { old: 'backward-design-curriculum-mapping-planning-with-end-goals-in-mind', target: 'create-worksheet-bundle-35-minutes' },
  { old: 'future-of-education-technology-trends-the-role-of-worksheet-generators', target: 'printable-business-no-design-skills' },
  { old: 'combining-visual-verbal-learning-for-23-better-recall', target: 'worksheet-design-tips-sell-more' },
  { old: 'commercial-license-selling-worksheets-on-tpt-etsy-and-teacher-marketplaces', target: 'commercial-license-printables-explained' },
  { old: 'top-10-worksheet-generators-for-kindergarten-teachers-ages-5-6', target: 'kindergarten-worksheets-market' },
  { old: 'visual-spatial-skills-development-7-worksheets-for-stem-foundation', target: 'pattern-worksheets-sell-online' },
  { old: 'worksheet-generator-comparison-lessoncraftstudio-vs-competitors', target: 'worksheet-generator-vs-canva-comparison' },
  { old: 'middle-school-transition-preparing-5th-graders-for-independent-learning', target: 'back-to-school-printable-rush' },
  { old: 'smart-cell-detection-in-grid-drawing-how-pixel-analysis-prevents-blank-clue-cells', target: 'hidden-object-worksheets-business' },
  { old: 'occupational-therapy-goals-fine-motor-worksheet-activities', target: 'fine-motor-activities-printables' },
  { old: 'summer-learning-preventing-summer-slide-with-take-home-worksheet-packets', target: 'summer-activity-printables-sell' },
  { old: 'image-crossword-generator-post-generation-editing-feature', target: 'crossword-books-kdp-niche' },
  { old: 'ultimate-guide-to-differentiated-instruction-with-editable-worksheet-generators', target: 'worksheet-difficulty-levels-product-tiers' },
  { old: '2nd-grade-critical-thinking-crosswords-cryptograms-logic-puzzles', target: 'cryptogram-worksheets-sell' },
  { old: 'orthographic-learning-theory-how-word-puzzles-create-sight-word-automaticity', target: 'word-search-printables-profit' },
  { old: 'evidence-based-classroom-management-strategies-with-worksheet-integration', target: 'brain-break-printables-teachers' },
  { old: 'executive-function-development-ages-3-8-planning-organizing-self-monitoring', target: 'sorting-worksheets-preschool-sell' },
  { old: 'math-anxiety-reduction-through-low-stakes-worksheet-practice', target: 'sell-addition-worksheets-etsy-guide' },
  { old: 'spaced-repetition-science-optimal-review-schedules-for-worksheet-based-learning', target: 'math-fact-fluency-printables-sell' },
  { old: 'zone-of-proximal-development-scaffolding-with-adjustable-worksheet-difficulty', target: 'worksheet-difficulty-levels-product-tiers' },
  { old: 'universal-design-for-learning-how-worksheet-generators-support-all-learners', target: 'special-education-printables-sell' },
  { old: 'metacognition-and-self-regulated-learning-teaching-students-to-think-about-thinking', target: 'create-worksheet-bundle-35-minutes' },
  { old: 'growth-mindset-worksheets-teaching-persistence-through-productive-struggle', target: 'printable-business-mistakes-avoid' },
  { old: 'multilingual-classroom-strategies-supporting-ells-with-visual-worksheets', target: 'esl-worksheets-global-market' },
  { old: 'formative-assessment-strategies-using-worksheets-for-daily-progress-monitoring', target: 'answer-key-importance-printable-sales' },
  { old: 'fine-motor-development-timeline-birth-to-age-8-activity-recommendations', target: 'tracing-worksheets-fine-motor-sell' },
  { old: 'color-theory-in-educational-materials-how-worksheet-design-affects-learning', target: 'coloring-pages-business-2026' },
  { old: 'pattern-recognition-cognitive-development-from-simple-sequences-to-complex-rules', target: 'pattern-train-worksheets-niche' },
  { old: 'number-sense-development-building-mathematical-intuition-through-structured-practice', target: 'math-worksheet-bundles-that-sell' },
  { old: 'vocabulary-acquisition-research-how-word-puzzles-accelerate-language-development', target: 'word-scramble-printables-business' },
  { old: 'spatial-reasoning-and-mathematics-the-hidden-connection-research-review', target: 'picture-sudoku-books-kdp' },
  { old: 'print-awareness-and-early-literacy-how-worksheets-support-emergent-readers', target: 'sight-words-worksheets-business' },
  { old: 'attention-span-development-age-appropriate-worksheet-duration-guidelines', target: 'preschool-printables-best-sellers' },
  { old: 'parent-teacher-collaboration-using-worksheets-as-communication-tools', target: 'educational-printables-new-parents' },
  { old: 'sensory-processing-and-worksheet-design-accommodations-for-sensory-sensitivities', target: 'matching-worksheets-toddler-market' },
  { old: 'bilingual-education-benefits-how-dual-language-worksheets-build-cognitive-flexibility', target: 'multilingual-printables-advantage' },
  { old: 'project-based-learning-integration-using-worksheet-generators-as-pbl-tools', target: 'create-activity-book-kdp-start-finish' },
  { old: 'rubric-design-creating-clear-assessment-criteria-for-worksheet-based-assignments', target: 'format-worksheets-etsy-listing' },
  { old: 'homework-effectiveness-research-optimal-worksheet-assignments-by-grade-level', target: 'batch-create-worksheets-efficiently' },
  { old: 'classroom-technology-integration-balancing-digital-and-paper-based-learning', target: 'worksheet-generator-vs-canva-comparison' },
  { old: 'reading-comprehension-strategies-using-crossword-and-word-puzzles-for-deep-processing', target: 'crossword-books-kdp-niche' },
  { old: 'writing-development-stages-from-scribbling-to-sentences-worksheet-support', target: 'handwriting-worksheets-etsy-niche' },
  { old: 'social-emotional-learning-sel-worksheet-activities-for-emotional-regulation', target: 'printable-games-birthday-parties' },
  { old: 'steam-education-integrating-arts-into-stem-through-creative-worksheets', target: 'draw-and-color-worksheets-sell' },
  { old: 'memory-and-learning-how-retrieval-practice-with-worksheets-strengthens-retention', target: 'word-guess-game-worksheets-sell' },
  { old: 'inclusive-education-adapting-worksheets-for-diverse-learning-needs', target: 'special-education-printables-sell' },
  { old: 'assessment-literacy-for-teachers-understanding-what-worksheets-really-measure', target: 'etsy-printable-pricing-strategy' },
  { old: 'play-based-learning-research-when-worksheets-help-and-when-play-is-better', target: 'toddler-activity-printables-sell' },
  { old: 'cognitive-load-theory-designing-worksheets-that-dont-overwhelm-young-learners', target: 'best-paper-sizes-printable-products' },
  { old: 'systematic-phonics-instruction-using-worksheet-generators-for-decoding-practice', target: 'alphabet-worksheets-best-sellers' },
  { old: 'subitizing-and-early-numeracy-building-instant-number-recognition-with-worksheets', target: 'more-less-worksheets-sell' },
  { old: 'puzzle-based-learning-how-sudoku-mazes-and-logic-puzzles-build-problem-solving', target: 'picture-sudoku-books-kdp' },
  { old: 'physical-education-integration-movement-breaks-and-active-worksheet-strategies', target: 'brain-break-printables-teachers' },
];

// German-specific old slug (de locale only)
const GERMAN_SPECIFIC = [
  { old: 'rueckwaertsplanung-lehrplangestaltung-unterricht-vom-lernziel-her-denken', target: 'create-worksheet-bundle-35-minutes', locale: 'de' },
];

// Parse blog-page-slugs.ts to extract blogId → locale slugs mapping
function parseBlogPageSlugs() {
  const filePath = path.join(__dirname, '..', 'frontend', 'config', 'blog-page-slugs.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  const blogIdToSlugs = {};

  // Match each { blogId: '...', slugs: { ... } } entry
  const regex = /\{\s*blogId:\s*'([^']+)',\s*slugs:\s*\{([^}]+)\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const blogId = match[1];
    const slugsStr = match[2];

    const slugs = {};
    const slugRegex = /(\w+):\s*'([^']+)'/g;
    let slugMatch;
    while ((slugMatch = slugRegex.exec(slugsStr)) !== null) {
      slugs[slugMatch[1]] = slugMatch[2];
    }
    blogIdToSlugs[blogId] = slugs;
  }

  return blogIdToSlugs;
}

// Read existing redirect map to check for duplicates
function getExistingKeys() {
  const filePath = path.join(__dirname, '..', 'frontend', 'config', 'blog-legacy-redirect-map.ts');
  const content = fs.readFileSync(filePath, 'utf8');

  const keys = new Set();
  const regex = /\['([^']+)',\s*'/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.add(match[1]);
  }
  return keys;
}

function main() {
  const blogIdToSlugs = parseBlogPageSlugs();
  const existingKeys = getExistingKeys();

  console.log(`Parsed ${Object.keys(blogIdToSlugs).length} blog entries from blog-page-slugs.ts`);
  console.log(`Found ${existingKeys.size} existing redirect keys`);

  // Verify all target blogIds exist
  const missingTargets = [];
  for (const r of REDIRECTS) {
    if (!blogIdToSlugs[r.target]) {
      missingTargets.push(r.target);
    }
  }
  for (const r of GERMAN_SPECIFIC) {
    if (!blogIdToSlugs[r.target]) {
      missingTargets.push(r.target);
    }
  }
  if (missingTargets.length > 0) {
    console.error('ERROR: Missing target blogIds in blog-page-slugs.ts:');
    missingTargets.forEach(t => console.error(`  - ${t}`));
    process.exit(1);
  }

  // Generate new entries
  const newEntries = [];
  let skipped = 0;

  // 53 English slugs x 11 locales
  for (const r of REDIRECTS) {
    const targetSlugs = blogIdToSlugs[r.target];
    for (const locale of LOCALES) {
      const key = `${locale}/blog/${r.old}`;
      if (existingKeys.has(key)) {
        skipped++;
        continue;
      }
      const localizedNewSlug = targetSlugs[locale] || targetSlugs.en;
      newEntries.push(`  ['${key}', '/${locale}/blog/${localizedNewSlug}'],`);
    }
  }

  // German-specific slugs
  for (const r of GERMAN_SPECIFIC) {
    const targetSlugs = blogIdToSlugs[r.target];
    const key = `${r.locale}/blog/${r.old}`;
    if (existingKeys.has(key)) {
      skipped++;
      continue;
    }
    const localizedNewSlug = targetSlugs[r.locale] || targetSlugs.en;
    newEntries.push(`  ['${key}', '/${r.locale}/blog/${localizedNewSlug}'],`);
  }

  console.log(`\nGenerated ${newEntries.length} new entries (skipped ${skipped} duplicates)`);

  if (newEntries.length === 0) {
    console.log('No new entries to add.');
    return;
  }

  // Insert entries into the redirect map file before the closing ]);
  const mapFile = path.join(__dirname, '..', 'frontend', 'config', 'blog-legacy-redirect-map.ts');
  let content = fs.readFileSync(mapFile, 'utf8');

  // Find the closing ]); of the Map
  const insertPoint = content.lastIndexOf(']);');
  if (insertPoint === -1) {
    console.error('ERROR: Could not find ]); in redirect map file');
    process.exit(1);
  }

  // Build the new block with a comment header
  const newBlock = [
    '',
    '  // === Full-length old academic slugs (53 x 11 locales + German-specific) ===',
    '  // Added ' + new Date().toISOString().split('T')[0],
    ...newEntries,
  ].join('\n');

  // Insert before ]);
  content = content.slice(0, insertPoint) + newBlock + '\n' + content.slice(insertPoint);

  // Update the total count in the header comment
  const oldCount = existingKeys.size;
  const newCount = oldCount + newEntries.length;
  content = content.replace(
    /Total redirects: \d+/,
    `Total redirects: ${newCount}`
  );

  // Update the generated date
  content = content.replace(
    /Generated: .+/,
    `Generated: ${new Date().toISOString()}`
  );

  fs.writeFileSync(mapFile, content, 'utf8');
  console.log(`\nUpdated ${mapFile}`);
  console.log(`Total redirects: ${oldCount} → ${newCount}`);
}

main();
