const fs = require('fs');
const path = require('path');

const mapping = {
  'subtraction.ts': 'Start creating subtraction worksheets',
  'code-addition.ts': 'Start creating code-breaking addition puzzles',
  'math-worksheet.ts': 'Start creating mixed math worksheets',
  'math-puzzle.ts': 'Start creating math logic puzzles',
  'chart-count.ts': 'Start creating counting chart worksheets',
  'wordsearch.ts': 'Start creating word search puzzles',
  'crossword.ts': 'Start creating picture crosswords',
  'cryptogram.ts': 'Start creating cryptogram puzzles',
  'word-scramble.ts': 'Start creating word scramble worksheets',
  'word-guess.ts': 'Start creating word guess worksheets',
  'writing.ts': 'Start creating handwriting practice sheets',
  'matching.ts': 'Start creating matching worksheets',
  'drawing-lines.ts': 'Start creating line tracing worksheets',
  'find-objects.ts': 'Start creating hidden object puzzles',
  'grid-match.ts': 'Start creating grid match worksheets',
  'find-and-count.ts': 'Start creating find-and-count pages',
  'missing-pieces.ts': 'Start creating missing pieces puzzles',
  'shadow-match.ts': 'Start creating shadow match worksheets',
  'picture-path.ts': 'Start creating maze path puzzles',
  'picture-sort.ts': 'Start creating picture sort worksheets',
  'prepositions.ts': 'Start creating prepositions worksheets',
  'coloring.ts': 'Start creating coloring pages',
  'draw-and-color.ts': 'Start creating draw-and-color worksheets',
  'alphabet-train.ts': 'Start creating alphabet train worksheets',
  'bingo.ts': 'Start creating bingo cards',
  'pattern-train.ts': 'Start creating pattern train worksheets',
  'pattern-worksheet.ts': 'Start creating pattern worksheets',
  'treasure-hunt.ts': 'Start creating treasure hunt worksheets',
  'sudoku.ts': 'Start creating sudoku puzzles',
  'big-small.ts': 'Start creating big-vs-small worksheets',
  'more-less.ts': 'Start creating more-or-less worksheets',
  'odd-one-out.ts': 'Start creating odd-one-out worksheets',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');
let done = 0;
let skipped = 0;
const errors = [];

for (const [file, heading] of Object.entries(mapping)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) {
    errors.push(`MISSING: ${file}`);
    continue;
  }
  let content = fs.readFileSync(fp, 'utf8');

  if (content.includes('ctaHeading:')) {
    skipped++;
    continue;
  }

  const pattern = /(\r?\n)(  howItWorks: \{)/;
  if (!pattern.test(content)) {
    errors.push(`NO MATCH: ${file}`);
    continue;
  }

  content = content.replace(pattern, `$1  ctaHeading: '${heading}',$1$1$2`);
  fs.writeFileSync(fp, content);
  done++;
  console.log(`OK ${file}`);
}

console.log(`\nWrote: ${done} | Skipped (already had): ${skipped} | Errors: ${errors.length}`);
if (errors.length) {
  console.log('Errors:');
  errors.forEach((e) => console.log('  ' + e));
  process.exit(1);
}
