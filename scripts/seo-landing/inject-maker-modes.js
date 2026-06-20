#!/usr/bin/env node
/* Merge a translated maker-modes patch into a locale's maker-content JSON.
 * Reads scripts/seo-landing/maker-modes-<locale>.json (shape: {labels:{}, makers:{<key>:{modes?,modeNames?,samplesIntro?}}})
 * and writes the modes/modeNames/samplesIntro into each maker + the chrome labels of
 * frontend/messages/maker-content/<locale>.json. Idempotent.
 * Usage: node scripts/seo-landing/inject-maker-modes.js <locale>
 */
'use strict';
const fs = require('fs');
const locale = process.argv[2];
if (!locale) { console.error('usage: inject-maker-modes.js <locale>'); process.exit(1); }

const patchPath = `scripts/seo-landing/maker-modes-${locale}.json`;
const targetPath = `frontend/messages/maker-content/${locale}.json`;
const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

Object.assign(data.labels, patch.labels || {});
let applied = 0, missing = [];
for (const [key, e] of Object.entries(patch.makers || {})) {
  if (!data[key]) { missing.push(key); continue; }
  if (e.modes) data[key].modes = e.modes;
  if (e.modeNames) data[key].modeNames = e.modeNames;
  if (e.samplesIntro) data[key].samplesIntro = e.samplesIntro;
  applied++;
}
fs.writeFileSync(targetPath, JSON.stringify(data, null, 2) + '\n');
console.log(`[${locale}] applied ${applied} makers + labels${missing.length ? '; MISSING: ' + missing.join(',') : ''}; wrote ${targetPath}`);
