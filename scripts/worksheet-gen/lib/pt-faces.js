/**
 * pt-faces.js — the shared parts of the NEW Picture Tracing templates of the maker (makers 2026-11-02, NEW-TEMPLATES §31:
 * K-498 Trace a Picture · K-499 Trace the Picture, Then Write the Word · K-500 A Tracing Booklet). They read K-418's
 * library parts — the trace store (data/pt/traces via lib/pt-scene.js composeSceneSync), the tracing index
 * (data/pt/index.json: every traced library drawing with its band P1 simple · P2 · P3 detailed · X refused) and the band
 * rules (lib/pt-render.js; K-418 BUDGET / MINPIC) — so K-418 and its published faces stay untouched.
 *
 *   LEVEL[level]              the level's band (PreK / K / G1), guide style and the drawing bands it may use
 *   drawings(face, level)     the traced drawings of the level, in the face's own fixed order (never a refused picture)
 *   composeFit(scene, item, band)  compose one picture, shrinking it while its traced length is over the band budget
 *   firstThatFits(list, ctx, fn)   copy n = the n-th drawing that composes (a drawing that cannot is skipped)
 *   checkPage(page, o)        the band rules on the rendered page (budget, smallest picture), no text inside the picture
 */
'use strict';
const { composeSceneSync } = require('./pt-scene.js');
const { makeRng } = require('./rng.js');
const { refusedPicture } = require('./picture-refusals.js');
const INDEX = require('../data/pt/index.json');
const BUDGET = { PreK: 4500, K: 11000, G1: 15000 };   // K-418 BUDGET (the traced length a page may ask of a child)
const MINPIC = { PreK: 300, K: 130, G1: 80 };          // K-418 MINPIC (the smallest traced picture of a band)

const LEVEL = {
  1: { band: 'PreK', style: 'P1', bands: ['P1'] },
  2: { band: 'K', style: 'P2', bands: ['P1', 'P2'] },
  3: { band: 'G1', style: 'P3', bands: ['P2', 'P3'] },
};
const _lists = new Map();
function drawings(face, level, extra) {
  const k = face + '|' + level;
  if (!_lists.has(k)) {
    const bands = new Set(LEVEL[level].bands);
    const ok = Object.keys(INDEX).filter((src) => bands.has(INDEX[src].band) && !refusedPicture(src.split('/')[0], src.split('/')[1]) && (!extra || extra(src))).sort();
    _lists.set(k, makeRng('pt-faces|' + face + '|' + level).shuffle(ok));
  }
  return _lists.get(k);
}
/** compose a scene whose item `it` is shrunk (×0.85, up to 4 times) while the page's traced length is over the band budget */
function composeFit(scene, band) {
  let sc = scene, out;
  for (let t = 0; t < 5; t++) {
    out = composeSceneSync(sc);
    if (out.problems.length) throw new Error('pt-faces: ' + out.problems.join('; '));
    if (out.metrics.tracedLen <= BUDGET[band] && out.metrics.minPic >= MINPIC[band]) return out;
    if (out.metrics.minPic < MINPIC[band]) throw new Error(`pt-faces: a picture of ${out.metrics.minPic} px is under the ${band} floor`);
    sc = { ...sc, items: sc.items.map((it) => (it.render === 'model' || !it.fitBox ? it : { ...it, fitBox: [it.fitBox[0] * 0.85, it.fitBox[1] * 0.85] })) };
  }
  throw new Error(`pt-faces: traced length ${out.metrics.tracedLen} over the ${band} budget`);
}
const copyOf = (ctx) => Math.max(1, parseInt(String((ctx && ctx.variant) || 1), 10) || 1);
/** copy n = the n-th entry of the list that fn(src) composes (walking on past a drawing that cannot) */
function firstThatFits(list, ctx, fn) {
  const n = copyOf(ctx);
  let err;
  for (let k = 0; k < Math.min(40, list.length); k++) {
    const src = list[(n - 1 + k) % list.length];
    try { return { src, ...fn(src) }; } catch (e) { err = e; if (!/pt-faces|pt-scene/.test(e.message)) throw e; }
  }
  throw new Error('pt-faces: no drawing fits (' + (err && err.message) + ')');
}
/** the band rules on the rendered page: every traced scene within its band's budget and floor */
async function checkPage(page) {
  return page.evaluate((BUDGET, MINPIC) => {
    const f = [];
    const svgs = [...document.querySelectorAll('svg[data-lcs-prim="pt-scene"]')];
    if (!svgs.length) return ['no traced picture'];
    for (const s of svgs) {
      const m = JSON.parse(s.getAttribute('data-lcs-pt-metrics') || '{}');
      if (!m.band) { f.push('a traced picture declares no band'); continue; }
      if (m.tracedLen > BUDGET[m.band]) f.push(`traced length ${m.tracedLen} over the ${m.band} budget ${BUDGET[m.band]}`);
      if (m.pictures && m.minPic < MINPIC[m.band]) f.push(`a traced picture is ${m.minPic} px, under the ${m.band} floor ${MINPIC[m.band]}`);
      if ((s.textContent || '').trim()) f.push('text inside a picture');
    }
    const pg = (document.querySelector('[data-lcs-page]') || document.body).getBoundingClientRect();
    svgs.forEach((s) => { const b = s.getBoundingClientRect(); if (b.right > pg.right + 1 || b.bottom > pg.bottom + 1) f.push('a picture leaves the page'); });
    return f;
  }, BUDGET, MINPIC);
}
module.exports = { LEVEL, INDEX, BUDGET, MINPIC, drawings, composeFit, firstThatFits, copyOf, checkPage };
