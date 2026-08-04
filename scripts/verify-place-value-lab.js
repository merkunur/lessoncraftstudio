#!/usr/bin/env node
/* =====================================================================
   verify-place-value-lab.js — THE GATE for Place Value Lab
   (mini tools/place-value-lab.js). MEASURED invariants (fix the data,
   never the gate):
     1. SPAN BYTE-EQUALITY: PV_WORD_SPANS[loc](n) texts concatenate
        BYTE-EQUAL to the spliced NUM_WORDS_HELPERS[loc](n,'cardinal')
        for n = 0..999 × 11 locales (11,000 asserts) — the moat's
        regression net against the protected core's composers.
     2. PART HYGIENE + I3, THE THEOREM: every part is one of
        {hundreds,tens,ones,tenMark,scoreMark,atom,joiner} — 'teen' and
        'mixed' are gone, both having existed to AVOID the analysis and
        both sitting exactly where the analysis pays. Every span carries
        a numeric 'v', and sum(v) === n across 0-999 x 11: the coloured
        parts partition the VALUE, not merely the string, so a lump is
        structurally impossible — you cannot partition one. Byte
        equality is a spelling check; this is the thesis. A joiner names
        0, a tenMark names 10, a scoreMark names 80.
     3. SPLICE FIDELITY: NUM_WORDS_HELPERS output equals the LIVE
        place-value-core.js _NUMBER_WORD_HELPERS output for a 60-value
        stratified sample × 11 (the splice never drifts from the core).
     4. ENGINE INVARIANTS (pure, DOM-free): auto-snap keeps committed
        ones ≤ 9 under a 500-op fuzz; makeTen only when ones ≥ 10;
        breakTen only when tens ≥ 1; value() ≡ 100h+10t+o after every
        mutation; subtract grader rejects a correct difference reached
        WITHOUT the break and accepts it WITH.
     5. STRINGS ×11 complete; {n}/{a}/{b}/{c}/{word} placeholders
        survive; no "Common Core".
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
/* `teen` and `mixed` are gone — see the composer's own header. A part
   that exists to avoid the analysis is not a part. */
const PARTS = ['hundreds', 'tens', 'ones', 'tenMark', 'scoreMark', 'atom', 'joiner'];
const errors = [];
const E = (m) => errors.push(m);

function load(file, name) {
  const sb = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '' }, localStorage: { getItem: () => null, setItem: () => {} }, sessionStorage: { getItem: () => null, setItem: () => {} } };
  sb.global = sb;
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sb);
  return sb[name] || sb.window[name];
}

let tool, core;
try {
  tool = load(path.join(__dirname, '..', 'mini tools', 'place-value-lab.js'), 'PlaceValueLab');
  core = load(path.join(__dirname, '..', 'mini tools', 'place-value-core.js'), 'PlaceValueCore');
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
if (!tool || !tool.PV_WORD_SPANS) { console.log('FAIL  PlaceValueLab.PV_WORD_SPANS not found'); process.exit(1); }

/* ---- 1 + 2. span byte-equality + part hygiene, 0-999 × 11 ---- */
let spanAsserts = 0;
for (const L of LOCALES) {
  const helper = tool.NUM_WORDS_HELPERS[L];
  const spansFn = tool.PV_WORD_SPANS[L];
  const mixedRange = tool.MIXED_RANGES[L] || null;
  if (!helper) { E(`${L}: helper missing`); continue; }
  if (!spansFn) { E(`${L}: span composer missing`); continue; }
  for (let n = 0; n <= 999; n++) {
    const want = helper(n, 'cardinal');
    const spans = spansFn(n);
    const got = spans.map((s) => s.t).join('');
    if (got !== want) { if (spanAsserts < 12000) E(`SPAN ${L} ${n}: "${got}" ≠ "${want}"`); spanAsserts++; continue; }
    spanAsserts++;
    let nTens = 0, nOnes = 0, nHund = 0, sum = 0, nContent = 0;
    for (const s of spans) {
      if (PARTS.indexOf(s.p) < 0) E(`PART ${L} ${n}: illegal part "${s.p}"`);
      if (!s.t) E(`PART ${L} ${n}: empty span text`);
      if (typeof s.v !== 'number' || !isFinite(s.v)) E(`NAMES ${L} ${n}: span "${s.t}" (${s.p}) carries no numeric v`);
      else sum += s.v;
      if (s.p === 'joiner') {
        if (s.v !== 0) E(`NAMES ${L} ${n}: joiner "${s.t}" names ${s.v}, must name 0`);
      } else nContent++;
      if (s.p === 'tenMark' && s.v !== 10) E(`NAMES ${L} ${n}: tenMark "${s.t}" names ${s.v}, must name 10`);
      if (s.p === 'scoreMark' && s.v !== 80) E(`NAMES ${L} ${n}: scoreMark "${s.t}" names ${s.v}, must name 80`);
      /* a lemma exists to say what a clipped surface MEANS; it must
         differ from the surface or it is noise */
      if (s.lemma !== undefined && s.lemma === s.t) E(`LEMMA ${L} ${n}: "${s.t}" carries a lemma identical to itself`);
      if (s.p === 'tens') nTens++;
      if (s.p === 'ones') nOnes++;
      if (s.p === 'hundreds') nHund++;
    }

    /* ⭐⭐ I3 — THE THEOREM. The coloured parts partition the VALUE, not
       merely the string. This is what byte-equality cannot see: a lump
       spells correctly and names nothing, so `mixed` is now structurally
       impossible rather than merely discouraged. */
    if (sum !== n) E(`I3 ${L} ${n}: spans name ${sum} — [${spans.map((s) => s.t + '=' + s.v).join(' + ')}]`);

    /* a number names each place at most once — a duplicated content
       part is a mislabeled joiner */
    if (nTens > 1 || nOnes > 1 || nHund > 1) E(`DUP ${L} ${n}: parts tens×${nTens} ones×${nOnes} hundreds×${nHund}`);

    /* the highlight must always have at least two things to point at
       inside a compound sub-99: the old check demanded a tens AND a
       ones span, which is wrong for the vigesimal and teen shapes the
       new taxonomy finally analyses (fr 96 is scoreMark+atom, en 14 is
       ones+tenMark). Two CONTENT parts is the honest requirement. */
    /* ⚠ AN ATOM IS THE ONE HONEST EXCEPTION. eleven, twelve, once,
       quince, seize, sedici, elva, elleve genuinely have no internal
       structure in the modern language, so demanding two parts there
       would push the composer straight back into inventing splits —
       which is the defect this taxonomy exists to remove. Exempt a
       sub-99 named by a single atom, and ONLY that. */
    const sub = n % 100;
    const soleAtom = spans.filter((s) => s.p !== 'joiner');
    const isAtomOnly = soleAtom.length === 1 && soleAtom[0].p === 'atom' && soleAtom[0].v === sub;
    if (sub >= 11 && sub <= 99 && sub % 10 !== 0 && nContent < 2 && !isAtomOnly) {
      E(`SPLIT ${L} ${n}: only ${nContent} content span(s) — nothing to contrast`);
    }
  }
}

/* ---- 3. splice fidelity vs the LIVE core ---- */
let spliceAsserts = 0;
if (core && core._NUMBER_WORD_HELPERS) {
  const sample = [];
  for (let n = 0; n <= 20; n++) sample.push(n);
  [24, 31, 47, 55, 68, 71, 72, 80, 81, 89, 90, 97, 99, 100, 101, 110, 121, 147, 200, 215, 247, 305, 380, 382, 420, 500, 583, 700, 771, 883, 906, 909, 990, 999].forEach((n) => sample.push(n));
  for (const L of LOCALES) {
    for (const n of sample) {
      for (const mode of ['cardinal', 'attributive', 'attributive-fem']) {
        const a = tool.NUM_WORDS_HELPERS[L](n, mode);
        const b = core._NUMBER_WORD_HELPERS[L](n, mode);
        if (a !== b) E(`SPLICE ${L} ${n} ${mode}: "${a}" ≠ core "${b}"`);
        spliceAsserts++;
      }
    }
  }
} else E('core _NUMBER_WORD_HELPERS unreadable — splice fidelity unverified');

/* ---- 4. engine invariants (pure) ---- */
let engineAsserts = 0;
if (typeof tool.engineNew === 'function') {
  /* auto-mode fuzz: committed ones ≤ 9 always */
  let st = tool.engineNew({ bundle: 'auto', maxPlaces: 3 });
  let seed = 42;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  for (let i = 0; i < 500; i++) {
    const op = Math.floor(rnd() * 6);
    if (op === 0) tool.engineAddOne(st);
    else if (op === 1) tool.engineAddTen(st);
    else if (op === 2) tool.engineAddHundred(st);
    else if (op === 3) tool.engineRemove(st, 'ones');
    else if (op === 4) tool.engineRemove(st, 'tens');
    else tool.engineRemove(st, 'hundreds');
    if (st.bundleMode === 'auto' && st.o > 9) { E(`FUZZ auto op${i}: ones=${st.o} > 9`); break; }
    if (st.h < 0 || st.t < 0 || st.o < 0) { E(`FUZZ op${i}: negative count`); break; }
    if (tool.engineValue(st) !== st.h * 100 + st.t * 10 + st.o) { E(`FUZZ op${i}: value mismatch`); break; }
    engineAsserts++;
  }
  /* invited mode: 10th one sits at 10; makeTen canonicalizes */
  st = tool.engineNew({ bundle: 'invited', maxPlaces: 2 });
  for (let i = 0; i < 10; i++) tool.engineAddOne(st);
  if (st.o !== 10 || st.t !== 0) E(`INVITED: after 10 adds o=${st.o} t=${st.t} (want 10/0)`);
  if (!tool.engineCanMakeTen(st)) E('INVITED: canMakeTen false at o=10');
  tool.engineMakeTen(st);
  if (st.o !== 0 || st.t !== 1) E(`INVITED: after makeTen o=${st.o} t=${st.t} (want 0/1)`);
  if (tool.engineCanMakeTen(st)) E('INVITED: canMakeTen true at o=0');
  /* preconditions */
  st = tool.engineNew({ bundle: 'invited', maxPlaces: 2 });
  tool.engineMakeTen(st);
  if (st.t !== 0) E('makeTen fired with ones<10');
  tool.engineBreakTen(st);
  if (st.o !== 0) E('breakTen fired with tens<1');
  tool.engineAddTen(st);
  tool.engineBreakTen(st);
  if (st.t !== 0 || st.o !== 10) E(`breakTen: t=${st.t} o=${st.o} (want 0/10)`);
  engineAsserts += 8;
  /* subtract grader: the break is load-bearing */
  if (typeof tool.gradeSubtract === 'function') {
    /* 42−17: reached WITHOUT a break (teacher typed 25 directly) → rejected */
    const noBreak = { h: 0, t: 2, o: 5, _decomposed: false };
    if (tool.gradeSubtract(noBreak, 42, 17)) E('gradeSubtract accepts the no-break path');
    const withBreak = { h: 0, t: 2, o: 5, _decomposed: true };
    if (!tool.gradeSubtract(withBreak, 42, 17)) E('gradeSubtract rejects the correct break path');
    const wrong = { h: 0, t: 3, o: 5, _decomposed: true };
    if (tool.gradeSubtract(wrong, 42, 17)) E('gradeSubtract accepts a wrong difference');
    engineAsserts += 3;
  } else E('gradeSubtract missing');
} else E('engine fns missing (engineNew/engineAddOne/...)');

/* =====================================================================
   I1 · REACHABILITY — exhaustive BFS over the engine's OWN legal moves.

   ⭐ The gate implements its own ground truth: it never asks the tool
   whether a state is legal, it asks what the DIGIT CARDS would display
   for that state and compares against what the MAT holds. The display
   rule is transcribed from `render()` (dvals is sliced out of
   engineValue), NOT called, so a change to render() cannot silently
   move the expectation.

   Two invariants over every reachable state, per (bundleMode, places):
     R1  the numeral the tool DISPLAYS equals the value the mat HOLDS.
         h*100+t*10+o must be representable in `places` digits, because
         the display slices it per place and drops anything above.
     R2  no state is a DEAD END above the canonical ceiling: if a mat is
         non-canonical (o>9 or t>9) at least one bundling move must be
         legal, or the child is stuck holding a number the tool refuses
         to name and refuses to let them tidy.

   This is the invariant the tool never had, and it is the reason two
   engine defects survived: it would have caught both on its first run.
   ===================================================================== */
let reachAsserts = 0;
if (tool.engineNew && tool.engineAddOne) {
  const key = (s) => s.h + ',' + s.t + ',' + s.o;
  const clone = (s) => ({ h: s.h, t: s.t, o: s.o, bundleMode: s.bundleMode, maxPlaces: s.maxPlaces, _decomposed: s._decomposed });

  /* the display rule, transcribed from render():1371 — NOT called */
  const displayed = (s, places) => {
    const v = s.h * 100 + s.t * 10 + s.o;
    const d = { hundreds: Math.floor(v / 100), tens: Math.floor(v / 10) % 10, ones: v % 10 };
    let shown = 0;
    if (places >= 3) shown += d.hundreds * 100;
    shown += d.tens * 10 + d.ones;
    return shown;
  };

  for (const mode of ['invited', 'auto']) {
    for (const places of [2, 3]) {
      const start = tool.engineNew({ bundle: mode, maxPlaces: places });
      const seen = new Set([key(start)]);
      const queue = [start];
      /* ⚠ ONLY the moves the UI can actually invoke. `engineMakeTen` has
         no ceiling on tens of its own — the guard lives in the caller
         (`_makeTen` checks `engineCanMakeTen` first, and the button is
         not rendered otherwise). A BFS that calls the raw mutators
         explores states no child can reach and, because makeTen then
         grows tens without bound, never terminates. Model the UI, not
         the mutator. */
      const moves = [
        ['addOne', (s) => tool.engineAddOne(s)],
        ['addTen', (s) => tool.engineAddTen(s)],
        ['addHundred', (s) => tool.engineAddHundred(s)],
        ['remOnes', (s) => tool.engineRemove(s, 'ones')],
        ['remTens', (s) => tool.engineRemove(s, 'tens')],
        ['remHund', (s) => tool.engineRemove(s, 'hundreds')],
        ['makeTen', (s) => { if (tool.engineCanMakeTen(s)) tool.engineMakeTen(s); }],
        ['makeHundred', (s) => { if (tool.engineCanMakeHundred(s)) tool.engineMakeHundred(s); }],
        ['breakTen', (s) => tool.engineBreakTen(s)],
        ['breakHundred', (s) => tool.engineBreakHundred(s)],
      ];
      /* a gate that hangs is a gate that SURVIVED — bound the walk and
         report the bound being hit as a FAILURE, never as completion. */
      const CEILING = 20000;
      const badDisplay = [];
      const deadEnds = [];
      let blewUp = false;
      while (queue.length) {
        if (seen.size > CEILING) { blewUp = true; break; }
        const s = queue.shift();
        const held = s.h * 100 + s.t * 10 + s.o;

        /* R1 — what the mat holds vs what the numeral says */
        if (displayed(s, places) !== held) {
          if (badDisplay.length < 6) badDisplay.push(`{h:${s.h},t:${s.t},o:${s.o}} holds ${held}, displays ${displayed(s, places)}`);
        }
        /* R2 — a non-canonical mat must have a way back */
        if (s.o > 9 || s.t > 9) {
          const canTidy = tool.engineCanMakeTen(s) || tool.engineCanMakeHundred(s);
          if (!canTidy && deadEnds.length < 6) deadEnds.push(`{h:${s.h},t:${s.t},o:${s.o}} = ${held} is non-canonical with no legal bundling move`);
        }
        for (const [, fn] of moves) {
          const nxt = clone(s);
          try { fn(nxt); } catch (_) { continue; }
          const k = key(nxt);
          if (!seen.has(k)) { seen.add(k); queue.push(nxt); }
        }
      }
      reachAsserts += seen.size;
      const tag = `I1 ${mode}/${places}pl`;
      if (blewUp) E(`${tag}: state space exceeded ${CEILING} — the reachable set is unbounded`);
      for (const m of badDisplay) E(`${tag} R1 numeral≠mat: ${m}`);
      for (const m of deadEnds) E(`${tag} R2 dead end: ${m}`);

      /* R3 — the AUTO setting promises "bundles by itself at ten". If a
         place can be reached at 10+ of the place below without the
         bundle happening, or a hundred is unreachable by adding tens,
         the setting's own label is false. */
      if (mode === 'auto' && places >= 3) {
        const s = tool.engineNew({ bundle: 'auto', maxPlaces: 3 });
        for (let i = 0; i < 12; i++) tool.engineAddTen(s);
        if (s.h < 1) E(`I1 auto/3pl R3: 12×addTen reached {h:${s.h},t:${s.t}} — 100 is unreachable by tens, but setBundleAuto promises it bundles by itself at ten`);
        reachAsserts++;
      }
    }
  }
} else E('I1: engine fns missing');

/* ---- 5. strings hygiene ---- */
const S = tool.strings;
for (const key of Object.keys(S)) {
  for (const L of LOCALES) {
    const v = S[key][L];
    if (typeof v !== 'string' || !v.trim()) E(`${key}.${L}: missing/empty`);
    else if (v.includes('Common Core')) E(`${key}.${L}: mentions Common Core`);
  }
}
for (const L of LOCALES) {
  for (const [k, ph] of [['showPrompt', '{n}'], ['showNice', '{n}'], ['showNice', '{word}'], ['showMiss', '{n}'], ['showMiss', '{word}'], ['subPrompt', '{a}'], ['subPrompt', '{b}'], ['subDone', '{c}']]) {
    if (S[k] && S[k][L] && !S[k][L].includes(ph)) E(`${k}.${L}: ${ph} missing`);
  }
}

console.log(`${errors.length ? 'FAIL' : 'PASS'}  place-value-lab gate  (${spanAsserts} span, ${spliceAsserts} splice, ${engineAsserts} engine, ${reachAsserts} reachable states, ${errors.length} errors)`);
for (const e of errors.slice(0, 20)) console.log('   ERROR ' + e);
if (errors.length > 20) console.log(`   … +${errors.length - 20} more`);
process.exit(errors.length ? 1 : 0);
