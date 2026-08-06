const fs = require('fs');
const path = require('path');

const dir = 'frontend/config/guide-content/fr';

// Mapping: old path fragment → new path fragment
// First do the simple english → french locale swap for files that exist in both
// Then handle English-only filenames → French filenames
const replacements = [
  // Draw and color
  ['/samples/english/draw and color/grid-drawing_worksheet (5).webp', '/samples/french/draw and color/Dessine et Colorie 5.webp'],
  ['/samples/english/draw and color/grid-drawing_worksheet (1).webp', '/samples/french/draw and color/Dessine et Colorie 1.webp'],

  // Cryptogram
  ['/samples/english/cryptogram/cryptogram_worksheet.webp', '/samples/french/cryptogram/Cryptogramme en Images 1.webp'],
  ['/samples/english/cryptogram/cryptogram_worksheet (5).webp', '/samples/french/cryptogram/Cryptogramme en Images 2.webp'],
  ['/samples/english/cryptogram/cryptogram_answer_key.webp', '/samples/french/cryptogram/Cryptogramme en Images 1 answer_key.webp'],

  // Chart count
  ['/samples/english/chart count/worksheet.webp', '/samples/french/chart count/worksheet.webp'],
  ['/samples/english/chart count/Picture Graph 1.webp', '/samples/french/chart count/worksheet (1).webp'],
  ['/samples/english/chart count/chart count answer_key.webp', '/samples/french/chart count/answer_key (1).webp'],
  ['/samples/english/chart count/Picture Graph 5.webp', '/samples/french/chart count/worksheet (2).webp'],

  // Missing pieces
  ['/samples/english/missing pieces/Missing Pieces (1).webp', '/samples/french/missing pieces/Pièces Manquantes 1.webp'],
  ['/samples/english/missing pieces/Missing Pieces answer_key.webp', '/samples/french/missing pieces/Pièces Manquantes 1 answer_key.webp'],

  // Prepositions
  ['/samples/english/prepositions/prepositions_worksheet (1).webp', '/samples/french/prepositions/Prépositions 1.webp'],
  ['/samples/english/prepositions/prepositions_worksheet (5).webp', '/samples/french/prepositions/Prépositions 2.webp'],
  ['/samples/english/prepositions/prepositions_worksheet (10).webp', '/samples/french/prepositions/Prépositions 3.webp'],

  // Picture path / maze
  ['/samples/english/picture path/Picture Pathway.webp', "/samples/french/picture path/Chemin d'Images 1.webp"],

  // Sudoku
  ['/samples/english/sudoku/sudoku_worksheet.webp', '/samples/french/sudoku/Sudoku en Images 1.webp'],

  // Treasure hunt - specific English filenames first
  ['/samples/english/treasure hunt/north south.webp', '/samples/french/treasure hunt/Chasse au Trésor 2.webp'],
  ['/samples/english/treasure hunt/Treasure Hunt 1 answer_key.webp', '/samples/french/treasure hunt/Chasse au Trésor 1 answer_key.webp'],

  // Odd one out
  ['/samples/english/odd one out/Find the Odd One Out (1).webp', "/samples/french/odd one out/Trouve l'Intrus 1.webp"],
  ['/samples/english/odd one out/Find the Odd One Out answer-key.webp', "/samples/french/odd one out/Trouve l'Intrus 1 answer-key.webp"],

  // Shadow match
  ['/samples/english/shadow match/shadow-match-worksheet (1).webp', "/samples/french/shadow match/Trouve l'Ombre 1.webp"],
  ['/samples/english/shadow match/shadow-match-horizontal answer-key.webp', "/samples/french/shadow match/Trouve l'Ombre 1 answer-key.webp"],

  // Picture sort
  ['/samples/english/picture sort/Picture Sort (1).webp', "/samples/french/picture sort/Tri d'Images 1.webp"],
  ['/samples/english/picture sort/Picture Sort answer_key.webp', "/samples/french/picture sort/Tri d'Images 1 answer_key.webp"],

  // Big small - English filenames exist in French folder too
  ['/samples/english/big small/big-small-worksheet_worksheet.webp', '/samples/french/big small/Grand ou Petit 1.webp'],
  ['/samples/english/big small/big-small-different images.webp', '/samples/french/big small/Grand ou Petit 2.webp'],

  // Alphabet train - English filenames
  ['/samples/english/alphabet train/Alphabet Train 5.webp', "/samples/french/alphabet train/Train de l'Alphabet 2.webp"],
  ['/samples/english/alphabet train/Alphabet Train 10.webp', "/samples/french/alphabet train/Train de l'Alphabet 3.webp"],
];

// After specific replacements, do generic english → french for remaining paths
// (files that have French names but wrong locale)

let totalFiles = 0;
let totalReplacements = 0;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  let fileReplacements = 0;

  // Apply specific replacements first
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      fileReplacements++;
    }
  }

  // Then do generic /samples/english/ → /samples/french/ for any remaining
  const genericCount = (content.match(/\/samples\/english\//g) || []).length;
  if (genericCount > 0) {
    content = content.replace(/\/samples\/english\//g, '/samples/french/');
    fileReplacements += genericCount;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath} (${fileReplacements} replacements)`);
    totalFiles++;
    totalReplacements += fileReplacements;
  }
}

console.log(`\nTotal: ${totalFiles} files, ${totalReplacements} replacements`);
