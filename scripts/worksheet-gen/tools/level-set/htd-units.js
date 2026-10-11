#!/usr/bin/env node
/**
 * htd-units.js — the How to Draw LEVEL SET units (2026-10-11): every lesson of data/htdx (tools/htd-build.js --set=htdx,
 * the interior engine) that the human read did not refuse (data/htdx/review.js), written to data/htdx/units.js as
 * `lsx-<slug>` units. A unit carries its lesson file, its library drawing, its Color by Number / Find the Differences
 * scene (the scene face draws the drawing back into it), its step count, its vocabulary key (data/htdx/names.js) and its
 * TIER — the level its drawing suits:
 *   easy    ≤ 4 steps and ≤ 45 parts (a few big shapes: a penguin, a cupcake, a bus)
 *   complex 5 steps with ≥ 60 parts, or ≥ 100 parts, or read as complex on the contact sheets (fire truck, log cabin …)
 *   mid     the rest
 *   node tools/level-set/htd-units.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const DIR = path.join(ROOT, 'data', 'htdx');
const { REFUSED } = require(path.join(DIR, 'review.js'));
// read on the contact sheets 2026-10-11: dense scenes / machines a K child cannot copy at level 1 or 2
const READ_COMPLEX = new Set(['sea-life-bw-2-hermit-crab', 'travel-and-holiday-bw-log-cabin', 'travel-and-holiday-bw-campfire', 'vehicles-bw-3-fire-truck',
  'vehicles-bw-3-ice-cream-truck', 'vehicles-bw-garbage-truck', 'vehicles-bw-3-police-car', 'vehicles-bw-ambulance', 'zoo-animals-bw-porcupine']);
// the ORIGINAL Find the Differences scenes (data/fdx, composed + read 2026-10-10) whose hero is this drawing: the scene face's first choice
const FDX = new Map();
for (const sc of require(path.join(ROOT, 'data', 'fdx', 'scenes.js')).SCENES) for (const h0 of [].concat(sc.hero)) { const h = String((h0 && h0.src) || h0).toLowerCase(); if (!FDX.has(h)) FDX.set(h, sc); }
/** the dotted-shape guides a Level Set page may show: shapes ≥ 4 % of the drawing's box (a smaller one reads as a smudge),
 *  and how much of the drawing they cover (inside the outline: the share of ink-box points inside a guide that are also
 *  inside the drawing's own silhouette box rows) — a set of guides that covers < 35 % is not a way to start the drawing */
function guideInfo(S) {
  const [x0, y0, x1, y1] = S.bbox, bw = x1 - x0, bh = y1 - y0, A = bw * bh;
  const area = (g) => (g.kind === 'ellipse' ? Math.PI * g.rx * g.ry : g.box.w * g.box.h);
  const big = S.shapes.filter((g) => g.kind && area(g) >= 0.04 * A);
  const inside = (g, x, y) => {
    if (g.kind === 'ellipse') { const a = -g.angle * Math.PI / 180, dx = x - g.cx, dy = y - g.cy, u = dx * Math.cos(a) - dy * Math.sin(a), v = dx * Math.sin(a) + dy * Math.cos(a); return (u * u) / (g.rx * g.rx) + (v * v) / (g.ry * g.ry) <= 1; }
    return x >= g.box.x && x <= g.box.x + g.box.w && y >= g.box.y && y <= g.box.y + g.box.h;
  };
  let hit = 0, n = 0;
  for (let i = 0; i < 40; i++) for (let j = 0; j < 40; j++) { const x = x0 + (i + 0.5) * bw / 40, y = y0 + (j + 0.5) * bh / 40; n++; if (big.some((g) => inside(g, x, y))) hit++; }
  return { bigShapes: big.length, guideCover: +(hit / n).toFixed(2) };
}
const keyOf = (src) => String(src).split('/').pop().replace(/_\d+$/, '').toLowerCase().replace(/_/g, '-');
const units = [];
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json') && /-bw/.test(x)).sort()) {
  const S = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  if (S.refused || REFUSED[S.slug]) continue;
  const n = S.steps.length, parts = S.stats.parts;
  if (n < 3 || S.stats.missing || S.stats.extra || S.stats.dup) continue;
  const scene = path.join(ROOT, 'data', 'fd', S.sceneId + '.json');
  let heroItem = null;
  if (fs.existsSync(scene)) { const sc = JSON.parse(fs.readFileSync(scene, 'utf8')); const h = sc.items.find((it) => it.src === S.src); heroItem = h ? h.idx : null; }
  // the scene face draws into the RICH scene (data/fd/<id>-rich.json: the reviewed scene densified with its theme's props) —
  // the base scenes repeat one garden (cloud · sun · tulip · pond) across dozens of drawings
  const rich = path.join(ROOT, 'data', 'fd', S.sceneId + '-rich.json');
  let richScene = null, richHero = null, richSig = null;
  if (fs.existsSync(rich)) { const sc = JSON.parse(fs.readFileSync(rich, 'utf8')); const h = sc.items.find((it) => it.src === S.src); if (h) { richScene = S.sceneId + '-rich'; richHero = h.idx; richSig = sc.items.filter((it) => it.idx !== h.idx).map((it) => keyOf(it.src)).sort().join(','); } }
  let fdxScene = null, fdxHero = null, fdxSetting = null, fdxRest = null;
  const fx = FDX.get(String(S.src).toLowerCase());
  if (fx && fs.existsSync(path.join(ROOT, 'data', 'fd', fx.id + '.json'))) { const sc = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'fd', fx.id + '.json'), 'utf8')); const h = sc.items.find((it) => String(it.src).toLowerCase() === String(S.src).toLowerCase()); if (h) { fdxScene = fx.id; fdxHero = h.idx; fdxSetting = fx.setting; fdxRest = sc.items.filter((it) => it.idx !== h.idx).map((it) => keyOf(it.src)); } }
  const tier = READ_COMPLEX.has(S.slug) || (n === 5 && parts >= 60) || parts >= 100 ? 'complex' : n <= 4 && parts <= 45 ? 'easy' : n === 5 ? 'complex' : 'mid';
  units.push({ slug: 'lsx-' + S.slug, htdx: S.slug, src: S.src, key: keyOf(S.src), steps: n, parts, tier, fdScene: heroItem != null ? S.sceneId : null, heroItem, richScene, richHero, richSig, fdxScene, fdxHero, fdxSetting, fdxRest,
    aspect: +((S.bbox[2] - S.bbox[0]) / (S.bbox[3] - S.bbox[1])).toFixed(2), shapes: S.shapes.filter((x) => x.kind).length, ...guideInfo(S), theme: String(S.src).split('/')[0] });
}
const out = `/** data/htdx/units.js — GENERATED by tools/level-set/htd-units.js (${units.length} Level Set units; do not hand-edit). */\n'use strict';\nconst UNITS = ${JSON.stringify(units, null, 1)};\nmodule.exports = { UNITS };\n`;
fs.writeFileSync(path.join(DIR, 'units.js'), out);
const t = {}; for (const u of units) t[u.tier] = (t[u.tier] || 0) + 1;
console.log(units.length, 'units', t, 'scenes', units.filter((u) => u.fdScene).length, 'rich', units.filter((u) => u.richScene).length, 'fdx', units.filter((u) => u.fdxScene).length, 'keys', new Set(units.map((u) => u.key)).size);
