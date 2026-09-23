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
 * FACE components (Phase E, built 2026-09-23; appended below the base exports): wordPartGrid,
 * wordPartFlexStone, wordPartPicCard (F1), wordPartRootCard (F2), wordPartPrefixKey + wordPartPrefixRow (F3),
 * wordPartPersonCard (F4), wordPartFamilyBlock (F5); record _work/G2-359-faces.md.
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

/* ================================================================ FACES (Phase E, 2026-09-23)
 * Each face is a stack of stamped blocks: a vertical container carries data-lcs-stack and each
 * of its children data-lcs-si, so the gate measures the blank bands between the INK of
 * consecutive blocks (never a padded box). Growth (the FILL rule) goes into a hero element
 * (F1 picture stone, F4 writing socket) or into evenly spaced gaps that stay well under 40 px.
 */
/** A numbered badge in the flow (the shared countBadge is position:absolute for card corners). */
function rowBadge(n) {
  return `<span data-lcs-row-badge="${n}" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:${T.white};font-family:${F.display};font-weight:700;font-size:16px;line-height:1">${n}</span>`;
}
const SOCKET_SW = WB.STYLE.socket.sw, STEM_SW = WB.STYLE.stem.sw;
/** socket-prefix (stroke 2.5) + stem (stroke 3): the stem's tab tip lands on the notch wall. */
const SOCKET_JOIN = WB.TAB + SOCKET_SW / 2 + STEM_SW / 2;   // 10.75

/**
 * wordPartGrid({ cards:[html], cols, rows, minRow, cardStyle, attrs }) — the numbered .ws-cardgrid
 * with rows minmax(minRow, 1fr) (the page slack reaches the cards, the cards own their growth).
 */
function wordPartGrid({ cards, cols, rows, minRow, cardStyle = '', attrs = '' }) {
  const items = cards.map((inner, i) => `<section class="ws-card" data-lcs-card="${i + 1}" data-lcs-si="" style="${cardStyle}">` +
    `<span class="ws-card-badge">${i + 1}</span>${inner}</section>`).join('');
  return `<div class="ws-cardgrid" data-lcs-stack="grid"${attrs ? ' ' + attrs : ''} style="grid-template-columns:repeat(${cols},minmax(0,1fr));grid-template-rows:repeat(${rows},minmax(${minRow}px,1fr))">${items}</div>`;
}

/**
 * wordPartFlexStone({ pic, minH=88, picMin=72, picMax=150, attrs }) — the F1 foundation stone as a
 * GROWING element: a tealSoft body (border teal 3, r 6) spanning the stone minus its two 8 px
 * dovetail tabs, the tabs drawn at the stem primitive's exact geometry (base 12, tip 18, centred)
 * so the silhouette reads as the family's stone at any height; the picture (object-fit contain)
 * grows with the stone between picMin and picMax. No word is printed (the child names the picture).
 */
function wordPartFlexStone({ pic, minH = 88, picMin = 72, picMax = 150, attrs = '' }) {
  if (!pic) throw new Error('wordPartFlexStone: a picture stone needs a picture');
  if (picMin + 12 > minH) throw new Error(`wordPartFlexStone: picture ${picMin} px in a ${minH} px stone`);
  const hb = WB.DOVE.base / 2, ht = WB.DOVE.tabTip / 2, s = STEM_SW / 2, H = 2 * ht + STEM_SW, cy = H / 2;
  const tab = (flip) => {
    // local x: 0 = the stone's outer edge; the body's border centre line sits at s + TAB
    const X = (x) => (flip ? N(8 + STEM_SW + 1 - x) : N(x));
    const e = s + WB.TAB;
    const fill = `M${X(e + 2)},${N(cy - hb)} L${X(e)},${N(cy - hb)} L${X(s)},${N(cy - ht)} L${X(s)},${N(cy + ht)} L${X(e)},${N(cy + hb)} L${X(e + 2)},${N(cy + hb)} Z`;
    const edge = `M${X(e)},${N(cy - hb)} L${X(s)},${N(cy - ht)} L${X(s)},${N(cy + ht)} L${X(e)},${N(cy + hb)}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${8 + STEM_SW + 1}" height="${N(H)}" viewBox="0 0 ${8 + STEM_SW + 1} ${N(H)}" style="position:absolute;${flip ? 'right' : 'left'}:0;top:calc(50% - ${N(cy)}px);overflow:visible" data-lcs-stone-tab="${flip ? 'r' : 'l'}">` +
      `<path d="${fill}" fill="${T.tealSoft}"/><path d="${edge}" fill="none" stroke="${T.teal}" stroke-width="${STEM_SW}" stroke-linejoin="round"/></svg>`;
  };
  return `<div class="wp-fstone" data-lcs-stone="" data-lcs-flexstone=""${attrs ? ' ' + attrs : ''} style="position:relative;flex:1 1 auto;min-height:${minH}px;width:100%">` +
    `<div data-lcs-stone-body="" style="position:absolute;left:${WB.TAB}px;right:${WB.TAB}px;top:0;bottom:0;box-sizing:border-box;background:${T.tealSoft};border:${STEM_SW}px solid ${T.teal};border-radius:${6}px">` +
    `<img class="ws-icon" src="${esc(pic.src)}" alt="" data-lcs-root-pic="${esc(pic.key)}" style="position:absolute;inset:0;margin:auto;width:calc(100% - 16px);height:calc(100% - 12px);min-width:${picMin}px;min-height:${picMin}px;max-width:${picMax}px;max-height:${picMax}px;object-fit:contain"></div>` +
    tab(false) + tab(true) + `</div>`;
}

/**
 * wordPartPicCard({ pic, bricks:[{word, role}], w, brickH=44, px=20, gap=6, stoneMinH=88, picMin=72, picMax=150 })
 * F1: 18 px badge clearance, the bricks (role 'word', band G1) stacked, 10, the growing picture stone.
 * Each brick: data-lcs-pf-brick=<slot> data-lcs-word data-lcs-role (member|foil: hidden ground truth).
 */
function wordPartPicCard({ pic, root, bricks, w, brickH = 44, px = 20, gap = 6, stoneMinH = 88, picMin = 72, picMax = 150 }) {
  const bw = Math.floor(w);
  const bs = bricks.map((b, i) => `<div data-lcs-si="" style="flex:0 0 auto">${WB.wordBrick({ role: 'word', w: bw, h: brickH, text: b.word, fontPx: px, band: 'G1',
    attrs: `data-lcs-pf-brick="${i}" data-lcs-word="${esc(b.word)}" data-lcs-role="${esc(b.role)}"` })}</div>`).join('');
  return `<div class="wp-pc" data-lcs-stack="card" style="display:flex;flex-direction:column;align-items:center;flex:1 1 auto;min-height:0;padding-top:18px;gap:${gap}px">` +
    bs + `<div style="height:${10 - gap}px;flex:0 0 auto"></div>` +
    `<div data-lcs-si="" style="display:flex;flex:1 1 auto;width:100%;min-height:${stoneMinH}px">${wordPartFlexStone({ pic, minH: stoneMinH, picMin, picMax, attrs: `data-lcs-root="${esc(root)}"` })}</div></div>`;
}

/** Split `word` round the first case-folded occurrence of `stem` (the worked card's ring). */
function splitAtStem(word, stem, loc) {
  const lw = String(word).toLocaleLowerCase(loc), ls = String(stem).toLocaleLowerCase(loc);
  const i = lw.indexOf(ls);
  if (i < 0) throw new Error(`wordPartRootCard: "${word}" does not contain the stem "${stem}" (the worked ring needs it)`);
  return [word.slice(0, i), word.slice(i, i + stem.length), word.slice(i + stem.length)];
}

/**
 * wordPartRootCard({ famId, members, root, stem, worked, w, px=18, brickH=36, stoneH=44, glyphH=24, loc })
 * F2: three member bricks (a small wall) over an EMPTY stem socket (the place to write the root).
 * The worked card: the stone printed (inkSoft Nunito 800 18) and a 2.5 px coral ring round the stem
 * letters of each member (HTML overlay, so the ring hugs the real glyphs); stamped data-lcs-worked.
 * Items spread with space-between: the card's slack becomes <= 3 small even gaps.
 */
function wordPartRootCard({ famId, members, root, stem, worked = false, w, px = 18, brickH = 36, stoneH = 44, glyphH = 24, loc = 'en' }) {
  const bw = Math.floor(w);
  const brick = (word, i) => {
    if (!worked) return WB.wordBrick({ role: 'word', w: bw, h: brickH, text: word, fontPx: px, attrs: `data-lcs-rw-brick="${i}" data-lcs-word="${esc(word)}"` });
    // measure the text against the brick body exactly as wordBrick would (never squash)
    const est = WB.brickEstimate(px, WB.glyphCount(word));
    if (est > bw - 2 + 1e-9) throw new Error(`wordPartRootCard: "${word}" needs ${N(est)} px > the ${bw} px brick`);
    const [a, b, c] = splitAtStem(word, stem, loc);
    return `<div style="position:relative;width:${bw}px;height:${brickH}px" data-lcs-rw-brick="${i}" data-lcs-word="${esc(word)}">` +
      WB.wordBrick({ role: 'word', w: bw, h: brickH }) +
      `<div data-lcs-worked-text="" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:${F.body};font-weight:800;font-size:${px}px;line-height:1;color:${T.ink};white-space:nowrap">` +
      `${esc(a)}<span data-lcs-ring="" style="border:2.5px solid ${T.coral};border-radius:9px;padding:0 1px;margin:0">${esc(b)}</span>${esc(c)}</div></div>`;
  };
  const bricks = members.map((m, i) => `<div data-lcs-si="" style="flex:0 0 auto">${brick(m, i)}</div>`).join('');
  let stone;
  if (worked) {
    stone = `<div style="position:relative;width:${bw}px;height:${stoneH}px" data-lcs-rw-stone="" data-lcs-root="${esc(root)}">` + WB.wordBrick({ role: 'stem', w: bw, h: stoneH }) +
      `<div data-lcs-worked-root="" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:${F.body};font-weight:800;font-size:${px}px;line-height:1;color:${T.inkSoft}">${esc(root)}</div></div>`;
  } else {
    stone = `<div data-lcs-rw-stone="" data-lcs-root="${esc(root)}">` + WB.brickSocket({ shape: 'stem', w: bw, h: stoneH, glyphH }) + `</div>`;
  }
  return `<div class="wp-rc" data-lcs-stack="card" data-lcs-family="${esc(famId)}"${worked ? ' data-lcs-worked=""' : ''} style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:4px;flex:1 1 auto;min-height:0;padding-top:18px">` +
    bricks + `<div data-lcs-si="" style="flex:0 0 auto">${stone}</div></div>`;
}

/**
 * wordPartPrefixKey({ prefixes:[{prefix, meaning}], px=24, h=44, meaningPx=17 }) — F3's key: each
 * prefix as a 'prefix' brick (Baloo 2 700) over its meaning; cream panel (border creamDeep, r 14).
 */
function wordPartPrefixKey({ prefixes, px = 24, h = 44, meaningPx = 17 }) {
  const cells = prefixes.map((p) => {
    const w = Math.max(84, WB.brickWidthFor('prefix', p.prefix, px));
    return `<div data-lcs-key-prefix="${esc(p.prefix)}" style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1 1 0;min-width:0">` +
      WB.wordBrick({ role: 'prefix', w, h, text: p.prefix, font: 'display', fontPx: px }) +
      `<p data-lcs-key-meaning="" style="margin:0;font-family:${F.body};font-weight:700;font-size:${meaningPx}px;line-height:1.3;color:${T.ink};text-align:center">${esc(p.meaning)}</p></div>`;
  }).join('');
  return `<div class="wp-key" data-lcs-si="" data-lcs-prefixes="${esc(prefixes.map((p) => p.prefix).join('|'))}" style="box-sizing:border-box;width:100%;flex:0 0 auto;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:10px 14px;display:flex;justify-content:space-around;gap:12px">${cells}</div>`;
}

/**
 * wordPartPrefixRow({ n, gloss, glossId, base, socketW, h=44, glyphH=24, basePx=20, glossPx=17, minH=60 })
 * F3: badge · the meaning gloss · the JOINT = an empty socket-prefix snapped onto the base (a stem brick).
 */
function wordPartPrefixRow({ n, gloss, glossId, base, socketW, jointW = null, h = 44, glyphH = 24, basePx = 20, glossPx = 17, minH = 60 }) {
  const stemW = WB.brickWidthFor('stem', base, basePx);
  const sock = WB.brickSocket({ shape: 'prefix', w: socketW, h, glyphH, attrs: `data-lcs-slot-for="${n}"` });
  const stem = WB.wordBrick({ role: 'stem', w: stemW, h, text: base, fontPx: basePx, attrs: `data-lcs-base-brick=""` });
  const joint = `<div data-lcs-joint="" style="display:flex;align-items:center;justify-content:flex-start;flex:0 0 auto${jointW ? `;width:${N(jointW)}px` : ''}"><div style="position:relative">${sock}</div>` +
    `<div style="position:relative;margin-left:-${N(SOCKET_JOIN)}px">${stem}</div></div>`;
  return `<div class="wp-prow" data-lcs-si="" data-lcs-prow="${n}" data-lcs-base="${esc(base)}" data-lcs-gloss-id="${esc(glossId)}" ` +
    `style="box-sizing:border-box;display:flex;align-items:center;gap:0;min-height:${minH}px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:12px;padding:6px 12px">` +
    `<div style="flex:0 0 auto;display:flex">${rowBadge(n)}</div><div style="width:10px;flex:0 0 auto"></div>` +
    `<p data-lcs-gloss="" style="margin:0;flex:1 1 auto;min-width:0;font-family:${F.body};font-weight:700;font-size:${glossPx}px;line-height:1.3;color:${T.ink}">${esc(gloss)}</p>` +
    `<div style="width:12px;flex:0 0 auto"></div>${joint}</div>`;
}

/**
 * wordPartPersonCard({ pic:{src,key,minPx}, base, picPx=96, basePx=18, brickH=36, socketW=200, socketH=52, glyphH=26 })
 * F4: the portrait, and beside it the base word brick over an empty word socket that GROWS with
 * the card (the page slack becomes writing space). No suffix piece: the join is not clean in every locale.
 */
function wordPartPersonCard({ pic, person, depicted, base, picPx = 96, picMax = 150, basePx = 18, brickH = 36, socketW = 200, socketH = 52, glyphH = 26 }) {
  const bw = WB.brickWidthFor('word', base, basePx);
  return `<div class="wp-pp" data-lcs-person="${esc(person)}" data-lcs-depicted="${esc(depicted)}" data-lcs-base="${esc(base)}" style="display:flex;align-items:center;gap:12px;flex:1 1 auto;min-height:0;padding-top:18px">` +
    `<div data-lcs-portrait-box="" style="position:relative;flex:0 0 auto;align-self:stretch;aspect-ratio:1/1;min-width:${picPx}px;min-height:${picPx}px;max-width:${picMax}px;max-height:${picMax}px;margin:auto 0">` +
    `<img class="ws-icon" src="${esc(pic.src)}" alt="" data-lcs-portrait="${esc(pic.key)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain"></div>` +
    `<div data-lcs-stack="card" style="display:flex;flex-direction:column;align-items:flex-start;gap:8px;flex:1 1 auto;align-self:stretch;justify-content:center;min-width:0">` +
    `<div data-lcs-si="" style="flex:0 0 auto">${WB.wordBrick({ role: 'word', w: bw, h: brickH, text: base, fontPx: basePx, attrs: 'data-lcs-base-brick=""' })}</div>` +
    `<div data-lcs-si="" style="display:flex;flex:1 1 auto;max-height:${socketH * 2}px;min-height:${socketH}px">${WB.brickSocket({ shape: 'word', w: socketW, h: socketH, glyphH, maxH: socketH * 2, attrs: 'data-lcs-person-socket=""' })}</div></div></div>`;
}

/**
 * wordPartFamilyBlock({ famId, root, course:[word], sentences:[{n, pre, post, slot}], gapW, coursePx=18,
 *   brickH=40, stoneH=36, stonePx=22, sentPx=18, rowH=48, gapH=40, glyphH=24 })
 * F5: one course of four word bricks on a narrow root stone, then four sentences each with ONE
 * uniform empty word socket (the gap). Sentence rows are minmax(rowH, 1fr).
 */
function wordPartFamilyBlock({ famId, root, course, sentences, gapW, coursePx = 18, brickH = 40, stoneH = 36, stonePx = 22, sentPx = 18, rowH = 48, gapH = 40, glyphH = 24 }) {
  const bricks = course.map((w, i) => WB.wordBrick({ role: 'word', w: WB.brickWidthFor('word', w, coursePx), h: brickH, text: w, fontPx: coursePx, attrs: `data-lcs-course-brick="${i}" data-lcs-word="${esc(w)}"` })).join('');
  const stoneW = Math.max(150, WB.brickWidthFor('stem', root, stonePx));
  const stone = wordPartStone({ word: root, w: stoneW, h: stoneH, fontPx: stonePx });
  const rows = sentences.map((s) => {
    const gap = `<span data-lcs-gap="" data-lcs-block="${esc(famId)}" data-lcs-slot="${esc(s.slot)}" style="display:inline-block;vertical-align:middle;margin:2px 4px">` +
      WB.brickSocket({ shape: 'word', w: gapW, h: gapH, glyphH }) + `</span>`;
    return `<div data-lcs-si="" data-lcs-sentence="${s.n}" style="display:flex;align-items:center;gap:10px;min-height:${rowH}px">` +
      `<div style="flex:0 0 auto;display:flex">${rowBadge(s.n)}</div>` +
      `<div data-lcs-sentence-text="" style="margin:0;flex:1 1 auto;min-width:0;font-family:${F.body};font-weight:700;font-size:${sentPx}px;line-height:1.3;color:${T.ink}">${esc(s.pre)}${gap}${esc(s.post)}</div></div>`;
  }).join('');
  return `<div class="wp-fb" data-lcs-fblock="${esc(famId)}" data-lcs-root="${esc(root)}" data-lcs-si="" data-lcs-stack="block" ` +
    `style="box-sizing:border-box;display:flex;flex-direction:column;gap:0;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:10px 14px;min-height:0">` +
    `<div data-lcs-si="" data-lcs-course="" style="display:flex;justify-content:center;gap:8px;flex:0 0 auto">${bricks}</div>` +
    `<div data-lcs-si="" style="display:flex;justify-content:center;flex:0 0 auto;margin-top:4px">${stone}</div>` +
    `<div style="height:12px;flex:0 0 auto"></div>` +
    `<div data-lcs-sentences="" style="display:grid;grid-template-rows:repeat(${sentences.length},minmax(${rowH}px,1fr));row-gap:6px;flex:1 1 auto;min-height:0">${rows}</div></div>`;
}

module.exports.wordPartGrid = wordPartGrid;
module.exports.wordPartFlexStone = wordPartFlexStone;
module.exports.wordPartPicCard = wordPartPicCard;
module.exports.wordPartRootCard = wordPartRootCard;
module.exports.wordPartPrefixKey = wordPartPrefixKey;
module.exports.wordPartPrefixRow = wordPartPrefixRow;
module.exports.wordPartPersonCard = wordPartPersonCard;
module.exports.wordPartFamilyBlock = wordPartFamilyBlock;
module.exports.wordPartSocketJoin = SOCKET_JOIN;
