#!/usr/bin/env node
/* =====================================================================
   verify-opposites-rod-core.js — the gate of ACTIVITY #72, THE TWO-ENDED
   ROD (Quill's Mirror Market, K.L.5.b, 11 locales). Its own ground truth:
     1. pictures + sentences — the gate's own table of every round (the
        target, the far-end opposite, the near-miss and what the rod does
        to it, the unrelated card): for every round × locale × basket slot
        × target end, every card dropped slides where the table says; only
        the opposite reaches the far end; middles only on rods with a
        groove; the crossing rod only on the upright rod; the right card at
        its dealt slot. Write mode: every card word typed (any case) slides
        like the card; the target itself is a miss; a word the locale does
        not know shakes and is NOT a miss.
     2. the bedtime scene — three flips finish it, never fewer
     3. same or opposite — EVERY way to place every card (same end / other
        end / basket) graded by the gate's own rule; the same/opposite split
        varies over the level; one round has a card that fits nowhere
     4. pair up — every card × every rod: home only on its own rod; each
        card visits each basket slot over the level
     5. prefixes — every round × every clip: only the right clip closes and
        returns the word; a wrong clip never returns any word; the en table
        (written here) of every base and the word it makes; fi's ending clip
        closes on the back; the right clip at its dealt hook slot; the en
        meaning clips re / pre / mis 3 / 3 / 3, other locales a recorded
        refusal (null)
     6. sentences — one blank each, filled by the far-end word, with a
        capital where the blank starts a sentence; every card word of every
        locale exists; no digit; fr narrow no-break spaces; strings × 11;
        pictures colour + labelled; floors; the plan never repeats; slots
        balanced; the manifest mirror, the tool repointed, the frozen en..nl
        metadata, the new sv da no fi metadata
   Usage: node scripts/verify-opposites-rod-core.js  (TR_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.TR_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'opposites-rod-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, OppositesRodCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'opposites-rod-activity.js'), 'utf8') + '\nthis.__A = OppositesRodActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const FROZEN = '9a0970791d4d9e004f5826fe64c12674e938387c';
const seeded = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; };
/* the gate's own tables: id → [target, far, near, near-home, unrelated, rod groove?, upright?] */
const PIC = {
  black: ['black', 'white', 'red', 'off', 'up', false, false], up: ['up', 'down', 'left', 'cross', 'black', false, true], big: ['big', 'small', 'medium', 'mid', 'happy', true, false],
  hot: ['hot', 'cold', 'warm', 'mid', 'big', true, false], happy: ['happy', 'sad', 'glad', 'same', 'white', true, false], day: ['day', 'night', 'rainbow', 'off', 'full', false, false],
  full: ['full', 'empty', 'half', 'mid', 'up', true, false], open: ['open', 'closed', 'on', 'off', 'white', false, false], on: ['on', 'off', 'open', 'off', 'small', false, false]
};
const SENT = [['full', 'empty', 'half', 'mid', 'red'], ['open', 'closed', 'on', 'off', 'big'], ['on', 'off', 'open', 'off', 'white'], ['big', 'small', 'medium', 'mid', 'happy'], ['up', 'down', 'left', 'cross', 'black'], ['day', 'night', 'rainbow', 'off', 'full'], ['hot', 'cold', 'warm', 'mid', 'big'], ['sad', 'happy', 'upset', 'same', 'black'], ['push', 'pull', 'lift', 'off', 'red']];
const EN_FLIP = { happy: 'unhappy', kind: 'unkind', lock: 'unlock', tie: 'untie', agree: 'disagree', obey: 'disobey', appear: 'disappear', correct: 'incorrect', possible: 'impossible' };
const EN_MEAN = { 0: ['re', 'reread'], 1: ['pre', 'preheat'], 2: ['mis', 'misspelled'], 3: ['re', 'refill'], 4: ['pre', 'preview'], 5: ['mis', 'misheard'], 6: ['re', 'rebuild'], 7: ['pre', 'preschool'], 8: ['mis', 'misread'] };
const KEYS = ['black', 'white', 'red', 'up', 'down', 'left', 'big', 'small', 'medium', 'hot', 'cold', 'warm', 'happy', 'sad', 'glad', 'day', 'night', 'rainbow', 'full', 'empty', 'half', 'open', 'closed', 'on', 'off', 'upset', 'push', 'pull', 'lift'];

/* 1 — pictures + sentences */
for (const loc of LOCS) {
  const W = C.DATA.TEXT[loc].w;
  is(KEYS.every(k => typeof W[k] === 'string' && W[k].trim()), `${loc}: every card word exists`);
  is(new Set(KEYS.map(k => C.norm(W[k]))).size === KEYS.length, `${loc}: every card word distinct`);
  is(JSON.stringify(C.ids(loc, 'pictures')) === JSON.stringify(Object.keys(PIC).map(k => 'pic.' + k).concat('pic.scene')), `${loc}: the picture rounds are the table's`);
  const rounds = Object.keys(PIC).map(k => ['pic.' + k, PIC[k]]).concat(SENT.map((s, i) => ['sent.' + i, [s[0], s[1], s[2], s[3], s[4], null, s[3] === 'cross']]));
  for (const [id, G] of rounds) for (const slot of [0, 1, 2]) for (const end of ['L', 'R']) {
    const r = C.round(loc, id, slot, end), tag = `${loc} ${id} s${slot}${end}`;
    is(r.kind === 'rod' && r.target.key === G[0] && r.far.key === G[1] && r.cards.length === 3 && r.cards[slot].key === G[1], `${tag}: the target, the opposite at slot ${slot}`);
    if (G[5] !== null) is(r.grad === G[5] && r.vertical === G[6], `${tag}: the rod's groove and stance`);
    is(!r.vertical || r.end === 'L', `${tag}: the upright rod keeps up at the top`);
    const want = { [G[1]]: 'far', [G[2]]: G[3], [G[4]]: 'off' };
    for (const c of r.cards) {
      is(c.home === want[c.key], `${tag}: ${c.key} home ${c.home} (want ${want[c.key]})`);
      const st = C.newState(r), res = C.drop(st, c.id);
      is(res.home === want[c.key] && st.done === (want[c.key] === 'far') && (st.done || st.misses === 1), `${tag}: ${c.key} slides ${res.home}`);
      if (res.home === 'mid') is(r.grad, `${tag}: a middle only on a rod with a groove`);
      if (res.home === 'cross') is(r.vertical, `${tag}: the crossing rod only on the upright rod`);
      const s2 = C.newState(r), t2 = C.typeWord(s2, '  ' + c.word.toLocaleUpperCase() + ' ');
      is(t2.home === want[c.key] && s2.done === (want[c.key] === 'far'), `${tag}: typed ${c.word} slides like the card`);
    }
    if (slot === 0 && end === 'L') {
      const s3 = C.newState(r); is(C.typeWord(s3, r.target.word).home === 'itself' && s3.misses === 1 && C.hint(s3) === 'hItself', `${tag}: typing the target is a miss`);
      const s4 = C.newState(r); is(C.typeWord(s4, 'qxzv').home === 'unknown' && s4.misses === 0 && C.hint(s4) === 'hSpell', `${tag}: an unknown word shakes, no miss`);
      const s5 = C.newState(r); is(C.typeWord(s5, '').home === 'empty' && s5.misses === 0, `${tag}: an empty answer is no miss`);
    }
    if (id.startsWith('sent.')) {
      const T = C.DATA.TEXT[loc].l3[+id.slice(5)];
      is(T.split('___').length === 2, `${loc} ${id}: one blank`);
      const startsSentence = /(^|[.!?…]\s+)___/.test(T), fill = startsSentence ? r.far.word.charAt(0).toLocaleUpperCase() + r.far.word.slice(1) : r.far.word;
      is(r.fill === fill && r.sentence === T, `${loc} ${id}: the blank is filled by «${fill}»`);
    }
  }
  /* 2 — the scene */
  const sc = C.round(loc, 'pic.scene', 0, 'L'), ss = C.newState(sc);
  is(sc.kind === 'scene' && JSON.stringify(sc.items.map(i => [i.a.key, i.b.key])) === JSON.stringify([['day', 'night'], ['on', 'off'], ['open', 'closed']]), `${loc}: the bedtime scene`);
  C.flip(ss, 0); C.flip(ss, 2); is(!ss.done, `${loc}: two flips do not finish the scene`); C.flip(ss, 1); is(ss.done, `${loc}: three flips finish it`);
}

/* 3 — same or opposite */
for (const loc of LOCS) {
  const T = C.DATA.TEXT[loc], splits = new Set(); let offRounds = 0;
  is(T.same.length === 8, `${loc}: eight same-or-opposite rounds`);
  T.same.forEach((q, i) => {
    const r = C.round(loc, 'same.' + i, 0, 'L'), n = r.cards.length;
    is(q[2].length >= 1 && n >= 2 && n <= 5 && new Set(r.cards.map(c => C.norm(c.word))).size === n && !r.cards.some(c => C.norm(c.word) === C.norm(q[0])), `${loc} same.${i}: cards distinct, none the target`);
    splits.add(q[1].length + '/' + q[2].length); if (q[3].length) offRounds++;
    const homes = r.cards.map(c => c.home), right = (a) => a.every((e, j) => homes[j] === 'off' ? e === null : (homes[j] === 'same' ? e === 'near' : e === 'far'));
    const opts = [null, 'near', 'far'];
    for (let m = 0; m < Math.pow(3, n); m++) {
      const a = []; let x = m; for (let j = 0; j < n; j++) { a.push(opts[x % 3]); x = Math.floor(x / 3); }
      const st = C.newState(r, seeded('s' + m)); r.cards.forEach((c, j) => C.place(st, c.id, a[j]));
      const res = C.checkSame(st), anyPlaced = a.some(Boolean);
      if (!anyPlaced) { is(res.reason === 'empty' && st.misses === 0, `${loc} same.${i}: nothing placed → hint, no miss`); continue; }
      const wrong = a.some((e, j) => e && !((homes[j] === 'same' && e === 'near') || (homes[j] === 'far' && e === 'far')));
      is(res.ok === right(a) && (res.ok || (wrong ? st.misses === 1 : st.misses === 0)), `${loc} same.${i} ${a}: ok ${res.ok}, want ${right(a)}`);
      if (wrong) is(Object.keys(st.ends).every(id => { const c = C.cardOf(r, id); return (c.home === 'same' && st.ends[id] === 'near') || (c.home === 'far' && st.ends[id] === 'far'); }), `${loc} same.${i}: the wrong words slide back`);
    }
  });
  is(splits.size >= 3 && offRounds >= 1, `${loc}: the same/opposite split varies (${[...splits]}), a word that fits nowhere (${offRounds})`);
}

/* 4 — pair up */
for (const loc of LOCS) {
  const T = C.DATA.TEXT[loc], slotSeen = {};
  is(T.pairs.length === 7, `${loc}: seven pair-up rounds`);
  T.pairs.forEach((p, i) => {
    const r = C.round(loc, 'pairs.' + i, 0, 'L');
    is(r.rods.length === 3 && new Set(p.flat().map(C.norm)).size === 6, `${loc} pairs.${i}: three rods, six distinct words`);
    r.cards.forEach((c, s) => { (slotSeen[c.rod] = slotSeen[c.rod] || new Set()).add(s); for (let rod = 0; rod < 3; rod++) { const st = C.newState(r), res = C.dropOn(st, c.id, rod); is(res.ok === (rod === c.rod) && r.rods[c.rod].b === c.word, `${loc} pairs.${i}: ${c.word} on rod ${rod}`); } });
    const st = C.newState(r); r.cards.forEach(c => C.dropOn(st, c.id, c.rod)); is(st.done, `${loc} pairs.${i}: three homes finish it`);
  });
  is([0, 1, 2].every(k => slotSeen[k] && slotSeen[k].size === 3), `${loc}: each card visits each basket slot over the level`);
}

/* 5 — prefixes */
for (const loc of LOCS) {
  const T = C.DATA.TEXT[loc];
  is(T.flip.rounds.length === 9 && T.flip.clips.length === 3, `${loc}: nine flip rounds, three clips`);
  is(new Set(T.flip.rounds.map(r => r[2])).size === 9 && T.flip.rounds.every(r => r[2] !== r[0] && r[2].length > r[0].length - 6), `${loc}: nine distinct words made`);
  T.flip.rounds.forEach(fr => { const c = T.flip.clips[fr[1]], w = C.norm(fr[2]); is(c[0].split('/').some(a => { a = C.norm(a).replace(/[^\p{L}]/gu, ''); return c[1] === 'front' ? w.startsWith(a) && C.norm(fr[0]) === w.slice(a.length) : w.endsWith(a); }), `${loc}: the clip «${c[0]}» makes «${fr[2]}» from «${fr[0]}»`); });
  if (loc === 'fi') is(T.flip.clips[1][1] === 'back' && T.flip.clips.filter(c => c[1] === 'back').length === 1, 'fi: the ending clip closes on the back');
  else is(T.flip.clips.every(c => c[1] === 'front'), `${loc}: every clip closes on the front`);
  if (loc === 'en') { is(T.meaning && T.meaning.rounds.length === 9, 'en: nine meaning-clip rounds'); is(JSON.stringify(T.meaning.clips.map(c => c[0])) === '["re","pre","mis"]', 'en: re / pre / mis'); }
  else is(T.meaning === null, `${loc}: the meaning clips are a recorded refusal`);
  const ids = C.ids(loc, 'prefixes');
  for (const id of ids) for (const slot of [0, 1, 2]) {
    const r = C.round(loc, id, slot, 'L'), tag = `${loc} ${id} s${slot}`;
    is(r.clips[slot].idx === r.right && new Set(r.clips.map(c => c.idx)).size === 3, `${tag}: the right clip at its hook slot`);
    if (loc === 'en' && r.kind === 'flip') is(EN_FLIP[r.base] === r.fused, `${tag}: ${r.base} → ${r.fused} (the gate's table)`);
    if (loc === 'en' && r.kind === 'meaning') { const g = EN_MEAN[+id.slice(5)]; is(r.clips[slot].label === g[0] && r.fused === g[1] && r.sentence.split('___').length === 2, `${tag}: ${g[0]} makes ${g[1]}`); }
    for (let k = 0; k < 3; k++) {
      const st = C.newState(r); is(C.push(st).reason === 'noClip' && st.misses === 0, `${tag}: a push with no clip is no miss`);
      C.hang(st, k); const res = C.push(st), right = r.clips[k].idx === r.right;
      is(right ? (res.fused && res.word === r.fused && st.done) : (res.rolledBack && !('word' in res) && !st.done && st.misses === 1), `${tag}: clip ${r.clips[k].label} ${right ? 'closes' : 'rolls back, builds nothing'}`);
      if (!right) is(C.hint(st) === (r.kind === 'flip' ? 'hClipWrong' : 'hMeanWrong'), `${tag}: the wrong-clip hint`);
    }
  }
}
{ const st = C.newState(C.round('en', 'flip.0', 0, 'L')); C.hang(st, 1); C.push(st); C.hang(st, 2); C.push(st); is(C.hint(st) === 'hClip2' && C.helpOf(st).clip === 0, 'miss 2 → the right clip glints'); }
{ const st = C.newState(C.round('en', 'pic.hot', 0, 'L')); C.drop(st, 'warm'); C.drop(st, 'big'); is(C.hint(st) === 'hMiss2' && C.helpOf(st).far, 'miss 2 → the far end pulses'); }

/* 6 — texts, strings, pictures, floors, plan, manifest */
for (const loc of LOCS) {
  const T = C.DATA.TEXT[loc], strs = [];
  (function walk(v) { if (typeof v === 'string') strs.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); })(T);
  const all = strs.join(' ');
  is(!/\d/.test(all), `${loc}: no digits in the texts`);
  if (loc === 'fr') is(!/ [?!:;»]|« /.test(all), 'fr: narrow no-break spaces in the texts');
}
for (const [k, v] of Object.entries(A.strings)) for (const loc of LOCS) { is(typeof v[loc] === 'string' && v[loc].trim(), `string ${k}: ${loc}`); if (loc === 'fr') is(!/ [?!:;»]|« /.test(v[loc]), `fr string ${k}: narrow no-break space`); }
{
  const LABEL = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
  for (const p of new Set(Object.values(C.DATA.WORDS).map(w => w.pic).filter(Boolean))) is(fs.existsSync(path.join(IMG, p + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]), `${p} exists, colour, labelled`);
}
is(C.layout(704).pic >= 96 && C.layout(360).pic >= 64 && C.layout(290).pic >= 64 && C.layout(290).cw >= C.layout(290).pic, 'pictures at their floor: 96 at 704, 64 on a phone');
{
  let bad = 0, slotBad = 0;
  for (let s = 0; s < 500; s++) { const rnd = seeded('p' + s); for (const lv of C.LEVELS) { const a = C.plan('en', lv, rnd, null), b = C.plan('en', lv, rnd, a); if (a.join() === b.join() || a[a.length - 1] === b[0] || new Set(a).size !== a.length) bad++; } const sl = C.slots(rnd, 9), cnt = [0, 0, 0]; sl.forEach(x => cnt[x]++); if (cnt.join() !== '3,3,3') slotBad++; }
  is(!bad, `500 passes: never the same order twice, never the last round first (${bad})`);
  is(!slotBad, `the right card's slot 3/3/3 over nine rounds (${slotBad})`);
}
{
  const row = JSON.parse(fs.readFileSync(path.join(MT, 'opposites-activities.json'), 'utf8'))[0];
  const h = crypto.createHash('sha1').update(JSON.stringify(['slug', 'page_title', 'page_intro'].map(k => ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].map(l => row[k][l])))).digest('hex');
  is(h === FROZEN, `the frozen en..nl metadata is untouched (${h})`);
  is(row.tool === 'opposites-rod-activity' && !row.params.rounds && !row.params.roundsL10n, 'the row runs the rod, its params a mirror');
  for (const loc of LOCS) for (const lv of C.LEVELS) is(row.params.byLocale[loc][lv] === C.ids(loc, lv).length, `mirror ${loc} ${lv}`);
  for (const loc of ['sv', 'da', 'no', 'fi']) is(row.slug[loc] && /^[a-z0-9-]+$/.test(row.slug[loc]) && row.page_title[loc] && row.page_intro[loc], `${loc}: slug, title, intro`);
}
console.log(`verify-opposites-rod-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
