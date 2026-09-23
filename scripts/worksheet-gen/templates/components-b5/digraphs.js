/**
 * components-b5/digraphs.js — the G1-380 `digraphs` components (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-380-digraphs.md §2 "NEW templates/components-b5/digraphs.js").
 * Pure markup on the tokens; the SPEC composes, stamps and guards.
 *
 * BASE (built 2026-09-23):
 *   soundAbacus({ teams, rows, cfg })  -> { html, geom }
 *     "Which Letter Team Do You Hear?" — ONE teal-framed abacus fills the body: across
 *     its top wire hang the KEY beads (given, tealSoft) in page order; below, N wires run
 *     between two teal rails, each carrying the SAME choice beads in the SAME columns;
 *     left of each wire, outside the rail, one picture in a cream cap and its numeral.
 *     No word anywhere. Every row bead is the SAME size whatever the team length
 *     (answer-hiding: `sch` and `ch` alike).
 *       teams  [t, …] page order (column j = teams[j])
 *       rows   [{ n, src, vocabKey, seg[], snd[], answerCol }]
 *       cfg    { capPx, iconPx, rowMin, rowMax, keyH, bead:{w,h,fontPx}, keyBead:{w,h,fontPx} }
 *     Geometry (px): frame border 3, padding 8/12/10/12 on a 639 lane -> content 609;
 *     columns [20 numeral][capPx][16][W = 609 - 20 - capPx - 16 wire zone]; column centres
 *     W·(2j+1)/(2n) (d2: 505 · 1/6, 3/6, 5/6 = 84.2 / 252.5 / 420.8); rails 3 px teal at the
 *     wire zone's two edges, full height; key wire teal 3, row wires grid 2, each running
 *     rail to rail; row-gap 4; rows minmax(rowMin, 1fr), the frame's flex-basis capped at
 *     rowMax (= capPx + 36) so no blank band between rows ever exceeds 40 px (the nt10-D
 *     SPARSE ruling) — at a tall chrome the slack falls BELOW the frame, never between rows.
 *
 * FACE components named by §2 (teamHouses · beadBank · gapWordRow · beadWord · socketCard ·
 * sentenceLane) are Phase 2 (the faces) and are NOT built here yet — recorded in
 * _work/G1-380-build.md.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { teamBead } = require('../../primitives/team-bead.js');

const T = tokens.color;
const LANE_W = 639, BORDER = 3, PAD = { t: 8, r: 12, b: 10, l: 12 };
const CONTENT_W = LANE_W - 2 * BORDER - PAD.l - PAD.r;   // 609
const NUM_W = 20, CAP_GAP = 16, ROW_GAP = 4, RAIL = 3;

/** The frame's outer height for N rows of height rowH (px). */
function abacusHeight({ rows, rowH, keyH }) { return 2 * BORDER + PAD.t + PAD.b + keyH + rows * rowH + rows * ROW_GAP; }
function wireZoneW(capPx) { return CONTENT_W - NUM_W - capPx - CAP_GAP; }
function columnX(j, n, W) { return W * (2 * j + 1) / (2 * n); }

function soundAbacus({ teams, rows, cfg }) {
  const n = teams.length;
  const W = wireZoneW(cfg.capPx);
  if (!(W > 0)) throw new Error(`soundAbacus: capPx ${cfg.capPx} leaves no wire zone`);
  const pitch = W / n;
  if (pitch - cfg.bead.w < 24) throw new Error(`soundAbacus: ${n} beads of ${cfg.bead.w} px leave ${(pitch - cfg.bead.w).toFixed(1)} px between them (< 24, a pencil ring would touch a neighbour)`);
  if (pitch - cfg.keyBead.w < 16) throw new Error(`soundAbacus: key beads of ${cfg.keyBead.w} px crowd the ${pitch.toFixed(1)} px pitch`);
  const cols = teams.map((_, j) => +columnX(j, n, W).toFixed(2));
  const minH = abacusHeight({ rows: rows.length, rowH: cfg.rowMin, keyH: cfg.keyH });
  const maxH = abacusHeight({ rows: rows.length, rowH: cfg.rowMax, keyH: cfg.keyH });
  const gridCols = `${NUM_W}px ${cfg.capPx}px ${CAP_GAP}px ${W}px`;
  const bead = (t, j, mode, b, attrs) => {
    const x = +(cols[j] - b.w / 2).toFixed(2);
    return `<div style="position:absolute;left:${x}px;top:50%;margin-top:${-b.h / 2}px;width:${b.w}px;height:${b.h}px;line-height:0" ${attrs}>` +
      teamBead({ text: t, w: b.w, h: b.h, mode, fontPx: b.fontPx }).svg + `</div>`;
  };
  const wireLine = (px, color, attrs) => `<div ${attrs} style="position:absolute;left:0;right:0;top:50%;height:${px}px;margin-top:${-px / 2}px;background:${color}"></div>`;
  // key row
  const keyRow = `<div data-lcs-keyrow style="display:grid;grid-template-columns:${gridCols};align-items:stretch;height:${cfg.keyH}px">` +
    `<div></div><div></div><div></div>` +
    `<div data-lcs-wirezone style="position:relative">` + wireLine(3, T.teal, 'data-lcs-keywire') +
    teams.map((t, j) => bead(t, j, 'given', cfg.keyBead, `data-lcs-keybead="${esc(t)}" data-lcs-col="${j}"`)).join('') +
    `</div></div>`;
  // wires
  const rowHtml = rows.map((r) =>
    `<div data-lcs-wire="${r.n}" data-lcs-key="${esc(r.vocabKey)}" data-lcs-seg="${esc(r.seg.join('|'))}" data-lcs-snd="${esc(r.snd.join('|'))}" data-lcs-answer-col="${r.answerCol}" ` +
      `style="display:grid;grid-template-columns:${gridCols};align-items:center;min-height:0">` +
      `<div data-lcs-wire-n style="font-family:${tokens.font.body},sans-serif;font-weight:800;font-size:14px;color:${T.inkSoft};text-align:center">${r.n}</div>` +
      `<div data-lcs-cap style="width:${cfg.capPx}px;height:${cfg.capPx}px;box-sizing:border-box;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:12px;display:flex;align-items:center;justify-content:center">` +
        `<img src="${r.src}" alt="" data-lcs-pic="${esc(r.vocabKey)}" style="width:${cfg.iconPx}px;height:${cfg.iconPx}px;object-fit:contain;display:block"></div>` +
      `<div></div>` +
      `<div data-lcs-wirezone style="position:relative;align-self:stretch">` + wireLine(2, T.grid, 'data-lcs-rowwire') +
        teams.map((t, j) => bead(t, j, 'choice', cfg.bead, `data-lcs-bead="${esc(t)}" data-lcs-col="${j}"`)).join('') +
      `</div></div>`).join('');
  const railLeft = BORDER + PAD.l + NUM_W + cfg.capPx + CAP_GAP - BORDER;   // relative to the padding box
  const rail = (side) => `<div data-lcs-rail="${side}" style="position:absolute;top:${PAD.t}px;bottom:${PAD.b}px;${side === 'L' ? `left:${railLeft}px` : `left:${railLeft + W - RAIL}px`};width:${RAIL}px;background:${T.teal};border-radius:2px"></div>`;
  const html = `<div class="dg-abacus" data-lcs-abacus style="position:relative;box-sizing:border-box;width:${LANE_W}px;flex:0 1 ${maxH}px;min-height:${minH}px;` +
    `border:${BORDER}px solid ${T.teal};border-radius:16px;background:${T.white};padding:${PAD.t}px ${PAD.r}px ${PAD.b}px ${PAD.l}px;` +
    `display:grid;grid-template-rows:${cfg.keyH}px repeat(${rows.length},minmax(${cfg.rowMin}px,1fr));row-gap:${ROW_GAP}px">` +
    rail('L') + rail('R') + keyRow + rowHtml + `</div>`;
  return { html, geom: { W, cols, minH, maxH } };
}

module.exports = { soundAbacus, abacusHeight, abacusWireZoneW: wireZoneW, abacusColumnX: columnX, ABACUS_LANE_W: LANE_W };
