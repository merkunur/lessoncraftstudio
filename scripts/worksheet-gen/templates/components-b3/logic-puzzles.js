/**
 * components-b3/logic-puzzles.js — the G2-319 `logic-puzzles` HTML components
 * (design file §2 "NEW in templates/components-b3.js"). Type-scoped; merged
 * into the components-b3 namespace by templates/components-b3.js. The base
 * consumes clueRow + answerBank; the Phase-2 faces (2026-09-14) add
 * pictureClue (F3), glyphChip + statementRow (F5). clueRow / answerBank are
 * byte-identical (tools/b3-baseline.js).
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
 *   pictureClue({ n, name, src, alt, not, pic=56, col })
 *     One F3 picture clue (pre-reader, no sentence): `[name tile Nunito 800 16,
 *     white r 8 teal 2][8][ring 56: circle r 26 stroke 2.5, coral when `not`,
 *     teal when has + the picture 48 (opacity .85 when not) + notMark(56)
 *     when not]`. Row 56 high, `data-lcs-clue="n-1"` + `data-lcs-not="1"` or
 *     `data-lcs-has="1"`; the picture carries `data-lcs-pic="col"`. The name
 *     is the ONLY text; no badge, no sentence.
 *   glyphChip({ kind:'yes'|'no', px=40 })
 *     A white circle, teal 2 px border, with the teal ✓ or coral ✗ mark
 *     (primitives/logic-grid.js markGlyph); `data-lcs-glyph="yes|no"`, no
 *     fill, no ring, no data-lcs-answer: the F5 child circles one.
 *   statementRow({ n, html, glyph=40 })
 *     One F5 statement: `[badge 26][8][text Nunito 800 18][8][glyphChip yes]
 *     [6][glyphChip no]`, `data-lcs-stmt="n-1"`, min height = glyph.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');

const { notMark, markGlyph } = require('../../primitives/logic-grid.js');

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

/* ------------------------------------------------------------------ Phase-2 faces (additive) */
function pictureClue({ n, name, src, alt, not, pic = 56, col }) {
  if (!(n >= 1)) throw new Error('pictureClue: n must be >= 1');
  if (typeof name !== 'string' || !name.trim()) throw new Error('pictureClue: name must be a non-empty string');
  if (typeof src !== 'string' || !src) throw new Error('pictureClue: src required');
  if (!(pic >= 44)) throw new Error('pictureClue: ring ' + pic + ' < the G1 floor 44');
  const inner = Math.round(pic * 48 / 56);
  const r = pic / 2 - 2;
  const tile = `<span data-lcs-nametile style="display:inline-flex;align-items:center;height:32px;padding:0 10px;border:2px solid ${T.teal};border-radius:8px;background:${T.white};` +
    `font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:1;color:${T.ink};white-space:nowrap;box-sizing:border-box">${esc(name)}</span>`;
  const ring = `<svg xmlns="http://www.w3.org/2000/svg" width="${pic}" height="${pic}" viewBox="0 0 ${pic} ${pic}" aria-hidden="true" style="position:absolute;left:0;top:0">` +
    `<circle cx="${pic / 2}" cy="${pic / 2}" r="${r}" fill="${T.white}" stroke="${not ? T.coral : T.teal}" stroke-width="2.5"/></svg>`;
  const img = `<img class="ws-icon" src="${esc(src)}" alt="${esc(alt || '')}" data-lcs-pic="${col}" style="position:absolute;left:${(pic - inner) / 2}px;top:${(pic - inner) / 2}px;width:${inner}px;height:${inner}px;${not ? 'opacity:.85' : ''}">`;
  const cross = not ? `<span style="position:absolute;left:0;top:0;line-height:0">${notMark(pic)}</span>` : '';
  return `<div data-lcs-clue="${n - 1}" ${not ? 'data-lcs-not="1"' : 'data-lcs-has="1"'} style="display:flex;align-items:center;gap:8px;height:${pic}px">${tile}` +
    `<span data-lcs-ring style="position:relative;display:inline-block;width:${pic}px;height:${pic}px;flex:0 0 ${pic}px">${ring}${img}${cross}</span></div>`;
}

function glyphChip({ kind, px = 40 }) {
  if (kind !== 'yes' && kind !== 'no') throw new Error('glyphChip: kind must be yes|no');
  if (!(px >= 36)) throw new Error('glyphChip: ' + px + ' < the G2 floor 36');
  return `<span data-lcs-glyph="${kind}" style="display:inline-flex;align-items:center;justify-content:center;width:${px}px;height:${px}px;flex:0 0 ${px}px;` +
    `border-radius:50%;border:2px solid ${T.teal};background:${T.white};box-sizing:border-box;line-height:0">${markGlyph(kind, px - 8)}</span>`;
}

function statementRow({ n, html, glyph = 40 }) {
  if (!(n >= 1)) throw new Error('statementRow: n must be >= 1');
  if (typeof html !== 'string' || !html.trim()) throw new Error('statementRow: html must be a non-empty string');
  const badge = `<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;flex:0 0 26px;border-radius:50%;` +
    `background:${T.teal};color:${T.white};font-family:${F.display},cursive;font-weight:700;font-size:15px;line-height:1">${n}</span>`;
  const text = `<span style="flex:1 1 auto;min-width:0;font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:1.35;color:${T.ink}" data-lcs-stmt-text>${html}</span>`;
  return `<div data-lcs-stmt="${n - 1}" style="display:flex;align-items:center;gap:8px;min-height:${glyph}px">${badge}${text}${glyphChip({ kind: 'yes', px: glyph })}${glyphChip({ kind: 'no', px: glyph }).replace('style="', 'style="margin-left:-2px;')}</div>`;   // badge 26 + 3 gaps 24 + 2 chips 80 - 2 = 128 (text = column - 128)
}

module.exports = { clueRow, answerBank, pictureClue, glyphChip, statementRow };
