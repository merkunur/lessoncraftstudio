#!/usr/bin/env node
/* =====================================================================
   verify-value-keys-core.js — the gate for ACTIVITY #150, The Value-Key
   Adding Machine (2.NBT.A.3). The gate keeps its OWN ground truth: the
   expanded forms, the right keys and the answers are worked out here from
   the digits of each number, never read off the tool.
   A data tables · B expanded form · C the keys · D the crank · E misses
   and help · F hints · G the plan · H strings ×11 and reachability ·
   I the manifest row.
   VK_CORE / VK_ACT / VK_MANIFEST let mutate-value-keys.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.VK_CORE || path.join(ROOT, 'mini tools', 'value-keys-core.js');
const ACT_PATH = process.env.VK_ACT || path.join(ROOT, 'mini tools', 'value-keys-activity.js');
const MAN_PATH = process.env.VK_MANIFEST || path.join(ROOT, 'mini tools', 'place-value-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own arithmetic ---------- */
const DG = (n) => { const s = String(n).padStart(3, '0'); return { h: +s[0], t: +s[1], o: +s[2] }; };
const UNIT = { h: 100, t: 10, o: 1 };
const ownParts = (n) => ['h', 't', 'o'].filter((p) => DG(n)[p]).map((p) => DG(n)[p] * UNIT[p]);
const ownExpanded = (n) => ownParts(n).join(' + ');
const ownKeys = (n) => { const d = DG(n); return { h: d.h || null, t: d.t || null, o: d.o || null }; };
const PL = (k) => k === 2 ? ['t', 'o'] : ['h', 't', 'o'];

/* ---------- A. the data tables (the design's numbers) ---------- */
const make3 = C.rounds('make', 3).map((r) => r.n), make2 = C.rounds('make', 2).map((r) => r.n);
ok(make3.join() === '108,247,305,420,500,604,730,850,974,160,200,408,463,583,670,702,836,906', 'A: the 18 kept make targets, in their two passes');
ok(C.rounds('make', 3).every((r, i) => r.pass === (i < 9 ? 0 : 1)), 'A: make passes A and B');
ok(make3.filter((n) => Object.values(DG(n)).includes(0)).length === 13, 'A: 13 of the 18 have a zero place');
ok(make2.join() === '43,70,58,16,91,35,62,27,89', 'A: the two-digit make targets');
ok(C.rounds('read', 3).map((r) => r.n).join() === '238,406,571,690,145,802,367,954,713', 'A: read three digits');
ok(C.rounds('read', 2).map((r) => r.n).join() === '34,60,75,19,82,47,90,56,23', 'A: read two digits');
const W3 = C.rounds('worth', 3), W2 = C.rounds('worth', 2);
ok(W3.map((r) => r.n + r.place).join() === '472t,721h,217o,358t,583h,835o,946t,469h,694o', 'A: worth three digits');
ok(W2.map((r) => r.n + r.place).join() === '47t,74o,36t,63o,85t,58o,29t,92o,61t', 'A: worth two digits');
ok(W3.every((r) => r.d === DG(r.n)[r.place] && r.d > 0) && W2.every((r) => r.d === DG(r.n)[r.place] && r.d > 0), 'A: the bright digit is the digit of its place, never 0');
['h', 't', 'o'].forEach((p) => ok(W3.filter((r) => r.place === p).length === 3, 'A: worth-3 bright in the ' + p + ' 3 times'));
ok(W2.filter((r) => r.place === 't').length === 5 && W2.filter((r) => r.place === 'o').length === 4, 'A: worth-2 tens 5×, ones 4×');
/* the face-value bot (press the ones key of the digit's face) is right only where the digit IS in the ones */
ok(W3.filter((r) => r.place === 'o').length === 3 && W2.filter((r) => r.place === 'o').length === 4, 'A: the face-value bot 3/9 and 4/9');
const S = C.rounds('set', 2);
ok(S.length === 9 && S.every((r) => r.places === 2 && r.sets.length === 3 && r.sets.filter((x) => x === r.n).length === 1 && r.sets[r.right] === r.n), 'A: which set: three sets, one right');
[0, 1, 2].forEach((i) => ok(S.filter((r) => r.right === i).length === 3, 'A: which set: the right set is in position ' + (i + 1) + ' 3 times'));
ok(S.every((r) => r.sets.filter((x) => DG(x).t === DG(r.n).t).length >= 2), 'A: which set: counting only the rods never singles out the right set');
ok(S.every((r) => r.sets.filter((x) => DG(x).o === DG(r.n).o).length >= 2), 'A: which set: counting only the cubes never singles out the right set');
const pieces = (n) => DG(n).t + DG(n).o;
const rank = (r) => { const others = r.sets.filter((x) => x !== r.n).map(pieces); return others.filter((p) => p < pieces(r.n)).length; };
ok(S.every((r) => r.sets.filter((x) => pieces(x) === pieces(r.n)).length === 1), 'A: which set: the right set never ties with another on its piece count');
[0, 1, 2].forEach((k) => ok(S.filter((r) => rank(r) === k).length === 3, 'A: which set: the right set has piece rank ' + k + ' 3 times'));
ok(S.every((r) => r.sets.every((x) => DG(x).t <= 9 && x < 100)), 'A: which set: two-digit sets');
ok(S.every((r) => r.sets.some((x) => x !== r.n && Math.abs(x - r.n) === 1 || Math.abs(x - r.n) === 10)), 'A: which set: a near miss by one rod or one cube in every round');
/* no round is about 0 */
[['make', 3], ['make', 2], ['read', 3], ['read', 2], ['worth', 3], ['worth', 2], ['set', 2]].forEach(([j, p]) => ok(C.rounds(j, p).every((r) => r.n > 0), 'A: no ' + j + '-' + p + ' round is 0'));

/* ---------- B. expanded form ---------- */
ok(C.expanded(305) === '300 + 5' && C.expanded(500) === '500' && C.expanded(247) === '200 + 40 + 7' && C.expanded(16) === '10 + 6' && C.expanded(70) === '70', 'B: the design examples');
for (let n = 1; n <= 999; n++) ok(C.expanded(n) === ownExpanded(n), 'B: expanded(' + n + ')');
ok(!/\+ 0\b/.test(Array.from({ length: 999 }, (_, i) => C.expanded(i + 1)).join('|')), 'B: a zero place is never printed as + 0');

/* ---------- C. the keys ---------- */
(() => {
  const st = C.newState('make', 3, 0);
  ok(!C.press(st, 'h', 0), 'C: there is no zero key');
  ok(!C.press(st, 'h', 10) && !C.press(st, 'x', 3) && !C.press(st, 'h', 2.5), 'C: only keys 1–9 in a real column');
  ok(C.press(st, 'h', 2) && st.keys.h === 2, 'C: press 200');
  ok(C.press(st, 'h', 3) && st.keys.h === 3, 'C: a column holds one key: 300 replaces 200');
  ok(C.press(st, 'h', 3) && st.keys.h === null, 'C: pressing the pressed key lifts it');
  const s2 = C.newState('make', 2, 0);
  ok(!C.press(s2, 'h', 1), 'C: the two-digit machine has no hundreds keys');
  const s3 = C.newState('set', 3, 0);
  ok(s3.places === 2 && !C.press(s3, 't', 1), 'C: which set is two digits and the child presses no keys');
  ok(C.placesOf('set', 'three') === 2 && C.placesOf('make', 'two') === 2 && C.placesOf('make', 'three') === 3, 'C: which set forces two digits');
})();

/* ---------- D. the crank ---------- */
const play = (job, places, k, keys) => { const st = C.newState(job, places, k); PL(places).forEach((p) => { if (keys[p]) C.press(st, p, keys[p]); }); return st; };
[['make', 3], ['make', 2], ['read', 3], ['read', 2]].forEach(([job, places]) => C.rounds(job, places).forEach((r) => {
  const st = play(job, places, r.k, ownKeys(r.n)), res = C.crank(st);
  ok(res.result === 'ok' && st.done && st.drums === r.n, 'D: ' + job + ' ' + r.n + ' with its own keys');
  const lines = st.tape;
  ok(lines[lines.length - 1] === '= ' + r.n && lines.slice(0, -1).map((x) => +x.replace('+ ', '')).join() === ownParts(r.n).join(), 'D: the tape of ' + r.n);
  /* every single wrong key */
  PL(places).forEach((p) => { for (let d = 1; d <= 9; d++) {
    const keys = ownKeys(r.n); if (keys[p] === d) continue; keys[p] = d;
    const s = play(job, places, r.k, keys), x = C.crank(s), sum = ['h', 't', 'o'].reduce((a, q) => a + (keys[q] || 0) * UNIT[q], 0);
    const zero = DG(r.n)[p] === 0;
    ok(x.result === 'miss' && s.drums === sum && !s.done, 'D: ' + job + ' ' + r.n + ' with ' + p + '=' + d + ' is a miss showing ' + sum);
    const want = zero && job === 'make' ? 'zeroPressed' : job === 'read' ? 'wrongRead' : 'wrongMake';
    ok(s.verdict.kind === want && s.verdict.places.includes(p), 'D: ' + job + ' ' + r.n + ' ' + p + '=' + d + ' → ' + want);
  } });
  /* a missing key in a non-zero place */
  PL(places).forEach((p) => { if (!DG(r.n)[p] || ownParts(r.n).length < 2) return; const keys = ownKeys(r.n); keys[p] = null; const s = play(job, places, r.k, keys); ok(C.crank(s).result === 'miss' && s.verdict.places.includes(p), 'D: ' + r.n + ' without its ' + p + ' key is a miss'); });
  /* the digits pressed as ones (247 = 2 + 4 + 7) */
  if (places === 3) { const s = C.newState(job, 3, r.k); const dd = DG(r.n); const tot = dd.h + dd.t + dd.o; if (tot <= 9 && tot > 0) { C.press(s, 'o', tot); ok(C.crank(s).result === 'miss', 'D: ' + r.n + ' as the sum of its digits is a miss'); } }
}));
(() => { const st = C.newState('make', 3, 0); const r = C.crank(st); ok(r.result === 'note' && r.key === 'hintNoKey' && st.misses === 0 && st.cranks === 0, 'D: a crank with no key is a note, not a miss'); })();
[['worth', 3], ['worth', 2]].forEach(([job, places]) => C.rounds(job, places).forEach((r) => {
  PL(places).forEach((p) => { for (let d = 1; d <= 9; d++) {
    const s = C.newState(job, places, r.k); C.press(s, p, d); const x = C.crank(s);
    const right = p === r.place && d === r.d;
    ok(right ? x.result === 'ok' : x.result === 'miss' && s.verdict.kind === 'wrongWorth' && s.verdict.v === d * UNIT[p], 'D: worth ' + r.n + ' key ' + d * UNIT[p] + (right ? ' right' : ' wrong'));
  } });
  const s = C.newState(job, places, r.k); C.press(s, r.place, r.d); C.press(s, r.place === 'o' ? 't' : 'o', 1);
  ok(C.crank(s).result === 'note' && s.misses === 0, 'D: worth ' + r.n + ' with two keys is a note');
  const e = C.newState(job, places, r.k); ok(C.crank(e).result === 'note' && e.misses === 0, 'D: worth with no key is a note');
}));
C.rounds('set', 2).forEach((r) => {
  const e = C.newState('set', 2, r.k); ok(C.crank(e).result === 'note' && C.crank(e).key === 'hintPickSet' && e.misses === 0, 'D: which set with nothing fed is a note');
  r.sets.forEach((n, i) => {
    const s = C.newState('set', 2, r.k); ok(C.feed(s, i), 'D: feed set ' + i);
    ok(s.keys.t === (DG(n).t || null) && s.keys.o === (DG(n).o || null), 'D: the machine presses the keys set ' + n + ' is worth (10 × rods + cubes)');
    const x = C.crank(s);
    ok(i === r.right ? x.result === 'ok' : x.result === 'miss' && s.verdict.sum === n, 'D: set ' + n + ' for ticket ' + r.n);
  });
});

/* ---------- E. misses and help ---------- */
(() => {
  const st = C.newState('make', 3, 1); C.press(st, 'h', 2); C.press(st, 'o', 7);
  C.crank(st); ok(st.misses === 1 && !st.help, 'E: miss 1 has no help');
  C.press(st, 'o', 6); ok(st.verdict === null, 'E: a new press takes the verdict away');
  C.crank(st); ok(st.misses === 2 && st.help, 'E: miss 2 brings help');
  C.press(st, 't', 4); C.press(st, 'o', 7); ok(C.crank(st).result === 'ok' && st.done, 'E: the right keys still win after help');
  ok(!C.press(st, 'h', 3) && C.crank(st).result === 'no', 'E: a finished round is locked');
})();

/* ---------- F. hints ---------- */
(() => {
  const st = C.newState('make', 3, 2); /* 305 */ C.press(st, 'h', 3); C.press(st, 't', 5); C.press(st, 'o', 5); C.crank(st);
  ok(C.hint(st) === 'hintZero' && st.verdict.places.join() === 't' && st.drums === 355, 'F: 50 pressed for 305 → the zero hint, drums 355');
  const m = C.newState('make', 3, 1); /* 247 */ C.press(m, 'h', 2); C.press(m, 't', 7); C.press(m, 'o', 4); C.crank(m);
  ok(C.hint(m) === 'hintMakeLook' && C.helpPlace(m) === 't', 'F: 274 for 247 → look at the glowing places');
  C.crank(m); ok(C.hint(m) === 'hintMakeWorth' && C.helpPlace(m) === 't', 'F: miss 2 → what the digit in that place is worth');
  const r = C.newState('read', 3, 0); C.press(r, 'h', 2); C.press(r, 't', 3); C.press(r, 'o', 9); C.crank(r);
  ok(C.hint(r) === 'hintReadLook' && C.helpPlace(r) === 'o', 'F: read miss 1'); C.crank(r); ok(C.hint(r) === 'hintReadCount', 'F: read miss 2');
  const w = C.newState('worth', 3, 0); /* 472, the 7 */ C.press(w, 'o', 7); C.crank(w);
  ok(C.hint(w) === 'hintWorthLook' && w.verdict.v === 7, 'F: worth face-value miss'); C.crank(w); ok(C.hint(w) === 'hintWorthCol' && C.helpPlace(w) === 't', 'F: worth miss 2 names the bright digit\'s place');
  const s = C.newState('set', 2, 0); C.feed(s, 1); C.crank(s); ok(C.hint(s) === 'hintSetLook' && C.helpPlace(s) === 'o', 'F: 36 for 34 → look at the ones'); C.crank(s); ok(C.hint(s) === 'hintSetFind', 'F: which set miss 2');
  /* 406 read as 415: the tens (a zero place in 406) and the ones differ — the help talks about the ones, never "the 0 in the tens" */
  const z = C.newState('read', 3, 1); C.press(z, 'h', 4); C.press(z, 't', 1); C.press(z, 'o', 5); C.crank(z);
  ok(z.verdict.places.join() === 't,o' && C.helpPlace(z) === 'o', 'F: the help skips a zero place and names the ones');
  const ok1 = C.newState('make', 3, 4); /* 500 */ C.press(ok1, 'h', 5); C.crank(ok1); ok(C.okKey(ok1) === 'okOne', 'F: 500 succeeds with the one-part line');
  const ok2 = C.newState('make', 3, 1); C.press(ok2, 'h', 2); C.press(ok2, 't', 4); C.press(ok2, 'o', 7); C.crank(ok2); ok(C.okKey(ok2) === 'okExp', 'F: 247 succeeds with the expanded line');
})();

/* ---------- G. the plan ---------- */
(() => {
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  [['make', 3], ['make', 2], ['read', 3], ['read', 2], ['worth', 3], ['worth', 2], ['set', 2]].forEach(([job, places]) => {
    let prev = null, same = 0;
    for (let pass = 0; pass < 400; pass++) {
      const o = C.plan(job, places, pass, rnd, prev).order, pool = C.rounds(job, places).filter((r) => !(job === 'make' && places === 3) || r.pass === pass % 2).map((r) => r.k);
      ok(o.length === 9 && o.slice().sort((a, b) => a - b).join() === pool.slice().sort((a, b) => a - b).join(), 'G: ' + job + places + ' pass ' + pass + ' is its pool, reordered');
      if (prev && prev.join() === o.join()) same++;
      prev = o;
    }
    ok(same === 0, 'G: ' + job + places + ' never repeats the previous order');
  });
  /* replay the SAME random stream with the previous order: the plan must still give a different one */
  const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
  [['make', 3], ['read', 2], ['worth', 3], ['set', 2]].forEach(([job, places]) => { for (let sd = 1; sd < 30; sd++) { const o1 = C.plan(job, places, 0, stream(sd), null).order, o2 = C.plan(job, places, 0, stream(sd), o1).order; ok(o2.join() !== o1.join(), 'G: ' + job + places + ' replayed stream ' + sd + ' gives a new order'); } });
  ok(C.passSize() === 9, 'G: a pass is nine rounds');
})();

/* ---------- H. strings ×11 and reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
const sandbox = {}; new Function('window', 'document', 'ValueKeysCore', SRC.replace(/injectValueKeysCSS\(\);/, '') + ';window.X=ValueKeysActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings;
ok(keys.length >= 50, 'H: the strings block parsed (' + keys.length + ' keys)');
const SHELL_KEYS = ['title', 'instruction'];
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
  /* referenced outside the strings block: literally, or as a key built from an audited prefix */
  const built = /^hintMakeWorth[HTO]$/.test(k) && body.includes("'hintMakeWorth'") || /^hintWorthCol[HTO]$/.test(k) && body.includes("'hintWorthCol'") || /^hintSetLook[TO]$/.test(k) && body.includes("'hintSetLook'")
    || /^w[HTO][01n]$/.test(k) && body.includes("'wH'") || /^aCol[HTO]$/.test(k) && body.includes("'aColH'") && body.includes("'aColT'") && body.includes("'aColO'");
  ok(body.includes("'" + k + "'") || built || SHELL_KEYS.includes(k), 'H: ' + k + ' is reached by the code');
});
/* the core names a key; only the activity can show it — each route by its call site */
const ACT_BODY = SRC.replace(strBlock, '');
[['hint', /ValueKeysCore\.hint\(st\)|C\.hint\(st\)/], ['note', /r\.result === 'note'[\s\S]{0,160}this\._t\(nk\)/], ['success line', /C\.okKey\(st\)/]].forEach(([w, re]) => ok(re.test(ACT_BODY), 'H: the activity shows the core\'s ' + w));
LOCALES.forEach((l) => ok(!/ [?:!;»]|« /.test(STR.qWorth.fr + STR.qSet.fr + STR.hintOneKey.fr + STR.okSet.fr + STR.aShown3.fr) || l !== 'fr', 'H: fr narrow spaces'));
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ; and inside « »');
ok(!/\b(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)\b/i.test(strBlock), 'H: no "free" in the activity text');
ok(!/\{n\}/.test(STR.hintWorthLook.en + STR.hintWorthCol + STR.qWorth.en), 'H: the worth hints never name the number');
ok(/<b>\?<\/b>/.test(ACT_BODY), 'H: the worth tray hides the bright digit\'s value');

/* ---------- I. the manifest row ---------- */
const row = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')).find((x) => x.id === 'place-value.expanded-form.2-nbt-a-3');
ok(row && row.tool === 'value-keys-activity' && row.task_template === 'value-keys', 'I: the row points at the machine');
ok(row && row.alignment.code === '2.NBT.A.3' && Object.keys(row.slug).length === 11, 'I: the alignment and 11 slugs stay');
ok(row && row.params.targets.slice().sort((a, b) => a - b).join() === make3.slice().sort((a, b) => a - b).join(), 'I: the 18 kept targets are the make rounds');

console.log(`verify-value-keys-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
