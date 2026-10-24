#!/usr/bin/env node
/* =====================================================================
   verify-two-gauges-core.js — the gate for ACTIVITY #89, THE TWO GAUGES
   ("Fixit's Fix-It Corner", 1.OA.D.8). Its OWN oracle: the design's
   27 equations are re-read here as text and solved by brute force with
   this file's own sweep; nothing expected is read off the core.
     · every equation, answer and blank kind as the design tables;
     · per level: answers distinct and never 0; socket left 5 / right 4;
       every blank kind present; the typical error ("add the two numbers
       you see", for a minuend "subtract them") lands ≥ 3 ticks away or
       off the dial;
     · at rest: no needle stands on the answer (a result blank keeps both
       needles on 0);
     · EVERY socket value of every round: the gadget runs iff the value is
       the answer; each side's reading and pin are the oracle's; an empty
       socket is not a try;
     · miss 1 the gap / pin hint; miss 2 the hint chosen by the blank,
       whose numbers — and whose rendered English — never contain the
       answer; the counting path: its LENGTH is the answer for a part, it
       ENDS on the answer for a sum / difference / start number, and it
       begins one tick after its start;
     · the prompt names the right kind of blank and never the answer;
     · the plan: a permutation, never the previous pass, never one blank
       kind 3 times running (10 000 seeds); the gadgets a fresh order each
       pass; the pictures labelled colour library pictures.
   Usage: node scripts/verify-two-gauges-core.js   (TG_CORE_DIR = a mutated copy)
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs'), vm = require('vm');
const DIR = process.env.TG_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'two-gauges-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };
const STR = (() => { const ctx = { window: {}, TwoGaugesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'two-gauges-activity.js'), 'utf8') + ';this.A=TwoGaugesActivity', ctx); return ctx.A.strings; })();
const EN = (k, a) => STR[k].en.replace(/\{(\w+)\}/g, (m, x) => a[x]);

/* ---- the design's tables (docs/activities-rebuild/designs/089-fix-it-corner.md §6), as text ---- */
const DESIGN = {
  '10': [['10 = 7 + □', 3], ['□ + 4 = 9', 5], ['6 + 3 = □', 9], ['10 − □ = 6', 4], ['□ − 3 = 5', 8], ['9 − 7 = □', 2], ['2 + □ = 8', 6], ['4 + 4 = □ + 1', 7], ['□ + 2 = 3', 1]],
  '20': [['8 + 5 = □', 13], ['9 + □ = 15', 6], ['13 − □ = 8', 5], ['□ + 5 = 12', 7], ['□ − 6 = 8', 14], ['6 + 6 = □ + 4', 8], ['16 − 7 = □', 9], ['18 = 7 + □', 11], ['10 + □ = 9 + 3', 2]],
  'big': [['40 + 30 = □', 70], ['90 = 50 + □', 40], ['□ + 20 = 80', 60], ['60 = 90 − □', 30], ['□ − 40 = 50', 90], ['35 + □ = 40', 5], ['62 + □ = 72', 10], ['30 + 40 = □ + 50', 20], ['25 + 10 + □ = 50', 15]]
};
const TOPS = { '10': 10, '20': 20, 'big': 100 }, VMAX = { '10': 10, '20': 20, 'big': 99 };
/* my own reader + sweep */
const sideOf = (t) => { const tok = t.trim().split(/\s+/), out = []; for (let i = 0; i < tok.length; i += 2) out.push({ n: tok[i], op: i ? tok[i - 1] : '+' }); return out; };
const mySweep = (terms, v, top) => { let s = 0; for (const t of terms) { const n = t.n === '□' ? v : +t.n; s += t.op === '−' ? -n : n; if (s < 0) return { r: 0, pin: 'zero' }; if (s > top) return { r: top, pin: 'stop' }; } return { r: s, pin: null }; };
const myKind = (L, R) => {
  const mineL = L.some(t => t.n === '□'), mine = mineL ? L : R, other = mineL ? R : L, i = mine.findIndex(t => t.n === '□');
  if (mine.length === 1) return 'result';
  if (other.length >= 2) return 'balance';
  if (mine[i].op === '−') return 'subtrahend';
  if (i === 0 && mine[1].op === '−') return 'minuend';
  return 'addend';
};

for (const lv of C.LEVELS) {
  const rows = DESIGN[lv], top = TOPS[lv];
  ok(C.ids(lv).length === rows.length, `${lv}: ${rows.length} rounds`);
  const answers = [], kinds = new Set(); let left = 0;
  rows.forEach(([eq, ans], i) => {
    const r = C.round(lv, i), tag = `${lv}#${i} ${eq}`, [Lt, Rt] = eq.split(' = '), L = sideOf(Lt), R = sideOf(Rt), kind = myKind(L, R), sockL = L.some(t => t.n === '□');
    ok(C.text(r) === eq, `${tag}: the core writes "${C.text(r)}"`);
    ok(r.kind === kind && r.socket.side === (sockL ? 'L' : 'R') && r.top === top, `${tag}: a ${kind} blank on the ${sockL ? 'left' : 'right'}`);
    /* the oracle: exactly one value balances */
    const hit = []; for (let v = 1; v <= VMAX[lv]; v++) { const a = mySweep(L, v, top), b = mySweep(R, v, top); if (!a.pin && !b.pin && a.r === b.r) hit.push(v); }
    ok(hit.length === 1 && hit[0] === ans && r.ans === ans && C.solve(r) === ans, `${tag}: only ${ans} balances (${hit})`);
    answers.push(ans); if (sockL) left++;
    kinds.add(kind === 'addend' ? ((sockL ? L : R).findIndex(t => t.n === '□') === 0 ? 'addend1' : 'addend2') : kind);
    /* at rest: no needle on the answer; a result blank keeps both on 0 */
    const rest = C.rest(r);
    ok(rest.L !== ans && rest.R !== ans, `${tag}: no needle rests on the answer (${rest.L}, ${rest.R})`);
    if (kind === 'result') ok(rest.L == null && rest.R == null, `${tag}: a result blank keeps both needles on 0`);
    else { const other = sockL ? R : L; ok(rest[sockL ? 'L' : 'R'] == null && rest[sockL ? 'R' : 'L'] === mySweep(other, 0, top).r, `${tag}: the other side rests on its reading`); }
    /* the typical error lands ≥ 3 away or off the dial (unknown PART rounds) */
    const vis = L.concat(R).filter(t => t.n !== '□').map(t => +t.n);
    if (kind === 'addend' || kind === 'subtrahend') { const e = vis.reduce((x, y) => x + y, 0); ok(Math.abs(e - ans) >= 3 || e > top, `${tag}: "add what you see" (${e}) lands far from ${ans}`); }
    if (kind === 'minuend') { const e = Math.abs(vis[0] - vis[1]); ok(Math.abs(e - ans) >= 3, `${tag}: "subtract what you see" (${e}) lands far from ${ans}`); }
    if (kind === 'balance') { const other = sockL ? R : L, e = mySweep(other, 0, top).r; ok(e !== ans, `${tag}: "the answer comes next" (${e}) leaves a gap`); }
    ok(ans >= 1, `${tag}: never 0`);
    /* every socket value */
    for (let v = 1; v <= VMAX[lv]; v++) {
      const st = C.newState(r); C.setValue(st, v); const res = C.pull(st), a = mySweep(L, v, top), b = mySweep(R, v, top), want = !a.pin && !b.pin && a.r === b.r;
      if (res.ok !== want || res.L.reading !== a.r || res.R.reading !== b.r || res.L.pin !== a.pin || res.R.pin !== b.pin) { ok(false, `${tag} value ${v}: runs=${res.ok} L=${res.L.reading}${res.L.pin || ''} R=${res.R.reading}${res.R.pin || ''} (oracle ${want} ${a.r}${a.pin || ''} ${b.r}${b.pin || ''})`); continue; }
      PASS++;
      if (!want) {
        ok(st.misses === 1 && C.hint(st).key === (a.pin || b.pin ? 'hPin' : 'hGap'), `${tag} value ${v}: miss 1 → ${a.pin || b.pin ? 'hPin' : 'hGap'}`);
        C.setValue(st, v === 1 ? 2 : v - 1); C.setValue(st, v); ok(C.hint(st) === null && st.run === null, `${tag} value ${v}: a new number takes the help away`);
        C.pull(st); const h = C.hint(st), txt = EN(h.key, h.args);
        ok(st.misses === 2 && h.key === { result: R.concat(L).some(t => t.op === '−') ? 'hSteps' : 'hOn', minuend: 'hOn', balance: 'hBoth', subtrahend: 'hSteps', addend: 'hSteps' }[kind], `${tag} value ${v}: miss 2 → the ${kind} hint (${h.key})`);
        ok(!Object.values(h.args).some(x => +x === ans) && !(txt.match(/\d+/g) || []).some(x => +x === ans), `${tag} value ${v}: the miss-2 hint never shows ${ans} ("${txt}")`);
      } else ok(st.done && C.pull(st) === null && C.setValue(st, v === 1 ? 2 : 1) === false, `${tag} value ${v}: runs, then locked`);
    }
    const st0 = C.newState(r); ok(C.pull(st0).reason === 'empty' && st0.misses === 0 && C.hint(st0).key === 'hEmpty', `${tag}: an empty socket is not a try`);
    ok(C.setValue(st0, 0) === false && C.setValue(st0, VMAX[lv] + 1) === false && st0.value === null, `${tag}: the socket takes only 1..${VMAX[lv]}`);
    /* the counting path */
    const cp = C.countPath(r), len = Math.abs(cp.to - cp.from), mine = sockL ? L : R, other = sockL ? R : L, ov = mySweep(other, 0, top).r;
    ok(cp.side === (sockL ? 'L' : 'R'), `${tag}: the path is on the socket's gauge`);
    const diff = kind === 'result' && other.some(t => t.op === '−');
    if (kind === 'addend' || kind === 'subtrahend' || kind === 'balance' || diff) ok(len === ans && !cp.endsOnAnswer, `${tag}: the path's LENGTH is the answer (${len})`);
    else ok(cp.to === ans && cp.endsOnAnswer, `${tag}: the path ends on the answer`);
    if (kind === 'balance') ok(cp.to === ov && cp.args.n === ov, `${tag}: the path climbs to the other side's ${ov}`);
    if (kind === 'subtrahend') ok(cp.from === ov && cp.to === +mine[0].n, `${tag}: the path counts from what is left (${ov}) up to the start`);
    if (kind === 'minuend') ok(cp.from === ov && cp.to === ov + +mine[1].n, `${tag}: the path climbs from what is left by the number taken away`);
    if (kind === 'result') { const a2 = +other[0].n, b2 = +other[1].n; if (diff) ok(cp.from === b2 && cp.to === a2, `${tag}: a difference counts UP from ${b2} to ${a2} (never back)`); else ok(cp.from === a2 && cp.to === a2 + b2, `${tag}: the path runs the second number from the first`); }
    /* the prompt */
    const p = C.prompt(r), want = r.panel === 'chain' ? 'pChain' : { result: other.length && other.some(t => t.op === '−') ? 'pDiff' : 'pSum', minuend: 'pMin', subtrahend: 'pSub', balance: 'pBal' }[kind];
    if (want) ok(p.key === want, `${tag}: the prompt is ${want} (${p.key})`);
    else ok(['pAdd1', 'pAdd2', 'pMake10'].includes(p.key), `${tag}: an addend prompt (${p.key})`);
    ok(!Object.values(p.args).some(x => +x === ans) && !(EN(p.key, p.args).match(/\d+/g) || []).some(x => +x === ans), `${tag}: the prompt never shows ${ans} ("${EN(p.key, p.args)}")`);
    if (p.key === 'pSub' || p.key === 'pDiff' || p.key === 'pMin') ok(L.concat(R).some(t => t.op === '−'), `${tag}: a take-away prompt only on a subtraction`);
    if (p.key === 'pSum' || p.key === 'pAdd1' || p.key === 'pAdd2' || p.key === 'pMake10') ok(!L.concat(R).some(t => t.op === '−'), `${tag}: an adding prompt only on an addition`);
  });
  ok(new Set(answers).size === answers.length, `${lv}: every answer differs (${answers})`);
  ok(left === 5 && rows.length - left === 4, `${lv}: the socket left 5 / right 4 (${left})`);
  ['result', 'subtrahend', 'minuend', 'balance', 'addend1', 'addend2'].forEach(k => ok(kinds.has(k), `${lv}: a ${k} blank`));
}
/* ---- the sweep's pins ---- */
{
  const r = C.round('10', 4), st = C.newState(r); C.setValue(st, 1); const res = C.pull(st);
  ok(res.L.pin === 'zero' && res.L.reading === 0 && C.hint(st).key === 'hPin', '1 − 3: the needle bonks the zero pin');
  const r2 = C.round('10', 6), s2 = C.newState(r2); C.setValue(s2, 10); const res2 = C.pull(s2);
  ok(res2.L.pin === 'stop' && res2.L.reading === 10, '2 + 10: the needle bonks the stop pin');
}
ok(Math.abs(C.angle(0, 20) - 135) < 1e-9 && Math.abs(C.angle(20, 20) - 405) < 1e-9 && Math.abs(C.angle(10, 20) - 270) < 1e-9, 'the dial: 0 at the lower left, the top at the lower right, half way straight up');
/* ---- the plan ---- */
for (const lv of C.LEVELS) {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; let prev = null, worst = 0, badG = 0;
  for (let k = 0; k < 10000; k++) {
    const p = C.plan(lv, rnd, prev), o = p.order;
    if (o.slice().sort((a, b) => a - b).join() !== C.ids(lv).join() || (prev && prev.join() === o.join())) { ok(false, `${lv} plan #${k}: a new permutation`); break; }
    if (p.gadgets.slice().sort((a, b) => a - b).join() !== C.DATA.GADGETS.map((g, i) => i).join()) badG++;
    let run = 0, last = null; o.forEach(i => { const kd = C.round(lv, i).kind; run = kd === last ? run + 1 : 1; last = kd; worst = Math.max(worst, run); });
    prev = o;
  }
  ok(worst <= 2, `${lv}: no blank kind 3 times running over 10 000 plans (worst ${worst})`);
  ok(badG === 0, `${lv}: every pass gets all nine gadgets`);
  { let s2 = 21; const r2 = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647; const seen = new Set(), firsts = new Set(); for (let k = 0; k < 200; k++) { const g = C.plan(lv, r2, null).gadgets; seen.add(g.join()); firsts.add(g[0]); }
    ok(seen.size >= 150 && firsts.size === 9, `${lv}: the gadgets reshuffle every pass (${seen.size} orders in 200, ${firsts.size} first gadgets) — the toaster is not always the same round`); }
  for (const sd of [3, 5, 9, 13]) { const mk = () => { let s = sd; return () => (s = (s * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(lv, mk(), null).order; ok(C.plan(lv, mk(), o1).order.join() !== o1.join(), `${lv} seed ${sd}: handed its own order, the plan gives another`); }
}
/* ---- the pictures ---- */
C.DATA.GADGETS.forEach(([dir, key]) => {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', dir.replace(/ /g, '-') + '.json'), 'utf8'));
  ok(!!(j.nouns && j.nouns[key]) && fs.existsSync(path.join(__dirname, '..', 'image-library-webp', 'themes', dir, key + '@2x.webp')), `the gadget ${dir}/${key} is a labelled colour picture`);
});
ok(C.DATA.GADGETS.length === 9 && new Set(C.DATA.GADGETS.map(g => g[1])).size === 9, 'nine different gadgets');
ok(C.locale('xx') === 'en' && C.LOCALES.length === 11 && C.levelOf('x') === '20', 'locales + defaults');
console.log(`verify-two-gauges-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
