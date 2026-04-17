const fs = require('fs');
const path = require('path');

const SUFFIX = ' — Create Printables to Sell on Etsy & KDP';

const newH1s = {
  'addition.ts': 'Addition Worksheet Generator',
  'alphabet-train.ts': 'Alphabet Train Worksheet Generator',
  'big-small.ts': 'Big & Small Worksheet Generator',
  'bingo.ts': 'Bingo Card Maker',
  'chart-count.ts': 'Chart Count Worksheet Generator',
  'code-addition.ts': 'Code Addition Worksheet Generator',
  'coloring.ts': 'Coloring Page Generator',
  'crossword.ts': 'Picture Crossword Generator',
  'cryptogram.ts': 'Cryptogram Puzzle Generator',
  'draw-and-color.ts': 'Draw & Color Worksheet Generator',
  'drawing-lines.ts': 'Tracing Worksheet Generator',
  'find-and-count.ts': 'Find & Count Worksheet Generator',
  'find-objects.ts': 'Hidden Object Worksheet Generator',
  'grid-match.ts': 'Grid Match Worksheet Generator',
  'matching.ts': 'Matching Worksheet Generator',
  'math-puzzle.ts': 'Math Puzzle Generator',
  'math-worksheet.ts': 'Math Worksheet Generator',
  'missing-pieces.ts': 'Missing Pieces Puzzle Generator',
  'more-less.ts': 'More or Less Worksheet Generator',
  'odd-one-out.ts': 'Odd One Out Worksheet Generator',
  'pattern-train.ts': 'Pattern Train Worksheet Generator',
  'pattern-worksheet.ts': 'Pattern Worksheet Generator',
  'picture-path.ts': 'Picture Path Maze Generator',
  'picture-sort.ts': 'Picture Sort Worksheet Generator',
  'prepositions.ts': 'Prepositions Worksheet Generator',
  'shadow-match.ts': 'Shadow Match Worksheet Generator',
  'subtraction.ts': 'Subtraction Worksheet Generator',
  'sudoku.ts': 'Picture Sudoku Generator',
  'treasure-hunt.ts': 'Treasure Hunt Worksheet Generator',
  'word-guess.ts': 'Word Guess Worksheet Generator',
  'word-scramble.ts': 'Word Scramble Generator',
  'wordsearch.ts': 'Word Search Generator',
  'writing.ts': 'Handwriting Worksheet Generator',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');
const changes = [];

for (const [file, generatorName] of Object.entries(newH1s)) {
  const fp = path.join(dir, file);
  const src = fs.readFileSync(fp, 'utf8');

  // Match `hero: {\n    title: '...'`. Capture old title, replace with new.
  const heroRe = /(hero:\s*\{\s*\n\s*title:\s*)'([^']*)'/;
  const match = src.match(heroRe);
  if (!match) {
    console.error('NO HERO MATCH: ' + file);
    process.exit(1);
  }
  const oldH1 = match[2];
  const newH1 = generatorName + SUFFIX;

  if (oldH1 === newH1) {
    console.log('SKIP (unchanged): ' + file);
    continue;
  }

  const updated = src.replace(heroRe, `$1'${newH1}'`);
  fs.writeFileSync(fp, updated);
  changes.push({ file, oldH1, newH1 });
  console.log('OK  ' + file);
}

console.log('\nRewrote ' + changes.length + ' H1s.\n');
console.log('--- Translation queue ---\n');
for (const c of changes) {
  console.log(`### ${c.file}`);
  console.log(`  BEFORE: ${c.oldH1}`);
  console.log(`  AFTER : ${c.newH1}`);
  console.log('');
}
