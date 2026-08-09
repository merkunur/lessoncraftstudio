/* =====================================================================
   verify-exchange-machine.js — TOOL #45, exhaustive, Node only
   ---------------------------------------------------------------------
   Run:  node scripts/verify-exchange-machine.js

   ⚠ NO BROWSER WORK IN HERE. mutate-exchange-machine.js runs this file
   once per mutation under a 30s cap, and a gate that hangs is scored as
   SURVIVED — an unbounded loop once let a mutation through on #38.
   Every loop below is bounded by a literal.

   ⭐⭐ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. Reading the expectation
   off the tool means the gate marks its own homework — that is how 19
   of 51 mutations survived on number-sieve. So in here:
     · the digits of a and b are recomputed by an independent
       decimal decomposition, never by calling T.digit();
     · solvability is established by BREADTH-FIRST SEARCH over the
       exchange graph, which is a completely different algorithm from
       the tool's `settled()` predicate;
     · conservation is checked against `a` reconstructed from scratch,
       not against the tool's own value()/handled() pair being equal to
       each other;
     · the lock is checked against the ORIGINAL digits of a, held from
       before any exchange happened.
   ===================================================================== */

'use strict';
const path = require('path');
const DIR = process.env.EXM_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const T = require(path.join(DIR, 'exchange-machine.js'));

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };

/* ⚠⚠ CAPTURED AT LOAD, BEFORE ANY ASSERTION CAN TOUCH IT. The
   entitlement pass below flips `premium` and `FREE_SETTINGS` to probe
   both tiers; restoring from a sibling constant that happens to agree
   (FALLBACK_SETS.freeCount) is how #43 repaired a mutation for it and
   let it survive. Restore from what was DECLARED. */
const DECLARED_FREE = T.FREE_SETTINGS;
const DECLARED_PREMIUM = T.premium;

/* ---------- the oracle: independent of the tool -------------------- */
const oDigits = (n) => {              /* [ones, tens, hundreds], by hand */
  const s = [];
  let v = Math.max(0, Math.min(999, Math.round(n)));
  for (let i = 0; i < 3; i++) { s.push(v % 10); v = Math.floor(v / 10); }
  return s;
};
const oValue = (col) => col[0] + 10 * col[1] + 100 * col[2];

/* the reachable-state walker. Enumerates every legal sequence of
   exchanges and ghost-takes from a start state, bounded hard. */
/* ⚠ THE WALL CLOCK IS PART OF THE CONTRACT, NOT A CONVENIENCE. The
   mutation harness runs this file under a 30s cap and scores a hang as
   a SURVIVAL, so a mutation that makes the state space explode (a
   borrow that creates material, a lane that can be broken twice) must
   still terminate here. Four mutations survived by hanging before this
   deadline existed. */
const DEADLINE = Date.now() + 12000;
function walk(op, a, b, method, cap) {
  const start = T.newState(op, a, b, method);
  const key = (s) => s.col.join(',') + '|' + s.taken.join(',') + '|' +
                     s.moved.map(Number).join('') + '|' + s.carried.map(Number).join('');
  const seen = new Map([[key(start), start]]);
  const queue = [start];
  let guard = 0;
  while (queue.length && guard++ < cap) {
    if ((guard & 255) === 0 && Date.now() > DEADLINE) break;
    const s = queue.shift();
    for (let k = 0; k < 3; k++) {
      for (const n of [T.borrow(s, k), T.carry(s, k), T.unExchange(s, k), T.take(s, k), T.stamp(s, k)]) {
        if (!n) continue;
        const kk = key(n);
        if (!seen.has(kk)) { seen.set(kk, n); queue.push(n); }
      }
    }
  }
  return { states: [...seen.values()], exhausted: queue.length === 0 };
}

console.log('\n— L1 CONSERVATION: nothing arrives and nothing leaves —');
{
  let bad = 0, seen = 0, sample = '';
  for (const [op, a, b] of [
    ['sub', 42, 17], ['sub', 50, 24], ['sub', 204, 137], ['sub', 302, 158],
    ['sub', 600, 245], ['sub', 90, 37], ['add', 38, 25], ['add', 96, 47],
    ['add', 195, 88], ['add', 476, 358]
  ]) {
    const { states } = walk(op, a, b, 'decompose', 20000);
    for (const s of states) {
      seen++;
      /* `a`, rebuilt from scratch: what is still in the tubes plus what
         has been taken away (or minus what has been filled in). */
      const mat = oValue(s.col);
      const done = oValue(s.taken);
      const recon = (op === 'sub') ? (mat + done) : (mat - done);
      if (recon !== a) { bad++; if (!sample) sample = `${op} ${a}/${b} col=${s.col} taken=${s.taken} -> ${recon}`; }
    }
  }
  is(bad === 0, `value is conserved across ${seen.toLocaleString()} reachable states` + (bad ? ` — e.g. ${sample}` : ''));

  /* ⚠ NON-VACUITY, ASSERTED AGAINST THE NAMED SET AND NOT AGAINST A
     NUMBER I LIKED. My first version here demanded "> 2000 states",
     which is an invented threshold — it failed a correct tool at 1,339
     and told me nothing about whether the walk had explored anything
     interesting. What matters is that the walker reached states where
     a ten HAS moved and where ghosts HAVE been taken; a walk that only
     ever saw start states would satisfy any count. */
  const deep = walk('sub', 204, 137, 'decompose', 20000).states;
  is(deep.some((s) => s.moved[2]), 'the walk reached a state where the hundreds had been broken');
  is(deep.some((s) => s.moved[1] && s.moved[2]), 'and one where the cascade had run all the way');
  is(deep.some((s) => s.taken.some((t) => t > 0)), 'and one where material had actually been taken away');

  /* ⚠ A STAMPED STATE IS TEN MOVES DEEP AND THE BREADTH-FIRST WALK
     HITS ITS EXPANSION CAP FIRST — which is a fact about the walker,
     not about the tool, so it gets a DIRECTED probe instead of a
     bigger cap. Raising the cap until a search finds something is how
     a gate quietly becomes a timeout. */
  let run = T.newState('sub', 204, 137, 'decompose');
  run = T.borrow(run, 2); run = T.borrow(run, 1);
  for (let i = 0; i < 7; i++) run = T.take(run, 0);
  is(run !== null && T.ghosts(run, 0) === 0, 'the ones lane can be cleared after the cascade');
  const stamped = T.stamp(run, 0);
  is(stamped !== null && stamped.ans[0] === 7, 'and the digit that goes under the line is the 7 that is left in the tube');
}

console.log('\n— L2 THE LOCK: a mark iff the material moved —');
{
  let bad = 0, marks = 0;
  for (let a = 0; a <= 999; a += 7) {
    for (let b = 0; b <= a; b += 23) {
      const d0 = oDigits(a);                       /* held from BEFORE */
      const { states } = walk('sub', a, b, 'decompose', 400);
      for (const s of states) {
        for (let k = 1; k < 3; k++) {
          if (s.moved[k]) {
            marks++;
            /* the lane that gave is one lighter than it started, and
               the lane to its right is ten heavier — before any ghost
               was taken. taken[] is added back to undo that. */
            /* ⚠ MY FIRST ORACLE HERE WAS WRONG AND THE GATE CAUGHT IT:
               232,854 "mismatches" against a correct tool, because I
               forgot that the RECEIVING lane may itself have given a
               ten away to the lane on its right. Undoing the ghosts is
               not enough; every term has to be undone. */
            const gave = s.col[k] + s.taken[k];
            const got = s.col[k - 1] + s.taken[k - 1];
            const gaveOk = gave === d0[k] - 1 + (s.moved[k + 1] ? 10 : 0);
            const gotOk = got === d0[k - 1] - (s.moved[k - 1] ? 1 : 0) + 10;
            if (!gaveOk || !gotOk) bad++;
          }
        }
      }
    }
  }
  is(marks > 500, `the lock was exercised (${marks.toLocaleString()} marks seen)`);
  is(bad === 0, `every mark corresponds to exactly one ten moved (${bad} mismatches)`);
}

console.log('\n— L3 SOLVABILITY, by an independent search —');
{
  let unsolvable = 0, checked = 0, worst = '';
  for (let a = 0; a <= 999; a += 11) {
    for (let b = 0; b <= a; b += 37) {
      checked++;
      const { states } = walk('sub', a, b, 'decompose', 3000);
      /* the gate's OWN definition of solved: every lane has resolved
         all its ghosts and holds a single digit. Never T.settled(). */
      const ok = states.some((s) => {
        for (let k = 0; k < 3; k++) {
          const gh = oDigits(s.b)[k] - s.taken[k];
          if (gh !== 0) return false;
          if (s.col[k] > 9) return false;
        }
        return true;
      });
      if (!ok) { unsolvable++; if (!worst) worst = `${a} - ${b}`; }
    }
  }
  is(unsolvable === 0, `every one of ${checked.toLocaleString()} sampled a>=b pairs is solvable` + (unsolvable ? ` — e.g. ${worst}` : ''));
}

console.log('\n— L4 REFUSALS ARE REFUSALS, never clamps —');
{
  const s = T.newState('sub', 42, 17, 'decompose');
  is(T.borrow(s, 0) === null, 'the ones lane cannot borrow — there is nothing to its right');
  is(T.borrow(s, 3) === null, 'a lane off the end refuses');
  is(T.borrow(s, -1) === null, 'a negative lane refuses');
  is(T.borrow(s, 1.5) === null, 'a fractional lane refuses');
  is(T.borrow(s, NaN) === null, 'NaN refuses');
  is(T.carry(s, 0) === null, 'a subtraction cannot carry');
  const once = T.borrow(s, 1);
  is(once !== null, 'the tens lane can give once');
  is(T.borrow(once, 1) === null, 'and cannot give twice — the notation has no way to say it');
  is(once.col[1] === 3 && once.col[0] === 12, 'one left the tens and ten arrived in the ones');
  is(T.unExchange(once, 1) !== null, 'and it can be put back');
  is(T.unExchange(s, 1) === null, 'a lane that never gave cannot put anything back');

  const zero = T.newState('sub', 204, 137, 'decompose');
  is(T.borrow(zero, 1) === null, '⭐ an EMPTY tens lane refuses — it is not silently cascaded, and that refusal is the zero lesson');
  const h = T.borrow(zero, 2);
  is(h !== null && h.col[1] === 10, 'the hundreds must be broken first');
  is(T.borrow(h, 1) !== null, 'and only then can the tens give');

  is(T.stamp(s, 0) === null, 'a lane with ghosts still standing cannot be stamped');

  /* ⭐ THE ONE-DIGIT BOX IS THE WHOLE LESSON OF CARRYING, and it is
     GRAMMAR, not arithmetic — twelve does not fit under the line. */
  let over = T.newState('add', 96, 47, 'decompose');
  for (let i = 0; i < 7; i++) over = T.take(over, 0);
  is(over.col[0] === 13, 'an addition lane can hold thirteen while it is being worked');
  is(T.canStamp(over, 0) === false, '⭐ and it cannot be stamped — a two-digit value does not fit in a one-digit box');
  is(T.stamp(over, 0) === null, 'so stamp() refuses it outright');
  const eased = T.carry(over, 0);
  is(eased !== null && eased.col[0] === 3 && T.canStamp(eased, 0), 'sending the ten up leaves three, and three fits');

  /* right-to-left order, enforced without ever saying "wrong order" */
  let ord = T.newState('sub', 42, 17, 'decompose');
  ord = T.borrow(ord, 1);
  for (let i = 0; i < 7; i++) ord = T.take(ord, 0);
  for (let i = 0; i < 1; i++) ord = T.take(ord, 1);
  is(T.canStamp(ord, 1) === false, 'the tens lane refuses to be stamped while the ones lane is still blank');
  const o2 = T.stamp(ord, 0);
  is(o2 !== null && T.canStamp(o2, 1), 'and accepts it the moment the ones lane has been written');

  /* the reverse gear must actually clear the mark, or a lane could give
     twice by going round the loop */
  const there = T.borrow(s, 1);
  const back = T.unExchange(there, 1);
  is(back !== null && back.moved[1] === false, 'putting it back clears the mark');
  is(back.col[1] === 4 && back.col[0] === 2, 'and restores the material exactly');
  is(T.unExchange(back, 1) === null, 'so it cannot be put back a second time');
  /* ⭐ SMALLER-FROM-LARGER, measured rather than assumed. My first
     assertion here demanded that the FIRST take refuse, which would
     have been the tool correcting a child before they had done
     anything. What actually happens — and what the interaction panel
     asked for — is that the two discs that ARE there come away
     happily, and the child arrives at an empty tube with five dashed
     cells still hanging over nothing. The dead end is one they built,
     which is worth more than one they were handed. */
  let sfl = T.newState('sub', 2, 7, 'decompose');
  sfl = T.take(sfl, 0); is(sfl !== null, 'the first of the two discs that are there comes away');
  sfl = T.take(sfl, 0); is(sfl !== null, 'and the second');
  is(sfl.col[0] === 0 && T.ghosts(sfl, 0) === 5, 'leaving an empty tube with five dashed cells still standing');
  is(T.take(sfl, 0) === null,
     '⭐ and THERE it refuses — smaller-from-larger is never corrected, it is simply UNAFFORDABLE, and the shortfall stays on screen as a problem to solve');
}

console.log('\n— L4b TOTALITY: the clamp rule survives rubbish —');
{
  for (const junk of [null, undefined, 0, '', 'x', [], { col: 'no' }, { col: [NaN, 1, 2] }]) {
    const s = T._st(junk);
    const ok = s && s.col.length === 3 && s.col.every((v) => typeof v === 'number' && isFinite(v));
    if (!ok) { is(false, `_st survives ${JSON.stringify(junk)}`); break; }
  }
  is(true, '_st is total over null, 0, "", [], and a NaN-bearing column');
  is(T._num(NaN) === 0 && T._num(-5) === 0 && T._num(1e9) === 999 && T._num(3.7) === 4,
     'one clamp rule: NaN->0, negative->0, huge->999, and it rounds');
}

console.log('\n— L5 THE ZERO CASE, exhaustively —');
{
  let bad = 0, cases = 0;
  for (let h = 1; h <= 9; h++) {
    for (let o = 0; o <= 9; o++) {
      const a = h * 100 + o;                       /* a zero in the tens */
      for (let b = 1; b <= a; b += 13) {
        cases++;
        const { states } = walk('sub', a, b, 'decompose', 900);
        for (const s of states) {
          const recon = oValue(s.col) + oValue(s.taken);
          if (recon !== a) bad++;
        }
        /* the impasse must be REACHABLE and must REFUSE */
        const start = T.newState('sub', a, b, 'decompose');
        if (oDigits(a)[1] === 0 && T.borrow(start, 1) !== null) bad++;
      }
    }
  }
  is(cases > 400, `the zero family was actually swept (${cases.toLocaleString()} cases)`);
  is(bad === 0, 'conservation holds and the empty tens always refuses, across the whole zero family');
}

console.log('\n— THE REPERTOIRE —');
{
  const sets = T.FALLBACK_SETS.sets;
  is(T.FALLBACK_SETS.freeCount === DECLARED_FREE, 'the fallback freeCount agrees with the declared FREE_SETTINGS');
  is(sets.length >= 6, 'the offline fallback degrades to the FREE TIER, not to nothing');
  is(sets.every((s) => s.a <= 999 && s.b <= 999 && s.b <= s.a),
     'every fallback sum is inside the three-place ceiling and never goes negative');
  is(sets.some((s) => s.op === 'sub' && oDigits(s.a)[1] === 0 && oDigits(s.a)[2] > 0),
     '⭐ a FREE record carries the across-zero cascade — the tool\'s most distinctive minute is not behind the paywall');
  is(sets.some((s) => s.op === 'add'), 'a FREE record runs the latch the other way');
  is(sets.filter((s) => s.op === 'sub').length >= 3, 'the borrow is free, and free more than once — a free tier that only demonstrates addition demonstrates the wrong topic');

  T.premium = false; T.FREE_SETTINGS = 2;
  is(T._sets().length === 2, 'entitlement filters the book for a free teacher');
  T.premium = true;
  is(T._sets().length === T.FALLBACK_SETS.sets.length, 'and opens it for a paid one');
  T.premium = DECLARED_PREMIUM; T.FREE_SETTINGS = DECLARED_FREE;
}

console.log('\n— THE NOTATION TABLE: the moat —');
{
  const L = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
  is(L.every((l) => T.NOTATION[l]), 'every one of the eleven markets has a notation row');
  is(L.every((l) => ['above', 'foot'].indexOf(T.NOTATION[l].carryPos) >= 0), 'every carry position is a known value');
  is(L.every((l) => ['strike', 'foot'].indexOf(T.NOTATION[l].borrowMark) >= 0), 'every borrow mark is a known value');
  is(L.every((l) => ['decompose', 'complement'].indexOf(T.NOTATION[l].method) >= 0), 'every default method is a known value');
  is(L.every((l) => ['v', 'p', 'x'].indexOf(T.NOTATION[l].conf) >= 0),
     '⭐ every row carries its own CONFIDENCE — shipping a guess as a fact is the one failure this tool cannot survive');
  is(T.NOTATION.de.carryPos === 'foot', 'Germany writes the Übertrag at the foot, not above');
  is(T.NOTATION.nl.inBand === false && T.NOTATION.no.inBand === false,
     '⭐ NL and NO are marked OUT OF BAND — cijferend rekenen is groep 6 and skriftlig regning is 5. trinn, so the tool says so rather than pretending');
  is(T.notation('zz').carryPos === T.NOTATION.en.carryPos, 'an unknown locale falls back to en rather than throwing');
  is(T.NOTATION.fr.method === 'complement' || T.NOTATION.fr.method === 'decompose',
     'France has a default, and the switch is what makes it safe');
}

console.log('\n— BOTH MODES ARE SERVED, or half the product ships false chrome —');
{
  /* ⭐ A German native panel found this in the ENGLISH SOURCE before a
     single locale was authored: the operation chip flipped the machine
     into addition while every hint still said "take away". A hint that
     is false in a mode the tool offers is not a copy problem, it is a
     product one, so it gets an assertion rather than a proofread. */
  const seen = { sub: {}, add: {} };
  for (const [op, a, b] of [['sub', 42, 17], ['sub', 204, 137], ['add', 38, 25], ['add', 96, 47]]) {
    const { states } = walk(op, a, b, 'decompose', 4000);
    for (const s of states) { T.st = s; seen[op][T._hintKey.call(T)] = true; }
  }
  T.st = undefined;
  const subKeys = Object.keys(seen.sub), addKeys = Object.keys(seen.add);
  is(subKeys.length >= 3, `subtraction reaches several hints (${subKeys.join(', ')})`);
  is(addKeys.length >= 2, `addition reaches several hints (${addKeys.join(', ')})`);
  const subOnly = ['hintStart', 'hintShort', 'hintBlocked', 'hintReady'];
  const leaked = addKeys.filter((k) => subOnly.indexOf(k) >= 0);
  is(leaked.length === 0,
     '⭐ no subtraction-only hint is ever shown in addition mode' + (leaked.length ? ` — ${leaked.join(', ')}` : ''));
  is(addKeys.indexOf('hintOver') >= 0, 'and addition reaches its own over-ten hint');
  const declared = Object.keys(T.strings);
  is(subKeys.concat(addKeys).every((k) => declared.indexOf(k) >= 0), 'every hint key a mode can reach is actually declared');
}

console.log('\n— THE PLACE-VALUE TOKEN —');
{
  const L = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
  is(L.every((l) => T.PLACES.hasOwnProperty(l)), 'every locale has ruled on what {c} is');
  const nouny = L.filter((l) => T.PLACES[l]);
  const indexy = L.filter((l) => !T.PLACES[l]);
  is(nouny.length > 0 && indexy.length > 0,
     `⭐ {c} is a NOUN in ${nouny.join('/')} and an INDEX in ${indexy.join('/')} — two panels contradicted each other and both were right about their own grammar`);
  is(nouny.every((l) => T.PLACES[l].length === 3 && T.PLACES[l].every((x) => typeof x === 'string' && x.trim() && !/\d/.test(x))),
     'the noun locales name three places and none of them is a digit');
  is(indexy.every((l) => /^\d+$/.test(T.place(l, 1))), 'the index locales get a bare number');
  is(T.place('es', 1).indexOf('las ') === 0,
     'and Spanish carries its own article, because las decenas is feminine while los millares is not');
  is(T.place('zz', 0) === T.PLACES.en[0], 'an unknown locale falls back rather than throwing');
}

console.log('\n— THE SHAPE OF THE TOOL —');
{
  is(!T.tasks && !T.nextTask, 'no tasks and no nextTask — this is a free-play instrument, not a graded activity');
  is(typeof T.reset === 'function', 'reset() exists, so the shell\'s always-drawn Reset button is not dead');
  is(T.render.length === 0, 'render() takes no arguments — the shell re-calls it on resize and an api parameter would wipe this.api');
  const src = require('fs').readFileSync(path.join(DIR, 'exchange-machine.js'), 'utf8');
  is(!/\bcorrect\b\s*:/.test(src), 'no verdict field anywhere in the source');
  is(!/#2FA56A/i.test(src), 'NO GREEN on the stage — a hue pair reads as right/wrong to a six-year-old');
  is(!/#(e|f)[0-9a-f]{2}0{2}|\bred\b\s*[;:]/i.test(src), 'no red on the stage either');
  /* ⚠ MY FIRST VERSION OF THIS BAN MANUFACTURED ITS OWN MATCH. It
     stripped letter-adjacent "vh" and then tested \bvh\b on the
     REMAINDER — and the stripping itself joined characters into a
     "vh" that was never in the file. It failed a tool containing zero
     vh units. The thing that actually matters is a CSS UNIT, so that
     is what is measured now, and it is poison-tested in both
     directions rather than trusted. */
  const vhBan = /[0-9.]vh\b/;
  is(!vhBan.test(src), 'no vh units — the iframe grows to content, so a vh rule is a feedback loop the shell has no path for');
  is(vhBan.test('height:60vh;'), 'poison: the vh ban FIRES on a real vh unit');
  is(!vhBan.test('.exm-svg{max-height:424px}'), 'poison: and does NOT fire on an ordinary px rule');
  is(/api\.el\('div',\s*'exm-wrap'\)/.test(src), 'the liveness gate can derive the class prefix from the wrap');

  /* ⚠ A GATE CAN READ PROSE INSTEAD OF CODE. My first version of this
     matched /@media print/ anywhere in the file — and the phrase
     appears TWICE: once in the CSS and once in the docblock warning
     that #40 and #41 shipped without one. So the check passed on the
     comment while the real block was deleted. Strip comments first. */
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const printBan = /@media print\s*\{/;
  is(printBan.test(code), 'there is a real @media print block, not just a window.print() call');
  is(/@media print/.test(src) && !/@media print/.test(code.replace(printBan, '')),
     'the phrase appears in the prose too, which is exactly why the comment strip is load-bearing');
  is(printBan.test('@media print{ .x{display:none} }'), 'poison: the print check FIRES on a real block');
  is(!printBan.test('/* a note about @media print blocks */'), 'poison: and NOT on a comment that merely mentions one');
  is(/font-family:/.test(src) && !/[^-]font:\s/.test(src), 'no font: shorthand — an unquoted Baloo 2 inside one kills the whole declaration');
}

console.log('\n— THE AUTHORED STRINGS: what the stage may never say —');
{
  /* Every ban below is poison-tested in BOTH directions. A ban that
     cannot fire is worse than no ban, and a ban that is too wide
     teaches a native panel to reword around it instead of reporting
     it — which is how a correct German string once failed a build. */
  const vals = [];
  const collect = (o) => { for (const k in o) if (o.hasOwnProperty(k)) for (const l in o[k]) if (o[k].hasOwnProperty(l)) vals.push(k + '/' + l + ': ' + o[k][l]); };
  collect(T.strings);
  /* ⚠ non-vacuity asserted against the NAMED SET, not against a number
     I liked. My first line here demanded ">= 25" and there are 23 — an
     invented threshold failing a correct tool, for the third time in
     this gate. What matters is that every declared key was collected. */
  const keys = Object.keys(T.strings);
  const LOC = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
  is(vals.length === keys.length * LOC.length,
     `every one of the ${keys.length} keys is present in all ${LOC.length} locales (${vals.length} strings)`);
  is(keys.indexOf('title') >= 0 && keys.indexOf('instruction') >= 0,
     'the two keys the shell itself reads are present, or the h1 renders its own key name');
  is(keys.every((k) => LOC.every((l) => T.strings[k][l] && T.strings[k][l].trim())),
     'no key is empty in any locale');
  /* an untranslated leak: a non-EN value byte-identical to the English */
  const leaks = [];
  keys.forEach((k) => LOC.forEach((l) => { if (l !== 'en' && T.strings[k][l] === T.strings[k].en) leaks.push(l + '.' + k); }));
  is(leaks.length === 0, 'no non-English value is byte-identical to the English' + (leaks.length ? ` — ${leaks[0]}` : ''));
  /* ⚠ the placeholders must survive rebuilding, in every locale */
  const lost = [];
  ['laneAria', 'breakAria', 'sendAria', 'backAria', 'takeAria', 'fillAria'].forEach((k) =>
    LOC.forEach((l) => { if (T.strings[k] && T.strings[k][l].indexOf('{c}') < 0) lost.push(l + '.' + k); }));
  LOC.forEach((l) => { if (T.strings.stampAria[l].indexOf('{v}') < 0) lost.push(l + '.stampAria'); });
  is(lost.length === 0, 'every placeholder survived the rebuild' + (lost.length ? ` — ${lost[0]}` : ''));

  const BANS = [
    ['a verdict', /\b(correct|incorrect|wrong|well done|good job|try again|richtig|falsch)\b/i,
      'Well done, that is correct!', 'Start at the right-hand lane.'],
    ['a score or a timer', /\b(score|points?|stars?|streak|timer|seconds left)\b/i,
      'Your score is 5 out of 5.', 'Take away the outlined squares.'],
    ['⭐ a name for the material — place-value-lab owns those nouns', /\b(block|blocks|rod|rods|cube|cubes|bead|beads|counter|counters)\b/i,
      'Count the blocks in the rod.', 'This lane has not got enough.'],
    /* ⚠ AN EXPLICIT, AUDITABLE EXEMPTION, because a native panel found
       the contradiction before any locale was authored: the rule says
       NO NUMBER WORDS, and the copy says "ten" throughout. TEN and ONE
       name THE BASE and the unit of exchange — they are the tool's
       subject, and the exchange is undescribable without them. Every
       other cardinal stays banned. Recording it here rather than
       leaving each of eleven panels to assume it silently. */
    ['⭐ a number word other than the base — place-value-lab\'s moat',
      /\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)-?\w*\b/i,
      'Say the number word for twenty-four.', 'Ten of these make one of the column to its left.'],
    ['the second person', /\byour\b/i, 'Your answer is ready.', 'The material and the writing agree.']
  ];
  for (const [what, re, mustFire, mustPass] of BANS) {
    const hit = vals.filter((v) => re.test(v.split(': ').slice(1).join(': ')));
    is(hit.length === 0, `no authored string carries ${what}` + (hit.length ? ` — ${hit[0]}` : ''));
    is(re.test(mustFire), `poison: the ban on ${what} FIRES on "${mustFire}"`);
    is(!re.test(mustPass), `poison: and does NOT fire on a correct string`);
  }
}

if (FAIL) { console.error(`\nFAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
console.log(`\nPASS — ${PASS} assertions`);
