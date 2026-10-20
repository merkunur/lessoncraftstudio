#!/usr/bin/env node
/* =====================================================================
   verify-lacing-board-core.js — the gate for ACTIVITY #47, Snørebrettet
   (RF.K.2.B, no). It holds its OWN ground truth — the 30 words with their
   splits, pictures and levels typed out here — and checks the core
   against it and against approved-words-no.json + the picture labels:
     1. every word: split = oracle = approved-words-no.json, the picture
        exists, its no label is the word; never blåbær (the library
        blueberry reads as a ball), tannbørste or hanske (disputed seams);
     2. thread / decoy: EVERY threading sequence of distinct buttons up to
        n + 2 long — Stram! keeps exactly the longest right beginning, is
        right iff the lace spells the word, a right-but-short lace asks
        (no miss), decoys always come off; only the last button unthreads;
        miss 2 glows ONLY the next button;
     3. decoys: not in the word, a syllable of another pool word, never
        part of a bokmål word made with the word's buttons;
     4. count: six blank buttons; right iff one per syllable; too few → the
        last carries the rest; too many → the extras stay blank;
        counts 1×2 2×3 3×3 4×2;
     5. where the buttons lie (2,000 deals per level and layout): three or
        more syllables never in reading order, reversed, or on the
        nearest-next path from the knot; two: chance (0.35–0.65); the first
        syllable in the top-left cell ≤ 1/9 + 0.03;
     6. the hint ladder; 7. order, never-repeat; 8. strings (en + no, every
        key reached, no price word); 9. manifest (frozen fields).
   Usage: node scripts/verify-lacing-board-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.LC_CORE_DIR || MT, 'lacing-board-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };
const seeded = (k) => { let s = k >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };

/* ---------- the oracle ---------- */
const ORACLE = {
  klokke: 'klok-ke|around the house/clock', banan: 'ba-nan|fruits/banana', kjole: 'kjo-le|clothing/dress', kanin: 'ka-nin|animals/rabbit', panda: 'pan-da|animals/panda',
  tiger: 'ti-ger|animals/tiger', delfin: 'del-fin|animals/dolphin', 'snømann': 'snø-mann|winter/snowman', traktor: 'trak-tor|vehicles/tractor', solsikke: 'sol-sik-ke|flowers/sunflower',
  sommerfugl: 'som-mer-fugl|easter/butterfly', pingvin: 'ping-vin|animals/penguin', flaggermus: 'flag-ger-mus|animals/bat', 'sjøstjerne': 'sjø-stjer-ne|beach/starfish',
  paraply: 'pa-ra-ply|weather/umbrella', vannmelon: 'vann-me-lon|fruits/watermelon', helikopter: 'he-li-kop-ter|vehicles/helicopter', sjokolade: 'sjo-ko-la-de|easter/chocolate',
  gresskar: 'gress-kar|vegetables/pumpkin', 'jordbær': 'jord-bær|fruits/strawberry', gris: 'gris|animals/pig', skjorte: 'skjor-te|clothing/shirt', bokhylle: 'bok-hyl-le|furniture/bookcase',
  hund: 'hund|animals/dog', sykkel: 'syk-kel|vehicles/bicycle', edderkopp: 'ed-der-kopp|forest creatures/spider', alligator: 'al-li-ga-tor|reptiles and Amphibians/alligator',
  'fyrtårn': 'fyr-tårn|beach/lighthouse', kenguru: 'ken-gu-ru|zoo animals/kangaroo', motorsykkel: 'mo-tor-syk-kel|vehicles/motorcycle'
};
const LEVEL_WORDS = {
  thread: 'klokke banan kjole kanin panda tiger delfin snømann traktor solsikke',
  decoy: 'sommerfugl pingvin flaggermus sjøstjerne paraply vannmelon helikopter sjokolade gresskar jordbær',
  count: 'gris skjorte bokhylle hund sykkel edderkopp alligator fyrtårn kenguru motorsykkel'
};
const SPLIT = (k) => ORACLE[k].split('|')[0].split('-');
const AP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-no.json'), 'utf8')).entries;
const APPROVED = {}; AP.forEach(e => { APPROVED[e.word] = e; });
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
/* every bokmål word the library and the syllable list know — a decoy must never make one */
const NO_WORDS = new Set(AP.map(e => e.word).concat(
  /* real bokmål words a trick button once made, found in build and native review (neither list carries them) */
  ['merke', 'vannfugl', 'sommersol', 'pingvinfugl', 'solsikke', 'sommerfugl'])); Object.values(PIC).forEach(l => { if (l.no) { NO_WORDS.add(l.no[0].toLowerCase()); NO_WORDS.add(l.no[1].toLowerCase()); } });

/* 1. words */
const keys = Object.keys(C.WORDS);
is(keys.length === 30 && keys.every(k => ORACLE[k]) && Object.keys(ORACLE).every(k => C.WORDS[k]), `the core's words = the 30-word oracle (${keys.length})`);
keys.forEach(k => {
  const w = C.WORDS[k], [split, pic] = (ORACLE[k] || '|').split('|'), g = APPROVED[k], lab = PIC[w.pic] && PIC[w.pic].no && PIC[w.pic].no[0];
  is(w.syl.join('-') === split && w.pic === pic, `${k}: ${w.syl.join('-')} on ${w.pic} = oracle ${split} on ${pic}`);
  is(!!g && g.split.join('-') === split, `${k}: approved-words-no.json agrees (${g && g.split.join('-')})`);
  is(!!lab && lab.toLowerCase() === k, `${k}: picture ${w.pic} labelled "${lab}"`);
  is(exact(w.pic + '@2x.webp'), `${k}: picture exists`);
  is(!['bjørn', 'engel', 'gorilla'].includes(k), `${k}: never bjørn (the bear reads as a teddy — bamse), engel (said eng-el), gorilla (often ape)`);
  is(!['blåbær', 'tannbørste', 'hanske'].includes(k) && !/blueberry/.test(w.pic), `${k}: never blåbær (the blueberry reads as a ball), tannbørste or hanske (disputed seams)`);
});
for (const lv of Object.keys(LEVEL_WORDS)) is(C.rounds(lv).map(r => r.w.key).join(' ') === LEVEL_WORDS[lv], `${lv}: the level's words`);
is(C.LEVEL_KEYS.join() === 'thread,decoy,count', 'three levels');

/* 2. thread / decoy: every threading sequence */
const seqs = (ids, max) => { const out = [[]]; const go = (cur) => { if (cur.length >= max) return; for (const id of ids) if (!cur.includes(id)) { const nx = cur.concat(id); out.push(nx); go(nx); } }; go([]); return out; };
for (const lv of ['thread', 'decoy']) for (const r of C.rounds(lv)) {
  const syl = SPLIT(r.w.key), n = syl.length;
  for (const nd of lv === 'decoy' ? [0, 1, 2] : [0, 2]) {
    const base = C.newState(r, 0, { decoys: nd, rnd: seeded(7) });
    const want = lv === 'decoy' ? nd : 0;
    is(base.buttons.length === n + want && base.buttons.filter(b => b.s === -1).length === want, `${r.id} decoys ${nd}: ${n} word buttons + ${want} decoys`);
    is(base.buttons.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).map(b => b.text).join('-') === syl.join('-'), `${r.id}: the word's buttons carry its syllables`);
    if (nd !== want) continue;
    const ids = base.buttons.map(b => b.id), S = (id) => base.buttons.find(b => b.id === id).s;
    let checked = 0;
    for (const seq of seqs(ids, Math.min(n + 2, ids.length))) {
      const st = C.newState(r, 0, { decoys: nd, rnd: seeded(7) });
      seq.forEach(id => C.thread(st, id));
      const res = C.tighten(st);
      let pre = 0; while (pre < seq.length && S(seq[pre]) === pre) pre++;
      const word = seq.length === n && pre === n;
      checked++;
      if (!seq.length) { is(!res.right && st.misses === 0 && st.last.result === 'empty', `${r.id}: Stram! with nothing threaded asks`); continue; }
      if (word) { is(res.right && st.done, `${r.id} ${seq.map(S).join('')}: right`); continue; }
      is(!res.right && !st.done, `${r.id} ${seq.map(S).join('')}: not right`);
      if (pre === seq.length) { is(st.misses === 0 && st.last.result === 'more' && st.path.join() === seq.join(), `${r.id} ${seq.map(S).join('')}: a right beginning asks for more, no miss`); continue; }
      const popped = seq.slice(pre), dec = popped.filter(id => S(id) === -1).length;
      is(st.misses === 1 && st.path.join() === seq.slice(0, pre).join() && st.last.result === (dec ? 'decoy' : 'order') && st.last.decoys === dec && JSON.stringify(st.last.popped) === JSON.stringify(popped), `${r.id} ${seq.map(S).join('')}: the lace keeps ${pre}, the rest slips out (${st.path.length} kept, ${st.last.result})`);
      const nb = base.buttons.find(b => b.s === pre);
      is(st.last.next === (nb ? nb.id : null) && C.glow(st) === null, `${r.id} ${seq.map(S).join('')}: miss 1 glows nothing`);
    }
    is(checked > n, `${r.id} decoys ${nd}: ${checked} sequences checked`);
  }
  /* miss 2 glows only the next button; a move takes it away */
  const st = C.newState(r, 0, { decoys: lv === 'decoy' ? 1 : 0, rnd: seeded(3) }), byS = (s) => st.buttons.find(b => b.s === s).id;
  C.thread(st, byS(1)); C.tighten(st); C.thread(st, byS(1)); C.tighten(st);
  is(st.help === 2 && C.glow(st) === byS(0), `${r.id}: miss 2 glows the first syllable's button only`);
  C.thread(st, byS(0)); is(C.glow(st) === null, `${r.id}: a move takes the glow away`);
  if (n >= 3) { C.thread(st, byS(n - 1)); C.tighten(st); is(C.glow(st) === byS(1) && st.path.join() === byS(0), `${r.id}: after a kept beginning, the glow is on the NEXT button only`); }
  /* only the last threaded button comes off; a button threads once */
  const su = C.newState(r, 0, { rnd: seeded(5) }); const w = su.buttons.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).map(b => b.id);
  w.forEach(id => C.thread(su, id)); is(!C.thread(su, w[0]) && su.path.length === n, `${r.id}: a button threads once`);
  C.unthreadLast(su); is(su.path.join() === w.slice(0, n - 1).join(), `${r.id}: unthread takes the LAST button off`);
}

/* 3. decoys */
for (const r of C.rounds('decoy')) {
  const syl = SPLIT(r.w.key);
  is(r.decoys.length === 2 && r.decoys[0] !== r.decoys[1], `${r.id}: two different decoys`);
  is(!(r.w.key === 'pingvin' && r.decoys.includes('fugl')), `${r.id}: no "fugl" beside the penguin (a penguin IS a bird)`);
  for (const d of r.decoys) {
    is(!syl.includes(d), `${r.id}: decoy "${d}" is not a syllable of the word`);
    is(keys.some(k => k !== r.w.key && C.WORDS[k].syl.includes(d)), `${r.id}: decoy "${d}" is a syllable of another pool word`);
  }
  const parts = syl.concat(r.decoys), made = new Set();
  const build = (cur, left) => { if (cur.length > 1 && cur.some(x => r.decoys.includes(x))) made.add(cur.join('')); if (cur.length >= 4) return; left.forEach((x, i) => build(cur.concat(x), left.slice(0, i).concat(left.slice(i + 1)))); };
  build([], parts);
  const bad = [...made].filter(m => NO_WORDS.has(m) && m !== r.w.word);
  is(!bad.length, `${r.id}: no decoy + buttons makes a bokmål word (${bad.join(',')})`);
}

/* 4. count */
(() => {
  const count = {};
  for (const r of C.rounds('count')) {
    const syl = SPLIT(r.w.key), n = syl.length; count[n] = (count[n] || 0) + 1;
    const b = C.newState(r, 0, { rnd: seeded(1) });
    is(b.buttons.length === C.BLANKS && C.BLANKS === 6 && b.buttons.every(x => x.s === null && x.text === ''), `${r.id}: six blank buttons`);
    for (let k = 0; k <= 6; k++) {
      const st = C.newState(r, 0, { rnd: seeded(1) }); st.buttons.slice(0, k).forEach(x => C.thread(st, x.id));
      const res = C.tighten(st);
      if (k === 0) { is(!res.right && st.misses === 0 && st.last.result === 'empty', `${r.id}: nothing threaded asks`); continue; }
      if (k === n) { is(res.right && st.done, `${r.id} ${k}: right`); continue; }
      const want = []; for (let i = 0; i < k; i++) want.push(i < n ? [syl[i]] : []); if (k < n) want[k - 1] = syl.slice(k - 1);
      is(!res.right && st.misses === 1 && st.last.result === (k < n ? 'short' : 'long') && JSON.stringify(st.last.printed) === JSON.stringify(want) && st.last.blank === Math.max(0, k - n) && st.path.length === k,
        `${r.id} ${k}: ${k < n ? 'the last carries ' + want[k - 1].join('·') : (k - n) + ' blank, still threaded'} (${JSON.stringify(st.last.printed)})`);
    }
  }
  is(JSON.stringify(count) === '{"1":2,"2":3,"3":3,"4":2}', `count 1×2 2×3 3×3 4×2 (${JSON.stringify(count)})`);
})();

/* 5. where the buttons lie */
for (const lv of ['thread', 'decoy']) for (const row of [false, true]) {
  let two = 0, twoRo = 0, tl = 0, N = 0, bad = 0;
  const rnd = seeded(row ? 11 : 13);
  for (let t = 0; t < 200; t++) for (const r of C.rounds(lv)) {
    const st = C.newState(r, 0, { decoys: 1, row, rnd }), n = r.w.syl.length, ro = C.readingOrder(st), go = C.greedyOrder(st);
    const io = (o) => o.every((s, i) => s === i), rv = (o) => o.every((s, i) => s === o.length - 1 - i);
    N++;
    if (n >= 3 && (io(ro) || rv(ro) || io(go))) bad++;
    if (n === 2) { two++; if (io(ro)) twoRo++; }
    if (st.buttons.find(b => b.s === 0).cell === 0) tl++;
    if (!row) { const cells = st.buttons.map(b => b.cell); if (new Set(cells).size !== cells.length || cells.some(c => c < 0 || c > 8)) bad++; }
  }
  const tag = `${lv} ${row ? 'in a row' : 'scattered'}`;
  is(bad === 0, `${tag}: three or more syllables never in reading order, reversed, or on the nearest-next path; cells distinct (${bad})`);
  if (two) is(twoRo / two >= 0.35 && twoRo / two <= 0.65, `${tag}: two syllables in reading order at chance (${(twoRo / two).toFixed(3)})`);
  if (!row) is(tl / N <= 1 / 9 + 0.03, `${tag}: first syllable top-left ≤ 1/9 + 0.03 (${(tl / N).toFixed(3)})`);
  console.log(`  ${tag}: reading-order solves ${((twoRo) / N).toFixed(3)} of all rounds; first-top-left ${(tl / N).toFixed(3)}`);
}
/* the count level ignores the layout setting; the thread level ignores the decoys */
is(!C.newState(C.rounds('count')[0], 0, { row: true }).row, 'count: always scattered');

/* 6. hints */
(() => {
  const H = (lv, i, fn, o) => { const r = C.rounds(lv)[i], st = C.newState(r, 0, Object.assign({ rnd: seeded(2) }, o)); const by = (s) => st.buttons.find(b => b.s === s).id; fn(st, by); return C.hint(st); };
  is(H('thread', 0, (st) => C.tighten(st)) === 'hintThread', 'thread, nothing: hintThread');
  is(H('count', 0, (st) => C.tighten(st)) === 'hintCount', 'count, nothing: hintCount');
  is(H('thread', 9, (st, by) => { C.thread(st, by(0)); C.tighten(st); }) === 'hintMore', 'a right beginning: hintMore');
  is(H('thread', 9, (st, by) => { C.thread(st, by(0)); C.thread(st, by(2)); C.tighten(st); }) === 'hintHolds', 'kept a beginning: hintHolds');
  is(H('thread', 0, (st, by) => { C.thread(st, by(1)); C.tighten(st); }) === 'hintFirst', 'nothing kept: hintFirst');
  is(H('decoy', 0, (st, by) => { C.thread(st, by(-1)); C.tighten(st); }, { decoys: 1 }) === 'hintDecoy', 'a decoy: hintDecoy');
  is(H('decoy', 0, (st) => { st.buttons.filter(b => b.s === -1).forEach(b => C.thread(st, b.id)); C.tighten(st); }, { decoys: 2 }) === 'hintDecoy2', 'two decoys: hintDecoy2');
  is(H('thread', 0, (st, by) => { C.thread(st, by(1)); C.tighten(st); C.thread(st, by(1)); C.tighten(st); }) === 'hintNext', 'miss 2: hintNext');
  is(H('count', 9, (st) => { C.thread(st, st.buttons[0].id); C.tighten(st); }) === 'hintShort', 'count short: hintShort');
  is(H('count', 0, (st) => { C.thread(st, st.buttons[0].id); C.thread(st, st.buttons[1].id); C.tighten(st); }) === 'hintLong', 'count one too many: hintLong');
  is(H('count', 0, (st) => { for (let i = 0; i < 3; i++) C.thread(st, st.buttons[i].id); C.tighten(st); }) === 'hintLong2', 'count two too many: hintLong2');
  is(H('count', 9, (st) => { C.thread(st, st.buttons[0].id); C.tighten(st); C.thread(st, st.buttons[1].id); C.tighten(st); }) === 'hintClap', 'count miss 2: hintClap');
  is(H('count', 9, (st) => { C.thread(st, st.buttons[0].id); C.tighten(st); C.thread(st, st.buttons[1].id); }) === null, 'a move takes the help away');
})();

/* 7. order */
for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0, bad = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad && R.length >= 7, `${lv}: ${R.length} rounds, orders are permutations and never repeat the previous one`); }

/* 8. strings */
const A = (() => { const ctx = { window: {}, LacingBoardCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'lacing-board-activity.js'), 'utf8') + '\n;this.__A = LacingBoardActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.LC_CORE_DIR || MT, 'lacing-board-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'lacing-board-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) {
  is(!!A.strings[k].en && !!A.strings[k].no, `strings ${k}: en + no`);
  is(!/\bfree\b|gratis/i.test(A.strings[k].en + A.strings[k].no), `strings ${k}: no price word`);
  is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);
}

/* 9. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'lacing-board-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.bygg-ordet-av-stavelser.no.rf-k-2-b' && rows[0].tool === 'lacing-board-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show b1c66a74:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-lacing-board-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
