/**
 * K-501 — Trace, Then Color by Number (Picture Tracing maker 2026-11-02, NEW-TEMPLATES §31 T2): a Color by Number
 * picture whose lines are tracing guides — the child traces the picture, then colours each part with the crayon of its
 * number (the crayon key under it). Pencil control and numeral recognition on one page.
 *
 * The picture is a Color by Number design (data/cbn/designs.js, kind 'picture'; its parts and numbers are the reviewed
 * ones: data/cbn/labels.json) redrawn from the trace store: every library drawing of the design is placed exactly as the
 * design places it (data/cbn/lineart-designs.js: bottom-centre x, y and the ink box height h — lib/cbn-lineart.js
 * compose), so the numbers sit inside the traced parts; the design's own ground lines are traced too. A design whose
 * drawing is stretched (sx) cannot be traced in place and is not offered; a design over its band's traced-length budget
 * is skipped. The key: the picture in colour. The screen: the Color by Number screen of the same design (tap-paint).
 * Levels = the design levels (1 simple · 2 · 3 detailed); the guide band K at levels 1-2, G1 at level 3.
 */
'use strict';
const P = require('../../lib/pt-faces.js');
const { composeSceneSync } = require('../../lib/pt-scene.js');
const { makeCbnType, keyRow } = require('../../lib/cbn-type.js');
const R = require('../../lib/cbn-render.js');
const { DESIGNS, build: buildArt } = require('../../data/cbn/designs.js');
const { LINEART } = require('../../data/cbn/lineart-designs.js');
const { sample } = require('../../lib/htd-vector.js');
const platform = require('../../lib/platform/index.js');
const { refusedPicture } = require('../../lib/picture-refusals.js');
const path = require('path');

const BAND = { 1: { band: 'K', style: 'P2' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'G1', style: 'P3' } };
const base = makeCbnType({ id: 'K-501', slug: 'trace-and-color-by-number', kind: 'picture', i18n: { en: { title: 'x', instruction: 'x' } } });
let _labels = null;
function labelsFor(id) {
  if (!_labels) _labels = platform.readJson(path.join(__dirname, '..', '..', 'data', 'cbn', 'labels.json'));
  const l = _labels[id];
  if (!l || l.ok !== true) throw new Error(`pt-faces: no reviewed numbers for ${id}`);
  return l;
}
/** the design as a tracing scene in picture units (600 × 560): its drawings in place, its ground lines as traced lines */
function sceneOf(id, level) {
  const spec = LINEART.find((x) => x.id === id);
  if (!spec) throw new Error(`pt-faces: no line-art spec for ${id}`);
  const items = (spec.items || []).map((it) => {
    if ((it.sx && it.sx !== 1) || it.maxW) throw new Error(`pt-faces: ${id} stretches ${it.src}`);
    if (it.fit) return { src: it.src, x: it.x || 300, y: it.bottom != null ? it.bottom : null, fitBox: it.fit, anchor: it.bottom != null ? 'bottom' : 'centre', ...(it.bottom == null ? { y: it.y || 280 } : {}), flip: !!it.flip };
    // a small drawing of the design (a sun, a cloud) is printed solid: under the band's smallest picture it is not a
    // tracing task (K-418's floor), and it still bounds its numbered parts
    const small = it.h < P.MINPIC[BAND[level].band];
    return { src: it.src, x: it.x, y: it.y, h: it.h, ...(it.anchor === 'c' ? { anchor: 'centre' } : {}), flip: !!it.flip, ...(small ? { render: 'solid' } : {}) };
  });
  // the design's own lines (a horizon, a mound): traced too; an elliptical arc is not sampled here, so such a design is not offered
  if ((spec.lines || []).some((l) => /[aA]/.test(l.d))) throw new Error(`pt-faces: ${id} has an arc line`);
  const motifs = [].concat(...(spec.lines || []).map((l) => sample(l.d, 3).map((sp) => ({ m: 'line', a: [sp.pts, sp.closed] }))));
  return { W: 600, H: 560, band: BAND[level].band, style: BAND[level].style, items, motifs };
}
/**
 * the levels' designs (measured 2026-11-02 over the 100 picture designs: 69 trace in place — 24 stretch a drawing, 4 draw
 * an arc line, 3 overlap): level 1 = the Color by Number levels 1-2 whose traced length is at most 4,900 px (the
 * simplest lines), level 2 = the rest of them (≤ 11,000, the K budget), level 3 = the level-3 designs (≤ 15,000, G1)
 */
const LEVEL_DESIGNS = {
  1: ['rabbit', 'bat', 'crab', 'owl', 'donut', 'flying-saucer', 'narwhal', 'hermit-crab', 'starfish', 'teddy-bear', 'dice', 'tugboat', 'sailboat', 'apple', 'teapot'],
  2: ['donkey', 'fish', 'chick', 'goat', 'hummingbird', 'pony', 'unicorn', 'bull', 'lobster', 'clownfish', 'seahorse', 'octopus', 'drum', 'helicopter', 'cherries', 'cupcake', 'birthday-cake'],
  3: ['cat', 'hen', 'cow', 'puppy', 'scarecrow', 'police-car', 'ladybug', 'mouse', 'nest', 'rooster', 'sheep', 'dump-truck', 'bee', 'peacock', 'turkey', 'beach-ball', 'sea-turtle', 'snail', 'robot', 'rocking-horse', 'toy-train', 'spinning-top', 'pinwheel', 'kite', 'telephone', 'xylophone', 'school-bus', 'airplane', 'hot-air-balloon', 'rocket', 'fire-truck', 'tractor', 'sundae', 'pumpkin', 'house', 'flower-pot', 'sandcastle'],
};
const designs = (level) => LEVEL_DESIGNS[level];
/**
 * may this design be shown? Its list holds Color by Number designs (published pictures, their parts and numbers reviewed),
 * not library drawings. A design is shown when every drawing in it is one the tracing review keeps (pt-faces allowed,
 * the flagship index), or a drawing that is in the tracing store and left that index only because a page must not NAME it
 * (lib/picture-refusals.js): K-501 never names its drawings. Measured 2026-11-09: of the 69 designs' drawings the only one
 * outside the index is the plain sun of 41 designs (beach bw/sun, a circle and rays, refused for naming pages), traced
 * at level 3; none is refused by the tracing review itself (data/fl/review.js pt — the taxi with its printed word is in
 * no K-501 design).
 */
/**
 * the numbers of the TRACED page (tools/k501-labels.js → data/cbn/k501-labels.json): the Color by Number design's colours
 * on the parts the traced lines enclose. The reviewed numbers (labels.json) are placed for the Color by Number page, whose
 * lines are not these: a small shell or starfish is traced with every ridge and dot, so its number sat on the lines a
 * child traces (15 of 69 designs, flagship check 2026-11-09). A design without traced-page numbers is not offered.
 */
let _traced = null;
function tracedLabels(id) {
  if (!_traced) _traced = platform.readJson(path.join(__dirname, '..', '..', 'data', 'cbn', 'k501-labels.json'));
  const l = _traced[id];
  return l && l.ok === true ? l : null;
}
function traceable(id) {
  const spec = LINEART.find((x) => x.id === id);
  if (!spec || !tracedLabels(id)) return false;
  return (spec.items || []).every((it) => {
    if (P.allowed(it.src)) return true;
    const [theme, noun] = it.src.split('/');
    return !!P.INDEX[it.src] && refusedPicture(theme, noun);
  });
}

module.exports = {
  ...base,
  /** for tools/k501-labels.js: the traced scene of a design, and the levels' designs */
  traceScene: { sceneOf, LEVEL_DESIGNS, BAND },
  id: 'K-501',
  slug: 'trace-and-color-by-number',
  exerciseType: 'picture-tracing',
  unitAxis: undefined,
  i18n: {
    en: {
      title: 'Trace, Then Color by Number',
      instruction: 'Trace the lines of the picture. Then color each part with the color of its number.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2), lv = Number(difficulty);
    const L = BAND[lv];
    const got = P.firstThatFits(designs(lv), ctx, (id) => {
      const out = composeSceneSync(sceneOf(id, lv));
      if (out.problems.length) throw new Error('pt-faces: ' + out.problems.join('; '));
      if (out.metrics.tracedLen > P.BUDGET[L.band]) throw new Error(`pt-faces: ${id} traced length ${out.metrics.tracedLen} over the ${L.band} budget`);
      return { out, labels: labelsFor(id), traced: tracedLabels(id) };
    }, traceable);
    const id = got.src;
    // the screen and the key are the Color by Number pages of the same design (the screen paints the parts; the key colours them)
    if (ctx && (ctx.interactive || ctx.answerKey)) {
      const own = DESIGNS.find((x) => x.id === id).level;   // the Color by Number page is built at the design's own level
      const r = base.build.call(this, { difficulty: own, locale, unit: id, fixed: true }, ctx);
      return { bodyHtml: r.bodyHtml, meta: { design: id, colours: Object.keys(got.labels.num), band: L.band } };   // the page's meta: one design
    }
    const pw = 600, k = pw / 600;
    // a big part takes the big tracing-page number (16-24); a part under MIN_R takes the Color by Number page's own size
    // (compact 9-12, tiny 9 — lib/cbn-render.js): a 16-unit number in a tiny part covers the dashed lines the child traces
    // (flagship check 2026-11-09: the reviewed numbers now include the tiny parts, 13.5 % of a font-16 number on the lines)
    const fsOf = (r) => (r >= R.MIN_R ? Math.max(16, Math.min(24, r * 1.1)) : r >= R.MIN_R_COMPACT ? Math.max(9, Math.min(12, r * 1.45)) : 9);
    const nums = got.traced.labels.map(([x, y, r, n]) => { const f = fsOf(r); return `<text x="${x}" y="${(r >= R.MIN_R ? y + 7 : y + f * 0.36).toFixed(1)}" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="${r >= R.MIN_R ? f.toFixed(0) : f.toFixed(1)}" fill="#2E2E2E" data-lcs-num="${n}">${n}</text>`; }).join('');
    const svg = got.out.svg.replace(/<\/svg>\s*$/, `<g data-lcs-cbn-numbers="1">${nums}</g></svg>`).replace(/ width="600" height="560"/, ` width="${pw}" height="${Math.round(560 * k)}"`);
    const body = `<div data-ws-content data-lcs-type="K-501" data-lcs-design="${id}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">` +
      `<div style="border:3px solid #2E2E2E;border-radius:22px;overflow:hidden;line-height:0;background:#FFF">${svg}</div>${keyRow(got.labels.num, loc, false)}</div>`;
    return { bodyHtml: body, meta: { design: id, colours: Object.keys(got.labels.num), band: L.band } };
  },

  async verify(page) {
    const kind = await page.evaluate(() => (document.querySelector('svg[data-lcs-prim="pt-scene"]') ? 'traced' : document.querySelector('[data-lcs-num]') ? 'cbn' : 'key'));
    if (kind === 'key') return [];   // the answer key: the design in colour (the maker gates a key for its footer only)
    if (kind === 'cbn') return base.verify.call(this, page);   // the screen build: the Color by Number page's own checks
    const f = await page.evaluate(() => {
      const out = [];
      const svg = document.querySelector('svg[data-lcs-prim="pt-scene"]');
      const nums = [...svg.querySelectorAll('[data-lcs-num]')].map((t) => +t.getAttribute('data-lcs-num'));
      const key = [...document.querySelectorAll('[data-lcs-crayon]')];
      if (!nums.length) out.push('no numbers on the picture');
      const inKey = new Set(key.map((k) => +k.getAttribute('data-lcs-label').split(' ')[0]));
      for (const n of new Set(nums)) if (!inKey.has(n)) out.push(`number ${n} is not in the key`);
      for (const n of inKey) if (!nums.includes(n)) out.push(`key number ${n} is not on the picture`);
      const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
      for (const k of key) { const r = k.getBoundingClientRect(); if (r.bottom > pg.bottom - 18) out.push('the key reaches the footer'); }
      return out;
    });
    // the band rules on the traced picture (the numbers are text by design: checkPage's text rule is for the drawing)
    const band = (await P.checkPage(page)).filter((x) => x !== 'text inside a picture');
    return f.concat(band);
  },
};
