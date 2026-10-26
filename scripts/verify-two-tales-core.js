#!/usr/bin/env node
/* =====================================================================
   verify-two-tales-core.js — the gate for ACTIVITY #120, The Plank
   Across Two Books (Two Moons, RL.1.9; all 11 locales). Its OWN ground
   truth: which experiences each tale has (written out here, independent
   of the core), and so where every plank of every round belongs.
     (a) the tales: nine per locale, three pages and two pages; every
         experience of a tale is proved on a page in both page counts; the
         "lost" / "scared" half glows on the page before; Kiki's lost ball
         glows and never holds; no caption copies a plank's words; every
         picture exists in a colour theme;
     (b) the rounds: What is the same? — exactly one shared experience and
         it is the answer; only one? — the answer in exactly one tale, the
         lure in both, the decoy in neither; Sort — one plank for each of
         across / gold / silver / basket; the robin and the squirrel tales
         (twin bird pictures) never meet;
     (c) the planks: for EVERY round, plank and place — only the truth
         solves (what is the same: across; only one: its own book; sort: all
         four); a wrong plank comes back, a right one stays; an empty Check
         and an unfinished Sort are no miss; the moon dots from miss 2 show
         each book's evidence; a new move takes them away;
     (d) the bots: the answer's tray slot 3 / 3 / 3; the answer the longest
         label in ≤ 45 % of rounds, per locale; no experience is the answer
         in more than half of the rounds that offer it; the gold tale varies;
     (e) the plan: a fresh order, never the same two tales twice in a row;
     (f) the strings ×11 and the manifest row.
   Usage: node scripts/verify-two-tales-core.js   (env TT_CORE_DIR / TT_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.TT_CORE_DIR || MT, ACT_DIR = process.env.TT_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'two-tales-core.js'));
const ACT = (() => { const ctx = { window: {}, TwoTalesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'two-tales-activity.js'), 'utf8') + '\n;this.__A = window.TwoTalesActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'], MODES = ['same', 'only', 'sort'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const rnd = (() => { let s = 13; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();

/* ---------------- this gate's truth ---------------- */
const TAGS = { fox: ['LOST_FOUND', 'TRIED_AGAIN'], bunny: ['LOST_FOUND', 'GOT_HELP'], mouse: ['SCARED_SAFE', 'GOT_HELP'], bird: ['TRIED_AGAIN', 'FIXED_IT'], frog: ['SCARED_SAFE', 'FIXED_IT'],
  duck: ['SHARED', 'GOT_HELP'], hedgehog: ['TRIED_AGAIN', 'SHARED'], squirrel: ['LOST_FOUND', 'SHARED'], cat: ['SHARED'] };
/* where each experience is proved (page numbers from 1): 3 pages, then 2 pages */
const PROOF = { fox: { LOST_FOUND: [3, 2], TRIED_AGAIN: [2, 1] }, bunny: { LOST_FOUND: [3, 2], GOT_HELP: [3, 2] }, mouse: { SCARED_SAFE: [3, 2], GOT_HELP: [2, 1] }, bird: { TRIED_AGAIN: [2, 1], FIXED_IT: [3, 2] },
  frog: { SCARED_SAFE: [3, 2], FIXED_IT: [2, 1] }, duck: { SHARED: [2, 1], GOT_HELP: [3, 2] }, hedgehog: { TRIED_AGAIN: [2, 1], SHARED: [3, 2] }, squirrel: { LOST_FOUND: [2, 1], SHARED: [3, 2] }, cat: { SHARED: [3, 2] } };
const ALLTAGS = ['LOST_FOUND', 'GOT_HELP', 'TRIED_AGAIN', 'SHARED', 'SCARED_SAFE', 'FIXED_IT'];
const has = (tale, tag) => TAGS[tale].indexOf(tag) >= 0;
const truth = (tag, g, s) => has(g, tag) && has(s, tag) ? 'across' : has(g, tag) ? 'gold' : has(s, tag) ? 'silver' : 'basket';
const R = (mode, r) => C.DATA.ROUNDS[mode][r];

/* ---------------- (a) the tales ---------------- */
is(Object.keys(C.DATA.TALES).sort().join() === Object.keys(TAGS).sort().join(), 'nine tales, the gate\'s');
for (const id of Object.keys(TAGS)) {
  const m = C.DATA.TALES[id];
  is(m.tags.slice().sort().join() === TAGS[id].slice().sort().join(), `${id}: its experiences are the gate's (${TAGS[id]})`);
  for (const tag of TAGS[id]) {
    is(m.proof3[tag] === PROOF[id][tag][0] - 1 && m.proof2[tag] === PROOF[id][tag][1] - 1, `${id} ${tag}: proved on page ${PROOF[id][tag][0]} of 3 and page ${PROOF[id][tag][1]} of 2`);
    if (tag === 'LOST_FOUND' || tag === 'SCARED_SAFE') { const g = m.glow3[tag]; is(g == null || g <= m.proof3[tag], `${id} ${tag}: the first half glows no later than the proof`); }
  }
  ALLTAGS.filter(t => !has(id, t)).forEach(t => is(m.proof3[t] == null && m.proof2[t] == null, `${id}: no proof for ${t}, which it does not have`));
  m.pics3.concat(m.pics2).forEach(p => is(fs.existsSync(path.join(IMG, p + '@2x.webp')) && !BW.test(p.split('/')[0]), `${id}: picture ${p} exists in a colour theme`));
  is(m.pics3.length === 3 && m.pics2.length === 2, `${id}: a picture for every page`);
}
is(C.DATA.TALES.cat.glow3.LOST_FOUND === 0 && C.DATA.TALES.cat.proof3.LOST_FOUND == null && C.DATA.TALES.cat.glow2.LOST_FOUND === 0, 'Kiki: her lost ball glows on page one and never holds a plank');
for (const loc of ALL) {
  const labels = ALLTAGS.map(t => C.label(loc, t));
  is(labels.every(Boolean) && new Set(labels).size === 6, `${loc}: six plank labels`);
  for (const id of Object.keys(TAGS)) for (const pages of [3, 2]) {
    const t = C.tale(loc, id, pages);
    is(t.name && t.pages.length === pages && t.pages.every(p => p.caption && p.caption.length > 8), `${loc} ${id} (${pages} pages): a name and a caption on every page`);
    t.pages.forEach((p, i) => labels.forEach(lab => is(p.caption.toLowerCase().indexOf(lab.toLowerCase()) < 0, `${loc} ${id} p${i + 1}: the caption does not copy the plank «${lab}»`)));
    if (loc === 'fr' || loc === 'it') is(!t.pages.some(p => /'/.test(p.caption)) && !/'/.test(t.name), `${loc} ${id}: ’ in the text`);
    if (loc === 'fr') is(!t.pages.some(p => / [:!?;»]/.test(p.caption)), `fr ${id}: narrow spaces`);
  }
}

/* ---------------- (b) the rounds ---------------- */
is(C.DATA.ROUNDS.same.length === 9 && C.DATA.ROUNDS.only.length === 9 && C.DATA.ROUNDS.sort.length === 7, '9 / 9 / 7 rounds');
C.DATA.ROUNDS.same.forEach((x, i) => {
  const shared = ALLTAGS.filter(t => has(x.goldTale, t) && has(x.silverTale, t));
  is(shared.length === 1 && shared[0] === x.answer, `same ${i + 1}: exactly one shared experience, and it is the answer (${shared})`);
  is(x.others.length === 2 && x.others.every(t => truth(t, x.goldTale, x.silverTale) !== 'across'), `same ${i + 1}: the other planks are not shared`);
});
C.DATA.ROUNDS.only.forEach((x, i) => {
  const t = truth(x.answer, x.goldTale, x.silverTale);
  is(t === 'gold' || t === 'silver', `only ${i + 1}: the answer is in exactly one tale (${t})`);
  is(truth(x.others[0], x.goldTale, x.silverTale) === 'across' && truth(x.others[1], x.goldTale, x.silverTale) === 'basket', `only ${i + 1}: the lure in both, the decoy in neither`);
});
C.DATA.ROUNDS.sort.forEach((x, i) => {
  is(truth(x.across, x.goldTale, x.silverTale) === 'across' && truth(x.gold, x.goldTale, x.silverTale) === 'gold' && truth(x.silverOnly, x.goldTale, x.silverTale) === 'silver' && truth(x.basket, x.goldTale, x.silverTale) === 'basket', `sort ${i + 1}: one plank for each place`);
});
MODES.forEach(m => C.DATA.ROUNDS[m].forEach((x, i) => is(!([x.goldTale, x.silverTale].indexOf('bird') >= 0 && [x.goldTale, x.silverTale].indexOf('squirrel') >= 0) && x.goldTale !== x.silverTale, `${m} ${i + 1}: two different tales, never the robin with the squirrel`)));
MODES.forEach(m => { const keys = C.DATA.ROUNDS[m].map(x => [x.goldTale, x.silverTale].sort().join()); is(new Set(keys).size === keys.length, `${m}: every round pairs a different two tales (so no pass meets one pair twice in a row)`); });
const g9 = {}; ['same', 'only'].forEach(m => C.DATA.ROUNDS[m].forEach(x => { g9[x.goldTale] = (g9[x.goldTale] || 0) + 1; }));
is(Object.keys(g9).length >= 7 && Math.max(...Object.values(g9)) <= 4, `the gold tale varies (${JSON.stringify(g9)})`);
const og = C.DATA.ROUNDS.only.filter(x => truth(x.answer, x.goldTale, x.silverTale) === 'gold').length;
is(og >= 4 && og <= 5, `only one: the answer is in the gold book in ${og} of 9`);

/* ---------------- (c) the planks ---------------- */
for (const loc of ALL) for (const mode of MODES) for (const r of C.rounds(mode)) for (const pages of [3, 2]) {
  const x = R(mode, r), tag0 = `${loc} ${mode} r${r + 1} p${pages}`;
  let st = C.newState(loc, mode, r, pages);
  is(st.planks.length === (mode === 'sort' ? 4 : 3) && new Set(st.planks).size === st.planks.length, `${tag0}: the tray`);
  is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st).key === 'hintEmpty', `${tag0}: an empty Check → no miss`);
  if (mode !== 'sort') {
    for (const p of st.planks) for (const target of ['across', 'gold', 'silver', 'basket']) {
      st = C.newState(loc, mode, r, pages); C.pick(st, p);
      const allowed = C.TARGETS[mode].indexOf(target) >= 0, lr = C.lay(st, target);
      if (!allowed) { is(lr === 'no' && st.place[p] === null, `${tag0} ${p}→${target}: not a place for this task`); continue; }
      const a = C.check(st), t = truth(p, x.goldTale, x.silverTale);
      const ok = p === x.answer && target === t && (mode === 'same' ? t === 'across' : t !== 'across');
      if (ok) is(a.result === 'ok' && st.done, `${tag0} ${p}→${target}: solved`);
      else {
        is(a.result === 'miss' && !st.done && st.place[p] === null && st.misses === 1 && C.hint(st).key === 'hintMiss1' && !C.help(st), `${tag0} ${p}→${target}: a miss, the plank comes back`);
        const pp = (tale) => PROOF[tale][p] ? PROOF[tale][p][pages === 2 ? 1 : 0] - 1 : null;
        is(a.tests[0].truth === t && a.tests[0].gold.proof === pp(x.goldTale) && a.tests[0].silver.proof === pp(x.silverTale), `${tag0} ${p}→${target}: each end walks its own book to the proof page`);
        C.pick(st, p); C.lay(st, target); C.check(st);
        is(st.misses === 2 && C.help(st) && C.hint(st).key === 'hintMiss2', `${tag0} ${p}→${target}: miss 2 → the moon dots`);
        st.planks.forEach(q => { const d = C.dots(st, q); is(d.gold === has(x.goldTale, q) && d.silver === has(x.silverTale, q), `${tag0}: the dots of ${q} show each book's evidence`); });
        C.pick(st, p); is(!C.help(st), `${tag0}: a new move takes the dots away`);
      }
    }
    /* one plank at a time */
    st = C.newState(loc, mode, r, pages); const [p1, p2] = st.planks; const t1 = C.TARGETS[mode][0];
    C.pick(st, p1); C.lay(st, t1); C.pick(st, p2); C.lay(st, t1);
    is(C.placed(st).join() === p2, `${tag0}: one plank at a time`);
    C.pick(st, p2); is(C.lay(st, t1) === 'back' && !st.place[p2], `${tag0}: laid where it lies → it comes back`);
  } else {
    C.pick(st, st.planks[0]); C.lay(st, 'basket');
    is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st).key === 'hintSortEmpty', `${tag0}: an unfinished Sort → no miss`);
    const T = ['across', 'gold', 'silver', 'basket'];
    for (let k = 0; k < 256; k++) {
      st = C.newState(loc, mode, r, pages);
      const ways = st.planks.map((p, i) => T[Math.floor(k / Math.pow(4, i)) % 4]);
      st.planks.forEach((p, i) => { C.pick(st, p); C.lay(st, ways[i]); });
      const a = C.check(st), right = st.planks.map((p, i) => truth(p, x.goldTale, x.silverTale) === ways[i]);
      if (right.every(Boolean)) is(a.result === 'ok' && st.done, `${tag0} ${ways}: solved`);
      else is(a.result === 'miss' && st.planks.every((p, i) => right[i] ? (st.place[p] === ways[i] && st.locked[p]) : st.place[p] === null), `${tag0} ${ways}: the right planks stay, the wrong ones come back`);
    }
  }
}

/* ---------------- (d) the bots ---------------- */
for (const mode of ['same', 'only']) {
  const n = [0, 0, 0]; C.rounds(mode).forEach(r => n[C.planksFor(mode, r).indexOf(R(mode, r).answer)]++);
  is(n.every(c => c === 3), `${mode}: the answer's tray slot 3 / 3 / 3 (${n})`);
}
const sn = [0, 0, 0, 0]; C.rounds('sort').forEach(r => sn[C.planksFor('sort', r).indexOf(R('sort', r).across)]++);
is(Math.max(...sn) <= 2, `sort: the across plank's slot balanced (${sn})`);
for (const loc of ALL) {
  let longest = 0, all = 0;
  ['same', 'only'].forEach(m => C.rounds(m).forEach(r => { const ls = C.planksFor(m, r).map(t => C.label(loc, t).length), a = C.label(loc, R(m, r).answer).length; all++; if (ls.filter(l => l >= a).length === 1) longest++; }));
  is(longest / all <= 0.45, `${loc}: the answer is the longest plank in ${longest} of ${all} (≤ 45 %)`);
}
for (const t of ALLTAGS) {
  let offered = 0, ans = 0; ['same', 'only'].forEach(m => C.rounds(m).forEach(r => { if (C.planksFor(m, r).indexOf(t) >= 0) { offered++; if (R(m, r).answer === t) ans++; } }));
  is(ans / offered <= 0.5, `"always pick ${t}" wins ${ans} of ${offered} (≤ 50 %)`);
}

/* ---------------- (e) the plan ---------------- */
for (const mode of MODES) {
  let prev = null;
  for (let pass = 0; pass < 25; pass++) {
    const P = C.plan(mode, rnd, prev), n = C.rounds(mode).length;
    is(P.order.length === n && new Set(P.order).size === n, `${mode}: a pass is every round`);
    if (prev) is(P.order.join() !== prev.join(), `${mode} pass ${pass}: a fresh order`);
    is(!C.repeats(mode, P.order), `${mode} pass ${pass}: never the same two tales twice in a row`);
    prev = P.order;
  }
}

/* ---------------- (f) strings, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'two-tales-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'two-tales-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 32, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^nudge|^ok/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(SH.indexOf(k) >= 0 || CSRC.indexOf("'" + k + "'") >= 0 || SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '').indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
for (const loc of ALL) is(/\{tag\}/.test(ACT.strings.okSame[loc]) && /\{name\}/.test(ACT.strings.okOnly[loc]) && /\{tag\}/.test(ACT.strings.okOnly[loc]), `${loc}: the success lines name the plank`);
const row = JSON.parse(fs.readFileSync(path.join(MT, 'two-tales-activities.json'), 'utf8')).find(x => x.id === 'two-tales.compare.rl-1-9');
is(row && row.tool === 'two-tales-activity', 'the manifest row');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'compare-two-stories-same-different' && row.page_title.en === 'Two Moons — Compare Two Stories: Same & Different (Grade 1)', 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ task: ['same', 'only', 'sort'], pages: ['3', '2'], rounds: { same: 9, only: 9, sort: 7 } }), 'the row\'s params mirror the core');

console.log(`verify-two-tales-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
