/**
 * Factory for number-neighbor tables (before/after, between, N more/N less):
 * rows of [blank][given][blank] (or given+blank pairs) in big friendly boxes.
 * mode: 'before-after' | 'between' | 'more-less'(delta)
 *
 * Level Set 2026-10-13 (Number Charts, PDF + interactive + key): levels 1 and 3 come from NEIGHBOR_LEVELS[id] ('v2'
 * configs: rows, pool = the numbers a row may be built on, must = numbers of which `mustN` always appear — the edges a
 * harder page is about, crossing ten, ninety-nine to a hundred…). Level 2 is the published config, drawn by the legacy
 * code below, untouched.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const NCS = require('../../lib/number-charts-screen.js');

const GIVEN = (v) => `<span class="ws-pattern-slot" style="width:84px;height:64px;font-family:'Baloo 2';font-weight:700;font-size:28px;color:#3A3530;background:#DDEBE8;border-color:#146B5E" data-lcs-given="${v}">${v}</span>`;
const BLANK = (ans) => `<span class="ws-answerbox" style="width:84px;height:64px" data-lcs-answer="${ans}"></span>`;
const ARROW = (label) => `<span style="display:inline-flex;flex-direction:column;align-items:center;font-family:'Nunito';font-weight:800;font-size:13px;color:#8A8276">` +
  `<span style="font-family:'Baloo 2';font-weight:700;font-size:20px;color:#F2784B">${label}</span></span>`;

const range = (a, b, st) => { const o = []; for (let v = a; v <= b; v += st || 1) o.push(v); return o; };
const v2 = (o) => ({ v2: true, ...o });
/** the numbers a row is BUILT on (the given number; for 'between' the missing middle one) */
const NEIGHBOR_LEVELS = {
  'K-021': { 1: v2({ rows: 5, pool: range(1, 9) }), 3: v2({ rows: 8, pool: range(2, 19), must: [9, 10, 11, 19], mustN: 3 }) },
  'K-022': { 1: v2({ rows: 5, pool: range(1, 9) }), 3: v2({ rows: 8, pool: range(2, 19), must: [9, 10, 11, 19], mustN: 3 }) },
  'G1-131': {
    1: v2({ rows: 5, pool: range(1, 9) }),
    // the decade edges: one less than 40 is 39, one more than 99 is 100 (counting to 120, 1.NBT.A.1)
    3: v2({ rows: 8, pool: [10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99, 100, 101, 109, 110, 119] }),
  },
  'G1-132': {
    // the published level 1 (numbers up to 10) left 10 less below zero — decades instead
    1: v2({ rows: 5, pool: range(10, 90, 10) }),
    3: v2({ rows: 8, pool: range(91, 110) }),
  },
  'G2-226': {
    1: v2({ rows: 6, pool: range(110, 890, 10) }),
    // a zero in the tens (103, 607), or a hundred less that leaves a two-digit number (100 less than 145 is 45)
    3: v2({ rows: 8, pool: range(100, 899).filter((v) => v % 100 < 10 || v < 200) }),
  },
};

function makeNeighborsType(cfg) {
  const { id, slug, mode, delta, rangeMax, gradeBand, i18n } = cfg;
  const legacy = cfg.difficulty || {
    1: { rows: 6, max: Math.min(10, rangeMax) },
    2: { rows: 6, max: rangeMax },
    3: { rows: 8, max: rangeMax },
  };
  const LV = NEIGHBOR_LEVELS[id];
  const rowOf = (v) => {
    if (mode === 'before-after') return BLANK(v - 1) + GIVEN(v) + BLANK(v + 1);
    if (mode === 'between') return GIVEN(v - 1) + BLANK(v) + GIVEN(v + 1);
    return BLANK(v - delta) + ARROW('−' + delta) + GIVEN(v) + ARROW('+' + delta) + BLANK(v + delta);   // more-less
  };
  const stage = (row) => `<div class="ws-card-stage" style="justify-content:center;gap:16px" data-lcs-mode="${mode}" data-lcs-delta="${delta || 1}">${row}</div>`;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'K',
    assetClass: 'numeral-charts',
    exerciseType: 'number-charts',
    themeAxis: { applicable: false },
    difficulty: LV ? { 1: LV[1], 2: legacy[2], 3: LV[3] } : legacy,
    i18n,
    interactive: NCS.interactiveFor('choice', 'fill'),
    levelSetWords(m) { return (m.asks || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const vals = d.v2 ? this._valsV2(ctx.rng, d) : this._valsLegacy(ctx.rng, d);
      const cards = vals.map((v) => stage(rowOf(v)));
      // level 1 / 3 pages keep one column (a two-column more/less row is wider than its card)
      const cols = d.v2 ? 1 : (d.rows > 6 ? 2 : 1);
      const b = { bodyHtml: cardGrid({ cards, cols, rows: Math.ceil(d.rows / cols), numbered: false }), meta: { asks: vals.map(String) } };
      if (ctx && (ctx.interactive || ctx.answerKey)) return this._screenOrKey(b, vals, args, ctx);
      return b;
    },

    /** the published draw (level 2) — unchanged */
    _valsLegacy(rng, d) {
      const out = [];
      const used = new Set();
      for (let i = 0; i < d.rows; i++) {
        let v;
        let guard = 0;
        const lo = mode === 'more-less' ? delta : 1;
        const hi = mode === 'more-less' ? d.max - delta : d.max - 1;
        do { v = rng.int(lo, hi); guard++; } while (used.has(v) && guard < 50);
        used.add(v);
        out.push(v);
      }
      return out;
    },

    _valsV2(rng, d) {
      const must = d.must ? rng.sample(d.must, d.mustN || d.must.length) : [];
      const rest = rng.sample(d.pool.filter((v) => !must.includes(v)), d.rows - must.length);
      if (must.length + rest.length !== d.rows) throw new Error(`${id} level: the pool holds ${d.pool.length} numbers for ${d.rows} rows`);
      return rng.shuffle(must.concat(rest));
    },

    _screenOrKey(b, vals, args, ctx) {
      if (!ctx.interactive) return { bodyHtml: NCS.keyFill(b.bodyHtml).html, meta: b.meta };
      const C = NCS.cellBox, W = 96;
      const qs = [];
      for (const v of vals) {
        if (mode === 'before-after') {
          for (const dir of [-1, 1]) {
            const ans = v + dir;
            const prompt = NCS.line([dir < 0 ? C(0, W, 'ask') : C(0, W, 'empty'), C(v, W, 'given'), dir > 0 ? C(0, W, 'ask') : C(0, W, 'empty')].join(''), 18);
            // the slips: the OTHER neighbour, the given number copied, two away
            qs.push({ q: `nbr:${v}:1:${dir}`, prompt, ans, slips: [v - dir, v, ans + dir], lo: 0 });
          }
        } else if (mode === 'between') {
          const prompt = NCS.line([C(v - 1, W, 'given'), C(0, W, 'ask'), C(v + 1, W, 'given')].join(''), 18);
          qs.push({ q: `nbr:${v - 1}:1:1`, prompt, ans: v, slips: [v - 1, v + 1, v + 2, v - 2], lo: 0 });
        } else {
          for (const dir of [-1, 1]) {
            const ans = v + dir * delta;
            const prompt = NCS.line([dir < 0 ? C(0, W, 'ask') : C(0, W, 'empty'), NCS.op('−' + delta), C(v, W, 'given'), NCS.op('+' + delta), dir > 0 ? C(0, W, 'ask') : C(0, W, 'empty')].join(''), 12);
            // the slips: the other direction, the wrong place (1 for 10, 10 for 100), the given copied
            const small = delta === 1 ? 10 : delta / 10;
            qs.push({ q: `nbr:${v}:${delta}:${dir}`, prompt, ans, slips: [v - dir * delta, ans + small, ans - small, v], lo: 0 });
          }
        }
      }
      const loc = (args.locale || 'en').slice(0, 2);
      return { bodyHtml: NCS.choiceScreen(qs, NCS.saltOf({ ...ctx, locale: loc }, qs)), meta: b.meta };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        document.querySelectorAll('[data-lcs-mode]').forEach((stage, i) => {
          const delta = parseInt(stage.dataset.lcsDelta, 10);
          const seq = [...stage.querySelectorAll('[data-lcs-given],[data-lcs-answer]')].map((el) =>
            parseInt(el.dataset.lcsGiven !== undefined ? el.dataset.lcsGiven : el.dataset.lcsAnswer, 10));
          for (let k = 1; k < seq.length; k++) {
            if (seq[k] - seq[k - 1] !== delta) fails.push(`row ${i + 1}: ${seq[k - 1]}→${seq[k]} != +${delta}`);
          }
          if (seq.some((v) => v < 0)) fails.push(`row ${i + 1}: negative value`);
          if (!stage.querySelector('[data-lcs-given]')) fails.push(`row ${i + 1}: no anchor`);
        });
        return fails;
      });
    },
  };
}

module.exports = { makeNeighborsType, NEIGHBOR_LEVELS };
