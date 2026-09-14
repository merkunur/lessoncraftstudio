#!/usr/bin/env node
/**
 * gen-b3-probe-jobs.js — turn a wave plan into a render/batch.js job file, so a
 * whole wave can be probed through the REAL enumerator (theme pins, unit lists,
 * refusals) before cli.js generate makes ZIPs.
 *
 *   node tools/gen-b3-probe-jobs.js <waves/wave-b3-en.json> [--out=<jobs.json>] [--types=A,B]
 *
 * The b2 batch never had this tool (only its job-file OUTPUTS survived), so a
 * probe was a hand-typed list that could disagree with the wave. Here every job
 * is exactly one enumerated instance: {type, theme, difficulty, locale, unit,
 * seedEpoch} — the theme is the wave's pin, never a guess, and the unit is the
 * enumerator's (exemplar when the wave sets no unit knob). Refused coordinates
 * (`skipped`) are printed so a builder sees them instead of a silent gap.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { enumerate } = require('../enumerate.js');

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const waveFile = process.argv[2];
if (!waveFile) { console.error('usage: gen-b3-probe-jobs.js <wave.json> [--out=<jobs.json>] [--types=A,B]'); process.exit(2); }
const plan = JSON.parse(fs.readFileSync(waveFile, 'utf8'));
const only = arg('types') ? new Set(arg('types').split(',')) : null;
const { instances, skipped } = enumerate(plan);
// The enumerator names the theme `cacheTheme` (the image-cache key the renderer
// resolves), not `theme`. The first version of this tool read `i.theme`, so every
// themed job carried `theme: undefined` and the batch renderer refused each one
// ("a theme is required") — 41 of 119 de jobs rendered, the rest were ERR lines
// nobody had read. A job for a themed spec with no theme is now refused HERE.
const { loadType } = require('../lib/load-types.js');
const jobs = instances
  .filter((i) => !only || only.has(i.typeId || i.type))
  .map((i) => {
    const type = i.typeId || i.type;
    const theme = i.cacheTheme !== undefined ? i.cacheTheme : (i.theme !== undefined ? i.theme : undefined);
    if (theme === undefined) throw new Error('gen-b3-probe-jobs: instance for ' + type + ' carries neither cacheTheme nor theme: ' + JSON.stringify(i));
    let spec = null; try { spec = loadType(type); } catch (e) { /* unknown type: enumerate would have refused */ }
    const themed = !!(spec && spec.themeAxis && spec.themeAxis.applicable !== false);
    if (themed && !theme) throw new Error('gen-b3-probe-jobs: themed spec ' + type + ' enumerated without a theme (' + i.deckId + ')');
    return { type, theme: theme || null, difficulty: i.difficulty, locale: i.locale, unit: i.unit || null, seedEpoch: plan.seedEpoch || 1, deckId: i.deckId };
  });
const out = arg('out', path.join(path.dirname(waveFile), '..', 'out', 'probe-' + (plan.id || path.basename(waveFile, '.json')) + '.jobs.json'));
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(jobs, null, 1) + '\n');
console.log(`gen-b3-probe-jobs: ${jobs.length} jobs from ${plan.id || waveFile} → ${out}` + (skipped.length ? `; ${skipped.length} coordinate(s) REFUSED by the enumerator:` : ''));
for (const s of skipped.slice(0, 40)) console.log('  skipped ' + (typeof s === 'string' ? s : JSON.stringify(s)));
if (skipped.length > 40) console.log('  … +' + (skipped.length - 40) + ' more');
if (!jobs.length) { console.error('VACUOUS: no jobs enumerated'); process.exit(2); }
