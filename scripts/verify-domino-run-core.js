#!/usr/bin/env node
/* =====================================================================
   verify-domino-run-core.js — the gate for ACTIVITY #50, La fila de
   fichas (RF.K.2.B, es). It holds its OWN ground truth — the 30 words
   with their splits and pictures, the gaps, candidates and trick
   dominoes typed out here — and checks the core against it and against
   approved-words-es.json + the picture labels:
     1. every word: split = oracle = approved-words-es.json (accents and
        güi kept); the picture exists and its es label is the word; never
        sapo (the library has no toad);
     2. Completa: the gap as the table (first ×2, middle ×6, last ×2);
        candidates = the answer + another syllable OF THE SAME WORD + a
        foreign syllable of another pool word; EVERY candidate on the gap
        — right only for the answer; an empty gap stops the run (never a
        miss); the wrong domino bounces back; miss 2 → hintListen;
        "always the left candidate" ≤ 0.4;
     3. Ordena: EVERY arrangement of distinct dominoes on the marks, with
        and without the trick domino — right only in word order; every
        in-place domino stays, the others bounce; a trick domino always
        bounces; a missing domino stops the run; miss 2 pins the first
        syllable; the box never starts in word order nor reversed (three or
        more); two syllables at chance; the trick domino is not a syllable
        of the word and never spells a pool word;
     4. ¿Cuántas fichas?: 0–6 blanks — right iff one per syllable; too few
        → the last throws the rest; too many → the extras throw nothing;
        counts 1×2 2×3 3×3 4×1 5×1;
     5. the run: fall intervals strictly shrink, fallen overlaps strictly
        shrink, marks spread depends only on n;
     6. hints; 7. order; 8. strings (en + es, reached, no price word);
        9. manifest (frozen fields).
   Usage: node scripts/verify-domino-run-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.DRN_CORE_DIR || MT, 'domino-run-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };
const seeded = (k) => { let s = k >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };

/* ---------- the oracle ---------- */
const ORACLE = {
  mesa: 'me-sa|furniture/table', luna: 'lu-na|space/moon', pelota: 'pe-lo-ta|toys/ball', jirafa: 'ji-ra-fa|animals/giraffe', mariposa: 'ma-ri-po-sa|insects and bugs/butterfly',
  girasol: 'gi-ra-sol|flowers/sunflower', bicicleta: 'bi-ci-cle-ta|vehicles/bicycle', elefante: 'e-le-fan-te|animals/elephant', 'helicóptero': 'he-li-cóp-te-ro|vehicles/helicopter', conejo: 'co-ne-jo|animals/rabbit',
  gato: 'ga-to|animals/cat', casa: 'ca-sa|miscellaneous/house', faro: 'fa-ro|beach/lighthouse', 'avión': 'a-vión|vehicles/airplane', guante: 'guan-te|accessories/glove',
  tortuga: 'tor-tu-ga|animals/turtle', paraguas: 'pa-ra-guas|weather/umbrella', manzana: 'man-za-na|fruits/apple', calabaza: 'ca-la-ba-za|vegetables/pumpkin', zanahoria: 'za-na-ho-ria|vegetables/carrot',
  sol: 'sol|beach/sun', tigre: 'ti-gre|animals/tiger', caracol: 'ca-ra-col|forest creatures/snail', flor: 'flor|spring/flower', 'delfín': 'del-fín|animals/dolphin',
  caballo: 'ca-ba-llo|animals/horse', 'murciélago': 'mur-cié-la-go|animals/bat', tractor: 'trac-tor|vehicles/tractor', 'pingüino': 'pin-güi-no|animals/penguin', 'hipopótamo': 'hi-po-pó-ta-mo|animals/hippopotamus'
};
const COMPLETE = { mesa: [1, 'me', 'lo'], luna: [0, 'na', 'fa'], pelota: [1, 'ta', 'za'], jirafa: [1, 'fa', 'ne'], mariposa: [2, 'ma', 'cle'], girasol: [2, 'gi', 'ta'], bicicleta: [0, 'ta', 'jo'], elefante: [2, 'le', 'po'], 'helicóptero': [2, 'ro', 'na'], conejo: [1, 'co', 'fan'] };
const ORDER = { gato: 'mur', casa: 'del', faro: 'vión', 'avión': 'cle', guante: 'tu', tortuga: 'bi', paraguas: 'za', manzana: 'ba', calabaza: 'ho', zanahoria: 'go' };
const COUNT = 'sol tigre caracol flor delfín caballo murciélago tractor pingüino hipopótamo';
const SPLIT = (k) => ORACLE[k].split('|')[0].split('-');
const AP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-es.json'), 'utf8')).entries;
const APPROVED = {}; AP.forEach(e => { APPROVED[e.word] = e; });
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
/* every pictured word of the pool — a candidate or a trick domino must never spell one by accident */
const POOL = new Set(Object.keys(ORACLE).concat(
  /* real Spanish words a stone combination made, found in review (the pool does not carry them) */
  ['tortura', 'perita', 'toca', 'aro', 'gasa', 'saca']));

/* 1. words */
const keys = Object.keys(C.WORDS);
is(keys.length === 30 && keys.every(k => ORACLE[k]) && Object.keys(ORACLE).every(k => C.WORDS[k]), `the core's words = the 30-word oracle (${keys.length})`);
keys.forEach(k => {
  const w = C.WORDS[k], [split, pic] = (ORACLE[k] || '|').split('|'), g = APPROVED[k], lab = PIC[w.pic] && PIC[w.pic].es && PIC[w.pic].es[0];
  is(w.syl.join('-') === split && w.pic === pic, `${k}: ${w.syl.join('-')} on ${w.pic} = oracle ${split} on ${pic}`);
  is(!!g && g.split.join('-') === split, `${k}: approved-words-es.json agrees (${g && g.split.join('-')})`);
  is(!!lab && lab.toLowerCase() === k, `${k}: picture ${w.pic} labelled "${lab}"`);
  is(exact(w.pic + '@2x.webp'), `${k}: picture exists`);
  is(k !== 'sapo' && !/toad/.test(w.pic), `${k}: never sapo — the library has no toad`);
  is(k !== 'pez', `${k}: never pez in the oral count — many Mexican children say «pescado»`);
});
for (const [k, acc] of [['avión', 'vión'], ['delfín', 'fín'], ['helicóptero', 'cóp'], ['murciélago', 'cié'], ['hipopótamo', 'pó'], ['pingüino', 'güi']]) is(C.WORDS[k].syl.includes(acc), `${k}: the tile keeps "${acc}"`);
is(C.LEVEL_KEYS.join() === 'complete,order,count', 'three levels');

/* 2. Completa */
(() => {
  const pos = { first: 0, middle: 0, last: 0 };
  for (const r of C.rounds('complete')) {
    const syl = SPLIT(r.w.key), n = syl.length, [gap, same, foreign] = COMPLETE[r.w.key] || [];
    is(r.gap === gap && r.same === same && r.foreign === foreign, `${r.id}: gap ${gap}, candidates ${syl[gap]} · ${same} · ${foreign}`);
    pos[gap === 0 ? 'first' : gap === n - 1 ? 'last' : 'middle']++;
    is(syl.includes(same) && same !== syl[gap], `${r.id}: "${same}" is another syllable of ${r.w.key}`);
    is(!syl.includes(foreign) && keys.some(k => k !== r.w.key && C.WORDS[k].syl.includes(foreign)), `${r.id}: "${foreign}" is foreign — a syllable of another pool word`);
    for (const cand of [same, foreign]) { const made = syl.map((s, i) => i === gap ? cand : s).join(''); is(!POOL.has(made), `${r.id}: "${cand}" on the gap does not spell a pool word (${made})`); }
    const st0 = C.newState(r, 0, { rnd: seeded(1) });
    is(st0.marks.length === n && st0.marks[gap] === null && st0.marks.filter(Boolean).length === n - 1 && st0.box.length === 3, `${r.id}: ${n - 1} fixed dominoes, the gap empty, three candidates in the box`);
    let res = C.push(st0); is(!res.right && st0.misses === 0 && st0.last.result === 'empty', `${r.id}: ¡Empuja! with the gap untouched asks`);
    for (const id of ['a', 'b', 'c']) {
      const st = C.newState(r, 0, { rnd: seeded(2) });
      is(C.stand(st, id) && st.marks[gap] === id, `${r.id}: ${id} stands on the gap`);
      const fixedMark = gap === 0 ? 1 : 0;
      is(!C.stand(st, 'd' + fixedMark, gap) && !C.unstand(st, fixedMark) && !C.stand(st, id === 'c' ? 'b' : 'c', fixedMark) && st.marks[fixedMark] === 'd' + fixedMark, `${r.id}: a fixed domino never moves, and nothing stands on its mark`);
      res = C.push(st);
      if (id === 'a') { is(res.right && st.done, `${r.id}: the answer — right`); continue; }
      is(!res.right && st.misses === 1 && st.last.result === (id === 'b' ? 'same' : 'foreign') && st.marks[gap] === null && st.box.includes(id) && JSON.stringify(st.last.fallen) === JSON.stringify(syl.map((s, i) => i === gap ? (id === 'b' ? same : foreign) : s)), `${r.id}: ${id} falls into the row, then bounces back (${st.last && st.last.result})`);
    }
    /* swapping candidates on the gap; an empty gap is never a miss */
    const sw = C.newState(r, 0, { rnd: seeded(3) }); C.stand(sw, 'b'); C.stand(sw, 'c');
    is(sw.marks[gap] === 'c' && sw.box.includes('b'), `${r.id}: a second candidate on the gap sends the first back`);
    const m2 = C.newState(r, 0, { rnd: seeded(4) }); C.stand(m2, 'b'); C.push(m2); C.stand(m2, 'c'); C.push(m2);
    is(m2.help === 2 && C.hint(m2) === 'hintListen', `${r.id}: miss 2 — listen`);
    C.stand(m2, 'a'); is(C.hint(m2) === null, `${r.id}: a move takes the help away`);
  }
  is(pos.first === 2 && pos.middle === 6 && pos.last === 2, `gaps first ×2, middle ×6, last ×2 (${JSON.stringify(pos)})`);
  let left = 0, N = 0; const rnd = seeded(41);
  for (let t = 0; t < 300; t++) for (const r of C.rounds('complete')) { const st = C.newState(r, 0, { rnd }); N++; if (st.box[0] === 'a') left++; }
  is(left / N <= 0.4, `"always the left candidate" ${(left / N).toFixed(3)} ≤ 0.4`);
  console.log(`  complete: left candidate ${(left / N).toFixed(3)}`);
})();

/* 3. Ordena: every arrangement */
const arrangements = (ids, n) => { const out = []; const go = (cur, left) => { if (cur.length === n) { out.push(cur); return; } left.forEach((x, i) => go(cur.concat(x), left.slice(0, i).concat(left.slice(i + 1)))); }; go([], ids); return out; };
for (const r of C.rounds('order')) {
  const syl = SPLIT(r.w.key), n = syl.length;
  is(r.decoy === ORDER[r.w.key], `${r.id}: the trick domino is "${ORDER[r.w.key]}"`);
  is(!syl.includes(r.decoy) && keys.some(k => k !== r.w.key && C.WORDS[k].syl.includes(r.decoy)), `${r.id}: "${r.decoy}" is not in the word, and is a syllable of another pool word`);
  for (const dec of [false, true]) {
    const base = C.newState(r, 0, { decoy: dec, rnd: seeded(7) });
    is(base.marks.length === n && base.marks.every(x => x === null) && base.box.length === n + (dec ? 1 : 0), `${r.id} trick ${dec}: ${n} empty marks, ${n + (dec ? 1 : 0)} dominoes in the box`);
    const S = (id) => base.dominoes.find(d => d.id === id).s, ids = base.dominoes.map(d => d.id);
    let checked = 0;
    for (const arr of arrangements(ids, n)) {
      const st = C.newState(r, 0, { decoy: dec, rnd: seeded(7) }); arr.forEach((id, i) => C.stand(st, id, i));
      const res = C.push(st), right = arr.every((id, i) => S(id) === i); checked++;
      const made = arr.map(id => base.dominoes.find(d => d.id === id).text).join('');
      if (dec && arr.some(id => S(id) === -1)) is(!POOL.has(made), `${r.id}: the trick domino never spells a pool word (${made})`);
      if (right) { is(res.right && st.done, `${r.id} ${arr.map(S).join('')}: right`); continue; }
      const stay = arr.map((id, i) => S(id) === i ? i : -1).filter(i => i >= 0), bounced = arr.map((id, i) => S(id) === i ? -1 : i).filter(i => i >= 0);
      is(!res.right && st.misses === 1 && st.last.result === (arr.some((id, i) => bounced.includes(i) && S(id) === -1) ? 'decoy' : 'order') && JSON.stringify(st.last.stay) === JSON.stringify(stay) && stay.every(i => st.marks[i] === arr[i]) && bounced.every(i => st.marks[i] === null && st.box.includes(arr[i])),
        `${r.id} ${arr.map(S).join('')}: ${stay.length} stay, ${bounced.length} bounce`);
    }
    is(checked === arrangements(ids, n).length && checked >= 2, `${r.id} trick ${dec}: all ${checked} arrangements checked`);
  }
  /* a missing domino stops the run; miss 2 pins the first syllable */
  const sp = C.newState(r, 0, { rnd: seeded(8) }); C.stand(sp, 'd0', 0);
  let res = C.push(sp); is(!res.right && sp.misses === 0 && sp.last.result === 'stop' && sp.last.stoppedAt === 1, `${r.id}: a missing domino stops the run at the gap (no miss)`);
  const m2 = C.newState(r, 0, { rnd: seeded(9) }), wrong = [...Array(n).keys()].map(i => 'd' + ((i + 1) % n));
  wrong.forEach((id, i) => C.stand(m2, id, i)); C.push(m2); wrong.forEach((id, i) => C.stand(m2, id, i)); C.push(m2);
  is(m2.help === 2 && m2.marks[0] === 'd0' && m2.pinned.includes(0) && !C.unstand(m2, 0) && C.hint(m2) === 'hintFirst', `${r.id}: miss 2 — the first syllable stands itself on the first mark, pinned`);
}
for (const dec of [false, true]) {
  let bad = 0, two = 0, twoIn = 0, ltr = 0, first = 0, N = 0; const rnd = seeded(dec ? 51 : 53);
  for (let t = 0; t < 200; t++) for (const r of C.rounds('order')) {
    const st = C.newState(r, 0, { decoy: dec, rnd }), n = r.w.syl.length, seq = st.box.map(id => C.domino(st, id).s).filter(s => s >= 0);
    const io = seq.every((s, i) => s === i), rv = seq.every((s, i) => s === n - 1 - i);
    N++; if (n >= 3 && (io || rv)) bad++; if (n === 2 && !dec) { two++; if (io) twoIn++; } if (C.domino(st, st.box[0]).s === 0) first++;
    st.box.slice(0, n).forEach((id, i) => C.stand(st, id, i)); if (C.push(st).right) ltr++;
  }
  const tag = `order, trick ${dec ? 'on' : 'off'}`;
  is(bad === 0, `${tag}: three or more dominoes never start in word order nor reversed (${bad})`);
  if (two) is(twoIn / two >= 0.35 && twoIn / two <= 0.65, `${tag}: two syllables in word order at chance (${(twoIn / two).toFixed(3)})`);
  console.log(`  ${tag}: box order solves ${(ltr / N).toFixed(3)}; first box domino = first syllable ${(first / N).toFixed(3)}`);
}

/* 4. ¿Cuántas fichas? */
(() => {
  const count = {};
  is(C.rounds('count').map(r => r.w.key).join(' ') === COUNT, 'count: the level\'s words');
  for (const r of C.rounds('count')) {
    const syl = SPLIT(r.w.key), n = syl.length; count[n] = (count[n] || 0) + 1;
    for (let k = 0; k <= 7; k++) {
      const st = C.newState(r, 0); let laid = 0; for (let i = 0; i < k; i++) if (C.standBlank(st)) laid++;
      is(laid === Math.min(k, 6), `${r.id}: ${k} taps stand ${Math.min(k, 6)} blanks (never more than six)`);
      if (k > 6) continue;
      const res = C.push(st);
      if (k === 0) { is(!res.right && st.misses === 0 && st.last.result === 'empty', `${r.id}: nothing standing asks`); continue; }
      if (k === n) { is(res.right && st.done, `${r.id} ${k}: right`); continue; }
      const want = []; for (let i = 0; i < k; i++) want.push(i < n ? [syl[i]] : []); if (k < n) want[k - 1] = syl.slice(k - 1);
      is(!res.right && st.misses === 1 && st.last.result === (k < n ? 'short' : 'long') && JSON.stringify(st.last.printed) === JSON.stringify(want), `${r.id} ${k}: ${k < n ? 'the last throws ' + want[k - 1].join('·') : (k - n) + ' throw nothing'}`);
    }
  }
  is(JSON.stringify(count) === '{"1":2,"2":3,"3":3,"4":1,"5":1}', `counts 1×2 2×3 3×3 4×1 5×1 (${JSON.stringify(count)})`);
})();

/* 5. the run */
for (let n = 2; n <= 6; n++) { const iv = C.intervals(n); is(iv.every((d, i) => i === 0 || d < iv[i - 1]) && iv[0] === 260 && iv[n - 1] === 120, `${n} dominoes: the fall interval shrinks 260 → 120 (${iv})`); }
for (let n = 3; n <= 6; n++) { const ov = C.overlaps(n); is(ov.length === n - 1 && ov.every((d, i) => i === 0 || d < ov[i - 1]) && ov[0] === 20 && ov[n - 2] === 4, `${n} tiles: each lands closer — overlap ${ov}`); }
for (let n = 1; n <= 6; n++) { const a = C.spread(n, 0, 600); is(a.every((x, i) => i === 0 || Math.abs((x - a[i - 1]) - 600 / n) < 1e-9), `${n} marks spread evenly (depends only on n)`); }
for (const W of [288, 328, 380, 648, 656]) { const L = C.layout(W), xs = C.spread(6, L.x0, L.x1); is(xs[1] - xs[0] >= L.dw + 2 && L.dw >= 44, `@${W}: six dominoes ≥ 44 px never touch`); }

/* 6. hints */
(() => {
  const H = (lv, i, fn, o) => { const st = C.newState(C.rounds(lv)[i], 0, Object.assign({ rnd: seeded(6) }, o)); fn(st); return C.hint(st); };
  is(H('complete', 0, (st) => C.push(st)) === 'hintGap', 'complete, nothing: hintGap');
  is(H('complete', 4, (st) => { C.stand(st, 'b'); C.push(st); }) === 'hintSame', 'complete, a same-word syllable: hintSame');
  is(H('complete', 4, (st) => { C.stand(st, 'c'); C.push(st); }) === 'hintForeign', 'complete, a foreign syllable: hintForeign');
  is(H('order', 5, (st) => C.push(st)) === 'hintOrder', 'order, nothing: hintOrder');
  is(H('order', 5, (st) => { C.stand(st, 'd0', 0); C.push(st); }) === 'hintStop', 'order, a missing domino: hintStop');
  is(H('order', 5, (st) => { C.stand(st, 'd0', 0); C.stand(st, 'd2', 1); C.stand(st, 'd1', 2); C.push(st); }) === 'hintStay', 'order, wrong order: hintStay');
  is(H('order', 5, (st) => { C.stand(st, 'd0', 0); C.stand(st, 'x', 1); C.stand(st, 'd2', 2); C.push(st); }, { decoy: true }) === 'hintDecoy', 'order, the trick domino: hintDecoy');
  is(H('count', 0, (st) => C.push(st)) === 'hintCount', 'count, nothing: hintCount');
  is(H('count', 2, (st) => { C.standBlank(st); C.push(st); }) === 'hintShort', 'count short: hintShort');
  is(H('count', 0, (st) => { C.standBlank(st); C.standBlank(st); C.push(st); }) === 'hintLong', 'count one too many: hintLong');
  is(H('count', 0, (st) => { for (let i = 0; i < 3; i++) C.standBlank(st); C.push(st); }) === 'hintLong2', 'count two too many: hintLong2');
  is(H('count', 2, (st) => { C.standBlank(st); C.push(st); C.standBlank(st); C.standBlank(st); C.standBlank(st); C.push(st); }) === 'hintClap', 'count miss 2: hintClap');
})();

/* 7. order */
for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0, bad = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad && R.length >= 7, `${lv}: ${R.length} rounds, orders are permutations and never repeat the previous one`); }

/* 8. strings */
const A = (() => { const ctx = { window: {}, DominoRunCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'domino-run-activity.js'), 'utf8') + '\n;this.__A = DominoRunActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.DRN_CORE_DIR || MT, 'domino-run-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'domino-run-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) {
  is(!!A.strings[k].en && !!A.strings[k].es, `strings ${k}: en + es`);
  is(!/\bfree\b|gratis|gratuit/i.test(A.strings[k].en + A.strings[k].es), `strings ${k}: no price word`);
  is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);
}

/* 9. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'domino-run-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.forma-las-silabas.rf-k-2-b' && rows[0].tool === 'domino-run-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 5369f86b:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-domino-run-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
