#!/usr/bin/env node
/**
 * build-art-extents.js — writes data/art-extents.json: the drawn extent (image-cache/silhouette.js artExtent) of every
 * picture of every theme, so builders can read it SYNCHRONOUSLY (artExtentSync). Measurement Level Set 2026-10-09: the
 * wave tools build synchronously, and an async build's failure was invisible to them. Re-run after the image cache
 * changes; artExtentSync refuses a picture it has no extent for.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { manifest } = require('../image-cache/resolve.js');
const { artExtent } = require('../image-cache/silhouette.js');
(async () => {
  const m = manifest(); const out = {}; let n = 0;
  for (const t of Object.keys(m.themes).sort()) {
    for (const noun of Object.keys(m.themes[t].nouns).sort()) {
      try { const e = await artExtent(t, noun); out[t + '//' + noun] = [e.widthFrac, e.leftFrac, e.heightFrac, e.topFrac]; n++; } catch (e) { /* not cached */ }
    }
  }
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'art-extents.json'), JSON.stringify(out) + '\n');
  console.log('extents', n);
})();
