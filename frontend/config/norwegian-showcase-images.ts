/**
 * norwegian-showcase-images.ts — Norwegian image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available Norwegian sample image filenames.
 * Used by showcase-configs.ts, tool-showcase-configs.ts, and guide-showcase-configs.ts.
 *
 * Files live at /samples/norwegian/{folder}/{filename}
 * ALL filenames verified via `ls` on server — NEVER guessed.
 */

export interface NorwegianImageSet {
  folder: string;
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const norwegianImages: Record<string, NorwegianImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'gøy-addisjon-1.webp',
      'gøy-addisjon-2.webp',
      'gøy-addisjon-3.webp',
      'gøy-addisjon-4.webp',
      'gøy-addisjon-5.webp',
      'gøy-addisjon-6.webp',
    ],
    answerKey: 'gøy-addisjon-1-answer-key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'moro-med-subtraksjon-1.webp',
      'moro-med-subtraksjon-2.webp',
      'moro-med-subtraksjon-3.webp',
      'moro-med-subtraksjon-4.webp',
      'moro-med-subtraksjon-5.webp',
      'moro-med-subtraksjon-6.webp',
    ],
    answerKey: 'moro-med-subtraksjon-1-answer-key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'hemmelig-kode-addisjon-1.webp',
      'hemmelig-kode-addisjon-2.webp',
      'hemmelig-kode-addisjon-3.webp',
      'hemmelig-kode-addisjon-4.webp',
      'hemmelig-kode-addisjon-1.webp',
      'hemmelig-kode-addisjon-2.webp',
    ],
    answerKey: 'hemmelig-kode-addisjon-1-answer-key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'mer-mindre-1.webp',
      'mer-mindre-2.webp',
      'mer-mindre-3.webp',
      'mer-mindre-4.webp',
      'mer-mindre-5.webp',
      'mer-mindre-6.webp',
    ],
    answerKey: 'mer-mindre-1-answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'mattepuslespill-1.webp',
      'mattepuslespill-2.webp',
      'mattepuslespill-3.webp',
      'mattepuslespill-4.webp',
      'mattepuslespill-1.webp',
      'mattepuslespill-2.webp',
    ],
    answerKey: 'mattepuslespill-1-answer-key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'matematikkoppgave-1.webp',
      'matematikkoppgave-2.webp',
      'matematikkoppgave-3.webp',
      'matematikkoppgave-4.webp',
      'matematikkoppgave-1.webp',
      'matematikkoppgave-2.webp',
    ],
    answerKey: 'matematikkoppgave-1-answer-key.webp',
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
      'preposisjoner-1.webp',
      'preposisjoner-2.webp',
      'preposisjoner-3.webp',
      'preposisjoner-4.webp',
      'preposisjoner-1.webp',
      'preposisjoner-2.webp',
    ],
    answerKey: 'preposisjoner-1-answer-key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'gjett-ordet-1.webp',
      'gjett-ordet-2.webp',
      'gjett-ordet-3.webp',
      'gjett-ordet-4.webp',
      'gjett-ordet-5.webp',
      'gjett-ordet-6.webp',
    ],
    answerKey: 'gjett-ordet-1-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'bokstavblanding-1.webp',
      'bokstavblanding-2.webp',
      'bokstavblanding-3.webp',
      'bokstavblanding-4.webp',
      'bokstavblanding-5.webp',
      'bokstavblanding-6.webp',
    ],
    answerKey: 'bokstavblanding-1-answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'ordleting-1.webp',
      'ordleting-2.webp',
      'ordleting-3.webp',
      'ordleting-4.webp',
      'ordleting-1.webp',
      'ordleting-2.webp',
    ],
    answerKey: 'ordleting-1-answer-key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'bildekryptogram-1.webp',
      'bildekryptogram-2.webp',
      'bildekryptogram-3.webp',
      'bildekryptogram-4.webp',
      'bildekryptogram-5.webp',
      'bildekryptogram-1.webp',
    ],
    answerKey: 'bildekryptogram-1-answer-key.webp',
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
      'stort-eller-lite-1.webp',
      'stort-eller-lite-2.webp',
      'stort-eller-lite-3.webp',
      'stort-eller-lite-4.webp',
      'stort-eller-lite-5.webp',
      'stort-eller-lite-6.webp',
    ],
    answerKey: 'stort-eller-lite-1-answer-key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'mønstertoget-1.webp',
      'mønstertoget-2.webp',
      'mønstertoget-3.webp',
      'mønstertoget-4.webp',
      'mønstertoget-5.webp',
      'mønstertoget-6.webp',
    ],
    answerKey: 'mønstertoget-1-answer-key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'mønstergåter-1.webp',
      'mønstergåter-2.webp',
      'mønstergåter-3.webp',
      'mønstergåter-4.webp',
      'mønstergåter-5.webp',
      'mønstergåter-6.webp',
    ],
    answerKey: 'mønstergåter-1-answer-key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'tegn-og-fargelegg-1.webp',
      'tegn-og-fargelegg-2.webp',
      'tegn-og-fargelegg-3.webp',
      'tegn-og-fargelegg-4.webp',
      'tegn-og-fargelegg-5.webp',
      'tegn-og-fargelegg-6.webp',
    ],
    answerKey: '',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'linjetegningøvelse-1.webp',
      'linjetegningøvelse-2.webp',
      'linjetegningøvelse-3.webp',
      'linjetegningøvelse-4.webp',
      'linjetegningøvelse-5.webp',
      'linjetegningøvelse-6.webp',
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
      'bildediagram-1.webp',
      'bildediagram-2.webp',
      'bildediagram-3.webp',
      'bildediagram-4.webp',
      'bildediagram-1.webp',
      'bildediagram-2.webp',
    ],
    answerKey: 'bildediagram-1-answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'finn-parene-1.webp',
      'finn-parene-2.webp',
      'finn-parene-3.webp',
      'finn-parene-4.webp',
      'finn-parene-1.webp',
      'finn-parene-2.webp',
    ],
    answerKey: 'finn-parene-1-answer-key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'rutenettspuslespill-1.webp',
      'rutenettspuslespill-2.webp',
      'rutenettspuslespill-3.webp',
      'rutenettspuslespill-4.webp',
      'rutenettspuslespill-5.webp',
      'rutenettspuslespill-6.webp',
    ],
    answerKey: 'rutenettspuslespill-1-answer-key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'fullfør-bildene-1.webp',
      'fullfør-bildene-2.webp',
      'fullfør-bildene-3.webp',
      'fullfør-bildene-4.webp',
      'fullfør-bildene-1.webp',
      'fullfør-bildene-2.webp',
    ],
    answerKey: 'fullfør-bildene-1-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'bildebingo-1.webp',
      'bildebingo-2.webp',
      'bildebingo-3.webp',
      'bildebingo-4.webp',
      'bildebingo-1.webp',
      'bildebingo-2.webp',
    ],
    answerKey: 'bildebingo-1-callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'sorter-bilder-1.webp',
      'sorter-bilder-2.webp',
      'sorter-bilder-3.webp',
      'sorter-bilder-4.webp',
      'sorter-bilder-5.webp',
      'sorter-bilder-1.webp',
    ],
    answerKey: 'sorter-bilder-1-answer-key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'manglende-deler-1.webp',
      'manglende-deler-2.webp',
      'manglende-deler-3.webp',
      'manglende-deler-4.webp',
      'manglende-deler-5.webp',
      'manglende-deler-6.webp',
    ],
    answerKey: 'manglende-deler-1-answer-key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'finn-den-rare-1.webp',
      'finn-den-rare-2.webp',
      'finn-den-rare-3.webp',
      'finn-den-rare-4.webp',
      'finn-den-rare-5.webp',
      'finn-den-rare-1.webp',
    ],
    answerKey: 'finn-den-rare-1-answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'bilde-sudoku-1.webp',
      'bilde-sudoku-2.webp',
      'bilde-sudoku-3.webp',
      'bilde-sudoku-4.webp',
      'bilde-sudoku-1.webp',
      'bilde-sudoku-2.webp',
    ],
    answerKey: 'bilde-sudoku-1-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'bildesti-1.webp',
      'bildesti-2.webp',
      'bildesti-3.webp',
      'bildesti-4.webp',
      'bildesti-5.webp',
      'bildesti-6.webp',
    ],
    answerKey: 'bildesti-1-answer-key.webp',
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
      'finn-de-skjulte-objektene-1.webp',
      'finn-de-skjulte-objektene-2.webp',
      'finn-de-skjulte-objektene-3.webp',
      'finn-de-skjulte-objektene-1.webp',
      'finn-de-skjulte-objektene-2.webp',
      'finn-de-skjulte-objektene-3.webp',
    ],
    answerKey: 'finn-de-skjulte-objektene-1-answer-key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'bildekryssord-1.webp',
      'bildekryssord-2.webp',
      'bildekryssord-3.webp',
      'bildekryssord-4.webp',
      'bildekryssord-5.webp',
      'bildekryssord-1.webp',
    ],
    answerKey: 'bildekryssord-1-answer-key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'skattejakt-1.webp',
      'skattejakt-2.webp',
      'skattejakt-3.webp',
      'skattejakt-4.webp',
      'skattejakt-5.webp',
      'skattejakt-1.webp',
    ],
    answerKey: 'skattejakt-1-answer-key.webp',
  },
};
