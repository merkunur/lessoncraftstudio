/**
 * dk-g1.js — the Batch 1 Grade 1 science and health pages (Daily Teaching System, Stage D-5, 2026-11-23): the pages the
 * English Grade 1 year designs need (types G1-626 .. G1-652, one `mode` each; the health modes live in dk-g1-health.js,
 * which registers them in MODES). English only (another locale refuses, as the Batch K pages do). Themeless; PDF only.
 *
 * Built on the Batch K conventions: the Batch K CSS and page check (types/_shared/dk-kinder.js: the stack 620-740
 * measured on what is drawn, no blank band, no two boxes colliding, nothing out of its box, pictures loaded) and the
 * faceless figures of Batch K2 (types/_shared/dk-k2.js `fig`). Neither file is edited.
 *
 * Two kinds of page, as in Batch K:
 *   RECORD pages: the class does the investigation with real things (sound stations, cup telephones, the peep box, the
 *     light test, shadows through the day, the Moon journal, rafts ...); the page is where the child records THAT
 *     investigation, so it holds no answer and nothing on it suggests one.
 *   CLOSED items (the mirror turn, the shadow match, the parent that never cares, the animal-part match, the parent and
 *     young clues, ask first, MyPlate, the helpers, the friendly reminder, the step orders): ONE right answer each, held
 *     by data/science/dk-g1.js, stamped on the page (data-dk-answer, never printed) and re-derived by the gate
 *     qa/verify-dk-g1.js from its own tables; where it sits comes from the seeded rng and is checked for tells over 400
 *     seeds (never always first, last or biggest; no pattern; the bins never line up with the answers).
 *
 * Grade 1 reads a little: the teacher reads the instruction (a level prints its own, i18n/level-instructions.json);
 * labels and short sentences are printed; Levels 2 and 3 may carry a word bank and a sentence frame on a writing row.
 * Numbers stay within 120; counting never starts at 0.
 *
 * Pictures: colour library pictures only (cache/themes-512), never black-and-white; the earth-and-space and habit pages
 * use only their families' drawn primitives (sky-bodies, moon-phase, habit-pictogram), never library art beside them;
 * everything else drawn is a simple shape (boxes, cups, swatches, a mirror line, a flashlight, a keypad, windows).
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const { writingRow, strokeWordLane } = require('../../primitives/trace-path.js');
const { sunDisc, moonDisc } = require('../../primitives/sky-bodies.js');
const { moonPhase } = require('../../primitives/moon-phase.js');
const { plantStage, plantFigure } = require('../../primitives/plant-figure.js');
const PM = require('../../lib/picture-masks.js');
const DK = require('./dk-kinder.js');
const K2 = require('./dk-k2.js');
const B = require('../../data/science/dk-g1.js');

const T = TOK.color;
const W = 675;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const { placesFor, patterned, derange, validOrderCount } = DK;

/* ================================================================ the layout kit (the Batch K conventions) */
const G1CSS = `
.g1-chip{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:2px 11px;font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;line-height:20px;color:${T.teal};white-space:nowrap}
.g1-text{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
.g1-small{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:14px;line-height:17px;color:${T.ink};text-align:center}
.g1-bubble{position:relative;display:inline-block;box-sizing:border-box;background:#FFFFFF;border:2.5px solid ${T.teal};border-radius:16px;padding:5px 12px;font-family:'Baloo 2',cursive;font-weight:700;font-size:17px;line-height:21px;color:${T.ink};white-space:nowrap}
`;
const pic = (p, px, extra = '') => `<img class="ws-icon" data-dk-pic="${esc(p.theme + '/' + p.noun)}" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${px}px;height:${px}px;display:block;object-fit:contain"${extra}>`;
const svgPic = (p, x, y, w, h, align = 'xMidYMax') => `<image href="${fileUri(p.theme, p.noun)}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" preserveAspectRatio="${align} meet" data-dk-pic="${esc(p.theme + '/' + p.noun)}"/>`;
const box = (cls, w, h, inner, attrs = '', style = '') => `<div class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''} style="flex-shrink:0;width:${typeof w === 'number' ? w + 'px' : w};height:${typeof h === 'number' ? h + 'px' : h};${style}">${inner}</div>`;
const tile = (inner, w, h, attrs = '', mod = '', style = '') => box('dk-tile' + (mod ? ' dk-tile--' + mod : ''), w, h, inner, attrs, style);
const drawBox = (w, h, attrs = '', inner = '') => box('dk-draw', w, h, inner, 'data-dk-draw' + (attrs ? ' ' + attrs : ''));
/** a draw box with its label printed inside (top-left), `size` the label's px */
const labelledDraw = (w, h, label, attrs = '', extra = '', size = 19) => drawBox(w, h, attrs, `<span class="dk-head" style="position:absolute;left:12px;top:6px;font-size:${size}px;line-height:${size + 4}px">${esc(label)}</span>${extra}`);
const pill = (text, attrs = '') => `<span class="dk-pill" data-dk-box${attrs ? ' ' + attrs : ''}>${esc(text)}</span>`;
const chip = (text, attrs = '', style = '') => `<span class="g1-chip" data-dk-box${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(text)}</span>`;
const word = (text, style = '') => `<span class="dk-word" data-dk-box${style ? ` style="${style}"` : ''}>${esc(text)}</span>`;
const small = (text, w) => `<span class="g1-small" data-dk-box style="width:${w}px">${esc(text)}</span>`;
const text = (t, style = '') => `<span class="g1-text" data-dk-box${style ? ` style="${style}"` : ''}>${esc(t)}</span>`;
const head = (t, style = '') => `<span class="dk-head" data-dk-box${style ? ` style="${style}"` : ''}>${esc(t)}</span>`;
const col = (inner, gap = 6, extra = '') => `<div style="display:flex;flex-direction:column;align-items:center;gap:${gap}px;${extra}">${inner}</div>`;
const row = (inner, gap = 12, extra = '') => `<div class="dk-row" style="gap:${gap}px;${extra}">${inner}</div>`;
const grow = (inner, extra = '') => `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;${extra}">${inner}</div>`;
const svg = (w, h, body, attrs = '', vb = null) => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="${vb || `0 0 ${f1(w)} ${f1(h)}`}" style="display:block;overflow:visible"${attrs ? ' ' + attrs : ''}>${body}</svg>`;
/** a drawing in a box every check sees (the svg wrapped in a marked div) */
const art = (s, attrs = '') => `<div data-dk-box${attrs ? ' ' + attrs : ''} style="line-height:0;flex-shrink:0">${s}</div>`;
const band = (inner, attrs = '', style = '') => box('dk-tile', W, 'auto', inner, attrs, `flex:1 1 0;min-height:0;${style}`);
const whiteBand = (inner, attrs = '', style = '') => box('dk-tile dk-tile--white', W, 'auto', inner, attrs, style);
const arrow = (x1, y1, x2, y2, o = {}) => DK_ARROW(x1, y1, x2, y2, o);
function DK_ARROW(x1, y1, x2, y2, { stroke = T.ink, sw = 4, head = 12, dash = null, attrs = '' } = {}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - Math.cos(a) * head, by = y2 - Math.sin(a) * head;
  const nx = -Math.sin(a) * head * 0.6, ny = Math.cos(a) * head * 0.6;
  return `<g${attrs ? ' ' + attrs : ''}><line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(bx)}" y2="${f1(by)}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<polygon points="${f1(x2)},${f1(y2)} ${f1(bx + nx)},${f1(by + ny)} ${f1(bx - nx)},${f1(by - ny)}" fill="${stroke}"/></g>`;
}
/** a Grade 1 writing row (school ruling); `trace` = words printed dashed to trace */
function writeRow(w, h, trace) {
  if (trace) return strokeWordLane({ text: trace, w, h, glyphH: Math.round(h * 0.56), reps: 1, stack: true, modelless: true, padLeft: 14 }).svg.replace('<svg ', '<svg data-dk-writerow="1" ');
  return writingRow({ w, h, glyphH: Math.round(h * 0.56), xHeight: true }).svg.replace('<svg ', '<svg data-dk-writerow="1" ');
}
const lineBox = (w, h = 50, attrs = '') => `<div data-dk-box data-dk-blank="1"${attrs ? ' ' + attrs : ''} style="line-height:0;flex-shrink:0">${writeRow(w, h)}</div>`;
/**
 * A sentence frame on ONE writing line: parts = ['The sound came when the', 230, 'shook.'] (a number = a blank of that
 * width, the child writes on the ruling). The printed words sit on the line's baseline.
 */
function frameLine(parts, h = 50) {
  return `<div class="dk-row"${parts.some((p) => typeof p === 'number') ? ' data-g1-frame="1"' : ''} style="gap:6px;align-items:flex-end;justify-content:flex-start">` +
    parts.map((p) => (typeof p === 'number' ? lineBox(p, h) : `<span class="g1-text" data-dk-box style="padding-bottom:${Math.round(h * 0.18) - 4}px">${esc(p)}</span>`)).join('') + '</div>';
}
/** a white tile holding sentence frames (one per line) */
const frameTile = (lines, attrs = '', w = W) => box('dk-tile dk-tile--white', w, 'auto', col(lines.map((l) => frameLine(l)).join(''), 4, 'align-items:flex-start'), 'data-g1-frames="1"' + (attrs ? ' ' + attrs : ''), 'padding:6px 14px;justify-content:flex-start');
const numBox = (w = 64, h = 50, attrs = '') => box('ws-blankbox', w, h, '', 'data-dk-numbox' + (attrs ? ' ' + attrs : ''), 'display:block');
/** a sun to color (drawn outline, never a library sun with a face) */
function sunToColor(px, attrs = '') {
  const c = px / 2, r = px * 0.24;
  let s = `<circle cx="${f1(c)}" cy="${f1(c)}" r="${f1(r)}" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2.2"/>`;
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; s += `<line x1="${f1(c + Math.cos(a) * r * 1.35)}" y1="${f1(c + Math.sin(a) * r * 1.35)}" x2="${f1(c + Math.cos(a) * r * 1.9)}" y2="${f1(c + Math.sin(a) * r * 1.9)}" stroke="${T.ink}" stroke-width="2.2" stroke-linecap="round"/>`; }
  return art(svg(px, px, s, 'data-g1-sun="1"'), attrs);
}
/** a five-point star (outline to color, or filled) */
function starPath(cx, cy, r, fill = '#FFFFFF', stroke = T.ink, sw = 2.2) {
  const pts = [];
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; pts.push(`${f1(cx + Math.cos(a) * rr)},${f1(cy + Math.sin(a) * rr)}`); }
  return `<polygon points="${pts.join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;
}
/** a flashlight drawn at (x, y) (the lens), shining along `deg` (0 = right) */
function flashlight(x, y, deg, s = 1, attrs = '') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(deg)}) scale(${f1(s)})"${attrs ? ' ' + attrs : ''} data-g1-flashlight="1">` +
    `<rect x="-46" y="-8" width="34" height="16" rx="4" fill="${T.inkSoft}" stroke="${T.ink}" stroke-width="2"/>` +
    `<path d="M-13 -8 L0 -14 L0 14 L-13 8 Z" fill="${T.creamDeep}" stroke="${T.ink}" stroke-width="2" stroke-linejoin="round"/>` +
    `<line x1="0" y1="-12" x2="0" y2="12" stroke="${T.coral}" stroke-width="3"/></g>`;
}

/* ================================================================ drawn station and test art (simple shapes) */
function bandBoxArt(px) {
  const s = `<path d="M10 46 L28 28 L116 28 L98 46 Z" fill="${T.inkSoft}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M98 46 L116 28 L116 76 L98 94 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<rect x="10" y="46" width="88" height="48" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5"/>` +
    [30, 52, 74].map((x) => `<path d="M${x} 62 L${x} 46 L${x + 18} 28" fill="none" stroke="${T.coral}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
  return svg(px, px * 100 / 124, s, 'data-g1-drawn="band-box"', '0 0 124 100');
}
function rulerDeskArt(px) {
  let s = `<rect x="4" y="54" width="74" height="12" rx="2" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5"/>` +
    `<rect x="10" y="66" width="8" height="32" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/><rect x="62" y="66" width="8" height="32" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/>` +
    `<rect x="38" y="44" width="82" height="10" rx="1.5" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2"/>`;
  for (let x = 44; x < 118; x += 7) s += `<line x1="${x}" y1="44" x2="${x}" y2="${x % 14 === 2 ? 50 : 48}" stroke="${T.ink}" stroke-width="1.2"/>`;
  return svg(px, px * 100 / 124, s, 'data-g1-drawn="ruler-desk"', '0 0 124 100');
}
/** a child humming with a hand on the throat (Batch K2 faceless figure), a music note by the mouth */
function humArt(px) {
  const f0 = K2.fig({ x: 50, y: 96, s: 0.9 });
  const at = f0.at(61, 29);
  const f = K2.fig({ x: 50, y: 96, s: 0.9, near: f0.reach(at[0], at[1], -4) });
  const note = `<g data-g1-note="1"><ellipse cx="86" cy="34" rx="6" ry="4.5" fill="${T.teal}" transform="rotate(-20 86 34)"/><line x1="91" y1="32" x2="91" y2="10" stroke="${T.teal}" stroke-width="2.5"/><path d="M91 10 Q101 14 99 24" fill="none" stroke="${T.teal}" stroke-width="2.5"/></g>`;
  return svg(px, px * 100 / 124, f.svg + note, 'data-g1-drawn="hum"', '0 0 124 100');
}
function forkWaterArt(px) {
  const s = `<path d="M50 40 L56 96 L100 96 L106 40" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M52.5 62 L56 96 L100 96 L103.5 62 Z" fill="${T.tealSoft}"/><line x1="52.5" y1="62" x2="103.5" y2="62" stroke="${T.teal}" stroke-width="1.8"/>` +
    `<path d="M68 72 L68 30 Q68 22 78 22 Q88 22 88 30 L88 72" fill="none" stroke="${T.inkSoft}" stroke-width="5" stroke-linecap="round"/>` +
    `<line x1="78" y1="22" x2="78" y2="2" stroke="${T.inkSoft}" stroke-width="5" stroke-linecap="round"/>`;
  return svg(px, px * 100 / 124, s, 'data-g1-drawn="fork-water"', '0 0 124 100');
}
function speakerArt(px, hand) {
  const s = `<rect x="14" y="10" width="54" height="86" rx="6" fill="${T.ink}" stroke="${T.ink}" stroke-width="2"/>` +
    `<circle cx="41" cy="32" r="9" fill="${T.inkSoft}" stroke="#FFFFFF" stroke-width="2"/><circle cx="41" cy="68" r="17" fill="${T.inkSoft}" stroke="#FFFFFF" stroke-width="2.5"/><circle cx="41" cy="68" r="5" fill="#FFFFFF"/>` +
    svgPic(hand, 60, 26, 58, 64, 'xMinYMid');
  return svg(px, px * 100 / 124, s, 'data-g1-drawn="speaker"', '0 0 124 100');
}
/** a cup lying on its side, its mouth facing `dir` (-1 left, 1 right) at (x, y) */
function sideCup(x, y, dir, fill = '#FFFFFF') {
  const m = dir;   // the mouth side: an open ellipse (the cup's opening) so it reads as a cup lying down
  return `<path d="M${f1(x)} ${f1(y - 11)} L${f1(x + m * 26)} ${f1(y - 18)} L${f1(x + m * 26)} ${f1(y + 18)} L${f1(x)} ${f1(y + 11)} Z" fill="${fill}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<ellipse cx="${f1(x + m * 26)}" cy="${f1(y)}" rx="6" ry="18" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/>`;
}
/** the cup-telephone test pictures: tight, loose, touching a chair (the string rests on the top of the chair's back) */
function phoneArt(kind, w, h) {
  const y = kind === 'chair' ? 24 : kind === 'loose' ? Math.min(40, h * 0.3) : h / 2, xl = 40, xr = w - 40;
  let s = sideCup(xl, y, -1) + sideCup(xr, y, 1);
  if (kind === 'tight') s += `<line x1="${xl}" y1="${f1(y)}" x2="${xr}" y2="${f1(y)}" stroke="${T.ink}" stroke-width="2.2"/>`;
  else if (kind === 'loose') s += `<path d="M${xl} ${f1(y)} Q${f1(w / 2)} ${f1(h + 26)} ${xr} ${f1(y)}" fill="none" stroke="${T.ink}" stroke-width="2.2"/>`;
  else {
    const ch = h - y + 6;
    s += svgPic(B.PHONE_TESTS[2].pic, w / 2 - ch / 2, y - 6, ch, ch, 'xMidYMin');
    s += `<path d="M${xl} ${f1(y)} L${f1(w / 2 - 14)} ${f1(y - 2)} L${f1(w / 2 + 14)} ${f1(y - 2)} L${xr} ${f1(y)}" fill="none" stroke="${T.ink}" stroke-width="2.2"/>`;
  }
  return svg(w, h, s, `data-g1-phone="${kind}"`);
}
function planArt(kind, px) {
  let s;
  if (kind === 'cup' || kind === 'cup2') s = `<path d="M18 14 L26 62 L54 62 L62 14 Z" fill="${kind === 'cup' ? '#FFFFFF' : T.tealSoft}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/>` + (kind === 'cup' ? `<path d="M21 30 L59 30" stroke="${T.coral}" stroke-width="3"/>` : `<path d="M30 20 L33 54" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`);
  else if (kind === 'string') s = `<path d="M6 54 C 20 20, 30 64, 44 34 S 66 18, 74 26" fill="none" stroke="${T.ink}" stroke-width="2"/>`;
  else s = `<circle cx="36" cy="40" r="22" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2.5"/>` + [[-14, 8], [-6, 18], [4, 22]].map(([a, b]) => `<path d="M${36 + a} ${18 + b / 3} Q${40 + b / 2} ${40} ${36 + a / 2} ${60}" fill="none" stroke="${T.coral}" stroke-width="2"/>`).join('') + `<path d="M56 50 Q68 60 74 50" fill="none" stroke="${T.coral}" stroke-width="2.5"/>`;
  return svg(px, px, s, `data-g1-plan="${kind}"`, '0 0 80 80');
}
/** a shoebox seen from the front and a little above, a peephole in its front, a window in its lid (closed or open);
 *  a flashlight shines on the lid */
function peepBoxArt(open, w) {
  const h = w * 0.74;
  let s = `<path d="M20 92 L50 62 L196 62 L166 92 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<path d="M166 92 L196 62 L196 146 L166 176 Z" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<rect x="20" y="92" width="146" height="84" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5"/>` +
    `<circle cx="62" cy="134" r="8" fill="${T.ink}" data-g1-peephole="1"/>` + arrow(4, 156, 50, 141, { sw: 3, head: 9, stroke: T.coral });
  const win = 'M104 84 L120 68 L156 68 L140 84 Z';
  s += flashlight(128, 22, 90, 0.9);
  if (open) {
    s += `<path d="${win}" fill="${T.ink}"/>` +
      `<path d="M120 68 L156 68 L160 30 L124 30 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round" data-g1-flap="open"/>` +
      [[118, 78], [128, 80], [138, 78]].map(([x, y]) => `<line x1="128" y1="36" x2="${x}" y2="${y}" stroke="${T.coral}" stroke-width="2.5" stroke-dasharray="5 4"/>`).join('');
  } else {
    // the rays stop ON the shut flap (they end at its top edge) and bounce off (small marks): none enters the box
    s += `<path d="${win}" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round" data-g1-flap="closed"/>` +
      [[118, 62], [128, 62], [138, 62]].map(([x, y]) => `<line x1="128" y1="36" x2="${x}" y2="${y}" stroke="${T.coral}" stroke-width="2.5" stroke-dasharray="5 4" data-g1-ray="stopped"/><path d="M${x - 5} ${y - 4} L${x} ${y} L${x + 5} ${y - 4}" fill="none" stroke="${T.coral}" stroke-width="2" data-g1-bounce="1"/>`).join('');
  }
  return svg(w, h, s, `data-g1-peepbox="${open ? 'open' : 'closed'}"`, '0 0 210 180');
}
/** a light-test material swatch (no library picture shows these) */
function swatchArt(id, w = 66, h = 48) {
  let s = '';
  if (id === 'wax-paper') s = `<rect x="3" y="3" width="60" height="42" rx="2" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2"/><rect x="3" y="3" width="60" height="42" fill="${T.cream}" opacity=".8"/>` + [12, 26, 40].map((x) => `<line x1="${x}" y1="8" x2="${x + 12}" y2="40" stroke="${T.grid}" stroke-width="1.5"/>`).join('');
  else if (id === 'plastic-wrap') s = `<path d="M3 6 L60 3 L63 42 L6 45 Z" fill="${T.tealSoft}" fill-opacity=".45" stroke="${T.teal}" stroke-width="1.8" stroke-linejoin="round"/>` + `<path d="M14 12 L24 22 M40 10 L48 16 M30 30 L42 38" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><path d="M10 30 Q18 24 22 34" fill="none" stroke="${T.teal}" stroke-width="1.2"/>`;
  else if (id === 'cardboard') s = `<rect x="3" y="3" width="60" height="30" rx="2" fill="${T.creamDeep}" stroke="${T.inkSoft}" stroke-width="2"/>` +
    `<rect x="3" y="33" width="60" height="12" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2"/><path d="M3 39 q3 -6 6 0 t6 0 t6 0 t6 0 t6 0 t6 0 t6 0 t6 0 t6 0 t6 0" fill="none" stroke="${T.inkSoft}" stroke-width="1.6" data-g1-corrugated="1"/>`;
  else if (id === 'clear-cup') s = `<path d="M18 4 L24 44 L42 44 L48 4 Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.2" stroke-linejoin="round"/><path d="M25 10 L28 38" stroke="${T.tealSoft}" stroke-width="3" stroke-linecap="round"/>`;
  else if (id === 'cloth') s = `<path d="M4 6 Q18 2 32 5 Q44 8 48 4 L62 18 Q60 30 63 42 Q46 46 32 43 Q16 40 4 44 Q7 26 4 6 Z" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2" stroke-linejoin="round"/>` +
    `<path d="M48 4 L62 18 L50 16 Z" fill="#FFFFFF" stroke="${T.coral}" stroke-width="1.8" stroke-linejoin="round" data-g1-fold="1"/><path d="M14 16 Q24 22 22 34 M34 14 Q40 24 38 36" fill="none" stroke="${T.coral}" stroke-width="1.4"/>`;
  else if (id === 'foil') s = `<path d="M3 5 L22 3 L40 6 L63 3 L61 24 L63 44 L40 41 L20 45 L4 42 L6 22 Z" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="2" stroke-linejoin="round"/><path d="M14 10 L22 20 L16 32 M34 12 L44 22 L36 34 M50 14 L54 30" fill="none" stroke="#FFFFFF" stroke-width="2.2"/>`;
  return svg(w, h, s, `data-g1-swatch="${id}"`, '0 0 66 48');
}
/** the light icons: a flashlight shines at a card; all the light goes on past it, some (fainter), or none */
function lightIcon(kind, w = 92, h = 40) {
  let s = flashlight(20, 20, 0, 0.42) + `<path d="M22 14 L46 8 L46 32 L22 26 Z" fill="${T.coralSoft}"/>` +
    `<rect x="46" y="4" width="8" height="32" rx="1" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1.8"/>`;
  if (kind === 'all') s += `<path d="M54 8 L90 2 L90 38 L54 32 Z" fill="${T.coralSoft}"/>`;
  else if (kind === 'some') s += `<path d="M54 8 L90 2 L90 38 L54 32 Z" fill="${T.coralSoft}" opacity=".45"/>` + `<path d="M58 12 L86 8 M58 28 L86 32" stroke="${T.coral}" stroke-width="1.2" stroke-dasharray="3 3"/>`;
  return svg(w, h, s, `data-g1-lighticon="${kind}"`, '0 0 92 40');
}

/* ================================================================ the mirror (G1-631): the gate re-derives the turn */
/** a mirror line through (x, y), `turn` slash | backslash | upright, length L; the hatch marks on its back */
function mirrorAt(x, y, turn, L = 56, attrs = '', flipBack = false) {
  const v = turn === 'slash' ? [1, -1] : turn === 'backslash' ? [1, 1] : [0, 1];
  const n = Math.hypot(v[0], v[1]); const u = [v[0] / n, v[1] / n];
  // the hatched back faces AWAY from the light: light from the left -> the back to the right (`/` down-right, `\`
  // up-right); `flipBack` for a mirror the light reaches from below and leaves to the right (the second mirror of the
  // two-mirror room: its shiny face looks down-right, its back up-left)
  let back = turn === 'upright' ? [1, 0] : turn === 'slash' ? [Math.SQRT1_2, Math.SQRT1_2] : [Math.SQRT1_2, -Math.SQRT1_2];
  if (flipBack) back = [-back[0], -back[1]];
  const x1 = x - u[0] * L / 2, y1 = y - u[1] * L / 2, x2 = x + u[0] * L / 2, y2 = y + u[1] * L / 2;
  let s = `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${T.teal}" stroke-width="6" stroke-linecap="round"/>`;
  for (let k = 1; k < 6; k++) { const px = x1 + (x2 - x1) * k / 6, py = y1 + (y2 - y1) * k / 6; s += `<line x1="${f1(px + back[0] * 3)}" y1="${f1(py + back[1] * 3)}" x2="${f1(px + back[0] * 10 - u[0] * 5)}" y2="${f1(py + back[1] * 10 - u[1] * 5)}" stroke="${T.inkSoft}" stroke-width="2"/>`; }
  return `<g data-g1-mirror="${turn}"${attrs ? ' ' + attrs : ''}>${s}</g>`;
}
/** the light leaving a mirror: rightward light turned by `turn` -> the unit direction (page y grows down) */
function reflect(v, turn) {
  const m = turn === 'slash' ? [Math.SQRT1_2, -Math.SQRT1_2] : turn === 'backslash' ? [Math.SQRT1_2, Math.SQRT1_2] : [0, 1];
  const d = v[0] * m[0] + v[1] * m[1];
  return [Math.round(2 * d * m[0] - v[0]), Math.round(2 * d * m[1] - v[1])];
}

/* ================================================================ the sky (G1-634 .. G1-637): drawn bodies only */
function skyPanel(when, w, h, sun) {
  const gy = h - 46, cx = w / 2;
  let s = `<rect x="1" y="1" width="${f1(w - 2)}" height="${f1(h - 2)}" fill="#FFFFFF" stroke="${T.grid}" stroke-width="2"/>` +
    `<rect x="1" y="${f1(gy)}" width="${f1(w - 2)}" height="${f1(h - gy - 1)}" fill="${T.creamDeep}"/><line x1="1" y1="${f1(gy)}" x2="${f1(w - 1)}" y2="${f1(gy)}" stroke="${T.teal}" stroke-width="2.5"/>` +
    `<rect x="${f1(cx - 4)}" y="${f1(gy - 92)}" width="8" height="92" rx="2" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2" data-g1-stick="1"/>`;
  if (sun) {
    const d = 46, pos = { morning: [30, gy - 52], noon: [cx, 30], afternoon: [w - 30, gy - 52] }[when];
    s += `<g transform="translate(${f1(pos[0] - d / 2)} ${f1(pos[1] - d / 2)})" data-g1-sun-at="${when}">${sunDisc({ d }).svg}</g>`;
  }
  return svg(w, h, s, `data-g1-skypanel="${when}"`);
}
function windowArt(w, h) {
  // a window frame and its sill, no panes across it (the child draws the whole sky inside)
  const s = `<rect x="4" y="4" width="${f1(w - 8)}" height="${f1(h - 22)}" rx="8" fill="#FFFFFF" stroke="${T.teal}" stroke-width="6"/>` +
    `<rect x="12" y="12" width="${f1(w - 24)}" height="${f1(h - 38)}" rx="4" fill="none" stroke="${T.teal}" stroke-width="1.5"/>` +
    `<rect x="0" y="${f1(h - 18)}" width="${f1(w)}" height="16" rx="4" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5"/>`;
  return svg(w, h, s, 'data-g1-window="1"');
}

/* ================================================================ the rafts (G1-642, G1-643) */
function raftMaterialArt(id, px = 64) {
  let s = '';
  if (id === 'craft-sticks') s = [10, 24, 38].map((y) => `<rect x="6" y="${y}" width="52" height="9" rx="4.5" fill="${T.creamDeep}" stroke="${T.inkSoft}" stroke-width="1.8"/>`).join('');
  else if (id === 'foam-tray') s = `<path d="M4 22 L60 22 L54 44 L10 44 Z" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="2.2" stroke-linejoin="round"/><line x1="12" y1="28" x2="52" y2="28" stroke="${T.grid}" stroke-width="1.5"/>`;
  else if (id === 'corks') s = [[8, 16], [30, 34]].map(([x, y]) => `<rect x="${x}" y="${y}" width="22" height="16" rx="5" fill="${T.creamDeep}" stroke="${T.inkSoft}" stroke-width="2"/><ellipse cx="${x + 22}" cy="${y + 8}" rx="5" ry="8" fill="${T.cream}" stroke="${T.inkSoft}" stroke-width="2"/>` + [[0, -3], [1, 2], [-1, 4]].map(([dx, dy]) => `<circle cx="${x + 22 + dx}" cy="${y + 8 + dy}" r="0.9" fill="${T.inkSoft}"/>`).join('')).join('');
  else if (id === 'straws') s = [16, 30, 44].map((x) => `<rect x="${x}" y="6" width="7" height="48" rx="3" fill="#FFFFFF" stroke="${T.coral}" stroke-width="1.8"/><path d="M${x} 16 L${x + 7} 12 M${x} 28 L${x + 7} 24 M${x} 40 L${x + 7} 36" stroke="${T.coral}" stroke-width="2"/>`).join('');
  else if (id === 'tape') s = `<circle cx="32" cy="32" r="22" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2.5"/><circle cx="32" cy="32" r="10" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2"/>`;
  return svg(px, px, s, `data-g1-raftmat="${id}"`, '0 0 64 60');
}
function raftOutline(w, h) {
  // the raft seen from above, floating: water all round it (small waves), craft sticks side by side, two across
  let s = `<rect x="0" y="0" width="${f1(w)}" height="${f1(h)}" rx="14" fill="${T.tealSoft}" data-g1-water="1"/>` +
    [[30, 24], [w - 90, 30], [40, h - 22], [w - 120, h - 18], [w / 2 - 30, 16]].map(([x, y]) => `<path d="M${f1(x)} ${f1(y)} q10 -7 20 0 t20 0" fill="none" stroke="${T.teal}" stroke-width="2" stroke-linecap="round"/>`).join('');
  const n = 7, sw = (w - 40) / n;
  for (let k = 0; k < n; k++) s += `<rect x="${f1(20 + k * sw + 2)}" y="${f1(h * 0.22)}" width="${f1(sw - 4)}" height="${f1(h * 0.56)}" rx="${f1((sw - 4) / 2)}" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2"/>`;
  s += [0.32, 0.68].map((t) => `<rect x="10" y="${f1(h * t - 6)}" width="${f1(w - 20)}" height="12" rx="6" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2"/>`).join('');
  return svg(w, h, s, 'data-g1-raft="outline"');
}
const pennies = (n, d = 22) => svg(n * (d + 4), d + 4, Array.from({ length: n }, (_, k) => `<circle cx="${f1(k * (d + 4) + d / 2 + 2)}" cy="${f1(d / 2 + 2)}" r="${f1(d / 2)}" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="1.8"/>`).join(''), 'data-g1-pennies="' + n + '"');
const emptyCircles = (n, d, per) => {
  const rows = Math.ceil(n / per);
  return svg(per * (d + 6), rows * (d + 6), Array.from({ length: n }, (_, k) => `<circle cx="${f1((k % per) * (d + 6) + d / 2 + 3)}" cy="${f1(Math.floor(k / per) * (d + 6) + d / 2 + 3)}" r="${f1(d / 2)}" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1.8"/>`).join(''), `data-g1-circles="${n}"`);
};

/* ================================================================ the pages */
const MODES = {};

/* ---------------------------------------------------------------- G1-626 sound stations (record) */
/** the library drum with a few grains of rice on its head (review round 1: the rice is what children see jump) */
function riceDrum(p, px) {
  const g = [[0.36, 0.17, 20], [0.44, 0.13, -30], [0.5, 0.19, 60], [0.58, 0.14, 10], [0.64, 0.18, -50], [0.47, 0.23, 30], [0.4, 0.21, -10]];
  const dots = g.map(([x, y, a]) => `<ellipse cx="${f1(x * px)}" cy="${f1(y * px)}" rx="${f1(Math.max(2.2, px * 0.028))}" ry="${f1(Math.max(1.2, px * 0.014))}" transform="rotate(${a} ${f1(x * px)} ${f1(y * px)})" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1"/>`).join('');
  return `<div style="position:relative;width:${px}px;height:${px}px" data-g1-rice="1">${pic(p, px)}<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" style="position:absolute;left:0;top:0" data-g1-ricegrains="${g.length}">${dots}</svg></div>`;
}
function stationArt(s, px) {
  if (s.pic && s.id === 'drum') return riceDrum(s.pic, Math.round(px * 0.8));
  if (s.pic) return pic(s.pic, Math.round(px * 0.8));
  if (s.draw === 'band-box') return bandBoxArt(px);
  if (s.draw === 'ruler-desk') return rulerDeskArt(px);
  return humArt(px);
}
MODES['g1-sound-stations'] = function soundStations(d, rng) {
  const st = rng.sample(B.SOUND_STATIONS, d.stations);
  const S = d.stations === 3 ? { cw: 250, ch: 210, px: 190, dw: 0 } : d.frame ? { cw: 168, ch: 132, px: 112, dw: 250 } : { cw: 176, ch: 152, px: 122, dw: 260 };
  const rows = st.map((s) => band(row(
    tile(col(art(stationArt(s, S.px)) + small(s.label, S.cw - 14), 2), S.cw, S.ch, `data-dk-item="${s.id}"`, 'white') +
    col(chip('I felt it shake', `data-g1-choice="felt"`, d.stations === 3 ? 'font-size:19px;padding:4px 14px' : '') + chip('I saw it shake', `data-g1-choice="saw"`, d.stations === 3 ? 'font-size:19px;padding:4px 14px' : ''), d.stations === 3 ? 22 : 12) +
    (S.dw ? labelledDraw(S.dw, S.ch, 'the part that moved', `data-dk-prompt="moved-${s.id}"`, '', 16) : ''), 16), `data-g1-station="${s.id}"`));
  const html = grow(rows.join(''), 'gap:10px') + (d.frame ? frameTile([['The sound came when the', 230, 'shook.']]) : '');
  return { html, meta: { record: true, items: st.map((s) => s.id) } };
};

/* ---------------------------------------------------------------- G1-627 sound makes things move (record) */
function testArt(t, px) {
  if (t.draw === 'fork-water') return forkWaterArt(px);
  if (t.draw === 'speaker') return speakerArt(px, t.pics[0]);
  return `<div style="display:flex;gap:2px">${t.pics.map((p) => (p.noun === 'drum' ? riceDrum(p, Math.round(px * 0.48)) : pic(p, Math.round(px * 0.48)))).join('')}</div>`;
}
MODES['g1-sound-moves'] = function soundMoves(d, rng) {
  const tests = d.tests === 2 ? rng.sample(B.SOUND_TESTS.slice(0, 2), 2) : rng.shuffle(B.SOUND_TESTS);
  const S = d.tests === 2 ? { cw: 150, ch: 230, px: 130 } : d.frame ? { cw: 150, ch: 150, px: 104 } : { cw: 150, ch: 178, px: 120 };
  const rows = tests.map((t) => band(row(
    tile(col(art(testArt(t, S.px)) + small(t.label, S.cw - 14), 2), S.cw, S.ch, `data-dk-item="${t.id}"`, 'white') +
    labelledDraw(124, S.ch, 'before', `data-dk-prompt="before-${t.id}"`, '', 16) +
    labelledDraw(124, S.ch, 'with the sound', `data-dk-prompt="during-${t.id}"`, '', 14) +
    col(t.chips.map((c, i) => chip(c, `data-g1-choice="${i ? 'no' : 'yes'}"`, 'font-size:15px;padding:2px 9px')).join(''), 12), 10), `data-g1-test="${t.id}"`));
  const html = grow(rows.join(''), 'gap:10px') + (d.frame ? frameTile([['The sound made the', 250, 'move.']]) : '');
  return { html, meta: { record: true, items: tests.map((t) => t.id) } };
};

/* ---------------------------------------------------------------- G1-628 cup telephone (record) */
MODES['g1-cup-phone'] = function cupPhone(d, rng) {
  const plan = whiteBand(col(head('Our plan: circle the cups and the string we used.', 'font-size:17px;line-height:21px') +
    row(B.PHONE_PLAN.map((p) => tile(col(art(planArt(p.draw, d.draw ? 56 : 96)) + small(p.label, 120), 0), 140, d.draw ? 88 : 136, `data-g1-plan-item="${p.id}"`)).join(''), 14), 4), 'data-g1-plan="1"', 'padding:6px 0');
  const tests = d.tests === 2 ? B.PHONE_TESTS.slice(0, 2) : rng.shuffle(B.PHONE_TESTS);
  const rh = d.change ? 74 : d.draw ? 80 : 226;
  const tRows = tests.map((t) => row(tile(art(phoneArt(t.id, 230, rh - 16)), 250, rh, `data-dk-item="${t.id}"`, 'white') +
    `<div style="width:150px">${text(t.label, 'white-space:normal')}</div>` + col(chip('I heard it', 'data-g1-choice="heard"') + chip('I did not hear it', 'data-g1-choice="not"'), d.draw ? 6 : 18), 14)).join('');
  const parts = [plan];
  if (d.draw) parts.push(col(labelledDraw(W - 40, d.change ? 150 : 200, 'our telephone', 'data-dk-prompt="phone"'), 0));
  parts.push(whiteBand(col(head('Our tests') + tRows, 6), 'data-g1-tests="1"', 'padding:6px 0'));
  if (d.change) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(text('One change that made our telephone work better:') + lineBox(W - 40) + lineBox(W - 40), 2, 'align-items:flex-start'), 'data-g1-change="1"', 'padding:6px 14px'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true, items: tests.map((t) => t.id) } };
};

/* ---------------------------------------------------------------- G1-629 peep box (record) */
MODES['g1-peep-box'] = function peepBox(d) {
  const colOf = (open) => box('dk-tile', 318, '100%', col(head(open ? 'flap open' : 'flap closed') + art(peepBoxArt(open, d.draw ? 240 : 290)) +
    row(chip('I saw it', 'data-g1-choice="saw"') + chip('I did not see it', 'data-g1-choice="not"'), 10) +
    (d.draw ? col(small('what I saw through the hole', 260) + drawBox(d.frame ? 150 : 180, d.frame ? 150 : 180, `data-dk-prompt="saw-${open ? 'open' : 'closed'}"`, '') , 2) : ''), 8, 'height:100%;justify-content:space-around'), `data-dk-item="${open ? 'open' : 'closed'}"`, 'padding:6px 4px');
  const body = `<div style="flex:1 1 auto;min-height:0;display:flex;gap:18px;justify-content:center">${colOf(false) + colOf(true)}</div>`;
  return { html: body + (d.frame ? frameTile([['I could see the toy when', 300, '.']]) : ''), meta: { record: true } };
};

/* ---------------------------------------------------------------- G1-630 does light go through? (record) */
MODES['g1-light-test'] = function lightTest(d, rng) {
  const mats = rng.sample(B.LIGHT_MATERIALS, d.n);
  const rows = [];
  const rh = d.n === 4 ? 104 : d.write ? 64 : 78;
  if (!d.write) {
    rows.push(row(`<div style="width:170px"></div>` + [['all', 'all light'], ['some', 'some light'], ['none', 'no light']].map(([k, l]) => col(art(lightIcon(k)) + word(l, 'font-size:15px'), 2, 'width:140px')).join(''), 8, 'justify-content:flex-start'));
    for (const m of mats) rows.push(band(row(col(art(swatchArt(m.id)) + small(m.label, 150), 2, 'width:170px') + ['all', 'some', 'none'].map((k) => box('dk-draw', 132, rh - 16, '', `data-g1-colorbox="${k}"`)).join(''), 8, 'justify-content:flex-start'), `data-dk-item="${m.id}"`, 'padding:4px 6px'));
  } else {
    rows.push(row(head('Word bank:') + [['all', 'clear'], ['some', 'cloudy'], ['none', 'blocks']].map(([k, l]) => row(art(lightIcon(k, 74, 32)) + word(l), 8)).join(''), 18));
    for (const m of mats) rows.push(band(row(col(art(swatchArt(m.id)) + small(m.label, 150), 2, 'width:170px') + lineBox(440, 52), 10, 'justify-content:flex-start'), `data-dk-item="${m.id}"`, 'padding:2px 6px'));
    rows.push(band(row(col(drawBox(104, 62, 'data-dk-prompt="my-material"') + small('draw it', 104), 2, 'width:110px') + text('my material:') + lineBox(140, 52, 'data-g1-name="1"') + text('the light:') + lineBox(130, 52), 8, 'justify-content:flex-start'), 'data-dk-item="mine"', 'padding:2px 6px'));
  }
  return { html: grow(rows.join(''), 'gap:8px'), meta: { record: true, items: mats.map((m) => m.id) } };
};

/* ---------------------------------------------------------------- G1-631 mirrors bounce light */
/** a room: the flashlight at the left shines right to the mirror spot; the star up or down from it */
function mirrorRoom({ w, h, star, mirror = null, trace = false, spot = false }) {
  const cy = star === 'up' ? h - 46 : 46, mx = w - 120, sy = star === 'up' ? 36 : h - 36;
  let s = `<rect x="1" y="1" width="${f1(w - 2)}" height="${f1(h - 2)}" rx="8" fill="#FFFFFF" stroke="${T.grid}" stroke-width="2"/>`;
  s += flashlight(70, cy, 0, 1);
  s += `<g data-g1-star="${star}">${starPath(mx, sy, 24)}</g>`;
  if (trace) s += `<path d="M76 ${cy} L${mx} ${cy} L${mx} ${f1(sy + (star === 'up' ? 28 : -28))}" fill="none" stroke="${T.inkSoft}" stroke-width="4" stroke-dasharray="10 8" stroke-linejoin="round" data-g1-trace="1"/>`;
  else s += arrow(78, cy, mx - 34, cy, { stroke: T.coral, sw: 4, head: 12, attrs: 'data-g1-beam="1"' });
  if (mirror) s += mirrorAt(mx, cy, mirror, 60);
  if (spot) s += `<circle cx="${mx}" cy="${cy}" r="26" fill="none" stroke="${T.coral}" stroke-width="2.5" stroke-dasharray="6 5" data-g1-spot="1"/>`;
  return svg(w, h, s, `data-g1-room="${star}"`);
}
function twoMirrorRoom(w, h) {
  const by = h - 44, m1 = 230, ty = 44;
  let s = `<rect x="1" y="1" width="${f1(w - 2)}" height="${f1(h - 2)}" rx="8" fill="#FFFFFF" stroke="${T.grid}" stroke-width="2"/>` + flashlight(70, by, 0, 1) +
    mirrorAt(m1, by, 'slash', 56) + mirrorAt(m1, ty, 'slash', 56, 'data-g1-second="1"', true) + `<g data-g1-star="right">${starPath(w - 60, ty, 24)}</g>`;
  return svg(w, h, s, 'data-g1-room="two"');
}
MODES['g1-mirror'] = function mirror(d, rng) {
  const parts = [];
  const items = [];
  if (d.trace) {
    const rooms = rng.shuffle(B.MIRROR_ROOMS.filter((r) => r.star !== 'back'));
    for (const r of rooms) parts.push(band(row(art(mirrorRoom({ w: 470, h: 280, star: r.star, mirror: r.mirror, trace: true })) +
      col(small('Color the star when the light lands on it.', 150), 4), 14), `data-g1-traceroom="${r.id}"`));
  }
  if (d.two) parts.push(band(col(art(twoMirrorRoom(560, 260)), 2), 'data-g1-tworoom="1"'));
  if (d.choose) {
    const rooms = rng.sample(B.MIRROR_ROOMS.filter((r) => r.star !== 'back'), d.choose);
    const at = d.choose === 1 ? [rng.int(0, 2)] : placesFor(d.choose, 3, rng);
    rooms.forEach((r, i) => {
      const wrong = rng.shuffle(B.MIRROR_TURNS.filter((t) => t !== r.mirror));
      const opts = wrong.slice(); opts.splice(at[i], 0, r.mirror);
      items.push(r.id + '@' + at[i]);
      const rh = d.choose === 2 ? 250 : 220;
      parts.push(band(row(art(mirrorRoom({ w: 330, h: rh, star: r.star, spot: true })) +
        row(opts.map((t) => tile(svg(80, 80, mirrorAt(40, 40, t, 60)), 92, 92, `data-g1-option="${t}" data-dk-answer="${t === r.mirror ? 'right' : 'no'}"`, 'white')).join(''), 8), 12),
      `data-dk-item="${r.id}" data-g1-one="1"`));
    });
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { items, record: !d.choose } };
};

/* ---------------------------------------------------------------- G1-632 shadows near and far */
function shadowScene(label, w, h, attrs) {
  const s = flashlight(48, h / 2 + 8, 0, 0.9) + `<rect x="${f1(w - 34)}" y="30" width="22" height="${f1(h - 44)}" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5"/>`;
  return labelledDraw(w, h, label, attrs, `<div style="position:absolute;left:0;top:0;line-height:0">${svg(w - 6, h - 6, s)}</div>`, 16);
}
MODES['g1-shadows'] = function shadows(d, rng, ctx) {
  let toys;
  for (let t = 0; t < 400; t++) {
    toys = rng.sample(B.SHADOW_TOYS, d.pairs);
    if (toys.every((a, i) => toys.every((b, j) => j <= i || PM.iou(PM.maskA(a.theme, a.noun), PM.maskA(b.theme, b.noun)) < 0.72))) break;
  }
  const order = derange(d.pairs, rng);
  const ih = d.pairs === 4 ? 150 : d.draw === 2 ? 100 : 118, px = ih - 16;
  // the shadow: the same picture drawn as its dark silhouette (the K-057 filter), its own img (one style attribute)
  const shadowImg = (p) => `<img class="ws-icon" data-dk-pic="${esc(p.theme + '/' + p.noun)}" data-g1-shadow="1" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${px}px;height:${px}px;display:block;object-fit:contain;filter:brightness(0);opacity:.82">`;
  const L = toys.map((p) => row(tile(pic(p, px), 200, ih, `data-g1-left="${p.noun}"`, 'white') + DK_DOT(), 10)).join('');
  const R = order.map((k) => row(DK_DOT() + tile(shadowImg(toys[k]), 200, ih, `data-g1-right="${toys[k].noun}"`, 'white'), 10)).join('');
  const match = row(`<div style="display:flex;flex-direction:column;gap:10px">${L}</div><div style="width:100px"></div><div style="display:flex;flex-direction:column;gap:10px">${R}</div>`, 0, 'align-items:flex-start');
  const parts = [whiteBand(match, 'data-g1-match="1"', 'padding:8px 0;flex:1 1 auto')];
  if (d.draw === 1) parts.push(row(shadowScene('the toy near the light, and its shadow on the wall', W - 20, 250, 'data-dk-prompt="near"'), 0));
  if (d.draw === 2) {
    parts.push(row(['near', 'far'].map((k) => col(shadowScene(k === 'near' ? 'toy near the light' : 'toy far from the light', (W - 16) / 2, 186, `data-dk-prompt="${k}"`) + chip('bigger shadow', `data-g1-choice="bigger-${k}"`), 4)).join(''), 16));
    parts.push(frameTile([['The shadow got bigger when', 300, '.']]));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { pairs: toys.map((p) => p.noun), right: order.map((k) => toys[k].noun) } };
};
const DK_DOT = () => '<span class="dk-dot" data-dk-box></span>';

/* ---------------------------------------------------------------- G1-633 send a message with light (record) */
MODES['g1-light-code'] = function lightCode(d) {
  const msgs = B.CODE_MESSAGES.slice(0, d.signals);
  const key = whiteBand(col(head('Our flash code: color one circle for each flash.', 'font-size:17px') + msgs.map((m) => row(`<div style="width:130px;display:flex;justify-content:flex-end">${chip(m, `data-g1-code="${m}"`)}</div>` + art(emptyCircles(4, d.draw ? 34 : 50, 4)), 16, 'justify-content:flex-start')).join(''), 6, 'align-items:flex-start'), 'data-g1-key="1"', 'padding:6px 20px');
  const parts = [key];
  // every level draws the signal light (the design's page); level 1 a larger box, its tests fewer
  parts.push(col(labelledDraw(W - 40, d.change ? 140 : d.draw ? 170 : 230, 'our signal light', 'data-dk-prompt="device"'), 0));
  const th = d.change ? 46 : d.draw ? 54 : 74;
  const hdr = row(`<div style="width:96px"></div>` + ['the message we sent', 'the message our friend read', 'right?'].map((x, i) => `<div style="width:${[200, 200, 130][i]}px;display:flex;justify-content:center">${word(x, 'font-size:14px')}</div>`).join(''), 8, 'justify-content:flex-start');
  const msgChips = (k, col2) => `<div style="width:200px;height:${th}px;display:flex;gap:5px;justify-content:center;align-items:center;border:2px dashed ${T.grid};border-radius:10px;box-sizing:border-box" data-dk-box data-g1-msgs="${col2}">${msgs.map((m) => chip(m, `data-g1-msg="${m}"`, 'font-size:14px;padding:1px 7px')).join('')}</div>`;
  const trows = Array.from({ length: d.signals }, (_, i) => row(`<div style="width:96px">${word('message ' + (i + 1), 'font-size:15px')}</div>` + msgChips(i, 'sent') + msgChips(i, 'read') +
    `<div style="width:130px;display:flex;gap:6px;justify-content:center">${chip('right', 'data-g1-choice="right"')}${chip('wrong', 'data-g1-choice="wrong"')}</div>`, 8, 'justify-content:flex-start')).join('');
  parts.push(whiteBand(col(head('Our tests', 'font-size:17px') + hdr + trows, 6, 'align-items:flex-start'), 'data-g1-tests="1"', 'padding:6px 10px'));
  if (d.change) parts.push(box('dk-tile dk-tile--white', W, 'auto', col(text('One change that made our message easier to see:') + lineBox(W - 40), 2, 'align-items:flex-start'), 'data-g1-change="1"', 'padding:6px 14px'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true, signals: d.signals } };
};

/* ---------------------------------------------------------------- G1-634 my shadow through the day (record) */
MODES['g1-shadow-day'] = function shadowDay(d) {
  const ph = d.frame ? 340 : 430;
  const panel = (when, label) => col(chip(label, `data-g1-when="${when}"`) + art(skyPanel(when, 210, ph, d.sun)) +
    row(word('east', 'font-size:15px') + `<div style="width:120px"></div>` + word('west', 'font-size:15px'), 0), 4);
  const panels = row(panel('morning', 'morning') + panel('noon', 'near noon') + panel('afternoon', 'afternoon'), 12, 'align-items:flex-start');
  const shortest = whiteBand(row(text('The shadow was shortest:') + ['morning', 'near noon', 'afternoon'].map((x) => chip(x, `data-g1-choice="${x}"`)).join(''), 12), 'data-g1-shortest="1"', 'padding:8px 0');
  const south = whiteBand(row(text('We face south. East is on our left, and west is on our right.', 'font-size:16px'), 0), 'data-g1-south="1"', 'padding:5px 0');
  const parts = [band(panels, 'data-g1-panels="1"', 'padding:6px 0'), south, shortest];
  if (d.frame) parts.push(frameTile([['The Sun seems to move from', 150, 'to', 150, '.']]));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G1-635 Moon journal (record) */
/** a key Moon with its BRIGHT part colored and its dark part left white (review round 1: children color the bright
 *  part; the moon-phase primitive itself is not changed, its two fills are swapped here) */
// review round 2: the new Moon (phase 0, nothing bright) keeps its dark fill, so it never looks like a blank journal circle
const litMoon = (k, d) => moonPhase({ phase: k, hemisphere: 'N', d }).svg.replace(/fill="[^"]+"( data-lcs-part="dark")/, k === 0 ? 'fill="#8A8276"$1' : 'fill="#FFFFFF"$1').replace(/fill="[^"]+"( data-lcs-part="lit")/g, `fill="${T.coral}"$1`).replace('<svg ', '<svg data-g1-litkey="1" ');
const ring = (d, dash = false) => svg(d + 6, d + 6, `<circle cx="${f1(d / 2 + 3)}" cy="${f1(d / 2 + 3)}" r="${f1(d / 2)}" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"${dash ? ' stroke-dasharray="7 5"' : ''}/>`, 'data-g1-moonring="1"');
MODES['g1-moon-journal'] = function moonJournal(d) {
  const parts = [];
  parts.push(whiteBand(col(head('Moon shapes: color the bright part', 'font-size:17px') + `<div style="display:flex;gap:2px;justify-content:center;align-items:flex-start">${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (k === 0 ? col(art(litMoon(k, 80), `data-g1-key-phase="${k}"`) + small('new Moon', 80), 0) : art(litMoon(k, 80), `data-g1-key-phase="${k}"`))).join('')}</div>`, 2), 'data-g1-moonkey="1"', 'padding:4px 0'));
  if (d.cells === 8) {
    const cell = (k) => box('dk-tile', 156, '100%', col(row(word('Day', 'font-size:16px') + numBox(58, 34), 6) + art(ring(100)) + col(chip('cloudy', 'data-g1-mark="cloudy"', 'font-size:14px;padding:1px 9px') + chip('not in the sky', 'data-g1-mark="not-in-sky"', 'font-size:14px;padding:1px 9px'), 4), 4, 'height:100%;justify-content:space-between'), `data-g1-entry="${k}"`, 'padding:6px 2px');
    parts.push(`<div style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:repeat(4,156px);grid-template-rows:repeat(2,1fr);gap:10px 12px;justify-content:center">${Array.from({ length: 8 }, (_, k) => cell(k + 1)).join('')}</div>`);
  } else {
    const rd = d.predict ? 46 : 58;
    const cell = (n) => box('dk-tile dk-tile--white', 88, '100%', col(word(String(n), 'font-size:15px;line-height:17px') + art(ring(rd)), 0, 'height:100%;justify-content:center'), `data-g1-day="${n}"`, 'padding:2px 0');
    parts.push(row(`<span class="g1-text" data-dk-box data-g1-mark="cloudy" style="font-size:15px">X = clouds hid the Moon</span><span class="g1-text" data-dk-box data-g1-mark="not-in-sky" style="font-size:15px">– = the Moon was not in the sky</span>`, 26));
    parts.push(`<div style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:repeat(7,88px);grid-template-rows:repeat(5,1fr);gap:6px 6px;justify-content:center">${Array.from({ length: 31 }, (_, k) => cell(k + 1)).join('')}</div>`);
    if (d.predict) parts.push(whiteBand(row(col(small('my guess for the next shape', 170) + art(ring(70, true)), 2) + col(small('the Moon I saw', 170) + art(ring(70)), 2) +
      col(chip('the same') + chip('not the same'), 6), 30), 'data-g1-predict="1"', 'padding:4px 0'));
  }
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, cells: d.cells } };
};

/* ---------------------------------------------------------------- G1-636 day sky and night sky (record) */
MODES['g1-day-night'] = function dayNight(d) {
  const wh = d.bank ? 560 : d.frame ? 500 : 640;
  const win = (k) => col(chip(k, `data-g1-sky="${k}"`) + art(windowArt(316, wh)), 4);
  const parts = [];
  if (d.bank) parts.push(whiteBand(row(head('You may see:', 'font-size:17px') + row(art(sunDisc({ d: 70 }).svg) + word('Sun'), 6) + row(art(moonDisc({ d: 66 }).svg) + word('Moon'), 6) +
    row(art(svg(70, 66, starPath(20, 22, 16, '#FFFFFF') + starPath(50, 30, 12, '#FFFFFF') + starPath(28, 52, 11, '#FFFFFF'))) + word('stars'), 6), 22), 'data-g1-bank="1"', 'padding:8px 0'));
  parts.push(row(win('day') + win('night'), 18, 'align-items:flex-start'));
  if (d.frame) parts.push(frameTile([['The stars are still there in the day, but', 260], [600]]));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G1-637 how long is the day? (record) */
function daylightChart({ months, colW, rowH, predict, started }) {
  const H = B.DAYLIGHT_HOURS, rows = H.length - 1, lx = 44, top = 12, gw = (months.length + (predict ? 1 : 0)) * colW;
  const gh = rows * rowH, base = top + gh;
  let s = '';
  for (let k = 0; k <= rows; k++) { const y = base - k * rowH; s += `<line x1="${lx}" y1="${f1(y)}" x2="${f1(lx + gw)}" y2="${f1(y)}" stroke="${T.grid}" stroke-width="1.5"/><text x="${lx - 8}" y="${f1(y + 6)}" text-anchor="end" font-family="Nunito" font-weight="800" font-size="16" fill="${T.ink}">${H[k]}</text>`; }
  const all = predict ? [...months, 'April'] : months;
  all.forEach((m, i) => {
    const x = lx + i * colW + colW * 0.2, bw = colW * 0.6, dash = predict && i === all.length - 1;
    s += `<rect x="${f1(x)}" y="${top}" width="${f1(bw)}" height="${f1(gh)}" fill="none" stroke="${dash ? T.coral : T.inkSoft}" stroke-width="2" ${dash ? 'stroke-dasharray="7 5"' : ''} data-g1-bar="${m}"/>`;
  });
  // the axis does not start at 0: a break mark under the bottom line
  s += `<path d="M${lx} ${f1(base)} L${lx} ${f1(base + 6)} L${lx - 6} ${f1(base + 10)} L${lx + 6} ${f1(base + 16)} L${lx} ${f1(base + 20)} L${lx} ${f1(base + 24)}" fill="none" stroke="${T.ink}" stroke-width="2"/>`;
  s += `<line x1="${lx}" y1="${top}" x2="${lx}" y2="${f1(base)}" stroke="${T.ink}" stroke-width="2.5"/>`;
  return svg(lx + gw + 4, base + 26, s, 'data-g1-chart="daylight"');
}
MODES['g1-daylight'] = function daylight(d) {
  const months = B.MONTHS.slice(0, d.months);
  const n = months.length + (d.predict ? 1 : 0);
  const colW = Math.floor(600 / n), rowH = d.hours ? 50 : 60;
  const chart = daylightChart({ months, colW, rowH, predict: d.predict, started: d.started });
  const labels = row(`<div style="width:44px"></div>` + [...months, ...(d.predict ? ['April'] : [])].map((m, i) => `<div style="width:${colW}px;display:flex;flex-direction:column;align-items:center;gap:4px">${chip(d.predict && i === n - 1 ? 'April' : m, `data-g1-month="${m}"`, `font-size:${n > 5 ? 14 : 16}px;padding:2px 6px`)}${d.hours ? numBox(Math.min(70, colW - 20), 40, `data-g1-hours="${m}"`) : ''}${d.predict && i === n - 1 ? small('my guess', colW - 6) : ''}</div>`).join(''), 0, 'justify-content:flex-start;align-items:flex-start');
  const parts = [whiteBand(col(row(word('hours of daylight on the 21st of the month (to the nearest hour)', 'font-size:15px'), 0, 'justify-content:flex-start;width:100%') + art(chart) + labels, 2, 'align-items:flex-start'), 'data-g1-graph="1"', 'padding:6px 12px;flex:1 1 auto')];
  parts.push(whiteBand(row(`<span class="g1-text" data-dk-box data-g1-tie="1">Circle the month with the shortest day. If months are the same, circle all of them.</span>`, 0), 'data-g1-shortest="1"', 'padding:6px 0'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true, months } };
};

/* ---------------------------------------------------------------- G1-638 animal parents help their babies */
MODES['g1-animal-parents'] = function animalParents(d, rng) {
  const fams = rng.sample(B.ANIMAL_FAMILIES, d.families);
  const th = d.families === 2 ? 210 : d.frame ? 116 : 112;
  const rows = fams.map((f) => band(row(tile(col(pic(f.pic, th - 44) + small(f.name + ' (baby: ' + f.baby + ')', 150), 0), 170, th, `data-dk-item="${f.id}"`, 'white') +
    col(row(word('the parent', 'font-size:15px;width:84px;text-align:left') + B.PARENT_ACTS.map((a) => chip(a, `data-g1-act="${a}"`)).join(''), 6, 'justify-content:flex-start') +
      row(word('the baby', 'font-size:15px;width:84px;text-align:left') + B.BABY_ACTS.map((a) => chip(a, `data-g1-act="${a}"`)).join(''), 6, 'justify-content:flex-start') +
      (d.frame ? frameLine(['The parent', 110, 'so the baby', 110, '.'], 44) : ''), 8, 'align-items:flex-start'), 12, 'justify-content:flex-start'), `data-g1-family="${f.id}"`, 'padding:4px 8px'));
  const parts = [grow(rows.join(''), 'gap:8px')];
  const items = [];
  if (d.turtle) {
    const others = rng.sample(B.ANIMAL_FAMILIES, 2);
    const at = rng.int(0, 2);
    const ch = others.map((f) => ({ ...f, cares: true })); ch.splice(at, 0, B.NO_CARE);
    items.push('turtle@' + at);
    parts.push(whiteBand(col(text('Circle the parent that never takes care of its babies.') + row(ch.map((c) => tile(col(pic(c.pic, 92) + small(c.name, 130), 0), 140, 128, `data-g1-parent="${c.id}" data-dk-answer="${c.cares ? 'no' : 'right'}"`, 'white')).join(''), 22), 6), 'data-dk-item="never-cares" data-g1-one="1"', 'padding:6px 0'));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { families: fams.map((f) => f.id), items } };
};

/* ---------------------------------------------------------------- G1-639 copy an animal */
/** the perfect matchings of a set of pairs over an edge table edges[animalId] = [invention ids] */
function matchingCount(lefts, rights, edges) {
  let n = 0; const used = new Set();
  const rec = (i) => { if (i === lefts.length) { n++; return; } for (const r of rights) if (!used.has(r) && (edges[lefts[i]] || []).includes(r)) { used.add(r); rec(i + 1); used.delete(r); } };
  rec(0);
  return n;
}
MODES['g1-copy-animal'] = function copyAnimal(d, rng) {
  const parts = [];
  let pairs = rng.sample(B.COPY_PAIRS, 3);
  const meta = { pairs: pairs.map((p) => p.id) };
  if (d.match) {
    const order = derange(3, rng);
    meta.right = order.map((k) => pairs[k].id);
    const L = pairs.map((p) => row(tile(col(pic(p.animal, 86) + small(p.name + ': ' + p.part, 160), 0), 172, 134, `data-g1-left="${p.id}"`, 'white') + DK_DOT(), 10)).join('');
    const R = order.map((k) => row(DK_DOT() + tile(col(pic(pairs[k].invention, 90) + small(pairs[k].inv, 150), 0), 172, 134, `data-g1-right="${pairs[k].id}"`, 'white'), 10)).join('');
    parts.push(whiteBand(row(`<div style="display:flex;flex-direction:column;gap:10px">${L}</div><div style="width:110px"></div><div style="display:flex;flex-direction:column;gap:10px">${R}</div>`, 0, 'align-items:flex-start'), 'data-g1-match="1"', 'padding:8px 0'));
    parts.push(col(labelledDraw(W - 40, 250, 'one invention that copies an animal', 'data-dk-prompt="one"'), 0));
  } else {
    parts.push(whiteBand(col(text('Circle one animal part.') + row(pairs.map((p) => tile(col(pic(p.animal, 80) + small(p.name + ': ' + p.part, 160), 0), 176, 120, `data-g1-part="${p.id}"`, 'white')).join(''), 14), 4), 'data-g1-parts="1"', 'padding:6px 0'));
    parts.push(col(labelledDraw(W - 40, d.frame ? 250 : 330, 'my invention', 'data-dk-prompt="invention"'), 0));
    const lines = [['It helps people', 400, '.']];
    if (d.frame) lines.push(['My', 150, 'works like a', 150, 'because'], [580, '.']);
    parts.push(frameTile(lines));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta };
};

/* ---------------------------------------------------------------- G1-640 like their parents, but not exactly */
MODES['g1-parent-young'] = function parentYoung(d, rng) {
  const pairs = rng.sample(B.PARENT_YOUNG, d.pairs);
  const clueOrder = [];
  const th = d.pairs === 1 ? 330 : d.frame ? 150 : 170;
  const rows = pairs.map((p) => {
    const clues = rng.shuffle(Object.keys(p.clues));
    clueOrder.push(p.id + ':' + clues.map((c) => c + '=' + p.clues[c]).join(','));
    const tw = d.pairs === 1 ? 420 : 250;
    const ppx = Math.min(th - 46, Math.floor((tw - 24) / 1.62)), ypx = Math.round(ppx * 0.6);
    const pair = tile(col(`<div style="display:flex;align-items:flex-end;gap:6px">${pic(p.parent, ppx)}${pic(p.young, ypx)}</div>` + small(p.names[0] + ' and ' + p.names[1], 220), 0), tw, th, `data-dk-item="${p.id}"`, 'white');
    const chips = col(clues.map((c) => chip(c, `data-g1-clue="${c}" data-dk-answer="${p.clues[c]}"`)).join(''), d.pairs === 1 ? 18 : 6, 'align-items:flex-start');
    return band(col(row(pair + chips, 24, 'justify-content:flex-start') + (d.frame ? frameLine(['The', 90, 'is like its parent because', 210, ','], 44) + frameLine(['but different because', 300, '.'], 44) : ''), 2, 'align-items:flex-start'),
      `data-g1-pair="${p.id}"`, 'padding:4px 10px');
  });
  return { html: grow(rows.join(''), 'gap:10px'), meta: { pairs: pairs.map((p) => p.id), clueOrder } };
};

/* ---------------------------------------------------------------- G1-641 seedlings and their parent plant (record) */
/** our grown bean plant (review round 1: the plant-figure flower read as a daisy, its narrow leaves and pea pod as not
 *  a bean): drawn in the plant-figure style (teal outline, tealSoft leaves, a creamDeep soil box): a stem with leaves in
 *  threes (broad, with a pointed tip and a middle vein), small white flowers, long bean pods hanging down.
 *  viewBox 0 0 200 360. */
function beanPlant(h) {
  const leaf = (x, y, rot, s) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" data-g1-leaflet="1"><path d="M0 0 C -24 -6 -26 -34 -3 -50 L0 -56 L3 -50 C 26 -34 24 -6 0 0 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/><path d="M0 -3 L0 -46" stroke="${T.teal}" stroke-width="1.5"/></g>`;
  const three = (x, y, base, s) => `<g data-g1-trifoliate="1">${leaf(x, y, base - 55, s)}${leaf(x, y, base, s)}${leaf(x, y, base + 55, s)}</g>`;
  // a bean pod: a long rounded pod hanging from its node, the beans showing as bumps inside
  const pod = (x, y, len, bend) => `<g transform="translate(${x} ${y}) rotate(${-bend})" data-g1-pod="1"><rect x="-7" y="0" width="14" height="${len}" rx="7" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2.5"/>` +
    [0.25, 0.5, 0.75].map((t) => `<ellipse cx="0" cy="${(len * t).toFixed(1)}" rx="3.6" ry="5" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.4"/>`).join('') + '</g>';
  const flower = (x, y) => `<g data-g1-flower="1">${[0, 120, 240].map((a) => `<ellipse cx="${x}" cy="${y - 5}" rx="4" ry="6" transform="rotate(${a} ${x} ${y})" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.8"/>`).join('')}</g>`;
  let s = `<rect x="40" y="304" width="120" height="50" rx="4" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="3"/>` + [[56, 322], [80, 340], [118, 318], [140, 338]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="${T.grid}"/>`).join('');
  s += `<path d="M100 304 C 96 250 104 200 98 150 C 94 110 102 80 100 56" fill="none" stroke="${T.teal}" stroke-width="5" stroke-linecap="round"/>`;
  s += `<path d="M99 252 L62 236 M101 202 L140 186 M98 152 L60 136 M101 106 L138 92" fill="none" stroke="${T.teal}" stroke-width="3" stroke-linecap="round"/>`;
  s += three(62, 236, -62, 0.8) + three(140, 186, 62, 0.8) + three(60, 136, -62, 0.74) + three(138, 92, 62, 0.68) + three(100, 58, 0, 0.62);
  s += pod(108, 214, 70, 12) + pod(90, 166, 62, -12) + pod(108, 122, 54, 10);
  s += flower(84, 112) + flower(134, 242);
  return svg(h * 200 / 360, h, s, 'data-g1-beanplant="1"', '0 0 200 360');
}
MODES['g1-seedlings'] = function seedlings(d) {
  const n = d.seedlings;
  const tall = d.frame ? 440 : 548;
  const parent = tile(col(art(beanPlant(Math.min(tall - 44, 320))) + small('our grown bean plant', 160), 0), 186, tall, 'data-g1-parentplant="1"', 'white');
  const sw = n === 1 ? 440 : 150;
  const boxes = Array.from({ length: n }, (_, k) => col(labelledDraw(sw, tall - 46, 'seedling ' + (k + 1), `data-dk-prompt="seedling-${k + 1}"`, '', 16) + row(word('leaves', 'font-size:15px') + numBox(54, 36), 4), 4)).join('');
  const top = row(parent + boxes, 8, 'align-items:flex-start');
  const traits = ['leaf shape', 'size', 'color'];
  const cw = n === 1 ? 260 : 150;
  const table = whiteBand(col(row(`<div style="width:${n === 1 ? 150 : 110}px"></div>` + Array.from({ length: n }, (_, k) => `<div style="width:${cw}px;display:flex;justify-content:center">${word('seedling ' + (k + 1), 'font-size:15px')}</div>`).join(''), 6, 'justify-content:flex-start') +
    traits.map((t) => row(`<div style="width:${n === 1 ? 150 : 110}px">${word(t, 'font-size:15px;text-align:left')}</div>` + Array.from({ length: n }, () => `<div style="width:${cw}px;display:flex;gap:4px;justify-content:center">${chip('same', 'style="font-size:14px;padding:1px 7px"')}${chip('different', 'style="font-size:14px;padding:1px 7px"')}</div>`).join(''), 6, 'justify-content:flex-start')).join(''), 6, 'align-items:flex-start'),
  'data-g1-traits="1"', 'padding:6px 8px');
  const parts = [top, col(text('Compare each seedling with our grown bean plant: circle same or different.', 'font-size:15px') + table, 4)];
  if (d.frame) parts.push(frameTile([['My seedlings are different from each other because', 170], [600]]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true, seedlings: n } };
};

/* ---------------------------------------------------------------- G1-642 design a raft (record) */
MODES['g1-raft-design'] = function raftDesign(d) {
  const checkBox = (id) => box('', 26, 26, '', `data-g1-check="${id}"`, `display:block;border:2.5px solid ${T.ink};border-radius:4px;background:#FFFFFF;box-sizing:border-box`);
  const mats = whiteBand(col(head('Check the materials you used.', 'font-size:17px') + row(B.RAFT_MATERIALS.map((m) => tile(col(art(raftMaterialArt(m.id, d.outline ? 70 : 60)) + small(m.label, 110) + checkBox(m.id), 2), 118, d.outline ? 150 : 128, `data-g1-mat="${m.id}"`)).join(''), 8), 4), 'data-g1-mats="1"', 'padding:6px 0');
  const load = whiteBand(row(text('Our raft must carry 10 pennies:') + art(pennies(10, 24)), 14), 'data-g1-load="1"', 'padding:6px 0');
  const parts = [mats, load];
  if (d.outline) parts.push(col(labelledDraw(W - 40, 400, 'color the raft', 'data-dk-prompt="color"', `<div style="position:absolute;left:50%;top:44px;margin-left:-270px;line-height:0">${raftOutline(540, 330)}</div>`), 0));
  else {
    parts.push(col(labelledDraw(W - 40, d.why ? 250 : 320, 'my raft', 'data-dk-prompt="sketch"'), 0));
    const lines = Array.from({ length: d.labels }, (_, k) => ['part ' + (k + 1) + ':', 520]);
    if (d.why) lines.push(['My raft will float because', 360]);
    parts.push(frameTile(lines));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G1-643 test two rafts (record) */
MODES['g1-raft-test'] = function raftTest(d) {
  const pw = (W - 16) / 2;
  const panel = (k) => box('dk-tile', pw, '100%', col(head('Raft ' + k) + labelledDraw(pw - 24, d.judge ? 170 : d.tally ? 290 : 320, 'our raft', `data-dk-prompt="raft-${k}"`, '', 16) +
    (d.tally ? col(labelledDraw(pw - 24, d.judge ? 120 : 220, 'tally', `data-dk-prompt="tally-${k}"`, '', 16) + row(word('total', 'font-size:16px') + numBox(80, 46) + word('pennies', 'font-size:16px'), 6), 6)
      : col(small('Color one circle for each penny it held.', pw - 30) + art(emptyCircles(20, 30, 5)) + chip('+ more', 'data-g1-more="1"'), 6)) +
    (d.judge ? col(small('One good thing:', pw - 30) + lineBox(pw - 30, 46) + small('One thing to fix:', pw - 30) + lineBox(pw - 30, 46) + chip('the better raft', `data-g1-choice="better-${k}"`), 2) : ''),
  12, 'height:100%;justify-content:flex-start'), `data-dk-item="raft-${k}"`, 'padding:6px 4px');
  return { html: `<div style="flex:1 1 auto;min-height:0;display:flex;gap:16px;justify-content:center">${panel('A') + panel('B')}</div>`, meta: { record: true } };
};

/* ================================================================ the type */
/** makeG1Type({ id, slug, mode, exerciseType, difficulty, i18n }) */
function makeG1Type({ id, slug, mode, exerciseType, difficulty, i18n }) {
  if (!MODES[mode]) throw new Error('dk-g1: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G1', assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    difficulty,
    i18n,
    dkMode: mode,
    build({ difficulty: lv, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the Batch 1 pages are English (no ${locale} bank)`);
      const d = this.difficulty[lv] || this.difficulty[2];
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${DK.CSS}${G1CSS}</style><div class="dk-root" data-ws-content data-dk="${mode}" data-dk-level="${lv}" data-dk-record="${out.meta.record ? 1 : 0}">${out.html}</div>`,
        meta: { mode, level: Number(lv), ...out.meta },
      };
    },
    async verify(page) {
      return [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(g1VerifyInPage));
    },
  };
}

/**
 * The Batch 1 page checks (in page.evaluate): every one-answer group holds exactly one right answer; every sentence
 * frame has its writing line; text printed on a writing line stays inside the page; a drawn order card strip holds as
 * many number boxes as cards.
 */
function g1VerifyInPage() {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no dk root'];
  R.querySelectorAll('[data-g1-one]').forEach((g) => { const a = [...g.querySelectorAll('[data-dk-answer]')].map((e) => e.dataset.dkAnswer); const n = a.filter((x) => x === 'right').length; if (n !== 1) f.push(`${g.dataset.dkItem || 'a group'}: ${n} right answers (one)`); if (a.length < 2) f.push(`${g.dataset.dkItem || 'a group'}: fewer than two choices`); });
  R.querySelectorAll('[data-g1-frame]').forEach((fr) => { if (!fr.querySelector('[data-dk-writerow]')) f.push('a sentence frame without its writing line'); });
  R.querySelectorAll('[data-g1-steps]').forEach((s) => { const c = s.querySelectorAll('[data-g1-step]').length, b = s.querySelectorAll('[data-g1-stepbox]').length; if (c !== b) f.push(`${c} step cards for ${b} number boxes`); });
  // a drawing with a figure (the drawn step cards): every figure inside its card
  R.querySelectorAll('[data-g1-step] svg, [data-g1-scene] svg').forEach((s) => { const card = s.closest('[data-dk-box]').getBoundingClientRect(); s.querySelectorAll('[data-k2-fig]').forEach((g) => { const q = g.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1 || q.top < card.top - 1 || q.bottom > card.bottom + 1) f.push('a drawn child runs out of its card'); }); });
  R.querySelectorAll('[data-g1-pharmacy]').forEach((p) => { const hd = p.querySelector('[data-g1-phead]'), ct = p.querySelector('[data-g1-counter]'); if (!hd || !ct || !p.querySelector('[data-g1-coat]')) f.push('the pharmacy card lacks the pharmacist, the white coat or the counter'); else { const hb = hd.getBoundingClientRect(), cb = ct.getBoundingClientRect(); if (hb.bottom > cb.top - hb.height * 1.5) f.push('the pharmacist\'s head is not well above the counter'); } });
  return f;
}

module.exports = {
  makeG1Type, MODES, g1VerifyInPage, reflect, matchingCount, validOrderCount,
  kit: { pic, svgPic, box, tile, drawBox, labelledDraw, pill, chip, word, small, text, head, col, row, grow, svg, art, band, whiteBand, arrow, writeRow, lineBox, frameLine, frameTile, numBox, sunToColor, starPath, flashlight, esc, f1, W, T, DOT: DK_DOT },
};
