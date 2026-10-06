/**
 * The PUBLISHED Division with Remainders pages (G3-377 animals, G3-380 fruits, G3-381..384 themeless; level 2, copy 1,
 * the exemplar unit, 11 locales): one hash per page over the body html + meta, for seed epochs 1..4. Run before and
 * after a builder change and diff: any differing line = a published page changed. Level Set 2026-10-06.
 */
'use strict';
const crypto = require('crypto');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..', '..');
const { loadType } = require(path.join(ROOT, 'lib/load-types.js'));
const { makeRng, instanceSeed } = require(path.join(ROOT, 'lib/rng.js'));
const THEME = { 'G3-377': 'animals', 'G3-380': 'fruits' };
for (const id of ['G3-377', 'G3-380', 'G3-381', 'G3-382', 'G3-383', 'G3-384']) {
  const spec = loadType(id);
  const theme = THEME[id] || null;
  for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
    for (const seedEpoch of [1, 2, 3, 4]) {
      const seed = instanceSeed({ typeId: id, theme, difficulty: 2, seedEpoch, variant: 1, unit: null });
      let h;
      try {
        const b = spec.build({ theme, difficulty: 2, locale: loc, unit: null }, { rng: makeRng(seed), variant: 1 });
        h = crypto.createHash('sha1').update(b.bodyHtml + JSON.stringify(b.meta)).digest('hex').slice(0, 12);
      } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
      console.log(`${id} ${loc} e${seedEpoch} ${h}`);
    }
  }
}
