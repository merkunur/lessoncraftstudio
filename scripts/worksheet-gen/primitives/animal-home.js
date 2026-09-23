/**
 * animal-home.js — the G1-398 `habitats` animal HOMES, each drawn CUT-AWAY (nt5-F, b6;
 * design docs/worksheet-gen/b6-designs/G1-398-habitats.md §2 "NEW primitives/animal-home.js").
 *
 * Pure SVG on primitives/_tokens.js, the same drawing language as habitat-tile.js (teal
 * outlines, tealSoft / creamDeep / white / grid fills, ink only for holes and hollows). A home
 * is built or used by an animal, and NO animal is drawn in it (the child supplies the animal);
 * no <text>, no <image>, no coral.
 *
 *   id        viewBox 120 x 120                                            reads as
 *   nest      a twig bowl on a branch, its ink hollow, three white eggs     a bowl of twigs with eggs
 *             whose tops show above the rim (the front wall covers the rest)
 *   hive      a WILD honeybee nest: a hollow tree trunk cut open to show    a tree trunk opened to show
 *             three hanging honeycomb slabs (never a hanging teardrop comb:   honeycomb
 *             that is a wasp / hornet picture — the pedagogy ruling), ink knot-hole entrance
 *   web       an orb web between two twigs: 10 spokes, 5 rings, anchors    an orb web (the only open-line home)
 *   burrow    grass surface, a LOW wide entrance mound (top 26), ONE white  a hole leading to one underground room
 *             tunnel down to ONE chamber
 *   anthill   a TALL steep mound (top 12) with grains, white tunnels         a tall dome full of small tunnels
 *             branching to FOUR small chambers
 *   lodge     a dome of sticks half in water, a dry chamber ABOVE the       a stick house half in water with a dry room
 *             waterline, an underwater entrance tunnel
 *
 * API
 *   animalHome({ id, px = 88, attrs }) -> { svg, meta:{id} }
 *     px < 72 THROWS; an unknown id THROWS. Strokes are PAGE px converted to user units
 *     (px / scale): outlines 2 px, details 1.5 px at every size.
 *   HOME_IDS, VIEW (120), MIN_PX (72), homeBody(id, scale)
 * Root: <svg data-lcs-prim="animal-home" data-lcs-home="<id>">. Measurable stamps for the
 * gate: the mound path carries data-lcs-mound (burrow, anthill), every chamber ellipse
 * data-lcs-chamber, the hive trunk rect data-lcs-trunk.
 */
'use strict';
const tokens = require('./_tokens.js');
const { svgRoot, el } = require('./_svg.js');
const { unionOutline } = require('./map-symbol.js');

const T = tokens.color;
const VIEW = 120, MIN_PX = 72;
const HOME_IDS = ['nest', 'hive', 'web', 'burrow', 'anthill', 'lodge'];
const f2 = (v) => +(+v).toFixed(2);
let _uid = 0;

function tuft(x, y, h, sw) {
  return el('path', { d: `M${x - 3} ${y} Q${x - 4} ${y - h / 2} ${x - 6} ${y - h} M${x} ${y} L${x} ${y - h - 2} M${x + 3} ${y} Q${x + 4} ${y - h / 2} ${x + 6} ${y - h}`, fill: 'none', stroke: T.teal, 'stroke-width': sw, 'stroke-linecap': 'round' });
}
/** flat-top hexagon, side a, centred (cx, cy) */
function hex(cx, cy, a) {
  const h = a * Math.sqrt(3) / 2;
  return `M${f2(cx - a)} ${f2(cy)} L${f2(cx - a / 2)} ${f2(cy - h)} L${f2(cx + a / 2)} ${f2(cy - h)} L${f2(cx + a)} ${f2(cy)} L${f2(cx + a / 2)} ${f2(cy + h)} L${f2(cx - a / 2)} ${f2(cy + h)} Z`;
}

function homeBody(id, scale) {
  const px = (p) => f2(p / scale);
  const O = px(2), D = px(1.5);
  switch (id) {
    case 'nest': {
      const branch = el('path', { d: 'M2 92 L114 70 L118 77 L6 100 Z', fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' }) +
        el('path', { d: 'M100 74 L112 58', fill: 'none', stroke: T.teal, 'stroke-width': O, 'stroke-linecap': 'round' });
      const leaves = el('path', { d: 'M112 58 C114 46 120 44 119 38 C112 40 106 48 112 58 Z', fill: T.tealSoft, stroke: T.teal, 'stroke-width': D }) +
        el('path', { d: 'M12 96 C6 104 8 112 2 116 C12 114 18 104 12 96 Z', fill: T.tealSoft, stroke: T.teal, 'stroke-width': D });
      const cup = el('path', { d: 'M18 64 A42 26 0 0 0 102 64 Z', fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      const hollow = el('ellipse', { cx: 60, cy: 64, rx: 42, ry: 10, fill: T.ink });
      const eggs = [[44, 58], [60, 55], [76, 58]].map(([x, y]) => el('ellipse', { cx: x, cy: y, rx: 9, ry: 11.5, fill: T.white, stroke: T.teal, 'stroke-width': D })).join('');
      // the FRONT wall of the bowl, drawn over the eggs' lower halves (they sit IN the nest)
      const front = el('path', { d: 'M18 64 A42 10 0 0 0 102 64 A42 26 0 0 1 18 64 Z', fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      const twigs = el('path', { d: 'M26 74 Q44 86 62 82 M36 82 Q58 94 84 80 M56 76 Q78 84 96 72 M30 82 Q48 92 70 90 M50 88 Q68 96 88 86 M16 64 L6 56 M104 64 L114 58 M20 58 L12 50', fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' });
      return branch + leaves + cup + hollow + eggs + front + twigs;
    }
    case 'hive': {
      const cid = `ahclip${++_uid}`;
      // a TREE: crown at the top, a thick trunk opened by a cut-away cavity, roots in the ground
      const crown = el('path', { d: unionOutline([{ x: 14, y: 8, r: 13 }, { x: 36, y: 4, r: 14 }, { x: 60, y: 2, r: 15 }, { x: 84, y: 4, r: 14 }, { x: 106, y: 8, r: 13 }, { x: 60, y: -6, r: 26 }]), fill: T.tealSoft, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      const ground = el('path', { d: 'M0 112 L120 112', fill: 'none', stroke: T.teal, 'stroke-width': O }) + el('rect', { x: 0, y: 112, width: 120, height: 8, fill: T.creamDeep });
      const roots = el('path', { d: 'M30 106 Q24 112 12 116 M90 106 Q96 112 108 116', fill: 'none', stroke: T.teal, 'stroke-width': O, 'stroke-linecap': 'round' });
      const trunk = el('rect', { x: 28, y: 14, width: 64, height: 98, rx: 3, ry: 3, fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'data-lcs-trunk': '' });
      const bark = el('path', { d: 'M34 20 L34 38 M86 24 L86 44 M33 88 L33 106 M87 84 L87 104', fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' });
      const cavity = el('ellipse', { cx: 60, cy: 60, rx: 22, ry: 38, fill: T.white, stroke: T.teal, 'stroke-width': O });
      const clip = el('clipPath', { id: cid }, el('ellipse', { cx: 60, cy: 60, rx: 21, ry: 37 }));
      const a = 5, hh = a * Math.sqrt(3);
      let cells = '';
      const slabs = [[47, 7, 4], [60, 8, 0], [73, 6, 6]];   // [x, cells, drop]
      const filled = new Set(['0:2', '1:1', '1:5', '2:3']);
      slabs.forEach(([x, n, drop], si) => {
        for (let k = 0; k < n; k++) {
          const cy = 24 + hh / 2 + k * hh + drop;
          cells += el('path', { d: hex(x, cy, a), fill: filled.has(si + ':' + k) ? T.tealSoft : T.white, stroke: T.teal, 'stroke-width': D, 'stroke-linejoin': 'round' });
        }
      });
      const hole = el('ellipse', { cx: 60, cy: 104, rx: 6, ry: 3.6, fill: T.ink });
      return el('defs', {}, clip) + crown + trunk + bark + roots + ground + cavity + el('g', { 'clip-path': `url(#${cid})` }, cells) + hole;
    }
    case 'web': {
      const twigs = el('path', { d: 'M4 4 L40 58', fill: 'none', stroke: T.teal, 'stroke-width': px(6.5), 'stroke-linecap': 'round' }) +
        el('path', { d: 'M4 4 L40 58', fill: 'none', stroke: T.creamDeep, 'stroke-width': px(3.5), 'stroke-linecap': 'round' }) +
        el('path', { d: 'M116 10 L84 110', fill: 'none', stroke: T.teal, 'stroke-width': px(6.5), 'stroke-linecap': 'round' }) +
        el('path', { d: 'M116 10 L84 110', fill: 'none', stroke: T.creamDeep, 'stroke-width': px(3.5), 'stroke-linecap': 'round' });
      const c = [58, 60], R = 44;
      const ang = (k) => -Math.PI / 2 + k * 2 * Math.PI / 10;
      let spokes = '';
      for (let k = 0; k < 10; k++) spokes += `M${c[0]} ${c[1]} L${f2(c[0] + R * Math.cos(ang(k)))} ${f2(c[1] + R * Math.sin(ang(k)))} `;
      let rings = '';
      for (const r of [9, 16, 23, 30, 37, 44]) rings += 'M' + Array.from({ length: 11 }, (_, k) => `${f2(c[0] + r * Math.cos(ang(k)))} ${f2(c[1] + r * Math.sin(ang(k)))}`).join(' L') + ' ';
      const anchors = `M${f2(c[0] + R * Math.cos(ang(0)))} ${f2(c[1] + R * Math.sin(ang(0)))} L22 30 M${f2(c[0] + R * Math.cos(ang(3)))} ${f2(c[1] + R * Math.sin(ang(3)))} L108 36 M${f2(c[0] + R * Math.cos(ang(6)))} ${f2(c[1] + R * Math.sin(ang(6)))} L60 118 M${f2(c[0] + R * Math.cos(ang(8)))} ${f2(c[1] + R * Math.sin(ang(8)))} L34 50`;
      return twigs + el('path', { d: (spokes + rings + anchors).trim(), fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    }
    case 'burrow': {
      const soil = el('rect', { x: 0, y: 38, width: 120, height: 82, fill: T.creamDeep });
      const mound = el('path', { d: 'M4 38 Q20 26 40 26 Q54 26 66 38 Z', fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round', 'data-lcs-mound': '' });
      const surface = el('path', { d: 'M0 38 L4 38 M66 38 L120 38', fill: 'none', stroke: T.teal, 'stroke-width': O, 'stroke-linecap': 'round' });
      // the tunnel: 16 wide, from the entrance on the mound's right slope down to the ONE chamber
      const tunnel = el('path', { d: 'M50 30 Q64 34 66 50 Q68 70 72 82 L86 80 Q82 64 80 48 Q76 26 58 24 Z', fill: T.white, stroke: T.teal, 'stroke-width': D, 'stroke-linejoin': 'round' });
      const chamber = el('ellipse', { cx: 82, cy: 92, rx: 24, ry: 14, fill: T.white, stroke: T.teal, 'stroke-width': O, 'data-lcs-chamber': '' });
      const mouth = el('ellipse', { cx: 54, cy: 28, rx: 6, ry: 3.4, transform: 'rotate(20 54 28)', fill: T.ink });
      const pebbles = [[16, 64], [34, 100], [104, 56], [14, 108], [110, 112]].map(([x, y]) => el('ellipse', { cx: x, cy: y, rx: 4, ry: 2.6, fill: T.grid })).join('');
      const grass = tuft(84, 38, 7, D) + tuft(104, 38, 8, D) + tuft(10, 36, 6, D);
      return soil + pebbles + mound + surface + tunnel + chamber + mouth + grass;
    }
    case 'anthill': {
      const soil = el('rect', { x: 0, y: 64, width: 120, height: 56, fill: T.creamDeep });
      const mound = el('path', { d: 'M12 64 Q30 30 52 14 Q60 10 68 14 Q90 30 108 64 Z', fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round', 'data-lcs-mound': '' });
      const surface = el('path', { d: 'M0 64 L12 64 M108 64 L120 64', fill: 'none', stroke: T.teal, 'stroke-width': O, 'stroke-linecap': 'round' });
      const grains = [[36, 40], [80, 42], [30, 56], [92, 56], [48, 28], [72, 28], [24, 60], [98, 60], [60, 20], [44, 50]].map(([x, y]) => el('circle', { cx: x, cy: y, r: 1.6, fill: T.grid })).join('');
      const hole = el('ellipse', { cx: 60, cy: 14, rx: 4, ry: 2.2, fill: T.ink });
      const tunnels = el('path', { d: 'M60 15 L60 40 L42 56 L32 82 M60 40 L78 58 L90 80 M60 40 L58 70 L50 100 M58 70 L74 98', fill: 'none', stroke: T.teal, 'stroke-width': px(7.5), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }) +
        el('path', { d: 'M60 15 L60 40 L42 56 L32 82 M60 40 L78 58 L90 80 M60 40 L58 70 L50 100 M58 70 L74 98', fill: 'none', stroke: T.white, 'stroke-width': px(4.5), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      const chambers = [[30, 86], [92, 84], [48, 104], [78, 102]].map(([x, y]) => el('ellipse', { cx: x, cy: y, rx: 8, ry: 5, fill: T.white, stroke: T.teal, 'stroke-width': D, 'data-lcs-chamber': '' })).join('');
      return soil + mound + surface + grains + tunnels + chambers + hole;
    }
    case 'lodge': {
      // v2 (face build, 2026-09-23): v1 read as a haystack at 115 px. Now a heap of LOGS — every stick a
      // creamDeep bar with a teal rim, several poking out past the dome — standing in wide open water
      const water = el('rect', { x: 0, y: 60, width: 120, height: 46, fill: T.tealSoft });
      const mud = el('path', { d: 'M0 106 Q30 102 60 106 T120 106 L120 120 L0 120 Z', fill: T.creamDeep, stroke: T.teal, 'stroke-width': D });
      const dome = el('path', { d: 'M22 106 L26 74 Q32 34 60 24 Q88 34 94 74 L98 106 Z', fill: T.creamDeep, stroke: T.teal, 'stroke-width': O, 'stroke-linejoin': 'round' });
      const logs = [[30, 40, 58, 30], [62, 28, 90, 42], [22, 60, 50, 50], [72, 50, 98, 62], [40, 22, 64, 32], [56, 26, 80, 18], [24, 82, 46, 76],
        [76, 76, 98, 84], [26, 98, 50, 92], [72, 94, 96, 100], [44, 16, 36, 32], [80, 14, 86, 30], [14, 70, 30, 66], [92, 68, 106, 74]];
      const log = ([x1, y1, x2, y2]) => el('line', { x1, y1, x2, y2, stroke: T.teal, 'stroke-width': px(6.5), 'stroke-linecap': 'round' }) +
        el('line', { x1, y1, x2, y2, stroke: T.creamDeep, 'stroke-width': px(3), 'stroke-linecap': 'round' });
      const sticks = logs.map(log).join('');
      const tunnel = el('path', { d: 'M62 54 Q70 72 74 96 L90 104 L84 92 Q80 70 74 54 Z', fill: T.white, stroke: T.teal, 'stroke-width': D, 'stroke-linejoin': 'round' });
      const chamber = el('ellipse', { cx: 58, cy: 50, rx: 18, ry: 9, fill: T.white, stroke: T.teal, 'stroke-width': O, 'data-lcs-chamber': '' });
      const waterLine = el('path', { d: 'M0 60 L24 60 M96 60 L120 60', fill: 'none', stroke: T.teal, 'stroke-width': O }) +
        el('path', { d: 'M24 60 L96 60', fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-dasharray': `${px(4)} ${px(4)}` });
      const ripples = el('path', { d: 'M4 74 q4 -3 8 0 t8 0 M102 82 q4 -3 8 0 t6 0 M4 94 q4 -3 8 0 M104 96 q4 -3 8 0', fill: 'none', stroke: T.teal, 'stroke-width': D, 'stroke-linecap': 'round' });
      return water + mud + dome + sticks + tunnel + chamber + waterLine + ripples;
    }
    default:
      throw new Error(`animal-home: unknown id "${id}"`);
  }
}

function animalHome({ id, px = 88, attrs } = {}) {
  if (!HOME_IDS.includes(id)) throw new Error(`animal-home: unknown id "${id}" (${HOME_IDS.join(', ')})`);
  if (!(px >= MIN_PX)) throw new Error(`animal-home: px ${px} < ${MIN_PX} (the floor)`);
  const scale = px / VIEW;
  const svg = svgRoot({ width: f2(px), height: f2(px), viewBox: `0 0 ${VIEW} ${VIEW}`, label: '' }, homeBody(id, scale),
    { 'data-lcs-prim': 'animal-home', 'data-lcs-home': id, 'aria-hidden': 'true', ...(attrs || {}) });
  return { svg, meta: { id } };
}

module.exports = { animalHome, homeBody, HOME_IDS, VIEW, MIN_PX };
