/* =====================================================================
   verify-arrow-strip.js — the model gate for TOOL #37, The Arrow Strip
   ---------------------------------------------------------------------
   Run:  node scripts/verify-arrow-strip.js
   Mutations run it against a copy via ARW_TOOL_DIR.

   ZERO CORPUS. Ground truth is the gate's OWN kinematics, implemented
   here and never read off the tool — the number-sieve lesson, where 19
   mutations survived because the gate derived its expectations from the
   thing under test.

     A1  HEADING CLOSURE   four quarter-turns restore the exact pose
     A2 ⭐ INVERSE          for runs that never blocked, the formal
                           inverse returns the beetle to its start
     A3 ⭐ EDGE HONESTY     a blocked move leaves the pose UNCHANGED and
                           never bounces and never wraps
     A4 ⭐ TURNS DO NOT MOVE a turn changes the facing and nothing else
     A5 ⭐ ORDER MATTERS    asserted POSITIVELY — the mirror of
                           number-sieve's N3, so the two theses can never
                           blur into each other
     A6  PURITY            pure, immutable, hostile input clamps
     A7  STATE SHAPE       frozen
     A8  IDENTITY          no tasks/nextTask, one fetch, no exfil
     A10 NO WORDS          no ABSOLUTE direction in any of 11 locales
     A11 NO VERDICT        the 11-locale ban, no goal field in the model
     A12 ⭐ LABELS ARE TRUE every noun-labelled control does what it says
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.ARW_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'arrow-strip.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ⚠ MEASURE THE STYLESHEET, NOT ITS SOURCE LAYOUT. The CSS is built by
   concatenating string literals, so a single declaration can be split
   across three source lines with quotes and plus signs between — and a
   regex over the raw source then fails to find a rule that is plainly
   there. Rejoin the literals first. This also strips the comments, which
   otherwise let a `@media` mentioned in PROSE be counted as an open
   block: that alone reported the height escape as living inside a media
   query when it is the first rule in the file. */
const CSS = (function () {
  /* ⚠ START AT THE STRING, NOT AT THE FUNCTION. Starting at
     `function injectArrowStripCSS(` puts the JS function's own opening
     brace into the brace count, so the FIRST css rule measures as nested
     one level deep and a correct unconditional escape reads as being
     inside a block. */
  const i = SRC.indexOf("var css = ''");
  const body = i < 0 ? '' : SRC.slice(i);
  return body
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/'\s*\n\s*\+\s*'/g, '')
    .replace(/'\s*\+\s*'/g, '');
}());

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(SRC + '\n;this.__T = ArrowStrip;', sandbox);
const T = sandbox.__T;
if (!T) { console.error('FATAL: the tool did not define ArrowStrip'); process.exit(1); }

/* ⭐ THE ORACLE — the gate's own kinematics. Hardcoded, never read off
   the tool, or a mutation to DR/DC would be invisible. */
const O_DR = [-1, 0, 1, 0], O_DC = [0, 1, 0, -1];
const oApply = (p, card, n) => {
  const q = { r: p.r, c: p.c, h: p.h };
  if (card === 'L') { q.h = (q.h + 3) % 4; return q; }
  if (card === 'R') { q.h = (q.h + 1) % 4; return q; }
  const d = card === 'F' ? 1 : card === 'B' ? -1 : 0;
  if (!d) return q;
  const nr = q.r + O_DR[q.h] * d, nc = q.c + O_DC[q.h] * d;
  if (nr < 0 || nr >= n || nc < 0 || nc >= n) return q;
  q.r = nr; q.c = nc; return q;
};
const oRun = (p, rail, n) => {
  const out = [{ r: p.r, c: p.c, h: p.h }];
  let cur = out[0];
  for (const card of rail) { cur = oApply(cur, card, n); out.push({ r: cur.r, c: cur.c, h: cur.h }); }
  return out;
};
const key = (p) => `${p.r},${p.c},${p.h}`;

/* every rail of length 1..L over the four cards */
function rails(L) {
  const out = [];
  const walk = (acc) => {
    if (acc.length) out.push(acc.slice());
    if (acc.length === L) return;
    for (const c of T.CARDS) { acc.push(c); walk(acc); acc.pop(); }
  };
  walk([]);
  return out;
}
const N = T.DEFAULT_MAT;
const POSES = [];
for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) for (let h = 0; h < 4; h++) POSES.push({ r, c, h });
const RAILS = rails(6);

console.log('[the beetle]');

/* ---------- A4 turns do not move + agreement with the oracle ---------- */
(function () {
  let checked = 0;
  for (const p of POSES) {
    for (const card of T.CARDS) {
      const got = T.applyCard(p, card, N), want = oApply(p, card, N);
      if (key(got) !== key(want)) { err(`A4 applyCard(${key(p)}, ${card}) = ${key(got)}, the oracle says ${key(want)}`); return; }
      if ((card === 'L' || card === 'R') && (got.r !== p.r || got.c !== p.c)) {
        err(`A4 ⭐ a turn moved the beetle: ${key(p)} --${card}--> ${key(got)}`); return;
      }
      if ((card === 'F' || card === 'B') && got.h !== p.h) { err(`A4 a step changed the facing: ${key(p)} --${card}--> ${key(got)}`); return; }
      checked++;
    }
  }
  console.log(`  A4 ⭐ a turn changes the facing and nothing else; a step changes the square and nothing else (${checked} moves, all agreeing with the gate's own kinematics)`);
}());

/* ---------- A1 heading closure ---------- */
(function () {
  for (const p of POSES) {
    for (const t of ['L', 'R']) {
      let q = { r: p.r, c: p.c, h: p.h };
      for (let i = 0; i < 4; i++) q = T.applyCard(q, t, N);
      if (key(q) !== key(p)) { err(`A1 four ${t} turns did not restore ${key(p)} (got ${key(q)})`); return; }
    }
  }
  console.log(`  A1 four quarter-turns restore the exact pose, from all ${POSES.length} poses, both ways round`);
}());

/* ---------- A3 ⭐ edge honesty ---------- */
(function () {
  let blockedSeen = 0;
  for (const p of POSES) {
    for (const card of ['F', 'B']) {
      const got = T.applyCard(p, card, N);
      const d = card === 'F' ? 1 : -1;
      const nr = p.r + O_DR[p.h] * d, nc = p.c + O_DC[p.h] * d;
      const off = nr < 0 || nr >= N || nc < 0 || nc >= N;
      if (off) {
        blockedSeen++;
        if (key(got) !== key(p)) { err(`A3 a blocked move did not leave the pose unchanged: ${key(p)} --${card}--> ${key(got)}`); return; }
      } else if (got.r !== nr || got.c !== nc) {
        err(`A3 a legal move landed wrong: ${key(p)} --${card}--> ${key(got)}, expected ${nr},${nc}`); return;
      }
      /* never wraps: the landing square is never on the far side */
      if (off && (got.r !== p.r || got.c !== p.c)) { err('A3 the mat wrapped'); return; }
    }
  }
  if (!blockedSeen) { err('A3 no blocked move was ever exercised — the invariant is vacuous'); return; }
  console.log(`  A3 ⭐ a blocked move leaves the pose unchanged, never bounces, never wraps (${blockedSeen} genuinely blocked moves)`);
}());

console.log('[the rail]');

/* ---------- A2 ⭐ inverse, over NON-BLOCKING runs only ---------- */
(function () {
  let checked = 0, skipped = 0;
  for (const rail of RAILS) {
    const inv = T.inverseRail(rail);
    for (const p of POSES) {
      const fwd = oRun(p, rail, N);
      const end = fwd[fwd.length - 1];
      /* ⚠ the catalog claimed this holds for every rail. It does not: a
         blocked step is a no-op whose inverse is NOT a no-op. Assert it
         only where nothing blocked, and let A3 carry the rest. */
      if (T.blocked(p, rail, N)) { skipped++; continue; }
      if (T.blocked(end, inv, N)) { skipped++; continue; }
      const back = T.run(end, inv, N);
      const home = back[back.length - 1];
      if (key(home) !== key(p)) {
        err(`A2 the inverse of [${rail}] from ${key(p)} landed on ${key(home)}`);
        return;
      }
      checked++;
    }
  }
  if (!checked) { err('A2 nothing was checked'); return; }
  console.log(`  A2 ⭐ the formal inverse returns the beetle home on every non-blocking run — ${checked.toLocaleString('en-US')} checked, ${skipped.toLocaleString('en-US')} skipped as blocked (which A3 owns)`);
}());

/* ---------- run agrees with the oracle, exhaustively ---------- */
(function () {
  let checked = 0;
  for (const rail of RAILS) {
    for (const p of POSES) {
      const got = T.run(p, rail, N).map(key).join('|');
      const want = oRun(p, rail, N).map(key).join('|');
      if (got !== want) { err(`A2b run disagrees with the oracle for [${rail}] from ${key(p)}`); return; }
      checked++;
    }
  }
  console.log(`  A2b ⭐ every run matches the gate's own kinematics — EXHAUSTIVE, ${checked.toLocaleString('en-US')} runs (${RAILS.length.toLocaleString('en-US')} rails x ${POSES.length} poses)`);
}());

/* ---------- A5 ⭐ ORDER MATTERS, asserted positively ---------- */
(function () {
  /* number-sieve's N3 proves its cards COMMUTE. This tool's whole thesis
     is the opposite, so it has to be asserted, not assumed — otherwise
     the two instruments' claims quietly blur. */
  let differing = 0, pairs = 0;
  const swap = (a, i) => { const b = a.slice(); const t = b[i]; b[i] = b[i + 1]; b[i + 1] = t; return b; };
  for (const rail of RAILS) {
    if (rail.length < 2) continue;
    for (let i = 0; i < rail.length - 1; i++) {
      if (rail[i] === rail[i + 1]) continue;
      const p = { r: 3, c: 3, h: 0 };
      const a = oRun(p, rail, N), b = oRun(p, swap(rail, i), N);
      pairs++;
      if (key(a[a.length - 1]) !== key(b[b.length - 1])) differing++;
    }
  }
  if (!pairs) { err('A5 no adjacent-swap pair was tested'); return; }
  const pct = differing / pairs;
  if (pct < 0.25) { err(`A5 only ${(pct * 100).toFixed(1)}% of adjacent swaps change the outcome — these cards are behaving like a sieve, not a sequence`); return; }
  console.log(`  A5 ⭐ ORDER MATTERS — ${differing.toLocaleString('en-US')} of ${pairs.toLocaleString('en-US')} adjacent swaps land the beetle somewhere else (${(pct * 100).toFixed(1)}%)`);
}());

console.log('[the stance]');

/* ---------- A6 purity + immutability + hostile input ---------- */
(function () {
  const modelStart = SRC_NC.indexOf('newState:');
  const modelEnd = SRC_NC.indexOf('endPose:');
  if (modelStart < 0 || modelEnd <= modelStart) { err('A6 could not bound the model region'); return; }
  const model = SRC_NC.slice(modelStart, modelEnd);
  ['Math.random', 'document.', 'window.', 'localStorage', 'api.t(', 'new Date'].forEach((w) => {
    if (model.indexOf(w) > -1) err(`A6 the model touches "${w}"`);
  });
  const st = T.newState();
  const before = JSON.stringify(st);
  [null, undefined, NaN, -5, 1e9, 'x', {}, []].forEach((b) => {
    try {
      T.applyCard(st.pose, b, N); T.run(st.pose, b, b); T.insertCard(st, b, b); T.setCard(st, b, b);
      T.removeCard(st, b); T.setMat(st, b); T.inverseRail(b); T.blocked(st.pose, b, N);
    } catch (e) { err(`A6 hostile input ${String(b)} threw: ${e.message}`); }
  });
  /* ⚠⚠ THE IMMUTABILITY PROBE MUST RUN ON A POPULATED STATE. A fresh one
     has rail:[], ranRail:null, ghost:null — so `clearRail` mutating its
     input IN PLACE sets each of those to the value it already had, and
     the JSON compare cannot see it. A mutation of clearRail SURVIVED this
     check for exactly that reason. Every mutator now gets a state on
     which it has something to change, and the state is asserted
     non-default first so the probe can never go vacuous again. */
  let full = T.newState();
  ['F', 'F', 'R', 'F'].forEach((c) => { full = T.insertCard(full, full.rail.length, c); });
  full = T.doRun(full);
  full = T.insertCard(full, 1, 'B');
  full = T.doRun(full);
  full = T.toggleEye(full);
  if (!full.rail.length || !full.ranRail || !full.ghost || full.eye !== 'beetle') {
    err('A6 the immutability probe state is not populated — the check would be vacuous'); return;
  }
  const fullBefore = JSON.stringify(full);
  T.insertCard(full, 0, 'L'); T.setCard(full, 0, 'B'); T.removeCard(full, 0); T.removeLast(full);
  T.cycleCard(full, 0); T.doRun(full); T.clearRail(full); T.toggleEye(full);
  T.setStart(full, 0, 0); T.turnStart(full); T.setMat(full, 8); T.setPose(full, 4, 0, 0, 1);
  if (JSON.stringify(full) !== fullBefore) err('A6 a model call mutated its input');
  if (JSON.stringify(st) !== before) err('A6 a model call mutated its input');
  if (!ERRORS) console.log('  A6 the model is pure and immutable, and hostile input clamps rather than throwing');
}());

/* ---------- A7 state shape ---------- */
(function () {
  const k = Object.keys(T.newState()).sort().join(',');
  if (k !== 'eye,ghost,n,pose,rail,ranRail') { err(`A7 state shape is "${k}"`); return; }
  console.log('  A7 the state shape is frozen');
}());

/* ---------- A14 ⭐ THE TRAIL IS OF THE RUN THAT HAPPENED ---------- */
(function () {
  /* Editing the rail after a run must NOT redraw the trail — that is the
     whole of build-then-run. The first cut derived the path from the live
     rail, which also made the ghost identical to the new run, so
     invention 2 silently did nothing. Structural now, and gated. */
  let st = T.newState();
  ['F', 'F', 'R', 'F'].forEach((c) => { st = T.insertCard(st, st.rail.length, c); });
  st = T.doRun(st);
  const drawn = T.path(st).map(key).join('|');
  let edited = T.setCard(st, 2, 'L');
  edited = T.insertCard(edited, edited.rail.length, 'B');
  edited = T.removeCard(edited, 0);
  if (T.path(edited).map(key).join('|') !== drawn) { err('A14 ⭐ editing the rail redrew the trail — the tool is executing as you build'); return; }
  if (edited.rail.join('') === st.rail.join('')) { err('A14 the edit did not take — the check is vacuous'); return; }
  /* and the ghost is the PREVIOUS run, not the new one */
  const again = T.doRun(edited);
  const ghost = (again.ghost || []).map(key).join('|');
  const live = T.path(again).map(key).join('|');
  if (ghost !== drawn) { err('A14 ⭐ the ghost is not the previous run'); return; }
  if (ghost === live) { err('A14 ⭐ the ghost equals the new run — invention 2 is doing nothing'); return; }
  console.log('  A14 ⭐ the trail is of the run that HAPPENED; editing the rail does not redraw it, and the ghost is the previous run, not this one');
}());

/* ---------- A8 identity ---------- */
(function () {
  if (T.tasks || T.nextTask) err('A8 the tool declares tasks/nextTask');
  if (/^\s*(tasks|nextTask)\s*:/m.test(SRC_NC)) err('A8 a tasks/nextTask key is declared');
  const urls = [];
  SRC_NC.replace(/fetch\(\s*['"]([^'"]+)['"]/g, (m, u) => { urls.push(u); return m; });
  const want = ['/api/auth/me', '/mini-tools/arrow-strip-mats.json'].sort().join(',');
  if (urls.length && urls.slice().sort().join(',') !== want) err(`A8 unexpected network calls: ${urls.join(', ')}`);
  if (/sendBeacon|WebSocket|XMLHttpRequest|analytics/.test(SRC_NC)) err('A8 an exfiltration path exists');
  if (/my-classes|rosterFor|studentId|childName/.test(SRC_NC)) err('A8 the tool reads child identity');
  /* refusal 4: NOTHING TO REACH.
     ⚠ `target` is also the anchor attribute (`a.target='_top'`), so the
     bare word is banned in the MODEL region only — where it could only
     ever mean a thing to reach — while the unambiguous nouns are banned
     across the whole file. Poison-tested below, because a ban that has
     been narrowed until it cannot fire is worse than no ban. */
  /* ⚠ from the TOP of the file, not from `newState:` — a mutation that
     planted `goal:{r:0,c:0}` in the constants block sat above a
     newState-anchored region and survived. The region is everything the
     render is not. */
  const mEnd = SRC_NC.indexOf('_loadStore:');
  if (mEnd < 0) { err('A8 could not bound the model region'); return; }
  const model = SRC_NC.slice(0, mEnd);
  const AMBIG = /\b(goal|target)\b/i;
  const HARD = /\b(treasure|solved|solution|isWin|youWin)\b/i;
  if (AMBIG.test(model)) err('A8 a goal/target exists in the MODEL — the trail is the product, there is nothing to reach');
  if (HARD.test(SRC_NC)) err('A8 a solution concept exists anywhere in the tool');
  if (!AMBIG.test('var goal = 1;') || !HARD.test('function solution() {}')) err('A8 POISON: the nothing-to-reach ban no longer fires');
  if (!ERRORS) console.log('  A8 no tasks, no exfiltration, no child identity, and nothing to reach (poison-tested)');
}());

/* ---------- A10 ⭐ NO ABSOLUTE DIRECTION, in eleven locales ---------- */

/* ⚠ EACH LOCALE IS CHECKED AGAINST ITS OWN VOCABULARY, never one global
   regex. The first draft of this gate ran one, and it fired four times on
   perfectly clean strings — because THE ROMANCE COMPASS POINTS ARE
   HOMOGRAPHS OF THE COMMONEST FUNCTION WORDS THERE ARE. fr `est` is
   "east" and also "is"; es/pt `este` is "east" and also "this"; es `sur`
   is "south" and fr `sur` is "on". "elle est sur la case" — two hits,
   both spurious, in five words.
   So the ambiguous tokens are anchored on the form the COMPASS POINT
   actually takes (`à l'est`, `al este`, `a leste`, `a est`) and the bare
   word is not banned in the locale where it is a function word. A2's
   poison test below proves the anchoring did not defang the gate.
   ⚠ Body-relative forward / back / turn-to-ITS-left are the CONTENT and
   stay legal — the possessive is what separates them from
   treasure-hunt's mat-frame vocabulary. */
const ABS_BY_LOCALE = {
  en: /\b(upwards?|downwards?|north|south|east|west|northern|southern|eastern|western)\b/i,
  de: /\b(nach oben|nach unten|aufwärts|abwärts|norden|süden|osten|westen|nördlich|südlich|östlich|westlich)\b/i,
  /* fr: `est` is the verb; anchor on the compass form. `sur` is "on". */
  fr: /\b(vers le haut|vers le bas|nord|sud|ouest)\b|\b(à|a|vers|de) l'est\b/i,
  /* es: `este` is "this"; `sur`/`norte`/`oeste` are unambiguous. */
  es: /\b(hacia arriba|hacia abajo|norte|sur|oeste)\b|\b(al|hacia el|del) este\b/i,
  /* pt: `este` is "this"; BR uses `leste` for the compass point. */
  pt: /\b(para cima|para baixo|norte|sul|oeste|leste)\b|\b(a|ao|para o) este\b/i,
  /* it: `est` is the compass point, `e`/`è` are not it; anchor anyway. */
  it: /\b(verso l'alto|verso il basso|nord|sud|ovest)\b|\b(a|verso|ad) est\b/i,
  nl: /\b(omhoog|omlaag|noord(en)?|zuid(en)?|oost(en)?|west(en)?)\b/i,
  sv: /\b(uppåt|nedåt|norr|söder|öster|väster|norrut|söderut)\b/i,
  da: /\b(opad|nedad|opefter|nedefter|nord|syd|øst|vest)\b/i,
  no: /\b(oppover|nedover|opp|ned|nord|sør|øst|vest)\b/i,
  fi: /\b(ylös|alas|ylöspäin|alaspäin|pohjoinen|etelä|itä|länsi|pohjoiseen|etelään|itään|länteen)\b/i
};

(function () {
  let bad = 0;
  LOCALES.forEach((loc) => {
    const re = ABS_BY_LOCALE[loc];
    if (!re) { err(`A10 no vocabulary list for ${loc}`); bad++; return; }
    Object.keys(T.strings).forEach((k) => {
      const v = T.strings[k][loc];
      if (v === undefined) { err(`A10 strings.${k} has no ${loc}`); bad++; return; }
      const hit = re.exec(String(v));
      if (hit) { err(`A10 ⭐ ${loc}.${k} names an ABSOLUTE direction ("${hit[0]}") — treasure-hunt owns that vocabulary: "${v}"`); bad++; }
      if (/[<>]/.test(String(v))) { err(`A10 ${loc}.${k} carries a comparison glyph`); bad++; }
      const inv = /[­​-‍⁠﻿]/.exec(String(v));
      if (inv) { err(`A10 ${loc}.${k} carries an invisible character U+${inv[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`); bad++; }
    });
  });
  /* and no absolute-frame primitive in the code */
  if (/function\s*\([^)]*\bdir\b/.test(SRC_NC) || /\bdirection\s*[,)]/.test(SRC_NC)) {
    err('A10 a function takes a direction as an argument — the model is {pos, heading} only'); bad++;
  }
  /* ⭐ POISON TEST — the anchoring above narrowed eleven regexes, so prove
     each one still fires on the thing it exists to catch. A gate that has
     been loosened into always-passing reports nothing, which is worse
     than no gate. */
  const POISON = {
    en: 'move it north and then west', de: 'nach oben und dann nach Westen',
    fr: "va vers le nord puis à l'est", es: 'hacia el norte y luego al este',
    pt: 'para o norte e depois a leste', it: "verso il nord e poi ad est",
    nl: 'naar het noorden en dan omhoog', sv: 'norrut och sedan uppåt',
    da: 'mod nord og så opad', no: 'mot nord og så oppover',
    fi: 'pohjoiseen ja sitten ylös'
  };
  LOCALES.forEach((loc) => {
    if (!ABS_BY_LOCALE[loc].test(POISON[loc])) {
      err(`A10 POISON ${loc}: the vocabulary list does NOT fire on "${POISON[loc]}" — it has been anchored into uselessness`);
      bad++;
    }
  });
  if (!bad) console.log(`  A10 ⭐ no absolute direction anywhere (${Object.keys(T.strings).length} keys x 11 locales, each against its OWN vocabulary), all 11 lists poison-tested, and nothing takes a direction as an argument`);
}());

/* ---------- A11 NO VERDICT ---------- */
(function () {
  const ident = /\b(isCorrect|score|streak|stopwatch|countdown|_?elapsed|matched|mismatch|isWrong|winner|attempts|tries)\b/;
  const hit = ident.exec(SRC_NC);
  if (hit) err(`A11 verdict/timing machinery: "${hit[0]}"`);
  if (/arw-(correct|wrong|right|bad|good|win|fail)\b/.test(SRC)) err('A11 a verdict class token exists');
  const words = /\b(correct|incorrect|wrong|well done|richtig|falsch|correcto|incorrecto|faux|bravo|giusto|sbagliato|goed gedaan|fout|rätt|fel|rigtigt|forkert|riktig|feil|oikein|väärin)\b/i;
  let bad = 0;
  LOCALES.forEach((loc) => {
    Object.keys(T.strings).forEach((k) => {
      const v = T.strings[k][loc];
      if (v && words.test(v)) { err(`A11 ${loc}.${k} carries verdict wording: "${v}"`); bad++; }
    });
  });
  if (!bad && !ERRORS) console.log('  A11 no verdict machinery or wording, in any locale');
}());

/* ---------- A15 ⭐ NO DEAD STRINGS ---------- */
(function () {
  /* ⚠ THE FIFTH INSTANCE OF THIS CLASS ON THE PLATFORM, so it stops being
     a thing I find by reading and becomes a thing the gate finds. A key
     authored in eleven locales and consumed by nothing is not harmless:
     ten native panels spent real judgement on it, and on a previous tool
     a dead `fieldLabel` meant a whole control group shipped unlabelled
     for screen readers while the string sat there looking like coverage.
     `cellAria` was exactly this here — 64 decorative mat squares carry
     aria-hidden, so nothing ever asked for it. */
  /* ⚠ "REFERENCED ANYWHERE OUTSIDE THE DECLARATION", not `t('key')`. The
     first cut scanned for the literal call and flagged seven live keys,
     because a key can be reached through a ternary inside t() or through
     a lookup map (CARD_KEY). Strip the declaration; anything left is a
     real reference. */
  const sStart = SRC_NC.indexOf('strings: {');
  const sEnd = SRC_NC.indexOf('STORE_KEY:');
  if (sStart < 0 || sEnd <= sStart) { err('A15 could not bound the strings block'); return; }
  const rest = SRC_NC.slice(0, sStart) + SRC_NC.slice(sEnd);
  /* ⚠ AN AUDITABLE LIST WITH A LINE REFERENCE EACH, NEVER A LOOSENED SCAN.
     Both of these are read by the SHELL and never by the tool, so neither
     can ever appear in the tool's own source:
       title       lcs-shell.js:448  i18n.t(tool.strings, 'title')
       instruction lcs-shell.js:449  i18n.t(tool.strings, 'instruction'),
                   rendered at :461 as <p class="lcs-instruction"> and
                   folded into the role="application" label at :450-456.
     ⚠ `instruction` is ALSO display:none in every embed (lcs-shell.css:261),
     which is why nothing load-bearing may live only there — but that is a
     content rule, not a reachability one, and it does not make the key
     dead. Verified by reading lcs-shell.js, not asserted. */
  const SHELL_OWNED = ['title', 'instruction'];
  const isLive = (k) => SHELL_OWNED.indexOf(k) > -1 || rest.indexOf("'" + k + "'") > -1;
  const keys = Object.keys(T.strings);
  const dead = keys.filter((k) => !isLive(k));
  if (dead.length) { err(`A15 ⭐ dead string(s) authored in 11 locales and consumed by nothing: ${dead.join(', ')}`); return; }
  if (isLive('neverCalledKey')) { err('A15 POISON: the dead-string scan does not fire on an uncalled key'); return; }
  console.log(`  A15 ⭐ every one of the ${keys.length} authored strings is actually consumed (poison-tested)`);
}());

/* ---------- A13 THE MAT BOOK — an invalid mat cannot ship ---------- */
(function () {
  const p = path.join(TOOL_DIR, 'arrow-strip-mats.json');
  if (!fs.existsSync(p)) { err('A13 the Mat Book is missing'); return; }
  let d;
  try { d = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { err(`A13 the Mat Book is not JSON: ${e.message}`); return; }
  const mats = d.mats || [];
  if (!mats.length) { err('A13 the Mat Book is empty'); return; }
  const seen = new Set();
  let free = 0;
  mats.forEach((m, i) => {
    if (!/^m\d+-\d+$/.test(String(m.id))) err(`A13 mat ${i} has a non-structural id "${m.id}"`);
    if (seen.has(m.id)) err(`A13 duplicate mat id "${m.id}"`);
    seen.add(m.id);
    if (T.MATS.indexOf(m.n) === -1) err(`A13 ${m.id} is size ${m.n}, which the tool cannot render`);
    if (!(m.r >= 0 && m.r < m.n && m.c >= 0 && m.c < m.n)) err(`A13 ${m.id} starts off the mat at ${m.r},${m.c}`);
    if (!(m.h >= 0 && m.h <= 3 && m.h === Math.round(m.h))) err(`A13 ${m.id} has heading ${m.h}`);
    if (m.free) free++;
    /* ⚠ NO ROUTE, NO CLUE LIST, NO SOLUTION may ride in the book — that
       restriction is what keeps this off treasure-hunt's ground. */
    Object.keys(m).forEach((k) => {
      if (['id', 'n', 'r', 'c', 'h', 'free'].indexOf(k) === -1) err(`A13 ${m.id} carries an unexpected field "${k}" — a mat is only where the beetle starts`);
    });
  });
  if (free !== d.freeMax) err(`A13 freeMax says ${d.freeMax} but ${free} mats are marked free`);
  /* the free grant must open on arrival — never gate the first affordance */
  if (free < 1) err('A13 no free mat — the first affordance would be locked on arrival');

  /* ⚠ A 404 MUST DEGRADE TO THE FREE TIER, NOT TO NOTHING. The fallback
     shipped empty, which made the Mat Book chip a dead control for a
     subscriber the moment the file failed to load; the liveness gate
     found it. The fallback must carry every free mat and no paid one. */
  const fb = T.FALLBACK_MATS && T.FALLBACK_MATS.mats;
  if (!Array.isArray(fb) || !fb.length) { err('A13 the offline fallback is empty — a 404 leaves a dead control, not a free tier'); return; }
  if (fb.some((m) => !m.free)) err('A13 the offline fallback carries a PAID mat — a 404 would unlock the Teacher plan');
  const freeIds = mats.filter((m) => m.free).map((m) => m.id).sort().join(',');
  if (fb.map((m) => m.id).sort().join(',') !== freeIds) err('A13 the offline fallback does not match the free mats in the book');
  if (!ERRORS) console.log(`  A13 the Mat Book is valid — ${mats.length} mats, ${free} free, every start pose on its own mat, and no route or solution rides in the file`);
}());

/* ---------- A9 / A12 are asserted once the render exists ---------- */
(function () {
  if (!/injectArrowStripCSS|arw-style/.test(SRC)) { warn('A9/A12 the render is not written yet — re-run once it is'); return; }
  /* A12 ⭐ every noun-labelled control does what it says — the lesson from
     number-sieve's "New cards", which set a flag, dealt nothing, and
     passed the liveness gate because the DOM changed. */
  /* ⚠ FOLLOW ONE LEVEL OF INDIRECTION — DO NOT DROP THE ASSERTION.
     The rebuild's Run handler calls `self._playRun()`, which calls
     `doRun`. The first cut of this check read only the handler body and
     reported "could not find the Run handler" on a CORRECT tool — a gate
     condemning working code, which is how a panel gets taught to write
     around a gate instead of reporting it. The fix widens what is
     MEASURED (resolve a `self._method()` call into that method's body),
     never what is accepted: the assertion is still that pressing Run
     reaches doRun. Poison-tested below in both directions. */
  /* ⚠ ANCHOR ON THE ELEMENT, NOT ON THE LABEL. The label now lives in
     _sync() and the handler in _build(), hundreds of lines apart, so a
     "find runBtn then look 400 chars ahead" anchor reported a MISSING
     handler on a tool whose handler was right there. Anchoring on the
     block the rule must affect, not the first plausible match. The label
     is asserted separately below, so the pairing is still proved. */
  const bodyOfHandler = (elName) => {
    const h = new RegExp('els\\.' + elName + '\\.addEventListener\\(\'click\',\\s*function \\(\\)\\s*\\{([\\s\\S]*?)\\}\\);').exec(SRC_NC);
    if (!h) return null;
    let body = h[1];
    /* resolve every `self._foo(` / `this._foo(` the handler calls */
    const calls = body.match(/(?:self|this)\.(_[A-Za-z0-9]+)\s*\(/g) || [];
    calls.forEach((c) => {
      const name = /(_[A-Za-z0-9]+)/.exec(c)[1];
      const m = new RegExp('\\n  ' + name + ':\\s*function[\\s\\S]*?\\n  \\},').exec(SRC_NC);
      if (m) body += '\n' + m[0];
    });
    return body;
  };
  /* each control: it wears the label it should, AND it does what that
     label says. Both halves, or the pairing is unproved. */
  [['run', 'runBtn'], ['clear', 'clearBtn'], ['back', 'backBtn']].forEach(([el, key]) => {
    if (!new RegExp('els\\.' + el + '\\.textContent = api\\.t\\(\'' + key + '\'\\)').test(SRC_NC)) {
      err(`A12 the ${el} control is not labelled from '${key}'`);
    }
  });
  const runH = bodyOfHandler('run');
  if (!runH) { err('A12 could not find the Run handler'); return; }
  if (!/doRun\s*\(/.test(runH)) { err('A12 ⭐ the Run control does not run the rail — a noun-labelled control must do what its label says'); return; }
  const clearH = bodyOfHandler('clear');
  if (!clearH || !/clearRail\s*\(/.test(clearH)) { err('A12 the Empty-the-rail control does not empty the rail'); return; }
  const backH = bodyOfHandler('back');
  if (!backH || !/removeLast\s*\(/.test(backH)) { err('A12 the take-the-last-card-off control does not remove the last card'); return; }
  /* POISON, BOTH WAYS: it must find doRun through the indirection, and it
     must NOT find a method the handler never calls. */
  if (/cycleCard\s*\(/.test(runH)) { err('A12 POISON: the indirection resolver pulled in a method the Run handler never calls'); return; }
  /* A9 the mat must be square or the quarter-turn stops being exact */
  if (!/aspect-ratio:1\/1/.test(SRC)) err('A9 the mat is not square — the frame rotation would stop being exact');
  if (/\.arw-cell\{[^}]*aspect-ratio/.test(SRC)) err('A9 aspect-ratio is on the CELL — it belongs on the mat container, or the track over-inflates and the last column leaves the box while scrollWidth stays clean');
  if (!/\.arw-card\{[^}]*min-height:44px/.test(SRC)) err('A9 the cards are CONTROLS and must hold the 44px floor');
  /* ⚠ THE FLOOR MOVED, AND THE NEW FORM IS STRICTLY STRONGER. Build #1 put
     it in a clamp on the CELL — `clamp(34px, 7.2vmin, 58px)` — which only
     holds while the middle term is small, and whose middle term read the
     IFRAME's height and therefore pinned every desktop AT the floor. The
     floor is now derived on the mat's SIDE, `max(34px*cols + gaps, …)`, so
     a 34px cell is guaranteed by arithmetic at every viewport rather than
     by a clamp arm. Fix what is measured, never the threshold. */
  if (!/--arw-side:max\(calc\(34px \* var\(--arw-cols/.test(CSS)) err('A9 no 34px mat-cell floor found — the mat side must be floored at 34px x cols plus its gaps');
  if (/\.style\.background\s*=/.test(SRC_NC)) err('A9 an inline background SHORTHAND assignment exists — it resets background-image and beats the stylesheet');
  if (!ERRORS) console.log('  A9/A12 the mat is square, the two tap floors hold, and every noun-labelled control does what it says');
}());

/* ---------- A16 ⭐⭐ THE 422px UNPIN, AND NOTHING MAY RE-PIN IT ---------- */
(function () {
  /* lcs-shell.css:54 html,body{height:100%} -> :63-70 .lcs-app{height:100%;
     overflow:hidden}. `.lcs-app.activity{height:auto}` is the only escape
     and a free-play manipulative never gets it, so .lcs-app's height IS the
     iframe's height, the shell measures that same box and posts it to the
     parent, and the loop's fixed point is 422. Build #1 added `arw-wide`
     and never wrote the rule, so the class was INERT and every desktop
     rendered a 214px mat with the Run button clipped off the bottom. */
  const esc = /html\.arw-html,html\.arw-html body\.arw-wide\{[^}]*height:auto/.exec(CSS);
  if (!esc) { err('A16 ⭐⭐ the height-chain escape is missing — the iframe will pin at its initial height and every desktop renders at phone size'); return; }
  /* ⚠ IT MUST NOT SIT INSIDE A MEDIA QUERY. A sibling shipped this escape
     at @media (max-width:700px) and the production embed measures ~704px:
     it missed by FOUR PIXELS. A width is the wrong key.
     ⚠ Counted on the FLATTENED css: the first cut counted `@media` over
     the raw source, where the doc comments discuss the print block in
     prose, and reported a correct unconditional rule as living inside a
     media query. Measure the stylesheet, not the file. */
  const before = CSS.slice(0, esc.index);
  const depth = (before.match(/\{/g) || []).length - (before.match(/\}/g) || []).length;
  if (depth > 0) { err('A16 ⭐⭐ the escape is nested inside a block — it must be unconditional'); return; }
  /* the class the CSS scopes must be the class the JS adds, or every rule
     is present and inert — which is exactly how build #1 shipped */
  if (!/classList\.add\('arw-html'\)/.test(SRC_NC) || !/classList\.add\('arw-wide'\)/.test(SRC_NC)) { err('A16 the CSS scopes a class the JS never adds'); return; }
  if (!/classList\.remove\('arw-html'\)/.test(SRC_NC)) { err('A16 destroy() leaks the html class onto every subsequent tool'); return; }
  /* ⚠ NO HEIGHT-KEYED TIER ANYWHERE. min-height inside the iframe resolves
     against the iframe, so every such tier is dead code. All four of build
     #1's were, together with sixty lines of arithmetic derived from a card
     width that never existed. */
  const heightKeyed = CSS.match(/@media[^{]*min-height/g) || [];
  if (heightKeyed.length) { err(`A16 ⭐ ${heightKeyed.length} tier(s) keyed on min-height — dead code inside the iframe`); return; }
  /* ⚠ AND NO vh / vmin. Both read the iframe's height, which is the content
     height: either one closes the loop the escape exists to open. */
  const vhits = (CSS.match(/\d+(?:\.\d+)?(?:vh|vmin)\b/g) || []);
  if (vhits.length) { err(`A16 ⭐ ${vhits.length} vh/vmin term(s) — they resolve against the iframe and feed back: ${vhits.slice(0, 4).join(', ')}`); return; }
  /* the only height signal allowed is the physical screen, read once */
  /* ⚠ AND IT MUST BE THE PARENT'S VIEWPORT, NOT THE SCREEN. `screen
     .availHeight` is outside the layout and therefore non-circular, which
     is why I reached for it — but headless reports 600 whatever the
     viewport is, so the sweep measured a mat frozen at 372px from 1024 all
     the way to 2560 with every gate green. A signal the gate cannot see is
     a signal nobody can verify. The parent page's innerHeight is real,
     same-origin, and outside this tool's own layout. */
  if (!/window\.parent\.innerHeight/.test(SRC_NC) || !/--arw-sidecap/.test(SRC)) { err('A16 no non-circular height guard — the mat has no vertical budget at all'); return; }
  if (/screen\.availHeight/.test(SRC_NC)) { err('A16 screen.availHeight is back — it is unverifiable in the harness and it froze the mat at 372px'); return; }
  /* POISON, BOTH WAYS */
  if (/@media[^{]*min-height/.test('@media (min-width:900px){')) { err('A16 POISON: the height-keyed scan fires on a width-only tier'); return; }
  if (!/@media[^{]*min-height/.test('@media (min-width:1367px) and (min-height:880px){')) { err('A16 POISON: the height-keyed scan does not fire on build #1’s own dead tier'); return; }
  if (!/\d+(?:\.\d+)?(?:vh|vmin)\b/.test('clamp(34px,7.2vmin,58px)')) { err('A16 POISON: the vmin scan does not fire on build #1’s own cell clamp'); return; }
  if (/\d+(?:\.\d+)?(?:vh|vmin)\b/.test('max-width:min(1240px,96vw)')) { err('A16 POISON: the vmin scan fires on a vw term, which is legal'); return; }
  console.log('  A16 ⭐⭐ the height chain is broken unconditionally, every tier is width-keyed, and no vh/vmin can re-pin it (poison-tested both ways)');
}());

/* ---------- A17 ⭐⭐ NO DEAD MODEL FUNCTION ---------- */
(function () {
  /* ⭐⭐ A NEW CLASS, AND THE ONE THAT FELL THROUGH WAS THE TOOL'S HEADLINE
     ROUTINE. A15 forbids a dead STRING; nothing forbade a dead MODEL
     FUNCTION. `setCard` was defined, exhaustively correct, exercised by
     THIS GATE at A14 — and called from no handler anywhere, so "change ONE
     card and run it again", the move the header calls the thing that
     matters, could not be performed by any teacher. The gate certified the
     invention through a path the UI could not reach. */
  const modelStart = SRC_NC.indexOf('newState: function');
  const modelEnd = SRC_NC.indexOf('_loadStore: function');
  const model = SRC_NC.slice(modelStart, modelEnd);
  const defined = (model.match(/\n  ([a-zA-Z][A-Za-z0-9]*): function/g) || [])
    .map((m) => m.trim().split(':')[0])
    .filter((n) => n[0] !== '_');
  /* `inverseRail` is deliberately gate-only: refusal 9 records that the
     inverse is FALSE whenever anything blocked, so wiring it to a control
     would silently lie on edge mats AND manufacture a goal square. It is
     the one exemption, and it carries its reason. */
  /* ⚠ AN AUDITABLE EXEMPTION LIST WITH A REASON EACH, NEVER A LOOSER SCAN.
       inverseRail — refusal 9: the inverse is FALSE whenever anything
                     blocked, so wiring it to a control would silently lie
                     on edge mats AND manufacture a goal square. A2 owns it.
       blocked     — the boolean roll-up of blockedAt; A2/A3 use it to skip
                     the runs A3 owns. The RENDER uses blockedAt, which is
                     the one that can name the card.
     ⚠ And the scan is over the WHOLE file, not "outside the model": a
     model-internal helper called only by another model function (applyCard
     by run, positions by trailPoints) is perfectly alive, and the first cut
     of this check condemned six of them. The defect being caught is
     DEFINED-AND-CALLED-BY-NOTHING, which is what setCard was. */
  const GATE_ONLY = ['inverseRail', 'blocked'];
  const dead = defined.filter((n) => GATE_ONLY.indexOf(n) < 0 && !new RegExp('\\.' + n + '\\s*\\(').test(SRC_NC));
  if (dead.length) { err(`A17 ⭐⭐ model function(s) defined and called by nothing: ${dead.join(', ')}`); return; }
  if (defined.length < 12) { err(`A17 the model scan found only ${defined.length} functions — it is measuring almost nothing`); return; }
  if (defined.indexOf('setCard') < 0) { err('A17 setCard is gone — the in-place edit IS the routine'); return; }
  /* ⚠ setCard is the one that fell through last time, so it gets its own
     assertion: the cycle must go THROUGH it, not around it via the array. */
  const cyc = /cycleCard: function[\s\S]*?\n  \},/.exec(SRC_NC);
  if (!cyc || !/this\.setCard\s*\(/.test(cyc[0]) || !/this\.removeCard\s*\(/.test(cyc[0])) {
    err('A17 ⭐⭐ cycleCard mutates the rail array directly — that is how setCard and removeCard become dead again'); return;
  }
  if (/\.splice\s*\(/.test(cyc[0]) || /rail\[\w+\]\s*=/.test(cyc[0])) { err('A17 cycleCard still touches the array itself'); return; }
  /* POISON: a name nothing defines must read as unreachable */
  if (new RegExp('\\.neverDefinedFn\\s*\\(').test(SRC_NC)) { err('A17 POISON: the reachability scan is vacuous'); return; }
  console.log(`  A17 ⭐⭐ all ${defined.length} public model functions are called by something, and the cycle goes through setCard/removeCard (2 gate-only exemptions, each with its reason)`);
}());

/* ---------- A18 ⭐⭐ A TURN IS VISIBLE ON THE TRAIL ---------- */
(function () {
  /* ⭐⭐ THE DEEPEST DEFECT IN BUILD #1, AND A PANEL FOUND IT, NOT ME.
     The trail was a polyline of (c+.5, r+.5), so a turn produced two
     IDENTICAL consecutive points and contributed zero geometry. [F,F] and
     [F,L,R,F] drew the same line; [L,L,L,L] ran the whole rail and drew
     NOTHING AT ALL. The header's ONE THESIS is that turns matter, and the
     artefact it calls the product rendered them as literally nothing. */
  const P = { r: 2, c: 2, h: 0 }, N = 6;
  const sig = (rail) => JSON.stringify([
    T.trailPoints(T.run(P, rail, N)).map((p) => p.x.toFixed(3) + ',' + p.y.toFixed(3)),
    T.pivotsFromPath(T.run(P, rail, N)).map((v) => v.r + ':' + v.c + ':' + v.h + ':' + v.dir)
  ]);
  if (sig(['F', 'F']) === sig(['F', 'L', 'R', 'F'])) { err('A18 ⭐⭐ [F,F] and [F,L,R,F] render identically — the two cards the tool exists to teach are invisible'); return; }
  const spin = T.pivotsFromPath(T.run(P, ['L', 'L', 'L', 'L'], N));
  if (spin.length !== 4) { err(`A18 ⭐⭐ a four-turn rail marks ${spin.length} pivots, not 4 — it must draw a full circle on one square`); return; }
  if (!spin.every((v) => v.r === P.r && v.c === P.c && v.dir === -1)) { err('A18 the four pivots are not all on the start square turning the same way'); return; }
  if (T.pivotsFromPath(T.run(P, ['F', 'F'], N)).length !== 0) { err('A18 a step marked a pivot'); return; }
  /* every heading is represented, so no quarter of the circle is missing */
  if (new Set(spin.map((v) => v.h)).size !== 4) { err('A18 the four pivots do not cover four distinct headings'); return; }
  console.log('  A18 ⭐⭐ a turn is visible on the trail: [F,F] and [F,L,R,F] differ, and [L,L,L,L] draws four pivots on one square');
}());

/* ---------- A19 ⭐ A REVISITED SQUARE DRAWS TWO LANES ---------- */
(function () {
  /* [F,F,B,B] is the first rail most children build, and in build #1 it
     rendered identically to [F,F] — the tool looked broken at the exact
     moment it should be most interesting. */
  const P = { r: 4, c: 2, h: 0 }, N = 6;
  const there = T.trailPoints(T.run(P, ['F', 'F'], N));
  const andBack = T.trailPoints(T.run(P, ['F', 'F', 'B', 'B'], N));
  if (JSON.stringify(there) === JSON.stringify(andBack)) { err('A19 ⭐ a there-and-back rail draws the same line as the outbound leg alone'); return; }
  /* the two lanes must be separated by about 2 x delta, and never zero */
  const gaps = [];
  andBack.forEach((a, i) => andBack.forEach((b, j) => {
    if (j > i) { const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 0.5) gaps.push(d); }
  }));
  if (!gaps.length) { err('A19 the offset construction produced no near pairs — it is measuring nothing'); return; }
  if (Math.min.apply(null, gaps) < 0.15) { err(`A19 ⭐ the outbound and return lanes are ${Math.min.apply(null, gaps).toFixed(3)} apart — under a 0.18 stroke they merge into one line`); return; }
  /* a straight run must NOT be bent by the offset: every point on one side */
  const straight = T.trailPoints(T.run(P, ['F', 'F', 'F'], N));
  if (new Set(straight.map((p) => p.x.toFixed(4))).size !== 1) { err('A19 the offset bent a straight run'); return; }
  console.log(`  A19 ⭐ a revisited square draws two lanes ${Math.min.apply(null, gaps).toFixed(3)} apart, and a straight run stays straight`);
}());

/* ---------- A20 ⭐ THE BEETLE'S-EYE VIEW, AND THE PRINT LOCK ---------- */
(function () {
  /* D5: build #1 rotated by pose.h — the START heading, which doRun never
     touches — while drawing the beetle at endPose, so at the default h:0
     the flagship control applied rotate(0deg) and THE MAT DID NOT MOVE.
     And it pinned the beetle to the BOX centre while the frame turned
     about the MAT centre; every mat is even-sided, so there is no centre
     square and the beetle stood on the corner of four squares ALWAYS. */
  if (/arw-fixed/.test(SRC)) { err('A20 ⭐ the beetle is still pinned outside the frame — it will be drawn off its own square'); return; }
  if (/arw-turned/.test(SRC)) { err('A20 `arw-turned` is a class with no rule — dead'); return; }
  const ff = /_frameFor: function[\s\S]*?\n  \},/.exec(SRC_NC);
  if (!ff) { err('A20 could not find the frame rotation'); return; }
  if (/pose\.h/.test(ff[0])) { err('A20 ⭐ the frame rotates by the START heading, which doRun never touches — press it after a turn card and the mat does not move'); return; }
  if (!/_deg/.test(ff[0])) { err('A20 the frame does not rotate by the beetle’s current facing'); return; }
  /* the beetle must be a child of the frame in BOTH views */
  if (!/frame\.appendChild\(els\.beetle\)/.test(SRC_NC)) { err('A20 the beetle does not ride inside the rotating frame'); return; }
  /* PRINT — double-locked: absent from the DOM AND every rule scoped */
  if (!/if \(!this\.premium\) return;/.test(SRC_NC)) { err('A20 the print sheet is not removed from the DOM when unentitled'); return; }
  const pm = /@media print\{([\s\S]*?)\+ '\}';/.exec(SRC);
  if (!pm) { err('A20 could not find the print block'); return; }
  const reveals = (pm[1].match(/\+\s*'([^']*display:block[^']*)'/g) || []);
  if (!reveals.length) { err('A20 the print block reveals nothing — it is measuring nothing'); return; }
  const unscoped = reveals.filter((r) => r.indexOf('body.arw-paid') < 0);
  if (unscoped.length) { err(`A20 ⭐ ${unscoped.length} print reveal(s) not scoped body.arw-paid — Ctrl+P hands a free visitor the paid sheet`); return; }
  if (!/\.arw-wrap\{display:none !important;\}/.test(pm[1])) { err('A20 the live apparatus is not hidden on paper'); return; }
  if (!/@page\{size:A4 portrait/.test(pm[1])) { err('A20 no page size — a US-Letter default silently changes the mat relationship'); return; }
  console.log('  A20 ⭐ the mat turns by the beetle’s CURRENT facing with the beetle riding it, and the print sheet is double-locked');
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
