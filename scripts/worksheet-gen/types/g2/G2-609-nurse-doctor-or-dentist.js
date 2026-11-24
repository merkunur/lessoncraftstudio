/** G2-609 — Nurse, Doctor or Dentist? (Batch 2, Daily Teaching System Stage D-5, 2026-11-24; health en-2-020). dk-g2-health.js mode 'g2-care'. English only. */
'use strict';
const { makeG2Type } = require('../_shared/dk-g2-health.js');
module.exports = makeG2Type({
  id: 'G2-609', slug: 'nurse-doctor-or-dentist', mode: 'g2-care', exerciseType: 'healthy-habits',
  difficulty: {"1":{"cards":4},"2":{"cards":8},"3":{"cards":8,"frame":true}},
  i18n: { en: { title: "Nurse, Doctor or Dentist?", instruction: "Draw a line from each picture to who can help. Then circle the two checkups." } },
});
