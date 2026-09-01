/**
 * K-243 — Number bonds to 10 (part-part-whole). THE K-1 decomposition
 * visual missing from the catalog: a grand whole circle, two parts, one
 * slot blank (dashed coral). CCSS K.OA.A.3-4 / DE Zahlzerlegung /
 * NL splitsen / SV tiokompisar — every locale titles it by its own
 * beloved classroom name at the fan.
 * d1: wholes ≤5 with subitizing dots · d2: wholes ≤10, blank part ·
 * d3: bonds OF 10 only, blank part or whole.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const numberBond = require('../../primitives/number-bond.js');

module.exports = {
  id: 'K-243',
  slug: 'number-bonds-to-10',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'number-bonds',
  themeAxis: { applicable: false },
  // d2 = bonds OF 10 only: every locale's beloved name (tiokompisar, amigos
  // del 10, compléments à 10, Amici del 10) PROMISES ten — a whole of 7 under
  // that title is dishonest (sv-panel finding). Mixed wholes live at d3.
  difficulty: {
    1: { wholeMin: 3, wholeMax: 5, cards: 4, cols: 2, rows: 2, dots: true, blanks: ['a', 'b'], size: 232 },
    2: { wholeMin: 10, wholeMax: 10, cards: 6, cols: 2, rows: 3, dots: false, blanks: ['a', 'b'], size: 196 },
    3: { wholeMin: 5, wholeMax: 10, cards: 6, cols: 2, rows: 3, dots: false, blanks: ['a', 'b', 'whole'], size: 196 },
  },
  i18n: {
    en: {
      title: 'Number Bonds to 10',
      instruction: 'Look at each number bond. Write the missing number in the dashed circle.',
    },
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const used = new Set();
    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      let whole, a, blank, key, guard = 0;
      do {
        whole = rng.int(d.wholeMin, d.wholeMax);
        a = rng.int(1, whole - 1); // both parts ≥1 — a zero part is a degenerate bond
        blank = rng.pick(d.blanks);
        // nt20-VAR dedupUnordered: one card per unordered PART PAIR — a
        // mirrored repeat (9=1+8 next to 9=8+1) is the same work twice
        // (critic finding on the mixed-whole pages). Bonds-of-5 keeps the
        // legacy key: only two unordered pairs exist there.
        key = d.dedupUnordered
          ? `${whole}|${Math.min(a, whole - a)}-${Math.max(a, whole - a)}`
          : `${whole}|${a}|${blank}`;
        guard++;
      } while (used.has(key) && guard < 80);
      used.add(key);
      const bond = numberBond({ whole, a, b: whole - a, blank, size: d.size, dots: d.dots });
      cards.push(`<div class="ws-card-stage">${bond.svg}</div>`);
    }
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const svg = card.querySelector('[data-lcs-prim="number-bond"]');
        if (!svg) { fails.push(`card ${i + 1}: no bond`); return; }
        const whole = +svg.dataset.lcsWhole, a = +svg.dataset.lcsA, b = +svg.dataset.lcsB;
        if (a + b !== whole) fails.push(`card ${i + 1}: ${a}+${b}!=${whole}`);
        if (a < 1 || b < 1) fails.push(`card ${i + 1}: zero part`);
        const blanks = [...svg.querySelectorAll('[data-lcs-blank]')];
        if (blanks.length !== 1) { fails.push(`card ${i + 1}: ${blanks.length} blanks`); return; }
        const slot = svg.dataset.lcsBlankslot;
        const want = slot === 'whole' ? whole : slot === 'a' ? a : b;
        if (+blanks[0].dataset.lcsAnswer !== want) fails.push(`card ${i + 1}: blank answer != ${want}`);
        // the blank's value must not be printed anywhere as text
        const printed = [...svg.querySelectorAll('text')].map((t) => t.textContent.trim());
        if (printed.length !== 2) fails.push(`card ${i + 1}: ${printed.length} numerals printed (want 2)`);
      });
      if (document.querySelectorAll('[data-lcs-prim="number-bond"]').length === 0) fails.push('no bonds rendered');
      return fails;
    });
  },
};
