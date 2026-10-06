/**
 * G1-232 — Which purse has more? (nt20-VAR, money family.) Two coin purses
 * per row; the child counts both and circles the one holding MORE money.
 * The trap this page exists for: more coins is not more money — a purse of
 * many small coins loses to two big ones. Native currency per locale via
 * data/money/currencies.js; totals stay in the smallest natural unit.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { coinRow } = require('../../primitives/coins.js');
const { CURRENCIES } = require('../../data/money/currencies.js');

const D = { coinsMin: 2, coinsMax: 5, denomsUsed: 4, cards: 3, cols: 1, rows: 3, minPx: 42, maxPx: 58 };

module.exports = {
  id: 'G1-232',
  slug: 'which-purse-has-more',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'money',
  themeAxis: { applicable: false },
  // Level Set 2026-10-05: level 1 a clear gap; level 2 the published page; level 3 close totals, 4 rows, and the trap
  // this page exists for (the purse with MORE coins holds LESS money) in at least half the rows
  difficulty: { 1: { ...D, coinsMin: 2, coinsMax: 3, minGapFrac: 0.3 }, 2: { ...D }, 3: { ...D, coinsMin: 3, coinsMax: 6, cards: 4, rows: 4, minPx: 38, maxPx: 52, maxGapFrac: 0.2, trapShare: 0.5, balance: true } },
  interactive: require('../../lib/money-screen.js').interactiveFor('purse'),
  levelSetWords(m) { return m.rows || []; },
  i18n: {
    en: {
      title: 'Which Purse Has More?',
      instruction: 'Count the money in both purses. Circle the purse that has more.',
    },
  },

  build({ difficulty, locale }, ctx) {
    // Level Set 2026-10-05: the screen version + answer key of NEW pages (lib/money-screen.js); the published page
    // (level 2, copy 1) never reaches it
    const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    if (!published && ctx && (ctx.interactive || ctx.answerKey)) {
      const built = this.build({ difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
      return require('../../lib/money-screen.js').screenOrKey('purse', built, ctx, locale);
    }
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cur = CURRENCIES[(locale || 'en').slice(0, 2)];
    if (!cur) throw new Error(`G1-232: no currency table for locale ${locale}`);
    const denoms = [...cur.sub].sort((a, b) => a.v - b.v).slice(0, Math.min(d.denomsUsed, cur.sub.length));
    const makePurse = () => {
      const k = rng.int(d.coinsMin, d.coinsMax);
      const values = Array.from({ length: k }, () => rng.pick(denoms).v);
      return { values, total: values.reduce((a, b) => a + b, 0) };
    };
    const cards = [], rows = [], pairs = new Set();
    for (let i = 0; i < d.cards; i++) {
      let A, B, guard = 0;
      // Level Set options (additive; undefined = the published behaviour): the gap between the totals, the trap row
      // (the purse with MORE coins holds LESS money) and a balanced left/right answer
      const wantTrap = d.trapShare ? i < Math.ceil(d.cards * d.trapShare) : false;
      // 2026-10-06 (guessability audit): on 96% of rows the richer purse held the BIGGEST coin — compare one coin, never
      // count. On a new page about half the rows put the biggest coin in the POORER purse (hashed per row, not i % 2).
      const slot = require('../../lib/answer-slots.js').slotFor;
      const wantCoinTrap = !published && slot(`${locale}|${difficulty}|${ctx.variant || 1}|${i}|coin`, 2) === 1;
      // … and, independently, about half the rows give the richer purse FEWER coins (the misconception this page is for:
      // more coins is more money) and half give it more — never "the purse with more coins" on most rows
      const wantFewer = !published && slot(`${locale}|${difficulty}|${ctx.variant || 1}|${i}|count`, 2) === 1;
      const coinOk = (P, Q) => {
        const more = P.total > Q.total ? P : Q, less = more === P ? Q : P;
        if (wantCoinTrap && !(Math.max(...less.values) > Math.max(...more.values))) return false;
        return wantFewer ? more.values.length < less.values.length : more.values.length > less.values.length;
      };
      const ok = (P, Q) => {
        const hi = Math.max(P.total, Q.total), gap = Math.abs(P.total - Q.total);
        if (d.minGapFrac && gap < d.minGapFrac * hi) return false;
        if (d.maxGapFrac && gap > d.maxGapFrac * hi) return false;
        if (wantTrap) { const more = P.total > Q.total ? P : Q, less = more === P ? Q : P; if (!(less.values.length > more.values.length)) return false; }
        if (!published && guard < 3000 && !coinOk(P, Q)) return false;   // after 3000 tries the row may skip it
        return true;
      };
      do {
        A = makePurse(); B = makePurse(); guard++;
      } while ((A.total === B.total || (!published && pairs.has([A.total, B.total].sort((x, y) => x - y).join('|'))) || A.total > cur.subMax || B.total > cur.subMax || (d.minGapFrac || d.maxGapFrac || wantTrap || !published ? !ok(A, B) : false)) && guard < (d.trapShare || d.minGapFrac || d.maxGapFrac || !published ? 4000 : 200));
      // Level Set pages (not the published one): no pair of totals twice on a page (native + pedagogy review 2026-10-05)
      if (!published && pairs.has([A.total, B.total].sort((x, y) => x - y).join('|'))) throw new Error('G1-232: could not build a new pair of totals');
      pairs.add([A.total, B.total].sort((x, y) => x - y).join('|'));
      if (A.total === B.total) throw new Error('G1-232: could not build distinct purses');
      if ((d.minGapFrac || d.maxGapFrac || wantTrap) && !ok(A, B)) throw new Error('G1-232: could not build a row with the gap or trap of this level');
      // balance: the richer purse alternates sides row by row (a page whose answer is always on one side teaches the side)
      // (2026-10-06: a new page hashes the side per row — left, right, left, right … is a pattern a child taps)
      if (d.balance && ((A.total > B.total) !== (published ? i % 2 === 0 : slot(`${A.total}|${B.total}|${i}|side`, 2) === 0))) [A, B] = [B, A];
      const more = A.total > B.total ? 'left' : 'right';
      rows.push({ more, left: { values: A.values.slice().sort((a, b) => b - a), row: coinRow({ values: A.values, denoms: cur.sub, minPx: d.minPx, maxPx: d.maxPx }).html }, right: { values: B.values.slice().sort((a, b) => b - a), row: coinRow({ values: B.values, denoms: cur.sub, minPx: d.minPx, maxPx: d.maxPx }).html } });
      const purse = (p, side) => {
        const row = coinRow({ values: p.values, denoms: cur.sub, minPx: d.minPx, maxPx: d.maxPx });
        return `<div style="flex:1;display:flex;align-items:center;justify-content:center;background:#FFFFFF;` +
          `border:2.5px dashed #C8BFAE;border-radius:18px;padding:14px 10px;min-height:96px" data-lcs-purse="${side}">${row.html}</div>`;
      };
      cards.push(
        `<div class="ws-card-stage" style="gap:18px;justify-content:space-between;padding:10px 14px" data-lcs-more="${more}">` +
        purse(A, 'left') +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#8A8276">?</span>` +
        purse(B, 'right') +
        `</div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: { rows: rows.map((r) => [r.left.values.join('+'), r.right.values.join('+')].sort().join('|')) }, _rows: rows };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = document.querySelectorAll('[data-lcs-more]');
      if (cards.length < 3) fails.push(`only ${cards.length} rows`);
      cards.forEach((card, i) => {
        const sumOf = (side) => {
          const purse = card.querySelector(`[data-lcs-purse="${side}"]`);
          if (!purse) return null;
          return [...purse.querySelectorAll('[data-lcs-prim="coin"]')].reduce((a, c) => a + (+c.dataset.lcsValue), 0);
        };
        const L = sumOf('left'), R = sumOf('right');
        if (L == null || R == null) { fails.push(`row ${i + 1}: missing purse`); return; }
        if (L === R) fails.push(`row ${i + 1}: equal totals`);
        const want = L > R ? 'left' : 'right';
        if (card.dataset.lcsMore !== want) fails.push(`row ${i + 1}: declared ${card.dataset.lcsMore} != actual ${want}`);
      });
      return fails;
    });
  },
};
