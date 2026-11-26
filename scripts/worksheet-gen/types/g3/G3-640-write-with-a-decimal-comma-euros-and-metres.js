/** G3-640 — Mit Komma schreiben: Euro und Cent, Meter und Zentimeter (Batch DE-B, Daily Teaching System Stage E-2, 2026-11-26; German only, new:laengen-und-geld). e2-math-b.js mode 'e2b-komma'. */
'use strict';
const { makeE2bType } = require('../_shared/e2-math-b.js');
module.exports = makeE2bType({
  id: 'G3-640', slug: 'write-with-a-decimal-comma-euros-and-metres', mode: 'e2b-komma', exerciseType: 'money', gradeBand: 'G3',
  i18n: { en: { title: "Writing with a Comma: Euros and Cents, Metres and Centimetres", instruction: "Write each amount and each length three ways. With a comma: the euros (the metres) come before the comma, and after the comma always two digits for the cents (the centimetres). Below, write each one another way." } },
});
