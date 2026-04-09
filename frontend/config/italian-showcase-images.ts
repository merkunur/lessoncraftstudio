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
      'addizione-divertente-1.webp',
      'addizione-divertente-2.webp',
      'addizione-divertente-3.webp',
      'addizione-divertente-4.webp',
      'addizione-divertente-1.webp',
      'addizione-divertente-2.webp',
    ],
    answerKey: 'addizione-divertente-1-answer-key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'sottrazioni-divertenti-1.webp',
      'sottrazioni-divertenti-2.webp',
      'sottrazioni-divertenti-3.webp',
      'sottrazioni-divertenti-4.webp',
      'sottrazioni-divertenti-5.webp',
      'sottrazioni-divertenti-1.webp',
    ],
    answerKey: 'sottrazioni-divertenti-1-answer-key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'codice-segreto-addizione-1.webp',
      'codice-segreto-addizione-2.webp',
      'codice-segreto-addizione-3.webp',
      'codice-segreto-addizione-4.webp',
      'codice-segreto-addizione-1.webp',
      'codice-segreto-addizione-2.webp',
    ],
    answerKey: 'codice-segreto-addizione-1-answer-key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'più-meno-1.webp',
      'più-meno-2.webp',
      'più-meno-3.webp',
      'più-meno-4.webp',
      'più-meno-5.webp',
      'più-meno-1.webp',
    ],
    answerKey: 'più-meno-1-answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'rompicapi-matematici-1.webp',
      'rompicapi-matematici-2.webp',
      'rompicapi-matematici-3.webp',
      'rompicapi-matematici-4.webp',
      'rompicapi-matematici-5.webp',
      'rompicapi-matematici-1.webp',
    ],
    answerKey: 'rompicapi-matematici-1-answer-key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'scheda-di-matematica-1.webp',
      'scheda-di-matematica-2.webp',
      'scheda-di-matematica-3.webp',
      'scheda-di-matematica-4.webp',
      'scheda-di-matematica-1.webp',
      'scheda-di-matematica-2.webp',
    ],
    answerKey: 'scheda-di-matematica-1-answer-key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      "Treno dell'alfabeto-1.webp",
      "Treno dell'alfabeto-2.webp",
      "Treno dell'alfabeto-3.webp",
      "Treno dell'alfabeto-4.webp",
      "Treno dell'alfabeto-1.webp",
      "Treno dell'alfabeto-2.webp",
    ],
    answerKey: "Treno dell'alfabeto-1-answer-key.webp",
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'preposizioni-1.webp',
      'preposizioni-2.webp',
      'preposizioni-3.webp',
      'preposizioni-4.webp',
      'preposizioni-1.webp',
      'preposizioni-2.webp',
    ],
    answerKey: 'preposizioni-1-answer-key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'indovina-la-parola-1.webp',
      'indovina-la-parola-2.webp',
      'indovina-la-parola-3.webp',
      'indovina-la-parola-4.webp',
      'indovina-la-parola-1.webp',
      'indovina-la-parola-2.webp',
    ],
    answerKey: 'indovina-la-parola-1-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'lettere-mescolate-1.webp',
      'lettere-mescolate-2.webp',
      'lettere-mescolate-3.webp',
      'lettere-mescolate-4.webp',
      'lettere-mescolate-1.webp',
      'lettere-mescolate-2.webp',
    ],
    answerKey: 'lettere-mescolate-1-answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'cerca-parole-1.webp',
      'cerca-parole-2.webp',
      'cerca-parole-3.webp',
      'cerca-parole-4.webp',
      'cerca-parole-5.webp',
      'cerca-parole-1.webp',
    ],
    answerKey: 'cerca-parole-1-answer-key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'crittogramma-illustrato-1.webp',
      'crittogramma-illustrato-2.webp',
      'crittogramma-illustrato-3.webp',
      'crittogramma-illustrato-4.webp',
      'crittogramma-illustrato-5.webp',
      'crittogramma-illustrato-1.webp',
    ],
    answerKey: 'crittogramma-illustrato-1-answer-key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'cruciverba-con-immagini-1.webp',
      'cruciverba-con-immagini-2.webp',
      'cruciverba-con-immagini-3.webp',
      'cruciverba-con-immagini-4.webp',
      'cruciverba-con-immagini-1.webp',
      'cruciverba-con-immagini-2.webp',
    ],
    answerKey: 'cruciverba-con-immagini-1-answer-key.webp',
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
      'grande-o-piccolo-1.webp',
      'grande-o-piccolo-2.webp',
      'grande-o-piccolo-3.webp',
      'grande-o-piccolo-4.webp',
      'grande-o-piccolo-1.webp',
      'grande-o-piccolo-2.webp',
    ],
    answerKey: 'grande-o-piccolo-1-answer-key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'treno-dei-modelli-1.webp',
      'treno-dei-modelli-2.webp',
      'treno-dei-modelli-3.webp',
      'treno-dei-modelli-4.webp',
      'treno-dei-modelli-5.webp',
      'treno-dei-modelli-1.webp',
    ],
    answerKey: 'treno-dei-modelli-1-answer-key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'puzzle-di-schemi-1.webp',
      'puzzle-di-schemi-2.webp',
      'puzzle-di-schemi-3.webp',
      'puzzle-di-schemi-4.webp',
      'puzzle-di-schemi-1.webp',
      'puzzle-di-schemi-2.webp',
    ],
    answerKey: 'puzzle-di-schemi-1-answer-key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'disegna-e-colora-1.webp',
      'disegna-e-colora-2.webp',
      'disegna-e-colora-3.webp',
      'disegna-e-colora-4.webp',
      'disegna-e-colora-5.webp',
      'disegna-e-colora-6.webp',
    ],
    answerKey: 'disegna-e-colora-1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'pratica-del-disegno-di-linee-2.webp',
      'pratica-del-disegno-di-linee-3.webp',
      'pratica-del-disegno-di-linee-4.webp',
      'pratica-del-disegno-di-linee-5.webp',
      'pratica-del-disegno-di-linee-6.webp',
      'pratica-del-disegno-di-linee-7.webp',
    ],
    answerKey: 'pratica-del-disegno-di-linee-2.webp',
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
      'grafico-con-immagini-1.webp',
      'grafico-con-immagini-2.webp',
      'grafico-con-immagini-3.webp',
      'grafico-con-immagini-4.webp',
      'grafico-con-immagini-1.webp',
      'grafico-con-immagini-2.webp',
    ],
    answerKey: 'grafico-con-immagini-1-answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'trova-le-coppie-1.webp',
      'trova-le-coppie-2.webp',
      'trova-le-coppie-3.webp',
      'trova-le-coppie-4.webp',
      'trova-le-coppie-1.webp',
      'trova-le-coppie-2.webp',
    ],
    answerKey: 'trova-le-coppie-1-answer-key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'puzzle-a-griglia-1.webp',
      'puzzle-a-griglia-2.webp',
      'puzzle-a-griglia-3.webp',
      'puzzle-a-griglia-4.webp',
      'puzzle-a-griglia-5.webp',
      'puzzle-a-griglia-6.webp',
    ],
    answerKey: 'puzzle-a-griglia-1-answer-key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'abbina-le-ombre-1.webp',
      'abbina-le-ombre-2.webp',
      'abbina-le-ombre-3.webp',
      'abbina-le-ombre-4.webp',
      'shadow-match-worksheet.webp',
      'shadow-match-worksheet.webp',
    ],
    answerKey: 'shadow-match-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'tombola-1.webp',
      'tombola-2.webp',
      'tombola-3.webp',
      'tombola-4.webp',
      'tombola-1.webp',
      'tombola-1-callout.webp',
    ],
    answerKey: 'tombola-1-callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'classificazione-immagini-1.webp',
      'classificazione-immagini-2.webp',
      'classificazione-immagini-3.webp',
      'classificazione-immagini-4.webp',
      'classificazione-immagini-1.webp',
      'classificazione-immagini-2.webp',
    ],
    answerKey: 'classificazione-immagini-1-answer-key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'pezzi-mancanti-1.webp',
      'pezzi-mancanti-2.webp',
      'pezzi-mancanti-3.webp',
      'pezzi-mancanti-4.webp',
      'pezzi-mancanti-1.webp',
      'pezzi-mancanti-2.webp',
    ],
    answerKey: 'pezzi-mancanti-1-answer-key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'trova-il-diverso-1-v13.webp',
      'trova-il-diverso-2-v14.webp',
      'trova-il-diverso-3.webp',
      'trova-il-diverso-4.webp',
      'trova-il-diverso-5.webp',
      'trova-il-diverso-1-v13.webp',
    ],
    answerKey: 'trova-il-diverso-1-answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'sudoku-con-immagini-1.webp',
      'sudoku-con-immagini-2.webp',
      'sudoku-con-immagini-3.webp',
      'sudoku-con-immagini-4.webp',
      'sudoku-con-immagini-1.webp',
      'sudoku-con-immagini-2.webp',
    ],
    answerKey: 'sudoku-con-immagini-1-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'percorso-di-immagini-1.webp',
      'percorso-di-immagini-2.webp',
      'percorso-di-immagini-3.webp',
      'percorso-di-immagini-4.webp',
      'percorso-di-immagini-5.webp',
      'percorso-di-immagini-1.webp',
    ],
    answerKey: 'percorso-di-immagini-1-answer-key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'vedo-vedo-1.webp',
      'vedo-vedo-2.webp',
      'vedo-vedo-3.webp',
      'vedo-vedo-4.webp',
      'vedo-vedo-1.webp',
      'vedo-vedo-2.webp',
    ],
    answerKey: 'vedo-vedo-1-answer-key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'trova-gli-oggetti-nascosti-1.webp',
      'trova-gli-oggetti-nascosti-2.webp',
      'trova-gli-oggetti-nascosti-3.webp',
      'trova-il-diverso-1.webp',
      'trova-il-diverso-2.webp',
      'trova-il-diverso.webp',
    ],
    answerKey: 'trova-gli-oggetti-nascosti-1-answer-key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'caccia-al-tesoro-1.webp',
      'caccia-al-tesoro-2.webp',
      'caccia-al-tesoro-3.webp',
      'caccia-al-tesoro-4.webp',
      'caccia-al-tesoro-1.webp',
      'caccia-al-tesoro-2.webp',
    ],
    answerKey: 'caccia-al-tesoro-1-answer-key.webp',
  },
};
