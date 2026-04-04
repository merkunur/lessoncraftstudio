/**
 * finnish-showcase-images.ts — Finnish image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available Finnish sample image filenames.
 * Used by showcase-configs.ts, tool-showcase-configs.ts, and guide-showcase-configs.ts.
 *
 * Files live at /samples/finnish/{folder}/{filename}
 * ALL filenames verified via `ls` on server — NEVER guessed.
 */

export interface FinnishImageSet {
  folder: string;
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const finnishImages: Record<string, FinnishImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'Hauska Yhteenlasku 1.webp',
      'Hauska Yhteenlasku 2.webp',
      'Hauska Yhteenlasku 3.webp',
      'Hauska Yhteenlasku 4.webp',
      'Hauska Yhteenlasku 5.webp',
      'Hauska Yhteenlasku 6.webp',
    ],
    answerKey: 'Hauska Yhteenlasku 1 answer_key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'Hauskaa Vähennyslaskua 1.webp',
      'Hauskaa Vähennyslaskua 2.webp',
      'Hauskaa Vähennyslaskua 3.webp',
      'Hauskaa Vähennyslaskua 4.webp',
      'Hauskaa Vähennyslaskua 5.webp',
      'Hauskaa Vähennyslaskua 6.webp',
    ],
    answerKey: 'Hauskaa Vähennyslaskua 1 answer_key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'Salainen Koodi Yhteenlasku 1.webp',
      'Salainen Koodi Yhteenlasku 2.webp',
      'Salainen Koodi Yhteenlasku 3.webp',
      'Salainen Koodi Yhteenlasku 4.webp',
      'Salainen Koodi Yhteenlasku 5.webp',
      'Salainen Koodi Yhteenlasku 6.webp',
    ],
    answerKey: 'Salainen Koodi Yhteenlasku 1 answer_key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'Enemmän Vähemmän 1.webp',
      'Enemmän Vähemmän 2.webp',
      'Enemmän Vähemmän 3.webp',
      'Enemmän Vähemmän 4.webp',
      'Enemmän Vähemmän 5.webp',
      'Enemmän Vähemmän 6.webp',
    ],
    answerKey: 'Enemmän Vähemmän 1 answer_key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'Matematiikkapulmat 1.webp',
      'Matematiikkapulmat 2.webp',
      'Matematiikkapulmat 3.webp',
      'Matematiikkapulmat 4.webp',
      'Matematiikkapulmat 5.webp',
      'Matematiikkapulmat 1.webp',
    ],
    answerKey: 'Matematiikkapulmat 1 answer_key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'Matematiikkalehti 1.webp',
      'Matematiikkalehti 2.webp',
      'Matematiikkalehti 3.webp',
      'Matematiikkalehti 4.webp',
      'Matematiikkalehti 1.webp',
      'Matematiikkalehti 2.webp',
    ],
    answerKey: 'Matematiikkalehti 1 answer_key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'Aakkostjuna 1.webp',
      'Aakkostjuna 2.webp',
      'Aakkostjuna 3.webp',
      'Aakkostjuna 4.webp',
      'Aakkostjuna 1.webp',
      'Aakkostjuna 2.webp',
    ],
    answerKey: 'Aakkostjuna 1 answer_key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'Prepositiot 1.webp',
      'Prepositiot 2.webp',
      'Prepositiot 3.webp',
      'Prepositiot 4.webp',
      'Prepositiot 5.webp',
      'Prepositiot 1.webp',
    ],
    answerKey: 'Prepositiot 1 answer_key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'Arvaa Sana 1.webp',
      'Arvaa Sana 2.webp',
      'Arvaa Sana 3.webp',
      'Arvaa Sana 4.webp',
      'Arvaa Sana 5.webp',
      'Arvaa Sana 6.webp',
    ],
    answerKey: 'Arvaa Sana 2 answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'Kirjainsekoitus 1.webp',
      'Kirjainsekoitus 2.webp',
      'Kirjainsekoitus 3.webp',
      'Kirjainsekoitus 4.webp',
      'Kirjainsekoitus 5.webp',
      'Kirjainsekoitus 1.webp',
    ],
    answerKey: 'Kirjainsekoitus 1 answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'Sanahaku 1.webp',
      'Sanahaku 2.webp',
      'Sanahaku 3.webp',
      'Sanahaku 4.webp',
      'Sanahaku 5.webp',
      'Sanahaku 1.webp',
    ],
    answerKey: 'Sanahaku 1 answer_key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'Kuvakryptogrammi 1.webp',
      'Kuvakryptogrammi 2.webp',
      'Kuvakryptogrammi 3.webp',
      'Kuvakryptogrammi 4.webp',
      'Kuvakryptogrammi 5.webp',
      'Kuvakryptogrammi 1.webp',
    ],
    answerKey: 'Kuvakryptogrammi 1 answer_key.webp',
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
      'Iso vai Pieni 1.webp',
      'Iso vai Pieni 2.webp',
      'Iso vai Pieni 3.webp',
      'Iso vai Pieni 4.webp',
      'Iso vai Pieni 5.webp',
      'Iso vai Pieni 1.webp',
    ],
    answerKey: 'Iso vai Pieni 1 answer_key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'Kuviojuna 1.webp',
      'Kuviojuna 2.webp',
      'Kuviojuna 3.webp',
      'Kuviojuna 4.webp',
      'Kuviojuna 5.webp',
      'Kuviojuna 6.webp',
    ],
    answerKey: 'Kuviojuna 1 answer_key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'Kuviotehtävät 1.webp',
      'Kuviotehtävät 2.webp',
      'Kuviotehtävät 3.webp',
      'Kuviotehtävät 4.webp',
      'Kuviotehtävät 5.webp',
      'Kuviotehtävät 6.webp',
    ],
    answerKey: 'Kuviotehtävät 1 answer_key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Piirrä ja Väritä 1.webp',
      'Piirrä ja Väritä 2.webp',
      'Piirrä ja Väritä 3.webp',
      'Piirrä ja Väritä 4.webp',
      'Piirrä ja Väritä 5.webp',
      'Piirrä ja Väritä 6.webp',
    ],
    answerKey: '',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'Viivojen Piirtämisharjoitus 1.webp',
      'Viivojen Piirtämisharjoitus 2.webp',
      'Viivojen Piirtämisharjoitus 3.webp',
      'Viivojen Piirtämisharjoitus 4.webp',
      'Viivojen Piirtämisharjoitus 5.webp',
      'Viivojen Piirtämisharjoitus 6.webp',
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
      'Kuvakaavio 1.webp',
      'Kuvakaavio 2.webp',
      'Kuvakaavio 3.webp',
      'Kuvakaavio 4.webp',
      'Kuvakaavio 1.webp',
      'Kuvakaavio 2.webp',
    ],
    answerKey: 'Kuvakaavio 1 answer_key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Yhdistä Parit 1.webp',
      'Yhdistä Parit 2.webp',
      'Yhdistä Parit 3.webp',
      'Yhdistä Parit 4.webp',
      'Yhdistä Parit 1.webp',
      'Yhdistä Parit 2.webp',
    ],
    answerKey: 'Yhdistä Parit 1 answer_key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Ruudukkopalapeli 1.webp',
      'Ruudukkopalapeli 2.webp',
      'Ruudukkopalapeli 3.webp',
      'Ruudukkopalapeli 4.webp',
      'Ruudukkopalapeli 5.webp',
      'Ruudukkopalapeli 1.webp',
    ],
    answerKey: 'Ruudukkopalapeli 1 answer_key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'Täydennä Kuvat 1.webp',
      'Täydennä Kuvat 2.webp',
      'Täydennä Kuvat 3.webp',
      'Täydennä Kuvat 4.webp',
      'Täydennä Kuvat 5.webp',
      'Täydennä Kuvat 6.webp',
    ],
    answerKey: 'Täydennä Kuvat 1 answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'kuvabingo 1.webp',
      'kuvabingo 2.webp',
      'kuvabingo 3.webp',
      'kuvabingo 4.webp',
      'kuvabingo 1.webp',
      'kuvabingo 2.webp',
    ],
    answerKey: 'kuvabingo 1 callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'Lajittele Kuvat 1.webp',
      'Lajittele Kuvat 2.webp',
      'Lajittele Kuvat 3.webp',
      'Lajittele Kuvat 4.webp',
      'Lajittele Kuvat 5.webp',
      'Lajittele Kuvat 6.webp',
    ],
    answerKey: 'Lajittele Kuvat 1 answer_key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'Puuttuvat Palat 1.webp',
      'Puuttuvat Palat 2.webp',
      'Puuttuvat Palat 3.webp',
      'Puuttuvat Palat 4.webp',
      'Puuttuvat Palat 5.webp',
      'Puuttuvat Palat 6.webp',
    ],
    answerKey: 'Puuttuvat Palat 1 answer_key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'Löydä Outo Lintu 1.webp',
      'Löydä Outo Lintu 2.webp',
      'Löydä Outo Lintu 3.webp',
      'Löydä Outo Lintu 4.webp',
      'Löydä Outo Lintu 5.webp',
      'Löydä Outo Lintu 6.webp',
    ],
    answerKey: 'Löydä Outo Lintu 1 answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'Kuva-Sudoku 1.webp',
      'Kuva-Sudoku 2.webp',
      'Kuva-Sudoku 3.webp',
      'Kuva-Sudoku 4.webp',
      'Kuva-Sudoku 5.webp',
      'Kuva-Sudoku 1.webp',
    ],
    answerKey: 'Kuva-Sudoku 1 answer_key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'Kuvapolku 2.webp',
      'Kuvapolku 3.webp',
      'Kuvapolku 4.webp',
      'Kuvapolku 5.webp',
      'Kuvapolku 6.webp',
      'Kuvapolku 7.webp',
    ],
    answerKey: 'Kuvapolku 2 answer_key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'Minä näen 1.webp',
      'Minä näen 2.webp',
      'Minä näen 3.webp',
      'Minä näen 4.webp',
      'Minä näen 5.webp',
      'Minä näen 1.webp',
    ],
    answerKey: 'Minä näen 1 answer_key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'Löydä Piilotetut Esineet 1.webp',
      'Löydä Piilotetut Esineet 2.webp',
      'Löydä Piilotetut Esineet 3.webp',
      'Löydä Piilotetut Esineet 1.webp',
      'Löydä Piilotetut Esineet 2.webp',
      'Löydä Piilotetut Esineet 3.webp',
    ],
    answerKey: 'Löydä Piilotetut Esineet 1 answer_key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'Kuvaristikko 1.webp',
      'Kuvaristikko 2.webp',
      'Kuvaristikko 3.webp',
      'Kuvaristikko 4.webp',
      'Kuvaristikko 5.webp',
      'Kuvaristikko 6.webp',
    ],
    answerKey: 'Kuvaristikko 1 answer_key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'Aarteenetsintä 1.webp',
      'Aarteenetsintä 2.webp',
      'Aarteenetsintä 3.webp',
      'Aarteenetsintä 4.webp',
      'Aarteenetsintä 5.webp',
      'Aarteenetsintä 6.webp',
    ],
    answerKey: 'Aarteenetsintä 1 answer_key.webp',
  },
};
