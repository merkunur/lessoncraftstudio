/**
 * fix-de-all-content-paths.js
 *
 * Fixes German sample image paths in tool-content/de, guide-content/de,
 * start-content/de, and bundle-content/de files.
 *
 * These files reference samples from MULTIPLE apps, so we apply a flat
 * list of old→new path replacements to EVERY .ts file.
 *
 * Replacements are sorted longest-first to prevent partial matches.
 */

const fs = require('fs');
const path = require('path');

// Flat old→new replacement pairs
const replacements = [
  // alphabet train
  ['/samples/german/alphabet train/Alphabet Train 10.webp', '/samples/german/alphabet train/worksheet (2).webp'],
  ['/samples/german/alphabet train/Alphabet Train 5.webp', '/samples/german/alphabet train/worksheet (1).webp'],
  ['/samples/german/alphabet train/Alphabet Train 1.webp', '/samples/german/alphabet train/worksheet.webp'],
  // big small
  ['/samples/german/big small/big-small-different images.webp', '/samples/german/big small/big-small-worksheet_worksheet.webp'],
  ['/samples/german/big small/big-small number 1-2-3.webp', '/samples/german/big small/big-small-worksheet_answer_key.webp'],
  ['/samples/german/big small/big-small identical images.webp', '/samples/german/big small/big-small-worksheet_worksheet.webp'],
  // bingo
  ['/samples/german/bingo/bingo_card_1 word.webp', '/samples/german/bingo/bilder-bingo 3.webp'],
  ['/samples/german/bingo/bingo_card_1.webp', '/samples/german/bingo/bilder-bingo 2.webp'],
  ['/samples/german/bingo/bingo_card.webp', '/samples/german/bingo/bilder-bingo 1.webp'],
  // chart count
  ['/samples/german/chart count/chart count answer_key.webp', '/samples/german/chart count/answer_key.webp'],
  ['/samples/german/chart count/Picture Graph 5.webp', '/samples/german/chart count/Bilddiagramm 3.webp'],
  ['/samples/german/chart count/Picture Graph 1.webp', '/samples/german/chart count/Bilddiagramm 2.webp'],
  ['/samples/german/chart count/chart count.webp', '/samples/german/chart count/Bilddiagramm 1.webp'],
  // code addition
  ['/samples/german/code addition/Code Breaker Addition 3.webp', '/samples/german/code addition/Code-Knacker Addition 3.webp'],
  ['/samples/german/code addition/Code Breaker Addition 2.webp', '/samples/german/code addition/Code-Knacker Addition 2.webp'],
  ['/samples/german/code addition/Code Breaker Addition 1.webp', '/samples/german/code addition/Code-Knacker Addition 1.webp'],
  // crossword
  ['/samples/german/crossword/crossword_worksheet (5).webp', '/samples/german/crossword/crossword_worksheet.webp'],
  // cryptogram
  ['/samples/german/cryptogram/cryptogram_worksheet (5).webp', '/samples/german/cryptogram/Bilder-Kryptogramm 2.webp'],
  ['/samples/german/cryptogram/cryptogram_answer_key.webp', '/samples/german/cryptogram/Bilder-Kryptogramm 3.webp'],
  ['/samples/german/cryptogram/cryptogram_worksheet.webp', '/samples/german/cryptogram/Bilder-Kryptogramm 1.webp'],
  // draw and color
  ['/samples/german/draw and color/grid-drawing_worksheet (10).webp', '/samples/german/draw and color/Zeichnen und Ausmale 4.webp'],
  ['/samples/german/draw and color/grid-drawing_worksheet (5).webp', '/samples/german/draw and color/Zeichnen und Ausmale 3.webp'],
  ['/samples/german/draw and color/grid-drawing_worksheet (1).webp', '/samples/german/draw and color/Zeichnen und Ausmale 2.webp'],
  ['/samples/german/draw and color/grid-drawing_worksheet.webp', '/samples/german/draw and color/Zeichnen und Ausmale 1.webp'],
  // drawing lines
  ['/samples/german/drawing lines/drawing_lines_horizontal.webp', '/samples/german/drawing lines/Linien Zeichnen Üben 1.webp'],
  ['/samples/german/drawing lines/drawing_lines_curve 1.webp', '/samples/german/drawing lines/Linien Zeichnen Üben 2.webp'],
  ['/samples/german/drawing lines/drawing_lines_diagonal 1.webp', '/samples/german/drawing lines/Linien Zeichnen Üben 3.webp'],
  ['/samples/german/drawing lines/drawing_lines_vertical.webp', '/samples/german/drawing lines/Linien Zeichnen Üben 4.webp'],
  // find and count
  ['/samples/german/find and count/find and count portrait answer_key.webp', '/samples/german/find and count/Ich sehe was 1 answer_key.webp'],
  ['/samples/german/find and count/find and count portrait.webp', '/samples/german/find and count/Ich sehe was 1.webp'],
  ['/samples/german/find and count/find and count landscape.webp', '/samples/german/find and count/Ich sehe was 2.webp'],
  // find objects
  ['/samples/german/find objects/spotworks_worksheet (5).webp', '/samples/german/find objects/Finde das Unpassende (1).webp'],
  ['/samples/german/find objects/spotworks_worksheet (1).webp', '/samples/german/find objects/Finde das Unpassende 2.webp'],
  ['/samples/german/find objects/spotworks_answer_key.webp', '/samples/german/find objects/Finde das Unpassende 1 answer_key.webp'],
  ['/samples/german/find objects/spotworks_worksheet.webp', '/samples/german/find objects/Finde das Unpassende 1.webp'],
  // grid match
  ['/samples/german/grid match/Grid Match answer_key.webp', '/samples/german/grid match/Raster-Puzzle 1 answer_key.webp'],
  ['/samples/german/grid match/Grid Match (5).webp', '/samples/german/grid match/Raster-Puzzle 3.webp'],
  ['/samples/german/grid match/Grid Match (1).webp', '/samples/german/grid match/Raster-Puzzle 2.webp'],
  ['/samples/german/grid match/Grid Match.webp', '/samples/german/grid match/Raster-Puzzle 1.webp'],
  // matching
  ['/samples/german/matching/matching portrait answer_key.webp', '/samples/german/matching/Paare Finden 1 answer_key.webp'],
  ['/samples/german/matching/matching portrait.webp', '/samples/german/matching/Paare Finden 1.webp'],
  ['/samples/german/matching/image and word.webp', '/samples/german/matching/Paare Finden 2.webp'],
  // math puzzle
  ['/samples/german/math puzzle/Math Puzzles (10).webp', '/samples/german/math puzzle/Mathe-Rätsel 4.webp'],
  ['/samples/german/math puzzle/Math Puzzles (5).webp', '/samples/german/math puzzle/Mathe-Rätsel 3.webp'],
  ['/samples/german/math puzzle/Math Puzzles (1).webp', '/samples/german/math puzzle/Mathe-Rätsel 2.webp'],
  ['/samples/german/math puzzle/Math Puzzles.webp', '/samples/german/math puzzle/Mathe-Rätsel 1.webp'],
  // math worksheet
  ['/samples/german/math worksheet/Math Worksheet 10.webp', '/samples/german/math worksheet/worksheet.webp'],
  ['/samples/german/math worksheet/Math Worksheet 5.webp', '/samples/german/math worksheet/answer_key.webp'],
  ['/samples/german/math worksheet/Math Worksheet 1.webp', '/samples/german/math worksheet/worksheet.webp'],
  // missing pieces
  ['/samples/german/missing pieces/Missing Pieces answer_key.webp', '/samples/german/missing pieces/Fehlende Teile 1 answer_key.webp'],
  ['/samples/german/missing pieces/Missing Pieces (5).webp', '/samples/german/missing pieces/Fehlende Teile 3.webp'],
  ['/samples/german/missing pieces/Missing Pieces (1).webp', '/samples/german/missing pieces/Fehlende Teile 2.webp'],
  ['/samples/german/missing pieces/Missing Pieces.webp', '/samples/german/missing pieces/Fehlende Teile 1.webp'],
  // odd one out
  ['/samples/german/odd one out/Find the Odd One Out answer-key.webp', '/samples/german/odd one out/Finde das Andere 1 answer-key.webp'],
  ['/samples/german/odd one out/Find the Odd One Out (5).webp', '/samples/german/odd one out/Finde das Andere 3.webp'],
  ['/samples/german/odd one out/Find the Odd One Out (1).webp', '/samples/german/odd one out/Finde das Andere 2.webp'],
  ['/samples/german/odd one out/Find the Odd One Out.webp', '/samples/german/odd one out/Finde das Andere 1.webp'],
  // pattern train
  ['/samples/german/pattern train/pattern_train_answer_key.webp', '/samples/german/pattern train/Musterzug 1answer_key.webp'],
  ['/samples/german/pattern train/pattern_train_worksheet (5).webp', '/samples/german/pattern train/Musterzug 3.webp'],
  ['/samples/german/pattern train/pattern_train_worksheet (1).webp', '/samples/german/pattern train/Musterzug 2.webp'],
  ['/samples/german/pattern train/pattern_train_worksheet.webp', '/samples/german/pattern train/Musterzug 1.webp'],
  // pattern worksheet
  ['/samples/german/pattern worksheet/pattern_worksheet (5).webp', '/samples/german/pattern worksheet/pattern_worksheet.webp'],
  ['/samples/german/pattern worksheet/pattern_worksheet (1).webp', '/samples/german/pattern worksheet/pattern_answer_key.webp'],
  // picture path
  ['/samples/german/picture path/Picture Pathway answer_key.webp', '/samples/german/picture path/Bilderpfad 1 answer_key (1).webp'],
  ['/samples/german/picture path/Picture Pathway (5).webp', '/samples/german/picture path/Bilderpfad 3.webp'],
  ['/samples/german/picture path/Picture Pathway (1).webp', '/samples/german/picture path/Bilderpfad 2.webp'],
  ['/samples/german/picture path/Picture Pathway.webp', '/samples/german/picture path/Bilderpfad 1.webp'],
  // picture sort
  ['/samples/german/picture sort/Picture Sort answer_key.webp', '/samples/german/picture sort/Bilder Sortieren 1 answer_key.webp'],
  ['/samples/german/picture sort/Picture Sort (5).webp', '/samples/german/picture sort/Bilder Sortieren 3.webp'],
  ['/samples/german/picture sort/Picture Sort (1).webp', '/samples/german/picture sort/Bilder Sortieren 2.webp'],
  ['/samples/german/picture sort/Picture Sort.webp', '/samples/german/picture sort/Bilder Sortieren 1.webp'],
  // prepositions
  ['/samples/german/prepositions/prepositions_worksheet (10).webp', '/samples/german/prepositions/prepositions_worksheet.webp'],
  ['/samples/german/prepositions/prepositions_worksheet (5).webp', '/samples/german/prepositions/prepositions_answer_key.webp'],
  ['/samples/german/prepositions/prepositions_worksheet (1).webp', '/samples/german/prepositions/prepositions_worksheet.webp'],
  // shadow match
  ['/samples/german/shadow match/shadow-match-horizontal answer-key.webp', '/samples/german/shadow match/Schatten Zuordnen 1 answer-key.webp'],
  ['/samples/german/shadow match/shadow-match-horizontal.webp', '/samples/german/shadow match/Schatten Zuordnen 1.webp'],
  ['/samples/german/shadow match/shadow-match-vertical.webp', '/samples/german/shadow match/Schatten Zuordnen 2.webp'],
  // sudoku
  ['/samples/german/sudoku/sudoku_easy.webp', '/samples/german/sudoku/Bilder-Sudoku 1.webp'],
  ['/samples/german/sudoku/sudoku_hard.webp', '/samples/german/sudoku/Bilder-Sudoku 2.webp'],
  // treasure hunt
  ['/samples/german/treasure hunt/Treasure Hunt 1 answer_key.webp', '/samples/german/treasure hunt/answer_key.webp'],
  ['/samples/german/treasure hunt/Treasure Hunt 1.webp', '/samples/german/treasure hunt/worksheet.webp'],
  ['/samples/german/treasure hunt/north south.webp', '/samples/german/treasure hunt/worksheet (1).webp'],
  // word guess
  ['/samples/german/word guess/clue-grid_worksheet (2).webp', '/samples/german/word guess/clue-grid_worksheet.webp'],
  // word scramble
  ['/samples/german/word scramble/word scramble portrait answer-key.webp', '/samples/german/word scramble/Buchstabensala 1 answer-key.webp'],
  ['/samples/german/word scramble/word scramble portrait.webp', '/samples/german/word scramble/Buchstabensala 1.webp'],
  ['/samples/german/word scramble/Word Scramble 1.webp', '/samples/german/word scramble/Buchstabensala 2.webp'],
  // wordsearch
  ['/samples/german/wordsearch/wordsearch portrait.webp', '/samples/german/wordsearch/Worter suchen 1.webp'],
  ['/samples/german/wordsearch/wordsearch landscape.webp', '/samples/german/wordsearch/worksheet.webp'],
  ['/samples/german/wordsearch/custom word list.webp', '/samples/german/wordsearch/answer_key.webp'],
];

// Sort by old string length descending (longest first) to prevent partial matches
replacements.sort((a, b) => b[0].length - a[0].length);

// Target directories
const baseDir = path.join(__dirname, '..', 'frontend', 'config');
const targetDirs = [
  path.join(baseDir, 'tool-content', 'de'),
  path.join(baseDir, 'guide-content', 'de'),
  path.join(baseDir, 'start-content', 'de'),
  path.join(baseDir, 'bundle-content', 'de'),
];

let totalFiles = 0;
let totalFilesChanged = 0;
let totalReplacements = 0;

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    console.log(`SKIP: ${dir} (not found)`);
    continue;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  console.log(`\n=== ${path.relative(baseDir, dir)} (${files.length} files) ===`);

  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;
    let fileReplacements = 0;

    for (const [oldStr, newStr] of replacements) {
      // Count occurrences before replacing
      let idx = 0;
      let count = 0;
      while ((idx = content.indexOf(oldStr, idx)) !== -1) {
        count++;
        idx += oldStr.length;
      }
      if (count > 0) {
        content = content.split(oldStr).join(newStr);
        fileReplacements += count;
      }
    }

    totalFiles++;
    if (fileReplacements > 0) {
      fs.writeFileSync(filePath, content, 'utf-8');
      totalFilesChanged++;
      totalReplacements += fileReplacements;
      console.log(`  FIXED: ${file} (${fileReplacements} replacements)`);
    }
  }
}

console.log(`\n--- Summary ---`);
console.log(`Files scanned: ${totalFiles}`);
console.log(`Files changed: ${totalFilesChanged}`);
console.log(`Total replacements: ${totalReplacements}`);
