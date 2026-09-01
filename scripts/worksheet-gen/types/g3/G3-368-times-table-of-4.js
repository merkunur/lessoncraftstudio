/** G3-368 — Times Table of 4. nt20-VAR variation of G3-358 (same family: multiplication-tables). */
'use strict';
const base = require('./G3-358-times-tables.js');
module.exports = {
  ...base,
  id: 'G3-368',
  slug: 'times-table-of-4',
  difficulty: { 1: {"mode":"table","table":4,"cards":10,"cols":2,"rows":5}, 2: {"mode":"table","table":4,"cards":10,"cols":2,"rows":5}, 3: {"mode":"table","table":4,"cards":10,"cols":2,"rows":5} },
  i18n: { en: { title: "Times Table of 4", instruction: "Multiply. Write each product in the box." } },
};
