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
      'hauska-yhteenlasku-1.webp',
      'hauska-yhteenlasku-2.webp',
      'hauska-yhteenlasku-3.webp',
      'hauska-yhteenlasku-4.webp',
      'hauska-yhteenlasku-5.webp',
      'hauska-yhteenlasku-6.webp',
    ],
    answerKey: 'hauska-yhteenlasku-1-answer-key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'hauskaa-vähennyslaskua-1.webp',
      'hauskaa-vähennyslaskua-2.webp',
      'hauskaa-vähennyslaskua-3.webp',
      'hauskaa-vähennyslaskua-4.webp',
      'hauskaa-vähennyslaskua-5.webp',
      'hauskaa-vähennyslaskua-6.webp',
    ],
    answerKey: 'hauskaa-vähennyslaskua-1-answer-key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'salainen-koodi-yhteenlasku-1.webp',
      'salainen-koodi-yhteenlasku-2.webp',
      'salainen-koodi-yhteenlasku-3.webp',
      'salainen-koodi-yhteenlasku-4.webp',
      'salainen-koodi-yhteenlasku-5.webp',
      'salainen-koodi-yhteenlasku-6.webp',
    ],
    answerKey: 'salainen-koodi-yhteenlasku-1-answer-key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'enemmän-vähemmän-1.webp',
      'enemmän-vähemmän-2.webp',
      'enemmän-vähemmän-3.webp',
      'enemmän-vähemmän-4.webp',
      'enemmän-vähemmän-5.webp',
      'enemmän-vähemmän-6.webp',
    ],
    answerKey: 'enemmän-vähemmän-1-answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'matematiikkapulmat-1.webp',
      'matematiikkapulmat-2.webp',
      'matematiikkapulmat-3.webp',
      'matematiikkapulmat-4.webp',
      'matematiikkapulmat-5.webp',
      'matematiikkapulmat-1.webp',
    ],
    answerKey: 'matematiikkapulmat-1-answer-key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'matematiikkalehti-1.webp',
      'matematiikkalehti-2.webp',
      'matematiikkalehti-3.webp',
      'matematiikkalehti-4.webp',
      'matematiikkalehti-1.webp',
      'matematiikkalehti-2.webp',
    ],
    answerKey: 'matematiikkalehti-1-answer-key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'aakkostjuna-1.webp',
      'aakkostjuna-2.webp',
      'aakkostjuna-3.webp',
      'aakkostjuna-4.webp',
      'aakkostjuna-1.webp',
      'aakkostjuna-2.webp',
    ],
    answerKey: 'aakkostjuna-1-answer-key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'prepositiot-1.webp',
      'prepositiot-2.webp',
      'prepositiot-3.webp',
      'prepositiot-4.webp',
      'prepositiot-5.webp',
      'prepositiot-1.webp',
    ],
    answerKey: 'prepositiot-1-answer-key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'arvaa-sana-1.webp',
      'arvaa-sana-2.webp',
      'arvaa-sana-3.webp',
      'arvaa-sana-4.webp',
      'arvaa-sana-5.webp',
      'arvaa-sana-6.webp',
    ],
    answerKey: 'arvaa-sana-2-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'kirjainsekoitus-1.webp',
      'kirjainsekoitus-2.webp',
      'kirjainsekoitus-3.webp',
      'kirjainsekoitus-4.webp',
      'kirjainsekoitus-5.webp',
      'kirjainsekoitus-1.webp',
    ],
    answerKey: 'kirjainsekoitus-1-answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'sanahaku-1.webp',
      'sanahaku-2.webp',
      'sanahaku-3.webp',
      'sanahaku-4.webp',
      'sanahaku-5.webp',
      'sanahaku-1.webp',
    ],
    answerKey: 'sanahaku-1-answer-key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'kuvakryptogrammi-1.webp',
      'kuvakryptogrammi-2.webp',
      'kuvakryptogrammi-3.webp',
      'kuvakryptogrammi-4.webp',
      'kuvakryptogrammi-5.webp',
      'kuvakryptogrammi-1.webp',
    ],
    answerKey: 'kuvakryptogrammi-1-answer-key.webp',
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
      'iso-vai-pieni-1.webp',
      'iso-vai-pieni-2.webp',
      'iso-vai-pieni-3.webp',
      'iso-vai-pieni-4.webp',
      'iso-vai-pieni-5.webp',
      'iso-vai-pieni-1.webp',
    ],
    answerKey: 'iso-vai-pieni-1-answer-key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'kuviojuna-1.webp',
      'kuviojuna-2.webp',
      'kuviojuna-3.webp',
      'kuviojuna-4.webp',
      'kuviojuna-5.webp',
      'kuviojuna-6.webp',
    ],
    answerKey: 'kuviojuna-1-answer-key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'kuviotehtävät-1.webp',
      'kuviotehtävät-2.webp',
      'kuviotehtävät-3.webp',
      'kuviotehtävät-4.webp',
      'kuviotehtävät-5.webp',
      'kuviotehtävät-6.webp',
    ],
    answerKey: 'kuviotehtävät-1-answer-key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'piirrä-ja-väritä-1.webp',
      'piirrä-ja-väritä-2.webp',
      'piirrä-ja-väritä-3.webp',
      'piirrä-ja-väritä-4.webp',
      'piirrä-ja-väritä-5.webp',
      'piirrä-ja-väritä-6.webp',
    ],
    answerKey: '',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'viivojen-piirtämisharjoitus-1.webp',
      'viivojen-piirtämisharjoitus-2.webp',
      'viivojen-piirtämisharjoitus-3.webp',
      'viivojen-piirtämisharjoitus-4.webp',
      'viivojen-piirtämisharjoitus-5.webp',
      'viivojen-piirtämisharjoitus-6.webp',
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
      'kuvakaavio-1.webp',
      'kuvakaavio-2.webp',
      'kuvakaavio-3.webp',
      'kuvakaavio-4.webp',
      'kuvakaavio-1.webp',
      'kuvakaavio-2.webp',
    ],
    answerKey: 'kuvakaavio-1-answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'yhdistä-parit-1.webp',
      'yhdistä-parit-2.webp',
      'yhdistä-parit-3.webp',
      'yhdistä-parit-4.webp',
      'yhdistä-parit-1.webp',
      'yhdistä-parit-2.webp',
    ],
    answerKey: 'yhdistä-parit-1-answer-key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'ruudukkopalapeli-1.webp',
      'ruudukkopalapeli-2.webp',
      'ruudukkopalapeli-3.webp',
      'ruudukkopalapeli-4.webp',
      'ruudukkopalapeli-5.webp',
      'ruudukkopalapeli-1.webp',
    ],
    answerKey: 'ruudukkopalapeli-1-answer-key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'täydennä-kuvat-1.webp',
      'täydennä-kuvat-2.webp',
      'täydennä-kuvat-3.webp',
      'täydennä-kuvat-4.webp',
      'täydennä-kuvat-5.webp',
      'täydennä-kuvat-6.webp',
    ],
    answerKey: 'täydennä-kuvat-1-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'kuvabingo-1.webp',
      'kuvabingo-2.webp',
      'kuvabingo-3.webp',
      'kuvabingo-4.webp',
      'kuvabingo-1.webp',
      'kuvabingo-2.webp',
    ],
    answerKey: 'kuvabingo-1-callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'lajittele-kuvat-1.webp',
      'lajittele-kuvat-2.webp',
      'lajittele-kuvat-3.webp',
      'lajittele-kuvat-4.webp',
      'lajittele-kuvat-5.webp',
      'lajittele-kuvat-6.webp',
    ],
    answerKey: 'lajittele-kuvat-1-answer-key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'puuttuvat-palat-1.webp',
      'puuttuvat-palat-2.webp',
      'puuttuvat-palat-3.webp',
      'puuttuvat-palat-4.webp',
      'puuttuvat-palat-5.webp',
      'puuttuvat-palat-6.webp',
    ],
    answerKey: 'puuttuvat-palat-1-answer-key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'löydä-outo-lintu-1.webp',
      'löydä-outo-lintu-2.webp',
      'löydä-outo-lintu-3.webp',
      'löydä-outo-lintu-4.webp',
      'löydä-outo-lintu-5.webp',
      'löydä-outo-lintu-6.webp',
    ],
    answerKey: 'löydä-outo-lintu-1-answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'kuva-sudoku-1.webp',
      'kuva-sudoku-2.webp',
      'kuva-sudoku-3.webp',
      'kuva-sudoku-4.webp',
      'kuva-sudoku-5.webp',
      'kuva-sudoku-1.webp',
    ],
    answerKey: 'kuva-sudoku-1-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'kuvapolku-2.webp',
      'kuvapolku-3.webp',
      'kuvapolku-4.webp',
      'kuvapolku-5.webp',
      'kuvapolku-6.webp',
      'kuvapolku-7.webp',
    ],
    answerKey: 'kuvapolku-2-answer-key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'minä-näen-1.webp',
      'minä-näen-2.webp',
      'minä-näen-3.webp',
      'minä-näen-4.webp',
      'minä-näen-5.webp',
      'minä-näen-1.webp',
    ],
    answerKey: 'minä-näen-1-answer-key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'löydä-piilotetut-esineet-1.webp',
      'löydä-piilotetut-esineet-2.webp',
      'löydä-piilotetut-esineet-3.webp',
      'löydä-piilotetut-esineet-1.webp',
      'löydä-piilotetut-esineet-2.webp',
      'löydä-piilotetut-esineet-3.webp',
    ],
    answerKey: 'löydä-piilotetut-esineet-1-answer-key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'kuvaristikko-1.webp',
      'kuvaristikko-2.webp',
      'kuvaristikko-3.webp',
      'kuvaristikko-4.webp',
      'kuvaristikko-5.webp',
      'kuvaristikko-6.webp',
    ],
    answerKey: 'kuvaristikko-1-answer-key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'aarteenetsintä-1.webp',
      'aarteenetsintä-2.webp',
      'aarteenetsintä-3.webp',
      'aarteenetsintä-4.webp',
      'aarteenetsintä-5.webp',
      'aarteenetsintä-6.webp',
    ],
    answerKey: 'aarteenetsintä-1-answer-key.webp',
  },
};
