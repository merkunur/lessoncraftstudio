/**
 * Part 4: Enrich en-product-pages.md with LSI keywords, question keywords,
 * search volume, competition, and SERP features for all 33 apps.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'docs', 'seo-keywords', 'en-product-pages.md');

// Enrichment data for all 33 apps, keyed by slug
const enrichments = {
  // ===== MATH APPS (7) =====
  'addition-worksheets': {
    lsi: [
      'sum', 'carry over', 'place value', 'number sentence', 'math fluency',
      'addend', 'regrouping', 'number bond', 'mental math', 'fact family'
    ],
    questions: [
      'How do I make addition worksheets for my students?',
      'What addition skills should kindergartners practice?',
      'How to teach addition with pictures?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },
  'math-worksheets': {
    lsi: [
      'visual math', 'manipulatives', 'concrete-representational-abstract', 'number sense',
      'early numeracy', 'math center', 'hands-on math', 'picture problems',
      'math readiness', 'counting objects'
    ],
    questions: [
      'How do picture math worksheets help kids learn?',
      'What math should kindergartners know?',
      'How to make math worksheets with images?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Medium',
    serp: 'Images, PAA'
  },
  'chart-count-color-worksheets': {
    lsi: [
      'tally chart', 'bar graph', 'data collection', 'frequency table', 'pictograph',
      'data analysis', 'survey', 'data representation', 'counting chart', 'graph reading'
    ],
    questions: [
      'How do I teach graphing to kindergartners?',
      'What is a picture graph worksheet?',
      'How to make tally mark worksheets?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'code-addition-worksheets': {
    lsi: [
      'visual equation', 'image-based math', 'decode and solve', 'picture sum',
      'math code', 'symbol math', 'picture calculation', 'visual addition',
      'image equation', 'math decode'
    ],
    questions: [
      'What are picture addition worksheets?',
      'How do decode math activities work?',
      'How to make visual math problems for kids?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images'
  },
  'math-puzzle-worksheets': {
    lsi: [
      'visual equation', 'picture calculation', 'math challenge', 'problem solving',
      'critical thinking', 'math game', 'number puzzle', 'brain teaser',
      'math riddle', 'logic math'
    ],
    questions: [
      'What are good math puzzles for kindergartners?',
      'How do picture equation puzzles work?',
      'How to make math challenging but fun?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Medium',
    serp: 'Images, PAA, Video'
  },
  'more-less-worksheets': {
    lsi: [
      'comparison symbol', 'inequality', 'number line', 'alligator math',
      'crocodile comparison', 'ordering numbers', 'magnitude', 'relative size',
      'number comparison', 'equal sign'
    ],
    questions: [
      'How do I teach greater than and less than?',
      'What age do kids learn comparison symbols?',
      'How to make greater than less than fun?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA, Featured Snippet'
  },
  'subtraction-worksheets': {
    lsi: [
      'take away', 'difference', 'regrouping', 'borrowing', 'number bond',
      'fact family', 'subtraction strategy', 'counting back', 'decomposing', 'minuend'
    ],
    questions: [
      'How do I make subtraction worksheets with pictures?',
      'What subtraction skills should first graders have?',
      'How to teach subtraction to kindergartners?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Featured Snippet'
  },

  // ===== LITERACY APPS (5) =====
  'alphabet-train-worksheets': {
    lsi: [
      'letter order', 'ABC sequence', 'letter recognition', 'alphabetical order',
      'uppercase lowercase', 'letter identification', 'phonics readiness',
      'letter name', 'alphabet fluency', 'letter knowledge'
    ],
    questions: [
      'How do I teach alphabet order to preschoolers?',
      'What age should kids know the alphabet?',
      'How to make alphabet worksheets fun?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'word-scramble-worksheets': {
    lsi: [
      'anagram', 'jumbled letters', 'spelling practice', 'vocabulary builder',
      'word puzzle', 'letter arrangement', 'phonemic awareness', 'word recognition',
      'sight word', 'decoding'
    ],
    questions: [
      'How do word scramble puzzles help kids learn?',
      'What words are good for kids\u2019 word scrambles?',
      'How to create word scramble worksheets?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Medium',
    serp: 'Images, PAA'
  },
  'prepositions-worksheets': {
    lsi: [
      'spatial awareness', 'positional language', 'direction words', 'location words',
      'spatial vocabulary', 'above below', 'beside between', 'prepositional phrase',
      'spatial relationship', 'positional concept'
    ],
    questions: [
      'How do I teach prepositions to kindergartners?',
      'What prepositions should kids learn first?',
      'How to make spatial concept worksheets?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'writing-worksheets': {
    lsi: [
      'handwriting practice', 'letter formation', 'stroke order', 'pencil grip',
      'fine motor', 'print handwriting', 'letter shape', 'tracing template',
      'guided writing', 'pre-writing skill'
    ],
    questions: [
      'How do I teach letter formation to kids?',
      'What age should kids start tracing letters?',
      'How to make handwriting practice worksheets?'
    ],
    volume: 'High (1K+)',
    competition: 'Medium',
    serp: 'Images, PAA, Video'
  },
  'word-search-worksheets': {
    lsi: [
      'word find', 'hidden word', 'letter grid', 'vocabulary review',
      'sight word practice', 'word recognition', 'spelling reinforcement',
      'word hunt', 'letter pattern', 'visual scanning'
    ],
    questions: [
      'How do I create custom word search puzzles?',
      'Are word searches educational for kids?',
      'What size word search is best for kindergartners?'
    ],
    volume: 'High (1K+)',
    competition: 'High',
    serp: 'Images, PAA, Featured Snippet'
  },

  // ===== WORD GAME APPS (3) =====
  'crossword-worksheets': {
    lsi: [
      'vocabulary building', 'spelling practice', 'word grid', 'clue-based puzzle',
      'letter fill', 'word intersection', 'picture clue', 'educational puzzle',
      'across and down', 'word bank'
    ],
    questions: [
      'How do picture crosswords help kids learn to spell?',
      'What is a good crossword size for kindergartners?',
      'How to make easy crossword puzzles for kids?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Medium',
    serp: 'Images, PAA'
  },
  'word-guess-worksheets': {
    lsi: [
      'missing letter', 'fill in blank', 'spelling challenge', 'letter deduction',
      'vocabulary game', 'word completion', 'phonics practice', 'picture clue',
      'letter blank', 'spelling puzzle'
    ],
    questions: [
      'How do word guess puzzles improve spelling?',
      'What is a word guess worksheet?',
      'How to make fill-in-the-blank word activities?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'cryptogram-worksheets': {
    lsi: [
      'code breaking', 'cipher', 'symbol substitution', 'decode message',
      'secret code', 'encryption puzzle', 'symbol key', 'coded alphabet',
      'message decoding', 'code puzzle'
    ],
    questions: [
      'What is a picture cryptogram worksheet?',
      'How do cryptogram puzzles help kids learn?',
      'How to make code-breaking activities for kids?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images'
  },

  // ===== ART & CREATIVITY APPS (3) =====
  'coloring-worksheets': {
    lsi: [
      'color recognition', 'creative expression', 'fine motor development',
      'themed coloring', 'coloring sheet', 'outline art', 'color by theme',
      'printable art', 'coloring activity', 'art therapy'
    ],
    questions: [
      'How do coloring pages help child development?',
      'What themes are popular for kids\u2019 coloring pages?',
      'How to make custom coloring pages?'
    ],
    volume: 'High (1K+)',
    competition: 'High',
    serp: 'Images, PAA, Video'
  },
  'draw-and-color-worksheets': {
    lsi: [
      'grid copy', 'symmetry drawing', 'spatial awareness', 'visual reproduction',
      'coordinate art', 'square-by-square', 'directed drawing', 'art instruction',
      'proportional drawing', 'visual-motor integration'
    ],
    questions: [
      'How do grid drawing activities help kids?',
      'What is a grid copy worksheet?',
      'How to teach kids to draw using a grid?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images'
  },
  'find-and-count-worksheets': {
    lsi: [
      'I Spy', 'visual counting', 'search and count', 'observation skill',
      'number recognition', 'counting objects', 'visual attention',
      'hidden picture counting', 'enumeration', 'tally'
    ],
    questions: [
      'How do I Spy worksheets help with math?',
      'What are find and count activities?',
      'How to make counting worksheets more engaging?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // ===== VISUAL/SEARCH APPS (2) =====
  'find-objects-worksheets': {
    lsi: [
      'I Spy', 'visual discrimination', 'figure-ground perception', 'attention to detail',
      'visual scanning', 'hidden picture', 'seek and find', 'observation',
      'visual search', 'perceptual skill'
    ],
    questions: [
      'How do hidden object activities help children?',
      'What are visual discrimination worksheets?',
      'How to make I Spy worksheets?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'missing-pieces-worksheets': {
    lsi: [
      'spatial reasoning', 'visual closure', 'part-whole relationship', 'jigsaw thinking',
      'puzzle completion', 'visual perception', 'gestalt', 'picture completion',
      'shape recognition', 'visual integration'
    ],
    questions: [
      'How do missing piece puzzles develop spatial reasoning?',
      'What is a visual closure activity?',
      'How to make missing pieces worksheets?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images'
  },

  // ===== MATCHING & SORTING APPS (5) =====
  'matching-worksheets': {
    lsi: [
      'visual association', 'picture pair', 'memory skill', 'one-to-one correspondence',
      'visual matching', 'pair matching', 'connect pairs', 'image association',
      'visual connection', 'same and different'
    ],
    questions: [
      'How do matching worksheets help kids learn?',
      'What are good matching activities for kindergarten?',
      'How to make picture matching worksheets?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Medium',
    serp: 'Images, PAA'
  },
  'grid-match-worksheets': {
    lsi: [
      'pattern completion', 'spatial logic', 'grid puzzle', 'visual reasoning',
      'matrix reasoning', 'logical thinking', 'grid-based puzzle', 'visual pattern',
      'spatial analysis', 'position matching'
    ],
    questions: [
      'What is a grid match puzzle?',
      'How do grid puzzles develop logical thinking?',
      'How to make visual pattern matching worksheets?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images'
  },
  'shadow-match-worksheets': {
    lsi: [
      'silhouette recognition', 'shape matching', 'outline identification',
      'visual perception', 'figure matching', 'shape discrimination',
      'contour matching', 'form constancy', 'visual form', 'shape outline'
    ],
    questions: [
      'How do shadow matching activities help kids?',
      'What is a silhouette matching worksheet?',
      'How to make shadow match worksheets?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'picture-sort-worksheets': {
    lsi: [
      'categorization', 'classification skill', 'grouping', 'attribute sorting',
      'sorting by property', 'category', 'taxonomy', 'organize by type',
      'critical thinking', 'logical grouping'
    ],
    questions: [
      'How do sorting worksheets build critical thinking?',
      'What sorting skills should kindergartners learn?',
      'How to make picture sorting activities?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'big-small-worksheets': {
    lsi: [
      'size comparison', 'measurement readiness', 'relative size', 'ordering by size',
      'size discrimination', 'largest smallest', 'size sorting', 'visual comparison',
      'scale', 'proportional thinking'
    ],
    questions: [
      'How do I teach size concepts to preschoolers?',
      'What age do kids learn big and small?',
      'How to make size comparison worksheets?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },

  // ===== LOGIC & PUZZLES APPS (8) =====
  'sudoku-worksheets': {
    lsi: [
      'logic grid', 'deductive reasoning', 'number placement', 'elimination strategy',
      'critical thinking', 'puzzle grid', '4x4 grid', 'picture logic',
      'brain training', 'analytical thinking'
    ],
    questions: [
      'How do I teach sudoku to a child?',
      'What age can kids start sudoku?',
      'How to make easy sudoku puzzles for kids?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Medium',
    serp: 'Images, PAA, Video'
  },
  'odd-one-out-worksheets': {
    lsi: [
      'visual discrimination', 'categorization', 'exclusion logic', 'which doesn\u2019t belong',
      'critical thinking', 'classification', 'attribute analysis', 'logical reasoning',
      'set theory', 'group exception'
    ],
    questions: [
      'How do odd one out activities build critical thinking?',
      'What age are odd one out worksheets appropriate?',
      'How to make which-one-is-different worksheets?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'picture-path-worksheets': {
    lsi: [
      'pathfinding', 'maze solving', 'route planning', 'fine motor control',
      'hand-eye coordination', 'pencil path', 'visual tracking', 'spatial navigation',
      'maze strategy', 'problem solving'
    ],
    questions: [
      'How do mazes help kids develop fine motor skills?',
      'What age are maze worksheets appropriate?',
      'How to make picture mazes for kids?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'treasure-hunt-worksheets': {
    lsi: [
      'directional vocabulary', 'map reading', 'spatial orientation', 'following directions',
      'left right', 'compass direction', 'wayfinding', 'directional clue',
      'navigation skill', 'spatial language'
    ],
    questions: [
      'How do treasure hunt worksheets teach directions?',
      'What are directional vocabulary activities?',
      'How to make map worksheets for kindergarten?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'drawing-lines-worksheets': {
    lsi: [
      'pre-writing skill', 'fine motor development', 'pencil control', 'hand strength',
      'tracing path', 'motor planning', 'hand-eye coordination', 'writing readiness',
      'stroke practice', 'guided tracing'
    ],
    questions: [
      'How does line tracing help with handwriting?',
      'What age should kids start tracing lines?',
      'How to make line tracing worksheets for preschoolers?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'pattern-train-worksheets': {
    lsi: [
      'visual sequence', 'repeating pattern', 'AB pattern', 'pattern recognition',
      'cut and paste', 'hands-on learning', 'sequencing skill', 'pattern extension',
      'train car', 'pattern rule'
    ],
    questions: [
      'How do pattern train worksheets help kids?',
      'What are AB pattern activities for kindergarten?',
      'How to make cut-and-paste pattern worksheets?'
    ],
    volume: 'Low (<100)',
    competition: 'Low',
    serp: 'Images'
  },
  'pattern-worksheets': {
    lsi: [
      'repeating pattern', 'growing pattern', 'pattern rule', 'sequence',
      'ABAB pattern', 'mathematical thinking', 'pattern extension', 'visual sequence',
      'algebraic thinking', 'pattern analysis'
    ],
    questions: [
      'How do I teach pattern recognition to kids?',
      'What types of patterns should kindergartners learn?',
      'How to make pattern worksheets for different levels?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Low',
    serp: 'Images, PAA'
  },
  'picture-bingo-worksheets': {
    lsi: [
      'bingo game', 'vocabulary review', 'classroom game', 'group activity',
      'game board', 'caller card', 'bingo dauber', 'educational game',
      'interactive learning', 'themed game'
    ],
    questions: [
      'How do I make custom bingo cards for the classroom?',
      'Are bingo games educational?',
      'How to use picture bingo for vocabulary learning?'
    ],
    volume: 'Medium (100\u20131K)',
    competition: 'Medium',
    serp: 'Images, PAA'
  }
};

// Read the existing file
let content = fs.readFileSync(filePath, 'utf8');

// Update the header to reference the new plan
content = content.replace(
  '> Part 3 of the ONE CLICK A DAY SEO plan.\n> This document maps unique primary keywords, optimized titles, descriptions, H1s, and subtitles\n> for all 33 English product pages. Parts 11-21 will use this map to edit the actual content files.',
  '> Part 3 of the ONE CLICK A DAY SEO plan (keyword map).\n> Part 4 of the LANDING PAGE SEO PERFECTION plan (LSI keywords, question keywords, SERP analysis).\n>\n> This document maps unique primary keywords, optimized titles, descriptions, H1s, subtitles,\n> LSI keywords, question keywords, and SERP analysis for all 33 English product pages.'
);

// Update the footer
content = content.replace(
  '*Document created: Part 3 of ONE CLICK A DAY SEO*\n*Next: Parts 4-10 map keywords for theme hubs, theme+grade pages, blog posts, and secondary pages.*\n*Parts 11-21 will use this map to edit the actual product page content files.*',
  '*Document created: Part 3 of ONE CLICK A DAY SEO*\n*Enriched: Part 4 of LANDING PAGE SEO PERFECTION (LSI keywords, question keywords, SERP analysis)*\n*Next: Parts 5-15 complete foundation, audit, infrastructure, and component architecture.*\n*Parts 16-170 implement the optimized content across all English pages.*'
);

// Update category section headers to match the plan's 7-category grouping
content = content.replace(
  '## Literacy Apps (8 products)',
  '## Literacy Apps (5 products)'
);
content = content.replace(
  '## Visual Apps (10 products)',
  '## Word Game Apps (3 products)'
);

// For each slug, find the "**Differentiation Notes:**" paragraph and inject enrichment after it
let enrichedCount = 0;

for (const [slug, data] of Object.entries(enrichments)) {
  // Build the enrichment block
  const lsiList = data.lsi.map((term, i) => `${i + 1}. ${term}`).join('\n');
  const questionList = data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');

  const block = `

**LSI Keywords (10):**
${lsiList}

**Question Keywords (3):**
${questionList}

| Metric | Value |
|--------|-------|
| **Search Volume** | ${data.volume} |
| **Competition** | ${data.competition} |
| **SERP Features** | ${data.serp} |`;

  // Find the differentiation notes for this slug and insert enrichment after them
  // Pattern: find the section header with the slug, then its Differentiation Notes, then insert before the next ---
  const slugEscaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    `(### \\d+\\. [^\\n]+ \\(\`${slugEscaped}\`\\)[\\s\\S]*?\\*\\*Differentiation Notes:\\*\\* [^\\n]+)(\n\n---)`,
    'm'
  );

  const match = content.match(regex);
  if (match) {
    content = content.replace(regex, `$1${block}$2`);
    enrichedCount++;
  } else {
    console.error(`WARNING: Could not find entry for slug: ${slug}`);
  }
}

// Now reorganize the category sections to match the plan's 7-category grouping
// We need to add new section headers for the groups that were merged in the old structure

// Add "Art & Creativity Apps" header before entry 16 (coloring)
content = content.replace(
  '### 16. Coloring Worksheets',
  '## Art & Creativity Apps (3 products)\n\n---\n\n### 16. Coloring Worksheets'
);

// Add "Visual/Search Apps" header before entry 19 (find-objects)
content = content.replace(
  '### 19. Find Objects Worksheets',
  '## Visual/Search Apps (2 products)\n\n---\n\n### 19. Find Objects Worksheets'
);

// Add "Matching & Sorting Apps" header before entry 21 (matching)
content = content.replace(
  '### 21. Matching Worksheets',
  '## Matching & Sorting Apps (5 products)\n\n---\n\n### 21. Matching Worksheets'
);

// Rename "Puzzles Apps" to "Logic & Puzzles Apps"
content = content.replace(
  '## Puzzles Apps (8 products)',
  '## Logic & Puzzles Apps (8 products)'
);

// Remove the old "Word Game Apps (3 products)" that replaced "Visual Apps (10 products)"
// since we've now split it properly. Actually let's check what the text looks like.
// The old "Visual Apps (10 products)" was renamed to "Word Game Apps (3 products)" above.
// But entry 13 (crossword) is the first word game app, and it was under "Literacy Apps".
// The old structure had: Literacy Apps (8 products) covering entries 8-15, Visual Apps (10 products) covering 16-25.
// The new grouping should be:
//   Literacy Apps (5): 8-12
//   Word Game Apps (3): 13-15
//   Art & Creativity Apps (3): 16-18
//   Visual/Search Apps (2): 19-20
//   Matching & Sorting Apps (5): 21-25
//   Logic & Puzzles Apps (8): 26-33

// Add Word Game Apps header before entry 13 (crossword)
// First, remove the incorrect "Word Game Apps (3 products)" that was placed where "Visual Apps" was (before entry 16)
content = content.replace(
  '## Word Game Apps (3 products)\n\n---\n\n### 16. Coloring Worksheets',
  '### 16. Coloring Worksheets'
);

// Now add Word Game Apps before entry 13
content = content.replace(
  '### 13. Crossword Worksheets',
  '## Word Game Apps (3 products)\n\n---\n\n### 13. Crossword Worksheets'
);

// Add Art & Creativity before entry 16
content = content.replace(
  '### 16. Coloring Worksheets',
  '## Art & Creativity Apps (3 products)\n\n---\n\n### 16. Coloring Worksheets'
);

// Move find-and-count (entry 18) - it's currently after draw-and-color (17), which is correct
// since it's in Art & Creativity. Actually, looking at the plan grouping:
// Art & Creativity: coloring (16), draw-and-color (17), find-and-count (18)
// Visual/Search: find-objects (19), missing-pieces (20)
// This matches the existing order, so we're good.

// Write the result
fs.writeFileSync(filePath, content, 'utf8');

console.log(`Enriched ${enrichedCount} of 33 app entries.`);
console.log('File written to:', filePath);

// Verify all 33 have enrichment
const lsiMatches = (content.match(/\*\*LSI Keywords \(10\):\*\*/g) || []).length;
const questionMatches = (content.match(/\*\*Question Keywords \(3\):\*\*/g) || []).length;
const serpMatches = (content.match(/\*\*SERP Features\*\*/g) || []).length;

console.log(`Verification: ${lsiMatches} LSI sections, ${questionMatches} Question sections, ${serpMatches} SERP tables`);

if (lsiMatches === 33 && questionMatches === 33 && serpMatches === 33) {
  console.log('ALL 33 APPS ENRICHED SUCCESSFULLY');
} else {
  console.error('ERROR: Not all 33 apps were enriched!');
  process.exit(1);
}
