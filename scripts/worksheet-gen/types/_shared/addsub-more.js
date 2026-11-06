/**
 * addsub-more.js — the new templates of the Addition & Subtraction maker (NEW-TEMPLATES §7, 2026-11-01). Print-only
 * (the maker's answer key; a screen version comes with the makers' play page). Eight modes:
 *
 *   drill      T1 · G1-442 — the classic facts page: 30 / 48 / 60 vertical facts, no pictures, no scaffold.
 *              L1 + within 10 · L2 + and − within 10 · L3 + and − within 20. 1.OA.C.6, 2.OA.B.2.
 *   truefalse  T2 · G1-443 — is the equation true? Circle the tick or the cross. Exactly half are true. False ones are
 *              off by 1 or 2, so the task is checking, not spotting nonsense. L2 puts the sum on the left (8 = 5 + 3);
 *              L3 has a sum or difference on BOTH sides (9 − 2 = 3 + 4). 1.OA.D.7.
 *   sentence   T3 · G1-444 — write the whole number sentence the picture shows (all three numbers; L3 the sign too).
 *              L1 two groups to put together · L2 some crossed out · L3 either. K.OA.A.1, 1.OA.A.1.
 *   three      T4 · G1-445 — three addends; L1 the pair that makes ten is underlined, L2 it is there but not marked
 *              (half the time not side by side), L3 only half the problems have one. 1.OA.A.2, 1.OA.B.3.
 *   mental100  T5 · G1-446 — tens and ones without columns: L1 add/take tens or ones (no bridging), L2 the rest of
 *              Grade 1 (47 + 6 across a ten; tens on and off), L3 Grade 2: two-digit ± two-digit. 1.NBT.C.4-6, 2.NBT.B.5.
 *   errors     T6 · G1-447 — a page already "worked": mark the wrong answers with an X and write the right one. Wrong
 *              answers are off by 1 or 2 (L3 within 100 is Grade 2 work: also the forgotten carry, off by 10). 1.OA.D.7, 2.NBT.B.9.
 *   bar        T7 · G1-448 — bar models (part-part-whole; L3 compare two bars: how many more). The bars are drawn to
 *              scale, each card at its own scale, so a child cannot read the answer off a ruler. 1.OA.A.1, 2.OA.A.1.
 *   digit      T8 · G2-397 — the missing digit in a column sum (reasoning backwards); every page's blanks are proven to
 *              have exactly one solution by trying every digit. 2.NBT.B.5-7, 3.NBT.A.2.
 *
 * No answer and no number a child counts is 0 (the operator's rule; a 0 DIGIT inside 40 or 105 is fine).
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { group, crossoutGroup } = require('./picture-equation.js');
const slot = require('../../lib/slot.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', CREAM = '#FBF3E4', GREY = '#8A8276';
const MINUS = '−';
const NUM = (s, size = 32, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:${color};line-height:1">${s}</span>`;
const SIGN = (op, size = 30) => NUM(op === '-' ? MINUS : op, size, op === '-' ? CORAL : op === '=' ? GREY : TEAL);

const LEVELS = {
  drill: {
    1: { ops: ['+'], max: 10, cols: 6, rows: 5 },
    2: { ops: ['+', '-'], max: 10, cols: 8, rows: 6 },
    3: { ops: ['+', '-'], max: 20, cols: 10, rows: 6, teens: true },
  },
  truefalse: {
    1: { cards: 10, max: 10, forms: ['abc'], off: [1] },
    2: { cards: 12, max: 20, forms: ['abc', 'cab'], off: [1, 2] },
    3: { cards: 12, max: 20, forms: ['abc', 'cab', 'abcd'], off: [1, 2] },
  },
  sentence: {
    1: { cards: 4, ops: ['+'], max: 6 },
    2: { cards: 4, ops: ['-'], max: 10 },
    3: { cards: 4, ops: ['+', '-'], max: 10, signBox: true },
  },
  three: {
    1: { cards: 12, ten: 'all', mark: true },
    2: { cards: 12, ten: 'all', apart: true },
    3: { cards: 12, ten: 'half', apart: true },
  },
  mental100: {
    1: { cards: 12, kind: 'tens-or-ones' },
    2: { cards: 12, kind: 'g1-bridge' },   // review: 1.NBT.C.4 — 47 + 6 across a ten, and tens on / off any number
    3: { cards: 12, kind: 'two-digit' },   // Grade 2 (2.NBT.B.5): two-digit ± two-digit, half of them across a ten
  },
  errors: {
    // wrong: 3-5 of the 8 sums per page (2026-11-01: 2-3 of 8 let "nothing is wrong" score 63-75 % of the rows,
    // settings-space) — about half, and not the same count on every page
    1: { cards: 8, max: 20, ops: ['+'], wrong: [3, 5], offs: [1, 2] },   // 8 rows: room for a three-line instruction (de)
    2: { cards: 8, max: 20, ops: ['+', '-'], wrong: [3, 5], offs: [1, 2] },
    3: { cards: 8, max: 100, ops: ['+', '-'], wrong: [3, 5], offs: [1, 2, 10] },
  },
  bar: {
    1: { cards: 4, max: 20, missing: ['part'] },
    2: { cards: 4, max: 100, missing: ['part', 'whole'], tens: true },
    3: { cards: 4, max: 20, missing: ['diff'] },
  },
  digit: {
    1: { cards: 6, digits: 2, ops: ['+'], blanks: 1, regroup: false },
    2: { cards: 6, digits: 2, ops: ['+', '-'], blanks: 1, regroup: 'some' },
    3: { cards: 6, digits: 3, ops: ['+', '-'], blanks: 2, regroup: 'some' },
  },
};

const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const val = (a, op, b) => (op === '+' ? a + b : a - b);

/** a check-mark / cross chip (drawn: no font has to carry ✓ ✗) */
function chip(kind, correct) {
  const path = kind === 'yes' ? 'M10 21 L17 28 L30 12' : 'M12 12 L28 28 M28 12 L12 28';
  return `<span data-lcs-chip="${kind}"${correct ? ' data-lcs-correct="1"' : ''} style="flex:0 0 auto;display:inline-flex;width:46px;height:46px;border-radius:50%;border:2.5px solid ${GRID};background:#FFFFFF;align-items:center;justify-content:center">` +
    `<svg width="34" height="34" viewBox="0 0 40 40"><path d="${path}" fill="none" stroke="${kind === 'yes' ? TEAL : CORAL}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
}

/** one digit cell of the column page (the style of column-arithmetic.js) */
function cell(d, { wash, blank, size = 56 }) {
  const base = `width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:700;font-size:${Math.round(size * 0.6)}px;color:${INK};border-radius:8px;box-sizing:border-box;`;
  if (blank) return `<span style="${base}background:#FFFFFF;border:2.5px dashed ${CORAL}" data-lcs-answer="${d}" data-lcs-digitblank="1"></span>`;
  if (d === '') return `<span style="${base}"></span>`;
  return `<span style="${base}background:${wash}">${d}</span>`;
}
const WASH = ['#FBE3D8', '#DDEBE8', '#F5E9D2'];   // ones, tens, hundreds

function makeAddSubMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  const themed = mode === 'sentence';
  return {
    id,
    slug,
    gradeBand,
    assetClass: themed ? 'icon-placement' : 'numeral-charts',
    exerciseType: themed ? 'picture-arithmetic' : mode === 'digit' ? 'column-arithmetic' : 'mental-math',
    themeAxis: themed ? { applicable: true, minNouns: 4 } : { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const content = (inner) => `<div data-ws-content data-lcs-addsub-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'drill') {
        const pool = [];
        for (const op of d.ops) for (let a = 1; a <= d.max; a++) for (let b = 1; b <= d.max; b++) {
          const r = val(a, op, b);
          if (r < 1 || r > d.max) continue;
          if (d.teens && Math.max(a, r) < 11) continue;   // review: a within-20 page of 2 + 1 is not a within-20 page
          pool.push({ a, op, b, r });
        }
        const n = d.cols * d.rows;
        // + and − half and half where both are asked; never the same fact twice (3 + 4 and 4 + 3 may both appear)
        const per = d.ops.map((op, k) => Math.floor(n / d.ops.length) + (k < n % d.ops.length ? 1 : 0));
        let ps = [];
        d.ops.forEach((op, k) => { ps = ps.concat(shuffle(pool.filter((p) => p.op === op), rng).slice(0, per[k])); });
        if (ps.length < n) throw new Error(`${id}: only ${ps.length} facts`);
        ps = shuffle(ps, rng);
        const fs = d.cols >= 10 ? 21 : d.cols >= 8 ? 25 : 34;
        const w = Math.round(fs * 1.4), bw = Math.round(fs * 1.75), bh = Math.round(fs * 1.5);
        const facts = ps.map((p) => `<div data-lcs-fact="${p.a}${p.op}${p.b}=${p.r}" style="display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:3px;background:${CREAM};border-radius:10px;padding:5px ${d.cols >= 8 ? 4 : 9}px">` +
          `<span style="width:${w}px;text-align:right">${NUM(p.a, fs)}</span>` +
          `<span style="display:flex;align-items:center;gap:4px">${SIGN(p.op, fs)}<span style="width:${w}px;text-align:right">${NUM(p.b, fs)}</span></span>` +
          `<span style="width:${w + fs}px;height:3px;background:${TEAL};border-radius:2px"></span>` +
          answerBox({ w: bw, h: bh, answer: p.r }) + `</div>`);
        const body = `<div style="flex:1;display:grid;grid-template-columns:repeat(${d.cols},minmax(0,1fr));grid-template-rows:repeat(${d.rows},minmax(0,1fr));gap:6px;align-items:center;justify-items:center">${facts.join('')}</div>`;
        return { bodyHtml: content(body), meta: { items: ps.map((p) => p.a + p.op + p.b) } };
      }

      if (mode === 'truefalse') {
        const used = new Set();
        const rows = [];
        const truth = shuffle(Array.from({ length: d.cards }, (_, k) => k < d.cards / 2), rng);   // exactly half true
        for (let k = 0, t = 0; rows.length < d.cards && t < 3000; t++) {
          const form = d.forms[rows.length % d.forms.length];
          const op = rng.pick(['+', '-']);
          const a = rng.int(2, d.max), b = rng.int(1, d.max);
          const v = val(a, op, b);
          if (v < 1 || v > d.max) continue;
          const isTrue = truth[rows.length];
          const shown = isTrue ? v : v + rng.pick(d.off) * rng.pick([-1, 1]);
          if (shown < 1 || shown > d.max + 2) continue;
          if (!isTrue && (shown === a || shown === b)) continue;   // review: x = x + n is false at a glance
          let left, right;
          if (form === 'abc') { left = [a, op, b]; right = [shown]; }
          else if (form === 'cab') { left = [shown]; right = [a, op, b]; }
          else {
            // a sum or a difference on the right too: c + d = shown, both at least 1
            const c = rng.int(1, shown - 1); if (shown - c < 1) continue;
            left = [a, op, b]; right = [c, '+', shown - c];
          }
          const sig = left.join(' ') + '=' + right.join(' ');
          if (used.has(sig)) continue;
          used.add(sig);
          rows.push({ left, right, isTrue });
          k++;
        }
        if (rows.length < d.cards) throw new Error(`${id}: not enough equations`);
        const big = d.forms.includes('abcd');
        const side = (xs) => xs.map((x) => (x === '+' || x === '-' ? SIGN(x, big ? 25 : 30) : NUM(x, big ? 27 : 32))).join('');
        const cards = rows.map((r) => `<div class="ws-card-stage" data-lcs-tf="${r.isTrue ? 'true' : 'false'}" style="justify-content:space-between;align-items:center;gap:8px;padding:0 10px 0 16px">` +
          `<span style="display:flex;align-items:center;gap:${big ? 5 : 8}px">${side(r.left)}${SIGN('=', big ? 25 : 30)}${side(r.right)}</span>` +
          `<span style="display:flex;gap:8px">${chip('yes', r.isTrue)}${chip('no', !r.isTrue)}</span></div>`);
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: rows.map((r) => r.left.join('') + '=' + r.right.join('')) } };
      }

      if (mode === 'sentence') {
        const theme = args.theme;
        const pool = labelSafeNouns(theme);
        const nouns = slot.pictures(ctx, rng.sample(pool, d.cards), pool, theme);
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 600; t++) {
          const op = d.ops.length > 1 ? d.ops[ps.length % 2] : d.ops[0];
          let a, b;
          if (op === '+') { a = rng.int(1, d.max - 1); b = rng.int(1, d.max - a); }
          else { a = rng.int(4, d.max); b = rng.int(2, a - 1); }   // review: taking 1 away again and again teaches little
          if (used.has(a + op + b)) continue;
          used.add(a + op + b);
          ps.push({ a, op, b, r: val(a, op, b) });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough pictures`);
        const order = d.ops.length > 1 ? shuffle(ps, rng) : ps;
        const cards = order.map((p, i) => {
          const noun = nouns[i].noun;
          // each group box is (440 − 14) / 2 = 213 px wide, 193 inside its 8 px padding and 2 px border: the pictures are
          // fitted to 190 (2026-11-06 — fitted to 210, five pictures ran over the padding onto the box's border)
          const stage = p.op === '+'
            ? `<div style="display:flex;gap:14px;width:440px">${group(theme, noun, p.a, rng, { w: 190, h: 80, maxPx: 44 })}${group(theme, noun, p.b, rng, { w: 190, h: 80, maxPx: 44 })}</div>`
            : `<div style="display:flex;width:440px">${crossoutGroup(theme, noun, p.a, p.b, rng, { w: 420, h: 80, maxPx: 44 })}</div>`;
          const sign = d.signBox ? answerBox({ w: 50, h: 46, answer: p.op === '+' ? '+' : MINUS }) : SIGN(p.op, 34);
          const eq = `<div style="display:flex;align-items:center;gap:10px">${answerBox({ w: 64, h: 46, answer: p.a })}${sign}${answerBox({ w: 64, h: 46, answer: p.b })}${SIGN('=', 32)}${answerBox({ w: 64, h: 46, answer: p.r })}</div>`;
          return `<div class="ws-card-stage"${slot.attr(ctx, 'pic', i)} data-lcs-sentence="${p.a}${p.op}${p.b}" style="flex-direction:column;align-items:center;justify-content:center;gap:4px">${stage}${eq}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items: order.map((p) => p.a + p.op + p.b), nouns: nouns.map((n) => n.noun) } };
      }

      if (mode === 'three') {
        const used = new Set();
        const ps = [];
        const wantTen = shuffle(Array.from({ length: d.cards }, (_, k) => (d.ten === 'all' ? true : k < d.cards / 2)), rng);
        for (let t = 0; ps.length < d.cards && t < 3000; t++) {
          const ten = wantTen[ps.length];
          let nums;
          if (ten) { const x = rng.int(1, 9), z = rng.int(1, 9); nums = [x, 10 - x, z]; }
          else { nums = [rng.int(1, 9), rng.int(1, 9), rng.int(1, 9)]; }
          if (nums[0] + nums[1] + nums[2] > 20) continue;   // review: Grade 1 adds three numbers within 20
          const hasTen = (ns) => ns.some((x, i) => ns.some((y, j) => i < j && x + y === 10));
          if (!ten && hasTen(nums)) continue;
          // the pair's places: side by side, or (when "apart") the third number between them half the time
          const apart = d.apart && rng.int(0, 1) === 1;
          let order = apart ? [nums[0], nums[2], nums[1]] : (rng.int(0, 1) ? [nums[2], nums[0], nums[1]] : nums.slice());
          if (rng.int(0, 1)) order = order.slice().reverse();
          const k = nums.slice().sort((p, q) => p - q).join('+');
          if (used.has(k)) continue;
          used.add(k);
          ps.push({ order, sum: nums[0] + nums[1] + nums[2], pair: ten ? firstPair(order) : [] });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough three-addend sums`);
        const cards = ps.map((p) => {
          const parts = [];
          p.order.forEach((x, i) => {
            if (i) parts.push(SIGN('+', 32));
            const u = d.mark && p.pair.includes(i);
            parts.push(`<span${u ? ' data-lcs-tenpair="1"' : ''} style="display:inline-block;padding:0 3px;${u ? `border-bottom:4px solid ${TEAL}` : ''}">${NUM(x, 36)}</span>`);
          });
          return `<div class="ws-card-stage" data-lcs-three="${p.order.join('+')}=${p.sum}" style="justify-content:center;align-items:center;gap:8px">${parts.join('')}${SIGN('=', 32)}${answerBox({ w: 76, h: 58, answer: p.sum })}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => p.order.join('+')) } };
      }

      if (mode === 'mental100') {
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 4000; t++) {
          const op = ps.length % 2 ? '-' : '+';
          let a, b;
          if (d.kind === 'tens-or-ones') {
            const tens = ps.length % 4 < 2;
            a = rng.int(11, 89);
            if (op === '+') b = tens ? rng.int(1, Math.floor((99 - a) / 10)) * 10 : rng.int(1, 9 - (a % 10));
            else b = tens ? rng.int(1, Math.floor(a / 10) - 1) * 10 : rng.int(1, a % 10);
            if (!(b >= 1) || (!tens && (a % 10 === 0 || (op === '+' && a % 10 > 8)))) continue;
          } else if (d.kind === 'g1-bridge') {
            // + only crosses a ten with a one-digit number; the − cards take tens away (Grade 1 does not subtract across a ten)
            if (op === '+') { a = rng.int(12, 88); b = rng.int(2, 9); if ((a % 10) + b < 11 || a % 10 === 0 || a + b > 99) continue; }
            else { a = rng.int(31, 99); b = rng.int(1, Math.floor(a / 10) - 1) * 10; if (a % 10 === 0) continue; }
          } else if (d.kind === 'two-digit') {
            const cross = ps.length % 4 >= 2;
            a = rng.int(21, 89); b = rng.int(11, 69);
            const c = op === '+' ? (a % 10) + (b % 10) > 9 : (a % 10) < (b % 10);
            if (c !== cross || (op === '+' && a + b > 99) || (op === '-' && a - b < 10)) continue;
            if (a % 10 === 0 || b % 10 === 0 || (op === '+' && (a + b) % 10 === 0)) continue;
          } else {
            // crossing a ten: two-digit and one-digit (47 + 6, 52 − 7) or two two-digit numbers (38 + 25, 63 − 28)
            const small = ps.length % 4 < 2;
            a = rng.int(21, 89); b = small ? rng.int(2, 9) : rng.int(12, 59);
            if (op === '+' && ((a % 10) + (b % 10) < 10 || a + b > 99 || (a + b) % 10 === 0)) continue;
            if (op === '-' && ((a % 10) >= (b % 10) || a - b < 10)) continue;
            if (a % 10 === 0 || b % 10 === 0) continue;
          }
          const r = val(a, op, b);
          if (r < 1 || r > 99 || used.has(a + op + b)) continue;
          used.add(a + op + b);
          ps.push({ a, op, b, r });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough two-digit problems`);
        const cards = shuffle(ps, rng).map((p) => `<div class="ws-card-stage" data-lcs-sum="${p.a}${p.op}${p.b}=${p.r}" style="justify-content:center;align-items:center;gap:10px">` +
          `${NUM(p.a, 38)}${SIGN(p.op, 34)}${NUM(p.b, 38)}${SIGN('=', 34)}${answerBox({ w: 84, h: 60, answer: p.r })}</div>`);
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => p.a + p.op + p.b) } };
      }

      if (mode === 'errors') {
        const used = new Set();
        const ps = [];
        const nWrong = Array.isArray(d.wrong) ? rng.int(d.wrong[0], d.wrong[1]) : d.wrong;
        const wrong = shuffle(Array.from({ length: d.cards }, (_, k) => k < nWrong), rng);
        for (let t = 0; ps.length < d.cards && t < 4000; t++) {
          const op = rng.pick(d.ops);
          let a, b;
          // within 20 the RESULT is drawn first, evenly, then split (2026-11-01: drawing the first number first made 20 the
          // sum of every 19 + 1, 18 + 2 …, and "write 20" fixed up to 36 % of the corrections, settings-space)
          if (d.max <= 20) {
            if (op === '+') { const r0 = rng.int(3, d.max); a = rng.int(2, r0 - 1); b = r0 - a; }
            else { const r0 = rng.int(1, d.max - 2); b = rng.int(1, d.max - r0); a = r0 + b; }
          }
          else { a = rng.int(12, 89); b = rng.int(op === '+' ? 3 : 3, op === '+' ? 99 - a : a - 1); }
          const r = val(a, op, b);
          if (r < 1 || r > d.max || used.has(a + op + b)) continue;
          const isWrong = wrong[ps.length];
          let shown = r;
          if (isWrong) {
            // off by 10 only where a ten is crossed (the forgotten carry / borrow), otherwise off by 1 or 2
            const crosses = op === '+' ? (a % 10) + (b % 10) >= 10 : (a % 10) < (b % 10);
            const offs = d.offs.filter((o) => o !== 10 || (crosses && d.max > 20));
            const o = rng.pick(offs);
            shown = o === 10 ? (op === '+' ? r - 10 : r + 10) : r + o * rng.pick([-1, 1]);
            if (shown < 1 || shown === r) continue;
          }
          used.add(a + op + b);
          ps.push({ a, op, b, r, shown, isWrong });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough worked problems`);
        // the makers' screen build (2026-11-01): every small box is a candidate to tap (ringed when the sum is wrong) and
        // every big box an OPTIONAL write box — right when it holds the correction, or stays empty beside a correct sum —
        // so no box on the screen tells which sums are wrong
        const scr = !!(ctx && ctx.screen);
        const cards = ps.map((p) => {
          const box = `<span data-lcs-markbox="1"${scr ? ' data-lcs-pick="1"' + (p.isWrong ? ' data-lcs-key-ring="1"' : '') : ''} style="position:relative;flex:0 0 auto;width:34px;height:34px;border:2.5px solid ${INK};border-radius:6px;background:#FFFFFF;display:inline-block">` +
            (key && p.isWrong ? `<svg data-lcs-key-sample="1" style="position:absolute;inset:3px" width="25" height="25" viewBox="0 0 40 40"><path d="M8 8 L32 32 M32 8 L8 32" stroke="${CORAL}" stroke-width="6" stroke-linecap="round"/></svg>` : '') + `</span>`;
          return `<div class="ws-card-stage" data-lcs-err="${p.a}${p.op}${p.b}=${p.shown}" data-lcs-wrong="${p.isWrong ? 1 : 0}" style="justify-content:space-between;align-items:center;gap:8px;padding:0 18px 0 46px">` +
            `<span style="display:flex;align-items:center;gap:7px">${NUM(p.a, 29)}${SIGN(p.op, 27)}${NUM(p.b, 29)}${SIGN('=', 27)}${NUM(p.shown, 29)}</span>` +
            `<span style="display:flex;align-items:center;gap:10px">${box}${scr ? answerBox({ w: 70, h: 40, answer: p.isWrong ? p.r : '' }).replace('class="ws-answerbox"', 'class="ws-answerbox" data-lcs-optional="1"') : answerBox({ w: 70, h: 40, answer: p.isWrong ? p.r : '' })}</span></div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items: ps.map((p) => `${p.a}${p.op}${p.b}=${p.shown}`) } };
      }

      if (mode === 'bar') {
        const ps = [];
        const used = new Set();
        for (let t = 0; ps.length < d.cards && t < 2000; t++) {
          const miss = d.missing[ps.length % d.missing.length];
          let whole, a, b;
          if (d.tens) { whole = rng.int(4, 10) * 10; a = rng.int(1, whole / 10 - 1) * 10; if (ps.length % 2) a += rng.pick([0, 5]); }
          else { whole = rng.int(8, d.max); a = rng.int(2, whole - 2); }
          b = whole - a;
          // no part thinner than a fifth of the bar: the box must fit inside it
          if (Math.min(a, b) < whole * 0.22 || used.has(whole + ':' + a)) continue;
          used.add(whole + ':' + a);
          ps.push({ miss, whole, a, b });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough bar models`);
        const cards = ps.map((p) => {
          const W = rng.int(400, 560);   // each card its own scale: the widths are honest but cannot be measured off the page
          const seg = (v, blank, wpx, fill) => `<div data-lcs-seg="${v}" style="width:${wpx}px;height:66px;box-sizing:border-box;border:3px solid ${TEAL};background:${fill};display:flex;align-items:center;justify-content:center;margin-left:-3px">` +
            (blank ? answerBox({ w: 70, h: 50, answer: v }) : NUM(v, 32)) + `</div>`;
          if (p.miss === 'diff') {
            // compare: the longer bar = whole; the shorter = a; the dashed piece is how many more
            const big = p.whole, small = p.a, diff = big - small;
            const wS = Math.round(W * small / big);
            return `<div class="ws-card-stage" data-lcs-bar="diff:${big}:${small}" style="flex-direction:column;align-items:flex-start;justify-content:center;gap:10px;padding-left:40px">` +
              `<div style="display:flex">${seg(big, false, W, CREAM)}</div>` +
              `<div style="display:flex">${seg(small, false, wS, '#FFFFFF')}<div data-lcs-seg="${diff}" style="width:${W - wS}px;height:66px;box-sizing:border-box;border:3px dashed ${CORAL};margin-left:-3px;display:flex;align-items:center;justify-content:center">${answerBox({ w: 70, h: 50, answer: diff })}</div></div></div>`;
          }
          const wA = Math.round(W * p.a / p.whole);
          const top = p.miss === 'whole' ? answerBox({ w: 84, h: 52, answer: p.whole }) : NUM(p.whole, 34);
          return `<div class="ws-card-stage" data-lcs-bar="${p.miss}:${p.whole}:${p.a}" style="flex-direction:column;align-items:center;justify-content:center;gap:4px">` +
            `<div style="width:${W}px;display:flex;flex-direction:column;align-items:center">${top}` +
            `<svg width="${W}" height="18" viewBox="0 0 ${W} 18"><path d="M 2 16 L 2 6 L ${W - 2} 6 L ${W - 2} 16" fill="none" stroke="${TEAL}" stroke-width="3"/></svg></div>` +
            `<div style="display:flex;padding-left:3px">${seg(p.a, false, wA, CREAM)}${seg(p.b, p.miss === 'part', W - wA, '#FFFFFF')}</div></div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items: ps.map((p) => `${p.miss}:${p.whole}:${p.a}`) } };
      }

      // digit: the missing digit in a column sum, unique by trying every digit
      const ps = [];
      const used = new Set();
      // the missing digits of a page differ (at most d.blanks times each): without regrouping the digits are small, and
      // "write the card number" or "write 2" scored 25-29 % of a level-1 page (settings-space 2026-11-01)
      const digitUse = new Map();
      const digitAt = (n, c, cols) => +String(n).padStart(cols, "0")[c];
      const lo = 10 ** (d.digits - 1), hi = 10 ** d.digits - 1;
      for (let t = 0; ps.length < d.cards && t < 5000; t++) {
        const op = d.ops.length > 1 ? d.ops[ps.length % 2] : d.ops[0];
        const a = rng.int(lo, hi), b = rng.int(lo, hi);
        const r = val(a, op, b);
        if (r < lo || r > hi) continue;   // the result has as many digits as the numbers (no carry out of the top column)
        const carries = op === '+' ? digitsCarry(a, b) : digitsBorrow(a, b);
        if (d.regroup === false && carries) continue;
        if (d.regroup === 'some' && (ps.length % 2 === 0) !== !!carries) continue;   // half the cards regroup
        // the blanks: positions in a (row 0) or b (row 1); two blanks: one in each row, different columns
        const cols = d.digits;
        let blanks;
        if (d.blanks === 1) blanks = [[rng.int(0, 1), rng.int(0, cols - 1)]];
        else {
          // review: the blank places vary over the page (not the same two places on every card)
          const pairs = []; for (let x = 0; x < cols; x++) for (let y = 0; y < cols; y++) if (x !== y) pairs.push([[0, x], [1, y]]);
          const fresh = pairs.filter((q) => !ps.some((pp) => JSON.stringify(pp.blanks) === JSON.stringify(q)));
          blanks = rng.pick(fresh.length ? fresh : pairs);
        }
        if (countSolutions(a, b, op, r, blanks, cols) !== 1) continue;
        if (used.has(a + op + b)) continue;
        const miss = blanks.map(([row, c]) => digitAt(row === 0 ? a : b, c, cols));
        if (t < 4000 && miss.some((g) => (digitUse.get(g) || 0) + miss.filter((x) => x === g).length > d.blanks)) continue;
        miss.forEach((g) => digitUse.set(g, (digitUse.get(g) || 0) + 1));
        used.add(a + op + b);
        ps.push({ a, op, b, r, blanks });
      }
      if (ps.length < d.cards) throw new Error(`${id}: not enough column sums`);
      const cards = ps.map((p) => {
        const cols = d.digits;
        const digitsRow = (n, row) => String(n).padStart(cols, ' ').split('').map((ch, c) => cell(ch === ' ' ? '' : ch, { wash: WASH[cols - 1 - c], blank: p.blanks.some(([r, cc]) => r === row && cc === c) })).join('');
        const glyph = `<span style="position:absolute;left:-42px;top:50%;transform:translateY(-50%)">${SIGN(p.op, 38)}</span>`;
        return `<div class="ws-card-stage" data-lcs-digit="${p.a}${p.op}${p.b}=${p.r}" data-lcs-blanks="${p.blanks.map((x) => x.join('.')).join('|')}" style="justify-content:center;align-items:center;padding-left:40px">` +
          `<div style="display:flex;flex-direction:column;gap:7px">` +
          `<div style="display:flex;gap:7px">${digitsRow(p.a, 0)}</div>` +
          `<div style="position:relative;display:flex;gap:7px">${glyph}${digitsRow(p.b, 1)}</div>` +
          `<div style="height:3px;background:${TEAL};border-radius:2px;margin:2px 0"></div>` +
          `<div style="display:flex;gap:7px">${String(p.r).split('').map((ch, c) => cell(ch, { wash: '#FFFFFF' })).join('')}</div></div></div>`;
      });
      return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: d.cards / 2 })), meta: { items: ps.map((p) => `${p.a}${p.op}${p.b}`) } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const box = document.querySelector('[data-lcs-addsub-mode]');
        if (!box) return ['no content'];
        const m = box.dataset.lcsAddsubMode;
        const n = Number;
        const parse = (s) => { const x = s.match(/^(\d+)([+-])(\d+)=(\d+)$/); return x && { a: n(x[1]), op: x[2], b: n(x[3]), r: n(x[4]) }; };
        const ev = (p) => (p.op === '+' ? p.a + p.b : p.a - p.b);
        if (m === 'drill') {
          const seen = new Set();
          document.querySelectorAll('[data-lcs-fact]').forEach((f) => {
            const p = parse(f.dataset.lcsFact);
            if (!p || ev(p) !== p.r || p.r < 1) fails.push('fact ' + f.dataset.lcsFact);
            if (seen.has(f.dataset.lcsFact)) fails.push('a fact twice: ' + f.dataset.lcsFact);
            seen.add(f.dataset.lcsFact);
            if (n(f.querySelector('[data-lcs-answer]').dataset.lcsAnswer) !== p.r) fails.push('box answer');
          });
        }
        if (m === 'truefalse') {
          const tf = [...document.querySelectorAll('[data-lcs-tf]')];
          const t = tf.filter((x) => x.dataset.lcsTf === 'true').length;
          if (t * 2 !== tf.length) fails.push(`${t} of ${tf.length} true (want half)`);
          tf.forEach((x) => { if (x.querySelectorAll('[data-lcs-correct]').length !== 1) fails.push('chips'); });
        }
        if (m === 'errors') document.querySelectorAll('[data-lcs-err]').forEach((c) => {
          const p = parse(c.dataset.lcsErr);
          const right = ev(p) === p.r;
          if (right !== (c.dataset.lcsWrong === '0')) fails.push('worked answer marked wrongly: ' + c.dataset.lcsErr);
          if (!right && Math.abs(ev(p) - p.r) > 10) fails.push('a wrong answer too far off: ' + c.dataset.lcsErr);
          const a = c.querySelector('[data-lcs-answer]').dataset.lcsAnswer;
          if (right ? a !== '' : n(a) !== ev(p)) fails.push('correction box ' + c.dataset.lcsErr);
        });
        if (m === 'three') document.querySelectorAll('[data-lcs-three]').forEach((c) => {
          const [l, r] = c.dataset.lcsThree.split('=');
          if (l.split('+').reduce((s, x) => s + n(x), 0) !== n(r)) fails.push('three ' + c.dataset.lcsThree);
          const u = [...c.querySelectorAll('[data-lcs-tenpair]')].map((e) => n(e.textContent));
          if (u.length && (u.length !== 2 || u[0] + u[1] !== 10)) fails.push('the underlined pair does not make ten');
        });
        if (m === 'mental100') document.querySelectorAll('[data-lcs-sum]').forEach((c) => { const p = parse(c.dataset.lcsSum); if (ev(p) !== p.r || p.r < 1) fails.push('sum ' + c.dataset.lcsSum); });
        if (m === 'digit') document.querySelectorAll('[data-lcs-digit]').forEach((c) => {
          const p = parse(c.dataset.lcsDigit);
          if (ev(p) !== p.r) fails.push('column ' + c.dataset.lcsDigit);
          if (!c.querySelectorAll('[data-lcs-digitblank]').length) fails.push('no blank digit');
        });
        if (m === 'bar') document.querySelectorAll('[data-lcs-bar]').forEach((c) => {
          c.querySelectorAll('[data-lcs-seg]').forEach((s) => {
            const b = s.querySelector('[data-lcs-answer]');
            if (b && b.getBoundingClientRect().width > s.getBoundingClientRect().width - 4) fails.push('a box wider than its segment');
          });
        });
        // nothing may run out of its card
        document.querySelectorAll('.ws-card-stage').forEach((c, i) => {
          const cr = c.getBoundingClientRect();
          c.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1)) fails.push(`card ${i + 1}: something runs out of it`); });
        });
        return [...new Set(fails)];
      });
    },
  };
}

function firstPair(order) {
  for (let i = 0; i < order.length; i++) for (let j = i + 1; j < order.length; j++) if (order[i] + order[j] === 10) return [i, j];
  return [];
}
function digitsCarry(a, b) { while (a || b) { if ((a % 10) + (b % 10) > 9) return true; a = Math.floor(a / 10); b = Math.floor(b / 10); } return false; }
function digitsBorrow(a, b) { while (b) { if ((a % 10) < (b % 10)) return true; a = Math.floor(a / 10); b = Math.floor(b / 10); } return false; }

/** how many ways to fill the blank digits so the column sum is right (a leading digit is never 0) */
function countSolutions(a, b, op, r, blanks, cols) {
  const A = String(a).padStart(cols, '0').split('').map(Number), B = String(b).padStart(cols, '0').split('').map(Number);
  let count = 0;
  const rec = (k) => {
    if (k === blanks.length) {
      const x = Number(A.join('')), y = Number(B.join(''));
      if ((op === '+' ? x + y : x - y) === r) count++;
      return;
    }
    const [row, c] = blanks[k];
    const arr = row === 0 ? A : B;
    const keep = arr[c];
    for (let dgt = c === 0 ? 1 : 0; dgt <= 9; dgt++) { arr[c] = dgt; rec(k + 1); }
    arr[c] = keep;
  };
  rec(0);
  return count;
}

module.exports = { makeAddSubMoreType, LEVELS, countSolutions };
