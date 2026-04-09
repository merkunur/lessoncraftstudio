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
      'additionsspa-1.webp',
      'additionsspa-2.webp',
      'additionsspa-3.webp',
      'additionsspa-4.webp',
      'addition-worksheet.webp',
      'additionsspa-1.webp',
    ],
    answerKey: 'additionsspa-1-answer-key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'worksheet.webp',
      'worksheet-1.webp',
      'worksheet-2.webp',
      'worksheet-3.webp',
      'worksheet-4.webp',
      'worksheet-1.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'code-knacker-addition-1.webp',
      'code-knacker-addition-2.webp',
      'code-knacker-addition-3.webp',
      'code-knacker-addition-4.webp',
      'image-addition-worksheet.webp',
      'code-knacker-addition-1.webp',
    ],
    answerKey: 'code-knacker-addition-1-answer-key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'mehr-weniger-1.webp',
      'mehr-weniger-2.webp',
      'mehr-weniger-3.webp',
      'mehr-weniger-4.webp',
      'worksheet.webp',
      'mehr-weniger-1.webp',
    ],
    answerKey: 'mehr-weniger-1-answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'mathe-rätsel-1.webp',
      'mathe-rätsel-2.webp',
      'mathe-rätsel-3.webp',
      'mathe-rätsel-4.webp',
      'worksheet.webp',
      'mathe-rätsel-1.webp',
    ],
    answerKey: 'mathe-rätsel-1-answer-key.webp',
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
      'worksheet.webp',
      'worksheet-1.webp',
      'worksheet-2.webp',
      'worksheet-3.webp',
      'worksheet-4.webp',
      'worksheet-1.webp',
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
      'clue-grid-worksheet.webp',
      'clue-grid-answer-key.webp',
      'clue-grid-worksheet.webp',
      'clue-grid-answer-key.webp',
      'clue-grid-worksheet.webp',
      'clue-grid-answer-key.webp',
    ],
    answerKey: 'clue-grid-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'buchstabensala-1.webp',
      'buchstabensala-2.webp',
      'buchstabensala-3.webp',
      'buchstabensala-4.webp',
      'word-scramble-worksheet.webp',
      'buchstabensala-1.webp',
    ],
    answerKey: 'buchstabensala-1-answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'worter-suchen-1.webp',
      'worksheet.webp',
      'worter-suchen-1.webp',
      'worksheet.webp',
      'worter-suchen-1.webp',
      'worksheet.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'bilder-kryptogramm-1.webp',
      'bilder-kryptogramm-2.webp',
      'bilder-kryptogramm-3.webp',
      'bilder-kryptogramm-4.webp',
      'bilder-kryptogramm-5.webp',
      'bilder-kryptogramm-1.webp',
    ],
    answerKey: 'bilder-kryptogramm-1-answer-key.webp',
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
      'big-small-worksheet-worksheet.webp',
      'big-small-worksheet-answer-key.webp',
      'big-small-worksheet-worksheet.webp',
      'big-small-worksheet-answer-key.webp',
      'big-small-worksheet-worksheet.webp',
      'big-small-worksheet-answer-key.webp',
    ],
    answerKey: 'big-small-worksheet-answer-key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'musterzug-1.webp',
      'musterzug-2.webp',
      'musterzug-3.webp',
      'musterzug-4.webp',
      'musterzug-5.webp',
      'musterzug-1.webp',
    ],
    answerKey: 'musterzug-2-answer-key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'pattern-worksheet.webp',
      'pattern-answer-key.webp',
      'pattern-worksheet.webp',
      'pattern-answer-key.webp',
      'pattern-worksheet.webp',
      'pattern-answer-key.webp',
    ],
    answerKey: 'pattern-answer-key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'zeichnen-und-ausmale-1.webp',
      'zeichnen-und-ausmale-2.webp',
      'zeichnen-und-ausmale-3.webp',
      'zeichnen-und-ausmale-4.webp',
      'zeichnen-und-ausmale-5.webp',
      'zeichnen-und-ausmale-6.webp',
    ],
    answerKey: 'zeichnen-und-ausmale-1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'linien-zeichnen-üben-1.webp',
      'linien-zeichnen-üben-2.webp',
      'linien-zeichnen-üben-3.webp',
      'linien-zeichnen-üben-4.webp',
      'linien-zeichnen-üben-5.webp',
      'linien-zeichnen-üben-6.webp',
    ],
    answerKey: 'linien-zeichnen-üben-1.webp',
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
      'bilddiagramm-1.webp',
      'bilddiagramm-2.webp',
      'bilddiagramm-3.webp',
      'bilddiagramm-4.webp',
      'worksheet.webp',
      'bilddiagramm-1.webp',
    ],
    answerKey: 'bilddiagramm-1-answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'paare-finden-1.webp',
      'paare-finden-2.webp',
      'paare-finden-3.webp',
      'paare-finden-4.webp',
      'worksheet.webp',
      'paare-finden-1.webp',
    ],
    answerKey: 'paare-finden-1-answer-key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'raster-puzzle-1.webp',
      'raster-puzzle-2.webp',
      'raster-puzzle-3.webp',
      'raster-puzzle-4.webp',
      'raster-puzzle-5.webp',
      'raster-puzzle-1.webp',
    ],
    answerKey: 'raster-puzzle-1-answer-key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'schatten-zuordnen-1.webp',
      'schatten-zuordnen-2.webp',
      'schatten-zuordnen-3.webp',
      'schatten-zuordnen-4.webp',
      'shadow-match-worksheet.webp',
      'shadow-match-worksheet-1.webp',
    ],
    answerKey: 'schatten-zuordnen-1-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'bilder-bingo-1.webp',
      'bilder-bingo-2.webp',
      'bilder-bingo-3.webp',
      'bilder-bingo-4.webp',
      'bingo-cards.webp',
      'callout.webp',
    ],
    answerKey: 'bilder-bingo-1-callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'bilder-sortieren-1.webp',
      'bilder-sortieren-2.webp',
      'bilder-sortieren-3.webp',
      'bilder-sortieren-4.webp',
      'worksheet-2026-01-15.webp',
      'bilder-sortieren-1.webp',
    ],
    answerKey: 'bilder-sortieren-1-answer-key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'fehlende-teile-1.webp',
      'fehlende-teile-2.webp',
      'fehlende-teile-3.webp',
      'fehlende-teile-4.webp',
      'worksheet.webp',
      'fehlende-teile-1.webp',
    ],
    answerKey: 'fehlende-teile-1-answer-key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'finde-das-andere-1.webp',
      'finde-das-andere-2.webp',
      'finde-das-andere-3.webp',
      'finde-das-andere-4.webp',
      'worksheet.webp',
      'finde-das-andere-1.webp',
    ],
    answerKey: 'finde-das-andere-1-answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'bilder-sudoku-1.webp',
      'bilder-sudoku-2.webp',
      'bilder-sudoku-3.webp',
      'bilder-sudoku-4.webp',
      'sudoku-worksheet.webp',
      'bilder-sudoku-1.webp',
    ],
    answerKey: 'bilder-sudoku-1-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'bilderpfad-1.webp',
      'bilderpfad-2.webp',
      'bilderpfad-3.webp',
      'bilderpfad-4.webp',
      'bilderpfad-5.webp',
      'bilderpfad-1.webp',
    ],
    answerKey: 'bilderpfad-1-answer-key-1.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'ich-sehe-was-1.webp',
      'ich-sehe-was-2.webp',
      'ich-sehe-was-3.webp',
      'ich-sehe-was-4.webp',
      'worksheet.webp',
      'ich-sehe-was-1.webp',
    ],
    answerKey: 'ich-sehe-was-1-answer-key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'finde-das-unpassende-1-v9.webp',
      'finde-das-unpassende-2-v10.webp',
      'finde-das-unpassende-1.webp',
      'finde-das-unpassende-2.webp',
      'finde-das-unpassende-3.webp',
      'finde-das-unpassende.webp',
    ],
    answerKey: 'finde-das-unpassende-1-answer-key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'worksheet.webp',
      'worksheet-1.webp',
      'worksheet-2.webp',
      'worksheet-3.webp',
      'worksheet-4.webp',
      'worksheet-1.webp',
    ],
    answerKey: 'answer-key.webp',
  },
};
