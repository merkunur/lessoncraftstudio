/**
 * The PUBLISHED Days and Months pages (K-321 + 5 faces, level 2, copy 1, 11 locales): one hash per page over the
 * body html + meta, for seed epochs 1..4 (the published page is epoch 1; the extra epochs widen the proof to other
 * draws of the same config). Run before and after a builder change and diff: any differing line = a published page
 * changed. Level Set 2026-10-06.
 */
'use strict';
const crypto = require('crypto');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..', '..');
const { loadType } = require(path.join(ROOT, 'lib/load-types.js'));
const { makeRng, instanceSeed } = require(path.join(ROOT, 'lib/rng.js'));
for (const id of ['K-321', 'K-337', 'G1-319', 'G1-320', 'G1-321', 'G1-322']) {
  const spec = loadType(id);
  for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
    for (const seedEpoch of [1, 2, 3, 4]) {
      const seed = instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch, variant: 1, unit: null });
      let h;
      try {
        const b = spec.build({ theme: null, difficulty: 2, locale: loc, unit: null }, { rng: makeRng(seed), variant: 1 });
        h = crypto.createHash('sha1').update(b.bodyHtml + JSON.stringify(b.meta)).digest('hex').slice(0, 12);
      } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
      console.log(`${id} ${loc} e${seedEpoch} ${h}`);
    }
  }
}
