const fs = require('fs');
const path = require('path');

const mapping = {
  'addition.ts': 'Optelwerkbladen maken',
  'alphabet-train.ts': 'Alfabetwerkbladen maken',
  'big-small.ts': 'Werkbladen groot en klein maken',
  'bingo.ts': 'Bingokaarten maken',
  'chart-count.ts': 'Telwerkbladen maken',
  'code-addition.ts': 'Werkbladen met geheime code maken',
  'coloring.ts': 'Kleurplaten maken',
  'crossword.ts': 'Kruiswoordpuzzels maken',
  'cryptogram.ts': 'Cryptogrammen maken',
  'draw-and-color.ts': 'Teken- en kleurwerkbladen maken',
  'drawing-lines.ts': 'Schrijfmotoriek werkbladen maken',
  'find-and-count.ts': 'Zoek-en-tel werkbladen maken',
  'find-objects.ts': 'Zoekplaten maken',
  'grid-match.ts': 'Rasterwerkbladen maken',
  'matching.ts': 'Koppel-werkbladen maken',
  'math-puzzle.ts': 'Rekenpuzzels maken',
  'math-worksheet.ts': 'Rekenwerkbladen maken',
  'missing-pieces.ts': 'Puzzels met ontbrekende stukjes maken',
  'more-less.ts': 'Werkbladen meer of minder maken',
  'odd-one-out.ts': 'Vind-de-vreemde werkbladen maken',
  'pattern-train.ts': 'Patroonreeks werkbladen maken',
  'pattern-worksheet.ts': 'Patroonwerkbladen maken',
  'picture-path.ts': 'Doolhoven maken',
  'picture-sort.ts': 'Sorteerwerkbladen maken',
  'prepositions.ts': 'Voorzetselwerkbladen maken',
  'shadow-match.ts': 'Schaduwkoppel-werkbladen maken',
  'subtraction.ts': 'Aftrekwerkbladen maken',
  'sudoku.ts': 'Sudoku\\\'s maken',
  'treasure-hunt.ts': 'Schattenjachten maken',
  'word-guess.ts': 'Galgje-werkbladen maken',
  'word-scramble.ts': 'Door-elkaar-letters werkbladen maken',
  'wordsearch.ts': 'Woordzoekers maken',
  'writing.ts': 'Schrijfwerkbladen maken',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'nl');
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
