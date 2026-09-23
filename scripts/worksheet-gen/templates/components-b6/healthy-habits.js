/**
 * components-b6/healthy-habits.js — the K-380 `healthy-habits` base components
 * (design docs/worksheet-gen/b6-designs/K-380-healthy-habits.md §2). Inline CSS
 * only, class prefix `hh-`, exports prefixed `hh` (the components-b6 barrel
 * refuses a duplicate export name). Every picture comes from
 * primitives/habit-pictogram.js (one art source; 0 library pictures).
 *
 *   hhFace({ mode, stamps, inner })        the family root: [data-ws-content][data-lcs-healthy-habits]
 *   hhRail({ n, w, h, colW, plaqueW, plaqueTop })   the teal peg rail, n pegs, two strings per peg (SVG)
 *   hhPlaque({ inner, w, h, pad, habit })  the cream washroom hook card (the family signature)
 *   hhShelf({ tools, w, colW, toolPx })    the plank of drawn tools, each under its coral dot
 *   hhHooks({ habits, tools, geom, marks, stamps })   the base stage (rail band / line zone / shelf band)
 *
 * The face components the design also names (hhStepCard F1, hhPhaseCell F2, hhPairRow F3,
 * hhReasonMatch F4, hhWeekChart F5) are built with their faces in Phase E, not here.
 *
 * Geometry (root padding 0 18 -> inner 639, n columns of 639 / n): rows [34 + plaque 190..228 + 24]
 * [zone 180..260] [24 + tool 120 + 18] at d2: min 248 + 180 + 162 = 590 <= 677 (the fi 4-line title),
 * max 286 + 260 + 162 = 708 (the 814 one-line chrome centres the last 106 px, 53 above / 53 below).
 */
'use strict';
const { esc } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');
const HP = require('../../primitives/habit-pictogram.js');

const T = tokens.color;
const INNER_W = 639;
const DOT = 14;
/**
 * The pencil zone between the child dots and the tool dots: 180-260 px (lead review 2026-09-23; the design's
 * minmax(160, 1fr) took all the slack — 430 px at the en chrome, 600 at the first build — which left the page
 * empty and asked a five-year-old for 40 cm lines).
 */
const ZONE_MIN = 180, ZONE_MAX = 260;
const PLAQUE_PAD = 5;
const fmt = (n) => (Math.round(n * 100) / 100).toString();

function stampAttrs(stamps) {
  return Object.entries(stamps || {}).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
}

function hhFace({ mode, stamps, inner, style = '' }) {
  return `<div class="hh-face" data-ws-content data-lcs-healthy-habits data-lcs-mode="${esc(mode)}"${stampAttrs(stamps)} ` +
    `style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0;${style}">${inner}</div>`;
}

/** The rail band's drawing: rail 639 x 10 r 5 at y 0, pegs r 7 at y 5, two ink 1.5 strings from each peg to its plaque's top corners. */
function hhRail({ n, w = INNER_W, h, colW, plaqueW, plaqueTop = 34 }) {
  const P = [];
  P.push(`<rect x="0" y="0" width="${w}" height="10" rx="5" ry="5" fill="${T.teal}" data-lcs-rail-part="rail"/>`);
  for (let k = 0; k < n; k++) {
    const cx = colW / 2 + k * colW;
    const inset = plaqueW / 2 - 16;
    for (const sx of [-1, 1]) P.push(`<line x1="${fmt(cx)}" y1="5" x2="${fmt(cx + sx * inset)}" y2="${plaqueTop + 1}" stroke="${T.ink}" stroke-width="1.5" stroke-linecap="round" data-lcs-rail-part="string"/>`);
    P.push(`<circle cx="${fmt(cx)}" cy="5" r="7" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="3" data-lcs-rail-part="peg"/>`);
  }
  return `<svg class="hh-rail" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;left:0;top:0;display:block;overflow:visible" aria-hidden="true">${P.join('')}</svg>`;
}

/**
 * The cream plaque (the kindergarten washroom hook card): teal 2.5 border, r 16. The drawing FILLS it (the
 * pictogram is emitted fit:true — its viewBox is the pose's own drawn extent, 100 % x 100 %, meet), so the
 * plaque grows with the page and the child grows with the plaque.
 */
function hhPlaque({ inner, w, habit }) {
  return `<div class="hh-plaque" data-lcs-habit="${esc(habit)}" style="box-sizing:border-box;width:${w}px;flex:1 1 auto;min-height:0;background:${T.cream};border:2.5px solid ${T.teal};border-radius:16px;` +
    `padding:${PLAQUE_PAD}px;display:flex;position:relative;z-index:1">${inner}</div>`;
}

function dot(role) {
  return `<div class="hh-dot" data-lcs-dot="${role}" style="width:${DOT}px;height:${DOT}px;border-radius:50%;background:${T.coral};flex:0 0 auto"></div>`;
}

/** The shelf band: a coral dot over each drawn tool, the tools standing on a teal plank on two brackets. */
function hhShelf({ tools, w = INNER_W, colW, toolPx }) {
  const plankTop = 24 + toolPx;
  const cols = tools.map((kind) => `<div class="hh-shelfcol" style="width:${fmt(colW)}px;display:flex;flex-direction:column;align-items:center">` +
    dot('tool') + `<div style="height:10px"></div>` +
    `<div class="hh-tool" data-lcs-tool="${esc(kind)}" style="width:${toolPx}px;height:${toolPx}px">${HP.habitTool({ kind, px: toolPx, ground: true }).svg}</div></div>`).join('');
  const plank = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="18" viewBox="0 0 ${w} 18" style="position:absolute;left:0;top:${plankTop}px;display:block" aria-hidden="true">` +
    `<rect x="${fmt(w * 60 / 639 - 5)}" y="0" width="10" height="18" rx="2" ry="2" fill="${T.teal}" data-lcs-shelf-part="bracket"/>` +
    `<rect x="${fmt(w * 579 / 639 - 5)}" y="0" width="10" height="18" rx="2" ry="2" fill="${T.teal}" data-lcs-shelf-part="bracket"/>` +
    `<rect x="0" y="0" width="${w}" height="12" rx="4" ry="4" fill="${T.teal}" data-lcs-shelf-part="plank"/></svg>`;
  return `<div class="hh-shelf" style="position:relative;width:${w}px;height:${plankTop + 18}px;display:flex">${cols}${plank}</div>`;
}

/**
 * The base stage. habits / tools = the plaque order and the shelf order (keys of the same length);
 * geom = { plaqueW, plaqueMinH, plaqueMaxH, toolPx }; marks = the cue marks on (d1 / d2) or off (d3).
 *
 * LEAD REVIEW 2026-09-23 (the d2 page read sparse: 110 px empty above the rail, a 600 px empty band): rows
 * [minmax(railMin, railMax)] [minmax(ZONE_MIN, ZONE_MAX)] [shelf], align-content:center. The grid gives the pencil
 * zone its 260 px first, then grows the PLAQUES (so the children grow) up to railMax, and centres whatever is
 * left, so no blank band between two content blocks exceeds 60 px at the 814 / 722 / 677 chromes (gated). The
 * 12 px bottom padding balances the instruction's own trailing margin, so the centred stack sits OPTICALLY centred
 * (measured at 814: 64 / 54 px without it).
 */
function hhHooks({ habits, tools, geom, marks = true, stamps }) {
  const n = habits.length;
  if (tools.length !== n) throw new Error(`hhHooks: ${n} plaques and ${tools.length} tools`);
  const colW = INNER_W / n;
  const { plaqueW, plaqueMinH, plaqueMaxH, toolPx } = geom;
  if (plaqueW > colW) throw new Error(`hhHooks: a ${plaqueW} px plaque does not fit a ${fmt(colW)} px column`);
  if (toolPx > colW) throw new Error(`hhHooks: a ${toolPx} px tool does not fit a ${fmt(colW)} px column`);
  if (!(plaqueMaxH >= plaqueMinH)) throw new Error(`hhHooks: plaque height ${plaqueMinH}..${plaqueMaxH}`);
  const plaqueTop = 34;
  const below = 10 + DOT;
  const railMin = plaqueTop + plaqueMinH + below, railMax = plaqueTop + plaqueMaxH + below;
  const shelfH = 24 + toolPx + 18;
  const cols = habits.map((h) => `<div class="hh-hookcol" style="width:${fmt(colW)}px;height:100%;display:flex;flex-direction:column;align-items:center;padding-top:${plaqueTop}px;box-sizing:border-box">` +
    hhPlaque({ habit: h, w: plaqueW, inner: HP.habitFigure({ pose: h, fit: true, marks }).svg }) +
    `<div style="flex:0 0 10px"></div>` + dot('habit') + '</div>').join('');
  const rail = `<div class="hh-railband" style="position:relative;width:${INNER_W}px;height:100%;display:flex">` +
    hhRail({ n, h: railMin, colW, plaqueW, plaqueTop }) + cols + '</div>';
  const zone = `<div class="hh-linezone" data-lcs-linezone></div>`;
  const inner = `<div class="hh-hooks" style="flex:1 1 auto;min-height:0;box-sizing:border-box;width:675px;padding:0 18px 12px;display:grid;align-content:center;` +
    `grid-template-rows:minmax(${railMin}px,${railMax}px) minmax(${ZONE_MIN}px,${ZONE_MAX}px) ${shelfH}px">` +
    rail + zone + hhShelf({ tools, colW, toolPx }) + '</div>';
  return hhFace({ mode: 'base', stamps: { ...stamps, pairs: n, 'plaque-min': plaqueMinH, 'plaque-max': plaqueMaxH, 'tool-px': toolPx, marks: marks ? '1' : '0', 'zone-min': ZONE_MIN, 'zone-max': ZONE_MAX }, inner });
}

/* =====================================================================================================
 * THE FIVE FACES (Phase E, 2026-09-23; design §3). Every face root is hhFace({mode}); every stage fills the body
 * (grid rows minmax(<floor>, 1fr), the drawings sized by the row) so a face never ends high on the page (FILL) and
 * never opens a blank band > 40 px (SPARSE) — both gated at the 814 / 722 / 677 chromes.
 * ===================================================================================================== */
const { blankNumeralBox } = require('../components-b3/ordinal-numbers.js');
const F = tokens.font;
const plaqueBox = (inner, extra = '', attrs = '') => `<div class="hh-plaque"${attrs} style="box-sizing:border-box;background:${T.cream};border:2.5px solid ${T.teal};border-radius:16px;${extra}">${inner}</div>`;

/** F1 — five sink close-ups, each on a plaque beside an EMPTY numeral box; 2 columns x 3 rows, the fifth centred. */
function hhStepCard({ state, box = { w: 64, h: 60 } }) {
  const pic = `<div class="hh-steppic" style="position:relative;height:100%;aspect-ratio:1/1;max-width:216px;flex:0 1 auto"><div style="position:absolute;inset:0">${HP.handsView({ state, px: '100%' }).svg}</div></div>`;
  return `<div class="hh-stepcard" data-lcs-step-card style="height:100%;display:flex;justify-content:center">` +
    plaqueBox(`${pic}<div style="flex:0 0 14px"></div>` + blankNumeralBox({ w: box.w, h: box.h, attrs: 'data-lcs-step-box' }),
      'height:100%;width:100%;display:flex;align-items:center;justify-content:center;padding:6px 14px 6px 6px;min-width:0') + '</div>';
}
function hhStepGrid({ states, rowMin }) {
  const cells = states.map((st, i) => `<div style="${i === 4 ? 'grid-column:1 / span 2;justify-self:center;width:310px;' : ''}min-height:0">${hhStepCard({ state: st })}</div>`).join('');
  return `<div class="hh-steps" style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:310px 310px;justify-content:center;column-gap:19px;row-gap:16px;` +
    `grid-template-rows:repeat(3,minmax(${rowMin}px,1fr))">${cells}</div>`;
}

/** F2 — one PHASE CELL: the brushing card on a plaque + the same three chips, same order, top to bottom. */
function hhPhaseCell({ kind, chips, card = 128 }) {
  const chip = (k, t) => `<span class="hh-chip" data-lcs-chip="${esc(k)}" style="box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:160px;height:40px;background:${T.white};border:2px solid ${T.teal};border-radius:20px;` +
    `font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:22px;color:${T.ink};white-space:nowrap;overflow:hidden">${esc(t)}</span>`;
  // the cell is ONE panel (white, a soft border) holding its card and its own chip stack, so a chip never reads as
  // belonging to the card in the next row (the first render spread the chips over the row and they did)
  return `<div class="hh-phasecell" data-lcs-phase-cell style="box-sizing:border-box;height:100%;display:flex;align-items:center;justify-content:center;gap:12px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:16px;padding:6px">` +
    plaqueBox(`<div style="width:100%;height:100%">${HP.brushCard({ kind, px: '100%' }).svg}</div>`, `width:${card}px;height:${card}px;padding:6px;flex:0 0 ${card}px`) +
    `<div style="display:flex;flex-direction:column;gap:8px">${chips.map(([k, t]) => chip(k, t)).join('')}</div></div>`;
}
function hhPhaseGrid({ kinds, chips, rowMin = 136 }) {
  return `<div class="hh-phases" style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:320px 320px;justify-content:center;column-gap:15px;row-gap:14px;` +
    `grid-template-rows:repeat(${Math.ceil(kinds.length / 2)},minmax(${rowMin}px,1fr))">` +
    // an odd last card is centred across both columns (7 cards since brush-in-cup was dropped)
    kinds.map((k, i) => (kinds.length % 2 && i === kinds.length - 1 ? `<div style="grid-column:1 / span 2;justify-self:center;width:320px;min-height:0">${hhPhaseCell({ kind: k, chips })}</div>` : hhPhaseCell({ kind: k, chips }))).join('') + '</div>';
}

/** F3 — a row of two plaque tiles 220 wide, 60 apart; each tile draws one behaviour (the calm twin is never shamed). */
function hhPairRow({ left, right, key }) {
  const tile = (t, side) => `<div class="hh-tile" data-lcs-tile="${side}" style="box-sizing:border-box;width:220px;height:100%;min-height:0;background:${T.cream};border:2.5px solid ${T.teal};border-radius:16px;padding:6px"><div style="position:relative;width:100%;height:100%"><div style="position:absolute;inset:0">${t}</div></div></div>`;
  return `<div class="hh-pairrow" data-lcs-pair-row="${esc(key)}" style="height:100%;display:flex;justify-content:center;gap:60px">${tile(left, 'L')}${tile(right, 'R')}</div>`;
}
function hhPairRows({ rows, rowMin = 140 }) {
  return `<div class="hh-pairs" style="flex:1 1 auto;min-height:0;display:grid;row-gap:20px;grid-template-rows:repeat(${rows.length},minmax(${rowMin}px,1fr))">${rows.map((r) => hhPairRow(r)).join('')}</div>`;
}

/** F4 — five habit plaques (tools shown) on the left, five reason cards on the right, a dot on each inner edge. */
function hhReasonMatch({ habits, reasons, rowMin = 108 }) {
  const d = (side) => `<span class="hh-dot" data-lcs-dot="${side}" style="width:14px;height:14px;border-radius:50%;background:${T.coral};display:block"></span>`;
  const rows = habits.map((h, i) => `<div class="hh-matchrow" style="height:100%;min-height:0;display:grid;grid-template-columns:120px 14px 1fr 14px 330px;align-items:center">` +
    plaqueBox(`<div style="position:relative;width:100%;height:100%"><div style="position:absolute;inset:0">${HP.habitFigure({ pose: h.pose, fit: true }).svg}</div></div>`, 'height:100%;min-height:0;padding:5px', ` data-lcs-habit="${esc(h.key)}"`) +
    d('habit') + '<span></span>' + d('reason') +
    `<div class="hh-reason" data-lcs-reason-for="${esc(reasons[i].key)}" style="box-sizing:border-box;height:100%;display:flex;align-items:center;background:${T.white};border:2px solid ${T.teal};border-radius:14px;padding:10px 14px;` +
    `font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:22px;color:${T.ink}"><span data-lcs-reason-text>${esc(reasons[i].text)}</span></div></div>`).join('');
  return `<div class="hh-match" style="flex:1 1 auto;min-height:0;display:grid;row-gap:12px;padding:0 30px;grid-template-rows:repeat(${habits.length},minmax(${rowMin}px,1fr))">${rows}</div>`;
}

/** F5 — the week chart: 7 day heads, one row per habit (a small plaque + the short label), 7 empty tick squares. */
function hhWeekChart({ rows, days, rowMin = 96 }) {
  const cols = 'grid-template-columns:174px repeat(7,66px)';
  const head = `<div style="display:grid;${cols};height:40px;align-items:center">` +
    '<span></span>' + days.map((d) => `<span data-lcs-day-head style="text-align:center;font-family:${F.display},cursive;font-weight:700;font-size:18px;color:${T.teal}">${esc(d)}</span>`).join('') + '</div>';
  const body = rows.map((r, i) => `<div class="hh-chartrow" data-lcs-chart-row="${esc(r.key)}" style="box-sizing:border-box;display:grid;${cols};align-items:center;height:100%;background:${i % 2 ? T.cream : T.white};border:2px solid ${T.creamDeep};border-radius:12px">` +
    '<div style="display:flex;align-items:center;gap:8px;padding-left:2px">' +
    plaqueBox(`<div style="width:100%;height:100%">${HP.habitFigure({ pose: r.pose, fit: true }).svg}</div>`, 'width:72px;height:72px;padding:3px;flex:0 0 72px', ` data-lcs-habit="${esc(r.key)}"`) +
    // text-wrap:balance (FIX ROUND 1, fr panel): a two-line label breaks at its middle, never leaving a short word
    // ("les", "die") stranded at the end of line 1; verify() measures every line end
    `<span data-lcs-row-label style="width:94px;font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:19px;color:${T.ink};overflow-wrap:normal;word-break:normal;hyphens:none;text-wrap:balance">${esc(r.label)}</span></div>` +
    days.map(() => `<span style="display:flex;justify-content:center"><span data-lcs-tick style="box-sizing:border-box;display:block;width:52px;height:52px;background:${T.white};border:1.5px solid ${T.grid};border-radius:8px"></span></span>`).join('') +
    '</div>').join('');
  return `<div class="hh-chart" style="flex:1 1 auto;min-height:0;display:grid;justify-content:center;grid-template-rows:40px repeat(${rows.length},minmax(${rowMin}px,1fr));row-gap:4px">${head}${body}</div>`;
}

module.exports = { hhFace, hhRail, hhPlaque, hhShelf, hhHooks, HH_ZONE: { min: ZONE_MIN, max: ZONE_MAX }, hhStepCard, hhStepGrid, hhPhaseCell, hhPhaseGrid, hhPairRow, hhPairRows, hhReasonMatch, hhWeekChart };
