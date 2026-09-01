/**
 * G1-210 — Number words ↔ numerals. Peak native-rebuild leverage: the words
 * come from lib/number-words.js (fr soixante-dix, da femoghalvtreds, de/nl
 * inversion, it ventitré, fi agglutination — every locale is genuinely
 * different work). Direction is numeral → CIRCLE the word (safe: no
 * handwriting judging). The digit-SWAP distractor (21 vs 12) is deliberate —
 * it is exactly the Zahlendreher error the inversion locales assign this
 * worksheet to fight. CCSS 2.NBT.A.3 / de Zahlwörter / pt números por extenso.
 * d1: within 20 · d2: within 100 · d3: numeral↔word matching columns.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { numberWord } = require('../../lib/number-words.js');

const NUMERAL = (v, size) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:#146B5E">${v}</span>`;
const wordChip = (word, value, correct) =>
  `<span style="display:inline-flex;align-items:center;justify-content:center;background:#FFFFFF;` +
  `border:2.5px solid #146B5E;border-radius:22px;padding:6px 18px;font-family:'Nunito';font-weight:800;` +
  `font-size:17px;color:#3A3530" data-lcs-choice="${value}"${correct ? ' data-lcs-correct="1"' : ''}>${word}</span>`;

function distractorValues(n, max, rng) {
  const pool = new Set();
  const swap = +String(n).split('').reverse().join('');
  if (swap !== n && swap >= 1 && swap <= max) pool.add(swap); // the Zahlendreher trap
  [n - 1, n + 1, n - 10, n + 10, n - 2, n + 2].forEach((v) => {
    if (v >= 0 && v <= max && v !== n) pool.add(v);
  });
  const arr = rng.shuffle([...pool]);
  return arr.slice(0, 2);
}

module.exports = {
  id: 'G1-210',
  slug: 'number-words-and-numerals',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: 'number-words',
  themeAxis: { applicable: false },
  difficulty: {
    1: { mode: 'circle', min: 3, max: 20, cards: 6, cols: 2, rows: 3 },
    2: { mode: 'circle', min: 13, max: 100, cards: 6, cols: 2, rows: 3 },
    3: { mode: 'match', min: 13, max: 100, items: 5 },
  },
  i18n: {
    en: {
      title: 'Number Words',
      instruction: 'Read the number. Circle the word that matches it.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const used = new Set();
    // nt20-VAR: pool 'tens' = round tens only (the forty-vs-fourteen page)
    const tensPool = d.pool === 'tens' ? [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].filter((v) => v >= d.min && v <= d.max) : null;
    const pickN = () => {
      let n, guard = 0;
      do { n = tensPool ? rng.pick(tensPool) : rng.int(d.min, d.max); guard++; } while (used.has(n) && guard < 200);
      used.add(n);
      return n;
    };
    const distractorsFor = (n) => {
      if (!tensPool) return distractorValues(n, d.max, rng);
      // tens page: the teen counterpart (40 ↔ 14 — THE classic word trap) + a neighbor ten
      const pool = new Set();
      const teen = n / 10 + 10;
      if (n >= 30 && n <= 90) pool.add(teen);
      [n - 10, n + 10].forEach((v) => { if (v >= 10 && v <= d.max && v !== n) pool.add(v); });
      if (pool.size < 2) pool.add(n === 10 ? 12 : n - 1);
      return rng.shuffle([...pool]).slice(0, 2);
    };

    // nt20-VAR mode 'write': numeral + blank writing line per card, with a
    // shuffled word BANK banner on top — the child finds and copies the right
    // word (G1-honest: copying, not spelling from memory; self-checking).
    if (d.mode === 'write') {
      const ns = Array.from({ length: d.cards }, pickN);
      const bank = rng.shuffle(ns.slice());
      // compact chips + card metrics — long number words (es diecisiete,
      // pt dezessete) wrap the bank to three rows and overflow the page at
      // the roomier first-cut sizes
      const bankHtml = `<div class="ws-scene-banner" style="gap:12px;flex-wrap:wrap" data-lcs-bank>` +
        bank.map((v) =>
          `<span style="font-family:'Nunito';font-weight:800;font-size:16px;color:#3A3530;background:#FFFFFF;` +
          `border:2px solid #F0E4CB;border-radius:16px;padding:4px 12px" data-lcs-bank-word="${v}">${numberWord(v, loc)}</span>`).join('') +
        `</div>`;
      const cards = ns.map((n) =>
        `<div class="ws-card-stage" style="flex-direction:column;gap:12px;justify-content:center" data-lcs-write="${n}">` +
        NUMERAL(n, 56) +
        `<div style="width:82%;height:50px;border-bottom:2.5px solid #8A8276"></div></div>`);
      return {
        bodyHtml: bankHtml + `<div style="margin-top:10px">${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
        meta: {},
      };
    }

    if (d.mode === 'match') {
      const ns = Array.from({ length: d.items }, pickN);
      let order;
      do { order = rng.shuffle(ns.map((_, i) => i)); } while (order.some((v, i) => v === i));
      const itemH = Math.floor((740 - (d.items - 1) * 14) / d.items);
      const left = ns.map((n) =>
        `<div class="ws-match-item" style="width:170px;height:${itemH}px" data-lcs-left="${n}">` +
        NUMERAL(n, 44) + `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
      const right = order.map((idx) =>
        `<div class="ws-match-item ws-match-item--plain" style="width:300px;height:${itemH}px;padding:0 14px" data-lcs-right="${ns[idx]}">` +
        `<span style="font-family:'Nunito';font-weight:800;font-size:20px;color:#3A3530;text-align:center">${numberWord(ns[idx], loc)}</span>` +
        `<span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
      return {
        bodyHtml: `<div class="ws-match" style="padding:6px 40px">` +
          `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
        meta: {},
      };
    }

    const cards = [];
    for (let i = 0; i < d.cards; i++) {
      const n = pickN();
      const opts = rng.shuffle([n, ...distractorsFor(n)]);
      const chips = opts.map((v) => wordChip(numberWord(v, loc), v, v === n)).join('');
      cards.push(
        `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-n="${n}">` +
        NUMERAL(n, 52) +
        `<div style="display:flex;flex-direction:column;align-items:center;gap:8px">${chips}</div></div>`
      );
    }
    return { bodyHtml: cardGrid({ cards, cols: d.cols, rows: d.rows }), meta: {} };
  },

  async verify(page) {
    // DOM facts extracted in-page; word-correctness asserted Node-side
    // against the same engine (the page cannot require lib/number-words).
    const facts = await page.evaluate(() => {
      const out = { mode: null, cards: [], match: null, write: null };
      const writes = [...document.querySelectorAll('[data-lcs-write]')];
      if (writes.length) {
        out.mode = 'write';
        out.write = {
          ns: writes.map((e) => +e.dataset.lcsWrite),
          bank: [...document.querySelectorAll('[data-lcs-bank-word]')].map((e) => ({
            n: +e.dataset.lcsBankWord, word: e.textContent.trim(),
          })),
        };
        return out;
      }
      const stages = [...document.querySelectorAll('[data-lcs-card] [data-lcs-n]')];
      if (stages.length) {
        out.mode = 'circle';
        out.cards = stages.map((st) => ({
          n: +st.dataset.lcsN,
          chips: [...st.querySelectorAll('[data-lcs-choice]')].map((c) => ({
            value: +c.dataset.lcsChoice,
            word: c.textContent.trim(),
            correct: c.hasAttribute('data-lcs-correct'),
          })),
        }));
      } else {
        out.mode = 'match';
        out.match = {
          left: [...document.querySelectorAll('[data-lcs-left]')].map((e) => +e.dataset.lcsLeft),
          right: [...document.querySelectorAll('[data-lcs-right]')].map((e) => ({
            n: +e.dataset.lcsRight, word: e.textContent.trim(),
          })),
        };
      }
      return out;
    });
    const fails = [];
    // locale reaches verify via the rendered <html lang> — read it from the page
    const lang = await page.evaluate(() => document.documentElement.lang || 'en');
    const loc = (lang || 'en').slice(0, 2);
    if (facts.mode === 'write') {
      const { ns, bank } = facts.write;
      if (ns.length < 4) fails.push(`only ${ns.length} write cards`);
      if (new Set(ns).size !== ns.length) fails.push('duplicate numerals');
      if (bank.map((b) => b.n).sort().join() !== ns.slice().sort().join()) fails.push('bank not a permutation of the cards');
      bank.forEach((b) => {
        const want = numberWord(b.n, loc);
        if (b.word !== want) fails.push(`bank word "${b.word}" != engine "${want}" for ${b.n}`);
      });
      return fails;
    }
    if (facts.mode === 'circle') {
      if (!facts.cards.length) fails.push('no cards');
      facts.cards.forEach((c, i) => {
        const correct = c.chips.filter((ch) => ch.correct);
        if (correct.length !== 1) fails.push(`card ${i + 1}: ${correct.length} correct chips`);
        else if (correct[0].value !== c.n) fails.push(`card ${i + 1}: correct chip value != ${c.n}`);
        if (new Set(c.chips.map((ch) => ch.value)).size !== c.chips.length) fails.push(`card ${i + 1}: duplicate options`);
        if (c.chips.length < 3) fails.push(`card ${i + 1}: only ${c.chips.length} options`);
        c.chips.forEach((ch) => {
          const want = numberWord(ch.value, loc);
          if (ch.word !== want) fails.push(`card ${i + 1}: word "${ch.word}" != engine "${want}" for ${ch.value}`);
        });
      });
    } else {
      const { left, right } = facts.match;
      if (!left.length) fails.push('no match rows');
      if (left.slice().sort().join() !== right.map((r) => r.n).sort().join()) fails.push('right not a permutation of left');
      right.forEach((r, i) => {
        const want = numberWord(r.n, loc);
        if (r.word !== want) fails.push(`row ${i + 1}: word != engine for ${r.n}`);
        if (left[i] === r.n) fails.push(`row ${i + 1}: straight-across`);
      });
    }
    return fails;
  },
};
