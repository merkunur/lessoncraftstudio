/* The gate agent's four findings, ruled and applied. It stopped before
   writing the harness because a failing CONTROL makes every "kill" below
   it meaningless — correct sequencing, and the right place to stop.

   A1 ⭐⭐ `--que-dur` was written by the paint and read by NO CSS rule, so
      T_STEP / T_LAND / T_BOARD named a travel that never happened. They
      survive a call-site scan (each is passed to `_paint(dur)`) and die
      in a custom property nothing reads — verbatim #57's `--shp-dur`
      defect, sitting under this file's own line-127 comment forbidding
      it by name. A step TELEPORTED the walker, in a tool whose control
      is called "Step along". RULED: implement the transition. The walker
      is now positioned by `transform`, which is what makes a transition
      possible at all.

   A2 ⭐⭐ `ariaLanded` authored, never asked for. Deleted.
      ⚠ Note a source scan reports THREE dead keys here and two of them
      are live — `sayStepped` is reached through a ternary inside `t()`
      and `sayEndOfLine` is passed as an argument. That is exactly why
      reachability belongs to the Proxy gate and not to a grep.

   A3 ⚠ `ariaWalking` spoke the count `{k}` on the accessible-name
      channel — the ordinal delivered as a cardinal, on the one channel
      no visual audit sees. That is the refuse-list's own ban and it is
      what #57 struck from `aria-valuenow`. The count is also redundant:
      `_step` already announces every step. `{k}` removed.

   A4 ⚠⚠ AND THE SHARPEST ONE, WHICH THE AGENT FILED AS MINOR:
      `sayPickEnd` used the word **"first"** — an ORDINAL WORD, in the
      tool whose binding law is that no string may name a position, and
      whose whole subject is that ordinals are not properties of members.
      `sayDealt` already ships the safe form. Struck. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'the-queue.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => {
  if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 60));
  if (s.split(a).length - 1 !== 1) throw new Error('NOT UNIQUE: ' + a.slice(0, 60));
  s = s.split(a).join(b);
};

/* ---- A4: the ordinal word, in the tool that bans ordinal words ---- */
sub("sayPickEnd: { en: 'Pick an end first — until you do, there is nobody to count from.' },",
    "/* ⚠⚠ was \"Pick an end FIRST\" — an ordinal word, in the tool whose\n" +
    "         binding law is that no string may name a position. */\n" +
    "      sayPickEnd: { en: 'Pick an end — until you do, there is nobody to count from.' },");

/* ---- A3: the cardinal standing for an ordinal, on the aria channel -- */
sub("ariaWalking: { en: 'The walker has taken {k} steps from the chosen end.' },",
    "/* ⚠ the count is struck: an ordinal delivered as a cardinal on the\n" +
    "         one channel no visual audit sees, and `_step` already speaks. */\n" +
    "      ariaWalking: { en: 'The walker has moved along from the chosen end.' },");

/* ---- A2: the dead key ---------------------------------------------- */
sub("      ariaLanded: { en: 'The walker has landed.' },\n", '');

/* ---- A1: make the travel real -------------------------------------- */
sub("        w.setAttribute('points', wx + ',118 ' + (wx - 8) + ',132 ' + (wx + 8) + ',132');",
    "        /* ⭐ POSITIONED BY TRANSFORM, which is what makes the travel\n" +
    "           transitionable at all — drawn at the origin and moved. */\n" +
    "        w.setAttribute('points', '0,118 -8,132 8,132');\n" +
    "        w.setAttribute('transform', 'translate(' + wx.toFixed(1) + ',0)');");

sub("'.que-walker{fill:#A34122}',",
    "'.que-walker{fill:#A34122;transition:transform var(--que-dur,0ms) ease-in-out}',");

/* the custom property must live where the walker can inherit it */
sub("      if (dur) this._stage.style.setProperty('--que-dur', this._dur(dur) + 'ms');",
    "      /* ⚠ set on the STAGE so the walker inherits it. Previously this\n" +
    "         was written and read by nothing at all. */\n" +
    "      this._stage.style.setProperty('--que-dur', (dur ? this._dur(dur) : 0) + 'ms');");

/* ---- A4b: the unused binding --------------------------------------- */
sub("      var s = this.st, api = this.api, t = api.t.bind(api), self = this;\n      var n = this.n(s), i;",
    "      var s = this.st, api = this.api, t = api.t.bind(api);\n      var n = this.n(s), i;");

fs.writeFileSync(P, s);

/* ---- verify, with non-vacuity ------------------------------------- */
delete require.cache[require.resolve(P)];
const T = require(P);
const src = fs.readFileSync(P, 'utf8');
const bad = [];
if (!T.strings.sayPickEnd) bad.push('NON-VACUITY: strings missing entirely');
if (/\bfirst\b/i.test(T.strings.sayPickEnd.en)) bad.push('sayPickEnd still names a position');
if (/\{k\}/.test(JSON.stringify(T.strings))) bad.push('a cardinal count still rides an aria string');
if (T.strings.ariaLanded) bad.push('the dead key is still declared');
if (src.indexOf('transition:transform var(--que-dur') < 0) bad.push('A1: the walker still has no transition');
if (src.indexOf("w.setAttribute('transform'") < 0) bad.push('A1: the walker is not positioned by transform');
if (src.indexOf('self = this;\n      var n') >= 0) bad.push('the unused binding survives');
/* the model must be untouched */
const st = { members: [2, 1, 3, 0], end: 'a', k: 3 };
if (T.landedIndex(st) !== 2) bad.push('MODEL CHANGED: landedIndex from end a');
if (T.landedIndex({ ...st, end: 'b' }) !== 1) bad.push('MODEL CHANGED: landedIndex from end b');
if (bad.length) { console.log('FAILED:\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('A1 travel implemented · A2 dead key deleted · A3 cardinal struck from aria · A4 ordinal word struck; model unchanged (3 from a -> 2, 3 from b -> 1)');
