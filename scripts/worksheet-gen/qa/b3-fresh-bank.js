/**
 * b3-fresh-bank.js — a gate's seam onto a b3 bank module: a FRESH copy (re-required, never cached) with its export merged
 * with the GENERATED locale files exactly as lib/b3-common.js bankModule merges them — what the type reads.
 *
 * 2026-11-04: seven family gates required the raw module, which holds only the en block since the locale fan-out, so the
 * ten other locales' banks were never validated (it / nl / da all-about-me labels still printed words the vocabulary had
 * changed: automobile for macchina, giraffe for giraf, morgenmad for cornflakes). Fresh, so a gate's poisons cannot leak
 * into one another or into the type's own cached bank. Node only (it touches require.cache); never bundled.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const WG = path.join(__dirname, '..');
const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/** freshModule(name) → the module object (its other exports untouched), its first export merged with the locale blocks */
function freshModule(name) {
  const f = path.join(WG, 'data', 'b3', name + '.js');
  delete require.cache[require.resolve(f)];
  const mod = require(f);
  delete require.cache[require.resolve(f)];   // the next require (the type's bankModule, a poison) gets its own copy
  const all = mod[Object.keys(mod)[0]];
  const dir = process.env.B3_LOCALES_DIR || path.join(WG, 'data', 'b3', 'locales');
  if (fs.existsSync(path.join(dir, name + '.en.json'))) throw new Error(`b3-fresh-bank: ${name}.en.json — the en block is authored in the module, never generated`);
  for (const loc of LOCALES) {
    const file = path.join(dir, name + '.' + loc + '.json');
    if (!fs.existsSync(file)) continue;
    if (all[loc]) throw new Error(`b3-fresh-bank: data/b3/${name}.js already has a ${loc} block AND ${path.basename(file)} exists — two sources, refuse`);
    all[loc] = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return mod;
}
/** freshBank(name) → the merged export alone ({ en, de, … }) */
const freshBank = (name) => { const m = freshModule(name); return m[Object.keys(m)[0]]; };

module.exports = { freshModule, freshBank };
