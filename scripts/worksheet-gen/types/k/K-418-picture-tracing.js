/**
 * K-418 — Picture Tracing (b9 flagship; docs/worksheet-gen/b9-designs/K-418-picture-tracing.md). PDF ONLY: no screen,
 * no answer key.
 *
 * The page: one composed scene (data/b9/scenes.js) in which the image library's own B&W drawings are redrawn as tracing
 * guides that lie ON their own lines (lib/pt-trace.js: thinned centre lines, nothing to erase), with the scene elements
 * the library lacks drawn as vector motifs in its style (lib/pt-motifs.js); things in front hide what is behind them
 * (lib/pt-scene.js). The band (PreK / K / G1) sets the guide (P1 thick dashes … P4 dots) and the band rules of the
 * pedagogy contract: a detail too short or too crowded to trace at that band prints solid (lib/pt-render.js classify).
 *
 * One additive knob `mode` (the face: strings + layout) and `scene` (the composition) per face; the faces are rows in
 * tools/b9var-rows/picture-tracing.js. Nothing is sampled: a face's page is fully determined by its scene.
 */
'use strict';
const { composeSceneSync } = require('../../lib/pt-scene.js');   // synchronous: the traces come from the store (lib/pt-store.js)
const { sceneFor } = require('../../data/b9/face-scenes.js');
const { EN_STRINGS } = require('../../data/b9/picture-tracing.js');

const D = {
  1: { mode: 'base' },
  2: { mode: 'base' },
  3: { mode: 'base' },
};

module.exports = {
  id: 'K-418',
  slug: 'picture-tracing',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: { title: EN_STRINGS.base.title, printTitle: EN_STRINGS.base.printTitle, instruction: EN_STRINGS.base.instruction },
  },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const loc = String(locale || 'en').slice(0, 2);
    const PTX = require('../../lib/ptx.js');
    // the maker (no unit): copy n = the n-th unit of this face at this level (null = the published page; makers 2026-11-02)
    let picked = null, art = null, artOthers = [];
    // the pictures that fit none of this face's scenes at this level never reach the picker (data/fl/pt-fit.json,
    // tools/build-pt-fit.js; flagship visual check 2026-11-08)
    const PTFIT = ctx && ctx.slotsOut ? require('../../data/fl/pt-fit.json') : null;
    const noFit = new Set((PTFIT && PTFIT.refused[d.mode + '|' + difficulty]) || []);
    const pool = ctx && ctx.slotsOut ? PTX.artPool(d.mode, difficulty).filter((k) => !noFit.has(k)) : [];
    if (!unit && ctx && ctx.slotsOut) {
      const list = PTX.makerUnits(this.id, difficulty);
      const v = String((ctx.seedVariant || ctx.variant) || 1);
      const n = /^\d+$/.test(v) ? +v : (+v.split('.')[0] || 1) + (+v.split('.')[1] || 0);
      picked = list[(n - 1) % list.length] || null;
      if (picked) unit = picked;
      // the teacher's picture or theme, and past the face's own pages the library (docs/makers/FLAGSHIP.md)
      const FL = require('../../lib/fl-art.js'), w = FL.wish(ctx);
      art = FL.choose(ctx, pool, n) || (n > list.length && pool.length ? pool[(n - 1 - list.length) % pool.length] : null);
      if (art) {
        if (!unit) unit = picked = list.find(Boolean);
        if (w.group) artOthers = pool.filter((k) => FL.groupOf(k) === w.group && k !== art).slice(0, 6);
      }
    }
    // F17 prints the locale's OWN four picture names (the bank's `words`; a locale without them REFUSES, never English)
    let words;
    if (d.mode === 'picture-and-word') {
      if (PTX.isPtx(unit)) words = require('../../data/ptx/words.js').wordsFor(unit, loc);   // a Level Set copy's own four pictures
      else {
        const blk = loc === 'en' ? require('../../data/b9/picture-tracing.js').PICTURE_TRACING.en : require('../../lib/b9-common.js').bank('picture-tracing', loc);
        words = blk.words;
      }
      if (!words || words.length !== 4) throw new Error('K-418: no picture words for ' + loc);
    }
    // a Level Set copy (unit ptx-…, data/ptx): its skin over this face's published scene; a page WITHOUT a unit is the
    // published page, untouched
    let sc;
    if (PTX.isPtx(unit)) {
      const r = PTX.resolvePtx(unit, { words });
      if (r.mode !== d.mode) throw new Error(`K-418: unit ${unit} belongs to face ${r.entry.face}, not ${this.id}`);
      if (r.entry.level !== difficulty && !(picked === unit && Math.abs(r.entry.level - difficulty) === 1)) throw new Error(`K-418: unit ${unit} is a level-${r.entry.level} scene, asked at level ${difficulty}`);
      sc = r.scene;
    } else sc = sceneFor(d.mode, { words });
    if (!sc) throw new Error('K-418: no scene for mode ' + d.mode);
    let out = null;
    // a picture that cannot stand in this scene's place gives way to the next one (never the teacher's own choice: that is refused)
    if (art) {
      const FLc = require('../../lib/fl-art.js'), own = FLc.wish(ctx).key === art, at = pool.indexOf(art), tries = own ? [art] : pool.slice(at, at + 16);
      // data/fl/pt-fit.json lists, for a picture that fits only SOME of the face's scenes, the scenes it fits (its drawing
      // inside the porthole's frame, its band rules kept): a scene it does not fit is never used, even when it composes
      const unitsAll = PTX.makerUnits(this.id, difficulty), hereAt = unitsAll.indexOf(unit === undefined ? null : unit);
      const fitMap = (PTFIT && PTFIT.fit[d.mode + '|' + difficulty]) || {};
      const fitsHere = (cand) => hereAt < 0 || !fitMap[cand] || fitMap[cand].includes(hereAt);
      for (const cand of tries) {
        if (!fitsHere(cand)) continue;
        const s2 = PTX.reskin(sc, cand, artOthers), o = composeSceneSync(s2);
        if (!o.problems.length && !checkMetrics(o.metrics, {}).length) { sc = s2; out = o; art = cand; break; }
      }
      // the teacher's own picture that cannot stand in this copy's scene goes to the next scene of this face and level it
      // fits (data/fl/pt-fit.json) instead of being refused: a picture the picker offers always makes a page (2026-11-08)
      if (!out && own && PTFIT) {
        const units = PTX.makerUnits(this.id, difficulty), L = units.length, here = Math.max(0, units.indexOf(unit));
        const fits = (PTFIT.fit[d.mode + '|' + difficulty] || {})[art] || units.map((u, i) => i);
        for (const i of fits.slice().sort((x, y) => ((x - here + L) % L) - ((y - here + L) % L))) {
          const u = units[i]; if (!u) continue;
          const r = PTX.resolvePtx(u, { words }); if (r.mode !== d.mode) continue;
          const s2 = PTX.reskin(r.scene, art, artOthers), o = composeSceneSync(s2);
          if (!o.problems.length && !checkMetrics(o.metrics, {}).length) { sc = s2; out = o; unit = picked = u; break; }
        }
      }
      if (!out) { if (own) throw new Error('K-418: this picture does not fit this scene'); art = null; }
    }
    if (!out) out = composeSceneSync(sc);
    if (out.problems.length) throw new Error('K-418: scene ' + d.mode + ': ' + out.problems.join('; '));
    // the answer key (makers 2026-11-02): the three faces whose page has an answer draw it over the scene, the page itself
    // unchanged — the count in its box (K-427), a ring round each hidden animal (G1-433), every circle coloured (K-430)
    if (ctx && ctx.answerKey) {
      const k = keyLayer(d.mode, sc, out);
      if (k) out.svg = out.svg.replace(/<\/svg>\s*$/, k + '</svg>');
    }
    // a Level Set copy balances its instruction lines (same line count, never a one-word last line — the measured widow gate in
    // tools/level-set/ptl-render.js); the published page keeps its bytes
    const ptxStyle = PTX.isPtx(unit) ? '<style>[data-lcs-instruction]{text-wrap:balance}</style>' : '';
    const bodyHtml = `${ptxStyle}<div data-ws-content${pool.length ? require('../../lib/fl-art.js').tap(ctx) : ''} data-lcs-pt-mode="${d.mode}" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">${out.svg}</div>`;
    // a maker copy carries its own unit and the Level Set strings of that copy (title with its scene's name, its instruction)
    const FL2 = require('../../lib/fl-art.js');
    // a copy with no picture chosen reports its scene's own main drawing when the picker offers it: else the picker showed no
    // current picture and offered that one as a change that changes nothing (own-input 2026-11-10: K-420 level 1 copy 1 is
    // a garden pond whose main drawing is the duck the gate then chose)
    const hs = art ? null : PTX.heroSrc(sc);
    if (pool.length) FL2.report(ctx, pool, art || (hs && pool.includes(hs) ? hs : null));
    const copy = picked ? { unit: picked, strings: art ? require('../../data/ptx/text.js').stringsFor(picked, loc, {}, FL2.nameOf(art, loc)) : this.copyStrings({}, { unit: picked, locale: loc }) } : {};
    return { bodyHtml, meta: { mode: d.mode, pictures: out.placed.filter((p) => !p.motif).map((p) => p.src), metrics: out.metrics }, ...copy };
  },

  /**
   * A Level Set copy's strings (unit ptx-…, data/ptx): the face's Level Set title with the scene's own name, its print
   * heading and an instruction that is TRUE of every copy of the face (data/ptx/text.js; never the published instruction,
   * which names the published page's pictures). A page without a ptx unit keeps its published strings. A locale without
   * the text REFUSES (never English).
   */
  copyStrings(s0, ctx) {
    const PTX = require('../../lib/ptx.js');
    if (!ctx || !PTX.isPtx(ctx.unit)) return s0;
    return require('../../data/ptx/text.js').stringsFor(ctx.unit, String(ctx.locale || 'en').slice(0, 2), s0);
  },

  /** the rendered page against the band rules (pedagogy contract §1 + the engine's traced-length budget) */
  async verify(page) {
    const info = await page.evaluate(() => {
      const svg = document.querySelector('svg[data-lcs-prim="pt-scene"]');
      if (!svg) return null;
      const body = document.querySelector('[data-ws-content]');
      const r = svg.getBoundingClientRect();
      const words = (body ? body.textContent : '').replace(/\s+/g, ' ').trim();
      return { m: JSON.parse(svg.getAttribute('data-lcs-pt-metrics') || '{}'), h: r.height, words, allowText: svg.hasAttribute('data-lcs-pt-words') };
    });
    if (!info) return ['no picture-tracing scene'];
    return checkMetrics(info.m, { renderedH: info.h, words: info.words, allowText: info.allowText });
  },
};

/** the key's marks over a composed scene (scene px = the svg's own units); null when the face has nothing to mark */
function keyLayer(mode, sc, out) {
  const TEAL = '#146B5E', CORAL = '#F2784B';
  if (mode === 'trace-and-count') {
    // the answer box is the roundRect at 16,16 120×120 with its write line at y 112 (face-scenes.js / ptx scenes-K427.js BOX)
    const n = sc.count && sc.count.n;
    if (!(n > 0)) throw new Error('K-427 key: the scene declares no count');
    return `<text data-lcs-key-sample="count" x="76" y="104" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="72" fill="${TEAL}">${n}</text>`;
  }
  if (mode === 'hidden-animals') {
    const hidden = (sc.items || []).filter((it) => it.hidden);
    const rings = hidden.map((it) => {
      const p = out.placed.find((q) => q.item === it && q.box);   // the composer keeps each item's own spec
      if (!p) throw new Error('K-418 key: hidden ' + it.src + ' was not placed');
      const b = p.box, m = 8;
      return `<rect data-lcs-key-sample="ring" x="${(b.x0 - m).toFixed(1)}" y="${(b.y0 - m).toFixed(1)}" width="${(b.x1 - b.x0 + 2 * m).toFixed(1)}" height="${(b.y1 - b.y0 + 2 * m).toFixed(1)}" rx="16" fill="none" stroke="${CORAL}" stroke-width="5"/>`;
    });
    if (!rings.length) throw new Error('K-418 key: no hidden animals in the scene');
    return rings.join('');
  }
  if (mode === 'shape-picture') {
    const circles = (sc.motifs || []).filter((mo) => mo.m === 'circle');
    if (circles.length < 2) throw new Error('K-430 key: fewer than 2 circles in the scene');
    return circles.map((mo) => `<circle data-lcs-key-sample="circle" cx="${mo.a[0]}" cy="${mo.a[1]}" r="${mo.a[2]}" fill="${CORAL}" fill-opacity="0.45"/>`).join('');
  }
  return null;
}

/** the band rules on a scene's measurements → failure strings (shared by verify() and the family gate) */
// + the Level Set bands (ptl-levels.md §0): the budget and floor of the level's band
const BUDGET = { PreK: 4500, K: 11000, G1: 15000, 'PreK-1': 3000, 'PreK-3': 6500, 'K-1': 6500, 'K-3': 13000, 'G1-1': 9000, 'G1-3': 15000 };
const MINPIC = { PreK: 300, K: 130, G1: 80, 'PreK-1': 340, 'PreK-3': 200, 'K-1': 200, 'K-3': 95, 'G1-1': 130, 'G1-3': 70 };
function checkMetrics(m, o = {}) {
  const f = [];
  if (!m || !m.band) return ['the scene declares no band'];
  const budget = m.budget || BUDGET[m.band], floor = o.minPic || m.floor || MINPIC[m.band];
  if (m.tracedLen > budget) f.push(`traced length ${m.tracedLen} px over the ${m.band} budget ${budget}`);
  if (m.pictures && m.minPic < floor) f.push(`a traced picture is ${m.minPic} px, under the ${m.band} floor ${floor}`);
  if (m.extent && m.extent.y1 - m.extent.y0 < 600) f.push(`the scene fills only ${m.extent.y1 - m.extent.y0} px of the body (≥ 600)`);
  if (o.words && !o.allowText) f.push('text in the picture body: "' + o.words.slice(0, 40) + '"');
  return f;
}
module.exports.checkMetrics = checkMetrics;
module.exports.BUDGET = BUDGET;
