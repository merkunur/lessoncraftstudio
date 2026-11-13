/** G2-503 — Reading Measuring Jugs in Deciliters (Year pages I, 2026-11-13): the jug page of G2-260 read in dl, for the
 *  countries whose grade 2 measures in litres and decilitres (Sweden "liter och deciliter", Norway, Denmark, Finland,
 *  France, Italy). Level 1 a one-litre jug with every decilitre numbered; level 2 every second mark
 *  numbered; level 3 a two-litre jug (20 dl) numbered in fives. No screen version (PDF only). */
'use strict';
const base = require('./G2-252-capacity-mass.js');
const DL = ['sv', 'da', 'no', 'fi', 'fr', 'it'];   // en (US customary), de, es-MX and pt-BR read jugs in millilitres and litres; nl meets the dl in groep 5
const lv = (o) => ({ jugs: 6, balances: 0, cols: 3, rows: 2, jugStep: 1, weightsMax: 0, jugUnit: 'dl', ...o });
module.exports = {
  ...base,
  id: 'G2-503',
  slug: 'measuring-jugs-in-deciliters',
  themeAxis: { applicable: false },
  interactive: undefined,
  difficulty: { 1: lv({ jugMax: 10, labelEvery: 1 }), 2: lv({ jugMax: 10, labelEvery: 2 }), 3: lv({ jugMax: 20, labelEvery: 5 }) },
  build(args, ctx) {
    const L = String(args.locale || 'en').slice(0, 2);
    if (!DL.includes(L)) throw new Error('G2-503: decilitres are not a school unit of ' + L + ' (the page is made for ' + DL.join(', ') + ')');
    return base.build.call(this, args, ctx);
  },
  i18n: { en: { title: 'Reading Measuring Jugs in Deciliters', instruction: 'Read the scale on each jug. Write how many deciliters are inside.' } },
};
