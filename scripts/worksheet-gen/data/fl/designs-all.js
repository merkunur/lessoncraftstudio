/** every B&W library picture as a one-drawing design, for tools/cbn-lineart-build.js --designs (docs/makers/FLAGSHIP.md) */
'use strict';
const path = require('path');
const { bwPictures, slugOf } = require('../../lib/fl-art.js');
const manifest = require(path.join(__dirname, '..', '..', 'cache', 'manifest.json'));
// a picture too plain for three colours (data/fl/cbn-ground.json, tools/fl-cbn.js --ground) stands on a mound, as the reviewed designs do
let ground = []; try { ground = require('./cbn-ground.json'); } catch (e) { /* none yet */ }
const GROUND_LINE = { d: 'M50 497a250 38 0 1 0 500 0a250 38 0 1 0 -500 0', w: 12 };
const onGround = new Set(ground);
const LINEART = bwPictures(manifest).map((p) => { const id = slugOf(p.key); return onGround.has(id)
  ? { id, kind: 'picture', level: 2, names: { en: p.noun }, items: [{ src: p.key, fit: [500, 430], bottom: 503 }], lines: [GROUND_LINE], fixed: [{ name: 'ground', at: [300, 524], colour: 'green' }], colours: [] }
  : { id, kind: 'picture', level: 2, names: { en: p.noun }, items: [{ src: p.key, fit: [540, 500] }], colours: [] }; });
module.exports = { LINEART };
