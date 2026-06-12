/** K-008 — Which group has MORE? Circle it. (compare-groups factory) */
'use strict';
const { makeCompareGroupsType } = require('../_shared/compare-groups.js');

module.exports = makeCompareGroupsType({
  id: 'K-008',
  slug: 'which-group-has-more',
  mode: 'more',
  i18n: {
    en: {
      title: 'More or Less?',
      instruction: 'Look at both groups. Circle the group that has MORE.',
    },
  },
});
