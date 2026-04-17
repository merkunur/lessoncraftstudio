const fs = require('fs');
const path = require('path');

const H1_SUFFIX = ' — Crea stampabili da vendere su Etsy e KDP';
const TITLE_SUFFIX = ' | LessonCraftStudio';

// Italian generator names. Tightened to keep titleTag ≤ 60 chars
// (20 chars budgeted for " | LessonCraftStudio").
const generators = {
  'addition.ts': 'Generatore di schede di addizione',
  'alphabet-train.ts': 'Generatore dell\\\'alfabeto',
  'big-small.ts': 'Generatore grande e piccolo',
  'bingo.ts': 'Generatore di tombola',
  'chart-count.ts': 'Generatore schede di conteggio',
  'code-addition.ts': 'Generatore di messaggi cifrati',
  'coloring.ts': 'Generatore di pagine da colorare',
  'crossword.ts': 'Generatore di cruciverba',
  'cryptogram.ts': 'Generatore di crittogrammi',
  'draw-and-color.ts': 'Generatore disegno e colore',
  'drawing-lines.ts': 'Generatore di pregrafismo',
  'find-and-count.ts': 'Generatore cerca e conta',
  'find-objects.ts': 'Generatore cerca e trova',
  'grid-match.ts': 'Generatore schede a griglia',
  'matching.ts': 'Generatore di associazione',
  'math-puzzle.ts': 'Generatore di puzzle matematici',
  'math-worksheet.ts': 'Generatore schede di matematica',
  'missing-pieces.ts': 'Generatore di pezzi mancanti',
  'more-less.ts': 'Generatore maggiore o minore',
  'odd-one-out.ts': 'Generatore dell\\\'intruso',
  'pattern-train.ts': 'Generatore di sequenze',
  'pattern-worksheet.ts': 'Generatore di pattern',
  'picture-path.ts': 'Generatore di labirinti',
  'picture-sort.ts': 'Generatore di classificazione',
  'prepositions.ts': 'Generatore di preposizioni',
  'shadow-match.ts': 'Generatore delle ombre',
  'subtraction.ts': 'Generatore schede di sottrazione',
  'sudoku.ts': 'Generatore di sudoku',
  'treasure-hunt.ts': 'Generatore caccia al tesoro',
  'word-guess.ts': 'Generatore dell\\\'impiccato',
  'word-scramble.ts': 'Generatore lettere mescolate',
  'wordsearch.ts': 'Generatore di crucipuzzle',
  'writing.ts': 'Generatore schede di scrittura',
};

function renderedLength(literalValue) {
  return literalValue.replace(/\\'/g, "'").length;
}

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'it');
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

  const renderedTitleLen = renderedLength(newTitle);
  if (renderedTitleLen > 60) {
    console.error(`TITLE TOO LONG (${renderedTitleLen}): ${file} — "${newTitle}"`);
    process.exit(1);
  }

  src = src.replace(heroRe, `$1'${newH1}'`);
  src = src.replace(titleRe, `$1'${newTitle}'`);
  fs.writeFileSync(fp, src);

  changes.push({
    file,
    oldH1: heroMatch[2],
    newH1,
    oldTitle: titleMatch[2],
    newTitle,
    titleLen: renderedTitleLen,
  });
  console.log('OK ' + file + '  (title=' + renderedTitleLen + ')');
}

console.log('\nRewrote ' + changes.length + ' IT hero.titles and titleTags.');
