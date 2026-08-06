/**
 * Fix Italian guide/start content files that reference /samples/english/ paths.
 * Replaces with /samples/italian/ and maps English filenames to Italian equivalents.
 *
 * Affects: guide-content/it/, start-content/it/
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');
const DIRS = [
  path.join(BASE, 'guide-content', 'it'),
  path.join(BASE, 'start-content', 'it'),
];

// English filename → Italian filename mapping per folder
const FILE_MAP = {
  'addition': {
    'Addition Fun 1.webp': 'Addizione Divertente 1.webp',
    'addition_worksheet portrait.webp': 'Addizione Divertente 1.webp',
  },
  'alphabet train': {
    'Alphabet Train 1.webp': "Treno dell'Alfabeto 1.webp",
    'Alphabet Train 5.webp': "Treno dell'Alfabeto 4.webp",
    'Alphabet Train 10.webp': "Treno dell'Alfabeto 4.webp",
  },
  'big small': {
    'big-small-different images.webp': 'Grande o Piccolo 2.webp',
    'big-small-worksheet_worksheet.webp': 'Grande o Piccolo 1.webp',
  },
  'bingo': {
    'bingo_card.webp': 'tombola 1.webp',
  },
  'chart count': {
    'chart count.webp': 'Grafico con Immagini 1.webp',
    'chart count answer_key.webp': 'Grafico con Immagini 1 answer_key.webp',
    'Picture Graph 1.webp': 'Grafico con Immagini 1.webp',
    'Picture Graph 5.webp': 'Grafico con Immagini 4.webp',
  },
  'coloring': {
    'coloring portrait 1.webp': 'coloring portrait 1.webp',
    'coloring portrait 2.webp': 'coloring portrait 2.webp',
    'coloring portrait 3.webp': 'coloring portrait 3.webp',
    'coloring portrait 4.webp': 'coloring portrait 4.webp',
    'coloring portrait 5.webp': 'coloring portrait 5.webp',
  },
  'crossword': {
    'crossword_worksheet.webp': 'Cruciverba con Immagini 1.webp',
  },
  'cryptogram': {
    'cryptogram_worksheet.webp': 'Crittogramma Illustrato 1.webp',
    'cryptogram_worksheet (5).webp': 'Crittogramma Illustrato 5.webp',
    'cryptogram_answer_key.webp': 'Crittogramma Illustrato 1 answer_key.webp',
  },
  'draw and color': {
    'grid-drawing_worksheet.webp': 'Disegna e Colora 1.webp',
    'grid-drawing_worksheet (1).webp': 'Disegna e Colora 1.webp',
    'grid-drawing_worksheet (5).webp': 'Disegna e Colora 5.webp',
  },
  'find objects': {
    'spotworks_worksheet.webp': 'Trova gli Oggetti Nascosti 1.webp',
  },
  'matching': {
    'matching portrait.webp': 'Trova le Coppie 1.webp',
    'image and word.webp': 'Trova le Coppie 2.webp',
  },
  'math puzzle': {
    'Math Puzzles.webp': 'Rompicapi Matematici 1.webp',
    'Math Puzzles (1).webp': 'Rompicapi Matematici 1.webp',
    'Math Puzzles (5).webp': 'Rompicapi Matematici 5.webp',
  },
  'math worksheet': {
    'Math Worksheet 1.webp': 'Scheda di Matematica 1.webp',
    'Math Worksheet 10.webp': 'Scheda di Matematica 4.webp',
  },
  'missing pieces': {
    'Missing Pieces (1).webp': 'Pezzi Mancanti 1.webp',
    'Missing Pieces answer_key.webp': 'Pezzi Mancanti 1 answer_key.webp',
  },
  'odd one out': {
    'Find the Odd One Out (1).webp': 'Trova il Diverso 1.webp',
    'Find the Odd One Out answer-key.webp': 'Trova il Diverso 1 answer-key.webp',
  },
  'pattern worksheet': {
    'pattern_worksheet.webp': 'Puzzle di Schemi 1.webp',
  },
  'picture path': {
    'Picture Pathway.webp': 'Percorso di Immagini 1.webp',
  },
  'picture sort': {
    'Picture Sort (1).webp': 'Classificazione Immagini 1.webp',
    'Picture Sort answer_key.webp': 'Classificazione Immagini 1 answer_key.webp',
  },
  'prepositions': {
    'prepositions_worksheet (1).webp': 'Preposizioni 1.webp',
    'prepositions_worksheet (5).webp': 'Preposizioni 3.webp',
    'prepositions_worksheet (10).webp': 'Preposizioni 4.webp',
  },
  'shadow match': {
    'shadow-match-worksheet (1).webp': 'Abbina le Ombre 1.webp',
    'shadow-match-horizontal answer-key.webp': 'Abbina le Ombre 1 answer-key.webp',
  },
  'subtraction': {
    'Subtraction Fun 1.webp': 'Sottrazioni Divertenti 1.webp',
    'cross out.webp': 'Sottrazioni Divertenti 2.webp',
  },
  'sudoku': {
    'sudoku_worksheet.webp': 'Sudoku con Immagini 1.webp',
    'sudoku_easy.webp': 'Sudoku con Immagini 1.webp',
    'sudoku hard.webp': 'Sudoku con Immagini 3.webp',
  },
  'treasure hunt': {
    'Treasure Hunt 1.webp': 'Caccia al Tesoro 1.webp',
    'Treasure Hunt 1 answer_key.webp': 'Caccia al Tesoro 1 answer_key.webp',
    'north south.webp': 'Caccia al Tesoro 2.webp',
  },
  'word scramble': {
    'Word Scramble 1.webp': 'Lettere Mescolate 1.webp',
    'word scramble portrait.webp': 'Lettere Mescolate 1.webp',
  },
  'wordsearch': {
    'wordsearch portrait.webp': 'Cerca Parole 1.webp',
    'wordsearch landscape.webp': 'Cerca Parole 2.webp',
    'custom word list.webp': 'Cerca Parole 3.webp',
  },
  'writing': {
    'writing.webp': 'writing.webp',
  },
};

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;
let unmapped = [];

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) {
    console.log(`SKIP: ${dir} does not exist`);
    continue;
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    totalFiles++;
    const content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('/samples/english/')) continue;

    let updated = content;
    let count = 0;

    // Match /samples/english/{folder}/{filename} patterns
    updated = updated.replace(/\/samples\/english\/([^/'",}\n]+)\/([^'",}\n]+)/g, (match, folder, filename) => {
      const folderMap = FILE_MAP[folder];
      if (!folderMap) {
        // No mapping for this folder — just change english→italian, keep filename
        count++;
        return `/samples/italian/${folder}/${filename}`;
      }

      const italianFilename = folderMap[filename];
      if (italianFilename) {
        count++;
        return `/samples/italian/${folder}/${italianFilename}`;
      }

      // No specific mapping — keep filename, just change locale
      const key = `${folder}/${filename}`;
      if (!unmapped.includes(key)) unmapped.push(key);
      count++;
      return `/samples/italian/${folder}/${filename}`;
    });

    if (count > 0) {
      fs.writeFileSync(filePath, updated, 'utf8');
      modifiedFiles++;
      totalReplacements += count;
      console.log(`FIXED: ${path.relative(BASE, filePath)} (${count} paths remapped)`);
    }
  }
}

console.log(`\nDone: ${modifiedFiles}/${totalFiles} files modified, ${totalReplacements} paths remapped`);
if (unmapped.length > 0) {
  console.log(`\nWARNING: ${unmapped.length} paths had no specific Italian filename mapping (kept English filename):`);
  unmapped.forEach(p => console.log(`  ${p}`));
}
