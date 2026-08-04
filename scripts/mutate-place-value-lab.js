/* =====================================================================
   mutate-place-value-lab.js — does verify-place-value-lab.js BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-place-value-lab.js

   A green gate proves nothing until it has been shown to go red. Every
   mutation must be KILLED.

   ⚠ THE RECORDED LESSONS, BUILT IN:
     1. CARRY every data file the gate reads into the temp dir, or every
        mutation is "killed" by a missing file and the harness reports a
        clean sweep of nothing.
     2. AN INERT MUTATION IS A HARNESS FAULT, never a silent skip — and
        so is a needle that MISSES. Either shrinks the total while the
        run still says "every mutation killed".
     3. A GATE THAT HANGS COUNTS AS SURVIVED, hence the cap.
     4. NORMALISE LINE ENDINGS BEFORE SEARCHING. Seven needles went blind
        on #43 after a plain `git checkout --` restored the file through
        core.autocrlf. The fix belongs in the HARNESS, not in the working
        copy: a needle that misses because of a line ending is a defect a
        harness must not be able to have.
     5. LOCALE NEEDLES SELF-ANCHOR on the live strings block, never on a
        literal — apply-place-value-lab-fanout.js rewrites that block.

   ⭐ AND THE CORE IS NOT CARRIED. verify- reads place-value-core.js from
   the real tree on purpose: it is what the spliced number-word helpers
   are checked AGAINST, so copying it would let a mutation move both
   sides of the comparison at once and pass.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'place-value-lab.js'), 'utf8').replace(/\r\n/g, '\n');
/* ⚠ CARRY THE REPERTOIRE. Without it every mutation is "killed" by a
   missing file and the harness reports a clean sweep of nothing. */
const CARRY = ['place-value-lab-sets.json'];
const TIMEOUT = 30000;

/* self-anchoring locale needle: reads the CURRENT English value out of
   the live strings block and mutates that. THROWS rather than returning
   null, because a needle that cannot find its key is a fault to surface
   at load, not a mutation to drop quietly from the list. */
function enNeedle(key, replacement, name) {
  const re = new RegExp(key + ":\\s*\\{\\s*en:\\s*'((?:[^'\\\\]|\\\\.)*)'");
  const m = re.exec(SRC);
  if (!m) throw new Error(`enNeedle: no en value for "${key}" in the live strings block`);
  const from = m[0];
  const to = from.slice(0, from.length - m[1].length - 1) + replacement + "'";
  if (to === from) throw new Error(`enNeedle: "${key}" already reads "${replacement}" — the mutation would be INERT`);
  return [name, from, to];
}

const M = [
  /* ---- I1 · the value ceiling, and the family of dead ends it closed - */
  ['the ceiling goes per-place again — the mat can hold what the numeral cannot show',
    'engineMaxValue: function (st) { return st.maxPlaces >= 3 ? 999 : 99; },',
    'engineMaxValue: function (st) { return st.maxPlaces >= 3 ? 9999 : 999; },'],
  ['adding a one stops checking the ceiling',
    'if (this.engineValue(st) + 1 > this.engineMaxValue(st)) return \'cap\';',
    ''],
  ['adding a ten stops checking the ceiling',
    'if (this.engineValue(st) + 10 > this.engineMaxValue(st)) return \'cap\';',
    ''],
  ['adding a hundred stops checking the ceiling',
    'if (this.engineValue(st) + 100 > this.engineMaxValue(st)) return \'cap\';',
    ''],
  ['the two-place ceiling is off by one',
    'return st.maxPlaces >= 3 ? 999 : 99; },',
    'return st.maxPlaces >= 3 ? 999 : 100; },'],

  /* ---- I1 · R2 · bundling must always be available ------------------- */
  ['ten loose ones can stop being bundleable — the dead end returns',
    'engineCanMakeTen: function (st) { return st.o >= 10; },',
    'engineCanMakeTen: function (st) { return st.o >= 10 && st.t < 9; },'],
  ['bundling fires one short',
    'engineCanMakeTen: function (st) { return st.o >= 10; },',
    'engineCanMakeTen: function (st) { return st.o >= 9; },'],
  ['making a ten loses a one',
    'engineMakeTen: function (st) { if (st.o >= 10) { st.o -= 10; st.t += 1; return true; } return false; },',
    'engineMakeTen: function (st) { if (st.o >= 10) { st.o -= 11; st.t += 1; return true; } return false; },'],
  ['making a hundred does not preserve the value',
    'if (st.t >= 10 && st.maxPlaces >= 3) { st.t -= 10; st.h += 1; return true; }',
    'if (st.t >= 10 && st.maxPlaces >= 3) { st.t -= 9; st.h += 1; return true; }'],
  ['breaking a ten invents a one',
    'engineBreakTen: function (st) { if (st.t >= 1 && st.o <= 9) { st.t -= 1; st.o += 10; st._decomposed = true; return true; } return false; },',
    'engineBreakTen: function (st) { if (st.t >= 1 && st.o <= 9) { st.t -= 1; st.o += 11; st._decomposed = true; return true; } return false; },'],
  ['breaking a hundred is silently lossy',
    'engineBreakHundred: function (st) { if (st.h >= 1 && st.t <= 9) { st.h -= 1; st.t += 10; st._decomposed = true; return true; } return false; },',
    'engineBreakHundred: function (st) { if (st.h >= 1 && st.t <= 9) { st.h -= 1; st.t += 9; st._decomposed = true; return true; } return false; },'],

  /* ---- I1 · R3 · AUTO must mean what its own label says --------------- */
  ['⭐ AUTO stops cascading tens into a hundred — the label lies again',
    'if (st.maxPlaces >= 3 && st.h < 9) { st.h += 1; st.t = 0; return \'snapped\'; }\n      return \'cap\';\n    }\n    var cap = st.maxPlaces >= 3 ? 19 : 9;',
    'return \'cap\';\n    }\n    var cap = st.maxPlaces >= 3 ? 19 : 9;'],
  ['AUTO stops cascading ones into a ten',
    'if (st.t < 9) { st.t += 1; st.o = 0; return \'snapped\'; }',
    ''],

  /* ---- the value function itself -------------------------------------- */
  ['value forgets the hundreds',
    'engineValue: function (st) { return st.h * 100 + st.t * 10 + st.o; },',
    'engineValue: function (st) { return st.t * 10 + st.o; },'],
  ['value weighs a ten as nine',
    'engineValue: function (st) { return st.h * 100 + st.t * 10 + st.o; },',
    'engineValue: function (st) { return st.h * 100 + st.t * 9 + st.o; },'],

  /* ---- the subtract grader: it must judge the METHOD --------------- */
  ['the grader stops caring whether a regroup was needed',
    'if (st._decomposed !== needed) return false;', ''],
  ['the grader demands a break on EVERY problem again',
    'if (st._decomposed !== needed) return false;', 'if (st._decomposed !== true) return false;'],
  ['⭐ the removal record goes unread again — the grade is a value and a flag',
    'if ((rec.removedT * 10 + rec.removedO) !== b) return false;', ''],
  ['the removal record is compared to the wrong number',
    'if ((rec.removedT * 10 + rec.removedO) !== b) return false;',
    'if ((rec.removedT * 10 + rec.removedO) !== a) return false;'],
  ['the grader stops requiring a tidy mat',
    'if (st.o > 9 || st.t > 9) return false;', ''],
  ['the grader accepts a wrong difference',
    'if (this.engineValue(st) !== a - b) return false;', ''],
  ['⭐ the borrow test reads the wrong digits',
    'var needed = (b % 10) > (a % 10);', 'var needed = (a % 10) > (b % 10);'],
  ['canonical stops noticing a full tens column',
    'engineCanonical: function (st) { return st.o <= 9 && st.t <= 9; },',
    'engineCanonical: function (st) { return st.o <= 9; },'],
  ['⭐ every subtraction problem forces a borrow again — the decision is taken away',
    'var bo = 1 + Math.floor(Math.random() * 8);           /* 1-8, free */',
    'var bo = ao + 1 + Math.floor(Math.random() * (9 - ao));'],
  /* ⚠ re-anchored: this needle used to span the line BELOW it too, and
     went blind the moment a comment was inserted between them. Anchor on
     the smallest unique piece of CODE. */
  ['the blocks to remove are pre-marked again — the thinking is handed over',
    'this._marked = null;\n    /* ⚠ the subRemove note',
    'this._marked = { tens: bt, ones: bo };\n    /* ⚠ the subRemove note'],
  ['⚠ adding is allowed in the subtract lab again',
    "if (this.mode !== 'sub') {\n      var add = api.el('button', 'pvl-add pvl-hue-' + pl);",
    "if (true) {\n      var add = api.el('button', 'pvl-add pvl-hue-' + pl);"],

  /* ---- I3 · the theorem: the spans must partition the VALUE ----------- */
  ['⭐ a German ones span names nothing — a lump wearing a part name',
    "var os={t:A[o],p:'ones',v:o};", "var os={t:A[o],p:'ones',v:0};"],
  ['an English ten-marker names a ten as nine',
    "{t:'teen',p:'tenMark',v:10}", "{t:'teen',p:'tenMark',v:9}"],
  ['the French score-marker names eighty as sixty',
    "{t:'quatre-vingt',p:'scoreMark',v:80},{t:'-',p:'joiner',v:0},{t:L[o],p:'ones',v:o}",
    "{t:'quatre-vingt',p:'scoreMark',v:60},{t:'-',p:'joiner',v:0},{t:L[o],p:'ones',v:o}"],
  ['a French joiner starts naming something',
    "{t:' et ',p:'joiner',v:0},{t:'onze',p:'atom',v:11}",
    "{t:' et ',p:'joiner',v:1},{t:'onze',p:'atom',v:11}"],
  ['a Finnish hundreds span names its digit, not its value',
    "out=[{t:hw,p:'hundreds',v:h*100}];if(r===0)return out;return out.concat(s99(r)); }",
    "out=[{t:hw,p:'hundreds',v:h}];if(r===0)return out;return out.concat(s99(r)); }"],
  ['the Danish tens span names the digit',
    "return[{t:L[o],p:'ones',v:o},{t:'og',p:'joiner',v:0},{t:T[t],p:'tens',v:t*10}];",
    "return[{t:L[o],p:'ones',v:o},{t:'og',p:'joiner',v:0},{t:T[t],p:'tens',v:t}];"],

  /* ---- part hygiene: a retired part must stay retired ----------------- */
  ['⭐ the teen blob comes back — the analysis is avoided again',
    "if(m<13)return[{t:L[m],p:'atom',v:m}];if(m<20){var u=m-10,sp={t:ST[u],p:'ones',v:u};if(ST[u]!==L[u])sp.lemma=L[u];return[sp,{t:'teen',p:'tenMark',v:10}];}",
    "if(m<20)return[{t:L[m],p:'teen',v:m}];"],
  ['a lemma is attached to a form identical to itself',
    "if(ST[u]!==L[u])sp.lemma=L[u];return[sp,{t:'teen',p:'tenMark',v:10}];",
    "sp.lemma=L[u];return[sp,{t:'teen',p:'tenMark',v:10}];"],

  /* ---- byte-equality against the protected core ----------------------- */
  ['the German hundreds word drops its ones prefix',
    "out=[{t:A[h]+'hundert',p:'hundreds',v:h*100}]",
    "out=[{t:'hundert',p:'hundreds',v:h*100}]"],
  ['the Spanish y-joiner becomes a bare space',
    "{t:' y ',p:'joiner',v:0}", "{t:' ',p:'joiner',v:0}"],

  /* ---- the repertoire: the inline fallback IS the free tier ---------- */
  ['⭐ the offline fallback degrades to NOTHING — the arrow-strip defect',
    'SHOW_POOL: [4, 7, 10, 12, 14, 16, 20, 24, 30, 42, 47, 71, 91, 100, 124, 147],',
    'SHOW_POOL: [],'],
  ['the offline fallback leaks a PAID entry',
    'SHOW_POOL: [4, 7, 10, 12, 14, 16, 20, 24, 30, 42, 47, 71, 91, 100, 124, 147],',
    'SHOW_POOL: [4, 7, 10, 12, 14, 16, 20, 24, 30, 42, 47, 71, 91, 100, 124, 999],'],
  ['the free tier is served to everyone — the paid layer evaporates',
    'var rows = this.premium ? this._sets : this._setsFree;',
    'var rows = this._sets;'],

  /* ---- the strings, self-anchored ------------------------------------- */
  enNeedle('showPrompt', 'Can you build it?', 'the {n} placeholder is dropped from the Show me prompt'),
  enNeedle('subDone', 'Well done!', 'the subtract summary loses every placeholder'),
  enNeedle('colTens', '', 'an English column label goes empty'),
];

/* the mutations a DOM-free gate cannot see — routed to local-test.
   ⚠ Every name here MUST exist in M, or the routing is a no-op that
   silently sends a DOM mutation to the blind gate again. */
const DOM_MUTATIONS = new Set([
  '⭐ every subtraction problem forces a borrow again — the decision is taken away',
  'the blocks to remove are pre-marked again — the thinking is handed over',
  '⚠ adding is allowed in the subtract lab again',
]);
for (const n of DOM_MUTATIONS) {
  if (!M.some((m) => m[0] === n)) throw new Error(`DOM_MUTATIONS names "${n}", which is not in M — the routing would be a no-op`);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pvl-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

let killed = 0;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'place-value-lab.js'), mutated, 'utf8');
  let died = false, why = '';
  /* ⭐ ROUTE TO THE GATE THAT CAN SEE IT. Three of these mutations live
     in _nextSub and _buildCol — whether a problem forces a borrow,
     whether the blocks arrive pre-marked, whether the add buttons render
     in the subtract lab. A DOM-free gate is structurally blind to all
     three, so they SURVIVED, and the honest fix is to run them against
     the browser gate rather than to drop them from the list and report
     a clean sweep. */
  const gate = DOM_MUTATIONS.has(name) ? 'local-test-place-value-lab.js' : 'verify-place-value-lab.js';
  try {
    execFileSync(process.execPath, [path.join(__dirname, gate)], {
      env: Object.assign({}, process.env, { PVL_TOOL_DIR: tmp }),
      timeout: gate === 'verify-place-value-lab.js' ? TIMEOUT : 180000, stdio: 'pipe'
    });
  } catch (e) {
    died = true;
    why = (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code))) ? 'TIMEOUT' : 'gate';
  }
  if (died && why === 'TIMEOUT') survived.push(`${name} (the gate HUNG — that is a survival)`);
  else if (died) killed++;
  else survived.push(name);
}

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) { }

console.log(`mutations: ${M.length}   killed: ${killed}   survived: ${survived.length}   harness faults: ${harness.length}`);
if (harness.length) { console.error('\nHARNESS FAULTS (never actually tested):'); for (const h of harness) console.error('  ' + h); }
if (survived.length) { console.error('\nSURVIVED (the gate does not see these):'); for (const s of survived) console.error('  ' + s); }
if (survived.length || harness.length) process.exit(1);
console.log('\nPASS — every mutation killed');
