#!/usr/bin/env node
/** fl-flip.js — the pictures that read as turned the other way when mirrored (docs/makers/FLAGSHIP.md): a front-facing face does not qualify. Writes data/fl/flip.json.
 * Score = mirror difference / ink at 16 px after a blur of 3 (the shape a child sees, not the line detail). Flagship visual
 * check 2026-11-08: the old score (16 px, no blur, > 0.5) kept front-facing ducks, sheep and alpacas whose flipped copy a
 * child cannot find. Read on contact sheets: under 0.22 none is usable; 0.22-0.30 mixed (only the reviewed keep list);
 * 0.30+ nearly all directional (minus the reviewed drop list). The lists are data/fl/flip-review.json. */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const FL = require('../lib/fl-art.js');
const { fileUri } = require('../image-cache/resolve.js');
const { fileURLToPath } = require('url');
(async () => {
  const out = [], list = FL.keys('pt'); let i = 0;
  const rev = JSON.parse(fs.readFileSync(path.join(FL.DIR, 'flip-review.json'), 'utf8'));
  for (const k of list) {
    const j = k.indexOf('/'); const f = fileURLToPath(fileUri(k.slice(0, j), k.slice(j + 1)));
    const N = 16, { data } = await sharp(f).flatten({ background: '#fff' }).trim({ threshold: 30 }).blur(3).resize(N, N, { fit: 'fill' }).greyscale().raw().toBuffer({ resolveWithObject: true });
    let diff = 0, ink = 0;
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const a = 255 - data[y * N + x], b = 255 - data[y * N + N - 1 - x]; ink += a; diff += Math.abs(a - b); }
    const sc = ink > 0 ? diff / ink : 0;
    if ((sc >= 0.30 && !rev.drop.includes(k)) || (sc >= 0.22 && rev.keep.includes(k))) out.push(k);
    if (++i % 400 === 0) console.log(i, out.length);
  }
  fs.writeFileSync(path.join(FL.DIR, 'flip.json'), JSON.stringify(out));
  console.log('flip pictures', out.length, 'of', list.length);
})();
