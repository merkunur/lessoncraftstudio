#!/usr/bin/env node
/**
 * build-picture-masks.js — two 24 × 24 alpha masks of every cached colour-theme picture (2026-11-02, Same & Different
 * maker), written to data/picture-masks.json and read synchronously (lib/picture-masks.js), so the pages that compare
 * picture SHAPES build without sharp — in Node and in a maker in the browser alike:
 *   a — the alpha channel fitted inside 24 × 24 (contain, transparent around): exactly image-cache/silhouette.js
 *       maskSignature (platform.picture.alphaMask24), so a page that picked by it picks the same pictures
 *   i — the ART alone: trimmed to its ink box, then stretched to 24 × 24 — the shape of the drawing itself, for the
 *       "what is it?" crops (the top part of the drawing, not of its padded box)
 * Each mask is 576 bits, stored as 144 hex characters (bit = alpha > 64, as maskSignature). ~830 KB for ~2,800 pictures.
 *   node tools/build-picture-masks.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { manifest } = require('../image-cache/resolve.js');

const CACHE = path.join(__dirname, '..', 'cache');
const bw = (t) => /\bbw(\s+\d+)?$/i.test(t);
const hex = (bits) => { let s = ''; for (let i = 0; i < bits.length; i += 4) s += ((bits[i] << 3) | (bits[i + 1] << 2) | (bits[i + 2] << 1) | bits[i + 3]).toString(16); return s; };

(async () => {
  const M = manifest(); const out = {}; let n = 0;
  for (const [theme, t] of Object.entries(M.themes || M)) {
    if (bw(theme) || !t || !t.nouns) continue;
    for (const [noun, v] of Object.entries(t.nouns)) {
      if (!v.files || !v.files[0]) continue;
      const f = path.join(CACHE, 'themes', theme, v.files[0]);
      if (!fs.existsSync(f)) continue;
      // a: as platform.picture.alphaMask24 (the same chain, so maskSignature and the file agree bit for bit)
      const a = await sharp(f).ensureAlpha().extractChannel(3).resize(24, 24, { fit: 'contain', background: { r: 0, g: 0, b: 0 } }).raw().toBuffer();
      // i: the drawing's own box — trim on the alpha channel, then fill 24 × 24
      const { data, info } = await sharp(f).ensureAlpha().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
      const i = await sharp(data, { raw: { width: info.width, height: info.height, channels: 1 } }).trim({ background: '#000000', threshold: 8 }).resize(24, 24, { fit: 'fill' }).extractChannel(0).raw().toBuffer();   // trim works in colour: back to one channel
      if (a.length !== 576 || i.length !== 576) throw new Error(`picture-masks: ${theme}/${noun} masks are ${a.length} / ${i.length} bytes`);
      (out[theme] = out[theme] || {})[noun] = { a: hex(Array.from(a, (x) => (x > 64 ? 1 : 0))), i: hex(Array.from(i, (x) => (x > 64 ? 1 : 0))) };
      n++;
    }
  }
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'picture-masks.json'), JSON.stringify(out));
  console.log(`${n} pictures in ${Object.keys(out).length} colour themes`);
})();
