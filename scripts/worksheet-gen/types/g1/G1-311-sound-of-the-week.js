/**
 * G1-311 — Sound of the Week (nt20-C face 5 of K-317 `letter-of-the-week`;
 * design §3 F5). HANDWRITTEN (listed under HANDWRITTEN in
 * tools/b3var-rows/letter-of-the-week.js): the face fans over the bank's
 * two-letter UNITS (sh / ch / th; de sch / ch / ei / au …), so it needs its OWN
 * `unitAxis` — function values a generated row cannot carry.
 *
 * Two letters, ONE sound: the base page with the unit as the target —
 * letterCard "Sh", a capital lane "Sh" + a small lane "sh", the hunt (4
 * pictures carrying the unit as ONE grapheme + 4 foils that carry the
 * component letters SEPARATELY and no unit substring), write rows Sh / sh.
 * Everything is the base's build under the additive `unit` knob
 * (types/k/K-317-letter-of-the-week.js `_buildWith`); verify() takes its
 * `face === 'unit'` branch (hit iff graphemes.includes(unit)).
 *
 * Band: the id is G1 (the landing level per locale comes from `units[].band`
 * — en sh/ch/th = K readiness, NO CCSS code; de/nl/es/… digraphs = grade 1).
 * One object for all three levels: the waves ship d2 only.
 */
'use strict';
const base = require('../k/K-317-letter-of-the-week.js');
const { bank: loadBank } = require('../../lib/b3-common.js');

const BANK = 'letter-of-the-week';
const D = { ...base.difficulty[2], unit: { huntPos: 'any', foilPolicy: 'components' } };

function unitBlock(loc, u) {
  const b = (loadBank(BANK, loc).units || []).find((x) => x.u === u);
  if (!b) throw new Error(`G1-311: unit "${u}" is not in the ${loc} bank`);
  return b;
}

module.exports = {
  ...base,
  id: 'G1-311',
  slug: 'sound-of-the-week',
  gradeBand: 'G1',
  unitAxis: {
    applicable: true,
    units: (loc) => (loadBank(BANK, loc).units || []).map((u) => u.u),
    exemplar: (loc) => {
      const b = loadBank(BANK, loc);
      const u = b.unitExemplar || (b.units && b.units[0] && b.units[0].u);
      if (!u) throw new Error(`G1-311: the ${loc} bank has no units (face 5 refused for ${loc})`);
      return u;
    },
    tokens: (unit, loc) => { const b = unitBlock(loc, unit); return { U: b.upper, L: b.u, UNIT: unit }; },
  },
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: 'Sound of the Week: {L}', instruction: 'Trace {L}, circle the four pictures that have the {L} sound, then write a row of it.' } },
};
