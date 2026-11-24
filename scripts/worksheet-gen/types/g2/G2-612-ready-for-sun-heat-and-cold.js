/** G2-612 — Ready for Sun, Heat and Cold (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; health en-2-024). dk-g2-health.js mode 'g2-weather-ready'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2-health.js');
module.exports = makeG2Type({
  id: 'G2-612', slug: 'ready-for-sun-heat-and-cold', mode: 'g2-weather-ready', exerciseType: 'healthy-habits',
  difficulty: {"1":{"n":2},"2":{"n":4},"3":{"n":4,"frame":true}},
  i18n: { en: { title: "Ready for Sun, Heat and Cold", instruction: "Draw a line from each kind of weather to everything that protects you in it." } },
});
