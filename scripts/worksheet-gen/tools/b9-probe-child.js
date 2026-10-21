#!/usr/bin/env node
/**
 * b9-probe-child.js <locale> — the build probe of validate-b9-draft.js, run in a
 * FRESH process so the bank cache (lib/b9-common.js) reads the draft's blocks from
 * B9_LOCALES_DIR instead of the tree. Builds all 20 b9 specs at d2 in <locale>
 * (b9 builds are ASYNC: awaited) and runs the family bank validator. Prints one JSON line last:
 *   { built: [ids], refused: {id: message}, pins: {id: theme}, validator: [messages] }
 */
'use strict';
const path = require('path');
const { loadAllTypes } = require('../lib/load-types.js');
const { measure } = require('./gen-b9-waves.js');
const { bank } = require('../lib/b9-common.js');
const alloc = require('../../../docs/worksheet-gen/b9-designs/_records/b9var-id-allocation.json');
const { FAMILIES } = require('./gen-b9var-specs.js');

const loc = process.argv[2];
const all = loadAllTypes();
const ids = new Set([...FAMILIES.map(([id]) => id), ...alloc.faces.map((f) => f.id)]);
const specs = all.filter((s) => ids.has(s.id));
(async () => {
const m = await measure(specs, loc);

// family validators with a clean (block, loc) contract; the others are covered by the build probe
const VALIDATORS = {
  'picture-tracing': ['picture-tracing', 'validateBank'],
};
const validator = [];
for (const [key, [gate, fn]] of Object.entries(VALIDATORS)) {
  let block;
  try { block = bank(key, loc); } catch (e) { continue; }   // absent block = the family is refused; the probe reports that per face
  try {
    const mod = require(path.join(__dirname, '..', 'data', 'b9', gate + '.js'));   // the bank module's own validator
    const out = mod[fn](block, loc);
    const list = Array.isArray(out) ? out : (out && out.fails) || (out && out.errors) || [];
    for (const x of list) validator.push(key + ': ' + x);
  } catch (e) { validator.push(key + ': validator threw — ' + String(e.message).slice(0, 160)); }
}
process.stdout.write('\n' + JSON.stringify({ built: m.types, refused: m.refused, pins: m.pins, validator }) + '\n');
})().catch((e) => { console.error(e); process.exit(1); });
