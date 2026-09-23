#!/usr/bin/env node
/**
 * verify-habitat-tile.js — the gate of primitives/habitat-tile.js (G1-398 `habitats`; design
 * docs/worksheet-gen/b6-designs/G1-398-habitats.md §2 "Gate qa/verify-habitat-tile.js").
 *
 *   node scripts/worksheet-gen/qa/verify-habitat-tile.js [--no-sheet]
 *
 * EMITTED (node, the markup): each id at w 196, 300 and 639 — token hexes only, no coral, no
 *   <text> / <image>, the root stamps (data-lcs-prim, data-lcs-habitat, data-lcs-surface ===
 *   SURFACE[id]); the frame renders 3 px at every w (stroke-width x scale); w < 150, an unknown
 *   id, 'desert', 'mountain' THROW.
 * RENDERED (the real fonts from file://, rasterised at w 196 — the smallest size the design
 *   uses — through window.__raster, a mono printer's view):
 *   - NEAR PAIRS (ocean/pond, forest/rainforest, savanna/meadow) must be FARTHER apart (mean
 *     absolute Rec.601 grey difference) than the same partner is from the pair's POISON tile;
 *     the threshold IS that measured poison distance (never an invented number), the margin is
 *     printed.
 *   - SIGNATURES on the pixels: pond >= 2 dark vertical blobs on the banks (cattail heads) and
 *     LAND (creamDeep) at both bank probes under the surface; ocean WATER (tealSoft) at the same
 *     probes; savanna's darkest horizontal run >= 30 % of the width in y 30..50 units; meadow no
 *     dark run >= 15 % anywhere and its ground probe is grass (tealSoft); polar's largest white
 *     connected region >= 18 %; rainforest white <= 10 % and the darkest mean luminance of the
 *     seven; every other tile white >= 30 %.
 * POISON (each must FAIL, the real tiles are the control): a pond drawn as a full-width water
 *   band (vs ocean) · a meadow with creamDeep ground and a teal-fill tree (vs savanna) · a forest
 *   with white conifers and a full tealSoft background (vs rainforest).
 * SHEET — out/dev/G1-398-tiles-{colour,grey}.png: every tile at 196 and at 639.
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const HT = require('../primitives/habitat-tile.js');
const H = require('./b6-habitats-harness.js');

const T = tokens.color;
const PALETTE = new Set(Object.values(T).map((c) => c.toUpperCase()));
const W_GATE = 196;
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

function emittedChecks() {
  for (const id of HT.HABITAT_IDS) for (const w of [196, 300, 639]) {
    const t = HT.habitatTile({ id, w });
    const s = t.svg;
    for (const h of s.match(/#[0-9a-fA-F]{6}\b/g) || []) ok(PALETTE.has(h.toUpperCase()), `${id}@${w}: off-palette ${h}`);
    ok(!s.toUpperCase().includes(T.coral.toUpperCase()), `${id}@${w}: coral in a tile`);
    ok(!/<text|<image|<img/.test(s), `${id}@${w}: <text>/<image> in a tile`);
    ok(s.includes(`data-lcs-prim="habitat-tile"`) && s.includes(`data-lcs-habitat="${id}"`) && s.includes(`data-lcs-surface="${HT.SURFACE[id]}"`), `${id}@${w}: root stamps`);
    const fr = /data-lcs-frame=""/.test(s) && /stroke-width="([\d.]+)" data-lcs-frame/.exec(s);
    ok(fr && Math.abs(+fr[1] * (w / 300) - 3) < 0.02, `${id}@${w}: the frame is not 3 px (${fr && (+fr[1] * w / 300).toFixed(2)})`);
    ok(Math.abs(t.height - w * 136 / 300) < 0.01, `${id}@${w}: height ${t.height} ≠ w x 136/300`);
  }
  for (const [what, fn] of [['w 149', () => HT.habitatTile({ id: 'ocean', w: 149 })], ['unknown id', () => HT.habitatTile({ id: 'lake' })], ['desert', () => HT.habitatTile({ id: 'desert' })], ['mountain', () => HT.habitatTile({ id: 'mountain' })]]) {
    let threw = false; try { fn(); } catch (e) { threw = true; } ok(threw, `${what} must THROW`);
  }
}

/* ------------------------------------------------------------------ poison tiles (markup edits) */
function poisonTiles() {
  const pond = HT.habitatTile({ id: 'pond', w: W_GATE }).svg;
  // the banks become water and the bowl's outline goes: one full-width water band under a flat line
  const pondBand = pond.replace(/fill="#F5E9D2" data-lcs-part="bank"/, `fill="${T.tealSoft}" data-lcs-part="bank"`).replace(/<path d="M40 60 C[^"]*" fill="none"[^>]*\/>/, '');
  const meadow = HT.habitatTile({ id: 'meadow', w: W_GATE }).svg;
  const tree = `<path d="M140 50 Q142 42 158 38 Q176 30 204 29 Q236 29 252 37 Q266 42 268 50 Z" fill="${T.teal}"/><rect x="196" y="50" width="8" height="40" fill="${T.teal}"/>`;
  // the savanna poison: the lawn gone (plain dry ground) and a teal-fill tree added
  const meadowSav = meadow.replace(/<path d="[^"]*" fill="none" stroke="#146B5E" stroke-width="[\d.]+" stroke-linecap="round" data-lcs-lawn=""\/>/, '').replace('</g><rect', tree + '</g><rect');
  const forest = HT.habitatTile({ id: 'forest', w: W_GATE }).svg;
  const forestRain = forest.replace(/<rect x="0" y="0" width="300" height="136" fill="#FFFFFF"\/>/, `<rect x="0" y="0" width="300" height="136" fill="${T.tealSoft}"/>`).replace(/(<path d="M150 [^"]*" fill=")#146B5E"/g, `$1${T.white}"`);
  if (pondBand === pond || (pondBand.match(/<path d="M40 60 C/g) || []).length !== 1 || meadowSav === meadow || forestRain === forest) throw new Error('a poison edit matched nothing (NEEDLE MATCHED NOTHING)');
  return { pond: pondBand, meadow: meadowSav, forest: forestRain };
}

async function rasters(page, svgs) {
  await H.openDoc(page, 'tile-measure', svgs.map((s, i) => `<div id="t${i}">${s}</div>`).join(''));
  return page.evaluate(async (n) => {
    const out = [];
    for (let k = 0; k < n; k++) {
      const r = await window.__raster(document.querySelector(`#t${k} svg`), 2);
      out.push({ w: r.w, h: r.h, luma: Array.from(r.luma, (v) => Math.round(v)), rgb: Array.from(r.rgb) });
    }
    return out;
  }, svgs.length);
}

/** The pixel signatures of ONE tile raster, by id (the design's §2 gate list). */
function signatures(id, r) {
  const f = [];
  const { w, h, luma, rgb } = r;
  const U = w / 300;   // px per unit
  const L = (x, y) => luma[y * w + x];
  const C = (x, y) => [rgb[(y * w + x) * 3], rgb[(y * w + x) * 3 + 1], rgb[(y * w + x) * 3 + 2]];
  const isCream = (c) => c[0] - c[2] > 20;          // creamDeep 245,233,210 (warm)
  const isSoft = (c) => c[2] - c[0] > 5 && c[1] < 245;   // tealSoft 221,235,232 (cool)
  const dark = (x, y) => L(x, y) < 130;
  const whiteFrac = luma.filter((v) => v > 250).length / luma.length;
  // longest dark run in a row
  // a dark MASS pixel: dark itself AND 4 raster px above and below (>= 9 px thick at S 2 = 4.5 page px) — an
  // outline (2-3 px) or the window frame never counts, a filled crown or trunk does
  const mass = (x, y) => y >= 4 && y < h - 4 && dark(x, y) && dark(x, y - 4) && dark(x, y + 4);
  const M = 12;   // stay clear of the 3 px window frame (inset 1.5 units)
  const runIn = (y0, y1, x0 = M, x1 = w - M) => { let best = 0; for (let y = Math.max(M, Math.round(y0)); y < Math.min(h - M, Math.round(y1)); y++) { let r = 0; for (let x = x0; x < x1; x++) { r = mass(x, y) ? r + 1 : 0; if (r > best) best = r; } } return best; };
  // dark connected blobs (4-connectivity) inside a box: [{w, h}]
  const blobs = (bx0, bx1, by0, by1) => {
    const seen = new Uint8Array(w * h), out = [];
    for (let y = by0; y < by1; y++) for (let x = bx0; x < bx1; x++) {
      if (seen[y * w + x] || L(x, y) >= 90) continue;
      let q = [[x, y]], mnx = x, mxx = x, mny = y, mxy = y, n = 0; seen[y * w + x] = 1;
      while (q.length) { const [a, b] = q.pop(); n++; mnx = Math.min(mnx, a); mxx = Math.max(mxx, a); mny = Math.min(mny, b); mxy = Math.max(mxy, b);
        for (const [c, d] of [[a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]]) if (c >= bx0 && c < bx1 && d >= by0 && d < by1 && !seen[d * w + c] && L(c, d) < 90) { seen[d * w + c] = 1; q.push([c, d]); } }
      if (n > 4) out.push({ w: mxx - mnx + 1, h: mxy - mny + 1, n });
    }
    return out;
  };
  const probeY = Math.round(h * 0.8), pl = Math.round(w * 0.05), pr = Math.round(w * 0.95);
  if (id === 'pond') {
    const vb = [...blobs(0, Math.round(40 * U), 0, Math.round(60 * U)), ...blobs(Math.round(260 * U), w, 0, Math.round(60 * U))].filter((b) => b.h > b.w * 1.4);
    if (vb.length < 2) f.push(`pond: ${vb.length} dark vertical blobs on the banks (< 2 cattail heads)`);
    if (!isCream(C(pl, probeY)) || !isCream(C(pr, probeY))) f.push('pond: the bank probes are not LAND (a full-width water band, not a bowl)');
  }
  if (id === 'ocean' && (!isSoft(C(pl, probeY - Math.round(20 * U))) || !isSoft(C(pr, probeY - Math.round(20 * U))))) f.push('ocean: the edge probes are not water');
  if (id === 'savanna') { const run = runIn(30 * U, 50 * U); if (run < 0.3 * w) f.push(`savanna: darkest run ${(100 * run / w).toFixed(0)} % in y 30..50 (< 30 %: no umbrella tree)`); }
  if (id === 'meadow') {
    const run = runIn(0, h); if (run >= 0.15 * w) f.push(`meadow: a dark run ${(100 * run / w).toFixed(0)} % (>= 15 %: a tree or a dark mass)`);
    if (r.lawn != null && r.lawn < r.lawnFloor) f.push(`meadow: the ground carries no lawn texture (${(100 * r.lawn).toFixed(1)} % dark vs the savanna ground's ${(100 * r.lawnFloor).toFixed(1)} %)`);
  }
  if (id === 'polar') {
    const seen = new Uint8Array(w * h); let best = 0;
    for (let s = 0; s < w * h; s++) { if (seen[s] || luma[s] <= 250) continue; let q = [s], n = 0; seen[s] = 1; while (q.length) { const p = q.pop(); n++; const x = p % w, y = (p - x) / w; for (const t of [x + 1 < w ? p + 1 : -1, x > 0 ? p - 1 : -1, y + 1 < h ? p + w : -1, y > 0 ? p - w : -1]) if (t >= 0 && !seen[t] && luma[t] > 250) { seen[t] = 1; q.push(t); } } best = Math.max(best, n); }
    if (best / (w * h) < 0.18) f.push(`polar: the largest white region is ${(100 * best / (w * h)).toFixed(0)} % (< 18 %)`);
  }
  if (id === 'rainforest') { if (whiteFrac > 0.10) f.push(`rainforest: white ${(100 * whiteFrac).toFixed(0)} % (> 10 %)`); }
  else if (whiteFrac < 0.30) f.push(`${id}: white ${(100 * whiteFrac).toFixed(0)} % (< 30 %: no sky)`);
  return { f, whiteFrac, mean: luma.reduce((s, v) => s + v, 0) / luma.length };
}
/** the dark-pixel share of the ground band y 98..116 units (the meadow's lawn texture vs the savanna's plain dry ground) */
const groundDark = (r) => { const U = r.w / 300; let n = 0, d = 0; for (let y = Math.round(98 * U); y < Math.round(116 * U); y++) for (let x = 12; x < r.w - 12; x++) { n++; if (r.luma[y * r.w + x] < 150) d++; } return d / n; };
const dist = (a, b) => { let s = 0; for (let i = 0; i < a.luma.length; i++) s += Math.abs(a.luma[i] - b.luma[i]); return s / a.luma.length; };

async function main() {
  emittedChecks();
  const ids = HT.HABITAT_IDS;
  const P = poisonTiles();
  const log = []; let killed = 0, total = 0;
  let pngs = [];
  await H.withBrowser(async (page) => {
    const real = await rasters(page, ids.map((id) => HT.habitatTile({ id, w: W_GATE }).svg));
    const R = Object.fromEntries(ids.map((id, i) => [id, real[i]]));
    const [pPond, pMeadow, pForest] = await rasters(page, [P.pond, P.meadow, P.forest]);
    // fix round 1: the meadow's ground must carry MORE lawn texture than its near partner's (savanna) plain ground
    R.meadow.lawn = groundDark(R.meadow); R.meadow.lawnFloor = groundDark(R.savanna);
    pMeadow.lawn = groundDark(pMeadow); pMeadow.lawnFloor = R.meadow.lawnFloor;
    console.log(`meadow lawn texture ${(100 * R.meadow.lawn).toFixed(1)} % dark vs savanna ground ${(100 * R.meadow.lawnFloor).toFixed(1)} % (poison ${(100 * pMeadow.lawn).toFixed(1)} %)`);
    const sig = {};
    for (const id of ids) { sig[id] = signatures(id, R[id]); sig[id].f.forEach((x) => ok(false, 'signature ' + x)); assertions++; }
    // the rainforest is the darkest window
    const darkest = ids.slice().sort((a, b) => sig[a].mean - sig[b].mean)[0];
    ok(darkest === 'rainforest', `the darkest window is ${darkest}, not the rainforest`);
    // near pairs vs their poisons (threshold = the measured poison distance)
    const NEAR = [['ocean', 'pond', pPond, 'pond'], ['rainforest', 'forest', pForest, 'forest'], ['savanna', 'meadow', pMeadow, 'meadow']];
    const thr = {};
    console.log('near pairs (mean |Δgrey| at w 196; the threshold = the poison distance):');
    for (const [a, b, poison] of NEAR) {
      const d = dist(R[a], R[b]), t = dist(R[a], poison);
      thr[a + '/' + b] = t;
      console.log(`  ${a}/${b}: ${d.toFixed(2)} vs poison ${t.toFixed(2)}  margin ${(d - t).toFixed(2)}`);
      ok(d > t, `${a}/${b} (${d.toFixed(2)}) is not farther apart than ${a} vs the ${b} poison (${t.toFixed(2)})`);
    }
    const all = [];
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) all.push(`${ids[i]}/${ids[j]} ${dist(R[ids[i]], R[ids[j]]).toFixed(1)}`);
    console.log('all pairs: ' + all.join(' · '));
    console.log('white %: ' + ids.map((id) => `${id} ${(100 * sig[id].whiteFrac).toFixed(0)}`).join(' · ') + '   mean luma: ' + ids.map((id) => `${id} ${sig[id].mean.toFixed(0)}`).join(' · '));
    // poisons: each judged exactly as a real tile is (its own signatures + its near pair vs the threshold)
    const judge = (name, id, partner, r, re) => {
      total++;
      const f = signatures(id, r).f.slice();
      const d = dist(R[partner], r), t = thr[partner + '/' + id];
      if (!(d > t)) f.push(`${partner}/${id} ${d.toFixed(2)} not farther than the threshold ${t.toFixed(2)} (near-pair collapse)`);
      const k = f.some((x) => re.test(x));
      log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.join(' | ') : 'SILENT'}${k ? ' — ' + f.join(' | ') : ''}`);
      if (k) killed++;
    };
    judge('P pond as a full-width band (vs ocean)', 'pond', 'ocean', pPond, /not LAND|near-pair collapse/);
    judge('P meadow with plain dry ground (no lawn) + a teal tree (vs savanna)', 'meadow', 'savanna', pMeadow, /dark run|no lawn texture|near-pair collapse/);
    judge('P forest with white conifers + a tealSoft background (vs rainforest)', 'forest', 'rainforest', pForest, /no sky|near-pair collapse/);
    if (!process.argv.includes('--no-sheet')) pngs = await H.sheet(page, 'tiles', `<div style="display:flex;flex-wrap:wrap;gap:8px;width:1330px">` +
      ids.map((id) => `<div>${HT.habitatTile({ id, w: 196 }).svg}</div>`).join('') + `</div><div style="display:flex;flex-wrap:wrap;gap:8px;width:1330px;margin-top:10px">` +
      ids.map((id) => `<div>${HT.habitatTile({ id, w: 639 }).svg}</div>`).join('') + `</div>`, { width: 1340 });
  });
  console.log('poison:\n' + log.join('\n'));
  if (pngs.length) console.log('sheets:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, signatures };
