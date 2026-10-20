#!/usr/bin/env node
/* =====================================================================
   verify-word-elastic-core.js — build gate for ACTIVITY #58, The Word
   Elastic (mini tools/word-elastic-core.js, RF.K.3, 11 locales). Its OWN
   ground truth (never read off the core's answers):
     0. every word and its sound split is its sound-boxes-bank-<loc>.json
        row (no authored splits); its picture exists, is a colour drawing,
        is not refused, carries the library's own name in that locale (the
        only re-points: the decorated sun → beach/sun, the pot-pan → pan)
     1. the sounds (+ fr quiet letters) spell the word; simple words are
        one letter per sound, 3 beads (4 in es/it/pt/fi; fr 3–4); quiet
        letters only in fr; every shown Words setting has ≥ 7 rounds, da
        shows no letter teams
     2. traps: never a sound of the word, never an alternative spelling of
        one (its own table), a vowel among them, 4 for 3-bead / 3 for
        4-bead words; a team word's tray holds the team's single letters;
        en = the design's table
     3. trays never read the word in order; no slot holds a right letter
        more than 22 % of the time; missing beads 4 middle / 3 last / 2
        first per nine; blend: exactly one picture named by the word, a
        one-letter neighbour whenever the bank has one, the right picture
        a third of the time in each place; bank: four words of one length
     4. the state machine: an empty bead asks (no miss); a wrong vowel
        kicks the middle bead; tac kicks both ends (order); miss 2 → the
        place hint + two lit tiles; miss 3 → the ghost; a move takes the
        help away; a given bead cannot be moved; the band stops at the bead
        count; stretch it yourself: too many / too few; typing never adds a
        bead; two single letters where a team belongs; blend picks; typed
        letters are case-blind (de Hut)
     5. strings × 11 with en's placeholders, every hint key the core can
        return is authored; the manifest mirrors the core; frozen en
        metadata; the other two cvc-builder rows untouched
   Usage: node scripts/verify-word-elastic-core.js  (WEL_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(process.env.WEL_CORE_DIR || MT, 'word-elastic-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['camping/lake', 'easter/egg', 'At the Supermarket/egg', 'zoo animals/bear', 'forest creatures/bear', 'bakery/cake', 'At the Supermarket/cake', 'At the Supermarket/plum', 'At the Supermarket/butter', 'shapes/moon', 'kitchen tools/pan', 'around the house/glass', 'farm animals/ox', 'At the Supermarket/water', 'weather/sun', 'body parts/lip', 'clothing/pants', 'spring/rain', 'shapes/cone', 'colors/red', 'At the Supermarket/milk', 'At the Supermarket/juice'];   /* + milk and juice: plain bottles a child names «bottle» (row 56) */
const REPOINT = { 'weather/sun': 'beach/sun', 'kitchen tools/pan': 'around the house/pan' };
const VOW = 'aeiouyäöüåæøéèêëàáâãíìîïóòôõúùûœ';
/* letters that can spell the same sound — never a trap (the gate's own table) */
const ALT = {
  en: [['c', 'k'], ['c', 'q'], ['k', 'q'], ['c', 's'], ['j', 'g'], ['f', 'v'], ['x', 'k'], ['ck', 'k'], ['ck', 'c']],
  de: [['f', 'v'], ['v', 'w'], ['z', 'c'], ['z', 't'], ['s', 'ß'], ['s', 'z'], ['k', 'c'], ['k', 'g'], ['t', 'd'], ['b', 'p']],
  nl: [['k', 'c'], ['s', 'z'], ['s', 'c'], ['f', 'v'], ['v', 'w'], ['t', 'd'], ['g', 'c']],
  da: [['k', 'c'], ['k', 'g'], ['s', 'c'], ['d', 't'], ['v', 'f'], ['v', 'w'], ['j', 'g']],
  sv: [['k', 'c'], ['k', 'g'], ['s', 'c'], ['s', 'z'], ['j', 'g'], ['j', 'h'], ['v', 'f'], ['v', 'w'], ['o', 'å']],
  no: [['k', 'c'], ['k', 'g'], ['s', 'c'], ['s', 'z'], ['j', 'g'], ['j', 'h'], ['v', 'f'], ['v', 'w'], ['o', 'å']],
  es: [['b', 'v'], ['c', 'k'], ['c', 'q'], ['c', 's'], ['c', 'z'], ['s', 'z'], ['g', 'j'], ['y', 'i']],
  it: [['c', 'k'], ['c', 'q']],
  pt: [['s', 'c'], ['s', 'z'], ['s', 'ç'], ['c', 'k'], ['c', 'q'], ['g', 'j'], ['x', 's']],
  fr: [['c', 'k'], ['c', 'q'], ['k', 'q'], ['c', 's'], ['s', 'z'], ['g', 'j'], ['f', 'v']],
  fi: []
};
/* words ruled out for every use (a drawing children name otherwise: sv/da ben = leg or bone, nl bol, fi lava) */
const DENIED = { nl: ['bol'], sv: ['ben'], da: ['ben'], fi: ['lava'], de: ['Kleid', 'Elf'], es: ['taza'], fr: ['râpe', 'coq', 'sofa'] };   /* + de Kleid (final d is /t/), Elf (also «eleven»), es taza (z = s in Mexico), fr râpe (â = a), coq (the q is not heard), sofa (children say canapé) */
/* pictures one child may name with the other's word: never on one blend or bank */
const CONFUSE = { de: [['Huhn', 'Hahn']], es: [['gallo', 'pollo']] };
const conf = (loc, a, b) => (CONFUSE[loc] || []).some(([x, y]) => (x === a && y === b) || (x === b && y === a));
const altOf = (loc, a, b) => ALT[loc].some(([x, y]) => (x === a && y === b) || (x === b && y === a));
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const lo = (s) => String(s).toLocaleLowerCase();
const J = (a) => a.join(' ');

for (const loc of LOCS) {
  const bank = JSON.parse(fs.readFileSync(path.join(MT, 'sound-boxes-bank-' + loc + '.json'), 'utf8')).words;
  const D = C.DATA[loc], keys = D.simple.concat(D.teams);
  const usable = (b) => { let p = b.themeDir + '/' + b.noun; p = REPOINT[p] || p; const lab = (LABEL[p] || {})[loc]; return fs.existsSync(path.join(IMG, p + '@2x.webp')) && !REFUSED.includes(p) && lab && lo(lab[0]) === lo(b.display); };
  /* 0 — words, splits, pictures */
  for (const k of Object.keys(D.words)) {
    is(!(DENIED[loc] || []).includes(k), `${loc} ${k}: not a ruled-out word`);
    const w = C.word(loc, k), rows = bank.filter(b => b.display === k);
    is(rows.length >= 1, `${loc} ${k}: a bank row`);
    const row = rows.find(b => J(b.boxes) === J(w.sounds)) || null;
    if (keys.includes(k)) is(row, `${loc} ${k}: the split ${w.sounds.join('|')} is the bank's (${rows.map(b => b.boxes.join('|')).join(' / ')})`);
    const bankPic = rows.length ? rows[0].themeDir + '/' + rows[0].noun : null;
    is(rows.some(b => { const p = b.themeDir + '/' + b.noun; return p === w.pic || REPOINT[p] === w.pic; }), `${loc} ${k}: the bank's picture (${bankPic} → ${w.pic})`);
    is(fs.existsSync(path.join(IMG, w.pic + '@2x.webp')) && !BW.test(w.pic.split('/')[0]) && !REFUSED.includes(w.pic), `${loc} ${k}: a colour, unrefused picture on disk (${w.pic})`);
    const lab = (LABEL[w.pic] || {})[loc]; is(lab && lo(lab[0]) === lo(k), `${loc} ${k}: the library's own name for ${w.pic} (${lab && lab[0]})`);
  }
  /* 1 — spelling, bead counts, round counts */
  const four = ['es', 'it', 'pt', 'fi'].includes(loc);
  for (const k of keys) { const w = C.word(loc, k); is(lo(w.sounds.join('') + w.quiet) === lo(k), `${loc} ${k}: the sounds spell the word`); is(!w.quiet || (loc === 'fr' && D.teams.includes(k)), `${loc} ${k}: quiet letters only in the fr second set`); }
  for (const k of D.simple) { const w = C.word(loc, k); is(w.sounds.every(s => [...s].length === 1) && (four ? w.sounds.length === 4 : (loc === 'fr' ? [3, 4].includes(w.sounds.length) : w.sounds.length === 3)), `${loc} ${k}: one letter per sound, ${w.sounds.length} beads`); }
  for (const k of D.teams) { const w = C.word(loc, k); is(loc === 'fi' ? w.sounds.some((s, i) => s === w.sounds[i + 1]) : (w.sounds.some(s => [...s].length > 1) || w.quiet), `${loc} ${k}: ${loc === 'fi' ? 'a long sound (a doubled letter in two beads)' : 'a letter team or a quiet letter'}`); }
  const modes = C.wordModes(loc);
  is(D.simple.length >= 7, `${loc}: ≥ 7 simple words (${D.simple.length})`);
  is(loc === 'da' ? J(modes) === 'simple' : (D.teams.length >= 7 ? J(modes) === 'simple teams' : J(modes) === 'simple'), `${loc}: Words settings ${J(modes)}`);
  /* 2 — traps */
  for (const k of keys) {
    const w = C.word(loc, k), traps = (D.traps[k] || '').split(' ').filter(Boolean), snd = w.sounds.map(lo);
    const split = []; w.sounds.forEach(s => { if ([...s].length > 1) [...lo(s)].forEach(c => split.push(c)); });   /* a team's own single letters are the team tray's point */
    if (loc === 'pt') { const last = snd[snd.length - 1]; is(!traps.includes(last === 'o' ? 'u' : last === 'e' ? 'i' : '#'), `pt ${k}: no trap that makes the Brazilian sound of the final ${last}`); }
    for (const t of traps) { if (!split.includes(lo(t))) is(!snd.includes(lo(t)), `${loc} ${k}: trap ${t} is not a sound of the word`); if (!split.includes(lo(t))) is(!snd.some(s => altOf(loc, s, lo(t))), `${loc} ${k}: trap ${t} never spells a sound of the word`); }
    if (D.simple.includes(k)) {
      is(traps.length === (w.sounds.length === 4 ? 3 : 4), `${loc} ${k}: ${traps.length} traps`);
      is(traps.some(t => VOW.includes(lo(t))), `${loc} ${k}: a vowel among the traps (${J(traps)})`);
      if (loc === 'de') is(traps.filter(t => /^\p{Lu}/u.test(t)).length === 1, `${loc} ${k}: one capital trap beside the capital first letter`);
    } else if (loc !== 'fi') {
      const singles = []; w.sounds.forEach(s => { if ([...s].length > 1) [...lo(s)].forEach(c => { if (!snd.includes(c) && !singles.includes(c)) singles.push(c); }); });
      is(singles.every(c => traps.map(lo).includes(c)), `${loc} ${k}: the team's single letters are in the tray (${J(singles)} / ${J(traps)})`);
    }
  }
  /* 3 — trays, missing, blend, bank */
  const rnd = C.seeded('wel-' + loc);
  for (const wm of modes) for (const clue of ['beads', 'first', 'missing', 'bank']) {
    const R = C.rounds(loc, clue, wm);
    for (const r of R) {
      const n = r.sounds.length, share = {};
      let bad = 0;
      for (let s = 0; s < 1500; s++) {
        const o = C.dealTray(r, rnd), gs = o.map(i => r.tray[i].g);
        if (J(o.slice().sort((a, b) => a - b)) !== J(r.tray.map((_, i) => i))) bad++;
        if (clue !== 'missing') { const need = r.sounds.filter((_, q) => !r.given.includes(q)); for (let p = 0; p + need.length <= gs.length; p++) if (J(gs.slice(p, p + need.length)) === J(need) && need.length > 1) bad++; }
        o.forEach((tid, slot) => { if (r.sounds.includes(r.tray[tid].g)) share[slot + ':' + tid] = (share[slot + ':' + tid] || 0) + 1; });   /* per tile: a word with a repeated letter has two tiles of it */
      }
      const mx = Math.max(...Object.values(share)) / 1500;
      is(!bad, `${loc} ${r.id}: every tray order is a permutation and never reads the word in order`);
      const cap = 1 / r.tray.length + (r.tray.length <= 5 ? 0.12 : 0.08);   /* a tiny tray: the never-in-order rule alone tilts the shares a little */
      if (r.tray.length >= 5) is(mx <= cap, `${loc} ${r.id}: no slot holds a right letter more than ${Math.round(cap * 100)} % of the time (${Math.round(mx * 100)} %)`);
      if (clue === 'beads') is(r.tray.length === n + (D.traps[r.key] || '').split(' ').filter(Boolean).length && r.sounds.every(s => r.tray.filter(t => t.g === s).length === r.sounds.filter(x => x === s).length), `${loc} ${r.id}: the tray holds each sound tile (once per bead) and the traps`);
      if (clue === 'first') is(J(r.given) === '0' && !r.tray.some((t, q) => q < 1 && t.g === r.sounds[0] && r.sounds.indexOf(t.g) === 0 && r.sounds.slice(1).indexOf(t.g) < 0), `${loc} ${r.id}: the first bead is given and its letter is not in the tray`);
      if (clue === 'missing') is(r.given.length === n - 1 && r.tray.length === 4 && r.tray.filter(t => t.g === r.sounds[r.missing]).length === 1, `${loc} ${r.id}: one bead missing, the tray = its letter + three traps`);
      if (clue === 'bank') is(!r.bank.some(x => conf(loc, x, r.word)), `${loc} ${r.id}: no word a child uses alike in the bank`);
      if (clue === 'bank') { const sameLen = Object.keys(D.words).filter(x => x !== r.word && x.length === r.word.length).length + bank.filter(b => usable(b) && b.display !== r.word && b.display.length === r.word.length && !D.words[b.display]).length; is(r.bank.length === 4 && new Set(r.bank).size === 4 && r.bank.filter(b => b === r.word).length === 1 && (sameLen < 3 || r.bank.every(b => b.length === r.word.length)), `${loc} ${r.id}: a bank of four words, one length wherever the bank has three others (${J(r.bank)})`); }
    }
    if (clue === 'missing') R.forEach((r, i) => { const p = ['mid', 'last', 'first', 'mid', 'last', 'mid', 'first', 'last', 'mid'][i % 9], n = r.sounds.length, got = r.missing === 0 ? 'first' : r.missing === n - 1 ? 'last' : 'mid';
      is(n < 3 ? got === (p === 'first' ? 'first' : 'last') : got === p, `${loc} ${r.id}: the missing bead follows the 4 middle / 3 last / 2 first pattern (${p} → ${got})`); });
  }
  const all = bank.filter(b => b.boxes.every(x => [...x].length <= 3) && usable(b) && !(DENIED[loc] || []).includes(b.display));
  for (const wm of modes) for (const r of C.rounds(loc, 'blend', wm)) {
    const names = r.choices.map(c => c.key);
    is(names.filter(x => lo(x) === lo(r.word)).length === 1 && new Set(r.choices.map(c => c.pic)).size === 3, `${loc} ${r.id}: exactly one picture is the word, three pictures`);
    is(!names.some(x => conf(loc, x, r.word)), `${loc} ${r.id}: no picture a child names alike (${J(names)})`);
    const ham1 = all.filter(b => b.display !== r.word && !conf(loc, b.display, r.word) && b.display.length === r.word.length && [...lo(b.display)].filter((c, i) => c !== lo(r.word)[i]).length === 1);
    if (ham1.length) is(names.slice(1).some(x => x.length === r.word.length && [...lo(x)].filter((c, i) => c !== lo(r.word)[i]).length === 1), `${loc} ${r.id}: a one-letter neighbour among the pictures (${J(names)})`);
  }
}
for (let n = 7; n <= 30; n++) for (let s = 0; s < 60; s++) {
  const rnd = C.seeded('d' + n + s), ch = C.dealChoices(n, rnd), bk = C.dealBank(n, rnd), cc = [0, 0, 0], cb = [0, 0, 0, 0];
  ch.forEach(o => cc[o.indexOf(0)]++); bk.forEach(o => cb[o.indexOf(0)]++);
  if (Math.max(...cc) - Math.min(...cc) > 1 || Math.max(...cb) - Math.min(...cb) > 1) { is(false, `deal n=${n}: blend ${cc} / bank ${cb}`); break; }
}
PASS++;
/* en = the design's table */
const ENT = { cat: 'e o d g', hat: 'e o n p', hen: 'i a m r', net: 'i a m l', pig: 'e u b d', mop: 'u a b n', log: 'u a d p', cup: 'o a b m', mug: 'o a w n', bag: 'e o d p', van: 'e i w m', bed: 'i a p t', pen: 'i a b m', pot: 'u a b d', dog: 'u a b t', sun: 'o a m z', jug: 'o a p d' };
for (const [k, t] of Object.entries(ENT)) is(C.DATA.en.traps[k] === t, `en ${k}: the design's traps ${t} (cup: b, not the design's q — q spells /k/, which the design's own rule forbids)`);
is(J(C.DATA.en.teams) === 'fish ship duck sock rock lock ring bell', 'en letter teams: the design\'s eight');
is(!Object.keys(C.DATA.en.words).some(k => ['fox', 'egg', 'lip', 'chin'].includes(k)), 'en: fox, egg, lip, chin never used');

/* 4 — the state machine */
{
  const r = C.rounds('en', 'beads', 'simple')[0], st = C.newState(r, {});        /* cat: c a t | e o d g */
  const tid = (g) => r.tray.find(t => t.g === g).id;
  let x = C.check(st); is(x.kase === 'empty' && st.misses === 0, 'Check with no letters asks, no miss');
  is(!C.stretchTo(st, 9) || st.stretch === 3, 'the band stops at the bead count');
  C.place(st, tid('c')); C.place(st, tid('e')); C.place(st, tid('t'));
  x = C.check(st); is(x.kase === 'wrong' && J(x.wrong) === '1' && !x.order && C.hint(st) === 'hintWrong', 'a wrong vowel kicks the middle bead');
  C.clearBead(st, 1); is(!st.show && C.hint(st) === null, 'a move takes the hint away');
  C.place(st, tid('e'), 1); C.check(st); is(st.misses === 2 && C.helpOn(st) && C.hint(st) === 'hintMiddleSound', 'miss 2 → listen for the middle sound');
  const lit = C.litTiles(st); is(lit.length === 2 && lit.includes(tid('a')) && lit.includes(tid('e')), 'miss 2 lights the right tile and the chosen one');
  is(!C.ghostOn(st), 'no ghost at miss 2');
  C.check(st); is(C.ghostOn(st), 'the ghost at miss 3');
  C.place(st, tid('a'), 1); is(!C.helpOn(st), 'a move takes the help away');
  x = C.check(st); is(x.ok && st.done, 'cat → done');
  const dk = C.rounds('en', 'beads', 'teams').find(q => q.key === 'duck'), s9 = C.newState(dk, {}), did = (g) => dk.tray.find(q => q.g === g).id;
  C.place(s9, did('d')); C.place(s9, did('u')); C.place(s9, did('k')); x = C.check(s9);
  is(x.part && s9.misses === 1 && C.hint(s9) === 'hintTeam', 'k on the ck bead: the right sound, the team hint at once (never "not the sound")');
  const s2 = C.newState(r, {}); C.place(s2, tid('t')); C.place(s2, tid('a')); C.place(s2, tid('c'));
  x = C.check(s2); is(x.order && J(x.wrong) === '0 2' && C.hint(s2) === 'hintOrder', 'tac: both ends kicked, the order hint');
  const f = C.rounds('en', 'first', 'simple')[0], s3 = C.newState(f, {});
  is(s3.beads[0] && s3.beads[0].given && !C.clearBead(s3, 0) && !C.place(s3, 0, 0), 'a given bead cannot be moved');
  const sh = C.rounds('en', 'beads', 'teams').find(q => q.key === 'ship'), s4 = C.newState(sh, {});
  const sid = (g) => sh.tray.find(t => t.g === g).id;
  C.place(s4, sid('s'), 0); C.place(s4, sid('h'), 1); C.place(s4, sid('p'), 2);
  x = C.check(s4); x = C.check(s4); is(x.team === 0 && C.hint(s4) === 'hintTeam', 'two single letters where a team belongs → the team hint at miss 2');
  const t = C.rounds('en', 'stretch', 'simple')[0], s5 = C.newState(t, {});
  is(!C.type(s5, 'c') && s5.beads.length === 0, 'stretch it yourself: typing never adds a bead');
  C.stretchTo(s5, 4); ['c', 'a', 't', 'x'].forEach(g => C.type(s5, g));
  x = C.check(s5); is(x.kase === 'tooMany' && C.hint(s5) === 'hintTooMany', 'stretch: too many beads');
  C.stretchTo(s5, 2); x = C.check(s5); is(x.kase === 'tooFew' && x.gap === 2 && C.hint(s5) === 'hintTooFew', 'stretch: too few beads, the gap after the matching beads');
  C.stretchTo(s5, 3); C.type(s5, 't'); x = C.check(s5); is(x.ok, 'stretch: c a t → done');
  const de = C.rounds('de', 'write', 'simple').find(q => q.key === 'Hut'), s6 = C.newState(de, {});
  ['h', 'u', 't'].forEach(g => C.type(s6, g)); is(C.check(s6).ok, 'typed letters are case-blind (de hut = Hut)');
  const dt = C.rounds('de', 'beads', 'simple').find(q => q.key === 'Hut'), s7 = C.newState(dt, {});
  const lower = dt.tray.find(q => q.g === 'h'); is(!lower, 'de: no lower-case h tile for the capital H');
  const b = C.rounds('en', 'blend', 'simple')[0], s8 = C.newState(b, { choiceOrder: [1, 0, 2] });
  x = C.check(s8); is(x.kase === 'empty' && s8.misses === 0, 'blend: Check with no picture asks');
  C.pick(s8, 0); x = C.check(s8); is(x.kase === 'wrongPick' && s8.misses === 1 && C.hint(s8) === 'hintBlend', 'blend: a wrong picture → miss');
  C.pick(s8, 1); x = C.check(s8); is(x.ok, 'blend: the word\'s picture → done');
}
/* order */
for (let s = 0; s < 600; s++) { const rnd = C.seeded('o' + s), p = new Array([2, 3, 9][s % 3]).fill(0), a = C.order(p, rnd, null), b2 = C.order(p, rnd, a); if (J(a) === J(b2)) { is(false, 'order() repeated the previous pass'); break; } }
PASS++;

/* 5 — strings, manifest, frozen metadata */
const ACT = fs.readFileSync(path.join(MT, 'word-elastic-activity.js'), 'utf8');
const sb = ACT.slice(ACT.indexOf('/*STRINGS-BEGIN*/'), ACT.indexOf('/*STRINGS-END*/'));
const STR = {}; sb.replace(/^\s*(\w+):\s*\{(.*)\},?\s*$/gm, (m, k, body) => { STR[k] = {}; body.replace(/(\w\w):'((?:[^'\\]|\\.)*)'/g, (mm, l, v) => { STR[k][l] = v; }); });
is(Object.keys(STR).length >= 40, `strings parsed (${Object.keys(STR).length})`);
for (const [k, v] of Object.entries(STR)) {
  is(LOCS.every(l => v[l]), `string ${k}: all 11 locales`);
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  is(LOCS.every(l => !v[l] || ph(v[l]) === ph(v.en)), `string ${k}: every locale has en's placeholders`);
  is(!LOCS.some(l => /\b(free|gratis|gratuit|kostenlos|grátis|ilmai)/i.test(v[l] || '')), `string ${k}: no "free"`);
}
const HINTS = ['hintEmpty', 'hintPull', 'hintWrong', 'hintOrder', 'hintFirstSound', 'hintMiddleSound', 'hintLastSound', 'hintTeam', 'hintTooMany', 'hintTooFew', 'hintPick', 'hintBlend', 'hintBlendHelp'];
for (const h of HINTS) is(STR[h], `hint ${h} is authored`);
for (const k of Object.keys(STR).filter(k => /^hint/.test(k))) is(HINTS.includes(k), `string ${k} is a hint the core can return`);
const CORE = fs.readFileSync(path.join(process.env.WEL_CORE_DIR || MT, 'word-elastic-core.js'), 'utf8');
for (const h of HINTS) is(CORE.includes("'" + h + "'"), `the core can return ${h}`);
const MAN = JSON.parse(fs.readFileSync(path.join(MT, 'cvc-builder-activities.json'), 'utf8'));
const row = MAN.find(r => r.id === 'cvc-builder.build-cvc-word.rf-k-3');
is(row && row.tool === 'word-elastic-activity', 'manifest: the row kept, tool repointed');
for (const loc of LOCS) {
  is(J(Object.keys(row.params.byLocale[loc] || {})) === J(C.wordModes(loc)), `manifest ${loc}: Words settings mirror the core`);
  for (const wm of C.wordModes(loc)) is(J(row.params.byLocale[loc][wm]) === J(C.rounds(loc, 'beads', wm).map(r => r.key)), `manifest ${loc} ${wm}: words mirror the core`);
  is(/^[a-z0-9-]+$/.test(row.slug[loc] || '') && row.page_title[loc] && row.page_intro[loc], `manifest ${loc}: url-safe slug, title, intro`);
  is(!/\b(free|gratis|gratuit|kostenlos|grátis|ilmai)/i.test(row.page_intro[loc] || ''), `manifest ${loc}: no "free"`);
  if (['es', 'it', 'pt', 'fi'].includes(loc)) is(!/\b(cvc|tre lettere|tres letras|três letras|kolme kirjain)/i.test(row.page_title[loc] + row.page_intro[loc]), `manifest ${loc}: never promises three-letter words`);
}
const FROZEN_AT = 'dfb143f9';
try {
  const was = JSON.parse(cp.execSync(`git show ${FROZEN_AT}:"mini tools/cvc-builder-activities.json"`, { cwd: ROOT, maxBuffer: 1 << 26 }).toString());
  const old = was.find(r => r.id === row.id);
  is(row.slug.en === old.slug.en && row.page_title.en === old.page_title.en && row.page_intro.en === old.page_intro.en, 'manifest en: slug / title / intro frozen');
  is(J(Object.values(row.alignment)) === J(Object.values(old.alignment)), 'manifest: alignment unchanged');
  is(JSON.stringify(MAN.filter(r => r.id !== row.id)) === JSON.stringify(was.filter(r => r.id !== row.id)), 'cvc-builder-activities.json: the other two rows untouched');
} catch (e) { is(false, 'frozen metadata from git: ' + e.message); }

console.log(`verify-word-elastic-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
