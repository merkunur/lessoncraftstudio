#!/usr/bin/env node
/* =====================================================================
   verify-juniper-story-lantern-core.js — the gate for ACTIVITY #116, The
   Lantern That Carries a Lesson (Juniper's Story Lantern, RL.1.2; all 11
   locales). Its OWN ground truth: the en lessons, the pane each detail
   comes from, and the light table are written out here.
     (a) the fables: ten per locale, the same ten ids in the same order;
         three panes each; the detail shares words with its own pane; the
         wrong lesson and the lesson are not story sentences; the other
         card is a real lesson of another fable in the same locale, never
         this one's; every card ≤ 60 characters; every picture exists in a
         colour theme;
     (b) the en truth: lessons and detail panes;
     (c) the light: a lesson lights all three panes, the ending warm and
         the beam reaches the new story; a detail lights only its pane and
         the beam goes halfway; a wrong lesson leaves the ending cold and
         stops the beam; another fable's lesson lights nothing; nothing
         lights before Check; only the lesson finishes the round; one card
         in the lantern at a time;
     (d) Retell: the panes start out of order (never in order), two taps
         swap, only the right order opens the lantern, a card cannot go in
         before that; the help (ending glow, first pane glow) only from
         miss 2 and gone after a new move;
     (e) the bots: always-longest / always-shortest card ≤ 4 of 10, for 3
         and 4 cards;
     (f) the plan: a fresh order every pass (never the last one), the
         lesson's slot balanced over a pass and moved by one each pass,
         Retell starts never in order and never the same twice running;
     (g) the strings ×11 (no digit in a hint, never "free", fr narrow
         spaces, fr/it ’, every key asked for), the manifest row (en
         frozen, 11 locales).
   Usage: node scripts/verify-juniper-story-lantern-core.js   (env JL_CORE_DIR / JL_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.JL_CORE_DIR || MT, ACT_DIR = process.env.JL_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'juniper-story-lantern-core.js'));
const ACT = (() => { const ctx = { window: {}, JuniperLanternCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'juniper-story-lantern-activity.js'), 'utf8') + '\n;this.__A = window.JuniperLanternActivity || (typeof JuniperLanternActivity !== "undefined" ? JuniperLanternActivity : null);', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const rnd = (() => { let s = 7; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();
const words = (s) => String(s).toLowerCase().normalize('NFC').split(/[^\p{L}]+/u).filter(w => w.length > 2);
const picOk = (p) => fs.existsSync(path.join(IMG, p + '@2x.webp')) && !BW.test(p.split('/')[0].trim());

/* ---------------- (b) the en truth ---------------- */
const IDS = ['tortoise', 'ant', 'lion', 'crow', 'wolf', 'wind', 'goose', 'bear', 'goats', 'dove'];
const EN = {
  tortoise: ['Slow and steady can still win.', 1], ant: ['Plan ahead and be ready later.', 0], lion: ['A small friend can help a lot.', 2],
  crow: ['A clever idea solves a problem.', 2], wolf: ['Lying makes people stop trusting you.', 0], wind: ['Gentle ways work better than force.', 1],
  goose: ['Wanting too much can make you lose it all.', 1], bear: ['A true friend helps in trouble.', 1], goats: ['Taking turns is better than fighting.', 0],
  dove: ['Be kind, and kindness comes back.', 0]
};
C.DATA.en.forEach(f => { is(EN[f.id] && f.m === EN[f.id][0], `en ${f.id}: the lesson`); is(EN[f.id] && f.pane === EN[f.id][1], `en ${f.id}: the detail's pane`); });

/* ---------------- (a) the fables ---------------- */
is(JSON.stringify(C.DATA.LOCALES) === JSON.stringify(ALL), 'the eleven locales');
for (const loc of ALL) {
  const F = C.DATA[loc];
  is(F && F.length === 10, `${loc}: ten fables`);
  is(F.map(f => f.id).join() === IDS.join(), `${loc}: the same ten fables in the same order`);
  const morals = F.map(f => f.m);
  F.forEach((f, r) => {
    const tag = `${loc} ${f.id}`;
    is(f.story.length === 3 && f.story.every(s => s.length > 10), `${tag}: three panes`);
    const dw = words(f.d), share = f.story.map(s => { const w = words(s); return dw.filter(x => w.includes(x)).length; });
    is(share[f.pane] >= 2 && share[f.pane] === Math.max(...share), `${tag}: the detail comes from its own pane (${share})`);
    for (const k of ['m', 'w']) is(!f.story.some(s => s.trim() === f[k].trim()), `${tag}: the ${k} card is not a story sentence`);
    is(f.other !== f.m && morals.includes(f.other), `${tag}: the other card is another fable's lesson`);
    is(f.other !== morals[r], `${tag}: the other card is not this fable's lesson`);
    is(new Set([f.m, f.d, f.w, f.other]).size === 4, `${tag}: four different cards`);
    for (const k of ['m', 'd', 'w', 'other']) is(f[k].length <= 60, `${tag}: ${k} ≤ 60 characters`);
    is(typeof f.next === 'string' && f.next.length > 20, `${tag}: a next story`);
    f.pics.concat([f.nextPic]).forEach(p => is(picOk(p), `${tag}: picture ${p} exists in a colour theme`));
  });
  is(new Set(morals).size === 10, `${loc}: ten different lessons`);
}

/* ---------------- (c) the light ---------------- */
const TRUTH = { moral: [[1, 1, 1], 'warm', 'reaches'], wrong: [[1, 1, 0], 'cold', 'stops'], other: [[0, 0, 0], 'dark', 'stops'] };
for (const p of [0, 1, 2]) {
  const L = C.lightOf('detail', p);
  is(L.panes.map(Number).join() === [0, 1, 2].map(i => +(i === p)).join() && L.beam === 'half', `a detail from pane ${p + 1} lights only that pane, the beam halfway`);
  is(L.ending !== 'cold' && (p === 2 || L.ending === 'dark'), `a detail never turns the ending cold`);
  for (const k of Object.keys(TRUTH)) { const T = C.lightOf(k, p); is(T.panes.map(Number).join() === TRUTH[k][0].join() && T.ending === TRUTH[k][1] && T.beam === TRUTH[k][2], `the light of a ${k} card`); }
}
for (const loc of ALL) for (const n of [3, 4]) for (let r = 0; r < 10; r++) for (let slot = 0; slot < n; slot++) {
  const st = C.newState(loc, 'lesson', n, r, { slot });
  const kinds = st.cards.map(c => c.kind);
  is(kinds.length === n && kinds[slot] === 'moral' && st.right === slot && kinds.filter(k => k === 'moral').length === 1, `${loc} ${n} r${r}: the lesson at slot ${slot}`);
  is(kinds.includes('detail') && kinds.includes('wrong') && (n === 4) === kinds.includes('other'), `${loc} ${n} r${r}: detail + wrong (+ other with four)`);
  is(st.cards.every(c => c.text === C.textOf(st.F, c.kind)), `${loc} r${r}: card texts`);
  if (slot) continue;
  is(C.check(C.newState(loc, 'lesson', n, r)).result === 'tray', `${loc} r${r}: an empty Check asks for a card, no miss`);
  st.cards.forEach((c, i) => {
    const s = C.newState(loc, 'lesson', n, r, { slot: 0 });
    is(C.drop(s, i) === 'in' && s.lantern === i && s.light === null, `${loc} r${r}: the card goes in, nothing lit before Check`);
    const other = (i + 1) % n; C.drop(s, other); is(s.lantern === other, `${loc} r${r}: one card in the lantern at a time`); C.drop(s, i);
    const res = C.check(s), T = C.lightOf(c.kind, s.F.pane);
    is(JSON.stringify(s.light) === JSON.stringify(T), `${loc} r${r} ${c.kind}: the light after Check`);
    is((res.result === 'ok') === (c.kind === 'moral') && s.done === (c.kind === 'moral'), `${loc} r${r} ${c.kind}: only the lesson finishes`);
    if (c.kind !== 'moral') {
      is(!C.help(s) && C.hint(s) && C.hint(s).key === { detail: 'hintDetail', wrong: 'hintWrong', other: 'hintOther' }[c.kind], `${loc} r${r} ${c.kind}: miss 1 hint, no help yet`);
      C.check(s); is(C.help(s) && C.hint(s).key === 'hintBoth', `${loc} r${r} ${c.kind}: miss 2 brings the help`);
      C.drop(s, i); is(!C.help(s), `${loc} r${r}: the help goes after a new move`);
    }
  });
}

/* ---------------- (d) Retell ---------------- */
const PERMS = [[0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
for (const loc of ALL) for (const p of PERMS) {
  const s = C.newState(loc, 'retell', 3, 0, { perm: p });
  is(s.order.join() === p.join() && !s.retold, `${loc} retell: starts at ${p}`);
  is(C.drop(s, 0) === 'no', `${loc} retell: no card before the story is in order`);
  is(C.check(s).result === 'miss' && s.retellMisses === 1 && !C.orderHelp(s), `${loc} retell: a wrong order is a miss`);
  C.check(s); is(C.orderHelp(s) && C.hint(s).key === 'hintOrder2', `${loc} retell: miss 2 lights the first pane`);
  /* solve by real swaps */
  for (let i = 0; i < 3; i++) { const j = s.order.indexOf(i); if (j !== i) { C.tapPane(s, i); is(C.tapPane(s, j) === 'swapped', `${loc}: two taps swap`); } }
  is(s.order.join() === '0,1,2' && !C.orderHelp(s), `${loc} retell: in order, the help gone`);
  is(C.check(s).result === 'latch' && s.retold, `${loc} retell: the right order opens the lantern`);
  is(C.drop(s, s.right) === 'in' && C.check(s).result === 'ok', `${loc} retell: then the lesson`);
}
for (const loc of ALL) { const s = C.newState(loc, 'retell', 3, 0, { perm: [0, 1, 2] }); is(s.order.join() !== '0,1,2', `${loc} retell: never starts in order`); }
{ const s = C.newState('en', 'retell', 3, 0, { perm: [2, 1, 0] }); C.tapPane(s, 1); is(C.tapPane(s, 1) === 'dropped' && s.order.join() === '2,1,0', 'the same pane twice puts it down'); }

/* ---------------- (e) the bots ---------------- */
for (const loc of ALL) for (const n of [3, 4]) {
  let longest = 0, shortest = 0;
  for (let r = 0; r < 10; r++) { const L = C.newState(loc, 'lesson', n, r).cards.map(c => c.text.length), m = L[C.newState(loc, 'lesson', n, r).right];
    if (m === Math.max(...L)) longest++; if (m === Math.min(...L)) shortest++; }
  is(longest <= 4 && shortest <= 4, `${loc} ${n} cards: always-longest ${longest}/10, always-shortest ${shortest}/10 (≤ 4)`);
}

/* ---------------- (f) the plan ---------------- */
for (const loc of ALL) for (const task of ['lesson', 'retell']) for (const n of [3, 4]) {
  let prev = null;
  for (let pass = 0; pass < 6; pass++) {
    const P = C.plan(loc, task, n, rnd, prev, pass);
    is(P.order.length === 10 && new Set(P.order).size === 10, `${loc} ${task} ${n}: a pass is the ten fables`);
    if (prev) is(P.order.join() !== prev.join(), `${loc} ${task} ${n} pass ${pass}: a fresh order`);
    const count = Array(n).fill(0); P.slots.forEach(x => count[x]++);
    is(Math.max(...count) - Math.min(...count) <= 1 + (n === 4 ? 1 : 0) && Math.max(...count) <= 4, `${loc} ${n} pass ${pass}: the lesson's slot balanced (${count})`);
    is(P.slots.every((x, r) => x === (C.SLOTS[n][r] + pass) % n), `${loc} ${n} pass ${pass}: the slot table moves by one each pass`);
    if (task === 'retell') { is(P.perms.length === 10 && P.perms.every(p => p.join() !== '0,1,2'), `${loc} ${n}: retell never starts in order`);
      is(P.perms.every((p, i) => i === 0 || p.join() !== P.perms[i - 1].join()), `${loc} ${n}: retell starts never the same twice running`); }
    else is(P.perms === null, `${loc}: no retell starts in Lesson`);
    prev = P.order;
  }
}
const firsts = new Set(); for (let k = 0; k < 40; k++) firsts.add(C.plan('en', 'lesson', 3, Math.random, null, 0).order[0]); is(firsts.size >= 4, 'the first fable varies between visits');

/* ---------------- (g) strings, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'juniper-story-lantern-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'juniper-story-lantern-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 30, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^nudge/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(SH.indexOf(k) >= 0 || CSRC.indexOf("'" + k + "'") >= 0 || SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '').indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
for (const loc of ['fr', 'it']) C.DATA[loc].forEach(f => is(![f.m, f.d, f.w, f.other, f.next].concat(f.story).some(s => /'/.test(s)), `${loc} ${f.id}: ’ in the text`));
const row = JSON.parse(fs.readFileSync(path.join(MT, 'juniper-story-lantern-activities.json'), 'utf8')).find(x => x.id === 'juniper-story-lantern.central-message.rl-1-2');
is(row && row.tool === 'juniper-story-lantern-activity', 'the manifest row');
is(row && Object.keys(row.slug).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'juniper-story-lantern' && row.page_title.en === "Juniper's Story Lantern — What's the Lesson? (Grade 1)", 'the en metadata is frozen');

console.log(`verify-juniper-story-lantern-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
