/**
 * Fix incorrect YouTube video IDs in guide and idea content files.
 * Maps each guide to the correct app video based on primary topic.
 */
const fs = require('fs');

const videoMap = {
  'wordsearch': { id: '36keBFzJbPo', title: 'How to Create Word Search Puzzles' },
  'addition': { id: '6O5aCzHkh8M', title: 'How to Create Addition Worksheets' },
  'alphabet-train': { id: '_dDQegRq9JQ', title: 'How to Create Alphabet Train Worksheets' },
  'big-small': { id: 'S2s2U6Nb7FI', title: 'How to Create Big & Small Worksheets' },
  'bingo': { id: 'd6AOiDXoK1c', title: 'How to Create Bingo Cards' },
  'chart-count': { id: 'CDgIihDQX6U', title: 'How to Create Chart Count Worksheets' },
  'code-addition': { id: 'vVd11Kjk9iA', title: 'How to Create Code Addition Worksheets' },
  'coloring': { id: 'ZdpCr2txHcc', title: 'How to Create Coloring Pages' },
  'crossword': { id: 'b3WKDrzif-w', title: 'How to Create Crossword Puzzles' },
  'cryptogram': { id: '9U0BIIjCnco', title: 'How to Create Cryptogram Puzzles' },
  'draw-and-color': { id: '1uZubAOGIkM', title: 'How to Create Draw and Color Worksheets' },
  'drawing-lines': { id: 'P9q3ymjFnOQ', title: 'How to Create Tracing Worksheets' },
  'find-and-count': { id: '0cOPi7eajLs', title: 'How to Create Find and Count Worksheets' },
  'find-objects': { id: '8Y3jrVr1Phs', title: 'How to Create Find Objects Worksheets' },
  'grid-match': { id: 'RGtED1Bnut8', title: 'How to Create Grid Match Puzzles' },
  'matching': { id: 'y3ghkjt_67s', title: 'How to Create Matching Worksheets' },
  'math-puzzle': { id: 'n5QO39Lq5l8', title: 'How to Create Math Puzzle Worksheets' },
  'math-worksheet': { id: '-JIawojGNr0', title: 'How to Create Math Worksheets' },
  'missing-pieces': { id: 'gb-xE_Ay4fc', title: 'How to Create Missing Pieces Puzzles' },
  'more-less': { id: 'eNguG63nYVs', title: 'How to Create More or Less Worksheets' },
  'odd-one-out': { id: '0R6WFUfY7Mk', title: 'How to Create Odd One Out Puzzles' },
  'pattern-train': { id: '5A4aHvcC5u4', title: 'How to Create Pattern Train Worksheets' },
  'pattern-worksheet': { id: 'W94X5_RA3ug', title: 'How to Create Pattern Worksheets' },
  'picture-path': { id: 'Sl1o0uPBDCg', title: 'How to Create Picture Path Mazes' },
  'picture-sort': { id: '9kzmlABtNVQ', title: 'How to Create Picture Sort Worksheets' },
  'prepositions': { id: 'ifIXbViR5_o', title: 'How to Create Preposition Worksheets' },
  'shadow-match': { id: 'TYvUXJeMI98', title: 'How to Create Shadow Match Worksheets' },
  'subtraction': { id: 'til2mrWMUxk', title: 'How to Create Subtraction Worksheets' },
  'sudoku': { id: 'bqVioFbkYbA', title: 'How to Create Sudoku Puzzles' },
  'treasure-hunt': { id: 'flHiBXsYLLA', title: 'How to Create Treasure Hunt Worksheets' },
  'word-guess': { id: 'DSwX_p4dRNM', title: 'How to Create Word Guess Worksheets' },
  'word-scramble': { id: 'Hc3g5VsSHEU', title: 'How to Create Word Scramble Puzzles' },
  'writing': { id: '0b4WglqyXu0', title: 'How to Create Writing Worksheets' },
};

// Map guide filename -> which app video it should use
const guideToApp = {
  // Category C
  'word-search-generator-kdp': 'wordsearch',
  'sudoku-generator-kdp': 'sudoku',
  'crossword-generator-kdp': 'crossword',
  'coloring-page-generator-etsy': 'coloring',
  'math-worksheet-generator-tpt': 'math-worksheet',
  'word-search-generator-etsy': 'wordsearch',
  'bingo-card-generator-etsy': 'bingo',
  'cryptogram-generator-kdp': 'cryptogram',
  'word-scramble-generator-kdp': 'word-scramble',
  'activity-book-generator-kdp': 'coloring',
  'matching-worksheet-generator-etsy': 'matching',
  'tracing-worksheet-generator-etsy': 'drawing-lines',
  'pattern-worksheet-generator-etsy': 'pattern-worksheet',
  'coloring-book-generator-kdp': 'coloring',
  'writing-worksheet-generator-etsy': 'writing',
  'find-count-generator-etsy': 'find-and-count',
  'shadow-match-generator-etsy': 'shadow-match',
  'maze-generator-etsy': 'picture-path',
  'alphabet-worksheet-generator-etsy': 'alphabet-train',
  'printable-generator-comparison': 'wordsearch',
  // Category A
  'sell-coloring-pages-etsy': 'coloring',
  'sell-sudoku-books-kdp': 'sudoku',
  'sell-crossword-puzzles-etsy': 'crossword',
  'sell-math-worksheets-kdp': 'math-worksheet',
  'sell-activity-books-kdp': 'coloring',
  'sell-printables-tpt': 'wordsearch',
  'sell-word-scramble-etsy': 'word-scramble',
  'sell-cryptogram-puzzles-etsy': 'cryptogram',
  'sell-bingo-cards-etsy': 'bingo',
  'sell-tracing-worksheets-etsy': 'drawing-lines',
  'sell-pattern-worksheets-etsy': 'pattern-worksheet',
  'sell-matching-worksheets-etsy': 'matching',
  'sell-puzzle-books-kdp': 'wordsearch',
  'sell-preschool-printables-etsy': 'drawing-lines',
  'sell-kindergarten-worksheets-etsy': 'addition',
  'sell-printable-bundles-etsy': 'wordsearch',
  'sell-educational-printables-gumroad': 'wordsearch',
  'sell-i-spy-worksheets-etsy': 'find-objects',
  'sell-writing-worksheets-etsy': 'writing',
  'sell-alphabet-worksheets-etsy': 'alphabet-train',
  'sell-printables-shopify': 'wordsearch',
  'sell-digital-downloads-etsy-beginners': 'coloring',
  'sell-shadow-match-worksheets-etsy': 'shadow-match',
  'sell-treasure-hunt-worksheets-etsy': 'treasure-hunt',
  'sell-odd-one-out-worksheets-etsy': 'odd-one-out',
  'sell-big-small-worksheets-etsy': 'big-small',
  'sell-preposition-worksheets-etsy': 'prepositions',
  'sell-printables-creative-market': 'coloring',
  'how-to-price-printables-etsy': 'wordsearch',
  'etsy-seo-printable-sellers': 'wordsearch',
  // Category D
  'create-word-search-book-kdp': 'wordsearch',
  'create-sudoku-book-kdp': 'sudoku',
  'create-crossword-book-kdp': 'crossword',
  'create-math-workbook-kdp': 'math-worksheet',
  'create-coloring-book-kdp': 'coloring',
  'create-activity-book-kdp': 'coloring',
  'create-puzzle-book-kdp': 'wordsearch',
  'create-preschool-workbook-kdp': 'drawing-lines',
  'create-kindergarten-workbook-kdp': 'addition',
  'create-handwriting-book-kdp': 'writing',
  'create-tracing-book-kdp': 'drawing-lines',
  'create-brain-games-book-kdp': 'odd-one-out',
  'create-word-puzzle-book-kdp': 'wordsearch',
  'create-large-print-puzzle-book-kdp': 'wordsearch',
  'create-kids-activity-book-kdp': 'coloring',
  'kdp-puzzle-book-formatting': 'wordsearch',
  'kdp-interior-template-worksheets': 'wordsearch',
  'kdp-low-content-book-ideas': 'coloring',
  'kdp-medium-content-book-ideas': 'wordsearch',
  'how-to-publish-worksheet-book-kdp': 'addition',
  // Category E
  'german-printables-etsy': 'wordsearch',
  'french-printables-etsy': 'wordsearch',
  'spanish-printables-etsy': 'wordsearch',
  'portuguese-printables-etsy': 'wordsearch',
  'italian-printables-etsy': 'wordsearch',
  'dutch-printables-etsy': 'wordsearch',
  'swedish-printables-etsy': 'wordsearch',
  'danish-printables-etsy': 'wordsearch',
  'norwegian-printables-etsy': 'wordsearch',
  'finnish-printables-etsy': 'wordsearch',
  'non-english-etsy-strategy': 'wordsearch',
  'sell-bilingual-worksheets-etsy': 'wordsearch',
  'international-printable-markets': 'wordsearch',
  'localize-printables-more-sales': 'wordsearch',
};

// Also fix idea-content files (Category B)
const ideaToApp = {
  'best-printable-niches-etsy-2026': 'wordsearch',
  'best-kdp-puzzle-book-niches': 'wordsearch',
  'profitable-worksheet-niches-etsy': 'wordsearch',
  'low-competition-printables-etsy': 'cryptogram',
  'best-coloring-book-niches-kdp': 'coloring',
  'trending-printables-etsy-2026': 'wordsearch',
  'best-educational-printable-niches': 'addition',
  'seasonal-printable-ideas-etsy': 'coloring',
  'best-math-worksheet-niches-etsy': 'addition',
  'best-puzzle-niches-etsy': 'wordsearch',
  'underserved-printable-markets': 'shadow-match',
  'best-tpt-niches-worksheets': 'wordsearch',
  'printable-business-ideas-2026': 'wordsearch',
  'best-activity-book-niches-kdp': 'coloring',
  'non-english-printable-niches': 'wordsearch',
};

let fixed = 0;

function fixFile(filePath, appId) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const video = videoMap[appId];
  if (!video) { console.log('No video for appId:', appId); return; }

  content = content.replace(/youtubeId: '[^']*'/, "youtubeId: '" + video.id + "'");
  content = content.replace(/videoTitle: '[^']*'/, "videoTitle: '" + video.title + "'");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixed++;
    console.log('Fixed: ' + filePath.split('/').pop() + ' -> ' + appId + ' (' + video.id + ')');
  }
}

// Fix guide content files
for (const [slug, appId] of Object.entries(guideToApp)) {
  fixFile('frontend/config/guide-content/en/' + slug + '.ts', appId);
}

// Fix idea content files
for (const [slug, appId] of Object.entries(ideaToApp)) {
  fixFile('frontend/config/idea-content/en/' + slug + '.ts', appId);
}

console.log('---');
console.log('Fixed ' + fixed + ' files with correct video IDs');
