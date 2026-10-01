/**
 * Hash every PUBLISHED Singular and Plural page (K-287 + 5 faces, level 2, copy 1, its published theme, 11 locales) with
 * the code in THIS tree; run it in the working tree and in a HEAD copy and diff (any differing line = a published page moved).
 */
'use strict';
const crypto = require('crypto');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const PUB = { 'K-287': 'fruits', 'K-302': 'animals', 'K-303': 'vehicles', 'K-313': 'fruits', 'K-314': 'toys', 'K-316': 'animals' };
for (const [id, theme] of Object.entries(PUB)) {
  const spec = loadType(id);
  for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
    const seed = instanceSeed({ typeId: id, theme, difficulty: 2, seedEpoch: 1, variant: 1 });
    let h;
    try {
      const b = spec.build({ theme, difficulty: 2, locale: loc }, { rng: makeRng(seed), variant: 1 });
      h = crypto.createHash('sha1').update(JSON.stringify(b.bodyHtml).replace(/file:\/\/\/[^"']*?\/cache\//g, 'CACHE/') + JSON.stringify(b.meta)).digest('hex').slice(0, 12);
    } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
    console.log(`${id} ${loc} ${theme} ${h}`);
  }
}
