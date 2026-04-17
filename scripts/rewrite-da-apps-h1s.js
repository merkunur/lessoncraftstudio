const fs = require('fs');
const path = require('path');

const H1_SUFFIX = ' — Lav printables at sælge på Etsy og KDP';
const TITLE_SUFFIX = ' | LessonCraftStudio';

const generators = {
  'addition.ts': 'Plusstykker-generator',
  'alphabet-train.ts': 'Alfabetopgaver-generator',
  'big-small.ts': 'Stor og lille-generator',
  'bingo.ts': 'Bingokort-generator',
  'chart-count.ts': 'Tælleopgaver-generator',
  'code-addition.ts': 'Hemmelig kode-generator',
  'coloring.ts': 'Malesider-generator',
  'crossword.ts': 'Krydsord-generator',
  'cryptogram.ts': 'Kryptogram-generator',
  'draw-and-color.ts': 'Tegn og mal-generator',
  'drawing-lines.ts': 'Skrivemotorik-generator',
  'find-and-count.ts': 'Find og tæl-generator',
  'find-objects.ts': 'Find og markér-generator',
  'grid-match.ts': 'Gitter-generator',
  'matching.ts': 'Parkobling-generator',
  'math-puzzle.ts': 'Mattegåde-generator',
  'math-worksheet.ts': 'Matteopgaver-generator',
  'missing-pieces.ts': 'Manglende brikker-generator',
  'more-less.ts': 'Større eller mindre-generator',
  'odd-one-out.ts': 'Find den forkerte-generator',
  'pattern-train.ts': 'Mønsterrækker-generator',
  'pattern-worksheet.ts': 'Mønster-generator',
  'picture-path.ts': 'Labyrint-generator',
  'picture-sort.ts': 'Sortering-generator',
  'prepositions.ts': 'Forholdsord-generator',
  'shadow-match.ts': 'Skyggepar-generator',
  'subtraction.ts': 'Minusstykker-generator',
  'sudoku.ts': 'Sudoku-generator',
  'treasure-hunt.ts': 'Skattejagt-generator',
  'word-guess.ts': 'Hængt mand-generator',
  'word-scramble.ts': 'Rod med bogstaver-generator',
  'wordsearch.ts': 'Ordleg-generator',
  'writing.ts': 'Skriveøvelses-generator',
};

function renderedLength(v) { return v.replace(/\\'/g, "'").length; }

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'da');
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

console.log('\nRewrote ' + changes.length + ' DA hero.titles and titleTags.');
