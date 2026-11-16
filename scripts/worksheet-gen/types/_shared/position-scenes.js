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
 * The outline of a shape whose box is (x, y, s × s), as a polygon in page px — the same geometry shapeSvg draws
 * (2026-11-16, for the measured scenes below: where a picture rests on a shape, how far above it floats, where its side is).
 */
function outline(key, x, y, s) {
  const P = (a, b) => [x + a * s, y + b * s], out = [];
  const bez = (p0, p1, p2, p3, n) => { for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; out.push(P(u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1])); } };
  switch (key) {
    case 'circle': { const r = s / 2 - 2; for (let i = 0; i < 72; i++) { const a = (i / 72) * 2 * Math.PI; out.push([x + s / 2 + r * Math.cos(a), y + s / 2 + r * Math.sin(a)]); } return out; }
    case 'square': return [[x + 2, y + 2], [x + s - 2, y + 2], [x + s - 2, y + s - 2], [x + 2, y + s - 2]];
    case 'heart': bez([0.5, 0.95], [-0.1, 0.5], [0.05, 0.02], [0.5, 0.25], 32); bez([0.5, 0.25], [0.95, 0.02], [1.1, 0.5], [0.5, 0.95], 32); return out;
    case 'hexagon': return [[0.25, 0.05], [0.75, 0.05], [1, 0.5], [0.75, 0.95], [0.25, 0.95], [0, 0.5]].map(([a, b]) => P(a, b));
    case 'triangle': return [[0.5, 0.03], [0.98, 0.97], [0.02, 0.97]].map(([a, b]) => P(a, b));
    case 'star': return [[0.5, 0.02], [0.62, 0.36], [0.98, 0.37], [0.69, 0.59], [0.8, 0.95], [0.5, 0.74], [0.2, 0.95], [0.31, 0.59], [0.02, 0.37], [0.38, 0.36]].map(([a, b]) => P(a, b));
    case 'cube': return [[0.05, 0.3], [0.3, 0.05], [0.95, 0.05], [0.95, 0.72], [0.7, 0.97], [0.05, 0.97]].map(([a, b]) => P(a, b));
    case 'cylinder': {
      for (let i = 0; i <= 24; i++) { const a = Math.PI + (i / 24) * Math.PI; out.push(P(0.5 + 0.4 * Math.cos(a), 0.15 + 0.12 * Math.sin(a))); }
      for (let i = 0; i <= 24; i++) { const a = (i / 24) * Math.PI; out.push(P(0.5 + 0.4 * Math.cos(a), 0.85 + 0.12 * Math.sin(a))); }
      return out;
    }
    default: return [P(0, 0), P(1, 0), P(1, 1), P(0, 1)];
  }
}
const edges = (poly) => poly.map((p, i) => [p, poly[(i + 1) % poly.length]]);
/** the highest point (smallest y) of the outline over the columns x1 … x2; Infinity where the shape is not there */
function topWithin(poly, x1, x2) {
  let best = Infinity;
  for (const [x, y] of poly) if (x >= x1 && x <= x2) best = Math.min(best, y);
  for (let i = 0; i <= 32; i++) {
    const X = x1 + ((x2 - x1) * i) / 32;
    for (const [a, b] of edges(poly)) if ((a[0] - X) * (b[0] - X) <= 0 && a[0] !== b[0]) best = Math.min(best, a[1] + ((X - a[0]) * (b[1] - a[1])) / (b[0] - a[0]));
  }
  return best;
}
/** the right edge of the outline on the row y */
function rightAt(poly, y) {
  let best = -Infinity;
  for (const [a, b] of edges(poly)) if ((a[1] - y) * (b[1] - y) <= 0 && a[1] !== b[1]) best = Math.max(best, a[0] + ((y - a[1]) * (b[0] - a[0])) / (b[1] - a[1]));
  return best;
}

/**
 * A scene W × H: the shape (or two, for between) and the picture placed in the relation. Returns HTML.
 * opts.noObject: the shape(s) alone (read-and-draw); opts.keyObject: the picture marked as the key's drawn sample.
 * Measured scenes (2026-11-16, K-548 only — every other caller passes none of these and draws exactly as before):
 *   opts.ink        the picture's ink box {l, t, w, h} (fractions of its square, data/hm/ink-boxes.json): "on top of"
 *                   moves a picture that would float (a fish, a car, a cup drawn high in its square; any picture over a
 *                   heart, whose top is its two lobes) down until its ink rests on the shape's outline;
 *   opts.aboveGap   "above": the picture's square ends at least this share of its height above the shape's highest
 *                   point (a smaller shape where the row is too low for it) — a gap that never reads as "on top of";
 *   opts.behindSide "behind" (needs opts.ink): the picture peeks out at the shape's SIDE, its ink between the shape's
 *                   top and bottom, two fifths of its width behind the shape (more hid a cat or a pear down to a
 *                   sliver nobody can name) — nothing rises above the shape's top edge, so "above" / "on top of"
 *                   never describe it (the old scene raised the upper half over the top).
 */
function scene(prep, shapeKey, objSrc, opts = {}) {
  const W = opts.w || 280, H = opts.h || 200, s = opts.s || 104, o = opts.o || 56;
  let shapes = [], ox, oy, objFirst = false, os = o;
  const cx = W / 2, ink = opts.ink || null;
  switch (prep) {
    case 'in': { const sy = (H - s * 1.25) / 2; const ss = s * 1.25; shapes = [[cx - ss / 2, sy, ss]]; ox = cx - o * 0.45; oy = sy + ss * 0.55 - o * 0.45; break; }
    case 'on top of': {
      const sy = H - s - 6; shapes = [[cx - s / 2, sy, s]]; ox = cx - o / 2; oy = sy - o + 4;
      if (ink) {
        // the outline's highest point under the picture's ink; a picture whose ink does not reach the outline's 3 px
        // stroke (it ends more than 1.5 px above the line) is moved down until it rests 1 px into the line
        const rest = topWithin(outline(shapeKey, cx - s / 2, sy, s), ox + ink.l * o, ox + (ink.l + ink.w) * o);
        if (Number.isFinite(rest) && oy + (ink.t + ink.h) * o < rest - 1.5) oy = rest + 1 - (ink.t + ink.h) * o;
      }
      break;
    }
    case 'above': {
      let ss = s, sy = H - ss - 6; ox = cx - o / 2; oy = Math.max(2, sy - o - 30);
      if (opts.aboveGap) {
        const gap = Math.ceil(opts.aboveGap * o);
        // the square's bottom sits gap px above the outline's highest point (outside its 3 px stroke)
        for (; ss > 8; ss--) {
          sy = H - ss - 6;
          const need = Math.min(...outline(shapeKey, cx - ss / 2, sy, ss).map((p) => p[1])) - 1.5 - gap - o;
          if (need >= 2) { oy = Math.min(Math.max(2, sy - o - 30), need); break; }
        }
      }
      shapes = [[cx - ss / 2, sy, ss]];
      break;
    }
    case 'under': { const sy = 6; shapes = [[cx - s / 2, sy, s]]; ox = cx - o / 2; oy = Math.min(H - o - 2, sy + s + 22); break; }
    case 'next to': { const sy = (H - s) / 2; shapes = [[cx - s / 2 - o / 2 - 8, sy, s]]; ox = cx + s / 2 - o / 2 + 8; oy = sy + s - o; break; }
    case 'between': { const ss = s * 0.82, sy = (H - ss) / 2 + 10; shapes = [[8, sy, ss], [W - ss - 8, sy, ss]]; ox = cx - o / 2; oy = sy + ss - o; break; }
    case 'behind': {
      if (opts.behindSide && ink) {
        const sx = cx - s / 2 - Math.round(o * 0.25), sy = (H - s) / 2, poly = outline(shapeKey, sx, sy, s);
        const top = Math.min(...poly.map((p) => p[1])), bot = Math.max(...poly.map((p) => p[1]));
        // the ink fits between the shape's top and bottom (2 px inside each); a taller picture is drawn a little smaller
        if (ink.h * os > bot - top - 4) os = Math.floor((bot - top - 4) / ink.h);
        const mid = (top + bot) / 2;
        oy = mid - (ink.t + ink.h / 2) * os;
        ox = Math.min(rightAt(poly, mid) - (ink.l + 0.4 * ink.w) * os, W - 2 - os);
        shapes = [[sx, sy, s]]; objFirst = true;
        break;
      }
      const sy = H - s - 6; shapes = [[cx - s / 2, sy, s]]; ox = cx - o / 2 + s * 0.3; oy = sy - o * 0.5; objFirst = true; break;   // up and to the side: half of it hidden, never sitting on top
    }
    case 'in front of': { const sy = 8; shapes = [[cx - s / 2, sy, s]]; ox = cx - o / 2; oy = sy + s * 0.62; break; }
    default: throw new Error('position-scenes: no scene for ' + prep);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" data-lcs-prim="pos-scene" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true" style="position:absolute;left:0;top:0;z-index:2">${shapes.map(([x, y, ss]) => shapeSvg(shapeKey, x, y, ss)).join('')}</svg>`;
  const img = opts.noObject && !opts.keyObject ? ''
    : `<img class="ws-icon" src="${objSrc}" alt=""${opts.keyObject ? ' data-lcs-key-sample="1"' : ''} style="position:absolute;left:${Math.round(ox)}px;top:${Math.round(oy)}px;width:${os}px;height:${os}px;z-index:${objFirst ? 1 : 3}">`;
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
