/**
 * life-stage.js — the 13 drawn stages of three animals whose young look nothing like
 * the adult (nt10-E G1-377 `animal-life-cycles`; design
 * docs/worksheet-gen/b5-designs/G1-377-animal-life-cycles.md §2 "NEW primitives/life-stage.js";
 * gate qa/verify-life-stage.js).
 *
 *   lifeStage({ animal, stage, size, lens = true, spawnForm = 'clump', id })
 *     -> { svg, width: size, height: size, meta: { animal, stage, parts: {<part>: count}, magnified } }
 *
 * butterfly  egg -> larva (caterpillar) -> pupa (chrysalis) -> adult     (complete metamorphosis)
 * frog       spawn -> tadpole -> legged -> froglet -> adult              (hind legs first; the froglet keeps a stub)
 * ladybird   egg -> larva -> pupa -> adult                              (the larva is the "tiny alligator")
 * The ORDER is biology and lives in the family bank (data/b5/animal-life-cycles.js STAGES);
 * this file only draws.
 *
 * Geometry: viewBox 0 0 200 200, centre (100,100). Every KEY part (the animal, its legs,
 * spots, eggs) lies within r 88 of the centre; scenery (leaf ends, water, the pad) may run
 * to the lens edge and is clipped at r 96. MIN_SIZE 90 (throws below: nobody has looked at
 * a smaller one).
 * Strokes are CONSTANT px (the body-figure.js convention, user units = px x 200 / size):
 * OUTLINE clamp(size/48, 2, 3) px, DETAIL 1.5 px (size >= 110) else 1.2 px; limb widths are
 * user units and scale with the drawing.
 * Lens (lens:true): white disc r 97, the stage group clipped to r 96, ring r 97 teal 3 px,
 * inner rim r 97 - 6u `grid` 1.2 px. Palette: cream, creamDeep, white, teal, tealSoft,
 * coral, coralSoft, ink, grid — nothing else. Every counted element carries data-part.
 *
 * One deviation from the design text (measured in the render): the lily pad's notch arc is
 * written `A r r 0 1 1` (large, sweep 1). The design's `0 1 0` asks for the large arc in
 * the negative direction between two points 30 deg apart, which on a circle centred on
 * (cx, cy) does not exist, so the renderer re-centres the circle and draws a lobe.
 */
'use strict';
const tokens = require('./_tokens.js');
const { el, esc } = require('./_svg.js');

const T = tokens.color;
const MIN_SIZE = 90;
const STAGE_IDS = {
  butterfly: ['egg', 'larva', 'pupa', 'adult'],
  frog: ['spawn', 'tadpole', 'legged', 'froglet', 'adult'],
  ladybird: ['egg', 'larva', 'pupa', 'adult'],
};
/** Scenery part names: may leave r 88 (clipped at the lens), never counted as the animal. */
const SCENERY = new Set(['leaf', 'water', 'pad', 'petiole', 'surface']);

const r2 = (v) => Math.round(v * 100) / 100;
const pts = (list) => list.map(([x, y]) => `${r2(x)},${r2(y)}`).join(' ');

function strokes(size) {
  const u = 200 / size;
  const outlinePx = Math.min(3, Math.max(2, size / 48));
  const detailPx = size >= 110 ? 1.5 : 1.2;
  return { u, O: outlinePx * u, D: detailPx * u, outlinePx, detailPx };
}

/* ------------------------------------------------------------------ shared scenery */
function LEAF(dy, S) {
  return el('g', { transform: `translate(0 ${dy})`, 'data-scenery': 'leaf' }, [
    el('line', { x1: 10, y1: 110, x2: 22, y2: 104, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linecap': 'round', 'data-part': 'petiole' }),
    el('path', { d: 'M 22 104 C 62 66 128 62 180 90 C 128 134 62 138 22 104 Z', fill: T.tealSoft, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linejoin': 'round', 'data-part': 'leaf' }),
    el('path', { d: 'M 22 104 Q 100 102 180 90', fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round' }),
  ]);
}
function LEAF_OVER(S) {
  return el('g', { 'data-scenery': 'leaf-over' }, [
    el('path', { d: 'M 4 52 C 60 20 140 18 196 44 C 140 70 60 72 4 52 Z', fill: T.tealSoft, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linejoin': 'round', 'data-part': 'leaf' }),
    el('path', { d: 'M 8 52 Q 100 44 192 44', fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round' }),
  ]);
}
function LEAF_SURFACE(S) {
  return el('g', { 'data-scenery': 'leaf-surface' }, [
    el('path', { d: 'M 0 120 Q 100 92 200 110 L 200 200 L 0 200 Z', fill: T.tealSoft, stroke: 'none', 'data-part': 'leaf' }),
    el('path', { d: 'M 0 120 Q 100 92 200 110', fill: 'none', stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linecap': 'round' }),
    el('path', { d: 'M 30 176 Q 100 148 196 150', fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round' }),
    el('path', { d: 'M 60 200 Q 110 170 170 176', fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round' }),
  ]);
}
function WATER() {
  return el('rect', { x: 0, y: 0, width: 200, height: 200, fill: T.tealSoft, 'data-part': 'water' });
}
function PAD(r, cx, cy, S) {
  const P = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const a = P(-0.88), b = P(-1.40);
  return el('path', { d: `M ${cx} ${cy} L ${r2(a[0])} ${r2(a[1])} A ${r} ${r} 0 1 1 ${r2(b[0])} ${r2(b[1])} Z`, fill: T.white, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linejoin': 'round', 'data-part': 'pad' });
}

/* ------------------------------------------------------------------ the dorsal frog */
function FROG(s, cx, cy, tail, S) {
  const out = [];
  for (const m of [-1, 1]) {
    const X = (x) => cx + m * x * s, Y = (y) => cy + y * s;
    out.push(el('polyline', { points: pts([[X(22), Y(18)], [X(48), Y(32)], [X(34), Y(56)]]), fill: 'none', stroke: T.teal, 'stroke-width': r2(8 * s), 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'data-part': 'leg', 'data-leg': 'hind' }));
    out.push(el('polygon', { points: pts([[X(34), Y(56)], [X(22), Y(72)], [X(34), Y(74)], [X(46), Y(70)]]), fill: T.teal, 'data-part': 'foot' }));
    out.push(el('polyline', { points: pts([[X(22), Y(-6)], [X(40), Y(-16)], [X(44), Y(-32)]]), fill: 'none', stroke: T.teal, 'stroke-width': r2(8 * s), 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'data-part': 'leg', 'data-leg': 'front' }));
    for (const [dx, dy] of [[-6, -8], [-1, -10], [4, -9], [8, -5]]) {
      out.push(el('line', { x1: r2(X(44)), y1: r2(Y(-32)), x2: r2(X(44 + dx)), y2: r2(Y(-32 + dy)), stroke: T.teal, 'stroke-width': r2(3.5 * s), 'stroke-linecap': 'round', 'data-part': 'toe' }));
    }
  }
  if (tail) {
    out.push(el('path', { d: `M ${r2(cx - 11 * s)} ${r2(cy + 30 * s)} Q ${r2(cx - 6 * s)} ${r2(cy + 58 * s)} ${r2(cx)} ${r2(cy + 63 * s)} Q ${r2(cx + 6 * s)} ${r2(cy + 58 * s)} ${r2(cx + 11 * s)} ${r2(cy + 30 * s)} Z`,
      fill: T.creamDeep, stroke: T.teal, 'stroke-width': r2(0.8 * S.O), 'stroke-linejoin': 'round', 'data-part': 'tail', 'data-tail': 'stub' }));
  }
  out.push(el('ellipse', { cx: r2(cx), cy: r2(cy), rx: r2(30 * s), ry: r2(38 * s), fill: T.teal, stroke: T.teal, 'stroke-width': r2(S.O), 'data-part': 'body' }));
  for (const m of [-1, 1]) {
    out.push(el('path', { d: `M ${r2(cx + m * 12 * s)} ${r2(cy - 14 * s)} Q ${r2(cx + m * 15 * s)} ${r2(cy + 6 * s)} ${r2(cx + m * 10 * s)} ${r2(cy + 26 * s)}`, fill: 'none', stroke: T.creamDeep, 'stroke-width': r2(3 * s), 'stroke-linecap': 'round', 'data-part': 'ridge' }));
  }
  for (const m of [-1, 1]) {
    out.push(el('circle', { cx: r2(cx + m * 16 * s), cy: r2(cy - 30 * s), r: r2(9 * s), fill: T.white, stroke: T.teal, 'stroke-width': r2(0.8 * S.O), 'data-part': 'eye' }));
    out.push(el('circle', { cx: r2(cx + m * 16 * s), cy: r2(cy - 30 * s), r: r2(4 * s), fill: T.ink, 'data-part': 'pupil' }));
  }
  return out.join('');
}

/* ------------------------------------------------------------------ the tadpole body (tadpole, legged) */
function TADPOLE(S, legs) {
  const out = [];
  out.push(el('path', { d: 'M 88 92 C 80 124 90 150 100 180 C 110 150 120 124 112 92 Z', fill: T.creamDeep, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linejoin': 'round', 'data-part': 'tail' }));
  out.push(el('path', { d: 'M 100 96 Q 96 136 100 176', fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round' }));
  if (legs) {
    for (const m of [1, -1]) {
      const X = (x) => (m === 1 ? x : 200 - x);
      out.push(el('polyline', { points: pts([[X(106), 100], [X(130), 114], [X(120), 136]]), fill: 'none', stroke: T.ink, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'data-part': 'leg', 'data-leg': 'hind' }));
      out.push(el('polygon', { points: pts([[X(120), 136], [X(110), 148], [X(120), 150], [X(130), 146]]), fill: T.ink, 'data-part': 'foot' }));
    }
  }
  out.push(el('ellipse', { cx: 100, cy: 72, rx: 22, ry: 26, fill: T.ink, 'data-part': 'body' }));
  for (const x of [89, 111]) {
    out.push(el('circle', { cx: x, cy: 60, r: 4.5, fill: T.white, 'data-part': 'eye' }));
    out.push(el('circle', { cx: x, cy: 60, r: 2, fill: T.ink, 'data-part': 'pupil' }));
  }
  return out.join('');
}

/* ------------------------------------------------------------------ the 13 stages */
const DRAW = {
  butterfly: {
    egg(S) {
      return {
        magnified: true,
        body: LEAF_SURFACE(S) +
          el('path', { d: 'M 82 114 C 80 84 90 50 100 48 C 110 50 120 84 118 114 Z', fill: T.white, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linejoin': 'round', 'data-part': 'egg', 'data-mag': '1' }) +
          ['M 99 50 Q 88 80 91 113', 'M 99 50 Q 96 82 97 114', 'M 101 50 Q 104 82 103 114', 'M 101 50 Q 112 80 109 113']
            .map((d) => el('path', { d, fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round', 'data-part': 'rib' })).join(''),
      };
    },
    larva(S) {
      const seg = [];
      for (let i = 0; i <= 9; i++) seg.push([40 + 13 * i, 104 - 6 * Math.sin(Math.PI * i / 9)]);
      const legs = [];
      for (const i of [7, 8, 9]) { const [x, y] = seg[i]; legs.push(el('polygon', { points: pts([[x - 3, y + 8], [x + 3, y + 8], [x, y + 17]]), fill: T.teal, 'data-part': 'leg' })); }
      for (const i of [1, 2, 3, 4]) { const [x, y] = seg[i]; legs.push(el('rect', { x: r2(x - 3.5), y: r2(y + 7), width: 7, height: 10, rx: 2.5, fill: T.teal, 'data-part': 'proleg' })); }
      { const [x, y] = seg[0]; legs.push(el('rect', { x: r2(x - 4), y: r2(y + 7), width: 8, height: 10, rx: 2.5, fill: T.teal, 'data-part': 'clasper' })); }
      const body = [];
      seg.forEach(([x, y], i) => {
        body.push(el('circle', { cx: r2(x), cy: r2(y), r: 11, fill: T.creamDeep, stroke: T.teal, 'stroke-width': r2(1.3 * S.D), 'data-part': 'segment' }));
        if (i <= 8) body.push(el('circle', { cx: r2(x), cy: r2(y + 3), r: 1.9, fill: T.ink, 'data-part': 'spiracle' }));
      });
      body.push(el('circle', { cx: 170, cy: 96, r: 12.5, fill: T.teal, 'data-part': 'head' }));
      body.push(el('circle', { cx: 175, cy: 92, r: 2.4, fill: T.white, 'data-part': 'eyedot' }));
      return { body: LEAF(36, S) + legs.join('') + body.join('') };
    },
    pupa(S) {
      return {
        body: LEAF_OVER(S) +
          el('ellipse', { cx: 100, cy: 66, rx: 5, ry: 3, fill: T.ink, 'data-part': 'silkpad' }) +
          el('line', { x1: 100, y1: 66, x2: 100, y2: 78, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linecap': 'round', 'data-part': 'stalk' }) +
          el('path', { d: 'M 100 76 C 122 80 134 114 130 142 C 126 172 112 186 100 186 C 88 186 74 172 70 142 C 66 114 78 80 100 76 Z', fill: T.tealSoft, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linejoin': 'round', 'data-part': 'pupa' }) +
          el('path', { d: 'M 72 112 Q 100 102 128 112', fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round', 'data-part': 'band' }) +
          [[80, 119], [91, 115], [109, 115], [120, 119]].map(([x, y]) => el('circle', { cx: x, cy: y, r: 3.6, fill: T.coral, stroke: T.ink, 'stroke-width': r2(S.u), 'data-part': 'spot' })).join(''),
      };
    },
    adult(S) {
      const out = [];
      for (const m of [1, -1]) {
        const X = (x) => (m === 1 ? x : 200 - x);
        const path = (d) => d.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g, (w, x, y) => `${r2(X(+x))} ${y}`);
        out.push(el('path', { d: path('M 108 96 C 146 98 164 118 154 144 C 144 166 116 156 106 118 Z'), fill: T.coralSoft, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linejoin': 'round', 'data-part': 'wing', 'data-wing': 'hind' }));
        out.push(el('path', { d: path('M 110 104 Q 132 118 146 138'), fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round', 'data-part': 'vein' }));
        out.push(el('path', { d: path('M 106 70 C 132 40 170 36 176 58 C 182 84 152 104 108 94 Z'), fill: T.coral, stroke: T.teal, 'stroke-width': r2(S.O), 'stroke-linejoin': 'round', 'data-part': 'wing', 'data-wing': 'fore' }));
        out.push(el('path', { d: path('M 110 80 Q 140 64 168 58 M 112 88 Q 140 84 164 78'), fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round', 'data-part': 'vein' }));
        for (const [x, y] of [[160, 50], [170, 63], [164, 77]]) out.push(el('circle', { cx: X(x), cy: y, r: 3.2, fill: T.white, 'data-part': 'margin' }));
        out.push(el('g', { 'data-part': 'antenna', 'data-club': '1' },
          el('line', { x1: X(103), y1: 51, x2: X(116), y2: 26, stroke: T.ink, 'stroke-width': r2(1.4 * S.D), 'stroke-linecap': 'round' }) +
          el('circle', { cx: X(116), cy: 26, r: 4.5, fill: T.ink })));
      }
      out.push(el('ellipse', { cx: 100, cy: 118, rx: 5.5, ry: 24, fill: T.ink, 'data-part': 'abdomen' }));
      out.push(el('ellipse', { cx: 100, cy: 80, rx: 8, ry: 13, fill: T.ink, 'data-part': 'thorax' }));
      out.push(el('circle', { cx: 100, cy: 58, r: 8, fill: T.ink, 'data-part': 'head' }));
      return { body: out.join(''), lensTop: true };
    },
  },
  frog: {
    spawn(S, o) {
      const out = [
        el('path', { d: 'M 0 62 Q 25 56 50 62 T 100 62 T 150 62 T 200 62 L 200 200 L 0 200 Z', fill: T.tealSoft, 'data-part': 'water' }),
        el('path', { d: 'M 0 62 Q 25 56 50 62 T 100 62 T 150 62 T 200 62', fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round' }),
      ];
      let eggs;
      if (o.spawnForm === 'string') {
        eggs = [];
        for (let k = 0; k <= 13; k++) eggs.push([22 + 12.3 * k, 120 + 24 * Math.sin(0.5 * k), 8.5, 2.8]);
      } else if (o.spawnForm === 'clump') {
        eggs = [];
        const rows = [[80, [89, 111]], [99, [67, 89, 111, 133]], [118, [56, 78, 100, 122, 144]], [137, [67, 89, 111, 133]], [156, [89, 111]]];
        for (const [y, xs] of rows) for (const x of xs) eggs.push([x, y, 11, 3.2]);
      } else throw new Error(`life-stage: spawnForm "${o.spawnForm}" (clump | string)`);
      for (const [x, y, r, d] of eggs) {
        out.push(el('circle', { cx: r2(x), cy: r2(y), r, fill: T.white, stroke: T.teal, 'stroke-width': r2(S.D), 'data-part': 'egg' }));
        out.push(el('circle', { cx: r2(x), cy: r2(y), r: d, fill: T.ink, 'data-part': 'dot' }));
      }
      return { body: out.join('') };
    },
    tadpole(S) { return { body: WATER() + TADPOLE(S, false) }; },
    legged(S) { return { body: WATER() + TADPOLE(S, true) }; },
    froglet(S) { return { body: WATER() + PAD(64, 92, 112, S) + FROG(0.62, 110, 100, true, S) }; },
    adult(S) { return { body: WATER() + PAD(74, 100, 112, S) + FROG(0.92, 100, 108, false, S) }; },
  },
  ladybird: {
    egg(S) {
      const out = [];
      for (const [y, xs] of [[92, [92, 99, 106, 113]], [98, [88.5, 95.5, 102.5, 109.5, 116.5]], [104, [92, 99, 106, 113]]]) {
        for (const x of xs) out.push(el('ellipse', { cx: x, cy: y, rx: 3.2, ry: 4.6, fill: T.coral, stroke: T.teal, 'stroke-width': r2(0.8 * S.D), 'data-part': 'egg' }));
      }
      return { body: LEAF(4, S) + out.join('') };
    },
    larva(S) {
      const seg = [];
      for (let i = 0; i <= 8; i++) seg.push({ x: 44 + 13 * i, y: 100, ry: 5 + 9 * i / 8 });
      const legs = [], dots = [], body = [];
      for (const i of [6, 7, 8]) {
        const { x, y, ry } = seg[i];
        for (const m of [-1, 1]) legs.push(el('polyline', { points: pts([[x, y + m * 0.8 * ry], [x + 6, y + m * (ry + 9)], [x + 12, y + m * (ry + 11)]]), fill: 'none', stroke: T.ink, 'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'data-part': 'leg' }));
      }
      seg.forEach(({ x, y, ry }) => body.push(el('ellipse', { cx: r2(x), cy: y, rx: 8, ry: r2(ry), fill: T.ink, 'data-part': 'segment' })));
      for (let i = 2; i <= 7; i++) { const { x, y, ry } = seg[i]; for (const m of [-1, 1]) dots.push(el('circle', { cx: r2(x), cy: r2(y + m * ry / 2), r: 2.3, fill: T.coral, 'data-part': 'dot' })); }
      body.push(el('circle', { cx: 160, cy: 100, r: 8, fill: T.ink, 'data-part': 'head' }));
      body.push(el('path', { d: 'M 165 95 L 173 88 M 165 105 L 173 112', fill: 'none', stroke: T.ink, 'stroke-width': 2.2, 'stroke-linecap': 'round', 'data-part': 'feeler' }));
      return { body: LEAF(4, S) + legs.join('') + body.join('') + dots.join('') };
    },
    pupa(S) {
      return {
        body: LEAF(4, S) +
          el('path', { d: 'M 96 128 l 4 6 l 4 -6 l 4 6 l 4 -6', fill: 'none', stroke: T.ink, 'stroke-width': 2.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'data-part': 'skin' }) +
          el('ellipse', { cx: 104, cy: 100, rx: 24, ry: 28, fill: T.coralSoft, stroke: T.teal, 'stroke-width': r2(S.O), 'data-part': 'pupa' }) +
          el('path', { d: 'M 82 90 Q 104 84 126 90 M 81 104 Q 104 98 127 104 M 84 117 Q 104 112 124 117', fill: 'none', stroke: T.teal, 'stroke-width': r2(S.D), 'stroke-linecap': 'round', 'data-part': 'arc' }) +
          [[94, 82], [114, 82], [92, 97], [116, 97], [104, 110]].map(([x, y]) => el('circle', { cx: x, cy: y, r: 3.6, fill: T.ink, 'data-part': 'spot' })).join(''),
      };
    },
    adult(S) {
      const out = [];
      for (const m of [1, -1]) {
        const X = (x) => (m === 1 ? x : 200 - x);
        for (const [a, b] of [[[138, 86], [158, 76]], [[143, 108], [164, 108]], [[138, 132], [156, 144]]]) {
          out.push(el('line', { x1: X(a[0]), y1: a[1], x2: X(b[0]), y2: b[1], stroke: T.ink, 'stroke-width': 4, 'stroke-linecap': 'round', 'data-part': 'leg' }));
        }
        out.push(el('line', { x1: X(105), y1: 48, x2: X(114), y2: 36, stroke: T.ink, 'stroke-width': 3, 'stroke-linecap': 'round', 'data-part': 'antenna' }));
      }
      out.push(el('ellipse', { cx: 100, cy: 52, rx: 12, ry: 9, fill: T.ink, 'data-part': 'head' }));
      out.push(el('circle', { cx: 100, cy: 108, r: 44, fill: T.coral, stroke: T.teal, 'stroke-width': r2(S.O), 'data-part': 'elytra' }));
      out.push(el('path', { d: 'M 70 72 Q 100 50 130 72 Z', fill: T.ink, 'data-part': 'pronotum' }));
      out.push(el('ellipse', { cx: 86, cy: 66, rx: 5, ry: 3.5, fill: T.white, 'data-part': 'patch' }));
      out.push(el('ellipse', { cx: 114, cy: 66, rx: 5, ry: 3.5, fill: T.white, 'data-part': 'patch' }));
      out.push(el('line', { x1: 100, y1: 72, x2: 100, y2: 151, stroke: T.teal, 'stroke-width': r2(0.8 * S.O), 'data-part': 'suture' }));
      const spots = [[100, 80, 7], [124, 94, 7], [130, 122, 7.5], [113, 139, 6], [76, 94, 7], [70, 122, 7.5], [87, 139, 6]];
      for (const [x, y, r] of spots) out.push(el('circle', { cx: x, cy: y, r, fill: T.ink, 'data-part': 'spot' }));
      return { body: out.join('') };
    },
  },
};

/** Count every data-part in the emitted markup (the meta is read back, never declared). */
function countParts(svg) {
  const parts = {};
  for (const m of svg.matchAll(/data-part="([a-z]+)"/g)) parts[m[1]] = (parts[m[1]] || 0) + 1;
  return parts;
}

function lifeStage({ animal, stage, size, lens = true, spawnForm = 'clump', id } = {}) {
  if (!STAGE_IDS[animal]) throw new Error(`life-stage: unknown animal "${animal}"`);
  if (!STAGE_IDS[animal].includes(stage)) throw new Error(`life-stage: ${animal} has no stage "${stage}"`);
  if (!(typeof size === 'number' && size >= MIN_SIZE)) throw new Error(`life-stage: size ${size} < MIN_SIZE ${MIN_SIZE} (nobody has looked at a smaller one)`);
  if (spawnForm !== 'clump' && !(spawnForm === 'string' && animal === 'frog' && stage === 'spawn')) {
    if (spawnForm !== 'string') throw new Error(`life-stage: spawnForm "${spawnForm}" (clump | string)`);
  }
  const S = strokes(size);
  const drawn = DRAW[animal][stage](S, { spawnForm });
  const cid = String(id || `ls-${animal}-${stage}-${size}${animal === 'frog' && stage === 'spawn' && spawnForm !== 'clump' ? '-' + spawnForm : ''}`).replace(/[^a-zA-Z0-9_-]/g, '-');
  const inner = [];
  inner.push(el('defs', {}, el('clipPath', { id: `${cid}-clip` }, el('circle', { cx: 100, cy: 100, r: 96 }))));
  if (lens) inner.push(el('circle', { cx: 100, cy: 100, r: 97, fill: T.white, 'data-lcs-lens-disc': '1' }));
  inner.push(el('g', { 'clip-path': `url(#${cid}-clip)`, 'data-lcs-stage-art': '1' }, drawn.body));
  if (lens) {
    inner.push(el('circle', { cx: 100, cy: 100, r: r2(97 - 6 * S.u), fill: 'none', stroke: T.grid, 'stroke-width': r2(1.2 * S.u), 'data-lcs-rim': '1' }));
    inner.push(el('circle', { cx: 100, cy: 100, r: 97, fill: 'none', stroke: T.teal, 'stroke-width': r2(3 * S.u), 'data-lcs-ring': '1' }));
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 200 200" overflow="visible" role="img" aria-label=""` +
    ` data-lcs-prim="life-stage" data-lcs-figure="life-${esc(animal)}-${esc(stage)}" data-lcs-animal="${esc(animal)}" data-lcs-stage="${esc(stage)}" data-lcs-size="${size}"` +
    (animal === 'frog' && stage === 'spawn' ? ` data-lcs-spawn-form="${esc(spawnForm)}"` : '') +
    ` style="display:block">${inner.join('')}</svg>`;
  return { svg, width: size, height: size, meta: { animal, stage, parts: countParts(svg), magnified: !!drawn.magnified, outlinePx: S.outlinePx, detailPx: S.detailPx } };
}

module.exports = { lifeStage, STAGE_IDS, MIN_SIZE, SCENERY, strokes, countParts };
