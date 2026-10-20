#!/usr/bin/env node
/* =====================================================================
   verify-lid-boxes-core.js — build gate for ACTIVITY #55, the Pop-Up
   Sound Boxes (mini tools/lid-boxes-core.js, RF.K.2.d, 11 locales).
   Its OWN ground truth (never read off the core's answers):
     0. every word: its boxes are EXACTLY its locale's sound-boxes bank
        split (read from the bank file), one sound key per box, its picture
        exists on disk, is a colour drawing, is not a refused drawing, and no
        two words of a locale share a picture
     1. Task 1 (same sound): the answer shares the ASKED sound by key; no
        distractor does — nor even the asked LETTERS (no long-vs-short tell);
        at least one distractor shares a sound at ANOTHER place (the lesson);
        middle rounds use three-box words only; it/fi/es/pt offer no middle
     2. the lid test, re-implemented here: first meets first, last meets
        last, middle boxes only between equal-length words; matched BY KEY
        (cat/kite pop together; letters never decide)
     3. Task 2 (where): the card is one box, exactly once in the word, no
        other box contains its letters; answers 4 first · 4 middle · 4 last
     4. Task 3 (sort): YES iff the key is in the word; 4 YES · 4 NO; YES
        spelled the same way; NO words hold no box with the card's letters
     5. the state machine: Check with nothing placed asks (no miss); a miss
        → help only at miss 2; any move takes the help away; right = done
     6. rounds: ≥ 7 per task / position / locale; mixed never repeats a
        target back to back; deal() puts the answer in each slot a third of
        the time; order() never repeats the previous pass
     7. no counting task (New 214 owns counting); strings complete × 11
     8. manifest: the kept id, the new tool, byLocale mirrors the core, the
        frozen en/de/es/pt/it/nl metadata unchanged, slugs url-safe ×11
   Usage: node scripts/verify-lid-boxes-core.js  (LBX_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(process.env.LBX_CORE_DIR || MT, 'lid-boxes-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const NOMID = ['it', 'fi', 'es', 'pt'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['camping/lake', 'easter/egg', 'At the Supermarket/egg', 'zoo animals/bear', 'forest creatures/bear', 'bakery/cake', 'At the Supermarket/cake', 'At the Supermarket/plum', 'shapes/moon', 'kitchen tools/pan', 'around the house/glass'];

/* the gate's own lid rule */
function lid(A, B) {
  const nA = A.keys.length, nB = B.keys.length, out = [{ i: 0, j: 0 }];
  if (nA === nB) for (let m = 1; m < nA - 1; m++) out.push({ i: m, j: m });
  out.push({ i: nA - 1, j: nB - 1 });
  return out.map(p => Object.assign(p, { same: A.keys[p.i] === B.keys[p.j] }));
}
const askedIx = (W, P) => P === 'first' ? 0 : P === 'last' ? W.keys.length - 1 : (W.keys.length === 3 ? 1 : -1);

is(JSON.stringify(C.LOCALES.slice().sort()) === JSON.stringify(LOCS.slice().sort()), 'eleven locales');
is(JSON.stringify(C.TASKS) === JSON.stringify(['same', 'where', 'sort']), 'three tasks, no counting task (New 214 owns counting)');

for (const loc of LOCS) {
  const bank = JSON.parse(fs.readFileSync(path.join(MT, 'sound-boxes-bank-' + loc + '.json'), 'utf8'));
  const syl = new Set(bank.stages.filter(s => s.type === 'syllables').map(s => s.id));
  const words = Object.keys(C.DATA[loc].words), pics = {};
  /* 0. words */
  for (const w of words) {
    const W = C.word(loc, w), tag = `[${loc} ${w}]`;
    is(W.boxes.length === W.keys.length && W.boxes.length >= 2, `${tag} one key per box`);
    const bw = bank.words.find(b => b.display.toLowerCase() === w.toLowerCase() && !syl.has(b.stage));
    is(!!bw, `${tag} is in the sound-boxes bank (phoneme stage)`);
    if (bw) {
      is(bw.boxes.map(x => x.toLowerCase()).join('.') === W.boxes.join('.'), `${tag} boxes = the bank split (${bw.boxes.join('.')} vs ${W.boxes.join('.')})`);
      is((bw.silentTail || '') === W.tail, `${tag} silent tail = the bank's`);
    }
    is(fs.existsSync(path.join(IMG, W.pic + '@2x.webp')), `${tag} picture ${W.pic} exists`);
    is(!BW.test(W.pic.split('/')[0]), `${tag} colour picture`);
    is(!REFUSED.includes(W.pic), `${tag} not a refused drawing (${W.pic})`);
    is(!pics[W.pic], `${tag} picture not shared with ${pics[W.pic]}`); pics[W.pic] = w;
    is(!/(^| )fox$|^box$/.test(w), `${tag} no four-sound word in a three-box task (fox/box)`);
  }
  /* 1. Task 1 */
  const P = C.positions(loc);
  is(NOMID.includes(loc) ? !P.includes('middle') : JSON.stringify(P) === JSON.stringify(['first', 'middle', 'last']), `[${loc}] positions ${P.join(',')}`);
  if (NOMID.includes(loc)) is(C.pos(loc, 'middle') === 'mixed', `[${loc}] a Middle setting falls back to Mixed (never faked)`);
  for (const pos of P.concat(['mixed'])) {
    const R = C.rounds(loc, 'same', pos);
    is(R.length >= 7, `[${loc} same ${pos}] ≥ 7 rounds (${R.length})`);
    is(new Set(R.map(r => r.id)).size === R.length, `[${loc} same ${pos}] ids unique`);
    if (pos === 'mixed') is(new Set(R.map(r => r.target.word)).size === R.length, `[${loc} mixed] every target once (no reshuffle can repeat it back to back)`);
    for (const r of R) {
      const tag = `[${loc} ${r.id}]`, ai = askedIx(r.target, r.pos);
      is(ai >= 0, `${tag} the asked box exists`);
      if (r.pos === 'middle') is(r.target.keys.length === 3 && r.cands.every(c => c.w.keys.length === 3), `${tag} middle rounds use three-box words`);
      const sharesAsked = c => lid(r.target, c.w).some(p => p.i === ai && p.same);
      const ans = r.cands.filter(sharesAsked);
      is(ans.length === 1 && ans[0].role === 'answer', `${tag} exactly one right answer, the answer (${ans.map(c => c.w.word)})`);
      for (const c of r.cands.filter(c => c.role !== 'answer')) {
        const p = lid(r.target, c.w).find(p => p.i === ai);
        is(!p || c.w.boxes[p.j] !== r.target.boxes[ai], `${tag} ${c.w.word}: no letter tell at the asked place`);
        is(!p || !(c.w.boxes[p.j].includes(r.target.boxes[ai]) || r.target.boxes[ai].includes(c.w.boxes[p.j])), `${tag} ${c.w.word}: the asked letters are not inside its box`);
      }
      is(r.cands.some(c => c.role !== 'answer' && lid(r.target, c.w).some(p => p.i !== ai && p.same)), `${tag} a distractor shares a sound at another place (the lesson)`);
      is(new Set([r.target.word].concat(r.cands.map(c => c.w.word))).size === 4, `${tag} four different words`);
      /* 2. the core's lid test agrees with the gate's */
      for (const c of r.cands) is(JSON.stringify(C.lidTest(r.target, c.w).map(p => [p.i, p.j, p.same])) === JSON.stringify(lid(r.target, c.w).map(p => [p.i, p.j, p.same])), `${tag} lid test ${c.w.word}`);
      /* 5. the state machine */
      const st = C.newState(r, { layout: [2, 0, 1] });
      let o = C.check(st); is(!o.ok && o.kase === 'empty' && st.misses === 0, `${tag} Check with nothing on the boxes asks (no miss)`);
      const slotOf = role => st.layout.indexOf(['answer', 'd1', 'd2'].indexOf(role));
      C.drop(st, slotOf('d1')); o = C.check(st); is(!o.ok && st.misses === 1 && !C.helpOn(st) && st.test === -1, `${tag} miss 1: no help, the picture goes back`);
      C.drop(st, slotOf('d2')); o = C.check(st); is(!o.ok && st.misses === 2 && C.helpOn(st), `${tag} miss 2: the help`);
      C.drop(st, slotOf('d1')); is(!C.helpOn(st), `${tag} a move takes the help away`);
      C.drop(st, slotOf('answer')); o = C.check(st); is(o.ok && st.done, `${tag} the answer is right`);
    }
  }
  /* 3. Task 2 */
  const W2 = C.rounds(loc, 'where'), cnt = { first: 0, middle: 0, last: 0 };
  is(W2.length >= 7, `[${loc} where] ≥ 7 rounds`);
  for (const r of W2) {
    const tag = `[${loc} ${r.id}]`, b = r.target.boxes;
    is(b.filter(x => x === r.card).length === 1 && b.indexOf(r.card) === r.answer, `${tag} the card ${r.card} is exactly one box, the answer`);
    is(b.every((x, j) => j === r.answer || !(x.includes(r.card) || (r.card.length === 1 && x.includes(r.card)))), `${tag} no other box holds the card (a letter team is one box: t is not th)`);
    const k = r.target.keys[r.answer]; is(r.target.keys.filter(x => x === k).length === 1, `${tag} the sound occurs once`);
    const role = r.answer === 0 ? 'first' : r.answer === b.length - 1 ? 'last' : 'middle'; cnt[role]++;
    is(r.pos === role, `${tag} position word = the box's place`);
    const st = C.newState(r, {}); let o = C.check(st); is(o.kase === 'empty' && st.misses === 0, `${tag} Check with no box asks`);
    C.choose(st, (r.answer + 1) % b.length); o = C.check(st); is(!o.ok && st.misses === 1, `${tag} a wrong box is a miss`);
    C.choose(st, r.answer); o = C.check(st); is(o.ok && st.done, `${tag} the right box`);
  }
  is(cnt.first === 4 && cnt.middle === 4 && cnt.last === 4, `[${loc} where] exactly 4 first · 4 middle · 4 last (${JSON.stringify(cnt)})`);
  /* 4. Task 3 */
  const S = C.rounds(loc, 'sort');
  is(S.length >= 7, `[${loc} sort] ≥ 7 sets`);
  let varied = 0;
  for (const r of S) {
    const tag = `[${loc} ${r.id}]`;
    is(r.items.length === 8 && r.items.filter(x => x.yes).length === 4, `${tag} 4 YES · 4 NO`);
    for (const it of r.items) {
      is(it.yes === it.w.keys.includes(r.key), `${tag} ${it.w.word}: YES iff the sound is in the word`);
      if (it.yes) is(it.w.boxes[it.w.keys.indexOf(r.key)] === r.card, `${tag} ${it.w.word}: spelled with the card`);
      else is(!it.w.boxes.some(x => x.includes(r.card) || (x.length > 1 && r.card.includes(x))), `${tag} ${it.w.word}: no box with the card's letters`);
    }
    const places = new Set(r.items.filter(x => x.yes).map(x => { const i = x.w.keys.indexOf(r.key), n = x.w.keys.length; return i === 0 ? 'f' : i === n - 1 ? 'l' : 'm'; }));
    if (places.size >= 2) varied++;
    const st = C.newState(r, {}); let o = C.check(st); is(o.kase === 'empty' && st.misses === 0, `${tag} Check with pictures left asks`);
    r.items.forEach((it, i) => C.place(st, i, it.yes ? 'no' : 'yes')); o = C.check(st); is(!o.ok && o.wrong.length === 8, `${tag} all wrong → 8 shown`);
    r.items.forEach((it, i) => C.place(st, i, it.yes ? 'yes' : 'no')); o = C.check(st); is(o.ok && st.done, `${tag} all right`);
  }
  is(varied >= Math.ceil(S.length / 2), `[${loc} sort] the sound sits at different places in most sets (${varied}/${S.length})`);
}
/* the c/k lesson: cat and kite pop together */
{ const cat = C.word('en', 'cat'), kite = C.word('en', 'kite'); is(C.lidTest(cat, kite)[0].same && cat.boxes[0] !== kite.boxes[0], 'cat/kite: different letters, the first lids pop together'); }
/* the legacy en targets are kept */
{ const T = new Set(['first', 'middle', 'last'].flatMap(P => C.rounds('en', 'same', P).map(r => r.target.word))); for (const w of ['cat', 'bat', 'pig', 'hat', 'sun', 'dog', 'van']) is(T.has(w), `en keeps the legacy target ${w}`); }
/* 6. deal + order */
{
  const rnd = C.seeded('gate'); let bad = 0, adj = 0, tot = 0;
  for (let k = 0; k < 2000; k++) {
    const n = 9, d = C.deal(n, rnd), slots = [0, 0, 0];
    d.forEach(l => { slots[l.indexOf(0)]++; tot++; if (Math.abs(l.indexOf(0) - l.indexOf(1)) === 1) adj++; if (new Set(l).size !== 3) bad++; });
    if (slots.some(s => s < 2 || s > 4)) bad++;
  }
  is(bad === 0, `deal: every slot holds the answer a third of the time (±1), layouts are permutations (${bad} bad)`);
  is(Math.abs(adj / tot - 0.5) < 0.12, `deal: the sharing distractor sits beside the answer about half the time (${(adj / tot).toFixed(2)})`);
  const pool = C.rounds('en', 'same', 'mixed'); let rep = 0, prev = null;
  for (let k = 0; k < 2000; k++) { const o = C.order(pool, rnd, prev); if (prev && o.join() === prev.join()) rep++; prev = o; }
  is(rep === 0, 'order: a pass never repeats the previous order');
  const small = pool.slice(0, 3); let rep3 = 0, p3 = null;
  for (let k = 0; k < 2000; k++) { const o = C.order(small, rnd, p3); if (p3 && o.join() === p3.join()) rep3++; p3 = o; }
  is(rep3 === 0, 'order: even a three-round pool never repeats the previous pass');
}
/* 7. strings */
const A = (() => { const ctx = { window: {}, LidBoxesCore: C, document: undefined }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'lid-boxes-activity.js'), 'utf8') + '\n;this.__A = LidBoxesActivity;', ctx); return ctx.__A; })();
const actSrc = fs.readFileSync(path.join(MT, 'lid-boxes-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const [k, v] of Object.entries(A.strings)) {
  is(LOCS.every(l => typeof v[l] === 'string' && v[l].length), `strings.${k}: all 11 locales`);
  const refs = ['title', 'instruction'].includes(k) || actSrc.includes("'" + k + "'") || /^(pSame|hintOther|hintListen|okWhere)/.test(k) && actSrc.includes("'" + k.replace(/(First|Middle|Last)$/, '') + "'") || /^(okFirst|okMiddle|okLast|pos(First|Middle|Last))$/.test(k) || /^hint/.test(k) && fs.readFileSync(path.join(process.env.LBX_CORE_DIR || MT, 'lid-boxes-core.js'), 'utf8').includes("'" + k.replace(/(First|Middle|Last)$/, '') + "'");
  is(refs, `strings.${k} is reached by the code`);
  for (const l of LOCS) { const vars = (v[l].match(/\{\w+\}/g) || []).sort().join(); const en = (v.en.match(/\{\w+\}/g) || []).sort().join(); is(vars === en || k === 'hintSortHelp', `strings.${k}.${l}: the same placeholders as en`); }
  is(!LOCS.some(l => /\b(free|gratis|gratuit|kostenlos)\b/i.test(v[l])), `strings.${k}: no "free"`);
}
/* 8. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'sound-boxes-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'sound-boxes.phoneme-position.rf-k-2-d' && rows[0].tool === 'lid-boxes-activity', 'manifest: the kept id, the new tool');
for (const loc of LOCS) {
  const b = rows[0].params.byLocale[loc];
  is(!!b && JSON.stringify(b.where) === JSON.stringify(C.rounds(loc, 'where').map(r => r.id)) && JSON.stringify(b.sort) === JSON.stringify(C.rounds(loc, 'sort').map(r => r.id)), `manifest ${loc}: Task 2 / Task 3 mirror the core`);
  for (const P of C.positions(loc).concat(['mixed'])) is(b && JSON.stringify(b.same[P]) === JSON.stringify(C.rounds(loc, 'same', P).map(r => r.id)), `manifest ${loc} same ${P}: mirrors the core`);
  is(/^[a-z0-9-]+$/.test(rows[0].slug[loc] || '') && !!(rows[0].page_title[loc] && rows[0].page_intro[loc]), `manifest ${loc}: slug (url-safe), title and intro`);
}
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 3299bb2f:"mini tools/sound-boxes-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }))[0]; } catch (e) { return null; } })();
if (HEADROW) {
  for (const l of ['en', 'de', 'es', 'pt', 'it', 'nl']) for (const k of ['slug', 'page_title', 'page_intro']) is(HEADROW[k][l] === rows[0][k][l], `manifest ${k}.${l}: frozen`);
  is(JSON.stringify(HEADROW.alignment) === JSON.stringify(rows[0].alignment), 'manifest alignment: frozen');
} else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-lid-boxes-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
