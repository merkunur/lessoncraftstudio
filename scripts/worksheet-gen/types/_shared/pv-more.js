/**
 * pv-more.js — the new templates of the Place Value & Rounding maker (NEW-TEMPLATES §11, 2026-11-01). Print-only (the
 * maker's answer key; a screen version comes with the generic screen engine). Five modes:
 *
 *   expanded T1 · G2-401 — expanded form both ways: 300 + 40 + 5 = [ ] and 628 = [ ] + [ ] + [ ]. L1 two-digit ·
 *            L2 three-digit · L3 three-digit, the compose cards with a zero place (400 + 5) or the parts out of order
 *            (8 + 600 + 20). 1.NBT.B.2, 2.NBT.A.3.
 *   chart    T2 · G2-402 — a place-value chart with the school's column letters and two sets of digit cards to cut out
 *            (material, no key). L1 tens and ones · L2 hundreds, tens and ones · L3 the same + six lines to record.
 *   rename   T3 · G2-403 — how many tens? 340 = [ ] tens · 26 tens = [ ]. L1 within 100 · L2 within 1000 ·
 *            L3 hundreds and tens mixed (600 = [ ] tens). 2.NBT.A.1a.
 *   overflow T4 · G2-404 — blocks with more than nine of a kind: 12 tens and 5 ones = [ ]. L1 too many tens ·
 *            L2 too many ones · L3 a hundred with too many tens AND ones. 2.NBT.A.1, 2.NBT.B.7.
 *   riddle   T5 · G2-405 — who am I? 2-3 place-value clues; a solver proves exactly one number fits. L1 two clues,
 *            two-digit · L2 three clues, two-digit · L3 three clues, three-digit. 2.NBT.A.1, 2.NBT.A.3.
 *
 * Per-locale words: the unit words (tens / hundreds) and the riddle frames live in data/place-value/words.js (11
 * locales, native-reviewed). No count a child writes is 0; no unit count is 1 (no "1 tens").
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const baseTenBlocks = require('../../primitives/base-ten.js');
const { placeHeads } = require('../../lib/place-heads.js');
const { PV_WORDS } = require('../../data/place-value/words.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', GREY = '#8A8276', CREAM = '#FBF3E4';
const NUM = (s, size = 30, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:${color};line-height:1">${s}</span>`;
const PLUS = (size = 28) => NUM('+', size, TEAL);
const EQ = (size = 28) => NUM('=', size, GREY);
const WORD = (s, size = 22) => `<span style="font-family:'Nunito';font-weight:800;font-size:${size}px;color:${INK}">${s}</span>`;

const LEVELS = {
  expanded: {
    1: { cards: 10, digits: 2 },
    2: { cards: 10, digits: 3 },
    3: { cards: 10, digits: 3, zero: true, mixOrder: true },
  },
  chart: {
    1: { places: 2 },
    2: { places: 3 },
    3: { places: 3, record: 6 },
  },
  rename: {
    1: { cards: 10, max: 100, units: ['tens'] },
    2: { cards: 10, max: 1000, units: ['tens'] },
    3: { cards: 10, max: 1000, units: ['tens', 'hundreds'], crossUnit: true },
  },
  overflow: {
    1: { cards: 4, over: 'tens' },
    2: { cards: 4, over: 'ones' },
    3: { cards: 4, over: 'both', hundred: true },
  },
  // the Logic & Math Puzzles T3 (G1-476): every number from 1 to hi, the range said in the instruction ({MAX}); no place-value clue
  riddleRange: {
    // (between + even/odd alone is never one answer without an end number fitting too — the ones clue makes it unique)
    1: { cards: 6, lo: 1, hi: 20, clues: 2, kinds: ['between', 'even', 'odd', 'ones'] },
    2: { cards: 6, lo: 1, hi: 50, clues: 2, kinds: ['between', 'even', 'odd', 'ones', 'digitSum'] },
    3: { cards: 6, lo: 1, hi: 100, clues: 3, kinds: ['between', 'even', 'odd', 'ones', 'digitSum'] },
  },
  riddle: {
    1: { cards: 6, digits: 2, clues: 2 },
    2: { cards: 6, digits: 2, clues: 3 },
    3: { cards: 6, digits: 3, clues: 3 },
  },
};

const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const fill = (frame, vars) => frame.replace(/\{(\w+)\}/g, (_, k) => String(vars[k]));

/** the riddle clues: each is a test on the number and its sentence vars */
const CLUES = {
  // two-digit: "I have 4 tens"; three-digit: the DIGIT ("my tens digit is 5") — 952 has 95 tens (review: G2-403 teaches it)
  tens: { ok: (n, c) => Math.floor(n / 10) % 10 === c.t, make: (n) => ({ t: Math.floor(n / 10) % 10 }), valid: (v) => v.t >= 2, digits: 2 },
  ones: { ok: (n, c) => n % 10 === c.o, make: (n) => ({ o: n % 10 }), valid: (v) => v.o >= 2, digits: 2 },
  tensDigit: { ok: (n, c) => Math.floor(n / 10) % 10 === c.t, make: (n) => ({ t: Math.floor(n / 10) % 10 }), valid: (v) => v.t >= 1, digits: 3 },
  onesDigit: { ok: (n, c) => n % 10 === c.o, make: (n) => ({ o: n % 10 }), valid: (v) => v.o >= 1, digits: 3 },
  hundreds: { ok: (n, c) => Math.floor(n / 100) === c.h, make: (n) => ({ h: Math.floor(n / 100) }), valid: (v) => v.h >= 2, digits: 3 },
  onesMore: { ok: (n, c) => n % 10 - Math.floor(n / 10) % 10 === c.k, make: (n) => ({ k: n % 10 - Math.floor(n / 10) % 10 }), valid: (v) => v.k >= 1 },
  onesLess: { ok: (n, c) => Math.floor(n / 10) % 10 - n % 10 === c.k, make: (n) => ({ k: Math.floor(n / 10) % 10 - n % 10 }), valid: (v) => v.k >= 1 },
  between: { ok: (n, c) => n > c.a && n < c.b, make: (n, rng) => { const w = rng.int(6, 14); const a = n - rng.int(1, w - 1); return { a, b: a + w }; }, valid: (v) => v.a >= 1 },
  even: { ok: (n) => n % 2 === 0, make: () => ({}), valid: () => true, when: (n) => n % 2 === 0 },
  odd: { ok: (n) => n % 2 === 1, make: () => ({}), valid: () => true, when: (n) => n % 2 === 1 },
  digitSum: { ok: (n, c) => String(n).split('').reduce((s, x) => s + +x, 0) === c.s, make: (n) => ({ s: String(n).split('').reduce((s, x) => s + +x, 0) }), valid: (v) => v.s >= 2 },
};

function makePvMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'numeral-charts',
    exerciseType: 'base-ten',
    themeAxis: { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const locale = String(args.locale || 'en').slice(0, 2);
      const W = PV_WORDS[locale];
      if (!W) throw new Error(`${id}: no place-value words for ${locale}`);
      const content = (inner) => `<div data-ws-content data-lcs-pv-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'expanded') {
        const lo = Math.pow(10, d.digits - 1), hi = Math.pow(10, d.digits) - 1;
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 2000; t++) {
          const compose = ps.length % 2 === 0;
          let n = rng.int(lo, hi);
          const ds = String(n).split('').map(Number);
          const hasZero = ds.includes(0);
          // decompose: every place filled (a box for a 0 part would ask for 0); compose: zero places only on level 3
          if (hasZero && (!compose || !d.zero)) continue;
          if (used.has(n)) continue;
          used.add(n);
          const parts = ds.map((x, k) => x * Math.pow(10, ds.length - 1 - k)).filter((x) => x > 0);
          const order = compose && d.mixOrder && rng.int(0, 1) ? shuffle(parts, rng) : parts;
          ps.push({ n, compose, parts: order });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough numbers`);
        const cards = shuffle(ps, rng).map((p) => {
          const body = p.compose
            ? p.parts.map((x, k) => (k ? PLUS() : '') + NUM(x)).join('') + EQ() + answerBox({ w: 84, h: 52, answer: p.n })
            : NUM(p.n) + EQ() + p.parts.map((x, k) => (k ? PLUS() : '') + answerBox({ w: x >= 100 ? 70 : 58, h: 52, answer: x })).join('');
          return `<div class="ws-card-stage" data-lcs-expanded="${p.compose ? 'c' : 'd'}:${p.n}=${p.parts.join('+')}" style="justify-content:center;align-items:center;gap:8px">${body}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => (p.compose ? 'c' : 'd') + p.n) } };
      }

      if (mode === 'chart') {
        const heads = placeHeads(locale).slice(3 - d.places);
        const COLW = d.places === 2 ? 190 : 150;
        const chart = `<div style="flex:0 0 auto;display:flex;justify-content:center"><div style="display:grid;grid-template-columns:repeat(${d.places},${COLW}px);border:3px solid ${TEAL};border-radius:14px;overflow:hidden" data-lcs-chart="${heads.join('')}">` +
          heads.map((h, k) => `<div style="height:56px;display:flex;align-items:center;justify-content:center;background:${['#FBE3D8', '#DDEBE8', '#F5E9D2'][d.places - 1 - k]};border-left:${k ? `2px solid ${TEAL}` : 'none'};font-family:'Baloo 2';font-weight:700;font-size:30px;color:${INK}">${h}</div>`).join('') +
          heads.map((h, k) => `<div style="height:${d.record ? 150 : 190}px;background:#FFFFFF;border-left:${k ? `2px solid ${TEAL}` : 'none'};border-top:2px solid ${TEAL}"></div>`).join('') +
          `</div></div>`;
        const card = (x) => `<span data-lcs-digitcard="${x}" style="width:62px;height:${d.places > 2 ? 64 : 76}px;display:inline-flex;align-items:center;justify-content:center;border:2.5px dashed ${GRID};background:#FFFFFF;box-sizing:border-box">${NUM(x, 44)}</span>`;
        const sets = Array.from({ length: d.places }, () => `<div style="display:flex;flex-wrap:wrap;gap:0;justify-content:center">${Array.from({ length: 10 }, (_, k) => card(k)).join('')}</div>`).join('');
        const record = d.record ? `<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:14px 26px;padding:6px 20px" data-lcs-record>${Array.from({ length: d.record }, () => `<span style="height:44px;border-bottom:2.5px solid ${GRID}"></span>`).join('')}</div>` : '';
        const scissors = `<div style="flex:0 0 auto;border-top:2.5px dashed ${GRID};margin:${d.record ? 10 : 22}px 0 10px"></div>`;
        return { bodyHtml: content(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly">${chart}${record}${scissors}<div style="display:flex;flex-direction:column;gap:10px">${sets}</div></div>`), meta: { items: [heads.join('')] } };
      }

      if (mode === 'rename') {
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 3000; t++) {
          const unit = d.units[ps.length % d.units.length];
          const size = unit === 'tens' ? 10 : 100;
          // tens within 100: 2..9 tens; within 1000: 11..99 tens (two-digit renaming is the point); hundreds: 2..9
          const count = unit === 'hundreds' ? rng.int(2, 9) : d.max <= 100 ? rng.int(2, 9) : rng.int(11, 99);
          const n = count * size;
          const toUnits = ps.length % 4 < 2;   // 340 = [ ] tens  /  34 tens = [ ]
          // level 3: a hundreds number renamed as TENS (600 = 60 tens) on some cards — the bundle-of-ten-tens idea
          const cross = d.crossUnit && unit === 'tens' && ps.length % 3 === 0;
          const c2 = cross ? rng.int(2, 9) * 10 : count;
          const n2 = cross ? c2 * 10 : n;
          const sig = unit + n2 + toUnits;
          if (used.has(sig) || n2 > d.max) continue;
          used.add(sig);
          ps.push({ unit, count: c2, n: n2, toUnits });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough numbers`);
        const cards = shuffle(ps, rng).map((p) => {
          const uw = WORD(W.units[p.unit]);
          const body = p.toUnits
            ? `${NUM(p.n)}${EQ()}${answerBox({ w: 76, h: 52, answer: p.count })}${uw}`
            : `${NUM(p.count)}${uw}${EQ()}${answerBox({ w: 90, h: 52, answer: p.n })}`;
          return `<div class="ws-card-stage" data-lcs-rename="${p.n}=${p.count}${p.unit}" style="justify-content:center;align-items:center;gap:10px">${body}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => p.n + p.unit) } };
      }

      if (mode === 'overflow') {
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 2000; t++) {
          const h = d.hundred ? 1 : 0;
          let tens, ones;
          if (d.over === 'tens') { tens = rng.int(11, 18); ones = rng.int(1, 9); }
          else if (d.over === 'ones') { tens = rng.int(2, 7); ones = rng.int(11, 18); }
          else { tens = rng.int(10, 14); ones = rng.int(10, 15); }
          const n = h * 100 + tens * 10 + ones;
          if (used.has(n)) continue;
          used.add(n);
          ps.push({ h, tens, ones, n });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough block pictures`);
        const unit = d.hundred ? 8 : 10;
        const cards = ps.map((p) => {
          const b = baseTenBlocks({ h: p.h, t: p.tens, o: p.ones, unit }, ctx);
          return `<div class="ws-card-stage" data-lcs-overflow="${p.h}:${p.tens}:${p.ones}=${p.n}" style="justify-content:space-between;align-items:center;gap:14px;padding:0 20px">` +
            `<span style="flex:1 1 auto;display:flex;justify-content:center">${b.svg}</span>${EQ(32)}${answerBox({ w: 92, h: 60, answer: p.n })}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items: ps.map((p) => p.n) } };
      }

      // riddle: who am I?
      const lo = d.lo != null ? d.lo : Math.pow(10, d.digits - 1), hi = d.hi != null ? d.hi : Math.pow(10, d.digits) - 1;
      const range = Array.from({ length: hi - lo + 1 }, (_, k) => lo + k);   // the solver checks EVERY number (review: 70 also fit)
      const pool = range.filter((n) => n % 10 !== 0);   // the answers themselves are never round
      const kinds = d.kinds ? d.kinds.filter((k) => W.riddle[k]) : Object.keys(CLUES).filter((k) => (CLUES[k].digits || d.digits) === d.digits && W.riddle[k]);
      const used = new Set();
      const ps = [];
      for (let t = 0; ps.length < d.cards && t < 6000; t++) {
        const n = rng.pick(pool);
        if (used.has(n)) continue;
        // a one-digit number has no digits to add ("my digits add up to 5" for 5 says nothing a child can use), and its
        // ones clue names it ("I have 3 ones" for 3: half the level-1 cards printed their answer — settings-space echo
        // 49 %, 2026-11-02)
        const ks = shuffle(kinds.filter((k) => (!CLUES[k].when || CLUES[k].when(n)) && !((k === 'digitSum' || k === 'ones') && n < 10)), rng).slice(0, d.clues);
        if (ks.includes('even') && ks.includes('odd')) continue;
        if (ks.includes('onesMore') && ks.includes('onesLess')) continue;
        const cl = ks.map((k) => ({ k, v: CLUES[k].make(n, rng) }));
        if (cl.some((c) => !CLUES[c.k].valid(c.v))) continue;
        // the bounds stay inside the level's numbers (the instruction says two-digit / three-digit)
        if (cl.some((c) => c.k === 'between' && (c.v.a < lo - 1 || c.v.b > hi + 1))) continue;
        // a stated range (Number Detective: "the mystery number is from 1 to {MAX}"): no clue names a number outside it
        if (d.hi != null && cl.some((c) => c.k === 'between' && (c.v.a < lo || c.v.b > hi))) continue;
        // exactly one number in the range fits every clue (the solver), and no clue is redundant on its own
        const fits = range.filter((m) => cl.every((c) => CLUES[c.k].ok(m, c.v)));
        if (fits.length !== 1) continue;
        if (cl.some((_, j) => range.filter((m) => cl.every((c, i) => i === j || CLUES[c.k].ok(m, c.v))).length === 1)) continue;   // every clue is needed
        // a child may count the ends of "between" in: an end number that fits every other clue makes a second answer
        const bt = cl.find((c) => c.k === 'between');
        if (bt && [bt.v.a, bt.v.b].some((m) => cl.every((c) => c.k === 'between' || CLUES[c.k].ok(m, c.v)))) continue;
        used.add(n);
        ps.push({ n, cl });
      }
      if (ps.length < d.cards) throw new Error(`${id}: not enough riddles`);
      const cards = ps.map((p) => `<div class="ws-card-stage" data-lcs-riddle="${p.n}:${p.cl.map((c) => c.k).join(',')}" style="flex-direction:column;justify-content:center;align-items:stretch;gap:6px;padding:8px 18px 8px 34px">` +
        p.cl.map((c) => `<span style="font-family:'Nunito';font-weight:700;font-size:17px;line-height:1.3;color:${INK}">${fill(W.riddle[c.k], c.v)}</span>`).join('') +
        `<span style="display:flex;align-items:center;gap:10px;margin-top:4px">${WORD(W.iam, 20)}${answerBox({ w: 84, h: 50, answer: p.n })}</span></div>`);
      return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => p.n) }, ...(d.hi != null ? { tokens: { MAX: hi } } : {}) };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const box = document.querySelector('[data-lcs-pv-mode]');
        if (!box) return ['no content'];
        const m = box.dataset.lcsPvMode;
        const n = Number;
        const ans = (e) => [...e.querySelectorAll('[data-lcs-answer]')].map((b) => n(b.dataset.lcsAnswer));
        if (m === 'expanded') document.querySelectorAll('[data-lcs-expanded]').forEach((c) => {
          const [kind, rest] = c.dataset.lcsExpanded.split(':'); const [v, parts] = rest.split('=');
          const ps = parts.split('+').map(n);
          if (ps.reduce((s, x) => s + x, 0) !== n(v)) fails.push('expanded ' + rest);
          if (ps.some((x) => x < 1)) fails.push('a 0 part');
          const a = ans(c);
          if (kind === 'c' ? a.join() !== v : a.slice().sort((x, y) => y - x).join() !== ps.slice().sort((x, y) => y - x).join()) fails.push('expanded box ' + rest);
        });
        if (m === 'rename') document.querySelectorAll('[data-lcs-rename]').forEach((c) => {
          const x = c.dataset.lcsRename.match(/^(\d+)=(\d+)(tens|hundreds)$/);
          if (!x || n(x[2]) * (x[3] === 'tens' ? 10 : 100) !== n(x[1]) || n(x[2]) < 2) fails.push('rename ' + c.dataset.lcsRename);
        });
        if (m === 'overflow') document.querySelectorAll('[data-lcs-overflow]').forEach((c) => {
          const [l, v] = c.dataset.lcsOverflow.split('='); const [h, t, o] = l.split(':').map(n);
          if (h * 100 + t * 10 + o !== n(v) || (t < 10 && o < 10)) fails.push('overflow ' + c.dataset.lcsOverflow);
          const svg = c.querySelector('[data-lcs-prim="base-ten"]');
          if (!svg || c.querySelectorAll('[data-lcs-block="ten"]').length !== t || c.querySelectorAll('[data-lcs-block="one"]').length !== o) fails.push('overflow picture');
        });
        if (m === 'riddle' || m === 'riddleRange') document.querySelectorAll('[data-lcs-riddle]').forEach((c) => { if (ans(c)[0] !== n(c.dataset.lcsRiddle.split(':')[0])) fails.push('riddle box'); });
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

module.exports = { makePvMoreType, LEVELS, CLUES };
