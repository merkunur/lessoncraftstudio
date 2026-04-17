const fs = require('fs');
const path = require('path');

const mapping = {
  'addition.ts': 'Lav plusstykker',
  'alphabet-train.ts': 'Lav alfabetopgaver',
  'big-small.ts': 'Lav opgaver stor og lille',
  'bingo.ts': 'Lav bingokort',
  'chart-count.ts': 'Lav tælleopgaver',
  'code-addition.ts': 'Lav hemmelige kodemeddelelser',
  'coloring.ts': 'Lav malesider',
  'crossword.ts': 'Lav krydsord',
  'cryptogram.ts': 'Lav kryptogrammer',
  'draw-and-color.ts': 'Lav tegne- og maleopgaver',
  'drawing-lines.ts': 'Lav skrivemotorikopgaver',
  'find-and-count.ts': 'Lav find-og-tæl-opgaver',
  'find-objects.ts': 'Lav find-og-markér-opgaver',
  'grid-match.ts': 'Lav gitteropgaver',
  'matching.ts': 'Lav parkoblingsopgaver',
  'math-puzzle.ts': 'Lav mattegåder',
  'math-worksheet.ts': 'Lav matteopgaver',
  'missing-pieces.ts': 'Lav puslespil med manglende brikker',
  'more-less.ts': 'Lav opgaver større eller mindre',
  'odd-one-out.ts': 'Lav find-den-forkerte-opgaver',
  'pattern-train.ts': 'Lav mønsterrækker',
  'pattern-worksheet.ts': 'Lav mønsteropgaver',
  'picture-path.ts': 'Lav labyrinter',
  'picture-sort.ts': 'Lav sorteringsopgaver',
  'prepositions.ts': 'Lav forholdsordopgaver',
  'shadow-match.ts': 'Lav skyggeparopgaver',
  'subtraction.ts': 'Lav minusstykker',
  'sudoku.ts': 'Lav sudoku',
  'treasure-hunt.ts': 'Lav skattejagter',
  'word-guess.ts': 'Lav hængt mand-opgaver',
  'word-scramble.ts': 'Lav rod-med-bogstaver-opgaver',
  'wordsearch.ts': 'Lav ordleg',
  'writing.ts': 'Lav skriveøvelser',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'da');
let done = 0;
let skipped = 0;
const errors = [];

for (const [file, heading] of Object.entries(mapping)) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) {
    errors.push('MISSING: ' + file);
    continue;
  }
  let content = fs.readFileSync(fp, 'utf8');

  if (content.includes('ctaHeading:')) {
    skipped++;
    continue;
  }

  const pattern = /(\r?\n)(  howItWorks: \{)/;
  if (!pattern.test(content)) {
    errors.push('NO MATCH: ' + file);
    continue;
  }

  content = content.replace(pattern, `$1  ctaHeading: '${heading}',$1$1$2`);
  fs.writeFileSync(fp, content);
  done++;
  console.log('OK ' + file);
}

console.log('\nWrote: ' + done + ' | Skipped: ' + skipped + ' | Errors: ' + errors.length);
if (errors.length) {
  errors.forEach((e) => console.log('  ' + e));
  process.exit(1);
}
