#!/usr/bin/env node
/**
 * validate-lotw-content.js — Level Set 2026-09-28 (Letter of the Week, whole alphabet): rebuilds a locale's
 * NEW letter blocks from the candidates + the native panel's review (lotw-common.assemble) and runs the family
 * gate's own validateBank (qa/verify-b3-letter-of-the-week.js) over the published block + the new letters.
 *
 *   node tools/level-set/validate-lotw-content.js <panel.json> <loc> [--cand=<lotw-cand-loc.json>] [--exclude=<file>]
 *
 * Findings on a NEW letter are errors, except the floor findings (a letter that cannot fill a face): those are
 * reported as "face dropped" (the builder refuses that page for that letter; honest, never filled). The panel
 * file must also carry pairTitle ({U} + {PU}, ≤ 70 filled) and the two level instructions.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { validateBank } = require('../../qa/verify-b3-letter-of-the-week.js');
const { bank } = require('../../lib/b3-common.js');
const { assemble, CAPACITY } = require('./lotw-common.js');

const [file, loc] = process.argv.slice(2);
if (!file || !loc) throw new Error('usage: validate-lotw-content.js <panel.json> <loc> [--cand=…] [--exclude=…]');
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').slice(k.length + 3);
const candFile = arg('cand') || path.join(path.dirname(file), `lotw-cand-${loc}.json`);
const exclude = new Set(arg('exclude') && fs.existsSync(arg('exclude')) ? JSON.parse(fs.readFileSync(arg('exclude'), 'utf8')) : []);
const P = JSON.parse(fs.readFileSync(file, 'utf8'));
const cand = JSON.parse(fs.readFileSync(candFile, 'utf8'));
const pub = bank('letter-of-the-week', loc);
const { blocks, refused, notes } = assemble(loc, cand, P, exclude);
const merged = { ...pub, letters: [...pub.letters, ...blocks] };
const res = validateBank(merged, loc);
const newL = new Set(blocks.map((b) => b.L));
const errors = [], dropped = [];
for (const m of res.findings) {
  const L = (/letter (\S+?):/.exec(m) || [])[1];
  if (!L || !newL.has(L)) continue;   // the published letters are the family gate's own business
  (CAPACITY.test(m) ? dropped : errors).push(m);
}
const fill = (t, L, P2) => t.replace(/\{U\}/g, L.toUpperCase()).replace(/\{PU\}/g, (P2 || 'N').toUpperCase());
if (!P.pairTitle || !/\{U\}/.test(P.pairTitle) || !/\{PU\}/.test(P.pairTitle)) errors.push('pairTitle must carry {U} and {PU}');
else if (fill(P.pairTitle, 'M', 'N').length > 70) errors.push('pairTitle longer than 70 when filled');
if (!P.pairInstruction || !/\{L\}/.test(P.pairInstruction) || !/\{P\}/.test(P.pairInstruction)) errors.push('pairInstruction must carry {L} and {P}');
for (const k of ['K-317_L1', 'K-325_L1']) if (!(P.instructions || {})[k]) errors.push(`instructions.${k} missing`);
for (const l of cand.letters) if (!l.published && !(P.letters || {})[l.L]) errors.push(`letter ${l.L}: no review`);
for (const n of notes) console.log('note ' + n);
for (const d of dropped) console.log('face dropped ' + d);
for (const e of errors) console.log('FAIL ' + e);
console.log(`${loc}: ${blocks.length} new letters (${blocks.map((b) => b.L + ':' + b.items.length).join(' ')}), refused ${refused.map((r) => r.L).join(' ') || '—'}`);
console.log(errors.length ? `${errors.length} problem(s)` : 'every letter block passes');
process.exit(errors.length ? 1 : 0);
