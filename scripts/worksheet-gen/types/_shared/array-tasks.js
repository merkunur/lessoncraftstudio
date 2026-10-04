/**
 * Factory for the arrays & grouping family (class 9):
 *  - 'count-array':   array → write the total (K-027)
 *  - 'domino-add':    domino pips a + b = [] (G1-110)
 *  - 'dice-add':      two dice a + b = [] (G1-111)
 *  - 'rep-add':       equal groups → n + n + n = [] (G2-209/210)
 *  - 'build-array':   r × c given → circle the matching array (G2-212)
 *  - 'groups-mult':   k groups of n → k × n = [] (G2-213/214, G3-302)
 *  - 'share-bins':    total icons ÷ bins, icons pile + empty bins (G2-216, G3-309)
 *  - 'group-rings':   icons in rings of k → total ÷ k = [] (G2-217)
 *  - 'fact-family':   array → 2 mult + 2 div facts (G3-311)
 *  - 'missing-factor':array → [] × c = total (G3-312)
 *  - 'area-grid':     shaded grid rectangle → r × c = area (G3-313)
 *  - 'commutative':   same array both ways → r × c = c × r (G3-314)
 */
'use strict';
const { divGlyph } = require('./notation.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const diceFace = require('../../primitives/dice.js');
const domino = require('../../primitives/domino.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');
const { svgRoot, roundedRect } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');

/* Per-level number ranges (2026-09-27, Level Set programme). These modes used
   fixed ranges and ignored the level; each now reads its row here. LEVEL 2 IS
   THE OLD FIXED RANGE (every deck of these types was published at level 2, and
   tools/snapshot-type-pages.js proves level 2 builds byte-identical pages).
   Levels 1 and 3 follow docs/worksheet-gen/level-ladder/verdicts-all.json.
   A type may override a mode's rows with cfg.levels. */
const MODE_LEVELS = {
  'domino-add':     { 1: { lo: 1, hi: 3 }, 2: { lo: 1, hi: 6 }, 3: { lo: 1, hi: 9 } },
  // dice stop at 6 and the instruction says "both dice", so level 3 keeps two
  // dice and rolls 3-6 each: every sum 6-12, most of them crossing ten
  'dice-add':       { 1: { lo: 1, hi: 3 }, 2: { lo: 1, hi: 6 }, 3: { lo: 3, hi: 6 } },
  'rep-add':        { 1: { nLo: 2, nHi: 4, kHi: 3, k10: 2, ksHalf: true }, 2: { nLo: 2, nHi: 5, kHi: 4, k10: 3 }, 3: { nLo: 3, nHi: 8, kHi: 5, k10: 4, compact: true } },
  'groups-mult':    { 1: { nLo: 2, nHi: 4, kHi: 3, k10: 2, ksHalf: true }, 2: { nLo: 2, nHi: 6, kHi: 4, k10: 3 }, 3: { nLo: 3, nHi: 8, kHi: 5, k10: 4, compact: true } },
  'share-bins':     { 1: { binLo: 2, binHi: 3, eachLo: 2, eachHi: 4 }, 2: { binLo: 2, binHi: 4, eachLo: 2, eachHi: 5 }, 3: { binLo: 3, binHi: 5, eachLo: 3, eachHi: 6 } },
  'group-rings':    { 1: { kLo: 2, kHi: 3, gLo: 2, gHi: 3 }, 2: { kLo: 2, kHi: 5, gLo: 2, gHi: 4 }, 3: { kLo: 3, kHi: 8, gLo: 2, gHi: 5, compact: true } },
  'fact-family':    { 1: { rLo: 2, rHi: 3, cLo: 2, cHi: 4 }, 2: { rLo: 2, rHi: 5, cLo: 2, cHi: 6 }, 3: { rLo: 2, rHi: 5, cLo: 3, cHi: 8 } },
  'missing-factor': { 1: { rLo: 2, rHi: 3, cLo: 2, cHi: 5 }, 2: { rLo: 2, rHi: 5, cLo: 2, cHi: 8 }, 3: { rLo: 3, rHi: 7, cLo: 4, cHi: 9 } },
  'area-grid':      { 1: { rLo: 2, rHi: 4, cLo: 3, cHi: 5 }, 2: { rLo: 2, rHi: 6, cLo: 3, cHi: 9 }, 3: { rLo: 4, rHi: 8, cLo: 5, cHi: 10 } },
  'commutative':    { 1: { rLo: 2, rHi: 3, cLo: 3, cHi: 4 }, 2: { rLo: 2, rHi: 4, cLo: 3, cHi: 6 }, 3: { rLo: 3, rHi: 5, cLo: 4, cHi: 8 } },
};

const NUM = (v) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#3A3530" data-lcs-num="${v}">${v}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:24px;color:#146B5E">${ch}</span>`;
/** the empty answer place on the SCREEN version (the print page keeps its answer box) */
const QBOX = `<span data-lcs-qbox style="display:inline-flex;align-items:center;justify-content:center;width:60px;height:50px;box-sizing:border-box;border:3px dashed #F2784B;border-radius:12px;font-family:'Baloo 2';font-weight:700;font-size:28px;color:#F2784B">?</span>`;
const SCREEN = () => require('../../lib/arrays-screen.js');

function iconArrayHtml(theme, noun, r, c, px, extraAttr) {
  const rows = [];
  for (let rr = 0; rr < r; rr++) {
    rows.push(`<div class="ws-icon-row" style="gap:5px">` +
      Array.from({ length: c }, () => `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="width:${px}px;height:${px}px">`).join('') + `</div>`);
  }
  return `<div class="ws-icon-rows" style="gap:5px" data-lcs-arr-r="${r}" data-lcs-arr-c="${c}"${extraAttr || ''}>${rows.join('')}</div>`;
}

function groupRing(theme, noun, n, px, compact) {
  const imgs = Array.from({ length: n }, () =>
    `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="width:${px}px;height:${px}px">`).join('');
  // compact (level-3 rows): room for THREE icons per line, so big groups stay short
  const maxW = compact ? px * 3 + 2 * 4 + 16 + 5 + 2 : (px + 6) * 3;
  return `<span style="display:inline-flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;max-width:${maxW}px;` +
    `border:2.5px dashed #F2784B;border-radius:16px;padding:8px" data-lcs-ring="${n}">${imgs}</span>`;
}

function areaGridSvg(r, c, cell) {
  const t = tokens;
  const parts = [];
  for (let rr = 0; rr < r; rr++) for (let cc = 0; cc < c; cc++) {
    parts.push(roundedRect({
      x: cc * cell + 1, y: rr * cell + 1, w: cell - 2, h: cell - 2, r: 2,
      fill: t.color.tealSoft, strokeColor: t.color.teal, strokeWidth: 1.5,
      data: { 'data-lcs-sq': 1 },
    }));
  }
  return svgRoot({ width: c * cell + 2, height: r * cell + 2, label: `${r} by ${c} rectangle` },
    parts.join(''), { 'data-lcs-prim': 'area-grid', 'data-lcs-r': r, 'data-lcs-c': c });
}

function makeArrayType(cfg) {
  const { id, slug, mode, gradeBand, i18n, ks } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G23',
    assetClass: 'arrays',
    exerciseType: 'arrays-multiplication',
    themeAxis: { applicable: !['domino-add', 'dice-add', 'area-grid'].includes(mode), minNouns: 4 },
    difficulty: cfg.difficulty || {
      1: { maxR: 3, maxC: 4, cards: 4 },
      2: { maxR: 4, maxC: 6, cards: 4 },
      3: { maxR: 5, maxC: 8, cards: 4 },
    },
    i18n,

    // Level Set 2026-10-04: the screen version (tap) + answer key of every NEW page (lib/arrays-screen.js)
    interactive: SCREEN().interactiveFor(mode),
    /** Level Set copies: the facts a page asks (build-waves compares the copies of a themeless face by these). */
    levelSetWords(m) { return m.facts || []; },

    build({ theme, difficulty, locale }, ctx) {
      // the published page (level 2, copy 1) builds exactly as it shipped; a new page may also be its screen / key
      const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
      if (!published && ctx && (ctx.interactive || ctx.answerKey)) {
        const built = this.build({ theme, difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
        return SCREEN().screenOrKey(mode, built, ctx, String(locale || 'en').slice(0, 2));
      }
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const qa = [];
      const lvTable = (cfg.levels || MODE_LEVELS)[mode];
      const L = lvTable ? (lvTable[difficulty] || lvTable[2]) : null;
      const div = divGlyph(locale);   // C1 2026-09-14: was a hard-coded '÷' (a MINUS in older sv notation)
      const nouns = this.themeAxis.applicable ? rng.sample(labelSafeNouns(theme), d.cards) : null;
      const cards = [];
      const used = new Set();
      for (let i = 0; i < d.cards; i++) {
        let stage;
        if (mode === 'count-array') {
          let r, c, g = 0;
          // d.minR / d.minC (Level Set 2026-10-04): a harder level starts from bigger arrays; d.maxTotal caps the count (K.CC.B.5: up to 20)
          do { r = rng.int(d.minR || 2, d.maxR); c = rng.int(d.minC || 2, d.maxC); g++; } while ((used.has(r + 'x' + c) || (d.maxTotal && r * c > d.maxTotal)) && g < 60);
          used.add(r + 'x' + c);
          const px = Math.min(44, Math.floor(250 / c), Math.floor(150 / r));
          stage = `<div class="ws-card-stage" style="gap:26px;justify-content:space-between;padding:6px 16px">` +
            iconArrayHtml(theme, nouns[i].noun, r, c, px) + answerBox({ w: 80, h: 56, answer: r * c }) + `</div>`;
          qa.push({ visual: iconArrayHtml(theme, nouns[i].noun, r, c, px), eq: QBOX, q: `${r}*${c}`, a: r * c, d: [r * c + c, r * c - c, r + c, r * c + 1] });
        } else if (mode === 'domino-add' || mode === 'dice-add') {
          let a, b, g = 0;
          do { a = rng.int(L.lo, L.hi); b = rng.int(L.lo, L.hi); g++; } while (used.has(a + '+' + b) && g < 30);
          used.add(a + '+' + b);
          const visual = mode === 'domino-add'
            ? domino({ a, b, size: 86 }).svg
            : diceFace({ n: a, size: 86 }).svg + OP('+') + diceFace({ n: b, size: 86 }).svg;
          stage = `<div class="ws-card-stage" style="gap:18px;justify-content:space-between;padding:6px 16px" data-lcs-a="${a}" data-lcs-b="${b}">` +
            `<span style="display:inline-flex;align-items:center;gap:12px">${visual}</span>` +
            `<span style="display:inline-flex;align-items:center;gap:8px">` +
            NUM(a) + OP('+') + NUM(b) + OP('=') + answerBox({ w: 62, h: 50, answer: a + b }) + `</span></div>`;
          qa.push({ visual: `<span style="display:inline-flex;align-items:center;gap:12px">${visual}</span>`, eq: NUM(a) + OP('+') + NUM(b) + OP('=') + QBOX, q: `${a}+${b}`, a: a + b, d: [a + b + 1, a + b - 1, a + b + 2] });
        } else if (mode === 'rep-add' || mode === 'groups-mult') {
          // ks (when given) is the GROUP SIZE the type teaches (x2/x5/x10 …)
          const ksL = ks && L.ksHalf ? ks.slice(0, Math.ceil(ks.length / 2)) : ks;
          const n = ksL ? rng.pick(ksL) : rng.int(L.nLo, L.nHi);
          const k = rng.int(2, n >= 10 ? L.k10 : L.kHi);
          // three or more groups of 7-9 ran past the page bottom at
          // level 2 too (found 2026-09-27): they get the compact rings as well
          const compact = L.compact || (n >= 7 && n < 10 && k >= 3);   // groups of 10 already had their own small size and fit
          const px = compact ? (n >= 7 ? 18 : 22) : (n >= 10 ? 22 : (n >= 5 ? 26 : 34));
          const rings = Array.from({ length: k }, () => groupRing(theme, nouns[i].noun, n, px, compact)).join('');
          const eq = mode === 'rep-add'
            ? Array.from({ length: k }, (_, x) => NUM(n)).join(OP('+')) + OP('=') + answerBox({ w: 60, h: 48, answer: k * n })
            : NUM(k) + OP('×') + NUM(n) + OP('=') + answerBox({ w: 60, h: 48, answer: k * n });
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-k="${k}" data-lcs-n="${n}">` +
            `<span style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">${rings}</span>` +
            `<span style="display:inline-flex;align-items:center;gap:6px">${eq}</span></div>`;
          const qeq = mode === 'rep-add' ? Array.from({ length: k }, () => NUM(n)).join(OP('+')) + OP('=') + QBOX : NUM(k) + OP('×') + NUM(n) + OP('=') + QBOX;
          qa.push({ visual: `<span style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;max-width:600px">${rings}</span>`, eq: qeq, q: `${k}*${n}`, a: k * n, d: [k * n + n, k * n - n, k + n, k * n + 1] });
        } else if (mode === 'build-array') {
          let r, c, g = 0;
          do { r = rng.int(2, d.maxR); c = rng.int(2, d.maxC); g++; } while ((r === c || used.has(r + 'x' + c)) && g < 30);
          used.add(r + 'x' + c);
          const px = 16;
          const opts = rng.shuffle([
            { r, c, ok: true },
            // 2026-10-04 (native + pedagogy review): the TURNED array (c rows of r) was a decoy, but it shows the same
            // product — the very fact G3-314 teaches — so it was a second right answer. The decoys are now one ROW and one
            // COLUMN off (one more when the side is only 2: Math.max(2, c - 1) had drawn the right array twice).
            { r: r > 2 ? r - 1 : r + 1, c, ok: false },
            { r, c: c > 2 ? c - 1 : c + 1, ok: false },
          ]);
          const chips = opts.map((o) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:12px;padding:8px"${o.ok ? ' data-lcs-correct="1"' : ''}>` +
            iconArrayHtml(theme, nouns[i].noun, o.r, o.c, px) + `</span>`).join('');
          stage = `<div class="ws-card-stage" style="gap:20px;justify-content:space-between;padding:6px 12px" data-lcs-r="${r}" data-lcs-c="${c}">` +
            `<span style="display:inline-flex;align-items:center;gap:6px">${NUM(r)}${OP('×')}${NUM(c)}</span>` +
            `<span class="ws-pattern-choices">${chips}</span></div>`;
          // the screen offers the page's own three arrays, in the page's order
          // one picture size for all three (a smaller picture in one option would be a tell), as big as the widest fits
          const opx = Math.min(30, Math.floor(150 / Math.max(...opts.map((o) => Math.max(o.r, o.c)))));
          qa.push({ choose: true, eq: NUM(r) + OP('×') + NUM(c), q: `${r}x${c}`, opts: opts.map((o) => ({ label: `${o.r}x${o.c}`, html: iconArrayHtml(theme, nouns[i].noun, o.r, o.c, opx), ok: o.ok })) });
        } else if (mode === 'share-bins') {
          const bins = rng.int(L.binLo, L.binHi);
          const each = rng.int(L.eachLo, L.eachHi);
          const total = bins * each;
          const px = Math.min(40, Math.floor(300 / total * 2));
          const pile = Array.from({ length: total }, () =>
            `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt="" style="width:${px}px;height:${px}px">`).join('');
          const binEls = Array.from({ length: bins }, () =>
            `<span class="ws-bin" style="height:90px;max-width:130px" data-lcs-bin></span>`).join('');
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-total="${total}" data-lcs-bins="${bins}">` +
            `<span style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:520px">${pile}</span>` +
            `<span style="display:flex;gap:18px;width:80%;justify-content:center">${binEls}</span>` +
            `<span style="display:inline-flex;align-items:center;gap:8px">` +
            NUM(total) + OP(div) + NUM(bins) + OP('=') + answerBox({ w: 60, h: 48, answer: each }) + `</span></div>`;
          qa.push({ visual: `<span style="display:flex;flex-direction:column;align-items:center;gap:12px;width:520px"><span style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:520px">${pile}</span><span style="display:flex;gap:18px;width:80%;justify-content:center">${binEls}</span></span>`,
            eq: NUM(total) + OP(div) + NUM(bins) + OP('=') + QBOX, q: `${total}/${bins}`, a: each, d: [each + 1, each - 1, bins, each + 2] });
        } else if (mode === 'group-rings') {
          const k = rng.int(L.kLo, L.kHi);
          const groups = rng.int(L.gLo, L.gHi);
          const total = k * groups;
          const px = L.compact ? (k >= 7 ? 18 : 22) : 30;
          const rings = Array.from({ length: groups }, () => groupRing(theme, nouns[i].noun, k, px, L.compact)).join('');
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-total="${total}" data-lcs-k="${k}" data-lcs-groups="${groups}">` +
            `<span style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">${rings}</span>` +
            `<span style="display:inline-flex;align-items:center;gap:8px">` +
            NUM(total) + OP(div) + NUM(k) + OP('=') + answerBox({ w: 60, h: 48, answer: groups }) + `</span></div>`;
          qa.push({ visual: `<span style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;max-width:600px">${rings}</span>`, eq: NUM(total) + OP(div) + NUM(k) + OP('=') + QBOX, q: `${total}/${k}`, a: groups, d: [groups + 1, groups - 1, k, groups + 2] });
        } else if (mode === 'fact-family') {
          let r, c, g = 0;
          do { r = rng.int(L.rLo, L.rHi); c = rng.int(L.cLo, L.cHi); g++; } while ((r === c || used.has(r + 'x' + c)) && g < 30);
          used.add(r + 'x' + c);
          const px = Math.min(34, Math.floor(190 / c));
          const line = (x, op, y, ans) =>
            `<span style="display:inline-flex;align-items:center;gap:6px" data-lcs-fact="${x}${op}${y}=${ans}">` +
            NUM(x) + OP(op === '*' ? '×' : div) + NUM(y) + OP('=') + answerBox({ w: 50, h: 40, answer: ans }) + `</span>`;
          stage = `<div class="ws-card-stage" style="gap:24px;justify-content:space-between;padding:6px 14px" data-lcs-r="${r}" data-lcs-c="${c}">` +
            iconArrayHtml(theme, nouns[i].noun, r, c, px) +
            // gap 10 → 8 (2026-09-14): four 40 px boxes + three 10 px gaps put the last box 3 px into the
            // attribution band (lint added 2026-09-03, after these decks shipped); 8 keeps the column clear.
            `<span style="display:inline-flex;flex-direction:column;gap:8px">` +
            line(r, '*', c, r * c) + line(c, '*', r, r * c) + line(r * c, '/', r, c) + line(r * c, '/', c, r) +
            `</span></div>`;
          // the screen asks the card's four facts one by one, each beside the same array
          const arr = iconArrayHtml(theme, nouns[i].noun, r, c, px);
          const fq = (x, op, y) => NUM(x) + OP(op === '*' ? '×' : div) + NUM(y) + OP('=') + QBOX;
          qa.push({ visual: arr, eq: fq(r, '*', c), q: `${r}*${c}`, a: r * c, d: [r * c + c, r * c - r, r + c, r * c + 1] });
          qa.push({ visual: arr, eq: fq(c, '*', r), q: `${c}*${r}`, a: r * c, d: [r * c + r, r * c - c, r + c, r * c - 1] });
          qa.push({ visual: arr, eq: fq(r * c, '/', r), q: `${r * c}/${r}`, a: c, d: [c + 1, c - 1, r, c + 2] });
          qa.push({ visual: arr, eq: fq(r * c, '/', c), q: `${r * c}/${c}`, a: r, d: [r + 1, r - 1, c, r + 2] });
        } else if (mode === 'missing-factor') {
          let r, c, g = 0;
          do { r = rng.int(L.rLo, L.rHi); c = rng.int(L.cLo, L.cHi); g++; } while (used.has(r + 'x' + c) && g < 30);
          used.add(r + 'x' + c);
          // fit the card height too once there are 5+ rows (5 rows of full-size
          // pictures ran past the page bottom at level 2 as well — found 2026-09-27)
          const px = Math.min(36, Math.floor(220 / c), r >= 5 ? Math.floor(155 / r) - 5 : 99);
          stage = `<div class="ws-card-stage" style="gap:24px;justify-content:space-between;padding:6px 14px" data-lcs-r="${r}" data-lcs-c="${c}">` +
            iconArrayHtml(theme, nouns[i].noun, r, c, px) +
            `<span style="display:inline-flex;align-items:center;gap:8px">` +
            answerBox({ w: 56, h: 46, answer: r }) + OP('×') + NUM(c) + OP('=') + NUM(r * c) + `</span></div>`;
          qa.push({ visual: iconArrayHtml(theme, nouns[i].noun, r, c, px), eq: QBOX + OP('×') + NUM(c) + OP('=') + NUM(r * c), q: `?*${c}=${r * c}`, a: r, d: [r + 1, r - 1, c, r + 2] });
        } else if (mode === 'area-grid') {
          let r, c, g = 0;
          do { r = rng.int(L.rLo, L.rHi); c = rng.int(L.cLo, L.cHi); g++; } while (used.has(r + 'x' + c) && g < 30);
          used.add(r + 'x' + c);
          const cell = Math.min(34, Math.floor(260 / c), Math.floor(150 / r));
          stage = `<div class="ws-card-stage" style="gap:24px;justify-content:space-between;padding:6px 14px">` +
            areaGridSvg(r, c, cell) +
            `<span style="display:inline-flex;align-items:center;gap:8px">` +
            NUM(r) + OP('×') + NUM(c) + OP('=') + answerBox({ w: 64, h: 50, answer: r * c }) + `</span></div>`;
          // the perimeter (2r + 2c) is the classic area slip
          qa.push({ visual: areaGridSvg(r, c, cell), eq: NUM(r) + OP('×') + NUM(c) + OP('=') + QBOX, q: `${r}*${c}`, a: r * c, d: [2 * (r + c), r * c + c, r * c - r, r + c] });
        } else if (mode === 'commutative') {
          let r, c, g = 0;
          do { r = rng.int(L.rLo, L.rHi); c = rng.int(L.cLo, L.cHi); g++; } while ((r === c || used.has(r + 'x' + c)) && g < 30);
          used.add(r + 'x' + c);
          const px = c > 6 ? Math.floor(22 * 6 / c) : 22;
          stage = `<div class="ws-card-stage" style="gap:20px;justify-content:space-between;padding:6px 12px" data-lcs-r="${r}" data-lcs-c="${c}">` +
            `<span data-lcs-side="rc">${iconArrayHtml(theme, nouns[i].noun, r, c, px)}</span>` +
            `<span data-lcs-side="cr">${iconArrayHtml(theme, nouns[i].noun, c, r, px)}</span>` +
            `<span style="display:inline-flex;flex-direction:column;gap:10px">` +
            `<span style="display:inline-flex;align-items:center;gap:6px">${NUM(r)}${OP('×')}${NUM(c)}${OP('=')}${answerBox({ w: 52, h: 42, answer: r * c })}</span>` +
            `<span style="display:inline-flex;align-items:center;gap:6px">${NUM(c)}${OP('×')}${NUM(r)}${OP('=')}${answerBox({ w: 52, h: 42, answer: r * c })}</span>` +
            `</span></div>`;
          qa.push({ visual: `<span style="display:inline-flex;gap:28px;align-items:center">${iconArrayHtml(theme, nouns[i].noun, r, c, px)}${iconArrayHtml(theme, nouns[i].noun, c, r, px)}</span>`,
            eq: NUM(r) + OP('×') + NUM(c) + OP('=') + NUM(c) + OP('×') + NUM(r) + OP('=') + QBOX, q: `${r}*${c}`, a: r * c, d: [r * c + r, r * c - c, r + c, r * c + 1] });
        }
        cards.push(stage);
      }
      const cols = ['domino-add', 'dice-add'].includes(mode) ? 1 : (['rep-add', 'groups-mult', 'group-rings', 'share-bins'].includes(mode) ? 2 : 1);
      // published pages keep meta {} (as shipped); a Level Set page names its facts. _ans (not meta) feeds the screen / key.
      return { bodyHtml: cardGrid({ cards, cols, rows: Math.ceil(d.cards / cols) }), meta: published ? {} : { facts: qa.map((x) => x.q) }, _ans: qa };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        const arrOk = (el2) => {
          const r = +el2.dataset.lcsArrR, c = +el2.dataset.lcsArrC;
          const rows = [...el2.querySelectorAll('.ws-icon-row')];
          if (rows.length !== r) return `rows ${rows.length}!=${r}`;
          for (const row of rows) if (row.querySelectorAll('.ws-icon').length !== c) return `cols!=${c}`;
          return null;
        };
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          const box = card.querySelector('[data-lcs-answer]');
          if (mode === 'count-array') {
            const a = card.querySelector('[data-lcs-arr-r]');
            const err = arrOk(a);
            if (err) fails.push(`card ${i + 1}: ${err}`);
            const r = +a.dataset.lcsArrR, c = +a.dataset.lcsArrC;
            if (+box.dataset.lcsAnswer !== r * c) fails.push(`card ${i + 1}: total mismatch`);
          } else if (mode === 'domino-add' || mode === 'dice-add') {
            const st = card.querySelector('[data-lcs-a]');
            const a = +st.dataset.lcsA, b = +st.dataset.lcsB;
            const pipsA = card.querySelectorAll(mode === 'domino-add' ? '[data-lcs-pip="a"]' : '[data-lcs-prim="dice"]:first-of-type [data-lcs-pip]').length;
            if (mode === 'domino-add') {
              const pipsB = card.querySelectorAll('[data-lcs-pip="b"]').length;
              if (pipsA !== a || pipsB !== b) fails.push(`card ${i + 1}: pips ${pipsA},${pipsB} != ${a},${b}`);
            } else {
              const dice = [...card.querySelectorAll('[data-lcs-prim="dice"]')];
              if (dice.length !== 2) fails.push(`card ${i + 1}: ${dice.length} dice`);
              else {
                if (+dice[0].dataset.lcsN !== a || +dice[1].dataset.lcsN !== b) fails.push(`card ${i + 1}: dice != ${a},${b}`);
                dice.forEach((dd) => {
                  if (dd.querySelectorAll('[data-lcs-pip]').length !== +dd.dataset.lcsN) fails.push(`card ${i + 1}: pip count`);
                });
              }
            }
            if (+box.dataset.lcsAnswer !== a + b) fails.push(`card ${i + 1}: sum mismatch`);
          } else if (mode === 'rep-add' || mode === 'groups-mult') {
            const st = card.querySelector('[data-lcs-k]');
            const k = +st.dataset.lcsK, n = +st.dataset.lcsN;
            const rings = [...card.querySelectorAll('[data-lcs-ring]')];
            if (rings.length !== k) fails.push(`card ${i + 1}: ${rings.length} groups != ${k}`);
            rings.forEach((g2) => { if (g2.querySelectorAll('.ws-icon').length !== n) fails.push(`card ${i + 1}: group size != ${n}`); });
            if (+box.dataset.lcsAnswer !== k * n) fails.push(`card ${i + 1}: product mismatch`);
          } else if (mode === 'build-array') {
            const r = +card.querySelector('[data-lcs-r]').dataset.lcsR;
            const c = +card.querySelector('[data-lcs-r]').dataset.lcsC;
            const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((x) => x.dataset.lcsCorrect);
            if (correct.length !== 1) { fails.push(`card ${i + 1}: ${correct.length} correct`); return; }
            const a = correct[0].querySelector('[data-lcs-arr-r]');
            if (+a.dataset.lcsArrR !== r || +a.dataset.lcsArrC !== c) fails.push(`card ${i + 1}: correct chip != ${r}x${c}`);
            if (arrOk(a)) fails.push(`card ${i + 1}: correct array malformed`);
          } else if (mode === 'share-bins') {
            const st = card.querySelector('[data-lcs-total]');
            const total = +st.dataset.lcsTotal, bins = +st.dataset.lcsBins;
            if (card.querySelectorAll('.ws-icon').length !== total) fails.push(`card ${i + 1}: pile != ${total}`);
            if (card.querySelectorAll('[data-lcs-bin]').length !== bins) fails.push(`card ${i + 1}: bins != ${bins}`);
            if (total % bins !== 0) fails.push(`card ${i + 1}: not divisible`);
            if (+box.dataset.lcsAnswer !== total / bins) fails.push(`card ${i + 1}: quotient mismatch`);
          } else if (mode === 'group-rings') {
            const st = card.querySelector('[data-lcs-total]');
            const total = +st.dataset.lcsTotal, k = +st.dataset.lcsK, groups = +st.dataset.lcsGroups;
            const rings = [...card.querySelectorAll('[data-lcs-ring]')];
            if (rings.length !== groups) fails.push(`card ${i + 1}: rings != ${groups}`);
            rings.forEach((g2) => { if (g2.querySelectorAll('.ws-icon').length !== k) fails.push(`card ${i + 1}: ring size != ${k}`); });
            if (groups * k !== total || +box.dataset.lcsAnswer !== groups) fails.push(`card ${i + 1}: division facts wrong`);
          } else if (mode === 'fact-family') {
            const r = +card.querySelector('[data-lcs-r]').dataset.lcsR;
            const c = +card.querySelector('[data-lcs-r]').dataset.lcsC;
            if (arrOk(card.querySelector('[data-lcs-arr-r]'))) fails.push(`card ${i + 1}: array malformed`);
            const facts = [...card.querySelectorAll('[data-lcs-fact]')].map((f) => f.dataset.lcsFact);
            const want = [`${r}*${c}=${r * c}`, `${c}*${r}=${r * c}`, `${r * c}/${r}=${c}`, `${r * c}/${c}=${r}`];
            want.forEach((x) => { if (!facts.includes(x)) fails.push(`card ${i + 1}: missing ${x}`); });
          } else if (mode === 'missing-factor') {
            const r = +card.querySelector('[data-lcs-r]').dataset.lcsR;
            if (arrOk(card.querySelector('[data-lcs-arr-r]'))) fails.push(`card ${i + 1}: array malformed`);
            if (+box.dataset.lcsAnswer !== r) fails.push(`card ${i + 1}: missing factor != rows`);
          } else if (mode === 'area-grid') {
            const svg = card.querySelector('[data-lcs-prim="area-grid"]');
            const r = +svg.dataset.lcsR, c = +svg.dataset.lcsC;
            if (svg.querySelectorAll('[data-lcs-sq]').length !== r * c) fails.push(`card ${i + 1}: squares != ${r * c}`);
            if (+box.dataset.lcsAnswer !== r * c) fails.push(`card ${i + 1}: area mismatch`);
          } else if (mode === 'commutative') {
            const r = +card.querySelector('[data-lcs-r]').dataset.lcsR;
            const c = +card.querySelector('[data-lcs-r]').dataset.lcsC;
            const rc = card.querySelector('[data-lcs-side="rc"] [data-lcs-arr-r]');
            const cr = card.querySelector('[data-lcs-side="cr"] [data-lcs-arr-r]');
            if (+rc.dataset.lcsArrR !== r || +cr.dataset.lcsArrR !== c) fails.push(`card ${i + 1}: arrays not transposed`);
            const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
            if (boxes[0] !== r * c || boxes[1] !== r * c) fails.push(`card ${i + 1}: products mismatch`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeArrayType };
