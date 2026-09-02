#!/usr/bin/env node
/**
 * gen-b2var-faces.js — writes out/b2var-faces.json, the face table every native
 * panel is briefed from (id, slug, family, band, shipped theme, base id, English
 * title/instruction, and the path to that face's rendered PNG).
 *
 * ⚠ RE-RUN THIS AFTER EVERY CHANGE TO THE SPECS OR THE WAVES. The first version
 * of this table was produced once by hand and went stale the moment the English
 * copy and three themes were fixed; the Dutch panel caught it, reporting that
 * the table still listed K-298 under its old defective title and gave G1-283 a
 * `vehicles` theme whose sweep file did not exist on disk. A panel briefed from
 * a stale table is briefed from prose again, which is the exact failure this
 * whole table exists to prevent. Everything here is derived at run time — from
 * the spec modules and the EN wave — so it cannot drift on its own.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { ROWS } = require('./gen-b2var-specs.js');
const { loadType } = require('../lib/load-types.js');
const WAVE = JSON.parse(fs.readFileSync(path.join(ROOT, 'waves', 'wave-b2var-en.json'), 'utf8'));

const out = ROWS.map((r) => {
  const [, id, , baseFile, , , enTitle, enInstruction] = r;
  const t = loadType(id);
  const ov = WAVE.themeOverrides[id];
  const theme = ov || null;
  const sweep = 'scripts/worksheet-gen/out/b2var-sweep/' +
    id.toLowerCase().replace('-', '') + '-' + (theme ? theme.replace(/ /g, '_') : 'nothm') + '.png';
  return {
    id,
    slug: t.slug,
    family: t.exerciseType,
    band: id.split('-')[0],
    theme,
    baseId: baseFile.replace(/^([A-Z0-9]+-[0-9]+)-.*$/, '$1'),
    enTitle,
    enInstruction,
    sweep,
    sweepExists: fs.existsSync(path.join(ROOT, '..', '..', sweep)),
  };
});

const missing = out.filter((f) => !f.sweepExists).map((f) => f.id);
fs.mkdirSync(path.join(ROOT, 'out'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'out', 'b2var-faces.json'), JSON.stringify(out, null, 1) + '\n');
console.log('gen-b2var-faces: wrote ' + out.length + ' faces');
if (missing.length) {
  console.error('  ⚠ ' + missing.length + ' face(s) have NO render on disk: ' + missing.join(', '));
  console.error('    rebuild the EN wave and re-extract out/b2var-sweep before briefing a panel.');
  process.exit(1);
}
console.log('  all ' + out.length + ' sweep renders present');
