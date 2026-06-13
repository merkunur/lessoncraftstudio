/**
 * Deterministic seeded RNG for worksheet instances.
 * seed = sha1(typeId|theme|difficulty|seedEpoch[|vN]) — locale-INDEPENDENT so
 * all 11 locales of one instance render identical content (the design-once +
 * hreflang-sibling guarantee). The optional |vN suffix (variant > 1) re-rolls
 * the problems for additional worksheets of the same type+theme+difficulty;
 * variant 1 omits the suffix so every pre-variant wave reproduces byte-identically.
 * mulberry32 over the first 4 seed bytes.
 */
'use strict';
const crypto = require('crypto');

function makeRng(seedString) {
  const h = crypto.createHash('sha1').update(seedString).digest();
  let a = h.readUInt32LE(0);
  const next = () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    seed: seedString,
    next,                                    // float [0,1)
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),   // inclusive
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    shuffle: (arr) => {                      // Fisher–Yates copy
      const a2 = arr.slice();
      for (let i = a2.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a2[i], a2[j]] = [a2[j], a2[i]];
      }
      return a2;
    },
    sample: function (arr, n) { return this.shuffle(arr).slice(0, n); },
  };
}

function instanceSeed({ typeId, theme, difficulty, seedEpoch, variant }) {
  const base = `${typeId}|${theme || 'none'}|${difficulty}|${seedEpoch || 1}`;
  return (variant && variant > 1) ? `${base}|v${variant}` : base;
}

module.exports = { makeRng, instanceSeed };
