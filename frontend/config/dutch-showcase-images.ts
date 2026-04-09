/**
 * dutch-showcase-images.ts — Dutch image filename mappings for all 33 apps.
 *
 * Maps each app ID/folder to its available Dutch sample image filenames.
 * Used by showcase-configs.ts, tool-showcase-configs.ts, and guide-showcase-configs.ts.
 *
 * Files live at /samples/dutch/{folder}/{filename}
 * ALL filenames verified via `ls` on server — NEVER guessed.
 */

export interface DutchImageSet {
  folder: string;
  /** 6+ worksheet images (no answer keys) for use across hero/tiered/spotlight/gallery */
  imgs: string[];
  /** Answer key image filename */
  answerKey: string;
}

export const dutchImages: Record<string, DutchImageSet> = {
  addition: {
    folder: 'addition',
    imgs: [
      'optellen-is-leuk-1.webp',
      'optellen-is-leuk-2.webp',
      'optellen-is-leuk-3.webp',
      'optellen-is-leuk-4.webp',
      'optellen-is-leuk-5.webp',
      'optellen-is-leuk-1.webp',
    ],
    answerKey: 'optellen-is-leuk-1-answer-key.webp',
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'aftrekken-is-leuk-1.webp',
      'aftrekken-is-leuk-2.webp',
      'aftrekken-is-leuk-3.webp',
      'aftrekken-is-leuk-4.webp',
      'aftrekken-is-leuk-5.webp',
      'aftrekken-is-leuk-6.webp',
    ],
    answerKey: 'aftrekken-is-leuk-1-answer-key.webp',
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'geheime-code-optellen-1.webp',
      'geheime-code-optellen-2.webp',
      'geheime-code-optellen-3.webp',
      'geheime-code-optellen-4.webp',
      'geheime-code-optellen-1.webp',
      'geheime-code-optellen-2.webp',
    ],
    answerKey: 'geheime-code-optellen-1-answer-key.webp',
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'meer-minder-1.webp',
      'meer-minder-2.webp',
      'meer-minder-3.webp',
      'meer-minder-4.webp',
      'meer-minder-5.webp',
      'meer-minder-1.webp',
    ],
    answerKey: 'meer-minder-1-answer-key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'wiskundepuzzels-1.webp',
      'wiskundepuzzels-2.webp',
      'wiskundepuzzels-3.webp',
      'wiskundepuzzels-4.webp',
      'wiskundepuzzels-5.webp',
      'wiskundepuzzels-1.webp',
    ],
    answerKey: 'wiskundepuzzels-1-answer-key.webp',
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'wiskundeblad-1.webp',
      'wiskundeblad-2.webp',
      'wiskundeblad-3.webp',
      'wiskundeblad-4.webp',
      'wiskundeblad-1.webp',
      'wiskundeblad-2.webp',
    ],
    answerKey: 'wiskundeblad-1-answer-key.webp',
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'alfabettrein-1.webp',
      'alfabettrein-2.webp',
      'alfabettrein-3.webp',
      'alfabettrein-4.webp',
      'alfabettrein-1.webp',
      'alfabettrein-2.webp',
    ],
    answerKey: 'alfabettrein-1-answer-key.webp',
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'voorzetsels-1.webp',
      'voorzetsels-2.webp',
      'voorzetsels-3.webp',
      'voorzetsels-4.webp',
      'voorzetsels-1.webp',
      'voorzetsels-2.webp',
    ],
    answerKey: 'voorzetsels-1-answer-key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'raad-het-woord-1.webp',
      'raad-het-woord-2.webp',
      'raad-het-woord-3.webp',
      'raad-het-woord-4.webp',
      'raad-het-woord-1.webp',
      'raad-het-woord-2.webp',
    ],
    answerKey: 'raad-het-woord-1-answer-key.webp',
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'letterzaak-1.webp',
      'letterzaak-2.webp',
      'letterzaak-3.webp',
      'letterzaak-4.webp',
      'letterzaak-1.webp',
      'letterzaak-2.webp',
    ],
    answerKey: 'letterzaak-1-answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'woordzoeker-1.webp',
      'woordzoeker-2.webp',
      'woordzoeker-3.webp',
      'woordzoeker-4.webp',
      'woordzoeker-1.webp',
      'woordzoeker-2.webp',
    ],
    answerKey: 'woordzoeker-1-answer-key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'plaatjes-cryptogram-1.webp',
      'plaatjes-cryptogram-2.webp',
      'plaatjes-cryptogram-3.webp',
      'plaatjes-cryptogram-4.webp',
      'plaatjes-cryptogram-5.webp',
      'plaatjes-cryptogram-1.webp',
    ],
    answerKey: 'plaatjes-cryptogram-1-answer-key.webp',
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
      'groot-of-klein-1.webp',
      'groot-of-klein-2.webp',
      'groot-of-klein-3.webp',
      'groot-of-klein-4.webp',
      'groot-of-klein-1.webp',
      'groot-of-klein-2.webp',
    ],
    answerKey: 'groot-of-klein-1-answer-key.webp',
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'patroontje-1.webp',
      'patroontje-2.webp',
      'patroontje-3.webp',
      'patroontje-4.webp',
      'patroontje-5.webp',
      'patroontje-6.webp',
    ],
    answerKey: 'patroontje-1-answer-key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'patroonpuzzels-1.webp',
      'patroonpuzzels-2.webp',
      'patroonpuzzels-3.webp',
      'patroonpuzzels-4.webp',
      'patroonpuzzels-1.webp',
      'patroonpuzzels-2.webp',
    ],
    answerKey: 'patroonpuzzels-1-answer-key.webp',
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'teken-en-kleur-1.webp',
      'teken-en-kleur-2.webp',
      'teken-en-kleur-3.webp',
      'teken-en-kleur-4.webp',
      'teken-en-kleur-5.webp',
      'teken-en-kleur-6.webp',
    ],
    answerKey: 'teken-en-kleur-1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'lijnen-tekenen-oefenen-1.webp',
      'lijnen-tekenen-oefenen-2.webp',
      'lijnen-tekenen-oefenen-3.webp',
      'lijnen-tekenen-oefenen-4.webp',
      'lijnen-tekenen-oefenen-5.webp',
      'lijnen-tekenen-oefenen-6.webp',
    ],
    answerKey: 'lijnen-tekenen-oefenen-1.webp',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring-portrait-1.webp',
      'coloring-portrait-2.webp',
      'coloring-portrait-3.webp',
      'coloring-landscape-1.webp',
      'coloring-landscape-2.webp',
      'coloring-portrait-4.webp',
    ],
    answerKey: 'coloring-portrait-1.webp',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'plaatjesgrafiek-1.webp',
      'plaatjesgrafiek-2.webp',
      'plaatjesgrafiek-3.webp',
      'plaatjesgrafiek-4.webp',
      'plaatjesgrafiek-1.webp',
      'plaatjesgrafiek-2.webp',
    ],
    answerKey: 'plaatjesgrafiek-1-answer-key.webp',
  },
  matching: {
    folder: 'matching',
    imgs: [
      'zoek-de-paren-1.webp',
      'zoek-de-paren-2.webp',
      'zoek-de-paren-3.webp',
      'zoek-de-paren-4.webp',
      'zoek-de-paren-1.webp',
      'zoek-de-paren-2.webp',
    ],
    answerKey: 'zoek-de-paren-1-answer-key.webp',
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'rasterpuzzel-1.webp',
      'rasterpuzzel-2.webp',
      'rasterpuzzel-3.webp',
      'rasterpuzzel-4.webp',
      'rasterpuzzel-5.webp',
      'rasterpuzzel-6.webp',
    ],
    answerKey: 'rasterpuzzel-1-answer-key.webp',
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'schaduw-koppelen-1.webp',
      'schaduw-koppelen-2.webp',
      'schaduw-koppelen-3.webp',
      'schaduw-koppelen-4.webp',
      'schaduw-koppelen-1.webp',
      'schaduw-koppelen-2.webp',
    ],
    answerKey: 'schaduw-koppelen-1-answer-key.webp',
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'plaatjesbingo-1.webp',
      'plaatjesbingo-2.webp',
      'plaatjesbingo-3.webp',
      'plaatjesbingo-4.webp',
      'plaatjesbingo-1-callout.webp',
      'plaatjesbingo-1.webp',
    ],
    answerKey: 'plaatjesbingo-1-callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'afbeeldingen-sorteren-1.webp',
      'afbeeldingen-sorteren-2.webp',
      'afbeeldingen-sorteren-3.webp',
      'afbeeldingen-sorteren-4.webp',
      'afbeeldingen-sorteren-1.webp',
      'afbeeldingen-sorteren-2.webp',
    ],
    answerKey: 'afbeeldingen-sorteren-1-answer-key.webp',
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'ontbrekende-stukjes-1.webp',
      'ontbrekende-stukjes-2.webp',
      'ontbrekende-stukjes-3.webp',
      'ontbrekende-stukjes-4.webp',
      'ontbrekende-stukjes-5.webp',
      'ontbrekende-stukjes-6.webp',
    ],
    answerKey: 'ontbrekende-stukjes-1-answer-key.webp',
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'vind-de-vreemde-eend-1-v15.webp',
      'vind-de-vreemde-eend-2-v16.webp',
      'vind-de-vreemde-eend-3-v17.webp',
      'vind-de-vreemde-eend-4.webp',
      'vind-de-vreemde-eend-1-v15.webp',
      'vind-de-vreemde-eend-2-v16.webp',
    ],
    answerKey: 'vind-de-vreemde-eend-1-answer-key.webp',
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'plaatjes-sudoku-1.webp',
      'plaatjes-sudoku-2.webp',
      'plaatjes-sudoku-3.webp',
      'plaatjes-sudoku-4.webp',
      'plaatjes-sudoku-1.webp',
      'plaatjes-sudoku-2.webp',
    ],
    answerKey: 'plaatjes-sudoku-1-answer-key.webp',
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'afbeeldingspad-1.webp',
      'afbeeldingspad-2.webp',
      'afbeeldingspad-3.webp',
      'afbeeldingspad-4.webp',
      'afbeeldingspad-1.webp',
      'afbeeldingspad-2.webp',
    ],
    answerKey: 'afbeeldingspad-1-answer-key.webp',
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'ik-zie,-ik-zie-1.webp',
      'ik-zie,-ik-zie-2.webp',
      'ik-zie,-ik-zie-3.webp',
      'ik-zie,-ik-zie-4.webp',
      'ik-zie,-ik-zie-1.webp',
      'ik-zie,-ik-zie-2.webp',
    ],
    answerKey: 'ik-zie,-ik-zie-1-answer-key.webp',
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      'vind-de-verborgen-voorwerpen-1.webp',
      'vind-de-verborgen-voorwerpen-2.webp',
      'vind-de-verborgen-voorwerpen-3.webp',
      'vind-de-vreemde-eend-1.webp',
      'vind-de-vreemde-eend-2.webp',
      'vind-de-vreemde-eend-3.webp',
    ],
    answerKey: 'vind-de-verborgen-voorwerpen-1-answer-key.webp',
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'plaatjes-kruiswoord-1.webp',
      'plaatjes-kruiswoord-2.webp',
      'plaatjes-kruiswoord-3.webp',
      'plaatjes-kruiswoord-4.webp',
      'plaatjes-kruiswoord-1.webp',
      'plaatjes-kruiswoord-2.webp',
    ],
    answerKey: 'plaatjes-kruiswoord-1-answer-key.webp',
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'schattenjacht-1.webp',
      'schattenjacht-2.webp',
      'schattenjacht-3.webp',
      'schattenjacht-4.webp',
      'schattenjacht-1.webp',
      'schattenjacht-2.webp',
    ],
    answerKey: 'schattenjacht-1-answer-key.webp',
  },
};
