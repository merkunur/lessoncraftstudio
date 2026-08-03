#!/usr/bin/env node
/* =====================================================================
   verify-class-graph.js — MEASURED build-gate for Class Graph
   (mini tools/class-graph.js). Fix the tool, never the gate.

   Invariants:
     C1 ⭐ THE VIEW CANNOT WRITE   switching representation or revealing
                                  the numbers never changes a count —
                                  exhaustive over vote sequences. This is
                                  what makes "is it still the same?"
                                  answerable with yes
     C2  ONE TAP = ONE VOTE       votes are an ordered list of category
                                  indices, so the total is the number of
                                  taps and undo removes exactly one
     C3  THE NUMERAL CURTAIN      no count reaches the DOM or aria before
                                  the teacher reveals it (the
                                  number-talk-easel leak gate)
     C4  NO RANKING, EVER         no most/winner/sort — a class survey is
                                  a portrait, not a contest. Asserted on
                                  the API surface AND on every locale's
                                  strings
     C5  NO TIMER, NO SCORE
     C6  ANONYMOUS BY CONSTRUCTION no roster read, no name, no per-child
                                  record, nothing persisted but settings
     C7  SETUP MODEL              labels cleaned, capped, de-duplicated;
                                  a new question never inherits old votes
     C8  IMMUTABLE + TOTAL        every mutator clones; hostile input
                                  never throws
     C9  NO innerHTML WITH TEACHER TEXT
     C10 FENCE                    no reference to the surfaces this tool
                                  was fenced against
     C11 IDENTITY/EXFIL           id, STORE_KEY, premium:false, free-play,
                                  one fetch on the allowlist
     C12 THE PALETTE              no verdict hues, and enough of them
     C13 STRINGS/CSS/STARTERS

   Usage: node scripts/verify-class-graph.js
   Override for mutation testing: CGR_TOOL_DIR
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.CGR_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'class-graph.js'), 'utf8');
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
try { vm.runInContext(SRC + '\n;this.__T = ClassGraph;', sandbox); }
catch (e) { console.error('FATAL — the tool did not evaluate: ' + e.message); process.exit(1); }
const T = sandbox.__T;
if (!T) { console.error('FATAL — ClassGraph is not defined'); process.exit(1); }
T.api = { t: (k) => k, lang: 'en', settings: {}, announce() {} };

const DECLARED = { id: T.id, STORE_KEY: T.STORE_KEY, premium: T.premium, tasks: T.tasks, nextTask: T.nextTask };
const setup = (labels) => T.setSetup(T.newState(), 'Q?', labels || ['A', 'B', 'C']);

/* ---------------- C1 the view cannot write ---------------- */
console.log('[the data]');
(function () {
  let bad = 0, n = 0;
  const SEQS = [[], [0], [0, 0, 1], [2, 1, 0, 1, 2, 2], [1, 1, 1, 1, 1], [0, 1, 2, 0, 1, 2, 0]];
  SEQS.forEach((seq) => {
    let st = setup();
    seq.forEach((c) => { st = T.vote(st, c); });
    const base = T.counts(st).join(',');
    /* every view operation, in every order, must leave the counts alone */
    [['bar'], ['pile'], ['bar', 'pile'], ['pile', 'bar', 'pile']].forEach((modes) => {
      let v = st;
      modes.forEach((m) => { v = T.setMode(v, m); });
      v = T.setRevealed(v, true);
      v = T.setRevealed(v, false);
      n++;
      if (T.counts(v).join(',') !== base) bad++;
      if (T.total(v) !== T.total(st)) bad++;
    });
  });
  if (bad) err(`C1 a view operation changed the data (${bad}/${n})`);
  else console.log(`  C1 ⭐ the view never writes to the data (${n} mode/reveal sequences)`);
}());

/* ---------------- C2 one tap = one vote ---------------- */
(function () {
  let st = setup();
  for (let i = 0; i < 25; i++) st = T.vote(st, i % 3);
  if (T.total(st) !== 25) err(`C2 25 taps gave a total of ${T.total(st)}`);
  const sum = T.counts(st).reduce((a, b) => a + b, 0);
  if (sum !== 25) err(`C2 the counts sum to ${sum}, not the number of taps`);
  const before = T.counts(st).join(',');
  const un = T.undo(st);
  if (T.total(un) !== 24) err(`C2 undo removed ${25 - T.total(un)} votes, not exactly one`);
  if (st.votes.length !== 25) err('C2 undo mutated its input');
  if (T.counts(un).join(',') === before) err('C2 undo changed nothing');
  /* undo on an empty board is a no-op, not a crash or a negative */
  let e = setup();
  e = T.undo(e);
  if (T.total(e) !== 0 || T.counts(e).some((c) => c < 0)) err('C2 undo went below zero');
  /* an out-of-range tap is refused */
  const st2 = setup();
  if (T.total(T.vote(st2, 9)) !== 0 || T.total(T.vote(st2, -1)) !== 0) err('C2 an out-of-range vote was accepted');
  if (!ERRORS) console.log('  C2 one tap is one vote; undo removes exactly one');
}());

/* ---------------- C3 the numeral curtain ---------------- */
console.log('[the curtain]');
(function () {
  const st = T.setRevealed(setup(), false);
  if (st.revealed !== false) err('C3 a board does not start with the numbers hidden');
  if (T.newState().revealed !== false) err('C3 newState starts revealed');
  /* the count element must be built ONLY inside the revealed branch */
  const board = (SRC_NC.match(/_buildBoard: function[\s\S]*?\n  \},/) || [''])[0];
  if (!board) { err('C3 could not find _buildBoard'); return; }
  const revealed = /if \(self\.st\.revealed\) \{[\s\S]*?\n      \}/.exec(board);
  if (!revealed) err('C3 the count is not gated behind st.revealed');
  else if (!/cgr-count/.test(revealed[0])) err('C3 the revealed branch does not build the count');
  const outside = board.replace(revealed ? revealed[0] : '', '');
  if (/cgr-count/.test(outside)) err('C3 a count element is built outside the revealed branch');
  /* and no count may be smuggled into an aria label or a title */
  if (/aria-label[^)]*String\(n\)|title[^)]*String\(n\)/.test(board)) err('C3 the count leaks into aria/title');
  if (!ERRORS) console.log('  C3 the count is absent from the DOM until the teacher reveals it');
}());

/* ---------------- C4 no ranking, ever ---------------- */
console.log('[stance]');
['most', 'winner', 'rank', 'sortByCount', 'leader', 'top'].forEach((fn) => {
  if (typeof T[fn] === 'function') err(`C4 the tool exposes ${fn}() — a class survey is a portrait, not a contest`);
});
if (/\.sort\(/.test(SRC_NC)) err('C4 something is sorted — the columns must stay in the order the teacher wrote them');
const RANKING = {
  en: /\b(winner|wins|won|most popular|the most|best|champion|top answer)\b/i,
  de: /\b(gewinner|gewinnt|sieger|beliebteste|am meisten|beste)\b/i,
  fr: /\b(gagnant|gagne|vainqueur|le plus populaire|le plus de|meilleur)\b/i,
  it: /\b(vincitore|vince|il più popolare|il maggior numero|migliore)\b/i,
  es: /\b(ganador|gana|el más popular|la mayoría|mejor)\b/i,
  pt: /\b(vencedor|ganha|o mais popular|a maioria|melhor)\b/i,
  nl: /\b(winnaar|wint|populairste|de meeste|beste)\b/i,
  sv: /\b(vinnare|vinner|populäraste|flest|bästa)\b/i,
  da: /\b(vinder|vinder|mest populære|flest|bedste)\b/i,
  no: /\b(vinner|mest populære|flest|beste)\b/i,
  fi: /\b(voittaja|voittaa|suosituin|eniten|paras)\b/i
};
const SCORE_RE = /\b(score|streak|timer|stopwatch|points|poäng|poeng|punkte|punteggio|puntaje|pontos|pisteet|level|badge)\b/i;
const VERDICT = /\b(correct|incorrect|wrong|well done|try again|oops)\b/i;
Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((loc) => {
  const v = T.strings[k][loc];
  if (RANKING[loc] && RANKING[loc].test(v)) err(`C4 ranking vocabulary in strings.${k}.${loc}: "${v}"`);
  if (SCORE_RE.test(v)) err(`C4 score/timer vocabulary in strings.${k}.${loc}: "${v}"`);
  if (VERDICT.test(v)) err(`C4 verdict vocabulary in strings.${k}.${loc}: "${v}"`);
}));
if (!ERRORS) console.log('  C4 nothing ranks, nothing wins, nothing is graded');

/* ---------------- C5 no timer, no score ---------------- */
/* ⚠ no leading \b: "_" is a word character, so \b never matches before
   _elapsed — and a helper named _elapsed is the commonest way a
   stopwatch would actually arrive. */
const TIMING = /(elapsed|stopwatch|countdown|secondsTaken|startedAt|scoreOf)/i;
if (TIMING.test(SRC_NC)) err(`C5 timing machinery: ${(SRC_NC.match(TIMING) || [])[0]}`);
(function () {
  const lines = SRC_NC.split('\n').filter((l) => /Date\.now\(\)/.test(l));
  const strays = lines.filter((l) => !/ent\.|_store\.ent|checkedAt/.test(l));
  if (strays.length) err(`C5 Date.now() outside the entitlement cache: ${strays[0].trim()}`);
}());
if (!ERRORS) console.log('  C5 nothing is timed and nothing is scored');

/* ---------------- C6 anonymous by construction ---------------- */
console.log('[anonymity]');
if (/my-classes|rosterFor|students|studentId|childName/.test(SRC_NC)) {
  err('C6 the tool reaches for a roster — it must never know who anybody is');
}
(function () {
  /* the persisted blob may carry settings and the entitlement, nothing else */
  const save = (SRC_NC.match(/_saveStore: function[\s\S]*?\n  \},/) || [''])[0];
  if (/votes|counts|question|cats/.test(save)) err('C6 the class answers are persisted — they must die with the session');
  /* ⚠ read newState(), not a cloned state: _clone rebuilds a fixed
     literal, so it would silently launder a smuggled field away */
  const keys = Object.keys(T.newState()).sort().join(',');
  if (keys !== 'cats,mode,question,revealed,votes') err(`C6 unexpected state fields: ${keys}`);
  const st = setup();
  /* a vote is an index and nothing else */
  const v = T.vote(st, 1);
  if (typeof v.votes[0] !== 'number') err('C6 a vote is not a bare index — an object could carry a child');
  if (!ERRORS) console.log(`  C6 no roster, no name, nothing persisted; a vote is a bare index`);
}());

/* ---------------- C7 the setup model ---------------- */
console.log('[setup]');
(function () {
  const s1 = setup(['  Cats  ', 'Dogs', '', 'Cats', 'Fish']);
  if (s1.cats.length !== 3) err(`C7 blanks/duplicates were not dropped (${s1.cats.length} answers)`);
  if (s1.cats[0].label !== 'Cats') err(`C7 the label was not trimmed: "${s1.cats[0].label}"`);
  const many = setup(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
  if (many.cats.length !== T.MAX_CATS) err(`C7 the ${T.MAX_CATS}-answer cap did not hold (${many.cats.length})`);
  const long = T.setSetup(T.newState(), 'x'.repeat(400), ['y'.repeat(90), 'z']);
  if (long.question.length > T.MAX_QUESTION) err('C7 the question length cap did not hold');
  if (long.cats[0].label.length > T.MAX_LABEL) err('C7 the label length cap did not hold');
  /* ⚠ a new question must never inherit the old class's votes */
  let voted = setup();
  voted = T.vote(T.vote(voted, 0), 1);
  voted = T.setRevealed(T.setMode(voted, 'bar'), true);
  const fresh = T.setSetup(voted, 'A different question?', ['P', 'Q']);
  if (T.total(fresh) !== 0) err('C7 a new question inherited the previous votes');
  if (fresh.revealed !== false || fresh.mode !== 'pile') err('C7 a new question kept the old view state');
  /* every answer gets a colour */
  if (many.cats.some((c) => !c.colour)) err('C7 an answer has no colour');
  if (!ERRORS) console.log(`  C7 labels cleaned, capped at ${T.MAX_CATS}, de-duplicated; a new question starts empty`);
}());

/* ---------------- C8 immutable + total ---------------- */
(function () {
  const st = setup();
  if (T.vote(st, 0) === st || st.votes.length !== 0) err('C8 vote mutated its input');
  if (T.setMode(st, 'bar') === st || st.mode !== 'pile') err('C8 setMode mutated its input');
  if (T.setRevealed(st, true) === st || st.revealed !== false) err('C8 setRevealed mutated its input');
  if (T.clearVotes(T.vote(st, 0)).votes.length !== 0) err('C8 clearVotes did not clear');
  if (T.setMode(st, 'nonsense').mode !== 'pile') err('C8 an unknown mode was accepted');
  try {
    T.cleanText(null); T.cleanText(undefined, 5); T.counts(null); T.total(null);
    T.setSetup(T.newState(), null, []); T.vote(st, null); T.setMode(st, null);
  } catch (e) { err('C8 the engine threw on a hostile input: ' + e.message); }
  if (T.counts(null).length !== 0) err('C8 counts(null) must be empty');
  try { if (T.counts({ votes: [] }).length !== 0) err('C8 a state with no answers must yield no counts'); }
  catch (e) { err('C8 counts() threw on a state with no answers: ' + e.message); }
  /* ⚠ not throwing is not enough — String(null) is "null", which would
     put the word null on the board as the teacher's question */
  if (T.cleanText(null) !== '' || T.cleanText(undefined) !== '') err('C8 cleanText turned a nullish value into text');
  if (!ERRORS) console.log('  C8 every mutator clones; hostile input never throws');
}());

/* ---------------- C9 teacher text never becomes markup ---------------- */
if (/innerHTML\s*=(?!\s*'')/.test(SRC_NC.replace(/innerHTML = self\.STAMP_SVG;|innerHTML = this\.STAMP_SVG;/g, ''))) {
  err('C9 innerHTML is assigned something other than the stamp or an empty string');
}
['q.textContent = this.st.question;', 'lab.textContent = cat.label;', 't.textContent = cat.label;'].forEach((l) => {
  if (SRC_NC.indexOf(l) === -1) err(`C9 expected teacher text to be set with textContent: ${l}`);
});
if (!ERRORS) console.log('  C9 the question and the answers reach the DOM only through textContent');

/* ---------------- C10 fence ---------------- */
if (/graph-?it|calendar-?wall|choice-?board|chart-?count|line-?plot/i.test(SRC_NC)) {
  err('C10 references a fenced surface in code');
} else console.log('  C10 fence holds');

/* ---------------- C11 identity + exfil ---------------- */
console.log('[identity + safety]');
if (DECLARED.id !== 'class-graph') err(`C11 id is "${DECLARED.id}"`);
if (DECLARED.STORE_KEY !== 'lcs:class-graph:v1') err(`C11 STORE_KEY is "${DECLARED.STORE_KEY}"`);
if (DECLARED.premium !== false) err('C11 premium must default to false');
if (DECLARED.tasks || DECLARED.nextTask) err('C11 declaring tasks/nextTask would render activity chrome');
const urls = (SRC_NC.match(/fetch\(\s*['"]([^'"]+)['"]/g) || []).map((s) => s.replace(/^fetch\(\s*['"]/, ''));
urls.forEach((u) => { if (u.indexOf('/api/auth/me') !== 0) err(`C11 unexpected fetch target "${u}"`); });
if (/sendBeacon|WebSocket|XMLHttpRequest|\/track|analytics/.test(SRC_NC)) err('C11 an exfiltration path exists');
if (!ERRORS) console.log(`  C11 identity ok, free-play, ${urls.length} fetch call(s) on the allowlist`);

/* ---------------- C12 the palette ---------------- */
(function () {
  const P = T.COLOURS || [];
  if (P.length < T.MAX_CATS) err(`C12 ${P.length} colours for ${T.MAX_CATS} answers`);
  if (new Set(P).size !== P.length) err('C12 two answers would share a colour');
  /* ⚠ never verdict colours (choral-counting.js:106): a red column reads
     as the wrong answer and a green one as the right one. */
  const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  P.forEach((h) => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(h)) { err(`C12 not a 6-digit hex: ${h}`); return; }
    const [r, g, b] = hex2rgb(h);
    if (r > 150 && r - g > 70 && r - b > 70) err(`C12 ${h} reads as a red verdict`);
    if (g > 120 && g - r > 45 && g - b > 45) err(`C12 ${h} reads as a green verdict`);
  });
  if (!ERRORS) console.log(`  C12 ${P.length} distinct, verdict-free colours`);
}());

/* ---------------- C13 strings + starters + css ---------------- */
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
Array.from(used).forEach((k) => { if (!declared.has(k)) err(`C13 api.t('${k}') has no string`); });
const dead = Array.from(declared).filter((k) => !used.has(k) && SHELL_READ.indexOf(k) === -1);
if (dead.length) err(`C13 ${dead.length} declared but unused string(s): ${dead.join(', ')} — a dead string is usually a feature that was designed and never wired`);
Object.keys(T.strings).forEach((k) => {
  if (!T.strings[k].en) err(`C13 strings.${k} has no en`);
  Object.keys(T.strings[k]).forEach((loc) => { if (/'/.test(T.strings[k][loc])) err(`C13 straight apostrophe in strings.${k}.${loc}`); });
});
const locs = new Set();
Object.keys(T.strings).forEach((k) => Object.keys(T.strings[k]).forEach((l) => locs.add(l)));
console.log(`  C13 ${declared.size} strings across ${locs.size} locale(s): ${Array.from(locs).join(' ')}`);
if (locs.size < 11) warn(`C13 ${11 - locs.size} locale(s) still to author — the locale pass has not run`);
Array.from(locs).forEach((loc) => {
  const pool = T.starters[loc];
  if (!pool || !pool.length) { warn(`C13 no starter questions for ${loc}`); return; }
  if (pool.length < 3) err(`C13 ${loc} has only ${pool.length} starter question(s)`);
  pool.forEach((s) => {
    if (!s.q || !s.cats) { err(`C13 malformed starter in ${loc}`); return; }
    if (/'/.test(s.q) || s.cats.some((c) => /'/.test(c))) err(`C13 straight apostrophe in a ${loc} starter`);
    if (s.cats.length < T.MIN_CATS || s.cats.length > T.FREE_CATS) {
      err(`C13 ${loc} starter "${s.q}" has ${s.cats.length} answers — a starter must fit the free tier`);
    }
    if (T.cleanText(s.q, T.MAX_QUESTION) !== s.q) err(`C13 ${loc} starter question exceeds the cap: ${s.q}`);
    s.cats.forEach((c) => { if (T.cleanText(c, T.MAX_LABEL) !== c) err(`C13 ${loc} starter answer too long: ${c}`); });
  });
});
if (!/getElementById\('cgr-style'\)\)\s*return/.test(SRC_NC)) err('C13 the CSS injector is not idempotent');
if (!/@media print/.test(SRC)) err('C13 no @media print block');
if (!/prefers-reduced-motion/.test(SRC)) err('C13 no prefers-reduced-motion guard');
/* ⚠ reduced motion must COMPRESS, not delete — the transformation is the
   content, so removing it removes the lesson. */
(function () {
  const rm = /@media \(prefers-reduced-motion:reduce\)\{[^}]*\.cgr-stamp[^}]*\}/.exec(SRC);
  if (!rm) { err('C13 the reduced-motion block does not cover the stamps'); return; }
  if (/transition:\s*none/.test(rm[0])) {
    err('C13 reduced motion DELETES the transformation — it must compress it (the morph is the lesson)');
  }
}());
/* ⚠ THE BODY-SCOPED CARD CAP IS A SANCTIONED HOOK, NOT A SHELL RESTYLE.
   lcs-shell.css:99-106 states the specificity is the design: its own card
   tiers are `.lcs-app` (0,1,0) precisely so that `body.<ns>-wide .lcs-app`
   (0,1,1) BEATS them and the 18 tools that widen themselves keep their own
   designed cap. Banning it outright banned the extension point the shell
   documents. What this check is FOR is an UNSCOPED reach into shell
   internals, so that is what it now tests: strip the body-scoped form first,
   then ban whatever is left. Poison-tested in both directions — a bare
   `.lcs-app{...}` and a `.lcs-stage` both still fire. */
const SRC_UNSCOPED = SRC.replace(/body\.cgr-wide\s+\.lcs-app/g, '');
const lcsSel = (SRC_UNSCOPED.match(/\.lcs-[a-z-]+/g) || []).filter((s) => s !== '.lcs-header');
if (lcsSel.length) err(`C13 restyles shell internals unscoped: ${Array.from(new Set(lcsSel)).join(', ')}`);
if (!/body\.cgr-wide/.test(SRC)) err('C13 no body.cgr-wide scope');
(function () {
  const v = /\.cgr-vote\{[^}]*\}/.exec(SRC);
  if (!v) { err('C13 no .cgr-vote rule'); return; }
  const mh = /min-height:(\d+)px/.exec(v[0]);
  if (!mh || Number(mh[1]) < 44) err(`C13 the vote button is the child's tap target and must be >= 44px (got ${mh ? mh[1] : '?'})`);
  /* an explicit height overrides the floor, so it must clear it too */
  const hh = /[^-]height:(\d+)px/.exec(v[0]);
  if (hh && Number(hh[1]) < 44) err(`C13 the vote button has an explicit height of ${hh[1]}px, under the 44px tap floor`);
}());
/* the bar must be positioned against the pile, not sized by arithmetic */
if (!/\.cgr-bar\{position:absolute;inset:0;/.test(SRC)) {
  err('C13 the bar is not absolutely placed inside the stack — its height would become a number somebody computes');
}
if (/\.cgr-bar[^}]*height:\s*(?!100%)[\d.]/.test(SRC)) err('C13 the bar has a computed height');
/* the stamp and the ground ruling must read the SAME variable, or a
   future edit can change one pitch and leave the other behind */
if (!/\.cgr-stamp\{width:var\(--cgr-unit\);height:var\(--cgr-unit\)/.test(SRC)) {
  err('C13 the stamp does not size itself from --cgr-unit');
}
if (!/repeating-linear-gradient\([^']*var\(--cgr-unit\)/.test(SRC)) {
  err('C13 the ground ruling does not read --cgr-unit — it would drift from the stamp');
}
if (!ERRORS) console.log('  C13 css ok');

/* ---------------- C14 the editor has ONE commit point ----------------
   ⚠ THE INVARIANT THAT WAS MISSING WHEN THE ADD BUTTON SHIPPED DEAD.
   `setSetup` drops blank labels on purpose (C7 asserts it). So the editor
   can never use `st` as its working copy: pushing a blank row through
   setSetup is a no-op, which is exactly how "Add an answer" came to do
   nothing at all. The editor edits `_draft`; only apply() commits.

   This is a structural check on purpose. The browser gates
   (local-test L9, audit-tool-control-liveness) prove the button acts;
   this one proves the SHAPE that makes it act cannot be quietly undone
   by an edit that still passes every model assertion. */
(function () {
  const ed = (SRC_NC.match(/_buildEditor: function[\s\S]*?\n  \},\n/) || [''])[0];
  if (!ed) { err('C14 _buildEditor not found'); return; }
  if (!/_draft:\s*null/.test(SRC_NC)) err('C14 the editor has no draft field — blank rows are unrepresentable again');
  if (!/var draft = this\._draft\.labels;/.test(ed)) {
    err('C14 the editor does not render from the draft — reading st.cats back means a blank row can never appear');
  }
  if (/this\.st\.cats\.map/.test(ed)) err('C14 the editor still rebuilds its rows from st.cats');
  /* ⚠ EXACTLY TWO, AND BOTH ARE NAMED. apply() commits what the teacher
     typed; a starter chip replaces the whole survey outright. Those are
     the only two moments a class may lose its votes. A third would be an
     unnamed one, which is how the first one got there. */
  const commits = (ed.match(/setSetup\(/g) || []).length;
  if (commits !== 2) {
    err(`C14 the editor commits in ${commits} place(s); exactly two are allowed and named `
      + `(apply, and the starter chips) — any other commit silently clears the class's votes`);
  }
  /* the row handlers edit the draft and nothing else */
  const addH = (ed.match(/api\.t\('addCat'\)[\s\S]*?\n      \}\)\);/) || [''])[0];
  if (!/_draft\.labels\.push\(''\)/.test(addH)) err('C14 the add handler does not grow the draft');
  if (/setSetup/.test(addH)) err('C14 the add handler commits through setSetup — that is the original dead-button bug');
  const remH = (ed.match(/api\.t\('removeCat'\)[\s\S]*?\n        \}, 'cgr-tiny-chip'\)\);/) || [''])[0];
  if (!/_draft\.labels\.splice\(/.test(remH)) err('C14 the remove handler does not edit the draft');
  if (/setSetup/.test(remH)) err('C14 the remove handler commits through setSetup — it would throw away the votes');
  /* apply must refuse a survey with nothing to compare */
  if (!/kept\.length < self\.MIN_CATS/.test(ed)) {
    err('C14 apply does not require two distinct answers — a one-column survey has nothing to compare');
  }
  if (!ERRORS) console.log('  C14 the editor edits a draft; commits only in apply + the starters');
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
