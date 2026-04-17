const fs = require('fs');
const path = require('path');

// Italian action-phrase CTA headings per generator. Real characters
// used directly; apostrophes escaped for the single-quoted TS literal.
const mapping = {
  'addition.ts': 'Crea schede di addizione',
  'alphabet-train.ts': 'Crea schede dell\\\'alfabeto',
  'big-small.ts': 'Crea schede grande e piccolo',
  'bingo.ts': 'Crea cartelle della tombola',
  'chart-count.ts': 'Crea schede di conteggio',
  'code-addition.ts': 'Crea schede di messaggi cifrati',
  'coloring.ts': 'Crea disegni da colorare',
  'crossword.ts': 'Crea cruciverba',
  'cryptogram.ts': 'Crea crittogrammi',
  'draw-and-color.ts': 'Crea schede di disegno e colore',
  'drawing-lines.ts': 'Crea schede di pregrafismo',
  'find-and-count.ts': 'Crea schede cerca e conta',
  'find-objects.ts': 'Crea schede cerca e trova',
  'grid-match.ts': 'Crea schede a griglia',
  'matching.ts': 'Crea schede di associazione',
  'math-puzzle.ts': 'Crea puzzle matematici',
  'math-worksheet.ts': 'Crea schede di matematica',
  'missing-pieces.ts': 'Crea puzzle a pezzi mancanti',
  'more-less.ts': 'Crea schede maggiore o minore',
  'odd-one-out.ts': 'Crea schede dell\\\'intruso',
  'pattern-train.ts': 'Crea schede di sequenze',
  'pattern-worksheet.ts': 'Crea schede di pattern',
  'picture-path.ts': 'Crea labirinti',
  'picture-sort.ts': 'Crea schede di classificazione',
  'prepositions.ts': 'Crea schede di preposizioni',
  'shadow-match.ts': 'Crea schede delle ombre',
  'subtraction.ts': 'Crea schede di sottrazione',
  'sudoku.ts': 'Crea sudoku',
  'treasure-hunt.ts': 'Crea cacce al tesoro',
  'word-guess.ts': 'Crea schede del gioco dell\\\'impiccato',
  'word-scramble.ts': 'Crea schede di lettere mescolate',
  'wordsearch.ts': 'Crea crucipuzzle',
  'writing.ts': 'Crea schede di scrittura',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'it');
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
