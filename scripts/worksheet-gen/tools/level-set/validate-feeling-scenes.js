#!/usr/bin/env node
/**
 * validate-feeling-scenes.js — Level Set 2026-09-28 (Feelings): checks a picture panel's NEW situation
 * scenes and SCENE SETS against the K-331 page rules before anything is imported.
 *
 *   node tools/level-set/validate-feeling-scenes.js <panel.json>
 *
 * panel.json = { scenes: [{ id, objects:[{theme,noun}], feeling, alsoPlausible:[], vetoable, why }],
 *                sets: [{ id, scenes:[ids] }] }
 * Rules (the ones _buildScene enforces, plus the Level Set ones):
 *   - feeling ∈ the six readable faces; alsoPlausible ⊂ them and never the feeling itself;
 *   - every object is in the local picture cache, never the emotions dir, never a published scene's object;
 *   - a scene id is unique and not a published id;
 *   - a set: 6 scenes, ≥ 3 feelings, ≤ 2 per feeling, no object twice, no colour picture + its B&W twin;
 *   - every scene has ≥ 2 decoys at 3 choices (six faces minus the feeling minus alsoPlausible);
 *   - the sets are pairwise disjoint (a copy never repeats another copy's scene).
 * Exit 0 only when everything passes.
 */
'use strict';
const fs = require('fs');
const resolve = require('../../image-cache/resolve.js');
const { bank } = require('../../lib/b3-common.js');

const ACCEPTED = ['happy', 'sad', 'angry', 'scared', 'surprised', 'tired'];
const file = process.argv[2];
if (!file) throw new Error('usage: validate-feeling-scenes.js <panel.json>');
const P = JSON.parse(fs.readFileSync(file, 'utf8'));
const m = resolve.manifest();
const pub = bank('feelings', 'en').scenes;
const pubIds = new Set(pub.map((s) => s.id));
const pubObjs = new Set(pub.flatMap((s) => s.objects.map((o) => `${o.theme}/${o.noun}`)));
// a B&W directory and the colour theme it mirrors share nouns; two pictures of one noun on a page = a twin
const isBw = (t) => /\bbw(\s\d+)?$/i.test(t);
const fails = [];
const byId = new Map();
for (const s of P.scenes || []) {
  const tag = `scene ${s.id}`;
  if (!s.id || byId.has(s.id)) fails.push(`${tag}: missing or duplicate id`);
  if (pubIds.has(s.id)) fails.push(`${tag}: id is a published scene`);
  byId.set(s.id, s);
  if (!ACCEPTED.includes(s.feeling)) fails.push(`${tag}: feeling "${s.feeling}" is not one of ${ACCEPTED.join('/')}`);
  for (const a of s.alsoPlausible || []) if (!ACCEPTED.includes(a) || a === s.feeling) fails.push(`${tag}: alsoPlausible "${a}" invalid`);
  if (!(s.objects || []).length || s.objects.length > 2) fails.push(`${tag}: 1-2 objects`);
  for (const o of s.objects || []) {
    const ref = `${o.theme}/${o.noun}`;
    if (!m.themes[o.theme] || !m.themes[o.theme].nouns[o.noun]) fails.push(`${tag}: ${ref} not in the picture cache`);
    if (o.theme === 'emotions') fails.push(`${tag}: ${ref} is a face, not a situation`);
    if (pubObjs.has(ref)) fails.push(`${tag}: ${ref} is already a published scene's picture`);
  }
  const decoys = ACCEPTED.filter((f) => f !== s.feeling && !(s.alsoPlausible || []).includes(f));
  if (decoys.length < 2) fails.push(`${tag}: only ${decoys.length} decoys at 3 choices`);
}
const inSet = new Map();
for (const set of P.sets || []) {
  const tag = `set ${set.id}`;
  const sc = (set.scenes || []).map((id) => byId.get(id));
  if (sc.some((s) => !s)) { fails.push(`${tag}: unknown scene id`); continue; }
  if (sc.length !== 6) fails.push(`${tag}: ${sc.length} scenes (want 6)`);
  const per = {};
  sc.forEach((s) => { per[s.feeling] = (per[s.feeling] || 0) + 1; });
  if (Object.keys(per).length < 3) fails.push(`${tag}: ${Object.keys(per).length} feelings < 3`);
  for (const [f, n] of Object.entries(per)) if (n > 2) fails.push(`${tag}: ${n} scenes for ${f} > 2`);
  const objs = sc.flatMap((s) => s.objects.map((o) => o));
  const refs = objs.map((o) => `${o.theme}/${o.noun}`);
  if (new Set(refs).size !== refs.length) fails.push(`${tag}: an object appears twice`);
  const nouns = objs.map((o) => o.noun.replace(/[_\s]\d+$/, ''));
  for (let i = 0; i < objs.length; i++) for (let j = i + 1; j < objs.length; j++) {
    if (nouns[i] === nouns[j] && isBw(objs[i].theme) !== isBw(objs[j].theme)) fails.push(`${tag}: ${refs[i]} and ${refs[j]} are a colour/B&W twin`);
  }
  for (const s of sc) {
    if (inSet.has(s.id)) fails.push(`${tag}: scene ${s.id} is already in set ${inSet.get(s.id)}`);
    inSet.set(s.id, set.id);
  }
  console.log(`${tag}: ${sc.map((s) => s.id + '=' + s.feeling).join(' ')}`);
}
const unused = [...byId.keys()].filter((id) => !inSet.has(id));
if (unused.length) console.log(`scenes in no set: ${unused.join(' ')}`);
for (const f of fails) console.log('FAIL ' + f);
console.log(fails.length ? `${fails.length} problem(s)` : `every scene and set passes (${byId.size} scenes, ${(P.sets || []).length} sets)`);
process.exit(fails.length ? 1 : 0);
