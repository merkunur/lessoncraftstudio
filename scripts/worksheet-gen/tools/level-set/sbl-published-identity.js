/**
 * Hash every PUBLISHED Sound Boxes page (K-318 + 5 faces, level 2, copy 1, its published theme — per locale where
 * it differs — 11 locales) with the code in THIS tree; run it before and after a change and diff (any differing
 * line = a published page moved). The themes are the live manifests' (measured 2026-10-01).
 */
'use strict';
const crypto = require('crypto');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const cfg = require('./sound-boxes.config.js');
for (const [id, face] of Object.entries(cfg.faces)) {
  const spec = loadType(id);
  for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
    const theme = (face.publishedByLoc && face.publishedByLoc[loc]) || face.published;
    const seed = instanceSeed({ typeId: id, theme, difficulty: 2, seedEpoch: 1, variant: 1 });
    let h;
    try {
      const b = spec.build({ theme, difficulty: 2, locale: loc }, { rng: makeRng(seed), variant: 1 });
      h = crypto.createHash('sha1').update(JSON.stringify(b.bodyHtml).replace(/file:\/\/\/[^"']*?\/cache\//g, 'CACHE/') + JSON.stringify(b.meta)).digest('hex').slice(0, 12);
    } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
    console.log(`${id} ${loc} ${theme} ${h}`);
  }
}
