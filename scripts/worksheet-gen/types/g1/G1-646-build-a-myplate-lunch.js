/** G1-646 — Build a MyPlate Lunch (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; health en-1-011). dk-g1-health.js mode 'g1-myplate-lunch'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1-health.js');
module.exports = makeG1Type({
  id: 'G1-646', slug: 'build-a-myplate-lunch', mode: 'g1-myplate-lunch', exerciseType: 'healthy-habits',
  difficulty: {"1":{"groups":4,"hints":true},"2":{"groups":5},"3":{"groups":5,"write":true}},
  i18n: { en: { title: "Build a MyPlate Lunch", instruction: "Circle the times you eat or drink on a school day. Cut out one food for each part of the plate and glue it on." } },
});
