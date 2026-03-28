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
      'Sjov Addition 1.webp',
      'Sjov Addition 2.webp',
      'Sjov Addition 3.webp',
      'Sjov Addition 4.webp',
      'Sjov Addition 5.webp',
      'Sjov Addition 1.webp',
    ],
    answerKey: 'Sjov Addition 1 answer_key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'Sjov Subtraktion 1.webp',
      'Sjov Subtraktion 2.webp',
      'Sjov Subtraktion 3.webp',
      'Sjov Subtraktion 4.webp',
      'Sjov Subtraktion 5.webp',
      'Sjov Subtraktion 1.webp',
    ],
    answerKey: 'Sjov Subtraktion 1 answer_key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'Hemmelig Kode Addition 1.webp',
      'Hemmelig Kode Addition 2.webp',
      'Hemmelig Kode Addition 3.webp',
      'Hemmelig Kode Addition 4.webp',
      'Hemmelig Kode Addition 5.webp',
      'Hemmelig Kode Addition 1.webp',
    ],
    answerKey: 'Hemmelig Kode Addition 1 answer_key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'Mere Mindre 1.webp',
      'Mere Mindre 2.webp',
      'Mere Mindre 3.webp',
      'Mere Mindre 4.webp',
      'Mere Mindre 5.webp',
      'Mere Mindre 6.webp',
    ],
    answerKey: 'Mere Mindre 1 answer_key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'Mattepuslespil 1.webp',
      'Mattepuslespil 2.webp',
      'Mattepuslespil 3.webp',
      'Mattepuslespil 4.webp',
      'Mattepuslespil 5.webp',
      'Mattepuslespil 1.webp',
    ],
    answerKey: 'Mattepuslespil 1 answer_key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'Matematikopgave 1.webp',
      'Matematikopgave 2.webp',
      'Matematikopgave 3.webp',
      'Matematikopgave 4.webp',
      'Matematikopgave 1.webp',
      'Matematikopgave 2.webp',
    ],
    answerKey: 'Matematikopgave 1 answer_key.webp',
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
      'Præpositioner 1.webp',
      'Præpositioner 2.webp',
      'Præpositioner 3.webp',
      'Præpositioner 4.webp',
      'Præpositioner 1.webp',
      'Præpositioner 2.webp',
    ],
    answerKey: 'Præpositioner 1 answer_key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'Gæt Ordet 1.webp',
      'Gæt Ordet 2.webp',
      'Gæt Ordet 3.webp',
      'Gæt Ordet 4.webp',
      'Gæt Ordet 5.webp',
      'Gæt Ordet 6.webp',
    ],
    answerKey: 'Gæt Ordet 1 answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'Bogstavrod 1.webp',
      'Bogstavrod 2.webp',
      'Bogstavrod 3.webp',
      'Bogstavrod 4.webp',
      'Bogstavrod 5.webp',
      'Bogstavrod 1.webp',
    ],
    answerKey: 'Bogstavrod 1 answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'Ordsøgning 1.webp',
      'Ordsøgning 2.webp',
      'Ordsøgning 3.webp',
      'Ordsøgning 4.webp',
      'Ordsøgning 1.webp',
      'Ordsøgning 2.webp',
    ],
    answerKey: 'Ordsøgning 1 answer_key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'Billed-Kryptogram 1.webp',
      'Billed-Kryptogram 2.webp',
      'Billed-Kryptogram 3.webp',
      'Billed-Kryptogram 4.webp',
      'Billed-Kryptogram 5.webp',
      'Billed-Kryptogram 1.webp',
    ],
    answerKey: 'Billed-Kryptogram 1 answer_key.webp',
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
      'Stort eller Lille 1.webp',
      'Stort eller Lille 2.webp',
      'Stort eller Lille 3.webp',
      'Stort eller Lille 4.webp',
      'Stort eller Lille 5.webp',
      'Stort eller Lille 6.webp',
    ],
    answerKey: 'Stort eller Lille 1 answer_key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'Mønstertoget 1.webp',
      'Mønstertoget 2.webp',
      'Mønstertoget 3.webp',
      'Mønstertoget 4.webp',
      'Mønstertoget 5.webp',
      'Mønstertoget 1.webp',
    ],
    answerKey: 'Mønstertoget 1 answer_key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'Mønstergåder 1.webp',
      'Mønstergåder 2.webp',
      'Mønstergåder 3.webp',
      'Mønstergåder 4.webp',
      'Mønstergåder 5.webp',
      'Mønstergåder 6.webp',
    ],
    answerKey: 'Mønstergåder 1 answer_key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Tegn og Farvlæg 1.webp',
      'Tegn og Farvlæg 2.webp',
      'Tegn og Farvlæg 3.webp',
      'Tegn og Farvlæg 4.webp',
      'Tegn og Farvlæg 5.webp',
      'Tegn og Farvlæg 6.webp',
    ],
    answerKey: '',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'Linjetegningsøvelse 1.webp',
      'Linjetegningsøvelse 2.webp',
      'Linjetegningsøvelse 4.webp',
      'Linjetegningsøvelse 5.webp',
      'Linjetegningsøvelse 6.webp',
      'Linjetegningsøvelse 7.webp',
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
      'Billediagram 1.webp',
      'Billediagram 2.webp',
      'Billediagram 3.webp',
      'Billediagram 4.webp',
      'Billediagram 1.webp',
      'Billediagram 2.webp',
    ],
    answerKey: 'Billediagram 1 answer_key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Find Parrene 1.webp',
      'Find Parrene 2.webp',
      'Find Parrene 3.webp',
      'Find Parrene 4.webp',
      'Find Parrene 1.webp',
      'Find Parrene 2.webp',
    ],
    answerKey: 'Find Parrene 1 answer_key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Gitterpuslespil 1.webp',
      'Gitterpuslespil 2.webp',
      'Gitterpuslespil 3.webp',
      'Gitterpuslespil 4.webp',
      'Gitterpuslespil 5.webp',
      'Gitterpuslespil 6.webp',
    ],
    answerKey: 'Gitterpuslespil 1 answer_key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'Gør Billederne Hele 1.webp',
      'Gør Billederne Hele 2.webp',
      'Gør Billederne Hele 3.webp',
      'Gør Billederne Hele 4.webp',
      'Gør Billederne Hele 1.webp',
      'Gør Billederne Hele 2.webp',
    ],
    answerKey: 'Gør Billederne Hele 1 answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'Billedbingo 1.webp',
      'Billedbingo 2.webp',
      'Billedbingo 3.webp',
      'Billedbingo 4.webp',
      'Billedbingo 1.webp',
      'Billedbingo 2.webp',
    ],
    answerKey: 'Billedbingo 1 callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'Sorter Billeder 1.webp',
      'Sorter Billeder 2.webp',
      'Sorter Billeder 3.webp',
      'Sorter Billeder 4.webp',
      'Sorter Billeder 1.webp',
      'Sorter Billeder 2.webp',
    ],
    answerKey: 'Sorter Billeder 1 answer_key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'Manglende Dele 1.webp',
      'Manglende Dele 2.webp',
      'Manglende Dele 3.webp',
      'Manglende Dele 4.webp',
      'Manglende Dele 5.webp',
      'Manglende Dele 6.webp',
    ],
    answerKey: 'Manglende Dele 1 answer_key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'Find den Ulige 1.webp',
      'Find den Ulige 2.webp',
      'Find den Ulige 3.webp',
      'Find den Ulige 4.webp',
      'Find den Ulige 5.webp',
      'Find den Ulige 6.webp',
    ],
    answerKey: 'Find den Ulige 1 answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'Billede-Sudoku 1.webp',
      'Billede-Sudoku 2.webp',
      'Billede-Sudoku 3.webp',
      'Billede-Sudoku 4.webp',
      'Billede-Sudoku 5.webp',
      'Billede-Sudoku 1.webp',
    ],
    answerKey: 'Billede-Sudoku 1 answer_key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'Billedsti 1.webp',
      'Billedsti 2.webp',
      'Billedsti 3.webp',
      'Billedsti 4.webp',
      'Billedsti 5.webp',
      'Billedsti 1.webp',
    ],
    answerKey: 'Billedsti 1 answer_key.webp',
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
      'Find de Skjulte Objekter 1.webp',
      'Find de Skjulte Objekter 2.webp',
      'Find de Skjulte Objekter 3.webp',
      'Find de Skjulte Objekter 1.webp',
      'Find de Skjulte Objekter 2.webp',
      'Find de Skjulte Objekter 3.webp',
    ],
    answerKey: 'Find de Skjulte Objekter 1 answer_key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'Billedkrydsord 1.webp',
      'Billedkrydsord 2.webp',
      'Billedkrydsord 3.webp',
      'Billedkrydsord 4.webp',
      'Billedkrydsord 5.webp',
      'Billedkrydsord 1.webp',
    ],
    answerKey: 'Billedkrydsord 1 answer_key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'Skattejagt 1.webp',
      'Skattejagt 2.webp',
      'Skattejagt 3.webp',
      'Skattejagt 4.webp',
      'Skattejagt 1.webp',
      'Skattejagt 2.webp',
    ],
    answerKey: 'Skattejagt 1 answer_key.webp',
  },
};
