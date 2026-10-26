#!/usr/bin/env node
/* =====================================================================
   verify-event-tunnel-core.js — the gate for ACTIVITY #127, The Event
   Tunnel (Tempo's Day Plan, L.1.1.i; all 11 locales). Its OWN ground
   truth, written here independently of the core:
     · each locale's three time words (before / during / after) as the
       phrase must open with them (fi: ennen BEFORE the noun, aikana /
       jälkeen AFTER it);
     · the agreement rules of a phrase triple: the same event noun in all
       three; es antes del ↔ durante el ↔ después del (masculine) or
       antes de la ↔ durante la ↔ después de la; pt do ↔ o ↔ do / da ↔ a ↔
       da; it del ↔ il ↔ il, della ↔ la ↔ la, dello ↔ lo ↔ lo; de vor and
       nach take the same dative article and während the genitive (dem →
       des, der → der); fi aikana and jälkeen follow the same genitive;
     · the stretch → place table (b in front, d inside, a past the exit)
       and level 4's five stretches (only before T1, during T1, during T2
       and after T2 are ever written).
   It asserts:
     (a) every phrase and sentence by those rules; every picture exists
         (exact case, colour theme); the action card is the sentence
         without its phrase;
     (b) the model: exactly one phrase passes in levels 1–2 (the one for
         the card's stretch); exactly one stretch in level 3; level 4 —
         wrong cards come back, a stretch holds one card, the right plan
         passes; the hints, the glow and its stretch from miss 2;
     (c) balance 3/3/3 per level; the plan (every round once, never three
         alike, a fresh order); the rack shuffled with the right phrase in
         every slot once per stretch; the bot that picks the phrase in the
         slot under the card ≤ 3/9; always-during 3/9;
     (d) strings ×11, prose quotes, the manifest row.
   Usage: node scripts/verify-event-tunnel-core.js   (env ET_CORE_DIR / ET_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.ET_CORE_DIR || MT, ACT_DIR = process.env.ET_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'event-tunnel-core.js'));
const ACT = (() => { const ctx = { window: {}, EventTunnelCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'event-tunnel-activity.js'), 'utf8') + '\n;this.__A = window.EventTunnelActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* ---------------- the own tables ---------------- */
const TIME = {
  en: [/^before /, /^during /, /^after /], de: [/^vor (dem|der) /, /^während (des|der) /, /^nach (dem|der) /], fr: [/^avant /, /^pendant /, /^après /],
  es: [/^antes (del |de la )/, /^durante (el|la) /, /^después (del |de la )/], pt: [/^antes (do|da) /, /^durante (o|a) /, /^depois (do|da) /],
  it: [/^prima (del|della|dello) /, /^durante (il|la|lo) /, /^dopo (il|la|lo) /], nl: [/^voor /, /^tijdens /, /^na /], sv: [/^före /, /^under /, /^efter /],
  da: [/^før /, /^under /, /^efter /], no: [/^før /, /^under /, /^etter /], fi: [/^ennen \S+$/, /^\S+ aikana$/, /^\S+ jälkeen$/]
};
const noun = (loc, i, t) => {
  if (loc === 'fi') return t.replace(/^ennen /, '').replace(/ (aikana|jälkeen)$/, '');
  return t.replace(TIME[loc][i], '');
};
const agree = (loc, t) => {
  const [b, d, a] = t;
  if (loc === 'es') { const m = /^durante el /.test(d); return m ? /^antes del /.test(b) && /^después del /.test(a) : /^antes de la /.test(b) && /^después de la /.test(a); }
  if (loc === 'pt') { const m = /^durante o /.test(d); return m ? /^antes do /.test(b) && /^depois do /.test(a) : /^antes da /.test(b) && /^depois da /.test(a); }
  if (loc === 'it') { const art = d.split(' ')[1], pre = { il: 'del', la: 'della', lo: 'dello' }[art]; return /^prima /.test(b) && b.split(' ')[1] === pre && a.split(' ')[1] === art; }
  if (loc === 'de') { const art = b.split(' ')[1]; return a.split(' ')[1] === art && d.split(' ')[1] === (art === 'dem' ? 'des' : 'der'); }
  if (loc === 'fi') { const g1 = d.split(' ')[0], g2 = a.split(' ')[0]; return g1 === g2; }
  return true;
};
const PLACE4 = { b: 'b1', d: ['d1', 'd2'], a: 'a2' };
const PICS = new Set();

/* ---------------- (a) the phrases and sentences ---------------- */
for (const loc of ALL) {
  const D = C.DATA[loc];
  for (const e of Object.keys(D.ev)) {
    const t = D.ev[e].map(s => C.phrase(s).text);
    t.forEach((x, i) => is(TIME[loc][i].test(x), `${loc} ${e}: «${x}» opens with its time word`));
    if (loc !== 'de' && loc !== 'fi') { const n = t.map((x, i) => noun(loc, i, x)); is(n[0] === n[1] && n[1] === n[2], `${loc} ${e}: one event noun (${n.join(' / ')})`); }
    is(agree(loc, t), `${loc} ${e}: the three phrases agree (${t.join(' / ')})`);
    is(!/\bde el\b|\bde o\b|\bde a\b|\bdi il\b|\bdi la\b/.test(t.join(' ')), `${loc} ${e}: no unfused article`);
  }
  for (const lvl of C.levels()) {
    const counts = {};
    for (const r of C.rounds(lvl)) {
      const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`;
      if (rd.kind === 'plan') {
        rd.pics.forEach(p => { is(!!p, `${tag}: picture`); PICS.add(p); });
        const tg = rd.items.map(it => it.target);
        is(new Set(tg).size === 3 && tg.every(z => ['b1', 'd1', 'd2', 'a2'].indexOf(z) >= 0), `${tag}: three stretches, never after T1 / before T2 / between (${tg.join(' ')})`);
        rd.items.forEach(it => { const want = it.w === 'd' ? 'd' + (it.ev + 1) : PLACE4[it.w]; is(it.target === want && (it.w !== 'b' || it.ev === 0) && (it.w !== 'a' || it.ev === 1), `${tag}: «${C.fill(it.tpl, it.ph)}» → ${want}`); });
        continue;
      }
      PICS.add(rd.pic); counts[rd.stretch] = (counts[rd.stretch] || 0) + 1;
      const s = C.sentence(rd, rd.stretch), ph = rd.ph[C.WORDS.indexOf(rd.stretch)].text;
      is(s.indexOf(ph) > 0 && /^\p{Lu}/u.test(s) && /[.!]$/.test(s) && !/\s[.!]$/.test(s) && !/\s\s/.test(s), `${tag}: «${s}»`);
      is(C.cardText(rd.tpl).length > 1 && s.replace(ph, '').replace(/\s+/g, ' ').replace(/\s([.!])$/, '$1').replace(/[.!]$/, '').trim() === C.cardText(rd.tpl), `${tag}: the card «${C.cardText(rd.tpl)}» is the sentence without its phrase`);
    }
    if (lvl !== '4') is(counts.b === 3 && counts.d === 3 && counts.a === 3, `${loc} L${lvl}: 3 / 3 / 3 (${JSON.stringify(counts)})`);
  }
}
for (const p of PICS) { const d = p.slice(0, p.lastIndexOf('/')), f = p.slice(p.lastIndexOf('/') + 1); is(fs.readdirSync(IMG).includes(d) && fs.readdirSync(path.join(IMG, d)).includes(f + '@2x.webp'), `picture ${p} exists (exact case)`); is(!BW.test(d), `${p}: a colour theme`); }
is(C.DATA.PICS.lantern === 'camping/lantern' || !!C.DATA.PICS.lantern, 'the lantern picture');

/* ---------------- (b) the model ---------------- */
for (const loc of ALL) {
  for (const lvl of ['1', '2']) for (const r of C.rounds(lvl)) {
    const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`;
    const s0 = C.newState(loc, lvl, r); is(C.check(s0).result === 'empty' && s0.misses === 0 && C.hint(s0) === 'hintPick', `${tag}: nothing chosen is no miss`);
    let pass = 0;
    for (const w of C.WORDS) {
      const st = C.newState(loc, lvl, r); C.choose(st, w); const res = C.check(st);
      if (res.result === 'ok') { pass++; continue; }
      is(res.reason === 'lit-' + w && C.lit(st) === w && C.hint(st) === { b: 'missLitB', d: 'missLitD', a: 'missLitA' }[w] && !C.glow(st), `${tag}: ${w} → the lantern lights ${w}, its hint`);
      C.check(st); is(C.glow(st) && C.glowZone(st) === rd.stretch && C.hint(st) === 'missGlow', `${tag}: miss 2 → the card's stretch glows`);
      C.choose(st, rd.stretch); is(!C.glow(st) && C.check(st).result === 'ok', `${tag}: a new move takes the help away; the right phrase passes`);
    }
    is(pass === 1, `${tag}: exactly one phrase passes (${pass})`);
    const s2 = C.newState(loc, lvl, r); C.choose(s2, 'b'); is(C.choose(s2, 'b') === 'out' && s2.chosen === null, `${tag}: the same phrase again comes out`);
  }
  for (const r of C.rounds('3')) {
    const rd = C.round(loc, '3', r), tag = `${loc} L3.${r + 1}`;
    const s0 = C.newState(loc, '3', r); is(C.check(s0).result === 'empty' && C.hint(s0) === 'hintPlace', `${tag}: the card on the shelf is no miss`);
    let pass = 0;
    for (const z of rd.zones) { const st = C.newState(loc, '3', r); C.place(st, z); const res = C.check(st); if (res.result === 'ok') pass++; else { is(res.reason === 'place' && C.lit(st) === rd.stretch && C.hint(st) === 'missPlace', `${tag}: ${z} → the place hint, the lantern lights the sentence's stretch`); C.check(st); is(C.glowZone(st) === rd.stretch && C.hint(st) === 'missGlowPlace', `${tag}: miss 2 → the right stretch glows`); } }
    is(pass === 1, `${tag}: exactly one stretch passes (${pass})`);
    const s3 = C.newState(loc, '3', r); C.place(s3, 'b'); is(C.place(s3, 'b') === 'back' && s3.at === null, `${tag}: the same stretch again sends the card back`);
  }
  for (const r of C.rounds('4')) {
    const rd = C.round(loc, '4', r), tag = `${loc} L4.${r + 1}`, st = C.newState(loc, '4', r);
    C.pick(st, 0); C.put(st, rd.items[0].target); is(C.check(st).result === 'empty' && C.hint(st) === 'hintPlan', `${tag}: two cards on the shelf → the hint`);
    C.pick(st, 1); C.put(st, rd.items[0].target); is(st.at[0] === null && st.at[1] === rd.items[0].target, `${tag}: a stretch holds one card`);
    for (let k = 0; k < 3; k++) { C.pick(st, k); C.put(st, 'm'); }
    is(st.at.filter(x => x === 'm').length === 1, `${tag}: the between-stretch holds one card too`);
    const wrongs = [0, 1, 2].map(k => rd.zones.find(z => z !== rd.items[k].target && z !== 'm'));
    const s4 = C.newState(loc, '4', r); const used = new Set();
    for (let k = 0; k < 3; k++) { const z = rd.zones.filter(z => z !== rd.items[k].target && !used.has(z))[0]; used.add(z); C.pick(s4, k); C.put(s4, z); }
    const c1 = C.check(s4); is(c1.result === 'miss' && s4.at.every(x => x === null) && C.hint(s4) === 'missPlan', `${tag}: wrong cards come back`);
    used.clear(); for (let k = 0; k < 3; k++) { const z = rd.zones.filter(z => z !== rd.items[k].target && !used.has(z))[0]; used.add(z); C.pick(s4, k); C.put(s4, z); }
    C.check(s4); is(C.glowZone(s4) === rd.items[0].target && C.hint(s4) === 'missGlowPlan', `${tag}: miss 2 → the first loose card's stretch glows`);
    for (let k = 0; k < 3; k++) { C.pick(s4, k); C.put(s4, rd.items[k].target); }
    is(C.check(s4).result === 'ok' && C.okKey(rd) === 'okPlan', `${tag}: the right plan passes`);
    void wrongs;
  }
}

/* ---------------- (c) the plan and the bots ---------------- */
let seed = 23; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (const loc of ALL) for (const lvl of C.levels()) {
  let prev = null, bad = 0, rep = 0, posBotMax = 0; const slot = [0, 0, 0];
  for (let i = 0; i < 200; i++) {
    const P = C.plan(loc, lvl, rnd, prev), o = P.order, n = C.rounds(lvl).length;
    if (o.slice().sort((a, b) => a - b).join() !== C.rounds(lvl).join()) bad++;
    if (C.runs(loc, lvl, o)) bad++;
    if (prev && prev.join() === o.join() && n > 1) rep++; prev = o;
    if (lvl === '4') continue;
    let pos = 0;
    for (const r of o) { const rd = C.round(loc, lvl, r, P.trays[r]), at = rd.rack.indexOf(rd.stretch); slot[at]++; if (at === C.WORDS.indexOf(rd.stretch)) pos++; is(rd.rack.slice().sort().join() === 'a,b,d', `${loc} L${lvl}: the rack holds the three phrases`); }
    posBotMax = Math.max(posBotMax, pos);
  }
  is(bad === 0 && rep === 0, `${loc} L${lvl}: 200 plans — every round once, never three alike, a fresh order (${bad}/${rep})`);
  if (lvl !== '4' && lvl !== '3') {
    is(Math.max(...slot) === Math.min(...slot), `${loc} L${lvl}: the right phrase in every rack slot equally (${slot.join('/')})`);
    is(posBotMax <= 3, `${loc} L${lvl}: the bot that picks the phrase under the card wins at most ${posBotMax}/9`);
  }
  if (lvl !== '4') { const R = C.rounds(lvl).map(r => C.round(loc, lvl, r)); is(R.filter(rd => rd.stretch === 'd').length === 3, `${loc} L${lvl}: always-during wins 3/9`); }
}

/* ---------------- (d) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'event-tunnel-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'event-tunnel-core.js'), 'utf8');
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '');
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 40, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^miss|^ok|^t\d/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(['title', 'instruction', 'instrBubble', 'okBubble'].indexOf(k) >= 0 || /^[tl]\d$/.test(k) || /^where[BDAM]$/.test(k) || CSRC.indexOf("'" + k + "'") >= 0 || body.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /“([^”]+)”/g, it: /«([^»]+)»/g, nl: /‘([^‘’]+)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
const ID = 'tempo-day-plan.time-prepositions.l-1-1-i';
const norm = (s) => s.toLocaleLowerCase().replace(/[  ]/g, ' ').replace(/[.!?]$/, '').replace(/’/g, "'").trim();
for (const loc of ALL) {
  const pr = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose[ID];
  is(!!pr && ['about', 'practices', 'howToPlay', 'learningGoals'].every(k => Array.isArray(pr[k]) && pr[k].length >= 3), `${loc}: the prose entry`);
  const known = new Set(); for (const lvl of C.levels()) for (const r of C.rounds(lvl)) { const rd = C.round(loc, lvl, r); if (rd.kind === 'plan') rd.items.forEach(it => known.add(norm(C.fill(it.tpl, it.ph)))); else known.add(norm(C.sentence(rd, rd.stretch))); }
  const text = pr ? Object.values(pr).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map(m => norm(m[1]));
  is(qs.filter(x => known.has(x)).length >= 1, `${loc}: the prose quotes the activity (${qs.filter(x => known.has(x)).length} of ${qs.length})`);
  if (loc !== 'en') is(!/common core|L\.1\.1/i.test(text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'tempo-day-plan-activities.json'), 'utf8')).find(x => x.id === ID);
is(row && row.tool === 'event-tunnel-activity', 'the manifest row points at the event tunnel');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.page_title.en === "Tempo's Day Plan — Before, During, or After? (Grade 1)", 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ level: ['1', '2', '3', '4'], stretches: ['hide', 'show'], rounds: { '1': 9, '2': 9, '3': 9, '4': 3 } }), "the row's params mirror the core");
console.log(`verify-event-tunnel-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
