#!/usr/bin/env node
/**
 * import-cursive-panels.js — Level Set 2026-09-28: the 9 native panels' Cursive content → the data the
 * build reads. Validates every entry against the page's OWN rules (the same ones verify() enforces) and
 * drops — loudly — whatever a page could not print, so a panel slip never becomes a QA-FAIL at render.
 *
 *   node tools/level-set/import-cursive-panels.js <dir with cur-text-<loc>.json>
 * writes data/b6/cursive-writing-levelset.json and the G2-384/G2-385/G3-401 entries of i18n/level-instructions.json
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { bank } = require('../../lib/b6-common.js');
const { CURSIVE_WRITING_NEUTRAL: N } = require('../../data/b6/cursive-writing.js');
const T = require('../../types/g2/G2-377-cursive-writing.js');

const dir = process.argv[2];
if (!dir) throw new Error('usage: import-cursive-panels.js <dir>');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'da', 'no'];
const out = { _note: 'Level Set 2026-09-28 — Cursive Writing content for the NEW copies only (native panels ×9; importer tools/level-set/import-cursive-panels.js). The published pages never read this file.' };
const instr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'i18n', 'level-instructions.json'), 'utf8'));
let problems = 0;
const warn = (loc, m) => { problems++; console.log(`  ${loc}: dropped ${m}`); };

for (const loc of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, `cur-text-${loc}.json`), 'utf8'));
  const b = bank('cursive-writing', loc);
  const lower = (x) => String(x).toLocaleLowerCase(loc);
  const lifts = new Set(b.units.flatMap((u) => [...(N.units[u].lift || '')]));
  const oneLetter = (T.ONE_LETTER_DIGRAPHS[loc] || []);
  const existingPairs = new Set(b.units.flatMap((u) => (b.joins[u] || []).map((x) => x.pair)));
  // capitals: the word starts with its capital, letters only, ≤ 9
  const capitals = [];
  for (const e of j.capitals || []) {
    if (!e.capital || [...e.word][0] !== e.capital || !/^\p{L}+$/u.test(e.word) || [...e.word].length > 9) { warn(loc, `capital ${JSON.stringify(e)}`); continue; }
    capitals.push({ capital: e.capital, word: e.word, kind: e.kind === 'word' ? 'word' : 'name' });
  }
  // EVERY capital of the alphabet must survive (the whole point of the expansion)
  const ALPHA = { en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', de: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ', es: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ', fr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', it: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', pt: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', nl: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', da: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ', no: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ' };
  const missing = [...ALPHA[loc]].filter((C) => !capitals.some((c) => c.capital === C));
  if (missing.length) throw new Error(`${loc}: no usable entry for capital(s) ${missing.join(' ')}`);
  capitals.sort((x, y) => ALPHA[loc].indexOf(x.capital) - ALPHA[loc].indexOf(y.capital));
  // joins: two lowercase letters, in the word, not a lift start, not one letter, not a base chain, not a published pair
  const joinsMore = [], seen = new Set();
  for (const e of j.joins || []) {
    const pr = e.pair, chars = [...(pr || '')];
    const bad = chars.length !== 2 || !chars.every((c) => /\p{Ll}/u.test(c)) || !String(e.word).includes(pr) || lifts.has(chars[0]) ||
      oneLetter.includes(lower(pr)) || chars[0] === chars[1] || existingPairs.has(pr) || seen.has(pr) || !['easy', 'mixed', 'hard'].includes(e.tier) || [...e.word].length > 9;
    if (bad) { warn(loc, `join ${JSON.stringify(e)}`); continue; }
    seen.add(pr); joinsMore.push({ pair: pr, word: e.word, tier: e.tier });
  }
  // sentences: 4-6 words, capital first, exactly one full stop at the end, ≤ 29 characters (one line)
  const sentencesMore = [];
  for (const e of j.sentences || []) {
    const t = e.text || '', n = t.trim().split(/\s+/).length;
    if (n < 4 || n > 6 || !/^\p{Lu}/u.test(t) || !/^[^.!?]*\.$/.test(t) || [...t].length > 29 || (b.sentences || []).includes(t) || !['short', 'medium', 'long'].includes(e.len)) { warn(loc, `sentence ${JSON.stringify(e)}`); continue; }
    sentencesMore.push({ text: t, len: e.len });
  }
  for (const k of ['and', 'lettersTitle', 'capitalsTitle', 'instr384L3', 'instr385L3', 'instr401L3', 'instr401L1']) if (!j[k]) throw new Error(`${loc}: ${k} missing`);
  if (!j.lettersTitle.includes('{LETTERS}') || !j.capitalsTitle.includes('{LETTERS}')) throw new Error(`${loc}: a title template without {LETTERS}`);
  out[loc] = { capitals, joinsMore, sentencesMore, and: j.and, lettersTitle: j.lettersTitle, capitalsTitle: j.capitalsTitle };
  for (const [id, lv, key] of [['G2-384', '3', 'instr384L3'], ['G2-385', '3', 'instr385L3'], ['G3-401', '3', 'instr401L3']]) {
    ((instr[id] = instr[id] || {})[lv] = instr[id][lv] || {})[loc] = j[key];
  }
  const tiers = ['easy', 'mixed', 'hard'].map((t) => t + ' ' + joinsMore.filter((x) => x.tier === t).length).join(', ');
  const lens = ['short', 'medium', 'long'].map((t) => t + ' ' + sentencesMore.filter((x) => x.len === t).length).join(', ');
  console.log(`${loc}: capitals ${new Set(capitals.map((c) => c.capital)).size} letters / ${capitals.length} entries · joins ${joinsMore.length} (${tiers}) · sentences ${sentencesMore.length} (${lens})`);
}
fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'b6', 'cursive-writing-levelset.json'), JSON.stringify(out, null, 1) + '\n');
fs.writeFileSync(path.join(__dirname, '..', '..', 'i18n', 'level-instructions.json'), JSON.stringify(instr, null, 1) + '\n');
console.log(problems ? `${problems} entries dropped (listed above)` : 'every entry kept');
