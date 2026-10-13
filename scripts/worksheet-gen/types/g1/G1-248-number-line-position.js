/**
 * G1-248 — Where on the Number Line? (nt20-B; `number-lines` REUSE, G1,
 * 1.NBT.A.1 — Zahlenstrahl beschriften / droite graduée / getallenlijn).
 * A number line with only landmark labels (0, 5, 10, 15, 20). Coral arrows
 * point at unlabelled ticks, each with an empty dashed box above: what
 * number lives here? Position given → numeral wanted (the inverse of
 * G1-138). d1 0-10, 3 lines × 2 · d2 0-20, 4 × 3 · d3 0-100 by 5s, 4 × 3.
 *
 * Level Set 2026-10-13 (Number Lines, PDF + interactive + key):
 *  - every face (this base and its eleven variations G1-274…281, G1-295, G2-305, G2-310) gets its levels from
 *    pointerLevels(published config): level 1 = two arrows a line, each one or two ticks after a printed number (count
 *    on a little); level 3 = one arrow more a line, every arrow at least two ticks from any printed number (count on
 *    further, or back from the next one). The printed numbers and the range never change — the faces' titles and
 *    instructions name them ("0 to 50", "every tenth number is printed", "each tick is five").
 *  - ⚠ the published picker spaced arrows in TICKS only: on a 0-50 or a 60-100 line three ticks are ~35 px and two
 *    52-px answer boxes overlapped (live G1-277, G2-310 …). Arrows are now also at least MIN_PX apart; a published page
 *    whose arrows were already apart draws exactly as before.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const numberLine = require('../../primitives/number-line.js');
const NLS = require('../../lib/number-lines-screen.js');
const NCS = require('../../lib/number-charts-screen.js');

const LINE_W = 560;
const MIN_PX = 60;   // answer boxes are 52 px wide

/** the levels of a face from its published config (variation files call this; ⚠ tools/gen-var-specs.js would flatten them) */
function pointerLevels(D, opts) {
  // opts.l3Label: level 3 prints fewer numbers (only where no locale's instruction names them — G1-274 / G1-280)
  const D3 = opts && opts.l3Label ? { ...D, label: opts.l3Label } : D;
  const n = unlabelled(D3).length;
  // level 3: one arrow more a line; when the page has too few unprinted ticks for that (no number may repeat), one
  // line fewer (never fewer than three)
  let p3 = D3.pointers + 1, l3 = D3.lines;
  if (l3 * p3 > n) l3 = Math.max(3, Math.floor(n / p3));
  if (l3 * p3 > n) { p3 = D.pointers; l3 = D.lines; }
  // every other tick printed (counting in fives to 100): every arrow is already next to a printed number, so level 1
  // keeps the arrows on the smaller numbers — the first unprinted ticks, enough for two a line on three lines
  let L1;
  if (D.label <= 2) {
    const first = unlabelled(D).slice(0, 6);
    L1 = { ...D, v2: true, pointers: 2, lines: 3, upTo: first[first.length - 1], gap: Math.max(2, D.gap) };
  } else L1 = { ...D, v2: true, pointers: 2, near: true, gap: Math.max(2, D.gap) };
  return { 1: L1, 2: D, 3: { ...D3, v2: true, pointers: p3, lines: l3, far: true, gap: 2 } };
}

const tickPx = (d) => LINE_W / ((d.max - (d.min || 0)) / d.tick);
/** values on unlabelled ticks (never the ends) — the same test tickRow uses to print a label */
function unlabelled(d) {
  const lo = d.min || 0, out = [];
  for (let v = lo; v <= d.max; v += d.tick) if (((v - lo) / d.tick) % d.label !== 0 && v !== lo && v !== d.max) out.push(v);
  return out;
}
function labels(d) {
  const lo = d.min || 0, out = [];
  for (let v = lo; v <= d.max; v += d.tick) if (((v - lo) / d.tick) % d.label === 0) out.push(v);
  return out;
}
/** ticks from the printed number before v / to the one after */
function distances(d, v) {
  const lo = d.min || 0, k = (v - lo) / d.tick, r = k % d.label;
  return { after: r, before: d.label - r };
}

module.exports = {
  id: 'G1-248',
  slug: 'where-on-the-number-line',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'number-lines',
  themeAxis: { applicable: false },
  difficulty: {
    1: { lines: 3, max: 10, tick: 1, label: 5, pointers: 2, gap: 2, v2: true, near: true },
    2: { lines: 4, max: 20, tick: 1, label: 5, pointers: 3, gap: 3 },
    3: { lines: 4, max: 20, tick: 1, label: 5, pointers: 3, gap: 2, v2: true, far: true },
  },
  i18n: {
    en: {
      title: 'Where on the Number Line?',
      instruction: 'Each arrow points to a tick mark. Count on from the number before it and write the number in the box.',
    },
  },
  // the configs published before the Level Set (variations G1-274 / G1-279 / G1-280 / G1-281 were built from d1 / d3)
  legacy: {
    1: { lines: 3, max: 10, tick: 1, label: 5, pointers: 2, gap: 2 },
    2: { lines: 4, max: 20, tick: 1, label: 5, pointers: 3, gap: 3 },
    3: { lines: 4, max: 100, tick: 5, label: 2, pointers: 2, gap: 3 },
  },
  interactive: NLS.interactiveFor('ptr'),
  levelSetWords(m) { return (m.asks || []).map(String); },
  pointerLevels,

  build(args, ctx) {
    const d = this.difficulty[args.difficulty];
    const lines = d.v2 ? this._linesV2(d, ctx.rng) : this._linesLegacy(d, ctx.rng);
    const cards = lines.map((r) => `<div class="ws-card-stage">${numberLine({ ...r.line, pointers: r.pointers.map((value) => ({ value, show: !!(ctx && ctx.answerKey && !ctx.interactive) })) }).svg}</div>`);
    const b = { bodyHtml: cardGrid({ cards, cols: 1, rows: d.lines }), meta: { asks: lines.map((r) => r.pointers.join('.')) } };   // a copy = its lines (a 0-20 line has only 16 unprinted ticks: single numbers always repeat)
    if (ctx && ctx.interactive) {
      const loc = (args.locale || 'en').slice(0, 2);
      const salt = NCS.saltOf({ ...ctx, locale: loc }, lines.map((r) => ({ q: r.pointers.join('.') })));
      return { bodyHtml: NLS.screen('pointer', lines, salt), meta: b.meta };
    }
    return b;
  },

  /** the published draw — the original rng calls; a draw whose boxes would overlap is drawn again */
  _linesLegacy(d, rng) {
    const usedPage = new Set();
    const out = [];
    const px = tickPx(d);
    for (let i = 0; i < d.lines; i++) {
      // `min` comes from the CONFIG so a line can start somewhere other than zero.
      // ⚠ THE LABEL TEST MUST BE RELATIVE TO min (tickRow prints a label when Math.round((v - min) / tickStep) % labelEvery === 0).
      const lo = d.min || 0;
      const ticks = unlabelled(d);
      let picks = null, guard = 0;
      while (!picks && guard++ < 200) {
        const fresh = ticks.filter((v) => !usedPage.has(v));
        const cand = rng.sample(fresh.length >= d.pointers * 2 ? fresh : ticks, d.pointers).sort((a, b) => a - b);
        if (cand.length < d.pointers) break;
        if (cand.some((v, k) => k && (v - cand[k - 1]) / d.tick < d.gap)) continue;
        if (cand.some((v, k) => k && ((v - cand[k - 1]) / d.tick) * px < MIN_PX)) continue;   // 2026-10-13: boxes never overlap
        picks = cand;
      }
      if (!picks) throw new Error('G1-248: cannot place pointers');
      picks.forEach((v) => usedPage.add(v));
      out.push({ pointers: picks, labels: labels(d), line: { min: lo, max: d.max, tickStep: d.tick, labelEvery: d.label, width: LINE_W } });
    }
    return out;
  },

  /** levels 1 and 3: near (one or two ticks after a printed number) / far (two ticks or more from any printed number) */
  _linesV2(d, rng) {
    const usedPage = new Set();
    const out = [];
    const px = tickPx(d);
    const lo = d.min || 0;
    const all = unlabelled(d);
    const fits = (v) => {
      const { after, before } = distances(d, v);
      if (d.upTo !== undefined && v > d.upTo) return false;
      if (d.near) return after <= 2;
      if (d.far) return after >= 2 && before >= 2;
      return true;
    };
    const ok = (set) => set.every((v, k) => !k || ((v - set[k - 1]) / d.tick >= d.gap && ((v - set[k - 1]) / d.tick) * px >= MIN_PX));
    for (let i = 0; i < d.lines; i++) {
      let picks = null;
      // the level's own rule first; then fewer arrows (never below two); then any unlabelled tick — the page never
      // repeats a number
      const tries = [];
      for (let n = d.pointers; n >= 2; n--) tries.push({ n, rule: true });
      for (let n = d.pointers; n >= 2; n--) tries.push({ n, rule: false });
      for (const t of tries) {
        const pool = all.filter((v) => !usedPage.has(v) && (!t.rule || fits(v)));
        if (pool.length < t.n) continue;
        for (let g = 0; g < 300 && !picks; g++) {
          const cand = rng.sample(pool, t.n).sort((a, b) => a - b);
          if (ok(cand)) picks = cand;
        }
        if (picks) break;
      }
      if (!picks) throw new Error(`${this.id}: cannot place arrows on line ${i + 1}`);
      picks.forEach((v) => usedPage.add(v));
      out.push({ pointers: picks, labels: labels(d), line: { min: lo, max: d.max, tickStep: d.tick, labelEvery: d.label, width: LINE_W } });
    }
    return out;
  },

  async verify(page) {
    return page.evaluate((minPx) => {
      const fails = [];
      const lines = [...document.querySelectorAll('[data-lcs-prim="number-line"]')];
      if (lines.length < 3) fails.push(`only ${lines.length} lines`);
      const all = new Set();
      lines.forEach((l, i) => {
        const labels = new Set([...l.querySelectorAll('[data-lcs-ticklabel]')].map((t) => +t.dataset.lcsTicklabel));
        const ticks = [...l.querySelectorAll('[data-lcs-tick]')];
        if (labels.size >= ticks.length) fails.push(`line ${i + 1}: every tick labelled (answers printed)`);
        const ptrs = [...l.querySelectorAll('rect[data-lcs-pointer]')];
        if (ptrs.length < 2) fails.push(`line ${i + 1}: ${ptrs.length} pointers`);
        const vals = ptrs.map((p) => +p.dataset.lcsPointer).sort((a, b) => a - b);
        ptrs.forEach((p) => {
          const v = +p.dataset.lcsPointer;
          if (labels.has(v)) fails.push(`line ${i + 1}: pointer ${v} is a printed label`);
          if (+p.dataset.lcsAnswer !== v) fails.push(`line ${i + 1}: answer stamp != pointer`);
          if (all.has(v)) fails.push(`line ${i + 1}: value ${v} repeated on the page`);
          all.add(v);
          const tick = l.querySelector(`[data-lcs-tick="${v}"]`);
          const arrow = l.querySelector(`[data-lcs-pointer-arrow="${v}"]`);
          if (!tick || !arrow) { fails.push(`line ${i + 1}: pointer ${v} has no tick/arrow`); return; }
          if (Math.abs(+tick.getAttribute('x1') - +arrow.getAttribute('x1')) > 1) fails.push(`line ${i + 1}: arrow ${v} misses its tick`);
        });
        const step = ticks.length > 1 ? Math.abs(+ticks[1].dataset.lcsTick - +ticks[0].dataset.lcsTick) : 1;
        vals.forEach((v, k) => { if (k && (v - vals[k - 1]) / step < 2) fails.push(`line ${i + 1}: pointers too close`); });
        // two answer boxes never overlap (2026-10-13: live 0-50 and 60-100 pages had two boxes on top of each other)
        const boxes = ptrs.map((p) => ({ x: +p.getAttribute('x'), w: +p.getAttribute('width') })).sort((a, b) => a.x - b.x);
        boxes.forEach((b, k) => { if (k && b.x - (boxes[k - 1].x + boxes[k - 1].w) < minPx - 52) fails.push(`line ${i + 1}: answer boxes ${k} and ${k + 1} overlap or touch`); });
      });
      return fails;
    }, MIN_PX);
  },
};
