/** G2-260 — Reading Measuring Jugs. nt20-VAR variation of G2-252 (same family: measurement). */
'use strict';
const base = require('./G2-252-capacity-mass.js');
module.exports = {
  ...base,
  id: 'G2-260',
  slug: 'reading-measuring-jugs',
  themeAxis: {"applicable":false},
  difficulty: { 1: {"jugs":6,"balances":0,"cols":3,"rows":2,"jugMax":1000,"jugStep":100,"weightsMax":0}, 2: {"jugs":6,"balances":0,"cols":3,"rows":2,"jugMax":1000,"jugStep":100,"weightsMax":0}, 3: {"jugs":6,"balances":0,"cols":3,"rows":2,"jugMax":1000,"jugStep":100,"weightsMax":0} },
  i18n: { en: { title: "Reading Measuring Jugs", instruction: "Read the scale on each jug. Write how many milliliters are inside." } },
};
