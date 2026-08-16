/* =====================================================================
   VERIFY — TOOL #58, THE QUEUE  (Counting & Cardinality rebuild)
   =====================================================================
   Static + model gate, no browser. The oracle is defined here from plain
   meaning — it NEVER reads the expectation off the tool (marking its own
   homework let 19/51 mutations survive on number-sieve). Every ban is
   poisoned in BOTH directions by mutate-the-queue.js; this file only has
   to be a faithful, independent judge.

   Run: node scripts/verify-the-queue.js
   Env: QUE_TOOL_DIR overrides the mini-tools dir (mutate copies into tmp).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = process.env.QUE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const JS = path.join(ROOT, 'the-queue.js');
const SRC = fs.readFileSync(JS, 'utf8');
const T = require(JS);

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let fails = 0, checks = 0;
function ok(c, m) { checks++; if (!c) { fails++; console.log('  FAIL: ' + m); } }
function head(s) { console.log('\n' + s); }

/* an independent oracle: a line counted k from the LEFT lands on member
   index k-1 and that member wears k; from the RIGHT it lands on n-k and
   that member wears k. The total is n from either end. */
function oracle(n) {
  return {
    landedA: function (k) { return k < 1 ? null : k - 1; },
    landedB: function (k) { return k < 1 ? null : n - k; },
    total: n,
    selfSame: function (k) { return n % 2 === 1 && k === (n + 1) / 2; }
  };
}
function fixedLine(n) { var m = [], i; for (i = 0; i < n; i++) m.push(i % 6); return { members: m, end: null, k: 0 }; }

/* ---- L0 · NON-VACUITY -------------------------------------------------- */
head('L0 non-vacuity');
ok(T.id === 'the-queue', "id is 'the-queue'");
ok(T.premium === false, 'ships free (premium:false)');
ok(!('tasks' in T) && typeof T.tasks === 'undefined', 'no tasks[] (free-play, emits no alignment)');
ok(Array.isArray(T.settings) && T.settings.length === 1, 'exactly one setting');
ok(T.settings[0] && T.settings[0].key === 'size', 'the setting is size');
var opts = (T.settings[0] && T.settings[0].options) || [];
ok(opts.length === 2 && opts.map(function (o) { return o.value; }).sort().join(',') === 'five,four', 'size options are four/five');
ok(T.defaults && T.defaults.size === 'five', 'default size is five (odd → self-same reachable)');
ok(!T.defaults || !('end' in T.defaults), 'no default end smuggled into defaults');
ok(/CAP:\s*6/.test(SRC), 'CAP is 6');
ok(/MIN:\s*3/.test(SRC), 'MIN is 3');
var FRIENDS = (SRC.match(/var FRIENDS = \[([\s\S]*?)\];/) || [])[1] || '';
ok((FRIENDS.match(/fill:/g) || []).length === 6, 'FRIENDS declares 6 members');
ok(T.size('four') === 4 && T.size('five') === 5, 'size() maps four→4 five→5');

/* ---- L1 · THE INVARIANCE, EXHAUSTIVELY --------------------------------- */
head('L1 order-of-count invariance (exhaustive n∈{3,4,5,6}, both ends, every k)');
var coincidences = 0, differ = 0;
[3, 4, 5, 6].forEach(function (n) {
  var st = fixedLine(n), o = oracle(n);
  ok(T.n(st) === n, 'n=' + n);
  ok(T.endOf(st) === null, 'no default end n=' + n);
  ok(T.landedIndex(st) === null, 'no landed member at rest n=' + n);
  var a = T.pickEnd(st, 'a'), b = T.pickEnd(st, 'b');
  for (var k = 1; k <= n; k++) {
    var la = T.sweepTo(a, k), lb = T.sweepTo(b, k);
    ok(T.landedIndex(la) === o.landedA(k), 'landed from a k=' + k + ' n=' + n);
    ok(T.landedIndex(lb) === o.landedB(k), 'landed from b k=' + k + ' n=' + n);
    ok(T.memberAtSlot(la, k - 1) === o.landedA(k), 'memberAtSlot a k=' + k + ' n=' + n);
    ok(T.memberAtSlot(lb, k - 1) === o.landedB(k), 'memberAtSlot b k=' + k + ' n=' + n);
    ok(T.mirrorK(st, k) === n + 1 - k, 'mirrorK k=' + k + ' n=' + n);
    ok(T.isSelfSame(st, k) === o.selfSame(k), 'isSelfSame k=' + k + ' n=' + n);
    if (T.landedIndex(la) === T.landedIndex(lb)) coincidences++; else differ++;
  }
  /* the total (last tag) is n from BOTH ends — the spine */
  ok(T.sweepTo(a, n).k === n && T.sweepTo(b, n).k === n, 'last tag = n both ends n=' + n);
  /* self-same exists iff odd n, exactly at the middle */
  var mids = [];
  for (var k2 = 1; k2 <= n; k2++) if (T.isSelfSame(st, k2)) mids.push(k2);
  if (n % 2 === 1) ok(mids.length === 1 && mids[0] === (n + 1) / 2, 'one self-same at mid, odd n=' + n);
  else ok(mids.length === 0, 'no self-same, even n=' + n);
});
/* over n=3..6 the self-same coincidences are exactly the odd-n middles: n=3,5 → 2 */
ok(coincidences === 2, 'exactly 2 self-same coincidences across n=3..6 (got ' + coincidences + ')');
ok(differ > 0, 'the vast majority of counts differ (position is not invariant)');

/* ---- L2 · NO DEFAULT END, and the deal is honest ----------------------- */
head('L2 no default end');
(function () {
  var i, bad = 0, notDistinct = 0, aliased = 0;
  for (i = 0; i < 4000; i++) {
    var st = T.newState('five');
    if (st.end !== null || st.k !== 0) bad++;
    var seen = {}; st.members.forEach(function (m) { seen[m] = 1; });
    if (Object.keys(seen).length !== st.members.length) notDistinct++;
    /* moves must refuse with no end */
    if (T.step(st, 1) !== null || T.sweepTo(st, 2) !== null) bad++;
    /* pickEnd must return a NEW array (aliasing is the real defect) */
    var p = T.pickEnd(st, 'a');
    if (p.members === st.members) aliased++;
  }
  ok(bad === 0, 'every deal arrives end:null k:0 and refuses moves with no end');
  ok(notDistinct === 0, 'every dealt line has distinct friends');
  ok(aliased === 0, 'pickEnd copies the members array (no aliasing)');
  /* control: an advance actually advances */
  var a = T.pickEnd(fixedLine(4), 'a');
  ok(T.sweepTo(a, 1).k === 1 && T.sweepTo(a, 4).k === 4, 'sweepTo advances (control)');
})();

/* ---- L3 · JOIN / LEAVE (premium depth), bounded & distinct ------------- */
head('L3 join / leave');
(function () {
  T._rng = Math.random;
  var l3 = T.pickEnd(fixedLine(3), 'a'), l6 = T.pickEnd(fixedLine(6), 'a');
  ok(T.leave(l3) === null, 'leave refuses at MIN 3');
  ok(T.join(l6) === null, 'join refuses at CAP 6');
  var j = T.join(T.pickEnd(fixedLine(4), 'a'));
  ok(j && T.n(j) === 5 && j.k === 0, 'join grows 4→5 and re-counts (k:0)');
  var lv = T.leave(T.pickEnd(fixedLine(5), 'a'));
  ok(lv && T.n(lv) === 4 && lv.k === 0, 'leave shrinks 5→4 and re-counts (k:0)');
  /* join keeps friends distinct */
  var many = 0, notDistinct = 0, base;
  for (var i = 0; i < 500; i++) {
    base = T.pickEnd({ members: [0, 1, 2, 3], end: null, k: 0 }, 'a');
    var jj = T.join(base); var seen = {}; jj.members.forEach(function (m) { seen[m] = 1; });
    if (Object.keys(seen).length !== jj.members.length) notDistinct++;
    many++;
  }
  ok(notDistinct === 0, 'join always adds a DISTINCT friend (' + many + ' trials)');
})();

/* ---- L4 · EVERY CONSTANT REACHES A CALL SITE + MOTION LAWS -------------- */
head('L4 no dead constant, persistent-hand motion law');
(function () {
  var geoBlock = (SRC.match(/var GEO = \{([\s\S]*?)\n  \};/) || [])[1] || '';
  /* a NAME is a property declaration — a colon followed by a NUMBER; this
     excludes prose like "⚠ T_, NOT SND_: this one is MILLISECONDS" */
  var names = [];
  geoBlock.replace(/([A-Z_]{2,}):\s*[-0-9.]/g, function (_, nm) { names.push(nm); return _; });
  ok(names.length >= 12, 'GEO parses ≥12 constants (got ' + names.length + ')');
  var body = SRC.slice(SRC.indexOf('var TheQueue'));
  names.forEach(function (nm) {
    ok(new RegExp('GEO\\.' + nm + '\\b').test(body), 'GEO.' + nm + ' reaches a call site');
  });
  ok(/--que-dur/.test(SRC) && /setProperty\('--que-dur'/.test(SRC) && /var\(--que-dur/.test(SRC), '--que-dur is both written and read');
  /* the hand is built once and NEVER re-inserted in _paint */
  var paint = (SRC.match(/_paint: function[\s\S]*?\n    \},/) || [''])[0];
  ok(!/svg\.innerHTML/.test(paint) && !/_svg\.innerHTML/.test(paint), '_paint does not wipe the svg with innerHTML');
  ok(!/appendChild\(\s*hand\s*\)/.test(paint) && !/appendChild\(this\._hand\)/.test(paint), '_paint never re-appends the hand');
  ok((SRC.match(/this\._hand = document\.createElementNS/g) || []).length === 1, 'the hand is created exactly once (in _build)');
  ok(/hand\.style\.display = 'none'/.test(paint), 'the hand is HIDDEN, not removed, when parked');
})();

/* ---- L5 · NO ORDER IN THE MATERIAL ------------------------------------- */
head('L5 no order in the material');
(function () {
  ok(!/rotate|matrix|scale\(/.test((SRC.match(/_friend: function[\s\S]*?\n    \},/) || [''])[0]), 'no rotate/scale/matrix on a friend');
  /* the badge is drawn only for swept slots (i < k) → transient; a resting
     friend wears no numeral */
  var paint = (SRC.match(/_paint: function[\s\S]*?_total\(/) || [''])[0];
  ok(/for \(i = 0; i < s\.k; i\+\+\)/.test(paint), 'badges are drawn only for i < k (transient, un-accrete on drag-back)');
  /* FRIENDS names carry no order/size/number */
  ok(!/size|rank|order|\d(?![0-9A-Fa-f])/.test(FRIENDS.replace(/#[0-9A-Fa-f]{6}/g, '')), 'FRIENDS carries no size/rank/order/number');
})();

/* ---- L6 · STRINGS + REFUSE-LIST ---------------------------------------- */
head('L6 strings + refuse-list');
(function () {
  var keys = Object.keys(T.strings);
  ok(keys.length >= 20, '≥20 string keys (got ' + keys.length + ')');
  var missing = 0;
  keys.forEach(function (k) {
    LOCALES.forEach(function (loc) { if (!T.strings[k] || !T.strings[k][loc]) missing++; });
  });
  ok(missing === 0, 'every key has all 11 locales (' + missing + ' gaps)');
  /* POSITION-WORD ban on the apparatus/controls — no ordinal words. The
     bans list the ordinal words in several languages; the size words
     four/five and 'quatre'/etc. are cardinal and exempt. */
  var ORD = /\b(first|second|third|fourth|fifth|erste|zweite|dritte|premier|deuxième|troisième|primero|segundo|tercero|primo|secondo|terzo|eerste|tweede|derde)\b/i;
  var EFF = /\b(proven|research shows|evidence|efficacy|boosts?|improves? (?:test|scores)|guaranteed)\b/i;
  var TIMER = /\b(timer|countdown|streak|score|seconds left|beat the clock)\b/i;
  var offenders = 0;
  keys.forEach(function (k) {
    LOCALES.forEach(function (loc) {
      var v = String(T.strings[k][loc]);
      if (ORD.test(v)) { offenders++; console.log('    POSITION-WORD in ' + k + '.' + loc + ': ' + v); }
      if (EFF.test(v)) { offenders++; console.log('    EFFICACY in ' + k + '.' + loc + ': ' + v); }
      if (TIMER.test(v)) { offenders++; console.log('    TIMER/SCORE in ' + k + '.' + loc + ': ' + v); }
    });
  });
  ok(offenders === 0, 'no position-word / efficacy / timer-score string');
  /* every {token} used in a string is supplied by the render (n or k) */
  var badTok = 0;
  keys.forEach(function (k) {
    LOCALES.forEach(function (loc) {
      var toks = String(T.strings[k][loc]).match(/\{(\w+)\}/g) || [];
      toks.forEach(function (tk) { if (tk !== '{n}' && tk !== '{k}') badTok++; });
    });
  });
  ok(badTok === 0, 'the only interpolation tokens are {n} and {k}');
  /* every key the render/build asks for via api.t(...) is authored. The
     't' must NOT be preceded by a letter, or `createElement('button')`
     reads as a `t('button')` call (the ban-too-wide trap in miniature). */
  var asked = [];
  SRC.replace(/(?<![A-Za-z])t\(['"]([a-zA-Z]+)['"]\)/g, function (_, k) { asked.push(k); return _; });
  var authored = {}; keys.forEach(function (k) { authored[k] = 1; });
  var unauthored = asked.filter(function (k) { return !authored[k]; });
  ok(unauthored.length === 0, 'every requested string key is authored (' + unauthored.join(',') + ')');
})();

/* ---- L7 · STYLESHEET --------------------------------------------------- */
head('L7 stylesheet');
(function () {
  ok(/'html\.que-scroll\{overflow-y:auto;height:auto;min-height:100%\}'/.test(SRC), 'html scroll rule is its own rule');
  ok(/'body\.que-scroll\{overflow-y:auto;height:auto;min-height:100%\}'/.test(SRC), 'body scroll rule is its own rule (not a selector list)');
  var css = (SRC.match(/injectCSS: function[\s\S]*?document\.head/) || [''])[0];
  /* ⚠ NOT /\bvh\b/ — a leading \b can never match "50vh" (the char before
     'v' is the digit '0', a word char, so there is no boundary there). The
     forbidden thing is the UNIT: a number immediately followed by vh. */
  ok(!/[0-9.]\s*vh\b/.test(css), 'no vh unit inside the manipulative');
  ok(/@media print\{[^}]*\.lcs-header[^}]*\.que-wrap/.test(css.replace(/\n/g, '')) || /lcs-header,\.lcs-controls,\.que-wrap\}\{display:none/.test(css.replace(/\s/g,'')) || /lcs-header,\.lcs-controls,\.que-wrap\{display:none/.test(css), 'print block hides .lcs-header/.lcs-controls/.que-wrap');
  ok(/\.que-sheet\{display:block !important/.test(css), 'print block reveals .que-sheet');
  ok(/\.que-hand\{fill:#F2784B;stroke:#A34122[^}]*transition:transform var\(--que-dur/.test(css), 'the hand keeps its transform transition AND is coral-bounded-by-#A34122');
  /* coral is never a BARE mark — the hand and lit cap both carry #A34122 */
  ok(!/fill:#F2784B(?!;stroke|['")]*[^}]*stroke:#A34122)/.test(css) || /stroke:#A34122/.test(css), 'coral fills are bounded by #A34122');
  /* both print paths check entitlement; fetch degrades to free */
  ok(/beforeprint[\s\S]*?if \(!self\.premium\)/.test(SRC), 'beforeprint guards on premium (Ctrl+P leak closed)');
  ok(/_print: function[\s\S]*?if \(!this\.premium\)/.test(SRC), 'the print button guards on premium');
  ok(/degrades to the FREE tier/.test(SRC) || /catch[\s\S]*premium = false/.test(SRC), 'entitlement fetch degrades to free, never to nothing');
})();

console.log('\n' + (fails === 0 ? 'ALL PASS (' + checks + ' checks)' : fails + ' FAILED of ' + checks));
process.exit(fails === 0 ? 0 : 1);
