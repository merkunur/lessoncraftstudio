#!/usr/bin/env node
/**
 * Test: the maker's gate frame measures a page at the catalogue's scale whatever the browser's zoom (page-shim.js unzoom,
 * 2026-11-05 — a teacher's Chrome at screen scale 1.2 refused 21 of 24 spelling pages: a 36 px picture measured 35.99 px).
 *
 * One real page (G2-326 Spelling Rules, level 2, en, built in Node as the maker builds it) is mounted through mountHtml in
 * Chrome at screen scale 1 and at 1.2 / 0.9 / 1.75; every element's getBoundingClientRect in the page must be the same at
 * every scale (within 0.01 px). Poisoned both ways: the same page at 1.2 WITHOUT the counter-zoom must differ (the
 * comparison sees the zoom), and the probe that decides whether to correct must find the browser reporting zoomed boxes.
 *
 *   node scripts/makers/tests/page-shim-unzoom.test.js
 */
'use strict';
const fs = require('fs');
const http = require('http');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const MP = require('../gates/lib/maker-pages.js');
const { handler } = require('../serve.js');

const SHIM = fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'platform', 'page-shim.js'), 'utf8');
const m = MP.builtMakers(['spelling'])[0];
const t = m.tj.templates.find((x) => x.id === 'G2-326');
if (!t) { console.log('FAIL G2-326 is not in the spelling maker'); process.exit(1); }
const page = MP.buildShown(t, MP.loadType(t), m.tj, 'en', { difficulty: 2, theme: t.themed ? MP.themesIn(t, 'en')[0] : null, unit: null, variant: 1 }).html;

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  // the fonts as the maker serves them (a file:// font from an http page does not load: a fallback font would measure)
  const html = page.replace(/file:\/\/\/[^"')]*?\/assets\/fonts\//g, base + '/makers-assets/fonts/');
  let fails = 0;
  const fail = (s) => { fails++; console.log('FAIL ' + s); };
  async function boxes(dsf, useShim) {
    const b = await puppeteer.launch(dsf === 1 ? {} : { args: ['--force-device-scale-factor=' + dsf] });
    try {
      const p = await b.newPage();
      if (dsf !== 1) await p.setViewport(null);
      await p.goto(base + '/', { waitUntil: 'load' });
      return await p.evaluate(async (SHIM, html, useShim) => {
        const module = { exports: {} };
        new Function('module', 'exports', SHIM)(module, module.exports);
        const f = document.createElement('iframe');
        f.style.cssText = 'position:absolute;left:-10000px;top:0;width:703px;height:945px;border:0';
        document.body.append(f);
        if (useShim) await module.exports.mountHtml(f, html);
        else await new Promise((r) => { f.addEventListener('load', async () => { await f.contentDocument.fonts.ready; r(); }, { once: true }); f.srcdoc = html; });
        const d = f.contentDocument;
        return { dpr: devicePixelRatio, zoom: d.documentElement.style.zoom || '', boxes: [...d.querySelectorAll('.ws-page *')].map((e) => { const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; }) };
      }, SHIM, html, useShim);
    } finally { await b.close(); }
  }
  const worst = (a, b) => { if (a.boxes.length !== b.boxes.length) return Infinity; let w = 0; a.boxes.forEach((x, i) => x.forEach((v, k) => { w = Math.max(w, Math.abs(v - b.boxes[i][k])); })); return w; };
  const ref = await boxes(1, true);
  if (ref.zoom) fail(`scale 1: the frame was zoomed (${ref.zoom}) — at scale 1 nothing may change`);
  if (ref.boxes.length < 50) fail(`the page has ${ref.boxes.length} elements (measured nothing?)`);
  for (const dsf of [1.2, 0.9, 1.75]) {
    const z = await boxes(dsf, true);
    const w = worst(ref, z);
    if (!(Math.abs(z.dpr - dsf) < 0.01)) fail(`scale ${dsf}: the browser ran at ${z.dpr}`);
    if (!(w <= 0.01)) fail(`scale ${dsf}: boxes differ from scale 1 by up to ${w.toFixed(3)} px through the shim`);
    else console.log(`ok   scale ${dsf}: ${z.boxes.length} boxes identical to scale 1 (worst ${w.toFixed(3)} px, frame zoom ${z.zoom})`);
  }
  // poison: the same page at 1.2 without the counter-zoom must differ — the comparison can see a zoom
  const plain = await boxes(1.2, false);
  const wp = worst(ref, plain);
  if (!(wp > 0.1)) fail(`poison: at 1.2 without the counter-zoom the boxes differ by only ${wp.toFixed(3)} px — the test cannot see a zoom`);
  else console.log(`ok   poison: at 1.2 without the counter-zoom boxes differ by up to ${wp.toFixed(3)} px`);
  srv.close();
  console.log(fails ? `page-shim unzoom: ${fails} failing` : 'page-shim unzoom: a page measures the same at every screen scale, poison fires');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exit(1); });
