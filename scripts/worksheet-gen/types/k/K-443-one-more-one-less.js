/** K-443 — One More, One Less (Counting maker, 2026-10-31). T2: count, draw one more (or cross one out), write the new number (K.CC.B.4c). See types/_shared/counting-more.js. */
'use strict';
const { makeCountingMoreType } = require('../_shared/counting-more.js');

module.exports = makeCountingMoreType({
  id: 'K-443', slug: 'one-more-one-less', mode: 'one-more',
  i18n: { en: { title: "One More, One Less", instruction: "Count the pictures. Draw one more in the empty box, or cross one out. Write how many there are now." } },
});
