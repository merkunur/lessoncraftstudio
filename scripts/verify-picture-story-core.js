#!/usr/bin/env node
/* =====================================================================
   verify-picture-story-core.js — the gate of ACTIVITY #63, THE BOOKMARK
   (Fable's Picture Stories, RL.K.1, 11 locales). Its own ground truth:
     1. the gate's own answer table (round → story, kind, page in the
        3- and 4-page book, the picture, the place picture also accepted);
        every locale authors all 7 books × 4 pages, 20 questions and
        their answers; each phrase round's answering phrase sits exactly
        once in its story, on its page; its answer repeats that phrase
     2. one right answer: the set of right targets is computed by the gate
        (who / what = that picture on ANY page; where / when / why / feel =
        the phrase on its page, plus the place picture on that page;
        page questions = that page only) and must equal the core's, and
        the core's right() must agree with it on EVERY target of the book
     3. the books: every picture exists, colour, labelled, not refused,
        never Fable's own fox; the decoy objects (mitten, carrot, ball,
        hat) sit on ≥ 2 pages; every page has a phrase and an action; the
        pages of a book act differently (Caption has one solution); worn
        things are anchored to their wearer; things stay inside the scene
     4. answer pages 6/6/6 in the 3-page book; the order never repeats a
        book back to back, holds the answer pages evenly in each half of
        the pass (± 1) and never the previous order; Caption's sentences
        never in the book's own order
     5. the round: empty Check asks (no miss); a wrong mark is a miss and
        the bookmark comes back; miss 2 lifts the proving page and lights
        the caption words that repeat the question (or, when none do,
        says so differently); the right mark wins; Caption: a wrong page
        is a miss, a right one places the sentence, the last one wins
     6. strings × 11 (placeholders, nothing "free", fr narrow spaces),
        emphasis only on the page questions, no digit 0, sv/da/no name
        the bear Bruno; the manifest row, its mirror, the frozen en..nl
        metadata (hash), the new sv da no fi slugs, titles and intros
   Usage: node scripts/verify-picture-story-core.js  (PSC_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.PSC_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'picture-story-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, PictureStoryCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(fs.existsSync(path.join(DIR, 'picture-story-activity.js')) ? DIR : MT, 'picture-story-activity.js'), 'utf8') + '\nthis.__A = PictureStoryActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const STORIES = ['mitten', 'carrot', 'picnic', 'pig', 'owl', 'ball', 'hat'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['weather/sun', 'spring/sun', 'spring/rain', 'camping/pine_tree', 'camping/picnic_table', 'animals/wolf', 'forest creatures/wolf', 'weather/stormy', 'weather/cold', 'farm animals/duckling', 'birds 2/puffin', 'kitchen tools/pan'];
const FROZEN = '9151fcd2ed419efe4fc91271e8ebe537e7fbf763';
const low = (s) => String(s).normalize('NFC').toLocaleLowerCase();
/* the gate's own answer table: key → [story, kind, page (3-page), page (4-page), picture | place picture, book sizes it exists in] */
const ANSWERS = {
  mWho: ['mitten', 'thing', 1, 1, 'spring/bunny', '34'], mFound: ['mitten', 'thing', 3, 3, 'spring/robin', '34'], mWhere: ['mitten', 'phrase', 2, 2, 'camping/rock', '34'], mFirst: ['mitten', 'page', 1, 1, null, '34'],
  cWho: ['carrot', 'thing', 1, 1, 'forest creatures/mouse', '34'], cHelp: ['carrot', 'thing', 3, 3, 'forest creatures/hedgehog', '34'], cWhy: ['carrot', 'phrase', 2, 2, null, '34'], cLast: ['carrot', 'page', 3, 4, null, '34'],
  pDoing: ['picnic', 'phrase', 1, 1, null, '34'], pWhy: ['picnic', 'phrase', 2, 2, null, '34'], pFeel: ['picnic', 'phrase', 3, 3, null, '34'],
  gWhere: ['pig', 'phrase', 1, 1, 'spring/puddle', '34'], gWho: ['pig', 'thing', 2, 2, 'farm animals/duck', '34'],
  oWhen: ['owl', 'phrase', 1, 1, null, '34'], oAfter: ['owl', 'page', 3, 3, null, '3'],
  bWhere: ['ball', 'phrase', 2, 2, 'camping/lake', '34'], bMiddle: ['ball', 'page', 2, 2, null, '3'],
  hWho: ['hat', 'thing', 3, 3, 'winter/penguin', '34'],
  mAfter4: ['mitten', 'page', 4, 4, null, '4'], gEnd4: ['pig', 'page', 4, 4, null, '4']
};
const DECOYS = { mitten: 'accessories/mitten', carrot: 'vegetables/carrot', ball: 'toys/ball', hat: 'winter/hat' };

/* the library's names (the gate's own index) */
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const picOk = (p) => p && fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]) && !REFUSED.includes(p);
/* the gate's own caption parser */
const phrasesOf = (src) => { const out = []; const re = /\[([^\]#]+)(?:#(\w+))?\]/g; let m; while ((m = re.exec(src))) out.push({ t: m[1], key: m[2] || null }); return out; };
const plainOf = (src) => src.replace(/\[([^\]#]+)(?:#\w+)?\]/g, '$1');

/* 1 + 2 — text, answers, one right answer */
const T = C.DATA.TEXT;
for (const loc of LOCS) {
  const L = T[loc];
  is(L && STORIES.every(s => L.t[s] && Array.isArray(L.c[s]) && L.c[s].length === 4 && L.c[s].every(c => c && c.trim())), `${loc}: 7 titles and 7 × 4 captions`);
  is(Object.keys(ANSWERS).every(k => L.q[k] && L.q[k][0] && L.q[k][1]), `${loc}: 20 questions with answers`);
  is(L.q.cLast && L.q.cLast[2], `${loc}: the 4-page answer to "last"`);
  for (const s of STORIES) L.c[s].forEach((c, i) => {
    is(phrasesOf(c).length >= 1, `${loc} ${s} p${i + 1}: a markable phrase`);
    is(!/\[|\]/.test(plainOf(c)), `${loc} ${s} p${i + 1}: brackets balanced`);
  });
  for (const [key, [story, kind, p3, p4, pic, sizes]] of Object.entries(ANSWERS)) {
    const q = L.q[key];
    is((/\*\*/.test(q[0])) === (kind === 'page'), `${loc} ${key}: emphasis only on the page questions («${q[0]}»)`);
    if (kind === 'phrase') {
      const hits = []; L.c[story].forEach((c, i) => phrasesOf(c).forEach(f => { if (f.key === key) hits.push({ page: i + 1, t: f.t }); }));
      is(hits.length === 1 && hits[0].page === p3, `${loc} ${key}: the answering phrase sits once, on page ${p3} (${JSON.stringify(hits)})`);
      if (hits[0]) is(low(q[1]).includes(low(hits[0].t)) || low(hits[0].t).includes(low(q[1])), `${loc} ${key}: the answer «${q[1]}» repeats the phrase «${hits[0].t}»`);
    }
    for (const n of [3, 4]) {
      if (!sizes.includes(String(n))) { is(!C.askRounds(loc, n).some(r => r.key === key), `${loc} ${key}: not in the ${n}-page book`); continue; }
      const r = C.askRounds(loc, n).find(x => x.key === key);
      is(!!r && r.page === (n === 4 ? p4 : p3) && r.kind === kind, `${loc} ${key} @${n}: kind ${kind}, page ${n === 4 ? p4 : p3}`);
      if (!r) continue;
      const bk = C.book(loc, story, n), all = C.targets(bk), want = [];
      bk.pages.forEach(pg => {
        if (kind === 'page' && pg.i === (n === 4 ? p4 : p3)) want.push('p' + pg.i);
        pg.things.forEach(t => { if ((kind === 'thing' && t.pic === pic) || (kind === 'phrase' && pic && t.pic === pic && pg.i === p3)) want.push('t' + pg.i + '-' + t.i); });
        phrasesOf(T[loc].c[story][pg.i - 1]).forEach((f, k) => { if (kind === 'phrase' && f.key === key && pg.i === p3) want.push('f' + pg.i + '-' + k); });
      });
      is(want.length >= 1 && JSON.stringify(C.rightTargets(r, bk).slice().sort()) === JSON.stringify(want.slice().sort()), `${loc} ${key} @${n}: right targets ${want.join(',')} (core ${C.rightTargets(r, bk).join(',')})`);
      is(all.every(t => C.right(r, t) === want.includes(t.id)), `${loc} ${key} @${n}: right() agrees on every target`);
      if (kind === 'thing') is(bk.pages[p3 - 1].things.some(t => t.pic === pic), `${loc} ${key}: the picture is on its page ${p3}`);
      is(r.answer === (n === 4 && q[2] ? q[2] : q[1]), `${loc} ${key} @${n}: the answer shown is the authored one`);
    }
  }
}

/* 3 — the books */
for (const s of STORIES) {
  const sc = C.DATA.SCENES[s];
  is(sc.length === 4, `${s}: four pages`);
  const sig = sc.map(pg => pg.things.filter(t => t[4]).map(t => t[0] + ':' + t[4]).sort().join('|'));
  is(sig.every(x => x) && new Set(sig).size === 4 && new Set(sig.slice(0, 3)).size === 3, `${s}: every page acts, and differently (${sig.join(' / ')})`);
  sc.forEach((pg, i) => pg.things.forEach(t => {
    is(picOk(t[0]) && t[0] !== C.FABLE, `${s} p${i + 1}: ${t[0]} exists, colour, labelled, not refused, not Fable`);
    if (Array.isArray(t[5])) is(pg.things[t[5][0]] && pg.things[t[5][0]] !== t && t[5][1] > .4 && t[5][1] < 1, `${s} p${i + 1}: ${t[0]} worn by ${pg.things[t[5][0]] && pg.things[t[5][0]][0]}`);
  }));
  if (DECOYS[s]) is(sc.slice(0, 3).filter(pg => pg.things.some(t => t[0] === DECOYS[s])).length >= 2, `${s}: the decoy ${DECOYS[s]} sits on ≥ 2 pages`);
}
is(C.FABLE === 'forest creatures/fox' && picOk(C.FABLE), 'Fable is the library fox');
/* things inside the scene, at every layout */
for (const [W, n] of [[648, 3], [648, 4], [330, 3], [290, 4]]) {
  const L = C.layout(W, n);
  for (const s of STORIES) C.DATA.SCENES[s].slice(0, n).forEach((pg, i) => pg.things.forEach(t => {
    if (Array.isArray(t[5])) return;
    const w = Math.max(44, L.unit * t[3]), h = w, cx = t[1] / 100 * L.pageW, bot = t[2] / 100 * L.sceneH;
    is(cx - w / 2 >= -L.pageW * .08 && cx + w / 2 <= L.pageW * 1.08 && bot - h >= -L.sceneH * .08 && bot <= L.sceneH * 1.02, `@${W}/${n} ${s} p${i + 1}: ${t[0]} inside the scene`);
  }));
}

/* 4 — balance and order */
for (const loc of LOCS) {
  const R = C.askRounds(loc, 3), c = {}; R.forEach(r => { c[r.page] = (c[r.page] || 0) + 1; });
  is(R.length === 18 && c[1] === 6 && c[2] === 6 && c[3] === 6, `${loc}: 18 rounds, answer pages 6/6/6 (${JSON.stringify(c)})`);
  is(C.askRounds(loc, 4).length === 18 && C.capRounds(loc, 3).length === 7, `${loc}: 18 rounds in the 4-page book, 7 in Caption`);
}
for (const n of [3, 4]) {
  const R = C.askRounds('en', n);
  for (let seed = 0; seed < 300; seed++) {
    const o = C.order(R, C.seeded('o' + n + seed), null);
    is(o.length === R.length && new Set(o).size === R.length, `ask@${n}: order is a permutation`);
    is(o.every((i, q) => !q || R[o[q - 1]].story !== R[i].story), `ask@${n} seed ${seed}: never the same book twice in a row`);
    if (n === 3) { const h = o.length / 2; for (const half of [o.slice(0, h), o.slice(h)]) { const c = {}; half.forEach(i => { c[R[i].page] = (c[R[i].page] || 0) + 1; }); const v = [1, 2, 3].map(p => c[p] || 0); is(Math.max(...v) - Math.min(...v) <= 1, `ask@3 seed ${seed}: each half holds the answer pages evenly (${v})`); } }
    const o2 = C.order(R, C.seeded('o' + n + seed), o); is(o2.join() !== o.join(), `ask@${n}: never the previous order (the same random stream replayed)`);
  }
}
{ const R = C.capRounds('en', 3); for (let seed = 0; seed < 100; seed++) { const o = C.order(R, C.seeded('c' + seed), null); is(new Set(o).size === 7, 'caption: order is a permutation'); is(C.order(R, C.seeded('c' + seed), o).join() !== o.join(), 'caption: never the previous order'); } }
/* a place picture counts only on the answer's page: a second rock on page 1 must not answer "where did the mitten slip off?" */
{ const r = C.askRounds('en', 3).find(x => x.key === 'mWhere'), bk = C.book('en', 'mitten', 3);
  bk.pages[0].things.push({ i: 9, pic: 'camping/rock', x: 80, y: 94, s: .5, act: null, on: null, label: 'rock' });
  is(C.right(r, C.target(bk, 't1-9')) === false && C.right(r, C.target(bk, 't2-0')) === true, 'a place picture on another page is not the answer; on its page it is'); }
for (const n of [3, 4]) for (let seed = 0; seed < 200; seed++) { const s = C.sentenceOrder(n, C.seeded('s' + n + seed)); is(s.slice().sort().join() === [1, 2, 3, 4].slice(0, n).join() && s.join() !== [1, 2, 3, 4].slice(0, n).join(), `caption@${n}: sentences shuffled, never the book's own order (${s})`); }

/* 5 — the round */
for (const loc of LOCS) for (const n of [3, 4]) for (const r of C.askRounds(loc, n)) {
  const bk = C.book(loc, r.story, n), st = C.newAsk(r, bk), wrongs = C.targets(bk).filter(t => !C.right(r, t));
  let res = C.check(st); is(res.kase === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', `${loc} ${r.id}: empty Check asks, no miss`);
  C.mark(st, wrongs[0].id); res = C.check(st);
  is(!res.ok && st.misses === 1 && st.mark === null && !C.helpOf(st).curl && C.hint(st) === (r.kind === 'page' ? 'hintMissPage' : 'hintMiss'), `${loc} ${r.id}: a wrong mark is miss 1, the bookmark comes back`);
  C.mark(st, wrongs[wrongs.length - 1].id); C.check(st); const h = C.helpOf(st);
  const qw = low(r.question.text).replace(/[^\p{L}\p{N}’'-]+/gu, ' ').split(/\s+/).filter(w => [...w].length >= 4);
  const lit = r.kind === 'page' ? [] : low(bk.pages[r.page - 1].caption.text).replace(/[^\p{L}\p{N}’'-]+/gu, ' ').split(/\s+/).filter(w => [...w].length >= 4 && qw.some(q => q === w || [...q].slice(0, 4).join('') === [...w].slice(0, 4).join('')));
  is(st.misses === 2 && h.curl === r.page && JSON.stringify(h.words) === JSON.stringify(lit), `${loc} ${r.id}: miss 2 lifts page ${r.page} and lights ${JSON.stringify(lit)}`);
  is(C.hint(st) === (r.kind === 'page' || !lit.length ? 'hintMiss2Page' : 'hintMiss2'), `${loc} ${r.id}: miss-2 hint ${C.hint(st)}`);
  C.mark(st, wrongs[0].id); is(!C.helpOf(st), `${loc} ${r.id}: a move takes the help away`);
  C.mark(st, C.rightTargets(r, bk)[0]); res = C.check(st); is(res.ok && st.done, `${loc} ${r.id}: the right mark wins`);
}
for (const loc of ['en', 'fi']) for (const n of [3, 4]) for (const r of C.capRounds(loc, n)) {
  const bk = C.book(loc, r.story, n), ord = C.sentenceOrder(n, C.seeded(r.id)), st = C.newCap(r, bk, ord);
  let res = C.check(st); is(res.kase === 'empty' && st.misses === 0 && C.hint(st) === 'capEmpty', `${loc} ${r.id}: empty Check asks`);
  is(C.sentence(st) === bk.pages[ord[0] - 1].caption.text, `${loc} ${r.id}: the bookmark carries page ${ord[0]}'s sentence`);
  const wrong = ord[0] === 1 ? 2 : 1; C.mark(st, 'p' + wrong); res = C.check(st);
  is(!res.ok && res.kase === 'wrong' && st.misses === 1 && C.hint(st) === 'capMiss1', `${loc} ${r.id}: a wrong page is a miss`);
  C.mark(st, 'p' + wrong); C.check(st); is(C.helpOf(st).pulse === ord[0] && C.hint(st) === 'capMiss2', `${loc} ${r.id}: miss 2 pulses the right page`);
  for (let k = 0; k < n; k++) { is(C.mark(st, 'p' + ord[k]), `${loc} ${r.id}: sentence ${k + 1} slipped in`); res = C.check(st); is(k < n - 1 ? (res.kase === 'placed' && st.misses === 0) : (res.ok && st.done), `${loc} ${r.id}: sentence ${k + 1} placed${k === n - 1 ? ' — every page captioned' : ''}`); if (k < n - 1) is(!C.mark(st, 'p' + ord[k]), `${loc} ${r.id}: a captioned page takes no other sentence`); }
}

/* 6 — strings, manifest, metadata */
const S = A.strings, KEYS = Object.keys(S), N = ' ';
for (const k of KEYS) for (const loc of LOCS) {
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  is(typeof S[k][loc] === 'string' && S[k][loc].trim(), `strings.${k}.${loc} authored`);
  is(ph(S[k][loc]) === ph(S[k].en), `strings.${k}.${loc}: same placeholders as en`);
  is(!/\b(free|gratis|kostenlos|gratuit|gratuito|grátis|ilmainen|gratuita)\b/i.test(S[k][loc] || ''), `strings.${k}.${loc}: nothing "free"`);
  if (loc === 'fr') is(!/ [?!:;»]/.test(S[k][loc]), `strings.${k}.fr: narrow spaces before ? ! : ;`);
}
for (const loc of LOCS) {
  const all = [].concat(...STORIES.map(s => T[loc].c[s]), ...Object.values(T[loc].q).flat(), Object.values(T[loc].t));
  is(!all.some(x => /(^|\D)0(\D|$)/.test(x)), `${loc}: no 0 anywhere in the books`);
  if (loc === 'fr') is(!all.some(x => / [?!:;»]/.test(x)), 'fr: narrow spaces in the books');
  if (['sv', 'da', 'no'].includes(loc)) is(all.join(' ').includes('Bruno') && !/\bBen\b/.test(all.join(' ')), `${loc}: the bear is Bruno (Ben means leg or bone)`);
}
const M = JSON.parse(fs.readFileSync(path.join(MT, 'picture-story-activities.json'), 'utf8')).find(r => r.id === 'picture-story.read.rl-k-1');
is(M && M.tool === 'picture-story-activity' && M.task_template === 'picture-story', 'manifest row runs picture-story-activity');
is(M && M.alignment.code === 'RL.K.1' && M.alignment.grade === 'K', 'manifest alignment RL.K.1, grade K');
for (const loc of LOCS) {
  const want = { ask3: C.askRounds(loc, 3).length, ask4: C.askRounds(loc, 4).length, caption: C.capRounds(loc, 3).length };
  is(M && JSON.stringify(M.params.byLocale[loc]) === JSON.stringify(want), `manifest mirrors the core for ${loc}`);
  is(M && /^[a-z0-9-]+$/.test(M.slug[loc] || ''), `slug ${loc} url-safe`);
  is(M && M.page_title[loc] && M.page_intro[loc], `title and intro ${loc} present`);
  if (['sv', 'da', 'no', 'fi'].includes(loc)) is(!/gratis|ilmai|\bfree\b|uden login|utan inloggning|uten innlogging/i.test(M.page_title[loc] + ' ' + M.page_intro[loc]), `title and intro ${loc}: nothing "free"`);
}
is(M && new Set(Object.values(M.slug)).size === LOCS.length, 'eleven different slugs');
const FZ = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].map(l => [l, M.slug[l], M.page_title[l], M.page_intro[l]]);
is(crypto.createHash('sha1').update(JSON.stringify(FZ)).digest('hex') === FROZEN, 'frozen en de fr es pt it nl slugs, titles and intros unchanged');

console.log(`verify-picture-story-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
