#!/usr/bin/env node
/* =====================================================================
   verify-word-keys-core.js — build gate for ACTIVITY #61, The Word Keys
   (mini tools/word-keys-core.js, RF.K.3.c, 11 locales). Its OWN ground
   truth (never read off the core's answers):
     0. every sentence picture exists, is a colour drawing, is labelled
        and not refused; Three keys always shows a picture; a key-ring
        board has at most one lock without a picture
     1. the word sets: 8 per locale, the old targets kept (fi new); every
        word on the gate's reviewed list; the look-alikes differ from the
        word, share a letter with it, and one starts with its first letter
     2. the sentences: exactly one gap each; none of the design's rejected
        frames (each let a second key fit); a key-ring board's three keys
        are different words and each opens exactly one of its locks (the
        gate's own compare: the same letters in the same order, accents
        being letters)
     3. the deals: Three keys shows the word and two of its look-alikes,
        always one with the word's first letter, the word's peg 3/3/2 over
        a pass, every look-alike met across three passes, the "middle
        length" bot ≤ 50 %; Key ring never hangs a key under its own lock;
        Cut the key: 8 different tiles holding every letter of the word,
        never two of its letters side by side in spelling order
     4. the round: a key in, out, moved; Turn with no key asks (no miss);
        a wrong key jams (miss) and shows its teeth: differing, sticking
        out, missing; glass pins at miss 2, ghost letters from miss 3; a
        move takes the help away; the right key opens, the opened lock
        takes no other key; key ring: an open lock stays open, no miss
        for a partial board; cut: only tray letters, ≤ 7 teeth, uncut
     5. order() never repeats
     6. strings × 11, every hint key the core returns is authored, the same
        placeholders, nothing "free", fr narrow spaces; the manifest row
        runs the keys and mirrors the core; frozen metadata unchanged; the
        new fi slug / title / intro; url-safe slugs
   Usage: node scripts/verify-word-keys-core.js  (WKY_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.WKY_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'word-keys-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, WordKeysCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(fs.existsSync(path.join(DIR, 'word-keys-activity.js')) ? DIR : MT, 'word-keys-activity.js'), 'utf8') + '\nthis.__A = WordKeysActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['camping/lake', 'easter/egg', 'At the Supermarket/egg', 'zoo animals/bear', 'forest creatures/bear', 'bakery/cake', 'At the Supermarket/cake', 'At the Supermarket/plum', 'At the Supermarket/butter', 'shapes/moon', 'kitchen tools/pan', 'around the house/glass', 'farm animals/ox', 'At the Supermarket/water', 'weather/sun', 'body parts/lip', 'clothing/pants', 'spring/rain', 'shapes/cone', 'At the Supermarket/milk', 'At the Supermarket/juice', 'fruits/cherry', 'fruits/peach', 'fruits/plum', 'christmas/tree', 'farm animals/chicken'];
/* the targets of the old rows (kept); fi had no row */
const OLD = {
  en: 'was of the were want no who saw', de: 'der ein und mit war bei vom alle', es: 'el la los un con por mis sus', pt: 'o da um meu que não com ela',
  fr: 'les une dans pour avec mon son petit', it: 'il la uno con per che non sono', nl: 'de het een met niet dat kan ik', sv: 'en är det på med inte han och',
  da: 'en er det og på med han var', no: 'en et er det med har var på', fi: 'ja on ei se hän mutta kun tämä'
};
/* the reviewed words per locale: a word not on this list is not shipped */
const WORDS = {
  en: 'was saw war wax of off for or the they then them were where here we want went what wait no on now not who how why hot say sat',
  de: 'der dir den dem ein eins Bein nein und uns rund Hund mit mir Mut mag war wir wer was bei bin bist beim vom von vor wo alle alt also aller',
  nl: 'de den doe dek het hen heb heet een en eet aan met mat mes mis niet nieuw noot nies dat dan dak das kan kar kat kam ik uit is in',
  da: 'en et han der er har det den ven og om op os på pas så pæn med ved fed mit hun hat kan var vare far',
  sv: 'en ett än in är ärt här när det den de dit på par så får med mer mat mod inte inne ute ifrån han hon hann hand och ost oss ord',
  no: 'en et den han der det er har vet med men ved mer hare hav var vår på pose så gå',
  es: 'el en es al la las le ya los lo sol un una uno tan con cono como son por pon par pan mis mi mes miel sus sur su luz',
  it: 'il in li al la le lo va uno una un buono con come cono cane per pera pere però che chi casa non nonno nome mano sono suono sano sole',
  pt: 'o os ou ovo eu da do na dia um uma em meu meus mel meia que quem qual quente não nada mão pão com como bom som ela ele dela mala',
  fr: 'les le lit bus une un lune dune dans dent danse dame pour pou pot jour avec avant avion avez mon mot moi bon son salon sol sont petit patte poule',
  fi: 'ja jo jaa jano on en ovi onni ei eli oi se ne sen me hän hana häntä hai hänen mutta matto mitta mato kun kuu kuin kana tämä tämän nämä tähti'
};
/* sentences the design rejected because a second key also fit */
const REJECTED = ['The cat is _ the bed.', 'The dog _ on the rug.', '_ is the sky blue?', 'I _ a big whale.', 'a bowl _ cherries', 'There is _ milk', 'I _ a bee'];
const FROZEN = 'b0eb6550a0b9e28eceef7159da73c81fb9d9f45e';
const base = (s) => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase();
const nfc = (s) => String(s).normalize('NFC');
/* the gate's own lock: the same letters in the same order (an accent is a letter) */
const opens = (key, answer) => nfc(key) === nfc(answer);
const shared = (a, b) => { const m = {}; for (const c of base(a)) m[c] = (m[c] || 0) + 1; let n = 0; for (const c of base(b)) if (m[c]) { m[c]--; n++; } return n; };
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const k of Object.keys(j.nouns)) LABEL[j.dir + '/' + k] = 1; }
const picOk = (p) => fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]) && !REFUSED.includes(p);

for (const loc of LOCS) {
  is(JSON.stringify(C.games(loc)) === JSON.stringify(['three', 'ring', 'cut']), `${loc}: all three games shown`);
  const T = C.rounds(loc, 'three'), R = C.rounds(loc, 'ring'), K = C.rounds(loc, 'cut');
  is(T.length === 8 && R.length === 8 && K.length === 8, `${loc}: 8 rounds per game`);
  is(T.map(r => r.target).sort().join() === OLD[loc].split(' ').sort().join(), `${loc}: the old targets kept (${T.map(r => r.target).join(' ')})`);
  const ok = new Set(WORDS[loc].split(' '));
  /* 1 — the sets */
  T.forEach(r => {
    [r.target].concat(r.looks).forEach(w => is(ok.has(w), `${loc} ${r.target}: «${w}» is on the reviewed list`));
    is(r.looks.length === 3 && new Set([r.target].concat(r.looks).map(nfc)).size === 4, `${loc} ${r.target}: the word and three different look-alikes`);
    r.looks.forEach(w => { is(!opens(w, r.target), `${loc} ${r.target}: «${w}» does not open its lock`); is(shared(w, r.target) >= 1, `${loc} ${r.target}: «${w}» shares a letter with the word`); });
    is(r.looks.some(w => base(w)[0] === base(r.target)[0]), `${loc} ${r.target}: a look-alike starts with the same letter`);
  });
  /* 0 + 2 — the sentences and pictures */
  const all = T.concat(R);
  all.forEach(r => r.locks.forEach(lk => {
    is(!(lk.before + lk.after).includes('_') && lk.answer, `${loc} ${r.id}: one gap`);
    is(!REJECTED.some(x => (lk.before + '_' + lk.after).includes(x)), `${loc} ${r.id}: not a rejected frame`);
    if (lk.pic) is(picOk(lk.pic), `${loc} ${r.id}: ${lk.pic} exists, colour, labelled, not refused`);
  }));
  T.forEach(r => is(!!r.locks[0].pic, `${loc} ${r.target}: Three keys shows a picture`));
  R.forEach(r => {
    is(r.locks.filter(lk => !lk.pic).length <= 1, `${loc} ${r.id}: at most one lock without a picture`);
    is(new Set(r.keys.map(nfc)).size === 3 && r.keys.every(w => ok.has(w)), `${loc} ${r.id}: three different reviewed keys (${r.keys.join(' ')})`);
    r.locks.forEach((lk, i) => is(r.keys.filter(k => opens(k, lk.answer)).length === 1 && opens(r.keys[i], lk.answer), `${loc} ${r.id}: lock ${i + 1} opens for exactly one key`));
  });
  /* 3 — the deals */
  let mid = 0, n = 0;
  for (let seed = 0; seed < 60; seed++) {
    const rnd = C.seeded(loc + seed), seen = T.map(() => new Set()), pegs = [0, 0, 0];
    for (let pass = 0; pass < 3; pass++) {
      const D = C.dealThree(T, rnd, pass), pp = [0, 0, 0];
      D.forEach((keys, k) => {
        const r = T[k];
        is(keys.length === 3 && keys.filter(w => w === r.target).length === 1 && keys.every(w => w === r.target || r.looks.includes(w)) && new Set(keys).size === 3, `${loc} three ${r.target}: the word and two of its look-alikes`);
        is(keys.some(w => w !== r.target && base(w)[0] === base(r.target)[0]), `${loc} three ${r.target} pass ${pass}: a key with the word's first letter is on the rail`);
        keys.forEach(w => seen[k].add(w)); pp[keys.indexOf(r.target)]++;
        n++; const L = keys.map(w => Array.from(w).length), m = L.slice().sort((a, b) => a - b)[1]; if (keys[L.indexOf(m)] === r.target) mid++;
      });
      is(pp.slice().sort().join() === '2,3,3', `${loc} three seed ${seed} pass ${pass}: the word's peg 3/3/2 (${pp.join(',')})`);
    }
    T.forEach((r, k) => is(r.looks.every(w => seen[k].has(w)), `${loc} three ${r.target}: every look-alike met across three passes`));
    const G = C.dealRing(R, rnd), forms = new Set();
    G.forEach((keys, k) => { is(keys.slice().sort().join() === R[k].keys.slice().sort().join() && keys.every((w, i) => w !== R[k].locks[i].answer), `${loc} ring ${R[k].id}: no key hangs under its own lock`); forms.add(keys.map(w => R[k].keys.indexOf(w)).join()); });
    is(forms.size === 2, `${loc} ring seed ${seed}: both rail orders used`);
    K.forEach(r => {
      const tiles = C.tray(r, rnd), need = [...new Set(Array.from(r.target.toLocaleLowerCase()))];
      is(tiles.length === 8 && new Set(tiles).size === 8 && need.every(c => tiles.includes(c)), `${loc} cut ${r.target}: 8 different tiles with every letter of the word (${tiles.join('')})`);
      let inOrder = false; for (let i = 0; i + 1 < need.length; i++) { const a = tiles.indexOf(need[i]); if (tiles[a + 1] === need[i + 1]) inOrder = true; }
      is(!inOrder, `${loc} cut ${r.target}: no two of its letters side by side in spelling order (${tiles.join('')})`);
    });
  }
  is(mid / n <= 0.5, `${loc}: the "middle length" bot wins ${(mid / n * 100).toFixed(1)} % (≤ 50 %)`);
}

/* 4 — the round */
{
  is(JSON.stringify(C.diff('was', 'saw')) === JSON.stringify({ glow: [0, 2], extra: [], missing: 0 }), 'diff was/saw: teeth 1 and 3 differ');
  is(JSON.stringify(C.diff('of', 'off')) === JSON.stringify({ glow: [], extra: [2], missing: 0 }), 'diff of/off: one tooth sticks out');
  is(JSON.stringify(C.diff('off', 'of')) === JSON.stringify({ glow: [], extra: [], missing: 1 }), 'diff off/of: one notch stays empty');
  is(JSON.stringify(C.diff('the', 'then')) === JSON.stringify({ glow: [], extra: [3], missing: 0 }), 'diff the/then: one tooth sticks out');
  is(JSON.stringify(C.diff('é', 'e')) === JSON.stringify({ glow: [0], extra: [], missing: 0 }), 'diff é/e: the accent is a tooth');
  is(!C.opens('saw', 'was') && !C.opens('off', 'of') && !C.opens('of', 'off') && !C.opens('e', 'é') && !C.opens('Hund', 'und') && C.opens('was', 'was'), 'opens: only the same letters in the same order');
  const r = C.rounds('en', 'three').find(x => x.target === 'was'), st = C.newState(r, { keys: ['saw', 'was', 'war'] });
  let res = C.turn(st); is(res.kase === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', 'three: Turn with no key asks, no miss');
  is(!C.insert(st, 'wax', 0), 'three: a key not on the rail cannot go in');
  C.insert(st, 'saw', 0); res = C.turn(st);
  is(res.kase === 'jam' && st.misses === 1 && C.hint(st) === 'hintJam', 'three: «saw» jams → miss 1');
  let h = C.lockHelp(st, 0); is(h && JSON.stringify(h.diff.glow) === '[0,2]' && !h.glass && !h.ghost, 'three: miss 1 — teeth 1 and 3 glow, no glass');
  C.insert(st, 'war', 0); is(!C.lockHelp(st, 0) && !C.hint(st), 'three: a move takes the help away');
  res = C.turn(st); h = C.lockHelp(st, 0);
  is(st.misses === 2 && h.glass && !h.ghost && h.pins === 3 && C.hint(st) === 'hintGlass', 'three: miss 2 — the glass lock with 3 pins');
  C.insert(st, 'saw', 0); C.turn(st); h = C.lockHelp(st, 0); is(st.misses === 3 && h.ghost, 'three: miss 3 — ghost letters');
  is(C.remove(st, 0) && st.inLock[0] === null, 'three: a key comes out of the lock');
  C.insert(st, 'was', 0); res = C.turn(st); is(res.ok && st.done && st.opened[0], 'three: «was» opens the lock');
  is(!C.insert(st, 'saw', 0), 'three: an opened lock takes no key');
}
{
  const r = C.rounds('en', 'ring')[0], st = C.newState(r, { keys: ['saw', 'say', 'was'] });
  C.insert(st, 'was', 0); let res = C.turn(st);
  is(res.kase === 'open' && st.opened[0] && st.misses === 0 && !st.done && C.hint(st) === 'hintOpen', 'ring: one lock opens, no miss, the board goes on');
  is(!C.insert(st, 'was', 1), 'ring: the key that opened a lock stays in it');
  is(!C.insert(st, 'say', 0) && st.inLock[0] === 'was', 'ring: an opened lock takes no other key while the board goes on');
  C.insert(st, 'say', 1); C.insert(st, 'saw', 2); res = C.turn(st);
  is(res.kase === 'jam' && res.jammed.length === 2 && st.misses === 1 && st.opened[0], 'ring: two keys swapped → both jam, one miss, the open lock stays open');
  C.insert(st, 'saw', 1); is(st.inLock[2] === null && st.inLock[1] === 'saw', 'ring: a key moves from one lock to another');
  C.insert(st, 'say', 2); res = C.turn(st); is(res.ok && st.done, 'ring: every key in its lock → done');
}
{
  const r = C.rounds('en', 'cut').find(x => x.target === 'no'), st = C.newState(r, { tiles: ['o', 'w', 'n', 'a', 't', 'e', 'r', 'i'], keys: [] });
  let res = C.turn(st); is(res.kase === 'empty' && C.hint(st) === 'hintEmptyCut' && st.misses === 0, 'cut: Turn with nothing cut asks, no miss');
  is(!C.cutLetter(st, 'z'), 'cut: only tray letters cut a tooth');
  C.cutLetter(st, 'o'); C.cutLetter(st, 'n'); res = C.turn(st);
  is(res.kase === 'jam' && st.misses === 1 && JSON.stringify(C.lockHelp(st, 0).diff.glow) === '[0,1]', 'cut: «on» for «no» jams, both teeth glow');
  C.uncut(st); C.uncut(st); is(st.cut === '', 'cut: uncut takes teeth back');
  for (let i = 0; i < 9; i++) C.cutLetter(st, 'n'); is(Array.from(st.cut).length === 7, 'cut: at most 7 teeth');
  st.cut = ''; C.cutLetter(st, 'n'); C.cutLetter(st, 'o'); res = C.turn(st); is(res.ok && st.done, 'cut: «no» opens the lock');
}

/* 5 — order */
for (const loc of ['en', 'fi']) {
  const R = C.rounds(loc, 'three'), fixed = () => 0.37, o1 = C.order(R, fixed, null), o2 = C.order(R, fixed, o1);
  is(o1.join() !== o2.join() && new Set(o2).size === R.length, `${loc}: order() refuses the previous order even when the draw repeats`);
  let prev = null; for (let t = 0; t < 200; t++) { const o = C.order(R, Math.random, prev); is(!prev || o.join() !== prev.join(), `${loc}: order never repeats`); prev = o; }
}

/* 6 — strings, manifest, metadata */
const S = A.strings, KEYS = Object.keys(S);
for (const k of KEYS) {
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  for (const loc of LOCS) {
    is(typeof S[k][loc] === 'string' && S[k][loc].trim(), `strings.${k}.${loc} authored`);
    is(ph(S[k][loc]) === ph(S[k].en), `strings.${k}.${loc}: same placeholders as en`);
    is(!/\b(free|gratis|kostenlos|gratuit|gratuito|grátis|ilmainen|gratuita)\b/i.test(S[k][loc] || ''), `strings.${k}.${loc}: nothing "free"`);
    if (loc === 'fr') is(!/ [:;!?»]/.test(S[k][loc]) && !/« /.test(S[k][loc]), `strings.${k}.fr: no plain space before French punctuation`);
  }
}
const HINTS = ['hintEmpty', 'hintEmptyCut', 'hintJam', 'hintGlass', 'hintGlassCut', 'hintOpen'];
const SRC = fs.readFileSync(path.join(DIR, 'word-keys-core.js'), 'utf8');
HINTS.forEach(hk => { is(KEYS.includes(hk), `hint ${hk} authored`); is(SRC.includes("'" + hk + "'"), `core can return ${hk}`); });
['pThree', 'pRing', 'pCut', 'okThree', 'okRing', 'gThree', 'gRing', 'gCut', 'picOn', 'picOff'].forEach(k => is(KEYS.includes(k), `string ${k} authored`));
const M = JSON.parse(fs.readFileSync(path.join(MT, 'choice-board-activities.json'), 'utf8')).find(r => r.id === 'choice-board.tell-words-apart.rf-k-3-c');
is(M && M.tool === 'word-keys-activity' && M.task_template === 'word-keys', 'manifest row runs word-keys-activity');
is(M && M.alignment.code === 'RF.K.3.c' && M.alignment.grade === 'K', 'manifest alignment RF.K.3.c, grade K');
for (const loc of LOCS) {
  const want = {}; C.games(loc).forEach(g => { want[g] = C.rounds(loc, g).length; });
  is(M && JSON.stringify(M.params.byLocale[loc]) === JSON.stringify(want), `manifest mirrors the core for ${loc}`);
  is(M && /^[a-z0-9-]+$/.test(M.slug[loc] || ''), `slug ${loc} url-safe`);
  is(M && (M.page_title || {})[loc] && (M.page_intro || {})[loc], `title and intro ${loc} present`);
}
const FZ = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no'].map(l => [l, M.slug[l], M.page_title[l], M.page_intro[l]]);
is(crypto.createHash('sha1').update(JSON.stringify(FZ)).digest('hex') === FROZEN, 'frozen slugs, titles and intros (10 locales) unchanged');
is(!/ilmai|gratis/i.test(M.page_title.fi + M.page_intro.fi), 'fi metadata: nothing "free"');

console.log(`verify-word-keys-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
