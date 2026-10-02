/**
 * The PUBLISHED Word Families pages (G1-306 + 5 faces, level 2, copy 1, 11 locales) with the ARTWORK masked:
 * the hash covers which story, which panel rank sits in which slot, every stamp outside the pictures, and every
 * printed word — never the drawing inside a picture (2026-10-01: the pictures are redrawn on purpose). Run it in
 * the tree and in a HEAD copy and diff: a differing line = a published page changed something besides its art.
 */
'use strict';
const crypto = require('crypto');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..', '..');
const { loadType } = require(path.join(ROOT, 'lib/load-types.js'));
const { makeRng, instanceSeed } = require(path.join(ROOT, 'lib/rng.js'));
// strip the inside of every story-panel svg (keep its own stamps) and every viewBox (the zoom window moved)
// (2026-10-01) the card colour around a picture is now the scene's own top colour: masked with the art
const mask = (html) => html.replace(/(class="ss-card"[^>]*?background:)#[0-9A-Fa-f]{6}/g, '$1SKY').replace(/(<svg[^>]*data-lcs-story-panel="1"[^>]*>)[\s\S]*?<\/svg>/g, (m, open) => open.replace(/ (viewBox|width|height)="[^"]*"/g, '') + '</svg>');
for (const id of ['G1-306', 'G1-330', 'G1-331', 'G1-332', 'G1-333', 'G1-334']) {
  const spec = loadType(id);
  for (const loc of ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
    const seed = instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: 1, variant: 1, unit: null });
    let h;
    try {
      const b = spec.build({ theme: null, difficulty: 2, locale: loc, unit: null }, { rng: makeRng(seed), variant: 1 });
      h = crypto.createHash('sha1').update(mask(b.bodyHtml) + JSON.stringify(b.meta)).digest('hex').slice(0, 12);
    } catch (e) { h = 'THROWS ' + e.message.slice(0, 80); }
    console.log(`${id} ${loc} ${h}`);
  }
}
