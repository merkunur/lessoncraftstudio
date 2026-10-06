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

/**
 * slotFor(key, n) — one card's slot when a screen builds its cards one at a time: a hash of the card's own content
 * (its right answer + its index), so the slots run irregularly and evenly in the long run, never i % n.
 */
function slotFor(key, n) {
  if (!(n >= 1)) return 0;
  return crypto.createHash('sha1').update(String(key)).digest().readUInt32LE(0) % n;
}

/**
 * numberChoices(answer, slips, key, opt) — three NUMBER options whose right one is the smallest, the middle or the
 * largest equally often (found 2026-10-06: slips built as "one too few / one too many" put the answer in the MIDDLE
 * on 99% of Arrays cards — a child taps the middle number and never multiplies).
 *
 *   slips  the screen's own typical mistakes, most telling first (they are preferred whenever they fit the rank)
 *   key    the card's own content (its question + index): the rank AND the slot are hashed from it, independently
 *   opt    { min = 0, max = Infinity, step = 1 }  — fillers are answer ± step·k inside [min, max]
 * Returns { opts: [3 numbers in display order], at: index of the answer }. When the wanted rank is impossible (the
 * answer is the smallest number allowed) the nearest possible rank is used.
 */
function numberChoices(answer, slips, key, opt = {}) {
  const min = opt.min === undefined ? 0 : opt.min, max = opt.max === undefined ? Infinity : opt.max, step = opt.step || 1;
  const ok = (v) => Number.isFinite(v) && v >= min && v <= max && v !== answer;
  const pool = [];
  for (const v of slips || []) if (ok(v) && !pool.includes(v)) pool.push(v);
  for (let k = 1; k <= 12; k++) for (const v of [answer - k * step, answer + k * step]) if (ok(v) && !pool.includes(v)) pool.push(v);
  const below = pool.filter((v) => v < answer), above = pool.filter((v) => v > answer);
  // rank 0: two above · rank 1: one below + one above · rank 2: two below
  const feasible = [above.length >= 2, below.length >= 1 && above.length >= 1, below.length >= 2];
  let rank = slotFor(key + '|rank', 3);
  // an impossible rank falls to the NEXT possible one (never always to the middle: that rebuilt the tell on small answers)
  if (!feasible[rank]) rank = [1, 2].map((k) => (rank + k) % 3).find((r) => feasible[r]);
  if (rank === undefined) throw new Error(`numberChoices: no two distractors for ${answer}`);
  const wrong = rank === 0 ? above.slice(0, 2) : rank === 2 ? below.slice(0, 2) : [below[0], above[0]];
  if (slotFor(key + '|swap', 2)) wrong.reverse();
  const at = slotFor(key + '|slot', 3);
  const opts = wrong.slice(); opts.splice(at, 0, answer);
  return { opts, at };
}

/**
 * tappingRhythm(slots, k) — true when a page's answer slots (in screen order) follow a rhythm a child can tap without
 * reading: always the same slot, or a rotation either way (0,1,0,1 … / 0,1,2,0,1,2 … / 2,1,0 …). Pages of fewer than
 * 4 questions are never refused (any order of 3 is "a rhythm"). Used to re-draw a shuffle that landed on one
 * (2026-10-06: a Feelings sort page read good, bad, good, bad in every locale).
 */
function tappingRhythm(slots, k) {
  const n = slots.length;
  if (n < 4) return false;
  if (slots.every((x) => x === slots[0])) return true;
  for (let c = 0; c < k; c++) {
    if (slots.every((x, i) => x === (i + c) % k)) return true;
    if (slots.every((x, i) => x === (((c - i) % k) + k) % k)) return true;
  }
  return false;
}

/** seededShuffle(arr, key) — a copy of arr in an order fixed by key (Fisher–Yates on a sha1-seeded xorshift) */
function seededShuffle(arr, key) {
  const h = crypto.createHash('sha1').update(String(key)).digest();
  let a = h.readUInt32LE(0) || 1;
  const rnd = () => { a ^= a << 13; a >>>= 0; a ^= a >>> 17; a ^= a << 5; a >>>= 0; return a / 4294967296; };
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}

/**
 * shuffledOptions(cards, key) — for a page of cards that each offer the SAME option set: per card an order of its own,
 * re-drawn (new salt) while the right answers' slots follow a tapping rhythm. cards = [{ options, answer }] → [order].
 */
function shuffledOptions(cards, key) {
  let orders = [];
  for (let salt = 0; salt < 50; salt++) {
    orders = cards.map((c, i) => seededShuffle(c.options, key + '|' + i + '|' + salt));
    const k = Math.max(...cards.map((c) => c.options.length));
    if (!tappingRhythm(orders.map((o, i) => o.indexOf(cards[i].answer)), k)) break;
  }
  return orders;
}

/**
 * pageSalt(built) — a short fingerprint of ONE built page, joined to every slot hash of its screen. Without it a card
 * hashed only from "its answer + its index" lands in the same slot on every page that repeats that answer at that index
 * (question words, verb forms: tiny vocabularies) — measured 2026-10-06 as 37–45% rotation scores against 25–33% chance.
 */
function pageSalt(built) {
  return crypto.createHash('sha1').update(String((built && built.bodyHtml) || '') + JSON.stringify((built && built.meta) || {})).digest('hex').slice(0, 12) + '|';
}

/**
 * balancedPick(rng, pool, n, keyOf) — n entries dealt round-robin across the ANSWER groups keyOf(e) (a number: the count
 * of sounds, syllables …), no group on more than half the cards, then shuffled until the answers do not follow a tapping
 * rhythm. A pool with one group only fills from it (never a refusal for that). Uses the page's own rng (deterministic).
 */
function balancedPick(rng, pool, n, keyOf) {
  const by = {};
  for (const e of rng.shuffle(pool.slice())) (by[keyOf(e)] = by[keyOf(e)] || []).push(e);
  const keys = rng.shuffle(Object.keys(by).map(Number));
  const cap = Math.ceil(n / 2), took = {};
  let out = [];
  for (let guard = 0; out.length < n && guard < 100; guard++) {
    let added = false;
    for (const k of keys) {
      if (out.length >= n) break;
      if ((took[k] || 0) >= cap || !by[k].length) continue;
      out.push(by[k].shift()); took[k] = (took[k] || 0) + 1; added = true;
    }
    if (!added) break;
  }
  for (const k of keys) while (out.length < n && by[k].length) out.push(by[k].shift());
  out = rng.shuffle(out);
  const lo = Math.min(...out.map(keyOf)), span = Math.max(...out.map(keyOf)) - lo + 1;
  for (let g = 0; g < 50 && tappingRhythm(out.map((e) => keyOf(e) - lo), Math.max(2, span)); g++) out = rng.shuffle(out);
  return out;
}

/*
 * NOT here on purpose: a per-page "slot dealer" (each slot equally often per page, in shuffled cycles) was tried
 * 2026-10-06 and REMOVED. Its cycles of three make every three cards a permutation of the slots — the same shape as a
 * rotation — and the best of the six rotations then won 50-62% on Syllable Reading and Synonyms. One independent fair
 * draw per card (slotFor) is the right model; a rank that a card cannot take is handled where the slips are built.
 */

module.exports = { answerSlots, slotFor, numberChoices, tappingRhythm, seededShuffle, shuffledOptions, pageSalt, balancedPick };
