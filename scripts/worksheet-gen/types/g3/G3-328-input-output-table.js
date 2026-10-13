/**
 * G3-328 — Input/output tables: the rule is shown; apply it to fill the
 * missing outputs (and one missing input — inverse thinking).
 *
 * REDESIGNED 2026-10-13 (Number Charts Level Set): two machines of 92×56 boxes floated in the middle of two tall
 * cards (10% of each card used). The machine's rule is now a big chip on top and its rows are big boxes spread down
 * the whole card. The numbers (the rng draw) are unchanged.
 * Level Set: level 1 adding 2, 3, 5 or 10; level 2 the published page; level 3 multiplying by 2, 5 or 10 or taking
 * away 6 or 8, five rows a machine and TWO missing inputs.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');
const NCS = require('../../lib/number-charts-screen.js');

const CW = 112, CH = 88;
const CELL = (v, given) => given
  ? `<span class="ws-pattern-slot" style="width:${CW}px;height:${CH}px;font-family:'Baloo 2';font-weight:700;font-size:34px;color:#3A3530" data-lcs-given="${v}">${v}</span>`
  : answerBox({ w: CW, h: CH, answer: v });
const OPQ = { '+': '+', '-': '-', '×': 'x' };

module.exports = {
  id: 'G3-328',
  slug: 'input-output-tables',
  gradeBand: 'G23',
  assetClass: 'numeral-charts',
  exerciseType: 'number-charts',
  themeAxis: { applicable: false },
  difficulty: {
    1: { rules: [['+', 2], ['+', 3], ['+', 5], ['+', 10]], rows: 4 },
    2: { rules: [['+', 7], ['-', 4], ['+', 9]], rows: 4 },
    3: { rules: [['×', 2], ['×', 5], ['×', 10], ['-', 6], ['-', 8]], rows: 5, missIn: 2 },
  },
  interactive: NCS.interactiveFor('choice', 'machine'),
  i18n: {
    en: {
      title: 'Number Machines',
      instruction: 'Each machine uses its rule on every number. Fill in the missing ones.',
    },
  },
  levelSetWords(m) { return (m.asks || []).map(String); },

  build(args, ctx) {
    const { difficulty } = args;
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const machines = [];
    const cards = rng.sample(d.rules, Math.min(2, d.rules.length)).map(([op, k]) => {
      const apply = (x) => op === '+' ? x + k : (op === '-' ? x - k : x * k);
      const lo = op === '-' ? k + 1 : 1;
      const ins = [];
      let guard = 0;
      while (ins.length < d.rows && guard++ < 100) {
        const v = rng.int(lo, op === '×' ? 12 : 40);
        if (!ins.includes(v)) ins.push(v);
      }
      // one missing input (inverse) — two on level 3 —, the rest missing outputs
      const missIn = d.missIn ? rng.sample(Array.from({ length: d.rows - 1 }, (_, i) => i + 1), d.missIn) : [rng.int(1, d.rows - 1)];
      const rowsOut = [];
      const rows = ins.map((x, r) => {
        const y = apply(x);
        const inGiven = !missIn.includes(r);
        rowsOut.push({ x, y, which: inGiven ? 'out' : 'in' });
        return `<div style="display:flex;gap:12px;align-items:center" data-lcs-in="${x}" data-lcs-out="${y}">` +
          CELL(x, inGiven) +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:34px;color:#F2784B">→</span>` +
          CELL(y, !inGiven) + `</div>`;
      }).join('');
      machines.push({ op, k, rows: rowsOut });
      return (
        `<div class="ws-card-stage" style="flex-direction:column;justify-content:space-evenly;gap:10px" data-lcs-op="${op}" data-lcs-k="${k}">` +
        `<span style="display:inline-flex;align-items:center;gap:8px;padding:10px 34px;border-radius:999px;background:#146B5E;` +
        `color:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:40px" data-lcs-rule="${op}${k}">${op === '-' ? '−' : op}${k}</span>` +
        rows + `</div>`
      );
    });
    const b = { bodyHtml: cardGrid({ cards, cols: 2, rows: 1 }), meta: { asks: machines.map((m) => `${m.op}${m.k}:` + m.rows.map((r) => `${r.x}>${r.y}${r.which}`).join(',')) } };
    if (ctx && (ctx.interactive || ctx.answerKey)) return this._screenOrKey(b, machines, args, ctx);
    return b;
  },

  _screenOrKey(b, machines, args, ctx) {
    if (!ctx.interactive) return { bodyHtml: NCS.keyFill(b.bodyHtml).html, meta: b.meta };
    const C = NCS.cellBox;
    const qs = [];
    for (const m of machines) {
      const chip = `<span style="display:inline-flex;padding:6px 22px;border-radius:999px;background:#146B5E;color:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:30px">${m.op === '-' ? '−' : m.op}${m.k}</span>`;
      for (const r of m.rows) {
        const out = r.which === 'out';
        const ans = out ? r.y : r.x;
        const known = out ? r.x : r.y;
        const prompt = NCS.line(chip + (out ? C(r.x, 96, 'num') : C(0, 96, 'ask')) + NCS.op('→') + (out ? C(0, 96, 'ask') : C(r.y, 96, 'num')), 14);
        let slips, step = 1;
        if (out) {
          // the rule the wrong way round, one off — for a times machine the neighbouring multiples (a non-multiple is a tell)
          if (m.op === '×') { slips = [ans - m.k, ans + m.k, ans + 2 * m.k, ans - 2 * m.k]; step = m.k; }
          else slips = [m.op === '+' ? r.x - m.k : r.x + m.k, ans + 1, ans - 1, ans + 10];
        } else if (m.op === '×') slips = [ans + 1, ans - 1, ans + 2];
        else slips = [m.op === '+' ? r.y + m.k : r.y - m.k, ans + 1, ans - 1, ans + 10];
        qs.push({ q: `io:${OPQ[m.op]}:${m.k}:${known}:${out ? 'out' : 'in'}`, prompt, ans, slips, step, lo: 0 });
      }
    }
    // the GIVEN rows are not questions; only the empty boxes are
    const loc = (args.locale || 'en').slice(0, 2);
    return { bodyHtml: NCS.choiceScreen(qs, NCS.saltOf({ ...ctx, locale: loc }, qs)), meta: b.meta };
  },

  async verify(page) {
    const fails = await page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-op]').forEach((card, c) => {
        const op = card.dataset.lcsOp, k = parseInt(card.dataset.lcsK, 10);
        card.querySelectorAll('[data-lcs-in]').forEach((row, r) => {
          const x = parseInt(row.dataset.lcsIn, 10), y = parseInt(row.dataset.lcsOut, 10);
          const want = op === '+' ? x + k : (op === '-' ? x - k : x * k);
          if (y !== want) fails.push(`machine ${c + 1} row ${r + 1}: ${x}${op}${k} != ${y}`);
          if (y < 0 || x < 0) fails.push(`machine ${c + 1} row ${r + 1}: negative`);
          const givens = row.querySelectorAll('[data-lcs-given]').length;
          const blanks = row.querySelectorAll('[data-lcs-answer]').length;
          if (givens !== 1 || blanks !== 1) fails.push(`machine ${c + 1} row ${r + 1}: needs exactly one given + one blank`);
        });
      });
      return fails;
    });
    // 2026-10-13: a machine must run down its whole card (the old one floated in the middle: 40% of the card's height)
    fails.push(...await page.evaluate(() => {
      const out = [];
      if (document.querySelector('[data-lcs-screen]')) return out;
      document.querySelectorAll('[data-lcs-op]').forEach((st, c) => {
        const card = st.closest('.ws-card') || st;
        const cr = card.getBoundingClientRect();
        const kids = [...st.children].map((e) => e.getBoundingClientRect());
        const span = Math.max(...kids.map((r) => r.bottom)) - Math.min(...kids.map((r) => r.top));
        if (span / cr.height < 0.6) out.push(`machine ${c + 1}: runs down ${Math.round(100 * span / cr.height)}% of its card`);
        kids.forEach((r) => { if (r.left < cr.left + 4 || r.right > cr.right - 4) out.push(`machine ${c + 1}: a row touches the card's edge`); });
      });
      return out;
    }));
    return fails;
  },
};
