/**
 * data/ptx/names-i18n.js — the per-copy text of the Picture Tracing Level Set (ptl):
 *   NAMES[unit][loc]  the copy's own name (the {NAME} of data/ptx/text-ls.js; reads after a colon)
 *   INSTR[unit][loc]  a copy's own instruction, only for the faces that name their content (count, finish, trace-and-draw)
 *   WORDS[unit][loc]  the four picture words of a picture-and-word copy
 * EN comes from the scene files (data/ptx/scenes-*.js `name.en`, `instr.en`, `words.en`); the other locales from the
 * native panels' tables data/ptx/i18n/<loc>.json ({ names: {unit: s}, instr: {unit: s}, words: {unit: [4]} }).
 */
'use strict';
const fs = require('fs'); const path = require('path');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const NAMES = {}, INSTR = {}, WORDS = {};
const { catalog } = require('../../lib/ptx.js');
for (const e of catalog().values()) {
  if (e.name && e.name.en) (NAMES[e.id] = NAMES[e.id] || {}).en = e.name.en;
  if (e.instr && e.instr.en) (INSTR[e.id] = INSTR[e.id] || {}).en = e.instr.en;
  if (e.words && e.words.en) (WORDS[e.id] = WORDS[e.id] || {}).en = e.words.en;
}
for (const loc of LOCS.slice(1)) {
  const f = path.join(__dirname, 'i18n', loc + '.json');
  if (!fs.existsSync(f)) continue;
  const t = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [u, v] of Object.entries(t.names || {})) (NAMES[u] = NAMES[u] || {})[loc] = v;
  for (const [u, v] of Object.entries(t.instr || {})) (INSTR[u] = INSTR[u] || {})[loc] = v;
  for (const [u, v] of Object.entries(t.words || {})) (WORDS[u] = WORDS[u] || {})[loc] = v;
}
module.exports = { NAMES, INSTR, WORDS, LOCS };
