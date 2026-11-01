/**
 * compare-more.js — the new templates of the Compare Numbers & Groups maker (NEW-TEMPLATES §9, 2026-11-01).
 * Print-only (the maker's answer key; a screen version comes with the makers' play page). Five modes:
 *
 *   croc    T1 · K-460  — the crocodile mouth: it opens to the bigger number. L1 numbers to 10 with their dots, circle
 *           the mouth (or =) · L2 two-digit numbers (half share the tens) · L3 three-digit numbers, write the symbol.
 *           The mouth faces left and right equally often. K.CC.C.7, 1.NBT.B.3, 2.NBT.A.4.
 *   expr    T2 · G1-453 — compare two sums or differences (3 + 4 ○ 5 + 1). A quarter are equal, so "=" is a real
 *           answer; on at least 40 % of the cards comparing only the FIRST numbers gives the wrong symbol.
 *           L1 + within 10 · L2 + and − within 20 · L3 within 100 (tens and ones). 1.OA.D.7, 2.NBT.A.4.
 *   between T3 · G1-454 — make it true: write a number that fits (24 < [ ] < 30). Many answers are right; the key
 *           shows the whole set (25–29, or 59, 60, … for one bound). L1 to 20 · L2 to 100, half with one bound ·
 *           L3 to 1000. 1.NBT.B.3, 2.NBT.A.4.
 *   digits  T4 · G2-398 — make the biggest and the smallest number from the digit cards. L1 two digits · L2 three ·
 *           L3 three with a 0 (the smallest never starts with 0). 2.NBT.A.1, 2.NBT.A.4.
 *   place   T5 · G2-399 — which place decides? Two numbers in place columns; circle the first digits from the left
 *           that differ, then write the symbol. L1 two digits (half share the tens) · L2 three digits, same hundreds ·
 *           L3 three digits, same hundreds and half the same tens. 2.NBT.A.4.
 *
 * No number a child counts or writes is 0 (the operator's rule); a 0 DIGIT inside 105 is fine.
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', GREY = '#8A8276', CREAM = '#FBF3E4';
const MINUS = '−';
const NUM = (s, size = 32, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:${color};line-height:1">${s}</span>`;
const SIGN = (op, size = 28) => NUM(op === '-' ? MINUS : op, size, op === '-' ? CORAL : TEAL);
const ESC = { '<': '&lt;', '>': '&gt;', '=': '=' };
const WASH = ['#FBE3D8', '#DDEBE8', '#F5E9D2'];   // ones, tens, hundreds (the column pages' colours)

// "biggest" / "smallest" next to the two boxes of the digit-card page (the only words a page prints besides the strings)
const DIGIT_LABELS = {
  en: ['biggest', 'smallest'], de: ['größte Zahl', 'kleinste Zahl'], fr: ['le plus grand', 'le plus petit'],
  es: ['el mayor', 'el menor'], pt: ['o maior', 'o menor'], it: ['il più grande', 'il più piccolo'],
  nl: ['grootste', 'kleinste'], sv: ['största', 'minsta'], da: ['største', 'mindste'], no: ['største', 'minste'], fi: ['suurin', 'pienin'],
};

// the place headings over the columns of the which-place-decides page: lib/place-heads.js (shared with G2-224)
const { PLACE_HEADS } = require('../../lib/place-heads.js');

const LEVELS = {
  croc: {
    1: { cards: 6, lo: 1, hi: 10, equal: 1, dots: true, cols: 1 },
    2: { cards: 8, lo: 10, hi: 99, equal: 1, sameLead: true, cols: 1 },
    3: { cards: 12, lo: 100, hi: 999, equal: 2, sameLead: true, write: true, cols: 2 },
  },
  expr: {
    1: { cards: 12, max: 10, ops: ['+'] },
    2: { cards: 12, max: 20, ops: ['+', '-'] },
    3: { cards: 12, max: 100, ops: ['+', '-'], tens: true },
  },
  between: {
    1: { cards: 10, max: 20, gap: [3, 6], one: 0 },
    2: { cards: 10, max: 100, gap: [3, 9], one: 0.5 },
    3: { cards: 10, max: 1000, gap: [4, 20], one: 0.5 },
  },
  digits: {
    1: { cards: 6, n: 3, make: 2 },   // review: two cards in any order spell an answer — three cards, make two-digit numbers
    2: { cards: 6, n: 3 },
    3: { cards: 6, n: 3, zero: true },
  },
  place: {
    1: { cards: 6, n: 2, sameLead: 'half' },
    2: { cards: 6, n: 3, sameLead: 'always' },
    3: { cards: 6, n: 3, sameLead: 'always', sameSecond: 'half' },
  },
};

const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const rel = (a, b) => (a < b ? '<' : a > b ? '>' : '=');

/** the crocodile mouth: open jaws with teeth and an eye, opening toward the bigger number ('<' opens right) */
function crocSvg(sym, w = 58) {
  const H = Math.round(w * 0.82);
  const vx = 8, vy = H / 2, ex = w - 6;
  const up = [ex, 5], lo = [ex, H - 5];
  let teeth = '';
  for (const t of [0.42, 0.62, 0.82]) {
    const ux = vx + (up[0] - vx) * t, uy = vy + (up[1] - vy) * t;
    const lx = vx + (lo[0] - vx) * t, ly = vy + (lo[1] - vy) * t;
    teeth += `<path d="M${(ux - 3).toFixed(1)} ${(uy + 4).toFixed(1)} L${(ux + 3).toFixed(1)} ${(uy + 3).toFixed(1)} L${ux.toFixed(1)} ${(uy + 10).toFixed(1)} Z" fill="#FFFFFF" stroke="${TEAL}" stroke-width="1"/>`;
    teeth += `<path d="M${(lx - 3).toFixed(1)} ${(ly - 4).toFixed(1)} L${(lx + 3).toFixed(1)} ${(ly - 3).toFixed(1)} L${lx.toFixed(1)} ${(ly - 10).toFixed(1)} Z" fill="#FFFFFF" stroke="${TEAL}" stroke-width="1"/>`;
  }
  const g = `<path d="M${up[0]} ${up[1]} L${vx} ${vy} L${lo[0]} ${lo[1]}" fill="none" stroke="${TEAL}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>` +
    teeth + `<circle cx="${vx + 13}" cy="${vy - 12}" r="5" fill="#FFFFFF" stroke="${INK}" stroke-width="1.5"/><circle cx="${vx + 14}" cy="${vy - 12}" r="2.2" fill="${INK}"/>`;
  const flip = sym === '>' ? ` transform="translate(${w} 0) scale(-1 1)"` : '';
  return `<svg width="${w}" height="${H}" viewBox="0 0 ${w} ${H}" data-lcs-mouth="${ESC[sym]}" aria-label="${ESC[sym]}"><g${flip}>${g}</g></svg>`;
}

/** n dots in rows of five */
function dots(n, r = 6) {
  const gap = 2 * r + 5, W = Math.min(n, 5) * gap + 2, H = Math.ceil(n / 5) * gap + 2;
  let s = '';
  for (let k = 0; k < n; k++) s += `<circle cx="${(k % 5) * gap + r + 2}" cy="${Math.floor(k / 5) * gap + r + 2}" r="${r}" fill="${CORAL}"/>`;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" data-lcs-dots="${n}">${s}</svg>`;
}

const CHIP = (inner, correct, sym) => `<span data-lcs-choice="${ESC[sym]}"${correct ? ' data-lcs-correct="1"' : ''} style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:68px;height:56px;border-radius:14px;border:2.5px solid ${GRID};background:#FFFFFF">${inner}</span>`;
const NUMBOX = (v, size = 32) => `<span style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;min-width:${size * 2.2}px;height:${Math.round(size * 1.7)}px;padding:0 10px;box-sizing:border-box;border-radius:12px;background:${CREAM}" data-lcs-num="${v}">${NUM(v, size)}</span>`;

function makeCompareMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'numeral-charts',
    exerciseType: 'comparing-numbers',
    themeAxis: { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng;
      const locale = String(args.locale || 'en').slice(0, 2);
      const content = (inner) => `<div data-ws-content data-lcs-cmp-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'croc') {
        // relations: `equal` cards are =, the rest half < and half > (the mouth must not always face one way)
        const nUneq = d.cards - d.equal;
        const rels = shuffle([...Array(d.equal).fill('='), ...Array(Math.ceil(nUneq / 2)).fill('<'), ...Array(Math.floor(nUneq / 2)).fill('>')], rng);
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 4000; t++) {
          const want = rels[ps.length];
          let a = rng.int(d.lo, d.hi), b;
          if (want === '=') b = a;
          else if (d.sameLead && ps.length % 2 === 0) {
            // half the cards share the leading digit: the next place decides
            const p = d.hi >= 100 ? 100 : 10;
            b = Math.floor(a / p) * p + rng.int(0, p - 1);
            if (b < d.lo) continue;
          } else b = rng.int(d.lo, d.hi);
          if (rel(a, b) !== want || used.has(a + ':' + b)) continue;
          used.add(a + ':' + b);
          ps.push({ a, b, r: want });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough number pairs`);
        const side = (v) => d.dots ? `<span style="flex:0 0 auto;width:118px;display:flex;flex-direction:column;align-items:center;gap:4px">${NUMBOX(v, 30)}${dots(v, 5)}</span>` : NUMBOX(v, d.write ? 30 : 34);
        const cards = ps.map((p) => {
          const mid = d.write
            ? answerBox({ w: 58, h: 52, answer: ESC[p.r] })
            : `<span style="flex:0 0 auto;display:flex;gap:10px">${CHIP(crocSvg('<', 46), p.r === '<', '<')}${CHIP(NUM('=', 34, GREY), p.r === '=', '=')}${CHIP(crocSvg('>', 46), p.r === '>', '>')}</span>`;
          return `<div class="ws-card-stage" data-lcs-cmp="${p.a}${ESC[p.r]}${p.b}" style="justify-content:center;align-items:center;gap:${d.write ? 12 : 22}px">${side(p.a)}${mid}${side(p.b)}</div>`;
        });
        const rows = Math.ceil(d.cards / d.cols);
        // L3 writes the symbol: the mouth stays on the page as the reminder, once, above the cards
        const legend = d.write ? `<div style="flex:0 0 auto;display:flex;justify-content:center;align-items:center;gap:26px;padding:2px 0 8px" data-lcs-legend>${crocSvg('<', 50)}${NUM('&lt;', 30, TEAL)}<span style="width:20px"></span>${crocSvg('>', 50)}${NUM('&gt;', 30, TEAL)}</div>` : '';
        return { bodyHtml: content(legend + `<div style="flex:1 1 auto;display:flex;min-height:0">${cardGrid({ cards, cols: d.cols, rows })}</div>`), meta: { items: ps.map((p) => p.a + p.r + p.b) } };
      }

      if (mode === 'expr') {
        const side = () => {
          const op = rng.pick(d.ops);
          let a, b;
          if (d.tens) {
            // tens and ones: 45 + 30, 80 − 5, 37 + 10 (the mental steps of Grade 2)
            if (op === '+') { a = rng.int(11, 79); b = rng.pick([rng.int(1, 9), rng.int(1, 3) * 10]); }
            else { a = rng.int(21, 99); b = rng.pick([rng.int(1, 9), rng.int(1, 3) * 10]); }
          } else if (op === '+') { a = rng.int(1, d.max - 1); b = rng.int(1, d.max - a); }
          else { a = rng.int(3, d.max); b = rng.int(1, a - 1); }
          const v = op === '+' ? a + b : a - b;
          return { a, op, b, v };
        };
        // a quarter equal; on at least 40 % of the cards the first numbers point the wrong way (a measured anti-shortcut)
        const nEq = Math.round(d.cards / 4), nMis = Math.ceil(d.cards * 0.4);
        const plan = shuffle(Array.from({ length: d.cards }, (_, k) => ({ eq: k < nEq, mis: k >= nEq ? k < nEq + nMis : true })), rng);
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 20000; t++) {
          const want = plan[ps.length];
          const L = side(), R = side();
          if (L.v < 1 || R.v < 1 || L.v > d.max || R.v > d.max) continue;
          const r = rel(L.v, R.v);
          if ((r === '=') !== want.eq) continue;
          if (want.eq && L.a === R.a && L.op === R.op) continue;   // 3 + 4 = 3 + 4 is no comparison
          const first = rel(L.a, R.a);
          if ((first !== r) !== want.mis) continue;
          const sig = `${L.a}${L.op}${L.b}|${R.a}${R.op}${R.b}`;
          if (used.has(sig)) continue;
          used.add(sig);
          ps.push({ L, R, r });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough expression pairs`);
        const fs = d.tens ? 27 : 30;
        const ex = (s) => `${NUM(s.a, fs)}${SIGN(s.op, fs - 2)}${NUM(s.b, fs)}`;
        const cards = ps.map((p) => `<div class="ws-card-stage" data-lcs-expr="${p.L.a}${p.L.op}${p.L.b}|${ESC[p.r]}|${p.R.a}${p.R.op}${p.R.b}" style="justify-content:center;align-items:center;gap:7px">` +
          `${ex(p.L)}<span style="width:4px"></span>${answerBox({ w: 54, h: 50, answer: ESC[p.r] })}<span style="width:4px"></span>${ex(p.R)}</div>`);
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => `${p.L.a}${p.L.op}${p.L.b}${p.r}${p.R.a}${p.R.op}${p.R.b}`) } };
      }

      if (mode === 'between') {
        const nOne = Math.round(d.cards * d.one);
        const kinds = shuffle(Array.from({ length: d.cards }, (_, k) => (k < nOne ? (k % 2 ? 'above' : 'below') : 'two')), rng);
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 4000; t++) {
          const kind = kinds[ps.length];
          let lo, hi, ans, key;
          if (kind === 'two') {
            const gap = rng.int(d.gap[0], d.gap[1]);          // gap - 1 whole numbers fit: always at least 2
            lo = rng.int(1, d.max - gap); hi = lo + gap;
            ans = `${lo + 1}–${hi - 1}`;
          } else if (kind === 'above') {
            lo = rng.int(Math.ceil(d.max * 0.2), d.max - 5); ans = `${lo + 1}, ${lo + 2}, …`;
          } else {
            hi = rng.int(Math.ceil(d.max * 0.2), d.max - 1); ans = `…, ${hi - 2}, ${hi - 1}`;
          }
          key = kind + lo + ':' + hi;
          if (used.has(key)) continue;
          used.add(key);
          ps.push({ kind, lo, hi, ans });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough statements`);
        const bw = d.max >= 1000 ? 150 : 128;
        const LT = NUM('&lt;', 32, TEAL), GT = NUM('&gt;', 32, TEAL);
        const cards = ps.map((p) => {
          const range = p.kind === 'two' ? `${p.lo + 1}-${p.hi - 1}` : p.kind === 'above' ? `${p.lo + 1}-` : `0-${p.hi - 1}`;
          // the screen accepts every whole number of the set the key prints (data-lcs-range, operator ruling D.4-1)
          const box = ctx.screen ? answerBox({ w: bw, h: 54, answer: p.ans }).replace('data-lcs-answer=', `data-lcs-range="${range}" data-lcs-answer=`) : answerBox({ w: bw, h: 54, answer: p.ans });
          // a one-bound card is written both ways round (59 < □ or □ > 58) so a child reads the symbol, not the position
          const flip = ps.indexOf(p) % 2 === 1;
          const body = p.kind === 'two' ? `${NUM(p.lo, 32)}${LT}${box}${LT}${NUM(p.hi, 32)}`
            : p.kind === 'above' ? (flip ? `${box}${GT}${NUM(p.lo, 32)}` : `${NUM(p.lo, 32)}${LT}${box}`)
            : (flip ? `${NUM(p.hi, 32)}${GT}${box}` : `${box}${LT}${NUM(p.hi, 32)}`);
          return `<div class="ws-card-stage" data-lcs-between="${p.kind}:${p.lo ?? ''}:${p.hi ?? ''}" style="justify-content:center;align-items:center;gap:12px">${body}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => `${p.kind}${p.lo ?? ''}-${p.hi ?? ''}`) } };
      }

      if (mode === 'digits') {
        const lab = DIGIT_LABELS[locale] || DIGIT_LABELS.en;
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 2000; t++) {
          let ds = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng).slice(0, d.zero ? d.n - 1 : d.n);
          if (d.zero) ds = shuffle([...ds, 0], rng);
          const len = d.make || ds.length;   // L1 makes two-digit numbers from two of the three cards
          const big = Number([...ds].sort((a, b) => b - a).slice(0, len).join(''));
          const asc = [...ds].sort((a, b) => a - b).slice(0, len);
          if (asc[0] === 0) { const k = asc.findIndex((x) => x > 0); [asc[0], asc[k]] = [asc[k], asc[0]]; }   // never a leading 0: 0 goes second
          const small = Number(asc.join(''));
          // review: the printed card order must not BE an answer (a child copies 7 3 as the biggest). Three digits: never
          // the biggest or smallest order. Two digits: every order is one of the two, so the cards are stacked instead.
          const shown = ds.join('');
          if (shown.includes(String(big)) || shown.includes(String(small))) continue;   // the printed row never contains an answer
          if (used.has(big)) continue;
          used.add(big);
          ps.push({ ds, big, small });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough digit sets`);
        const tile = (x) => `<span data-lcs-digit-card="${x}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:50px;height:58px;border-radius:9px;border:2.5px dashed ${GRID};background:#FFFFFF">${NUM(x, 34)}</span>`;
        const line = (label, v) => `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%"><span style="font-family:'Nunito';font-weight:800;font-size:17px;color:${INK}">${label}</span>${answerBox({ w: 118, h: 48, answer: v })}</div>`;
        const cards = ps.map((p) => `<div class="ws-card-stage" data-lcs-digits="${p.ds.join('')}:${p.big}:${p.small}:${d.make || d.n}" style="flex-direction:column;justify-content:space-evenly;align-items:center;gap:8px;padding:0 18px">` +
          `<span style="display:flex;gap:10px">${p.ds.map(tile).join('')}</span>` + `${line(lab[0], p.big)}${line(lab[1], p.small)}</div>`);
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => p.ds.join('')) } };
      }

      // place: which place decides?
      const used = new Set();
      const ps = [];
      const sameLead = shuffle(Array.from({ length: d.cards }, (_, k) => (d.sameLead === 'always' ? true : k < d.cards / 2)), rng);
      const sameSecond = shuffle(Array.from({ length: d.cards }, (_, k) => (d.sameSecond === 'half' ? k < d.cards / 2 : false)), rng);
      const dirs = shuffle(Array.from({ length: d.cards }, (_, k) => (k % 2 ? '<' : '>')), rng);
      for (let t = 0; ps.length < d.cards && t < 4000; t++) {
        const lo = Math.pow(10, d.n - 1), hi = Math.pow(10, d.n) - 1;
        const a = rng.int(lo, hi);
        const da = String(a).split('').map(Number);
        const db = da.slice();
        // the deciding place: 0 = the leading digit, 1 = the next, 2 = the ones
        const dec = !sameLead[ps.length] ? 0 : sameSecond[ps.length] ? 2 : 1;
        for (let k = dec + 1; k < d.n; k++) db[k] = rng.int(0, 9);
        let nd = rng.int(dec === 0 ? 1 : 0, 9);
        if (nd === da[dec]) continue;
        db[dec] = nd;
        const b = Number(db.join(''));
        if (rel(a, b) !== dirs[ps.length] || used.has(a + ':' + b)) continue;
        used.add(a + ':' + b);
        ps.push({ a, b, dec, r: rel(a, b) });
      }
      if (ps.length < d.cards) throw new Error(`${id}: not enough number pairs`);
      const CELL = 46;
      const cell = (x, k, ring) => `<span${ring ? ' data-lcs-key-ring="1" data-lcs-decides="1"' : ''} style="width:${CELL}px;height:${CELL}px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;background:${WASH[d.n - 1 - k]}">${NUM(x, 30)}</span>`;
      const row = (v, dec) => `<span style="display:flex;gap:6px">${String(v).split('').map((x, k) => cell(x, k, k === dec)).join('')}</span>`;
      const heads = (PLACE_HEADS[locale] || PLACE_HEADS.en).slice(3 - d.n);
      const head = `<span style="display:flex;gap:6px" data-lcs-place-heads>${heads.map((h) => `<span style="width:${CELL}px;text-align:center;font-family:'Nunito';font-weight:800;font-size:17px;color:${GREY}">${h}</span>`).join('')}</span>`;
      const cards = ps.map((p) => `<div class="ws-card-stage" data-lcs-place="${p.a}${ESC[p.r]}${p.b}:${p.dec}" style="flex-direction:column;justify-content:center;align-items:center;gap:10px">` +
        `<span style="display:flex;flex-direction:column;gap:6px">${head}${row(p.a, p.dec)}${row(p.b, p.dec)}</span>` +
        `<span style="display:flex;align-items:center;gap:10px">${NUM(p.a, 28)}${answerBox({ w: 50, h: 46, answer: ESC[p.r] })}${NUM(p.b, 28)}</span></div>`);
      return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => p.a + ':' + p.b) } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const box = document.querySelector('[data-lcs-cmp-mode]');
        if (!box) return ['no content'];
        const m = box.dataset.lcsCmpMode;
        const n = Number;
        const rel = (a, b) => (a < b ? '<' : a > b ? '>' : '=');
        const ans = (e) => [...e.querySelectorAll('[data-lcs-answer]')].map((b) => b.dataset.lcsAnswer);
        if (m === 'croc') {
          const cs = [...document.querySelectorAll('[data-lcs-cmp]')];
          const rs = cs.map((c) => { const x = c.dataset.lcsCmp.match(/^(\d+)([<>=])(\d+)$/); return x && { a: n(x[1]), r: x[2], b: n(x[3]), c }; });
          rs.forEach((p) => {
            if (!p || rel(p.a, p.b) !== p.r) { fails.push('croc pair'); return; }
            const chosen = p.c.querySelectorAll('[data-lcs-correct]');
            if (chosen.length && (chosen.length !== 1 || chosen[0].dataset.lcsChoice !== p.r)) fails.push('croc choice ' + p.a + p.r + p.b);
            const a = ans(p.c); if (a.length && a[0] !== p.r) fails.push('croc box');
            if (!chosen.length && !a.length) fails.push('nothing to answer');
            if (p.a < 1 || p.b < 1) fails.push('a 0');
          });
          const lt = rs.filter((p) => p && p.r === '<').length, gt = rs.filter((p) => p && p.r === '>').length;
          if (Math.abs(lt - gt) > 1) fails.push(`mouth ${lt} left-open vs ${gt}`);
          document.querySelectorAll('[data-lcs-dots]').forEach((s) => { if (s.querySelectorAll('circle').length !== n(s.dataset.lcsDots)) fails.push('dots'); });
        }
        if (m === 'expr') {
          const cs = [...document.querySelectorAll('[data-lcs-expr]')];
          let mis = 0;
          cs.forEach((c) => {
            const [L, r, R] = c.dataset.lcsExpr.split('|');
            const ev = (s) => { const x = s.match(/^(\d+)([+-])(\d+)$/); return x[2] === '+' ? n(x[1]) + n(x[3]) : n(x[1]) - n(x[3]); };
            if (rel(ev(L), ev(R)) !== r) fails.push('expr ' + c.dataset.lcsExpr);
            if (ans(c)[0] !== r) fails.push('expr box');
            if (rel(n(L.match(/^\d+/)[0]), n(R.match(/^\d+/)[0])) !== r) mis++;
            if (ev(L) < 1 || ev(R) < 1) fails.push('a 0');
          });
          if (mis < cs.length * 0.4) fails.push(`first numbers give the answer on ${cs.length - mis} of ${cs.length}`);
          if (!cs.some((c) => c.dataset.lcsExpr.includes('|=|'))) fails.push('no equal card');
        }
        if (m === 'between') document.querySelectorAll('[data-lcs-between]').forEach((c) => {
          const [kind, lo, hi] = c.dataset.lcsBetween.split(':');
          if (kind === 'two' && n(hi) - n(lo) < 3) fails.push('fewer than two numbers fit ' + lo + '-' + hi);
          if (!ans(c)[0]) fails.push('no accepted set');
        });
        if (m === 'digits') document.querySelectorAll('[data-lcs-digits]').forEach((c) => {
          const [ds, big, small, len] = c.dataset.lcsDigits.split(':');
          const perms = (s, k) => k === 0 ? [''] : [...s].flatMap((x, i) => perms(s.slice(0, i) + s.slice(i + 1), k - 1).map((p) => x + p));
          const vals = perms(ds, n(len)).filter((p) => p[0] !== '0').map(Number);
          if (Math.max(...vals) !== n(big) || Math.min(...vals) !== n(small)) fails.push('digits ' + c.dataset.lcsDigits);
          if (new Set(ds).size !== ds.length) fails.push('a digit twice');
          if (ds.includes(big) || ds.includes(small)) fails.push('the printed cards spell an answer: ' + ds);
        });
        if (m === 'place') document.querySelectorAll('[data-lcs-place]').forEach((c) => {
          const x = c.dataset.lcsPlace.match(/^(\d+)([<>=])(\d+):(\d)$/);
          const a = x[1], b = x[3], dec = n(x[4]);
          if (rel(n(a), n(b)) !== x[2]) fails.push('place symbol');
          const first = [...a].findIndex((ch, k) => ch !== b[k]);
          if (first !== dec) fails.push(`place: decides at ${first}, marked ${dec}`);
          if (c.querySelectorAll('[data-lcs-decides]').length !== 2) fails.push('place: not one pair marked');
        });
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

module.exports = { makeCompareMoreType, LEVELS, DIGIT_LABELS, PLACE_HEADS };
