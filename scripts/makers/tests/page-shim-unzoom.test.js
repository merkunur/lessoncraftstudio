#!/usr/bin/env node
/**
 * Test: the maker's gate frame measures a page at the catalogue's scale whatever the browser's zoom (page-shim.js unzoom,
 * 2026-11-05 — a teacher's Chrome at screen scale 1.2 refused 21 of 24 spelling pages: a 36 px picture measured 35.99 px;
 * 2026-11-06 — every Measure-with-a-Ruler page was refused at 1.2: its ruler ticks were read through getScreenCTM, which
 * the shim did not correct).
 *
 * Real pages built in Node as the maker builds them (G2-326 Spelling Rules level 2; G2-235 Measure with a Ruler level 1,
 * whose check reads SVG ticks through getScreenCTM) are mounted through mountHtml in Chrome at screen scale 1 and at
 * 1.2 / 0.9 / 1.75. At every scale, through the shim:
 *   - every element's getBoundingClientRect equals scale 1 (within 0.01 px);
 *   - every SVG element's getScreenCTM equals scale 1 (within 0.01 px / 0.0001 of scale);
 *   - a probe page's other measuring calls (offset*, client*, scroll*, inner*, getCTM, getBBox, getTotalLength,
 *     getPointAtLength, isPointInFill, getComputedTextLength, computed width, an SVGPoint through getScreenCTM and its
 *     inverse) equal scale 1 — a call that starts reading
 *     zoomed values in a later Chrome fails here instead of refusing teachers' pages.
 * Poisoned: the same pages at 1.2 WITHOUT the counter-zoom must differ (the comparison sees a zoom), and the shim with its
 * getScreenCTM correction cut out must make G2-235's matrices differ (the test sees that correction).
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
const { served } = require('../gates/lib/zoom-verify.js');

const SHIM = fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'platform', 'page-shim.js'), 'utf8');
// the poison: the shim without its getScreenCTM correction (the block that wraps SVGGraphicsElement.prototype)
const CUT = SHIM.replace(/const G = W\.SVGGraphicsElement[\s\S]*?\n  \}\r?\n/, '');   // (the file has CRLF endings)
if (CUT === SHIM) { console.log('FAIL the poison could not cut the getScreenCTM correction out of page-shim.js'); process.exit(1); }

function built(maker, id, difficulty) {
  const m = MP.builtMakers([maker])[0];
  const t = m && m.tj.templates.find((x) => x.id === id);
  if (!t) { console.log(`FAIL ${id} is not in the ${maker} maker`); process.exit(1); }
  return MP.buildShown(t, MP.loadType(t), m.tj, 'en', { difficulty, theme: t.themed ? MP.themesIn(t, 'en')[0] : null, unit: null, variant: 1 }).html;
}
const PAGES = { 'G2-326': built('spelling', 'G2-326', 2), 'G2-235': built('measurement', 'G2-235', 1) };
const PROBE = `<!doctype html><html><body style="margin:0"><div id="box" style="position:absolute;left:37px;top:53px;width:203px;height:101px;overflow:hidden;border:3px solid #000;padding:5px"><div style="width:400px;height:20px">wide child</div></div>
<svg id="s" style="position:absolute;left:100px;top:400px" width="300" height="80" viewBox="0 0 150 40"><line id="l" x1="10" y1="5" x2="110" y2="5" stroke="#000"/><path id="p" d="M10 20 L110 20" stroke="#000" fill="none"/><rect id="r" x="20" y="10" width="30" height="20" fill="#f00"/><text id="t" x="5" y="35" font-size="10">Abc</text></svg></body></html>`;

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  let fails = 0;
  const fail = (s) => { fails++; console.log('FAIL ' + s); };
  async function measure(dsf, shim, html) {
    const b = await puppeteer.launch(dsf === 1 ? {} : { args: ['--force-device-scale-factor=' + dsf] });
    try {
      const p = await b.newPage();
      if (dsf !== 1) await p.setViewport(null);
      await p.goto(base + '/', { waitUntil: 'load' });
      return await p.evaluate(async (shim, html) => {
        const f = document.createElement('iframe');
        f.style.cssText = 'position:absolute;left:-10000px;top:0;width:703px;height:945px;border:0';
        document.body.append(f);
        if (shim) {
          const module = { exports: {} };
          new Function('module', 'exports', shim)(module, module.exports);
          await module.exports.mountHtml(f, html);
        } else await new Promise((r) => { f.addEventListener('load', async () => { await f.contentDocument.fonts.ready; r(); }, { once: true }); f.srcdoc = html; });
        const d = f.contentDocument, W = f.contentWindow;
        const root = d.querySelector('.ws-page') ? '.ws-page ' : 'body ';
        const boxes = [...d.querySelectorAll(root + '*')].map((e) => { const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
        const ctms = [...d.querySelectorAll('svg, svg *')].filter((e) => e instanceof W.SVGGraphicsElement).map((e) => { const m = e.getScreenCTM(); return m ? [m.a, m.b, m.c, m.d, m.e, m.f] : null; });
        const o = {};
        const box = d.getElementById('box');
        if (box) {
          const l = d.getElementById('l'), pa = d.getElementById('p'), r = d.getElementById('r'), t = d.getElementById('t'), s = d.getElementById('s');
          o.offset = [box.offsetLeft, box.offsetTop, box.offsetWidth, box.offsetHeight];
          o.client = [box.clientWidth, box.clientHeight]; o.scroll = [box.scrollWidth, box.scrollHeight];
          o.docClient = [d.documentElement.clientWidth, d.documentElement.clientHeight]; o.inner = [W.innerWidth, W.innerHeight];
          const c = l.getCTM(); o.ctm = [c.a, c.d, c.e, c.f];
          const bb = r.getBBox(); o.bbox = [bb.x, bb.y, bb.width, bb.height];
          o.len = pa.getTotalLength(); const pt = pa.getPointAtLength(50); o.ptAt = [pt.x, pt.y];
          const q = s.createSVGPoint(); q.x = 30; q.y = 20; o.inFill = r.isPointInFill(q);
          o.textLen = t.getComputedTextLength(); o.cs = W.getComputedStyle(box).width;
          // the corrected matrix is used the way page checks use it: an SVGPoint through it, and its inverse
          // (a DOMMatrix in its place threw "parameter 1 is not of type 'SVGMatrix'" on every ruler page)
          const sp = s.createSVGPoint(); sp.x = 10; sp.y = 5; const tp = sp.matrixTransform(l.getScreenCTM()); o.ctmPoint = [tp.x, tp.y];
          const inv = l.getScreenCTM().inverse(); o.ctmInverse = [inv.a, inv.e, inv.f];
        }
        return { dpr: devicePixelRatio, zoom: d.documentElement.style.zoom || '', boxes, ctms, other: o };
      }, shim, served(html, base));
    } finally { await b.close(); }
  }
  const worst = (a, b, key) => { if (a[key].length !== b[key].length) return Infinity; let w = 0; a[key].forEach((x, i) => { if (!x || !b[key][i]) { if (x !== b[key][i]) w = Infinity; return; } x.forEach((v, k) => { w = Math.max(w, Math.abs(v - b[key][i][k])); }); }); return w; };
  for (const [id, html] of Object.entries(PAGES)) {
    const ref = await measure(1, SHIM, html);
    if (ref.zoom) fail(`${id} scale 1: the frame was zoomed (${ref.zoom}) — at scale 1 nothing may change`);
    if (ref.boxes.length < 30) fail(`${id}: the page has ${ref.boxes.length} elements (measured nothing?)`);
    if (id === 'G2-235' && ref.ctms.length < 20) fail(`${id}: the page has ${ref.ctms.length} SVG elements (the ruler did not render?)`);
    for (const dsf of [1.2, 0.9, 1.75]) {
      const z = await measure(dsf, SHIM, html);
      const wb = worst(ref, z, 'boxes'), wc = worst(ref, z, 'ctms');
      if (!(Math.abs(z.dpr - dsf) < 0.01)) fail(`${id} scale ${dsf}: the browser ran at ${z.dpr}`);
      if (!(wb <= 0.01)) fail(`${id} scale ${dsf}: boxes differ from scale 1 by up to ${wb.toFixed(3)} px through the shim`);
      else if (!(wc <= 0.01)) fail(`${id} scale ${dsf}: SVG screen matrices differ from scale 1 by up to ${wc.toFixed(4)} through the shim`);
      else console.log(`ok   ${id} scale ${dsf}: ${z.boxes.length} boxes + ${z.ctms.length} SVG matrices identical to scale 1 (worst ${Math.max(wb, wc).toFixed(4)}, frame zoom ${z.zoom})`);
    }
    // poison: the same page at 1.2 without the counter-zoom must differ — the comparison can see a zoom
    const plain = await measure(1.2, null, html);
    const wp = worst(ref, plain, 'boxes');
    if (!(wp > 0.1)) fail(`${id} poison: at 1.2 without the counter-zoom the boxes differ by only ${wp.toFixed(3)} px — the test cannot see a zoom`);
    else console.log(`ok   ${id} poison: at 1.2 without the counter-zoom boxes differ by up to ${wp.toFixed(3)} px`);
    if (id === 'G2-235') {
      const cut = await measure(1.2, CUT, html), wcut = worst(ref, cut, 'ctms');
      if (!(wcut > 0.1)) fail(`${id} poison: with the getScreenCTM correction cut out the matrices differ by only ${wcut.toFixed(3)} — the test cannot see it`);
      else console.log(`ok   ${id} poison: with the getScreenCTM correction cut out the SVG matrices differ by up to ${wcut.toFixed(3)}`);
    }
  }
  // every other measuring call a page check makes reads the same at every scale
  const pref = await measure(1, SHIM, PROBE);
  for (const dsf of [1.2, 0.9, 1.75]) {
    const z = await measure(dsf, SHIM, PROBE);
    const diff = Object.keys(pref.other).filter((k) => JSON.stringify(pref.other[k]) !== JSON.stringify(z.other[k]));
    if (Object.keys(pref.other).length < 10) fail('the probe measured nothing');
    else if (diff.length) fail(`probe scale ${dsf}: ${diff.map((k) => `${k} ${JSON.stringify(pref.other[k])} → ${JSON.stringify(z.other[k])}`).join(' · ')}`);
    else console.log(`ok   probe scale ${dsf}: ${Object.keys(pref.other).length} other measuring calls identical to scale 1`);
  }
  srv.close();
  console.log(fails ? `page-shim unzoom: ${fails} failing` : 'page-shim unzoom: a page measures the same at every screen scale, both poisons fire');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exit(1); });
