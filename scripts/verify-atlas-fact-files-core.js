#!/usr/bin/env node
/* =====================================================================
   verify-atlas-fact-files-core.js — the gate of ACTIVITY #69, THE
   HIGHLIGHTER THAT LIFTS FACTS (Atlas's Fact Files, RI.K.1, 11 locales).
   Its own ground truth:
     1. Find the answer — the gate tokenizes every fact itself: both answer
        spans stand verbatim, once, in their own sentence (question 1 in
        sentence 1, question 2 in sentence 2) and never in the other; the
        frame has one gap; for EVERY possible highlight (every i ≤ j) the
        core's grade equals the gate's rule (right = ends on the span's last
        word and starts inside it; echo = the whole span plus more of the
        SAME sentence; else a miss); a pass (2,000 seeds) has the answer in
        sentence 1 in 4 or 5 of 9 facts and the next pass asks the other
        question of every fact; the order never repeats
     2. Fill the fact file — five sentences in heading order, each key
        detail verbatim once and never the first word; no sentence holds
        its own drawer label (babies may share a stem); every strip × every
        drawer: accepted iff it is the strip's drawer; the claims: two in
        the file, one not, and the false one's text is not in the file;
        judging accepted iff the side is the truth; the false claim's place
        3/2/2 over a pass of 7
     3. Word-bank file — every frame rebuilds its sentence (pre + answer +
        post); a tile fits only its own frame; the trap fits none and is not
        in the text; the tile deal never in the text's order, the trap never
        last; three picks finish with those sentences in pick order
     4. hints and miss-2 help by level; texts and strings × 11; no digit;
        fr narrow no-break spaces; pictures; floors; the manifest mirror,
        the frozen en..nl metadata, the new sv da no fi slug/title/intro
   Usage: node scripts/verify-atlas-fact-files-core.js  (AF_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.AF_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'atlas-fact-files-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, AtlasFactFilesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'atlas-fact-files-activity.js'), 'utf8') + '\nthis.__A = AtlasFactFilesActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const FROZEN = '57745b3d24701e7848db518e767bb0dff9d5d230';
const HEADINGS = ['eats', 'lives', 'moves', 'covered', 'babies'];
/* the gate's own reader: sentences split at . ! ? …; words split at spaces; compared without edge punctuation, lower case */
const gNorm = (w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '').toLowerCase();
const gSents = (t) => t.split(/(?<=[.!?…])\s+/);
const gWords = (t) => { const out = []; gSents(t).forEach((s, k) => s.split(/\s+/).filter(Boolean).forEach(w => out.push({ n: gNorm(w), s: k }))); return out; };
const gFind = (ws, span) => { const sp = span.split(/\s+/).map(gNorm), hits = []; for (let i = 0; i + sp.length <= ws.length; i++) if (sp.every((x, k) => ws[i + k].n === x)) hits.push(i); return hits; };
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const picOk = (p) => p && fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]);
const D = C.DATA, TX = D.TEXT;

/* 1 — Find the answer */
is(JSON.stringify(D.FACT_ORDER) === '["bees","frog","sun","penguin","spider","tree","cow","rain","owl"]', 'nine facts');
for (const loc of LOCS) for (const k of D.FACT_ORDER) {
  const F = TX[loc].facts[k], ws = gWords(F[0]);
  is(gSents(F[0]).length === 2, `${loc} ${k}: a two-sentence fact`);
  for (const q of [0, 1]) {
    const Q = F[1 + q], hits = gFind(ws, Q[2]), tag = `${loc} ${k} q${q + 1}`;
    is(hits.length === 1 && ws[hits[0]].s === q, `${tag}: «${Q[2]}» stands once, in sentence ${q + 1}`);
    is((Q[1].match(/___/g) || []).length === 1 && /\?\s*$/.test(Q[0].replace(/ /g, ' ')), `${tag}: a question and a frame with one gap`);
    if (hits.length !== 1) continue;
    const r = C.round(loc, 'find', k, q), a = hits[0], b = a + Q[2].split(/\s+/).length - 1;
    is(r.span && r.span[0] === a && r.span[1] === b && r.trap && ws[r.trap[0]].s === 1 - q, `${tag}: the core finds the span [${a},${b}] and the trap in the other sentence`);
    for (let i = 0; i < ws.length; i++) for (let j = i; j < ws.length; j++) {
      const want = (i >= a && j === b) ? 'right' : (i <= a && j >= b && ws[i].s === ws[b].s && ws[j].s === ws[b].s) ? 'echo' : 'miss';
      const got = C.gradeSpan(r, [i, j]);
      if (got !== want) is(false, `${tag}: highlight [${i},${j}] — core ${got}, gate ${want}`); else PASS++;
    }
    const st = C.newState(r); C.highlight(st, r.trap[0], r.trap[1]); const res = C.check(st);
    is(!res.ok && res.trap && res.card === C.frameFill(Q[1], C.words(r, r.trap)) && st.misses === 1, `${tag}: the other sentence's answer is a miss and the card reads it back`);
    const s2 = C.newState(r); C.highlight(s2, b, b); const ok = C.check(s2);
    is(ok.ok && ok.card === Q[1].replace('___', C.words(r, r.span)), `${tag}: the bare last word is right and the card reads the whole span («${ok.card}»)`);
  }
}
for (let seed = 0; seed < 2000; seed++) {
  const rnd = C.seeded('f' + seed), p0 = C.plan('en', 'find', rnd, 0, null), p1 = C.plan('en', 'find', rnd, 1, p0);
  const s1 = p0.filter(r => r.q === 0).length;
  is(p0.length === 9 && new Set(p0.map(r => r.key)).size === 9 && s1 >= 4 && s1 <= 5, `seed ${seed}: the answer in sentence 1 in 4 or 5 facts (${s1})`);
  is(p1.every(r => r.q === 1 - p0.find(x => x.key === r.key).q) && p1.map(r => r.key).join() !== p0.map(r => r.key).join() && p1[0].key !== p0[8].key, `seed ${seed}: the next pass asks the other question, a new order, not the fact just played first`);
}

/* 2 — Fill the fact file */
is(JSON.stringify(D.HEADINGS) === JSON.stringify(HEADINGS) && D.FILE_ORDER.length === 7, 'seven files, five headings');
for (const loc of LOCS) {
  const L = TX[loc];
  is(HEADINGS.every(h => L.labels[h]) && L.file && L.tray, `${loc}: drawer labels and claim targets`);
  for (const k of D.FILE_ORDER) {
    const Fi = L.files[k], tag = `${loc} ${k}`, all = Fi.s.map(x => x[0]).join(' ').toLowerCase();
    is(Fi.s.length === 5 && Fi.c.length === 3, `${tag}: five sentences, three claims`);
    Fi.s.forEach((x, h) => {
      const ws = gWords(x[0]), hits = gFind(ws, x[1]);
      is(hits.length === 1 && hits[0] > 0, `${tag} ${HEADINGS[h]}: «${x[1]}» stands once in «${x[0]}», not first`);
      if (HEADINGS[h] !== 'babies') is(!L.labels[HEADINGS[h]].toLowerCase().split(/\s+/).some(w => ws.some(t => t.n === w)), `${tag} ${HEADINGS[h]}: the sentence does not hold its drawer word «${L.labels[HEADINGS[h]]}»`);
    });
    is(new Set(Fi.s.map(x => x[1].toLowerCase())).size === 5, `${tag}: five different key details`);
    is(Fi.c.filter(c => c[1]).length === 2 && Fi.c.every(c => HEADINGS.includes(c[2])), `${tag}: two claims in the file, one not, each about a drawer`);
    /* the claim not in the file must say something the file does not: its own words (beyond those it shares with the true claims —
       the animal, the verb frame) must include one the text never uses */
    const f = Fi.c.find(c => !c[1]), textWords = new Set(gWords(Fi.s.map(x => x[0]).join(' ')).map(w => w.n)), trueWords = new Set(Fi.c.filter(c => c[1]).flatMap(c => gWords(c[0]).map(w => w.n)));
    const own = gWords(f[0]).map(w => w.n).filter(w => w && !trueWords.has(w));
    is(!all.includes(f[0].toLowerCase().replace(/[.!?]$/, '')) && own.length > 0 && own.some(w => !textWords.has(w)), `${tag}: the claim not in the file («${f[0]}») says something the text does not (${own})`);
    const r = C.round(loc, 'file', k);
    for (let s = 0; s < 5; s++) for (const h of HEADINGS) { const st = C.newState(r, {}); const res = C.file(st, s, h); is(!!(res && res.ok) === (HEADINGS[s] === h), `${tag}: strip ${s + 1} → ${h} ${HEADINGS[s] === h ? 'files' : 'slides back'}`); }
    { const st = C.newState(r, {}); for (let s = 0; s < 5; s++) C.file(st, s, HEADINGS[s]);
      is(st.phase === 'claims' && !st.done, `${tag}: five strips filed — the claims open`);
      st.claims.forEach((ci) => { const c = r.claims[ci]; const bad = C.judge(st, !c.truth); is(bad && !bad.ok && st.misses === 1 && C.hint(st) === 'hintClaim', `${tag}: «${c.text}» on the wrong side — a miss`); const good = C.judge(st, c.truth); is(good && good.ok, `${tag}: «${c.text}» ${c.truth ? 'in the file' : 'not in the file'}`); });
      is(st.done && st.phase === 'done', `${tag}: three claims judged — the file is full`); }
  }
}
for (let fa = 0; fa < 3; fa++) { const r = C.round('en', 'file', 'rabbit'), d = C.deal(r, C.seeded('c' + fa), fa); is(!r.claims[d.claims[fa]].truth && d.claims.length === 3 && new Set(d.claims).size === 3, `the claim not in the file is dealt at place ${fa + 1}`); }
{ const c = [0, 0, 0]; [0, 1, 2, 0, 1, 2, 1].forEach(x => c[x]++); is(c.join() === '2,3,2', 'the false-claim places over a pass of 7 are 2/3/2'); }
is(/\[0, 1, 2, 0, 1, 2, 1\]/.test(fs.readFileSync(path.join(MT, 'atlas-fact-files-activity.js'), 'utf8')), 'the activity deals the false claim at places 1,2,3,1,2,3,2 over a pass');

/* 3 — Word-bank file */
for (const loc of LOCS) for (const k of D.FILE_ORDER) {
  const r = C.round(loc, 'bank', k), tag = `${loc} ${k} bank`;
  r.frames.forEach((f, i) => { const re = (f.pre ? f.pre + ' ' : '') + f.answer + (f.post ? ((/^[\p{L}\p{N}]/u.test(f.post) ? ' ' : '') + f.post) : ''); is(re === r.sents[i].text && f.answer.replace(/[^\p{L}\p{N}]+$/u, '') === f.answer, `${tag} ${i + 1}: the frame rebuilds «${r.sents[i].text}»`); });
  is(!r.sents.map(s => s.text).join(' ').toLowerCase().includes(r.trap.toLowerCase()) && !r.sents.some(s => s.detail.toLowerCase() === r.trap.toLowerCase()), `${tag}: the trap «${r.trap}» is not in the text`);
  for (let t = 0; t < 6; t++) for (let f = 0; f < 5; f++) { const st = C.newState(r, {}); const res = C.place(st, t, f); is(!!(res && res.ok) === (t === f), `${tag}: tile ${t} → frame ${f}`); }
  const st = C.newState(r, {}); for (let f = 0; f < 5; f++) C.place(st, f, f);
  is(st.phase === 'pick', `${tag}: five tiles placed — pick three`);
  C.pick(st, 3); C.pick(st, 1); C.pick(st, 1); C.pick(st, 0); C.pick(st, 4);
  is(st.done && JSON.stringify(C.summary(st)) === JSON.stringify([3, 0, 4].map(i => r.sents[i].text)), `${tag}: a pick taken back is undone; three picks write those sentences in pick order`);
  for (let s = 0; s < 60; s++) { const d = C.deal(r, C.seeded(tag + s)); is(d.tiles.length === 6 && new Set(d.tiles).size === 6 && d.tiles[5] !== 5 && d.tiles.join() !== '0,1,2,3,4,5', `${tag} seed ${s}: the tiles shuffled, the trap never last`); if (s > 8) break; }
}

/* 4 — hints, help, texts, strings, floors, manifest */
{
  const r = C.round('en', 'find', 'penguin', 1), st = C.newState(r);
  is(C.hint(st) === null && C.check(st).reason === 'empty' && C.hint(st) === 'emptyHL' && st.misses === 0, 'find: an empty check is no miss');
  C.highlight(st, 0, 1); C.check(st); is(C.hint(st) === 'hintRead' && C.helpOf(st) === null, 'find miss 1 → hintRead');
  C.highlight(st, 0, 1); C.check(st); const h = C.helpOf(st);
  is(C.hint(st) === 'hintSign' && h.sentence === 1 && h.sign === r.span[0] - 1 && r.toks[h.sign].n === 'lives', 'find miss 2 → the answer sentence bright, the gold signpost is the word before the answer');
  const f = C.round('en', 'file', 'hen'), s2 = C.newState(f, {}); C.file(s2, 0, 'lives'); is(C.hint(s2) === 'hintDrawer' && C.helpOf(s2) === null, 'file miss 1 → hintDrawer'); C.file(s2, 0, 'moves'); is(C.hint(s2) === 'hintDrawer2' && C.helpOf(s2).drawer === 'eats', 'file miss 2 → the right drawer glows');
  const b = C.round('en', 'bank', 'owl'), s3 = C.newState(b, {}); C.place(s3, 5, 0); is(C.hint(s3) === 'hintTile', 'bank miss 1 → hintTile'); C.place(s3, 5, 1); is(C.hint(s3) === 'hintTrap' && C.helpOf(s3).trap, 'bank miss 2 with the trap → hintTrap'); C.place(s3, 2, 0); C.place(s3, 2, 1); is(C.hint(s3) === 'hintTile2' && C.helpOf(s3).frame === 2, 'bank miss 2 → the right sentence glows');
}
for (const loc of LOCS) { const strs = []; (function walk(v) { if (typeof v === 'string') strs.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); })(TX[loc]); const all = strs.join(' '); is(!/\d/.test(all), `${loc}: no digits in the texts`); if (loc === 'fr') is(!/ [?!:;»]|« /.test(all), 'fr: non-breaking spaces before ? ! : ; and inside « »'); }
for (const [k, v] of Object.entries(A.strings)) for (const loc of LOCS) is(typeof v[loc] === 'string' && v[loc].trim(), `string ${k}: ${loc}`);
for (const p of [C.ATLAS, ...Object.values(D.FACTS), ...Object.values(D.FILES)]) is(picOk(p), `${p} exists, colour, labelled`);
is(C.layout(704).pic >= 96 && C.layout(704).atlas >= 96 && C.layout(704).cover >= 96 && C.layout(360).pic >= 64 && C.layout(316).atlas >= 64 && C.layout(290).pic >= 64, 'the floors: 96 at 704, 64 on a phone');
{
  const row = JSON.parse(fs.readFileSync(path.join(MT, 'atlas-fact-files-activities.json'), 'utf8'))[0];
  const h = crypto.createHash('sha1').update(JSON.stringify(['slug', 'page_title', 'page_intro'].map(k => ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].map(l => row[k][l])))).digest('hex');
  is(h === FROZEN, `the frozen en..nl metadata is untouched (${h})`);
  is(row.tool === 'atlas-fact-files-activity' && !row.params.rounds && !row.params.roundsL10n, 'the row runs the highlighter core, its params a mirror');
  for (const loc of LOCS) for (const v of C.LEVELS) is(row.params.byLocale[loc][v] === C.plan(loc, v, C.seeded('m'), 0, null).length, `mirror ${loc} ${v}`);
  for (const loc of ['sv', 'da', 'no', 'fi']) is(row.slug[loc] && /^[a-z0-9-]+$/.test(row.slug[loc]) && row.page_title[loc] && row.page_intro[loc], `${loc}: slug, title, intro`);
}
console.log(`verify-atlas-fact-files-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
