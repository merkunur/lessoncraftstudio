#!/usr/bin/env node
/* =====================================================================
   verify-letter-studio.js — build-gate for TOOL #25 Letter Studio.

   The tool owns no glyph table: it REGISTERS its composed graphemes into
   `alphabet-trace-core.js`'s own GLYPHS map. That is the whole point of
   this gate — the core's solver gauntlet (an in-order oracle traces every
   glyph; a scribbler fails; an out-of-order tap is rejected) is driven
   here against å ø ñ ç æ ß exactly as the core's own gate drives it
   against a-z. A composed letter is only real if a child could trace it.

     G1  the tool adds glyphs and never mutates the 52 ASCII ones
     G2  every single-char grapheme in ALL 11 letter trays is drawable,
         and every digraph decomposes to drawable letters
     G3  the ORACLE traces every added glyph, upper and lower, 100%
     G4  the SCRIBBLER fails on every added glyph; out-of-order rejected
     G5  a mark is the LAST stroke(s); numStrokes(base) < numStrokes(composed)
     G6  every point is finite and inside the box; no zero-length stroke
     G7  live ink: advance() is false off-path and never advances the cursor
     G8  i/j lose their DOT under a mark (í is stem+acute, not stem+dot+acute)
     G9  structural premium gate: rosterFor free -> [], deep link refused
     G10 no write to my-classes; the key is read
     G11 no exfil (Hush Owl bar): one fetch, /api/auth/me, no body, no .track(
     G12 no verdict/score/timer vocabulary in any locale; strings ×11 with
         placeholder parity; typographic apostrophes only

   Usage: node scripts/verify-letter-studio.js [--locales=en,de]
   Override for mutation testing: LS_TOOL_DIR
   Exit 1 on any ERROR.
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

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

const VERDICT = {
  en: /\b(wrong|incorrect|bad|fail|no, )\b/i, de: /\b(falsch|fehler|leider)\b/i,
  fr: /\b(faux|fausse|erreur|raté)\b/i, it: /\b(sbagliato|errore)\b/i,
  es: /\b(incorrecto|mal hecho|error)\b/i, pt: /\b(errado|erro)\b/i,
  nl: /\b(fout|foutje|verkeerd)\b/i, sv: /\b(fel|felaktig)\b/i,
  da: /\b(forkert|fejl)\b/i, no: /\b(feil)\b/i, fi: /\b(väärin|virhe)\b/i
};
const SCORE_RE = /\b(score|scores|streak|poäng|poeng|punkte|punteggio|puntuación|pontuação|pisteet|badge|reward|countdown)\b/i;

function loadAll() {
  const noop = () => {};
  const fakeEl = () => ({
    style: { setProperty: noop }, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    appendChild: noop, addEventListener: noop, setAttribute: noop, removeAttribute: noop,
    innerHTML: '', textContent: '', children: [], dataset: {}, remove: noop
  });
  const sandbox = {
    window: { addEventListener: noop, removeEventListener: noop, location: { search: '' } },
    navigator: { language: 'en' }, console,
    document: {
      createElement: fakeEl, createElementNS: fakeEl, getElementById: () => null,
      querySelector: () => null, querySelectorAll: () => [],
      head: { appendChild: noop }, body: { classList: { add: noop, remove: noop } },
      addEventListener: noop, documentElement: fakeEl(), hidden: false
    },
    location: { search: '', hostname: 'gate' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    URLSearchParams, Intl, Date, Math, JSON,
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    fetch: () => ({ then() { return this; }, catch() { return this; } }),
    matchMedia: () => ({ matches: false, addListener: noop, addEventListener: noop })
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  /* Cores resolve through TOOL_DIR first so a mutation run can poison THEM
     too — G1 (glyph byte-equality) and G7 (live ink) are core-side, and a
     gate whose mutant can only ever reach the tool cannot test them. */
  for (const f of ['alphabet-trace-core.js', 'number-trace-core.js']) {
    const p = fs.existsSync(path.join(TOOL_DIR, f)) ? path.join(TOOL_DIR, f) : path.join(TOOLS_DIR, f);
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
  }
  vm.runInContext(fs.readFileSync(path.join(TOOL_DIR, 'letter-studio.js'), 'utf8'), sandbox, { filename: 'letter-studio.js' });
  return sandbox;
}

const SRC = fs.readFileSync(path.join(TOOL_DIR, 'letter-studio.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const box = loadAll();
/* the cores attach to `window` when one exists, the tool to the bare global */
const T = box.LetterStudio || box.window.LetterStudio;
const CORE = box.AlphabetTraceCore || box.window.AlphabetTraceCore;
const NUM = box.NumberTraceCore || box.window.NumberTraceCore;
if (!T) { console.error('  ERROR could not load LetterStudio'); process.exit(1); }
if (!CORE) { console.error('  ERROR could not load AlphabetTraceCore'); process.exit(1); }

console.log('[glyphs]');

/* ---------- G1 install adds, never mutates ---------- */
const ASCII = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
const before = {};
for (const c of ASCII) before[c] = JSON.stringify(CORE.GLYPHS[c]);
const added = T.installGlyphs(CORE);
if (!added) err('G1 installGlyphs added nothing — no composed grapheme was registered');
for (const c of ASCII) {
  if (JSON.stringify(CORE.GLYPHS[c]) !== before[c]) err(`G1 installGlyphs MUTATED the shipped glyph "${c}"`);
}
if (!NUM || !NUM.GLYPHS || Object.keys(NUM.GLYPHS).length < 10) err('G1 number-trace-core did not load its digits');

/* the set the tool claims to draw */
const ADDED = Object.keys(T.COMPOSE).concat(Object.keys(T.NOVEL));

/* ---------- G2 every locale's tray is drawable ---------- */
console.log('[trays]');
for (const loc of LOCALES) {
  const f = path.join(TOOLS_DIR, `letter-tiles-${loc}.json`);
  if (!fs.existsSync(f)) { warn(`G2 no letter tray for ${loc}`); continue; }
  const tray = (JSON.parse(fs.readFileSync(f, 'utf8')).tray) || [];
  let single = 0, digraph = 0;
  for (const t of tray) {
    const g = t.g;
    if (!g) continue;
    if ([...g].length === 1) {
      single++;
      if (!CORE.GLYPHS[g]) err(`G2 ${loc}: "${g}" (U+${g.codePointAt(0).toString(16).toUpperCase()}) has no glyph`);
      /* ß has NO capital in K-3 German — it uppercases to the two-character
         "SS", so a single-glyph capital is not merely missing, it does not
         exist. Only single-character uppercases are required to be drawable. */
      const up = g.toUpperCase();
      if ([...up].length === 1 && !CORE.GLYPHS[up]) err(`G2 ${loc}: uppercase of "${g}" has no glyph`);
    } else {
      digraph++;
      /* a digraph is a SEQUENCE — every letter of it must be drawable */
      for (const ch of T.sequenceOf(g)) {
        if (!CORE.GLYPHS[ch]) err(`G2 ${loc}: digraph "${g}" contains undrawable "${ch}"`);
      }
    }
  }
  console.log(`  ${loc}: ${single} letters + ${digraph} digraph(s) all drawable`);
}

/* ---------- G3/G4 the core's own gauntlet, on the ADDED glyphs ---------- */
console.log('[gauntlet]');
{
  /* ⚠ scribbleSolver().complete is a LYING TEST on its own: it attempts only
     stroke 0, so `complete` is false BY CONSTRUCTION for every multi-stroke
     glyph and stays false however far the tolerance is loosened (measured:
     at TOL=60 it still reports 45/45 rejected). The property that actually
     responds to tolerance is the VERDICT on that one stroke — at the shipped
     TOL=18 no glyph accepts the garbage path; at TOL=60 "I", "Ì" and "Í" do.
     So assert 'off-path' per glyph, and keep .complete as the weaker
     companion rather than the whole claim. */
  const SCRIBBLE = [{ x: 0, y: 0 }, { x: 4, y: 6 }, { x: 1, y: 9 }];
  let oracle = 0, scribble = 0, ooo = 0, oooN = 0;
  for (const ch of ADDED) {
    const round = { id: 'g', letter: ch };
    if (CORE.SOLVERS.oracleSolver(round).complete) oracle++;
    else err(`G3 the oracle could NOT trace "${ch}" — a child could not form it either`);

    const verdict = CORE.attemptStroke(CORE.newState(round), 0, SCRIBBLE);
    if (verdict === 'off-path' && !CORE.SOLVERS.scribbleSolver(round).complete) scribble++;
    else err(`G4 a SCRIBBLE was accepted on "${ch}" (${verdict}) — the tolerance is meaningless`);

    const o = CORE.SOLVERS.outOfOrderSolver(round);
    if (!o.skip) { oooN++; if (o.result === 'wrong-order') ooo++; else err(`G4 out-of-order accepted on "${ch}"`); }
  }
  console.log(`  oracle ${oracle}/${ADDED.length} · scribbler rejected ${scribble}/${ADDED.length} · out-of-order rejected ${ooo}/${oooN}`);
}

/* ---------- G5/G6/G8 shape of a composed glyph ---------- */
console.log('[composition]');
for (const ch of Object.keys(T.COMPOSE)) {
  const [base, mark] = T.COMPOSE[ch];
  const g = CORE.GLYPHS[ch], b = CORE.GLYPHS[base];
  if (!g || !b) { err(`G5 "${ch}" or its base "${base}" is missing`); continue; }

  /* G8 — i/j drop the dot, so a marked i has base-1 body strokes */
  const bodyLen = T.DOTTED[base.toLowerCase()] && base === base.toLowerCase() ? b.length - 1 : b.length;
  if (g.length <= bodyLen) err(`G5 "${ch}" has no mark stroke (${g.length} vs body ${bodyLen})`);

  /* the body strokes must be the base's, unchanged and FIRST */
  for (let i = 0; i < bodyLen; i++) {
    if (JSON.stringify(g[i]) !== JSON.stringify(b[i])) err(`G5 "${ch}" altered body stroke ${i} of "${base}"`);
  }
  /* and the mark must therefore be LAST */
  if (JSON.stringify(g[bodyLen]) === JSON.stringify(b[bodyLen] || null))
    err(`G5 "${ch}" mark is not appended after the body`);

  if (T.DOTTED[base] && g.length !== b.length) {
    /* i + one-stroke mark = same count as dotted i; that is the tell that
       the dot was replaced rather than kept */
    if (mark !== 'diaeresis') err(`G8 "${ch}" did not drop the dot of "${base}" (${b.length} -> ${g.length})`);
  }
}
for (const ch of ADDED) {
  const g = CORE.GLYPHS[ch];
  for (let i = 0; i < g.length; i++) {
    if (!g[i] || g[i].length < 2) { err(`G6 "${ch}" stroke ${i} has fewer than 2 points`); continue; }
    let len = 0;
    for (let j = 0; j < g[i].length; j++) {
      const p = g[i][j];
      if (!isFinite(p.x) || !isFinite(p.y)) { err(`G6 "${ch}" stroke ${i} has a non-finite point`); break; }
      if (p.x < 0 || p.x > 100 || p.y < 0 || p.y > 110) err(`G6 "${ch}" point (${p.x},${p.y}) is outside the box`);
      if (j) len += Math.hypot(p.x - g[i][j - 1].x, p.y - g[i][j - 1].y);
    }
    if (len < 1) err(`G6 "${ch}" stroke ${i} is zero-length`);
  }
}

/* ---------- G6b marks that sit close must still be SEPARATE strokes ---------- */
{
  for (const ch of Object.keys(T.COMPOSE)) {
    if (T.COMPOSE[ch][1] !== 'diaeresis') continue;
    const g = CORE.GLYPHS[ch];
    const a = g[g.length - 2], b2 = g[g.length - 1];
    /* tracing the FIRST dot must not also complete the SECOND one */
    if (CORE.traceScore(b2, a.map(p => ({ x: p.x, y: p.y }))))
      err(`G6b "${ch}": tracing one umlaut dot also completes the other — they are not two strokes`);

    /* ⚠ the check above is NOT the defect the DOT_TOL exists to prevent, and
       on its own it cannot see it: the dots are 20 apart, so at the shared
       TOL=18 dot A's own path still misses dot B and the assertion passes.
       The real failure is ONE TAP BETWEEN THEM — 10 units from each, inside
       TOL=18 — satisfying both strokes at once, at which point the umlaut is
       not two strokes for a child either. Measure that. */
    const mid = { x: (a[0].x + b2[0].x) / 2, y: (a[0].y + b2[0].y) / 2 };
    const tap = [mid, { x: mid.x, y: mid.y + 2 }];
    if (CORE.traceScore(a, tap) && CORE.traceScore(b2, tap))
      err(`G6b "${ch}": a single tap BETWEEN the umlaut dots completes both — the dot tolerance is too wide`);
  }
  /* the per-stroke tolerance must be a no-op for everything that shipped */
  const ASCII2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  for (const c of ASCII2) for (const st of CORE.GLYPHS[c])
    if (st.tol !== undefined) err(`G6b shipped glyph "${c}" acquired a custom tolerance — tolOf must be a no-op for the 52`);
}

/* ---------- G7 live ink ---------- */
console.log('[live ink]');
{
  if (typeof CORE.advance !== 'function') err('G7 the core exposes no advance() — live ink cannot gate');
  else {
    const s = CORE.newState({ id: 'x', letter: 'l' });
    const stroke = CORE.GLYPHS['l'][0];
    const off = CORE.advance(s, 0, { x: stroke[0].x + 60, y: stroke[0].y });
    if (off.onPath) err('G7 advance() reports onPath for a point 60 units away');
    if (off.cp !== 0) err('G7 an off-path sample advanced the checkpoint cursor');
    const on = CORE.advance(s, 0, { x: stroke[0].x, y: stroke[0].y });
    if (!on.onPath) err('G7 advance() reports off-path for a point exactly ON the path');
    if (on.cp < 1) err('G7 an on-path sample did not advance the cursor');
    const wrong = CORE.advance(s, 1, { x: stroke[0].x, y: stroke[0].y });
    if (wrong.onPath) err('G7 advance() accepted a sample for a stroke that is not next');
  }
}

console.log('[tool]');

/* ---------- G9 structural gate ---------- */
{
  if (T.modesFor(false).indexOf('names') >= 0) err('G9 modesFor(false) offers names mode to a free visitor');
  if (T.modesFor(true).indexOf('names') < 0) err('G9 modesFor(true) hides names mode from a subscriber');
  const mc = { activeClassId: 'c1', classes: [{ id: 'c1', students: [{ id: 's1', name: 'Zzyzx' }] }] };
  if (T.rosterFor(mc, 'c1', false).length) err('G9 rosterFor returned a name to a FREE visitor');
  const copy = T.rosterFor(mc, 'c1', true);
  if (copy.length !== 1) err('G9 rosterFor lost the roster for a subscriber');
  copy.push({ id: 'x', name: 'x' });
  if (mc.classes[0].students.length !== 1) err('G9 rosterFor returned the LIVE array');
  if (T.resolveDeepLink({ mode: 'names' }, false) !== null) err('G9 ?mode=names honoured for a free visitor');
  if (!T.resolveDeepLink({ mode: 'names' }, true)) err('G9 ?mode=names refused for a subscriber');
}

/* ---------- G10 my-classes is read-only ---------- */
{
  if (!/getItem\(\s*this\.MC_KEY\s*\)/.test(SRC_NC)) err('G10 the tool never READS my-classes — names mode cannot work');
  const writes = SRC_NC.match(/localStorage\.setItem\(([^,]+),/g) || [];
  if (!writes.length) err('G10 the tool never writes its own store');
  for (const w of writes) if (!/STORE_KEY/.test(w)) err(`G10 a setItem targets something other than STORE_KEY: ${w.trim()}`);
  if (/setItem\(\s*(this\.)?MC_KEY/.test(SRC_NC) || /setItem\(\s*['"]lcs:my-classes/.test(SRC_NC))
    err('G10 THE TOOL WRITES MY-CLASSES — that store has one rightful owner');
}

/* ---------- G11 no exfil ---------- */
{
  const fetches = SRC_NC.match(/\bfetch\s*\(/g) || [];
  if (fetches.length !== 2) err(`G11 ${fetches.length} fetch call(s) — exactly two are allowed (entitlement + the letter tray)`);
  if (!/fetch\('\/api\/auth\/me'/.test(SRC_NC)) err('G11 no /api/auth/me entitlement check');
  if (!/fetch\('\/mini-tools\/letter-tiles-/.test(SRC_NC)) err('G11 the letter tray fetch is missing');
  if (/fetch\([^)]*body\s*:/.test(SRC_NC)) err('G11 a fetch carries a body — nothing about a child may be sent');
  if (/XMLHttpRequest|sendBeacon|WebSocket|RTCPeerConnection|MediaRecorder|navigator\.clipboard/.test(SRC_NC))
    err('G11 an exfiltration API appears in the source');
  if (/\.track\(/.test(SRC_NC)) err('G11 the tool calls api.track — a child’s name must never become an event');
}

/* ---------- G12 identity + strings ---------- */
{
  if (T.id !== 'letter-studio') err(`G12 id is "${T.id}"`);
  if (T.STORE_KEY !== 'lcs:letter-studio:v1') err(`G12 STORE_KEY is "${T.STORE_KEY}"`);
  if (T.MC_KEY !== 'lcs:my-classes:v1') err(`G12 MC_KEY is "${T.MC_KEY}"`);
  if (T.ENT_TRUST_DAYS !== 14) err(`G12 ENT_TRUST_DAYS is ${T.ENT_TRUST_DAYS}`);
  if (T.premium !== false) err('G12 premium does not default to false');
  if (!T.RULING || !T.rulingFor('en') || !T.rulingFor('en').zones.length) err('G12 no ruling descriptor');

  const S = T.strings || {};
  const enKeys = Object.keys(S).filter(k => S[k] && typeof S[k].en === 'string');
  /* The floor was 25 while a DEAD key (`againBtn`) was padding the count —
     the Italian ensemble found it by reading, which is exactly what a gate
     is for. So the count is not the real assertion: EVERY declared string
     must be consumed somewhere, or eleven native ensembles are being asked
     to translate, screen and agree on text no child will ever see. */
  if (enKeys.length < 24) err(`G12 only ${enKeys.length} strings — the surface is incomplete`);
  /* Look for the quoted KEY anywhere outside its own declaration, not for a
     `t('key')` call shape: keys are legitimately reached through ternaries
     (`t(this.upper ? 'caseUpper' : 'caseLower')`), and a call-shaped regex
     reported four live strings as dead. Measure reference, not syntax. */
  const body = SRC_NC.split('\n').filter(l => !/^\s{4}\w+:\s*\{en:/.test(l)).join('\n');
  /* `title` and `instruction` are read by the SHELL, not the tool
     (lcs-shell.js:448-449 `i18n.t(tool.strings, …)`), so they are consumed
     without ever appearing here. Every other key must earn its place. */
  const SHELL_KEYS = ['title', 'instruction'];
  for (const k of enKeys) {
    if (SHELL_KEYS.indexOf(k) >= 0) continue;
    if (!new RegExp(`['"]${k}['"]`).test(body))
      err(`G12 the string "${k}" is never consumed — a dead string 11 ensembles must maintain`);
  }
  const ph = (s) => (s.match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
  for (const key of enKeys) {
    for (const loc of LOCALES) {
      const v = S[key][loc];
      if (typeof v !== 'string' || !v.trim()) { err(`G12 ${key}.${loc} missing`); continue; }
      if (ph(v) !== ph(S[key].en)) err(`G12 ${key}.${loc} placeholder parity: "${ph(S[key].en)}" vs "${ph(v)}"`);
      if (/'/.test(v)) err(`G12 ${key}.${loc} uses a straight apostrophe — typographic ’ only`);
      if (VERDICT[loc] && VERDICT[loc].test(v)) err(`G12 ${key}.${loc} carries a verdict: "${v}"`);
      if (SCORE_RE.test(v)) err(`G12 ${key}.${loc} scores or times a child: "${v}"`);
    }
  }
  const speaks = SRC_NC.match(/LCSAudio\.speak\(\{[^}]*\}/g) || [];
  if (!speaks.length) err('G12 nothing is ever spoken');
  for (const s of speaks) {
    if (!/lang:/.test(s)) err(`G12 a speak call omits lang: ${s.slice(0, 60)}`);
    const m = /type:\s*'(\w+)'/.exec(s);
    if (!m || ['ui', 'word'].indexOf(m[1]) < 0) err(`G12 speak type must be ui|word: ${s.slice(0, 60)}`);
  }
  if (!/getElementById\('ls-style'\)/.test(SRC_NC)) err('G12 the CSS injector is not idempotent');
  if (!/@media print/.test(SRC)) err('G12 no print stylesheet — the printable sheet is a premium promise');
  if (!/prefers-reduced-motion/.test(SRC)) err('G12 no reduced-motion block');
}

console.log('');
if (ERRORS) { console.error(`FAIL — ${ERRORS} error(s), ${WARNS} warn(s)`); process.exit(1); }
console.log(`PASS — ${added} glyph(s) added, 0 error(s), ${WARNS} warn(s)`);
