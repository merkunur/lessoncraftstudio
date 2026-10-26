#!/usr/bin/env node
/* =====================================================================
   verify-divider-case-core.js — the gate for ACTIVITY #129, The Divider
   Case (Cleo's Packing List, L.1.2.b; all 11 locales). Its OWN ground
   truth, written here independently of the core:
     · the rule table: which locales write a comma before the conjunction
       (en only — the serial comma of the frozen intro) and each locale's
       conjunction;
     · its own count of the pockets a set of commas makes (walls at the
       commas, and at the conjunction where it divides), so "every thing
       has one pocket" is decided twice;
     · its own euphony rule (es y → e before i-/hi-, it e → ed before e-).
   It asserts:
     (a) the data: every picture exists (exact case, colour theme) and has
         its label; 16 lists per locale (8 of three, 8 of four), 8 shelves
         of 8, 10 Level-3 starts; no thing twice in a list; lower case
         except German nouns; no punctuation inside an item; the sentence
         writes no space before a comma;
     (b) the model against the own rule, over EVERY comma set of every
         round (and of every 3- and 4-pick from every shelf): Pack passes
         iff the commas are the own required set; the squashed and empty
         pockets equal the own count; the reason and its hint; empty
         Pack and a short list are hints without a miss; the glow from
         miss 2 marks exactly the missing and the extra commas;
     (c) the bots: "a comma in every gap" and "a comma before the
         conjunction only" never pass; "a comma after every thing" passes
         every English list and no other; in Level 3 "leave it as it is"
         passes exactly one start of ten; the plan keeps the bands
         grouped, never repeats an order, shuffles the shelf;
     (d) strings ×11, prose quotes, the manifest row.
   Usage: node scripts/verify-divider-case-core.js   (env DC_CORE_DIR / DC_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.DC_CORE_DIR || MT, ACT_DIR = process.env.DC_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'divider-case-core.js'));
const ACT = (() => { const ctx = { window: {}, DividerCaseCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'divider-case-activity.js'), 'utf8') + '\n;this.__A = window.DividerCaseActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* ---------------- the own tables ---------------- */
const CONJ = { en: 'and', de: 'und', fr: 'et', es: 'y', pt: 'e', it: 'e', nl: 'en', sv: 'och', da: 'og', no: 'og', fi: 'ja' };
const SERIAL = { en: true };
/* the own required set: after every thing but the last two; before the conjunction only where the serial comma is the rule */
const need = (loc, n) => { const a = []; for (let k = 1; k <= n - 2; k++) a.push(k); if (SERIAL[loc]) a.push(n - 1); return a; };
/* the own pocket count: sockets 0..n (0 after the lead, k after thing k, n-1 before the conjunction, n after it) */
function ownPockets(loc, n, commas) {
  const on = new Set(commas), seq = []; seq.push(on.has(0) ? '|' : ''); for (let k = 1; k <= n - 1; k++) { seq.push('i'); seq.push(on.has(k) ? '|' : ''); }
  seq.push(SERIAL[loc] ? 'c' : '|'); seq.push(on.has(n) ? '|' : ''); seq.push('i');
  const pockets = [[]]; for (const x of seq) { if (x === '|') pockets.push([]); else if (x) pockets[pockets.length - 1].push(x); }
  const items = (p) => p.filter((x) => x === 'i').length;
  return { pockets, empty: pockets.filter((p) => items(p) === 0).length, squash: pockets.filter((p) => items(p) >= 2).length,
    cut: !!SERIAL[loc] && pockets.some((p) => p.includes('c') && p[p.length - 1] === 'c'), ok: pockets.every((p) => items(p) === 1) && !(SERIAL[loc] && pockets.some((p) => p.includes('c') && p[p.length - 1] === 'c')) };
}
const euph = (loc, w) => loc === 'es' && /^h?[ií]/i.test(w) && !/^hi[aeoáéó]/i.test(w) ? 'e' : loc === 'it' && /^[eè]/i.test(w) ? 'ed' : CONJ[loc];
const subsets = (m) => { const out = []; for (let b = 0; b < (1 << m); b++) { const a = []; for (let i = 0; i < m; i++) if (b & (1 << i)) a.push(i); out.push(a); } return out; };
const sameSet = (a, b) => a.length === b.length && a.slice().sort().join() === b.slice().sort().join();
const fresh = (loc, lvl, r) => C.newState(loc, lvl, r);

/* ---------------- (a) the data ---------------- */
const picOk = (p) => { const d = p.slice(0, p.lastIndexOf('/')), f = p.slice(p.lastIndexOf('/') + 1); return fs.readdirSync(IMG).includes(d) && fs.readdirSync(path.join(IMG, d)).includes(f + '@2x.webp') && !BW.test(d); };
for (const loc of ALL) {
  is(C.DATA[loc] && C.DATA[loc].conj === CONJ[loc], `${loc}: the conjunction is ${CONJ[loc]}`);
  is(C.divides(loc) === !SERIAL[loc], `${loc}: the conjunction ${SERIAL[loc] ? 'is a ribbon' : 'divides'}`);
  is(C.rounds('1', '34').length === 16 && C.rounds('1', '3').length === 8 && C.rounds('1', '4').length === 8 && C.rounds('2').length === 8 && C.rounds('3').length === 10, `${loc}: 16 / 8 / 8 lists, 8 shelves, 10 starts`);
  const check = (items, tag) => {
    is(new Set(items.map((x) => x.t.toLowerCase())).size === items.length, `${tag}: no thing twice`);
    items.forEach((x) => { is(picOk(x.pic), `${tag}: the picture ${x.pic} exists, in colour`); is(!/[,.;:!?]/.test(x.t), `${tag}: no punctuation in «${x.t}»`); is(loc === 'de' ? /^\p{Lu}/u.test(x.t) : !/^\p{Lu}/u.test(x.t), `${tag}: «${x.t}» ${loc === 'de' ? 'capitalised' : 'in lower case'}`); if (loc === 'fr') is(/^(des|du|de la|de l’) /.test(x.t), `${tag}: fr «${x.t}» carries its article`); });
  };
  C.rounds('1', '34').forEach((r) => { const rd = C.round(loc, '1', r); is(rd.items.length === (r < 8 ? 3 : 4), `${loc} L1.${r + 1}: band`); is(/^\p{Lu}/u.test(rd.lead), `${loc} L1.${r + 1}: the lead starts with a capital`); check(rd.items, `${loc} L1.${r + 1}`); });
  C.rounds('2').forEach((r) => { const rd = C.round(loc, '2', r); is(rd.shelf.length === 8, `${loc} L2.${r + 1}: eight pictures`); check(rd.shelf, `${loc} L2.${r + 1}`); });
  const s = fresh(loc, '1', 9); fill(s, need(loc, 4)); const txt = C.sentence(s);
  is(!/\s,/.test(txt) && /, /.test(txt) && /\.$/.test(txt), `${loc}: the sentence writes «word, word» and ends with a full stop («${txt}»)`);
}
function fill(st, commas) { commas.forEach((c) => C.toggle(st, c)); return st; }

/* ---------------- (b) the model against the own rule ---------------- */
for (const loc of ALL) {
  for (const n of [3, 4]) {
    for (const cs of subsets(n + 1)) {
      const res = C.pack(loc, n, cs), own = ownPockets(loc, n, cs), want = sameSet(cs, need(loc, n));
      if (res.ok !== want || own.ok !== want) is(false, `${loc} n=${n} commas ${JSON.stringify(cs)}: core ${res.ok}, own pockets ${own.ok}, own rule ${want}`); else PASS++;
      is(res.pockets.filter((p) => p.empty).length === own.empty, `${loc} n=${n} ${JSON.stringify(cs)}: empty pockets ${res.pockets.filter((p) => p.empty).length} = own ${own.empty}`);
      is(res.pockets.some((p) => p.split) === own.cut, `${loc} n=${n} ${JSON.stringify(cs)}: "and" cut from its thing — core ${res.pockets.some((p) => p.split)}, own ${own.cut}`);
      is(res.pockets.filter((p) => p.squash).length === own.squash, `${loc} n=${n} ${JSON.stringify(cs)}: squashed pockets ${res.pockets.filter((p) => p.squash).length} = own ${own.squash}`);
    }
    /* the reasons the hints name */
    const R = need(loc, n);
    is(C.pack(loc, n, R.filter((x) => x !== 1)).reason === 'squash', `${loc} n=${n}: a missing first comma → squash`);
    is(C.pack(loc, n, R.concat([0])).reason === 'lead', `${loc} n=${n}: a comma after the lead → the first pocket is empty`);
    if (SERIAL[loc]) { is(C.pack(loc, n, R.filter((x) => x !== n - 1)).reason === 'enLast', `${loc} n=${n}: no comma before and → the last two squashed`); is(C.pack(loc, n, R.concat([n])).reason === 'afterConj', `${loc} n=${n}: a comma after and → and cut off`); }
    else { is(C.pack(loc, n, R.concat([n - 1])).reason === 'beside', `${loc} n=${n}: a comma before ${CONJ[loc]} → the empty sliver`); is(C.pack(loc, n, R.concat([n])).reason === 'beside', `${loc} n=${n}: a comma after ${CONJ[loc]} → the empty sliver`); }
  }
  for (const r of C.rounds('1', '34')) {
    const rd = C.round(loc, '1', r), n = rd.items.length, tag = `${loc} L1.${r + 1}`;
    let st = fresh(loc, '1', r); is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', `${tag}: Pack with no comma → the hint, no miss`);
    st = fill(fresh(loc, '1', r), need(loc, n).filter((x) => x !== 1).concat([0])); C.check(st);
    is(st.misses === 1 && C.glow(st) == null && C.hint(st) === 'missLead', `${tag}: miss 1 names the left pocket, no glow`);
    C.check(st); const g = C.glow(st);
    is(st.misses === 2 && C.hint(st) === 'missGlow' && g && sameSet(g.missing, [1]) && sameSet(g.extra, [0]) && sameSet(g.right, need(loc, n).filter((x) => x !== 1)), `${tag}: miss 2 glows the missing and the extra comma`);
    C.toggle(st, 0); is(C.glow(st) == null && C.hint(st) == null, `${tag}: a move takes the help away`);
    st = fill(fresh(loc, '1', r), need(loc, n)); is(C.check(st).result === 'ok' && st.done, `${tag}: the right commas pack`);
    is(C.conj(st) === euph(loc, rd.items[n - 1].t), `${tag}: the conjunction before «${rd.items[n - 1].t}»`);
  }
  /* level 2: a short list is a hint; every 3- and 4-pick (in shelf order) packs with the own rule */
  for (const r of C.rounds('2')) {
    const tag = `${loc} L2.${r + 1}`, rd = C.round(loc, '2', r);
    let st = fresh(loc, '2', r); [0, 1].forEach((i) => C.pick(st, i)); is(C.check(st).result === 'few' && st.misses === 0 && C.hint(st) === 'hintFew', `${tag}: two things → the hint, no miss`);
    st = fresh(loc, '2', r); [0, 1, 2, 3, 4].forEach((i) => C.pick(st, i)); is(st.picks.length === 4, `${tag}: no more than four things`);
    let bad = 0, euBad = 0;
    for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) for (let c = 0; c < 8; c++) {
      if (a === b || b === c || a === c) continue;
      for (const d of [-1, 0, 1, 2, 3, 4, 5, 6, 7]) {
        if (d >= 0 && [a, b, c].includes(d)) continue;
        const picks = d < 0 ? [a, b, c] : [a, b, c, d]; if ((a * 7 + b * 3 + c + d) % 5) continue; /* a fifth of the space, every shelf */
        st = fresh(loc, '2', r); picks.forEach((i) => C.pick(st, i)); const n = picks.length;
        if (C.conj(st) !== euph(loc, rd.shelf[picks[n - 1]].t)) euBad++;
        fill(st, need(loc, n)); if (C.check(st).result !== 'ok') bad++;
      }
    }
    is(bad === 0 && euBad === 0, `${tag}: every list the child can make packs with the own rule (${bad} wrong, ${euBad} conjunctions)`);
    st = fresh(loc, '2', r); [2, 5, 7].forEach((i) => C.pick(st, i)); C.unpick(st, 5); is(st.picks.join() === '2,7' && st.commas.length === 0, `${tag}: a thing goes back to the shelf, the commas start over`);
  }
  /* level 3: the starts */
  let right = 0;
  for (const r of C.rounds('3')) {
    const rd = C.round(loc, '3', r), n = rd.items.length, st = fresh(loc, '3', r), isRight = sameSet(st.commas, need(loc, n));
    if (isRight) right++;
    is(isRight === (rd.shape === 'right'), `${loc} L3.${r + 1}: the ${rd.shape} start ${rd.shape === 'right' ? 'is' : 'is not'} right («${C.sentence(st)}»)`);
    if (rd.shape === 'extraLead' || rd.shape === 'extraLeadMissFirst') is(st.commas.includes(0), `${loc} L3.${r + 1}: the extra comma after the lead`);
    if (rd.shape === 'lastGap') is(SERIAL[loc] ? !st.commas.includes(n - 1) : st.commas.includes(n - 1), `${loc} L3.${r + 1}: the last gap is the mistake`);
  }
  is(right === 1, `${loc} L3: "leave it as it is" passes exactly one start of ten (${right})`);
}
/* euphony, directly (no shelf word needs it today, so a broken rule would otherwise pass) */
[['es', 'iguanas', 'e'], ['es', 'higos', 'e'], ['es', 'hielo', 'y'], ['es', 'hierbas', 'y'], ['es', 'peras', 'y'], ['it', 'elefanti', 'ed'], ['it', 'api', 'e'], ['it', 'pere', 'e'], ['pt', 'abelhas', 'e'], ['fr', 'ours', 'et']]
  .forEach(([loc, w, c]) => { is(C.conjFor(loc, w) === c && euph(loc, w) === c, `${loc}: «${C.conjFor(loc, w)} ${w}» (want «${c} ${w}»)`); });
/* ---------------- (c) the bots and the plan ---------------- */
for (const loc of ALL) {
  let every = 0, before = 0, after = 0;
  for (const r of C.rounds('1', '34')) {
    const n = C.round(loc, '1', r).items.length, all = []; for (let i = 0; i <= n; i++) all.push(i); const afterItems = []; for (let k = 1; k <= n - 1; k++) afterItems.push(k);
    if (C.pack(loc, n, all).ok) every++; if (C.pack(loc, n, [n - 1]).ok) before++; if (C.pack(loc, n, afterItems).ok) after++;
  }
  is(every === 0 && before === 0, `${loc}: "every gap" and "before the conjunction only" never pack (${every}, ${before})`);
  is(after === (SERIAL[loc] ? 16 : 0), `${loc}: "a comma after every thing" packs ${SERIAL[loc] ? 'every' : 'no'} list (${after})`);
  let rep = 0, mixed = 0, prev = null, shelf = 0;
  for (let k = 0; k < 100; k++) {
    const P = C.plan(loc, '1', '34', Math.random, prev); if (prev && P.order.join() === prev.join()) rep++; prev = P.order;
    if (P.order.slice(0, 8).some((r) => r >= 8)) mixed++;
    const Q = C.plan(loc, '2', '34', Math.random, null); if (Q.order.some((r) => Q.trays[r].join() === '0,1,2,3,4,5,6,7')) shelf++;
  }
  is(rep === 0 && mixed === 0, `${loc}: 100 plans — never the same order twice, three then four (${rep}/${mixed})`);
  is(shelf < 5, `${loc}: the shelf is shuffled (${shelf} plans kept the order)`);
}
/* ---------------- (d) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'divider-case-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'divider-case-core.js'), 'utf8');
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '');
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 34, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^miss|^ok|^t\d/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(['title', 'instruction', 'instrBubble', 'okBubble'].indexOf(k) >= 0 || /^l\d$|^t\d$|^lists|^walls/.test(k) || CSRC.indexOf("'" + k + "'") >= 0 || body.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /“([^”]+)”/g, it: /«([^»]+)»/g, nl: /‘([^‘’]+)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
const ID = 'cleo-packing-list.series-commas.l-1-2-b';
const norm = (s) => s.replace(/[  ]/g, ' ').replace(/’/g, "'").trim();
for (const loc of ALL) {
  const pr = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose[ID];
  is(!!pr && ['about', 'practices', 'howToPlay', 'learningGoals'].every((k) => Array.isArray(pr[k]) && pr[k].length >= 3), `${loc}: the prose entry`);
  const all = new Map();
  for (const r of C.rounds('1', '34')) { const n = C.round(loc, '1', r).items.length; for (const cs of subsets(n + 1)) { const st = fresh(loc, '1', r); fill(st, cs); all.set(norm(C.sentence(st)), sameSet(cs, need(loc, n))); } }
  const text = pr ? Object.values(pr).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map((m) => norm(m[1])).filter((q) => /\.$/.test(q));
  qs.forEach((q) => is(all.has(q), `${loc}: the prose quote «${q}» is a list of the rounds`));
  is(qs.some((q) => all.get(q) === true) && qs.some((q) => all.get(q) === false), `${loc}: the prose quotes a right list and a wrong one`);
  if (loc !== 'en') is(!/common core|L\.1\.2/i.test(text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'cleo-packing-list-activities.json'), 'utf8')).find((x) => x.id === ID);
is(row && row.tool === 'divider-case-activity', 'the manifest row points at the divider case');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.page_title.en === "Cleo's Packing List — Commas in a List (Grade 1)", 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ level: ['1', '2', '3'], lists: ['3', '4', '34'], walls: ['go', 'pack'], rounds: { '1': 16, '2': 8, '3': 10 } }), "the row's params mirror the core");
console.log(`verify-divider-case-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
