/**
 * position-scenes.js — what the Position Words maker's new templates share (2026-11-02, NEW-TEMPLATES §44): every
 * sentence from the grammar engine (REFERENCE TRANSLATIONS/lcs-grammar.js prepSentence — a null is a refusal of that
 * triple, never a guessed sentence), the landmarks its own hand-verified shape nouns (SHAPE_NOUNS + the audited Finnish
 * genitives: the old Prepositions app's landmarks), and a scene that shows ONE relation of a picture to a shape:
 *   in            the picture inside the shape (container shapes only)
 *   on top of     standing on the shape's top          above        a clear gap over the shape
 *   under         a clear gap under the shape          next to      beside it, same height
 *   between       between two shapes of one kind
 *   behind        partly hidden by the shape           in front of  covering the shape's lower part
 * on top of / above are never offered against each other (the engine's CONFUSABLE_PREPS); behind / in front of only at
 * level 3 (the 2D overlap convention).
 */
'use strict';
const G = require('../../../../REFERENCE TRANSLATIONS/lcs-grammar.js');
const T = require('../../primitives/_tokens.js').color;

const LEVEL_PREPS = {
  1: ['in', 'on top of', 'under', 'next to'],
  2: ['in', 'on top of', 'under', 'next to', 'above', 'between'],
  3: ['in', 'on top of', 'under', 'next to', 'above', 'between', 'behind', 'in front of'],
};
const SHAPES = ['circle', 'square', 'heart', 'hexagon', 'triangle', 'star', 'cube', 'cylinder'];
const CONTAINERS = ['circle', 'square', 'heart', 'hexagon'];
// pictures a child can draw and names one way (vocab keys; the picture is the subject of the sentence)
const OBJECTS = ['ball', 'apple', 'cat', 'dog', 'fish', 'flower', 'car', 'sun', 'balloon', 'duck', 'cup', 'banana', 'pear', 'carrot', 'teddy-bear', 'bee'];

const COLORS = { circle: '#F2C14E', square: '#7FC8B8', heart: '#F29CA3', hexagon: '#B9A6E3', triangle: '#8CC0E8', star: '#F6D16B', cube: '#E8A87C', cylinder: '#9FD39B' };

/** the SVG of a shape whose box is (x, y, s × s) */
function shapeSvg(key, x, y, s) {
  const f = COLORS[key] || T.tealSoft, st = `stroke="${T.ink}" stroke-width="3" fill="${f}"`, c = (a, b) => `${x + a * s} ${y + b * s}`;
  switch (key) {
    case 'circle': return `<circle cx="${x + s / 2}" cy="${y + s / 2}" r="${s / 2 - 2}" ${st}/>`;
    case 'square': return `<rect x="${x + 2}" y="${y + 2}" width="${s - 4}" height="${s - 4}" rx="6" ${st}/>`;
    case 'heart': return `<path d="M${c(0.5, 0.95)} C${c(-0.1, 0.5)} ${c(0.05, 0.02)} ${c(0.5, 0.25)} C${c(0.95, 0.02)} ${c(1.1, 0.5)} ${c(0.5, 0.95)}Z" ${st}/>`;
    case 'hexagon': return `<path d="M${c(0.25, 0.05)} L${c(0.75, 0.05)} L${c(1, 0.5)} L${c(0.75, 0.95)} L${c(0.25, 0.95)} L${c(0, 0.5)}Z" ${st}/>`;
    case 'triangle': return `<path d="M${c(0.5, 0.03)} L${c(0.98, 0.97)} L${c(0.02, 0.97)}Z" ${st}/>`;
    case 'star': return `<path d="M${c(0.5, 0.02)} L${c(0.62, 0.36)} L${c(0.98, 0.37)} L${c(0.69, 0.59)} L${c(0.8, 0.95)} L${c(0.5, 0.74)} L${c(0.2, 0.95)} L${c(0.31, 0.59)} L${c(0.02, 0.37)} L${c(0.38, 0.36)}Z" ${st}/>`;
    case 'cube': return `<path d="M${c(0.05, 0.3)} L${c(0.7, 0.3)} L${c(0.7, 0.97)} L${c(0.05, 0.97)}Z" ${st}/><path d="M${c(0.05, 0.3)} L${c(0.3, 0.05)} L${c(0.95, 0.05)} L${c(0.7, 0.3)}Z" ${st}/><path d="M${c(0.7, 0.3)} L${c(0.95, 0.05)} L${c(0.95, 0.72)} L${c(0.7, 0.97)}Z" ${st}/>`;
    case 'cylinder': return `<path d="M${c(0.1, 0.15)} L${c(0.1, 0.85)} A${s * 0.4} ${s * 0.12} 0 0 0 ${c(0.9, 0.85)} L${c(0.9, 0.15)}" ${st}/><ellipse cx="${x + s / 2}" cy="${y + 0.15 * s}" rx="${s * 0.4}" ry="${s * 0.12}" ${st}/>`;
    default: return '';
  }
}

/**
 * A scene W × H: the shape (or two, for between) and the picture placed in the relation. Returns HTML.
 * opts.noObject: the shape(s) alone (read-and-draw); opts.keyObject: the picture marked as the key's drawn sample.
 */
function scene(prep, shapeKey, objSrc, opts = {}) {
  const W = opts.w || 280, H = opts.h || 200, s = opts.s || 104, o = opts.o || 56;
  let shapes = [], ox, oy, objFirst = false;
  const cx = W / 2;
  switch (prep) {
    case 'in': { const sy = (H - s * 1.25) / 2; const ss = s * 1.25; shapes = [[cx - ss / 2, sy, ss]]; ox = cx - o * 0.45; oy = sy + ss * 0.55 - o * 0.45; break; }
    case 'on top of': { const sy = H - s - 6; shapes = [[cx - s / 2, sy, s]]; ox = cx - o / 2; oy = sy - o + 4; break; }
    case 'above': { const sy = H - s - 6; shapes = [[cx - s / 2, sy, s]]; ox = cx - o / 2; oy = Math.max(2, sy - o - 30); break; }
    case 'under': { const sy = 6; shapes = [[cx - s / 2, sy, s]]; ox = cx - o / 2; oy = Math.min(H - o - 2, sy + s + 22); break; }
    case 'next to': { const sy = (H - s) / 2; shapes = [[cx - s / 2 - o / 2 - 8, sy, s]]; ox = cx + s / 2 - o / 2 + 8; oy = sy + s - o; break; }
    case 'between': { const ss = s * 0.82, sy = (H - ss) / 2 + 10; shapes = [[8, sy, ss], [W - ss - 8, sy, ss]]; ox = cx - o / 2; oy = sy + ss - o; break; }
    case 'behind': { const sy = H - s - 6; shapes = [[cx - s / 2, sy, s]]; ox = cx - o / 2 + s * 0.3; oy = sy - o * 0.5; objFirst = true; break; }   // up and to the side: half of it hidden, never sitting on top
    case 'in front of': { const sy = 8; shapes = [[cx - s / 2, sy, s]]; ox = cx - o / 2; oy = sy + s * 0.62; break; }
    default: throw new Error('position-scenes: no scene for ' + prep);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" data-lcs-prim="pos-scene" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true" style="position:absolute;left:0;top:0;z-index:2">${shapes.map(([x, y, ss]) => shapeSvg(shapeKey, x, y, ss)).join('')}</svg>`;
  const img = opts.noObject && !opts.keyObject ? ''
    : `<img class="ws-icon" src="${objSrc}" alt=""${opts.keyObject ? ' data-lcs-key-sample="1"' : ''} style="position:absolute;left:${Math.round(ox)}px;top:${Math.round(oy)}px;width:${o}px;height:${o}px;z-index:${objFirst ? 1 : 3}">`;
  return `<div data-lcs-scene-prep="${prep}" data-lcs-scene-shape="${shapeKey}" style="position:relative;width:${W}px;height:${H}px;flex:0 0 auto">${svg}${img}</div>`;
}

/** the sentence of (locale, prep, shape) or null; {img} is the picture */
function sentence(locale, prep, shapeKey) {
  const lm = G.shapeLandmark(shapeKey, locale);
  return lm ? G.prepSentence(locale, prep, lm) : null;
}
function distractors(locale, prep, shapeKey) {
  const lm = G.shapeLandmark(shapeKey, locale);
  return lm ? G.prepDistractorLabels(locale, prep, lm) : [];
}

module.exports = { LEVEL_PREPS, SHAPES, CONTAINERS, OBJECTS, scene, sentence, distractors, shapeSvg };
