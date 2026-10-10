#!/usr/bin/env node
/**
 * fdx-allocate.js — Find the Differences Level Set (2026-10-10): which ORIGINAL scene (data/fdx) goes on which face × level
 * copy, and whether that copy is painted. Every scene is used ONCE (operator: "the scenes shouldn't be similar").
 *
 * For every face × level × candidate scene (a pair of scenes of one setting for the two-pair faces) the real page builder
 * runs SEEDS times (spec.build, English, screen + key too) — a candidate is FIT when every seed builds and, over the
 * seeds, the hero changes on 20-80 % of pages (unless the face cannot change it) and no quadrant takes more than 40 % of
 * the rings. Scenes are offered by density: level 1 ← sparse, level 2 ← medium, level 3 ← dense, then the neighbour.
 * Greedy, scarcest slot first. Writes data/fdx/allocation.json:
 *   { faces: { <specId>: { <level>: [{ copy, unit }] } }, colour: n, line: n, unused: [ids] }
 * A copy's unit ends in '@c' when the page is painted (types/k/K-395 planFor). The colour face is painted always; the
 * others alternate so the batch is half painted, half black-and-white.
 *   node tools/level-set/fdx-allocate.js [--per=6] [--seeds=24]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { makeRng } = require('../../lib/rng.js');
const { SCENES } = require('../../data/fdx/scenes.js');
const { quadrantOf } = require('../../lib/fd-compose.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const PER = +arg('per', 6), SEEDS = +arg('seeds', 24);
const ROOT = path.join(__dirname, '..', '..');
const load = (dir, id) => require(path.join(ROOT, 'types', dir, fs.readdirSync(path.join(ROOT, 'types', dir)).find((f) => f.startsWith(id + '-'))));
const FACES = [['k', 'K-395'], ['k', 'K-397'], ['k', 'K-398'], ['g1', 'G1-412'], ['g2', 'G2-388'], ['g1', 'G1-413'], ['g1', 'G1-414'], ['g1', 'G1-415'], ['k', 'K-399'], ['k', 'K-400'], ['g2', 'G2-389']];
const PAIR = new Set(['seven', 'ten-pairs', 'mirror-pair']);
const have = SCENES.filter((s) => fs.existsSync(path.join(ROOT, 'data', 'fd', s.id + '.json')));
const byId = new Map(have.map((s) => [s.id, s]));

function fit(spec, lv, unit) {
  const d = spec.difficulty[lv], mode = d.mode;
  let hero = 0, rings = 0; const quad = [0, 0, 0, 0];
  for (let v = 1; v <= SEEDS; v++) {
    for (const extra of [{}]) {
      try {
        const rng = makeRng('alloc|' + spec.id + '|' + lv + '|' + unit + '|' + v);
        const b = spec.build({ difficulty: lv, locale: 'en', unit }, { rng, variant: 2, seedVariant: v, ...extra });
        void b;
      } catch (e) { return { ok: false, why: e.message.slice(0, 90) }; }
    }
    const P = require(path.join(ROOT, 'types', 'k', 'K-395-find-the-differences.js'));
    const pl = P.planFor(d, mode, unit.includes('|') ? unit.split('|') : unit);
    let comp; try { comp = P.composeWithWindows(pl, makeRng('alloc2|' + spec.id + '|' + lv + '|' + unit + '|' + v)).comp; } catch (e) { return { ok: false, why: e.message.slice(0, 90) }; }
    for (const p of comp.panels) {
      // the changed picture must still be a picture: removing 3 of 5 drawings left an empty field (K-399 L1, read
      // 2026-10-10) — at most 40 % of the drawings go, and at least 3 real (non-sky) drawings stay
      const gone = new Set(p.ops.filter((c) => c.kind === 'remove').map((c) => c.item));
      const stay = p.scene.items.filter((l) => !gone.has(l.idx) && !/\/(sun|cloud|cloudy|moon|star|sky|snowflake)$/.test(l.src || ''));
      // ...and by AREA (read 2026-10-10: a bedroom lost its bed and its window — 2 of 5 drawings, but the room was empty)
      const ar = (l) => (l.bbox[2] - l.bbox[0]) * (l.bbox[3] - l.bbox[1]);
      const goneArea = p.scene.items.filter((l) => gone.has(l.idx)).reduce((a, l) => a + ar(l), 0), allArea = p.scene.items.reduce((a, l) => a + ar(l), 0);
      if (goneArea > 0.35 * allArea) return { ok: false, why: 'empties the picture (' + Math.round(100 * goneArea / allArea) + ' % of the drawing area removed)' };
      if (gone.size > 0.4 * p.scene.items.length || stay.length < 3) return { ok: false, why: 'empties the picture (' + gone.size + ' of ' + p.scene.items.length + ' removed)' };
      const hIdx = (p.scene.items.find((l) => l.hero) || {}).idx;
      if (p.ops.some((c) => c.item === hIdx)) hero++;
      p.rings.forEach((r) => { quad[quadrantOf(r, 600, 560)]++; rings++; });
    }
  }
  const panels = unit.includes('|') ? 2 : 1;
  const heroShare = hero / (SEEDS * panels), qmax = Math.max(...quad) / Math.max(1, rings);
  const heroFree = mode === 'missing' || mode === 'pairs';
  if (!heroFree && (heroShare < 0.15 || heroShare > 0.85)) return { ok: false, why: 'hero ' + heroShare.toFixed(2) };
  if (qmax > 0.42) return { ok: false, why: 'quadrant ' + qmax.toFixed(2) };
  return { ok: true, heroShare, qmax };
}

const DENS = { 1: [1, 2, 3], 2: [2, 1, 3], 3: [3, 2, 1] };   // preference order; levels also differ by change size + kinds, so a neighbour density is a valid fallback
const slots = [];
for (const [dir, id] of FACES) {
  const spec = load(dir, id);
  for (const lv of [1, 2, 3]) slots.push({ spec, id, lv, mode: spec.difficulty[lv].mode });
}
// candidates per slot
const t0 = Date.now();
for (const s of slots) {
  const cands = [];
  // ten differences on two pictures need busy scenes at every level (its levels differ by change size and kinds)
  const dens = s.mode === 'ten-pairs' || s.mode === 'pairs' ? [3, 2, 1] : DENS[s.lv];
  const pool = dens.flatMap((dl, rank) => have.filter((x) => x.level === dl).map((x) => ({ x, rank })));
  if (PAIR.has(s.mode)) {
    const bySet = {};
    for (const { x, rank } of pool) (bySet[x.setting] = bySet[x.setting] || []).push({ x, rank });
    for (const list of Object.values(bySet)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const u = list[i].x.id + '|' + list[j].x.id;
      cands.push({ unit: u, ids: [list[i].x.id, list[j].x.id], rank: Math.max(list[i].rank, list[j].rank) });
    }
  } else for (const { x, rank } of pool) cands.push({ unit: x.id, ids: [x.id], rank });
  s.cands = cands;
}
// greedy: scarcest slot first, one copy at a time, each scene once
const used = new Set();
const out = {}; const reasons = {};
const tested = new Map();
const test = (s, c) => { const k = s.id + '|' + s.lv + '|' + c.unit; if (!tested.has(k)) tested.set(k, fit(s.spec, s.lv, c.unit)); return tested.get(k); };
let progress = true;
while (progress) {
  progress = false;
  const open = slots.filter((s) => ((out[s.id] || {})[s.lv] || []).length < PER);
  // the two-scene faces and the close-up face first (they need busy scenes, and have many candidate PAIRS, so a
  // fewest-candidates order served them last and starved them), then the rest, scarcest first, emptiest slot first
  const hard = (x) => (PAIR.has(x.mode) || x.mode === 'pairs' ? 0 : 1);
  const fill = (x) => ((out[x.id] || {})[x.lv] || []).length;
  open.sort((a, b) => fill(a) - fill(b) || hard(a) - hard(b) || a.cands.filter((c) => !c.ids.some((i) => used.has(i))).length - b.cands.filter((c) => !c.ids.some((i) => used.has(i))).length);
  for (const s of open) {
    const free = s.cands.filter((c) => !c.ids.some((i) => used.has(i))).sort((a, b) => a.rank - b.rank);
    for (const c of free) {
      const r = test(s, c);
      if (!r.ok) { (reasons[s.id + ' L' + s.lv] = reasons[s.id + ' L' + s.lv] || []).push(c.unit + ': ' + r.why); continue; }
      ((out[s.id] = out[s.id] || {})[s.lv] = out[s.id][s.lv] || []).push({ unit: c.unit });
      c.ids.forEach((i) => used.add(i));
      progress = true;
      break;
    }
    if (progress) break;
  }
}
// copies, painted or not: the colour face always; the others spread evenly so the batch is half and half
const order = [];
for (const [dir, id] of FACES) { const spec = load(dir, id); for (const lv of [1, 2, 3]) ((out[id] || {})[lv] || []).forEach((c, i) => order.push({ id, lv, i, colourFace: spec.difficulty[lv].mode === 'colour' })); }
const total = order.length, fixedColour = order.filter((o) => o.colourFace).length;
const others = order.filter((o) => !o.colourFace), need = Math.max(0, Math.round(total / 2) - fixedColour);
const paintedSet = new Set(); others.forEach((o, k) => { if (Math.floor((k + 1) * need / others.length) > Math.floor(k * need / others.length)) paintedSet.add(o); });
let colour = 0, line = 0;
const faces = {};
for (const [, id] of FACES) {
  let copy = 2;
  faces[id] = {};
  for (const lv of [1, 2, 3]) {
    faces[id][lv] = ((out[id] || {})[lv] || []).map((c, i) => {
      const o = order.find((x) => x.id === id && x.lv === lv && x.i === i);
      const painted = o.colourFace || paintedSet.has(o);
      if (painted) colour++; else line++;
      const unit = painted && !o.colourFace ? c.unit.split('|').map((u) => u + '@c').join('|') : c.unit;
      return { copy: copy++, unit };
    });
  }
}
const unusedIds = have.map((s) => s.id).filter((i) => !used.has(i));
fs.writeFileSync(path.join(ROOT, 'data', 'fdx', 'allocation.json'), JSON.stringify({ faces, colour, line, unused: unusedIds }, null, 1));
for (const [id, lvs] of Object.entries(faces)) console.log(id, Object.entries(lvs).map(([lv, l]) => 'L' + lv + ':' + l.length).join(' '));
console.log(`pages ${colour + line} (colour ${colour}, line ${line}), scenes used ${used.size}/${have.length}, ${Math.round((Date.now() - t0) / 1000)} s`);
for (const [k, v] of Object.entries(reasons)) if (((out[k.split(' ')[0]] || {})[+k.split(' L')[1]] || []).length < PER) console.log('  short', k, v.slice(0, 4).join(' · '));
fs.writeFileSync(path.join(process.env.TEMP || ".", "fdx-alloc-reasons.json"), JSON.stringify(reasons, null, 1));
