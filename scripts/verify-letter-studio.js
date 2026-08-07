#!/usr/bin/env node
/* =====================================================================
   verify-letter-studio.js — BUILD GATE for TOOL #25 Letter Studio.
   Browser-free. Exhaustive over every glyph the tool can put on the sheet.

   ⭐ THE GATE COMPUTES ITS OWN GROUND TRUTH.
   Both trace cores ship SOLVERS and it would be far shorter to call them
   and read the verdicts. That is marking your own homework: a core whose
   `sample()` is wrong in the same direction as its own solver agrees with
   itself and passes. So every synthetic finger below is walked along THIS
   file's own Catmull-Rom, and every expectation is stated here in
   absolute units.

   ⭐ AND IT POISON-TESTS ITSELF, IN BOTH DIRECTIONS.
   `--poison` re-runs the whole suite against a deliberately broken tool
   (the defects this rebuild exists to remove, faithfully reinstated) and
   FAILS if that tool passes. The must-pass half is the ordinary run.

   ---------------------------------------------------------------------
   WHAT THE PREVIOUS VERSION OF THIS FILE GOT WRONG, all four measured:

     :192-193  "the mark must be LAST" compared an ARRAY's JSON against
               the string "null" — `JSON.stringify(undefined)` is
               `undefined`, not `"null"`, so the equality was structurally
               unreachable. Measured: 54 composed glyphs, fires 0 times.
     :195-199  the i/j dot-drop check ran only `if (T.DOTTED[base])`, i.e.
               for the LOWERCASE base — but it then required
               `mark !== 'diaeresis'`, and every lowercase-i/j mark that
               ships is grave/acute/circumflex/diaeresis. Measured: fires
               0 times on the real table and 0 times when the dot-drop is
               deleted.
     :122      read the trays from TOOLS_DIR, not TOOL_DIR — so a mutation
               run pointing LS_TOOL_DIR at a tmp copy could never poison
               the eleven tray files the whole assertion family is about.
     :123      downgraded a MISSING tray to a warning. Deleting
               letter-tiles-fi.json passed.

   Three further gate-side expectations were stale rather than vacuous and
   are corrected here, each named so nobody re-adds them:
     * a bare `>= 24 strings` floor. That is a threshold somebody invented;
       the rebuild deliberately deleted the mode strip, the hint line, both
       case labels and four button labels, so the count fell to 20 and the
       gate failed CORRECT work. What actually matters is reachability, in
       both directions, and that is measured (§L).
     * a `type: ui|word` allow-list for speech. `lcs-shell.js:190` declares
       `TYPES = {word, syllable, ui, number}`; a digit spoken as
       `type:'number'` is right, and the allow-list is now READ OFF THE
       SHELL rather than invented here — minus `syllable`, which stays
       banned for the Heart Words reason (no isolated phonemes to a child).
     * `advance()` on alphabet-trace-core. The judging moved to
       stroke-trace-core, which takes STROKES; the old §G7 was testing a
       code path this tool no longer executes.

   usage:  node scripts/verify-letter-studio.js [--locales=en,de] [--poison]
   override for the mutation harness:  LS_TOOL_DIR
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
const TOOL_DIR = process.env.LS_TOOL_DIR || TOOLS_DIR;

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALL;
const POISON = process.argv.includes('--poison');
const QUIET = process.argv.includes('--quiet');

let ERRORS = 0, CHECKS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const ok = (m) => { if (!QUIET) console.log('  pass  ' + m); };
const check = (m, cond) => { CHECKS++; if (cond) ok(m); else err(m); };
const head = (s) => { if (!QUIET) console.log('\n[' + s + ']'); };

/* =====================================================================
   THE POISON — the shipped defects, faithfully reinstated.
   Each patch THROWS if its anchor is missing, so the poison can never
   quietly degrade into a no-op and report a green run as evidence.
   ===================================================================== */
const POISON_PATCHES = [
  ['digits are judged by the ALPHABET core again (the shipped defect)',
    `    if (this.isDigit(ch)) {
      if (!this.numCore) return null;
      return this.numCore.glyphFor ? this.numCore.glyphFor(ch, this.api.lang)
                                   : (this.numCore.GLYPHS && this.numCore.GLYPHS[ch]) || null;
    }`,
    `    if (this.isDigit(ch)) {
      return (this.core && (this.core.GLYPHS[ch] || this.core.GLYPHS['l'])) || null;
    }`],
  ['the mark is PREPENDED, so the body is no longer first',
    '    return body.concat(strokes);',
    '    return strokes.concat(body);'],
  ["upperOf returns 'SS' for ß again",
    `    var u = ch.toUpperCase();
    return u.length === 1 ? u : ch;`,
    '    return ch.toUpperCase();'],
  ['a free visitor gets the roster',
    '    if (!premium || !mc || !classId) return [];',
    '    if (!mc || !classId) return [];'],
  /* ⚠ MY FIRST VERSION OF THIS PATCH SURVIVED, and the patch was what was
     wrong: it declared the key in a NEW object (`strings2`) rather than in
     `strings`, so nothing looked at it. A poison that misses its target
     tests the gate's ability to see something that is not there. */
  ['a dead string nobody reaches',
    '  strings: {\n    title:',
    "  strings: {\n    neverUsed:    {en:'x',de:'x',fr:'x',it:'x',es:'x',pt:'x',nl:'x',sv:'x',da:'x',no:'x',fi:'x'},\n    title:"],
  ['i and j keep their dot under a mark',
    '    if (this.DOTTED[baseChar]) body = baseStrokes.slice(0, baseStrokes.length - 1);',
    '    if (false) body = baseStrokes.slice(0, baseStrokes.length - 1);']
];

/* ⚠ ONE PATCH AT A TIME. Applying all six at once means the first
   assertion to fire short-circuits the rest and they are never observed
   failing — indistinguishable from being unable to fail. `LS_POISON_ONLY`
   names the single patch this process must apply; the parent drives the
   whole list and requires every one to be caught. */
function poisonSource(src, only) {
  const list = only === undefined ? POISON_PATCHES : [POISON_PATCHES[only]];
  let out = src;
  for (const [label, from, to] of list) {
    if (out.indexOf(from) === -1) throw new Error('POISON ANCHOR MISSING: ' + label);
    const next = out.replace(from, to);
    if (next === out) throw new Error('POISON WAS INERT: ' + label);
    out = next;
  }
  return out;
}

/* =====================================================================
   A FAKE DOM GOOD ENOUGH TO RENDER INTO.
   Not a browser — the browser gate is local-test-letter-studio.js. This
   exists so the STRING REACHABILITY matrix (§L) can drive the real
   builders. A regex over the source cannot tell a live `t('k')` from one
   sitting in a branch nothing can enter, and that distinction is the
   whole defect class (#39 `hintMark`, 11 locales, wired to nothing).
   ===================================================================== */
function makeEl(tag, cls) {
  const e = {
    tagName: String(tag || 'div').toUpperCase(),
    className: cls || '',
    kids: [], attrs: {}, textContent: '', innerHTML: '', value: '',
    style: { setProperty() {} },
    parentNode: null, disabled: false, type: '', href: '',
    appendChild(c) { if (c) { c.parentNode = e; e.kids.push(c); } return c; },
    removeChild(c) { e.kids = e.kids.filter(k => k !== c); return c; },
    remove() { if (e.parentNode) e.parentNode.removeChild(e); },
    setAttribute(k, v) { e.attrs[k] = String(v); },
    getAttribute(k) { return Object.prototype.hasOwnProperty.call(e.attrs, k) ? e.attrs[k] : null; },
    removeAttribute(k) { delete e.attrs[k]; },
    addEventListener() {}, removeEventListener() {},
    querySelector() { return null; }, querySelectorAll() { return []; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 400, height: 400, right: 400, bottom: 400 }; },
    classList: {
      add() {}, remove() {}, toggle() {}, contains() { return false; }
    },
    focus() {}, click() {}, scrollLeft: 0, scrollWidth: 0, clientWidth: 0, offsetLeft: 0, offsetWidth: 0
  };
  return e;
}

function loadTool(src) {
  const noop = () => {};
  const sandbox = {
    console,
    navigator: { language: 'en' },
    document: {
      createElement: (t) => makeEl(t, ''),
      createElementNS: (ns, t) => makeEl(t, ''),
      getElementById: () => null,
      querySelector: () => null, querySelectorAll: () => [],
      head: { appendChild: noop },
      body: { classList: { add: noop, remove: noop } },
      addEventListener: noop, documentElement: makeEl('html', ''), hidden: false
    },
    location: { search: '', hostname: 'gate' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    URLSearchParams, Intl, Date, Math, JSON, RegExp, String, Number, Object, Array, Error,
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    fetch: () => ({ then() { return this; }, catch() { return this; } }),
    matchMedia: () => ({ matches: false, addListener: noop, addEventListener: noop })
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  /* the cores resolve through TOOL_DIR first so a mutation run can poison
     THEM too; the tool's source is passed in so `--poison` can rewrite it
     without ever touching the working tree. */
  for (const f of ['alphabet-trace-core.js', 'number-trace-core.js', 'stroke-trace-core.js']) {
    const p = fs.existsSync(path.join(TOOL_DIR, f)) ? path.join(TOOL_DIR, f) : path.join(TOOLS_DIR, f);
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
  }
  vm.runInContext(src, sandbox, { filename: 'letter-studio.js' });
  return sandbox;
}

/* =====================================================================
   THE GATE'S OWN GEOMETRY — never the core's.
   ===================================================================== */
const D = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
function crFlatten(stroke, step) {
  step = step || 0.8;
  if (!stroke || stroke.length < 2) return (stroke || []).slice();
  const out = [];
  if (stroke.length === 2) {
    const n = Math.max(1, Math.ceil(D(stroke[0], stroke[1]) / step));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      out.push({ x: stroke[0].x + (stroke[1].x - stroke[0].x) * t, y: stroke[0].y + (stroke[1].y - stroke[0].y) * t });
    }
    return out;
  }
  out.push({ x: stroke[0].x, y: stroke[0].y });
  for (let k = 0; k < stroke.length - 1; k++) {
    const p0 = stroke[k - 1] || stroke[k], p1 = stroke[k];
    const p2 = stroke[k + 1], p3 = stroke[k + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    const n = Math.max(2, Math.ceil((D(p1, p2) * 1.2) / step));
    for (let i = 1; i <= n; i++) {
      const t = i / n, mt = 1 - t;
      out.push({
        x: mt * mt * mt * p1.x + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * p2.x,
        y: mt * mt * mt * p1.y + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * p2.y
      });
    }
  }
  return out;
}
const arcOf = (flat) => { const c = [0]; for (let i = 1; i < flat.length; i++) c.push(c[i - 1] + D(flat[i - 1], flat[i])); return c; };
const lenOf = (stroke) => { const c = arcOf(crFlatten(stroke)); return c[c.length - 1] || 0; };
/* ⭐ THE SYNTHETIC FINGER, and the two models I got wrong before this one.
   Both were INVENTED rather than derived, and each condemned a correct
   core — the §23.6 "an invented threshold is not a measurement" trap in
   its most expensive form, because the false verdict looked like a real
   shipping defect:

     1. per-sample WHITE NOISE of ±wob/2. Stochastic: a 40-seed sweep at
        4u had 45 of the 57 composed glyphs failing on SOME seed and
        passing on others. A pass/fail that depends on a seed is not a
        measurement of anything.
     2. a perpendicular offset sampled at THIS file's 0.8u flattening and
        ramped by ARC length. That reported 117 of 238 traces failing at
        3.5u and one ('s') failing at 1u — i.e. that a child must trace to
        within 4 screen pixels. Untrue: re-run against the core's own path
        at a realistic sampling density and 's' completes at every offset
        up to 5u. The failures were entirely an artefact of the sparse,
        re-flattened sample stream.

   What is left is derived and measured: a finger delivers samples far
   denser than the 1.2u the core flattens at (60Hz over any real stroke),
   so it walks the CORE's own path, sub-sampled x3, displaced
   perpendicular by `amp` with a ramp to zero at both ends — a child who
   starts on the green dot, drifts off-centre, and finishes on the end.
   Measured across all 238 glyph traces, both sides: every one completes
   up to 5u off centre, and none completes at 12u. */
function walkPath(STC, stroke, amp, side, sub) {
  const f = STC.flatten(stroke), n = f.length, out = [];
  for (let i = 0; i < n - 1; i++) for (let k = 0; k < (sub || 3); k++) {
    const t = k / (sub || 3);
    const p = { x: f[i].x + (f[i + 1].x - f[i].x) * t, y: f[i].y + (f[i + 1].y - f[i].y) * t };
    const q = f[Math.min(i + 1, n - 1)], r = f[Math.max(i - 1, 0)];
    const dx = q.x - r.x, dy = q.y - r.y, m = Math.hypot(dx, dy) || 1;
    const u = (i + t) / (n - 1);
    const off = amp * (side || 1) * Math.min(1, Math.min(u, 1 - u) * 6);
    out.push({ x: p.x - (dy / m) * off, y: p.y + (dx / m) * off });
  }
  out.push({ x: f[n - 1].x, y: f[n - 1].y });
  return { pts: out, path: f };
}
/* ⚠ AND VERIFY THE PREMISE, the detourSolver lesson. On a stroke that
   curves back under itself a perpendicular offset can land ON a later
   part of the same stroke, at which point the sample is not "off the
   path" at all and the trace proves nothing. */
function offPathBy(path, pts, amp) {
  for (const p of pts) {
    let mind = Infinity;
    for (const q of path) mind = Math.min(mind, D(q, p));
    if (mind > amp + 0.6) return false;
  }
  return true;
}

/* =====================================================================
   RUN
   ===================================================================== */
function run(poisoned) {
  ERRORS = 0; CHECKS = 0;

  let SRC = fs.readFileSync(path.join(TOOL_DIR, 'letter-studio.js'), 'utf8');
  if (poisoned !== false) SRC = poisonSource(SRC, poisoned);
  const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  const box = loadTool(SRC);
  const T = box.LetterStudio;
  const CORE = box.AlphabetTraceCore;
  const NUM = box.NumberTraceCore;
  const STC = box.StrokeTraceCore;
  if (!T) { err('could not load LetterStudio'); return; }
  if (!CORE || !NUM || !STC) { err('a trace core failed to load'); return; }

  /* ---------------------------------------------------------------- */
  head('A  identity + the entitlement constants');
  check('id is letter-studio', T.id === 'letter-studio');
  check('STORE_KEY is lcs:letter-studio:v1', T.STORE_KEY === 'lcs:letter-studio:v1');
  check('MC_KEY is lcs:my-classes:v1 (Name Sticks owns it)', T.MC_KEY === 'lcs:my-classes:v1');
  check('ENT_TRUST_DAYS is 14', T.ENT_TRUST_DAYS === 14);
  check('premium defaults to false', T.premium === false);

  /* ---------------------------------------------------------------- */
  head('B  installGlyphs ADDS and never mutates the 52');
  const ASCII = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const before = {};
  for (const c of ASCII) before[c] = JSON.stringify(CORE.GLYPHS[c]);
  const added = T.installGlyphs(CORE);
  check(`installGlyphs registered ${added} composed grapheme(s)`, added >= 50);
  check('not one of the 52 shipped glyphs was mutated',
    ASCII.every(c => JSON.stringify(CORE.GLYPHS[c]) === before[c]));
  check('number-trace-core carries all ten digits', Object.keys(NUM.GLYPHS).length === 10);
  const ADDED = Object.keys(T.COMPOSE).concat(Object.keys(T.NOVEL));
  check(`${ADDED.length} added graphemes under test`, ADDED.length >= 50);

  /* every point on the sheet must be INSIDE the sheet. The viewBox is
     "0 2 100 98" (letter-studio.js `_buildSheet`), so the drawable box is
     x 0..100, y 2..100 — measured base table is x 18..80, y 14..96 and
     the highest mark reaches exactly MARK_CEIL 4.5. */
  {
    const bad = [];
    for (const ch of ADDED.concat(ASCII).concat(Object.keys(NUM.GLYPHS))) {
      const g = CORE.GLYPHS[ch] || NUM.GLYPHS[ch];
      if (!g) { bad.push(ch + ' missing'); continue; }
      for (let i = 0; i < g.length; i++) {
        if (!g[i] || g[i].length < 2) { bad.push(`${ch}#${i} has fewer than 2 points`); continue; }
        if (lenOf(g[i]) < 1) bad.push(`${ch}#${i} is zero-length`);
        for (const p of g[i]) {
          if (!isFinite(p.x) || !isFinite(p.y)) { bad.push(`${ch}#${i} non-finite`); break; }
          if (p.x < 0 || p.x > 100 || p.y < 2 || p.y > 100) bad.push(`${ch}#${i} (${p.x},${p.y}) outside the viewBox`);
        }
      }
    }
    check(`every stroke of every drawable glyph is inside the sheet's own viewBox 0 2 100 98${bad.length ? ' — ' + bad.slice(0, 4).join(' | ') : ''}`, bad.length === 0);
  }

  /* ---------------------------------------------------------------- */
  head('C  the eleven letter trays');
  for (const loc of LOCALES) {
    /* ⚠ TOOL_DIR, not TOOLS_DIR. Reading the real tree here made every
       tray assertion unpoisonable from a tmp copy. */
    const f = path.join(TOOL_DIR, `letter-tiles-${loc}.json`);
    if (!fs.existsSync(f)) {
      /* ⚠ AN ERROR, NOT A WARNING. A locale with no tray falls back to
         bare a-z in `bands()`, so the Finnish child gets the English
         alphabet and nothing anywhere says so. */
      check(`${loc}: the letter tray exists`, false);
      continue;
    }
    let tray;
    try { tray = (JSON.parse(fs.readFileSync(f, 'utf8')).tray) || []; }
    catch (e) { check(`${loc}: the tray parses`, false); continue; }
    let single = 0, digraph = 0; const bad = [];
    for (const t of tray) {
      const g = t.g;
      if (!g) continue;
      if ([...g].length === 1) {
        single++;
        if (!CORE.GLYPHS[g]) bad.push(`"${g}" (U+${g.codePointAt(0).toString(16).toUpperCase()}) has no glyph`);
        const up = T.upperOf(g);
        if (up !== g && !CORE.GLYPHS[up]) bad.push(`the capital of "${g}" has no glyph`);
      } else {
        digraph++;
        for (const ch of T.sequenceOf(g)) if (!CORE.GLYPHS[ch]) bad.push(`digraph "${g}" contains undrawable "${ch}"`);
      }
    }
    check(`${loc}: ${single} letters + ${digraph} digraph(s), all drawable${bad.length ? ' — ' + bad.join(' | ') : ''}`, bad.length === 0 && single > 20);
  }

  /* ---------------------------------------------------------------- */
  head('D  composition — the body first, the mark where its NAME says');
  /* Marks that live ABOVE the letter, marks that live BELOW it, and the
     one that goes THROUGH it. Stated here in absolute terms rather than
     recomputed from the tool's own MARKS table: a gate that reimplements
     the thing it checks is testing a copy (§23.6, #44). */
  const ABOVE = ['grave', 'acute', 'circumflex', 'diaeresis', 'tilde', 'ring'];
  const BELOW = ['cedilla'];
  const THROUGH = ['stroke'];
  const MARK_STROKES = { diaeresis: 2 };     /* every other mark is one stroke */
  {
    let lastFires = 0, aboveFires = 0, belowFires = 0, throughFires = 0, dotDrops = 0;
    for (const ch of Object.keys(T.COMPOSE)) {
      const [base, mark] = T.COMPOSE[ch];
      const g = CORE.GLYPHS[ch], b = CORE.GLYPHS[base];
      if (!g || !b) { err(`D "${ch}" or its base "${base}" is missing`); CHECKS++; continue; }

      /* i and j lose their DOT under a mark: í is a stem plus an acute,
         never a stem plus a dot plus an acute. The dot is the LAST stroke
         of the base, so the body is base.length - 1. */
      const drops = !!T.DOTTED[base];
      const bodyLen = drops ? b.length - 1 : b.length;
      if (drops) {
        dotDrops++;
        /* the tell: the composed glyph must NOT contain the base's dot */
        const dot = JSON.stringify(b[b.length - 1]);
        const kept = g.some(s => JSON.stringify(s) === dot);
        check(`"${ch}" drops the dot of "${base}"`, !kept);
      }

      /* the body strokes are the base's, unchanged, and FIRST */
      let bodyOk = g.length > bodyLen;
      for (let i = 0; i < bodyLen && bodyOk; i++) bodyOk = JSON.stringify(g[i]) === JSON.stringify(b[i]);
      check(`"${ch}" carries "${base}" unchanged as its first ${bodyLen} stroke(s)`, bodyOk);
      if (!bodyOk) continue;

      /* ⭐ AND THE MARK IS WHAT FOLLOWS. The previous version compared
         `JSON.stringify(g[bodyLen])` against `JSON.stringify(b[bodyLen] || null)`
         — `JSON.stringify(undefined)` is `undefined`, never the string
         "null", so on the 54 composed glyphs it could not fire. What is
         actually true and checkable: the tail is exactly the mark, it is
         the right NUMBER of strokes, and it lies where the mark's own
         name says it lies relative to the body's bounding box. */
      const tail = g.slice(bodyLen);
      const want = MARK_STROKES[mark] || 1;
      check(`"${ch}" appends exactly ${want} mark stroke(s) after the body`, tail.length === want);
      lastFires++;

      const bb = T.bboxOf(b.slice(0, bodyLen));
      const pts = [].concat.apply([], tail);
      if (ABOVE.indexOf(mark) >= 0) {
        const lowest = Math.max.apply(null, pts.map(p => p.y));
        check(`"${ch}" — the ${mark} sits ABOVE the letter (lowest mark point ${lowest.toFixed(1)} < body top ${bb.top})`, lowest < bb.top);
        aboveFires++;
      } else if (BELOW.indexOf(mark) >= 0) {
        const highest = Math.min.apply(null, pts.map(p => p.y));
        check(`"${ch}" — the ${mark} hangs BELOW the baseline (highest mark point ${highest.toFixed(1)} >= ${bb.base - 2})`, highest >= bb.base - 2);
        belowFires++;
      } else if (THROUGH.indexOf(mark) >= 0) {
        const top = Math.min.apply(null, pts.map(p => p.y));
        const bot = Math.max.apply(null, pts.map(p => p.y));
        check(`"${ch}" — the stroke crosses the bowl (spans ${top.toFixed(1)}..${bot.toFixed(1)} across ${bb.top}..${bb.base})`,
          top <= bb.top + 2 && bot >= bb.base - 4);
        throughFires++;
      } else {
        check(`"${ch}" uses a mark this gate knows about ("${mark}")`, false);
      }
    }
    /* ⚠ NON-VACUITY. Each family must actually have been exercised, or a
       silently-emptied COMPOSE table would pass this whole section. */
    check(`the mark-is-last check ran on ${lastFires} glyphs`, lastFires >= 50);
    check(`the above/below/through split ran (${aboveFires}/${belowFires}/${throughFires})`, aboveFires >= 40 && belowFires >= 2 && throughFires >= 2);
    /* ⚠ EXACTLY FOUR, and stated as an equality with its reason rather
       than as a floor I liked the look of. `DOTTED` is {i, j}; the eleven
       trays between them carry ì í î ï and no accented j at all, and
       capital I has no dot to drop — so four is the whole population. A
       floor of six (my first version) fails CORRECT work. */
    check(`the dot-drop check ran on exactly 4 i/j composites — ì í î ï, no accented j, and capital I has no dot (got ${dotDrops})`, dotDrops === 4);
  }

  /* ---------------------------------------------------------------- */
  head('D2  the circumflex is a CORNER, not a breve');
  /* ⚠ THE MUTATION HARNESS FOUND THIS HOLE. Deleting the doubled apex
     from the circumflex SURVIVED every assertion in §D: the mark is still
     one stroke, still above the letter, still appended after an unchanged
     body. Only the SHAPE changes — and it changes into a different letter,
     because with a single apex point the Catmull-Rom's control vectors
     there are horizontal and â renders as ă.
     ⚠ AND NOT BY A TURN-ANGLE THRESHOLD. Measured, the worst correct
     circumflex turns 33.4° and the worst breve 29.7° — a 3.7° gap, and
     the tilde sits at 31.3° right between them. A cutoff there would be
     tuned to its own data and would condemn a correct mark the moment
     anyone re-shapes one. The structural fact is exact and needs no
     number: a corner is where the topmost point is attained TWICE. */
  {
    let tested = 0, blunt = [];
    for (const ch of Object.keys(T.COMPOSE)) {
      if (T.COMPOSE[ch][1] !== 'circumflex') continue;
      tested++;
      const g = CORE.GLYPHS[ch], mark = g[g.length - 1];
      const top = Math.min.apply(null, mark.map(p => p.y));
      const atTop = mark.filter(p => Math.abs(p.y - top) < 0.6).length;
      if (atTop < 2) blunt.push(ch + ' (' + atTop + ' apex point)');
    }
    check(`every circumflex pins its apex with two points, so it draws a corner and not a breve${blunt.length ? ' — ' + blunt.join(', ') : ''}`, blunt.length === 0);
    check(`the circumflex check ran on ${tested} composites`, tested >= 8);
    /* the other marks are single-apex by construction, so the rule above
       is deliberately scoped to circumflex and is NOT a general shape ban */
    let single = 0;
    for (const ch of Object.keys(T.COMPOSE)) {
      const m = T.COMPOSE[ch][1];
      if (m === 'circumflex' || m === 'diaeresis') continue;
      const g = CORE.GLYPHS[ch], mark = g[g.length - 1];
      const top = Math.min.apply(null, mark.map(p => p.y));
      if (mark.filter(p => Math.abs(p.y - top) < 0.6).length === 1) single++;
    }
    /* ⚠ NOT `single >= 30`, which is what I wrote first and which failed a
       CORRECT tool at 28 — a number I liked the look of rather than one I
       had measured. What this check is for is proving the apex rule above
       is genuinely SCOPED to the circumflex and is not a shape ban that
       would condemn every other mark; any non-zero count shows that, and
       the exact figure is reported rather than asserted so a re-shaped
       mark does not fail a gate it has nothing to do with. */
    check(`and it is scoped: ${single} non-circumflex marks legitimately have a single apex`, single > 0);
  }

  /* ---------------------------------------------------------------- */
  head('E  the diaeresis is TWO strokes, under the judge that ships');
  {
    let tested = 0;
    for (const ch of Object.keys(T.COMPOSE)) {
      if (T.COMPOSE[ch][1] !== 'diaeresis') continue;
      const g = CORE.GLYPHS[ch];
      const a = g[g.length - 2], b2 = g[g.length - 1];
      tested++;
      /* ⚠ MEASURED WITH THE ACTUAL JUDGE. The old check drove
         AlphabetTraceCore.traceScore, which no longer judges anything in
         this tool. The defect it exists to prevent is one tap BETWEEN the
         dots satisfying both at once — at which point the umlaut is not
         two strokes for a child either. */
      const mid = { x: (a[0].x + b2[0].x) / 2, y: (a[0].y + b2[0].y) / 2 };
      const s = STC.newTrace([a, b2]);
      STC.sample(s, mid);
      const v1 = STC.endStroke(s);
      const s2 = STC.newTrace([a, b2]);
      STC.sample(s2, { x: a[0].x, y: a[0].y });
      STC.endStroke(s2);
      const secondFromFirst = STC.sample(s2, { x: a[0].x, y: a[0].y }).done;
      check(`"${ch}": a tap between the dots completes NEITHER`, v1 === 'incomplete');
      check(`"${ch}": tapping the first dot does not also complete the second`, !secondFromFirst);
    }
    check(`the separability check ran on ${tested} diaeresis composites`, tested >= 6);
  }

  /* ---------------------------------------------------------------- */
  head('F  a child can actually trace every added glyph');
  {
    /* the gate's own oracle: walk the stroke in order and require the
       tool's own judge to accept it. Dots are TAPPED, which is what a
       child does with the tittle of an i and what the core documents. */
    const trace = (g, amp, side) => {
      const s = STC.newTrace(g);
      for (let k = 0; k < g.length; k++) {
        let pts;
        if (lenOf(g[k]) <= 6) pts = [g[k][0]];
        else {
          const w = walkPath(STC, g[k], amp, side, 3);
          if (amp > 0 && !offPathBy(w.path, w.pts, amp)) return 'skip';
          pts = w.pts;
        }
        for (const p of pts) STC.sample(s, p);
        if (STC.endStroke(s) === 'incomplete') return false;
      }
      return STC.isComplete(s);
    };

    /* F1 — dead on the line. Absolute, exhaustive, no model at all. */
    {
      const miss = ADDED.filter(ch => trace(CORE.GLYPHS[ch], 0, 1) !== true);
      check(`a trace exactly on the path forms ${ADDED.length - miss.length}/${ADDED.length} added glyphs${miss.length ? ' — missed ' + miss.slice(0, 6).join(' ') : ''}`, miss.length === 0);
    }

    /* F2 — inside the ROAD. The bound is read off the shipped CSS, not
       invented: `.ls-road{…stroke-width:7}` in letter-studio.js, so its
       half-width is 3.5 and a child who can SEE the road and stays on it
       is at most 3.5 off centre. Measured headroom: everything still
       completes at 5. */
    {
      const roadW = parseFloat((/\.ls-road\{[^}]*stroke-width:([\d.]+)/.exec(SRC) || [])[1]);
      check(`the road's width is readable from the shipped CSS (${roadW}u)`, roadW > 0);
      const half = roadW / 2;
      let tested = 0, skipped = 0; const miss = [];
      for (const ch of ADDED.concat(Object.keys(NUM.GLYPHS))) {
        const g = CORE.GLYPHS[ch] || NUM.GLYPHS[ch];
        for (const side of [1, -1]) {
          const r = trace(g, half, side);
          if (r === 'skip') { skipped++; continue; }
          tested++;
          if (r !== true) miss.push(ch + (side > 0 ? '+' : '-'));
        }
      }
      check(`a finger ${half}u off centre — still inside the drawn road — completes ${tested - miss.length}/${tested} traces (${skipped} skipped: the offset folded onto the stroke itself)${miss.length ? ' — missed ' + miss.slice(0, 8).join(' ') : ''}`, miss.length === 0);
      check(`the off-centre test ran on a meaningful set (${tested} traces)`, tested >= 100);
    }

    /* F3 — THE OTHER DIRECTION, so F2 is not vacuous. Well outside the
       corridor the core declares, nothing may form. */
    {
      const far = STC.CORRIDOR * 1.5;
      let formed = 0, tested = 0;
      for (const ch of ADDED) {
        const g = CORE.GLYPHS[ch];
        if (g.every(s => lenOf(s) <= 6)) continue;
        tested++;
        if (trace(g, far, 1) === true) formed++;
      }
      check(`a finger ${far}u off centre — outside the ${STC.CORRIDOR}u corridor — forms 0 of ${tested} (got ${formed})`, formed === 0 && tested >= 50);
    }

    /* F4 — stopping short, PER STROKE, against that stroke's OWN slack.
       ⚠ ONE FRESH TRACE PER STROKE. My first version walked all of a
       glyph's strokes into a single trace and reported 11 of 57 glyphs
       "completing despite stopping short" — a wrong measurement, and the
       cause is a deliberate core behaviour: an incomplete stroke KEEPS its
       cursor so a child who lifts to re-grip resumes where they were. The
       next stroke's samples were therefore still being fed to the previous
       stroke, which eventually finished it. Per-stroke: 0 of 145. */
    {
      let formed = 0, tested = 0; const who = [];
      for (const ch of ADDED) {
        const g = CORE.GLYPHS[ch];
        for (let k = 0; k < g.length; k++) {
          const cum = STC.measure(STC.flatten(g[k])), total = cum[cum.length - 1];
          if (total <= 6) continue;                       /* a dot is tapped */
          const stop = total - (STC.endSlack(total) + 2); /* one pen-width past the slack */
          if (stop <= 0) continue;
          tested++;
          const s = STC.newTrace([g[k]]);
          const pts = walkPath(STC, g[k], 0, 1, 3).pts;
          let acc = 0;
          for (let i = 0; i < pts.length; i++) {
            if (i) acc += D(pts[i - 1], pts[i]);
            if (acc > stop) break;
            STC.sample(s, pts[i]);
          }
          if (STC.endStroke(s) !== 'incomplete') { formed++; if (who.length < 6) who.push(ch + '#' + k); }
        }
      }
      check(`stopping one pen-width past the end-slack completes 0 of ${tested} added strokes (got ${formed})${who.length ? ' — ' + who.join(' ') : ''}`, formed === 0 && tested >= 100);
    }

    /* F5 — the cheats, on the added glyphs, with this file's ground truth */
    let scribbled = 0, ooo = 0, oooN = 0, tapped = 0;
    for (const ch of ADDED) {
      const g = CORE.GLYPHS[ch];
      const s = STC.newTrace(g);
      for (const p of [{ x: 2, y: 4 }, { x: 8, y: 12 }, { x: 3, y: 16 }, { x: 9, y: 6 }]) STC.sample(s, p);
      if (STC.endStroke(s) !== 'formed') scribbled++;
      if (lenOf(g[0]) > 6) {
        const f = crFlatten(g[0]);
        const s2 = STC.newTrace(g);
        STC.sample(s2, f[Math.floor(f.length / 2)]);
        if (STC.endStroke(s2) !== 'formed') tapped++; else err(`F one tap formed "${ch}"`);
      }
      if (g.length >= 2 && lenOf(g[1]) > 6) {
        oooN++;
        const s3 = STC.newTrace(g);
        for (const p of walkPath(STC, g[1], 0, 1, 3).pts) STC.sample(s3, p);
        if (STC.endStroke(s3) === 'incomplete') ooo++;
      }
    }
    check(`a scribble is refused on all ${ADDED.length} added glyphs`, scribbled === ADDED.length);
    check(`the second stroke drawn first is refused on all ${oooN} multi-stroke added glyphs`, ooo === oooN && oooN >= 20);
    check(`a single tap forms none of the ${tapped} traceable first strokes`, tapped >= 40);
  }

  /* ---------------------------------------------------------------- */
  head('G  ⭐ THE DIGITS RESOLVE THROUGH NumberTraceCore, NEVER THROUGH THE ALPHABET');
  /* This is the shipped defect, and it is the reason stroke-trace-core
     exists. The renderer took digits from NumberTraceCore; the judge asked
     AlphabetTraceCore for the same key, did not have it, and silently fell
     back to lowercase "l". All ten digits were scored against a vertical
     line. Assert the routing directly, and assert that the array handed to
     the JUDGE is the array the RENDERER draws. */
  {
    T.core = CORE; T.numCore = NUM; T.tracer = STC;
    T.api = { lang: 'en', settings: { wide: false } };

    for (const d of '0123456789') {
      const g = T._glyph(d);
      check(`_glyph("${d}") returns a glyph`, !!g && g.length >= 1);
      if (!g) continue;
      check(`_glyph("${d}") is number-trace-core's own strokes`,
        JSON.stringify(g) === JSON.stringify(NUM.glyphFor(d, 'en')));
      check(`_glyph("${d}") is NOT the alphabet core's lowercase "l" fallback`,
        JSON.stringify(g) !== JSON.stringify(CORE.GLYPHS['l']));
    }
    /* ⚠ AND IT MUST STILL BE TRUE WHEN THE ALPHABET CORE HAS THE KEY.
       Poison the lookup that used to win: if the tool ever reads the
       alphabet table for a digit again, this fires. */
    const saved = CORE.GLYPHS['5'];
    CORE.GLYPHS['5'] = [[{ x: 1, y: 3 }, { x: 2, y: 4 }]];
    check('a "5" planted in the ALPHABET table does not change what the tool draws',
      JSON.stringify(T._glyph('5')) === JSON.stringify(NUM.glyphFor('5', 'en')));
    if (saved === undefined) delete CORE.GLYPHS['5']; else CORE.GLYPHS['5'] = saved;

    /* the crossbar seven proves the LOCALE reaches the number core too */
    T.api.lang = 'en';
    const seven_en = T._glyph('7').length;
    T.api.lang = 'de';
    const seven_de = T._glyph('7').length;
    check(`the crossbar seven follows the content locale (en ${seven_en} stroke, de ${seven_de} strokes)`,
      seven_en === 1 && seven_de === 2);
    T.api.lang = 'en';

    /* ⭐ ONE GLYPH, TWO CONSUMERS. `_reset` hands the tracer a glyph and
       the renderer asks for its own; they must be the same shape or the
       child is judged against something they cannot see. Record what the
       tracer was actually handed. */
    const handed = [];
    const spy = Object.assign({}, STC, { newTrace(g, o) { handed.push(g); return STC.newTrace(g, o); } });
    T.tracer = spy;
    T.tray = null; T.seq = null; T.upper = false;
    const keys = T.keys();
    let mismatched = 0;
    for (let i = 0; i < keys.length; i++) {
      T.index = i;
      handed.length = 0;
      T._reset();
      const drawn = T._glyph(keys[i].g);
      if (!handed.length) { mismatched++; continue; }
      if (JSON.stringify(handed[0]) !== JSON.stringify(drawn)) mismatched++;
    }
    check(`the judge and the renderer are handed the same strokes for all ${keys.length} pickable glyphs`, mismatched === 0 && keys.length >= 36);
    T.tracer = STC;
  }

  /* ---------------------------------------------------------------- */
  head('G2  the corridor the child actually gets');
  /* ⚠ TWO MORE HOLES THE MUTATION HARNESS FOUND. Dropping the corridor
     option from newTrace, and never relaxing after repeated stalls, both
     SURVIVED every gate: §G proved the judge and the renderer share a
     glyph, and nothing anywhere proved the ACCESSIBILITY setting reaches
     the judge or that the no-shame escalation happens. Both are settings
     a teacher turns on for a child who needs them. */
  {
    T.core = CORE; T.numCore = NUM; T.tracer = STC;
    T.api = { lang: 'en', settings: { wide: false, voice: false, arrows: true }, announce() {}, sound() {}, t: (k) => k, el: (t, c) => makeEl(t, c), stage: makeEl('div', '') };
    T.tray = null; T.seq = null; T.upper = false; T.index = 0; T._store = { v: 1 }; T._timers = [];

    T.api.settings.wide = false; T._reset();
    check(`the default corridor reaches the judge (${T.trace && T.trace.corridor} = CORRIDOR ${STC.CORRIDOR})`, !!T.trace && T.trace.corridor === STC.CORRIDOR);
    T.api.settings.wide = true; T._reset();
    check(`the "wider path for small hands" setting reaches the judge (${T.trace && T.trace.corridor} = WIDE ${STC.WIDE})`, !!T.trace && T.trace.corridor === STC.WIDE);
    T.api.settings.wide = false; T._reset();

    /* the escalation: repeated stalls must widen the corridor, silently */
    const ch = T._current();
    const before = T.trace.corridor;
    for (let i = 0; i < 6; i++) { T.cur = []; T._endStroke(ch); }
    check(`repeated stalls widen the corridor rather than deliver a verdict (${before} -> ${T.trace.corridor})`,
      T.trace.corridor > before);
    check('and the escalation never narrows it', T.trace.corridor >= STC.CORRIDOR);
    T._reset();
  }

  /* ---------------------------------------------------------------- */
  head('G3  the per-locale writing guide, against an INDEPENDENT expectation');
  /* ⭐⭐ THE ORACLE MUST NOT READ THE TABLE IT IS CHECKING. The locale
     smoke asserts `drawn lines === rulingFor(loc).zones.length`, and both
     sides of that read RULING — so deleting a zone from the German
     ruling moves both together and it stays green. Measured: that poison
     SURVIVED the whole suite.
     These numbers are facts about each country's school paper, not a copy
     of our code: German Lineatur 1 is four lines with a coloured
     mid-band, Spanish doble raya is three, Dutch blokschrift draws two
     solid and two dashed. A native panel re-ruling a locale SHOULD have
     to change this line as well — that is the review, not an obstacle. */
  {
    const EXPECTED = {
      de: { zones: 4, solid: 4, band: true },   fr: { zones: 4, solid: 4, band: false },
      it: { zones: 4, solid: 4, band: false },  es: { zones: 3, solid: 3, band: false },
      pt: { zones: 3, solid: 3, band: true },   nl: { zones: 4, solid: 2, band: false },
      sv: { zones: 4, solid: 4, band: false },  da: { zones: 4, solid: 4, band: false },
      no: { zones: 4, solid: 1, band: false },  fi: { zones: 4, solid: 4, band: true },
      en: { zones: 4, solid: 1, band: false }
    };
    for (const loc of LOCALES) {
      const want = EXPECTED[loc];
      if (!want) { check(`${loc} has an independent ruling expectation`, false); continue; }
      const got = T.rulingFor(loc);
      const solid = got.zones.filter(z => z.kind === 'solid').length;
      check(`${loc}: ${got.system} draws ${want.zones} lines (${want.solid} solid)${want.band ? ' + a tint band' : ''}`,
        got.zones.length === want.zones && solid === want.solid && !!got.band === want.band);
      /* every zone must sit inside the sheet's own viewBox */
      check(`${loc}: every ruled line is inside the sheet (0 2 100 98)`, got.zones.every(z => z.y >= 2 && z.y <= 100));
    }
    check('the eleven locales do not all share one ruling',
      new Set(LOCALES.map(l => T.rulingFor(l).system)).size >= 8);
  }

  /* ---------------------------------------------------------------- */
  head('H  ß has no single-character capital');
  check(`upperOf('ß') is 'ß', not 'SS' (got ${JSON.stringify(T.upperOf('ß'))})`, T.upperOf('ß') === 'ß');
  check("hasCapital('ß') is false", T.hasCapital('ß') === false);
  check("upperOf('a') is 'A'", T.upperOf('a') === 'A');
  check("hasCapital('a') is true", T.hasCapital('a') === true);
  {
    /* and the picker must therefore still SHOW it when the case is flipped
       — vanishing a key the tray declares is worse than showing it */
    T.tray = [{ g: 'a', kind: 'vowel' }, { g: 'ß', kind: 'consonant' }];
    T.upper = true;
    const shown = T.bands()[0].concat(T.bands()[1]).map(k => k.g);
    check(`with capitals on, ß survives the tray (${shown.join('')})`, shown.indexOf('ß') >= 0);
    T.upper = false; T.tray = null;
  }

  /* ---------------------------------------------------------------- */
  head('I  the structural premium gate');
  check('modesFor(false) offers no names mode', T.modesFor(false).indexOf('names') < 0);
  check('modesFor(true) offers names mode', T.modesFor(true).indexOf('names') >= 0);
  {
    const mc = { activeClassId: 'c1', classes: [{ id: 'c1', students: [{ id: 's1', name: 'Zzyzx' }] }] };
    check('rosterFor returns NOTHING to a free visitor', T.rosterFor(mc, 'c1', false).length === 0);
    const copy = T.rosterFor(mc, 'c1', true);
    check('rosterFor returns the roster to a subscriber', copy.length === 1);
    copy.push({ id: 'x', name: 'x' });
    check('rosterFor returned a COPY, not the live array', mc.classes[0].students.length === 1);
    check('?mode=names is refused for a free visitor', T.resolveDeepLink({ mode: 'names' }, false) === null);
    check('?mode=names is honoured for a subscriber', !!T.resolveDeepLink({ mode: 'names' }, true));
    check('an unknown ?mode is refused', T.resolveDeepLink({ mode: 'wat' }, true) === null);
  }

  /* ---------------------------------------------------------------- */
  head('J  my-classes is READ, never written');
  check('the tool reads my-classes', /getItem\(\s*this\.MC_KEY\s*\)/.test(SRC_NC));
  {
    const writes = SRC_NC.match(/localStorage\.setItem\(([^,]+),/g) || [];
    check('the tool writes its own store', writes.length > 0);
    check('every setItem targets STORE_KEY and nothing else', writes.every(w => /STORE_KEY/.test(w)));
    check('my-classes is never written', !/setItem\(\s*(this\.)?MC_KEY/.test(SRC_NC) && !/setItem\(\s*['"]lcs:my-classes/.test(SRC_NC));
  }

  /* ---------------------------------------------------------------- */
  head('K  no exfiltration — a child’s name never leaves the device');
  {
    const fetches = SRC_NC.match(/\bfetch\s*\(/g) || [];
    check(`exactly two fetches (entitlement + the letter tray), found ${fetches.length}`, fetches.length === 2);
    check('the entitlement check is /api/auth/me', /fetch\('\/api\/auth\/me'/.test(SRC_NC));
    check('the letter tray fetch is present', /fetch\('\/mini-tools\/letter-tiles-/.test(SRC_NC));
    check('no fetch carries a body', !/fetch\([^)]*body\s*:/.test(SRC_NC));
    check('no exfiltration API appears in the source',
      !/XMLHttpRequest|sendBeacon|WebSocket|RTCPeerConnection|MediaRecorder|navigator\.clipboard/.test(SRC_NC));
    check('the tool never calls api.track', !/\.track\(/.test(SRC_NC));
  }

  /* ---------------------------------------------------------------- */
  head('L  the strings — parity, tone, and REACHABILITY in both directions');
  const S = T.strings || {};
  const enKeys = Object.keys(S).filter(k => S[k] && typeof S[k].en === 'string');
  {
    const VERDICT = {
      en: /\b(wrong|incorrect|bad|fail|no, )\b/i, de: /\b(falsch|fehler|leider)\b/i,
      fr: /\b(faux|fausse|erreur|raté)\b/i, it: /\b(sbagliato|errore)\b/i,
      es: /\b(incorrecto|mal hecho|error)\b/i, pt: /\b(errado|erro)\b/i,
      nl: /\b(fout|foutje|verkeerd)\b/i, sv: /\b(fel|felaktig)\b/i,
      da: /\b(forkert|fejl)\b/i, no: /\b(feil)\b/i, fi: /(?<!\p{L})(väärin|virhe)(?!\p{L})/iu
    };
    /* ⚠ `\b` IS ASCII-ONLY (§23.6, #44). A ban written `\bväärin\b` can
       never match, because there is no word boundary between a space and
       `v`… there is, but `\bpoäng\b` fails at the RIGHT edge, where `g` is
       ASCII and fine, and `\bpisteet\b` is fine — the trap is any ban whose
       EDGE character is non-ASCII. Finnish is the one that bites here, so
       it uses an explicit non-letter lookaround. */
    /* ⚠ THE PLURALS ARE LISTED, NOT WILDCARDED. The mutation harness fed
       "Verzamel punten en badges met Premium" into the Dutch gate line and
       it SURVIVED: the ban carried `badge`, the trailing lookaround
       correctly refused the partial word, and `badges` walked through. That
       is the recorded `\baste\w*` shape — a ban that misses the form a
       native actually writes. The fix is the explicit case endings, never
       a `\w*` tail, because widening `puntu\w*` would then condemn
       perfectly ordinary Spanish. */
    const SCORE_RE = /(?<!\p{L})(score|scores|streak|streaks|poäng|poeng|punkte|punkten|punteggio|punteggi|puntuación|puntuaciones|pontuação|pontuações|pisteet|pisteitä|badge|badges|reward|rewards|countdown|countdowns)(?!\p{L})/iu;
    const ph = (s) => (s.match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
    let parity = 0;
    for (const key of enKeys) {
      for (const loc of LOCALES) {
        const v = S[key][loc];
        if (typeof v !== 'string' || !v.trim()) { err(`L ${key}.${loc} is missing`); CHECKS++; continue; }
        parity++;
        if (ph(v) !== ph(S[key].en)) err(`L ${key}.${loc} placeholder parity: "${ph(S[key].en)}" vs "${ph(v)}"`);
        if (/'/.test(v)) err(`L ${key}.${loc} uses a straight apostrophe — typographic ’ only`);
        if (VERDICT[loc] && VERDICT[loc].test(v)) err(`L ${key}.${loc} carries a verdict: "${v}"`);
        if (SCORE_RE.test(v)) err(`L ${key}.${loc} scores or times a child: "${v}"`);
      }
    }
    CHECKS++;
    check(`${enKeys.length} strings × ${LOCALES.length} locales present, with placeholder parity, typographic apostrophes, no verdict and no score (${parity} cells)`,
      parity === enKeys.length * LOCALES.length);
  }

  /* ---- speech: the allowed types are READ OFF THE SHELL, minus one ---- */
  {
    const shell = fs.readFileSync(path.join(TOOLS_DIR, 'lcs-shell.js'), 'utf8');
    const m = /var TYPES = \{([^}]*)\}/.exec(shell);
    const shellTypes = m ? (m[1].match(/(\w+)\s*:/g) || []).map(s => s.replace(/\s*:$/, '')) : [];
    check(`lcs-shell declares ${shellTypes.length} speech types (${shellTypes.join('|')}) — refuse below 3`, shellTypes.length >= 3);
    /* `syllable` is legal in the shell and BANNED here: an isolated
       phoneme played to a child is the Heart Words lesson, and this tool
       speaks whole letters, digits and words only. */
    const allowed = shellTypes.filter(t => t !== 'syllable');
    const speaks = SRC_NC.match(/LCSAudio\.speak\(\{[^}]*\}/g) || [];
    /* ⚠ ONE call site is correct, and >= 2 was a count proxy written while
       a dead `_say` helper still existed. The tool speaks the LETTER when
       the child completes it (`_sayGlyph`, reached from both `_endStroke`
       and the firefly); the praise goes to the live region instead,
       because speaking both is chatter and six of eleven locales have no
       voice at all. What actually needs guarding is not how MANY calls
       there are but that every one of them carries `lang` and a legal
       non-syllable type — which the loop below does. */
    check(`the tool speaks (${speaks.length} call site(s))`, speaks.length >= 1);
    let bad = 0;
    for (const s of speaks) {
      if (!/lang:/.test(s)) { err(`L a speak call omits lang: ${s.slice(0, 60)}`); bad++; }
      const types = (s.match(/'(\w+)'/g) || []).map(x => x.slice(1, -1))
        .filter(x => shellTypes.indexOf(x) >= 0);
      const used = /type:\s*this\.isDigit/.test(s) ? types : [(/type:\s*'(\w+)'/.exec(s) || [])[1]];
      for (const t of used) {
        if (!t) { err(`L a speak call has no resolvable type: ${s.slice(0, 60)}`); bad++; }
        else if (allowed.indexOf(t) < 0) { err(`L speak type "${t}" is not allowed here: ${s.slice(0, 60)}`); bad++; }
      }
    }
    CHECKS++;
    check('every speak call carries a lang and an allowed type', bad === 0);
  }

  /* ---- ⭐ REACHABILITY: drive the real builders with a recording t() ---- */
  {
    /* ⚠ A REGEX OVER THE SOURCE CANNOT DO THIS. `#39 hintMark` was
       authored in eleven locales and never referenced; the first fix was a
       source scan, and mutation showed a live `t('key')` call sitting in a
       branch nothing can enter defeats it. So: build the tool's real DOM
       over a matrix of real states and require every authored key to be
       ASKED FOR. */
    const asked = new Set();
    const stage = makeEl('div', 'lcs-stage');
    const api = {
      lang: 'en',
      settings: { voice: true, arrows: true, wide: false },
      stage: stage,
      t: (k) => { asked.add(k); const e = S[k]; return (e && (e.en || e[api.lang])) || k; },
      announce: () => {},
      sound: () => {},
      el: (tag, cls) => makeEl(tag, cls)
    };
    T.api = api;
    T.core = CORE; T.numCore = NUM; T.tracer = STC;
    T._store = { v: 1 };
    T._timers = [];
    T._greeted = true;                 /* the mount demo needs a live svg */

    const reset = (over) => {
      Object.assign(T, {
        mode: 'letters', upper: false, tray: null, index: 0, seq: null, seqAt: 0,
        seqLabel: '', seqPartial: false, pickerOpen: false, wordOpen: false,
        drawn: [], cur: [], stalls: 0, premium: false, _mc: null, _classId: null, _wrap: null
      });
      Object.assign(T, over || {});
      T._reset();
    };

    const STATES = [
      ['a letter at rest', {}],
      ['the picker open', { pickerOpen: true }],
      ['capitals on', { upper: true }],
      ['a digit selected', { index: -1 }],          /* fixed below */
      ['the word panel open', { wordOpen: true }],
      ['a word being traced, with a letter we cannot draw', { seq: ['a', 'b'], seqAt: 0, seqLabel: 'abΩ', seqPartial: true }],
      ['premium, word panel, a class with children', { premium: true, wordOpen: true, _classId: 'c1', _mc: { activeClassId: 'c1', classes: [{ id: 'c1', students: [{ id: 's1', name: 'Ada' }] }] } }],
      ['premium, word panel, no class yet', { premium: true, wordOpen: true, _classId: null, _mc: { classes: [] } }],
      ['premium at rest — the print chip and the print sheet', { premium: true }]
    ];
    let rendered = 0;
    for (const [label, over] of STATES) {
      try {
        if (label === 'a digit selected') {
          reset({});
          const ks = T.keys();
          T.index = ks.findIndex(k => T.isDigit(k.g));
          T._reset();
        } else reset(over);
        T.render();
        rendered++;
      } catch (e) {
        err(`L the builders threw in state "${label}": ${String(e.message).slice(0, 90)}`);
      }
    }
    /* and the FORMED path, which is where the done announcement lives */
    try {
      reset({});
      const ch = T._current(), g = T._glyph(ch);
      for (let k = 0; k < g.length; k++) {
        const pts = lenOf(g[k]) <= 6 ? [g[k][0]] : walkPath(STC, g[k], 0, 1, 3).pts;
        for (const p of pts) STC.sample(T.trace, p);
        T._endStroke(ch);
      }
      check(`the synthetic trace reaches "formed" on "${ch}"`, !!(T.trace && T.trace.formed));
      rendered++;
    } catch (e) {
      err('L driving a trace to completion threw: ' + String(e.message).slice(0, 90));
      CHECKS++;
    }
    check(`the reachability matrix rendered ${rendered} real states — refuse below 9`, rendered >= 9);

    /* ⚠ THE EXEMPTIONS ARE A NAMED LIST WITH A CITATION EACH, never a
       loosened rule. Two keys are consumed by the SHELL and can never
       appear in a tool render; three are consumed by the shell's settings
       drawer, and rather than exempt those blindly the check below proves
       each is referenced as a `labelKey` in the tool's own schema. */
    const shell = fs.readFileSync(path.join(TOOLS_DIR, 'lcs-shell.js'), 'utf8');
    check("lcs-shell reads tool.strings 'title'", /i18n\.t\(tool\.strings,\s*'title'\)/.test(shell));
    check("lcs-shell reads tool.strings 'instruction'", /i18n\.t\(tool\.strings,\s*'instruction'\)/.test(shell));
    const settingKeys = (T.settings || []).map(s => s.labelKey);
    const SHELL_KEYS = ['title', 'instruction'].concat(settingKeys);

    const dead = enKeys.filter(k => SHELL_KEYS.indexOf(k) < 0 && !asked.has(k));
    check(`every authored string is REACHED (${asked.size} asked for; ${SHELL_KEYS.length} shell-consumed)${dead.length ? ' — DEAD: ' + dead.join(', ') : ''}`, dead.length === 0);
    for (const k of settingKeys) check(`the settings schema references "${k}"`, !!S[k]);

    /* the OTHER direction: nothing may be asked for that is not authored */
    const undeclared = [...asked].filter(k => !S[k]);
    check(`nothing undeclared is asked for${undeclared.length ? ' — ' + undeclared.join(', ') : ''}`, undeclared.length === 0);
  }

  /* ---------------------------------------------------------------- */
  head('M  the shipped chrome');
  check('the CSS injector is idempotent', /getElementById\('ls-style'\)/.test(SRC_NC));
  check('the PRINT stylesheet is injected separately', /getElementById\('ls-print-style'\)/.test(SRC_NC));
  check('and only for a premium visitor — gating the chip is not gating the feature',
    /if \(this\.premium\) \{\s*\n?\s*injectLetterStudioPrintCSS\(\);/.test(SRC) || /this\.premium[\s\S]{0,120}injectLetterStudioPrintCSS\(\)/.test(SRC));
  check('there is a real @media print block, not just a comment about one', /['"`]@media print\s*\{/.test(SRC));
  check('the print block undoes the shell (lcs-shell.css ships none of its own)', /\.lcs-app\{height:auto/.test(SRC));
  check('a reduced-motion block exists', /prefers-reduced-motion/.test(SRC));
  /* ⚠ vh is forbidden inside a manipulative: inside an iframe it resolves
     against the IFRAME, which is exactly the feedback loop §23.6 bans. */
  check('no vh unit anywhere in the tool CSS', !/\d\s*vh[;)\s}]/.test(SRC));
  check('layout is CONTAINER queries, not viewport queries', /@container ls \(min-width:/.test(SRC));
  check('the container is declared on .ls-wrap', /container-type:inline-size;container-name:ls/.test(SRC));
  /* ⚠ A CONTAINER CANNOT STYLE ITSELF. Every rung must target a
     DESCENDANT of .ls-wrap, never .ls-wrap — the tool's own header records
     shipping exactly that mistake once. */
  {
    const rungs = SRC.match(/@container ls \(min-width:\d+px\)\{[\s\S]*?\n\s*\+ '\}'/g) || [];
    const selfStyled = rungs.filter(r => /'\.ls-wrap\{/.test(r));
    check(`${rungs.length} container rungs, none of which styles the container itself`, rungs.length >= 3 && selfStyled.length === 0);
  }
}

/* =====================================================================
   MAIN
   ===================================================================== */
/* a child process poisons its own source; the parent only orchestrates */
const ONLY_ENV = process.env.LS_POISON_ONLY;
if (ONLY_ENV !== undefined) {
  run(ONLY_ENV === 'none' ? false : parseInt(ONLY_ENV, 10));
  console.log(`\n${ERRORS ? 'FAIL' : 'PASS'} — ${ERRORS} error(s) of ${CHECKS} checks`);
  process.exit(ERRORS ? 1 : 0);
}

console.log('=== verify-letter-studio ===');
run(false);
const realErrs = ERRORS, realChecks = CHECKS;

if (POISON) {
  console.log('\n\n=== POISON: every assertion family must be observed FAILING ===');
  const os = require('os');
  const { execFileSync } = require('child_process');

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ls-poison-'));
  for (const f of fs.readdirSync(TOOLS_DIR)) {
    if (/^(letter-tiles-\w+\.json|letter-studio\.js|lcs-shell\.js|alphabet-trace-core\.js|number-trace-core\.js|stroke-trace-core\.js)$/.test(f))
      fs.copyFileSync(path.join(TOOLS_DIR, f), path.join(tmp, f));
  }
  const child = (env) => {
    try {
      const out = execFileSync(process.execPath, [__filename, '--quiet', '--locales=' + LOCALES.join(',')], {
        env: Object.assign({}, process.env, { LS_TOOL_DIR: tmp }, env),
        encoding: 'utf8', stdio: 'pipe'
      });
      return { failed: false, out };
    } catch (e) {
      return { failed: true, out: String(e.stdout || '') + String(e.stderr || '') };
    }
  };

  /* ⭐ THE CONTROL. The tmp copy, unpoisoned, must PASS — otherwise every
     "poison caught" below could be the harness failing for a reason that
     has nothing to do with the patch. */
  const control = child({ LS_POISON_ONLY: 'none' });
  if (control.failed) {
    console.error('  CONTROL FAILED — the unpoisoned tmp copy does not pass, so no poison verdict below means anything.');
    console.error(control.out.split('\n').filter(l => /ERROR/.test(l)).slice(0, 10).join('\n'));
    process.exit(1);
  }
  console.log('  control: the UNPOISONED tmp copy passes, so a failure below is the patch');

  let holes = 0;
  POISON_PATCHES.forEach(([label], i) => {
    const r = child({ LS_POISON_ONLY: String(i) });
    const fired = (r.out.match(/^\s*ERROR /gm) || []).length;
    const first = (r.out.split('\n').find(l => /ERROR/.test(l)) || '').trim().replace(/^ERROR /, '');
    if (r.failed) console.log(`  killed (${String(fired).padStart(3)} assertion${fired === 1 ? ' ' : 's'})  ${label}\n                       first: ${first.slice(0, 96)}`);
    else { holes++; console.error(`  SURVIVED — no assertion sees: ${label}`); }
  });

  /* the DATA half: the tray family must be poisonable too */
  fs.unlinkSync(path.join(tmp, 'letter-tiles-fi.json'));
  const trayRun = child({ LS_POISON_ONLY: 'none' });
  const trayFired = (trayRun.out.match(/^\s*ERROR /gm) || []).length;
  if (trayRun.failed) console.log(`  killed (${String(trayFired).padStart(3)} assertions)  letter-tiles-fi.json deleted`);
  else { holes++; console.error('  SURVIVED — deleting a whole locale tray passes'); }

  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
  if (holes) { console.error(`\nGATE HAS ${holes} HOLE(S).`); process.exit(1); }
  console.log('  every poison is caught, and the control passes.');
}

console.log('');
if (realErrs) { console.error(`FAIL — ${realErrs} error(s) of ${realChecks} checks`); process.exit(1); }
console.log(`PASS — ${realChecks - realErrs}/${realChecks} checks`);
