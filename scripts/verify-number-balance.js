#!/usr/bin/env node
/* =====================================================================
   verify-number-balance.js — MEASURED build-gate for Number Balance
   (mini tools/number-balance.js). Fix the tool, never the gate.

   Invariants:
     N1 LEVEL IFF EQUAL   angle is 0 exactly when the two pans are worth
                          the same — exhaustively over every reachable pair
     N2 ⭐ ANALOG          |angle| is STRICTLY monotone in |difference| up
                          to the cap. This is invention #1: a near-miss
                          must lean strictly less than a wild miss
     N3 BOUNDED + ODD     |angle| <= maxAngle, and tilt(a,b) === -tilt(b,a)
     N4 HEAVIER IS LOWER  positive angle must put the RIGHT pan lower on
                          screen — the sign convention, measured through
                          panAnchor rather than assumed
     N5 NEVER SNAPS       no code path forces the angle to level; there is
                          no verdict flag that a reward could snap on
     N6 HOLD FREEZES      while held, adding a tile does not move the beam;
                          release restores the true angle
     N7 MODEL IS THIN     the state carries only left/right/held/heldAngle/
                          cloth — nothing that could hold a verdict — and
                          add/remove are immutable
     N8 NOTATION          the symbol is a DESCRIPTION: it equals the sign
                          of the difference, and never appears when the
                          notation setting is off
     N9 NO VERDICT        no grading vocabulary, no score/streak/timer, no
                          correct/wrong class, no "not equal" sign
     N10 FENCE            no reference to either balance core and no .mb-
                          or .sb- selector
     N11 IDENTITY/EXFIL   id, STORE_KEY, premium:false, free-play (no
                          tasks), one fetch on the allowlist
     N12 STRINGS/CSS      strings x11 + placeholder + apostrophe + dead
                          string, idempotent injector, print, reduced
                          motion, no .lcs- selector beyond body.nbal-wide

   Usage: node scripts/verify-number-balance.js
   Override for mutation testing: NBAL_TOOL_DIR
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.NBAL_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'number-balance.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    createElementNS: () => ({ setAttribute() {}, appendChild() {} }), head: { appendChild() {} },
    body: { classList: { add() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
try { vm.runInContext(SRC + '\n;this.__T = NumberBalance;', sandbox); }
catch (e) { console.error('FATAL — the tool did not evaluate: ' + e.message); process.exit(1); }
const T = sandbox.__T;
if (!T) { console.error('FATAL — NumberBalance is not defined'); process.exit(1); }
T.api = { t: (k) => k, lang: 'en', settings: {} };

/* ⚠ snapshot the declared identity BEFORE any test writes to it — the
   Sorting Hoops lesson: a gate that sets a field cannot then check it. */
const DECLARED = { id: T.id, STORE_KEY: T.STORE_KEY, premium: T.premium, tasks: T.tasks, nextTask: T.nextTask };

/* ---------------- N1 level iff equal ---------------- */
console.log('[physics]');
const MAXSUM = 60;
let bad1 = 0, sawLevel = 0, sawTip = 0;
for (let l = 0; l <= MAXSUM; l++) {
  for (let r = 0; r <= MAXSUM; r++) {
    const a = T.tilt(l, r);
    if (l === r) { if (a !== 0) bad1++; else sawLevel++; }
    else { if (a === 0) bad1++; else sawTip++; }
  }
}
if (bad1) err(`N1 level-iff-equal broken on ${bad1} pair(s)`);
else console.log(`  N1 level exactly when the sides are equal (${sawLevel} level, ${sawTip} tipped)`);

/* ---------------- N2 ANALOG — the invention ---------------- */
let bad2 = [];
for (let d = 1; d <= 14; d++) {
  const lo = Math.abs(T.tilt(0, d));
  const hi = Math.abs(T.tilt(0, d + 1));
  if (!(hi > lo)) bad2.push(`d=${d} (${lo.toFixed(4)}) !< d=${d + 1} (${hi.toFixed(4)})`);
}
if (bad2.length) err(`N2 the tip is NOT analog — a bigger miss must lean strictly more: ${bad2.slice(0, 3).join(', ')}`);
else {
  const near = Math.abs(T.tilt(7, 8)), wild = Math.abs(T.tilt(1, 20));
  if (!(wild > near * 2)) err(`N2 a wild miss (${wild.toFixed(2)}) barely differs from a near miss (${near.toFixed(2)}) — the lean carries no information`);
  /* ⚠ MONOTONE IS NOT ENOUGH. With k=900 every angle stays under half a
     degree — still strictly monotone, still invisible. The lean has to be
     SEEABLE or it carries no information to a six-year-old, so the floor
     is absolute, not relative. */
  else if (wild < 8) err(`N2 a wild miss leans only ${wild.toFixed(2)}deg — nobody can see that`);
  else if (near < 0.8) err(`N2 a near miss leans only ${near.toFixed(2)}deg — invisible, so the analog signal is lost at the fine end`);
  else console.log(`  N2 ANALOG and VISIBLE: strictly monotone; near-miss ${near.toFixed(2)}deg vs wild miss ${wild.toFixed(2)}deg`);
}

/* ---------------- N3 bounded + odd ---------------- */
let bad3 = 0;
for (let l = 0; l <= MAXSUM; l++) for (let r = 0; r <= MAXSUM; r++) {
  const a = T.tilt(l, r);
  if (!isFinite(a) || Math.abs(a) > T.BAL.maxAngle + 1e-9) bad3++;
  if (Math.abs(a + T.tilt(r, l)) > 1e-9) bad3++;
}
if (bad3) err(`N3 angle unbounded or not odd-symmetric (${bad3})`);
else console.log(`  N3 bounded by maxAngle ${T.BAL.maxAngle} and odd-symmetric`);

/* ---------------- N4 the heavier pan is LOWER ---------------- */
(function () {
  const a = T.tilt(2, 9);            /* right heavier -> positive */
  if (!(a > 0)) { err('N4 a heavier RIGHT pan must give a positive angle'); return; }
  const L = T.panAnchor('left', a), R = T.panAnchor('right', a);
  /* screen y grows downward, so lower on screen == larger y */
  if (!(R.y > L.y)) err(`N4 the heavier pan is not lower on screen (left y=${L.y.toFixed(1)}, right y=${R.y.toFixed(1)})`);
  else console.log(`  N4 the heavier pan hangs lower (left y=${L.y.toFixed(1)} vs right y=${R.y.toFixed(1)})`);
}());

/* ---------------- N5 never snaps ---------------- */
if (/=\s*0\s*;\s*\/\/\s*level|snapToLevel|forceLevel/.test(SRC_NC)) err('N5 a code path forces the beam level');
if (/\b(balanced|isLevel|solved|correct)\s*:/.test(SRC_NC)) err('N5 a verdict flag exists that a reward could snap on');
else console.log('  N5 no verdict flag; the angle is derived from the difference every frame');

/* ---------------- N6 HOLD freezes ---------------- */
(function () {
  let st = T.newState();
  st = T.add(st, 'left', 5);
  const before = T.targetAngle(st);
  st = T.hold(st);
  const held = T.targetAngle(st);
  const st2 = T.add(st, 'right', 9);
  const stillHeld = T.targetAngle(st2);
  if (Math.abs(held - before) > 1e-9) err('N6 holding changed the angle at the moment of holding');
  else if (Math.abs(stillHeld - held) > 1e-9) err('N6 the beam moved while held');
  else {
    const released = T.targetAngle(T.release(st2));
    if (Math.abs(released - T.tilt(5, 9)) > 1e-9) err('N6 releasing did not restore the true angle');
    else console.log('  N6 HOLD freezes the beam; release restores the truth');
  }
}());

/* ---------------- N7 the model is thin + immutable ---------------- */
console.log('[model]');
(function () {
  const st = T.newState();
  const keys = Object.keys(st).sort().join(',');
  if (keys !== 'cloth,held,heldAngle,left,right') err(`N7 the state carries unexpected fields: ${keys}`);
  const a = T.add(st, 'left', 3);
  if (st.left.length !== 0) err('N7 add() mutated the input state');
  if (a.left.length !== 1) err('N7 add() did not add');
  const b = T.removeAt(a, 'left', 0);
  if (a.left.length !== 1) err('N7 removeAt() mutated the input state');
  if (b.left.length !== 0) err('N7 removeAt() did not remove');
  /* hostile inputs must not throw */
  try { T.add(st, 'nope', 1); T.removeAt(st, 'left', 99); T.sum(null); T.symbol(st); }
  catch (e) { err('N7 the engine threw on a hostile input: ' + e.message); }
  /* a pan will not overflow what it can show */
  let full = st, i;
  for (i = 0; i < T.PAN_MAX + 4; i++) full = T.add(full, 'left', 1);
  if (full.left.length > T.PAN_MAX) err(`N7 a pan took ${full.left.length} tiles, past PAN_MAX ${T.PAN_MAX}`);
  if (!ERRORS) console.log(`  N7 state is {${keys}}, immutable, hostile-safe, capped at ${T.PAN_MAX} per pan`);
}());

/* ---------------- N8 notation is a description ---------------- */
(function () {
  const mk = (L, R) => { let s = T.newState(); L.forEach((n) => { s = T.add(s, 'left', n); }); R.forEach((n) => { s = T.add(s, 'right', n); }); return s; };
  const cases = [[[4, 3], [7], '='], [[4, 3], [9], '<'], [[9], [4, 3], '>'], [[], [], '=']];
  let bad = 0;
  cases.forEach((c) => { const got = T.symbol(mk(c[0], c[1])); if (got !== c[2]) { bad++; err(`N8 symbol for ${JSON.stringify(c[0])} vs ${JSON.stringify(c[1])} was "${got}", expected "${c[2]}"`); } });
  /* ⚠ RUNTIME, not just source: '\\u2260' is a not-equal sign by the time a
     child sees it, and a source scan cannot see it. Same escaped-codepoint
     hole that let a flag through on Say It Board. */
  const NEQ = /[\u2260\u226E\u226F]/;
  const seen = new Set();
  for (let l = 0; l <= 30; l++) for (let r = 0; r <= 30; r++) {
    let s2 = T.newState(); s2.left = [l]; s2.right = [r];
    seen.add(T.symbol(s2));
  }
  Array.from(seen).forEach((sym) => {
    if (NEQ.test(sym)) err(`N8 the symbol "${sym}" is a not-equal sign — a tipped beam is a true statement, not a mistake`);
    if (['=', '<', '>'].indexOf(sym) === -1) err(`N8 unexpected symbol "${sym}"`);
  });
  /* ⚠ AND THE ESCAPE SPELLING. A runtime scan only reaches states it can
     construct, so a sign hidden behind a threshold survives it; a literal
     scan only sees the character, so an escape survives that. Check both,
     or the smuggling route is always open. */
  if (NEQ.test(SRC)) err('N8 a not-equal sign appears in the source');
  if (/\\u(2260|226[EF])/i.test(SRC)) err('N8 a not-equal sign is smuggled in as an escape sequence');
  if (!/settings\.notation/.test(SRC_NC)) err('N8 the symbol is not gated on the notation setting');
  if (!bad) console.log('  N8 the symbol describes the beam and is gated on the notation toggle');
}());

/* ---------------- N9 no verdict ---------------- */
console.log('[stance]');
const BANNED = /\b(isCorrect|answerKey|checkAnswer|score|streak|timer|countdown|starsEarned|celebrate)\b/;
if (BANNED.test(SRC_NC)) err(`N9 grading vocabulary present: ${(SRC_NC.match(BANNED) || [])[0]}`);
if (/\.nbal-(correct|wrong|right|error|bad)\b/.test(SRC_NC)) err('N9 a correct/wrong CSS class exists');
if (/#(d00|f00|ff0000|e00|c00)\b/i.test(SRC_NC)) err('N9 a hard red appears — nothing here is a mistake');
const VERDICT = /\b(correct|incorrect|wrong|well done|try again|oops)\b/i;
Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((loc) => {
  if (VERDICT.test(T.strings[k][loc])) err(`N9 verdict wording in strings.${k}.${loc}: "${T.strings[k][loc]}"`);
}));
if (!ERRORS) console.log('  N9 nothing here grades anybody');

/* ---------------- N10 fence ---------------- */
/* separator-blind and case-blind: judge_balance_core slipped past a
   hyphen-only regex */
if (/judge[-_ ]?balance|compare[-_ ]?balance/i.test(SRC_NC)) err('N10 references a balance CORE — both are ridden by shipped graded activities');
if (/\.mb-|\.sb-/.test(SRC_NC)) err('N10 uses a measurement-bench or sort-bins selector');
else console.log('  N10 fence holds: zero references to either balance core, zero borrowed selectors');

/* ---------------- N11 identity + exfil ---------------- */
console.log('[identity + safety]');
if (DECLARED.id !== 'number-balance') err(`N11 id is "${DECLARED.id}"`);
if (DECLARED.STORE_KEY !== 'lcs:number-balance:v1') err(`N11 STORE_KEY is "${DECLARED.STORE_KEY}"`);
if (DECLARED.premium !== false) err('N11 premium must default to false');
if (DECLARED.tasks || DECLARED.nextTask) err('N11 declaring tasks/nextTask would render activity chrome — this is free-play');
const urls = (SRC_NC.match(/fetch\(\s*['"]([^'"]+)['"]/g) || []).map((s) => s.replace(/^fetch\(\s*['"]/, ''));
urls.forEach((u) => { if (u.indexOf('/api/auth/me') !== 0) err(`N11 unexpected fetch target "${u}"`); });
if (/sendBeacon|WebSocket|XMLHttpRequest|\/track|analytics/.test(SRC_NC)) err('N11 an exfiltration path exists');
if (!ERRORS) console.log(`  N11 identity ok, free-play, ${urls.length} fetch call(s) on the allowlist`);

/* ---------------- N12 strings + css ---------------- */
console.log('[l10n + css]');
/* ⚠ match EVERY quoted key inside an api.t(...) call, not just a bare
   literal — the tool uses ternaries (api.t(x ? 'letGo' : 'hold')) and
   passes keys by variable (_gateInline(foot, 'gatePrint')). The narrow
   regex reported ten false positives and buried the one real dead
   string, which was the moat. */
const used = new Set();
/* ⚠ and not TOO wide either: api.t(side === 'left' ? 'panLeft' : 'panRight')
   contains 'left' as a COMPARISON operand, not a key. Take only the
   literals api.t actually consumes — the whole argument, or a ternary
   branch after ? or : — never one sitting behind an equality operator. */
(SRC_NC.match(/api\.t\([^)]*\)/g) || []).forEach((call) => {
  const inner = call.slice(call.indexOf('(') + 1, -1);
  const re = /(^|[?:]\s*)['"]([a-zA-Z_]+)['"]/g;
  let m;
  while ((m = re.exec(inner)) !== null) used.add(m[2]);
});
(SRC_NC.match(/_gateInline\([^,]+,\s*'([a-zA-Z]+)'\)/g) || [])
  .forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
(SRC_NC.match(/labelKey:\s*'([a-zA-Z]+)'/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
const SHELL_READ = ['title', 'instruction'];
const declared = new Set(Object.keys(T.strings));
Array.from(used).forEach((k) => { if (!declared.has(k)) err(`N12 api.t('${k}') has no string`); });
const dead = Array.from(declared).filter((k) => !used.has(k) && SHELL_READ.indexOf(k) === -1);
/* ⚠ the moat strings are load-bearing: if the spoken equals-sign frame is
   declared but never wired, the tool has lost the thing that makes it
   worth building in eleven languages. That is an ERROR, not a warning. */
const MOAT = ['sayIt', 'equalsFrame', 'heavierFrame', 'andWord'];
MOAT.forEach((k) => {
  if (!declared.has(k)) err(`N12 the moat string '${k}' is missing`);
  else if (!used.has(k) && SRC_NC.indexOf("'" + k + "'") === -1) err(`N12 the moat string '${k}' is declared but never wired`);
});
if (dead.length) warn(`N12 ${dead.length} declared but unused string(s): ${dead.join(', ')}`);
Object.keys(T.strings).forEach((k) => {
  if (!T.strings[k].en) err(`N12 strings.${k} has no en`);
  Object.keys(T.strings[k]).forEach((loc) => { if (/'/.test(T.strings[k][loc])) err(`N12 straight apostrophe in strings.${k}.${loc}`); });
});
const locs = new Set();
Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((l) => locs.add(l)));
console.log(`  N12 ${declared.size} strings across ${locs.size} locale(s): ${Array.from(locs).join(' ')}`);
if (locs.size < 11) warn(`N12 ${11 - locs.size} locale(s) still to author — the locale pass has not run`);

if (!/getElementById\('nbal-style'\)\)\s*return/.test(SRC_NC)) err('N12 the CSS injector is not idempotent');
if (!/@media print/.test(SRC)) err('N12 no @media print block');
if (!/prefers-reduced-motion/.test(SRC)) err('N12 no prefers-reduced-motion guard');
const lcsSel = (SRC.match(/\.lcs-[a-z-]+/g) || []).filter((s) => s !== '.lcs-header');
if (lcsSel.length) err(`N12 restyles shell internals: ${Array.from(new Set(lcsSel)).join(', ')}`);
if (!/body\.nbal-wide/.test(SRC)) err('N12 no body.nbal-wide scope for the shell overrides');
if (!ERRORS) console.log('  N12 css ok');

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
