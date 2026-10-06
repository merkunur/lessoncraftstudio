/**
 * answer-slots.js — where the right answer sits on each card of a tap-choice screen.
 *
 * Every slot is used equally often, in an IRREGULAR order seeded by the page itself (deterministic: the same page
 * always lays out the same way). Found 2026-10-06: screens that placed the answer by rotation (card i at slot i % 3)
 * let a child tap the 1st, 2nd, 3rd, 1st … option and score full marks without reading. The plain rotation and its
 * mirror are refused even when a short page's shuffle lands on them.
 *
 *   answerSlots(n, seedStr, k = 3) -> [slot of card 0, slot of card 1, …], each in 0..k-1
 */
'use strict';
const crypto = require('crypto');

function answerSlots(n, seedStr, k = 3) {
  const h = crypto.createHash('sha1').update(String(seedStr)).digest();
  let a = h.readUInt32LE(0) || 1;
  const rnd = () => { a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0; return a / 4294967296; };
  const diagonal = (o) => o.every((p, i) => p === i % k) || o.every((p, i) => p === (k - (i % k)) % k);
  const out = Array.from({ length: n }, (_, i) => i % k);
  for (let tries = 0; tries < 50 && (tries === 0 || (n >= k && diagonal(out))); tries++) {
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  }
  return out;
}

module.exports = { answerSlots };
