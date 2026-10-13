/**
 * K-243 — Number bonds to 10 (part-part-whole). THE K-1 decomposition
 * visual missing from the catalog: a grand whole circle, two parts, one
 * slot blank (dashed coral). CCSS K.OA.A.3-4 / DE Zahlzerlegung /
 * NL splitsen / SV tiokompisar — every locale titles it by its own
 * beloved classroom name at the fan.
 *
 * Level Set 2026-10-13 (PDF + interactive + key). Every face takes its three levels from bondLevels(face) — never
 * written into the variation files (tools/gen-var-specs.js would flatten them). Level 2 is the PUBLISHED config of each
 * face, untouched (the legacy draw below; copy 1 is the live page). Levels 1 and 3 are 'v2' configs:
 *   wholes [..] · given [min,max] (the printed part when a part is blank) · parts [min,max] (both parts, whole blank)
 *   blanks [..] spread evenly · unordered (one bond per part pair, 9 = 1 + 8 never beside 9 = 8 + 1)
 *   dots (counting dots in the whole) · partDots (in the printed parts) · mode 'all' — every way to split the whole
 *   (0 + N … N + 0), copy plan 'ordered' (in order, the second part blank) / 'mixed' (shuffled, either part blank).
 * Every title is kept true (native titles name 10 / 5 / "5 to 10" / 20 / dots): the base and the make-ten face are
 * bonds OF 10 on every level, the to-5 face keeps its dots, the within-10 face keeps wholes 5–10.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const numberBond = require('../../primitives/number-bond.js');

/** card size by cards a page (measured with lib/page-fill.js cardFill) */
const GRID = { 4: { cols: 2, rows: 2, size: 280 }, 6: { cols: 2, rows: 3, size: 196 }, 7: { cols: 2, rows: 4, size: 188 }, 8: { cols: 2, rows: 4, size: 188 }, 9: { cols: 3, rows: 3, size: 220 }, 10: { cols: 3, rows: 4, size: 188 }, 11: { cols: 3, rows: 4, size: 188 } };
const lv = (o) => ({ v2: true, ...o });

/** the three levels of a face; `pub` = its published level-2 config (left exactly as it is) */
function bondLevels(face, pub) {
  switch (face) {
    case 'ten': return {   // K-243 — bonds OF 10
      1: lv({ wholes: [10], given: [5, 9], cards: 4, dots: true, blanks: ['a', 'b'] }),
      2: pub,
      3: lv({ mode: 'all', wholes: [10], plans: ['ordered', 'mixed'] }),
    };
    case 'five': return {  // K-273 — bonds of 5, with dots (five titles promise the dots)
      1: lv({ wholes: [5], given: [1, 4], cards: 4, dots: true, partDots: true, blanks: ['a', 'b'] }),
      2: pub,
      3: lv({ mode: 'all', wholes: [5], dots: true, plans: ['ordered', 'mixed'] }),
    };
    case 'within': return { // K-274 — wholes 5–10 (four titles name the range)
      1: lv({ wholes: [5, 6, 7], cards: 4, dots: true, blanks: ['a', 'b'], unordered: true }),
      2: pub,
      3: lv({ wholes: [5, 6, 7, 8, 9, 10], cards: 8, blanks: ['a', 'b', 'whole'], unordered: true }),
    };
    case 'twenty': return { // K-275 — bonds OF 20: the size of the missing part is the ladder
      1: lv({ wholes: [20], given: [10, 19], cards: 6, blanks: ['a', 'b'], unordered: true }),
      2: pub,
      3: lv({ wholes: [20], given: [1, 9], cards: 8, blanks: ['a', 'b'], unordered: true }),
    };
    case 'whole': return {  // K-276 — the whole is missing
      1: lv({ wholes: [3, 4, 5, 6], parts: [1, 5], cards: 4, partDots: true, blanks: ['whole'], unordered: true }),
      2: pub,
      // review 2026-10-13: sums up to 17 were too big a step from level 2 (wholes ≤ 10) — just past ten, 10 to 13
      3: lv({ wholes: [10, 11, 12, 13], parts: [2, 9], cards: 6, blanks: ['whole'], unordered: true }),
    };
    case 'makeTen': return { // K-277 — bonds of 10 with counting dots (titles promise the dots)
      1: lv({ wholes: [10], given: [1, 9], cards: 4, dots: true, partDots: true, blanks: ['a', 'b'] }),
      2: pub,
      // review 2026-10-13: six more bonds of the same kind were not harder — every way to make ten, 0 + 10 … 10 + 0, with the dots
      3: lv({ mode: 'all', wholes: [10], dots: true, plans: ['ordered', 'mixed'] }),
    };
    default: {             // bonds of one number N (K-414..417: 6, 7, 8, 9) — new faces, no published page
      const N = Number(face);
      if (!(N >= 3 && N <= 10)) throw new Error('bondLevels: unknown face ' + face);
      return {
        1: lv({ wholes: [N], given: [1, N - 1], cards: 4, dots: true, partDots: true, blanks: ['a', 'b'] }),
        2: lv({ wholes: [N], given: [1, N - 1], cards: 6, blanks: ['a', 'b'] }),
        3: lv({ mode: 'all', wholes: [N], plans: ['ordered', 'mixed'] }),
      };
    }
  }
}

const PUBLISHED = { wholeMin: 10, wholeMax: 10, cards: 6, cols: 2, rows: 3, dots: false, blanks: ['a', 'b'], size: 196 };

module.exports = {
  id: 'K-243',
  slug: 'number-bonds-to-10',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'number-bonds',
  themeAxis: { applicable: false },
  interactive: require('../../lib/number-bonds-screen.js').interactiveFor(),
  bondLevels,
  // d2 = bonds OF 10 only: every locale's beloved name (tiokompisar, amigos
  // del 10, compléments à 10, Amici del 10) PROMISES ten — a whole of 7 under
  // that title is dishonest (sv-panel finding). So are levels 1 and 3 (Level Set 2026-10-13).
  difficulty: bondLevels('ten', PUBLISHED),
  i18n: {
    en: {
      title: 'Number Bonds to 10',
      instruction: 'Look at each number bond. Write the missing number in the dashed circle.',
    },
  },

  build(args, ctx) {
    const S = [];
    const b = this._build(args, ctx, S);
    b.meta = { ...b.meta, asks: S.map((s) => `${s.plan ? s.plan + '|' : ''}${s.whole}:${s.a}:${s.b}:${s.blank}`) };
    if (ctx && (ctx.interactive || ctx.answerKey)) {
      return require('../../lib/number-bonds-screen.js').screenOrKey(b, S, { ...ctx, locale: (args.locale || 'en').slice(0, 2) }, (o) => this._card(o));
    }
    return b;
  },
  // what makes a copy different: its bonds and which circle is blank (and, on the every-way pages, the plan)
  levelSetWords(m) { return (m.asks || []).map(String); },

  /** one card's bond (the page, the key and the screen draw it the same way) */
  _card({ whole, a, b, blank, size, dots, partDots, blankText }) {
    const pd = partDots ? ['a', 'b'].filter((s) => s !== blank) : null;
    return numberBond({ whole, a, b, blank, size, dots, partDots: pd, blankText });
  },

  _build({ difficulty }, ctx, S) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    if (!d.v2) {
      // the PUBLISHED draw (level 2 of every face) — unchanged
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
        S.push({ whole, a, b: whole - a, blank, size: d.size, dots: d.dots });
        cards.push(`<div class="ws-card-stage">${bond.svg}</div>`);
      }
      return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: {} };
    }

    const sv = Number((ctx && (ctx.seedVariant || ctx.variant)) || 1);
    let picks;
    let plan = null;
    if (d.mode === 'all') {
      plan = d.plans[sv - 1];
      if (!plan) throw new Error(`K-243: level ${difficulty} has ${d.plans.length} copies (no plan for copy ${sv})`);
      const N = d.wholes[0];
      picks = Array.from({ length: N + 1 }, (_, a) => ({ whole: N, a, b: N - a, blank: 'b' }));
      if (plan === 'mixed') {
        picks = shuffle(picks, rng);
        // either part blank, half and half
        const sides = shuffle(picks.map((_, k) => (k % 2 ? 'a' : 'b')), rng);
        picks.forEach((p, k) => { p.blank = sides[k]; });
      }
    } else {
      const pool = [];
      for (const whole of d.wholes) {
        for (let a = 1; a <= whole - 1; a++) {
          const b = whole - a;
          for (const blank of d.blanks) {
            if (blank === 'whole') { if (d.parts && (a < d.parts[0] || a > d.parts[1] || b < d.parts[0] || b > d.parts[1])) continue; }
            else if (d.given) { const g = blank === 'a' ? b : a; if (g < d.given[0] || g > d.given[1]) continue; }
            pool.push({ whole, a, b, blank });
          }
        }
      }
      const order = shuffle(pool, rng);
      const per = d.blanks.length;
      const want = d.blanks.map((_, k) => Math.floor(d.cards / per) + (k < d.cards % per ? 1 : 0));   // blanks spread evenly
      const wantOf = (bl) => want[d.blanks.indexOf(bl)];
      const un = (p) => `${p.whole}|${Math.min(p.a, p.b)}-${Math.max(p.a, p.b)}`;
      const givenOf = (p) => `${p.whole}|${p.blank === 'whole' ? un(p) : p.blank === 'a' ? p.b : p.a}`;
      const ord = (p) => `${p.whole}|${p.a}|${p.blank}`;
      // pass 1: a new part pair (unordered faces) / a new printed number, its blank still wanted · pass 2: a new card,
      // still balanced · pass 3: any new card (a whole with too few ways for a balanced page)
      picks = [];
      for (const pass of [1, 2, 3]) {
        for (const p of order) {
          if (picks.length >= d.cards) break;
          if (picks.some((q) => ord(q) === ord(p))) continue;
          if (pass === 1 && picks.some((q) => (d.unordered ? un(q) === un(p) : givenOf(q) === givenOf(p)))) continue;
          if (d.unordered && picks.some((q) => un(q) === un(p))) continue;
          if (pass < 3 && picks.filter((q) => q.blank === p.blank).length >= wantOf(p.blank)) continue;
          picks.push(p);
        }
      }
      if (picks.length < d.cards) throw new Error(`K-243: level ${difficulty} has only ${picks.length} different bonds for ${d.cards} cards`);
      picks = shuffle(picks, rng);
    }
    const g = GRID[picks.length];
    if (!g) throw new Error(`K-243: no grid for ${picks.length} cards`);
    const cards = picks.map((p) => {
      const o = { ...p, size: g.size, dots: !!d.dots, partDots: !!d.partDots, plan };
      S.push(o);
      return `<div class="ws-card-stage">${this._card(o).svg}</div>`;
    });
    return { bodyHtml: cardGrid({ cards, cols: g.cols, rows: g.rows }), meta: {} };
  },

  async verify(page) {
    const fails0 = await page.evaluate(() => {
      const fails = [];
      const seen = new Set();
      const bonds = [];
      document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
        const svg = card.querySelector('[data-lcs-prim="number-bond"]');
        if (!svg) { fails.push(`card ${i + 1}: no bond`); return; }
        const whole = +svg.dataset.lcsWhole, a = +svg.dataset.lcsA, b = +svg.dataset.lcsB;
        bonds.push({ whole, a, b });
        if (a + b !== whole) fails.push(`card ${i + 1}: ${a}+${b}!=${whole}`);
        if (a < 0 || b < 0) fails.push(`card ${i + 1}: negative part`);
        const blanks = [...svg.querySelectorAll('[data-lcs-blank]')];
        if (blanks.length !== 1) { fails.push(`card ${i + 1}: ${blanks.length} blanks`); return; }
        const slot = svg.dataset.lcsBlankslot;
        if (slot === 'whole' && (a < 1 || b < 1)) fails.push(`card ${i + 1}: a missing whole with a zero part`);
        const want = slot === 'whole' ? whole : slot === 'a' ? a : b;
        if (+blanks[0].dataset.lcsAnswer !== want) fails.push(`card ${i + 1}: blank answer != ${want}`);
        // the blank's value must not be printed anywhere as text
        const printed = [...svg.querySelectorAll('text:not([data-lcs-blanktext])')].map((t) => t.textContent.trim());
        if (printed.length !== 2) fails.push(`card ${i + 1}: ${printed.length} numerals printed (want 2)`);
        if (slot === 'whole' && printed.includes(String(want))) fails.push(`card ${i + 1}: the missing whole ${want} is printed`);
        const k = `${whole}|${a}|${slot}`;
        if (seen.has(k)) fails.push(`card ${i + 1}: the same bond twice (${k})`);
        seen.add(k);
        // the bond must sit inside its card
        const cr = card.getBoundingClientRect(), r = svg.getBoundingClientRect();
        if (r.right > cr.right + 0.5 || r.left < cr.left - 0.5 || r.bottom > cr.bottom + 0.5) fails.push(`card ${i + 1}: the bond runs out of its card`);
      });
      if (!bonds.length) fails.push('no bonds rendered');
      // zero parts: only on a page that lists every way to split one whole (0 + N … N + 0), and there each way once
      if (bonds.some((x) => x.a === 0 || x.b === 0)) {
        const N = bonds[0].whole;
        const all = bonds.every((x) => x.whole === N) && bonds.length === N + 1 && new Set(bonds.map((x) => x.a)).size === N + 1;
        if (!all) fails.push('a zero part on a page that does not list every way to split its whole');
      }
      return fails;
    });
    const { pageFill, cardFill } = require('../../lib/page-fill.js');
    const pf = await page.evaluate(pageFill), cf = await page.evaluate(cardFill, 0.25);
    return [...fails0, ...pf.fails, ...cf.fails];
  },
};

function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = rng.int(0, i); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
