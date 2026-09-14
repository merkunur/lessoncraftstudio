/**
 * K-350 — Bilingual Picture Cards (nt20-C face 5 of K-324 `picture-word-cards`;
 * design §3 F5). HANDWRITTEN (listed under HANDWRITTEN in
 * tools/b3var-rows/picture-word-cards.js): the face fans over the PARTNER
 * language (`instance.unit` = a locale code), so it needs its OWN `unitAxis`
 * — function values a generated row cannot carry.
 *
 * The base's cut sheet with `kind:'bilingual'`: picture 84 over one plate
 * carrying the host word (Baloo 2 700 26 / 30, T.ink) above the partner's
 * word (Nunito 700 20 / 24, T.teal); legend `hostName · partnerNames[unit]`
 * in the strip. The partner label is vocab[key][unit][0] under the partner
 * locale's own case rule (de keeps its noun capital). Host one line (<= 20
 * glyphs), partner <= 26 glyphs one line — else the entry is refused, never
 * filled. Everything is the base's `_buildWith` (types/k/K-324-picture-word-
 * cards.js `_buildBilingual`); verify() takes its `bilingual` branch.
 *
 * unitAxis: units(loc) = the bank's partnerNames keys in bank order (the 10
 * other locales); exemplar(loc) = bank.bilingual.partnerExemplar (`es` in en,
 * `en` elsewhere); tokens {U} = {L} = the authored partner NAME (its own
 * case: "Spanish" / "Englisch" / "englanti"), {UNIT} = the locale code. The
 * wave ships the exemplar only; a unit-less build() takes it from the bank.
 * One object for all three levels: the waves ship d2 only.
 */
'use strict';
const base = require('./K-324-picture-word-cards.js');
const { bank: loadBank } = require('../../lib/b3-common.js');

const BANK = 'picture-word-cards';
const D = { ...base.difficulty[2], kind: 'bilingual', pic: 84, hostPx: 26, partnerPx: 20, partnerCap: 26, gap: 4 };

function bilingualBlock(loc) {
  const b = loadBank(BANK, loc).bilingual;
  if (!b || !b.partnerNames) throw new Error(`K-350: the ${loc} bank has no bilingual block (face 5 refused for ${loc})`);
  return b;
}

module.exports = {
  ...base,
  id: 'K-350',
  slug: 'picture-word-cards-bilingual-cards',
  unitAxis: {
    applicable: true,
    units: (loc) => Object.keys(bilingualBlock(loc).partnerNames),
    exemplar: (loc) => {
      const b = bilingualBlock(loc);
      if (!b.partnerExemplar) throw new Error(`K-350: the ${loc} bank names no partnerExemplar`);
      return b.partnerExemplar;
    },
    tokens: (unit, loc) => {
      const name = bilingualBlock(loc).partnerNames[unit];
      if (!name) throw new Error(`K-350: the ${loc} bank names no partner ${unit}`);
      return { U: name, L: name, UNIT: unit };
    },
  },
  difficulty: { 1: D, 2: D, 3: D },
  i18n: {
    en: {
      title: 'Bilingual Picture Cards: English and {U}',
      instruction: 'Cut out the eight cards. Say the word in English, then in {U}, and keep the cards for your word wall.',
    },
  },
};
