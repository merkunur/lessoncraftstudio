#!/usr/bin/env node
/**
 * validate-digraph-sets.js — Level Set 2026-09-28 (Digraphs): checks a native panel's NEW letter teams and
 * team SETS with the family's OWN bank validator (qa/verify-b5-digraphs.js validateBank, rules 1-13) — each
 * proposed set is tried as the page's set (sets.exemplar / .k / .position) over the published block + the new
 * teams, so a set that passes here prints; a set that fails names the rule.
 *
 *   node tools/level-set/validate-digraph-sets.js <panel.json> <loc>
 *
 * panel.json = { locale, newTeams: { <t>: { t, sound:[], items:[…bank item shape…] } }, phonemesAdd:[],
 *   samesoundAdd:[[t,t]], falsePairsAdd:[{word,letters,why}], rejectedPicsAdd:[{pic,why}],
 *   sets: [ { id, teams:[3], k:[2], target: t } ], sentences: { <target>: [ { id, text, target, hits, tokens } ] } }
 * Exit 0 only when every set is printable on the core faces (base / sort / gap / match); the position face
 * (G1-394) and the sentences face (G2-372) are reported per set (a set may skip those faces).
 */
'use strict';
const fs = require('fs');
const { validateBank } = require('../../qa/verify-b5-digraphs.js');
const { bank } = require('../../lib/b5-common.js');

const [file, loc] = process.argv.slice(2);
if (!file || !loc) throw new Error('usage: validate-digraph-sets.js <panel.json> <loc>');
const P = JSON.parse(fs.readFileSync(file, 'utf8'));
const pub = bank('digraphs', loc);
const merged = (set) => ({
  ...pub,
  phonemes: [...new Set([...(pub.phonemes || []), ...(P.phonemesAdd || [])])],
  teams: { ...pub.teams, ...(P.newTeams || {}) },
  samesound: [...(pub.samesound || []), ...(P.samesoundAdd || [])],
  falsePairs: [...(pub.falsePairs || []), ...(P.falsePairsAdd || [])],
  rejectedPics: [...(pub.rejectedPics || []), ...(P.rejectedPicsAdd || [])],
  sets: { exemplar: set.teams, k: set.k, position: set.teams },
  sentences: ((P.sentences || {})[set.target] || []),
});
let bad = 0;
const teamsSeen = new Set();
for (const set of P.sets || []) {
  if (set.target !== set.teams[0]) { console.log(`${set.id}: target must be teams[0] (the page's first team)`); bad++; continue; }
  const fails = validateBank(merged(set), loc).filter((m) => !/strings\./.test(m));
  const pos = fails.filter((m) => /F4:/.test(m));
  const sen = fails.filter((m) => /sentence|sentences /.test(m));
  const core = fails.filter((m) => !pos.includes(m) && !sen.includes(m));
  set.teams.forEach((t) => teamsSeen.add(t));
  console.log(`${set.id} [${set.teams.join(' ')}] k[${set.k.join(' ')}] target ${set.target}: core ${core.length ? 'FAIL' : 'ok'} · position ${pos.length ? 'no' : 'ok'} · sentences ${sen.length ? 'no' : 'ok'}`);
  for (const m of [...core, ...pos.slice(0, 3), ...sen.slice(0, 3)]) console.log('   ' + m);
  if (core.length) bad++;
}
const unused = Object.keys(P.newTeams || {}).filter((t) => !teamsSeen.has(t));
if (unused.length) console.log(`new teams used by no set: ${unused.join(' ')}`);
console.log(bad ? `${bad} set(s) FAIL the core faces` : 'every set prints on the core faces');
process.exit(bad ? 1 : 0);
