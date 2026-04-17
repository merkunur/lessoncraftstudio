const fs = require('fs');
const path = require('path');

const H1_SUFFIX = ' — Lag utskrifter å selge på Etsy og KDP';
const TITLE_SUFFIX = ' | LessonCraftStudio';

// Norwegian generator names tightened to hit the 60-char budget.
const generators = {
  'addition.ts': 'Plusstykker-generator',
  'alphabet-train.ts': 'Alfabetoppgaver-generator',
  'big-small.ts': 'Stor og liten-generator',
  'bingo.ts': 'Bingokort-generator',
  'chart-count.ts': 'Telleoppgaver-generator',
  'code-addition.ts': 'Hemmelig kode-generator',
  'coloring.ts': 'Fargeleggingsbilder-generator',
  'crossword.ts': 'Kryssord-generator',
  'cryptogram.ts': 'Kryptogram-generator',
  'draw-and-color.ts': 'Tegn og fargelegg-generator',
  'drawing-lines.ts': 'Skrivemotorikk-generator',
  'find-and-count.ts': 'Finn og tell-generator',
  'find-objects.ts': 'Finn og merk-generator',
  'grid-match.ts': 'Rutenett-generator',
  'matching.ts': 'Parkobling-generator',
  'math-puzzle.ts': 'Mattegåte-generator',
  'math-worksheet.ts': 'Matteoppgaver-generator',
  'missing-pieces.ts': 'Manglende brikker-generator',
  'more-less.ts': 'Større eller mindre-generator',
  'odd-one-out.ts': 'Finn den som ikke hører til-generator',
  'pattern-train.ts': 'Mønsterrekker-generator',
  'pattern-worksheet.ts': 'Mønster-generator',
  'picture-path.ts': 'Labyrint-generator',
  'picture-sort.ts': 'Sortering-generator',
  'prepositions.ts': 'Preposisjon-generator',
  'shadow-match.ts': 'Skyggepar-generator',
  'subtraction.ts': 'Minusstykker-generator',
  'sudoku.ts': 'Sudoku-generator',
  'treasure-hunt.ts': 'Skattejakt-generator',
  'word-guess.ts': 'Hengemann-generator',
  'word-scramble.ts': 'Rotete bokstaver-generator',
  'wordsearch.ts': 'Ordjakt-generator',
  'writing.ts': 'Skriveøvelser-generator',
};

function renderedLength(v) { return v.replace(/\\'/g, "'").length; }

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'no');
const changes = [];

for (const [file, name] of Object.entries(generators)) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');

  const heroRe = /(hero:\s*\{\s*\n\s*title:\s*)'((?:[^'\\]|\\.)*)'/;
  const titleRe = /(titleTag:\s*)'((?:[^'\\]|\\.)*)'/;

  const heroMatch = src.match(heroRe);
  const titleMatch = src.match(titleRe);
  if (!heroMatch || !titleMatch) {
    console.error('PATTERN MISS: ' + file);
    process.exit(1);
  }

  const newH1 = name + H1_SUFFIX;
  const newTitle = name + TITLE_SUFFIX;

  const len = renderedLength(newTitle);
  if (len > 60) {
    console.error(`TITLE TOO LONG (${len}): ${file} — "${newTitle}"`);
    process.exit(1);
  }

  src = src.replace(heroRe, `$1'${newH1}'`);
  src = src.replace(titleRe, `$1'${newTitle}'`);
  fs.writeFileSync(fp, src);

  changes.push({ file, oldH1: heroMatch[2], newH1, oldTitle: titleMatch[2], newTitle, len });
  console.log('OK ' + file + '  (title=' + len + ')');
}

console.log('\nRewrote ' + changes.length + ' NO hero.titles and titleTags.');
