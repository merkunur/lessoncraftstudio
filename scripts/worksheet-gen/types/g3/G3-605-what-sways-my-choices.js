/** G3-605 — What Sways My Choices? (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health en-3-029). dk-g3-health.js mode 'g3-influences'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-605', slug: 'what-sways-my-choices', mode: 'g3-influences', exerciseType: 'healthy-habits',
  difficulty: {"1":{"scenes":3},"2":{"scenes":6},"3":{"scenes":6,"own":true}},
  i18n: { en: { title: "What Sways My Choices?", instruction: "Read each scene. Circle the influence and which way it pushes. Write what you could do." } },
});
