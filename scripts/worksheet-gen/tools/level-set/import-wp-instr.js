/**
 * import-wp-instr.js — Level Set 2026-09-29 (Prefixes, Suffixes and Root Words): the native panels' round-2 strings
 * (<scratch>/wp-instr-<loc>.json) → i18n/level-instructions.json (printed level titles / instructions) and
 * i18n/interactive-instructions.json (the on-screen tap instruction, word-parts → mode → locale).
 *
 * A (type, level) that gets its own string in ANY locale gets one in EVERY locale (strings.js throws on a missing
 * locale): a locale whose published instruction stays true for that level carries its published text.
 *   node tools/level-set/import-wp-instr.js <scratchDir> [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = process.argv[2];
const DRY = process.argv.includes('--dry-run');
const ROOT = path.join(__dirname, '..', '..');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const MODES = ['base', 'picture-family', 'root-word', 'prefix-key', 'who-does-it', 'family-in-sentence'];
const REFUSED = { es: ['G3-398'], fr: ['G3-398'], it: ['G2-375'], fi: ['G2-376'] };
const REFUSED_MODE = { es: ['who-does-it'], fr: ['who-does-it'], it: ['root-word'], fi: ['prefix-key'] };
const strings = Object.fromEntries(LOCS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'strings.' + l + '.json'), 'utf8'))]));
const P = Object.fromEntries(LOCS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(DIR, 'wp-instr-' + l + '.json'), 'utf8'))]));
const problems = [];
const clean = (s, max) => typeof s === 'string' && s.trim() === s && s.length > 0 && s.length <= max && !/[{}]/.test(s);

// per (id, level): locale → string | {title, instruction}
const want = {};
const put = (id, lv, loc, v) => { ((want[id] = want[id] || {})[lv] = want[id][lv] || {})[loc] = v; };
for (const loc of LOCS) {
  const p = P[loc];
  const refused = REFUSED[loc] || [];
  for (const lv of [1, 3]) {
    const k = 'G2-376_L' + lv;
    if (refused.includes('G2-376')) continue;
    const v = p[k];
    if (!v || !clean(v.title, 90) || !clean(v.instruction, 160)) { problems.push(`${loc} ${k}: missing / too long`); continue; }
    put('G2-376', lv, loc, { title: v.title, instruction: v.instruction });
  }
  if (!clean(p['G3-399_L3'], 160)) problems.push(`${loc} G3-399_L3: missing / too long`); else put('G3-399', 3, loc, p['G3-399_L3']);
  for (const [k, v] of Object.entries(p.checks || {})) {
    const m = /^(G[123]-\d{3})_L([13])$/.exec(k);
    if (!m) { problems.push(`${loc} checks key ${k}?`); continue; }
    if (refused.includes(m[1])) continue;
    if (v === 'ok') continue;
    if (!clean(v, 160)) { problems.push(`${loc} ${k}: replacement too long`); continue; }
    put(m[1], +m[2], loc, v);
  }
  for (const mode of MODES) {
    if ((REFUSED_MODE[loc] || []).includes(mode)) continue;
    const t = (p.tap || {})[mode];
    if (!clean(t, 90)) problems.push(`${loc} tap.${mode}: missing / too long`);
  }
}
// fill every locale of a (type, level) that has an override somewhere with its published instruction
for (const [id, byLv] of Object.entries(want)) for (const [lv, byLoc] of Object.entries(byLv)) for (const loc of LOCS) {
  if (byLoc[loc] !== undefined) continue;
  if ((REFUSED[loc] || []).includes(id)) continue;
  const s = strings[loc][id];
  if (!s) { problems.push(`${loc} ${id}: no published strings`); continue; }
  byLoc[loc] = s.instruction;
}
if (problems.length) { console.log('PROBLEMS:\n  ' + problems.join('\n  ')); process.exit(1); }

const liFile = path.join(ROOT, 'i18n', 'level-instructions.json');
const li = JSON.parse(fs.readFileSync(liFile, 'utf8'));
for (const [id, byLv] of Object.entries(want)) for (const [lv, byLoc] of Object.entries(byLv)) ((li[id] = li[id] || {})[lv] = byLoc);
const iiFile = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const iiRaw = fs.readFileSync(iiFile, 'utf8');
const ii = JSON.parse(iiRaw);
ii['word-parts'] = Object.fromEntries(MODES.map((mode) => [mode, Object.fromEntries(LOCS.filter((l) => !(REFUSED_MODE[l] || []).includes(mode)).map((l) => [l, P[l].tap[mode]]))]));
for (const [id, byLv] of Object.entries(want)) for (const lv of Object.keys(byLv)) console.log(`${id} L${lv}: ${Object.keys(byLv[lv]).length} locales`);
if (!DRY) {
  fs.writeFileSync(liFile, JSON.stringify(li, null, 1) + '\n');
  const ind = iiRaw.match(/^\{\r?\n(\s+)/)[1].length;
  let out = JSON.stringify(ii, null, ind) + '\n';
  if (iiRaw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(iiFile, out);
  console.log('wrote level-instructions + interactive-instructions');
}
