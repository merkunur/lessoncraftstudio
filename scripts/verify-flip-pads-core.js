#!/usr/bin/env node
/* =====================================================================
   verify-flip-pads-core.js — the build gate for ACTIVITY #141, The Flip
   Pads (Hopper's Lily Hops, 2.NBT.A.2), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · its own split-flap rule — one flap moves one digit, never carries;
       a leading flap cycles blank → 1…9 → blank and never shows a 0 —
       checked against the core for every number 1–1000, every flap,
       both directions;
     · its own reading of the design's 33 rounds: every chain arithmetic
       with its step, no 0, nothing above 1000, buds never the first pad,
       ≤ 6 of 16 buds on the last pad per set, the crossing buds (≥ 2
       flaps change) 5 / 5 / 10, the going-down rounds 2 / 2 / 3, the
       four-flap chains 1 / 0 / 1, the bank chains (start at their own
       step) and no others;
     · the old activity's 11 rounds (read from git): each pattern (5s
       from a multiple, 5s from a non-multiple, 10s across a hundred, 10s
       down, 100s, find the hop) still has a counterpart;
     · every verdict and its literal hint key, the leap meter's sign, the
       second bud arriving as a copy of the pad before it, the plan,
       strings ×11 (no digit in a hint, never "free", the true minus
       sign, the success lines true), prose and the manifest.
   Usage: node scripts/verify-flip-pads-core.js   (FP_CORE / FP_ACT / FP_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.FP_CORE || path.join(MINI, 'flip-pads-core.js');
const ACTF = process.env.FP_ACT || path.join(MINI, 'flip-pads-activity.js');
const MAN = process.env.FP_MANIFEST || path.join(MINI, 'skipcount-activities.json');
const ID = 'skipcount.fill.2-nbt-a-2', BEFORE = '5699a0d1';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, FlipPadsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.FlipPadsActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };
const MINUS = '−';

/* ---------- my own flaps ---------- */
const myFlaps = (n, p) => { const s = String(n).padStart(p, ' '); return s.split('').map(ch => ch === ' ' ? null : +ch); };
const myValue = (f) => +f.map(d => d == null ? 0 : d).join('');
const myFlip = (f, i, d) => {
  const g = f.slice(), leading = g.slice(0, i).every(x => x == null), last = i === g.length - 1;
  if (leading && !last) { const cyc = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9]; g[i] = cyc[(cyc.indexOf(g[i] === 0 ? null : g[i]) + d + 10) % 10]; }
  else g[i] = ((g[i] == null ? 0 : g[i]) + d + 10) % 10;
  return myValue(g);
};
for (const p of [3, 4]) for (let n = 1; n <= (p === 3 ? 999 : 1000); n++) {
  const f = C.flaps(n, p);
  if (n % 97 === 0 || n < 3) ok(JSON.stringify(f) === JSON.stringify(myFlaps(n, p)), `flaps(${n}, ${p})`);
  for (let i = 0; i < p; i++) for (const d of [1, -1]) {
    const g = C.flipDigits(f.slice(), i, d), v = C.valueOf(g), want = myFlip(f, i, d);
    if (v !== want) { ok(false, `flip ${n} flap ${i} by ${d}: ${v}, mine ${want}`); continue; }
    const first = g.findIndex(x => x != null);
    if (first < g.length - 1 && g[first] === 0) ok(false, `flip ${n} flap ${i}: a leading 0`);
    if (g.slice(first).some(x => x == null)) ok(false, `flip ${n} flap ${i}: a blank inside the number`);
    PASS++;
  }
}
{ const f = C.flaps(95, 3); for (let i = 0; i < 5; i++) C.flipDigits(f, 2, 1); ok(C.valueOf(f) === 90, 'no carry: 95 and five ones forward is 90'); }
{ const f = C.flaps(90, 3); C.flipDigits(f, 1, 1); ok(C.valueOf(f) === 0 || C.valueOf(f) === 100 ? C.valueOf(f) === 0 : false, 'a leading tens flap past 9 goes blank (no carry to the hundreds)'); }

/* ---------- 1. the rounds ---------- */
const DESIGN = { '5': { cross: 5, down: 2, four: 1 }, '2': { cross: 5, down: 2, four: 0 }, '25': { cross: 10, down: 3, four: 1 } };
const BANK = { '5': ['10,20,30,40,50'], '2': ['2,4,6,8,10', '3,6,9,12,15,18', '4,8,12,16,20'], '25': ['25,50,75,100,125', '50,100,150,200,250'] };
for (const set of ['5', '2', '25']) {
  const R = C.rounds(set, 'both'); let buds = 0, last = 0, cross = 0, down = 0, four = 0, firstHalf = 0;
  ok(R.length === 11 && R.filter(r => r.hop).length === 3, `set ${set}: 8 fill + 3 find-the-hop rounds`);
  R.forEach((rd, k) => {
    const tag = `set ${set} r${k + 1} [${rd.seq}]`, st = rd.seq[1] - rd.seq[0];
    ok(rd.seq.every((x, i) => i === 0 || x - rd.seq[i - 1] === st), `${tag}: arithmetic, step ${st}`);
    ok(rd.seq.every(x => x >= 1 && x <= 1000), `${tag}: no 0, nothing above 1000`);
    ok(C.places(rd) === (rd.seq.some(x => x >= 1000) ? 4 : 3), `${tag}: four flaps iff the chain reaches 1000`);
    if (rd.seq.some(x => x >= 1000)) four++;
    ok(C.fromBank(rd) === (BANK[set].indexOf(rd.seq.join()) >= 0), `${tag}: on the number line iff it starts at its own step`);
    if (rd.hop) { ok(!rd.buds && rd.seq.length === 4, `${tag}: a find-the-hop chain shows four pads`); return; }
    if (st < 0) down++;
    ok(rd.buds.length === 2 && rd.buds[0] >= 1 && rd.buds[1] > rd.buds[0] && rd.buds[1] < rd.seq.length, `${tag}: two buds, never the first pad`);
    rd.buds.forEach(b => {
      buds++; if (b === rd.seq.length - 1) last++; if (b < rd.seq.length / 2) firstHalf++;
      const a = myFlaps(rd.seq[b - 1], C.places(rd)), t = myFlaps(rd.seq[b], C.places(rd)), ch = a.filter((x, i) => x !== t[i]).length;
      if (ch >= 2) cross++;
    });
  });
  ok(buds === 16 && last <= 6, `set ${set}: ${last} of ${buds} buds on the last pad (≤ 6)`);
  ok(cross === DESIGN[set].cross, `set ${set}: ${cross} buds cross a ten or a hundred (design ${DESIGN[set].cross})`);
  ok(down === DESIGN[set].down, `set ${set}: ${down} going-down rounds (design ${DESIGN[set].down})`);
  ok(four === DESIGN[set].four, `set ${set}: ${four} four-flap chains (design ${DESIGN[set].four})`);
  ok(firstHalf >= 4, `set ${set}: ${firstHalf} buds sit in the first half of the chain`);
  const up = C.rounds(set, 'up'); ok(up.length >= 7 && up.every(r => r.hop || r.seq[1] > r.seq[0]) && up.length === R.length - DESIGN[set].down, `set ${set}: up only drops exactly the going-down fill rounds (${up.length} left)`);
}
/* the old activity's patterns */
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/skipcount-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const pat = (start, step, len) => { const seq = Array.from({ length: len }, (_, i) => start + i * step); if (step === 100) return '100s'; if (step === -10) return '10s down'; if (step === 10 && seq.some((x, i) => i && Math.floor(x / 100) !== Math.floor(seq[i - 1] / 100))) return '10s across a hundred'; if (step === 10) return '10s'; if (step === 5) return start % 5 ? '5s from a non-multiple' : '5s from a multiple'; return 'other'; };
const NEW5 = C.rounds('5', 'both');
head.params.rounds.forEach(r => {
  if (r.cog === 'whichstep') { ok(NEW5.some(n => n.hop && n.seq[1] - n.seq[0] === r.step), `old find-the-hop of ${r.step} has a counterpart`); return; }
  const want = pat(r.start, r.step, r.length);
  ok(NEW5.some(n => !n.hop && pat(n.seq[0], n.seq[1] - n.seq[0], n.seq.length) === want), `old ${r.id} (${want}) has a counterpart`);
});
ok(head.params.rounds.length === 11, 'the old activity had 11 rounds');

/* ---------- 2. the model ---------- */
const typeTo = (st, n) => { st.board = C.flaps(n, st.places); };
for (const set of ['5', '2', '25']) C.rounds(set, 'both').forEach((rd, k) => {
  const tag = `set ${set} r${k + 1}`, st = C.newState(set, 'both', k), step = rd.seq[1] - rd.seq[0];
  if (rd.hop) {
    let res = C.check(st); ok(res.result === 'empty' && C.hint(st) === 'hSign' && st.misses === 0, `${tag}: an untouched sign — no miss`);
    st.board = C.flaps(Math.abs(step), 3); st.sign = step < 0 ? 1 : -1;
    res = C.check(st); ok(res.result === 'sign' && C.hint(st) === 'missHopSign', `${tag}: the right size with the wrong sign`);
    st.board = C.flaps(Math.abs(step) + 1, 3); res = C.check(st); ok(res.result === 'hop' && st.help && C.hint(st) === 'miss2Hop', `${tag}: a wrong size — miss 2`);
    ok(C.flip(st, -1, 1) === 'sign' && !st.help, `${tag}: turning the sign takes the help away`);
    st.board = C.flaps(Math.abs(step), 3); st.sign = step < 0 ? -1 : 1; res = C.check(st); ok(res.result === 'ok' && st.done, `${tag}: ${step < 0 ? MINUS : '+'}${Math.abs(step)} — done`);
    return;
  }
  ok(C.valueOf(st.board) === rd.seq[rd.buds[0] - 1], `${tag}: the first bud arrives as a copy of the pad before it`);
  let res = C.check(st); ok(res.result === 'same' && C.hint(st) === (step < 0 ? 'hSameBack' : 'hSame') && st.misses === 0, `${tag}: Check on the copy — no miss`);
  const b1 = rd.buds[0], prev = rd.seq[b1 - 1], tgt = rd.seq[b1];
  /* one flap in the wrong direction (a going-down round flipped forward) */
  const wrong = step < 0 ? prev + 1 : prev + 1;
  typeTo(st, wrong); res = C.check(st); ok(res.result === 'meter' && res.made === wrong - prev && res.hop === step && C.hint(st) === 'missMeter', `${tag}: ${wrong} — the leap meter shows ${wrong - prev} against ${step}`);
  if (step < 0) { typeTo(st, prev - step); res = C.check(st); ok(res.result === 'meter' && res.made === -step, `${tag}: flipped forward in a going-down round — the meter shows +${-step}`); }
  else { typeTo(st, prev - 1); res = C.check(st); ok(res.result === 'meter' && res.made === -1, `${tag}: flipped back in an up round — the meter shows ${MINUS}1 (it keeps its sign)`); }
  typeTo(st, tgt + (tgt < 1000 ? 1 : -1)); res = C.check(st); ok(st.help && C.hint(st) === (step < 0 ? 'miss2Down' : 'miss2Up'), `${tag}: miss 2 — line them up`);
  ok(C.flip(st, st.places - 1, 1) === 'flipped' && !st.help, `${tag}: a flip takes the help away`);
  const ch = C.changing(st), a = myFlaps(prev, st.places), t = myFlaps(tgt, st.places);
  ok(ch.join() === a.map((x, i) => x !== t[i] ? i : -1).filter(i => i >= 0).join(), `${tag}: miss 2 rings the places that must change`);
  typeTo(st, tgt); res = C.check(st); ok(res.result === 'ok' && !res.round && !st.done, `${tag}: the first bud is right`);
  const b2 = rd.buds[1];
  ok(C.valueOf(st.board) === rd.seq[b2 - 1] && st.misses === 0 && st.filled.join() === String(b1), `${tag}: the second bud arrives as a copy of the pad before it (${rd.seq[b2 - 1]})`);
  typeTo(st, rd.seq[b2]); res = C.check(st); ok(res.result === 'ok' && res.round && st.done, `${tag}: the second bud — the round is done`);
  ok(C.flip(st, 0, 1) === 'no', `${tag}: nothing moves after success`);
});
{ const st = C.newState('5', 'both', 0); C.flip(st, 2, 1); C.flip(st, 2, 1); C.flip(st, 2, -1); ok(st.tally === 1, 'the tally counts the clacks forward and back'); }
{ const s = C.stripe({ seq: [63, 68, 73, 78, 83] }); ok(s.join() === '2', 'the column show stripes the ones for 5s from 63'); const s2 = C.stripe({ seq: [370, 380, 390, 400, 410] }); ok(s2.join() === '1', 'and the tens for 10s from 370'); }

/* ---------- 3. the plan ---------- */
let seed = 13; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
for (const set of ['5', '2', '25']) for (const dir of ['both', 'up']) {
  const n = C.rounds(set, dir).length, firsts = {}; let prev = null;
  for (let p = 0; p < 800; p++) {
    const o = C.plan(set, dir, rnd, prev).order;
    ok(o.slice().sort((a, b) => a - b).join() === Array.from({ length: n }, (_, i) => i).join(), `${set}/${dir}: a pass is every round once`);
    if (prev) ok(o.join() !== prev.join(), `${set}/${dir}: never the order of the pass before`);
    prev = o; firsts[o[0]] = 1;
  }
  ok(Object.keys(firsts).length === n, `${set}/${dir}: every round can open a pass`);
}
ok(C.setOf('25') === '25' && C.setOf('x') === '5' && C.dirOf('up') === 'up' && C.dirOf(undefined) === 'both', 'the settings pick the set and the direction');

/* ---------- 4. picture, strings ---------- */
ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', ACT.FROG + '@2x.webp')), 'the frog picture exists');
ok(ACT._signed(-5) === MINUS + '5' && ACT._signed(10) === '+10', 'the true minus sign');
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 34, 'strings: the set is there');
const NODIGIT = ['pUp', 'pDown', 'pHop', 'hSame', 'hSameBack', 'hSign', 'missMeter', 'miss2Up', 'miss2Down', 'missHop', 'missHopSign', 'miss2Hop'];
const NEED = { pUp: ['s'], pDown: ['s'], hSame: ['s'], hSameBack: ['s'], missMeter: ['hop', 'made'], miss2Up: ['prev', 's'], miss2Down: ['prev', 's'], miss2Hop: ['a', 'b'], okHop: ['prev', 'next', 's'], okList: ['list', 's'], okListBack: ['list', 's'], okSign: ['sign', 's'], aFwd: ['place'], aBack: ['place'] };
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (NODIGIT.indexOf(k) >= 0) ok(!/\d/.test(v.replace(/\{\w+\}/g, '')), `strings.${k}.${l}: no digit`);
  if (NEED[k]) ok(NEED[k].every(x => v.indexOf('{' + x + '}') >= 0), `strings.${k}.${l}: carries ${NEED[k].join(', ')}`);
  ok(!/\{(?!(s|hop|made|prev|next|list|sign|a|b|place|msg)\})/.test(v), `strings.${k}.${l}: no unknown placeholder`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (l === 'es' && /[!?]/.test(v)) ok(/[¡¿]/.test(v), `strings.${k}.es: opens its ¡ ¿`);
}
for (const l of LOCS) {
  const f = (k, a) => S[k][l].replace(/\{(\w+)\}/g, (m, x) => a[x]);
  const h = f('okHop', { prev: 90, next: 95, s: 5 }), li = f('okList', { list: '85, 90, 95, 100, 105', s: 5 }), sg = f('okSign', { sign: MINUS, s: 50 });
  ok(h.indexOf('90') < h.indexOf('95') && /5(?!\d)/.test(h.slice(h.indexOf('95') + 2)), `${l}: «${h}»`);
  ok(li.indexOf('85, 90, 95, 100, 105') >= 0 && sg.indexOf(MINUS + '50') >= 0, `${l}: the list and the sign lines are true`);
  ok(S.title[l] && S.pThousands[l] && S.pOnes[l], `${l}: titles and places`);
}
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setBy', 'by5', 'by2', 'by25', 'setDir', 'dBoth', 'dUp'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
ok(!/role', 'img'|role="img"/.test(src), 'no role="img" anywhere');

/* ---------- 5. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  ok(/\b95\b/.test(all) && /\b100\b/.test(all) && all.indexOf('10, 20, 30') >= 0 && all.indexOf('+25') >= 0 && all.indexOf(MINUS + '50') >= 0 && all.indexOf('+5') >= 0, `prose.${l}: quotes what the activity shows (95 → 100, +5, 10, 20, 30, +25, ${MINUS}50)`);
  ok(!/(?<![\p{L}\d])-\d/u.test(all), `prose.${l}: a minus is the true minus sign`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
ok(C.SETS['5'].some(r => r.seq.join() === '85,90,95,100,105') && C.SETS['25'].some(r => r.hop && r.seq[1] - r.seq[0] === -50) && C.SETS['25'].some(r => r.hop && r.seq[1] - r.seq[0] === 25), 'the prose examples are real rounds');
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(rows.length === 1 && row && row.tool === 'flip-pads-activity', 'manifest: the one row, tool flip-pads-activity');
ok(row && row.params.by.join() === '5,2,25' && row.params.dir.join() === 'both,up' && ['5', '2', '25'].every(k => row.params.rounds[k] === C.rounds(k, 'both').length), 'manifest: params match the core');
['id', 'alignment', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
['slug', 'page_title', 'page_intro'].forEach(k => Object.keys(head[k]).forEach(l => ok(row[k][l] === head[k][l], `manifest: ${k}.${l} frozen`)));
['da', 'no', 'fi'].forEach(l => ok(!head.slug[l] && /^[a-z0-9-]+$/.test(row.slug[l] || '') && row.page_title[l] && row.page_intro[l] && !FREE.test(row.page_title[l] + row.page_intro[l]), `manifest: ${l} gets a new slug, title and intro`));
ok(LOCS.every(l => row.slug[l]), 'manifest: the row ships in all 11 locales');

console.log(`verify-flip-pads-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
