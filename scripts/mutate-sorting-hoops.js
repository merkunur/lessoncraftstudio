#!/usr/bin/env node
/* =====================================================================
   mutate-sorting-hoops.js — does verify-sorting-hoops.js actually CATCH
   anything, or does it merely agree with the file it is reading?

   Every mutation below is a defect the shipped tool ACTUALLY HAD, or the
   precise inverse of a law this rebuild added. If verify passes on a
   mutant, that law is decoration.

   ⚠ HARNESS RULES, each bought by a recorded defect elsewhere in this
   programme:
     · Needles SELF-ANCHOR on the live file where they can. A needle
       carrying a copy of the text it mutates has a half-life — the moment
       apply-sorting-hoops-locales.js rewrites the strings block for eleven
       locales, every inline English literal goes blind.
     · A MISSING NEEDLE THROWS. It does not skip. Skipping shrinks the
       denominator while the summary line stays cheerful.
     · A NON-UNIQUE NEEDLE IS A FAULT, not a coin toss: it would mutate
       whichever came first, silently.
     · An INERT mutation (from === to) is a bad mutation, not a gate hole.
     · \r\n is collapsed before searching, because `git checkout`
       normalises line endings through core.autocrlf and multi-line
       needles go blind.
     · A CONTROL runs FIRST: the unmutated file must PASS, or no result
       below is interpretable.
     · A TIMEOUT IS SURVIVED, NOT KILLED. A gate that hangs did not run.
     · The tmp dir CARRIES every data file the gate reads, or every
       mutation is "killed" by a missing file and the run reports a clean
       sweep of nothing.

   Usage: node scripts/mutate-sorting-hoops.js [--only=<group>]
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'sorting-hoops.js'), 'utf8').replace(/\r\n/g, '\n');
const CARRY = ['object-attributes.json', 'syllable-counts.json', 'sorting-hoops-pool.json']
  .concat(['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi']
    .map((l) => 'pww-index-' + l + '.json'));
const TIMEOUT = 60000;
const ONLY = (process.argv.find((a) => a.indexOf('--only=') === 0) || '').split('=')[1] || null;

const M = [];
const add = (group, name, from, to) => M.push({ group, name, from, to });

/* ---- self-anchoring helper for the strings block ---- */
function enNeedle(key, replacement, group, name) {
  const re = new RegExp(key + ":(\\s*)\\{ en: '((?:[^'\\\\]|\\\\.)*)'");
  const m = re.exec(SRC);
  if (!m) throw new Error('enNeedle: no en value for "' + key + '"');
  const from = m[0];
  const to = key + ':' + m[1] + "{ en: '" + replacement + "'";
  if (to === from) throw new Error('enNeedle: "' + key + '" already reads that — INERT');
  add(group, name, from, to);
}

/* =====================================================================
   1. THE REFUSAL TABLE — the defect that poisoned the evidence pile
   ===================================================================== */
add('landing', 'landingFor files a misplaced card OUTSIDE (the shipped defect: a whale ' +
  'whose true region was hoop B, dropped into A, was filed outside)',
  "    if (truth === 'out') return { land: 'out', kept: false };\n" +
  "    /* it belongs SOMEWHERE, just not here. It is undecided, not outside. */\n" +
  "    return { land: 'tray', kept: false };",
  "    return { land: 'out', kept: false };");

add('landing', 'landingFor destroys a card instead of re-placing it',
  "    if (truth === target) return { land: target, kept: true };",
  "    if (truth === target) return { land: null, kept: true };");

add('landing', 'landingFor marks a released card as kept',
  "    if (truth === 'out') return { land: 'out', kept: false };",
  "    if (truth === 'out') return { land: 'out', kept: true };");

/* =====================================================================
   2. PAIR VIABILITY — contradiction, nesting, identity, empty overlap
   ===================================================================== */
/* ⚠⚠ A MUTATION THAT WAS PROVABLY INERT, RECORDED RATHER THAN DELETED.
   The obvious mutation here is to disable the same-field guard:
       if (rA.f === rB.f) return false;   ->   if (false) return false;
   It SURVIVED, and the reason is not a gate hole. Two different values of
   one field are DISJOINT BY CONSTRUCTION — an item is one colour — so a
   same-field pair always has `both = 0` and `aOnly = 0`, and the
   four-region test below rejects every one of them on its own. The guard
   is defence-in-depth and cannot change behaviour, so a mutation of it
   cannot be killed by any test of behaviour.
   Removing the guard would be wrong (it states the intent, and it is what
   makes contradiction structurally impossible rather than incidentally
   so); keeping a mutation that can never die would be worse, because a
   permanent survivor trains the reader to ignore the survivor list.
   The identity case is asserted DIRECTLY in verify S5 instead. */

add('pairs', 'an empty OVERLAP is admitted — the lens can never fill',
  '    return s.both >= 2 && s.aOnly >= 2 && s.bOnly >= 2 && s.neither >= 2;',
  '    return s.aOnly >= 2 && s.bOnly >= 2 && s.neither >= 2;');

add('pairs', 'a NESTED pair is admitted (A subset of B: the diagram asserts an A-only region that cannot fill)',
  '    return s.both >= 2 && s.aOnly >= 2 && s.bOnly >= 2 && s.neither >= 2;',
  '    return s.both >= 2 && s.bOnly >= 2 && s.neither >= 2;');

add('pairs', 'pairOK stops being symmetric',
  '    if (!rA || !rB) return true;                    /* one-hoop lessons are fine */',
  '    if (!rA) return true;\n    if (!rB) return false;');

/* =====================================================================
   3. THE RULE FLOOR — unguessable rules reaching the teacher
   ===================================================================== */
add('floor', 'a rule with too few members is offered (habitat:water is 48 of 933 and empties the hoop)',
  '    return yes >= this.ruleFloor(pool) && yes < pool.length;',
  '    return yes > 0 && yes < pool.length;');

add('floor', 'a rule that admits EVERYTHING is offered — it cannot be guessed',
  '    return yes >= this.ruleFloor(pool) && yes < pool.length;',
  '    return yes >= this.ruleFloor(pool);');

add('floor', 'the relative floor becomes absolute again, deleting the 32-block world',
  '    return Math.max(3, Math.min(this.RULE_FLOOR, Math.ceil(pool.length / 4)));',
  '    return this.RULE_FLOOR;');

/* =====================================================================
   4. THE PER-LOCALE SYLLABLE VALUES
   ===================================================================== */
add('syll', 'the syllable values are hardcoded [1,2,3] again — a 1-beat rule in Italian has 8 cards in 933',
  '    for (v = 1; v <= 6; v++) if ((count[v] || 0) >= this.SYLL_FLOOR) out.push(v);',
  '    out = [1, 2, 3];');

add('syll', 'the syllable floor is dropped',
  '  SYLL_FLOOR: 25,',
  '  SYLL_FLOOR: 0,');

/* =====================================================================
   5. THE ENGINE — totality and region agreement
   ===================================================================== */
add('engine', 'satisfies returns undefined for an unknown field',
  '      default:          return false;',
  '      default:          return undefined;');

add('engine', 'satisfies throws on a null item',
  '    if (!rule || !rule.f || !item) return false;',
  '    if (!rule || !rule.f) return false;');

add('engine', 'an item true of BOTH rules no longer lands in the overlap',
  "    if (a && b) return 'both';",
  "    if (a && b) return 'a';");

/* =====================================================================
   6. NO TELL — the hoop must give nothing away before you let go
   ===================================================================== */
add('tell', 'the hover consults the rule',
  '  _hover: function (x, y) {\n    var z = this._regionAt(x, y);',
  '  _hover: function (x, y) {\n    var z = this._regionAt(x, y);\n' +
  '    if (this.ruleA && this.satisfies(this.ruleA, this._itemByUid(this.carry))) z = z;');

/* =====================================================================
   7. NO LEAK — the rule is never shown before the teacher reveals it
   ===================================================================== */
add('leak', 'the rule text is rendered before reveal',
  "    var hidden = this.mode !== 'labelled' && !this.revealed;",
  '    var hidden = false;');

add('leak', 'the LENS loses its caption again (the one region the tool is named for)',
  "      if (hidden) return api.t('capBoth');",
  "      if (hidden) return '';");

/* =====================================================================
   8. THE PALETTE — colour is a sortable attribute here
   ===================================================================== */
add('palette', 'the ring ink goes back to being block blue',
  "    ink:      '#2A2A35',",
  "    ink:      '#2E63B0',");

add('palette', 'two block inks collapse under dichromacy',
  "      green:  { fill: '#5AA36A', line: '#1F5C36' }",
  "      green:  { fill: '#A8271F', line: '#1F5C36' }");

add('palette', 'the redundant colour channel goes back to opt-in',
  '  defaults: { speak: true, patterns: true },',
  '  defaults: { speak: true, patterns: false },');

/* =====================================================================
   9. THE CSS CONTRACT — the hairline and the letterboxing
   ===================================================================== */
add('css', 'the ring stroke returns to the 0.55 CSS-pixel hairline',
  "+ '.hp-ring{fill:none;stroke:' + P.ink + ';stroke-width:5;vector-effect:non-scaling-stroke;}'",
  "+ '.hp-ring{fill:none;stroke:' + P.ink + ';stroke-width:.55;vector-effect:non-scaling-stroke;}'");

add('css', 'the ring box loses its aspect binding — the SVG letterboxes and every zone drifts',
  "+ '.hp-rings{position:relative;width:100%;aspect-ratio:3 / 2;touch-action:none;}'",
  "+ '.hp-rings{position:relative;width:100%;height:260px;touch-action:none;}'");

add('css', 'the print sheet stops being entitlement-gated — Ctrl+P bypasses the paywall',
  '    if (!this.premium) return;',
  '    if (false) return;');

add('css', 'the CSS injector stops being idempotent',
  "  if (document.getElementById('hp-style')) return;",
  '  if (false) return;');

/* =====================================================================
   10. IDENTITY + EXFIL
   ===================================================================== */
add('identity', 'premium defaults to TRUE — unknown entitlement must be pessimistic',
  '  premium: false,\n  premiumKnown: false,',
  '  premium: true,\n  premiumKnown: false,');

add('identity', 'the tool grows a score field',
  "  STORE_KEY: 'lcs:sorting-hoops:v2',",
  "  score: 0,\n  STORE_KEY: 'lcs:sorting-hoops:v2',");

add('identity', 'a beacon is added',
  '  _saveStore: function () {',
  '  _saveStore: function () {\n    try { navigator.sendBeacon("/collect", "x"); } catch (_) {}');

add('identity', 'the sort-bins fence is breached',
  "  _itemByUid: function (uid) {",
  "  _sb: function () { return window.SortBinsCore; },\n  _itemByUid: function (uid) {");

/* =====================================================================
   11. THE STRINGS — dead keys and grading vocabulary
   ===================================================================== */
enNeedle('hintGuessOut', 'Wrong! Try again.', 'strings',
  'a verdict reaches the hint band');
enNeedle('hintGuessRead', 'Score: 4 correct', 'strings',
  'a score reaches the hint band');
enNeedle('capBoth', '', 'strings',
  'an empty en value');

/* ⚠ SELF-ANCHORED, because the literal version ROTTED. This needle first
   carried the English text inline and went blind the moment
   apply-sorting-hoops-locales.js rewrote the strings block for eleven
   locales — the recorded half-life trap, caught here only because a missing
   needle is a FAULT in this harness and not a silent skip. */
(function () {
  const m = /^\s*putBack:\s*\{[^}]*\},$/m.exec(SRC);
  if (!m) throw new Error('putBack needle: the key is not in the tool');
  add('strings', 'a string the tool asks for is deleted', m[0], '');
})();

/* =====================================================================
   12. THE POOL
   ===================================================================== */
add('pool', 'the K-2 pool is ignored and the tray falls back to all 933 cards',
  '    if (pool && pool.keys && pool.keys.length) {',
  '    if (false) {');

/* ------------------------------------------------------------------ */
const targets = ONLY ? M.filter((m) => m.group === ONLY) : M;
if (ONLY && !targets.length) {
  console.error('FAIL --only=' + ONLY + ' matches no mutation; this run would test nothing ' +
    'and report success. Groups: ' + M.map((m) => m.group).filter((v, i, a) => a.indexOf(v) === i).join(', '));
  process.exit(1);
}

console.log('mutate-sorting-hoops — ' + targets.length + ' mutations\n');

/* ---- the CONTROL ---- */
try {
  execFileSync(process.execPath, [path.join(__dirname, 'verify-sorting-hoops.js')], {
    env: Object.assign({}, process.env, { HP_QUIET: '1' }), timeout: TIMEOUT, stdio: 'pipe' });
  console.log('  ok    CONTROL — the unmutated tool passes\n');
} catch (e) {
  console.error('FATAL: the CONTROL failed — verify does not pass on the unmutated file, so no ' +
    'mutation result below is interpretable.\n' + String(e.stdout || '') + String(e.stderr || ''));
  process.exit(1);
}

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'hpmut-'));
let killed = 0;
const survived = [], faults = [];

for (const mut of targets) {
  const idx = SRC.indexOf(mut.from);
  if (idx < 0) { faults.push(mut.name + ' — NEEDLE NOT FOUND'); continue; }
  if (SRC.indexOf(mut.from, idx + 1) >= 0) {
    faults.push(mut.name + ' — NEEDLE IS NOT UNIQUE (' + (SRC.split(mut.from).length - 1) +
      ' matches); it would mutate whichever comes first');
    continue;
  }
  if (mut.from === mut.to) { faults.push(mut.name + ' — INERT'); continue; }

  const dir = fs.mkdtempSync(path.join(tmpRoot, 'm-'));
  fs.writeFileSync(path.join(dir, 'sorting-hoops.js'), SRC.replace(mut.from, mut.to));
  for (const f of CARRY) {
    const s = path.join(TOOLS, f);
    if (fs.existsSync(s)) fs.copyFileSync(s, path.join(dir, f));
  }

  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-sorting-hoops.js')], {
      env: Object.assign({}, process.env, { HP_TOOL_DIR: dir, HP_QUIET: '1' }),
      timeout: TIMEOUT, stdio: 'pipe'
    });
  } catch (e) {
    /* ⚠ a TIMEOUT is SURVIVED, not killed — a gate that hangs did not run */
    if (e.killed || e.signal === 'SIGTERM' || e.code === 'ETIMEDOUT') why = 'TIMED OUT';
    else died = true;
  }
  if (died) { killed++; console.log('  killed   [' + mut.group + '] ' + mut.name); }
  else {
    survived.push('[' + mut.group + '] ' + mut.name + (why ? ' ' + why : ''));
    console.log('  SURVIVED [' + mut.group + '] ' + mut.name + (why ? ' ' + why : ''));
  }
}

try { fs.rmSync(tmpRoot, { recursive: true, force: true }); } catch (_) {}

console.log('');
console.log('  ' + killed + '/' + targets.length + ' killed');
if (faults.length) {
  console.log('  HARNESS FAULTS (' + faults.length + '):');
  faults.forEach((f) => console.log('    ' + f));
}
if (survived.length) {
  console.log('  SURVIVORS (' + survived.length + '):');
  survived.forEach((s) => console.log('    ' + s));
}
if (survived.length || faults.length) process.exit(1);
console.log('  every mutation killed');
