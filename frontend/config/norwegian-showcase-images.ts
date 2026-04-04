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
      'Gøy Addisjon 1.webp',
      'Gøy Addisjon 2.webp',
      'Gøy Addisjon 3.webp',
      'Gøy Addisjon 4.webp',
      'Gøy Addisjon 5.webp',
      'Gøy Addisjon 6.webp',
    ],
    answerKey: 'Gøy Addisjon 1 answer_key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'Moro med Subtraksjon 1.webp',
      'Moro med Subtraksjon 2.webp',
      'Moro med Subtraksjon 3.webp',
      'Moro med Subtraksjon 4.webp',
      'Moro med Subtraksjon 5.webp',
      'Moro med Subtraksjon 6.webp',
    ],
    answerKey: 'Moro med Subtraksjon 1 answer_key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'Hemmelig Kode Addisjon 1.webp',
      'Hemmelig Kode Addisjon 2.webp',
      'Hemmelig Kode Addisjon 3.webp',
      'Hemmelig Kode Addisjon 4.webp',
      'Hemmelig Kode Addisjon 1.webp',
      'Hemmelig Kode Addisjon 2.webp',
    ],
    answerKey: 'Hemmelig Kode Addisjon 1 answer_key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'Mer Mindre 1.webp',
      'Mer Mindre 2.webp',
      'Mer Mindre 3.webp',
      'Mer Mindre 4.webp',
      'Mer Mindre 5.webp',
      'Mer Mindre 6.webp',
    ],
    answerKey: 'Mer Mindre 1 answer_key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'Mattepuslespill 1.webp',
      'Mattepuslespill 2.webp',
      'Mattepuslespill 3.webp',
      'Mattepuslespill 4.webp',
      'Mattepuslespill 1.webp',
      'Mattepuslespill 2.webp',
    ],
    answerKey: 'Mattepuslespill 1 answer_key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'Matematikkoppgave 1.webp',
      'Matematikkoppgave 2.webp',
      'Matematikkoppgave 3.webp',
      'Matematikkoppgave 4.webp',
      'Matematikkoppgave 1.webp',
      'Matematikkoppgave 2.webp',
    ],
    answerKey: 'Matematikkoppgave 1 answer_key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'Alfabettog 1.webp',
      'Alfabettog 2.webp',
      'Alfabettog 3.webp',
      'Alfabettog 4.webp',
      'Alfabettog 5.webp',
      'Alfabettog 1.webp',
    ],
    answerKey: 'Alfabettog 1 answer_key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'Preposisjoner 1.webp',
      'Preposisjoner 2.webp',
      'Preposisjoner 3.webp',
      'Preposisjoner 4.webp',
      'Preposisjoner 1.webp',
      'Preposisjoner 2.webp',
    ],
    answerKey: 'Preposisjoner 1 answer_key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'Gjett Ordet 1.webp',
      'Gjett Ordet 2.webp',
      'Gjett Ordet 3.webp',
      'Gjett Ordet 4.webp',
      'Gjett Ordet 5.webp',
      'Gjett Ordet 6.webp',
    ],
    answerKey: 'Gjett Ordet 1 answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'Bokstavblanding 1.webp',
      'Bokstavblanding 2.webp',
      'Bokstavblanding 3.webp',
      'Bokstavblanding 4.webp',
      'Bokstavblanding 5.webp',
      'Bokstavblanding 6.webp',
    ],
    answerKey: 'Bokstavblanding 1 answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'Ordleting 1.webp',
      'Ordleting 2.webp',
      'Ordleting 3.webp',
      'Ordleting 4.webp',
      'Ordleting 1.webp',
      'Ordleting 2.webp',
    ],
    answerKey: 'Ordleting 1 answer_key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'Bildekryptogram 1.webp',
      'Bildekryptogram 2.webp',
      'Bildekryptogram 3.webp',
      'Bildekryptogram 4.webp',
      'Bildekryptogram 5.webp',
      'Bildekryptogram 1.webp',
    ],
    answerKey: 'Bildekryptogram 1 answer_key.webp',
  },
  writing: {
    folder: 'writing',
    imgs: [
      'writing.webp',
      'writing custom.webp',
      'writing beginning letter.webp',
      'writing.webp',
      'writing custom.webp',
      'writing beginning letter.webp',
    ],
    answerKey: '',
  },
  'big-small': {
    folder: 'big small',
    imgs: [
      'Stort eller Lite 1.webp',
      'Stort eller Lite 2.webp',
      'Stort eller Lite 3.webp',
      'Stort eller Lite 4.webp',
      'Stort eller Lite 5.webp',
      'Stort eller Lite 6.webp',
    ],
    answerKey: 'Stort eller Lite 1 answer_key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'Mønstertoget 1.webp',
      'Mønstertoget 2.webp',
      'Mønstertoget 3.webp',
      'Mønstertoget 4.webp',
      'Mønstertoget 5.webp',
      'Mønstertoget 6.webp',
    ],
    answerKey: 'Mønstertoget 1 answer_key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'Mønstergåter 1.webp',
      'Mønstergåter 2.webp',
      'Mønstergåter 3.webp',
      'Mønstergåter 4.webp',
      'Mønstergåter 5.webp',
      'Mønstergåter 6.webp',
    ],
    answerKey: 'Mønstergåter 1 answer_key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Tegn og Fargelegg 1.webp',
      'Tegn og Fargelegg 2.webp',
      'Tegn og Fargelegg 3.webp',
      'Tegn og Fargelegg 4.webp',
      'Tegn og Fargelegg 5.webp',
      'Tegn og Fargelegg 6.webp',
    ],
    answerKey: '',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'Linjetegningsøvelse 1.webp',
      'Linjetegningsøvelse 2.webp',
      'Linjetegningsøvelse 3.webp',
      'Linjetegningsøvelse 4.webp',
      'Linjetegningsøvelse 5.webp',
      'Linjetegningsøvelse 6.webp',
    ],
    answerKey: '',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring portrait 1.webp',
      'coloring portrait 2.webp',
      'coloring portrait 3.webp',
      'coloring portrait 4.webp',
      'coloring portrait 5.webp',
      'coloring landscape 1.webp',
    ],
    answerKey: '',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'Bildediagram 1.webp',
      'Bildediagram 2.webp',
      'Bildediagram 3.webp',
      'Bildediagram 4.webp',
      'Bildediagram 1.webp',
      'Bildediagram 2.webp',
    ],
    answerKey: 'Bildediagram 1 answer_key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Finn Parene 1.webp',
      'Finn Parene 2.webp',
      'Finn Parene 3.webp',
      'Finn Parene 4.webp',
      'Finn Parene 1.webp',
      'Finn Parene 2.webp',
    ],
    answerKey: 'Finn Parene 1 answer_key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Rutenettspuslespill 1.webp',
      'Rutenettspuslespill 2.webp',
      'Rutenettspuslespill 3.webp',
      'Rutenettspuslespill 4.webp',
      'Rutenettspuslespill 5.webp',
      'Rutenettspuslespill 6.webp',
    ],
    answerKey: 'Rutenettspuslespill 1 answer_key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'Fullfør Bildene 1.webp',
      'Fullfør Bildene 2.webp',
      'Fullfør Bildene 3.webp',
      'Fullfør Bildene 4.webp',
      'Fullfør Bildene 1.webp',
      'Fullfør Bildene 2.webp',
    ],
    answerKey: 'Fullfør Bildene 1 answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'bildebingo 1.webp',
      'bildebingo 2.webp',
      'bildebingo 3.webp',
      'bildebingo 4.webp',
      'bildebingo 1.webp',
      'bildebingo 2.webp',
    ],
    answerKey: 'bildebingo 1 callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'Sorter Bilder 1.webp',
      'Sorter Bilder 2.webp',
      'Sorter Bilder 3.webp',
      'Sorter Bilder 4.webp',
      'Sorter Bilder 5.webp',
      'Sorter Bilder 1.webp',
    ],
    answerKey: 'Sorter Bilder 1 answer_key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'Manglende Deler 1.webp',
      'Manglende Deler 2.webp',
      'Manglende Deler 3.webp',
      'Manglende Deler 4.webp',
      'Manglende Deler 5.webp',
      'Manglende Deler 6.webp',
    ],
    answerKey: 'Manglende Deler 1 answer_key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'Finn den Rare 1.webp',
      'Finn den Rare 2.webp',
      'Finn den Rare 3.webp',
      'Finn den Rare 4.webp',
      'Finn den Rare 5.webp',
      'Finn den Rare 1.webp',
    ],
    answerKey: 'Finn den Rare 1 answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'Bilde-Sudoku 1.webp',
      'Bilde-Sudoku 2.webp',
      'Bilde-Sudoku 3.webp',
      'Bilde-Sudoku 4.webp',
      'Bilde-Sudoku 1.webp',
      'Bilde-Sudoku 2.webp',
    ],
    answerKey: 'Bilde-Sudoku 1 answer_key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'Bildesti 1.webp',
      'Bildesti 2.webp',
      'Bildesti 3.webp',
      'Bildesti 4.webp',
      'Bildesti 5.webp',
      'Bildesti 6.webp',
    ],
    answerKey: 'Bildesti 1 answer_key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'Jeg ser, jeg ser 1.webp',
      'Jeg ser, jeg ser 2.webp',
      'Jeg ser, jeg ser 3.webp',
      'Jeg ser, jeg ser 4.webp',
      'Jeg ser, jeg ser 5.webp',
      'Jeg ser, jeg ser 1.webp',
    ],
    answerKey: 'Jeg ser, jeg ser 1 answer_key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'Finn de Skjulte Objektene 1.webp',
      'Finn de Skjulte Objektene 2.webp',
      'Finn de Skjulte Objektene 3.webp',
      'Finn de Skjulte Objektene 1.webp',
      'Finn de Skjulte Objektene 2.webp',
      'Finn de Skjulte Objektene 3.webp',
    ],
    answerKey: 'Finn de Skjulte Objektene 1 answer_key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'Bildekryssord 1.webp',
      'Bildekryssord 2.webp',
      'Bildekryssord 3.webp',
      'Bildekryssord 4.webp',
      'Bildekryssord 5.webp',
      'Bildekryssord 1.webp',
    ],
    answerKey: 'Bildekryssord 1 answer_key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'Skattejakt 1.webp',
      'Skattejakt 2.webp',
      'Skattejakt 3.webp',
      'Skattejakt 4.webp',
      'Skattejakt 5.webp',
      'Skattejakt 1.webp',
    ],
    answerKey: 'Skattejakt 1 answer_key.webp',
  },
};
