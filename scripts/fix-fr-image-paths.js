const fs = require('fs');
const path = require('path');

const dir = 'frontend/config/app-content/fr';

// For each file, define [oldSubstring, newSubstring] pairs
// These match the EXACT text in the file (including JS escaping like \')
const fixes = {
  'addition.ts': [
    ['/addition/Additions 1.webp', '/addition/Addition Amusant 1.webp'],
    ['/addition/Additions 2.webp', '/addition/Addition Amusant 2.webp'],
    ['/addition/Additions 3.webp', '/addition/Addition Amusant 4.webp'],
  ],
  'alphabet-train.ts': [
    ["/alphabet train/Train Alphabet 1.webp", "/alphabet train/Train de l\\'Alphabet 1.webp"],
    ["/alphabet train/Train Alphabet 2.webp", "/alphabet train/Train de l\\'Alphabet 2.webp"],
    ["/alphabet train/Train Alphabet 3.webp", "/alphabet train/Train de l\\'Alphabet 3.webp"],
  ],
  'big-small.ts': [
    ['/big small/Grand Petit 1.webp', '/big small/Grand ou Petit 1.webp'],
    ['/big small/Grand Petit 2.webp', '/big small/Grand ou Petit 2.webp'],
    ['/big small/Grand Petit 3.webp', '/big small/Grand ou Petit 3.webp'],
  ],
  'bingo.ts': [
    ["/bingo/Bingo 1.webp", "/bingo/Loto d\\'Images 1.webp"],
    ["/bingo/Bingo 2.webp", "/bingo/Loto d\\'Images 2.webp"],
    ["/bingo/Bingo 3.webp", "/bingo/Loto d\\'Images 3.webp"],
  ],
  'chart-count.ts': [
    ['/chart count/Graphique Images 1.webp', '/chart count/worksheet.webp'],
    ['/chart count/Graphique Images 2.webp', '/chart count/worksheet (1).webp'],
    ['/chart count/Graphique Images 3.webp', '/chart count/worksheet (2).webp'],
  ],
  'code-addition.ts': [
    ['/code addition/Addition Cod\u00e9e 1.webp', '/code addition/Code Secret Addition 1.webp'],
    ['/code addition/Addition Cod\u00e9e 2.webp', '/code addition/Code Secret Addition 2.webp'],
    ['/code addition/Addition Cod\u00e9e 3.webp', '/code addition/Code Secret Addition 3.webp'],
  ],
  'coloring.ts': [
    ['/coloring/Coloriage 1.webp', '/coloring/coloring portrait 1.webp'],
    ['/coloring/Coloriage 2.webp', '/coloring/coloring portrait 2.webp'],
    ['/coloring/Coloriage 3.webp', '/coloring/coloring portrait 3.webp'],
  ],
  'crossword.ts': [
    ['/crossword/Mots Crois\u00e9s en Images 1.webp', '/crossword/Mots Crois%E9s en Images 1.webp'],
    ['/crossword/Mots Crois\u00e9s en Images 2.webp', '/crossword/Mots Crois%E9s en Images 2 .webp'],
    ['/crossword/Mots Crois\u00e9s en Images 1 answer_key.webp', '/crossword/Mots Crois%E9s en Images 1 answer_key.webp'],
  ],
  'cryptogram.ts': [
    ['/cryptogram/Cryptogramme 1.webp', '/cryptogram/Cryptogramme en Images 1.webp'],
    ['/cryptogram/Cryptogramme 2.webp', '/cryptogram/Cryptogramme en Images 2.webp'],
    ['/cryptogram/Cryptogramme 3.webp', '/cryptogram/Cryptogramme en Images 3.webp'],
  ],
  'draw-and-color.ts': [
    ['/draw and color/Dessin Quadrillage 1.webp', '/draw and color/Dessine et Colorie 1.webp'],
    ['/draw and color/Dessin Quadrillage 2.webp', '/draw and color/Dessine et Colorie 2.webp'],
    ['/draw and color/Dessin Quadrillage 3.webp', '/draw and color/Dessine et Colorie 3.webp'],
  ],
  'drawing-lines.ts': [
    ['/drawing lines/Graphisme 1.webp', '/drawing lines/Pratique de Tracer des Lignes 1.webp'],
    ['/drawing lines/Graphisme 2.webp', '/drawing lines/Pratique de Tracer des Lignes 2.webp'],
    ['/drawing lines/Graphisme 3.webp', '/drawing lines/Pratique de Tracer des Lignes 3.webp'],
  ],
  'math-worksheet.ts': [
    ['/math worksheet/Exercices Maths 1.webp', '/math worksheet/Feuille de Math%E9matique 1.webp'],
    ['/math worksheet/Exercices Maths 2.webp', '/math worksheet/Feuille de Math%E9matique 2.webp'],
    ['/math worksheet/Exercices Maths 3.webp', '/math worksheet/Feuille de Math%E9matique 3.webp'],
  ],
  'missing-pieces.ts': [
    ['/missing pieces/Pi\u00e8ces Manquantes 1.jpeg', '/missing pieces/Pi%E8ces Manquantes 1.webp'],
    ['/missing pieces/Pi\u00e8ces Manquantes 2.jpeg', '/missing pieces/Pi%E8ces Manquantes 2.webp'],
    ['/missing pieces/Pi\u00e8ces Manquantes 1 answer_key.jpeg', '/missing pieces/Pi%E8ces Manquantes 1 answer_key.webp'],
  ],
  'odd-one-out.ts': [
    ['/samples/english/odd one out/Find the Odd One Out.webp', "/samples/french/odd one out/Trouve l\\'Intrus 1.webp"],
    ['/samples/english/odd one out/Find the Odd One Out (1).webp', "/samples/french/odd one out/Trouve l\\'Intrus 1.webp"],
    ['/samples/english/odd one out/Find the Odd One Out (5).webp', "/samples/french/odd one out/Trouve l\\'Intrus 2.webp"],
    ['/samples/english/odd one out/Find the Odd One Out answer-key.webp', "/samples/french/odd one out/Trouve l\\'Intrus 1 answer-key.webp"],
  ],
  'pattern-train.ts': [
    ['/pattern train/Train Suites Logiques 1.webp', '/pattern train/Train %E0 Motifs 1.webp'],
    ['/pattern train/Train Suites Logiques 2.webp', '/pattern train/Train %E0 Motifs 2.webp'],
    ['/pattern train/Train Suites Logiques 3.webp', '/pattern train/Train %E0 Motifs 3.webp'],
  ],
  'pattern-worksheet.ts': [
    ['/pattern worksheet/S\u00e9quences Logiques 1.webp', '/pattern worksheet/Puzzles de Motifs 1.webp'],
    ['/pattern worksheet/S\u00e9quences Logiques 2.webp', '/pattern worksheet/Puzzles de Motifs 2.webp'],
    ['/pattern worksheet/S\u00e9quences Logiques 3.webp', '/pattern worksheet/Puzzles de Motifs 3.webp'],
  ],
  'picture-sort.ts': [
    ["/picture sort/Tri d\\'Images 1.jpeg", "/picture sort/Tri d\\'Images 1.webp"],
    ["/picture sort/Tri d\\'Images 2.jpeg", "/picture sort/Tri d\\'Images 2.webp"],
    ["/picture sort/Tri d\\'Images 1 answer_key.jpeg", "/picture sort/Tri d\\'Images 1 answer_key.webp"],
  ],
  'prepositions.ts': [
    ['/prepositions/Pr\u00e9positions 1.webp', '/prepositions/Pr%E9positions 1.webp'],
    ['/prepositions/Pr\u00e9positions 2.webp', '/prepositions/Pr%E9positions 2.webp'],
    ['/prepositions/Pr\u00e9positions 3.webp', '/prepositions/Pr%E9positions 3.webp'],
  ],
  'shadow-match.ts': [
    ["/shadow match/Trouve l\\'Ombre 1.jpeg", "/shadow match/Trouve l\\'Ombre 1.webp"],
    ["/shadow match/Trouve l\\'Ombre 2.jpeg", "/shadow match/Trouve l\\'Ombre 2.webp"],
    ["/shadow match/Trouve l\\'Ombre 1 answer-key.jpeg", "/shadow match/Trouve l\\'Ombre 1 answer-key.webp"],
  ],
  'subtraction.ts': [
    ['/subtraction/Soustractions 1.webp', '/subtraction/Soustractions Amusantes 1.webp'],
    ['/subtraction/Soustractions 2.webp', '/subtraction/Soustractions Amusantes 2.webp'],
    ['/subtraction/Soustractions 3.webp', '/subtraction/Soustractions Amusantes 3.webp'],
  ],
  'sudoku.ts': [
    ['/sudoku/Sudoku en Images 1.jpeg', '/sudoku/Sudoku en Images 1.webp'],
    ['/sudoku/Sudoku en Images 2.jpeg', '/sudoku/Sudoku en Images 2.webp'],
    ['/sudoku/Sudoku en Images 1 answer_key.jpeg', '/sudoku/Sudoku en Images 1 answer_key.webp'],
  ],
  'treasure-hunt.ts': [
    ['/treasure hunt/Chasse au Tr\u00e9sor 1.webp', '/treasure hunt/Chasse au Tr%E9sor 1.webp'],
    ['/treasure hunt/Chasse au Tr\u00e9sor 2.webp', '/treasure hunt/Chasse au Tr%E9sor 2.webp'],
    ['/treasure hunt/Chasse au Tr\u00e9sor 1 answer_key.webp', '/treasure hunt/Chasse au Tr%E9sor 1 answer_key.webp'],
  ],
  'word-guess.ts': [
    ['/word guess/Deviner les Mots 1.webp', '/word guess/Devine le Mot 1.webp'],
    ['/word guess/Deviner les Mots 2.webp', '/word guess/Devine le Mot 2.webp'],
    ['/word guess/Deviner les Mots 3.webp', '/word guess/Devine le Mot 3.webp'],
  ],
  'word-scramble.ts': [
    ['/word scramble/Mots M\u00e9lang\u00e9s 1.webp', '/word scramble/Mots M%EAl%E9s 1.webp'],
    ['/word scramble/Mots M\u00e9lang\u00e9s 2.webp', '/word scramble/Mots M%EAl%E9s 2.webp'],
    ['/word scramble/Mots M\u00e9lang\u00e9s 3.webp', '/word scramble/Mots M%EAl%E9s 3.webp'],
  ],
  'word-search.ts': [
    ['/wordsearch/Mots Cach\u00e9s 1.webp', '/wordsearch/Mots Caches 1.webp'],
    ['/wordsearch/Mots Cach\u00e9s 2.webp', '/wordsearch/Mots Cach%E9s 2.webp'],
    ['/wordsearch/Mots Cach\u00e9s 3.webp', '/wordsearch/Mots Cach%E9s 3.webp'],
  ],
  'writing.ts': [
    ['/writing/\u00c9criture 1.webp', '/writing/writing beginning letter.webp'],
    ['/writing/\u00c9criture 2.webp', '/writing/writing custom.webp'],
    ['/writing/\u00c9criture 3.webp', '/writing/writing.webp'],
  ],
};

let totalChanges = 0;
let filesChanged = 0;
const warnings = [];

for (const [filename, replacements] of Object.entries(fixes)) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [oldStr, newStr] of replacements) {
    if (content.includes(oldStr)) {
      const count = content.split(oldStr).length - 1;
      content = content.split(oldStr).join(newStr);
      console.log('  ' + filename + ': ' + count + 'x replaced');
      totalChanges += count;
      changed = true;
    } else {
      warnings.push(filename + ': NOT FOUND: "' + oldStr + '"');
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesChanged++;
  }
}

console.log('\nDone: ' + totalChanges + ' replacements across ' + filesChanged + ' files');
if (warnings.length > 0) {
  console.log('\nWARNINGS:');
  warnings.forEach(w => console.log('  ' + w));
}
