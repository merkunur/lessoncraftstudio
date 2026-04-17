const fs = require('fs');
const path = require('path');

const H1_SUFFIX = ' — Crea imprimibles para vender en Etsy y KDP';
const TITLE_SUFFIX = ' | LessonCraftStudio';

// Spanish generator names. Tightened for the 60-char titleTag budget
// (|  LessonCraftStudio is 20 chars, so names should stay ≤ 40 chars
// after the pipe). Real characters directly in JS strings.
const generators = {
  'addition.ts': 'Generador de fichas de sumas',
  'alphabet-train.ts': 'Generador del abecedario',
  'big-small.ts': 'Generador de grande y pequeño',
  'bingo.ts': 'Generador de tarjetas de bingo',
  'chart-count.ts': 'Generador de fichas de conteo',
  'code-addition.ts': 'Generador de mensajes cifrados',
  'coloring.ts': 'Generador de páginas para colorear',
  'crossword.ts': 'Generador de crucigramas',
  'cryptogram.ts': 'Generador de criptogramas',
  'draw-and-color.ts': 'Generador de dibujar y colorear',
  'drawing-lines.ts': 'Generador de grafomotricidad',
  'find-and-count.ts': 'Generador de buscar y contar',
  'find-objects.ts': 'Generador de buscar y encontrar',
  'grid-match.ts': 'Generador de cuadrícula',
  'matching.ts': 'Generador de fichas de asociación',
  'math-puzzle.ts': 'Generador de puzzles matemáticos',
  'math-worksheet.ts': 'Generador de fichas de matemáticas',
  'missing-pieces.ts': 'Generador de piezas faltantes',
  'more-less.ts': 'Generador de mayor o menor',
  'odd-one-out.ts': 'Generador del intruso',
  'pattern-train.ts': 'Generador de secuencias',
  'pattern-worksheet.ts': 'Generador de patrones',
  'picture-path.ts': 'Generador de laberintos',
  'picture-sort.ts': 'Generador de clasificación',
  'prepositions.ts': 'Generador de preposiciones',
  'shadow-match.ts': 'Generador de sombras',
  'subtraction.ts': 'Generador de fichas de restas',
  'sudoku.ts': 'Generador de sudokus',
  'treasure-hunt.ts': 'Generador de búsqueda del tesoro',
  'word-guess.ts': 'Generador del ahorcado',
  'word-scramble.ts': 'Generador de letras desordenadas',
  'wordsearch.ts': 'Generador de sopa de letras',
  'writing.ts': 'Generador de fichas de escritura',
};

function renderedLength(literalValue) {
  return literalValue.replace(/\\'/g, "'").length;
}

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'es');
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

console.log('\nRewrote ' + changes.length + ' ES hero.titles and titleTags.');
console.log('\n--- ES Translation Queue (apps H1 + titleTag) ---\n');
for (const c of changes) {
  console.log(`### ${c.file}`);
  console.log(`  H1 BEFORE: ${c.oldH1}`);
  console.log(`  H1 AFTER : ${c.newH1}`);
  console.log(`  TT BEFORE: ${c.oldTitle}`);
  console.log(`  TT AFTER : ${c.newTitle}`);
  console.log('');
}
