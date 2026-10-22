/**
 * data/ptx/scenes-G1429.js — G1-429 "Dotted picture tracing" Level Set copies (ptl): a dense built place (a street, a
 * market, a harbour, a station …) traced in DOTS only, ONE pitch per page, no two dotted lines closer than twice the pitch
 * (they fuse into a cloud — METHOD §11). So the buildings are DRAWN as one line each, every line ≥ 18 px from the next,
 * and the library pictures are the least dense ones (index density ≤ ~5, the published page's own lesson: its museum,
 * hotel, bus and dog were all simplified for the dots). Concepts: _work/ptl-scenes-B.json (Designer B; its fire truck,
 * cement mixer, crane, double-decker and train measured 9-13 density and were replaced).
 * Levels (ptl-levels.md §G1-429): L1 G1-1 — 4-5 pictures 130-300 px + 1-2 ground lines, dots 8 px apart · L2 G1 — 6-8
 * pictures 85-300, dots 7 px · L3 G1-3 — 9-11 pictures 70-280, small details, dots 6 px.
 */
'use strict';
const BAND = { 1: { band: 'G1-1' }, 2: { band: 'G1' }, 3: { band: 'G1-3' } };
const DOTS = { 1: { w: 2.8, dash: 0.01, gap: 8, colour: '#4f4f4f', dot: true }, 2: { w: 2.6, dash: 0.01, gap: 7, colour: '#4f4f4f', dot: true }, 3: { w: 2.4, dash: 0.01, gap: 6, colour: '#4f4f4f', dot: true } };
const L = (pts, closed = false) => ({ m: 'line', a: [pts, closed] });
const R = (x, y, w, h) => L([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], true);
const ground = (y) => ({ m: 'ground', a: [4, 671, y, 0, 1] });
const sun = (x, y, r) => ({ m: 'sun', a: [x, y, r, 8] });
const cloud = (x, y, w) => ({ m: 'cloud', a: [x, y, w] });
/** dot-safe drawn pieces: one line per part, parts ≥ 18 px apart */
const P = {
  /** a shop: walls, a flat roof ledge, a big window, a door, an awning of `n` scallops over the window */
  shop: (x, by, w, h, n = 4) => {
    const top = by - h, wx = x + 18, ww = w * 0.58, wy = by - h * 0.62, sc = [];
    for (let i = 0; i < n; i++) { const a = wx + ww * i / n, b = wx + ww * (i + 1) / n; for (let k = 0; k <= 8; k++) { const t = k / 8; sc.push([a + (b - a) * t, wy - 26 + Math.sin(t * Math.PI) * 14]); } }
    return [L([[x, by], [x, top], [x + w, top], [x + w, by]]), R(x - 10, top - 18, w + 20, 18), R(wx, wy, ww, h * 0.42), L([[x + w - 64, by], [x + w - 64, by - h * 0.52], [x + w - 22, by - h * 0.52], [x + w - 22, by]]), L([[wx, wy - 26], [wx + ww, wy - 26]]), L(sc)];
  },
  /** a gable house: walls, a roof, a door, two windows */
  house: (x, by, w, h) => [L([[x, by], [x, by - h * 0.6], [x + w / 2, by - h], [x + w, by - h * 0.6], [x + w, by]]), L([[x + w / 2 - 22, by], [x + w / 2 - 22, by - h * 0.32], [x + w / 2 + 22, by - h * 0.32], [x + w / 2 + 22, by]]), R(x + 20, by - h * 0.5, 40, 36), R(x + w - 60, by - h * 0.5, 40, 36)],
  /** a station / hall front: walls, a pediment, `n` arched doors */
  hall: (x, by, w, h, n = 3) => {
    const out = [L([[x, by], [x, by - h * 0.72], [x + w, by - h * 0.72], [x + w, by]]), L([[x - 10, by - h * 0.72], [x + w / 2, by - h], [x + w + 10, by - h * 0.72], [x - 10, by - h * 0.72]], true)];
    for (let i = 0; i < n; i++) { const cx = x + w * (i + 0.5) / n, dw = Math.min(44, w / n - 36); const arc = []; for (let k = 0; k <= 12; k++) { const a = Math.PI + k / 12 * Math.PI; arc.push([cx + dw / 2 * Math.cos(a), by - h * 0.42 + dw / 2 * Math.sin(a)]); } out.push(L([[cx - dw / 2, by], [cx - dw / 2, by - h * 0.42], ...arc.slice(1), [cx + dw / 2, by]])); }
    return out;
  },
  /** a lamp post */
  lamp: (x, by, h) => [L([[x, by], [x, by - h]]), L([[x - 16, by - h], [x + 16, by - h], [x + 10, by - h - 26], [x - 10, by - h - 26], [x - 16, by - h]], true)],
  /** a traffic light (three circles, none lit) */
  lights: (x, by, h) => [L([[x, by], [x, by - h + 92]]), R(x - 20, by - h, 40, 92), { m: 'circle', a: [x, by - h + 20, 10] }, { m: 'circle', a: [x, by - h + 46, 10] }, { m: 'circle', a: [x, by - h + 72, 10] }],
  /** a zebra crossing: four bars on the road */
  crossing: (x, y, n = 4, bw = 26, gap = 24) => Array.from({ length: n }, (_, i) => R(x + i * (bw + gap), y, bw, 46)),
  /** a park gate: two posts and an arch */
  gate: (cx, by, w, h) => { const arc = []; for (let k = 0; k <= 20; k++) { const a = Math.PI + k / 20 * Math.PI; arc.push([cx + w / 2 * Math.cos(a), by - h + w / 2 * 0.6 + (w / 2) * 0.6 * Math.sin(a)]); } return [L([[cx - w / 2, by], [cx - w / 2, by - h + w * 0.3]]), L([[cx + w / 2, by], [cx + w / 2, by - h + w * 0.3]]), L(arc)]; },
  /** a canopy roof on two posts */
  canopy: (x0, x1, y, by) => [L([[x0 - 20, y], [x1 + 20, y], [x1, y - 40], [x0, y - 40], [x0 - 20, y]], true), L([[x0 + 20, y], [x0 + 20, by]]), L([[x1 - 20, y], [x1 - 20, by]])],
  /** a market stall: table, posts, a striped awning (stripes ≥ 24 px apart) */
  stall: (x, by, w, h) => { const out = [R(x, by - h * 0.45, w, 16), L([[x + 12, by - h * 0.45 + 16], [x + 12, by]]), L([[x + w - 12, by - h * 0.45 + 16], [x + w - 12, by]]), L([[x + 12, by - h * 0.45], [x + 12, by - h * 0.8]]), L([[x + w - 12, by - h * 0.45], [x + w - 12, by - h * 0.8]]), L([[x - 12, by - h * 0.8], [x + w + 12, by - h * 0.8], [x + w - 6, by - h], [x + 6, by - h], [x - 12, by - h * 0.8]], true)]; for (let i = 1; i < 4; i++) { const t = i / 4; out.push(L([[x + 6 + (w - 12) * t, by - h], [x - 12 + (w + 24) * t, by - h * 0.8]])); } return out; },
  /** a harbour wall with two bollards */
  wall: (x0, x1, y) => [L([[x0, y], [x1, y]]), L([[x0, y + 40], [x1, y + 40]]), L([[x0 + 60, y], [x0 + 60, y - 30], [x0 + 84, y - 30], [x0 + 84, y]]), L([[x1 - 84, y], [x1 - 84, y - 30], [x1 - 60, y - 30], [x1 - 60, y]])],
  /** a control tower */
  tower: (x, by, h) => [L([[x - 20, by], [x - 20, by - h * 0.7], [x + 20, by - h * 0.7], [x + 20, by]]), L([[x - 46, by - h * 0.7], [x + 46, by - h * 0.7], [x + 36, by - h], [x - 36, by - h], [x - 46, by - h * 0.7]], true)],
  /** a brick wall of big bricks (rows ≥ 20 px) */
  bricks: (x, by, cols, rows, bw = 60, bh = 34) => { const out = []; for (let r = 0; r < rows; r++) { const off = r % 2 ? bw / 2 : 0; for (let c = 0; c < cols - (r % 2 ? 1 : 0); c++) out.push(R(x + off + c * bw + 4, by - (r + 1) * bh + 4, bw - 8, bh - 8)); } return out; },
  /** a garage with a roller door */
  garage: (x, by, w, h) => { const out = [L([[x, by], [x, by - h], [x + w, by - h], [x + w, by]]), R(x + 30, by - h * 0.72, w - 60, h * 0.72)]; for (let k = 1; k < 4; k++) out.push(L([[x + 30, by - h * 0.72 + k * h * 0.18], [x + w - 30, by - h * 0.72 + k * h * 0.18]])); return out; },
  /** a ticket booth */
  booth: (x, by, w, h) => [L([[x, by], [x, by - h], [x + w, by - h], [x + w, by]]), L([[x - 12, by - h], [x + w / 2, by - h - 40], [x + w + 12, by - h], [x - 12, by - h]], true), R(x + 18, by - h * 0.72, w - 36, h * 0.34)],
  /** a bench */
  bench: (x, by, w) => [R(x, by - 52, w, 14), L([[x + 16, by - 38], [x + 16, by]]), L([[x + w - 16, by - 38], [x + w - 16, by]])],
};
const copy = (id, level, name, build) => ({ id: 'ptx-G1-429-' + id, face: 'G1-429', level, name: { en: name }, skin: () => ({ ...BAND[level], style: DOTS[level], occlusion: true, decor: [], ...build() }) });
const SCENES = [
  // ── L1 — four or five big pictures, dots 8 px apart ──────────────────────────────────────────────────────────────────
  copy('bakery', 1, 'The Village Bakery', () => ({
    motifs: [sun(580, 80, 36), ...P.shop(40, 470, 330, 300, 4), ground(470), ground(690)],
    items: [{ src: 'food bw/bread', x: 520, y: 470, w: 200 }, { src: 'food bw 2/croissant', x: 200, y: 690, w: 230 }, { src: 'animals bw 4/cat_3', x: 500, y: 690, h: 150 }],
  })),
  copy('crossing', 1, 'The Rainy Crossing', () => ({
    motifs: [...P.lights(560, 470, 320), ground(470), ...P.crossing(150, 580, 4), ground(690)],
    items: [{ src: 'nature bw/umbrella', x: 320, y: 470, h: 230 }, { src: 'tools bw/traffic_cone', x: 100, y: 470, h: 150 }, { src: 'nature bw/rain', x: 170, y: 200, h: 170 }, { src: 'tools bw/rubber_boot', x: 560, y: 690, h: 140 }],
  })),
  copy('harbour-wall', 1, 'The Harbour Wall', () => ({
    motifs: [sun(110, 80, 34), ...P.wall(240, 671, 470), { m: 'waves', a: [4, 671, 600, 80, 10] }],
    items: [{ src: 'beach bw/lighthouse', x: 120, y: 690, h: 300 }, { src: 'beach bw/sailboat', x: 470, y: 590, h: 190 }, { src: 'beach bw/anchor', x: 520, y: 438, h: 150 }],
  })),
  copy('park-gate', 1, 'At the Park Gate', () => ({
    motifs: [...P.gate(338, 690, 260, 320), ground(690), cloud(560, 110, 150)],
    items: [{ src: 'nature bw/tree', x: 140, y: 690, h: 270 }, { src: 'toys bw 2/kite', x: 338, y: 300, h: 220 }, { src: 'home bw 2/flower', x: 580, y: 690, h: 200 }],
  })),
  copy('platform', 1, 'On the Platform', () => ({
    motifs: [sun(338, 64, 30), ...P.canopy(60, 615, 200, 470), ground(470), ground(690)],
    items: [{ src: 'travel and holiday bw/signpost', x: 330, y: 470, h: 200 }, { src: 'beach bw/suitcase', x: 180, y: 690, h: 150 }, { src: 'travel and holiday bw/ticket', x: 470, y: 690, w: 240 }],
  })),
  // ── L2 — six to eight pictures, dots 7 px apart ──────────────────────────────────────────────────────────────────────
  copy('market', 2, 'Market Morning', () => ({
    motifs: [sun(590, 70, 30), ...P.stall(40, 420, 270, 330), ...P.stall(360, 420, 270, 330), ground(420), ground(690)],
    items: [{ src: 'vegetables bw/pumpkin', x: 110, y: 270, h: 90 }, { src: 'fruits bw/pear', x: 230, y: 270, h: 100 }, { src: 'fruits bw/apple', x: 430, y: 270, h: 95 }, { src: 'fruits bw/banana', x: 560, y: 270, w: 110 }, { src: 'birds bw 2/bird', x: 200, y: 690, h: 120 }, { src: 'farm bw/watering_can', x: 470, y: 690, w: 170 }],
  })),
  copy('fire-station', 2, 'The Fire Station', () => ({
    motifs: [...P.hall(30, 470, 400, 380, 2), ground(470), ground(690), cloud(560, 100, 140)],
    items: [{ src: 'tools bw/ladder', x: 540, y: 470, h: 250 }, { src: 'tools bw/traffic_cone', x: 120, y: 690, h: 120 }, { src: 'animals bw 4/cat_3', x: 300, y: 690, h: 120 }, { src: 'vehicles bw 3/baby_carriage', x: 520, y: 690, w: 180 }],
  })),
  copy('airport', 2, 'At the Airport', () => ({
    motifs: [...P.tower(110, 470, 330), ground(470), ground(690), cloud(380, 90, 160)],
    items: [{ src: 'vehicles bw 2/airplane_2', x: 450, y: 420, w: 280 }, { src: 'beach bw/suitcase', x: 210, y: 470, h: 110 }, { src: 'toys bw/rocket', x: 120, y: 690, h: 160 }, { src: 'travel and holiday bw/ticket', x: 330, y: 690, w: 170 }, { src: 'beach bw 2/tote_bag', x: 540, y: 690, h: 150 }],
  })),
  copy('building-site', 2, 'The Building Site', () => ({
    motifs: [sun(590, 70, 30), ...P.bricks(40, 470, 5, 4, 66, 40), ground(470), ground(690)],
    items: [{ src: 'tools bw/shovel', x: 440, y: 470, h: 260 }, { src: 'tools bw/traffic_cone', x: 560, y: 470, h: 130 }, { src: 'tools bw/hammer', x: 130, y: 690, w: 150 }, { src: 'tools bw/pickaxe', x: 330, y: 690, w: 170 }, { src: 'toys bw/bucket', x: 540, y: 690, h: 130 }],
  })),
  copy('promenade', 2, 'The Promenade', () => ({
    motifs: [...P.lamp(80, 470, 300), ...P.lamp(600, 470, 300), ground(470), { m: 'waves', a: [4, 671, 560, 70, 9] }, ground(690)],
    items: [{ src: 'beach bw/parasol', x: 250, y: 470, h: 230 }, { src: 'beach bw/bucket', x: 440, y: 470, h: 130 }, { src: 'beach bw/sailboat', x: 330, y: 552, h: 120 }, { src: 'beach bw/sun', x: 338, y: 140, h: 120 }, { src: 'beach bw/umbrella', x: 150, y: 690, h: 110 }, { src: 'beach bw 2/sunglasses', x: 500, y: 690, w: 180 }],
  })),
  // ── L3 — nine to eleven pictures, small details, dots 6 px apart ────────────────────────────────────────────────────
  copy('station-hall', 3, 'The Station Hall', () => ({
    motifs: [...P.hall(40, 440, 380, 400, 4), { m: 'circle', a: [150, 150, 14] }, { m: 'circle', a: [230, 130, 14] }, { m: 'circle', a: [310, 150, 14] }, ...P.lamp(640, 440, 240), ...P.lamp(640, 690, 200), ground(440), ...P.bench(380, 690, 170), ground(690), cloud(592, 92, 76), { m: 'fence', a: [14, 661, 690, 44, 12] }],
    items: [{ src: 'home and nature bw/tree_2', x: 500, y: 440, h: 170 }, { src: 'birds bw 2/bird', x: 580, y: 440, h: 80 }, { src: 'beach bw/suitcase', x: 90, y: 690, h: 100 }, { src: 'animals bw 4/cat_3', x: 210, y: 690, h: 100 },
      { src: 'travel and holiday bw/signpost', x: 320, y: 690, h: 120 }, { src: 'travel and holiday bw/ticket', x: 465, y: 630, w: 110 }, { src: 'sports bw/scooter', x: 570, y: 690, w: 90 }, { src: 'nature bw/sun', x: 500, y: 130, h: 90 }],
  })),
  // the quay across the top, then three bands of sea, each with its own boats or animals (a whale crossing the wall line,
  // a rope through the anchor — the first composition's render read)
  copy('busy-harbour', 3, 'The Busy Harbour', () => ({
    motifs: [...P.wall(14, 661, 300), ...P.lamp(40, 300, 170), ...P.lamp(636, 300, 170), { m: 'waves', a: [4, 671, 466, 60, 8] }, { m: 'waves', a: [4, 671, 584, 60, 8] }, { m: 'waves', a: [4, 671, 698, 60, 8] }, cloud(330, 70, 120), cloud(130, 100, 90)],
    items: [{ src: 'beach bw/anchor', x: 150, y: 298, h: 110 }, { src: 'beach bw/bucket', x: 250, y: 298, h: 86 }, { src: 'beach bw/parasol', x: 380, y: 298, h: 140 }, { src: 'travel and holiday bw/signpost', x: 520, y: 298, h: 110 }, { src: 'beach bw/sun', x: 560, y: 120, h: 90 },
      { src: 'beach bw/sailboat', x: 150, y: 458, h: 104 }, { src: 'beach bw 2/boat_2', x: 470, y: 458, w: 210 },
      { src: 'animals bw 5/whale', x: 210, y: 576, w: 210 }, { src: 'sea life bw 2/dolphin', x: 500, y: 576, h: 104 },
      { src: 'nature bw/fish', x: 120, y: 690, w: 130 }, { src: 'sea life bw/starfish', x: 340, y: 690, h: 96 }, { src: 'nature bw/fish', x: 560, y: 690, w: 130 }],
  })),
  copy('zoo-gate', 3, 'At the Zoo Gate', () => ({
    motifs: [...P.gate(300, 440, 220, 330), ...P.booth(480, 440, 150, 170), ground(440), ground(690), { m: 'line', a: [[[560, 100], [580, 200]]] }, { m: 'circle', a: [552, 80, 22] }, { m: 'line', a: [[[620, 120], [600, 200]]] }, { m: 'circle', a: [626, 98, 20] }, { m: 'fence', a: [14, 661, 560, 50, 14] }, { m: 'sun', a: [440, 90, 30, 8] }],
    items: [{ src: 'zoo animals bw/flamingo', x: 82, y: 440, h: 190 }, { src: 'birds bw/penguin_2', x: 300, y: 440, h: 120 }, { src: 'animals bw/bear', x: 90, y: 690, h: 130 }, { src: 'birds bw/parrot', x: 220, y: 690, h: 110 },
      { src: 'animals bw 5/lizard', x: 360, y: 690, w: 140 }, { src: 'animals bw/swan', x: 490, y: 690, h: 100 }, { src: 'animals bw 4/chick', x: 610, y: 690, h: 90 }, { src: 'home and nature bw/cloud', x: 120, y: 110, w: 120 }, { src: 'birds bw 2/duck', x: 540, y: 380, h: 70 }],
  })),
  copy('toy-shop', 3, 'The Toy Shop Street', () => ({
    motifs: [...P.shop(30, 440, 290, 300, 3), ...P.shop(355, 440, 290, 300, 3), ground(440), ground(690), cloud(560, 70, 110)],
    items: [{ src: 'toys bw/duck', x: 150, y: 410, h: 110 }, { src: 'toys bw 2/pinwheel', x: 470, y: 400, h: 100 }, { src: 'toys bw/duck', x: 100, y: 690, h: 100 }, { src: 'toys bw/spinning_top', x: 220, y: 690, h: 90 }, { src: 'toys bw/rocket', x: 330, y: 690, h: 120 },
      { src: 'toys bw/party_hat', x: 440, y: 690, h: 90 }, { src: 'sports bw/beach_ball', x: 560, y: 690, h: 90 }, { src: 'toys bw 2/kite', x: 610, y: 210, h: 110 }, { src: 'toys bw/ufo', x: 330, y: 140, w: 140 }, { src: 'nature bw/sun', x: 100, y: 110, h: 80 }],
  })),
  copy('garage', 3, 'The Repair Garage', () => ({
    motifs: [...P.garage(40, 440, 300, 300), R(380, 110, 275, 220), ...P.lamp(345, 690, 210), cloud(150, 70, 120), cloud(420, 60, 100), cloud(300, 60, 80), { m: 'circle', a: [448, 394, 44] }, { m: 'circle', a: [448, 394, 20] }, { m: 'circle', a: [580, 394, 44] }, { m: 'circle', a: [580, 394, 20] }, ground(440), ground(690), ...P.house(462, 690, 192, 210), { m: 'fence', a: [14, 455, 690, 40, 8] }],
    items: [{ src: 'tools bw/wrench', x: 420, y: 312, h: 180 }, { src: 'tools bw/hammer', x: 500, y: 306, w: 95 }, { src: 'tools bw/paint_roller', x: 610, y: 312, h: 105 }, { src: 'tools bw/traffic_cone', x: 80, y: 690, h: 120 }, { src: 'sports bw/skateboard', x: 230, y: 690, w: 200 },
      { src: 'tools bw/pliers', x: 410, y: 690, h: 110 }, { src: 'nature bw/sun', x: 620, y: 92, h: 70 }],
  })),
];
module.exports = { SCENES };
