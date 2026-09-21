#!/usr/bin/env node
/**
 * b4-probe-child.js <locale> — the build probe of validate-b4-draft.js, run in a
 * FRESH process so the bank cache (lib/b4-common.js) reads the draft's blocks from
 * B4_LOCALES_DIR instead of the tree. Builds all 120 nt10-D specs at d2 in <locale>
 * over the theme candidates of tools/gen-b4-waves.js and runs every family bank
 * validator that exports cleanly. Prints one JSON line last:
 *   { built: [ids], refused: {id: message}, pins: {id: theme}, validator: [messages] }
 */
'use strict';
const path = require('path');
const { loadAllTypes } = require('../lib/load-types.js');
const { measure } = require('./gen-b4-waves.js');
const { bank } = require('../lib/b4-common.js');
const alloc = require('../../../docs/worksheet-gen/b4-designs/_records/b4var-id-allocation.json');
const { FAMILIES } = require('./gen-b4var-specs.js');

const loc = process.argv[2];
const all = loadAllTypes();
const ids = new Set([...FAMILIES.map(([id]) => id), ...alloc.faces.map((f) => f.id)]);
const specs = all.filter((s) => ids.has(s.id));
const m = measure(specs, loc);

// family validators with a clean (block, loc) contract; the others are covered by the build probe
// every nt10-D gate exports validateBank(block, loc) (design finals §5); tangram is wordless and has no locale bank
const VALIDATORS = {
  'human-body': ['human-body', 'validateBank'], 'five-senses': ['five-senses', 'validateBank'],
  'weather-symbols': ['weather-symbols', 'validateBank'], 'recycling': ['recycling', 'validateBank'],
  'cloze': ['cloze', 'validateBank'], 'odd-and-even': ['odd-and-even', 'validateBank'],
  'pronouns': ['pronouns', 'validateBank'], 'question-words': ['question-words', 'validateBank'],
  'rounding': ['rounding', 'validateBank'],
};
const validator = [];
for (const [key, [gate, fn]] of Object.entries(VALIDATORS)) {
  let block;
  try { block = bank(key, loc); } catch (e) { continue; }   // absent block = the family is refused; the probe reports that per face
  try {
    const mod = require(path.join(__dirname, '..', 'qa', 'verify-b4-' + gate + '.js'));
    const out = mod[fn](block, loc);
    const list = Array.isArray(out) ? out : (out && out.fails) || (out && out.errors) || [];
    for (const x of list) validator.push(key + ': ' + x);
  } catch (e) { validator.push(key + ': validator threw — ' + String(e.message).slice(0, 160)); }
}
process.stdout.write('\n' + JSON.stringify({ built: m.types, refused: m.refused, pins: m.pins, validator }) + '\n');
