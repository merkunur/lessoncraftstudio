/**
 * data/ptx/scenes-K419.js — K-419 "My First Tracing" Level Set copies (ptl): ONE big picture in the porthole, a different view
 * through it each time (lake, ice, sea floor, aquarium, sky, reef, space, deep sea, cave, seagrass, night sea, hills).
 * Levels were ASSIGNED BY MEASUREMENT (traced length on the render): the five shortest outlines are L1, the next five L2.
 * Concepts: docs/worksheet-gen/b9-designs/_work/ptl-scenes-A.json (Designer A); levels: _work/ptl-levels.md §K-419 —
 * L1 band PreK-1, outline only (≤ 3 traced lines) · L2 PreK (the published band), outline only · L3 PreK-3, the outline plus
 * the picture's longest inner lines. The porthole (two rings + 8 hollow rivets) is the face's structure and stays.
 */
'use strict';
const { sceneFor, helpers: H } = require('../b9/face-scenes.js');
const C = { cx: 338, cy: 360, r: 308 };
const G = H.GREY;
const porthole = () => sceneFor('first-tracing').decor.slice(0, 10);   // 2 rings + 8 hollow rivets
const wave = (y, amp = 8, wl = 70) => ({ d: H.ringWave(C.cx, C.cy, C.r, y, amp, wl), w: 2.5, colour: G });
const flat = (y) => ({ d: H.ringWave(C.cx, C.cy, C.r, y, 0, 70), w: 2.5, colour: G });
const bub = (x, y, r) => ({ m: 'bubble', a: [x, y, r], colour: G, w: 2 });
const bubbles = (x, y) => [bub(x, y, 14), bub(x + 30, y - 40, 9), bub(x + 58, y + 6, 11)];
const blade = (x, y, h, lean = 1) => ({ d: `M${x} ${y} Q${x + 14 * lean} ${y - h * 0.55} ${x + 4 * lean} ${y - h}`, w: 2.5, colour: G });
const star = (x, y, r) => ({ m: 'star', a: [x, y, r], colour: G, w: 2 });
const pebble = (x, y, rx) => ({ d: `M${x - rx} ${y} Q${x - rx} ${y - rx * 0.8} ${x} ${y - rx * 0.8} Q${x + rx} ${y - rx * 0.8} ${x + rx} ${y} Z`, w: 2, colour: G });
const BAND = { 1: { band: 'PreK-1', style: 'P1' }, 2: { band: 'PreK', style: 'P1' }, 3: { band: 'PreK-3', style: 'P2' } };
/** a copy: the hero centred in the porthole at its size, outline only below level 3 */
const copy = (id, level, name, src, size, extras) => ({
  id: 'ptx-K-419-' + id, face: 'K-419', level, name: { en: name },
  skin: () => ({ ...BAND[level], decor: [...porthole(), ...extras], items: [{ src, x: C.cx, y: C.cy + 8, ...size, anchor: 'centre', start: 'top', outline: level < 3 }] }),
});
const SCENES = [
  copy('swan-lake', 2, 'The Swan', 'animals bw/swan', { fit: 480 }, [wave(560, 5, 90), wave(592, 5, 90), blade(78, 560, 120), blade(100, 572, 150, -1), blade(122, 560, 110)]),
  copy('seal-ice', 2, 'The Seal', 'sea life bw 2/seal', { fit: 500 }, [flat(548), wave(590, 6, 80), wave(620, 6, 80)]),
  copy('stingray-sand', 1, 'The Stingray', 'sea life bw/stingray', { fit: 520 }, [wave(610, 4, 60), ...bubbles(540, 170)]),
  copy('goldfish', 2, 'The Goldfish', 'nature bw/fish', { fit: 480 }, [pebble(160, 610, 26), pebble(220, 618, 20), pebble(420, 616, 24), pebble(486, 610, 20), blade(560, 600, 160, -1), blade(585, 600, 130), ...bubbles(130, 180)]),
  copy('cloud-window', 1, 'The Cloud', 'home and nature bw/cloud', { fit: 520 }, [{ m: 'sun', a: [520, 150, 26, 8], colour: G, w: 2 }, flat(600)]),
  copy('dolphin-leap', 2, 'The Dolphin', 'sea life bw/dolphin', { h: 440 }, [wave(586, 8, 70), wave(616, 8, 70), { m: 'sun', a: [140, 230, 24, 8], colour: G, w: 2 }]),
  copy('reef-shark', 2, 'The Little Shark', 'animals bw 5/shark', { w: 470 }, [flat(612), blade(110, 610, 150), blade(560, 610, 140, -1), ...bubbles(500, 160)]),
  copy('turtle-swim', 1, 'The Turtle', 'sea life bw 2/turtle', { fit: 500 }, [flat(614), blade(120, 612, 130), blade(570, 612, 120, -1), ...bubbles(150, 160)]),
  copy('space-rocket', 1, 'The Rocket', 'space bw/rocket', { fit: 500 }, [star(140, 200, 12), star(540, 170, 10), star(560, 470, 12), star(120, 470, 9), star(210, 600, 10), star(480, 600, 9), { m: 'moon', a: [150, 330, 22], colour: G, w: 2 }]),
  copy('submarine', 1, 'The Submarine', 'vehicles bw 2/submarine', { fit: 530 }, [flat(612), ...bubbles(110, 300)]),
  copy('octopus-cave', 3, 'The Octopus', 'sea life bw/octopus', { fit: 470, blobMin: 500 }, [{ d: H.ringWave(C.cx, C.cy, C.r, 120, 14, 110), w: 2.5, colour: G }, ...bubbles(510, 200)]),
  copy('seahorse-meadow', 3, 'The Seahorse', 'sea life bw 2/seahorse', { h: 470, blobMin: 600 }, [blade(150, 620, 200), blade(176, 622, 150, -1), blade(510, 622, 180, -1), blade(534, 620, 140)]),
  copy('narwhal-ice', 3, 'The Narwhal', 'sea life bw/narwhal', { w: 480 }, [{ d: H.ringWave(C.cx, C.cy, C.r, 110, 10, 90), w: 2.5, colour: G }, ...bubbles(140, 560)]),
  copy('balloon-hills', 3, 'The Hot-Air Balloon', 'vehicles bw 2/hot_air_balloon', { h: 470, blobMin: 400 }, [{ m: 'hill', a: [40, 400, 640, 70], colour: G, w: 2.5 }, { m: 'hill', a: [300, 640, 640, 50], colour: G, w: 2.5 }, { m: 'cloud', a: [130, 200, 90], colour: G, w: 2 }]),
  copy('jellyfish-night', 3, 'The Jellyfish', 'sea life bw 2/jellyfish', { h: 460 }, [{ d: H.ringWave(C.cx, C.cy, C.r, 110, 8, 80), w: 2.5, colour: G }, ...bubbles(500, 520)]),
];
module.exports = { SCENES };
