/**
 * fd-faces.js — the shared parts of the five NEW Find-the-Differences templates (makers 2026-11-02, NEW-TEMPLATES §29:
 * K-488 Which Picture Is Different?, K-489 Count the Kinds of Changes, K-490 Look, Fold and Find, K-491 Draw What Is
 * Missing, K-492 Which Two Are the Same?). They live beside K-395 and read its library parts — the scenes
 * (data/fd/<id>.json), the gated candidates (lib/fd-compose.js pickOps), the renderer (lib/fd-scene.js renderPanel) and
 * the browser diff (lib/fd-browser-diff.js) — so K-395 and its published faces stay untouched.
 *
 *   sceneFor(face, lv, ctx, fn) copy n of a face draws from the scenes the FD maker already ships (B.makerScenes, never
 *                               a refused one): the n-th scene pinned for the face at the level (data/b7/fd-face-pins.json),
 *                               walking on while fn(scene) throws (a scene that cannot carry the face is skipped, never forced)
 *   fits(face, lv, scene, fn)   the pin tool's test (tools/build-fd-face-pins.js)
 *   cfgOf(o, pw)                a pickOps config from the face's level: n, kinds, floors in picture units (ring, area)
 *   panel(scene, ops, o)        one picture (renderPanel, line mode)
 *   numberDisc(n)               the teal numeral that names a picture (the child says "picture 3")
 *   changes(page, sel1, sel2)   the differences a child can SEE between two pictures of the page (raster diff, merged)
 */
'use strict';
const B = require('../data/b7/find-the-differences.js');
const FD = require('./fd-scene.js');
const { pickOps } = require('./fd-compose.js');
const { makeRng } = require('./rng.js');
const { evalSource } = require('./fd-browser-diff.js');
const platform = require('./platform/index.js');
const path = require('path');

const W = FD.W, H = FD.H;   // 600 × 560 picture units
const TRIES = 40;

const _order = new Map();
/** the face's own fixed order of the maker's scenes (seeded by the face, so two faces never start on the same scene) */
function sceneOrder(faceKey) {
  if (!_order.has(faceKey)) {
    const rec = B.review();
    const ids = B.makerScenes().filter((id) => !(rec.REFUSED && rec.REFUSED[id]));
    _order.set(faceKey, makeRng('fd-faces|' + faceKey).shuffle(ids));
  }
  return _order.get(faceKey);
}
function loadScene(id) {
  const rec = B.review();
  const s = B.loadScene(id);
  const refused = new Set((rec.REFUSED_OPS || {})[id] || []);
  return refused.size ? { ...s, cands: s.cands.filter((c, i) => !refused.has(i)) } : s;
}
let _pins = null;
/**
 * the pinned scenes of a face at a level (data/b7/fd-face-pins.json, tools/build-fd-face-pins.js): every maker scene, in
 * the face's order, on which the face composed — a page never walks a scene list that fails (most scenes cannot carry
 * six separated changes, measured 2026-11-02), and consecutive copies get different scenes
 */
function pinned(faceKey, level) {
  if (_pins == null) { const f = path.join(__dirname, '..', 'data', 'b7', 'fd-face-pins.json'); _pins = platform.exists(f) ? platform.readJson(f) : {}; }
  const l = ((_pins.faces || {})[faceKey] || {})[String(level)];
  return l && l.length ? l : null;
}
/**
 * the copy's scene: copy n (ctx.variant; the seed retries keep the copy) is the n-th pinned scene of the face at the level
 * (the face's whole scene order when nothing is pinned), walking on while fn(scene, id) throws (a pinned scene can still
 * refuse the copy's own seed)
 */
function sceneFor(faceKey, level, ctx, fn) {
  const ids = pinned(faceKey, level) || sceneOrder(faceKey);
  const n = Math.max(1, parseInt(String((ctx && ctx.variant) || 1), 10) || 1);
  let err;
  for (let k = 0; k < Math.min(TRIES, ids.length); k++) {
    const id = ids[(n - 1 + k) % ids.length];
    try { return { id, ...fn(loadScene(id), id) }; } catch (e) { err = e; if (!/fd-compose|fd-faces/.test(e.message)) throw e; }
  }
  throw new Error(`fd-faces: no scene carries ${faceKey} (last: ${err && err.message})`);
}
/** does a face compose on a scene at a level? (the pin tool) — fn(scene, rng) tried on three seeds of its own */
function fits(faceKey, level, scene, fn) {
  for (let k = 0; k < 3; k++) { try { fn(scene, makeRng(`fd-pin|${faceKey}|${level}|${scene.id}|${k}`)); return true; } catch (e) { if (!/fd-compose|fd-faces/.test(e.message)) throw e; } }
  return false;
}
/** a pickOps config: o { n, kinds, ring (units), area (units²), move (units) } at a picture pw px wide */
function cfgOf(o, pw) {
  const ppu = pw / W;
  return {
    n: o.n, mode: 'line', kinds: o.kinds, pxPerUnit: ppu, minRingPx: +((o.ring || 48) * ppu).toFixed(2), minSepPx: o.minSepPx != null ? o.minSepPx : 27,
    minMovePx: +((o.move || 100) * ppu).toFixed(2), minArea: o.area || 1200, maxPerItem: 1, ...(o.noKindCap ? { noKindCap: true } : {}), ...(o.spread ? { spread: o.spread } : {}),
    ...(o.heroProb != null ? { heroProb: o.heroProb } : {}),
  };
}
/**
 * o.n changes whose KINDS are spread (o.kinds tried in the copy's own order): one change takes the first kind the scene can
 * carry; several take different kinds where the scene allows (cfg.distinctKinds), else the composer's own variety rule.
 * A uniform walk over the candidates lets the commonest kind win (a scaled drawing on half the pages, measured 2026-11-02).
 */
function pickSpread(scene, o, pw, rng) {
  const kinds = rng.shuffle(o.kinds.slice());
  if (o.n === 1) {
    for (const k of kinds) { try { return pickOps(scene, cfgOf({ ...o, kinds: [k] }, pw), rng); } catch (e) { if (!/fd-compose/.test(e.message)) throw e; } }
    return pickOps(scene, cfgOf(o, pw), rng);
  }
  if (o.n <= kinds.length) { try { return pickOps(scene, { ...cfgOf({ ...o, kinds }, pw), distinctKinds: true }, rng); } catch (e) { if (!/fd-compose/.test(e.message)) throw e; } }
  return pickOps(scene, cfgOf(o, pw), rng);
}
/** one picture: opts { width, clipId, attrs, rings (key), dashed: boxes drawn as dashed guide ellipses } */
function panel(scene, ops, o) {
  let svg = FD.renderPanel(scene, ops || [], { mode: 'line', width: o.width, clipId: o.clipId, attrs: o.attrs || '', ...(o.rings ? { rings: o.rings, ringHalo: true } : {}) });
  if (o.dashed && o.dashed.length) {
    // the guide circles of the draw-it-back face: a dashed grey ellipse round each empty place (no numeral, no coral — a guide,
    // not an answer); stamped as a ring part so the raster diff strips it (it is not picture content)
    const g = o.dashed.map((b) => { const rx = (b[2] - b[0]) / 2, ry = (b[3] - b[1]) / 2; return `<ellipse cx="${((b[0] + b[2]) / 2).toFixed(1)}" cy="${((b[1] + b[3]) / 2).toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="#8A8276" stroke-width="4" stroke-dasharray="14 10" data-lcs-fd-ring="guide"/>`; }).join('');
    svg = svg.replace(/<\/svg>$/, `${g}</svg>`);
  }
  return svg;
}
/** the teal numeral disc that names a picture */
function numberDisc(n, px = 34) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 34 34" data-lcs-fd-disc="${n}" style="display:block;flex:0 0 ${px}px"><circle cx="17" cy="17" r="15" fill="#FFFFFF" stroke="#146B5E" stroke-width="2.5"/><text x="17" y="24.5" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="21" fill="#146B5E">${n}</text></svg>`;
}

/**
 * the visible differences between two pictures of the page (in picture units), measured as K-395 measures them: drawn at
 * 1 px per unit, dilated 5, components whose boxes touch merged (a whole-drawing change is one difference)
 */
async function changes(page, sel1, sel2) {
  const box = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); const vb = (e.getAttribute('viewBox') || '0 0 600 560').split(' ').map(Number); return { w: b.width, units: vb[2] }; }, sel2);
  if (!box) return { error: `${sel2} not found` };
  const scale = box.units / box.w;
  const r = await page.evaluate(evalSource({ panel1: sel1, panel2: sel2, hotspots: '[data-lcs-fd-none]', scale, dilate: 5, noise: 10 }));
  if (!r) return { error: 'no diff' };
  const bad = r.fails.filter((f) => /not found|differ in size|rasterise/.test(f));
  if (bad.length) return { error: bad.join(' | ') };
  const comps = r.components.map((c) => ({ ...c }));
  let merged = true;
  while (merged) {
    merged = false;
    for (let i = 0; i < comps.length && !merged; i++) for (let j = i + 1; j < comps.length && !merged; j++) {
      const a = comps[i], b = comps[j];
      if (a.x0 <= b.x1 + 2 && b.x0 <= a.x1 + 2 && a.y0 <= b.y1 + 2 && b.y0 <= a.y1 + 2) { comps[i] = { x0: Math.min(a.x0, b.x0), y0: Math.min(a.y0, b.y0), x1: Math.max(a.x1, b.x1), y1: Math.max(a.y1, b.y1), area: a.area + b.area }; comps.splice(j, 1); merged = true; }
    }
  }
  return { comps: comps.map((c) => ({ x0: c.x0 * scale, y0: c.y0 * scale, x1: c.x1 * scale, y1: c.y1 * scale, area: c.area * scale * scale })) };
}
/** the page-level checks every new face shares (the root [data-lcs-fd-face], data-lcs-fd-key on the key build): rings only on
 *  the key, no numeral in an answer box of the print page, every apparatus inside the page */
async function pageChecks(page) {
  return page.evaluate(() => {
    const f = [];
    const R = document.querySelector('[data-lcs-fd-face]');
    if (!R) return ['no face root'];
    const isKey = R.hasAttribute('data-lcs-fd-key');
    const ring = '[data-lcs-fd-ring]:not([data-lcs-fd-ring="guide"])';
    if (!isKey && R.querySelector(ring)) f.push('a ring on the print page');
    if (isKey && !R.querySelector(ring) && !R.querySelector('[data-lcs-correct]')) f.push('the key shows no ring');
    if (!isKey) R.querySelectorAll('[data-lcs-answer]').forEach((b) => { if (b.textContent.trim()) f.push('a numeral printed in an answer box'); });
    const pg = (document.querySelector('[data-lcs-page]') || document.body).getBoundingClientRect();
    R.querySelectorAll('svg[data-lcs-prim="fd-panel"], [data-lcs-answer], [data-lcs-fd-disc]').forEach((e) => { const b = e.getBoundingClientRect(); if (b.left < pg.left - 1 || b.right > pg.right + 1 || b.bottom > pg.bottom + 1) f.push('apparatus outside the page'); });
    return f;
  });
}

module.exports = { W, H, sceneOrder, sceneFor, fits, loadScene, pinned, cfgOf, panel, numberDisc, changes, pageChecks, pickOps, pickSpread, LINE_ALL: B.LINE_ALL };
