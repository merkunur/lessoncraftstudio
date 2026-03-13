/**
 * french-showcase-images.ts — French image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available French sample image filenames.
 * Used by showcase-configs.ts for French locale showcase sections.
 *
 * Files live at /samples/french/{folder}/{filename}
 *
 * NOTE: Some files on the server use Latin-1 encoding for accented characters.
 * This config uses correct UTF-8 characters. Files with encoding mismatches
 * will need server-side renaming to display correctly.
 */

export interface FrenchImageSet {
  folder: string;
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const frenchImages: Record<string, FrenchImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'Addition Amusant 1.webp',
      'Addition Amusant 2.webp',
      'Addition Amusant 3 .webp',
      'Addition Amusant 4.webp',
      'addition_worksheet.webp',
      'Addition Amusant 1.webp',
    ],
    answerKey: 'addition_answer_key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'Soustractions Amusantes 1.webp',
      'Soustractions Amusantes 2.webp',
      'Soustractions Amusantes 3.webp',
      'Soustractions Amusantes 4.webp',
      'worksheet.webp',
      'Soustractions Amusantes 1.webp',
    ],
    answerKey: 'answer_key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'Code Secret Addition 1.webp',
      'Code Secret Addition 2.webp',
      'Code Secret Addition 3.webp',
      'Code Secret Addition 4.webp',
      'image_addition_worksheet.webp',
      'Code Secret Addition 1.webp',
    ],
    answerKey: 'image_addition_answer_key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'Plus Moins 1.webp',
      'Plus Moins 2.webp',
      'Plus Moins 3.webp',
      'Plus Moins 4.webp',
      'worksheet.webp',
      'Plus Moins 1.webp',
    ],
    answerKey: 'answer_key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'worksheet.webp',
      'worksheet (1).webp',
      'answer_key.webp',
      'answer_key (1).webp',
      'worksheet.webp',
      'worksheet (1).webp',
    ],
    answerKey: 'answer_key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'worksheet.webp',
      'answer_key.webp',
      'worksheet.webp',
      'answer_key.webp',
      'worksheet.webp',
      'answer_key.webp',
    ],
    answerKey: 'answer_key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      "Train de l'Alphabet 1.webp",
      "Train de l'Alphabet 2.webp",
      "Train de l'Alphabet 3.webp",
      "Train de l'Alphabet 4.webp",
      'worksheet.webp',
      "Train de l'Alphabet 1.webp",
    ],
    answerKey: 'answer_key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'prepositions_worksheet.webp',
      'prepositions_answer_key.webp',
      'prepositions_worksheet.webp',
      'prepositions_answer_key.webp',
      'prepositions_worksheet.webp',
      'prepositions_answer_key.webp',
    ],
    answerKey: 'prepositions_answer_key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'Devine le Mot 1.webp',
      'Devine le Mot 2.webp',
      'Devine le Mot 3.webp',
      'Devine le Mot 4.webp',
      'Devine le Mot 5.webp',
      'Devine le Mot 1.webp',
    ],
    answerKey: 'Devine le Mot 1 answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'word-scramble_worksheet.webp',
      'word-scramble_answer-key.webp',
      'word-scramble_worksheet.webp',
      'word-scramble_answer-key.webp',
      'word-scramble_worksheet.webp',
      'word-scramble_answer-key.webp',
    ],
    answerKey: 'word-scramble_answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'Mots Caches 1.webp',
      'worksheet.webp',
      'Mots Caches 1.webp',
      'worksheet.webp',
      'Mots Caches 1.webp',
      'worksheet.webp',
    ],
    answerKey: 'answer_key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'Cryptogramme en Images 1.webp',
      'Cryptogramme en Images 2.webp',
      'Cryptogramme en Images 3.webp',
      'Cryptogramme en Images 4.webp',
      'Cryptogramme en Images 5.webp',
      'Cryptogramme en Images 1.webp',
    ],
    answerKey: 'Cryptogramme en Images 1 answer_key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'crossword_worksheet.webp',
      'crossword_answer_key.webp',
      'crossword_worksheet.webp',
      'crossword_answer_key.webp',
      'crossword_worksheet.webp',
      'crossword_answer_key.webp',
    ],
    answerKey: 'crossword_answer_key.webp',
  },
  writing: {
    folder: 'writing',
    imgs: [
      'writing.webp',
      'writing beginning letter.webp',
      'writing custom.webp',
      'writing.webp',
      'writing beginning letter.webp',
      'writing custom.webp',
    ],
    answerKey: 'writing.webp',
  },
  'big-small': {
    folder: 'big small',
    imgs: [
      'Grand ou Petit 1.webp',
      'Grand ou Petit 2.webp',
      'Grand ou Petit 3.webp',
      'Grand ou Petit 4.webp',
      'big-small-worksheet_worksheet.webp',
      'Grand ou Petit 1.webp',
    ],
    answerKey: 'big-small-worksheet_answer_key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'Train à Motifs 1.webp',
      'Train à Motifs 2.webp',
      'Train à Motifs 3.webp',
      'Train à Motifs 4.webp',
      'Train à Motifs 5.webp',
      'Train à Motifs 1.webp',
    ],
    answerKey: 'Train à Motifs 2 answer_key (2).webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'Puzzles de Motifs 1.webp',
      'Puzzles de Motifs 2.webp',
      'Puzzles de Motifs 3.webp',
      'Puzzles de Motifs 4.webp',
      'pattern_worksheet.webp',
      'Puzzles de Motifs 1.webp',
    ],
    answerKey: 'pattern_answer_key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Dessine et Colorie 1.webp',
      'Dessine et Colorie 2.webp',
      'Dessine et Colorie 3.webp',
      'Dessine et Colorie 4.webp',
      'Dessine et Colorie 5.webp',
      'Dessine et Colorie 6.webp',
    ],
    answerKey: 'Dessine et Colorie 1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'Pratique de Tracer des Lignes 1.webp',
      'Pratique de Tracer des Lignes 2.webp',
      'Pratique de Tracer des Lignes 3.webp',
      'Pratique de Tracer des Lignes 4.webp',
      'Pratique de Tracer des Lignes 5.webp',
      'Pratique de Tracer des Lignes 6.webp',
    ],
    answerKey: 'Pratique de Tracer des Lignes 1.webp',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring portrait 1.webp',
      'coloring portrait 2.webp',
      'coloring portrait 3.webp',
      'coloring portrait 4.webp',
      'coloring portrait 5.webp',
      'coloring portrait 6.webp',
    ],
    answerKey: 'coloring portrait 1.webp',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'worksheet.webp',
      'worksheet (1).webp',
      'worksheet (2).webp',
      'worksheet (3).webp',
      'worksheet (4).webp',
      'worksheet.webp',
    ],
    answerKey: 'answer_key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Trouve les Paires 1.webp',
      'Trouve les Paires 2.webp',
      'Trouve les Paires 3.webp',
      'Trouve les Paires 4.webp',
      'worksheet.webp',
      'Trouve les Paires 1.webp',
    ],
    answerKey: 'answer_key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Puzzle Grille 1.webp',
      'Puzzle Grille 2.webp',
      'Puzzle Grille 3.webp',
      'Puzzle Grille 4.webp',
      'Puzzle Grille 5.webp',
      'Puzzle Grille 1.webp',
    ],
    answerKey: 'Puzzle Grille 1 answer_key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      "Trouve l'Ombre 1.webp",
      "Trouve l'Ombre 2.webp",
      "Trouve l'Ombre 3.webp",
      "Trouve l'Ombre 4.webp",
      'shadow-match-worksheet.webp',
      'shadow-match-worksheet.webp',
    ],
    answerKey: 'shadow-match-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      "Loto d'Images 1.webp",
      "Loto d'Images 2.webp",
      "Loto d'Images 3.webp",
      "Loto d'Images 4.webp",
      'bingo_cards.webp',
      'callout.webp',
    ],
    answerKey: "Loto d'Images 1 callout.webp",
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      "Tri d'Images 1.webp",
      "Tri d'Images 2.webp",
      "Tri d'Images 3.webp",
      "Tri d'Images 4.webp",
      "Tri d'Images 1.webp",
      "Tri d'Images 2.webp",
    ],
    answerKey: "Tri d'Images 1 answer_key.webp",
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'worksheet.webp',
      'answer_key.webp',
      'worksheet.webp',
      'answer_key.webp',
      'worksheet.webp',
      'answer_key.webp',
    ],
    answerKey: 'answer_key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      "Trouve l'Intrus 1.webp",
      "Trouve l'Intrus 2.webp",
      "Trouve l'Intrus 3.webp",
      "Trouve l'Intrus 4.webp",
      'worksheet.webp',
      "Trouve l'Intrus 1.webp",
    ],
    answerKey: 'answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'Sudoku en Images 1.webp',
      'Sudoku en Images 2.webp',
      'Sudoku en Images 3.webp',
      'Sudoku en Images 4.webp',
      'sudoku_worksheet.webp',
      'Sudoku en Images 1.webp',
    ],
    answerKey: 'sudoku_answer_key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      "Chemin d'Images 1.webp",
      "Chemin d'Images 2.webp",
      "Chemin d'Images 3.webp",
      "Chemin d'Images 4.webp",
      'worksheet.webp',
      "Chemin d'Images 1.webp",
    ],
    answerKey: 'answer_key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'Je vois, je voi 1.webp',
      'Je vois, je voi 2.webp',
      'Je vois, je voi 3.webp',
      'Je vois, je voi 4.webp',
      'worksheet.webp',
      'Je vois, je voi 1.webp',
    ],
    answerKey: 'answer_key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      "Trouve l'Intrus 1.webp",
      "Trouve l'Intrus 2.webp",
      "Trouve l'Intrus 3.webp",
      "Trouve l'Intrus (1).webp",
      "Trouve l'Intrus (2).webp",
      "Trouve l'Intrus.webp",
    ],
    answerKey: "Trouve l'Intrus 1 answer_key.webp",
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'worksheet.webp',
      'answer_key.webp',
      'worksheet.webp',
      'answer_key.webp',
      'worksheet.webp',
      'answer_key.webp',
    ],
    answerKey: 'answer_key.webp',
  },
};
