/**
 * The PUBLISHED Word Classes pages (G2-275 + 5 faces, level 2, copy 1, on each locale's published theme — measured
 * from the live catalog 2026-10-01), hashed from their body + meta. Run before and after a change and diff: a differing
 * line = a published page changed.
 */
'use strict';
const crypto = require('crypto');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..', '..');
const { loadType } = require(path.join(ROOT, 'lib/load-types.js'));
const { makeRng, instanceSeed } = require(path.join(ROOT, 'lib/rng.js'));
const { PUBLISHED } = require('./word-classes-published.js');
for (const [loc, faces] of Object.entries(PUBLISHED)) {
  for (const [id, theme] of Object.entries(faces)) {
    const spec = loadType(id);
    const seed = instanceSeed({ typeId: id, theme, difficulty: 2, seedEpoch: 1, variant: 1, unit: null });
    let h;
    try {
      const b = spec.build({ theme, difficulty: 2, locale: loc, unit: null }, { rng: makeRng(seed), variant: 1 });
      h = crypto.createHash('sha1').update(b.bodyHtml + JSON.stringify(b.meta)).digest('hex').slice(0, 12);
    } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
    console.log(`${id} ${loc} ${theme} ${h}`);
  }
}
