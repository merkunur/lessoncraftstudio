#!/usr/bin/env node
/* =====================================================================
   verify-flip-card-core.js — build gate for ACTIVITY #56, Pepper's Flip
   Card (mini tools/flip-card-core.js, RF.K.2.e, 11 locales). Its OWN
   ground truth (never read off the core's answers):
     0. every word: one sound key per tile, ≤ 5 tiles, its picture exists,
        is a colour drawing, is not a refused drawing; no two words of a
        locale share a picture or the same sounds
     1. predict levels (first / other / add): the gate's own swap of the
        tile into the start's sounds gives EXACTLY the answer's sounds; no
        other choice gives them; first swaps the first sound, other a later
        one, add puts one sound at the start or the end
     2. swap: start and goal differ by exactly one sound; the tray holds
        four different tiles, the goal's tile among them
     3. chain: every step changes exactly one sound; each step's tray
        holds that step's tile
     4. no reachable result in a tray is a denied (rude) word
     5. levels: each shown level has ≥ 7 rounds; en shows all five and
        keeps the eight legacy rounds
     6. the state machine: Check with nothing chosen / nothing swapped asks
        (no miss); a miss → help only at miss 2; a move takes it away; the
        answer / the goal → done; a chain moves its goal on step by step
     7. deal / dealTray balance; order() never repeats the previous pass
     8. strings × 11 with en's placeholders; the manifest mirrors the core,
        en metadata frozen, every locale with a url-safe slug, title, intro
   Usage: node scripts/verify-flip-card-core.js  (FCD_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(process.env.FCD_CORE_DIR || MT, 'flip-card-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['camping/lake', 'easter/egg', 'At the Supermarket/egg', 'zoo animals/bear', 'forest creatures/bear', 'bakery/cake', 'At the Supermarket/cake', 'At the Supermarket/plum', 'shapes/moon', 'kitchen tools/pan', 'around the house/glass', 'farm animals/ox', 'At the Supermarket/water'];
const DENY = {
  en: ['k o k', 'd i k', 'f u k', 'sh i t', 'p i s', 't i t', 'k u m', 'f a g', 'b u m', 's e ks', 'a s', 'n o b', 'k r a p', 'h or'],
  de: ['f i k', 'p i s', 'sch ai s', 'k a k ə', 'h u: r ə', 'a r sch', 'p o: p o:', 'f o ts ə', 'm ö s ə'],
  nl: ['k u t', 'l u l', 'p i k', 'k a k', 'p i s', 'h oe r', 'k o n t', 'f i k'],
  sv: ['k ʉ: k', 'k u: k', 'f i t a', 'p i s', 'b a j s', 'h o: r a', 'f i t t a'],
  da: ['p i k', 'f i s', 'l o r t', 'k u s', 'p i s', 'r ø: v'],
  no: ['k ʉ: k', 'f i t ə', 'p i s', 'd r i t', 'p i k', 'r ʉ m p ə', 'h o r ə'],
  es: ['p u t a', 'k u l o', 'k a k a', 'p e d o', 'p i ch a', 'm i e r d a', 'p e n e', 'b o b o'],
  it: ['k u l o', 'k a kk a', 'p i s', 'tts o kk a', 'm e r d a', 'f i k a', 'p a l l e'],
  pt: ['p u t a', 'k u', 'b u n d a', 'm e r d a', 'p i k a', 'b o s t a', 'k a k a'],
  fr: ['k u', 'p i p i', 'k a k a', 'p ê', 'k o n', 'p u t', 'm ê r d'],
  fi: ['p i l l u', 'k u s i', 'p a s k a', 'v i t t u', 'p e r s e', 'k a k k a', 'p i s s a']
};
/* rude or unpleasant words a tray could SPELL */
const DENYL = { en: ['pee', 'poo', 'poop', 'fart', 'butt', 'pis', 'piss', 'shit', 'fuk', 'dik', 'cok', 'kok', 'tit', 'cum', 'fag', 'bum', 'ass', 'sex'], de: ['kot', 'kack', 'pisse', 'arsch', 'sau', 'mist', 'fick', 'po'], nl: ['pus', 'kut', 'lul', 'pik', 'kak', 'poep', 'pies', 'hoer'], sv: ['pus', 'kuk', 'fitta', 'bajs', 'kiss', 'piss', 'fis'], da: ['pik', 'fis', 'lort', 'kusse', 'tis', 'prut', 'pis'], no: ['pus', 'lus', 'kuk', 'fitte', 'dritt', 'tiss', 'bæsj', 'promp'], es: ['porro', 'paja', 'coca', 'puta', 'culo', 'caca', 'pedo', 'pito', 'pene', 'mierda', 'teta'], it: ['potta', 'porna', 'porca', 'merda', 'culo', 'cacca', 'piscia', 'tetta', 'fica'], pt: ['morta', 'morte', 'merda', 'puta', 'bosta', 'porra', 'cocô', 'xixi', 'peido', 'pinto', 'bunda'], fr: ['cul', 'caca', 'pipi', 'pet', 'con', 'zizi', 'crotte', 'pute', 'merde'], fi: ['pissa', 'kakka', 'paska', 'pylly', 'pieru', 'kusi', 'vittu', 'perse'] };
/* an honest flip: a picture only under its own spelling; a grey card never spells a pictured word; nothing rude */
function honest(loc, start, t, slot) {
  const ks = swap(start.keys, slot, t.k), lt = start.tiles.slice(); lt[slot] = t.g; const L = lt.join('').toLowerCase();
  if (DENY[loc].includes(J(ks)) || DENYL[loc].includes(L)) return 'rude';
  const ws = Object.keys(C.DATA[loc].words).map(w => C.word(loc, w)), w = ws.find(x => J(x.keys) === J(ks));
  if (w) return w.tiles.join('').toLowerCase() === L ? '' : 'the ' + w.word + ' picture under "' + L + '"';
  return ws.some(x => x.tiles.join('').toLowerCase() === L) ? 'a grey card spelling a pictured word "' + L + '"' : '';
}
/* the gate's own swap */
function swap(keys, slot, k) { const out = keys.slice(); if (slot === 'start') out.unshift(k); else if (slot === 'end') out.push(k); else out[slot] = k; return out; }
const J = a => a.join(' ');
const oneApart = (a, b) => a.length === b.length && a.filter((k, i) => k !== b[i]).length === 1;

is(JSON.stringify(C.LOCALES.slice().sort()) === JSON.stringify(LOCS.slice().sort()), 'eleven locales');
is(JSON.stringify(C.LEVEL_KEYS) === JSON.stringify(['first', 'other', 'swap', 'chain', 'add']), 'five levels');
for (const loc of LOCS) {
  const words = Object.keys(C.DATA[loc].words), pics = {}, sounds = {};
  /* 0. words */
  for (const w of words) {
    const W = C.word(loc, w), tag = `[${loc} ${w}]`;
    is(W.tiles.length === W.keys.length && W.tiles.length >= 1 && W.tiles.length <= 5, `${tag} one key per tile, ≤ 5 tiles`);
    is(fs.existsSync(path.join(IMG, W.pic + '@2x.webp')), `${tag} picture ${W.pic} exists`);
    is(!BW.test(W.pic.split('/')[0]), `${tag} colour picture`);
    is(!REFUSED.includes(W.pic), `${tag} not a refused drawing (${W.pic})`);
    is(!pics[W.pic], `${tag} picture not shared with ${pics[W.pic]}`); pics[W.pic] = w;
    is(!sounds[J(W.keys)], `${tag} sounds not shared with ${sounds[J(W.keys)]}`); sounds[J(W.keys)] = w;
    is(!DENY[loc].includes(J(W.keys)), `${tag} not a denied word`);
  }
  const byKeys = k => words.find(w => J(C.word(loc, w).keys) === k) || null;
  const lvls = C.levels(loc);
  is(lvls.length >= 2 && lvls[0] === 'first', `[${loc}] levels ${lvls.join(',')}`);
  if (loc === 'en') is(lvls.length === 5, 'en shows all five levels');
  for (const lv of lvls) {
    const R = C.rounds(loc, lv);
    is(R.length >= 7, `[${loc} ${lv}] ≥ 7 rounds (${R.length})`);
    is(new Set(R.map(r => r.id)).size === R.length, `[${loc} ${lv}] ids unique`);
    for (const r of R) {
      const tag = `[${loc} ${r.id}]`;
      if (r.choices) {
        /* 1. predict */
        const res = swap(r.start.keys, r.slot, r.tile.k);
        is(J(res) === J(r.answer.keys), `${tag} ${r.start.word} with ${r.tile.g} gives ${r.answer.word}`);
        is(r.choices.filter(c => J(c.keys) === J(res)).length === 1 && r.choices[0] === r.answer, `${tag} exactly one choice is the result`);
        is(new Set(r.choices.map(c => c.word)).size === 3, `${tag} three different choices`);
        const ai = r.slot === 'start' ? 0 : r.slot === 'end' ? r.answer.tiles.length - 1 : r.slot;
        is(r.answer.tiles[ai] === r.tile.g, `${tag} the tile is the answer's own letters (${r.tile.g})`);
        if (lv === 'first') is(r.slot === 0, `${tag} the first sound`);
        if (lv === 'other') is(typeof r.slot === 'number' && r.slot > 0, `${tag} a later sound`);
        if (lv === 'add') is((r.slot === 'start' || r.slot === 'end') && r.answer.keys.length === r.start.keys.length + 1, `${tag} one sound added at the ${r.slot}`);
        is(!DENY[loc].includes(J(res)), `${tag} not a denied result`);
        /* 6. state machine */
        const st = C.newState(r, { layout: [2, 0, 1] }); let o = C.check(st);
        is(!o.ok && o.kase === 'empty' && st.misses === 0, `${tag} Check with no picture asks`);
        C.guess(st, st.layout.indexOf(1)); o = C.check(st); is(!o.ok && st.misses === 1 && !C.helpOn(st) && o.face && o.face.word === r.answer.word, `${tag} miss 1: the card shows the real result`);
        C.guess(st, st.layout.indexOf(2)); o = C.check(st); is(st.misses === 2 && C.helpOn(st) && C.needSlot(st) === r.slot, `${tag} miss 2: the slot to change`);
        C.guess(st, st.layout.indexOf(1)); is(!C.helpOn(st), `${tag} a move takes the help away`);
        C.guess(st, st.layout.indexOf(0)); o = C.check(st); is(o.ok && st.done, `${tag} the answer`);
      } else if (lv === 'swap') {
        /* 2. swap */
        is(oneApart(r.start.keys, r.goal.keys), `${tag} ${r.start.word} → ${r.goal.word}: one sound apart`);
        is(r.tray.length === 4 && new Set(r.tray.map(t => t.g)).size === 4, `${tag} four different tiles`);
        const p = r.start.keys.findIndex((k, i) => k !== r.goal.keys[i]);
        is(r.tray.some(t => t.k === r.goal.keys[p] && t.g === r.goal.tiles[p]), `${tag} the goal's tile is in the tray`);
        for (const t of r.tray) r.start.keys.forEach((_, s) => { const h = honest(loc, r.start, t, s); is(!h, `${tag} tile ${t.g} at ${s}: an honest flip (${h})`); });
        const st = C.newState(r, { trayOrder: [3, 1, 0, 2] }); let o = C.check(st);
        is(o.kase === 'empty' && st.misses === 0, `${tag} Check with the card unchanged asks`);
        const tray = C.trayOf(st), gi = tray.findIndex(t => t.k === r.goal.keys[p] && t.g === r.goal.tiles[p]);
        const wi = tray.findIndex((t, i) => i !== gi && t.k !== r.start.keys[p]);
        C.put(st, p, wi); is(J(st.card.keys) === J(swap(r.start.keys, p, tray[wi].k)), `${tag} a swapped tile replaces the old one`);
        const f = C.face(loc, st.card), want = byKeys(J(st.card.keys));
        is((f ? f.word : null) === want, `${tag} the card flips to exactly the word its tiles make (${want || 'blank'})`);
        o = C.check(st); is(!o.ok && st.misses === 1, `${tag} a wrong card is a miss`);
        C.put(st, p, gi); o = C.check(st); is(o.ok && st.done, `${tag} the goal`);
      } else if (lv === 'chain') {
        /* 3. chain */
        is(r.words.length >= 3 && r.trays.length === r.words.length - 1, `${tag} three or more words, a tray per step`);
        const st = C.newState(r, { trayOrder: [1, 2, 3, 0] });
        for (let s = 0; s < r.words.length - 1; s++) {
          const a = r.words[s], b = r.words[s + 1];
          is(oneApart(a.keys, b.keys), `${tag} step ${a.word} → ${b.word}: one sound`);
          const p = a.keys.findIndex((k, i) => k !== b.keys[i]), tr = r.trays[s];
          is(tr.length === 4 && new Set(tr.map(t => t.g)).size === 4 && tr.some(t => t.k === b.keys[p] && t.g === b.tiles[p]), `${tag} step ${s + 1}: four tiles, the step's tile among them`);
          for (const t of tr) a.keys.forEach((_, q) => { const h = honest(loc, a, t, q); is(!h, `${tag} step ${s + 1} tile ${t.g} at ${q}: an honest flip (${h})`); });
          is(st.goal.word === b.word, `${tag} the goal is ${b.word}`);
          const tray = C.trayOf(st), gi = tray.findIndex(t => t.k === b.keys[p] && t.g === b.tiles[p]);
          C.put(st, p, gi); const o = C.check(st);
          is(s < r.words.length - 2 ? (o.kase === 'step' && st.step === s + 1) : (o.ok && st.done), `${tag} step ${s + 1} reached`);
        }
        is(JSON.stringify(st.reached) === JSON.stringify(r.words.map(w => w.word)), `${tag} the strip holds every word`);
      }
    }
  }
}
/* 5. legacy en rounds */
{ const F = C.rounds('en', 'first').map(r => r.start.word + '>' + r.answer.word), O = C.rounds('en', 'other').map(r => r.start.word + '>' + r.answer.word);
  for (const p of ['cat>hat', 'pan>fan', 'van>pan', 'bat>cat', 'fan>van', 'hat>bat']) is(F.includes(p), `en keeps the legacy round ${p}`);
  for (const p of ['cat>cap', 'hat>ham']) is(O.includes(p), `en keeps the legacy round ${p}`); }
/* sound, not letter: en "cap" is k-a-p; the c tile is the k sound */
is(J(C.word('en', 'cap').keys) === 'k a p' && C.lookup('en', ['k', 'a', 't']).word === 'cat', 'en c = the k sound (lookup by sound)');
/* 7. deal + order */
{
  const rnd = C.seeded('gate'); let bad = 0, adj = 0, tot = 0, tb = 0;
  for (let k = 0; k < 2000; k++) {
    const d = C.deal(9, rnd), slots = [0, 0, 0];
    d.forEach(l => { slots[l.indexOf(0)]++; tot++; if (Math.abs(l.indexOf(0) - l.indexOf(1)) === 1) adj++; if (new Set(l).size !== 3) bad++; });
    if (slots.some(s => s < 2 || s > 4)) bad++;
    const t = C.dealTray(10, rnd), pos = [0, 0, 0, 0]; t.forEach(o => { pos[o.indexOf(0)]++; if (new Set(o).size !== 4) tb++; }); if (pos.some(p => p < 2 || p > 3)) tb++;
  }
  is(bad === 0, `deal: the answer in each slot a third of the time (±1) (${bad} bad)`);
  is(Math.abs(adj / tot - 0.5) < 0.12, `deal: the nearly picture beside the answer about half the time (${(adj / tot).toFixed(2)})`);
  is(tb === 0, `dealTray: the goal's tile in each of the four places (±1) (${tb} bad)`);
  const pool = C.rounds('en', 'first'); let rep = 0, prev = null;
  for (let k = 0; k < 2000; k++) { const o = C.order(pool.slice(0, 3), rnd, prev); if (prev && o.join() === prev.join()) rep++; prev = o; }
  is(rep === 0, 'order: a three-round pool never repeats the previous pass');
}
/* 8. strings + manifest */
const A = (() => { const ctx = { window: {}, FlipCardCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'flip-card-activity.js'), 'utf8') + '\n;this.__A = FlipCardActivity;', ctx); return ctx.__A; })();
const actSrc = fs.readFileSync(path.join(MT, 'flip-card-activity.js'), 'utf8').split('/*STRINGS-END*/')[1], coreSrc = fs.readFileSync(path.join(process.env.FCD_CORE_DIR || MT, 'flip-card-core.js'), 'utf8');
for (const [k, v] of Object.entries(A.strings)) {
  is(LOCS.every(l => typeof v[l] === 'string' && v[l].length), `strings.${k}: all 11 locales`);
  const reached = ['title', 'instruction'].includes(k) || actSrc.includes("'" + k + "'") || coreSrc.includes("'" + k + "'") || /^p(First|Middle|Last)$/.test(k) && actSrc.includes("'p' + r.pos");
  is(reached, `strings.${k} is reached by the code`);
  const en = (v.en.match(/\{\w+\}/g) || []).sort().join();
  for (const l of LOCS) is((v[l].match(/\{\w+\}/g) || []).sort().join() === en, `strings.${k}.${l}: en's placeholders`);
  is(!LOCS.some(l => /\b(free|gratis|gratuit|kostenlos)\b/i.test(v[l])), `strings.${k}: no "free"`);
}
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'pepper-sound-swap-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'pepper-sound-swap.substitute.rf-k-2-e' && rows[0].tool === 'flip-card-activity', 'manifest: the kept id, the new tool');
for (const l of LOCS) {
  const b = rows[0].params.byLocale[l];
  is(!!b && JSON.stringify(Object.keys(b)) === JSON.stringify(C.levels(l)), `manifest ${l}: the shown levels`);
  for (const lv of C.levels(l)) is(b && JSON.stringify(b[lv]) === JSON.stringify(C.rounds(l, lv).map(r => r.id)), `manifest ${l} ${lv}: mirrors the core`);
  is(/^[a-z0-9-]+$/.test(rows[0].slug[l] || '') && !!(rows[0].page_title[l] && rows[0].page_intro[l]), `manifest ${l}: slug (url-safe), title and intro`);
}
const HEAD = (() => { try { return JSON.parse(cp.execSync('git show 05a10072:"mini tools/pepper-sound-swap-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }))[0]; } catch (e) { return null; } })();
if (HEAD) { for (const k of ['slug', 'page_title', 'page_intro']) is(HEAD[k].en === rows[0][k].en, `manifest ${k}.en: frozen`); is(JSON.stringify(HEAD.alignment) === JSON.stringify(rows[0].alignment), 'manifest alignment: frozen'); }
else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-flip-card-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
