const fs = require('fs');
const path = require('path');

const H1_SUFFIX = ' — Skapa utskrifter att sälja på Etsy och KDP';
const TITLE_SUFFIX = ' | LessonCraftStudio';

// Swedish generator names. Tightened aggressively to hit the 60-char
// titleTag budget (20 chars for the brand suffix leaves ≤ 40 chars
// for the name).
const generators = {
  'addition.ts': 'Additionsgenerator',
  'alphabet-train.ts': 'Alfabetsgenerator',
  'big-small.ts': 'Stor och liten-generator',
  'bingo.ts': 'Bingokortsgenerator',
  'chart-count.ts': 'Räknegenerator',
  'code-addition.ts': 'Hemliga kodgeneratorn',
  'coloring.ts': 'Målarbildsgenerator',
  'crossword.ts': 'Korsordsgenerator',
  'cryptogram.ts': 'Kryptogramgenerator',
  'draw-and-color.ts': 'Rita och måla-generator',
  'drawing-lines.ts': 'Skrivmotorikgenerator',
  'find-and-count.ts': 'Hitta och räkna-generator',
  'find-objects.ts': 'Leta och hitta-generator',
  'grid-match.ts': 'Rutnätsgenerator',
  'matching.ts': 'Pardragningsgenerator',
  'math-puzzle.ts': 'Mattepusselgenerator',
  'math-worksheet.ts': 'Matteuppgiftsgenerator',
  'missing-pieces.ts': 'Saknade bitar-generator',
  'more-less.ts': 'Större eller mindre-generator',
  'odd-one-out.ts': 'Hittar inte hemma-generator',
  'pattern-train.ts': 'Mönserseriegenerator',
  'pattern-worksheet.ts': 'Mönstergenerator',
  'picture-path.ts': 'Labyrintsgenerator',
  'picture-sort.ts': 'Sorteringsgenerator',
  'prepositions.ts': 'Prepositionsgenerator',
  'shadow-match.ts': 'Skuggparsgenerator',
  'subtraction.ts': 'Subtraktionsgenerator',
  'sudoku.ts': 'Sudokugenerator',
  'treasure-hunt.ts': 'Skattjaktsgenerator',
  'word-guess.ts': 'Hänga gubbe-generator',
  'word-scramble.ts': 'Omkastade bokstäver-generator',
  'wordsearch.ts': 'Ordletargenerator',
  'writing.ts': 'Skrivövningsgenerator',
};

function renderedLength(v) {
  return v.replace(/\\'/g, "'").length;
}

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'sv');
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

console.log('\nRewrote ' + changes.length + ' SV hero.titles and titleTags.');
