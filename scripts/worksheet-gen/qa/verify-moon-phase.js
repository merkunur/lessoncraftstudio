#!/usr/bin/env node
/**
 * verify-moon-phase.js — the gate of primitives/moon-phase.js (G1-378
 * `earth-and-space`, design §2 "Node gate qa/verify-moon-phase.js").
 *
 *   node scripts/worksheet-gen/qa/verify-moon-phase.js [--no-sheets]
 *
 * NODE PASS — every phase 0..7 x hemisphere N|S at d 80 and d 120, the EMITTED
 * svg rasterised at 4x (sharp): every pixel inside the disc is classed as the
 * nearest of white (lit) / inkSoft (dark) / teal (rim), and
 *   - lit / (lit + dark) within ±0.03 of the gate's OWN (1 - cos 45°·p) / 2
 *     (never the primitive's stamp; the stamp is checked against it too)
 *   - the lit centroid on the side the gate's OWN table expects for (p, hemi)
 *     (N: 1-3 right, 5-7 left; S mirrored; 0 no lit pixels; 4 centred)
 *   - a crescent's lit width on the equator row (terminator pixel -> disc
 *     edge) >= 10 px on paper
 *   - only token hexes in the markup; no <text>
 * THROWS — phase 8, phase 1.5, hemisphere 'X', d 70, phase 1 at d 72,
 *   phase 7 at d 79; a quarter at d 72 must NOT throw (control).
 * POISON (each must FAIL for its own reason; the untouched primitive is the
 *   control and must PASS the same check): the crescent's second sweep flag
 *   flipped (the lit area becomes the gibbous) · a pt disc drawn with
 *   hemisphere N (the centroid lands on the northern side) · phase 1 at d 72
 *   with the guard bypassed (the lit width falls under 10 px) and the guard
 *   itself (must throw).
 * SHEETS (default) — every phase N and S at d 88 and d 112 (the F2 and F1 d1
 *   sizes), colour + greyscale, out/dev/G1-378-moon-phase-sheet-{colour,grey}.png
 *   for a human to READ.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const T = require('../primitives/_tokens.js');
const MP = require('../primitives/moon-phase.js');
const { rasterize, nearest } = require('./es-raster.js');

const PALETTE = new Set(Object.values(T.color).map((c) => c.toUpperCase()));
const SCALE = 4;
let assertions = 0;
const fails = [];
const ok = (c, m) => { assertions++; if (!c) fails.push(m); return !!c; };

/* the gate's OWN expectations (independent of the primitive's helpers) */
const expFrac = (p) => (1 - Math.cos(p * Math.PI / 4)) / 2;
const expSide = (p, hemi) => (p === 0 || p === 4 ? 'none' : ((p < 4) === (hemi === 'N') ? 'right' : 'left'));
const R_IN = 44;   // measure inside the rim (the 3-unit rim covers r 44.5..47.5 and would hide lit edge pixels)
/** The gate's OWN geometric model: is (x, y) (units, lit side = +x) lit at phase p?  terminator = ellipse rx 46|cos θ|. */
function litModel(p, x, y) {
  if (x * x + y * y > 46 * 46) return false;
  if (p === 0) return false;
  if (p === 4) return true;
  const t = 46 * Math.cos(p * Math.PI / 4) * Math.sqrt(Math.max(0, 1 - (y * y) / (46 * 46)));   // + for crescent side (cos > 0), - for gibbous
  // lit iff x >= t  (crescent: t > 0 -> a sliver on the right; quarter: t = 0; gibbous: t < 0 -> past the middle)
  return x >= t;
}
/** Expected lit fraction inside r <= R_IN (numeric, 0.25-unit grid). */
const _expIn = new Map();
function expFracIn(p) {
  if (!_expIn.has(p)) {
    let lit = 0, all = 0;
    for (let y = -R_IN + 0.125; y < R_IN; y += 0.25) for (let x = -R_IN + 0.125; x < R_IN; x += 0.25) { if (x * x + y * y > R_IN * R_IN) continue; all++; if (litModel(p, x, y)) lit++; }
    _expIn.set(p, lit / all);
  }
  return _expIn.get(p);
}

/** Measure a moon svg of paper size d: {frac, cx (units, + = right), litPx, width (paper px of the lit run on the equator from its lit side)} */
async function measure(svg, d) {
  const img = await rasterize(svg, d * SCALE);
  const c = img.w / 2, rr = 46 * img.w / 100, rin = R_IN * img.w / 100;
  let lit = 0, dark = 0, sx = 0;
  for (let y = 0; y < img.h; y++) for (let x = 0; x < img.w; x++) {
    const dx = x + 0.5 - c, dy = y + 0.5 - c;
    if (dx * dx + dy * dy > rin * rin) continue;
    const n = nearest(img, x, y, ['white', 'inkSoft', 'teal']);
    if (n === 'white') { lit++; sx += dx; } else if (n === 'inkSoft') dark++;
  }
  const frac = lit / Math.max(1, lit + dark);
  const cx = lit ? (sx / lit) * 100 / img.w : 0;
  // equator run: from the lit edge inward, the first non-white pixel after white ones = the terminator
  const y = Math.floor(img.h / 2);
  const side = cx >= 0 ? 1 : -1;
  let x = side > 0 ? Math.floor(c + rr) : Math.ceil(c - rr);
  // step inward past the rim to the first white pixel, then to the last contiguous white pixel
  let firstWhite = null, lastWhite = null;
  for (let i = 0; i < 2 * rr; i++) {
    const xi = x - side * i;
    const n = nearest(img, xi, y, ['white', 'inkSoft', 'teal']);
    if (n === 'white') { if (firstWhite === null) firstWhite = xi; lastWhite = xi; } else if (firstWhite !== null && n === 'inkSoft') break;
  }
  const width = lastWhite === null ? 0 : Math.abs((c + side * rr) - (lastWhite + (side > 0 ? 0 : 1))) / SCALE;
  return { frac, cx, litPx: lit, width };
}

function checkMarkup(svg, tag) {
  const hexes = (svg.match(/#[0-9A-Fa-f]{6}\b/g) || []).map((h) => h.toUpperCase());
  ok(hexes.every((h) => PALETTE.has(h)), `${tag}: off-palette hex ${hexes.filter((h) => !PALETTE.has(h)).join(',')}`);
  ok(!/<text\b/.test(svg), `${tag}: text inside the moon`);
  ok(!/coral|#F2784B/i.test(svg), `${tag}: coral on a moon`);
}

/** Every check on one drawn moon; returns the findings (for the poisons) and asserts them. */
async function checkMoon(svg, { phase, hemi, d }, tag) {
  const f = [];
  const m = await measure(svg, d);
  const want = expFrac(phase), side = expSide(phase, hemi), wantIn = expFracIn(phase);
  if (Math.abs(m.frac - wantIn) > 0.03) f.push(`${tag}: lit/disc ${m.frac.toFixed(3)} vs ${wantIn.toFixed(3)} (±0.03; whole disc ${want.toFixed(3)})`);
  const stamp = +(/data-lcs-lit="([\d.]+)"/.exec(svg) || [])[1];
  if (!(Math.abs(stamp - want) < 0.0015)) f.push(`${tag}: data-lcs-lit ${stamp} ≠ ${want.toFixed(3)}`);
  const sside = (/data-lcs-litside="(\w+)"/.exec(svg) || [])[1];
  if (sside !== side) f.push(`${tag}: data-lcs-litside ${sside} ≠ ${side}`);
  if (side === 'none') {
    if (phase === 0 && m.litPx > 0) f.push(`${tag}: a new Moon with ${m.litPx} lit pixels`);
    if (phase === 4 && Math.abs(m.cx) > 1) f.push(`${tag}: full Moon centroid ${m.cx.toFixed(2)} off centre`);
  } else {
    const got = m.cx > 2 ? 'right' : m.cx < -2 ? 'left' : 'none';
    if (got !== side) f.push(`${tag}: lit centroid ${m.cx.toFixed(2)} units reads ${got}, expected ${side} for phase ${phase} hemisphere ${hemi}`);
  }
  if ((phase === 1 || phase === 7) && m.width < 10) f.push(`${tag}: crescent lit width ${m.width.toFixed(2)} px on the equator < 10`);
  return { f, m };
}

const poisonLog = [];
let killed = 0, total = 0;
function judge(name, findings, re, control) {
  total++;
  const hit = findings.some((x) => re.test(x));
  const ctlClean = control.length === 0;
  const v = hit && ctlClean ? 'KILLED' : !ctlClean ? 'CONTROL RED' : findings.length ? 'WRONG REASON' : 'SILENT';
  if (v === 'KILLED') killed++;
  poisonLog.push(`  ${name}: ${v}${v === 'KILLED' ? '' : ' — ' + JSON.stringify((control.length ? control : findings).slice(0, 3))}`);
}

async function main() {
  const table = [];
  for (const d of [80, 120]) for (const hemi of ['N', 'S']) for (let p = 0; p < 8; p++) {
    const tag = `p${p} ${hemi} d${d}`;
    const r = MP.moonPhase({ phase: p, hemisphere: hemi, d });
    checkMarkup(r.svg, tag);
    const { f, m } = await checkMoon(r.svg, { phase: p, hemi, d }, tag);
    for (const x of f) ok(false, x);
    assertions += 4;
    if (d === 80 && hemi === 'N') table.push(`p${p} ${m.frac.toFixed(4)} (model ${expFracIn(p).toFixed(4)}, disc ${expFrac(p).toFixed(4)}) cx ${m.cx.toFixed(1)}${p % 4 ? '' : ''}${p === 1 || p === 7 ? ' width ' + m.width.toFixed(2) + ' px' : ''}`);
  }
  console.log('node pass (d 80, N): ' + table.join(' · '));
  // throws
  const throws = (fn) => { try { fn(); return false; } catch (e) { return true; } };
  ok(throws(() => MP.moonPhase({ phase: 8, hemisphere: 'N', d: 100 })), 'phase 8 did not throw');
  ok(throws(() => MP.moonPhase({ phase: 1.5, hemisphere: 'N', d: 100 })), 'phase 1.5 did not throw');
  ok(throws(() => MP.moonPhase({ phase: 2, hemisphere: 'X', d: 100 })), "hemisphere 'X' did not throw");
  ok(throws(() => MP.moonPhase({ phase: 2, hemisphere: 'N', d: 70 })), 'd 70 did not throw');
  ok(throws(() => MP.moonPhase({ phase: 1, hemisphere: 'N', d: 72 })), 'phase 1 at d 72 did not throw');
  ok(throws(() => MP.moonPhase({ phase: 7, hemisphere: 'S', d: 79 })), 'phase 7 at d 79 did not throw');
  ok(!throws(() => MP.moonPhase({ phase: 2, hemisphere: 'N', d: 72 })), 'a quarter at d 72 threw (control)');

  // poisons
  {
    const good = MP.moonPhase({ phase: 1, hemisphere: 'N', d: 104 }).svg;
    const bad = good.replace(/(A [\d.]+ 46 0 0 )0( 0 -46 Z)/, '$11$2');
    ok(bad !== good, 'poison sweep: the needle did not match');
    const ctl = (await checkMoon(good, { phase: 1, hemi: 'N', d: 104 }, 'ctl')).f;
    judge('PR2 crescent sweep flag flipped', (await checkMoon(bad, { phase: 1, hemi: 'N', d: 104 }, 'P')).f, /lit\/disc 0\.8\d+ vs 0\.1\d+/, ctl);
  }
  {
    const pt = MP.moonPhase({ phase: 1, hemisphere: 'S', d: 104 }).svg;
    const ptDrawnN = MP.moonPhase({ phase: 1, hemisphere: 'N', d: 104 }).svg.replace(/data-lcs-litside="right"/, 'data-lcs-litside="left"').replace(/data-lcs-hemi="N"/, 'data-lcs-hemi="S"');
    const ctl = (await checkMoon(pt, { phase: 1, hemi: 'S', d: 104 }, 'ctl')).f;
    judge('PR1 a pt waxing crescent drawn N (stamps say S)', (await checkMoon(ptDrawnN, { phase: 1, hemi: 'S', d: 104 }, 'P')).f, /reads right, expected left/, ctl);
  }
  {
    // the guard bypassed: the same geometry emitted at d 72 (rescale a d-80 moon) — the lit width falls under 10 px
    const at80 = MP.moonPhase({ phase: 1, hemisphere: 'N', d: 80 }).svg;
    const at72 = at80.replace(/width="80"/, 'width="72"').replace(/height="80"/, 'height="72"');
    const ctl = (await checkMoon(at80, { phase: 1, hemi: 'N', d: 80 }, 'ctl')).f;
    judge('phase 1 at d 72 (guard bypassed)', (await checkMoon(at72, { phase: 1, hemi: 'N', d: 72 }, 'P')).f, /crescent lit width 9\.\d+ px/, ctl);
    let m = null; try { MP.moonPhase({ phase: 1, hemisphere: 'N', d: 72 }); } catch (e) { m = e.message; }
    judge('phase 1 at d 72 (the guard)', m ? [m] : [], /a crescent at d 72 < 80/, []);
  }

  // sheets
  const pngs = [];
  if (!process.argv.includes('--no-sheets')) {
    const puppeteer = require('puppeteer');
    const out = path.join(__dirname, '..', 'out', 'dev');
    fs.mkdirSync(out, { recursive: true });
    const cell = (p, hemi, d) => `<figure style="margin:6px;display:inline-flex;flex-direction:column;align-items:center;font:12px sans-serif;color:${T.color.ink}">${MP.moonPhase({ phase: p, hemisphere: hemi, d }).svg}<figcaption>${p} ${hemi} · ${d}</figcaption></figure>`;
    const rows = [];
    for (const d of [88, 112]) for (const hemi of ['N', 'S']) rows.push(`<div>${[0, 1, 2, 3, 4, 5, 6, 7].map((p) => cell(p, hemi, d)).join('')}</div>`);
    const browser = await puppeteer.launch({ headless: 'new' });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1100, height: 800, deviceScaleFactor: 2 });
      for (const [name, filter] of [['colour', ''], ['grey', 'filter:grayscale(1)']]) {
        await page.setContent(`<html><body style="margin:8px;background:${T.color.white};${filter}">${rows.join('')}</body></html>`);
        const fp = path.join(out, `G1-378-moon-phase-sheet-${name}.png`);
        await page.screenshot({ path: fp, fullPage: true });
        pngs.push(fp);
      }
    } finally { await browser.close(); }
  }
  console.log('poison:\n' + poisonLog.join('\n'));
  if (pngs.length) console.log('sheets:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { measure, checkMoon, expFrac, expSide, expFracIn };
