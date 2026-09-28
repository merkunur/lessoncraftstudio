#!/usr/bin/env node
/**
 * lotw-candidates.js — Level Set 2026-09-28 (Letter of the Week, whole alphabet): for every letter of the
 * locale's alphabet that the bank does not carry yet, a MECHANICAL candidate list from the eligible pool
 * (approved ∧ colour-pictured ∧ traceable; da strict) — the native panel reviews it, it never ships as is.
 *
 *   node tools/level-set/lotw-candidates.js <loc> [--out=<file>]
 *
 * Per letter: `words` = every pool word containing the letter, with graphemes (de/nl/sv/no: the approved
 * chunks; letter-level locales: letters; es/it/pt/fi: a per-locale digraph pass the panel must confirm),
 * the first-target position (initial / medial / final) and the pinned colour picture; the counts per face
 * floor (8 initial · 2 medial · 2 final); the initial-letter census of the whole pool (for choosing pair /
 * avoid letters). Letters already in the bank are listed as `published`.
 */
'use strict';
const fs = require('fs');
const { bank } = require('../../lib/b3-common.js');
const { poolOf } = require('./lotw-common.js');
const { alphabets } = require('../../data/literacy/letter-knowledge.json');

const loc = process.argv[2];
if (!loc) throw new Error('usage: lotw-candidates.js <loc> [--out=<file>]');
const outArg = (process.argv.find((a) => a.startsWith('--out=')) || '').slice(6);
const B = bank('letter-of-the-week', loc);
const pool = poolOf(loc);
const initialCensus = {};
for (const p of pool) { const f = B.level === 'sound' ? p.graphemes[0] : [...p.word.toLocaleLowerCase(loc)][0]; initialCensus[f] = (initialCensus[f] || 0) + 1; }
const have = new Set((B.letters || []).map((l) => l.L));
const letters = [];
for (const L of [...alphabets[loc]]) {
  if (have.has(L)) { letters.push({ L, published: true }); continue; }
  const words = pool.filter((p) => p.graphemes.includes(L)).map((p) => {
    const at = p.graphemes.indexOf(L);
    return { ...p, pos: at, where: at === 0 ? 'initial' : at === p.graphemes.length - 1 ? 'final' : 'medial' };
  });
  const by = (w) => words.filter((x) => x.where === w).length;
  // the review list: every word is reviewed by the panel, so it is capped per position (short, common words first)
  const CAP = { initial: 16, medial: 12, final: 12 };
  const pick = (w) => words.filter((x) => x.where === w).sort((a, b) => [...a.word].length - [...b.word].length || (a.word < b.word ? -1 : 1)).slice(0, CAP[w]);
  letters.push({ L, upper: L.toLocaleUpperCase(loc), counts: { initial: by('initial'), medial: by('medial'), final: by('final'), total: words.length }, words: [...pick('initial'), ...pick('medial'), ...pick('final')] });
}
const out = { locale: loc, level: B.level, positionMode: B.positionMode, poolSize: pool.length, initialCensus, letters };
if (outArg) fs.writeFileSync(outArg, JSON.stringify(out, null, 1));
for (const l of letters) console.log(l.published ? `${l.L}: published` : `${l.L}: initial ${l.counts.initial} · medial ${l.counts.medial} · final ${l.counts.final}`);
