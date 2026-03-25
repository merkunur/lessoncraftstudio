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
      'Optellen is Leuk 1.webp',
      'Optellen is Leuk 2.webp',
      'Optellen is Leuk 3.webp',
      'Optellen is Leuk 4.webp',
      'Optellen is Leuk 5.webp',
      'Optellen is Leuk 1.webp',
    ],
    answerKey: "Optellen is Leuk 1 answer_key.webp",
  },
  subtraction: {
    folder: 'subtraction',
    imgs: [
      'Aftrekken is Leuk 1.webp',
      'Aftrekken is Leuk 2.webp',
      'Aftrekken is Leuk 3.webp',
      'Aftrekken is Leuk 4.webp',
      'Aftrekken is Leuk 5.webp',
      'Aftrekken is Leuk 6.webp',
    ],
    answerKey: "Aftrekken is Leuk 1 answer_key.webp",
  },
  'code-addition': {
    folder: 'code addition',
    imgs: [
      'Geheime Code Optellen 1.webp',
      'Geheime Code Optellen 2.webp',
      'Geheime Code Optellen 3.webp',
      'Geheime Code Optellen 4.webp',
      'Geheime Code Optellen 1.webp',
      'Geheime Code Optellen 2.webp',
    ],
    answerKey: "Geheime Code Optellen 1 answer_key.webp",
  },
  'more-less': {
    folder: 'more less',
    imgs: [
      'Meer Minder 1.webp',
      'Meer Minder 2.webp',
      'Meer Minder 3.webp',
      'Meer Minder 4.webp',
      'Meer Minder 5.webp',
      'Meer Minder 1.webp',
    ],
    answerKey: 'Meer Minder 1 answer_key.webp',
  },
  'math-puzzle': {
    folder: 'math puzzle',
    imgs: [
      'Wiskundepuzzels 1.webp',
      'Wiskundepuzzels 2.webp',
      'Wiskundepuzzels 3.webp',
      'Wiskundepuzzels 4.webp',
      'Wiskundepuzzels 5.webp',
      'Wiskundepuzzels 1.webp',
    ],
    answerKey: "Wiskundepuzzels 1 answer_key.webp",
  },
  'math-worksheet': {
    folder: 'math worksheet',
    imgs: [
      'Wiskundeblad 1.webp',
      'Wiskundeblad 2.webp',
      'Wiskundeblad 3.webp',
      'Wiskundeblad 4.webp',
      'Wiskundeblad 1.webp',
      'Wiskundeblad 2.webp',
    ],
    answerKey: "Wiskundeblad 1 answer_key.webp",
  },
  'alphabet-train': {
    folder: 'alphabet train',
    imgs: [
      'Alfabettrein 1.webp',
      'Alfabettrein 2.webp',
      'Alfabettrein 3.webp',
      'Alfabettrein 4.webp',
      'Alfabettrein 1.webp',
      'Alfabettrein 2.webp',
    ],
    answerKey: "Alfabettrein 1 answer_key.webp",
  },
  prepositions: {
    folder: 'prepositions',
    imgs: [
      'Voorzetsels 1.webp',
      'Voorzetsels 2.webp',
      'Voorzetsels 3.webp',
      'Voorzetsels 4.webp',
      'Voorzetsels 1.webp',
      'Voorzetsels 2.webp',
    ],
    answerKey: 'Voorzetsels 1 answer_key.webp',
  },
  'word-guess': {
    folder: 'word guess',
    imgs: [
      'Raad het Woord 1.webp',
      'Raad het Woord 2.webp',
      'Raad het Woord 3.webp',
      'Raad het Woord 4.webp',
      'Raad het Woord 1.webp',
      'Raad het Woord 2.webp',
    ],
    answerKey: "Raad het Woord 1 answer-key.webp",
  },
  'word-scramble': {
    folder: 'word scramble',
    imgs: [
      'Letterzaak 1.webp',
      'Letterzaak 2.webp',
      'Letterzaak 3.webp',
      'Letterzaak 4.webp',
      'Letterzaak 1.webp',
      'Letterzaak 2.webp',
    ],
    answerKey: 'Letterzaak 1 answer-key.webp',
  },
  wordsearch: {
    folder: 'wordsearch',
    imgs: [
      'Woordzoeker 1.webp',
      'Woordzoeker 2.webp',
      'Woordzoeker 3.webp',
      'Woordzoeker 4.webp',
      'Woordzoeker 1.webp',
      'Woordzoeker 2.webp',
    ],
    answerKey: 'Woordzoeker 1 answer_key.webp',
  },
  cryptogram: {
    folder: 'cryptogram',
    imgs: [
      'Plaatjes Cryptogram 1.webp',
      'Plaatjes Cryptogram 2.webp',
      'Plaatjes Cryptogram 3.webp',
      'Plaatjes Cryptogram 4.webp',
      'Plaatjes Cryptogram 5.webp',
      'Plaatjes Cryptogram 1.webp',
    ],
    answerKey: "Plaatjes Cryptogram 1 answer_key.webp",
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
      'Groot of Klein 1.webp',
      'Groot of Klein 2.webp',
      'Groot of Klein 3.webp',
      'Groot of Klein 4.webp',
      'Groot of Klein 1.webp',
      'Groot of Klein 2.webp',
    ],
    answerKey: "Groot of Klein 1 answer_key.webp",
  },
  'pattern-train': {
    folder: 'pattern train',
    imgs: [
      'Patroontje 1.webp',
      'Patroontje 2.webp',
      'Patroontje 3.webp',
      'Patroontje 4.webp',
      'Patroontje 5.webp',
      'Patroontje 6.webp',
    ],
    answerKey: 'Patroontje 1 answer_key.webp',
  },
  'pattern-worksheet': {
    folder: 'pattern worksheet',
    imgs: [
      'Patroonpuzzels 1.webp',
      'Patroonpuzzels 2.webp',
      'Patroonpuzzels 3.webp',
      'Patroonpuzzels 4.webp',
      'Patroonpuzzels 1.webp',
      'Patroonpuzzels 2.webp',
    ],
    answerKey: "Patroonpuzzels 1 answer_key.webp",
  },
  'draw-and-color': {
    folder: 'draw and color',
    imgs: [
      'Teken en Kleur 1.webp',
      'Teken en Kleur 2.webp',
      'Teken en Kleur 3.webp',
      'Teken en Kleur 4.webp',
      'Teken en Kleur 5.webp',
      'Teken en Kleur 6.webp',
    ],
    answerKey: 'Teken en Kleur 1.webp',
  },
  'drawing-lines': {
    folder: 'drawing lines',
    imgs: [
      'Lijnen Tekenen Oefenen 1.webp',
      'Lijnen Tekenen Oefenen 2.webp',
      'Lijnen Tekenen Oefenen 3.webp',
      'Lijnen Tekenen Oefenen 4.webp',
      'Lijnen Tekenen Oefenen 5.webp',
      'Lijnen Tekenen Oefenen 6.webp',
    ],
    answerKey: 'Lijnen Tekenen Oefenen 1.webp',
  },
  coloring: {
    folder: 'coloring',
    imgs: [
      'coloring portrait 1.webp',
      'coloring portrait 2.webp',
      'coloring portrait 3.webp',
      'coloring landscape 1.webp',
      'coloring landscape 2.webp',
      'coloring portrait 4.webp',
    ],
    answerKey: 'coloring portrait 1.webp',
  },
  'chart-count': {
    folder: 'chart count',
    imgs: [
      'Plaatjesgrafiek 1.webp',
      'Plaatjesgrafiek 2.webp',
      'Plaatjesgrafiek 3.webp',
      'Plaatjesgrafiek 4.webp',
      'Plaatjesgrafiek 1.webp',
      'Plaatjesgrafiek 2.webp',
    ],
    answerKey: "Plaatjesgrafiek 1 answer_key.webp",
  },
  matching: {
    folder: 'matching',
    imgs: [
      'Zoek de Paren 1.webp',
      'Zoek de Paren 2.webp',
      'Zoek de Paren 3.webp',
      'Zoek de Paren 4.webp',
      'Zoek de Paren 1.webp',
      'Zoek de Paren 2.webp',
    ],
    answerKey: "Zoek de Paren 1 answer_key.webp",
  },
  'grid-match': {
    folder: 'grid match',
    imgs: [
      'Rasterpuzzel 1.webp',
      'Rasterpuzzel 2.webp',
      'Rasterpuzzel 3.webp',
      'Rasterpuzzel 4.webp',
      'Rasterpuzzel 5.webp',
      'Rasterpuzzel 6.webp',
    ],
    answerKey: "Rasterpuzzel 1 answer_key.webp",
  },
  'shadow-match': {
    folder: 'shadow match',
    imgs: [
      'Schaduw Koppelen 1.webp',
      'Schaduw Koppelen 2.webp',
      'Schaduw Koppelen 3.webp',
      'Schaduw Koppelen 4.webp',
      'Schaduw Koppelen 1.webp',
      'Schaduw Koppelen 2.webp',
    ],
    answerKey: "Schaduw Koppelen 1 answer-key.webp",
  },
  bingo: {
    folder: 'bingo',
    imgs: [
      'Plaatjesbingo 1.webp',
      'Plaatjesbingo 2.webp',
      'Plaatjesbingo 3.webp',
      'Plaatjesbingo 4.webp',
      'Plaatjesbingo 1 callout.webp',
      'Plaatjesbingo 1.webp',
    ],
    answerKey: 'Plaatjesbingo 1 callout.webp',
  },
  'picture-sort': {
    folder: 'picture sort',
    imgs: [
      'Afbeeldingen Sorteren 1.webp',
      'Afbeeldingen Sorteren 2.webp',
      'Afbeeldingen Sorteren 3.webp',
      'Afbeeldingen Sorteren 4.webp',
      'Afbeeldingen Sorteren 1.webp',
      'Afbeeldingen Sorteren 2.webp',
    ],
    answerKey: "Afbeeldingen Sorteren 1 answer_key.webp",
  },
  'missing-pieces': {
    folder: 'missing pieces',
    imgs: [
      'Ontbrekende Stukjes 1.webp',
      'Ontbrekende Stukjes 2.webp',
      'Ontbrekende Stukjes 3.webp',
      'Ontbrekende Stukjes 4.webp',
      'Ontbrekende Stukjes 5.webp',
      'Ontbrekende Stukjes 6.webp',
    ],
    answerKey: "Ontbrekende Stukjes 1 answer_key.webp",
  },
  'odd-one-out': {
    folder: 'odd one out',
    imgs: [
      'Vind de Vreemde Eend 1.webp',
      'Vind de Vreemde Eend 2.webp',
      'Vind de Vreemde Eend 3.webp',
      'Vind de Vreemde Eend 4.webp',
      'Vind de Vreemde Eend 1.webp',
      'Vind de Vreemde Eend 2.webp',
    ],
    answerKey: "Vind de Vreemde Eend 1 answer-key.webp",
  },
  sudoku: {
    folder: 'sudoku',
    imgs: [
      'Plaatjes Sudoku 1.webp',
      'Plaatjes Sudoku 2.webp',
      'Plaatjes Sudoku 3.webp',
      'Plaatjes Sudoku 4.webp',
      'Plaatjes Sudoku 1.webp',
      'Plaatjes Sudoku 2.webp',
    ],
    answerKey: "Plaatjes Sudoku 1 answer_key.webp",
  },
  'picture-path': {
    folder: 'picture path',
    imgs: [
      'Afbeeldingspad 1.webp',
      'Afbeeldingspad 2.webp',
      'Afbeeldingspad 3.webp',
      'Afbeeldingspad 4.webp',
      'Afbeeldingspad 1.webp',
      'Afbeeldingspad 2.webp',
    ],
    answerKey: "Afbeeldingspad 1 answer_key.webp",
  },
  'find-and-count': {
    folder: 'find and count',
    imgs: [
      'Ik zie, ik zie 1.webp',
      'Ik zie, ik zie 2.webp',
      'Ik zie, ik zie 3.webp',
      'Ik zie, ik zie 4.webp',
      'Ik zie, ik zie 1.webp',
      'Ik zie, ik zie 2.webp',
    ],
    answerKey: "Ik zie, ik zie 1 answer_key.webp",
  },
  'find-objects': {
    folder: 'find objects',
    imgs: [
      "Vind de Verborgen Voorwerpen 1.webp",
      "Vind de Verborgen Voorwerpen 2.webp",
      "Vind de Verborgen Voorwerpen 3.webp",
      'Vind de Vreemde Eend (1).webp',
      'Vind de Vreemde Eend (2).webp',
      'Vind de Vreemde Eend (3).webp',
    ],
    answerKey: "Vind de Verborgen Voorwerpen 1 answer_key.webp",
  },
  crossword: {
    folder: 'crossword',
    imgs: [
      'Plaatjes Kruiswoord 1.webp',
      'Plaatjes Kruiswoord 2.webp',
      'Plaatjes Kruiswoord 3.webp',
      'Plaatjes Kruiswoord 4.webp',
      'Plaatjes Kruiswoord 1.webp',
      'Plaatjes Kruiswoord 2.webp',
    ],
    answerKey: "Plaatjes Kruiswoord 1 answer_key.webp",
  },
  'treasure-hunt': {
    folder: 'treasure hunt',
    imgs: [
      'Schattenjacht 1.webp',
      'Schattenjacht 2.webp',
      'Schattenjacht 3.webp',
      'Schattenjacht 4.webp',
      'Schattenjacht 1.webp',
      'Schattenjacht 2.webp',
    ],
    answerKey: "Schattenjacht 1 answer_key.webp",
  },
};
