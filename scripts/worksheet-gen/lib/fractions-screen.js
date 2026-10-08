/**
 * fractions-screen.js — Level Set 2026-10-08 (Fractions, PDF + interactive): the SCREEN version and the ANSWER KEY of a
 * built fraction page (types/_shared/fraction-tasks.js + G3-316), plus the robot's INDEPENDENT oracle. New pages only —
 * the published page (level 2, copy 1) never reaches this module.
 *
 *   shade          tap the parts of each shape to colour them (tap-select, runtime ctx.countGroups: a shape is right
 *                  when the number of coloured parts is the fraction's — any parts); bars and grids only (a wedge of a
 *                  circle cannot be a tap box)
 *   equal-unequal  tap every shape cut into equal parts (tap-select; the oracle measures the parts from the drawing)
 *   which-shows · line · whole · compare   the card's own options become taps
 *   name           tap the fraction the shaded parts show, among the classic slips: the numbers swapped (4/3), shaded
 *                  over unshaded (3/1), the unshaded parts (1/4)
 *   set-circle     tap how many pictures the fraction is (slips: the denominator, the rest of the set, the numerator)
 *   match-equiv    each picture becomes a question with the four labels as options
 *
 * Wrong options are chosen so the right one is the smallest, middle or largest value equally often; its SLOT is seeded
 * by the page + locale + copy (lib/answer-slots.js — the numbers are the same in every locale), and a page whose slots
 * tap out a rhythm is re-drawn.
 */
'use strict';
const fractionShape = require('../primitives/fraction.js');
const numberLine = require('../primitives/number-line.js');
const { fileUri } = require('../image-cache/resolve.js');
const { slotFor, tappingRhythm, seededShuffle } = require('./answer-slots.js');
const { makeRng } = require('./rng.js');

const F = () => require('../types/_shared/fraction-tasks.js');   // lazy: that module loads this one
const CORAL = '#F2784B', INK = '#1F2B2A', TEAL = '#146B5E', SOFT = '#DDEBE8';
const SCR_W = 660, OPT_H = 112;

const FRAC = (n, d, size) =>
  `<span style="display:inline-flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-weight:700;color:${INK}">` +
  `<span style="font-size:${size}px;line-height:1">${n}</span>` +
  `<span style="width:${size + 8}px;height:${Math.max(3, Math.round(size / 9))}px;background:${INK};border-radius:2px;margin:3px 0"></span>` +
  `<span style="font-size:${size}px;line-height:1">${d}</span></span>`;
const val = (f) => f.n / f.d;
const same = (a, b) => Math.abs(a - b) < 1e-9;

/**
 * Wrong options from `cands` (priority order) so the target sits at `rank` by value; values all different.
 * Returns null when the rank cannot be built.
 */
function rankedFrom(target, cands, rank, numRank) {
  const tv = val(target);
  const seen = [tv];
  const pool = cands.filter((c) => c.d > 0 && !seen.some((s) => same(s, val(c))) && (seen.push(val(c)), true));
  const below = pool.filter((c) => val(c) < tv), above = pool.filter((c) => val(c) > tv);
  const need = [[0, 2], [1, 1], [2, 0]][rank];
  if (below.length < need[0] || above.length < need[1]) return null;
  // every pair that builds the rank, earliest-priority first; prefer a pair in which the answer is NOT the option that
  // shares the most numbers with the others (the swapped slip 4/3 shares both of 3/4's numbers — "tap the one the others
  // have in common" scored 43% on Name the Fraction, pooled guessability 2026-10-08)
  const pairs = [];
  const pick = (L, m) => (m === 0 ? [[]] : m === 1 ? L.map((x) => [x]) : L.flatMap((x, i) => L.slice(i + 1).map((y) => [x, y])));
  for (const b of pick(below, need[0])) for (const a of pick(above, need[1])) pairs.push([...b, ...a]);
  const prio = (p) => p.reduce((s, c) => s + pool.indexOf(c), 0);
  const tells = (p) => {
    const T = [[target.n, target.d], ...p.map((c) => [c.n, c.d])];
    const sh = T.map((t, j) => t.reduce((s, tok) => s + T.filter((u, k) => k !== j && u.includes(tok)).length, 0));
    const mx = Math.max(...sh);
    return sh[0] === mx && sh.filter((x) => x === mx).length === 1 ? 1 : 0;
  };
  // and when all three top numbers differ, the answer's top number sits at its own drawn rank (else "tap the middle top
  // number" won on those cards)
  const numOff = (p) => {
    if (numRank == null) return 0;
    const nums = [target.n, ...p.map((c) => c.n)];
    if (new Set(nums).size < nums.length) return 0;
    return p.filter((c) => c.n < target.n).length === numRank ? 0 : 1;
  };
  pairs.sort((p, q) => ((tells(p) + numOff(p)) - (tells(q) + numOff(q))) || (prio(p) - prio(q)));
  return pairs[0];
}

/** one question: options with the answer at a seeded rank (by value) and a seeded slot */
function optionsFor(target, cands, key, k) {
  // the answer's rank by value is drawn; when that rank cannot be built (a small answer cannot be the largest), another
  // POSSIBLE rank is drawn — a fixed fallback order piled the answers onto one end (68% smallest on Name the Fraction)
  const ok = [0, 1, 2].filter((r) => rankedFrom(target, cands, r));
  if (!ok.length) throw new Error('fractions screen: no options for ' + target.n + '/' + target.d);
  let r = slotFor(key + '|rank', 3);
  if (!ok.includes(r)) r = ok[slotFor(key + '|rank2', ok.length)];
  const wrongs = rankedFrom(target, cands, r, slotFor(key + '|num', 3));
  if (!wrongs) throw new Error('fractions screen: no options for ' + target.n + '/' + target.d);
  return { wrongs: seededShuffle(wrongs, key + '|w'), slot: k };
}

function chip(j, label, ok, html, w) {
  return `<span class="ws-achip" data-lcs-opt="${j}" data-lcs-label="${label}"${ok ? ' data-lcs-correct="1"' : ''} ` +
    `style="width:${w || 190}px;height:auto;min-height:${OPT_H}px;padding:10px;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center">${html}</span>`;
}
function itemBox(k, q, inner) {
  return `<div data-lcs-item data-lcs-word="${k + 1}" data-lcs-q="${q}" data-ws-content ` +
    `style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${SCR_W}px;padding:16px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${inner}</div>`;
}
const row = (html, gap) => `<div style="display:flex;gap:${gap || 14}px;justify-content:center;align-items:center;flex-wrap:wrap">${html}</div>`;

/** the tap-choice questions of a page: [{ q, prompt (html), opts: [{label, html}], ans (index into opts before slotting) }] */
function questions(C, ctx) {
  const it = C.items;
  const out = [];
  if (C.mode === 'which-shows') {
    it.forEach((x) => out.push({
      q: `ws:${x.n}/${x.d}`, prompt: FRAC(x.n, x.d, 46),
      target: { n: x.n, d: x.d }, own: () => F().wsCands(x.n, x.d), twoKind: true,
      draw: (o) => fractionShape({ shape: 'circle', d: o.d, shaded: o.n, size: 110 }).svg, label: (o) => `${o.n}/${o.d}`,
    }));
  } else if (C.mode === 'line') {
    it.forEach((x) => out.push({
      q: `line:${x.n}/${x.d}`,
      prompt: numberLine({ min: 0, max: x.d, tickStep: 1, labelEvery: x.d, width: 520, marks: [x.n], labelText: { 0: '0', [x.d]: '1' } }).svg,
      target: { n: x.n, d: x.d }, own: () => F().lineCands(x.n, x.d), draw: (o) => FRAC(o.n, o.d, 34), label: (o) => `${o.n}/${o.d}`,
    }));
  } else if (C.mode === 'whole') {
    const cells = (p, shaded) => `<span style="display:inline-flex">` + Array.from({ length: p }, () =>
      `<span style="width:40px;height:40px;box-sizing:border-box;border:3px solid ${TEAL};border-radius:6px;background:${shaded ? SOFT : '#FFFFFF'};margin:2px"></span>`).join('') + `</span>`;
    it.forEach((x) => out.push({
      q: `whole:${x.k}/${x.d}`,
      prompt: `<span style="display:inline-flex;align-items:center;gap:18px">${cells(x.k, true)}${FRAC(x.k, x.d, 34)}</span>`,
      target: { n: x.d, d: 1 }, own: () => ({ cands: F().wholeCands(x.d) }), draw: (o) => cells(o.n, false), label: (o) => String(o.n), wide: true,
    }));
  } else if (C.mode === 'compare') {
    it.forEach((x) => out.push({
      q: `cmp:${x.a.n}/${x.a.d}|${x.b.n}/${x.b.d}`, prompt: '',
      target: val(x.a) > val(x.b) ? x.a : x.b, given: [x.a, x.b], keepOrder: true,
      draw: (o) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:8px">${fractionShape({ shape: 'bar', d: o.d, shaded: o.n, size: 150 }).svg}${FRAC(o.n, o.d, 30)}</span>`,
      label: (o) => `${o.n}/${o.d}`, wide: true,
    }));
  } else if (C.mode === 'name') {
    it.forEach((x) => {
      const t = { n: x.n, d: x.d };
      // the classic slips first: swapped, shaded over unshaded, the unshaded parts; then near neighbours
      const cands = [{ n: x.d, d: x.n }, { n: x.n, d: x.d - x.n }, { n: x.d - x.n, d: x.d }, { n: x.n, d: x.d + 1 }, { n: x.n + 1, d: x.d }, { n: x.n - 1, d: x.d }, { n: x.n, d: x.d - 1 }, { n: x.n, d: x.d + 2 }]
        .filter((c) => c.n > 0 && c.d > 0 && !(c.n === t.n && c.d === t.d));
      out.push({
        q: `name:${x.n}/${x.d}`, prompt: fractionShape({ shape: x.shape, d: x.d, shaded: x.n, size: 160 }).svg,
        target: t, cands, draw: (o) => FRAC(o.n, o.d, 34), label: (o) => `${o.n}/${o.d}`,
      });
    });
  } else if (C.mode === 'set-circle') {
    it.forEach((x) => {
      const ans = x.total / x.d * x.n;
      const cands = [x.d, x.total - ans, x.n, x.total / x.d, ans + 1, ans - 1, ans + 2, ans - 2].filter((v) => v > 0 && v !== ans).map((v) => ({ n: v, d: 1 }));
      const px = Math.min(52, Math.floor(560 / Math.ceil(x.total / (x.total > 8 ? 2 : 1))) - 8);
      const icon = () => `<img src="${fileUri(ctx.theme, x.noun)}" alt="" style="width:${px}px;height:${px}px">`;
      const per = x.total > 8 ? Math.ceil(x.total / 2) : x.total;
      const pics = [0, 1].filter((r) => r * per < x.total).map((r) => row(Array.from({ length: Math.min(per, x.total - r * per) }, icon).join(''), 8)).join('');
      out.push({
        q: `set:${x.n}/${x.d}of${x.total}`,
        prompt: `<span style="display:flex;align-items:center;gap:22px">${FRAC(x.n, x.d, 40)}<span style="display:flex;flex-direction:column;gap:8px">${pics}</span></span>`,
        target: { n: ans, d: 1 }, cands, draw: (o) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:44px;color:${INK}">${o.n}</span>`, label: (o) => String(o.n),
      });
    });
  } else if (C.mode === 'match-equiv') {
    it.forEach((x) => out.push({
      q: `match:${x.pic.n}/${x.pic.d}`, prompt: fractionShape({ shape: x.shape, d: x.pic.d, shaded: x.pic.n, size: 150 }).svg,
      target: x.label, given: C.labels, draw: (o) => FRAC(o.n, o.d, 34), label: (o) => `${o.n}/${o.d}`, four: true,
    }));
  }
  return out;
}

function choiceScreen(C, ctx, salt) {
  const qs = questions(C, ctx);
  if (!qs.length) throw new Error('fractions screen: no questions');
  const page = qs.map((x) => x.q).join('|') + '|' + salt + '|';
  const n = qs[0].four ? 4 : qs[0].keepOrder ? 2 : 3;
  const slots = qs.map((x, k) => slotFor(page + k + '|' + x.q, n));
  for (let k = 3; k < slots.length; k++) if (tappingRhythm(slots.slice(0, k + 1), n)) slots[k] = (slots[k] + 1) % n;
  const items = qs.map((x, k) => {
    let opts;
    if (x.own) {
      // the screen draws its OWN wrong options (the same kinds of slip as the printed page), with the answer's rank by
      // value seeded per locale + copy: the number pages are the same in every locale, so options copied from the page
      // repeated one page's pattern eleven times (pooled guessability 2026-10-08)
      const key = page + k + '|' + x.q, rng = makeRng(key), c = x.own();
      const want = slotFor(key + '|rank', 3);
      let wrongs = null;
      for (const r of (want === 1 ? [1, 0, 2] : [want, 2 - want, 1])) {   // the other end before the middle
        wrongs = x.twoKind ? F().twoKindWrongs(x.target, c.same, c.slips, r, rng, slotFor(key + '|num', 3)) : F().rankedWrongs(x.target, c.cands, r, rng);
        if (wrongs) break;
      }
      if (!wrongs) throw new Error('fractions screen: no options for ' + x.q);
      opts = seededShuffle(wrongs, key + '|o'); opts.splice(slots[k], 0, x.target);
    } else if (x.given) {
      // the page's own options (or the four labels): keep their values, re-seat the answer at its slot
      const others = seededShuffle(x.given.filter((o) => !(o.n === x.target.n && o.d === x.target.d)), page + k + '|o');
      opts = others.slice(); opts.splice(slots[k], 0, x.target);
    } else {
      const { wrongs } = optionsFor(x.target, x.cands, page + k + '|' + x.q, slots[k]);
      opts = wrongs.slice(); opts.splice(slots[k], 0, x.target);
    }
    const w = x.four ? 146 : x.wide ? (n === 2 ? 300 : 620) : 190;
    const chips = opts.map((o, j) => chip(j, x.label(o), j === slots[k], x.draw(o), w)).join('');
    const optsRow = x.wide && n === 3 ? `<div style="display:flex;flex-direction:column;gap:12px;align-items:center">${chips}</div>` : row(chips, 12);
    return itemBox(k, x.q, (x.prompt ? `<div style="display:flex;justify-content:center">${x.prompt}</div>` : '') + optsRow);
  });
  return `<div data-ws-content data-lcs-screen="fractions" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:6px">${items.join('')}</div>`;
}

/** shade: each shape as tappable parts (bars stay bars; circles and squares become a grid) */
function shadeScreen(C) {
  const GRID = { 2: [2, 1], 3: [3, 1], 4: [2, 2], 6: [3, 2], 8: [4, 2], 9: [3, 3] };
  const cards = C.items.map((x, g) => {
    const want = x.parts * x.n / x.d;
    // every part is a tap target of at least ~104 page px (≥ 44 px on a 360 px phone): a bar of up to 4 parts stays one
    // row, longer bars and every other shape become a grid; parts touch but never overlap
    const [gc, gr] = x.shape === 'bar' && x.parts <= 4 ? [x.parts, 1] : (GRID[x.parts] || [x.parts, 1]);
    const cw = gc >= 4 ? 112 : 128;
    const ch = x.shape === 'bar' && gr === 1 ? 104 : cw;
    let k = 0;
    const rows = Array.from({ length: gr }, () => `<div style="display:flex">` + Array.from({ length: gc }, () => {
      const i = k++;
      return `<span data-lcs-item data-lcs-group="${g}" data-lcs-want="${want}" data-lcs-q="shade:${x.n}/${x.d}:${x.parts}" data-lcs-word="${g + 1}"${i < want ? ' data-lcs-hit="1"' : ''} ` +
        `style="width:${cw}px;height:${ch}px;box-sizing:border-box;border:3px solid ${TEAL};background:#FFFFFF;margin:0"></span>`;
    }).join('') + `</div>`).join('');
    return `<div data-ws-content style="display:flex;align-items:center;justify-content:center;gap:34px;width:${SCR_W}px;padding:18px 10px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">` +
      FRAC(x.n, x.d, 46) + `<span style="display:inline-flex;flex-direction:column">${rows}</span></div>`;
  });
  return `<div data-ws-content data-lcs-screen="fractions" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:6px">${cards.join('')}</div>`;
}

/** the part sizes of a drawn shape, measured from its SVG (rect widths·heights, sector angles) */
function partSizes(svg) {
  const sizes = [];
  for (const m of svg.matchAll(/<rect [^>]*width="([\d.]+)" height="([\d.]+)"[^>]*data-lcs-part/g)) sizes.push((+m[1] + 3) * (+m[2] + 3));
  for (const m of svg.matchAll(/<path d="M ([\d.]+) ([\d.]+) L ([\d.-]+) ([\d.-]+) A [\d.]+ [\d.]+ 0 (\d) 1 ([\d.-]+) ([\d.-]+) Z"/g)) {
    const [cx, cy, x1, y1, , x2, y2] = [+m[1], +m[2], +m[3], +m[4], +m[5], +m[6], +m[7]];
    let a = Math.atan2(y2 - cy, x2 - cx) - Math.atan2(y1 - cy, x1 - cx);
    while (a <= 0) a += 2 * Math.PI;
    sizes.push(a);
  }
  return sizes.map((s) => Math.round(s * 1000) / 1000);
}

function equalScreen(C, salt) {
  let k = 0;
  const cards = C.items.map((x, ci) => {
    // the shapes in a salted order: the number pages are the same in every locale, and the printed order alone let a
    // tap-every-other pattern win 61% (pooled guessability 2026-10-08)
    const shapes = seededShuffle(x.shapes, salt + '|eq|' + ci + '|' + x.d).map((s) => {
      const svg = fractionShape({ shape: s.shape, d: x.d, shaded: 0, size: s.shape === 'bar' ? 112 : 150, equal: s.equal }).svg;
      const i = k++;
      return `<span data-lcs-item data-lcs-word="${i + 1}" data-lcs-sizes="${partSizes(svg).join(',')}"${s.equal ? ' data-lcs-hit="1"' : ''} ` +
        `style="display:inline-flex;align-items:center;justify-content:center;width:196px;height:180px;box-sizing:border-box;padding:8px;background:#FFFFFF;border:2px solid #EFE4D2;border-radius:14px">${svg}</span>`;
    }).join('');
    return `<div data-ws-content style="display:flex;gap:14px;justify-content:center;width:${SCR_W}px;padding:14px 8px;background:#FFFDF8;border:2px solid #EFE4D2;border-radius:16px;box-sizing:border-box">${shapes}</div>`;
  });
  return `<div data-ws-content data-lcs-screen="fractions" style="flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding-top:6px">${cards.join('')}</div>`;
}

/** answer key: the printed page with every answer shown */
function key(built, C) {
  let h = built.bodyHtml;
  const css = [];
  if (C.mode === 'shade') {
    // colour the right number of parts of each card's shape
    let card = -1;
    h = h.replace(/data-lcs-card="(\d+)"|<(?:path|rect)\b[^>]*data-lcs-shaded="0"[^>]*>/g, (m0, c) => {
      if (c) { card = +c - 1; return m0; }
      const x = C.items[card];
      x._done = (x._done || 0);
      if (x._done >= x.parts * x.n / x.d) return m0;
      x._done++;
      return m0.replace(/fill="#FFFFFF"/, `fill="${CORAL}" fill-opacity="0.55"`).replace('data-lcs-shaded="0"', 'data-lcs-shaded="0" data-lcs-keyfill="1"');
    });
    C.items.forEach((x) => { if ((x._done || 0) !== x.parts * x.n / x.d) throw new Error('fractions key: could not shade card ' + x.n + '/' + x.d); delete x._done; });
  } else if (C.mode === 'name' || C.mode === 'set-circle') {
    h = h.split('class="ws-answerbox"').join('class="ws-answerbox" data-lcs-gapbox');
    css.push(`[data-lcs-gapbox]{position:relative}[data-lcs-gapbox]::after{content:attr(data-lcs-answer);position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font:700 26px 'Baloo 2',cursive;color:${CORAL}}`);
  } else if (C.mode === 'match-equiv') {
    // each picture's own match written beside it
    h = h.replace(/data-lcs-left="(\d+)\/(\d+)"/g, (m0, n, d) => {
      const x = C.items.find((y) => y.pic.n === +n && y.pic.d === +d);
      return m0 + ` data-lcs-keylabel="= ${x.label.n}/${x.label.d}"`;
    });
    css.push(`[data-lcs-keylabel]{position:relative}[data-lcs-keylabel]::after{content:attr(data-lcs-keylabel);position:absolute;right:6px;top:6px;font:700 22px 'Baloo 2',cursive;color:${CORAL}}`);
  } else {
    // circle-one modes and equal parts: the right choices ringed
    css.push(`[data-lcs-correct]{box-shadow:0 0 0 5px ${CORAL} !important}`);
  }
  return h + (css.length ? `<style data-lcs-key>${css.join('')}</style>` : '');
}

function screenOrKey(built, ctx) {
  const C = built._cards;
  if (!C) throw new Error('fractions screen: the page carries no _cards');
  const salt = [ctx.locale || 'en', ctx.variant || '', ctx.theme || ''].join('/');
  if (!ctx.interactive) return { bodyHtml: key(built, JSON.parse(JSON.stringify(C))), meta: built.meta };
  const body = C.mode === 'shade' ? shadeScreen(C) : C.mode === 'equal-unequal' ? equalScreen(C, salt) : choiceScreen(C, ctx, salt);
  return { bodyHtml: body, meta: built.meta };
}

// ---- the robot's oracle: recomputes every answer from the stamped question, never from the page's marks ----
const parseF = (s) => { const [n, d] = String(s).split('/').map(Number); return { n, d: d || 1 }; };
function choiceAnswer(q) {
  const [kind, rest] = q.split(/:(.*)/s);
  if (kind === 'ws' || kind === 'line' || kind === 'name') return { pair: rest };
  if (kind === 'whole') return { pair: String(parseF(rest).d) };
  if (kind === 'set') { const m = /^(\d+)\/(\d+)of(\d+)$/.exec(rest); return { pair: String(+m[3] / +m[2] * +m[1]) }; }
  if (kind === 'cmp') { const [a, b] = rest.split('|').map(parseF); return { pair: val(a) > val(b) ? `${a.n}/${a.d}` : `${b.n}/${b.d}` }; }
  if (kind === 'match') return { value: val(parseF(rest)) };
  throw new Error('fractions oracle: cannot read "' + q + '"');
}
function oracle(items) {
  if (items.length && items[0].options) {
    return items.map((it) => {
      const q = (it.meta || {})['data-lcs-q'];
      const want = choiceAnswer(q);
      const L = it.options.map((o) => String(typeof o === 'object' ? o.label : o));
      const hits = L.map((l, i) => ((want.pair != null ? l === want.pair : same(val(parseF(l)), want.value)) ? i : -1)).filter((i) => i >= 0);
      if (hits.length !== 1) throw new Error(`fractions oracle: ${hits.length} options right for ${q}`);
      return hits[0];
    });
  }
  // tap-select
  if (items.length && (items[0].meta || {})['data-lcs-sizes'] != null) {
    return items.map((it) => {
      const s = it.meta['data-lcs-sizes'].split(',').map(Number);
      if (s.length < 2) throw new Error('fractions oracle: a shape with no measured parts');
      return Math.max(...s) / Math.min(...s) < 1.01;
    });
  }
  // shade (count groups): the first `want` parts of each shape — the runtime accepts ANY parts of that count
  const seen = {};
  return items.map((it) => {
    const q = it.meta['data-lcs-q'];
    const m = /^shade:(\d+)\/(\d+):(\d+)$/.exec(q);
    if (!m) throw new Error('fractions oracle: cannot read "' + q + '"');
    const want = +m[3] * +m[1] / +m[2];
    const g = it.meta['data-lcs-group'];
    seen[g] = (seen[g] || 0) + 1;
    return seen[g] <= want;
  });
}

const KEYS = { 'which-shows': 'shows', line: 'line', compare: 'compare', name: 'name', 'set-circle': 'set', shade: 'shade', 'equal-unequal': 'equal' };
function interactiveFor(mode, equiv) {
  const instructionKey = mode === 'whole' ? (d) => (Number(d) === 3 ? 'whole3' : 'whole')
      : mode === 'match-equiv' ? (equiv ? 'matchEquiv' : 'match') : KEYS[mode];
  if (mode === 'shade') {
    return { kind: 'tap-select', countGroups: true, item: '[data-lcs-item]', answerAttr: 'data-lcs-hit', labelAttr: 'data-lcs-word',
      metaAttrs: ['data-lcs-group', 'data-lcs-want', 'data-lcs-q'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
  }
  if (mode === 'equal-unequal') {
    return { kind: 'tap-select', item: '[data-lcs-item]', answerAttr: 'data-lcs-hit', labelAttr: 'data-lcs-word',
      metaAttrs: ['data-lcs-sizes'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
  }
  return { kind: 'tap-choice', item: '[data-lcs-item]', option: '[data-lcs-opt]', answerAttr: 'data-lcs-correct', labelAttr: 'data-lcs-word',
    metaAttrs: ['data-lcs-q'], instructionKey, screenHeight: 6000, oracle: (items) => oracle(items) };
}

module.exports = { screenOrKey, interactiveFor, oracle, partSizes, questions };
