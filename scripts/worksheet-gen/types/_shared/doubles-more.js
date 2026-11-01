/**
 * doubles-more.js — the new templates of the Doubles & Halves maker (NEW-TEMPLATES §8, 2026-11-01). Print-only
 * (the maker's answer key; a screen version comes with the makers' play page). Five modes:
 *
 *   near     T1 · G1-449 — near doubles: 6 + 7 = 6 + 6 + 1. L1 the double is printed, the child writes the 1 and the
 *            sum · L2 the child writes the double too (6 + 6 + 1) · L3 half the cards are "double minus one"
 *            (7 + 8 = 8 + 8 − 1). Within 20. 1.OA.C.6 (doubles plus one).
 *   draw     T2 · K-459  — draw the double: a group of pictures, an empty box beside it across a dashed mirror line;
 *            the child draws the same group again and writes n + n. Within 10 (Kindergarten): L1 1-4 pictures · L2 2-5
 *            · L3 2-5 dots.
 *            K.OA.A.1 → 1.OA.C.6. The drawing is open; the key shows the number.
 *   isdouble T3 · G1-450 — is it a double? Circle the numbers that are a double (two equal parts); L2/L3 write the
 *            half under each one circled. Between 40 and 60 % of a page are doubles, never exactly half every time.
 *            L1 to 20 · L2 to 20 + halves · L3 to 50 + halves. 1.OA.C.6, 2.OA.C.3.
 *   machine  T4 · G1-451 — a double machine and a half machine: fill the outputs (L1), some inputs too (L2: think
 *            backwards), to 100 (L3). A half machine only ever takes a number it can halve. 1.OA.C.6, 2.NBT.B.5.
 *   memory   T5 · G1-452 — memory cards to cut out: a number and its double. Every number on the page is in exactly
 *            one pair and no number is the double of another (no 1 2 4 8 chain: 2 ↔ 4 would pair too). L1 to 20 with dots · L2 to 20 · L3 to 40. Material, no key.
 *
 * No answer and no number a child counts is 0 (the operator's rule).
 */
'use strict';
const { answerBox, iconRows } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { LABELS } = require('../../data/b2/labels.js');
const slot = require('../../lib/slot.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', CREAM = '#FBF3E4', GREY = '#8A8276';
const MINUS = '−';
const NUM = (s, size = 32, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:${color};line-height:1">${s}</span>`;
const SIGN = (op, size = 30) => NUM(op === '-' ? MINUS : op, size, op === '-' ? CORAL : op === '=' ? GREY : TEAL);

const LEVELS = {
  near: {
    1: { cards: 8, lo: 1, hi: 9, given: true },                 // 6 + 7 = 6 + 6 + [1] = [13]; the smaller number first
    2: { cards: 8, lo: 2, hi: 9, given: false, flip: true },  // 8 + 9 = [ ] + [ ] + 1 = [ ]; either order
    3: { cards: 8, lo: 2, hi: 9, given: false, flip: true, minus: true },   // half: 7 + 8 = [ ] + [ ] − 1
  },
  draw: {
    1: { cards: 4, lo: 1, hi: 4, px: 52 },
    2: { cards: 4, lo: 2, hi: 5, px: 46 },
    3: { cards: 4, lo: 2, hi: 5, dots: true },
  },
  isdouble: {
    1: { rows: 3, per: 6, lo: 1, hi: 20, halves: false },
    2: { rows: 3, per: 6, lo: 1, hi: 20, halves: true },
    3: { rows: 3, per: 6, lo: 5, hi: 50, halves: true },
  },
  machine: {
    1: { rows: 5, max: 20, missIn: 0 },
    2: { rows: 5, max: 20, missIn: 2 },
    3: { rows: 5, max: 100, missIn: 2 },
  },
  memory: {
    1: { pairs: 6, max: 20, dots: true },
    2: { pairs: 6, max: 20 },
    3: { pairs: 6, max: 40 },
  },
};

const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** n dots in rows of five (the rows of a ten-frame, so 7 reads as 5 and 2) */
function dotsSvg(n, r = 9, per = 5) {
  const gap = r * 2 + 7, rows = Math.ceil(n / per);
  const W = Math.min(n, per) * gap + 4, H = rows * gap + 4;
  let s = '';
  for (let k = 0; k < n; k++) s += `<circle cx="${(k % per) * gap + r + 5}" cy="${Math.floor(k / per) * gap + r + 5}" r="${r}" fill="${TEAL}"/>`;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" data-lcs-dots="${n}">${s}</svg>`;
}

function makeDoublesMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  const themed = mode === 'draw';
  return {
    id,
    slug,
    gradeBand,
    assetClass: themed ? 'icon-placement' : 'numeral-charts',
    exerciseType: 'doubles-halves',
    themeAxis: themed ? { applicable: true, minNouns: 4, excludeBw: true } : { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng;
      const locale = String(args.locale || 'en').slice(0, 2);
      const content = (inner) => `<div data-ws-content data-lcs-dh-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'near') {
        // every near double a + b with |a - b| = 1 inside the level's numbers; each pair once
        // every near double s + (s + 1) inside the level's numbers, either way round where the level flips;
        // sampled without replacement, so no card repeats
        const pool = [];
        for (let a = d.lo; a <= d.hi - 1; a++) { pool.push({ s: a, flip: false }); if (d.flip) pool.push({ s: a, flip: true }); }
        const minusK = d.minus ? shuffle(Array.from({ length: d.cards }, (_, k) => k < d.cards / 2), rng) : [];
        const ps = rng.sample(pool, Math.min(d.cards, pool.length)).map((p, k) => {
          const minus = !!minusK[k];
          return { x: p.flip ? p.s + 1 : p.s, y: p.flip ? p.s : p.s + 1, dbl: minus ? p.s + 1 : p.s, minus, sum: 2 * p.s + 1 };
        });
        if (ps.length < d.cards) throw new Error(`${id}: not enough near doubles`);
        const cards = ps.map((p) => {
          const step = p.minus ? '-' : '+';
          const dbl = d.given ? `${NUM(p.dbl, 32)}${SIGN('+', 28)}${NUM(p.dbl, 32)}` : `${answerBox({ w: 58, h: 50, answer: p.dbl })}${SIGN('+', 28)}${answerBox({ w: 58, h: 50, answer: p.dbl })}`;
          const one = d.given ? answerBox({ w: 50, h: 50, answer: 1 }) : NUM(1, 32);
          return `<div class="ws-card-stage" data-lcs-near="${p.x}+${p.y}=${p.dbl}+${p.dbl}${step}1=${p.sum}" style="justify-content:center;align-items:center;gap:9px">` +
            `${NUM(p.x, 34)}${SIGN('+', 30)}${NUM(p.y, 34)}${SIGN('=', 30)}${dbl}${SIGN(step, 28)}${one}${SIGN('=', 30)}${answerBox({ w: 70, h: 54, answer: p.sum })}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items: ps.map((p) => `${p.x}+${p.y}`) } };
      }

      if (mode === 'draw') {
        const theme = args.theme;
        const ns = shuffle(Array.from({ length: d.hi - d.lo + 1 }, (_, k) => d.lo + k), rng).slice(0, d.cards);
        if (ns.length < d.cards) throw new Error(`${id}: not enough groups`);
        let nouns = [];
        if (!d.dots) { const pool = labelSafeNouns(theme); nouns = slot.pictures(ctx, rng.sample(pool, d.cards), pool, theme); }
        const BOX = 'flex:0 0 auto;width:210px;height:118px;border-radius:12px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;padding:6px';
        const cards = ns.map((n, i) => {
          const given = d.dots ? dotsSvg(n, 9) : iconRows({ theme, noun: nouns[i].noun, n, iconPx: d.px, perRow: n <= 3 ? n : Math.ceil(n / 2), rng, gapX: 6, gapY: 6 });
          return `<div class="ws-card-stage" data-lcs-draw="${n}" style="justify-content:center;align-items:center;gap:10px">` +
            `<span class="ws-subgroup"${d.dots ? '' : slot.attr(ctx, 'pic', i)} data-lcs-given="${n}" style="${BOX};background:#FFFFFF;border:2px solid #F0E4CB">${given}</span>` +
            `<span style="flex:0 0 auto;width:0;height:118px;border-left:3px dashed ${TEAL}" aria-hidden="true"></span>` +
            `<span data-lcs-drawbox="1" style="${BOX};background:#FFFFFF;border:2.5px dashed ${CORAL}"></span>` +
            `<span style="flex:0 0 auto;display:flex;align-items:center;gap:6px">${NUM(n, 32)}${SIGN('+', 28)}${NUM(n, 32)}${SIGN('=', 28)}${answerBox({ w: 66, h: 52, answer: 2 * n })}</span></div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items: ns.map(String), nouns: nouns.map((x) => x.noun) } };
      }

      if (mode === 'isdouble') {
        const N = d.rows * d.per;
        const all = Array.from({ length: d.hi - d.lo + 1 }, (_, k) => d.lo + k);
        const evens = all.filter((v) => v % 2 === 0), odds = all.filter((v) => v % 2 === 1);
        // 40-60 % doubles, the share drawn per page so "circle every other one" is never the pattern
        const nEven = rng.int(Math.ceil(N * 0.4), Math.floor(N * 0.6));
        if (evens.length < nEven || odds.length < N - nEven) throw new Error(`${id}: range too small`);
        const nums = shuffle([...rng.sample(evens, nEven), ...rng.sample(odds, N - nEven)], rng);
        const cards = [];
        for (let r = 0; r < d.rows; r++) {
          const chips = nums.slice(r * d.per, (r + 1) * d.per).map((v) => {
            const dbl = v % 2 === 0;
            const c = `<span data-lcs-chip="${v}"${ctx.answerKey || ctx.screen ? ' data-lcs-pick="1"' : ''}${dbl ? ' data-lcs-correct="1"' : ''} style="flex:0 0 auto;display:inline-flex;width:84px;height:84px;border-radius:50%;border:2.5px solid ${GRID};background:#FFFFFF;align-items:center;justify-content:center">${NUM(v, 40)}</span>`;
            return d.halves ? `<span style="display:flex;flex-direction:column;align-items:center;gap:8px">${c}${answerBox({ w: 68, h: 52, answer: dbl ? v / 2 : '' })}</span>` : c;
          });
          cards.push(`<div class="ws-card-stage" data-lcs-row="${r}" style="justify-content:space-evenly;align-items:center">${chips.join('')}</div>`);
        }
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.rows })), meta: { items: nums } };
      }

      if (mode === 'machine') {
        const L = LABELS[locale] && LABELS[locale].doublesHalves;
        if (!L) throw new Error(`${id}: no labels for ${locale}`);
        const CW = 100, CH = 66;
        const CELL = (v, given) => given
          ? `<span class="ws-pattern-slot" style="width:${CW}px;height:${CH}px;font-family:'Baloo 2';font-weight:700;font-size:32px;color:${INK}" data-lcs-given="${v}">${v}</span>`
          : answerBox({ w: CW, h: CH, answer: v });
        const machines = ['double', 'half'].map((op) => {
          // the INPUT of a double machine is n, of a half machine 2n: draw n so both stay within the range
          const hiN = Math.floor(d.max / 2);
          const loN = d.max > 20 ? 6 : 1;
          const ns = shuffle(Array.from({ length: hiN - loN + 1 }, (_, k) => loN + k), rng).slice(0, d.rows);
          const missIn = new Set(d.missIn ? rng.sample(Array.from({ length: d.rows - 1 }, (_, k) => k + 1), d.missIn) : []);
          const rows = ns.map((n, r) => {
            const x = op === 'double' ? n : 2 * n, y = op === 'double' ? 2 * n : n;
            const inGiven = !missIn.has(r);
            return { x, y, inGiven };
          });
          const html = `<div class="ws-card-stage" data-lcs-machine="${op}" style="flex-direction:column;justify-content:space-evenly;align-items:center;gap:8px">` +
            `<span data-lcs-pill="${op}" style="display:inline-flex;align-items:center;padding:8px 28px;border-radius:999px;background:${TEAL};color:#FFFFFF;font-family:'Nunito';font-weight:800;font-size:26px">${L[op]}</span>` +
            rows.map((w) => `<div style="display:flex;gap:12px;align-items:center" data-lcs-io="${w.x}>${w.y}">${CELL(w.x, w.inGiven)}` +
              `<span style="font-family:'Baloo 2';font-weight:700;font-size:32px;color:${CORAL}">→</span>${CELL(w.y, !w.inGiven)}</div>`).join('') + `</div>`;
          return { html, rows };
        });
        return { bodyHtml: content(cardGrid({ cards: machines.map((m) => m.html), cols: 2, rows: 1 })), meta: { items: machines.map((m, k) => (k ? 'h' : 'd') + m.rows.map((w) => w.x).join('.')) } };
      }

      // memory: a number and its double, each number in exactly one pair (no position badges: the card is its number)
      let pairs = null;
      for (let t = 0; t < 400 && !pairs; t++) {
        const ns = rng.sample(Array.from({ length: Math.floor(d.max / 2) }, (_, k) => k + 1), d.pairs);
        const vals = ns.flatMap((n) => [n, 2 * n]);
        if (new Set(vals).size === vals.length && !ns.some((x) => ns.includes(2 * x))) pairs = ns;   // review: 1 2 4 8 also pairs 2 with 4
      }
      if (!pairs) throw new Error(`${id}: no set of pairs with every number once`);
      const cardsV = shuffle(pairs.flatMap((n) => [{ v: n, of: n }, { v: 2 * n, of: n }]), rng);
      const cards = cardsV.map((c) => `<div class="ws-card-stage" data-lcs-mem="${c.v}" data-lcs-pair="${c.of}" style="flex-direction:column;align-items:center;justify-content:center;gap:6px;border:2.5px dashed ${GRID};background:#FFFFFF;box-sizing:border-box;min-height:0">` +
        NUM(c.v, d.dots ? 52 : 64) + (d.dots ? dotsSvg(c.v, c.v > 10 ? 5 : 6, Math.ceil(c.v / 2)) : '') + `</div>`);
      return { bodyHtml: content(cardGrid({ cards, cols: 3, rows: (d.pairs * 2) / 3, numbered: false })), meta: { items: pairs } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const box = document.querySelector('[data-lcs-dh-mode]');
        if (!box) return ['no content'];
        const m = box.dataset.lcsDhMode;
        const n = Number;
        const ans = (e) => [...e.querySelectorAll('[data-lcs-answer]')].map((b) => b.dataset.lcsAnswer);
        if (m === 'near') document.querySelectorAll('[data-lcs-near]').forEach((c) => {
          const x = c.dataset.lcsNear.match(/^(\d+)\+(\d+)=(\d+)\+\3([+-])1=(\d+)$/);
          if (!x) { fails.push('near ' + c.dataset.lcsNear); return; }
          const [a, b, dd, s, sum] = [n(x[1]), n(x[2]), n(x[3]), x[4], n(x[5])];
          if (Math.abs(a - b) !== 1 || a + b !== sum || 2 * dd + (s === '+' ? 1 : -1) !== sum) fails.push('near double wrong: ' + c.dataset.lcsNear);
          if (sum > 20) fails.push('near double over 20');
          const as = ans(c);
          if (as[as.length - 1] !== String(sum)) fails.push('sum box');
        });
        if (m === 'draw') document.querySelectorAll('[data-lcs-draw]').forEach((c) => {
          const k = n(c.dataset.lcsDraw);
          const g = c.querySelector('[data-lcs-given]');
          const shown = g.querySelectorAll('img').length || n((g.querySelector('[data-lcs-dots]') || {}).dataset?.lcsDots || 0);
          if (shown !== k) fails.push(`draw ${k}: ${shown} shown`);
          if (ans(c).join() !== String(2 * k)) fails.push('draw answer');
        });
        if (m === 'isdouble') {
          const chips = [...document.querySelectorAll('[data-lcs-chip]')];
          const ev = chips.filter((c) => n(c.dataset.lcsChip) % 2 === 0);
          if (ev.length < chips.length * 0.4 || ev.length > chips.length * 0.6) fails.push(`${ev.length} of ${chips.length} doubles`);
          chips.forEach((c) => { if ((n(c.dataset.lcsChip) % 2 === 0) !== !!c.dataset.lcsCorrect) fails.push('chip ' + c.dataset.lcsChip); if (n(c.dataset.lcsChip) < 1) fails.push('a 0'); });
          if (new Set(chips.map((c) => c.dataset.lcsChip)).size !== chips.length) fails.push('a number twice');
        }
        if (m === 'machine') document.querySelectorAll('[data-lcs-machine]').forEach((c) => {
          const op = c.dataset.lcsMachine;
          c.querySelectorAll('[data-lcs-io]').forEach((r) => {
            const [x, y] = r.dataset.lcsIo.split('>').map(n);
            if (op === 'double' ? y !== 2 * x : 2 * y !== x) fails.push(`${op} ${x}>${y}`);
            if (x < 1 || y < 1) fails.push('a 0');
          });
        });
        if (m === 'memory') {
          const cs = [...document.querySelectorAll('[data-lcs-mem]')];
          const vals = cs.map((c) => n(c.dataset.lcsMem));
          if (new Set(vals).size !== vals.length) fails.push('a number on two cards');
          const ps = cs.map((c) => n(c.dataset.lcsPair)); if (ps.some((x) => ps.includes(2 * x))) fails.push('a chain: a false pair on the page');
          const by = {}; cs.forEach((c) => { (by[c.dataset.lcsPair] = by[c.dataset.lcsPair] || []).push(n(c.dataset.lcsMem)); });
          Object.entries(by).forEach(([p, vs]) => { vs.sort((a, b) => a - b); if (vs.length !== 2 || vs[0] !== n(p) || vs[1] !== 2 * n(p)) fails.push('pair ' + p); });
        }
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

module.exports = { makeDoublesMoreType, LEVELS };
