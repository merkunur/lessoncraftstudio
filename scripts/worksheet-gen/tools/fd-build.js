#!/usr/bin/env node
/**
 * fd-build.js — Find the Differences scene data (nt2-G / b7, 2026-10-09).
 *
 * For every Color by Number scene (data/cbn/lineart-scenes.js SCENES + SECOND): build its LAYERS (lib/fd-scene.js) and
 * every CANDIDATE difference, each proven by a raster gate — the left and right panels are rendered (sharp, 1 px per
 * unit, line mode; colour mode for a crayon change), subtracted, the changed pixels dilated and counted as connected
 * components — and kept only when the change is ONE visible thing of a printable size, inside the frame:
 *   remove / add / swap / detail / colour → exactly one component, min side ≥ MIN_SIDE units, area ≥ MIN_AREA
 *   mirror / move / scale                 → ≥ 1 component; the difference is the whole drawing (its union bbox)
 * A mirrored symmetric sun changes nothing and is refused by the same gate. Writes data/fd/<id>.json (generated, not
 * committed; rebuilds byte-identically); data/fd/review.js (committed) holds the human refusals.
 *
 *   node tools/fd-build.js [--only=id,id] [--limit=N]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const F = require('../lib/fd-scene.js');
const L = require('../lib/cbn-lineart.js');
const { SCENES, SECOND } = require('../data/cbn/lineart-scenes.js');
const { PROPS, THEME_PROPS } = require('../data/fd/props.js');
// --set=fdx: the ORIGINAL Level Set scenes (data/fdx/scenes.js laid out by lib/fdx-layout.js); their swap / add partners
// come from the read catalogue (data/fdx/catalog.js) instead of data/fd/props.js. The CBN set builds exactly as before.
const FDX = (process.argv.find((a) => a.startsWith('--set=')) || '') === '--set=fdx';
const FX = FDX ? { ...require('../data/fdx/catalog.js'), ...require('../lib/fdx-layout.js'), TAGS: require('../lib/fdx-scenery.js').TAGS } : null;
/** a catalogue drawing as a prop record { place, h, colour, alt } */
function fxProp(src, spec) {
  const c = FX.CATALOG.get(src); if (!c || c.refused) return null;
  const place = c.places.includes('s') ? 'sky' : 'ground';
  const tags = FX.TAGS[spec.setting] || [];
  const inScene = new Set(spec.items.map((i) => i.src));
  const alt = [...FX.CATALOG.values()].filter((o) => !o.refused && o.src !== src && !inScene.has(o.src) && o.kind === c.kind && o.places[0] === c.places[0] && Math.abs(o.h - c.h) <= 0.3 * c.h && o.tags.some((t) => tags.includes(t)) && !o.thin)
    .sort((a, b) => Math.abs(a.h - c.h) - Math.abs(b.h - c.h) || (a.src < b.src ? -1 : 1)).map((o) => o.src);
  return { place, h: Math.round(Math.max(place === 'sky' ? 60 : 70, c.h * (c.kind === 'object' || c.kind === 'food' ? 1.1 : 1.35))), colour: FX.PLANS[src] || [c.colours[0]], alt };   // one crayon per drawing (lib/fdx-layout.js)
}
const propOf = (src, spec) => (FDX ? fxProp(src, spec) : PROPS[src]);
/** Level Set: an added / swapped drawing is never the crayon of what is behind it (read 2026-10-10: a green wheelbarrow
 *  swapped onto green grass) — the same rule lib/fdx-layout.js applies to the scene's own drawings */
function fxColourAt(src, spec, it, colour) {
  if (!FDX || !Array.isArray(colour) || colour.length !== 1) return colour;
  const c = FX.CATALOG.get(src); if (!c) return colour;
  const b = FX.behindColour(spec, it.anchor === 'c' ? 's' : c.places[0], FX.boxOf(it));
  return b && b === colour[0] && FX.SHADE[b] ? [b === 'grey' && c.kind === 'animal' ? 'brown' : FX.SHADE[b]] : colour;
}
/** the theme props a scene may receive: CBN = data/fd/props.js THEME_PROPS; fdx = the setting's catalogue drawings not in the scene */
function themeProps(spec) {
  if (!FDX) return THEME_PROPS[spec.theme] || { sky: [], ground: [] };
  const tags = FX.TAGS[spec.setting] || [], inScene = new Set(spec.items.map((i) => i.src));
  const pool = [...FX.CATALOG.values()].filter((o) => !o.refused && !o.thin && !inScene.has(o.src) && o.tags.some((t) => tags.includes(t)) && o.kind !== 'building' && o.h <= 150);
  const sky = pool.filter((o) => o.places[0] === 's').map((o) => o.src).sort();
  const ground = pool.filter((o) => o.places[0] === 'g' && o.kind !== 'vehicle').map((o) => o.src).sort();
  return { sky, ground };
}
const OUT = path.join(__dirname, '..', 'data', 'fd');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;
const limit = +(arg('limit') || 0) || 0;

const W = F.W, H = F.H;
const MIN_SIDE = 16, MIN_AREA = 260, INSET = 8, DIL = 5, NOISE = 24;
const ASYM_MIN = 0.12;   // 1 − IoU of a drawing's silhouette with its mirror image: below this a mirror is invisible
const CONTRAST = { red: 'blue', orange: 'purple', yellow: 'blue', lightgreen: 'purple', green: 'orange', lightblue: 'pink', blue: 'red', purple: 'yellow', pink: 'green', brown: 'blue', grey: 'red', black: 'brown', none: 'yellow' };

async function raster(svg, colour) {
  const img = sharp(Buffer.from(svg));
  const { data, info } = colour ? await img.removeAlpha().raw().toBuffer({ resolveWithObject: true }) : await img.greyscale().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height, ch: info.channels };
}
/** changed pixels of two rasters → components (after a DIL dilation), each { area, bbox } in units (1 px = 1 unit) */
function diffComponents(a, b) {
  const n = a.w * a.h, d = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    let v = 0;
    for (let c = 0; c < a.ch; c++) v = Math.max(v, Math.abs(a.data[i * a.ch + c] - b.data[i * a.ch + c]));
    if (v > 60) d[i] = 1;
  }
  const dd = L.dilate(d, a.w, a.h, DIL);
  const block = new Uint8Array(n); for (let i = 0; i < n; i++) block[i] = dd[i] ? 0 : 1;
  const { lab, comps } = L.components(block, a.w, a.h);
  // area of REAL changed pixels per component (not the dilated blob)
  const real = new Map();
  for (let i = 0; i < n; i++) if (d[i]) real.set(lab[i], (real.get(lab[i]) || 0) + 1);
  return comps.map((c) => ({ area: real.get(c.label) || 0, bbox: [c.bbox[0] + DIL, c.bbox[1] + DIL, c.bbox[2] - DIL, c.bbox[3] - DIL] })).filter((c) => c.area >= NOISE);
}
const inside = (b) => b[0] >= INSET && b[1] >= INSET && b[2] <= W - INSET && b[3] <= H - INSET;
const union = (cs) => [Math.min(...cs.map((c) => c.bbox[0])), Math.min(...cs.map((c) => c.bbox[1])), Math.max(...cs.map((c) => c.bbox[2])), Math.max(...cs.map((c) => c.bbox[3]))];
const overlaps = (a, b, m = 0) => !(a[2] + m < b[0] || b[2] + m < a[0] || a[3] + m < b[1] || b[3] + m < a[1]);
const overlapArea = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));

/** a free place for a new prop of bbox size (w × h): on the ground (bottom y) or in the sky (centre y); null when none */
function freeSpot(scene, w, h, place) {
  const taken = scene.items.map((l) => l.bbox);
  const xs = []; for (let x = 30; x <= W - 30 - w; x += 12) xs.push(x);
  const z = scene.zones;
  const ys = z && z.ground ? (place === 'sky' ? (z.sky ? [60, 100, 140, 180, 220].filter((y) => y >= z.sky.y0 - 30 && y <= z.sky.y1 + 30) : []) : [548, 524, 500, 476, 452, 428, 404].filter((y) => y >= z.ground.y0 && y <= z.ground.y1 + 4))
    : place === 'sky' ? [60, 100, 140, 180, 220].filter((y) => y + h / 2 < scene.hy - 24) : [548, 524, 500, 476, 452].filter((y) => y - h > scene.hy + 6);
  // a ground prop never stands in a named water area (a mushroom in the pond, a flower in the sea)
  const water = ((scene.bg && scene.bg.regions) || []).filter((r) => r.name === 'pond' || r.name === 'sea' || r.name === 'river' || r.name === 'lake' || r.name === 'road').map((r) => r.bbox);
  if (z && z.keepOut) water.push(...z.keepOut);
  const inWater = (px, py) => water.some((b) => px >= b[0] && px <= b[2] && py >= b[1] && py <= b[3]);
  for (const y of ys) for (const x of xs) {
    const bb = place === 'sky' ? [x, y - h / 2, x + w, y + h / 2] : [x, y - h, x + w, y];
    if (!inside(bb)) continue;
    if (place === 'ground' && (inWater(x + w / 2, y - 2) || inWater(x + 4, y - 2) || inWater(x + w - 4, y - 2))) continue;
    // Level Set scenes: a ground drawing never covers more than 15 % of a pond / river / road, a sky drawing stays above
    // every hill (read 2026-10-10: an added alligator standing in the pond, a dove sitting on a hill)
    if (z && z.ground) {
      const ovA = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
      if (place === 'ground' && water.some((wb) => ovA(wb, bb) > 0.15 * w * h)) continue;
      if (place === 'sky' && (z.mounds || []).some(([a, b2, top]) => bb[2] > a && bb[0] < b2 && bb[3] > top - 14)) continue;
      if (place === 'sky' && bb[3] > scene.hy - 24) continue;
    }
    if (taken.some((t) => overlaps(t, bb, place === 'sky' ? 22 : (z && z.ground ? 20 : 10)))) continue;   // sky props keep clear air round them (Level Set ground props 20: a briefcase pressed against the backpack read as one bag, 2026-10-10)
    return { x: x + w / 2, y: place === 'sky' ? y : y, bb };
  }
  return null;
}

async function candidatesFor(spec, scene) {
  const leftLine = await raster(F.renderPanel(scene, [], { mode: 'line', width: W }), false);
  const leftColour = await raster(F.renderPanel(scene, [], { mode: 'colour', width: W }), true);
  const out = [];
  const test = async (op, mode) => {
    let ops; try { ops = [op]; F.applyOps(scene, ops); } catch (e) { return null; }
    const colour = mode === 'colour';
    const right = await raster(F.renderPanel(scene, ops, { mode, width: W }), colour);
    const comps = diffComponents(colour ? leftColour : leftLine, right);
    if (!comps.length) return null;
    const whole = op.kind === 'mirror' || op.kind === 'move' || op.kind === 'scale';
    if (!whole && comps.length !== 1) return null;
    const bb = whole ? union(comps) : comps[0].bbox;
    const area = comps.reduce((a, c) => a + c.area, 0);
    if (!inside(bb)) return null;
    if (Math.min(bb[2] - bb[0], bb[3] - bb[1]) < MIN_SIDE || area < MIN_AREA) return null;
    let ring = bb;
    if (whole) {
      const l = scene.items.find((x) => x.idx === op.item);
      // a mirrored near-symmetric drawing (a sun, a cloud) barely changes: the change must be a real share of its ink
      if (op.kind === 'mirror' && (l.asym < ASYM_MIN || area < 0.35 * l.inkUnits)) return null;
      // (Level Set scenes, read 2026-10-10: a mirrored sun at asym 0.123 passed the 0.12 floor and read as no change at
      // all — the new scenes take 0.20 and never mirror a sky filler)
      // (and only a drawing that FACES somewhere — an animal, a person, a vehicle: a mirrored tulip read as no change, 2026-10-10)
      if (op.kind === 'mirror' && FDX && !['animal', 'person', 'vehicle'].includes((FX.CATALOG.get(l.src) || {}).kind)) return null;
      if (op.kind === 'mirror' && FDX && (l.asym < 0.20 || /\/(sun|cloud|cloudy|moon|star|snowflake)$/.test(l.src))) return null;
      // the drawing's new place: inside the frame, and not onto another drawing it did not already touch
      const nb = F.newBbox(l, op);
      if (!inside(nb)) return null;
      for (const o of scene.items) {
        if (o.idx === l.idx) continue;
        const before = overlapArea(l.bbox, o.bbox), after = overlapArea(nb, o.bbox);
        if (after > before * 1.1 + 40) return null;
      }
      // (Level Set scenes, read 2026-10-10: a television scaled up to 3 units from the dice read as one blob) — a moved or
      // scaled drawing keeps 12 units of air from every drawing it did not already touch
      if (FDX && op.kind !== 'mirror') {
        const grow = (b, a) => [b[0] - a, b[1] - a, b[2] + a, b[3] + a];
        for (const o of scene.items) {
          if (o.idx === l.idx || /\/(sun|cloud|cloudy|moon|star|snowflake)$/.test(o.src)) continue;
          if (overlapArea(grow(l.bbox, 12), o.bbox) > 0) continue;   // already that close in picture 1
          if (overlapArea(grow(nb, 12), o.bbox) > 0) return null;
        }
      }
      ring = nb;   // the ring and the tap target circle where the drawing IS in picture 2
    }
    const rec = { ...op, bbox: ring.map((v) => +v.toFixed(1)), diff: bb.map((v) => +v.toFixed(1)), area, mode: colour ? 'colour' : 'any' };
    if (op.layer) { rec.layer = slimLayer(op.layer); }
    return rec;
  };
  const push = async (op, mode = 'line') => { const r = await test(op, mode); if (r) out.push(r); return r; };
  const hero = scene.items[scene.items.length - 1];
  for (const l of scene.items) {
    // a drawing that is part of the scenery (a far barn, a window) is never a difference
    if (spec.items[l.idx] && spec.items[l.idx].fixed) continue;
    const isHero = l.hero;
    const w = l.bbox[2] - l.bbox[0];
    if (!isHero) await push({ kind: 'remove', item: l.idx });
    await push({ kind: 'mirror', item: l.idx });
    // (Level Set: a 1.22 hero read as no change on a "3 big things" page, 2026-10-10)
    for (const s of isHero ? (FDX ? [1.32, 0.74] : [1.22, 0.8]) : [1.35, 0.72]) await push({ kind: 'scale', item: l.idx, s });
    for (const dx of [w + 24, -(w + 24), 60, -60]) await push({ kind: 'move', item: l.idx, dx, dy: 0 });
    // colour: the two biggest parts, to a contrasting crayon
    // colour: the two biggest parts (hero) / the biggest part (prop) to a contrasting crayon. A drawing made only of SMALL
    // cells (a butterfly, a hummingbird, a chick: every part under MIN_PART_R) has no big part — its largest painted cell
    // stands in, and the op recolours every cell of that crayon (paintSmallCells gave them all the same one), so the colour
    // change can land on the sky props too: with only the sun, the tulip and the hero the colour face put 42 % of its rings
    // in one quadrant (2026-10-10)
    let big = l.regions.map((r, k) => [r, k]).filter(([r]) => r.r >= 9 && r.colour !== 'none').sort((a, b) => b[0].area - a[0].area).slice(0, isHero ? 2 : 1);
    if (!big.length) big = l.regions.map((r, k) => [r, k]).filter(([r]) => r.colour && r.colour !== 'none').sort((a, b) => b[0].area - a[0].area).slice(0, 1);
    // (Level Set scenes, read 2026-10-10: a yellow moon recoloured BLUE on the blue night sky vanished) — the new crayon is
    // never the colour, or the light/dark twin of the colour, of what the drawing stands on or against
    const fam = (c) => ({ lightblue: 'blue', lightgreen: 'green' }[c] || c);
    const behind = FDX && spec.items[l.idx] ? FX.behindColour(spec, (FX.CATALOG.get(l.src) || { places: ['g'] }).places[0], l.bbox) : null;
    const pickColour = (from) => {
      const want = CONTRAST[from] || 'blue';
      if (!behind || fam(want) !== fam(behind)) return want;
      return ['red', 'orange', 'purple', 'yellow', 'pink', 'blue', 'green'].find((c) => fam(c) !== fam(behind) && fam(c) !== fam(from)) || want;
    };
    // (Level Set scenes: never the sun / cloud / moon — a blue sun on page after page, read 2026-10-10)
    if (!(FDX && /\/(sun|cloud|cloudy|moon|star|snowflake)$/.test(l.src))) for (const [r, k] of big) await push({ kind: 'colour', item: l.idx, region: k, colour: pickColour(r.colour) }, 'colour');
    // detail: inner parts
    let nd = 0;
    for (const k of F.detailCandidates(l)) {
      if (nd >= (isHero ? 3 : 1)) break;
      const v = await F.detailVariant(l, k, spec); if (!v) continue;
      const r = await push({ kind: 'detail', item: l.idx, region: k, layer: v }); if (r) nd++;
    }
    // swap: a partner of the same kind at the same place and size
    const p = propOf(l.src, spec);
    if (!isHero && p) for (const alt of p.alt.slice(0, 2)) {
      if (alt === l.src) continue;
      // (Level Set scenes: a swap never brings in a word another drawing of the scene already shows — two dice, read 2026-10-10)
      if (FDX) { const w = (x) => String(x).split('/').pop().replace(/_\d+$/, '').replace(/s$/, ''); if (spec.items.some((i) => i.src !== l.src && w(i.src) === w(alt))) continue; }
      const it = { src: alt, x: l.x, y: l.y, h: l.h, flip: l.flip, ...(FDX ? { stroke: FX.strokeFor(FX.boxOf({ src: alt, x: l.x, y: l.y, h: l.h })) } : {}) };
      const ap = propOf(alt, spec);
      const lay = await F.layerFor(it, { ...spec, items: [it] }, 0, ap ? fxColourAt(alt, spec, it, ap.colour) : null);
      // (Level Set scenes, read 2026-10-10: a dresser swapped for a small robot left the robot's feet on the teddy's head —
      // a swapped drawing keeps the old baseline, so it never stands on another drawing's top edge)
      if (FDX && lay && lay.bbox) {
        const nb = lay.bbox;
        const stacked = scene.items.some((o) => {
          if (o.idx === l.idx || /\/(sun|cloud|cloudy|moon|star|snowflake)$/.test(o.src)) return false;
          const xo = Math.min(nb[2], o.bbox[2]) - Math.max(nb[0], o.bbox[0]);
          if (xo <= 0.5 * Math.min(nb[2] - nb[0], o.bbox[2] - o.bbox[0])) return false;
          const g = o.bbox[1] - nb[3];
          return g >= -6 && g < 15;
        });
        if (stacked) continue;
        // ...nor lands ON another drawing it did not already touch (read 2026-10-10: a teddy swapped for a table that
        // covered the hamster) — the same rule a moved / scaled drawing obeys
        if (scene.items.some((o) => o.idx !== l.idx && overlapArea(nb, o.bbox) > overlapArea(l.bbox, o.bbox) * 1.1 + 40)) continue;
      }
      await push({ kind: 'swap', item: l.idx, src: alt, layer: lay });
    }
  }
  // add: theme props at a free spot (one sky, one ground), and one more of an existing ground prop (count)
  const tp = themeProps(spec);
  // Level Set: a NEW drawing is never another drawing of a word the scene already shows (an owl beside the owl, a third
  // ice skate) — that is what the count copy is for, and two of a word make 'which one is new?' a guess
  if (FDX) { const wordOf = (x) => String(x).split('/').pop().replace(/_\d+$/, '').replace(/s$/, ''); const have = new Set(spec.items.map((i) => wordOf(i.src))); tp.sky = tp.sky.filter((x) => !have.has(wordOf(x))); tp.ground = tp.ground.filter((x) => !have.has(wordOf(x))); }
  let added = 0;
  for (const place of ['sky', 'ground']) for (const src of tp[place]) {
    if (added >= 3) break;
    const p = propOf(src, spec); if (!p) continue;
    const probe = await F.layerFor({ src, x: 300, y: place === 'sky' ? 150 : 540, h: p.h, anchor: place === 'sky' ? 'c' : undefined }, { ...spec, items: [{ src }] }, 0, p.colour);
    const pw = probe.bbox[2] - probe.bbox[0], ph = probe.bbox[3] - probe.bbox[1];
    const spot = freeSpot(scene, pw, ph, place); if (!spot) continue;
    const it = { src, x: spot.x, y: spot.y, h: p.h, anchor: place === 'sky' ? 'c' : undefined };
    if (FDX) it.stroke = FX.strokeFor(FX.boxOf(it));
    const lay = await F.layerFor(it, { ...spec, items: [it] }, 0, fxColourAt(it.src, spec, it, p.colour));
    lay.idx = 100 + added;
    const r = await push({ kind: 'add', item: lay.idx, src, layer: lay }); if (r) added++;
  }
  for (const l of scene.items) {
    if (l.hero || added >= 4) continue;
    if (spec.items[l.idx] && spec.items[l.idx].fixed) continue;
    const p = propOf(l.src, spec); if (!p || p.place !== 'ground') continue;
    // (a counter / shelf drawing is never copied: its copy stood in mid-air at the counter's height, read 2026-10-10)
    if (FDX && FX.CATALOG.get(l.src) && FX.CATALOG.get(l.src).places[0] !== 'g') continue;
    const pw = l.bbox[2] - l.bbox[0], ph = l.bbox[3] - l.bbox[1];
    const spot = freeSpot(scene, pw, ph, 'ground'); if (!spot) continue;
    // (the copy stands where the free spot was FOUND — at the original's height it landed on another drawing, read 2026-10-10)
    const it = { src: l.src, x: spot.x, y: FDX ? spot.y : l.y, h: l.h, ...(FDX ? { stroke: spec.items[l.idx] && spec.items[l.idx].stroke } : {}) };
    const lay = await F.layerFor(it, { ...spec, items: [it] }, 0, fxColourAt(it.src, spec, it, (FDX && spec.items[l.idx] && spec.items[l.idx].colour) || p.colour));
    lay.idx = 100 + added;
    const r = await push({ kind: 'add', item: lay.idx, src: l.src, layer: lay, count: true }); if (r) added++;
  }
  void hero;
  return out;
}
function slimLayer(l) { const { _mask, _seg, _cbn, _plan, ...rest } = l; return rest; }

/**
 * --rich: a DENSIFIED copy of a scene for the 7- and 10-difference faces: up to RICH extra theme props (sky and ground
 * alternating, each prop at most twice) placed at free spots BEFORE the hero is drawn, so the hero stays in front. The
 * record is written as <id>-rich.json with `base: <id>`; colours of the reviewed drawings are inherited, the extras
 * follow their own plan. A scene that cannot take at least RICH_MIN extras is skipped (no rich copy).
 */
const RICH = 9, RICH_MIN = 3;
async function densify(spec) {
  const probeScene = await F.buildLayers(spec, { inherit: false });
  const tp = THEME_PROPS[spec.theme] || { sky: [], ground: [] };
  const seq = [];
  for (let k = 0; k < 2; k++) for (let i = 0; i < Math.max(tp.sky.length, tp.ground.length); i++) { if (tp.ground[i]) seq.push(['ground', tp.ground[i]]); if (tp.sky[i]) seq.push(['sky', tp.sky[i]]); }
  const extras = [];
  const taken = probeScene.items.map((l) => l.bbox);
  for (const [place, src] of seq) {
    if (extras.length >= RICH) break;
    const p = PROPS[src]; if (!p) continue;
    const probe = await F.layerFor({ src, x: 300, y: place === 'sky' ? 150 : 540, h: p.h, anchor: place === 'sky' ? 'c' : undefined }, { ...spec, items: [{ src }] }, 0, p.colour);
    const pw = probe.bbox[2] - probe.bbox[0], ph = probe.bbox[3] - probe.bbox[1];
    const spot = freeSpot({ ...probeScene, items: taken.map((b) => ({ bbox: b })) }, pw, ph, place); if (!spot) continue;   // probeScene carries bg (water areas)
    extras.push({ src, x: spot.x, y: spot.y, h: p.h, anchor: place === 'sky' ? 'c' : undefined, colour: p.colour });
    taken.push(spot.bb);
  }
  if (extras.length < RICH_MIN) return null;
  const items = spec.items.slice(0, -1).concat(extras, [spec.items[spec.items.length - 1]]);
  return { ...spec, id: spec.id + '-rich', base: spec.id, items, rich: extras.length };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const all = FDX ? require('../data/fdx/scenes.js').SCENES.map((s) => FX.layoutScene(s)) : [...SCENES, ...SECOND];
  const rich = process.argv.includes('--rich');
  let n = 0;
  for (const base of all) {
    if (only && !only.has(base.id)) continue;
    if (limit && n >= limit) break;
    const t0 = Date.now();
    const spec = rich ? await densify(base) : base;
    if (!spec) { console.log(`${base.id}: no room for ${RICH_MIN} extra props — no rich copy`); continue; }
    const scene = await F.buildLayers(spec, FDX ? { inherit: false } : {});
    if (FDX) scene.zones = spec.zones;
    const cands = await candidatesFor(spec, scene);
    const rec = { v: 1, id: spec.id, base: spec.base || null, rich: spec.rich || 0, kind: spec.kind, theme: spec.theme, names: spec.names, hy: scene.hy, w: W, h: H, inherited: scene.inherited,
      ...(FDX ? { set: 'fdx', setting: spec.setting, variant: spec.variant, level: spec.level, zones: spec.zones } : {}),
      bg: scene.bg, items: scene.items.map(slimLayer), cands };
    fs.writeFileSync(path.join(OUT, spec.id + '.json'), JSON.stringify(rec));
    const by = {}; for (const c of cands) by[c.kind] = (by[c.kind] || 0) + 1;
    console.log(`${spec.id}: ${scene.items.length} drawings, ${cands.length} candidates ${JSON.stringify(by)} ${Date.now() - t0}ms`);
    n++;
  }
})().catch((e) => { console.error(e); process.exit(1); });
