/**
 * word-brick.js — the G2-359 `word-parts` brick (nt10-E; design
 * docs/worksheet-gen/b5-designs/G2-359-word-parts.md §2 "NEW primitives/word-brick.js").
 * Pure SVG on the tokens, Node-testable; the render gate is qa/verify-word-brick.js.
 *
 * A word part is a BRICK whose SILHOUETTE says its role (never the colour, so a mono
 * copier keeps the grammar):
 *   'stem'    dovetail TAB on both sides        fill tealSoft  stroke teal 3
 *   'word'    no joints (rounded rect)          fill cream     stroke teal 2
 *   'prefix'  a NOTCH in the right edge         fill cream     stroke teal 2
 *   'socket-stem' | 'socket-word' | 'socket-prefix'
 *             that silhouette, fill white, stroke coral 2.5, dasharray "7 5" (a place to write)
 *
 * Geometry (viewBox "0 0 w h" = px): TAB 8 deep, base 12 at the body edge, tip 18 wide
 * (a dovetail), centred on cy = h/2, corner R 6. Every coordinate is INSET by stroke/2
 * (L = s, R = w - s, T = s, B = h - s), so the stroked outline's outer box is exactly
 * w x h. A stem's body runs x0 = L + 8 .. x1 = R - 8 (each tab protrudes 8 beyond it);
 * a prefix's body is L..R with the notch = the tab's exact negative cut 8 deep into R.
 *
 * brickJoin(pieces): a prefix followed by a stem. The two outlines have different
 * stroke insets (prefix 1, stem 1.5), so the stem is pulled left by JOIN_OVERLAP =
 * TAB + 1 + 1.5 = 10.5 px (the design's "margin-left:-8px" measured against the true
 * inset geometry) — the stem's tab tip lands exactly on the notch's inner wall and its
 * body edge on the prefix's right edge: the four dovetail points coincide, and the
 * stem (the later sibling, stroke 3) paints the joint as one teal line.
 *
 * Text: centred on the BODY centre (stem x0..x1; word L..R; prefix L..R-8), baseline
 * y = h/2 + 0.3594 * fontPx (half the MEASURED nunito cap 0.7188 — font-metrics.json),
 * Nunito 800 or Baloo 2 700, fill ink; data-lcs-brick-text.
 *
 * THROWS (never squash, never textLength): h < 36 (G2/G3) or < 44 (band G1); body
 * width < 48; fontPx < 17; brickEstimate(fontPx, glyphs) > body width.
 * brickEstimate(px, glyphs) = 24 + 0.60 * px * glyphs (12 px/glyph at 20, above every
 * literal measured in the real Nunito 800 — the design's 0.52 was measured on a fallback).
 *
 * Stamps on <svg>: data-lcs-brick="<role>" data-lcs-bw="<w>" data-lcs-bh="<h>".
 */
'use strict';
const tokens = require('./_tokens.js');
const { esc } = require('./_svg.js');
const { writingRow } = require('./trace-path.js');

const T = tokens.color;
const TAB = 8;          // tab depth (px)
const TAB_BASE = 12;    // tab width at the body edge
const TAB_TIP = 18;     // tab width at its tip (a dovetail: tip > base)
/** The live dovetail widths (an object so the gate can poison the TAB alone: tabTip = base = a straight tab). */
const DOVE = { base: TAB_BASE, tabTip: TAB_TIP, notchTip: TAB_TIP };
const R = 6;            // corner radius
const CAP_HALF = 0.3594; // half the measured cap-height ratio (nunito 0.7188)
const COEFF = { value: 0.60 }; // brickEstimate coefficient (an object so the gate can poison it)
const ROLES = ['stem', 'word', 'prefix', 'socket-stem', 'socket-word', 'socket-prefix'];
const STYLE = {
  stem: { fill: T.tealSoft, stroke: T.teal, sw: 3, dash: null },
  word: { fill: T.cream, stroke: T.teal, sw: 2, dash: null },
  prefix: { fill: T.cream, stroke: T.teal, sw: 2, dash: null },
  socket: { fill: T.white, stroke: T.coral, sw: 2.5, dash: '7 5' },
};
const JOIN_OVERLAP = TAB + STYLE.prefix.sw / 2 + STYLE.stem.sw / 2;   // 10.5

const N = (v) => +(+v).toFixed(2);
function glyphCount(s) { return [...String(s).normalize('NFC')].length; }
function brickEstimate(px, glyphs) { return 24 + COEFF.value * px * glyphs; }
function shapeOf(role) { return role.replace(/^socket-/, ''); }
function styleOf(role) { return role.startsWith('socket-') ? STYLE.socket : STYLE[role]; }

/** The silhouette path + the body span for a role at w x h with stroke sw. */
function geometry(role, w, h, sw) {
  const shape = shapeOf(role);
  const s = sw / 2;
  const L = s, Rr = w - s, Tt = s, B = h - s, cy = h / 2;
  const hb = DOVE.base / 2, ht = (shape === 'prefix' ? DOVE.notchTip : DOVE.tabTip) / 2;
  let d, body;
  if (shape === 'stem') {
    const x0 = L + TAB, x1 = Rr - TAB;
    d = `M${N(x0 + R)},${N(Tt)} H${N(x1 - R)} Q${N(x1)},${N(Tt)} ${N(x1)},${N(Tt + R)} V${N(cy - hb)} L${N(Rr)},${N(cy - ht)} V${N(cy + ht)} L${N(x1)},${N(cy + hb)} ` +
      `V${N(B - R)} Q${N(x1)},${N(B)} ${N(x1 - R)},${N(B)} H${N(x0 + R)} Q${N(x0)},${N(B)} ${N(x0)},${N(B - R)} V${N(cy + hb)} L${N(L)},${N(cy + ht)} V${N(cy - ht)} L${N(x0)},${N(cy - hb)} ` +
      `V${N(Tt + R)} Q${N(x0)},${N(Tt)} ${N(x0 + R)},${N(Tt)} Z`;
    body = { x0, x1 };
  } else if (shape === 'prefix') {
    d = `M${N(L + R)},${N(Tt)} H${N(Rr - R)} Q${N(Rr)},${N(Tt)} ${N(Rr)},${N(Tt + R)} V${N(cy - hb)} L${N(Rr - TAB)},${N(cy - ht)} V${N(cy + ht)} L${N(Rr)},${N(cy + hb)} ` +
      `V${N(B - R)} Q${N(Rr)},${N(B)} ${N(Rr - R)},${N(B)} H${N(L + R)} Q${N(L)},${N(B)} ${N(L)},${N(B - R)} V${N(Tt + R)} Q${N(L)},${N(Tt)} ${N(L + R)},${N(Tt)} Z`;
    body = { x0: L, x1: Rr - TAB };
  } else if (shape === 'word') {
    d = `M${N(L + R)},${N(Tt)} H${N(Rr - R)} Q${N(Rr)},${N(Tt)} ${N(Rr)},${N(Tt + R)} V${N(B - R)} Q${N(Rr)},${N(B)} ${N(Rr - R)},${N(B)} H${N(L + R)} Q${N(L)},${N(B)} ${N(L)},${N(B - R)} V${N(Tt + R)} Q${N(L)},${N(Tt)} ${N(L + R)},${N(Tt)} Z`;
    body = { x0: L, x1: Rr };
  } else throw new Error(`word-brick: unknown role "${role}"`);
  return { d, body, cy };
}

/**
 * wordBrick({role, w, h=44, text='', font='body'|'display', fontPx=20, band='G2', attrs=''}) -> svg string
 */
function wordBrick({ role, w, h = 44, text = '', font = 'body', fontPx = 20, band = 'G2', attrs = '', stretch = false } = {}) {
  if (!ROLES.includes(role)) throw new Error(`word-brick: unknown role "${role}" (${ROLES.join(' | ')})`);
  if (!(w > 0)) throw new Error('word-brick: w must be > 0');
  const floorH = band === 'G1' ? 44 : 36;
  if (!(h >= floorH)) throw new Error(`word-brick: h ${h} < the ${band} floor ${floorH}`);
  const st = styleOf(role);
  const g = geometry(role, w, h, st.sw);
  const bodyW = g.body.x1 - g.body.x0;
  if (!(bodyW >= 48)) throw new Error(`word-brick: body width ${N(bodyW)} < 48`);
  let txt = '';
  if (text !== '' && text != null) {
    if (!(fontPx >= 17)) throw new Error(`word-brick: fontPx ${fontPx} < 17`);
    const est = brickEstimate(fontPx, glyphCount(text));
    if (est > bodyW + 1e-9) throw new Error(`word-brick: "${text}" needs ${N(est)} px (brickEstimate) > the ${N(bodyW)} px body — widen the brick, never squash`);
    const family = font === 'display' ? tokens.font.display : tokens.font.body;
    const weight = font === 'display' ? 700 : 800;
    const cx = (g.body.x0 + g.body.x1) / 2;
    const y = h / 2 + CAP_HALF * fontPx;
    txt = `<text x="${N(cx)}" y="${N(y)}" text-anchor="middle" font-family="${esc(family)}" font-weight="${weight}" font-size="${fontPx}" fill="${T.ink}" data-lcs-brick-text="">${esc(text)}</text>`;
  }
  const dash = st.dash ? ` stroke-dasharray="${st.dash}"` : '';
  // stretch: a jointless silhouette ('word' / 'socket-word', no text) may grow TALLER than h
  // (the course absorbs page slack): the svg fills its box vertically, the stroke stays
  // st.sw px (non-scaling) — only the straight sides lengthen and the R 6 corners go
  // slightly elliptical. A tab or notch would distort, so it refuses.
  if (stretch && (shapeOf(role) !== 'word' || txt)) throw new Error(`word-brick: only a text-free 'word' silhouette may stretch (got ${role})`);
  const sizing = stretch ? `width="${N(w)}" height="100%" preserveAspectRatio="none"` : `width="${N(w)}" height="${N(h)}"`;
  const vfx = stretch ? ' vector-effect="non-scaling-stroke"' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" ${sizing} viewBox="0 0 ${N(w)} ${N(h)}" role="img" aria-label="${esc(text || role)}" style="display:block;overflow:visible" ` +
    `data-lcs-brick="${role}" data-lcs-bw="${N(w)}" data-lcs-bh="${N(h)}" data-lcs-body="${N(g.body.x0)},${N(g.body.x1)}"${attrs ? ' ' + attrs : ''}>` +
    `<path d="${g.d}" fill="${st.fill}" stroke="${st.stroke}" stroke-width="${st.sw}" stroke-linejoin="round"${dash}${vfx} data-lcs-brick-outline=""/>` +
    txt + `</svg>`;
}

/** Width a brick of `role` needs to hold `text` at fontPx (the estimate + the tabs / notch). */
function brickWidthFor(role, text, fontPx) {
  const shape = shapeOf(role), sw = styleOf(role).sw;
  const est = brickEstimate(fontPx, glyphCount(text));
  const extra = shape === 'stem' ? 2 * TAB + sw : shape === 'prefix' ? TAB + sw : sw;
  return Math.ceil(Math.max(est, 48) + extra);
}

/**
 * brickJoin(pieces): pieces = [svg strings] in reading order (a prefix, then a stem);
 * every piece after the first is pulled left by JOIN_OVERLAP so a tab lands in the notch.
 */
function brickJoin(pieces) {
  return `<span style="display:inline-flex;align-items:center" data-lcs-brick-join="">` +
    pieces.map((p, i) => `<span style="display:block;${i ? `margin-left:-${JOIN_OVERLAP}px;` : ''}position:relative">${p}</span>`).join('') + `</span>`;
}

/**
 * brickSocket({shape, w, h, glyphH, attrs}): a place to write — the `socket-<shape>` silhouette
 * (dashed coral) with a school-lined writingRow inside its body (w = bodyW - 16, h = h - 8,
 * at body-left + 8, top 4). Prints NO text and NO answer stamp.
 */
function brickSocket({ shape = 'word', w, h, glyphH, attrs = '', maxH = null } = {}) {
  const role = 'socket-' + shape;
  const grow = maxH != null && maxH > h;
  const svg = wordBrick({ role, w, h, stretch: grow });
  const g = geometry(role, w, h, STYLE.socket.sw);
  const rowW = Math.floor(g.body.x1 - g.body.x0 - 16);
  if (rowW < 40) throw new Error(`word-brick: socket body too narrow for a writing row (${rowW})`);
  const row = writingRow({ w: rowW, h: h - 8, glyphH, xHeight: true });
  const box = grow ? `width:${N(w)}px;flex:1 1 ${N(h)}px;min-height:${N(h)}px;max-height:${N(maxH)}px` : `width:${N(w)}px;height:${N(h)}px;flex:0 0 auto`;
  return `<div data-lcs-socket="${shape}" data-lcs-glyph-h="${glyphH}" style="position:relative;${box}"${attrs ? ' ' + attrs : ''}>` +
    `<div style="position:absolute;left:0;top:0;bottom:0">${svg}</div>` +
    `<div style="position:absolute;left:${N(g.body.x0 + 8)}px;top:calc(50% - ${N((h - 8) / 2)}px);line-height:0" data-lcs-socket-row="">${row.svg}</div></div>`;
}

module.exports = { brickSocket, wordBrick, brickEstimate, brickWidthFor, brickJoin, glyphCount, geometry, TAB, TAB_BASE, TAB_TIP, DOVE, ROLES, STYLE, JOIN_OVERLAP, COEFF, CAP_HALF };
