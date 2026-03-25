/**
 * italian-showcase-images.ts — Italian image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available Italian sample image filenames.
 * Used by showcase-configs.ts for Italian locale showcase sections.
 *
 * Files live at /samples/italian/{folder}/{filename}
 */

export interface ItalianImageSet {
  folder: string;
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const italianImages: Record<string, ItalianImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'Addizione Divertente 1.webp',
      'Addizione Divertente 2.webp',
      'Addizione Divertente 3.webp',
      'Addizione Divertente 4.webp',
      'Addizione Divertente 1.webp',
      'Addizione Divertente 2.webp',
    ],
    answerKey: "Addizione Divertente 1 answer_key.webp",
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'Sottrazioni Divertenti 1.webp',
      'Sottrazioni Divertenti 2.webp',
      'Sottrazioni Divertenti 3.webp',
      'Sottrazioni Divertenti 4.webp',
      'Sottrazioni Divertenti 5.webp',
      'Sottrazioni Divertenti 1.webp',
    ],
    answerKey: "Sottrazioni Divertenti 1 answer_key.webp",
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      "Codice Segreto Addizione 1.webp",
      "Codice Segreto Addizione 2.webp",
      "Codice Segreto Addizione 3.webp",
      "Codice Segreto Addizione 4.webp",
      "Codice Segreto Addizione 1.webp",
      "Codice Segreto Addizione 2.webp",
    ],
    answerKey: "Codice Segreto Addizione 1 answer_key.webp",
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'Più Meno 1.webp',
      'Più Meno 2.webp',
      'Più Meno 3.webp',
      'Più Meno 4.webp',
      'Più Meno 5.webp',
      'Più Meno 1.webp',
    ],
    answerKey: 'Più Meno 1 answer_key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'Rompicapi Matematici 1.webp',
      'Rompicapi Matematici 2.webp',
      'Rompicapi Matematici 3.webp',
      'Rompicapi Matematici 4.webp',
      'Rompicapi Matematici 5.webp',
      'Rompicapi Matematici 1.webp',
    ],
    answerKey: "Rompicapi Matematici 1 answer_key.webp",
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'Scheda di Matematica 1.webp',
      'Scheda di Matematica 2.webp',
      'Scheda di Matematica 3.webp',
      'Scheda di Matematica 4.webp',
      'Scheda di Matematica 1.webp',
      'Scheda di Matematica 2.webp',
    ],
    answerKey: "Scheda di Matematica 1 answer_key.webp",
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      "Treno dell'Alfabeto 1.webp",
      "Treno dell'Alfabeto 2.webp",
      "Treno dell'Alfabeto 3.webp",
      "Treno dell'Alfabeto 4.webp",
      "Treno dell'Alfabeto 1.webp",
      "Treno dell'Alfabeto 2.webp",
    ],
    answerKey: "Treno dell'Alfabeto 1 answer_key.webp",
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'Preposizioni 1.webp',
      'Preposizioni 2.webp',
      'Preposizioni 3.webp',
      'Preposizioni 4.webp',
      'Preposizioni 1.webp',
      'Preposizioni 2.webp',
    ],
    answerKey: "Preposizioni 1 answer_key.webp",
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'Indovina la Parola 1.webp',
      'Indovina la Parola 2.webp',
      'Indovina la Parola 3.webp',
      'Indovina la Parola 4.webp',
      'Indovina la Parola 1.webp',
      'Indovina la Parola 2.webp',
    ],
    answerKey: "Indovina la Parola 1 answer-key.webp",
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'Lettere Mescolate 1.webp',
      'Lettere Mescolate 2.webp',
      'Lettere Mescolate 3.webp',
      'Lettere Mescolate 4.webp',
      'Lettere Mescolate 1.webp',
      'Lettere Mescolate 2.webp',
    ],
    answerKey: "Lettere Mescolate 1 answer-key.webp",
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'Cerca Parole 1.webp',
      'Cerca Parole 2.webp',
      'Cerca Parole 3.webp',
      'Cerca Parole 4.webp',
      'Cerca Parole 5.webp',
      'Cerca Parole 1.webp',
    ],
    answerKey: "Cerca Parole 1 answer_key.webp",
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      "Crittogramma Illustrato 1.webp",
      "Crittogramma Illustrato 2.webp",
      "Crittogramma Illustrato 3.webp",
      "Crittogramma Illustrato 4.webp",
      "Crittogramma Illustrato 5.webp",
      "Crittogramma Illustrato 1.webp",
    ],
    answerKey: "Crittogramma Illustrato 1 answer_key.webp",
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      "Cruciverba con Immagini 1.webp",
      "Cruciverba con Immagini 2.webp",
      "Cruciverba con Immagini 3.webp",
      "Cruciverba con Immagini 4.webp",
      "Cruciverba con Immagini 1.webp",
      "Cruciverba con Immagini 2.webp",
    ],
    answerKey: "Cruciverba con Immagini 1 answer_key.webp",
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
      'Grande o Piccolo 1.webp',
      'Grande o Piccolo 2.webp',
      'Grande o Piccolo 3.webp',
      'Grande o Piccolo 4.webp',
      'Grande o Piccolo 1.webp',
      'Grande o Piccolo 2.webp',
    ],
    answerKey: "Grande o Piccolo 1 answer_key.webp",
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'Treno dei Modelli 1.webp',
      'Treno dei Modelli 2.webp',
      'Treno dei Modelli 3.webp',
      'Treno dei Modelli 4.webp',
      'Treno dei Modelli 5.webp',
      'Treno dei Modelli 1.webp',
    ],
    answerKey: "Treno dei Modelli 1 answer_key.webp",
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'Puzzle di Schemi 1.webp',
      'Puzzle di Schemi 2.webp',
      'Puzzle di Schemi 3.webp',
      'Puzzle di Schemi 4.webp',
      'Puzzle di Schemi 1.webp',
      'Puzzle di Schemi 2.webp',
    ],
    answerKey: "Puzzle di Schemi 1 answer_key.webp",
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Disegna e Colora 1.webp',
      'Disegna e Colora 2.webp',
      'Disegna e Colora 3.webp',
      'Disegna e Colora 4.webp',
      'Disegna e Colora 5.webp',
      'Disegna e Colora 6.webp',
    ],
    answerKey: 'Disegna e Colora 1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      "Pratica del Disegno di Linee 2.webp",
      "Pratica del Disegno di Linee 3.webp",
      "Pratica del Disegno di Linee 4.webp",
      "Pratica del Disegno di Linee 5.webp",
      "Pratica del Disegno di Linee 6.webp",
      "Pratica del Disegno di Linee 7.webp",
    ],
    answerKey: "Pratica del Disegno di Linee 2.webp",
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
      'Grafico con Immagini 1.webp',
      'Grafico con Immagini 2.webp',
      'Grafico con Immagini 3.webp',
      'Grafico con Immagini 4.webp',
      'Grafico con Immagini 1.webp',
      'Grafico con Immagini 2.webp',
    ],
    answerKey: "Grafico con Immagini 1 answer_key.webp",
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Trova le Coppie 1.webp',
      'Trova le Coppie 2.webp',
      'Trova le Coppie 3.webp',
      'Trova le Coppie 4.webp',
      'Trova le Coppie 1.webp',
      'Trova le Coppie 2.webp',
    ],
    answerKey: "Trova le Coppie 1 answer_key.webp",
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Puzzle a Griglia 1.webp',
      'Puzzle a Griglia 2.webp',
      'Puzzle a Griglia 3.webp',
      'Puzzle a Griglia 4.webp',
      'Puzzle a Griglia 5.webp',
      'Puzzle a Griglia 6.webp',
    ],
    answerKey: "Puzzle a Griglia 1 answer_key.webp",
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'Abbina le Ombre 1.webp',
      'Abbina le Ombre 2.webp',
      'Abbina le Ombre 3.webp',
      'Abbina le Ombre 4.webp',
      'shadow-match-worksheet.webp',
      'shadow-match-worksheet.webp',
    ],
    answerKey: 'shadow-match-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'tombola 1.webp',
      'tombola 2.webp',
      'tombola 3.webp',
      'tombola 4.webp',
      'tombola 1.webp',
      'tombola 1 callout.webp',
    ],
    answerKey: 'tombola 1 callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      "Classificazione Immagini 1.webp",
      "Classificazione Immagini 2.webp",
      "Classificazione Immagini 3.webp",
      "Classificazione Immagini 4.webp",
      "Classificazione Immagini 1.webp",
      "Classificazione Immagini 2.webp",
    ],
    answerKey: "Classificazione Immagini 1 answer_key.webp",
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'Pezzi Mancanti 1.webp',
      'Pezzi Mancanti 2.webp',
      'Pezzi Mancanti 3.webp',
      'Pezzi Mancanti 4.webp',
      'Pezzi Mancanti 1.webp',
      'Pezzi Mancanti 2.webp',
    ],
    answerKey: "Pezzi Mancanti 1 answer_key.webp",
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'Trova il Diverso 1.webp',
      'Trova il Diverso 2.webp',
      'Trova il Diverso 3.webp',
      'Trova il Diverso 4.webp',
      'Trova il Diverso 5.webp',
      'Trova il Diverso 1.webp',
    ],
    answerKey: "Trova il Diverso 1 answer-key.webp",
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'Sudoku con Immagini 1.webp',
      'Sudoku con Immagini 2.webp',
      'Sudoku con Immagini 3.webp',
      'Sudoku con Immagini 4.webp',
      'Sudoku con Immagini 1.webp',
      'Sudoku con Immagini 2.webp',
    ],
    answerKey: "Sudoku con Immagini 1 answer_key.webp",
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'Percorso di Immagini 1.webp',
      'Percorso di Immagini 2.webp',
      'Percorso di Immagini 3.webp',
      'Percorso di Immagini 4.webp',
      'Percorso di Immagini 5.webp',
      'Percorso di Immagini 1.webp',
    ],
    answerKey: "Percorso di Immagini 1 answer_key.webp",
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'Vedo Vedo 1.webp',
      'Vedo Vedo 2.webp',
      'Vedo Vedo 3.webp',
      'Vedo Vedo 4.webp',
      'Vedo Vedo 1.webp',
      'Vedo Vedo 2.webp',
    ],
    answerKey: 'Vedo Vedo 1 answer_key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      "Trova gli Oggetti Nascosti 1.webp",
      "Trova gli Oggetti Nascosti 2.webp",
      "Trova gli Oggetti Nascosti 3.webp",
      'Trova il Diverso (1).webp',
      'Trova il Diverso (2).webp',
      'Trova il Diverso.webp',
    ],
    answerKey: "Trova gli Oggetti Nascosti 1 answer_key.webp",
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'Caccia al Tesoro 1.webp',
      'Caccia al Tesoro 2.webp',
      'Caccia al Tesoro 3.webp',
      'Caccia al Tesoro 4.webp',
      'Caccia al Tesoro 1.webp',
      'Caccia al Tesoro 2.webp',
    ],
    answerKey: "Caccia al Tesoro 1 answer_key.webp",
  },
};
