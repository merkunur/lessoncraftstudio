/**
 * G2-490 — Number of the Day to 1000 (Number of the Day maker 2026-11-02, NEW-TEMPLATES §51 T1; 2.NBT.A.1 / A.3 / B.8,
 * the whole grade-2 place-value cluster on one page; de "Zahl des Tages bis 1000", fr "le nombre du jour CE1/CE2", nl
 * "getal van de dag tot 1000"): the three-digit version of the routine page (G1-257 stops at 99). One number big in a
 * card; the child fills: before and after, even or odd (circle), the number in words (one full-width line: a Finnish or
 * Dutch number word is one long word), hundreds / tens / ones, the expanded form (its non-zero parts: 300 + 40 + 7,
 * 500 + 7), 100 more and less, 10 more and less, and the neighbour tens and hundreds (340 < 347 < 350, 300 < 347 < 400).
 * The words are lib/number-words-1000.js (the published 0..100 table + the hundreds of each language); the labels
 * data/number-of-the-day/nod-new.js, data/b2/labels.js, data/parity-words.json.
 * Every answer is between 1 and 999 (N ≤ 899, so 100 more stays below 1000; N ≥ 101, so 100 less is at least 1). The
 * teacher may type her own number (tap the big number): 101 … 899, not a multiple of ten (its neighbour tens would be
 * itself). The key prints the answers in the boxes (the word in its box) and rings even / odd.
 * Levels: 1 a number to 499 with no zero digit · 2 a number to 899 with no zero digit · 3 a number with a zero ten
 * (507: expanded 500 + 7, neighbour tens 500 and 510).
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { numberWord1000, numberWordAlts } = require('../../lib/number-words-1000.js');
const { LABELS } = require('../../data/b2/labels.js');
const PARITY = require('../../data/parity-words.json').words;
const { NOD1000 } = require('../../data/number-of-the-day/nod-new.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const noZero = (n) => n % 10 !== 0 && Math.floor(n / 10) % 10 !== 0;
const D = {
  1: { min: 101, max: 499, ok: noZero },
  2: { min: 101, max: 899, ok: noZero },
  3: { min: 101, max: 899, ok: (n) => Math.floor(n / 10) % 10 === 0 && n % 10 !== 0 },
};
const OWN_OK = (n) => Number.isInteger(n) && n >= 101 && n <= 899 && n % 10 !== 0;

const cell = (label, inner, w, extra) =>
  `<div class="ws-card" style="width:${w}px;padding:10px 12px;gap:6px;flex:0 0 auto;box-sizing:border-box" ${extra || ''}>` +
  `<span style="font-family:'Nunito';font-weight:800;font-size:14px;color:#8A8276;line-height:1.15" data-lcs-label>${label}</span>` +
  `<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap" data-lcs-cell-body>${inner}</div></div>`;
const big = (txt, px) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;color:${T.ink};white-space:nowrap">${txt}</span>`;

module.exports = {
  id: 'G2-490',
  slug: 'number-of-the-day-to-1000',
  gradeBand: 'G2',
  assetClass: 'none',
  exerciseType: 'number-of-the-day',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Number of the Day to 1000', instruction: 'Look at the big number. Fill in every box on the page for that number.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const W = NOD1000[L], NL = LABELS[L] && LABELS[L].numberOfDay, P = PARITY[L];
    if (!W || !NL || !P) throw new Error(`G2-490: no labels for ${L}`);
    let N, g = 0;
    do { N = rng.int(d.min, d.max); g++; } while (!d.ok(N) && g < 400);
    // the teacher's own number (tap the big number): 101 … 899, never a multiple of ten
    const own = slot.text(ctx, String(N), 'n', 3);
    if (own !== String(N)) { const v = Number(own); if (/^\d{3}$/.test(own) && OWN_OK(v)) N = v; else slot.refuse(ctx, 'n'); }
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const word = numberWord1000(N, L);
    const h = Math.floor(N / 100), t = Math.floor(N / 10) % 10, o = N % 10;
    const answers = [];
    const box = (w, hh, a) => { answers.push(a); return answerBox({ w, h: hh, answer: a }); };

    // A: the number · before and after · even or odd
    const numeral = slot.stamp(ctx, 'n', 0, `<div class="ws-card" style="width:190px;height:136px;background:#FFFFFF;border:3px solid ${T.teal};border-radius:16px;align-items:center;justify-content:center;flex:0 0 auto;box-sizing:border-box" data-lcs-cell="numeral">`) +
      `<span style="font-family:'Baloo 2';font-weight:700;font-size:86px;line-height:1;color:${T.ink}" data-lcs-numeral>${N}</span></div>`;
    const ba = cell(W.beforeAfter || NL.beforeAfter, `<span style="display:flex;align-items:center;gap:8px">${box(66, 54, N - 1)}${big(N, 26)}${box(66, 54, N + 1)}</span>`, 236, 'data-lcs-cell="before-after"');
    const even = N % 2 === 0;
    const chip = (txt, right) => `<span data-lcs-pick="1"${mark && right ? ' data-lcs-correct="1"' : ''} style="padding:6px 16px;border:2.5px solid ${T.grid};border-radius:999px;background:#FFFFFF;font:700 22px/1.2 'Baloo 2',cursive;color:${T.ink};white-space:nowrap">${txt}</span>`;
    const parity = cell(W.parity, `<span class="ws-choices" style="display:flex;flex-direction:column;gap:10px;align-items:center">${chip(P.even, even)}${chip(P.odd, !even)}</span>`, 218, 'data-lcs-cell="parity"');
    const rowA = `<div style="display:flex;gap:14px;justify-content:space-between">${numeral}${ba}${parity}</div>`;

    // B: the number in words, one full-width box (a Finnish or Dutch number word is one long word); the screen types it
    // (the letter pad), other spellings a teacher accepts as alts (lib/number-words-1000.js)
    const alts = numberWordAlts(N, L);
    const wordBox = `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${word}"${alts.length ? ` data-lcs-alts="${alts.join('|')}"` : ''}` : ''} style="width:620px;height:60px"></span>`;
    const rowB = cell(W.numberWord || NL.numberWord, wordBox, 672, `data-lcs-cell="word" data-lcs-word="${word}"`);

    // C: hundreds / tens / ones · expanded form (its non-zero parts)
    const head = (s) => `<span style="font-family:'Nunito';font-weight:800;font-size:13px;color:#8A8276;text-align:center">${s}</span>`;
    const col = (s, a) => `<span style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1">${head(s)}${box(72, 60, a)}</span>`;
    const chart = cell(W.placeValue, `<span style="display:flex;gap:8px;width:100%;justify-content:space-between">${col(W.hundreds, h)}${col(NL.tens, t)}${col(NL.ones, o)}</span>`, 320, 'data-lcs-cell="place-value"');
    const parts = [h * 100, t * 10, o].filter((x) => x > 0);
    const expanded = cell(W.expanded, `<span style="display:flex;align-items:center;gap:6px">${big(`${N} =`, 22)}${parts.map((p) => box(parts.length === 3 ? 62 : 80, 56, p)).join(big('+', 22))}</span>`, 338, `data-lcs-cell="expanded" data-lcs-parts="${parts.join('+')}"`);
    const rowC = `<div style="display:flex;gap:14px;justify-content:space-between">${chart}${expanded}</div>`;

    // D: 100 more and less · 10 more and less
    const eq = (op, k) => `<span style="display:flex;align-items:center;gap:8px" data-lcs-eq="${op}${k}">${big(`${N} ${op === '+' ? '+' : '−'} ${k} =`, 24)}${box(72, 50, op === '+' ? N + k : N - k)}</span>`;
    const more = (label, k) => cell(label, `<div style="display:flex;flex-direction:column;gap:10px">${eq('+', k)}${eq('-', k)}</div>`, 329, `data-lcs-cell="more-less-${k}"`);
    const rowD = `<div style="display:flex;gap:14px;justify-content:space-between">${more(W.more100, 100)}${more(W.more10, 10)}</div>`;

    // E: the neighbour tens and hundreds
    const lt = `<span style="font:700 26px/1 'Baloo 2',cursive;color:${T.teal}">&lt;</span>`;
    // each row says what it encloses with (two rows of the same shape could be swapped: 300 < 347 < 400 is true too)
    const tag = (s) => `<span style="font-family:'Nunito';font-weight:800;font-size:14px;color:#8A8276">${s}</span>`;
    const between = (lo, hi, k, label) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px">${tag(label)}<span style="display:flex;align-items:center;gap:8px" data-lcs-between="${k}">${box(72, 50, lo)}${lt}${big(N, 24)}${lt}${box(72, 50, hi)}</span></span>`;
    const tenLo = Math.floor(N / 10) * 10, hunLo = h * 100;
    const rowE = cell(W.between, `<span style="display:flex;gap:40px;justify-content:center">${between(tenLo, tenLo + 10, 10, NL.tens)}${between(hunLo, hunLo + 100, 100, W.hundreds)}</span>`, 672, 'data-lcs-cell="between"');

    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:space-evenly" data-ws-content data-lcs-n="${N}">${rowA}${rowB}${rowC}${rowD}${rowE}</div>`,
      meta: { N, word, parity: even ? 'even' : 'odd', answers },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-n]');
      if (!root) return ['no page root'];
      const N = +root.dataset.lcsN;
      if (+document.querySelector('[data-lcs-numeral]').textContent !== N) fails.push('numeral != N');
      const vals = (k) => [...document.querySelectorAll(`[data-lcs-cell="${k}"] [data-lcs-answer]`)].map((b) => +b.dataset.lcsAnswer);
      if (vals('before-after').join() !== `${N - 1},${N + 1}`) fails.push('before/after');
      if (vals('place-value').join() !== [Math.floor(N / 100), Math.floor(N / 10) % 10, N % 10].join()) fails.push('place value');
      const ex = vals('expanded');
      if (ex.reduce((a, b) => a + b, 0) !== N || ex.some((x) => x === 0)) fails.push(`expanded ${ex}`);
      document.querySelectorAll('[data-lcs-eq]').forEach((e) => { const m = /^([+-])(\d+)$/.exec(e.dataset.lcsEq), a = +e.querySelector('[data-lcs-answer]').dataset.lcsAnswer; if (a !== (m[1] === '+' ? N + +m[2] : N - +m[2])) fails.push('equation ' + e.dataset.lcsEq); });
      document.querySelectorAll('[data-lcs-between]').forEach((e) => { const k = +e.dataset.lcsBetween, [lo, hi] = [...e.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer); if (!(lo < N && N < hi && hi - lo === k && lo % k === 0)) fails.push('between ' + k); });
      // every number answer between 1 and 999 — a digit of the place-value chart may be 0 (the 0 tens of 507)
      [...document.querySelectorAll('[data-lcs-answer]')].filter((b) => !b.closest('[data-lcs-cell="word"]')).forEach((b) => { const a = +b.dataset.lcsAnswer, digit = !!b.closest('[data-lcs-cell="place-value"]'); if (!(a >= (digit ? 0 : 1) && a <= 999)) fails.push(`answer ${a} outside ${digit ? 0 : 1}-999`); });
      const word = document.querySelector('[data-lcs-word]').dataset.lcsWord;
      if (document.body.textContent.toLowerCase().replace(/[\s-]/g, '').includes(word.toLowerCase().replace(/[\s-]/g, ''))) fails.push('number word printed');
      const root2 = root.getBoundingClientRect();
      document.querySelectorAll('.ws-body .ws-card').forEach((c) => { const r = c.getBoundingClientRect(); if (r.right > root2.right + 1 || r.bottom > root2.bottom + 1) fails.push(`${c.dataset.lcsCell} leaves the page`); c.querySelectorAll('[data-lcs-answer], svg').forEach((x) => { const q = x.getBoundingClientRect(); if (q.left < r.left - 0.5 || q.right > r.right + 0.5 || q.bottom > r.bottom + 0.5) fails.push(`${c.dataset.lcsCell}: content past its card`); }); });
      return fails;
    });
  },
};
