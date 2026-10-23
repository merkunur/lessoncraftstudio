#!/usr/bin/env node
/* =====================================================================
   verify-question-lamp-core.js — the gate of ACTIVITY #76, THE QUESTION LAMP
   (Wren's Question Window, L.K.1.d, 11 locales). Its own ground truth,
   never read off the core:
     1. its own table of every locale's question words, with the forms a
        sentence can call for (de wohin, sv vart, es adónde, pt para onde,
        fi mihin / minkä / mitkä / mikä / kenellä); every key of every round
        is a word of the kind it claims, the asked key's form is the one the
        question needs, and the question starts with the gap (es after ¿)
     2. every answer strip holds at most ONE card of each kind; the gold card
        is of the asked kind; so exactly one key lights the gold card, every
        other key lights another card or nothing (the lamp's target is the
        gate's own search, compared to the core's)
     3. balance: per level every key is right at least once and no key more
        than 4 times; the gold card's position is never one place more than
        half the time; who / what / where are each framed in ≥ 2 positions
        in Level 1 (so "the first card is who" is false)
     4. Match: the right card in each slot 3/3/2, it is of the asked kind and
        the other two are not; Sort: two cards of each kind per board and no
        board starts with two of one kind side by side more than once
     5. the machine: a key does not move the lamp before Check; an empty
        Check is no miss; a wrong key lights the card of its kind; a missing
        kind finds nothing; the second miss raises the marks; a typed word
        is matched to the round's own forms, a stranger word is not a miss;
        a wrong match card and a wrong tray are misses; the tour visits
        every card that a key asks about
     6. pictures exist in colour themes; 500 passes never repeat; strings ×
        11 and used; pt never "porque" in a question; the manifest mirror,
        the tool repointed, en..nl metadata frozen, the four new locales
   Usage: node scripts/verify-question-lamp-core.js  (QL_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const DIR = process.env.QL_CORE_DIR || MT;
const cx = { module: { exports: {} } }; cx.self = cx; vm.createContext(cx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'question-lamp-core.js'), 'utf8'), cx);
const C = cx.module.exports;
const ACT = (() => { const c = { window: {}, QuestionLampCore: C }; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(DIR, 'question-lamp-activity.js'), 'utf8') + '\nthis.__A = QuestionLampActivity;', c); return c.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= +(process.env.QL_SHOW || 60)) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
/* 1 — the gate's own question words */
const QW = {
  en: { who: ['Who'], what: ['What'], where: ['Where'], when: ['When'], why: ['Why'], how: ['How'] },
  de: { who: ['Wer'], what: ['Was'], where: ['Wo'], when: ['Wann'], why: ['Warum'], how: ['Wie'] },
  nl: { who: ['Wie'], what: ['Wat'], where: ['Waar'], when: ['Wanneer'], why: ['Waarom'], how: ['Hoe'] },
  sv: { who: ['Vem'], what: ['Vad'], where: ['Var'], when: ['När'], why: ['Varför'], how: ['Hur'] },
  da: { who: ['Hvem'], what: ['Hvad'], where: ['Hvor'], when: ['Hvornår'], why: ['Hvorfor'], how: ['Hvordan'] },
  no: { who: ['Hvem'], what: ['Hva'], where: ['Hvor'], when: ['Når'], why: ['Hvorfor'], how: ['Hvordan'] },
  es: { who: ['Quién'], what: ['Qué'], where: ['Dónde'], when: ['Cuándo'], why: ['Por qué'], how: ['Cómo'] },
  it: { who: ['Chi'], what: ['Che cosa'], where: ['Dove'], when: ['Quando'], why: ['Perché'], how: ['Come'] },
  pt: { who: ['Quem'], what: ['O que'], where: ['Onde'], when: ['Quando'], why: ['Por que'], how: ['Como'] },
  fr: { who: ['Qui'], what: ['Qu’est-ce que'], where: ['Où'], when: ['Quand'], why: ['Pourquoi'], how: ['Comment'] },
  fi: { who: ['Kuka'], what: ['Mitä'], where: ['Missä'], when: ['Milloin'], why: ['Miksi'], how: ['Miten'] }
};
/* a match question is a whole question, not a key, so it may open with a contracted form */
const MATCH_FORMS = { it: { where: ['Dov’è'] } };
const KEYS = { l1: ['who', 'what', 'where'], l2: ['who', 'what', 'where', 'when'], l3: ['who', 'what', 'where', 'when', 'why', 'how'] };
const own = (r, kind) => { const i = r.chunks.findIndex(c => c.k === kind); return i < 0 ? 'none' : i; };
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) if (f.endsWith('.json') && f[0] !== '_') { const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); PIC[j.dir] = j; }
const picOk = (p) => { const i = p.lastIndexOf('/'), d = p.slice(0, i), k = p.slice(i + 1); return !!(PIC[d] && PIC[d].nouns[k]) && !/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(d); };
const startsWith = (loc, q, form) => (loc === 'es' ? q.replace(/^¿/, '') : q).indexOf(form) === 0;

for (const loc of LOCS) for (const lv of ['l1', 'l2', 'l3']) {
  const rs = C.ids(loc, lv).map(i => C.round(loc, lv, i)), rightCount = {}, framedAt = {}, posByKind = {};
  is(rs.length >= 7, `${loc} ${lv}: ≥ 7 rounds`);
  rs.forEach((r, i) => {
    const tag = `${loc} ${lv} ${i}`;
    is(r.keys.map(k => k.kind).join() === KEYS[lv].join(), `${tag}: the level's keys in order`);
    r.keys.forEach(k => is(k.form === QW[loc][k.kind][0], `${tag}: key «${k.form}» is the base ${k.kind} word (a key that looks different gives the answer away)`));
    const want = QW[loc][r.ask][0];
    is(r.keys.find(k => k.kind === r.ask).form === want, `${tag}: the asked word is «${want}»`);
    const per = {}; r.chunks.forEach(c => { if (c.k !== 'verb') per[c.k] = (per[c.k] || 0) + 1; });
    is(Object.values(per).every(n => n === 1), `${tag}: at most one card of each kind`);
    is(r.chunks[r.framed].k === r.ask && own(r, r.ask) === r.framed, `${tag}: the gold card is the ${r.ask} card`);
    r.chunks.forEach(c => { if (c.k !== 'verb') is(c.pic && picOk(c.pic), `${tag}: picture ${c.pic}`); });
    is(r.keys.filter(k => own(r, k.kind) === r.framed).length === 1, `${tag}: exactly one key lights the gold card`);
    r.keys.forEach(k => is(C.lampTarget(r, k.kind) === own(r, k.kind), `${tag}: «${k.form}» → ${own(r, k.kind)}`));
    is(r.q.split('___').length === 2 && (loc === 'es' ? /^¿___/.test(r.q) && /\?$/.test(r.q) : /^___/.test(r.q)), `${tag}: the question starts with its gap («${r.q}»)`);
    /* pt: the why KEY is "Por que", never "porque" (the answer's word); a reason clause inside a question may say porque */
    if (loc === 'pt') is(r.keys.every(k => k.form.toLowerCase() !== 'porque'), `${tag}: the why key is not "porque"`);
    rightCount[r.ask] = (rightCount[r.ask] || 0) + 1;
    framedAt[r.framed] = (framedAt[r.framed] || 0) + 1;
    (posByKind[r.ask] = posByKind[r.ask] || new Set()).add(r.framed);
  });
  for (const k of KEYS[lv]) is((rightCount[k] || 0) >= 1 && (rightCount[k] || 0) <= 4, `${loc} ${lv}: «${k}» is right ${rightCount[k] || 0} times (1–4)`);
  const maxAt = Math.max(...Object.values(framedAt));
  is(maxAt <= rs.length / 2, `${loc} ${lv}: no gold position more than half the time (${JSON.stringify(framedAt)})`);
  if (lv === 'l1') for (const k of ['who', 'what', 'where']) is(posByKind[k].size >= 2, `${loc} l1: ${k} is gold in ≥ 2 positions (${[...posByKind[k]]})`);
}
/* 4 — match and sort */
for (const loc of LOCS) {
  const ms = C.ids(loc, 'l4').map(i => C.round(loc, 'l4', i)), slot = [0, 0, 0];
  ms.forEach((r, i) => {
    slot[r.right]++;
    is(r.cards[r.right].k === r.ask && r.cards.filter(c => c.k === r.ask).length === 1, `${loc} l4 ${i}: one card of the asked kind`);
    is(QW[loc][r.ask].concat((MATCH_FORMS[loc] || {})[r.ask] || []).some(f => startsWith(loc, r.q, f)), `${loc} l4 ${i}: «${r.q}» asks with a ${r.ask} word`);
    r.cards.forEach(c => is(picOk(c.pic), `${loc} l4 ${i}: picture ${c.pic}`));
  });
  is(slot.join() === '3,3,2', `${loc} l4: the right card's slot 3/3/2 (${slot})`);
  let pairs = 0;
  C.ids(loc, 'l5').forEach(i => {
    const r = C.round(loc, 'l5', i), n = { who: 0, what: 0, where: 0 };
    r.cards.forEach(c => { n[c.k]++; is(picOk(c.pic), `${loc} l5 ${i}: picture ${c.pic}`); });
    is(n.who === 2 && n.what === 2 && n.where === 2, `${loc} l5 ${i}: two of each kind`);
    for (let j = 1; j < r.cards.length; j++) if (r.cards[j].k === r.cards[j - 1].k) pairs++;
    is(r.trays.map(t => t.kind).join() === 'who,what,where' && r.trays.every(t => QW[loc][t.kind].includes(t.form)), `${loc} l5 ${i}: three lamps who / what / where`);
  });
  is(pairs <= 1, `${loc} l5: two of one kind side by side at most once (${pairs})`);
}
/* 5 — the machine */
for (const loc of LOCS) {
  const r = C.round(loc, 'l1', 0); let st = C.newState(r, 'keys');
  is(C.check(st).reason === 'empty' && st.misses === 0 && C.hint(st) === 'hEmpty', `${loc}: an empty Check is no miss`);
  const wrong = r.keys.find(k => k.kind !== r.ask);
  C.place(st, wrong.kind);
  is(st.lamp === null && st.blank === wrong.kind, `${loc}: a key in the gap does not move the lamp`);
  const res = C.check(st);
  is(!res.ok && st.lamp === own(r, wrong.kind) && st.lit === wrong.kind && st.misses === 1 && st.help === 1 && C.hint(st) === 'hWrong', `${loc}: a wrong key → miss 1, the lamp on its own kind`);
  C.place(st, wrong.kind); C.check(st);
  is(st.help === 2 && C.hint(st) === 'hMiss2', `${loc}: the second miss raises the marks`);
  C.place(st, r.ask); is(C.check(st).ok && st.done && st.lamp === r.framed, `${loc}: the right key lights the gold card`);
  /* a kind the answer lacks */
  const iN = C.ids(loc, 'l2').find(i => { const x = C.round(loc, 'l2', i); return x.keys.some(k => own(x, k.kind) === 'none'); });
  is(iN !== undefined, `${loc}: a Level-2 answer lacks a kind`);
  if (iN !== undefined) { const x = C.round(loc, 'l2', iN), k = x.keys.find(k => own(x, k.kind) === 'none'); st = C.newState(x, 'keys'); C.place(st, k.kind); C.check(st); is(st.lamp === 'none' && st.last.reason === 'none', `${loc}: «${k.form}» finds nothing`); }
  /* write it */
  const w = C.round(loc, 'l3', 1); st = C.newState(w, 'write');
  for (const ch of 'zq') C.type(st, ch);
  is(C.check(st).reason === 'unknown' && st.misses === 0, `${loc}: a stranger word is no miss`);
  while (st.typed) C.type(st, '⌫');
  for (const ch of w.keys.find(k => k.kind === w.ask).form.toLocaleLowerCase(loc).replace(/'/g, '’')) C.type(st, ch);
  is(C.check(st).ok, `${loc}: the written word is right`);
  is(C.norm(w.keys.find(k => k.kind === w.ask).form).split('').every(ch => C.keyLetters(loc, 'l3').includes(ch)), `${loc}: the keyboard holds every letter of the forms`);
  /* match / sort */
  const m = C.round(loc, 'l4', 0); st = C.newState(m, 'keys');
  is(C.check(st).reason === 'empty' && st.misses === 0, `${loc}: match — an empty slot is no miss`);
  C.putCard(st, (m.right + 1) % 3); is(C.check(st).reason === 'wrongCard' && st.misses === 1, `${loc}: match — a wrong card is a miss`);
  C.putCard(st, m.right); is(C.check(st).ok, `${loc}: match — the right card`);
  const s5 = C.round(loc, 'l5', 0); st = C.newState(s5, 'keys');
  C.select(st, 0); C.drop(st, s5.cards[0].k);
  is(C.check(st).reason === 'notAll' && st.misses === 0, `${loc}: sort — cards left over is no miss`);
  for (let i = 1; i < 6; i++) { C.select(st, i); C.drop(st, i === 1 ? (s5.cards[1].k === 'who' ? 'where' : 'who') : s5.cards[i].k); }
  is(C.check(st).reason === 'wrongTray' && st.wrong.length === 1 && st.wrong[0] === 1, `${loc}: sort — the card in the wrong tray is named`);
  C.select(st, 1); C.drop(st, s5.cards[1].k); is(C.check(st).ok, `${loc}: sort — every card under its lamp`);
  /* the tour */
  const t = C.tour(r); is(t.length === r.chunks.filter(c => c.k !== 'verb').length && t.every(x => r.chunks[x.chunk].k === x.kind), `${loc}: the tour visits every card a key asks about`);
}
/* 6 — order, strings, manifest */
{ let prev = C.plan('de', 'l1', Math.random, null), ok = true; for (let i = 0; i < 500; i++) { const o = C.plan('de', 'l1', Math.random, prev); if (o.join() === prev.join() || o[0] === prev[prev.length - 1]) ok = false; prev = o; } is(ok, '500 passes: never the last order, never its last round first'); }
const SK = Object.keys(ACT.strings), SRC = fs.readFileSync(path.join(DIR, 'question-lamp-activity.js'), 'utf8').replace(/strings: \{[\s\S]*?\n  \},\n/, '') + fs.readFileSync(path.join(DIR, 'question-lamp-core.js'), 'utf8');
for (const k of SK) {
  is(LOCS.every(l => typeof ACT.strings[k][l] === 'string' && ACT.strings[k][l].trim()), `string ${k}: all 11 locales`);
  is(k === 'title' || /^l[1-5]$|^a(Keys|Write)$|^k(Who|What|Where|When|Why|How)$/.test(k) || new RegExp("['\"]" + k + "['\"]").test(SRC), `string ${k} is used`);
}
for (const loc of LOCS) is(!/\bfree\b|gratis|kostenlos|gratuit|gratuito|ilmai/i.test(SK.map(k => ACT.strings[k][loc]).join(' ')), `${loc}: no "free" in the activity text`);
const man = JSON.parse(fs.readFileSync(path.join(MT, 'wren-question-window-activities.json'), 'utf8'))[0];
is(man.tool === 'question-lamp-activity' && man.id === 'wren-question-window.question-words.l-k-1-d', 'the row runs the Question Lamp');
const FROZEN = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'];
const h = crypto.createHash('sha1').update(JSON.stringify(FROZEN.map(l => [man.slug[l], man.page_title[l], man.page_intro[l]]))).digest('hex');
is(h === 'eb65a426ba7a6c40f4e7bc158b878c5eccb0cc49', `en..nl metadata frozen (${h})`);
for (const l of LOCS) is(man.slug[l] && /^[a-z0-9-]+$/.test(man.slug[l]) && man.page_title[l] && man.page_intro[l], `${l}: slug, title, intro`);
for (const l of LOCS) for (const lv of ['l1', 'l2', 'l3', 'l4']) is(man.params.byLocale[l][lv] === C.ids(l, lv).map(i => C.round(l, lv, i).q).join(' | '), `${l} ${lv}: the manifest mirror`);
const W = C.layout(648), N = C.layout(312);
is(W.pic >= 96 && N.pic >= 64 && W.key >= 44 && N.key >= 44, 'layout: pictures 96 / 64, keys ≥ 44');
console.log(`verify-question-lamp-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
