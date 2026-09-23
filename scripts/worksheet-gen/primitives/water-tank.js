/**
 * water-tank.js — the G1-399 `sink-or-float` apparatus: ONE small drawn glass tank
 * with a dark wavy waterline and a pebbled gravel floor (design
 * docs/worksheet-gen/b6-designs/G1-399-sink-or-float.md §2 "NEW primitives/water-tank.js").
 * Pure SVG on primitives/_tokens.js, drawn in px from (w, h) with NO viewBox scaling
 * (the bin.js rule), so the 3 px glass and the 2 px waterline hold at 112 px and at 639 px.
 *
 *   waterTank({ w = 170, h = 85, mode = 'rings', spots = 0, waterAt = 0.34, id })
 *     -> { svg, width, height, waterY, floorY, slots: {top:{cx,cy,r}, floor:{cx,cy,r}},
 *          blob: {cx,cy,r} | null, bubbles: [{cx,cy,r}], spotRects: [{x,y,w,h,zone}] }
 *
 * GEOMETRY (px):
 *   glass      open-top wall M 0.04w 0.06h L 0.04w 0.92h Q 0.04w 0.97h 0.09w 0.97h
 *              L 0.91w 0.97h Q 0.96w 0.97h 0.96w 0.92h L 0.96w 0.06h + rim lips
 *              0.02w..0.04w and 0.96w..0.98w at 0.06h; stroke teal 3 px, round caps/joins
 *   air        white, 0.06h .. waterY inside the glass
 *   water      tealSoft, from the WAVE at waterY = waterAt*h down to floorY = 0.84h
 *   waterline  3 crests 0.04w..0.96w at waterY, amplitude max(1.5, 0.045h) CAPPED at 5 px (deviation), teal 2 px —
 *              in greyscale tealSoft and creamDeep are the SAME grey, so this dark line is
 *              the boundary a mono print carries
 *   floor      creamDeep band floorY..0.97h (the rounded glass bottom), an inkSoft 1.5 gravel
 *              top line at floorY (ADDED: creamDeep and tealSoft print as one grey) and four pebbles: ellipses rx
 *              max(2, 0.02w), ry 0.6 rx at x 0.12/0.28/0.72/0.88 w, y 0.905h, stroke
 *              inkSoft 1.5 (the design's `grid` stroke vanished in a greyscale render —
 *              measured, recorded in _work/G1-399-build.md)
 *   rings      (mode 'rings') top = circle (0.36w, waterY) r 0.16h — half above the
 *              waterline, "bobbing"; floor = circle (0.64w, floorY - r + 1) — bottom 1 px INTO the gravel line, resting on the
 *              gravel. Both white, coral 2.5, dash "5 4": identical attributes by construction
 *   legend-float  a teal pebble blob r 0.16h centred on (0.5w, waterY) + 2 ripple arcs each
 *              side, teal 1.5
 *   legend-sink   the same blob, its BOTTOM on the floor ring's bottom (floorY + 1; design
 *              centre floorY - 0.12h, within 0.5 px at 85 px) + 3 bubble rings r 0.03h..0.045h
 *              above it, each bubble wholly below the wave's troughs (waterY + amplitude)
 *   empty      glass, water, floor only
 *   spots      `spots` dashed coral rounded rects 150 x 110 (r 10, 2.5, dash "6 5") per zone:
 *              waterline spots centred ON waterY, floor spots bottom on floorY; x centres
 *              0.40w / 0.74w for 2 (0.57w for 1; 3 evenly across 0.30w..0.94w — throws on
 *              an overlap); the left 0.28w stays free for the tag column
 *
 * MIN_W 112, MIN_H 56; mode 'rings' needs h >= 57 (0.32h >= 18 px); throws on an unknown mode,
 * waterAt outside 0.25..0.45, spots outside 0..3 or spots with a mode other than 'spots'.
 * Root <svg data-lcs-tank data-lcs-tank-mode="<mode>">; parts <g data-lcs-tank-part=...>;
 * rings <circle data-lcs-slot="top|floor">; spots <rect data-lcs-spot="float|sink">.
 * No text inside any tank; coral ONLY on rings and spots; only token hexes.
 * `stretch: true` (ADDITIVE, the F4 class tub only): height 100% of the row, preserveAspectRatio none, every stroke
 * non-scaling — see the comment at the emit. Node gate: qa/verify-b6-water-tank.js.
 */
'use strict';
const { color } = require('./_tokens.js');
const { el } = require('./_svg.js');

const MIN_W = 112, MIN_H = 56;
const MODES = ['rings', 'legend-float', 'legend-sink', 'empty', 'spots'];
const SPOT_W = 150, SPOT_H = 110;
const WAVE_MAX = 5;
/** fix round 2: how far a sunk thing (the floor ring, the legend-sink blob) settles INTO the gravel band (0.84h..0.97h). */
const SINK_DEPTH = 0.06;
const r2 = (v) => Math.round(v * 100) / 100;

/** The pebble blob (design §2), unit radius, as a path scaled to radius R at (cx, cy). */
function blobPath(cx, cy, R) {
  const P = (x, y) => `${r2(cx + x * R)} ${r2(cy + y * R)}`;
  return `M ${P(-1, 0)} Q ${P(-0.86, -0.71)} ${P(0, -0.79)} Q ${P(0.93, -0.71)} ${P(1, 0)} Q ${P(0.86, 0.64)} ${P(0, 0.71)} Q ${P(-0.93, 0.64)} ${P(-1, 0)} Z`;
}
/** 3 crests from x0 to x1 at y, amplitude A (quadratic halves; control at 2A gives peak A). */
function wavePoints(x0, x1, y, A) {
  const halves = 6, step = (x1 - x0) / halves;
  const segs = [];
  for (let i = 0; i < halves; i++) {
    const xs = x0 + i * step, xe = xs + step, up = i % 2 === 0;
    segs.push({ cx: xs + step / 2, cy: up ? y - 2 * A : y + 2 * A, x: xe, y });
  }
  return segs;
}

function spotCentres(n, w) {
  if (n === 1) return [0.57 * w];
  if (n === 2) return [0.40 * w, 0.74 * w];
  if (n === 3) return [0.40, 0.62, 0.84].map((f) => f * w);
  return [];
}

function waterTank(opts = {}) {
  const { w = 170, h = 85, mode = 'rings', spots = 0, waterAt = 0.34, id } = opts;
  if (!MODES.includes(mode)) throw new Error(`water-tank: unknown mode "${mode}"`);
  if (!(w >= MIN_W)) throw new Error(`water-tank: w ${w} < MIN_W ${MIN_W}`);
  if (!(h >= MIN_H)) throw new Error(`water-tank: h ${h} < MIN_H ${MIN_H} (the rings would drop under 18 px)`);
  if (!(waterAt >= 0.25 && waterAt <= 0.45)) throw new Error(`water-tank: waterAt ${waterAt} outside 0.25..0.45`);
  if (!(Number.isInteger(spots) && spots >= 0 && spots <= 3)) throw new Error(`water-tank: spots ${spots} outside 0..3`);
  if (spots && mode !== 'spots') throw new Error(`water-tank: spots ${spots} on mode "${mode}"`);
  if (mode === 'spots' && !spots) throw new Error('water-tank: mode "spots" needs spots >= 1');
  if (mode === 'rings' && 0.32 * h < 18) throw new Error(`water-tank: rings at h ${h} would be ${(0.32 * h).toFixed(1)} px (< 18; rings need h >= 57)`);

  const X = (f) => r2(f * w), Y = (f) => r2(f * h);
  const waterY = r2(waterAt * h), floorY = Y(0.84), bottomY = Y(0.97);
  const xl = X(0.04), xr = X(0.96);
  const A = Math.min(WAVE_MAX, Math.max(1.5, 0.045 * h));   // capped: at 639 x 520 the design's 0.045h is a 23 px swell that swallows the F4 spots
  const wave = wavePoints(xl, xr, waterY, A);
  const waveD = `M ${xl} ${waterY} ` + wave.map((s) => `Q ${r2(s.cx)} ${r2(s.cy)} ${r2(s.x)} ${r2(s.y)}`).join(' ');
  const inner = []; // inside the glass, drawn before it
  // air zone (white) from the rim to the floor; water paints over it from the wave down
  inner.push(el('rect', { x: xl, y: Y(0.06), width: r2(xr - xl), height: r2(floorY - Y(0.06)), fill: color.white }));
  const waterD = waveD + ` L ${xr} ${floorY} L ${xl} ${floorY} Z`;
  inner.push(el('g', { 'data-lcs-tank-part': 'water' }, el('path', { d: waterD, fill: color.tealSoft })));
  // floor band follows the rounded glass bottom
  const floorD = `M ${xl} ${floorY} L ${xl} ${Y(0.92)} Q ${xl} ${bottomY} ${X(0.09)} ${bottomY} L ${X(0.91)} ${bottomY} Q ${xr} ${bottomY} ${xr} ${Y(0.92)} L ${xr} ${floorY} Z`;
  const prx = r2(Math.max(2, 0.02 * w)), pry = r2(0.6 * Math.max(2, 0.02 * w));
  // fix round 2: the right pair moved 0.72/0.88 -> 0.79/0.89 so the settled floor ring (0.64w, reaching ~0.72w on a 2:1 tank) never covers a pebble
  const pebbles = [0.12, 0.28, 0.79, 0.89].map((f) => el('ellipse', { cx: X(f), cy: Y(0.905), rx: prx, ry: pry, fill: 'none', stroke: color.inkSoft, 'stroke-width': 1.5, 'data-lcs-pebble': '' }));
  inner.push(el('g', { 'data-lcs-tank-part': 'floor' }, [
    el('path', { d: floorD, fill: color.creamDeep }),
    el('line', { x1: xl, y1: floorY, x2: xr, y2: floorY, stroke: color.inkSoft, 'stroke-width': 1.5, 'data-lcs-floor-top': '' }),
    ...pebbles,
  ]));
  inner.push(el('g', { 'data-lcs-tank-part': 'waterline' }, el('path', { d: waveD, fill: 'none', stroke: color.teal, 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })));

  const glassD = `M ${xl} ${Y(0.06)} L ${xl} ${Y(0.92)} Q ${xl} ${bottomY} ${X(0.09)} ${bottomY} L ${X(0.91)} ${bottomY} Q ${xr} ${bottomY} ${xr} ${Y(0.92)} L ${xr} ${Y(0.06)}`;
  const glass = el('g', { 'data-lcs-tank-part': 'glass' }, [
    el('path', { d: glassD, fill: 'none', stroke: color.teal, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    el('line', { x1: X(0.02), y1: Y(0.06), x2: xl, y2: Y(0.06), stroke: color.teal, 'stroke-width': 3, 'stroke-linecap': 'round' }),
    el('line', { x1: xr, y1: Y(0.06), x2: X(0.98), y2: Y(0.06), stroke: color.teal, 'stroke-width': 3, 'stroke-linecap': 'round' }),
  ]);

  const over = [];
  const R = r2(0.16 * h);
  let slots = null, blob = null, bubbles = [], spotRects = [];
  if (mode === 'rings') {
    // fix round 2 (en landing panel): a ring merely TANGENT to the gravel line read as "somewhere under the water", while
    // the key's sinker lies on the bottom. The floor ring now SETTLES into the gravel band by SINK_DEPTH x h, the same
    // depth the legend-sink blob sits at, so ring and key say "on the bottom" the same way.
    slots = { top: { cx: X(0.36), cy: waterY, r: R }, floor: { cx: X(0.64), cy: r2(floorY + SINK_DEPTH * h - R), r: R } };
    const ring = (k) => el('circle', { cx: slots[k].cx, cy: slots[k].cy, r: R, fill: color.white, stroke: color.coral, 'stroke-width': 2.5, 'stroke-dasharray': '5 4', 'data-lcs-slot': k });
    over.push(el('g', { 'data-lcs-tank-part': 'rings' }, [ring('top'), ring('floor')]));
  } else if (mode === 'legend-float') {
    blob = { cx: X(0.5), cy: waterY, r: R };
    const rip = [];
    for (const side of [-1, 1]) for (const k of [1, 2]) {
      const x0 = blob.cx + side * (R + 3 + (k - 1) * 5);
      const x1 = x0 + side * 4;
      rip.push(el('path', { d: `M ${r2(x0)} ${r2(waterY - 2 - k)} Q ${r2((x0 + x1) / 2)} ${r2(waterY - 4 - k)} ${r2(x1)} ${r2(waterY - 2 - k)}`, fill: 'none', stroke: color.teal, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'data-lcs-ripple': '' }));
    }
    over.push(el('g', { 'data-lcs-tank-part': 'legend' }, [el('path', { d: blobPath(blob.cx, blob.cy, R), fill: color.teal, 'data-lcs-blob': 'float' }), ...rip]));
  } else if (mode === 'legend-sink') {
    blob = { cx: X(0.5), cy: r2(floorY + SINK_DEPTH * h - 0.71 * R), r: R };   // bottom = the floor ring's bottom: settled SINK_DEPTH x h into the gravel (fix round 2)
    const top = blob.cy - 0.79 * R;
    const rs = [0.045, 0.035, 0.03].map((f) => r2(Math.max(1.5, f * h)));
    const room = top - (waterY + A + 1);   // below the wave's troughs, never in the air
    const ys = [top - rs[0] - 0.1 * room, top - 0.42 * room, top - Math.min(0.8 * room, room - rs[2] - 0.5)];
    bubbles = rs.map((r, i) => ({ cx: r2(blob.cx + (i === 1 ? -0.35 : 0.25) * R), cy: r2(ys[i]), r }));
    over.push(el('g', { 'data-lcs-tank-part': 'legend' }, [
      el('path', { d: blobPath(blob.cx, blob.cy, R), fill: color.teal, 'data-lcs-blob': 'sink' }),
      ...bubbles.map((b) => el('circle', { cx: b.cx, cy: b.cy, r: b.r, fill: 'none', stroke: color.teal, 'stroke-width': 1.5, 'data-lcs-bubble': '' })),
    ]));
  } else if (mode === 'spots') {
    const xs = spotCentres(spots, w);
    for (const zone of ['float', 'sink']) for (const cx of xs) {
      const y = zone === 'float' ? waterY - SPOT_H / 2 : floorY - SPOT_H;
      spotRects.push({ x: r2(cx - SPOT_W / 2), y: r2(y), w: SPOT_W, h: SPOT_H, zone });
    }
    for (let i = 0; i < spotRects.length; i++) for (let j = i + 1; j < spotRects.length; j++) {
      const a = spotRects[i], b = spotRects[j];
      if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h) throw new Error(`water-tank: spots overlap at w ${w} h ${h} (${spots} per zone)`);
    }
    for (const s of spotRects) if (s.x < 0.28 * w - 0.5 || s.x + s.w > xr || s.y < Y(0.06)) throw new Error(`water-tank: a spot leaves the tank at w ${w} h ${h}`);
    over.push(el('g', { 'data-lcs-tank-part': 'spots' }, spotRects.map((s) => el('rect', { x: s.x, y: s.y, width: s.w, height: s.h, rx: 10, ry: 10, fill: 'none', stroke: color.coral, 'stroke-width': 2.5, 'stroke-dasharray': '6 5', 'data-lcs-spot': s.zone }))));
  }

  let svg = el('svg', {
    xmlns: 'http://www.w3.org/2000/svg', width: w, height: h, viewBox: `0 0 ${w} ${h}`,
    role: 'img', 'aria-hidden': 'true', 'data-lcs-tank': id || '', 'data-lcs-tank-mode': mode,
    style: 'display:block;overflow:visible',
  }, [...inner, glass, ...over]);
  if (opts.stretch) {
    // ADDITIVE (G1-399 F4, the class tub): the tub fills its grid row VERTICALLY so the K page does not end high
    // (the FILL rule). Width stays w px; the height follows the row (h is the design height and the viewBox);
    // every stroke carries vector-effect non-scaling-stroke so the 3 / 2.5 / 2 / 1.5 px lines stay px at any
    // stretch. Only the F4 tub asks for it — every other tank's markup is unchanged.
    svg = svg.replace(/^<svg([^>]*?) height="[^"]*"/, '<svg$1 height="100%" preserveAspectRatio="none" data-lcs-tank-stretch="1"')
      .replace('style="display:block;overflow:visible"', `style="display:block;overflow:visible;width:${w}px;height:100%;min-height:${h}px"`)
      .replace(/(<(?:path|line|ellipse|rect|circle)\s[^>]*?stroke-width="[^"]*")/g, '$1 vector-effect="non-scaling-stroke"');
  }
  return { svg, width: w, height: h, waterY, floorY, slots, blob, bubbles, spotRects };
}

module.exports = { waterTank, MIN_W, MIN_H, MODES, SPOT_W, SPOT_H, WAVE_MAX, SINK_DEPTH, blobPath };
