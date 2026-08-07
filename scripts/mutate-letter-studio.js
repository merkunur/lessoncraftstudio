#!/usr/bin/env node
/* =====================================================================
   mutate-letter-studio.js — the harness that proves the Letter Studio
   gates have no holes.

   Each needle is a deliberate defect. It must be KILLED by
   verify-letter-studio.js, or — for anything the model gate structurally
   cannot see (geometry, layout, the DOM, locale selection) — by one of
   the browser gates, which only the verify-survivors pay the cost of.

   THREE BUCKETS, and two of them are failures:
     killed   — a gate caught it. Good.
     survived — no gate caught it. THE GATE HAS A HOLE.
     fault    — the needle never applied (anchor missing, or the patch was
                a no-op). That is a harness defect, not a pass: a dropped
                needle silently shrinks the denominator while the run
                still reports "every mutation killed". It THROWS.

   ⚠ A HANG COUNTS AS A SURVIVAL. A gate that never terminates has not
   caught anything, and scoring a timeout as a kill is how an unbounded
   loop in a gate goes unnoticed.

   ⚠ CRLF. `git checkout` normalises line endings through core.autocrlf,
   and a multi-line needle is silently sensitive to it — seven needles
   went blind that way on a sibling tool. Everything is read through lf().

   ⚠ SELF-ANCHORED LOCALE NEEDLES. The strings block is rewritten wholesale
   by the native-panel apply step, so a needle carrying the literal English
   text has a half-life of one commit. The locale needles below read the
   CURRENT value off the live file and mutate that.

   Usage:
     node scripts/mutate-letter-studio.js [--only=<substring>] [--fast]
       --fast  model gate only; reports browser-only needles as SKIPPED
               rather than running them (a triage run, never a green light)
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const TOOLS = path.join(__dirname, '..', 'mini tools');
const TOOL = path.join(TOOLS, 'letter-studio.js');
const GATE = path.join(__dirname, 'verify-letter-studio.js');
const BROWSER_GATES = [
  { name: 'local-test', file: path.join(__dirname, 'local-test-letter-studio.js'), timeout: 900000 },
  { name: 'smoke', file: path.join(__dirname, 'smoke-letter-studio-locales.js'), timeout: 1800000 }
];
/* ⚠ CARRY EVERY FILE THE GATES READ. A tmp dir holding only the tool
   makes the trace cores, the shell and the eleven letter trays 404, and
   the run then fails for a reason that has nothing to do with the needle
   — a false "killed" on every single one. */
const CARRY = fs.readdirSync(TOOLS).filter(f =>
  /^(letter-studio\.(js|html)|letter-tiles-\w+\.json|lcs-shell\.(js|css)|alphabet-trace-core\.js|number-trace-core\.js|stroke-trace-core\.js)$/.test(f));
const TIMEOUT = 120000;

const lf = (t) => t.replace(/\r\n/g, '\n');
const ORIGINAL = lf(fs.readFileSync(TOOL, 'utf8'));
const onlyArg = process.argv.find(a => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.split('=')[1] : null;
const FAST = process.argv.includes('--fast');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------------------------------------------------------------------
   self-anchoring locale needles
   ⚠ `:\s*'` — the strings block is written `{en:'Letter Studio',de:'…'}`
   with NO space after the locale colon. A regex demanding one anchors
   nothing, and every locale needle then reports as a harness fault.
   --------------------------------------------------------------------- */
const strAnchor = (key, loc) => {
  const re = new RegExp('(^\\s*' + key + ":\\s*\\{[^\\n]*?\\b" + loc + ":\\s*')((?:[^'\\\\]|\\\\.)*)'", 'm');
  const m = re.exec(ORIGINAL);
  return m ? { full: m[0], head: m[1], value: m[2] } : null;
};
const strMut = (label, key, loc, replacement) => {
  const a = strAnchor(key, loc);
  if (!a) return [label, ' NO-ANCHOR ' + key + '.' + loc, ''];
  return [label, a.full, a.head + replacement + "'"];
};

const M = [];

/* ---- THE STRUCTURAL PREMIUM GATE ---- */
M.push(['⭐ rosterFor hands a child’s name to a FREE visitor',
  '    if (!premium || !mc || !classId) return [];',
  '    if (!mc || !classId) return [];']);
M.push(['rosterFor returns the LIVE array, so a caller can mutate the class list',
  '      out = []; st = classes[i].students || [];',
  '      return classes[i].students || [];\n      out = []; st = classes[i].students || [];']);
M.push(['modesFor offers names mode to a free visitor',
  "  modesFor: function (premium) { return premium ? ['letters', 'word', 'names'] : ['letters', 'word']; },",
  "  modesFor: function (premium) { return ['letters', 'word', 'names']; },"]);
M.push(['?mode=names is honoured optimistically before entitlement lands',
  "    if (m === 'names' && !premium) return null;",
  '    if (false) return null;']);
M.push(['_loadMC opens the class store for a free visitor',
  '    if (!this.premium) return null;\n    if (this._mc) return this._mc;',
  '    if (false) return null;\n    if (this._mc) return this._mc;']);
M.push(['⭐ the print stylesheet is injected for everybody — the Ctrl+P bypass',
  '    if (this.premium) {\n      injectLetterStudioPrintCSS();',
  '    if (true) {\n      injectLetterStudioPrintCSS();']);

/* ---- MY-CLASSES IS READ-ONLY ---- */
M.push(['⭐ the tool WRITES the store Name Sticks owns',
  '  _saveStore: function () {\n    try { localStorage.setItem(this.STORE_KEY',
  '  _saveStore: function () {\n    try { localStorage.setItem(this.MC_KEY, JSON.stringify(this._mc || {})); } catch (_) {}\n    try { localStorage.setItem(this.STORE_KEY']);
M.push(['the store key changes under the teacher',
  "  STORE_KEY: 'lcs:letter-studio:v1',", "  STORE_KEY: 'lcs:letter-studio:v2',"]);
M.push(['the cached entitlement is trusted forever',
  '  ENT_TRUST_DAYS: 14,', '  ENT_TRUST_DAYS: 3650,']);
M.push(['premium defaults to TRUE', '  premium: false,', '  premium: true,']);

/* ---- THE GLYPH ALGEBRA ---- */
M.push(['⭐ THE SHIPPED DEFECT: digits are judged by the ALPHABET core again',
  `    if (this.isDigit(ch)) {
      if (!this.numCore) return null;
      return this.numCore.glyphFor ? this.numCore.glyphFor(ch, this.api.lang)
                                   : (this.numCore.GLYPHS && this.numCore.GLYPHS[ch]) || null;
    }`,
  `    if (this.isDigit(ch)) {
      return (this.core && (this.core.GLYPHS[ch] || this.core.GLYPHS['l'])) || null;
    }`]);
M.push(['the crossbar seven ignores the content locale',
  "      return this.numCore.glyphFor ? this.numCore.glyphFor(ch, this.api.lang)",
  "      return this.numCore.glyphFor ? this.numCore.glyphFor(ch, 'en')"]);
M.push(['the mark is PREPENDED, so the body is no longer first',
  '    return body.concat(strokes);', '    return strokes.concat(body);']);
M.push(['i and j keep their dot under a mark (í becomes stem + dot + acute)',
  '    if (this.DOTTED[baseChar]) body = baseStrokes.slice(0, baseStrokes.length - 1);',
  '    if (false) body = baseStrokes.slice(0, baseStrokes.length - 1);']);
M.push(["upperOf returns 'SS' for ß, silently dropping the key",
  '    var u = ch.toUpperCase();\n    return u.length === 1 ? u : ch;',
  '    return ch.toUpperCase();']);
/* ⚠ THESE FIVE ARE ANCHORED ON THE SMALLEST DISTINCTIVE FRAGMENT, not on
   a whole function body. The mark table was rewritten under this harness
   mid-run — `stroke` and `cedilla` grew from one-liners into multi-line
   builders, the circumflex moved from 0.4/6 to 0.55/7, and the H clamp
   went 6/16 -> 8/20. Eight needles reported NEEDLE NOT FOUND in one run,
   which is the harness working (a fault is not a pass) but is also a
   half-life problem: a needle that encodes the current text of what it
   mutates dies the next time anyone touches that line. */
M.push(['the circumflex loses its doubled apex and draws a BREVE',
  '{ x: b.cx, y: b.top - H }, { x: b.cx + 0.4, y: b.top - H }, ',
  '{ x: b.cx, y: b.top - H }, ']);
M.push(['the mark ceiling is removed and the accents run off the sheet',
  'var H = Math.max(8, Math.min(20, bb.top - this.MARK_CEIL));',
  'var H = 40;']);
M.push(['the two diaeresis dots collapse onto one point',
  'd = Math.max(9, Math.min(11, (b.x1 - b.x0) * 0.26));',
  'd = 1;']);
M.push(['the cedilla is drawn ABOVE the letter instead of below it',
  "      var x = (typeof b.footX === 'number' ? b.footX : b.cx), y = b.base;",
  "      var x = (typeof b.footX === 'number' ? b.footX : b.cx), y = b.top - 10;"]);
M.push(['the ø stroke no longer crosses the bowl',
  'var x0 = b.x0 - 5, y0 = b.base + 5, x1 = b.x1 + 5, y1 = b.top - 5,',
  'var x0 = b.x0 - 5, y0 = b.base + 5, x1 = b.x0 - 2, y1 = b.base + 2,']);
M.push(['installGlyphs OVERWRITES a shipped ASCII glyph',
  '      if (core.GLYPHS[ch]) continue;\n      spec = this.COMPOSE[ch];',
  "      core.GLYPHS['a'] = [[{ x: 20, y: 20 }, { x: 30, y: 30 }]];\n      if (core.GLYPHS[ch]) continue;\n      spec = this.COMPOSE[ch];"]);
M.push(['a digraph is treated as a single glyph instead of a letter sequence',
  '    var out = [], i;\n    for (i = 0; i < grapheme.length; i++) out.push(grapheme.charAt(i));\n    return out;',
  '    return [grapheme];']);
M.push(['the bounding box is computed over the WHOLE glyph, dot included',
  '    if (this.DOTTED[baseChar]) body = baseStrokes.slice(0, baseStrokes.length - 1);\n    var mark = this.MARKS[markName];',
  '    var mark = this.MARKS[markName];']);

/* ---- THE TRACER WIRING (the judge and the renderer are one array) ---- */
M.push(['⭐ the judge is handed a DIFFERENT glyph from the one drawn',
  '    var ch = this._current(), g = this._glyph(ch);\n    this.trace = (this.tracer && g)',
  "    var ch = this._current(), g = (this.core && this.core.GLYPHS['l']) || this._glyph(ch);\n    this.trace = (this.tracer && g)"]);
M.push(['the wide-corridor setting is ignored',
  '    this.trace = (this.tracer && g) ? this.tracer.newTrace(g, { corridor: this.api.settings.wide ? this.tracer.WIDE : this.tracer.CORRIDOR }) : null;',
  '    this.trace = (this.tracer && g) ? this.tracer.newTrace(g, {}) : null;']);
M.push(['⭐ the autocomplete comes back — the ORIGINAL complaint',
  '    if (r.done) { this._drag = false; this._endStroke(ch); }',
  '    if (r.on) { var _L = this.trace.lanes[this.trace.idx]; this.trace.u = _L.total; this.trace.i = _L.pts.length - 1; this.trace.n = 999; this._drag = false; this._endStroke(ch); }']);
M.push(['⭐ the ink appears wherever the finger is, on the path or not',
  '    if (r.on) {\n      this.cur.push(pt);',
  '    if (true) {\n      this.cur.push(pt);']);
M.push(['⭐ a mid-stroke lift wipes the ink off the screen again',
  "    if (this.cur && this.cur.length) this._curPath.setAttribute('d', this._d(this.cur));",
  '    /* wiped */']);
M.push(['an incomplete stroke throws the child’s work away',
  '      this.stalls++;', '      this.stalls++; this.cur = []; this.tracer.clearStroke(this.trace);']);
M.push(['the corridor never relaxes after repeated stalls',
  'if (this.stalls === 4 && this.tracer.relax) this.tracer.relax(this.trace);',
  'if (false) this.tracer.relax(this.trace);']);

/* ---- THE PICKER + THE DOCK ---- */
M.push(['⭐ a picker key is shrunk below the 44px control floor',
  "'--ls-key:clamp(44px,7.6cqi,54px);--ls-sheet:min(96cqi,440px);}'",
  "'--ls-key:clamp(24px,7.6cqi,54px);--ls-sheet:min(96cqi,440px);}'"]);
M.push(['⭐ the container rungs never fire — the sheet is 440px on every desktop',
  "+ '@container ls (min-width:600px){'", "+ '@container ls (min-width:99999px){'"]);
M.push(['the digits band is dropped from the picker',
  '    var digits = [];\n    for (i = 0; i <= 9; i++) digits.push({ g: String(i), src: String(i), kind: \'digit\' });',
  '    var digits = [];']);
M.push(['the replay control loses its consequence',
  "rep.addEventListener('click', function (e) { e.stopPropagation(); self._demo(); });",
  "rep.addEventListener('click', function (e) { e.stopPropagation(); rep.classList.add('ls-on'); });"]);
M.push(['the selected case button is pressable and inert again',
  '          b.disabled = self.upper === pair[1];\n', '']);
M.push(['the word Go button is live over an empty box again',
  "    var sync = function () { go.disabled = !(inp.value || '').trim(); };",
  '    var sync = function () { go.disabled = false; };']);
M.push(['the pips no longer count the strokes',
  '    for (var i = 0; i < g.length; i++) {\n      var p = api.el(\'span\', \'ls-pip\'',
  '    for (var i = 0; i < 1; i++) {\n      var p = api.el(\'span\', \'ls-pip\'']);
M.push(['an undrawable letter is silently dropped and never shown as a gap',
  '    this.seqPartial = this.seq.length !== all.length;',
  '    this.seqPartial = false;']);

/* ---- THE RULING ---- */
M.push(['⭐ every locale gets the neutral default ruling',
  "  rulingFor: function (locale) { return this.RULING[locale] || this.RULING['default']; },",
  "  rulingFor: function (locale) { return this.RULING['default']; },"]);
M.push(['the tint band is never drawn',
  '    if (ruling.band) {', '    if (false) {']);
M.push(['the solid/dashed distinction is dropped',
  "ln.setAttribute('class', 'ls-rule ls-rule-' + zn.tone + (zn.kind === 'dashed' ? ' ls-dashed' : ''));",
  "ln.setAttribute('class', 'ls-rule ls-rule-' + zn.tone);"]);
M.push(['the German ruling loses a zone',
  "    de: { system: 'lineatur-1', zones: [{ y: 14, kind: 'solid', tone: 'faint' }, { y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }], band: { from: 44, to: 84 } },",
  "    de: { system: 'lineatur-1', zones: [{ y: 44, kind: 'solid', tone: 'mid' }, { y: 84, kind: 'solid', tone: 'strong' }, { y: 96, kind: 'solid', tone: 'faint' }], band: { from: 44, to: 84 } },"]);

/* ---- SPEECH + EXFIL ---- */
M.push(['speech leaks an isolated-phoneme type to a child',
  "LCSAudio.speak({ type: this.isDigit(ch) ? 'number' : 'word',",
  "LCSAudio.speak({ type: 'syllable',"]);
M.push(['speech loses its lang, so every locale speaks English',
  'text: ch, lang: this.api.lang, rate: 0.9 });',
  'text: ch, rate: 0.9 });']);
M.push(['⭐ a child’s name is sent to the server',
  "    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })",
  "    fetch('/api/auth/me', { method: 'POST', body: JSON.stringify(this._mc), headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })"]);
M.push(['the tool reports the child to analytics',
  '  _markDone: function (ch) {',
  '  _markDone: function (ch) {\n    try { this.api.track("letter", { ch: ch }); } catch (_) {}']);

/* ---- CSS / DOM claims the model gate structurally cannot see ---- */
M.push(['a vh unit is reintroduced inside the manipulative',
  "+ '.ls-sheet{width:var(--ls-sheet);aspect-ratio:100/98;",
  "+ '.ls-sheet{max-height:60vh;width:var(--ls-sheet);aspect-ratio:100/98;"]);
M.push(['a container rung styles the CONTAINER, which can never apply',
  "+ '@container ls (min-width:380px){'\n    +   '.ls-card{",
  "+ '@container ls (min-width:380px){'\n    +   '.ls-wrap{--ls-sheet:min(92cqi,470px);}'\n    +   '.ls-card{"]);
M.push(['the reduced-motion block is removed',
  "+ '@media (prefers-reduced-motion:reduce){.ls-firefly{display:none;}}'", "+ ''"]);
M.push(['the print block stops undoing the shell, so the sheet clips to one screen',
  "    + 'html,body{height:auto !important;overflow:visible !important;background:#fff !important;}'\n    + '.lcs-app{height:auto",
  "    + 'html,body{height:auto !important;overflow:visible !important;background:#fff !important;}'\n    + '.lcs-appX{height:auto"]);
M.push(['the CSS injector stops being idempotent',
  "  if (document.getElementById('ls-style')) return;", '  if (false) return;']);

/* ---- LOCALE NEEDLES — self-anchored so they survive an apply- pass ---- */
for (const loc of LOCALES) {
  M.push(strMut('a verdict word in the ' + loc + ' instruction', 'instruction', loc,
    loc === 'en' ? 'That is wrong, try again.' : 'Test: incorrecto, erreur, falsch, fel, feil, fejl, fout, errado, sbagliato, väärin.'));
}
M.push(strMut('a straight apostrophe in the fr title', 'title', 'fr', "L'atelier des lettres"));
M.push(strMut('the {g} placeholder dropped from the da done line', 'a11yDone', 'da', 'Du skrev det.'));
M.push(strMut('an empty string in a locale', 'a11yPrint', 'sv', ''));
M.push(strMut('a score word in the nl gate line', 'gateNames', 'nl', 'Verzamel punten en badges met Premium.'));
M.push(strMut('⭐ the German title is served in English', 'title', 'de', 'Letter Studio'));

/* --------------------------------------------------------------------- */

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ls-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));
const tmpTool = path.join(tmp, 'letter-studio.js');

const run = (gate, timeout) => {
  try {
    execFileSync(process.execPath, [gate], {
      env: Object.assign({}, process.env, { LS_TOOL_DIR: tmp }),
      timeout: timeout, stdio: 'pipe'
    });
    return 'ok';
  } catch (e) {
    if (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code))) return 'hang';
    return 'died';
  }
};

/* baseline: every gate MUST pass on the unmutated tool, or nothing below
   means anything. ⚠ This is the CONTROL, and it runs the browser gates
   too — a tmp dir missing one carried file would otherwise make every
   needle look "killed". */
fs.writeFileSync(tmpTool, ORIGINAL, 'utf8');
if (run(GATE, TIMEOUT) !== 'ok') {
  console.error('FATAL: verify-letter-studio.js fails on the UNMUTATED tool — fix that first.');
  process.exit(1);
}
if (!FAST) {
  for (const g of BROWSER_GATES) {
    if (run(g.file, g.timeout) !== 'ok') {
      console.error(`FATAL: ${g.name} fails on the UNMUTATED tool in the tmp dir — fix that first.`);
      process.exit(1);
    }
  }
}
console.log(`baseline: ${FAST ? 'the model gate passes' : 'all three gates pass'} on the unmutated tool\n`);

let killed = 0, browserKills = 0, skipped = 0;
const survived = [], faults = [];
const list = ONLY ? M.filter(m => m[0].indexOf(ONLY) >= 0) : M;

for (const [label, from, to] of list) {
  if (typeof from === 'string' && from.indexOf(' NO-ANCHOR ') === 0) {
    faults.push(label + ' (locale anchor not found:' + from.replace(' NO-ANCHOR ', ' ') + ')');
    continue;
  }
  if (ORIGINAL.indexOf(from) === -1) { faults.push(label + ' (needle not found in the tool)'); continue; }
  const mutated = ORIGINAL.replace(from, to);
  if (mutated === ORIGINAL) { faults.push(label + ' (inert — the patch changed nothing)'); continue; }

  fs.writeFileSync(tmpTool, mutated, 'utf8');

  const v = run(GATE, TIMEOUT);
  if (v === 'hang') { survived.push(label + '  (the model gate HUNG — that is a survival)'); continue; }
  if (v === 'died') { killed++; console.log('  killed (verify)     ' + label); continue; }

  if (FAST) { skipped++; console.log('  SKIPPED (--fast)    ' + label); continue; }

  /* only verify-survivors pay the browser cost */
  let done = false;
  for (const g of BROWSER_GATES) {
    const b = run(g.file, g.timeout);
    if (b === 'hang') { survived.push(label + `  (${g.name} HUNG — that is a survival)`); done = true; break; }
    if (b === 'died') { killed++; browserKills++; console.log(`  killed (${g.name.padEnd(10)}) ` + label); done = true; break; }
  }
  if (!done) survived.push(label);
}

console.log('');
console.log(`${killed} killed, ${survived.length} survived, ${skipped} skipped, ${faults.length} harness fault(s) of ${list.length}`);
if (!FAST) console.log(`  ${browserKills} of those were killed ONLY by a browser gate`);
if (faults.length) {
  console.error('\nHARNESS FAULTS (a mutation that was never actually tested):');
  for (const f of faults) console.error('  ' + f);
}
if (survived.length) {
  console.error('\nSURVIVED (no gate sees these):');
  for (const s of survived) console.error('  ' + s);
}
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
if (survived.length || faults.length) { console.error('\nFAIL — the gate has a hole, or a needle is misanchored'); process.exit(1); }
if (FAST) { console.error('\n--fast: browser-only needles were SKIPPED. This is a triage run, not a pass.'); process.exit(1); }
console.log('\nPASS — every mutation killed');
