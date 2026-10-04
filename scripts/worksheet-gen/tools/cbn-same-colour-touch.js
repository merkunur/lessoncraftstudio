#!/usr/bin/env node
/**
 * tools/cbn-same-colour-touch.js — list places where two DIFFERENT objects of the SAME colour touch (a red strawberry
 * on a red blanket: once coloured, one vanishes into the other). Grass/stem-style green-on-green is listed too and
 * judged by eye. Writes one line per (design, colour, object A, object B) with the shared boundary length.
 */
'use strict';
const puppeteer = require('puppeteer');
const { DESIGNS, build } = require('../data/cbn/designs.js');
const R = require('../lib/cbn-render.js');
(async () => {
  const b = await puppeteer.launch(); const p = await b.newPage(); await p.setContent('<html></html>');
  for (const d of DESIGNS) {
    const art = build(d); const S = 2;
    const svg = R.toSvg(art, { mode: 'id', width: art.w * S, height: art.h * S });
    const pairs = await p.evaluate(async ({ svg, W, H, n }) => {
      const img = new Image(); img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg))); await img.decode();
      const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const cx = cv.getContext('2d'); cx.fillStyle = '#000'; cx.fillRect(0, 0, W, H); cx.drawImage(img, 0, 0);
      const px = cx.getImageData(0, 0, W, H).data; const lab = new Int32Array(W * H).fill(-1);
      for (let i = 0; i < W * H; i++) { const r = px[i * 4], g = px[i * 4 + 1], bb = px[i * 4 + 2]; if ((r & 15) !== 8 || (g & 15) !== 8 || (bb & 15) !== 8) continue; const id = ((r >> 4) << 8) + ((g >> 4) << 4) + (bb >> 4) - 1; if (id >= 0 && id < n) lab[i] = id; }
      // two regions "touch" when they are within 6 px across an outline (outline ~6.4 px at S=2)
      const cnt = {};
      for (let y = 0; y < H; y++) for (let x = 0; x + 8 < W; x++) { const a = lab[y * W + x]; if (a < 0) continue; for (const [dx, dy] of [[8, 0], [0, 8]]) { if (y + dy >= H) continue; const c = lab[(y + dy) * W + x + dx]; if (c >= 0 && c !== a) { const k = a < c ? a + ',' + c : c + ',' + a; cnt[k] = (cnt[k] || 0) + 1; } } }
      return cnt;
    }, { svg, W: art.w * S, H: art.h * S, n: art.regions.length });
    const regs = art.regions;
    const gk = (i) => (regs[i].group ? 'g' + regs[i].group.id : 'r' + i);
    const out = new Map();
    for (const [k, v] of Object.entries(pairs)) {
      const [i, j] = k.split(',').map(Number);
      if (regs[i].colour !== regs[j].colour || regs[i].colour === 'none' || gk(i) === gk(j) || v < 20) continue;
      const nm = (r) => (r.group ? r.group.name : r.name);
      const key = [regs[i].colour, nm(regs[i]), nm(regs[j])].sort().join(' | ');
      out.set(key, (out.get(key) || 0) + v);
    }
    for (const [k, v] of out) console.log(`${d.id}\t${k}\t${v}`);
  }
  await b.close();
})();
