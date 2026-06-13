/** G1-203 — Order the chicken life cycle (egg -> chick -> hen). SCIENCE sequence. */
'use strict';
const { makeScienceSequence } = require('../_shared/science-sequence.js');
module.exports = makeScienceSequence({
  id: 'G1-203', slug: 'chicken-life-cycle', gradeBand: 'G1', exerciseType: 'science-sequence',
  data: require('../../data/science/chicken-life-cycle.json'),
  i18n: { en: { title: 'The Life Cycle of a Chicken', instruction: 'Write 1, 2, 3 to put the pictures in the right order.' } },
});
