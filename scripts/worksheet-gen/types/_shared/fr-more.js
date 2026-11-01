/**
 * fr-more.js — the new templates of the Fractions maker (NEW-TEMPLATES §12, 2026-11-01). Print-only (the maker's answer
 * key; the generic screen engine adds a screen where the page has one right answer). Five modes:
 *
 *   strips   T1 · G2-406 — a fraction wall to cut into strips: 1, then rows of halves, thirds … every row exactly the
 *            same width. L1 1, 1/2, 1/4, 1/8 · L2 + thirds and sixths · L3 all, labels as fractions only. Material.
 *   cut      T2 · G2-407 — cut each shape into N equal parts (draw the lines). L1 halves · L2 halves and fourths ·
 *            L3 thirds and sixths, only on shapes with an exact equal-area cut (rectangle, circle, triangle, hexagon).
 *            A drawing task (no screen); the key draws one correct cut.
 *   set      T3 · G2-408 — colour a fraction of a set of circles and write how many that is; ANY circles count.
 *            L1 1/2 · L2 1/3, 1/4 · L3 2/3, 3/4. Set sizes divisible by construction. 3.NF.A.1 (Grade 2 readiness).
 *   both     T4 · G2-409 — the shaded and the unshaded fraction of one shape (drawn swatches, no words); L3 also the
 *            whole: d/d = 1. L1 the denominators printed · L2 both boxes · L3 + the whole. 3.NF.A.1, 3.NF.A.3c.
 *   words    T5 · G2-410 — draw a line from each fraction word to its picture; L3 also writes the
 *            fraction. Words: 1/2, 1/3, 2/3, 1/4, 3/4 (data/fractions/words.js) — never 2/4 (it is also one half).
 *            1.G.A.3, 2.G.A.3.
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const fractionShape = require('../../primitives/fraction.js');
const { FRACTION_WORDS } = require('../../data/fractions/words.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', GRID = '#C8BFAE', GREY = '#8A8276', SOFT = '#CFE6E1';
const NUM = (s, size = 28, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size}px;color:${color};line-height:1">${s}</span>`;
/** a stacked fraction a/b */
const FRAC = (a, b, size = 26) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px" data-lcs-frac="${a}/${b}">${NUM(a, size)}<span style="width:${size}px;height:3px;background:${INK};border-radius:2px"></span>${NUM(b, size)}</span>`;
/** a stacked fraction of two boxes (a box holds a number the child writes, or a printed number) */
const FRACBOX = (a, b, { printB = false } = {}) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:3px">${answerBox({ w: 46, h: 40, answer: a })}<span style="width:46px;height:3px;background:${INK};border-radius:2px"></span>${printB ? `<span style="height:40px;display:flex;align-items:center">${NUM(b, 26)}</span>` : answerBox({ w: 46, h: 40, answer: b })}</span>`;
const SWATCH = (filled) => `<span style="flex:0 0 auto;width:26px;height:26px;border-radius:6px;border:2.5px solid ${TEAL};background:${filled ? SOFT : '#FFFFFF'}" data-lcs-swatch="${filled ? 1 : 0}"></span>`;

const LEVELS = {
  strips: { 1: { ds: [1, 2, 4, 8] }, 2: { ds: [1, 2, 3, 4, 6] }, 3: { ds: [1, 2, 3, 4, 6, 8] } },
  cut: {
    1: { jobs: [['rect', 2], ['square', 2], ['circle', 2], ['triangle', 2], ['rect', 2], ['circle', 2]] },
    2: { jobs: [['rect', 4], ['square', 4], ['circle', 4], ['square', 2], ['rect', 2], ['circle', 2]] },
    3: { jobs: [['rect', 3], ['circle', 3], ['square', 3], ['hexagon', 3], ['hexagon', 6], ['circle', 6]] },   // review: a triangle into thirds needs the centroid
  },
  set: { 1: { fr: [[1, 2]] }, 2: { fr: [[1, 3], [1, 4]] }, 3: { fr: [[2, 3], [3, 4]] } },
  both: { 1: { ds: [2, 3, 4], printB: true }, 2: { ds: [3, 4, 6, 8] }, 3: { ds: [4, 6, 8], whole: true } },
  words: { 1: { keys: ['1/2', '1/3', '1/4', '3/4'], big: true }, 2: { keys: ['1/2', '1/3', '2/3', '1/4', '3/4'] }, 3: { keys: ['1/2', '1/3', '2/3', '1/4', '3/4'], symbol: true } },
};

const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** an outline to cut, and (key) one correct equal cut; every cut offered has an exact equal-area construction */
function cutShape(shape, n, key) {
  const W = 200, H = 150;
  let outline, lines = [];
  const L = (x1, y1, x2, y2) => lines.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${CORAL}" stroke-width="4" stroke-linecap="round"/>`);
  if (shape === 'rect') {
    outline = `<rect x="10" y="25" width="180" height="100" rx="4" fill="#FFFFFF" stroke="${TEAL}" stroke-width="3.5"/>`;
    for (let k = 1; k < n; k++) L(10 + 180 * k / n, 25, 10 + 180 * k / n, 125);
  } else if (shape === 'square') {
    outline = `<rect x="45" y="10" width="130" height="130" rx="4" fill="#FFFFFF" stroke="${TEAL}" stroke-width="3.5"/>`;
    if (n === 3) { L(45 + 130 / 3, 10, 45 + 130 / 3, 140); L(45 + 260 / 3, 10, 45 + 260 / 3, 140); } else { L(110, 10, 110, 140); if (n === 4) L(45, 75, 175, 75); }
  } else if (shape === 'circle') {
    outline = `<circle cx="100" cy="75" r="65" fill="#FFFFFF" stroke="${TEAL}" stroke-width="3.5"/>`;
    for (let k = 0; k < n; k++) { const a = -Math.PI / 2 + 2 * Math.PI * k / n; L(100, 75, 100 + 65 * Math.cos(a), 75 + 65 * Math.sin(a)); }
    if (n === 2) lines = [lines[0].replace(/y1="75\.0"/, 'y1="140.0"')];   // halves: one diameter
  } else if (shape === 'triangle') {
    const P = [[100, 8], [180, 142], [20, 142]];
    outline = `<polygon points="${P.map((p) => p.join(',')).join(' ')}" fill="#FFFFFF" stroke="${TEAL}" stroke-width="3.5" stroke-linejoin="round"/>`;
    if (n === 2) L(100, 8, 100, 142);   // the median: two equal halves
    else { const cx = 100, cy = (8 + 142 + 142) / 3; P.forEach(([x, y]) => L(cx, cy, x, y)); }   // centroid to the vertices: three equal parts
  } else {   // hexagon: centre to every vertex (6) or every other vertex (3)
    const P = Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 6 + Math.PI / 3 * k; return [100 + 70 * Math.cos(a), 75 + 70 * Math.sin(a)]; });
    outline = `<polygon points="${P.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="#FFFFFF" stroke="${TEAL}" stroke-width="3.5" stroke-linejoin="round"/>`;
    P.forEach(([x, y], k) => { if (n === 6 || k % 2 === 0) L(100, 75, x, y); });
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" data-lcs-cut="${shape}:${n}">${outline}${key ? `<g data-lcs-key-sample="1">${lines.join('')}</g>` : ''}</svg>`;
}

function makeFrMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: 'numeral-charts',
    exerciseType: 'fractions',
    themeAxis: { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const locale = String(args.locale || 'en').slice(0, 2);
      const FW = FRACTION_WORDS[locale];
      if (!FW) throw new Error(`${id}: no fraction words for ${locale}`);
      const content = (inner) => `<div data-ws-content data-lcs-fr-mode="${mode}" style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'strips') {
        // every row exactly 640 px wide; a row of d cells, each labelled 1/d (the whole: 1)
        const RW = 640, RH = Math.min(84, Math.floor(620 / d.ds.length) - 12);
        const COLS = ['#FFFFFF', '#FBE3D8', '#DDEBE8', '#F5E9D2', '#E8E1F3', '#FFF1C9', '#E3F1DA', '#F9DDE6'];
        const rows = d.ds.map((den, r) => {
          const cells = Array.from({ length: den }, (_, k) => `<span style="flex:1 1 0;height:${RH}px;display:flex;align-items:center;justify-content:center;border-left:${k ? `1.5px solid ${TEAL}` : 'none'};background:${COLS[r % COLS.length]}">${den === 1 ? NUM(1, 30) : FRAC(1, den, den >= 8 ? 18 : 22)}</span>`).join('');
          return `<div data-lcs-strip="${den}" style="width:${RW}px;display:flex;border:2.5px solid ${TEAL};box-sizing:border-box">${cells}</div>`;   // review: a dashed inner line read as "cut here"
        });
        return { bodyHtml: content(`<div style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly">${rows.join('')}</div>`), meta: { items: d.ds } };
      }

      if (mode === 'cut') {
        const jobs = shuffle(d.jobs, rng);
        const cards = jobs.map(([shape, n]) => `<div class="ws-card-stage" data-lcs-cutjob="${shape}:${n}" style="flex-direction:column;justify-content:center;align-items:center;gap:6px">` +
          `${cutShape(shape, n, key)}<span style="font-family:'Nunito';font-weight:800;font-size:19px;color:${INK}">${FW.parts.replace('{n}', n)}</span></div>`);
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: 3 })), meta: { items: jobs.map((j) => j.join(':')) } };
      }

      if (mode === 'set') {
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < 6 && t < 400; t++) {
          const [a, b] = d.fr[ps.length % d.fr.length];
          const size = b * rng.int(2, Math.floor(16 / b));   // 4..16, a multiple of the denominator
          if (used.has(a + '/' + b + ':' + size)) continue;
          used.add(a + '/' + b + ':' + size);
          ps.push({ a, b, size, k: size * a / b });
        }
        if (ps.length < 6) throw new Error(`${id}: not enough sets`);
        const cards = ps.map((p) => {
          const per = p.size > 8 ? Math.ceil(p.size / 2) : p.size;   // the bigger sets in two rows
          const circles = Array.from({ length: p.size }, (_, i) => `<span data-lcs-set-item style="width:30px;height:30px;border-radius:50%;border:2.5px solid ${TEAL};background:${key && i < p.k ? SOFT : '#FFFFFF'};box-sizing:border-box"></span>`).join('');
          return `<div class="ws-card-stage" data-lcs-set="${p.a}/${p.b}:${p.size}" style="justify-content:space-evenly;align-items:center;gap:10px">${FRAC(p.a, p.b, 28)}` +
            `<span style="display:grid;grid-template-columns:repeat(${per},30px);gap:7px"${key ? ' data-lcs-key-sample="1"' : ''}>${circles}</span>${NUM('=', 26, GREY)}${answerBox({ w: 56, h: 50, answer: p.k })}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: 6 })), meta: { items: ps.map((p) => `${p.a}/${p.b}:${p.size}`) } };
      }

      if (mode === 'both') {
        const used = new Set();
        const ps = [];
        for (let t = 0; ps.length < 5 && t < 400; t++) {
          const b = rng.pick(d.ds), a = rng.int(1, b - 1);
          const shape = b > 4 && ps.length % 3 === 2 ? 'circle' : ['bar', 'circle', 'square'][ps.length % 3];
          if (shape === 'square' && b !== 4) continue;   // a square is cut only into fourths (2 × 2)
          const g = (x, y) => (y ? g(y, x % y) : x);
          if (!d.printB && (g(a, b) > 1 || g(b - a, b) > 1)) continue;   // review: 2/4 / 3/6 also read 1/2 when nothing is printed
          if (used.has(a + '/' + b)) continue;
          used.add(a + '/' + b);
          ps.push({ a, b, shape });
        }
        if (ps.length < 5) throw new Error(`${id}: not enough shapes`);
        const cards = ps.map((p) => {
          const pic = fractionShape({ shape: p.shape, d: p.b, shaded: p.a, size: 108 }, ctx).svg;
          const row = (filled, a) => `<span style="display:flex;align-items:center;gap:8px">${SWATCH(filled)}${FRACBOX(a, p.b, { printB: d.printB })}</span>`;
          const whole = d.whole ? `<span style="display:flex;align-items:center;gap:8px">${SWATCH(true)}${NUM('+', 22, TEAL)}${SWATCH(false)}${NUM('=', 24, GREY)}${FRACBOX(p.b, p.b)}${NUM('= 1', 26)}</span>` : '';
          return `<div class="ws-card-stage" data-lcs-both="${p.a}/${p.b}" style="justify-content:space-evenly;align-items:center;gap:14px">${pic}${row(true, p.a)}${row(false, p.b - p.a)}${whole}</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: 5 })), meta: { items: ps.map((p) => `${p.a}/${p.b}`) } };
      }

      // words: match each fraction word to its picture
      const keys = shuffle(d.keys, rng);
      const shapes = ['bar', 'circle', 'bar', 'circle', 'bar'];
      const letters = 'ABCDE'.split('');
      const pics = shuffle(keys.map((k, i) => ({ k, shape: shapes[i % shapes.length] })), rng).map((p, i) => ({ ...p, letter: letters[i] }));
      const letterOf = Object.fromEntries(pics.map((p) => [p.k, p.letter]));
      // the screen's tap-pair marks (scripts/makers/screen.js): the word carries its picture's letter, the picture its own
      const mark = key || !!(ctx && ctx.screen);
      // with the write-the-fraction boxes (level 3) the tap-to-match mark sits on the WORD, stretched to the row's height —
      // on the whole row it covered the boxes, so a tap meant for a box also hit the match target (screen-geometry
      // — its layout is the same on the printed page, so the screen differs from the page by its marks only)
      // G2-410 L3, 2026-11-01); without the boxes the whole row stays the target, as it was
      const onWord = mark && d.symbol;
      const wordRows = keys.map((k) => `<div data-lcs-fword="${k}"${mark && !onWord ? ` data-lcs-key-badge="${letterOf[k]}"` : ''} style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px ${key ? 52 : 16}px 10px 16px;border-radius:14px;background:#FFFFFF;border:2px solid #F0E4CB;min-height:${d.big ? 96 : 64}px;box-sizing:border-box">` +
        `<span${onWord ? ` data-lcs-key-badge="${letterOf[k]}"` : ''} style="font-family:'Nunito';font-weight:800;font-size:22px;color:${INK}${d.symbol ? ';align-self:stretch;display:flex;align-items:center;min-width:120px' : ''}">${FW.words[k]}</span>` +
        `<span style="display:flex;align-items:center;gap:10px">${d.symbol ? FRACBOX(+k.split('/')[0], +k.split('/')[1]) : ''}<span style="width:16px;height:16px;border-radius:50%;background:${TEAL}"></span></span></div>`).join('');
      const picRows = pics.map((p) => {
        const [a, b] = p.k.split('/').map(Number);
        return `<div data-lcs-fpic="${p.k}"${mark ? ` data-lcs-pair="${p.letter}"` : ''} style="display:flex;align-items:center;gap:12px;padding:6px 14px;border-radius:14px;background:#FFFFFF;border:2px solid #F0E4CB;min-height:${d.big ? 96 : 64}px;box-sizing:border-box">` +
          `<span style="width:16px;height:16px;border-radius:50%;background:${TEAL}"></span>${NUM(p.letter, 24, CORAL)}${fractionShape({ shape: p.shape, d: b, shaded: a, size: d.big ? 104 : 84 }, ctx).svg}</div>`;
      }).join('');
      const body = `<div style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr;gap:70px;padding:8px 0"><div style="display:flex;flex-direction:column;gap:14px;justify-content:space-evenly">${wordRows}</div><div style="display:flex;flex-direction:column;gap:14px;justify-content:space-evenly">${picRows}</div></div>`;
      return { bodyHtml: content(body), meta: { items: keys } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const box = document.querySelector('[data-lcs-fr-mode]');
        if (!box) return ['no content'];
        const m = box.dataset.lcsFrMode;
        const n = Number;
        if (m === 'strips') { const ws = [...document.querySelectorAll('[data-lcs-strip]')].map((s) => Math.round(s.getBoundingClientRect().width)); if (new Set(ws).size !== 1) fails.push('strips of different widths: ' + ws); }
        if (m === 'set') document.querySelectorAll('[data-lcs-set]').forEach((c) => {
          const [fr, size] = c.dataset.lcsSet.split(':'); const [a, b] = fr.split('/').map(n);
          if (n(size) % b) fails.push('set not divisible ' + c.dataset.lcsSet);
          if (c.querySelectorAll('[data-lcs-set-item]').length !== n(size)) fails.push('set size');
          if (n(c.querySelector('[data-lcs-answer]').dataset.lcsAnswer) !== n(size) * a / b) fails.push('set answer');
        });
        if (m === 'both') document.querySelectorAll('[data-lcs-both]').forEach((c) => {
          const [a, b] = c.dataset.lcsBoth.split('/').map(n);
          const shaded = c.querySelectorAll('[data-lcs-shaded="1"]').length;
          if (shaded !== a) fails.push(`both ${a}/${b}: ${shaded} parts shaded`);
          if (a < 1 || a >= b) fails.push('both: nothing to compare');
        });
        if (m === 'words') {
          const ks = [...document.querySelectorAll('[data-lcs-fword]')].map((w) => w.dataset.lcsFword);
          const ps = [...document.querySelectorAll('[data-lcs-fpic]')].map((w) => w.dataset.lcsFpic);
          if (ks.slice().sort().join() !== ps.slice().sort().join()) fails.push('words and pictures differ');
          if (ks.includes('2/4')) fails.push('2/4 is also one half');
          document.querySelectorAll('[data-lcs-fpic]').forEach((p) => { const [a, b] = p.dataset.lcsFpic.split('/').map(n); if (p.querySelectorAll('[data-lcs-shaded="1"]').length !== a) fails.push('picture ' + p.dataset.lcsFpic); });
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

module.exports = { makeFrMoreType, LEVELS };
