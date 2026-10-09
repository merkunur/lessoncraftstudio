/**
 * G1-208 — Mental math to 20 (bare-number add/sub drill). The abstract
 * drill-sheet query face the picture-arithmetic family deliberately lacks
 * (de "Rechnen bis 20 / Kopfrechnen", fr "calcul mental", nl "sommen tot 20").
 * CCSS 1.OA.C.6 / DE Klasse 1 Zahlenraum bis 20.
 * d1: addition within 10 · d2: mixed ± within 20 (result unknown) ·
 * d3: missing-number Platzhalter forms (☐+3=8 — unknown in any position,
 *     1.OA.D.8 algebra readiness).
 *
 * Level Set (2026-10-09, PDF + interactive): the five faces (G1-214..218) get real levels through knobs that only NEW
 * configs carry — the published configs (level 2) keep the original draw, fact for fact:
 *   minOp      smallest number a problem may use (within-5 fluency needs 1s; the drill default is 2)
 *   cross      'never' / 'always' crossing ten (12 + 5 · 8 + 7 · 17 − 5 · 15 − 8)
 *   pos        where the unknown may sit: ['res'] · ['b'] · ['a'] (7 + ☐ = 12 · ☐ − 3 = 4)
 *   terms: 3   three numbers (4 + 3 − 2 = ☐), every step within the range
 * A knob config draws from the full list of its valid facts (shuffled), never repeating one on a page.
 * Every page draws its equations large in two columns (2026-10-09: 30-px equations sat in big cards, ~5% of each card).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');

const FS = 48;   // numerals
const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${FS}px;color:#3A3530">${v}</span>`;
const OP = (op) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${FS - 4}px;color:${op === '+' ? '#146B5E' : '#F2784B'}">${op === '-' ? '−' : op}</span>`;
const EQ = () => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${FS - 4}px;color:#8A8276">=</span>`;

// crossing ten: the ones bridge a ten. 'always' = really crosses (8 + 7, 13 − 7); 'never' = the ones stay inside the ten
// (12 + 5; 11 + 9 bridges to 20 and is NOT "no crossing" — review 2026-10-09)
const crosses = (a, op, b) => (op === '+' ? (a % 10) + (b % 10) >= 11 : (b % 10) > (a % 10));
const bridges = (a, op, b) => (op === '+' ? (a % 10) + (b % 10) >= 10 : (b % 10) > (a % 10));

/** every valid fact of a knob config: [{a, op, b, op2?, c?, res}] */
function factsOf(d) {
  const min = d.minOp || 2, out = [];
  if (d.terms === 3) {
    // only a + b − c (review 2026-10-09: a Grade 1 child may add the last two first, so "7 − 6 + 4" has two answers)
    for (let a = min; a <= d.max; a++) for (const o1 of ['+']) for (let b = min; b <= d.max; b++) {
      const r1 = o1 === '+' ? a + b : a - b;
      if (r1 < 1 || r1 > d.max) continue;
      for (const o2 of ['-']) for (let c = min; c <= d.max; c++) {
        const res = o2 === '+' ? r1 + c : r1 - c;
        if (res < 1 || res > d.max || o1 === o2 || b === c || a === c) continue;   // one + and one − : the mixed chain is the skill; nothing cancels (x + y − y = x, x + y − x = y)
        out.push({ a, op: o1, b, op2: o2, c, res });
      }
    }
    return out;
  }
  for (const op of d.ops) for (let a = min; a <= d.max; a++) for (let b = min; b <= d.max; b++) {
    const res = op === '+' ? a + b : a - b;
    if (op === '+' && res > d.max) continue;
    if (op === '-' && res < min) continue;
    if (d.cross === 'never' && (bridges(a, op, b) || (op === '+' ? res < 11 || Math.min(a, b) > 9 : a < 11))) continue;   // a teen and a digit, no bridge
    // 'always': subtraction is a teen minus a digit going below ten (13 − 7; never 10 − x or 20 − x, review 2026-10-09)
    if (d.cross === 'always' && (!crosses(a, op, b) || (op === '-' && (a < 11 || a > 19 || b > 9)))) continue;
    out.push({ a, op, b, res });
  }
  return out;
}

module.exports = {
  id: 'G1-208',
  slug: 'mental-math-to-20',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'mental-math',
  themeAxis: { applicable: false },
  interactive: require('../../lib/mental-math-screen.js').interactiveFor(),
  difficulty: {
    1: { max: 10, cards: 12, cols: 2, rows: 6, ops: ['+'], missing: false, varied: true },   // 2026-10-09: 12 cards like every page (8 left tall half-empty cards); varied = the variety caps
    2: { max: 20, cards: 12, cols: 3, rows: 4, ops: ['+', '-'], missing: false },
    // level 3 (review 2026-10-09): the box a third each first / middle / result, every problem crossing ten — harder than level 2
    // and not the same page as Missing Number Problems to 20
    3: { max: 20, cards: 12, cols: 3, rows: 4, ops: ['+', '-'], missing: true, cross: 'always', posBalanced: true },
  },
  i18n: {
    en: {
      title: 'Mental Math to 20',
      instruction: 'Solve each problem in your head. Write the missing number in the box.',
    },
  },

  build(args, ctx) {
    const published = Number(args.difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    const S = [];
    const b = this._build(args, ctx, S);
    if (published) return b;
    b.meta = { ...b.meta, asks: S.map((x) => x.ask) };
    if (ctx && (ctx.interactive || ctx.answerKey)) {
      return require('../../lib/mental-math-screen.js').screenOrKey(b, S, { ...ctx, locale: (args.locale || 'en').slice(0, 2) });
    }
    return b;
  },
  levelSetWords(m) { return (m.asks || []).map(String); },

  _build({ difficulty }, ctx, S) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const knobs = !!(d.minOp || d.cross || d.pos || d.terms || d.posBalanced || d.varied);
    const used = new Set();
    const cards = [];
    // a knob page: no number used as often as it can be avoided (twice, or one more than an even spread where the range
    // has few numbers), at most one turned-around pair (review 2026-10-09); a greedy pick that runs out is re-shuffled
    let facts = null;
    if (knobs) {
      const all0 = factsOf(d);
      const capA = Math.max(2, Math.ceil(d.cards / new Set(all0.map((x) => x.a)).size) + 1);
      const capB = Math.max(2, Math.ceil(d.cards / new Set(all0.map((x) => x.b)).size) + 1);
      for (let t = 0; t < 40 && !facts; t++) {
        const all = rng.shuffle(all0), cnt = {}, pick = [];
        let turned = 0;
        for (const x of all) {
          if (pick.length >= d.cards) break;
          if ((cnt['a' + x.a] || 0) >= capA || (cnt['b' + x.b] || 0) >= capB) continue;
          const twin = x.op === '+' && !x.op2 && pick.some((y) => y.op === '+' && !y.op2 && y.a === x.b && y.b === x.a);
          if (twin && turned >= 1) continue;
          if (twin) turned++;
          cnt['a' + x.a] = (cnt['a' + x.a] || 0) + 1; cnt['b' + x.b] = (cnt['b' + x.b] || 0) + 1; pick.push(x);
        }
        if (pick.length >= d.cards) facts = pick;
      }
      if (!facts) throw new Error(`G1-208: no varied page of ${d.cards} facts`);
    }
    // posBalanced: the box a third each in the first, middle and result place, in a shuffled order
    const posList = d.posBalanced ? rng.shuffle(Array.from({ length: d.cards }, (_, i) => ['a', 'b', 'res'][i % 3])) : null;
    for (let i = 0; i < d.cards; i++) {
      let a, b, res, op, op2 = null, c = null, pos;
      if (knobs) {
        ({ a, op, b, res } = facts[i]);
        if (d.terms === 3) { op2 = facts[i].op2; c = facts[i].c; }
        pos = posList ? posList[i] : d.pos ? rng.pick(d.pos) : (d.missing ? rng.pick(['a', 'b', 'res']) : 'res');
      } else {
        let guard = 0;
        do {
          op = rng.pick(d.ops);
          if (op === '+') {
            // both addends ≥2 — a page dominated by +1 facts is weak drill
            a = rng.int(2, d.max - 2);
            b = rng.int(2, d.max - a);
            res = a + b;
          } else {
            // subtrahend ≥2 and result ≥2 for the same reason
            a = rng.int(5, d.max);
            b = rng.int(2, a - 2);
            res = a - b;
          }
          guard++;
        } while (used.has(`${a}${op}${b}`) && guard < 120);
        used.add(`${a}${op}${b}`);
        // unknown position: result for the drill modes; any slot for d3
        pos = d.missing ? rng.pick(['a', 'b', 'res']) : 'res';
      }
      const answer = pos === 'a' ? a : pos === 'b' ? b : res;
      const slot = (v, p) => p === pos ? answerBox({ w: 84, h: 68, answer: v }) : NUM(v);
      const fact = `${a}${op}${b}` + (op2 ? `${op2}${c}` : '');
      S.push({ q: `mm:${a}:${op}:${b}:${op2 || ''}:${c == null ? '' : c}:${pos}`, ask: fact + '@' + pos, ans: answer,
        nums: { a, op, b, op2, c, res, pos } });
      cards.push(
        `<div class="ws-card-stage" style="gap:14px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-op="${op}" data-lcs-pos="${pos}"` +
        (op2 ? ` data-lcs-op2="${op2}" data-lcs-c="${c}"` : '') + (d.cross ? ` data-lcs-cross="${d.cross}"` : '') + `>` +
        slot(a, 'a') + OP(op) + slot(b, 'b') + (op2 ? OP(op2) + NUM(c) : '') + EQ() + slot(res, 'res') +
        `</div>`
      );
    }
    // two columns: an equation drawn large needs the width (2026-10-09)
    return { bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }), meta: {} };
  },

  async verify(page) {
    const fails0 = await page.evaluate(() => {
      const fails = [];
      const cards = document.querySelectorAll('[data-lcs-card]');
      if (!cards.length) fails.push('no cards');
      const seen = new Set();
      cards.forEach((card, i) => {
        const st = card.querySelector('[data-lcs-a]');
        const a = +st.dataset.lcsA, b = +st.dataset.lcsB, op = st.dataset.lcsOp, pos = st.dataset.lcsPos;
        const op2 = st.dataset.lcsOp2 || null, c = op2 ? +st.dataset.lcsC : null;
        const r1 = op === '+' ? a + b : a - b;
        const res = op2 ? (op2 === '+' ? r1 + c : r1 - c) : r1;
        if (r1 < 0 || res < 0) fails.push(`card ${i + 1}: negative`);
        if (op2 && (b === c || a === c)) fails.push(`card ${i + 1}: ${a} ${op} ${b} ${op2} ${c} cancels out (the answer is printed in the problem)`);
        if (op === '-' && !op2 && b >= a) fails.push(`card ${i + 1}: negative-space subtraction`);
        const key = `${a}${op}${b}${op2 || ''}${c == null ? '' : c}`;
        if (seen.has(key)) fails.push(`card ${i + 1}: ${key} twice on the page`);
        seen.add(key);
        if (st.dataset.lcsCross) {
          const x = op === '+' ? (a % 10) + (b % 10) >= 11 : (b % 10) > (a % 10);       // crosses
          const br = op === '+' ? (a % 10) + (b % 10) >= 10 : (b % 10) > (a % 10);      // bridges (or lands on) a ten
          if (st.dataset.lcsCross === 'always' ? !x : br) fails.push(`card ${i + 1}: ${key} breaks the crossing-ten rule (${st.dataset.lcsCross})`);
        }
        const boxes = [...card.querySelectorAll('[data-lcs-answer]')];
        if (boxes.length !== 1) { fails.push(`card ${i + 1}: ${boxes.length} answer boxes`); return; }
        const want = pos === 'a' ? a : pos === 'b' ? b : res;
        if (+boxes[0].dataset.lcsAnswer !== want) fails.push(`card ${i + 1}: box answer != ${want}`);
        // the unknown's value must not be visible as text in this card
        const visible = [...card.querySelectorAll('.ws-card-stage > span')]
          .filter((s) => !s.hasAttribute('data-lcs-answer'))
          .map((s) => s.textContent.trim());
        const numerals = visible.filter((t) => /^\d+$/.test(t));
        if (numerals.length !== (op2 ? 3 : 2)) fails.push(`card ${i + 1}: ${numerals.length} printed numerals (want ${op2 ? 3 : 2})`);
        // the equation fits its card
        const cr = card.getBoundingClientRect();
        for (const s of card.querySelectorAll('.ws-card-stage > span')) { const r = s.getBoundingClientRect(); if (r.right > cr.right + 0.5 || r.left < cr.left - 0.5) fails.push(`card ${i + 1}: the equation runs out of its card`); }
      });
      return fails;
    });
    // 2026-10-09: the equations fill their cards (they were ~5%)
    const { pageFill, cardFill } = require('../../lib/page-fill.js');
    const pf = await page.evaluate(pageFill), cf = await page.evaluate(cardFill, 0.25);
    return [...fails0, ...pf.fails, ...cf.fails];
  },
};
