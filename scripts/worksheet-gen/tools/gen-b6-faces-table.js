#!/usr/bin/env node
/**
 * gen-b6-faces-table.js <locale> [--sweep=<dir>]
 *
 * Writes out/b6-faces.<loc>.json — the face table a landing panel briefs FROM:
 * one row per nt5-F type the locale SHIPS (20 bases + the faces its panel did not
 * refuse), with the id, family key, band, mode string, the wave's shipped theme,
 * the locale's own title + instruction (strings.<loc>.json) and the path of the
 * rendered PNG the panel must open before writing a word.
 *
 * The PNGs come from a probe render of the locale's two waves:
 *   node tools/gen-b6-probe-jobs.js waves/wave-b6-<loc>.json  --out=/tmp/a.json
 *   node render/batch.js /tmp/a.json --out out/b6-sweep/<loc>     (same for b6var)
 * A row whose PNG is missing is written with `png: null` and counted — a panel
 * told to open a picture that does not exist reports it instead of guessing.
 */
'use strict';
const fs = require('fs');
const { resolveUnitTokens } = require('../lib/unit-axis.js');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { FAMILIES } = require('./gen-b6var-specs.js');
const ALLOC = require(path.join(ROOT, '..', '..', 'docs', 'worksheet-gen', 'b6-designs', '_records', 'b6var-id-allocation.json'));
const { loadType } = require('../lib/load-types.js');

const argOf = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : null; };
const locale = process.argv[2];
if (!locale) { console.error('usage: gen-b6-faces-table.js <locale> [--sweep=<dir>]'); process.exit(2); }
const sweep = argOf('sweep') || path.join(ROOT, 'out', 'b6-sweep', locale);

const wave = (k) => JSON.parse(fs.readFileSync(path.join(ROOT, 'waves', `wave-${k}-${locale}.json`), 'utf8'));
const WB = wave('b6'), WV = wave('b6var');
const strings = JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', `strings.${locale}.json`), 'utf8'));
const refPath = path.join(ROOT, '..', '..', 'docs', 'worksheet-gen', 'b6-designs', '_records', `refusals.${locale}.json`);
const refused = fs.existsSync(refPath) ? (JSON.parse(fs.readFileSync(refPath, 'utf8')).refusals || {}) : {};

const rows = [];
let missingPng = 0;
const add = (id, key, isBase) => {
  const w = isBase ? WB : WV;
  const shipped = (w.types || []).includes(id) && !refused[id];
  const t = loadType(id);
  const theme = (w.themeOverrides && w.themeOverrides[id]) || null;
  // resolve {U}/{L} exactly as the renderer does, so the table carries the title the page prints
  const s = resolveUnitTokens(strings[id] || (t.i18n && t.i18n[locale]) || null, t, null, locale);
  let png = null;
  if (shipped) {
    const base = `${id}-${theme === null ? 'null' : theme}-d2-${locale}.png`;
    const p = path.join(sweep, base);
    if (fs.existsSync(p)) png = p; else missingPng++;
  }
  rows.push({
    id, family: key, band: id.split('-')[0], isBase, mode: isBase ? 'base' : t.slug,
    themed: !!(t.themeAxis && t.themeAxis.applicable), theme,
    shipped, refused: refused[id] || null,
    title: s ? s.title : null, instruction: s ? s.instruction : null,
    png,
  });
};
for (const [baseId, key] of FAMILIES) {
  add(baseId, key, true);
  for (const f of ALLOC.faces) if (f.family === baseId) add(f.id, key, false);
}
const out = path.join(ROOT, 'out', `b6-faces.${locale}.json`);
fs.writeFileSync(out, JSON.stringify({ locale, sweep, generated: new Date().toISOString().slice(0, 10), rows }, null, 1) + '\n');
const shipped = rows.filter((r) => r.shipped).length;
console.log(`${locale}: ${rows.length} rows, ${shipped} shipped, ${rows.length - shipped} refused, ${missingPng} shipped row(s) WITHOUT a PNG in ${sweep} → ${out}`);
if (missingPng) process.exitCode = 1;
