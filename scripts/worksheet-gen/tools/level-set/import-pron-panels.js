#!/usr/bin/env node
/**
 * import-pron-panels.js — Level Set 2026-09-28 (Personal Pronouns): the native panels' additions →
 * data/b4/pronouns-levelset.json (portraits opened in session + per-locale names / frames / anaphora /
 * "one person + a pair" frames / possessive things, for NEW copies only — the published pages never read it),
 * the per-level printed instructions (i18n/level-instructions.json) and the screen instructions
 * (i18n/interactive-instructions.json → pronouns.<layout>).
 *
 *   node tools/level-set/import-pron-panels.js <dir> [--only=<locs>] [--partial]
 *
 * Every locale must pass validate-pron-content.js (the family gate's validateBank on the merged bank); a failing
 * locale REFUSES the import.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { LS_PEOPLE, toLevelset, INSTR_KEYS, SCREEN_KEYS } = require('./pron-common.js');

const dir = process.argv[2];
if (!dir) throw new Error('usage: import-pron-panels.js <dir> [--only=…] [--partial]');
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
const partial = process.argv.includes('--partial');
const only = arg('only') ? arg('only').split(',') : null;
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'].filter((l) => !only || only.includes(l));
const ROOT = path.join(__dirname, '..', '..');
const outFile = path.join(ROOT, 'data', 'b4', 'pronouns-levelset.json');
const out = fs.existsSync(outFile) && partial ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
out._note = 'Level Set 2026-09-28 — Personal Pronouns: names, sentence frames, "who is he" frames, one-person-plus-a-pair frames (two clauses) and possessive things by 11 native panels, + 8 portraits opened in session (pron-common.js LS_OPENED); importer tools/level-set/import-pron-panels.js. Merged onto the published bank by G1-352 mergedBank() for NEW copies only; the published pages never read this file.';
out.people = LS_PEOPLE;
const instrFile = path.join(ROOT, 'i18n', 'level-instructions.json');
const instr = JSON.parse(fs.readFileSync(instrFile, 'utf8'));
const scrFile = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const scr = JSON.parse(fs.readFileSync(scrFile, 'utf8'));
scr.pronouns = scr.pronouns || {};
for (const loc of LOCS) {
  const f = path.join(dir, `pron-text-${loc}.json`);
  if (!fs.existsSync(f)) { if (partial) continue; throw new Error(`${loc}: ${f} missing`); }
  execFileSync(process.execPath, [path.join(__dirname, 'validate-pron-content.js'), f, loc], { stdio: ['ignore', 'ignore', 'inherit'] });   // throws on a failing locale
  const P = JSON.parse(fs.readFileSync(f, 'utf8'));
  out[loc] = toLevelset(loc, P);
  for (const k of INSTR_KEYS) {
    if (typeof (P.instructions || {})[k] !== 'string') continue;   // es/fi: the possessive page is refused
    const [id, lv] = k.split('_L');
    ((instr[id] = instr[id] || {})[lv] = instr[id][lv] || {})[loc] = P.instructions[k];
  }
  for (const k of SCREEN_KEYS) if (typeof (P.screen || {})[k] === 'string') (scr.pronouns[k] = scr.pronouns[k] || {})[loc] = P.screen[k];
  const x = out[loc];
  console.log(`${loc}: +${x.names.length} names, +${x.frames.length} frames, +${x.anaphora.length} anaphora, +${x.anaphoraSgpl.length} one+pair, +${x.things.length} things${x.refused ? ' — refused: ' + x.refused.join('; ') : ''}`);
}
fs.writeFileSync(outFile, JSON.stringify(out, null, 1) + '\n');
fs.writeFileSync(instrFile, JSON.stringify(instr, null, 1) + '\n');
fs.writeFileSync(scrFile, JSON.stringify(scr, null, 1) + '\n');
console.log('written');
