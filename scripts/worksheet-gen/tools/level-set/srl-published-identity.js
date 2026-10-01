/**
 * Hash every PUBLISHED Spelling Rules page (G2-315 + 5 faces, level 2, copy 1, no theme, no unit = the exemplar rule,
 * 11 locales) with the code in THIS tree; run it before and after a change and diff (a differing line = a published
 * page moved). Mirrors the original waves (wave-b3 / wave-b3var: unit null, variant 1).
 */
'use strict';
const crypto = require('crypto');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const cfg = require('./spelling-rules.config.js');
for (const id of Object.keys(cfg.faces)) {
  const spec = loadType(id);
  for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
    if (!cfg.include(loc, id)) continue;
    const seed = instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: 1, variant: 1, unit: null });
    let h;
    try {
      const b = spec.build({ theme: null, difficulty: 2, locale: loc, unit: null }, { rng: makeRng(seed), variant: 1 });
      h = crypto.createHash('sha1').update(JSON.stringify(b.bodyHtml).replace(/file:\/\/\/[^"']*?\/cache\//g, 'CACHE/') + JSON.stringify(b.meta)).digest('hex').slice(0, 12);
    } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
    console.log(`${id} ${loc} ${h}`);
  }
}
