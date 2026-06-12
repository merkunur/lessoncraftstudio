/** K-009 — Which group has FEWER? Circle it. (compare-groups factory) */
'use strict';
const { makeCompareGroupsType } = require('../_shared/compare-groups.js');

module.exports = makeCompareGroupsType({
  id: 'K-009',
  slug: 'which-group-has-fewer',
  mode: 'fewer',
  i18n: {
    en: {
      title: 'Which Has Fewer?',
      instruction: 'Look at both groups. Circle the group that has FEWER.',
    },
  },
});
