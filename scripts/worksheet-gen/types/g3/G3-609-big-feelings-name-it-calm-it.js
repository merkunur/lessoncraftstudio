/** G3-609 — Big Feelings: Name It, Calm It (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health teacher-led (NHES.4.5.1)). dk-g3-health.js mode 'g3-big-feelings'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-609', slug: 'big-feelings-name-it-calm-it', mode: 'g3-big-feelings', exerciseType: 'feelings',
  difficulty: {"1":{"n":3},"2":{"n":2,"imsg":true},"3":{"n":2,"imsg":true,"partner":true}},
  i18n: { en: { title: "Big Feelings: Name It, Calm It", instruction: "Name each feeling, show how big it is and pick a calm-down tool. Then write an I-message." } },
});
