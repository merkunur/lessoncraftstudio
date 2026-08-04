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

/* env indirection so mutate-place-value-lab.js can point the gate at a
   mutated COPY without touching the working tree */
const TOOLDIR = process.env.PVL_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const COREDIR = path.join(__dirname, '..', 'mini tools');

let tool, core;
try {
  tool = load(path.join(TOOLDIR, 'place-value-lab.js'), 'PlaceValueLab');
  /* ⚠ the CORE is always read from the real tree. It is the thing the
     splice is checked AGAINST, so a mutation harness that copied it
     would let a mutation move both sides of the comparison at once. */
  core = load(path.join(COREDIR, 'place-value-core.js'), 'PlaceValueCore');
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

    /* ⭐ A PROBLEM THAT NEEDS NO REGROUP MUST PASS WITHOUT ONE. The old
       grader demanded `_decomposed` on every problem, which is simply
       false whenever the ones do not run out — it would have marked a
       correct no-regroup subtraction WRONG. Every problem used to force
       a borrow, so the bug could never fire; loosening the generator so
       the child gets to decide is what exposes it. */
    const easy = { h: 0, t: 2, o: 3, _decomposed: false };   /* 48 − 25 = 23 */
    if (!tool.gradeSubtract(easy, 48, 25)) E('gradeSubtract rejects a correct subtraction that needed no regroup');
    /* and breaking when you did not need to is a misread of the mat */
    const overBroke = { h: 0, t: 2, o: 3, _decomposed: true };
    if (tool.gradeSubtract(overBroke, 48, 25)) E('gradeSubtract accepts a needless break');
    engineAsserts += 2;

    /* ⭐ THE REMOVAL RECORD IS READ. removedT/removedO were collected at
       every removal and never looked at, so the grade was about a value
       and a boolean, never about what the child actually took away. */
    const rightRec = { removedT: 1, removedO: 7 };
    if (!tool.gradeSubtract({ h: 0, t: 2, o: 5, _decomposed: true }, 42, 17, rightRec)) E('gradeSubtract rejects a correct removal record');
    for (const bad of [{ removedT: 0, removedO: 7 }, { removedT: 1, removedO: 0 }, { removedT: 2, removedO: 7 }]) {
      if (tool.gradeSubtract({ h: 0, t: 2, o: 5, _decomposed: true }, 42, 17, bad)) {
        E(`gradeSubtract accepts a removal record of ${bad.removedT * 10 + bad.removedO} for b=17`);
      }
    }
    /* seventeen ones taken one at a time after two breaks is ALSO 17 */
    if (!tool.gradeSubtract({ h: 0, t: 2, o: 5, _decomposed: true }, 42, 17, { removedT: 0, removedO: 17 })) {
      E('gradeSubtract rejects seventeen ones removed singly — that is still taking away 17');
    }
    engineAsserts += 5;
  } else E('gradeSubtract missing');
} else E('engine fns missing (engineNew/engineAddOne/...)');

/* =====================================================================
   I1b · THE FIVE THE MUTATION HARNESS FOUND, and not one of them was a
   bad mutation — every one named a hole.

   ⭐ AN OFFER MUST BE HONOURABLE. `engineCanMakeTen` is what puts the
   "Make a ten!" button on screen, and it was possible to loosen it to
   o >= 9 without any gate noticing, because `engineMakeTen` guards
   itself at o >= 10 and quietly refuses. The button would appear and do
   nothing — §23.6's consequence-free control, in the one place this tool
   cannot afford it. So: whenever a can-predicate says yes, performing
   the move must CHANGE the state.

   ⭐ REGROUPING PRESERVES VALUE. That is what the word means: you trade
   ten of one place for one of the next and the number does not move.
   Nothing asserted it, so `breakHundred` could hand back 90 for 100 and
   the whole suite stayed green.
   ===================================================================== */
if (typeof tool.engineNew === 'function') {
  const REGROUP = [
    ['makeTen', 'engineCanMakeTen', 'engineMakeTen'],
    ['makeHundred', 'engineCanMakeHundred', 'engineMakeHundred'],
  ];
  for (let h = 0; h <= 9; h++) {
    for (let t = 0; t <= 19; t++) {
      for (let o = 0; o <= 19; o++) {
        for (const places of [2, 3]) {
          const base = { h: places >= 3 ? h : 0, t: t, o: o, bundleMode: 'invited', maxPlaces: places, _decomposed: false };
          if (tool.engineValue(base) > tool.engineMaxValue(base)) continue;

          /* value preservation across every regrouping move */
          for (const fn of ['engineMakeTen', 'engineMakeHundred', 'engineBreakTen', 'engineBreakHundred']) {
            const s = Object.assign({}, base);
            const before = tool.engineValue(s);
            const did = tool[fn](s);
            const after = tool.engineValue(s);
            if (did && after !== before) {
              E(`REGROUP ${fn} {h:${base.h},t:${base.t},o:${base.o}}: ${before} → ${after} — regrouping must preserve the value`);
            }
            engineAsserts++;
          }

          /* an offer the engine refuses to honour */
          for (const [label, can, make] of REGROUP) {
            const s = Object.assign({}, base);
            if (!tool[can](s)) continue;
            const snap = s.h + ',' + s.t + ',' + s.o;
            tool[make](s);
            if (snap === s.h + ',' + s.t + ',' + s.o) {
              E(`OFFER ${label} {h:${base.h},t:${base.t},o:${base.o}}: the predicate says yes and the move does nothing`);
            }
            engineAsserts++;
          }
        }
      }
    }
  }

  /* canonical must notice BOTH columns — it is what the word-highlight
     honesty hangs on, and it was only ever asserted on the ones */
  if (tool.engineCanonical({ h: 0, t: 12, o: 0, maxPlaces: 3 })) E('CANONICAL: a mat with 12 tens reports canonical');
  if (tool.engineCanonical({ h: 0, t: 0, o: 12, maxPlaces: 2 })) E('CANONICAL: a mat with 12 ones reports canonical');
  if (!tool.engineCanonical({ h: 1, t: 9, o: 9, maxPlaces: 3 })) E('CANONICAL: a tidy mat reports non-canonical');
  engineAsserts += 3;

  /* the grader must refuse a non-canonical mat even at the right value:
     "42 − 17 = 25" is not shown by 1 ten and 15 ones */
  if (typeof tool.gradeSubtract === 'function') {
    const messy = { h: 0, t: 1, o: 15, _decomposed: true };
    if (tool.gradeSubtract(messy, 42, 17)) E('GRADE: accepts 25 shown as 1 ten and 15 ones — the mat is not tidied');
    const messyTens = { h: 0, t: 12, o: 5, _decomposed: true, maxPlaces: 3 };
    if (tool.gradeSubtract(messyTens, 142, 17)) E('GRADE: accepts 125 shown as 12 tens — the mat is not tidied');
    engineAsserts += 2;
  }

  /* AUTO must bundle ones into a ten, not only tens into a hundred */
  const a2 = tool.engineNew({ bundle: 'auto', maxPlaces: 2 });
  for (let i = 0; i < 12; i++) tool.engineAddOne(a2);
  if (a2.t < 1) E(`AUTO: 12×addOne reached {t:${a2.t},o:${a2.o}} — ones never bundled, but setBundleAuto promises they do`);
  engineAsserts++;
}

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

/* =====================================================================
   I2 + I4 · THE REPERTOIRE.

   ⚠ THE GATE RE-COMPUTES EVERY FEATURE FROM THE INTEGER AND FROM
   PV_WORD_SPANS. It never reads the file's own answer back — a
   repertoire is precisely where marks-its-own-homework would bite,
   because a data file looks authoritative and a wrong tag would simply
   be believed.

   I2  every declared feature is TRUE of the number, and every feature in
       the enum is exhibited by at least one entry (a filter that matches
       nothing must FAIL, not report a clean sweep of an empty set)
   I4  the FREE subset exhibits every feature — so no claim the tool's
       header makes sits behind the paywall — and no entry is duplicated
   ===================================================================== */
let repAsserts = 0;
{
  const setsPath = path.join(TOOLDIR, 'place-value-lab-sets.json');
  let rep = null;
  try { rep = JSON.parse(fs.readFileSync(setsPath, 'utf8')); } catch (_) { rep = null; }
  if (!rep) E('REPERTOIRE: place-value-lab-sets.json missing or unparseable');
  else if (!Array.isArray(rep.sets) || rep.sets.length < 150) {
    E(`REPERTOIRE: ${rep.sets ? rep.sets.length : 0} entries — the house bar is a real library, not a sample`);
  } else {
    /* ⭐ the gate's OWN ground truth, transcribed from the definition of
       each feature — not imported from the generator. */
    const dig = (n) => ({ h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 });
    const truth = (n) => {
      const d = dig(n), f = new Set(), sub = n % 100;
      if (sub >= 11 && sub <= 19) f.add('teen');
      if (n >= 10 && sub % 10 === 0 && sub !== 0) f.add('decade');
      if (n >= 100 && d.t === 0) f.add('zero-placeholder');
      if (d.t !== 0 && d.o !== 0 && d.t !== d.o) f.add('reversal');
      if (d.t === d.o && d.t !== 0) f.add('same-digits');
      if (n >= 100) f.add('three-digit');
      if (n < 10) f.add('single-digit');
      for (const L of LOCALES) {
        const sp = tool.PV_WORD_SPANS[L](n);
        const io = sp.findIndex((s) => s.p === 'ones');
        const it2 = sp.findIndex((s) => s.p === 'tens' || s.p === 'tenMark');
        if (io >= 0 && it2 >= 0 && io < it2) { f.add('inversion'); break; }
      }
      for (const L of LOCALES) {
        if (tool.PV_WORD_SPANS[L](n).some((s) => s.p === 'atom')) { f.add('atom'); break; }
      }
      if (tool.PV_WORD_SPANS.fr(n).some((s) => s.p === 'scoreMark')) f.add('vigesimal');
      return f;
    };

    const seen = new Set(), exhibited = new Set(), freeExhibited = new Set();
    let freeN = 0;
    for (const s of rep.sets) {
      if (typeof s.n !== 'number' || s.n < 0 || s.n > 999) { E(`REPERTOIRE ${s.id}: n=${s.n} out of range`); continue; }
      if (seen.has(s.n)) E(`REPERTOIRE ${s.id}: ${s.n} appears twice`);
      seen.add(s.n);
      const want = truth(s.n), got = new Set(s.features || []);
      for (const f of got) if (!want.has(f)) E(`I2 ${s.id} (${s.n}): declares "${f}" — not true of the number`);
      for (const f of want) if (!got.has(f)) E(`I2 ${s.id} (${s.n}): omits "${f}"`);
      const needPlaces = s.n >= 100 ? 3 : 2;
      if (s.places !== needPlaces) E(`I2 ${s.id} (${s.n}): places=${s.places}, needs ${needPlaces}`);
      got.forEach((f) => exhibited.add(f));
      if (s.free) { freeN++; got.forEach((f) => freeExhibited.add(f)); }
      repAsserts++;
    }
    /* non-vacuity: a feature nothing exhibits is a dead enum member */
    for (const f of (rep.features || [])) {
      if (!exhibited.has(f)) E(`I2: feature "${f}" is declared in the enum and exhibited by NO entry`);
      if (!freeExhibited.has(f)) E(`I4: feature "${f}" is exhibited by no FREE entry — part of the argument is behind the paywall`);
    }
    if (!freeN) E('I4: no free entries at all — the first affordance is gated');
    if (rep.freeCount !== freeN) E(`I4: freeCount says ${rep.freeCount}, ${freeN} entries carry free:true`);
    repAsserts += (rep.features || []).length * 2;

    /* the inline fallback must BE the free tier, not nothing and not
       everything (the arrow-strip lesson) */
    const inline = tool.SHOW_POOL || [];
    if (!inline.length) E('FALLBACK: SHOW_POOL is empty — offline degrades to a dead mode');
    const freeSet = new Set(rep.sets.filter((s) => s.free).map((s) => s.n));
    for (const n of inline) if (!freeSet.has(n)) E(`FALLBACK: SHOW_POOL carries ${n}, which is not a free entry`);
    repAsserts += inline.length;

    /* ⭐ THE TIER SPLIT ITSELF, exercised rather than assumed. The
       mutation that removed the entitlement branch from _pool() —
       serving the whole library to everyone — survived the first run of
       this gate, because nothing here had ever CALLED _pool. A pure gate
       that only inspects data cannot see a paid layer evaporate. */
    if (typeof tool._pool === 'function') {
      const ctx = { SHOW_POOL: inline, _sets: rep.sets, _setsFree: rep.sets.filter((s) => s.free), _pool: tool._pool };
      ctx.premium = false;
      const poolFree = tool._pool.call(ctx);
      ctx.premium = true;
      const poolAll = tool._pool.call(ctx);
      const buildAll = rep.sets.filter((s) => s.kind === 'build').length;
      const buildFree = rep.sets.filter((s) => s.kind === 'build' && s.free).length;
      if (poolFree.length !== buildFree) E(`TIER: the free pool holds ${poolFree.length}, expected ${buildFree}`);
      if (poolAll.length !== buildAll) E(`TIER: the paid pool holds ${poolAll.length}, expected ${buildAll}`);
      if (poolAll.length <= poolFree.length) E('TIER: the paid pool is no larger than the free one — there is no depth to sell');
      for (const n of poolFree) if (!freeSet.has(n)) E(`TIER: the free pool leaks ${n}, a paid entry`);
      /* and with no library loaded at all, both tiers fall back to the
         inline free set rather than to an empty mode */
      const off = { SHOW_POOL: inline, _sets: null, premium: true, _pool: tool._pool };
      if (tool._pool.call(off).length !== inline.length) E('TIER: offline does not fall back to the inline free set');
      repAsserts += 5;
    } else E('TIER: _pool() is missing — the repertoire is not wired to entitlement');
  }
}

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

console.log(`${errors.length ? 'FAIL' : 'PASS'}  place-value-lab gate  (${spanAsserts} span, ${spliceAsserts} splice, ${engineAsserts} engine, ${reachAsserts} reachable states, ${repAsserts} repertoire, ${errors.length} errors)`);
for (const e of errors.slice(0, 20)) console.log('   ERROR ' + e);
if (errors.length > 20) console.log(`   … +${errors.length - 20} more`);
process.exit(errors.length ? 1 : 0);
