/**
 * swedish-showcase-images.ts — Swedish image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available Swedish sample image filenames.
 * Used by showcase-configs.ts, tool-showcase-configs.ts, and guide-showcase-configs.ts.
 *
 * Files live at /samples/swedish/{folder}/{filename}
 * ALL filenames verified via `ls` on server — NEVER guessed.
 *
 * NOTE: Some filenames contain Swedish characters (ö, ä, å) stored as Latin1 on the server filesystem.
 * The imgUrl() function applies encodeURIComponent() which may need adjustment if serving issues arise.
 */

export interface SwedishImageSet {
  folder: string;
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const swedishImages: Record<string, SwedishImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'addition_övning.webp',
      'bild tal.webp',
      'blandat läge.webp',
      'hitta term.webp',
      'addition_övning.webp',
      'bild tal.webp',
    ],
    answerKey: "addition_övning answer_key.webp",
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'Rolig Subtraktio 1.webp',
      'Rolig Subtraktio 2.webp',
      'Rolig Subtraktio 3.webp',
      'Rolig Subtraktio 4.webp',
      'Rolig Subtraktio 1.webp',
      'Rolig Subtraktio 2.webp',
    ],
    answerKey: "Rolig Subtraktio 1 answer_key.webp",
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'image_addition_worksheet.webp',
      "image_addition_worksheet (1).webp",
      "image_addition_worksheet (2).webp",
      "image_addition_worksheet (3).webp",
      'image_addition_worksheet.webp',
      "image_addition_worksheet (1).webp",
    ],
    answerKey: "image_addition_answer_key.webp",
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'mer mindre 1.webp',
      'mer mindre 2.webp',
      'mer mindre 3.webp',
      'worksheet.webp',
      'worksheet (1).webp',
      'mer mindre 1.webp',
    ],
    answerKey: 'mer mindre 1 answer_key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'Mattepussel 1.webp',
      'Mattepussel 2.webp',
      'Mattepussel 3.webp',
      'worksheet.webp',
      'worksheet (1).webp',
      'Mattepussel 1.webp',
    ],
    answerKey: 'Mattepussel 1 answer_key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'mattetal portrait.webp',
      'mattetal landscape.webp',
      'worksheet.webp',
      'worksheet (1).webp',
      'worksheet (2).webp',
      'mattetal portrait.webp',
    ],
    answerKey: "mattetal portrait answer_key.webp",
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'alfabetståg portrait.webp',
      'alfabetståg landscape.webp',
      'worksheet.webp',
      'worksheet (1).webp',
      'worksheet (2).webp',
      'alfabetståg portrait.webp',
    ],
    answerKey: "alfabetståg portrait answer_key.webp",
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'Gissa Ordet 1.webp',
      'Gissa Ordet 2.webp',
      'Gissa Ordet 3.webp',
      'Gissa Ordet 4.webp',
      'Gissa Ordet 1.webp',
      'Gissa Ordet 2.webp',
    ],
    answerKey: 'Gissa Ordet 1 answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'Ordmix portrait.webp',
      'Ordmix landscape.webp',
      'Ordmix custom.webp',
      'word-scramble_worksheet.webp',
      "word-scramble_worksheet (1).webp",
      "word-scramble_worksheet (2).webp",
    ],
    answerKey: "Ordmix portrait answer-key.webp",
  },
  'word-search': {
    folder: 'wordsearch',
    imgs: [
      'ordletning portrait.webp',
      'ordletning landscape.webp',
      'ordletning custom.webp',
      'worksheet.webp',
      'worksheet (1).webp',
      'worksheet (2).webp',
    ],
    answerKey: "ordletning portrait answer_key.webp",
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'Bildkryptogram 1.webp',
      'Bildkryptogram 2.webp',
      'Bildkryptogram 3.webp',
      'Bildkryptogram 4.webp',
      'Bildkryptogram 5.webp',
      'Bildkryptogram 1.webp',
    ],
    answerKey: "Bildkryptogram 1 answer_key.webp",
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
      '2 identiska bilder.webp',
      '2 olika bilder.webp',
      '3 identiska bilder.webp',
      '3 olika bilder.webp',
      '2 identiska bilder.webp',
      '2 olika bilder.webp',
    ],
    answerKey: "2 identiska bilder answer_key.webp",
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [],
    answerKey: '',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'Mönsterpussel 1.webp',
      'Mönsterpussel 2.webp',
      'Mönsterpussel 3.webp',
      'Mönsterpussel 4.webp',
      'Mönsterpussel.webp',
      'Mönsterpussel 1.webp',
    ],
    answerKey: "Mönsterpussel 1 answer_key.webp",
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Rita och Färglägg 1.webp',
      'Rita och Färglägg 2.webp',
      'Rita och Färglägg 3.webp',
      'Rita och Färglägg 4.webp',
      'Rita och Färglägg 5.webp',
      'Rita och Färglägg 6.webp',
    ],
    answerKey: 'Rita och Färglägg 1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'horizontell.webp',
      'vertikal.webp',
      'diagonal 1.webp',
      'diagonal 2.webp',
      'kurva 1.webp',
      'kurva 2.webp',
    ],
    answerKey: 'horizontell.webp',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring portrait 1.webp',
      'coloring portrait 2.webp',
      'coloring portrait 3.webp',
      'coloring portrait 4.webp',
      'coloring landscape 1.webp',
      'coloring landscape 2.webp',
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
      'worksheet (5).webp',
    ],
    answerKey: 'answer_key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Matchningsspel.webp',
      "Matchningsspel beginning letter.webp",
      "Matchningsspel bild och ord.webp",
      'Matchningsspel custom.webp',
      'Matchningsspel.webp',
      "Matchningsspel beginning letter.webp",
    ],
    answerKey: "Matchningsspel answer_key.webp",
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Rutnätspussel 1.webp',
      'Rutnätspussel 2.webp',
      'Rutnätspussel 3.webp',
      'Rutnätspussel 4.webp',
      'Rutnätspussel 5.webp',
      'Rutnätspussel 6.webp',
    ],
    answerKey: "Rutnätspussel 1 answer_key.webp",
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'skuggmatchning 1.webp',
      'skuggmatchning 2.webp',
      'skuggmatchning 3.webp',
      'skuggmatchning 4.webp',
      'shadow-match-worksheet.webp',
      'skuggmatchning 1.webp',
    ],
    answerKey: "skuggmatchning 1 answer key.webp",
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'bildbingo 1.webp',
      'bildbingo 2.webp',
      'bildbingo 3.webp',
      'bildbingo 4.webp',
      'bildbingo 1.webp',
      'bildbingo 2.webp',
    ],
    answerKey: 'bildbingo 1 callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'sortera bilder 1.webp',
      'sortera bilder 2.webp',
      'sortera bilder 3.webp',
      'sortera bilder 4.webp',
      'sortera bilder 1.webp',
      'sortera bilder 2.webp',
    ],
    answerKey: "sortera bilder 1 answer_key_2026-01-02.webp",
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'Saknade Bitar 1.webp',
      'Saknade Bitar 2.webp',
      'Saknade Bitar 3.webp',
      'Saknade Bitar 4.webp',
      'Saknade Bitar 5.webp',
      'Saknade Bitar 6.webp',
    ],
    answerKey: "Saknade Bitar 1 answer_key.webp",
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'Hitta Udda Fågeln 1.webp',
      'Hitta Udda Fågeln 2.webp',
      'Hitta Udda Fågeln 3.webp',
      'Hitta Udda Fågeln 4.webp',
      'Hitta Udda Fågeln 5.webp',
      'Hitta Udda Fågeln 1.webp',
    ],
    answerKey: "Hitta Udda Fågeln 1 answer-key.webp",
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'sudoku_lätt.webp',
      'sudoku_medel.webp',
      'sudoku_svår.webp',
      'sudoku_worksheet.webp',
      'sudoku_worksheet (1).webp',
      'sudoku_worksheet (2).webp',
    ],
    answerKey: 'sudoku_lätt answer_key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'bildväg 1.webp',
      'bildväg 2.webp',
      'bildväg 3.webp',
      'bildväg 4.webp',
      'bildväg 1.webp',
      'bildväg 2.webp',
    ],
    answerKey: 'bildväg 1 answer_key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'worksheet.webp',
      'worksheet (1).webp',
      'worksheet (2).webp',
      'worksheet (3).webp',
      'worksheet (4).webp',
      'worksheet (5).webp',
    ],
    answerKey: 'answer_key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'hitta föremålen 1.webp',
      'hitta föremålen 2.webp',
      'hitta föremålen 3.webp',
      'hitta föremålen 4.webp',
      'Hitta den Udda.webp',
      'Hitta den Udda (1).webp',
    ],
    answerKey: "hitta föremålen 1 answer_key.webp",
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'Bildkorsord 1.webp',
      'Bildkorsord 2.webp',
      'Bildkorsord 3.webp',
      'Bildkorsord 4.webp',
      'Bildkorsord 1.webp',
      'Bildkorsord 2.webp',
    ],
    answerKey: 'Bildkorsord 1 answer_key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'Skattjakt 1.webp',
      'Skattjakt 2.webp',
      'Skattjakt 3.webp',
      'Skattjakt 4.webp',
      'Skattjakt 5.webp',
      'Skattjakt 1.webp',
    ],
    answerKey: 'Skattjakt 1 answer_key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'Prepositioner 1.webp',
      'Prepositioner 2.webp',
      'Prepositioner 3.webp',
      'Prepositioner 4.webp',
      'Prepositioner 1.webp',
      'Prepositioner 2.webp',
    ],
    answerKey: "Prepositioner 1 answer_key.webp",
  },
};
