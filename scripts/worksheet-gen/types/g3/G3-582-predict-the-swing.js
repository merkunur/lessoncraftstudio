/** G3-582 — Predict the Swing (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-090). dk-g3.js mode 'g3-pendulum'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-582', slug: 'predict-the-swing', mode: 'g3-pendulum', exerciseType: 'science-sort',
  difficulty: {"1":{"strings":1},"2":{"strings":2,"middle":true,"predict":true},"3":{"strings":3,"middle":true,"graph":true}},
  i18n: { en: { title: "Predict the Swing", instruction: "Count the swings for each string three times and find the middle count. Predict the 6-inch string before you test it." } },
});
