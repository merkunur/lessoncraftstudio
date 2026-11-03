/**
 * rc-text.js — the reading-comprehension text helpers shared by the Level Set validator (tools/level-set/rc-validate.js,
 * Node) and the reading screen (lib/reading-comprehension-screen.js, in the maker bundles too — so no Node module here).
 *   norm(s, loc)                NFC, curly apostrophes straight, spaces collapsed, lower case in the language
 *   literalIn(needle, hay, loc) the answer starts at a WORD START (Unicode letters) and may carry an inflection ending:
 *                               'modig' is NOT written in 'tålmodig', 'to' not in 'store', but 'Gelb' is in 'gelbe'
 */
'use strict';
const norm = (s, loc) => String(s).normalize('NFC').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim().toLocaleLowerCase(loc || 'en');
const reEsc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const literalIn = (needle, hay, loc) => new RegExp('(?<!\\p{L})' + reEsc(norm(needle, loc)), 'u').test(norm(hay, loc));
module.exports = { norm, literalIn, reEsc };
