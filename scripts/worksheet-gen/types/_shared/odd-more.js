/**
 * odd-more.js — the new templates of the Odd & Even maker (NEW-TEMPLATES §10, 2026-11-01). Print-only (the maker's
 * answer key; a screen version comes with the generic screen engine, docs/makers/INTERACTIVE-AND-SHARING.md). The
 * words "odd" / "even" on every page are the published K-016 / G1-351 chip words (data/b4/odd-and-even.js `chips`),
 * in the locale's own order (`houseOrder`). Four modes:
 *
 *   stripes  T1 · G1-455 — colour every even (L3: odd) number on the number chart; the stripes appear. L1 1-50,
 *            L2 1-100, L3 1-100 odd + write the ones digits every coloured number ends with. 2.OA.C.3.
 *   rule     T2 · G2-400 — discover the rule: three sums of one kind (odd + odd …), write each sum and circle odd or
 *            even, then circle the rule. L1 two kinds, the first sum worked · L2 four kinds to 20 · L3 four kinds to
 *            100. 2.OA.C.3 → 3.OA.D.9.
 *   sort     T3 · G1-456 — cut out the number cards and glue each into the odd or the even house. The split varies
 *            (never always half and half); the houses have more spaces than any page fills. L1 to 20 · L2 to 50 ·
 *            L3 to 100. 2.OA.C.3 (Grade 1 readiness).
 *   words    T4 · G1-457 — read the number word, circle odd or even. L1 to 20 with the numeral as a hint · L2 to 20 ·
 *            L3 to 100. 2.OA.C.3 + the number words.
 *
 * No number on a page is 0 (the operator's rule); the ones digit 0 is a digit (30 ends with 0).
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const hundredsChart = require('../../primitives/hundreds-chart.js');
const { bank } = require('../../lib/b4-common.js');
const { numberWord } = require('../../lib/number-words.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', GREY = '#8A8276', CREAM = '#FBF3E4';
const NUM = (s, size = 32, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:${color};line-height:1">${s}</span>`;

const LEVELS = {
  stripes: {
    1: { end: 50, colour: 'even', cell: 64 },
    2: { end: 100, colour: 'even', cell: 56 },
    3: { end: 100, colour: 'odd', cell: 52, ones: true },
  },
  rule: {
    1: { kinds: ['oo', 'oe'], max: 20, worked: true },   // review: oo + ee made both rules end in "even"
    2: { kinds: ['oo', 'ee', 'oe', 'eo'], max: 20 },
    3: { kinds: ['oo', 'ee', 'oe', 'eo'], max: 100 },
  },
  sort: {
    1: { cards: 8, lo: 1, hi: 20 },
    2: { cards: 10, lo: 1, hi: 50 },
    3: { cards: 10, lo: 11, hi: 99 },
  },
  words: {
    1: { cards: 10, lo: 1, hi: 20, hint: true },
    2: { cards: 10, lo: 1, hi: 20 },
    3: { cards: 10, lo: 21, hi: 99 },
  },
};

const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const par = (n) => (n % 2 === 0 ? 'even' : 'odd');

/** the two parity words in the locale's order; `correct` gets the key ring */
function parityChips(words, order, correct, size = 19) {
  return order.map((k) => `<span data-lcs-parity="${k}"${k === correct ? ' data-lcs-correct="1"' : ''} style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;padding:4px 12px;min-width:64px;border-radius:999px;border:2.5px solid ${GRID};background:#FFFFFF;font-family:'Nunito';font-weight:800;font-size:${size}px;color:${INK}">${words[k]}</span>`).join('');
}

function makeOddMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'numeral-charts',
    exerciseType: 'odd-and-even',
    themeAxis: { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const locale = String(args.locale || 'en').slice(0, 2);
      const B = bank('odd-and-even', locale);
      const words = B.chips;
      const order = B.houseOrder && B.houseOrder[0] === 'odd' ? ['odd', 'even'] : ['even', 'odd'];
      const content = (inner) => `<div data-ws-content data-lcs-odd-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'stripes') {
        const want = [];
        for (let v = 1; v <= d.end; v++) if (par(v) === d.colour) want.push(v);
        const chart = hundredsChart({ start: 1, end: d.end, cell: d.cell, highlights: key ? want : [], ...(ctx.screen ? { cellBoxes: { rings: want } } : {}) }, ctx);
        const svg = typeof chart === 'string' ? chart : chart.svg;
        let follow = '';
        if (d.ones) {
          // the ones digits every coloured number ends with: 1 3 5 7 9 (odd)
          const digits = d.colour === 'odd' ? [1, 3, 5, 7, 9] : [0, 2, 4, 6, 8];
          follow = `<div style="flex:0 0 auto;display:flex;justify-content:center;gap:12px;padding-top:12px" data-lcs-ones="${digits.join('')}">${digits.map((x) => answerBox({ w: 56, h: 52, answer: x })).join('')}</div>`;
        }
        const body = `<div style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:0" data-lcs-stripes="${d.colour}:${d.end}"${key ? ` data-lcs-key-sample="1"` : ''}>${svg}${follow}</div>`;
        return { bodyHtml: content(body), meta: { items: [d.colour + d.end] } };
      }

      if (mode === 'rule') {
        // a pair of numbers of the asked parities, the sum within max, never 0
        // every number from 2 up: + 1 again and again makes the pattern a counting trick, not a rule
        const pick = (p, hi) => { let x; do { x = rng.int(2, hi); } while (par(x) !== p); return x; };
        const P = { o: 'odd', e: 'even' };
        // which rule chip comes first: half the blocks the right one, drawn per page (never by block position)
        const firstRight = shuffle(d.kinds.map((_, k) => k % 2 === 0), rng);
        const blocks = d.kinds.map((kd, bi) => {
          const used = new Set();
          const sums = [];
          for (let t = 0; sums.length < 3 && t < 400; t++) {
            if (d.max - 2 < 3) break;
            // the SUM is drawn first, evenly, with the parity the pair makes, then split (2026-11-01: drawing a and then b
            // crowded the sums at the top of the range — "write 19" scored 19 %, settings-space)
            const want = kd[0] === kd[1] ? 'even' : 'odd';
            let sum; do { sum = rng.int(5, d.max); } while (par(sum) !== want);
            const a = pick(P[kd[0]], sum - 2), b = sum - a;
            if (b < 2 || par(b) !== P[kd[1]] || used.has(a + '+' + b)) continue;
            // a sum never equals a number printed in its block ("copy a number you see" scored 17 %)
            if (sums.some((x) => x.a === sum || x.b === sum || x.s === a || x.s === b)) continue;
            used.add(a + '+' + b);
            sums.push({ a, b, s: a + b });
          }
          if (sums.length < 3) throw new Error(`${id}: not enough sums for ${kd}`);
          const res = par(sums[0].s);
          const cards = sums.map((x, k) => {
            const worked = d.worked && k === 0;
            const box = answerBox({ w: d.max > 20 ? 64 : 56, h: 46, answer: x.s, label: worked ? NUM(x.s, 26, TEAL) : '' });
            const chips = order.map((p) => `<span data-lcs-parity="${p}"${p === par(x.s) ? ' data-lcs-correct="1"' : ''}${worked && p === par(x.s) ? ' data-lcs-worked="1"' : ''} style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;padding:3px 10px;border-radius:999px;border:2.5px solid ${worked && p === par(x.s) ? CORAL : GRID};background:#FFFFFF;font-family:'Nunito';font-weight:800;font-size:15px;color:${INK}">${words[p]}</span>`).join('');
            return `<div data-lcs-sum="${x.a}+${x.b}=${x.s}" style="flex:1 1 0;display:flex;flex-direction:column;align-items:center;gap:6px"><span style="display:flex;align-items:center;gap:6px">${NUM(x.a, 26)}${NUM('+', 24, TEAL)}${NUM(x.b, 26)}${NUM('=', 24, GREY)}${box}</span><span style="display:flex;gap:6px">${chips}</span></div>`;
          });
          // the rule: the right one and its opposite, the right one first on half the blocks (the order is no tell)
          const wrong = res === 'odd' ? 'even' : 'odd';
          const rules = (firstRight[bi] ? [res, wrong] : [wrong, res]);
          const ruleChips = rules.map((r) => `<span data-lcs-rule="${r}"${r === res ? ' data-lcs-correct="1"' : ''} style="flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:999px;border:2.5px solid ${GRID};background:#FFFFFF;font-family:'Nunito';font-weight:800;font-size:17px;color:${INK}">${words[P[kd[0]]]} + ${words[P[kd[1]]]} = ${words[r]}</span>`).join('');
          return `<div class="ws-card-stage" data-lcs-block="${kd}" style="flex-direction:column;justify-content:space-evenly;align-items:stretch;gap:8px;padding:6px 14px"><div style="display:flex;justify-content:space-between;gap:8px">${cards.join('')}</div><div style="display:flex;justify-content:center;gap:16px">${ruleChips}</div></div>`;
        });
        const shuffled = d.worked ? blocks : shuffle(blocks, rng);
        return { bodyHtml: content(cardGrid({ cards: shuffled, cols: 1, rows: shuffled.length })), meta: { items: d.kinds } };
      }

      if (mode === 'sort') {
        // the odd / even split varies per page (never a fixed half): between 3 and cards - 3 odd cards
        const nOdd = rng.int(3, d.cards - 3);
        const pool = (p) => shuffle(Array.from({ length: d.hi - d.lo + 1 }, (_, k) => d.lo + k).filter((v) => par(v) === p), rng);
        const nums = shuffle([...pool('odd').slice(0, nOdd), ...pool('even').slice(0, d.cards - nOdd)], rng);
        const SLOTS = d.cards - 2;   // more spaces than any page fills, so the box count tells nothing
        const house = (p) => {
          const mine = nums.filter((v) => par(v) === p).sort((a, b) => a - b);
          const slots = Array.from({ length: SLOTS }, (_, k) => (ctx.screen
            ? answerBox({ w: 92, h: 80, answer: k < mine.length ? mine[k] : '-' }).replace('data-lcs-answer=', `data-lcs-set="${p}" data-lcs-answer=`)
            : answerBox({ w: 92, h: 80, answer: key && k < mine.length ? mine[k] : '' }))).join('');
          return `<div class="ws-subgroup" data-lcs-house="${p}" style="flex:1 1 0;display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px;border-radius:14px;background:${p === 'even' ? '#DDEBE8' : '#FBE3D8'}">` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:${INK}">${words[p]}</span>` +
            `<span style="display:grid;grid-template-columns:repeat(3,92px);gap:8px;justify-content:center">${slots}</span></div>`;
        };
        const houses = `<div style="flex:0 0 auto;display:flex;gap:16px">${order.map(house).join('')}</div>`;
        const scissors = `<svg width="26" height="20" viewBox="0 0 26 20" aria-hidden="true"><circle cx="5" cy="5" r="4" fill="none" stroke="${GREY}" stroke-width="2"/><circle cx="5" cy="15" r="4" fill="none" stroke="${GREY}" stroke-width="2"/><path d="M8 7 L24 15 M8 13 L24 5" stroke="${GREY}" stroke-width="2"/></svg>`;
        const strip = `<div style="flex:0 0 auto;display:flex;align-items:center;gap:8px;margin-top:22px;padding-top:14px;padding-bottom:4px;border-top:2.5px dashed ${GRID}">${scissors}<span style="display:flex;flex-wrap:wrap;gap:8px">${nums.map((v) => `<span data-lcs-sortcard="${v}" style="width:92px;height:80px;display:inline-flex;align-items:center;justify-content:center;border:2.5px dashed ${GRID};background:#FFFFFF;box-sizing:border-box">${NUM(v, 34)}</span>`).join('')}</span></div>`;
        return { bodyHtml: content(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;padding-top:6px">${houses}${strip}</div>`), meta: { items: nums } };
      }

      // words: read the number word, circle odd or even
      const nums = shuffle(Array.from({ length: d.hi - d.lo + 1 }, (_, k) => d.lo + k), rng).slice(0, d.cards);
      const word = (n) => (locale === 'nl' && n === 1 ? 'één' : numberWord(n, locale));   // nl: "een" is also the article
      const longest = Math.max(...nums.map((n) => word(n).length));
      const fsz = Math.max(15, Math.min(26, Math.floor(285 / (longest * 0.62))));   // one size per page, fitted to the longest word (fi/de compounds cannot wrap)
      const cards = nums.map((n) => `<div class="ws-card-stage" data-lcs-word-num="${n}" style="flex-direction:column;justify-content:center;align-items:center;gap:10px">` +
        `<span style="font-family:'Nunito';font-weight:800;font-size:${fsz}px;color:${INK};text-align:center;line-height:1.15">${word(n)}${d.hint ? ` <span style="font-family:'Baloo 2';font-size:19px;color:${GREY}">(${n})</span>` : ''}</span>` +
        `<span style="display:flex;gap:12px">${parityChips(words, order, par(n))}</span></div>`);
      return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: nums } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const box = document.querySelector('[data-lcs-odd-mode]');
        if (!box) return ['no content'];
        const m = box.dataset.lcsOddMode;
        const n = Number;
        const par = (v) => (v % 2 === 0 ? 'even' : 'odd');
        if (m === 'rule') document.querySelectorAll('[data-lcs-block]').forEach((b) => {
          const kd = b.dataset.lcsBlock;
          const sums = [...b.querySelectorAll('[data-lcs-sum]')];
          if (sums.length !== 3) fails.push('block ' + kd + ': ' + sums.length + ' sums');
          sums.forEach((s) => {
            const [l, r] = s.dataset.lcsSum.split('='); const [a, c] = l.split('+').map(n);
            if (a + c !== n(r) || par(a)[0] !== kd[0] || par(c)[0] !== kd[1]) fails.push('sum ' + s.dataset.lcsSum + ' in ' + kd);
            const ok = s.querySelectorAll('[data-lcs-correct]'); if (ok.length !== 1 || ok[0].dataset.lcsParity !== par(n(r))) fails.push('parity chip ' + s.dataset.lcsSum);
          });
          const rule = b.querySelectorAll('[data-lcs-rule][data-lcs-correct]');
          const want = kd[0] === kd[1] ? 'even' : 'odd';
          if (rule.length !== 1 || rule[0].dataset.lcsRule !== want) fails.push('rule ' + kd);
        });
        if (m === 'sort') {
          const cards = [...document.querySelectorAll('[data-lcs-sortcard]')].map((c) => n(c.dataset.lcsSortcard));
          const odd = cards.filter((v) => v % 2).length;
          if (odd < 3 || cards.length - odd < 3) fails.push(`split ${odd}/${cards.length - odd}`);
          if (new Set(cards).size !== cards.length) fails.push('a card twice');
          document.querySelectorAll('[data-lcs-house]').forEach((h) => {
            const mine = cards.filter((v) => par(v) === h.dataset.lcsHouse).length;
            if (h.querySelectorAll('.ws-answerbox').length <= mine) fails.push('the house has no spare space (a count tell)');
          });
        }
        if (m === 'words') document.querySelectorAll('[data-lcs-word-num]').forEach((c) => {
          const v = n(c.dataset.lcsWordNum); const ok = c.querySelectorAll('[data-lcs-correct]');
          if (v < 1 || ok.length !== 1 || ok[0].dataset.lcsParity !== par(v)) fails.push('word card ' + v);
        });
        if (m === 'stripes') { const s = box.querySelector('[data-lcs-stripes]'); if (!s || !s.querySelector('svg')) fails.push('no chart'); }
        // nothing may run out of its card
        document.querySelectorAll('.ws-card-stage').forEach((c, i) => {
          const cr = c.getBoundingClientRect();
          c.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push(`card ${i + 1}: something runs out of it`); });
        });
        return [...new Set(fails)];
      });
    },
  };
}

module.exports = { makeOddMoreType, LEVELS };
