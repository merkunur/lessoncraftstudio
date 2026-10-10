#!/usr/bin/env node
/**
 * fdx-distinct.js — the Find the Differences Level Set scenes must not be similar (operator 2026-10-10). FAILS when:
 *   (1) two scenes share a hero drawing;
 *   (2) one setting × variant × mirror is used more than MAX_LAYOUT times;
 *   (3) two scenes share TWO or more drawings and their casts overlap by more than MAX_JACCARD (sky fillers — sun, cloud,
 *       moon, star, snowflake — do not count);
 *   (4) two scenes LOOK alike: their line renders (data/fd/<id>.json, 48 × 45 greyscale) differ by less than MIN_PIX
 *       (mean absolute difference, 0-255) — the measure a reader applies when two thumbnails sit side by side.
 * --poison runs each rule against a planted defect and must FAIL four times; the clean run must PASS.
 *   node qa/fdx-distinct.js [--poison]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const F = require('../lib/fd-scene.js');
const { SCENES } = require('../data/fdx/scenes.js');
const MAX_LAYOUT = 4, MAX_JACCARD = 0.30, MIN_PIX = 9;
const FILLER = /\/(sun|cloud|cloudy|moon|star|sky|snowflake)$/;
const heroOf = (s) => (typeof s.hero === 'string' ? s.hero : s.hero.src);
const castOf = (s) => new Set(s.cast.map((c) => (typeof c === 'string' ? c : c.src)).filter((c) => !FILLER.test(c)));

async function thumbs(list) {
  const out = new Map();
  for (const s of list) {
    const f = path.join(__dirname, '..', 'data', 'fd', s.id + '.json');
    if (!fs.existsSync(f)) continue;
    const sc = JSON.parse(fs.readFileSync(f, 'utf8'));
    const { data } = await sharp(Buffer.from(F.renderPanel(sc, [], { mode: 'line', width: 96 }))).greyscale().resize(48, 45, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
    out.set(s.id, data);
  }
  return out;
}
function check(list, th) {
  const fails = [];
  const heroes = new Map();
  for (const s of list) { const h = heroOf(s); if (heroes.has(h)) fails.push(`hero ${h} in ${heroes.get(h)} and ${s.id}`); heroes.set(h, s.id); }
  const lay = new Map();
  for (const s of list) { const k = `${s.setting}/${s.variant || 0}/${s.mirror ? 'm' : ''}`; lay.set(k, (lay.get(k) || 0) + 1); }
  for (const [k, n] of lay) if (n > MAX_LAYOUT) fails.push(`layout ${k} used ${n} times (max ${MAX_LAYOUT})`);
  const casts = list.map((s) => [s.id, castOf(s)]);
  for (let i = 0; i < casts.length; i++) for (let j = i + 1; j < casts.length; j++) {
    const a = casts[i][1], b = casts[j][1]; const inter = [...a].filter((x) => b.has(x)).length;
    const jac = inter < 2 ? 0 : inter / (a.size + b.size - inter || 1);   // two shared drawings at least (one shared tree is not a likeness)
    if (jac > MAX_JACCARD) fails.push(`cast ${casts[i][0]} ~ ${casts[j][0]} jaccard ${jac.toFixed(2)}`);
  }
  if (th) {
    const ids = [...th.keys()];
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      const a = th.get(ids[i]), b = th.get(ids[j]); let d = 0; for (let k = 0; k < a.length; k++) d += Math.abs(a[k] - b[k]);
      d /= a.length;
      if (d < MIN_PIX) fails.push(`look ${ids[i]} ~ ${ids[j]} mean diff ${d.toFixed(1)}`);
    }
  }
  return fails;
}
(async () => {
  const th = await thumbs(SCENES);
  if (process.argv.includes('--poison')) {
    const a = SCENES[0], b = SCENES[1];
    const poisons = [
      ['hero', [...SCENES, { ...b, id: 'p-hero', hero: heroOf(a), cast: [] }], null],
      ['layout', [...SCENES, ...Array.from({ length: MAX_LAYOUT + 1 }, (_, i) => ({ ...a, id: 'p-lay' + i, hero: 'p' + i, cast: ['x' + i], setting: 'zz', variant: 0, mirror: false }))], null],
      ['cast', [...SCENES, { ...a, id: 'p-cast', hero: 'p-cast-hero' }], null],
      ['look', SCENES, new Map([...th, ['p-look', th.get(a.id)]])],
    ];
    let killed = 0;
    for (const [name, list, t] of poisons) { const f = check(list, t || th); const hit = f.some((x) => x.startsWith(name)); console.log(`poison ${name}: ${hit ? 'FAILS (killed)' : 'PASSES (SURVIVED)'}`); if (hit) killed++; }
    console.log(`${killed}/${poisons.length} poisons killed`); process.exit(killed === poisons.length ? 0 : 1);
  }
  const fails = check(SCENES, th);
  console.log(`${SCENES.length} scenes, ${th.size} rendered — ${fails.length ? 'FAIL' : 'PASS'}`);
  for (const f of fails) console.log('  ' + f);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
