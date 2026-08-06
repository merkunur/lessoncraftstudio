const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content/fr',
  'frontend/config/tool-content/fr',
  'frontend/config/guide-content/fr',
  'frontend/config/start-content/fr',
  'frontend/config/bundle-content/fr',
];

// Build map: raw path -> list of files
const pathToFiles = new Map();

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const lines = content.split('\n');
    for (const line of lines) {
      const matches = [...line.matchAll(/'((?:[^'\\]|\\.)*)'/g)];
      for (const m of matches) {
        let val = m[1].replace(/\\'/g, "'");
        if (val.includes('/samples/french/') && !val.endsWith('/')) {
          const key = val;
          if (!pathToFiles.has(key)) pathToFiles.set(key, []);
          const shortDir = dir.replace('frontend/config/', '');
          const entry = shortDir + '/' + f;
          if (!pathToFiles.get(key).includes(entry)) {
            pathToFiles.get(key).push(entry);
          }
        }
      }
    }
  }
}

// List of known broken paths (from server test)
const brokenPaths = [
  '/samples/french/addition/Addition Amusante 1.webp',
  '/samples/french/addition/Addition Fun 1.webp',
  '/samples/french/addition/Additions 1.webp',
  '/samples/french/addition/Additions 2.webp',
  '/samples/french/addition/Additions 3.webp',
  '/samples/french/addition/Additions Amusantes 1.webp',
  '/samples/french/addition/addition_worksheet portrait.webp',
  '/samples/french/alphabet train/Alphabet Train 1.webp',
  '/samples/french/alphabet train/Train Alphabet 1.webp',
  '/samples/french/alphabet train/Train Alphabet 2.webp',
  '/samples/french/alphabet train/Train Alphabet 3.webp',
  '/samples/french/big small/Grand Petit 1.webp',
  '/samples/french/big small/Grand Petit 2.webp',
  '/samples/french/big small/Grand Petit 3.webp',
  '/samples/french/bingo/Bingo 1.webp',
  '/samples/french/bingo/Bingo 2.webp',
  '/samples/french/bingo/Bingo 3.webp',
  '/samples/french/bingo/Bingo Images 1.webp',
  '/samples/french/bingo/bingo_card.webp',
  '/samples/french/chart count/Graphique Images 1.webp',
  '/samples/french/chart count/Graphique Images 2.webp',
  '/samples/french/chart count/Graphique Images 3.webp',
  '/samples/french/chart count/chart count.webp',
  "/samples/french/code addition/Addition Cod\u00e9e 1.webp",
  "/samples/french/code addition/Addition Cod\u00e9e 2.webp",
  "/samples/french/code addition/Addition Cod\u00e9e 3.webp",
  '/samples/french/coloring/Coloriage 1.webp',
  '/samples/french/coloring/Coloriage 2.webp',
  '/samples/french/coloring/Coloriage 3.webp',
  '/samples/french/coloring/coloriage portrait 1.webp',
  "/samples/french/crossword/Mots Crois\u00e9s en Images 1 answer_key.webp",
  "/samples/french/crossword/Mots Crois\u00e9s en Images 1.webp",
  "/samples/french/crossword/Mots Crois\u00e9s en Images 2.webp",
  '/samples/french/crossword/crossword_worksheet.webp',
  '/samples/french/cryptogram/Cryptogramme 1.webp',
  '/samples/french/cryptogram/Cryptogramme 2.webp',
  '/samples/french/cryptogram/Cryptogramme 3.webp',
  '/samples/french/draw and color/Dessin Quadrillage 1.webp',
  '/samples/french/draw and color/Dessin Quadrillage 2.webp',
  '/samples/french/draw and color/Dessin Quadrillage 3.webp',
  '/samples/french/draw and color/dessin quadrillage 1.webp',
  '/samples/french/draw and color/grid-drawing_worksheet.webp',
  '/samples/french/drawing lines/Graphisme 1.webp',
  '/samples/french/drawing lines/Graphisme 2.webp',
  '/samples/french/drawing lines/Graphisme 3.webp',
  '/samples/french/drawing lines/drawing_lines_horizontal.webp',
  '/samples/french/find and count/find and count portrait.webp',
  '/samples/french/find objects/spotworks_worksheet.webp',
  '/samples/french/matching/Association 1.webp',
  '/samples/french/matching/Jeu d Association 1.webp',
  '/samples/french/matching/Relier les Paires 1.webp',
  '/samples/french/matching/Trouver les Paires 1.webp',
  '/samples/french/matching/matching portrait.webp',
  "/samples/french/math puzzle/Casse-T\u00eates Math\u00e9matiques 2.webp",
  "/samples/french/math puzzle/Casse-T\u00eates Math\u00e9matiques 3.webp",
  '/samples/french/math puzzle/Puzzle Maths 1.webp',
  '/samples/french/math worksheet/Exercice Maths 1.webp',
  '/samples/french/math worksheet/Exercices Maths 1.webp',
  '/samples/french/math worksheet/Exercices Maths 2.webp',
  '/samples/french/math worksheet/Exercices Maths 3.webp',
  "/samples/french/math worksheet/Feuille de Math\u00e9matique 1.webp",
  '/samples/french/math worksheet/Math Worksheet 10.webp',
  "/samples/french/missing pieces/Pi\u00e8ces Manquantes 1 answer_key.jpeg",
  "/samples/french/missing pieces/Pi\u00e8ces Manquantes 1.jpeg",
  "/samples/french/missing pieces/Pi\u00e8ces Manquantes 1.webp",
  "/samples/french/missing pieces/Pi\u00e8ces Manquantes 2.jpeg",
  "/samples/french/odd one out/Trouve l'Intrus 1 answer-key.jpeg",
  "/samples/french/odd one out/Trouve l'Intrus 1.jpeg",
  "/samples/french/odd one out/Trouve l'Intrus 2.jpeg",
  '/samples/french/pattern train/Train Suites Logiques 1.webp',
  '/samples/french/pattern train/Train Suites Logiques 2.webp',
  '/samples/french/pattern train/Train Suites Logiques 3.webp',
  '/samples/french/pattern train/pattern_train_worksheet.webp',
  "/samples/french/pattern worksheet/S\u00e9quences Logiques 1.webp",
  "/samples/french/pattern worksheet/S\u00e9quences Logiques 2.webp",
  "/samples/french/pattern worksheet/S\u00e9quences Logiques 3.webp",
  "/samples/french/picture path/Parcours Images 1.webp",
  "/samples/french/picture sort/Tri Images 1.webp",
  "/samples/french/picture sort/Tri d'Images 1 answer_key.jpeg",
  "/samples/french/picture sort/Tri d'Images 1.jpeg",
  "/samples/french/picture sort/Tri d'Images 2.jpeg",
  "/samples/french/prepositions/Pr\u00e9positions 1.webp",
  "/samples/french/prepositions/Pr\u00e9positions 2.webp",
  "/samples/french/prepositions/Pr\u00e9positions 3.webp",
  '/samples/french/shadow match/Discrimination Visuelle 1.webp',
  "/samples/french/shadow match/Trouve l'Ombre 1 answer-key.jpeg",
  "/samples/french/shadow match/Trouve l'Ombre 1.jpeg",
  "/samples/french/shadow match/Trouve l'Ombre 2.jpeg",
  '/samples/french/subtraction/Soustraction Amusante 1.webp',
  '/samples/french/sudoku/Sudoku en Images 1 answer_key.jpeg',
  '/samples/french/sudoku/Sudoku en Images 1.jpeg',
  '/samples/french/sudoku/Sudoku en Images 2.jpeg',
  '/samples/french/sudoku/sudoku 1.webp',
  '/samples/french/sudoku/sudoku hard.webp',
  '/samples/french/sudoku/sudoku_easy.webp',
  "/samples/french/treasure hunt/Chasse au Tr\u00e9sor 1 answer_key.webp",
  "/samples/french/treasure hunt/Chasse au Tr\u00e9sor 1.webp",
  "/samples/french/treasure hunt/Chasse au Tr\u00e9sor 2.webp",
  '/samples/french/treasure hunt/Treasure Hunt 1.webp',
  '/samples/french/word guess/Deviner les Mots 1.webp',
  '/samples/french/word guess/Deviner les Mots 2.webp',
  '/samples/french/word guess/Deviner les Mots 3.webp',
  '/samples/french/word guess/clue-grid_worksheet.webp',
  '/samples/french/word scramble/Mots Melanges 1.webp',
  "/samples/french/word scramble/Mots M\u00e9lang\u00e9s 1.webp",
  "/samples/french/word scramble/Mots M\u00e9lang\u00e9s 2.webp",
  "/samples/french/word scramble/Mots M\u00e9lang\u00e9s 3.webp",
  "/samples/french/word scramble/Mots M\u00eal\u00e9s 1.webp",
  "/samples/french/wordsearch/Mots Cach\u00e9s 1.webp",
  "/samples/french/wordsearch/Mots Cach\u00e9s 2.webp",
  "/samples/french/wordsearch/Mots Cach\u00e9s 3.webp",
  '/samples/french/wordsearch/wordsearch landscape.webp',
  '/samples/french/wordsearch/wordsearch portrait.webp',
  "/samples/french/writing/\u00c9criture 1.webp",
  "/samples/french/writing/\u00c9criture 2.webp",
  "/samples/french/writing/\u00c9criture 3.webp",
];

console.log('=== BROKEN PATHS AND AFFECTED FILES ===');
for (const bp of brokenPaths) {
  const files = pathToFiles.get(bp) || [];
  if (files.length > 0) {
    console.log('\nBROKEN: ' + bp);
    files.forEach(f => console.log('  -> ' + f));
  }
}
