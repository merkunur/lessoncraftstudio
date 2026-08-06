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
      'addition-amusant-1.webp',
      'addition-amusant-2.webp',
      'addition-amusant-3.webp',
      'addition-amusant-4.webp',
      'addition-worksheet.webp',
      'addition-amusant-1.webp',
    ],
    answerKey: 'addition-answer-key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'soustractions-amusantes-1.webp',
      'soustractions-amusantes-2.webp',
      'soustractions-amusantes-3.webp',
      'soustractions-amusantes-4.webp',
      'worksheet.webp',
      'soustractions-amusantes-1.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'code-secret-addition-1.webp',
      'code-secret-addition-2.webp',
      'code-secret-addition-3.webp',
      'code-secret-addition-4.webp',
      'image-addition-worksheet.webp',
      'code-secret-addition-1.webp',
    ],
    answerKey: 'image-addition-answer-key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'plus-moins-1.webp',
      'plus-moins-2.webp',
      'plus-moins-3.webp',
      'plus-moins-4.webp',
      'worksheet.webp',
      'plus-moins-1.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'worksheet.webp',
      'worksheet-1.webp',
      'answer-key.webp',
      'answer-key-1.webp',
      'worksheet.webp',
      'worksheet-1.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'worksheet.webp',
      'answer-key.webp',
      'worksheet.webp',
      'answer-key.webp',
      'worksheet.webp',
      'answer-key.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      "train-de-l'alphabet-1.webp",
      "train-de-l'alphabet-2.webp",
      "train-de-l'alphabet-3.webp",
      "train-de-l'alphabet-4.webp",
      'worksheet.webp',
      "train-de-l'alphabet-1.webp",
    ],
    answerKey: 'answer-key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'prepositions-worksheet.webp',
      'prepositions-answer-key.webp',
      'prepositions-worksheet.webp',
      'prepositions-answer-key.webp',
      'prepositions-worksheet.webp',
      'prepositions-answer-key.webp',
    ],
    answerKey: 'prepositions-answer-key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'devine-le-mot-1.webp',
      'devine-le-mot-2.webp',
      'devine-le-mot-3.webp',
      'devine-le-mot-4.webp',
      'devine-le-mot-5.webp',
      'devine-le-mot-1.webp',
    ],
    answerKey: 'devine-le-mot-1-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'word-scramble-worksheet.webp',
      'word-scramble-answer-key.webp',
      'word-scramble-worksheet.webp',
      'word-scramble-answer-key.webp',
      'word-scramble-worksheet.webp',
      'word-scramble-answer-key.webp',
    ],
    answerKey: 'word-scramble-answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'mots-caches-1.webp',
      'worksheet.webp',
      'mots-caches-1.webp',
      'worksheet.webp',
      'mots-caches-1.webp',
      'worksheet.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'cryptogramme-en-images-1.webp',
      'cryptogramme-en-images-2.webp',
      'cryptogramme-en-images-3.webp',
      'cryptogramme-en-images-4.webp',
      'cryptogramme-en-images-5.webp',
      'cryptogramme-en-images-1.webp',
    ],
    answerKey: 'cryptogramme-en-images-1-answer-key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'crossword-worksheet.webp',
      'crossword-answer-key.webp',
      'crossword-worksheet.webp',
      'crossword-answer-key.webp',
      'crossword-worksheet.webp',
      'crossword-answer-key.webp',
    ],
    answerKey: 'crossword-answer-key.webp',
  },
  writing: {
    folder: 'writing',
    imgs: [
      'writing.webp',
      'writing-beginning-letter.webp',
      'writing-custom.webp',
      'writing.webp',
      'writing-beginning-letter.webp',
      'writing-custom.webp',
    ],
    answerKey: 'writing.webp',
  },
  'big-small': {
    folder: 'big small',
    imgs: [
      'grand-ou-petit-1.webp',
      'grand-ou-petit-2.webp',
      'grand-ou-petit-3.webp',
      'grand-ou-petit-4.webp',
      'big-small-worksheet-worksheet.webp',
      'grand-ou-petit-1.webp',
    ],
    answerKey: 'big-small-worksheet-answer-key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'train-à-motifs-1.webp',
      'train-à-motifs-2.webp',
      'train-à-motifs-3.webp',
      'train-à-motifs-4.webp',
      'train-à-motifs-5.webp',
      'train-à-motifs-1.webp',
    ],
    answerKey: 'train-à-motifs-2-answer-key-2.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'puzzles-de-motifs-1.webp',
      'puzzles-de-motifs-2.webp',
      'puzzles-de-motifs-3.webp',
      'puzzles-de-motifs-4.webp',
      'pattern-worksheet.webp',
      'puzzles-de-motifs-1.webp',
    ],
    answerKey: 'pattern-answer-key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'dessine-et-colorie-1.webp',
      'dessine-et-colorie-2.webp',
      'dessine-et-colorie-3.webp',
      'dessine-et-colorie-4.webp',
      'dessine-et-colorie-5.webp',
      'dessine-et-colorie-6.webp',
    ],
    answerKey: 'dessine-et-colorie-1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'pratique-de-tracer-des-lignes-1.webp',
      'pratique-de-tracer-des-lignes-2.webp',
      'pratique-de-tracer-des-lignes-3.webp',
      'pratique-de-tracer-des-lignes-4.webp',
      'pratique-de-tracer-des-lignes-5.webp',
      'pratique-de-tracer-des-lignes-6.webp',
    ],
    answerKey: 'pratique-de-tracer-des-lignes-1.webp',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring-portrait-1.webp',
      'coloring-portrait-2.webp',
      'coloring-portrait-3.webp',
      'coloring-portrait-4.webp',
      'coloring-portrait-5.webp',
      'coloring-portrait-6.webp',
    ],
    answerKey: 'coloring-portrait-1.webp',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'worksheet.webp',
      'worksheet-1.webp',
      'worksheet-2.webp',
      'worksheet-3.webp',
      'worksheet-4.webp',
      'worksheet.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'trouve-les-paires-1.webp',
      'trouve-les-paires-2.webp',
      'trouve-les-paires-3.webp',
      'trouve-les-paires-4.webp',
      'worksheet.webp',
      'trouve-les-paires-1.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'puzzle-grille-1.webp',
      'puzzle-grille-2.webp',
      'puzzle-grille-3.webp',
      'puzzle-grille-4.webp',
      'puzzle-grille-5.webp',
      'puzzle-grille-1.webp',
    ],
    answerKey: 'puzzle-grille-1-answer-key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      "trouve-l'ombre-1.webp",
      "trouve-l'ombre-2.webp",
      "trouve-l'ombre-3.webp",
      "trouve-l'ombre-4.webp",
      'shadow-match-worksheet.webp',
      'shadow-match-worksheet.webp',
    ],
    answerKey: 'shadow-match-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      "loto-d'images-1.webp",
      "loto-d'images-2.webp",
      "loto-d'images-3.webp",
      "loto-d'images-4.webp",
      'bingo-cards.webp',
      'callout.webp',
    ],
    answerKey: "loto-d'images-1-callout.webp",
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      "tri-d'images-1.webp",
      "tri-d'images-2.webp",
      "tri-d'images-3.webp",
      "tri-d'images-4.webp",
      "tri-d'images-1.webp",
      "tri-d'images-2.webp",
    ],
    answerKey: "tri-d'images-1-answer-key.webp",
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'worksheet.webp',
      'answer-key.webp',
      'worksheet.webp',
      'answer-key.webp',
      'worksheet.webp',
      'answer-key.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      "trouve-l'intrus-1.webp",
      "trouve-l'intrus-2.webp",
      "trouve-l'intrus-3.webp",
      "trouve-l'intrus-4.webp",
      'worksheet.webp',
      "trouve-l'intrus-1.webp",
    ],
    answerKey: 'answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'sudoku-en-images-1.webp',
      'sudoku-en-images-2.webp',
      'sudoku-en-images-3.webp',
      'sudoku-en-images-4.webp',
      'sudoku-worksheet.webp',
      'sudoku-en-images-1.webp',
    ],
    answerKey: 'sudoku-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      "chemin-d'images-1.webp",
      "chemin-d'images-2.webp",
      "chemin-d'images-3.webp",
      "chemin-d'images-4.webp",
      'worksheet.webp',
      "chemin-d'images-1.webp",
    ],
    answerKey: 'answer-key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'je-vois,-je-voi-1.webp',
      'je-vois,-je-voi-2.webp',
      'je-vois,-je-voi-3.webp',
      'je-vois,-je-voi-4.webp',
      'worksheet.webp',
      'je-vois,-je-voi-1.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      "trouve-l'intrus-1.webp",
      "trouve-l'intrus-2.webp",
      "trouve-l'intrus-3.webp",
      "trouve-l'intrus-1.webp",
      "trouve-l'intrus-2.webp",
      "trouve-l'intrus.webp",
    ],
    answerKey: "trouve-l'intrus-1-answer-key.webp",
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'worksheet.webp',
      'answer-key.webp',
      'worksheet.webp',
      'answer-key.webp',
      'worksheet.webp',
      'answer-key.webp',
    ],
    answerKey: 'answer-key.webp',
  },
};
