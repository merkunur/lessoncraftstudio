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
      'addition-övning.webp',
      'bild-tal.webp',
      'blandat-läge.webp',
      'hitta-term.webp',
      'addition-övning.webp',
      'bild-tal.webp',
    ],
    answerKey: "addition-övning-answer-key.webp",
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'rolig-subtraktio-1.webp',
      'rolig-subtraktio-2.webp',
      'rolig-subtraktio-3.webp',
      'rolig-subtraktio-4.webp',
      'rolig-subtraktio-1.webp',
      'rolig-subtraktio-2.webp',
    ],
    answerKey: "rolig-subtraktio-1-answer-key.webp",
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'image-addition-worksheet.webp',
      "image-addition-worksheet-1.webp",
      "image-addition-worksheet-2.webp",
      "image-addition-worksheet-3.webp",
      'image-addition-worksheet.webp',
      "image-addition-worksheet-1.webp",
    ],
    answerKey: "image-addition-answer-key.webp",
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'mer-mindre-1.webp',
      'mer-mindre-2.webp',
      'mer-mindre-3.webp',
      'worksheet.webp',
      'worksheet-1.webp',
      'mer-mindre-1.webp',
    ],
    answerKey: 'mer-mindre-1-answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'mattepussel-1.webp',
      'mattepussel-2.webp',
      'mattepussel-3.webp',
      'worksheet.webp',
      'worksheet-1.webp',
      'mattepussel-1.webp',
    ],
    answerKey: 'mattepussel-1-answer-key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'mattetal-portrait.webp',
      'mattetal-landscape.webp',
      'worksheet.webp',
      'worksheet-1.webp',
      'worksheet-2.webp',
      'mattetal-portrait.webp',
    ],
    answerKey: "mattetal-portrait-answer-key.webp",
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'alfabetståg-portrait.webp',
      'alfabetståg-landscape.webp',
      'worksheet.webp',
      'worksheet-1.webp',
      'worksheet-2.webp',
      'alfabetståg-portrait.webp',
    ],
    answerKey: "alfabetståg-portrait-answer-key.webp",
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'gissa-ordet-1.webp',
      'gissa-ordet-2.webp',
      'gissa-ordet-3.webp',
      'gissa-ordet-4.webp',
      'gissa-ordet-1.webp',
      'gissa-ordet-2.webp',
    ],
    answerKey: 'gissa-ordet-1-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'ordmix-portrait.webp',
      'ordmix-landscape.webp',
      'ordmix-custom.webp',
      'word-scramble-worksheet.webp',
      "word-scramble-worksheet-1.webp",
      "word-scramble-worksheet-2.webp",
    ],
    answerKey: "ordmix-portrait-answer-key.webp",
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'ordletning-portrait.webp',
      'ordletning-landscape.webp',
      'ordletning-custom.webp',
      'worksheet.webp',
      'worksheet-1.webp',
      'worksheet-2.webp',
    ],
    answerKey: "ordletning-portrait-answer-key.webp",
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'bildkryptogram-1.webp',
      'bildkryptogram-2.webp',
      'bildkryptogram-3.webp',
      'bildkryptogram-4.webp',
      'bildkryptogram-5.webp',
      'bildkryptogram-1.webp',
    ],
    answerKey: "bildkryptogram-1-answer-key.webp",
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
      '2-identiska-bilder.webp',
      '2-olika-bilder.webp',
      '3-identiska-bilder.webp',
      '3-olika-bilder.webp',
      '2-identiska-bilder.webp',
      '2-olika-bilder.webp',
    ],
    answerKey: "2-identiska-bilder-answer-key.webp",
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'pattern-train-worksheet.webp',
      'pattern-train-worksheet-1.webp',
      'pattern-train-worksheet-2.webp',
      'pattern-train-worksheet-3.webp',
      'pattern-train-worksheet-4.webp',
      'pattern-train-worksheet-5.webp',
    ],
    answerKey: 'pattern-train-answer-key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'mönsterpussel-1.webp',
      'mönsterpussel-2.webp',
      'mönsterpussel-3.webp',
      'mönsterpussel-4.webp',
      'mönsterpussel.webp',
      'mönsterpussel-1.webp',
    ],
    answerKey: "mönsterpussel-1-answer-key.webp",
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'rita-och-färglägg-1.webp',
      'rita-och-färglägg-2.webp',
      'rita-och-färglägg-3.webp',
      'rita-och-färglägg-4.webp',
      'rita-och-färglägg-5.webp',
      'rita-och-färglägg-6.webp',
    ],
    answerKey: 'rita-och-färglägg-1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'horizontell.webp',
      'vertikal.webp',
      'diagonal-1.webp',
      'diagonal-2.webp',
      'kurva-1.webp',
      'kurva-2.webp',
    ],
    answerKey: 'horizontell.webp',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring-portrait-1.webp',
      'coloring-portrait-2.webp',
      'coloring-portrait-3.webp',
      'coloring-portrait-4.webp',
      'coloring-landscape-1.webp',
      'coloring-landscape-2.webp',
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
      'worksheet-5.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'matchningsspel.webp',
      "matchningsspel-beginning-letter.webp",
      "matchningsspel-bild-och-ord.webp",
      'matchningsspel-custom.webp',
      'matchningsspel.webp',
      "matchningsspel-beginning-letter.webp",
    ],
    answerKey: "matchningsspel-answer-key.webp",
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'rutnätspussel-1.webp',
      'rutnätspussel-2.webp',
      'rutnätspussel-3.webp',
      'rutnätspussel-4.webp',
      'rutnätspussel-5.webp',
      'rutnätspussel-6.webp',
    ],
    answerKey: "rutnätspussel-1-answer-key.webp",
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'skuggmatchning-1.webp',
      'skuggmatchning-2.webp',
      'skuggmatchning-3.webp',
      'skuggmatchning-4.webp',
      'shadow-match-worksheet.webp',
      'skuggmatchning-1.webp',
    ],
    answerKey: "skuggmatchning-1-answer-key.webp",
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'bildbingo-1.webp',
      'bildbingo-2.webp',
      'bildbingo-3.webp',
      'bildbingo-4.webp',
      'bildbingo-1.webp',
      'bildbingo-2.webp',
    ],
    answerKey: 'bildbingo-1-callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'sortera-bilder-1.webp',
      'sortera-bilder-2.webp',
      'sortera-bilder-3.webp',
      'sortera-bilder-4.webp',
      'sortera-bilder-1.webp',
      'sortera-bilder-2.webp',
    ],
    answerKey: "sortera-bilder-1-answer-key-2026-01-02.webp",
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'saknade-bitar-1.webp',
      'saknade-bitar-2.webp',
      'saknade-bitar-3.webp',
      'saknade-bitar-4.webp',
      'saknade-bitar-5.webp',
      'saknade-bitar-6.webp',
    ],
    answerKey: "saknade-bitar-1-answer-key.webp",
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'hitta-udda-fågeln-1.webp',
      'hitta-udda-fågeln-2.webp',
      'hitta-udda-fågeln-3.webp',
      'hitta-udda-fågeln-4.webp',
      'hitta-udda-fågeln-5.webp',
      'hitta-udda-fågeln-1.webp',
    ],
    answerKey: "hitta-udda-fågeln-1-answer-key.webp",
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'sudoku-lätt.webp',
      'sudoku-medel.webp',
      'sudoku-svår.webp',
      'sudoku-worksheet.webp',
      'sudoku-worksheet-1.webp',
      'sudoku-worksheet-2.webp',
    ],
    answerKey: 'sudoku-lätt-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'bildväg-1.webp',
      'bildväg-2.webp',
      'bildväg-3.webp',
      'bildväg-4.webp',
      'bildväg-1.webp',
      'bildväg-2.webp',
    ],
    answerKey: 'bildväg-1-answer-key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'worksheet.webp',
      'worksheet-1.webp',
      'worksheet-2.webp',
      'worksheet-3.webp',
      'worksheet-4.webp',
      'worksheet-5.webp',
    ],
    answerKey: 'answer-key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'hitta-föremålen-1.webp',
      'hitta-föremålen-2.webp',
      'hitta-föremålen-3.webp',
      'hitta-föremålen-4.webp',
      'hitta-den-udda.webp',
      'hitta-den-udda-1.webp',
    ],
    answerKey: "hitta-föremålen-1-answer-key.webp",
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'bildkorsord-1.webp',
      'bildkorsord-2.webp',
      'bildkorsord-3.webp',
      'bildkorsord-4.webp',
      'bildkorsord-1.webp',
      'bildkorsord-2.webp',
    ],
    answerKey: 'bildkorsord-1-answer-key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'skattjakt-1.webp',
      'skattjakt-2.webp',
      'skattjakt-3.webp',
      'skattjakt-4.webp',
      'skattjakt-5.webp',
      'skattjakt-1.webp',
    ],
    answerKey: 'skattjakt-1-answer-key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'prepositioner-1.webp',
      'prepositioner-2.webp',
      'prepositioner-3.webp',
      'prepositioner-4.webp',
      'prepositioner-1.webp',
      'prepositioner-2.webp',
    ],
    answerKey: "prepositioner-1-answer-key.webp",
  },
};
