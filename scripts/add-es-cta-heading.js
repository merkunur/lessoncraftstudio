const fs = require('fs');
const path = require('path');

// Spanish action-phrase CTA headings per generator. Parallels the EN,
// DE, and FR cta-heading scripts. Real characters used directly (á, é,
// í, ó, ú, ñ).
const mapping = {
  'addition.ts': 'Crear fichas de sumas',
  'alphabet-train.ts': 'Crear fichas del abecedario',
  'big-small.ts': 'Crear fichas de grande y pequeño',
  'bingo.ts': 'Crear tarjetas de bingo',
  'chart-count.ts': 'Crear fichas de conteo',
  'code-addition.ts': 'Crear fichas de mensajes cifrados',
  'coloring.ts': 'Crear dibujos para colorear',
  'crossword.ts': 'Crear crucigramas',
  'cryptogram.ts': 'Crear criptogramas',
  'draw-and-color.ts': 'Crear fichas de dibujar y colorear',
  'drawing-lines.ts': 'Crear fichas de grafomotricidad',
  'find-and-count.ts': 'Crear fichas de buscar y contar',
  'find-objects.ts': 'Crear fichas de buscar y encontrar',
  'grid-match.ts': 'Crear fichas de cuadrícula',
  'matching.ts': 'Crear fichas de asociación',
  'math-puzzle.ts': 'Crear rompecabezas matemáticos',
  'math-worksheet.ts': 'Crear fichas de matemáticas',
  'missing-pieces.ts': 'Crear puzzles de piezas faltantes',
  'more-less.ts': 'Crear fichas de mayor o menor',
  'odd-one-out.ts': 'Crear fichas del intruso',
  'pattern-train.ts': 'Crear fichas de secuencias',
  'pattern-worksheet.ts': 'Crear fichas de patrones',
  'picture-path.ts': 'Crear laberintos',
  'picture-sort.ts': 'Crear fichas de clasificación',
  'prepositions.ts': 'Crear fichas de preposiciones',
  'shadow-match.ts': 'Crear fichas de sombras',
  'subtraction.ts': 'Crear fichas de restas',
  'sudoku.ts': 'Crear sudokus',
  'treasure-hunt.ts': 'Crear búsquedas del tesoro',
  'word-guess.ts': 'Crear fichas del ahorcado',
  'word-scramble.ts': 'Crear fichas de letras desordenadas',
  'wordsearch.ts': 'Crear sopas de letras',
  'writing.ts': 'Crear fichas de escritura',
};

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'es');
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
