/** G2-263 — Measuring Jugs to 2000 ml. nt20-VAR variation of G2-252 (same family: measurement). */
'use strict';
const base = require('./G2-252-capacity-mass.js');
module.exports = {
  ...base,
  id: 'G2-263',
  slug: 'measuring-jugs-to-2000',
  themeAxis: {"applicable":false},
  difficulty: { 1: {"jugs":6,"balances":0,"cols":3,"rows":2,"jugMax":2000,"jugStep":250,"weightsMax":0}, 2: {"jugs":6,"balances":0,"cols":3,"rows":2,"jugMax":2000,"jugStep":250,"weightsMax":0}, 3: {"jugs":6,"balances":0,"cols":3,"rows":2,"jugMax":2000,"jugStep":250,"weightsMax":0} },
  i18n: { en: { title: "Measuring Jugs to 2000 ml", instruction: "Read the scale on each jug. Write how many milliliters are inside." } },
};
