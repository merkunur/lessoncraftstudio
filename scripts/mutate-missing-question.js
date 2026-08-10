/* =====================================================================
   mutate-missing-question.js — poison TOOL #55's model, one edit at a
   time, and require `verify-missing-question.js` to notice every one.
   Run:  node scripts/mutate-missing-question.js

   ⚠ A CONTROL RUN COMES FIRST. A crashed gate is indistinguishable from
   a failing one, so an unmutated copy must PASS before any mutation's
   failure means anything.

   ⚠ A MISSING NEEDLE IS A FAULT, NOT A SKIP. A dropped needle silently
   shrinks the total while the run still reports "every mutation killed"
   — #43 lost seven needles to a line-ending change alone.

   ⚠ \r\n IS COLLAPSED BEFORE SEARCHING. git checkout normalises line
   endings through core.autocrlf and multi-line needles are silently
   sensitive to it.

   ⚠ EVERY DATA FILE THE GATE READS IS CARRIED INTO THE TMP DIR. This
   tool loads none — it is numerals and geometry — but the harness copies
   the whole directory anyway so that stays true if it changes.

   ⚠ timeout: 30000. A gate that HANGS is a gate that SURVIVED.

   ⚠ NEEDLES ARE SELF-ANCHORED ON CODE, NEVER ON A STRING'S CURRENT TEXT
   — a needle carrying the English literal has a half-life measured in
   one `apply-` run.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'missing-question.js');
const VERIFY = path.join(__dirname, 'verify-missing-question.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* [label, find, replace] — each must change BEHAVIOUR, not a comment */
const MUTATIONS = [
  /* --- legal(): every clause of the ambiguity predicate ------------ */
  ['legal drops the zero-part guard', 'if (!(b > 0) || !(c > 0)) return false;', 'if (b < 0 || c < 0) return false;'],
  ['legal allows an empty ledge', 'if (!(b > 0) || !(c > 0)) return false;', 'if (!(c > 0)) return false;'],
  ['legal allows an empty air', 'if (!(b > 0) || !(c > 0)) return false;', 'if (!(b > 0)) return false;'],
  ['legal drops the integer guard', 'if (b !== Math.round(b) || c !== Math.round(c)) return false;', 'if (false) return false;'],
  ['legal allows b === c — every question has one answer',
    'if (b === c) return false;', 'if (false) return false;'],
  ['legal allows c === 2b — the difference equals a part',
    'if (c === 2 * b) return false;', 'if (false) return false;'],
  ['legal allows b === 2c — the difference equals a part',
    'if (b === 2 * c) return false;', 'if (false) return false;'],
  ['legal refuses c === 3b instead of 2b', 'if (c === 2 * b) return false;', 'if (c === 3 * b) return false;'],
  ['legal accepts everything', 'if (b === c) return false;', 'if (b === c) return true;'],

  /* --- framesFor(): the enumeration of the deal pool ---------------- */
  ['framesFor skips the last frame', 'for (b = 1; b < a; b++) if (this.legal(b, a - b))', 'for (b = 1; b < a - 1; b++) if (this.legal(b, a - b))'],
  ['framesFor bypasses the ambiguity predicate', 'if (this.legal(b, a - b)) out.push', 'if (true) out.push'],
  /* ⭐ ORDER-ONLY, AND IT SURVIVED THE FIRST RUN. The predicate is
     symmetric in b and c, so swapping the labels yields the IDENTICAL
     SET while silently remapping every `pick`. Killed by an ascending-b
     assertion added to L1 — a set-only check structurally cannot see it. */
  ['framesFor mislabels the parts, remapping every pick', 'out.push({ a: a, b: b, c: a - b });', 'out.push({ a: a, b: a - b, c: b });'],
  ['framesFor lets the parts miss the total', 'out.push({ a: a, b: b, c: a - b });', 'out.push({ a: a, b: b, c: a - b + 1 });'],
  /* ⚠ NOT MUTATED, AND THIS NOTE IS THE REASON: widening the loop to
     `b = 0` is an EQUIVALENT mutant, because legal(0, a) is false and
     the guard filters it. Recording it here so nobody re-adds it and
     reads the resulting "survivor" as a gate gap. */

  /* --- the floor and the cap --------------------------------------- */
  ['GEO.FLOOR drops to 3, where ZERO frames exist', 'FLOOR: 4,', 'FLOOR: 3,'],
  ['GEO.FLOOR rises above the smallest legal total', 'FLOOR: 4,', 'FLOOR: 5,'],
  /* ⚠ CAP: 24 is NOT mutated here — under `flex-wrap` a longer row does
     not overflow, it wraps, so an oversize cap is a RENDER defect and
     the probe owns it (mark >= 12px, region contained, shutter covers
     what it claims). Asserting it in the model gate would mean copying
     the docblock's own arithmetic back at itself. What the model CAN
     see is a setting with no consequence: */
  ['⭐⭐ the sixteen setting collapses onto the ten setting — a control with no consequence', 'CAP: 16,', 'CAP: 10,'],
  ['the sixteen setting quietly serves ten', "return range === 'sixteen' ? GEO.CAP : 10;", 'return 10;'],
  ['the ten setting quietly serves sixteen', "return range === 'sixteen' ? GEO.CAP : 10;", 'return GEO.CAP;'],
  ['the deal runs past the cap', 'for (a = GEO.FLOOR; a <= cap; a++)', 'for (a = GEO.FLOOR; a <= cap + 2; a++)'],
  /* ⚠ NOT MUTATED: starting the deal loop BELOW the floor is an
     EQUIVALENT mutant — framesFor is total and returns [] for every
     a < 4, which is the very property L1 asserts. The floor itself is
     mutated two lines up, where it is observable. */
  ['a fresh frame arrives with a shutter already down',
    'return { a: f.a, b: f.b, c: f.c, ledge: false, air: false, tally: false };',
    'return { a: f.a, b: f.b, c: f.c, ledge: true, air: false, tally: false };'],

  /* --- consistent(): each branch ----------------------------------- */
  ['consistent enumerates with NOTHING hidden',
    'if (!s.ledge && !s.air) return out;', 'if (false) return out;'],
  /* ⭐⭐ THIS SURVIVED THE FIRST RUN, and it is the most important
     mutation in the file: while a = b + c the honest reading and the
     leaking one AGREE on every consistent state, so nothing short of an
     inconsistent probe can tell them apart. Killed by L2's blindness
     block, which corrupts the hidden part and demands the answer not
     move. */
  ['⭐⭐ consistent reads the HIDDEN part instead of the visible one',
    'if (s.ledge && !s.air) return [{ b: s.a - s.c, c: s.c }];', 'if (s.ledge && !s.air) return [{ b: s.b, c: s.c }];'],
  ['consistent reads the hidden part on the air side',
    'if (!s.ledge && s.air) return [{ b: s.b, c: s.a - s.b }];', 'if (!s.ledge && s.air) return [{ b: s.b, c: s.c }];'],
  ['the ledge branch is off by one', 'if (s.ledge && !s.air) return [{ b: s.a - s.c, c: s.c }];',
    'if (s.ledge && !s.air) return [{ b: s.a - s.c + 1, c: s.c }];'],
  ['the air branch reads the wrong part', 'if (!s.ledge && s.air) return [{ b: s.b, c: s.a - s.b }];',
    'if (!s.ledge && s.air) return [{ b: s.b, c: s.a - s.c }];'],
  ['one shutter enumerates every pair, not one',
    'if (s.ledge && !s.air) return [{ b: s.a - s.c, c: s.c }];', 'if (false) return [{ b: s.a - s.c, c: s.c }];'],
  ['both shutters enumerate a zero part', 'for (b = 1; b < s.a; b++) out.push({ b: b, c: s.a - b });',
    'for (b = 0; b < s.a; b++) out.push({ b: b, c: s.a - b });'],
  ['both shutters drop the last decomposition', 'for (b = 1; b < s.a; b++) out.push({ b: b, c: s.a - b });',
    'for (b = 1; b < s.a - 1; b++) out.push({ b: b, c: s.a - b });'],
  ['both shutters enumerate only the AMBIGUOUS pairs, not every decomposition',
    'for (b = 1; b < s.a; b++) out.push({ b: b, c: s.a - b });',
    'for (b = 1; b < s.a; b++) if (this.legal(b, s.a - b)) out.push({ b: b, c: s.a - b });'],

  /* --- showTally(): the null guard, which is the whole law ---------- */
  ['⚠⚠ the tally opens with NOTHING hidden — the tool asks its own question',
    'if (on && this.hidden(s) === 0) return null;', 'if (false) return null;'],
  ['the tally guard counts the wrong thing', 'if (on && this.hidden(s) === 0) return null;',
    'if (on && this.hidden(s) === 2) return null;'],
  /* ⭐ SURVIVED THE FIRST RUN. Invisible while the invariant holds, and
     it traps the class the moment it does not — killed by L3's
     "putting the tally away is never refused". */
  ['⭐ the tally guard fires on HIDING as well as showing, trapping the tally up',
    'if (on && this.hidden(s) === 0) return null;', 'if (this.hidden(s) === 0) return null;'],
  ['the tally can be re-opened while already open', 'if (!!s.tally === !!on) return null;', 'if (false) return null;'],
  /* ⚠ NOT MUTATED: `tally: !s.tally` is an EQUIVALENT mutant. The line
     above returns null unless `on !== s.tally`, so on every path that
     reaches the return the two expressions are the same value. */
  ['hidden() miscounts the shutters', "return (s.ledge ? 1 : 0) + (s.air ? 1 : 0);", 'return 1;'],

  /* --- shut(): the tally must go with the last shutter -------------- */
  ['⚠ opening the last shutter leaves the tally describing nothing',
    'if (!n.ledge && !n.air) n.tally = false;', 'if (false) n.tally = false;'],
  ['closing a second shutter puts the tally away', 'if (!n.ledge && !n.air) n.tally = false;',
    'if (n.ledge && n.air) n.tally = false;'],
  ['shut accepts a region that does not exist',
    "if (which !== 'ledge' && which !== 'air') return null;", 'if (false) return null;'],
  ['shut sets instead of toggling', 'n[which] = !n[which];', 'n[which] = true;'],
  ['shut toggles the OTHER shutter', 'n[which] = !n[which];',
    "n[which === 'ledge' ? 'air' : 'ledge'] = !n[which === 'ledge' ? 'air' : 'ledge'];"],
  ['⚠ shut MUTATES the state it was given',
    'var n = { a: s.a, b: s.b, c: s.c, ledge: s.ledge, air: s.air, tally: s.tally };', 'var n = s;'],
  ['shut loses the frame', 'var n = { a: s.a, b: s.b, c: s.c, ledge: s.ledge, air: s.air, tally: s.tally };',
    'var n = { a: s.a, b: s.c, c: s.b, ledge: s.ledge, air: s.air, tally: s.tally };'],

  /* --- the refuse-list, which is a gate and not a note --------------
     ⚠⚠ SIX OF THESE WENT BLIND AT ONCE when `apply-missing-question-
     locales.js` expanded every key from a one-line `k: { en: 'X' }` to
     an eleven-line object. Four carried a whole English sentence and two
     carried the `{ en: '` shape itself — the recorded half-life trap,
     and the shape is as perishable as the sentence. They are caught only
     because the harness FAULTS on a missing needle instead of skipping
     it; a skip would have shrunk the total while the run still said
     "every mutation killed".
     ⚠ THE RULE NOW: a copy mutation anchors on the SHORTEST DISTINCTIVE
     FRAGMENT OF THE VALUE ITSELF — never on the surrounding object
     literal, whose formatting is not the copy's business. */
  ['a completeness readout reaches the copy',
    "'These are the pairs that fit",
    "'These are the pairs that fit — 4 of 7 found so far,"],
  ['the tally starts judging the class',
    "'Only one number fits", "'Only one number is correct"],
  ['an efficacy claim reaches the paid copy', "'The sheet is part of", "'A proven sheet is part of"],
  ['a locale mine reaches the copy — `pose` is a BAG in da and no',
    "'Something else happens'", "'Pose something else'"],
  ['a fourth part gets a noun, and it is a sibling tool\'s own',
    "'Shutter over the ledge'", "'Shutter over the bench'"],
  /* ⚠ SELF-ANCHORED ON THE KEY AND THE TOKEN, NEVER ON THE SENTENCE.
     The first version carried the whole English literal and went blind
     the moment the copy was reworded. */
  ['a string carries a token the paint never supplies', 'given {a} marks in all', 'given {total} marks in all'],
  /* ⚠ ANCHORED ON THE DECLARATION, which `t('tallyMany')` does not match
     — so the paint keeps asking for a key that no longer exists and the
     shell renders the KEY. Immune to how the object is formatted. */
  ['a string map is flattened, so the shell renders the KEY',
    'tallyMany: {', 'tallyMany2: {'],

  /* --- dead constants, dead properties, dead rules ------------------ */
  ['a motion constant stops being read', 'self._dur(GEO.T_REFUSE)', 'self._dur(200)'],
  ['a sound constant stops being read', 'this._snd(GEO.SND_TALLY);', 'this._snd(780);'],
  /* ⚠ SELF-ANCHORED ON THE SELECTOR, not on the declaration list, which
     grew from two declarations to four while these needles watched. */
  ['⚠⚠ the scroll escape becomes a selector LIST, so its html half is unconditional',
    "'html.mqu-scroll{", "'html,body.mqu-scroll{"],
  ['the scroll escape loses its html rule', "'html.mqu-scroll{", "'html.mqu-NOPE{"],
  ['the scroll escape loses its body rule', "'body.mqu-scroll{", "'body.mqu-NOPE{"],
  /* ⚠⚠ THE INERT FORM. This is the defect two shipped siblings still
     carry: the rule is PRESENT, the class is added, and the shell's
     `height:100%` keeps the document from ever growing. */
  ['⚠⚠ the scroll escape keeps its overflow but loses its HEIGHT, becoming inert',
    "'html.mqu-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'html.mqu-scroll{overflow-y:auto}'"],
  ['the body half of the scroll escape becomes inert',
    "'body.mqu-scroll{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%}'",
    "'body.mqu-scroll{overflow-y:auto}'"],
  /* ⚠ A DUPLICATED RULE IS A SILENT OVERRIDE. The tool briefly shipped
     two copies of this pair, the later undoing part of the earlier. */
  ['a CSS rule is declared twice, the later silently overriding the earlier',
    "'.mqu-bar{", "'.mqu-total{color:#000}',\n        '.mqu-total{"],
  ['the print sheet stops resetting the shell', '@media print{.lcs-shell,.mqu-wrap{display:none !important}',
    '@media print{.mqu-wrap{display:none !important}'],
  ['GEO stops being reachable from a gate', '    GEO: GEO,\n', '\n'],

  /* --- totality ----------------------------------------------------- */
  /* ⚠ SURVIVED THE FIRST RUN. Every act in the tool calls its move with
     a NULL state — `this.shut(null, which)` — so this line is on the
     path of EVERY button press, and a gate that always passes an
     explicit state never touches it. Killed by L3b. */
  ['⚠ _st has no fallback, so every button press reads undefined', 'return st || this.st;', 'return st;'],
  ['_st ignores what it is given and always reads the held state', 'return st || this.st;', 'return this.st;'],
  ['_fmt stops substituting', 'return (v && v[k] != null) ? String(v[k]) : m;', 'return m;'],
];

function run(dir) {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { MISSING_QUESTION_TOOL_DIR: dir }),
      stdio: 'pipe', timeout: 30000
    });
    return 'PASS';
  } catch (e) {
    if (e.killed || /ETIMEDOUT/.test(String(e.code))) return 'TIMEOUT';
    return 'FAIL';
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mqu-mut-'));
/* carry the whole directory, so a future data file travels too */
const srcDir = path.dirname(SRC);
for (const f of fs.readdirSync(srcDir)) {
  const fp = path.join(srcDir, f);
  if (fs.statSync(fp).isFile()) fs.copyFileSync(fp, path.join(tmp, f));
}
const target = path.join(tmp, 'missing-question.js');

console.log('CONTROL: an unmutated copy must PASS');
fs.writeFileSync(target, ORIGINAL);
const control = run(tmp);
console.log('  control = ' + control);
if (control !== 'PASS') {
  console.log('\n*** THE HARNESS IS BROKEN. Every "kill" below would be meaningless.');
  process.exit(1);
}

let killed = 0, survived = 0, faults = 0;
console.log('\n' + MUTATIONS.length + ' mutations:');
for (const [label, find, repl] of MUTATIONS) {
  const hits = ORIGINAL.split(find).length - 1;
  if (hits === 0) {
    faults++;
    console.log('  ⚠ FAULT  ' + label + ' — needle not found, the mutation never ran');
    continue;
  }
  fs.writeFileSync(target, ORIGINAL.replace(find, repl));
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
