#!/usr/bin/env node
/**
 * validate-pron-content.js <panel-output.json> <loc> — Level Set 2026-09-28 (Personal Pronouns).
 * Runs the family gate's OWN bank validator (qa/verify-b4-pronouns.js validateBank) on the merged bank
 * (published + the panel's additions + the Level Set portraits), plus the new "one person + a pair" frames,
 * the instruction and screen strings. Prints every failure; ends "every addition passes" when clean.
 */
'use strict';
const fs = require('fs');
const { validateBank } = require('../../qa/verify-b4-pronouns.js');
const { LS_OPENED, INSTR_KEYS, SCREEN_KEYS, toLevelset, mergeForCheck, checkSgpl } = require('./pron-common.js');

const [file, loc] = process.argv.slice(2);
if (!file || !loc) { console.error('usage: validate-pron-content.js <panel-output.json> <loc>'); process.exit(2); }
const P = JSON.parse(fs.readFileSync(file, 'utf8'));
const ls = toLevelset(loc, P);
const m = mergeForCheck(loc, ls);
const en = loc === 'en' ? m : mergeForCheck('en', { names: [], frames: [], anaphora: [], anaphoraSgpl: [], things: [] });
const extraOpened = Object.fromEntries(Object.entries(LS_OPENED).map(([k, v]) => [k, v]));
const fails = validateBank(m, loc, { en, extraOpened, maxNames: 64, possessiveFitEach: true });
fails.push(...checkSgpl(loc, m));

const floor = loc === 'fi' ? 18 : 18;
const nf = m.names.filter((n) => n.gender === 'f').length, nm = m.names.filter((n) => n.gender === 'm').length;
if (nf < floor || nm < floor) fails.push(`names: ${nf} f / ${nm} m in total — want >= ${floor} each`);
for (const n of ls.names) {
  if ([...n.name].length > 9) fails.push(`name "${n.name}" > 9 letters`);
  if (n.ambiguousInLocale) fails.push(`name "${n.name}" flagged ambiguous — leave it out`);
}
if (m.frames.length < 30) fails.push(`frames: ${m.frames.length} in total < 30`);
if (m.anaphora.length < 20) fails.push(`anaphora: ${m.anaphora.length} in total < 20`);
if (m.possessive && m.possessive.things.length < 26) fails.push(`things: ${m.possessive.things.length} in total < 26`);
const I = P.instructions || {}, S = P.screen || {};
for (const k of INSTR_KEYS) {
  if (k.startsWith('G2-354') && !m.possessive) continue;
  if (typeof I[k] !== 'string' || !I[k].trim()) fails.push(`instructions.${k} missing`);
  else if ([...I[k]].length > 150) fails.push(`instructions.${k} > 150 chars`);
}
for (const k of SCREEN_KEYS) {
  if (k === 'possessive' && !m.possessive) continue;
  if (typeof S[k] !== 'string' || !S[k].trim()) fails.push(`screen.${k} missing`);
  else if ([...S[k]].length > 110) fails.push(`screen.${k} > 110 chars`);
}
if (ls.refused) console.log('refused by the importer: ' + ls.refused.join('; '));
if (fails.length) { for (const f of fails) console.log('FAIL ' + f); console.log(fails.length + ' problems'); process.exit(1); }
console.log(`${loc}: names ${m.names.length} (f ${nf} / m ${nm}), frames ${m.frames.length}, anaphora ${m.anaphora.length}, sgpl ${m.anaphoraSgpl.length}, things ${m.possessive ? m.possessive.things.length : '-'}`);
console.log('every addition passes');
