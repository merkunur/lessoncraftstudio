#!/usr/bin/env node
/* verify-turning-domino-core.js — #84 THE TURNING DOMINO (1.OA.B.4), its OWN oracle.
   Ground truth is the design sheet's round table (designs/084-numberbond.md §6), typed in
   here as equations and re-solved, never read off the core: every half 1–10 and the halves
   sum to the whole; the stance (which half is face down, which lies in the tray, the lid)
   matches the form; the answer is the hidden part (or the whole under the lid); the march
   test's empty/overflow for EVERY dial value; Check passes iff the dial is the answer; the
   four facts over the four handlings (and turned + left off = as lies + right off); the
   house fills only from handling; the balance rules (forms, bigger/smaller hidden part,
   answers, no adjacent repeats); dial ranges; the old trios kept.
   Usage: node scripts/verify-turning-domino-core.js [--poison=<name>] */
'use strict';
const path = require('path');
const C = require(path.join(process.env.TD_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'turning-domino-core.js'));
const POISON = (process.argv.find(a => a.startsWith('--poison=')) || '').slice(9);
let pass = 0, fail = 0; const fails = [];
function ok(c, m) { if (c) pass++; else { fail++; if (fails.length < 40) fails.push(m); } }
if (POISON === 'march') { const m0 = C.march; C.march = (r, d) => { const m = m0(r, d); m.overflow = 0; return m; }; }
if (POISON === 'dial') { const s0 = C.setDial; C.setDial = (st, n) => { st.dial = n; return true; }; }

/* the design's tables, as the strip shows them (? = the unknown) */
const DESIGN = {
  w20: ['3 + ? = 8', '? + 5 = 9', '11 − 4 = ?', '12 − ? = 7', '? − 5 = 8', '? + 8 = 14', '6 + ? = 15', '16 − 9 = ?', '17 − ? = 8', '? − 10 = 9'],
  w10: ['2 + ? = 6', '? + 4 = 7', '8 − 2 = ?', '9 − ? = 7', '? − 4 = 6', '4 + ? = 5', '? + 3 = 10', '? − 5 = 4']
};
const OLD_TRIOS = [[8, 3], [9, 4], [11, 7], [12, 5], [13, 8], [14, 6], [15, 9], [16, 9]];   /* the old activity's whole + given */
function solve(eq) {
  const m = eq.match(/^(\?|\d+) ([+−]) (\?|\d+) = (\?|\d+)$/); const [, x, op, y, z] = m;
  const n = s => (s === '?' ? null : +s);
  const X = n(x), Y = n(y), Z = n(z);
  let ans, w, form;
  if (op === '+') { w = Z; form = X == null ? '?+a' : 'a+?'; ans = w - (X == null ? Y : X); }
  else if (X == null) { form = '?-a'; ans = Y + Z; w = ans; }
  else { w = X; form = Y == null ? 'w-?' : 'w-a'; ans = Y == null ? X - Z : X - Y; }
  return { w, form, ans };
}
const show = (e) => { const q = v => (v == null ? '?' : v); return e.op === '+' ? `${q(e.x)} + ${q(e.y)} = ${q(e.z)}` : `${q(e.x)} − ${q(e.y)} = ${q(e.z)}`; };

for (const L of C.LEVELS) {
  const ids = C.ids(L), cap = L === 'w10' ? 10 : 20, forms = {}, answers = {};
  ok(ids.length === DESIGN[L].length && ids.length >= 7, `${L}: ${ids.length} rounds = the design's ${DESIGN[L].length}`);
  let bigger = 0, parts = 0;
  for (const i of ids) {
    const r = C.round(L, i), d = solve(DESIGN[L][i]), st = C.newState(r), tag = `${L}#${i} ${DESIGN[L][i]}`;
    ok(show(C.equation(st)) === DESIGN[L][i], `${tag}: the strip opens as the design (${show(C.equation(st))})`);
    ok(r.w === d.w && r.form === d.form && r.answer === d.ans, `${tag}: whole ${r.w}/${d.w}, form ${r.form}/${d.form}, answer ${r.answer}/${d.ans}`);
    ok(r.L + r.R === r.w, `${tag}: the halves sum to the whole`);
    ok([r.L, r.R].every(n => n >= 1 && n <= 10), `${tag}: every half 1–10 (never 0)`);
    ok(r.w <= cap && r.answer >= 1, `${tag}: within ${cap}, answer ≥ 1`);
    /* the stance matches the form */
    const want = { 'a+?': ['right', null], '?+a': ['left', null], 'w-a': ['left', 'right'], 'w-?': ['right', 'right'], '?-a': ['lid', 'right'] }[d.form];
    ok(st.hidden === want[0] && st.removed === want[1], `${tag}: stance hidden=${st.hidden} removed=${st.removed}, want ${want}`);
    if (d.form !== '?-a') {
      const hid = st.hidden === 'left' ? r.L : r.R, vis = r.w - hid;
      ok(hid === d.ans, `${tag}: the face-down half holds the answer`);
      ok(d.ans !== r.w && d.ans !== vis, `${tag}: a part answer is neither the whole nor the visible half`);
      parts++; if (d.ans > vis) bigger++;
      ok(r.dialMin === 1 && r.dialMax === 10, `${tag}: the half dial runs 1–10`);
    } else {
      ok(d.ans !== r.L && d.ans !== r.R, `${tag}: a lid answer is not a part`);
      ok(r.dialMin === 2 && r.dialMax === (L === 'w10' ? 10 : 20), `${tag}: the plate dial runs 2–${L === 'w10' ? 10 : 20}`);
    }
    forms[d.form] = (forms[d.form] || 0) + 1; answers[d.ans] = (answers[d.ans] || 0) + 1;
    /* the march test for every dial value, and Check */
    for (let dv = r.dialMin - 1; dv <= r.dialMax + 1; dv++) {
      const s2 = C.newState(r); const moved = C.setDial(s2, dv);
      if (dv < r.dialMin || dv > r.dialMax) { ok(s2.dial === Math.max(r.dialMin, Math.min(r.dialMax, dv)), `${tag}: dial ${dv} is clamped`); continue; }
      ok(moved && s2.dial === dv, `${tag}: dial ${dv} set`);
      const m = C.march(r, dv);
      if (d.form === '?-a') { ok(m.sockets === dv && m.empty === Math.max(0, dv - r.w) && m.overflow === Math.max(0, r.w - dv), `${tag} d=${dv}: lid march`); }
      else { const vis = r.w - d.ans; ok(m.sockets === r.w && m.empty === Math.max(0, r.w - vis - dv) && m.overflow === Math.max(0, vis + dv - r.w), `${tag} d=${dv}: part march`); }
      const res = C.check(s2);
      if (dv === d.ans) {
        ok(res.ok && s2.stage === 2 && s2.hidden === null && s2.removed === null, `${tag} d=${dv}: right → stage 2, whole domino`);
        ok(s2.facts.length === 1 && C.windows(r)[s2.facts[0]] && show(C.windows(r)[s2.facts[0]]) === DESIGN[L][i].replace('?', String(d.ans)), `${tag}: the stamped fact is the solved equation`);
      } else {
        ok(!res.ok && s2.misses === 1 && s2.stage === 1 && s2.hidden === st.hidden, `${tag} d=${dv}: a miss keeps the half hidden`);
        const want = d.form === '?-a' ? 'lid' : (m.overflow > 0 ? 'many' : 'few');
        ok(res.reason === want, `${tag} d=${dv}: miss reason ${res.reason} = ${want}`);
        ok(C.hint(s2) === { lid: 'hLid', many: 'hOver', few: 'hGap' }[want], `${tag} d=${dv}: miss-1 hint`);
        C.check(s2); ok(s2.show === 2 && C.hint(s2) === (d.form === '?-a' ? 'hCountLid' : 'hCount'), `${tag} d=${dv}: miss 2 counts`);
        C.step(s2, dv < d.ans ? 1 : -1); ok(s2.show === 0 && C.hint(s2) === null, `${tag}: a new dial move takes the help away`);
      }
    }
    /* the dial untouched is a hint, not a miss */
    { const s3 = C.newState(r); const res = C.check(s3); ok(!res.ok && s3.misses === 0 && C.hint(s3) === (d.form === '?-a' ? 'hDialLid' : 'hDial'), `${tag}: Check with the dial untouched is a hint`); }
    /* stage 2: the four facts over the handlings */
    const s4 = C.newState(r); C.setDial(s4, d.ans); C.check(s4);
    ok(C.turn(C.newState(r)) === null && C.breakOff(C.newState(r), 'left') === null, `${tag}: no handling before the half is found`);
    const W = r.w, A = r.L, B = r.R;
    const facts = new Set();
    const asLies = show(C.equation(s4)); facts.add(asLies); ok(asLies === `${A} + ${B} = ${W}`, `${tag}: as it lies ${asLies}`);
    C.breakOff(s4, 'right'); const rOff = show(C.equation(s4)); ok(rOff === `${W} − ${B} = ${A}`, `${tag}: right off ${rOff}`); facts.add(rOff);
    ok(C.turn(s4) === null, `${tag}: no turning with a half off`);
    C.putBack(s4); C.breakOff(s4, 'left'); const lOff = show(C.equation(s4)); ok(lOff === `${W} − ${A} = ${B}`, `${tag}: left off ${lOff}`); facts.add(lOff);
    C.putBack(s4); C.turn(s4); const turned = show(C.equation(s4)); ok(turned === `${B} + ${A} = ${W}`, `${tag}: turned ${turned}`); facts.add(turned);
    ok(facts.size === 4 && s4.done && s4.facts.length === 4, `${tag}: four distinct facts fill the house`);
    const s5 = C.newState(r); C.setDial(s5, d.ans); C.check(s5); C.turn(s5); C.breakOff(s5, 'left'); const tl = show(C.equation(s5));
    ok(tl === rOff, `${tag}: turned + left off = as lies + right off (${tl})`);
    const expect = new Set([DESIGN[L][i].replace('?', String(d.ans)), turned, rOff]).size;
    ok(C.turn(s5) === null && s5.facts.length === expect, `${tag}: a repeated fact is not stamped twice (${s5.facts.length} = ${expect})`);
    /* house off: done straight after stage 1 */
    const s6 = C.newState(r, false); C.setDial(s6, d.ans); ok(C.check(s6).ok && s6.done && s6.facts.length === 1, `${tag}: house off ends after stage 1`);
    /* the dial never writes into the house */
    const s7 = C.newState(r); for (let k = 0; k < 25; k++) C.step(s7, 1); ok(s7.facts.length === 0, `${tag}: the dial never fills the house`);
  }
  if (L === 'w20') {
    ok(Object.values(forms).length === 5 && Object.values(forms).every(n => n === 2), `w20: every form twice ${JSON.stringify(forms)}`);
    ok(bigger === 4 && parts === 8, `w20: the hidden part is the bigger one in 4 of 8 (${bigger}/${parts})`);
    ok(answers[5] === 2 && answers[7] === 2 && answers[9] === 2 && Object.values(answers).every(n => n <= 2), `w20: answers 5/7/9 twice, the rest once ${JSON.stringify(answers)}`);
    ok(OLD_TRIOS.every(([w, g], k) => { const r = C.round('w20', k); return r.w === w && (r.L === g || r.R === g); }), 'w20: rounds 1–8 keep the old trios');
  } else {
    ok(forms['a+?'] === 2 && forms['?+a'] === 2 && forms['w-a'] === 1 && forms['w-?'] === 1 && forms['?-a'] === 2, `w10: form counts ${JSON.stringify(forms)}`);
    ok(bigger === 3 && parts === 6, `w10: the hidden part is the bigger one in 3 of 6 (${bigger}/${parts})`);
    ok(Object.values(answers).every(n => n === 1), `w10: eight different answers ${JSON.stringify(answers)}`);
  }
}
/* plan: no adjacent equal answers, never the previous order, a replayed seed too */
for (const L of C.LEVELS) {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; let prev = null;
  for (let k = 0; k < 2000; k++) {
    const o = C.plan(L, rnd, prev).order;
    ok(o.slice().sort((a, b) => a - b).join() === C.ids(L).join(), `${L} plan is a permutation`);
    let adj = false; for (let p = 1; p < o.length; p++) if (C.round(L, o[p]).answer === C.round(L, o[p - 1]).answer) adj = true;
    ok(!adj, `${L} plan: no two equal answers in a row`);
    ok(!prev || prev.join() !== o.join(), `${L} plan differs from the previous pass`);
    prev = o;
  }
  for (let s0 = 1; s0 <= 60; s0++) { const mk = () => { let z = s0 * 7919; return () => (z = (z * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(L, mk(), null).order, o2 = C.plan(L, mk(), o1).order; ok(o1.join() !== o2.join(), `${L} seed ${s0}: a replayed seed gives a new order`); }
}
ok(C.layout(704).mode === 'wide' && C.layout(619).mode === 'narrow' && C.locale('xx') === 'en' && C.LOCALES.length === 11, 'layout + locales');
console.log(`verify-turning-domino-core: ${pass} pass, ${fail} fail${POISON ? ' (poison=' + POISON + ')' : ''}`);
fails.forEach(f => console.log('  FAIL: ' + f));
process.exit(fail ? 1 : 0);
