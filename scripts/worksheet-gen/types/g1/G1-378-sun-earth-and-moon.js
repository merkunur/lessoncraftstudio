/**
 * G1-378 — Sun, Earth and Moon: "the Sky Chart" (nt10-E, b5; family key
 * `earth-and-space`, G1, science, no CCSS — `teaches` "Sun, Earth and Moon
 * (science readiness)"; en prose names NGSS 1-ESS1-1, the star fact 5-ESS1-1).
 * Design: docs/worksheet-gen/b5-designs/G1-378-earth-and-space.md §2 / §5; every
 * ruling in _work/G1-378-critic.md; build record _work/G1-378-build.md.
 *
 * ONE white chart card. Its three right-hand column HEADS are the bodies, drawn
 * in one hand at honest relative size (primitives/sky-bodies.js: Sun disc 59.8 >
 * Earth 44 > Moon 26 at the d2 head box 88; "not to scale" is said on the
 * landing), each over its name pill. Numbered ROWS each print one short fact;
 * the child reads it and ticks ONE box under the body it is true of. Names are
 * printed once (in the heads); the drawing IS the answer column. No library
 * picture (every `space/*` file was opened and refused, critic §3).
 *
 * THEME axis OFF (`coordinate.theme:''`), no unitAxis. build() reads ONLY its bank
 * (lib/b5-common.js bank('earth-and-space', loc) — a missing locale block THROWS,
 * never an en fallback) plus the family's own locale-neutral model
 * (data/b5/earth-and-space.js EARTH_AND_SPACE: truth vectors). Every printed word
 * is a whole panel literal (bodies / facts); a missing, empty, slot-bearing or
 * digit-bearing literal REFUSES. Never image-vocabulary.js at render.
 *
 * Ladder (a CONFIG; every guard keys on the RESOLVED keys, never the level index):
 *   d1  rows 6  · counts 2/2/2 · size facts ON (scaffold: readable off the heads) ·
 *       rowMin 72 · tick 48 · fact 20 px · head box 88 (the design's 96 overflows the 92 px
 *       column: the Sun's rays touched the separator in the d1 render)
 *   d2  rows 8  · counts 3/3/2 in an rng order · size facts OFF ·
 *       rowMin 56 · tick 44 · fact 18 px · head box 88                     (ships)
 *   d3  rows 10 · counts 3/4/3 (the only split the non-size pool allows: Sun 3,
 *       Earth 5, Moon 3) · size facts OFF · rowMin 52 · tick 44 · fact 17 · head 80
 *
 * COMPOSER (locale-neutral: the same facts in the same rows in all 11 locales):
 * counts = rng.shuffle(cfg.counts) (re-drawn until every body's pool can supply
 * it); facts = rng.sample of each body's pool; row order rng.shuffle, re-drawn
 * until the body sequence has no run of 3, is not periodic (period 2 or 3), and
 * row 1 is not the Sun. Every column therefore holds >= 2 answers on EVERY page
 * (the per-page answer-position rule, K-368 precedent).
 *
 * SPARSE (coordinator review 2026-09-23): a row is at most `tick + 36` px tall
 * and the chart is top-anchored (flex-grow capped at its content), so the slack
 * of a short page falls BELOW the chart, never as a blank band between rows
 * (gate: max blank band between consecutive content blocks <= 40 px).
 *
 * STAMPS: root data-lcs-type="G1-378" data-lcs-cfg (resolved) data-lcs-facts
 * (fact id -> printed literal) data-lcs-names (body -> head literal); head
 * [data-lcs-head=<body>]; row [data-lcs-row=n][data-lcs-fact=id][data-lcs-body=
 * answer]; tick box [data-lcs-tick=<body>] (blankNumeralBox, EMPTY). NO
 * data-lcs-layout on the base (byte-identical rule for the faces). verify()
 * re-derives every row's body from FACTS[id].truth (passed in, never the stamp).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const { EARTH_AND_SPACE: M } = require('../../data/b5/earth-and-space.js');
const C5 = require('../../templates/components-b5.js');
const { esc } = require('../../primitives/_svg.js');
const DAY_NIGHT = require('../../data/science/day-vs-night.json');   // F3 chip labels only (design §5 page reads; K-208's Day / Night x11)

const ID = 'G1-378';
const KEY = 'earth-and-space';
const BODIES = M.BODIES;
const ORDER_TRIES = 600;
const FACE_MODES = M.MODES.filter((m) => m !== 'base');
const SPARSE_MAX = 40;

function literal(block, group, key, loc) {
  const w = block && block[group] && block[group][key];
  if (typeof w !== 'string' || !w.trim()) throw new Error(`${ID}: the ${loc} bank has no ${group}.${key} — refuse (never a vocab / en fallback)`);
  if (/[{}]/.test(w)) throw new Error(`${ID}: the ${loc} ${group}.${key} ("${w}") carries a slot — refuse`);
  if (group === 'facts' && /\p{Nd}/u.test(w)) throw new Error(`${ID}: the ${loc} fact ${key} ("${w}") carries a digit — refuse`);
  return w;
}
function stringsFor(block, mode, loc) {
  const s = block && block.strings && block.strings[mode];
  if (!s || typeof s.title !== 'string' || !s.title.trim() || typeof s.instruction !== 'string' || !s.instruction.trim()) throw new Error(`${ID}: the ${loc} bank has no strings.${mode} — refuse`);
  return s;
}
const bodyOf = (id) => BODIES[M.FACTS[id].truth.indexOf(1)];

function sequenceOk(seq) {
  if (seq[0] === 'sun') return false;
  for (let i = 2; i < seq.length; i++) if (seq[i] === seq[i - 1] && seq[i] === seq[i - 2]) return false;
  for (const p of [2, 3]) if (seq.every((b, i) => i + p >= seq.length || b === seq[i + p])) return false;
  return true;
}

const COMMON = { badge: 30, badgeGap: 10, col: 92, sunDiscR: 34 };
module.exports = {
  id: ID,
  slug: KEY,
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { ...COMMON, rows: 6, counts: [2, 2, 2], sizeFacts: true, rowMin: 72, tick: 48, factPx: 20, headBox: 88, headH: 128 },
    2: { ...COMMON, rows: 8, counts: [3, 3, 2], sizeFacts: false, rowMin: 56, tick: 44, factPx: 18, headBox: 88, headH: 128 },
    3: { ...COMMON, rows: 10, counts: [3, 4, 3], sizeFacts: false, rowMin: 52, tick: 44, factPx: 17, headBox: 80, headH: 120 },
  },
  i18n: {
    en: {
      title: 'Sun, Earth and Moon',
      instruction: 'Read each sentence. Is it about the Sun, the Earth or the Moon? Tick one box.',
    },
  },
  FACE_MODES,
  SPARSE_MAX,
  literal, stringsFor, sequenceOk, bodyOf,

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(block, d, { locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    if (!block || typeof block !== 'object') throw new Error(`${ID}: no ${loc} bank block`);
    if (!d || typeof d !== 'object') throw new Error(`${ID}: no difficulty config`);
    if (d.layout !== undefined) {
      if (!FACE_MODES.includes(d.layout)) throw new Error(`${ID}: unknown layout "${d.layout}"`);
      return this._buildFace(block, d, loc, ctx);   // the five faces (additive; the base path below is untouched)
    }
    stringsFor(block, 'base', loc);
    if (block.hemisphere !== 'N' && block.hemisphere !== 'S') throw new Error(`${ID}: the ${loc} bank hemisphere "${block.hemisphere}" is not N|S — refuse`);
    const cfg = { ...d, rowMax: d.tick + SPARSE_MAX - 4 };   // 4 px margin under the 40 px band rule (sub-pixel row heights)
    if (!Array.isArray(cfg.counts) || cfg.counts.length !== 3 || cfg.counts.reduce((a, b) => a + b, 0) !== cfg.rows) throw new Error(`${ID}: counts ${JSON.stringify(cfg.counts)} do not sum to rows ${cfg.rows}`);
    if (Math.min(...cfg.counts) < 2) throw new Error(`${ID}: a body with < 2 facts would leave its column (nearly) empty — per-page answer-position rule`);
    if (!(cfg.tick >= 44)) throw new Error(`${ID}: tick ${cfg.tick} < the G1 floor 44`);
    if (!(cfg.rowMin >= cfg.tick + 8)) throw new Error(`${ID}: rowMin ${cfg.rowMin} cannot hold a ${cfg.tick} px tick box`);
    if (!(cfg.factPx >= 16)) throw new Error(`${ID}: fact text ${cfg.factPx} px < 16`);
    if (!(cfg.headBox <= cfg.col - 4)) throw new Error(`${ID}: head box ${cfg.headBox} > the ${cfg.col} px column - 4 (the Sun's rays would cross the separator)`);
    if (!(cfg.headBox >= 72)) throw new Error(`${ID}: head box ${cfg.headBox} < 72 (the Moon would print under 21 px)`);
    const rng = ctx.rng;
    // pools
    const pool = Object.fromEntries(BODIES.map((b) => [b, Object.keys(M.FACTS).filter((id) => bodyOf(id) === b && (cfg.sizeFacts || !M.FACTS[id].size) && !M.FORBIDDEN_FACT_IDS.includes(id))]));
    let counts = null;
    for (let t = 0; t < ORDER_TRIES && !counts; t++) { const c = rng.shuffle(cfg.counts); if (BODIES.every((b, i) => c[i] <= pool[b].length)) counts = c; }
    if (!counts) throw new Error(`${ID}: no assignment of counts ${JSON.stringify(cfg.counts)} fits the pools ${JSON.stringify(Object.fromEntries(BODIES.map((b) => [b, pool[b].length])))}`);
    const chosen = BODIES.flatMap((b, i) => rng.sample(pool[b], counts[i]));
    let order = null;
    for (let t = 0; t < ORDER_TRIES && !order; t++) { const o = rng.shuffle(chosen); if (sequenceOk(o.map(bodyOf))) order = o; }
    if (!order) throw new Error(`${ID}: no row order without a run of 3 / a period / a Sun first in ${ORDER_TRIES} tries`);
    // literals (a missing one refuses)
    const names = Object.fromEntries(BODIES.map((b) => [b, literal(block, 'bodies', b, loc)]));
    const facts = Object.fromEntries(order.map((id) => [id, literal(block, 'facts', id, loc)]));
    const rows = order.map((id, i) => ({ n: i + 1, id, body: bodyOf(id), text: facts[id] }));
    const stamp = { rows: cfg.rows, counts: cfg.counts, sizeFacts: cfg.sizeFacts, rowMin: cfg.rowMin, rowMax: cfg.rowMax, tick: cfg.tick, factPx: cfg.factPx, headBox: cfg.headBox, col: cfg.col, sparseMax: SPARSE_MAX };
    const chartCap = cfg.headH + cfg.rows * cfg.rowMax + 20;
    const chart = C5.skyChart({ heads: BODIES.map((b) => ({ body: b, name: names[b] })), rows, cfg });
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-family="${KEY}" data-lcs-cfg="${esc(JSON.stringify(stamp))}" data-lcs-facts="${esc(JSON.stringify(facts))}" data-lcs-names="${esc(JSON.stringify(names))}" ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-start;min-height:0">` +
      `<div class="es-chartbox" style="flex:1 1 auto;max-height:${chartCap}px;min-height:0;display:flex;flex-direction:column">${chart}</div></div>`;
    return { bodyHtml, meta: { rows: rows.map((r) => ({ id: r.id, body: r.body })), counts: Object.fromEntries(BODIES.map((b, i) => [b, counts[i]])), cfg: stamp } };
  },

  /* ================================================================ FACES (Phase E, 2026-09-23)
   * ONE additive knob `layout` (design §3): undefined = the base above, byte-identical; a face
   * config carries its own keys and every guard keys on THEM, never on the level index. The face
   * root stamps data-lcs-layout (never the base) and keeps data-lcs-type="G1-378" (the family).
   * Draws use only ctx.rng (the seed carries no locale), so a tell would ship to all 11 locales:
   * every composer re-draws until the SHIPPED page is clean. `d.poison` is the gate's seam only. */
  _buildFace(block, d, loc, ctx) {
    const L = d.layout;
    const rng = ctx.rng;
    if (Array.isArray(block.refuse) && block.refuse.includes(L)) throw new Error(`${ID}: the ${loc} bank refuses the ${L} face`);
    const s = stringsFor(block, L, loc);
    if (block.hemisphere !== 'N' && block.hemisphere !== 'S') throw new Error(`${ID}: the ${loc} bank hemisphere "${block.hemisphere}" is not N|S — refuse`);
    const P = d.poison || {};
    const lin = C5.lin;
    const common = { layout: L, sparseMax: SPARSE_MAX };
    const root = (cfg, extra, vars, inner, gap) => C5.faceRoot({
      attrs: `data-lcs-type="${ID}" data-lcs-family="${KEY}" data-lcs-layout="${L}" data-lcs-locale="${loc}" data-lcs-hemi="${block.hemisphere}" data-lcs-cfg="${esc(JSON.stringify({ ...common, ...cfg }))}" ${extra}`,
      vars, inner, gap,
    });
    const T = (what) => { throw new Error(`${ID} ${L}: ${what}`); };
    void s;

    if (L === 'moon-phases-in-order') {
      if (!Array.isArray(d.rails) || !d.rails.length) T('no rails');
      if (!(d.d >= 104)) T(`moon d ${d.d} < 104 (the design floor; a crescent needs >= 80)`);
      if (!(d.box && d.box[0] >= 44 && d.box[1] >= 44)) T(`box ${JSON.stringify(d.box)} under the G1 floor 44`);
      const lit = (p) => (1 - Math.cos(p * Math.PI / 4)) / 2;
      const rails = d.rails.map((r) => {
        if (!['grow', 'shrink'].includes(r.cue)) T(`cue "${r.cue}"`);
        const l = r.phases.map(lit);
        const mono = l.every((x, i) => !i || (r.cue === 'grow' ? x > l[i - 1] : x < l[i - 1]));
        if (!mono) T(`rail ${JSON.stringify(r.phases)} is not strictly ${r.cue === 'grow' ? 'growing' : 'shrinking'} (single-answer rule)`);
        return r;
      });
      const idx = [...Array(rails[0].phases.length).keys()];
      let orders = null;
      for (let t = 0; t < ORDER_TRIES && !orders; t++) {
        const o = rails.map(() => rng.shuffle(idx));
        const ans = o.map((x) => x.map((i) => i + 1).join());
        const sorted = idx.map((i) => i + 1).join(), rev = idx.map((i) => i + 1).reverse().join();
        if (ans.some((a) => a === sorted || a === rev)) continue;
        if (new Set(ans).size !== ans.length) continue;
        orders = o;
      }
      if (!orders) T('no rail order that is neither sorted nor reversed');
      if (P.sortedRail) orders[0] = idx.slice();
      const html = rails.map((r, n) => C5.moonRail({ n: n + 1, cue: r.cue, hemisphere: block.hemisphere, d: d.d, forceAnswerBox: !!P.answerBox,
        slots: orders[n].map((i) => ({ phase: r.phases[i], answer: i + 1 })) })).join('');
      const out = P.moonInCue ? html.replace(/(<svg style="width:var\(--es-cw\)[^>]*>)/, `$1${require('../../primitives/moon-phase.js').moonPhase({ phase: 4, hemisphere: block.hemisphere, d: 104 }).svg.replace(/^<svg /, '<svg x="0" y="0" width="30" height="30" ')}`) : html;
      const vars = `--es-md:${lin(112, 120)};--es-cw:${lin(120, 150)};--es-bw:${lin(56, 64)};--es-bh:${lin(52, 60)};--es-p:${lin(22, 34)};--es-g1:${lin(18, 30)};--es-g2:${lin(14, 24)};`;
      return { bodyHtml: root({ rails: rails.map((r) => r.cue), d: d.d, box: d.box }, '', vars, out, lin(20, 30)),
        meta: { layout: L, rails: rails.map((r, n) => ({ cue: r.cue, phases: orders[n].map((i) => r.phases[i]), answers: orders[n].map((i) => i + 1) })) } };
    }

    if (L === 'moon-phase-names') {
      const phases = d.phases;
      if (!Array.isArray(phases) || phases.some((p) => !M.NAMED_PHASES.includes(p))) T(`phases ${JSON.stringify(phases)} outside the named set {0,2,4,6} (a crescent / gibbous would fit two names)`);
      if (!(d.d >= 88)) T(`moon d ${d.d} < 88`);
      if (!(d.glyphH >= 24)) T(`glyphH ${d.glyphH} < 24`);
      const names = Object.fromEntries(M.NAMED_PHASES.map((p) => [p, literal(block, 'phaseNames', String(p), loc)]));
      let cards = null;
      for (let t = 0; t < ORDER_TRIES && !cards; t++) { const o = rng.shuffle(phases); if (o.every((p, i) => (!i || p !== o[i - 1]) && (i < 2 || p !== o[i - 2]))) cards = o; }
      if (!cards) T('no card order without two identical phases adjacent');
      let bank = null;
      const first4 = cards.slice(0, 4).join();
      for (let t = 0; t < ORDER_TRIES && !bank; t++) { const o = rng.shuffle(M.NAMED_PHASES); if (o.join() !== first4 && o.slice().reverse().join() !== first4) bank = o; }
      if (!bank) T('no bank order clear of the first four cards');
      if (P.cards) cards = P.cards;
      const grid = `<div class="es-pgrid" style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(${Math.ceil(cards.length / 2)},minmax(0,1fr));gap:var(--es-gg) 12px;flex:1 1 auto;min-height:0">` +
        cards.map((p, i) => C5.phaseCard({ n: i + 1, phase: p, hemisphere: block.hemisphere, d: d.d, lineW: d.lineW, lineH: d.lineH, glyphH: d.glyphH })).join('') + `</div>`;
      const vars = `--es-sq:${lin(112, 126)};--es-md:${lin(96, 108)};--es-gg:${lin(10, 16)};`;
      return { bodyHtml: root({ phases: d.phases, d: d.d, lineW: d.lineW, glyphH: d.glyphH }, `data-lcs-names="${esc(JSON.stringify(names))}"`, vars, C5.phaseBank({ names, order: bank }) + grid),
        meta: { layout: L, cards, bank } };
    }

    if (L === 'day-and-night-model') {
      if (!(d.r >= 150)) T(`Earth r ${d.r} < 150`);
      if (d.shadeNight) T('shadeNight is the d1 scaffold (not shipped): the shaded half prints the answer');
      const words = Object.fromEntries(['day', 'night'].map((k) => {
        const bin = DAY_NIGHT.bins.find((b) => b.key === k);
        const w = bin && bin.label && bin.label[loc];
        if (typeof w !== 'string' || !w.trim()) T(`data/science/day-vs-night.json has no ${k} label for ${loc} — refuse`);
        return [k, w];
      }));
      const sunDir = d.sunDir === 'rng' ? rng.pick(['left', 'right']) : d.sunDir;
      const [nd, nn] = d.split;
      const angles = [...rng.sample(M.DAY_ANGLES, nd), ...rng.sample(M.NIGHT_ANGLES, nn)];
      if (P.pinAngle !== undefined) angles[0] = P.pinAngle;
      const isDay = (a) => Math.abs(a) < 90;
      let nums = null;
      const banned = (seq) => /^(d+n+|n+d+|(dn)+d?|(nd)+n?)$/.test(seq);
      for (let t = 0; t < ORDER_TRIES && !nums; t++) {
        const o = rng.shuffle([...Array(angles.length).keys()].map((i) => i + 1));
        const seq = [...Array(angles.length).keys()].map((k) => (isDay(angles[o.indexOf(k + 1)]) ? 'd' : 'n')).join('');
        const half = Math.ceil(angles.length / 2);
        if (banned(seq) || !/d/.test(seq.slice(0, half)) || !/n/.test(seq.slice(0, half)) || !/d/.test(seq.slice(half)) || !/n/.test(seq.slice(half))) continue;
        nums = o;
      }
      if (!nums) T('no pin numbering without a day/night pattern');
      const pins = angles.map((a, i) => ({ n: nums[i], angle: a }));
      const rows = pins.slice().sort((a, b) => a.n - b.n).map((p) => ({ n: p.n, answer: isDay(p.angle) ? 'day' : 'night' }));
      const model = C5.dayNightModel({ sunDir, r: d.r, pins, sunH: 480, shade: !!P.shade });
      const vars = `--es-ph:${lin(400, 480)};--es-ew:${lin(340, 404)};--es-ch:${lin(46, 56)};--es-rg:${lin(12, 20)};--es-tp:${lin(12, 20)};`;
      return { bodyHtml: root({ r: d.r, pins: angles.length, split: d.split, sunDir }, `data-lcs-words="${esc(JSON.stringify(words))}"`, vars, model + C5.pinTable({ rows, words }), lin(16, 26)),
        meta: { layout: L, sunDir, pins, answers: rows.map((r) => r.answer) } };
    }

    if (L === 'planets-in-order') {
      if (!(d.discD >= 36)) T(`orbit disc ${d.discD} < 36`);
      if (!(d.glyphH >= 24)) T(`glyphH ${d.glyphH} < 24`);
      if (d.slots !== M.PLANETS.length) T(`slots ${d.slots} ≠ ${M.PLANETS.length}`);
      const names = Object.fromEntries(M.PLANETS.map((id) => [id, literal(block, 'planets', id, loc)]));
      const alpha = Object.values(M.PLANET_ALPHA).map((o) => o.join());
      let bank = null;
      for (let t = 0; t < ORDER_TRIES && !bank; t++) {
        const o = rng.shuffle(M.PLANETS);
        const j = o.join();
        if (j === M.PLANETS.join() || j === M.PLANETS.slice().reverse().join() || alpha.includes(j)) continue;
        bank = o;
      }
      if (!bank) T('no bank order clear of the answer / reverse / every locale alphabetical order');
      if (P.bank) bank = P.bank;
      const cards = `<div class="es-bankrow" data-lcs-planet-bank style="display:flex;gap:3px;width:100%;flex:0 0 auto">` + bank.map((id) => C5.planetBankCard({ id, name: names[id] })).join('') + `</div>`;
      const fan = C5.orbitFan({ slots: d.slots, pitch: d.pitch, discD: d.discD, glyphH: d.glyphH, answers: M.PLANETS });
      const vars = `--es-bch:${lin(100, 124)};--es-gb:${lin(60, 76)};--es-fh:${lin(540, 570)};`;
      return { bodyHtml: root({ slots: d.slots, pitch: d.pitch, discD: d.discD, glyphH: d.glyphH }, `data-lcs-names="${esc(JSON.stringify(names))}"`, vars, cards + fan, lin(12, 22)),
        meta: { layout: L, bank } };
    }

    if (L === 'planet-sizes') {
      if (d.linesPerBin < 4) T(`linesPerBin ${d.linesPerBin} < 4`);
      if (!(d.glyphH >= 24)) T(`glyphH ${d.glyphH} < 24`);
      const ids = [...M.PLANETS, ...d.notPlanet];
      if (ids.length !== d.items) T(`items ${d.items} ≠ ${ids.length}`);
      const word = (id) => (M.PLANETS.includes(id) ? literal(block, 'planets', id, loc) : literal(block, 'notPlanet', id, loc));
      const cls = (id) => M.SIZE_CLASS[id];
      const labels = Object.fromEntries(d.bins.map((k) => [k, literal(block, 'classLabels', k, loc)]));
      let order = null;
      for (let t = 0; t < ORDER_TRIES && !order; t++) {
        const o = rng.shuffle(ids);
        const c = o.map(cls);
        if (c.some((x, i) => i >= 2 && x === c[i - 1] && x === c[i - 2])) continue;
        const np = o.map((id, i) => (cls(id) === 'notPlanet' ? i : -1)).filter((i) => i >= 0);
        if (np.length === 2 && (np[1] - np[0] === 1 || (np[0] === 0 && np[1] === o.length - 1))) continue;
        order = o;
      }
      if (!order) T('no bank order without a class run / the Sun and Moon together');
      if (P.bank) order = P.bank;
      const lines = P.lines || d.bins.map(() => d.linesPerBin);
      const bins = d.bins.map((k, i) => ({ key: k, label: labels[k], lines: lines[i] }));
      const binsHtml = C5.sizeBins({ bins, lines: d.linesPerBin, lineW: d.lineW, lineH: d.lineH, glyphH: d.glyphH });
      const bankHtml = C5.sizeBank({ items: order.map((id) => ({ id, word: word(id), cls: cls(id) })) });
      const vars = `--es-bp:${lin(6, 9)};--es-hg:${lin(56, 92)};--es-pb:${lin(10, 22)};`;
      return { bodyHtml: root({ items: d.items, bins: d.bins, linesPerBin: d.linesPerBin, glyphH: d.glyphH }, `data-lcs-words="${esc(JSON.stringify(Object.fromEntries(order.map((id) => [id, word(id)]))))}"`, vars, bankHtml + binsHtml, lin(12, 20)),
        meta: { layout: L, bank: order } };
    }
    return T('unknown layout');
  },

  /** verify() for a face: re-derives every answer from the stamps + the model (passed in), measures the floors,
   *  SPARSE (blank band between consecutive drawn blocks <= 40; a frame counts only by its edges) and the per-page tells. */
  async _verifyFace(page, layout) {
    return page.evaluate(({ ID, L, M, SPARSE_MAX }) => {
      const f = [];
      const root = document.querySelector(`[data-ws-content][data-lcs-type="${ID}"]`);
      if (!root) return ['no root'];
      let cfg; try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { return ['unreadable cfg stamp']; }
      if (cfg.layout !== L) f.push(`cfg.layout ${cfg.layout} ≠ ${L}`);
      const loc = root.dataset.lcsLocale;
      const hemi = loc === 'pt' ? 'S' : 'N';   // rule 7, independent of the bank's own stamp
      if (root.dataset.lcsHemi !== hemi) f.push(`hemisphere stamp ${root.dataset.lcsHemi} in ${loc} (want ${hemi})`);
      if (document.querySelector('.ws-page img')) f.push('an <img> on the page (no library picture on any face)');
      const R = (el) => el.getBoundingClientRect();
      const body = R(document.querySelector('.ws-body'));
      const foot = document.querySelector('.ws-foot') ? R(document.querySelector('.ws-foot')).top : Infinity;
      const SEL = {
        'moon-phases-in-order': 'svg[data-lcs-cue], svg[data-lcs-prim="moon-phase"], .ws-blankbox, .ws-answerbox',
        'moon-phase-names': '[data-lcs-bank-word], .es-psq, svg[data-lcs-prim="writing-row"]',
        'day-and-night-model': '[data-lcs-model], .es-pinbadge, .ws-achip',
        'planets-in-order': '[data-lcs-bank-card], svg[data-lcs-fan] svg[data-lcs-prim="orbit-disc"], svg[data-lcs-fan] svg[data-lcs-prim="writing-row"], svg[data-lcs-fan] [data-lcs-part="sun"], svg[data-lcs-fan] [data-lcs-part="ray"]',
        'planet-sizes': '[data-lcs-size-word], svg[data-lcs-size-glyph], [data-lcs-bin-label], svg[data-lcs-prim="writing-row"]',
      }[L];
      const blocks = [...root.querySelectorAll(SEL)].map(R).filter((r) => r.height > 0).map((r) => [r.top, r.bottom]);
      for (const fr of root.querySelectorAll('[data-lcs-frame]')) { const r = R(fr); blocks.push([r.top, r.top + 3], [r.bottom - 3, r.bottom]); }
      blocks.sort((a, b) => a[0] - b[0]);
      let band = 0, end = blocks.length ? blocks[0][1] : 0;
      for (const [t, b] of blocks.slice(1)) { if (t > end) band = Math.max(band, t - end); end = Math.max(end, b); }
      if (band > SPARSE_MAX) f.push(`SPARSE — ${band.toFixed(0)} px blank band between consecutive drawn blocks (> ${SPARSE_MAX})`);
      if (end > body.bottom + 0.6 || end > foot + 0.6) f.push(`the content runs ${(end - Math.min(body.bottom, foot)).toFixed(0)} px past the body / into the footer`);
      root.dataset.lcsContentBottom = String(end - body.top);
      const lit = (p) => (1 - Math.cos(p * Math.PI / 4)) / 2;
      const side = (p) => (p === 0 || p === 4 ? 'none' : ((p < 4) === (hemi === 'N') ? 'right' : 'left'));
      const moonCheck = (svg, tag) => {
        const p = +svg.dataset.lcsPhase;
        if (Math.abs(+svg.dataset.lcsLit - lit(p)) > 0.001) f.push(`${tag}: lit fraction stamp ${svg.dataset.lcsLit} ≠ ${lit(p).toFixed(4)} (±0.001) for phase ${p}`);
        if (svg.dataset.lcsLitside !== side(p)) f.push(`${tag}: lit side ${svg.dataset.lcsLitside} ≠ ${side(p)} for phase ${p} in hemisphere ${hemi}`);
        if (svg.dataset.lcsHemi !== hemi) f.push(`${tag}: drawn for hemisphere ${svg.dataset.lcsHemi} (want ${hemi})`);
      };
      const seqTell = (seq) => { const s = seq.join(), a = seq.slice().sort((x, y) => x - y); return s === a.join() || s === a.slice().reverse().join(); };

      if (L === 'moon-phases-in-order') {
        const rails = [...root.querySelectorAll('[data-lcs-rail]')];
        if (rails.length !== cfg.rails.length) f.push(`${rails.length} rails ≠ ${cfg.rails.length}`);
        const seqs = [];
        rails.forEach((rail, ri) => {
          const tag = `rail ${ri + 1}`;
          const cue = rail.dataset.lcsCue;
          if (cue !== cfg.rails[ri]) f.push(`${tag}: cue ${cue} ≠ ${cfg.rails[ri]}`);
          const cueSvg = rail.querySelector('svg[data-lcs-cue]');
          if (!cueSvg || cueSvg.dataset.lcsCue !== cue) f.push(`${tag}: the cue drawing does not show "${cue}"`);
          if (cueSvg && cueSvg.querySelector('[data-lcs-prim="moon-phase"], svg')) f.push(`${tag}: extreme printed — a moon inside the grow/shrink cue`);
          const slots = [...rail.querySelectorAll('.es-slot')];
          const moons = slots.map((s) => s.querySelector('svg[data-lcs-prim="moon-phase"]'));
          const boxes = slots.map((s) => s.querySelector('.ws-blankbox, .ws-answerbox'));
          if (slots.length !== 5) f.push(`${tag}: ${slots.length} slots ≠ 5`);
          const lits = moons.map((m) => lit(+m.dataset.lcsPhase));
          if (new Set(lits.map((x) => x.toFixed(4))).size !== lits.length) f.push(`${tag}: two moons with the same lit fraction (the order is not single-answer)`);
          const rank = lits.map((x) => lits.filter((y) => (cue === 'grow' ? y < x : y > x)).length + 1);
          const ans = [];
          moons.forEach((m, i) => {
            moonCheck(m, `${tag} slot ${i + 1}`);
            const w = R(m).width;
            if (w < cfg.d - 0.5) f.push(`${tag} slot ${i + 1}: moon ${w.toFixed(1)} px < ${cfg.d}`);
            const b = boxes[i];
            if (!b) { f.push(`${tag} slot ${i + 1}: no box`); return; }
            if (!b.classList.contains('ws-blankbox')) f.push(`${tag} slot ${i + 1}: the box is not a blankNumeralBox (data-lcs-answer="${b.getAttribute('data-lcs-answer')}")`);
            if (b.textContent.trim() || b.children.length) f.push(`${tag} slot ${i + 1}: the box is not empty (answer printed)`);
            const br = R(b);
            if (br.width < cfg.box[0] - 0.5 || br.height < cfg.box[1] - 0.5) f.push(`${tag} slot ${i + 1}: box ${br.width.toFixed(1)}×${br.height.toFixed(1)} < ${cfg.box.join('×')}`);
            if (+b.dataset.lcsAnswer !== rank[i]) f.push(`${tag} slot ${i + 1}: data-lcs-answer="${b.getAttribute('data-lcs-answer')}" ≠ the ${cue} rank ${rank[i]}`);
            ans.push(rank[i]);
          });
          if (seqTell(ans)) f.push(`${tag}: the answer sequence ${ans.join('')} is sorted / reversed (tell)`);
          seqs.push(ans.join());
        });
        if (new Set(seqs).size !== seqs.length) f.push('two rails share one answer sequence (tell)');
      }

      if (L === 'moon-phase-names') {
        let names; try { names = JSON.parse(root.dataset.lcsNames); } catch (e) { names = {}; }
        const cards = [...root.querySelectorAll('[data-lcs-card]')];
        const phases = cards.map((c) => +c.dataset.lcsPhase);
        const want = cfg.phases.slice().sort().join();
        if (phases.slice().sort().join() !== want) f.push(`card phases {${phases.slice().sort().join()}} ≠ the multiset {${want}}`);
        if (phases.some((p) => !M.NAMED_PHASES.includes(p))) f.push(`a card shows phase ${phases.find((p) => !M.NAMED_PHASES.includes(p))} — no school name fits exactly one such shape (multiset)`);
        phases.forEach((p, i) => { if (i && p === phases[i - 1]) f.push(`cards ${i} and ${i + 1} show the same phase (tell)`); if (i >= 2 && p === phases[i - 2]) f.push(`cards ${i - 1} and ${i + 1} (one above the other) show the same phase (tell)`); });
        cards.forEach((c, i) => {
          const m = c.querySelector('svg[data-lcs-prim="moon-phase"]');
          if (!m || +m.dataset.lcsPhase !== phases[i]) { f.push(`card ${i + 1}: the moon ≠ the card stamp`); return; }
          moonCheck(m, `card ${i + 1}`);
          if (R(m).width < cfg.d - 0.5) f.push(`card ${i + 1}: moon ${R(m).width.toFixed(1)} px < ${cfg.d}`);
          const lines = c.querySelectorAll('svg[data-lcs-prim="writing-row"]');
          if (lines.length !== 2) f.push(`card ${i + 1}: ${lines.length} writing lines ≠ 2`);
          for (const ln of lines) if (ln.querySelector('text')) f.push(`card ${i + 1}: a writing line is not empty`);
        });
        const bank = [...root.querySelectorAll('[data-lcs-bank-banner] [data-lcs-bank]')];
        if (bank.map((w) => +w.dataset.lcsBank).sort().join() !== M.NAMED_PHASES.join()) f.push(`bank ids ${bank.map((w) => w.dataset.lcsBank).join()} ≠ {0,2,4,6}`);
        for (const w of bank) if (w.textContent.trim() !== names[w.dataset.lcsBank]) f.push(`bank word "${w.textContent.trim()}" ≠ phaseNames[${w.dataset.lcsBank}] "${names[w.dataset.lcsBank]}"`);
        if (new Set(bank.map((w) => w.textContent.trim().toLocaleLowerCase(loc))).size !== bank.length) f.push('two bank words are the same');
        if (new Set(bank.map((w) => Math.round(R(w).top))).size > 1) f.push('the word bank wraps to 2 rows (one row budgeted)');
        const b4 = bank.map((w) => +w.dataset.lcsBank).join(), c4 = phases.slice(0, 4).join();
        if (b4 === c4 || bank.map((w) => +w.dataset.lcsBank).reverse().join() === c4) f.push('the bank order is the order of cards 1-4 (tell)');
      }

      if (L === 'day-and-night-model') {
        let words; try { words = JSON.parse(root.dataset.lcsWords); } catch (e) { words = {}; }
        const model = root.querySelector('[data-lcs-model]');
        const earthSvg = model && model.querySelector('svg[data-lcs-prim="earth-top"]');
        const sunSvg = model && model.querySelector('svg[data-lcs-prim="sun-edge"]');
        if (!earthSvg || !sunSvg) return [...f, 'no Earth / no Sun in the model'];
        if (+sunSvg.dataset.lcsR <= +earthSvg.dataset.lcsR) f.push(`the Sun (R ${sunSvg.dataset.lcsR}) is not drawn larger than the Earth (r ${earthSvg.dataset.lcsR})`);
        const er = R(earthSvg), sr = R(model.querySelector('[data-lcs-sun-wrap]'));
        const scale = er.width / +earthSvg.getAttribute('width');
        if (scale < 0.995) f.push(`the Earth is drawn at ${(scale * +earthSvg.dataset.lcsR).toFixed(1)} px radius < ${earthSvg.dataset.lcsR}`);
        const disc = earthSvg.querySelector('[data-lcs-part="disc"]');
        const dr = R(disc), ecx = dr.left + dr.width / 2, ecy = dr.top + dr.height / 2;
        const sunX = sr.left + sr.width / 2;
        const sunSide = sunX < ecx ? 'left' : 'right';
        if (sunSide !== model.dataset.lcsSundir) f.push(`the Sun is drawn on the ${sunSide}, stamped ${model.dataset.lcsSundir}`);
        if (earthSvg.querySelector('[data-lcs-part="night"]') || (disc.getAttribute('fill') || '').toUpperCase() !== '#FFFFFF') f.push('answer printed — a night half is shaded on the Earth');
        for (const el of earthSvg.querySelectorAll('[fill]')) { const c = (el.getAttribute('fill') || '').toUpperCase(); if (c === '#8A8276' || c === '#DDEBE8') f.push(`answer printed — an inkSoft / tealSoft fill on the Earth (${el.tagName})`); }
        const pins = [...earthSvg.querySelectorAll('g[data-lcs-pin]')].map((g) => { const c = R(g.querySelector('[data-lcs-part="pin"]')); return { n: +g.dataset.lcsN, angle: +g.dataset.lcsAngle, x: c.left + c.width / 2, y: c.top + c.height / 2 }; });
        if (pins.length !== cfg.pins) f.push(`${pins.length} pins ≠ ${cfg.pins}`);
        for (let i = 0; i < pins.length; i++) for (let j = i + 1; j < pins.length; j++) { const dd = Math.hypot(pins[i].x - pins[j].x, pins[i].y - pins[j].y); if (dd < 50) f.push(`pins ${pins[i].n} and ${pins[j].n} are ${dd.toFixed(1)} px apart (< 50)`); }
        const rows = [...root.querySelectorAll('[data-lcs-pinrow]')];
        if (rows.length !== pins.length) f.push(`${rows.length} table rows ≠ ${pins.length} pins`);
        const seq = [];
        rows.forEach((row, i) => {
          const n = +row.dataset.lcsPinrow;
          if (n !== i + 1) f.push(`table row ${i + 1} is pin ${n}`);
          const pin = pins.find((p) => p.n === n);
          if (!pin) { f.push(`table row ${n}: no such pin`); return; }
          // the answer from the DRAWING: the pin sits on the Sun's side of the Earth <=> day
          const towardSun = (pin.x - ecx) * (sunX - ecx) > 0;
          const measured = (sunSide === 'left' ? Math.atan2(pin.y - ecy, -(pin.x - ecx)) : Math.atan2(-(pin.y - ecy), pin.x - ecx)) * 180 / Math.PI;
          if (Math.abs(((measured - pin.angle + 540) % 360) - 180) > 5) f.push(`pin ${n}: drawn at ${measured.toFixed(1)}° from the Sun line, stamped ${pin.angle}° (±5°)`);
          const want = towardSun ? 'day' : 'night';
          if ((Math.abs(pin.angle) < 90 ? 'day' : 'night') !== want) f.push(`pin ${n}: the stamped angle ${pin.angle}° and the drawing disagree`);
          if (row.dataset.lcsAnswer !== want) f.push(`table row ${n}: data-lcs-answer ${row.dataset.lcsAnswer} ≠ ${want} (from the drawing)`);
          seq.push(want[0]);
          const chips = [...row.querySelectorAll('.ws-achip')];
          if (chips.map((c) => c.dataset.lcsChip).join() !== 'day,night') f.push(`table row ${n}: chips ${chips.map((c) => c.dataset.lcsChip).join()} (Day, Night in every row)`);
          for (const c of chips) {
            if (c.textContent.trim() !== words[c.dataset.lcsChip]) f.push(`table row ${n}: chip "${c.textContent.trim()}" ≠ "${words[c.dataset.lcsChip]}"`);
            if (c.dataset.lcsCorrect || c.querySelector('*')) f.push(`table row ${n}: a chip is marked (answer printed)`);
            if (R(c).height < 44 - 0.5) f.push(`table row ${n}: chip ${R(c).height.toFixed(1)} px high < 44`);
          }
        });
        const s = seq.join('');
        if (/^(d+n+|n+d+|(dn)+d?|(nd)+n?)$/.test(s)) f.push(`the answers by pin number read ${s} (tell)`);
        const h = Math.ceil(seq.length / 2);
        for (const part of [s.slice(0, h), s.slice(h)]) if (!/d/.test(part) || !/n/.test(part)) f.push(`a table column is all ${part[0] === 'd' ? 'day' : 'night'} (tell)`);
        if (s.split('d').length - 1 !== cfg.split[0]) f.push(`${s.split('d').length - 1} day pins ≠ ${cfg.split[0]}`);
      }

      if (L === 'planets-in-order') {
        let names; try { names = JSON.parse(root.dataset.lcsNames); } catch (e) { names = {}; }
        const fan = root.querySelector('svg[data-lcs-fan]');
        if (!fan) return [...f, 'no orbit fan'];
        const slots = [...fan.querySelectorAll('g[data-lcs-slot]')];
        const discs = [...fan.querySelectorAll('svg[data-lcs-prim="orbit-disc"]')];
        if (slots.length !== M.PLANETS.length || discs.length !== M.PLANETS.length) f.push(`${slots.length} slots / ${discs.length} discs ≠ 8`);
        slots.forEach((g, i) => { if (+g.dataset.lcsSlot !== i + 1) f.push(`slot ${i + 1} numbered ${g.dataset.lcsSlot}`); if (g.dataset.lcsAnswer !== M.PLANETS[i]) f.push(`slot ${i + 1}: data-lcs-answer ${g.dataset.lcsAnswer} ≠ ${M.PLANETS[i]} (the fixed order from the Sun)`); if (g.querySelector('text')) f.push(`slot ${i + 1}: the line is not empty`); });
        const norm = (s) => s.outerHTML.replace(/ x="[^"]*"/, '').replace(/ y="[^"]*"/, '').replace(/data-lcs-slot="\d+"/, '').replace(/>\d+<\/text>/, '></text>');
        if (discs.length && discs.some((dd) => norm(dd) !== norm(discs[0]))) f.push('slot discs not identical (only the numeral may differ)');
        if (fan.querySelector('[data-lcs-planet]')) f.push('a planet drawing inside the answer fan (it would print the order)');
        const fscale = R(fan).height / +fan.getAttribute('height');
        const dx = discs.map((dd) => { const r = R(dd); return { x: r.left + r.width / 2, w: +dd.getAttribute('width') * fscale }; });
        dx.forEach((q, i) => { if (q.w < cfg.discD - 0.5) f.push(`orbit disc ${i + 1}: ${q.w.toFixed(1)} px < ${cfg.discD}`); if (i && !(q.x > dx[i - 1].x)) f.push(`orbit disc ${i + 1} is not further right than disc ${i}`); });
        const lineRects = [...fan.querySelectorAll('svg[data-lcs-prim="writing-row"]')].map(R);
        for (const a of fan.querySelectorAll('path[data-lcs-orbit]')) { const ar = R(a); for (const lr of lineRects) { const ix = Math.min(ar.right, lr.right) - Math.max(ar.left, lr.left), iy = Math.min(ar.bottom, lr.bottom) - Math.max(ar.top, lr.top); if (ix > 0.5 && iy > 0.5) f.push(`orbit arc ${a.dataset.lcsOrbit} crosses a writing line`); } }
        if (cfg.glyphH * fscale < 24 - 0.1) f.push(`writing lines at glyphH ${(cfg.glyphH * fscale).toFixed(1)} < 24`);
        const cards = [...root.querySelectorAll('[data-lcs-bank-card]')];
        const ids = cards.map((c) => c.dataset.lcsBankCard);
        if (ids.slice().sort().join() !== M.PLANETS.slice().sort().join()) f.push(`bank cards {${ids.join()}} ≠ the 8 planets`);
        const gl = cards.map((c) => { const g = c.querySelector('svg[data-lcs-planet]'); return g ? { id: g.dataset.lcsPlanet, w: R(g).width } : null; });
        cards.forEach((c, i) => {
          if (!gl[i] || gl[i].id !== ids[i]) f.push(`bank card ${ids[i]}: its glyph is ${gl[i] && gl[i].id}`);
          const nm = c.querySelector('[data-lcs-bank-name]');
          if (!nm || nm.textContent !== names[ids[i]]) f.push(`bank card ${ids[i]}: name "${nm && nm.textContent}" ≠ "${names[ids[i]]}"`);
          else { if (parseFloat(getComputedStyle(nm).fontSize) < 16) f.push(`bank name ${nm.textContent} < 16 px`); if (nm.scrollWidth > nm.clientWidth + 0.5) f.push(`bank name "${nm.textContent}" is clipped (${nm.scrollWidth} > ${nm.clientWidth})`); }
          if (/pluto|plutón|plutão|pluton|plutone|pluuto/i.test(c.textContent)) f.push('Pluto on the page');
        });
        if (gl.filter(Boolean).some((g) => Math.abs(g.w - gl[0].w) > 0.5)) f.push('bank glyphs at different sizes (a size would print the rocky / giant split)');
        const j = ids.join();
        if (j === M.PLANETS.join() || j === M.PLANETS.slice().reverse().join()) f.push('the bank order is the answer order / its reverse (tell)');
        const alpha = ids.slice().sort((a, b) => names[a].localeCompare(names[b], loc)).join();
        if (j === alpha) f.push('the bank order is alphabetical in this locale (tell)');
        for (const [l2, o] of Object.entries(M.PLANET_ALPHA)) if (o.join() === j) f.push(`the bank order is the ${l2} alphabetical order (tell)`);
      }

      if (L === 'planet-sizes') {
        let words; try { words = JSON.parse(root.dataset.lcsWords); } catch (e) { words = {}; }
        const bank = [...root.querySelectorAll('[data-lcs-size-word]')];
        if (bank.length !== cfg.items) f.push(`${bank.length} bank words ≠ ${cfg.items}`);
        const cls = bank.map((w) => M.SIZE_CLASS[w.dataset.lcsSizeWord]);
        bank.forEach((w, i) => { if (w.dataset.lcsClass !== cls[i]) f.push(`bank word ${w.dataset.lcsSizeWord}: stamped ${w.dataset.lcsClass} ≠ ${cls[i]} (SIZE_CLASS)`); if (w.textContent.trim() !== words[w.dataset.lcsSizeWord]) f.push(`bank word "${w.textContent.trim()}" ≠ "${words[w.dataset.lcsSizeWord]}"`); });
        const cnt = { giant: 0, rocky: 0, notPlanet: 0 }; cls.forEach((c) => { cnt[c]++; });
        if (`${cnt.giant}/${cnt.rocky}/${cnt.notPlanet}` !== '4/4/2') f.push(`class counts ${cnt.giant}/${cnt.rocky}/${cnt.notPlanet} ≠ 4/4/2`);
        for (let i = 2; i < cls.length; i++) if (cls[i] === cls[i - 1] && cls[i] === cls[i - 2]) { f.push(`three ${cls[i]} names in a row in the bank (tell)`); break; }
        const np = cls.map((c, i) => (c === 'notPlanet' ? i : -1)).filter((i) => i >= 0);
        if (np.length === 2 && (np[1] - np[0] === 1 || (np[0] === 0 && np[1] === cls.length - 1))) f.push('the Sun and the Moon sit together in the bank (tell)');
        const bins = [...root.querySelectorAll('[data-lcs-bin]')];
        if (bins.map((b) => b.dataset.lcsBin).join() !== cfg.bins.join()) f.push(`bins ${bins.map((b) => b.dataset.lcsBin).join()} ≠ ${cfg.bins.join()}`);
        const lineCounts = bins.map((b) => b.querySelectorAll('svg[data-lcs-prim="writing-row"]').length);
        if (new Set(lineCounts).size !== 1 || lineCounts[0] !== cfg.linesPerBin) f.push(`count printed — bins carry ${lineCounts.join('/')} lines (want ${cfg.linesPerBin} in EVERY bin)`);
        for (const ln of root.querySelectorAll('svg[data-lcs-prim="writing-row"]')) if (ln.querySelector('text')) f.push('a bin line is not empty');
        for (const b of bins) {
          const g = b.querySelector('svg[data-lcs-size-glyph]');
          if (!g || g.dataset.lcsSizeGlyph !== b.dataset.lcsBin) f.push(`bin ${b.dataset.lcsBin}: header glyph ${g && g.dataset.lcsSizeGlyph}`);
          if (g && g.querySelector('[data-lcs-part="ring"], [data-lcs-part="band"]')) f.push(`bin ${b.dataset.lcsBin}: a planet ring / band in the header`);
          const lab = b.querySelector('[data-lcs-bin-label]');
          if (lab && Math.round(R(lab).height / parseFloat(getComputedStyle(lab).lineHeight)) > 2) f.push(`bin ${b.dataset.lcsBin}: the label runs past 2 lines`);
        }
        if (root.querySelector('[data-lcs-planet]')) f.push('a planet drawing on the size face (a drawn size IS the answer)');
        if (/\p{Nd}/u.test(root.textContent)) f.push('a number on the size face (no size data is printed)');
      }
      return f;
    }, { ID, L: layout, M: { NAMED_PHASES: M.NAMED_PHASES, PLANETS: M.PLANETS, SIZE_CLASS: M.SIZE_CLASS, PLANET_ALPHA: M.PLANET_ALPHA }, SPARSE_MAX });
  },

  async verify(page) {
    const layout = await page.evaluate((id) => { const r = document.querySelector(`[data-ws-content][data-lcs-type="${id}"]`); return r ? r.getAttribute('data-lcs-layout') : null; }, ID);
    if (layout) return this._verifyFace(page, layout);
    return page.evaluate(({ ID, FACTS, BODIES }) => {
      const f = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) return ['no root'];
      let cfg, facts, names;
      try { cfg = JSON.parse(root.dataset.lcsCfg); facts = JSON.parse(root.dataset.lcsFacts); names = JSON.parse(root.dataset.lcsNames); } catch (e) { return ['unreadable cfg / facts / names stamp']; }
      if (document.querySelector('.ws-page img')) f.push('an <img> on the page (no library picture on any face)');
      if (root.querySelector('[data-lcs-layout]') || root.hasAttribute('data-lcs-layout')) f.push('the base carries data-lcs-layout');
      // heads
      const heads = [...root.querySelectorAll('[data-lcs-head]')];
      const hb = heads.map((h) => h.dataset.lcsHead);
      if (hb.join(',') !== BODIES.join(',')) f.push(`heads ${hb.join(',')} ≠ sun,earth,moon`);
      const dia = heads.map((h) => { const c = h.querySelector('[data-lcs-part="disc"]'); return c ? c.getBoundingClientRect().width : 0; });
      if (!(dia[0] > dia[1] && dia[1] > dia[2] && dia[2] > 0)) f.push(`head discs ${dia.map((x) => x.toFixed(1)).join(' / ')} px are not strictly decreasing (Sun > Earth > Moon)`);
      heads.forEach((h, i) => {
        const pill = h.querySelector('[data-lcs-pill]');
        if (!pill) { f.push(`head ${hb[i]}: no name pill`); return; }
        if (pill.textContent !== names[hb[i]]) f.push(`head ${hb[i]}: pill "${pill.textContent}" ≠ "${names[hb[i]]}"`);
        const r = pill.getBoundingClientRect();
        if (pill.scrollWidth > pill.clientWidth + 0.5 || r.width > cfg.col + 0.5) f.push(`head ${hb[i]}: pill "${pill.textContent}" clipped or wider than ${cfg.col}`);
        for (const w of Object.values(facts)) if (pill.textContent.trim() && w === pill.textContent) f.push(`head ${hb[i]} prints a fact`);
      });
      // rows
      const rows = [...root.querySelectorAll('[data-lcs-row]')];
      if (rows.length !== cfg.rows) f.push(`${rows.length} rows ≠ ${cfg.rows}`);
      const seq = [];
      rows.forEach((row, i) => {
        const tag = `row ${i + 1}`;
        const id = row.dataset.lcsFact;
        if (+row.dataset.lcsRow !== i + 1) f.push(`${tag}: numbered ${row.dataset.lcsRow}`);
        const fx = FACTS[id];
        if (!fx) { f.push(`${tag}: unknown fact "${id}"`); return; }
        const ones = fx.truth.filter((x) => x === 1).length;
        if (ones !== 1) f.push(`${tag}: fact ${id} is true of ${ones} bodies (exactly 1)`);
        const body = BODIES[fx.truth.indexOf(1)];
        seq.push(body);
        if (row.dataset.lcsBody !== body) f.push(`${tag}: stamped body ${row.dataset.lcsBody} ≠ ${body} (from the truth vector)`);
        if (fx.size && !cfg.sizeFacts) f.push(`${tag}: size fact ${id} with sizeFacts off`);
        const p = row.querySelector('[data-lcs-fact-text]');
        if (!p || p.textContent !== facts[id]) f.push(`${tag}: fact text "${p && p.textContent}" ≠ the literal "${facts[id]}"`);
        if (p) {
          const cs = getComputedStyle(p);
          const lines = Math.round(p.getBoundingClientRect().height / parseFloat(cs.lineHeight));
          if (lines > 2) f.push(`${tag}: the fact runs to ${lines} lines (max 2)`);
          if (parseFloat(cs.fontSize) < cfg.factPx - 0.01) f.push(`${tag}: fact text ${cs.fontSize} < ${cfg.factPx}`);
          const rr = row.getBoundingClientRect(), pr = p.getBoundingClientRect();
          if (pr.top < rr.top - 0.5 || pr.bottom > rr.bottom + 0.5) f.push(`${tag}: the fact leaves its row`);
        }
        const ticks = [...row.querySelectorAll('[data-lcs-tick]')];
        if (ticks.map((t) => t.dataset.lcsTick).join(',') !== BODIES.join(',')) f.push(`${tag}: ticks ${ticks.map((t) => t.dataset.lcsTick).join(',')}`);
        for (const t of ticks) {
          const r = t.getBoundingClientRect();
          if (t.textContent.trim() || t.children.length || t.dataset.lcsAnswer) f.push(`${tag}: tick box ${t.dataset.lcsTick} is not empty`);
          if (r.width < Math.max(44, cfg.tick) - 0.5 || r.height < Math.max(44, cfg.tick) - 0.5) f.push(`${tag}: tick box ${r.width.toFixed(1)}×${r.height.toFixed(1)} < ${cfg.tick}`);
        }
      });
      // the page's body sequence
      const cnt = Object.fromEntries(BODIES.map((b) => [b, seq.filter((x) => x === b).length]));
      const lo = Math.min(...cfg.counts), hi = Math.max(...cfg.counts);
      for (const b of BODIES) if (cnt[b] < lo || cnt[b] > hi) f.push(`the ${b} column holds ${cnt[b]} answers (want ${lo}..${hi})`);
      if ([...cfg.counts].sort().join() !== BODIES.map((b) => cnt[b]).sort().join()) f.push(`counts ${JSON.stringify(cnt)} are not a permutation of ${cfg.counts}`);
      if (seq[0] === 'sun') f.push('row 1 is a Sun fact (tell)');
      for (let i = 2; i < seq.length; i++) if (seq[i] === seq[i - 1] && seq[i] === seq[i - 2]) { f.push(`rows ${i - 1}-${i + 1} are three ${seq[i]} facts in a run (tell)`); break; }
      for (const p of [2, 3]) if (seq.length > p && seq.every((b, i) => i + p >= seq.length || b === seq[i + p])) f.push(`the answer column pattern is periodic (period ${p}) (tell)`);
      const facted = new Set(rows.map((r) => r.dataset.lcsFact));
      if (facted.size !== rows.length) f.push('a fact repeats');
      return f;
    }, { ID, FACTS: M.FACTS, BODIES });
  },
};
