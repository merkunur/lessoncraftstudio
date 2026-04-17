const fs = require('fs');
const path = require('path');

const H1_SUFFIX = ' — Maak printables om te verkopen op Etsy en KDP';
const TITLE_SUFFIX = ' | LessonCraftStudio';

const generators = {
  'addition.ts': 'Optelwerkblad-generator',
  'alphabet-train.ts': 'Alfabetwerkblad-generator',
  'big-small.ts': 'Groot-en-klein-generator',
  'bingo.ts': 'Bingokaart-generator',
  'chart-count.ts': 'Telwerkblad-generator',
  'code-addition.ts': 'Geheime-code-generator',
  'coloring.ts': 'Kleurplaten-generator',
  'crossword.ts': 'Kruiswoordpuzzel-generator',
  'cryptogram.ts': 'Cryptogram-generator',
  'draw-and-color.ts': 'Teken-en-kleur-generator',
  'drawing-lines.ts': 'Schrijfmotoriek-generator',
  'find-and-count.ts': 'Zoek-en-tel-generator',
  'find-objects.ts': 'Zoekplaten-generator',
  'grid-match.ts': 'Rasterwerkblad-generator',
  'matching.ts': 'Koppel-werkblad-generator',
  'math-puzzle.ts': 'Rekenpuzzel-generator',
  'math-worksheet.ts': 'Rekenwerkblad-generator',
  'missing-pieces.ts': 'Ontbrekende-stukjes-generator',
  'more-less.ts': 'Meer-of-minder-generator',
  'odd-one-out.ts': 'Vind-de-vreemde-generator',
  'pattern-train.ts': 'Patroonreeks-generator',
  'pattern-worksheet.ts': 'Patroonwerkblad-generator',
  'picture-path.ts': 'Doolhof-generator',
  'picture-sort.ts': 'Sorteerwerkblad-generator',
  'prepositions.ts': 'Voorzetsel-generator',
  'shadow-match.ts': 'Schaduwkoppel-generator',
  'subtraction.ts': 'Aftrekwerkblad-generator',
  'sudoku.ts': 'Sudoku-generator',
  'treasure-hunt.ts': 'Schattenjacht-generator',
  'word-guess.ts': 'Galgje-generator',
  'word-scramble.ts': 'Door-elkaar-letters-generator',
  'wordsearch.ts': 'Woordzoeker-generator',
  'writing.ts': 'Schrijfwerkblad-generator',
};

function renderedLength(literalValue) {
  return literalValue.replace(/\\'/g, "'").length;
}

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'nl');
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

  changes.push({ file, oldH1: heroMatch[2], newH1, oldTitle: titleMatch[2], newTitle, titleLen: renderedTitleLen });
  console.log('OK ' + file + '  (title=' + renderedTitleLen + ')');
}

console.log('\nRewrote ' + changes.length + ' NL hero.titles and titleTags.');
