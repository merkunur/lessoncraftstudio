/**
 * dk-g3.js — the Batch 3 Grade 3 science and health pages (Daily Teaching System, Stage D-5, 2026-11-24): the pages the
 * English Grade 3 year designs need (types G3-581 .. G3-611, one `mode` each; the health modes live in dk-g3-health.js,
 * which registers them in MODES). English only (another locale refuses). Themeless; PDF only.
 *
 * Built on the earlier batches without editing them: the Batch K CSS and page check (dk-kinder.js), the Batch K2 figures
 * (dk-k2.js `fig`), the Batch 1 layout kit (dk-g1.js `kit`) and the Batch 2 page check (dk-g2.js g2VerifyInPage: a line at
 * every unit of every bar graph, an ad name inside its package, a vest on the torso, a helmet on a head). Bank:
 * data/science/dk-g3.js. Gate: qa/verify-dk-g3.js.
 *
 * RECORD pages (the class's own tests and plans) hold no answer. CLOSED items carry one right answer each, stamped
 * (data-dk-answer, never printed) and re-derived by the gate from its own tables; where it sits is checked for tells.
 * Grade 3 reads and writes short paragraphs: word banks, sentence frames, numbers to 1,000, scaled bar graphs with a
 * line at every unit the child must reach, simple tables.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const DK = require('./dk-kinder.js');
const K2 = require('./dk-k2.js');
const G1 = require('./dk-g1.js');
const G2 = require('./dk-g2.js');
const B = require('../../data/science/dk-g3.js');
const CC = require('../../primitives/_tokens.js').codeColors;

const { pic, box, tile, drawBox, labelledDraw, chip, word, small, text, head, col, row, grow, svg, art, band, whiteBand, arrow, lineBox, frameLine, frameTile, numBox, esc, f1, W, T, DOT } = G1.kit;
const { placesFor, patterned, derange } = DK;
const MODES = {};

/* ================================================================ layout helpers */
/** a wrapped paragraph (g1-text wraps nowhere by itself) */
const para = (t, w, fs = 16, attrs = '') => `<span class="g1-text" data-dk-box${attrs ? ' ' + attrs : ''} style="white-space:normal;width:${w}px;font-size:${fs}px;line-height:${fs + 4}px">${esc(t)}</span>`;
/** a small wrapped label */
const note = (t, w, fs = 13, attrs = '') => `<span class="g1-small" data-dk-box${attrs ? ' ' + attrs : ''} style="width:${w}px;font-size:${fs}px;line-height:${fs + 3}px">${esc(t)}</span>`;
/** a one-answer chip group: `opts` the chip words, `right` the one right word (stamped, never printed) */
const one = (item, opts, right, fs = 14, gap = 6, dir = 'row') => `<div class="dk-row" style="gap:${gap}px;flex-direction:${dir};align-items:center" data-dk-item="${esc(item)}" data-g1-one="1">` +
  opts.map((o) => chip(o, `data-g3-choice="${esc(o)}" data-dk-answer="${o === right ? 'right' : 'no'}"`, `font-size:${fs}px;padding:1px 8px`)).join('') + '</div>';
/** a chip group with SEVERAL right chips (circle all that fit) */
const some = (item, opts, rights, fs = 14, gap = 6, dir = 'row') => `<div class="dk-row" style="gap:${gap}px;flex-direction:${dir}" data-dk-item="${esc(item)}" data-g3-some="1">` +
  opts.map((o) => chip(o, `data-g3-choice="${esc(o)}" data-dk-answer="${rights.includes(o) ? 'right' : 'no'}"`, `font-size:${fs}px;padding:1px 8px`)).join('') + '</div>';
/** a record chip group (the class's own result: no answer) */
const rec = (opts, fs = 14, gap = 6, dir = 'row', attrs = '') => `<div class="dk-row"${attrs ? ' ' + attrs : ''} style="gap:${gap}px;flex-direction:${dir}">` + opts.map((o) => chip(o, '', `font-size:${fs}px;padding:1px 8px`)).join('') + '</div>';
/** a box to tick */
const tick = (px = 24, attrs = '') => box('', px, px, '', attrs, `display:block;border:2.5px solid ${T.ink};border-radius:4px`);
/** a ruled table in one white tile: `cols` [{label, w}] (the header and every row share ONE grid, so the columns line
 *  up), `rows` [[cell html]]; the first column is the row head. stretch = the rows share the page's slack (a log the
 *  child writes in); otherwise each row is `rowH` tall and the table keeps its own height. */
const table = (cols, rows, rowH, attrs = '', headFs = 14, stretch = false, w = W) => {
  const tpl = cols.map((c) => c.w + 'px').join(' ');
  const grid = `display:grid;grid-template-columns:${tpl};column-gap:6px;justify-content:center`;
  const hdr = `<div style="${grid};padding:4px 6px;border-bottom:2px solid ${T.teal};align-items:end">` + cols.map((c) => `<div style="display:flex;justify-content:center">${c.label ? word(c.label, `font-size:${headFs}px;white-space:normal;text-align:center;line-height:${headFs + 2}px;width:${c.w - 4}px`) : ''}</div>`).join('') + '</div>';
  const body = rows.map((r, i) => `<div data-g3-row="${i}" style="${grid};padding:${rowH < 30 ? 1 : 3}px 6px;min-height:${rowH}px;${stretch ? 'flex:1 1 0;' : ''}${i ? `border-top:1.5px solid ${T.grid};` : ''}align-items:center">` +
    r.map((cell) => `<div style="display:flex;justify-content:center;align-items:center;min-width:0">${cell}</div>`).join('') + '</div>').join('');
  return box('dk-tile dk-tile--white', w, 'auto', hdr + body, attrs, `flex-direction:column;align-items:stretch;justify-content:flex-start;padding:2px 0;${stretch ? 'flex:1 0 auto' : ''}`);
};
/** sentence frames on lower writing lines (h px each): the Batch 1 frameTile with a line height */
const frames = (lines, h = 42, attrs = '') => box('dk-tile dk-tile--white', W, 'auto', col(lines.map((l) => G1.kit.frameLine(l, h)).join(''), 2, 'align-items:flex-start'), 'data-g1-frames="1"' + (attrs ? ' ' + attrs : ''), 'padding:4px 14px;justify-content:flex-start');
/** a labelled draw box that takes the slack of its page (Batch 2 growDraw) */
const growDraw = G2.growDraw;
/** the magnet pages' safety line (review round 1: swallowed magnets are the hazard US teachers stress) */
const MAGNET_SAFETY = 'Keep magnets away from computers, tablets and phones. Never put a magnet in your mouth.';
/** a safety line */
const safety = (t) => whiteBand(row(`<span class="dk-head" data-dk-box style="font-size:16px;color:${T.coral}">Safety:</span>` + para(t, 560, 15), 8), 'data-g3-safety="1"', 'padding:3px 8px');
/** a cut-out strip of cards (rows of `per`) */
const strip = (cards, per) => col(G2.cutHead() + Array.from({ length: Math.ceil(cards.length / per) }, (_, r) => row(cards.slice(r * per, r * per + per).join(''), 0)).join(''), 0);

/** a scaled bar graph to color: `lines` unit lines (0..lines), each line = `per` (the scale), a number every `step` lines;
 *  a line at EVERY unit the child must reach (2.MD.D.10 / 3.MD.B.3); prefill = {bar: lines} bars drawn as examples */
function barGraph3({ bars, lines, per = 1, step = 1, unitH, colW, prefill = {}, unit = '' }) {
  const lx = 46, top = 10, gw = bars.length * colW, gh = lines * unitH, base = top + gh;
  const fs = Math.min(14, Math.floor(step * unitH - 2));
  let s = '';
  for (let k = 0; k <= lines; k++) {
    const y = base - k * unitH, major = k % step === 0;
    s += `<line x1="${lx}" y1="${f1(y)}" x2="${f1(lx + gw)}" y2="${f1(y)}" stroke="${major ? T.inkSoft : T.grid}" stroke-width="${major ? 1.2 : 0.8}" data-g2-gridline="${k}"/>` +
      (major ? `<text x="${lx - 6}" y="${f1(y + 5)}" text-anchor="end" font-family="Nunito" font-weight="800" font-size="${fs}" fill="${T.ink}">${k * per}</text>` : '');
  }
  bars.forEach((b, i) => {
    const x = lx + i * colW + colW * 0.2, bw = colW * 0.6;
    if (prefill[b] != null) s += `<rect x="${f1(x)}" y="${f1(base - prefill[b] * unitH)}" width="${f1(bw)}" height="${f1(prefill[b] * unitH)}" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.5" data-g3-prefill="${esc(b)}" data-g3-prefill-lines="${prefill[b]}"/>`;
    s += `<rect x="${f1(x)}" y="${top}" width="${f1(bw)}" height="${f1(gh)}" fill="none" stroke="${T.inkSoft}" stroke-width="1.8" data-g2-bar="${esc(b)}"/>`;
  });
  s += `<line x1="${lx}" y1="${top}" x2="${lx}" y2="${f1(base)}" stroke="${T.ink}" stroke-width="2.5"/>`;
  const g = svg(lx + gw + 4, base + 6, s, `data-g2-graph="1" data-g2-max="${lines}" data-g2-step="${step}" data-g3-per="${per}"`);
  const labels = `<div class="dk-row" style="gap:0;justify-content:flex-start"><div style="width:${lx}px"></div>${bars.map((b) => `<div style="width:${colW}px;display:flex;justify-content:center">${small(b, colW - 4)}</div>`).join('')}</div>`;
  return col((unit ? word(unit, 'font-size:14px') : '') + art(g) + labels, 2, 'align-items:flex-start');
}

/* ================================================================ the drawings (simple shapes, listed for the reviewer) */
const kid = (o) => K2.fig({ s: 0.62, y: 96, who: 'child', ...o });
const grown = (o) => K2.fig({ s: 0.86, y: 96, color: T.inkSoft, who: 'grown-up', ...o });
const img = (p, x, y, w, h) => `<image href="${fileUri(p.theme, p.noun)}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" preserveAspectRatio="xMidYMid meet" data-dk-pic="${esc(p.theme + '/' + p.noun)}"/>`;
const ground = `<line x1="2" y1="96" x2="118" y2="96" stroke="${T.grid}" stroke-width="2.5"/>`;
/** a force arrow (coral, length in steps of 8) from (x, y) in a direction */
function forceArrow(x, y, dir, len) {
  const L = len * 9, d = { right: [1, 0], left: [-1, 0], up: [0, -1], down: [0, 1] }[dir];
  return `<g data-g3-force="${dir}" data-g3-len="${len}">${arrow(x, y, x + d[0] * L, y + d[1] * L, { sw: 3.5, head: 9, stroke: T.coral })}</g>`;
}
const SC = {};   // scenes, viewBox 0 0 120 100; each returns { s, at: {name: [x, y]} } (force anchor points)
SC.tug = () => { const a0 = kid({ x: 22, lean: -16 }), b0 = kid({ x: 98, dir: -1, lean: -16 });
  const ha = a0.at(53, 31), hb = b0.at(53, 31); const ry = (ha[1] + hb[1]) / 2 + 10;
  const A = kid({ x: 22, lean: -16, near: a0.reach(36, ry, 2) }), Bf = kid({ x: 98, dir: -1, lean: -16, color: T.teal, who: 'friend', near: b0.reach(84, ry, 2) });
  return { s: ground + `<line x1="34" y1="${f1(ry)}" x2="86" y2="${f1(ry)}" stroke="${CC.codeBrown}" stroke-width="3"/>` + A.svg + Bf.svg + img({ theme: 'toys', noun: 'teddy_bear' }, 50, ry - 13, 20, 22), at: { left: [56, ry - 16], right: [64, ry - 16] } }; };
SC.book = () => ({ s: ground + `<rect x="20" y="58" width="80" height="7" rx="2" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/><path d="M28 65 V95 M92 65 V95" stroke="${T.teal}" stroke-width="4"/>` +
  `<g data-g3-book="flat"><rect x="36" y="44" width="48" height="14" rx="2" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.8"/><rect x="40" y="47" width="44" height="8" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1"/><path d="M42 49.5 H82 M42 52.5 H82" stroke="${T.grid}" stroke-width="0.8"/></g>`, at: { down: [52, 22], up: [68, 80] } });
SC.bag = () => ({ s: `<rect x="40" y="6" width="40" height="7" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/><path d="M60 13 V24 q0 6 -6 6" fill="none" stroke="${T.ink}" stroke-width="2.5"/><path d="M54 30 L60 40" stroke="${T.ink}" stroke-width="1.5"/>` + img({ theme: 'At the Supermarket', noun: 'bag' }, 38, 36, 44, 52), at: { down: [60, 72], up: [68, 46] } });
SC.kick = () => { const f = K2.fig({ x: 40, y: 96, s: 0.62, legs: 'kick', near: [6, 10, 12, 18], far: [-8, 10, -14, 4], who: 'child' }); return { s: ground + f.svg + img({ theme: 'toys', noun: 'ball' }, 60, 76, 18, 18), at: { right: [80, 80] } }; };
SC.wagon = () => { const f0 = kid({ x: 84, lean: 10 }); const f = kid({ x: 84, lean: 10, near: f0.reach(70, 74, 4) });
  return { s: ground + `<rect x="18" y="68" width="40" height="16" rx="2" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.8" data-g3-wagon="1"/><circle cx="26" cy="89" r="6" fill="${T.ink}"/><circle cx="50" cy="89" r="6" fill="${T.ink}"/><line x1="58" y1="74" x2="72" y2="74" stroke="${T.ink}" stroke-width="2.5"/>` + f.svg, at: { right: [62, 62], left: [16, 62] } }; };
SC.box = () => { const a0 = kid({ x: 26, lean: 18 }), b0 = kid({ x: 94, dir: -1, lean: 6 });
  const A = kid({ x: 26, lean: 18, near: a0.reach(44, 76, 4), far: a0.reach(44, 70, 4) }), Bf = kid({ x: 94, dir: -1, lean: 6, color: T.teal, who: 'friend', near: b0.reach(76, 76, 4) });
  return { s: ground + `<rect x="44" y="64" width="32" height="32" fill="${T.creamDeep}" stroke="${T.ink}" stroke-width="2" data-g3-box="1"/><path d="M44 72 H76" stroke="${T.grid}" stroke-width="1.5"/>` + A.svg + Bf.svg, at: { right: [40, 84], left: [86, 72] } }; };
SC.pendulum = () => `<rect x="20" y="88" width="80" height="8" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/><path d="M28 88 V10 H76" fill="none" stroke="${T.teal}" stroke-width="4"/>` +
  `<line x1="66" y1="10" x2="80" y2="70" stroke="${T.ink}" stroke-width="1.5" data-g3-string="1"/><circle cx="80" cy="74" r="6" fill="${T.grid}" stroke="${T.ink}" stroke-width="2"/><circle cx="80" cy="74" r="2" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1"/>` +
  `<path d="M52 70 q14 10 28 6 q12 -4 22 -16" fill="none" stroke="${T.inkSoft}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
SC.ramp = () => `<rect x="4" y="74" width="26" height="12" rx="1.5" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.5" data-g3-books="1"/><path d="M7 77 H27 M7 80 H27" stroke="#FFFFFF" stroke-width="1"/>` +
  `<path d="M28 74 L92 87" stroke="${CC.codeBrown}" stroke-width="5" stroke-linecap="round"/><path d="M2 88 H118" stroke="${T.grid}" stroke-width="3"/>` + img({ theme: 'toys', noun: 'car' }, 26, 56, 24, 18) + `<path d="M96 84 H116" stroke="${T.inkSoft}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
  `<path d="M28 56 L84 86" stroke="${CC.codeBrown}" stroke-width="5" stroke-linecap="round"/><path d="M2 88 H118" stroke="${T.grid}" stroke-width="3"/>` + img({ theme: 'toys', noun: 'car' }, 34, 46, 24, 18) + `<path d="M88 82 H112" stroke="${T.inkSoft}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
const SWATCH = {
  tile: () => `<rect x="8" y="8" width="84" height="84" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2"/>` + [36, 64].map((v) => `<path d="M${v} 8 V92 M8 ${v} H92" stroke="${T.grid}" stroke-width="2"/>`).join(''),
  carpet: () => `<rect x="8" y="8" width="84" height="84" rx="6" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2"/>` + Array.from({ length: 49 }, (_, k) => `<circle cx="${16 + (k % 7) * 11}" cy="${16 + Math.floor(k / 7) * 11}" r="2.4" fill="${T.coral}" opacity=".6"/>`).join(''),
  sandpaper: () => `<rect x="8" y="8" width="84" height="84" fill="${CC.codeYellow}" stroke="${T.inkSoft}" stroke-width="2" opacity=".85"/>` + Array.from({ length: 60 }, (_, k) => `<circle cx="${12 + (k * 37) % 78}" cy="${12 + (k * 53) % 78}" r="1.6" fill="${T.ink}" opacity=".55"/>`).join(''),
};
const PAPER_BITS = [[62, 82], [74, 87], [88, 81], [100, 87], [82, 91], [108, 83], [68, 91]].map(([x, y], k) => `<rect x="${x}" y="${y}" width="11" height="7" fill="${[T.coral, T.teal, CC.codeYellow][k % 3]}" stroke="${T.ink}" stroke-width="0.8"/>`).join('') + `<path d="M56 96 H118" stroke="${T.grid}" stroke-width="2.5"/>`;
/** a balloon (drawn: the library balloon is a speck in a tall frame): a coral oval, a knot, a string */
const BALLOON = (x, y, w) => { const rx = w * 0.32, ry = w * 0.4, cx = x + w / 2, cy = y + ry + 2; return `<g data-g3-balloon="1"><ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.6"/><path d="M${f1(cx - rx * 0.5)} ${f1(cy - ry * 0.45)} q${f1(rx * 0.25)} ${f1(-ry * 0.3)} ${f1(rx * 0.55)} ${f1(-ry * 0.3)}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><path d="M${f1(cx - 3)} ${f1(cy + ry + 4)} L${f1(cx)} ${f1(cy + ry - 1)} L${f1(cx + 3)} ${f1(cy + ry + 4)} Z" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.2"/><path d="M${f1(cx)} ${f1(cy + ry + 4)} q4 10 -2 22" fill="none" stroke="${T.inkSoft}" stroke-width="1.3"/></g>`; };
SC['balloon-paper'] = () => BALLOON(36, 2, 56) + PAPER_BITS;
SC['balloon-plain'] = () => BALLOON(36, 2, 56) + PAPER_BITS;
SC['balloon-water'] = () => img({ theme: 'around the house', noun: 'faucet' }, 52, 0, 60, 40) + `<path d="M68 38 V86" fill="none" stroke="${CC.codeBlue}" stroke-opacity=".55" stroke-width="3" stroke-linecap="round" data-g3-stream="1"/>` +
  `<path d="M46 82 H106 L100 96 H52 Z" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2" stroke-linejoin="round" data-g3-sink="1"/><ellipse cx="68" cy="90" rx="5" ry="2" fill="${T.inkSoft}"/>` + BALLOON(2, 20, 52);
SC['balloon-balloon'] = () => `<path d="M6 4 H114" stroke="${T.ink}" stroke-width="2.5"/><path d="M34 4 V18 M86 4 V18" stroke="${T.inkSoft}" stroke-width="1.2"/>` + BALLOON(8, 18, 52) + BALLOON(60, 18, 52);
const OBJ = {   // magnet objects, viewBox 0 0 100 100 (silver = grid fill, ink-soft outline)
  'paper-clip': () => `<path d="M38 82 V28 a12 12 0 0 1 24 0 V70 a8 8 0 0 1 -16 0 V34 a4 4 0 0 1 8 0 V66" fill="none" stroke="${T.inkSoft}" stroke-width="4" stroke-linecap="round"/>`,
  washer: () => `<circle cx="50" cy="50" r="30" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="3"/><circle cx="50" cy="50" r="12" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="3"/><path d="M30 38 q6 -10 16 -12" fill="none" stroke="#FFFFFF" stroke-width="3"/>`,
  'safety-pin': () => `<g data-g3-pin="1"><path d="M20 42 L80 30" stroke="${T.inkSoft}" stroke-width="4" stroke-linecap="round"/><path d="M20 58 L76 44" stroke="${T.inkSoft}" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="16" cy="50" r="9" fill="none" stroke="${T.inkSoft}" stroke-width="4" data-g3-coil="1"/><circle cx="16" cy="50" r="4" fill="none" stroke="${T.inkSoft}" stroke-width="2.5"/>` +
    `<path d="M72 24 H90 a6 6 0 0 1 6 6 V40 a6 6 0 0 1 -6 6 H78 a6 6 0 0 1 -6 -6 Z" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="3" data-g3-clasp="1"/></g>`,
  'wood-spoon': () => `<g data-g3-woodspoon="1"><ellipse cx="28" cy="50" rx="20" ry="14" fill="${CC.codeBrown}" fill-opacity=".45" stroke="${CC.codeBrown}" stroke-width="3"/><ellipse cx="28" cy="50" rx="13" ry="8" fill="none" stroke="${CC.codeBrown}" stroke-width="1.5" opacity=".6"/>` +
    `<path d="M46 47 L94 41 Q98 45 94 49 L46 54 Z" fill="${CC.codeBrown}" fill-opacity=".45" stroke="${CC.codeBrown}" stroke-width="3" stroke-linejoin="round"/><path d="M54 48 L88 44 M58 51 L84 48" stroke="${CC.codeBrown}" stroke-width="1" opacity=".7"/></g>`,
  'bottle-cap': () => `<path d="M24 46 L76 46 L72 66 L28 66 Z" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="3" stroke-linejoin="round"/>` + Array.from({ length: 8 }, (_, k) => `<path d="M${30 + k * 6} 66 l3 6" stroke="${T.inkSoft}" stroke-width="2.5"/>`).join('') + `<ellipse cx="50" cy="46" rx="26" ry="6" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="2.5"/>`,
  'foil-ball': () => `<path d="M24 52 L34 30 L56 24 L74 34 L80 56 L68 76 L44 80 L26 70 Z" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linejoin="round"/><path d="M34 30 L46 48 L56 24 M46 48 L74 34 M46 48 L44 80 M46 48 L26 70" fill="none" stroke="#FFFFFF" stroke-width="2"/>`,
  penny: () => `<circle cx="50" cy="50" r="32" fill="${CC.codeOrange}" stroke="${CC.codeBrown}" stroke-width="3"/><circle cx="50" cy="50" r="25" fill="none" stroke="${CC.codeBrown}" stroke-width="1.5"/><path d="M44 36 q10 -6 14 6 q2 10 -4 18 l-8 8 M42 60 h12" fill="none" stroke="${CC.codeBrown}" stroke-width="2.5" stroke-linecap="round"/>`,
  'brass-key': () => `<circle cx="30" cy="50" r="16" fill="${CC.codeYellow}" stroke="${CC.codeBrown}" stroke-width="2.5"/><circle cx="30" cy="50" r="5" fill="#FFFFFF" stroke="${CC.codeBrown}" stroke-width="2"/><path d="M46 46 H86 V54 H80 V62 H74 V54 H68 V60 H62 V54 H46 Z" fill="${CC.codeYellow}" stroke="${CC.codeBrown}" stroke-width="2.5" stroke-linejoin="round"/>`,
  button: () => `<circle cx="50" cy="50" r="30" fill="${CC.codeBlue}" stroke="${T.ink}" stroke-width="2.5"/>` + [[42, 42], [58, 42], [42, 58], [58, 58]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1.5"/>`).join(''),
  magnet: () => `<path d="M26 80 V40 a24 24 0 0 1 48 0 V80 H60 V40 a10 10 0 0 0 -20 0 V80 Z" fill="${CC.codeRed}" stroke="${T.ink}" stroke-width="2.5" stroke-linejoin="round"/><rect x="26" y="68" width="14" height="12" fill="${T.grid}" stroke="${T.ink}" stroke-width="2"/><rect x="60" y="68" width="14" height="12" fill="${T.grid}" stroke="${T.ink}" stroke-width="2"/>`,
  'bar-magnet': () => `<rect x="10" y="36" width="40" height="28" fill="${CC.codeRed}" stroke="${T.ink}" stroke-width="2.5"/><rect x="50" y="36" width="40" height="28" fill="${CC.codeBlue}" stroke="${T.ink}" stroke-width="2.5"/><text x="30" y="56" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="16" fill="#FFFFFF">N</text><text x="70" y="56" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="16" fill="#FFFFFF">S</text>`,
};
const PROB = {   // problems and hazards, viewBox 0 0 120 100
  'door-open': () => `<rect x="20" y="10" width="80" height="84" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5"/><rect x="26" y="16" width="34" height="72" fill="${T.cream}" stroke="${T.teal}" stroke-width="2"/><path d="M60 16 L92 8 L92 96 L60 88 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round" data-g3-door="1"/><circle cx="86" cy="52" r="3" fill="${T.ink}"/><path d="M98 30 q10 6 8 20" fill="none" stroke="${T.coral}" stroke-width="2.5"/>` + arrow(104, 44, 110, 56, { sw: 2.5, head: 6, stroke: T.coral }),
  cans: () => `<path d="M10 54 L110 54 L104 96 L16 96 Z" fill="${T.creamDeep}" stroke="${CC.codeBrown}" stroke-width="2.5" stroke-linejoin="round"/>` + [[22, 'steel'], [44, 'alu'], [66, 'steel'], [88, 'alu']].map(([x, k]) => `<rect x="${x}" y="${k === 'steel' ? 26 : 30}" width="18" height="${k === 'steel' ? 30 : 26}" rx="2" fill="${k === 'steel' ? T.grid : '#FFFFFF'}" stroke="${T.inkSoft}" stroke-width="2"/>` + (k === 'steel' ? `<rect x="${x}" y="34" width="18" height="12" fill="${T.coral}"/>` : `<rect x="${x + 6}" y="27" width="6" height="3" fill="${T.inkSoft}"/><rect x="${x}" y="38" width="18" height="10" fill="${T.teal}"/>`)).join(''),
  'needle-rug': () => `<rect x="8" y="30" width="104" height="62" rx="6" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2.5"/>` + Array.from({ length: 10 }, (_, k) => `<path d="M${12 + k * 10} 92 v6 M${16 + k * 10} 92 v6" stroke="${T.coral}" stroke-width="1.5"/>`).join('') + `<path d="M40 60 L80 52" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linecap="round" data-g3-needle="1"/><ellipse cx="78" cy="52.5" rx="3" ry="1.5" fill="none" stroke="${T.inkSoft}" stroke-width="1.2"/><circle cx="60" cy="56" r="16" fill="none" stroke="${T.ink}" stroke-width="2" stroke-dasharray="4 3"/>`,
  'hazard-flood': () => `<path d="M30 50 L60 26 L90 50 V84 H30 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/><rect x="52" y="60" width="16" height="24" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2"/><rect x="2" y="70" width="116" height="28" fill="${T.tealSoft}" opacity=".9"/><path d="M4 70 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="${T.teal}" stroke-width="2.5"/><path d="M14 8 l-3 10 M26 4 l-3 10 M96 6 l-3 10 M108 10 l-3 10" stroke="${T.teal}" stroke-width="2" stroke-linecap="round"/>`,
  'hazard-wind': () => `<path d="M2 96 H118" stroke="${T.grid}" stroke-width="2.5"/><path d="M84 96 V52" stroke="${CC.codeBrown}" stroke-width="5"/><path d="M84 54 Q100 30 112 40 Q104 54 84 54 Z" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="2"/><path d="M84 50 Q96 20 110 24" fill="none" stroke="${CC.codeGreen}" stroke-width="6" stroke-linecap="round"/>` +
    [24, 40, 56].map((y, k) => `<path d="M${6 + k * 4} ${y} H${46 + k * 6} q8 0 8 -6 q0 -6 -6 -6" fill="none" stroke="${T.inkSoft}" stroke-width="3" stroke-linecap="round"/>`).join('') + `<path d="M30 78 q6 -8 14 -4 q-4 8 -14 4 Z M30 78 l14 -4" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="1.5" data-g3-blown="leaf"/>`,
  'hazard-blizzard': () => `<rect x="0" y="0" width="120" height="100" fill="${T.tealSoft}" opacity=".35"/><path d="M30 56 L60 34 L90 56 V90 H30 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/><path d="M0 84 Q30 74 60 86 Q90 76 120 84 V100 H0 Z" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2"/>` +
    [[12, 14], [30, 24], [52, 10], [74, 20], [96, 12], [108, 32], [18, 40], [100, 52]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M0 -5 V5 M-4.3 -2.5 L4.3 2.5 M-4.3 2.5 L4.3 -2.5" stroke="${T.teal}" stroke-width="1.8" stroke-linecap="round"/></g>`).join(''),
  'hazard-lightning': () => `<path d="M14 36 Q12 16 34 18 Q44 4 62 12 Q80 4 90 20 Q110 20 106 38 Z" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="2.5"/><path d="M58 38 L46 62 H58 L48 88 L74 56 H62 L72 38 Z" fill="${CC.codeYellow}" stroke="${CC.codeBrown}" stroke-width="2" stroke-linejoin="round"/><path d="M2 96 H118" stroke="${T.grid}" stroke-width="2.5"/>`,
  school: () => `<path d="M2 96 H118" stroke="${T.grid}" stroke-width="2.5"/><rect x="20" y="44" width="80" height="52" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/><path d="M16 46 L60 20 L104 46 Z" fill="${T.coral}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/><rect x="52" y="70" width="16" height="26" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2"/>` + [[28, 54], [80, 54]].map(([x, y]) => `<rect x="${x}" y="${y}" width="14" height="12" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2"/>`).join('') + `<path d="M60 20 V8 l10 4 l-10 4" fill="${T.teal}" stroke="${T.teal}" stroke-width="1.5"/>`,
};
/** the magnet's ruler: 0..`inches` in inches with a mark every half inch (3.MD.B.4); a magnet sits left of 0 */
/** an inch ruler at TRUE scale when pxPerIn = 96 (the page prints CSS px at 96 to the inch: preferCSSPageSize) */
function inchRuler(inches, pxPerIn, clip = false) {
  const lx = 60, Wr = inches * pxPerIn, H = clip ? 96 : 64;
  let s = `<rect x="${lx}" y="8" width="${Wr + 16}" height="40" rx="5" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/>`;
  for (let h = 0; h <= inches * 2; h++) { const x = lx + 8 + h * pxPerIn / 2, whole = h % 2 === 0; s += `<line x1="${f1(x)}" y1="8" x2="${f1(x)}" y2="${whole ? 26 : 19}" stroke="${T.teal}" stroke-width="${whole ? 2.5 : 1.6}" data-g3-tick="${h / 2}"/>` + (whole ? `<text x="${f1(x)}" y="42" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="14" fill="${T.ink}">${h / 2}</text>` : ''); }
  s += `<g transform="translate(-4 -2) scale(0.7)">${OBJ['bar-magnet']()}</g>`;
  // the paper clip at the far end, with an arrow: slide it slowly toward the magnet
  if (clip) { const cx = lx + 8 + (inches - 0.6) * pxPerIn; s += `<g transform="translate(${f1(cx - 22)} 50) scale(0.44)" data-g3-clip="1">${OBJ['paper-clip']()}</g>` + arrow(cx - 30, 72, cx - 110, 72, { sw: 3, head: 9, stroke: T.coral }); }
  return svg(lx + Wr + 28, H, s, `data-g3-ruler="${inches}"`);
}
/** a stylised dog (side view, facing right): fur colour, ear shape, spots, as listed in the bank (the gate checks them) */
function dog(d, px) {
  const fur = d.fur === 'brown' ? CC.codeBrown : '#FFFFFF', line = T.ink;
  let s = `<g data-g3-dog="${d.id}" data-g3-fur="${d.fur}" data-g3-ears="${d.ears}" data-g3-spots="${d.spots}">`;
  s += `<rect x="20" y="44" width="56" height="26" rx="12" fill="${fur}" stroke="${line}" stroke-width="2"/>`;   // body
  s += ['26', '38', '58', '70'].map((x) => `<rect x="${x}" y="64" width="7" height="24" rx="3" fill="${fur}" stroke="${line}" stroke-width="2"/>`).join('');   // legs
  s += `<path d="M22 50 q-12 -6 -10 -18" fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round"/>`;   // tail
  s += `<circle cx="82" cy="38" r="15" fill="${fur}" stroke="${line}" stroke-width="2"/><ellipse cx="95" cy="44" rx="8" ry="6" fill="${fur}" stroke="${line}" stroke-width="2"/><circle cx="101" cy="42" r="2.4" fill="${line}"/><circle cx="85" cy="33" r="2" fill="${line}"/>`;   // head, snout, nose, eye
  s += d.ears === 'floppy' ? `<path d="M74 28 q-8 4 -6 22 q6 2 10 -6 Z" fill="${fur}" stroke="${line}" stroke-width="2" data-g3-ear="floppy"/>` : `<path d="M70 30 L72 10 L82 24 Z" fill="${fur}" stroke="${line}" stroke-width="2" stroke-linejoin="round" data-g3-ear="pointed"/><path d="M82 24 L88 8 L94 26 Z" fill="${fur}" stroke="${line}" stroke-width="2" stroke-linejoin="round" data-g3-ear="pointed"/><path d="M73.5 25 L74 16 L79 23 Z M85 22 L88 14 L91 23 Z" fill="${T.coralSoft}"/>`;
  if (d.spots === 'yes') s += [[34, 52, 6], [52, 58, 5], [64, 50, 4], [44, 47, 3]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${line}" data-g3-spot="1"/>`).join('');
  s += '</g>';
  return svg(px, px * 0.9, s, `data-g3-animal="${d.id}"`, '6 2 104 94');
}
/** a stylised tabby cat (sitting, facing out): fur colour and white front paws as listed; every cat has stripes */
function cat(c, px) {
  const fur = c.fur === 'brown' ? CC.codeBrown : T.inkSoft;   // review round 1: a darker gray (the grid beige read as near-white)
  let s = `<g data-g3-cat="${c.id}" data-g3-fur="${c.fur}" data-g3-paws="${c.paws}">`;
  s += `<path d="M30 92 Q26 50 50 46 Q74 50 70 92 Z" fill="${fur}" stroke="${T.ink}" stroke-width="2"/><path d="M68 88 q20 2 16 -22" fill="none" stroke="${T.ink}" stroke-width="3" stroke-linecap="round"/>`;
  s += `<circle cx="50" cy="34" r="16" fill="${fur}" stroke="${T.ink}" stroke-width="2"/><path d="M38 24 L38 8 L48 20 Z M62 24 L62 8 L52 20 Z" fill="${fur}" stroke="${T.ink}" stroke-width="2"/><circle cx="44" cy="32" r="2.2" fill="${T.ink}"/><circle cx="56" cy="32" r="2.2" fill="${T.ink}"/><path d="M47 39 q3 3 6 0" fill="none" stroke="${T.ink}" stroke-width="1.5"/>`;
  s += [[36, 60], [36, 70], [36, 80], [64, 60], [64, 70], [64, 80]].map(([x, y]) => `<path d="M${x} ${y} h${x < 50 ? 10 : -10}" stroke="${T.ink}" stroke-width="2.5" data-g3-stripe="1"/>`).join('') + `<path d="M44 22 v6 M50 20 v7 M56 22 v6" stroke="${T.ink}" stroke-width="2" data-g3-stripe="1"/>`;
  // the two front paws: white, or the fur colour
  s += [34, 52].map((x) => `<path d="M${x} 70 H${x + 14} V93 a4 4 0 0 1 -4 4 H${x + 4} a4 4 0 0 1 -4 -4 Z" fill="${fur}" stroke="${T.ink}" stroke-width="2"/>` + `<path d="M${x} 79 H${x + 14} V93 a4 4 0 0 1 -4 4 H${x + 4} a4 4 0 0 1 -4 -4 Z" fill="${c.paws === 'yes' ? '#FFFFFF' : fur}" stroke="${T.ink}" stroke-width="2" data-g3-paw="${c.paws === 'yes' ? 'white' : 'fur'}"/>`).join('');
  s += '</g>';
  return svg(px, px, s, `data-g3-animal="${c.id}"`, '20 2 70 98');
}
/** a bean plant of `inches` (to the soil) with exactly `leaves` leaves; droopy when short of water */
function beanPlant(p, pxH) {
  const top = 96 - p.inches * 8, droop = p.id === 'little';
  let s = `<rect x="30" y="96" width="40" height="18" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/><path d="M50 96 ${droop ? `Q46 ${f1((96 + top) / 2)} 54 ${f1(top)}` : `V${f1(top)}`}" fill="none" stroke="${T.teal}" stroke-width="3"/>`;
  for (let k = 0; k < p.leaves; k++) {
    const t = (k + 1) / (p.leaves + 1), y = 96 - (96 - top) * t, side = k % 2 ? 1 : -1, x = 50 + (droop ? (side < 0 ? -2 : 2) : 0);
    s += `<path d="M${f1(x)} ${f1(y)} q${side * 8} ${droop ? 2 : -8} ${side * 16} ${droop ? 8 : -2} q${-side * 8} ${droop ? 2 : 6} ${-side * 16} ${droop ? -8 : 2} Z" fill="${droop ? CC.codeYellow : CC.codeGreen}" stroke="${T.teal}" stroke-width="1.4" data-g3-leaf="1"/>`;
  }
  return svg(pxH * 0.7, pxH, s, `data-g3-bean="${p.id}" data-g3-inches="${p.inches}" data-g3-leaves="${p.leaves}"`, '10 10 80 108');
}
/** the mealworm's stages (drawn): egg, larva, pupa, adult beetle */
const STAGE = {
  egg: () => `<ellipse cx="50" cy="52" rx="9" ry="6" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2"/><ellipse cx="66" cy="58" rx="9" ry="6" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2"/><ellipse cx="38" cy="62" rx="9" ry="6" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2"/>`,
  larva: () => `<path d="M14 58 Q40 44 86 52" fill="none" stroke="${CC.codeBrown}" stroke-width="13" stroke-linecap="round"/><path d="M14 58 Q40 44 86 52" fill="none" stroke="${CC.codeYellow}" stroke-width="9" stroke-linecap="round"/>` + [24, 34, 44, 54, 64, 74].map((x) => `<path d="M${x} ${f1(56 - (x - 14) * 0.08)} v-8" stroke="${CC.codeBrown}" stroke-width="1.6"/>`).join('') + `<circle cx="88" cy="51" r="3" fill="${CC.codeBrown}"/>`,
  pupa: () => `<path d="M30 70 Q24 40 46 32 Q72 26 74 50 Q74 70 54 74 Q38 76 30 70 Z" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2"/><path d="M40 40 q6 10 2 26 M52 36 q6 12 4 30 M64 42 q4 10 0 22" fill="none" stroke="${T.grid}" stroke-width="2"/>`,
  'adult beetle': () => `<ellipse cx="50" cy="56" rx="18" ry="26" fill="${T.ink}"/><circle cx="50" cy="26" r="9" fill="${T.ink}"/><path d="M50 32 V82" stroke="${T.inkSoft}" stroke-width="1.5"/>` + [-1, 1].map((s) => `<path d="M${50 + s * 16} 46 l${s * 14} -6 M${50 + s * 18} 58 l${s * 16} 0 M${50 + s * 16} 70 l${s * 14} 8 M${50 + s * 4} 18 l${s * 6} -10" stroke="${T.ink}" stroke-width="2.5" stroke-linecap="round"/>`).join(''),
};
/** a moth to colour (the class's paper moths): an outline with its colour named under it */
/** a paper moth, cut out and colored: green, gray, red or yellow (the color it is named by) */
const MOTH_FILL = { green: CC.codeGreen, gray: T.grid, red: CC.codeRed, yellow: CC.codeYellow };
const moth = (px, color) => svg(px, px * 0.7, `<path d="M50 40 Q30 6 8 20 Q2 44 46 46 Q10 52 18 66 Q34 72 48 50 Z M50 40 Q70 6 92 20 Q98 44 54 46 Q90 52 82 66 Q66 72 52 50 Z" fill="${MOTH_FILL[color] || "#FFFFFF"}" data-g3-moth="${color || ""}" stroke="${T.ink}" stroke-width="2" stroke-linejoin="round"/><ellipse cx="50" cy="46" rx="4" ry="14" fill="${T.inkSoft}"/><path d="M48 32 q-6 -12 -12 -14 M52 32 q6 -12 12 -14" fill="none" stroke="${T.ink}" stroke-width="1.5"/>`, 'data-g3-moth="1"', '0 4 100 70');
/** the four fossils: a rock slab with an imprint */
const FOSSIL = {
  'fossil-fish': () => `<path d="M24 50 Q50 30 82 48 Q50 70 24 50 Z" fill="none" stroke="${T.inkSoft}" stroke-width="2.5"/><path d="M82 48 L98 36 L96 62 Z" fill="none" stroke="${T.inkSoft}" stroke-width="2.5"/>` + [34, 42, 50, 58, 66, 74].map((x) => `<path d="M${x} 40 V60" stroke="${T.inkSoft}" stroke-width="1.6"/>`).join('') + `<path d="M24 50 H84" stroke="${T.inkSoft}" stroke-width="2"/><circle cx="32" cy="46" r="2.5" fill="${T.inkSoft}"/>`,
  'fossil-fern': () => { const d = [44 / 82.7, -70 / 82.7], n = [-d[1], d[0]], ang = Math.atan2(n[1], n[0]) * 180 / Math.PI; return `<g data-g3-fern="1"><path d="M30 86 L74 16" fill="none" stroke="${T.inkSoft}" stroke-width="2.5"/>` + Array.from({ length: 9 }, (_, k) => { const t = (k + 0.8) / 9.6, x = 30 + 44 * t, y = 86 - 70 * t, L = 10 - k * 0.75; return [1, -1].map((sd) => { const cx = x + sd * n[0] * (L + 1), cy = y + sd * n[1] * (L + 1); return `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(L)}" ry="${f1(L * 0.42)}" transform="rotate(${f1(ang + (sd > 0 ? -12 : 192))} ${f1(cx)} ${f1(cy)})" fill="none" stroke="${T.inkSoft}" stroke-width="1.6" data-g3-leaflet="1"/>`; }).join(''); }).join('') + '</g>'; },
  'fossil-shell': () => `<path d="M50 78 L22 40 Q50 12 78 40 Z" fill="none" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linejoin="round"/>` + [-20, -10, 0, 10, 20].map((d) => `<path d="M50 78 L${50 + d * 1.2} 26" stroke="${T.inkSoft}" stroke-width="1.6"/>`).join('') + `<path d="M44 78 h12 v6 h-12 Z" fill="none" stroke="${T.inkSoft}" stroke-width="2"/>`,
  'fossil-palm': () => `<g data-g3-palm="1"><path d="M50 92 V56" stroke="${T.inkSoft}" stroke-width="3"/>` + Array.from({ length: 11 }, (_, k) => { const a = (-170 + k * 16) * Math.PI / 180, b = a - 0.07, c = a + 0.07, R = 40; return `<path d="M50 56 L${f1(50 + Math.cos(b) * R)} ${f1(56 + Math.sin(b) * R * 0.85)} L${f1(50 + Math.cos(a) * (R + 4))} ${f1(56 + Math.sin(a) * (R + 4) * 0.85)} L${f1(50 + Math.cos(c) * R)} ${f1(56 + Math.sin(c) * R * 0.85)} Z" fill="none" stroke="${T.inkSoft}" stroke-width="1.6" stroke-linejoin="round" data-g3-blade="1"/>`; }).join('') + '</g>',
};
const fossil = (kind, px) => svg(px, px * 0.8, `<path d="M6 30 Q4 8 30 6 L84 4 Q104 6 102 30 L100 70 Q98 92 74 94 L22 92 Q4 90 6 70 Z" fill="${T.creamDeep}" stroke="${CC.codeBrown}" stroke-width="2.5"/>` + FOSSIL[kind](), `data-g2-drawn="${kind}"`, '0 0 108 98');
const CH = {   // habitat change solutions and group drawings, viewBox 0 0 120 100
  // a saguaro cactus on sand: a ribbed trunk and two arms that bend up (it reads as a cactus, not a tree)
  cactus: () => `<path d="M0 90 Q60 80 120 90 V100 H0 Z" fill="${T.creamDeep}" stroke="${CC.codeBrown}" stroke-width="2"/>` +
    `<path d="M52 90 V22 a8 8 0 0 1 16 0 V90 Z M52 60 H40 a6 6 0 0 1 -6 -6 V36 a6 6 0 0 1 12 0 V48 H52 Z M68 52 H80 a6 6 0 0 0 6 -6 V30 a6 6 0 0 0 -12 0 V40 H68 Z" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="2.2" stroke-linejoin="round"/>` +
    `<path d="M58 26 V86 M62 26 V86 M40 38 V52 M80 32 V44" stroke="${T.teal}" stroke-width="1.2" opacity=".7"/>` + [[50, 34], [70, 44], [50, 70], [70, 74], [32, 44], [88, 38]].map(([x, y]) => `<path d="M${x} ${y} l-3 -1 M${x} ${y + 8} l-3 1" stroke="${T.ink}" stroke-width="1"/>`).join(''),
  'wildlife-bridge': () => `<rect x="0" y="62" width="120" height="30" fill="${T.grid}"/><path d="M4 77 H18 M30 77 H44 M56 77 H70 M82 77 H96 M108 77 H118" stroke="#FFFFFF" stroke-width="2"/><path d="M0 62 Q60 0 120 62 L120 50 Q60 -10 0 50 Z" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="2"/><path d="M0 50 Q60 -10 120 50" fill="none" stroke="${T.teal}" stroke-width="2.5"/>` + [[30, 30, 7], [42, 22, 6], [80, 22, 6], [92, 30, 7]].map(([x, y, r]) => `<g data-g3-bush="1"><path d="M${x} ${y} v6" stroke="${CC.codeBrown}" stroke-width="2.5"/><circle cx="${x - r * 0.6}" cy="${y - r * 0.2}" r="${r * 0.75}" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="1.4"/><circle cx="${x + r * 0.6}" cy="${y - r * 0.2}" r="${r * 0.75}" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="1.4"/><circle cx="${x}" cy="${y - r * 0.8}" r="${r * 0.8}" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="1.4"/></g>`).join('') + img({ theme: 'forest creatures', noun: 'deer' }, 50, 6, 24, 24),
  'wildlife-tunnel': () => `<path d="M0 30 H120 V96 H0 Z" fill="${T.creamDeep}"/><rect x="0" y="22" width="120" height="22" fill="${T.grid}"/><path d="M4 33 H18 M30 33 H44 M56 33 H70 M82 33 H96 M108 33 H118" stroke="#FFFFFF" stroke-width="2"/><path d="M36 96 V72 a24 24 0 0 1 48 0 V96 Z" fill="${T.ink}" opacity=".8" data-g3-tunnel="1"/>` + [[[4, 92], [16, 88], [28, 84], [38, 80]], [[116, 92], [104, 88], [92, 84], [82, 80]]].map((ps) => `<g data-g3-fence="1">` + ps.map(([x, y]) => `<path d="M${x} ${y} V${y - 18}" stroke="${CC.codeBrown}" stroke-width="2.5"/>`).join('') + [8, 15].map((dy) => `<path d="M${ps[0][0]} ${ps[0][1] - dy} L${ps[3][0]} ${ps[3][1] - dy}" stroke="${CC.codeBrown}" stroke-width="2"/>`).join('') + '</g>').join('') + img({ theme: 'forest creatures', noun: 'deer' }, 46, 70, 22, 22),
  'geese-v': () => [[60, 30], [48, 42], [36, 54], [24, 66], [72, 42], [84, 54], [96, 66]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M-10 0 Q-4 -6 0 0 Q4 -6 10 0" fill="none" stroke="${T.ink}" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="0" cy="1" rx="3" ry="2" fill="${T.ink}"/><circle cx="0" cy="-4" r="1.6" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1"/></g>`).join('') + `<path d="M8 90 H112" stroke="${T.tealSoft}" stroke-width="4"/>`,
  'fish-school': () => `<rect x="0" y="0" width="120" height="100" fill="${T.tealSoft}" opacity=".4"/>` + [[20, 30], [38, 26], [56, 32], [30, 46], [48, 44], [66, 48], [24, 62], [42, 60], [60, 64], [78, 36], [80, 56]].map(([x, y]) => img({ theme: 'ocean life', noun: 'fish' }, x, y, 18, 12)).join(''),
};
/** a scene / problem / change drawing in a 120 x 100 view */
function scene(kind, w, h, arrows) {
  let s;
  if (SC[kind]) { const r = SC[kind](); s = typeof r === 'string' ? r : r.s + (arrows ? arrows.map(([dir, len]) => forceArrow(...r.at[dir], dir, len)).join('') : ''); }
  else if (PROB[kind]) s = PROB[kind]();
  else if (CH[kind]) s = CH[kind]();
  else throw new Error('dk-g3: no scene ' + kind);
  return svg(w, h, s, `data-g3-scene="${kind}"`, '0 0 120 100').replace('style="display:block;overflow:visible"', 'style="display:block;overflow:hidden"');
}
const object = (kind, px) => svg(px, px, OBJ[kind](), `data-g2-drawn="${kind}"`, '0 0 100 100');
const swatch = (kind, px) => svg(px, px, SWATCH[kind](), `data-g2-drawn="swatch-${kind}"`, '0 0 100 100');
const stage = (kind, px) => svg(px, px, STAGE[kind](), `data-g2-drawn="stage-${kind}"`, '0 0 100 100');
/** a bank item's picture: a library picture, or a drawing of one of the kinds above */
const itemArt = (x, px) => (x.pic ? pic(x.pic, px) : OBJ[x.draw] ? art(object(x.draw, px)) : art(scene(x.draw, px * 1.2, px)));


/* ================================================================ the modes */
/** pick n of `pool` so that each value of `key` in `need` appears; up to `tries` draws */
function pickWith(rng, pool, n, ok, tries = 400) { let p; for (let t = 0; t < tries; t++) { p = rng.sample(pool, n); if (ok(p)) return p; } return p; }
/** an order of `items` whose `bit` sequence is not patterned (no runs or alternations a child can follow) */
function fairOrder(rng, items, bit) { let o; for (let t = 0; t < 400; t++) { o = rng.shuffle(items); if (!patterned(o.map(bit))) return o; } return o; }

/* ---------------------------------------------------------------- G3-581 balanced and unbalanced forces */
MODES['g3-forces'] = function forces(d, rng) {
  const all = B.FORCE_SCENES;
  const pick = d.n === 3 ? pickWith(rng, all, 3, (p) => new Set(p.map((x) => x.forces)).size === 2) : all.slice();
  const order = fairOrder(rng, pick, (x) => x.forces === 'balanced');
  const chips = (x, fs, dir) => one(x.id + ':forces', ['balanced', 'unbalanced'], x.forces, fs, 4, dir) + one(x.id + ':motion', ['stays still', 'starts to move'], x.motion === 'still' ? 'stays still' : 'starts to move', fs, 4, dir);
  let body;
  if (d.n === 3) {
    // level 1: three big pictures with the arrows drawn; the child circles only
    body = order.map((x) => band(row(art(scene(x.id, 192, 160, d.arrows ? x.arrows : null)) + col(para(x.label, 330, 16) + chips(x, 15, 'row'), 10, 'align-items:flex-start'), 18, 'justify-content:flex-start'),
      `data-g3-scenecard="${x.id}"`, 'padding:4px 12px')).join('');
  } else {
    // levels 2 and 3: six cards, two to a row; the picture is big enough to draw arrows on
    const cw = (W - 10) / 2, ph = d.frame ? 110 : 128;
    const card = (x) => box('dk-tile', cw, 'auto', col(para(x.label, cw - 22, 14) + row(art(scene(x.id, ph * 1.2, ph, null)) + col(chips(x, 13, 'column'), 10), 10, 'justify-content:flex-start'), 4, 'align-items:flex-start'),
      `data-g3-scenecard="${x.id}"`, 'flex:1 1 0;min-height:0;padding:4px 8px;justify-content:flex-start;align-items:flex-start');
    const rows = []; for (let i = 0; i < order.length; i += 2) rows.push(row(card(order[i]) + card(order[i + 1]), 10, 'flex:1 1 0;min-height:0;align-items:stretch'));
    body = rows.join('');
  }
  const parts = [];
  if (!d.arrows) parts.push(whiteBand(para('Draw an arrow on each picture for every push or pull. A stronger push or pull gets a longer arrow.', 640, 15), 'data-g3-tip="1"', 'padding:4px 8px'));
  parts.push(grow(body, 'gap:8px'));
  if (d.frame) parts.push(frameTile([['The book does not fall because the table', 250, '.'], ['The two forces on the book are', 200, ', so it stays still.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: order.map((x) => x.forces + ':' + x.id) } };
};

/* ---------------------------------------------------------------- G3-582 predict the swing (record) */
MODES['g3-pendulum'] = function pendulum(d) {
  const strings = d.strings === 1 ? [B.PENDULUM_STRINGS[0]] : d.strings === 2 ? [B.PENDULUM_STRINGS[0], B.PENDULUM_STRINGS[2]] : B.PENDULUM_STRINGS.slice();
  const name = (s) => `${s.inches}-inch string`;
  // review round 1: the fair-test steps (the same small pull every time; the same washer for every string)
  const how = 'Tie a washer to a string. Hold the top of the string still. Pull the washer out to the side the same small distance every time, and let go.' + (d.strings > 1 ? ' Use the same washer for every string.' : '') + ' Count the swings for 15 seconds. One swing = over and back.';
  const ph = d.graph ? 76 : 90;
  const setup = whiteBand(row(art(scene('pendulum', ph * 1.2, ph)) + para(how, 520, d.graph ? 14 : 15), 12), 'data-g3-setup="1"', 'padding:4px 8px');
  const parts = [setup];
  if (d.strings === 1) {
    const cols = [{ label: '12-inch string', w: 200 }, { label: 'swings in 15 seconds', w: 200 }];
    parts.push(table(cols, [1, 2, 3].map((k) => [word('trial ' + k, 'font-size:16px'), numBox(90, 44)]), 62, 'data-g3-table="1"'));
    parts.push(whiteBand(row(text('Were the three counts close to each other?') + rec(['yes', 'no']), 12), 'data-g3-close="1"', 'padding:6px 0'));
    parts.push(growDraw(W - 40, 150, 'Draw your pendulum. Show one swing with an arrow: over and back.', 'data-dk-prompt="pendulum"'));
  } else if (!d.graph) {
    const cols = [{ label: 'string', w: 150 }, { label: 'trial 1', w: 96 }, { label: 'trial 2', w: 96 }, { label: 'trial 3', w: 96 }, { label: 'middle count', w: 110 }];
    const rows = strings.map((s) => [word(name(s), 'font-size:15px'), numBox(70, 40), numBox(70, 40), numBox(70, 40), numBox(70, 40, 'data-g3-middle="1"')]);
    parts.push(whiteBand(para('Test the 12-inch string first. Then write your prediction. Then test the 6-inch string.', 640, 14), 'data-g3-tip="1"', 'padding:3px 8px'));
    parts.push(table(cols, rows, 54, 'data-g3-table="1"'));
    parts.push(whiteBand(para('Put the three counts in order. The middle one is the middle count.', 640, 14), 'data-g3-tip="1"', 'padding:3px 8px'));
    parts.push(frameTile([['Before we test it: I predict the 6-inch string will swing', 70, 'times.'], ['Its middle count was', 70, 'swings.']]));
    parts.push(whiteBand(row(text('My prediction was:') + rec(['close', 'not close']), 12), 'data-g3-check="1"', 'padding:6px 0'));
    parts.push(growDraw(W - 40, 110, 'Draw your pendulum. Show one swing with an arrow: over and back.', 'data-dk-prompt="pendulum"'));
  } else {
    // level 3: the table and the sentences on the left, the bar graph (0 to 30, a line at every swing, about 5 mm apart)
    // on the right, so the graph can be tall enough to colour
    const lw = 424;
    const cols = [{ label: 'string', w: 108 }, { label: 'trial 1', w: 58 }, { label: 'trial 2', w: 58 }, { label: 'trial 3', w: 58 }, { label: 'middle count', w: 82 }];
    const rows = strings.map((s) => [word(name(s), 'font-size:14px;white-space:normal;width:100px;text-align:center'), numBox(54, 38), numBox(54, 38), numBox(54, 38), numBox(60, 38, 'data-g3-middle="1"')]);
    const left = col(table(cols, rows, 56, 'data-g3-table="1"', 13, false, lw) +
      box('dk-tile dk-tile--white', lw, 'auto', para('Put the three counts in order. The middle one is the middle count. Color each bar up to its middle count.', lw - 24, 14), 'data-g3-tip="1"', 'padding:4px 8px') +
      box('dk-tile dk-tile--white', lw, 'auto', col(G1.kit.frameLine(['When the string is shorter,'], 40) + G1.kit.frameLine(['it swings', 140, 'times.'], 40) + G1.kit.frameLine(['A 3-inch string would swing'], 40) + G1.kit.frameLine(['about', 70, 'times.'], 40), 2, 'align-items:flex-start'), 'data-g1-frames="1"', 'padding:4px 12px;flex:1 1 auto;justify-content:flex-start'), 8, 'align-items:flex-start;align-self:stretch');
    const g = barGraph3({ bars: strings.map((s) => s.inches + ' inches'), lines: 30, per: 1, step: 5, unitH: 18, colW: 54, unit: 'swings in 15 seconds' });
    parts.push(row(left + box('dk-tile dk-tile--white', W - lw - 10, 'auto', g, 'data-g2-graphband="1"', 'padding:4px 2px'), 10, 'align-items:stretch;flex:1 1 auto'));
  }
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, strings: strings.map((s) => s.inches) } };
};

/* ---------------------------------------------------------------- G3-583 friction slows it down (record) */
MODES['g3-friction'] = function friction(d) {
  const surfaces = d.surfaces === 2 ? B.SURFACES.slice(0, 2) : B.SURFACES.slice();
  // review round 1: ONE book (the picture agrees), and the car starts at the top of the board every time
  const setup = whiteBand(row(art(scene('ramp', 120, 100)) + para('Lean a board on one book to make a low ramp. Start the car at the top of the board every time, and let it roll down by itself (no push). Measure in inches how far it goes past the end of the board.', 500, 15), 12), 'data-g3-setup="1"', 'padding:4px 8px');
  const head0 = { label: 'surface', w: 170 };
  const cols = d.trials === 1 ? [head0, { label: 'distance (inches)', w: 200 }] : [head0, { label: 'trial 1', w: 90 }, { label: 'trial 2', w: 90 }, { label: 'trial 3', w: 90 }, { label: 'middle distance', w: 110 }];
  const rows = surfaces.map((s) => [row(art(swatch(s.id, 40)) + word(s.label, 'font-size:15px'), 6, 'justify-content:flex-start;width:166px')].concat(d.trials === 1 ? [numBox(100, 44)] : [numBox(66, 40), numBox(66, 40), numBox(66, 40), numBox(70, 40, 'data-g3-middle="1"')]));
  const parts = [setup, table(cols, rows, d.trials === 1 ? 70 : 56, 'data-g3-table="1"')];
  if (d.trials === 3 && !d.graph) parts.push(whiteBand(para('Put the three distances in order. The middle one is the middle distance.', 640, 14), 'data-g3-tip="1"', 'padding:3px 8px'));
  if (d.trials === 1) parts.push(whiteBand(row(text('The car went farther on:') + rec(surfaces.map((s) => s.label).concat(['the same'])), 12), 'data-g3-farther="1"', 'padding:6px 0'));
  if (d.frame === 'farthest') parts.push(frameTile([['The car went farthest on', 170, 'because'], [600, '.']]));
  if (d.graph) {
    // level 3: the graph (each line 10 inches, about 5 mm apart) beside the rounding steps and the friction sentences
    const g = barGraph3({ bars: surfaces.map((s) => s.label), lines: 16, per: 10, step: 2, unitH: 19, colW: 74, unit: 'middle distance (inches)' });
    const gw = 46 + 3 * 74 + 16, rw = W - gw - 10;
    const right = col(box('dk-tile dk-tile--white', rw, 'auto', para('Put the three distances in order: the middle one is the middle distance. Round it to the nearest 10 inches and color up to that line. If it went past 160, color to the top and write the number on the bar.', rw - 20, 14), 'data-g3-tip="1"', 'padding:4px 8px') +
      box('dk-tile dk-tile--white', rw, 'auto', col(G1.kit.frameLine(['Friction is a force that'], 40) + G1.kit.frameLine([rw - 40, '.'], 40) + G1.kit.frameLine(['The car went the shortest'], 40) + G1.kit.frameLine(['distance on', rw - 140], 40) + G1.kit.frameLine(['because', rw - 110], 40) + G1.kit.frameLine([rw - 40, '.'], 40), 2, 'align-items:flex-start'), 'data-g1-frames="1"', 'padding:4px 12px;flex:1 1 auto;justify-content:flex-start'), 8, 'align-self:stretch');
    parts.push(row(box('dk-tile dk-tile--white', gw, 'auto', g, 'data-g2-graphband="1"', 'padding:4px 2px') + right, 10, 'align-items:stretch;flex:1 1 auto'));
  } else parts.push(growDraw(W - 40, 140, 'Draw the ramp. Mark where the car stopped on each surface.', 'data-dk-prompt="ramp"'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, surfaces: surfaces.map((s) => s.id) } };
};

/* ---------------------------------------------------------------- G3-584 balloon tricks: static electricity (record) */
MODES['g3-static'] = function staticTests(d) {
  const tests = d.tests === 3 ? B.STATIC_TESTS.slice(0, 3) : B.STATIC_TESTS.slice();
  const results = ['moved toward', 'moved away', 'did not move'];
  const setup = whiteBand(para('Rub the balloon on a wool sweater or scarf for 10 seconds. Then hold it close to each thing. Do not touch it.', 640, 15), 'data-g3-setup="1"', 'padding:4px 8px');
  const big = !d.predict, ph = big ? 130 : 104, tw = big ? 340 : 290;
  const cols = [{ label: 'test', w: tw }].concat(d.predict ? [{ label: 'my prediction', w: 160 }] : [], [{ label: 'what happened', w: big ? 220 : 160 }]);
  const rows = tests.map((t) => [row(art(scene(t.draw, ph * 1.2, ph)) + note(t.label, tw - ph * 1.2 - 14, big ? 15 : 13), 8, 'justify-content:flex-start')].concat(d.predict ? [rec(results, 13, 4, 'column', 'data-g3-pred="1"')] : [], [rec(results, big ? 15 : 13, 5, 'column', 'data-g3-res="1"')]));
  const parts = [setup, table(cols, rows, ph + 8, 'data-g3-table="1"', 14, true)];
  if (d.question) parts.push(frameTile([['What happened when we did not rub the balloon?'], [600, '.']]));
  if (d.frame) parts.push(frameTile([['When I rubbed the balloon,', 360, '.'], ['This happened because', 410, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, tests: tests.map((t) => t.id) } };
};

/* ---------------------------------------------------------------- G3-585 what do magnets pull? */
MODES['g3-magnets'] = function magnets(d, rng) {
  const P = B.MAGNET_OBJECTS.filter((o) => o.pulled), N = B.MAGNET_OBJECTS.filter((o) => !o.pulled);
  const pick = d.n === 6 ? [...rng.sample(P, 3), B.MAGNET_OBJECTS.find((o) => o.id === 'foil'), B.MAGNET_OBJECTS.find((o) => o.id === 'penny'), rng.pick(N.filter((o) => o.id !== 'foil' && o.id !== 'penny'))] : B.MAGNET_OBJECTS.slice();
  const order = fairOrder(rng, pick, (o) => o.pulled);
  const result = (o, fs, dir) => one(o.id, ['pulled', 'not pulled'], o.pulled ? 'pulled' : 'not pulled', fs, 4, dir);
  let body;
  if (d.n === 6) {
    // level 1: six objects, one to a row, big pictures
    body = order.map((o) => band(row(itemArt(o, 78) + col(word(o.label, 'font-size:17px') + note('made of ' + o.made, 190, 14), 2, 'width:200px;align-items:flex-start') +
      col(small('I predict', 130) + rec(['pulled', 'not pulled'], 14, 4), 2) + col(small('result', 180) + result(o, 14, 'row'), 2), 14, 'justify-content:flex-start'),
    `data-g3-object="${o.id}"`, 'padding:2px 10px')).join('');
  } else {
    const cw = (W - 10) / 2;
    const cell = (o) => box('dk-tile dk-tile--white', cw, 'auto', row(itemArt(o, 54) + col(word(o.label, 'font-size:14px') + note('made of ' + o.made, 96, 12), 1, 'width:100px;align-items:flex-start') +
      col(small('I predict', 74) + rec(['pulled', 'not pulled'], 11, 2, 'column'), 1) + col(small('result', 84) + result(o, 12, 'column'), 1), 5, 'justify-content:flex-start'),
    `data-g3-object="${o.id}"`, 'padding:2px 6px;flex:1 1 0;min-height:0');
    const rows = []; for (let i = 0; i < order.length; i += 2) rows.push(row(cell(order[i]) + cell(order[i + 1]), 10, 'flex:1 1 0;min-height:0;align-items:stretch'));
    body = rows.join('');
  }
  const parts = [safety(MAGNET_SAFETY), grow(body, 'gap:6px')];
  if (d.sort) parts.push(whiteBand(row(['pulled', 'not pulled'].map((k) => col(word(k, 'font-size:15px') + lineBox(300, 38) + lineBox(300, 38), 0)).join(''), 16), 'data-g3-sort="1"', 'padding:4px 0'));
  if (d.frame) parts.push(frameTile([['Does a magnet pull all metals?', 120, 'My evidence:'], [600, '.']], 'data-g3-blank="metals" data-dk-answer="no"'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: order.map((o) => (o.pulled ? 'pulled' : 'not') + ':' + o.id) } };
};

/* ---------------------------------------------------------------- G3-586 magnet force from a distance (record) */
MODES['g3-magnet-distance'] = function magnetDistance(d) {
  const ruler = whiteBand(col(para('Put the magnet at 0. Slide a paper clip slowly toward it. Mark the ruler where the clip started to move. Read it to the nearest half inch.', 630, 14) + art(inchRuler(5, 96, true)), 4), 'data-g3-ruler-band="1"', 'padding:4px 8px');
  const parts = [safety(MAGNET_SAFETY), ruler];
  if (d.magnets === 1) parts.push(frameTile([['The clip started to move', 80, 'inches from the magnet.']]));
  else {
    const cols = [{ label: 'magnet', w: 150 }, { label: 'trial 1 (inches)', w: 100 }, { label: 'trial 2 (inches)', w: 100 }, { label: 'trial 3 (inches)', w: 100 }, { label: 'middle distance', w: 110 }];
    const rows = ['small magnet', 'big magnet'].map((m) => [word(m, 'font-size:15px'), numBox(70, 38), numBox(70, 38), numBox(70, 38), numBox(70, 38, 'data-g3-middle="1"')]);
    parts.push(table(cols, rows, d.frame ? 46 : 54, 'data-g3-table="1"'));
    parts.push(whiteBand(row(text('Which magnet pulled from farther away?') + rec(['small', 'big', 'the same']), 12), 'data-g3-farther="1"', 'padding:6px 0'));
  }
  const tcols = [{ label: 'Put it between the magnet and the clip:', w: 300 }, { label: 'I predict the pull goes through', w: 150 }, { label: 'Did the pull go through?', w: 150 }];
  const trows = B.THROUGH.map((t) => [word(t.label, 'font-size:15px'), rec(['yes', 'no'], 14, 6), rec(['yes', 'no'], 14, 6)]);
  parts.push(table(tcols, trows, d.frame ? 36 : 44, 'data-g3-through="1"', 13, d.magnets === 2));
  if (d.frame) parts.push(frameTile([['When the clip is farther from the magnet, the pull is', 160, '.'], ['I know because', 450, '.']]));
  if (d.magnets === 1) parts.push(growDraw(W - 40, 130, 'Draw one test: the magnet, the paper clip and the thing between them.', 'data-dk-prompt="test"'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G3-587 / G3-592 the planners (record) */
function planner(d, cards, criteria, frames, sketch, head) {
  const n = cards.length, cw = (W - 12 - 8 * (n - 1)) / n;
  const pick = whiteBand(col(text(d.choose ? (sketch === 'a sketch of the problem' ? 'Circle the problem you will solve.' : 'Circle the hazard you will solve.') : (sketch === 'a sketch of the problem' ? 'Our problem is one of these:' : 'Our hazard is one of these:'), 'font-size:16px') + row(cards.map((c) => tile(col(art(scene(c.draw, cw - 40, (cw - 40) * 100 / 120)) + note(c.label, cw - 16, 13), 2), cw, 'auto', `data-g3-problem="${c.id}"`, 'white', 'padding:4px')).join(''), 8, 'align-items:stretch'), 4), 'data-g3-problems="1"', 'padding:4px 6px');
  const parts = sketch === 'a sketch of the problem' ? [safety(MAGNET_SAFETY), pick] : [pick];
  if (d.choose) parts.push(whiteBand(col(text('Circle what a good solution must do.', 'font-size:16px') + row(criteria.map((c) => chip(c, '', 'font-size:14px')).join(''), 8, 'flex-wrap:wrap;width:640px'), 4), 'data-g3-criteria="1"', 'padding:4px 6px'));
  if (d.choose) parts.push(whiteBand(row(text('Circle our limits:', 'font-size:16px') + B.LIMITS.map((c) => chip(c, '', 'font-size:14px')).join(''), 8, 'flex-wrap:wrap;width:640px'), 'data-g3-limits="1"', 'padding:4px 6px'));
  if (d.frames) parts.push(frameTile(frames));
  if (d.two) parts.push(frameTile(head.concat([['Criteria (what it must do):'], ['1.', 280, '2.', 280], ['Constraints (our limits: materials, money, time, size):'], ['1.', 280, '2.', 280]])));
  parts.push(growDraw(W - 40, d.two ? 120 : d.frames ? 160 : 220, sketch, 'data-dk-prompt="sketch"'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
}
MODES['g3-magnet-problem'] = (d) => planner(d, B.MAGNET_PROBLEMS, B.MAGNET_CRITERIA,
  [['The problem is', 470, '.'], ['A good solution must', 420, '.'], ['We can only use', 450, '.']], 'a sketch of the problem', [['The problem is', 470, '.']]);
MODES['g3-hazard-planner'] = (d) => planner(d, B.HAZARDS, B.HAZARD_CRITERIA,
  [['The hazard is', 480, '.'], ['It causes this problem:', 400, '.'], ['A good solution must', 420, '.'], ['We are limited by', 440, '.']], 'our school and the hazard', [['The hazard is', 480, '.'], ['It causes this problem:', 400, '.']]);

/* ---------------------------------------------------------------- G3-588 design and compare magnet solutions (record) */
MODES['g3-magnet-compare'] = function magnetCompare(d) {
  const n = d.sketches, ids = ['A', 'B', 'C'].slice(0, n), sw = (W - 10 * (n - 1)) / n;
  const sketch = (k) => box('dk-draw', sw, 'auto', `<span class="dk-head" style="position:absolute;left:10px;top:4px;font-size:17px">solution ${k}</span>`, `data-dk-prompt="solution-${k}"`, `min-height:${d.table ? 120 : 220}px`);
  const parts = [safety(MAGNET_SAFETY), row(ids.map(sketch).join(''), 10, 'flex:1 1 auto;align-items:stretch;min-height:0')];
  if (d.table) {
    // review round 1: score against the criteria AND the constraints (3-5-ETS1-2): two rows for our limits
    parts.push(whiteBand(para('Write what it must do and our limits. Put a check under each solution that meets each one.', 630, 14), 'data-g3-tip="1"', 'padding:3px 8px'));
    const cols = [{ label: '', w: 330 }].concat(ids.map((k) => ({ label: 'solution ' + k, w: 90 })));
    const crit = [1, 2, 3].map((i) => [row(word('must do:', 'font-size:14px') + lineBox(250, 34), 4), ...ids.map(() => tick(26))]);
    const lim = [1, 2].map((i) => [row(word('our limit:', 'font-size:14px') + lineBox(240, 34), 4), ...ids.map(() => tick(26))]);
    parts.push(table(cols, crit.concat(lim), 42, 'data-g3-scoring="1"'));
  } else parts.push(frameTile([['Solution A is good because', 350, '.'], ['Solution B is good because', 350, '.']]));
  parts.push(frameTile([['We will build solution', 60, 'because'], [600, '.']]));
  parts.push(frameTile([['When we tested it,', 460, '.']].concat(d.improve ? [['After the test, we would improve it by', 300, '.']] : [])));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G3-589 our weather data: tables and graphs (record) */
MODES['g3-weather-data'] = function weatherData(d) {
  const days = Array.from({ length: d.days }, (_, k) => k + 1);
  const five = d.days === 5, fs = five ? 14 : d.celsius ? 11 : 12;
  // review round 1: "partly cloudy" (US weather words)
  const cols = [{ label: 'day', w: 52 }, { label: 'date', w: 104 }, { label: 'high (°F)', w: 76 }, { label: 'rain or snow', w: 170 }, { label: 'clouds', w: 226 }];
  const rows = days.map((k) => [word(String(k), 'font-size:15px'), lineBox(86, five ? 40 : d.celsius ? 22 : 24), numBox(60, five ? 40 : d.celsius ? 21 : 22), rec(['rain', 'snow', 'none'], fs, 3), rec(['clear', 'partly cloudy', 'cloudy'], fs, 3)]);
  const parts = [table(cols, rows, five ? 60 : d.celsius ? 22 : 26, 'data-g3-table="1"', 13, five)];
  if (five) parts.push(frameTile([['The warmest day was day', 50, '. Its high was', 60, '°F.'], ['On day', 50, 'we had', 120, '.']]));
  if (d.graph) {
    // review round 1: about 5 mm a unit line; level 3 reads degrees Celsius across a thermometer beside the graph (°F
    // and °C labels apart: the strip's "100" and "°F" overprinted)
    const g = barGraph3({ bars: days.map((k) => 'day ' + k), lines: 10, per: 10, step: 1, unitH: d.celsius ? 18 : 19, colW: d.celsius ? 50 : 56, unit: 'high (°F)' });
    const tip = para('Round each high to the nearest 10 degrees. Color up to that line.', d.celsius ? 520 : 620, 14);
    parts.push(d.celsius
      ? row(box('dk-tile dk-tile--white', W - 118, 'auto', col(tip + g, 2, 'align-items:flex-start'), 'data-g2-graphband="1"', 'padding:4px 6px') + box('dk-tile dk-tile--white', 108, 'auto', col(note('°F and °C: read across', 100, 12) + art(dualThermo(230)), 2), 'data-g3-dual-band="1"', 'padding:4px 2px'), 10, 'align-items:stretch')
      : whiteBand(col(tip + g, 2, 'align-items:flex-start'), 'data-g2-graphband="1"', 'padding:4px 8px'));
  }
  const cmp = [['In the fall, our warmest high was', 70, '°F. Now it is', 70, '°F.'], ['Now our days are', 90, 'than in the fall.']];
  if (d.compare && !d.celsius) parts.push(frameTile(cmp));
  if (d.celsius) parts.push(frames(cmp.concat([['Day 1:', 50, '°F is about', 50, '°C.     Day 2:', 50, '°F is about', 50, '°C.']]), 36));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, days: d.days } };
};
/** a thermometer with degrees Fahrenheit on the left and degrees Celsius on the right (read across), 0 to 100 °F */
function dualThermo(h) {
  const top = 12, bot = h - 30, F2y = (f) => bot - (f / 100) * (bot - top), C2y = (c) => F2y(c * 9 / 5 + 32);
  let s = `<rect x="44" y="${top - 4}" width="16" height="${f1(bot - top + 8)}" rx="8" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2"/><circle cx="52" cy="${f1(bot + 12)}" r="11" fill="${T.coral}" stroke="${T.ink}" stroke-width="2"/><rect x="48" y="${f1(bot - 4)}" width="8" height="10" fill="${T.coral}"/>`;
  for (let f = 0; f <= 100; f += 10) s += `<line x1="36" y1="${f1(F2y(f))}" x2="44" y2="${f1(F2y(f))}" stroke="${T.ink}" stroke-width="1.5"/><text x="33" y="${f1(F2y(f) + 4)}" text-anchor="end" font-family="Nunito" font-weight="800" font-size="11" fill="${T.ink}">${f}</text>`;
  for (let c = -15; c <= 35; c += 5) s += `<line x1="60" y1="${f1(C2y(c))}" x2="68" y2="${f1(C2y(c))}" stroke="${T.teal}" stroke-width="1.5"/><text x="71" y="${f1(C2y(c) + 4)}" font-family="Nunito" font-weight="800" font-size="11" fill="${T.teal}">${c}</text>`;
  s += `<text x="16" y="${h - 2}" font-family="Nunito" font-weight="800" font-size="12" fill="${T.ink}">°F</text><text x="76" y="${h - 2}" font-family="Nunito" font-weight="800" font-size="12" fill="${T.teal}">°C</text>`;
  return svg(96, h, s, 'data-g3-dual="1"');
}

/* ---------------------------------------------------------------- G3-590 what weather to expect each season */
MODES['g3-seasons-graph'] = function seasonsGraph(d) {
  const C = B.CITY, idx = d.months === 4 ? [0, 3, 6, 9] : C.months.map((_, i) => i);
  const cw = d.months === 4 ? 120 : 46;
  const tbl = whiteBand(col(text(`${C.name}: the average high and the rain in each month (1991 to 2020, rounded)`, 'font-size:15px') +
    row(`<div style="width:110px">${word('month', 'font-size:13px')}</div>` + idx.map((i) => `<div style="width:${cw}px;display:flex;justify-content:center">${word(C.months[i], 'font-size:13px')}</div>`).join(''), 0, 'justify-content:flex-start') +
    row(`<div style="width:110px">${word('high (°F)', 'font-size:13px')}</div>` + idx.map((i) => `<div style="width:${cw}px;display:flex;justify-content:center" data-g3-high="${C.months[i]}">${word(String(C.high[i]), 'font-size:15px')}</div>`).join(''), 0, 'justify-content:flex-start') +
    row(`<div style="width:110px">${word('rain (inches)', 'font-size:13px')}</div>` + idx.map((i) => `<div style="width:${cw}px;display:flex;justify-content:center" data-g3-rain="${C.months[i]}">${word(String(C.rain[i]), 'font-size:15px')}</div>`).join(''), 0, 'justify-content:flex-start'), 2, 'align-items:flex-start'), 'data-g3-climate-table="1"', 'padding:4px 6px');
  const prefill = d.months === 12 ? { Jan: Math.round(C.high[0] / 10), Feb: Math.round(C.high[1] / 10) } : {};
  const g = barGraph3({ bars: idx.map((i) => C.months[i]), lines: 10, per: 10, step: 1, unitH: 19, colW: d.months === 4 ? 140 : 50, prefill, unit: 'average high (°F)' });
  const graph = whiteBand(col(para(`Round each high to the nearest 10 degrees. Color up to that line.${d.months === 12 ? ' January and February are done for you.' : ''}`, 620, 14) + g, 2, 'align-items:flex-start'), 'data-g2-graphband="1"', 'padding:4px 8px');
  const seasons = d.months === 4 ? [['winter', 'look at Jan'], ['spring', 'look at Apr'], ['summer', 'look at Jul'], ['fall', 'look at Oct']] : [['winter', 'Dec, Jan, Feb'], ['spring', 'Mar, Apr, May'], ['summer', 'Jun, Jul, Aug'], ['fall', 'Sep, Oct, Nov']];
  const sbox = whiteBand(col(row(text('Word bank:', 'font-size:14px') + B.SEASON_WORDS.map((w) => chip(w, '', 'font-size:13px;padding:0 6px')).join(''), 5, 'flex-wrap:wrap;width:650px') +
    row(seasons.map(([s, m]) => box('dk-draw', 155, 'auto', col(word(s, 'font-size:16px') + note(m, 140, 11) + lineBox(140, 34) + lineBox(140, 34) + (d.frame ? '' : note('Draw it:', 140, 11)), 0, 'justify-content:flex-start'), `data-g3-season="${s}"`, 'padding:2px 4px;min-height:110px')).join(''), 8, 'flex:1 1 auto;align-items:stretch'), 4, 'flex:1 1 auto;align-items:center;width:100%'), 'data-g3-seasons="1"', 'padding:4px 6px;flex:1 1 auto;min-height:0;flex-direction:column;align-items:stretch');
  const parts = [tbl, graph, sbox];
  if (d.frame) parts.push(frameTile([['The warmest season is', 100, '. Its highs are about', 60, '°F.'], ['The wettest season is', 100, '. It gets about', 50, 'inches of rain in all.'], ['These two seasons are different because', 250, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, prefill } };
};

/* ---------------------------------------------------------------- G3-591 climates around the world */
const XMAX = Math.PI * 0.8707;
function ne1(lam, phi) { const p2 = phi * phi, p4 = p2 * p2, p6 = p4 * p2, p8 = p4 * p4, p10 = p8 * p2, p12 = p6 * p6; return [lam * (0.870700 - 0.131979 * p2 - 0.013791 * p4 + 0.003971 * p10 - 0.001529 * p12), phi * (1.007226 + 0.015085 * p2 - 0.044475 * p6 + 0.028874 * p8 - 0.005916 * p10)]; }
/** a lat / lon on the G1-379 world map (Natural Earth I, central meridian 11° E, 2000 units across, top 84° N) */
function mapPoint(lat, lon) { const D = Math.PI / 180, u = 2000 / (2 * XMAX), yTop = ne1(0, 84 * D)[1]; let l = lon - 11; while (l <= -180) l += 360; while (l > 180) l -= 360; const [x, y] = ne1(l * D, lat * D); return [1000 + x * u, (yTop - y) * u]; }
/** what each place is, by its own numbers: cold if its warmest month's high is under 60 °F; else wet if it gets 40 inches
 *  a year or more, dry under 10 */
function climateOf(p) { const hot = Math.max(...p.high) >= 60, yr = p.rain.reduce((a, b) => a + b, 0); return !hot ? 'cold' : yr >= 40 ? 'hot and wet' : yr < 10 ? 'hot and dry' : null; }
function miniGraph(vals, max, label, unit, w, h) {
  const lx = 22, bw = (w - lx - 4) / 12, base = h - 14;
  let s = '';
  for (let k = 0; k <= 4; k++) { const y = base - k * (base - 6) / 4; s += `<line x1="${lx}" y1="${f1(y)}" x2="${w - 2}" y2="${f1(y)}" stroke="${T.grid}" stroke-width="0.8"/>` + (k % 2 === 0 ? `<text x="${lx - 3}" y="${f1(y + 4)}" text-anchor="end" font-family="Nunito" font-weight="800" font-size="10" fill="${T.ink}">${max * k / 4}</text>` : ''); }
  vals.forEach((v, i) => { const hh = Math.max(0, v) / max * (base - 6); s += `<rect x="${f1(lx + i * bw + 1)}" y="${f1(base - hh)}" width="${f1(bw - 2)}" height="${f1(hh)}" fill="${unit === 'in' ? T.teal : T.coral}" opacity=".85"/>` + `<text x="${f1(lx + i * bw + bw / 2)}" y="${h - 3}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="9" fill="${T.ink}">${'JFMAMJJASOND'[i]}</text>`; });
  s += `<line x1="${lx}" y1="6" x2="${lx}" y2="${base}" stroke="${T.ink}" stroke-width="1.5"/>`;
  return col(note(label, w, 11) + art(svg(w, h, s, `data-g3-mini="${unit}"`)), 0);
}
MODES['g3-climates'] = function climates(d, rng) {
  const two = d.places === 2;
  const pick = two ? pickWith(rng, B.CLIMATE_PLACES, 2, (p) => new Set(p.map(climateOf)).size === 2) : B.CLIMATE_PLACES.slice();
  const order = rng.shuffle(pick);
  const letters = derange(order.length, rng).map((k) => 'ABCD'[k]);   // the dots' letters never follow the cards' order
  const { worldMap } = require('../../primitives/world-map.js');
  const mw = 480, m = worldMap({ w: mw, set: [{ id: 'land', regions: ['northAmerica', 'southAmerica', 'europe', 'asia', 'africa', 'oceania'] }] });
  const dots = order.map((p, i) => { const [x, y] = mapPoint(p.lat, p.lon); return `<g data-g3-dot="${letters[i]}" data-g3-place="${p.id}"><circle cx="${f1(x)}" cy="${f1(y)}" r="46" fill="${T.coral}" stroke="#FFFFFF" stroke-width="9"/><text x="${f1(x)}" y="${f1(y + 21)}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="60" fill="#FFFFFF">${letters[i]}</text></g>`; }).join('');
  const map = whiteBand(art(m.svg.replace('</svg>', dots + '</svg>')), 'data-g3-map="1"', 'padding:4px');
  const cw = (W - 10) / 2;
  const graphs = (p) => two ? col(miniGraph(p.high, 100, 'average high (°F)', 'f', 290, 116) + miniGraph(p.rain, 12, 'rain (inches)', 'in', 290, 116), 6)
    : row(miniGraph(p.high, 100, 'high (°F)', 'f', 150, 70) + miniGraph(p.rain, 12, 'rain (inches)', 'in', 150, 70), 6);
  const card = (p, i) => box('dk-tile dk-tile--white', cw, 'auto', col(word(p.label, 'font-size:15px') + graphs(p) +
    (p.belowZeroNote ? note('In winter the high is below 0 °F.', 290, 11) : '') + row(small('Its dot on the map:', 130) + numBox(40, 28, `data-g3-letter="${p.id}" data-dk-answer="${letters[i]}"`), 6) + one(p.id, B.CLIMATE_SORT, climateOf(p), 13, 4), two ? 6 : 2), `data-g3-card="${p.id}"`, 'padding:3px 6px;flex:1 1 0;min-height:0');
  const rows = []; for (let i = 0; i < order.length; i += 2) rows.push(row(card(order[i], i) + card(order[i + 1], i + 1), 10, 'flex:1 1 0;min-height:0;align-items:stretch'));
  const parts = [map, grow(rows.join(''), 'gap:8px')];
  if (d.frame) parts.push(frames([['Weather is', 450, '.'], ['Climate is', 450, '.']], 42));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: order.map((p, i) => climateOf(p) + ':' + p.id + '@' + letters[i]) } };
};

/* ---------------------------------------------------------------- G3-593 which design reduces the damage? (record) */
MODES['g3-hazard-test'] = function hazardTest(d) {
  const parts = [whiteBand(para('Build a model house in a tray. Pour water into the tray (a flood) or have your teacher turn a fan on it (high wind). Test every design the same way.', 640, 14), 'data-g3-setup="1"', 'padding:4px 8px')];
  const draw = (lab, prompt, w, minH) => box('dk-draw', w, 'auto', `<span class="dk-head" style="position:absolute;left:10px;top:4px;font-size:17px">${lab}</span>`, `data-dk-prompt="${prompt}"`, `min-height:${minH}px`);
  if (d.designs === 1) {
    parts.push(row(draw('our design before the test', 'before', (W - 12) / 2, 260) + draw('after the test', 'after', (W - 12) / 2, 260), 12, 'flex:1 1 auto;align-items:stretch;min-height:0'));
    parts.push(whiteBand(col(row(text('The house stayed dry:') + rec(['yes', 'no']), 10) + row(text('The house stayed standing:') + rec(['yes', 'no']), 10), 4), 'data-g3-result="1"', 'padding:6px 0'));
    parts.push(frameTile([['After the test, we would change', 380, '.']]));
  } else {
    parts.push(row(['A', 'B'].map((k) => draw('design ' + k, 'design-' + k, (W - 12) / 2, d.cer ? 120 : 170)).join(''), 12, 'flex:1 1 auto;align-items:stretch;min-height:0'));
    const cols = [{ label: '', w: 100 }, { label: 'What happened to the model house?', w: 330 }, { label: 'dry?', w: 90 }, { label: 'standing?', w: 100 }];
    const rows = ['A', 'B'].map((k) => [word('design ' + k, 'font-size:15px'), col(lineBox(320, d.cer ? 30 : 36) + lineBox(320, d.cer ? 30 : 36), 0), rec(['yes', 'no'], 13, 3), rec(['yes', 'no'], 13, 3)]);
    parts.push(table(cols, rows, d.cer ? 66 : 80, 'data-g3-table="1"'));
    parts.push(whiteBand(row(text('The design that worked better:') + rec(['A', 'B', 'the same']), 12), 'data-g3-better="1"', 'padding:5px 0'));
  }
  if (d.cer) {
    parts.push(frames([['Claim: design', 60, 'reduces the damage best.'], ['Evidence: in our test,', 420, '.'], ['Reasoning: it works because', 380, '.']], 40));
    parts.push(whiteBand(col(text('A real design that works like ours (circle one):', 'font-size:15px') + row(B.REAL_EXAMPLES.map((e) => chip(e.label, '', 'font-size:13px;padding:0 6px')).join(''), 6, 'flex-wrap:wrap;width:640px;justify-content:center'), 4), 'data-g3-real="1"', 'padding:4px 6px'));
  }
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G3-594 raise mealworms through their life cycle */
MODES['g3-mealworms'] = function mealworms(d) {
  const draw = !d.frame;   // review round 2: level 3's 28 px drawing boxes were too small to draw in: its log is date, length, stage
  const cols = [{ label: 'date', w: 110 }].concat(draw ? [{ label: 'my drawing', w: 170 }] : [], d.length ? [{ label: 'length in inches (nearest quarter inch)', w: draw ? 120 : 190 }] : [], [{ label: 'stage', w: d.length ? (draw ? 230 : 300) : 340 }]);
  const big = d.obs === 4, rowH = big ? 96 : d.frame ? 36 : 48;
  const rows = Array.from({ length: d.obs }, () => [lineBox(100, d.frame ? 28 : 34), ...(draw ? [box('dk-draw', 150, rowH - 8, '', 'data-dk-prompt="obs"')] : []), ...(d.length ? [numBox(draw ? 60 : 130, d.frame ? 30 : 34)] : []), rec(['larva', 'pupa', 'adult beetle'], big ? 14 : 12, 4)]);
  const log = table(cols, rows, rowH, 'data-g3-table="1"', 14, big);
  // the life-cycle ring: four places round a loop, the egg drawn for you; the arrows go clockwise from the egg
  const Wr = 480, H = big ? 230 : d.frame ? 176 : 196, sw = 120, sh = 44;
  const P = [[Wr / 2, sh / 2 + 4], [Wr - sw / 2 - 4, H / 2], [Wr / 2, H - sh / 2 - 4], [sw / 2 + 4, H / 2]];
  const arc = (x1, y1, cx, cy, x2, y2) => { const dx = x2 - cx, dy = y2 - cy, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L; return `<path d="M${f1(x1)} ${f1(y1)} Q${f1(cx)} ${f1(cy)} ${f1(x2)} ${f1(y2)}" fill="none" stroke="${T.teal}" stroke-width="3"/><path d="M${f1(x2 + ux * 4)} ${f1(y2 + uy * 4)} L${f1(x2 - ux * 10 - uy * 6)} ${f1(y2 - uy * 10 + ux * 6)} L${f1(x2 - ux * 10 + uy * 6)} ${f1(y2 - uy * 10 - ux * 6)} Z" fill="${T.teal}"/>`; };
  const s = arc(P[0][0] + sw / 2 + 4, P[0][1], P[1][0], P[0][1], P[1][0], P[1][1] - sh / 2 - 8) + arc(P[1][0], P[1][1] + sh / 2 + 4, P[1][0], P[2][1], P[2][0] + sw / 2 + 8, P[2][1]) +
    arc(P[2][0] - sw / 2 - 4, P[2][1], P[3][0], P[2][1], P[3][0], P[3][1] + sh / 2 + 8) + arc(P[3][0], P[3][1] - sh / 2 - 4, P[3][0], P[0][1], P[0][0] - sw / 2 - 8, P[0][1]);
  const ring = svg(Wr, H, s, 'data-g3-ring="1"');
  const slot = (k, i) => `<div style="position:absolute;left:${f1(P[i][0] - sw / 2)}px;top:${f1(P[i][1] - sh / 2)}px;width:${sw}px;height:${sh}px" data-g3-slot="${i + 1}" data-dk-answer="${esc(k)}">` +
    (i === 0 ? row(art(stage('egg', 58)) + word('eggs', 'font-size:16px'), 2) : box('', sw, sh, '', 'data-dk-blank="1"', `display:block;border:2.5px solid ${T.teal};border-radius:10px;background:#FFFFFF`)) + '</div>';
  const model = whiteBand(col(row(text('The life cycle: write the stages in order, going around the arrows from the eggs.', 'font-size:15px;white-space:normal;width:400px') + col(word('Word bank:', 'font-size:13px') + text(B.BEETLE_STAGES.slice(1).join(', '), 'font-size:14px'), 0, 'align-items:flex-start', 'data-g3-wordbank="1"'), 12) +
    `<div data-dk-box style="position:relative;width:${Wr}px;height:${H}px;align-self:center"><div style="position:absolute;left:0;top:0;line-height:0">${ring}</div>${B.BEETLE_STAGES.map(slot).join('')}</div>`, 4), 'data-g3-model="1"', 'padding:4px 6px;flex:1 1 auto');
  const parts = [log, model];
  if (d.frame) parts.push(frames([['A mealworm is a', 110, ', like a caterpillar.'], ['Both life cycles have', 50, 'stages:', 340, '.'], ['One way they are different:', 380, '.']], 36));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { stages: B.BEETLE_STAGES.slice() } };
};

/* ---------------------------------------------------------------- G3-595 traits from parents */
MODES['g3-traits'] = function traits(d) {
  const TRAIT = { fur: ['brown', 'white'], ears: ['floppy', 'pointed'], spots: ['yes', 'no'] };
  const tnames = { fur: 'fur color', ears: 'ear shape', spots: 'spots' };
  const keys = d.traits, cats = !!d.cats, fs = cats ? 12 : 13;
  const chips = (g, dir, w) => keys.map((k) => col(small(tnames[k], w) + one(g.id + ':' + k, TRAIT[k], g[k], fs, 3, dir), 1)).join('');
  const parents = B.DOGS.slice(0, 2), pups = B.DOGS.slice(2);
  const parentCard = (g) => box('dk-tile dk-tile--white', (W - 10) / 2, 'auto', row(col(art(dog(g, cats ? 74 : 120)) + word(g.label, 'font-size:15px'), 1) + col(chips(g, 'row', 150), cats ? 2 : 5), 10), `data-g3-dogcard="${g.id}"`, 'padding:4px 6px;flex:1 1 0;min-height:0');
  const pupCol = (g) => col(art(dog(g, cats ? 64 : 100)) + word(g.label, 'font-size:14px') + chips(g, cats ? 'row' : 'column', 116), cats ? 1 : 3, 'width:120px;justify-content:flex-start');
  const parts = [cats ? '' : whiteBand(para('Look at each dog. Circle its traits.', 640, 15), 'data-g3-tip="1"', 'padding:4px 8px'),
    col(word('the parents', 'font-size:15px') + row(parents.map(parentCard).join(''), 10, 'align-items:stretch;flex:1 1 auto'), 2, cats ? 'align-items:flex-start' : 'align-items:flex-start;flex:1 1 auto;min-height:0'),
    box('dk-tile dk-tile--white', W, 'auto', col(word('the puppies', 'font-size:15px') + row(pups.map(pupCol).join(''), 8, 'align-items:flex-start'), 2), 'data-g3-dogs="1"', cats ? 'padding:4px 6px' : 'padding:4px 6px;flex:1 1 auto;min-height:0')];
  if (d.questions) { parts.push(frameTile([['Which traits came from the parents?', 330, '.']])); parts.push(whiteBand(row(text('Are all the puppies the same?') + one('same', ['yes', 'no'], 'no', 15), 12), 'data-g3-same="1"', 'padding:6px 0')); }
  if (cats) {
    const CT = { fur: ['gray', 'brown'], paws: ['yes', 'no'] }, CN = { fur: 'fur color', paws: 'white paws' };
    const catCol = (c) => col(art(cat(c, 72)) + word(c.label, 'font-size:13px') + ['fur', 'paws'].map((k) => col(small(CN[k], 140) + one('cat-' + c.id + ':' + k, CT[k], c[k], 12, 3), 0)).join(''), 1, 'width:158px');
    parts.push(whiteBand(col(row(B.CATS.map(catCol).join(''), 6, 'align-items:flex-start') + note(B.CAT_FATHER, 600, 13), 2), 'data-g3-cats="1"', 'padding:4px 4px'));
    parts.push(frames([['The kittens are not all the same. For example,', 250, '.'], ['This is called variation. It matters because', 240, '.']], 36));
  }
  return { html: grow(parts.join(''), 'gap:8px'), meta: { traits: keys } };
};

/* ---------------------------------------------------------------- G3-596 traits the environment changes */
MODES['g3-env-traits'] = function envTraits(d, rng) {
  const P = B.TRAITS.filter((t) => t.from === 'parents'), E = B.TRAITS.filter((t) => t.from === 'environment');
  const pick = d.traits === 4 ? [...rng.sample(P, 2), ...rng.sample(E, 2)] : B.TRAITS.slice();
  const order = fairOrder(rng, pick, (t) => t.from === 'parents');
  const plants = row(B.BEAN_PLANTS.map((p) => box('dk-tile dk-tile--white', 210, 'auto', col(art(beanPlant(p, 150)) + word(p.label, 'font-size:14px') + note(`${p.inches} inches tall, ${p.leaves} leaves`, 190, 13), 2), `data-g3-plant="${p.id}"`, 'padding:4px')).join('') +
    box('dk-tile dk-tile--white', 230, 'auto', col(word('Max the dog', 'font-size:15px') + para(B.DOG_TEXT, 210, 13), 4, 'align-items:flex-start'), 'data-g3-dogtext="1"', 'padding:6px 8px'), 10, 'align-items:stretch');
  const intro = whiteBand(col(note('Both bean plants are the same kind, grown from seeds of the same plant.', 640, 13) + plants, 4), 'data-g3-evidence="1"', 'padding:4px');
  const bins = row([['parents', 'a trait from the parents'], ['environment', 'a trait changed by the environment']].map(([k, l]) => box('dk-draw', (W - 14) / 2, 'auto', `<span class="dk-head" style="position:absolute;left:10px;top:4px;font-size:16px">${l}</span>`, `data-g2-bin="${k}"`, 'flex:1 1 0;min-height:' + (d.traits === 8 ? 160 : 120) + 'px')).join(''), 14, 'flex:1 1 auto;align-items:stretch;min-height:0');
  const cw = d.traits === 4 ? 160 : 165, per = 4;
  const cards = strip(order.map((t) => G2.cut(cw, 64, note(t.label, cw - 10, 13), `data-g2-card="${t.id}" data-dk-answer="${t.from}"`)), per);
  const parts = [intro, bins, cards];
  if (d.frame) parts.push(frames([['Both bean plants grew from the same kind of seed, but', 200], [560, '.'], ['This shows that the environment can change', 230, '.']], 40));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { cards: order.map((t) => t.from + ':' + t.id) } };
};

/* ---------------------------------------------------------------- G3-597 animals in groups */
MODES['g3-group-living'] = function groupLiving(d, rng) {
  const two = d.animals === 2;
  const pick = two ? [B.GROUP_ANIMALS[0], B.GROUP_ANIMALS[2]] : B.GROUP_ANIMALS.slice();
  const order = rng.shuffle(pick);
  const cards = order.map((a) => band(row(col(itemArt(a, two ? 110 : 74) + word(a.label, 'font-size:14px'), 2, 'width:120px') +
    col(para(a.text, 330, two ? 15 : 14) + small('How the group works:', 330) + lineBox(330, 32) + (two ? lineBox(330, 32) : ''), 2, 'align-items:flex-start') +
    col(small('It helps them (circle all the text says):', 130) + some(a.id, B.GROUP_HELPS, a.helps, 13, 4, 'column'), 3), 10, 'justify-content:flex-start;align-items:center'), `data-g3-group="${a.id}" data-g3-sample="${esc(a.works)}"`, 'padding:4px 8px'));
  const parts = [grow(cards.join(''), 'gap:8px')];
  if (d.frame) parts.push(frames([['Claim: living in a group helps', 160, 'survive.'], ['Evidence 1:', 480, '.'], ['Evidence 2:', 480, '.']], 40));
  else parts.push(frameTile([['The', 140, 'live in a group because', 260, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: order.map((a) => a.helps.join('+') + ':' + a.id) } };
};

/* ---------------------------------------------------------------- G3-598 hide and survive: camouflage (record) */
MODES['g3-camouflage'] = function camouflage(d) {
  const colors = d.colors === 2 ? ['green', 'red'] : B.MOTH_COLORS.slice();
  const bgs = d.backgrounds === 1 ? [B.MOTH_BACKGROUNDS[1]] : B.MOTH_BACKGROUNDS.slice();
  const one1 = bgs.length === 1;
  const setup = whiteBand(para(`Put 10 paper moths of each color on ${one1 ? 'the green lawn' : 'a sheet of newspaper and 10 of each color on the green lawn'}. A "bird" picks up as many moths as it can in 30 seconds. Count the moths of each color that were found. The moths that were not found survived.`, 640, 14), 'data-g3-setup="1"', 'padding:4px 8px');
  const cols = [{ label: 'moth color', w: one1 ? 200 : 136 }].concat(...bgs.map((b) => [{ label: 'found on ' + b.label + ' (tally)', w: one1 ? 230 : 160 }, { label: 'total', w: one1 ? 90 : 64 }]));
  const rows = colors.map((c) => [row(art(moth(one1 ? 70 : d.graph ? 44 : 50, c)) + word(c, 'font-size:15px'), 6, 'justify-content:flex-start;width:' + (one1 ? 196 : 132) + 'px')].concat(...bgs.map(() => [box('dk-draw', one1 ? 210 : 150, one1 ? 60 : d.graph ? 32 : 38, '', 'data-g3-tally="1"'), numBox(54, one1 ? 44 : 34)])));
  const parts = [setup, table(cols, rows, one1 ? 90 : d.graph ? 40 : 46, 'data-g3-table="1"', 13, !d.graph)];
  // review round 1: about 5 mm a unit line; the graph counts moths FOUND, the sentence asks which SURVIVED: say how they relate
  if (d.graph) parts.push(whiteBand(row(barGraph3({ bars: [].concat(...bgs.map((b) => colors.map((c) => `${c} on ${b.id === 'news' ? 'paper' : 'lawn'}`))), lines: 10, per: 1, step: 2, unitH: 18, colW: 56, unit: 'moths found' }) + col(`<span class="g1-small" data-dk-box data-g3-oneline="1" style="width:auto;font-size:14px;line-height:17px;white-space:nowrap">survived = 10 \u2212 found</span>` + note('A short bar means many moths of that color survived.', 140, 12), 6), 6, 'align-items:center'), 'data-g2-graphband="1"', 'padding:4px 6px'));
  const f1 = one1 ? [['The', 90, 'moths survived best on the green lawn.'], ['I think this happened because', 380, '.']] : [['The', 90, 'moths survived best on the', 110, 'because'], [600, '.']];
  if (d.frame) parts.push(frames(f1.concat([['Moths of one kind can be different colors. This matters because'], [600, '.']]), 38));
  else parts.push(frameTile(f1));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, colors, backgrounds: bgs.map((b) => b.id) } };
};

/* ---------------------------------------------------------------- G3-599 survive well, less well or not at all */
MODES['g3-survive-sort'] = function surviveSort(d, rng) {
  const by = (c) => B.DESERT_CARDS.filter((x) => x.col === c);
  const L1 = d.cards === 5;
  const pick = L1 ? [...rng.sample(by('well'), 2), rng.pick(by('less')), ...rng.sample(by('not'), 2)] : B.DESERT_CARDS.slice();
  // a plain shuffle, refusing only an order with every column in one block (refusing any two neighbours of one column
  // biased the places: the gate found "less" in the middle a third of the time)
  const blocks = (o) => o.every((c, i) => i === 0 || c.col === o[i - 1].col || !o.slice(0, i).some((x) => x.col === c.col));
  // Level 1 (2 well, 1 less, 2 not): the refused block orders put the lone "less" card only at places 1, 3 and 5, so the
  // kept orders favour places 2 and 4 (25% each against 20%). Keeping an order with it at 2 or 4 two times in three
  // makes every place exactly fair (worked out over all 120 orders: each column 40 / 20 / 40% at every place).
  const lone = (o) => { const i = o.findIndex((c) => c.col === 'less'); return L1 && (i === 1 || i === 3); };
  let order; for (let t = 0; t < 400; t++) { order = rng.shuffle(pick); if (!blocks(order) && !(lone(order) && rng.next() >= 2 / 3)) break; }
  const hab = whiteBand(row(art(svg(d.frame ? 100 : 120, d.frame ? 60 : 72, `<rect x="0" y="0" width="120" height="72" fill="${T.cream}"/><circle cx="100" cy="16" r="10" fill="${CC.codeYellow}" stroke="${CC.codeBrown}" stroke-width="1.5"/><path d="M0 56 Q32 42 64 53 Q88 45 120 51 V72 H0 Z" fill="${T.creamDeep}" stroke="${CC.codeBrown}" stroke-width="2"/><ellipse cx="34" cy="62" rx="9" ry="3" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.5"/>`, 'data-g3-desert="1"', '0 0 120 72')) + para(B.DESERT, 520, d.frame ? 14 : 15), 10), 'data-g3-habitat="1"', 'padding:4px 8px');
  // review round 1: every column holds ALL its cards side by side or stacked, the need text uncovered (the gate measures
  // the glue area of each column against the cards stamped for it)
  const cw = L1 ? 126 : 158, ch = L1 ? 120 : 92, most = Math.max(...['well', 'less', 'not'].map((k) => order.filter((c) => c.col === k).length));
  const colW = (W - 20) / 3, head = 22, foot = 44, minH = head + most * (ch + 2) + foot;
  const bins = row(['well', 'less', 'not'].map((k) => box('dk-draw', colW, 'auto', `<span class="dk-head" style="position:absolute;left:8px;top:4px;font-size:15px">${B.SURVIVE_COLS[k]}</span>` +
    `<div data-g3-glue="${k}" style="position:absolute;left:6px;right:6px;top:${head}px;bottom:${foot}px"></div>` +
    `<div style="position:absolute;left:8px;right:8px;bottom:6px">${small('because', colW - 20)}${lineBox(colW - 20, 28)}</div>`, `data-g2-bin="${k}"`, `flex:1 1 0;min-height:${minH}px`)).join(''), 10, 'flex:1 1 auto;align-items:stretch;min-height:0');
  const card = (c) => G2.cut(cw, ch, col(itemArt(c, L1 ? 44 : 30) + word(c.label, `font-size:${L1 ? 13 : 12}px;line-height:14px`) + note(c.needs, cw - 10, 11), 1), `data-g2-card="${c.id}" data-dk-answer="${c.col}"`);
  const cards = strip(order.map(card), L1 ? 5 : 4);
  const parts = [hab, bins, cards];
  if (d.frame) parts.push(frames([['The', 110, 'survives well because', 300, '.'], ['The', 110, 'cannot survive because', 290, '.']], 32));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { cards: order.map((c) => c.col + ':' + c.id) } };
};

/* ---------------------------------------------------------------- G3-600 fossils tell about long ago */
MODES['g3-fossils'] = function fossils(d, rng) {
  const pick = d.fossils === 2 ? [B.FOSSILS[0], B.FOSSILS[1]] : B.FOSSILS.slice();
  const order = rng.shuffle(pick);
  const big = d.fossils === 2;
  const cols = [{ label: 'the fossil', w: 190 }, { label: 'what lived here', w: 150 }, { label: 'what the place was like then', w: 160 }, { label: 'what it is like now', w: 150 }];
  const opts = (all, right) => { const o = rng.shuffle(all.filter((x) => x !== right)).slice(0, 2); o.splice(rng.int(0, 2), 0, right); return o; };
  const two = (w) => col(lineBox(w, 36) + lineBox(w, 36), 0);
  const rows = order.map((f) => [`<div data-g3-fossilrow="${f.id}"${d.circle ? '' : ` data-g3-sample="${esc(f.lived + ' | ' + f.then + ' | ' + f.now)}"`}>` + col(art(fossil(f.draw, big ? 130 : 84)) + note(f.label, 180, big ? 14 : 12), 2) + '</div>',
    d.circle ? one(f.id + ':lived', opts(B.FOSSIL_LIVED, f.lived), f.lived, 13, 4, 'column') : two(140),
    d.circle ? one(f.id + ':then', opts(B.FOSSIL_THEN, f.then), f.then, 13, 4, 'column') : two(150),
    d.circle ? `<div data-g3-now="${f.id}">${word(f.now, 'font-size:14px;white-space:normal;width:140px')}</div>` : two(140)]);
  const parts = [whiteBand(para(d.circle ? 'Look at each fossil and where it was found. Circle what kind of living thing it was and what the place was like long ago.' : 'Look at each fossil and where it was found. Write what kind of living thing it was, what the place was like long ago, and what it is like now.', 640, 14), 'data-g3-tip="1"', 'padding:4px 8px'),
    table(cols, rows, big ? 200 : 110, 'data-g3-table="1"', 13, true)];
  if (d.frame) parts.push(frames([['Fossils show that places change. For example,'], [600, '.'], [600, '.']], 38));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: order.map((f) => f.lived + '/' + f.then + ':' + f.id) } };
};

/* ---------------------------------------------------------------- G3-601 when a habitat changes */
MODES['g3-habitat-change'] = function habitatChange(d) {
  const sol = d.solutions === 1 ? [B.SOLUTIONS3[0]] : B.SOLUTIONS3.slice();
  const text0 = whiteBand(para(B.CHANGE_TEXT, 640, 15), 'data-g3-change="1"', 'padding:6px 10px');
  const one1 = sol.length === 1, cw = one1 ? 420 : (W - 12) / 2, pw = one1 ? 300 : d.frame ? 190 : 230;
  const cards = row(sol.map((s, i) => box('dk-tile dk-tile--white', cw, 'auto', col(word('solution ' + (i + 1), 'font-size:15px') + art(scene(s.draw, pw, pw * 100 / 120)) + note(s.label, cw - 16, 13), 2), `data-g3-solution="${s.id}"`, 'padding:4px')).join(''), 12, 'align-items:stretch');
  const parts = [text0, cards];
  if (d.circle) {
    const Q = [['Can the animals cross without meeting cars?', ['yes', 'no'], 'yes'], ['Do the animals still have to walk on the road?', ['yes', 'no'], 'no'], ['Can the animals on one side reach the pond?', ['yes', 'no'], 'yes'], ['Does building it cost money?', ['yes', 'no'], 'yes']];
    parts.push(whiteBand(col(Q.map(([q, o, r], i) => row(`<div style="width:420px">${text(q, 'font-size:16px;white-space:normal')}</div>` + one('q' + i, o, r, 15), 10, 'justify-content:flex-start')).join(''), 8, 'align-items:flex-start'), 'data-g3-questions="1"', 'padding:6px 14px'));
    parts.push(frameTile([['I think the bridge is a good solution because'], [600, '.']]));
  } else {
    const cols = [{ label: '', w: 110 }, { label: 'how it helps the animals', w: 270 }, { label: 'what it costs or limits', w: 270 }];
    const rows = sol.map((s, i) => [`<div data-g3-solrow="${s.id}" data-g3-sample="${esc('helps: ' + s.helps + ' | costs: ' + s.costs)}">` + word('solution ' + (i + 1), 'font-size:15px') + '</div>', col(lineBox(250, 36) + lineBox(250, 36), 0), col(lineBox(250, 36) + lineBox(250, 36), 0)]);
    parts.push(table(cols, rows, 80, 'data-g3-table="1"', 14, true));
  }
  if (d.frame) parts.push(frames([['Claim: the better solution is', 160, '.'], ['Evidence:', 500, '.'], ['A limit of my choice:', 410, '.']], 40));
  else if (!d.circle) parts.push(frameTile([['I think solution', 50, 'is better because', 320, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { solutions: sol.map((s) => s.id) } };
};

/* ================================================================ the type */
function makeG3Type({ id, slug, mode, exerciseType, difficulty, i18n }) {
  if (!MODES[mode]) throw new Error('dk-g3: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G3', assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    difficulty,
    i18n,
    dkMode: mode,
    build({ difficulty: lv, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the Batch 3 pages are English (no ${locale} bank)`);
      const d = this.difficulty[lv] || this.difficulty[2];
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${DK.CSS}${G2.G2CSS}</style><div class="dk-root" data-ws-content data-dk="${mode}" data-dk-level="${lv}" data-dk-record="${out.meta.record ? 1 : 0}">${out.html}</div>`,
        meta: { mode, level: Number(lv), ...out.meta },
      };
    },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(G1.g1VerifyInPage), await page.evaluate(G2.g2VerifyInPage), await page.evaluate(g3VerifyInPage));
    },
  };
}

/** the Batch 3 page checks (in page.evaluate): a "some" group has at least one right chip and one wrong; a drawn dog or
 *  cat shows the traits its stamp names; a bean plant shows the leaves its label counts; a map dot sits on the map; a
 *  prefilled bar is the height its line count says */
function g3VerifyInPage() {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no dk root'];
  R.querySelectorAll('[data-g3-some]').forEach((g) => { const a = [...g.querySelectorAll('[data-dk-answer]')].map((e) => e.dataset.dkAnswer); if (!a.includes('right') || !a.includes('no')) f.push(`${g.dataset.dkItem}: a circle-all group with ${a.filter((x) => x === 'right').length} right of ${a.length}`); });
  R.querySelectorAll('[data-g3-dog]').forEach((g) => { const ears = g.querySelector('[data-g3-ear]'); if (!ears || ears.dataset.g3Ear !== g.dataset.g3Ears) f.push(`dog ${g.dataset.g3Dog}: the ears drawn are not ${g.dataset.g3Ears}`); const sp = g.querySelectorAll('[data-g3-spot]').length; if ((sp > 0) !== (g.dataset.g3Spots === 'yes')) f.push(`dog ${g.dataset.g3Dog}: spots drawn ${sp} (stamp ${g.dataset.g3Spots})`); });
  R.querySelectorAll('[data-g3-cat]').forEach((g) => { const p = [...g.querySelectorAll('[data-g3-paw]')].map((e) => e.dataset.g3Paw); if (p.length !== 2 || p.some((x) => x !== (g.dataset.g3Paws === 'yes' ? 'white' : 'fur'))) f.push(`cat ${g.dataset.g3Cat}: paws drawn ${p.join('/')} (stamp ${g.dataset.g3Paws})`); });
  R.querySelectorAll('[data-g3-bean]').forEach((g) => { const n = g.querySelectorAll('[data-g3-leaf]').length; if (n !== Number(g.dataset.g3Leaves)) f.push(`bean plant ${g.dataset.g3Bean}: ${n} leaves drawn, ${g.dataset.g3Leaves} printed`); });
  const map = R.querySelector('[data-lcs-prim="world-map"]');
  if (map) { const m = map.getBoundingClientRect(); R.querySelectorAll('[data-g3-dot]').forEach((dt) => { const q = dt.getBoundingClientRect(); if (q.left < m.left || q.right > m.right || q.top < m.top || q.bottom > m.bottom) f.push(`map dot ${dt.dataset.g3Dot} runs off the map`); }); }
  // review round 1: a bar graph the child colours has its unit lines about 5 mm apart (18 CSS px = 4.8 mm at the PDF's 1:1 print)
  R.querySelectorAll('[data-g2-graph]').forEach((g) => { const ys = [...g.querySelectorAll('[data-g2-gridline]')].map((l) => [Number(l.dataset.g2Gridline), l.getBoundingClientRect().top]).sort((p, q) => p[0] - q[0]); let m = Infinity; for (let k = 1; k < ys.length; k++) m = Math.min(m, Math.abs(ys[k][1] - ys[k - 1][1])); if (ys.length > 1 && m < 17.5) f.push(`a bar graph with unit lines ${m.toFixed(1)} px apart (under 18 px, about 5 mm: too tight to colour)`); });
  // review round 1: every glue box holds ALL the cards that go in it, side by side or stacked, without covering their words
  // review round 2: a helper marked one-line (an expression) never wraps
  R.querySelectorAll('[data-g3-oneline]').forEach((e) => { const lh = parseFloat(getComputedStyle(e).lineHeight) || 17; if (e.getBoundingClientRect().height > lh * 1.5) f.push(`"${e.textContent}" wraps onto two lines`); });
  // review round 2: every cut-out card's words and picture clear its dashed cut line by at least 3 px on every side
  R.querySelectorAll('.dk-cut').forEach((c) => { const r = c.getBoundingClientRect(), cs = getComputedStyle(c), bl = parseFloat(cs.borderLeftWidth), bt = parseFloat(cs.borderTopWidth); const ins = { l: r.left + bl, t: r.top + bt, r: r.right - bl, b: r.bottom - bt }; let u = null; for (const e of c.querySelectorAll('span, img, svg, [data-dk-box]')) { if (e.closest('svg') && e.tagName !== 'svg') continue; const q = e.getBoundingClientRect(); if (q.width < 1 || q.height < 1) continue; let x0 = q.left, x1 = q.right; if (e.tagName === 'SPAN' && e.firstChild) { const rg = document.createRange(); rg.selectNodeContents(e); const rs = [...rg.getClientRects()]; if (rs.length) { x0 = Math.min(...rs.map((z) => z.left)); x1 = Math.max(...rs.map((z) => z.right)); } } u = u ? { l: Math.min(u.l, x0), t: Math.min(u.t, q.top), r: Math.max(u.r, x1), b: Math.max(u.b, q.bottom) } : { l: x0, t: q.top, r: x1, b: q.bottom }; } if (!u) return; const m = Math.min(u.l - ins.l, u.t - ins.t, ins.r - u.r, ins.b - u.b); if (m < 3) f.push(`a cut card (${c.dataset.g2Card || c.dataset.g3Food || 'card'}) whose content comes ${m.toFixed(1)} px from its cut line`); });
  R.querySelectorAll('[data-g2-bin]').forEach((b) => { const k = b.dataset.g2Bin, cards = [...R.querySelectorAll('[data-g2-card][data-dk-answer]')].filter((c) => c.dataset.dkAnswer === k); if (!cards.length) return; const area = (b.querySelector('[data-g3-glue]') || b).getBoundingClientRect(), lab = b.querySelector('[data-g3-glue]') ? null : b.querySelector('.dk-head, .g1-small'), top = lab ? lab.getBoundingClientRect().bottom - area.top + 2 : 0, c = cards[0].getBoundingClientRect(); const cap = Math.floor((area.width + 1) / c.width) * Math.floor((area.height - top + 1) / c.height); if (cap < cards.length) f.push(`the glue box "${k}" holds ${cap} of its ${cards.length} cards`); });
  R.querySelectorAll('[data-g3-slot]').forEach((s) => { const r = s.getBoundingClientRect(), p = s.parentElement.getBoundingClientRect(); if (r.left < p.left - 1 || r.right > p.right + 1 || r.top < p.top - 1 || r.bottom > p.bottom + 1) f.push(`life-cycle slot ${s.dataset.g3Slot} runs out of its ring`); });
  return f;
}

module.exports = { frames, makeG3Type, g3VerifyInPage, climateOf, mapPoint, MODES, para, note, one, some, rec, tick, table, growDraw, safety, strip, barGraph3, kid, grown, img, ground, scene, object, swatch, stage, itemArt, inchRuler, dog, cat, beanPlant, moth, fossil, forceArrow, SC, OBJ, PROB, CH, STAGE };
