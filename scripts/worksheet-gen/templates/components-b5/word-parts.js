/**
 * components-b5/word-parts.js — the G2-359 `word-parts` components (nt10-E; design
 * docs/worksheet-gen/b5-designs/G2-359-word-parts.md §2 "NEW templates/components-b5/word-parts.js").
 * Pure markup on the tokens + primitives/word-brick.js; the SPEC composes, stamps and
 * guards. Class prefix `wp-`; every export is type-scoped `wordPart…`.
 *
 * BASE (built 2026-09-23):
 *   wordPartBank({ words:[{word, famId}], px=20, h=40, gapX=10, gapY=8, maxRows=3, inner=643 })
 *     -> { html, rows }  a cream panel (border 2 creamDeep, r 14, pad 10 14 -> inner 643)
 *     holding the member bricks (role 'word', Nunito 800 px, each as wide as
 *     brickWidthFor(word)), flex-wrap, centred. Greedy-packs the widths first and THROWS
 *     above maxRows (never a 4th row, never a smaller font). Each brick stamps
 *     data-lcs-bank-brick data-lcs-word=<literal> data-lcs-family-of=<famId>.
 *   wordPartStone({ word, pic, w, h=76, picPx=56, fontPx=30 })
 *     the foundation STONE: a 'stem' brick (dovetail tabs, tealSoft, teal 3) with the
 *     picture (picPx, at body-left + 10, vertically centred) and the root word (Baloo 2
 *     700 fontPx, ink) centred in the rest of the body; `pic:null` centres the word;
 *     `word:null` centres the picture (F1). THROWS when the word's estimate exceeds
 *     the space it is given.
 *   wordPartWall({ famId, stem, root, pic, courses, courseH, glyphH, w, stoneH=76, maxCourseH })
 *     a cream wall panel (border 2 creamDeep, r 14, pad 12): `courses` empty dashed
 *     'socket-word' courses (brickSocket, with a school-lined writing row) stacked with
 *     gap 8, then 14, then the stone. With maxCourseH each course may GROW from courseH to
 *     maxCourseH (the page slack goes into the writing space, never into a blank band);
 *     the wall then stretches to its row (the spec caps the row at wallHeight(maxCourseH)). Stamps data-lcs-wall=<famId> data-lcs-stem
 *     data-lcs-root; each course data-lcs-course=<i>.
 *
 * FACE components named by §2 (wordPartPicCard, wordPartRootCard, wordPartPrefixKey,
 * wordPartPrefixRow, wordPartPersonCard, wordPartFamilyBlock) are Phase E and are NOT
 * built here — recorded in docs/worksheet-gen/b5-designs/_work/G2-359-build.md.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const WB = require('../../primitives/word-brick.js');

const T = tokens.color;
const F = tokens.font;
const N = (v) => +(+v).toFixed(2);

/** Greedy row packing over the ESTIMATED widths (a conservative stand-in for the real wrap). */
function packRows(widths, inner, gapX) {
  let rows = 0, x = Infinity;
  for (const w of widths) {
    if (x === Infinity || x + gapX + w > inner + 1e-9) { rows++; x = w; } else x += gapX + w;
    if (w > inner) throw new Error(`wordPartBank: a brick of ${w} px is wider than the ${inner} px panel`);
  }
  return rows;
}

function wordPartBank({ words, px = 20, h = 40, gapX = 10, gapY = 8, maxRows = 3, inner = 643 } = {}) {
  if (!Array.isArray(words) || !words.length) throw new Error('wordPartBank: no words');
  const widths = words.map((x) => WB.brickWidthFor('word', x.word, px));
  const rows = packRows(widths, inner, gapX);
  if (rows > maxRows) throw new Error(`wordPartBank: ${words.length} bricks need ${rows} rows (> ${maxRows}) by brickEstimate — take another family pair`);
  const bricks = words.map((x, i) => WB.wordBrick({ role: 'word', w: widths[i], h, text: x.word, fontPx: px,
    attrs: `data-lcs-bank-brick="" data-lcs-word="${esc(x.word)}" data-lcs-family-of="${esc(x.famId)}" data-lcs-bank-i="${i}"` })).join('');
  const html = `<div class="wp-bank" data-lcs-bank-panel="" data-lcs-bank-rows="${rows}" style="box-sizing:border-box;width:100%;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:10px 14px;` +
    `display:flex;flex-wrap:wrap;justify-content:center;align-content:flex-start;column-gap:${gapX}px;row-gap:${gapY}px;flex:0 0 auto">${bricks}</div>`;
  return { html, rows, height: 10 + rows * h + (rows - 1) * gapY + 10 + 4 };
}

function wordPartStone({ word = null, pic = null, w, h = 76, picPx = 56, fontPx = 30, attrs = '' } = {}) {
  if (word == null && pic == null) throw new Error('wordPartStone: neither a word nor a picture');
  const svg = WB.wordBrick({ role: 'stem', w, h });
  const g = WB.geometry('stem', w, h, WB.STYLE.stem.sw);
  const x0 = g.body.x0, x1 = g.body.x1;
  if (pic && picPx > h - 12) throw new Error(`wordPartStone: picture ${picPx} px in a ${h} px stone`);
  let over = '';
  if (pic) {
    const left = word == null ? (x0 + x1 - picPx) / 2 : x0 + 10;
    over += `<img class="ws-icon" src="${esc(pic.src)}" alt="" data-lcs-root-pic="${esc(pic.key)}" style="position:absolute;left:${N(left)}px;top:${N((h - picPx) / 2)}px;width:${picPx}px;height:${picPx}px;object-fit:contain">`;
  }
  if (word != null) {
    const a = pic ? x0 + 10 + picPx + 4 : x0 + 4, b = x1 - 4;
    const est = WB.brickEstimate(fontPx, WB.glyphCount(word)) - 24 + 8;   // the glyph estimate + 4 px each side
    if (est > b - a + 1e-9) throw new Error(`wordPartStone: root "${word}" needs ~${N(est)} px, the stone leaves ${N(b - a)} (never squash)`);
    over += `<div data-lcs-stone-text="" style="position:absolute;left:${N(a)}px;width:${N(b - a)}px;top:0;height:${h}px;display:flex;align-items:center;justify-content:center;` +
      `font-family:${F.display};font-weight:700;font-size:${fontPx}px;line-height:1;color:${T.ink};white-space:nowrap">${esc(word)}</div>`;
  }
  return `<div class="wp-stone" data-lcs-stone=""${attrs ? ' ' + attrs : ''} style="position:relative;width:${N(w)}px;height:${h}px;flex:0 0 auto">` +
    `<div style="position:absolute;left:0;top:0">${svg}</div>${over}</div>`;
}

function wordPartWall({ famId, stem, root, pic = null, courses, courseH, glyphH, w, stoneH = 76, picPx = 56, fontPx = 30, maxCourseH = null } = {}) {
  const inner = w - 2 * 12 - 4;
  if (!(courses >= 1)) throw new Error('wordPartWall: courses >= 1');
  if (!(courseH >= 36)) throw new Error(`wordPartWall: courseH ${courseH} < the G2 floor 36`);
  const cs = [];
  for (let i = 0; i < courses; i++) cs.push(WB.brickSocket({ shape: 'word', w: inner, h: courseH, glyphH, maxH: maxCourseH, attrs: `data-lcs-course="${i}"` }));
  const stone = wordPartStone({ word: root, pic, w: inner, h: stoneH, picPx, fontPx });
  return `<div class="wp-wall" data-lcs-wall="${esc(famId)}" data-lcs-stem="${esc(stem)}" data-lcs-root="${esc(root)}" ` +
    `style="box-sizing:border-box;width:${w}px;flex:0 0 auto;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:12px;display:flex;flex-direction:column;align-items:center">` +
    `<div data-lcs-courses="" style="display:flex;flex-direction:column;gap:8px;flex:1 1 auto;min-height:0">${cs.join('')}</div>` +
    `<div style="height:14px;flex:0 0 auto"></div>${stone}</div>`;
}

function wallHeight({ courses, courseH, stoneH = 76 }) { return 12 + courses * courseH + (courses - 1) * 8 + 14 + stoneH + 12 + 4; }

module.exports = { wordPartBank, wordPartStone, wordPartWall, wordPartWallHeight: wallHeight, wordPartPackRows: packRows };
