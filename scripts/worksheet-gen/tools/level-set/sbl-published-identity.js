/**
 * Hash every PUBLISHED Sentence Building page (level 2, copy 1, the published themes) with the code in THIS tree; run it
 * in the working tree and in a HEAD copy and diff the outputs (any differing line = a published page the change moves).
 */
'use strict';
const crypto = require('crypto');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
for (const id of ['G1-249', 'G1-282', 'G1-283', 'G1-302']) {
  const spec = loadType(id);
  for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) for (const theme of ['animals', 'fruits']) {
    const seed = instanceSeed({ typeId: id, theme, difficulty: 2, seedEpoch: 1, variant: 1 });
    let h;
    try {
      const b = spec.build({ theme, difficulty: 2, locale: loc }, { rng: makeRng(seed), variant: 1 });
      h = crypto.createHash('sha1').update(JSON.stringify(b.bodyHtml).replace(/file:\/\/\/[^"']*?\/cache\//g, 'CACHE/')).digest('hex').slice(0, 12);
    } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
    console.log(`${id} ${loc} ${theme} ${h}`);
  }
}
