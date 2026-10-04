/**
 * data/cbn/designs.js — the Color by Number pictures (2026-10-04; operator: 100 complete scenes + 100 single
 * multi-part pictures, top quality, cute colouring style). Each design: id, kind ('scene' | 'picture'), level (1-3,
 * by measured complexity: lib/cbn-render.js LEVEL_CAPS), names (localized title part), draw(art).
 * The frame is 600 x 560 picture units; a scene fills it, a picture stands on white.
 */
'use strict';
const { Art } = require('../../primitives/cbn-art/core.js');
const P = require('../../primitives/cbn-art/parts.js');

const W = 600, H = 560;

const DESIGNS = [
  /* ------------------------------------------------------------ PILOT (2026-10-04) */
  { id: 'duck-pond', kind: 'scene', level: 1, names: { en: 'Duck on the Pond' },
    draw(a) {
      P.pond(a, W, H);
      a.at({ x: 470, y: 92, s: 0.95 }, (b) => P.sun(b));
      a.at({ x: 150, y: 90, s: 0.9 }, (b) => P.cloud(b));
      a.at({ x: 290, y: 400, s: 1.45 }, (b) => P.duck(b));
      a.at({ x: 500, y: 470, s: 1.0 }, (b) => P.lilyPad(b));
    } },
  { id: 'farm-cow', kind: 'scene', level: 2, names: { en: 'Cow on the Farm' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.34 });
      a.at({ x: 500, y: 86 }, (b) => P.sun(b));
      a.at({ x: 170, y: 80, s: 0.85 }, (b) => P.cloud(b));
      a.at({ x: 568, y: 240, s: 0.9 }, (b) => P.tree(b));
      a.at({ x: 14, y: 300, s: 0.95 }, (b) => P.fence(b, 3, 'brown', 62));
      a.at({ x: 312, y: 420, s: 1.35 }, (b) => P.cow(b));
      [[70, 520], [520, 500], [420, 540]].forEach(([x, y]) => P.grassTuft(a, x, y));
    } },
  { id: 'under-the-sea', kind: 'scene', level: 3, names: { en: 'Under the Sea' },
    draw(a) {
      P.sea(a, W, H);
      a.at({ x: 70, y: 520 }, (b) => P.seaweed(b, 'green', 200));
      a.at({ x: 548, y: 515, s: 0.85 }, (b) => P.shell(b, 'orange'));
      a.at({ x: 240, y: 300, s: 1.45 }, (b) => P.octopus(b));
      a.at({ x: 140, y: 118, s: 1.2 }, (b) => P.fish(b, 'orange', 'yellow', 'none'));
      a.at({ x: 460, y: 180, s: 1.15, fx: true }, (b) => P.fish(b, 'pink', 'purple', 'none'));
      a.at({ x: 470, y: 455, s: 1.05 }, (b) => P.crab(b));
      a.at({ x: 150, y: 505, s: 1.1 }, (b) => P.shell(b));
      [[250, 120, 12], [272, 90, 9], [400, 60, 13], [540, 300, 11]].forEach(([x, y, r]) => a.at({ x, y }, (b) => P.bubble(b, r)));
    } },
  { id: 'rocket-space', kind: 'scene', level: 2, names: { en: 'Rocket in Space' },
    draw(a) {
      P.space(a, W, H);
      a.at({ x: 140, y: 150, s: 1.2 }, (b) => P.planet(b, 'orange', 'purple'));
      a.at({ x: 500, y: 110, s: 1.0 }, (b) => P.moon(b));
      [[80, 330, 28], [180, 480, 26], [530, 320, 28], [450, 490, 30], [330, 60, 24], [555, 455, 24]].forEach(([x, y, r]) => a.at({ x, y }, (b) => P.bigStar(b, 'yellow', r)));
      a.at({ x: 300, y: 290, s: 1.5, r: 18 }, (b) => P.rocket(b));
    } },
  { id: 'bunny-garden', kind: 'scene', level: 3, names: { en: 'Bunny in the Garden' },
    draw(a) {
      P.meadow(a, W, H, { horizon: 0.56 });
      a.at({ x: 90, y: 86, s: 0.9 }, (b) => P.sun(b));
      a.at({ x: 400, y: 80, s: 0.8 }, (b) => P.cloud(b));
      a.at({ x: 112, y: 420, s: 1.2 }, (b) => P.flower(b, 'red', 'yellow', 'green'));
      a.at({ x: 470, y: 405, s: 1.2 }, (b) => P.flower(b, 'red', 'yellow', 'green'));
      a.at({ x: 300, y: 350, s: 1.45 }, (b) => P.bunny(b, 'grey', 'pink'));
      a.at({ x: 470, y: 170, s: 0.72 }, (b) => P.butterfly(b, 'purple', 'yellow', 'grey'));
      a.at({ x: 548, y: 500, s: 0.72 }, (b) => P.mushroom(b, 'red'));
    } },
  { id: 'flower-pot', kind: 'picture', level: 1, names: { en: 'Happy Flower' },
    draw(a) { a.at({ x: 300, y: 250, s: 1.12 }, (b) => P.flowerPot(b)); } },
  { id: 'cozy-house', kind: 'picture', level: 1, names: { en: 'Cozy House' },
    draw(a) { a.at({ x: 300, y: 330, s: 1.5 }, (b) => P.house(b)); } },
  { id: 'turtle', kind: 'picture', level: 1, names: { en: 'Little Turtle' },
    draw(a) { a.at({ x: 278, y: 330, s: 1.85 }, (b) => P.turtle(b)); } },
  { id: 'owl', kind: 'picture', level: 2, names: { en: 'Owl on a Branch' },
    draw(a) {
      a.at({ x: 300, y: 430 }, (b) => {
        b.at({ x: -182, y: -84, s: 0.95 }, (c) => P.flower(c, 'pink', 'yellow', 'green'));
        b.region('M-262 -6Q-120 -24 0 -14Q120 -4 262 -18L262 26Q120 40 0 30Q-120 22 -262 36Z', 'brown', 'branch');
        b.at({ x: -250, y: -10, r: -30 }, (c) => c.region('M0 0Q22 -46 74 -34Q46 8 0 0Z', 'green', 'leaf'));
        b.at({ x: 200, y: -20, r: 24, fx: true }, (c) => c.region('M0 0Q22 -46 74 -34Q46 8 0 0Z', 'green', 'leaf'));
      });
      a.at({ x: 300, y: 248, s: 1.75 }, (b) => P.owl(b));
    } },
  { id: 'rainbow-dino', kind: 'picture', level: 3, names: { en: 'Rainbow Dinosaur' },
    draw(a) { a.at({ x: 290, y: 330, s: 1.32 }, (b) => P.dino(b)); } },
];

function build(design) { const a = new Art(W, H); design.draw(a); return a; }

module.exports = { DESIGNS, build, W, H };
