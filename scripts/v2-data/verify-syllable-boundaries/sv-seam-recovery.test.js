/* =====================================================================
   ANTI-REGRESSION TEST — sv compound-seam surgical recovery
   ---------------------------------------------------------------------
   Locks the 8 NSR-confirmed seam-recovery overrides (CLAUDE.md §A.13.57)
   and guards the muta/seam ambiguity class against regression. Plain-node
   asserts (no framework, matching the pipeline's script style).
     node sv-seam-recovery.test.js   → exits 0 on pass, 1 on fail
   ===================================================================== */
'use strict';
const assert = require('assert');
const sv = require('./rule-syllabifiers/sv.js');
const gate = require('./gate.js');
const hyph = require('./sources/hyphenation.js');

let failures = 0;
function check(name, fn) {
  try { fn(); console.log('  PASS ' + name); }
  catch (e) { failures++; console.log('  FAIL ' + name + ' — ' + e.message); }
}

// The 8 recovered words: word → [school split, S, N] (S/N are the
// R-independent count sources confirmed from the sv pool snapshot).
const RECOVERED = {
  'havssköldpadda':    [['havs', 'sköld', 'pad', 'da'], 4, null],
  'havssnäcka':        [['havs', 'snäck', 'a'], 3, null],
  'julstrumpa':        [['jul', 'strum', 'pa'], 3, null],
  'blåskrika':         [['blå', 'skri', 'ka'], 3, null],
  'höstack':           [['hö', 'stack'], 2, 2],
  'ljusslingor':       [['ljus', 'sling', 'or'], 3, 3],
  'sjukhusarmband':    [['sjuk', 'hus', 'arm', 'band'], 4, null],
  'förlängningssladd': [['för', 'läng', 'nings', 'sladd'], 4, 4]
};

console.log('sv-seam-recovery — rule R produces the school split:');
for (const [w, [split]] of Object.entries(RECOVERED)) {
  check(w, () => assert.deepStrictEqual(sv.syllabify(w), split));
}

console.log('\nsv-seam-recovery — gate PASSes each recovered word (count-guarded):');
for (const [w, [split, S, N]] of Object.entries(RECOVERED)) {
  check(w, () => {
    const T = hyph.syllabify(w, 'sv');
    const R = sv.syllabify(w);
    const v = gate.evaluate({ T, R, N, W: null, S, C: null }, { locale: 'sv', word: w, minSourcesAgreed: 3 });
    assert.strictEqual(v.verdict, 'PASS', 'verdict=' + v.verdict + (v.reason ? '(' + v.reason + ')' : ''));
    assert.deepStrictEqual(v.syllables, split);
  });
}

// Anti-regression: the muta/seam AMBIGUITY class must stay UNTOUCHED.
// muskler (monomorphemic muta) and påsklilja (real seam) are the
// surface-identical `V s k l V` pair the exact-match override can never
// touch; fiska/borste are the s+stop split the seam fix must not break.
console.log('\nanti-regression — ambiguity class UNTOUCHED:');
const UNCHANGED = {
  'muskler':   ['mus', 'kler'],
  'påsklilja': ['påsk', 'lil', 'ja'],
  'fiska':     ['fis', 'ka'],
  'borste':    ['bors', 'te']
};
for (const [w, split] of Object.entries(UNCHANGED)) {
  check(w, () => assert.deepStrictEqual(sv.syllabify(w), split));
}

// Deliberate exclusions must NOT be in the override map (they stay
// quarantined): busschaufför (not corpus), skridskoåkning (S backs wrong
// count), samtalshjärta (calque, operator-dropped).
console.log('\nexclusions — NOT overridden (rule leaves them as-is):');
check('samtalshjärta not in SCHOOL_COMPOUND_SEAMS',
  () => assert.ok(!sv.SCHOOL_COMPOUND_SEAMS['samtalshjärta']));
check('skridskoåkning not in SCHOOL_COMPOUND_SEAMS',
  () => assert.ok(!sv.SCHOOL_COMPOUND_SEAMS['skridskoåkning']));
check('busschaufför not in SCHOOL_COMPOUND_SEAMS',
  () => assert.ok(!sv.SCHOOL_COMPOUND_SEAMS['busschaufför']));

console.log('\n' + (failures === 0 ? 'ALL TESTS PASSED' : failures + ' TEST(S) FAILED'));
process.exit(failures === 0 ? 0 : 1);
