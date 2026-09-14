/**
 * b3-instructions.js — fillSlots(text, slots): pure substitution of an
 * EXPLICIT slot list into a panel-authored frame. lib/sentence-bank.js
 * fillFrame is closed to {name|n|noun|color}; the b3 frame-consuming types
 * (G1-308 read-and-do, G2-317 verb-forms, K-320, …) need locale-case slots
 * ({obj} {obj2} {pl} {part} {all} {allDef} {def} {def2} {dat} {dat2} {gen}
 * {gen2} {n} {A} {B} {form} {ordinal} …). No morphology is ever computed here:
 * every value is a literal the panel authored for that slot in that locale.
 *
 *   fillSlots(text, slots)   → string. Throws on any `{…}` left unfilled
 *                              (a slot the frame names but the bank did not
 *                              supply), and on a slot value that is not a
 *                              non-empty string. Array values are consumed in
 *                              order (two {name} slots → two names).
 *   slotsIn(text)            → the slot names a frame uses, in order.
 * A gate re-fills the same frames from the same bank through this module and
 * compares against the rendered text (the poison: a hand-edited noun → FAIL).
 */
'use strict';

const SLOT_RE = /\{([A-Za-z][A-Za-z0-9_]*)\}/g;

function slotsIn(text) {
  const out = [];
  String(text).replace(SLOT_RE, (_, k) => { out.push(k); return _; });
  return out;
}

function fillSlots(text, slots) {
  const cursor = {};
  const out = String(text).replace(SLOT_RE, (whole, k) => {
    let v = slots ? slots[k] : undefined;
    if (Array.isArray(v)) { cursor[k] = cursor[k] || 0; v = v[cursor[k]++]; }
    if (typeof v !== 'string' || !v.length) throw new Error('fillSlots: slot {' + k + '} unfilled in "' + text + '"');
    return v;
  });
  const left = slotsIn(out);
  if (left.length) throw new Error('fillSlots: unfilled slot(s) {' + left.join('} {') + '} in "' + out + '"');
  return out;
}

module.exports = { fillSlots, slotsIn, SLOT_RE };
