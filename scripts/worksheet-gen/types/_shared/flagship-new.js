/**
 * flagship-new.js — the new templates of the six flagship picture makers (docs/makers/FLAGSHIP.md), one engine each `mode`:
 * every page is built from the library's drawings or the colouring alphabet. The picture-led pages take the teacher's picture
 * and theme (lib/fl-art.js); New version walks the pool, so a template never runs out of pages.
 */
'use strict';
const path = require('path');
const CG = require('../../lib/color-glyphs.js');
const FL = require('../../lib/fl-art.js');
const platform = require('../../lib/platform/index.js');
const T = require('../../primitives/_tokens.js').color;
const { fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');
const { letterUnits, unitForms } = require('../k/K-238-letter-tracing.js');
const K285 = require('../k/K-285-dot-to-dot.js');
const sceneDotFigure = require('../../primitives/scene-dot-figure.js');
const P = require('../../lib/pt-faces.js');
const { rulingBlock } = require('../../templates/components-b2.js');
const { strokeWordLane } = require('../../primitives/trace-path.js');
const { formOf } = require('../../lib/fl-forms.js');

const OK = ' data-lcs-correct="1"';
const INK = T.ink;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const copyOf = (ctx) => Math.max(1, Number((ctx && ctx.makerCopy) || 1));
const split = (k) => { const j = k.indexOf('/'); return { theme: k.slice(0, j), noun: k.slice(j + 1) }; };
// multiply: the 435 new drawings are rendered on opaque white (every library picture before them is transparent), and on
// a cream card or an answer key's painted cell they showed as white squares (2026-11-09, read on Trace the Path); multiply
// lets the card show through the white and leaves the black lines as they are
const img = (k, px, style = '') => { const p = split(k); return `<img class="ws-icon" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain;mix-blend-mode:multiply;${style}">`; };
const page = (mode, inner, extra = '') => `<div data-ws-content data-lcs-fl-mode="${mode}" ${extra} style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:12px;min-height:0">${inner}</div>`;
const units = (loc) => letterUnits(loc).filter((u) => { const f = unitForms(u, loc); return !!f.cap && !!f.low && CG.has(f.cap) && CG.has(f.low) && [...f.cap].length === 1 && [...f.low].length === 1; });

/** the page's picture: the teacher's, else the theme's next, else the pool's next; the pool is reported to the screen */
function hero(ctx, pool, stride = 1) {
  const n = copyOf(ctx), k = FL.choose(ctx, pool, n) || pool[((n - 1) * stride) % pool.length];
  FL.report(ctx, pool, k);
  return k;
}
/** n other pictures of the hero's group (the whole pool when the group is small) */
function kin(key, pool, rng, n) {
  const g = FL.groupOf(key), mine = pool.filter((k) => k !== key && FL.groupOf(k) === g);
  // shuffled by the copy's seed AND the picture: read on the sheets 2026-11-08, every animal picked in one copy got the same
  // two companions (a sheep and a kangaroo) because the shuffle depended on the copy alone
  const { makeRng } = require('../../lib/rng.js');
  // and never two drawings of one thing (two chairs, two cats): a page that counts "each kind" counts them as one kind
  const noun = (k) => String(k).split('/').pop().replace(/_\d+$/, '');
  const seen = new Set([noun(key)]), out = [];
  for (const k of makeRng(String(rng.seed) + '|kin|' + key).shuffle(mine.length >= n ? mine : pool.filter((x) => x !== key))) {
    if (seen.has(noun(k))) continue;
    seen.add(noun(k)); out.push(k);
    if (out.length === n) break;
  }
  return out;
}

/* ---------------------------------------------------------------- glyph figures ---------------------------------------------------------------- */
const EMPTY = { w: 4, h: 4, s: '0'.repeat(16) };
/** the outline of a character as a dot figure; the inner lines stay printed. Fewer dots when a number has no room. */
function glyphFigure(ch, count, { labelPx = 22, width = 640 } = {}) {
  const lines = CG.contours(ch);
  // the WHOLE character fits the box, its marks too (flagship visual check 2026-11-08: fitted to its body alone, the dots of
  // Ä, the ring of Å and the accent of É were cut off by the frame)
  const all = lines.flatMap((l) => l.pts), xs = all.map((p) => p[0]), ys = all.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const k = Math.min(470 / (x1 - x0), 450 / (y1 - y0)), at = ([x, y]) => [300 + (x - (x0 + x1) / 2) * k, 280 + (y - (y0 + y1) / 2) * k];
  // the ink of the printed inner lines and marks (the dots of Ä, an accent, a counter) as the figure's ink grid: the figure
  // fits what is printed into the frame and keeps the numbers off it (an empty grid let the marks run out of the frame)
  const GW = 60, GH = 56, CELL = 600 / GW, cells = new Uint8Array(GW * GH);
  for (const l of lines.slice(1)) for (let i = 0; i < l.pts.length; i++) {
    const a = at(l.pts[i]), b = at(l.pts[(i + 1) % l.pts.length]), steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 4));
    for (let j = 0; j <= steps; j++) { const x = Math.floor((a[0] + (b[0] - a[0]) * j / steps) / CELL), y = Math.floor((a[1] + (b[1] - a[1]) * j / steps) / CELL); if (x >= 0 && y >= 0 && x < GW && y < GH) cells[y * GW + x] = 1; }
  }
  // the inside of each mark and counter too: a number never sits inside the dots of Ö or an accent
  const inner = lines.slice(1).map((l) => ({ pts: l.pts.map(at) }));
  for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) if (!cells[y * GW + x] && inner.some((l) => inGlyph([l], (x + 0.5) * CELL, (y + 0.5) * CELL))) cells[y * GW + x] = 1;
  const inkGrid = lines.length > 1 ? { w: GW, h: GH, s: Array.from(cells, (c) => (c ? '1' : '0')).join('') } : EMPTY;
  // a narrow character (I, 1) has room for fewer numbers: down to half the count before it is refused
  for (let n = count; n >= Math.max(8, Math.ceil(count / 2)); n -= 2) {
    const pts = CG.outlineDots(ch, n).map(at);
    const scene = { id: 'glyph-' + ch.codePointAt(0), fit: { [n]: { ok: true, closed: true, pts, art: '', lite: '', ink: inkGrid, liteInk: inkGrid } } };
    let f;
    try { f = sceneDotFigure({ scene, count: n, lite: true, labelPx, width }); } catch (e) { continue; }
    // the inner lines, in the figure's own px (its scale from the first two distant dots)
    const a = pts[0], far = pts.reduce((b, p) => (Math.hypot(p[0] - a[0], p[1] - a[1]) > Math.hypot(b[0] - a[0], b[1] - a[1]) ? p : b), pts[1]);
    const i = pts.indexOf(far), s = Math.hypot(f.points[i][0] - f.points[0][0], f.points[i][1] - f.points[0][1]) / Math.hypot(far[0] - a[0], far[1] - a[1]);
    const px = (p) => { const q = at(p); return (f.points[0][0] + (q[0] - a[0]) * s).toFixed(1) + ' ' + (f.points[0][1] + (q[1] - a[1]) * s).toFixed(1); };
    const inner = lines.slice(1).map((c) => `<path d="M${c.pts.filter((_, j) => j % 3 === 0).map(px).join('L')}Z" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`).join('');
    return { ...f, svg: f.svg.replace('</svg>', inner + '</svg>') };
  }
  throw new Error('glyphFigure: no room for the numbers of "' + ch + '"');
}
/** is a point inside a character (even-odd over its lines)? */
function inGlyph(lines, x, y) {
  let c = false;
  for (const { pts } of lines) for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c;
  }
  return c;
}

/* ---------------------------------------------------------------- look-alikes of the difference grids ---------------------------------------------------------------- */
const TWINS = { letters: [['O', 'Q'], ['E', 'F'], ['P', 'R'], ['C', 'G'], ['M', 'N'], ['U', 'V'], ['I', 'L'], ['D', 'O'], ['B', 'R'], ['K', 'X']], numbers: [['6', '9'], ['3', '8'], ['1', '7'], ['2', '5'], ['4', '9'], ['5', '6']] };
const cell = (inner, px, extra = '') => `<span style="display:inline-flex;align-items:center;justify-content:center;width:${px}px;height:${px}px;border:2px solid ${INK};box-sizing:border-box;background:#fff"${extra}>${inner}</span>`;
const gridOf = (cols, cells) => `<div data-lcs-ws-grid style="display:grid;grid-template-columns:repeat(${cols},auto);gap:0;justify-content:center;border:3px solid ${INK};border-radius:8px;overflow:hidden">${cells.join('')}</div>`;

function diffGrid(mode, { lv, rng, draw, alphabet, twins, ctx, pics }) {
  const [cols, rows, k] = { 1: [6, 3, 3], 2: [7, 4, 5], 3: [8, 4, 7] }[lv], px = Math.floor(630 / cols), n = cols * rows;
  const a = Array.from({ length: n }, () => rng.pick(alphabet));
  const at = rng.shuffle(Array.from({ length: n }, (_, i) => i)).slice(0, k), b = a.slice();
  for (const i of at) {
    const pair = lv === 3 && twins ? twins.find((t) => t.includes(a[i])) : null;
    let v = pair ? pair[0] === a[i] ? pair[1] : pair[0] : rng.pick(alphabet.filter((x) => x !== a[i]));
    if (!alphabet.includes(v)) v = rng.pick(alphabet.filter((x) => x !== a[i]));
    b[i] = v;
  }
  const top = gridOf(cols, a.map((v) => cell(draw(v, px), px)));
  const bottom = gridOf(cols, b.map((v, i) => cell(draw(v, px), px, (at.includes(i) ? OK : '') + ` data-lcs-label="${i + 1}"`)));
  ctx.tokens = { N: String(k) };
  return { bodyHtml: page(mode, top + bottom, `data-lcs-diffs="${k}"`), meta: { mode, a, b, at }, tokens: ctx.tokens };
}

/* ---------------------------------------------------------------- the modes ---------------------------------------------------------------- */
const MODES = {
  'color-count'({ lv, ctx, rng }) {
    const pool = FL.keys('pt'), h = hero(ctx, pool, 3), kinds = [h, ...kin(h, pool, rng, lv === 1 ? 1 : 2)];
    const R = { 1: [2, 5], 2: [2, 7], 3: [4, 9] }[lv], counts = rng.shuffle(Array.from({ length: R[1] - R[0] + 1 }, (_, i) => R[0] + i)).slice(0, kinds.length);
    const items = rng.shuffle(kinds.flatMap((k, i) => Array.from({ length: counts[i] }, () => k)));
    // the column count that gives the biggest pictures in the body left above the count strip (2026-11-09: a fixed 5
    // columns made the pictures width-bound and left a quarter of the page empty)
    const gridH = 700 - ((ctx && ctx.chromeExtra) || 0) - 92 - 16 - 20;   // the strip, the gap, the grid's padding + border
    let cols = 4, px = 0;
    for (let c = 3; c <= 6; c++) { const r = Math.ceil(items.length / c), p = Math.min(170, Math.floor(Math.min((620 - (c - 1) * 6) / c, (gridH - (r - 1) * 6) / r))); if (p > px) { cols = c; px = p; } }
    const tiles = items.map((k, i) => `<span style="display:inline-flex${i === 0 ? '' : ''}">${img(k, px)}</span>`);
    const strip = kinds.map((k, i) => `<div style="display:flex;align-items:center;gap:8px"${i === 0 ? FL.tap(ctx) : ''}>${img(k, 72)}${answerBox({ w: 72, h: 66, answer: String(counts[i]) })}</div>`).join('');
    return { bodyHtml: page('color-count', `<div style="box-sizing:border-box;background:#fff;border:2px solid ${T.grid};border-radius:16px;width:660px;padding:8px;display:grid;grid-template-columns:repeat(${cols},auto);justify-content:center;gap:6px">${tiles.join('')}</div><div style="box-sizing:border-box;background:#fff;border:2px solid ${T.grid};border-radius:16px;width:660px;padding:8px;display:flex;flex-direction:row;justify-content:space-around;align-items:center">${strip}</div>`), meta: { kinds, counts } };
  },
  bookmarks({ lv, ctx, rng }) {
    const pool = FL.keys('pt'), h = hero(ctx, pool, 5), n = { 1: 3, 2: 4, 3: 4 }[lv], per = { 1: 2, 2: 3, 3: 3 }[lv];
    const list = [h, ...kin(h, pool, rng, n * per - 1)], w = Math.floor((660 - (n - 1) * 14) / n), H = 700 - ((ctx && ctx.chromeExtra) || 0);
    const heart = CG.glyph('!', { h: 1 });   // (the glyph store is read before the page is laid out)
    void heart;
    const marks = Array.from({ length: n }, (_, b) => {
      const pics = list.slice(b * per, b * per + per).map((k) => img(k, Math.min(w - 26, Math.floor((H - 90) / per) - 8))).join('');
      return `<div data-lcs-bookmark="${b + 1}"${b === 0 ? FL.tap(ctx) : ''} style="box-sizing:border-box;width:${w}px;height:${H}px;border:2.5px dashed ${INK};border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;padding:8px 4px"><span style="width:26px;height:26px;border:2.5px solid ${INK};border-radius:50%"></span>${pics}</div>`;
    });
    return { bodyHtml: page('bookmarks', `<div style="display:flex;gap:14px;justify-content:center">${marks.join('')}</div>`), meta: { list } };
  },
  'letter-dots'({ lv, loc, unit, ctx }) {
    const ch = unitForms(unit, loc).cap, f = glyphFigure(ch, { 1: 16, 2: 24, 3: 34 }[lv], { labelPx: { 1: 24, 2: 22, 3: 19 }[lv] });
    const key = !!(ctx && ctx.answerKey);
    return { bodyHtml: page('letter-dots', `<div class="ws-card" style="width:660px;align-items:center;justify-content:center;padding:6px">${key ? K285.d2d.withPath(f, true) : f.svg}</div>`), meta: { ch, labels: f.labels } };
  },
  'number-dots'({ lv, unit, ctx }) {
    const f = glyphFigure(String(unit), { 1: 14, 2: 22, 3: 32 }[lv], { labelPx: { 1: 24, 2: 22, 3: 19 }[lv] });
    const key = !!(ctx && ctx.answerKey);
    return { bodyHtml: page('number-dots', `<div class="ws-card" style="width:660px;align-items:center;justify-content:center;padding:6px">${key ? K285.d2d.withPath(f, true) : f.svg}</div>`), meta: { unit, labels: f.labels } };
  },
  'two-dots'({ lv, ctx }) {
    const n = { 1: 10, 2: 10, 3: 20 }[lv], step = lv === 2 ? 2 : 1, c = copyOf(ctx), W = 400 - ((ctx && ctx.chromeExtra) || 0);
    const fig = { count: n, step, startAt: step, lite: true, labelPx: 17, width: W };
    const one = K285.d2d.pageScene([], 0, n, fig, ctx, c);
    if (!one) throw new Error('two-dots: no picture');
    let two = K285.d2d.pageScene([], 0, n, fig, null, c + 11);
    if (two && two.scene.hero === one.scene.hero) two = K285.d2d.pageScene([], 0, n, fig, null, c + 12);
    const key = !!(ctx && ctx.answerKey);
    const card = (g, tap) => `<div class="ws-card"${tap} style="width:660px;flex-direction:row;align-items:center;justify-content:space-around;padding:4px">${key ? K285.d2d.withPath(g.f, !/data-lcs-open="1"/.test(g.f.svg)) : g.f.svg}<div style="display:grid;grid-template-columns:repeat(${n > 10 ? 4 : 2},52px);gap:6px">${g.f.labels.map((v) => `<span style="display:inline-flex;align-items:center;justify-content:center;height:44px;border:2px solid ${T.grid};border-radius:10px;font:700 24px 'Baloo 2',cursive;color:${T.ink}">${v}</span>`).join('')}</div></div>`;
    return { bodyHtml: page('two-dots', card(one, FL.tap(ctx)) + card(two, '')), meta: { a: one.scene.hero, b: two.scene.hero } };
  },
  'dots-word'({ lv, loc, ctx }) {
    const n = { 1: 10, 2: 20, 3: 20 }[lv], step = lv === 3 ? 2 : 1, c = copyOf(ctx), fig = { count: n, step, startAt: step, lite: true, labelPx: 20, width: 560 };
    // one word, and every letter of it has stroke data for the level-1 trace lane (fr "œuf": no "œ" — refused a pick, 2026-11-08)
    const LS = require('../../data/tracing/letter-strokes.js');
    const traceable = (w) => [...w].every((ch) => { try { LS.glyphFor(ch); return true; } catch (e) { return false; } });
    const named = (k) => { const f = formOf(k, loc); return !!f && !!f.word && /^\p{L}+$/u.test(f.word) && (lv !== 1 || traceable(f.word)); };
    let got = null;
    // only pictures with a one-word name reach the picker and the theme tiles (flagship visual check 2026-11-08: a pick
    // of a two-word picture was refused, "no picture with one word to write")
    for (let t = 0; t < 40 && !got; t++) { const g = K285.d2d.pageScene([], 0, n, fig, ctx, c + t * 31, named); if (g && named(g.scene.hero)) got = g; }
    if (!got) throw new Error('dots-word: no picture with one word to write');
    const word = formOf(got.scene.hero, loc).word;
    const key = !!(ctx && ctx.answerKey);
    const line = lv === 1 ? strokeWordLane({ text: word, w: 640, h: 100, glyphH: 66, reps: 1, modelless: true }).svg : rulingBlock({ rows: 1, w: 640, h: 92, glyphH: 60, starters: lv === 2 ? { 0: [...word][0] } : {} });
    const svgLine = typeof line === 'string' ? line : line.svg;
    const keyWord = key ? `<div data-lcs-keytext="1" style="font:700 40px 'Baloo 2',cursive;color:${T.ink}">${esc(word)}</div>` : '';
    return { bodyHtml: page('dots-word', `<div class="ws-card"${FL.tap(ctx)} style="width:660px;align-items:center;justify-content:center;padding:4px">${key ? K285.d2d.withPath(got.f, !/data-lcs-open="1"/.test(got.f.svg)) : got.f.svg}</div>${keyWord || `<div>${svgLine}</div>`}`), meta: { picture: got.scene.hero, word } };
  },
  mosaic({ lv, loc, unit, rng, ctx }) {
    const ch = unitForms(unit, loc).cap, lines = CG.contours(ch), [C, R] = { 1: [9, 11], 2: [11, 13], 3: [13, 15] }[lv], M = { 1: 9, 2: 20, 3: 99 }[lv];
    const all = lines.flatMap((l) => l.pts), x0 = Math.min(...all.map((p) => p[0])), x1 = Math.max(...all.map((p) => p[0])), y0 = Math.min(...all.map((p) => p[1])), y1 = Math.max(...all.map((p) => p[1]));
    const S = Math.max((x1 - x0) / (C - 2), (y1 - y0) / (R - 2)), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, px = Math.min(Math.floor(630 / C), Math.floor(600 / R));
    const odd = () => rng.int(0, Math.floor((M - 1) / 2)) * 2 + 1, even = () => rng.int(1, Math.floor(M / 2)) * 2;
    const cells = [];
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      const hit = inGlyph(lines, cx + (c + 0.5 - C / 2) * S, cy + (r + 0.5 - R / 2) * S);
      cells.push(`<span style="display:inline-flex;align-items:center;justify-content:center;width:${px}px;height:${px}px;border:1.5px solid ${INK};box-sizing:border-box;font:700 ${Math.floor(px * 0.5)}px 'Baloo 2',cursive;color:${INK}"${hit ? OK : ''}>${hit ? odd() : even()}</span>`);
    }
    return { bodyHtml: page('mosaic', `<div style="display:grid;grid-template-columns:repeat(${C},auto);justify-content:center;border:3px solid ${INK}">${cells.join('')}</div><div>${answerBox({ w: 90, h: 76, answer: ch })}</div>`), meta: { ch, C, R } };
  },
  /** a picture drawn on a grid (data/fl/pixel-art.js) as numbered cells: the numbers are shuffled every copy, every second round is mirrored */
  pixel({ lv, loc, rng, ctx }) {
    const { keyRow } = require('../../lib/cbn-type.js'), { PALETTE } = require('../../lib/cbn-render.js');
    const P = platform.requireData(path.join(FL.DIR, 'pixel-art.js')), names = Object.keys(P.A[lv]), c = copyOf(ctx) - 1;
    const name = names[c % names.length], rows = P.grid(P.A[lv][name], Math.floor(c / names.length) % 2 === 1), n = rows.length;
    const letters = [...new Set(rows.join(''))], colours = letters.map((l) => P.COLOURS[l]);
    const order = rng.shuffle(colours.map((_, i) => i + 1)), num = {};
    colours.forEach((col, i) => { num[col] = order[i]; });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen)), px = Math.max(34, Math.floor(600 / n));
    const cells = rows.flatMap((r) => [...r].map((l) => {
      const col = P.COLOURS[l], paint = ctx && ctx.answerKey && col !== 'none' ? `background:${PALETTE[col]};` : '';
      return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${px}px;height:${px}px;box-sizing:border-box;border:1px solid #9A9A9A;font:700 ${Math.floor(px * 0.56)}px 'Baloo 2',cursive;color:#3A3A3A;${paint}"${mark && col !== 'none' ? ` data-lcs-drop="1" data-lcs-answer="${col}"` : ''}${ctx && ctx.answerKey ? ' data-lcs-key-sample="cell"' : ''}>${num[col]}</span>`;
    }));
    // a key colour is a bin that PAINTS the tapped cell (data-lcs-fill); without it the screen wrote the colour's name
    // into the cell (operator 2026-11-10). screen.js now refuses a colour bin with no fill.
    const key2 = keyRow(num, loc, false).replace(/data-lcs-crayon="([a-z]+)"/g, (m, col) => (col === 'none' ? m : `${m} data-lcs-bin="${col}" data-lcs-fill="${PALETTE[col]}"`));
    return { bodyHtml: page('pixel', `<div style="display:grid;grid-template-columns:repeat(${n},${px}px);justify-content:center;border:3px solid ${INK}">${cells.join('')}</div>${key2}`), meta: { picture: name, n, num } };
  },
  'letter-grid'({ lv, loc, rng, ctx }) {
    const alphabet = units(loc).map((u) => unitForms(u, loc).cap);
    return diffGrid('letter-grid', { lv, rng, alphabet, twins: TWINS.letters, ctx, draw: (v, px) => CG.glyph(v, { h: Math.floor(px * 0.78), skin: 'plain', stroke: 2.4 }).svg });
  },
  'number-grid'({ lv, rng, ctx }) {
    return diffGrid('number-grid', { lv, rng, alphabet: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], twins: TWINS.numbers, ctx, draw: (v, px) => CG.glyph(v, { h: Math.floor(px * 0.78), skin: 'plain', stroke: 2.4 }).svg });
  },
  'picture-grid'({ lv, ctx, rng }) {
    const pool = FL.keys('pt'), h = hero(ctx, pool, 7), set = [h, ...kin(h, pool, rng, 7)];
    const out = diffGrid('picture-grid', { lv, rng, alphabet: set, ctx, draw: (v, px) => img(v, Math.floor(px * 0.86)) });
    out.bodyHtml = out.bodyHtml.replace('data-ws-content', 'data-ws-content' + FL.tap(ctx));
    return out;
  },
  flip({ lv, ctx, rng }) {
    const pool = flipPool(), h = hero(ctx, pool, 3), [rows, n] = { 1: [4, 4], 2: [5, 5], 3: [6, 6] }[lv], px = Math.floor(Math.min(620 / n, 640 / rows)) - 12;
    const list = [h, ...kin(h, pool, rng, rows - 1)];
    const out = list.map((k, r) => {
      const odd = rng.int(0, n - 1);
      return `<div class="ws-card" style="width:660px;flex-direction:row;align-items:center;justify-content:space-around;padding:3px"${r === 0 ? FL.tap(ctx) : ''}>${Array.from({ length: n }, (_, i) => `<span style="display:inline-flex"${i === odd ? OK : ''} data-lcs-label="${i + 1}">${img(k, px, i === odd ? 'transform:scaleX(-1);' : '')}</span>`).join('')}</div>`;
    });
    return { bodyHtml: page('flip', out.join('')), meta: { list } };
  },
  'odd-size'({ lv, ctx, rng }) {
    const pool = FL.keys('pt'), h = hero(ctx, pool, 5), [rows, n, k] = { 1: [4, 4, 0.66], 2: [5, 5, 0.76], 3: [6, 6, 0.84] }[lv], px = Math.floor(Math.min(620 / n, 640 / rows)) - 10;
    const list = [h, ...kin(h, pool, rng, rows - 1)];
    const out = list.map((key, r) => {
      const odd = rng.int(0, n - 1);
      return `<div class="ws-card" style="width:660px;flex-direction:row;align-items:center;justify-content:space-around;padding:3px"${r === 0 ? FL.tap(ctx) : ''}>${Array.from({ length: n }, (_, i) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:${px}px;height:${px}px"${i === odd ? OK : ''} data-lcs-label="${i + 1}">${img(key, i === odd ? Math.round(px * k) : px)}</span>`).join('')}</div>`;
    });
    return { bodyHtml: page('odd-size', out.join('')), meta: { list } };
  },
  'two-trace'({ lv, ctx }) {
    // the pictures that cannot be drawn at this level's size on half a page never reach the picker (data/fl/pt-fit.json)
    const tooSmall = new Set(require('../../data/fl/pt-fit.json').refused['two-trace|' + lv] || []);
    const L = P.LEVEL[lv], list = P.drawings('K-599', lv).filter((k) => !tooSmall.has(k)), H = 700 - ((ctx && ctx.chromeExtra) || 0);
    const got = P.artFits(list, ctx, (src) => {
      const half = Math.floor(H / 2), at = list.indexOf(src);
      const page = (other) => P.composeFit({ W: 675, H, band: L.band, style: L.style, occlusion: false, decor: [], items: [{ src, x: 337, y: Math.round(half / 2), anchor: 'centre', fitBox: [600, half - 36], start: 'top' }, { src: other, x: 337, y: half + Math.round(half / 2), anchor: 'centre', fitBox: [600, half - 36], start: 'top' }] }, L.band);
      // the second picture is the one 37 on; when it cannot stand beside this one, the next ones are tried, so a
      // teacher's pick is never refused for its partner's sake (flagship visual check 2026-11-08). Only a picture that does
      // not FIT walks on: any other error is rethrown — in the maker a partner's trace not yet fetched throws
      // PlatformMissing, which the runtime answers by fetching it and building again; swallowing it put a different
      // partner on the browser's page than on Node's (parity gate, 2026-11-09)
      let err;
      for (let j = 0; j < 12; j++) { const other = list[(at + 37 + j) % list.length]; if (other === src) continue; try { return { out: page(other), other }; } catch (e) { if (!/pt-faces|pt-scene/.test(e.message)) throw e; err = e; } }
      throw err;
    });
    return { bodyHtml: `<div data-ws-content${FL.tap(ctx)} data-lcs-pt-face="two-trace" data-lcs-pt-src="${got.src}" data-lcs-pt-src2="${got.other}" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">${got.out.svg}</div>`, meta: { picture: got.src, band: L.band } };
  },
  'trace-way'({ lv, ctx, rng }) {
    const all = wayPairs(), pairs = rng.shuffle(all).slice(0, 4), kinds = { 1: ['line', 'hill', 'hill', 'line'], 2: ['hill', 'wave', 'zigzag', 'wave'], 3: ['wave', 'zigzag', 'loops', 'steps'] }[lv];
    const w = 660, h = 164, sw = { 1: 7, 2: 5, 3: 4 }[lv], dash = { 1: '16 13', 2: '12 11', 3: '0.1 11' }[lv];
    const rows = pairs.map(([a, b], i) => {
      // the path starts 140 in: the pictures end at 122 (6 + 116), and level 1's start dot (radius 10.5) reached into the
      // left picture's box from 130 (collision gate, 2026-11-09)
      const kind = kinds[i], y = h / 2, x0 = 140, x1 = w - 140, n = 6, step = (x1 - x0) / n;
      let d = `M${x0} ${y}`;
      if (kind === 'line') d += `L${x1} ${y}`;
      if (kind === 'hill') d += `Q${(x0 + x1) / 2} ${y - 130} ${x1} ${y}`;
      if (kind === 'wave') for (let k = 0; k < n; k++) d += `q${step / 2} ${k % 2 ? 66 : -66} ${step} 0`;
      if (kind === 'zigzag') for (let k = 0; k < n; k++) d += `l${step} ${k === n - 1 ? (n % 2 ? 0 : 0) : k % 2 ? 44 : -44}`;
      if (kind === 'steps') for (let k = 0; k < n; k++) d += `h${step / 2}v${k % 2 ? 40 : -40}h${step / 2}`;
      if (kind === 'loops') { d = `M${x0} ${y + 20}`; for (let k = 0; k < 4; k++) d += `c34 -86 76 -86 62 -26c-8 34 -44 40 -44 6c0 -10 34 -14 76 20`; }
      return `<div class="ws-card" style="width:660px;height:${h}px;position:relative;padding:0" data-lcs-way="${kind}"><svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0"><path d="${d}" fill="none" stroke="${INK}" stroke-width="${sw}" stroke-dasharray="${dash}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${x0}" cy="${kind === 'loops' ? y + 20 : y}" r="${sw * 1.5}" fill="${INK}"/></svg><span style="position:absolute;left:6px;top:${(h - 116) / 2}px">${img(a, 116)}</span><span style="position:absolute;right:6px;top:${(h - 116) / 2}px">${img(b, 116)}</span></div>`;
    });
    return { bodyHtml: page('trace-way', rows.join('')), meta: { pairs, kinds } };
  },
  frame({ lv, ctx, rng }) {
    const W = 660, H = 700 - ((ctx && ctx.chromeExtra) || 0), m = 30, kind = rng.pick({ 1: ['wave', 'scallop'], 2: ['zigzag', 'scallop', 'wave'], 3: ['loops', 'zigzag', 'castle'] }[lv]), sw = { 1: 7, 2: 5, 3: 4 }[lv], dash = { 1: '15 12', 2: '12 10', 3: '0.1 10' }[lv];
    const side = (x0, y0, dx, dy, len) => {
      const step = kind === 'loops' ? 52 : 46, n = Math.max(4, Math.round(len / step)), s = len / n, ux = dx, uy = dy, nx = -dy, ny = dx, A = 18;
      let d = '';
      for (let k = 0; k < n; k++) {
        const ax = x0 + ux * s * k, ay = y0 + uy * s * k, bx = ax + ux * s, by = ay + uy * s, mx = (ax + bx) / 2 + nx * A * 1.6, my = (ay + by) / 2 + ny * A * 1.6;
        // the first and last piece of a side are straight: bent, they reached into the corner and crossed the next side's
        // first bend (flagship visual check 2026-11-08)
        if (k === 0 || k === n - 1) { d += `L${bx} ${by}`; continue; }
        if (kind === 'scallop') d += `Q${mx} ${my} ${bx} ${by}`;
        if (kind === 'wave') { const s2 = k % 2 ? -1 : 1; d += `Q${(ax + bx) / 2 + nx * A * 1.8 * s2} ${(ay + by) / 2 + ny * A * 1.8 * s2} ${bx} ${by}`; }
        if (kind === 'zigzag') d += `L${(ax + bx) / 2 + nx * A} ${(ay + by) / 2 + ny * A}L${bx} ${by}`;
        if (kind === 'castle') d += `L${ax + nx * A} ${ay + ny * A}L${(ax + bx) / 2 + nx * A} ${(ay + by) / 2 + ny * A}L${(ax + bx) / 2} ${(ay + by) / 2}L${bx} ${by}`;
        if (kind === 'loops') d += `C${bx + nx * A * 2.2} ${by + ny * A * 2.2} ${ax + nx * A * 2.2} ${ay + ny * A * 2.2} ${bx} ${by}`;
      }
      return d;
    };
    const d = `M${m} ${m}` + side(m, m, 1, 0, W - 2 * m) + side(W - m, m, 0, 1, H - 2 * m) + side(W - m, H - m, -1, 0, W - 2 * m) + side(m, H - m, 0, -1, H - 2 * m);
    return { bodyHtml: page('frame', `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" data-lcs-frame="${kind}"><path d="${d}" fill="none" stroke="${INK}" stroke-width="${sw}" stroke-dasharray="${dash}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${m}" cy="${m}" r="${sw * 1.6}" fill="${INK}"/></svg>`), meta: { kind } };
  },
  'giant-letter'({ lv, loc, unit }) {
    const f = unitForms(unit, loc), o = { 1: { stroke: 8, dash: 20, gap: 16 }, 2: { stroke: 5.5, dash: 14, gap: 12 }, 3: { stroke: 5, dash: 0.1, gap: 11 } }[lv];
    return { bodyHtml: page('giant-letter', CG.dashed(f.cap, { h: 640, maxW: 650, ...o }).svg), meta: { unit, cap: f.cap } };
  },
  'giant-number'({ lv, unit }) {
    const o = { 1: { stroke: 8, dash: 20, gap: 16 }, 2: { stroke: 5.5, dash: 14, gap: 12 }, 3: { stroke: 5, dash: 0.1, gap: 11 } }[lv], s = [...String(unit)];
    return { bodyHtml: page('giant-number', `<div style="display:flex;align-items:center;justify-content:center;gap:6px">${s.map((c) => CG.dashed(c, { h: s.length > 1 ? 420 : 640, maxW: s.length > 1 ? 320 : 650, ...o }).svg).join('')}</div>`), meta: { unit } };
  },
  roll({ lv, rng, kind, ctx }) {
    const { ROLL } = platform.requireData(path.join(FL.DIR, 'roll-parts.js'));
    const rows = ROLL[kind].slice(0, { 1: 3, 2: 4, 3: 5 }[lv]), H = 700 - ((ctx && ctx.chromeExtra) || 0), px = { 3: 90, 4: 82, 5: 76 }[rows.length];
    const pip = (n) => { const P9 = { 1: [[50, 50]], 2: [[30, 30], [70, 70]], 3: [[28, 28], [50, 50], [72, 72]], 4: [[30, 30], [70, 30], [30, 70], [70, 70]], 5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]], 6: [[30, 24], [70, 24], [30, 50], [70, 50], [30, 76], [70, 76]] }[n]; return `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 100 100" data-lcs-prim="color-part"><rect x="6" y="6" width="88" height="88" rx="18" fill="#fff" stroke="${INK}" stroke-width="6"/>${P9.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${INK}"/>`).join('')}</svg>`; };
    const head = `<div style="display:grid;grid-template-columns:repeat(6,${px + 14}px);justify-content:center">${[1, 2, 3, 4, 5, 6].map((n) => `<span style="display:flex;justify-content:center">${pip(n)}</span>`).join('')}</div>`;
    const table = rows.map((r) => `<div data-lcs-roll-row style="display:grid;grid-template-columns:repeat(6,${px + 14}px);justify-content:center;border:2.5px solid ${INK};border-radius:12px;margin-top:6px">${rng.shuffle(r).map((inner) => `<span style="display:flex;justify-content:center;align-items:center;height:${px}px"><svg xmlns="http://www.w3.org/2000/svg" width="${px - 6}" height="${px - 6}" viewBox="0 0 100 100" data-lcs-prim="color-part" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${inner}</svg></span>`).join('')}</div>`).join('');
    const used = 54 + rows.length * (px + 11) + 12;
    return { bodyHtml: page('roll', `<div>${head}${table}</div><div data-lcs-draw style="box-sizing:border-box;width:640px;height:${H - used}px;border:3px solid ${INK};border-radius:18px"></div>`), meta: { kind, rows: rows.length } };
  },
  poster({ lv, loc, ctx }) {
    const B = require('../../data/b7/how-to-draw.js'), Hd = require('../../lib/htd-steps.js');
    const lib = FL.keys('htd', (s) => s >= 4).filter((k) => { const f = formOf(k, loc); return !!f && !!f.word && CG.has(f.word.toLocaleUpperCase(loc)); });
    const k = hero(ctx, lib, 3), S = B.stepsFor('lib-' + FL.slugOf(k)), n = S.steps.length, word = formOf(k, loc).word.toLocaleUpperCase(loc);
    const cols = 3, size = 200, cards = S.steps.map((_, i) => `<div class="ws-card" style="width:208px;height:216px;align-items:center;justify-content:center;padding:2px;position:relative"><span style="position:absolute;left:6px;top:4px;font:700 26px 'Baloo 2',cursive;color:${T.coral}">${i + 1}</span>${Hd.stepSvg(S, i, { width: size, height: size, viewBox: 'bbox' })}</div>`);
    const done = `<div style="box-sizing:border-box;display:flex;background:#fff;border:2px solid ${T.grid};border-radius:16px;width:208px;height:216px;align-items:center;justify-content:center;padding:2px">${Hd.fullSvg(S, { width: size, height: size, viewBox: 'bbox' })}</div>`;
    return { bodyHtml: page('poster', `<div${FL.tap(ctx)}>${CG.word(word, { h: 150, maxW: 640, skin: lv === 1 ? 'plain' : ['dots', 'stripes', 'stars', 'hearts', 'waves'] }).svg}</div><div style="display:grid;grid-template-columns:repeat(${cols},auto);gap:10px;justify-content:center">${cards.join('')}${done}</div>`), meta: { picture: k, steps: n } };
  },
  'three-times'({ lv, loc, ctx }) {
    const B = require('../../data/b7/how-to-draw.js'), Hd = require('../../lib/htd-steps.js');
    const lib = FL.keys('htd', (s) => s >= 4), k = hero(ctx, lib, 5), S = B.stepsFor('lib-' + FL.slugOf(k)), n = S.steps.length, card = Math.floor(640 / n) - 8;
    const strip = S.steps.map((_, i) => `<div class="ws-card" style="width:${card + 6}px;height:${card + 6}px;align-items:center;justify-content:center;padding:1px">${Hd.stepSvg(S, i, { width: card, height: card, viewBox: 'bbox' })}</div>`).join('');
    const box = (w, h) => `<div data-lcs-draw style="box-sizing:border-box;width:${w}px;height:${h}px;border:3px solid ${INK};border-radius:14px"></div>`;
    const H = 700 - card - 26 - ((ctx && ctx.chromeExtra) || 0), big = Math.floor(H * { 1: 0.62, 2: 0.6, 3: 0.56 }[lv]);
    return { bodyHtml: page('three-times', `<div${FL.tap(ctx)} style="display:flex;gap:8px;justify-content:center">${strip}</div><div style="display:flex;flex-direction:column;align-items:center;gap:12px">${box(640, big)}<div style="display:flex;gap:12px">${box(380, H - big - 12)}${box(248, H - big - 12)}</div></div>`), meta: { picture: k, steps: n } };
  },
};

/** the pictures that look different mirrored (data/fl/flip.json, tools/fl-flip.js) */
let _flip = null;
function flipPool() { if (!_flip) { const ok = new Set(platform.readJson(path.join(FL.DIR, 'flip.json'))); const G = new Set(['animals', 'pets', 'farm', 'safari', 'forest', 'ocean', 'polar', 'birds', 'bugs', 'dinosaurs', 'people']); _flip = FL.keys('pt').filter((k) => ok.has(k) && G.has(FL.groupOf(k))); } return _flip; }
/** a child's way from one picture to the other (data/fl/way-pairs.js) */
function wayPairs() { return platform.requireData(path.join(FL.DIR, 'way-pairs.js')).PAIRS; }

/**
 * the template factory. unit: 'letters' | 'numbers' | undefined
 */
function makeFlagship({ id, slug, exerciseType, gradeBand, mode, unit, unitMax, kind, i18n }) {
  const axis = unit === 'letters'
    ? { applicable: true, units: (loc) => units((loc || 'en').slice(0, 2)), exemplar: (loc) => units((loc || 'en').slice(0, 2))[0], tokens: (u, loc) => { const f = unitForms(u, (loc || 'en').slice(0, 2)); return { U: f.cap, L: f.low, UNIT: u }; } }
    : unit === 'numbers'
      ? { applicable: true, units: () => Array.from({ length: unitMax || 20 }, (_, i) => String(i + 1)), exemplar: () => '5', tokens: (u) => ({ U: u, L: u, UNIT: u }) }
      : undefined;
  return {
    id, slug, gradeBand: gradeBand || 'K', assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    ...(axis ? { unitAxis: axis } : {}),
    difficulty: { 1: {}, 2: {}, 3: {} },
    fitsChrome: true,
    i18n,
    build({ difficulty, locale, unit: u }, ctx) {
      const loc = String(locale || 'en').slice(0, 2), lv = Number(difficulty) || 2, c = ctx || {};
      const un = u || (axis ? axis.exemplar(loc) : null);
      return MODES[mode]({ lv, loc, unit: un, rng: c.rng, ctx: c, kind });
    },
    async verify(page2) {
      return page2.evaluate(() => {
        const f = [];
        if (!document.querySelector('[data-ws-content]')) return ['no page body'];
        const pg = (document.querySelector('[data-lcs-page]') || document.body).getBoundingClientRect();
        for (const e of document.querySelectorAll('[data-ws-content] svg, [data-ws-content] img')) { const r = e.getBoundingClientRect(); if (r.right > pg.right + 1 || r.left < pg.left - 1 || r.bottom > pg.bottom + 1) { f.push('something leaves the page'); break; } }
        return f;
      });
    },
  };
}
module.exports = { makeFlagship, MODES, glyphFigure, inGlyph };
