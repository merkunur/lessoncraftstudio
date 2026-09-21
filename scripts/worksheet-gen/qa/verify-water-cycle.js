#!/usr/bin/env node
/**
 * verify-water-cycle.js — the node gate of primitives/water-cycle.js (K-356
 * `weather-symbols` F4; design docs/worksheet-gen/b4-designs/K-356-weather.md
 * §2 "Node gate qa/verify-water-cycle.js"). Parses the EMITTED SVG (never the
 * primitive's own return alone) and then MEASURES THE RENDER in Chromium
 * (the G2-235 ruler precedent: a derived constant is not a measurement).
 *
 *   node scripts/worksheet-gen/qa/verify-water-cycle.js [--quick]
 *
 * 1. GEOMETRY (node, from the markup)
 *    (a) every ANCHOR lies inside its HOST bbox (cloud / water / rain-lines /
 *        arrow bboxes, viewBox coords);
 *    (b) with all five markers placed, every <g data-lcs-marker> holds a
 *        halo r 17 + a disc r 13 + a numeral, centred within 2 px of the
 *        returned px anchor (cx * scale);
 *    (c) marker spacing: every placed pair >= MARKER_MIN_GAP (50) px; the
 *        closest pair is reported; the five-marker set at w 480 (runoff 42.5
 *        px from precipitation) is refused by the primitive (asserted), so
 *        w 480 is checked with the four d2 markers;
 *    (d) MIN_W: w 479 THROWS; w 480 renders at 300 high; w 608 at 380;
 *    (e) only token hexes on every fill / stroke (the palette lint's rule,
 *        applied here in node);
 *    (f) draw order: land before water, cloud before the rain, markers LAST;
 *        every arrow group present (evaporation / precipitation / runoff);
 *        six rain lines each ending ON the land curve (landY(x) within 0.01);
 *        no <img>, no text but the marker numerals; aria-label "".
 *    (g) unknown anchor / duplicate anchor / n outside 1..9 THROW.
 * 2. RENDER (puppeteer over file://, the shell fonts): the svg measures w x
 *    h; every marker disc's getBoundingClientRect centre sits within 2 px of
 *    the returned px anchor offset by the svg's origin; every numeral's
 *    rendered font-size >= 16 px at w 608 (>= 12 at w 480).
 * 3. POISON — each must FAIL for its OWN reason (the unmodified primitive is
 *    the control):
 *    PW1 an anchor moved outside its host (condensation to (449,300))
 *    PW2 a marker off its anchor by 20 px in the markup     → rule (b)
 *    PW3 two returned anchors 19 px apart                    → rule (c)
 *    PW4 an off-palette hex injected                        → rule (e)
 *    PW5 a rain line ending 10 px above the land            → rule (f)
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const tokens = require('../primitives/_tokens.js');
const WC = require('../primitives/water-cycle.js');

const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const ALL = Object.keys(WC.ANCHORS);
const MARKERS = ALL.map((anchor, i) => ({ anchor, n: i + 1 }));
// at MIN_W 480 the closest pair (precipitation / runoff, 56.6 viewBox units) is 42.5 px < 50, so the five-marker
// (d3) set is REFUSED there by construction and only the four d2 markers render; measured 2026-09-21, recorded
// in _work/K-356-build.md (the design's "MIN_W 480" and ">= 50 px" cannot both hold for runoff below w ~566)
const D2_MARKERS = MARKERS.slice(0, 4);
const markersFor = (w) => (w >= 566 ? MARKERS : D2_MARKERS);

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }

/* ------------------------------------------------------------------ markup checks (pure functions over an SVG string) */
function markerGroups(svg) {
  const out = [];
  const re = /<g data-lcs-marker="([^"]+)" data-lcs-n="(\d+)">([\s\S]*?)<\/g>/g;
  let m;
  while ((m = re.exec(svg))) {
    const circles = [...m[3].matchAll(/<circle cx="([-\d.]+)" cy="([-\d.]+)" r="([-\d.]+)"/g)].map((c) => ({ cx: +c[1], cy: +c[2], r: +c[3] }));
    const text = (m[3].match(/<text[^>]*>([^<]*)<\/text>/) || [])[1];
    out.push({ anchor: m[1], n: +m[2], circles, text });
  }
  return out;
}
function hexes(svg) {
  return [...svg.matchAll(/(?:fill|stroke)="(#[0-9a-fA-F]{3,6})"/g)].map((m) => m[1].toUpperCase());
}
function checkMarkup(name, res, w, anchorsVb = WC.ANCHORS, placed = ALL) {
  const f = [];
  const push = (m) => f.push(`${name}: ${m}`);
  const svg = res.svg;
  // (a) anchors inside hosts
  for (const [k, a] of Object.entries(anchorsVb)) {
    const h = WC.HOSTS[k];
    if (!h) { push(`anchor ${k} has no host`); continue; }
    if (!(a.x >= h.x0 && a.x <= h.x1 && a.y >= h.y0 && a.y <= h.y1)) push(`anchor ${k} (${a.x},${a.y}) outside ${h.what} [${h.x0}..${h.x1} x ${h.y0}..${h.y1}]`);
  }
  // (b) markers centred at the returned px anchors
  const groups = markerGroups(svg);
  if (groups.length !== placed.length) push(`${groups.length} marker groups ≠ ${placed.length}`);
  if (groups.map((g) => g.anchor).join() !== placed.join()) push(`marker anchors ${groups.map((g) => g.anchor).join(',')} ≠ ${placed.join(',')}`);
  for (const g of groups) {
    const want = res.anchors[g.anchor];
    if (!want) { push(`marker ${g.anchor}: no returned anchor`); continue; }
    if (g.circles.length !== 2) push(`marker ${g.anchor}: ${g.circles.length} circles ≠ 2`);
    const rs = g.circles.map((c) => c.r).sort((a, b) => b - a);
    if (rs[0] !== 17 || rs[1] !== 13) push(`marker ${g.anchor}: radii ${rs.join('/')} ≠ 17/13`);
    for (const c of g.circles) {
      const dx = Math.abs(c.cx * res.scale - want.x), dy = Math.abs(c.cy * res.scale - want.y);
      if (dx > 2 || dy > 2) push(`marker ${g.anchor}: circle at (${c.cx},${c.cy}) → (${(c.cx * res.scale).toFixed(1)},${(c.cy * res.scale).toFixed(1)}) px is ${Math.max(dx, dy).toFixed(1)} px off the returned anchor (${want.x},${want.y})`);
    }
    if (String(g.n) !== g.text) push(`marker ${g.anchor}: numeral "${g.text}" ≠ n ${g.n}`);
  }
  // (c) spacing
  let closest = Infinity, pair = '';
  for (let i = 0; i < placed.length; i++) for (let j = i + 1; j < placed.length; j++) {
    const a = res.anchors[placed[i]], b = res.anchors[placed[j]];
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < closest) { closest = d; pair = placed[i] + '/' + placed[j]; }
    if (d < WC.MARKER_MIN_GAP) push(`markers ${placed[i]} / ${placed[j]} are ${d.toFixed(1)} px apart < ${WC.MARKER_MIN_GAP}`);
  }
  // (e) palette
  for (const h of new Set(hexes(svg))) if (!PALETTE.has(h)) push(`off-palette hex ${h}`);
  // (f) order + parts
  const idx = (needle) => svg.indexOf(needle);
  const iLand = idx('data-lcs-part="land"'), iWater = idx('data-lcs-part="water"'), iCloud = idx('data-lcs-part="cloud"'), iRain = idx('data-lcs-part="rain"'), iMarker = idx('data-lcs-marker=');
  if (!(iLand >= 0 && iWater > iLand)) push('water is not drawn after the land');
  if (!(iCloud >= 0 && iRain > iCloud)) push('the rain is not drawn after the cloud');
  const lastPart = Math.max(...[...svg.matchAll(/data-lcs-(?:part|arrow)="[^"]+"/g)].map((m) => m.index));
  if (!(iMarker > lastPart)) push('markers are not drawn last');
  for (const a of ['evaporation', 'precipitation', 'runoff']) if (!svg.includes(`data-lcs-arrow="${a}"`)) push(`arrow group ${a} missing`);
  const rains = [...svg.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"[^>]*data-lcs-part="rain"/g)];
  if (rains.length !== 6) push(`${rains.length} rain lines ≠ 6`);
  for (const r of rains) {
    const x = +r[1], y2 = +r[4];
    if (+r[2] !== 166) push(`rain line at x ${x} starts at y ${r[2]} ≠ 166`);
    const want = WC.landY(x);
    if (Math.abs(y2 - want) > 0.01) push(`rain line at x ${x} ends at y ${y2}, the land is at ${want.toFixed(2)}`);
  }
  if (/<img/.test(svg)) push('an <img> on the diagram');
  const texts = [...svg.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]);
  if (texts.some((t) => !/^\d$/.test(t))) push(`a non-numeral text node: ${JSON.stringify(texts)}`);
  if (!/aria-label=""/.test(svg)) push('aria-label is not empty');
  if (!/data-lcs-prim="water-cycle"/.test(svg)) push('root not stamped data-lcs-prim="water-cycle"');
  const wantH = +(w * 400 / 640).toFixed(2);
  if (res.width !== w || Math.abs(res.height - wantH) > 0.01) push(`size ${res.width} x ${res.height} ≠ ${w} x ${wantH}`);
  return { findings: f, closest: +closest.toFixed(1), pair };
}

/* ------------------------------------------------------------------ render */
async function measureRender(page, svg, w, tag) {
  const fontCss = require('url').pathToFileURL(path.join(__dirname, '..', 'assets', 'fonts', 'fonts.css')).href;
  const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${fontCss}"><style>body{margin:0;padding:20px;background:#FBF3E4}</style></head><body>${svg}</body></html>`;
  fs.mkdirSync(OUT, { recursive: true });
  const file = path.join(OUT, `K-356-water-cycle-${tag}.html`);
  fs.writeFileSync(file, html, 'utf8');
  await page.setViewport({ width: 703, height: 500, deviceScaleFactor: 2 });
  await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const m = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const sr = svg.getBoundingClientRect();
    const markers = [...svg.querySelectorAll('[data-lcs-marker]')].map((g) => {
      const disc = [...g.querySelectorAll('circle')].sort((a, b) => +a.getAttribute('r') - +b.getAttribute('r'))[0];
      const r = disc.getBoundingClientRect();
      const t = g.querySelector('text');
      const tr = t.getBoundingClientRect();
      // the RENDERED numeral size: getComputedStyle reports the unscaled 17 (the viewBox transform is not a style),
      // so the effective px = 17 x (rendered svg width / 640), cross-checked against a canvas measurement of the
      // same digit at that size (the svg text's rendered advance width must agree within 1.5 px; a 17 px error would read ~7 px)
      const fontPx = 17 * sr.width / 640;
      const cv = document.createElement('canvas').getContext('2d');
      cv.font = `700 ${fontPx}px 'Baloo 2'`;
      const canvasW = cv.measureText(t.textContent).width;
      return { anchor: g.dataset.lcsMarker, cx: r.left + r.width / 2 - sr.left, cy: r.top + r.height / 2 - sr.top, disc: r.width, fontPx, textW: tr.width, canvasW };
    });
    return { w: sr.width, h: sr.height, markers };
  });
  await page.screenshot({ path: path.join(OUT, `K-356-water-cycle-${tag}.png`) });
  return m;
}

/* ------------------------------------------------------------------ main */
async function main() {
  // 1. geometry at 608 + 480
  const results = {};
  for (const w of [608, 480]) {
    const res = WC.waterCycle({ w, markers: markersFor(w) });
    results[w] = res;
    const c = checkMarkup(`w ${w}`, res, w, WC.ANCHORS, markersFor(w).map((m) => m.anchor));
    ok(c.findings.length === 0, `w ${w}: ${c.findings.length} findings\n    ` + c.findings.slice(0, 10).join('\n    '));
    console.log(`geometry w ${w}: ${res.width} x ${res.height} (scale ${res.scale.toFixed(4)}), ${markersFor(w).length} markers, closest ${c.pair} ${c.closest} px (floor ${WC.MARKER_MIN_GAP}), ${c.findings.length} findings`);
  }
  // (c) the primitive's OWN spacing refusal: the five-marker set at w 480 (runoff 42.5 px from precipitation) THROWS
  { let t = null; try { WC.waterCycle({ w: 480, markers: MARKERS }); } catch (e) { t = e.message; }
    ok(t && /markers runoff \/ precipitation are 42\.5 px apart < 50/.test(t), `five markers at w 480 did not throw the spacing refusal (${t})`);
    const five608 = WC.waterCycle({ w: 608, markers: MARKERS });
    ok(markerGroups(five608.svg).length === 5, 'five markers at w 608 did not render'); }
  // (d) MIN_W
  { let threw = null; try { WC.waterCycle({ w: 479 }); } catch (e) { threw = e.message; }
    ok(threw && /w 479 < MIN_W 480/.test(threw), `w 479 did not throw the MIN_W refusal (${threw})`); }
  // (g) marker refusals
  { let t = null; try { WC.waterCycle({ markers: [{ anchor: 'sea', n: 1 }] }); } catch (e) { t = e.message; } ok(t && /unknown anchor "sea"/.test(t), `unknown anchor did not throw (${t})`); }
  { let t = null; try { WC.waterCycle({ markers: [{ anchor: 'collection', n: 1 }, { anchor: 'collection', n: 2 }] }); } catch (e) { t = e.message; } ok(t && /carries two markers/.test(t), `duplicate anchor did not throw (${t})`); }
  { let t = null; try { WC.waterCycle({ markers: [{ anchor: 'collection', n: 0 }] }); } catch (e) { t = e.message; } ok(t && /is not 1\.\.9/.test(t), `n 0 did not throw (${t})`); }
  // a bare diagram (no markers) still carries every part
  { const bare = WC.waterCycle({ w: 608 }); ok(markerGroups(bare.svg).length === 0 && /data-lcs-markers="0"/.test(bare.svg), 'a bare diagram carries markers'); }

  // 2. render
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    for (const w of QUICK ? [608] : [608, 480]) {
      const res = results[w];
      const m = await measureRender(page, res.svg, w, `w${w}`);
      ok(Math.abs(m.w - w) < 0.6 && Math.abs(m.h - res.height) < 0.6, `render w ${w}: measures ${m.w.toFixed(1)} x ${m.h.toFixed(1)} ≠ ${w} x ${res.height}`);
      ok(m.markers.length === markersFor(w).length, `render w ${w}: ${m.markers.length} markers ≠ ${markersFor(w).length}`);
      const floor = w >= 608 ? 16 : 12;
      for (const mk of m.markers) {
        const want = res.anchors[mk.anchor];
        const off = Math.hypot(mk.cx - want.x, mk.cy - want.y);
        ok(off <= 2, `render w ${w}: marker ${mk.anchor} disc centre (${mk.cx.toFixed(1)},${mk.cy.toFixed(1)}) is ${off.toFixed(1)} px off the returned anchor (${want.x},${want.y})`);
        ok(mk.fontPx >= floor - 0.05, `render w ${w}: marker ${mk.anchor} numeral ${mk.fontPx.toFixed(2)} px < ${floor}`);
        ok(Math.abs(mk.textW - mk.canvasW) <= 1.5, `render w ${w}: marker ${mk.anchor} numeral ink ${mk.textW.toFixed(2)} px ≠ a ${mk.fontPx.toFixed(2)} px digit (${mk.canvasW.toFixed(2)}): the rendered size is not ${mk.fontPx.toFixed(2)}`);
        ok(mk.disc >= 26 * res.scale - 0.6, `render w ${w}: marker ${mk.anchor} disc ${mk.disc.toFixed(1)} px < ${(26 * res.scale).toFixed(1)}`);
      }
      console.log(`render w ${w}: svg ${m.w.toFixed(1)} x ${m.h.toFixed(1)}; numerals ${m.markers.map((k) => k.fontPx.toFixed(1)).join('/')} px (floor ${floor}); max marker offset ${Math.max(...m.markers.map((mk) => Math.hypot(mk.cx - res.anchors[mk.anchor].x, mk.cy - res.anchors[mk.anchor].y))).toFixed(2)} px`);
    }

    // 3. poisons
    const log = [];
    let killed = 0;
    const judge = (name, findings, re) => { const hit = findings.some((x) => re.test(x)); log.push(`  ${name}: ${hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT'}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 2))}`); if (hit) killed++; };
    const good = results[608];
    { const c = checkMarkup('control', good, 608); log.push(`  control: ${c.findings.length ? 'FAILS — ' + c.findings[0] : 'PASSES (control)'}`); }
    // PW1 — an anchor table with condensation moved onto the land (the primitive's table is frozen; the checker takes the table as a parameter)
    { const c = checkMarkup('PW1', good, 608, { ...WC.ANCHORS, condensation: { x: 449, y: 300 } });
      judge('PW1 anchor outside its host', c.findings, /anchor condensation \(449,300\) outside the cloud bbox/); }
    // PW2 — a marker off its anchor by 20 px in the markup
    { const svg = good.svg.replace(/(<g data-lcs-marker="collection" data-lcs-n="4"><circle cx=")150(")/, '$1170$2');
      const c = checkMarkup('PW2', { ...good, svg }, 608);
      judge('PW2 marker 20 px off', c.findings, /marker collection: circle at \(170,344\).*px off the returned anchor/); }
    // PW3 — two returned anchors 19 px apart (runoff pulled beside precipitation)
    { const res = { ...good, anchors: { ...good.anchors, runoff: { x: good.anchors.precipitation.x + 19, y: good.anchors.precipitation.y } } };
      const c = checkMarkup('PW3', res, 608);
      judge('PW3 markers 19 px apart', c.findings, /markers precipitation \/ runoff are 19\.0 px apart < 50/); }
    // PW4 — an off-palette hex
    { const svg = good.svg.replace('fill="#F2784B"', 'fill="#FF0000"');
      const c = checkMarkup('PW4', { ...good, svg }, 608);
      judge('PW4 off-palette hex', c.findings, /off-palette hex #FF0000/); }
    // PW5 — a rain line ending 10 px above the land
    { const m = good.svg.match(/<line x1="444" y1="166" x2="444" y2="([-\d.]+)"/);
      const svg = good.svg.replace(m[0], m[0].replace(`y2="${m[1]}"`, `y2="${(+m[1] - 10).toFixed(2)}"`));
      const c = checkMarkup('PW5', { ...good, svg }, 608);
      judge('PW5 rain short of the land', c.findings, /rain line at x 444 ends at y [\d.]+, the land is at/); }
    console.log('poisons:\n' + log.join('\n'));
    ok(killed === 5, `poisons: ${killed}/5 killed`);
  } finally {
    await browser.close();
  }
  const pass = fails.length === 0;
  if (!pass) console.log('FINDINGS:\n  ' + fails.join('\n  '));
  console.log(pass ? `PASS (${assertions} assertions, 5 poisons killed${QUICK ? ', --quick' : ''})` : `FAIL (${fails.length} findings)`);
  process.exit(pass ? 0 : 1);
}

module.exports = { checkMarkup, markerGroups };
if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
