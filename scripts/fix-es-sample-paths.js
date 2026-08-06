/**
 * fix-es-sample-paths.js
 *
 * Replaces all /samples/english/ references in ES content files
 * with /samples/spanish/ and maps English filenames to Spanish equivalents.
 */

const fs = require('fs');
const path = require('path');

// Complete mapping: English filename → Spanish filename (within same app folder)
// Folder names stay the same (addition, wordsearch, etc.)
const filenameMap = {
  // addition
  'addition_worksheet portrait.webp': 'Suma Divertida 1.webp',
  'addition_worksheet landscape.webp': 'Suma Divertida 2.webp',
  'find addend.webp': 'Suma Divertida 3.webp',
  'image and number.webp': 'Suma Divertida 4.webp',
  'Addition Fun 1.webp': 'Suma Divertida 1.webp',

  // alphabet train
  'Alphabet Train 1.webp': 'Tren del Alfabeto 1.webp',
  'Alphabet Train 5.webp': 'Tren del Alfabeto 2.webp',
  'Alphabet Train 10.webp': 'Tren del Alfabeto 3.webp',

  // big small
  'big-small-worksheet_worksheet.webp': 'Grande o Pequeño 1.webp',
  'big-small-different images.webp': 'Grande o Pequeño 2.webp',
  'big-small number 1-2-3.webp': 'Grande o Pequeño 3.webp',
  'big-small identical images.webp': 'Grande o Pequeño 4.webp',

  // bingo
  'bingo_card.webp': 'Bingo de Imágenes 1.webp',
  'bingo_card_1.webp': 'Bingo de Imágenes 2.webp',
  'bingo_card_1 word.webp': 'Bingo de Imágenes 3.webp',
  'callout.webp': 'Bingo de Imágenes 1 callout.webp',

  // chart count
  'chart count.webp': 'Gráfico de Dibujos 1.webp',
  'Picture Graph 1.webp': 'Gráfico de Dibujos 2.webp',
  'Picture Graph 5.webp': 'Gráfico de Dibujos 3.webp',
  'chart count answer_key.webp': 'Gráfico de Dibujos 1 answer_key.webp',

  // code addition
  'Code Breaker Addition 1.webp': 'Código Secreto Suma 1.webp',
  'Code Breaker Addition 2.webp': 'Código Secreto Suma 2.webp',
  'Code Breaker Addition 3.webp': 'Código Secreto Suma 3.webp',

  // coloring — same filenames, just folder change
  'coloring portrait 1.webp': 'coloring portrait 1.webp',
  'coloring portrait 2.webp': 'coloring portrait 2.webp',
  'coloring portrait 3.webp': 'coloring portrait 3.webp',
  'coloring portrait 4.webp': 'coloring portrait 4.webp',
  'coloring portrait 5.webp': 'coloring portrait 5.webp',
  'coloring landscape 1.webp': 'coloring landscape 1.webp',

  // crossword
  'crossword_worksheet.webp': 'Crucigrama con Dibujos 1.webp',
  'crossword_worksheet (1).webp': 'Crucigrama con Dibujos 2.webp',
  'crossword_worksheet (5).webp': 'Crucigrama con Dibujos 3.webp',
  'crossword_answer_key.webp': 'Crucigrama con Dibujos 1 answer_key.webp',

  // cryptogram
  'cryptogram_worksheet.webp': 'Criptograma de Dibujos 1.webp',
  'cryptogram_worksheet (5).webp': 'Criptograma de Dibujos 2.webp',
  'cryptogram_answer_key.webp': 'Criptograma de Dibujos 1 answer_key.webp',

  // draw and color
  'grid-drawing_worksheet.webp': 'Dibuja y Colorea 1.webp',
  'grid-drawing_worksheet (1).webp': 'Dibuja y Colorea 2.webp',
  'grid-drawing_worksheet (5).webp': 'Dibuja y Colorea 5.webp',
  'grid-drawing_worksheet (10).webp': 'Dibuja y Colorea 10.webp',

  // drawing lines
  'drawing_lines_horizontal.webp': 'Practica de Dibujar Línea 1.webp',
  'drawing_lines_vertical.webp': 'Practica de Dibujar Línea 2.webp',
  'drawing_lines_diagonal 1.webp': 'Practica de Dibujar Línea 3.webp',
  'drawing_lines_curve 1.webp': 'Practica de Dibujar Línea 4.webp',

  // find and count
  'find and count portrait.webp': 'Veo Veo 1.webp',
  'find and count landscape.webp': 'Veo Veo 2.webp',
  'find and count portrait answer_key.webp': 'Veo Veo 1 answer_key.webp',

  // find objects
  'spotworks_worksheet.webp': 'Encuentra el Diferente 1.webp',
  'spotworks_worksheet (1).webp': 'Encuentra el Diferente 2.webp',
  'spotworks_worksheet (5).webp': 'Encuentra el Diferente 3.webp',
  'spotworks_answer_key.webp': 'Encuentra el Diferente 1 answer_key.webp',

  // grid match
  'Grid Match.webp': 'Puzzle de Cuadrícula 1.webp',
  'Grid Match (1).webp': 'Puzzle de Cuadrícula 2.webp',
  'Grid Match (5).webp': 'Puzzle de Cuadrícula 3.webp',
  'Grid Match answer_key.webp': 'Puzzle de Cuadrícula 1 answer_key.webp',

  // matching
  'matching portrait.webp': 'Encuentra Parejas 1.webp',
  'image and word.webp': 'Encuentra Parejas 2.webp',
  'matching portrait answer_key.webp': 'Encuentra Parejas 1 answer_key.webp',

  // math puzzle
  'Math Puzzles.webp': 'Rompecabezas Matemáticos 1.webp',
  'Math Puzzles (1).webp': 'Rompecabezas Matemáticos 2.webp',
  'Math Puzzles (5).webp': 'Rompecabezas Matemáticos 3.webp',
  'Math Puzzles (10).webp': 'Rompecabezas Matemáticos 4.webp',

  // math worksheet
  'Math Worksheet 1.webp': 'Hoja de Matemáticas 1.webp',
  'Math Worksheet 5.webp': 'Hoja de Matemáticas 2.webp',
  'Math Worksheet 10.webp': 'Hoja de Matemáticas 3.webp',

  // missing pieces
  'Missing Pieces.webp': 'Piezas Perdidas 1.webp',
  'Missing Pieces (1).webp': 'Piezas Perdidas 2.webp',
  'Missing Pieces (5).webp': 'Piezas Perdidas 3.webp',
  'Missing Pieces answer_key.webp': 'Piezas Perdidas 1 answer_key.webp',

  // more less
  'More Less (10).webp': 'Más Menos 1.webp',
  'More Less (12).webp': 'Más Menos 2.webp',
  'More Less (14).webp': 'Más Menos 3.webp',

  // odd one out
  'Find the Odd One Out.webp': 'Encuentra el Diferente 1.webp',
  'Find the Odd One Out (1).webp': 'Encuentra el Diferente 2.webp',
  'Find the Odd One Out (5).webp': 'Encuentra el Diferente 3.webp',
  'Find the Odd One Out answer-key.webp': 'Encuentra el Diferente 1 answer-key.webp',

  // pattern train
  'pattern_train_worksheet.webp': 'Tren de Patrones 1.webp',
  'pattern_train_worksheet (1).webp': 'Tren de Patrones 2.webp',
  'pattern_train_worksheet (5).webp': 'Tren de Patrones 3.webp',
  'pattern_train_answer_key.webp': 'Tren de Patrones 1 answer_key.webp',

  // pattern worksheet
  'pattern_worksheet.webp': 'Rompecabezas de Patrones 1.webp',
  'pattern_worksheet (1).webp': 'Rompecabezas de Patrones 2.webp',
  'pattern_worksheet (5).webp': 'Rompecabezas de Patrones 3.webp',
  'pattern_answer_key.webp': 'Rompecabezas de Patrones 1 answer_key.webp',

  // picture path
  'Picture Pathway.webp': 'Camino de Imágenes 1.webp',
  'Picture Pathway (1).webp': 'Camino de Imágenes 2.webp',
  'Picture Pathway (5).webp': 'Camino de Imágenes 3.webp',
  'Picture Pathway answer_key.webp': 'Camino de Imágenes 1 answer_key.webp',

  // picture sort
  'Picture Sort.webp': 'Clasificación de Imágenes 1.webp',
  'Picture Sort (1).webp': 'Clasificación de Imágenes 2.webp',
  'Picture Sort (5).webp': 'Clasificación de Imágenes 3.webp',
  'Picture Sort answer_key.webp': 'Clasificación de Imágenes 1 answer_key.webp',

  // prepositions
  'prepositions_worksheet (1).webp': 'Preposiciones 1.webp',
  'prepositions_worksheet (5).webp': 'Preposiciones 2.webp',
  'prepositions_worksheet (10).webp': 'Preposiciones 3.webp',

  // shadow match
  'shadow-match-worksheet.webp': 'Empareja las Sombras 1.webp',
  'shadow-match-worksheet (1).webp': 'Empareja las Sombras 2.webp',
  'shadow-match-vertical.webp': 'Empareja las Sombras 3.webp',
  'shadow-match-horizontal.webp': 'Empareja las Sombras 4.webp',
  'shadow-match-horizontal answer-key.webp': 'Empareja las Sombras 1 answer-key.webp',

  // subtraction
  'Subtraction Fun 1.webp': 'Restas Divertidas 1.webp',
  'cross out.webp': 'Restas Divertidas 2.webp',
  'find subtrahend.webp': 'Restas Divertidas 3.webp',
  'image number.webp': 'Restas Divertidas 4.webp',

  // sudoku
  'sudoku_worksheet.webp': 'Sudoku de Imágenes 1.webp',
  'sudoku_easy.webp': 'Sudoku de Imágenes 2.webp',
  'sudoku hard.webp': 'Sudoku de Imágenes 3.webp',
  'sudoku_answer_key.webp': 'Sudoku de Imágenes 1 answer_key.webp',

  // treasure hunt
  'Treasure Hunt 1.webp': 'Búsqueda del Tesoro 1.webp',
  'north south.webp': 'Búsqueda del Tesoro 2.webp',
  'Treasure Hunt 1 answer_key.webp': 'Búsqueda del Tesoro 1 answer_key.webp',

  // word guess
  'clue-grid_worksheet.webp': 'Adivina la Palabra 1.webp',
  'clue-grid_worksheet (2).webp': 'Adivina la Palabra 2.webp',
  'clue-grid_worksheet (4).webp': 'Adivina la Palabra 3.webp',
  'clue-grid_answer-key.webp': 'Adivina la Palabra 1 answer-key.webp',

  // word scramble
  'word scramble portrait.webp': 'Palabras Revueltas 1.webp',
  'Word Scramble 1.webp': 'Palabras Revueltas 2.webp',
  'word scramble portrait answer-key.webp': 'Palabras Revueltas 1 answer-key.webp',

  // wordsearch
  'wordsearch portrait.webp': 'Sopa de Letras 1.webp',
  'wordsearch landscape.webp': 'Sopa de Letras 2.webp',
  'custom word list.webp': 'Sopa de Letras 3.webp',

  // writing — same filenames
  'writing.webp': 'writing.webp',
  'writing beginning letter.webp': 'writing beginning letter.webp',
  'writing custom.webp': 'writing custom.webp',
};

const contentDirs = [
  'frontend/config/app-content/es',
  'frontend/config/tool-content/es',
  'frontend/config/bundle-content/es',
  'frontend/config/start-content/es',
  'frontend/config/guide-content/es',
  'frontend/config/idea-content/es',
];

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;
const unmappedPaths = new Set();

for (const dir of contentDirs) {
  const fullDir = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('/samples/english/')) continue;
    totalFiles++;

    let fileReplacements = 0;

    // Replace each /samples/english/[folder]/[filename] with /samples/spanish/[folder]/[spanish-filename]
    const newContent = content.replace(
      /\/samples\/english\/([^/'\"]+)\/([^'\"]+)/g,
      (match, folder, filename) => {
        const spanishFilename = filenameMap[filename];
        if (spanishFilename !== undefined) {
          fileReplacements++;
          return `/samples/spanish/${folder}/${spanishFilename}`;
        }
        // If no mapping, still change folder from english to spanish but keep filename
        unmappedPaths.add(match);
        fileReplacements++;
        return `/samples/spanish/${folder}/${filename}`;
      }
    );

    // Also handle bare folder references like /samples/english/addition/
    const finalContent = newContent.replace(
      /\/samples\/english\/([^/'\"]+)\//g,
      (match, folder) => {
        // Only replace if not already handled (check if it's a bare folder ref at end of string context)
        return `/samples/spanish/${folder}/`;
      }
    );

    if (finalContent !== content) {
      fs.writeFileSync(filePath, finalContent, 'utf8');
      modifiedFiles++;
      totalReplacements += fileReplacements;
      console.log(`  ✓ ${dir}/${file} — ${fileReplacements} replacements`);
    }
  }
}

console.log('\n--- Summary ---');
console.log(`Files scanned with /samples/english/: ${totalFiles}`);
console.log(`Files modified: ${modifiedFiles}`);
console.log(`Total replacements: ${totalReplacements}`);

if (unmappedPaths.size > 0) {
  console.log(`\n⚠ Unmapped paths (kept filename, changed folder only):`);
  for (const p of unmappedPaths) {
    console.log(`  ${p}`);
  }
}

// Verification
console.log('\n--- Verification ---');
let remainingEnglish = 0;
let spanishCount = 0;
for (const dir of contentDirs) {
  const fullDir = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) continue;
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(fullDir, file), 'utf8');
    const enMatches = content.match(/\/samples\/english\//g);
    const esMatches = content.match(/\/samples\/spanish\//g);
    if (enMatches) remainingEnglish += enMatches.length;
    if (esMatches) spanishCount += esMatches.length;
  }
}
console.log(`Remaining /samples/english/ references: ${remainingEnglish}`);
console.log(`Total /samples/spanish/ references: ${spanishCount}`);

if (remainingEnglish > 0) {
  console.log('\n❌ ERROR: Some /samples/english/ references remain!');
  process.exit(1);
} else {
  console.log('\n✅ All ES content files now use /samples/spanish/ paths.');
}
