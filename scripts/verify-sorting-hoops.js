#!/usr/bin/env node
/* =====================================================================
   verify-sorting-hoops.js — MEASURED build-gate for Sorting Hoops
   (mini tools/sorting-hoops.js). Fix the tool, never the gate.

   Invariants:
     S1 TOTAL       satisfies() over EVERY (rule x item) pair returns a
                    strict boolean — never undefined, never a throw
     S2 SPLITS      every offered rule leaves both sides non-empty; a rule
                    that admits everything, or nothing, cannot be guessed
     S3 REGION      regionFor is exhaustive and agrees with satisfies;
                    an item true of both rules lands in the OVERLAP
     S4 NO TELL     ⚠ the hover path must not consult the rule. Structural:
                    _hover/_zoneAt/_clearHover may not mention satisfies,
                    regionFor, ruleA or ruleB
     S5 NO LEAK     the rule is never rendered before reveal — _capFor
                    returns the hidden label whenever mode is guess and
                    revealed is false
     S6 NOT LOST    a released item is re-placed OUTSIDE, never deleted:
                    the mat's item count is invariant across a drop
     S7 NO VERDICT  no grading vocabulary, no score/streak/timer field, and
                    no correct/wrong CSS class anywhere
     S8 FENCE       zero lines imported from sort-bins-core (two shipped
                    graded activities ride it); no .sb- selector
     S9 IDENTITY    id, STORE_KEY, premium:false
     S10 NO EXFIL   every fetch is on the allowlist; no beacon/WS/track
     S11 STRINGS    every key used by the tool exists; no dead strings
     S12 CSS        idempotent injector, print block, reduced-motion, and
                    no .lcs- selector beyond the sanctioned body.hp-wide

   Usage: node scripts/verify-sorting-hoops.js
   Override for mutation testing: HP_TOOL_DIR
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.HP_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'sorting-hoops.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

/* ---------- load the tool in a sandbox ---------- */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    createElementNS: () => ({ setAttribute() {}, appendChild() {} }), head: { appendChild() {} },
    body: { classList: { add() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
try { vm.runInContext(SRC + '\n;this.__T = SortingHoops;', sandbox); }
catch (e) { console.error('FATAL — the tool did not evaluate: ' + e.message); process.exit(1); }
const T = sandbox.__T;
if (!T) { console.error('FATAL — SortingHoops is not defined'); process.exit(1); }

/* a stub api so ruleLabel etc. can run */
T.api = { t: (k) => k, lang: 'en' };

/* ⚠ SNAPSHOT THE DECLARED IDENTITY BEFORE ANY TEST TOUCHES IT. S9 used to
   read T.premium at the end, by which time S2 had set it to true and back
   to false — so "premium defaults true" survived mutation testing. A
   stateful gate that checks a field it has itself written checks nothing. */
const DECLARED = { id: T.id, STORE_KEY: T.STORE_KEY, premium: T.premium, tasks: T.tasks, nextTask: T.nextTask };

/* ---------- fixtures ---------- */
const blocks = T.blockSet();
const IDX = JSON.parse(fs.readFileSync(path.join(ROOT, 'mini tools', 'pww-index-en.json'), 'utf8'));
const ATTR = JSON.parse(fs.readFileSync(path.join(ROOT, 'mini tools', 'object-attributes.json'), 'utf8'));
const built = T.buildPictures(IDX, ATTR, null);
const pics = built.items;
T.themeName = built.themes;
const ITEMS = blocks.concat(pics);

console.log(`[fixtures] ${blocks.length} blocks + ${pics.length} pictures = ${ITEMS.length} items`);
if (blocks.length !== 32) err(`S0 expected 32 logic blocks (4 shapes x 4 colours x 2 sizes), got ${blocks.length}`);
if (pics.length < 500) err(`S0 only ${pics.length} picture items built — the attribute join is broken`);

/* every rule the tool can offer, premium included */
const RULES = [];
T.COLOURS.forEach((c) => RULES.push({ f: 'colour', v: c.k }));
T.SHAPES.forEach((s) => RULES.push({ f: 'shape', v: s.k }));
T.SIZES.forEach((s) => RULES.push({ f: 'size', v: s.k }));
Object.keys(ATTR.$fields).forEach((f) => ATTR.$fields[f].forEach((v) => RULES.push({ f, v })));
Object.keys(T.themeName).forEach((k) => RULES.push({ f: 'theme', v: k }));
['a', 'b', 'c', 's', 't'].forEach((c) => RULES.push({ f: 'initial', v: c }));

/* ---------- S1 totality ---------- */
console.log('[engine]');
let nonBool = 0, threw = 0;
RULES.forEach((r) => ITEMS.forEach((it) => {
  let v;
  try { v = T.satisfies(r, it); } catch (_) { threw++; return; }
  if (v !== true && v !== false) nonBool++;
}));
/* and the hostile inputs */
[[null, ITEMS[0]], [{ f: 'nope', v: 1 }, ITEMS[0]], [{ f: 'colour' }, ITEMS[0]], [RULES[0], null], [RULES[0], {}]]
  .forEach((p) => { try { if (typeof T.satisfies(p[0], p[1]) !== 'boolean') nonBool++; } catch (_) { threw++; } });
if (threw) err(`S1 satisfies() threw ${threw} time(s)`);
if (nonBool) err(`S1 satisfies() returned a non-boolean ${nonBool} time(s)`);
if (!threw && !nonBool) console.log(`  S1 satisfies() total over ${RULES.length * ITEMS.length} pairs + hostile inputs`);

/* ---------- S2 every rule the tool OFFERS splits ---------- */
const worldOf = (r) => (['colour', 'shape', 'size'].indexOf(r.f) > -1 ? blocks : pics);
const dead = RULES.filter((r) => !T.splits(r, worldOf(r)));
/* the raw space legitimately contains duds — an `initial` letter no card
   starts with, say. What must never happen is one reaching the teacher. */
['block', 'picture'].forEach((world) => {
  T.world = world; T.premium = true;
  T.pool = world === 'block' ? blocks : pics;
  const offered = T._availableRules();
  const leak = offered.filter((r) => !T.splits(r, T.pool));
  if (!offered.length) err(`S2 the ${world} world offers no rules at all`);
  else if (leak.length) err(`S2 ${world}: ${leak.length} offered rule(s) do not split: ${leak.slice(0, 5).map((r) => r.f + '=' + r.v).join(', ')}`);
  else console.log(`  S2 ${world}: all ${offered.length} offered rules split the pool`);
});
/* ONL rule: an assertion that cannot genuinely fail is deleted, not kept.
   The old "did the filter remove anything?" probe compared picture-offered
   against the whole raw space and could never fail meaningfully. */
if (dead.length) console.log(`  S2 ${dead.length} raw rule(s) filtered out before the teacher sees them`);
T.premium = false;

/* ---------- S2b the two worlds must not bleed ---------- */
/* A block rule must match no picture and a picture rule no block, even if
   an item is handed a field it has no business carrying. Without this a
   `case 'colour': return item.colour === rule.v` (no kind check) survives
   mutation testing, because today's pictures simply have no colour field —
   the isolation is accidental rather than enforced. */
const spy = { uid: 'x', kind: 'picture', word: 'spy', themes: [], attr: ATTR.keys.apple,
  colour: 'red', shape: 'circle', size: 'big' };
const spyBlock = { uid: 'y', kind: 'block', shape: 'circle', colour: 'red', size: 'big',
  word: 'circle', themes: ['shapes'], attr: ATTR.keys.apple, syl: 2 };
let bleed = 0;
[{ f: 'colour', v: 'red' }, { f: 'shape', v: 'circle' }, { f: 'size', v: 'big' }]
  .forEach((r) => { if (T.satisfies(r, spy)) { bleed++; err(`S2b block rule ${r.f}=${r.v} matched a picture`); } });
[{ f: 'living', v: ATTR.keys.apple.living }, { f: 'theme', v: 'shapes' }, { f: 'syllables', v: 2 },
  { f: 'initial', v: 'c' }]
  .forEach((r) => { if (T.satisfies(r, spyBlock)) { bleed++; err(`S2b picture rule ${r.f}=${r.v} matched a block`); } });
if (!bleed) console.log('  S2b the block and picture worlds are isolated by kind, not by accident');

/* ---------- S2c no empty theme reaches the picker ---------- */
const emptyThemes = Object.keys(built.themes).filter((t) => !pics.some((p) => p.themes.indexOf(t) > -1));
if (emptyThemes.length) err(`S2c ${emptyThemes.length} theme(s) with no sortable item are still offered: ${emptyThemes.join(', ')}`);
else console.log(`  S2c all ${Object.keys(built.themes).length} offered themes have items (the all-non-object themes are dropped)`);

/* ---------- S3 regionFor ---------- */
const rA = { f: 'colour', v: 'red' }, rB = { f: 'shape', v: 'circle' };
let bad3 = 0, sawBoth = 0, sawOut = 0;
blocks.forEach((it) => {
  const reg = T.regionFor(it, rA, rB);
  const a = T.satisfies(rA, it), b = T.satisfies(rB, it);
  const want = a && b ? 'both' : a ? 'a' : b ? 'b' : 'out';
  if (reg !== want) bad3++;
  if (reg === 'both') sawBoth++;
  if (reg === 'out') sawOut++;
});
if (bad3) err(`S3 regionFor disagreed with satisfies on ${bad3} item(s)`);
else if (!sawBoth) err('S3 no item ever landed in the OVERLAP — the lens is the whole pedagogy');
else if (!sawOut) err('S3 no item ever landed outside');
else console.log(`  S3 regionFor exhaustive (${sawBoth} in the overlap, ${sawOut} outside)`);
if (T.regionFor(blocks[0], null, null) !== 'out') err('S3 with no rules set everything must fall outside');

/* ---------- S3b the tray must exercise the LENS ---------- */
/* With two rules set, a tray that contains nothing satisfying both leaves
   the overlap unused — and the overlap is the entire pedagogy. Measured
   over the picture world with a rule pair whose intersection is non-empty. */
T.mode = 'guess'; T.world = 'picture'; T.premium = true; T.pool = pics;
T.ruleA = { f: 'living', v: 'living' }; T.ruleB = { f: 'habitat', v: 'water' };
T.placement = {};
T._fillTray();
const regions = {};
T.tray.forEach((it) => { const r = T.regionFor(it, T.ruleA, T.ruleB); regions[r] = (regions[r] || 0) + 1; });
const wantRegions = ['both', 'a', 'b', 'out'];
const missing = wantRegions.filter((r) => !regions[r]);
if (!T.tray.length) err('S3b the tray came back empty');
else if (missing.length) err(`S3b the tray never exercises: ${missing.join(', ')} (got ${JSON.stringify(regions)})`);
else console.log(`  S3b the tray exercises all four regions ${JSON.stringify(regions)}`);
T.mode = 'open'; T.ruleA = null; T.ruleB = null; T.premium = false;

/* ---------- S4 no tell ---------- */
console.log('[the three inventions]');
const hoverSrc = (SRC_NC.match(/_hover:[\s\S]*?\n  \},/) || [''])[0]
  + (SRC_NC.match(/_zoneAt:[\s\S]*?\n  \},/) || [''])[0]
  + (SRC_NC.match(/_clearHover:[\s\S]*?\n  \}/) || [''])[0];
if (!hoverSrc.trim()) err('S4 could not find the hover path to check');
const tells = ['satisfies', 'regionFor', 'ruleA', 'ruleB'].filter((w) => hoverSrc.indexOf(w) > -1);
if (tells.length) err(`S4 the hover path consults the rule (${tells.join(', ')}) — the hoop must not answer until you let go`);
else console.log('  S4 no tell: the hover path cannot see the rule');

/* ---------- S5 no leak ---------- */
const capSrc = (SRC_NC.match(/_capFor:[\s\S]*?\n  \},/) || [''])[0];
if (!/revealed/.test(capSrc) || !/hiddenRule/.test(capSrc)) err('S5 _capFor does not gate on `revealed` / the hidden label');
else {
  T.mode = 'guess'; T.revealed = false; T.ruleA = rA; T.ruleB = rB;
  const capA = T._capFor('a'), capB = T._capFor('b');
  if (capA !== 'hiddenRule' || capB !== 'hiddenRule') err(`S5 the rule leaked before reveal ("${capA}" / "${capB}")`);
  else {
    T.revealed = true;
    if (T._capFor('a') === 'hiddenRule') err('S5 reveal does not show the rule');
    else console.log('  S5 the rule is hidden until the teacher reveals it');
  }
  T.mode = 'open'; T.revealed = false;
}

/* ---------- S6 a released item is not lost ---------- */
const dropSrc = (SRC_NC.match(/_drop:[\s\S]*?\n  \},/) || [''])[0];
if (/delete this\.placement|splice\(/.test(dropSrc)) err('S6 _drop removes the item instead of releasing it outside');
else if (!/'out'/.test(dropSrc)) err("S6 _drop never places a released item 'out' — the counter-example set is the other half of the evidence");
else console.log('  S6 a released item is re-placed outside, never removed');

/* ---------- S7 no verdict ---------- */
console.log('[stance]');
const BANNED = /\b(isCorrect|answerKey|checkAnswer|score|streak|timer|countdown|stars?Earned)\b/;
if (BANNED.test(SRC_NC)) err(`S7 grading/scoring vocabulary present: ${(SRC_NC.match(BANNED) || [])[0]}`);
if (/\.hp-(correct|wrong|right|error|bad)\b/.test(SRC_NC)) err('S7 a correct/wrong CSS class exists');
if (/#(d00|f00|ff0000|e00)/i.test(SRC_NC)) warn('S7 a hard red appears — check it is not a verdict');
const VERDICT_WORDS = /\b(correct|incorrect|wrong|well done|try again|oops)\b/i;
Object.keys(T.strings).forEach((k) => {
  Object.keys(T.strings[k]).forEach((loc) => {
    if (VERDICT_WORDS.test(T.strings[k][loc])) err(`S7 verdict wording in strings.${k}.${loc}: "${T.strings[k][loc]}"`);
  });
});
if (!ERRORS) console.log('  S7 nothing here grades anybody');

/* ---------- S8 fence ---------- */
if (/\.sb-|sort-bins|SortBins/.test(SRC_NC)) err('S8 references sort-bins — two shipped graded activities ride that core');
else console.log('  S8 fence holds: zero lines and zero selectors from sort-bins-core');

/* ---------- S9 identity ---------- */
console.log('[identity + safety]');
if (DECLARED.id !== 'sorting-hoops') err(`S9 id is "${DECLARED.id}"`);
if (DECLARED.STORE_KEY !== 'lcs:sorting-hoops:v1') err(`S9 STORE_KEY is "${DECLARED.STORE_KEY}"`);
if (DECLARED.premium !== false) err('S9 premium must default to false');
if (DECLARED.tasks || DECLARED.nextTask) err('S9 declaring tasks/nextTask would render activity chrome — this is a free-play instrument');
if (!ERRORS) console.log('  S9 identity ok, free-play (no tasks, no nextTask)');

/* ---------- S10 no exfil ---------- */
const ALLOW = ['/api/auth/me', '/mini-tools/pww-index-', '/mini-tools/object-attributes.json', '/mini-tools/syllable-counts.json'];
const fetches = (SRC_NC.match(/fetch\(\s*['"][^'"]+['"]|fetch\(\s*'[^']*'\s*\+/g) || []);
const urls = (SRC_NC.match(/fetch\(\s*['"]([^'"]+)['"]/g) || []).map((s) => s.replace(/^fetch\(\s*['"]/, ''));
urls.forEach((u) => { if (!ALLOW.some((a) => u.indexOf(a) === 0)) err(`S10 unexpected fetch target "${u}"`); });
if (/sendBeacon|WebSocket|XMLHttpRequest|\/track|analytics/.test(SRC_NC)) err('S10 an exfiltration path exists');
if (!ERRORS) console.log(`  S10 ${fetches.length} fetch call(s), all on the allowlist, no beacon/WS`);

/* ---------- S11 strings ---------- */
console.log('[l10n + css]');
const used = new Set((SRC_NC.match(/api\.t\(\s*'([a-zA-Z_]+)'\s*\)/g) || [])
  .map((s) => s.replace(/.*'([a-zA-Z_]+)'.*/, '$1')));
(SRC_NC.match(/label:\s*'([a-zA-Z]+)'/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
Object.keys(T.VALUE_LABEL).forEach((k) => used.add(T.VALUE_LABEL[k]));
const declared = new Set(Object.keys(T.strings));
Array.from(used).forEach((k) => { if (!declared.has(k)) err(`S11 api.t('${k}') has no string`); });
/* title + instruction are read by the SHELL, not by api.t here */
const SHELL_READ = ['title', 'instruction'];
const deadStr = Array.from(declared).filter((k) => !used.has(k) && SHELL_READ.indexOf(k) === -1 && SRC_NC.indexOf("'" + k + "'") === -1);
if (deadStr.length) warn(`S11 ${deadStr.length} declared but unused string(s): ${deadStr.join(', ')}`);
Object.keys(T.strings).forEach((k) => {
  if (!T.strings[k].en) err(`S11 strings.${k} has no en`);
  Object.keys(T.strings[k]).forEach((loc) => { if (/'/.test(T.strings[k][loc])) err(`S11 straight apostrophe in strings.${k}.${loc}`); });
});
const locs = new Set();
Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((l) => locs.add(l)));
console.log(`  S11 ${declared.size} strings across ${locs.size} locale(s): ${Array.from(locs).join(' ')}`);
if (locs.size < 11) warn(`S11 ${11 - locs.size} locale(s) still to author — the locale pass has not run`);

/* ---------- S12 css ---------- */
if (!/getElementById\('hp-style'\)\)\s*return/.test(SRC_NC)) err('S12 the CSS injector is not idempotent');
if (!/@media print/.test(SRC)) err('S12 no @media print block');
if (!/prefers-reduced-motion/.test(SRC)) err('S12 no prefers-reduced-motion guard');
const lcsSel = (SRC.match(/\.lcs-[a-z-]+/g) || []).filter((s) => s !== '.lcs-header');
if (lcsSel.length) err(`S12 restyles shell internals: ${Array.from(new Set(lcsSel)).join(', ')}`);
if (!/body\.hp-wide/.test(SRC)) warn('S12 no body.hp-wide scope — shell overrides must be scoped');
if (!ERRORS) console.log('  S12 css ok');

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
