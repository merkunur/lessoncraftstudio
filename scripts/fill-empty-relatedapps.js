/**
 * Part 161 fix: Populate empty relatedApps items for 13 product page files.
 * Each file gets 6 thematically relevant related apps with valid slugs.
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');

// App metadata for generating related entries
const APP_META = {
  'addition-worksheets': { name: 'Addition Worksheets', cat: 'Math', icon: '\u2795', short: 'addition practice with visual counting and number sentences' },
  'subtraction-worksheets': { name: 'Subtraction Worksheets', cat: 'Math', icon: '\u2796', short: 'subtraction exercises with take-away visual problems' },
  'math-worksheets': { name: 'Math Worksheets', cat: 'Math', icon: '\uD83D\uDCCA', short: 'general math activities covering number recognition and operations' },
  'code-addition-worksheets': { name: 'Code Addition Worksheets', cat: 'Math', icon: '\uD83D\uDD22', short: 'code-breaking addition puzzles combining math with logic' },
  'math-puzzle-worksheets': { name: 'Math Puzzle Worksheets', cat: 'Math', icon: '\uD83E\uDDEE', short: 'math-based logic challenges and number puzzles' },
  'more-less-worksheets': { name: 'More or Less Worksheets', cat: 'Math', icon: '\u2696\uFE0F', short: 'quantity comparison activities for early number sense' },
  'chart-count-worksheets': { name: 'Chart & Count Worksheets', cat: 'Math', icon: '\uD83D\uDCCA', short: 'counting and graphing activities with picture charts' },
  'pattern-worksheets': { name: 'Pattern Worksheets', cat: 'Logic & Puzzles', icon: '\uD83D\uDD04', short: 'pattern recognition and sequence completion exercises' },
  'pattern-train-worksheets': { name: 'Pattern Train Worksheets', cat: 'Logic & Puzzles', icon: '\uD83D\uDE82', short: 'train-themed pattern completion and visual sequencing' },
  'sudoku-worksheets': { name: 'Sudoku Worksheets', cat: 'Logic & Puzzles', icon: '\uD83E\uDDE9', short: '4x4 picture sudoku puzzles for deductive reasoning' },
  'grid-match-worksheets': { name: 'Grid Match Worksheets', cat: 'Logic & Puzzles', icon: '\uD83D\uDD32', short: 'grid-based matching puzzles for spatial reasoning' },
  'missing-pieces-worksheets': { name: 'Missing Pieces Worksheets', cat: 'Logic & Puzzles', icon: '\uD83E\uDDE9', short: 'visual completion puzzles identifying missing parts' },
  'odd-one-out-worksheets': { name: 'Odd One Out Worksheets', cat: 'Logic & Puzzles', icon: '\uD83D\uDD0D', short: 'classification activities finding the item that does not belong' },
  'picture-path-worksheets': { name: 'Picture Path Worksheets', cat: 'Logic & Puzzles', icon: '\uD83D\uDDFA\uFE0F', short: 'maze-style path tracing with picture-based navigation' },
  'treasure-hunt-worksheets': { name: 'Treasure Hunt Worksheets', cat: 'Logic & Puzzles', icon: '\uD83C\uDFF4\u200D\u2620\uFE0F', short: 'adventure-themed search and find puzzle activities' },
  'find-objects-worksheets': { name: 'Find Objects Worksheets', cat: 'Visual Skills', icon: '\uD83D\uDD0E', short: 'visual scanning and search activities with hidden objects' },
  'find-and-count-worksheets': { name: 'Find & Count Worksheets', cat: 'Visual Skills', icon: '\uD83D\uDD22', short: 'counting-based search activities combining math with visual scanning' },
  'shadow-match-worksheets': { name: 'Shadow Match Worksheets', cat: 'Visual Skills', icon: '\uD83D\uDC64', short: 'silhouette matching activities for shape recognition' },
  'big-small-worksheets': { name: 'Big & Small Worksheets', cat: 'Visual Skills', icon: '\uD83D\uDCCF', short: 'size comparison and ordering activities for early learners' },
  'picture-sort-worksheets': { name: 'Picture Sort Worksheets', cat: 'Visual Skills', icon: '\uD83D\uDDC2\uFE0F', short: 'categorization and sorting activities with picture groups' },
  'picture-bingo-worksheets': { name: 'Picture Bingo Worksheets', cat: 'Visual Skills', icon: '\uD83C\uDFB0', short: 'bingo card generators with themed picture matching' },
  'matching-worksheets': { name: 'Matching Worksheets', cat: 'Visual Skills', icon: '\uD83E\uDD1D', short: 'picture pair matching for visual association skills' },
  'coloring-worksheets': { name: 'Coloring Worksheets', cat: 'Art & Creativity', icon: '\uD83C\uDFA8', short: 'printable coloring pages for fine motor development' },
  'draw-and-color-worksheets': { name: 'Draw & Color Worksheets', cat: 'Art & Creativity', icon: '\u270F\uFE0F', short: 'guided drawing and coloring activities for creative expression' },
  'drawing-lines-worksheets': { name: 'Drawing Lines Worksheets', cat: 'Art & Creativity', icon: '\u2702\uFE0F', short: 'line tracing and handwriting readiness exercises' },
  'writing-worksheets': { name: 'Writing Worksheets', cat: 'Literacy', icon: '\u270D\uFE0F', short: 'handwriting practice and letter formation activities' },
  'alphabet-train-worksheets': { name: 'Alphabet Train Worksheets', cat: 'Literacy', icon: '\uD83D\uDE82', short: 'train-themed alphabet sequencing and letter recognition' },
  'word-search-worksheets': { name: 'Word Search Worksheets', cat: 'Literacy', icon: '\uD83D\uDD0D', short: 'vocabulary-building word search puzzles' },
  'word-scramble-worksheets': { name: 'Word Scramble Worksheets', cat: 'Literacy', icon: '\uD83D\uDD00', short: 'letter unscrambling activities for spelling practice' },
  'word-guess-worksheets': { name: 'Word Guess Worksheets', cat: 'Literacy', icon: '\u2753', short: 'vocabulary guessing games with picture clues' },
  'crossword-worksheets': { name: 'Crossword Worksheets', cat: 'Literacy', icon: '\u2B1C', short: 'picture-based crossword puzzles for vocabulary building' },
  'cryptogram-worksheets': { name: 'Cryptogram Worksheets', cat: 'Literacy', icon: '\uD83D\uDD10', short: 'code-breaking letter puzzles for literacy and logic' },
  'prepositions-worksheets': { name: 'Prepositions Worksheets', cat: 'Literacy', icon: '\u27A1\uFE0F', short: 'spatial vocabulary activities with positional language' },
};

// Thematic groupings — each file maps to 6 related apps (no self-reference)
const RELATED_MAP = {
  'big-small-worksheets': [
    'more-less-worksheets', 'picture-sort-worksheets', 'matching-worksheets',
    'shadow-match-worksheets', 'find-objects-worksheets', 'pattern-worksheets'
  ],
  'chart-count-worksheets': [
    'addition-worksheets', 'find-and-count-worksheets', 'more-less-worksheets',
    'math-worksheets', 'pattern-worksheets', 'picture-sort-worksheets'
  ],
  'find-and-count-worksheets': [
    'find-objects-worksheets', 'chart-count-worksheets', 'addition-worksheets',
    'more-less-worksheets', 'treasure-hunt-worksheets', 'picture-bingo-worksheets'
  ],
  'find-objects-worksheets': [
    'find-and-count-worksheets', 'treasure-hunt-worksheets', 'shadow-match-worksheets',
    'picture-path-worksheets', 'odd-one-out-worksheets', 'matching-worksheets'
  ],
  'matching-worksheets': [
    'shadow-match-worksheets', 'grid-match-worksheets', 'picture-sort-worksheets',
    'odd-one-out-worksheets', 'big-small-worksheets', 'find-objects-worksheets'
  ],
  'missing-pieces-worksheets': [
    'sudoku-worksheets', 'grid-match-worksheets', 'pattern-worksheets',
    'odd-one-out-worksheets', 'shadow-match-worksheets', 'picture-path-worksheets'
  ],
  'odd-one-out-worksheets': [
    'picture-sort-worksheets', 'matching-worksheets', 'find-objects-worksheets',
    'pattern-worksheets', 'missing-pieces-worksheets', 'big-small-worksheets'
  ],
  'pattern-train-worksheets': [
    'pattern-worksheets', 'alphabet-train-worksheets', 'missing-pieces-worksheets',
    'sudoku-worksheets', 'grid-match-worksheets', 'drawing-lines-worksheets'
  ],
  'picture-bingo-worksheets': [
    'matching-worksheets', 'find-and-count-worksheets', 'picture-sort-worksheets',
    'find-objects-worksheets', 'word-search-worksheets', 'coloring-worksheets'
  ],
  'picture-path-worksheets': [
    'treasure-hunt-worksheets', 'drawing-lines-worksheets', 'missing-pieces-worksheets',
    'grid-match-worksheets', 'find-objects-worksheets', 'pattern-worksheets'
  ],
  'picture-sort-worksheets': [
    'odd-one-out-worksheets', 'matching-worksheets', 'big-small-worksheets',
    'find-and-count-worksheets', 'picture-bingo-worksheets', 'pattern-worksheets'
  ],
  'shadow-match-worksheets': [
    'matching-worksheets', 'find-objects-worksheets', 'odd-one-out-worksheets',
    'big-small-worksheets', 'missing-pieces-worksheets', 'picture-sort-worksheets'
  ],
  'treasure-hunt-worksheets': [
    'find-objects-worksheets', 'picture-path-worksheets', 'find-and-count-worksheets',
    'word-search-worksheets', 'grid-match-worksheets', 'coloring-worksheets'
  ],
};

// Description templates — personalized per source app
function makeDescription(sourceSlug, targetSlug) {
  const source = APP_META[sourceSlug];
  const target = APP_META[targetSlug];
  if (!source || !target) return `Combine with ${target ? target.name : targetSlug} for a comprehensive learning experience.`;

  const sourceName = source.name.replace(' Worksheets', '');
  const targetName = target.name.replace(' Worksheets', '');

  const templates = [
    `Pair ${sourceName} activities with ${targetName.toLowerCase()} worksheets for cross-curricular skill building. Students strengthen ${target.short} while reinforcing concepts from ${sourceName.toLowerCase()} practice sessions. Create themed packets that combine both worksheet types for engaging homework or center rotations.`,
    `Combine ${sourceName.toLowerCase()} worksheets with ${targetName.toLowerCase()} exercises for comprehensive lesson planning. The ${target.short} activities complement ${sourceName.toLowerCase()} skills perfectly. Build complete learning packets mixing both generators for varied classroom practice.`,
    `Extend ${sourceName.toLowerCase()} practice with ${targetName.toLowerCase()} worksheets for well-rounded skill development. Students benefit from ${target.short} alongside ${sourceName.toLowerCase()} activities. Create themed bundles that keep learners engaged across multiple skill areas.`,
    `Add ${targetName.toLowerCase()} worksheets to your ${sourceName.toLowerCase()} rotation for diverse learning opportunities. The ${target.short} activities build skills that complement ${sourceName.toLowerCase()} practice. Generate complete themed packets covering both worksheet types in minutes.`,
    `Bridge ${sourceName.toLowerCase()} concepts with ${targetName.toLowerCase()} activities for deeper understanding. Students practice ${target.short} while building on ${sourceName.toLowerCase()} foundations. Combine both worksheet generators for comprehensive themed learning bundles.`,
    `Supplement ${sourceName.toLowerCase()} worksheets with ${targetName.toLowerCase()} exercises for balanced instruction. The ${target.short} format provides variety that keeps students motivated. Mix both generators to create professional learning packets for any classroom theme.`,
  ];

  // Use a deterministic index based on slugs
  const hash = (sourceSlug + targetSlug).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return templates[hash % templates.length];
}

let totalFilled = 0;

for (const [slug, relatedSlugs] of Object.entries(RELATED_MAP)) {
  const filePath = path.join(DIR, slug + '.ts');
  let src = fs.readFileSync(filePath, 'utf8');

  // Verify it has empty items: []
  const raIdx = src.indexOf('relatedApps:');
  if (raIdx === -1) {
    console.log(`SKIP: ${slug} — no relatedApps section`);
    continue;
  }

  const itemsIdx = src.indexOf('items:', raIdx);
  const afterItems = src.slice(itemsIdx + 6, itemsIdx + 30).trim();
  if (!afterItems.startsWith('[]')) {
    console.log(`SKIP: ${slug} — items already populated`);
    continue;
  }

  // Build items array
  const items = relatedSlugs.map((targetSlug, i) => {
    const meta = APP_META[targetSlug];
    if (!meta) throw new Error(`Unknown slug: ${targetSlug}`);
    return `      {
        id: '${i + 1}',
        slug: '${targetSlug}',
        name: '${meta.name}',
        category: '${meta.cat}',
        icon: '${meta.icon}',
        description: '${makeDescription(slug, targetSlug).replace(/'/g, "\\'")}',
      }`;
  });

  const itemsStr = `items: [\n${items.join(',\n')},\n    ]`;

  // Replace the empty items: [] with populated version
  // Find the exact position of items: [] after relatedApps
  const emptyPattern = /items:\s*\[\s*\]/;
  const raSection = src.slice(raIdx);
  const match = raSection.match(emptyPattern);
  if (!match) {
    console.log(`SKIP: ${slug} — could not find items: [] pattern`);
    continue;
  }

  const replaceStart = raIdx + match.index;
  const replaceEnd = replaceStart + match[0].length;

  // Check if there's a comment after [] on the same line
  const lineEnd = src.indexOf('\n', replaceEnd);
  const trailing = src.slice(replaceEnd, lineEnd).trim();
  let actualEnd = replaceEnd;
  if (trailing.startsWith('//')) {
    // Remove the comment too
    actualEnd = lineEnd;
  }

  src = src.slice(0, replaceStart) + itemsStr + src.slice(actualEnd);

  fs.writeFileSync(filePath, src, 'utf8');
  totalFilled++;
  console.log(`FILLED: ${slug} — ${relatedSlugs.length} related apps`);
}

console.log(`\nTotal files updated: ${totalFilled}`);
