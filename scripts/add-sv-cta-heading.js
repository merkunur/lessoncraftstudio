const fs = require('fs');
const path = require('path');

const mapping = {
  'addition.ts': 'Skapa additionsuppgifter',
  'alphabet-train.ts': 'Skapa alfabetsuppgifter',
  'big-small.ts': 'Skapa stor och liten-uppgifter',
  'bingo.ts': 'Skapa bingokort',
  'chart-count.ts': 'Skapa räkneuppgifter',
  'code-addition.ts': 'Skapa hemliga kodmeddelanden',
  'coloring.ts': 'Skapa målarbilder',
  'crossword.ts': 'Skapa korsord',
  'cryptogram.ts': 'Skapa kryptogram',
  'draw-and-color.ts': 'Skapa rita och måla-uppgifter',
  'drawing-lines.ts': 'Skapa skrivmotorikövningar',
  'find-and-count.ts': 'Skapa hitta och räkna-uppgifter',
  'find-objects.ts': 'Skapa leta och hitta-lekar',
  'grid-match.ts': 'Skapa rutnätsuppgifter',
  'matching.ts': 'Skapa pardragningsuppgifter',
  'math-puzzle.ts': 'Skapa mattepussel',
  'math-worksheet.ts': 'Skapa matteuppgifter',
  'missing-pieces.ts': 'Skapa pussel med saknade bitar',
  'more-less.ts': 'Skapa större eller mindre-uppgifter',
  'odd-one-out.ts': 'Skapa vilken hör inte hemma-uppgifter',
  'pattern-train.ts': 'Skapa mönsterserier',
  'pattern-worksheet.ts': 'Skapa mönsteruppgifter',
  'picture-path.ts': 'Skapa labyrinter',
  'picture-sort.ts': 'Skapa sorteringsuppgifter',
  'prepositions.ts': 'Skapa prepositionsuppgifter',
  'shadow-match.ts': 'Skapa skuggparuppgifter',
  'subtraction.ts': 'Skapa subtraktionsuppgifter',
  'sudoku.ts': 'Skapa sudoku',
  'treasure-hunt.ts': 'Skapa skattjakter',
  'word-guess.ts': 'Skapa hänga gubbe-uppgifter',
  'word-scramble.ts': 'Skapa omkastade bokstäver-uppgifter',
  'wordsearch.ts': 'Skapa ordletare',
  'writing.ts': 'Skapa skrivövningar',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'sv');
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
