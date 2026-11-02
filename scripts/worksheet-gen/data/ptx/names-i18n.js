/**
 * data/ptx/names-i18n.js — the per-copy text of the Picture Tracing Level Set (ptl):
 *   NAMES[unit][loc]  the copy's own name (the {NAME} of data/ptx/text-ls.js; reads after a colon)
 *   INSTR[unit][loc]  a copy's own instruction, only for the faces that name their content (count, finish, trace-and-draw)
 *   WORDS[unit][loc]  the four picture words of a picture-and-word copy
 * EN comes from the scene files (data/ptx/scenes-*.js `name.en`, `instr.en`, `words.en`); the other locales from the
 * native panels' tables data/ptx/i18n/<loc>.json ({ names: {unit: s}, instr: {unit: s}, words: {unit: [4]} }).
 */
'use strict';
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const NAMES = {}, INSTR = {}, WORDS = {};
const { catalog } = require('../../lib/ptx.js');
for (const e of catalog().values()) {
  if (e.name && e.name.en) (NAMES[e.id] = NAMES[e.id] || {}).en = e.name.en;
  if (e.instr && e.instr.en) (INSTR[e.id] = INSTR[e.id] || {}).en = e.instr.en;
  // a scene may carry every locale's words (G1-430 builds them from image-vocabulary.js); a native table overrides them
  for (const [l, w] of Object.entries(e.words || {})) (WORDS[e.id] = WORDS[e.id] || {})[l] = w;
}
// (literal requires: the Picture Tracing maker bundles the ten tables — makers 2026-11-02)
const TABLES = { de: require('./i18n/de.json'), fr: require('./i18n/fr.json'), es: require('./i18n/es.json'), pt: require('./i18n/pt.json'), it: require('./i18n/it.json'), nl: require('./i18n/nl.json'), sv: require('./i18n/sv.json'), da: require('./i18n/da.json'), no: require('./i18n/no.json'), fi: require('./i18n/fi.json') };
for (const loc of LOCS.slice(1)) {
  const t = TABLES[loc];
  if (!t) continue;
  for (const [u, v] of Object.entries(t.names || {})) (NAMES[u] = NAMES[u] || {})[loc] = v;
  for (const [u, v] of Object.entries(t.instr || {})) (INSTR[u] = INSTR[u] || {})[loc] = v;
  for (const [u, v] of Object.entries(t.words || {})) (WORDS[u] = WORDS[u] || {})[loc] = v;
}
module.exports = { NAMES, INSTR, WORDS, LOCS };
