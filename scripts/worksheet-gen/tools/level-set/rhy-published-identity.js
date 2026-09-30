/**
 * Hash every PUBLISHED Rhyming Words page (level 2, copy 1, no unit — the coordinate the live decks were built from)
 * with the code in THIS tree. Run it in the working tree and in a HEAD copy and diff the two outputs: any line that
 * differs is a published page the change would move.
 *   node tools/level-set/rhy-published-identity.js > out.txt
 */
'use strict';
const crypto = require('crypto');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const PUBLISHED = { 'G1-345': ['en', 'de', 'es', 'fr', 'pt', 'nl', 'sv', 'da', 'no', 'fi'] };
for (const id of ['G1-309', 'K-352', 'G1-343', 'G1-344', 'G1-345', 'G1-346']) {
  const spec = loadType(id);
  for (const loc of PUBLISHED[id] || ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
    const seed = instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: 1, variant: 1, unit: null });
    let h;
    try {
      const b = spec.build({ theme: null, difficulty: 2, locale: loc, unit: null }, { rng: makeRng(seed), variant: 1 });
      // absolute file paths differ between trees — hash the page with the tree root normalised away
      const norm = (x) => JSON.stringify(x).replace(/file:\/\/\/[^"']*?\/cache\//g, 'CACHE/');
      h = crypto.createHash('sha1').update(norm(b.bodyHtml) + norm(b.meta)).digest('hex').slice(0, 12);
    } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
    console.log(`${id} ${loc} ${h}`);
  }
}
