#!/usr/bin/env node
/**
 * b3-probe-child.js <locale> — the build probe of validate-b3-draft.js, run in a
 * FRESH process so the bank cache (lib/b3-common.js) reads the draft's blocks from
 * B3_LOCALES_DIR instead of the tree. Builds all 120 nt20-C specs at d2 in <locale>
 * over the theme candidates of tools/gen-b3-waves.js and runs every family bank
 * validator that exports cleanly. Prints one JSON line last:
 *   { built: [ids], refused: {id: message}, pins: {id: theme}, validator: [messages] }
 */
'use strict';
const path = require('path');
const { loadAllTypes } = require('../lib/load-types.js');
const { measure } = require('./gen-b3-waves.js');
const { bank } = require('../lib/b3-common.js');
const alloc = require('../../../docs/worksheet-gen/b3-designs/_records/b3var-id-allocation.json');
const { FAMILIES } = require('./gen-b3var-specs.js');

const loc = process.argv[2];
const all = loadAllTypes();
const ids = new Set([...FAMILIES.map(([id]) => id), ...alloc.faces.map((f) => f.id)]);
const specs = all.filter((s) => ids.has(s.id));
const m = measure(specs, loc);

// family validators with a clean (block, loc) contract; the others are covered by the build probe
const VALIDATORS = {
  'all-about-me': ['all-about-me', 'validateBank'], 'animal-fact-file': ['animal-fact-file', 'validateBank'],
  'compound-words': ['compound-words', 'validateBank'], 'days-and-months': ['days-and-months', 'validateBank'],
  'feelings': ['feelings', 'validateBank'], 'letter-of-the-week': ['letter-of-the-week', 'validateBank'],
  'opposites': ['opposites', 'validateBank'], 'picture-word-cards': ['picture-word-cards', 'validateBank'],
  'rhyming-words': ['rhyming-words', 'validateBank'], 'spelling-rules': ['spelling-rules', 'validateBank'],
};
const validator = [];
for (const [key, [gate, fn]] of Object.entries(VALIDATORS)) {
  let block;
  try { block = bank(key, loc); } catch (e) { continue; }   // absent block = the family is refused; the probe reports that per face
  try {
    const mod = require(path.join(__dirname, '..', 'qa', 'verify-b3-' + gate + '.js'));
    const out = mod[fn](block, loc);
    const list = Array.isArray(out) ? out : (out && out.fails) || (out && out.errors) || [];
    for (const x of list) validator.push(key + ': ' + x);
  } catch (e) { validator.push(key + ': validator threw — ' + String(e.message).slice(0, 160)); }
}
process.stdout.write('\n' + JSON.stringify({ built: m.types, refused: m.refused, pins: m.pins, validator }) + '\n');
