const fs = require('fs');
const path = require('path');

// All broken → correct filename replacements
// These target the filename portion after /samples/french/<app>/
const replacements = [
  // addition
  ['Additions 1.webp', 'Addition Amusant 1.webp'],
  ['Additions 2.webp', 'Addition Amusant 2.webp'],
  ['Additions 3.webp', 'Addition Amusant 4.webp'],
  ['Addition Fun 1.webp', 'Addition Amusant 1.webp'],
  ['Addition Amusante 1.webp', 'Addition Amusant 1.webp'],
  ['Additions Amusantes 1.webp', 'Addition Amusant 1.webp'],
  ['addition_worksheet portrait.webp', 'Addition Amusant 1.webp'],

  // alphabet-train
  ['Train Alphabet 1.webp', "Train de l'Alphabet 1.webp"],
  ['Train Alphabet 2.webp', "Train de l'Alphabet 2.webp"],
  ['Train Alphabet 3.webp', "Train de l'Alphabet 3.webp"],
  ['Alphabet Train 1.webp', "Train de l'Alphabet 1.webp"],

  // big-small
  ['Grand Petit 1.webp', 'Grand ou Petit 1.webp'],
  ['Grand Petit 2.webp', 'Grand ou Petit 2.webp'],
  ['Grand Petit 3.webp', 'Grand ou Petit 3.webp'],

  // bingo
  ['Bingo Images 1.webp', "Loto d'Images 1.webp"],
  ['bingo_card.webp', "Loto d'Images 1.webp"],
  ['Bingo 1.webp', "Loto d'Images 1.webp"],
  ['Bingo 2.webp', "Loto d'Images 2.webp"],
  ['Bingo 3.webp', "Loto d'Images 3.webp"],

  // chart-count
  ['Graphique Images 1.webp', 'worksheet.webp'],
  ['Graphique Images 2.webp', 'worksheet (1).webp'],
  ['Graphique Images 3.webp', 'worksheet (2).webp'],
  ['chart count.webp', 'worksheet.webp'],

  // code-addition
  ['Addition Cod\u00e9e 1.webp', 'Code Secret Addition 1.webp'],
  ['Addition Cod\u00e9e 2.webp', 'Code Secret Addition 2.webp'],
  ['Addition Cod\u00e9e 3.webp', 'Code Secret Addition 3.webp'],

  // coloring
  ['coloriage portrait 1.webp', 'coloring portrait 1.webp'],
  ['Coloriage 1.webp', 'coloring portrait 1.webp'],
  ['Coloriage 2.webp', 'coloring portrait 2.webp'],
  ['Coloriage 3.webp', 'coloring portrait 3.webp'],

  // crossword — Latin-1 encoded
  ['crossword_worksheet.webp', 'Mots Crois%E9s en Images 1.webp'],
  // UTF-8 é → Latin-1 %E9 (handle the 2-image case with trailing space)
  ['Mots Crois\u00e9s en Images 2.webp', 'Mots Crois%E9s en Images 2 .webp'],
  ['Mots Crois\u00e9s en Images 1 answer_key.webp', 'Mots Crois%E9s en Images 1 answer_key.webp'],
  ['Mots Crois\u00e9s en Images 1.webp', 'Mots Crois%E9s en Images 1.webp'],

  // cryptogram
  ['Cryptogramme 1.webp', 'Cryptogramme en Images 1.webp'],
  ['Cryptogramme 2.webp', 'Cryptogramme en Images 2.webp'],
  ['Cryptogramme 3.webp', 'Cryptogramme en Images 3.webp'],

  // draw-and-color
  ['dessin quadrillage 1.webp', 'Dessine et Colorie 1.webp'],
  ['grid-drawing_worksheet.webp', 'Dessine et Colorie 1.webp'],
  ['Dessin Quadrillage 1.webp', 'Dessine et Colorie 1.webp'],
  ['Dessin Quadrillage 2.webp', 'Dessine et Colorie 2.webp'],
  ['Dessin Quadrillage 3.webp', 'Dessine et Colorie 3.webp'],

  // drawing-lines
  ['drawing_lines_horizontal.webp', 'Pratique de Tracer des Lignes 1.webp'],
  ['Graphisme 1.webp', 'Pratique de Tracer des Lignes 1.webp'],
  ['Graphisme 2.webp', 'Pratique de Tracer des Lignes 2.webp'],
  ['Graphisme 3.webp', 'Pratique de Tracer des Lignes 3.webp'],

  // find-and-count
  ['find and count portrait.webp', 'Je vois, je voi 1.webp'],

  // find-objects
  ['spotworks_worksheet.webp', "Trouve l'Intrus 1.webp"],

  // matching
  ['Association 1.webp', 'Trouve les Paires 1.webp'],
  ["Jeu d Association 1.webp", 'Trouve les Paires 1.webp'],
  ['Relier les Paires 1.webp', 'Trouve les Paires 1.webp'],
  ['Trouver les Paires 1.webp', 'Trouve les Paires 1.webp'],
  ['matching portrait.webp', 'Trouve les Paires 1.webp'],

  // math-puzzle — file 1 stays UTF-8, files 2/3 need Latin-1
  ['Puzzle Maths 1.webp', 'Casse-T\u00eates Math\u00e9matiques 1.webp'],
  ['Casse-T\u00eates Math\u00e9matiques 2.webp', 'Casse-T%EAtes Math%E9matiques 2.webp'],
  ['Casse-T\u00eates Math\u00e9matiques 3.webp', 'Casse-T%EAtes Math%E9matiques 3.webp'],

  // math-worksheet — Latin-1 encoded
  ['Math Worksheet 10.webp', 'Feuille de Math%E9matique 1.webp'],
  ['Exercice Maths 1.webp', 'Feuille de Math%E9matique 1.webp'],
  ['Exercices Maths 1.webp', 'Feuille de Math%E9matique 1.webp'],
  ['Exercices Maths 2.webp', 'Feuille de Math%E9matique 2.webp'],
  ['Exercices Maths 3.webp', 'Feuille de Math%E9matique 3.webp'],
  ['Feuille de Math\u00e9matique 1.webp', 'Feuille de Math%E9matique 1.webp'],
  ['Feuille de Math\u00e9matique 2.webp', 'Feuille de Math%E9matique 2.webp'],
  ['Feuille de Math\u00e9matique 3.webp', 'Feuille de Math%E9matique 3.webp'],

  // missing-pieces — Latin-1 + extension fix
  ['Pi\u00e8ces Manquantes 1.jpeg', 'Pi%E8ces Manquantes 1.webp'],
  ['Pi\u00e8ces Manquantes 2.jpeg', 'Pi%E8ces Manquantes 2.webp'],
  ['Pi\u00e8ces Manquantes 1 answer_key.jpeg', 'Pi%E8ces Manquantes 1 answer_key.webp'],
  ['Pi\u00e8ces Manquantes 1.webp', 'Pi%E8ces Manquantes 1.webp'],
  ['Pi\u00e8ces Manquantes 2.webp', 'Pi%E8ces Manquantes 2.webp'],

  // odd-one-out — apostrophe + extension fix
  ["Trouve l'Intrus 1.jpeg", "Trouve l'Intrus 1.webp"],
  ["Trouve l'Intrus 2.jpeg", "Trouve l'Intrus 2.webp"],
  ["Trouve l'Intrus 1 answer-key.jpeg", "Trouve l'Intrus 1 answer-key.webp"],

  // pattern-train — Latin-1
  ['pattern_train_worksheet.webp', 'Train %E0 Motifs 1.webp'],
  ['Train Suites Logiques 1.webp', 'Train %E0 Motifs 1.webp'],
  ['Train Suites Logiques 2.webp', 'Train %E0 Motifs 2.webp'],
  ['Train Suites Logiques 3.webp', 'Train %E0 Motifs 3.webp'],

  // pattern-worksheet
  ['pattern_worksheet.webp', 'Puzzles de Motifs 1.webp'],
  ['S\u00e9quences Logiques 1.webp', 'Puzzles de Motifs 1.webp'],
  ['S\u00e9quences Logiques 2.webp', 'Puzzles de Motifs 2.webp'],
  ['S\u00e9quences Logiques 3.webp', 'Puzzles de Motifs 3.webp'],

  // picture-path
  ['Parcours Images 1.webp', "Chemin d'Images 1.webp"],

  // picture-sort — apostrophe + extension fix
  ['Tri Images 1.webp', "Tri d'Images 1.webp"],
  ["Tri d'Images 1.jpeg", "Tri d'Images 1.webp"],
  ["Tri d'Images 2.jpeg", "Tri d'Images 2.webp"],
  ["Tri d'Images 1 answer_key.jpeg", "Tri d'Images 1 answer_key.webp"],

  // prepositions — Latin-1
  ['prepositions_worksheet.webp', 'Pr%E9positions 1.webp'],
  ['Pr\u00e9positions 1.webp', 'Pr%E9positions 1.webp'],
  ['Pr\u00e9positions 2.webp', 'Pr%E9positions 2.webp'],
  ['Pr\u00e9positions 3.webp', 'Pr%E9positions 3.webp'],

  // shadow-match — apostrophe + extension fix
  ['Discrimination Visuelle 1.webp', "Trouve l'Ombre 1.webp"],
  ["Trouve l'Ombre 1.jpeg", "Trouve l'Ombre 1.webp"],
  ["Trouve l'Ombre 2.jpeg", "Trouve l'Ombre 2.webp"],
  ["Trouve l'Ombre 1 answer-key.jpeg", "Trouve l'Ombre 1 answer-key.webp"],

  // subtraction
  ['Soustraction Amusante 1.webp', 'Soustractions Amusantes 1.webp'],

  // sudoku — extension fix
  ['sudoku_easy.webp', 'Sudoku en Images 1.webp'],
  ['sudoku 1.webp', 'Sudoku en Images 1.webp'],
  ['sudoku hard.webp', 'Sudoku en Images 2.webp'],
  ['Sudoku en Images 1.jpeg', 'Sudoku en Images 1.webp'],
  ['Sudoku en Images 2.jpeg', 'Sudoku en Images 2.webp'],
  ['Sudoku en Images 1 answer_key.jpeg', 'Sudoku en Images 1 answer_key.webp'],

  // treasure-hunt — Latin-1
  ['Treasure Hunt 1.webp', 'Chasse au Tr%E9sor 1.webp'],
  ['Chasse au Tr\u00e9sor 1.webp', 'Chasse au Tr%E9sor 1.webp'],
  ['Chasse au Tr\u00e9sor 2.webp', 'Chasse au Tr%E9sor 2.webp'],
  ['Chasse au Tr\u00e9sor 1 answer_key.webp', 'Chasse au Tr%E9sor 1 answer_key.webp'],

  // word-guess
  ['clue-grid_worksheet.webp', 'Devine le Mot 1.webp'],
  ['Deviner les Mots 1.webp', 'Devine le Mot 1.webp'],
  ['Deviner les Mots 2.webp', 'Devine le Mot 2.webp'],
  ['Deviner les Mots 3.webp', 'Devine le Mot 3.webp'],

  // word-scramble — Latin-1
  ['Mots Melanges 1.webp', 'Mots M%EAl%E9s 1.webp'],
  ['Mots M\u00eal\u00e9s 1.webp', 'Mots M%EAl%E9s 1.webp'],
  ['Mots M\u00eal\u00e9s 2.webp', 'Mots M%EAl%E9s 2.webp'],
  ['Mots M\u00eal\u00e9s 3.webp', 'Mots M%EAl%E9s 3.webp'],
  ['Mots M\u00e9lang\u00e9s 1.webp', 'Mots M%EAl%E9s 1.webp'],
  ['Mots M\u00e9lang\u00e9s 2.webp', 'Mots M%EAl%E9s 2.webp'],
  ['Mots M\u00e9lang\u00e9s 3.webp', 'Mots M%EAl%E9s 3.webp'],

  // wordsearch — mixed encoding
  ['wordsearch landscape.webp', 'Mots Caches 1.webp'],
  ['wordsearch portrait.webp', 'Mots Caches 1.webp'],
  ['Mots Cach\u00e9s 1.webp', 'Mots Caches 1.webp'],
  ['Mots Cach\u00e9s 2.webp', 'Mots Cach%E9s 2.webp'],
  ['Mots Cach\u00e9s 3.webp', 'Mots Cach%E9s 3.webp'],

  // writing
  ['\u00c9criture 1.webp', 'writing beginning letter.webp'],
  ['\u00c9criture 2.webp', 'writing custom.webp'],
  ['\u00c9criture 3.webp', 'writing.webp'],
];

// Directories to scan
const baseDirs = [
  'frontend/config/app-content/fr',
  'frontend/config/tool-content/fr',
  'frontend/config/guide-content/fr',
  'frontend/config/start-content/fr',
  'frontend/config/bundle-content/fr',
];

let totalFixed = 0;
let filesModified = 0;

for (const dir of baseDirs) {
  const fullDir = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) {
    console.log(`SKIP: ${dir} does not exist`);
    continue;
  }

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    let fixCount = 0;

    for (const [broken, correct] of replacements) {
      // Count occurrences before replacing
      let idx = 0;
      while ((idx = content.indexOf(broken, idx)) !== -1) {
        // Make sure we're not replacing something already correct
        // (e.g., don't replace "Addition Amusant 1.webp" when it's already right)
        if (broken !== correct) {
          fixCount++;
        }
        idx += broken.length;
      }
      if (broken !== correct) {
        content = content.split(broken).join(correct);
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`FIXED ${dir}/${file}: ${fixCount} replacements`);
      totalFixed += fixCount;
      filesModified++;
    }
  }
}

console.log(`\nDone: ${totalFixed} replacements across ${filesModified} files`);
