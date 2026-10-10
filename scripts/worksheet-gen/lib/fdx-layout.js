/**
 * fdx-layout.js — places a Find the Differences Level Set scene's library drawings into its setting (2026-10-10).
 *
 * A scene SPEC (data/fdx/scenes.js) names a setting + variant, a hero and a cast of library drawings; every drawing is
 * a catalogue entry (data/fdx/catalog.js — refused or unknown src throws). layoutScene(spec) returns the shape
 * lib/fd-scene.js buildLayers() and tools/fd-build.js already read (data/cbn/lineart-scenes.js): { id, kind, theme, hy,
 * names, stroke, lines, fixed, items:[{src, x, y, h, anchor?, flip?, colour, fixed?}] } with the hero LAST.
 *
 * Rules (each one a reason a picture read wrong on a sheet):
 *  - a drawing stands where its catalogue says it can (ground / sky / table / wall / water / afloat), in that zone;
 *  - nothing overlaps anything (12 units of air): a difference is then always a whole, visible drawing;
 *  - ground drawings shrink with depth (far = 72 %), so the back row reads as further away, the hero stands in front;
 *  - nothing stands in a pond, a river, a road or on a path (zones.keepOut), nothing leaves the frame (14 units);
 *  - positions come from a seeded search that keeps drawings apart (max-min distance), so no two scenes of one setting
 *    share a layout; an entry may pin its own place: { src, at:[x, y], h }.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { sceneryFor } = require('./fdx-scenery.js');
const { CATALOG, PLANS } = require('../data/fdx/catalog.js');
const { makeRng } = require('./rng.js');

const W = 600, H = 560, EDGE = 14, AIR = 12;
let ASPECT = null;
function aspectOf(src) {
  if (!ASPECT) ASPECT = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'fdx', 'aspect.json'), 'utf8'));
  const a = ASPECT[src]; if (!a) throw new Error(`fdx-layout: no aspect for ${src} (node tools/fdx-aspect.js)`);
  return a;
}
const boxOf = (it) => {
  const h = it.h, w = h * aspectOf(it.src) * (it.sx || 1);
  const top = it.anchor === 'c' ? it.y - h / 2 : it.y - h;
  return [it.x - w / 2, top, it.x + w / 2, top + h];
};
const overlaps = (a, b, m) => !(a[2] + m <= b[0] || b[2] + m <= a[0] || a[3] + m <= b[1] || b[3] + m <= a[1]);
const inFrame = (b, e = EDGE) => b[0] >= e && b[1] >= e && b[2] <= W - e && b[3] <= H - EDGE;

/** the zone a drawing goes to: its own preference order, the first the setting has */
function placeFor(cat, zones, want) {

  // a vehicle in a street drives on the ROAD; a train in a station stands on the RAIL
  if (!want && cat.kind === 'vehicle' && zones.road && cat.places.includes('g')) return 'r';
  if (!want && zones.rail && /train/.test(cat.src)) return 'l';
  const has = { g: !!zones.ground, s: !!zones.sky, t: !!(zones.surfaces && zones.surfaces.length), w: !!zones.wall, u: !!zones.water, a: !!zones.float };
  const order = want ? [want] : cat.places;
  for (const p of order) if (has[p]) return p;
  return null;
}

const SHADE = { lightblue: 'blue', blue: 'lightblue', green: 'lightgreen', lightgreen: 'green', yellow: 'orange', orange: 'brown', brown: 'orange', pink: 'red', red: 'pink', grey: 'blue', purple: 'pink' };
/** the colour of the area a drawing stands in / against: the nearest named point of that kind */
function behindColour(sc, place, box) {
  const cx = (box[0] + box[2]) / 2, by = place === 'g' || place === 'r' || place === 'l' ? box[3] - 4 : (box[1] + box[3]) / 2;
  // a ground drawing stands on a FLOOR area (grass, sand, ice, floor, pavement…), never 'on' the river / pond / a hill behind
  const FLOOR = /^(ground|grass|sand|ice|walk|pavement|seabed|moon-ground|pier|platform|lane)$/;
  const pts = (sc.fixed || []).filter((f) => (place === 's' || place === 'w' ? f.name === 'sky' : place === 'u' ? f.name === 'water' : place === 'a' ? /^(sea|lake|river|pond)$/.test(f.name) : place === 'r' || place === 'l' ? /^(ground|grass|pavement)$/.test(f.name) : FLOOR.test(f.name)));   // a vehicle on the road stands up against the grass behind it
  let best = null, bd = Infinity;
  for (const f of pts) { const d = (f.at[0] - cx) ** 2 + (f.at[1] - by) ** 2 * (place === 'g' ? 4 : 1); if (d < bd) { bd = d; best = f; } }
  return best ? best.colour : null;
}
/** line weight by size: 7 units from 220 up, down to 4 at 90 (a 7-unit line drowned a small farmer's face) */
function strokeFor(box) { const bh = box[3] - box[1], bw = box[2] - box[0], size = Math.sqrt(bh * Math.max(bh, bw)); return +Math.max(4, Math.min(7, 4 + 3 * (size - 90) / 130)).toFixed(1); }
function layoutScene(spec) {
  let err;
  // a full-size layout is tried with several seeds before anything is shrunk (an early random pick can leave no gap
  // wide enough for a later drawing; another seed often can)
  for (const k of [1, 0.93, 0.86, 0.8, 0.74, 0.68, 0.62, 0.57]) for (let a = 0; a < 6; a++) {
    try { return layoutOnce(spec, k, a); } catch (e) { err = e; if (!/no room/.test(e.message)) throw e; }
  }
  throw err;
}
function layoutOnce(spec, shrink, attempt = 0) {
  const sc = sceneryFor(spec.setting, spec.variant || 0, !!spec.mirror);
  const z = sc.zones;
  const rng = makeRng(String(spec.seed || spec.id) + (shrink < 1 ? '@' + shrink : '') + (attempt ? '#' + attempt : ''));
  const entries = [...(spec.cast || []).map((c) => (typeof c === 'string' ? { src: c } : { ...c })), { ...(typeof spec.hero === 'string' ? { src: spec.hero } : spec.hero), hero: true }];
  for (const e of entries) {
    const c = CATALOG.get(e.src);
    if (!c) throw new Error(`${spec.id}: ${e.src} is not in the catalogue`);
    if (c.refused) throw new Error(`${spec.id}: ${e.src} is REFUSED (${c.note})`);
    e.cat = c;
    e.place = e.at ? (e.place || c.places[0]) : placeFor(c, z, e.place);
    if (!e.place) throw new Error(`${spec.id}: ${e.src} has no zone in ${spec.setting} (${c.places.join('/')})`);
    // sizes (read on the first sheets, 2026-10-10): at the catalogue's own heights a scene read as scattered stickers and a
    // 60-unit drawing went to a black blob under the 7-unit stroke; the reviewed CBN scenes stand a hero at ~270 units
    // a building or a big tree is scenery-sized already (a barn at 1.35 × ate half the ground)
    // a road vehicle outdoors is bigger than a dog (read 2026-10-10: an ice-cream truck no bigger than the puppy)
    const kindK = c.kind === 'building' || (c.kind === 'plant' && c.h >= 180) ? 1.0 : (c.kind === 'vehicle' && !sc.indoor && c.places[0] === 'g' && c.h <= 130 && !/sleigh|kayak/.test(e.src)) ? 1.75 : 1.35;
    const vehicleOut = c.kind === 'vehicle' && !sc.indoor && c.places[0] === 'g';
    // small things stay small next to animals (read 2026-10-10: a football as big as the dog)
    const smallObj = !e.hero && (c.kind === 'object' || c.kind === 'food') && c.h <= 90 && (c.places[0] === 'g');
    let base = e.hero ? Math.min(260, Math.max(c.h * (spec.heroScale || 1.55), 0) / Math.max(1, aspectOf(e.src) / 1.15)) : c.h * (spec.scale || kindK);
    // INDOORS real sizes win (read 2026-10-10: a cat twice the size of the sofa, a teddy above the dresser, a hamster over its
    // bed): a room's hero is never blown up past 1.35 × its natural size, and furniture keeps a furniture size
    if (smallObj) base = c.h * 1.1;
    // tiny creatures stay tiny (read 2026-10-10: a ladybug half the size of the cow): a non-hero animal of catalogue height ≤ 70
    const tiny = !e.hero && c.kind === 'animal' && c.h <= 70;
    if (tiny) base = c.h * 0.95;
    if (e.hero && vehicleOut) base = Math.max(base, Math.min(260, c.h * 1.75));   // (a camper van smaller than the tent)
    if (e.hero && c.kind === 'building') base = Math.max(base, Math.min(270, c.h * 1.45));   // (a hero cabin smaller than the snowman)
    // furniture = the house's own big things (a robot or a rocking horse is a TOY: read 2026-10-10, a robot as tall as the bed)
    const FURN = /^(furniture bw|home bw|home bw 2|household bw|classroom bw|classroom bw 2|kitchen bw)\/|fireplace/;
    const furniture = sc.indoor && c.kind === 'object' && c.places[0] === 'g' && c.h >= 100 && FURN.test(e.src);
    // an OBJECT hero keeps an object's size, indoors and out (read 2026-10-10: a backpack bigger than the llama)
    const toyHero = e.hero && !furniture && c.kind === 'object';
    if (toyHero) base = Math.min(base, c.h * (sc.indoor ? 1.15 : 1.5));
    if (sc.indoor && e.hero) base = Math.min(base, c.h * 1.35, furniture ? 230 : 150);
    if (furniture) base = Math.min(Math.max(base, c.h * 1.75), sc.hy - 70);   // (read 2026-10-10: a bed no bigger than the hamster; never taller than the wall)
    // a dense drawing shrunk too far prints as a black blob (a barn, a fence, a hay stack read on the first farm sheet):
    // the shrink retries never take a drawing under its FLOOR
    const floor = tiny ? 52 : c.kind === 'person' ? 170 : furniture ? 165 : toyHero ? 90 : e.hero ? (sc.indoor ? 110 : 150) : c.kind === 'building' ? 160 : c.kind === 'plant' && c.h >= 180 ? 175 : /fence|hay/.test(e.src) ? 105 : e.place === 't' || e.place === 'w' ? 62 : (c.kind === 'object' || c.kind === 'food') && c.h <= 90 ? Math.max(52, c.h * 1.05) : 80;   // a cake on a counter is naturally smaller
    e.floor = floor;
    // the floors are a minimum SIZE, not a minimum height: a flat drawing (a skateboard, a sports car) keeps its own
    // proportions — its height floor is divided by its width ratio (read 2026-10-10: a skateboard as wide as the path)
    const flat = Math.sqrt(Math.max(1, aspectOf(e.src)));
    // furniture keeps its floor un-divided (a wide bed is a big thing); an indoor hero animal keeps its own small size
    const floorH = furniture ? floor : sc.indoor && e.hero && c.kind === 'animal' ? Math.min(floor, c.h * 1.3) / flat : floor / flat;
    const minH = (e.hero ? (sc.indoor && c.kind === 'animal' ? Math.min(150, c.h * 1.3) : 150) : 78) / flat;
    e.baseH = e.h || Math.max(floorH, (smallObj ? base : Math.max(minH, base)) * (e.hero ? Math.max(shrink, 0.85) : shrink));
  }
  const placed = [];
  const taken = [...(sc.zones.keepOut || []).map((b) => ({ box: b, keep: true })), ...(sc.zones.blocks || []).map((b) => ({ box: b, block: true }))];
  // big things first, the hero first of all (it chooses the front middle)
  const order = entries.slice().sort((a, b) => (!!b.hero - !!a.hero) || (b.baseH * aspectOf(b.src) * b.baseH - a.baseH * aspectOf(a.src) * a.baseH));
  for (const e of order) {
    let best = null;
    const tries = e.at ? 1 : 700;
    for (let t = 0; t < tries; t++) {
      let it;
      if (e.at) it = { src: e.src, x: e.at[0], y: e.at[1], h: e.baseH, anchor: e.place === 's' || e.place === 'w' || e.place === 'u' ? 'c' : undefined };
      else if (e.place === 'g') {
        const g = z.ground;
        // a building or a big tree stands in the BACK row (read 2026-10-10: a barn in front, smaller than the farmer)
        const back = !sc.indoor && (e.cat.kind === 'building' || (e.cat.kind === 'plant' && e.cat.h >= 180));
        // ...and a small thing stands in the FRONT half (read 2026-10-10: a bone and a skateboard on the horizon read as floating)
        const small = (e.cat.kind === 'object' || e.cat.kind === 'food') && e.cat.h <= 90;
        const y = e.hero ? g.y1 - rng.next() * Math.min(40, (g.y1 - g.y0) * 0.3) : back ? g.y0 + rng.next() * (g.y1 - g.y0) * 0.3 : small && !sc.indoor && !z.road ? g.y0 + (0.45 + 0.55 * rng.next()) * (g.y1 - g.y0) : g.y0 + rng.next() * (g.y1 - g.y0);
        const f = 0.84 + 0.16 * (y - g.y0) / Math.max(1, g.y1 - g.y0);
        const h = Math.max(e.baseH * f, Math.min(e.baseH, (e.floor || 0) / Math.sqrt(Math.max(1, aspectOf(e.src))))), w = h * aspectOf(e.src);
        const x = e.hero && !(z.blocks && z.blocks.length && !z.surfaces.some((q) => q.y < 400)) ? W / 2 + (rng.next() - 0.5) * 320 :   // (a picnic blanket in the middle: the hero stands beside it)
          EDGE + w / 2 + rng.next() * (W - 2 * EDGE - w);
        it = { src: e.src, x, y, h };
      } else if (e.place === 's' || e.place === 'w') {
        const b = e.place === 's' ? z.sky : z.wall; const h = e.baseH, w = h * aspectOf(e.src);
        it = { src: e.src, x: EDGE + w / 2 + rng.next() * (W - 2 * EDGE - w), y: b.y0 + rng.next() * Math.max(0, b.y1 - b.y0), h, anchor: 'c' };
      } else if (e.place === 't') {
        const s = z.surfaces[Math.floor(rng.next() * z.surfaces.length)]; const h = e.baseH, w = h * aspectOf(e.src);
        if (s.x1 - s.x0 < w) continue;
        it = { src: e.src, x: s.x0 + w / 2 + rng.next() * (s.x1 - s.x0 - w), y: s.y + 2, h };
      } else if (e.place === 'u') {
        const b = z.water; const h = e.baseH, w = h * aspectOf(e.src);
        it = { src: e.src, x: b.x0 + w / 2 + rng.next() * Math.max(0, b.x1 - b.x0 - w), y: b.y0 + rng.next() * (b.y1 - b.y0), h, anchor: 'c' };
      } else if (e.place === 'r' || e.place === 'l') {
        const h = e.place === 'l' ? Math.min(e.baseH, 150) : e.baseH, w = h * aspectOf(e.src);   // (a train on the rail filled half the picture)
        const y = e.place === 'r' ? z.road.y0 + rng.next() * (z.road.y1 - z.road.y0) : z.rail.y;
        it = { src: e.src, x: EDGE + w / 2 + rng.next() * (W - 2 * EDGE - w), y, h };
      } else if (e.place === 'a') {
        const f = z.float; const h = e.baseH, w = h * aspectOf(e.src);
        // a boat out on the water is further away: two thirds of its size
        it = { src: e.src, x: f.x0 + rng.next() * Math.max(0, f.x1 - f.x0), y: f.y, h: Math.min(h, Math.max(h * 0.8, 72)) };   // (0.66 made a rowboat a brown blob)
        void w;
      }
      if (!it) continue;
      if (e.flip != null) it.flip = e.flip; else if (!e.at && rng.next() < 0.5 && e.cat.kind !== 'sky') it.flip = true;
      const box = boxOf(it);
      // a sky / wall drawing keeps clear of the frame (the kite jammed into the corner)
      if (!inFrame(box, e.place === 's' || e.place === 'w' || e.place === 'u' ? 30 : EDGE)) continue;
      // a sky drawing stays clear of the horizon (read 2026-10-10: a kite standing on the path)
      if (e.place === 's' && !sc.indoor && box[3] > sc.hy - 24) continue;
      // ...and above every hill, dune and peak under it (read 2026-10-10: a cloud sitting on a hill)
      if (e.place === 's' && (z.mounds || []).some(([a, b, top]) => box[2] > a && box[0] < b && box[3] > top - 14)) continue;
      // a ground drawing never stands in a keep-out area (its FEET: the bottom band of its box)
      const feet = [box[0] + 6, box[3] - 10, box[2] - 6, box[3]];
      // ...and its body never covers water / a road it does not stand in (a tractor drawn over the pond)
      // (a drawing whose feet are IN FRONT of the water — below its far edge — may cover it, the way a child on the bank does)
      const ovK = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
      // ...and never hides more than a third of it (a fence in front of the pond hid the pond)
      const keepArea = (b) => (b[2] - b[0]) * (b[3] - b[1]);
      if (e.place === 'g' && taken.some((o) => o.keep && (overlaps(o.box, feet, 0) || ((!e.hero || box[3] < o.box[3] + 30) && overlaps(o.box, box, 6)) || (o.box[2] - o.box[0] < 450 && ovK(o.box, box) > keepArea(o.box) / 3)))) continue;
      // drawn furniture: a TABLE drawing stands on it (its feet on the top line), nothing else may cover it
      // (a floor drawing may stand in front of a counter's FRONT, never reach up over its top where things stand)
      if (taken.some((o) => o.block && e.place !== 't' && e.place !== 's' && e.place !== 'w' && overlaps(o.box, box, 4) && box[1] < o.box[1] + 30)) continue;
      if (taken.some((o) => o.block && (e.place === 's' || e.place === 'w') && overlaps(o.box, box, AIR))) continue;
      // depth: a GROUND drawing may tuck a little behind / in front of another ground drawing (≤ 18 % of either box, never
      // the hero, a clear 30-unit gap in depth so the front one is plainly in front); everything else keeps its air
      const area = (b) => Math.max(0, b[2] - b[0]) * Math.max(0, b[3] - b[1]);
      const ov = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
      const tuckOk = (o) => e.place === 'g' && o.place === 'g' && !o.hero && !e.hero && o.kind !== 'building' && e.cat.kind !== 'building' && Math.abs(o.box[3] - box[3]) >= 30 && ov(o.box, box) <= 0 * Math.min(area(o.box), area(box));   // no tucking (read 2026-10-10: a pig behind hay bales reads as SITTING on them)
      if (taken.some((o) => !o.keep && !o.block && overlaps(o.box, box, AIR) && !tuckOk(o))) continue;
      // never stacked (read 2026-10-10: a pelican's feet 9 units above a tanker's roof read as the pelican STANDING ON the
      // truck): a drawing never sits just above (< 15 units) another it overlaps sideways by more than half — feet touching a roof
      const stacked = (a, b) => { const xo = Math.min(a[2], b[2]) - Math.max(a[0], b[0]); if (xo <= 0.5 * Math.min(a[2] - a[0], b[2] - b[0])) return false; const g1 = b[1] - a[3], g2 = a[1] - b[3]; return (g1 >= -2 && g1 < 15) || (g2 >= -2 && g2 < 15); };
      const isStacked = e.place !== 's' && e.place !== 'w' && taken.some((o) => !o.keep && !o.block && o.place !== 's' && o.place !== 'w' && stacked(o.box, box));   // a last resort only: scored down
      if (e.at) { best = { it, box, score: 0 }; break; }
      // keep apart from what is placed (max-min distance between box centres), a little jitter for variety
      const cx = (box[0] + box[2]) / 2, cy = (box[1] + box[3]) / 2;
      let md = 400; for (const o of taken) if (!o.keep && !o.block) md = Math.min(md, Math.hypot(cx - (o.box[0] + o.box[2]) / 2, cy - (o.box[1] + o.box[3]) / 2));
      const score = md + rng.next() * 30 - (isStacked ? 500 : 0);
      if (!best || score > best.score) best = { it, box, score };
    }
    if (!best) throw new Error(`${spec.id}: no room for ${e.src} (${e.place})`);
    if (best.score < -300) STACKED.push(spec.id + ': ' + e.src);
    // ONE crayon per drawing (read 2026-10-10): lib/fd-scene colours parts by RANK and clamps every part past the plan's
    // end to its LAST colour, so a two-colour plan painted all but the largest part in the second crayon — a pink
    // rabbit, a black-headed dog, a black football. The first (main) colour paints the whole drawing; reviewed Color by
    // Number plans (data/cbn/lineart-colours.js BG) still win for the drawings they cover.
    best.it.colour = e.colour || PLANS[e.src] || [e.cat.colours[0]];
    // a colourful page (read 2026-10-10: a toy corner painted red six times over): an object with other natural colours in
    // its catalogue row takes the least-used of them once its first colour is already on two drawings (never an animal or
    // a person — their colour is what they are)
    if (!e.colour && !PLANS[e.src] && e.cat.kind !== 'animal' && e.cat.kind !== 'person' && e.cat.colours.length > 1) {
      const used = {}; for (const p of placed) { const c = Array.isArray(p.it.colour) && p.it.colour.length === 1 ? p.it.colour[0] : null; if (c) used[c] = (used[c] || 0) + 1; }
      const first = e.cat.colours[0];
      if ((used[first] || 0) >= 2) {
        const alt = e.cat.colours.slice(1).filter((c) => c !== 'none').sort((a, b) => (used[a] || 0) - (used[b] || 0))[0];
        if (alt && (used[alt] || 0) < used[first]) best.it.colour = [alt];
      }
    }
    // never the crayon of what is behind it (read 2026-10-10: a light-blue whale vanished into the light-blue sea; a green
    // frog on green grass): a one-crayon drawing standing on / in an area of its own colour takes the neighbouring shade
    if (Array.isArray(best.it.colour) && best.it.colour.length === 1) {
      const behind = behindColour(sc, e.place, best.box);
      // (a grey ANIMAL turns brown, never blue: a blue cat on the grey lane, read 2026-10-10)
      if (behind && behind === best.it.colour[0] && SHADE[behind]) best.it.colour = [behind === 'grey' && e.cat.kind === 'animal' ? 'brown' : SHADE[behind]];
    }
    if (e.fixed) best.it.fixed = true;
    if (e.hero) best.it.hero = true;
    best.it.x = Math.round(best.it.x); best.it.y = Math.round(best.it.y); best.it.h = Math.round(best.it.h);
    // line weight by size: 7 units from 220 up, down to 4 at 90 (a 7-unit line drowned a small farmer's face)
    best.it.stroke = strokeFor(best.box);
    placed.push({ e, it: best.it, box: best.box });
    taken.push({ box: best.box, place: e.place, hero: !!e.hero, kind: e.cat.kind });
  }
  // draw order: sky / wall first, then back to front by the bottom of the box; the hero last
  const rank = (p) => (p.e.place === 's' || p.e.place === 'w' ? 0 : 1);
  const items = placed.filter((p) => !p.e.hero).sort((a, b) => rank(a) - rank(b) || a.box[3] - b.box[3]).map((p) => p.it);
  items.push(placed.find((p) => p.e.hero).it);
  return { id: spec.id, set: 'fdx', kind: 'scene', theme: spec.setting, setting: spec.setting, variant: spec.variant || 0, hy: sc.hy, names: spec.names || {}, stroke: 7, lines: sc.lines, fixed: sc.fixed, zones: sc.zones, items, level: spec.level || 2 };
}
const STACKED = [];   // scenes where a drawing had to stand on another (reported by tools/fdx-stale.js callers)
module.exports = { layoutScene, boxOf, aspectOf, strokeFor, STACKED };
