#!/usr/bin/env node
/** fdx-aspect.js — the trimmed width / height of every usable catalogue drawing → data/fdx/aspect.json (generated, rebuilds byte-identically). */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const { CATALOG } = require('../data/fdx/catalog.js');
const LIB = path.join(__dirname, '..', 'cache', 'themes');
(async () => {
  const out = {};
  for (const [src, c] of CATALOG) {
    if (c.refused) continue;
    const t = await sharp(path.join(LIB, src + '@3x.webp')).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
    out[src] = +(t.info.width / t.info.height).toFixed(3);
  }
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'fdx', 'aspect.json'), JSON.stringify(out, null, 0));
  console.log(Object.keys(out).length, 'aspects');
})().catch((e) => { console.error(e); process.exit(1); });
