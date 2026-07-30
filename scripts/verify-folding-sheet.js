#!/usr/bin/env node
/* =====================================================================
   verify-folding-sheet.js — the measured gate for TOOL #35.

   The model is FINITE and small, so this gate EXHAUSTS it rather than
   sampling. Where fractions-core proves closed forms by point-sampling,
   this proves the reflection maps by enumeration — a strictly stronger
   claim, and the reason the sheet is square.

     M1  INVOLUTION            mirror(mirror(c)) === c, every crease
     M2  EXACT PERMUTATION     a centred crease permutes all N² cells
     M3  HONEST DOMAIN         hasPartner agrees with the closed form
     M4  FIXED POINTS          diagonals fix a line; v/h fix NOTHING
     M5  THE FOLD IS THE MAP   layers === self + partner; fold is pure
     M6  ⭐ SYMMETRY <=> NO SINGLES, exhaustive at N=4
     M7  TWO-TONE IS A THIRD STATE
     M8  OPEN IS LOSSLESS
     M9  GHOSTS ARE THE MISSING PARTNERS, and committing them is exact
     M10 MOVING THE CREASE NEVER TOUCHES THE PAINT
     M11 THIN / IMMUTABLE / HOSTILE-SAFE
     M12 NO VERDICT
     M13 ⭐ THE 4.G.A.3 FENCE + the L5 letters carve-out
     M14 IDENTITY / EXFIL / no tasks (this discharges the ruling)
     M15 TAP GEOMETRY (controls and canvas measured SEPARATELY)
     M16 STRINGS / CSS

   Usage: node scripts/verify-folding-sheet.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.FSH_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'folding-sheet.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

const sandbox = {
  document: {
    getElementById: () => null,
    createElement: () => ({ style: {}, setAttribute() {}, appendChild() {}, append() {} }),
    head: { appendChild() {} },
    body: { classList: { add() {}, remove() {} } }
  },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(SRC + '\n;this.__T = FoldingSheet;', sandbox);
const T = sandbox.__T;

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* every crease reachable on an n×n sheet */
function allCreases(n) {
  const out = [];
  for (let k = 0; k <= n - 2; k++) { out.push({ kind: 'v', k }); out.push({ kind: 'h', k }); }
  out.push({ kind: 'd', k: 0 });
  out.push({ kind: 'a', k: 0 });
  return out;
}
const stateWith = (n, crease, paint) => ({
  n, paint: paint || new Array(n * n).fill(null),
  crease: { kind: crease.kind, k: crease.k }, folded: false, ghosts: false
});

/* ---------------- M1 involution ---------------- */
console.log('[the map]');
(function () {
  let checks = 0;
  for (const n of [4, 8]) {
    for (const x of allCreases(n)) {
      const st = stateWith(n, x);
      for (let i = 0; i < n * n; i++) {
        const m = T.mirrorIdx(st, i);
        checks++;
        if (m < 0) continue;
        if (T.mirrorIdx(st, m) !== i) {
          err(`M1 involution broken at n=${n} ${x.kind}${x.k} cell ${i}: mirror(mirror)=${T.mirrorIdx(st, m)}`);
          return;
        }
      }
    }
  }
  console.log(`  M1 mirror(mirror(c)) === c — ${checks} cells across every crease at n=4 and n=8`);
}());

/* ---------------- M2 exact permutation ---------------- */
(function () {
  const n = T.N;
  const centred = [{ kind: 'v', k: n / 2 - 1 }, { kind: 'h', k: n / 2 - 1 }, { kind: 'd', k: 0 }, { kind: 'a', k: 0 }];
  for (const x of centred) {
    const st = stateWith(n, x), seen = new Set();
    for (let i = 0; i < n * n; i++) {
      const m = T.mirrorIdx(st, i);
      if (m < 0) { err(`M2 ${x.kind} sends cell ${i} off the sheet — a centred crease must not`); return; }
      seen.add(m);
    }
    if (seen.size !== n * n) { err(`M2 ${x.kind} is not a bijection (${seen.size} of ${n * n})`); return; }
  }
  console.log(`  M2 each centred crease permutes all ${n * n} cells exactly`);
}());

/* ---------------- M3 honest domain ---------------- */
(function () {
  const n = T.N;
  for (const x of allCreases(n)) {
    const st = stateWith(n, x);
    for (let i = 0; i < n * n; i++) {
      const r = Math.floor(i / n), c = i % n;
      let nr, nc;
      if (x.kind === 'v') { nr = r; nc = 2 * x.k + 1 - c; }
      else if (x.kind === 'h') { nr = 2 * x.k + 1 - r; nc = c; }
      else if (x.kind === 'd') { nr = c; nc = r; }
      else { nr = n - 1 - c; nc = n - 1 - r; }
      const inb = nr >= 0 && nr < n && nc >= 0 && nc < n;
      if (T.hasPartner(st, i) !== inb) { err(`M3 hasPartner disagrees with the closed form at ${x.kind}${x.k} cell ${i}`); return; }
      if (inb && T.mirrorIdx(st, i) !== nr * n + nc) { err(`M3 mirrorIdx wrong at ${x.kind}${x.k} cell ${i}`); return; }
      /* ⚠ WHICH SIDE IS "NEAR" IS A CONVENTION THE RENDER DEPENDS ON, so
         it is pinned to the closed form too. The flap's transform-origin,
         the hidden half and the overhang set all assume near = the side
         the crease's index counts up to; flipping it silently folds the
         long side onto the short one. */
      const wantNear = x.kind === 'v' ? c <= x.k
        : x.kind === 'h' ? r <= x.k
        : x.kind === 'd' ? r >= c
        : r + c <= n - 1;
      if (T.isNear(st, i) !== wantNear) { err(`M3 isNear disagrees with the closed form at ${x.kind}${x.k} cell ${i}`); return; }
      /* and the crease genuinely SEPARATES a cell from its partner */
      const m2 = T.mirrorIdx(st, i);
      if (m2 >= 0 && m2 !== i && T.isNear(st, i) === T.isNear(st, m2)) {
        err(`M3 the crease does not separate cell ${i} from its partner at ${x.kind}${x.k}`); return;
      }
    }
  }
  console.log('  M3 hasPartner, mirrorIdx and isNear agree with the closed form, exhaustively');
}());

/* ---------------- M4 fixed points ---------------- */
(function () {
  const n = T.N;
  for (const x of allCreases(n)) {
    const st = stateWith(n, x);
    const fixed = [];
    for (let i = 0; i < n * n; i++) if (T.mirrorIdx(st, i) === i) fixed.push(i);
    if (x.kind === 'v' || x.kind === 'h') {
      if (fixed.length) {
        err(`M4 ${x.kind}${x.k} fixes ${fixed.length} cell(s) — a straight crease lives in a GAP and must fix NOTHING`);
        return;
      }
    } else if (x.kind === 'd') {
      const want = [];
      for (let r = 0; r < n; r++) want.push(r * n + r);
      if (fixed.join() !== want.join()) { err('M4 the main diagonal does not fix exactly r===c'); return; }
    } else {
      const want = [];
      for (let r = 0; r < n; r++) want.push(r * n + (n - 1 - r));
      if (fixed.sort((a, b) => a - b).join() !== want.sort((a, b) => a - b).join()) {
        err('M4 the anti-diagonal does not fix exactly r+c===n-1'); return;
      }
    }
  }
  console.log('  M4 v/h fix nothing (the crease is in a gap); the diagonals fix exactly their line');
}());

/* ---------------- M5 the fold is the map, and it is pure ---------------- */
console.log('');
console.log('[the fold]');
const corpus = (n, count) => {
  const out = [];
  let seed = 12345;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  for (let t = 0; t < count; t++) {
    const p = new Array(n * n).fill(null);
    for (let i = 0; i < n * n; i++) if (rnd() < 0.45) p[i] = Math.floor(rnd() * T.COLOURS.length);
    out.push(p);
  }
  return out;
};
(function () {
  const n = T.N;
  for (const x of allCreases(n)) {
    for (const p of corpus(n, 12)) {
      const st = stateWith(n, x, p);
      const before = JSON.stringify(st);
      for (let i = 0; i < n * n; i++) {
        const L = T.layerAt(st, i), m = T.mirrorIdx(st, i);
        const self = st.paint[i] !== null ? 1 : 0;
        const other = (m >= 0 && m !== i && st.paint[m] !== null) ? 1 : 0;
        if (L.count !== self + other) { err(`M5 layer count wrong at ${x.kind}${x.k} cell ${i}`); return; }
      }
      const folded = T.fold(st);
      if (JSON.stringify(st) !== before) { err('M5 fold() mutated its input — the view cannot write to the data'); return; }
      if (!folded.folded) { err('M5 fold() did not fold'); return; }
      if (JSON.stringify(folded.paint) !== JSON.stringify(st.paint)) { err('M5 fold() changed the paint'); return; }
    }
  }
  console.log('  M5 layers === self + partner, and fold() never mutates the sheet');
}());

/* ---------------- M6 ⭐ symmetry <=> no singles, EXHAUSTIVE at n=4 ---- */
(function () {
  const n = 4, tot = n * n, creases = allCreases(n);
  let checked = 0;
  for (const x of creases) {
    for (let bits = 0; bits < (1 << tot); bits++) {
      const p = new Array(tot).fill(null);
      for (let i = 0; i < tot; i++) if (bits & (1 << i)) p[i] = 0;
      const st = stateWith(n, x, p);
      let singles = 0;
      for (let i = 0; i < tot; i++) {
        const k = T.layerAt(st, i).kind;
        if (k === 'one' || k === 'twotone') singles++;
      }
      if (T.isSymmetric(st) !== (singles === 0)) {
        err(`M6 symmetry/singles disagree at n=4 ${x.kind}${x.k} bits=${bits} (singles=${singles})`);
        return;
      }
      checked++;
    }
  }
  console.log(`  M6 ⭐ symmetric <=> zero single-layer cells — EXHAUSTIVE, ${checked.toLocaleString('en-US')} states at n=4`);
  /* and a randomised multi-colour corpus at the real size */
  const N = T.N;
  for (const x of allCreases(N)) {
    for (const p of corpus(N, 40)) {
      const st = stateWith(N, x, p);
      const singles = T.singlesCount(st);
      if (T.isSymmetric(st) !== (singles === 0)) { err(`M6 disagree at n=${N} ${x.kind}${x.k}`); return; }
    }
  }
  console.log(`  M6 and holds on a 4-colour randomised corpus at n=${N}`);
}());

/* ---------------- M7 two-tone is a third state ---------------- */
(function () {
  const n = T.N, x = { kind: 'v', k: n / 2 - 1 };
  const p = new Array(n * n).fill(null);
  p[0] = 0; p[T.mirrorIdx(stateWith(n, x), 0)] = 1;      /* two DIFFERENT colours meet */
  const st = stateWith(n, x, p);
  const L = T.layerAt(st, 0);
  if (L.kind !== 'twotone') { err(`M7 two colours meeting reads as "${L.kind}" — it must be its own third state`); return; }
  if (T.isSymmetric(st)) { err('M7 two different colours meeting counted as symmetric'); return; }
  p[T.mirrorIdx(st, 0)] = 0;
  const same = stateWith(n, x, p);
  if (T.layerAt(same, 0).kind !== 'two') { err('M7 the same colour meeting is not two layers'); return; }
  console.log('  M7 same colour -> two layers; different colours -> a third thing, never an error');
}());

/* ---------------- M8 open is lossless ---------------- */
(function () {
  const n = T.N;
  for (const x of allCreases(n)) {
    for (const p of corpus(n, 8)) {
      let st = stateWith(n, x, p);
      const before = JSON.stringify(st);
      for (let f = 0; f < 4; f++) { st = T.fold(st); st = T.open(st); }
      if (JSON.stringify(st) !== before) { err(`M8 four fold/open cycles were lossy at ${x.kind}${x.k}`); return; }
    }
  }
  console.log('  M8 open(fold(s)) === s, lossless over four flips');
}());

/* ---------------- M9 ghosts ---------------- */
(function () {
  const n = T.N;
  for (const x of allCreases(n)) {
    for (const p of corpus(n, 12)) {
      const st = stateWith(n, x, p);
      const want = new Set();
      for (let i = 0; i < n * n; i++) {
        if (st.paint[i] === null) continue;
        const m = T.mirrorIdx(st, i);
        if (m >= 0 && m !== i && st.paint[m] === null) want.add(m);
      }
      const got = new Set(T.ghostsOf(st));
      if (got.size !== want.size || [...want].some((g) => !got.has(g))) {
        err(`M9 ghosts are not exactly the missing partners at ${x.kind}${x.k}`); return;
      }
      for (const g of got) if (!(g >= 0 && g < n * n)) { err('M9 a ghost is off the sheet'); return; }
      /* ⚠ GHOSTS COMPLETE; THEY DO NOT CORRECT. A ghost is a MISSING
         partner. A cell painted red whose partner is painted blue has no
         missing partner at all, so the ghosts rightly leave it alone —
         committing them cannot and must not overwrite a child's colour.
         The honest invariant is therefore an IFF, not "always symmetric":
         the first draft of this gate asserted the stronger thing and was
         wrong about the tool. */
      const twotone = st.paint.some((v, i) => {
        const m = T.mirrorIdx(st, i);
        return v !== null && m >= 0 && m !== i && st.paint[m] !== null && st.paint[m] !== v;
      });
      const orphan = st.paint.some((v, i) => v !== null && T.mirrorIdx(st, i) < 0);
      const done = T.commitGhosts(st);
      if (T.isSymmetric(done) !== (!twotone && !orphan)) {
        err(`M9 commitGhosts symmetry is not exactly "no disagreement and no overhanging paint" at ${x.kind}${x.k}`);
        return;
      }
      /* ⚠ AND IT TOUCHES NOTHING ELSE. Without this the IFF above is
         nearly VACUOUS: on a 4-colour random corpus a two-colour
         disagreement is almost always present, so the expected answer is
         "false" almost every time and a mutation that corrupts an
         unrelated cell keeps it false and sails through. (It did.) This
         is the direct, non-vacuous statement: committing a suggestion
         may write to the suggested cells and to nothing the child
         painted. */
      const gset = new Set(got);
      for (let i = 0; i < n * n; i++) {
        if (gset.has(i)) continue;
        if (done.paint[i] !== st.paint[i]) {
          err(`M9 commitGhosts wrote to cell ${i}, which was not a ghost — it must never overwrite the child's paint`);
          return;
        }
      }
    }
  }
  /* a corpus where the IFF is non-trivially TRUE: paint the near half
     only, in ONE colour, so committing the ghosts must always complete
     a genuinely symmetric figure */
  for (const x of allCreases(n)) {
    for (const p of corpus(n, 8)) {
      const half = new Array(n * n).fill(null);
      const base = stateWith(n, x);
      for (let i = 0; i < n * n; i++) if (p[i] !== null && T.isNear(base, i)) half[i] = 0;
      const st = stateWith(n, x, half);
      const orphan = half.some((v, i) => v !== null && T.mirrorIdx(st, i) < 0);
      const done = T.commitGhosts(st);
      if (T.isSymmetric(done) !== !orphan) {
        err(`M9 a one-colour half-figure did not complete to symmetry at ${x.kind}${x.k}`);
        return;
      }
    }
  }
  console.log('  M9 ghosts === the missing partners; committing completes the figure and touches nothing else');
}());

/* ---------------- M10 moving the crease never touches the paint ------- */
(function () {
  const n = T.N;
  for (const p of corpus(n, 10)) {
    const st = stateWith(n, { kind: 'v', k: 3 }, p);
    for (const x of allCreases(n)) {
      const moved = T.setCrease(st, x.kind, x.k);
      if (JSON.stringify(moved.paint) !== JSON.stringify(st.paint)) {
        err(`M10 setCrease changed the paint (${x.kind}${x.k}) — trying another claim must cost nothing`);
        return;
      }
    }
  }
  console.log('  M10 setCrease never touches the paint');
}());

/* ---------------- M11 thin / immutable / hostile-safe ---------------- */
console.log('');
console.log('[the state]');
(function () {
  const keys = Object.keys(T.newState()).sort().join(',');
  if (keys !== 'crease,folded,ghosts,n,paint') { err(`M11 state shape is "${keys}"`); return; }
  const st = T.newState();
  const snap = JSON.stringify(st);
  ['paintAt', 'fold', 'open', 'setGhosts', 'clear'].forEach((fn) => {
    T[fn](st, 0, 0);
    if (JSON.stringify(st) !== snap) err(`M11 ${fn}() mutated its input`);
  });
  /* hostile input must clamp, never throw and never widen the state */
  const bad = [null, undefined, NaN, -5, 1e9, 'x', {}];
  bad.forEach((b) => {
    try {
      T.mirrorIdx(st, b); T.layerAt(T.setCrease(st, b, b), 0);
      T.paintAt(st, b, b); T.clampCrease(8, b, b);
    } catch (e) { err(`M11 hostile input ${String(b)} threw: ${e.message}`); }
  });
  const c1 = T.clampCrease(8, 'zzz', 99);
  if (c1.kind !== 'v' || c1.k !== 6) err(`M11 clampCrease did not clamp (${c1.kind}${c1.k})`);
  const c2 = T.clampCrease(8, 'd', 5);
  if (c2.k !== 0) err('M11 a diagonal crease must be centred (k=0)');
  const pk = Object.keys(T.paintAt(st, 0, 99)).sort().join(',');
  if (pk !== 'crease,folded,ghosts,n,paint') err('M11 a mutator widened the state');
  if (T.paintAt(st, 0, 99).paint[0] !== T.COLOURS.length - 1) err('M11 the colour index did not clamp');
  if (!ERRORS) console.log('  M11 five keys, immutable mutators, clamps rather than rejects');
}());

/* ---------------- M12 no verdict ---------------- */
console.log('');
console.log('[the stance]');
(function () {
  const banned = /\b(isCorrect|score|streak|stopwatch|countdown|elapsed|matched|mismatch|isWrong|winner)\b/;
  const hit = banned.exec(SRC_NC);
  if (hit) err(`M12 verdict/timing machinery: "${hit[0]}"`);
  if (/fsh-(correct|wrong|match|mismatch|good|bad|right)\b/.test(SRC)) err('M12 a verdict class token exists');
  /* the words, in every locale the tool speaks */
  const words = /\b(correct|incorrect|wrong|richtig|falsch|correcto|incorrecto|correct[ea]?|faux|giusto|sbagliato|fout|goed gedaan|rätt|fel|rigtigt|forkert|riktig|feil|oikein|väärin)\b/i;
  LOCALES.forEach((loc) => {
    Object.keys(T.strings).forEach((k) => {
      const v = T.strings[k][loc];
      if (v && words.test(v)) err(`M12 ${loc}.${k} carries verdict wording: "${v}"`);
    });
  });
  /* "matched"/"mismatched" is the specific costume this tool must refuse */
  const costume = /\b(matched|unmatched|mismatched|passt|stimmt überein|coincide|combina|corrisponde|klopt|stämmer|passer|täsmää)\b/i;
  LOCALES.forEach((loc) => Object.keys(T.strings).forEach((k) => {
    const v = T.strings[k][loc];
    if (v && costume.test(v)) err(`M12 ${loc}.${k} says "matched" in a costume: "${v}"`);
  }));
  if (!ERRORS) console.log('  M12 no verdict identifier, class token or wording in any of the 11 locales');
}());

/* ---------------- M13 ⭐ the 4.G.A.3 fence + the L5 carve-out --------- */
(function () {
  /* the Grade-4 vocabulary, in all eleven languages. The tool proves the
     idea and refuses to name it — the count belongs to G3-342. */
  const axis = /(line[s]? of symmetry|axis of symmetry|axes of symmetry|Symmetrieachse|Spiegelachse|axe de sym|eje de simetr|eixo de simetr|asse di simmetria|symmetrieas|spiegelas|symmetrilinje|symmetriaxel|spegelaxel|symmetriakse|spejlingsakse|speilakse|symmetria-akseli|peiliakseli)/i;
  LOCALES.forEach((loc) => Object.keys(T.strings).forEach((k) => {
    const v = T.strings[k][loc];
    if (v && axis.test(v)) err(`M13 ${loc}.${k} names the Grade-4 axis vocabulary: "${v}"`);
  }));
  /* no COUNT is ever named: no standalone digit in any authored string */
  LOCALES.forEach((loc) => Object.keys(T.strings).forEach((k) => {
    const v = T.strings[k][loc];
    if (v && /\d/.test(v)) err(`M13 ${loc}.${k} contains a digit — this tool never counts: "${v}"`);
  }));
  /* it must not reference the printable types it is fenced against */
  if (/\b(K-063|G2-247|G2-248|G3-342)\b/.test(SRC_NC)) err('M13 the code references a printable worksheet type');
  if (/image-cache|silhouette|maskIoU|flipMask/.test(SRC_NC)) err('M13 the build-time silhouette machinery leaked in');
  /* ⚠ THE L5 CARVE-OUT — no letters, or Reversal Bench has nothing left */
  if (/letter-tiles|letterTiles|alphabet|RULING\b/.test(SRC_NC)) err('M13 letterform data leaked in — that is L5 Reversal Bench');
  if (/['"][bdpq]['"]\s*,\s*['"][bdpq]['"]/.test(SRC_NC)) err('M13 a b/d/p/q glyph table exists — that is L5 Reversal Bench');
  if (!ERRORS) console.log('  M13 ⭐ no axis vocabulary, no digit, no letters, no printable-type reference');
}());

/* ---------------- M14 identity / exfil / no tasks ---------------- */
(function () {
  if (T.id !== 'folding-sheet') err(`M14 id is "${T.id}"`);
  if (T.STORE_KEY !== 'lcs:folding-sheet:v1') err(`M14 STORE_KEY is "${T.STORE_KEY}"`);
  if (T.premium !== false) err('M14 premium does not default to false');
  /* ⚠ THE LINE THAT DISCHARGES THE GRADE-BAND RULING. No tasks and no
     nextTask means the shell renders no activity chrome and the landing
     emits no educationalAlignment — so this tool claims no CCSS code,
     and cannot collide with 4.G.A.3 or anything else. */
  if (T.tasks || T.nextTask) err('M14 the tool declares tasks/nextTask — it would become a graded activity');
  if (/^\s*(tasks|nextTask)\s*:/m.test(SRC_NC)) err('M14 a tasks/nextTask key is declared in source');
  const urls = [];
  SRC_NC.replace(/fetch\(\s*['"]([^'"]+)['"]/g, (_, u) => { urls.push(u); return _; });
  if (urls.length !== 1 || urls[0] !== '/api/auth/me') err(`M14 unexpected network calls: ${urls.join(', ') || 'none'}`);
  if (/sendBeacon|WebSocket|XMLHttpRequest|\/track|analytics/.test(SRC_NC)) err('M14 an exfiltration path exists');
  if (/my-classes|rosterFor|studentId|childName/.test(SRC_NC)) err('M14 the tool reads child identity');
  if (!ERRORS) console.log('  M14 identity ok; NO tasks/nextTask — the tool claims no CCSS code at all');
}());

/* ---------------- M15 tap geometry, measured in two categories -------- */
console.log('');
console.log('[geometry + l10n]');
(function () {
  /* ⚠ TWO CATEGORIES, TWO FLOORS, NEITHER OF THEM MOVED. A control is a
     control and holds 44px. A paint cell is CANVAS — the same call
     calendar-wall.js:1423 makes for its month grid — and holds 34px.
     Fudging one number to cover both is how a real defect gets waved
     through, so they are asserted separately and named. */
  const ctrl = [
    [/\.fsh-chip\{[^}]*min-height:(\d+)px/, 'chip'],
    [/\.fsh-swatch\{[^}]*height:(\d+)px/, 'swatch'],
    [/\.fsh-gaps-v \.fsh-gap\{[^}]*width:(\d+)px/, 'vertical gap handle'],
    [/\.fsh-gaps-h \.fsh-gap\{[^}]*height:(\d+)px/, 'horizontal gap handle']
  ];
  ctrl.forEach(([re, what]) => {
    const m = re.exec(SRC);
    if (!m) { err(`M15 could not measure the ${what}`); return; }
    if (Number(m[1]) < 44) err(`M15 the ${what} is ${m[1]}px, under the 44px control floor`);
  });
  const cell = /--fsh-cell:clamp\((\d+)px/.exec(SRC);
  if (!cell) err('M15 the paint cell has no clamped floor');
  else if (Number(cell[1]) < 34) err(`M15 the paint cell floor is ${cell[1]}px, under the 34px canvas floor`);
  if (!/aspect-ratio:1\/1/.test(SRC)) err('M15 the sheet is not square — the diagonals would stop being exact');
  if (!ERRORS) console.log(`  M15 controls >= 44px; paint cell floor ${cell ? cell[1] : '?'}px (canvas class, calendar-wall precedent)`);
}());

/* ---------------- M16 strings + css ---------------- */
(function () {
  const keys = Object.keys(T.strings);
  keys.forEach((k) => {
    LOCALES.forEach((loc) => {
      const v = T.strings[k][loc];
      if (!v || typeof v !== 'string' || !v.trim()) err(`M16 ${loc}.${k} is missing`);
      if (v && /'/.test(v) && !/’/.test(v)) {
        /* a straight apostrophe in a locale that should use a curly one */
        if (['fr', 'it', 'nl', 'en'].indexOf(loc) > -1 && /\w'\w/.test(v)) warn(`M16 ${loc}.${k} uses a straight apostrophe: "${v}"`);
      }
    });
  });
  /* every api.t() call must resolve to an authored key */
  (SRC_NC.match(/api\.t\('([a-zA-Z]+)'\)/g) || []).forEach((call) => {
    const k = /api\.t\('([a-zA-Z]+)'\)/.exec(call)[1];
    if (!T.strings[k]) err(`M16 api.t('${k}') has no authored string`);
  });
  Object.keys(T.KIND_LABEL).forEach((k) => {
    if (!T.strings[T.KIND_LABEL[k]]) err(`M16 crease "${k}" has no aria label string`);
  });
  if (!/getElementById\('fsh-style'\)/.test(SRC)) err('M16 the CSS injector is not idempotent');
  if (!/@media print/.test(SRC)) err('M16 no print block');
  if (!/prefers-reduced-motion/.test(SRC)) err('M16 no reduced-motion block');
  if (/prefers-reduced-motion[^}]*transition:\s*none/.test(SRC)) {
    err('M16 reduced motion SKIPS the fold — it must compress it; the fold is the content');
  }
  /* ⚠ only an UNSCOPED .lcs-* rule is a violation. `body.fsh-wide
     .lcs-header{…}` is the sanctioned scope both siblings use to let the
     page scroll on a phone; banning it outright would make the shared
     idiom unusable. A first cut anchored on (^|[;}]) and MISSED the real
     case entirely — the CSS is built by string concatenation, so an
     injected rule is preceded by a quote, not a brace. Read the selector
     instead of guessing at its neighbour. */
  const sel = /([^{};]*)\.lcs-(stage|app|header|ctrl)([^{}]*)\{/g;
  let sm;
  while ((sm = sel.exec(SRC)) !== null) {
    if (!/fsh-/.test(sm[1])) err(`M16 the tool restyles a shell internal unscoped: "${(sm[1] + '.lcs-' + sm[2]).trim().slice(-60)}"`);
  }
  if (!/body\.fsh-wide/.test(SRC)) err('M16 the wide scope class is missing');
  /* the four colours must not be verdict colours */
  T.COLOURS.forEach((c) => {
    const h = c.toLowerCase();
    const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
    if (r > 150 && g < 90 && b < 90) err(`M16 ${c} reads as a red verdict colour`);
    if (g > 150 && r < 110 && b < 110) err(`M16 ${c} reads as a green verdict colour`);
  });
  if (!ERRORS) console.log(`  M16 ${keys.length} strings across ${LOCALES.length} locales; css ok; palette carries no verdict colour`);
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
