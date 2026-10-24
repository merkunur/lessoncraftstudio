#!/usr/bin/env node
/* =====================================================================
   verify-sign-beam-core.js — the gate for ACTIVITY #88, THE EQUAL-SIGN
   BEAM ("Numbers Court", 1.OA.D.7). Its OWN oracle: every claim is
   re-read from the design's tables as plain text and evaluated here;
   nothing expected is read off the core.
     · the design's tables, claim for claim (both modes, both levels);
     · True or false: 7 true / 5 false per level; "answer last" ≤ 2; a
       turn-around; ≥ 3 subtraction claims; every false claim off by 1;
     · every repair crate and every blank: EXACTLY one value in 1–20
       balances (brute force), the one the design names; a blank's answer
       is never the other side's total; a trap's repair is never the
       answer-next number; blanks 50/50 left/right, both crate positions;
     · the beam: flat iff equal; the wedge opens toward the bigger side;
       the light end touches the top bar (half-bar · sin tilt = gap) at
       every width; the bars never cross;
     · a WRONG ruling never releases the seal (both stamps, every round);
       no stamp is not a miss; every dial value of every repair/blank:
       released, flat iff right, the heavy/light hint by the gold side;
     · the evidence: the dots each pan pours = its amount; threads at
       miss 2; the dial crate dashed; turning keeps the truth and reverses
       the claim; the plan: a permutation, never the previous order, no
       verdict 3 in a row (10 000 seeds); no 0 anywhere; the pictures.
   Usage: node scripts/verify-sign-beam-core.js   (SB_CORE_DIR = a mutated copy)
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.SB_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'sign-beam-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };

/* ---- the design's tables, as text (docs/activities-rebuild/designs/088-numbers-court.md §6) ---- */
const DESIGN = {
  tf10: ['3 + 5 = 5 + 3', '7 = 3 + 4', '9 = 4 + 4|□ = 4 + 4|8', '2 + 6 = 5 + 3', '4 + 3 = 2 + 6|4 + 3 = 2 + □|5', '5 = 9 − 4', '3 = 8 − 4|3 = □ − 4|7', '4 + 2 = 6', '6 + 2 = 8 + 1|6 + □ = 8 + 1|3', '6 = 6', '9 − 2 = 3 + 5|9 − 2 = 3 + □|4', '10 − 3 = 4 + 3'],
  tf20: ['7 + 9 = 9 + 7', '14 = 6 + 8', '13 = 7 + 5|13 = 7 + □|6', '9 + 6 = 8 + 7', '8 + 4 = 12 + 1|8 + 4 = □ + 1|11', '8 = 15 − 7', '9 = 16 − 8|□ = 16 − 8|8', '9 + 5 = 14', '18 − 9 = 4 + 5', '7 + 7 = 20 − 5|7 + 7 = 20 − □|6', '17 = 10 + 7', '6 + 9 = 11 + 3|6 + 9 = 11 + □|4'],
  mb10: ['3 + 4 = □ + 5|2', '6 + 2 = 5 + □|3', '□ + 4 = 2 + 7|5', '9 − 3 = □ + 2|4', '2 + □ = 10 − 1|7', '8 − □ = 1 + 6|1', '□ − 2 = 3 + 3|8', '5 + 5 = 4 + □|6'],
  mb20: ['8 + 4 = □ + 5|7', '6 + 7 = 10 + □|3', '□ + 9 = 7 + 8|6', '15 − 6 = □ + 4|5', '3 + □ = 13 − 2|8', '9 + 9 = 20 − □|2', '14 − □ = 6 + 4|4', '□ − 3 = 2 + 4|9', '12 + 3 = 5 + □|10', '11 + □ = 6 + 6|1']
};
/* my own reader: a side "a", "a + b", "a − b" with □ for the blank */
const side = (t) => t.trim().split(/\s+/);
const val = (tokens, fill) => { const n = (x) => x === '□' ? fill : +x; return tokens.length === 1 ? n(tokens[0]) : tokens[1] === '+' ? n(tokens[0]) + n(tokens[2]) : n(tokens[0]) - n(tokens[2]); };
const halves = (claim) => claim.split(' = ').map(side);

/* ---- (1) the tables, claim for claim ---- */
for (const [key, rows] of Object.entries(DESIGN)) {
  const mo = key.slice(0, 2), lv = key.slice(2);
  ok(C.ids(mo, lv).length === rows.length, `${key}: ${rows.length} rounds`);
  rows.forEach((row, i) => {
    const parts = row.split('|'), r = C.round(mo, lv, i), tag = `${key}#${i} ${parts[0]}`;
    ok(C.claimText(r) === parts[0], `${tag}: the core writes "${C.claimText(r)}"`);
    const [L, R] = halves(parts[0]);
    if (mo === 'tf') {
      const truth = val(L) === val(R);
      ok(C.isTrue(r) === truth, `${tag}: verdict ${truth}`);
      const v = C.values(r); ok(v.l === val(L) && v.r === val(R), `${tag}: the pans hold ${val(L)} and ${val(R)}`);
      if (!truth) {
        ok(Math.abs(val(L) - val(R)) === 1, `${tag}: a false claim is off by exactly 1`);
        const [rl, rr] = halves(parts[1]), want = +parts[2], hit = [];
        for (let x = 1; x <= 20; x++) if (val(rl, x) === val(rr, x)) hit.push(x);
        ok(hit.length === 1 && hit[0] === want, `${tag}: the repair ${parts[1]} balances only at ${want} (${hit})`);
        ok(r.fix && r.fix.ans === want && C.solve(r, r.fix) === want, `${tag}: the core repairs at ${want}`);
        ok(C.claimText(r, { side: r.fix.side, pos: r.fix.pos, v: null }) === parts[1], `${tag}: the gold crate is the one the design names (${parts[1]})`);
      } else ok(!r.fix, `${tag}: a true claim has no repair`);
    } else {
      const want = +parts[1], hit = [];
      for (let x = 1; x <= 20; x++) if (val(L, x) === val(R, x) && val(L, x) >= 0) hit.push(x);
      ok(hit.length === 1 && hit[0] === want, `${tag}: the blank balances only at ${want} (${hit})`);
      ok(r.blank && r.blank.ans === want && C.solve(r, r.blank) === want, `${tag}: the core balances at ${want}`);
      const other = L.includes('□') ? val(R) : val(L);
      ok(other !== want, `${tag}: the blank is never the other side's total (${other})`);
    }
    /* (8) no 0, every side within 0..20, every number 1..20 */
    const nums = parts[0].match(/\d+/g).map(Number);
    ok(nums.every(n => n >= 1 && n <= 20), `${tag}: every number is 1..20`);
    [L, R].forEach(s => { if (!s.includes('□')) { const x = val(s); ok(x >= 1 && x <= 20, `${tag}: a side holds ${x}`); } });
  });
}
/* ---- (2) the distribution ---- */
for (const lv of ['10', '20']) {
  const rows = DESIGN['tf' + lv].map(r => r.split('|')[0]), truths = rows.map(c => { const [L, R] = halves(c); return val(L) === val(R); });
  ok(truths.filter(Boolean).length === 7 && truths.filter(t => !t).length === 5, `tf${lv}: 7 true / 5 false`);
  const last = rows.filter(c => { const [L, R] = halves(c); return L.length === 3 && R.length === 1; }).length;
  ok(last >= 1 && last <= 2, `tf${lv}: "answer last" appears 1..2 times (${last})`);
  ok(rows.some(c => { const [L, R] = halves(c); return L.length === 3 && R.length === 3 && L[1] === '+' && R[1] === '+' && L[0] === R[2] && L[2] === R[0]; }), `tf${lv}: a turn-around`);
  ok(rows.filter(c => c.includes('−')).length >= 3, `tf${lv}: ≥ 3 subtraction claims`);
  /* the answer-next trap: a two-term right side whose first number is the left total — its repair is never that number */
  DESIGN['tf' + lv].forEach((row, i) => { const p = row.split('|'), [L, R] = halves(p[0]); if (R.length === 3 && L.length === 3 && +R[0] === val(L) && p[2]) ok(+p[2] !== val(L), `tf${lv}#${i}: the trap's repair is never the answer-next ${val(L)}`); });
  const mb = DESIGN['mb' + lv].map(r => r.split('|')), lefts = mb.filter(p => halves(p[0])[0].includes('□')).length;
  ok(lefts * 2 === mb.length, `mb${lv}: the blank sits left in half the rounds (${lefts}/${mb.length})`);
  const spots = new Set(mb.map(p => { const [L, R] = halves(p[0]); const s = L.includes('□') ? L : R; return (L.includes('□') ? 'L' : 'R') + s.indexOf('□'); }));
  ok(spots.size === 4, `mb${lv}: the blank takes every crate position on each side (${[...spots]})`);
  ok(new Set(mb.map(p => p[1])).size === mb.length, `mb${lv}: every answer differs`);
}
/* ---- (4) the beam's shape and geometry ---- */
for (const mo of C.MODES) for (const lv of C.LEVELS) for (const i of C.ids(mo, lv)) {
  const r = C.round(mo, lv, i), v = C.values(r);
  if (mo === 'tf') ok(C.shapeOf(v.l, v.r) === (v.l === v.r ? 'eq' : v.l > v.r ? 'gt' : 'lt'), `${mo}${lv}#${i}: the shape`);
}
ok(C.shapeOf(8, 9) === 'lt' && C.shapeOf(9, 8) === 'gt' && C.shapeOf(7, 7) === 'eq', 'the wedge opens toward the bigger side');
for (const W of [300, 320, 336, 360, 412, 480, 560, 640, 704, 900, 1200]) {
  const G = C.geometry(W), half = G.bar / 2;
  ok(Math.abs(half * Math.sin(G.tilt * Math.PI / 180) - G.gap) < 1e-6, `@${W}: the light end rises exactly to the top bar (gap ${G.gap})`);
  ok(G.gap >= 10 && G.tilt > 4 && G.tilt < 10, `@${W}: a readable wedge (gap ${G.gap}, ${G.tilt.toFixed(1)}°)`);
  ok(C.angle('lt', G) > 0 && C.angle('gt', G) < 0 && C.angle('eq', G) === 0, `@${W}: right bigger → right end down`);
  ok(W / 2 - half - G.pan / 2 >= 0 && W / 2 + half + G.pan / 2 <= W, `@${W}: the pans stay inside the stage`);
  ok(G.crate * 2 + G.opW <= G.pan, `@${W}: two crates fit a pan`);
  ok(G.string > G.crate + 10, `@${W}: the crates hang clear of the beam`);
}
/* ---- (5) the rulings, every round, both stamps ---- */
for (const lv of C.LEVELS) for (const i of C.ids('tf', lv)) {
  const tag = `tf${lv}#${i}`;
  for (const stamp of ['eq', 'ne']) {
    const st = C.newState(C.round('tf', lv, i)), truth = C.isTrue(st.r);
    ok(C.gavel(st).released === false && st.misses === 0 && C.hint(st) === 'hStamp', `${tag}: the gavel without a stamp is not a miss`);
    ok(C.stamp(st, stamp) && C.hint(st) === null, `${tag}: a stamp clears the help`);
    const right = (stamp === 'eq') === truth, res = C.gavel(st);
    if (!right) {
      ok(res.released === false && st.shape === null && st.misses === 1 && C.hint(st) === 'hEvid' && st.phase === 'verdict', `${tag}: a wrong ${stamp} never moves the beam (miss 1)`);
      const ev = C.evidence(st), v = C.values(st.r);
      ok(ev && ev.nl === v.l && ev.nr === v.r && ev.threads === 0, `${tag}: the pans pour ${v.l} and ${v.r} dots`);
      ok(ev.L.length === (st.r.L.op === '-' ? st.r.L.nums[0] : v.l) && ev.R.length === (st.r.R.op === '-' ? st.r.R.nums[0] : v.r), `${tag}: a subtraction pours its first number, the taken-away crossed`);
      C.stamp(st, stamp); const r2 = C.gavel(st);
      ok(r2.released === false && st.misses === 2 && C.hint(st) === 'hPair' && C.evidence(st).threads === Math.min(v.l, v.r), `${tag}: miss 2 — threads pair ${Math.min(v.l, v.r)}`);
      C.stamp(st, stamp === 'eq' ? 'ne' : 'eq'); ok(C.hint(st) === null && C.evidence(st) === null, `${tag}: a new stamp takes the help away`);
      ok(C.gavel(st).released === true, `${tag}: the right ruling then releases`);
    } else {
      ok(res.released === true && res.shape === C.shapeOf(C.values(st.r).l, C.values(st.r).r), `${tag}: a right ${stamp} releases the beam (${res.shape})`);
      if (truth) {
        ok(st.done && st.last.n === C.values(st.r).l, `${tag}: true → won, both sides ${st.last.n}`);
        const before = C.claimText(st.r, null, false);
        ok(C.turn(st) && st.turned && C.claimText(st.r, null, true) === before.split(' = ').reverse().join(' = ') && C.isTrue(st.r), `${tag}: turning the court reverses the claim and keeps it true`);
        ok(C.stamp(st, 'ne') === false && C.gavel(st) === null, `${tag}: a won round takes no more rulings`);
      } else {
        const old = st.r.fix.side === 'L' ? st.r.L.nums[st.r.fix.pos] : st.r.R.nums[st.r.fix.pos];
        ok(!st.done && st.phase === 'repair' && st.dial === old && C.turn(st) === false, `${tag}: caught → the repair starts on the old number ${old}`);
      }
    }
  }
}
/* ---- every dial value of every repair and every blank ---- */
const repairState = (mo, lv, i) => { const st = C.newState(C.round(mo, lv, i)); if (mo === 'tf') { C.stamp(st, 'ne'); C.gavel(st); } return st; };
for (const mo of C.MODES) for (const lv of C.LEVELS) for (const i of C.ids(mo, lv)) {
  const r0 = C.round(mo, lv, i), sp = r0.fix || r0.blank; if (!sp) continue;
  const tag = `${mo}${lv}#${i}`;
  if (mo === 'mb') { const st = C.newState(r0); ok(st.dial === null && C.gavel(st).released === false && C.hint(st) === 'hDial' && st.rmisses === 0, `${tag}: an empty dial is not a try`); const s0 = sp.side === 'L' ? r0.L : r0.R, first = s0.op === '-' && sp.pos === 0 ? s0.nums[1] + 1 : 1; ok(C.nudge(st, -1) === false && st.dial === null && C.nudge(st, 1) && st.dial === first, `${tag}: − on an empty dial does nothing; + starts at ${first}`); }
  /* my own range: a subtracted crate stays below the first number, a first number above the one taken away */
  const sd0 = sp.side === 'L' ? r0.L : r0.R, lo = sd0.op === '-' && sp.pos === 0 ? sd0.nums[1] + 1 : 1, hi = sd0.op === '-' && sp.pos === 1 ? sd0.nums[0] - 1 : 20;
  { const st = repairState(mo, lv, i), rg = C.range(st); ok(rg.lo === lo && rg.hi === hi, `${tag}: the dial runs ${lo}..${hi}`); ok(sp.ans >= lo && sp.ans <= hi, `${tag}: the answer ${sp.ans} is inside the dial`);
    C.setDial(st, lo); ok(C.nudge(st, -1) === false && st.dial === lo, `${tag}: the dial stops at ${lo}`); C.setDial(st, hi); ok(C.nudge(st, 1) === false && st.dial === hi, `${tag}: the dial stops at ${hi}`);
    if (hi < 20) { C.setDial(st, 20); ok(st.dial === hi, `${tag}: a subtraction never goes below 1 (20 → ${st.dial})`); } }
  for (let x = lo; x <= hi; x++) {
    const st = repairState(mo, lv, i); C.setDial(st, x);
    const tokens = (s, side) => s.nums.map((n, k) => sp.side === side && sp.pos === k ? x : n);
    const own = (s, side) => { const t = tokens(s, side); return s.op === '-' ? t[0] - t[1] : s.op === '+' ? t[0] + t[1] : t[0]; };
    const l = own(r0.L, 'L'), rr = own(r0.R, 'R'), res = C.gavel(st);
    ok(res.released === true, `${tag} dial ${x}: the seal releases`);
    if (l === rr) ok(st.done && res.shape === 'eq' && x === sp.ans, `${tag} dial ${x}: flat`);
    else {
      const mine = sp.side === 'L' ? l : rr, other = sp.side === 'L' ? rr : l;
      ok(!st.done && res.shape === (l > rr ? 'gt' : 'lt') && C.hint(st) === (sd0.op === '-' && sp.pos === 1 ? (mine > other ? 'hTakeMore' : 'hTakeLess') : (mine > other ? 'hHeavy' : 'hLight')), `${tag} dial ${x}: tips ${l > rr ? 'left' : 'right'}, the hint says the gold side is ${mine > other ? 'heavy' : 'light'}${sd0.op === '-' && sp.pos === 1 ? ' (a taken-away crate: take away ' + (mine > other ? 'more' : 'less') + ')' : ''}`);
      ok(C.evidence(st) === null, `${tag} dial ${x}: no dots after one tip`);
      C.setDial(st, x === hi ? x - 1 : x + 1); C.setDial(st, x); const r2 = C.gavel(st);
      const ev = C.evidence(st);
      ok(r2.released && st.rmisses === 2 && ev && ev.nl === l && ev.nr === rr && ev.threads === 0, `${tag} dial ${x}: the second tip pours ${l} and ${rr}`);
      ok(ev && ev[sp.side].some(d => d.dash) && ev[sp.side === 'L' ? 'R' : 'L'].every(d => !d.dash), `${tag} dial ${x}: the gold crate's dots are dashed, the other side's are not`);
    }
  }
}
/* ---- (7) the plan ---- */
for (const mo of C.MODES) for (const lv of C.LEVELS) {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; let prev = null, worst = 0;
  for (let k = 0; k < 10000; k++) {
    const o = C.plan(mo, lv, rnd, prev).order;
    if (o.slice().sort((a, b) => a - b).join() !== C.ids(mo, lv).join() || (prev && prev.join() === o.join())) { ok(false, `${mo}${lv} plan #${k}: a new permutation`); break; }
    if (mo === 'tf') { let run = 0, last = null; o.forEach(i => { const t = C.isTrue(C.round(mo, lv, i)); run = t === last ? run + 1 : 1; last = t; worst = Math.max(worst, run); }); }
    prev = o;
  }
  ok(mo !== 'tf' || worst <= 2, `${mo}${lv}: no verdict 3 times in a row over 10 000 plans (worst ${worst})`);
  for (const sd of [3, 5, 9, 13]) { const mk = () => { let s = sd; return () => (s = (s * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(mo, lv, mk(), null).order; ok(C.plan(mo, lv, mk(), o1).order.join() !== o1.join(), `${mo}${lv} seed ${sd}: handed its own order, the plan gives another`); }
}
/* ---- (9) the pictures ---- */
const pic = (dir, key) => { const j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', dir.replace(/ /g, '-') + '.json'), 'utf8')); return !!(j.nouns && j.nouns[key]) && fs.existsSync(path.join(__dirname, '..', 'image-library-webp', 'themes', dir, key + '@2x.webp')); };
ok(pic(C.DATA.JUDGE[0], C.DATA.JUDGE[1]), 'Judge Tess is the library tortoise');
C.DATA.WITNESSES.forEach(w => ok(pic(w[0], w[1]), `the witness ${w[1]} is a labelled colour picture`));
ok(C.DATA.WITNESSES.length >= 12 && new Set(C.DATA.WITNESSES.map(w => w[1])).size === C.DATA.WITNESSES.length, 'twelve different witnesses');
ok(C.locale('xx') === 'en' && C.LOCALES.length === 11 && C.modeOf('x') === 'tf' && C.levelOf('x') === '10', 'locales + defaults');
console.log(`verify-sign-beam-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
