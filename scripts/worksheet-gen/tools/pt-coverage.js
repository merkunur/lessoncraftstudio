#!/usr/bin/env node
/**
 * pt-coverage.js — debug view of one traced drawing: grey = source ink, blue = skeleton covered by a guide, red =
 * skeleton NOT covered (a line the child would never trace). Prints the uncovered share.
 *   node tools/pt-coverage.js "animals bw/giraffe"   → out/pt/cov.png
 */
'use strict';
const path = require('path'); const sharp = require('sharp');
const { traceDrawing } = require('../lib/pt-trace.js');
const { coverage } = require('../lib/pt-verify.js');
(async () => {
  const rel = process.argv[2];
  const tr = await traceDrawing(path.join(__dirname, '..', 'cache', 'themes', rel + '@3x.webp'));
  const c = await coverage(tr);
  const { W, H } = tr; const out = Buffer.alloc(W * H * 3, 255);
  for (let i = 0; i < W * H; i++) {
    if (tr.ink[i]) out[i * 3] = out[i * 3 + 1] = out[i * 3 + 2] = 200;
    if (c.outMask[i]) { out[i * 3] = 0; out[i * 3 + 1] = 170; out[i * 3 + 2] = 0; continue; }
    if (tr.skeleton[i]) { const miss = c.missMask[i]; out[i * 3] = miss ? 255 : 0; out[i * 3 + 1] = 0; out[i * 3 + 2] = miss ? 0 : 255; }
  }
  console.log(rel, 'sw', tr.sw.toFixed(1), 'paths', tr.paths.length, 'blobs', tr.blobs.length, 'uncovered', (100 * c.miss).toFixed(1) + '%', 'outside-ink', (100 * c.outside).toFixed(2) + '%');
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png().toFile(path.join(__dirname, '..', 'out', 'pt', 'cov.png'));
})().catch((e) => { console.error(e); process.exit(1); });
