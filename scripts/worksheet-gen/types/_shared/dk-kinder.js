/**
 * dk-kinder.js — the Batch K Kindergarten science and health pages (Daily Teaching System, Stage D-5, 2026-11-23):
 * 21 pages the English Kindergarten year designs need (types K-687 .. K-707, one `mode` each). English only (an other
 * locale refuses, as the English-only literacy types do). Themeless; PDF only (no screen, no answer key).
 *
 * The pages are of two kinds:
 *   CLOSED pages (needs, storm, eats, frog-home level 2, land, pushpull, direction level 1, sleep-play, trusted): every
 *     item has ONE right answer, held by the facts of data/science/dk-kinder.js; the answer of each item is stamped on
 *     the page (data-dk-answer, never printed) so verify() and qa/verify-dk-kinder.js re-check it, and where it sits is
 *     drawn from a seeded rng and checked for tells over 400+ seeds by the gate (never always first, last or biggest;
 *     no run, no staircase; the bins never line up with the answers).
 *   RECORD pages (wind, rain, harder push, ramp, ramps, boat plan, boat test, penny, seed journal, sun or shade, ice
 *     shade, I can): the class does the investigation with real things; the page is where the child records THAT
 *     investigation (its circles and drawings are the class's results), so the page carries no answer and nothing on it
 *     suggests one.
 *
 * Kindergarten reads almost nothing: the teacher reads the instruction (a level prints its own,
 * i18n/level-instructions.json); the child circles, crosses out, draws, colors, cuts and glues. Words on the page are
 * short labels the teacher reads (a key, a day, a bin). Counting never includes 0 and stays within 10 (the pennies of
 * levels 2 and 3 count to 20, the Kindergarten top).
 *
 * Pictures: colour library pictures only (cache/themes-512 through resolve.fileUri), never black-and-white beside
 * colour; the drawings are the simple shapes and primitives the generators already draw (boxes, arrows, lines, the
 * road-safety walker, the habitats animal homes, the thermometer). Every page fills its body (the stack 620-740 px),
 * and nothing collides with anything (verify() checks every marked box against every other).
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const { glyphGroup } = require('../../primitives/road-pictogram.js');
const { animalHome } = require('../../primitives/animal-home.js');
const thermometer = require('../../primitives/thermometer.js');
const { writingRow, strokeWordLane } = require('../../primitives/trace-path.js');
const B = require('../../data/science/dk-kinder.js');

const T = TOK.color;
const W = 675;                    // the body's inner width
const MAXH = 736;                 // the stack: the root never grows past this (620-740 band at every chrome height)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f1 = (n) => (Math.round(n * 10) / 10).toString();

/* ================================================================ the layout kit */
const CSS = `
.dk-root{flex:1 1 auto;min-height:0;max-height:${MAXH}px;display:flex;flex-direction:column;gap:12px;width:${W}px;align-self:center}
.dk-row{display:flex;align-items:center;justify-content:center;gap:12px}
.dk-tile{box-sizing:border-box;display:flex;align-items:center;justify-content:center;background:${T.cream};border:2px solid #F0E4CB;border-radius:14px;position:relative}
.dk-tile--white{background:#FFFFFF}
.dk-tile--lead{border:2.5px solid ${T.teal};background:#FFFFFF}
.dk-pill{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:8px;border:2.5px solid ${T.teal};border-radius:999px;background:#FFFFFF;padding:3px 14px;font-family:'Baloo 2',cursive;font-weight:700;font-size:18px;line-height:22px;color:${T.teal};white-space:nowrap}
.dk-word{display:block;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:20px;color:${T.ink};text-align:center;white-space:nowrap}
.dk-head{display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:19px;line-height:23px;color:${T.teal};white-space:nowrap}
.dk-draw{box-sizing:border-box;display:block;background:#FFFFFF;border:2.5px dashed ${T.coral};border-radius:12px;position:relative}
.dk-cut{box-sizing:border-box;border:2px dashed ${T.ink};border-radius:4px;background:#FFFFFF;display:flex;align-items:center;justify-content:center}
.dk-ring{box-sizing:border-box;display:block;width:40px;height:40px;border-radius:50%;border:2.5px solid ${T.ink};background:#FFFFFF}
.dk-dot{display:block;width:14px;height:14px;border-radius:50%;background:${T.coral}}
`;
/** a library picture in a px box */
function pic(p, px, extra = '') {
  return `<img class="ws-icon" data-dk-pic="${esc(p.theme + '/' + p.noun)}" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${px}px;height:${px}px;display:block;object-fit:contain"${extra}>`;
}
/** a picture inside an svg (a card drawing) */
const svgPic = (p, x, y, w, h, align = 'xMidYMax') => `<image href="${fileUri(p.theme, p.noun)}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" preserveAspectRatio="${align} meet" data-dk-pic="${esc(p.theme + '/' + p.noun)}"/>`;
/** a box every collision check sees */
const box = (cls, w, h, inner, attrs = '', style = '') => `<div class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''} style="flex-shrink:0;width:${typeof w === 'number' ? w + 'px' : w};height:${typeof h === 'number' ? h + 'px' : h};${style}">${inner}</div>`;
const tile = (inner, w, h, attrs = '', mod = '') => box('dk-tile' + (mod ? ' dk-tile--' + mod : ''), w, h, inner, attrs);
const drawBox = (w, h, attrs = '', inner = '') => box('dk-draw', w, h, inner, 'data-dk-draw' + (attrs ? ' ' + attrs : ''));
/** a draw box with its label printed INSIDE (top-left), the drawing space under it */
const labelledDraw = (w, h, label, attrs = '', extra = '') => drawBox(w, h, attrs, `<span class="dk-head" style="position:absolute;left:12px;top:6px">${esc(label)}</span>${extra}`);
const pill = (text, attrs = '') => `<span class="dk-pill" data-dk-box${attrs ? ' ' + attrs : ''}>${esc(text)}</span>`;
const word = (text) => `<span class="dk-word" data-dk-box>${esc(text)}</span>`;
const head = (text) => `<span class="dk-head" data-dk-box>${esc(text)}</span>`;
const dot = '<span class="dk-dot" data-dk-box></span>';
const col = (inner, gap = 6, extra = '') => `<div style="display:flex;flex-direction:column;align-items:center;gap:${gap}px;${extra}">${inner}</div>`;
const row = (inner, gap = 12, extra = '') => `<div class="dk-row" style="gap:${gap}px;${extra}">${inner}</div>`;
const grow = (inner, extra = '') => `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;${extra}">${inner}</div>`;
const svg = (w, h, body, attrs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="0 0 ${f1(w)} ${f1(h)}" style="display:block;overflow:visible"${attrs ? ' ' + attrs : ''}>${body}</svg>`;
/** a band (a row card) that shares the page height with its siblings */
const band = (inner, attrs = '', bg = '') => box('dk-tile', W, 'auto', inner, attrs, `flex:1 1 0;min-height:0;${bg}`);
/** an arrow from (x1,y1) to (x2,y2): a shaft and a solid head */
function arrow(x1, y1, x2, y2, { stroke = T.ink, sw = 4, head = 12, dash = null, attrs = '' } = {}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - Math.cos(a) * head, by = y2 - Math.sin(a) * head;
  const nx = -Math.sin(a) * head * 0.6, ny = Math.cos(a) * head * 0.6;
  return `<g${attrs ? ' ' + attrs : ''}><line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(bx)}" y2="${f1(by)}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<polygon points="${f1(x2)},${f1(y2)} ${f1(bx + nx)},${f1(by + ny)} ${f1(bx - nx)},${f1(by - ny)}" fill="${stroke}"/></g>`;
}
const arrowSvg = (w = 40, h = 30) => svg(w, h, arrow(3, h / 2, w - 3, h / 2, { sw: 4, head: 12 }));
/** an OUTLINE arrow to color in (harder push): length L px */
function outlineArrow(L, h = 46) {
  const body = 22, hl = Math.min(34, L * 0.45), y0 = (h - body) / 2, y1 = y0 + body;
  const d = `M2 ${f1(y0)} L${f1(L - hl)} ${f1(y0)} L${f1(L - hl)} 2 L${f1(L - 2)} ${f1(h / 2)} L${f1(L - hl)} ${f1(h - 2)} L${f1(L - hl)} ${f1(y1)} L2 ${f1(y1)} Z`;
  return svg(L, h, `<path d="${d}" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2.5" stroke-linejoin="round"/>`, `data-dk-arrow="${L}"`);
}
/** the drawn AIR card: three wind swirls (no library picture shows air) */
function airSwirl(px) {
  const s = px / 100;
  const sw = (y, len, curl) => `<path d="M${f1(8 * s)} ${f1(y * s)} L${f1((8 + len) * s)} ${f1(y * s)} C${f1((8 + len + curl) * s)} ${f1(y * s)} ${f1((8 + len + curl) * s)} ${f1((y - curl) * s)} ${f1((8 + len) * s)} ${f1((y - curl) * s)} C${f1((8 + len - curl * 0.6) * s)} ${f1((y - curl) * s)} ${f1((8 + len - curl * 0.6) * s)} ${f1((y - curl * 0.45) * s)} ${f1((8 + len - curl * 0.2) * s)} ${f1((y - curl * 0.45) * s)}" fill="none" stroke="${T.teal}" stroke-width="${f1(6 * s)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  return svg(px, px, sw(34, 52, 18) + sw(56, 66, 18) + sw(78, 40, 16), 'data-dk-drawn="air"');
}
/** a kindergarten writing row (school ruling); `trace` = words printed dashed to trace */
function writeRow(w, h, trace) {
  if (trace) return strokeWordLane({ text: trace, w, h, glyphH: Math.round(h * 0.56), reps: 1, stack: true, modelless: true, padLeft: 14 }).svg.replace('<svg ', '<svg data-dk-writerow="1" ');
  return writingRow({ w, h, glyphH: Math.round(h * 0.56), xHeight: true }).svg.replace('<svg ', '<svg data-dk-writerow="1" ');
}
/** a dashed write box for one number */
const numBox = (w = 64, h = 56, attrs = '') => box('ws-blankbox', w, h, '', 'data-dk-numbox' + (attrs ? ' ' + attrs : ''), 'display:block');

/* ---------------------------------------------------------------- answer places (no tell) */
/** places for the right answers of n rows with k choices each: every place used (n >= k), not all alike, no three in a
 *  row alike, no staircase */
function placesFor(n, k, rng) {
  for (let t = 0; t < 400; t++) {
    const p = Array.from({ length: n }, () => rng.int(0, k - 1));
    if (n >= k && new Set(p).size < k) continue;
    if (n >= 2 && new Set(p).size === 1) continue;
    if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) continue;
    if (n >= 3) { const d = p.slice(1).map((x, i) => x - p[i]); if (d.every((x) => x === 1) || d.every((x) => x === -1)) continue; }
    return p;
  }
  throw new Error('dk-kinder: no answer places for ' + n + ' rows of ' + k);
}
/** true when a boolean sequence follows a pattern a child could use: all alike, alternating, one block then the other */
function patterned(bits) {
  const s = bits.map((b) => (b ? 1 : 0)).join('');
  if (/^(1+|0+)$/.test(s)) return true;
  if (/^(10)+1?$/.test(s) || /^(01)+0?$/.test(s)) return true;
  if (/^1+0+$/.test(s) || /^0+1+$/.test(s)) return true;
  return false;
}
/** a derangement of 0..n-1 (no i at i), n >= 2 */
function derange(n, rng) {
  for (let t = 0; t < 500; t++) { const p = rng.shuffle([...Array(n).keys()]); if (p.every((v, i) => v !== i)) return p; }
  throw new Error('dk-kinder: no derangement of ' + n);
}

/* ================================================================ one valid order (the K-369 model) */
/**
 * validOrderCount(cards, before) — how many orders of `cards` keep every forced pair (before(a, b) = a must come
 * before b): the count of linear extensions, exactly as K-369's crossing-steps model. A sequence page prints only when
 * it is 1.
 */
function validOrderCount(cards, before) {
  const n = cards.length; let count = 0;
  const used = Array(n).fill(false), seq = [];
  const rec = () => {
    if (seq.length === n) { count++; return; }
    for (let i = 0; i < n; i++) if (!used[i] && !cards.some((b, j) => !used[j] && j !== i && before(b, cards[i]))) { used[i] = true; seq.push(i); rec(); seq.pop(); used[i] = false; }
  };
  rec();
  return count;
}
/** the bedtime model: what each DRAWN card forces. A bath before pajamas (they go on a clean body); pajamas before any
 *  card in bed (you get into bed in them); a story in bed before falling asleep. Brushing teeth is forced only before
 *  the cards in bed, so a routine carrying it has more than one order (it refuses). */
const BED_RANK = { bath: 1, pajamas: 2, bed: 3, story: 3, asleep: 4 };
function bedBefore(a, b) {
  if (a === 'teeth' || b === 'teeth') return a === 'teeth' && (b === 'bed' || b === 'story' || b === 'asleep');
  return BED_RANK[a] < BED_RANK[b];
}

/* ================================================================ the pages */
const MODES = {};

/* ---------------------------------------------------------------- K-687 needs: what a body needs */
MODES.needs = function needs(d, rng) {
  const N = B.BODY_NEEDS;
  const food = rng.sample(N.food, d.needs - 2);
  const needsSet = [...food, N.water, N.air].map((x) => ({ ...x, need: true }));
  const wants = rng.sample(N.wants, d.wants).map((x) => ({ ...x, need: false }));
  const all = [...needsSet, ...wants];
  const cols = all.length === 6 ? 3 : 4;
  let order;
  for (let t = 0; t < 400; t++) {
    order = rng.shuffle(all);
    const bits = order.map((x) => x.need);
    if (patterned(bits)) continue;
    if ([bits.slice(0, cols), bits.slice(cols)].some((r) => r.every(Boolean) || r.every((b) => !b))) continue;   // a row of only needs / only wants
    if ([...Array(cols).keys()].every((c) => bits[c] === bits[c + cols])) continue;                              // the second row copies the first
    break;
  }
  const cardW = cols === 3 ? 200 : 154, picPx = cols === 3 ? 150 : (d.draw ? 118 : 138);
  // review round 1: the word "air" is printed under the swirl at EVERY level (without it the swirl reads as wind)
  const cell = (x) => box('dk-tile', '100%', '100%', col((x.drawn ? airSwirl(picPx) : pic(x.pic, picPx)) + (d.words || x.drawn ? `<span class="dk-word" data-dk-box>${esc(x.word)}</span>` : ''), 8),
    `data-dk-item="${x.id}" data-dk-answer="${x.need ? 'need' : 'want'}"`);
  const grid = `<div style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:repeat(${cols},${cardW}px);grid-template-rows:repeat(2,1fr);gap:14px 16px;justify-content:center">` +
    order.map(cell).join('') + '</div>';
  const draw = d.draw ? col(labelledDraw(W - 40, 196, 'one more food or drink', 'data-dk-prompt="food"'), 0) : '';
  return { html: grid + draw, meta: { cells: order.map((x) => (x.need ? 'N' : 'W') + ':' + x.id), cols } };
};

/* ---------------------------------------------------------------- K-688 wind: the wind watch */
/** a streamer on a stick: hanging down (calm), fluttering (breezy), flying straight out (windy) */
function streamer(state, px) {
  const s = px / 100, P = (pts) => pts.map(([x, y]) => `${f1(x * s)},${f1(y * s)}`).join(' ');
  const pole = `<line x1="${f1(20 * s)}" y1="${f1(6 * s)}" x2="${f1(20 * s)}" y2="${f1(96 * s)}" stroke="${T.teal}" stroke-width="${f1(5 * s)}" stroke-linecap="round"/>`;
  let d;
  if (state === 'calm') d = `M${P([[22, 8]])} C${P([[32, 26]])} ${P([[24, 44]])} ${P([[32, 62]])} L${P([[42, 60]])} C${P([[34, 42]])} ${P([[42, 24]])} ${P([[34, 8]])} Z`;
  else if (state === 'breezy') d = `M${P([[22, 8]])} C${P([[40, 14]])} ${P([[44, 32]])} ${P([[60, 38]])} C${P([[70, 42]])} ${P([[72, 54]])} ${P([[82, 60]])} L${P([[76, 70]])} C${P([[64, 64]])} ${P([[62, 52]])} ${P([[52, 48]])} C${P([[38, 42]])} ${P([[34, 26]])} ${P([[22, 20]])} Z`;
  else d = `M${P([[22, 8]])} C${P([[40, 0]])} ${P([[56, 18]])} ${P([[72, 8]])} C${P([[82, 2]])} ${P([[90, 10]])} ${P([[98, 6]])} L${P([[98, 18]])} C${P([[90, 22]])} ${P([[82, 14]])} ${P([[72, 20]])} C${P([[56, 30]])} ${P([[40, 12]])} ${P([[22, 20]])} Z`;
  return svg(px, px, pole + `<path d="${d}" fill="${T.coral}" stroke="${T.ink}" stroke-width="${f1(Math.max(1.5, 2 * s))}" stroke-linejoin="round"/>`, `data-dk-streamer="${state}"`);
}
const WIND_STATES = ['calm', 'breezy', 'windy'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
MODES.wind = function wind(d) {
  const key = box('dk-tile', W, 'auto', row(WIND_STATES.map((s) => col(streamer(s, d.extremes ? 58 : 82) + word(s), 2)).join(''), 70), 'data-dk-key="1"', 'padding:6px 0;background:#FFFFFF');
  const days = DAYS.slice(0, d.days);
  const sPx = d.days === 3 ? 112 : (d.extremes ? 60 : 80);
  const dayRow = (name) => band(row(
    `<div style="width:122px;display:flex;justify-content:center">${pill(name)}</div>` +
    WIND_STATES.map((s) => tile(streamer(s, sPx), sPx + 16, sPx + 8, `data-dk-choice="${s}"`, 'white')).join('') +
    (d.draw ? drawBox(d.extremes ? 190 : 160, d.extremes ? sPx + 32 : sPx + 8, 'data-dk-prompt="flag-or-tree"') : ''), 14), `data-dk-day="${name}"`);
  const ext = d.extremes ? col([['windy', 'windiest'], ['calm', 'calmest']].map(([s, w]) => row(tile(streamer(s, 46), 58, 54, `data-dk-extreme="${s}"`, 'white') +
    `<div style="width:86px">${word(w)}</div>` + DAYS.map((n) => pill(n.slice(0, 3), `data-dk-daychip="${n}"`)).join(''), 10)).join(''), 6) : '';
  return { html: key + grow(days.map(dayRow).join(''), 'gap:10px') + ext, meta: { days: d.days, record: true } };
};

/* ---------------------------------------------------------------- K-689 rain: the rain gauge */
/** a clear straight-sided cup, front view, with pieces of tape stuck across its front at 5 heights (the first low, so a
 *  rainy day's water reaches at least one) */
function rainCup(w, h, marks) {
  const x0 = 8, x1 = w - 8, top = 10, bot = h - 6;
  let s = `<path d="M${x0} ${top} L${x0} ${bot - 16} Q${x0} ${bot} ${x0 + 16} ${bot} L${x1 - 16} ${bot} Q${x1} ${bot} ${x1} ${bot - 16} L${x1} ${top}" fill="#FFFFFF" stroke="${T.teal}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<line x1="${x0 - 5}" y1="${top}" x2="${x0 + 5}" y2="${top}" stroke="${T.teal}" stroke-width="3.5" stroke-linecap="round"/><line x1="${x1 - 5}" y1="${top}" x2="${x1 + 5}" y2="${top}" stroke="${T.teal}" stroke-width="3.5" stroke-linecap="round"/>`;
  const first = bot - (bot - top) * 0.1, step = (first - top - (bot - top) * 0.1) / (marks - 1);
  for (let k = 0; k < marks; k++) {
    const y = first - k * step;
    s += `<rect x="${f1(x0 + 3)}" y="${f1(y - 4)}" width="${f1((x1 - x0) * 0.42)}" height="8" fill="${T.coral}" data-dk-tape="${k + 1}"/>`;
  }
  return svg(w, h, s, 'data-dk-cup="1"');
}
MODES.rain = function rain(d) {
  const cupW = d.cups === 2 ? 190 : 160, cupH = d.count ? 540 : 620;
  // review round 1: a rain picture beside every day (the cups alone read as jars or tubes)
  const colOf = (k) => col(row(pic(B.RAIN_CUE, 54) + pill('Day ' + k), 6) + `<div data-dk-box style="line-height:0">${rainCup(cupW, cupH, 5)}</div>` +
    (d.count ? row(head('marks') + numBox(64, 56), 8) : ''), 10);
  return { html: grow(row([...Array(d.cups).keys()].map((k) => colOf(k + 1)).join(''), d.cups === 2 ? 90 : 40, 'align-items:flex-start'), 'justify-content:flex-start'), meta: { cups: d.cups, record: true } };
};

/* ---------------------------------------------------------------- K-690 storm: getting ready for a storm */
MODES.storm = function storm(d, rng) {
  const rows = rng.sample(B.STORM_ROWS, d.rows);
  const at = placesFor(rows.length, 3, rng);
  const S = rows.length === 2 ? { tw: 140, th: 210, px: 128 } : d.draw ? { tw: 130, th: 110, px: 94 } : { tw: 140, th: 138, px: 116 };
  const html = rows.map((r, i) => {
    const wrong = rng.sample(r.wrong, 2);
    const ch = wrong.slice(); ch.splice(at[i], 0, r.safe);
    // the hot row: the sun AND a thermometer drawn full to the top (review round 1: the plain sun reads "sunny", and on a
    // sunny freezing day a coat is right); the library thermometer is only half full, so the primitive draws it
    const wpx = S.px - 18;
    const hotTh = (hgt) => thermometer({ value: 40, min: 0, max: 40, step: 10, height: 200, numerals: false }).svg
      .replace('width="110" height="200"', `width="${f1(hgt * 0.55)}" height="${f1(hgt)}" data-dk-hot="1"`);
    const wpic = r.thermo
      ? `<div style="display:flex;align-items:center;gap:0">${pic(r.weather, Math.round(wpx * 0.62))}${hotTh(Math.round(wpx * 0.9))}</div>`
      : pic(r.weather, wpx);
    return band(row(tile(col(wpic + `<span class="dk-word" data-dk-box${r.word.length > 8 ? ' style="font-size:15px"' : ''}>${esc(r.word)}</span>`, 2), S.tw, S.th, `data-dk-weather="${r.id}"`, 'lead') + arrowSvg(34, 30) +
      ch.map((c) => tile(pic(c.pic, S.px), S.tw, S.th, `data-dk-choice="${c.id}" data-dk-answer="${c.id === r.safe.id ? 'safe' : 'no'}"`, 'white')).join(''), 12),
    `data-dk-item="${r.id}"`);
  }).join('');
  const draw = d.draw ? labelledDraw(W - 40, 180, 'Tomorrow I will bring', 'data-dk-prompt="tomorrow"') : '';
  return { html: grow(html, 'gap:10px') + (draw ? col(draw, 0) : ''), meta: { rows: rows.map((r, i) => r.id + '@' + at[i]) } };
};

/* ---------------------------------------------------------------- K-691 eats: what do animals eat? */
MODES.eats = function eats(d, rng) {
  const L1 = ['rabbit', 'cow', 'lion', 'frog'];
  const pool = d.rows === 4 ? B.ANIMAL_FOOD.filter((a) => L1.includes(a.id)) : B.ANIMAL_FOOD;
  const animals = rng.shuffle(pool).slice(0, d.rows);
  const plan = animals.map((a) => {
    const right = rng.pick(a.right);
    const wrong = rng.sample(a.never.filter((f) => !right.includes(f)), 3 - right.length);
    return { a, right, wrong };
  });
  // where the right foods sit: a one-food row's food, a two-food row's WRONG food, each balanced over the page
  const one = plan.filter((p) => p.right.length === 1), two = plan.filter((p) => p.right.length === 2);
  const at1 = one.length ? placesFor(one.length, 3, rng) : [], at2 = two.length ? (two.length === 1 ? [rng.int(0, 2)] : placesFor(two.length, 3, rng)) : [];
  let i1 = 0, i2 = 0;
  for (const p of plan) {
    if (p.right.length === 1) { const ch = rng.shuffle(p.wrong); ch.splice(at1[i1++], 0, p.right[0]); p.choices = ch; }
    else { const ch = rng.shuffle(p.right); ch.splice(at2[i2++], 0, p.wrong[0]); p.choices = ch; }
  }
  const th = d.draw ? 92 : (d.rows === 4 ? 134 : 118), px = th - 14;
  const html = plan.map((p) => band(row(
    tile(pic(p.a.pic, px), th + 16, th, `data-dk-animal="${p.a.id}"`, 'lead') + arrowSvg(40, 30) +
    p.choices.map((f) => tile(pic(B.FOODS[f], px), th + 8, th, `data-dk-choice="${f}" data-dk-answer="${p.right.includes(f) ? 'eats' : 'no'}"`, 'white')).join(''), 14),
    `data-dk-item="${p.a.id}"`)).join('');
  const draw = d.draw ? labelledDraw(W - 40, 168, 'what our class animal (or the feeder birds) ate', 'data-dk-prompt="class-animal"') : '';
  return { html: grow(html, 'gap:8px') + (draw ? col(draw, 0) : ''), meta: { rows: plan.map((p) => p.a.id + ':' + p.choices.map((f) => (p.right.includes(f) ? '+' : '-') + f).join(',')) } };
};

/* ---------------------------------------------------------------- K-692 frog-home: build a home for a frog */
MODES['frog-home'] = function frogHome(d, rng) {
  const F = B.FROG_HOME;
  const animal = col(tile(pic(F.animal, 104), 128, 124, 'data-dk-animal="frog"', 'lead') + word('frog'), 4);
  let cards = [];
  if (d.cut) {
    if (d.misfit) {
      const mis = rng.sample(F.misfits, d.misfit);
      for (let t = 0; t < 400; t++) {
        cards = rng.shuffle([...F.fits.map((x) => ({ ...x, fit: true })), ...mis.map((x) => ({ ...x, fit: false }))]);
        const pos = cards.map((c, i) => (c.fit ? -1 : i)).filter((i) => i >= 0);
        if (pos.includes(0) && pos.includes(cards.length - 1)) continue;          // the two misfits at both ends
        if (pos[1] - pos[0] === 1) continue;                                       // side by side
        if (pos.every((i) => i < 4) || pos.every((i) => i >= 4)) continue;          // both in one row
        break;
      }
    } else {
      const need = (n) => rng.pick(F.fits.filter((x) => x.need === n));
      cards = rng.shuffle([need('water'), need('food'), need('home')].map((x) => ({ ...x, fit: true })));
    }
  }
  const meta = { cards: cards.map((c) => (c.fit ? '+' : '-') + c.id) };
  if (!d.cut) {
    // review round 1: the third word is "hiding place" (the whole drawing is the frog's home)
    const LBL = ['food', 'water', 'hiding place'];
    const labels = row(LBL.map((w) => row(`<span class="dk-word" data-dk-box data-dk-label="${w}" style="font-size:26px;line-height:32px;padding:4px 16px;border:2.5px solid ${T.teal};border-radius:10px;background:#FFFFFF">${w}</span>` + dot, 6)).join(''), 36);
    return { html: row(animal + labelledDraw(W - 160, 600, 'a home for a frog', 'data-dk-prompt="place"'), 16, 'align-items:flex-start') + grow(labels, 'justify-content:center'), meta: { ...meta, labels: LBL } };
  }
  // the cut-out cards fit INSIDE the glue box: level 1 three 150 cards (2 + 1), level 2 six 122 cards (3 + 3)
  const placeH = d.cut === 3 ? 560 : 470;
  const top = row(animal + labelledDraw(W - 160, placeH, 'the frog’s home', 'data-dk-prompt="place"'), 16, 'align-items:flex-start');
  const cw = d.cut === 3 ? 150 : 122, ch = cw, px = cw - 22;
  const per = d.cut === 3 ? 3 : 4;
  const rowsOf = [cards.slice(0, per), cards.slice(per)].filter((r) => r.length);
  const strip = col(`<div data-dk-box style="font:700 14px/16px 'Nunito',sans-serif;color:${T.inkSoft}">✂ cut out</div>` +
    rowsOf.map((r) => row(r.map((c) => box('dk-cut', cw, ch, pic(c.pic, px), `data-dk-card="${c.id}" data-dk-answer="${c.fit ? 'fit' : 'no'}"`)).join(''), 0)).join(''), 0);
  return { html: top + grow(strip, 'justify-content:flex-end'), meta };
};

/* ---------------------------------------------------------------- K-693 land: animals change the land */
/** the scene BEFORE an animal changed it, drawn in the animal-home language (same 120 viewBox, same strokes) */
function beforeScene(id, px) {
  const s = px / 120, O = f1(2 / s), D = f1(1.5 / s);
  const tuft = (x, y, h) => `<path d="M${x - 3} ${y} Q${x - 4} ${y - h / 2} ${x - 6} ${y - h} M${x} ${y} L${x} ${y - h - 2} M${x + 3} ${y} Q${x + 4} ${y - h / 2} ${x + 6} ${y - h}" fill="none" stroke="${T.teal}" stroke-width="${D}" stroke-linecap="round"/>`;
  let b = '';
  if (id === 'bare-ground') {
    b = `<rect x="0" y="64" width="120" height="56" fill="${T.creamDeep}"/><path d="M0 64 L120 64" stroke="${T.teal}" stroke-width="${O}"/>` +
      [[20, 80], [46, 96], [80, 84], [100, 106], [30, 110], [64, 112]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.6" fill="${T.grid}"/>`).join('');
  } else if (id === 'bare-branch') {
    b = `<path d="M2 92 L114 70 L118 77 L6 100 Z" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="${O}" stroke-linejoin="round"/>` +
      `<path d="M100 74 L112 58" fill="none" stroke="${T.teal}" stroke-width="${O}" stroke-linecap="round"/>` +
      `<path d="M112 58 C114 46 120 44 119 38 C112 40 106 48 112 58 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="${D}"/>` +
      `<path d="M12 96 C6 104 8 112 2 116 C12 114 18 104 12 96 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="${D}"/>`;
  } else if (id === 'stream') {
    b = `<rect x="0" y="60" width="120" height="46" fill="${T.tealSoft}"/><path d="M0 106 Q30 102 60 106 T120 106 L120 120 L0 120 Z" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="${D}"/>` +
      `<path d="M0 60 L120 60" fill="none" stroke="${T.teal}" stroke-width="${O}"/>` +
      `<path d="M8 74 q4 -3 8 0 t8 0 M60 80 q4 -3 8 0 t8 0 M96 72 q4 -3 8 0 t6 0 M30 92 q4 -3 8 0 t8 0 M84 94 q4 -3 8 0" fill="none" stroke="${T.teal}" stroke-width="${D}" stroke-linecap="round"/>`;
  } else if (id === 'lawn') {
    b = `<rect x="0" y="38" width="120" height="82" fill="${T.creamDeep}"/><path d="M0 38 L120 38" stroke="${T.teal}" stroke-width="${O}"/>` +
      [[16, 64], [34, 100], [104, 56], [14, 108], [110, 112], [70, 80]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.6" fill="${T.grid}"/>`).join('') +
      tuft(14, 38, 7) + tuft(36, 38, 8) + tuft(58, 38, 6) + tuft(84, 38, 7) + tuft(106, 38, 8);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 120 120" style="display:block" data-dk-before="${id}">${b}</svg>`;
}
/** the rabbit's change (review round 1): the same lawn with a BIG round hole at ground level and the dug-out dirt beside
 *  it, no tunnel (the habitats burrow and the anthill both show tunnels, so the burrow could be matched to the ant) */
function rabbitHole(px) {
  const s = px / 120, O = f1(2 / s), D = f1(1.5 / s);
  const tuft = (x, y, h) => `<path d="M${x - 3} ${y} Q${x - 4} ${y - h / 2} ${x - 6} ${y - h} M${x} ${y} L${x} ${y - h - 2} M${x + 3} ${y} Q${x + 4} ${y - h / 2} ${x + 6} ${y - h}" fill="none" stroke="${T.teal}" stroke-width="${D}" stroke-linecap="round"/>`;
  const b = `<rect x="0" y="38" width="120" height="82" fill="${T.creamDeep}"/><path d="M0 38 L120 38" stroke="${T.teal}" stroke-width="${O}"/>` +
    [[16, 64], [104, 70], [14, 108], [110, 112]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.6" fill="${T.grid}"/>`).join('') +
    `<path d="M74 39 Q86 18 104 22 Q116 26 118 39 Z" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="${O}" stroke-linejoin="round" data-dk-dirt="1"/>` +
    [[84, 32], [96, 28], [106, 33], [92, 36]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${T.grid}"/>`).join('') +
    `<ellipse cx="44" cy="52" rx="30" ry="20" fill="${T.ink}" stroke="${T.teal}" stroke-width="${O}" data-dk-hole="1"/>` +
    tuft(8, 38, 8) + tuft(22, 30, 7) + tuft(64, 32, 7) + tuft(70, 38, 6);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 120 120" style="display:block" data-dk-afterdrawn="rabbit-hole">${b}</svg>`;
}
MODES.land = function land(d, rng) {
  // never offer as the extra an animal whose change looks like one on the page (the ant or the beaver, read as a
  // groundhog, beside the rabbit's hole; the rabbit beside the anthill): a draw with no allowed extra is drawn again
  let pairs, rest;
  for (let t = 0; t < 400; t++) {
    pairs = rng.sample(B.LAND_CHANGES, d.pairs);
    const banned = new Set(pairs.flatMap((p) => p.noExtraWith || []));
    rest = B.LAND_CHANGES.filter((p) => !pairs.includes(p) && !banned.has(p.id));
    if (rest.length >= (d.extra || 0)) break;
  }
  if (rest.length < (d.extra || 0)) throw new Error('dk-kinder land: no allowed extra animal (refuse)');
  const animals = pairs.map((p) => ({ p, own: true })).concat(rng.sample(rest, d.extra || 0).map((p) => ({ p, own: false })));
  let order;
  if (animals.length === pairs.length) order = derange(animals.length, rng).map((i) => animals[i]);
  else for (let t = 0; t < 400; t++) { order = rng.shuffle(animals); if (order.every((a, i) => !(a.own && i < pairs.length && pairs[i] === a.p))) break; }
  const tH = d.draw ? 112 : (d.pairs === 2 ? 160 : 142), spacer = d.pairs === 2 ? 56 : 96;
  const left = pairs.map((p) => row(tile(beforeScene(p.before, tH - 12), tH, tH, `data-dk-before-tile="${p.id}"`, 'white') + arrowSvg(40, 30) +
    tile(p.home === 'rabbit-hole' ? rabbitHole(tH - 12) : animalHome({ id: p.home, px: Math.max(72, tH - 12) }).svg, tH, tH, `data-dk-after="${p.id}"`, 'white') + dot, 10)).join('');
  const right = order.map((a) => row(dot + tile(pic(a.p.animal, tH - 18), tH, tH, `data-dk-maker="${a.p.id}" data-dk-own="${a.own ? 1 : 0}"`, 'lead'), 10)).join('');
  const body = row(`<div style="display:flex;flex-direction:column;justify-content:space-around;height:100%">${left}</div>` +
    `<div style="width:${spacer}px"></div>` +
    `<div style="display:flex;flex-direction:column;justify-content:space-between;height:100%">${right}</div>`, 0, 'flex:1 1 auto;align-items:stretch;min-height:0');
  const draw = d.draw ? row(labelledDraw((W - 60) / 2, 186, 'the change', 'data-dk-prompt="change"') + labelledDraw((W - 60) / 2, 186, 'the animal', 'data-dk-prompt="animal"'), 20) : '';
  return { html: body + draw, meta: { pairs: pairs.map((p) => p.id), right: order.map((a) => a.p.id + (a.own ? '' : '*')) } };
};

/* ---------------------------------------------------------------- K-694 pushpull: push or pull? */
/**
 * One action card. PUSH: the person walks BEHIND the thing, hands on it, and it moves on in front of them. PULL: the
 * person walks IN FRONT, a rope from the person's back hand to the thing, and it follows behind. The arrow shows where
 * the thing moves. `flip` mirrors the whole card (they then walk to the left). The answer is what the drawing shows.
 */
function actionCard(item, w, h, flip) {
  const fig = h * 0.82, obj = h * 0.66, base = h - 6, u = fig / 100;
  let inner = `<line x1="0" y1="${f1(base)}" x2="${f1(w)}" y2="${f1(base)}" stroke="${T.grid}" stroke-width="2.5"/>`;
  const walker = (x) => `<g transform="translate(${f1(x)} ${f1(base - fig)}) scale(${f1(u)})">${glyphGroup({ pose: 'walking' })}</g>`;
  const ay = Math.max(14, base - obj - 14);
  if (item.act === 'push') {
    const fx = 0, ox = fx + 70 * u;                                       // the front hand (75,49) lies on the thing
    inner += svgPic(item.pic, ox, base - obj, obj, obj, 'xMinYMax');
    inner += walker(fx);
    inner += arrow(ox + obj * 0.2, ay, w - 4, ay, { sw: 5, head: 15, attrs: 'data-dk-move="ahead"' });
  } else {
    const fx = w - 80 * u, ox = 2;                                        // the back hand (35,50) holds the rope
    inner += svgPic(item.pic, ox, base - obj, obj, obj, 'xMaxYMax');
    // the rope sags a little (review round 1: a straight line read as a stick or a handle, and a handle can push)
    const rx0 = ox + obj * 0.9, ry0 = base - obj * 0.45, rx1 = fx + 35 * u, ry1 = base - fig + 50 * u;
    inner += `<path d="M${f1(rx0)} ${f1(ry0)} Q${f1((rx0 + rx1) / 2)} ${f1(Math.max(ry0, ry1) + h * 0.12)} ${f1(rx1)} ${f1(ry1)}" fill="none" stroke="${T.ink}" stroke-width="3" stroke-linecap="round" data-dk-rope="1"/>`;
    inner += walker(fx);
    inner += arrow(ox + obj * 0.15, ay, fx - 6, ay, { sw: 5, head: 15, attrs: 'data-dk-move="behind"' });
  }
  const body = flip ? `<g transform="translate(${w} 0) scale(-1 1)">${inner}</g>` : inner;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block" data-dk-action="${item.act}">${body}</svg>`;
}
/** the key pictogram on a bin: the same grammar small (a walker and a box) */
function binIcon(kind) {
  const w = 96, h = 40, u = 0.36, base = 38;
  const walker = (x) => `<g transform="translate(${f1(x)} ${f1(base - 100 * u)}) scale(${u})">${glyphGroup({ pose: 'walking' })}</g>`;
  const boxR = (x) => `<rect x="${x}" y="${base - 20}" width="22" height="20" rx="2" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2"/>`;
  return svg(w, h, kind === 'push'
    ? walker(0) + boxR(25) + arrow(52, 14, 94, 14, { sw: 3.5, head: 10 })
    : boxR(2) + `<path d="M24 ${base - 10} Q${f1((24 + 60 + 35 * u) / 2)} ${base - 2} ${f1(60 + 35 * u)} ${f1(base - 100 * u + 50 * u)}" fill="none" stroke="${T.ink}" stroke-width="2"/>` + walker(60) + arrow(4, 8, 54, 8, { sw: 3.5, head: 10 }));
}
MODES.pushpull = function pushpull(d, rng) {
  const push = rng.sample(B.PUSH_PULL.filter((x) => x.act === 'push'), d.cards / 2);
  const pull = rng.sample(B.PUSH_PULL.filter((x) => x.act === 'pull'), d.cards / 2);
  const binsLeft = rng.int(0, 1) ? ['push', 'pull'] : ['pull', 'push'];
  // wide cards (a person and a thing side by side): 2 a row at level 1, 3 a row otherwise
  const cols = d.cards === 4 ? 2 : 3;
  const sideOf = (i) => { const c = i % cols; return c * 2 < cols - 1 ? 0 : c * 2 > cols - 1 ? 1 : -1; };
  let order;
  for (let t = 0; t < 400; t++) {
    order = rng.shuffle([...push, ...pull]).map((x) => ({ ...x, flip: rng.int(0, 1) === 1 }));
    const bits = order.map((x) => x.act === 'push');
    if (patterned(bits)) continue;
    // the bins never line up with the answers: the pictures on the left side are not all the left bin's, nor all the right's
    const sided = order.map((x, i) => [x, sideOf(i)]).filter(([, sd]) => sd >= 0);
    const aligned = sided.filter(([x, sd]) => binsLeft[sd] === x.act).length;
    if (aligned === sided.length || aligned === 0) continue;
    const rowsOf = []; for (let i = 0; i < order.length; i += cols) rowsOf.push(order.slice(i, i + cols));
    if (rowsOf.length > 1 && rowsOf.some((r) => r.length > 1 && r.every((x) => x.act === r[0].act))) continue;
    if (order.every((x) => x.flip === order[0].flip)) continue;
    break;
  }
  const S = d.cards === 4 ? { cw: 306, ch: 248 } : d.draw ? { cw: 212, ch: 138 } : { cw: 212, ch: 166 };
  const rows = []; for (let i = 0; i < order.length; i += cols) rows.push(order.slice(i, i + cols));
  const strip = col(rows.map((r) => row(r.map((x) => box('dk-tile dk-tile--white', S.cw, S.ch, col(actionCard(x, S.cw - 14, S.ch - 30, x.flip) + dot, 4),
    `data-dk-item="${x.id}" data-dk-answer="${x.act}"`)).join(''), 10)).join(''), 10);
  // review round 1: the targets are compact (the key pictogram + the word, a big dot to draw the line to), never a big
  // empty frame (it read as a drawing box, and at level 3 sat over the drawing boxes)
  const bins = row(binsLeft.map((k) => box('dk-tile dk-tile--lead', 250, 92, col(`<span style="display:block;width:20px;height:20px;border-radius:50%;background:${T.coral}" data-dk-box data-dk-target-dot="1"></span>` +
    row(binIcon(k) + `<span class="dk-head" style="font-size:26px;line-height:30px">${esc(k)}</span>`, 10), 4), `data-dk-bin="${k}"`)).join(''), 80);
  const draw = d.draw ? row(['push', 'pull'].map((k) => labelledDraw((W - 40) / 2, 190, 'a ' + k + ' I did', `data-dk-prompt="${k}"`)).join(''), 20) : '';
  return { html: strip + grow(bins, 'justify-content:center') + draw, meta: { items: order.map((x) => x.act + ':' + x.id + (x.flip ? '~' : '')), bins: binsLeft.join(','), cols } };
};

/* ---------------------------------------------------------------- K-695 harder push: a harder push, a farther roll */
MODES['harder-push'] = function harderPush(d) {
  const tests = d.tests === 2 ? [['gentle', 66], ['hard', 136]] : [['gentle', 56], ['medium', 96], ['hard', 136]];
  // review round 1: a hard push rolls past 10 tiles, so the strip ends in a "past the end" box with an arrow
  const tiles = 10, tileW = d.count ? 33 : 40, endW = d.count ? 34 : 40, stripW = tiles * tileW + 24 + endW, stripH = d.tests === 2 ? 150 : (d.count ? 104 : 118);
  const hall = () => {
    const x10 = 24 + tiles * tileW;
    let t = `<rect x="1" y="1" width="${x10 - 1}" height="${stripH - 2}" rx="6" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/>`;
    t += `<rect x="${x10 + 3}" y="1" width="${endW - 4}" height="${stripH - 2}" rx="6" fill="#FFFFFF" stroke="${T.coral}" stroke-width="2.5" stroke-dasharray="6 4" data-dk-pastend="1"/>` +
      arrow(x10 + 9, stripH / 2, x10 + endW - 5, stripH / 2, { stroke: T.coral, sw: 3, head: 9 });
    for (let k = 1; k < tiles; k++) t += `<line x1="${24 + k * tileW}" y1="3" x2="${24 + k * tileW}" y2="${stripH - 3}" stroke="${T.grid}" stroke-width="1.5"/>`;
    t += `<line x1="24" y1="1" x2="24" y2="${stripH - 1}" stroke="${T.ink}" stroke-width="4" data-dk-start="1"/>`;
    t += `<circle cx="13" cy="${stripH / 2}" r="9" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.5" data-dk-ball="1"/>`;
    return svg(stripW, stripH, t, 'data-dk-hall="1"');
  };
  const rowOf = ([name, L]) => band(row(col(pill(name) + `<div data-dk-box style="line-height:0">${outlineArrow(L)}</div>`, 8, 'width:140px') +
    `<div data-dk-box style="line-height:0">${hall()}</div>` + (d.count ? col(head('tiles') + numBox(52, 50), 2) : ''), 8), `data-dk-test="${name}"`);
  return { html: grow(tests.map(rowOf).join(''), 'gap:14px'), meta: { tests: tests.map((t) => t[0]), record: true } };
};

/* ---------------------------------------------------------------- K-696 direction: change its direction */
const DIRS = { back: [-1, 0], up: [0, -1], down: [0, 1], on: [1, 0] };
/** the ball against the thing it meets, seen from above. `incoming`: the roll so far (three faint balls behind it);
 *  `out`: one arrow leaving the ball (an option panel). */
function directionScene(item, w, h, { incoming = true, out = null } = {}) {
  // every part stays inside the panel: the ghosts behind the ball, the thing in front, the arrow out of it
  const r = Math.min(20, Math.round(h * 0.06) + 6), gap = 2.2 * r, t = 12, cy = h / 2;
  const cx = incoming ? Math.max(0.5 * w, 3 * gap + r + 6) : 0.46 * w;
  let s = `<rect x="0" y="0" width="${w}" height="${h}" rx="8" fill="${T.cream}"/>`;
  // review round 1: the floor is drawn as square TILES seen from above (the slanted blocks read as ramps in a side view)
  for (let x = 28; x < w; x += 28) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${T.creamDeep}" stroke-width="2" data-dk-floortile="1"/>`;
  for (let y = 28; y < h; y += 28) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${T.creamDeep}" stroke-width="2"/>`;
  if (incoming) {
    for (const k of [3, 2, 1]) s += `<circle cx="${f1(cx - k * gap)}" cy="${f1(cy)}" r="${r}" fill="#FFFFFF" stroke="${T.grid}" stroke-width="2" stroke-dasharray="4 3" data-dk-ghost="${k}"/>`;
    s += `<path d="M${f1(cx - 1.3 * r)} ${f1(cy - r * 0.7)} l ${f1(-r * 0.6)} 0 M${f1(cx - 1.3 * r)} ${f1(cy + r * 0.7)} l ${f1(-r * 0.6)} 0" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linecap="round"/>`;
  }
  if (item.obstacle === 'wall') s += `<rect x="${f1(cx + r)}" y="${f1(cy - h * 0.38)}" width="${2 * t}" height="${f1(h * 0.76)}" fill="${T.grid}" stroke="${T.teal}" stroke-width="2.5" data-dk-obstacle="wall"/>`;
  else if (item.obstacle === 'slant-up' || item.obstacle === 'slant-down') {
    const bx = cx + Math.SQRT2 * (r + t);
    const L = Math.min(h * 0.8, 2 * ((w - 4 - bx) / Math.SQRT1_2 - t), 2 * ((h / 2 - 4) / Math.SQRT1_2 - t));
    s += `<rect x="${f1(bx - t)}" y="${f1(cy - L / 2)}" width="${2 * t}" height="${f1(L)}" fill="${T.grid}" stroke="${T.teal}" stroke-width="2.5" transform="rotate(${item.obstacle === 'slant-up' ? 45 : -45} ${f1(bx)} ${f1(cy)})" data-dk-obstacle="${item.obstacle}"/>`;
  } else if (item.obstacle === 'hand') {
    const hw = Math.min(h * 0.66, w - (cx + r) - 4);
    s += svgPic({ theme: 'body parts', noun: 'hand' }, cx + r, cy - hw / 2, hw, hw, 'xMinYMid') + '<g data-dk-obstacle="hand"></g>';
    // the hand PUSHES (review round 1: a still open hand only stops the ball): motion lines behind it
    const mx = Math.min(w - 6, cx + r + hw * 0.92);
    s += `<path d="M${f1(mx)} ${f1(cy - hw * 0.22)} l ${f1(-hw * 0.14)} 0 M${f1(mx)} ${f1(cy)} l ${f1(-hw * 0.18)} 0 M${f1(mx)} ${f1(cy + hw * 0.22)} l ${f1(-hw * 0.14)} 0" stroke="${T.ink}" stroke-width="3" stroke-linecap="round" data-dk-push="1"/>`;
  }
  s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${r}" fill="${T.coral}" stroke="${T.ink}" stroke-width="2" data-dk-ball="1"/>`;
  if (out) {
    const [dx, dy] = DIRS[out];
    const room = dx < 0 ? cx - r - 10 : dx > 0 ? w - (cx + r) - 10 : cy - r - 10;
    const len = Math.min(dx ? w * 0.38 : h * 0.36, room);
    s += arrow(cx + dx * (r + 4), cy + dy * (r + 4), cx + dx * (r + 4 + len), cy + dy * (r + 4 + len), { stroke: T.ink, sw: 5, head: 15, attrs: `data-dk-out="${out}"` });
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;overflow:hidden" data-dk-scene="${item.obstacle}">${s}</svg>`;
}
MODES.direction = function direction(d, rng) {
  const items = rng.sample(B.DIRECTION, d.cards);
  let html, meta;
  if (d.options) {
    // level 1: the situation, and two pictures of where the ball might go; the right one is left or right by the rng
    const sides = placesFor(items.length, 2, rng);
    html = items.map((it, i) => {
      const opts = [it.wrong]; opts.splice(sides[i], 0, it.right);
      // review round 1: no connector arrow on a page where the answers are arrows: a dotted divider, then A "or" B
      const optTile = (o) => tile(directionScene(it, 150, 190, { incoming: false, out: o }), 162, 202, `data-dk-option="${o}" data-dk-answer="${o === it.right ? 'right' : 'no'}"`, 'white');
      return band(row(tile(directionScene(it, 236, 250), 248, 262, 'data-dk-situation="1"', 'white') +
        `<div style="width:0;height:220px;border-left:3px dotted ${T.grid}"></div>` + optTile(opts[0]) + `<span class="dk-head" data-dk-box>or</span>` + optTile(opts[1]), 10),
      `data-dk-item="${it.id}"`);
    }).join('');
    meta = { items: items.map((it, i) => it.id + ':' + it.right + '@' + sides[i]) };
    return { html: grow(html, 'gap:16px'), meta };
  }
  const sw = 316, sh = d.game ? 250 : 320;
  const card = (it) => tile(directionScene(it, sw, sh), sw + 12, sh + 12, `data-dk-item="${it.id}" data-dk-answer="${it.right}"`, 'white');
  const cards = items.length === 4 ? col(row(card(items[0]) + card(items[1]), 14) + row(card(items[2]) + card(items[3]), 14), 14) : row(items.map(card).join(''), 14);
  const game = d.game ? labelledDraw(W - 40, 440, 'my ball game', 'data-dk-prompt="ball-game"') : '';
  return { html: grow(cards + (game ? col(game, 0) : ''), 'gap:14px'), meta: { items: items.map((i) => i.id + ':' + i.right) } };
};

/* ---------------------------------------------------------------- ramps (K-697 / K-698) */
/** a ramp seen from the side: a board from the top of a block stack down to the floor, a ball at the top, and at the
 *  end a paper cup ('cup') or a tower of three blocks ('tower'). turn: a curved arrow (the ramp turned); wall: a wall of
 *  blocks behind the cup. */
function rampScene(w, h, { blocks = 1, end = 'cup', turn = false, wall = false } = {}) {
  const floor = h - 6, bw = w * 0.13, bh = h * 0.15;
  let s = `<line x1="0" y1="${f1(floor)}" x2="${f1(w)}" y2="${f1(floor)}" stroke="${T.grid}" stroke-width="2.5"/>`;
  for (let k = 0; k < blocks; k++) s += `<rect x="6" y="${f1(floor - (k + 1) * bh)}" width="${f1(bw)}" height="${f1(bh)}" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2"/>`;
  const topY = floor - blocks * bh, endX = w * 0.6;
  s += `<line x1="8" y1="${f1(topY)}" x2="${f1(endX)}" y2="${f1(floor - 3)}" stroke="${T.ink}" stroke-width="${f1(Math.max(5, h * 0.035))}" stroke-linecap="round"/>`;
  s += `<circle cx="${f1(8 + bw * 0.55)}" cy="${f1(topY - h * 0.07)}" r="${f1(h * 0.065)}" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.5"/>`;
  if (end === 'cup') {
    // with a wall, the cup moves left so the wall of blocks behind it stays inside the drawing
    const cw = w * 0.16, ch = h * 0.3, cx = wall ? w * 0.7 : w * 0.82;
    if (wall) for (let k = 0; k < 2; k++) for (let j = 0; j < 2; j++) s += `<rect x="${f1(cx + cw * 0.6 + j * w * 0.075)}" y="${f1(floor - (k + 1) * bh)}" width="${f1(w * 0.075)}" height="${f1(bh)}" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/>`;
    s += `<path d="M${f1(cx - cw / 2)} ${f1(floor)} L${f1(cx - cw * 0.4)} ${f1(floor - ch)} L${f1(cx + cw * 0.4)} ${f1(floor - ch)} L${f1(cx + cw / 2)} ${f1(floor)} Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round" data-dk-cupend="1"/>`;
  } else for (let k = 0; k < 3; k++) s += `<rect x="${f1(w * 0.82)}" y="${f1(floor - (k + 1) * bh)}" width="${f1(w * 0.12)}" height="${f1(bh)}" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2" data-dk-towerblock="${k + 1}"/>`;
  if (turn) s += `<path d="M${f1(w * 0.28)} ${f1(h * 0.34)} q ${f1(w * 0.18)} ${f1(-h * 0.22)} ${f1(w * 0.36)} ${f1(-h * 0.02)}" fill="none" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>` +
    `<polygon points="${f1(w * 0.66)},${f1(h * 0.33)} ${f1(w * 0.6)},${f1(h * 0.24)} ${f1(w * 0.58)},${f1(h * 0.36)}" fill="${T.teal}"/>`;
  return svg(w, h, s, `data-dk-ramp="${blocks}"`);
}
/** a ramp seen from ABOVE (review round 1: a side view cannot show a turn or guide walls). The board is a long bar from
 *  its raised end (a block, the ball on it) toward a paper cup (a ring). turn: the cup sits off the straight line, the old
 *  board is a dashed outline, the new one points at the cup, a curved arrow swings its end; walls: two rows of blocks
 *  along both sides of the ball's path to the cup. */
function rampTop(w, h, { turn = false, walls = false } = {}) {
  const y0 = turn ? h * 0.66 : h / 2, x0 = 14, L = w * 0.5, bw = 16;
  const cup = turn ? [w * 0.78, h * 0.24] : [w * 0.84, y0];
  let s = `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="6" fill="#FFFFFF" stroke="${T.grid}" stroke-width="1.5"/>`;
  const board = (ang, dash) => `<g transform="rotate(${f1(ang)} ${f1(x0)} ${f1(y0)})"><rect x="${f1(x0)}" y="${f1(y0 - bw / 2)}" width="${f1(L)}" height="${bw}" rx="3" fill="${dash ? 'none' : T.creamDeep}" stroke="${dash ? T.grid : T.ink}" stroke-width="${dash ? 2 : 2.5}"${dash ? ' stroke-dasharray="5 4"' : ''}/></g>`;
  if (turn) {
    const ang = Math.atan2(cup[1] - y0, cup[0] - x0) * 180 / Math.PI;
    s += board(0, true) + board(ang, false);
    const a1 = [x0 + L + 4, y0], rad = ang * Math.PI / 180, a2 = [x0 + (L + 6) * Math.cos(rad), y0 + (L + 6) * Math.sin(rad)];
    s += `<path d="M${f1(a1[0])} ${f1(a1[1])} Q${f1(a1[0] + 10)} ${f1((a1[1] + a2[1]) / 2)} ${f1(a2[0] + 4)} ${f1(a2[1] + 8)}" fill="none" stroke="${T.teal}" stroke-width="3.5" stroke-linecap="round"/>` +
      arrow(a2[0] + 6, a2[1] + 12, a2[0] + 1, a2[1] + 2, { stroke: T.teal, sw: 3.5, head: 9 });
  } else s += board(0, false);
  if (walls) {
    // two rows of blocks along BOTH sides of the ball's path, from beside the board to the cup: a channel that guides it
    const xs = x0 + 20, xe = cup[0] + 4, bwk = 15, n = Math.floor((xe - xs) / (bwk + 4));
    for (const dy of [-21, 21]) for (let k = 0; k < n; k++) s += `<rect x="${f1(xs + k * (bwk + 4))}" y="${f1(y0 + dy - 6)}" width="${bwk}" height="12" rx="2" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.8" data-dk-guidewall="1"/>`;
  }
  s += `<rect x="${x0 - 8}" y="${f1(y0 - 13)}" width="26" height="26" rx="3" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2"/>` +
    `<circle cx="${x0 + 5}" cy="${f1(y0)}" r="8" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.5"/>` +
    `<circle cx="${f1(cup[0])}" cy="${f1(cup[1])}" r="14" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/><circle cx="${f1(cup[0])}" cy="${f1(cup[1])}" r="9" fill="none" stroke="${T.teal}" stroke-width="1.5" data-dk-cuptop="1"/>`;
  return svg(w, h, s, `data-dk-ramptop="${turn ? 'turned' : walls ? 'walls' : 'straight'}"`);
}
/** "it worked" (a check) and "try again" (a round arrow) as two chips to circle */
const workedChips = (gap = 26) => row(pill('✓ it worked', 'data-dk-chip="worked"') + pill('↻ try again', 'data-dk-chip="again"'), gap);
MODES.ramp = function ramp(d) {
  const html = [];
  if (d.tries === 2) {
    const tryCol = (k) => col(labelledDraw((W - 40) / 2, 610, 'Try ' + k, `data-dk-prompt="try${k}"`) + workedChips(10), 12);
    html.push(row(tryCol(1) + tryCol(2), 20, 'align-items:flex-start'));
  } else {
    html.push(labelledDraw(W - 40, d.change === 'circle' ? 370 : 300, 'My ramp', 'data-dk-prompt="ramp"'));
    html.push(workedChips());
    if (d.change === 'circle') {
      // review round 1: "turned" and "walls" are drawn from ABOVE (a side view cannot show them), "higher" from the side,
      // and an empty box takes another change
      const tw = 150, th = 156;
      const ch = [['higher', rampScene(tw - 10, th - 10, { blocks: 3 })], ['turned', rampTop(tw - 10, th - 10, { turn: true })], ['walls', rampTop(tw - 10, th - 10, { walls: true })]];
      html.push(col(head('My change') + row(ch.map(([k, art]) => col(tile(art, tw, th, `data-dk-change="${k}"`, 'white') + word(k), 2)).join('') +
        col(drawBox(tw, th, 'data-dk-prompt="another-change"') + word('another'), 2), 12), 6));
    } else html.push(labelledDraw(W - 40, 300, 'My change', 'data-dk-prompt="change"'));
  }
  return { html: grow(html.map((h) => col(h, 0)).join(''), 'gap:12px'), meta: { record: true, tries: d.tries || 1 } };
};
MODES.ramps = function ramps(d, rng) {
  const sides = rng.int(0, 1) ? [1, 3] : [3, 1];
  const colOf = (blocks) => {
    const rh = d.tries === 1 ? 330 : (d.total ? 210 : 290);
    const parts = [tile(rampScene(300, rh - 16, { blocks, end: 'tower' }), 318, rh, `data-dk-rampcard="${blocks}"`, 'white')];
    if (d.tries === 1) parts.push(col(head('blocks that fell') + svg(104, 262, [0, 1, 2].map((k) => `<rect x="4" y="${f1(4 + k * 85)}" width="96" height="83" fill="#FFFFFF" stroke="${T.teal}" stroke-width="3" data-dk-colorblock="${3 - k}"/>`).join('')).replace('<svg ', '<svg data-dk-box '), 8));
    else parts.push(col([1, 2, 3].map((k) => row(head('Try ' + k) + box('dk-tile', 190, d.total ? 64 : 100, '', `data-dk-tally="${k}"`, 'background:#FFFFFF'), 10)).join(''), 10));
    if (d.total) parts.push(row(head('total') + numBox(64, 54), 10));
    return col(parts.join(''), 12, 'flex:1 1 0');
  };
  const cols = row(sides.map(colOf).join(''), 24, 'align-items:flex-start');
  const imp = d.improve ? labelledDraw(W - 40, 150, 'a way to make a ramp better', 'data-dk-prompt="better"') : '';
  return { html: grow(cols + (imp ? col(imp, 0) : ''), d.improve ? 'gap:12px' : 'justify-content:flex-start'), meta: { record: true, sides: sides.join(',') } };
};

/* ---------------------------------------------------------------- boats (K-699 .. K-701) */
/** a boat seen from the side: flat (a raft), sides (a boat with sides), tall (taller sides), wide (a flatter, wider
 *  bottom); water = a water band under it */
function boatOutline(w, h, kind = 'sides', water = false) {
  const wl = h * 0.66;
  let s = '';
  if (water) s += `<rect x="0" y="${f1(wl)}" width="${f1(w)}" height="${f1(h - wl)}" fill="${T.tealSoft}"/><path d="M0 ${f1(wl)} q ${f1(w / 8)} -7 ${f1(w / 4)} 0 t ${f1(w / 4)} 0 t ${f1(w / 4)} 0 t ${f1(w / 4)} 0" fill="none" stroke="${T.teal}" stroke-width="2.5"/>`;
  const G = {
    flat: { x0: 0.1, x1: 0.9, bot: wl + h * 0.05, top: wl - h * 0.06, inset: 0 },
    sides: { x0: 0.14, x1: 0.86, bot: wl + h * 0.1, top: wl - h * 0.24, inset: 0.08 },
    tall: { x0: 0.2, x1: 0.8, bot: wl + h * 0.1, top: wl - h * 0.46, inset: 0.05 },
    wide: { x0: 0.04, x1: 0.96, bot: wl + h * 0.07, top: wl - h * 0.14, inset: 0.05 },
  }[kind];
  const x0 = w * G.x0, x1 = w * G.x1, ins = w * G.inset;
  const d = kind === 'flat' ? `M${f1(x0)} ${f1(G.top)} L${f1(x1)} ${f1(G.top)} L${f1(x1)} ${f1(G.bot)} L${f1(x0)} ${f1(G.bot)} Z`
    : `M${f1(x0)} ${f1(G.top)} L${f1(x0 + ins)} ${f1(G.bot)} L${f1(x1 - ins)} ${f1(G.bot)} L${f1(x1)} ${f1(G.top)}`;
  s += `<path d="${d}" fill="${kind === 'flat' ? T.creamDeep : '#FFFFFF'}" stroke="${T.ink}" stroke-width="${f1(Math.max(3, h * 0.016))}" stroke-linejoin="round" stroke-linecap="round" data-dk-hull="${kind}"/>`;
  return svg(w, h, s, `data-dk-boat="${kind}"`);
}
MODES['boat-plan'] = function boatPlan(d) {
  const top = row(col(tile(pic(B.BOAT.bear, 96), 120, 116, 'data-dk-bear="1"', 'lead') + word('our bear'), 4) +
    `<div style="width:4px"></div>` +
    B.BOAT.materials.map((m) => tile(pic(m, 84), 96, 96, `data-dk-material="${m.noun}"`, 'white')).join('') +
    [...Array(B.BOAT.drawBoxes).keys()].map((k) => drawBox(96, 96, `data-dk-prompt="material-${k + 1}"`)).join(''), 8, 'align-items:flex-start');
  const bigH = d.label ? 430 : 540;
  const big = d.outline
    ? box('dk-draw', W - 40, bigH, `<span class="dk-head" style="position:absolute;left:12px;top:6px">our boat</span><div style="position:absolute;left:0;right:0;top:40px;bottom:10px;display:flex;align-items:center;justify-content:center">${boatOutline(560, 420, 'sides', true)}</div>`, 'data-dk-draw data-dk-prompt="boat"')
    : labelledDraw(W - 40, bigH, 'my boat', 'data-dk-prompt="boat"');
  const label = d.label ? row(B.BOAT.labels.map((l) => pill(l, `data-dk-labelword="${l}"`)).join('') + `<div data-dk-box style="line-height:0">${writeRow(320, 84)}</div>`, 14) : '';
  return { html: top + grow(col(big, 0) + label, 'gap:12px;justify-content:flex-end'), meta: { record: true } };
};
/** the bear after the test: dry (sitting high in its boat, above the water) or wet (low, the water over it) */
function bearTest(dry, w, h) {
  const wl = h * 0.62, bearPx = h * 0.58, bx = w / 2 - bearPx / 2, by = dry ? wl - 10 - bearPx * 0.92 : wl - bearPx * 0.42;
  let s = svgPic(B.BOAT.bear, bx, by, bearPx, bearPx, 'xMidYMid');
  s += `<rect x="0" y="${f1(wl)}" width="${f1(w)}" height="${f1(h - wl)}" fill="${T.tealSoft}" opacity="0.92"/><path d="M0 ${f1(wl)} q ${f1(w / 8)} -6 ${f1(w / 4)} 0 t ${f1(w / 4)} 0 t ${f1(w / 4)} 0 t ${f1(w / 4)} 0" fill="none" stroke="${T.teal}" stroke-width="2.5"/>`;
  if (dry) s += `<path d="M${f1(w * 0.16)} ${f1(wl - 16)} L${f1(w * 0.25)} ${f1(wl + 10)} L${f1(w * 0.75)} ${f1(wl + 10)} L${f1(w * 0.84)} ${f1(wl - 16)}" fill="none" stroke="${T.ink}" stroke-width="3.5" stroke-linejoin="round"/>`;
  return svg(w, h, s, `data-dk-beartest="${dry ? 'dry' : 'wet'}"`);
}
MODES['boat-test'] = function boatTest(d, rng) {
  const order = rng.int(0, 1) ? [true, false] : [false, true];
  const bw = d.draw ? 180 : 300, bh = d.draw ? 140 : 250;
  const dryWet = row(order.map((dry) => col(tile(bearTest(dry, bw, bh), bw + 14, bh + 12, `data-dk-bear="${dry ? 'dry' : 'wet'}"`, 'white') + word(dry ? 'dry' : 'wet'), 4)).join(''), d.draw ? 50 : 30);
  const parts = [];
  if (d.draw) {
    const waterBox = (k, label, w, hh) => box('dk-draw', w, hh,
      `<span class="dk-head" style="position:absolute;left:12px;top:6px">${esc(label)}</span><div style="position:absolute;left:0;right:0;bottom:0;height:34%;background:${T.tealSoft};border-radius:0 0 10px 10px;border-top:2.5px solid ${T.teal}"></div>`, `data-dk-draw data-dk-prompt="${k}"`);
    if (d.draw === 'test+change') parts.push(row(waterBox('test', 'my boat', (W - 40) / 2, 470) + waterBox('change', 'my new boat', (W - 40) / 2, 470), 20));
    else parts.push(col(waterBox('test', 'my boat', W - 40, 470), 0));
    parts.push(col(head('After the test') + dryWet, 4));
  } else {
    const ch = rng.int(0, 1) ? ['tall', 'wide'] : ['wide', 'tall'];
    parts.push(col(head('After the test') + dryWet, 6));
    parts.push(col(head('If our bear got wet: one change') + row(ch.map((k) => col(tile(boatOutline(300, 236, k, true), 316, 250, `data-dk-change="${k}"`, 'white') + word(k === 'tall' ? 'taller sides' : 'a flatter bottom'), 4)).join(''), 30), 6));
  }
  return { html: grow(parts.join(''), d.draw ? 'gap:14px' : 'justify-content:space-evenly'), meta: { record: true, order: order.join(',') } };
};
MODES.penny = function penny(d, rng) {
  const kinds = rng.int(0, 1) ? ['flat', 'sides'] : ['sides', 'flat'];
  const r = d.max === 10 ? 19 : 17;
  const circles = (n) => {
    const per = 10, gap = 6, rows = Math.ceil(n / per);
    let s = '';
    for (let k = 0; k < n; k++) { const i = k % per, j = Math.floor(k / per); s += `<circle cx="${f1(r + 2 + i * (2 * r + gap) + (i >= 5 ? 10 : 0))}" cy="${f1(r + 2 + j * (2 * r + gap + 4))}" r="${r}" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2.2" data-dk-penny="${k + 1}"/>`; }
    return svg(per * (2 * r + gap) + 14, rows * (2 * r + gap + 4) - gap, s, `data-dk-pennies="${n}"`);
  };
  const rowOf = (k) => band(row(tile(boatOutline(190, 150, k), 206, 164, `data-dk-boatcard="${k}"`, 'white') +
    col(`<div data-dk-box style="line-height:0">${circles(d.max)}</div>` + row(pill('+ more', 'data-dk-more="1"') + (d.write ? row(head('pennies') + numBox(64, 54), 10) : ''), 40), 10), 14),
  `data-dk-boatrow="${k}"`);
  const next = d.draw ? labelledDraw(W - 40, 196, 'the shape I would build next', 'data-dk-prompt="next"') : '';
  return { html: grow(kinds.map(rowOf).join(''), 'gap:14px') + (next ? col(next, 0) : ''), meta: { record: true, max: d.max, kinds: kinds.join(',') } };
};

/* ---------------------------------------------------------------- K-702 seed journal */
/** the clear cup the bean grows against: a dashed outline (the child draws inside it) and a dashed soil line */
function cupOutline(w, h) {
  return svg(w, h, `<path d="M${f1(w * 0.12)} 8 L${f1(w * 0.22)} ${f1(h - 6)} L${f1(w * 0.78)} ${f1(h - 6)} L${f1(w * 0.88)} 8" fill="none" stroke="${T.teal}" stroke-width="3" stroke-dasharray="9 6" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<line x1="${f1(w * 0.17)}" y1="${f1(h * 0.52)}" x2="${f1(w * 0.83)}" y2="${f1(h * 0.52)}" stroke="${T.inkSoft}" stroke-width="2" stroke-dasharray="5 5"/>`, 'data-dk-cupoutline="1"');
}
MODES.seed = function seed(d) {
  const boxW = (W - 18) / 2;
  const cell = (k) => {
    const extra = [];
    if (d.taller && k > 1) extra.push(row(pill('taller', 'data-dk-chip="taller"') + pill('the same', 'data-dk-chip="same"'), 10));
    if (d.leaves && k === 4) extra.push(row(head('leaves') + numBox(60, 48), 8));
    const cupH = d.taller ? (d.leaves && k === 4 ? 190 : 236) : 270;
    return box('dk-tile', boxW, '100%', col(row(head('Day') + numBox(66, 40), 8) +
      `<div data-dk-box style="line-height:0">${cupOutline(230, cupH)}</div>` + extra.join(''), 6, 'height:100%;justify-content:space-between'),
    `data-dk-entry="${k}"`, 'padding:8px 6px');
  };
  return { html: `<div style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:repeat(2,${f1(boxW)}px);grid-template-rows:repeat(2,1fr);gap:14px 18px">${[1, 2, 3, 4].map(cell).join('')}</div>`, meta: { record: true, entries: 4 } };
};

/* ---------------------------------------------------------------- K-703 sun or shade */
MODES['sun-shade'] = function sunShade(d, rng) {
  const S = B.SUN_SHADE;
  let things = d.pairs === 2 ? rng.sample(S.things, 2) : S.things.slice();
  if (d.thermo) things = [S.things[0], ...rng.sample(S.things.slice(1), 2)];
  things = rng.shuffle(things);
  const sunLeft = placesFor(things.length, 2, rng).map((x) => x === 0);
  const ch = d.thermo ? 116 : (d.pairs === 2 ? 340 : 160), px = Math.min(ch - 56, 156);
  const cell = (t, where) => box('dk-tile', 300, ch, `<div style="position:absolute;left:8px;top:6px;display:flex;align-items:center;gap:4px">${pic(where === 'sun' ? S.sun : S.shade, d.thermo ? 40 : 52)}<span class="dk-word">${where}</span></div>` +
    `<div style="display:flex;align-items:center;gap:18px;margin-left:64px">${pic(t.pic, px)}<span class="dk-ring" data-dk-box data-dk-colorring="${where}"></span></div>`,
  `data-dk-where="${where}" data-dk-thing="${t.id}"`, `background:${where === 'sun' ? '#FFFFFF' : T.creamDeep}`);
  const rows = things.map((t, i) => row(sunLeft[i] ? cell(t, 'sun') + cell(t, 'shade') : cell(t, 'shade') + cell(t, 'sun'), 24)).join('');
  let thermo = '';
  if (d.thermo) {
    const wi = things.indexOf(S.things[0]);
    const th = (where) => col(row(pic(where === 'sun' ? S.sun : S.shade, 40) + word(where), 4) + `<div data-dk-box style="line-height:0">${thermometer({ value: 0, min: 0, max: 40, step: 5, height: 190, numerals: false }).svg}</div>`, 4);
    const order = sunLeft[wi] ? ['sun', 'shade'] : ['shade', 'sun'];
    thermo = box('dk-tile', W, 'auto', row(col(pic(S.things[0].pic, 90) + word('water'), 4) + th(order[0]) + th(order[1]), 70), 'data-dk-thermos="1"', 'padding:6px 0;background:#FFFFFF');
  }
  return { html: grow(rows + thermo, 'gap:10px'), meta: { record: true, rows: things.map((t, i) => t.id + (sunLeft[i] ? ':sun-left' : ':shade-left')) } };
};

/* ---------------------------------------------------------------- K-704 ice shade */
function iceState(state, px) {
  let s = `<ellipse cx="${px / 2}" cy="${f1(px - 14)}" rx="${f1(state === 'none' ? px * 0.42 : px * 0.34)}" ry="${f1(px * 0.08)}" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="2"/>`;
  const cube = (sz) => `<rect x="${f1(px / 2 - sz / 2)}" y="${f1(px - 16 - sz)}" width="${f1(sz)}" height="${f1(sz)}" rx="${f1(sz * 0.14)}" fill="#FFFFFF" stroke="${T.teal}" stroke-width="3"/>` +
    `<path d="M${f1(px / 2 - sz / 2 + sz * 0.16)} ${f1(px - 16 - sz + sz * 0.18)} l ${f1(sz * 0.2)} 0 M${f1(px / 2 - sz / 2 + sz * 0.16)} ${f1(px - 16 - sz + sz * 0.18)} l 0 ${f1(sz * 0.2)}" stroke="${T.teal}" stroke-width="2.5" stroke-linecap="round"/>`;
  if (state === 'all') s += cube(px * 0.58);
  else if (state === 'half') s += cube(px * 0.36);
  return svg(px, px, s, `data-dk-ice="${state}"`);
}
MODES['ice-shade'] = function iceShade(d) {
  const parts = [];
  parts.push(col(head('I will use') + row(B.SHADE_MATERIALS.map((m) => tile(pic(m, 88), 102, 102, `data-dk-material="${m.noun}"`, 'white')).join('') + drawBox(102, 102, 'data-dk-prompt="material"'), 10), 4));
  const big = d.compare === 1;
  const result = (label) => box('dk-tile', W, 'auto', row((label ? `<div style="width:100px;display:flex;justify-content:center">${pill(label)}</div>` : '') +
    ['all', 'half', 'none'].map((s) => col(tile(iceState(s, big ? 150 : 82), big ? 176 : 104, big ? 176 : 96, `data-dk-icestate="${s}"`, 'white') + word(s), 2)).join(''), big ? 24 : 16), `data-dk-result="${label || 1}"`, 'padding:6px 0');
  if (big) {
    parts.push(labelledDraw(W - 40, 250, 'my shade', 'data-dk-prompt="shade"', `<div style="position:absolute;left:50%;bottom:8px;margin-left:-28px;line-height:0">${iceState('all', 56)}</div>`));
    parts.push(col(head('How much ice was left?') + result(''), 6));
  } else {
    parts.push(labelledDraw(W - 40, d.better ? 140 : 236, 'my shade', 'data-dk-prompt="shade"', `<div style="position:absolute;left:50%;bottom:8px;margin-left:-28px;line-height:0">${iceState('all', 56)}</div>`));
    parts.push(col(head('How much ice was left?') + result('shade 1') + result('shade 2'), 6));
    if (d.better) parts.push(labelledDraw(W - 40, 130, 'a better shade next time', 'data-dk-prompt="better"'));
  }
  return { html: grow(parts.map((p) => col(p, 0)).join(''), 'gap:10px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- K-705 I can do it */
MODES['i-can'] = function iCan(d) {
  const frameH = d.write ? 350 : 520;
  const frames = d.frames === 2
    ? row(labelledDraw((W - 30) / 2, frameH, 'I am good at', 'data-dk-prompt="good-at"') + labelledDraw((W - 30) / 2, frameH, 'I am learning', 'data-dk-prompt="learning"'), 20)
    : col(labelledDraw(W - 40, frameH, 'I am good at', 'data-dk-prompt="good-at"'), 0);
  const write = d.write ? col(`<div data-dk-box style="line-height:0">${writeRow(W - 40, 92, 'I can')}</div>`, 0) : '';
  // review round 2: the family box is about two helper cards wide (a 1-inch box is too small to draw a family in)
  const helpers = col(head('Who helps me?') + row(B.HELPERS.map((h) => tile(pic(h.pic, 100), 120, 124, `data-dk-helper="${h.id}"`, 'white')).join('') +
    col(drawBox(244, 146, 'data-dk-prompt="family"') + word('my family'), 2), 14, 'align-items:flex-start'), 4);
  return { html: grow(frames + write + helpers, 'gap:12px'), meta: { record: true, frames: d.frames } };
};

/* ---------------------------------------------------------------- K-706 sleep and play */
MODES['sleep-play'] = function sleepPlay(d, rng) {
  const cards = B.BEDTIME.slice(0, d.bed);
  const ids = cards.map((c) => c.id);
  if (validOrderCount(ids, bedBefore) !== 1) throw new Error(`dk-kinder sleep-play: the routine ${ids.join(',')} has more than one valid order (refuse)`);
  let order;
  for (let t = 0; t < 400; t++) {
    const p = rng.shuffle([...cards.keys()]);
    if (p.filter((v, i) => v !== i).length < Math.min(3, cards.length)) continue;   // at least 3 cards out of place
    if (p.join() === [...cards.keys()].reverse().join()) continue;                   // never the routine reversed
    order = p; break;
  }
  if (!order) throw new Error('dk-kinder sleep-play: no scrambled order');
  const cw = 200, ch = d.draw ? 120 : 170;
  const cardArt = (c, px) => c.pics.length === 1 ? pic(c.pics[0], px)
    : `<div style="position:relative;width:${px}px;height:${px}px">${pic(c.pics[0], px)}<div style="position:absolute;right:-6px;top:-8px">${pic(c.pics[1], Math.round(px * 0.5))}</div></div>`;
  const glue = row(cards.map((c, k) => col(pill(String(k + 1)) + box('dk-draw', cw, ch, '', `data-dk-glue="${k + 1}"`), 4)).join(''), 10);
  const strip = row(order.map((i) => box('dk-cut', cw, ch, cardArt(cards[i], ch - 30), `data-dk-card="${cards[i].id}" data-dk-rank="${i + 1}"`)).join(''), 10);
  const act = rng.sample(B.PLAY.active, d.play / 2), still = rng.sample(B.PLAY.still, d.play / 2);
  let play;
  for (let t = 0; t < 400; t++) { play = rng.shuffle([...act.map((p) => ({ p, a: true })), ...still.map((p) => ({ p, a: false }))]); if (!patterned(play.map((x) => x.a))) break; }
  const pPx = d.play === 4 ? 140 : (d.draw ? 78 : 96);
  const heart = `<svg width="28" height="26" viewBox="0 0 26 24" style="display:block"><path d="M13 22 C 4 15 1 11 1 7 C 1 3 4 1 7 1 C 10 1 12 3 13 5 C 14 3 16 1 19 1 C 22 1 25 3 25 7 C 25 11 22 15 13 22 Z" fill="#FFFFFF" stroke="${T.coral}" stroke-width="2.2"/></svg>`;
  const playRow = row(play.map((x) => col(tile(pic(x.p, pPx), pPx + 14, pPx + 10, `data-dk-play="${x.p.noun}" data-dk-answer="${x.a ? 'active' : 'still'}"`, 'white') + `<div data-dk-box style="line-height:0">${heart}</div>`, 4)).join(''), d.play === 4 ? 18 : 8);
  const parts = [col(head('At bedtime') + glue, 4), col(head('Playing') + playRow, 4)];
  if (d.draw) {
    const win = `<div style="position:absolute;right:14px;top:10px;width:96px;height:84px;border:3px solid ${T.teal};border-radius:4px;background:${T.tealSoft}"><div style="position:absolute;left:0;right:0;top:50%;border-top:2.5px solid ${T.teal}"></div><div style="position:absolute;top:0;bottom:0;left:50%;border-left:2.5px solid ${T.teal}"></div><div style="position:absolute;left:8px;top:6px;line-height:0">${pic(B.BEDTIME_MOON, 34)}</div></div>`;
    parts.push(col(labelledDraw(W - 40, 150, 'me asleep', 'data-dk-prompt="asleep"', win), 0));
  }
  parts.push(col(`<div data-dk-box style="font:700 14px/16px 'Nunito',sans-serif;color:${T.inkSoft}">✂ cut out</div>` + strip, 2));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { order: order.map((i) => ids[i]).join(','), routine: ids.join(','), play: play.map((x) => (x.a ? '+' : '-') + x.p.noun) } };
};

/* ---------------------------------------------------------------- K-707 trusted grown-ups */
// Review round 1 (the matching page was not usable: the cashier and the teacher swap, the "places" were vehicles, a cart
// and a blank whiteboard, and the library has no school, store or fire station). Rebuilt around what the pictures CAN
// show without a swap: circle the GROWN-UPS who can help you (helpers at work) among CHILDREN (a child is never a
// grown-up), the help-seeking line printed on the page, and at levels 2 and 3 the child's own trusted grown-up (and at
// level 3 the safe place where they would find them).
MODES.trusted = function trusted(d, rng) {
  const T0 = B.TRUSTED;
  const grown = rng.sample(T0.grownUps, d.grown).map((p) => ({ p, a: true }));
  const kids = rng.sample(T0.children, d.kids).map((p) => ({ p, a: false }));
  const all = [...grown, ...kids];
  const cols = all.length === 6 ? 3 : 4;
  let order;
  for (let t = 0; t < 400; t++) {
    order = rng.shuffle(all);
    const bits = order.map((x) => x.a);
    if (patterned(bits)) continue;
    if ([bits.slice(0, cols), bits.slice(cols)].some((r) => r.every(Boolean) || r.every((x) => !x))) continue;   // a row of one kind
    if ([...Array(cols).keys()].every((c) => bits[c] === bits[c + cols])) continue;                              // row 2 copies row 1
    break;
  }
  const cardW = cols === 3 ? 200 : 154, picPx = cols === 3 ? 180 : 142;
  const cell = (x) => box('dk-tile', '100%', '100%', col(pic(x.p, picPx), 0), `data-dk-person="${esc(x.p.noun)}" data-dk-answer="${x.a ? 'grown-up' : 'child'}"`);
  const grid = `<div style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:repeat(${cols},${cardW}px);grid-template-rows:repeat(2,1fr);gap:14px 16px;justify-content:center">` +
    order.map(cell).join('') + '</div>';
  // review round 2: the longer rule on ONE line at 18 px (measured: 618 px of the 639 the box holds; the house icon
  // left to make room)
  const line = box('dk-tile dk-tile--lead', W - 20, 'auto', `<span class="dk-head" style="font-size:18px;line-height:24px;white-space:nowrap" data-dk-box data-dk-line="1">${esc(T0.line)}</span>`, 'data-dk-checkfirst="1"', 'padding:8px 8px');
  let draw = '';
  if (d.draw === 'adult') draw = col(labelledDraw(W - 40, 200, 'my trusted grown-up', 'data-dk-prompt="my-adult"'), 0);
  else if (d.draw === 'adult+place') draw = row(labelledDraw((W - 60) / 2, 210, 'my trusted grown-up', 'data-dk-prompt="my-adult"') + labelledDraw((W - 60) / 2, 210, 'where I would find them', 'data-dk-prompt="safe-place"'), 20);
  return { html: grid + col(line, 0) + draw, meta: { cells: order.map((x) => (x.a ? 'G' : 'C') + ':' + x.p.noun), cols } };
};

/* ================================================================ the type */
/** makeDkKinderType({ id, slug, mode, exerciseType, difficulty, i18n }) */
function makeDkKinderType({ id, slug, mode, exerciseType, difficulty, i18n }) {
  if (!MODES[mode]) throw new Error('dk-kinder: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'K', assetClass: 'icon-placement', exerciseType,
    themeAxis: { applicable: false },
    difficulty,
    i18n,
    dkMode: mode,
    build({ difficulty: lv, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the Batch K pages are English (no ${locale} bank)`);
      const d = this.difficulty[lv] || this.difficulty[2];
      const out = MODES[mode](d, ctx.rng, ctx);
      return {
        bodyHtml: `<style>${CSS}</style><div class="dk-root" data-ws-content data-dk="${mode}" data-dk-level="${lv}" data-dk-record="${out.meta.record ? 1 : 0}">${out.html}</div>`,
        meta: { mode, level: Number(lv), ...out.meta },
      };
    },
    async verify(page) {
      return page.evaluate(dkVerifyInPage);
    },
  };
}

/**
 * The in-page verify (runs in page.evaluate, no require): the stack band, everything inside the body and above the
 * footer, no two marked boxes colliding, every picture loaded, and the per-mode answer stamps where a page has them.
 */
function dkVerifyInPage() {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no dk-kinder root'];
  const mode = R.dataset.dk;
  const body = document.querySelector('.ws-body').getBoundingClientRect();
  const foot = document.querySelector('.ws-foot').getBoundingClientRect();
  const rt = R.getBoundingClientRect();
  // the stack is measured on what is DRAWN (marked boxes, drawings, pictures), never on the stretched wrappers: a wrapper
  // that grows to the body made every page "fill" it (2026-11-23, the first measure was vacuous)
  const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg')))
    .map((e) => e.getBoundingClientRect()).filter((r) => r.width > 1 && r.height > 1).sort((p, q) => p.top - q.top);
  if (!ink.length) return ['nothing drawn on the page'];
  const low = Math.max(...ink.map((r) => r.bottom));
  const stack = Math.round(low - rt.top), topGap = Math.round(ink[0].top - rt.top);
  if (stack < 620 || stack > 740) f.push(`the stack is ${stack} px (620-740)`);
  if (topGap > 40) f.push(`the page starts ${topGap} px below the instruction (a blank band at the top)`);
  let reach = ink[0].bottom, band = 0;
  for (const r of ink) { if (r.top > reach) band = Math.max(band, r.top - reach); reach = Math.max(reach, r.bottom); }
  if (band > 90) f.push(`an empty band of ${Math.round(band)} px between parts of the page`);
  if (low > body.bottom + 0.5) f.push(`the content runs ${Math.round(low - body.bottom)} px below the body`);
  if (low > foot.top + 0.5) f.push('content under the footer');
  // collisions: every marked box against every other that is not its ancestor or descendant
  const boxes = [...R.querySelectorAll('[data-dk-box]')].map((e) => ({ e, r: e.getBoundingClientRect() })).filter((b) => b.r.width > 1 && b.r.height > 1);
  const name = (e) => (e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className) || e.tagName;
  for (let i = 0; i < boxes.length && f.length < 30; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i], b = boxes[j];
    if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
    const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left), h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
    if (w > 1 && h > 1) f.push(`two boxes collide (${name(a.e)} / ${name(b.e)}: ${Math.round(w)} x ${Math.round(h)})`);
  }
  // every box inside the page, and inside the box that holds it (a child box never runs out of its card)
  const page = document.querySelector('.ws-page').getBoundingClientRect();
  for (const b of boxes) {
    if (b.r.left < page.left - 0.5 || b.r.right > page.right + 0.5) f.push('a box runs off the page');
    const up = b.e.parentElement && b.e.parentElement.closest('[data-dk-box]');
    if (up && !b.e.hasAttribute('data-dk-overhang')) { const u = up.getBoundingClientRect(); if (b.r.left < u.left - 0.5 || b.r.right > u.right + 0.5 || b.r.top < u.top - 0.5 || b.r.bottom > u.bottom + 0.5) f.push(`a box runs out of its card (${name(b.e)} in ${name(up)})`); }
  }
  // every drawing and picture stays inside the box that holds it (a shrunk tile hid an overflowing drawing, 2026-11-23)
  R.querySelectorAll('svg, img').forEach((e) => { if (e.parentElement && e.parentElement.closest('svg')) return; const up = e.closest('[data-dk-box]'); if (!up || up === e) return; const u = up.getBoundingClientRect(), q = e.getBoundingClientRect(); if (q.width > 1 && (q.left < u.left - 1 || q.right > u.right + 1 || q.top < u.top - 1 || q.bottom > u.bottom + 1)) f.push(`a drawing runs out of its box (${name(e)} in ${name(up)}: ${Math.round(q.width)}x${Math.round(q.height)} in ${Math.round(u.width)}x${Math.round(u.height)})`); });
  // pictures: loaded, and every <image> inside an svg has its href
  document.querySelectorAll('[data-dk] img').forEach((im) => { if (!im.complete || !im.naturalWidth) f.push('a picture did not load: ' + im.getAttribute('data-dk-pic')); });
  document.querySelectorAll('[data-dk] image').forEach((im) => { if (!im.getAttribute('href')) f.push('an svg picture has no href'); });
  // writing rows: what is printed on a row stays inside the row
  document.querySelectorAll('[data-dk-writerow]').forEach((s) => { const r = s.getBoundingClientRect(); s.querySelectorAll('path,polyline,text').forEach((t) => { const q = t.getBoundingClientRect(); if (q.width && (q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5 || q.bottom > r.bottom + 0.5)) f.push('writing on a row runs out of the row'); }); });
  // per mode: the answer stamps the page carries
  if (mode === 'needs') { const a = [...R.querySelectorAll('[data-dk-item]')].map((e) => e.dataset.dkAnswer); if (!a.includes('need') || !a.includes('want')) f.push('the needs page has no need or no want'); if (!R.querySelector('[data-dk-drawn="air"]')) f.push('no air card'); }
  if (mode === 'storm' || mode === 'eats') R.querySelectorAll('[data-dk-item]').forEach((it) => { const a = [...it.querySelectorAll('[data-dk-choice]')].map((c) => c.dataset.dkAnswer); const good = a.filter((x) => x !== 'no').length; if (a.length !== 3) f.push(`${it.dataset.dkItem}: ${a.length} choices`); if (mode === 'storm' ? good !== 1 : (good < 1 || good > 2)) f.push(`${it.dataset.dkItem}: ${good} right choices`); });
  if (mode === 'direction') R.querySelectorAll('[data-dk-item]').forEach((it) => { const o = [...it.querySelectorAll('[data-dk-option]')]; if (o.length && o.filter((x) => x.dataset.dkAnswer === 'right').length !== 1) f.push(`${it.dataset.dkItem}: not one right arrow`); });
  if (mode === 'pushpull') { const bins = [...R.querySelectorAll('[data-dk-bin]')].map((b) => b.dataset.dkBin); if (bins.sort().join() !== 'pull,push') f.push('the push / pull bins'); R.querySelectorAll('[data-dk-item]').forEach((it) => { const s = it.querySelector('[data-dk-action]'); if (!s || s.dataset.dkAction !== it.dataset.dkAnswer) f.push(`${it.dataset.dkItem}: the drawing is not a ${it.dataset.dkAnswer}`); if (it.dataset.dkAnswer === 'pull' && !it.querySelector('[data-dk-rope]')) f.push(`${it.dataset.dkItem}: a pull without its rope`); if (it.dataset.dkAnswer === 'push' && it.querySelector('[data-dk-rope]')) f.push(`${it.dataset.dkItem}: a push with a rope`); }); }
  if (mode === 'land') { const L = R.querySelectorAll('[data-dk-after]').length, Rr = R.querySelectorAll('[data-dk-maker]').length; if (Rr < L) f.push('fewer answers than items'); }
  if (mode === 'trusted') { const a = [...R.querySelectorAll('[data-dk-person]')].map((e) => e.dataset.dkAnswer); if (!a.includes('grown-up') || !a.includes('child')) f.push('the trusted page has no grown-up or no child'); const ln = R.querySelector('[data-dk-line]'); if (!ln || !/check first with your grown-up/i.test(ln.textContent)) f.push('the help-seeking line is not printed'); }
  if (mode === 'sleep-play') { const g = R.querySelectorAll('[data-dk-glue]').length, c = R.querySelectorAll('[data-dk-card]').length; if (g !== c) f.push(`${g} glue boxes for ${c} cards`); }
  return f;
}

module.exports = { makeDkKinderType, MODES, validOrderCount, bedBefore, placesFor, patterned, derange, dkVerifyInPage, CSS, MAXH, BED_RANK };
