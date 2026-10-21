#!/usr/bin/env node
/* =====================================================================
   verify-nila-pond-core.js — the gate of ACTIVITY #70, THE IDEA UMBRELLA
   (Nila's Idea Pond, RI.K.2, 11 locales). Its own ground truth:
     1. the coverage — a hand-written table (never read off the core) of
        which pad each detail tag covers, per round; the big idea covers
        all three pads, the not-in-text idea none. For every round × locale
        × peg × umbrella count: hanging opens the SAME full canopy (no
        pre-Check tell); on Check the canopy pulls in to the table's reach,
        exactly the uncovered pads get wet, and only the big idea passes;
        reach width is monotone in the number of covered pads
     2. step 2 — reject rounds: one true-but-off-topic stranger drifts in
        under; supply rounds: one pad that belongs, one that does not, at
        the edge; EVERY under/out configuration graded by the gate's own
        rule (only the belonging pads under, nothing else)
     3. a pass — 12 distinct texts, never one animal three times in a row,
        never the last pass's order, never its last text first (2,000
        seeds); the big idea's peg balanced (3 per peg of 4, 4 per peg of
        3); the rail never lists the tags in one fixed order; with 3
        umbrellas the not-in-text idea stays home
     4. the tags — per locale the big idea is the longest tag in ≤ 4 and the
        shortest in ≤ 4 of 12 rounds (with 4 and with 3 umbrellas); one
        grammatical shape per tag set where it is checkable (en -ing first;
        fi a -minen noun; de verb last; fr/es/it/pt infinitive first)
     5. hints, the dimmed umbrella at miss 2, the target that moves after a
        third wrong umbrella (to the same animal), texts and strings × 11,
        no digit, fr narrow no-break spaces, pictures, floors, the manifest
        mirror, the frozen en..nl metadata, the new sv da no fi metadata
   Usage: node scripts/verify-nila-pond-core.js  (NP_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.NP_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'nila-pond-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, NilaPondCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'nila-pond-activity.js'), 'utf8') + '\nthis.__A = NilaPondActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const FROZEN = 'e0384a8e713b2138f36ce701beb0c239b834eb96';
/* the gate's own table: [pad covered by detail tag 1, pad covered by detail tag 2], step 2, animal */
const GT = {
  'bear-warm': [0, 2, 'reject', 'bear'], 'bear-eat': [0, 2, null, 'bear'], 'bear-cave': [0, 1, 'reject', 'bear'], 'bear-coat': [0, 2, null, 'bear'],
  'bee-honey': [0, 2, null, 'bee'], 'bee-flowers': [0, 2, 'reject', 'bee'], 'bee-hive': [1, 2, null, 'bee'], 'bee-wings': [1, 2, 'reject', 'bee'],
  'swan-swim': [0, 1, null, 'swan'], 'swan-lunch': [0, 1, 'reject', 'swan'], 'swan-nest': [0, 1, 'supply', 'swan'], 'swan-neck': [0, 1, null, 'swan']
};
const coverOf = (id, tag) => tag === 0 ? [0, 1, 2] : tag === 3 ? [] : [GT[id][tag - 1]];
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const picOk = (p) => p && fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]);
const seeded = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; };

/* 1 — the coverage */
is(C.IDS.length === 12 && Object.keys(GT).every(id => C.IDS.includes(id)), 'twelve texts, the gate table names them all');
for (const loc of LOCS) for (const id of C.IDS) {
  const r = C.round(loc, id);
  is(r.pads.length === 3 && r.tags.length === 4 && new Set(r.tags).size === 4 && r.lead && r.ok, `${loc} ${id}: lead, three pads, four distinct tags, a retelling`);
  is(r.group === GT[id][3] && r.step === GT[id][2], `${loc} ${id}: animal and step as the table says`);
  for (const n of [3, 4]) for (let peg = 0; peg < n; peg++) {
    const rail = C.deal(r, seeded(loc + id + n + peg), peg, n);
    is(rail.length === n && rail[peg] === 0 && new Set(rail).size === n && (n === 4 || rail.indexOf(3) < 0), `${loc} ${id} ${n}/${peg}: the big idea at its peg`);
    let full = null;
    for (let p = 0; p < n; p++) {
      const st = C.newState(r, rail); C.hang(st, p); const t = rail[p], cap = C.canopy(st);
      is(cap && cap.x === 0.5 && cap.w === C.FULL, `${loc} ${id}: tag ${t} opens the same full canopy before Check`);
      const res = C.check1(st), want = coverOf(id, t), wet = [0, 1, 2].filter(x => !want.includes(x));
      is(res.ok === (t === 0) && JSON.stringify(res.wet) === JSON.stringify(wet) && JSON.stringify(st.wet) === JSON.stringify(wet), `${loc} ${id} tag ${t}: wet ${res.wet} (want ${wet}), ok ${res.ok}`);
      const tr = C.canopy(st); const R = C.reach(want);
      if (t !== 0) { is(tr && Math.abs(tr.x - R.x) < 1e-9 && Math.abs(tr.w - R.w) < 1e-9, `${loc} ${id} tag ${t}: the true canopy after the rain`); C.fold(st); is(st.hung === null && C.canopy(st) === null, 'a wrong umbrella folds home'); }
    }
  }
}
{ const w0 = C.reach([]).w, w1 = [0, 1, 2].map(p => C.reach([p]).w), w3 = C.reach([0, 1, 2]).w; is(w0 < Math.min(...w1) && Math.max(...w1) < w3 && w3 === C.FULL, `reach monotone: ${w0} < ${w1} < ${w3}`);
  [0, 1, 2].forEach(p => is(Math.abs(C.reach([p]).x - C.PAD_X[p]) < 1e-9, `a one-pad canopy sits over pad ${p}`));
  is(Math.abs(C.reach([]).x - C.PAD_X[0]) > C.PAD_W / 2 && Math.abs(C.reach([]).x - C.PAD_X[1]) > C.PAD_W / 2, 'a not-in-text canopy sits over water, not a pad'); }

/* 2 — step 2 */
for (const loc of LOCS) for (const id of C.IDS) {
  const r = C.round(loc, id); if (!r.step) { is(r.extra.length === 0, `${loc} ${id}: no step 2 pads`); continue; }
  const pads = r.step === 'reject' ? [0, 1, 2, 3] : [0, 1, 2, 3, 4], belong = r.step === 'reject' ? [0, 1, 2] : [0, 1, 2, 3];
  is(r.step === 'reject' ? (r.extra.length === 1 && r.extra[0].belongs === false) : (r.extra.length === 2 && r.extra[0].belongs && !r.extra[1].belongs), `${loc} ${id}: the step-2 pads`);
  r.extra.forEach(x => is(x.text && !r.pads.includes(x.text) && x.text !== r.lead, `${loc} ${id}: a new sentence «${x.text}»`));
  const start = C.newState(r, [0, 1, 2, 3]); C.hang(start, 0); const ok1 = C.check1(start);
  is(ok1.ok && start.phase === 'step2' && JSON.stringify(start.under) === JSON.stringify(r.step === 'reject' ? [0, 1, 2, 3] : [0, 1, 2]), `${loc} ${id}: step 2 starts with the stranger under / the new pads out`);
  for (let mask = 0; mask < (1 << pads.length); mask++) {
    const st = C.newState(r, [0, 1, 2, 3]); C.hang(st, 0); C.check1(st);
    const wantUnder = pads.filter((p, i) => mask & (1 << i));
    for (const p of pads) if (wantUnder.includes(p) !== st.under.includes(p)) C.move(st, p);
    is(JSON.stringify(st.under) === JSON.stringify(wantUnder), `${loc} ${id}: moves reach ${wantUnder}`);
    const res = C.check2(st), right = JSON.stringify(wantUnder) === JSON.stringify(belong);
    is(res.ok === right && st.done === right, `${loc} ${id} under ${wantUnder}: ok ${res.ok}, want ${right}`);
    if (!right) is(st.under.every(p => belong.includes(p) || res.wrongUnder.includes(p)) && belong.every(p => st.under.includes(p)), `${loc} ${id}: a true pad left out drifts back under`);
  }
}

/* 3 — a pass, pegs, rails */
{
  let bad = 0, repeat = 0, rails = new Set(), pegBad = 0;
  for (let s = 0; s < 2000; s++) {
    const rnd = seeded('plan' + s), a = C.plan('en', rnd, null), b = C.plan('en', rnd, a);
    for (const o of [a, b]) { if (new Set(o).size !== 12) bad++; for (let i = 2; i < 12; i++) if (GT[o[i]][3] === GT[o[i - 1]][3] && GT[o[i]][3] === GT[o[i - 2]][3]) bad++; }
    if (a.join() === b.join() || a[11] === b[0]) repeat++;
    for (const n of [3, 4]) { const p = C.pegs(rnd, n, 12), cnt = Array(n).fill(0); p.forEach(x => cnt[x]++); if (!cnt.every(c => c === 12 / n)) pegBad++; }
    rails.add(C.deal(C.round('en', 'bear-warm'), rnd, 1, 4).join());
  }
  is(!bad, `2,000 passes: 12 distinct, never one animal three in a row (${bad} bad)`);
  is(!repeat, `the next pass is never the same order nor starts with the last text (${repeat})`);
  is(!pegBad, `the big idea's peg balanced every pass (${pegBad} bad)`);
  is(rails.size >= 6, `the other tags shuffle round the big idea (${rails.size} rails)`);
}

/* 4 — the tags */
const SHAPE = {
  en: t => /^\w+ing\b/.test(t), fi: t => /\S+minen(?!\p{L})/u.test(t), de: t => /n$/.test(t),
  fr: t => /^(se |s’|s')?\S+(er|ir|re|oir)\b/.test(t), es: t => /^\S*(ar|er|ir)(se)?\b/.test(t), it: t => /^\S+(are|ere|ire|rsi)\b/.test(t), pt: t => /^\S*(ar|er|ir)\b/.test(t)
};
for (const loc of LOCS) {
  let L4 = 0, S4 = 0, L3 = 0, S3 = 0;
  for (const id of C.IDS) {
    const l = C.round(loc, id).tags.map(s => s.length), t = l[0];
    if (t === Math.max(...l)) L4++; if (t === Math.min(...l)) S4++; if (t === Math.max(...l.slice(0, 3))) L3++; if (t === Math.min(...l.slice(0, 3))) S3++;
    if (SHAPE[loc]) C.round(loc, id).tags.forEach(x => is(SHAPE[loc](x), `${loc} ${id}: tag «${x}» has the round's one shape`));
  }
  is(L4 <= 4 && S4 <= 4 && L3 <= 4 && S3 <= 4, `${loc}: the big idea is longest ${L4}/${L3} and shortest ${S4}/${S3} of 12 (≤ 4 each)`);
}

/* 5 — hints, help, the moving target, texts, strings, pictures, floors, manifest */
{
  const r = C.round('en', 'bee-hive'), st = C.newState(r, [1, 0, 3, 2]);
  is(C.check1(st).reason === 'empty' && C.hint(st) === 'hintEmpty' && st.misses === 0, 'an empty Check is no miss');
  C.hang(st, 0); let res = C.check1(st); is(!res.ok && !res.swap && C.hint(st) === 'hintMiss1' && C.dimmed(st).length === 0, 'miss 1 → hintMiss1, nothing dimmed');
  C.fold(st); C.hang(st, 3); res = C.check1(st); is(!res.ok && !res.swap && C.hint(st) === 'hintMiss2' && JSON.stringify(C.dimmed(st)) === '[3]', 'miss 2 → hintMiss2, the not-in-text umbrella dims');
  C.fold(st); C.hang(st, 0); res = C.check1(st); is(res.swap === true, 'a third wrong umbrella moves the target');
  is(C.siblings('bee-hive').length === 3 && C.siblings('bee-hive').every(x => GT[x][3] === 'bee'), 'the target moves to another text about the same animal');
  const s3 = C.newState(r, [2, 0, 1]); C.hang(s3, 0); C.check1(s3); C.fold(s3); C.hang(s3, 2); C.check1(s3); is(JSON.stringify(C.dimmed(s3).sort()) === '[1,2]', 'with 3 umbrellas miss 2 dims the umbrellas already rained on');
  const s4 = C.newState(C.round('en', 'bear-warm'), [0, 1, 2, 3]); C.hang(s4, 0); C.check1(s4); C.move(s4, 0); C.check2(s4); is(C.hint(s4) === 'hintStep2' && C.prompt(s4) === 'instrStep2', 'step 2 miss → hintStep2');
  const s5 = C.newState(C.round('en', 'swan-nest'), [0, 1, 2, 3]); C.hang(s5, 0); C.check1(s5); is(C.prompt(s5) === 'instrSupply', 'supply → instrSupply'); C.move(s5, 4); C.check2(s5); is(C.hint(s5) === 'hintSupply', 'supply miss → hintSupply');
  for (const k of ['instr', 'instrStep2', 'instrSupply', 'hintEmpty', 'hintMiss1', 'hintMiss2', 'hintStep2', 'hintSupply', 'swapNote', 'check', 'ariaUmb', 'ariaPad', 'ariaUnder', 'ariaOut', 'ariaNila', 'ariaCloud', 'ariaHook', 'setRead', 'rSelf', 'rAloud', 'setUmb', 'u3', 'u4', 'title']) is(A.strings[k], `string ${k} exists`);
}
for (const loc of LOCS) {
  const strs = []; for (const id of C.IDS) { const r = C.round(loc, id); strs.push(r.lead, ...r.pads, ...r.tags, r.ok, ...r.extra.map(x => x.text)); }
  const all = strs.join(' ');
  is(!/\d/.test(all), `${loc}: no digits in the texts`);
  if (loc === 'fr') is(!/ [?!:;»]|« /.test(all), 'fr: narrow no-break spaces before ? ! : ; and inside « »');
  if (loc === 'en') for (const id of C.IDS) { const r = C.round('en', id); is(r.ok.startsWith('This text is about ' + r.tags[0] + '.'), `en ${id}: the retelling names the big idea`); }
}
for (const [k, v] of Object.entries(A.strings)) for (const loc of LOCS) { is(typeof v[loc] === 'string' && v[loc].trim(), `string ${k}: ${loc}`); if (loc === 'fr') is(!/ [?!:;»]|« /.test(v[loc]), `fr string ${k}: narrow no-break space`); }
for (const p of [C.NILA, ...Object.values(C.DATA.PICS)]) is(picOk(p), `${p} exists, colour, labelled`);
is(!/duck/.test(Object.values(C.DATA.PICS).join()), 'no duck picture (every library duck is a duckling)');
is(C.layout(704).pic >= 96 && C.layout(704).nila >= 96 && C.layout(360).pic >= 64 && C.layout(360).nila >= 64 && C.layout(288).nila >= 64, 'the floors: 96 at 704, 64 on a phone');
is(C.layout(704).pad >= 16 && C.layout(300).pad >= 14 && C.layout(300).tag >= 14, 'pad and tag text ≥ 14 px');
{
  const row = JSON.parse(fs.readFileSync(path.join(MT, 'nila-pond-activities.json'), 'utf8'))[0];
  const h = crypto.createHash('sha1').update(JSON.stringify(['slug', 'page_title', 'page_intro'].map(k => ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].map(l => row[k][l])))).digest('hex');
  is(h === FROZEN, `the frozen en..nl metadata is untouched (${h})`);
  is(row.tool === 'nila-pond-activity' && !row.params.rounds && !row.params.roundsL10n, 'the row runs the umbrella core, its params a mirror');
  for (const loc of LOCS) is(row.params.byLocale[loc] === C.IDS.length, `mirror ${loc}`);
  for (const loc of ['sv', 'da', 'no', 'fi']) is(row.slug[loc] && /^[a-z0-9-]+$/.test(row.slug[loc]) && row.page_title[loc] && row.page_intro[loc], `${loc}: slug, title, intro`);
}
console.log(`verify-nila-pond-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
