#!/usr/bin/env node
/**
 * Gate: the browser's pure-JS SHA-1 (lib/platform/sha1.js) equals Node's crypto on every seed shape the engine uses,
 * so a page made in a maker from a deck's settings reproduces that deck (the seed is sha1 of a short string, lib/rng.js).
 * Inputs: the seed strings of every type × theme × level × copy × unit shape (incl. non-ASCII units: å ä ö ß ñ ç …)
 * plus edge cases (empty, 55/56/64-byte boundaries, astral characters). --poison flips one bit and must fail.
 */
'use strict';
const crypto = require('crypto');
const path = require('path');
const { sha1Bytes } = require('../../worksheet-gen/lib/platform/sha1.js');
const { instanceSeed } = require('../../worksheet-gen/lib/rng.js');

const inv = require(path.join(__dirname, '..', '..', '..', 'docs', 'makers', 'inventory', 'types.json')).rows;
const themes = ['animals', 'farm animals', 'zoo_animals', 'fruits bw 2', 'none'];
const units = [null, 'og', 'är', 'Straße', 'niño', 'ça', 'før', 'hän', 'Ü', '😀'];
const seeds = ['', 'a', 'x'.repeat(55), 'x'.repeat(56), 'x'.repeat(63), 'x'.repeat(64), 'x'.repeat(65), 'é'.repeat(40)];
for (const r of inv) for (const theme of themes) for (const d of [1, 2, 3]) for (const variant of [1, 2, 7]) for (const unit of units.slice(0, r.id.endsWith('0') ? units.length : 2)) {
  seeds.push(instanceSeed({ typeId: r.id, theme, difficulty: d, seedEpoch: 1, variant, unit }));
}
let bad = 0;
const poison = process.argv.includes('--poison');
seeds.forEach((s, i) => {
  const a = crypto.createHash('sha1').update(s).digest('hex');
  const bytes = sha1Bytes(s);
  if (poison && i === 3) bytes[0] ^= 1;
  const b = Buffer.from(bytes).toString('hex');
  if (a !== b) { bad++; if (bad <= 5) console.log('FAIL', JSON.stringify(s), a, b); }
});
console.log(`sha1-parity: ${seeds.length} seeds, ${bad} different`);
if (poison) { console.log(bad ? 'poison: caught (good)' : 'poison: NOT caught'); process.exit(bad ? 0 : 1); }
process.exit(bad ? 1 : 0);
