const fs = require('fs');
const path = require('path');

// Parallels scripts/rewrite-apps-h1s.js (EN) and rewrite-de-apps-h1s.js (DE).
const H1_SUFFIX = ' — Créez des imprimables à vendre sur Etsy & KDP';
const TITLE_SUFFIX = ' | LessonCraftStudio';

const generators = {
  'addition.ts': "Générateur de fiches d\\'addition",
  'alphabet-train.ts': "Générateur de fiches alphabet",
  'big-small.ts': "Générateur grand/petit",
  'bingo.ts': "Générateur de cartes de loto",
  'chart-count.ts': "Générateur de dénombrement",
  'code-addition.ts': "Générateur de messages codés",
  'coloring.ts': "Générateur de coloriages",
  'crossword.ts': "Générateur de mots croisés",
  'cryptogram.ts': "Générateur de cryptogrammes",
  'draw-and-color.ts': "Générateur dessin et coloriage",
  'drawing-lines.ts': "Générateur de graphisme",
  'find-and-count.ts': "Générateur cherche et compte",
  'find-objects.ts': "Générateur cherche et trouve",
  'grid-match.ts': "Générateur de quadrillage",
  'matching.ts': "Générateur d\\'association",
  'math-puzzle.ts': "Générateur de puzzles mathématiques",
  'math-worksheet.ts': "Générateur de fiches de maths",
  'missing-pieces.ts': "Générateur de pièces manquantes",
  'more-less.ts': "Générateur plus ou moins",
  'odd-one-out.ts': "Générateur de l\\'intrus",
  'pattern-train.ts': "Générateur de suites logiques",
  'pattern-worksheet.ts': "Générateur de motifs",
  'picture-path.ts': "Générateur de labyrinthes",
  'picture-sort.ts': "Générateur de tri",
  'prepositions.ts': "Générateur de prépositions",
  'shadow-match.ts': "Générateur d\\'ombres",
  'subtraction.ts': "Générateur de soustraction",
  'sudoku.ts': "Générateur de sudoku",
  'treasure-hunt.ts': "Générateur de chasse au trésor",
  'word-guess.ts': "Générateur de jeu du pendu",
  'word-scramble.ts': "Générateur de lettres mélangées",
  'wordsearch.ts': "Générateur de mots mêlés",
  'writing.ts': "Générateur de fiches d\\'écriture",
};

// Helper: count the true rendered length of a string literal by
// collapsing JS-level backslash-apostrophe to a single apostrophe.
function renderedLength(literalValue) {
  return literalValue.replace(/\\'/g, "'").length;
}

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'fr');
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

console.log('\nRewrote ' + changes.length + ' FR hero.titles and titleTags.');
console.log('\n--- FR Translation Queue (apps H1 + titleTag) ---\n');
for (const c of changes) {
  console.log(`### ${c.file}`);
  console.log(`  H1 BEFORE: ${c.oldH1}`);
  console.log(`  H1 AFTER : ${c.newH1}`);
  console.log(`  TT BEFORE: ${c.oldTitle}`);
  console.log(`  TT AFTER : ${c.newTitle}`);
  console.log('');
}
