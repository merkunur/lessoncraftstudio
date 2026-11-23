/** G1-633 — Send a Message with Light (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-040). dk-g1.js mode 'g1-light-code'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-633', slug: 'send-a-message-with-light', mode: 'g1-light-code', exerciseType: 'science-sort',
  difficulty: {"1":{"signals":2},"2":{"signals":3,"draw":true},"3":{"signals":3,"draw":true,"change":true}},
  i18n: { en: { title: "Send a Message with Light", instruction: "Make a flash code and draw our signal light. For each test, circle the message we sent, the message our friend read, and “right” or “wrong.”" } },
});
