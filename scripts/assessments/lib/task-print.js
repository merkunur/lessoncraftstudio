'use strict';
/**
 * What makes two task boxes of two checks THE SAME TASK for a child (Stage C-2, the checks of the year), so that a check
 * of the year never prints a box that a unit check prints:
 *
 *   - a box that shows words, numbers or pictures: the same text, the same pictures and the same answer. A box is
 *     described as the text listing of a check describes it (dump.json of build-checks.js: { text, pictures, answer }),
 *     so a print can be made from a card being chosen and from the listing of a check built long ago;
 *   - a box that is a drawing only (no words, no numbers, no pictures: the dotted 7 to trace, an empty number bond whose
 *     answer is 4): the same worksheet type and the same fingerprint of what the card asks (the fingerprint the checks
 *     file keeps for every box: sha1 of its key, a fact "n:…" or "<type>|<key>"). By its text alone every drawing whose
 *     answer is 7 would be one task: the dotted 7 and the number bond of 7.
 *
 * taskPrint(box, drawing) → 16 hex characters; `drawing` is { type, sig } of the box.
 *
 * Besides the print, build-checks.js --year and gates.js (T14) keep a box of a check of the year clear of every unit-check
 * box of the SAME worksheet type with the same fingerprint (the story page that reads the same story with its options in
 * another order; the same fact asked by the same type).
 *
 * (The forms A and B of one check are kept apart by the stronger rule of the builder, the fingerprint of what a card asks:
 * a fact in any order is one task there. Across the checks of a year that rule would leave a Kindergarten check few
 * numbers to count: the unit checks have already asked most of them.)
 */
const crypto = require('crypto');
const norm = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
const sha = (x) => crypto.createHash('sha1').update(JSON.stringify(x)).digest('hex').slice(0, 16);
function taskPrint(box, drawing) {
  const text = norm(box.text), pictures = (box.pictures || []).slice().sort();
  if (/[\p{L}\p{N}]/u.test(text) || pictures.length) return sha([text, pictures, String(box.answer)]);
  if (!drawing || !drawing.type || !drawing.sig) throw new Error('a box that is a drawing only needs its type and its fingerprint');
  return sha(['drawing', drawing.type, drawing.sig]);
}
module.exports = { taskPrint };
