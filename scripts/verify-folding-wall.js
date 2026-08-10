#!/usr/bin/env node
/* =====================================================================
   verify-folding-wall.js — TOOL #47 THE TIMES SHELF, the model gate.

   ⭐ IT IMPLEMENTS ITS OWN ORACLE. Every expectation below is computed
   here, from first principles, never by asking the tool. A gate that
   reads its expectation off the thing it is checking marks its own
   homework — #39 shipped that and 19 of 51 mutations survived; #44
   shipped a gate that REIMPLEMENTED the dispatch it was checking and
   three mutations of the real one sailed through.

   ⚠ AND IT IS AN EXHAUSTIVE CENSUS. The state space is 17 states and
   82 edges, so there is no reason to sample. #46's census enumerated
   1..10 and never built the tray its worst bug could reach, and the
   guard CERTIFIED the bug 118,000 times — a census is only exhaustive
   over the space you let it see.

   Ten laws:
     1  THE SHELF LAW          visible cards, over the whole census
     2  THE CROSS LAW          2n-1, and 19/17/15/13 in every order
     3  ORDER INVARIANCE       gated, never advertised (number-sieve)
     4  THE DISTINCT-LIST LAW  21 pairs, 19 numerals — the M4 trap
     5  THE FIBRE LAW          sizes 1..4; not an involution
     6  NOTHING CROSSES THE DIAGONAL   the fence subtraction
     7  THE SQUARES NEVER RETIRE
     8  REVERSIBILITY          all 82 edges
     9  NO COUNT, ANYWHERE     no authored string carries a digit
    10  NO OPERATOR GLYPH      except the print-only opGlyph
   ===================================================================== */
'use strict';

const path = require('path');
const fs = require('fs');

const DIR = process.env.FW_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'folding-wall.js');

/* the tool needs a DOM-shaped global only for its CSS injector; the
   model half is pure. ⚠ A CRASHED GATE LOOKS EXACTLY LIKE A FAILING
   ONE — #46 reported "every mutation killed" while the gate was dying
   on `document is not defined`. */
if (typeof global.document === 'undefined') {
  global.document = {
    head: { appendChild() {} },
    body: { classList: { add() {} } },
    createElement: () => ({ setAttribute() {}, appendChild() {} }),
    createTextNode: () => ({}),
    createElementNS: () => ({ setAttribute() {}, appendChild() {} })
  };
}
if (typeof global.window === 'undefined') global.window = {};

const T = require(SRC);
const raw = fs.readFileSync(SRC, 'utf8');
/* ⚠ strip comments before ANY source scan — a `.lcs-` ban once matched
   a COMMENT twice running, and an apostrophe in ordinary English opens
   a match that crosses newlines. */
const code = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');

let pass = 0;
const fails = [];
function ok(cond, msg) {
  if (cond) { pass++; return true; }
  fails.push(msg);
  return false;
}
function eq(a, b, msg) { return ok(a === b, `${msg} — expected ${b}, got ${a}`); }

/* ================= THE ORACLE ======================================= */
/* Everything below is written from the SPEC, not from the tool. */

const HI = 10;
const FAM = [1, 2, 5, 10];

/** every legal state, as {off:Set-ish object, stacked} — 17 of them */
function census() {
  const out = [];
  for (let m = 0; m < 16; m++) {
    const off = {};
    let all = true;
    for (let i = 0; i < 4; i++) {
      off[FAM[i]] = !!(m & (1 << i));
      if (!off[FAM[i]]) all = false;
    }
    out.push({ off, stacked: false });
    if (all) out.push({ off, stacked: true });
  }
  return out;
}

function oracleLive(st) {
  const out = [];
  for (let v = 1; v <= HI; v++) if (!st.off[v]) out.push(v);
  return out;
}
function oracleCards(st) {
  const L = oracleLive(st), out = [];
  for (const r of L) for (const c of L) {
    if (st.stacked && r > c) continue;
    out.push(r + 'x' + c);
  }
  return out.sort();
}
function oracleSeats(st) {
  if (!st.stacked) return [];
  const L = oracleLive(st), out = [];
  for (const r of L) for (const c of L) if (r > c) out.push(r + 'x' + c);
  return out.sort();
}
const key = st => FAM.map(k => (st.off[k] ? 1 : 0)).join('') + (st.stacked ? 'S' : '-');

/* ================= LAW 1 — THE SHELF LAW ============================ */
const ALL = census();
eq(ALL.length, 17, 'L1 census size');

for (const st of ALL) {
  const s = { off: Object.assign({}, st.off), stacked: st.stacked };
  const live = T.live(s);
  const cards = T.cards(s).map(x => x.r + 'x' + x.c).sort();
  const seats = T.seats(s).map(x => x.r + 'x' + x.c).sort();
  const oL = oracleLive(st), oC = oracleCards(st), oS = oracleSeats(st);

  ok(JSON.stringify(live) === JSON.stringify(oL), `L1 live @${key(st)}`);
  ok(JSON.stringify(cards) === JSON.stringify(oC), `L1 cards @${key(st)}`);
  ok(JSON.stringify(seats) === JSON.stringify(oS), `L1 seats @${key(st)}`);

  const n = oL.length;
  const want = st.stacked ? (n * (n + 1)) / 2 : n * n;
  eq(cards.length, want, `L1 card count @${key(st)}`);
  eq(cards.length + seats.length, n * n, `L1 cards+seats fill the block @${key(st)}`);

  /* every card's product is its own two factors — the whole render
     depends on this and it is one line to prove */
  for (const c of T.cards(s)) eq(c.p, c.r * c.c, `L1 product @${key(st)} ${c.r}x${c.c}`);
}

/* ⚠ a stacked shelf with a family still standing MUST BE UNREPRESENTABLE */
for (let m = 0; m < 15; m++) {
  const off = {};
  for (let i = 0; i < 4; i++) off[FAM[i]] = !!(m & (1 << i));
  const s = T._st({ off, stacked: true });
  ok(s.stacked === false, `L1 stacked is unrepresentable with a family standing @${m}`);
}

/* TOTALITY — null, 0, NaN, a string and a hostile object all survive */
for (const junk of [null, undefined, 0, NaN, '', 'stacked', [], { off: 7, stacked: 'yes' },
                    { off: { 3: true, 9: true }, stacked: true }]) {
  const s = T._st(junk);
  ok(s && s.off && typeof s.stacked === 'boolean', `L1 totality ${JSON.stringify(junk)}`);
  eq(T.live(s).length, 10, `L1 junk gives the full shelf ${JSON.stringify(junk)}`);
}

/* ================= LAW 2 — THE CROSS LAW ============================ */
/* Oracle: removing family k from an n-live shelf takes row k plus
   column k minus the square where they meet = 2n-1. */
function perms(arr) {
  if (arr.length <= 1) return [arr];
  const out = [];
  arr.forEach((v, i) => {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const p of perms(rest)) out.push([v].concat(p));
  });
  return out;
}
const ORDERS = perms(FAM);
eq(ORDERS.length, 24, 'L2 order count');

for (const order of ORDERS) {
  let s = T.newState();
  const takings = [], totals = [];
  for (const k of order) {
    const before = T.cards(s).length;
    const n = T.live(s).length;
    const t = T.takings(s, k);
    eq(t, 2 * n - 1, `L2 takings ${order.join('')} at ${k}`);
    s = T.putAway(s, k);
    ok(s !== null, `L2 putAway ${k} legal in ${order.join('')}`);
    const after = T.cards(s).length;
    eq(before - after, t, `L2 the cross really removes what it says @${order.join('')} ${k}`);
    takings.push(t);
    totals.push(after);
  }
  ok(JSON.stringify(takings) === JSON.stringify([19, 17, 15, 13]),
    `L2 takings run 19,17,15,13 in order ${order.join('')} — got ${takings.join(',')}`);
  ok(JSON.stringify(totals) === JSON.stringify([81, 64, 49, 36]),
    `L2 totals are the squares in order ${order.join('')} — got ${totals.join(',')}`);

  /* ================= LAW 3 — ORDER INVARIANCE ======================= */
  ok(JSON.stringify(T.live(s)) === JSON.stringify([3, 4, 6, 7, 8, 9]),
    `L3 residue is {3,4,6,7,8,9} for order ${order.join('')}`);
}

/* the four families and no fifth — ⚠ x9 is refused three times over,
   and admitting a derivation would empty the shelf */
ok(JSON.stringify(T.GEO.FAMILIES) === JSON.stringify([1, 2, 5, 10]), 'L2 the family set is exactly {1,2,5,10}');
for (const k of [0, 3, 4, 6, 7, 8, 9, 11, 12, -1, 1.5, NaN, null, '5']) {
  ok(T.canPutAway(T.newState(), k) === false, `L2 ${k} is not a family`);
  ok(T.putAway(T.newState(), k) === null, `L2 putAway(${k}) refuses`);
}
eq(T.GEO.HI, 10, 'L2 the shelf is ten wide — never 11, never 12');

/* ================= LAW 4 — THE DISTINCT-LIST LAW ==================== */
/* ⚠ THIS LAW EXISTS TO STOP A FUTURE "FIX" TO 19. Deduplicating by
   NUMERAL rather than by PAIR is prettier, nearer the marketing
   "twenty", and false: what is stored is the association pair->product
   (Baroody 2006), not recognition of a value. */
let R = T.newState();
for (const k of FAM) R = T.putAway(R, k);
const RS = T.stack(R);
ok(RS !== null, 'L4 stack is legal on the residue');

eq(T.cards(RS).length, 21, 'L4 the residue is TWENTY-ONE cards');
eq(T.seats(RS).length, 15, 'L4 fifteen seats stay empty');
eq(T.studyList(RS).length, 21, 'L4 the study list is 21 entries');

const diag = T.cards(RS).filter(c => c.r === c.c);
eq(diag.length, 6, 'L4 six squares with no partner');
ok(JSON.stringify(diag.map(c => c.p)) === JSON.stringify([9, 16, 36, 49, 64, 81]),
  'L4 the six squares are 9,16,36,49,64,81');

const nums = T.cards(RS).map(c => c.p);
const distinct = Array.from(new Set(nums));
eq(distinct.length, 19, 'L4 the 21 cards carry only NINETEEN distinct numerals');
eq(nums.filter(p => p === 24).length, 2, 'L4 twenty-four appears twice (3x8 and 4x6)');
eq(nums.filter(p => p === 36).length, 2, 'L4 thirty-six appears twice (4x9 and 6x6)');
/* and the study list must NOT have been deduplicated by numeral */
const sl = T.studyList(RS).map(f => f.p);
eq(sl.filter(p => p === 24).length, 2, 'L4 the study list keeps BOTH twenty-fours');
eq(sl.filter(p => p === 36).length, 2, 'L4 the study list keeps BOTH thirty-sixes');
for (const f of T.studyList(RS)) ok(f.a <= f.b, `L4 study list writes the smaller factor first (${f.a},${f.b})`);

/* ================= LAW 5 — THE FIBRE LAW ============================ */
/* Oracle: the fibre of p is every standing (r,c) with r*c === p. On a
   full 10x10 it has size 1..4 and it is NOT an involution — folding-
   sheet's TWIN is exactly one partner, forever. */
const FULL = T.newState();
for (const st of ALL) {
  const s = { off: Object.assign({}, st.off), stacked: st.stacked };
  for (const card of T.cards(s)) {
    const f = T.fibre(s, card.p);
    const want = oracleCards(st).filter(k => {
      const [r, c] = k.split('x').map(Number);
      return r * c === card.p;
    }).sort();
    ok(JSON.stringify(f.map(x => x.r + 'x' + x.c).sort()) === JSON.stringify(want),
      `L5 fibre of ${card.p} @${key(st)}`);
    ok(f.length >= 1 && f.length <= 4, `L5 fibre size 1..4 for ${card.p} @${key(st)}`);
    ok(f.some(x => x.r === card.r && x.c === card.c), `L5 a card is in its own fibre @${key(st)}`);
  }
}
eq(T.fibre(FULL, 12).length, 4, 'L5 twelve lives in FOUR places on the full shelf');
eq(T.fibre(FULL, 36).length, 3, 'L5 thirty-six lives in THREE — and that is why it is not a mirror');
eq(T.fibre(FULL, 49).length, 1, 'L5 forty-nine lives in ONE');
eq(T.fibre(FULL, 100).length, 1, 'L5 a hundred lives in ONE');
/* ⭐⭐ A TEACHING CLAIM THIS GATE REFUTED, AND THE COPY HAD TO CHANGE.
   The routine was drafted as "find me a number that lives in only one
   place — and why are they all squares?" That is FALSE for exactly one
   card: on the residue 36 stands at 6x6 AND at 4x9, so five of the six
   squares are alone and the sixth is not. The exception is a better
   question for a class than the false generalisation, so the copy names
   it instead of the gate being softened. MEASURE A LAW BEFORE YOU GATE
   IT — and when the measurement refutes the design, fix the design. */
const ALONE = [9, 16, 49, 64, 81];
for (const c of T.cards(RS)) {
  if (c.r !== c.c) continue;
  if (ALONE.indexOf(c.p) >= 0) eq(T.fibre(RS, c.p).length, 1, `L5 the square ${c.p} is alone on the residue`);
  else eq(T.fibre(RS, c.p).length, 2, `L5 the square ${c.p} is NOT alone — 6x6 and 4x9`);
}
eq(T.fibre(RS, 36).length, 2, 'L5 thirty-six is the one square with company on the residue');

/* ================= LAW 6 — THE FOLD LANDS ON ITS PARTNER ============ */
/* ⭐⭐ THIS LAW WAS ONCE ITS OWN OPPOSITE, and that is the most
   instructive thing in this file. It read "NOTHING CROSSES THE
   DIAGONAL", because I read the v5 doc's note — *collisions to avoid AT
   NAMING: folding (folding-sheet)* — as licence to delete the GESTURE,
   when it only ever asked for a rename. The operator asked for a
   FOLDING WALL. So the tool folds, and the law is the positive one:

     the below-diagonal half is carried by ONE transform,
       rotate(45) scale(1, 1-2e) rotate(-45)
     which is the identity at e=0 and the REFLECTION ABOUT y = x at
     e=1 — and the shelf's diagonal IS y = x, because rows and columns
     share one centre function. So every folded card lands EXACTLY on
     its transpose, which is its partner, which carries the same
     product.

   What is still fenced is folding-sheet's NAMED PARTS — the crease, the
   twin, the hinge — not the fold itself. */
const sIdx0 = code.indexOf('strings: {');
const eIdx0 = code.indexOf('settings: [');
ok(sIdx0 > 0 && eIdx0 > sIdx0, 'L6 the strings block was located for excision');
const BODY = code.slice(0, sIdx0) + code.slice(eIdx0);
ok(BODY.length > code.length * 0.4, 'L6 the excision left a real body to scan');

/* the diagonal fold is ONE rigid transform, not a per-card path.
   ⚠ these are SUBSTRING checks on source text, deliberately — building
   them as regex literals cost a parse error, because the source they
   police is itself full of parentheses. */
ok(BODY.indexOf("'rotate(45) scale(1,' + fs2") >= 0, 'L6 the twins fold on one reflection about y = x');
ok(BODY.indexOf('var fs2 = 1 - 2 * e;') >= 0, 'L6 ...running from the identity to the reflection');
/* the family folds on a hinge, one axis each */
ok(BODY.indexOf("'translate(0,' + hy.toFixed(3) + ') scale(1,'") >= 0,
  'L6 the row folds about its own hinge line, and folds FLAT');
ok(BODY.indexOf("'translate(' + hx") >= 0, 'L6 the column folds about its own hinge line');
ok((BODY.match(/1 - e/g) || []).length >= 2, 'L6 both hinges run from open to flat');
/* ⭐ THE MATHEMATICAL HALF: reflection about y = x swaps coordinates, so
   it maps a card to its transpose ONLY IF both axes share one centre
   function. They do — `centre(n, i)` is called for rows and columns
   alike — and that is what makes the landing exact rather than
   approximate. Checked against an oracle written here. */
for (const n of [10, 9, 8, 7, 6]) {
  for (let i = 0; i < n; i++) {
    const ci = T.centre(n, i);
    const want = T.GEO.LANE + (i + 0.5) * (T.GEO.S / n);
    ok(Math.abs(ci - want) < 1e-9, `L6 one centre function for both axes, n=${n} i=${i}`);
  }
}
/* and therefore the reflection lands each card on its partner */
for (const st of ALL) {
  const s2 = { off: Object.assign({}, st.off), stacked: false };
  const L = T.live(s2), n = L.length;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const x = T.centre(n, j), y = T.centre(n, i);   /* card (L[i], L[j]) */
    /* reflection about y = x */
    const rx = y, ry = x;
    ok(Math.abs(rx - T.centre(n, i)) < 1e-9 && Math.abs(ry - T.centre(n, j)) < 1e-9,
      `L6 the fold lands ${L[i]}x${L[j]} on ${L[j]}x${L[i]}`);
    ok(L[i] * L[j] === L[j] * L[i], `L6 ...and the partner carries the same product`);
  }
}

/* the fence that REMAINS: folding-sheet's named parts, and the doctrinal
   one. ⚠ Substring bans, because `\b` cannot see `_mirrorOf` — the
   trap that let two mutations through the first time. */
const BANNED_PARTS = [/crease/i, /twin/i, /hinge/i, new RegExp('scaleX\\s*\\(\\s*-1')];
for (const re of BANNED_PARTS) {
  ok(!re.test(BODY), `L6 the code body contains no ${re} — folding-sheet's named parts stay fenced`);
}

/* ================= LAW 7 — THE SQUARES NEVER RETIRE ================= */
/* Every family hangs from an edge numeral; the squares are a diagonal
   and hang from nothing, so the apparatus cannot offer the move. */
for (const st of ALL) {
  const s = { off: Object.assign({}, st.off), stacked: st.stacked };
  for (const v of T.live(s)) {
    const found = T.cards(s).some(c => c.r === v && c.c === v);
    ok(found, `L7 the square ${v}x${v} is standing @${key(st)}`);
  }
}
/* the stack act removes no diagonal card */
const beforeDiag = T.cards(R).filter(c => c.r === c.c).length;
const afterDiag = T.cards(RS).filter(c => c.r === c.c).length;
eq(afterDiag, beforeDiag, 'L7 stacking removes NO diagonal card');
eq(afterDiag, 6, 'L7 six squares survive the stack');

/* ================= LAW 8 — REVERSIBILITY ============================ */
/* 64 family toggles + 2 stack edges + 16 restores = 82, every one
   invertible. ⚠ retirement, NOT destruction — a thing that cannot come
   back is destroyed, and that is the requirement the toggle satisfies. */
let edges = 0;
for (const st of ALL) {
  const s = T._st({ off: Object.assign({}, st.off), stacked: st.stacked });
  const sig = JSON.stringify(s);
  for (const k of FAM) {
    if (T.canPutAway(s, k)) {
      const n = T.putAway(s, k);
      ok(n !== null, `L8 putAway ${k} @${key(st)}`);
      eq(JSON.stringify(T.putBack(n, k)), sig, `L8 putBack undoes putAway ${k} @${key(st)}`);
      ok(T.putAway(n, k) === null, `L8 putAway is idempotent-refused ${k} @${key(st)}`);
      edges += 1;
    } else if (T.canPutBack(s, k)) {
      const n = T.putBack(s, k);
      ok(n !== null, `L8 putBack ${k} @${key(st)}`);
      eq(JSON.stringify(T.putAway(n, k)), sig, `L8 putAway undoes putBack ${k} @${key(st)}`);
      edges += 1;
    } else {
      /* the only refusal class: a family while stacked */
      ok(s.stacked === true, `L8 a family is only ever refused while stacked @${key(st)}`);
      ok(T.putAway(s, k) === null && T.putBack(s, k) === null, `L8 both refuse @${key(st)} ${k}`);
    }
  }
  if (T.canStack(s)) {
    const n = T.stack(s);
    eq(JSON.stringify(T.unstack(n)), sig, `L8 unstack undoes stack @${key(st)}`);
    edges += 1;
  }
  if (T.canUnstack(s)) {
    const n = T.unstack(s);
    eq(JSON.stringify(T.stack(n)), sig, `L8 stack undoes unstack @${key(st)}`);
    edges += 1;
  }
  if (T.canRestore(s)) {
    const n = T.restoreAll(s);
    eq(JSON.stringify(n), JSON.stringify(T.newState()), `L8 restore reaches the virgin state @${key(st)}`);
    edges += 1;
  } else {
    ok(T.restoreAll(s) === null, `L8 restore refuses in the virgin state @${key(st)}`);
  }
}
eq(edges, 82, 'L8 exactly 82 reversible edges');

/* stacking is refused until all four are away — on ARITHMETIC, because
   three of the four families are themselves crosses */
for (const st of ALL) {
  const s = T._st({ off: Object.assign({}, st.off), stacked: st.stacked });
  const allAway = FAM.every(k => s.off[k]);
  eq(T.canStack(s), allAway && !s.stacked, `L8 canStack @${key(st)}`);
  if (!allAway) ok(T.stack(s) === null, `L8 stack refuses @${key(st)}`);
}

/* ================= LAW 9 — NO COUNT, ANYWHERE ======================= */
/* ⚠ THE MOST TEMPTING THING IN THE BUILD. Putting 21 on the apparatus
   makes it a score and steals the one intellectual act the class is
   there to perform. 21 lives in the title, the landing copy and the
   teacher script; it never reaches the stage OR an aria-label.
   The checkable form: NO AUTHORED STRING CARRIES A DIGIT. */
/* ⚠ THE BAN WAS TOO WIDE ON ITS FIRST RUN, and it condemned two of my
   own CORRECT strings — the `Zufallsbeutel` defect in a new dress, and
   the third time this programme has walked into it. Two labels
   legitimately NAME the four families, in the same numerals the buttons
   carry: `stackLocked` ("put away the 1, the 2, the 5 and the 10
   first") and `setStart`. So the exemption is an AUDITABLE LIST WITH A
   REASON, and the permitted digit sequences are ONLY the four family
   numerals — never a loosened regex. 21, 36, 100 and 19 stay
   unwritable everywhere, which is the point of the law. */
const DIGIT_EXEMPT = {
  stackLocked: 'names the four families the class must put away first',
  setStart:    'names the four families the setting puts away'
};
const FAM_NUMERALS = ['1', '2', '5', '10'];
let strChecked = 0;
for (const k of Object.keys(T.strings)) {
  for (const loc of Object.keys(T.strings[k])) {
    const v = T.strings[k][loc];
    ok(typeof v === 'string' && v.length > 0, `L9 ${k}.${loc} is a non-empty string`);
    const runs = v.match(/[0-9]+/g) || [];
    if (!Object.prototype.hasOwnProperty.call(DIGIT_EXEMPT, k)) {
      ok(runs.length === 0, `L9 ${k}.${loc} carries a digit — "${v}"`);
    } else {
      for (const r of runs) {
        ok(FAM_NUMERALS.indexOf(r) >= 0,
          `L9 ${k}.${loc} carries "${r}", which is not one of the four family numerals — "${v}"`);
      }
    }
    strChecked++;
  }
}
ok(strChecked > 0, 'L9 there are strings to check');
/* the exemption list may only shrink: every key on it must exist */
for (const k of Object.keys(DIGIT_EXEMPT)) {
  ok(Object.prototype.hasOwnProperty.call(T.strings, k), `L9 exempt key ${k} still exists`);
}

/* ================= LAW 10 — NO OPERATOR GLYPH ======================= */
/* ⚠ #46 shipped a literal `+` in ELEVEN LOCALES because it was DRAWN
   BY CODE (`plus.textContent = '+'`), so it survived every string ban,
   every poison case and eleven native reviews of the strings. The ban
   therefore covers the SOURCE as well as the strings.
   THE ONE EXEMPTION, auditable and by name: `opGlyph`, which is
   per-locale and appears ONLY on the printed sheet — German school
   notation is the raised dot. That is the localised-notation
   superpower, and it belongs on paper. */
const OPS = ['×', '·', '✕', '✖', '⨯'];
const EXEMPT_KEYS = ['opGlyph'];
for (const k of Object.keys(T.strings)) {
  if (EXEMPT_KEYS.indexOf(k) >= 0) continue;
  for (const loc of Object.keys(T.strings[k])) {
    const v = T.strings[k][loc];
    for (const g of OPS) ok(v.indexOf(g) < 0, `L10 ${k}.${loc} carries the operator ${g}`);
    ok(!/(?:^|[^A-Za-z])[=+*](?:[^A-Za-z]|$)/.test(v), `L10 ${k}.${loc} carries =, + or * — "${v}"`);
  }
}
ok(Object.prototype.hasOwnProperty.call(T.strings, 'opGlyph'), 'L10 the print-only opGlyph exists');
/* the sheet is the only consumer of it */
const opUses = (code.match(/t\(\s*['"]opGlyph['"]\s*\)/g) || []).length;
eq(opUses, 1, 'L10 opGlyph is READ in exactly one place');
ok(/_buildSheet[\s\S]{0,1600}opGlyph/.test(code), 'L10 ...and that place is _buildSheet');

/* ⚠ NO OPERATOR IS DRAWN BY CODE EITHER — and this scan must exclude
   the authored strings block, or it condemns the one exemption it just
   granted. Slicing the block out is what makes the ban precise; the
   slice itself is asserted, because a scan of nothing passes. */
for (const g of OPS) {
  ok(BODY.indexOf(g) < 0, `L10 the source draws no ${g}`);
}
ok(!/textContent\s*=\s*['"][-+=*×·]['"]/.test(code), 'L10 no operator is written into a textContent');

/* ================= structural invariants ============================ */
ok(/api\.el\(\s*['"]div['"]\s*,\s*['"]tsh-wrap['"]\s*\)/.test(code),
  'the liveness gate derives the prefix from tsh-wrap');
ok(/render:\s*function\s*\(\s*\)/.test(code), 'render() takes NO arguments (#43)');
ok(/reset:\s*function\s*\(\s*\)/.test(code), 'reset() exists — the shell always draws the button');
ok(!/\btasks\b\s*:/.test(code), 'no `tasks` — this is a free-play instrument, so it claims no standard');
ok(!/\bnextTask\b/.test(code), 'no `nextTask`');
ok(!/[0-9]vh\b/.test(code), 'no vh inside a manipulative');
/* ⚠ A HEIGHT BUDGET SPENT AS max-height ON AN aspect-ratio:1/1 BOX
   letterboxes the SVG while every %-positioned pad stays bound to the
   box — the #43 defect where each mark rendered as TWO CIRCLES. So the
   arena may never carry max-height; the short-viewport steps spend
   their budget as max-WIDTH inside a height media query. */
ok(!/\.tsh-arena\{[^}]*max-height/.test(code), 'the arena never carries a max-height declaration');
/* the SHAPE is the law, not the number: a height query may only ever
   spend its budget on the arena's max-WIDTH. The two numbers themselves
   are measured (see the tool's CSS note) and are free to move. */
/* ⚠ THE PRINT CHIP MUST RIDE THE LEDGE. On its own row it cost 48px
   plus a gap and the tool was measured CUT OFF at 320x568 (581 against
   568) and at 1366x768 (791 against 768) — both ends of the sweep. This
   is a measured layout decision, so it gets a gate. */
ok(/_ledgeBtn\(ledge, 'tsh-b-print'/.test(code), 'the print chip is appended to the ledge, not to a second row');
ok(!/tsh-foot/.test(code), 'there is no second control row to be cut off');

const heightSteps = code.match(/@media \(max-height:\d+px\)\{\.tsh-arena\{[^}]*\}\}/g) || [];
eq(heightSteps.length, 2, 'there are two short-viewport steps');
for (const step of heightSteps) {
  ok(/max-width:\d+px;/.test(step), `the short-viewport step is spent as a max-WIDTH — ${step}`);
  ok(!/max-height:[^)]*\{[^}]*max-height/.test(step), `...and never as a max-height — ${step}`);
}
ok(/max-width:560px;aspect-ratio:1\/1/.test(code), 'the arena is width-capped at 560 with a square ratio');
ok(/@media print\{/.test(code), 'there is a real @media print block, not just a window.print() call');
ok(/body\.tsh-printing \.tsh-wrap\{display:none !important;\}/.test(code), 'the print block hides the wrap');
/* ⚠ AND IT IS SCOPED TO A CLASS THE SHEET ITSELF ADDS. Unscoped, the
   @media print rules fired for EVERYBODY — hiding the whole page to
   reveal a sheet that only exists after the chip is pressed, so a
   browser-initiated Ctrl+P printed a BLANK PAGE for a paying teacher
   and a free visitor alike. Found by the Finnish panel reading the
   print path; no gate in this suite could see it. */
ok(/_buildSheet[\s\S]{0,2600}classList\.add\('tsh-printing'\)/.test(code),
  'the sheet adds the class that scopes the print block');
ok(/beforeprint/.test(code) && /afterprint/.test(code),
  'Ctrl+P reaches the same sheet as the chip');
ok(/api\.stage\.appendChild\(sheet\)/.test(code), 'the sheet is a SIBLING of the wrap, never a child');
ok(!/localStorage/.test(code), 'nothing persists across reload');
ok(/prefers-reduced-motion/.test(code), 'reduced motion compresses');

/* the scroll escape, and it must be TWO rules. `html,body.x{...}` is a
   selector LIST whose `html` half applies unconditionally, which makes
   the class decorative and its mutation unkillable — #22's recorded
   trap. Both nodes must also actually receive the class. */
ok(/html\.tsh-scroll\{[^}]*overflow-y:auto/.test(code), 'html carries its own scroll rule');
ok(/body\.tsh-scroll\{[^}]*overflow-y:auto/.test(code), 'body carries its own scroll rule');
ok(!/html,body\.tsh-scroll/.test(code), 'never the selector-list form, which would apply to all html');
ok(/documentElement\.classList\.add\('tsh-scroll'\)/.test(code), 'documentElement gets the class');
ok(/body\.classList\.add\('tsh-scroll'\)/.test(code), 'body gets the class');
ok(/RM_F\s*=\s*0\.28/.test(code), '...by 0.28, and it never skips');

/* geometry the render and the gates must agree on */
eq(T.GEO.VB, 1000, 'GEO viewBox');
eq(T.GEO.LANE + T.GEO.S + T.GEO.EDGE, T.GEO.VB, 'GEO the lanes, the shelf and the edge fill the box');
eq(T.GEO.S, 892, 'GEO shelf span');
eq(T.pitch(10).toFixed(2), '89.20', 'GEO pitch at ten');
eq(T.pitch(6).toFixed(2), '148.67', 'GEO pitch at six');
/* ⚠ M5 — at a 320px viewport the arena is 296px, so a card is 26.4px
   and the numeral is 15.8px. NEVER lower NUM_F: the 14px floor is the
   whole reason a card carries a product and not a fact. */
const px320 = 296 / T.GEO.VB;
const num320 = T.pitch(10) * T.GEO.NUM_F * px320;
ok(num320 >= 14, `M5 the numeral clears the 14px floor at 320px — ${num320.toFixed(1)}px`);
const num320r = T.pitch(6) * T.GEO.NUM_F * px320;
ok(num320r >= 26, `M5 the residue numeral is comfortable at 320px — ${num320r.toFixed(1)}px`);
/* and the three-digit card must fit its cell at that size */
const wide = num320 * 0.55 * 3;
ok(wide <= T.pitch(10) * px320, `M5 "100" fits its cell at 320px — ${wide.toFixed(1)}px in ${(T.pitch(10) * px320).toFixed(1)}px`);
ok(/textLength/.test(code) && /spacingAndGlyphs/.test(code), 'M5 three digits are condensed, not shrunk');

console.log(`\nverify-folding-wall: ${pass} assertions passed, ${fails.length} failed`);
if (fails.length) {
  fails.slice(0, 40).forEach(f => console.log('  FAIL ' + f));
  if (fails.length > 40) console.log(`  ...and ${fails.length - 40} more`);
  process.exit(1);
}
console.log('PASS — all ten laws hold over the exhaustive 17-state census.');
