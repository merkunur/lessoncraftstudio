const fs = require('fs');
const path = require('path');

const mapping = {
  'addition.ts': 'Lag plusstykker',
  'alphabet-train.ts': 'Lag alfabetoppgaver',
  'big-small.ts': 'Lag stor og liten-oppgaver',
  'bingo.ts': 'Lag bingokort',
  'chart-count.ts': 'Lag telleoppgaver',
  'code-addition.ts': 'Lag hemmelige kodemeldinger',
  'coloring.ts': 'Lag fargeleggingsbilder',
  'crossword.ts': 'Lag kryssord',
  'cryptogram.ts': 'Lag kryptogrammer',
  'draw-and-color.ts': 'Lag tegne- og fargeleggingsoppgaver',
  'drawing-lines.ts': 'Lag skrivemotorikkoppgaver',
  'find-and-count.ts': 'Lag finn-og-tell-oppgaver',
  'find-objects.ts': 'Lag finn-og-merk-oppgaver',
  'grid-match.ts': 'Lag rutenettoppgaver',
  'matching.ts': 'Lag parkoblingsoppgaver',
  'math-puzzle.ts': 'Lag mattegåter',
  'math-worksheet.ts': 'Lag matteoppgaver',
  'missing-pieces.ts': 'Lag puslespill med manglende brikker',
  'more-less.ts': 'Lag større eller mindre-oppgaver',
  'odd-one-out.ts': 'Lag hvem hører ikke hjemme-oppgaver',
  'pattern-train.ts': 'Lag mønsterrekker',
  'pattern-worksheet.ts': 'Lag mønsteroppgaver',
  'picture-path.ts': 'Lag labyrinter',
  'picture-sort.ts': 'Lag sorteringsoppgaver',
  'prepositions.ts': 'Lag preposisjonsoppgaver',
  'shadow-match.ts': 'Lag skyggeparoppgaver',
  'subtraction.ts': 'Lag minusstykker',
  'sudoku.ts': 'Lag sudoku',
  'treasure-hunt.ts': 'Lag skattejakt',
  'word-guess.ts': 'Lag hengemann-oppgaver',
  'word-scramble.ts': 'Lag rotete-bokstaver-oppgaver',
  'wordsearch.ts': 'Lag ordjakt',
  'writing.ts': 'Lag skriveøvelser',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'no');
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
