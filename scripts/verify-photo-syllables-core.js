#!/usr/bin/env node
/* =====================================================================
   verify-photo-syllables-core.js — the gate for ACTIVITY #52, La photo
   qui se révèle (RF.K.2.B, fr). It holds its OWN ground truth — the 28
   words with their splits and pictures, the three level tables, the
   decoy cards and the mute-e rule are typed out here — and checks the
   core against it, against approved-words-fr.json and the labels:
     1. words: split = oracle = approved-words-fr.json (accents kept); the
        picture exists, is a colour theme, and its fr label is the word;
        the 28 words of the old row are all kept (read from git);
     2. levels: Un ou deux morceaux has no word-final mute e; Le e muet is
        two written syllables ending in a mute e; Trois syllabes et plus
        has three or more;
     3. the grey e: exactly the word-final plain e of a card's own source
        word — never é è ê, never a non-final e (the gate's own rule);
     4. the decoys: each is syllable srcIdx of its source word in the
        approved file, never a syllable of the round's word, from another
        word; two for a one-syllable word, one otherwise;
     5. develop: EVERY ordered arrangement of every subset of the round's
        cards — whole only in word order; each strip sharp iff it is the
        word's own card in its own place; the kind of miss (another photo
        > a missing piece > mixed up); strip widths = 1 ÷ the card's own
        word's syllables; the white gap and the overflow add up;
     6. the tray: three or more cards a derangement, two at chance; the
        decoy's place uniform; one-syllable words at chance;
     7. the hand: lay / move / take back; a move blanks the paper and the
        help; an empty rail asks (no miss); miss 2 shows the ghost and one
        line per syllable boundary;
     8. hints; 9. order; 10. strings (en + fr, reached, no price word, fr
        typography: no plain space before : ! ? ;); 11. manifest (frozen).
   Usage: node scripts/verify-photo-syllables-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.PHS_CORE_DIR || MT, 'photo-syllables-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };
const seeded = (k) => { let s = k >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };

/* ---------- the oracle ---------- */
const ORACLE = {
  chat: 'chat|animals/cat', chien: 'chien|animals/dog', fleur: 'fleur|summer/flower', lit: 'lit|furniture/bed', ours: 'ours|camping/bear',
  avion: 'a-vion|vehicles/airplane', lapin: 'la-pin|animals/rabbit', ballon: 'bal-lon|toys/ball', soleil: 'so-leil|beach/sun',
  lune: 'lu-ne|space/moon', table: 'ta-ble|furniture/table', ange: 'an-ge|christmas/angel', cloche: 'clo-che|christmas/bell', livre: 'li-vre|classroom/book',
  tigre: 'ti-gre|animals/tiger', 'zèbre': 'zè-bre|animals/zebra', pomme: 'pom-me|fruits/apple', tortue: 'tor-tue|animals/turtle',
  banane: 'ba-na-ne|fruits/banana', voiture: 'voi-tu-re|vehicles/car', papillon: 'pa-pil-lon|insects and bugs/butterfly', parapluie: 'pa-ra-pluie|weather/umbrella',
  chocolat: 'cho-co-lat|easter/chocolate', 'éléphant': 'é-lé-phant|animals/elephant', girafe: 'gi-ra-fe|animals/giraffe', tournesol: 'tour-ne-sol|flowers/sunflower',
  escargot: 'es-car-got|forest creatures/snail', ambulance: 'am-bu-lan-ce|vehicles/ambulance'
};
const LEVELS = {
  short: { chat: 'cho:chocolat chien:chien', chien: 'che:cloche ours:ours', fleur: 'clo:cloche lu:lune', lit: 'lu:lune pin:lapin', ours: 'tour:tournesol pom:pomme', avion: 'am:ambulance', lapin: 'pa:papillon', ballon: 'ba:banane', soleil: 'sol:tournesol' },
  mute: { lune: 'la:lapin', table: 'bal:ballon', ange: 'la:lapin', cloche: 'cho:chocolat', livre: 'ti:tigre', tigre: 'gi:girafe', 'zèbre': 'vre:livre', pomme: 'pa:papillon', tortue: 'tour:tournesol' },
  long: { banane: 'pa:papillon', voiture: 'ti:tigre', papillon: 'bal:ballon', parapluie: 'la:lapin', chocolat: 'lu:lune', 'éléphant': 'ne:lune', girafe: 'ti:tigre', tournesol: 'so:soleil', escargot: 'co:chocolat', ambulance: 'bal:ballon' }
};
const SPLIT = (k) => ORACLE[k].split('|')[0].split('-');
/* the gate's own mute-e rule: the last written syllable of a word ending in a plain e */
const MUTE = (k, i) => i === SPLIT(k).length - 1 && /[^éèê]e$/.test(k) && /e$/.test(SPLIT(k)[i]);
const AP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-fr.json'), 'utf8')).entries;
const APPROVED = {}; AP.forEach(e => { APPROVED[e.word] = e; });
const A0 = (() => { const ctx = { window: {}, PhotoSyllablesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'photo-syllables-activity.js'), 'utf8') + '\n;this.__A = PhotoSyllablesActivity;', ctx); return ctx.__A; })();
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* 1. words */
const keys = Object.keys(C.WORDS);
is(keys.length === 28 && keys.every(k => ORACLE[k]) && Object.keys(ORACLE).every(k => C.WORDS[k]), `the core's words = the 28-word oracle (${keys.length})`);
keys.forEach(k => {
  const w = C.WORDS[k], [split, pic] = (ORACLE[k] || '|').split('|'), g = APPROVED[k], lab = PIC[w.pic] && PIC[w.pic].fr && PIC[w.pic].fr[0];
  is(w.syl.join('-') === split && w.pic === pic, `${k}: ${w.syl.join('-')} on ${w.pic} = oracle ${split} on ${pic}`);
  is(!!g && g.split.join('-') === split, `${k}: approved-words-fr.json agrees (${g && g.split.join('-')})`);
  is(!!lab && lab.toLowerCase() === k, `${k}: picture ${w.pic} labelled "${lab}"`);
  is(exact(w.pic + '@2x.webp') && !BW.test(w.pic.split('/')[0]), `${k}: picture exists, colour theme`);
});
is(C.WORDS.ours.pic !== 'forest creatures/bear', 'ours is never the forest bear (it reads as a teddy)');
is(!C.WORDS.lac && !C.WORDS.boulanger, 'never lac (the picture reads as mountains) nor boulanger (the toque reads as a cook)');
/* syllables that SOUND the same — a decoy never sounds like a syllable of its round's word */
const SOUND = [['tu', 'tue'], ['am', 'an', 'en', 'em'], ['la', 'lat', 'las'], ['li', 'lit', 'lie'], ['pin', 'pain'], ['so', 'sot', 'seau'], ['co', 'cot'], ['ce', 'se'], ['ti', 'tie'], ['lu', 'lue'], ['ba', 'bas'], ['pa', 'pas']];
const sameSound = (a, b) => a === b || SOUND.some(g => g.includes(a) && g.includes(b));

/* 2. levels */
is(C.LEVEL_KEYS.join() === 'short,mute,long', 'three levels');
const all = [];
for (const lv of C.LEVEL_KEYS) {
  const R = C.rounds(lv);
  is(R.map(r => r.w.key).join() === Object.keys(LEVELS[lv]).join(), `${lv}: the level's words = the oracle`);
  R.forEach(r => {
    all.push(r.w.key);
    const syl = SPLIT(r.w.key), n = syl.length;
    if (lv === 'short') is(n <= 2 && !syl.some((_, i) => MUTE(r.w.key, i)), `${r.id}: one or two pieces, no mute e`);
    if (lv === 'mute') is(n === 2 && MUTE(r.w.key, 1), `${r.id}: two written syllables ending in a mute e`);
    if (lv === 'long') is(n >= 3, `${r.id}: three syllables or more`);
    /* 4. the decoys */
    const want = LEVELS[lv][r.w.key].split(' ').map(x => x.split(':'));
    is(JSON.stringify(r.decoys.map(d => [d.text, d.src])) === JSON.stringify(want), `${r.id}: decoys = the oracle`);
    is(r.decoys.length === (n === 1 ? 2 : 1), `${r.id}: ${n === 1 ? 'two decoys for a one-syllable word' : 'one decoy'}`);
    r.decoys.forEach(d => {
      const g = APPROVED[d.src];
      is(!syl.some(x => sameSound(x, d.text)), `${r.id}: decoy "${d.text}" never sounds like a syllable of ${r.w.key}`);
      is(d.src !== r.w.key && !syl.includes(d.text) && !!g && g.split[d.srcIdx] === d.text, `${r.id}: decoy "${d.text}" is syllable ${d.srcIdx + 1} of ${d.src}, not a syllable of ${r.w.key}`);
    });
    /* 3. the grey e */
    const st = C.newState(r, 0);
    st.cards.forEach(c => is(c.mute === MUTE(c.src, c.srcIdx) && c.srcCount === SPLIT(c.src).length && c.text === SPLIT(c.src)[c.srcIdx] && c.pic === C.WORDS[c.src].pic, `${r.id} card "${c.text}": grey e ${c.mute}, strip ${c.srcIdx + 1}/${c.srcCount} of ${c.src}`));
  });
}
is(all.length === 28 && new Set(all).size === 28, 'every word in exactly one level');
for (const k of ['zèbre', 'éléphant']) is(!C.newState(C.rounds(Object.keys(LEVELS).find(l => LEVELS[l][k]))[Object.keys(LEVELS[Object.keys(LEVELS).find(l => LEVELS[l][k])]).indexOf(k)], 0).cards.some(c => c.src === k && c.mute && c.srcIdx !== SPLIT(k).length - 1), `${k}: no grey e on an accented or non-final e`);
for (const [sp, want] of [[['lu', 'ne'], 'lune'], [['ne'], 'n'], [['ne', 'lu'], 'nlu'], [['voi', 'tu', 're'], 'voiture'], [['pa', 'ra', 'pluie'], 'parapluie']]) is(A0._spoken(sp.map(t => ({ text: t, mute: /^(ne|re|pluie)$/.test(t) }))) === want, `the speaker never voices a grey e: ${sp.join('+')} → "${want}"`);
is(MUTE('éléphant', 2) === false && MUTE('parapluie', 2) === true && MUTE('tortue', 1) === true && MUTE('soleil', 1) === false, 'the gate\'s own mute-e rule: éléphant no, parapluie yes, tortue yes, soleil no');

/* 5. develop: every ordered arrangement of every subset */
const arrangements = (ids) => { const out = []; const rec = (pre, rest) => { if (pre.length) out.push(pre); rest.forEach((x, i) => rec(pre.concat([x]), rest.slice(0, i).concat(rest.slice(i + 1)))); }; rec([], ids); return out; };
for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) {
  const syl = SPLIT(r.w.key), n = syl.length, base = C.newState(r, 0, { rnd: seeded(1) });
  let ok = 0, bad = 0, total = 0;
  for (const arr of arrangements(base.cards.map(c => c.id))) {
    const st = C.newState(r, 0, { rnd: seeded(1) });
    arr.forEach(id => C.lay(st, id)); total++;
    const res = C.develop(st), cards = arr.map(id => C.byId(st, id));
    const right = arr.length === n && cards.every((c, i) => c.src === r.w.key && c.srcIdx === i);
    const kase = cards.some(c => c.src !== r.w.key) ? 'foreign' : arr.length < n ? 'missing' : 'order';
    let x = 0; const wantBands = cards.map((c, i) => { const b = { x, w: 1 / SPLIT(c.src).length, sharp: c.src === r.w.key && c.srcIdx === i, pic: C.WORDS[c.src].pic, srcIdx: c.srcIdx }; x += b.w; return b; });
    const dev = st.developed, sameBands = dev && dev.bands.length === wantBands.length && dev.bands.every((b, i) => Math.abs(b.x - wantBands[i].x) < 1e-9 && Math.abs(b.w - wantBands[i].w) < 1e-9 && b.sharp === wantBands[i].sharp && b.pic === wantBands[i].pic && b.srcIdx === wantBands[i].srcIdx);
    const gapOk = dev && Math.abs((dev.gap || 0) - Math.max(0, 1 - x)) < 1e-9 && Math.abs((dev.overflow || 0) - Math.max(0, x - 1)) < 1e-9;
    if (right) { if (res.ok && st.done && sameBands && gapOk && dev.bands.every(b => b.sharp)) ok++; else bad++; }
    else if (res.ok || st.done || res.kase !== kase || st.misses !== 1 || !sameBands || !gapOk) bad++;
  }
  is(ok === 1 && bad === 0, `${r.id}: of ${total} arrangements only word order develops whole; every strip, gap and miss kind right (${ok} ok, ${bad} bad)`);
  const noDecoy = C.newState(r, 0, { decoy: false });
  is(noDecoy.cards.length === n && noDecoy.tray.length === n, `${r.id}: Carte piège aucune — only the word's ${n} card(s)`);
}

/* 6. the tray */
for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) {
  const n = SPLIT(r.w.key).length, N = 4000, cnt = n + r.decoys.length;
  let inOrder = 0, notDer = 0, firstAt0 = 0; const decoyPos = new Array(cnt).fill(0);
  for (let k = 0; k < N; k++) {
    const st = C.newState(r, 0, { rnd: seeded(k + 11) }), own = st.tray.filter(id => id[0] === 'c').map(id => +id.slice(1));
    if (own.every((x, i) => x === i)) inOrder++;
    if (n >= 3 && !C.isDerangement(own)) notDer++;
    if (st.tray[0] === 'c0') firstAt0++;
    decoyPos[st.tray.indexOf('x0')]++;
  }
  if (n >= 3) is(notDer === 0 && firstAt0 === 0, `${r.id}: three or more cards always a derangement of word order (${notDer})`);
  if (n === 2) is(inOrder / N > 0.44 && inOrder / N < 0.56, `${r.id}: two cards in word order at chance (${(inOrder / N).toFixed(3)})`);
  if (n === 1) is(firstAt0 / N > 0.28 && firstAt0 / N < 0.39, `${r.id}: the one card's place at chance (${(firstAt0 / N).toFixed(3)})`);
  is(decoyPos.every(c => Math.abs(c / N - 1 / cnt) < 0.05), `${r.id}: the decoy's tray place uniform (${decoyPos.map(c => (c / N).toFixed(2)).join(' ')})`);
}

/* 7. the hand */
(() => {
  const r = C.rounds('long')[2], st = C.newState(r, 0, { rnd: seeded(4) });
  let res = C.develop(st); is(!res.ok && res.kase === 'empty' && st.misses === 0, 'an empty rail asks (no miss)');
  C.lay(st, 'c2'); C.lay(st, 'c0', 0); is(st.rail.join() === 'c0,c2', 'lay at a place pushes the others along');
  C.lay(st, 'c1', 1); is(st.rail.join() === 'c0,c1,c2' && !st.tray.includes('c1'), 'lay between two cards');
  C.move(st, 'c2', 0); is(st.rail.join() === 'c2,c0,c1', 'move along the rail');
  C.develop(st); is(st.misses === 1 && !!st.developed && !C.ghostOn(st), 'miss 1: developed, no ghost yet');
  C.move(st, 'c0', 2); is(!st.developed && !st.show, 'a move blanks the paper');
  C.move(st, 'c2', 2); C.lay(st, 'x0'); C.develop(st);
  is(st.misses === 2 && C.ghostOn(st) && JSON.stringify(C.guides(st)) === JSON.stringify([1 / 3, 2 / 3]), 'miss 2: the ghost and a line at each syllable boundary');
  C.takeBack(st, 'x0'); is(!C.ghostOn(st) && st.tray.includes('x0') && !st.rail.includes('x0'), 'take back: the card returns, the help goes');
  C.move(st, 'c0', 0); is(st.rail.join() === 'c0,c1,c2', 'back in word order');
  is(C.develop(st).ok && st.done, 'right after the help');
  is(C.lay(st, 'x0') === false && C.move(st, 'c0', 1) === false && C.takeBack(st, 'c0') === false, 'nothing moves after the photo is whole');
})();

/* 8. hints */
(() => {
  const H = (lv, i, fn) => { const st = C.newState(C.rounds(lv)[i], 0, { rnd: seeded(6) }); fn(st); return C.hint(st); };
  is(H('short', 6, st => C.develop(st)) === 'hintEmpty', 'empty: hintEmpty');
  is(H('short', 6, st => { C.lay(st, 'c1'); C.lay(st, 'c0'); C.develop(st); }) === 'hintOrder', 'mixed up: hintOrder');
  is(H('short', 6, st => { C.lay(st, 'c0'); C.lay(st, 'x0'); C.develop(st); }) === 'hintForeign', 'a decoy: hintForeign');
  is(H('short', 6, st => { C.lay(st, 'c0'); C.develop(st); }) === 'hintMissing', 'a missing card: hintMissing');
  is(H('short', 6, st => { C.lay(st, 'c0'); C.develop(st); C.develop(st); }) === 'hintLines', 'miss 2: hintLines');
  is(C.celebrateKey(C.rounds('short')[0]) === 'okOne' && C.celebrateKey(C.rounds('mute')[0]) === 'okMute' && C.celebrateKey(C.rounds('long')[0]) === 'okWord' && C.celebrateKey(C.rounds('short')[6]) === 'okWord', 'the success lines: one piece / the grey e / n syllables');
})();

/* 9. order */
for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0, bad = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad && R.length >= 7, `${lv}: ${R.length} rounds, orders are permutations and never repeat the previous one`); }

/* 10. strings */
const A = (() => { const ctx = { window: {}, PhotoSyllablesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'photo-syllables-activity.js'), 'utf8') + '\n;this.__A = PhotoSyllablesActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.PHS_CORE_DIR || MT, 'photo-syllables-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'photo-syllables-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) {
  const s = A.strings[k];
  is(!!s.en && !!s.fr, `strings ${k}: en + fr`);
  is(!/\bfree\b|gratuit|gratis/i.test(s.en + s.fr), `strings ${k}: no price word`);
  is(!/ [:!?;]/.test(s.fr) && !/[^  \s][!?;]/.test(s.fr.replace(/\{\w+\}/g, 'x')), `strings ${k}: fr typography — a narrow no-break space before : ! ? ; ("${s.fr}")`);
  is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);
}

/* 11. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'photo-syllables-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.forme-le-mot-en-syllabes.rf-k-2-b' && rows[0].tool === 'photo-syllables-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 1223ffdc:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) {
  for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
  const old = HEADROW.params.words.map(w => w.targetWord + ':' + w.syllables.join('-'));
  is(old.length === 28 && old.every(x => { const [k, s] = x.split(':'); return ['lac', 'boulanger'].includes(k) || (C.WORDS[k] && C.WORDS[k].syl.join('-') === s); }), 'the 26 old words with a true picture are kept with their splits (lac, boulanger out on review)');
} else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-photo-syllables-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
