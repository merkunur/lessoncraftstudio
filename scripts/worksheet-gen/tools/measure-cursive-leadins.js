#!/usr/bin/env node
/**
 * measure-cursive-leadins.js [--check] [--png]
 *
 * WHY (fix round 2, fr + pt landing panels). A copybook model letter must show the letter the way the child
 * writes it in joined script, LEAD-IN INCLUDED. Playwrite draws every join as the PREVIOUS letter's exit stroke,
 * so a lone "a", "i" or "t" has no entry stroke and reads as print (measured 2026-09-23; no OpenType feature and
 * no invisible context character produces one).
 *
 * THE MECHANISM. The model is ONE text node "u" + L (the CARRIER "u" ends on the baseline, carries no dot and
 * joins into every letter of every shipped unit), clipped on its left at the carrier's LAST BOTTOM TURN: the
 * column where u's final down-stroke reaches the baseline and its exit stroke begins to rise. Right of that
 * column only the exit stroke (= L's lead-in) and L remain. The column is MEASURED here, per unit and letter,
 * from the real shaping — never a guessed offset:
 *   1. "u" and L are drawn as two coloured spans of ONE line (Blink shapes across a colour change, measured:
 *      the joins are identical), so every ink pixel is known to be the carrier's (red) or the letter's (blue);
 *   2. the carrier's bottom profile gives its rightmost baseline-touching run; the clip is that run's lowest
 *      column (ties: the leftmost, so a flat connector along the baseline stays whole);
 *   3. the carrier ink right of the clip must be ONE connected piece that touches the letter (the lead-in), and
 *      nothing else — no stem sliver, no dot. If a slanted stem leaves a sliver, the clip moves right column by
 *      column until it is one piece; if the lead-in then no longer starts in the baseline band the letter keeps
 *      its LONE form and the reason is recorded (never a half stroke).
 * Output primitives/cursive-leadins.json: { carrier, size, units: { <unit>: { <L>: { clip, right, lone? } } } }
 * (em of the "uL" run: clip = the visible part's left edge from the text origin, right = its ink right edge).
 * `--check` re-measures and fails on drift > 0.004 em or a changed lone set. `--png` writes the proof sheets
 * out/dev/G2-377-leadins-<unit>.png (carrier ink red, letter blue, the clip column green).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');

const WG = path.resolve(__dirname, '..');
const OUT = path.join(WG, 'primitives', 'cursive-leadins.json');
const CSS_FILE = path.join(WG, 'assets', 'fonts', 'cursive-fonts.css');
const METRICS = require('../primitives/cursive-metrics.json');
const { CURSIVE_WRITING_NEUTRAL: NEUTRAL } = require('../data/b6/cursive-writing.js');
const CHECK = process.argv.includes('--check');
const PNG = process.argv.includes('--png');
const CARRIER = 'u';
const S = 200;                       // measuring size, px (dpr 1)
// every letter any lesson can hold: a-z + the extras of every shipped locale alphabet
const LETTERS = [...'abcdefghijklmnopqrstuvwxyz', ...'äöüßñçæøå'];

/** the in-page measurement of ONE unit (self-contained; runs in the browser) */
async function measureUnit({ unit, letters, S, asc, desc, carrier, xH }) {
  const fam = `LCS Cursive ${unit}`;
  await document.fonts.load(`${S}px "${fam}"`, carrier + letters.join(''));
  await document.fonts.ready;
  document.body.innerHTML = '';
  const lh = Math.round(asc * S) + Math.round(desc * S);
  const rowH = lh + 20, colW = Math.round(3.2 * S);
  const cols = 3;
  const wrap = document.createElement('div');
  wrap.style.cssText = `position:relative;width:${cols * colW}px;height:${Math.ceil(letters.length / cols) * rowH}px;background:#FFFFFF`;
  document.body.appendChild(wrap);
  const cells = letters.map((L, k) => {
    const top = Math.floor(k / cols) * rowH + 10, left = (k % cols) * colW + Math.round(0.6 * S);
    const d = document.createElement('div');
    d.style.cssText = `position:absolute;left:${left}px;top:${top}px;font-family:'${fam}';font-size:${S}px;line-height:${lh}px;white-space:nowrap;letter-spacing:0`;
    d.innerHTML = `<span style="color:#E00000">${carrier}</span><span style="color:#0000E0">${L}</span>`;
    wrap.appendChild(d);
    return { L, d, top, left, yB: top + Math.round(asc * S) };
  });
  const wr = wrap.getBoundingClientRect();
  return { cells: cells.map((c) => { const a = c.d.children[0].getBoundingClientRect(); return { L: c.L, yB: c.yB, x0: a.left - wr.left, B: a.right - wr.left, top: c.top, left: c.left }; }), W: cols * colW, H: Math.ceil(letters.length / cols) * rowH, rowH, colW, box: { x: wr.left + window.scrollX, y: wr.top + window.scrollY } };
}

/** pixel analysis of one unit's sheet (browser) */
async function analyseUnit({ png, cells, W, H, rowH, colW, S, xH, draw }) {
  const img = new Image();
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/png;base64,' + png; });
  const cv = document.createElement('canvas'); cv.width = img.naturalWidth; cv.height = img.naturalHeight;
  const cx = cv.getContext('2d', { willReadFrequently: true }); cx.drawImage(img, 0, 0);
  const d = cx.getImageData(0, 0, cv.width, cv.height).data, Wd = cv.width;
  const px = (x, y) => { const o = (y * Wd + x) * 4; return [d[o], d[o + 1], d[o + 2]]; };
  const ink = (x, y) => { const [r, g, b] = px(x, y); return Math.min(r, g, b) < 200; };
  const red = (x, y) => { const [r, g, b] = px(x, y); return ink(x, y) && r - b > 40; };
  const blue = (x, y) => { const [r, g, b] = px(x, y); return ink(x, y) && b - r > 40; };
  const out = [];
  const marks = [];
  for (const c of cells) {
    const x0 = Math.round(c.x0), xA = Math.max(0, c.left - Math.round(0.5 * S)), xZ = Math.min(Wd, (Math.floor(c.left / colW) + 1) * colW);
    const yA = c.top - 5, yZ = c.top + rowH - 15;
    // the carrier's bottom profile
    const bottom = {};
    for (let x = xA; x < xZ; x++) for (let y = yA; y < yZ; y++) if (red(x, y)) bottom[x] = y;
    const band = c.yB - 0.06 * S;   // "touches the baseline": the curve's bottom within 0.06 em above the baseline (it overshoots below)
    const cand = Object.keys(bottom).map(Number).filter((x) => bottom[x] >= band).sort((a, b) => a - b);
    if (!cand.length) { out.push({ L: c.L, lone: 'the carrier never reaches the baseline band' }); continue; }
    // the rightmost contiguous run
    let runEnd = cand[cand.length - 1], runStart = runEnd;
    for (let i = cand.length - 2; i >= 0 && cand[i] >= runStart - 1; i--) runStart = cand[i];
    let clip = runStart, low = -1;
    for (let x = runStart; x <= runEnd; x++) if (bottom[x] > low) { low = bottom[x]; clip = x; }
    // the carrier ink right of the clip: ONE piece, touching the letter
    const pieces = (c0) => {
      const seen = new Set(), comps = [];
      for (let x = c0; x < xZ; x++) for (let y = yA; y < yZ; y++) {
        const k = x + ',' + y;
        if (seen.has(k) || !red(x, y)) continue;
        const st = [[x, y]]; seen.add(k); let touch = false, maxY = -1, minX = Infinity;
        while (st.length) { const [a, b] = st.pop(); if (b > maxY) maxY = b; if (a < minX) minX = a;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const qa = a + dx, qb = b + dy; if (qa < c0 || qa >= xZ || qb < yA || qb >= yZ) continue; if (blue(qa, qb)) touch = true; const kk = qa + ',' + qb; if (seen.has(kk) || !red(qa, qb)) continue; seen.add(kk); st.push([qa, qb]); } }
        comps.push({ touch, maxY, minX });
      }
      return comps;
    };
    let comps = pieces(clip), moved = 0;
    while ((comps.length !== 1 || !comps[0].touch) && moved < Math.round(0.2 * S)) { clip++; moved++; comps = pieces(clip); }
    let lone = null;
    if (comps.length !== 1 || !comps[0].touch) lone = `no clip column leaves the carrier as ONE piece touching the letter (${comps.length} pieces after ${moved} px)`;
    else if (comps[0].maxY < c.yB - 0.08 * S) lone = `the lead-in left by the clip starts ${(c.yB - comps[0].maxY) / S} em above the baseline`;
    // the visible ink's right edge (carrier + letter)
    let inkR = -1;
    for (let x = clip; x < xZ; x++) for (let y = yA; y < yZ; y++) if (ink(x, y) && x > inkR) inkR = x;
    out.push(lone ? { L: c.L, lone } : { L: c.L, clip: Math.round((clip - x0) / S * 10000) / 10000, right: Math.round((inkR + 1 - x0) / S * 10000) / 10000, moved });
    marks.push({ x: clip, yA, yZ });
  }
  if (draw) { cx.fillStyle = '#00B000'; for (const m of marks) cx.fillRect(m.x, m.yA, 1, m.yZ - m.yA); return { out, png: cv.toDataURL('image/png').split(',')[1] }; }
  return { out };
}

(async () => {
  const rawCss = fs.readFileSync(CSS_FILE, 'utf8');
  const css = rawCss.replace(/url\('([^']+)'\)/g, (m, f) => `url('${url.pathToFileURL(path.join(WG, 'assets', 'fonts', f)).href}')`);
  const htmlPath = path.join(WG, 'out', 'dev', '_cursive-leadins.html');
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  fs.writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>${css}body{margin:0;background:#FFFFFF}</style></head><body></body></html>`, 'utf8');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const result = { carrier: CARRIER, size: S, units: {} };
  try {
    await page.goto(url.pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
    for (const unit of NEUTRAL.shipped) {
      const m = METRICS['cursive-' + unit];
      if (!m) throw new Error(`no cursive-metrics for ${unit}`);
      await page.setViewport({ width: Math.round(3 * 3.2 * S) + 20, height: 800, deviceScaleFactor: 1 });
      const lay = await page.evaluate(measureUnit, { unit, letters: LETTERS, S, asc: m.lineAscent, desc: m.lineDescent, carrier: CARRIER, xH: m.xHeight });
      const ok = await page.evaluate((u, l) => document.fonts.check(`200px "LCS Cursive ${u}"`, l), unit, CARRIER + LETTERS.join(''));
      if (!ok) throw new Error(`${unit}: the face did not load (refuse to write)`);
      const shot = await page.screenshot({ clip: { x: lay.box.x, y: lay.box.y, width: lay.W, height: lay.H }, encoding: 'base64', captureBeyondViewport: true });
      const res = await page.evaluate(analyseUnit, { png: shot, cells: lay.cells, W: lay.W, H: lay.H, rowH: lay.rowH, colW: lay.colW, S, xH: m.xHeight, draw: PNG });
      if (PNG) fs.writeFileSync(path.join(WG, 'out', 'dev', `G2-377-leadins-${unit}.png`), Buffer.from(res.png, 'base64'));
      result.units[unit] = Object.fromEntries(res.out.map(({ L, ...rest }) => [L, rest]));
      const lone = res.out.filter((r) => r.lone);
      console.log(`${unit}: ${res.out.length - lone.length} letters with a measured lead-in, ${lone.length} lone${lone.length ? ' (' + lone.map((r) => r.L).join(' ') + ')' : ''}; clips moved: ${res.out.filter((r) => r.moved).map((r) => r.L + '+' + r.moved).join(' ') || 'none'}`);
    }
  } finally { await browser.close(); }
  // strip the diagnostic "moved" count from the committed data (it is printed above)
  for (const u of Object.keys(result.units)) for (const L of Object.keys(result.units[u])) delete result.units[u][L].moved;
  if (CHECK) {
    const old = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    const bad = [];
    for (const [u, lettersObj] of Object.entries(result.units)) for (const [L, v] of Object.entries(lettersObj)) {
      const o = old.units[u] && old.units[u][L];
      if (!o) { bad.push(`${u} ${L} missing`); continue; }
      if (!!o.lone !== !!v.lone) bad.push(`${u} ${L}: lone ${!!o.lone} → ${!!v.lone}`);
      else if (!v.lone && (Math.abs(o.clip - v.clip) > 0.004 || Math.abs(o.right - v.right) > 0.004)) bad.push(`${u} ${L}: clip ${o.clip}→${v.clip} right ${o.right}→${v.right}`);
    }
    if (bad.length) { console.log('DRIFT ' + bad.join(' | ')); process.exit(1); }
    console.log(`cursive-leadins --check: ${Object.keys(result.units).length} units match the committed file`);
    return;
  }
  fs.writeFileSync(OUT, JSON.stringify(result, null, 1) + '\n', 'utf8');
  console.log('wrote ' + path.relative(WG, OUT));
})().catch((e) => { console.error(e.stack || e.message); process.exit(1); });
