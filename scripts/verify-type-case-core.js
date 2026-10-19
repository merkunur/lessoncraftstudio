#!/usr/bin/env node
/* =====================================================================
   verify-type-case-core.js — the model gate for ACTIVITY #41, the
   Printer's Type Case (RF.K.1.d). Its OWN oracle: a letter's other form is
   computed here (String case mapping, ß excluded); the 88 Big-and-small
   rounds are compared verbatim with the manifest; the look-alike sets and
   the in-words counts are re-typed from designs/041 §6; every in-words
   word must be its library picture's label (image-vocabulary.js) and the
   picture must exist at its exact path.
   Env TC_CORE_DIR = a directory holding a (mutated) type-case-core.js.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const DIR = process.env.TC_CORE_DIR || path.join(ROOT, 'mini tools');
const C = require(path.join(DIR, 'type-case-core.js'));
const L = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---------- the oracle ---------- */
const other = (c) => c === 'ß' ? null : c.toUpperCase() !== c ? c.toUpperCase() : c.toLowerCase() !== c ? c.toLowerCase() : null;
const up = (c) => c.toUpperCase() === c && c.toLowerCase() !== c;
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, 'mini tools', 'type-case-activities.json'), 'utf8'))[0];
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8') + ';this.V=IMAGE_VOCABULARY', ctx); const VOCAB = ctx.V;

/* 1. Big and small: the old 88 rounds, verbatim; each answer is the prompt's other form */
let total = 0;
L.forEach(l => {
  const old = MANIFEST.params.byLocale[l].rounds, R = C.rounds(l, 'pairs', 'both');
  is(R.length === 8 && old.length === 8, `${l}: eight rounds`);
  R.forEach((r, i) => {
    total++;
    is(r.given === old[i].prompt && r.answer === old[i].answer && r.look.join('') === old[i].distractors.join(''), `${l} ${r.id}: verbatim ${old[i].prompt}→${old[i].answer} (${old[i].distractors.join(' ')})`);
    is(other(r.given) === r.answer, `${l} ${r.id}: ${r.answer} is the other form of ${r.given}`);
    is(r.look.every(c => c !== r.answer && other(c) !== r.given && c.toLowerCase() !== r.given.toLowerCase()), `${l} ${r.id}: no look-alike is the same letter`);
    is(r.look.every(c => up(c) === up(r.answer)), `${l} ${r.id}: the look-alikes are in the answer's case`);
  });
  is(R.filter(r => r.upper).length >= 2 && R.filter(r => !r.upper).length >= 2, `${l}: both directions are given (${R.filter(r => r.upper).length} capital, ${R.filter(r => !r.upper).length} small)`);
  ['capital', 'small'].forEach(d => {
    const D = C.rounds(l, 'pairs', d);
    is(D.length === 8 && D.every(r => up(r.given) === (d === 'capital')), `${l} ${d}: all eight rounds give the ${d === 'capital' ? 'capital' : 'small letter'}`);
    is(D.every(r => other(r.given) === r.answer && r.look.every(c => c !== r.answer && up(c) === up(r.answer) && c.toLowerCase() !== r.answer.toLowerCase())), `${l} ${d}: every round still pairs a letter with its other form, look-alikes in the answer's case`);
  });
});
is(total === 88, `all 88 old rounds present (${total})`);

/* 2. sorts, the tray, the slot balance */
L.forEach(l => {
  const R = C.rounds(l, 'pairs', 'both');
  for (let pass = 0; pass < 4; pass++) {
    const slots = [0, 0, 0, 0];
    R.forEach(r => { const st = C.newState(r, null, pass); slots[st.tray.findIndex(s => s.face === r.answer)]++; is(st.tray.every(s => s.back === other(s.face)) && st.tray.map(s => s.face).sort().join() === [r.answer].concat(r.look).sort().join(), `${l} ${r.id} pass ${pass}: the tray is the answer + three look-alikes, each sort's back its other form`); });
    is(slots.every(n => n === 2), `${l} pass ${pass}: each tray slot holds the answer exactly twice (${slots.join(',')})`);
  }
});
(function () {
  const r = C.rounds('en', 'pairs', 'both')[0], st = C.newState(r, null, 0), wrong = st.tray.find(s => s.face !== r.answer), right = st.tray.find(s => s.face === r.answer);
  is(!C.canFlip(st) && !C.flip(st, wrong.id), 'sorts are latched face-up before the first miss');
  is(C.press(st).result === 'empty' && C.hint(st) === 'hintEmpty' && st.misses === 0, 'press with the slot empty: asks — not a miss');
  const res = C.drop(st, wrong.id);
  is(res.result === 'wrong' && res.back === other(wrong.face) && st.misses === 1 && st.help === 1 && !st.placed && C.hint(st) === 'hintWrong', 'a wrong sort tips over, shows its other form; miss 1');
  is(C.canFlip(st) && C.flip(st, wrong.id) && st.flipped[wrong.id], 'after a miss a sort may be flipped');
  C.drop(st, st.tray.filter(s => s.face !== r.answer)[1].id);
  is(st.help === 2 && C.hint(st) === 'hintBack', 'miss 2: "this is what it looks like on the back"');
  is(C.drop(st, right.id).result === 'fits' && st.placed === right.id && !st.show, 'the right sort fits; the showing goes');
  is(C.drop(st, wrong.id) === null, 'a filled slot takes no second sort');
  is(C.lift(st) && !st.placed && C.drop(st, right.id), 'a placed sort can be lifted and put back');
  is(C.press(st).result === 'ok' && st.done, 'the press prints the pair');
  is(C.drop(st, wrong.id) === null && C.lift(st) === false, 'after the print the column rests');
})();

/* 3. look-alikes, re-typed */
const LK = [['b', 'bdpbqdbp', 3], ['d', 'dbdpqddb', 4], ['p', 'pqbdpqdb', 2], ['q', 'dqpqbpqd', 3], ['n', 'numhnumh', 2], ['M', 'MWNMHWMN', 3]];
const L7 = { en: ['E', 'EFLEEFLE'], it: ['E', 'EFLEEFLE'], nl: ['E', 'EFLEEFLE'], de: ['Ü', 'ÜUÄÜÖÜUÜ'], es: ['ñ', 'ñnmñnñhñ'], pt: ['ç', 'çcçocçeç'], fr: ['é', 'éeéèeécé'], sv: ['ä', 'äaåäaäåä'], fi: ['ä', 'äaöäaäöä'], da: ['ø', 'øoæøoøæø'], no: ['ø', 'øoæøoøæø'] };
L.forEach(l => {
  const R = C.rounds(l, 'look');
  is(R.length === 7, `${l} look: seven rounds`);
  R.forEach((r, i) => { const want = i < 6 ? LK[i] : [L7[l][0], L7[l][1], 4]; is(r.target === want[0] && r.set.join('') === want[1] && r.answer === want[1].split('').filter(c => c === want[0]).length && r.answer === (i < 6 ? want[2] : 4), `${l} ${r.id}: ${want[0]} in ${want[1]} (${r.answer})`); });
  is(R.map(r => r.answer).join() === '3,4,2,3,2,3,4', `${l} look: counts 3 4 2 3 2 3 4`);
});
/* the deal: never all in one half, never alternating; each slot holds a target with frequency count/8 ± 3 % */
let xs = 99; const rnd = () => { xs = (xs * 1103515245 + 12345) % 2147483648; return xs / 2147483648; };
C.rounds('en', 'look').forEach(r => {
  const N = 10000, hit = Array(8).fill(0); let badDeal = 0;
  for (let i = 0; i < N; i++) { const st = C.newState(r, rnd, 0), f = st.stick.map(s => s.face === r.target); f.forEach((h, k) => { if (h) hit[k]++; }); const a = f.slice(0, 4).some(Boolean), b = f.slice(4).some(Boolean); let alt = true; for (let k = 1; k < 8; k++) if (f[k] === f[k - 1]) alt = false; if (!a || !b || alt) badDeal++; if (st.stick.map(s => s.face).sort().join() !== r.set.slice().sort().join()) badDeal++; }
  is(badDeal === 0, `${r.id}: every deal keeps the set, targets in both halves, never alternating`);
  is(hit.every(h => Math.abs(h / N - r.answer / 8) <= 0.03), `${r.id}: each slot holds a target ${r.answer}/8 ± 3 % (${hit.map(h => (h / N).toFixed(3)).join(' ')})`);
});
is(C.newState(C.rounds('en', 'look')[0], null, 0).stick.map(s => s.face).join('') !== 'bdpbqdbp', 'no rnd: still re-dealt, never the table order');
/* every look round in every locale: the targets are exactly the copies of the target letter (oracle), and one copy short never prints */
L.forEach(l => C.rounds(l, 'look').forEach(r => {
  const st = C.newState(r, rnd, 0), T = C.targetsOf(st), want = st.stick.filter(s => s.face === r.target).map(s => s.id);
  is(T.slice().sort().join() === want.slice().sort().join(), `${l} ${r.id}: the targets are exactly the ${r.target}'s`);
  want.slice(0, -1).forEach(id => C.mark(st, id));
  is(C.press(st).result === 'missing' && !st.done && st.last.missing === 1, `${l} ${r.id}: one copy short does not print`);
}));
(function () {
  const r = C.rounds('en', 'look')[1], st = C.newState(r, null, 0), T = C.targetsOf(st), notT = st.stick.filter(s => T.indexOf(s.id) < 0);
  is(C.press(st).result === 'empty' && C.hint(st) === 'hintTap' && st.misses === 0, 'look: press with nothing marked asks — not a miss');
  C.mark(st, T[0]); C.mark(st, T[1]);
  is(C.press(st).result === 'missing' && st.last.missing === T.length - 2 && C.hint(st) === 'hintMore' && st.misses === 1, 'look: two of four marked — "2 more to find"');
  C.mark(st, notT[0].id);
  is(!st.show && st.help === 1, 'look: a new mark clears the showing, not the help');
  is(C.press(st).result === 'extra' && st.last.extra.join() === notT[0].id && C.hint(st) === 'hintBoth' && st.help === 2, 'look: a look-alike marked — miss 2 shows both forms');
  C.mark(st, notT[0].id); T.slice(2).forEach(id => C.mark(st, id));
  is(C.press(st).result === 'ok' && st.done, 'look: exactly the copies marked — printed');
  is(C.mark(st, T[0]) === false, 'look: after the print the stick rests');
})();

/* 4. in words, re-typed: counts, labels, pictures, the rules */
const WC = { en: '2,4,3,4,2,3,3', de: '3,4,2,3,2,5,3', fr: '4,3,3,2,2,4,5', es: '4,2,2,4,3,3,4', pt: '3,5,2,4,2,3,3', it: '5,2,4,3,3,3,2', nl: '4,3,3,2,3,4,3', sv: '4,3,2,2,3,4,3', da: '4,3,2,2,3,4,4', no: '3,3,2,2,3,4,3', fi: '3,2,3,3,5,5,3' };
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
const base = (c) => c.normalize('NFD').replace(/[̀-ͯ]/g, '');
/* a locale's own letters are letters, not accented twins (Finnish ä is not an a); French é and Portuguese ç are twins */
const OWN = { de: 'äöü', es: 'ñ', sv: 'åäö', fi: 'åäö', da: 'æøå', no: 'æøå' };
L.forEach(l => {
  const R = C.rounds(l, 'words');
  is(R.length === 7 && R.map(r => r.answer).join() === WC[l], `${l} words: counts ${WC[l]} (${R.map(r => r.answer).join()})`);
  is(new Set(R.map(r => r.answer)).size >= 3 && R.every(r => r.answer >= 2 && r.answer <= 5), `${l} words: counts take at least three values from 2–5`);
  is(R.filter(r => r.caps).length === 2, `${l} words: two rounds in CAPITALS`);
  R.forEach(r => {
    const hits = r.words.map(w => w.word.split('').filter(c => c.toLowerCase() === r.target.toLowerCase()).length);
    is(hits.reduce((a, b) => a + b, 0) === r.answer, `${l} ${r.id}: the count is every ${r.target} in the words`);
    is(hits.some(h => h === 0), `${l} ${r.id}: at least one word without ${r.target}`);
    r.words.forEach(w => {
      is(exact(w.dir + '/' + w.key + '@2x.webp'), `${l} ${r.id}: picture ${w.dir}/${w.key} exists`);
      is(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(w.dir), `${l} ${r.id}: ${w.dir} is a colour theme`);
      const lab = VOCAB[w.key] && VOCAB[w.key][l] && VOCAB[w.key][l][0];
      const want = !lab ? null : r.caps ? lab.toLocaleUpperCase(l) : l === 'de' ? lab : lab.toLocaleLowerCase(l);
      is(want === w.word, `${l} ${r.id}: "${w.word}" is the picture's label (${want})`);
      if (r.caps) is(w.word === w.word.toUpperCase(), `${l} ${r.id}: ${w.word} in capitals`);
      if (base(r.target) === r.target) is(!w.word.split('').some(c => c !== r.target && c.toLowerCase() !== r.target.toLowerCase() && base(c).toLowerCase() === r.target.toLowerCase() && (OWN[l] || '').indexOf(c.toLowerCase()) < 0), `${l} ${r.id}: no accented twin of ${r.target} in ${w.word}`);
      if (l === 'de' && !r.caps) is(w.word[0].toLowerCase() !== r.target.toLowerCase(), `de ${r.id}: ${r.target} is never the first letter of the noun ${w.word}`);
      if (r.caps) is(!w.word.includes('ß'), `${l} ${r.id}: no ß in a CAPITALS round`);
    });
  });
});
(function () {
  const r = C.rounds('en', 'words')[1], st = C.newState(r, null, 0), T = C.targetsOf(st);
  is(T.length === 4 && st.letters.filter(s => T.indexOf(s.id) >= 0).every(s => s.face === 'A'), 'words: the targets are the four A\'s in BANANA and HAT');
  is(C.press(st).result === 'empty' && C.hint(st) === 'hintTap', 'words: press with nothing marked asks');
  T.forEach(id => C.mark(st, id));
  is(C.press(st).result === 'nocount' && C.hint(st) === 'hintCountSet' && st.misses === 0, 'words: all marked but no number — asks, not a miss');
  is(!C.setCount(st, 0) && !C.setCount(st, 7) && C.setCount(st, 3), 'words: count keys 1–6');
  is(C.press(st).result === 'count' && st.misses === 1 && C.hint(st) === 'hintCount', 'words: the wrong count — miss 1, "count the letters you found"');
  C.setCount(st, 4);
  is(C.press(st).result === 'ok' && st.done, 'words: every A marked and 4 — printed');
  const seen = new Set(); for (let p = 0; p < 30; p++) seen.add(C.newState(r, rnd, p).words.map(w => w.word).join());
  is(seen.size >= 4, `words: the three words are re-dealt (${seen.size} orders)`);
})();

/* 5. the posters */
const PL = { en: 26, it: 26, nl: 26, de: 29, es: 27, pt: 27, fr: 27, sv: 29, da: 29, no: 29, fi: 29 };
L.forEach(l => { const P = C.POSTER[l]; is(P.length === PL[l] && new Set(P).size === P.length && P.every(c => up(c) && other(c)), `${l}: the poster has ${PL[l]} capitals, each with a pair`); });
is(C.POSTER.es.indexOf('Ñ') === C.POSTER.es.indexOf('N') + 1 && C.POSTER.sv.slice(-3).join('') === 'ÅÄÖ' && C.POSTER.da.slice(-3).join('') === 'ÆØÅ' && C.POSTER.fi.slice(-3).join('') === 'ÅÄÖ' && C.POSTER.fr.indexOf('É') === C.POSTER.fr.indexOf('E') + 1 && C.POSTER.pt.indexOf('Ç') === C.POSTER.pt.indexOf('C') + 1, 'the locale letters sit in their school places (Ñ after N; ÅÄÖ, ÆØÅ last; É after E; Ç after C)');
is(!C.POSTER.de.includes('ß') && !C.POSTER.nl.includes('IJ'), 'no ß and no IJ cell');
L.forEach(l => { const P = C.POSTER[l]; C.rounds(l, 'pairs').concat(C.rounds(l, 'look')).forEach(r => { const t = r.kind === 'pairs' ? (r.upper ? r.given : r.answer) : (up(r.target) ? r.target : other(r.target)); is(P.indexOf(t) >= 0, `${l} ${r.id}: ${t} has a cell on the poster`); }); });

/* 6. order */
L.forEach(l => ['pairs', 'look', 'words'].forEach(lv => {
  const pool = C.rounds(l, lv); let bad = 0, same = 0, run = 0, prev = null;
  for (let i = 0; i < 800; i++) { const o = C.order(pool, rnd, prev); if (o.slice().sort((a, b) => a - b).join() !== pool.map((_, j) => j).join()) bad++; if (prev && o.join() === prev.join()) same++; for (let q = 2; q < o.length; q++) { const a = pool[o[q]], b = pool[o[q - 1]], c = pool[o[q - 2]]; if (lv === 'pairs' ? (a.upper === b.upper && a.upper === c.upper) : (a.answer === b.answer && a.answer === c.answer)) run++; } prev = o; }
  is(bad === 0 && same === 0 && run === 0, `${l} ${lv}: fresh permutations; ${lv === 'pairs' ? 'never three same-direction rounds running' : 'never the same count three times running'}`);
}));
is(C.level('x') === 'pairs' && C.dir('x') === 'both' && C.loc('xx') === 'en', 'defaults');

/* 7. strings */
const actx = { window: {}, TypeCaseCore: C }; vm.createContext(actx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'type-case-activity.js'), 'utf8') + '\n;this.__A = TypeCaseActivity;', actx);
const A = actx.__A, S = A.strings, SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'type-case-activity.js'), 'utf8');
const CORE_SRC = fs.readFileSync(path.join(DIR, 'type-case-core.js'), 'utf8').replace(/\r\n/g, '\n');
const code = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + CORE_SRC.slice(CORE_SRC.indexOf('function hint(st)'), CORE_SRC.indexOf('/* order-only'));
is(/'hintBoth'/.test(code), 'the core\'s hint() was found');
Object.keys(S).forEach(k => {
  L.forEach(l => is(typeof S[k][l] === 'string' && S[k][l].trim().length > 0, `${k}.${l} present`));
  const ph = (S[k].en.match(/\{\w+\}/g) || []).sort().join();
  L.forEach(l => is(((S[k][l] || '').match(/\{\w+\}/g) || []).sort().join() === ph, `${k}.${l}: the placeholders of en`));
  is(k === 'title' || k === 'instruction' || new RegExp("'" + k + "'").test(code), `${k}: reached from the code`);
});
for (const k in S) for (const l of L) {
  const s = S[k][l] || '';
  is(!/  /.test(s) && !/undefined/.test(s), `${k}.${l}: clean`);
  if (l === 'fr') is(!/ [!?:;]/.test(s), `${k}.fr: U+202F before ! ? : ;`);
  const FREE = { en: 'free', de: 'kostenlos|gratis|frei', fr: 'gratuit\\w*|libre', es: 'gratis|libre', pt: 'gr[aá]tis|livre', it: 'gratis|libero|gratuit\\w*', nl: 'gratis|vrij', sv: 'gratis|ledig|fri', da: 'gratis|ledig|fri', no: 'gratis|ledig|fri', fi: 'ilmai\\w*|vapaa' }[l];
  is(!new RegExp('(?<!\\p{L})(' + FREE + ')(?!\\p{L})', 'iu').test(s), `${k}.${l}: no word for "free"`);
  if (l === 'es') is(!/(?<!\p{L})(vosotros|coge|ordenador|vale)(?!\p{L})/iu.test(s), `${k}.es: Mexican, not peninsular`);
}
const banPoison = (l, s) => new RegExp('(?<!\\p{L})(' + { pt: 'gr[aá]tis|livre', fr: 'gratuit\\w*|libre' }[l] + ')(?!\\p{L})', 'iu').test(s);
is(banPoison('pt', 'é livre') && !banPoison('fr', 'le livre'), 'the ban is poisoned both ways');
is(A.settings.map(s => s.key).join() === 'level,direction' && A.settings[0].options.length === 3 && A.settings[1].options.length === 3, 'two settings: level (3) and direction (3)');
/* the prompt never prints the answer: Big-and-small prompts carry only {given} */
is(['pCap', 'pSmall'].every(k => !/\{target\}|\{Target\}/.test(S[k].en)), 'the Big-and-small prompts name the given letter, never the answer');

/* 8. layout */
[320, 360, 412, 704, 768, 1024, 1366].forEach(W => { const stage = W >= 704 ? Math.min(W, 820) - 56 : W - 32, Ly = C.layout(stage); is(Ly.sort >= 44 && Ly.sortH >= 44 && Ly.stick >= 44 && Ly.key >= 44, `${W}: sorts, stick sorts and count keys ≥ 44 px`); is(Ly.sort * 4 + 3 * 8 + 16 <= (Ly.mode === 'wide' ? Ly.left : stage), `${W}: four tray sorts fit across`); });

console.log(`verify-type-case-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
