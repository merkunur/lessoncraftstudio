/**
 * G1-211 — Counting coins (money family, native currency per locale — the
 * batch's structural moat; operator ruling 2026-08-31 reversed the old money
 * exclusion, en = USD). Stylized schoolbook coins (size + ring differentiate,
 * never hue — B&W-proof); every total stays in the smallest natural counting
 * unit (cents / centavos / whole kroner) so NO decimal notation appears at
 * this band. Coins render largest-first — the counting strategy the sheet
 * teaches. CCSS 2.MD.C.8 / de Rechnen mit Geld Klasse 1-2 / Lgr22 pengar.
 * d1: 2-3 coins, small set · d2: 3-5 coins · d3: 5-7 coins, full set.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { answerBox } = require('../../templates/components.js');
const { coinRow } = require('../../primitives/coins.js');
const { CURRENCIES } = require('../../data/money/currencies.js');

module.exports = {
  id: 'G1-211',
  slug: 'counting-coins',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'money',
  themeAxis: { applicable: false },
  difficulty: {
    1: { coinsMin: 2, coinsMax: 3, denomsUsed: 3, cards: 4, cols: 2, rows: 2, minPx: 54, maxPx: 74 },
    2: { coinsMin: 3, coinsMax: 5, denomsUsed: 4, cards: 6, cols: 2, rows: 3, minPx: 46, maxPx: 66 },
    3: { coinsMin: 5, coinsMax: 7, denomsUsed: 99, cards: 6, cols: 2, rows: 3, minPx: 42, maxPx: 60 },
  },
  interactive: require('../../lib/money-screen.js').interactiveFor('count'),
  levelSetWords(m) { return m.purses || []; },
  i18n: {
    en: {
      title: 'Counting Coins',
      instruction: 'Count the coins in each purse. Write the total amount in the box.',
    },
  },

  build({ difficulty, locale }, ctx) {
    // Level Set 2026-10-05: the screen version + answer key of NEW pages (lib/money-screen.js); the published page
    // (level 2, copy 1) never reaches it
    const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
    if (!published && ctx && (ctx.interactive || ctx.answerKey)) {
      const built = this.build({ difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
      return require('../../lib/money-screen.js').screenOrKey('count', built, ctx, locale);
    }
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const cur = CURRENCIES[(locale || 'en').slice(0, 2)];
    if (!cur) throw new Error(`G1-211: no currency table for locale ${locale}`);
    // smallest denominations first = the easy subset at low difficulty
    const sorted = [...cur.sub].sort((a, b) => a.v - b.v);
    const denoms = sorted.slice(0, Math.min(d.denomsUsed, cur.sub.length));
    const used = new Set(), totals = new Set();
    const cards = [], purses = [];
    for (let i = 0; i < d.cards; i++) {
      let values, total, guard = 0;
      do {
        const k = rng.int(d.coinsMin, d.coinsMax);
        // d.pairFrom (Level Set 2026-10-05, Two-Coin Counting): each purse holds exactly TWO kinds, drawn from the
        // smallest d.pairFrom kinds — the published page (level 2, copy 1) keeps its two smallest kinds
        const kinds = d.pairFrom && !published ? rng.sample(sorted.slice(0, Math.min(d.pairFrom, sorted.length)), 2) : denoms;
        values = Array.from({ length: k }, () => rng.pick(kinds).v);
        total = values.reduce((a, b) => a + b, 0);
        guard++;
      } while ((total > cur.subMax ||
                new Set(values).size < Math.min(2, values.length) || // a same-coin-only purse is weak counting
                used.has(values.slice().sort((a, b) => a - b).join(',')) ||
                // Level Set pages (not the published one): no total twice on a page (native + pedagogy review 2026-10-05)
                (!published && totals.has(total))) && guard < 400);
      if (total > cur.subMax || new Set(values).size < Math.min(2, values.length) || used.has(values.slice().sort((a, b) => a - b).join(',')) || (!published && totals.has(total)))
        throw new Error(`G1-211 family: level ${difficulty} cannot draw ${d.cards} distinct mixed purses`);
      totals.add(total);
      used.add(values.slice().sort((a, b) => a - b).join(','));
      const row = coinRow({ values, denoms: cur.sub, minPx: d.minPx, maxPx: d.maxPx });
      purses.push({ values: values.slice().sort((a, b) => b - a), denoms: cur.sub.map((x) => x.v), row: row.html, unit: cur.unit });
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:14px;padding:10px">` +
        `<div style="flex:1;display:flex;align-items:center">${row.html}</div>` +
        `<div style="display:flex;align-items:center;gap:8px">` +
        answerBox({ w: 76, h: 50, answer: row.total }) +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530" data-lcs-unit="${cur.unit}">${cur.unit}</span>` +
        `</div></div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: { purses: purses.map((p) => p.values.join('+')) }, _purses: purses };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = document.querySelectorAll('[data-lcs-card]');
      if (!cards.length) fails.push('no cards');
      cards.forEach((card, i) => {
        const purse = card.querySelector('[data-lcs-cointotal]');
        if (!purse) { fails.push(`card ${i + 1}: no purse`); return; }
        const coins = [...purse.querySelectorAll('[data-lcs-prim="coin"]')];
        const sum = coins.reduce((a, c) => a + (+c.dataset.lcsValue), 0);
        if (sum !== +purse.dataset.lcsCointotal) fails.push(`card ${i + 1}: coins sum ${sum} != declared`);
        const box = card.querySelector('[data-lcs-answer]');
        if (!box || +box.dataset.lcsAnswer !== sum) fails.push(`card ${i + 1}: answer != ${sum}`);
        if (!card.querySelector('[data-lcs-unit]')) fails.push(`card ${i + 1}: no unit label`);
        // every coin numeral must be legible: face value printed on the coin
        coins.forEach((c) => {
          const t = c.querySelector('text');
          if (!t || t.textContent.trim() !== c.dataset.lcsValue) fails.push(`card ${i + 1}: coin numeral mismatch`);
        });
        // largest-first ordering (the counting strategy)
        const vals = coins.map((c) => +c.dataset.lcsValue);
        const sorted = [...vals].sort((a, b) => b - a);
        if (vals.join() !== sorted.join()) fails.push(`card ${i + 1}: coins not largest-first`);
      });
      return fails;
    });
  },
};
