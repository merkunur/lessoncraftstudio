#!/usr/bin/env node
/* =====================================================================
   verify-deciding-gate-core.js — the gate for ACTIVITY #151, The Deciding
   Gate (2.NBT.A.4). The gate keeps its OWN comparator: the deciding place,
   the sign and the order are worked out here from the digit strings,
   never read off the tool.
   A data tables (the design's measured shape) · B deciding / sign · C the
   hand · D check · E misses and help · F hints · G the plan · H strings ×11
   and reachability · I the manifest row.
   DG_CORE / DG_ACT / DG_MANIFEST let mutate-deciding-gate.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.DG_CORE || path.join(ROOT, 'mini tools', 'deciding-gate-core.js');
const ACT_PATH = process.env.DG_ACT || path.join(ROOT, 'mini tools', 'deciding-gate-activity.js');
const MAN_PATH = process.env.DG_MANIFEST || path.join(ROOT, 'mini tools', 'match-pairs-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own comparator ---------- */
const pad = (n, nd) => String(n).padStart(nd, '0');
const ownGate = (a, b, nd) => { const x = pad(a, nd), y = pad(b, nd); for (let i = 0; i < nd; i++) if (x[i] !== y[i]) return i; return nd; };
const ownSign = (a, b) => (a < b ? '<' : a > b ? '>' : '=');

/* ---------- A. the tables ---------- */
const P3 = C.rounds('compare', 3), P4 = C.rounds('compare', 4), O3 = C.rounds('order', 3), O4 = C.rounds('order', 4);
ok(P3.map((r) => r.a + '?' + r.b).join() === '389?412,736?367,461?529,247?274,875?857,561?516,655?658,927?924,683?689,504?504', 'A: the design\'s ten three-digit pairs');
ok(P4.map((r) => r.a + '?' + r.b).join() === '3891?4120,6250?5987,1999?2001,7086?7186,8361?8016,2743?2734,9205?9250,5412?5419,4377?4370,6038?6038', 'A: the design\'s ten four-digit pairs');
const cnt = (P, nd, g) => P.filter((r) => ownGate(r.a, r.b, nd) === g).length;
ok([0, 1, 2, 3].map((g) => cnt(P3, 3, g)).join() === '3,3,3,1', 'A: three digits decided H 3 / T 3 / O 3 / = 1');
ok([0, 1, 2, 3, 4].map((g) => cnt(P4, 4, g)).join() === '3,2,2,2,1', 'A: four digits Th 3 / H 2 / T 2 / O 2 / = 1');
[[P3, 3], [P4, 4]].forEach(([P, nd]) => {
  const uneq = P.filter((r) => r.a !== r.b), left = uneq.filter((r) => r.a > r.b).length;
  ok(left / uneq.length >= 0.4 && left / uneq.length <= 0.6, 'A: ' + nd + ' digits: the bigger number is left in 40–60 % (' + left + '/' + uneq.length + ')');
  ok(P.filter((r) => r.a === r.b).length === 1, 'A: ' + nd + ' digits: one equal round');
  ok(P.filter((r) => ownSign(r.a, r.b) === '<').length <= 5, 'A: ' + nd + ' digits: "always <" right at most 5/10');
});
/* the trap: in every hundreds-decided three-digit round the smaller number has the larger last two digits */
ok(P3.filter((r) => ownGate(r.a, r.b, 3) === 0).every((r) => { const s = Math.min(r.a, r.b), g = Math.max(r.a, r.b); return s % 100 > g % 100; }), 'A: every hundreds-decided round has the smaller number\'s last two digits larger');
ok(P3.filter((r) => pad(r.a, 3).split('').sort().join() === pad(r.b, 3).split('').sort().join() && r.a !== r.b).length >= 2, 'A: at least two swapped-digit rounds');
const onesBot = P3.filter((r) => ownSign(r.a % 10, r.b % 10) === ownSign(r.a, r.b)).length;
ok(onesBot <= 5, 'A: the ones-digit bot is at chance (' + onesBot + '/10)');
[[O3, 3], [O4, 4]].forEach(([O, nd]) => {
  ok(O.length === 9 && O.every((r) => r.nums.length === 4 && new Set(r.nums).size === 4), 'A: ' + nd + ' digits: nine sets of four different numbers');
  ok(O.every((r) => { const s = r.nums.slice().sort((x, y) => x - y); return r.nums.join() !== s.join() && r.nums.join() !== s.slice().reverse().join(); }), 'A: ' + nd + ' digits: no set is shown in order');
  ok(O.every((r) => { const lead = r.nums.map((n) => pad(n, nd)[0]); return lead.some((x, i) => lead.indexOf(x) !== i); }), 'A: ' + nd + ' digits: every set shares a leading digit');
  for (let rank = 0; rank < 4; rank++) for (let pos = 0; pos < 4; pos++) {
    const k = O.filter((r) => r.nums.slice().sort((x, y) => x - y)[rank] === r.nums[pos]).length;
    ok(k <= 3, 'A: ' + nd + ' digits: rank ' + rank + ' stands in position ' + pos + ' at most 3 times (' + k + ')');
  }
  ok(O.filter((r) => { const s = r.nums.slice().sort((x, y) => x - y), byOnes = r.nums.slice().sort((x, y) => (x % 10) - (y % 10)); return s.join() === byOnes.join(); }).length === 0, 'A: ' + nd + ' digits: ordering by the ones digit gets no set right');
  if (nd === 3) ok(O.filter((r) => { const ds = (n) => String(n).split('').reduce((a, b) => a + +b, 0); const s = r.nums.slice().sort((x, y) => x - y), byDs = r.nums.slice().sort((x, y) => ds(x) - ds(y)); /* a digit-sum bot keeps ties in the shown order */ return s.join() === byDs.join(); }).length === 0, 'A: ordering by digit sum gets no three-digit set right');
});

/* ---------- B. deciding and the sign ---------- */
for (let i = 0; i < 4000; i++) {
  const nd = i % 2 ? 4 : 3, max = nd === 4 ? 10000 : 1000, a = (i * 7919) % max, b = (i * 104729 + (i % 13)) % max;
  ok(C.deciding(a, b, nd) === ownGate(a, b, nd) && C.signOf(a, b) === ownSign(a, b), 'B: ' + a + ' vs ' + b);
}
P3.concat(P4).forEach((r) => ok(r.gate === ownGate(r.a, r.b, r.nd) && r.sign === ownSign(r.a, r.b), 'B: the round ' + r.a + '/' + r.b + ' carries its true gate and sign'));
P3.forEach((r) => { const f = C.frames(r.a, r.b, 3); ok(f.length === Math.min(3, ownGate(r.a, r.b, 3) + 1) && f.slice(0, -1).every((x) => x.equal) && (r.a === r.b || !f[f.length - 1].equal), 'B: the run of ' + r.a + '/' + r.b + ' stops at its deciding gate'); });

/* ---------- C. the hand ---------- */
(() => {
  const st = C.newState('compare', 3, 0);
  ok(!C.predict(st, -1) && !C.predict(st, 4) && !C.predict(st, 1.5) && C.predict(st, 3) && st.predicted === 3, 'C: the gates 0…3 (3 = the flag) and nothing else');
  ok(!C.setSign(st, 'x') && C.setSign(st, '<') && st.sign === '<' && C.setSign(st, null) && st.sign === null, 'C: the signs < = > and clearing');
  const o = C.newState('order', 3, 0);
  ok(C.place(o, 0, 0) && C.place(o, 1, 0) && o.steps[0] === 1 && o.steps.indexOf(0) < 0, 'C: dropping onto a taken step from outside bumps the old number off');
  ok(C.place(o, 2, 1) && C.place(o, 1, 1) && o.steps[1] === 1 && o.steps[0] === 2, 'C: moving a placed number onto a taken step swaps them');
  ok(!C.predict(o, 0) && !C.setSign(o, '<'), 'C: order has no gates or signs');
})();

/* ---------- D. check ---------- */
[[P3, 3], [P4, 4]].forEach(([P, nd]) => P.forEach((r) => {
  const g = ownGate(r.a, r.b, nd), s = ownSign(r.a, r.b);
  for (let p = 0; p <= nd; p++) for (const sg of ['<', '=', '>']) {
    const st = C.newState('compare', nd, r.k); C.predict(st, p); C.setSign(st, sg); const x = C.check(st);
    const want = p > g ? 'gateLate' : p < g ? 'gateEarly' : sg !== s ? 'sign' : 'ok';
    ok(want === 'ok' ? x.result === 'ok' && st.done : x.result === 'miss' && st.verdict.kind === want, 'D: ' + r.a + '/' + r.b + ' gate ' + p + ' sign ' + sg + ' → ' + want);
  }
}));
(() => {
  const st = C.newState('compare', 3, 0);
  ok(C.check(st).key === 'hintPick' && st.misses === 0, 'D: no gate is a note');
  C.predict(st, 0); ok(C.check(st).key === 'hintSign' && st.misses === 0, 'D: no sign is a note');
})();
[[O3, 3], [O4, 4]].forEach(([O, nd]) => O.forEach((r) => {
  const want = r.nums.map((n, i) => i).sort((x, y) => r.nums[x] - r.nums[y]);
  const st = C.newState('order', nd, r.k); want.forEach((i, k) => C.place(st, i, k));
  ok(C.check(st).result === 'ok', 'D: order ' + r.nums.join('/') + ' solved by its true order');
  const s2 = C.newState('order', nd, r.k); const sw = want.slice(); [sw[1], sw[2]] = [sw[2], sw[1]]; sw.forEach((i, k) => C.place(s2, i, k));
  const x = C.check(s2);
  ok(x.result === 'miss' && s2.verdict.wrong.join() === '1,2' && s2.verdict.gate === ownGate(r.nums[sw[1]], r.nums[sw[2]], nd), 'D: order ' + r.nums.join('/') + ' with the middle two swapped → steps 2 and 3 wrong, decided at gate ' + s2.verdict.gate);
  const s3 = C.newState('order', nd, r.k); C.place(s3, 0, 0); ok(C.check(s3).key === 'hintSteps' && s3.misses === 0, 'D: an empty step is a note');
}));

/* ---------- E. misses and help ---------- */
(() => {
  const st = C.newState('compare', 3, 0); C.predict(st, 1); C.setSign(st, '<');
  C.check(st); ok(st.misses === 1 && !st.help && st.ran, 'E: miss 1, no help, the race ran');
  C.predict(st, 2); ok(st.verdict === null && !st.ran, 'E: a new move takes the run and the verdict away');
  C.check(st); ok(st.misses === 2 && st.help, 'E: miss 2 brings help');
  C.predict(st, 0); ok(C.check(st).result === 'ok' && st.done, 'E: the right call still wins after help');
  ok(!C.predict(st, 1) && C.check(st).result === 'no', 'E: a finished round is locked');
})();

/* ---------- F. hints ---------- */
(() => {
  const h = (k, p, s, n) => { const st = C.newState('compare', 3, k); C.predict(st, p); C.setSign(st, s); for (let i = 0; i < (n || 1); i++) C.check(st); return C.hint(st); };
  ok(h(0, 1, '<') === 'hintLate', 'F: a later gate → hintLate');
  ok(h(3, 0, '<') === 'hintEarly', 'F: an earlier, equal gate → hintEarly');
  ok(h(0, 0, '>') === 'hintSignSide', 'F: the right gate with the wrong sign → hintSignSide');
  ok(h(0, 1, '<', 2) === 'hintVs', 'F: miss 2 → hintVs');
  ok(h(9, 0, '=', 2) === 'hintAllSame', 'F: the equal round at miss 2 → hintAllSame');
  const o = C.newState('order', 3, 0); [0, 1, 2, 3].forEach((i) => C.place(o, i, i)); C.check(o); ok(C.hint(o) === 'hintOrder', 'F: order miss 1'); C.check(o); ok(C.hint(o) === 'hintPair', 'F: order miss 2');
  ok(C.okKey(Object.assign(C.newState('compare', 3, 0))) === 'okLess' && C.okKey(C.newState('compare', 3, 1)) === 'okGreater' && C.okKey(C.newState('compare', 3, 9)) === 'okEqual', 'F: the success sentence follows the sign');
})();

/* ---------- G. the plan ---------- */
(() => {
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  [['compare', 3], ['compare', 4], ['order', 3], ['order', 4]].forEach(([job, nd]) => {
    let prev = null, same = 0;
    for (let p = 0; p < 300; p++) { const o = C.plan(job, nd, p, rnd, prev).order; ok(o.slice().sort((x, y) => x - y).join() === C.rounds(job, nd).map((r) => r.k).join(), 'G: ' + job + nd + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; prev = o; }
    ok(same === 0, 'G: ' + job + nd + ' never repeats the previous order');
    const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
    for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(job, nd, 0, stream(sd), null).order, o2 = C.plan(job, nd, 0, stream(sd), o1).order; ok(o1.join() !== o2.join(), 'G: ' + job + nd + ' replayed stream ' + sd + ' gives a new order'); }
  });
})();

/* ---------- H. strings ×11 and reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
const sandbox = {}; new Function('window', 'document', 'DecidingGateCore', SRC.replace(/injectDecidingGateCSS\(\);/, '') + ';window.X=DecidingGateActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings;
ok(keys.length >= 50, 'H: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  const built = /^at(Th|H|T|O)$/.test(k) && ['atTh', 'atH', 'atT', 'atO'].every((x) => body.includes("'" + x + "'"))
    || /^g(Th|H|T|O)$/.test(k) && ['gTh', 'gH', 'gT', 'gO'].every((x) => body.includes("'" + x + "'"))
    || /^w(Th|H|T|O)[01n]$/.test(k) && body.includes("this._t('w' + this._P(p)")
    || /^a(Lt|Eq|Gt)$/.test(k) && body.includes("'a" + k.slice(1) + "'");
  ok(body.includes("'" + k + "'") || built || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
});
const ACT_BODY = SRC.replace(strBlock, '');
[['hint', /C\.hint\(st\)/], ['note', /r\.result === 'note'[\s\S]{0,80}this\._t\(r\.key\)/], ['success line', /DecidingGateCore\.okKey\(st\)/], ['equal-sign hint', /key === 'hintSignSide' && R\.sign === '='/]].forEach(([w, re]) => ok(re.test(ACT_BODY), 'H: the activity shows the core\'s ' + w));
/* the long view shows the true lengths — it is the answer, so only a finished round may paint it */
ok(/if \(st\.done\) this\._paintLong\(/.test(ACT_BODY) && (ACT_BODY.match(/this\._paintLong\(/g) || []).length === 1, 'H: the long view is painted only after a win');
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ; and inside « »');
ok(!/\b(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)\b/i.test(strBlock), 'H: no "free" in the activity text');
ok(LOCALES.every((l) => STR.okLess[l].includes('{a}') && STR.okLess[l].includes('{b}') && STR.okLess[l].indexOf('{a}') < STR.okLess[l].indexOf('{b}')), 'H: "{a} is less than {b}" keeps a before b in every locale');

/* ---------- I. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const row = list.find((x) => x.id === 'match-pairs.compare-three-digit-numbers.2-nbt-a-4');
ok(row && row.tool === 'deciding-gate-activity' && row.task_template === 'deciding-gate', 'I: the row points at the gate');
ok(row && row.alignment.code === '2.NBT.A.4' && Object.keys(row.slug).length === 11, 'I: the alignment and 11 slugs stay');

console.log(`verify-deciding-gate-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
