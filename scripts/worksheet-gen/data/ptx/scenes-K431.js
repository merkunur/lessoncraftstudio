/**
 * data/ptx/scenes-K431.js — K-431 "Summer at the sea" Level Set copies (ptl): a POSTCARD (frame + stamp with its own little
 * picture), a summer seaside, long lines that run edge to edge left to right (the horizon, the waves, the beach line), no
 * text. Concepts: _work/ptl-scenes-B.json (Designer B; vehicles bw/boat_2 left the cast: its row of round portholes reads
 * as "oooo"). Levels (ptl-levels.md §K-431): L1 K-1 — horizon + ONE wave (amplitude ≥ 14, wavelength ≥ 90), 3 pictures
 * 180-260 px · L2 K — horizon + 2-3 waves (amp 9, wl 60), 5 pictures 120-220 · L3 K-3 — horizon + 3 waves (amp 6, wl 40,
 * rows ≥ 28 apart), 6-7 pictures 95-170. Sea pictures float on a wave; beach pictures stand in measured rows (lay.js).
 */
'use strict';
const { row } = require('./lay.js');
const { helpers: { stampDots } } = require('../b9/face-scenes.js');
const BAND = { 1: { band: 'K-1', style: 'P1' }, 2: { band: 'K', style: 'P2' }, 3: { band: 'K-3', style: 'P3' } };
const FRAME = [{ m: 'roundRect', a: [14, 8, 647, 700, 18], w: 2.5 }, { m: 'roundRect', a: [22, 16, 631, 684, 12], w: 1.2, clip: false }, ...stampDots(548, 26, 92, 28), { m: 'roundRect', a: [554, 32, 80, 80, 4], w: 1.5, clip: false }];
const stamp = (src, h = 56) => ({ src, x: 594, y: 72 + h / 2, h, render: 'model', hides: false });
/** the long lines of a level: the horizon, the waves, the beach line (y values) */
const SEA = {
  1: { horizon: 230, waves: [[330, 100, 16]], beach: 452 },
  2: { horizon: 222, waves: [[300, 60, 9], [380, 60, 9]], beach: 452 },
  3: { horizon: 214, waves: [[280, 40, 6], [330, 40, 6], [380, 40, 6]], beach: 452 },
};
function postcard(level, { sun = [110, 100, 44], seaItems = [], beach = [], beachY = 690, extra = [], items = [], stampSrc, sea: S = SEA[level] }) {
  const motifs = [{ m: 'sun', a: [...sun, 10] }, { m: 'line', a: [[[30, S.horizon], [645, S.horizon]]] }, ...S.waves.map(([y, wl, a]) => ({ m: 'waves', a: [30, 645, y, wl, a] })), { m: 'ground', a: [30, 645, S.beach, 8, 3] }, ...extra];
  return { ...BAND[level], decor: FRAME, motifs, items: [stamp(stampSrc), ...seaItems.map((it) => ({ halo: 8, ...it })), ...(beach.length ? row(beachY, beach, 44, 631, level === 3 ? 14 : 18) : []), ...items] };
}
const copy = (id, level, name, spec) => ({ id: 'ptx-K-431-' + id, face: 'K-431', level, name: { en: name }, skin: () => postcard(level, spec) });
const SCENES = [
  // ── L1 — the horizon, one big wave, three big pictures ──────────────────────────────────────────────────────────────
  copy('lighthouse-bay', 1, 'Lighthouse Bay', { stampSrc: 'beach bw 2/seashell', seaItems: [{ src: 'travel and holiday bw/yacht', x: 420, y: 322, w: 250 }], beach: [{ src: 'beach bw/lighthouse', h: 225 }, { src: 'sea life bw/starfish', w: 200 }] }),
  copy('ice-cream', 1, 'Ice Cream Day', { stampSrc: 'beach bw/sun', seaItems: [], beach: [{ src: 'food bw/ice_cream', h: 225 }, { src: 'beach bw/watermelon', w: 215 }, { src: 'beach bw/sunglasses', w: 200 }] }),
  copy('whale', 1, 'The Whale Says Hello', { stampSrc: 'sea life bw/fish', seaItems: [{ src: 'sea life bw 2/whale', x: 230, y: 330, w: 250 }], beach: [{ src: 'beach bw/preserver_ring', h: 200 }, { src: 'beach bw 2/umbrella', h: 225 }] }),
  copy('surf', 1, 'Surf Morning', { stampSrc: 'sea life bw/starfish', beach: [{ src: 'beach bw/surfboard', h: 235 }, { src: 'beach bw/snorkeling_mask', h: 200 }, { src: 'beach bw/flipper', h: 215 }] }),
  copy('pier', 1, 'The Dolphin Pier', { stampSrc: 'beach bw/anchor', seaItems: [{ src: 'sea life bw/dolphin', x: 300, y: 322, h: 210 }], beach: [{ src: 'beach bw/anchor', h: 200 }, { src: 'toys bw/bucket', h: 200 }] }),
  // ── L2 — two waves, five pictures ────────────────────────────────────────────────────────────────────────────────────
  copy('island', 2, 'Island Holiday', { stampSrc: 'beach bw/palm_tree', seaItems: [{ src: 'beach bw 2/boat_2', x: 440, y: 296, w: 200 }, { src: 'sea life bw 2/turtle', x: 180, y: 430, w: 150 }], beach: [{ src: 'beach bw/palm_tree', h: 200 }, { src: 'beach bw/lounge', w: 180 }, { src: 'beach bw 2/seashell', w: 130 }] }),
  copy('fishing-harbour', 2, 'The Fishing Harbour', { stampSrc: 'beach bw/anchor', seaItems: [{ src: 'beach bw 2/boat', x: 440, y: 298, w: 220 }, { src: 'sea life bw/fish', x: 170, y: 430, w: 140 }], beach: [{ src: 'travel and holiday bw/lighthouse', h: 215 }, { src: 'birds bw/pelican', h: 175 }, { src: 'beach bw 2/signpost', h: 160 }] }),
  copy('snorkel', 2, 'The Snorkel Cove', { stampSrc: 'sea life bw/clown_fish', sea: { horizon: 222, waves: [[290, 60, 9], [370, 60, 9]], beach: 452 }, seaItems: [{ src: 'sea life bw/clown_fish', x: 170, y: 345, w: 140 }, { src: 'sea life bw 2/jellyfish', x: 480, y: 440, h: 130 }], beach: [{ src: 'beach bw 2/snorkel', h: 170 }, { src: 'sea life bw 2/seahorse', h: 175 }, { src: 'sea life bw/octopus', w: 170 }] }),
  copy('beach-cafe', 2, 'The Beach Café', { stampSrc: 'beach bw/lemonade', seaItems: [{ src: 'beach bw 2/boat_2', x: 420, y: 296, w: 200 }, { src: 'sea life bw/fish', x: 170, y: 430, w: 130 }], beach: [{ src: 'beach bw 2/umbrella', h: 215 }, { src: 'beach bw/lemonade', h: 165 }, { src: 'beach bw/flip-flops', w: 150 }] }),
  copy('rock-pool', 2, 'The Rock Pools', { stampSrc: 'beach bw/seashell', sea: { horizon: 222, waves: [[290, 60, 9], [370, 60, 9]], beach: 452 }, seaItems: [{ src: 'sea life bw/lobster', x: 220, y: 350, w: 190 }, { src: 'sea life bw 2/shrimp', x: 490, y: 440, h: 130 }], beach: [{ src: 'sea life bw 2/hermit_crab', w: 165 }, { src: 'sea life bw 2/snail', w: 165 }, { src: 'beach bw/seashell', w: 150 }] }),
  // ── L3 — three waves, six or seven smaller pictures ─────────────────────────────────────────────────────────────────
  copy('ferry', 3, 'The Ferry Port', { stampSrc: 'beach bw/preserver_ring', seaItems: [{ src: 'travel and holiday bw/cruise', x: 440, y: 264, w: 220 }, { src: 'vehicles bw 3/boat_2', x: 160, y: 362, w: 170 }, { src: 'sea life bw/swordfish', x: 470, y: 435, w: 170 }], beach: [{ src: 'travel and holiday bw/binoculars', w: 130 }, { src: 'beach bw 2/suitcase', h: 140 }, { src: 'beach bw 2/bag', h: 130 }] }),
  copy('beach-games', 3, 'Beach Games', { stampSrc: 'sports bw/beach_ball', seaItems: [{ src: 'sports bw/beach_ball', x: 470, y: 430, h: 110 }], items: [{ src: 'sports bw/volleyball', x: 330, y: 190, h: 100, halo: 8 }], beach: [{ src: 'beach bw 2/deck_chair', h: 165 }, { src: 'beach bw 2/tote_bag', h: 140 }, { src: 'beach bw/sunscreen', h: 130 }, { src: 'beach bw 2/shorts', w: 140 }] }),
  copy('coral-reef', 3, 'The Coral Reef', { stampSrc: 'sea life bw/turtle', sun: [100, 70, 30], sea: { horizon: 130, waves: [[166, 40, 6], [200, 40, 6], [234, 40, 6]], beach: 690 },
    items: [{ src: 'sea life bw/fish_3', x: 160, y: 380, w: 150 }, { src: 'sea life bw/pufferfish', x: 360, y: 360, w: 130 }, { src: 'sea life bw 2/stingray', x: 540, y: 400, w: 150 }, { src: 'sea life bw/squid', x: 250, y: 560, h: 150 }, { src: 'animals bw 3/dolphin_2', x: 470, y: 560, w: 160 }, { src: 'sea life bw/crab', x: 160, y: 680, w: 140 }, { src: 'sea life bw/turtle', x: 560, y: 680, h: 120 }] }),
  copy('lagoon', 3, 'The Lagoon', { stampSrc: 'birds bw 2/flamingo', seaItems: [{ src: 'beach bw 2/island', x: 470, y: 440, h: 96 }, { src: 'vehicles bw 3/boat', x: 170, y: 318, h: 96, halo: 6 }], beach: [{ src: 'birds bw 2/toucan', h: 150 }, { src: 'beach bw 2/cocktail', h: 140 }, { src: 'beach bw 2/bag', h: 130 }, { src: 'birds bw 2/flamingo', h: 160 }] }),
  copy('dunes', 3, 'Camping by the Sea', { stampSrc: 'nature bw/campfire', extra: [{ m: 'ground', a: [30, 645, 560, 10, 2] }], items: [{ src: 'toys bw 2/kite', x: 330, y: 200, h: 150, halo: 8 }],
    beach: [{ src: 'travel and holiday bw/camper', w: 165 }, { src: 'nature bw/campfire', w: 95 }, { src: 'sports bw/bicycle', w: 140 }], beachY: 550, extraRow: true }),
];
// the dunes' front row (a second beach row below the back dune)
const dunes = SCENES[SCENES.length - 1], base = dunes.skin;
dunes.skin = () => { const s = base(); s.items.push(...row(692, [{ src: 'travel and holiday bw/sunglasses', w: 125 }, { src: 'apparel bw/cap', w: 110 }, { src: 'sports bw 2/water_bottle', h: 110 }], 44, 631, 14)); return s; };
module.exports = { SCENES };
