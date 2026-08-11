/* =====================================================================
   mutate-the-gap.js — poison TOOL #56's model and its render, one edit at
   a time, and require `verify-the-gap.js` to notice every one.
   Run:  node scripts/mutate-the-gap.js

   ⚠ A CONTROL RUN COMES FIRST. A crashed gate is indistinguishable from a
   failing one, so an unmutated copy must PASS before any mutation's
   failure means anything.

   ⚠ A MISSING NEEDLE IS A FAULT, NOT A SKIP. A dropped needle silently
   shrinks the total while the run still reports "every mutation killed"
   — #43 lost seven needles to a line-ending change alone.

   ⚠ \r\n IS COLLAPSED BEFORE SEARCHING, in the original AND in the needle.
   `git checkout` normalises line endings through core.autocrlf and
   multi-line needles are silently sensitive to it.

   ⚠ NEEDLES ARE SELF-ANCHORED ON THE SHORTEST DISTINCTIVE FRAGMENT — a
   needle carrying a whole English sentence has a half-life measured in
   one `apply-` run, and a needle carrying the `{ en: '` object shape is
   just as perishable.

   ⚠ EVERY FILE THE GATE READS IS CARRIED INTO THE TMP DIR: this gate
   mounts the tool in a browser, so `lcs-shell.js`, `lcs-shell.css` and
   `the-gap.html` must travel with it or the CONTROL cannot pass.

   ⚠ timeout: 30000. A gate that HANGS is a gate that SURVIVED.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
const VERIFY = path.join(__dirname, 'verify-the-gap.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
/* ⚠ a port of its own, and env-overridable, so a mutation run and a
   probe run can be in flight at the same time without either reporting
   "cannot bind" as a failure */
const PORT = String(Number(process.env.THE_GAP_MUTATE_PORT) || 5687);

/* [label, find, replace] — each must change BEHAVIOUR, not a comment */
const MUTATIONS = [
  /* --- legal(): every clause ---------------------------------------- */
  ['legal drops the integer guard', 'if (n !== Math.round(n) || k !== Math.round(k)) return false;', 'if (false) return false;'],
  ['legal accepts a start under the floor', 'if (n < GEO.FLOOR || n > cap) return false;', 'if (n > cap) return false;'],
  ['legal accepts a start over the cap', 'if (n < GEO.FLOOR || n > cap) return false;', 'if (n < GEO.FLOOR) return false;'],
  ['legal moves the floor down one', 'if (n < GEO.FLOOR || n > cap) return false;', 'if (n < GEO.FLOOR - 1 || n > cap) return false;'],
  ['⭐⭐ legal accepts a change of ONE — one pulse then IS the answer',
    'if (Math.abs(k) < GEO.KMIN) return false;', 'if (k === 0) return false;'],
  ['legal accepts a change of NOTHING', 'if (Math.abs(k) < GEO.KMIN) return false;', 'if (false) return false;'],
  ['legal reads the change unsigned, so taking away is unbounded',
    'if (Math.abs(k) < GEO.KMIN) return false;', 'if (k < GEO.KMIN) return false;'],
  ['⚠ legal lets the ground EMPTY — take-all is a different question',
    'if (m < 1 || m > cap) return false;', 'if (m < 0 || m > cap) return false;'],
  ['legal lets the landing run past the cap', 'if (m < 1 || m > cap) return false;', 'if (m < 1) return false;'],
  ['legal has no landing guard at all', 'if (m < 1 || m > cap) return false;', 'if (false) return false;'],
  ['legal accepts everything', 'if (Math.abs(k) < GEO.KMIN) return false;', 'if (Math.abs(k) < GEO.KMIN) return true;'],
  ['legal computes the landing wrong', 'var m = n + k;\n      if (m < 1', 'var m = n - k;\n      if (m < 1'],

  /* --- the constants ------------------------------------------------- */
  ['GEO.KMIN drops to 1, so the pulse hands the magnitude over', 'KMIN: 2,', 'KMIN: 1,'],
  ['GEO.KMIN rises to 3, silently dropping every change of two', 'KMIN: 2,', 'KMIN: 3,'],
  ['GEO.FLOOR drops to a ground taken in at a glance', 'FLOOR: 3,', 'FLOOR: 1,'],
  ['GEO.FLOOR rises, silently dropping the smallest scenes', 'FLOOR: 3,', 'FLOOR: 4,'],
  ['⭐⭐ the sixteen setting collapses onto the ten setting — a control with no consequence', 'CAP: 16,', 'CAP: 10,'],
  ['the sixteen setting quietly serves ten', "return range === 'sixteen' ? GEO.CAP : 10;", 'return 10;'],
  ['the ten setting quietly serves sixteen', "return range === 'sixteen' ? GEO.CAP : 10;", 'return GEO.CAP;'],

  /* --- scenes(): the enumeration ------------------------------------ */
  /* ⚠ NOT MUTATED, AND THIS NOTE IS THE REASON — both are EQUIVALENT
     MUTANTS, and reading a "survivor" here as a gate gap would send the
     next reader hunting an assertion that cannot exist:
       `n = GEO.FLOOR - 2` — legal() refuses n < FLOOR, so widening the
         loop changes the output by nothing.
       `k <= cap - 3` — the largest change any scene can carry IS cap
         minus the floor, because m = n + k <= cap and n >= 3. The bound
         is already the truth. ⚠ This equivalence DEPENDS on FLOOR being
         3; if the floor ever drops, this becomes a real mutation and
         belongs back in the list. */
  ['the enumeration stops one short of the cap', 'for (n = GEO.FLOOR; n <= cap; n++)', 'for (n = GEO.FLOOR; n < cap; n++)'],
  ['the enumeration never offers the largest TAKE-AWAYS', 'for (k = -cap; k <= cap; k++)', 'for (k = -cap + 3; k <= cap; k++)'],
  ['the enumeration bypasses the legality predicate', 'if (this.legal(n, k, cap)) out.push', 'if (k !== 0) out.push'],
  ['the enumeration mislabels the landing, remapping every pick', 'out.push({ n: n, k: k, m: n + k });', 'out.push({ n: n, k: k, m: n });'],
  ['⭐ the enumeration only ever ADDS — the ground tells one story',
    'for (k = -cap; k <= cap; k++)', 'for (k = GEO.KMIN; k <= cap; k++)'],

  /* --- newState(): the deal ----------------------------------------- */
  ['a fresh scene arrives with the gap already down',
    "phase: 'before', tried: null };", "phase: 'gap', tried: null };"],
  ['a fresh scene arrives with a theory already stated',
    "phase: 'before', tried: null };", "phase: 'before', tried: 2 };"],
  ['the deal drops the range and always serves ten', 'var all = this.scenes(this.cap(range));', "var all = this.scenes(this.cap('ten'));"],
  ['the deal can only ever reach the first half of the pool',
    'Math.floor(Math.random() * all.length)', 'Math.floor(Math.random() * (all.length / 2))'],

  /* --- shown(): THE NON-LEAK ---------------------------------------- */
  ['⭐⭐ the marks are BUILT during the gap — the non-leak becomes a colour',
    "if (s.phase === 'gap') return 0;", "if (s.phase === 'gap') return s.n;"],
  ['⭐⭐ the gap builds the LANDING, handing the answer over',
    "if (s.phase === 'gap') return 0;", "if (s.phase === 'gap') return s.m;"],
  ['⭐⭐ the gap builds the MAGNITUDE, which is the whole answer',
    "if (s.phase === 'gap') return 0;", "if (s.phase === 'gap') return Math.abs(s.k);"],
  ['the gap branch is dropped, so the after-count is drawn under the cover',
    "if (s.phase === 'gap') return 0;", 'if (false) return 0;'],
  ['the `before` phase draws the landing instead of the start', "if (s.phase === 'before') return s.n;", "if (s.phase === 'before') return s.m;"],
  ['the `after` phase draws the start again, so nothing ever changed', '      return s.m;\n    },', '      return s.n;\n    },'],

  /* --- sign(): the only thing the ground may expose ------------------ */
  ['⭐ the direction is REVERSED, so the ground lies', 'return s.k > 0 ? 1 : -1;', 'return s.k > 0 ? -1 : 1;'],
  ['the ground always says something came in', 'return s.k > 0 ? 1 : -1;', 'return 1;'],
  ['⭐⭐ the direction is read off the MAGNITUDE — the ground leaks how much',
    'return s.k > 0 ? 1 : -1;', 'return Math.abs(s.k) > 4 ? 1 : -1;'],

  /* --- advance(): the phase machine --------------------------------- */
  ['the gap is skipped entirely', "if (s.phase === 'before') return { n: s.n, k: s.k, m: s.m, phase: 'gap', tried: null };",
    "if (s.phase === 'before') return { n: s.n, k: s.k, m: s.m, phase: 'after', tried: null };"],
  ['the gap never lifts', "if (s.phase === 'gap') return { n: s.n, k: s.k, m: s.m, phase: 'after', tried: null };",
    "if (s.phase === 'gap') return { n: s.n, k: s.k, m: s.m, phase: 'gap', tried: null };"],
  ['the `after` phase advances into a fourth phase', '      return null;\n    },\n\n    /* ⚠⚠ THE THEORY IS ONLY LIVE',
    "      return { n: s.n, k: s.k, m: s.m, phase: 'before', tried: null };\n    },\n\n    /* ⚠⚠ THE THEORY IS ONLY LIVE"],
  ['⚠ advance MUTATES the state it was given', "if (s.phase === 'gap') return { n: s.n, k: s.k, m: s.m, phase: 'after', tried: null };",
    "if (s.phase === 'gap') { s.phase = 'after'; return s; }"],

  /* --- tryK(): NO ANSWER BEFORE ITS QUESTION ------------------------ */
  ['⚠⚠ a theory can be stated BEFORE the gap has lifted — an answer to a question nobody asked',
    "if (s.phase !== 'after') return null;", 'if (false) return null;'],
  ['the theory guard fires on the wrong phase', "if (s.phase !== 'after') return null;", "if (s.phase === 'after') return null;"],
  ['a theory of ONE is accepted, though the rail never offers it', 'if (Math.abs(k) < GEO.KMIN) return null;', 'if (k === 0) return null;'],
  ['a fractional theory is accepted', 'if (k == null || k !== Math.round(k)) return null;', 'if (k == null) return null;'],
  ['a theory may land outside the arena', 'if (s.n + k < 1 || s.n + k > cap) return null;', 'if (false) return null;'],
  /* ⭐ THE `>= 1` FLOOR, BOTH SIDES. `legal()` refuses a landing on an
     empty ground because take-all is a different question; a move or a
     rail guarding `< 0` instead offers landings the generator would
     never deal. Both needles above went BLIND when that fix landed —
     they read `< 0` — and the harness FAULTED rather than quietly
     shrinking its own total, which is the only reason it was noticed. */
  ['⭐ the theory may land on an EMPTY ground, which the generator refuses',
    'if (s.n + k < 1 || s.n + k > cap) return null;', 'if (s.n + k < 0 || s.n + k > cap) return null;'],
  ['⭐ the rail offers a landing on an EMPTY ground',
    'if (s.n + sg * k < 1 || s.n + sg * k > cap) continue;', 'if (s.n + sg * k < 0 || s.n + sg * k > cap) continue;'],
  ['the same theory can be stated twice', 'if (s.tried === k) return null;', 'if (false) return null;'],
  ['stating a theory rewrites what the class counted', "return { n: s.n, k: s.k, m: s.m, phase: 'after', tried: k };",
    "return { n: s.n, k: s.k, m: s.n + k, phase: 'after', tried: k };"],
  ['⚠ tryK MUTATES the state it was given', "return { n: s.n, k: s.k, m: s.m, phase: 'after', tried: k };",
    's.tried = k; return s;'],

  /* --- clearTry() / lands() ----------------------------------------- */
  ['⚠ a stated theory cannot be cleared, trapping the class in it', 'if (s.tried === null) return null;\n      return { n: s.n',
    'if (true) return null;\n      return { n: s.n'],
  ['clearing the theory also throws the phase away', "return { n: s.n, k: s.k, m: s.m, phase: s.phase, tried: null };",
    "return { n: s.n, k: s.k, m: s.m, phase: 'before', tried: null };"],
  ['lands() is not the start plus the theory', 'return s.n + s.tried;', 'return s.m + s.tried;'],
  ['⭐⭐ lands() becomes a VERDICT instead of a sum', 'return s.n + s.tried;', 'return (s.n + s.tried) === s.m ? s.m : s.n;'],
  ['a landing exists before a theory does', 'if (s.tried === null) return null;\n      return s.n + s.tried;',
    'if (s.tried === null) return s.n;\n      return s.n + s.tried;'],

  /* --- rail(): what the child can actually press -------------------- */
  ['⭐⭐ the TRUE change is not on the rail — the child cannot state it', 'for (k = GEO.KMIN; k <= cap; k++)', 'for (k = GEO.KMIN; k < cap - 2; k++)'],
  ['the rail offers a magnitude of one', 'for (k = GEO.KMIN; k <= cap; k++)', 'for (k = 1; k <= cap; k++)'],
  ['⭐ the rail offers theories AGAINST the direction the ground showed', 'out.push(sg * k);', 'out.push(-sg * k);'],
  ['the rail offers landings outside the arena', 'if (s.n + sg * k < 1 || s.n + sg * k > cap) continue;', 'if (false) continue;'],
  ['the rail ignores the range setting', 'cap = this.cap(range)', "cap = this.cap('sixteen')"],

  /* --- the RENDER, which only L6 can see ---------------------------- */
  /* ⚠ Each of these leaves the model untouched. If verify's four-channel
     block were vacuous — comparing empty strings, or measuring only one
     channel — these would all survive, which is exactly what makes them
     worth carrying. */
  ['⭐⭐ the gap parks the MAGNITUDE in a data attribute — a leak no model gate can see',
    "this._stage.classList.toggle('is-gap', s.phase === 'gap');",
    "this._stage.setAttribute('data-k', String(s.k));\n      this._stage.classList.toggle('is-gap', s.phase === 'gap');"],
  ['⭐⭐ the pulse is sized by the magnitude — fixed amplitude was the claim',
    "this._wave.classList.toggle('is-out', this.sign(s) < 0);",
    "this._wave.style.width = (10 + Math.abs(s.k)) + '%';\n      this._wave.classList.toggle('is-out', this.sign(s) < 0);"],
  ['⭐ the ground stops carrying the direction — the pulse runs the same way both ways',
    "this._wave.classList.toggle('is-out', this.sign(s) < 0);",
    "this._wave.classList.toggle('is-out', false);"],
  ['⚠ a screen-reader user gets the gap and no evidence at all',
    "t(this.sign(s) > 0 ? 'ariaCameIn' : 'ariaWentOut')", "t('ariaCameIn')"],
  ['the stage announces nothing during the gap', "else if (s.phase === 'gap') key = 'ariaGap';", "else if (s.phase === 'gap') key = 'ariaStart';"],
  ['⭐ the pulse runs forever instead of once', "linear 1;opacity:1}'", "linear infinite;opacity:1}'"],

  /* --- dead constants, dead rules, the escapes ---------------------- */
  ['a motion constant stops being read', 'self._dur(GEO.T_REFUSE)', 'self._dur(200)'],
  ['a sound constant stops being read', 'this._snd(GEO.SND_REFUSE, true);', 'this._snd(300, true);'],
  ['the lift duration stops being read, so the named number and the drawn one drift apart',
    "var lift = (GEO.T_LIFT / 1000) + 's';", "var lift = '.25s';"],
  ['⚠⚠ the scroll escape becomes a selector LIST, so its html half is unconditional',
    "'html.crt-scroll{", "'html,body.crt-scroll{"],
  ['the scroll escape loses its html rule', "'html.crt-scroll{", "'html.crt-NOPE{"],
  ['the scroll escape loses its body rule', "'body.crt-scroll{", "'body.crt-NOPE{"],
  ['⚠⚠ the html escape keeps its overflow but loses its HEIGHT, becoming inert',
    "'html.crt-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'html.crt-scroll{overflow-y:auto}'"],
  ['⚠⚠ the body escape becomes inert the same way',
    "'body.crt-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'body.crt-scroll{overflow-y:auto}'"],
  ['the escape class is never added to the document element', "documentElement.classList.add('crt-scroll');", "documentElement.classList.add('crt-nope');"],
  ['a CSS rule is declared twice, the later silently overriding the earlier',
    "'.crt-say{", "'.crt-num{color:#000}',\n        '.crt-say{"],
  ['the print sheet stops resetting the shell', '@media print{.lcs-shell,.crt-wrap{display:none !important}',
    '@media print{.crt-wrap{display:none !important}'],
  ['GEO stops being reachable from a gate', '    GEO: GEO,\n', '\n'],

  /* --- the refuse-list, which is a gate and not a note --------------
     ⚠ anchored on the shortest distinctive fragment of the VALUE, never
     on the surrounding object literal, whose formatting is not the
     copy's business. */
  ['the copy starts marking the class right or wrong', "'That try lands on", "'That try is wrong, it lands on"],
  ['a completeness readout reaches the copy', "'Before the gap:", "'Before the gap, 2 of 7 watched:"],
  ['an efficacy claim reaches the paid copy', "'The sheet is part of", "'A proven sheet is part of"],
  ['a sibling tool\'s part-name reaches the copy — the CURTAIN is the easel\'s',
    "'Show the gap'", "'Show the curtain'"],
  /* ⚠ RE-ANCHORED. This carried the literal `'Try this many'`, which
     that string's own fix removed, so the needle went unmatchable and
     the mutation silently never ran — caught only because a missing
     needle is a FAULT here, not a skip. Anchored on the KEY too now. */
  ['a FOURTH named part gets a noun, and it is a sibling\'s own',
    "      test: {\n        en: 'Try',", "      test: {\n        en: 'Try on the rail',"],
  ['a string carries a token the paint never supplies', 'The ground has {n} marks', 'The ground has {total} marks'],
  ['a string map is flattened, so the shell renders the KEY', '      ariaGap: {', '      ariaGap2: {'],

  /* --- totality ------------------------------------------------------ */
  ['⚠ _st has no fallback, so every button press reads undefined', 'return st || this.st;', 'return st;'],
  ['_st ignores what it is given and always reads the held state', 'return st || this.st;', 'return this.st;'],
  ['_fmt stops substituting', 'return (v && v[k] != null) ? String(v[k]) : mm;', 'return mm;'],
];

function run(dir) {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { THE_GAP_TOOL_DIR: dir, THE_GAP_PORT: PORT }),
      stdio: 'pipe', timeout: 30000
    });
    return 'PASS';
  } catch (e) {
    if (e.killed || /ETIMEDOUT/.test(String(e.code))) return 'TIMEOUT';
    return 'FAIL';
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'crt-mut-'));
/* ⚠ THE GATE MOUNTS THE TOOL IN A BROWSER, so the shell and the wrapper
   travel with it. Copying the whole 390MB directory would be its own
   defect, so the set is named — and if a data file is ever added to this
   tool it MUST be added here too, or the CONTROL will fail loudly rather
   than the mutations passing quietly. */
const srcDir = path.dirname(SRC);
['the-gap.html', 'lcs-shell.js', 'lcs-shell.css'].forEach(function (f) {
  const fp = path.join(srcDir, f);
  if (!fs.existsSync(fp)) { console.log('⚠ FAULT: ' + f + ' is missing — the browser section of the gate cannot run'); process.exit(1); }
  fs.copyFileSync(fp, path.join(tmp, f));
});
const target = path.join(tmp, 'the-gap.js');

console.log('CONTROL: an unmutated copy must PASS');
fs.writeFileSync(target, ORIGINAL);
const control = run(tmp);
console.log('  control = ' + control);
if (control !== 'PASS') {
  console.log('\n*** THE HARNESS IS BROKEN. Every "kill" below would be meaningless.');
  try { execFileSync(process.execPath, [VERIFY], { env: Object.assign({}, process.env, { THE_GAP_TOOL_DIR: tmp, THE_GAP_PORT: PORT }), stdio: 'inherit' }); } catch (e) { /* printed */ }
  process.exit(1);
}

let killed = 0, survived = 0, faults = 0;
console.log('\n' + MUTATIONS.length + ' mutations:');
for (const [label, find, repl] of MUTATIONS) {
  const needle = find.replace(/\r\n/g, '\n');
  const hits = ORIGINAL.split(needle).length - 1;
  if (hits === 0) {
    faults++;
    console.log('  ⚠ FAULT  ' + label + ' — needle not found, the mutation never ran');
    continue;
  }
  fs.writeFileSync(target, ORIGINAL.replace(needle, repl.replace(/\r\n/g, '\n')));
  const r = run(tmp);
  if (r === 'FAIL') { killed++; console.log('  ✓ killed  ' + label); }
  else { survived++; console.log('  ✗ ' + r + '  ' + label); }
}
fs.writeFileSync(target, ORIGINAL);

console.log('\n' + '='.repeat(64));
console.log(`killed ${killed}/${MUTATIONS.length}, survived ${survived}, harness faults ${faults}`);
console.log('='.repeat(64));
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) { /* leave it */ }
process.exit(survived || faults ? 1 : 0);
