/** G3-367 — Times Table of 3. nt20-VAR variation of G3-358 (same family: multiplication-tables). */
'use strict';
const base = require('./G3-358-times-tables.js');
module.exports = {
  ...base,
  id: 'G3-367',
  slug: 'times-table-of-3',
  difficulty: { 1: {"mode":"table","table":3,"cards":10,"cols":2,"rows":5}, 2: {"mode":"table","table":3,"cards":10,"cols":2,"rows":5}, 3: {"mode":"table","table":3,"cards":10,"cols":2,"rows":5} },
  i18n: { en: { title: "Times Table of 3", instruction: "Multiply. Write each product in the box." } },
};
