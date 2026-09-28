#!/usr/bin/env node
/**
 * import-digraph-panels.js — Level Set 2026-09-28: the 6 native panels' Digraphs content → the build's data.
 * Refuses (throws) unless every panel file passes the family validator per set (validate-digraph-sets.js) and
 * every new team has a MEASURED bead width (primitives/team-bead.widths.json — never guessed).
 *   node tools/level-set/import-digraph-panels.js <dir with dig-text-<loc>.json>
 * writes data/b5/digraphs-levelset.json + the 'digraphs' tap instructions in i18n/interactive-instructions.json
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const WIDTHS = require('../../primitives/team-bead.widths.json').em;

const dir = process.argv[2];
if (!dir) throw new Error('usage: import-digraph-panels.js <dir>');
const LOCS = ['en', 'de', 'fr', 'pt', 'nl', 'fi'];
const out = { _note: 'Level Set 2026-09-28 — Digraphs: new letter teams + team sets by 6 native panels (every picture opened on a contact sheet); read ONLY by NEW copies (the published pages never read this file). Importer tools/level-set/import-digraph-panels.js.' };
const inst = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'i18n', 'interactive-instructions.json'), 'utf8'));
const tap = {};
for (const loc of LOCS) {
  const f = path.join(dir, `dig-text-${loc}.json`);
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  try { execFileSync('node', [path.join(__dirname, 'validate-digraph-sets.js'), f, loc], { stdio: 'pipe' }); }
  catch (e) { throw new Error(`${loc}: the validator refuses the panel file:\n${String(e.stdout)}`); }
  const unmeasured = Object.keys(j.newTeams || {}).filter((t) => !(t in WIDTHS));
  if (unmeasured.length) throw new Error(`${loc}: no measured bead width for ${unmeasured.join(' ')} (add to tools/measure-team-beads.js and re-measure)`);
  for (const k of ['and', 'or', 'titles', 'tap']) if (!j[k]) throw new Error(`${loc}: ${k} missing`);
  out[loc] = { newTeams: j.newTeams, samesoundAdd: j.samesoundAdd || [], rejectedPicsAdd: j.rejectedPicsAdd || [], sets: j.sets, sentences: j.sentences, and: j.and, or: j.or, titles: j.titles };
  for (const [k, v] of Object.entries(j.tap)) (tap[k] = tap[k] || {})[loc] = v;
  console.log(`${loc}: ${Object.keys(j.newTeams).length} new teams (${Object.keys(j.newTeams).join(' ')}), ${j.sets.length} sets, ${Object.values(j.newTeams).reduce((a, t) => a + t.items.length, 0)} items`);
}
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'b5', 'digraphs-levelset.json'), JSON.stringify(out, null, 1) + '\n');
inst.digraphs = tap;
fs.writeFileSync(path.join(__dirname, '..', '..', 'i18n', 'interactive-instructions.json'), JSON.stringify(inst, null, 2) + '\n');
console.log('written');
