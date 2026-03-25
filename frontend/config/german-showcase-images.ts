/**
 * german-showcase-images.ts — German image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available German sample image filenames.
 * Used by showcase-configs.ts, tool-showcase-configs.ts, and guide-showcase-configs.ts.
 *
 * Files live at /samples/german/{folder}/{filename}
 */

export interface GermanImageSet {
  folder: string;          // Same folder name as English
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const germanImages: Record<string, GermanImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'Additionsspa 1.webp',
      'Additionsspa 2.webp',
      'Additionsspa 3.webp',
      'Additionsspa 4.webp',
      'addition_worksheet.webp',
      'Additionsspa 1.webp',
    ],
    answerKey: "Additionsspa 1 answer_key.webp",
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'worksheet.webp',
      'worksheet (1).webp',
      'worksheet (2).webp',
      'worksheet (3).webp',
      'worksheet (4).webp',
      'worksheet (1).webp',
    ],
    answerKey: 'answer_key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'Code-Knacker Addition 1.webp',
      'Code-Knacker Addition 2.webp',
      'Code-Knacker Addition 3.webp',
      'Code-Knacker Addition 4.webp',
      'image_addition_worksheet.webp',
      'Code-Knacker Addition 1.webp',
    ],
    answerKey: "Code-Knacker Addition 1 answer_key.webp",
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'Mehr Weniger 1.webp',
      'Mehr Weniger 2.webp',
      'Mehr Weniger 3.webp',
      'Mehr Weniger 4.webp',
      'worksheet.webp',
      'Mehr Weniger 1.webp',
    ],
    answerKey: "Mehr Weniger 1 answer_key.webp",
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'Mathe-Rätsel 1.webp',
      'Mathe-Rätsel 2.webp',
      'Mathe-Rätsel 3.webp',
      'Mathe-Rätsel 4.webp',
      'worksheet.webp',
      'Mathe-Rätsel 1.webp',
    ],
    answerKey: "Mathe-Rätsel 1 answer_key.webp",
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
      'worksheet.webp',
      'worksheet (1).webp',
      'worksheet (2).webp',
      'worksheet (3).webp',
      'worksheet (4).webp',
      'worksheet (1).webp',
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
      'clue-grid_worksheet.webp',
      'clue-grid_answer-key.webp',
      'clue-grid_worksheet.webp',
      'clue-grid_answer-key.webp',
      'clue-grid_worksheet.webp',
      'clue-grid_answer-key.webp',
    ],
    answerKey: 'clue-grid_answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'Buchstabensala 1.webp',
      'Buchstabensala 2.webp',
      'Buchstabensala 3.webp',
      'Buchstabensala 4.webp',
      'word-scramble_worksheet.webp',
      'Buchstabensala 1.webp',
    ],
    answerKey: "Buchstabensala 1 answer-key.webp",
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'Worter suchen 1.webp',
      'worksheet.webp',
      'Worter suchen 1.webp',
      'worksheet.webp',
      'Worter suchen 1.webp',
      'worksheet.webp',
    ],
    answerKey: 'answer_key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'Bilder-Kryptogramm 1.webp',
      'Bilder-Kryptogramm 2.webp',
      'Bilder-Kryptogramm 3.webp',
      'Bilder-Kryptogramm 4.webp',
      'Bilder-Kryptogramm 5.webp',
      'Bilder-Kryptogramm 1.webp',
    ],
    answerKey: "Bilder-Kryptogramm 1 answer_key.webp",
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
      "big-small-worksheet_worksheet.webp",
      "big-small-worksheet_answer_key.webp",
      "big-small-worksheet_worksheet.webp",
      "big-small-worksheet_answer_key.webp",
      "big-small-worksheet_worksheet.webp",
      "big-small-worksheet_answer_key.webp",
    ],
    answerKey: "big-small-worksheet_answer_key.webp",
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'Musterzug 1.webp',
      'Musterzug 2.webp',
      'Musterzug 3.webp',
      'Musterzug 4.webp',
      'Musterzug 5.webp',
      'Musterzug 1.webp',
    ],
    answerKey: 'Musterzug 2 answer_key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'pattern_worksheet.webp',
      'pattern_answer_key.webp',
      'pattern_worksheet.webp',
      'pattern_answer_key.webp',
      'pattern_worksheet.webp',
      'pattern_answer_key.webp',
    ],
    answerKey: 'pattern_answer_key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Zeichnen und Ausmale 1.webp',
      'Zeichnen und Ausmale 2.webp',
      'Zeichnen und Ausmale 3.webp',
      'Zeichnen und Ausmale 4.webp',
      'Zeichnen und Ausmale 5.webp',
      'Zeichnen und Ausmale 6.webp',
    ],
    answerKey: 'Zeichnen und Ausmale 1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'Linien Zeichnen Üben 1.webp',
      'Linien Zeichnen Üben 2.webp',
      'Linien Zeichnen Üben 3.webp',
      'Linien Zeichnen Üben 4.webp',
      'Linien Zeichnen Üben 5.webp',
      'Linien Zeichnen Üben 6.webp',
    ],
    answerKey: 'Linien Zeichnen Üben 1.webp',
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
      'Bilddiagramm 1.webp',
      'Bilddiagramm 2.webp',
      'Bilddiagramm 3.webp',
      'Bilddiagramm 4.webp',
      'worksheet.webp',
      'Bilddiagramm 1.webp',
    ],
    answerKey: "Bilddiagramm 1 answer_key.webp",
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Paare Finden 1.webp',
      'Paare Finden 2.webp',
      'Paare Finden 3.webp',
      'Paare Finden 4.webp',
      'worksheet.webp',
      'Paare Finden 1.webp',
    ],
    answerKey: "Paare Finden 1 answer_key.webp",
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Raster-Puzzle 1.webp',
      'Raster-Puzzle 2.webp',
      'Raster-Puzzle 3.webp',
      'Raster-Puzzle 4.webp',
      'Raster-Puzzle 5.webp',
      'Raster-Puzzle 1.webp',
    ],
    answerKey: "Raster-Puzzle 1 answer_key.webp",
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'Schatten Zuordnen 1.webp',
      'Schatten Zuordnen 2.webp',
      'Schatten Zuordnen 3.webp',
      'Schatten Zuordnen 4.webp',
      'shadow-match-worksheet.webp',
      "shadow-match-worksheet (1).webp",
    ],
    answerKey: "Schatten Zuordnen 1 answer-key.webp",
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'bilder-bingo 1.webp',
      'bilder-bingo 2.webp',
      'bilder-bingo 3.webp',
      'bilder-bingo 4.webp',
      'bingo_cards.webp',
      'callout.webp',
    ],
    answerKey: 'bilder-bingo 1 callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'Bilder Sortieren 1.webp',
      'Bilder Sortieren 2.webp',
      'Bilder Sortieren 3.webp',
      'Bilder Sortieren 4.webp',
      'worksheet_2026-01-15.webp',
      'Bilder Sortieren 1.webp',
    ],
    answerKey: "Bilder Sortieren 1 answer_key.webp",
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'Fehlende Teile 1.webp',
      'Fehlende Teile 2.webp',
      'Fehlende Teile 3.webp',
      'Fehlende Teile 4.webp',
      'worksheet.webp',
      'Fehlende Teile 1.webp',
    ],
    answerKey: "Fehlende Teile 1 answer_key.webp",
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'Finde das Andere 1.webp',
      'Finde das Andere 2.webp',
      'Finde das Andere 3.webp',
      'Finde das Andere 4.webp',
      'worksheet.webp',
      'Finde das Andere 1.webp',
    ],
    answerKey: "Finde das Andere 1 answer-key.webp",
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'Bilder-Sudoku 1.webp',
      'Bilder-Sudoku 2.webp',
      'Bilder-Sudoku 3.webp',
      'Bilder-Sudoku 4.webp',
      'sudoku_worksheet.webp',
      'Bilder-Sudoku 1.webp',
    ],
    answerKey: "Bilder-Sudoku 1 answer_key.webp",
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'Bilderpfad 1.webp',
      'Bilderpfad 2.webp',
      'Bilderpfad 3.webp',
      'Bilderpfad 4.webp',
      'Bilderpfad 5.webp',
      'Bilderpfad 1.webp',
    ],
    answerKey: "Bilderpfad 1 answer_key (1).webp",
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'Ich sehe was 1.webp',
      'Ich sehe was 2.webp',
      'Ich sehe was 3.webp',
      'Ich sehe was 4.webp',
      'worksheet.webp',
      'Ich sehe was 1.webp',
    ],
    answerKey: "Ich sehe was 1 answer_key.webp",
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'Finde das Unpassende 1.webp',
      'Finde das Unpassende 2.webp',
      'Finde das Unpassende (1).webp',
      'Finde das Unpassende (2).webp',
      'Finde das Unpassende (3).webp',
      'Finde das Unpassende.webp',
    ],
    answerKey: "Finde das Unpassende 1 answer_key.webp",
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'worksheet.webp',
      'worksheet (1).webp',
      'worksheet (2).webp',
      'worksheet (3).webp',
      'worksheet (4).webp',
      'worksheet (1).webp',
    ],
    answerKey: 'answer_key.webp',
  },
};
