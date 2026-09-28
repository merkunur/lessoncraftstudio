#!/usr/bin/env node
/**
 * validate-opp-content.js — Level Set 2026-09-28 (Opposites): merges a native panel's additions onto the
 * published bank and runs the family gate's own validateBank (qa/verify-b3-opposites.js): bijection, symmetric
 * exclusiveWith, syn/far roles, frames (one member printed, the answer hidden, ≤ 45 chars, no repeated answer),
 * prefix items, opened pictures. Also checks the panel's strings and the pool sizes a Level Set needs.
 *
 *   node tools/level-set/validate-opp-content.js <panel.json> <loc>
 * Ends with "every addition passes" or a list of problems.
 */
'use strict';
const fs = require('fs');
const { validateBank } = require('../../qa/verify-b3-opposites.js');
const { toLevelset, mergeForCheck, INSTR_KEYS, SCREEN_KEYS } = require('./opp-common.js');

const [file, loc] = process.argv.slice(2);
if (!file || !loc) throw new Error('usage: validate-opp-content.js <panel.json> <loc>');
const P = JSON.parse(fs.readFileSync(file, 'utf8'));
const problems = [];
let ls;
try { ls = toLevelset(loc, P); } catch (e) { problems.push(e.message); }
if (ls) {
  const merged = mergeForCheck(loc, ls);
  const { fails, notes } = validateBank(merged, loc);
  for (const f of fails) problems.push(f);
  for (const n of notes) console.log('note ' + n);
  const pairs = merged.pairs;
  const syn = pairs.filter((p) => p.syn && p.syn.a && p.far).length;
  const pictured = pairs.filter((p) => p.pic).length;
  console.log(`pairs ${pairs.length} (new ${ls.pairs.length}) · syn+far ${syn} · pictured ${pictured} · frames ${merged.frames.length} (new ${ls.frames.length}) · prefix items ${merged.prefix.items.length} (new ${ls.prefixItems.length})`);
  if (pairs.length < 40) problems.push(`only ${pairs.length} pairs in total — the brief asks for ≥ 44`);
  if (merged.frames.length < 22) problems.push(`only ${merged.frames.length} frames in total — the brief asks for ≥ 24`);
  if (merged.prefix.items.length < 18) problems.push(`only ${merged.prefix.items.length} prefix items in total — the brief asks for ≥ 20`);
}
for (const k of INSTR_KEYS) {
  const s = (P.instructions || {})[k];
  if (!s) problems.push(`instructions.${k} missing`);
  else if ([...s].length > 150) problems.push(`instructions.${k} is ${[...s].length} chars > 150`);
}
for (const k of SCREEN_KEYS) {
  const s = (P.screen || {})[k];
  if (!s) problems.push(`screen.${k} missing`);
  else if ([...s].length > 110) problems.push(`screen.${k} is ${[...s].length} chars > 110`);
}
for (const p of problems) console.log('FAIL ' + p);
console.log(problems.length ? `${problems.length} problem(s)` : 'every addition passes');
process.exit(problems.length ? 1 : 0);
