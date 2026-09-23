/**
 * team-bead.js — the SOUND BEAD (G1-380 `digraphs`, nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-380-digraphs.md §2 "NEW primitives/team-bead.js").
 *
 * Every letter team is printed inside ONE stadium capsule because it is ONE sound.
 * Three states, legible in greyscale:
 *   given   tealSoft fill + teal 2.5 ring       (the key / a team already there)
 *   choice  white fill   + teal 2.5 ring        (a bead the child may circle)
 *   blank   white fill   + coral 2.5 dash 6 5   (pencil here; never carries text)
 * Letters are ALWAYS ink (never coral: coral letters are the syllable-reading /
 * spelling-rules convention and vanish on a toner-saving printer), ONE <text>
 * per bead (never one per letter), Baloo 2 700.
 *
 *   teamBead({ text='', w, h, mode='given'|'choice'|'blank', fontPx, lines=null,
 *              stubL=0, stubR=0, inWord=false, data={} })
 *     -> { svg, width: w + stubL + stubR, height: h, textW }
 *
 * Geometry (px, stroke never scaled): sw 2.5; capsule rect x = stubL + sw/2,
 * y = sw/2, w - sw, h - sw, rx = (h - sw)/2. Text baseline
 * y = round((h - (asc + desc)·fontPx)/2 + asc·fontPx) with asc / desc READ from
 * primitives/font-metrics.json "baloo2-700" (ascender / descender) — never typed in.
 * textW = primitives/team-bead.widths.json em[text] x fontPx (tools/measure-team-beads.js,
 * Baloo 2 700 on the shell woff2); a team missing from that table THROWS.
 * `lines` (blank only): { baseline, mid } in bead px, from the MEASURED metrics of the
 * word beside it (F2) — grid 1.5 solid baseline / grid 1.5 dash 3 4 midline, from
 * x = stubL + 0.7·rx to stubL + w − 0.7·rx. Stubs: wire segments at y = h/2, grid 2,
 * ONLY on an abacus / socket wire (inWord:true with a stub THROWS).
 *
 * Throws: h < 34 · w < h · text && textW > w − 24 · mode 'blank' with text ·
 * a stub on an inWord bead · an unknown mode.
 * Stamps: data-lcs-prim="team-bead", data-lcs-bead-mode, data-lcs-bead-text (given /
 * choice only), data-lcs-bead-w / -h.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el, esc } = require('./_svg.js');
const METRICS = require('./font-metrics.json')['baloo2-700'];
const WIDTHS = require('./team-bead.widths.json').em;

const T = tokens.color;
const SW = 2.5;
const MODES = ['given', 'choice', 'blank'];
const r2 = (v) => Math.round(v * 100) / 100;

/** The measured advance width of a team at fontPx (throws on a team the table lacks). */
function teamTextW(text, fontPx) {
  if (!Object.prototype.hasOwnProperty.call(WIDTHS, text)) throw new Error(`team-bead: "${text}" is not in primitives/team-bead.widths.json — add it to tools/measure-team-beads.js and re-measure (never guess a width)`);
  return WIDTHS[text] * fontPx;
}
/** The text baseline inside a bead of height h (px, from the measured Baloo 2 700 ink box). */
function beadBaseline(h, fontPx) { return Math.round((h - (METRICS.ascender + METRICS.descender) * fontPx) / 2 + METRICS.ascender * fontPx); }

function teamBead({ text = '', w, h, mode = 'given', fontPx, lines = null, stubL = 0, stubR = 0, inWord = false, data = {} }) {
  if (!MODES.includes(mode)) throw new Error(`team-bead: unknown mode "${mode}"`);
  if (!(h >= 34)) throw new Error(`team-bead: h ${h} < 34`);
  if (!(w >= h)) throw new Error(`team-bead: w ${w} < h ${h} (a bead is a capsule, never a disc)`);
  if (mode === 'blank' && text) throw new Error('team-bead: a blank bead never carries text');
  if (mode !== 'blank' && !text) throw new Error(`team-bead: a ${mode} bead needs its team text`);
  if (inWord && (stubL || stubR)) throw new Error('team-bead: a stub inside a word row (stubs belong on an abacus / socket wire only)');
  if (lines && mode !== 'blank') throw new Error('team-bead: writing lines belong on a blank bead only');
  let textW = 0;
  if (text) {
    if (!(fontPx > 0)) throw new Error('team-bead: fontPx is required with text');
    textW = teamTextW(text, fontPx);
    if (textW > w - 24) throw new Error(`team-bead: "${text}" is ${textW.toFixed(1)} px at ${fontPx} px — wider than the bead's ${w} − 24`);
  }
  const width = w + stubL + stubR;
  const rx = (h - SW) / 2;
  const parts = [];
  if (stubL) parts.push(el('line', { x1: 0, y1: h / 2, x2: stubL + SW, y2: h / 2, stroke: T.grid, 'stroke-width': 2, 'data-lcs-stub': 'L' }));
  if (stubR) parts.push(el('line', { x1: stubL + w - SW, y1: h / 2, x2: width, y2: h / 2, stroke: T.grid, 'stroke-width': 2, 'data-lcs-stub': 'R' }));
  parts.push(el('rect', {
    x: r2(stubL + SW / 2), y: SW / 2, width: r2(w - SW), height: r2(h - SW), rx: r2(rx), ry: r2(rx),
    fill: mode === 'given' ? T.tealSoft : T.white,
    stroke: mode === 'blank' ? T.coral : T.teal, 'stroke-width': SW,
    'stroke-dasharray': mode === 'blank' ? '6 5' : undefined,
    'data-lcs-bead-body': '1',
  }));
  if (lines) {
    const x1 = r2(stubL + 0.7 * rx), x2 = r2(stubL + w - 0.7 * rx);
    parts.push(el('line', { x1, y1: lines.baseline, x2, y2: lines.baseline, stroke: T.grid, 'stroke-width': 1.5, 'data-lcs-bead-line': 'baseline' }));
    parts.push(el('line', { x1, y1: lines.mid, x2, y2: lines.mid, stroke: T.grid, 'stroke-width': 1.5, 'stroke-dasharray': '3 4', 'data-lcs-bead-line': 'mid' }));
  }
  if (text) {
    parts.push(el('text', {
      x: r2(stubL + w / 2), y: beadBaseline(h, fontPx),
      'font-family': `${tokens.font.display}, cursive`, 'font-size': fontPx, 'font-weight': 700,
      fill: T.ink, 'text-anchor': 'middle', 'data-lcs-bead-letters': '1',
    }, esc(text)));
  }
  const attrs = {
    'data-lcs-prim': 'team-bead', 'data-lcs-bead-mode': mode, 'data-lcs-bead-w': w, 'data-lcs-bead-h': h,
    ...(mode !== 'blank' ? { 'data-lcs-bead-text': text } : {}),
    ...data,
    style: 'display:block;overflow:visible',
  };
  const svg = svgRoot({ width, height: h, label: mode === 'blank' ? 'empty letter team' : text }, parts.join(''), attrs);
  return { svg, width, height: h, textW };
}

module.exports = { teamBead, teamTextW, beadBaseline, BEAD_STROKE: SW, BEAD_MODES: MODES };
