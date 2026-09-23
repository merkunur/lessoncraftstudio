#!/usr/bin/env node
/**
 * gen-b6-waves.js — nt5-F wave files, two per locale:
 *   waves/wave-b6-<loc>.json     the 20 base specs
 *   waves/wave-b6var-<loc>.json  the 100 variation faces
 *
 *   node tools/gen-b6-waves.js [--locales=en,de,…] [--dry-run]
 *
 * EVERY themed spec is pinned through `themeOverrides` (the b2var rule: nothing is
 * left to the positional round-robin, which shifted between June and September and
 * put G1-247 on toys after eight panels had written copy about fruits).
 *
 * THEMES ARE MEASURED, NOT ASSUMED — and the measurement is the spec's own build().
 * Per family a preference list (design §1 + the face records: G1-318 rides a racer
 * theme; G2-318 an animal-facts exemplar theme; G2-319 an allowlisted set; K-318's
 * tiers face has an arc-printable pool only on around-the-house in en; K-324's
 * syllable cards stay on animals in en/da; G3-380 shares on the exemplar unit only)
 * is rotated by the face's position so sibling faces vary their theme where the data
 * allows (the deck slugs then differ by theme as well as by id); each candidate is
 * tried with a pure `spec.build({theme, difficulty:2, locale}, {rng})` and the FIRST
 * that builds is pinned. Themeless specs are measured the same way with theme null.
 * A spec that builds on NO candidate is a REFUSAL: it is dropped from that locale's
 * wave and listed under `_refused` (id → the last build error) so the hub-gate
 * expectation is lowered explicitly, never padded. Nothing here guesses.
 *
 * Non-en locales measure against the locale's bank blocks, so run this again after
 * every apply-b6-locale (Phase 4) — until then those waves carry only what builds.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { loadAllTypes } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const alloc = require('../../../docs/worksheet-gen/b6-designs/_records/b6var-id-allocation.json');
const { FAMILIES } = require('./gen-b6var-specs.js');

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const DRY = process.argv.includes('--dry-run');
const LOCALES = arg('locales', 'en,de,es,fr,pt,it,nl,sv,da,no,fi').split(',');

// The general rotation (colour themes with the deepest label-safe pools first, minus the
// ones the records refuse for picture-word types: colors/emotions/shapes/space/weather).
const GENERAL = ['animals', 'fruits', 'vehicles', 'toys', 'farm animals', 'zoo animals', 'pets', 'clothing',
  'around the house', 'At the Supermarket', 'forest creatures', 'ocean life', 'birds 2', 'kitchen tools', 'classroom', 'beach', 'camping'];

// Per-family preference (rotated by face position); per-spec HARD lists override.
// nt5-F theme rulings (design finals §1): all ten families are THEMELESS (themeAxis off; pictures, where a face
// uses any, are pinned per bank item via b3-picture-index / fileUri). No theme preference is needed; a spec that ever
// turns themed must be added here with its measured candidate list.
const PREF = {};
const HARD = {};

const famOf = new Map();
for (const [fam] of FAMILIES) famOf.set(fam, fam);
for (const f of alloc.faces) famOf.set(f.id, f.family);
const faceIdx = new Map(alloc.faces.map((f) => [f.id, f.face]));   // 1..5; base = 0

function candidates(spec) {
  const fam = famOf.get(spec.id);
  if (HARD[spec.id]) return HARD[spec.id];
  const pref = PREF[fam] || [];
  const i = faceIdx.get(spec.id) || 0;
  const rot = pref.length ? pref.slice(i % pref.length).concat(pref.slice(0, i % pref.length)) : [];
  return [...new Set([...rot, ...GENERAL])];
}

function tryBuild(spec, theme, locale) {
  try {
    const rng = makeRng(instanceSeed({ typeId: spec.id, theme, difficulty: 2, seedEpoch: 1 }));
    spec.build({ theme, difficulty: 2, locale, unit: null }, { rng });
    return null;
  } catch (e) { return String(e.message || e).slice(0, 160); }
}

function measure(specs, locale) {
  const pins = {}, refused = {}, types = [];
  for (const spec of specs) {
    const themed = spec.themeAxis && spec.themeAxis.applicable;
    if (!themed) {
      const err = tryBuild(spec, null, locale);
      if (err) refused[spec.id] = err; else types.push(spec.id);
      continue;
    }
    let last = null, pinned = null;
    for (const t of candidates(spec)) {
      const err = tryBuild(spec, t, locale);
      if (!err) { pinned = t; break; }
      last = t + ': ' + err;
    }
    if (pinned) { pins[spec.id] = pinned; types.push(spec.id); } else refused[spec.id] = last || 'no candidate theme';
  }
  return { pins, refused, types };
}

function writeWave(id, locale, m) {
  const themes = [...new Set(Object.values(m.pins))].sort();
  const plan = {
    id, seedEpoch: 1, locales: [locale],
    themes: themes.length ? themes : ['animals'],
    themesPerType: 1, difficulties: [2],
    types: m.types.slice().sort(),
    themeOverrides: m.pins,
    _refused: m.refused,
    _note: 'nt5-F (generated by tools/gen-b6-waves.js — every themed type pinned by a MEASURED build; _refused = specs that build on no candidate in this locale, dropped from the wave and recorded, never padded)',
  };
  const file = path.join(ROOT, 'waves', id + '.json');
  if (!DRY) fs.writeFileSync(file, JSON.stringify(plan, null, 2) + '\n');
  return { file, n: m.types.length, refused: Object.keys(m.refused).length, themes: themes.length };
}

function main() {
const all = loadAllTypes();
const baseIds = new Set(FAMILIES.map(([id]) => id));
const faceIds = new Set(alloc.faces.map((f) => f.id));
const bases = all.filter((s) => baseIds.has(s.id));
const faces = all.filter((s) => faceIds.has(s.id));
if (bases.length !== 5 || faces.length !== 25) throw new Error(`expected 5 bases + 25 faces on disk, found ${bases.length} + ${faces.length}`);

for (const loc of LOCALES) {
  const mb = measure(bases, loc), mf = measure(faces, loc);
  const wb = writeWave('wave-b6-' + loc, loc, mb), wf = writeWave('wave-b6var-' + loc, loc, mf);
  console.log(`${loc}: base ${wb.n}/5 (${wb.refused} refused, ${wb.themes} themes) · faces ${wf.n}/25 (${wf.refused} refused, ${wf.themes} themes)${DRY ? '  [dry-run]' : ''}`);
  for (const [id, why] of Object.entries({ ...mb.refused, ...mf.refused })) console.log('   refused ' + id + ': ' + why);
}}

if (require.main === module) main();
module.exports = { candidates, tryBuild, measure, GENERAL, PREF, HARD };
