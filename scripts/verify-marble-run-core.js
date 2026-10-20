#!/usr/bin/env node
/* =====================================================================
   verify-marble-run-core.js — the gate for ACTIVITY #53, Tavukuularata
   (RF.K.2.B, fi). It holds its OWN ground truth — the 34 words with
   their splits and pictures, the three level tables, the decoys, the
   Tavuvahti wrong splits and the vowel list are typed out here — and
   checks the core against it, against approved-words-fi.json and the
   picture labels:
     1. words: split = oracle = approved-words-fi.json (ä ö kept); the
        picture exists, is a colour theme, its fi label is the word; all
        28 words of the old row kept (read from git);
     2. the step: consonants before the first vowel (a e i o u y ä ö),
        capped at 2 — the gate's own rule; in EVERY right split, every
        syllable after the first has a step ≤ 1 (the tavutus rule);
     3. Tavuvahti: each wrong split joins to the word, keeps a double
        consonant together, and every wrong piece after the first has a
        step of 2 (so the marble cannot climb it); native words only;
     4. the decoys: a real syllable of another word, never one of the
        round's; Houkutuspala ei → none (Tavuvahti keeps its pieces);
     5. the ride: EVERY ordered arrangement of every subset of the
        round's pieces laid from place 1 — the marble lands only in word
        order; a step of 2 after the first piece stops it there; the
        kind of miss (step > another piece > too short > order); a gap
        before the last piece = it falls; an empty place 1 asks; nothing
        on the track asks (no miss);
     6. the tray: three or more a derangement, two at chance, the extra
        pieces at uniform places;
     7. the hand: place / swap / remove; a move takes the ride and the
        help away; miss 2 → the shadow track; the first wrong letter;
     8. hints; 9. order; 10. strings (en + fi, reached, no price word);
        11. manifest (frozen).
   Usage: node scripts/verify-marble-run-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.TMR_CORE_DIR || MT, 'marble-run-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };
const seeded = (k) => { let s = k >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
/* consecutive seeds give correlated first draws in an LCG (the measured 0.430 on every two-piece round was the instrument) — hash the seed and drop the first draws */
const mixed = (k) => { const r = seeded(Math.imul(k + 1, 2654435761) >>> 0); for (let i = 0; i < 8; i++) r(); return r; };

/* ---------- the oracle ---------- */
const ORACLE = {
  kuu: 'kuu|space/moon', 'vyö': 'vyö|clothing/belt', talo: 'ta-lo|miscellaneous/house', auto: 'au-to|vehicles/car', koira: 'koi-ra|animals/dog', karhu: 'kar-hu|camping/bear',
  kala: 'ka-la|animals/fish', juna: 'ju-na|toys/train', siili: 'sii-li|forest creatures/hedgehog', laiva: 'lai-va|vehicles/ship', seepra: 'seep-ra|animals/zebra',
  aurinko: 'au-rin-ko|beach/sun', hevonen: 'he-vo-nen|farm animals/horse', omena: 'o-me-na|fruits/apple', banaani: 'ba-naa-ni|fruits/banana', enkeli: 'en-ke-li|christmas/angel',
  perhonen: 'per-ho-nen|insects and bugs/butterfly', tiikeri: 'tii-ke-ri|animals/tiger', sateenvarjo: 'sa-teen-var-jo|weather/umbrella', lumiukko: 'lu-mi-uk-ko|winter/snowman',
  mansikka: 'man-sik-ka|fruits/strawberry', 'linnunpönttö': 'lin-nun-pönt-tö|spring/birdhouse', sateenkaari: 'sa-teen-kaa-ri|weather/rainbow', auringonkukka: 'au-rin-gon-kuk-ka|flowers/sunflower',
  kissa: 'kis-sa|animals/cat', kukka: 'kuk-ka|summer/flower', pallo: 'pal-lo|toys/ball', kakku: 'kak-ku|4th of July/cake', kello: 'kel-lo|christmas/bell',
  porkkana: 'pork-ka-na|vegetables/carrot', 'kynttilä': 'kynt-ti-lä|christmas/candle', kilpikonna: 'kil-pi-kon-na|animals/turtle', kettu: 'ket-tu|animals/fox', sukka: 'suk-ka|accessories/sock'
};
const LEVELS = {
  short: { kuu: 'ku:kakku', 'vyö': 'vo:hevonen', talo: 'la:kala', auto: 'ko:aurinko', koira: 'ri:tiikeri', karhu: 'ka:kala', kala: 'lo:talo', juna: 'nun:linnunpönttö', siili: 'lu:lumiukko', laiva: 'li:siili', seepra: 'sa:sateenvarjo' },
  long: { aurinko: 'kon:kilpikonna', hevonen: 'ho:perhonen', omena: 'mi:lumiukko', banaani: 'na:porkkana', enkeli: 'kel:kello', perhonen: 'vo:hevonen', tiikeri: 'ti:kynttilä', sateenvarjo: 'kaa:sateenkaari', lumiukko: 'lo:talo', mansikka: 'kuk:kukka', 'linnunpönttö': 'ni:banaani', sateenkaari: 'var:sateenvarjo', auringonkukka: 'ko:aurinko' },
  guard: { kissa: 'ki-ssa', kukka: 'ku-kka', pallo: 'pa-llo', kakku: 'ka-kku', kello: 'ke-llo', porkkana: 'por-kka-na', 'kynttilä': 'kyn-tti-lä', kilpikonna: 'kil-pi-ko-nna', kettu: 'ke-ttu', sukka: 'su-kka' }
};
/* native words (or fully nativised) — the only words the tavutus level may use */
const NATIVE = ['kissa', 'kukka', 'pallo', 'kakku', 'kello', 'porkkana', 'kynttilä', 'kilpikonna', 'kettu', 'sukka'];
/* the old row's words with a true picture (pannukakku out: the library pancake is a stack of letut) */
const LEGACY = 'kuu vyö kissa kukka pallo talo auto koira kakku kello karhu seepra aurinko hevonen omena banaani enkeli perhonen tiikeri kynttilä porkkana sateenvarjo kilpikonna lumiukko linnunpönttö sateenkaari auringonkukka'.split(' ');
const SINGLE = (s) => s.replace(/(.)\1+/g, '$1');
const V = 'aeiouyäö';
const STEP = (t) => { let n = 0; for (const ch of t) { if (V.includes(ch)) break; n++; } return Math.min(2, n); };
const SPLIT = (k) => ORACLE[k].split('|')[0].split('-');
const AP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-fi.json'), 'utf8')).entries;
const APPROVED = {}; AP.forEach(e => { APPROVED[e.word] = e; });
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* 1. words */
const keys = Object.keys(C.WORDS);
is(keys.length === 34 && keys.every(k => ORACLE[k]) && Object.keys(ORACLE).every(k => C.WORDS[k]), `the core's words = the 34-word oracle (${keys.length})`);
keys.forEach(k => {
  const w = C.WORDS[k], [split, pic] = (ORACLE[k] || '|').split('|'), g = APPROVED[k], lab = PIC[w.pic] && PIC[w.pic].fi && PIC[w.pic].fi[0];
  is(w.syl.join('-') === split && w.pic === pic, `${k}: ${w.syl.join('-')} on ${w.pic} = oracle ${split} on ${pic}`);
  is(!!g && g.split.join('-') === split, `${k}: approved-words-fi.json agrees (${g && g.split.join('-')})`);
  is(!!lab && lab.toLowerCase() === k, `${k}: picture ${w.pic} labelled "${lab}"`);
  is(exact(w.pic + '@2x.webp') && !BW.test(w.pic.split('/')[0]), `${k}: picture exists, colour theme`);
  /* 2. the tavutus rule holds in every right split */
  is(w.syl.every((s, i) => i === 0 || STEP(s) <= 1), `${k}: every syllable after the first starts with at most one consonant (${w.syl.map(STEP).join(',')})`);
});
LEGACY.forEach(k => is(!!C.WORDS[k], `the old row's ${k} is kept`));
is(C.WORDS.karhu.pic !== 'forest creatures/bear' && C.WORDS.kakku.pic !== 'bakery/cake', 'karhu is not the teddy-like forest bear; kakku is a whole cake, not the bakery slice');
is(!C.WORDS.pannukakku && !C.WORDS.vene, 'never pannukakku (the pancake is a stack of letut) nor vene (every boat has a cabin: laiva)');
for (const t of ['kuu', 'au', 'kis', 'ssa', 'pönt', 'tö', 'ä', 'kynt', 'nna', 'str', 'y', 'öö', 'sp']) is(C.stepOf(t) === STEP(t), `stepOf("${t}") = ${STEP(t)}`);

/* levels */
is(C.LEVEL_KEYS.join() === 'short,long,guard', 'three levels');
const all = [];
for (const lv of C.LEVEL_KEYS) {
  const R = C.rounds(lv);
  is(R.map(r => r.w.key).join() === Object.keys(LEVELS[lv]).join(), `${lv}: the level's words = the oracle`);
  R.forEach(r => {
    all.push(r.w.key); const syl = SPLIT(r.w.key), n = syl.length;
    if (lv === 'short') is(n <= 2, `${r.id}: one or two syllables`);
    if (lv === 'long') is(n >= 3 && n <= 5, `${r.id}: three to five syllables`);
    if (lv === 'guard') {
      /* 3. Tavuvahti */
      const bad = LEVELS.guard[r.w.key].split('-');
      is(NATIVE.includes(r.w.key), `${r.id}: a native word`);
      is(JSON.stringify(r.wrong) === JSON.stringify(bad) && bad.join('') === r.w.word && bad.join('-') !== syl.join('-'), `${r.id}: the wrong split ${bad.join('-')} joins to ${r.w.word}`);
      is(bad.some((s, i) => i > 0 && /^([^aeiouyäö])\1/.test(s)), `${r.id}: the wrong split keeps a double consonant together`);
      const extra = bad.filter(s => !syl.includes(s));
      is(JSON.stringify(r.extra) === JSON.stringify(extra), `${r.id}: the extra pieces = the wrong split's pieces not in the right split (${extra.join(' ')})`);
      is(bad.some((s, i) => i > 0 && STEP(s) === 2 && extra.includes(s)), `${r.id}: the wrong split always holds a piece the marble cannot climb (${extra.filter(s => STEP(s) === 2).join(' ')})`);
      const st = C.newState(r, 0, { decoy: false }); is(st.pieces.length === n + extra.length, `${r.id}: Houkutuspala ei does not remove the wrong split`);
    } else {
      /* 4. the decoys */
      const [dt, ds] = LEVELS[lv][r.w.key].split(':'), g = APPROVED[ds];
      is(r.decoy.text === dt && r.decoy.src === ds, `${r.id}: decoy = the oracle`);
      is(ds !== r.w.key && !syl.includes(dt) && !!g && g.split.includes(dt), `${r.id}: decoy "${dt}" is a syllable of ${ds}, not of ${r.w.key}`);
      is(C.newState(r, 0, { decoy: false }).pieces.length === n && C.newState(r, 0).pieces.length === n + 1, `${r.id}: Houkutuspala ei / kyllä`);
    }
  });
}
is(all.length === 34 && new Set(all).size === 34, 'every word in exactly one level');

/* 5. the ride: every arrangement laid from place 1 */
const arrangements = (ids) => { const out = []; const rec = (pre, rest) => { if (pre.length) out.push(pre); rest.forEach((x, i) => rec(pre.concat([x]), rest.slice(0, i).concat(rest.slice(i + 1)))); }; rec([], ids); return out; };
for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) {
  const syl = SPLIT(r.w.key), n = syl.length, base = C.newState(r, 0, { rnd: seeded(1) });
  let ok = 0, bad = 0, total = 0;
  for (const arr of arrangements(base.pieces.map(p => p.id))) {
    if (arr.length > C.PLACES) continue;
    const st = C.newState(r, 0, { rnd: seeded(1) });
    arr.forEach((id, k) => C.place(st, id, k)); total++;
    const res = C.release(st), pcs = arr.map(id => C.byId(st, id));
    let stopAt = -1; for (let i = 1; i < pcs.length; i++) if (STEP(pcs[i].text) === 2) { stopAt = i; break; }
    const entered = stopAt < 0 ? pcs : pcs.slice(0, stopAt), read = entered.map(p => p.text).join('');
    const right = stopAt < 0 && pcs.length === n && pcs.every((p, i) => p.own === i);
    const kase = stopAt >= 0 ? 'step' : entered.some(p => p.own < 0) ? (read !== r.w.word && SINGLE(read) === SINGLE(r.w.word) ? 'length' : 'other') : entered.length < n ? 'short' : 'order';
    if (right) { if (res.ok && st.done && st.ride.read === r.w.word) ok++; else bad++; }
    else if (res.ok || st.done || res.kase !== kase || st.ride.read !== read || st.misses !== 1 || (stopAt >= 0 && st.ride.at !== stopAt)) bad++;
  }
  is(ok === 1 && bad === 0, `${r.id}: of ${total} arrangements only word order lands; every stop, strip and miss kind right (${ok} ok, ${bad} bad)`);
  /* a gap; an empty first place; nothing */
  let st = C.newState(r, 0); let res = C.release(st); is(!res.ok && res.kase === 'empty' && st.misses === 0, `${r.id}: nothing on the track asks (no miss)`);
  C.place(st, 'p0', 1); res = C.release(st); is(res.kase === 'nostart' && st.misses === 0, `${r.id}: an empty place 1 asks (no miss)`);
  if (n >= 2) { st = C.newState(r, 0); C.place(st, 'p0', 0); C.place(st, 'p1', 2); res = C.release(st); is(res.kase === 'gap' && st.ride.at === 1 && st.ride.read === syl[0] && st.misses === 1, `${r.id}: a gap at place 2 — the marble falls there`); }
  st = C.newState(r, 0); syl.forEach((_, q) => C.place(st, 'p' + q, q + (C.PLACES - n))); res = C.release(st); is(res.kase === 'nostart', `${r.id}: the right pieces at the END of the board still need place 1`);
}

/* 6. the tray */
for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) {
  const n = SPLIT(r.w.key).length, N = 3000, st0 = C.newState(r, 0), cnt = st0.pieces.length, xid = st0.pieces.find(p => p.own < 0).id;
  let inOrder = 0, notDer = 0; const xPos = new Array(cnt).fill(0);
  for (let k = 0; k < N; k++) {
    const st = C.newState(r, 0, { rnd: mixed(k) }), own = st.tray.filter(id => id[0] === 'p').map(id => +id.slice(1));
    if (own.every((x, i) => x === i)) inOrder++; if (n >= 3 && !C.isDerangement(own)) notDer++;
    xPos[st.tray.indexOf(xid)]++;
  }
  if (n >= 3) is(notDer === 0, `${r.id}: three or more pieces always a derangement`);
  if (n === 2) is(inOrder / N > 0.43 && inOrder / N < 0.57, `${r.id}: two pieces in word order at chance (${(inOrder / N).toFixed(3)})`);
  if (lv !== 'guard' || st0.pieces.filter(p => p.own < 0).length === 1) is(xPos.every(c => Math.abs(c / N - 1 / cnt) < 0.06), `${r.id}: the extra piece's tray place uniform (${xPos.map(c => (c / N).toFixed(2)).join(' ')})`);
}

/* 7. the hand */
(() => {
  const r = C.rounds('long')[0], st = C.newState(r, 0, { rnd: seeded(4) });
  C.place(st, 'p1', 0); C.place(st, 'p0', 0); is(st.places[0] === 'p0' && st.tray.includes('p1'), 'a tray piece on a taken place sends the other back to the tray');
  C.place(st, 'p2', 1); C.place(st, 'p0', 1); is(st.places[0] === 'p2' && st.places[1] === 'p0', 'a placed piece onto a taken place swaps them');
  C.release(st); is(st.misses === 1 && !!st.ride && !C.shadowOn(st), 'miss 1: the ride, no shadow yet');
  is(C.firstDiff(st) === -1 || st.ride.stop === 'end', 'the first wrong letter only for a finished ride');
  C.remove(st, 'p0'); is(!st.ride && !st.show && st.tray.includes('p0'), 'remove: the piece back, the ride and the help gone');
  C.place(st, 'p0', 1); C.release(st); is(st.misses === 2 && C.shadowOn(st), 'miss 2: the shadow track');
  is(C.firstDiff(st) === 0, 'the first letter that differs is marked (re… vs au…)');
  C.place(st, 'p0', 0); is(!C.shadowOn(st), 'a move takes the shadow away');
  C.place(st, 'p1', 1); C.place(st, 'p2', 2); is(C.release(st).ok && st.done, 'right');
  is(C.place(st, 'x0', 3) === false && C.remove(st, 'p0') === false, 'nothing moves after the marble has landed');
})();

/* 8. hints */
(() => {
  const H = (lv, i, fn) => { const st = C.newState(C.rounds(lv)[i], 0, { rnd: seeded(6) }); fn(st); return C.hint(st); };
  is(H('short', 4, st => C.release(st)) === 'hintEmpty', 'nothing: hintEmpty');
  is(H('short', 4, st => { C.place(st, 'p0', 1); C.release(st); }) === 'hintStart', 'an empty place 1: hintStart');
  is(H('short', 4, st => { C.place(st, 'p0', 0); C.place(st, 'p1', 2); C.release(st); }) === 'hintGap', 'a gap: hintGap');
  is(H('guard', 0, st => { C.place(st, 'w0', 0); C.place(st, 'w1', 1); C.release(st); }) === 'hintStep', 'a step of 2: hintStep');
  is(H('short', 4, st => { C.place(st, 'p0', 0); C.place(st, 'x0', 1); C.release(st); }) === 'hintOther', 'another piece, not a length difference: hintOther');
  is(H('short', 0, st => { C.place(st, 'x0', 0); C.release(st); }) === 'hintLength', 'ku for kuu: hintLength');
  is(H('guard', 0, st => { C.place(st, 'w0', 0); C.place(st, 'p1', 1); C.release(st); }) === 'hintLength', 'ki + sa = kisa for kissa: hintLength');
  is(H('short', 4, st => { C.place(st, 'p0', 0); C.release(st); }) === 'hintShort', 'too short: hintShort');
  is(H('short', 4, st => { C.place(st, 'p1', 0); C.place(st, 'p0', 1); C.release(st); }) === 'hintOrder', 'wrong order: hintOrder');
  is(H('short', 4, st => { C.place(st, 'p1', 0); C.place(st, 'p0', 1); C.release(st); C.release(st); }) === 'hintShadow', 'miss 2: hintShadow');
})();

/* 9. order */
for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0, bad = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad && R.length >= 7, `${lv}: ${R.length} rounds, orders are permutations and never repeat the previous one`); }

/* 10. strings */
const A = (() => { const ctx = { window: {}, MarbleRunCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'marble-run-activity.js'), 'utf8') + '\n;this.__A = MarbleRunActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.TMR_CORE_DIR || MT, 'marble-run-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'marble-run-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) {
  is(!!A.strings[k].en && !!A.strings[k].fi, `strings ${k}: en + fi`);
  is(!/\bfree\b|ilmai|gratis/i.test(A.strings[k].en + A.strings[k].fi), `strings ${k}: no price word`);
  is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);
}

/* 11. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'marble-run-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.muodosta-sana-tavuista.rf-k-2-b' && rows[0].tool === 'marble-run-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show f2151fd8:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) {
  for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
  const old = HEADROW.params.words.map(w => w.targetWord + ':' + w.syllables.join('-'));
  is(old.length === 28 && old.every(x => { const [k, s] = x.split(':'); return k === 'pannukakku' || (C.WORDS[k] && C.WORDS[k].syl.join('-') === s); }) && JSON.stringify(old.map(x => x.split(':')[0]).filter(k => k !== 'pannukakku').sort()) === JSON.stringify(LEGACY.slice().sort()), 'the old row\'s 27 words with a true picture are kept with their splits (pannukakku out on review)');
} else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-marble-run-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
