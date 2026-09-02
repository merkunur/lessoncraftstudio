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
 * the spec modules and EVERY locale's wave — so it cannot drift on its own.
 *
 * ⚠ `theme` IS THE ENGLISH THEME AND IS NOT TRUE FOR EVERY LOCALE. Several faces
 * carry per-locale `themeOverrides`: K-306/K-307 ship on `fruits` in sv, da and
 * no, because those locales' colour animals theme is gender-degenerate (measured:
 * two `et`-nouns in 37 for `no`, so an animals page would read "en" on every
 * card). The Norwegian panel caught this from `waves/wave-b2var-no.json` and
 * noted that the deck slug derives from the WAVE — so a landing written for
 * animals would have pointed at a deck slug that does not exist. `themeByLocale`
 * below carries the truth for all eleven; brief every non-EN panel from that
 * column, not from `theme`, and treat `sweep` as an ENGLISH render throughout.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { ROWS } = require('./gen-b2var-specs.js');
const { loadType } = require('../lib/load-types.js');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'nl', 'pt', 'sv', 'da', 'no', 'fi'];
const WAVES = {};
LOCALES.forEach((l) => {
  const p = path.join(ROOT, 'waves', `wave-b2var-${l}.json`);
  if (!fs.existsSync(p)) throw new Error(`gen-b2var-faces: no wave for ${l} at ${p}`);
  WAVES[l] = JSON.parse(fs.readFileSync(p, 'utf8'));
});
const WAVE = WAVES.en;

const out = ROWS.map((r) => {
  const [, id, , baseFile, , , enTitle, enInstruction] = r;
  const t = loadType(id);
  const ov = WAVE.themeOverrides[id];
  const theme = ov || null;
  const themeByLocale = {};
  LOCALES.forEach((l) => { themeByLocale[l] = WAVES[l].themeOverrides[id] || null; });
  const divergent = LOCALES.filter((l) => themeByLocale[l] !== theme);
  const sweep = 'scripts/worksheet-gen/out/b2var-sweep/' +
    id.toLowerCase().replace('-', '') + '-' + (theme ? theme.replace(/ /g, '_') : 'nothm') + '.png';
  return {
    id,
    slug: t.slug,
    family: t.exerciseType,
    band: id.split('-')[0],
    theme,
    themeByLocale,
    // named explicitly so a panel cannot miss it by skimming the wide object
    themeDivergesIn: divergent.length ? divergent : undefined,
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
const div = out.filter((f) => f.themeDivergesIn);
if (div.length) {
  console.log('  ' + div.length + ' face(s) ship a DIFFERENT theme outside English:');
  div.forEach((f) => console.log('    ' + f.id + '  en=' + f.theme +
    '  ' + f.themeDivergesIn.map((l) => l + '=' + f.themeByLocale[l]).join(' ')));
}
if (missing.length) {
  console.error('  ⚠ ' + missing.length + ' face(s) have NO render on disk: ' + missing.join(', '));
  console.error('    rebuild the EN wave and re-extract out/b2var-sweep before briefing a panel.');
  process.exit(1);
}
console.log('  all ' + out.length + ' sweep renders present');
