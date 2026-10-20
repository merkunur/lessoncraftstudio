#!/usr/bin/env node
/* =====================================================================
   verify-family-lock-core.js — the gate for ACTIVITY #51, O cadeado das
   famílias (RF.K.2.B, pt-BR). It holds its OWN ground truth — the 35
   words with their splits and pictures, the three level tables, the
   decoys and the vowel list are typed out here — and checks the core
   against it, against approved-words-pt.json and the picture labels:
     1. words: split = oracle = approved-words-pt.json (accents and tildes
        kept); the picture exists, is a colour theme, and its pt label is
        the word; all 28 words of the old row are kept; never sapo (no
        toad), pêssego (every peach is drawn as an apple) nor pato (every
        duck is a duckling);
     2. families: every rolling syllable is one plain vowel between an
        onset and a coda, its reel is rebuilt here from a e i o u (ç: a o
        u), the right face is on the reel and the right reading is the
        word; accents, tildes, gu/qu and diphthongs never roll;
     3. the start: no wheel starts on its right face; the four offsets
        +1 +2 −1 −2 dealt evenly per level and pass (≤ 35 % each); the
        start differs pass to pass; uniform bots ("roll every wheel one
        step down", "leave it") measured;
     4. Check, rolling levels: EVERY reachable reading of every lock — ok
        only for the word; the pins = exactly the right wheels, the wobble
        = the wrong ones; nothing moved asks (no miss); a roll lifts that
        wheel's pin and hides the help; miss 2 shows the notch and the
        ghost; "always" shows the notch at rest; nearest() points the
        short way; no reachable reading is a rude word;
     5. Monte o cadeado: the tray is a derangement (never reversed for
        three or more) with the decoy in it; EVERY arrangement in the
        sockets — ok only in word order; the decoy is a sibling from a
        syllable's family, never one of the word's syllables, and never
        spells a real word in its place; an empty socket asks;
     6. hints; 7. order; 8. strings (en + pt, reached, no price word, no
        «grupo»); 9. manifest (frozen fields).
   Usage: node scripts/verify-family-lock-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.FLK_CORE_DIR || MT, 'family-lock-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };
const seeded = (k) => { let s = k >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };

/* ---------- the oracle ---------- */
const ORACLE = {
  gato: 'ga-to|animals/cat', bola: 'bo-la|toys/ball', casa: 'ca-sa|miscellaneous/house', foca: 'fo-ca|ocean life/seal', mesa: 'me-sa|around the house/table',
  luva: 'lu-va|accessories/glove', pipa: 'pi-pa|toys/kite', vela: 've-la|christmas/candle', cama: 'ca-ma|around the house/bed', vaca: 'va-ca|farm animals/cow',
  girafa: 'gi-ra-fa|animals/giraffe', borboleta: 'bor-bo-le-ta|insects and bugs/butterfly', girassol: 'gi-ras-sol|flowers/sunflower', morango: 'mo-ran-go|fruits/strawberry',
  bicicleta: 'bi-ci-cle-ta|vehicles/bicycle', elefante: 'e-le-fan-te|animals/elephant', tartaruga: 'tar-ta-ru-ga|animals/turtle', sapato: 'sa-pa-to|clothing/shoe',
  macaco: 'ma-ca-co|zoo animals/monkey', janela: 'ja-ne-la|around the house/window', farol: 'fa-rol|beach/lighthouse', panela: 'pa-ne-la|around the house/pot', formiga: 'for-mi-ga|insects and bugs/ant',
  'maçã': 'ma-çã|fruits/apple', cenoura: 'ce-nou-ra|vegetables/carrot', 'abóbora': 'a-bó-bo-ra|vegetables/pumpkin', 'jacaré': 'ja-ca-ré|reptiles and Amphibians/alligator',
  'helicóptero': 'he-li-cóp-te-ro|vehicles/helicopter', pinguim: 'pin-guim|animals/penguin', 'balão': 'ba-lão|toys/balloon', golfinho: 'gol-fi-nho|animals/dolphin',
  trator: 'tra-tor|vehicles/tractor', tigre: 'ti-gre|animals/tiger', zebra: 'ze-bra|animals/zebra', panda: 'pan-da|animals/panda'
};
const TWO = 'gato bola casa foca mesa luva pipa vela cama vaca';
const LONG = 'girafa borboleta girassol morango bicicleta elefante tartaruga sapato macaco janela panela formiga';
const BUILD = { 'maçã': 'mo', cenoura: 'ri', 'abóbora': 'ba', 'jacaré': 'co', 'helicóptero': 'la', pinguim: 'pan', 'balão': 'be', golfinho: 'nhe', trator: 'tro', tigre: 'gra', zebra: 'bri', panda: 'du', farol: 'fo' };
/* the 28 words of the row before the rebuild (syllable-builder-activities.json @ 32cea2da) */
const LEGACY = 'gato bola casa cama mesa girafa borboleta girassol farol luva morango bicicleta helicóptero elefante pinguim trator golfinho panda tigre zebra tartaruga maçã cenoura abóbora formiga pipa balão vela'.split(' ');
const VOWELS = ['a', 'e', 'i', 'o', 'u'];
/* faces a wheel skips (native review 2026-10-20): pi·pi / po·po potty words, sa·pa·ta a slur, sa·pu·ta holds «puta»;
   ga·ta, ma·ca·ca, e·le·fan·ta are other names for the same picture, which the lock would mark wrong */
const SKIP = { pipa: [[], ['pi', 'po']], gato: [[], ['ta']], macaco: [[], [], ['ca']], elefante: [[], [], [], ['ta']], sapato: [[], ['pu'], ['ta']] };
/* other names a Brazilian child gives the same picture — never reachable on its lock */
const ALT = { gato: ['gata'], macaco: ['macaca'], elefante: ['elefanta'] };
/* never inside any reading */
const RUDE_IN = ['puta', 'sapata', 'pica', 'buceta', 'merda', 'porra', 'bosta'];
/* real Portuguese words a decoy in its socket must never spell (the pool plus the near-misses found while building) */
const REAL = new Set(Object.keys(ORACLE).concat(['bolão', 'golfinha', 'pando', 'panda', 'tigri', 'zebro', 'maço', 'trato']));
/* readings no plate may ever show — rude in pt-BR (reviewed list) */
const RUDE = new Set(['cu', 'pica', 'pinto', 'buceta', 'boceta', 'bosta', 'merda', 'porra', 'caralho', 'puta', 'puto', 'piroca', 'xota', 'xoxota', 'cacete', 'bunda', 'peido', 'mijo', 'foda', 'fode', 'teta', 'tetas', 'bicha', 'viado', 'cuzão', 'pipi', 'xixi', 'cocô', 'bobo', 'boba', 'burro', 'burra', 'gorda', 'gordo', 'morra', 'cagar', 'caga', 'cago', 'peidar', 'piça', 'xana', 'babaca', 'tesão']);
const SPLIT = (k) => ORACLE[k].split('|')[0].split('-');
const AP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-pt.json'), 'utf8')).entries;
const APPROVED = {}; AP.forEach(e => { APPROVED[e.word] = e; });
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* 1. words */
const keys = Object.keys(C.WORDS);
is(keys.length === 35 && keys.every(k => ORACLE[k]) && Object.keys(ORACLE).every(k => C.WORDS[k]), `the core's words = the 35-word oracle (${keys.length})`);
keys.forEach(k => {
  const w = C.WORDS[k], [split, pic] = (ORACLE[k] || '|').split('|'), g = APPROVED[k], lab = PIC[w.pic] && PIC[w.pic].pt && PIC[w.pic].pt[0];
  is(w.syl.join('-') === split && w.pic === pic, `${k}: ${w.syl.join('-')} on ${w.pic} = oracle ${split} on ${pic}`);
  is(!!g && g.split.join('-') === split, `${k}: approved-words-pt.json agrees (${g && g.split.join('-')})`);
  is(!!lab && lab.toLowerCase() === k, `${k}: picture ${w.pic} labelled "${lab}"`);
  is(exact(w.pic + '@2x.webp') && !BW.test(w.pic.split('/')[0]), `${k}: picture exists, colour theme`);
});
LEGACY.forEach(k => is(!!C.WORDS[k], `the old row's ${k} is kept`));
for (const k of ['sapo', 'pêssego', 'pato']) is(!C.WORDS[k], `never ${k}`);
is(C.LEVEL_KEYS.join() === 'two,long,build', 'three levels');
is(C.rounds('two').map(r => r.w.key).join(' ') === TWO && C.rounds('long').map(r => r.w.key).join(' ') === LONG && JSON.stringify(Object.fromEntries(C.rounds('build').map(r => [r.w.key, r.decoy]))) === JSON.stringify(BUILD), 'the level tables = the oracle');
const all = [].concat(C.rounds('two'), C.rounds('long'), C.rounds('build')).map(r => r.w.key);
is(all.length === 35 && new Set(all).size === 35, 'every word in exactly one level');

/* 2. families */
const parse = (s) => { const m = /^([^aeiouáéíóúâêôãõà]*)([aeiou])([^aeiouáéíóúâêôãõà]*)$/.exec(s); return m && !/[áéíóúâêôãõà]/.test(s) ? { o: m[1], v: m[2], c: m[3] } : null; };
for (const r of [].concat(C.rounds('two'), C.rounds('long'))) {
  const syl = SPLIT(r.w.key);
  is(r.level !== 'two' || (syl.length === 2 && syl.every(s => { const p = parse(s); return p && !p.c; })), `${r.id}: two plain consonant-vowel syllables`);
  is(r.level !== 'long' || (syl.length >= 2 && syl.length <= 4), `${r.id}: two to four wheels`);
  const st0 = C.newState(r, 0);
  syl.forEach((s, q) => {
    const sk = (SKIP[r.w.key] || [])[q] || [], reel = st0.wheels[q].faces;
    is(reel.join() === (parse(s).o === 'ç' ? ['a', 'o', 'u'] : VOWELS).map(v => parse(s).o + v + parse(s).c).filter(x => !sk.includes(x)).join() && reel.includes(s), `${r.id} wheel ${q + 1}: the reel on the lock ${reel.join(' ')}`);
    const p = parse(s), f = C.familyFaces(s);
    is(!!p && !!f && f.onset === p.o && f.coda === p.c && f.faces.join() === (p.o === 'ç' ? ['a', 'o', 'u'] : VOWELS).map(v => p.o + v + p.c).join() && f.faces.includes(s), `${r.id} "${s}": the reel ${f && f.faces.join(' ')}`);
  });
  is(JSON.stringify(C.SKIP) === JSON.stringify(SKIP), 'the skipped faces = the oracle');
  is(C.reading({ r, wheels: syl.map(s => { const f = C.familyFaces(s); return { faces: f.faces, idx: f.faces.indexOf(s) }; }) }) === syl.join('·') && syl.join('') === r.w.word, `${r.id}: the right reading spells ${r.w.word}`);
}
is(C.familyFaces('ça') && C.familyFaces('ça').faces.join() === 'ça,ço,çu', 'the ç family has three faces');
is(C.familyFaces('nha') && C.familyFaces('nha').faces.join() === 'nha,nhe,nhi,nho,nhu', 'the nh family has five');
is(C.familyFaces('bar') && C.familyFaces('bar').faces.join() === 'bar,ber,bir,bor,bur', 'a coda stays on its wheel');
is(C.familyFaces('e') && C.familyFaces('e').faces.join() === 'a,e,i,o,u', 'a vowel alone rolls through the vowels');
for (const s of ['çã', 'bó', 'cóp', 'lão', 'guim', 'gui', 'que', 'nou', 'ria', 'pês', 'çe']) is(C.familyFaces(s) === null, `"${s}" never rolls`);

/* 3. the start */
for (const lv of ['two', 'long']) {
  const R = C.rounds(lv); let starts = new Set(), onAns = 0, cls = { 1: 0, 2: 0, '-1': 0, '-2': 0 }, total = 0, worst = 0;
  const bots = { down1: 0, up1: 0, down2: 0, up2: 0, leave: 0 }; let rounds = 0;
  for (let pass = 0; pass < 60; pass++) for (const salt of [0, 7, 7 * 991, 7 * 523117]) {
    const offs = C.startOffsets(lv, pass + salt), c = { 1: 0, 2: 0, '-1': 0, '-2': 0 }; let n = 0;
    for (const r of R) {
      const st = C.newState(r, pass, { offsets: offs });
      st.wheels.forEach(w => { const len = w.faces.length; let d = ((w.idx - w.answer) % len + len) % len; d = d > len / 2 ? d - len : d; c[d] = (c[d] || 0) + 1; n++; if (w.idx === w.answer) onAns++; });
      starts.add(pass + '|' + st.wheels.map(w => w.idx).join());
      rounds++;
      const solve = (k) => st.wheels.every(w => (w.idx + k + 5 * w.faces.length) % w.faces.length === w.answer);
      if (solve(1)) bots.down1++; if (solve(-1)) bots.up1++; if (solve(2)) bots.down2++; if (solve(-2)) bots.up2++; if (solve(0)) bots.leave++;
    }
    for (const k in c) { cls[k] += c[k]; worst = Math.max(worst, c[k] / n); } total += n;
  }
  is(onAns === 0, `${lv}: no wheel ever starts on its right face (${onAns})`);
  is(worst <= 0.35, `${lv}: each offset class ≤ 35 % of the level's wheels in every pass (worst ${worst.toFixed(3)})`);
  is(JSON.stringify(C.startOffsets(lv, 0)) !== JSON.stringify(C.startOffsets(lv, 1)), `${lv}: the start changes from pass to pass`);
  const b = Object.fromEntries(Object.entries(bots).map(([k, v]) => [k, +(v / rounds).toFixed(3)]));
  const lim = lv === 'two' ? 0.32 : 0.1;
  is(Object.values(b).every(x => x <= lim), `${lv}: uniform bots ≤ ${lim} — roll every wheel the same way (${JSON.stringify(b)})`);
}

/* 4. Check — rolling levels */
const product = (arrs) => arrs.reduce((acc, a) => { const out = []; acc.forEach(x => a.forEach(y => out.push(x.concat([y])))); return out; }, [[]]);
let rude = [], alt = [], readings = 0;
for (const r of [].concat(C.rounds('two'), C.rounds('long'))) {
  const syl = SPLIT(r.w.key), base = C.newState(r, 0);
  const combos = product(base.wheels.map(w => w.faces.map((_, i) => i)));
  let okCount = 0, pinBad = 0;
  combos.forEach(cmb => {
    const st = C.newState(r, 0); cmb.forEach((i, q) => { st.wheels[q].idx = i; }); st.touched = true;
    const parts = st.wheels.map(w => w.faces[w.idx]), rd = parts.join(''); readings++;
    if (RUDE.has(rd) || parts.some(p => RUDE.has(p) && p !== 'cu') || RUDE_IN.some(x => rd.includes(x))) rude.push(r.w.key + ':' + parts.join('·'));
    if ((ALT[r.w.key] || []).includes(rd)) alt.push(r.w.key + ':' + parts.join('·'));
    const res = C.check(st), right = parts.map((p, q) => p === syl[q] ? q : -1).filter(q => q >= 0), wrong = parts.map((p, q) => p !== syl[q] ? q : -1).filter(q => q >= 0);
    if (res.ok) okCount++;
    if (!res.ok && (JSON.stringify(st.pinned) !== JSON.stringify(right) || JSON.stringify(st.wobble) !== JSON.stringify(wrong) || st.misses !== 1)) pinBad++;
  });
  is(okCount === 1, `${r.id}: of ${combos.length} readings exactly one opens the lock (${okCount})`);
  is(pinBad === 0, `${r.id}: pins = the right wheels, wobble = the wrong ones (${pinBad} bad)`);
  /* the help */
  const st = C.newState(r, 0);
  let res = C.check(st); is(!res.ok && res.kase === 'empty' && st.misses === 0, `${r.id}: Check with nothing moved asks (no miss)`);
  const q0 = st.wheels.findIndex(w => w.idx !== w.answer);
  C.roll(st, q0, 1); if (C.check(st).ok) { C.roll(st, q0, 1); }
  if (!st.done) {
    is(st.misses >= 1 && st.help >= 1 && !C.ghostOn(st) && st.wheels.every((_, q) => !C.notchOn(st, q)), `${r.id}: miss 1 — pins, no notch, no ghost yet`);
    if (st.pinned.length) { const pq = st.pinned[0]; C.roll(st, pq, 1); is(st.pinned.indexOf(pq) < 0 && !st.show, `${r.id}: rolling a pinned wheel lifts its pin and hides the help`); C.roll(st, pq, -1); }
    C.check(st);
    if (!st.done) {
      is(st.help === 2 && C.ghostOn(st) && st.wobble.every(q => C.notchOn(st, q)) && st.pinned.every(q => !C.notchOn(st, q)), `${r.id}: miss 2 — the notch beside every wrong wheel, the ghost under the plate`);
      st.wobble.forEach(q => { const w = st.wheels[q], k = C.nearest(w), len = w.faces.length, steps = ((w.answer - w.idx) % len + len) % len; is((k === 1 && steps <= len / 2) || (k === -1 && steps > len / 2), `${r.id} wheel ${q + 1}: the gold nub points the short way`); });
      C.roll(st, st.wobble[0], 1);
      is(!C.ghostOn(st) && st.wheels.every((_, q) => !C.notchOn(st, q)), `${r.id}: a roll hides the notch and the ghost until the next Check`);
      is(st.wheels.every((_, q) => C.notchOn(st, q, true)) && C.ghostOn(st, true), `${r.id}: "always" shows the notch at rest`);
    }
  }
}
is(alt.length === 0, `no lock can read another name for its own picture (${alt.slice(0, 6).join(', ')})`);
is(rude.length === 0, `no reachable plate reading is a rude word (${readings} readings; ${rude.slice(0, 6).join(', ')})`);

/* 5. Monte o cadeado */
const perms = (a) => a.length <= 1 ? [a] : a.flatMap((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).map(p => [x].concat(p)));
for (const r of C.rounds('build')) {
  const syl = SPLIT(r.w.key), n = syl.length, d = r.decoy;
  const fam = syl.map(s => { const p = /^([^aeiouáéíóúâêôãõà]*)([aeiouáéíóúâêôãõà]+)([^aeiouáéíóúâêôãõà]*)$/.exec(s); return p ? p[1] + '|' + p[3] : null; });
  const dp = /^([^aeiou]*)([aeiou])([^aeiou]*)$/.exec(d);
  const at = fam.indexOf(dp ? dp[1] + '|' + dp[3] : '#');
  is(!syl.includes(d) && at >= 0, `${r.id}: decoy "${d}" is a sibling from the family of "${syl[at]}", not a syllable of the word`);
  for (let i = 0; i < n; i++) { const wd = syl.map((s, q) => q === i ? d : s).join(''); is(!REAL.has(wd), `${r.id}: "${wd}" (the decoy in place ${i + 1}) is not a real word`); }
  let firstAt0 = 0, bad = 0; const N = 2000;
  for (let k = 0; k < N; k++) {
    const st = C.newState(r, 0, { rnd: seeded(k + 1) }), order = st.tray.filter(id => id !== 'x').map(id => +id.slice(1));
    if (st.tray.length !== n + 1 || !st.tray.includes('x') || !C.isDerangement(order) || (n >= 3 && order.every((x, i) => x === n - 1 - i))) bad++;
    if (st.tray[0] === 'w0') firstAt0++;
  }
  is(bad === 0, `${r.id}: the tray is a derangement with the decoy (never reversed for three or more) (${bad})`);
  is(firstAt0 / N <= 0.3, `${r.id}: the first syllable's wheel in tray slot 1 ≤ 30 % (${(firstAt0 / N).toFixed(3)})`);
  /* every arrangement */
  const ids = syl.map((_, q) => 'w' + q).concat(['x']);
  let ok = 0, wrongPin = 0, decoyK = 0, arr = 0;
  for (const p of perms(ids)) {
    const st = C.newState(r, 0, { rnd: seeded(3) }); p.slice(0, n).forEach((id, s) => C.seat(st, id, s)); arr++;
    const res = C.check(st), parts = st.sockets.map(id => C.wheel(st, id).text);
    if (res.ok) ok++;
    else {
      const right = parts.map((t, q) => t === syl[q] ? q : -1).filter(q => q >= 0);
      if (JSON.stringify(st.pinned) !== JSON.stringify(right)) wrongPin++;
      if (st.sockets.includes('x') && res.kase === 'decoy') decoyK++;
    }
  }
  is(ok === 1, `${r.id}: of ${arr} arrangements only word order opens the lock (${ok})`);
  is(wrongPin === 0, `${r.id}: pins = the wheels in their right place`);
  is(decoyK === perms(ids).filter(p => p.slice(0, n).includes('x')).length, `${r.id}: a seated decoy is named (${decoyK})`);
  const st = C.newState(r, 0, { rnd: seeded(5) });
  C.seat(st, 'w0', 0); let res = C.check(st); is(!res.ok && res.kase === 'empty' && st.misses === 0, `${r.id}: an empty socket asks (no miss)`);
  C.seat(st, 'w1', 0); is(st.sockets[0] === 'w1' && st.tray.includes('w0'), `${r.id}: a wheel seated on a taken socket sends the other back to the tray`);
  C.seat(st, 'w1', 1); is(st.sockets[1] === 'w1' && st.sockets[0] === null, `${r.id}: a seated wheel moves to another socket`);
  C.unseat(st, 1); is(st.sockets.every(x => x === null) && st.tray.length === n + 1, `${r.id}: unseat sends it back`);
  is(C.roll(st, 0, 1) === false, `${r.id}: loose wheels do not roll`);
}

/* 6. hints */
(() => {
  const H = (lv, i, fn) => { const st = C.newState(C.rounds(lv)[i], 0, { rnd: seeded(6) }); fn(st); return C.hint(st); };
  is(H('two', 0, st => C.check(st)) === 'hintRoll', 'rolling, nothing moved: hintRoll');
  is(H('two', 0, st => { const q = st.wheels.findIndex(w => w.idx !== w.answer); C.roll(st, q, st.wheels[q].idx === (st.wheels[q].answer + 4) % 5 ? 2 : 1); C.check(st); }) === 'hintPins', 'rolling, miss 1: hintPins');
  is(H('long', 0, st => { C.roll(st, 0, 3); C.check(st); C.check(st); }) === 'hintNotch', 'rolling, miss 2: hintNotch');
  is(H('build', 0, st => C.check(st)) === 'hintMissing', 'build, empty: hintMissing');
  is(H('build', 0, st => { C.seat(st, 'w1', 0); C.seat(st, 'w0', 1); C.check(st); }) === 'hintPins3', 'build, wrong order: hintPins3');
  is(H('build', 0, st => { C.seat(st, 'x', 0); C.seat(st, 'w1', 1); C.check(st); }) === 'hintDecoy', 'build, the decoy seated: hintDecoy');
  is(H('build', 0, st => { C.seat(st, 'x', 0); C.seat(st, 'w1', 1); C.check(st); C.check(st); }) === 'hintGhost', 'build, miss 2: hintGhost');
})();

/* 7. order */
for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0, bad = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad && R.length >= 7, `${lv}: ${R.length} rounds, orders are permutations and never repeat the previous one`); }

/* 8. strings */
const A = (() => { const ctx = { window: {}, FamilyLockCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'family-lock-activity.js'), 'utf8') + '\n;this.__A = FamilyLockActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.FLK_CORE_DIR || MT, 'family-lock-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'family-lock-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) {
  is(!!A.strings[k].en && !!A.strings[k].pt, `strings ${k}: en + pt`);
  is(!/\bfree\b|gratis|grátis|gratuit/i.test(A.strings[k].en + A.strings[k].pt), `strings ${k}: no price word`);
  is(!/(?<!\p{L})grupos?(?!\p{L})/iu.test(A.strings[k].pt), `strings ${k}: never «grupo»`);
  is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);
}

/* 9. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'family-lock-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.forme-as-silabas.rf-k-2-b' && rows[0].tool === 'family-lock-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 32cea2da:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) {
  for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
  is(JSON.stringify(HEADROW.params.words.map(w => w.targetWord)) === JSON.stringify(LEGACY.slice().sort((a, b) => HEADROW.params.words.findIndex(w => w.targetWord === a) - HEADROW.params.words.findIndex(w => w.targetWord === b))) && HEADROW.params.words.length === 28, 'the oracle\'s legacy list = the old row\'s 28 words');
} else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-family-lock-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
