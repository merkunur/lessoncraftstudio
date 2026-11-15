/** G1-223 — Number Words to 20. nt20-VAR variation of G1-210 (same family: number-words). */
'use strict';
const base = require('./G1-210-number-words.js');
module.exports = {
  ...base,
  id: 'G1-223',
  slug: 'number-words-to-20',
  // Level Set 2026-10-13: real levels from the base table (level 2 = the published config). ⚠ a re-run of
  // tools/gen-var-specs.js would flatten them back to one config — keep this line.
  difficulty: base.levelsFor('G1-223'),
  i18n: { en: { title: "Number Words to 20", instruction: "Read the number. Circle the word that matches it." } },

  /** THE ITEM BANK of the unit checks (Part 7.6), 2026-11-15 (US teacher-reviewer: form A asked 9 among nine, ten,
   *  eleven — nothing looks like "nine" — while form B asked 8 among seven, eighteen, eight, the real trap). The page's
   *  own card (the numeral over its word chips), seven numbers of the level, and where the level reaches 20 every card
   *  holds the trap of its number: the teen of a one-digit number (9: nineteen), the ones word of a teen (14: four);
   *  the other wrong words are its neighbours. The right word is never the one longest word of its card. */
  checkPage({ difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const d = this.difficulty[difficulty] || this.difficulty[2], rng = ctx.rng, loc = (locale || 'en').slice(0, 2);
    const word = (v) => base.numberWord(v, loc);
    const chip = (v, ok) => `<span style="display:inline-flex;align-items:center;justify-content:center;background:#FFFFFF;` +
      `border:2.5px solid #146B5E;border-radius:22px;padding:6px 18px;font-family:'Nunito';font-weight:800;` +
      `font-size:17px;color:#3A3530" data-lcs-choice="${v}"${ok ? ' data-lcs-correct="1"' : ''}>${word(v)}</span>`;
    const lo = d.min, hi = d.max, k = d.opts || 3, cards = [], used = new Set();
    const ns = rng.shuffle(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i));
    for (const n of ns) {
      if (cards.length >= 7) break;
      const trap = hi >= 20 ? (n < 10 ? n + 10 : n > 10 && n < 20 ? n - 10 : null) : null;
      const near = rng.shuffle([n - 1, n + 1, n - 2, n + 2].filter((v) => v >= 1 && v <= hi && v !== trap));
      let wrong = null;
      for (let t = 0; t < 20 && !wrong; t++) {
        const w = (trap ? [trap] : []).concat(rng.shuffle(near.slice())).slice(0, k - 1);
        const len = (v) => word(v).length, top = Math.max(...w.map(len));
        if (len(n) <= top || t === 19) wrong = w;
      }
      if (!wrong || wrong.length < k - 1 || used.has(n)) continue;
      used.add(n);
      const chips = rng.shuffle([n, ...wrong]).map((v) => chip(v, v === n)).join('');
      cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-n="${n}">` +
        `<span style="font-family:'Baloo 2';font-weight:700;font-size:52px;color:#146B5E">${n}</span>` +
        `<div style="display:flex;flex-direction:column;align-items:center;gap:8px">${chips}</div></div>`);
    }
    if (cards.length < 7) throw new Error(`G1-223 checkPage: ${cards.length} numbers at level ${difficulty}`);
    return { bodyHtml: checkGrid(cards, { cols: 2 }), meta: {} };
  },
};
