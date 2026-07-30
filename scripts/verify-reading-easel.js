#!/usr/bin/env node
/* =====================================================================
   verify-reading-easel.js — MEASURED build-gate for Reading Easel
   (mini tools/reading-easel.js). Fix the tool, never the gate.

   Invariants:
     R1  THE PARTITION      for EVERY subset of boundaries on lines of
                            length 1..7, the derived groups cover every
                            word index exactly once, contiguously, in
                            order. Exhaustive — 2^(n-1) per length.
     R2 ⭐ SAME WORDS        strip the separators from either reading and
                            you get the line back, verbatim. The robot
                            and the scooped reading differ ONLY in
                            grouping. This is the whole honesty claim.
     R3  THE CONTRAST       the two readings are actually different
                            whenever a boundary exists, and robot always
                            inserts more separators than scooped
     R4  TOKENISER          pure + total on hostile input, punctuation
                            rides with its word, capped at MAX_WORDS
     R5  MODEL              immutable mutators, hostile-safe, a new line
                            never inherits the old line's scoops
     R6  NO TIMER           no stopwatch, no words-per-minute, nothing
                            that times a child — this is a FLUENCY tool
                            and the whole market gets this wrong
     R7  NO VERDICT         no grading vocabulary, no correct/wrong class
     R8  SPEECH LOCK        every speak() carries a literal type:'ui' and
                            lang: this.api.lang, with no nested braces
                            (the shape every verify-*.js gate scans for)
     R9  VOICE HONESTY      hasVoice() is wired and gates every speak,
                            and the 🔇 affordance exists
     R10 NO innerHTML       teacher text reaches the DOM by textContent
     R11 FENCE              no reference to the adjacent shipped surfaces
     R12 IDENTITY/EXFIL     id, STORE_KEY, premium:false, free-play, one
                            fetch on the allowlist
     R13 STRINGS/CSS        strings x11, starters per locale, injector,
                            print, reduced motion, tap floor

   Usage: node scripts/verify-reading-easel.js
   Override for mutation testing: RDE_TOOL_DIR
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.RDE_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'reading-easel.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    createElementNS: () => ({ setAttribute() {}, appendChild() {} }), head: { appendChild() {} },
    body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
try { vm.runInContext(SRC + '\n;this.__T = ReadingEasel;', sandbox); }
catch (e) { console.error('FATAL — the tool did not evaluate: ' + e.message); process.exit(1); }
const T = sandbox.__T;
if (!T) { console.error('FATAL — ReadingEasel is not defined'); process.exit(1); }
T.api = { t: (k) => k, lang: 'en', settings: {}, announce() {} };

/* identity BEFORE any test writes to it (the Sorting Hoops lesson) */
const DECLARED = { id: T.id, STORE_KEY: T.STORE_KEY, premium: T.premium, tasks: T.tasks, nextTask: T.nextTask };

const mk = (words, breaks) => ({ words: words.slice(), breaks: (breaks || []).slice(), step: -1 });

/* ---------------- R1 the partition ---------------- */
console.log('[the partition]');
let checked = 0, bad = 0;
for (let n = 1; n <= 7; n++) {
  const words = []; for (let i = 0; i < n; i++) words.push('w' + i);
  const slots = n - 1;
  for (let mask = 0; mask < (1 << Math.max(0, slots)); mask++) {
    const breaks = [];
    for (let b = 0; b < slots; b++) if (mask & (1 << b)) breaks.push(b);
    const st = mk(words, breaks);
    const gs = T.groups(st);
    checked++;
    const flat = [].concat.apply([], gs);
    /* covers every index exactly once, in order */
    if (flat.length !== n) { bad++; continue; }
    let okOrder = true;
    for (let i = 0; i < n; i++) if (flat[i] !== i) okOrder = false;
    if (!okOrder) { bad++; continue; }
    /* each group contiguous and non-empty */
    if (gs.some((g) => !g.length)) { bad++; continue; }
    if (gs.some((g) => g[g.length - 1] - g[0] !== g.length - 1)) { bad++; continue; }
    /* the group count is exactly breaks+1 */
    if (gs.length !== breaks.length + 1) { bad++; }
  }
}
if (bad) err(`R1 the scoops do not partition the line (${bad}/${checked} boundary sets)`);
else console.log(`  R1 the scoops partition the line exactly (${checked} boundary sets, lines of 1-7)`);
if (T.groups(mk([], [])).length !== 0) err('R1 an empty line must yield no groups, not a crash');
if (T.groups(null).length !== 0) err('R1 groups(null) must be empty, not a crash');
try { if (T.groups({ breaks: [], step: -1 }).length !== 0) err('R1 a state with no words must yield no groups'); }
catch (e) { err('R1 groups() threw on a state with no words: ' + e.message); }

/* ---------------- R2 same words ---------------- */
console.log('[the two readings]');
const LINES = [
  ['The', 'cat', 'sat', 'on', 'my', 'lap'],
  ['After', 'lunch,', 'we', 'went', 'outside'],
  ['Grandma', 'made', 'soup'],
  ['Go']
];
let bad2 = 0, n2 = 0;
LINES.forEach((words) => {
  const slots = words.length - 1;
  for (let mask = 0; mask < (1 << Math.max(0, slots)); mask++) {
    const breaks = [];
    for (let b = 0; b < slots; b++) if (mask & (1 << b)) breaks.push(b);
    const st = mk(words, breaks);
    const plain = T.plainText(st);
    n2++;
    /* strongest form: the chunk lists ARE the line, exactly */
    if (T.robotChunks(st).join(' ') !== plain) bad2++;
    else if (T.scoopedChunks(st).join(' ') !== plain) bad2++;
    /* and the spoken strings carry the same words in the same order */
    else if (T.wordsOnly(T.robotText(st)) !== T.wordsOnly(plain)) bad2++;
    else if (T.wordsOnly(T.scoopedText(st)) !== T.wordsOnly(plain)) bad2++;
    /* ⚠ and we never double the teacher's own punctuation */
    else if (/,\s*,/.test(T.robotText(st)) || /,\s*,/.test(T.scoopedText(st))) bad2++;
  }
});
if (bad2) err(`R2 a reading changed the words (${bad2}/${n2} cases)`);
else console.log(`  R2 ⭐ SAME WORDS: both readings are the line, and neither doubles a comma (${n2} cases)`);
/* the teacher's own comma must supply its own pause, not get a second one */
(function () {
  const st = mk(['After', 'lunch,', 'we', 'went'], []);
  if (T.robotText(st).indexOf(',,') > -1) err('R2 the robot reading doubled the teacher comma');
  if (T.robotText(st).indexOf('lunch, we') === -1) err('R2 the teacher comma did not survive as the pause');
}());

/* ---------------- R3 the contrast is real ---------------- */
(function () {
  const words = ['The', 'cat', 'sat', 'on', 'my', 'lap'];
  const none = mk(words, []);
  const one = mk(words, [2]);
  const sepCount = (s) => s.split(T.SEP).length - 1;
  if (sepCount(T.robotText(none)) !== words.length - 1) err('R3 the robot reading does not separate every word');
  if (sepCount(T.scoopedText(none)) !== 0) err('R3 an unscooped line should read as one group');
  if (sepCount(T.scoopedText(one)) !== 1) err('R3 one boundary should give one separator');
  if (T.robotText(one) === T.scoopedText(one)) err('R3 the two readings are identical — there is nothing to hear');
  if (sepCount(T.robotText(one)) <= sepCount(T.scoopedText(one))) err('R3 the robot reading is not choppier than the scooped one');
  if (!ERRORS) console.log(`  R3 robot ${sepCount(T.robotText(one))} separators vs scooped ${sepCount(T.scoopedText(one))} — the contrast is real`);
}());

/* ---------------- R4 the tokeniser ---------------- */
console.log('[the tokeniser]');
(function () {
  const cases = [
    ['', 0], ['   ', 0], [null, 0], [undefined, 0],
    ['one', 1], ['a  b   c', 3], ['  padded  ', 1],
    /* a teacher pasting from a document brings tabs and newlines */
    ['a\tb\nc', 3], ['line one\nline two', 4],
    ['The cat sat on my lap', 6],
    ['Après le déjeuner, nous sommes sortis', 6],
    ['Kissa nukkuu minun sylissäni', 4],
    ['Mormor lagade soppa åt oss allihop', 6]
  ];
  let f = 0;
  cases.forEach(([input, want]) => {
    let got;
    try { got = T.tokenize(input); } catch (e) { err(`R4 tokenize threw on ${JSON.stringify(input)}: ${e.message}`); f++; return; }
    if (!Array.isArray(got)) { err(`R4 tokenize did not return an array for ${JSON.stringify(input)}`); f++; return; }
    if (got.length !== want) { err(`R4 tokenize(${JSON.stringify(input)}) gave ${got.length}, expected ${want}`); f++; }
  });
  /* punctuation rides with its word — the comma is what the class learns to hear */
  const t = T.tokenize('After lunch, we went outside');
  if (t[1] !== 'lunch,') err(`R4 punctuation did not ride with its word: got "${t[1]}"`);
  /* the cap holds */
  const many = T.tokenize(new Array(40).fill('word').join(' '));
  if (many.length !== T.MAX_WORDS) err(`R4 the ${T.MAX_WORDS}-word cap did not hold (${many.length})`);
  /* pure: same input twice, same output, and no shared array */
  const a = T.tokenize('a b'), b = T.tokenize('a b');
  if (a === b) err('R4 tokenize returned a shared array');
  if (a.join('|') !== b.join('|')) err('R4 tokenize is not deterministic');
  if (!f && !ERRORS) console.log(`  R4 total over ${cases.length} inputs, punctuation rides along, cap ${T.MAX_WORDS}`);
}());

/* ---------------- R5 the model ---------------- */
console.log('[model]');
(function () {
  const st = T.newState();
  const keys = Object.keys(st).sort().join(',');
  if (keys !== 'breaks,step,words') err(`R5 unexpected state fields: ${keys}`);
  const base = mk(['a', 'b', 'c'], [1]);
  const t1 = T.toggleBreak(base, 0);
  if (base.breaks.length !== 1) err('R5 toggleBreak mutated the input');
  if (t1.breaks.indexOf(0) === -1) err('R5 toggleBreak did not add');
  if (T.toggleBreak(t1, 0).breaks.indexOf(0) > -1) err('R5 toggleBreak is not a toggle');
  /* the last word has no gap after it */
  if (T.toggleBreak(base, 2).breaks.length !== base.breaks.length) err('R5 a boundary was accepted after the last word');
  if (T.toggleBreak(base, -1).breaks.length !== base.breaks.length) err('R5 a negative boundary was accepted');
  if (T.toggleBreak(base, 99).breaks.length !== base.breaks.length) err('R5 an out-of-range boundary was accepted');
  /* breaks stay sorted, so the derived groups are always in order */
  const many = T.toggleBreak(T.toggleBreak(T.toggleBreak(mk(['a', 'b', 'c', 'd'], []), 2), 0), 1);
  if (many.breaks.join(',') !== '0,1,2') err(`R5 breaks are not kept sorted (${many.breaks.join(',')})`);
  /* ⚠ a NEW LINE never inherits the old line's scoops */
  const fresh = T.setLine(mk(['a', 'b', 'c'], [0, 1]), 'x y z');
  if (fresh.breaks.length !== 0) err('R5 a new line inherited the previous line’s scoops');
  if (T.clearBreaks(mk(['a', 'b'], [0])).breaks.length !== 0) err('R5 clearBreaks did not clear');
  try { T.setLine(st, null); T.plainText(null); T.wordsOnly(null); T.joinForSpeech([]); T.isBreak(null, 0); T.groupTexts(mk([], [])); }
  catch (e) { err('R5 the engine threw on a hostile input: ' + e.message); }
  if (!ERRORS) console.log(`  R5 state is {${keys}}, immutable, hostile-safe, a new line starts unscooped`);
}());

/* ---------------- R6 nothing times a child ---------------- */
console.log('[stance]');
const TIMING = /\b(wpm|wordsPerMinute|words_per_minute|stopwatch|countdown|elapsed|startTime|readingRate|secondsTaken)\b/i;
if (TIMING.test(SRC_NC)) err(`R6 timing machinery present: ${(SRC_NC.match(TIMING) || [])[0]}`);
/* the reading path must contain no setTimeout — a guessed pause is the defect */
['_sayRobot', '_sayScooped', '_sayGroup', '_stepScoop'].forEach((fn) => {
  const m = new RegExp(fn + ': function[\\s\\S]*?\\n  \\},').exec(SRC_NC);
  if (!m) { err(`R6 could not find ${fn}`); return; }
  if (/setTimeout|setInterval|requestAnimationFrame/.test(m[0])) {
    err(`R6 ${fn} paces with a timer — LCSAudio has no end event and speak() self-cancels, so a timed read is cut off mid-word`);
  }
});
(function () {
  const lines = SRC_NC.split('\n').filter((l) => /Date\.now\(\)/.test(l));
  const strays = lines.filter((l) => !/ent\.at|_store\.ent|checkedAt/.test(l));
  if (strays.length) err(`R6 Date.now() outside the entitlement cache — nothing here may time a child: ${strays[0].trim()}`);
}());
if (!ERRORS) console.log('  R6 no stopwatch, no rate, no timed reading — nothing times a child');

/* ---------------- R7 no verdict ---------------- */
const BANNED = /\b(isCorrect|answerKey|checkAnswer|score|streak|timer|starsEarned|celebrate)\b/;
if (BANNED.test(SRC_NC)) err(`R7 grading vocabulary present: ${(SRC_NC.match(BANNED) || [])[0]}`);
if (/\brde-(correct|wrong|right|error|bad|fail|pass)\b/.test(SRC_NC)) {
  err(`R7 a verdict CSS class exists: ${(SRC_NC.match(/\brde-(correct|wrong|right|error|bad|fail|pass)\b/) || [])[0]}`);
}
const VERDICT = /\b(correct|incorrect|wrong|well done|try again|oops)\b/i;
Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((loc) => {
  if (VERDICT.test(T.strings[k][loc])) err(`R7 verdict wording in strings.${k}.${loc}: "${T.strings[k][loc]}"`);
}));
if (!ERRORS) console.log('  R7 nothing here grades anybody');

/* ---------------- R8 the speech lock ---------------- */
console.log('[speech]');
const speaks = SRC_NC.match(/LCSAudio\.speak\(\s*\{[^}]*\}/g) || [];
if (!speaks.length) err('R8 the tool never speaks at all');
speaks.forEach((c) => {
  if (!/type:\s*'ui'/.test(c)) err(`R8 a speak() is not a literal type:'ui' — see the file header on the recorded-audio path: ${c.slice(0, 60)}`);
  if (!/lang:\s*this\.api\.lang/.test(c)) err(`R8 a speak() is missing lang: this.api.lang: ${c.slice(0, 60)}`);
  if (!/rate:\s*[\d.]+/.test(c)) err(`R8 a speak() has no explicit rate: ${c.slice(0, 60)}`);
});
/* the robot pass must be slower than the scooped pass, or the contrast is halved */
(function () {
  const r = /_sayRobot[\s\S]*?rate:\s*([\d.]+)/.exec(SRC_NC);
  const s = /_sayScooped[\s\S]*?rate:\s*([\d.]+)/.exec(SRC_NC);
  if (!r || !s) { err('R8 could not read the two rates'); return; }
  if (!(Number(r[1]) < Number(s[1]))) err(`R8 the robot reading (${r[1]}) is not slower than the scooped one (${s[1]})`);
  else console.log(`  R8 ${speaks.length} speak calls, all type:'ui'; robot ${r[1]} < scooped ${s[1]}`);
}());

/* ---------------- R9 voice honesty ---------------- */
if (!/hasVoice:\s*function/.test(SRC_NC)) err('R9 hasVoice() is not implemented');
if (!/_canSpeak:\s*function/.test(SRC_NC)) err('R9 _canSpeak() is not implemented');
['_sayRobot', '_sayScooped', '_sayGroup'].forEach((fn) => {
  const m = new RegExp(fn + ': function[\\s\\S]*?\\n  \\},').exec(SRC_NC);
  if (m && !/_canSpeak\(\)/.test(m[0])) {
    err(`R9 ${fn} does not check _canSpeak() — a missing voice is silently substituted, so the line would be read with the wrong phonology`);
  }
});
if (!/voiceMissing/.test(SRC_NC)) err('R9 no voiceMissing affordance');
if (!/\u{1F507}/u.test(SRC_NC)) err('R9 the muted-speaker affordance is not shown in code (a comment does not count)');
/* and it must actually be rendered, not merely built */
if (!/wrap\.appendChild\(this\._buildVoiceMissing\(\)\)/.test(SRC_NC)) {
  err('R9 the voiceMissing panel is never appended — the tool would go silent with no explanation');
}
/* the documented remaps, or no/pt report a false negative */
if (!/no:\s*'nb'/.test(SRC_NC)) err('R9 hasVoice is missing the no->nb remap');
if (!ERRORS) console.log('  R9 hasVoice gates every reading, and the 🔇 line explains the silence');

/* the tool must not draw a scoop nobody asked for */
if (!/if \(!this\.st\.breaks\.length\) return;/.test(SRC_NC)) {
  err('R7 an unscooped line would still be drawn with a full-width arc — the tool must not propose a phrasing');
}

/* ---------------- R10 teacher text never becomes markup ---------------- */
if (/innerHTML\s*=(?!\s*'')/.test(SRC_NC)) {
  err(`R10 innerHTML is assigned something other than '' — teacher text must reach the DOM by textContent`);
}
if (!/sp\.textContent = w;/.test(SRC_NC)) err('R10 the word is not rendered with textContent');
if (!ERRORS) console.log('  R10 teacher text reaches the DOM only through textContent');

/* ---------------- R11 fence ---------------- */
if (/mending-?basket|syllable-?splitter|story-?line|heart-?words|choral-?counting/i.test(SRC_NC)) {
  err('R11 references an adjacent shipped surface in code');
}
else console.log('  R11 fence holds');

/* ---------------- R12 identity + exfil ---------------- */
console.log('[identity + safety]');
if (DECLARED.id !== 'reading-easel') err(`R12 id is "${DECLARED.id}"`);
if (DECLARED.STORE_KEY !== 'lcs:reading-easel:v1') err(`R12 STORE_KEY is "${DECLARED.STORE_KEY}"`);
if (DECLARED.premium !== false) err('R12 premium must default to false');
if (DECLARED.tasks || DECLARED.nextTask) err('R12 declaring tasks/nextTask would render activity chrome');
const urls = (SRC_NC.match(/fetch\(\s*['"]([^'"]+)['"]/g) || []).map((s) => s.replace(/^fetch\(\s*['"]/, ''));
urls.forEach((u) => { if (u.indexOf('/api/auth/me') !== 0) err(`R12 unexpected fetch target "${u}"`); });
if (/sendBeacon|WebSocket|XMLHttpRequest|\/track|analytics/.test(SRC_NC)) err('R12 an exfiltration path exists');
if (!ERRORS) console.log(`  R12 identity ok, free-play, ${urls.length} fetch call(s) on the allowlist`);

/* ---------------- R13 strings + starters + css ---------------- */
console.log('[l10n + css]');
const used = new Set();
(SRC_NC.match(/api\.t\([^)]*\)/g) || []).forEach((call) => {
  const inner = call.slice(call.indexOf('(') + 1, -1);
  const re = /(^|[?:]\s*)['"]([a-zA-Z]+)['"]/g;
  let m;
  while ((m = re.exec(inner)) !== null) used.add(m[2]);
});
(SRC_NC.match(/labelKey:\s*'([a-zA-Z]+)'/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
(SRC_NC.match(/_gateInline\([^,]+,\s*'([a-zA-Z]+)'\)/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
(SRC_NC.match(/fmt\('([a-zA-Z]+)'/g) || []).forEach((s) => used.add(s.replace(/.*'([a-zA-Z]+)'.*/, '$1')));
const SHELL_READ = ['title', 'instruction'];
const declared = new Set(Object.keys(T.strings));
Array.from(used).forEach((k) => { if (!declared.has(k)) err(`R13 api.t('${k}') has no string`); });
const dead = Array.from(declared).filter((k) => !used.has(k) && SHELL_READ.indexOf(k) === -1);
if (dead.length) err(`R13 ${dead.length} declared but unused string(s): ${dead.join(', ')} — a dead string is usually a feature that was designed and never wired`);
Object.keys(T.strings).forEach((k) => {
  if (!T.strings[k].en) err(`R13 strings.${k} has no en`);
  Object.keys(T.strings[k]).forEach((loc) => { if (/'/.test(T.strings[k][loc])) err(`R13 straight apostrophe in strings.${k}.${loc}`); });
});
const locs = new Set();
Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((l) => locs.add(l)));
console.log(`  R13 ${declared.size} strings across ${locs.size} locale(s): ${Array.from(locs).join(' ')}`);
if (locs.size < 11) warn(`R13 ${11 - locs.size} locale(s) still to author — the locale pass has not run`);
/* the starter lines: every locale that has strings must have lines to scoop */
Array.from(locs).forEach((loc) => {
  const pool = T.starters[loc];
  if (!pool || !pool.length) { warn(`R13 no starter lines for ${loc}`); return; }
  if (pool.length < T.FREE_STARTERS + 1) err(`R13 ${loc} has ${pool.length} starter lines — fewer than the free ${T.FREE_STARTERS} plus one`);
  pool.forEach((s) => {
    const w = T.tokenize(s);
    if (w.length < 3) err(`R13 starter "${s}" (${loc}) is too short to scoop`);
    if (w.length > T.MAX_WORDS) err(`R13 starter "${s}" (${loc}) exceeds the ${T.MAX_WORDS}-word cap`);
    if (/'/.test(s)) err(`R13 straight apostrophe in a ${loc} starter: ${s}`);
  });
});
if (!/getElementById\('rde-style'\)\)\s*return/.test(SRC_NC)) err('R13 the CSS injector is not idempotent');
if (!/@media print/.test(SRC)) err('R13 no @media print block');
if (!/prefers-reduced-motion/.test(SRC)) err('R13 no prefers-reduced-motion guard');
const lcsSel = (SRC.match(/\.lcs-[a-z-]+/g) || []).filter((s) => s !== '.lcs-header');
if (lcsSel.length) err(`R13 restyles shell internals: ${Array.from(new Set(lcsSel)).join(', ')}`);
if (!/body\.rde-wide/.test(SRC)) err('R13 no body.rde-wide scope');
/* the gap is the tap target — it must clear 44px in the stylesheet */
(function () {
  const g = /\.rde-gap\{[^}]*\}/.exec(SRC);
  if (!g) { err('R13 no .rde-gap rule'); return; }
  const mh = /min-height:(\d+)px/.exec(g[0]);
  if (!mh || Number(mh[1]) < 44) err(`R13 the word gap is the tap target and must be >= 44px (got ${mh ? mh[1] : '?'})`);
}());
if (!ERRORS) console.log('  R13 css ok');

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
