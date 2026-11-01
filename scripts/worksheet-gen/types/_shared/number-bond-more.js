/**
 * number-bond-more.js — the new templates of the Number Bonds maker (NEW-TEMPLATES §6, 2026-11-01). Print-only (the
 * maker's answer key; a screen version comes with the makers' play page). Five modes:
 *
 *   house      T1 · K-456  — the number house (de Zahlenhaus, nl splitshuis, fr maison des nombres): the roof holds N,
 *              each floor one way to split it. The floors run 1 … N−1 (counting never includes 0). Level 3 shuffles
 *              the floors and prints the right part on half of them. K.OA.A.3.
 *   hundred    T3 · G1-440 — number bonds of 100: tens (L1), fives (L2), any two numbers (L3). 1.NBT.C.6, 2.NBT.B.5.
 *   hidden     T4 · K-457  — how many hide under the cup? The circle holds the total; some pictures show, the rest are
 *              under a cup that is the SAME size whatever it hides. K.OA.A.4 (L2: makes 10), 1.OA.D.8 (L3, to 16).
 *   rainbow    T5 · K-458  — join the pairs that make N with arcs; a number that makes N with itself gets a ring.
 *              Level 2 mixes the order (no symmetric tell); level 3 runs to 16. K.OA.A.4, 1.OA.C.6.
 *   triangles  T6 · G1-441 — fact triangle cards to cut out (material, no key): + and − within 10 / 20, × and ÷
 *              (level 3) with each language's own signs (types/_shared/notation.js). 1.OA.B.4, 3.OA.B.6.
 */
'use strict';
const numberBond = require('../../primitives/number-bond.js');
const { answerBox, iconRows } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns } = require('../../image-cache/resolve.js');
const { mulGlyph, divGlyph } = require('./notation.js');
const slot = require('../../lib/slot.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', CREAM = '#FBF3E4';
const NUM = (s, size = 30, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:${color};line-height:1">${s}</span>`;
const MINUS = '−';

const LEVELS = {
  house: {
    1: { wholes: [4, 5, 6], houses: 3, dots: true },     // three small houses, the floors in order, dots in the roof
    2: { wholes: [6, 7, 8, 9, 10], houses: 2 },           // two houses, the floors in order
    3: { wholes: [7, 8, 9, 10], houses: 2, mixed: true }, // the floors shuffled; half print the right part instead
  },
  hundred: {
    1: { cards: 4, step: 10 },          // 30 + [70] = 100
    2: { cards: 6, step: 5 },           // 35 + [65]: at least half the cards off the tens
    3: { cards: 6, step: 1 },           // 47 + [53]: no part a multiple of 5
  },
  hidden: {
    1: { cards: 4, totals: [5], hide: [1, 4] },
    2: { cards: 5, totals: [10], hide: [1, 9] },
    3: { cards: 5, totals: [11, 12, 13, 14, 15, 16], hide: [2, 9] },
  },
  rainbow: {
    1: { rows: [6, 8, 10], example: true },     // in order; the outer pair is joined for you
    2: { rows: [7, 9, 10], shuffled: true },    // the order mixed
    3: { rows: [12, 14, 16] },                  // the long rainbows, in order (review: 1-19 on one row crowded its two-digit numbers; capped at 16)
  },
  triangles: {
    1: { cards: 6, op: '+', max: 10 },
    2: { cards: 9, op: '+', max: 20 },
    3: { cards: 9, op: '×', tables: [2, 5, 10] },   // review: × and ÷ run past grade 1 — the gentlest tables only (an extension level)
  },
};

const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** the roof of a number house: a triangle with N in it (and N dots under it) */
function roofSvg(N, W, dots) {
  const H = dots ? 104 : 84;
  let s = `<path d="M 4 ${H - 2} L ${W / 2} 4 L ${W - 4} ${H - 2} Z" fill="${CREAM}" stroke="${TEAL}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<text x="${W / 2}" y="${dots ? 58 : 62}" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="36" fill="${INK}" data-lcs-roof="${N}">${N}</text>`;
  if (dots) {
    const r = 4, gap = 3, per = Math.min(N, 5);
    for (let i = 0; i < N; i++) {
      const row = Math.floor(i / 5), inRow = Math.min(per, N - row * 5), col = i % 5;
      s += `<circle cx="${W / 2 + (col - (inRow - 1) / 2) * (2 * r + gap)}" cy="${76 + row * (2 * r + gap)}" r="${r}" fill="${CORAL}"/>`;
    }
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;margin-bottom:-3px">${s}</svg>`;
}

/** the cup that hides the rest: ONE size for every card (a bigger cup must never tell a bigger number) */
function cupSvg(w = 92) {
  const h = Math.round(w * 0.95);
  return `<svg width="${w}" height="${h}" viewBox="0 0 92 88" data-lcs-cup="1" style="flex:0 0 auto">` +
    `<path d="M 16 80 L 24 14 Q 46 6 68 14 L 76 80 Z" fill="${CREAM}" stroke="${TEAL}" stroke-width="3.5" stroke-linejoin="round"/>` +
    `<path d="M 8 80 L 84 80" stroke="${TEAL}" stroke-width="4" stroke-linecap="round"/>` +
    `<text x="46" y="56" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="34" fill="${CORAL}">?</text></svg>`;
}

/** one rainbow row: the target N in a circle, the numbers 1 … N−1 (in order or mixed), arcs above (example / key) */
function rainbowSvg({ N, order, arcs, rings, given, pairs }) {
  const W = 690, x0 = 84, n = order.length, sp = (W - x0 - 16) / n;
  const yNum = 158, fs = n > 14 ? 27 : 30, top = 10;   // review: the long rows read too small at 22
  const xOf = (v) => x0 + (order.indexOf(v) + 0.5) * sp;
  let s = `<circle cx="40" cy="${yNum - 10}" r="30" fill="${CREAM}" stroke="${TEAL}" stroke-width="3.5"/>` +
    `<text x="40" y="${yNum - 10}" text-anchor="middle" dominant-baseline="central" font-family="'Baloo 2'" font-weight="700" font-size="30" fill="${INK}" data-lcs-target="${N}">${N}</text>`;
  // the screen's pair marks (pairs = the arcs the child draws): a hit box the width of the number's lane around the numeral
  // (painted at opacity 0, never fill="none": an unpainted svg box takes no tap, so beside a digit a tap did nothing)
  const partner = (v) => { for (const [a, b] of pairs || []) { if (a === v) return b; if (b === v) return a; } return null; };
  order.forEach((v) => {
    const t = `<text x="${xOf(v)}" y="${yNum}" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="${fs}" fill="${INK}" data-lcs-num="${v}">${v}</text>`;
    const w = partner(v);
    s += w != null && w !== v ? `<g data-lcs-key-badge="${N}:${w}" data-lcs-pair="${N}:${v}"><rect x="${(xOf(v) - sp / 2).toFixed(1)}" y="${yNum - fs - 2}" width="${sp.toFixed(1)}" height="${fs + 12}" fill="#FFFFFF" fill-opacity="0"/>${t}</g>` : t;
  });
  const maxH = yNum - fs - top - 6;
  const arc = (a, b, stroke, extra) => {
    const [x1, x2] = [xOf(a), xOf(b)].sort((p, q) => p - q);
    const rx = (x2 - x1) / 2, ry = Math.max(14, maxH * (x2 - x1) / ((n - 1) * sp)), y = yNum - fs - 4;   // height by span: nested arcs never meet
    return `<path d="M ${x1} ${y} A ${rx} ${ry} 0 0 1 ${x2} ${y}" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round"${extra}/>`;
  };
  const ring = (v, stroke, extra) => `<ellipse cx="${xOf(v)}" cy="${yNum - fs * 0.36}" rx="${Math.min(sp * 0.48, fs * 0.8)}" ry="${fs * 0.72}" fill="none" stroke="${stroke}" stroke-width="3"${extra}/>`;
  for (const [a, b] of given || []) s += arc(a, b, TEAL, ` data-lcs-given-arc="${a}-${b}"`);
  let k = '';
  for (const [a, b] of arcs || []) k += arc(a, b, CORAL, ` data-lcs-key-arc="${a}-${b}"`);
  for (const v of rings || []) k += ring(v, CORAL, ` data-lcs-key-ring-num="${v}"`);
  if (k) s += `<g data-lcs-key-sample="1">${k}</g>`;
  return `<svg width="${W}" height="${yNum + 14}" viewBox="0 0 ${W} ${yNum + 14}" data-lcs-rainbow="${N}" data-lcs-order="${order.join('.')}" role="img" aria-label="numbers 1 to ${N - 1}">${s}</svg>`;
}

/** a fact triangle card: the whole (sum / product) in the ringed top corner, the parts below, the two signs inside */
function triangleSvg({ top, a, b, signs, px }) {
  const W = 200, H = 178;
  return `<svg width="${px}" height="${Math.round(px * H / W)}" viewBox="0 0 ${W} ${H}" data-lcs-triangle="${top}:${a}:${b}">` +
    `<path d="M ${W / 2} 8 L ${W - 8} ${H - 8} L 8 ${H - 8} Z" fill="#FFFFFF" stroke="${TEAL}" stroke-width="4" stroke-linejoin="round"/>` +
    `<circle cx="${W / 2}" cy="54" r="22" fill="none" stroke="${CORAL}" stroke-width="3"/>` +
    `<text x="${W / 2}" y="55" text-anchor="middle" dominant-baseline="central" font-family="'Baloo 2'" font-weight="700" font-size="${top > 99 ? 22 : 28}" fill="${INK}">${top}</text>` +
    `<text x="46" y="${H - 28}" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="28" fill="${INK}">${a}</text>` +
    `<text x="${W - 46}" y="${H - 28}" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="28" fill="${INK}">${b}</text>` +
    `<text x="${W / 2}" y="${H - 64}" text-anchor="middle" font-family="'Baloo 2'" font-weight="700" font-size="24" fill="${CORAL}">${signs}</text></svg>`;
}

function makeBondMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  const themed = mode === 'hidden';
  return {
    id,
    slug,
    gradeBand,
    assetClass: themed ? 'icon-placement' : 'numeral-charts',
    exerciseType: 'number-bonds',
    themeAxis: themed ? { applicable: true, minNouns: 5 } : { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const locale = String(args.locale || 'en').slice(0, 2);
      const content = (inner) => `<div data-ws-content data-lcs-bond-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'house') {
        const wholes = rng.sample(d.wholes, d.houses).sort((a, b) => a - b);
        const W = d.houses === 3 ? 206 : 236;
        const houses = wholes.map((N) => {
          let lefts = Array.from({ length: N - 1 }, (_, k) => k + 1);
          if (d.mixed) lefts = shuffle(lefts, rng);
          // level 3: half the floors print the right part (the child writes the left one), spread over the house
          const flip = d.mixed ? new Set(shuffle(lefts.map((_, k) => k), rng).slice(0, Math.floor(lefts.length / 2))) : new Set();
          const rowH = Math.min(d.houses === 3 ? 92 : 64, Math.floor((d.dots ? 560 : 620) / (N - 1)));
          const bw = Math.round(W * 0.34), bh = Math.min(d.houses === 3 ? 62 : 50, rowH - 12);
          const cell = (v, blank) => `<div style="flex:1;display:flex;align-items:center;justify-content:center;height:${rowH}px">` +
            (blank ? answerBox({ w: bw, h: bh, answer: v }) : NUM(v, Math.min(d.houses === 3 ? 40 : 32, rowH - 18))) + `</div>`;
          const floors = lefts.map((l, k) => `<div data-lcs-floor="${l}:${N - l}" style="display:flex;border-top:2.5px solid ${TEAL}">` +
            cell(l, flip.has(k)) + `<div style="width:2.5px;background:${TEAL}"></div>` + cell(N - l, !flip.has(k)) + `</div>`).join('');
          return `<div class="ws-card-stage" data-lcs-house="${N}" style="flex:0 0 auto;flex-direction:column;align-items:center;padding:0;border:none;background:none">` +
            roofSvg(N, W, d.dots) +
            `<div style="width:${W - 18}px;border:3.5px solid ${TEAL};border-top:none;background:#FFFFFF;box-sizing:border-box">${floors.replace(`border-top:2.5px solid ${TEAL}`, 'border-top:3.5px solid ' + TEAL)}</div></div>`;
        });
        return {
          bodyHtml: content(`<div style="flex:1;display:flex;justify-content:space-evenly;align-items:center">${houses.join('')}</div>`),
          meta: { items: wholes.map(String) },
        };
      }

      if (mode === 'hundred') {
        const pool = [];
        for (let a = d.step; a < 100; a += d.step) {
          if (d.step === 1 && a % 5 === 0) continue;   // level 3: no part on the fives
          pool.push(a);
        }
        const un = (a) => Math.min(a, 100 - a);
        const picks = [];
        // level 2: at least half the cards off the tens (35 + 65); the rest may be tens
        const order = shuffle(pool, rng);
        const want5 = d.step === 5 ? Math.ceil(d.cards / 2) : 0;
        for (const pass of [1, 2]) for (const a of order) {
          if (picks.length >= d.cards) break;
          if (picks.some((p) => un(p.a) === un(a))) continue;   // one card per pair (30 + 70 never beside 70 + 30)
          if (pass === 1 && want5 && a % 10 === 0) continue;
          if (pass === 1 && want5 && picks.length >= want5) continue;
          picks.push({ a });
        }
        if (picks.length < d.cards) throw new Error(`${id}: only ${picks.length} bonds`);
        const sides = shuffle(picks.map((_, k) => (k % 2 ? 'a' : 'b')), rng);
        const g = d.cards === 4 ? { cols: 2, rows: 2, size: 280 } : { cols: 2, rows: 3, size: 210 };
        const items = [];
        const cards = shuffle(picks, rng).map((p, k) => {
          items.push(`${p.a}:${sides[k]}`);
          // the key writes the missing number into the dashed circle (an SVG circle is not a write-in box the key layer fills)
          const ans = sides[k] === 'a' ? p.a : 100 - p.a;
          const svg = numberBond({ whole: 100, a: p.a, b: 100 - p.a, blank: sides[k], size: g.size, blankText: key ? { text: ans, color: TEAL } : null }).svg;
          return `<div class="ws-card-stage">${key ? '<div data-lcs-key-sample="1">' + svg + '</div>' : svg}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: g.cols, rows: g.rows })), meta: { items } };
      }

      if (mode === 'hidden') {
        const theme = args.theme;
        const pool = labelSafeNouns(theme);
        const nouns = slot.pictures(ctx, rng.sample(pool, d.cards), pool, theme);
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < d.cards && t < 500; t++) {
          const total = rng.pick(d.totals), hid = rng.int(d.hide[0], Math.min(d.hide[1], total - 1)), shown = total - hid;
          if (shown < 1 || used.has(total + ':' + hid)) continue;
          used.add(total + ':' + hid);
          ps.push({ total, hid, shown });
        }
        if (ps.length < d.cards) throw new Error(`${id}: not enough hidden-counter cards`);
        const maxShown = Math.max(...ps.map((p) => p.shown));
        const px = maxShown > 10 ? 32 : maxShown > 5 ? 40 : 62;   // review: 12-14 pictures need clear gaps to be counted
        const cards = ps.map((p, i) => {
          const pics = iconRows({ theme, noun: nouns[i].noun, n: p.shown, iconPx: px, perRow: 5, rng, gapX: maxShown > 10 ? 10 : 6, gapY: maxShown > 10 ? 9 : 6 });
          return `<div class="ws-card-stage" data-lcs-hidden="${p.total}:${p.hid}" style="justify-content:center;align-items:center;gap:18px">` +
            `<span style="flex:0 0 auto;width:66px;height:66px;border-radius:50%;border:3.5px solid ${TEAL};background:${CREAM};display:flex;align-items:center;justify-content:center" data-lcs-total="${p.total}">${NUM(p.total, 32)}</span>` +
            NUM('=', 30, CORAL) +
            `<span class="ws-subgroup"${slot.attr(ctx, 'pic', i)} style="flex:0 0 auto;width:250px;min-height:70px;display:flex;align-items:center;justify-content:center;padding:4px">${pics}</span>` +
            NUM('+', 30, CORAL) + cupSvg() +
            `<span style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:2px">${cupSvg(34)}${answerBox({ w: 70, h: 54, answer: p.hid })}</span></div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items: ps.map((p) => p.total + ':' + p.hid), nouns: nouns.map((n) => n.noun) } };
      }

      if (mode === 'rainbow') {
        const rows = d.rows.map((N) => {
          const nums = Array.from({ length: N - 1 }, (_, k) => k + 1);
          let order = nums;
          if (d.shuffled) {
            // mixed: no number keeps its partner's mirror place (the in-order rainbow's tell), and no two partners stand side by side
            for (let t = 0; t < 200; t++) { order = shuffle(nums, rng); if (order.every((v, k) => (order[order.length - 1 - k] !== N - v || v * 2 === N) && order[k + 1] !== N - v)) break; }
          }
          const pairs = []; for (let a = 1; a < N - a; a++) pairs.push([a, N - a]);
          const self = N % 2 === 0 ? [N / 2] : [];
          const given = d.example ? [pairs[0]] : [];
          const rest = pairs.filter((p) => !given.includes(p));
          return `<div class="ws-card-stage" style="justify-content:center;align-items:center">` +
            rainbowSvg({ N, order, given, arcs: key ? rest : [], rings: key ? self : [], pairs: ctx.screen ? rest : null }) + `</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards: rows, cols: 1, rows: rows.length })), meta: { items: d.rows.map(String) } };
      }

      // triangles: fact triangle cards to cut out (material)
      const tri = [];
      const seen = new Set();
      for (let t = 0; tri.length < d.cards && t < 800; t++) {
        let a, b;
        if (d.op === '+') { const top = rng.int(d.max === 10 ? 3 : 11, d.max); a = rng.int(1, top - 1); b = top - a; if (a > 10 || b > 10) continue; }   // to 20: both parts ≤ 10 (the facts that cross ten)
        else { a = rng.pick(d.tables); b = rng.int(2, 10); }
        const top = d.op === '+' ? a + b : a * b;
        const k = top + ':' + Math.min(a, b) + ':' + Math.max(a, b);
        if (seen.has(k)) continue;
        seen.add(k);
        tri.push({ top, a, b });
      }
      if (tri.length < d.cards) throw new Error(`${id}: not enough fact triangles`);
      const signs = d.op === '+' ? `+ ${MINUS}` : `${mulGlyph(locale)} ${divGlyph(locale)}`;
      const cols = d.cards === 6 ? 2 : 3, rowsN = d.cards / cols, px = cols === 2 ? 262 : 196;
      const cards = tri.map((f) => `<div class="ws-card-stage" data-lcs-fact="${f.top}:${f.a}:${f.b}" style="display:flex;align-items:center;justify-content:center;border:2.5px dashed ${GRID};background:#FFFFFF;box-sizing:border-box;min-height:0">${triangleSvg({ ...f, signs, px })}</div>`);
      return { bodyHtml: content(cardGrid({ cards, cols, rows: rowsN })), meta: { items: tri.map((f) => `${f.top}:${f.a}:${f.b}`) } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const box = document.querySelector('[data-lcs-bond-mode]');
        if (!box) return ['no content'];
        const m = box.dataset.lcsBondMode;
        const n = Number;
        if (m === 'house') document.querySelectorAll('[data-lcs-house]').forEach((h) => {
          const N = n(h.dataset.lcsHouse);
          const floors = [...h.querySelectorAll('[data-lcs-floor]')].map((f) => f.dataset.lcsFloor.split(':').map(n));
          if (floors.length !== N - 1) fails.push(`house ${N}: ${floors.length} floors`);
          if (floors.some(([l, r]) => l + r !== N || l < 1 || r < 1)) fails.push(`house ${N}: a floor does not make ${N}`);
          if (new Set(floors.map(([l]) => l)).size !== floors.length) fails.push(`house ${N}: a floor twice`);
          h.querySelectorAll('[data-lcs-floor]').forEach((f) => { if (f.querySelectorAll('[data-lcs-answer]').length !== 1) fails.push(`house ${N}: a floor without exactly one box`); });
        });
        if (m === 'hundred') document.querySelectorAll('[data-lcs-prim="number-bond"]').forEach((s) => {
          if (n(s.dataset.lcsWhole) !== 100 || n(s.dataset.lcsA) + n(s.dataset.lcsB) !== 100) fails.push('bond not of 100');
        });
        if (m === 'hidden') {
          const ws = new Set();
          document.querySelectorAll('[data-lcs-hidden]').forEach((c) => {
            const [total, hid] = c.dataset.lcsHidden.split(':').map(n);
            const shown = c.querySelectorAll('.ws-icon').length;
            if (shown + hid !== total || hid < 1 || shown < 1) fails.push(`hidden ${total}:${hid}: ${shown} pictures shown`);
            const a = c.querySelector('[data-lcs-answer]'); if (!a || n(a.dataset.lcsAnswer) !== hid) fails.push('hidden answer');
            const cup = c.querySelector('[data-lcs-cup]'); ws.add(Math.round(cup.getBoundingClientRect().width));
          });
          if (ws.size > 1) fails.push('the cups are not all one size');
        }
        if (m === 'rainbow') document.querySelectorAll('[data-lcs-rainbow]').forEach((r) => {
          const N = n(r.dataset.lcsRainbow);
          const nums = [...r.querySelectorAll('[data-lcs-num]')].map((t) => n(t.dataset.lcsNum)).sort((a, b) => a - b);
          if (nums.length !== N - 1 || nums.some((v, k) => v !== k + 1)) fails.push(`rainbow ${N}: numbers are not 1 to ${N - 1}`);
          const ord = r.dataset.lcsOrder.split('.').map(n);
          if (ord.some((v, k) => k && v < ord[k - 1]) && ord.some((v, k) => ord[k + 1] === N - v)) fails.push(`rainbow ${N}: two partners stand side by side`);
          const keyArcs = r.querySelectorAll('[data-lcs-key-arc]').length, given = r.querySelectorAll('[data-lcs-given-arc]').length;
          if (keyArcs && keyArcs + given !== Math.floor((N - 1) / 2)) fails.push(`rainbow ${N}: ${keyArcs + given} arcs in the key`);
          const vb = r.viewBox.baseVal, br = r.getBoundingClientRect();
          r.querySelectorAll('path').forEach((p) => { const b = p.getBBox(); if (b.y < -0.5 || b.x < -0.5 || b.x + b.width > vb.width + 0.5) fails.push(`rainbow ${N}: an arc leaves its row`); });
          if (br.width < 10) fails.push('rainbow not drawn');
        });
        if (m === 'triangles') document.querySelectorAll('[data-lcs-fact]').forEach((c) => {
          const [top, a, b] = c.dataset.lcsFact.split(':').map(n);
          if (top !== a + b && top !== a * b) fails.push(`triangle ${c.dataset.lcsFact}`);
          if (a < 1 || b < 1) fails.push('a zero part');
        });
        return fails;
      });
    },
  };
}

module.exports = { makeBondMoreType, LEVELS };
