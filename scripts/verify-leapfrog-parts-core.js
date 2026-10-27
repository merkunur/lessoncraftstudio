#!/usr/bin/env node
/* =====================================================================
   verify-leapfrog-parts-core.js — the build gate for ACTIVITY #135, The
   Leapfrog Parts (Add It Both Ways, 1.OA.B.3), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core's answers. Its own ground truth:
     · its own leapfrog (add a + b → b + a; take w − a = b → w − b = a)
       and its own cube colours (smaller part coral, larger teal; take:
       the part that stays, then the part taken away);
     · the old activity's pairs, read from the committed manifest (git
       HEAD) — every one must still appear in a level.
   Per round: six different cards, three pairs, every card exactly one
   twin, kinds never mixed, no doubles, no 0, within its range. For every
   ordered pair of cards: lay() reports twins iff the gate's leapfrog of
   the first equals the second, and the glowing cubes are exactly where
   the gate's colours disagree. The model: a pick only lifts (no leapfrog
   until a second card), a miss hops home, miss 2 keeps the help, a new
   pick takes it away, three twins → done, the minus never swaps, a twin
   plate can be taken apart. The plan: a fresh order every pass whose
   first round is never a talking round, and placement uniform over the
   15 pairings — the twin touches its card exactly as often as any other
   card (46.7 %). Then strings ×11, prose and the manifest.
   Usage: node scripts/verify-leapfrog-parts-core.js   (LP_CORE / LP_ACT / LP_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.LP_CORE || path.join(MINI, 'leapfrog-parts-core.js');
const ACTF = process.env.LP_ACT || path.join(MINI, 'leapfrog-parts-activity.js');
const MAN = process.env.LP_MANIFEST || path.join(MINI, 'match-pairs-activities.json');
const ID = 'match-pairs.add-it-both-ways.1-oa-b-3';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, LeapfrogPartsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.LeapfrogPartsActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };

/* ---------- the gate's own truth ---------- */
const myLeap = (c) => c.kind === 'take' ? { kind: 'take', w: c.w, a: c.b, b: c.a } : { kind: 'add', a: c.b, b: c.a };
const eq = (x, y) => x.kind === y.kind && x.a === y.a && x.b === y.b && (x.kind !== 'take' || x.w === y.w);
const tot = (c) => c.kind === 'take' ? c.w : c.a + c.b;
const myCubes = (c) => { const sm = Math.min(c.a, c.b), col = (n) => n === sm ? 's' : 'l', o = []; const [p, q] = c.kind === 'take' ? [c.b, c.a] : [c.a, c.b]; for (let i = 0; i < p; i++) o.push(col(p)); for (let i = 0; i < q; i++) o.push(col(q)); return o; };
const KEY = (c) => c.kind === 'take' ? c.w + '-' + c.a + '=' + c.b : c.a + '+' + c.b;
/* the old activity's pairs: every one must still be in a level */
const head = JSON.parse(execSync('git show HEAD:"mini tools/match-pairs-activities.json"', { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })).find(x => x.id === ID);
const OLD = new Set();
if (head.params && head.params.tasks) head.params.tasks.forEach(t => t.cards.forEach(c => { const m = String(c.display).match(/(\d+)\s*\+\s*(\d+)/); if (m) { const a = +m[1], b = +m[2]; OLD.add(Math.min(a, b) + '+' + Math.max(a, b)); } }));
const NOW = new Set(); ['10', '20'].forEach(n => C.rounds().forEach(r => C.round(n, 'add', r).cards.forEach(c => NOW.add(Math.min(c.a, c.b) + '+' + Math.max(c.a, c.b)))));
ok(OLD.size >= 10, `the old pairs were read (${OLD.size})`);
OLD.forEach(p => ok(NOW.has(p), `the old pair ${p} is still in a level`));

/* ---------- 1. the rounds ---------- */
for (const n of ['10', '20']) for (const k of ['add', 'take', 'mix']) for (const r of C.rounds()) {
  const rd = C.round(n, k, r), tag = `${n}/${k} r${r + 1}`, kind = k === 'mix' ? (r % 2 ? 'take' : 'add') : k;
  ok(rd.cards.length === 6 && rd.cards.every(c => c.kind === kind), `${tag}: six cards, all ${kind}`);
  ok(new Set(rd.cards.map(KEY)).size === 6, `${tag}: six different cards`);
  rd.cards.forEach((c, i) => {
    const twins = rd.cards.filter((d, j) => j !== i && eq(myLeap(c), d)).length;
    ok(twins === 1, `${tag}: ${KEY(c)} has exactly one twin (${twins})`);
    ok(c.a > 0 && c.b > 0 && c.a !== c.b, `${tag}: ${KEY(c)} — no 0, no double`);
    ok(kind === 'add' || c.a + c.b === c.w, `${tag}: ${KEY(c)} — the parts make the whole`);
    ok(tot(c) <= +n && Math.max(c.a, c.b) <= +n, `${tag}: ${KEY(c)} within ${n}`);
    ok(tot(myLeap(c)) === tot(c), `${tag}: the leapfrog keeps the total`);
    rd.cards.forEach((d, j) => {
      if (i === j) return;
      const got = C.compare(c, d), A = myCubes(myLeap(c)), B = myCubes(d), bad = [];
      for (let x = 0; x < Math.min(A.length, B.length); x++) if (A[x] !== B[x]) bad.push(x);
      ok(got.twins === eq(myLeap(c), d), `${tag}: ${KEY(c)} laid on ${KEY(d)} — twins ${got.twins}`);
      ok(got.sameTotal === (tot(c) === tot(d)) && got.over === A.length - B.length && got.bad.join() === bad.join(), `${tag}: ${KEY(c)} on ${KEY(d)} — the glow is exactly where the colours disagree (${got.bad} vs ${bad})`);
    });
  });
  ok(JSON.stringify(C.cubes(rd.cards[0])) === JSON.stringify(myCubes(rd.cards[0])), `${tag}: colour by size`);
}
/* most rounds: the total alone cannot find a twin */
{ let same = 0; for (const n of ['10', '20']) for (const r of C.rounds()) { const rd = C.round(n, 'add', r); if (new Set(rd.cards.map(tot)).size === 1) same++; } ok(same >= 8, `at least eight turnaround rounds have one total for all six cards (${same})`); }

/* ---------- 2. the model ---------- */
for (const n of ['10', '20']) for (const k of ['add', 'take']) for (const r of C.rounds()) {
  const tag = `${n}/${k} r${r + 1}`; let st = C.newState(n, k, r); const cs = st.rd.cards, tw = (i) => cs.findIndex((d, j) => j !== i && eq(myLeap(cs[i]), d));
  const wrong = cs.findIndex((d, j) => j !== 0 && j !== tw(0));
  ok(C.pick(st, 0).result === 'lift' && st.held === 0 && st.lay === null && st.help === null && st.misses.join() === '0,0,0,0,0,0', `${tag}: a pick only lifts the card — nothing is laid, nothing leapfrogs yet`);
  ok(C.pick(st, 0).result === 'drop' && st.held === null, `${tag}: the same card again puts it down`);
  C.pick(st, 0); let res = C.pick(st, wrong);
  ok(res.result === 'miss' && st.held === null && st.help === null && st.misses[0] === 1 && st.lay.to === wrong && C.hint(st) === (tot(cs[0]) === tot(cs[wrong]) ? 'missSame' : 'missTotal') + (k === 'take' ? 'Take' : ''), `${tag}: a wrong twin hops home, the hint names why`);
  C.pick(st, 0); res = C.pick(st, wrong);
  ok(res.result === 'miss' && st.held === 0 && st.help === 0 && C.hint(st) === 'missHelp', `${tag}: miss 2 with the same card keeps it lifted as the help`);
  ok(C.pick(st, 0).result === 'drop' && st.help === null, `${tag}: putting it down takes the help away`);
  C.pick(st, 0); res = C.pick(st, tw(0));
  ok(res.result === 'twins' && C.isMatched(st, 0) && C.isMatched(st, tw(0)) && st.held === null, `${tag}: the true twin settles`);
  ok(C.pick(st, 0).result === 'no', `${tag}: a found twin is not picked again`);
  ok(C.unmatch(st, cs[0].pair) === 'back' && !C.isMatched(st, 0), `${tag}: a twin plate can be taken apart`);
  cs.forEach((c, i) => { if (C.isMatched(st, i)) return; C.pick(st, i); C.pick(st, tw(i)); });
  ok(st.done && st.matched.length === 3, `${tag}: three twins → done`);
  ok(C.minusSwap(st, 0) === (k === 'take' ? 'refused' : 'no'), `${tag}: the minus never swaps`);
}

/* ---------- 3. the plan ---------- */
/* mulberry32: a linear congruential stream is too correlated for a 15-way pairing test */
let seed = 5; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const TOUCH = (p, q) => { const rp = Math.floor(p / 2), cp = p % 2, rq = Math.floor(q / 2), cq = q % 2; return Math.abs(rp - rq) + Math.abs(cp - cq) === 1; };
for (const n of ['10', '20']) for (const k of ['add', 'take', 'mix']) {
  let prev = null; const pairings = {}; let touch = 0, other = 0, tn = 0, on = 0;
  for (let p = 0; p < 1200; p++) {
    const P = C.plan(n, k, rnd, prev);
    ok(P.order.slice().sort((a, b) => a - b).join() === C.rounds().join(), `${n}/${k}: a pass is every round once`);
    if (prev) ok(P.order.join() !== prev.join(), `${n}/${k}: a fresh order every pass`);
    ok(!C.talking(n, C.kindOf(k, P.order[0]), P.order[0]), `${n}/${k}: a pass never opens on a talking round`);
    prev = P.order;
    P.order.forEach(r => {
      const rd = C.round(n, k, r, { order: P.orders[r] }), pos = {};
      rd.cards.forEach((c, i) => { (pos[c.pair] = pos[c.pair] || []).push(i); });
      const key = Object.values(pos).map(x => x.slice().sort().join('')).sort().join('|'); pairings[key] = (pairings[key] || 0) + 1;
      rd.cards.forEach((c, i) => rd.cards.forEach((d, j) => { if (i === j) return; const t = TOUCH(i, j); if (c.pair === d.pair) { tn++; if (t) touch++; } else { on++; if (t) other++; } }));
    });
  }
  const total = Object.values(pairings).reduce((a, b) => a + b, 0), shares = Object.values(pairings).map(x => x / total);
  ok(Object.keys(pairings).length === 15 && shares.every(s => Math.abs(s - 1 / 15) <= 0.01), `${n}/${k}: all 15 pairings of the six places, each 6.7 ± 1 % (${shares.map(s => (s * 100).toFixed(1)).join(' ')})`);
  ok(Math.abs(touch / tn - 0.467) <= 0.03 && Math.abs(other / on - 0.467) <= 0.03, `${n}/${k}: the twin touches its card as often as any other card does (${(touch / tn * 100).toFixed(1)} % vs ${(other / on * 100).toFixed(1)} %)`);
}

/* ---------- 4. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 25, 'strings: the set is there');
const HINTS = ['missSame', 'missTotal', 'missSameTake', 'missTotalTake', 'missHelp', 'hintMinus'];
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (HINTS.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit in a hint`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;]/.test(v), `strings.${k}.fr: a narrow space before : ! ? ;`);
  if (/^ok(Add|Take)$/.test(k)) ok(/\{a\}/.test(v) && /\{b\}/.test(v), `strings.${k}.${l}: names both parts`);
}
/* the success lines are true: fill them and check the arithmetic they print */
for (const l of LOCS) {
  const add = S.okAdd[l].replace(/\{a\}/g, 4).replace(/\{b\}/g, 7).replace(/\{s\}/g, 11), take = S.okTake[l].replace(/\{w\}/g, 11).replace(/\{a\}/g, 4).replace(/\{b\}/g, 7);
  ok(add.indexOf('4 + 7 = 7 + 4') >= 0 && add.indexOf('11') >= 0, `${l}: the turnaround line is true`);
  ok(take.indexOf('11 − 4 = 7') >= 0 && take.indexOf('11 − 7 = 4') >= 0, `${l}: the take-away line is true`);
}
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setNum', 'n10', 'n20', 'setCards', 'cAdd', 'cTake', 'cMix'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);

/* ---------- 5. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  ok(all.indexOf('4 + 7') >= 0 && all.indexOf('7 + 4') >= 0 && all.indexOf('11 − 4 = 7') >= 0 && all.indexOf('11 − 7 = 4') >= 0, `prose.${l}: quotes the twins the cards really show`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(row && row.tool === 'leapfrog-parts-activity', 'manifest: the row points at the leapfrog parts');
ok(row && row.params.rounds === 9 && row.params.num.join() === '10,20' && row.params.cards.join() === 'add,take,mix', 'manifest: params match the core');
['slug', 'page_title', 'page_intro', 'alignment', 'id', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
const HEADROWS = JSON.parse(execSync('git show HEAD:"mini tools/match-pairs-activities.json"', { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 }));
rows.forEach(x => { if (x.id !== ID) ok(JSON.stringify(x) === JSON.stringify(HEADROWS.find(y => y.id === x.id)), `manifest: the other row ${x.id} is untouched`); });

console.log(`verify-leapfrog-parts-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
