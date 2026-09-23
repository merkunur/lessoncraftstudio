#!/usr/bin/env node
/**
 * b5-probe-child.js <locale> — the build probe of validate-b5-draft.js, run in a
 * FRESH process so the bank cache (lib/b5-common.js) reads the draft's blocks from
 * B5_LOCALES_DIR instead of the tree. Builds all 120 nt10-E specs at d2 in <locale>
 * over the theme candidates of tools/gen-b5-waves.js and runs every family bank
 * validator that exports cleanly. Prints one JSON line last:
 *   { built: [ids], refused: {id: message}, pins: {id: theme}, validator: [messages] }
 */
'use strict';
const path = require('path');
const { loadAllTypes } = require('../lib/load-types.js');
const { measure } = require('./gen-b5-waves.js');
const { bank } = require('../lib/b5-common.js');
const alloc = require('../../../docs/worksheet-gen/b5-designs/_records/b5var-id-allocation.json');
const { FAMILIES } = require('./gen-b5var-specs.js');

const loc = process.argv[2];
const all = loadAllTypes();
const ids = new Set([...FAMILIES.map(([id]) => id), ...alloc.faces.map((f) => f.id)]);
const specs = all.filter((s) => ids.has(s.id));
const m = measure(specs, loc);

// family validators with a clean (block, loc) contract; the others are covered by the build probe
// every nt10-E gate exports validateBank(block, loc) (design finals §5); tangram is wordless and has no locale bank
const VALIDATORS = {
  '2d-shapes': ['2d-shapes', 'validateBank'],
  'road-safety': ['road-safety', 'validateBank'],
  'family': ['family', 'validateBank'],
  'plants': ['plants', 'validateBank'],
  'animal-life-cycles': ['animal-life-cycles', 'validateBank'],
  'earth-and-space': ['earth-and-space', 'validateBank'],
  'maps': ['maps', 'validateBank'],
  'digraphs': ['digraphs', 'validateBank'],
  'synonyms': ['synonyms', 'validateBank'],
  'word-parts': ['word-parts', 'validateBank'],
};
const validator = [];
for (const [key, [gate, fn]] of Object.entries(VALIDATORS)) {
  let block;
  try { block = bank(key, loc); } catch (e) { continue; }   // absent block = the family is refused; the probe reports that per face
  try {
    const mod = require(path.join(__dirname, '..', 'qa', 'verify-b5-' + gate + '.js'));
    const out = mod[fn](block, loc);
    const list = Array.isArray(out) ? out : (out && out.fails) || (out && out.errors) || [];
    for (const x of list) validator.push(key + ': ' + x);
  } catch (e) { validator.push(key + ': validator threw — ' + String(e.message).slice(0, 160)); }
}
process.stdout.write('\n' + JSON.stringify({ built: m.types, refused: m.refused, pins: m.pins, validator }) + '\n');
