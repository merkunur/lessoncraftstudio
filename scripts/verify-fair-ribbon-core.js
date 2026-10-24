#!/usr/bin/env node
/* =====================================================================
   verify-fair-ribbon-core.js — the gate for ACTIVITY #91, THE FAIR RIBBON
   ("The Sharing Jar — Make It Fair", 1.OA.D.8). Its OWN oracle: the
   design's round tables are re-read here as text and solved with this
   file's own arithmetic; nothing expected is read off the core.
     · every round as the design: the kind, the two jars, the ribbon, the
       answer; every jar ≤ 10 (clear) / ≤ 20 (frosted), never 0; Clear has
       ≥ 2 answers ≥ 8 and Frosted ≥ 3 answers ≥ 11 (no dead tile row); no
       answer > 2× per level; the answer is never a jar's own number in
       MORE / HOW MANY MORE / PUT BACK; in GIVE BACK Pim's jar is 2s − r;
     · EVERY number 1..top in EVERY round: fair iff it is the answer; the
       jars after the move, counted bead by bead (the moved beads, the gap,
       the beads past the ribbon, the start tint, the overlap); the beads a
       second miss numbers are exactly |n − answer| — or, where they cannot
       be (more than can move), the hint says so instead of "count";
     · choose / check / hint: no number → hNone and no miss; a miss counts,
       the second shows; the round is done only on the answer;
     · the plan: a permutation, never the previous pass, no equal answers
       side by side, every kind in the first five (all), the swap mask 4/9
       (3/7); the friends are labelled colour library pictures.
   Usage: node scripts/verify-fair-ribbon-core.js   (FR_CORE_DIR = a mutated copy)
   ===================================================================== */
'use strict';
const path = require('path'), fs = require('fs');
const C = require(path.join(process.env.FR_CORE_DIR || path.join(__dirname, '..', 'mini tools'), 'fair-ribbon-core.js'));
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('   FAIL: ' + m); } };

/* ---- the design's tables (docs/activities-rebuild/designs/091-sharing-jar.md §6), as text ---- */
const DESIGN = {
  clear: {
    all: 'MORE 5/3 · HMM 6/2 · GIVE 7>4 · PUT 6>4 · START +4=7 · MORE 9/4 · HMM 10/2 · PUT 8>2 · MORE 10/1',
    more: 'MORE 5/3 · HMM 6/2 · MORE 9/4 · HMM 10/2 · MORE 10/1 · MORE 7/4 · HMM 9/5'
  },
  frosted: {
    all: 'MORE 8/5 · HMM 12/8 · PUT 9>5 · MORE 18/6 · HMM 19/8 · GIVE 12>4 · PUT 17>3 · START +6=13 · MORE 15/9',
    more: 'MORE 8/5 · HMM 12/8 · MORE 18/6 · HMM 19/8 · MORE 15/9 · MORE 16/9 · HMM 20/7'
  }
};
const ANSWERS = { clear: { all: '2 4 3 2 3 5 8 6 9', more: '2 4 5 8 9 3 4' }, frosted: { all: '3 4 4 12 11 8 14 7 6', more: '3 4 12 11 6 7 13' } };
const TOP = { clear: 10, frosted: 20 };
/* solve a design story: the jars before, the ribbon, the answer */
function solve(t) {
  let m;
  if ((m = /^MORE (\d+)\/(\d+)$/.exec(t))) return { kind: 'more', pim: +m[1], bo: +m[2], ribbon: +m[1], ans: m[1] - m[2] };
  if ((m = /^HMM (\d+)\/(\d+)$/.exec(t))) return { kind: 'hmm', pim: +m[1], bo: +m[2], ribbon: +m[2], ans: m[1] - m[2] };
  if ((m = /^GIVE (\d+)>(\d+)$/.exec(t))) return { kind: 'give', pim: 2 * m[1] - m[2], bo: +m[2], ribbon: +m[1], ans: m[1] - m[2], mark: +m[1] };
  if ((m = /^PUT (\d+)>(\d+)$/.exec(t))) return { kind: 'put', pim: +m[1], bo: +m[2], ribbon: +m[2], ans: m[1] - m[2] };
  if ((m = /^START \+(\d+)=(\d+)$/.exec(t))) return { kind: 'start', pim: +m[2], bo: +m[2], ribbon: +m[2], fresh: +m[1], ans: m[2] - m[1] };
  throw new Error('bad design story ' + t);
}
const count = (arr, k) => arr.filter(x => x === k).length;

for (const lv of ['clear', 'frosted']) for (const sy of ['all', 'more']) {
  const D = DESIGN[lv][sy].split(' · ').map(solve), ids = C.ids(lv, sy), tag = lv + '/' + sy;
  ok(ids.length === D.length && ids.join() === D.map((_, i) => i).join(), `${tag}: ${D.length} rounds`);
  ok(D.map(d => d.ans).join(' ') === ANSWERS[lv][sy], `${tag}: the design answers ${ANSWERS[lv][sy]}`);
  const ans = {};
  D.forEach((d, i) => {
    const r = C.round(lv, sy, i), w = `${tag} #${i} ${d.kind}`;
    ok(r.kind === d.kind && r.pim === d.pim && r.bo === d.bo && r.ribbon === d.ribbon && r.ans === d.ans && r.top === TOP[lv], `${w}: jars ${d.pim}/${d.bo}, ribbon ${d.ribbon}, answer ${d.ans} (core ${r.pim}/${r.bo}/${r.ribbon}/${r.ans})`);
    ok(d.kind !== 'give' ? r.mark == null : r.mark === d.mark, `${w}: the pencil mark only in GIVE BACK, at Bo's old number`);
    ok(d.kind !== 'start' || r.fresh === d.fresh, `${w}: the new beads`);
    ok(d.pim >= 1 && d.bo >= 1 && d.pim <= TOP[lv] && d.bo <= TOP[lv] && d.ans >= 1, `${w}: jars 1..${TOP[lv]}, answer ≥ 1 (never 0)`);
    if (['more', 'hmm', 'put'].includes(d.kind)) ok(d.ans !== d.pim && d.ans !== d.bo, `${w}: the answer is not a number on either jar`);
    ans[d.ans] = (ans[d.ans] || 0) + 1;
    /* EVERY number on EVERY round */
    for (let n = 1; n <= TOP[lv]; n++) {
      const a = C.act(r, n), wn = `${w} n=${n}`, diff = Math.abs(n - d.ans), lim = C.CAP[lv] + C.ROOM;
      ok(a.diff === diff, `${wn}: diff ${diff}`);
      ok((a.result === 'fair') === (n === d.ans), `${wn}: fair iff n = ${d.ans}`);
      if (n !== d.ans) ok(a.result === (d.kind === 'start' ? (n < d.ans ? 'gap' : 'overlap') : (n < d.ans ? 'short' : 'over')), `${wn}: result ${a.result}`);
      let P = [], B = [], lifted = 0;   /* my own bead count */
      if (d.kind === 'more' || d.kind === 'give') {
        const g = d.kind === 'give' ? Math.min(n, d.pim) : n;
        P = Array(d.pim - (d.kind === 'give' ? g : 0)).fill('b');
        B = Array(d.bo).fill('b'); for (let k = 1; k <= g; k++) B.push(d.bo + k > d.ribbon ? 'over' : 'mv');
        for (let k = d.bo + g; k < d.ribbon; k++) B.push('dash');
      } else if (d.kind === 'hmm' || d.kind === 'put') {
        lifted = Math.min(n, d.pim); const left = d.pim - lifted;
        for (let k = 1; k <= left; k++) P.push(k > d.ribbon ? 'still' : 'b');
        for (let k = left; k < d.ribbon; k++) P.push('dash');
        B = Array(d.bo).fill('b');
      } else {
        P = Array(d.pim).fill('b'); const startTop = d.bo - d.fresh;
        for (let k = 0; k < d.bo; k++) B.push(k < n && k >= startTop ? 'over' : k < n ? 'st' : k >= startTop ? 'new' : 'gapb');
        if (n >= d.ans) B = B.map(x => x === 'gapb' ? 'b' : x);
      }
      P = P.slice(0, lim); B = B.slice(0, lim);
      ok(JSON.stringify(a.P) === JSON.stringify(P) && JSON.stringify(a.B) === JSON.stringify(B), `${wn}: the jars bead by bead (Pim ${P.join('')} | Bo ${B.join('')}; core ${a.P.join('')} | ${a.B.join('')})`);
      ok((a.lifted || 0) === lifted, `${wn}: ${lifted} beads lifted`);
      if (n === d.ans) {
        const pimN = P.filter(x => x !== 'dash').length, boN = B.filter(x => x !== 'dash').length;
        ok(count(P.concat(B), 'over') + count(P.concat(B), 'still') + count(P.concat(B), 'dash') + count(P.concat(B), 'gapb') === 0, `${wn}: fair leaves nothing marked`);
        if (d.kind !== 'start') ok(pimN === d.ribbon || boN === d.ribbon, `${wn}: fair stops on the ribbon`);
        if (d.kind === 'more' || d.kind === 'give') ok(boN === d.ribbon && (d.kind === 'more' ? pimN === d.ribbon : pimN === d.ribbon), `${wn}: both jars at the ribbon`);
        if (d.kind === 'hmm' || d.kind === 'put') ok(pimN === d.bo, `${wn}: Pim now has as many as Bo`);
      } else {
        /* the second miss: the marked beads are exactly the difference, or the hint says it is too far */
        const want = (() => { const sh = n < d.ans; if (d.kind === 'hmm' || d.kind === 'put') return sh ? ['still'] : ['dash']; return sh ? ['dash', 'gapb'] : ['over', 'still']; })();
        const marks = P.concat(B).filter(x => want.includes(x)).length;
        ok(a.mark === (want.includes('dash') ? 'dash' : 'glow'), `${wn}: the mark is ${want.includes('dash') ? 'dashed' : 'glowing'}`);
        ok(a.fits === (marks === diff), `${wn}: ${marks} marked beads for a difference of ${diff} → fits ${marks === diff}`);
        const w1 = [1, 2, 3].find(x => x !== n && x !== d.ans), st = C.newState(r); C.choose(st, w1); C.check(st); C.choose(st, n); C.check(st);
        ok(st.show === 2 && C.hint(st) === (marks === diff ? (want.includes('dash') ? 'hCountDash' : 'hCountGlow') : 'hTooFar'), `${wn}: miss 2 hint ${C.hint(st)}`);
      }
    }
    /* the state */
    const st = C.newState(r);
    ok(C.check(st).result === 'none' && st.misses === 0 && C.hint(st) === 'hNone', `${w}: Check with no number → hNone, no miss`);
    ok(!C.choose(st, 0) && !C.choose(st, TOP[lv] + 1) && st.chosen == null, `${w}: no 0, nothing past the top`);
    const wrong = d.ans === 1 ? 2 : d.ans - 1;
    C.choose(st, wrong); C.check(st);
    ok(st.misses === 1 && st.show === 1 && !st.done, `${w}: a wrong number is a miss`);
    const h1 = C.hint(st), exp1 = d.kind === 'start' ? 'hStart' : (d.kind === 'more' || d.kind === 'give') ? 'hGap' : 'hAbove';
    ok(h1 === exp1, `${w}: miss 1 (too few) hint ${exp1} (got ${h1})`);
    ok(!C.choose(st, wrong), `${w}: the same tile again changes nothing`);
    C.choose(st, d.ans); ok(st.show === 0 && st.acted == null, `${w}: a new number takes the showing away`);
    C.check(st); ok(st.done && C.hint(st) == null, `${w}: the answer finishes the round`);
    ok(!C.choose(st, wrong) && C.check(st) == null, `${w}: a finished round takes no more`);
    if (d.kind !== 'start' && d.ans < TOP[lv]) { const s2 = C.newState(r); C.choose(s2, d.ans + 1); C.check(s2); ok(C.hint(s2) === 'hOver', `${w}: miss 1 (too many) → hOver`); }
    /* mood: the fuller friend glows; an overshoot quiets Pim; fair: both, leaning in */
    ok(JSON.stringify(C.mood(r, 'fair')) === JSON.stringify({ pim: 'glow', bo: 'glow', lean: true }) && C.mood(r, 'over').pim === 'quiet' && C.mood(r, 'over').bo === 'glow', `${w}: mood`);
    ok(C.layout(700).wide && !C.layout(500).wide && C.layout(300).tiny && !C.layout(400).tiny, 'layout breakpoints');
    /* rest: the jars before anything moves */
    const rs = C.rest(r);
    ok(rs.P.length === d.pim && rs.B.length === d.bo && count(rs.B, 'new') === (d.kind === 'start' ? d.fresh : 0) && rs.B.slice(d.bo - (d.fresh || 0)).every(x => x === (d.kind === 'start' ? 'new' : 'b')), `${w}: at rest, Pim ${d.pim}, Bo ${d.bo}${d.kind === 'start' ? ', the top ' + d.fresh + ' new' : ''}`);
  });
  ok(Object.values(ans).every(c => c <= 2), `${tag}: no answer more than twice (${JSON.stringify(ans)})`);
  if (sy === 'all') {
    const A = D.map(d => d.ans);
    ok(lv === 'clear' ? A.filter(x => x >= 8).length >= 2 : A.filter(x => x >= 11).length >= 3, `${tag}: no dead tile row`);
    ok(new Set(D.map(d => d.kind)).size === 5, `${tag}: all five kinds`);
  }
  /* the plan */
  let s1 = 11; const r1 = () => (s1 = (s1 * 16807) % 2147483647) / 2147483647; let pv = null, swapLeft = 0, runs = 0;
  for (let k = 0; k < 3000; k++) {
    const p = C.plan(lv, sy, r1, pv), o = p.order;
    if (o.slice().sort((a, b) => a - b).join() !== ids.join() || (pv && pv.join() === o.join())) { ok(false, `${tag} plan #${k}: a new permutation`); break; }
    for (let q = 1; q < o.length; q++) if (D[o[q]].ans === D[o[q - 1]].ans) { ok(false, `${tag} plan #${k}: equal answers side by side`); break; }
    if (sy === 'all' && new Set(o.slice(0, 5).map(i => D[i].kind)).size !== 5) ok(false, `${tag} plan #${k}: every kind in the first five`);
    const sw = p.swap.filter(Boolean).length; if (sw !== Math.floor((ids.length - 1) / 2)) ok(false, `${tag} plan #${k}: the swap mask ${sw}`);
    swapLeft += p.swap[0] ? 1 : 0; runs++; pv = o;
  }
  ok(swapLeft / runs > 0.3 && swapLeft / runs < 0.6, `${tag}: the first round is swapped ${(swapLeft / runs * 100).toFixed(0)}% of passes`);
  const orders = new Set(); let s2 = 5; const r2 = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647;
  for (let k = 0; k < 200; k++) orders.add(C.plan(lv, sy, r2, null).order.join());
  ok(orders.size > 100, `${tag}: the plan really reshuffles (${orders.size} different orders in 200)`);
  for (const sd of [3, 5, 9, 13]) { const mk = () => { let q = sd; return () => (q = (q * 16807) % 2147483647) / 2147483647; }; const o1 = C.plan(lv, sy, mk(), null).order; ok(C.plan(lv, sy, mk(), o1).order.join() !== o1.join(), `${tag} seed ${sd}: handed its own order, the plan gives another`); }
}
/* ---- the friends ---- */
for (const [who, [dir, key]] of Object.entries(C.DATA.FRIENDS)) {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'pictures', dir.replace(/ /g, '-') + '.json'), 'utf8'));
  ok(!!(j.nouns && j.nouns[key]) && fs.existsSync(path.join(__dirname, '..', 'image-library-webp', 'themes', dir, key + '@2x.webp')) && !/bw(\s+\d+)?$/i.test(dir), `${who} = ${dir}/${key}, a labelled colour picture`);
}
ok(C.DATA.FRIENDS.pim[1] === 'hedgehog' && C.DATA.FRIENDS.bo[1] === 'mouse', 'Pim is the hedgehog, Bo the mouse');
ok(C.locale('xx') === 'en' && C.LOCALES.length === 11 && C.levelOf('x') === 'clear' && C.storyOf('x') === 'all', 'locales + defaults');
console.log(`verify-fair-ribbon-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
