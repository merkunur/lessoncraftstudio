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
      throw new Error(`${ID}: layout "${d.layout}" is a face (Phase E) — the base composer refuses a face config rather than read it`);
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

  async verify(page) {
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
