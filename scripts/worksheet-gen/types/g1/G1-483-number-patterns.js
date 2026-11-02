/** G1-483 — Number Patterns (Patterns maker, 2026-11-02): find the rule, write the missing numbers. See types/_shared/patterns-more.js. */
'use strict';
const { makePatternsMoreType } = require('../_shared/patterns-more.js');

module.exports = makePatternsMoreType({
  id: 'G1-483', slug: 'number-patterns', mode: 'number', gradeBand: 'G1',
  i18n: { en: { title: "Number Patterns", instruction: "Find the rule in each row. Write the missing numbers." } },
});
