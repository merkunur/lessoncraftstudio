/** K-442 — Count the Number Word (Counting maker, 2026-10-31). T1: count a set, choose the number WORD (levels 1-2: circle one of three; level 3: write it from the word bank). See types/_shared/counting-more.js. */
'use strict';
const { makeCountingMoreType } = require('../_shared/counting-more.js');

module.exports = makeCountingMoreType({
  id: 'K-442', slug: 'count-and-write-number-word', mode: 'number-word',
  i18n: { en: { title: "Count the Number Word", instruction: "Count the pictures. Circle the number word that tells how many." } },
});
