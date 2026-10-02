/**
 * The PUBLISHED Word Tracing pages (K-284 + 6 faces, level 2, copy 1, their published theme, 11 locales).
 * Run before and after a change and diff: a differing line = a published page changed.
 */
'use strict';
const crypto = require('crypto');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..', '..');
const { loadType } = require(path.join(ROOT, 'lib/load-types.js'));
const { makeRng, instanceSeed } = require(path.join(ROOT, 'lib/rng.js'));
const PUB = { 'K-284': 'animals', 'K-289': 'fruits', 'K-290': 'vehicles', 'K-291': 'toys', 'K-310': 'fruits', 'K-311': 'animals', 'K-315': 'toys' };
for (const [id, theme] of Object.entries(PUB)) {
  const spec = loadType(id);
  for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
    const seed = instanceSeed({ typeId: id, theme, difficulty: 2, seedEpoch: 1, variant: 1, unit: null });
    let h;
    try {
      const b = spec.build({ theme, difficulty: 2, locale: loc, unit: null }, { rng: makeRng(seed), variant: 1 });
      h = crypto.createHash('sha1').update((b.bodyHtml) + JSON.stringify(b.meta)).digest('hex').slice(0, 12);
    } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
    console.log(`${id} ${loc} ${h}`);
  }
}
