/**
 * data/ptx/st.js — DESIGNED-STROKE pictures for the K-426 "Where do I start?" Level Set copies (ptl). A library drawing
 * fragments into many traced lines (the published flag had eight start dots), so every picture here is authored as the
 * few strokes a child draws, in teaching order: an open stroke starts at its TOP end (its LEFT end when it runs flat), a
 * closed one at 2 o'clock running anticlockwise (the start of c / o) — pt-render `orient`, applied once here, then frozen
 * (`lineFixed`), so the start dot and arrow sit exactly where the stroke begins.
 * A picture: (cx, by, h) → strokes; u across (× h, centred), v up from the bottom (× h).
 */
'use strict';
const M = require('../../lib/pt-motifs.js');
const { orient } = require('../../lib/pt-render.js');
const sm = (c, closed = false) => M.catmull(c, closed, 2.5);
const ar = (cx, cy, rx, ry, a0, a1) => M.arc(cx, cy, rx, ry, a0, a1, 2.5);
function pic(cx, by, h) {
  const P = (u, v) => [cx + u * h, by - v * h];
  const S = (pts, closed = false) => ({ pts: closed && (pts[0][0] !== pts[pts.length - 1][0] || pts[0][1] !== pts[pts.length - 1][1]) ? [...pts, pts[0]] : pts, closed });
  const oval = (u, v, ru, rv) => S(ar(cx + u * h, by - v * h, ru * h, rv * h, 0, 2 * Math.PI), true);
  const poly = (list, closed = false) => S(list.map(([u, v]) => P(u, v)), closed);
  const curve = (list, closed = false) => S(sm(list.map(([u, v]) => P(u, v)), closed), closed);
  return { P, S, oval, poly, curve };
}
const D = {
  // ── one stroke ──
  // ── simple K-1 objects that cannot be read as a letter or a digit (an egg is an O, a lollipop a P, a pin an 8) ──
  ring: (cx, by, h) => { const { oval, poly } = pic(cx, by, h); return [poly([[-0.2, 0.86], [0.2, 0.86], [0.3, 0.74], [0, 0.56], [-0.3, 0.74]], true), oval(0, 0.3, 0.32, 0.3), oval(0, 0.3, 0.22, 0.2)]; },
  partyHat: (cx, by, h) => { const { poly, oval } = pic(cx, by, h); return [oval(0, 0.88, 0.12, 0.12), poly([[0, 0.76], [0.34, 0], [-0.34, 0]], true)]; },
  candle: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[0, 1], [0.14, 0.84], [0.12, 0.74], [0, 0.69], [-0.12, 0.74], [-0.14, 0.84]], true), poly([[-0.16, 0.66], [0.16, 0.66], [0.16, 0], [-0.16, 0]], true)]; },
  icecream2: (cx, by, h) => { const { poly, S } = pic(cx, by, h); const sc = ar(cx, by - h * 0.62, h * 0.3, h * 0.34, Math.PI, 2 * Math.PI); return [S([...sc, [cx - h * 0.3, by - h * 0.62]], true), poly([[-0.3, 0.6], [0.3, 0.6], [0, 0]], true)]; },
  tent: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[0, 1], [0.6, 0], [-0.6, 0]], true), poly([[0, 1], [0, 0]])]; },
  tree: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [curve([[0, 1], [0.3, 0.92], [0.42, 0.68], [0.32, 0.4], [0, 0.34], [-0.32, 0.4], [-0.42, 0.68], [-0.3, 0.92]], true), poly([[-0.07, 0.36], [-0.07, 0], [0.07, 0], [0.07, 0.36]])]; },
  sail2: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[0, 1], [0.4, 0.3], [0, 0.3]], true), poly([[-0.56, 0.24], [0.56, 0.24], [0.36, 0], [-0.36, 0]], true)]; },
  boot3: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.24, 1], [0.12, 1], [0.12, 0.86], [-0.24, 0.86]], true), poly([[-0.24, 0.86], [-0.24, 0], [0.42, 0], [0.42, 0.22], [0.12, 0.3], [0.12, 0.86]]), poly([[-0.24, 0.1], [0.42, 0.1]])]; },
  spade: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[-0.14, 1], [0.14, 1]]), poly([[0, 1], [0, 0.42]]), curve([[-0.2, 0.44], [-0.2, 0.16], [0, 0], [0.2, 0.16], [0.2, 0.44]], true)]; },
  egg: (cx, by, h) => { const { oval } = pic(cx, by, h); return [oval(0, 0.5, 0.33, 0.48)]; },
  coin: (cx, by, h) => { const { oval, poly } = pic(cx, by, h); const l = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 0.08 : 0.2; l.push([r * Math.cos(a), 0.5 - r * Math.sin(a)]); } return [oval(0, 0.5, 0.45, 0.45), oval(0, 0.5, 0.32, 0.32), poly(l, true)]; },
  cloud: (cx, by, h) => { const { curve } = pic(cx, by, h); return [curve([[-0.6, 0.15], [-0.62, 0.42], [-0.38, 0.6], [-0.18, 0.86], [0.12, 0.82], [0.3, 0.62], [0.55, 0.56], [0.66, 0.32], [0.48, 0.12], [0, 0.1]], true)]; },
  drop: (cx, by, h) => { const { curve } = pic(cx, by, h); return [curve([[0, 1], [0.2, 0.62], [0.33, 0.32], [0.22, 0.06], [0, 0], [-0.22, 0.06], [-0.33, 0.32], [-0.2, 0.62]], true)]; },
  star: (cx, by, h) => { const { poly } = pic(cx, by, h); const l = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 0.2 : 0.5; l.push([r * Math.cos(a), 0.52 - r * Math.sin(a)]); } return [poly(l, true)]; },
  moon: (cx, by, h) => { const { S } = pic(cx, by, h); const o = ar(cx, by - h * 0.5, h * 0.45, h * 0.48, 0.42 * Math.PI, 1.58 * Math.PI), i = ar(cx + h * 0.18, by - h * 0.5, h * 0.32, h * 0.36, 1.45 * Math.PI, 0.55 * Math.PI); return [S([...o, ...i], true)]; },
  leaf: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [curve([[0, 1], [0.3, 0.72], [0.28, 0.32], [0, 0.08], [-0.28, 0.32], [-0.3, 0.72]], true), poly([[0, 0.92], [0, 0]])]; },
  banana: (cx, by, h) => { const { curve } = pic(cx, by, h); return [curve([[0.18, 1], [0.32, 0.62], [0.22, 0.24], [-0.12, 0.02], [-0.32, 0.06], [-0.04, 0.24], [0.08, 0.62], [0.1, 0.98]], true)]; },
  bowlingPin: (cx, by, h) => { const { curve } = pic(cx, by, h); return [curve([[0, 1], [0.12, 0.92], [0.1, 0.72], [0.06, 0.62], [0.2, 0.4], [0.18, 0.1], [0.1, 0], [-0.1, 0], [-0.18, 0.1], [-0.2, 0.4], [-0.06, 0.62], [-0.1, 0.72], [-0.12, 0.92]], true)]; },
  bone: (cx, by, h) => { const { curve } = pic(cx, by, h); return [curve([[-0.62, 0.62], [-0.48, 0.74], [-0.36, 0.6], [0.36, 0.6], [0.48, 0.74], [0.62, 0.62], [0.56, 0.5], [0.62, 0.38], [0.48, 0.26], [0.36, 0.4], [-0.36, 0.4], [-0.48, 0.26], [-0.62, 0.38], [-0.56, 0.5]], true)]; },
  fish: (cx, by, h) => { const { curve } = pic(cx, by, h); return [curve([[0.5, 0.5], [0.24, 0.8], [-0.2, 0.74], [-0.42, 0.5], [-0.62, 0.74], [-0.6, 0.26], [-0.42, 0.5], [-0.2, 0.26], [0.24, 0.2]], true)]; },
  // ── two strokes ──
  umbrella: (cx, by, h) => { const { S, curve } = pic(cx, by, h); const top = ar(cx, by - h * 0.6, h * 0.5, h * 0.4, Math.PI, 2 * Math.PI); return [S([...top, [cx - h * 0.5, by - h * 0.6]], true), curve([[0, 0.6], [0, 0.14], [-0.04, 0.03], [-0.13, 0.05], [-0.15, 0.14]])]; },
  spoon: (cx, by, h) => { const { oval, poly } = pic(cx, by, h); return [oval(0, 0.8, 0.16, 0.2), poly([[0, 0.6], [0, 0]])]; },
  jar: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[-0.3, 1], [0.3, 1], [0.3, 0.84], [-0.3, 0.84]], true), curve([[-0.26, 0.84], [-0.36, 0.66], [-0.36, 0.08], [-0.26, 0], [0.26, 0], [0.36, 0.08], [0.36, 0.66], [0.26, 0.84]])]; },
  planet: (cx, by, h) => { const { oval, curve } = pic(cx, by, h); return [oval(0, 0.5, 0.36, 0.36), curve([[-0.66, 0.38], [-0.2, 0.62], [0.36, 0.74], [0.66, 0.66], [0.3, 0.48]])]; },
  ball: (cx, by, h) => { const { oval, curve } = pic(cx, by, h); return [oval(0, 0.5, 0.48, 0.48), curve([[-0.44, 0.7], [0, 0.58], [0.44, 0.7]])]; },
  kite: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[0, 1], [0.32, 0.72], [0, 0.36], [-0.32, 0.72]], true), curve([[0, 0.36], [0.12, 0.24], [-0.06, 0.12], [0.08, 0]])]; },
  dogBowl: (cx, by, h) => { const { oval, curve } = pic(cx, by, h); return [oval(0, 0.82, 0.55, 0.14), curve([[-0.55, 0.82], [-0.42, 0.12], [0, 0], [0.42, 0.12], [0.55, 0.82]])]; },
  kennel: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[-0.5, 0], [-0.5, 0.6], [0, 1], [0.5, 0.6], [0.5, 0]], false), curve([[-0.2, 0], [-0.2, 0.3], [0, 0.44], [0.2, 0.3], [0.2, 0]])]; },
  lollipop: (cx, by, h) => { const { oval, poly } = pic(cx, by, h); return [oval(0, 0.72, 0.28, 0.28), poly([[0, 0.44], [0, 0]])]; },
  apple2: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [curve([[0, 0.8], [0.28, 0.9], [0.44, 0.62], [0.36, 0.18], [0.14, 0.02], [0, 0.08], [-0.14, 0.02], [-0.36, 0.18], [-0.44, 0.62], [-0.28, 0.9]], true), poly([[0.02, 1], [0, 0.8]])]; },
  pear: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [curve([[0, 0.86], [0.14, 0.78], [0.18, 0.56], [0.36, 0.3], [0.28, 0.06], [0, 0], [-0.28, 0.06], [-0.36, 0.3], [-0.18, 0.56], [-0.14, 0.78]], true), poly([[0.04, 1], [0, 0.86]])]; },
  cup: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[-0.38, 0.86], [-0.3, 0], [0.3, 0], [0.38, 0.86]], true), curve([[0.36, 0.7], [0.62, 0.66], [0.6, 0.34], [0.32, 0.28]])]; },
  bucket: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[-0.42, 0.66], [-0.32, 0], [0.32, 0], [0.42, 0.66]], true), curve([[-0.42, 0.66], [-0.3, 0.98], [0.3, 0.98], [0.42, 0.66]])]; },
  surfboard: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [curve([[0, 1], [0.16, 0.8], [0.18, 0.3], [0, 0], [-0.18, 0.3], [-0.16, 0.8]], true), poly([[0, 0.9], [0, 0.1]])]; },
  saucepan: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.62, 0.62], [-0.56, 0.04], [0.06, 0.04], [0.12, 0.62]], true), poly([[0.12, 0.52], [0.66, 0.6]])]; },
  ladle: (cx, by, h) => { const { poly, S } = pic(cx, by, h); return [poly([[0.06, 1], [0.06, 0.32]]), S(ar(cx - h * 0.06, by - h * 0.32, h * 0.12 + h * 0.12, h * 0.26, 0, Math.PI).slice().reverse(), false)]; },
  board: (cx, by, h) => { const { curve, oval } = pic(cx, by, h); return [curve([[-0.46, 0.66], [-0.2, 0.7], [0.4, 0.7], [0.46, 0.4], [0.4, 0.06], [-0.4, 0.06], [-0.46, 0.36]], true), oval(-0.28, 0.5, 0.06, 0.06)]; },
  shovel: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[0, 1], [0, 0.36]]), curve([[-0.18, 0.4], [-0.2, 0.14], [0, 0], [0.2, 0.14], [0.18, 0.4]], true)]; },
  vase: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [poly([[-0.2, 1], [0.2, 1]]), curve([[-0.16, 0.98], [-0.14, 0.8], [-0.36, 0.5], [-0.26, 0.06], [0.26, 0.06], [0.36, 0.5], [0.14, 0.8], [0.16, 0.98]])]; },
  pepper: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [poly([[0.04, 1], [0, 0.82]]), curve([[0, 0.82], [0.3, 0.78], [0.32, 0.4], [0.14, 0], [0, 0.12], [-0.14, 0], [-0.32, 0.4], [-0.3, 0.78]], true)]; },
  plane: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.62, 0.66], [0.62, 0.42], [-0.3, 0.18]], true), poly([[-0.3, 0.18], [-0.04, 0.48]])]; },
  book: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.42, 1], [0.38, 1], [0.38, 0], [-0.42, 0]], true), poly([[-0.3, 1], [-0.3, 0]])]; },
  bread: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [curve([[-0.56, 0.2], [-0.56, 0.6], [-0.3, 0.82], [0.3, 0.82], [0.56, 0.6], [0.56, 0.2], [0.46, 0.04], [-0.46, 0.04]], true), poly([[-0.24, 0.66], [-0.1, 0.4]])]; },
  // ── three strokes ──
  // workshop + gym + rain extras
  puddle: (cx, by, h) => { const { oval } = pic(cx, by, h); return [oval(0, 0.16, 0.56, 0.16)]; },
  boot: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.24, 1], [0.12, 1], [0.12, 0.3], [0.42, 0.22], [0.42, 0], [-0.24, 0]], true)]; },
  paintBrush: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[-0.06, 1], [0.06, 1], [0.06, 0.52], [-0.06, 0.52]], true), poly([[-0.14, 0.52], [0.14, 0.52], [0.14, 0.38], [-0.14, 0.38]], true), curve([[-0.14, 0.38], [-0.18, 0.12], [0, 0], [0.18, 0.12], [0.14, 0.38]]), poly([[0, 0.34], [0, 0.08]])]; },
  paintCan: (cx, by, h) => { const { poly, curve, oval } = pic(cx, by, h); return [curve([[-0.36, 0.7], [-0.3, 1], [0.3, 1], [0.36, 0.7]]), oval(0, 0.7, 0.4, 0.08), poly([[-0.4, 0.7], [-0.4, 0], [0.4, 0], [0.4, 0.7]]), curve([[0.24, 0.66], [0.27, 0.46], [0.2, 0.34], [0.29, 0.26]])]; },
  screwdriver: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.12, 1], [0.12, 1], [0.14, 0.62], [0.1, 0.5], [-0.1, 0.5], [-0.14, 0.62]], true), poly([[0, 0.5], [0, 0.08]]), poly([[-0.06, 0.12], [0, 0], [0.06, 0.12]]), poly([[-0.04, 0.92], [-0.04, 0.6]])]; },
  toolbox: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.2, 0.6], [-0.2, 0.86], [0.2, 0.86], [0.2, 0.6]]), poly([[-0.56, 0.6], [0.56, 0.6], [0.56, 0], [-0.56, 0]], true), poly([[-0.56, 0.42], [0.56, 0.42]]), poly([[-0.12, 0.5], [0.12, 0.5], [0.12, 0.3], [-0.12, 0.3]], true)]; },
  trophy: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.32, 1], [-0.3, 0.6], [-0.08, 0.42], [0.08, 0.42], [0.3, 0.6], [0.32, 1]], true), curve([[-0.31, 0.9], [-0.54, 0.86], [-0.5, 0.62], [-0.24, 0.56]]), curve([[0.31, 0.9], [0.54, 0.86], [0.5, 0.62], [0.24, 0.56]]), poly([[-0.06, 0.42], [-0.06, 0.16], [-0.3, 0.16], [-0.3, 0], [0.3, 0], [0.3, 0.16], [0.06, 0.16], [0.06, 0.42]])]; },
  sailboat: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[0, 1], [0, 0.28]]), poly([[0.04, 0.96], [0.42, 0.34], [0.04, 0.34]], true), poly([[-0.56, 0.28], [0.56, 0.28], [0.36, 0], [-0.36, 0]], true)]; },
  wateringCan: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[-0.3, 0.7], [-0.3, 0], [0.26, 0], [0.26, 0.7]], true), poly([[0.26, 0.36], [0.62, 0.74]]), curve([[-0.3, 0.6], [-0.56, 0.6], [-0.56, 0.2], [-0.3, 0.2]])]; },
  ruler: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.66, 0.66], [0.66, 0.66], [0.66, 0.34], [-0.66, 0.34]], true), poly([[-0.33, 0.66], [-0.33, 0.52]]), poly([[0, 0.66], [0, 0.48]]), poly([[0.33, 0.66], [0.33, 0.52]])]; },
  pencil: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.12, 1], [0.12, 1], [0.12, 0.28], [-0.12, 0.28]], true), poly([[-0.12, 0.28], [0, 0], [0.12, 0.28]]), poly([[-0.12, 0.86], [0.12, 0.86]])]; },
  pomegranate: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [poly([[-0.12, 1], [-0.06, 0.82], [0, 0.98], [0.06, 0.82], [0.12, 1]]), curve([[0.12, 0.82], [0.4, 0.66], [0.42, 0.24], [0, 0], [-0.42, 0.24], [-0.4, 0.66], [-0.12, 0.82]], true)]; },
  hammer: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.46, 0.82], [-0.46, 1], [0.12, 1], [0.34, 0.98], [0.5, 0.84], [0.3, 0.86], [0.12, 0.8], [-0.46, 0.82]], true), poly([[-0.06, 0.8], [-0.06, 0]]), poly([[0.06, 0.8], [0.06, 0]]), poly([[-0.06, 0.3], [0.06, 0.3]])]; },
  nail: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.24, 1], [0.24, 1]]), poly([[0, 1], [0, 0.1]]), poly([[-0.06, 0.12], [0, 0], [0.06, 0.12]])]; },
  saw: (cx, by, h) => { const { poly } = pic(cx, by, h); const t = [[-0.32, 0.4]]; for (let k = 0; k < 7; k++) t.push([-0.32 + (k + 0.5) * 0.14, 0.32], [-0.32 + (k + 1) * 0.14, 0.4]); return [poly([[-0.66, 0.9], [-0.32, 0.9], [-0.32, 0.4], [-0.66, 0.4]], true), poly([[-0.32, 0.8], [0.66, 0.6], [0.66, 0.4]]), poly(t)]; },
  dumbbell: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.62, 0.8], [-0.4, 0.8], [-0.4, 0.2], [-0.62, 0.2]], true), poly([[-0.4, 0.5], [0.4, 0.5]]), poly([[0.4, 0.8], [0.62, 0.8], [0.62, 0.2], [0.4, 0.2]], true)]; },
  bottle: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.12, 1], [0.12, 1], [0.12, 0.88], [-0.12, 0.88]], true), poly([[-0.12, 0.88], [-0.26, 0.7], [-0.26, 0], [0.26, 0], [0.26, 0.7], [0.12, 0.88]]), poly([[-0.26, 0.5], [0.26, 0.5]]), poly([[-0.26, 0.24], [0.26, 0.24]])]; },
  medal: (cx, by, h) => { const { poly, oval } = pic(cx, by, h); return [poly([[-0.3, 1], [0, 0.56]]), poly([[0.3, 1], [0, 0.56]]), oval(0, 0.3, 0.27, 0.27)]; },
  kettlebell: (cx, by, h) => { const { curve, oval, poly } = pic(cx, by, h); return [curve([[-0.24, 0.66], [-0.24, 0.94], [0.24, 0.94], [0.24, 0.66]]), oval(0, 0.36, 0.38, 0.36), curve([[-0.1, 0.84], [0.1, 0.84]]), poly([[-0.2, 0.06], [0.2, 0.06]])]; },
  apple3: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [poly([[0.02, 1], [0, 0.78]]), curve([[0.02, 0.92], [0.2, 1], [0.34, 0.92], [0.2, 0.86], [0.02, 0.92]], true), curve([[0, 0.78], [0.28, 0.88], [0.44, 0.6], [0.36, 0.16], [0.14, 0.02], [0, 0.08], [-0.14, 0.02], [-0.36, 0.16], [-0.44, 0.6], [-0.28, 0.88]], true)]; },
  cup3: (cx, by, h) => { const { poly, curve, oval } = pic(cx, by, h); return [oval(0, 0.04, 0.5, 0.05), poly([[-0.36, 0.7], [-0.28, 0.1], [0.28, 0.1], [0.36, 0.7]], true), curve([[0.34, 0.56], [0.58, 0.52], [0.56, 0.26], [0.3, 0.22]]), curve([[-0.06, 1], [0.04, 0.9], [-0.04, 0.82], [0.04, 0.76]])]; },
  basket: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.42, 0.5], [-0.3, 1], [0.3, 1], [0.42, 0.5]]), poly([[-0.56, 0.5], [0.56, 0.5], [0.42, 0], [-0.42, 0]], true), poly([[-0.48, 0.28], [0.48, 0.28]])]; },
  ball3: (cx, by, h) => { const { oval, curve } = pic(cx, by, h); return [oval(0, 0.5, 0.48, 0.48), curve([[0, 0.98], [-0.14, 0.5], [0, 0.02]]), curve([[-0.44, 0.7], [0, 0.6], [0.44, 0.7]]), curve([[-0.44, 0.3], [0, 0.4], [0.44, 0.3]])]; },
  plate: (cx, by, h) => { const { oval } = pic(cx, by, h); return [oval(0, 0.5, 0.56, 0.3), oval(0, 0.5, 0.36, 0.18)]; },
  fork: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.14, 1], [-0.14, 0.7], [0.14, 0.7], [0.14, 1]]), poly([[0, 1], [0, 0.7]]), poly([[0, 0.7], [0, 0]])]; },
  crown: (cx, by, h) => { const { poly, oval } = pic(cx, by, h); return [poly([[-0.48, 0.3], [-0.48, 0.9], [-0.24, 0.6], [0, 0.96], [0.24, 0.6], [0.48, 0.9], [0.48, 0.3]]), poly([[-0.48, 0.3], [0.48, 0.3], [0.48, 0.06], [-0.48, 0.06]], true), oval(0, 0.18, 0.07, 0.07)]; },
  gem: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.24, 0.9], [0.24, 0.9], [0.48, 0.6], [0, 0], [-0.48, 0.6]], true), poly([[-0.48, 0.6], [0.48, 0.6]]), poly([[-0.24, 0.9], [0, 0.6], [0.24, 0.9]])]; },
  chest: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.56, 0.56], [-0.5, 0.86], [0, 0.98], [0.5, 0.86], [0.56, 0.56]]), poly([[-0.56, 0.56], [0.56, 0.56], [0.56, 0], [-0.56, 0]], true), poly([[-0.08, 0.62], [0.08, 0.62], [0.08, 0.42], [-0.08, 0.42]], true), poly([[-0.56, 0.2], [0.56, 0.2]])]; },
  key: (cx, by, h) => { const { oval, poly } = pic(cx, by, h); return [oval(-0.4, 0.5, 0.2, 0.2), poly([[-0.2, 0.5], [0.62, 0.5]]), poly([[0.4, 0.5], [0.4, 0.32], [0.54, 0.32], [0.54, 0.5]])]; },
  shirt: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.14, 0.96], [-0.5, 0.82], [-0.62, 0.56], [-0.44, 0.5], [-0.36, 0.6], [-0.36, 0], [0.36, 0], [0.36, 0.6], [0.44, 0.5], [0.62, 0.56], [0.5, 0.82], [0.14, 0.96]]), poly([[-0.14, 0.96], [0, 0.8], [0.14, 0.96]]), poly([[0.1, 0.5], [0.26, 0.5], [0.26, 0.34], [0.1, 0.34]], true)]; },
  mitten: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [poly([[-0.3, 0.12], [0.34, 0.12]]), poly([[-0.3, 0.24], [0.34, 0.24], [0.34, 0], [-0.3, 0]], true), curve([[-0.3, 0.24], [-0.36, 0.7], [-0.2, 0.96], [0.12, 0.96], [0.26, 0.7], [0.34, 0.24]]), curve([[-0.33, 0.56], [-0.56, 0.62], [-0.58, 0.44], [-0.34, 0.38]])]; },
  hat: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.32, 0.3], [-0.3, 0.86], [0, 0.96], [0.3, 0.86], [0.32, 0.3]]), poly([[-0.62, 0.3], [0.62, 0.3], [0.62, 0.16], [-0.62, 0.16]], true), poly([[-0.31, 0.46], [0.31, 0.46]]), curve([[0.18, 0.62], [0.34, 0.9], [0.5, 1.02], [0.4, 0.74], [0.24, 0.5]])]; },
  sock: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [poly([[-0.3, 1], [0.12, 1], [0.12, 0.8], [-0.3, 0.8]], true), curve([[-0.3, 0.8], [-0.3, 0.3], [-0.22, 0.06], [0.16, 0], [0.48, 0.08], [0.42, 0.26], [0.14, 0.34], [0.12, 0.8]]), curve([[0.24, 0.02], [0.3, 0.14], [0.46, 0.16]])]; },
  hanger: (cx, by, h) => { const { curve, poly } = pic(cx, by, h); return [curve([[-0.1, 0.86], [0, 1], [0.1, 0.9], [0, 0.72]]), poly([[0, 0.72], [-0.62, 0.2], [0.62, 0.2], [0, 0.72]], true)]; },
  scarf: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.5, 1], [0.5, 1], [0.5, 0.78], [-0.5, 0.78]], true), poly([[0.24, 0.78], [0.24, 0], [0.48, 0], [0.48, 0.78]]), poly([[0.24, 0.14], [0.48, 0.14]]), poly([[0.24, 0.3], [0.48, 0.3]])]; },
  house: (cx, by, h) => { const { poly } = pic(cx, by, h); return [poly([[-0.56, 0.56], [0, 1], [0.56, 0.56]]), poly([[-0.44, 0.62], [-0.44, 0], [0.44, 0], [0.44, 0.62]]), poly([[-0.14, 0], [-0.14, 0.34], [0.14, 0.34], [0.14, 0]])]; },
  anchor: (cx, by, h) => { const { oval, poly, curve } = pic(cx, by, h); return [oval(0, 0.9, 0.1, 0.1), poly([[0, 0.8], [0, 0]]), curve([[-0.46, 0.36], [-0.36, 0.08], [0, 0], [0.36, 0.08], [0.46, 0.36]])]; },
  carrot: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.12, 1], [-0.06, 0.82], [0, 0.72]]), curve([[0.14, 1], [0.06, 0.82], [0, 0.72]]), poly([[-0.2, 0.72], [0.2, 0.72], [0, 0]], true)]; },
  icecream: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.32, 0.6], [-0.36, 0.84], [0, 1], [0.36, 0.84], [0.32, 0.6]]), poly([[-0.32, 0.6], [0.32, 0.6], [0, 0]], true), poly([[-0.16, 0.36], [0.16, 0.36]])]; },
  rocket: (cx, by, h) => { const { poly, oval } = pic(cx, by, h); return [poly([[0, 1], [0.2, 0.72], [0.2, 0.14], [-0.2, 0.14], [-0.2, 0.72]], true), oval(0, 0.56, 0.08, 0.08), poly([[-0.2, 0.34], [-0.4, 0.06], [-0.2, 0.14]]), poly([[0.2, 0.34], [0.4, 0.06], [0.2, 0.14]])]; },
  flower: (cx, by, h) => { const { oval, poly, curve } = pic(cx, by, h); return [oval(0, 0.78, 0.2, 0.2), poly([[0, 0.58], [0, 0]]), curve([[0, 0.26], [0.2, 0.4], [0.34, 0.36], [0.18, 0.24], [0, 0.26]], true)]; },
  mushroom: (cx, by, h) => { const { poly, curve } = pic(cx, by, h); return [curve([[-0.56, 0.5], [-0.4, 0.86], [0, 1], [0.4, 0.86], [0.56, 0.5]]), poly([[-0.56, 0.5], [0.56, 0.5]]), poly([[-0.16, 0.5], [-0.18, 0], [0.18, 0], [0.16, 0.5]])]; },
};
/** resample to ≤ 3 px (a 4-corner rectangle is too few points for orient's direction test) */
const dense = (pts) => { const o = [pts[0]]; for (let i = 1; i < pts.length; i++) { const [ax, ay] = pts[i - 1], [bx, by] = pts[i], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / 3)); for (let k = 1; k <= n; k++) o.push([ax + (bx - ax) * k / n, ay + (by - ay) * k / n]); } return o; };
const fixedOf = (s) => ({ m: 'lineFixed', a: [orient({ pts: dense(s.pts), closed: s.closed }), s.closed], start: 'lines' });
/** a designed-stroke picture → traced motifs (each stroke with its own start dot + arrow) */
function picture(name, cx, by, h) { const f = D[name]; if (!f) throw new Error('K-426: no designed picture ' + name); return f(cx, by, h).map(fixedOf); }
/** how many strokes a picture has */
const strokes = (name) => D[name](0, 100, 100).length;
module.exports = { picture, strokes, D };
