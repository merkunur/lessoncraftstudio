/**
 * danish-showcase-images.ts — Danish image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available Danish sample image filenames.
 * Used by showcase-configs.ts, tool-showcase-configs.ts, and guide-showcase-configs.ts.
 *
 * Files live at /samples/danish/{folder}/{filename}
 * ALL filenames verified via `ls` on server — NEVER guessed.
 */

export interface DanishImageSet {
  folder: string;
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const danishImages: Record<string, DanishImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'sjov-addition-1.webp',
      'sjov-addition-2.webp',
      'sjov-addition-3.webp',
      'sjov-addition-4.webp',
      'sjov-addition-5.webp',
      'sjov-addition-1.webp',
    ],
    answerKey: 'sjov-addition-1-answer-key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'sjov-subtraktion-1.webp',
      'sjov-subtraktion-2.webp',
      'sjov-subtraktion-3.webp',
      'sjov-subtraktion-4.webp',
      'sjov-subtraktion-5.webp',
      'sjov-subtraktion-1.webp',
    ],
    answerKey: 'sjov-subtraktion-1-answer-key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'hemmelig-kode-addition-1.webp',
      'hemmelig-kode-addition-2.webp',
      'hemmelig-kode-addition-3.webp',
      'hemmelig-kode-addition-4.webp',
      'hemmelig-kode-addition-5.webp',
      'hemmelig-kode-addition-1.webp',
    ],
    answerKey: 'hemmelig-kode-addition-1-answer-key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'mere-mindre-1.webp',
      'mere-mindre-2.webp',
      'mere-mindre-3.webp',
      'mere-mindre-4.webp',
      'mere-mindre-5.webp',
      'mere-mindre-6.webp',
    ],
    answerKey: 'mere-mindre-1-answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'mattepuslespil-1.webp',
      'mattepuslespil-2.webp',
      'mattepuslespil-3.webp',
      'mattepuslespil-4.webp',
      'mattepuslespil-5.webp',
      'mattepuslespil-1.webp',
    ],
    answerKey: 'mattepuslespil-1-answer-key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'matematikopgave-1.webp',
      'matematikopgave-2.webp',
      'matematikopgave-3.webp',
      'matematikopgave-4.webp',
      'matematikopgave-1.webp',
      'matematikopgave-2.webp',
    ],
    answerKey: 'matematikopgave-1-answer-key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'alfabettog-1.webp',
      'alfabettog-2.webp',
      'alfabettog-3.webp',
      'alfabettog-4.webp',
      'alfabettog-5.webp',
      'alfabettog-1.webp',
    ],
    answerKey: 'alfabettog-1-answer-key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'præpositioner-1.webp',
      'præpositioner-2.webp',
      'præpositioner-3.webp',
      'præpositioner-4.webp',
      'præpositioner-1.webp',
      'præpositioner-2.webp',
    ],
    answerKey: 'præpositioner-1-answer-key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'gæt-ordet-1.webp',
      'gæt-ordet-2.webp',
      'gæt-ordet-3.webp',
      'gæt-ordet-4.webp',
      'gæt-ordet-5.webp',
      'gæt-ordet-6.webp',
    ],
    answerKey: 'gæt-ordet-1-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'bogstavrod-1.webp',
      'bogstavrod-2.webp',
      'bogstavrod-3.webp',
      'bogstavrod-4.webp',
      'bogstavrod-5.webp',
      'bogstavrod-1.webp',
    ],
    answerKey: 'bogstavrod-1-answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'ordsøgning-1.webp',
      'ordsøgning-2.webp',
      'ordsøgning-3.webp',
      'ordsøgning-4.webp',
      'ordsøgning-1.webp',
      'ordsøgning-2.webp',
    ],
    answerKey: 'ordsøgning-1-answer-key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'billed-kryptogram-1.webp',
      'billed-kryptogram-2.webp',
      'billed-kryptogram-3.webp',
      'billed-kryptogram-4.webp',
      'billed-kryptogram-5.webp',
      'billed-kryptogram-1.webp',
    ],
    answerKey: 'billed-kryptogram-1-answer-key.webp',
  },
  writing: {
    folder: 'writing',
    imgs: [
      'writing.webp',
      'writing-custom.webp',
      'writing-beginning-letter.webp',
      'writing.webp',
      'writing-custom.webp',
      'writing-beginning-letter.webp',
    ],
    answerKey: '',
  },
  'big-small': {
    folder: 'big small',
    imgs: [
      'stort-eller-lille-1.webp',
      'stort-eller-lille-2.webp',
      'stort-eller-lille-3.webp',
      'stort-eller-lille-4.webp',
      'stort-eller-lille-5.webp',
      'stort-eller-lille-6.webp',
    ],
    answerKey: 'stort-eller-lille-1-answer-key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'mønstertoget-1.webp',
      'mønstertoget-2.webp',
      'mønstertoget-3.webp',
      'mønstertoget-4.webp',
      'mønstertoget-5.webp',
      'mønstertoget-1.webp',
    ],
    answerKey: 'mønstertoget-1-answer-key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'mønstergåder-1.webp',
      'mønstergåder-2.webp',
      'mønstergåder-3.webp',
      'mønstergåder-4.webp',
      'mønstergåder-5.webp',
      'mønstergåder-6.webp',
    ],
    answerKey: 'mønstergåder-1-answer-key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'tegn-og-farvlæg-1.webp',
      'tegn-og-farvlæg-2.webp',
      'tegn-og-farvlæg-3.webp',
      'tegn-og-farvlæg-4.webp',
      'tegn-og-farvlæg-5.webp',
      'tegn-og-farvlæg-6.webp',
    ],
    answerKey: '',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'linjetegningsøvelse-1.webp',
      'linjetegningsøvelse-2.webp',
      'linjetegningsøvelse-4.webp',
      'linjetegningsøvelse-5.webp',
      'linjetegningsøvelse-6.webp',
      'linjetegningsøvelse-7.webp',
    ],
    answerKey: '',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring-portrait-1.webp',
      'coloring-portrait-2.webp',
      'coloring-portrait-3.webp',
      'coloring-portrait-4.webp',
      'coloring-portrait-5.webp',
      'coloring-landscape-1.webp',
    ],
    answerKey: '',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'billediagram-1.webp',
      'billediagram-2.webp',
      'billediagram-3.webp',
      'billediagram-4.webp',
      'billediagram-1.webp',
      'billediagram-2.webp',
    ],
    answerKey: 'billediagram-1-answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'find-parrene-1.webp',
      'find-parrene-2.webp',
      'find-parrene-3.webp',
      'find-parrene-4.webp',
      'find-parrene-1.webp',
      'find-parrene-2.webp',
    ],
    answerKey: 'find-parrene-1-answer-key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'gitterpuslespil-1.webp',
      'gitterpuslespil-2.webp',
      'gitterpuslespil-3.webp',
      'gitterpuslespil-4.webp',
      'gitterpuslespil-5.webp',
      'gitterpuslespil-6.webp',
    ],
    answerKey: 'gitterpuslespil-1-answer-key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'gør-billederne-hele-1.webp',
      'gør-billederne-hele-2.webp',
      'gør-billederne-hele-3.webp',
      'gør-billederne-hele-4.webp',
      'gør-billederne-hele-1.webp',
      'gør-billederne-hele-2.webp',
    ],
    answerKey: 'gør-billederne-hele-1-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'billedbingo-1.webp',
      'billedbingo-2.webp',
      'billedbingo-3.webp',
      'billedbingo-4.webp',
      'billedbingo-1.webp',
      'billedbingo-2.webp',
    ],
    answerKey: 'billedbingo-1-callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'sorter-billeder-1.webp',
      'sorter-billeder-2.webp',
      'sorter-billeder-3.webp',
      'sorter-billeder-4.webp',
      'sorter-billeder-1.webp',
      'sorter-billeder-2.webp',
    ],
    answerKey: 'sorter-billeder-1-answer-key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'manglende-dele-1.webp',
      'manglende-dele-2.webp',
      'manglende-dele-3.webp',
      'manglende-dele-4.webp',
      'manglende-dele-5.webp',
      'manglende-dele-6.webp',
    ],
    answerKey: 'manglende-dele-1-answer-key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'find-den-ulige-1.webp',
      'find-den-ulige-2.webp',
      'find-den-ulige-3.webp',
      'find-den-ulige-4.webp',
      'find-den-ulige-5.webp',
      'find-den-ulige-6.webp',
    ],
    answerKey: 'find-den-ulige-1-answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'billede-sudoku-1.webp',
      'billede-sudoku-2.webp',
      'billede-sudoku-3.webp',
      'billede-sudoku-4.webp',
      'billede-sudoku-5.webp',
      'billede-sudoku-1.webp',
    ],
    answerKey: 'billede-sudoku-1-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'billedsti-1.webp',
      'billedsti-2.webp',
      'billedsti-3.webp',
      'billedsti-4.webp',
      'billedsti-5.webp',
      'billedsti-1.webp',
    ],
    answerKey: 'billedsti-1-answer-key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'jeg-ser,-jeg-ser-1.webp',
      'jeg-ser,-jeg-ser-2.webp',
      'jeg-ser,-jeg-ser-3.webp',
      'jeg-ser,-jeg-ser-4.webp',
      'jeg-ser,-jeg-ser-5.webp',
      'jeg-ser,-jeg-ser-1.webp',
    ],
    answerKey: 'jeg-ser,-jeg-ser-1-answer-key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'find-de-skjulte-objekter-1.webp',
      'find-de-skjulte-objekter-2.webp',
      'find-de-skjulte-objekter-3.webp',
      'find-de-skjulte-objekter-1.webp',
      'find-de-skjulte-objekter-2.webp',
      'find-de-skjulte-objekter-3.webp',
    ],
    answerKey: 'find-de-skjulte-objekter-1-answer-key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'billedkrydsord-1.webp',
      'billedkrydsord-2.webp',
      'billedkrydsord-3.webp',
      'billedkrydsord-4.webp',
      'billedkrydsord-5.webp',
      'billedkrydsord-1.webp',
    ],
    answerKey: 'billedkrydsord-1-answer-key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'skattejagt-1.webp',
      'skattejagt-2.webp',
      'skattejagt-3.webp',
      'skattejagt-4.webp',
      'skattejagt-1.webp',
      'skattejagt-2.webp',
    ],
    answerKey: 'skattejagt-1-answer-key.webp',
  },
};
