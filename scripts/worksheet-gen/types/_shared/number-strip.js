/**
 * Factory for number-sequence strips (count forward/backward, skip counting):
 * rows of numeral boxes with blanks the child fills. Direction and step are
 * per-type; sequences and blank positions vary per row via the seed.
 *
 * Level Set 2026-10-13 (Number Charts, PDF + interactive + key): levels 1 and 3 of every face come from
 * STRIP_LEVELS[id] ('v2' configs); level 2 is the published config, drawn by the legacy code below, untouched.
 *   rows · blanks · isolated (no two blanks side by side) · adjacent (at least one pair side by side)
 *   steps [..] (each row its own rule; rows rotate through them) · start 'multiple' (on the step) | 'off' (off it) |
 *   'any' · startMin / startMax (the strip's first number) · rangeMax (the largest number on the page)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const NCS = require('../../lib/number-charts-screen.js');

const v2 = (o) => ({ v2: true, ...o });
/** the levels of each face (level 2 = the published config, never here) */
const STRIP_LEVELS = {
  'K-019': { 1: v2({ rows: 4, blanks: 2, isolated: true }), 3: v2({ rows: 5, blanks: 4, adjacent: true }) },
  'K-020': {
    1: v2({ rows: 4, blanks: 2, isolated: true, start: 'any', startMin: 1, startMax: 8 }),
    3: v2({ rows: 5, blanks: 4, adjacent: true, start: 'any', startMin: 5, startMax: 11 }),
  },
  'K-023': { 1: v2({ rows: 4, blanks: 2, isolated: true }), 3: v2({ rows: 5, blanks: 4, adjacent: true }) },
  'G1-123': {
    1: v2({ rows: 4, blanks: 2, isolated: true, start: 'multiple', startMin: 0, startMax: 20 }),
    3: v2({ rows: 5, blanks: 4, adjacent: true, start: 'off', startMin: 1, startMax: 50, rangeMax: 120 }),
  },
  'G1-124': {
    1: v2({ rows: 4, blanks: 2, isolated: true, start: 'multiple', startMin: 0, startMax: 15 }),
    3: v2({ rows: 5, blanks: 4, adjacent: true, start: 'off', startMin: 1, startMax: 85, rangeMax: 120 }),
  },
  'G1-125': {
    1: v2({ rows: 4, blanks: 2, isolated: true, start: 'multiple', startMin: 0, startMax: 6 }),
    3: v2({ rows: 5, blanks: 4, adjacent: true, start: 'off', startMin: 1, startMax: 35, rangeMax: 50 }),
  },
  'G2-207': {
    1: v2({ rows: 4, blanks: 2, isolated: true, start: 'multiple', startMin: 0, startMax: 12 }),
    3: v2({ rows: 5, blanks: 4, adjacent: true, start: 'off', startMin: 1, startMax: 79, rangeMax: 100 }),
  },
  'G2-208': {
    1: v2({ rows: 4, blanks: 2, isolated: true, start: 'multiple', startMin: 0, startMax: 16 }),
    3: v2({ rows: 5, blanks: 4, adjacent: true, start: 'off', startMin: 1, startMax: 72, rangeMax: 100 }),
  },
  'G3-326': {
    1: v2({ rows: 5, blanks: 2, isolated: true, steps: [2, 5, 10], start: 'multiple', startMin: 0, startMax: 40, rangeMax: 120 }),
    3: v2({ rows: 5, blanks: 4, adjacent: true, steps: [6, 7, 8, 9], start: 'any', startMin: 1, startMax: 60, rangeMax: 120 }),
  },
  'G3-327': {
    1: v2({ rows: 5, blanks: 2, isolated: true, steps: [2, 3, 4, 5], start: 'any', startMin: 20, startMax: 60, rangeMax: 60 }),
    3: v2({ rows: 5, blanks: 4, adjacent: true, steps: [7, 11, 25], start: 'any', startMin: 80, startMax: 200, rangeMax: 200 }),
  },
  'G3-329': {
    1: v2({ rows: 4, blanks: 2, isolated: true, steps: [10, 50], start: 'multiple', startMin: 0, startMax: 300, rangeMax: 700 }),
    3: v2({ rows: 5, blanks: 4, adjacent: true, steps: [25, 100], start: 'off', startMin: 105, startMax: 450, rangeMax: 1000 }),
  },
};

/** blank places 1..L-1 (the first box is the anchor): `isolated` never two side by side, `adjacent` at least one pair */
function pickBlanks(rng, L, n, d) {
  const idx = Array.from({ length: L - 1 }, (_, k) => k + 1);
  for (let t = 0; t < 400; t++) {
    const b = rng.sample(idx, n).sort((a, c) => a - c);
    const pairs = b.some((x, k) => k && x - b[k - 1] === 1);
    if (d.isolated && pairs) continue;
    if (d.adjacent && !pairs) continue;
    return b;
  }
  throw new Error('number strip: no blank places for ' + JSON.stringify(d));
}
const asksOf = (rows) => rows.map((r) => `${r.seq[0]}:${r.step}:${r.blanks.join('.')}`);

function makeNumberStripType(cfg) {
  const { id, slug, gradeBand, rangeMax, i18n, descending, len } = cfg;
  // step may vary by difficulty (e.g. G3 skip-25/50/100); resolve at build
  const stepFor = (diff) => (typeof cfg.step === 'object' ? cfg.step[diff] : cfg.step);
  const legacyLevels = cfg.difficulty || {
    1: { rows: 4, blanks: 2 },
    2: { rows: 5, blanks: 3 },
    3: { rows: 5, blanks: 4 },
  };
  const L3 = STRIP_LEVELS[id];
  return {
    id,
    slug,
    gradeBand: gradeBand || 'K',
    assetClass: 'numeral-charts',
    exerciseType: 'number-charts',
    themeAxis: { applicable: true, minNouns: 1, decorative: true },
    difficulty: L3 ? { 1: L3[1], 2: legacyLevels[2], 3: L3[3] } : legacyLevels,
    i18n,
    interactive: NCS.interactiveFor('choice', 'fill'),
    // what makes a copy different: its rows (start, rule) and which boxes are empty
    levelSetWords(m) { return (m.asks || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const b = d.v2 ? this._buildV2(args, ctx, d) : this._buildLegacy(args, ctx, d);
      if (ctx && (ctx.interactive || ctx.answerKey)) return this._screenOrKey(b, args, ctx);
      delete b._rows;
      return b;
    },

    /** the published draw (level 2) — unchanged */
    _buildLegacy({ theme, difficulty }, ctx, d) {
      const rng = ctx.rng;
      const step = stepFor(difficulty);
      const L = len || 8;
      const cards = [];
      const rowsOut = [];
      for (let i = 0; i < d.rows; i++) {
        // pick a start so the whole sequence stays within [0, rangeMax]
        const span = step * (L - 1);
        let start;
        if (cfg.startFixed !== undefined) {
          start = cfg.startFixed;
        } else if (descending) {
          start = rng.int(span, rangeMax);
        } else {
          start = step * rng.int(0, Math.floor((rangeMax - span) / step));
          if (step === 1) start = rng.int(Math.min(1, rangeMax - span), rangeMax - span);
        }
        const seq = Array.from({ length: L }, (_, k) => descending ? start - k * step : start + k * step);
        // blanks: never the first cell (the anchor), spread out
        const blankIdx = rng.sample(Array.from({ length: L - 1 }, (_, k) => k + 1), d.blanks);
        const cellW = Math.min(72, Math.floor(600 / L) - 6);
        const cells = seq.map((v, k) => blankIdx.includes(k)
          ? `<span class="ws-answerbox" style="width:${cellW}px;height:${cellW}px;font-size:22px" data-lcs-answer="${v}"></span>`
          : `<span class="ws-pattern-slot" style="width:${cellW}px;height:${cellW}px;font-family:'Baloo 2';font-weight:600;font-size:${Math.round(cellW * 0.38)}px;color:#3A3530" data-lcs-val="${v}">${v}</span>`
        ).join('');
        cards.push(
          `<div class="ws-card-stage" style="justify-content:center;gap:8px" data-lcs-step="${descending ? -step : step}">${cells}</div>`
        );
        rowsOut.push({ seq, blanks: blankIdx.slice().sort((a, b) => a - b), step: descending ? -step : step });
      }
      // small theme flourish row keeps the page warm without touching content
      const n = ctx.rng.pick(labelSafeNouns(theme));
      const flourish = `<div style="display:flex;justify-content:flex-end;padding:2px 8px">` +
        `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:44px;height:44px"></div>`;
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }) + flourish, meta: { asks: asksOf(rowsOut) }, _rows: rowsOut };
    },

    /** levels 1 and 3: every row its own start (and rule), blanks spread or paired as the level asks */
    _buildV2({ theme }, ctx, d) {
      const rng = ctx.rng;
      const L = len || 8;
      const order = rng.shuffle((d.steps || [stepFor(2)]).slice());
      const top = d.rangeMax || rangeMax;
      const cards = [], rowsOut = [], used = new Set();
      for (let i = 0; i < d.rows; i++) {
        const step = order[i % order.length];
        const span = step * (L - 1);
        let start;
        if (cfg.startFixed !== undefined) start = cfg.startFixed;
        else {
          // the strip's FIRST number (descending: its largest); every number stays within 0..top
          const cands = [];
          const lo = d.startMin || 0, hi = d.startMax === undefined ? top : d.startMax;
          for (let v = lo; v <= hi; v++) {
            if (d.start === 'multiple' && v % step !== 0) continue;
            if (d.start === 'off' && v % step === 0) continue;
            if (descending ? v - span < 0 || v > top : v + span > top) continue;
            cands.push(v);
          }
          const fresh = cands.filter((v) => !used.has(v + ':' + step));
          if (!cands.length) throw new Error(`${id} level: no start for step ${step}`);
          start = rng.pick(fresh.length ? fresh : cands);
        }
        used.add(start + ':' + step);
        const seq = Array.from({ length: L }, (_, k) => (descending ? start - k * step : start + k * step));
        const blanks = pickBlanks(rng, L, d.blanks, d);
        const cellW = Math.min(72, Math.floor(600 / L) - 6);
        const sgn = descending ? -step : step;
        const cells = seq.map((v, k) => (blanks.includes(k)
          ? `<span class="ws-answerbox" style="width:${cellW}px;height:${cellW}px;font-size:22px" data-lcs-answer="${v}"></span>`
          : `<span class="ws-pattern-slot" style="width:${cellW}px;height:${cellW}px;font-family:'Baloo 2';font-weight:600;font-size:${Math.round(cellW * 0.38)}px;color:#3A3530" data-lcs-val="${v}">${v}</span>`)).join('');
        cards.push(`<div class="ws-card-stage" style="justify-content:center;gap:8px" data-lcs-step="${sgn}">${cells}</div>`);
        rowsOut.push({ seq, blanks, step: sgn });
      }
      let flourish = '';
      if (theme) {
        const n = rng.pick(labelSafeNouns(theme));
        flourish = `<div style="display:flex;justify-content:flex-end;padding:2px 8px">` +
          `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt="" style="width:44px;height:44px"></div>`;
      }
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows, numbered: false }) + flourish, meta: { asks: asksOf(rowsOut) }, _rows: rowsOut };
    },

    /** the key (answers in the boxes) or the screen (one card per empty box) */
    _screenOrKey(b, args, ctx) {
      if (!ctx.interactive) return { bodyHtml: NCS.keyFill(b.bodyHtml).html, meta: b.meta };
      const qs = [];
      for (const r of b._rows) {
        const w = Math.min(60, Math.floor(620 / r.seq.length) - 6);
        const st = Math.abs(r.step);
        for (const bi of r.blanks) {
          const ans = r.seq[bi];
          const prompt = NCS.line(r.seq.map((v, k) => NCS.cellBox(v, w, k === bi ? 'ask' : r.blanks.includes(k) ? 'empty' : 'num')).join(''));
          // wrong numbers stay on the row's own rule (a number off the fives is wrong by its last digit alone)
          qs.push({ q: `seq:${r.seq[0]}:0:${r.step}:${bi}`, prompt, ans, slips: [ans - st, ans + st, ans - 2 * st, ans + 2 * st], step: st, lo: 0 });
        }
      }
      const loc = (args.locale || 'en').slice(0, 2);
      return { bodyHtml: NCS.choiceScreen(qs, NCS.saltOf({ ...ctx, locale: loc, theme: args.theme }, qs)), meta: b.meta };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        document.querySelectorAll('[data-lcs-step]').forEach((stage, i) => {
          const step = parseInt(stage.dataset.lcsStep, 10);
          const cells = [...stage.children].map((el) =>
            parseInt(el.dataset.lcsVal !== undefined ? el.dataset.lcsVal : el.dataset.lcsAnswer, 10));
          for (let k = 1; k < cells.length; k++) {
            if (cells[k] - cells[k - 1] !== step) fails.push(`row ${i + 1}: ${cells[k - 1]}→${cells[k]} breaks step ${step}`);
          }
          if (cells.some((v) => v < 0)) fails.push(`row ${i + 1}: negative value`);
          if (!stage.querySelector('[data-lcs-answer]')) fails.push(`row ${i + 1}: no blanks`);
          if (stage.children[0].dataset.lcsAnswer !== undefined) fails.push(`row ${i + 1}: first cell is blank (no anchor)`);
        });
        return fails;
      });
    },
  };
}

module.exports = { makeNumberStripType, STRIP_LEVELS };
