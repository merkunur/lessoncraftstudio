/**
 * Enrich Internal Links — Replace tool links with cross-category links
 *
 * For app content files:
 * - Remove tool links (noindexed pages — wasted equity)
 * - Replace generic idea links with topically relevant ones
 * - Replace uniform start link with category-relevant one
 * - Add matching "create-X" guide link if missing
 *
 * For bundle content files:
 * - Remove all tool links
 * - Add guide, start, and idea cross-category links
 */

const fs = require('fs');
const path = require('path');

// ── Category Assignments ──

const mathApps = ['addition', 'subtraction', 'code-addition', 'more-less', 'math-puzzle', 'math-worksheet'];
const literacyApps = ['wordsearch', 'word-scramble', 'word-guess', 'cryptogram', 'alphabet-train', 'prepositions', 'writing'];
const visualApps = ['coloring', 'draw-and-color', 'drawing-lines', 'chart-count'];
const matchingApps = ['matching', 'shadow-match', 'big-small', 'grid-match'];
const puzzleApps = ['crossword', 'sudoku', 'missing-pieces', 'odd-one-out', 'pattern-train', 'pattern-worksheet'];
const searchApps = ['find-and-count', 'find-objects', 'bingo', 'picture-sort', 'picture-path', 'treasure-hunt'];

function getCategory(appName) {
  if (mathApps.includes(appName)) return 'math';
  if (literacyApps.includes(appName)) return 'literacy';
  if (visualApps.includes(appName)) return 'visual';
  if (matchingApps.includes(appName)) return 'matching';
  if (puzzleApps.includes(appName)) return 'puzzle';
  if (searchApps.includes(appName)) return 'search';
  return null;
}

// ── Replacement Maps ──

const categoryIdeas = {
  math: [
    { slug: 'math-facts-printable-ideas', anchorText: 'Math Facts Printable Ideas for Educators & Sellers' },
    { slug: 'back-to-school-printable-ideas', anchorText: 'Back-to-School Printable Ideas That Sell' },
  ],
  literacy: [
    { slug: 'esl-printable-ideas', anchorText: 'ESL Printable Ideas for Language Learning' },
    { slug: 'homeschool-printable-ideas', anchorText: 'Homeschool Printable Ideas for Parents & Educators' },
  ],
  visual: [
    { slug: 'summer-printable-ideas', anchorText: "Summer Printable Ideas for Kids\u2019 Activities" },
    { slug: 'christmas-printable-ideas', anchorText: 'Christmas Printable Ideas for Seasonal Sales' },
  ],
  matching: [
    { slug: 'preschool-printable-ideas', anchorText: 'Preschool Printable Ideas for Early Learners' },
    { slug: 'kindergarten-printable-ideas', anchorText: 'Kindergarten Printable Ideas for Young Students' },
  ],
  puzzle: [
    { slug: 'first-grade-printable-ideas', anchorText: 'First Grade Printable Ideas for Primary Education' },
    { slug: 'second-grade-printable-ideas', anchorText: 'Second Grade Printable Ideas for Growing Learners' },
  ],
  search: [
    { slug: 'camping-printable-ideas', anchorText: 'Camping Printable Ideas for Outdoor Learning' },
    { slug: 'ocean-animals-printable-ideas', anchorText: 'Ocean Animals Printable Ideas for Marine Themes' },
  ],
};

const categoryStart = {
  math: { slug: 'create-worksheets-that-sell', anchorText: 'How to Create Worksheets That Sell' },
  literacy: { slug: 'complete-guide-printable-business', anchorText: 'The Complete Guide to Starting a Printable Business' },
  visual: { slug: 'etsy-printable-business', anchorText: 'Build Your Etsy Printable Business' },
  matching: { slug: 'printable-business-blueprint', anchorText: 'Your Printable Business Blueprint' },
  puzzle: { slug: 'amazon-kdp-activity-books', anchorText: 'Publish Activity Books on Amazon KDP' },
  search: { slug: 'marketing-printable-business', anchorText: 'Marketing Your Printable Business' },
};

// App-specific "create-X" guide to add if not already present
const appGuideMap = {
  addition: { slug: 'create-addition-worksheets', anchorText: 'How to Create Addition Worksheets That Sell' },
  subtraction: { slug: 'create-subtraction-worksheets', anchorText: 'How to Create Subtraction Worksheets That Sell' },
  'code-addition': { slug: 'create-addition-worksheets', anchorText: 'How to Create Addition Worksheets That Sell' },
  'more-less': { slug: 'create-counting-worksheets', anchorText: 'How to Create Counting & Comparison Worksheets' },
  'math-puzzle': { slug: 'create-math-puzzle-worksheets', anchorText: 'How to Create Math Puzzle Worksheets' },
  'math-worksheet': { slug: 'sell-math-worksheets-etsy', anchorText: 'Guide to Selling Math Worksheets on Etsy' },
  wordsearch: { slug: 'create-word-search-puzzles', anchorText: 'How to Create Word Search Puzzles That Sell' },
  'word-scramble': { slug: 'create-word-search-puzzles', anchorText: 'How to Create Word Puzzles That Sell' },
  'word-guess': { slug: 'create-word-search-puzzles', anchorText: 'How to Create Word Puzzles That Sell' },
  cryptogram: { slug: 'create-cryptogram-puzzles', anchorText: 'How to Create Cryptogram Puzzles' },
  'alphabet-train': { slug: 'create-alphabet-worksheets', anchorText: 'How to Create Alphabet Worksheets' },
  prepositions: { slug: 'create-preposition-worksheets', anchorText: 'How to Create Preposition Worksheets' },
  writing: { slug: 'create-handwriting-sheets', anchorText: 'How to Create Handwriting Practice Sheets' },
  coloring: { slug: 'create-coloring-pages', anchorText: 'How to Create Coloring Pages That Sell' },
  'draw-and-color': { slug: 'create-drawing-worksheets', anchorText: 'How to Create Drawing Worksheets' },
  'drawing-lines': { slug: 'create-drawing-worksheets', anchorText: 'How to Create Drawing & Tracing Worksheets' },
  'chart-count': { slug: 'create-chart-count-worksheets', anchorText: 'How to Create Chart & Count Worksheets' },
  matching: { slug: 'create-matching-worksheets', anchorText: 'How to Create Matching Worksheets' },
  'shadow-match': { slug: 'create-shadow-matching-worksheets', anchorText: 'How to Create Shadow Matching Worksheets' },
  'big-small': { slug: 'create-size-comparison-worksheets', anchorText: 'How to Create Size Comparison Worksheets' },
  'grid-match': { slug: 'create-matching-worksheets', anchorText: 'How to Create Matching & Grid Worksheets' },
  crossword: { slug: 'create-crossword-puzzles', anchorText: 'How to Create Crossword Puzzles That Sell' },
  sudoku: { slug: 'create-picture-sudoku', anchorText: 'How to Create Picture Sudoku for Kids' },
  'missing-pieces': { slug: 'create-missing-pieces-puzzles', anchorText: 'How to Create Missing Pieces Puzzles' },
  'odd-one-out': { slug: 'create-odd-one-out-puzzles', anchorText: 'How to Create Odd One Out Puzzles' },
  'pattern-train': { slug: 'create-pattern-worksheets', anchorText: 'How to Create Pattern Worksheets' },
  'pattern-worksheet': { slug: 'create-pattern-worksheets', anchorText: 'How to Create Pattern Recognition Worksheets' },
  'find-and-count': { slug: 'create-counting-worksheets', anchorText: 'How to Create Find & Count Worksheets' },
  'find-objects': { slug: 'create-hidden-object-worksheets', anchorText: 'How to Create Hidden Object Worksheets' },
  bingo: { slug: 'create-bingo-cards', anchorText: 'How to Create Bingo Cards That Sell' },
  'picture-sort': { slug: 'create-sorting-worksheets', anchorText: 'How to Create Sorting Worksheets' },
  'picture-path': { slug: 'create-maze-worksheets', anchorText: 'How to Create Maze & Path Worksheets' },
  'treasure-hunt': { slug: 'create-treasure-hunt-worksheets', anchorText: 'How to Create Treasure Hunt Worksheets' },
};

// ── Bundle Cross-Category Links ──

const bundleCrossLinks = {
  'math-bundle': [
    { pageType: 'guide', slug: 'sell-math-worksheets-etsy', anchorText: 'How to Sell Math Worksheets on Etsy' },
    { pageType: 'guide', slug: 'math-activity-books-kdp', anchorText: 'Publish Math Activity Books on Amazon KDP' },
    { pageType: 'start', slug: 'create-worksheets-that-sell', anchorText: 'How to Create Worksheets That Sell' },
    { pageType: 'idea', slug: 'math-facts-printable-ideas', anchorText: 'Math Facts Printable Ideas for Educators & Sellers' },
  ],
  'literacy-bundle': [
    { pageType: 'guide', slug: 'sell-word-search-etsy', anchorText: 'How to Sell Word Search Puzzles on Etsy' },
    { pageType: 'guide', slug: 'create-word-search-puzzles', anchorText: 'How to Create Word Search Puzzles That Sell' },
    { pageType: 'start', slug: 'complete-guide-printable-business', anchorText: 'The Complete Guide to Starting a Printable Business' },
    { pageType: 'idea', slug: 'esl-printable-ideas', anchorText: 'ESL Printable Ideas for Language Learning' },
  ],
  'visual-bundle': [
    { pageType: 'guide', slug: 'create-etsy-coloring-pages', anchorText: 'How to Create & Sell Coloring Pages on Etsy' },
    { pageType: 'guide', slug: 'create-drawing-worksheets', anchorText: 'How to Create Drawing Worksheets' },
    { pageType: 'start', slug: 'etsy-printable-business', anchorText: 'Build Your Etsy Printable Business' },
    { pageType: 'idea', slug: 'summer-printable-ideas', anchorText: "Summer Printable Ideas for Kids\u2019 Activities" },
  ],
  'matching-bundle': [
    { pageType: 'guide', slug: 'create-matching-worksheets', anchorText: 'How to Create Matching Worksheets' },
    { pageType: 'guide', slug: 'create-shadow-matching-worksheets', anchorText: 'How to Create Shadow Matching Worksheets' },
    { pageType: 'start', slug: 'printable-business-blueprint', anchorText: 'Your Printable Business Blueprint' },
    { pageType: 'idea', slug: 'preschool-printable-ideas', anchorText: 'Preschool Printable Ideas for Early Learners' },
  ],
  'puzzle-bundle': [
    { pageType: 'guide', slug: 'create-crossword-puzzles', anchorText: 'How to Create Crossword Puzzles That Sell' },
    { pageType: 'guide', slug: 'publish-puzzle-books-kdp', anchorText: 'How to Publish Puzzle Books on Amazon KDP' },
    { pageType: 'start', slug: 'amazon-kdp-activity-books', anchorText: 'Publish Activity Books on Amazon KDP' },
    { pageType: 'idea', slug: 'first-grade-printable-ideas', anchorText: 'First Grade Printable Ideas for Primary Education' },
  ],
  'search-bundle': [
    { pageType: 'guide', slug: 'create-hidden-object-worksheets', anchorText: 'How to Create Hidden Object Worksheets' },
    { pageType: 'guide', slug: 'create-treasure-hunt-worksheets', anchorText: 'How to Create Treasure Hunt Worksheets' },
    { pageType: 'start', slug: 'marketing-printable-business', anchorText: 'Marketing Your Printable Business' },
    { pageType: 'idea', slug: 'camping-printable-ideas', anchorText: 'Camping Printable Ideas for Outdoor Learning' },
  ],
};

// ── Generic slugs to detect and replace ──

const genericIdeaSlugs = ['farm-animals-printable-ideas', 'dinosaur-printable-ideas'];
const genericStartSlug = 'complete-guide-printable-business';

// ── Process App Content Files ──

function processAppFile(filePath) {
  const appName = path.basename(filePath, '.ts');
  const category = getCategory(appName);
  if (!category) {
    console.log(`  ⚠ Unknown category for ${appName}, skipping`);
    return 0;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Find the internalLinks array
  const linksMatch = content.match(/internalLinks:\s*\[([\s\S]*?)\],\s*\n\s*(?:visuals|$)/);
  if (!linksMatch) {
    console.log(`  ⚠ Could not find internalLinks in ${appName}`);
    return 0;
  }

  let changes = 0;

  // 1. Remove tool links
  const toolLinkPattern = /\s*\{[^}]*pageType:\s*'tool'[^}]*\},?\n?/g;
  const beforeToolRemoval = content;
  content = content.replace(toolLinkPattern, (match) => {
    // Only remove if inside internalLinks array
    return '';
  });

  // More precise: re-read and rebuild the internalLinks
  // Parse the file as text and find internalLinks block
  const startMarker = 'internalLinks: [';
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) {
    console.log(`  ⚠ No internalLinks found in ${appName}`);
    return 0;
  }

  // Find the matching closing bracket
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx + startMarker.length; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      if (depth === 0) { endIdx = i; break; }
      depth--;
    }
  }

  if (endIdx === -1) {
    console.log(`  ⚠ Could not find end of internalLinks in ${appName}`);
    return 0;
  }

  const linksBlock = content.substring(startIdx + startMarker.length, endIdx);

  // Parse individual link objects
  const linkRegex = /\{[^}]*pageType:\s*'([^']+)'[^}]*slug:\s*'([^']+)'[^}]*anchorText:\s*'([^']*)'[^}]*\}/g;
  const existingLinks = [];
  let m;
  while ((m = linkRegex.exec(linksBlock)) !== null) {
    existingLinks.push({ pageType: m[1], slug: m[2], anchorText: m[3] });
  }

  // Also try multi-line format
  const linkRegex2 = /\{\s*\n\s*pageType:\s*'([^']+)',\s*\n\s*slug:\s*'([^']+)',\s*\n\s*anchorText:\s*'([^']*)',?\s*\n\s*\}/g;
  while ((m = linkRegex2.exec(linksBlock)) !== null) {
    // Avoid duplicates
    if (!existingLinks.find(l => l.slug === m[2])) {
      existingLinks.push({ pageType: m[1], slug: m[2], anchorText: m[3] });
    }
  }

  // Build new links list
  const newLinks = [];
  const existingSlugs = new Set(existingLinks.map(l => l.slug));

  // Keep non-tool, non-generic links
  for (const link of existingLinks) {
    if (link.pageType === 'tool') {
      changes++;
      continue; // Remove tool links
    }
    if (link.pageType === 'idea' && genericIdeaSlugs.includes(link.slug)) {
      changes++;
      continue; // Will replace with category-specific
    }
    if (link.pageType === 'start' && link.slug === genericStartSlug && category !== 'literacy') {
      changes++;
      continue; // Will replace with category-specific (literacy keeps the generic one)
    }
    newLinks.push(link);
  }

  // Add category-specific ideas
  for (const idea of categoryIdeas[category]) {
    if (!existingSlugs.has(idea.slug)) {
      newLinks.push({ pageType: 'idea', ...idea });
      changes++;
    }
  }

  // Add category-specific start
  const startLink = categoryStart[category];
  if (!newLinks.find(l => l.pageType === 'start' && l.slug === startLink.slug)) {
    newLinks.push({ pageType: 'start', ...startLink });
    changes++;
  }

  // Add app-specific guide if not already present
  const guideLink = appGuideMap[appName];
  if (guideLink && !newLinks.find(l => l.slug === guideLink.slug)) {
    newLinks.push({ pageType: 'guide', ...guideLink });
    changes++;
  }

  if (changes === 0) {
    console.log(`  ✓ ${appName} — no changes needed`);
    return 0;
  }

  // Rebuild the internalLinks block
  const newLinksStr = newLinks.map(l => {
    if (l.anchorText.includes("'")) {
      // Use multi-line format for readability, escape apostrophes
      return `    {\n      pageType: '${l.pageType}',\n      slug: '${l.slug}',\n      anchorText: '${l.anchorText.replace(/'/g, "\\'")}',\n    }`;
    }
    return `    {\n      pageType: '${l.pageType}',\n      slug: '${l.slug}',\n      anchorText: '${l.anchorText}',\n    }`;
  }).join(',\n');

  const newContent = content.substring(0, startIdx) +
    'internalLinks: [\n' + newLinksStr + ',\n  ]' +
    content.substring(endIdx + 1);

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  ✅ ${appName} — ${changes} link(s) changed`);
  return changes;
}

// ── Process Bundle Content Files ──

function processBundleFile(filePath) {
  const bundleName = path.basename(filePath, '.ts');
  const crossLinks = bundleCrossLinks[bundleName];
  if (!crossLinks) {
    console.log(`  ⚠ No cross-links defined for ${bundleName}`);
    return 0;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  const startMarker = 'internalLinks: [';
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) {
    console.log(`  ⚠ No internalLinks found in ${bundleName}`);
    return 0;
  }

  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx + startMarker.length; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      if (depth === 0) { endIdx = i; break; }
      depth--;
    }
  }

  if (endIdx === -1) {
    console.log(`  ⚠ Could not find end of internalLinks in ${bundleName}`);
    return 0;
  }

  const linksBlock = content.substring(startIdx + startMarker.length, endIdx);

  // Parse existing links
  const linkRegex = /\{\s*pageType:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*anchorText:\s*'([^']*)'\s*\}/g;
  const existingLinks = [];
  let m;
  while ((m = linkRegex.exec(linksBlock)) !== null) {
    existingLinks.push({ pageType: m[1], slug: m[2], anchorText: m[3] });
  }

  let changes = 0;
  const newLinks = [];

  // Keep app links, remove tool links
  for (const link of existingLinks) {
    if (link.pageType === 'tool') {
      changes++;
      continue;
    }
    newLinks.push(link);
  }

  // Add cross-category links
  for (const link of crossLinks) {
    if (!newLinks.find(l => l.slug === link.slug)) {
      newLinks.push(link);
      changes++;
    }
  }

  if (changes === 0) {
    console.log(`  ✓ ${bundleName} — no changes needed`);
    return 0;
  }

  const newLinksStr = newLinks.map(l => {
    if (l.anchorText.includes("'")) {
      return `    { pageType: '${l.pageType}', slug: '${l.slug}', anchorText: '${l.anchorText.replace(/'/g, "\\'")}' }`;
    }
    return `    { pageType: '${l.pageType}', slug: '${l.slug}', anchorText: '${l.anchorText}' }`;
  }).join(',\n');

  const newContent = content.substring(0, startIdx) +
    'internalLinks: [\n' + newLinksStr + ',\n  ]' +
    content.substring(endIdx + 1);

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  ✅ ${bundleName} — ${changes} link(s) changed`);
  return changes;
}

// ── Main ──

const appDir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');
const bundleDir = path.join(__dirname, '..', 'frontend', 'config', 'bundle-content', 'en');

console.log('=== Enriching App Content Internal Links ===\n');
let totalChanges = 0;
const appFiles = fs.readdirSync(appDir).filter(f => f.endsWith('.ts'));
for (const file of appFiles) {
  totalChanges += processAppFile(path.join(appDir, file));
}

console.log(`\n=== Enriching Bundle Content Internal Links ===\n`);
const bundleFiles = fs.readdirSync(bundleDir).filter(f => f.endsWith('.ts'));
for (const file of bundleFiles) {
  totalChanges += processBundleFile(path.join(bundleDir, file));
}

console.log(`\n✅ Done — ${totalChanges} total link changes across ${appFiles.length + bundleFiles.length} files`);
