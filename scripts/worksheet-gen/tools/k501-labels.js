#!/usr/bin/env node
/**
 * k501-labels.js — the numbers of K-501 Trace, Then Color by Number (data/cbn/k501-labels.json).
 *
 * K-501 prints a Color by Number design as tracing guides. Its parts are not the Color by Number page's: the tracing store
 * draws every line of a drawing (a small shell's ridges, a starfish's dots), so the reviewed numbers of data/cbn/labels.json
 * sat on the lines a child traces (15 of 69 designs, flagship check 2026-11-09). Here every design is labelled on its own
 * traced page: the region map of the design (lib/cbn-render.js labelArt) with the traced scene's lines drawn over it in
 * black, solid (the dash gaps closed), so a part is what the child sees between lines; each part takes its region's
 * colour number at its deepest point (the Color by Number rules: a crumb or a hairline is no part, a part narrower than
 * MIN_R_TINY is too small for a number). A design is offered only when every colour of its key has a number on the page.
 *   node tools/k501-labels.js            all 69 designs
 *   node tools/k501-labels.js --poison   proves the overlay matters: without it the shell's number lands on its ridges
 */
'use strict';
const fs = require('fs'); const path = require('path');
const puppeteer = require('puppeteer');
const R = require('../lib/cbn-render.js');
const { DESIGNS, build: buildArt } = require('../data/cbn/designs.js');
const { composeSceneSync } = require('../lib/pt-scene.js');
const K501 = require('../types/k/K-501-trace-and-color-by-number.js');

const OUT = path.join(__dirname, '..', 'data', 'cbn', 'k501-labels.json');
const LABELS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'cbn', 'labels.json'), 'utf8'));
const CRUMB_AREA = 14, HAIRLINE_R = 2.5;   // lib/cbn-render.js (picture units)
const { sceneOf, LEVEL_DESIGNS } = K501.traceScene;

/** the traced scene's lines and marks, black and solid, as an overlay in picture units */
function overlayOf(svg) {
  const inner = svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>'));
  return '<g>' + inner
    .replace(/ stroke-dasharray="[^"]*"/g, '')
    .replace(/ stroke="#[0-9a-fA-F]{3,6}"/g, ' stroke="#000"')
    .replace(/ fill="#[0-9a-fA-F]{3,6}"/g, ' fill="#000"') + '</g>';
}

(async () => {
  const poison = process.argv.includes('--poison');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const out = {}; let offered = 0, moved = 0;
  for (const lv of [1, 2, 3]) for (const id of LEVEL_DESIGNS[lv]) {
    if (poison && id !== 'sea-turtle') continue;
    const d = DESIGNS.find((x) => x.id === id);
    const ref = LABELS[id];
    if (!d || !ref || ref.ok !== true) { out[id] = { ok: false, level: lv, why: 'no reviewed design' }; continue; }
    let scene;
    try { scene = composeSceneSync(sceneOf(id, lv)); } catch (e) { out[id] = { ok: false, level: lv, why: e.message }; continue; }
    const art = buildArt(d);
    const pieces = await R.labelArt(page, art, 2, poison ? '' : overlayOf(scene.svg));
    const labels = [], small = [];
    for (const p of pieces) {
      if (p.area < CRUMB_AREA || p.r < HAIRLINE_R || p.colour === 'none') continue;
      const n = ref.num[p.colour];
      if (n == null) continue;
      if (p.r < R.MIN_R_TINY) { small.push(p); continue; }
      labels.push([+p.x.toFixed(1), +p.y.toFixed(1), +p.r.toFixed(1), n]);
    }
    const missing = Object.entries(ref.num).filter(([, n]) => !labels.some((l) => l[3] === n)).map(([c, n]) => `${n} ${c}`);
    const ok = missing.length === 0;
    out[id] = { ok, level: lv, labels, unnumbered: small.length, ...(ok ? {} : { why: 'no part on the page for ' + missing.join(', ') }) };
    if (ok) offered++;
    if (labels.length !== ref.labels.length) moved++;
    console.log(`L${lv} ${id}: ${labels.length} numbers (Color by Number page ${ref.labels.length}), ${small.length} parts too small for a number${ok ? '' : ' — NOT OFFERED: ' + out[id].why}`);
  }
  await browser.close();
  if (poison) {
    // the sea turtle's shell (a small seashell, its ridges traced): without the overlay the region map numbers it as the
    // Color by Number page does (3 sixes: the shell + two slivers of its fan); the traced ridges split it into its strips
    const six = out['sea-turtle'].labels.filter((l) => l[3] === 6).length;
    const shipped = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8'))['sea-turtle'] : null;
    const withOverlay = shipped ? shipped.labels.filter((l) => l[3] === 6).length : NaN;
    const killed = withOverlay > six;
    console.log(killed ? `poison: ${six} sixes without the overlay, ${withOverlay} in the shipped labels — the overlay splits the shell (ok)` : `POISON NOT KILLED: ${six} sixes without the overlay, ${withOverlay} shipped`);
    process.exit(killed ? 0 : 1);
  }
  fs.writeFileSync(OUT, JSON.stringify(out));
  console.log(`k501-labels: ${offered} of ${Object.keys(out).length} designs offered, ${moved} numbered differently from the Color by Number page → ${path.relative(process.cwd(), OUT)}`);
})().catch((e) => { console.error(e.stack); process.exit(1); });
