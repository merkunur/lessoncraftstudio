/**
 * components-b3/compound-words.js — the G2-316 `compound-words` family
 * components (design: docs/worksheet-gen/b3-designs/G2-316-compound-words.md
 * §2 "NEW in templates/components-b3.js" + §3 the five faces). Merged into the
 * templates/components-b3.js namespace; every export is type-scoped
 * (`compound…` — the K-319 `feeling…` / G1-307 `opposite…` convention against
 * namespace collisions: the loader refuses a duplicate name). The two base
 * exports `opGlyph` + `compoundRow` are byte-untouched by Phase 2.
 *
 *   opGlyph(ch)
 *     A 28×28 SVG with one Baloo 2 700 26 px glyph in T.teal (`+` or `=`),
 *     `data-lcs-op="<ch>"`, aria-hidden — the ONLY text the base page prints
 *     besides the d1 part words. On the token palette only.
 *
 *   compoundRow({ index, cueA, cueB, lane, stamps, pad = '6px 14px', gap = 10,
 *                 wordPx = 18, badge = true })
 *     One full-width `.ws-lane` row read left to right as an equation:
 *       [badge] [cue A] + [cue B] = [empty writing-row]
 *     cueA / cueB = { src, px, key, word? } — a colour picture (`.ws-icon`,
 *     `data-lcs-pic="<vocabKey>"`, no alt) with the PART word printed under it
 *     when `word` is given (d1 scaffold; Nunito 800 `wordPx`, `data-lcs-part-
 *     word`); cueB may instead be { chip:'-ista', fontPx, tileH } — one
 *     `.ws-tile` affix chip (the es/fr family shape and the it/pt alterati
 *     shape, `wordTiles` from components-b2). `lane` = { w, h, glyphH } → one
 *     `writingRow` (`data-lcs-prim="writing-row"`, xHeight rule), empty.
 *     `stamps` = { a, aWord, aStem, b, bWord, link, whole, cut } → the hidden
 *     ground truth on the row (`data-lcs-a` / `-b` = vocab keys or the affix,
 *     `-a-word` / `-b-word` / `-a-stem` the bank literals, `-link`, `-whole`
 *     the display form, `-cut` the code-point index where the second part
 *     starts). The row stamps `[data-ws-content]` (the QA lint content
 *     selector) and `data-lcs-row`; `badge` prints `countBadge(index)` in the
 *     lane's corner (`.ws-countbadge` is absolute at −8/−8 of the lane).
 *     The row is a flex line, `align-items:center`, so a grid row that is
 *     taller than the content (the body's slack, README 722 → ~814) centres
 *     it; the caller sizes `.ws-lane` via its grid, never via a fixed height.
 *     The whole word appears NOWHERE on the row — verify() asserts it.
 *
 * FACE components (Phase 2, 2026-09-14 — design §3; the design's `linkBox` /
 * `splitWord` / `webBlock` under the `compound…` prefix):
 *
 *   compoundLinkBox({ w, h = 36 })                                 F1 `mode:'link'`
 *     The dashed coral joint box (`roundedRect r8 T.white T.coral 2.5 dash 6 5`,
 *     `data-lcs-linkbox`) in an SVG exactly `w` wide — the width is the
 *     config's `linkBoxW`, NEVER the answer's length (a 1-letter and a 2-letter
 *     joint get the same box; verify() asserts every box === the stamp).
 *   compoundLinkRow({ index, tileA, tileB, linkBoxW, tileFont, tileH, wholePic, lane, stamps, pad, badge })
 *     The F1 row (`.ws-lane`, `data-ws-content`, `data-lcs-link-card` +
 *     `data-lcs-row` + the row stamps): `[badge][picture of the whole — the
 *     clue, data-lcs-cue="whole"][tile a][link box][tile b][empty writingRow]`
 *     — two `.ws-tile` word tiles (`wordTiles`, Nunito 800 `tileFont`, `tileH`)
 *     printing the PART words verbatim (`data-lcs-tile="a|b"` wrappers) round
 *     the joint box, in a `data-lcs-link-line` group (`lineW` = the page's
 *     widest tile line as its min-width, so every lane starts at one x). A ROW, not the design's
 *     2×4 card (faces record deviation 1: the card's 302 px lane cannot hold
 *     the design's own 14-letter exemplar under the platform's school-hand
 *     model; a full-width row gives the lane 340-400 px). The whole is never
 *     printed.
 *   compoundCutRow({ index, wholePic, word, cell, fontPx, seam = null, stamps, pad, badge })
 *     The F2 row (`.ws-lane`, `data-ws-content`, `data-lcs-row` + stamps):
 *     `[badge][picture of the whole][the whole in EQUAL LETTER CELLS]` — the
 *     cells are G1-305's `syllableWord` (Baloo 2 700 `fontPx`, cell `cell`, no
 *     borders, every letter a `data-lcs-letter` label) with a `T.grid` 1 px
 *     RAIL under the letters (design §2 "a mode:'cut' rail … no marker"): the
 *     child draws ONE line across it where the second word starts. `seam` (a
 *     cut index) draws the d1 tick (`data-lcs-seam`) — NEVER at d2: verify()
 *     fails any `[data-lcs-seam]` (design gate rule 6). Wrapper
 *     `data-lcs-cells-wrap` carries `data-lcs-cell` / `data-lcs-cells`.
 *   compoundMatchRow({ index, lane, left, right, gap, stamps, pic })   F3 `mode:'match'`
 *     One F3 row (`data-ws-content data-lcs-match-row` + the LEFT pair's
 *     stamps): `[empty writingRow lane][.ws-match-item left (dot --right)]
 *     [gap][.ws-match-item right (dot --left)]`; each item = a colour picture
 *     `pic` px in a `pic + 12` box, stamped `data-lcs-left="<a key>"` /
 *     `data-lcs-right="<b key>"` + `-word`. The right item is the caller's
 *     (deranged) partner — the row never says which. The lane belongs to the
 *     left (first-part) picture: the child writes the compound there.
 *   compoundDetectBank({ chips, iconPx = 44, wordPx = 18 })         F4 `mode:'detect'`
 *     The F4 bank (`.ws-scene-banner.ws-bank.ws-bank--icons`, `data-lcs-detect-
 *     bank`): every chip `[picture iconPx][word Nunito 800 wordPx]` stamped
 *     `data-lcs-detect-word` / `-key` and EITHER `data-lcs-compound="<a>|<b>"`
 *     (a real compound; its two parts, hidden) OR `data-lcs-foil="1"` (a
 *     look-alike). The b2 wordBank markup re-emitted here so the chips carry
 *     the ground-truth stamps (components-b2.js is never edited).
 *   compoundDetectLane({ n, w, h, glyphH, pad })                     F4 lane
 *     `.ws-lane` (`data-ws-content data-lcs-detect-lane="n"`): `[badge]
 *     [writingRow w×h][+ opGlyph][writingRow w×h]` — two EMPTY rulings round a
 *     `+`: the child writes a circled compound's two parts.
 *   compoundWebBlock({ hub, side, lanes, hubPx, hubWordPx, laneGap, pad })   F5 `mode:'web'`
 *     One F5 web (`.ws-lane`, `data-ws-content data-lcs-web` + `data-lcs-hub`
 *     / `-hub-word` / `-hub-side`): `[hub column: the hub picture hubPx in a
 *     white r16 box + the hub WORD printed under it (Baloo 2 700 hubWordPx,
 *     data-lcs-hub-label — the ONE word the face prints)][a teal SVG bracket
 *     from the hub to every lane][lanes column]`. Each lane (`data-lcs-web-
 *     lane` + stamps) reads as the base equation with the hub in its TRUE
 *     position: side 'b' → `[picture of the whole] + [ghost hub] = [lane]`,
 *     side 'a' → `[ghost hub] + [picture of the whole] = [lane]`; the ghost is
 *     the hub's own picture at `opacity:.55` (`data-lcs-ghost`), the whole's
 *     picture is the clue (`data-lcs-cue="whole"`). The whole is never printed.
 *   compoundSizeRow({ index, cue, lane, stamps, pad, gap, badge })   F5 size rows (it pt es)
 *     `.ws-lane` row `[badge][the base noun's picture at scale 0.55 or 1.35 —
 *     the ONLY cue][=][empty writingRow]`; stamped `data-lcs-size="small|big"`
 *     `data-lcs-scale` + the pair's words. No chip, no adjective, no text.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { svgRoot, roundedRect, line, label, esc, el } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { wordTiles, countBadge } = require('../components-b2.js');
const { syllableWord } = require('./syllable-split.js');

const T = tokens.color;
const F = tokens.font;
const OPS = new Set(['+', '=']);

function opGlyph(ch) {
  if (!OPS.has(ch)) throw new Error('opGlyph: "' + ch + '" is not an operator glyph (+ =)');
  return svgRoot({ width: 28, height: 28, label: ch === '+' ? 'plus' : 'equals' },
    label({ x: 14, y: 14, text: ch, size: 26, color: T.teal, fontFamily: F.display, weight: 700 }),
    { 'data-lcs-op': ch, 'aria-hidden': 'true' });
}

function cue(c, role, wordPx) {
  if (!c) throw new Error('compoundRow: cue ' + role + ' missing');
  if (c.chip != null) {
    if (!/^-\p{L}+$/u.test(String(c.chip))) throw new Error('compoundRow: chip "' + c.chip + '" must be an affix starting with "-"');
    return `<div data-lcs-cue="${role}" data-lcs-cue-kind="chip" style="flex:0 0 auto;display:flex;align-items:center">` +
      wordTiles({ tokens: [String(c.chip)], fontPx: c.fontPx || 20, tileH: c.tileH || 40 }) + `</div>`;
  }
  if (!c.src || !(c.px > 0) || !c.key) throw new Error('compoundRow: cue ' + role + ' needs {src, px, key}');
  const img = `<img class="ws-icon" src="${c.src}" alt="" data-lcs-pic="${esc(c.key)}" style="width:${c.px}px;height:${c.px}px;flex:0 0 auto">`;
  const word = c.word != null
    ? `<span data-lcs-part-word="${esc(c.word)}" style="font-family:${F.body},sans-serif;font-weight:800;font-size:${wordPx}px;line-height:${wordPx + 2}px;color:${T.ink};white-space:nowrap">${esc(c.word)}</span>`
    : '';
  return `<div data-lcs-cue="${role}" data-lcs-cue-kind="pic" style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:2px;min-width:${c.px}px">${img}${word}</div>`;
}

function compoundRow({ index, cueA, cueB, lane, stamps, pad = '6px 14px', gap = 10, wordPx = 18, badge = true }) {
  if (!lane || !(lane.w > 0) || !(lane.h > 0) || !(lane.glyphH > 0)) throw new Error('compoundRow: lane needs {w, h, glyphH}');
  const s = stamps || {};
  for (const k of ['a', 'b', 'whole']) if (s[k] == null || s[k] === '') throw new Error('compoundRow: stamp "' + k + '" missing');
  if (!(Number.isInteger(s.cut) && s.cut > 0)) throw new Error('compoundRow: stamp cut must be a positive integer');
  const row = writingRow({ w: lane.w, h: lane.h, glyphH: lane.glyphH, xHeight: true }).svg;
  const attrs = [
    `data-lcs-a="${esc(s.a)}"`, `data-lcs-b="${esc(s.b)}"`,
    `data-lcs-a-word="${esc(s.aWord == null ? '' : s.aWord)}"`, `data-lcs-b-word="${esc(s.bWord == null ? '' : s.bWord)}"`,
    `data-lcs-a-stem="${esc(s.aStem == null ? '' : s.aStem)}"`, `data-lcs-link="${esc(s.link == null ? '' : s.link)}"`,
    `data-lcs-whole="${esc(s.whole)}"`, `data-lcs-cut="${s.cut}"`,
  ].join(' ');
  return `<div class="ws-lane" data-ws-content data-lcs-row="${index == null ? '' : index}" ${attrs} ` +
    `style="display:flex;align-items:center;gap:${gap}px;padding:${pad};min-height:0;box-sizing:border-box">` +
    (badge && index != null ? countBadge(index) : '') +
    cue(cueA, 'a', wordPx) +
    `<span style="flex:0 0 auto;display:flex">${opGlyph('+')}</span>` +
    cue(cueB, 'b', wordPx) +
    `<span style="flex:0 0 auto;display:flex">${opGlyph('=')}</span>` +
    `<span data-lcs-lane style="flex:0 0 auto;display:flex;margin-left:2px">${row}</span>` +
    `</div>`;
}

/* ---------------------------------------------------------------- Phase 2: the faces */

/** The hidden ground-truth attributes shared by every face row (the base's stamp set). */
function rowStamps(s) {
  const st = s || {};
  for (const k of ['a', 'b', 'whole']) if (st[k] == null || st[k] === '') throw new Error('compound face: stamp "' + k + '" missing');
  if (!(Number.isInteger(st.cut) && st.cut > 0)) throw new Error('compound face: stamp cut must be a positive integer');
  return [
    `data-lcs-a="${esc(st.a)}"`, `data-lcs-b="${esc(st.b)}"`,
    `data-lcs-a-word="${esc(st.aWord == null ? '' : st.aWord)}"`, `data-lcs-b-word="${esc(st.bWord == null ? '' : st.bWord)}"`,
    `data-lcs-a-stem="${esc(st.aStem == null ? '' : st.aStem)}"`, `data-lcs-link="${esc(st.link == null ? '' : st.link)}"`,
    `data-lcs-whole="${esc(st.whole)}"`, `data-lcs-cut="${st.cut}"`,
  ].join(' ');
}

function pic(c, role, extraStyle = '') {
  if (!c || !c.src || !(c.px > 0) || !c.key) throw new Error('compound face: picture "' + role + '" needs {src, px, key}');
  return `<img class="ws-icon" src="${c.src}" alt="" data-lcs-pic="${esc(c.key)}" style="width:${c.px}px;height:${c.px}px;flex:0 0 auto;${extraStyle}">`;
}

function emptyLane(lane, extra = '') {
  if (!lane || !(lane.w > 0) || !(lane.h > 0) || !(lane.glyphH > 0)) throw new Error('compound face: lane needs {w, h, glyphH}');
  return `<span data-lcs-lane style="flex:0 0 auto;display:flex;${extra}">${writingRow({ w: lane.w, h: lane.h, glyphH: lane.glyphH, xHeight: true }).svg}</span>`;
}

/* ---- F1 link ---- */
function compoundLinkBox({ w, h = 36 }) {
  if (!(w >= 24)) throw new Error('compoundLinkBox: w must be >= 24 (got ' + w + ')');
  return svgRoot({ width: w, height: h, label: 'joint box' },
    roundedRect({ x: 1.5, y: 1.5, w: w - 3, h: h - 3, r: 8, fill: T.white, strokeColor: T.coral, strokeWidth: 2.5, dash: '6 5' }),
    { 'data-lcs-linkbox': w, 'aria-hidden': 'true' });
}

function compoundLinkRow({ index, tileA, tileB, linkBoxW, tileFont = 18, tileH = 36, wholePic, lane, stamps, pad = '6px 14px', badge = true, lineW = 0 }) {
  if (!tileA || !tileB) throw new Error('compoundLinkRow: two part tiles required');
  const tile = (word, role) => `<span data-lcs-tile="${role}" style="display:flex;flex:0 0 auto">` +
    wordTiles({ tokens: [String(word)], fontPx: tileFont, tileH }) + `</span>`;
  return `<div class="ws-lane" data-ws-content data-lcs-link-card data-lcs-row="${index == null ? '' : index}" ${rowStamps(stamps)} ` +
    `style="display:flex;align-items:center;gap:8px;padding:${pad};min-height:0;box-sizing:border-box">` +
    (badge && index != null ? countBadge(index) : '') +
    `<span data-lcs-cue="whole" style="display:flex;flex:0 0 auto;margin-right:2px">${pic(wholePic, 'whole')}</span>` +
    `<span data-lcs-link-line style="display:flex;align-items:center;gap:8px;flex:0 0 auto;min-width:${lineW}px">` +
    tile(tileA, 'a') +
    `<span style="display:flex;flex:0 0 auto">${compoundLinkBox({ w: linkBoxW })}</span>` +
    tile(tileB, 'b') +
    `</span>` +
    emptyLane(lane, 'margin-left:4px') +
    `</div>`;
}

/* ---- F2 cut ---- */
function compoundCutRow({ index, wholePic, word, cell, fontPx, seam = null, stamps, pad = '6px 14px', badge = true }) {
  const letters = [...String(word)];
  if (!letters.length) throw new Error('compoundCutRow: empty word');
  let cells = syllableWord({ word, cell, fontPx });
  const w = letters.length * cell, h = cell + 12;
  // the rail: one light rule under the letters, across every cell — the child's line crosses it
  let extra = line({ x1: 0, y1: h - 2, x2: w, y2: h - 2, strokeColor: T.grid, strokeWidth: 1, cap: 'butt', data: { 'data-lcs-rail': 1 } });
  if (seam != null) {
    if (!(Number.isInteger(seam) && seam > 0 && seam < letters.length)) throw new Error('compoundCutRow: seam ' + seam + ' outside 1..' + (letters.length - 1));
    extra += line({ x1: seam * cell, y1: 4, x2: seam * cell, y2: h - 2, strokeColor: T.grid, strokeWidth: 2, data: { 'data-lcs-seam': seam } });
  }
  cells = cells.replace('</svg>', extra + '</svg>');
  return `<div class="ws-lane" data-ws-content data-lcs-row="${index == null ? '' : index}" ${rowStamps(stamps)} ` +
    `style="display:flex;align-items:center;gap:12px;padding:${pad};min-height:0;box-sizing:border-box">` +
    (badge && index != null ? countBadge(index) : '') +
    `<span data-lcs-cue="whole" style="display:flex;flex:0 0 auto">${pic(wholePic, 'whole')}</span>` +
    `<span data-lcs-cells-wrap data-lcs-cell="${cell}" data-lcs-cells="${letters.length}" style="display:flex;flex:0 0 auto;line-height:0">${cells}</span>` +
    `</div>`;
}

/* ---- F3 match ---- */
function compoundMatchRow({ index, lane, left, right, gap = 120, stamps, pic: px }) {
  const box = (c, side) => {
    const size = (c.px || px) + 12;
    return `<span class="ws-match-item" data-lcs-${side}="${esc(c.key)}" data-lcs-${side}-word="${esc(c.word == null ? '' : c.word)}" ` +
      `style="width:${size}px;height:${size}px;flex:0 0 auto">${pic(c, side)}<span class="ws-match-dot ws-match-dot--${side === 'left' ? 'right' : 'left'}"></span></span>`;
  };
  return `<div data-ws-content data-lcs-match-row="${index == null ? '' : index}" ${rowStamps(stamps)} ` +
    `style="display:flex;align-items:center;justify-content:center;gap:12px;min-height:0;box-sizing:border-box">` +
    emptyLane(lane) +
    box(left, 'left') +
    `<span style="flex:0 0 ${gap}px;width:${gap}px;height:1px" aria-hidden="true"></span>` +
    box(right, 'right') +
    `</div>`;
}

/* ---- F4 detect ---- */
function compoundDetectBank({ chips, iconPx = 44, wordPx = 18 }) {
  if (!Array.isArray(chips) || !chips.length) throw new Error('compoundDetectBank: chips[] required');
  const items = chips.map((c) => {
    if (!c.word || !c.key || !c.src) throw new Error('compoundDetectBank: chip needs {word, key, src}');
    if (!!c.foil === !!c.parts) throw new Error('compoundDetectBank: chip "' + c.word + '" must be a foil OR carry its two parts');
    const kind = c.foil ? 'data-lcs-foil="1"' : `data-lcs-compound="${esc(c.parts.join('|'))}"`;
    return `<span class="ws-bankword" style="font-size:${wordPx}px" data-lcs-detect-word="${esc(c.word)}" data-lcs-detect-key="${esc(c.key)}" ${kind}>` +
      `<img class="ws-icon" src="${c.src}" alt="" data-lcs-pic="${esc(c.key)}" style="width:${iconPx}px;height:${iconPx}px">` +
      `<span>${esc(c.word)}</span></span>`;
  }).join('');
  return `<div class="ws-scene-banner ws-bank ws-bank--icons" data-ws-content data-lcs-detect-bank="${chips.length}" style="margin-bottom:0">${items}</div>`;
}

function compoundDetectLane({ n, w, h, glyphH, pad = '4px 14px' }) {
  const lane = { w, h, glyphH };
  return `<div class="ws-lane" data-ws-content data-lcs-detect-lane="${n}" ` +
    `style="display:flex;align-items:center;justify-content:center;gap:10px;padding:${pad};min-height:0;box-sizing:border-box">` +
    countBadge(n) + emptyLane(lane) +
    `<span style="flex:0 0 auto;display:flex">${opGlyph('+')}</span>` +
    emptyLane(lane) + `</div>`;
}

/* ---- F5 web ---- */
function compoundWebBlock({ hub, side, lanes, hubPx = 96, hubWordPx = 24, laneGap = 8, pad = '8px 12px' }) {
  if (!hub || !hub.src || !hub.key || !hub.word) throw new Error('compoundWebBlock: hub needs {src, key, word}');
  if (!['a', 'b'].includes(side)) throw new Error('compoundWebBlock: side must be a|b');
  if (!Array.isArray(lanes) || lanes.length < 2) throw new Error('compoundWebBlock: >= 2 lanes');
  const laneH = lanes[0].lane.h;
  const colH = lanes.length * laneH + (lanes.length - 1) * laneGap;
  // the bracket: a vertical spine with one arm per lane and a stub to the hub
  const ys = lanes.map((_, i) => i * (laneH + laneGap) + laneH / 2);
  const BW = 22;
  const bracket = svgRoot({ width: BW, height: colH, label: 'bracket' },
    line({ x1: 11, y1: ys[0], x2: 11, y2: ys[ys.length - 1], strokeColor: T.teal, strokeWidth: 2 }) +
    ys.map((y) => line({ x1: 11, y1: y, x2: BW, y2: y, strokeColor: T.teal, strokeWidth: 2 })).join('') +
    line({ x1: 0, y1: colH / 2, x2: 11, y2: colH / 2, strokeColor: T.teal, strokeWidth: 2 }),
    { 'data-lcs-bracket': lanes.length, 'aria-hidden': 'true' });
  const hubCol = `<div data-lcs-hub-col style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;flex:0 0 ${hubPx + 4}px;width:${hubPx + 4}px">` +
    `<span style="display:flex;background:${T.white};border:2px solid ${T.teal};border-radius:16px;padding:2px">${pic({ src: hub.src, key: hub.key, px: hubPx }, 'hub')}</span>` +
    `<span data-lcs-hub-label style="font-family:${F.display},cursive;font-weight:700;font-size:${hubWordPx}px;line-height:${hubWordPx + 4}px;color:${T.ink};white-space:nowrap">${esc(hub.word)}</span></div>`;
  const rows = lanes.map((ln) => {
    const whole = `<span data-lcs-cue="whole" style="display:flex;flex:0 0 auto">${pic(ln.whole, 'whole')}</span>`;
    const ghost = `<span data-lcs-cue="ghost" style="display:flex;flex:0 0 auto">${pic({ src: ln.ghost.src, key: ln.ghost.key, px: ln.ghost.px }, 'ghost', `opacity:${ln.ghost.opacity};`)}</span>`
      .replace('<img ', '<img data-lcs-ghost="1" ');
    const first = side === 'b' ? whole : ghost, second = side === 'b' ? ghost : whole;
    return `<div data-lcs-web-lane ${rowStamps(ln.stamps)} data-lcs-whole-key="${esc(ln.whole.key)}" ` +
      `style="display:flex;align-items:center;gap:10px;height:${laneH}px;min-height:0">` +
      first + `<span style="flex:0 0 auto;display:flex">${opGlyph('+')}</span>` + second +
      `<span style="flex:0 0 auto;display:flex">${opGlyph('=')}</span>` + emptyLane(ln.lane, 'margin-left:2px') + `</div>`;
  }).join('');
  return `<div class="ws-lane" data-ws-content data-lcs-web data-lcs-hub="${esc(hub.key)}" data-lcs-hub-word="${esc(hub.word)}" data-lcs-hub-side="${side}" data-lcs-lanes="${lanes.length}" ` +
    `style="display:flex;align-items:center;gap:8px;padding:${pad};min-height:0;box-sizing:border-box">` +
    hubCol + `<span style="display:flex;flex:0 0 auto;line-height:0">${bracket}</span>` +
    `<div style="display:flex;flex-direction:column;gap:${laneGap}px;flex:0 0 auto">${rows}</div></div>`;
}

/* ---- F5 size rows (the alterati / es re-target) ---- */
function compoundSizeRow({ index, cue: c, lane, stamps, pad = '6px 14px', gap = 10, badge = true }) {
  const s = stamps || {};
  if (!['small', 'big'].includes(s.size)) throw new Error('compoundSizeRow: stamp size must be small|big');
  if (!(c && (c.scale === 0.55 || c.scale === 1.35))) throw new Error('compoundSizeRow: scale must be 0.55 or 1.35');
  return `<div class="ws-lane" data-ws-content data-lcs-row="${index == null ? '' : index}" data-lcs-size="${s.size}" data-lcs-scale="${c.scale}" ` +
    `data-lcs-base="${esc(s.base)}" data-lcs-base-word="${esc(s.baseWord)}" data-lcs-whole="${esc(s.whole)}" ` +
    `style="display:flex;align-items:center;gap:${gap}px;padding:${pad};min-height:0;box-sizing:border-box">` +
    (badge && index != null ? countBadge(index) : '') +
    `<span data-lcs-cue="a" data-lcs-cue-kind="pic" style="display:flex;flex:0 0 auto;align-items:center;justify-content:center;min-width:${c.boxPx || c.px}px">${pic(c, 'a')}</span>` +
    `<span style="flex:0 0 auto;display:flex">${opGlyph('=')}</span>` +
    emptyLane(lane, 'margin-left:2px') + `</div>`;
}

module.exports = { opGlyph, compoundRow, compoundLinkBox, compoundLinkRow, compoundCutRow, compoundMatchRow, compoundDetectBank, compoundDetectLane, compoundWebBlock, compoundSizeRow };
