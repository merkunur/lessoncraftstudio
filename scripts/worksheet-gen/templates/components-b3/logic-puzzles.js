/**
 * components-b3/logic-puzzles.js — the G2-319 `logic-puzzles` HTML components
 * (design file §2 "NEW in templates/components-b3.js"). Type-scoped; merged
 * into the components-b3 namespace by templates/components-b3.js. Only the
 * names the BASE consumes are exported (`pictureClue` and `glyphChip` are the
 * F3 / F5 faces' components, Phase 2 — unexported so the namespace stays
 * free of dead names).
 *
 *   clueRow({ n, html, w })
 *     One numbered clue: `[badge 26 teal circle, Baloo 2 700 15 white][8]
 *     [text Nunito 800 18, lh 1.35]`, `data-lcs-clue="n-1"`. `html` is the
 *     ALREADY-FILLED sentence (the spec fills the frame through
 *     lib/b3-instructions.js fillSlots with the `<img>` markup as the slot
 *     value and every other character escaped); this component never sees a
 *     noun. Row height is content-driven (`minmax(<line>,auto)` in the
 *     column) so a two-line sentence (fr `holderNot`) grows the row.
 *   answerBank({ rows:[{name, pics:[{src, alt}]}], pic=36, w=675, stack=false })
 *     The answer strip under a case: one chip per child, `[pad 6][name Nunito
 *     800 16][8][pictures pic px, gap 4][pad 6]`, chips of (w − 16·(k−1)) / k
 *     wide × 48 high; pictures in COLUMN order (never the solution's), NO
 *     ring, NO data-lcs-answer — `data-lcs-answer-slot="r"` only. `stack:true`
 *     (the F3 face) puts the name above the pictures (152 × 72 chips).
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');

const T = tokens.color;
const F = tokens.font;

function clueRow({ n, html, w }) {
  if (!(n >= 1)) throw new Error('clueRow: n must be >= 1');
  if (typeof html !== 'string' || !html.trim()) throw new Error('clueRow: html must be a non-empty string');
  const badge = `<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;flex:0 0 26px;border-radius:50%;` +
    `background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:15px;line-height:1;margin-top:5px">${n}</span>`;
  const text = `<span style="flex:1 1 auto;min-width:0;font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:1.35;color:${T.ink}" data-lcs-clue-text>${html}</span>`;
  return `<div data-lcs-clue="${n - 1}" style="display:flex;align-items:flex-start;gap:8px;${w ? `width:${w}px;` : ''}">${badge}${text}</div>`;
}

function answerBank({ rows, pic = 36, w = 675, stack = false }) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('answerBank: rows must be a non-empty array');
  const k = rows.length;
  const gap = 16;
  const chipW = Math.floor((w - gap * (k - 1)) / k);
  const chipH = stack ? 72 : 48;
  const chips = rows.map((r, i) => {
    if (!r || typeof r.name !== 'string' || !r.name.trim() || !Array.isArray(r.pics) || !r.pics.length) throw new Error('answerBank: row ' + i + ' needs {name, pics[]}');
    const pics = r.pics.map((p) => `<img class="ws-icon" src="${esc(p.src)}" alt="${esc(p.alt || '')}" style="width:${pic}px;height:${pic}px;flex:0 0 ${pic}px">`).join('');
    const name = `<span style="font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:1;color:${T.ink};white-space:nowrap">${esc(r.name)}</span>`;
    const inner = stack
      ? `${name}<span style="display:inline-flex;gap:4px;margin-top:6px">${pics}</span>`
      : `${name}<span style="width:8px;flex:0 0 8px"></span><span style="display:inline-flex;gap:4px">${pics}</span>`;
    return `<div data-lcs-answer-slot="${i}" style="display:${stack ? 'inline-flex' : 'flex'};flex-direction:${stack ? 'column' : 'row'};align-items:center;justify-content:${stack ? 'center' : 'flex-start'};` +
      `width:${chipW}px;height:${chipH}px;flex:0 0 ${chipW}px;padding:0 6px;box-sizing:border-box;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:12px">${inner}</div>`;
  }).join('');
  return `<div data-lcs-answerbank style="display:flex;gap:${gap}px;width:${w}px;height:${chipH}px;flex:0 0 ${chipH}px;justify-content:${stack ? 'center' : 'flex-start'}">${chips}</div>`;
}

module.exports = { clueRow, answerBank };
