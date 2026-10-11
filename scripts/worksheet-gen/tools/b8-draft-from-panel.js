#!/usr/bin/env node
/**
 * b8-draft-from-panel.js <locale> <panel.json>
 *
 * The native text of one locale is authored ONCE, per MODE (data/b8/maze-puzzles.js FACES), in a compact panel file:
 *   { locale,
 *     strings:   { <mode>: { title, printTitle, instruction, tap } × 20 },   — omit a refused mode
 *     chrome:    { mzGoBack … mzAtGoal } (13),
 *     family:    { slug, name },  skill: { full, short },  topicMeta: string,
 *     refusals:  { <mode>: reason },  enAudit: [ … ],  strandNames?: { … } }
 * and this tool writes the validator-shaped draft i18n/.draft-b8-<locale>.json (tools/validate-b8-draft.js): every
 * face id's types entry is DERIVED from its mode (title + printTitle + instruction), the bank block carries the same
 * strings + chrome, so the deck title, the page title and the screen string can never disagree.
 * Then: node tools/validate-b8-draft.js <loc> && node tools/apply-b8-locale.js <loc>.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { FACES, MODES } = require('../data/b8/maze-puzzles.js');

const [, , loc, file] = process.argv;
if (!loc || !file) { console.error('usage: b8-draft-from-panel.js <locale> <panel.json>'); process.exit(2); }
const P = JSON.parse(fs.readFileSync(file, 'utf8'));
if (P.locale !== loc) throw new Error('panel.locale ' + P.locale + ' ≠ ' + loc);
const KEY = 'maze-puzzles';
const types = {}, refusals = {}, strings = {};
for (const mode of MODES) {
  const id = FACES[mode].id;
  if (P.refusals && P.refusals[mode]) { refusals[id] = P.refusals[mode]; continue; }
  const s = P.strings[mode];
  if (!s) throw new Error(loc + ': no strings for mode ' + mode + ' and no refusal');
  types[id] = { title: s.title, printTitle: s.printTitle, instruction: s.instruction };
  strings[mode] = { title: s.title, printTitle: s.printTitle, instruction: s.instruction, tap: s.tap };
}
const draft = {
  locale: loc,
  types,
  families: { [KEY]: P.family },
  skills: { [KEY]: P.skill },
  topicMeta: { [KEY]: P.topicMeta },
  banks: { [KEY]: { strings, chrome: P.chrome } },
  refusals,
  enAudit: P.enAudit || [],
  ...(P.strandNames ? { strandNames: P.strandNames } : {}),
};
const out = path.join(__dirname, '..', 'i18n', '.draft-b8-' + loc + '.json');
fs.writeFileSync(out, JSON.stringify(draft, null, 2) + '\n');
console.log(loc + ': ' + Object.keys(types).length + ' faces, ' + Object.keys(refusals).length + ' refused → ' + path.relative(process.cwd(), out));
