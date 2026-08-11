/* =====================================================================
   MODEL GATE — TOOL #54, THE DOUBLING MIRROR (rebuilt 2026-08-11)
   =====================================================================
   ⚠⚠ THE ORACLE IS DERIVED FROM THE STATED RULE, NOT FROM THE CODE.
   Reading the expectation off the tool is the gate marking its own
   homework, and it once let 19 of 51 mutations survive on a sibling.

   THE RULE, in words: a SHUT TRAY IS THE UNDIVIDED WHOLE and an OPEN
   TRAY IS TWO PARTS. Closing composes — and when the far leaf is
   empty it RECEIVES the same number as the near leaf, which is the
   doubling. Opening decomposes — the whole shares out to the two
   leaves, and an odd total leaves exactly one counter on the spine
   pad. That one counter is never refused: it either JOINS the near
   leaf (a double and one more) or FETCHES a partner (a double one
   short). Nothing on this tray ever stalls.

   ⚠⚠ AND THE GATE THIS ONE REPLACES CERTIFIED AN INVISIBLE LEAF. The
   old probe asserted `far===4` by COUNTING `.dbm-c` NODES while the
   far leaf was `visibility:hidden` — querySelectorAll counts nodes
   inside a hidden parent. That is a render defect and belongs to
   `probe-doubling-mirror.js`; what belongs HERE is the invariant the
   render is supposed to show, stated so a mutation cannot dodge it.

   Run: node scripts/verify-doubling-mirror.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');

const DIR = process.env.DOUBLING_MIRROR_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(DIR, 'doubling-mirror.js');
const T = require(SRC);
const G = T.GEO;

let pass = 0;
const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };
const eq = (a, b, m) => ok(a === b, m + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b));

/* the oracle, from the rule above */
const oHalf = t => Math.floor(t / 2);
const oOdd = t => t % 2;
const REACH = [['twenty', G.CAP], ['ten', G.CAP_LOW]];

/* drive the near leaf to n using ONLY the public move */
function setNear(reach, n, ask) {
  let s = T.newState(reach, ask ? 'on' : 'off');
  let guard = 0;
  while (s.near < n && guard++ < 40) { const x = T.place(s, 1); if (!x) break; s = x; }
  while (s.near > n && guard++ < 40) { const x = T.place(s, -1); if (!x) break; s = x; }
  return s;
}

/* L0 — constants, before anything uses them */
const NEEDED = ['CAP', 'CAP_LOW', 'ROW',
  'T_CLOSE', 'T_OPEN', 'T_PLACE', 'T_DEAL_STEP', 'T_REFUSE', 'T_BEAT',
  'RM_F', 'RM_FLOOR', 'FOLD_DEG', 'CHAN_OPEN', 'CHAN_SHUT', 'PERSP',
  'NUDGE_DEG', 'SHEEN_AT',
  'SND_PLACE', 'SND_CLOSE', 'SND_OPEN', 'SND_SIDE', 'SND_REFUSE', 'T_SND_DEBOUNCE'];
ok(NEEDED.length >= 20, 'L0 non-vacuity: the constant list is implausibly short');
NEEDED.forEach(k => ok(typeof G[k] === 'number' && isFinite(G[k]), 'L0 GEO.' + k + ' missing'));
ok(G.SND_DEBOUNCE === undefined, 'L0 the millisecond debounce is back under a frequency name');
eq(G.CAP, 9, 'L0 CAP moved — nine gives the whole within-20 doubles family');
eq(G.CAP_LOW, 5, 'L0 CAP_LOW moved');
eq(G.ROW, 5, 'L0 ROW moved');
eq(T.premium, false, 'L0 ⚠⚠ the tool ships premium:true');
ok(T.tasks === undefined && T.nextTask === undefined,
  'L0 ⚠ a tasks/nextTask surface appeared — the shell would render activity chrome');

/* ================================================================== */
/* ⭐ L1 — CLOSING COMPOSES, AND AN EMPTY FAR LEAF RECEIVES THE DOUBLE. */
{
  let seen = 0, doubled = 0, gathered = 0;
  REACH.forEach(([reach, cap]) => {
    for (let n = 0; n <= cap; n++) {
      const s = setNear(reach, n, false);
      seen++;
      eq(s.near, n, 'L1 the near leaf did not take ' + n + ' at ' + reach);
      eq(s.far, 0, 'L1 a fresh tray has counters on the far leaf');
      eq(s.inTray, 0, 'L1 an open tray holds counters in the tray');
      ok(!s.shut, 'L1 a fresh tray is shut');
      eq(T.total(s), n, 'L1 total on an open tray');

      /* the far leaf is EMPTY until the hinge shuts — the answer must
         not exist before the class has said it */
      if (n === 0) {
        ok(T.close(s) === null, 'L1 an empty tray closed at ' + reach);
        continue;
      }
      const c = T.close(s);
      ok(c !== null, 'L1 close refused at n=' + n + ' ' + reach);
      if (!c) continue;
      doubled++;
      ok(c.shut, 'L1 the tray did not shut');
      eq(c.inTray, 2 * n, 'L1 ⭐ closing an empty-far tray must DOUBLE at n=' + n);
      eq(c.near, 0, 'L1 a shut tray still holds counters on the near leaf');
      eq(c.far, 0, 'L1 a shut tray still holds counters on the far leaf');
      eq(c.odd, 0, 'L1 a shut tray still holds an odd one');
      eq(T.total(c), 2 * n, 'L1 total on a shut tray');
      eq(T.incoming(s), n, 'L1 the far leaf must receive exactly n');
      ok(T.close(c) === null, 'L1 a shut tray closed again');

      /* ⭐ CONSERVATION: opening returns exactly what was put in */
      const o = T.open(c);
      ok(o !== null, 'L1 open refused on a shut tray of ' + (2 * n));
      if (!o) continue;
      ok(!o.shut, 'L1 ⚠⚠ open() left the tray SHUT — a control with no consequence');
      eq(o.inTray, 0, 'L1 an open tray still holds the whole');
      eq(o.near, n, 'L1 ⭐ the round trip broke: near');
      eq(o.far, n, 'L1 ⭐ the round trip broke: far');
      eq(o.odd, 0, 'L1 an even whole left an odd one');
      eq(T.total(o), 2 * n, 'L1 ⭐ CONSERVATION broken across close/open');
      ok(T.open(o) === null, 'L1 an open tray opened again');

      /* gathering: both leaves loaded, closing merely composes */
      const g = T.close(o);
      ok(g !== null, 'L1 a gathered tray refused to close at n=' + n);
      if (g) { gathered++; eq(g.inTray, 2 * n, 'L1 gathering changed the total'); }

      /* ⭐⭐ AND GATHERING MUST TAKE THE ODD ONE WITH IT. Closing over a
         tray whose leftover sits on the spine pad has to carry that
         counter into the whole — dropping it destroys a counter in
         front of the class, and conservation is the one law this
         apparatus cannot break. Only reachable from an ODD total, so
         it is walked here from the odd tray one above this one. */
      if (2 * n + 1 <= cap * 2) {
        let od = setNear(reach, Math.ceil((2 * n + 1) / 2), false);
        od = T.close(od);
        while (od && od.inTray > 2 * n + 1) od = T.place(od, -1);
        while (od && od.inTray < 2 * n + 1) od = T.place(od, 1);
        const oo = od && T.open(od);
        if (oo) {
          eq(oo.odd, 1, 'L1 an odd total opened with no counter on the pad at t=' + (2 * n + 1));
          const back = T.close(oo);
          ok(back !== null, 'L1 a tray with a waiting counter refused to close at t=' + (2 * n + 1));
          if (back) eq(back.inTray, 2 * n + 1,
            'L1 ⚠⚠ CLOSING DROPPED THE COUNTER WITH NO PARTNER — a counter vanished at t=' + (2 * n + 1));
        }
      }

      /* ⭐⭐ AND NOTHING MAY BE PLACED WHILE ONE COUNTER STILL WAITS.
         The leftover has to be settled first, or the class is adding to
         a tray whose own arithmetic is unfinished — and the say-line
         for that refusal (saidSettleFirst) is one of the five causes
         ten native panels proved was missing. */
      if (2 * n + 1 <= cap * 2) {
        let wd = setNear(reach, Math.ceil((2 * n + 1) / 2), false);
        wd = T.close(wd);
        while (wd && wd.inTray > 2 * n + 1) wd = T.place(wd, -1);
        while (wd && wd.inTray < 2 * n + 1) wd = T.place(wd, 1);
        const wo = wd && T.open(wd);
        if (wo && wo.odd === 1) {
          ok(T.place(wo, 1) === null,
            'L1 ⚠⚠ a counter was ADDED while one still waited for a home, at t=' + (2 * n + 1));
          ok(T.place(wo, -1) === null,
            'L1 ⚠⚠ a counter was REMOVED while one still waited for a home, at t=' + (2 * n + 1));
        }
      }
    }
  });
  ok(seen === (G.CAP + 1) + (G.CAP_LOW + 1), 'L1 non-vacuity: trays walked');
  ok(doubled >= G.CAP, 'L1 non-vacuity: doublings walked');
  ok(gathered >= G.CAP, 'L1 non-vacuity: gatherings walked');
  console.log('  walked ' + seen + ' trays; ' + doubled + ' doubled, ' + gathered + ' gathered');
}

/* ================================================================== */
/* ⭐⭐ L2 — OPENING DECOMPOSES, AND NOTHING EVER STALLS. Every total the
   tray can hold must open, conserve, and — when it leaves one counter
   with no partner — offer AT LEAST ONE settle move. A stall is the one
   thing this tool's header promises never happens. */
{
  let totals = 0, odds = 0, evens = 0, gaveOk = 0, fetchOk = 0, fetchRefused = 0;
  REACH.forEach(([reach, cap]) => {
    for (let t = 2; t <= cap * 2; t++) {
      /* reach the shut tray through the PUBLIC moves only */
      let s = setNear(reach, Math.ceil(t / 2), false);
      s = T.close(s);
      ok(s !== null, 'L2 could not shut a tray at t=' + t);
      if (!s) continue;
      while (s.inTray > t) { const x = T.place(s, -1); if (!x) break; s = x; }
      while (s.inTray < t) { const x = T.place(s, 1); if (!x) break; s = x; }
      eq(s.inTray, t, 'L2 could not build a shut tray of ' + t + ' at ' + reach);
      totals++;

      const o = T.open(s);
      ok(o !== null, 'L2 ⚠ a tray of ' + t + ' could not be opened at ' + reach);
      if (!o) continue;
      eq(o.near, oHalf(t), 'L2 ⭐ the near leaf at t=' + t);
      eq(o.far, oHalf(t), 'L2 ⭐ the far leaf at t=' + t);
      eq(o.odd, oOdd(t), 'L2 ⭐ the odd one at t=' + t);
      eq(T.total(o), t, 'L2 ⭐⭐ CONSERVATION broken by open at t=' + t);
      eq(o.near, o.far, 'L2 the two leaves are unequal straight out of an open');
      eq(T.waiting(o), oOdd(t) === 1, 'L2 waiting disagrees with the remainder');
      eq(T.outside(o), oOdd(t), 'L2 outside disagrees with the remainder');

      if (oOdd(t) === 0) {
        evens++;
        ok(T.give(o) === null, 'L2 give took on an even tray at t=' + t);
        ok(T.fetch(o) === null, 'L2 fetch took on an even tray at t=' + t);
        continue;
      }
      odds++;
      /* ⭐⭐ NO STALL: at least one settle move must exist, always */
      const g = T.give(o), f = T.fetch(o);
      ok(!!g || !!f,
        'L2 ⚠⚠ STALL at ' + reach + ' t=' + t + ' — one counter has no partner and NEITHER move is possible');
      if (g) {
        gaveOk++;
        eq(T.total(g), t, 'L2 give changed the total at t=' + t);
        eq(g.odd, 0, 'L2 give left the odd one waiting');
        eq(g.near - g.far, 1, 'L2 ⭐ give must leave a double and ONE more at t=' + t);
        eq(g.near, oHalf(t) + 1, 'L2 give put the counter somewhere else');
        ok(T.give(g) === null, 'L2 give ran twice');
      }
      /* ⭐⭐ AND BOTH MOVES ARE ALWAYS AVAILABLE — the stronger claim.
         The largest odd total a 2*cap tray can hold is 2*cap-1, which
         halves to cap-1, so a leaf always has room for one more. The
         child is never offered a dead button. */
      ok(!!g, 'L2 ⚠⚠ give was refused at ' + reach + ' t=' + t + ' — a dead button under a live question');
      ok(!!f, 'L2 ⚠⚠ fetch was refused at ' + reach + ' t=' + t + ' — a dead button under a live question');
      if (f) {
        fetchOk++;
        eq(T.total(f), t + 1, 'L2 ⭐ fetch must bring exactly ONE new counter at t=' + t);
        eq(f.odd, 0, 'L2 fetch left the odd one waiting');
        eq(f.near, f.far, 'L2 ⭐ fetch must leave the leaves EQUAL at t=' + t);
        eq(f.near, oHalf(t) + 1, 'L2 fetch built the wrong leaves');
        ok(f.near <= cap && f.far <= cap, 'L2 fetch overfilled a leaf at t=' + t);
        ok(T.fetch(f) === null, 'L2 fetch ran twice');
      }
    }
  });
  ok(totals >= 20, 'L2 non-vacuity: only ' + totals + ' totals walked');
  ok(odds > 0 && evens > 0, 'L2 non-vacuity: odds=' + odds + ' evens=' + evens);
  ok(gaveOk === odds && fetchOk === odds,
    'L2 non-vacuity: every odd tray must offer BOTH moves — give=' + gaveOk + ' fetch=' + fetchOk + ' odds=' + odds);
  console.log('  opened ' + totals + ' totals; ' + odds + ' left one with no partner, ' +
    gaveOk + ' could give, ' + fetchOk + ' could fetch — no dead buttons');
}

/* ================================================================== */
/* ⭐ L3 — THE MATERIAL PUSHES BACK. The tray can express n+n and
   n+(n+1) AND NOTHING ELSE, and that is a property of the furniture
   rather than a rule about the child. */
{
  REACH.forEach(([reach, cap]) => {
    let s = setNear(reach, 4 > cap ? cap - 1 : 4, false);
    s = T.close(s); s = T.open(s);
    const base = s.near;
    const up = T.place(s, 1);
    ok(up !== null, 'L3 the near leaf could not take one more at ' + reach);
    if (up) {
      eq(up.near - up.far, 1, 'L3 one more must make a near-double');
      ok(T.place(up, 1) === null,
        'L3 ⚠⚠ the tray accepted TWO more on one leaf — n+(n+2) is not a thing this apparatus can hold');
      const back = T.place(up, -1);
      ok(back !== null && back.near === base, 'L3 the extra counter could not be taken off again');
    }
    /* and never below the far leaf */
    let ss = setNear(reach, 3, false); ss = T.close(ss); ss = T.open(ss);
    ok(T.place(ss, -1) === null, 'L3 ⚠ the near leaf dropped BELOW the far leaf at ' + reach);
  });

  /* out-of-range is refused, never clamped */
  REACH.forEach(([reach, cap]) => {
    const s = setNear(reach, cap, false);
    ok(T.place(s, 1) === null, 'L3 the near leaf went past the cap at ' + reach);
    const z = setNear(reach, 0, false);
    ok(T.place(z, -1) === null, 'L3 the near leaf went below zero at ' + reach);
    ok(T.place(s, 2) === null, 'L3 place accepted a step of two');
    ok(T.place(s, 0) === null, 'L3 place accepted a step of zero');
    /* the shut tray tops out at 2*cap — above it the odd one would
       have no leaf to join and no partner to fetch */
    let c = T.close(s);
    ok(c && c.inTray === cap * 2, 'L3 the biggest shut tray is not 2*cap at ' + reach);
    if (c) ok(T.place(c, 1) === null,
      'L3 ⚠⚠ the shut tray went past 2*cap — that total STALLS its own odd counter');
  });
}

/* ================================================================== */
/* ⭐ L4 — THE CLAIM IS A CLAIM. It gates the reveal and it can never
   touch another field: a prediction that changed the apparatus would
   be the apparatus answering its own question. */
{
  const s = setNear('twenty', 4, true);
  ok(T.predMode(s) === 'double', 'L4 the double question is not being asked');
  ok(T.close(s) === null, 'L4 ⚠⚠ the hinge moved with no claim — the beat is theatre');
  const vals = T.predValues(s);
  eq(vals.length, G.CAP, 'L4 the double strip is the wrong length');
  ok(vals.every(v => v % 2 === 0), 'L4 the double strip offers an odd total');
  ok(T.claimNum(s, 3) === null, 'L4 the double strip accepted a value it does not offer');
  ok(T.claimNum(s, 2.5) === null, 'L4 the strip accepted a fraction');

  const c1 = T.claimNum(s, 8);
  ok(c1 !== null, 'L4 a legal claim was refused');
  if (c1) {
    ['near', 'far', 'inTray', 'odd', 'shut', 'cap'].forEach(k => {
      eq(c1[k], s[k], 'L4 ⚠⚠ claiming changed `' + k + '` — a prediction must never move the apparatus');
    });
    ok(T.claimNum(c1, 8) === null, 'L4 the same numeral latched twice');
    ok(T.close(c1) !== null, 'L4 the hinge stayed locked after a claim');
  }

  /* the split question takes one OR two numerals, and a third refuses */
  let sh = T.close(T.claimNum(setNear('twenty', 4, true), 8));
  ok(T.predMode(sh) === 'split', 'L4 the split question is not being asked');
  ok(T.open(sh) === null, 'L4 ⚠ the tray opened with no claim');
  ok(T.predValues(sh).length === G.CAP, 'L4 the split strip is the wrong length');
  const a = T.claimNum(sh, 4);
  ok(a && a.claim.length === 1, 'L4 the first split numeral did not latch');
  const b = T.claimNum(a, 5);
  ok(b && b.claim.length === 2, 'L4 the second split numeral did not latch');
  ok(T.claimNum(b, 3) === null, 'L4 ⚠ a THIRD numeral latched — the claim is one or two');
  ok(T.open(a) !== null, 'L4 one numeral was not enough to open');

  /* ⚠ a gathered tray asks nothing: the class can already see both
     leaves, so demanding a numeral there is ceremony (and it once made
     a gathered tray impossible to shut at all) */
  let go = T.open(T.claimNum(T.close(T.claimNum(setNear('twenty', 3, true), 6)), 3));
  const near4 = T.place(go, 1);
  ok(near4 !== null, 'L4 setup: could not build a near-double');
  if (near4) {
    ok(!T.needsClaim(near4), 'L4 a gathered tray is asking a question it does not have');
    ok(T.close(near4) !== null, 'L4 ⚠⚠ a gathered tray could not be shut');
  }

  /* with the asking turned off, the hinge moves freely */
  const q = setNear('twenty', 4, false);
  ok(T.predMode(q) === null, 'L4 the strip asks when the setting says do not');
  ok(T.claimNum(q, 8) === null, 'L4 a claim latched with the asking turned off');
  ok(T.close(q) !== null, 'L4 the hinge stayed locked with the asking turned off');
}

/* ================================================================== */
/* L5 — the refusal table is TOTAL. Every literal any handler passes to
   _refuse must have a key, or the tool announces something false. */
{
  const src = fs.readFileSync(SRC, 'utf8').split(String.fromCharCode(13, 10)).join('\n');
  const body = src.replace(/\/\*[\s\S]*?\*\//g, '');
  const why = T._WHY;
  ok(why && typeof why === 'object', 'L5 there is no _WHY table');
  const causes = {};
  let m;
  const re = /_refuse\('(\w+)'\)/g;
  while ((m = re.exec(body)) !== null) causes[m[1]] = 1;
  /* the resolvers return the cause as a string too. ⚠ SCOPED TO THE
     RESOLVER ZONE: an unscoped `return '<word>'` also catches
     predMode's 'double' and 'split', which are not refusal causes at
     all — the first run of this check reported both as missing keys,
     which is a gate condemning correct code. */
  const zone = body.slice(body.indexOf('_whyPlace:'), body.indexOf('_WHY:'));
  ok(zone.length > 200 && zone.indexOf('_whySettle') > 0,
    'L5 the resolver zone could not be isolated — this check is not measuring what it claims');
  /* ⚠ A TERNARY RETURN IS STILL A RETURN. `return '(\w+)';` missed
     `return d > 0 ? 'trayFull' : 'trayFloor';` entirely, so two live
     causes were never covered by the has-a-key direction at all — the
     forward half of this check had a hole the reachability half
     happened to cover. Take every quoted word on a return statement. */
  const re2 = /return ([^;]*);/g;
  while ((m = re2.exec(zone)) !== null) {
    (m[1].match(/'(\w+)'/g) || []).forEach(q => { causes[q.slice(1, -1)] = 1; });
  }
  const all = Object.keys(causes);
  ok(all.length >= 6, 'L5 non-vacuity: only ' + all.length + ' refusal causes found in the source');
  ok(causes.trayFull && causes.trayFloor,
    'L5 poison: the source scan still cannot see a cause returned from a ternary');
  all.forEach(c => {
    ok(!!why[c], 'L5 ⚠⚠ the refusal cause `' + c + '` has NO key — it would announce the default');
  });
  Object.keys(why).forEach(k => {
    ok(!!T.strings[why[k]], 'L5 _WHY.' + k + ' names a string that does not exist: ' + why[k]);
  });
  /* ⚠⚠ AND THE DEFAULT MUST BE TRUE IN EVERY STATE. The old default
     said "the hinge is already open" and fell through to it from a
     cause with no branch — false, and reachable. */
  ok(!!T.strings.saidNothingToDo, 'L5 there is no state-independent default');
  ok(/_WHY\[why\]\s*\|\|\s*'saidNothingToDo'/.test(body),
    'L5 ⚠⚠ the refusal default is not the state-independent string');
  console.log('  refusal causes: ' + all.sort().join(', '));

  /* ⭐⭐ L5b — EVERY DECLARED CAUSE MUST BE OBSERVED FIRING. A cause
     that no walk reaches is a sentence I would author in eleven
     languages having never once seen it happen — the #39 dead-string
     class, and the reason `saidFetchFull` shipped unreachable. The
     source scan above proves a cause HAS a key; only this proves the
     key is ever ASKED FOR. It is driven by REACHABILITY over the whole
     state space, not by a hand-written list of situations I happened
     to think of.
     ⚠ It reads the tool's own resolvers — never a reimplementation of
     them — so it cannot agree with a bug by sharing it. */
  /* ⚠⚠ BOUNDED, BECAUSE A GATE THAT HANGS IS A GATE THAT SURVIVED.
     The first version of this walk had an unbounded queue, so the
     mutation that deletes `place`'s leaf cap made the state space
     infinite and the harness scored it TIMED OUT — which it counts as
     a survival. The bound is far above the true space (measured a few
     hundred states) and BLOWING it is a FAILURE, never a quiet stop:
     an unbounded state space IS the defect being reported. */
  const BOUND = 20000;
  const reached = {};
  const shim = Object.create(T);
  let explored = 0, blew = false;
  [5, 9].forEach(function (cap) {
    const seen = {}, queue = [T.newState(cap === 5 ? 'ten' : 'twenty', 'on')];
    const key = s => [s.cap, s.inTray, s.near, s.far, s.odd, s.shut, s.claim.join('.')].join('|');
    while (queue.length) {
      if (++explored > BOUND) { blew = true; break; }
      const s = queue.shift();
      if (seen[key(s)]) continue;
      seen[key(s)] = 1;
      shim.st = s;
      /* ask each resolver exactly where its own move refuses */
      [-1, 1].forEach(function (d) {
        const n = T.place(s, d);
        if (n) queue.push(n); else reached[shim._whyPlace(d)] = 1;
      });
      const c = T.close(s); if (c) queue.push(c); else reached[shim._whyClose()] = 1;
      const o = T.open(s); if (o) queue.push(o); else reached[shim._whyOpen()] = 1;
      const g = T.give(s); if (g) queue.push(g);
      const f = T.fetch(s); if (f) queue.push(f);
      if (!g && !f) reached[shim._whySettle()] = 1;
      /* ⚠⚠ THE RENDERED CHIP SET, NEVER `1 .. cap*2`. `_buildChips`
         draws exactly `predValues(s)`, which for the double question is
         the EVEN numerals only — so a walk pressing every integer
         presses chips that DO NOT EXIST, `claimNum` rejects them on
         `predValues.indexOf(v) < 0`, and `_whyClaim` returns 'nothing'.
         That phantom press was the SOLE observation of the `nothing`
         cause, so this gate was certifying a sentence no child can
         reach — the non-vacuity rule inverted, manufacturing coverage
         instead of measuring it. A Finnish panel found it by running
         the walk twice, once as written and once faithful to the UI. */
      T.predValues(s).forEach(function (v) {
        const q = T.claimNum(s, v);
        if (q) queue.push(q); else reached[shim._whyClaim(v)] = 1;
      });
    }
  });
  ok(!blew, 'L5b ⚠⚠ the reachable state space blew ' + BOUND +
    ' — a bound on the tray or a leaf is gone, and the apparatus no longer pushes back');
  /* ⭐ `nothing` IS THE DEFAULT OF LAST RESORT, AND THE CLAIM ABOUT IT
     IS THE OPPOSITE ONE. `_refuse` falls back to saidNothingToDo for a
     cause with no key, and each resolver needs a final return to be a
     total function — so the honest assertion is that it NEVER fires,
     because if it does, some resolver has fallen through to "nothing
     can change just now" at a moment when something can. That is
     exactly the bug this rebuild's header records. Stating it as an
     exemption would have hidden it; stating it as a positive
     assertion tests it. */
  const missed = Object.keys(why).filter(c => c !== 'nothing' && !reached[c]);
  ok(Object.keys(reached).length >= 6,
    'L5b non-vacuity: the walk observed only ' + Object.keys(reached).length + ' causes — it is not exploring');
  ok(missed.length === 0,
    'L5b ⚠⚠ declared but NEVER REACHED, so its string would ship unseen: ' + missed.join(', '));
  ok(!reached.nothing,
    'L5b ⚠⚠ a resolver FELL THROUGH to saidNothingToDo — it says nothing can change, in a state where something can');
  console.log('  causes observed firing: ' + Object.keys(reached).sort().join(', '));
}

/* L6 — every named constant reaches a call site */
{
  const src = fs.readFileSync(SRC, 'utf8').split(String.fromCharCode(13, 10)).join('\n');
  const body = src.replace(/\/\*[\s\S]*?\*\//g, '');
  const declared = Object.keys(G);
  ok(declared.length >= 20, 'L6 non-vacuity: implausibly few constants');
  declared.forEach(function (k) {
    ok((body.match(new RegExp('GEO\\.' + k + '\\b', 'g')) || []).length >= 1,
      'L6 ⚠ GEO.' + k + ' is DEAD — declared, documented and never read');
  });
  /* ⚠ the beat must NOT pass through _dur(): a wait is not movement */
  ok(!/_dur\(\s*GEO\.T_BEAT/.test(body), 'L6 ⚠⚠ T_BEAT goes through _dur() — a wait is not movement');
}

/* ================================================================== */
/* L7 — strings. The ban list is the founding ruling, mechanised. */
{
  /* ⚠⚠ A MIRROR DOUBLES AN APPEARANCE, NOT A QUANTITY. Nothing in this
     tool may be described as a reflection, and the fold belongs to
     `folding-sheet`. `twin` is its involution. */
  /* ⚠⚠ INFLECTIONS. A whole-word ban on `fold` does not see `folds`,
     `folded` or `folding`, and a mutation proved it by shipping "The
     tray folds over." straight past this gate. English inflects too —
     treating it as the one language that does not is how the source
     locale keeps escaping its own fence. The right boundary is opened
     to a suffix; the LEFT boundary stays closed, so `unfold` and
     `scaffold` are still not matches.
     ⚠ `image` gets no suffix (it would swallow nothing useful and
     `imagine` is a legitimate word a teacher note might want). */
  const BAN = ['mirror', 'reflection', 'reflect', 'glass', 'twin', 'fold', 'crease'];
  const EXACT = ['image', 'odd', 'even'];
  /* ⚠⚠ AND ENGLISH DROPS THE FINAL `e` BEFORE `-ed`/`-ing`: *scored*
     is score+d and *scoring* is scor+ing, so a naive `w(?:s|ed|ing)?`
     lets both straight through — which the poison caught the moment it
     was asked a question about a word that actually ends in e. */
  const ban = function (w) {
    const core = /e$/.test(w)
      ? '(?:' + w + '(?:s|d)?|' + w.slice(0, -1) + '(?:ed|ing))'
      : w + '(?:s|es|ed|ing)?';
    return new RegExp('(?<!\\p{L})' + core + '(?!\\p{L})', 'iu');
  };
  const banX = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
  const all = Object.keys(T.strings);
  ok(all.length >= 40, 'L7 non-vacuity: implausibly few strings (' + all.length + ')');
  all.forEach(function (k) {
    const v = T.strings[k];
    ok(v && typeof v === 'object' && !Array.isArray(v),
      'L7 ⚠ `' + k + '` is not a per-locale object — the shell will render the KEY');
    ok(v && typeof v.en === 'string' && v.en.length > 0, 'L7 ⚠ `' + k + '` has no English');
  });
  all.filter(k => k !== 'title').forEach(function (k) {
    BAN.forEach(function (w) {
      ok(!ban(w).test(T.strings[k].en),
        'L7 ⚠⚠ `' + k + '` uses "' + w + '" — the founding ruling, or another tool\'s part');
    });
    EXACT.forEach(function (w) {
      ok(!banX(w).test(T.strings[k].en),
        'L7 ⚠⚠ `' + k + '` uses "' + w + '" — parity is #53\'s subject, not this tool\'s');
    });
  });
  /* poison, BOTH directions, for BOTH matchers — an inflection the ban
     must catch, and a longer word it must not */
  ok(ban('mirror').test('before the mirror'), 'L7 poison: the ban failed to fire');
  ok(ban('fold').test('The tray folds over.'), 'L7 poison: ⚠ the ban cannot see an INFLECTION');
  ok(ban('fold').test('a folded tray'), 'L7 poison: the ban cannot see a past participle');
  ok(!ban('fold').test('an unfolded claim'), 'L7 poison: the ban fired across a PREFIX');
  ok(!ban('fold').test('the scaffold'), 'L7 poison: the ban fired inside another word');
  ok(banX('odd').test('the odd counter'), 'L7 poison: the parity ban failed to fire');
  ok(!banX('odd').test('a small oddity'), 'L7 poison: the parity ban over-reached');
  eq(T.strings.title.en, 'The Doubling Mirror', 'L7 the product name is the operator\'s');

  /* ⚠ PARITY BELONGS TO #53. The odd one here is an ADDEND, not a
     diagnostic, and the words must not appear. */
  ['odd number', 'even number', 'parity'].forEach(function (w) {
    all.forEach(function (k) {
      ok(!new RegExp(w, 'i').test(T.strings[k].en),
        'L7 ⚠ `' + k + '` names parity — that is the Pair Gate\'s subject');
    });
  });

  /* the retired keys must be GONE, not fossilised */
  ['setStart', 'startSmall', 'startTen', 'sideLow', 'sideHigh', 'sideNameNear', 'sideNameFar']
    .forEach(k => ok(T.strings[k] === undefined, 'L7 ⚠ the retired key `' + k + '` is back'));
  ok(T.giveSide === undefined, 'L7 ⚠⚠ giveSide is back — the side choice was a reflection, not a decision');

  /* the redesign's own keys exist */
  ['ariaShut', 'setReach', 'reachTwenty', 'reachTen', 'setPredict', 'predictOn', 'predictOff',
    'setAsk', 'predAsk', 'predSplitAsk', 'predChip', 'predChipLeaf', 'oddAsk', 'giveLeaf',
    'fetchOne', 'saidPlaceShut', 'saidPredict', 'saidPredictTwo', 'saidGathered', 'saidGave',
    'saidFetched', 'saidOnlyDoubles', 'saidPredictFirst', 'saidClaimIsIn',
    'saidNothingToDo', 'printAsk'].forEach(function (k) {
    ok(!!T.strings[k], 'L7 ⚠ the redesign key `' + k + '` is missing');
  });

  /* ⭐ the odd-one question must offer BOTH moves. The old gate asked
     for /which leaf/i, which was the side choice — and the side choice
     is exactly what this rebuild cut. */
  const w = T.strings.saidOddWaiting.en;
  ok(/join/i.test(w) && /partner/i.test(w),
    'L7 ⭐ the odd-one question does not offer BOTH a leaf and a partner');
  ok(!/which leaf/i.test(w),
    'L7 ⚠⚠ the odd-one question still asks WHICH LEAF — that choice was a reflection and was cut');
  ok(!/cannot|will not rest|never rests/i.test(w),
    'L7 the odd-one string claims the tray stalls; nothing here stalls');

  /* token contracts — the paint supplies these and the sentence needs them */
  const TOKENS = {
    ariaNear: ['{n}'], ariaFar: ['{n}'], ariaShut: ['{n}'],
    saidPlace: ['{n}'], saidPlaceShut: ['{n}'], saidPredict: ['{n}'],
    saidPredictTwo: ['{a}', '{b}'], saidClosed: ['{n}', '{d}'], saidGathered: ['{d}'],
    saidOpened: ['{t}', '{a}'], saidOddWaiting: ['{t}'],
    saidGave: ['{t}', '{a}', '{b}'], saidFetched: ['{t}', '{a}', '{o}'],
    saidFull: ['{n}'], predChip: ['{n}'], predChipLeaf: ['{n}']
  };
  Object.keys(TOKENS).forEach(function (k) {
    TOKENS[k].forEach(function (tok) {
      ok(T.strings[k] && T.strings[k].en.indexOf(tok) >= 0,
        'L7 ⚠ `' + k + '` lost its ' + tok + ' token');
    });
  });

  /* the refuse-list: no judging, no scoring, no clocks */
  const REFUSE = ['correct', 'wrong', 'score', 'points', 'timer', 'clock', 'countdown', 'streak'];
  all.forEach(function (k) {
    REFUSE.forEach(function (w2) {
      ok(!ban(w2).test(T.strings[k].en), 'L7 ⚠⚠ `' + k + '` carries the refuse-list word "' + w2 + '"');
    });
  });
  /* ⚠ THIS POISON USED TO TEST `ban('point')` — a word that is not on
     the refuse list at all — and it broke the moment the matcher
     learned inflections, because `point` + `ing` is a real match. A
     poison example must be built from the LIST it guards and must
     probe a boundary that list actually has. `score` is on the list;
     `underscore` and `scoreboard` are the near-misses that matter. */
  ok(ban('correct').test('That is correct.'), 'L7 poison: the refuse-list ban failed to fire');
  ok(ban('score').test('nothing is scored'), 'L7 poison: the refuse-list ban cannot see an inflection');
  ok(!ban('score').test('the underscore'), 'L7 poison: the refuse-list ban fired across a prefix');
  ok(!ban('score').test('a scoreboard'), 'L7 poison: the refuse-list ban fired inside another word');
}

/* ================================================================== */
/* L8 — THE EMISSION, NOT THE PROSE. Source-level laws the render
   depends on; each is a mutation target. */
{
  /* ⚠⚠ MATCH THE EMISSION, NEVER THE PROSE. The first version of this
     level scanned the RAW file and fired on the header docblock, which
     quotes the very defect it is checking for — the gate reading its
     own documentation as evidence. Comments are stripped first; string
     literals (where the CSS lives) survive. */
  const raw = fs.readFileSync(SRC, 'utf8').split(String.fromCharCode(13, 10)).join('\n');
  const src = raw.replace(/\/\*[\s\S]*?\*\//g, '');
  /* ⚠⚠ THE DEFECT THIS REBUILD EXISTS TO KILL: the far leaf was hidden
     in exactly the state the tool exists for. Nothing on this stage is
     ever hidden with `visibility` again. */
  ok(!/style\.visibility/.test(src),
    'L8 ⚠⚠ something on the stage is hidden with `visibility` — that is how the far leaf disappeared');
  /* the full scroll escape */
  ok(/html\.dbm-scroll\{overflow-y:auto;height:auto;min-height:100%;?\}/.test(src),
    'L8 ⚠⚠ the html half of the scroll escape lost its height declarations');
  ok(/body\.dbm-scroll\{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;?\}/.test(src),
    'L8 ⚠⚠ the body half of the scroll escape is not the full form');
  ok(src.indexOf("document.documentElement.classList.add('dbm-scroll')") >= 0,
    'L8 the html scroll class is never added');
  ok(src.indexOf("document.body.classList.add('dbm-scroll')") >= 0,
    'L8 the body scroll class is never added');
  /* no vh inside a manipulative */
  ok(!/[0-9.]vh\b/.test(src), 'L8 ⚠⚠ a vh unit entered the manipulative');
  /* the print block is ONE emitted fragment — the deploy gate greps it */
  ok(/['"`]@media print\s*\{/.test(src), 'L8 ⚠⚠ the emitted @media print{ literal is gone or split');
  /* the sheet is a SIBLING of the wrap */
  ok(/api\.stage\.appendChild\(this\._sheet\)/.test(src),
    'L8 ⚠⚠ the print sheet is not a sibling of the wrap — a hidden parent measures 0mm');
  /* Ctrl+P must not hand the paid sheet to a non-subscriber */
  ok(/beforeprint[\s\S]{0,160}?premium/.test(src), 'L8 ⚠⚠ the beforeprint path lost its entitlement check');
  ok(/_print:[\s\S]{0,120}?premium[\s\S]{0,60}?_gate/.test(src), 'L8 ⚠⚠ the print chip lost its entitlement gate');
  ok(/\['catch'\]\(function \(\) \{\}\)/.test(src), 'L8 the entitlement fetch lost its catch path');
  /* the liveness gate derives the prefix from this literal */
  ok(src.indexOf("api.el('div', 'dbm-wrap')") >= 0,
    'L8 ⚠⚠ the dbm-wrap literal changed — the liveness gate goes blind');
  /* ⭐ NO OPERATOR GLYPH, TYPED OR DRAWN. The old build shipped a
     textContent '+' and '−' into eleven locales. */
  ok(!/textContent\s*=\s*['"][+−×=\-]['"]/.test(src),
    'L8 ⚠⚠ an operator glyph is being written as text — the recorded eleven-locale defect');
  /* ⭐ _sync, never _fill: a rebuilt node teleports and no transition
     can ever fire */
  ok(/_sync:\s*function/.test(src), 'L8 ⚠⚠ the counter reconciler `_sync` is gone');
  ok(!/_fill:\s*function/.test(src), 'L8 ⚠⚠ `_fill` is back — it destroys every counter on every paint');
  ok(!/cloneNode/.test(src), 'L8 ⚠ the paint clones counters — the persistent-node law is broken');
  /* ⭐ ONE INTERPOLATOR. Only `_fold` and `_flex` drive `_raf`, and
     they are the same chain; the double-rAF elsewhere is the
     force-a-transition idiom on an arriving counter, which starts no
     loop. ⚠ Asserted by WHAT DRIVES THE LOOP, not by a tuned count of
     the word — a count I adjust until it passes has stopped meaning
     anything. */
  eq((src.match(/_raf = window\.requestAnimationFrame/g) || []).length, 4,
    'L8 ⚠ unexpected animation loops driving _raf — TWO interpolators, each seeding once and re-arming once');
  ok(/_fold:\s*function/.test(src) && /_flex:\s*function/.test(src),
    'L8 the fold or the flex interpolator is gone');
  ok(/is-arriving[\s\S]{0,400}?requestAnimationFrame[\s\S]{0,200}?requestAnimationFrame/.test(src),
    'L8 ⚠ an arriving counter no longer gets its two frames — it would teleport instead of travelling');
  /* the refusal must never recolour a leaf */
  ok(!/is-refuse[^}]*\.dbm-leaf/.test(src),
    'L8 ⚠⚠ the refusal recolours a LEAF — a verdict on the surface the child\'s counters sit on');
  ok(/is-refuse[^}]*\.dbm-knuckle/.test(src),
    'L8 the refusal no longer answers at the hinge');
}

console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + pass + ' assertions, ' + fails.length + ' failures');
if (fails.length) { fails.slice(0, 25).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
