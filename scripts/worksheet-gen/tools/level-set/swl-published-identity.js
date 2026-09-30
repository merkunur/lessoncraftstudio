/**
 * Hash every PUBLISHED Sight Words page (K-239 + K-259..K-263, level 2, copy 1, all 11 locales) with the code in THIS
 * tree; run it in the working tree and in a HEAD copy and diff the outputs (any differing line = a published page moved).
 */
'use strict';
const crypto = require('crypto');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
for (const id of ['K-239', 'K-259', 'K-260', 'K-261', 'K-262', 'K-263']) {
  const spec = loadType(id);
  for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
    const seed = instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: 1, variant: 1 });
    let h;
    try {
      const b = spec.build({ theme: null, difficulty: 2, locale: loc }, { rng: makeRng(seed), variant: 1 });
      h = crypto.createHash('sha1').update(JSON.stringify(b.bodyHtml) + JSON.stringify(b.meta)).digest('hex').slice(0, 12);
    } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
    console.log(`${id} ${loc} ${h}`);
  }
}
