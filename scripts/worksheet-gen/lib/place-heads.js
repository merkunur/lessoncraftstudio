/**
 * place-heads.js — the place-value column letters each school writes over hundreds / tens / ones (2026-11-01).
 * en H T O · de H Z E · fr c d u · es/pt C D U · it h da u · nl/sv/da/no H T E · fi S K Y.
 * Used by the place-value chart (G2-224, base-ten-tasks.js — it printed the English H T O in every locale) and the
 * compare maker's which-place-decides page (compare-more.js).
 */
'use strict';
const PLACE_HEADS = {
  en: ['H', 'T', 'O'], de: ['H', 'Z', 'E'], fr: ['c', 'd', 'u'], es: ['C', 'D', 'U'], pt: ['C', 'D', 'U'], it: ['h', 'da', 'u'],
  nl: ['H', 'T', 'E'], sv: ['H', 'T', 'E'], da: ['H', 'T', 'E'], no: ['H', 'T', 'E'], fi: ['S', 'K', 'Y'],
};
/** [hundreds, tens, ones] letters for a locale (en when unknown) */
const placeHeads = (locale) => PLACE_HEADS[String(locale || 'en').slice(0, 2)] || PLACE_HEADS.en;
module.exports = { PLACE_HEADS, placeHeads };
