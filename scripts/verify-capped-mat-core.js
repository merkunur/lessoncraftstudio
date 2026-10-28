#!/usr/bin/env node
/* =====================================================================
   verify-capped-mat-core.js — the build gate of #149 THE CAPPED MAT
   (place-value.hundreds-tens-and-ones.2-nbt-a-1, 2.NBT.A.1).
   The gate's OWN ground truth: every expectation is computed here from the
   design's rules (docs/activities-rebuild/designs/149-place-value.md), never
   read off the tool. Exits 1 on any failure.
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
/* CM_CORE / CM_ACT let mutate-capped-mat.js point the gate at a mutated copy */
const CORE_PATH = process.env.CM_CORE || path.join(ROOT, 'mini tools', 'capped-mat-core.js');
const ACT_PATH = process.env.CM_ACT || path.join(ROOT, 'mini tools', 'capped-mat-activity.js');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8');
const CORE = fs.readFileSync(CORE_PATH, 'utf8');
const SHELL_KEYS = ['title', 'instruction'];
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  FAIL ' + m); } };
const D = (n) => ({ h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 });
const val = (d) => d.h * 100 + d.t * 10 + d.o;

/* ---------- A. Build: the old activity's 18 targets, kept, two passes ---------- */
const OLD = [108, 160, 200, 247, 305, 408, 420, 463, 500, 583, 604, 670, 702, 730, 836, 850, 906, 974];
const B = C.rounds('build');
ok(B.length === 18, 'A: 18 build rounds');
ok(B.map((r) => r.n).slice().sort((a, b) => a - b).join() === OLD.join(), 'A: the build targets are exactly the old 18');
ok(B.every((r) => r.n >= 100 && r.n <= 999), 'A: every build target is three-digit');
const zeroA = B.filter((r) => r.pass === 0 && /0/.test(String(r.n))).length, zeroB = B.filter((r) => r.pass === 1 && /0/.test(String(r.n))).length;
ok(zeroA === 7 && zeroB === 6, 'A: zeros per pass 7 / 6 (got ' + zeroA + ' / ' + zeroB + ')');
ok([200, 500].every((n) => B.some((r) => r.n === n)), 'A: the double zeros 200 and 500 are there (2.NBT.A.1b)');
ok(B.filter((r) => r.pass === 0).length === 9 && B.filter((r) => r.pass === 1).length === 9, 'A: two passes of nine');

/* ---------- B. Read: counts, appearance order, the fold ---------- */
const R = C.rounds('read');
ok(R.length === 9, 'B: 9 read rounds');
R.forEach((r) => {
  const d = D(r.n);
  ok(d.h <= 9 && d.t <= 9 && d.o <= 9 && d.h >= 1, 'B: ' + r.n + ' counts ≤ 9 and a hundreds digit');
  const kinds = ['h', 't', 'o'].filter((p) => d[p] > 0).sort().join();
  ok(r.order.split('').sort().join() === kinds, 'B: ' + r.n + ' delivery order covers exactly its non-empty kinds');
  const del = C.delivery(r);
  ok(del.length === d.h + d.t + d.o, 'B: ' + r.n + ' delivery holds every block');
  ok(['h', 't', 'o'].every((p) => del.filter((x) => x === p).length === d[p]), 'B: ' + r.n + ' delivery counts per kind');
});
ok(R.filter((r) => r.order !== 'hto').length >= 8, 'B: ≥ 8 of 9 deliveries are NOT in hundreds-tens-ones order');
/* the appearance-order bot: writes the counts in the order the kinds appear (padding missing kinds is impossible) */
const bot = R.filter((r) => { const d = D(r.n); const s = r.order.split('').map((p) => d[p]).join(''); return s === String(r.n); }).length;
ok(bot === 1, 'B: the appearance-order bot gets exactly 1 of 9 (got ' + bot + ')');
const zeroR = R.filter((r) => /0/.test(String(r.n)));
ok(zeroR.length === 3, 'B: three read rounds have an empty place');
zeroR.forEach((r) => {
  const d = D(r.n), caps = { h: d.h, t: d.t || null, o: d.o || null };
  const fold = ['h', 't', 'o'].filter((p) => caps[p] != null).map((p) => caps[p]).join('');
  ok(C.foldReading(caps) === fold && fold !== String(r.n), 'B: ' + r.n + ' bare zero folds to ' + fold);
});

/* ---------- C. Match: the table's balance ---------- */
const M = C.rounds('match');
ok(M.length === 9, 'C: 9 match rounds');
const pos = [0, 0, 0], rank = [0, 0, 0];
M.forEach((r) => {
  ok(r.trays.indexOf(r.n) === r.right && r.trays.filter((n) => n === r.n).length === 1, 'C: ' + r.n + ' exactly one right tray');
  pos[r.right]++;
  const t = D(r.n), others = r.trays.filter((_, i) => i !== r.right).map(D);
  ['h', 't', 'o'].forEach((p) => ok(others.some((o) => o[p] === t[p]), 'C: ' + r.n + ' its ' + p + ' digit is shared by a wrong tray'));
  const pieces = r.trays.map((n) => { const d = D(n); return d.h + d.t + d.o; }), mine = pieces[r.right];
  const max = Math.max(...pieces), min = Math.min(...pieces);
  ok(!(mine === max && pieces.filter((x) => x === max).length === 1), 'C: ' + r.n + ' right tray is not uniquely the most pieces');
  ok(!(mine === min && pieces.filter((x) => x === min).length === 1), 'C: ' + r.n + ' right tray is not uniquely the fewest pieces');
  const sorted = r.trays.slice().sort((a, b) => a - b); rank[sorted.indexOf(r.n)]++;
  ok(r.trays.every((n) => D(n).h <= 6), 'C: ' + r.n + ' at most 6 flats in every tray');
});
ok(pos.join() === '3,3,3', 'C: right tray position 3/3/3 (got ' + pos + ')');
ok(rank.join() === '3,3,3', 'C: right tray is the smallest / middle / largest number 3/3/3 (got ' + rank + ')');
/* a single-place bot (count only the flats / rods / cubes) never singles out the right tray */
['h', 't', 'o'].forEach((p) => {
  const wins = M.filter((r) => { const t = D(r.n)[p]; return r.trays.filter((n) => D(n)[p] === t).length === 1; }).length;
  ok(wins === 0, 'C: counting only the ' + p + ' picks the right tray alone in 0 / 9 (got ' + wins + ')');
});
for (let k = 0; k < 9; k++) for (let i = 0; i < 3; i++) ok(C.trayOrder(k, i, true) !== 'hto' && C.trayOrder(k, i, false) === 'hto', 'C: tray ' + k + '/' + i + ' jumbled ≠ H-T-O, tidy = H-T-O');

/* ---------- D. The hand ---------- */
['h', 't', 'o'].forEach((p) => {
  const s = C.newState('build', false, 0);
  for (let i = 0; i < 9; i++) ok(C.add(s, p).ok, 'D: block ' + (i + 1) + ' of ' + p + ' goes on');
  const r = C.add(s, p);
  ok(!r.ok && r.refused && s.mat[p] === 9, 'D: the tenth ' + p + ' is refused (a cap holds one digit)');
  ok(s.refused === p && C.refusedKey(p) === { o: 'hintTenthO', t: 'hintTenthT', h: 'hintTenthH' }[p], 'D: the refused tenth names its place');
  ok(C.remove(s, p) && s.mat[p] === 8, 'D: − takes one ' + p + ' away');
});
{ const s = C.newState('build', false, 0); ok(!C.remove(s, 'h'), 'D: − refuses on an empty column'); }
/* Read jumbled: a block goes to ITS column, whatever the order it lay in */
R.forEach((r) => {
  const s = C.newState('read', true, r.k), d = D(r.n);
  ok(s.mat.h + s.mat.t + s.mat.o === 0 && s.delivery.length === d.h + d.t + d.o, 'D: ' + r.n + ' jumbled starts in the delivery');
  while (s.delivery.length) { const p = s.delivery[0]; const before = s.mat[p]; ok(C.sendBlock(s, 0) === p && s.mat[p] === before + 1, 'D: a ' + p + ' slides to its own column'); }
  ok(val(s.mat) === r.n, 'D: ' + r.n + ' everything sent builds the number');
  ok(C.backBlock(s, 'h') && s.delivery.length === 1, 'D: a block taps back to the delivery');
  const t = C.newState('read', false, r.k);
  ok(val(t.mat) === r.n && t.delivery.length === 0, 'D: ' + r.n + ' tidy starts with the blocks in their columns');
});
/* caps are endless: two columns can wear the same digit */
{ const s = C.newState('read', false, 0); ok(C.cap(s, 'h', 4) && C.cap(s, 't', 4) && s.caps.h === 4 && s.caps.t === 4, 'D: a cap is not used up'); ok(C.uncap(s, 't') && s.caps.t == null, 'D: a seated cap comes off'); }
{ const s = C.newState('match', false, 0); ok(C.pickTray(s, 2) && s.tray === 2 && !C.pickTray(s, 3), 'D: a tray is picked, an out-of-range one refused'); }
{ const s = C.newState('build', false, 0); ok(!C.cap(s, 'h', 1), 'D: the child does not cap in Build (the caps read the build)'); }

/* ---------- E. Check ---------- */
function readState(k) { return C.newState('read', false, k); }
/* Read: notes are never misses */
{ const s = readState(0); const r = C.check(s); ok(r.result === 'note' && r.key === 'hintCapAll' && s.misses === 0, 'E: read with no cap → note'); }
{ const s = C.newState('read', true, 0); const r = C.check(s); ok(r.result === 'note' && r.key === 'hintDelivery' && s.misses === 0, 'E: read with blocks still in the delivery → note'); }
/* a column holding blocks but bare = capMissing (no miss); an EMPTY bare column = zeroFold (the only fold) */
R.forEach((r) => {
  const d = D(r.n);
  ['h', 't', 'o'].forEach((bareP) => {
    const s = readState(r.k);
    ['h', 't', 'o'].forEach((p) => { if (p !== bareP) C.cap(s, p, d[p]); });
    const res = C.check(s);
    if (d[bareP] > 0) ok(res.result === 'note' && res.key === 'hintCapMissing' && s.misses === 0, 'E: ' + r.n + ' bare non-empty ' + bareP + ' → capMissing note, no fold');
    else {
      ok(res.result === 'miss' && res.kind === 'zeroFold' && C.hint(s) === 'hintZeroFold', 'E: ' + r.n + ' bare EMPTY ' + bareP + ' → zeroFold');
      const fold = ['h', 't', 'o'].filter((p) => p !== bareP).map((p) => d[p]).join('');
      ok(s.verdict.fold === fold, 'E: ' + r.n + ' the hint quotes the child\'s own two-cap reading ' + fold);
    }
  });
  /* every cap right → ok, and the success counts are the mat */
  const good = readState(r.k); ['h', 't', 'o'].forEach((p) => C.cap(good, p, d[p]));
  ok(C.check(good).result === 'ok' && good.done && val(C.counts(good)) === r.n, 'E: ' + r.n + ' right caps → ok, counts = the mat');
  /* a wrong cap (±1 in each place) → wrongCap, miss 2 → numbers */
  ['h', 't', 'o'].forEach((p) => {
    [-1, 1].forEach((dd) => {
      const w = d[p] + dd; if (w < 0 || w > 9) return;
      const s = readState(r.k); ['h', 't', 'o'].forEach((q) => C.cap(s, q, q === p ? w : d[q]));
      const res = C.check(s);
      ok(res.result === 'miss' && res.kind === 'wrongCap' && s.verdict.places.join() === p && C.hint(s) === 'hintCount', 'E: ' + r.n + ' cap ' + p + '=' + w + ' → wrongCap on ' + p);
      C.check(s); ok(s.help && C.hint(s) === 'hintCountNum', 'E: ' + r.n + ' second wrong cap → count with the numbers');
    });
  });
  /* the piece count as a cap is never accepted */
  const pieces = d.h + d.t + d.o;
  if (pieces <= 9 && pieces !== d.o) { const s = readState(r.k); C.cap(s, 'h', d.h); C.cap(s, 't', d.t); C.cap(s, 'o', pieces); ok(C.check(s).result === 'miss', 'E: ' + r.n + ' a piece count in the ones cap is a miss'); }
});
/* the zero fold: second time → the 0 cap ghost */
{ const s = readState(2); C.cap(s, 'h', 3); C.cap(s, 'o', 7); C.check(s); C.cap(s, 'o', 7); C.check(s); ok(s.help && C.hint(s) === 'hintZeroCap', 'E: second zero fold → the 0-cap hint'); }
/* Build */
B.forEach((r) => {
  const d = D(r.n);
  const s = C.newState('build', false, r.k);
  ok(C.check(s).key === 'hintBuildEmpty' && s.misses === 0, 'E: ' + r.n + ' empty build → note');
  ['h', 't', 'o'].forEach((p) => { for (let i = 0; i < d[p]; i++) C.add(s, p); });
  ok(C.check(s).result === 'ok' && s.done && s.caps.h === d.h && s.caps.t === d.t && s.caps.o === d.o, 'E: ' + r.n + ' right build → ok, caps read it');
  /* the forgotten-zero build: the child builds the digits shifted (307 → 37 = 3 rods 7 cubes) */
  if (d.t === 0 && d.h > 0) {
    const w = C.newState('build', false, r.k); for (let i = 0; i < d.h; i++) C.add(w, 't'); for (let i = 0; i < d.o; i++) C.add(w, 'o');
    if (val(w.mat) !== r.n) { const res = C.check(w); ok(res.result === 'miss' && w.verdict.built === '0' + d.h + d.o, 'E: ' + r.n + ' the shifted build reads 0' + d.h + d.o + ' on its caps'); }
  }
  /* one too many tens → miss 1 look, miss 2 take away (the crossed blocks) — the 604 case */
  if (d.t < 9) {
    const w = C.newState('build', false, r.k); ['h', 't', 'o'].forEach((p) => { for (let i = 0; i < d[p] + (p === 't' ? 1 : 0); i++) C.add(w, p); });
    C.check(w); ok(C.hint(w) === 'hintBuildLook' && w.verdict.places.join() === 't', 'E: ' + r.n + ' one rod too many → look at the tens');
    C.remove(w, 'h'); C.add(w, 'h'); C.check(w); /* a neutral move (hundreds is never empty) */
    ok(w.help && C.hint(w) === 'hintBuildTake' && w.verdict.over.join() === 't' && !w.verdict.under.length, 'E: ' + r.n + ' second miss with too many → take away the crossed');
  }
  if (d.t > 0) {
    const w = C.newState('build', false, r.k); ['h', 't', 'o'].forEach((p) => { for (let i = 0; i < d[p] - (p === 't' ? 1 : 0); i++) C.add(w, p); });
    C.check(w); C.check(w); ok(w.help && C.hint(w) === 'hintBuildFill', 'E: ' + r.n + ' too few → fill the outlines');
  }
});
{ const r = B.find((x) => D(x.n).t > 0 && D(x.n).o < 9); const d = D(r.n), w = C.newState('build', false, r.k);
  ['h', 't', 'o'].forEach((p) => { const k = d[p] + (p === 't' ? -1 : p === 'o' ? 1 : 0); for (let i = 0; i < k; i++) C.add(w, p); });
  C.check(w); C.check(w); ok(C.hint(w) === 'hintBuildBoth', 'E: too few AND too many → both hints'); }
/* a move clears the marks (and the Build caps lift off) */
{ const s = C.newState('build', false, 0); C.add(s, 'h'); C.check(s); ok(s.verdict && s.caps.h === 1, 'E: build miss drops the caps'); C.add(s, 'o'); ok(!s.verdict && s.caps.h == null, 'E: a new move lifts the caps and the marks'); }
/* Match */
M.forEach((r) => {
  const s = C.newState('match', false, r.k);
  ok(C.check(s).key === 'hintPickTray' && s.misses === 0, 'E: match with no tray → note');
  const wrong = [0, 1, 2].find((i) => i !== r.right);
  C.pickTray(s, wrong); const res = C.check(s);
  ok(res.kind === 'wrongTray' && s.verdict.shown === r.trays[wrong] && C.hint(s) === 'hintTray', 'E: ' + r.n + ' wrong tray shows its own number');
  const diff = ['h', 't', 'o'].filter((p) => D(r.trays[wrong])[p] !== D(r.n)[p]);
  ok(s.verdict.places.join() === diff.join(), 'E: ' + r.n + ' the differing places glow');
  C.pickTray(s, wrong); C.check(s); ok(s.help && C.hint(s) === 'hintTrayAll', 'E: ' + r.n + ' second wrong tray → all trays show caps');
  C.pickTray(s, r.right); ok(C.check(s).result === 'ok' && val(C.counts(s)) === r.n, 'E: ' + r.n + ' right tray → ok');
});

/* ---------- F. The plan: order-only, passes alternate, never the same order twice ---------- */
function seeded(seed) { let x = seed; return () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648; }; }
['build', 'read', 'match'].forEach((job) => {
  for (let pass = 0; pass < 4; pass++) {
    const P = C.plan(job, pass, seeded(7 + pass));
    const want = C.rounds(job).filter((r) => job !== 'build' || r.pass === pass % 2).map((r) => r.k).sort((a, b) => a - b);
    ok(P.order.slice().sort((a, b) => a - b).join() === want.join(), 'F: ' + job + ' pass ' + pass + ' is an order-only reshuffle of its set');
  }
  /* a replayed stream that would repeat the previous order is refused */
  const first = C.plan(job, 0, seeded(3)).order;
  const again = C.plan(job, 0, seeded(3), first).order;
  ok(again.join() !== first.join(), 'F: ' + job + ' never the same order twice (replayed stream)');
});

/* ---------- G. Strings ×11 and reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
const sandbox = {}; new Function('window', 'document', SRC.replace(/injectCappedMatCSS\(\);/, '') + ';window.X=CappedMatActivity;')(sandbox, undefined);
const S = sandbox.X.strings;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof S[k][l] === 'string' && S[k][l].trim().length > 0, 'G: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  LOCALES.forEach((l) => ok(ph(S[k][l]) === ph(S[k].en), 'G: ' + k + '.' + l + ' keeps the placeholders of en'));
  /* referenced outside the strings block (literal or via a key built from a literal prefix) */
  const body = SRC.replace(strBlock, '') + CORE;
  /* SHELL_KEYS: read by lcs-shell.js itself (the tool header title, the instruction) — an audited list, not a loosened pattern */
  const reached = body.includes("'" + k + "'") || /^w[HTO][01n]$/.test(k) || /^p[HTO]$/.test(k) || SHELL_KEYS.indexOf(k) >= 0;
  ok(reached, 'G: ' + k + ' is reached by the code');
});
['hintZeroFold', 'hintZeroCap', 'hintCount', 'hintCountNum', 'hintBuildLook', 'hintBuildFill', 'hintBuildTake', 'hintBuildBoth', 'hintTray', 'hintTrayAll', 'hintCapMissing', 'hintCapAll', 'hintDelivery', 'hintPickTray', 'hintBuildEmpty', 'hintTenthO', 'hintTenthT', 'hintTenthH']
  .forEach((k) => ok(keys.indexOf(k) >= 0, 'G: hint key ' + k + ' has strings'));
/* the core NAMES a key; only the activity can show it. A string reachable from the core but never
   routed through the activity's translator is dead on screen — require each route by its call site. */
const ACT_BODY = SRC.replace(strBlock, '');
[['refusal note', /this\._t\(CappedMatCore\.refusedKey\(/], ['check note', /CappedMatCore\.check\(st\)[\s\S]{0,200}this\._t\(r\.key\)/], ['help hint', /CappedMatCore\.hint\(st\)/]]
  .forEach(([what, re]) => ok(re.test(ACT_BODY), 'G: the activity shows the core\'s ' + what));
/* in Read the number is the answer and is shown nowhere: the fold hint quotes only what the caps now say */
ok(LOCALES.every((l) => !S.hintZeroFold[l].includes('{n}') && S.hintZeroFold[l].includes('{fold}')), 'G: the fold hint quotes the fold, never the number to be read, in every locale');
ok(!/\bfree\b/i.test(strBlock), 'G: no "free" in the activity text');

console.log(`verify-capped-mat-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
