/**
 * data/ptx/text.js — the visible text of the Picture Tracing Level Set copies (`ptl`, 2026-10-22).
 *
 *   LS[mode] = { title: {loc: '<face head>: {NAME}'}, printTitle?: {loc}, instruction: {loc} }
 *     title        catalog/deck title (≤ 60 so the rendered <title> with the appended worksheet word stays ≤ 70; never
 *                  "free"; never a key or a screen — PDF only); {NAME} = the scene's own name → every title unique
 *     printTitle   the heading printed on the page (≤ 40); {NAME} allowed; absent → the face's published printTitle
 *     instruction  ≤ 130, TRUE of EVERY copy of the face (the published instruction names the published page's pictures)
 *   NAMES (data/ptx/names-i18n.js) — NAMES[unit][loc], a short noun phrase that reads after a colon
 *
 * EN authored by the build session against the renders; the other ten locales by native panels; one native + pedagogy
 * reviewer over tools/level-set/ptl-text-dump.js before publish.
 */
'use strict';
const path = require('path');
const LS = require('./text-ls.js');
let NAMES = null;
const names = () => NAMES || (NAMES = require('./names-i18n.js').NAMES);

function stringsFor(unit, loc, s0) {
  const { catalog, MODE_OF } = require('../../lib/ptx.js');
  const e = catalog().get(String(unit));
  if (!e) throw new Error('ptx text: unknown unit ' + unit);
  const mode = MODE_OF[e.face];
  const t = LS[mode];
  if (!t || !t.title[loc] || !t.instruction[loc]) throw new Error(`ptx text: no Level Set strings for ${mode} in ${loc}`);
  const n = (names()[unit] || {})[loc];
  if (!n) throw new Error(`ptx text: no name for ${unit} in ${loc}`);
  const fill = (s) => s.replace(/\{NAME\}/g, n);
  // after the colon of a catalogue title the name continues the sentence: lower-case its first letter where the language
  // writes it so (the published titles do: « Dessin à repasser maternelle : le chemin… », « Dibujos para repasar: el … »);
  // en keeps Title Case, de keeps its capitalised nouns. The printed heading keeps the name as written.
  const LOWER_AFTER_COLON = new Set(['fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']);
  const afterColon = /:\s*\{NAME\}/.test(t.title[loc]);   // « Où est-ce que je commence ? L'escalier » starts a new sentence
  const inTitle = LOWER_AFTER_COLON.has(loc) && afterColon ? n.replace(/^(\P{L}*)(\p{Lu})/u, (m, p, c) => p + c.toLocaleLowerCase(loc)) : n;
  // a copy whose instruction must name its OWN content (K-428 the missing parts, K-427 the counted animal, G1-431 what
  // goes in the empty space) carries INSTR[unit][loc]; every other copy takes the face's instruction
  const own = ((require('./names-i18n.js').INSTR || {})[unit] || {})[loc];
  const out = { ...s0, title: t.title[loc].replace(/\{NAME\}/g, inTitle), instruction: own || fill(t.instruction[loc]) };
  if (t.printTitle && t.printTitle[loc]) out.printTitle = fill(t.printTitle[loc]);
  return out;
}

module.exports = { stringsFor };
