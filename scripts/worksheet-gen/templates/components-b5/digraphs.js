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
 * FACES (Phase E, 2026-09-23; record _work/G1-380-faces.md): teamHouses (F1) · beadBank +
 * gapWordRow (F2) · beadWord (F3) · socketCard (F4) · sentenceLane (F5) — below. Every word
 * surface sets font-variant-ligatures:none (Nunito's "fi" ligature fused f+i in "fish").
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { teamBead } = require('../../primitives/team-bead.js');
const METRICS = require('../../primitives/font-metrics.json')['baloo2-700'];

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

/* ============================================================== FACES (Phase E, 2026-09-23) */
const FACE_FONT = `${tokens.font.display},cursive`;
const BODY_FONT = `${tokens.font.body},sans-serif`;
const BEAD_DIV = (inner, attrs = '', style = '') => `<div ${attrs} style="line-height:0;flex:0 0 auto;${style}">${inner}</div>`;

/**
 * F1 teamHouses — "Sort by Letter Team" (K). Two TEAM HOUSES (white panel, teal 2.5, r 16)
 * left and right, each crowned 24 px below its top by ONE given bead; between them one
 * column of cream picture cards, each with a match dot on BOTH sides (every picture is
 * equidistant from both houses: no proximity cue). Widths house + gutter + card + gutter +
 * house (d2 190 + 66 + 120 + 66 + 190 = 632 <= 639). Rows minmax(cardMinH, 1fr) + rowGap:
 * the cards STRETCH with the rows (FILL at a tall chrome) and the picture grows with the card
 * up to iconMax, so no blank band between two cards exceeds the row gap.
 *   teams [a, b] · cards [{ src, vocabKey, seg[], snd[], bin }]
 *   cfg { houseW, gutter, cardW, cardMinH, rowGap, iconPx, iconMax, houseBead:{w,h,fontPx} }
 */
function teamHouses({ teams, cards, cfg }) {
  const n = cards.length;
  const cols = `${cfg.houseW}px ${cfg.gutter}px ${cfg.cardW}px ${cfg.gutter}px ${cfg.houseW}px`;
  const house = (t, j) => `<div data-lcs-house="${esc(t)}" data-lcs-col="${j}" style="grid-column:${j === 0 ? 1 : 5};grid-row:1 / ${n + 1};box-sizing:border-box;` +
    `background:${T.white};border:2.5px solid ${T.teal};border-radius:16px;display:flex;flex-direction:column;align-items:center;padding-top:24px">` +
    BEAD_DIV(teamBead({ text: t, w: cfg.houseBead.w, h: cfg.houseBead.h, mode: 'given', fontPx: cfg.houseBead.fontPx }).svg, `data-lcs-housebead="${esc(t)}"`) + `</div>`;
  const card = (c, i) => `<div class="ws-match-item" data-lcs-card="${i + 1}" data-lcs-key="${esc(c.vocabKey)}" data-lcs-seg="${esc(c.seg.join('|'))}" ` +
    `data-lcs-snd="${esc(c.snd.join('|'))}" data-lcs-bin-of="${c.bin}" style="grid-column:3;grid-row:${i + 1};min-height:${cfg.cardMinH}px;box-sizing:border-box">` +
    `<span class="ws-match-dot ws-match-dot--left"></span>` +
    `<img src="${c.src}" alt="" data-lcs-pic="${esc(c.vocabKey)}" style="height:clamp(${cfg.iconPx}px, calc(100% - 16px), ${cfg.iconMax}px);width:auto;max-width:${cfg.cardW - 12}px;aspect-ratio:1/1;object-fit:contain;display:block">` +
    `<span class="ws-match-dot ws-match-dot--right"></span></div>`;
  const html = `<div data-lcs-houses style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:${cols};` +
    `grid-template-rows:repeat(${n},minmax(${cfg.cardMinH}px,1fr));row-gap:${cfg.rowGap}px;justify-content:center;width:100%">` +
    teams.map(house).join('') + cards.map(card).join('') + `</div>`;
  return { html };
}

/**
 * F2 beadBank — the page's teams as GIVEN beads on one short teal wire (no frame: a framed
 * bank read as a place to write). Beads centred at wireW·(2j+1)/(2n).
 */
function beadBank({ teams, bead, wireW }) {
  const n = teams.length;
  const beads = teams.map((t, j) => {
    const x = +(wireW * (2 * j + 1) / (2 * n) - bead.w / 2).toFixed(2);
    return `<div data-lcs-bankbead="${esc(t)}" style="position:absolute;left:${x}px;top:0;width:${bead.w}px;height:${bead.h}px;line-height:0">` +
      teamBead({ text: t, w: bead.w, h: bead.h, mode: 'given', fontPx: bead.fontPx }).svg + `</div>`;
  }).join('');
  return `<div data-lcs-bank style="position:relative;flex:0 0 auto;width:${wireW}px;height:${bead.h}px">` +
    `<div data-lcs-bankwire style="position:absolute;left:0;right:0;top:50%;height:3px;margin-top:-1.5px;background:${T.teal};border-radius:2px"></div>` + beads + `</div>`;
}

/** The text baseline inside a CSS line box of height lineH (content-area metrics of Baloo 2 700, font-metrics.json). */
function lineBoxBaseline(lineH, fontPx) { return (lineH - (METRICS.lineAscent + METRICS.lineDescent) * fontPx) / 2 + METRICS.lineAscent * fontPx; }

/**
 * F2 gapWordRow — numeral · picture cap · the word in Baloo 2 700 with its team replaced by ONE
 * blank bead (no wire stubs inside a word). The word's spans carry line-height = the bead height,
 * so the bead's writing lines sit on the word's own baseline (lineBoxBaseline) and x-height line
 * (baseline − xHeight·F), both from the measured metrics; a zero-size probe marks the rendered
 * baseline for the gate (±1 px).
 *   { n, src, vocabKey, seg[], snd[], gapIdx, first, cfg:{ numW, capPx, iconPx, capGap, wordPx, bead:{w,h} } }
 */
function gapWordRow({ n, src, vocabKey, seg, snd, gapIdx, cfg, first }) {
  const pre = seg.slice(0, gapIdx).join(''), post = seg.slice(gapIdx + 1).join('');
  const from = pre.length, len = seg[gapIdx].length;
  const F = cfg.wordPx, H = cfg.bead.h;
  const bl = +lineBoxBaseline(H, F).toFixed(2);
  const lines = { baseline: bl, mid: +(bl - METRICS.xHeight * F).toFixed(2) };
  const probe = '<i data-lcs-baseprobe style="display:inline-block;width:0;height:0;vertical-align:baseline"></i>';
  const span = (t, side) => `<span data-lcs-part="${side}" style="display:inline-block;font-family:${FACE_FONT};font-weight:700;font-size:${F}px;line-height:${H}px;height:${H}px;color:${T.ink};white-space:nowrap;font-variant-ligatures:none">` +
    `${esc(t)}${side === (pre ? 'pre' : 'post') ? probe : ''}</span>`;
  const bead = BEAD_DIV(teamBead({ text: '', w: cfg.bead.w, h: H, mode: 'blank', lines, inWord: true }).svg, 'data-lcs-gapbead', 'margin:0 6px');
  return `<div data-lcs-gaprow="${n}" data-lcs-key="${esc(vocabKey)}" data-lcs-seg="${esc(seg.join('|'))}" data-lcs-snd="${esc(snd.join('|'))}" ` +
    `data-lcs-gap-from="${from}" data-lcs-gap-len="${len}" style="display:grid;grid-template-columns:${cfg.numW}px ${cfg.capPx}px ${cfg.capGap}px 1fr;align-items:center;` +
    `min-height:0;${first ? '' : `border-top:1.5px dashed ${T.creamDeep};`}">` +
    `<div data-lcs-row-n style="font-family:${BODY_FONT};font-weight:800;font-size:16px;color:${T.inkSoft};text-align:center">${n}</div>` +
    `<div data-lcs-cap style="width:${cfg.capPx}px;height:${cfg.capPx}px;box-sizing:border-box;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:12px;display:flex;align-items:center;justify-content:center">` +
      `<img src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" style="width:${cfg.iconPx}px;height:${cfg.iconPx}px;object-fit:contain;display:block"></div><div></div>` +
    `<div data-lcs-word style="display:flex;align-items:flex-start;height:${H}px">${pre ? span(pre, 'pre') : ''}${bead}${post ? span(post, 'post') : ''}</div></div>`;
}

/**
 * F3 beadWord — a printed word whose team sits inside an inline GIVEN bead (tealSoft capsule,
 * teal 2.5, letters ink, the word's own font): the team is marked, never hidden.
 */
function beadWord({ seg, teamIdx, px, beadH }) {
  const pre = seg.slice(0, teamIdx).join(''), post = seg.slice(teamIdx + 1).join('');
  return `<span data-lcs-bword style="display:inline-flex;align-items:center;font-family:${FACE_FONT};font-weight:700;font-size:${px}px;line-height:1;color:${T.ink};white-space:nowrap;font-variant-ligatures:none">` +
    (pre ? `<span>${esc(pre)}</span>` : '') +
    `<span class="dg-bead" data-lcs-inbead="${esc(seg[teamIdx])}" style="display:inline-flex;align-items:center;height:${beadH}px;padding:0 7px;margin:0 4px;box-sizing:border-box;` +
    `border:2.5px solid ${T.teal};border-radius:${beadH / 2}px;background:${T.tealSoft}">${esc(seg[teamIdx])}</span>` +
    (post ? `<span>${esc(post)}</span>` : '') + `</span>`;
}

/**
 * F4 socketCard — picture left; right column: the item's team as a GIVEN bead, then three BLANK
 * sockets threaded on one grid wire, each under ONE segment of a big START -> END arrow (segment 0
 * opens with a filled start disc, segment 2 closes with the arrowhead): the word's first / middle /
 * last part is shown by POSITION on the arrow, never by a small glyph (the review of 2026-09-23 found
 * the old 12 px three-square keys unreadable to a six-year-old). Each segment is exactly its socket's
 * width and sits directly above it, so the alignment is structural.
 * The card stretches with its grid row; its content stays centred.
 */
function cueSegment(k, w, cue, gap) {
  const y = cue.h / 2, sw = cue.stroke;
  const x1 = k === 0 ? cue.dotR : -gap / 2, x2 = k === 2 ? w - cue.head : w + gap / 2;
  const parts = [`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${T.teal}" stroke-width="${sw}" stroke-linecap="butt"></line>`];
  if (k === 0) parts.push(`<circle cx="${cue.dotR}" cy="${y}" r="${cue.dotR}" fill="${T.teal}" data-lcs-cue-start="1"></circle>`);
  if (k === 2) parts.push(`<polygon points="${w - cue.head},${y - cue.h / 2} ${w},${y} ${w - cue.head},${y + cue.h / 2}" fill="${T.teal}" data-lcs-cue-head="1"></polygon>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${cue.h}" viewBox="0 0 ${w} ${cue.h}" role="img" aria-label="${['start', 'middle', 'end'][k]}" data-lcs-cueseg="${k}" style="display:block;overflow:visible">${parts.join('')}</svg>`;
}
function socketCard({ i, src, vocabKey, seg, snd, silent, team, cfg }) {
  const sockets = [0, 1, 2].map((k) => `<div data-lcs-slot="${k}" style="position:relative;display:flex;flex-direction:column;align-items:center;gap:${cfg.cue.gap}px">` +
    cueSegment(k, cfg.socket.w, cfg.cue, cfg.sockGap) +
    BEAD_DIV(teamBead({ text: '', w: cfg.socket.w, h: cfg.socket.h, mode: 'blank' }).svg, `data-lcs-socket="${k}"`) + `</div>`).join('');
  const wireTop = cfg.cue.h + cfg.cue.gap + cfg.socket.h / 2;
  return `<div data-lcs-poscard="${i + 1}" data-lcs-key="${esc(vocabKey)}" data-lcs-seg="${esc(seg.join('|'))}" data-lcs-snd="${esc(snd.join('|'))}" ` +
    `data-lcs-silent="${esc((silent || []).join('|'))}" data-lcs-team="${esc(team)}" style="box-sizing:border-box;min-height:${cfg.cardMinH}px;background:${T.white};` +
    `border:2px solid ${T.creamDeep};border-radius:14px;padding:8px;display:flex;flex-direction:row;align-items:center;justify-content:center;gap:12px">` +
    `<img src="${src}" alt="" data-lcs-pic="${esc(vocabKey)}" style="width:${cfg.iconPx}px;height:${cfg.iconPx}px;object-fit:contain;display:block;flex:0 0 auto">` +
    `<div style="width:${cfg.colW}px;flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:10px">` +
      BEAD_DIV(teamBead({ text: team, w: cfg.teamBead.w, h: cfg.teamBead.h, mode: 'given', fontPx: cfg.teamBead.fontPx }).svg, `data-lcs-cardbead="${esc(team)}"`) +
      `<div data-lcs-sockets style="position:relative;display:flex;gap:${cfg.sockGap}px">` +
        `<div data-lcs-sockwire style="position:absolute;left:${cfg.socket.w / 2}px;right:${cfg.socket.w / 2}px;top:${wireTop - 1}px;height:2px;background:${T.grid}"></div>` +
        sockets + `</div></div></div>`;
}

/**
 * F5 sentenceLane — a cream lane: numeral · the sentence (Nunito 800, the target NOT marked) ·
 * the OPEN count box (blankNumeralBox, answer never printed). The lane stretches; its content
 * stays centred.
 */
function sentenceLane({ n, id, text, tokens: toks, cfg, blankNumeralBox }) {
  return `<div data-lcs-lane="${n}" data-lcs-sentence="${esc(id)}" data-lcs-tokens="${esc(JSON.stringify(toks))}" style="box-sizing:border-box;min-height:0;flex:1 1 auto;` +
    `background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:10px 14px;display:flex;flex-direction:row;align-items:center">` +
    `<div data-lcs-lane-n style="width:22px;flex:0 0 22px;font-family:${BODY_FONT};font-weight:800;font-size:18px;color:${T.inkSoft};text-align:center">${n}</div>` +
    `<div style="width:10px;flex:0 0 10px"></div>` +
    `<p data-lcs-text style="margin:0;flex:1 1 auto;min-width:0;font-family:${BODY_FONT};font-weight:800;font-size:clamp(${cfg.textPx}px, ${cfg.textCqh}cqh, ${cfg.textMax}px);line-height:${cfg.lineH / cfg.textPx};color:${T.ink};font-variant-ligatures:none">${esc(text)}</p>` +
    `<div style="width:16px;flex:0 0 16px"></div>` +
    blankNumeralBox({ w: cfg.box.w, h: cfg.box.h, answer: '', attrs: `data-lcs-countbox="${n}"` }) + `</div>`;
}

module.exports = { soundAbacus, abacusHeight, abacusWireZoneW: wireZoneW, abacusColumnX: columnX, ABACUS_LANE_W: LANE_W,
  teamHouses, beadBank, gapWordRow, beadWord, socketCard, sentenceLane, digraphLineBoxBaseline: lineBoxBaseline };
